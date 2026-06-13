#!/usr/bin/env node
/** Regenerate charts.js: facing matrices, shove ladders, iso-over-limp ranges. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHARTS = path.join(ROOT, 'charts.js');

const src = fs.readFileSync(CHARTS, 'utf8');
const json = src.replace(/^[\s\S]*?var GTO_CHARTS=/, '').replace(/;\s*$/, '');
const G = JSON.parse(json);

const vsE = G.facing.vsEarly;
const vsL = G.facing.vsLate;
const POS = ['UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO', 'BTN', 'SB'];

function uniq(a) {
  const s = new Set();
  return a.filter((h) => (s.has(h) ? false : (s.add(h), true)));
}

function blendRaise(t) {
  if (t <= 0) return [...vsE.raise];
  if (t >= 1) return [...vsL.raise];
  const out = new Set(vsE.raise);
  for (const h of vsL.raise) if (t >= 0.35 || ['TT', 'AQs', 'AQo', 'A3s', 'KQs', '76s', '65s'].includes(h)) out.add(h);
  if (t >= 0.5) for (const h of vsL.raise) if (!vsE.raise.includes(h)) out.add(h);
  if (t >= 0.75) for (const h of vsL.raise) out.add(h);
  return [...out];
}

function blendCall(t) {
  if (t <= 0) return [...vsE.call];
  if (t >= 1) return [...vsL.call];
  const out = new Set(vsE.call);
  const mid = ['44', '33', '22', 'KTs', 'QTs', 'A9s', 'AJo', 'KQo', '76s', '65s', 'QJo'];
  for (const h of mid) if (t >= 0.2) out.add(h);
  for (const h of vsL.call) if (t >= 0.45) out.add(h);
  if (t >= 0.7) for (const h of vsL.call) out.add(h);
  return [...out];
}

const facingPos = {};
POS.forEach((pos, i) => {
  const t = i / (POS.length - 1);
  facingPos[pos] = { raise: blendRaise(t), call: blendCall(t) };
});
facingPos.BTN = { raise: [...vsL.raise], call: [...vsL.call] };
facingPos.SB = {
  raise: uniq([...vsL.raise, 'AJs', 'KJs', 'QJs', '88']),
  call: uniq([...vsL.call, 'A8s', 'K9s', 'T8s', 'KTo', 'QTo', 'JTo', 'A9o', 'KJo']),
};

const SHOVE_POS = ['EP', 'MP', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

function shoveTighten(from, drop) {
  const d = new Set(drop);
  return from.filter((h) => !d.has(h));
}

const s5 = G.shove['5'];
const s10 = G.shove['10'];
const shove8 = {};
const shove12 = {};
const shove15 = {};
const shove20 = {};
const marginal15 = {
  EP: ['AJo', 'ATo', 'KJs', 'QJs'],
  MP: ['A9o', 'KQo', 'KJo', 'T9s'],
  HJ: ['A8o', 'A7o', 'KTo', 'Q9o'],
  CO: ['A6o', 'A5o', 'J9o', 'T9o'],
  BTN: ['A4o', 'A3o', '98o', '87o', 'K9o'],
  SB: ['A3o', 'A2o', '98o', '87o', 'K8o', 'Q9o'],
  BB: ['A3o', 'A2o', '98o', '87o', 'K8o', 'Q9o'],
};
const marginal20 = {
  EP: ['AJo', 'ATo', 'KJs', 'QJs', 'KQo', 'TT'],
  MP: ['A9o', 'KQo', 'KJo', 'T9s', 'AJo', '99'],
  HJ: ['A8o', 'A7o', 'KTo', 'Q9o', 'A9o', '88'],
  CO: ['A6o', 'A5o', 'J9o', 'T9o', 'A8o', '77'],
  BTN: ['A4o', 'A3o', '98o', '87o', 'K9o', 'A6o', '66'],
  SB: ['A3o', 'A2o', '98o', '87o', 'K8o', 'Q9o', 'A5o'],
  BB: ['A3o', 'A2o', '98o', '87o', 'K8o', 'Q9o', 'A5o'],
};

for (const p of SHOVE_POS) {
  const a = s5[p] || [];
  const b = s10[p] || [];
  const only5 = a.filter((h) => !b.includes(h));
  shove8[p] = uniq([...b, ...only5.slice(0, Math.ceil(only5.length * 0.45))]);
  shove15[p] = shoveTighten(b, marginal15[p] || []);
  const only10not15 = b.filter((h) => !shove15[p].includes(h));
  shove12[p] = uniq([...shove15[p], ...only10not15.slice(0, Math.ceil(only10not15.length * 0.4))]);
  shove20[p] = shoveTighten(b, marginal20[p] || []);
}

/* iso-raise over limpers: RFI + position-specific wideners */
const ISO_EXTRA = {
  UTG: ['55', 'A8s', 'KJo'],
  'UTG+1': ['44', 'A8s', 'KJo', 'QJo'],
  MP: ['33', 'A9o', 'JTs', '98o'],
  'MP+1': ['22', 'A9o', 'T9o', '87o', 'KTo'],
  HJ: ['A8o', 'KTo', 'QTo', '76o', '65o', 'J9o'],
  CO: ['A5o', 'K8o', 'J9o', 'T8o', '97o', '86o', '54o', '76o'],
  BTN: ['65o', '54o', '43o', '32o', 'K7o', 'Q8o', 'J7o', 'T7o', '96o', '85o', '75o', '64o', '53o'],
  SB: ['A2o', 'K7o', 'Q8o', 'J8o', 'T8o', '87o', '76o', '65o', '54o', '43o'],
};
const iso = {};
for (const pos of POS) {
  iso[pos] = uniq([...(G.rfi[pos] || []), ...(ISO_EXTRA[pos] || [])]);
}

/* BB defense vs steals — wider call ranges than facing; 3-bet value + blockers */
const BB_CALL_CO = uniq([
  ...vsE.call,
  '22', '33', '44', '55', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'K9s', 'K8s', 'Q9s', 'J9s', 'T9s', '98s', '87s', '76s',
  'A9o', 'A8o', 'KJo', 'QJo', 'JTo', 'T9o',
]);
const BB_CALL_BTN = uniq([
  ...vsL.call,
  '22', '33', '44', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'K9s', 'K8s', 'K7s', 'Q9s', 'Q8s', 'J9s', 'J8s', 'T9s', 'T8s', '98s', '97s', '87s', '76s', '65s', '54s',
  'A9o', 'A8o', 'A7o', 'KTo', 'QTo', 'JTo', 'T9o', '98o',
]);
const BB_CALL_SB = uniq([
  ...vsL.call,
  '22', '33', '44', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'K9s', 'K8s', 'K7s', 'K6s', 'Q9s', 'Q8s', 'J9s', 'J8s', 'T9s', 'T8s', 'T7s', '98s', '97s', '87s', '76s', '65s', '54s', '43s',
  'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'KTo', 'K9o', 'QTo', 'JTo', 'T9o', '98o', '87o',
]);
const BB_3B_CO = uniq([...vsE.raise, 'A5s', 'A4s', 'KQs', 'KJs', 'AQo']);
const BB_3B_BTN = uniq([...vsL.raise, 'A5s', 'A4s', 'A3s', 'K9s', 'KJs', 'QJs', 'AQo', 'KQo']);
const BB_3B_SB = uniq([...vsL.raise, 'A5s', 'A4s', 'A3s', 'A2s', 'K9s', 'K8s', 'Q9s', 'KJs', 'QJs', 'JTs', 'AQo', 'AJo']);
const bbDefend = {
  vsCO: { raise: BB_3B_CO, call: BB_CALL_CO },
  vsBTN: { raise: BB_3B_BTN, call: BB_CALL_BTN },
  vsSB: { raise: BB_3B_SB, call: BB_CALL_SB },
};

G._source =
  'Approximations of published 9-max solver/Nash ranges. rfi = raise-first-in; iso = isolate limpers; bbDefend = BB 3-bet/call vs steals; shove = all-in by BB depth; facing = 3-bet/call vs a raise.';
G.facing = { ...facingPos, vsEarly: vsE, vsLate: vsL };
G.iso = iso;
G.bbDefend = bbDefend;
G.shove = { ...G.shove, 8: shove8, 12: shove12, 15: shove15, 20: shove20 };

const out =
  '/* GTO preflop range charts — external data file. Loaded via <script src>; the game falls back\n' +
  '   to its percentile engine if this file is missing. Edit freely: hand codes like AA, AKs, T9o. */\n' +
  'var GTO_CHARTS=' +
  JSON.stringify(G) +
  ';\n';
fs.writeFileSync(CHARTS, out);
console.log(
  'charts.js:',
  Object.keys(iso).length,
  'iso positions,',
  Object.keys(bbDefend).length,
  'BB defend, shove depths',
  Object.keys(G.shove).sort((a, b) => +a - +b).join(','),
);
