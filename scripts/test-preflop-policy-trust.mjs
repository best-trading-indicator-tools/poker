#!/usr/bin/env node
import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../js/preflop-policy-pack.js', import.meta.url), 'utf8');
const allowlistDeclaration =
  'const GTO_PREFLOP_PACK_AUDITED_MANIFEST_SHA256 = Object.freeze([]);';

function loadApi(auditedManifestSha256 = []) {
  assert.ok(source.includes(allowlistDeclaration), 'embedded audit allowlist declaration moved');
  const injected = auditedManifestSha256.length
    ? source.replace(allowlistDeclaration,
      `const GTO_PREFLOP_PACK_AUDITED_MANIFEST_SHA256 = Object.freeze(${JSON.stringify(auditedManifestSha256)});`)
    : source;
  const context = vm.createContext({ console, crypto: webcrypto, TextEncoder });
  context.globalThis = context;
  vm.runInContext(injected, context, { filename: 'js/preflop-policy-pack.js' });
  return context.PREFLOP_POLICY_PACK_API;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

async function makeProductionPack(api) {
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
  const payload = {
    nodes: [{
      nodeId: 'root',
      parentNodeId: null,
      actorSeat: 0,
      historyKey: '',
      actions: [{
        actionId: 'fold',
        type: 'fold',
        terminal: true,
        frequencies: new Array(169).fill(1),
      }],
    }],
  };
  const pack = {
    schema: api.schema,
    schemaVersion: api.schemaVersion,
    packId: 'trust-boundary-synthetic-v1',
    payloadSha256: await api.sha256(payload),
    manifestSha256: '0'.repeat(64),
    game,
    cards: {
      comboCount: 1326,
      cardOrder: api.cardOrder,
      storage: 'class169-json-v1',
      classOrder: api.classOrder,
      expansion: api.expansion,
    },
    tree: {
      treeId: 'trust-boundary-tree-v1',
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
      expectedDecisionNodes: 1,
      exportedDecisionNodes: 1,
      validationReportSha256: '2'.repeat(64),
      continuationModel: 'synthetic test abstraction',
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
  pack.manifestSha256 = await api.manifestSha256(pack);
  return pack;
}

const defaultApi = loadApi();
assert.throws(() => loadApi(['not-a-sha256']), /invalid embedded preflop policy-pack audit allowlist/);
assert.equal(defaultApi.trust.kind, 'embedded-manifest-sha256-allowlist');
assert.equal(defaultApi.trust.auditedManifestSha256.length, 0);
assert.equal(Object.isFrozen(defaultApi.trust), true);
assert.equal(Object.isFrozen(defaultApi.trust.auditedManifestSha256), true);
assert.throws(() => defaultApi.trust.auditedManifestSha256.push('0'.repeat(64)),
  /object is not extensible/);

const pack = await makeProductionPack(defaultApi);
const scenario = { game: pack.game, treeId: pack.tree.treeId };
assert.equal((await defaultApi.prepare(pack, scenario)).reason,
  'gto-unavailable:untrusted-production-pack');
assert.equal((await defaultApi.register(pack, scenario)).reason,
  'gto-unavailable:untrusted-production-pack');

const tampered = clone(pack);
tampered.payload.nodes[0].actions[0].frequencies[0] = 0;
assert.equal((await defaultApi.prepare(tampered, scenario)).reason,
  'gto-unavailable:payload-hash-mismatch', 'integrity checks must run before trust lookup');

const weakEvidence = clone(pack);
weakEvidence.solve.nashConvCi95UpperMbbPerHand = 11;
weakEvidence.manifestSha256 = await defaultApi.manifestSha256(weakEvidence);
assert.equal((await defaultApi.prepare(weakEvidence, scenario)).reason,
  'gto-unavailable:production-evidence', 'evidence checks must run before trust lookup');

const trustedApi = loadApi([pack.manifestSha256]);
assert.deepEqual(Array.from(trustedApi.trust.auditedManifestSha256), [pack.manifestSha256]);
const prepared = await trustedApi.prepare(pack, scenario);
assert.equal(prepared.ok, true, prepared.reason);
const registered = await trustedApi.register(pack, scenario);
assert.equal(registered.ok, true, registered.reason);
assert.equal(trustedApi.policy(registered.pack, 'root', 0).ok, true);

const research = clone(pack);
research.packId = 'trust-boundary-research-v1';
Object.assign(research.solve, {
  productionReady: false,
  verificationStatus: 'unverified_research',
  nashConvMbbPerHand: null,
  nashConvMethod: null,
  nashConvCi95UpperMbbPerHand: null,
  averageExternalRegretMbbPerHand: null,
  independentSeeds: 1,
  seedStrategyL1Max: null,
  validationReportSha256: null,
});
research.manifestSha256 = await defaultApi.manifestSha256(research);
const inspectedResearch = await defaultApi.prepare(research, scenario);
assert.equal(inspectedResearch.ok, true, inspectedResearch.reason);
assert.equal((await defaultApi.register(research, scenario)).reason,
  'gto-unavailable:research-pack');

console.log('preflop policy-pack embedded trust boundary tests passed');
