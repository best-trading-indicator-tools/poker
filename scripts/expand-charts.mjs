#!/usr/bin/env node
/** Regenerate charts.js with per-position facing + 8/15 BB shove ladders. */
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
  facingPos[pos] = {
    raise: blendRaise(t),
    call: blendCall(t),
  };
});
facingPos.BTN = { raise: [...vsL.raise], call: [...vsL.call] };
facingPos.SB = {
  raise: uniq([...vsL.raise, 'AJs', 'KJs', 'QJs', '88']),
  call: uniq([...vsL.call, 'A8s', 'K9s', 'T8s', 'KTo', 'QTo', 'JTo', 'A9o', 'KJo']),
};

const SHOVE_POS = ['EP', 'MP', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

function shoveBetween(lo, hi, ratio) {
  const onlyLo = hi.filter((h) => !lo.includes(h));
  const pick = Math.ceil(onlyLo.length * ratio);
  return uniq([...lo, ...onlyLo.slice(0, pick)]);
}

function shoveTighten(from, drop) {
  const d = new Set(drop);
  return from.filter((h) => !d.has(h));
}

const s5 = G.shove['5'];
const s10 = G.shove['10'];
const shove8 = {};
const shove15 = {};
for (const p of SHOVE_POS) {
  const a = s5[p] || [];
  const b = s10[p] || [];
  const only5 = a.filter((h) => !b.includes(h));
  const pick = Math.ceil(only5.length * 0.45);
  shove8[p] = uniq([...b, ...only5.slice(0, pick)]);
  const marginal = {
    EP: ['AJo', 'ATo', 'KJs', 'QJs'],
    MP: ['A9o', 'KQo', 'KJo', 'T9s'],
    HJ: ['A8o', 'A7o', 'KTo', 'Q9o'],
    CO: ['A6o', 'A5o', 'J9o', 'T9o'],
    BTN: ['A4o', 'A3o', '98o', '87o', 'K9o'],
    SB: ['A3o', 'A2o', '98o', '87o', 'K8o', 'Q9o'],
    BB: ['A3o', 'A2o', '98o', '87o', 'K8o', 'Q9o'],
  };
  shove15[p] = shoveTighten(b, marginal[p] || []);
}

G._source +=
  ' facing now includes per-raiser-position matrices (UTG→SB) with vsEarly/vsLate kept as fallback. shove adds 8 BB and 15 BB depth ladders.';
G.facing = { ...facingPos, vsEarly: vsE, vsLate: vsL };
G.shove = { ...G.shove, 8: shove8, 15: shove15 };

const out =
  '/* GTO preflop range charts — external data file. Loaded via <script src>; the game falls back\n' +
  '   to its percentile engine if this file is missing. Edit freely: hand codes like AA, AKs, T9o. */\n' +
  'var GTO_CHARTS=' +
  JSON.stringify(G) +
  ';\n';
fs.writeFileSync(CHARTS, out);
console.log('charts.js expanded:', Object.keys(facingPos).length, 'facing positions, shove depths', Object.keys(G.shove).join(','));
