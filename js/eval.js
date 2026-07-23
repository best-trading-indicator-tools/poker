"use strict";
const HAS_DOM = (typeof document !== 'undefined');
let lang = 'en';
/* localized rank & hand names */
const RANK_I18N={
fr:{nm:{2:'Deux',3:'Trois',4:'Quatre',5:'Cinq',6:'Six',7:'Sept',8:'Huit',9:'Neuf',10:'Dix',11:'Valet',12:'Dame',13:'Roi',14:'As'},
    pl:{2:'Deux',3:'Trois',4:'Quatre',5:'Cinq',6:'Six',7:'Sept',8:'Huit',9:'Neuf',10:'Dix',11:'Valets',12:'Dames',13:'Rois',14:'As'}},
es:{nm:{2:'Dos',3:'Tres',4:'Cuatro',5:'Cinco',6:'Seis',7:'Siete',8:'Ocho',9:'Nueve',10:'Diez',11:'Jota',12:'Dama',13:'Rey',14:'As'},
    pl:{2:'Doses',3:'Treses',4:'Cuatros',5:'Cincos',6:'Seises',7:'Sietes',8:'Ochos',9:'Nueves',10:'Dieces',11:'Jotas',12:'Damas',13:'Reyes',14:'Ases'}}};
function rankNm(r){return (RANK_I18N[lang]&&RANK_I18N[lang].nm[r])||RANK_NM[r];}
function rankPl(r){return (RANK_I18N[lang]&&RANK_I18N[lang].pl[r])||RANK_PL[r];}

const SUIT_CH = ['♠','♥','♦','♣'];
const RANK_CH = {2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'J',12:'Q',13:'K',14:'A'};
const RANK_NM = {2:'Two',3:'Three',4:'Four',5:'Five',6:'Six',7:'Seven',8:'Eight',9:'Nine',10:'Ten',11:'Jack',12:'Queen',13:'King',14:'Ace'};
const RANK_PL = {2:'Deuces',3:'Threes',4:'Fours',5:'Fives',6:'Sixes',7:'Sevens',8:'Eights',9:'Nines',10:'Tens',11:'Jacks',12:'Queens',13:'Kings',14:'Aces'};

const FULL_DECK = [];
for (let s=0;s<4;s++) for (let r=2;r<=14;r++) FULL_DECK.push({r,s});

function makeDeck(){ return FULL_DECK.slice(); }
function shuffle(a){
  const d=a.slice();
  for(let i=d.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]];}
  return d;
}

/* ================= HAND EVALUATION ================= */
/* score = array, compare lexicographically. [category, tiebreakers...] */
function evalFive(cs){
  const rs = cs.map(c=>c.r).sort((a,b)=>b-a);
  const flush = cs.every(c=>c.s===cs[0].s);
  const uniq=[...new Set(rs)];
  let straightHigh=0;
  if(uniq.length===5){
    if(uniq[0]-uniq[4]===4) straightHigh=uniq[0];
    else if(uniq[0]===14&&uniq[1]===5&&uniq[4]===2) straightHigh=5;
  }
  if(flush&&straightHigh) return [8,straightHigh];
  const counts={};
  for(const r of rs) counts[r]=(counts[r]||0)+1;
  const groups=Object.keys(counts).map(r=>[+r,counts[r]]).sort((a,b)=>b[1]-a[1]||b[0]-a[0]);
  if(groups[0][1]===4) return [7,groups[0][0],groups[1][0]];
  if(groups[0][1]===3&&groups[1][1]===2) return [6,groups[0][0],groups[1][0]];
  if(flush) return [5,...rs];
  if(straightHigh) return [4,straightHigh];
  if(groups[0][1]===3) return [3,groups[0][0],groups[1][0],groups[2][0]];
  if(groups[0][1]===2&&groups[1][1]===2) return [2,groups[0][0],groups[1][0],groups[2][0]];
  if(groups[0][1]===2) return [1,groups[0][0],groups[1][0],groups[2][0],groups[3][0]];
  return [0,...rs];
}
const COMBOS_7_5 = (()=>{ // all 5-card index combos out of 7
  const out=[];
  for(let a=0;a<3;a++)for(let b=a+1;b<4;b++)for(let c=b+1;c<5;c++)for(let d=c+1;d<6;d++)for(let e=d+1;e<7;e++)out.push([a,b,c,d,e]);
  return out;
})();
function cmpScore(x,y){
  const n=Math.max(x.length,y.length);
  for(let i=0;i<n;i++){const a=x[i]||0,b=y[i]||0; if(a!==b) return a-b;}
  return 0;
}
function evalSeven(cards){
  let best=null;
  for(const idx of COMBOS_7_5){
    const s=evalFive([cards[idx[0]],cards[idx[1]],cards[idx[2]],cards[idx[3]],cards[idx[4]]]);
    if(!best||cmpScore(s,best)>0) best=s;
  }
  return best;
}
/* best 5-card hand from ANY 5-7 cards (evalSeven requires exactly 7) */
function evalBest(cards){
  const n=cards.length;
  if(n===5) return evalFive(cards);
  if(n===7) return evalSeven(cards);
  let best=null;
  for(let a=0;a<n-4;a++)for(let b=a+1;b<n-3;b++)for(let c=b+1;c<n-2;c++)for(let d=c+1;d<n-1;d++)for(let e=d+1;e<n;e++){
    const s=evalFive([cards[a],cards[b],cards[c],cards[d],cards[e]]);
    if(!best||cmpScore(s,best)>0)best=s;
  }
  return best;
}
/* True when the named made-hand category is materially created or improved by
   at least one hole card. Board-only pairs/trips/straights are not credited as
   private made hands merely because a hole-card kicker plays. */
function handUsesHoleCards(hole,board,scoreArg){
  if(!hole||hole.length<2||!board||board.length<3)return false;
  const score=scoreArg||evalBest(hole.concat(board)),category=score[0];
  const hasRank=r=>hole.some(c=>c.r===r);
  if(category===0)return false;
  if(category===1)return hasRank(score[1]);
  if(category===2)return hasRank(score[1])||hasRank(score[2]);
  if(category===3)return hasRank(score[1]);
  if(category===6)return hasRank(score[1])||hasRank(score[2]);
  if(category===7)return hasRank(score[1]);
  if(board.length<5)return true; // a straight/flush on flop or turn must use a hole card
  return cmpScore(score,evalBest(board))>0;
}
function boardTwoPairKickerInfo(hole,board){
  if(!hole||!board||board.length!==5)return null;
  const boardScore=evalBest(board);
  if(!boardScore||boardScore[0]!==2)return null;
  const score=evalBest(hole.concat(board));
  if(!score||score[0]!==2)return null;
  if(score[1]!==boardScore[1]||score[2]!==boardScore[2])return null;
  if(score[3]<=boardScore[3])return null;
  return {kicker:score[3],boardKicker:boardScore[3],score,boardScore};
}
function handName(s){
  const nm=rankNm(s[1]),pl=rankPl(s[1]),pl2=rankPl(s[2]);
  const flushRanks=s.slice(1,6).map(r=>RANK_CH[r]).join('-');
  if(lang==='fr') switch(s[0]){
    case 8: return s[1]===14?'une Quinte Flush Royale':`une Quinte Flush, hauteur ${nm}`;
    case 7: return `un Carré de ${pl}`;
    case 6: return `un Full, ${pl} par les ${pl2}`;
    case 5: return `une Couleur, ${flushRanks}`;
    case 4: return `une Quinte, hauteur ${nm}`;
    case 3: return `un Brelan de ${pl}`;
    case 2: return `une Double Paire, ${pl} et ${pl2}`;
    case 1: return `une Paire de ${pl}`;
    default:return `Hauteur ${nm}`;
  }
  if(lang==='es') switch(s[0]){
    case 8: return s[1]===14?'Escalera Real':`Escalera de Color al ${nm}`;
    case 7: return `Póker de ${pl}`;
    case 6: return `Full de ${pl} y ${pl2}`;
    case 5: return `Color, ${flushRanks}`;
    case 4: return `Escalera al ${nm}`;
    case 3: return `Trío de ${pl}`;
    case 2: return `Doble Pareja, ${pl} y ${pl2}`;
    case 1: return `Pareja de ${pl}`;
    default:return `Carta Alta ${nm}`;
  }
  switch(s[0]){
    case 8: return s[1]===14?'a Royal Flush':`a Straight Flush, ${nm} high`;
    case 7: return `Four of a Kind, ${pl}`;
    case 6: return `a Full House, ${pl} over ${pl2}`;
    case 5: return `a Flush, ${flushRanks}`;
    case 4: return `a Straight, ${nm} high`;
    case 3: return `Three of a Kind, ${pl}`;
    case 2: return `Two Pair, ${pl} and ${pl2}`;
    case 1: return `a Pair of ${pl}`;
    default:return `High Card, ${nm}`;
  }
}

function seatOrderFromDealer(){
  const n=state.players.length, o=[];
  for(let k=1;k<=n;k++) o.push((state.dealerIdx+k)%n);
  return o;
}
