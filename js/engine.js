/* ================= CONSTANTS ================= */
const BASE_BB = 100;
const AI_NAMES   = ['Viktor','Mia','Doyle','Selma','Ivan','Nora','Phil','Daria'];
/* personality styles: margin = extra equity needed to call, raiseT = raise threshold shift,
   raiseF = raise frequency shift, bluff = bluff freq shift, size = bet sizing multiplier,
   openMult = preflop open-range width vs GTO, raiseCap = top-% of hands they'll raise with,
   foldRaise = extra fold bias when facing raises */
/* adapt = how strongly this profile reacts to tournament/blind pressure (0=ignores it, 1=fully adjusts) */
const STYLES=[
  {id:'rock',   label:'🪨 Tight',      margin:+0.07, raiseT:+0.06, raiseF:-0.15, bluff:-0.04, size:0.70, adapt:0.20, openMult:0.50, raiseCap:0.08, foldRaise:+0.10},
  {id:'station',label:'📞 Loose',      margin:-0.14, raiseT:+0.04, raiseF:-0.10, bluff:0,      size:0.85, adapt:0.35, openMult:1.65, raiseCap:0.20, foldRaise:-0.07},
  {id:'shark',  label:'🦈 Aggressive', margin:+0.02, raiseT:-0.03, raiseF:+0.15, bluff:+0.05, size:1.15, adapt:1.00, openMult:1.00, raiseCap:0.22, foldRaise:0},
  {id:'maniac', label:'🔥 Wild',       margin:-0.10, raiseT:-0.14, raiseF:+0.45, bluff:+0.18, size:1.40, adapt:0.70, openMult:1.85, raiseCap:0.48, foldRaise:-0.12},
];
function profileLabel(style){
  const label=style&&style.label?String(style.label):'';
  return label.replace(/[A-Za-zÀ-ÖØ-öø-ÿ]/,c=>c.toUpperCase());
}
/* tournament pressure 0..1 from effective stack depth in BB (deep=0, short=1) */
function tourneyPressure(stackBB){
  if(stackBB>=60) return 0;
  if(stackBB<=12) return 1;
  return (60-stackBB)/48;
}
const AI_AVATARS = ['🦊','🐼','🦈','🦉','🐯','🐺','🐸','🐙'];
let AI_DELAY_MIN=550, AI_DELAY_MAX=1050, RUNOUT_DELAY=1000, SHOWDOWN_PAUSE=4200, FOLDWIN_PAUSE=2200;
/* benchmark mode: run games at maximum speed with no rendering */
let BENCH=false;
function later(fn,ms){ if(BENCH){queueMicrotask(fn);} else setTimeout(fn,ms); }


const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const fmt=n=>n.toLocaleString('en-US');
/* money display: 100 BB = $2,000 -> 1 BB (100 chips) = $20 -> 1 chip = $0.20 */
const usd=n=>'$'+fmt(Math.round(n/5));
function bbs(n){const v=n/state.bb;return (v>=20?Math.round(v):Math.round(v*10)/10)+' BB';}
const money=n=>usd(n)+' · '+bbs(n);

/* ================= GAME STATE ================= */
let state=null;

function newGame(cfg){
  cfg.gameType=cfg.gameType||'sng';
  const startBlind=cfg.startBlind||BASE_BB;
  const mode=getMode(cfg);
  state={
    cfg, levels:[startBlind], level:0, handNum:0, board:[], stage:null, deck:[],
    currentBet:0, lastRaiseSize:0, turnIdx:0, players:[],
    gameOver:false, bb:startBlind, sb:startBlind/2, ante:0, handOver:false
  };
  mode.initState(cfg,state);
  const stack=cfg.startBB*startBlind;
  const mk=(i,name,avatar,isHuman)=>({i,name,avatar,isHuman,chips:stack,hole:[],folded:false,out:false,allIn:false,bet:0,totalBet:0,acted:false,lastAct:'',revealed:false,place:0,bank:TT_BANK});
  state.players.push(mk(0, cfg.allAI?'Bot-You':'You', '😎', !cfg.allAI));
  const names=shuffle(AI_NAMES.map((n,k)=>[n,AI_AVATARS[k]]));
  const styles=shuffle(STYLES.concat(STYLES));
  for(let k=1;k<cfg.numPlayers;k++){
    const q=mk(k,names[k-1][0],names[k-1][1],false);
    q.style=styles[k-1];
    state.players.push(q);
  }
  /* multiplayer: claim seats for remote human players (host-authoritative) */
  if(cfg.mpRemotes){
    for(const r of cfg.mpRemotes){
      const q=state.players[r.seat]; if(!q)continue;
      q.name=r.name; q.avatar='🙂'; q.remote=true; q.isHuman=false; q.style=null;
    }
  }
  state.sessStats={hands:0,won:0,net:0,biggest:0,decisions:0,followed:0,
    vpipH:0,pfrH:0,aBets:0,aCalls:0,sdSeen:0,sdWon:0,evLost:0};
  state.gameId=Date.now();
  state.gameDecisions=[];   // EV blunders this game
  state.gameHands=[];       // replayable hands this game
  gameSeries=[];            // hero stack per hand (history graph)
  state.dealerIdx=Math.floor(Math.random()*cfg.numPlayers);
  return state;
}

const alive =()=>state.players.filter(p=>!p.out);
const inHand=()=>state.players.filter(p=>!p.out&&!p.folded);
/* fast-forward when the human is no longer involved in decisions this hand */
const fastFwd=()=>!state.cfg.allAI&&!state.cfg.mpRemotes&&(state.players[0].folded||state.players[0].out);
function nextSeat(from,pred){
  const n=state.players.length;
  for(let k=1;k<=n;k++){const j=(from+k)%n; if(pred(state.players[j])) return j;}
  return -1;
}
function payBet(p,amt){
  amt=Math.min(amt,p.chips);
  p.chips-=amt; p.bet+=amt; p.totalBet+=amt;
  if(p.chips===0) p.allIn=true;
  return amt;
}
function payAnte(p,amt){
  amt=Math.min(amt,p.chips);
  p.chips-=amt; p.totalBet+=amt;
  if(p.chips===0) p.allIn=true;
}

/* assign table positions for this hand, starting from the small blind */
function assignPositions(sbIdx){
  for(const p of state.players) p.pos='';
  const seats=[]; let j=sbIdx;
  do{ seats.push(j); j=nextSeat(j,q=>!q.out); }while(j!==sbIdx&&j!==-1);
  const n=seats.length;
  const names=[];
  if(n===2){ names.push('SB/BTN','BB'); }
  else{
    names.push('SB','BB');
    const m=n-2;
    for(let k=0;k<m;k++){
      const fromEnd=m-1-k;
      if(fromEnd===0) names.push('BTN');
      else if(fromEnd===1) names.push('CO');
      else if(fromEnd===2&&m>=4) names.push('HJ');
      else names.push(k===0?'UTG':k===1?'UTG+1':k===2?'MP':'MP+'+(k-2));
    }
  }
  seats.forEach((idx,k)=>state.players[idx].pos=names[k]||'');
}

/* ================= HAND FLOW ================= */
function startHand(){
  if(state.gameOver) return;
  mpSeatPending();    // late multiplayer joiners get dealt in now
  /* open table: alone at a bot-free multiplayer table — wait for players, then deal */
  if(MP&&MP.role==='host'&&alive().length<2){
    showBanner(T('mpWaitingPlayers'));
    render();
    later(startHand,2500);
    return;
  }
  mpBroadcastCK();    // public checkpoint: lets any player take over if the host dies
  state.handNum++;
  if(!state.cfg.allAI)gameSeries.push({h:state.handNum,c:state.players[0].chips});
  state.handOver=false;
  getMode().applyBlinds(state);
  state.board=[]; state.stage='preflop';
  state.deck=shuffle(makeDeck());
  for(const p of state.players){
    p.hole=[]; p.folded=p.out; p.allIn=false; p.bet=0; p.totalBet=0;
    p.acted=false; p.lastAct=''; p.revealed=false; p.rangeCap=1; p.rangeFloor=0; p.checkedStreet=false;
    p.aggStreets=[]; p.checkStreets=[]; p.lineRead='';
  }
  state.dealerIdx=nextSeat(state.dealerIdx,p=>!p.out);
  const n=alive().length;
  let sbIdx,bbIdx;
  if(n===2){ sbIdx=state.dealerIdx; bbIdx=nextSeat(sbIdx,p=>!p.out); }
  else { sbIdx=nextSeat(state.dealerIdx,p=>!p.out); bbIdx=nextSeat(sbIdx,p=>!p.out); }
  for(const p of alive()) if(state.ante) payAnte(p,state.ante);
  assignPositions(sbIdx);
  payBet(state.players[sbIdx],state.sb); state.players[sbIdx].lastAct='SB '+usd(state.sb);
  payBet(state.players[bbIdx],state.bb); state.players[bbIdx].lastAct='BB '+usd(state.bb);
  state.currentBet=state.bb; state.lastRaiseSize=state.bb;
  for(const p of alive()) p.hole=[state.deck.pop(),state.deck.pop()];
  /* per-hand trackers */
  state.handLog=[]; state.humanDecisions=[]; state.humanWonAmt=0; state.resultText='';
  state.humanHandStats={vpip:false,pfr:false,aBets:0,aCalls:0,sd:false,sdWon:false};
  state.noActionHand=false;
  state.pfAggIdx=-1; state.lastAggIdx=-1;
  state.lastPotAwards=[];
  state.humanStart=state.players[0].chips+state.players[0].totalBet;
  state.humanPlayed=!state.players[0].out;
  prevBoardLen=0; coachRecNow=null;
  sfx('deal');
  log(`— Hand #${state.handNum} · blinds ${usd(state.sb)}/${usd(state.bb)}${state.ante?' ante '+usd(state.ante):''} —`);
  showBanner('');
  hideNextBtn();
  const first=nextSeat(bbIdx,p=>!p.out&&!p.folded&&!p.allIn);
  render();
  if(first===-1 || alive().filter(p=>!p.allIn).length<=1){
    // everyone all-in from blinds/antes — nobody can act this hand
    state.noActionHand=true;
    refundUncalled(); runout();
  } else beginRound(first);
}

function beginRound(firstIdx){ state.turnIdx=firstIdx; saveResume(); promptNext(); }

function findNextActor(){
  const n=state.players.length;
  for(let k=0;k<n;k++){
    const j=(state.turnIdx+k)%n;
    const p=state.players[j];
    if(p.out||p.folded||p.allIn) continue;
    if(!p.acted||p.bet<state.currentBet) return j;
  }
  return -1;
}

function promptNext(){
  if(state.gameOver||state.handOver) return;
  if(inHand().length===1) return endHandFold();
  const j=findNextActor();
  if(j===-1) return endRound();
  state.turnIdx=j;
  state.turnDeadline=0;
  const p=state.players[j];
  render();
  if(p.isHuman){
    armTurnTimer(p);
    showActions(p);
  }else if(p.remote){
    armTurnTimer(p);
    /* remote human: the snapshot broadcast tells their client it's their turn; we wait.
       If their connection is gone, auto-fold after a short grace so the table never stalls. */
    if(!mpConnAlive(p.i)){
      later(()=>{
        if(state.gameOver||state.handOver||state.turnIdx!==p.i)return;
        if(mpConnAlive(p.i)){promptNext();return;}   // they came back just in time
        const ca=Math.min(state.currentBet-p.bet,p.chips);
        applyAction(p,ca>0?'fold':'call');
        state.turnIdx=(p.i+1)%state.players.length;
        promptNext();
      },2500);
    }
  }else{
    let delay=AI_DELAY_MIN+Math.random()*(AI_DELAY_MAX-AI_DELAY_MIN);
    if(fastFwd()) delay=Math.min(delay,120+Math.random()*120);
    later(()=>{
      if(state.gameOver||state.handOver) return;
      const dec=(state.cfg.coachBot&&p.i===0)?coachBotDecide(p):aiDecide(p);
      applyAction(p,dec.type,dec.amount);
      state.turnIdx=(j+1)%state.players.length;
      promptNext();
    },delay);
  }
}

function applyAction(p,type,amt){
  if(p.bankInUse){p.bank=Math.max(0,(p.bank||0)-(Date.now()-p.bankInUse));p.bankInUse=0;state.turnBank=false;}
  const callAmt=state.currentBet-p.bet;
  const cbBefore=state.currentBet;   // bet level BEFORE this action (for line reading)
  if(type==='fold'){
    p.folded=true; p.lastAct='Fold'; sfx('fold');
  }else if(type==='call'){
    const paid=payBet(p,callAmt);
    p.lastAct = callAmt<=0 ? 'Check' : (p.allIn?'All-in '+usd(p.bet):'Call '+usd(paid));
    sfx(callAmt<=0?'check':'chip');
    if(callAmt>0){
      narrowRange(p, state.stage==='preflop'?0.35:0.50);
      p.rangeFloor=(p.rangeFloor||0)*0.5;   // calling after checking: medium strength, weakness read fades
    }else{
      if(state.stage!=='preflop') weakenRange(p); // a check usually means no strong hand postflop
      p.checkedStreet=true;
      if(!p.checkStreets)p.checkStreets=[];
      if(!p.checkStreets.includes(state.stage))p.checkStreets.push(state.stage);
    }
  }else if(type==='raise'){
    let target=Math.min(amt,p.bet+p.chips);
    const minTarget=state.currentBet+state.lastRaiseSize;
    if(target<minTarget) target=Math.min(minTarget,p.bet+p.chips);
    if(target<=state.currentBet){ // can't actually raise -> treat as call
      return applyAction(p,'call');
    }
    payBet(p,target-p.bet);
    const raiseSize=target-state.currentBet;
    if(raiseSize>=state.lastRaiseSize){
      state.lastRaiseSize=raiseSize;
      for(const q of state.players) if(q!==p&&!q.folded&&!q.allIn&&!q.out) q.acted=false;
    }
    state.currentBet=target;
    p.lastAct=(p.allIn?'All-in ':'Raise to ')+usd(target);
    sfx('chip');
    /* read the LINE: what does this bet mean in the context of the whole hand? */
    p.lineRead='';
    let base=state.stage==='preflop'?0.15:0.25;
    if(state.stage!=='preflop'){
      const opened=cbBefore===0;                       // a fresh bet, not a raise of a bet
      const pfAgg=state.pfAggIdx;
      if(opened&&pfAgg===p.i&&state.stage==='flop'){
        base=0.45; p.lineRead='cbet';                  // routine continuation bet: weak info
      }else if(opened&&pfAgg>=0&&pfAgg!==p.i&&!state.players[pfAgg].folded){
        base=0.16; p.lineRead='donk';                  // betting INTO the raiser: unusual, strong
      }
      if(p.aggStreets.includes('flop')&&p.aggStreets.includes('turn')&&state.stage==='river'){
        base*=0.55; p.lineRead='barrel3';              // third barrel: very strong
      }else if((state.stage==='turn'&&p.aggStreets.includes('flop'))||(state.stage==='river'&&p.aggStreets.includes('turn'))){
        base*=0.7; p.lineRead='barrel2';               // second barrel: strong
      }
    }
    /* the bigger the raise relative to the pot, the narrower the credible range */
    const potNow=state.players.reduce((s,q)=>s+q.totalBet,0);
    const ratio=raiseSize/Math.max(potNow-raiseSize,state.bb);
    let cap=base;
    if(ratio>=1.2) cap*=0.35;        // overbet / jam → very strong
    else if(ratio>=0.8) cap*=0.55;   // pot-sized
    else if(ratio>=0.5) cap*=0.8;    // 2/3-pot-ish
    if(p.checkedStreet){ cap*=0.5; p.lineRead='checkraise'; } // the check was a trap
    p.rangeFloor=0;                  // betting cancels any weakness read
    narrowRange(p, cap);
    p.aggStreets.push(state.stage);
    if(state.stage==='preflop') state.pfAggIdx=p.i;
    state.lastAggIdx=p.i;
  }
  p.acted=true;
  log(`${p.name}: ${p.lastAct}`);
  saveResume();
  render();
}

/* narrow a player's assumed range after a show of strength, scaled by personality */
function narrowRange(p,cap){
  const mult = p.style ? ({rock:0.7,station:1.4,shark:1.0,maniac:1.7})[p.style.id]||1 : 1;
  p.rangeCap=clamp(Math.min(p.rangeCap, cap*mult),0.03,1);
}
/* a check usually denies a strong hand: trim the TOP of the assumed range.
   Maniacs/stations bet whenever strong, so their checks say the most;
   sharks trap sometimes, so theirs say the least. */
function weakenRange(p){
  const mult = p.style ? ({rock:1.0,station:1.2,shark:0.6,maniac:1.4})[p.style.id]||1 : 1;
  p.rangeFloor=clamp((p.rangeFloor||0)+0.07*mult, 0, 0.25);
}
function refundUncalled(){
  let maxB=0,second=0,who=null;
  for(const p of state.players){
    if(p.bet>maxB){second=maxB;maxB=p.bet;who=p;}
    else if(p.bet>second)second=p.bet;
  }
  if(who&&maxB>second){
    const r=maxB-second;
    who.chips+=r; who.bet-=r; who.totalBet-=r;
    if(who.allIn&&who.chips>0) who.allIn=false;
  }
}

function endRound(){
  refundUncalled();
  const hadBets=state.players.some(p=>p.bet>0);
  if(hadBets) animateChipsToPot();
  render();   // show the LAST action of the street (e.g. the final check) BEFORE the next card
  const pause=fastFwd()?160:hadBets?700:600;
  later(()=>{
    if(!state||state.gameOver||state.handOver)return;
    for(const p of state.players){p.bet=0;p.acted=false;p.checkedStreet=false;}
    state.currentBet=0; state.lastRaiseSize=state.bb;
    const live=inHand();
    if(live.length===1) return endHandFold();
    if(state.stage==='river') return showdown();
    const canAct=live.filter(p=>!p.allIn);
    if(canAct.length<=1) return runout();
    dealNext();
    render();
    const first=nextSeat(state.dealerIdx,p=>!p.out&&!p.folded&&!p.allIn);
    beginRound(first);
  },pause);
}

function dealNext(){
  if(state.stage==='preflop'){ state.board.push(state.deck.pop(),state.deck.pop(),state.deck.pop()); state.stage='flop'; }
  else if(state.stage==='flop'){ state.board.push(state.deck.pop()); state.stage='turn'; }
  else if(state.stage==='turn'){ state.board.push(state.deck.pop()); state.stage='river'; }
  log(`— ${state.stage[0].toUpperCase()+state.stage.slice(1)}: ${state.board.map(c=>RANK_CH[c.r]+SUIT_CH[c.s]).join(' ')} —`);
  sfx('deal');
}

function runout(){
  for(const p of inHand()) p.revealed=true;
  render();
  const d=fastFwd()?Math.min(RUNOUT_DELAY,320):RUNOUT_DELAY;
  const step=()=>{
    if(state.gameOver) return;
    if(state.stage==='river'){ later(showdown,d*0.8); return; }
    dealNext(); render();
    later(step,d);
  };
  later(step,d*0.8);
}

function endHandFold(){
  state.handOver=true;
  refundUncalled();
  if(state.players.some(p=>p.bet>0)) animateChipsToPot();
  const w=inHand()[0];
  const pot=state.players.reduce((s,p)=>s+p.totalBet,0);
  w.chips+=pot;
  state.lastPotAwards=[{
    winnerIds:[w.i],
    contributorIds:state.players.filter(p=>p.totalBet>0).map(p=>p.i)
  }];
  for(const p of state.players){ p.totalBet=0; p.bet=0; }
  state.resultText=`${w.name} ${w.isHuman?'win':'wins'} ${money(pot)} (everyone folded)`;
  if(w.isHuman){state.humanWonAmt=pot;sfx('win');haptic([14,40,14]);}
  log(state.resultText);
  showBanner(`${w.name} ${w.isHuman?'win':'wins'} ${money(pot)}`);
  render([w]);
  setTimeout(()=>animatePotToWinner([w]),300);
  finishHand(FOLDWIN_PAUSE);
}

function showdown(){
  state.handOver=true;
  const live=inHand();
  for(const p of live) p.revealed=true;
  const scores=new Map();
  for(const p of live) scores.set(p,evalSeven(p.hole.concat(state.board)));
  // side pots by contribution level
  const lvls=[...new Set(state.players.filter(p=>p.totalBet>0).map(p=>p.totalBet))].sort((a,b)=>a-b);
  let prev=0;
  const winnings=new Map();
  state.lastPotAwards=[];
  let mainWinners=[];
  for(const lvl of lvls){
    let amt=0;
    const contributorIds=[];
    for(const p of state.players) amt+=Math.max(0,Math.min(p.totalBet,lvl)-prev);
    for(const p of state.players){
      if(Math.max(0,Math.min(p.totalBet,lvl)-prev)>0) contributorIds.push(p.i);
    }
    let elig=live.filter(p=>p.totalBet>=lvl);
    if(elig.length===0) elig=live; // safety (shouldn't occur after refunds)
    let best=null,winners=[];
    for(const p of elig){
      const s=scores.get(p);
      if(!best||cmpScore(s,best)>0){best=s;winners=[p];}
      else if(cmpScore(s,best)===0)winners.push(p);
    }
    const share=Math.floor(amt/winners.length);
    const rem=amt-share*winners.length;
    const seatOrd=seatOrderFromDealer();
    winners.sort((a,b)=>seatOrd.indexOf(a.i)-seatOrd.indexOf(b.i));
    for(let wi=0;wi<winners.length;wi++){
      const w=winners[wi];
      const add=share+(wi<rem?1:0);
      w.chips+=add;
      winnings.set(w,(winnings.get(w)||0)+add);
    }
    state.lastPotAwards.push({winnerIds:winners.map(w=>w.i),contributorIds});
    mainWinners=winners;
    prev=lvl;
  }
  for(const p of state.players) p.totalBet=0;
  const parts=[];
  for(const [w,amt] of winnings){
    if(amt<=0) continue;
    parts.push(`${w.name} ${w.isHuman?'win':'wins'} ${money(amt)} with ${handName(scores.get(w))}`);
    log(`${w.name} ${w.isHuman?'win':'wins'} ${money(amt)} — ${handName(scores.get(w))}`);
  }
  state.resultText=parts.join(' · ');
  const hw=winnings.get(state.players[0])||0;
  if(hw>0){state.humanWonAmt=hw;sfx('win');haptic([14,40,14]);}
  showBanner(parts.join(' · '));
  render([...winnings.keys()]);
  setTimeout(()=>animatePotToWinner([...winnings.keys()]),300);
  finishHand(SHOWDOWN_PAUSE);
}

function finishHand(pause){
  if(fastFwd()) pause=Math.min(pause,1300);
  if(typeof getMode().beforeStats==='function') getMode().beforeStats(state);
  /* snapshot for replay */
  lastHand={
    num:state.handNum,
    board:state.board.slice(),
    result:state.resultText,
    log:(state.handLog||[]).slice(),
    players:state.players.filter(q=>q.hole.length>0).map(q=>({
      name:q.name,avatar:q.avatar,hole:q.hole.slice(),folded:q.folded&&!q.isHuman||q.folded,
      won:state.resultText.includes(q.name+' win')
    }))
  };
  /* stats + coach feedback */
  if(!state.cfg.allAI && state.humanPlayed){
    const net=(state.players[0].chips+state.players[0].totalBet)-state.humanStart;
    /* showdown tracking */
    const hs=state.humanHandStats||{};
    const sd=state.players.filter(q=>q.hole.length>0&&!q.folded).length>=2;
    if(sd&&!state.players[0].folded){hs.sd=true;if(state.humanWonAmt>0)hs.sdWon=true;}
    {
      const S=state.sessStats;
      if(hs.vpip)S.vpipH=(S.vpipH||0)+1;
      if(hs.pfr)S.pfrH=(S.pfrH||0)+1;
      S.aBets=(S.aBets||0)+(hs.aBets||0); S.aCalls=(S.aCalls||0)+(hs.aCalls||0);
      if(hs.sd){S.sdSeen=(S.sdSeen||0)+1;if(hs.sdWon)S.sdWon=(S.sdWon||0)+1;}
    }
    for(const S of [state.sessStats,lifeStats]){
      if(!S)continue;
      S.hands++; S.net+=net;
      if(state.humanWonAmt>0){S.won++;S.biggest=Math.max(S.biggest,state.humanWonAmt);}
      for(const dd of state.humanDecisions){S.decisions++;if(dd.followed)S.followed++;}
    }
    saveStats();
    renderFeedback(net);
    renderStats();
    /* hand record: in-memory replayer + persistent history (export & analysis) */
    const cs=c=>RANK_CH[c.r]+'shdc'[c.s];
    const entry={
      gameId:state.gameId, t:new Date().toISOString(), hand:state.handNum, level:state.level+1,
      blinds:[state.sb,state.bb], ante:state.ante,
      board:state.board.map(cs),
      players:lastHand.players.map(q=>({name:q.name,avatar:q.avatar,cards:q.hole.map(cs),folded:q.folded,won:q.won})),
      myNet:net, my:{vpip:!!hs.vpip,pfr:!!hs.pfr,aBets:hs.aBets||0,aCalls:hs.aCalls||0,sd:!!hs.sd,sdWon:!!hs.sdWon},
      myDecisions:state.humanDecisions.slice(),
      result:state.resultText, actions:lastHand.log.slice()
    };
    (state.gameHands=state.gameHands||[]).push(entry);
    while(state.gameHands.length>300) state.gameHands.shift();
    try{
      const hist=JSON.parse(localStorage.getItem('sg_poker_history')||'[]');
      hist.push(entry);
      while(hist.length>3000) hist.shift();
      localStorage.setItem('sg_poker_history',JSON.stringify(hist));
    }catch(e){}
  }
  // eliminations / rebuys (mode-specific)
  const endResult=getMode().afterHand(state);
  if(typeof globalThis.__onHandEnd==='function') globalThis.__onHandEnd(state);
  saveResume();
  if(state.cfg.allAI){
    if(alive().length<=1){ state.gameOver=true; if(typeof globalThis.__onGameOver==='function') globalThis.__onGameOver(state); return; }
    later(startHand,pause); return;
  }
  if(endResult.gameOver){
    state.gameOver=true;
    setTimeout(()=>{
      if(endResult.cash) showCashSessionEnd();
      else showGameOver(endResult.won,endResult.place);
    },Math.min(pause,2500));
    return;
  }
  showNextBtn(pause);
}

/* ================= SOUND ================= */
let audioCtx=null,soundOn=true;
function sfx(kind){
  if(!HAS_DOM||!soundOn||BENCH)return;
  try{
    audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();
    const t0=audioCtx.currentTime;
    const tone=(f,t,d,vol,type)=>{
      const o=audioCtx.createOscillator(),g=audioCtx.createGain();
      o.type=type||'sine';o.frequency.value=f;
      g.gain.setValueAtTime(vol,t0+t);
      g.gain.exponentialRampToValueAtTime(0.0001,t0+t+d);
      o.connect(g);g.connect(audioCtx.destination);
      o.start(t0+t);o.stop(t0+t+d);
    };
    if(kind==='deal'){tone(950,0,0.05,0.045,'triangle');}
    else if(kind==='chip'){tone(1500,0,0.04,0.05,'square');tone(1900,0.05,0.04,0.04,'square');}
    else if(kind==='fold'){tone(220,0,0.08,0.045);}
    else if(kind==='check'){tone(480,0,0.045,0.04);}
    else if(kind==='tick'){tone(1150,0,0.03,0.09,'square');tone(750,0.05,0.025,0.05,'square');}
    else if(kind==='alert'){tone(660,0,0.11,0.06);tone(880,0.12,0.11,0.05);}
    else if(kind==='win'){tone(523,0,0.12,0.07);tone(659,0.12,0.12,0.07);tone(784,0.24,0.22,0.07);}
  }catch(e){}
}

/* ================= HAPTICS ================= */
function haptic(pat){ if(HAS_DOM&&navigator.vibrate){try{navigator.vibrate(pat);}catch(e){}} }

/* ================= FLYING CHIPS ================= */
function feltCenter(){ const f=$('felt'); return {x:f.clientWidth/2,y:f.clientHeight/2}; }
function flyChips(fromX,fromY,toX,toY,n,delay){
  if(BENCH)return;
  if(!HAS_DOM)return;
  const felt=$('felt'); if(!felt)return;
  const cols=['#3d6bd6','#e8b64c','#2e9e5b','#c94f4c','#23262d'];
  for(let i=0;i<n;i++){
    const el=document.createElement('div');
    el.className='flychip';
    el.style.cssText+=`width:16px;height:16px;border-radius:50%;background:${cols[i%cols.length]};border:2px dashed rgba(255,255,255,.75);box-shadow:0 2px 3px rgba(0,0,0,.5);left:${fromX}px;top:${fromY-i*3}px;opacity:0;`;
    felt.appendChild(el);
    const d=(delay||0)+i*45;
    setTimeout(()=>{el.style.opacity='1';},d);
    setTimeout(()=>{el.style.left=toX+'px';el.style.top=(toY-i*3)+'px';},d+30);
    setTimeout(()=>{el.style.opacity='0';},d+430);
    setTimeout(()=>{el.remove();},d+650);
  }
}
/* slide each player's bet chips into the central pot */
function animateChipsToPot(){
  if(!HAS_DOM||!state||BENCH)return;
  const c=feltCenter();
  for(const p of state.players){
    if(p.bet<=0)continue;
    const bet=$('bet'+p.i); if(!bet)continue;
    const fx=parseFloat(bet.style.left)||c.x, fy=parseFloat(bet.style.top)||c.y;
    flyChips(fx,fy,c.x,c.y+4,3,0);
  }
}
/* push the pot to the winning seat(s) */
function animatePotToWinner(winners){
  if(!HAS_DOM||!state||!winners||!winners.length||BENCH)return;
  const c=feltCenter(), felt=$('felt');
  for(const w of winners){
    const seat=$('seat'+w.i); if(!seat)continue;
    const tx=parseFloat(seat.style.left)||c.x, ty=(parseFloat(seat.style.top)||c.y)+40;
    flyChips(c.x,c.y+4,tx,ty,5,120);
  }
}

/* ================= STATS (persist across sessions) ================= */
function loadStats(){
  try{const s=JSON.parse(localStorage.getItem('sg_poker_stats'));if(s&&typeof s.hands==='number')return s;}catch(e){}
  return {hands:0,won:0,net:0,biggest:0,decisions:0,followed:0};
}
let lifeStats=loadStats();
function saveStats(){try{localStorage.setItem('sg_poker_stats',JSON.stringify(lifeStats));}catch(e){}}
/* tournament resume: snapshot at each hand boundary or mid-hand after every action */
function cardToCode(c){ return RANK_CH[c.r]+'shdc'[c.s]; }
function codesToCards(codes){ return (codes||[]).map(parseCardCode); }
function saveResume(){
  if(!HAS_DOM||!state||state.cfg.allAI||state.cfg.mpRemotes||state.cfg.mpClient)return;
  try{
    if(getMode().shouldClearResume(state)){
      localStorage.removeItem('sg_poker_resume'); return;
    }
    const snap={
      v:2, t:Date.now(), cfg:state.cfg, gameId:state.gameId,
      handNum:state.handNum, dealerIdx:state.dealerIdx,
      sessStats:state.sessStats, gameDecisions:state.gameDecisions||[],
      gameSeries:(gameSeries||[]).slice(),
      players:state.players.map(q=>({name:q.name,avatar:q.avatar,chips:q.chips,out:q.out,place:q.place||0,style:q.style?q.style.id:null})),
      ...getMode().resumeFields(state)
    };
    if(!state.handOver&&state.stage){
      snap.midHand={
        stage:state.stage, board:state.board.map(cardToCode), deck:state.deck.map(cardToCode),
        currentBet:state.currentBet, lastRaiseSize:state.lastRaiseSize, turnIdx:state.turnIdx,
        level:state.level, bb:state.bb, sb:state.sb, ante:state.ante,
        pfAggIdx:state.pfAggIdx??-1, lastAggIdx:state.lastAggIdx??-1,
        handLog:(state.handLog||[]).slice(), humanDecisions:(state.humanDecisions||[]).slice(),
        humanStart:state.humanStart, humanPlayed:state.humanPlayed,
        humanHandStats:state.humanHandStats?{...state.humanHandStats}:null,
        players:state.players.map(q=>({
          hole:q.hole.map(cardToCode), pos:q.pos||'', bet:q.bet, totalBet:q.totalBet,
          folded:q.folded, allIn:q.allIn, acted:q.acted, lastAct:q.lastAct||'',
          revealed:q.revealed, rangeCap:q.rangeCap, rangeFloor:q.rangeFloor,
          checkedStreet:!!q.checkedStreet, aggStreets:(q.aggStreets||[]).slice(),
          checkStreets:(q.checkStreets||[]).slice(), lineRead:q.lineRead||'', bank:q.bank??TT_BANK
        }))
      };
    }
    localStorage.setItem('sg_poker_resume',JSON.stringify(snap));
  }catch(e){}
}
function restoreMidHand(mh){
  state.handOver=false;
  state.level=mh.level; state.bb=mh.bb; state.sb=mh.sb; state.ante=mh.ante;
  state.board=codesToCards(mh.board);
  state.deck=codesToCards(mh.deck);
  state.stage=mh.stage;
  state.currentBet=mh.currentBet;
  state.lastRaiseSize=mh.lastRaiseSize;
  state.turnIdx=mh.turnIdx;
  state.pfAggIdx=mh.pfAggIdx??-1;
  state.lastAggIdx=mh.lastAggIdx??-1;
  state.handLog=mh.handLog||[];
  state.humanDecisions=mh.humanDecisions||[];
  state.humanStart=mh.humanStart??state.players[0].chips;
  state.humanPlayed=mh.humanPlayed??true;
  state.humanHandStats=mh.humanHandStats||{vpip:false,pfr:false,aBets:0,aCalls:0,sd:false,sdWon:false};
  state.humanWonAmt=0; state.resultText=''; state.noActionHand=false;
  logLines=state.handLog.slice();
  prevBoardLen=state.board.length;
  coachRecNow=null;
  mh.players.forEach((q,i)=>{
    const p=state.players[i]; if(!p)return;
    p.hole=codesToCards(q.hole);
    p.bet=q.bet; p.totalBet=q.totalBet;
    p.folded=q.folded; p.allIn=q.allIn; p.acted=q.acted;
    p.lastAct=q.lastAct||''; p.revealed=q.revealed;
    p.rangeCap=q.rangeCap??1; p.rangeFloor=q.rangeFloor??0;
    p.checkedStreet=!!q.checkedStreet;
    p.aggStreets=(q.aggStreets||[]).slice();
    p.checkStreets=(q.checkStreets||[]).slice();
    p.lineRead=q.lineRead||'';
    p.bank=q.bank??TT_BANK;
    p.pos=q.pos||'';
  });
  showBanner(T('revMidBanner'));
  hideNextBtn();
  render();
  promptNext();
}
function applyResumeSnapshot(sv){
  logLines=[];
  $('setup').classList.add('hidden');
  $('game').classList.remove('hidden');
  closeDialog($('overlay'));
  $('tDiff').textContent=sv.cfg.difficulty[0].toUpperCase()+sv.cfg.difficulty.slice(1);
  newGame(sv.cfg);
  state.gameId=sv.gameId||state.gameId;
  state.handNum=sv.handNum; state.dealerIdx=sv.dealerIdx;
  if(sv.sessStats) state.sessStats=Object.assign(state.sessStats,sv.sessStats);
  state.gameDecisions=sv.gameDecisions||[];
  gameSeries=sv.gameSeries||[];
  try{
    const hist=JSON.parse(localStorage.getItem('sg_poker_history')||'[]');
    state.gameHands=hist.filter(h=>h.gameId===state.gameId);
  }catch(e){}
  sv.players.forEach((q,i)=>{
    const p=state.players[i]; if(!p)return;
    p.name=q.name; p.avatar=q.avatar; p.chips=q.chips; p.out=q.out; p.place=q.place||0;
    if(q.style) p.style=STYLES.find(s=>s.id===q.style)||p.style;
  });
  getMode().restoreFields(sv,state);
  buildSeats(); hideActions(); lastHand=null;
  $('coachFeed').classList.add('hidden');
  renderStats();
  updateOrient();
  showEmoteBtn();
  if(sv.midHand) restoreMidHand(sv.midHand);
  else setTimeout(startHand,400);
}
function clearResume(){try{localStorage.removeItem('sg_poker_resume');}catch(e){}}
let coachRecNow=null,lastHand=null,gameSeries=[];
