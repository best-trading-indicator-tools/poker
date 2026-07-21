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
  return {policy,jamAA,jamA5,topCheck,airCheck,effective:metrics.effective,legal:metrics.legal,ordinals};
})()`,context);

assert.ok(result);
console.log(JSON.stringify(result,null,2));
