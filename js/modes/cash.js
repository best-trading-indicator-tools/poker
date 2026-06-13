/* ================= CASH GAME MODE ================= */
registerMode('cash',{
  id:'cash',
  isCash:true,
  coachFlags:{icm:false,mRatio:false,anteWiden:false,blindLevelWarn:false,cashNote:true},

  initState(cfg,state){
    const startBlind=cfg.startBlind||BASE_BB;
    const buyIn=cfg.startBB*startBlind;
    state.levels=[startBlind];
    state.level=0;
    state.bb=startBlind;
    state.sb=startBlind/2;
    state.ante=0;
    state.cashBuyIn=buyIn;
    state.cashStartChips=buyIn;
    state.cashRebuys=0;
  },

  applyBlinds(state){
    state.level=0;
    state.bb=state.levels[0];
    state.sb=state.bb/2;
    state.ante=0;
  },

  afterHand(state){
    for(const p of state.players.filter(q=>q.chips===0)){
      p.chips=state.cashBuyIn;
      p.out=false;
      state.cashRebuys++;
      if(p.isHuman) log(T('cashRebuy')(usd(state.cashBuyIn)));
    }
    return {gameOver:false};
  },

  shouldClearResume(state){
    return !!state.gameOver;
  },

  resumeFields(state){
    return {
      levels:state.levels,
      cashBuyIn:state.cashBuyIn,
      cashStartChips:state.cashStartChips,
      cashRebuys:state.cashRebuys||0
    };
  },

  restoreFields(sv,state){
    if(sv.levels) state.levels=sv.levels;
    if(sv.cashBuyIn!=null) state.cashBuyIn=sv.cashBuyIn;
    if(sv.cashStartChips!=null) state.cashStartChips=sv.cashStartChips;
    if(sv.cashRebuys!=null) state.cashRebuys=sv.cashRebuys;
  },

  sessionPnL(state){
    const p=state.players[0];
    return p?p.chips-(state.cashStartChips||0):0;
  }
});
