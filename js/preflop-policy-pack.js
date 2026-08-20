// Strict loader/query boundary for locally generated preflop equilibrium packs.
//
// This module deliberately contains no charts, opponent model, Bayesian update,
// or fallback recommendation. A pack either matches the running game and passes
// every integrity check, or callers receive an explicit gto-unavailable result.

const GTO_PREFLOP_PACK_SCHEMA = 'poker-ai.preflop-policy-pack';
const GTO_PREFLOP_PACK_SCHEMA_VERSION = 1;
const GTO_PREFLOP_PACK_COMBOS = 1326;
const GTO_PREFLOP_PACK_CLASSES = 169;
const GTO_PREFLOP_PACK_CARD_ORDER = 'rank-ascending;cdhs';
const GTO_PREFLOP_PACK_CLASS_ORDER = 'matrix-row-major;AKQJT98765432;upper-suited';
const GTO_PREFLOP_PACK_EXPANSION = 'suit-symmetric-v1';
const GTO_PREFLOP_PACK_RANKS_ASC = '23456789TJQKA';
const GTO_PREFLOP_PACK_RANKS_DESC = 'AKQJT98765432';
const GTO_PREFLOP_PACK_ACTION_TYPES = new Set(['fold', 'check', 'call', 'raise', 'all-in']);
const GTO_PREFLOP_PACK_PROBABILITY_TOLERANCE = 2e-5;
const GTO_PREFLOP_PACK_HU_NASHCONV_LIMIT_MBB = 10;
const GTO_PREFLOP_PACK_HU_SEED_L1_LIMIT = 0.02;

/*
 * Production status is not a property an input JSON file may grant itself.
 * Add a manifest SHA-256 here only after its policy, validation report, solver
 * build, configuration, and redistribution rights have been independently
 * audited. The shipping build intentionally trusts no production pack yet.
 */
const GTO_PREFLOP_PACK_AUDITED_MANIFEST_SHA256 = Object.freeze([]);

const gtoPreflopPackInternals = new WeakMap();
const gtoPreflopPackRegistry = new Map();

function gtoPreflopPackUnavailable(code, detail) {
  const result = { ok: false, reason: `gto-unavailable:${code}` };
  if (detail) result.detail = String(detail);
  return result;
}

function gtoPreflopPackOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function gtoPreflopPackPlainObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) ||
      Object.prototype.toString.call(value) !== '[object Object]') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null ||
    Boolean(prototype && prototype.constructor && prototype.constructor.name === 'Object');
}

function gtoPreflopPackCanonicalJson(value, ancestors) {
  const stack = ancestors || new Set();
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new TypeError('non-finite number');
    return JSON.stringify(Object.is(value, -0) ? 0 : value);
  }
  if (Array.isArray(value)) {
    if (stack.has(value)) throw new TypeError('cyclic value');
    stack.add(value);
    const encoded = `[${value.map(item => gtoPreflopPackCanonicalJson(item, stack)).join(',')}]`;
    stack.delete(value);
    return encoded;
  }
  if (!gtoPreflopPackPlainObject(value)) throw new TypeError('non-JSON value');
  if (stack.has(value)) throw new TypeError('cyclic value');
  stack.add(value);
  const keys = Object.keys(value).sort();
  const encoded = `{${keys.map(key => {
    const item = value[key];
    if (item === undefined || typeof item === 'function' || typeof item === 'symbol')
      throw new TypeError('non-JSON member');
    return `${JSON.stringify(key)}:${gtoPreflopPackCanonicalJson(item, stack)}`;
  }).join(',')}}`;
  stack.delete(value);
  return encoded;
}

function gtoPreflopPackUtf8(text) {
  if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(text);
  const bytes = [];
  for (let index = 0; index < text.length; index++) {
    let point = text.charCodeAt(index);
    if (point >= 0xd800 && point <= 0xdbff && index + 1 < text.length) {
      const low = text.charCodeAt(index + 1);
      if (low >= 0xdc00 && low <= 0xdfff) {
        point = 0x10000 + ((point - 0xd800) << 10) + (low - 0xdc00);
        index++;
      } else point = 0xfffd;
    } else if (point >= 0xd800 && point <= 0xdfff) point = 0xfffd;
    if (point < 0x80) bytes.push(point);
    else if (point < 0x800) bytes.push(0xc0 | point >>> 6, 0x80 | point & 0x3f);
    else if (point < 0x10000) bytes.push(0xe0 | point >>> 12, 0x80 | point >>> 6 & 0x3f, 0x80 | point & 0x3f);
    else bytes.push(0xf0 | point >>> 18, 0x80 | point >>> 12 & 0x3f, 0x80 | point >>> 6 & 0x3f, 0x80 | point & 0x3f);
  }
  return new Uint8Array(bytes);
}

function gtoPreflopPackSha256Fallback(bytes) {
  const constants = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ]);
  const state = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ]);
  const bitLength = bytes.length * 8;
  const paddedLength = Math.ceil((bytes.length + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLength);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  const view = new DataView(padded.buffer);
  const highBits = Math.floor(bitLength / 0x100000000);
  const lowBits = bitLength >>> 0;
  view.setUint32(paddedLength - 8, highBits, false);
  view.setUint32(paddedLength - 4, lowBits, false);
  const words = new Uint32Array(64);
  const rotate = (value, amount) => value >>> amount | value << (32 - amount);
  for (let offset = 0; offset < paddedLength; offset += 64) {
    for (let index = 0; index < 16; index++) words[index] = view.getUint32(offset + index * 4, false);
    for (let index = 16; index < 64; index++) {
      const first = rotate(words[index - 15], 7) ^ rotate(words[index - 15], 18) ^ words[index - 15] >>> 3;
      const second = rotate(words[index - 2], 17) ^ rotate(words[index - 2], 19) ^ words[index - 2] >>> 10;
      words[index] = (words[index - 16] + first + words[index - 7] + second) >>> 0;
    }
    let a = state[0], b = state[1], c = state[2], d = state[3];
    let e = state[4], f = state[5], g = state[6], h = state[7];
    for (let index = 0; index < 64; index++) {
      const sigma1 = rotate(e, 6) ^ rotate(e, 11) ^ rotate(e, 25);
      const choose = e & f ^ ~e & g;
      const temp1 = (h + sigma1 + choose + constants[index] + words[index]) >>> 0;
      const sigma0 = rotate(a, 2) ^ rotate(a, 13) ^ rotate(a, 22);
      const majority = a & b ^ a & c ^ b & c;
      const temp2 = (sigma0 + majority) >>> 0;
      h = g; g = f; f = e; e = (d + temp1) >>> 0;
      d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }
    state[0] = (state[0] + a) >>> 0;
    state[1] = (state[1] + b) >>> 0;
    state[2] = (state[2] + c) >>> 0;
    state[3] = (state[3] + d) >>> 0;
    state[4] = (state[4] + e) >>> 0;
    state[5] = (state[5] + f) >>> 0;
    state[6] = (state[6] + g) >>> 0;
    state[7] = (state[7] + h) >>> 0;
  }
  return Array.from(state, value => value.toString(16).padStart(8, '0')).join('');
}

async function gtoPreflopPackSha256(value) {
  const bytes = gtoPreflopPackUtf8(gtoPreflopPackCanonicalJson(value));
  const subtle = typeof globalThis !== 'undefined' && globalThis.crypto && globalThis.crypto.subtle;
  if (subtle && typeof subtle.digest === 'function') {
    try {
      const digest = new Uint8Array(await subtle.digest('SHA-256', bytes));
      return Array.from(digest, byte => byte.toString(16).padStart(2, '0')).join('');
    } catch (_) { /* The pure-JS path keeps local file deployments usable. */ }
  }
  return gtoPreflopPackSha256Fallback(bytes);
}

function gtoPreflopPackManifestValue(pack) {
  return {
    schema: pack.schema,
    schemaVersion: pack.schemaVersion,
    packId: pack.packId,
    payloadSha256: pack.payloadSha256,
    game: pack.game,
    cards: pack.cards,
    tree: pack.tree,
    solve: pack.solve,
    provenance: pack.provenance,
  };
}

async function gtoPreflopPackManifestSha256(pack) {
  if (!gtoPreflopPackPlainObject(pack)) throw new TypeError('invalid pack manifest');
  return gtoPreflopPackSha256(gtoPreflopPackManifestValue(pack));
}

function gtoPreflopPackExactKeys(object, required, optional) {
  if (!gtoPreflopPackPlainObject(object)) return false;
  const allowed = new Set(required.concat(optional || []));
  return required.every(key => gtoPreflopPackOwn(object, key)) && Object.keys(object).every(key => allowed.has(key));
}

function gtoPreflopPackHash(value) {
  return typeof value === 'string' && /^[0-9a-f]{64}$/.test(value);
}

function gtoPreflopPackAssertAuditAllowlist() {
  const seen = new Set();
  for (const manifestSha256 of GTO_PREFLOP_PACK_AUDITED_MANIFEST_SHA256) {
    if (!gtoPreflopPackHash(manifestSha256) || seen.has(manifestSha256))
      throw new Error('invalid embedded preflop policy-pack audit allowlist');
    seen.add(manifestSha256);
  }
}

gtoPreflopPackAssertAuditAllowlist();

function gtoPreflopPackManifestIsAudited(manifestSha256) {
  for (const audited of GTO_PREFLOP_PACK_AUDITED_MANIFEST_SHA256) {
    if (audited === manifestSha256) return true;
  }
  return false;
}

function gtoPreflopPackPositiveInteger(value) {
  return Number.isSafeInteger(value) && value > 0;
}

function gtoPreflopPackNonnegativeInteger(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

function gtoPreflopPackString(value) {
  return typeof value === 'string' && value.length > 0 && value.length <= 256;
}

function gtoPreflopPackValidateRake(rake) {
  if (!gtoPreflopPackPlainObject(rake) || typeof rake.kind !== 'string') return 'rake-shape';
  if (rake.kind === 'none') return gtoPreflopPackExactKeys(rake, ['kind']) ? '' : 'rake-fields';
  if (rake.kind !== 'percentage' || !gtoPreflopPackExactKeys(rake,
    ['kind', 'basisPoints', 'capMilliBB', 'noFlopNoDrop'])) return 'rake-fields';
  if (!gtoPreflopPackNonnegativeInteger(rake.basisPoints) || rake.basisPoints > 10000 ||
      !gtoPreflopPackNonnegativeInteger(rake.capMilliBB) || typeof rake.noFlopNoDrop !== 'boolean') return 'rake-values';
  return '';
}

const GTO_PREFLOP_PACK_GAME_KEYS = [
  'variant', 'objective', 'activePlayers', 'seatOrder', 'blindsMilliBB',
  'anteMilliBB', 'initialStacksMilliBB', 'rake', 'straddle',
];

function gtoPreflopPackValidateGame(game) {
  if (!gtoPreflopPackExactKeys(game, GTO_PREFLOP_PACK_GAME_KEYS)) return 'game-shape';
  if (game.variant !== 'NLHE' || game.objective !== 'chipEV') return 'game-kind';
  if (!Number.isSafeInteger(game.activePlayers) || game.activePlayers < 2 || game.activePlayers > 9) return 'player-count';
  if (!Array.isArray(game.seatOrder) || game.seatOrder.length !== game.activePlayers ||
      game.seatOrder.some(position => !gtoPreflopPackString(position)) || new Set(game.seatOrder).size !== game.activePlayers)
    return 'seat-order';
  if (!gtoPreflopPackExactKeys(game.blindsMilliBB, ['sb', 'bb']) ||
      !gtoPreflopPackPositiveInteger(game.blindsMilliBB.sb) ||
      !gtoPreflopPackPositiveInteger(game.blindsMilliBB.bb) ||
      game.blindsMilliBB.sb >= game.blindsMilliBB.bb) return 'blinds';
  if (!gtoPreflopPackNonnegativeInteger(game.anteMilliBB)) return 'ante';
  if (!Array.isArray(game.initialStacksMilliBB) || game.initialStacksMilliBB.length !== game.activePlayers ||
      game.initialStacksMilliBB.some(stack => !gtoPreflopPackPositiveInteger(stack) || stack < game.blindsMilliBB.bb))
    return 'stacks';
  const rakeError = gtoPreflopPackValidateRake(game.rake);
  if (rakeError) return rakeError;
  if (typeof game.straddle !== 'boolean') return 'straddle';
  return '';
}

function gtoPreflopPackNormalizeScenario(scenario) {
  if (!gtoPreflopPackPlainObject(scenario)) return { error: 'scenario-shape' };
  let game;
  let treeId;
  if (gtoPreflopPackOwn(scenario, 'game')) {
    if (!gtoPreflopPackExactKeys(scenario, ['game'], ['treeId'])) return { error: 'scenario-fields' };
    game = scenario.game;
    treeId = scenario.treeId;
  } else {
    const keys = Object.keys(scenario);
    if (keys.some(key => key !== 'treeId' && !GTO_PREFLOP_PACK_GAME_KEYS.includes(key))) return { error: 'scenario-fields' };
    game = Object.fromEntries(GTO_PREFLOP_PACK_GAME_KEYS.map(key => [key, scenario[key]]));
    treeId = scenario.treeId;
  }
  const gameError = gtoPreflopPackValidateGame(game);
  if (gameError) return { error: `scenario-${gameError}` };
  if (treeId !== undefined && treeId !== null && !gtoPreflopPackString(treeId)) return { error: 'scenario-tree-id' };
  const clone = JSON.parse(gtoPreflopPackCanonicalJson(game));
  return { game: clone, treeId: treeId == null ? null : treeId };
}

function gtoPreflopPackGameKey(game) {
  return gtoPreflopPackCanonicalJson(game);
}

function gtoPreflopPackCardId(card) {
  if (Number.isSafeInteger(card)) return card >= 0 && card < 52 ? card : -1;
  if (typeof card === 'string' && /^[2-9TJQKA][cdhs]$/.test(card)) {
    const rank = GTO_PREFLOP_PACK_RANKS_ASC.indexOf(card[0]);
    const suit = 'cdhs'.indexOf(card[1]);
    return rank < 0 || suit < 0 ? -1 : rank * 4 + suit;
  }
  if (!card || !Number.isFinite(card.r) || !Number.isFinite(card.s)) return -1;
  const rank = Number(card.r);
  const appSuit = Number(card.s);
  if (!Number.isInteger(rank) || rank < 2 || rank > 14 || !Number.isInteger(appSuit) || appSuit < 0 || appSuit > 3) return -1;
  // App suits are spade, heart, diamond, club; policy packs are c, d, h, s.
  return 4 * (rank - 2) + (3 - appSuit);
}

function gtoPreflopPackComboIndex(cardA, cardB) {
  const firstRaw = gtoPreflopPackCardId(cardA);
  const secondRaw = gtoPreflopPackCardId(cardB);
  if (firstRaw < 0 || secondRaw < 0 || firstRaw === secondRaw) return -1;
  const first = Math.min(firstRaw, secondRaw);
  const second = Math.max(firstRaw, secondRaw);
  return first * (101 - first) / 2 + second - 1;
}

const gtoPreflopPackClassCodes = (() => {
  const result = [];
  for (let row = 0; row < 13; row++) {
    for (let column = 0; column < 13; column++) {
      const rowRank = GTO_PREFLOP_PACK_RANKS_DESC[row];
      const columnRank = GTO_PREFLOP_PACK_RANKS_DESC[column];
      result.push(row === column ? rowRank + columnRank
        : row < column ? rowRank + columnRank + 's'
          : columnRank + rowRank + 'o');
    }
  }
  return Object.freeze(result);
})();

const gtoPreflopPackClassIndices = new Map(gtoPreflopPackClassCodes.map((code, index) => [code, index]));

function gtoPreflopPackClassIndex(code) {
  return typeof code === 'string' && gtoPreflopPackClassIndices.has(code) ? gtoPreflopPackClassIndices.get(code) : -1;
}

const gtoPreflopPackComboClasses = (() => {
  const result = new Array(GTO_PREFLOP_PACK_COMBOS);
  for (let first = 0; first < 52; first++) {
    for (let second = first + 1; second < 52; second++) {
      const rankA = Math.floor(first / 4);
      const rankB = Math.floor(second / 4);
      const high = Math.max(rankA, rankB);
      const low = Math.min(rankA, rankB);
      const highCode = GTO_PREFLOP_PACK_RANKS_ASC[high];
      const lowCode = GTO_PREFLOP_PACK_RANKS_ASC[low];
      const code = high === low ? highCode + lowCode
        : highCode + lowCode + (first % 4 === second % 4 ? 's' : 'o');
      result[first * (101 - first) / 2 + second - 1] = code;
    }
  }
  return Object.freeze(result);
})();

function gtoPreflopPackComboClass(comboIndex) {
  return Number.isSafeInteger(comboIndex) && comboIndex >= 0 && comboIndex < GTO_PREFLOP_PACK_COMBOS
    ? gtoPreflopPackComboClasses[comboIndex] : '';
}

const gtoPreflopPackComboClassIndices = (() => {
  const result = new Uint8Array(GTO_PREFLOP_PACK_COMBOS);
  for (let index = 0; index < result.length; index++) {
    const classIndex = gtoPreflopPackClassIndex(gtoPreflopPackComboClasses[index]);
    if (classIndex < 0) throw new Error('preflop policy-pack combo mapping invariant failed');
    result[index] = classIndex;
  }
  return result;
})();

function gtoPreflopPackExpand169(values) {
  if (!values || Number(values.length) !== GTO_PREFLOP_PACK_CLASSES) return null;
  const result = new Float32Array(GTO_PREFLOP_PACK_COMBOS);
  for (let index = 0; index < result.length; index++) {
    const value = Number(values[gtoPreflopPackComboClassIndices[index]]);
    if (!Number.isFinite(value)) return null;
    result[index] = Math.fround(value);
  }
  return result;
}

function gtoPreflopPackValidateCards(cards) {
  if (!gtoPreflopPackExactKeys(cards, ['comboCount', 'cardOrder', 'storage', 'classOrder', 'expansion'])) return 'cards-shape';
  if (cards.comboCount !== GTO_PREFLOP_PACK_COMBOS || cards.cardOrder !== GTO_PREFLOP_PACK_CARD_ORDER ||
      !['class169-json-v1', 'combo1326-json-v1'].includes(cards.storage) ||
      cards.classOrder !== GTO_PREFLOP_PACK_CLASS_ORDER || cards.expansion !== GTO_PREFLOP_PACK_EXPANSION)
    return 'cards-contract';
  return '';
}

function gtoPreflopPackValidateMetadata(pack) {
  if (!gtoPreflopPackExactKeys(pack, [
    'schema', 'schemaVersion', 'packId', 'payloadSha256', 'manifestSha256', 'game', 'cards',
    'tree', 'solve', 'provenance', 'payload',
  ])) return 'pack-shape';
  if (pack.schema !== GTO_PREFLOP_PACK_SCHEMA || pack.schemaVersion !== GTO_PREFLOP_PACK_SCHEMA_VERSION) return 'pack-schema';
  if (!gtoPreflopPackString(pack.packId)) return 'pack-id';
  if (!gtoPreflopPackHash(pack.payloadSha256) || !gtoPreflopPackHash(pack.manifestSha256)) return 'pack-hash-format';
  const gameError = gtoPreflopPackValidateGame(pack.game);
  if (gameError) return gameError;
  const cardsError = gtoPreflopPackValidateCards(pack.cards);
  if (cardsError) return cardsError;
  if (!gtoPreflopPackExactKeys(pack.tree, ['treeId', 'rootNodeId', 'sizingUnit', 'configSha256']) ||
      !gtoPreflopPackString(pack.tree.treeId) || !gtoPreflopPackString(pack.tree.rootNodeId) ||
      pack.tree.sizingUnit !== 'milliBB' || !gtoPreflopPackHash(pack.tree.configSha256)) return 'tree-metadata';
  if (!gtoPreflopPackExactKeys(pack.solve, [
    'engine', 'repository', 'commit', 'iterations', 'traversals', 'seed',
    'productionReady', 'verificationStatus', 'nashConvMbbPerHand', 'nashConvMethod',
    'nashConvCi95UpperMbbPerHand', 'averageExternalRegretMbbPerHand',
    'maxDeviationGainMbbPerHand', 'deviationGainCi95UpperMbbPerHand',
    'independentSeeds', 'seedStrategyL1Max', 'expectedDecisionNodes',
    'exportedDecisionNodes', 'validationReportSha256', 'continuationModel',
    'continuationModelSha256',
  ]) || !gtoPreflopPackString(pack.solve.engine) || !gtoPreflopPackString(pack.solve.repository) ||
      !gtoPreflopPackString(pack.solve.commit) || !gtoPreflopPackPositiveInteger(pack.solve.iterations) ||
      !gtoPreflopPackPositiveInteger(pack.solve.traversals) || !gtoPreflopPackNonnegativeInteger(pack.solve.seed) ||
      typeof pack.solve.productionReady !== 'boolean' || !gtoPreflopPackString(pack.solve.verificationStatus) ||
      !gtoPreflopPackPositiveInteger(pack.solve.independentSeeds) ||
      !gtoPreflopPackPositiveInteger(pack.solve.expectedDecisionNodes) ||
      !gtoPreflopPackPositiveInteger(pack.solve.exportedDecisionNodes) ||
      !(pack.solve.validationReportSha256 === null || gtoPreflopPackHash(pack.solve.validationReportSha256)) ||
      !gtoPreflopPackString(pack.solve.continuationModel) ||
      !gtoPreflopPackHash(pack.solve.continuationModelSha256)) return 'solve-metadata';
  const nullableNumbers = [
    'nashConvMbbPerHand', 'nashConvCi95UpperMbbPerHand',
    'averageExternalRegretMbbPerHand', 'maxDeviationGainMbbPerHand',
    'deviationGainCi95UpperMbbPerHand', 'seedStrategyL1Max',
  ];
  if (nullableNumbers.some(key => pack.solve[key] !== null &&
      (!Number.isFinite(pack.solve[key]) || pack.solve[key] < 0)) ||
      !(pack.solve.nashConvMethod === null || gtoPreflopPackString(pack.solve.nashConvMethod)))
    return 'solve-evidence';
  if (!gtoPreflopPackExactKeys(pack.provenance, [
    'sourceType', 'generatedAt', 'licenseSpdx', 'redistributionGranted', 'rawArtifactSha256',
  ]) || !['self-generated', 'licensed'].includes(pack.provenance.sourceType) ||
      !gtoPreflopPackString(pack.provenance.generatedAt) || Number.isNaN(Date.parse(pack.provenance.generatedAt)) ||
      !gtoPreflopPackString(pack.provenance.licenseSpdx) || pack.provenance.redistributionGranted !== true ||
      !gtoPreflopPackHash(pack.provenance.rawArtifactSha256)) return 'provenance';
  return '';
}

function gtoPreflopPackValidateProductionGate(pack, nodeCount) {
  const solve = pack.solve;
  if (solve.expectedDecisionNodes !== solve.exportedDecisionNodes || solve.exportedDecisionNodes !== nodeCount)
    return 'node-coverage';
  if (!solve.productionReady) {
    if (solve.verificationStatus !== 'unverified_research') return 'research-status';
    return '';
  }
  if (!pack.game.rake || pack.game.rake.kind !== 'none' || pack.game.straddle !== false)
    return 'unsupported-game-rules';
  // Schema v1 intentionally has no automatic multiplayer promotion gate.
  // Standard multiplayer CFR diagnostics are valuable evidence, but do not
  // carry the heads-up zero-sum Nash guarantee. A future audited schema must
  // define that acceptance contract rather than treating a missing metric as 0.
  if (pack.game.activePlayers !== 2) return 'multiplayer-production-unsupported';
  if (solve.verificationStatus !== 'verified_abstract_game' ||
      solve.nashConvMethod !== 'exact-frozen-average-best-response' ||
      !/^[0-9a-f]{40}$/.test(solve.commit) || !gtoPreflopPackHash(solve.validationReportSha256) ||
      !Number.isFinite(solve.nashConvMbbPerHand) || !Number.isFinite(solve.nashConvCi95UpperMbbPerHand) ||
      solve.nashConvMbbPerHand > solve.nashConvCi95UpperMbbPerHand ||
      solve.nashConvCi95UpperMbbPerHand > GTO_PREFLOP_PACK_HU_NASHCONV_LIMIT_MBB ||
      solve.independentSeeds < 3 || !Number.isFinite(solve.seedStrategyL1Max) ||
      solve.seedStrategyL1Max > GTO_PREFLOP_PACK_HU_SEED_L1_LIMIT) return 'production-evidence';
  return '';
}

function gtoPreflopPackCompileAction(action, expectedLength) {
  if (!gtoPreflopPackExactKeys(action, ['actionId', 'type', 'frequencies'],
    ['raiseToMilliBB', 'childNodeId', 'terminal'])) return { error: 'action-shape' };
  if (!gtoPreflopPackString(action.actionId) || !GTO_PREFLOP_PACK_ACTION_TYPES.has(action.type)) return { error: 'action-kind' };
  const sized = action.type === 'raise' || action.type === 'all-in';
  if (sized) {
    if (!gtoPreflopPackPositiveInteger(action.raiseToMilliBB)) return { error: 'action-size' };
  } else if (gtoPreflopPackOwn(action, 'raiseToMilliBB')) return { error: 'action-size' };
  const terminal = action.terminal === true;
  const hasChild = gtoPreflopPackString(action.childNodeId);
  if (gtoPreflopPackOwn(action, 'childNodeId') && action.childNodeId !== null && !hasChild)
    return { error: 'action-child' };
  if (terminal === hasChild || (gtoPreflopPackOwn(action, 'terminal') && typeof action.terminal !== 'boolean'))
    return { error: 'action-child' };
  if (!Array.isArray(action.frequencies) || action.frequencies.length !== expectedLength) return { error: 'frequency-length' };
  if (action.frequencies.some(value => typeof value !== 'number' || !Number.isFinite(value)))
    return { error: 'frequency-value' };
  let frequencies;
  if (expectedLength === GTO_PREFLOP_PACK_CLASSES) frequencies = gtoPreflopPackExpand169(action.frequencies);
  else {
    frequencies = new Float32Array(GTO_PREFLOP_PACK_COMBOS);
    for (let index = 0; index < frequencies.length; index++) {
      const value = Number(action.frequencies[index]);
      if (!Number.isFinite(value)) return { error: 'frequency-value' };
      frequencies[index] = Math.fround(value);
    }
  }
  if (!frequencies) return { error: 'frequency-value' };
  for (let index = 0; index < frequencies.length; index++) {
    if (frequencies[index] < 0 || frequencies[index] > 1) return { error: 'frequency-value' };
  }
  return {
    action: {
      actionId: action.actionId,
      type: action.type,
      raiseToMilliBB: sized ? action.raiseToMilliBB : null,
      childNodeId: hasChild ? action.childNodeId : null,
      terminal,
      frequencies,
    },
  };
}

function gtoPreflopPackCompilePayload(pack) {
  if (!gtoPreflopPackExactKeys(pack.payload, ['nodes']) || !Array.isArray(pack.payload.nodes) || !pack.payload.nodes.length)
    return { error: 'payload-shape' };
  const expectedLength = pack.cards.storage === 'class169-json-v1' ? GTO_PREFLOP_PACK_CLASSES : GTO_PREFLOP_PACK_COMBOS;
  const nodes = new Map();
  for (const sourceNode of pack.payload.nodes) {
    if (!gtoPreflopPackExactKeys(sourceNode,
      ['nodeId', 'parentNodeId', 'actorSeat', 'historyKey', 'actions'])) return { error: 'node-shape' };
    if (!gtoPreflopPackString(sourceNode.nodeId) || nodes.has(sourceNode.nodeId) ||
        !(sourceNode.parentNodeId === null || gtoPreflopPackString(sourceNode.parentNodeId)) ||
        !Number.isSafeInteger(sourceNode.actorSeat) || sourceNode.actorSeat < 0 || sourceNode.actorSeat >= pack.game.activePlayers ||
        typeof sourceNode.historyKey !== 'string' || sourceNode.historyKey.length > 4096 ||
        !Array.isArray(sourceNode.actions) || !sourceNode.actions.length) return { error: 'node-value' };
    const actions = [];
    const actionIds = new Set();
    const actionSemantics = new Set();
    for (const sourceAction of sourceNode.actions) {
      const compiled = gtoPreflopPackCompileAction(sourceAction, expectedLength);
      if (compiled.error) return compiled;
      const action = compiled.action;
      const semantic = action.raiseToMilliBB === null ? action.type : `${action.type}:${action.raiseToMilliBB}`;
      if (actionIds.has(action.actionId) || actionSemantics.has(semantic)) return { error: 'duplicate-action' };
      actionIds.add(action.actionId);
      actionSemantics.add(semantic);
      actions.push(action);
    }
    for (let combo = 0; combo < GTO_PREFLOP_PACK_COMBOS; combo++) {
      let sum = 0;
      for (const action of actions) sum += action.frequencies[combo];
      if (Math.abs(sum - 1) > GTO_PREFLOP_PACK_PROBABILITY_TOLERANCE) return { error: 'frequency-sum' };
    }
    nodes.set(sourceNode.nodeId, {
      nodeId: sourceNode.nodeId,
      parentNodeId: sourceNode.parentNodeId,
      actorSeat: sourceNode.actorSeat,
      historyKey: sourceNode.historyKey,
      actions,
    });
  }
  const root = nodes.get(pack.tree.rootNodeId);
  if (!root || root.parentNodeId !== null || root.historyKey !== '') return { error: 'root-node' };
  const incoming = new Map(Array.from(nodes.keys(), nodeId => [nodeId, 0]));
  for (const node of nodes.values()) {
    for (const action of node.actions) {
      if (action.terminal) continue;
      const child = nodes.get(action.childNodeId);
      if (!child || child.parentNodeId !== node.nodeId) return { error: 'dangling-child' };
      const expectedHistory = node.historyKey ? `${node.historyKey}/${action.actionId}` : action.actionId;
      if (child.historyKey !== expectedHistory) return { error: 'history-key' };
      incoming.set(child.nodeId, incoming.get(child.nodeId) + 1);
    }
  }
  for (const [nodeId, count] of incoming) {
    if (nodeId === root.nodeId ? count !== 0 : count !== 1) return { error: 'tree-parentage' };
  }
  const visited = new Set();
  const visiting = new Set();
  const walk = nodeId => {
    if (visiting.has(nodeId)) return false;
    if (visited.has(nodeId)) return true;
    visiting.add(nodeId);
    for (const action of nodes.get(nodeId).actions) {
      if (!action.terminal && !walk(action.childNodeId)) return false;
    }
    visiting.delete(nodeId);
    visited.add(nodeId);
    return true;
  };
  if (!walk(root.nodeId)) return { error: 'tree-cycle' };
  if (visited.size !== nodes.size) return { error: 'unreachable-node' };
  return { nodes };
}

function gtoPreflopPackFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const child of Object.values(value)) gtoPreflopPackFreeze(child);
  return Object.freeze(value);
}

async function gtoPreflopPackPrepare(rawPack, expectedScenario) {
  let pack;
  try {
    pack = JSON.parse(gtoPreflopPackCanonicalJson(rawPack));
  } catch (error) {
    return gtoPreflopPackUnavailable('pack-json', error && error.message);
  }
  const metadataError = gtoPreflopPackValidateMetadata(pack);
  if (metadataError) return gtoPreflopPackUnavailable(metadataError);
  const scenario = gtoPreflopPackNormalizeScenario(expectedScenario);
  if (scenario.error) return gtoPreflopPackUnavailable(scenario.error);
  if (gtoPreflopPackGameKey(pack.game) !== gtoPreflopPackGameKey(scenario.game))
    return gtoPreflopPackUnavailable('config-mismatch');
  if (scenario.treeId && scenario.treeId !== pack.tree.treeId) return gtoPreflopPackUnavailable('tree-mismatch');
  let calculatedHash;
  try {
    calculatedHash = await gtoPreflopPackSha256(pack.payload);
  } catch (error) {
    return gtoPreflopPackUnavailable('hash-failed', error && error.message);
  }
  if (calculatedHash !== pack.payloadSha256) return gtoPreflopPackUnavailable('payload-hash-mismatch');
  let calculatedManifestHash;
  try {
    calculatedManifestHash = await gtoPreflopPackManifestSha256(pack);
  } catch (error) {
    return gtoPreflopPackUnavailable('manifest-hash-failed', error && error.message);
  }
  if (calculatedManifestHash !== pack.manifestSha256) return gtoPreflopPackUnavailable('manifest-hash-mismatch');
  const compiled = gtoPreflopPackCompilePayload(pack);
  if (compiled.error) return gtoPreflopPackUnavailable(compiled.error);
  const productionError = gtoPreflopPackValidateProductionGate(pack, compiled.nodes.size);
  if (productionError) return gtoPreflopPackUnavailable(productionError);
  if (pack.solve.productionReady && !gtoPreflopPackManifestIsAudited(pack.manifestSha256))
    return gtoPreflopPackUnavailable('untrusted-production-pack');
  const publicPack = gtoPreflopPackFreeze({
    schema: pack.schema,
    schemaVersion: pack.schemaVersion,
    packId: pack.packId,
    payloadSha256: pack.payloadSha256,
    manifestSha256: pack.manifestSha256,
    game: pack.game,
    cards: pack.cards,
    tree: pack.tree,
    solve: pack.solve,
    provenance: pack.provenance,
    rootNodeId: pack.tree.rootNodeId,
    treeId: pack.tree.treeId,
    nodeCount: compiled.nodes.size,
  });
  gtoPreflopPackInternals.set(publicPack, { nodes: compiled.nodes });
  return { ok: true, pack: publicPack };
}

async function gtoPreflopPackRegister(rawPack, expectedScenario) {
  const prepared = await gtoPreflopPackPrepare(rawPack, expectedScenario);
  if (!prepared.ok) return prepared;
  const candidate = prepared.pack;
  if (!candidate.solve.productionReady) return gtoPreflopPackUnavailable('research-pack');
  const existingById = gtoPreflopPackRegistry.get(candidate.packId);
  if (existingById) {
    if (existingById.manifestSha256 === candidate.manifestSha256 && existingById.treeId === candidate.treeId)
      return { ok: true, pack: existingById, alreadyRegistered: true };
    return gtoPreflopPackUnavailable('pack-id-conflict');
  }
  for (const existing of gtoPreflopPackRegistry.values()) {
    if (gtoPreflopPackGameKey(existing.game) === gtoPreflopPackGameKey(candidate.game) && existing.treeId === candidate.treeId)
      return gtoPreflopPackUnavailable('scenario-conflict');
  }
  gtoPreflopPackRegistry.set(candidate.packId, candidate);
  return { ok: true, pack: candidate, alreadyRegistered: false };
}

function gtoPreflopPackForScenario(expectedScenario) {
  const scenario = gtoPreflopPackNormalizeScenario(expectedScenario);
  if (scenario.error) return gtoPreflopPackUnavailable(scenario.error);
  const gameKey = gtoPreflopPackGameKey(scenario.game);
  const matches = Array.from(gtoPreflopPackRegistry.values()).filter(pack =>
    gtoPreflopPackGameKey(pack.game) === gameKey && (!scenario.treeId || pack.treeId === scenario.treeId));
  if (!matches.length) return gtoPreflopPackUnavailable(scenario.treeId ? 'no-matching-policy-pack' : 'no-policy-pack');
  if (matches.length !== 1) return gtoPreflopPackUnavailable('ambiguous-tree');
  return { ok: true, pack: matches[0], packId: matches[0].packId, treeId: matches[0].treeId };
}

function gtoPreflopPackPolicy(pack, nodeId, comboIndex) {
  const internal = gtoPreflopPackInternals.get(pack);
  if (!internal) return gtoPreflopPackUnavailable('unvalidated-pack');
  if (!pack.solve.productionReady) return gtoPreflopPackUnavailable('research-pack');
  const node = internal.nodes.get(nodeId);
  if (!node) return gtoPreflopPackUnavailable('node-not-found');
  const hasCombo = comboIndex !== undefined && comboIndex !== null;
  if (hasCombo && (!Number.isSafeInteger(comboIndex) || comboIndex < 0 || comboIndex >= GTO_PREFLOP_PACK_COMBOS))
    return gtoPreflopPackUnavailable('combo-index');
  const actions = node.actions.map(action => {
    const result = {
      actionId: action.actionId,
      type: action.type,
      childNodeId: action.childNodeId,
      terminal: action.terminal,
      frequencies: new Float32Array(action.frequencies),
    };
    if (action.raiseToMilliBB !== null) result.raiseToMilliBB = action.raiseToMilliBB;
    if (hasCombo) result.probability = action.frequencies[comboIndex];
    return result;
  });
  return {
    ok: true,
    strategyProvider: 'preflop-equilibrium-policy-pack',
    strategyMode: 'equilibrium-baseline',
    rangeExactFrequencies: true,
    packId: pack.packId,
    packSha256: pack.manifestSha256,
    payloadSha256: pack.payloadSha256,
    treeId: pack.treeId,
    nodeId: node.nodeId,
    historyKey: node.historyKey,
    actorSeat: node.actorSeat,
    comboIndex: hasCombo ? comboIndex : null,
    actions,
    comboMix: hasCombo ? actions.map(action => ({
      actionId: action.actionId,
      type: action.type,
      ...(action.raiseToMilliBB === undefined ? {} : { raiseToMilliBB: action.raiseToMilliBB }),
      probability: action.probability,
    })) : null,
  };
}

function gtoPreflopPackNextNode(pack, nodeId, observedAction) {
  const internal = gtoPreflopPackInternals.get(pack);
  if (!internal) return gtoPreflopPackUnavailable('unvalidated-pack');
  if (!pack.solve.productionReady) return gtoPreflopPackUnavailable('research-pack');
  const node = internal.nodes.get(nodeId);
  if (!node) return gtoPreflopPackUnavailable('node-not-found');
  let matched = null;
  if (typeof observedAction === 'string') matched = node.actions.find(action => action.actionId === observedAction) || null;
  else if (gtoPreflopPackPlainObject(observedAction) && GTO_PREFLOP_PACK_ACTION_TYPES.has(observedAction.type)) {
    const sized = observedAction.type === 'raise' || observedAction.type === 'all-in';
    if (sized && !gtoPreflopPackPositiveInteger(observedAction.raiseToMilliBB))
      return gtoPreflopPackUnavailable('observed-action-size');
    matched = node.actions.find(action => action.type === observedAction.type &&
      (sized ? action.raiseToMilliBB === observedAction.raiseToMilliBB : action.raiseToMilliBB === null)) || null;
  } else return gtoPreflopPackUnavailable('observed-action');
  if (!matched) return gtoPreflopPackUnavailable('off-tree-action');
  const action = {
    actionId: matched.actionId,
    type: matched.type,
    ...(matched.raiseToMilliBB === null ? {} : { raiseToMilliBB: matched.raiseToMilliBB }),
  };
  if (matched.terminal) return { ok: true, terminal: true, nodeId: null, action };
  return { ok: true, terminal: false, nodeId: matched.childNodeId, action };
}

const PREFLOP_POLICY_PACK_API = Object.freeze({
  schema: GTO_PREFLOP_PACK_SCHEMA,
  schemaVersion: GTO_PREFLOP_PACK_SCHEMA_VERSION,
  comboCount: GTO_PREFLOP_PACK_COMBOS,
  classCount: GTO_PREFLOP_PACK_CLASSES,
  cardOrder: GTO_PREFLOP_PACK_CARD_ORDER,
  classOrder: GTO_PREFLOP_PACK_CLASS_ORDER,
  expansion: GTO_PREFLOP_PACK_EXPANSION,
  classCodes: gtoPreflopPackClassCodes,
  prepare: gtoPreflopPackPrepare,
  register: gtoPreflopPackRegister,
  forScenario: gtoPreflopPackForScenario,
  policy: gtoPreflopPackPolicy,
  nextNode: gtoPreflopPackNextNode,
  cardId: gtoPreflopPackCardId,
  comboIndex: gtoPreflopPackComboIndex,
  comboClass: gtoPreflopPackComboClass,
  classIndex: gtoPreflopPackClassIndex,
  expand169: gtoPreflopPackExpand169,
  sha256: gtoPreflopPackSha256,
  manifestSha256: gtoPreflopPackManifestSha256,
  trust: Object.freeze({
    kind: 'embedded-manifest-sha256-allowlist',
    auditedManifestSha256: GTO_PREFLOP_PACK_AUDITED_MANIFEST_SHA256,
  }),
});

if (typeof globalThis !== 'undefined') globalThis.PREFLOP_POLICY_PACK_API = PREFLOP_POLICY_PACK_API;
