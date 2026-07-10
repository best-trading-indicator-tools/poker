/* ================= AI BRAIN ================= */
function chen(hole){
  const hi=hole[0].r>=hole[1].r?hole[0]:hole[1];
  const lo=hole[0].r>=hole[1].r?hole[1]:hole[0];
  let v = hi.r===14?10 : hi.r===13?8 : hi.r===12?7 : hi.r===11?6 : hi.r/2;
  if(hi.r===lo.r) return Math.max(5,v*2);
  if(hi.s===lo.s) v+=2;
  const gap=hi.r-lo.r-1;
  if(gap===1) v-=1; else if(gap===2) v-=2; else if(gap===3) v-=4; else if(gap>=4) v-=5;
  if(gap<=1 && hi.r<12) v+=1;
  return v;
}
function preflopEq(hole,live){
  let e=clamp(chen(hole)/16,0.06,0.97);
  e=Math.pow(e,1+(live-2)*0.12);
  return e;
}
function mcEquity(hole,board,opps,sims){
  const used=new Set();
  for(const c of hole) used.add(c.r*4+c.s);
  for(const c of board) used.add(c.r*4+c.s);
  const rest=FULL_DECK.filter(c=>!used.has(c.r*4+c.s)).slice();
  const need=opps*2+(5-board.length);
  let win=0;
  for(let t=0;t<sims;t++){
    for(let i=0;i<need;i++){
      const j=i+Math.floor(Math.random()*(rest.length-i));
      const tmp=rest[i];rest[i]=rest[j];rest[j]=tmp;
    }
    const fullBoard=board.concat(rest.slice(opps*2,need));
    const my=evalSeven(hole.concat(fullBoard));
    let res=1;
    for(let o=0;o<opps;o++){
      const os=evalSeven([rest[2*o],rest[2*o+1]].concat(fullBoard));
      const c=cmpScore(my,os);
      if(c<0){res=0;break;}
      if(c===0) res=Math.min(res,0.5);
    }
    win+=res;
  }
  return win/sims;
}

function aiCashDepth(stackBB){
  return clamp((stackBB-35)/65,0,1);
}
function aiEffectiveStyle(p){
  const st=p&&p.style;
  if(!st||!state||!state.cfg||state.cfg.difficulty!=='hard') return st;
  const t=Object.assign({},st);
  if(st.id==='rock'){
    Object.assign(t,{margin:+0.045,raiseT:+0.025,raiseF:-0.06,bluff:+0.005,size:0.86,adapt:0.50,openMult:0.70,raiseCap:0.13,foldRaise:+0.045});
  }else if(st.id==='station'){
    Object.assign(t,{margin:-0.055,raiseT:+0.005,raiseF:+0.04,bluff:+0.015,size:0.96,adapt:0.65,openMult:1.35,raiseCap:0.27,foldRaise:-0.02});
  }else if(st.id==='shark'){
    Object.assign(t,{margin:0,raiseT:-0.06,raiseF:+0.24,bluff:+0.09,size:1.14,adapt:1.15,openMult:1.12,raiseCap:0.32,foldRaise:-0.025});
  }else if(st.id==='maniac'){
    Object.assign(t,{margin:-0.045,raiseT:-0.09,raiseF:+0.32,bluff:+0.14,size:1.22,adapt:0.90,openMult:1.55,raiseCap:0.40,foldRaise:-0.055});
  }
  return t;
}
function aiHeadsUpPressure(p){
  const live=alive();
  if(live.length!==2) return {active:false,leadRatio:1,leadBoost:0};
  const opp=live.find(q=>q!==p);
  if(!opp) return {active:false,leadRatio:1,leadBoost:0};
  const mine=p.chips+p.bet, theirs=opp.chips+opp.bet;
  const leadRatio=mine/Math.max(theirs,1);
  const leadBoost=leadRatio>=3?1:leadRatio>=2?0.75:leadRatio>=1.5?0.5:leadRatio>=1.2?0.25:0;
  return {active:true,leadRatio,leadBoost};
}
function aiOpenThr(p, press){
  const bucket=posBucket(p.pos||'BTN');
  const st=aiEffectiveStyle(p);
  const mult=(st&&st.openMult)||1;
  let thr=(OPEN_THR[bucket]||0.20)*mult;
  const adapt=st?.adapt||0;
  const stackBB=(p.chips+p.bet)/state.bb;
  const hu=aiHeadsUpPressure(p);
  if(isCashGame()){
    const deep=aiCashDepth(stackBB);
    if(/^(CO|BTN|SB|SB\/BTN)$/.test(p.pos||''))
      thr=Math.min(0.72, thr+0.05+deep*0.12);
    else if(/^MP/.test(p.pos||'')||p.pos==='HJ')
      thr=Math.min(0.58, thr+0.02+deep*0.06);
    if(stackBB<25) thr=Math.min(0.72, thr+press*adapt*0.08);
  }else if(st?.id==='shark' && /^(CO|BTN|SB|SB\/BTN)$/.test(p.pos))
    thr=Math.min(0.62, thr+0.06+press*adapt*0.14);
  else
    thr=Math.min(0.72, thr+press*adapt*0.10);
  if(hu.active) thr=Math.min(0.92, thr+(p.pos==='SB/BTN'?0.22:0.10)+hu.leadBoost*0.18);
  if(st?.id==='rock' && /^UTG/.test(p.pos||'')) thr*=0.85;
  return Math.min(hu.active?0.92:0.72, thr);
}
function handInOpenRange(p, press){
  return (handPct[holeCode(p.hole)]||1)<=aiOpenThr(p, press);
}
function aiOpenRaiseProb(p, d){
  const sid=aiEffectiveStyle(p)?.id;
  const base=d==='easy'?0.48:d==='medium'?0.72:0.94;
  if(sid==='rock') return base*0.55;
  if(sid==='station') return d==='easy'?0.38:d==='medium'?0.50:0.84;
  if(sid==='maniac') return d==='easy'?0.82:d==='medium'?0.90:0.98;
  if(sid==='shark') return Math.min(0.98,base+0.04);
  return base;
}
function aiShortPushThr(p, stackBB){
  const bucket=posBucket(p.pos||'BTN');
  const press=isCashGame()?clamp((16-stackBB)/6,0,1)*0.5:tourneyPressure(stackBB);
  const st=aiEffectiveStyle(p);
  const sid=st?.id;
  const hu=aiHeadsUpPressure(p);
  let thr=(PUSH_THR[bucket]||0.25)*((st&&{rock:0.55,station:1.20,shark:1.08,maniac:1.35}[st.id])||1);
  if(sid==='rock') thr*=0.50;
  else if(sid==='station') thr=Math.min(0.72, thr*1.4);
  else if(sid==='maniac' && /^(CO|BTN|SB|SB\/BTN)$/.test(p.pos)) thr=Math.min(0.88, thr*2.0);
  else if(sid==='shark' && /^(CO|BTN)$/.test(p.pos)) thr=Math.min(0.50, thr*1.12);
  if(hu.active) thr=Math.min(0.94, thr*(p.pos==='SB/BTN'?1.45:1.2)+hu.leadBoost*0.16);
  return Math.min(hu.active?0.94:0.90, thr+press*(st?.adapt||0)*0.12);
}
function aiHeadsUpShortStackJam(p,callAmt,d){
  if(isCashGame()||state.stage!=='preflop')return null;
  const live=alive();
  if(live.length!==2)return null;
  const opp=live.find(q=>q!==p);
  if(!opp)return null;
  const myStack=p.chips+p.bet, oppStack=opp.chips+opp.bet;
  const stackBB=myStack/Math.max(state.bb,1);
  const shortRatio=myStack/Math.max(oppStack,1);
  if(stackBB>14||shortRatio>0.80)return null;
  const pos=p.pos||'SB/BTN';
  const sbBtn=/^(SB\/BTN|BTN|SB)$/.test(pos);
  const effBB=Math.min(myStack,oppStack)/Math.max(state.bb,1);
  const base=typeof headsUpShoveThreshold==='function'
    ?headsUpShoveThreshold(pos,effBB,callAmt)
    :(sbBtn?(effBB<=5?1:effBB<=8?0.86:effBB<=12?0.66:0.48):(effBB<=5?0.78:effBB<=8?0.60:effBB<=12?0.44:0.32));
  let thr=base;
  if(shortRatio<=0.33)thr+=0.16;
  else if(shortRatio<=0.50)thr+=0.11;
  else if(shortRatio<=0.70)thr+=0.06;
  if(stackBB<=4)thr=Math.max(thr,sbBtn?1.00:0.86);
  else if(stackBB<=6)thr=Math.max(thr,sbBtn?0.94:0.72);
  else if(stackBB<=9)thr=Math.max(thr,sbBtn?0.82:0.58);
  else if(stackBB<=12)thr=Math.max(thr,sbBtn?0.68:0.46);
  const sid=p.style?.id;
  if(sid==='rock')thr-=0.03;
  else if(sid==='station')thr+=0.03;
  else if(sid==='shark')thr+=0.04;
  else if(sid==='maniac')thr+=0.08;
  if(d==='hard')thr+=0.04;
  else if(d==='easy')thr-=0.04;
  thr=clamp(thr,0.12,sbBtn?1.00:0.96);
  const pr=handPct[holeCode(p.hole)]||1;
  if(callAmt===0){
    if(pr<=thr && (sbBtn||stackBB<=7))return {type:'raise',amount:p.bet+p.chips};
    return null;
  }
  if(pr<=thr)return {type:'raise',amount:p.bet+p.chips};
  const odds=callAmt/Math.max(state.players.reduce((s,q)=>s+q.totalBet,0)+callAmt,1);
  if(stackBB<=5&&pr<=Math.min(0.96,thr+0.10))return {type:'raise',amount:p.bet+p.chips};
  if(stackBB<=7&&callAmt<=state.bb&&pr<=Math.min(0.92,thr+0.12))return {type:'call'};
  if(stackBB<=5&&preflopEq(p.hole,2)>=odds+0.02)return {type:'call'};
  return null;
}
function aiCanValueRaise(p){
  const st=aiEffectiveStyle(p);
  if(!st) return true;
  const hu=aiHeadsUpPressure(p);
  const cap=(st.raiseCap||0.22)+(hu.active?0.16+hu.leadBoost*0.14:0);
  return (handPct[holeCode(p.hole)]||1)<=Math.min(0.55,cap);
}
function aiOppCaps(p){
  return inHand().filter(q=>q!==p)
    .map(q=>({cap:clamp(q.rangeCap||1,0.03,1),floor:clamp(q.rangeFloor||0,0,0.25)}))
    .sort((a,b)=>a.cap-b.cap).slice(0,4);
}
function aiEstEquity(p, live, d){
  const sims=d==='hard'?160:d==='medium'?70:35;
  const caps=aiOppCaps(p);
  if(state.stage==='preflop'){
    if(caps.length) return mcEquityR(p.hole,[],caps,sims);
    return preflopEq(p.hole,live);
  }
  if(caps.length) return mcEquityR(p.hole,state.board,caps,sims);
  return mcEquity(p.hole,state.board,Math.min(live-1,3),sims);
}
function aiIsLate(p){
  const n=state.players.length;
  const dist=(p.i-state.dealerIdx+n)%n;
  return dist===0||dist===n-1;
}
/* postflop profile biases: rocks/stations don't bluff; sharks c-bet more IP; maniacs sometimes check */
function aiPostflopAdj(p, callAmt, pot){
  const st=aiEffectiveStyle(p);
  if(state.stage==='preflop'||!st) return {margin:0, bluffMult:1, betBoost:0, giveUp:false};
  const sid=st.id;
  let margin=0, bluffMult=1, betBoost=0, giveUp=false;
  const cashDeep=isCashGame()?aiCashDepth((p.chips+p.bet)/state.bb):0;
  const hu=aiHeadsUpPressure(p);
  if(sid==='rock'){
    bluffMult=0;
    if(callAmt>0){
      const agg=state.lastAggIdx>=0?state.players[state.lastAggIdx]:null;
      if(agg&&agg.aggStreets&&agg.aggStreets.length>=2) margin+=0.06;
      else if(callAmt>=pot*0.5) margin+=0.04;
    }
  }else if(sid==='station'){
    bluffMult=0;
    margin-=0.07;
  }else if(sid==='shark'){
    if(callAmt===0&&state.stage==='flop'&&state.pfAggIdx===p.i&&aiIsLate(p)) betBoost=0.18;
  }else if(sid==='maniac'){
    bluffMult=1.35;
    if(callAmt===0&&Math.random()<0.08) giveUp=true;
  }
  if(cashDeep>=0.3){
    if(sid==='shark'&&callAmt===0) betBoost+=0.10*cashDeep;
    if(sid==='station') margin-=0.05*cashDeep;
    if(sid==='maniac') bluffMult+=0.12*cashDeep;
    if(sid==='rock'&&callAmt>0&&callAmt>=pot*0.55) margin+=0.05*cashDeep;
  }
  if(hu.active){
    giveUp=false;
    margin-=0.04+hu.leadBoost*0.06;
    bluffMult+=0.18+hu.leadBoost*0.35;
    if(callAmt===0) betBoost+=0.16+hu.leadBoost*0.22;
  }
  return {margin, bluffMult, betBoost, giveUp};
}

function aiTextureForFE(){
  if(typeof boardTexture==='function') return boardTexture(state.board||[]);
  if(!state.board||!state.board.length) return {dry:true,wet:false,paired:false,monotone:false,flushDraw:false};
  const suits=[0,0,0,0], ranks=state.board.map(c=>c.r).sort((a,b)=>a-b);
  for(const c of state.board)suits[c.s]++;
  const paired=ranks.some((r,i,a)=>i&&a[i-1]===r);
  const monotone=Math.max(...suits)>=3;
  const twoTone=suits.some(v=>v>=2)&&!monotone;
  const connected=ranks.length>=3&&ranks[ranks.length-1]-ranks[0]<=4;
  const wet=paired||monotone||connected;
  return {dry:!wet,wet,paired,monotone,flushDraw:monotone||twoTone};
}
function aiStyleFoldBias(q){
  const sid=q.style?.id;
  if(sid==='rock') return 0.13;
  if(sid==='station') return -0.20;
  if(sid==='shark') return -0.03;
  if(sid==='maniac') return -0.12;
  return 0;
}
function aiActorPressureBias(p, eq){
  const sid=aiEffectiveStyle(p)?.id;
  const value=eq>=0.50;
  if(sid==='rock') return value?0.55:0.12;
  if(sid==='station') return value?0.62:0.06;
  if(sid==='shark') return value?1.05:0.95;
  if(sid==='maniac') return value?1.05:1.35;
  return value?0.85:0.75;
}
function aiVillainFoldChance(actor,q,betSize,potBefore,d,tex){
  if(q.allIn||q.out||q.folded) return 0;
  const pot=Math.max(potBefore,state.bb||1);
  const ratio=betSize/pot;
  let f=0.26;
  f+=aiStyleFoldBias(q);
  if(q.checkedStreet||(q.checkStreets||[]).includes(state.stage)) f+=0.12;
  if((q.checkStreets||[]).length>=2) f+=0.08;
  f+=clamp(q.rangeFloor||0,0,0.25)*0.75;       // capped top range = easier to push off
  f-=clamp(0.35-(q.rangeCap||1),0,0.30)*0.75; // recently strong range = sticky
  if(q.lineRead==='cbet') f+=0.04;
  else if(q.lineRead==='barrel2'||q.lineRead==='barrel3'||q.lineRead==='checkraise'||q.lineRead==='donk') f-=0.12;
  if(tex.dry) f+=0.06;
  if(tex.wet) f-=0.06;
  if(tex.flushDraw) f-=0.03;
  if(tex.paired&&tex.dry) f+=0.03;
  if(ratio>=1.0) f+=0.12;
  else if(ratio>=0.65) f+=0.07;
  else if(ratio>=0.38) f+=0.02;
  else f-=0.05;
  if(state.stage==='turn') f+=0.03;
  else if(state.stage==='river') f+=0.05;
  const stack=q.chips+q.bet;
  if(!isCashGame()&&stack>0){
    const pressure=betSize/Math.max(stack,1);
    if(pressure>=0.75) f+=0.08;
    else if(pressure>=0.45) f+=0.05;
  }
  const actorStack=actor.chips+actor.bet, villainStack=q.chips+q.bet;
  if(!isCashGame()&&actorStack>villainStack*1.5) f+=0.04;
  if(d==='easy') f+=0.04;
  else if(d==='hard') f-=0.02;
  return clamp(f,0.04,0.78);
}
function aiEstimateFoldEquity(actor,betSize,potBefore,d){
  if(state.stage==='preflop') return 0;
  const targets=inHand().filter(q=>q!==actor&&!q.allIn);
  if(!targets.length) return 0;
  const tex=aiTextureForFE();
  let allFold=1;
  for(const q of targets) allFold*=aiVillainFoldChance(actor,q,betSize,potBefore,d,tex);
  if(targets.length>1) allFold*=Math.pow(0.86,targets.length-1);
  return clamp(allFold,0.01,0.82);
}
function aiBetEV(eq,pot,betSize,foldEq){
  return foldEq*pot+(1-foldEq)*(eq*(pot+2*betSize)-betSize);
}
function aiPressureRaise(p,eq,pot,d,st,pfAdj,callAmt=0){
  if(state.stage==='preflop') return null;
  const sid=aiEffectiveStyle(p)?.id;
  if(sid==='rock'&&eq<0.46) return null;
  if(sid==='station'&&eq<0.50) return null;
  const target=betTarget(p,pot,Math.max(eq,0.45),d);
  const betSize=Math.max(0,Math.min(target-p.bet,p.chips));
  if(betSize<=0) return null;
  const fe=aiEstimateFoldEquity(p,betSize,pot,d);
  const continueEV=callAmt>0 ? Math.max(0,eq*(pot+callAmt)-callAmt) : (eq*pot);
  const pressureEV=aiBetEV(eq,pot,betSize,fe);
  const edge=pressureEV-continueEV;
  const minEdge=Math.max((state.bb||1)*0.15,pot*0.025);
  if(edge<minEdge) return null;
  let freq=(d==='easy'?0.52:d==='medium'?0.74:0.88)*aiActorPressureBias(p,eq);
  freq+=clamp((fe-0.25)*0.7,-0.10,0.22);
  freq+=clamp(edge/Math.max(pot,state.bb||1),0,0.18);
  freq+=st.raiseF*0.18+pfAdj.betBoost*0.4;
  if(eq<0.45) freq*=pfAdj.bluffMult;
  if(callAmt>0) freq*=0.72;
  if(Math.random()>clamp(freq,0.02,0.96)) return null;
  return {type:'raise',amount:target,foldEq:fe,edge};
}
function aiPostflopOrder(){
  if(typeof postflopOrder==='function') return postflopOrder();
  const n=state.players.length, ord=[];
  for(let k=1;k<=n;k++){
    const q=state.players[(state.dealerIdx+k)%n];
    if(!q.out&&!q.folded)ord.push(q);
  }
  return ord;
}
function aiRiverBoardKickerValueSpot(p,d){
  if(state.stage!=='river'||state.currentBet>p.bet)return null;
  const info=typeof boardTwoPairKickerInfo==='function'
    ?boardTwoPairKickerInfo(p.hole,state.board)
    :null;
  if(!info)return null;
  const opps=inHand().filter(q=>q!==p&&!q.allIn);
  if(!opps.length)return null;
  const checkedInFront=opps.filter(q=>q.checkedStreet||(q.checkStreets||[]).includes('river')).length;
  const ord=aiPostflopOrder().filter(q=>!q.allIn);
  const idx=ord.indexOf(p);
  const actorsLeft=idx<0?0:ord.slice(idx+1).filter(q=>q!==p&&!q.allIn).length;
  let freq=d==='hard'?0.72:d==='medium'?0.58:0.38;
  if(checkedInFront>0)freq+=0.12;
  if(actorsLeft===0)freq+=0.10;
  else if(actorsLeft===1)freq+=0.03;
  else freq-=0.10;
  if(info.kicker===14)freq+=0.12;
  else if(info.kicker===13)freq+=0.08;
  else if(info.kicker===12)freq+=0.02;
  else if(info.kicker<=10)freq-=0.08;
  const sid=aiEffectiveStyle(p)?.id;
  if(sid==='rock')freq-=0.15;
  else if(sid==='station')freq-=0.08;
  else if(sid==='shark')freq+=0.08;
  else if(sid==='maniac')freq+=0.05;
  freq-=Math.max(0,opps.length-2)*0.07;
  return {...info,checkedInFront,actorsLeft,freq:clamp(freq,0.18,0.94)};
}
function aiThinRiverValueTarget(p,pot,d,spot){
  const sid=aiEffectiveStyle(p)?.id;
  let frac=d==='hard'?0.46:d==='medium'?0.38:0.30;
  if(spot.actorsLeft>0)frac+=0.04;
  if(spot.kicker===14)frac+=0.04;
  if(sid==='rock')frac-=0.05;
  else if(sid==='maniac')frac+=0.08;
  frac=clamp(frac,0.25,0.62);
  const size=(p.style&&p.style.size)||1;
  let t=state.currentBet+Math.max(state.lastRaiseSize,Math.round(pot*frac*size));
  t=Math.round(t/state.sb)*state.sb;
  return clamp(t,state.currentBet+state.lastRaiseSize,p.bet+p.chips);
}
function aiHardUnopenedPreflop(p,openRange,press,pot,eq,callAmt,d){
  if(d!=='hard'||state.stage!=='preflop'||state.currentBet>state.bb)return null;
  const pos=p.pos||'';
  const pr=handPct[holeCode(p.hole)]||1;
  const sid=aiEffectiveStyle(p)?.id;
  const bbFree=callAmt<=0;
  if(openRange){
    let raiseProb=aiOpenRaiseProb(p,d);
    if(bbFree) raiseProb=pos==='BB'?0.42:0.70;
    if(sid==='shark'||sid==='maniac')raiseProb+=0.04;
    if(Math.random()<clamp(raiseProb,0.20,0.98))
      return {type:'raise',amount:betTarget(p,pot,Math.max(eq,0.62),d)};
    return bbFree?{type:'call'}:{type:'fold'};
  }
  if(bbFree)return {type:'call'};
  const sbComplete=pos==='SB'&&callAmt<=state.sb&&pr<=0.34&&eq>=0.30&&Math.random()<0.16;
  return sbComplete?{type:'call'}:{type:'fold'};
}
function aiHardPreflopVsRaise(p,callAmt,pot,eq,odds,margin,d){
  if(d!=='hard'||state.stage!=='preflop'||state.currentBet<=state.bb||callAmt<=0)return null;
  const pr=handPct[holeCode(p.hole)]||1;
  const raiser=state.lastAggIdx>=0&&state.lastAggIdx!==p.i?state.players[state.lastAggIdx]:null;
  const steal=raiser&&/^(CO|BTN|SB|SB\/BTN)$/.test(raiser.pos||'');
  const earlyR=raiser&&/^(UTG|MP)/.test(raiser.pos||'');
  const blind=/^(BB|SB|SB\/BTN)$/.test(p.pos||'');
  const sid=aiEffectiveStyle(p)?.id;
  let threeBetThr=earlyR?0.065:steal?0.125:0.095;
  if(blind&&steal)threeBetThr+=0.025;
  if(sid==='rock')threeBetThr-=0.018;
  else if(sid==='shark')threeBetThr+=0.025;
  else if(sid==='maniac')threeBetThr+=0.035;
  if(pr<=clamp(threeBetThr,0.04,0.18)&&Math.random()<(sid==='rock'?0.72:0.88))
    return {type:'raise',amount:betTarget(p,pot,Math.max(eq,0.66),d)};
  const defendThr=clamp((steal?0.30:earlyR?0.15:0.22)+(blind?0.06:0)+(sid==='station'?0.04:0),0.10,0.42);
  const expensive=state.currentBet>=state.bb*3.4||callAmt/(pot+callAmt)>0.30;
  if(expensive&&pr>defendThr&&eq<odds+Math.max(0.025,margin*0.45))return {type:'fold'};
  return null;
}
function aiHardPostflopNoBet(p,eq,pot,d,st,pfAdj){
  if(d!=='hard'||state.stage==='preflop'||state.currentBet>p.bet)return null;
  const opps=inHand().filter(q=>q!==p&&!q.allIn);
  if(!opps.length)return null;
  const checked=opps.filter(q=>q.checkedStreet||(q.checkStreets||[]).includes(state.stage)).length;
  const score=evalBest(p.hole.concat(state.board));
  const boardMax=Math.max(...state.board.map(c=>c.r));
  const usesHole=score[0]>=1&&score[0]<=2&&p.hole.some(c=>c.r===score[1]||c.r===score[2]);
  const topPair=score[0]===1&&score[1]===boardMax&&p.hole.some(c=>c.r===score[1]);
  const valueHand=score[0]>=3||(score[0]===2&&usesHole)||topPair;
  const betSize=Math.max(state.bb,Math.round(pot*(opps.length>2?0.46:0.56)));
  const fe=aiEstimateFoldEquity(p,betSize,pot,d);
  const tex=aiTextureForFE();
  const capped=checked>0||opps.some(q=>(q.checkStreets||[]).length>=2);
  const madeFloor=score[0]>=2?0.28:topPair?0.24:0.34;
  const cappedMade=valueHand&&capped&&opps.length<=3&&eq>=madeFloor;
  const value=(eq>=(opps.length>2?0.57:0.50)&&valueHand)||cappedMade;
  const stab=capped&&((eq>=0.34&&fe>=0.20)||(tex.dry&&eq>=0.25&&fe>=0.28));
  if(!value&&!stab)return null;
  let freq=value?0.86:0.62;
  freq+=st.raiseF*0.18+pfAdj.betBoost*0.35;
  if(stab)freq*=pfAdj.bluffMult;
  if(opps.length>2)freq-=0.12;
  if(Math.random()>clamp(freq,0.18,0.94))return null;
  return {type:'raise',amount:betTarget(p,pot,Math.max(eq,value?0.62:0.48),d)};
}
function aiHardPostflopVsBet(p,eq,odds,callAmt,pot,d,st,pfAdj){
  if(d!=='hard'||state.stage==='preflop'||callAmt<=0)return null;
  const betRatio=callAmt/Math.max(pot-callAmt,state.bb||1);
  const score=evalBest(p.hole.concat(state.board));
  const draw=state.stage!=='river'?detectDraws(p.hole,state.board):null;
  const strongDraw=draw&&(draw.flush||draw.oesd);
  const strongMade=score[0]>=3||(score[0]===2&&p.hole.some(c=>c.r===score[1]||c.r===score[2]));
  if(strongMade&&eq>0.58&&betRatio<=0.75&&Math.random()<clamp(0.58+st.raiseF,0.25,0.88))
    return {type:'raise',amount:betTarget(p,pot,Math.max(eq,0.68),d)};
  if(betRatio>=0.75&&!strongMade&&!strongDraw&&eq<odds+0.045)return {type:'fold'};
  if(state.stage==='river'&&betRatio>=0.50&&score[0]<1&&eq<odds+0.06)return {type:'fold'};
  return null;
}

function aiDecide(p){
  const callAmt=Math.min(state.currentBet-p.bet, p.chips);
  const pot=state.players.reduce((s,q)=>s+q.totalBet,0);
  const live=inHand().length;
  const d=state.cfg.difficulty;
  const stackBB=(p.chips+p.bet)/state.bb;
  const cash=isCashGame();
  const cashDeep=cash?aiCashDepth(stackBB):0;
  const hu=aiHeadsUpPressure(p);
  const huAgg=hu.active?(0.16+hu.leadBoost*0.30):0;

  let eq=aiEstEquity(p, live, d);

  const noise = d==='hard'?0.02 : d==='medium'?0.10 : 0.22;
  eq=clamp(eq+(Math.random()*2-1)*noise,0,1);
  const odds = callAmt>0 ? callAmt/(pot+callAmt) : 0;

  const huShortJam=aiHeadsUpShortStackJam(p,callAmt,d);
  if(huShortJam)return huShortJam;

  let posBonus=0;
  if(d==='hard'){
    const n=state.players.length;
    const dist=(p.i-state.dealerIdx+n)%n;            // 0 = dealer (late position)
    posBonus=(dist===0||dist===n-1)?0.04:0;
  }

  // Short-stack push/fold preflop — profile-specific (medium & hard); cash waits until ~14 BB
  const pushCut=cash?14:12;
  if(state.stage==='preflop' && stackBB<pushCut && d!=='easy'){
    const pr=handPct[holeCode(p.hole)]||1;
    const pushThr=aiShortPushThr(p, stackBB);
    const sid=p.style?.id;
    if(callAmt===0){
      if(pr<=pushThr) return {type:'raise',amount:p.bet+p.chips};
      return {type:'call'}; // free option in the BB: check, never fold
    }
    if(pr<=pushThr && (callAmt>state.bb*2||stackBB<8))
      return {type:'raise',amount:p.bet+p.chips};
    if(sid==='rock' && state.currentBet>state.bb*2) return {type:'fold'};
    const callThr=sid==='station'?Math.min(0.78,pushThr*2.2):sid==='rock'?pushThr*0.55:pushThr*1.1;
    if(pr<=callThr || (sid==='station'&&eq>=odds-0.08)) return {type:'call'};
    return {type:'fold'};
  }

  const base=aiEffectiveStyle(p)||{margin:0,raiseT:0,raiseF:0,bluff:0,size:1,adapt:0};
  /* tournament: blind pressure widens ranges; cash: depth-based IP play, no escalating-blind steal panic */
  const press=cash?clamp((20-stackBB)/10,0,1)*(base.adapt||0)*0.6:tourneyPressure(stackBB)*(base.adapt||0);
  const late=/(CO|BTN|SB|SB\/BTN)$/.test(p.pos||'');
  const stealBoost=(late&&state.stage==='preflop'&&callAmt<=state.bb)
    ?(cash?cashDeep*0.16:press*0.18):0;
  const st={
    margin: base.margin - press*0.06 - huAgg*0.45,
    raiseT: base.raiseT - press*0.13 - stealBoost - huAgg,
    raiseF: base.raiseF + press*0.28 + stealBoost + huAgg*1.2,
    bluff:  (base.id==='rock'||base.id==='station') ? huAgg*0.18 : base.bluff + press*0.05 + huAgg*0.55,
    size:   base.size + hu.leadBoost*0.18
  };
  if(cash){
    st.margin-=cashDeep*0.05;
    if(cashDeep>=0.35&&late){ st.raiseF+=0.12*cashDeep; st.raiseT-=0.04*cashDeep; }
    if(stackBB>=80) st.size=Math.min(1.25, st.size+0.08);
  }
  const pfAdj=aiPostflopAdj(p, callAmt, pot);
  const facingRaise=state.currentBet>state.bb*2;
  const foldRaise=(base.foldRaise||0)+(base.id==='rock'&&facingRaise?0.08:0);
  const firstInPreflop=state.stage==='preflop'&&state.currentBet<=state.bb;
  const openRange=firstInPreflop&&handInOpenRange(p, press);
  const hardOpen=aiHardUnopenedPreflop(p,openRange,press,pot,eq,callAmt,d);
  if(hardOpen)return hardOpen;

  if(callAmt===0){
    if(pfAdj.giveUp) return {type:'call'};
    if(state.stage==='preflop' && state.currentBet<=state.bb && !openRange)
      return {type:'call'};
    if(openRange&&Math.random()<aiOpenRaiseProb(p,d))
      return {type:'raise',amount:betTarget(p,pot,Math.max(eq,0.62),d)};
    if(base.id==='maniac'&&state.stage!=='preflop'&&d!=='hard'&&Math.random()<0.12) return {type:'call'};
    const kickerValue=aiRiverBoardKickerValueSpot(p,d);
    if(kickerValue&&Math.random()<kickerValue.freq)
      return {type:'raise',amount:aiThinRiverValueTarget(p,pot,d,kickerValue)};
    const hardBet=aiHardPostflopNoBet(p,eq,pot,d,st,pfAdj);
    if(hardBet)return hardBet;
    const pressure=aiPressureRaise(p,eq,pot,d,st,pfAdj,0);
    if(pressure) return {type:'raise',amount:pressure.amount};
    let betProb=0,bluffProb=0;
    if(d==='easy'){  betProb=eq>0.62?0.35:0; bluffProb=0.03; }
    if(d==='medium'){betProb=eq>0.55?0.65:0; bluffProb=0.06; }
    if(d==='hard'){  betProb=eq>0.52?0.85:0; bluffProb=(state.stage!=='preflop'&&live<=3)?0.15:0.05; }
    if(hu.active){
      if(state.stage==='preflop') betProb=Math.max(betProb,0.72+hu.leadBoost*0.20);
      else{
        const huThresh=0.42-hu.leadBoost*0.08;
        if(eq>huThresh) betProb=Math.max(betProb,0.62+hu.leadBoost*0.22);
        bluffProb=Math.max(bluffProb,0.16+hu.leadBoost*0.20);
      }
    }
    if(betProb>0){
      let rf=st.raiseF;
      if(base.id==='maniac') rf*=0.70+Math.random()*0.30;
      betProb=clamp(betProb+rf+pfAdj.betBoost,0.05,0.95);
    }
    bluffProb=Math.max(0,bluffProb+st.bluff);
    if(base.id==='rock'||base.id==='station') bluffProb=d==='hard'?bluffProb*0.25:0;
    else if(state.stage!=='preflop') bluffProb*=pfAdj.bluffMult;
    if(state.stage==='preflop'&&!aiCanValueRaise(p) && eq>=0.52) betProb=0;
    const fallbackFE=state.stage==='preflop'?0:aiEstimateFoldEquity(p,Math.max(state.bb,pot*0.45),pot,d);
    if(Math.random()<betProb || (eq<0.40&&fallbackFE>0.22&&Math.random()<bluffProb))
      return {type:'raise',amount:betTarget(p,pot,eq,d)};
    return {type:'call'};
  }

  const margin = (d==='easy'?-0.12 : d==='medium'?0.0 : 0.02-posBonus) + st.margin + foldRaise + pfAdj.margin;
  const raiseThresh = (d==='easy'?0.82 : d==='medium'?0.68 : 0.64-posBonus) + st.raiseT;
  let raiseFreq   = clamp((d==='easy'?0.35 : d==='medium'?0.55 : 0.75) + st.raiseF, 0.05, 0.95);
  if(base.id==='maniac') raiseFreq*=d==='hard'?(0.78+Math.random()*0.22):(0.55+Math.random()*0.45);
  const hardVsRaise=aiHardPreflopVsRaise(p,callAmt,pot,eq,odds,margin,d);
  if(hardVsRaise)return hardVsRaise;
  if(openRange&&Math.random()<aiOpenRaiseProb(p,d))
    return {type:'raise',amount:betTarget(p,pot,Math.max(eq,0.62),d)};
  if(eq>raiseThresh && aiCanValueRaise(p) && Math.random()<raiseFreq)
    return {type:'raise',amount:betTarget(p,pot,eq,d)};
  const hardPostBet=aiHardPostflopVsBet(p,eq,odds,callAmt,pot,d,st,pfAdj);
  if(hardPostBet)return hardPostBet;
  const pressure=aiPressureRaise(p,eq,pot,d,st,pfAdj,callAmt);
  if(pressure) return {type:'raise',amount:pressure.amount};
  if(eq>=odds+margin) return {type:'call'};
  const bluffRaise=(base.id==='rock'||base.id==='station')?(d==='hard'?0.018:0)
    :((d==='hard'?0.07:0.02)+st.bluff)*pfAdj.bluffMult;
  const raiseFE=state.stage==='preflop'?0:aiEstimateFoldEquity(p,Math.max(state.bb,pot*0.55),pot,d);
  if(bluffRaise>0 && raiseFE>0.30 && Math.random()<bluffRaise && callAmt<pot*0.4 && state.stage!=='preflop')
    return {type:'raise',amount:betTarget(p,pot,0.7,d)};
  return {type:'fold'};
}
function betTarget(p,pot,eq,d){
  const hu=aiHeadsUpPressure(p);
  const st=aiEffectiveStyle(p);
  const size=((st&&st.size)||1)+(hu.active?0.08+hu.leadBoost*0.22:0);
  let t;
  if(state.stage==='preflop'){
    t = (state.currentBet>state.bb ? state.currentBet*2.6 : state.bb*(2.5+Math.random()))*size;
    if(isCashGame()&&aiIsLate(p)&&(p.chips+p.bet)/state.bb>=60) t*=1.08;
  }else{
    const f = (d==='easy' ? (0.3+Math.random()*0.7) : (0.5+Math.random()*0.35))*size;
    t = state.currentBet + Math.max(state.lastRaiseSize, Math.round(pot*f));
  }
  const stackBB=(p.chips+p.bet)/Math.max(state.bb,1);
  if(eq>0.9 && Math.random()<0.35 && (state.stage!=='preflop'||stackBB<=18)) t=p.bet+p.chips;
  t=Math.round(t/state.sb)*state.sb;
  return clamp(t, state.currentBet+state.lastRaiseSize, p.bet+p.chips);
}
