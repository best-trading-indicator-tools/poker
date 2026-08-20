#!/usr/bin/env node
import assert from 'node:assert/strict';
import { createHash, webcrypto } from 'node:crypto';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../js/preflop-policy-pack.js', import.meta.url), 'utf8');

function loadApi(withWebCrypto = true, trustedManifestSha256 = []) {
  const trustDeclaration = 'const GTO_PREFLOP_PACK_AUDITED_MANIFEST_SHA256 = Object.freeze([]);';
  const injectedTrust = `const GTO_PREFLOP_PACK_AUDITED_MANIFEST_SHA256 = Object.freeze(${JSON.stringify(trustedManifestSha256)});`;
  const runtimeSource = trustedManifestSha256.length
    ? source.replace(trustDeclaration, injectedTrust) : source;
  if (trustedManifestSha256.length) assert.notEqual(runtimeSource, source, 'test trust injection marker drifted');
  const context = vm.createContext({ console, TextEncoder, ...(withWebCrypto ? { crypto: webcrypto } : {}) });
  context.globalThis = context;
  vm.runInContext(runtimeSource, context, { filename: 'js/preflop-policy-pack.js' });
  return { api: context.PREFLOP_POLICY_PACK_API, context };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

let { api, context } = loadApi();

const game = {
  variant: 'NLHE',
  objective: 'chipEV',
  activePlayers: 2,
  seatOrder: ['SB/BTN', 'BB'],
  blindsMilliBB: { sb: 500, bb: 1000 },
  anteMilliBB: 0,
  initialStacksMilliBB: [100000, 100000],
  rake: { kind: 'none' },
  straddle: false,
};

async function makePack(overrides = {}) {
  const foldRoot = new Array(169).fill(0.25);
  foldRoot[api.classIndex('AA')] = 0.10;
  foldRoot[api.classIndex('AKs')] = 0.20;
  foldRoot[api.classIndex('AKo')] = 0.30;
  const callRoot = new Array(169).fill(0.10);
  const raiseRoot = foldRoot.map(value => 0.90 - value);
  const payload = {
    nodes: [
      {
        nodeId: 'root',
        parentNodeId: null,
        actorSeat: 0,
        historyKey: '',
        actions: [
          { actionId: 'fold', type: 'fold', terminal: true, frequencies: foldRoot },
          {
            actionId: 'call',
            type: 'call',
            childNodeId: 'bb-vs-limp',
            frequencies: callRoot,
          },
          {
            actionId: 'open-2500',
            type: 'raise',
            raiseToMilliBB: 2500,
            childNodeId: 'bb-vs-open',
            frequencies: raiseRoot,
          },
        ],
      },
      {
        nodeId: 'bb-vs-open',
        parentNodeId: 'root',
        actorSeat: 1,
        historyKey: 'open-2500',
        actions: [
          { actionId: 'fold', type: 'fold', terminal: true, frequencies: new Array(169).fill(0.4) },
          { actionId: 'call', type: 'call', terminal: true, frequencies: new Array(169).fill(0.6) },
        ],
      },
      {
        nodeId: 'bb-vs-limp',
        parentNodeId: 'root',
        actorSeat: 1,
        historyKey: 'call',
        actions: [
          { actionId: 'check', type: 'check', terminal: true, frequencies: new Array(169).fill(1) },
        ],
      },
    ],
  };
  const pack = {
    schema: api.schema,
    schemaVersion: api.schemaVersion,
    packId: 'synthetic-hu-100bb-v1',
    payloadSha256: await api.sha256(payload),
    manifestSha256: '0'.repeat(64),
    game: clone(game),
    cards: {
      comboCount: 1326,
      cardOrder: api.cardOrder,
      storage: 'class169-json-v1',
      classOrder: api.classOrder,
      expansion: api.expansion,
    },
    tree: {
      treeId: 'synthetic-tree-v1',
      rootNodeId: 'root',
      sizingUnit: 'milliBB',
      configSha256: '1'.repeat(64),
    },
    solve: {
      engine: 'synthetic-test-engine',
      repository: 'local:test-only',
      commit: 'a'.repeat(40),
      iterations: 100000,
      traversals: 1000000,
      seed: 7,
      productionReady: true,
      verificationStatus: 'verified_abstract_game',
      nashConvMbbPerHand: 4,
      nashConvMethod: 'exact-frozen-average-best-response',
      nashConvCi95UpperMbbPerHand: 5,
      averageExternalRegretMbbPerHand: 2,
      maxDeviationGainMbbPerHand: null,
      deviationGainCi95UpperMbbPerHand: null,
      independentSeeds: 3,
      seedStrategyL1Max: 0.01,
      expectedDecisionNodes: 3,
      exportedDecisionNodes: 3,
      validationReportSha256: '2'.repeat(64),
      continuationModel: 'synthetic full-hand abstract game; test fixture only',
      continuationModelSha256: '3'.repeat(64),
    },
    provenance: {
      sourceType: 'self-generated',
      generatedAt: '2026-08-20T00:00:00.000Z',
      licenseSpdx: 'AGPL-3.0-or-later',
      redistributionGranted: true,
      rawArtifactSha256: '4'.repeat(64),
    },
    payload,
  };
  Object.assign(pack, overrides.top || {});
  if (overrides.game) Object.assign(pack.game, overrides.game);
  if (overrides.tree) Object.assign(pack.tree, overrides.tree);
  if (overrides.solve) Object.assign(pack.solve, overrides.solve);
  if (overrides.provenance) Object.assign(pack.provenance, overrides.provenance);
  if (overrides.payload) pack.payload = overrides.payload;
  if (overrides.rehash) pack.payloadSha256 = await api.sha256(pack.payload);
  pack.manifestSha256 = await api.manifestSha256(pack);
  return pack;
}

// Locked parity with b-inary's rank-major, clubs-first card IDs and triangular
// private-card indexing. These constants catch either suit or row-order drift.
assert.equal(api.cardId({ r: 2, s: 3 }), 0, '2c card id');
assert.equal(api.cardId({ r: 2, s: 0 }), 3, '2s card id');
assert.equal(api.cardId({ r: 14, s: 3 }), 48, 'Ac card id');
assert.equal(api.cardId({ r: 14, s: 0 }), 51, 'As card id');
assert.equal(api.comboIndex(44, 48), 1301, 'Kc/Ac pair index');
assert.equal(api.comboClass(1301), 'AKs');
assert.equal(api.classCodes.length, 169);
assert.equal(new Set(api.classCodes).size, 169);

const classCounts = {};
for (let index = 0; index < 1326; index++) {
  const code = api.comboClass(index);
  classCounts[code] = (classCounts[code] || 0) + 1;
}
assert.equal(Object.keys(classCounts).length, 169);
assert.equal(classCounts.AA, 6);
assert.equal(classCounts.AKs, 4);
assert.equal(classCounts.AKo, 12);

const classVector = new Array(169).fill(0);
classVector[api.classIndex('AA')] = 0.1;
classVector[api.classIndex('AKs')] = 0.2;
classVector[api.classIndex('AKo')] = 0.3;
const expanded = api.expand169(classVector);
assert.equal(expanded.length, 1326);
assert.equal(Array.from(expanded).filter(value => Math.abs(value - Math.fround(0.1)) < 1e-8).length, 6);
assert.equal(Array.from(expanded).filter(value => Math.abs(value - Math.fround(0.2)) < 1e-8).length, 4);
assert.equal(Array.from(expanded).filter(value => Math.abs(value - Math.fround(0.3)) < 1e-8).length, 12);

const canonicalHash = createHash('sha256').update('{"abc":1}').digest('hex');
assert.equal(await api.sha256({ abc: 1 }), canonicalHash, 'WebCrypto hash parity');
const fallback = loadApi(false).api;
assert.equal(await fallback.sha256({ abc: 1 }), canonicalHash, 'pure-JS hash parity');
const loneSurrogate = { externalMetadata: '\ud800' };
assert.equal(await fallback.sha256(loneSurrogate), await api.sha256(loneSurrogate),
  'WebCrypto and fallback must agree for unmatched UTF-16 surrogates');

const pack = await makePack();
assert.deepEqual(Array.from(api.trust.auditedManifestSha256), [], 'shipping trust list must default empty');
assert.equal((await api.prepare(pack, { game, treeId: pack.tree.treeId })).reason,
  'gto-unavailable:untrusted-production-pack');
({ api, context } = loadApi(true, [pack.manifestSha256]));
const prepared = await api.prepare(pack, { game, treeId: pack.tree.treeId });
assert.equal(prepared.ok, true, prepared.reason);
assert.equal(prepared.pack.rootNodeId, 'root');
assert.equal(prepared.pack.nodeCount, 3);
assert.equal(Object.isFrozen(prepared.pack), true);

Object.defineProperty(context, 'GTO_CHARTS', { get() { throw new Error('pack API touched chart fallback'); } });
Object.defineProperty(context, 'rangeModel', { get() { throw new Error('pack API touched Bayesian fallback'); } });

const aaCombo = api.comboIndex('Ac', 'Ad');
const aksCombo = api.comboIndex('Ac', 'Kc');
const akoCombo = api.comboIndex('Ac', 'Kd');
const aaPolicy = api.policy(prepared.pack, 'root', aaCombo);
assert.equal(aaPolicy.ok, true);
assert.equal(aaPolicy.strategyProvider, 'preflop-equilibrium-policy-pack');
assert.equal(aaPolicy.strategyMode, 'equilibrium-baseline');
assert.equal(aaPolicy.rangeExactFrequencies, true);
assert.ok(Math.abs(aaPolicy.comboMix[0].probability - Math.fround(0.1)) < 1e-8);
assert.ok(Math.abs(api.policy(prepared.pack, 'root', aksCombo).comboMix[0].probability - Math.fround(0.2)) < 1e-8);
assert.ok(Math.abs(api.policy(prepared.pack, 'root', akoCombo).comboMix[0].probability - Math.fround(0.3)) < 1e-8);
assert.equal(aaPolicy.actions[0].frequencies.length, 1326);

aaPolicy.actions[0].frequencies[aaCombo] = 0.99;
assert.ok(Math.abs(api.policy(prepared.pack, 'root', aaCombo).comboMix[0].probability - Math.fround(0.1)) < 1e-8,
  'queries must not expose mutable validated strategy storage');

assert.equal(JSON.stringify(api.nextNode(prepared.pack, 'root', { type: 'raise', raiseToMilliBB: 2500 })), JSON.stringify({
  ok: true,
  terminal: false,
  nodeId: 'bb-vs-open',
  action: { actionId: 'open-2500', type: 'raise', raiseToMilliBB: 2500 },
}));
assert.equal(api.nextNode(prepared.pack, 'root', { type: 'raise', raiseToMilliBB: 2499 }).reason,
  'gto-unavailable:off-tree-action');
assert.equal(api.nextNode(prepared.pack, 'root', 'fold').terminal, true);
assert.equal(api.policy(prepared.pack, 'missing').reason, 'gto-unavailable:node-not-found');
assert.equal(api.policy(prepared.pack, 'root', 1326).reason, 'gto-unavailable:combo-index');

const registered = await api.register(pack, { game, treeId: pack.tree.treeId });
assert.equal(registered.ok, true, registered.reason);
assert.equal(api.forScenario({ game, treeId: pack.tree.treeId }).pack, registered.pack);
assert.equal(api.forScenario({ game }).pack, registered.pack, 'omitted tree is allowed when uniquely matched');

const wrongStack = clone(game);
wrongStack.initialStacksMilliBB[0] = 99999;
assert.equal((await api.prepare(pack, { game: wrongStack, treeId: pack.tree.treeId })).reason,
  'gto-unavailable:config-mismatch');
const wrongRake = clone(game);
wrongRake.rake = { kind: 'percentage', basisPoints: 500, capMilliBB: 4000, noFlopNoDrop: true };
assert.equal((await api.prepare(pack, { game: wrongRake, treeId: pack.tree.treeId })).reason,
  'gto-unavailable:config-mismatch');
assert.equal((await api.prepare(pack, { game, treeId: 'other-tree' })).reason,
  'gto-unavailable:tree-mismatch');

const tampered = clone(pack);
tampered.payload.nodes[0].actions[0].frequencies[0] = 0.9;
assert.equal((await api.prepare(tampered, { game, treeId: pack.tree.treeId })).reason,
  'gto-unavailable:payload-hash-mismatch');

const metadataTamper = clone(pack);
metadataTamper.solve.productionReady = false;
assert.equal((await api.prepare(metadataTamper, { game, treeId: pack.tree.treeId })).reason,
  'gto-unavailable:manifest-hash-mismatch');

const wrongLength = clone(pack);
wrongLength.payload.nodes[0].actions[0].frequencies.pop();
wrongLength.payloadSha256 = await api.sha256(wrongLength.payload);
wrongLength.manifestSha256 = await api.manifestSha256(wrongLength);
assert.equal((await api.prepare(wrongLength, { game, treeId: pack.tree.treeId })).reason,
  'gto-unavailable:frequency-length');

const wrongSum = clone(pack);
wrongSum.payload.nodes[0].actions[0].frequencies[0] = 0.5;
wrongSum.payloadSha256 = await api.sha256(wrongSum.payload);
wrongSum.manifestSha256 = await api.manifestSha256(wrongSum);
assert.equal((await api.prepare(wrongSum, { game, treeId: pack.tree.treeId })).reason,
  'gto-unavailable:frequency-sum');

const dangling = clone(pack);
dangling.payload.nodes[0].actions[2].childNodeId = 'absent';
dangling.payloadSha256 = await api.sha256(dangling.payload);
dangling.manifestSha256 = await api.manifestSha256(dangling);
assert.equal((await api.prepare(dangling, { game, treeId: pack.tree.treeId })).reason,
  'gto-unavailable:dangling-child');

const research = await makePack({ solve: {
  productionReady: false,
  verificationStatus: 'unverified_research',
  nashConvMbbPerHand: null,
  nashConvMethod: null,
  nashConvCi95UpperMbbPerHand: null,
  averageExternalRegretMbbPerHand: null,
  independentSeeds: 1,
  seedStrategyL1Max: null,
  validationReportSha256: null,
} });
const preparedResearch = await api.prepare(research, { game, treeId: research.tree.treeId });
assert.equal(preparedResearch.ok, true, preparedResearch.reason);
assert.equal(api.policy(preparedResearch.pack, 'root').reason, 'gto-unavailable:research-pack');
assert.equal((await api.register(research, { game, treeId: research.tree.treeId })).reason,
  'gto-unavailable:research-pack');

const weakEvidence = await makePack({ solve: { nashConvCi95UpperMbbPerHand: 10.01 } });
assert.equal((await api.prepare(weakEvidence, { game, treeId: weakEvidence.tree.treeId })).reason,
  'gto-unavailable:production-evidence');

const rakedProduction = await makePack({ game: {
  rake: { kind: 'percentage', basisPoints: 500, capMilliBB: 4000, noFlopNoDrop: true },
} });
assert.equal((await api.prepare(rakedProduction, {
  game: rakedProduction.game, treeId: rakedProduction.tree.treeId,
})).reason, 'gto-unavailable:unsupported-game-rules');
const straddledProduction = await makePack({ game: { straddle: true } });
assert.equal((await api.prepare(straddledProduction, {
  game: straddledProduction.game, treeId: straddledProduction.tree.treeId,
})).reason, 'gto-unavailable:unsupported-game-rules');

const multiway = await makePack({
  game: {
    activePlayers: 3,
    seatOrder: ['BTN', 'SB', 'BB'],
    initialStacksMilliBB: [100000, 100000, 100000],
  },
});
multiway.payloadSha256 = await api.sha256(multiway.payload);
multiway.manifestSha256 = await api.manifestSha256(multiway);
assert.equal((await api.prepare(multiway, { game: multiway.game, treeId: multiway.tree.treeId })).reason,
  'gto-unavailable:multiplayer-production-unsupported');

const secondTree = await makePack({
  top: { packId: 'synthetic-hu-100bb-v2' },
  tree: { treeId: 'synthetic-tree-v2' },
});
const ambiguousApi = loadApi(true, [pack.manifestSha256, secondTree.manifestSha256]).api;
assert.equal((await ambiguousApi.register(pack, { game, treeId: pack.tree.treeId })).ok, true);
assert.equal((await ambiguousApi.register(secondTree, { game, treeId: secondTree.tree.treeId })).ok, true);
assert.equal(ambiguousApi.forScenario({ game }).reason, 'gto-unavailable:ambiguous-tree');
assert.equal(ambiguousApi.forScenario({ game, treeId: pack.tree.treeId }).packId, pack.packId);

/* End-to-end boundary: a registered production pack must drive the public
   gameplay API, preserve raw mixed reach, and hand exact 1,326-combo arrays to
   the postflop solver adapter. */
const chartSource = fs.readFileSync(new URL('../charts.js', import.meta.url), 'utf8');
const blueprintSource = fs.readFileSync(new URL('../js/preflop-blueprint.js', import.meta.url), 'utf8');
function loadPreflopRuntime(trustedManifestSha256 = []) {
  const runtime = loadApi(true, trustedManifestSha256);
  vm.runInContext(chartSource, runtime.context, { filename: 'charts.js' });
  vm.runInContext(blueprintSource, runtime.context, { filename: 'js/preflop-blueprint.js' });
  return runtime;
}

const exactRuntime = loadPreflopRuntime([pack.manifestSha256]);
const seatOrders = JSON.parse(vm.runInContext('JSON.stringify(GTO_PREFLOP_SEAT_ORDER)', exactRuntime.context));
assert.deepEqual(seatOrders, {
  2: ['SB/BTN', 'BB'],
  3: ['BTN', 'SB', 'BB'],
  4: ['BTN', 'SB', 'BB', 'CO'],
  5: ['BTN', 'SB', 'BB', 'UTG', 'CO'],
  6: ['BTN', 'SB', 'BB', 'UTG', 'HJ', 'CO'],
  7: ['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'HJ', 'CO'],
  8: ['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'MP', 'HJ', 'CO'],
  9: ['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO'],
}, 'browser policy-pack seat ordinals must match the local trainer clockwise from the button');
const exactRegistration = await exactRuntime.api.register(pack, { game, treeId: pack.tree.treeId });
assert.equal(exactRegistration.ok, true, exactRegistration.reason);
const exactIntegration = vm.runInContext(`(() => {
  const players = [
    {
      i: 0, pos: 'SB/BTN', out: false, sittingOut: false, folded: false, allIn: false, acted: false,
      chips: 9950, bet: 50, totalBet: 50,
      hole: [{ r: 14, s: 0 }, { r: 14, s: 1 }],
    },
    {
      i: 1, pos: 'BB', out: false, sittingOut: false, folded: false, allIn: false, acted: false,
      chips: 9900, bet: 100, totalBet: 100,
      hole: [{ r: 7, s: 3 }, { r: 2, s: 2 }],
    },
  ];
  state = {
    cfg: { gameType: 'cash', gtoPreflopTreeId: 'synthetic-tree-v1' },
    stage: 'preflop', ante: 0, sb: 50, bb: 100, handNum: 1, players,
    currentBet: 100, lastRaiseSize: 100,
  };
  gtoPreflopBeginHand();
  const heroPolicy = gtoPreflopCurrentPolicy(players[0]);
  const sampledFold = gtoPreflopSampleDecision(players[0], () => 0.05);
  const sampledRaise = gtoPreflopSampleDecision(players[0], () => 0.50);
  const coach = gtoPreflopCoachDecision(players[0]);
  players[0].chips = 9750; players[0].bet = 250; players[0].totalBet = 250;
  state.currentBet = 250; state.lastRaiseSize = 150;
  gtoPreflopObserveAction(players[0], 'raise', {
    preflopRaisesBefore: 0, callAmt: 50, targetBB: 2.5, isAllIn: false,
    cbBefore: 100, facedRaiseSize: 100, playerBetBefore: 50, stackTotalBefore: 10000,
  });
  players[0].acted = true;
  const bbPolicy = gtoPreflopCurrentPolicy(players[1]);
  players[1].chips = 9750; players[1].bet = 250; players[1].totalBet = 250;
  gtoPreflopObserveAction(players[1], 'call', {
    preflopRaisesBefore: 1, callAmt: 150, isAllIn: false,
    cbBefore: 250, facedRaiseSize: 150, playerBetBefore: 100, stackTotalBefore: 10000,
  });
  return {
    tracker: state.gtoPreflop,
    heroPolicy, bbPolicy, sampledFold, sampledRaise, coach,
    handoff: gtoPreflopRangesFor([players[1], players[0]]),
  };
})()`, exactRuntime.context);

assert.equal(exactIntegration.tracker.mode, 'exact-pack');
assert.equal(exactIntegration.tracker.valid, true);
assert.equal(exactIntegration.tracker.terminal, true);
assert.equal(exactIntegration.heroPolicy.ok, true);
assert.equal(exactIntegration.heroPolicy.strategyMode, 'equilibrium-baseline');
assert.equal(exactIntegration.heroPolicy.rangeExactFrequencies, true);
assert.equal(exactIntegration.heroPolicy.branches.length, 3);
assert.ok(Math.abs(exactIntegration.heroPolicy.branches[0].frequency - Math.fround(0.10)) < 1e-8);
assert.ok(Math.abs(exactIntegration.heroPolicy.branches[1].frequency - Math.fround(0.10)) < 1e-8);
assert.ok(Math.abs(exactIntegration.heroPolicy.branches[2].frequency - Math.fround(0.80)) < 1e-8);
assert.equal(exactIntegration.bbPolicy.ok, true);
assert.ok(Math.abs(exactIntegration.bbPolicy.primary.frequency - Math.fround(0.60)) < 1e-8);
assert.equal(exactIntegration.sampledFold.type, 'fold');
assert.equal(exactIntegration.sampledRaise.type, 'raise');
assert.equal(exactIntegration.sampledRaise.amount, 250);
assert.equal(exactIntegration.coach.rec, 'RAISE');
assert.equal(exactIntegration.coach.policyBranches.length, 3);
assert.equal(exactIntegration.handoff.ok, true);
assert.equal(exactIntegration.handoff.exactFrequencies, true);
assert.equal(exactIntegration.handoff.ranges.length, 2);
assert.equal(exactIntegration.handoff.ranges[0].length, 1326);
assert.equal(exactIntegration.handoff.ranges[1].length, 1326);
assert.match(exactIntegration.handoff.source, /^preflop-equilibrium-policy-pack:synthetic-hu-100bb-v1@/);
const exactAaIndex = exactRuntime.api.comboIndex({ r: 14, s: 0 }, { r: 14, s: 1 });
const exactDeuceIndex = exactRuntime.api.comboIndex({ r: 2, s: 3 }, { r: 2, s: 2 });
assert.ok(Math.abs(exactIntegration.handoff.ranges[1][exactAaIndex] - Math.fround(0.80)) < 1e-8,
  'hero AA reach must retain its exact 80% raise probability');
assert.ok(Math.abs(exactIntegration.handoff.ranges[1][exactDeuceIndex] - Math.fround(0.65)) < 1e-8,
  'raw reach must not be max-normalized');
assert.ok(Math.abs(exactIntegration.handoff.ranges[0][exactDeuceIndex] - Math.fround(0.60)) < 1e-8,
  'BB call reach must retain its exact mixed frequency');

/* Exercise the production hook timing through the real engine. This catches
   action normalization, acted-flag resets, and preflop round-closing changes
   that isolated policy calls cannot see. */
function loadFullGameRuntime(trustedManifestSha256 = []) {
  const runtime = loadApi(true, trustedManifestSha256);
  const storage = new Map();
  Object.assign(runtime.context, {
    setTimeout, clearTimeout, queueMicrotask, Date, Math, JSON, Promise,
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: key => storage.delete(key),
    },
  });
  vm.runInContext(chartSource, runtime.context, { filename: 'charts.js' });
  for (const file of [
    'eval.js', 'preflop-blueprint.js', 'modes/registry.js', 'modes/tournament.js',
    'modes/cash.js', 'engine.js', 'rewards.js', 'solver.js', 'coach.js', 'ai.js',
    'mp.js', 'ui.js',
  ]) {
    vm.runInContext(fs.readFileSync(new URL(`../js/${file}`, import.meta.url), 'utf8'), runtime.context,
      { filename: `js/${file}` });
  }
  return runtime;
}

const engineRuntime = loadFullGameRuntime([pack.manifestSha256]);
const engineRegistration = await engineRuntime.api.register(pack, { game, treeId: pack.tree.treeId });
assert.equal(engineRegistration.ok, true, engineRegistration.reason);
const engineIntegration = vm.runInContext(`(() => {
  const setHand = handNum => {
    newGame({
      gameType: 'cash', numPlayers: 2, startBB: 100, startBlind: 100,
      difficulty: 'hard', tableScenario: 'balanced',
      gtoPreflopTreeId: 'synthetic-tree-v1',
    });
    Object.assign(state, {
      handNum, stage: 'preflop', ante: 0, sb: 50, bb: 100,
      currentBet: 100, lastRaiseSize: 100, streetRaiseCount: 0,
      preflopRaiseCount: 0, lastAggIdx: -1, pfAggIdx: -1, handLog: [],
    });
    const [sb, bb] = state.players;
    Object.assign(sb, {
      pos: 'SB/BTN', chips: 9950, bet: 50, totalBet: 50,
      hole: [{ r: 14, s: 0 }, { r: 14, s: 1 }],
    });
    Object.assign(bb, {
      pos: 'BB', chips: 9900, bet: 100, totalBet: 100,
      hole: [{ r: 7, s: 3 }, { r: 2, s: 2 }],
    });
    for (const player of state.players) Object.assign(player, {
      out: false, sittingOut: false, folded: false, allIn: false, acted: false,
      rangeCap: 1, rangeFloor: 0, checkedStreet: false,
      aggStreets: [], checkStreets: [], lineRead: '',
    });
    gtoPreflopBeginHand();
    return [sb, bb];
  };
  const reachAt = (player, a, b) => state.gtoPreflop.players[player.i]
    .rangeRaw[gtoPreflopPackComboIndex(a, b)];

  const [raiseSb, callBb] = setHand(11);
  applyAction(raiseSb, 'raise', 250);
  const afterRaise = {
    valid: state.gtoPreflop.valid,
    nodeId: state.gtoPreflop.nodeId,
    currentBet: state.currentBet,
    sbActed: raiseSb.acted,
    bbActed: callBb.acted,
  };
  applyAction(callBb, 'call');
  const raiseCall = {
    valid: state.gtoPreflop.valid,
    terminal: state.gtoPreflop.terminal,
    actions: state.gtoPreflop.actions.map(item => item.action),
    sbReach: reachAt(raiseSb, raiseSb.hole[0], raiseSb.hole[1]),
    bbReach: reachAt(callBb, callBb.hole[0], callBb.hole[1]),
    bets: [raiseSb.bet, callBb.bet],
  };

  const [limpSb, checkBb] = setHand(12);
  applyAction(limpSb, 'call');
  const afterLimp = {
    valid: state.gtoPreflop.valid,
    nodeId: state.gtoPreflop.nodeId,
    sbActed: limpSb.acted,
    bbActed: checkBb.acted,
  };
  applyAction(checkBb, 'call');
  const limpCheck = {
    valid: state.gtoPreflop.valid,
    terminal: state.gtoPreflop.terminal,
    actions: state.gtoPreflop.actions.map(item => item.action),
    sbReach: reachAt(limpSb, limpSb.hole[0], limpSb.hole[1]),
    bbReach: reachAt(checkBb, checkBb.hole[0], checkBb.hole[1]),
    bets: [limpSb.bet, checkBb.bet],
  };
  return { afterRaise, raiseCall, afterLimp, limpCheck };
})()`, engineRuntime.context);

assert.deepEqual(JSON.parse(JSON.stringify(engineIntegration.afterRaise)), {
  valid: true, nodeId: 'bb-vs-open', currentBet: 250, sbActed: true, bbActed: false,
});
assert.equal(engineIntegration.raiseCall.valid, true);
assert.equal(engineIntegration.raiseCall.terminal, true);
assert.deepEqual(Array.from(engineIntegration.raiseCall.actions), ['raise', 'call']);
assert.ok(Math.abs(engineIntegration.raiseCall.sbReach - Math.fround(0.80)) < 1e-8);
assert.ok(Math.abs(engineIntegration.raiseCall.bbReach - Math.fround(0.60)) < 1e-8);
assert.deepEqual(Array.from(engineIntegration.raiseCall.bets), [250, 250]);
assert.deepEqual(JSON.parse(JSON.stringify(engineIntegration.afterLimp)), {
  valid: true, nodeId: 'bb-vs-limp', sbActed: true, bbActed: false,
});
assert.equal(engineIntegration.limpCheck.valid, true);
assert.equal(engineIntegration.limpCheck.terminal, true);
assert.deepEqual(Array.from(engineIntegration.limpCheck.actions), ['call', 'check']);
assert.ok(Math.abs(engineIntegration.limpCheck.sbReach - Math.fround(0.10)) < 1e-8);
assert.equal(engineIntegration.limpCheck.bbReach, 1);
assert.deepEqual(Array.from(engineIntegration.limpCheck.bets), [100, 100]);

const offTree = vm.runInContext(`(() => {
  state.handNum = 2;
  state.currentBet = 100; state.lastRaiseSize = 100;
  state.players[0].chips = 9950; state.players[0].bet = 50; state.players[0].totalBet = 50;
  state.players[0].acted = false; state.players[0].folded = false; state.players[0].allIn = false;
  state.players[1].chips = 9900; state.players[1].bet = 100; state.players[1].totalBet = 100;
  state.players[1].acted = false; state.players[1].folded = false; state.players[1].allIn = false;
  gtoPreflopBeginHand();
  state.players[0].chips = 9740; state.players[0].bet = 260; state.players[0].totalBet = 260;
  state.currentBet = 260; state.lastRaiseSize = 160;
  gtoPreflopObserveAction(state.players[0], 'raise', {
    preflopRaisesBefore: 0, callAmt: 50, targetBB: 2.6, isAllIn: false,
    cbBefore: 100, facedRaiseSize: 100, playerBetBefore: 50, stackTotalBefore: 10000,
  });
  return { valid: state.gtoPreflop.valid, reason: state.gtoPreflop.reason };
})()`, exactRuntime.context);
assert.equal(offTree.valid, false);
assert.equal(offTree.reason, 'gto-unavailable:off-tree-action');

/* With the strict API loaded but no registered pack, existing HU postflop
   coverage remains available only as a clearly heuristic, non-exact baseline. */
const noPackRuntime = loadPreflopRuntime();
const noPackIntegration = vm.runInContext(`(() => {
  const players = [
    { i: 0, pos: 'SB/BTN', out: false, sittingOut: false, chips: 9950, bet: 50, totalBet: 50,
      hole: [{ r: 14, s: 0 }, { r: 13, s: 0 }] },
    { i: 1, pos: 'BB', out: false, sittingOut: false, chips: 9900, bet: 100, totalBet: 100,
      hole: [{ r: 7, s: 3 }, { r: 2, s: 2 }] },
  ];
  state = { cfg: { gameType: 'cash' }, stage: 'preflop', ante: 0, sb: 50, bb: 100, handNum: 1, players };
  gtoPreflopBeginHand();
  const policy = gtoPreflopCurrentPolicy(players[0]);
  gtoPreflopObserveAction(players[0], 'raise', {
    preflopRaisesBefore: 0, callAmt: 50, targetBB: 2.5, isAllIn: false,
  });
  gtoPreflopObserveAction(players[1], 'call', {
    preflopRaisesBefore: 1, callAmt: 150, isAllIn: false,
  });
  return {
    mode: state.gtoPreflop.mode,
    provider: state.gtoPreflop.strategyProvider,
    policy,
    handoff: gtoPreflopRangesFor([players[1], players[0]]),
  };
})()`, noPackRuntime.context);
assert.equal(noPackIntegration.mode, 'heuristic');
assert.equal(noPackIntegration.provider, 'heuristic-preflop-charts');
assert.equal(noPackIntegration.policy.ok, false);
assert.equal(noPackIntegration.policy.reason, 'gto-unavailable:no-policy-pack');
assert.equal(noPackIntegration.handoff.ok, true);
assert.equal(noPackIntegration.handoff.exactFrequencies, false);
assert.match(noPackIntegration.handoff.source, /^heuristic-preflop-chart-blueprint:/);
assert.equal(noPackIntegration.handoff.meta.source, 'HEURISTIC_CHARTS');

console.log('preflop policy-pack and gameplay integration tests passed');
