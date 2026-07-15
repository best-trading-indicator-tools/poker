#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const files=['eval.js','modes/registry.js','modes/tournament.js','modes/cash.js','engine.js','rewards.js','coach.js','ai.js','mp.js','ui.js'];
const games=Math.max(25,Number(process.argv[2])||100);
const limits={winRate:0.18,itmRate:0.46,avgFinish:4.35};
const storage=new Map();
const context=vm.createContext({
  console,setTimeout,clearTimeout,queueMicrotask,Date,Math,JSON,Promise,
  localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)},
  globalThis:null
});
context.globalThis=context;
for(const file of files)vm.runInContext(fs.readFileSync(path.join(ROOT,'js',file),'utf8'),context,{filename:file});

const result=await vm.runInContext(`(async()=>{
  const places=[];
  const cfg={gameType:'sng',numPlayers:9,startBB:100,startBlind:100,ante:0.10,speed:'turbo',difficulty:'hard',allAI:true,coachBot:true};
  AI_DELAY_MIN=0;AI_DELAY_MAX=0;RUNOUT_DELAY=0;SHOWDOWN_PAUSE=0;FOLDWIN_PAUSE=0;BENCH=true;
  await new Promise(resolve=>{
    const run=()=>{
      globalThis.__onGameOver=s=>{
        const hero=s.players[0]; places.push(hero.out?(hero.place||cfg.numPlayers):1);
        places.length>=${games}?resolve():setTimeout(run,0);
      };
      newGame({...cfg});startHand();
    };
    run();
  });
  BENCH=false;
  return {games:places.length,wins:places.filter(x=>x===1).length,itm:places.filter(x=>x<=3).length,avg:places.reduce((a,b)=>a+b,0)/places.length};
})()`,context);

const rates={winRate:result.wins/result.games,itmRate:result.itm/result.games,avgFinish:result.avg};
const pass=rates.winRate<=limits.winRate&&rates.itmRate<=limits.itmRate&&rates.avgFinish>=limits.avgFinish;
console.log(JSON.stringify({...result,...rates,limits,pass},null,2));
process.exitCode=pass?0:1;
