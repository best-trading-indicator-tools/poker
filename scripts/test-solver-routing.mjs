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

const browserContext = vm.createContext({
  console, assert, Float32Array, Float64Array, Uint8Array, Uint16Array, Uint32Array, ArrayBuffer,
  Math, Number, Object, Array, Set, Map, Promise, Date, BigInt, URL, WebAssembly,
  setTimeout, clearTimeout, window: { dispatchEvent() {} }, document: { getElementById() { return null; } },
  Worker: function Worker() {}, location: { protocol: 'https:' },
});
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/solver.js'), 'utf8'), browserContext, { filename: 'js/solver.js' });
const runtimeRouting = vm.runInContext(`(() => {
  const player = { i: 0, folded: false, out: false, allIn: false };
  const opponent = { i: 1, folded: false, out: false, allIn: false };
  state = {
    cfg: { gameType: 'cash' }, stage: 'flop', players: [player, opponent],
    solverStreet: {
      stage: 'flop', supported: true, playerSeats: [0, 1], rangeSource: 'test',
      rangeRaw: [new Float32Array(1326), new Float32Array(1326)], actions: [],
    },
  };
  const withoutStaticComlink = solverSupport(player, {});
  const preflop = (() => { state.stage = 'preflop'; return solverSupport(player, {}); })();
  return {
    withoutStaticComlink: withoutStaticComlink.ok,
    preflop: preflop.reason,
    missingWorker: solverRuntimeUnavailableReason({ browser: true, worker: false, webAssembly: true, protocol: 'https:' }),
    localFile: solverRuntimeUnavailableReason({ browser: true, worker: true, webAssembly: true, protocol: 'file:' }),
  };
})()`, browserContext);
assert.equal(runtimeRouting.withoutStaticComlink, true, 'a missing static Comlink global must be recoverable by the dynamic loader');
assert.equal(runtimeRouting.preflop, 'preflop', 'preflop must report its chart provider before browser capability checks');
assert.equal(runtimeRouting.missingWorker, null, 'single-thread direct WASM must cover browsers without Worker');
assert.equal(runtimeRouting.localFile, 'protocol');

const reliability = await vm.runInContext(`(async () => {
  const roundedAction = solverMatchAction([{ type: 'bet', amount: 101 }], { action: 'bet', target: 100 });
  const wrongAction = solverMatchAction([{ type: 'bet', amount: 103 }], { action: 'bet', target: 100 });
  assert.equal(roundedAction.amount, 101, 'one-chip upstream sizing roundoff must replay');
  assert.equal(wrongAction, null, 'materially different sizes must remain off-tree');

  const range = new Float32Array(1326); range[0] = 1;
  const street = {
    stage: 'flop', board: [{ r: 2, s: 0 }, { r: 7, s: 1 }, { r: 11, s: 2 }],
    startingPot: 100, effectiveStack: 900, playerSeats: [0, 1],
    rangeRaw: [range, range], rangeNodes: [[], []], actions: [],
  };
  let iterations = 0, initCalls = 0, allocated = false;
  solverTreeConfig = (_street, compact) => ({ compact: Boolean(compact) });
  solverInitTree = async () => {
    initCalls++;
    return {
      memoryBytes: GTO_MEMORY_LIMIT + 1,
      handler: {
        allocateMemory() { allocated = true; },
        exploitability() { return iterations > 1010 ? 0 : 10; },
        iterate() { iterations++; }, finalize() {},
      },
    };
  };
  const solved = await solverSolveBase(street);
  assert.ok(iterations > 1000, 'solver must continue beyond the old iteration ceiling');
  assert.equal(initCalls, 2, 'an oversized full tree must retry compact');
  assert.equal(allocated, true, 'the compact exact tree must be allocated instead of rejected');
  assert.equal(solved.converged, true);

  let attempts = 0;
  state.solverStreet = street;
  solverEnsureBase = async () => {
    attempts++;
    if (attempts < 3) throw new Error('transient-test-failure');
    return solved;
  };
  solverTerminate = () => {};
  solverRetryPause = async () => {};
  const recovered = await solverEnsureBaseReliable(street);
  assert.equal(recovered, solved);
  assert.equal(attempts, 3, 'transient exact-solver failures must retry until recovery');

  assert.equal(solverTerminalNodeFailureReason(new Error('solver-player-mismatch')), 'line');
  assert.equal(solverTerminalNodeFailureReason(new Error('solver-empty-reach')), 'ranges');
  assert.equal(solverTerminalNodeFailureReason(new Error('transient-test-failure')), null,
    'transient failures must remain eligible for automatic retry');

  const savedEnsureBaseReliable = solverEnsureBaseReliable;
  const savedQueueNode = solverQueueNode;
  const requestPlayer = state.players[0];
  let terminalNodeAttempts = 0;
  state.stage = 'flop';
  street.supported = true;
  street.rangeSource = 'test-gto';
  state.solverStreet = street;
  solverEnsureBaseReliable = async () => solved;
  solverQueueNode = async () => {
    terminalNodeAttempts++;
    throw new Error('solver-player-mismatch');
  };
  try {
    const terminalResult = await solverRequestCoachStrategy(requestPlayer, {});
    assert.equal(terminalResult, false);
    assert.equal(terminalNodeAttempts, 1,
      'a deterministic node mapping failure must stop after one extraction attempt');
    assert.equal(gtoRuntime.phase, 'unavailable');
    assert.equal(gtoRuntime.error, 'solver-player-mismatch');
    assert.equal(gtoRuntime.retryAttempt, 0,
      'a deterministic node failure must not enter the retry loop');
  } finally {
    solverEnsureBaseReliable = savedEnsureBaseReliable;
    solverQueueNode = savedQueueNode;
  }

  const sparseRaw = new Float32Array(1326);
  sparseRaw[7] = 1;
  sparseRaw[901] = Math.fround(1e-12);
  const sparsePacked = solverPackReachRange(sparseRaw);
  const sparseRoundTrip = solverUnpackReachRange(JSON.parse(JSON.stringify(sparsePacked)));
  assert.equal(sparsePacked.f, 's');
  assert.equal(sparseRoundTrip[7], sparseRaw[7]);
  assert.equal(sparseRoundTrip[901], sparseRaw[901], 'tiny positive reach must survive cache packing');
  const denseRaw = new Float32Array(1326);
  for (let index = 0; index < denseRaw.length; index++) denseRaw[index] = Math.fround((index + 1) / 1326);
  const densePacked = solverPackReachRange(denseRaw);
  const denseRoundTrip = solverUnpackReachRange(densePacked);
  assert.equal(densePacked.f, 'd');
  assert.deepEqual(Array.from(denseRoundTrip), Array.from(denseRaw));
  assert.equal(solverUnpackReachRange({ ...densePacked, b: densePacked.b.slice(4) }), null,
    'truncated reach payload must be rejected');
  const malformedSparse = solverPackReachRange(sparseRaw);
  malformedSparse.b = malformedSparse.b.slice(0, 8) + '!!!!' + malformedSparse.b.slice(12);
  assert.equal(solverUnpackReachRange(malformedSparse), null, 'invalid base64 reach payload must be rejected');

  const C = (r, s) => ({ r, s });
  assert.equal(solverCardId(C(2, 3)), 0, 'solver ids must be clubs-first within each rank');
  assert.equal(solverCardId(C(2, 0)), 3, 'app spades must map to the solver spade id');
  assert.equal(solverCardId(C(14, 3)), 48);
  assert.equal(solverCardId(C(14, 0)), 51);
  assert.equal(solverPairIndex(44, 48), 1301, 'solver pair indexing contract changed');
  const encode = hole => {
    const ids = hole.map(solverCardId).sort((a, b) => a - b);
    return ids[0] | (ids[1] << 8);
  };
  const oopHoles = [[C(14, 0), C(13, 0)], [C(14, 1), C(12, 1)]];
  const ipHoles = [[C(14, 3), C(13, 3)], [C(14, 2), C(10, 2)]];
  const privateBySeat = [new Uint16Array(oopHoles.map(encode)), new Uint16Array(ipHoles.map(encode))];
  const nodeValues = new Float64Array([
    0, 0, 0,
    .25, 1, 1, .5,
    1, 1, 1, 1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1,
    0, 0,
  ]);
  const nodeStreet = {
    ...street, playerSeats: [0, 1], rangeSource: 'test-gto', rangeLine: 'test',
    rangeNodes: [[], []], actionHistory: [], actions: [],
  };
  const nodePlayer = { i: 0, hole: oopHoles[0], bet: 0, chips: 900, acted: false };
  const node = await solverExtractNode({
    handler: {
      async applyHistory() {}, async currentPlayer() { return 'oop'; }, async actionsAfter() { return 'check'; },
      async privateCards(seat) { return privateBySeat[seat]; }, async numActions() { return 1; },
      async getResults() { return nodeValues; },
    },
    exploitability: .1, targetExploitability: .3, converged: true, iterations: 20, compact: false, config: {},
  }, nodePlayer, nodeStreet);
  const persistedNode = JSON.parse(JSON.stringify(node));
  const nodeRanges = solverResultReachRanges(persistedNode);
  const at = hole => solverPairIndex(...hole.map(solverCardId));
  assert.equal(nodeRanges[0][at(oopHoles[0])], .25);
  assert.equal(nodeRanges[0][at(oopHoles[1])], 1);
  assert.equal(nodeRanges[1][at(ipHoles[0])], 1);
  assert.equal(nodeRanges[1][at(ipHoles[1])], .5);
  assert.equal(node.reachSeats.join(','), '0,1');
  assert.equal(node.reachSource, 'solver-equilibrium-node');
  assert.equal(solverCachedResultValid(persistedNode, nodeStreet, nodePlayer), true);
  assert.equal(solverCachedResultValid({ ...persistedNode, branches: null }, nodeStreet, nodePlayer), false,
    'a cache entry with reaches but no strategy must be rejected');
  assert.equal(solverCachedResultValid({ ...persistedNode, reachSeats: [1, 0] }, nodeStreet, nodePlayer), false,
    'cached reach seats must match the current solver street order');
  return {
    iterations, initCalls, recoveryAttempts: attempts,
    terminalNodeAttempts,
    reachPacking: { sparse: sparsePacked.b.length, dense: densePacked.b.length },
    extractedReachSeats: node.reachSeats,
  };
})()`, browserContext);

console.log(JSON.stringify({ ...result, runtimeRouting, reliability }, null, 2));
