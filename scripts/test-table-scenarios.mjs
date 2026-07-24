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
  const base={gameType:'sng',numPlayers:6,startBB:100,startBlind:20,ante:0,speed:'standard',difficulty:'hard'};
  const countPlayers=()=>{
    const out={rock:0,station:0,shark:0,maniac:0};
    for(const p of state.players.slice(1))out[p.style.id]++;
    return out;
  };
  const expect={
    tight:{rock:3,station:1,shark:1,maniac:0},
    loose:{rock:0,station:3,shark:1,maniac:1},
    aggressive:{rock:1,station:0,shark:3,maniac:1},
    wild:{rock:0,station:1,shark:1,maniac:3}
  };
  const actual={};
  for(const id of Object.keys(expect)){
    newGame({...base,tableScenario:id});
    actual[id]=countPlayers();
    if(JSON.stringify(actual[id])!==JSON.stringify(expect[id]))
      throw new Error(id+' composition '+JSON.stringify(actual[id]));
  }

  newGame({...base,numPlayers:9,tableScenario:'balanced'});
  const balanced=countPlayers();
  if(!Object.values(balanced).every(n=>n===2))throw new Error('9-player balanced composition '+JSON.stringify(balanced));

  const tableCustom={rock:2,station:0,shark:2,maniac:1};
  newGame({...base,tableScenario:'custom',tableCustom});
  const custom=countPlayers();
  if(JSON.stringify(custom)!==JSON.stringify(tableCustom))throw new Error('custom composition '+JSON.stringify(custom));

  newGame({...base,tableScenario:'not-a-scenario'});
  if(state.cfg.tableScenario!=='balanced')throw new Error('invalid scenario did not normalize');
  const fallback=countPlayers();
  if(Object.values(fallback).reduce((a,b)=>a+b,0)!==5)throw new Error('fallback lost players');

  newGame({...base,tableScenario:'random'});
  const randomIds=state.players.slice(1).map(p=>p.style.id);
  if(randomIds.length!==5||randomIds.some(id=>!TABLE_STYLE_IDS.includes(id)))throw new Error('random scenario invalid');

  newGame({...base,tableScenario:'aggressive',mpRemotes:[{name:'Guest 1',seat:1},{name:'Guest 2',seat:2}]});
  const multiplayerBots=state.players.filter(p=>p.i!==0&&!p.remote);
  if(multiplayerBots.length!==3||multiplayerBots.some(p=>!p.style))
    throw new Error('multiplayer bot profiles missing');
  if(state.players[1].style||state.players[2].style)throw new Error('remote humans received bot profiles');

  for(const id of ['balanced','tight','loose','aggressive','wild','custom']){
    for(const bots of [1,2,3,5,8]){
      const counts=tableScenarioCounts(id,bots,id==='custom'?tableCustom:null);
      const total=TABLE_STYLE_IDS.reduce((s,k)=>s+(counts[k]||0),0);
      if(total!==bots)throw new Error(id+' allocation '+bots+' -> '+total);
    }
  }
  newGame({...base,tableScenario:'balanced'});
  const blindDisplay=[bbs(state.sb),bbs(state.bb)];
  state.handNum=11;getMode().applyBlinds(state);
  const raisedBlindDisplay=[bbs(state.sb),bbs(state.bb)];
  if(blindDisplay.join('/')!=='0.5 BB/1 BB')
    throw new Error('incorrect starting blind display '+blindDisplay.join('/'));
  if(raisedBlindDisplay.join('/')!=='0.5 BB/1 BB')
    throw new Error('table amounts must use the current live BB '+raisedBlindDisplay.join('/'));
  if(state.bb!==40||state.sb!==20)throw new Error('live tournament blinds did not double');
  state.handNum=21;getMode().applyBlinds(state);
  if(state.bb!==80||state.sb!==40||bbs(state.sb)!=='0.5 BB'||bbs(state.bb)!=='1 BB')
    throw new Error('second blind step did not double again');
  const tournamentBlinds=[state.sb,state.bb];

  newGame({...base,gameType:'cash',tableScenario:'balanced'});
  const cashBlinds=[state.sb,state.bb];
  state.handNum=999;getMode().applyBlinds(state);
  if(state.sb!==cashBlinds[0]||state.bb!==cashBlinds[1])
    throw new Error('cash-game blinds must remain fixed');
  if(bbs(state.sb)!=='0.5 BB'||bbs(state.bb)!=='1 BB')
    throw new Error('cash-game table amounts must use the current fixed BB');
  state.bb=1000;
  const screenshotExample=usd(2000)+' · '+bbs(2000);
  if(screenshotExample!=='$400 · 2 BB')
    throw new Error('current-BB conversion regression '+screenshotExample);

  const soundKinds=['preview','deal','chip','fold','check','tick','alert','win','xp','bigwin','levelup','ko','bounty'];
  const soundPacks=['classic','arcade','retro','casino'],soundSignatures={};
  for(const pack of soundPacks){
    soundSignatures[pack]={};
    for(const kind of soundKinds){
      const plan=soundCuePlan(kind,pack);
      if(!Array.isArray(plan)||!plan.length||plan.some(note=>note.length!==5||note[0]<=0||note[2]<=0||note[3]<=0))
        throw new Error('invalid '+pack+' '+kind+' cue '+JSON.stringify(plan));
      soundSignatures[pack][kind]=JSON.stringify(plan);
      if(pack!=='classic'&&soundSignatures[pack][kind]===JSON.stringify(soundCuePlan(kind,'classic')))
        throw new Error(pack+' does not change '+kind);
    }
  }
  const rewardSoundState=getRewardState();
  rewardSoundState.unlockedCosmetics.soundPack=['classic','retro'];
  rewardSoundState.equippedCosmetics.soundPack='retro';
  localStorage.setItem('sg_poker_rewards_v1',JSON.stringify(rewardSoundState));
  if(activeSoundPack()!=='retro')throw new Error('equipped sound pack is not used by playback');
  if(!rewardKindDescription('soundPack').includes('all table and reward sounds'))
    throw new Error('sound-pack UI still describes reward-only audio');

  return {actual,balanced,custom,fallback,randomIds,multiplayerBots:multiplayerBots.map(p=>p.style.id),
    blindDisplay,raisedBlindDisplay,tournamentBlinds,cashBlinds,screenshotExample,
    soundPacks:Object.fromEntries(soundPacks.map(pack=>[pack,soundKinds.length]))};
})()`,context);

assert.ok(result);
const html=fs.readFileSync(path.join(ROOT,'poker.html'),'utf8');
for(const id of ['tableScenarioSel','tableScenarioPreview','tableCustom','tableRoleRock','tableRoleStation','tableRoleShark','tableRoleManiac'])
  assert.match(html,new RegExp(`id=["']${id}["']`),`missing setup control ${id}`);
for(const scenario of ['balanced','tight','loose','aggressive','wild','random','custom'])
  assert.match(html,new RegExp(`<option value=["']${scenario}["']`),`missing scenario option ${scenario}`);
console.log(JSON.stringify(result,null,2));
