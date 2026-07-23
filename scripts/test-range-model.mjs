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
for(const file of files)vm.runInContext(fs.readFileSync(path.join(ROOT,'js',file),'utf8'),context,{filename:file});

const result=vm.runInContext(`(()=>{
  const C=(r,s)=>({r,s}), H=(a,b)=>[a,b];
  const holes={AA:H(C(14,0),C(14,1)),A5s:H(C(14,0),C(5,0)),A5o:H(C(14,0),C(5,1)),sevenTwo:H(C(7,0),C(2,1))};
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

  /* One 169-cell label can hide very different suit-specific outcomes. With an
     equal-weight AQs-only range on a three-club turn, exactly A♣Q♣ is a flush. */
  const clubTurn=[C(3,0),C(5,3),C(3,3),C(11,3)],suitedWeights=new Array(1326).fill(0);
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
    underpairDecision:{rec:underpairDecision.rec,eqAdj:underpairDecision.eqAdj,pen:underpairDecision.underpairPen,callEv:underpairDecision.evs.CALL},ordinals};
})()`,context);

assert.ok(result);
console.log(JSON.stringify(result,null,2));
