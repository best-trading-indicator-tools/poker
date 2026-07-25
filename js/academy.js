"use strict";
/* ================= POKER ACADEMY ================= */
const ACADEMY_KEY='sg_poker_academy_v1';
const ACADEMY_CATEGORIES={
  pf_open:'Preflop opens',pf_face_raise:'Facing raises',cbet_def:'C-bet defense',
  multiway:'Multiway pots',river_call:'River calls',push_fold:'Push / fold',pot_odds:'Pot odds'
};
const ACADEMY_DRILLS=[
  {id:'pf1',cat:'pf_open',title:'Button steal',spot:'18 BB, folded to you on the BTN with A♠7♠.',options:['Fold','Call','Raise'],answer:2,why:'A suited ace is comfortably inside an 18 BB button opening range. Raise to pressure the blinds.'},
  {id:'pf2',cat:'pf_open',title:'Early-position discipline',spot:'Nine-handed, 60 BB UTG with K♣9♦.',options:['Fold','Call','Raise'],answer:0,why:'K9 offsuit is dominated too often from early position. Open-fold it.'},
  {id:'fr1',cat:'pf_face_raise',title:'Facing an early raise',spot:'45 BB in the CO with A♦J♣ after a tight UTG player opens.',options:['Fold','Call','3-bet'],answer:0,why:'Against a tight early-position range, offsuit AJ is dominated and plays poorly. Folding is disciplined.'},
  {id:'fr2',cat:'pf_face_raise',title:'Premium response',spot:'50 BB on the BTN with K♠K♥ facing a CO open.',options:['Fold','Call','3-bet'],answer:2,why:'Pocket kings want value and protection. Build the pot with a 3-bet.'},
  {id:'cb1',cat:'cbet_def',title:'Dry-flop defense',spot:'You call from the BB with 8♠8♦. Flop K♣7♥2♠; BTN bets 25% pot.',options:['Fold','Call','Raise'],answer:1,why:'A small c-bet on a dry board contains many missed hands. One pair can continue at this price.'},
  {id:'cb2',cat:'cbet_def',title:'Bad price with air',spot:'You hold A♣Q♦ on 9♠8♠6♥. A tight player bets pot into you.',options:['Fold','Call','Raise'],answer:0,why:'Two overcards without a robust draw do not justify calling a pot-sized bet on this coordinated board.'},
  {id:'mw1',cat:'multiway',title:'Multiway value threshold',spot:'Four players see J♠9♠6♦. You hold A♥J♦ and face a pot-sized bet plus a call.',options:['Fold','Call','Raise'],answer:0,why:'One pair shrinks sharply in value against a large bet and a caller in a multiway pot.'},
  {id:'rv1',cat:'river_call',title:'River bluff-catch',spot:'You hold A♣Q♣ on Q♦8♠4♥2♣K♠. A tight opponent bets pot after barreling three streets.',options:['Fold','Call','Raise'],answer:0,why:'A tight triple-barrel range is value-heavy. One pair is not a profitable pot-sized bluff-catch.'},
  {id:'rv2',cat:'river_call',title:'Missed draws',spot:'You hold K♣J♣ on J♦8♣3♠5♣2♥. A wild opponent bets 35% pot after checking the turn.',options:['Fold','Call','Raise'],answer:1,why:'The price is small and a wild player has many missed draws. Top pair is a clear bluff-catch.'},
  {id:'sh1',cat:'push_fold',title:'Button shove',spot:'7 BB on the BTN, folded to you with A♥5♥.',options:['Fold','Min-raise','All-in'],answer:2,why:'At 7 BB, a suited ace is strong enough to open-shove and avoids awkward postflop decisions.'},
  {id:'po1',cat:'pot_odds',title:'Flush-draw price',spot:'Pot is 600. Villain bets 200 on the turn; you have nine clean flush outs.',options:['Fold','Call','Raise'],answer:1,why:'Calling 200 to contest 1,000 needs 20%. Nine clean outs are about 19.6% with one card to come—close enough with minimal implied value.'}
];
let academyState={cat:'',queue:[],idx:0,correct:0,replay:null,answered:false};
function academyLoad(){
  try{return Object.assign({version:1,categories:{},attempts:0,correct:0},JSON.parse(localStorage.getItem(ACADEMY_KEY)||'null')||{});}
  catch(e){return {version:1,categories:{},attempts:0,correct:0};}
}
function academySave(s){try{localStorage.setItem(ACADEMY_KEY,JSON.stringify(s));}catch(e){}}
function academyRecord(cat,correct){
  const s=academyLoad(),c=s.categories[cat]||(s.categories[cat]={attempts:0,correct:0,streak:0});
  c.attempts++;s.attempts++;if(correct){c.correct++;s.correct++;c.streak++;}else c.streak=0;
  academySave(s);return s;
}
function academyMastery(cat,s=academyLoad()){
  const c=s.categories[cat]||{attempts:0,correct:0};
  return c.attempts?Math.round(c.correct/c.attempts*100):0;
}
function academyLeakCategory(){
  let games=[];try{games=JSON.parse(localStorage.getItem('sg_poker_games')||'[]');}catch(e){}
  const totals={};
  for(const g of games)for(const d of (g.decisions||[])){
    const cat=d.spot||'pf_open';totals[cat]=(totals[cat]||0)+(d.evLoss||0);
  }
  return Object.entries(totals).sort((a,b)=>b[1]-a[1])[0]?.[0]||'pf_open';
}
function academyOpen(cat='',replay=null){
  const ov=document.getElementById('academyOv');if(!ov)return;
  academyState.replay=replay;
  academyState.cat=cat||academyLeakCategory();
  academyState.queue=replay?[replay]:ACADEMY_DRILLS.filter(d=>d.cat===academyState.cat);
  if(!academyState.queue.length)academyState.queue=ACADEMY_DRILLS.filter(d=>d.cat==='pf_open');
  academyState.idx=0;academyState.correct=0;academyState.answered=false;
  academyRender();
  if(typeof openDialog==='function')openDialog(ov,'academyTitle');else ov.classList.remove('hidden');
}
function academyReplayHand(hand){
  const decisions=(hand&&hand.myDecisions)||[];
  const d=decisions.find(x=>!x.followed)||decisions[0];
  if(!d)return academyOpen();
  const cat=typeof classifyLeakSpotRetro==='function'?classifyLeakSpotRetro(d):(d.stage==='river'?'river_call':'pf_open');
  academyOpen(cat,{id:'replay-'+(hand.hand||0),cat,title:`Replay Hand #${hand.hand||'?'}`,
    spot:`On the ${d.stage}, the coach recommended ${d.rec}. You chose ${String(d.action).toUpperCase()}. What is the best action when you replay the decision?`,
    options:['Fold','Check / Call','Raise'],answer:d.rec==='FOLD'?0:(d.rec==='CALL'||d.rec==='CHECK')?1:2,
    why:`The original coach line was ${d.rec}${d.evLoss?`, worth about ${usd(d.evLoss)} more EV than your action`:''}.`});
}
function academyRender(){
  const body=document.getElementById('academyBody'),s=academyLoad();if(!body)return;
  const d=academyState.queue[academyState.idx];
  const cats=Object.keys(ACADEMY_CATEGORIES).map(cat=>{
    const m=academyMastery(cat,s),recommended=cat===academyLeakCategory();
    return `<button class="academy-cat${cat===academyState.cat?' on':''}" data-acat="${cat}"><b>${ACADEMY_CATEGORIES[cat]}</b><span>${m}% mastery${recommended?' · recommended':''}</span></button>`;
  }).join('');
  if(!d){
    body.innerHTML=`<div class="academy-summary"><h3>Session complete</h3><div class="academy-score">${academyState.correct} / ${academyState.queue.length}</div><p>Mastery is updated from every answer.</p><button id="academyAgain">Practise again</button></div><div class="academy-cats">${cats}</div>`;
    document.getElementById('academyAgain').onclick=()=>academyOpen(academyState.cat);
  }else{
    body.innerHTML=`<div class="academy-progress">Question ${academyState.idx+1} / ${academyState.queue.length} · ${ACADEMY_CATEGORIES[d.cat]||'Replay'}</div>`+
      `<h3>${d.title}</h3><p class="academy-spot">${d.spot}</p><div class="academy-options">`+
      d.options.map((x,i)=>`<button data-aopt="${i}">${x}</button>`).join('')+
      `</div><div id="academyExplain"></div><button id="academyNext" class="hidden">Next</button><div class="academy-cats">${cats}</div>`;
  }
  body.querySelectorAll('[data-acat]').forEach(b=>b.onclick=()=>academyOpen(b.dataset.acat));
  body.querySelectorAll('[data-aopt]').forEach(b=>b.onclick=()=>academyAnswer(Number(b.dataset.aopt)));
}
function academyAnswer(choice){
  if(academyState.answered)return;academyState.answered=true;
  const d=academyState.queue[academyState.idx],ok=choice===d.answer;
  if(ok)academyState.correct++;
  academyRecord(d.cat,ok);
  document.querySelectorAll('[data-aopt]').forEach((b,i)=>{
    b.disabled=true;b.classList.toggle('correct',i===d.answer);b.classList.toggle('wrong',i===choice&&!ok);
  });
  document.getElementById('academyExplain').innerHTML=`<div class="academy-explain ${ok?'ok':'no'}"><b>${ok?'Correct':'Not quite'}</b><p>${d.why}</p></div>`;
  const next=document.getElementById('academyNext');next.classList.remove('hidden');
  next.textContent=academyState.idx+1>=academyState.queue.length?'See results':'Next';
  next.onclick=()=>{academyState.idx++;academyState.answered=false;academyRender();};
}

