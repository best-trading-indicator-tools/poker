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
  const mult=(p.style&&p.style.openMult)||1;
  let thr=(OPEN_THR[bucket]||0.20)*mult;
  const adapt=p.style?.adapt||0;
  const stackBB=(p.chips+p.bet)/state.bb;
  const hu=aiHeadsUpPressure(p);
  if(isCashGame()){
    const deep=aiCashDepth(stackBB);
    if(/^(CO|BTN|SB|SB\/BTN)$/.test(p.pos||''))
      thr=Math.min(0.72, thr+0.05+deep*0.12);
    else if(/^MP/.test(p.pos||'')||p.pos==='HJ')
      thr=Math.min(0.58, thr+0.02+deep*0.06);
    if(stackBB<25) thr=Math.min(0.72, thr+press*adapt*0.08);
  }else if(p.style?.id==='shark' && /^(CO|BTN|SB|SB\/BTN)$/.test(p.pos))
    thr=Math.min(0.62, thr+0.06+press*adapt*0.14);
  else
    thr=Math.min(0.72, thr+press*adapt*0.10);
  if(hu.active) thr=Math.min(0.92, thr+(p.pos==='SB/BTN'?0.22:0.10)+hu.leadBoost*0.18);
  if(p.style?.id==='rock' && /^UTG/.test(p.pos||'')) thr*=0.85;
  return Math.min(hu.active?0.92:0.72, thr);
}
function handInOpenRange(p, press){
  return (handPct[holeCode(p.hole)]||1)<=aiOpenThr(p, press);
}
function aiOpenRaiseProb(p, d){
  const sid=p.style?.id;
  const base=d==='easy'?0.48:d==='medium'?0.72:0.86;
  if(sid==='rock') return base*0.55;
  if(sid==='station') return d==='easy'?0.38:d==='medium'?0.50:0.58;
  if(sid==='maniac') return d==='easy'?0.82:d==='medium'?0.90:0.96;
  if(sid==='shark') return Math.min(0.94,base+0.08);
  return base;
}
function aiShortPushThr(p, stackBB){
  const bucket=posBucket(p.pos||'BTN');
  const press=isCashGame()?clamp((16-stackBB)/6,0,1)*0.5:tourneyPressure(stackBB);
  const sid=p.style?.id;
  const hu=aiHeadsUpPressure(p);
  let thr=(PUSH_THR[bucket]||0.25)*((p.style&&{rock:0.50,station:1.35,shark:1.00,maniac:1.45}[p.style.id])||1);
  if(sid==='rock') thr*=0.50;
  else if(sid==='station') thr=Math.min(0.72, thr*1.4);
  else if(sid==='maniac' && /^(CO|BTN|SB|SB\/BTN)$/.test(p.pos)) thr=Math.min(0.88, thr*2.0);
  else if(sid==='shark' && /^(CO|BTN)$/.test(p.pos)) thr=Math.min(0.50, thr*1.12);
  if(hu.active) thr=Math.min(0.94, thr*(p.pos==='SB/BTN'?1.45:1.2)+hu.leadBoost*0.16);
  return Math.min(hu.active?0.94:0.90, thr+press*(p.style?.adapt||0)*0.12);
}
function aiCanValueRaise(p){
  if(!p.style) return true;
  const hu=aiHeadsUpPressure(p);
  const cap=(p.style.raiseCap||0.22)+(hu.active?0.16+hu.leadBoost*0.14:0);
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
  if(state.stage==='preflop'||!p.style) return {margin:0, bluffMult:1, betBoost:0, giveUp:false};
  const sid=p.style.id;
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

  const noise = d==='hard'?0.045 : d==='medium'?0.10 : 0.22;
  eq=clamp(eq+(Math.random()*2-1)*noise,0,1);
  const odds = callAmt>0 ? callAmt/(pot+callAmt) : 0;

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

  const base=p.style||{margin:0,raiseT:0,raiseF:0,bluff:0,size:1,adapt:0};
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

  if(callAmt===0){
    if(pfAdj.giveUp) return {type:'call'};
    if(state.stage==='preflop' && state.currentBet<=state.bb && !openRange)
      return {type:'call'};
    if(openRange&&Math.random()<aiOpenRaiseProb(p,d))
      return {type:'raise',amount:betTarget(p,pot,Math.max(eq,0.62),d)};
    if(p.style?.id==='maniac'&&state.stage!=='preflop'&&Math.random()<0.12) return {type:'call'};
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
      if(p.style?.id==='maniac') rf*=0.55+Math.random()*0.45;
      betProb=clamp(betProb+rf+pfAdj.betBoost,0.05,0.95);
    }
    bluffProb=Math.max(0,bluffProb+st.bluff);
    if(p.style?.id==='rock'||p.style?.id==='station') bluffProb=0;
    else if(state.stage!=='preflop') bluffProb*=pfAdj.bluffMult;
    if(!aiCanValueRaise(p) && eq>=0.52) betProb=0;
    if(Math.random()<betProb || (eq<0.40&&Math.random()<bluffProb))
      return {type:'raise',amount:betTarget(p,pot,eq,d)};
    return {type:'call'};
  }

  const margin = (d==='easy'?-0.12 : d==='medium'?0.0 : 0.02-posBonus) + st.margin + foldRaise + pfAdj.margin;
  const raiseThresh = (d==='easy'?0.82 : d==='medium'?0.68 : 0.64-posBonus) + st.raiseT;
  let raiseFreq   = clamp((d==='easy'?0.35 : d==='medium'?0.55 : 0.75) + st.raiseF, 0.05, 0.95);
  if(p.style?.id==='maniac') raiseFreq*=0.55+Math.random()*0.45;
  if(openRange&&Math.random()<aiOpenRaiseProb(p,d))
    return {type:'raise',amount:betTarget(p,pot,Math.max(eq,0.62),d)};
  if(eq>raiseThresh && aiCanValueRaise(p) && Math.random()<raiseFreq)
    return {type:'raise',amount:betTarget(p,pot,eq,d)};
  if(eq>=odds+margin) return {type:'call'};
  const bluffRaise=(p.style?.id==='rock'||p.style?.id==='station')?0
    :((d==='hard'?0.05:0.02)+st.bluff)*pfAdj.bluffMult;
  if(bluffRaise>0 && Math.random()<bluffRaise && callAmt<pot*0.4 && state.stage!=='preflop')
    return {type:'raise',amount:betTarget(p,pot,0.7,d)};
  return {type:'fold'};
}
function betTarget(p,pot,eq,d){
  const hu=aiHeadsUpPressure(p);
  const size=((p.style&&p.style.size)||1)+(hu.active?0.08+hu.leadBoost*0.22:0);
  let t;
  if(state.stage==='preflop'){
    t = (state.currentBet>state.bb ? state.currentBet*2.6 : state.bb*(2.5+Math.random()))*size;
    if(isCashGame()&&aiIsLate(p)&&(p.chips+p.bet)/state.bb>=60) t*=1.08;
  }else{
    const f = (d==='easy' ? (0.3+Math.random()*0.7) : (0.5+Math.random()*0.35))*size;
    t = state.currentBet + Math.max(state.lastRaiseSize, Math.round(pot*f));
  }
  if(eq>0.9 && Math.random()<0.35) t=p.bet+p.chips;
  t=Math.round(t/state.sb)*state.sb;
  return clamp(t, state.currentBet+state.lastRaiseSize, p.bet+p.chips);
}
