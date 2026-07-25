#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const files=['eval.js','modes/registry.js','modes/tournament.js','modes/cash.js','engine.js','rewards.js','coach.js','ai.js','mp.js','ui.js'];
const storage=new Map();
const context=vm.createContext({
  console,setTimeout,clearTimeout,queueMicrotask,Date,Math,JSON,Promise,
  localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)},
  globalThis:null
});
context.globalThis=context;
vm.runInContext(fs.readFileSync(path.join(ROOT,'charts.js'),'utf8'),context,{filename:'charts.js'});
for(const file of files)vm.runInContext(fs.readFileSync(path.join(ROOT,'js',file),'utf8'),context,{filename:file});

const result=vm.runInContext(`(()=>{
  const C=(r,s)=>({r,s}), H=(a,b)=>[a,b];
  const holes={AA:H(C(14,0),C(14,1)),A5s:H(C(14,0),C(5,0)),A5o:H(C(14,0),C(5,1)),
    eightSeven:H(C(8,2),C(7,2)),KJo:H(C(13,0),C(11,1)),sevenTwo:H(C(7,0),C(2,1))};
  const cfg={gameType:'sng',numPlayers:6,startBB:100,startBlind:100,ante:0,speed:'standard',difficulty:'hard',allAI:true};
  newGame(cfg);
  const p=state.players[1];p.pos='CO';p.style=STYLES.find(x=>x.id==='shark');
  state.stage='preflop';state.bb=100;state.sb=50;state.board=[];
  const base={stage:'preflop',callAmt:200,cbBefore:300,playerBetBefore:0,potBefore:450,bb:100,sb:50,
    stackTotalBefore:10000,effectiveStackBB:100,facedRaiseSize:200,lastAggPos:'BTN',callersAtLevel:0,limpersBefore:0};
  const policy={};
  for(const depth of [1,2,3]){
    policy[depth]={};
    const ctx={...base,preflopRaisesBefore:depth,raisesBefore:depth,cbBefore:depth===1?300:depth===2?1000:depth===3?2400:300,
      callAmt:depth===1?300:depth===2?1000:2400,facedRaiseSize:depth===1?200:depth===2?700:1400};
    for(const [name,hole] of Object.entries(holes)){
      const q=rangePreflopActionPolicy(p,ctx,hole);
      const sum=q.fold+q.call+q.raise;
      if(Math.abs(sum-1)>1e-9)throw new Error('policy not normalized');
      policy[depth][name]=q;
    }
  }
  if(!(policy[1].AA.raise>policy[1].sevenTwo.raise))throw new Error('3-bet value ordering '+JSON.stringify(policy[1]));
  if(!(policy[2].AA.raise>policy[2].A5s.raise&&policy[2].A5s.raise>policy[2].sevenTwo.raise))throw new Error('4-bet polar ordering '+JSON.stringify(policy[2]));
  if(!(policy[3].AA.raise>policy[3].A5s.raise&&policy[3].A5s.raise>policy[3].sevenTwo.raise))throw new Error('5-bet ordering '+JSON.stringify(policy[3]));

  const jamCtx={...base,preflopRaisesBefore:1,raisesBefore:1,raiseOrdinal:2,target:10000,targetBB:100};
  const jamAA=rangePreflopSizingLikelihood(p,jamCtx,holes.AA,rangeModelComboInfo(holes.AA,[]));
  const jamA5=rangePreflopSizingLikelihood(p,jamCtx,holes.A5s,rangeModelComboInfo(holes.A5s,[]));
  if(!(jamAA>jamA5))throw new Error('deep jam must favor premiums over blocker bluffs');

  const isoCtx={...base,preflopRaisesBefore:0,raisesBefore:0,cbBefore:100,callAmt:100,
    limpersBefore:1,callersAtLevel:0,effectiveStackBB:70,icmPressure:0};
  if(rangePreflopNode(p,isoCtx)!=='limpedPot')throw new Error('limped pot node not recognized');
  const isoTrail=rangeActionTrail({model:{history:[{street:'preflop',action:'raise',nodeType:'limpedPot',
    targetBB:5,raiseOrdinal:1}]}});
  if(!isoTrail.includes('Iso-raise 5 BB'))throw new Error('isolation raise mislabeled '+isoTrail);
  const normalContinue=rangePreflopActionPolicy(p,{...base,preflopRaisesBefore:1,raisesBefore:1,
    lastAggPos:'BTN',cbBefore:300,callAmt:300,effectiveStackBB:35,icmPressure:0},holes.A5s);
  const icmContinue=rangePreflopActionPolicy(p,{...base,preflopRaisesBefore:1,raisesBefore:1,
    lastAggPos:'BTN',cbBefore:300,callAmt:300,effectiveStackBB:35,icmPressure:1},holes.A5s);
  if(!(icmContinue.call+icmContinue.raise<normalContinue.call+normalContinue.raise))
    throw new Error('ICM must tighten marginal preflop continues');
  const vsUtg=rangePreflopActionPolicy(p,{...base,preflopRaisesBefore:1,raisesBefore:1,
    lastAggPos:'UTG',cbBefore:300,callAmt:300},holes.A5s);
  const vsBtn=rangePreflopActionPolicy(p,{...base,preflopRaisesBefore:1,raisesBefore:1,
    lastAggPos:'BTN',cbBefore:300,callAmt:300},holes.A5s);
  if(!(vsBtn.call+vsBtn.raise>vsUtg.call+vsUtg.raise))
    throw new Error('opener position must change the contextual continue range');
  const rock=state.players[3],maniac=state.players[4];
  rock.pos=maniac.pos='BTN';rock.style=STYLES.find(x=>x.id==='rock');maniac.style=STYLES.find(x=>x.id==='maniac');
  const unopened={...base,callAmt:100,cbBefore:100,preflopRaisesBefore:0,raisesBefore:0,lastAggPos:''};
  const rockTrash=rangePreflopActionPolicy(rock,unopened,holes.sevenTwo);
  const maniacTrash=rangePreflopActionPolicy(maniac,unopened,holes.sevenTwo);
  if(!(maniacTrash.raise>rockTrash.raise))
    throw new Error('profile prior must change marginal opening frequency');

  const learner=state.players[2];learner.style=STYLES.find(x=>x.id==='shark');
  learner.rangeTendencies={hands:20,vpipHands:8,pfrHands:7,preActions:20,postActions:60,postRaises:45,postChecks:8,
    faced:30,folds:8,calls:10,faceRaises:12,sizeN:30,sizeSum:27};
  const fixedProfile=rangeModelStyle(learner,false),learnedProfile=rangeModelStyle(learner,true);
  if(!(learnedProfile.raise>fixedProfile.raise&&learnedProfile.bluff>fixedProfile.bluff&&learnedProfile.size>fixedProfile.size))
    throw new Error('observed aggression did not move the profile '+JSON.stringify({fixedProfile,learnedProfile}));

  state.stage='turn';state.board=[C(13,3),C(6,3),C(4,2),C(2,0)];
  const postCtx={stage:'turn',callAmt:0,cbBefore:0,betRatio:0,rangeCheckedTo:true,rangePriorPostChecks:1};
  const top=H(C(13,0),C(9,1)),air=H(C(9,0),C(8,1));
  const topCheck=rangePostflopActionPolicy(p,{},postCtx,top,rangeModelComboInfo(top,state.board)).check;
  const airCheck=rangePostflopActionPolicy(p,{},postCtx,air,rangeModelComboInfo(air,state.board)).check;
  if(!(topCheck<airCheck))throw new Error('repeated checked-to street must discount top pair');

  const rankMass=(model,board,rank)=>{
    const dead=new Set(board.map(rangeCardId));let hit=0,total=0;
    for(let i=0;i<FULL_DECK.length;i++)for(let j=i+1;j<FULL_DECK.length;j++){
      if(dead.has(i)||dead.has(j))continue;
      const hole=[FULL_DECK[i],FULL_DECK[j]],w=rangeModelPosteriorWeight(model,hole)||0;
      total+=w;if(hole.some(c=>c.r===rank))hit+=w;
    }
    return hit/Math.max(total,1e-12);
  };
  p.style=STYLES.find(x=>x.id==='station');rangeModelInit(p);
  state.stage='preflop';state.board=[];state._rangeComboInfoCache=Object.create(null);
  rangePosteriorApply(p,p.rangeModel,'call',{stage:'preflop',callAmt:50,cbBefore:100,playerBetBefore:50,
    potBefore:150,betRatio:.5,price:.25,raisesBefore:0,preflopRaisesBefore:0,bb:100,sb:50,effectiveStackBB:36});
  state.stage='flop';state.board=[C(7,3),C(4,2),C(5,0)];state._rangeComboInfoCache=Object.create(null);
  rangePosteriorApply(p,p.rangeModel,'raise',{stage:'flop',callAmt:0,cbBefore:0,playerBetBefore:0,potBefore:300,
    target:150,targetBB:1.5,actionPotRatio:.5,betRatio:.5,raisesBefore:0,activePlayers:2,inPosition:false,checkedBefore:0,bb:100,sb:50,effectiveStackBB:36});
  state.stage='turn';state.board.push(C(13,1));state._rangeComboInfoCache=Object.create(null);
  const kingBeforeCheck=rankMass(p.rangeModel,state.board,13);
  rangePosteriorApply(p,p.rangeModel,'call',{stage:'turn',callAmt:0,cbBefore:0,playerBetBefore:0,potBefore:600,
    betRatio:0,raisesBefore:0,activePlayers:2,inPosition:false,checkedBefore:0,bb:100,sb:50,effectiveStackBB:34});
  const kingAfterCheck=rankMass(p.rangeModel,state.board,13);
  if(!(kingAfterCheck<kingBeforeCheck&&kingAfterCheck>0))throw new Error('OOP turn check must reduce, not erase, Kx');

  state.stage='preflop';state.board=[];state._rangeComboInfoCache=Object.create(null);
  rangeModelInit(p);
  const posteriorCtx={...base,preflopRaisesBefore:1,raisesBefore:1,raiseOrdinal:2,target:1000,targetBB:10};
  rangePosteriorApply(p,p.rangeModel,'raise',posteriorCtx);
  const sum=p.rangeModel.weights.reduce((a,b)=>a+b,0);
  if(Math.abs(sum-1)>1e-9)throw new Error('posterior not normalized');
  if(p.rangeModel.history.at(-1).raiseOrdinal!==2)throw new Error('raise ordinal not stored');

  state.stage='flop';state.board=[C(12,2),C(8,1),C(4,1)];
  const info={kind:'range',model:{...p.rangeModel},cap:1,floor:0,board:state.board.slice(),dead:[C(11,3),C(9,3)],list:HAND_ORDER.slice()};
  const metrics=rangeMatrixMetrics(info);
  const massSum=Object.values(metrics.mass).reduce((a,b)=>a+b,0);
  if(Math.abs(massSum-1)>1e-9)throw new Error('matrix class probabilities not normalized');
  if(!(metrics.effective>0&&metrics.effective<=metrics.legal))throw new Error('invalid effective combo count');
  if(!rangeMatrixMetaHtml(info).includes('Qx ≈'))throw new Error('top-card probability missing from matrix summary');
  if(!rangeMatrixMetaHtml(info).includes('Range entering Flop'))
    throw new Error('matrix must disclose that villain has not acted on the new street');

  state.stage='flop';state.board=[C(13,3),C(7,2),C(2,0)];
  state._rangeComboInfoCache=Object.create(null);state._rangeBoardTextureCache=Object.create(null);
  const featureVector=rangeComboInfoVector();
  const setInfo=featureVector[rangeComboIndex(H(C(13,1),C(13,2)))];
  const airInfo=featureVector[rangeComboIndex(H(C(8,1),C(3,2)))];
  if(!(setInfo.relativeStrength>airInfo.relativeStrength&&setInfo.nutness>airInfo.nutness))
    throw new Error('relative hand-strength percentile ordering failed');
  const overbetCtx={stage:'flop',target:1250,actionPotRatio:1.25,betRatio:1.25,potBefore:1000,
    playerBetBefore:0,stackTotalBefore:10000,effectiveStackBB:90,activePlayers:2,raisesBefore:0,
    lineType:'cbet',posterior:true};
  const valueOverbet=rangePostflopSizingLikelihood(p,overbetCtx,setInfo);
  const airOverbet=rangePostflopSizingLikelihood(p,overbetCtx,airInfo);
  if(!(valueOverbet>airOverbet))throw new Error('overbet sizing must favor polar value over weak air');

  const monotone=[C(13,3),C(7,3),C(2,3)],nutClub=H(C(14,3),C(12,2)),noClub=H(C(14,0),C(12,2));
  const nutBlockerInfo=rangeModelComboInfo(nutClub,monotone),noBlockerInfo=rangeModelComboInfo(noClub,monotone);
  if(!nutBlockerInfo.nutFlushBlocker||!(nutBlockerInfo.bluffQuality>noBlockerInfo.bluffQuality))
    throw new Error('nut-flush blocker feature missing');
  const pairedBoard=[C(3,0),C(5,3),C(3,3),C(11,3)],boardPairAir=H(C(14,1),C(12,1));
  if(handUsesHoleCards(boardPairAir,pairedBoard,evalBest(boardPairAir.concat(pairedBoard))))
    throw new Error('board-only pair must not count as a private made hand');

  /* One 169-cell label can hide very different suit-specific outcomes. With an
     equal-weight AQs-only range on a three-club turn, exactly A♣Q♣ is a flush. */
  const clubTurn=pairedBoard,suitedWeights=new Array(1326).fill(0);
  for(let suit=0;suit<4;suit++)suitedWeights[rangeComboIndex(H(C(14,suit),C(12,suit)))]=.25;
  const suitedInfo={kind:'range',model:{v:2,weights:suitedWeights,history:[]},cap:1,floor:0,
    board:clubTurn,dead:[C(9,1),C(2,2)],list:HAND_ORDER.slice()};
  const suitedMetrics=rangeMatrixMetrics(suitedInfo),suitedComposition=suitedMetrics.composition;
  if(Math.abs((suitedMetrics.mass.AQs||0)-1)>1e-9)
    throw new Error('AQs matrix cell should contain the whole test range');
  if(Math.abs((suitedComposition.flush||0)-.25)>1e-9||Math.abs((suitedComposition.air||0)-.75)>1e-9)
    throw new Error('exact-suit composition mismatch '+JSON.stringify(suitedComposition));
  const suitedMeta=rangeMatrixMetaHtml(suitedInfo);
  if(!suitedMeta.includes('Made flushes ≈ 25%')||!suitedMeta.includes('Air / bluff candidates ≈ 75%'))
    throw new Error('exact hand mix missing from matrix summary '+suitedMeta);

  const k96=[C(13,1),C(9,2),C(6,1)],threes=H(C(3,0),C(3,2));
  const underpair=coachUnderpairRealization(threes,k96,.80,true,detectDraws(threes,k96));
  if(!underpair||underpair.overcards!==3||underpair.penalty<.08)
    throw new Error('three-underpair realization penalty too small '+JSON.stringify(underpair));
  const k96Backdoor=[C(13,2),C(9,2),C(6,1)];
  const withBackdoor=coachUnderpairRealization(threes,k96Backdoor,.80,true,detectDraws(threes,k96Backdoor));
  const smallIp=coachUnderpairRealization(threes,k96,.33,false,detectDraws(threes,k96));
  if(!withBackdoor||!withBackdoor.backdoors||!(withBackdoor.penalty<underpair.penalty))
    throw new Error('backdoor must soften underpair penalty');
  if(!smallIp||!(smallIp.penalty<underpair.penalty))
    throw new Error('small IP bet must carry less realization penalty');
  if(coachUnderpairRealization(holes.AA,k96,.80,true,detectDraws(holes.AA,k96)))
    throw new Error('overpair must not receive underpair penalty');

  newGame(cfg);
  const hero=state.players[0],phil=state.players[1];
  for(const x of state.players){
    x.out=x!==hero&&x!==phil;x.folded=x.out;x.allIn=false;x.bet=0;x.totalBet=0;x.acted=true;
    x.checkedStreet=false;x.aggStreets=[];x.checkStreets=[];x.rangeCap=1;x.rangeFloor=0;x.lineRead='';
  }
  state.stage='flop';state.board=k96.slice();state._rangeComboInfoCache=Object.create(null);
  state.bb=20;state.sb=10;state.ante=0;state.dealerIdx=phil.i;state.currentBet=120;state.lastRaiseSize=70;
  state.lastAggIdx=phil.i;state.pfAggIdx=phil.i;state.streetRaiseCount=0;
  hero.pos='BB';hero.hole=threes;hero.chips=1930;hero.bet=0;hero.totalBet=80;hero.acted=false;
  phil.pos='BTN';phil.style=STYLES.find(x=>x.id==='shark');phil.chips=1830;phil.bet=120;phil.totalBet=190;
  phil.rangeCap=.29;phil.lineRead='cbet';rangeModelInit(phil);
  const savedEquity=mcEquityR;mcEquityR=()=>.36;
  const underpairDecision=coachDecide(hero);
  mcEquityR=savedEquity;
  if(underpairDecision.rec!=='FOLD'||underpairDecision.underpairPen<.08||underpairDecision.evs.CALL>=0)
    throw new Error('33/K96 vs 80% c-bet must fold '+JSON.stringify({rec:underpairDecision.rec,eqAdj:underpairDecision.eqAdj,pen:underpairDecision.underpairPen,callEv:underpairDecision.evs.CALL}));

  /* Four-flush turn: category-level "Ace-high flush" is misleading when the fifth
     card is a three. Exact opponent combos and their continue policies must block
     the automatic protection bet. */
  newGame(cfg);
  const flushHero=state.players[0],mia=state.players[1],viktor=state.players[2];
  for(const x of state.players){
    x.out=false;x.folded=x!==flushHero&&x!==mia&&x!==viktor;x.allIn=false;x.bet=0;x.totalBet=0;
    x.acted=x.folded;x.checkedStreet=false;x.aggStreets=[];x.checkStreets=[];x.rangeCap=1;x.rangeFloor=0;x.lineRead='';
  }
  state.stage='turn';state.board=[C(10,2),C(12,2),C(14,2),C(11,2)];
  state._rangeComboInfoCache=Object.create(null);state._rangeBoardTextureCache=Object.create(null);
  state.bb=80;state.sb=40;state.ante=0;state.dealerIdx=state.players.at(-1).i;
  state.currentBet=0;state.lastRaiseSize=80;state.lastAggIdx=-1;state.pfAggIdx=mia.i;
  flushHero.pos='UTG';flushHero.hole=H(C(3,2),C(3,1));flushHero.chips=1400;flushHero.totalBet=320;flushHero.acted=false;
  mia.pos='CO';mia.style=STYLES.find(x=>x.id==='rock');mia.chips=3850;mia.totalBet=320;mia.rangeCap=.27;rangeModelInit(mia);
  viktor.pos='BTN';viktor.style=STYLES.find(x=>x.id==='station');viktor.chips=1620;viktor.totalBet=320;viktor.rangeCap=.27;rangeModelInit(viktor);
  const savedFlushEquity=mcEquityR;mcEquityR=()=>.61;
  const flushDecision=coachDecide(flushHero);
  mcEquityR=savedFlushEquity;
  if(flushDecision.rec!=='CHECK'||!flushDecision.flushInfo?.caution||flushDecision.flushInfo.higherCount!==7)
    throw new Error('low four-flush hand must check '+JSON.stringify({rec:flushDecision.rec,flushInfo:flushDecision.flushInfo}));
  if(!flushDecision.handDesc.includes('A-Q-J-10-3'))
    throw new Error('flush description must expose the full five-card tuple '+flushDecision.handDesc);
  const nutBoard=[C(13,2),C(9,2),C(4,2),C(2,2)],nutHero={...flushHero,hole:H(C(14,2),C(7,1))};
  state.board=nutBoard;state._rangeComboInfoCache=Object.create(null);state._rangeBoardTextureCache=Object.create(null);
  const nutFlushInfo=coachFlushRelativeStrength(nutHero,nutBoard,[
    {cap:.27,floor:0,model:mia.rangeModel,villain:mia},
    {cap:.27,floor:0,model:viktor.rangeModel,villain:viktor}
  ],960);
  if(!nutFlushInfo||nutFlushInfo.higherCount!==0||nutFlushInfo.caution)
    throw new Error('nut flush must remain eligible for value '+JSON.stringify(nutFlushInfo));

  /* Shallow flop bluff-catcher: profile looseness is already in the posterior equity.
     It must not be added a second time as fixed Wild + hard/c-bet bonuses, and calling
     off a large stack fraction must reduce underpair realization. */
  newGame(cfg);
  const shallowHero=state.players[0],daria=state.players[1];
  for(const x of state.players){
    x.out=false;x.folded=x!==shallowHero&&x!==daria;x.allIn=false;x.bet=0;x.totalBet=0;
    x.acted=x.folded;x.checkedStreet=false;x.aggStreets=[];x.checkStreets=[];x.rangeCap=1;x.rangeFloor=0;x.lineRead='';
  }
  state.stage='flop';state.board=[C(3,1),C(11,1),C(9,0)];
  state._rangeComboInfoCache=Object.create(null);state._rangeBoardTextureCache=Object.create(null);
  state.bb=80;state.sb=40;state.ante=0;state.dealerIdx=shallowHero.i;
  state.currentBet=400;state.lastRaiseSize=400;state.lastAggIdx=daria.i;state.pfAggIdx=daria.i;
  shallowHero.pos='BTN';shallowHero.hole=H(C(5,2),C(5,1));shallowHero.chips=960;
  shallowHero.bet=0;shallowHero.totalBet=200;shallowHero.acted=false;
  daria.pos='CO';daria.style=STYLES.find(x=>x.id==='maniac');daria.chips=1280;
  daria.bet=400;daria.totalBet=720;daria.rangeCap=.48;daria.lineRead='cbet';rangeModelInit(daria);
  const savedShallowEquity=mcEquityR;mcEquityR=()=>.36;
  const shallowDecision=coachDecide(shallowHero);
  mcEquityR=savedShallowEquity;
  const expectedModeledEq=.36-.05-shallowDecision.underpairPen;
  if(shallowDecision.rec!=='FOLD'||shallowDecision.underpairInfo?.callFraction<.40||
      shallowDecision.underpairInfo?.sprAfter>.50||shallowDecision.underpairPen<.09)
    throw new Error('55/J93 shallow vs large Wild c-bet must fold '+JSON.stringify({
      rec:shallowDecision.rec,eqAdj:shallowDecision.eqAdj,pen:shallowDecision.underpairPen,
      info:shallowDecision.underpairInfo,odds:shallowDecision.odds
    }));
  if(Math.abs(shallowDecision.eqAdj-expectedModeledEq)>1e-9)
    throw new Error('profile-aware posterior was counted twice '+JSON.stringify({
      eqAdj:shallowDecision.eqAdj,expectedModeledEq
    }));

  /* A suited connector is not an automatic chart call. Exact open size,
     postflop position, effective depth and players behind must change its EV. */
  newGame({...cfg,gameType:'cash',startBlind:100,startBB:100});
  const suitedHero=state.players[0],suitedOpener=state.players[1],deadBlind=state.players[2];
  for(const x of state.players){
    x.out=false;x.folded=x!==suitedHero&&x!==suitedOpener;x.allIn=false;x.bet=0;x.totalBet=0;
    x.acted=true;x.checkedStreet=false;x.aggStreets=[];x.checkStreets=[];x.rangeCap=1;x.rangeFloor=0;x.lineRead='';
  }
  state.stage='preflop';state.board=[];state.bb=100;state.sb=50;state.ante=0;
  state.dealerIdx=suitedOpener.i;state.currentBet=250;state.lastRaiseSize=150;
  state.lastAggIdx=suitedOpener.i;state.pfAggIdx=suitedOpener.i;
  state.streetRaiseCount=1;state.preflopRaiseCount=1;
  suitedHero.pos='BB';suitedHero.hole=holes.eightSeven;suitedHero.chips=9900;
  suitedHero.bet=100;suitedHero.totalBet=100;suitedHero.acted=false;
  suitedOpener.pos='BTN';suitedOpener.style=STYLES.find(x=>x.id==='shark');suitedOpener.chips=9750;
  suitedOpener.bet=250;suitedOpener.totalBet=250;rangeModelInit(suitedOpener);
  deadBlind.totalBet=50;
  const savedPreflopEquity=mcEquityR;mcEquityR=()=>.44;
  const standardConnector=coachDecide(suitedHero);
  if(standardConnector.rec!=='CALL'||!standardConnector.preflopCallInfo?.profitable||
      standardConnector.preflopCallInfo.openBB!==2.5||standardConnector.evs.CALL<0||
      !standardConnector.why[0]?.includes('contextual call'))
    throw new Error('87s must remain a defend versus a standard BTN open '+JSON.stringify({
      rec:standardConnector.rec,info:standardConnector.preflopCallInfo,evs:standardConnector.evs
    }));
  state.currentBet=500;state.lastRaiseSize=250;suitedOpener.chips=9500;
  suitedOpener.bet=500;suitedOpener.totalBet=500;
  const largeConnector=coachDecide(suitedHero);
  mcEquityR=savedPreflopEquity;
  if(largeConnector.rec!=='FOLD'||largeConnector.preflopCallInfo?.profitable||
      largeConnector.evs.CALL>=0||largeConnector.preflopCallInfo?.realization>=standardConnector.preflopCallInfo.realization||
      !largeConnector.why[0]?.includes('not profitable'))
    throw new Error('87s must fold when the same range uses a 5 BB open '+JSON.stringify({
      rec:largeConnector.rec,info:largeConnector.preflopCallInfo,evs:largeConnector.evs
    }));
  const deepIp=coachPreflopCallModel(suitedHero,suitedOpener,400,650,.44,400/1050,
    false,true,0,0,'hard');
  const deepOop=coachPreflopCallModel(suitedHero,suitedOpener,400,650,.44,400/1050,
    true,false,0,0,'hard');
  if(!(deepIp.realization>deepOop.realization))
    throw new Error('true postflop position must improve equity realization');
  const oldHeroChips=suitedHero.chips,oldOpenerChips=suitedOpener.chips;
  suitedHero.chips=1900;suitedOpener.chips=1500;
  state.currentBet=250;suitedOpener.bet=250;
  const shallowConnector=coachPreflopCallModel(suitedHero,suitedOpener,150,400,.44,150/550,
    false,true,0,0,'hard');
  suitedHero.chips=oldHeroChips;suitedOpener.chips=oldOpenerChips;
  if(!(shallowConnector.realization<standardConnector.preflopCallInfo.realization))
    throw new Error('shallow stacks must reduce suited-connector realization');
  /* Extra callers improve the price of hands that retain equity multiway, but
     the credit must be generic, capped and unavailable for expensive/shallow entries. */
  state.currentBet=250;suitedOpener.bet=250;suitedOpener.totalBet=250;
  deadBlind.folded=false;deadBlind.acted=true;deadBlind.allIn=false;deadBlind.pos='CO';
  deadBlind.bet=250;deadBlind.totalBet=250;deadBlind.chips=9750;
  suitedHero.hole=holes.eightSeven;
  const multiwayConnector=coachPreflopCallModel(suitedHero,suitedOpener,150,650,.31,150/800,
    false,true,0,0,'hard');
  suitedHero.hole=holes.KJo;
  const multiwayOffsuitBroadway=coachPreflopCallModel(suitedHero,suitedOpener,150,650,.34,150/800,
    false,true,0,0,'hard');
  suitedHero.hole=holes.A5s;
  const multiwaySuitedAce=coachPreflopCallModel(suitedHero,suitedOpener,150,650,.32,150/800,
    false,true,0,0,'hard');
  suitedHero.hole=holes.eightSeven;
  if(multiwayConnector.callers!==1||multiwayConnector.multiwayImpliedCredit<=0||
      !(multiwayConnector.multiwayRetention>multiwayOffsuitBroadway.multiwayRetention)||
      !(multiwayConnector.callerRealizationCost<multiwayOffsuitBroadway.callerRealizationCost)||
      !(multiwaySuitedAce.multiwayRetention>multiwayConnector.multiwayRetention)||
      !(multiwaySuitedAce.multiwayReversePenalty<multiwayConnector.multiwayReversePenalty))
    throw new Error('multiway retention must favor suited/nut-capable hands '+JSON.stringify({
      connector:multiwayConnector,broadway:multiwayOffsuitBroadway,suitedAce:multiwaySuitedAce
    }));
  state.currentBet=500;suitedOpener.bet=500;suitedOpener.totalBet=500;
  deadBlind.bet=500;deadBlind.totalBet=500;
  const expensiveMultiway=coachPreflopCallModel(suitedHero,suitedOpener,400,1150,.29,400/1550,
    false,true,0,0,'hard');
  const savedHeroChips=suitedHero.chips,savedVillainChips=suitedOpener.chips;
  state.currentBet=250;suitedOpener.bet=250;suitedOpener.totalBet=250;deadBlind.bet=250;deadBlind.totalBet=250;
  suitedHero.chips=2400;suitedOpener.chips=2250;
  const shallowMultiway=coachPreflopCallModel(suitedHero,suitedOpener,150,650,.31,150/800,
    false,true,0,0,'hard');
  suitedHero.chips=savedHeroChips;suitedOpener.chips=savedVillainChips;
  if(expensiveMultiway.multiwayImpliedCredit!==0||shallowMultiway.multiwayImpliedCredit!==0)
    throw new Error('large opens and shallow stacks must suppress multiway implied credit '+JSON.stringify({
      expensive:expensiveMultiway,shallow:shallowMultiway
    }));
  deadBlind.folded=true;deadBlind.acted=true;deadBlind.bet=0;deadBlind.totalBet=50;

  const rockSqueeze=state.players[3],wildSqueeze=state.players[4];
  rockSqueeze.style=STYLES.find(x=>x.id==='rock');rockSqueeze.pos='SB';rockSqueeze.chips=9900;
  wildSqueeze.style=STYLES.find(x=>x.id==='maniac');wildSqueeze.pos='SB';wildSqueeze.chips=9900;
  if(!(coachPreflopSqueezeRisk(wildSqueeze,suitedOpener,2.5,0,'hard')>
      coachPreflopSqueezeRisk(rockSqueeze,suitedOpener,2.5,0,'hard')))
    throw new Error('player profile must change squeeze risk');
  state.currentBet=250;suitedOpener.bet=250;suitedOpener.totalBet=250;suitedOpener.chips=9750;
  const noPlayersBehind=coachPreflopCallModel(suitedHero,suitedOpener,150,400,.44,150/550,
    false,true,0,0,'hard');
  rockSqueeze.folded=false;rockSqueeze.acted=false;rockSqueeze.bet=0;rockSqueeze.totalBet=0;
  wildSqueeze.folded=false;wildSqueeze.acted=false;wildSqueeze.bet=0;wildSqueeze.totalBet=0;wildSqueeze.pos='BB';
  const playersBehind=coachPreflopCallModel(suitedHero,suitedOpener,150,400,.44,150/550,
    false,true,0,0,'hard');
  if(playersBehind.behindCount!==2||playersBehind.squeezeRisk<=0||
      !(playersBehind.requiredEq>noPlayersBehind.requiredEq))
    throw new Error('players behind must add branch-weighted squeeze cost '+JSON.stringify(playersBehind));
  let committedOppCount=0;
  const savedBranchEquity=mcEquityR;
  mcEquityR=(hole,board,ranges)=>{committedOppCount=ranges.length;return .44;};
  const branchDecision=coachDecide(suitedHero);
  mcEquityR=savedBranchEquity;
  if(committedOppCount!==1||branchDecision.preflopCallInfo?.behindCount!==2||
      !branchDecision.extra[0]?.includes(pct(branchDecision.preflopCallInfo.requiredEq)))
    throw new Error('unacted players must be squeeze branches, not forced showdown opponents '+JSON.stringify({
      committedOppCount,behind:branchDecision.preflopCallInfo?.behindCount
    }));
  rockSqueeze.folded=true;rockSqueeze.acted=true;wildSqueeze.folded=true;wildSqueeze.acted=true;

  /* A hard bot that has left a tiny stack behind must use the actual final
     price, not stack several Tight/profile safety margins and overfold. */
  newGame({...cfg,gameType:'cash',numPlayers:6,startBlind:100,startBB:100});
  const committedRock=state.players[1],riverAgg=state.players[2];
  for(const x of state.players){
    x.out=false;x.folded=x!==committedRock&&x!==riverAgg;x.allIn=false;x.bet=0;x.totalBet=0;
    x.acted=true;x.checkedStreet=false;x.aggStreets=[];x.checkStreets=[];x.rangeCap=1;x.rangeFloor=0;
  }
  state.stage='river';state.board=[C(13,0),C(9,1),C(6,2),C(2,3),C(11,0)];
  state.currentBet=1600;state.lastRaiseSize=400;state.streetRaiseCount=1;
  committedRock.style=STYLES.find(x=>x.id==='rock');committedRock.hole=H(C(9,2),C(8,3));
  committedRock.chips=400;committedRock.bet=1200;committedRock.totalBet=3200;
  riverAgg.chips=5000;riverAgg.bet=1600;riverAgg.totalBet=4400;
  riverAgg.rangeModel={strong:.80,bluff:0,aggr:.10,capped:0};
  state.lastAggIdx=riverAgg.i;
  const committedOdds=400/8000;
  const committedInfo=aiPostflopCommitmentInfo(committedRock,400,7600,committedOdds);
  const committedDecision=aiHardPostflopVsBet(committedRock,.10,committedOdds,400,7600,'hard',
    aiEffectiveStyle(committedRock),aiPostflopAdj(committedRock,400,7600));
  committedRock.hole=H(C(8,2),C(7,3));
  const hopelessDecision=aiHardPostflopVsBet(committedRock,.03,committedOdds,400,7600,'hard',
    aiEffectiveStyle(committedRock),aiPostflopAdj(committedRock,400,7600));
  if(!committedInfo.severe||committedInfo.streetCommitted!==.75||
      committedDecision?.type!=='call'||hopelessDecision?.type!=='fold')
    throw new Error('postflop commitment must respect cheap calls without forcing zero-equity bluff catches '+
      JSON.stringify({committedInfo,committedDecision,hopelessDecision}));
  committedRock.chips=1600;committedRock.bet=0;
  const jamTarget=aiCommitPostflopTarget(committedRock,1600,1200,'hard');
  const normalTarget=aiCommitPostflopTarget(committedRock,1600,700,'hard');
  const mediumTarget=aiCommitPostflopTarget(committedRock,1600,1200,'medium');
  if(jamTarget!==1600||normalTarget!==700||mediumTarget!==1200)
    throw new Error('hard sizing must jam instead of leaving an unusable stack stub '+
      JSON.stringify({jamTarget,normalTarget,mediumTarget}));

  newGame(cfg);state.stage='preflop';state.board=[];state.bb=100;state.sb=50;state.currentBet=100;
  state.lastRaiseSize=100;state.streetRaiseCount=0;state.preflopRaiseCount=0;state.handLog=[];
  const opener=state.players[1],reraiser=state.players[2];
  for(const x of state.players){x.folded=x!==opener&&x!==reraiser;x.out=false;x.bet=0;x.totalBet=0;x.allIn=false;x.acted=false;
    x.aggStreets=[];x.checkStreets=[];x.checkedStreet=false;x.rangeCap=1;x.rangeFloor=0;rangeModelInit(x);}
  opener.pos='CO';reraiser.pos='BB';opener.hole=holes.A5s;reraiser.hole=holes.AA;
  applyAction(opener,'raise',250);
  applyAction(reraiser,'raise',900);
  applyAction(opener,'raise',2200);
  applyAction(reraiser,'raise',reraiser.bet+reraiser.chips);
  if(state.preflopRaiseCount!==4||state.streetRaiseCount!==4)throw new Error('raise counters missed a level');
  const ordinals=[opener.rangeModel.history[0].raiseOrdinal,reraiser.rangeModel.history[0].raiseOrdinal,
    opener.rangeModel.history[1].raiseOrdinal,reraiser.rangeModel.history[1].raiseOrdinal];
  if(ordinals.join(',')!=='1,2,3,4')throw new Error('action tree ordinals '+ordinals.join(','));
  return {policy,jamAA,jamA5,topCheck,airCheck,kingBeforeCheck,kingAfterCheck,
    effective:metrics.effective,legal:metrics.legal,underpair,withBackdoor,smallIp,
    underpairDecision:{rec:underpairDecision.rec,eqAdj:underpairDecision.eqAdj,pen:underpairDecision.underpairPen,callEv:underpairDecision.evs.CALL},
    flushDecision:{rec:flushDecision.rec,higher:flushDecision.flushInfo.higherCount,
      danger:flushDecision.flushInfo.anyBetter,continued:flushDecision.flushInfo.aheadWhenContinued},
    nutFlush:{higher:nutFlushInfo.higherCount,caution:nutFlushInfo.caution,
      continued:nutFlushInfo.aheadWhenContinued},
    shallowDecision:{rec:shallowDecision.rec,eqAdj:shallowDecision.eqAdj,pen:shallowDecision.underpairPen,
      callFraction:shallowDecision.underpairInfo.callFraction,sprAfter:shallowDecision.underpairInfo.sprAfter},
    suitedConnector:{
      standard:{rec:standardConnector.rec,realized:standardConnector.preflopCallInfo.realizedEq,
        need:standardConnector.preflopCallInfo.requiredEq,callEv:standardConnector.evs.CALL},
      large:{rec:largeConnector.rec,realized:largeConnector.preflopCallInfo.realizedEq,
        need:largeConnector.preflopCallInfo.requiredEq,callEv:largeConnector.evs.CALL},
      deepIp:deepIp.realization,deepOop:deepOop.realization,shallow:shallowConnector.realization,
      squeezeRisk:playersBehind.squeezeRisk,squeezeNeed:playersBehind.requiredEq,committedOppCount
    },
    ordinals};
})()`,context);

assert.ok(result);
console.log(JSON.stringify(result,null,2));
