/* ================= SIT & GO TOURNAMENT MODE ================= */
const LEVELS=[100,150,200,300,400,600,800,1200,1600,2400,3200,4800,6400,9600,12800,19200,25600];
const SPEED_HANDS={turbo:5,standard:10,slow:16};
function koBonusAmount(state){
  const startBlind=state.cfg.startBlind||BASE_BB;
  const startStack=(state.cfg.startBB||100)*startBlind;
  const unit=Math.max(1,state.sb||1);
  return Math.max(startBlind,Math.round((startStack*0.10)/unit)*unit);
}
function humanEliminationVictims(state){
  const awards=state.lastPotAwards||[];
  return state.players.filter(p=>
    p.i!==0&&!p.out&&p.chips===0&&awards.some(a=>
      (a.winnerIds||[]).includes(0)&&(a.contributorIds||[]).includes(p.i)
    )
  );
}
function humanKoVictims(state){
  if(!state.cfg.koBonus) return [];
  return humanEliminationVictims(state);
}

registerMode('sng',{
  id:'sng',
  isCash:false,
  coachFlags:{icm:true,mRatio:true,anteWiden:true,blindLevelWarn:true},

  initState(cfg,state){
    const startBlind=cfg.startBlind||BASE_BB;
    const levels=LEVELS.map(v=>Math.round(v*startBlind/BASE_BB/2)*2);
    state.levels=levels;
    state.level=0;
    state.bb=levels[0];
    state.sb=levels[0]/2;
    state.ante=0;
  },

  applyBlinds(state){
    const per=SPEED_HANDS[state.cfg.speed];
    state.level=Math.min(Math.floor((state.handNum-1)/per),state.levels.length-1);
    state.bb=state.levels[state.level];
    state.sb=state.bb/2;
    state.ante=state.cfg.ante?Math.max(1,Math.round(state.bb*state.cfg.ante)):0;
  },

  beforeStats(state){
    const human=state.players[0];
    if(!human||state.cfg.allAI) return;
    const allVictims=humanEliminationVictims(state);
    state.lastHumanKos=allVictims.map(p=>({i:p.i,name:p.name}));
    state.lastKoBonusAward=0;
    const victims=state.cfg.koBonus?allVictims:[];
    if(!victims.length) return;
    const bonus=koBonusAmount(state)*victims.length;
    human.chips+=bonus;
    state.koBonusWon=(state.koBonusWon||0)+bonus;
    state.lastKoBonusAward=bonus;
    const msg=T('koBonusAward')(victims.length,usd(bonus));
    log(msg);
    state.resultText=state.resultText?`${state.resultText} · ${msg}`:msg;
  },

  afterHand(state){
    const stillIn=alive().length;
    const bustedNow=state.players.filter(p=>!p.out&&p.chips===0);
    for(const p of bustedNow){
      p.out=true;
      p.place=stillIn;
      log(`${p.name} is eliminated (#${p.place})`);
    }
    const human=state.players[0];
    const rest=alive();
    if(human.out) return {gameOver:true,won:false,place:human.place};
    if(rest.length===1) return {gameOver:true,won:true,place:1};
    return {gameOver:false};
  },

  shouldClearResume(state){
    return state.gameOver||state.players[0].out||alive().length<=1;
  },

  resumeFields(state){return {levels:state.levels,level:state.level};},

  restoreFields(sv,state){
    if(sv.levels) state.levels=sv.levels;
    if(sv.level!=null) state.level=sv.level;
    if(sv.cashBuyIn!=null) delete state.cashBuyIn;
    if(sv.cashStartChips!=null) delete state.cashStartChips;
    if(sv.cashRebuys!=null) delete state.cashRebuys;
  }
});
