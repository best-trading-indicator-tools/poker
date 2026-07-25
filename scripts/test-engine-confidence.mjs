#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {webcrypto} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const files=['eval.js','modes/registry.js','modes/tournament.js','modes/cash.js','engine.js','rewards.js','academy.js','coach.js','ai.js','mp.js','ui.js'];
const storage=new Map();
const context=vm.createContext({
  console,setTimeout,clearTimeout,queueMicrotask,Date,Math,JSON,Promise,crypto:webcrypto,
  localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)},
  globalThis:null
});
context.globalThis=context;
for(const file of files)vm.runInContext(fs.readFileSync(path.join(ROOT,'js',file),'utf8'),context,{filename:file});

const result=vm.runInContext(`(()=>{
  const code=c=>RANK_CH[c.r]+'shdc'[c.s];
  const deckWithSeed=seed=>{setGameSeed(seed);return shuffle(makeDeck()).map(code).join(' ')};
  const seededA=deckWithSeed('confidence-42');
  const seededB=deckWithSeed('confidence-42');
  const seededC=deckWithSeed('confidence-43');
  if(seededA!==seededB)throw new Error('seeded shuffle is not reproducible');
  if(seededA===seededC)throw new Error('different seeds produced the same shuffle');
  if(new Set(seededA.split(' ')).size!==52)throw new Error('shuffle lost or duplicated cards');
  setGameSeed(null);

  const mk=(i,totalBet,score,folded=false)=>({i,name:'P'+i,chips:0,totalBet,folded,out:false});
  const p0=mk(0,100,[8,14]),p1=mk(1,300,[1,14,13,12,11]),p2=mk(2,300,[4,9]),p3=mk(3,300,[0,14,13,12,11,9],true);
  const players=[p0,p1,p2,p3],live=players.filter(p=>!p.folded);
  const scores=new Map([[p0,p0.score||[8,14]],[p1,[1,14,13,12,11]],[p2,[4,9]]]);
  const settled=settleShowdownPots(players,live,scores,3);
  const won=Object.fromEntries([...settled.winnings].map(([p,n])=>[p.i,n]));
  if(JSON.stringify(won)!==JSON.stringify({0:400,2:600}))throw new Error('nested side pots wrong '+JSON.stringify(won));
  if(settled.pots.reduce((s,p)=>s+p.amount,0)!==1000)throw new Error('side-pot chip conservation failed');

  const t0=mk(0,5),t1=mk(1,5),t2=mk(2,5);
  const tied=settleShowdownPots([t0,t1,t2],[t0,t1],new Map([[t0,[1,14,9,8,7]],[t1,[1,14,9,8,7]]]),2);
  if(tied.winnings.get(t0)!==8||tied.winnings.get(t1)!==7)throw new Error('odd chip did not go left of dealer');

  const base={gameType:'sng',numPlayers:2,startBB:100,startBlind:20,ante:0,speed:'standard',difficulty:'hard',seed:'heads-up'};
  newGame({...base});
  state.dealerIdx=0;
  const sb=0,bb=1;assignPositions(sb);
  if(state.players[sb].pos!=='SB/BTN'||state.players[bb].pos!=='BB')throw new Error('heads-up positions wrong');

  newGame({...base,numPlayers:3});
  const [a,b,c]=state.players;
  for(const p of state.players){p.chips=1000;p.bet=0;p.totalBet=0;p.acted=false;p.folded=false;p.out=false;p.allIn=false;p.rangeCap=1;p.rangeFloor=0;p.aggStreets=[];p.checkStreets=[];}
  Object.assign(state,{stage:'preflop',currentBet:100,lastRaiseSize:100,streetRaiseCount:0,preflopRaiseCount:0,lastAggIdx:-1,pfAggIdx:-1,board:[]});
  a.bet=100;a.totalBet=100;a.acted=true;
  b.bet=100;b.totalBet=100;b.acted=false;b.chips=50;
  c.bet=100;c.totalBet=100;c.acted=true;
  applyAction(b,'raise',150);
  if(state.currentBet!==150||state.lastRaiseSize!==100)throw new Error('short all-in accounting wrong');
  applyAction(a,'raise',400);
  if(a.bet!==150||state.currentBet!==150)throw new Error('short all-in incorrectly reopened raising');

  a.bet=500;a.totalBet=500;a.chips=500;a.allIn=false;
  b.bet=200;b.totalBet=200;b.chips=0;b.allIn=true;
  c.bet=300;c.totalBet=300;c.chips=700;c.allIn=false;
  refundUncalled();
  if(a.bet!==300||a.totalBet!==300||a.chips!==700)throw new Error('uncalled bet refund wrong');

  const roundTrip=['As','10h','2c','7d'];
  if(codesToCards(roundTrip).map(cardToCode).join(',')!==roundTrip.join(','))throw new Error('resume card serialization failed');

  return {seededDeckHead:seededA.split(' ').slice(0,5),sidePots:settled.pots.map(p=>p.amount),oddChip:[tied.winnings.get(t0),tied.winnings.get(t1)]};
})()`,context);

console.log(JSON.stringify(result,null,2));
assert.equal(result.sidePots.reduce((a,b)=>a+b,0),1000);
