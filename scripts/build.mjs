#!/usr/bin/env node
/**
 * Modular build for Sit & Go Hold'em.
 * - Default (extract): split inline script from poker.html into js/*.js (first run / regen).
 * - bundle: concatenate js/*.js back into poker.html for true single-file deploy.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const HTML = path.join(ROOT, 'poker.html');
const JS_DIR = path.join(ROOT, 'js');

const BOOT = `"use strict";
const HAS_DOM = (typeof document !== 'undefined');
let lang = 'en';
`;

const TAIL = `
/* ---------- offline mode (PWA): cache the game so it runs with no internet ---------- */
if(HAS_DOM && 'serviceWorker' in navigator && /^https?:$/.test(location.protocol)){
  try{ navigator.serviceWorker.register('sw.js').catch(()=>{}); }catch(e){}
}

/* ---------- exports for node testing ---------- */
if(typeof module!=='undefined'&&module.exports){
  module.exports={
    makeDeck,shuffle,evalFive,evalSeven,cmpScore,handName,chen,mcEquity,
    newGame,startHand,getState:()=>state,
    setFast(){AI_DELAY_MIN=0;AI_DELAY_MAX=1;RUNOUT_DELAY=1;SHOWDOWN_PAUSE=2;FOLDWIN_PAUSE=2;}
  };
}
`;

/** 1-based inclusive line ranges from poker.html inline script */
const MODULE_RANGES = {
  'eval.js': [[1124, 1146], [1154, 1243], [1571, 1575]],
  'engine.js': [[690, 717], [1147, 1152], [1683, 2345]],
  'coach.js': [[889, 1122], [1288, 1497], [2682, 2729], [2731, 3165]],
  'ai.js': [[1245, 1286], [1499, 1570], [1577, 1681]],
  'mp.js': [[3626, 4201]],
  'ui.js': [[718, 888], [2347, 2680], [3172, 3624], [4203, 4474]],
};

const LOAD_ORDER = ['eval.js', 'engine.js', 'coach.js', 'ai.js', 'mp.js', 'ui.js'];

function readLines() {
  const html = fs.readFileSync(HTML, 'utf8');
  if (!html.includes('function evalFive(')) {
    try {
      return execSync('git show HEAD:poker.html', { cwd: ROOT, encoding: 'utf8' }).split('\n');
    } catch {
      throw new Error('poker.html is already split; restore monolithic source or use git history to re-extract');
    }
  }
  return html.split('\n');
}

function slice(lines, start, end) {
  return lines.slice(start - 1, end).join('\n');
}

function extractFromHtml() {
  const lines = readLines();
  fs.mkdirSync(JS_DIR, { recursive: true });
  for (const name of LOAD_ORDER) {
    const parts = (MODULE_RANGES[name] || []).map(([a, b]) => slice(lines, a, b));
    let body = parts.join('\n\n');
    if (name === 'ui.js') body = body.replace("let lang='en';\n", '');
    const src = name === 'eval.js' ? BOOT + body : body;
    fs.writeFileSync(path.join(JS_DIR, name), src.trim() + '\n');
    console.log('wrote js/' + name);
  }
}

function findScriptBlock(html) {
  const marker = '<script src="charts.js"></script>';
  const open = html.indexOf(marker);
  if (open < 0) throw new Error('charts.js script tag not found');
  const close = html.lastIndexOf('</script>');
  return { before: html.slice(0, open), after: html.slice(close + '</script>'.length) };
}

function scriptTags() {
  return LOAD_ORDER.map((f) => `  <script src="js/${f}"></script>`).join('\n');
}

function writeMultifileHtml() {
  const { before, after } = findScriptBlock(fs.readFileSync(HTML, 'utf8'));
  const mid =
    `<script src="charts.js"></script>\n` +
    scriptTags() +
    `\n<script>\n${TAIL.trim()}\n</script>`;
  fs.writeFileSync(HTML, before + mid + after);
  console.log('poker.html → multi-file (js/*.js + tail)');
}

function bundleSingleFile() {
  const parts = LOAD_ORDER.map((f) => fs.readFileSync(path.join(JS_DIR, f), 'utf8'));
  const inline = parts.join('\n\n') + '\n' + TAIL;
  let html = fs.readFileSync(HTML, 'utf8');
  const { before, after } = findScriptBlock(html);
  const marker = '<!-- bundled:single-file -->\n';
  const mid = marker + `<script src="charts.js"></script>\n<script>\n${inline.trim()}\n</script>`;
  fs.writeFileSync(HTML, before + mid + after);
  console.log('poker.html → single-file bundle');
}

const cmd = process.argv[2] || 'multifile';
if (cmd === 'extract') {
  extractFromHtml();
} else if (cmd === 'multifile') {
  if (!fs.existsSync(path.join(JS_DIR, 'eval.js'))) extractFromHtml();
  writeMultifileHtml();
} else if (cmd === 'bundle') {
  if (!fs.existsSync(path.join(JS_DIR, 'eval.js'))) extractFromHtml();
  bundleSingleFile();
} else {
  console.error('Usage: node scripts/build.mjs [extract|multifile|bundle]');
  process.exit(1);
}
