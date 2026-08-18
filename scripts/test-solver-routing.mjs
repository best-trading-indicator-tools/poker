#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({ console, assert, Float32Array, Math, Number, Object, Array, Set });
for (const file of ['charts.js', 'js/preflop-blueprint.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
}

const result = vm.runInContext(`(() => {
  const makePlayers = positions => positions.map((pos, i) => ({
    i, pos, out: false, sittingOut: false, chips: i === 0 ? 9950 : 9900,
    totalBet: i === 0 ? 50 : 100,
  }));
  const begin = positions => {
    const players = makePlayers(positions);
    state = { cfg: { gameType: 'cash' }, stage: 'preflop', ante: 0, bb: 100, handNum: 1, players };
    gtoPreflopBeginHand();
    return players;
  };
  const observe = (player, action, raises, extra = {}) => gtoPreflopObserveAction(player, action, {
    preflopRaisesBefore: raises, callAmt: 0, isAllIn: false, ...extra,
  });
  const nonzero = range => Array.from(range).filter(weight => weight > 0).length;

  let players = begin(['SB/BTN', 'BB']);
  observe(players[0], 'raise', 0, { targetBB: 2.5 });
  observe(players[1], 'call', 1, { callAmt: 150 });
  const singleRaised = gtoPreflopRangesFor([players[1], players[0]]);
  assert.equal(singleRaised.ok, true, JSON.stringify({ singleRaised, tracker: state.gtoPreflop }));
  assert.equal(singleRaised.line, 'single-raised');
  assert.ok(singleRaised.nodes.flat().some(node => node.startsWith('RFI:')));
  assert.ok(singleRaised.nodes.flat().some(node => node.startsWith('BB:')));

  players = begin(['SB/BTN', 'BB']);
  observe(players[0], 'raise', 0, { targetBB: 2.5 });
  observe(players[1], 'raise', 1, { targetBB: 9 });
  observe(players[0], 'call', 2, { callAmt: 650 });
  const threeBet = gtoPreflopRangesFor([players[1], players[0]]);
  assert.equal(threeBet.ok, true);
  assert.equal(threeBet.line, 'three-bet');
  assert.match(threeBet.source, /three-bet$/);
  assert.ok(threeBet.nodes.flat().some(node => node.startsWith('vs3bet:')));
  assert.ok(threeBet.nodes.flat().some(node => node.endsWith(':raise')));

  players = begin(['SB/BTN', 'BB']);
  observe(players[0], 'call', 0, { callAmt: 50 });
  observe(players[1], 'call', 0, { callAmt: 0 });
  const limped = gtoPreflopRangesFor([players[1], players[0]]);
  assert.equal(limped.ok, false);
  assert.equal(limped.reason, 'preflop-limp-uncovered');

  players = begin(['SB/BTN', 'BB']);
  observe(players[0], 'raise', 0, { targetBB: 2.5 });
  observe(players[1], 'raise', 1, { targetBB: 9 });
  observe(players[0], 'raise', 2, { targetBB: 22 });
  const fourBet = gtoPreflopRangesFor([players[1], players[0]]);
  assert.equal(fourBet.ok, false);
  assert.equal(fourBet.reason, 'preflop-fourbet-uncovered');

  players = begin(['BTN', 'SB', 'BB']);
  observe(players[1], 'call', 0, { callAmt: 50 });
  const multiwayLimp = gtoPreflopRangesFor([players[2], players[1]]);
  assert.equal(multiwayLimp.ok, false);
  assert.equal(multiwayLimp.reason, 'preflop-limp-uncovered');

  players = begin(['SB/BTN', 'BB']);
  observe(players[0], 'raise', 0, { targetBB: 100, isAllIn: true });
  const allIn = gtoPreflopRangesFor([players[1], players[0]]);
  assert.equal(allIn.ok, false);
  assert.equal(allIn.reason, 'preflop-allin-uncovered');

  return {
    singleRaised: singleRaised.nodes,
    threeBet: { nodes: threeBet.nodes, combos: threeBet.ranges.map(nonzero) },
    guardedFallbacks: {
      headsUpLimp: limped.reason,
      fourBet: fourBet.reason,
      multiwayLimp: multiwayLimp.reason,
      allIn: allIn.reason,
    },
  };
})()`, context);

console.log(JSON.stringify(result, null, 2));
