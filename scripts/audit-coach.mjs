#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const files=['eval.js','modes/registry.js','modes/tournament.js','modes/cash.js',
  'engine.js','rewards.js','solver.js','coach.js','ai.js','mp.js','ui.js'];
const storage=new Map();
const context=vm.createContext({
  console,setTimeout,clearTimeout,queueMicrotask,Date,Math,JSON,Promise,
  localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)},
  globalThis:null
});
context.globalThis=context;
vm.runInContext(fs.readFileSync(path.join(ROOT,'charts.js'),'utf8'),context,{filename:'charts.js'});
for(const file of files)vm.runInContext(fs.readFileSync(path.join(ROOT,'js',file),'utf8'),context,{filename:file});

const audit=vm.runInContext(`(()=>{
  BENCH=true;
  const C=(r,s)=>({r,s}),H=(a,b)=>[a,b],pc=s=>parseCardCode(s);
  const results=[],failures=[];
  const record=(area,name,pass,detail={})=>{
    const row={area,name,pass,...detail};results.push(row);if(!pass)failures.push(row);return row;
  };
  function spot({stage='preflop',hole=['As','Ah'],board=[],players=2,stackBB=40,
    potBB=3,betBB=0,pos='BTN',difficulty='hard',gameType='sng',style='shark',
    heroBetBB=0,ante=0,out=0,callers=0,seed='audit'}={}){
    setGameSeed(seed);
    newGame({gameType,numPlayers:players,startBB:100,startBlind:100,ante,speed:'standard',
      difficulty,allAI:true,seed});
    BENCH=true;
    const hero=state.players[0],villains=state.players.slice(1);
    for(const p of state.players){
      p.out=false;p.folded=false;p.allIn=false;p.acted=false;p.checkedStreet=false;
      p.bet=0;p.totalBet=0;p.chips=stackBB*100;p.rangeCap=1;p.rangeFloor=0;
      p.aggStreets=[];p.checkStreets=[];p.lineRead='';
    }
    for(let i=0;i<out&&i<villains.length;i++)villains[villains.length-1-i].out=true;
    hero.pos=pos;hero.hole=hole.map(pc);hero.bet=heroBetBB*100;hero.totalBet=hero.bet;
    hero.chips=Math.max(0,stackBB*100-hero.bet);
    state.stage=stage;state.board=board.map(pc);state.bb=100;state.sb=50;state.ante=ante;
    state.handOver=false;state.gameOver=false;state.currentBet=betBB*100;
    state.lastRaiseSize=Math.max(100,betBB*100);state.preflopRaiseCount=betBB>1?1:0;
    state.streetRaiseCount=betBB>0?1:0;state.lastAggIdx=betBB>0?villains[0].i:-1;
    state.pfAggIdx=stage==='preflop'?-1:villains[0]?.i??-1;
    state.dealerIdx=hero.i;
    const live=villains.filter(v=>!v.out);
    live.forEach((v,i)=>{
      v.pos=i===0?'BB':'CO';v.style=STYLES.find(x=>x.id===style)||STYLES[2];
      if(betBB>0&&i===0){
        v.bet=betBB*100;v.totalBet=v.bet;v.lineRead=stage==='flop'?'cbet':stage==='turn'?'barrel2':stage==='river'?'barrel3':'';
      }
    });
    for(let i=1;i<=callers&&i<live.length;i++){
      live[i].bet=betBB*100;live[i].totalBet=live[i].bet;live[i].acted=true;
    }
    const targetPot=potBB*100,current=state.players.reduce((s,p)=>s+p.totalBet,0);
    if(live[0])live[0].totalBet+=Math.max(0,targetPot-current);
    state.turnIdx=hero.i;
    return {hero,R:coachDecide(hero)};
  }
  const legal=r=>['FOLD','CHECK','CALL','RAISE','ALLIN'].includes(r.rec)&&
    Number.isFinite(r.eq)&&r.eq>=0&&r.eq<=1&&Number.isFinite(r.evs.FOLD)&&
    Number.isFinite(r.evs.CALL)&&Number.isFinite(r.evs.RAISE)&&
    (!(r.rec==='RAISE'||r.rec==='ALLIN')||Number.isFinite(r.coachT)&&r.coachT>0);

  /* Preflop anchors and table-size compression. */
  for(const players of [2,3,4,5,6,9])for(const stackBB of [5,10,14,25,50]){
    for(const [label,hole] of [['AA',['As','Ah']],['QJo',['Qh','Js']],['72o',['7h','2s']]]){
      const {R}=spot({players,stackBB,hole,pos:players<=2?'SB/BTN':'UTG',potBB:1.5,betBB:1,
        seed:'pf-'+players+'-'+stackBB+'-'+label});
      record('Preflop matrix',players+' players · '+stackBB+' BB · '+label,legal(R),{rec:R.rec});
      if(label==='AA')record('Preflop anchors','AA never open-folds · '+players+'p '+stackBB+'BB',
        R.rec==='RAISE'||R.rec==='ALLIN',{rec:R.rec});
      if(label==='72o'&&players>=5&&stackBB>=25)record('Preflop anchors','72o folds early/deep · '+players+'p '+stackBB+'BB',
        R.rec==='FOLD',{rec:R.rec});
    }
  }
  const q5=spot({players:5,stackBB:14,hole:['Qh','Js'],pos:'UTG',potBB:1.5,betBB:1,seed:'q5'}).R;
  record('Short-handed','QJo opens UTG five-handed at 14 BB',q5.rec==='RAISE',{rec:q5.rec});

  /* Once every remaining opponent is all-in, fold equity is zero: even a hand
     present in a normal 3-bet chart must be judged only as a call or fold. */
  const locked=spot({players:3,stackBB:17.1,hole:['Ts','Js'],pos:'BB',potBB:15,
    betBB:8.6,heroBetBB:1,seed:'two-allins'});
  const lockedVillains=state.players.slice(1);
  lockedVillains[0].allIn=true;lockedVillains[0].acted=true;lockedVillains[0].chips=0;
  lockedVillains[0].rangeCap=.12;
  lockedVillains[1].allIn=true;lockedVillains[1].acted=true;lockedVillains[1].chips=0;
  lockedVillains[1].bet=540;lockedVillains[1].totalBet=540;lockedVillains[1].rangeCap=.16;
  const lockedR=coachDecide(locked.hero);
  record('Preflop anchors','two all-in opponents cannot trigger a range raise',
    !['RAISE','ALLIN'].includes(lockedR.rec)&&
      lockedR.rec===(lockedR.eqAdj>=lockedR.needEq?'CALL':'FOLD')&&
      lockedR.preflopCallInfo?.lockedShowdown===true&&lockedR.strategyMode==='allin',
    {rec:lockedR.rec,eq:lockedR.eq,usable:lockedR.eqAdj,need:lockedR.needEq,
      locked:lockedR.preflopCallInfo?.lockedShowdown,strategy:lockedR.strategyMode});

  /* Obvious postflop anchors: free actions, nuts, air, draws and river finality. */
  const anchors=[
    ['Flop nuts facing bet',{stage:'flop',hole:['9s','9h'],board:['9d','7c','2s'],potBB:8,betBB:3},r=>r.rec!=='FOLD'],
    ['Flop air facing pot',{stage:'flop',hole:['8s','3h'],board:['Ac','Kd','7c'],potBB:8,betBB:4},r=>r.rec==='FOLD'],
    ['Nut-flush draw cheap price',{stage:'flop',hole:['Ah','5h'],board:['Kh','7h','2c'],potBB:12,betBB:2},r=>r.rec!=='FOLD'],
    ['Gutshot versus overbet',{stage:'flop',hole:['8s','7h'],board:['6c','4d','Ks'],potBB:12,betBB:7},r=>r.rec==='FOLD'],
    ['River nuts facing bet',{stage:'river',hole:['As','Ks'],board:['Qs','Js','Ts','2d','3c'],potBB:12,betBB:4},r=>r.rec==='RAISE'||r.rec==='ALLIN'],
    ['River air facing bet',{stage:'river',hole:['8s','3h'],board:['Ac','Kd','7c','2d','2s'],potBB:12,betBB:4},r=>r.rec==='FOLD'],
    ['Free flop never folds',{stage:'flop',hole:['8s','3h'],board:['Ac','Kd','7c'],potBB:6,betBB:0},r=>r.rec==='CHECK'||r.rec==='RAISE'],
    ['Free river never folds',{stage:'river',hole:['8s','3h'],board:['Ac','Kd','7c','2d','2s'],potBB:8,betBB:0},r=>r.rec==='CHECK'||r.rec==='RAISE']
  ];
  for(const [name,cfg,oracle] of anchors){
    const R=spot({...cfg,players:2,stackBB:50,pos:'BTN',seed:'anchor-'+name}).R;
    record('Postflop anchors',name,legal(R)&&oracle(R),{rec:R.rec,eq:Math.round(R.eq*100),usable:Math.round(R.eqAdj*100)});
    if(R.rec==='RAISE'||R.rec==='ALLIN')record('Teaching metrics',name+' bluff threshold',
      Number.isFinite(R.bluffBreakEven)&&R.bluffBreakEven>0&&R.bluffBreakEven<1&&
      Number.isFinite(R.modeledFoldEquity)&&R.modeledFoldEquity>=0&&R.modeledFoldEquity<=1,
      {breakEven:R.bluffBreakEven,foldEquity:R.modeledFoldEquity});
    if(R.rangeCharts?.length)record('Teaching metrics',name+' read confidence',
      Number.isFinite(R.rangeCharts[0].sample)&&['early','tentative','reliable'].includes(R.rangeCharts[0].sampleConfidence),
      {sample:R.rangeCharts[0].sample,confidence:R.rangeCharts[0].sampleConfidence});
    record('Teaching metrics',name+' strategy label',
      R.strategyMode==='baseline'||R.strategyMode==='exploit',{strategy:R.strategyMode});
  }

  /* New plain-English teaching concepts must be attached to real decisions. */
  const squeeze=spot({players:3,hole:['As','5s'],pos:'BTN',potBB:7.5,betBB:2.5,callers:1,
    style:'maniac',seed:'teach-squeeze'}).R;
  record('Teaching concepts','squeeze opportunity is identified',
    squeeze.rec==='RAISE'&&squeeze.concepts.includes('squeeze'),{rec:squeeze.rec,concepts:squeeze.concepts});
  const dominated=spot({stage:'flop',hole:['Kh','9s'],board:['Kd','7c','2s'],potBB:8,betBB:0,
    seed:'teach-dominated'}).R;
  record('Teaching concepts','dominated top pair warning',
    dominated.concepts.includes('dominatedTopPair'),{rec:dominated.rec,concepts:dominated.concepts});
  const counterfeit=spot({stage:'flop',hole:['8h','7s'],board:['Kd','8c','7d'],potBB:8,betBB:0,
    seed:'teach-counterfeit'}).R;
  record('Teaching concepts','made two-pair counterfeit warning',
    counterfeit.concepts.includes('madeCounterfeit'),{rec:counterfeit.rec,concepts:counterfeit.concepts});
  const texture=spot({stage:'flop',hole:['Kh','Qh'],board:['Kd','8c','2s'],potBB:8,betBB:0,
    seed:'teach-texture'}).R;
  record('Teaching concepts','texture-aware open sizing',
    texture.rec==='RAISE'&&texture.concepts.includes('textureSizing'),{rec:texture.rec,target:texture.coachT,concepts:texture.concepts});
  const floating=spot({stage:'flop',hole:['Ah','5h'],board:['Kh','7h','2c'],potBB:12,betBB:2,
    pos:'BTN',seed:'teach-float'}).R;
  record('Teaching concepts','float carries a turn plan',
    floating.rec==='CALL'&&floating.concepts.includes('floatPlan'),{rec:floating.rec,concepts:floating.concepts});
  const turn=spot({stage:'turn',hole:['Qh','Js'],board:['Qc','8s','3h','2d'],potBB:10,betBB:0,
    seed:'teach-turn'}).R;
  record('Teaching concepts','turn is categorized',
    turn.concepts.includes('turnPlan'),{rec:turn.rec,concepts:turn.concepts});
  spot({stage:'river',hole:['As','4d'],board:['Ks','8s','2c','7d','3s'],potBB:10,betBB:0,
    pos:'BTN',style:'rock',seed:'teach-blocker'});
  state.players[1].checkedStreet=true;state.players[1].checkStreets=['turn','river'];
  const blocker=coachDecide(state.players[0]);
  record('Teaching concepts','selective river blocker bluff',
    blocker.rec==='RAISE'&&blocker.concepts.includes('riverBlockerBluff'),{rec:blocker.rec,concepts:blocker.concepts});

  /* Guardrails: teach each concept only when its prerequisites are actually present. */
  const strongKicker=spot({stage:'flop',hole:['Kh','As'],board:['Kd','7c','2s'],potBB:8,betBB:0,
    seed:'guard-strong-kicker'}).R;
  record('Teaching guardrails','ace-kicker top pair is not marked dominated',
    !strongKicker.concepts.includes('dominatedTopPair'),{concepts:strongKicker.concepts});
  const topTwo=spot({stage:'flop',hole:['Kh','8s'],board:['Kd','8c','7d'],potBB:8,betBB:0,
    seed:'guard-top-two'}).R;
  record('Teaching guardrails','top two pair is not marked counterfeit-prone',
    !topTwo.concepts.includes('madeCounterfeit'),{concepts:topTwo.concepts});
  const tightSqueeze=spot({players:3,hole:['As','5s'],pos:'BTN',potBB:7.5,betBB:2.5,callers:1,
    style:'rock',seed:'guard-tight-squeeze'}).R;
  record('Teaching guardrails','blocker squeeze is suppressed versus a tight raiser',
    !tightSqueeze.concepts.includes('squeeze'),{rec:tightSqueeze.rec,concepts:tightSqueeze.concepts});
  const premiumSqueeze=spot({players:3,hole:['As','Ah'],pos:'BTN',potBB:7.5,betBB:2.5,callers:1,
    style:'rock',seed:'guard-premium-squeeze'}).R;
  record('Teaching guardrails','premium value squeeze remains available versus tight range',
    premiumSqueeze.rec==='RAISE'&&premiumSqueeze.concepts.includes('squeeze'),
    {rec:premiumSqueeze.rec,concepts:premiumSqueeze.concepts});
  const drySize=spot({stage:'flop',hole:['Kh','Qh'],board:['Kd','8c','2s'],potBB:10,betBB:0,
    seed:'guard-dry-size'}).R;
  const wetSize=spot({stage:'flop',hole:['Jh','Th'],board:['Jd','Tc','8s'],potBB:10,betBB:0,
    seed:'guard-wet-size'}).R;
  record('Teaching guardrails','strong hand sizes larger on wet board than dry board',
    drySize.rec==='RAISE'&&wetSize.rec==='RAISE'&&
      wetSize.postSizePlan?.ratio>drySize.postSizePlan?.ratio,
    {dry:drySize.coachT,wet:wetSize.coachT,dryRatio:drySize.postSizePlan?.ratio,wetRatio:wetSize.postSizePlan?.ratio});
  spot({stage:'flop',hole:['Ah','5h'],board:['Kh','7h','2c'],potBB:12,betBB:2,
    pos:'UTG',seed:'guard-float-oop'});
  state.dealerIdx=state.players[1].i;
  const oopFloat=coachDecide(state.players[0]);
  record('Teaching guardrails','out-of-position call is not called a float',
    !oopFloat.concepts.includes('floatPlan'),{rec:oopFloat.rec,concepts:oopFloat.concepts});
  spot({stage:'river',hole:['As','4d'],board:['Ks','8s','2c','7d','3s'],potBB:10,betBB:0,
    pos:'BTN',style:'station',seed:'guard-station-blocker'});
  state.players[1].checkedStreet=true;state.players[1].checkStreets=['turn','river'];
  const stationBlocker=coachDecide(state.players[0]);
  record('Teaching guardrails','nut blocker is not used to bluff a calling station',
    !stationBlocker.concepts.includes('riverBlockerBluff'),{rec:stationBlocker.rec,concepts:stationBlocker.concepts});
  const noPassiveBlocker=spot({stage:'river',hole:['As','4d'],board:['Ks','8s','2c','7d','3s'],
    potBB:10,betBB:0,pos:'BTN',style:'rock',seed:'guard-no-passive-blocker'}).R;
  record('Teaching guardrails','nut blocker alone is insufficient without a passive line',
    !noPassiveBlocker.concepts.includes('riverBlockerBluff'),{rec:noPassiveBlocker.rec,concepts:noPassiveBlocker.concepts});

  /* Dedicated bluff panel: intent, verdict, math and follow-up plan stay aligned. */
  record('Bluff assessment','river blocker raise is labelled bluff',
    blocker.actionIntent==='bluff'&&blocker.bluffInfo?.bluffing&&
      ['goodBluff','thinBluff'].includes(blocker.bluffInfo.verdict)&&
      Number.isFinite(blocker.bluffInfo.requiredFolds)&&Number.isFinite(blocker.bluffInfo.estimatedFolds),
    {rec:blocker.rec,intent:blocker.actionIntent,info:blocker.bluffInfo});
  record('Bluff assessment','calling station spot does not recommend a bluff',
    stationBlocker.actionIntent!=='bluff'&&stationBlocker.bluffInfo?.verdict!=='goodBluff',
    {rec:stationBlocker.rec,intent:stationBlocker.actionIntent,info:stationBlocker.bluffInfo});
  record('Bluff assessment','made-hand bet is labelled value rather than bluff',
    ['value','protection'].includes(texture.actionIntent)&&texture.bluffInfo?.verdict==='notBluff',
    {rec:texture.rec,intent:texture.actionIntent,info:texture.bluffInfo});
  const semi=spot({stage:'flop',hole:['Ah','5h'],board:['Kh','7h','2c'],potBB:10,betBB:0,
    pos:'BTN',seed:'bluff-semi'}).R;
  record('Bluff assessment','draw aggression is labelled semi-bluff',
    semi.rec==='RAISE'&&semi.actionIntent==='semiBluff'&&semi.bluffInfo?.plan==='continueGoodCards',
    {rec:semi.rec,intent:semi.actionIntent,info:semi.bluffInfo});
  const noBluffFold=spot({stage:'river',hole:['8s','3h'],board:['Ac','Kd','7c','2d','2s'],
    potBB:12,betBB:4,seed:'bluff-fold'}).R;
  record('Bluff assessment','fold recommendation explicitly rejects bluffing',
    noBluffFold.rec==='FOLD'&&noBluffFold.bluffInfo?.verdict==='doNotBluff'&&
      noBluffFold.bluffInfo?.plan==='preserveStack',
    {rec:noBluffFold.rec,intent:noBluffFold.actionIntent,info:noBluffFold.bluffInfo});

  const historyBluff=(difficulty,riverFolds,riverFaced,seed)=>{
    spot({stage:'river',hole:['As','4d'],board:['Ks','8s','2c','7d','3s'],potBB:10,betBB:0,
      pos:'BTN',style:'shark',difficulty,seed});
    const v=state.players[1];
    v.checkedStreet=true;v.checkStreets=['turn','river'];
    v.rangeTendencies={v:1,hands:Math.max(1,riverFaced),preActions:riverFaced,
      postActions:riverFaced*2,postRaises:0,postChecks:riverFaced,
      faced:riverFaced,folds:riverFolds,calls:Math.max(0,riverFaced-riverFolds),faceRaises:0,
      riverFaced,riverFolds,riverCalls:Math.max(0,riverFaced-riverFolds),sizeN:0,sizeSum:0};
    return coachDecide(state.players[0]);
  };
  const historyOverfold=historyBluff('hard',18,20,'history-overfold');
  const historySticky=historyBluff('hard',2,20,'history-sticky');
  const historyTiny=historyBluff('hard',1,1,'history-tiny');
  const historyMedium=historyBluff('medium',18,20,'history-medium');
  const historyEasy=historyBluff('easy',18,20,'history-easy');
  record('Opponent history','repeated folds increase bluff fold estimate',
    historyOverfold.bluffInfo.historyAdjustment>.05&&
      historyOverfold.bluffInfo.reasons.includes('historyFolds'),
    {info:historyOverfold.bluffInfo});
  record('Opponent history','repeated calls reduce bluff fold estimate',
    historySticky.bluffInfo.historyAdjustment<-.05&&
      historySticky.bluffInfo.reasons.includes('historyCalls'),
    {info:historySticky.bluffInfo});
  record('Opponent history','tiny sample cannot overpower profile prior',
    Math.abs(historyTiny.bluffInfo.historyAdjustment)<.02,{info:historyTiny.bluffInfo});
  record('Opponent history','difficulty scales learned exploit strength',
    historyOverfold.bluffInfo.historyAdjustment>historyMedium.bluffInfo.historyAdjustment&&
      historyMedium.bluffInfo.historyAdjustment>historyEasy.bluffInfo.historyAdjustment,
    {hard:historyOverfold.bluffInfo.historyAdjustment,medium:historyMedium.bluffInfo.historyAdjustment,
      easy:historyEasy.bluffInfo.historyAdjustment});

  /* Price monotonicity: making the same call more expensive must not turn a fold
     into a call unless some other material state changed. */
  const priceHands=[
    ['top pair',['Ah','Qd'],['Qc','8s','3h']],
    ['flush draw',['Ah','5h'],['Kh','7h','2c']],
    ['gutshot',['8s','7h'],['6c','4d','Ks']],
    ['underpair',['6s','6h'],['Kc','9d','3s']]
  ];
  const actionRank={FOLD:0,CHECK:1,CALL:1,RAISE:2,ALLIN:2};
  for(const [name,hole,board] of priceHands){
    const cheap=spot({stage:'flop',hole,board,potBB:12,betBB:2,seed:'cheap-'+name}).R;
    const large=spot({stage:'flop',hole,board,potBB:12,betBB:6,seed:'large-'+name}).R;
    record('Price monotonicity',name,!(cheap.rec==='FOLD'&&large.rec==='CALL'),
      {cheap:cheap.rec,large:large.rec,cheapNeed:cheap.needEq,largeNeed:large.needEq});
  }

  /* Multiway and confidence/difficulty sweeps primarily catch crashes, illegal
     output and impossible percentages over the branch cross-product. */
  const stages=[
    ['flop',['As','Kd','7c']],['turn',['As','Kd','7c','2h']],['river',['As','Kd','7c','2h','2s']]
  ],holes=[['Ah','Qd'],['9h','9s'],['8h','7h'],['4s','3d']];
  let sweep=0;
  for(const [stage,board] of stages)for(const players of [2,3,5])for(const difficulty of ['easy','medium','hard'])
    for(const hole of holes)for(const betBB of [0,2,6]){
      const R=spot({stage,board,hole,players,stackBB:30,potBB:12,betBB,difficulty,
        seed:'sweep-'+stage+'-'+players+'-'+difficulty+'-'+hole.join('')+'-'+betBB}).R;
      sweep++;record('Cross-product stability',stage+' '+players+'p '+difficulty+' '+hole.join('')+' bet '+betBB,
        legal(R),{rec:R.rec,eq:R.eq});
    }

  /* Large invariant fuzz: these are rules of the game or direct consequences of
     the coach's own displayed math. They must hold across positions, player
     counts, stack depths, difficulties, streets, hands and prices. */
  const invariantStages=[
    ['preflop',[]],['flop',['As','Kd','7c']],['turn',['As','Kd','7c','2h']],
    ['river',['As','Kd','7c','2h','2s']]
  ];
  const invariantHands=[
    ['Qh','Jh'],['9h','9s'],['8h','7h'],['4s','3d'],['Ac','Qc'],['6s','5s']
  ];
  const difficulties=['easy','medium','hard'],playerCounts=[2,3,5],stackDepths=[10,30,80];
  let invariantScenarios=0;
  const invariantDetail=R=>({rec:R.rec,eq:R.eq,usable:R.eqAdj,need:R.needEq,
    odds:R.odds,intent:R.actionIntent,bluffing:R.bluffInfo?.bluffing});

  /* A free action can be checked; folding can never improve on checking. */
  for(const [stage,board] of invariantStages)for(const players of playerCounts)
    for(const difficulty of difficulties)for(const hole of invariantHands){
      const pre=stage==='preflop';
      const R=spot({stage,board,hole,players,stackBB:30,potBB:pre?1.5:12,
        betBB:pre?1:0,heroBetBB:pre?1:0,difficulty,
        seed:'inv-free-'+stage+'-'+players+'-'+difficulty+'-'+hole.join('')}).R;
      invariantScenarios++;
      record('Invariant fuzz','free action never folds '+stage+' '+players+'p '+difficulty+' '+hole.join(''),
        R.rec!=='FOLD',invariantDetail(R));
    }

  /* Calls must clear the coach's final usable-equity threshold, and increasing
     only the price cannot turn a fold into a call. */
  for(const [stage,board] of invariantStages)for(const players of playerCounts)
    for(const difficulty of difficulties)for(const stackBB of stackDepths)
      for(const hole of invariantHands){
        const decisions=[];
        for(const betBB of [2,5,8]){
          const R=spot({stage,board,hole,players,stackBB,potBB:12,betBB,difficulty,
            seed:'inv-price-'+stage+'-'+players+'-'+difficulty+'-'+stackBB+'-'+hole.join('')}).R;
          invariantScenarios++;decisions.push(R);
          record('Invariant fuzz','call clears threshold '+stage+' '+players+'p '+difficulty+
            ' '+stackBB+'BB '+hole.join('')+' price '+betBB,
            R.rec!=='CALL'||R.eqAdj+1e-9>=R.needEq,invariantDetail(R));
        }
        for(let i=1;i<decisions.length;i++){
          const cheap=decisions[i-1],dear=decisions[i];
          record('Invariant fuzz','higher price cannot improve fold to call '+stage+' '+players+'p '+
            difficulty+' '+stackBB+'BB '+hole.join('')+' step '+i,
            !(cheap.rec==='FOLD'&&dear.rec==='CALL'),
            {cheap:invariantDetail(cheap),dear:invariantDetail(dear)});
        }
      }

  /* If every opponent is all-in, nobody can respond or fold: raising and
     bluffing are impossible, on every street and at every difficulty. */
  for(const [stage,board] of invariantStages)for(const players of playerCounts)
    for(const difficulty of difficulties)for(const hole of invariantHands){
      const setup=spot({stage,board,hole,players,stackBB:30,potBB:12,betBB:5,difficulty,
        seed:'inv-locked-'+stage+'-'+players+'-'+difficulty+'-'+hole.join('')});
      for(const v of state.players.slice(1)){
        v.allIn=true;v.acted=true;v.chips=0;
        if(v.bet===0){v.bet=300;v.totalBet=Math.max(v.totalBet,300);}
      }
      const R=coachDecide(setup.hero);
      invariantScenarios++;
      record('Invariant fuzz','all-in lock has no raise or bluff '+stage+' '+players+'p '+
        difficulty+' '+hole.join(''),
        !['RAISE','ALLIN'].includes(R.rec)&&R.bluffInfo===null&&
          R.bluffBreakEven===null&&R.modeledFoldEquity===0&&
          ['call','check','fold'].includes(R.actionIntent),invariantDetail(R));
    }

  /* ICM must never lower the required equity for the same tournament call. */
  const icm=spot({stage:'river',hole:['Qh','Qs'],board:['Ah','7d','4c','2s','2h'],players:5,
    stackBB:10,potBB:12,betBB:4,gameType:'sng',seed:'icm'}).R;
  record('ICM','premium is non-negative and threshold includes it',
    icm.icmPrem>=0&&icm.needEq+1e-9>=icm.odds,{premium:icm.icmPrem,odds:icm.odds,need:icm.needEq,rec:icm.rec});

  const byArea={};
  for(const r of results){const a=byArea[r.area]||(byArea[r.area]={checks:0,passed:0,failed:0});
    a.checks++;if(r.pass)a.passed++;else a.failed++;}
  return {summary:{checks:results.length,passed:results.length-failures.length,failed:failures.length,
      sweep,invariantScenarios},
    byArea,failures};
})()`,context);

console.log(JSON.stringify(audit,null,2));
if(process.argv.includes('--strict')&&audit.failures.length)process.exitCode=1;
