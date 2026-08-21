// Strategy provider for exact heads-up postflop solving.
// Engine: b-inary/postflop-solver via the official b-inary/wasm-postflop build.

const GTO_ENGINE_META = Object.freeze({
  name: 'b-inary postflop-solver',
  engineRepo: 'https://github.com/b-inary/postflop-solver',
  engineCommit: '9d1509fe5077d019825f833eed04b16d342dfda1',
  wasmRepo: 'https://github.com/b-inary/wasm-postflop',
  wasmCommit: '97360db7644329b1c23a7adf06e9aa59406e4d4b',
  license: 'AGPL-3.0-or-later',
  mode: 'heads-up postflop chip-EV',
});

const GTO_PROVIDER_VERSION = 5;
const GTO_CACHE_KEY = 'sg_solver_cache_v5';
const GTO_CACHE_LIMIT = 48;
const GTO_CACHE_DISK_CHAR_LIMIT = 800000;
const GTO_MEMORY_LIMIT = 512 * 1024 * 1024;
const GTO_ASSET_VERSION = 97;
const GTO_WORKER_INIT_TIMEOUT = 15000;
const GTO_HAS_BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined';

let gtoWorker = null;
let gtoProxy = null;
let gtoHandler = null;
let gtoHandlerPromise = null;
let gtoComlinkPromise = null;
let gtoDirectModulePromise = null;
let gtoHandlerTransport = null;
let gtoPreferDirect = false;
let gtoActive = null;
let gtoPending = null;
let gtoGeneration = 0;
let gtoCacheLoaded = false;
let gtoPanelResult = null;
let gtoNodeQueue = Promise.resolve();
const gtoRequestJobs = new Map();
const gtoTerminalNodeFailures = new Map();
const gtoMemoryCache = new Map();
const gtoRuntime = {
  phase: 'idle',
  message: '',
  iterations: 0,
  exploitability: null,
  memoryBytes: 0,
  compactTree: false,
};

function solverText(key) {
  const table = {
    en: {
      title: 'Postflop equilibrium solver',
      ready: 'Solved with b-inary postflop-solver.',
      pending: 'Solving this node in the browser…',
      retrying: 'The exact solve was interrupted. Restarting it automatically…',
      loading: 'Loading the solver…',
      building: 'Building the game tree…',
      memory: 'Allocating solver memory…',
      iterating: 'Running CFR iterations…',
      multiway: 'Exact solver unavailable: this hand is multiway. Using the range-aware heuristic fallback.',
      preflop: 'Preflop is handled by its policy provider; this WASM engine is postflop only.',
      icm: 'Exact chip-EV would ignore meaningful ICM pressure, so the ICM-aware fallback remains authoritative.',
      allin: 'This postflop betting-tree solver does not cover an all-in node. The range/equity fallback handles the remaining call-or-fold decision.',
      state: 'The street began before solver tracking was available. Using the heuristic fallback for this node.',
      ranges: 'No trustworthy preflop reach is available for this exact line and configuration. It was not replaced with personality estimates; using the heuristic fallback.',
      reach: 'The previous postflop street was not solved through this exact line and runout. Personality estimates were not substituted; using the heuristic fallback.',
      browser: 'The WASM solver is unavailable in this browser. Using the heuristic fallback.',
      protocol: 'The WASM solver requires the game to be served over HTTP or HTTPS; it cannot run from a local file URL.',
      memoryFail: 'This tree exceeds the browser memory budget. Using the heuristic fallback.',
      convergence: 'The solver did not reach its exploitability target. Using the heuristic fallback.',
      line: 'The exact action or sizing is not present in this tree. It was not mapped to a nearby node; using the heuristic fallback.',
      lineUnavailable: 'The exact action or sizing could not be replayed in this tree. No recommendation is shown for this covered node.',
      rangesUnavailable: 'The solver returned no trustworthy reach or hand strategy for this node. No recommendation is shown.',
      error: 'The exact solver could not finish this node. Using the heuristic fallback.',
      approximateExact: 'Both providers solve declared discrete abstractions; this is a validated approximate equilibrium, not unrestricted poker.',
      approximateConditional: 'This postflop node converged, but its preflop prior is heuristic; it is not an end-to-end GTO solution.',
      exploit: 'exploitability',
      iterations: 'iterations',
      cache: 'cached result',
      mix: 'Recommended mix',
      sourceExact: 'Equilibrium for this heads-up chip-EV tree, conditioned on the audited preflop policy-pack reach',
      sourceConditional: 'Postflop equilibrium for this heads-up chip-EV tree, conditioned on heuristic personality-free chart reach',
      solverReason: 'For your hand, the resolved CFR strategy mixes {mix}. The primary suggestion is the highest-frequency branch; every displayed positive-frequency branch belongs to the mix.',
    },
    fr: {
      title: 'Solveur d’équilibre post-flop',
      ready: 'Résolu avec b-inary postflop-solver.',
      pending: 'Résolution de ce nœud dans le navigateur…',
      retrying: 'La résolution exacte a été interrompue. Redémarrage automatique…',
      loading: 'Chargement du solveur…',
      building: 'Construction de l’arbre de jeu…',
      memory: 'Allocation de la mémoire…',
      iterating: 'Itérations CFR en cours…',
      multiway: 'Solveur exact indisponible : le coup est multiway. Le fallback heuristique sensible aux ranges est utilisé.',
      preflop: 'Le préflop est géré par son fournisseur de politique ; ce moteur WASM est uniquement post-flop.',
      icm: 'Le chip-EV exact ignorerait une pression ICM importante ; le fallback ICM reste donc prioritaire.',
      allin: 'Ce solveur d’arbre de mises post-flop ne couvre pas les nœuds à tapis. Le fallback range/équité traite la décision restante de payer ou se coucher.',
      state: 'La street a commencé avant le suivi du solveur. Le fallback heuristique est utilisé pour ce nœud.',
      ranges: 'Aucun reach préflop fiable n’est disponible pour cette ligne et cette configuration exactes. Aucune estimation liée au profil n’a été substituée ; le fallback heuristique est utilisé.',
      reach: 'La street post-flop précédente n’a pas été résolue jusqu’à cette ligne et ce runout exacts. Aucune estimation liée au profil n’a été substituée ; le fallback heuristique est utilisé.',
      browser: 'Le solveur WASM est indisponible dans ce navigateur. Le fallback heuristique est utilisé.',
      protocol: 'Le solveur WASM exige que le jeu soit servi en HTTP ou HTTPS ; il ne peut pas fonctionner depuis une URL de fichier local.',
      memoryFail: 'Cet arbre dépasse le budget mémoire du navigateur. Le fallback heuristique est utilisé.',
      convergence: 'Le solveur n’a pas atteint sa cible d’exploitabilité. Le fallback heuristique est utilisé.',
      line: 'L’action ou le sizing exact n’existe pas dans cet arbre. Aucun nœud voisin n’a été substitué ; le fallback heuristique est utilisé.',
      lineUnavailable: 'L’action ou le sizing exact n’a pas pu être rejoué dans cet arbre. Aucune recommandation n’est affichée pour ce nœud couvert.',
      rangesUnavailable: 'Le solveur n’a renvoyé aucun reach ni stratégie de main fiable pour ce nœud. Aucune recommandation n’est affichée.',
      error: 'Le solveur exact n’a pas terminé ce nœud. Le fallback heuristique est utilisé.',
      approximateExact: 'Les deux fournisseurs résolvent des abstractions discrètes déclarées ; il s’agit d’un équilibre approximatif validé, pas du poker sans restriction.',
      approximateConditional: 'Ce nœud post-flop a convergé, mais son prior préflop est heuristique ; ce n’est pas une solution GTO de bout en bout.',
      exploit: 'exploitabilité',
      iterations: 'itérations',
      cache: 'résultat en cache',
      mix: 'Mix recommandé',
      sourceExact: 'Équilibre de cet arbre heads-up en chip-EV, conditionné par le reach du pack de politique préflop audité',
      sourceConditional: 'Équilibre post-flop de cet arbre heads-up en chip-EV, conditionné par le reach heuristique de chartes indépendantes des profils',
      solverReason: 'Pour votre main, la stratégie CFR résolue mélange {mix}. La suggestion principale est la branche la plus fréquente ; chaque branche affichée avec une fréquence positive appartient au mix.',
    },
    es: {
      title: 'Solver de equilibrio postflop',
      ready: 'Resuelto con b-inary postflop-solver.',
      pending: 'Resolviendo este nodo en el navegador…',
      retrying: 'La resolución exacta se interrumpió. Reiniciándola automáticamente…',
      loading: 'Cargando el solver…',
      building: 'Construyendo el árbol…',
      memory: 'Reservando memoria del solver…',
      iterating: 'Ejecutando iteraciones CFR…',
      multiway: 'Solver exacto no disponible: la mano es multiway. Se usa el fallback heurístico sensible a rangos.',
      preflop: 'El preflop lo gestiona su proveedor de políticas; este motor WASM solo resuelve postflop.',
      icm: 'El chip-EV exacto ignoraría una presión ICM importante, así que el fallback con ICM sigue siendo autoritativo.',
      allin: 'Este solver del árbol de apuestas postflop no cubre nodos all-in. El fallback de rango/equity gestiona la decisión restante de igualar o retirarse.',
      state: 'La calle empezó antes del seguimiento del solver. Se usa el fallback heurístico para este nodo.',
      ranges: 'No hay un alcance preflop fiable para esta línea y configuración exactas. No se sustituyó por estimaciones de personalidad; se usa el fallback heurístico.',
      reach: 'La calle postflop anterior no se resolvió hasta esta línea y runout exactos. No se sustituyeron estimaciones de personalidad; se usa el fallback heurístico.',
      browser: 'El solver WASM no está disponible en este navegador. Se usa el fallback heurístico.',
      protocol: 'El solver WASM necesita que el juego se sirva por HTTP o HTTPS; no puede ejecutarse desde una URL de archivo local.',
      memoryFail: 'Este árbol supera el límite de memoria del navegador. Se usa el fallback heurístico.',
      convergence: 'El solver no alcanzó su objetivo de explotabilidad. Se usa el fallback heurístico.',
      line: 'La acción o el tamaño exacto no existe en este árbol. No se sustituyó por un nodo cercano; se usa el fallback heurístico.',
      lineUnavailable: 'La acción o el tamaño exacto no pudo reproducirse en este árbol. No se muestra ninguna recomendación para este nodo cubierto.',
      rangesUnavailable: 'El solver no devolvió un alcance ni una estrategia de mano fiables para este nodo. No se muestra ninguna recomendación.',
      error: 'El solver exacto no pudo terminar este nodo. Se usa el fallback heurístico.',
      approximateExact: 'Ambos proveedores resuelven abstracciones discretas declaradas; es un equilibrio aproximado validado, no póker sin restricciones.',
      approximateConditional: 'Este nodo postflop convergió, pero su prior preflop es heurístico; no es una solución GTO de principio a fin.',
      exploit: 'explotabilidad',
      iterations: 'iteraciones',
      cache: 'resultado en caché',
      mix: 'Mezcla recomendada',
      sourceExact: 'Equilibrio de este árbol heads-up de chip-EV, condicionado por el alcance del pack de política preflop auditado',
      sourceConditional: 'Equilibrio postflop de este árbol heads-up de chip-EV, condicionado por el alcance heurístico de tablas independientes de perfiles',
      solverReason: 'Para tu mano, la estrategia CFR resuelta mezcla {mix}. La sugerencia principal es la rama más frecuente; cada rama mostrada con frecuencia positiva pertenece a la mezcla.',
    },
  };
  const language = typeof lang === 'string' && table[lang] ? lang : 'en';
  return table[language][key] || table.en[key] || key;
}

function solverHash(input) {
  const text = typeof input === 'string' ? input : JSON.stringify(input);
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function solverLoadCache() {
  if (gtoCacheLoaded) return;
  gtoCacheLoaded = true;
  if (!GTO_HAS_BROWSER) return;
  try {
    /* These are rebuildable solver caches. Older schemas do not contain the
       current-node reach matrices and must never be mistaken for v5 output. */
    localStorage.removeItem('sg_solver_cache_v3');
    localStorage.removeItem('sg_solver_cache_v4');
    const parsed = JSON.parse(localStorage.getItem(GTO_CACHE_KEY) || '[]');
    const entries = Array.isArray(parsed) ? parsed.slice(-GTO_CACHE_LIMIT) : [];
    entries.forEach(entry => {
      if (entry && entry.key && entry.value) gtoMemoryCache.set(entry.key, entry.value);
    });
  } catch (_) { /* an unavailable cache must never disable coaching */ }
}

function solverSaveCache(key, value) {
  solverLoadCache();
  gtoMemoryCache.delete(key);
  gtoMemoryCache.set(key, value);
  while (gtoMemoryCache.size > GTO_CACHE_LIMIT) {
    gtoMemoryCache.delete(gtoMemoryCache.keys().next().value);
  }
  if (!GTO_HAS_BROWSER) return;
  let entries = [...gtoMemoryCache.entries()].map(([cacheKey, cacheValue]) => ({ key: cacheKey, value: cacheValue }));
  /* Node reach is persisted as compact binary, but keep a firm disk ceiling so
     this rebuildable cache cannot crowd out hand-resume data. Prefer newest LRU
     entries and retain the full in-memory cache even if storage is constrained. */
  while (entries.length > 1 && JSON.stringify(entries).length > GTO_CACHE_DISK_CHAR_LIMIT) entries.shift();
  while (entries.length) {
    try {
      localStorage.setItem(GTO_CACHE_KEY, JSON.stringify(entries));
      break;
    } catch (_) {
      if (entries.length === 1) break;
      entries.splice(0, Math.max(1, Math.ceil(entries.length / 4)));
    }
  }
}

function solverReadCache(key) {
  solverLoadCache();
  const hit = gtoMemoryCache.get(key);
  if (!hit) return null;
  gtoMemoryCache.delete(key);
  gtoMemoryCache.set(key, hit);
  return hit;
}

function solverCardId(card) {
  if (!card || !Number.isFinite(card.r) || !Number.isFinite(card.s)) return -1;
  // App: spade, heart, diamond, club. Solver: club, diamond, heart, spade.
  return 4 * (card.r - 2) + (3 - card.s);
}

function solverPairIndex(cardA, cardB) {
  let c1 = Math.min(cardA, cardB);
  let c2 = Math.max(cardA, cardB);
  return c1 * (101 - c1) / 2 + c2 - 1;
}

const SOLVER_REACH_COMBOS = 1326;
const SOLVER_BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function solverBytesToBase64(bytes) {
  if (typeof btoa === 'function') {
    let binary = '';
    for (let offset = 0; offset < bytes.length; offset += 0x4000)
      binary += String.fromCharCode(...bytes.subarray(offset, Math.min(offset + 0x4000, bytes.length)));
    return btoa(binary);
  }
  let encoded = '';
  for (let index = 0; index < bytes.length; index += 3) {
    const first = bytes[index];
    const hasSecond = index + 1 < bytes.length;
    const hasThird = index + 2 < bytes.length;
    const second = hasSecond ? bytes[index + 1] : 0;
    const third = hasThird ? bytes[index + 2] : 0;
    encoded += SOLVER_BASE64_ALPHABET[first >>> 2];
    encoded += SOLVER_BASE64_ALPHABET[((first & 3) << 4) | (second >>> 4)];
    encoded += hasSecond ? SOLVER_BASE64_ALPHABET[((second & 15) << 2) | (third >>> 6)] : '=';
    encoded += hasThird ? SOLVER_BASE64_ALPHABET[third & 63] : '=';
  }
  return encoded;
}

function solverBase64ToBytes(encoded) {
  if (typeof encoded !== 'string' || encoded.length % 4 !== 0 ||
      !/^[A-Za-z0-9+/]*={0,2}$/.test(encoded) || /=[A-Za-z0-9+/]/.test(encoded)) return null;
  try {
    if (typeof atob === 'function') {
      const binary = atob(encoded);
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
      return bytes;
    }
  } catch (_) { return null; }
  const padding = encoded.endsWith('==') ? 2 : encoded.endsWith('=') ? 1 : 0;
  const bytes = new Uint8Array(encoded.length / 4 * 3 - padding);
  let cursor = 0;
  for (let index = 0; index < encoded.length; index += 4) {
    const first = SOLVER_BASE64_ALPHABET.indexOf(encoded[index]);
    const second = SOLVER_BASE64_ALPHABET.indexOf(encoded[index + 1]);
    const third = encoded[index + 2] === '=' ? 0 : SOLVER_BASE64_ALPHABET.indexOf(encoded[index + 2]);
    const fourth = encoded[index + 3] === '=' ? 0 : SOLVER_BASE64_ALPHABET.indexOf(encoded[index + 3]);
    if (first < 0 || second < 0 || third < 0 || fourth < 0) return null;
    const value = (first << 18) | (second << 12) | (third << 6) | fourth;
    if (cursor < bytes.length) bytes[cursor++] = value >>> 16;
    if (cursor < bytes.length) bytes[cursor++] = value >>> 8 & 255;
    if (cursor < bytes.length) bytes[cursor++] = value & 255;
  }
  return bytes;
}

/* Reach arrays are duplicated across cached hero-card queries. Preserve every
   Float32 bit while choosing a sparse representation when it is actually
   smaller. The explicit little-endian format is stable across runtimes. */
function solverPackReachRange(raw) {
  if (!raw || Number(raw.length) !== SOLVER_REACH_COMBOS) return null;
  let positive = 0;
  for (let index = 0; index < SOLVER_REACH_COMBOS; index++) {
    const value = Number(raw[index]);
    if (!Number.isFinite(value) || value < 0) return null;
    if (value > 0) positive++;
  }
  const sparse = positive * 6 < SOLVER_REACH_COMBOS * 4;
  const bytes = new Uint8Array(sparse ? positive * 6 : SOLVER_REACH_COMBOS * 4);
  const view = new DataView(bytes.buffer);
  let cursor = 0;
  for (let index = 0; index < SOLVER_REACH_COMBOS; index++) {
    const value = Number(raw[index]);
    if (sparse && !(value > 0)) continue;
    if (sparse) {
      view.setUint16(cursor, index, true);
      view.setFloat32(cursor + 2, value, true);
      cursor += 6;
    } else {
      view.setFloat32(index * 4, value, true);
    }
  }
  return { v: 1, f: sparse ? 's' : 'd', b: solverBytesToBase64(bytes) };
}

function solverUnpackReachRange(packed) {
  if (!packed || packed.v !== 1 || !['s', 'd'].includes(packed.f)) return null;
  const bytes = solverBase64ToBytes(packed.b);
  if (!bytes || (packed.f === 'd' ? bytes.length !== SOLVER_REACH_COMBOS * 4 : bytes.length % 6 !== 0)) return null;
  const raw = new Float32Array(SOLVER_REACH_COMBOS);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (packed.f === 'd') {
    for (let index = 0; index < SOLVER_REACH_COMBOS; index++) {
      const value = view.getFloat32(index * 4, true);
      if (!Number.isFinite(value) || value < 0) return null;
      raw[index] = value;
    }
    return raw;
  }
  let previous = -1;
  for (let cursor = 0; cursor < bytes.length; cursor += 6) {
    const index = view.getUint16(cursor, true);
    const value = view.getFloat32(cursor + 2, true);
    if (index <= previous || index >= SOLVER_REACH_COMBOS || !Number.isFinite(value) || !(value > 0)) return null;
    raw[index] = value;
    previous = index;
  }
  return raw;
}

function solverRangeSignature(raw) {
  const bytes = new Uint8Array(raw.buffer, raw.byteOffset, raw.byteLength);
  let first = 2166136261;
  let second = 2246822519;
  for (let i = 0; i < bytes.length; i++) {
    first ^= bytes[i];
    first = Math.imul(first, 16777619);
    second ^= bytes[i] + (i & 255);
    second = Math.imul(second, 3266489917);
  }
  return `${(first >>> 0).toString(36)}.${(second >>> 0).toString(36)}`;
}

function solverPlayersInPostflopOrder(players) {
  if (typeof state === 'undefined') return [];
  const result = [];
  for (let offset = 1; offset <= state.players.length; offset++) {
    const seat = (state.dealerIdx + offset) % state.players.length;
    const player = players.find(candidate => candidate.i === seat);
    if (player) result.push(player);
  }
  return result;
}

function solverReachRange(privateCards, weights) {
  const raw = new Float32Array(1326);
  let maximum = 0;
  for (let index = 0; index < privateCards.length; index++) {
    const encoded = Number(privateCards[index]);
    const first = encoded & 255;
    const second = encoded >>> 8;
    const weight = Math.max(0, Number(weights[index]) || 0);
    raw[solverPairIndex(first, second)] = weight;
    maximum = Math.max(maximum, weight);
  }
  if (!(maximum > 0)) return null;
  if (maximum !== 1) for (let index = 0; index < raw.length; index++) raw[index] /= maximum;
  return raw;
}

async function solverCarryReach(previousStreet, nextBoard) {
  if (!previousStreet || !previousStreet.supported || !Array.isArray(previousStreet.rangeRaw) || previousStreet.rangeRaw.length !== 2 ||
      !gtoActive || !gtoActive.converged || !gtoActive.handler) {
    return { ok: false, reason: 'reach' };
  }
  if (solverBaseKey(previousStreet, gtoActive.config) !== gtoActive.baseKey) {
    return { ok: false, reason: 'reach' };
  }
  const job = gtoNodeQueue.then(async () => {
    if (!gtoActive || solverBaseKey(previousStreet, gtoActive.config) !== gtoActive.baseKey) {
      return { ok: false, reason: 'reach' };
    }
    try {
      const handler = gtoActive.handler;
      const indices = await solverReplayHistory(handler, previousStreet.actions);
      if (await handler.currentPlayer() !== 'chance') return { ok: false, reason: 'reach' };
      const dealtCard = solverCardId(nextBoard[nextBoard.length - 1]);
      const possibleCards = BigInt(await handler.possibleCards());
      if (dealtCard < 0 || !(possibleCards & (1n << BigInt(dealtCard)))) return { ok: false, reason: 'reach' };
      await handler.applyHistory(new Uint32Array([...indices, dealtCard]));
      const currentPlayer = await handler.currentPlayer();
      if (!['oop', 'ip'].includes(currentPlayer)) return { ok: false, reason: 'reach' };
      const cardsOop = new Uint16Array(await handler.privateCards(0));
      const cardsIp = new Uint16Array(await handler.privateCards(1));
      const numActions = Number(await handler.numActions());
      const resultBuffer = await handler.getResults();
      const parsed = solverParseResults(resultBuffer, cardsOop, cardsIp, currentPlayer === 'oop' ? 0 : 1, numActions);
      const ranges = [
        solverReachRange(cardsOop, parsed.weights[0]),
        solverReachRange(cardsIp, parsed.weights[1]),
      ];
      if (!ranges[0] || !ranges[1]) return { ok: false, reason: 'reach' };
      return {
        ok: true,
        ranges,
        /* Preserve the original preflop pack/chart identity across streets;
           the exactness label and cache must not lose provenance on the turn. */
        source: previousStreet.rangeSource || 'equilibrium-reach-propagation',
        line: previousStreet.rangeLine || null,
        nodes: previousStreet.rangeNodes || [],
        exactFrequencies: previousStreet.rangeExactFrequencies === true,
      };
    } catch (_) {
      return { ok: false, reason: 'reach' };
    }
  });
  gtoNodeQueue = job.catch(() => {});
  return job;
}

function solverCompletedRangeHistory(previousStreet, playerSeats) {
  if (typeof state === 'undefined') return [];
  if (state.stage === 'flop') {
    const seats = new Set(playerSeats || []);
    const actions = state.gtoPreflop && Array.isArray(state.gtoPreflop.actions) ? state.gtoPreflop.actions : [];
    return actions.filter(action => action && action.action !== 'fold' && seats.has(action.seat)).map(action => ({
      ...action, street: 'preflop', targetBB: Number(action.targetBB || 0), callBB: Number(action.callBB || 0),
      raiseOrdinal: action.action === 'raise' ? Number(action.raisesBefore || 0) + 1 : 0,
    }));
  }
  if (!previousStreet) return [];
  return [...(previousStreet.actionHistory || []), ...(previousStreet.actions || [])].map(action => ({ ...action }));
}

async function solverBeginStreet() {
  if (typeof state === 'undefined') return;
  if (state.stage === 'preflop' || state.stage === 'showdown') {
    state.solverStreet = null;
    return;
  }
  const live = state.players.filter(player => !player.folded);
  const active = live.filter(player => !player.allIn);
  const ordered = solverPlayersInPostflopOrder(live);
  const structurallySupported = live.length === 2 && active.length === 2;
  const previousStreet = state.solverStreet;
  let baseline = { ok: false, reason: state.stage === 'flop' ? 'ranges' : 'reach' };
  if (structurallySupported) {
    if (state.stage === 'flop' && typeof gtoPreflopRangesFor === 'function') baseline = gtoPreflopRangesFor(ordered);
    else if (state.stage === 'turn' || state.stage === 'river') baseline = await solverCarryReach(previousStreet, state.board);
  }
  const supported = structurallySupported && baseline.ok;
  const baselineReason = baseline.reason || (structurallySupported ? 'ranges' : 'state');
  state.solverStreet = {
    handId: state.handNum || 0,
    stage: state.stage,
    board: state.board.map(card => ({ r: card.r, s: card.s })),
    startingPot: Math.max(1, Math.round(state.players.reduce((sum, player) => sum + (player.totalBet || 0), 0))),
    effectiveStack: supported ? Math.max(1, Math.round(Math.min(ordered[0].chips, ordered[1].chips))) : 0,
    playerSeats: ordered.map(player => player.i),
    rangeRaw: supported ? baseline.ranges : [],
    rangeSource: supported ? baseline.source : null,
    rangeLine: supported ? (baseline.line || null) : null,
    rangeNodes: supported ? (baseline.nodes || []) : [],
    rangeExactFrequencies: supported && baseline.exactFrequencies === true,
    actionHistory: solverCompletedRangeHistory(previousStreet, ordered.map(player => player.i)),
    actions: [],
    supported,
    reason: supported ? null : ((String(baselineReason).startsWith('preflop-') ||
      String(baselineReason).startsWith('gto-unavailable:')) ? 'ranges' : baselineReason),
    rangeReason: supported ? null : baseline.reason || null,
  };
  /* Finish the range-resolved base tree before action resumes. Besides ensuring
     that the first recommendation is solved, this keeps an authoritative tree
     alive so the exact reach can always be carried to the next runout. */
  const decisionPlayer = ordered.find(player => !player.allIn);
  if (decisionPlayer && solverSupport(decisionPlayer, null).ok)
    await solverEnsureBaseReliable(state.solverStreet);
}

function solverObserveAction(player, action, rangeContext) {
  if (typeof state === 'undefined' || state.stage === 'showdown') return;
  if (state.stage === 'preflop') {
    if (typeof gtoPreflopObserveAction === 'function') gtoPreflopObserveAction(player, action, rangeContext);
    return;
  }
  const street = state.solverStreet;
  if (!street || street.stage !== state.stage || !street.playerSeats.includes(player.i)) return;
  const checked = action === 'call' && Number(rangeContext && rangeContext.callAmt || 0) <= 0;
  const aggressiveAllIn = action === 'raise' && Boolean(rangeContext && rangeContext.isAllIn);
  const canonical = checked ? 'check'
    : (action === 'allin' || aggressiveAllIn) ? 'allin'
    : action === 'raise' ? ((rangeContext && rangeContext.cbBefore > 0) ? 'raise' : 'bet')
      : action;
  street.actions.push({
    seat: player.i,
    street: state.stage,
    action: canonical,
    target: Math.max(0, Math.round(player.bet || 0)),
    invested: Math.max(0, Math.round((rangeContext && rangeContext.investment) || 0)),
    potBefore: Math.max(1, Math.round((rangeContext && rangeContext.potBefore) || 1)),
    currentBetBefore: Math.max(0, Math.round((rangeContext && rangeContext.cbBefore) || 0)),
    ratio: Number((rangeContext && rangeContext.actionPotRatio) || 0),
  });
}

function solverTournamentIcmActive(result) {
  if (result && result.icmActive === true) return true;
  try {
    if (typeof isCashGame === 'function' && isCashGame()) return false;
    const live = state.players.filter(candidate => !candidate.out);
    if (live.length <= 2) return false;
    if (typeof PAYOUTS !== 'function') return true;
    return PAYOUTS(state.cfg && state.cfg.numPlayers || live.length).length > 1;
  } catch (_) { return false; }
}

function solverRuntimeUnavailableReason(environment = {}) {
  /* A Worker is preferred, but it is not a hard requirement. Some embedded
     browser hosts omit or block Worker while still providing WebAssembly. In
     that case the same pinned single-thread engine runs on the main thread. */
  if (!environment.browser || !environment.webAssembly) return 'browser';
  if (environment.protocol === 'file:') return 'protocol';
  return null;
}

function solverSupport(player, result) {
  if (typeof state === 'undefined' || state.stage === 'preflop') return { ok: false, reason: 'preflop' };
  const runtimeReason = solverRuntimeUnavailableReason({
    browser: GTO_HAS_BROWSER,
    worker: typeof Worker !== 'undefined',
    webAssembly: typeof WebAssembly !== 'undefined',
    protocol: GTO_HAS_BROWSER && typeof location !== 'undefined' ? location.protocol : '',
  });
  if (runtimeReason) return { ok: false, reason: runtimeReason };
  const live = state.players.filter(candidate => !candidate.folded);
  if (live.length !== 2) return { ok: false, reason: 'multiway' };
  if (live.some(candidate => candidate.allIn)) return { ok: false, reason: 'allin' };
  if (solverTournamentIcmActive(result) || (result && Number(result.icmPrem || 0) > 0)) return { ok: false, reason: 'icm' };
  const street = state.solverStreet;
  if (street && street.playerSeats && street.playerSeats.length !== 2) return { ok: false, reason: 'multiway' };
  if (!street || street.stage !== state.stage) return { ok: false, reason: 'state' };
  if (!street.supported) return { ok: false, reason: street.reason || 'state' };
  if (!street.playerSeats.includes(player.i)) return { ok: false, reason: 'state' };
  if (!street.rangeSource || !Array.isArray(street.rangeRaw) || street.rangeRaw.length !== 2) return { ok: false, reason: 'ranges' };
  if (player && player.hole && player.hole.length === 2) {
    const playerIndex = street.playerSeats.indexOf(player.i);
    const handIndex = solverPairIndex(solverCardId(player.hole[0]), solverCardId(player.hole[1]));
    if (!(street.rangeRaw[playerIndex][handIndex] > 0)) return { ok: false, reason: 'ranges' };
  }
  return { ok: true, street };
}

function solverNumberToken(value) {
  return String(Math.round(value * 100) / 100);
}

function solverPercentString(values) {
  return [...new Set(values.map(value => Math.round(value * 100) / 100).filter(value => value >= 5 && value <= 500))]
    .sort((a, b) => a - b).map(value => `${solverNumberToken(value)}%`).join(',');
}

function solverRaiseString(values) {
  return [...new Set(values.map(value => Math.round(value * 100) / 100).filter(value => value > 1 && value <= 20))]
    .sort((a, b) => a - b).map(value => `${solverNumberToken(value)}x`).join(',');
}

function solverTreeConfig(street, compact) {
  const observed = Object.create(null);
  const stageName = street.stage.charAt(0).toUpperCase() + street.stage.slice(1);
  for (const item of street.actions) {
    const playerIndex = street.playerSeats.indexOf(item.seat);
    if (playerIndex < 0) continue;
    const role = playerIndex === 0 ? 'oop' : 'ip';
    if (item.action === 'bet') {
      const key = `${role}${stageName}Bet`;
      (observed[key] ||= []).push(100 * item.invested / Math.max(1, item.potBefore));
    } else if (item.action === 'raise' && item.currentBetBefore > 0) {
      const key = `${role}${stageName}Raise`;
      (observed[key] ||= []).push(item.target / item.currentBetBefore);
    }
  }
  const small = compact ? [67] : [33, 67];
  const medium = compact ? [67] : [50, 75];
  const river = compact ? [75] : [50, 75, 100];
  const raises = [2.5];
  const betsFor = (key, defaults) => solverPercentString([...defaults, ...(observed[key] || [])]);
  const raisesFor = key => solverRaiseString([...raises, ...(observed[key] || [])]);
  return {
    oopFlopBet: betsFor('oopFlopBet', small), oopFlopRaise: raisesFor('oopFlopRaise'),
    oopTurnBet: betsFor('oopTurnBet', medium), oopTurnRaise: raisesFor('oopTurnRaise'), oopTurnDonk: compact ? '67%' : '50%,67%',
    oopRiverBet: betsFor('oopRiverBet', river), oopRiverRaise: raisesFor('oopRiverRaise'), oopRiverDonk: compact ? '75%' : '50%,75%',
    ipFlopBet: betsFor('ipFlopBet', small), ipFlopRaise: raisesFor('ipFlopRaise'),
    ipTurnBet: betsFor('ipTurnBet', medium), ipTurnRaise: raisesFor('ipTurnRaise'),
    ipRiverBet: betsFor('ipRiverBet', river), ipRiverRaise: raisesFor('ipRiverRaise'),
  };
}

function solverBaseKey(street, config) {
  return [
    GTO_PROVIDER_VERSION, GTO_ENGINE_META.engineCommit.slice(0, 12), GTO_ENGINE_META.wasmCommit.slice(0, 12), street.stage,
    street.board.map(solverCardId).join('.'), street.startingPot, street.effectiveStack,
    solverRangeSignature(street.rangeRaw[0]), solverRangeSignature(street.rangeRaw[1]),
    solverHash(solverRangeProvenance(street)),
    solverHash(config),
  ].join('|');
}

function solverRangeProvenance(street) {
  return {
    rangeExactFrequencies: street && street.rangeExactFrequencies === true,
    rangeSource: street && street.rangeSource || null,
    rangeLine: street && street.rangeLine || null,
    rangeNodes: street && Array.isArray(street.rangeNodes) ? street.rangeNodes : [],
  };
}

function solverRangeProvenanceMatches(result, street) {
  if (!result || !street) return false;
  const expected = solverRangeProvenance(street);
  const actual = solverRangeProvenance(result);
  return expected.rangeExactFrequencies === actual.rangeExactFrequencies &&
    expected.rangeSource === actual.rangeSource && expected.rangeLine === actual.rangeLine &&
    solverHash(expected.rangeNodes) === solverHash(actual.rangeNodes);
}

function solverSpotKey(street, player, baseKey) {
  const cards = player && player.hole ? player.hole.map(solverCardId).sort((a, b) => a - b) : [];
  const history = street.actions.map(item => `${item.seat}:${item.action}:${item.target}`).join('/');
  return `node|${baseKey}|${history}|${player ? player.i : '-'}|${cards.join('.')}`;
}

function solverRequestSignature(street, player) {
  if (!street || !player) return '';
  const board = (street.board || []).map(solverCardId).join('.');
  const actions = (street.actions || []).map(item => `${item.seat}:${item.action}:${item.target}`).join('/');
  const cards = (player.hole || []).map(solverCardId).sort((a, b) => a - b).join('.');
  return `${street.handId}|${street.stage}|${board}|${actions}|${player.i}|${cards}`;
}

function solverTerminalNodeFailureReason(error) {
  const message = String(error && error.message || error || '');
  if (/^(unmapped-action|solver-player-mismatch|solver-action-state-mismatch|solver-no-legal-action)/.test(message))
    return 'line';
  if (/^(solver-hand-not-in-range|solver-empty-strategy|solver-invalid-strategy|solver-invalid-equity|solver-empty-reach)/.test(message))
    return 'ranges';
  return null;
}

function solverSetRuntime(patch) {
  Object.assign(gtoRuntime, patch);
  if (!GTO_HAS_BROWSER) return;
  const panel = document.getElementById('gtoBox');
  if (panel && panel.dataset.provider !== 'preflop-equilibrium' && typeof solverPanelHtml === 'function')
    panel.innerHTML = solverPanelHtml(gtoPanelResult);
  try { window.dispatchEvent(new CustomEvent('gto-solver-status', { detail: { ...gtoRuntime } })); } catch (_) {}
}

function solverTerminate() {
  if (gtoWorker) gtoWorker.terminate();
  if (gtoHandlerTransport === 'direct' && gtoHandler && gtoHandler.game &&
      typeof gtoHandler.game.free === 'function') {
    try { gtoHandler.game.free(); } catch (_) { /* the WASM instance may already be gone */ }
  }
  gtoWorker = null;
  gtoProxy = null;
  gtoHandler = null;
  gtoHandlerPromise = null;
  gtoHandlerTransport = null;
  gtoActive = null;
}

function solverComlinkApi() {
  const api = typeof globalThis !== 'undefined' ? globalThis.Comlink : null;
  return api && typeof api.wrap === 'function' ? api : null;
}

function solverLoadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = String(url);
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`solver-script-load:${url.pathname}`));
    (document.head || document.documentElement).appendChild(script);
  });
}

async function solverEnsureComlink() {
  const existing = solverComlinkApi();
  if (existing) return existing;
  if (!gtoComlinkPromise) {
    const url = new URL('vendor/wasm-postflop/comlink.js', document.baseURI);
    url.searchParams.set('v', String(GTO_ASSET_VERSION));
    url.searchParams.set('retry', String(Date.now()));
    gtoComlinkPromise = solverLoadScript(url).then(() => {
      const loaded = solverComlinkApi();
      if (!loaded) throw new Error('solver-comlink-missing');
      return loaded;
    }).catch(error => {
      gtoComlinkPromise = null;
      throw error;
    });
  }
  return gtoComlinkPromise;
}

/* The upstream browser package exposes its single-thread wasm-bindgen module
   through a small webpack chunk. Capture that module factory so environments
   without a usable Worker can still run the exact same pinned engine. */
async function solverLoadDirectModule(retry = false) {
  if (gtoDirectModulePromise && !retry) return gtoDirectModulePromise;
  const load = (async () => {
    const chunkName = 'webpackChunkwasm_postflop';
    const previousChunk = globalThis[chunkName];
    const captured = [];
    globalThis[chunkName] = { push: payload => { captured.push(payload); return captured.length; } };
    try {
      const chunkUrl = new URL('vendor/wasm-postflop/7a023623e45ca364f00b.js', document.baseURI);
      chunkUrl.searchParams.set('v', String(GTO_ASSET_VERSION));
      if (retry) chunkUrl.searchParams.set('retry', String(Date.now()));
      await solverLoadScript(chunkUrl);
    } finally {
      if (previousChunk === undefined) delete globalThis[chunkName];
      else globalThis[chunkName] = previousChunk;
    }
    const modules = captured.find(payload => payload && payload[1] && payload[1][1825])?.[1];
    const factory = modules && modules[1825];
    if (typeof factory !== 'function') throw new Error('solver-direct-module-missing');
    const exports = {};
    const wasmUrl = new URL('vendor/wasm-postflop/solver-st.wasm', document.baseURI);
    wasmUrl.searchParams.set('v', String(GTO_ASSET_VERSION));
    const require = moduleId => {
      if (Number(moduleId) === 4875) return String(wasmUrl);
      throw new Error(`solver-direct-require:${moduleId}`);
    };
    require.b = document.baseURI;
    require.r = target => {
      Object.defineProperty(target, '__esModule', { value: true });
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag)
        Object.defineProperty(target, Symbol.toStringTag, { value: 'Module' });
    };
    require.d = (target, definitions) => {
      for (const key of Object.keys(definitions))
        if (!Object.prototype.hasOwnProperty.call(target, key))
          Object.defineProperty(target, key, { enumerable: true, get: definitions[key] });
    };
    factory({}, exports, require);
    if (typeof exports.default !== 'function' || !exports.GameManager)
      throw new Error('solver-direct-exports-missing');
    await exports.default(String(wasmUrl));
    return exports;
  })();
  const guarded = load.catch(error => {
    if (gtoDirectModulePromise === guarded) gtoDirectModulePromise = null;
    throw error;
  });
  gtoDirectModulePromise = guarded;
  return gtoDirectModulePromise;
}

function solverDirectHandler(mod) {
  const game = mod.GameManager.new();
  return {
    game,
    init(...args) { return game.init(...args); },
    privateCards(player) { return game.private_cards(player); },
    memoryUsage(enableCompression) { return Number(game.memory_usage(enableCompression)); },
    allocateMemory(enableCompression) { game.allocate_memory(enableCompression); },
    iterate(iteration) { game.solve_step(iteration); },
    exploitability() { return game.exploitability(); },
    finalize() { return game.finalize(); },
    applyHistory(history) { game.apply_history(history); },
    totalBetAmount(append) { return game.total_bet_amount(append); },
    currentPlayer() { return game.current_player(); },
    numActions() { return game.num_actions(); },
    actionsAfter(append) { return game.actions_after(append); },
    possibleCards() { return game.possible_cards(); },
    getResults() { return game.get_results(); },
    getChanceReports(append, numActions) { return game.get_chance_reports(append, numActions); },
  };
}

async function solverCreateDirectHandler(retry = false) {
  const mod = await solverLoadDirectModule(retry);
  const handler = solverDirectHandler(mod);
  gtoHandler = handler;
  gtoHandlerTransport = 'direct';
  return handler;
}

function solverWithTimeout(promise, timeoutMs, message) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), timeoutMs);
    Promise.resolve(promise).then(
      value => { clearTimeout(timer); resolve(value); },
      error => { clearTimeout(timer); reject(error); },
    );
  });
}

async function solverCreateHandlerAttempt(retry = false) {
  if (gtoPreferDirect || typeof Worker === 'undefined') return solverCreateDirectHandler(retry);
  const comlink = await solverEnsureComlink();
  const workerUrl = new URL('vendor/wasm-postflop/worker.js', document.baseURI);
  workerUrl.searchParams.set('v', String(GTO_ASSET_VERSION));
  if (retry) workerUrl.searchParams.set('retry', String(Date.now()));
  const worker = new Worker(workerUrl);
  gtoWorker = worker;
  const workerFailure = new Promise((_, reject) => {
    worker.addEventListener('error', event => reject(new Error(`solver-worker-load:${event.message || 'unknown'}`)), { once: true });
    worker.addEventListener('messageerror', () => reject(new Error('solver-worker-message')), { once: true });
  });
  const proxy = comlink.wrap(worker);
  gtoProxy = proxy;
  const handler = await solverWithTimeout(
    Promise.race([proxy.initHandler(1), workerFailure]),
    GTO_WORKER_INIT_TIMEOUT,
    'solver-worker-timeout',
  );
  if (gtoWorker !== worker) throw new Error('solver-superseded');
  gtoHandler = handler;
  gtoHandlerTransport = 'worker';
  return handler;
}

async function solverCreateHandler() {
  if (gtoHandler) return gtoHandler;
  if (gtoHandlerPromise) return gtoHandlerPromise;
  solverSetRuntime({ phase: 'loading', message: solverText('loading') });
  gtoHandlerPromise = (async () => {
    try {
      return await solverCreateHandlerAttempt(false);
    } catch (firstError) {
      if (gtoWorker) gtoWorker.terminate();
      gtoWorker = null;
      gtoProxy = null;
      gtoHandler = null;
      gtoHandlerTransport = null;
      if (firstError && firstError.message === 'solver-superseded') throw firstError;
      try {
        return await solverCreateHandlerAttempt(true);
      } catch (secondError) {
        if (gtoWorker) gtoWorker.terminate();
        gtoWorker = null;
        gtoProxy = null;
        gtoHandler = null;
        gtoHandlerTransport = null;
        if (secondError && secondError.message === 'solver-superseded') throw secondError;
        /* A CSP or embedded host can expose Worker but reject construction.
           Preserve exact solving by falling back to direct WASM execution. */
        gtoPreferDirect = true;
        return solverCreateDirectHandler(true);
      }
    }
  })();
  try {
    return await gtoHandlerPromise;
  } finally {
    gtoHandlerPromise = null;
  }
}

async function solverInitTree(street, config) {
  const handler = await solverCreateHandler();
  solverSetRuntime({ phase: 'building', message: solverText('building') });
  const board = new Uint8Array(street.board.map(solverCardId));
  const initError = await handler.init(
    street.rangeRaw[0], street.rangeRaw[1], board,
    street.startingPot, street.effectiveStack, 0, 0, true,
    config.oopFlopBet, config.oopFlopRaise,
    config.oopTurnBet, config.oopTurnRaise, config.oopTurnDonk,
    config.oopRiverBet, config.oopRiverRaise, config.oopRiverDonk,
    config.ipFlopBet, config.ipFlopRaise,
    config.ipTurnBet, config.ipTurnRaise,
    config.ipRiverBet, config.ipRiverRaise,
    1.5, 0.15, 0.1, '', '',
  );
  if (initError) throw new Error(`solver-init:${initError}`);
  const memoryBytes = Number(await handler.memoryUsage(true));
  return { handler, memoryBytes };
}

async function solverSolveBase(street) {
  const generation = ++gtoGeneration;
  let compact = false;
  let config = solverTreeConfig(street, false);
  let initialized;
  try {
    initialized = await solverInitTree(street, config);
    if (initialized.memoryBytes > GTO_MEMORY_LIMIT) {
      solverTerminate();
      compact = true;
      config = solverTreeConfig(street, true);
      initialized = await solverInitTree(street, config);
    }
    solverSetRuntime({
      phase: 'memory', message: solverText('memory'), memoryBytes: initialized.memoryBytes,
      iterations: 0, exploitability: null, compactTree: compact,
    });
    await initialized.handler.allocateMemory(true);
    const target = Math.max(0.01, street.startingPot * 0.003);
    let exploitability = Number(await initialized.handler.exploitability());
    let iterations = 0;
    while (exploitability > target) {
      if (generation !== gtoGeneration) throw new Error('solver-superseded');
      await initialized.handler.iterate(iterations);
      iterations++;
      if (iterations % 10 === 0) {
        exploitability = Number(await initialized.handler.exploitability());
        if (!Number.isFinite(exploitability)) throw new Error('solver-invalid-exploitability');
        solverSetRuntime({
          phase: 'iterating', message: solverText('iterating'), iterations, exploitability,
        });
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
    if (!Number.isFinite(exploitability)) throw new Error('solver-invalid-exploitability');
    await initialized.handler.finalize();
    const baseKey = solverBaseKey(street, config);
    gtoActive = {
      baseKey, street, config, handler: initialized.handler, exploitability, compact,
      targetExploitability: target, converged: true, iterations,
    };
    solverSetRuntime({ phase: 'ready', message: solverText('ready'), exploitability, iterations });
    return gtoActive;
  } catch (error) {
    if (error && error.message !== 'solver-superseded') solverTerminate();
    throw error;
  }
}

async function solverEnsureBase(street) {
  const fullConfig = solverTreeConfig(street, false);
  const compactConfig = solverTreeConfig(street, true);
  const possibleKeys = [solverBaseKey(street, fullConfig), solverBaseKey(street, compactConfig)];
  if (gtoActive && possibleKeys.includes(gtoActive.baseKey)) return gtoActive;
  if (gtoPending && gtoPending.fullKey === possibleKeys[0]) return gtoPending.promise;
  solverTerminate();
  const promise = solverSolveBase(street).finally(() => {
    if (gtoPending && gtoPending.promise === promise) gtoPending = null;
  });
  gtoPending = { fullKey: possibleKeys[0], promise };
  return promise;
}

function solverStreetIsCurrent(street) {
  return typeof state === 'undefined' || state.solverStreet === street;
}

async function solverRetryPause(attempt) {
  const delay = Math.min(2000, 150 * Math.pow(2, Math.min(attempt, 4)));
  await new Promise(resolve => setTimeout(resolve, delay));
}

/* Supported exact nodes do not permanently degrade after a transient worker,
   asset, allocation, or WASM failure. They rebuild from a clean engine and
   continue until solved or until the game moves to a different street. */
async function solverEnsureBaseReliable(street, isCurrent = () => solverStreetIsCurrent(street)) {
  let attempt = 0;
  while (isCurrent()) {
    try {
      return await solverEnsureBase(street);
    } catch (error) {
      if (error && error.message === 'solver-superseded' && !isCurrent()) return null;
      attempt++;
      solverTerminate();
      solverSetRuntime({
        phase: 'retrying', message: solverText('retrying'),
        error: String(error && error.message || error), retryAttempt: attempt,
      });
      await solverRetryPause(attempt);
    }
  }
  return null;
}

function solverParseActions(text) {
  if (!text) return [];
  return text.split('/').filter(Boolean).map((token, index) => {
    const [type, amountText] = token.split(':');
    return { index, type: type.toLowerCase(), amount: Number(amountText || 0) };
  });
}

function solverMatchAction(actions, observed) {
  const exactType = actions.filter(action => action.type === observed.action);
  if (!['bet', 'raise', 'allin'].includes(observed.action)) return exactType[0] || null;
  const target = Math.round(Number(observed.target) || 0);
  const exact = exactType.find(action => Math.round(action.amount) === target);
  if (exact) return exact;
  /* The upstream tree converts percentage sizings back to integer chips. Treat
     its possible one-chip rounding difference as the same configured action. */
  return exactType.find(action => Math.abs(Math.round(action.amount) - target) <= 1) || null;
}

async function solverReplayHistory(handler, actions) {
  await handler.applyHistory(new Uint32Array());
  const indices = [];
  for (const observed of actions) {
    const available = solverParseActions(await handler.actionsAfter(new Uint32Array(indices)));
    const matched = solverMatchAction(available, observed);
    if (!matched) throw new Error(`unmapped-action:${observed.action}:${observed.target}`);
    indices.push(matched.index);
  }
  await handler.applyHistory(new Uint32Array(indices));
  return indices;
}

function solverParseResults(buffer, cardsOop, cardsIp, currentPlayerIndex, numActions) {
  const values = ArrayBuffer.isView(buffer) ? buffer : new Float64Array(buffer);
  let cursor = 0;
  const equityRealizationBase = [values[cursor++], values[cursor++]];
  const isEmpty = Boolean(values[cursor++]);
  const weights = [values.slice(cursor, cursor += cardsOop.length), values.slice(cursor, cursor += cardsIp.length)];
  const normalizer = [values.slice(cursor, cursor += cardsOop.length), values.slice(cursor, cursor += cardsIp.length)];
  const parsed = { equityRealizationBase, isEmpty, weights, normalizer, equity: [], ev: [], eqr: [], strategy: null, actionEv: null };
  if (!isEmpty) {
    parsed.equity = [values.slice(cursor, cursor += cardsOop.length), values.slice(cursor, cursor += cardsIp.length)];
    parsed.ev = [values.slice(cursor, cursor += cardsOop.length), values.slice(cursor, cursor += cardsIp.length)];
    parsed.eqr = [values.slice(cursor, cursor += cardsOop.length), values.slice(cursor, cursor += cardsIp.length)];
  }
  if (currentPlayerIndex === 0 || currentPlayerIndex === 1) {
    const handCount = currentPlayerIndex === 0 ? cardsOop.length : cardsIp.length;
    parsed.strategy = values.slice(cursor, cursor += numActions * handCount);
    if (!isEmpty) parsed.actionEv = values.slice(cursor, cursor += numActions * handCount);
  }
  return parsed;
}

function solverAppAction(action, player) {
  const callAmount = typeof toCall === 'function' ? toCall(player) : 0;
  if (action.type === 'fold') return { label: 'Fold', rec: 'fold', target: 0 };
  if (action.type === 'check') return { label: 'Check', rec: 'check', target: player.bet || 0 };
  if (action.type === 'call') return { label: 'Call', rec: callAmount > 0 ? 'call' : 'check', target: (player.bet || 0) + callAmount };
  const allInTarget = (player.bet || 0) + (player.chips || 0);
  const target = Math.max(player.bet || 0, Math.min(allInTarget, action.amount));
  const allIn = action.type === 'allin' || target >= allInTarget;
  const label = allIn ? 'All-in' : (callAmount > 0 ? 'Raise' : 'Bet');
  return { label, rec: allIn ? 'allin' : 'raise', target };
}

function solverActionLegal(mapped, player) {
  const callAmount = typeof toCall === 'function' ? toCall(player) : 0;
  if (mapped.rec === 'fold') return callAmount > 0;
  if (mapped.rec === 'check') return callAmount === 0;
  if (mapped.rec === 'call') return callAmount > 0 && player.chips > 0;
  if (mapped.rec === 'raise') {
    const minTarget = Math.min(state.currentBet + state.lastRaiseSize, (player.bet || 0) + (player.chips || 0));
    return !player.acted && player.chips > callAmount && mapped.target >= minTarget;
  }
  if (mapped.rec === 'allin') return !player.acted && player.chips > callAmount;
  return false;
}

async function solverExtractNode(active, player, street) {
  const indices = await solverReplayHistory(active.handler, street.actions);
  const currentPlayerName = await active.handler.currentPlayer();
  const currentIndex = currentPlayerName === 'oop' ? 0 : currentPlayerName === 'ip' ? 1 : -1;
  const expectedIndex = street.playerSeats.indexOf(player.i);
  if (currentIndex !== expectedIndex) throw new Error('solver-player-mismatch');
  const actionText = await active.handler.actionsAfter(new Uint32Array(indices));
  const actions = solverParseActions(actionText);
  const cardsOop = new Uint16Array(await active.handler.privateCards(0));
  const cardsIp = new Uint16Array(await active.handler.privateCards(1));
  const numActions = Number(await active.handler.numActions());
  const resultBuffer = await active.handler.getResults();
  const parsed = solverParseResults(resultBuffer, cardsOop, cardsIp, currentIndex, numActions);
  const reachRanges = [
    solverReachRange(cardsOop, parsed.weights[0]),
    solverReachRange(cardsIp, parsed.weights[1]),
  ];
  const reachRangesPacked = reachRanges.map(solverPackReachRange);
  if (!reachRanges[0] || !reachRanges[1] || !reachRangesPacked[0] || !reachRangesPacked[1])
    throw new Error('solver-empty-reach');
  const handCards = player.hole.map(solverCardId).sort((a, b) => a - b);
  const encoded = handCards[0] | (handCards[1] << 8);
  const privateCards = currentIndex === 0 ? cardsOop : cardsIp;
  const handIndex = privateCards.indexOf(encoded);
  if (handIndex < 0 || !parsed.strategy || !parsed.actionEv) throw new Error('solver-hand-not-in-range');
  const equity = Number(parsed.equity[currentIndex] && parsed.equity[currentIndex][handIndex]);
  if (!Number.isFinite(equity) || equity < 0 || equity > 1) throw new Error('solver-invalid-equity');
  const handCount = privateCards.length;
  const allBranches = actions.map((action, index) => {
    const mapped = solverAppAction(action, player);
    return {
      ...mapped,
      solverType: action.type,
      frequency: Number(parsed.strategy[index * handCount + handIndex] || 0),
      ev: Number(parsed.actionEv[index * handCount + handIndex]),
      legal: solverActionLegal(mapped, player),
    };
  });
  if (allBranches.some(branch => !Number.isFinite(branch.frequency) || !Number.isFinite(branch.ev)))
    throw new Error('solver-invalid-strategy');
  if (allBranches.some(branch => !branch.legal && branch.frequency > 0.000001)) {
    throw new Error('solver-action-state-mismatch');
  }
  const branches = allBranches.filter(branch => branch.legal);
  const frequencyTotal = branches.reduce((sum, branch) => sum + Math.max(0, branch.frequency), 0);
  if (!(frequencyTotal > 0)) throw new Error('solver-empty-strategy');
  branches.forEach(branch => { branch.frequency = frequencyTotal > 0 ? Math.max(0, branch.frequency) / frequencyTotal : 0; });
  if (!branches.length) throw new Error('solver-no-legal-action');
  const chosen = branches.reduce((best, branch) => (
    branch.frequency > best.frequency ||
    (branch.frequency === best.frequency && Number.isFinite(branch.ev) && branch.ev > best.ev) ? branch : best
  ), branches[0]);
  return {
    providerVersion: GTO_PROVIDER_VERSION,
    engine: GTO_ENGINE_META.name,
    engineCommit: GTO_ENGINE_META.engineCommit,
    wasmCommit: GTO_ENGINE_META.wasmCommit,
    source: 'solver',
    decisionSeat: player.i,
    rec: chosen.rec,
    target: Math.round(chosen.target || 0),
    ev: chosen.ev,
    equity,
    equitySource: 'solver-equilibrium-node',
    exploitability: active.exploitability,
    targetExploitability: active.targetExploitability,
    converged: active.converged,
    iterations: active.iterations,
    compactTree: active.compact,
    rangeSource: street.rangeSource || 'personality-free-baseline',
    rangeLine: street.rangeLine || null,
    rangeExactFrequencies: street.rangeExactFrequencies === true,
    rangeNodes: (street.rangeNodes || []).map(nodes => Array.isArray(nodes) ? nodes.slice() : []),
    reachSource: 'solver-equilibrium-node',
    reachSeats: street.playerSeats.slice(),
    reachRangesPacked,
    rangeHistory: [...(street.actionHistory || []), ...(street.actions || [])].map(action => ({ ...action })),
    selectionRule: 'highest-frequency',
    abstraction: active.config,
    branches: branches.map(branch => ({
      label: branch.label, rec: branch.rec, target: Math.round(branch.target || 0),
      frequency: branch.frequency, ev: branch.ev,
    })),
    cachedAt: Date.now(),
  };
}

function solverQueueNode(active, player, street) {
  const job = gtoNodeQueue.then(() => {
    if (active !== gtoActive) throw new Error('solver-superseded');
    return solverExtractNode(active, player, street);
  });
  gtoNodeQueue = job.catch(() => {});
  return job;
}

function solverCachedResult(player) {
  const support = solverSupport(player, null);
  if (!support.ok) return null;
  for (const compact of [false, true]) {
    const baseKey = solverBaseKey(support.street, solverTreeConfig(support.street, compact));
    const cacheKey = solverSpotKey(support.street, player, baseKey);
    const cached = solverReadCache(cacheKey);
    if (cached && solverCachedResultValid(cached, support.street, player)) return cached;
    if (cached) gtoMemoryCache.delete(cacheKey);
  }
  return null;
}

function solverCachedResultValid(result, street, player) {
  if (!result || result.providerVersion !== GTO_PROVIDER_VERSION || result.source !== 'solver' ||
      result.engine !== GTO_ENGINE_META.name || result.engineCommit !== GTO_ENGINE_META.engineCommit ||
      result.wasmCommit !== GTO_ENGINE_META.wasmCommit ||
      result.converged !== true || result.decisionSeat !== (player && player.i) ||
      !Number.isFinite(result.ev) || !Number.isFinite(result.exploitability) ||
      !Number.isFinite(result.targetExploitability) || !Number.isFinite(result.iterations) || result.iterations < 0 ||
      !['fold', 'check', 'call', 'raise', 'allin'].includes(result.rec) ||
      !Number.isFinite(result.target) || result.target < 0 || !Array.isArray(result.branches) || !result.branches.length ||
      !street || !solverRangeProvenanceMatches(result, street) ||
      !Array.isArray(street.playerSeats) || !Array.isArray(result.reachSeats) ||
      result.reachSeats.length !== 2 || result.reachSeats[0] !== street.playerSeats[0] ||
      result.reachSeats[1] !== street.playerSeats[1] || result.reachSeats[0] === result.reachSeats[1]) return false;
  if (result.equity !== undefined &&
      (typeof result.equity !== 'number' || !Number.isFinite(result.equity) || result.equity < 0 || result.equity > 1))
    return false;
  let frequencyTotal = 0;
  for (const branch of result.branches) {
    if (!branch || !['fold', 'check', 'call', 'raise', 'allin'].includes(branch.rec) ||
        !Number.isFinite(branch.target) || branch.target < 0 || !Number.isFinite(branch.frequency) ||
        branch.frequency < 0 || branch.frequency > 1 || !Number.isFinite(branch.ev)) return false;
    frequencyTotal += branch.frequency;
  }
  if (Math.abs(frequencyTotal - 1) > 0.000001 ||
      !result.branches.some(branch => branch.rec === result.rec && Math.round(branch.target || 0) === Math.round(result.target || 0)))
    return false;
  return Boolean(solverResultReachRanges(result));
}

function solverResultReachRanges(result) {
  if (!result || !Array.isArray(result.reachSeats) || result.reachSeats.length !== 2) return null;
  let ranges = null;
  if (Array.isArray(result.reachRangesPacked) && result.reachRangesPacked.length === 2)
    ranges = result.reachRangesPacked.map(solverUnpackReachRange);
  /* Plain arrays are accepted for deterministic fixtures and forward-compatible
     importers, but production cache entries use the compact binary fields. */
  else if (Array.isArray(result.reachRanges) && result.reachRanges.length === 2)
    ranges = result.reachRanges.map(raw => raw && Number(raw.length) === SOLVER_REACH_COMBOS ? Float32Array.from(raw) : null);
  if (!ranges || !ranges[0] || !ranges[1]) return null;
  for (const raw of ranges) {
    let positive = false;
    for (let index = 0; index < raw.length; index++) {
      const value = Number(raw[index]);
      if (!Number.isFinite(value) || value < 0) return null;
      if (value > 0) positive = true;
    }
    if (!positive) return null;
  }
  return ranges;
}

/* Authoritative matrix data for a solver-covered decision. At a street root,
   the supplied equilibrium reach is already the current range. Once an action
   has occurred, never substitute the Bayesian model while node extraction is
   pending: the matrix stays hidden until exact current-node reach is cached. */
function solverRangeChartData(targetPlayer, decisionPlayer, solved = undefined) {
  const support = solverSupport(decisionPlayer, null);
  if (!support.ok) return { covered: false, reason: support.reason || 'state' };
  const street = support.street;
  const seatIndex = street.playerSeats.indexOf(targetPlayer && targetPlayer.i);
  if (seatIndex < 0) return { covered: true, pending: true, reason: 'seat' };
  if (solved === undefined) solved = solverCachedResult(decisionPlayer);
  let weights = null;
  let nodeReach = false;
  if (solved && solved.converged === true) {
    const ranges = solverResultReachRanges(solved);
    const solvedIndex = Array.isArray(solved.reachSeats) ? solved.reachSeats.indexOf(targetPlayer.i) : -1;
    if (ranges && solvedIndex >= 0) {
      weights = ranges[solvedIndex];
      nodeReach = true;
    }
  }
  if (!weights) {
    if ((street.actions || []).length) return { covered: true, pending: true, reason: 'node-reach' };
    weights = street.rangeRaw[seatIndex];
  }
  if (!weights || Number(weights.length) !== SOLVER_REACH_COMBOS)
    return { covered: true, pending: true, reason: 'range' };
  const history = nodeReach && Array.isArray(solved.rangeHistory)
    ? solved.rangeHistory : [...(street.actionHistory || []), ...(street.actions || [])];
  return {
    covered: true,
    pending: false,
    weights,
    nodeReach,
    reachSource: nodeReach ? (solved.reachSource || 'solver-equilibrium-node') : 'solver-street-root',
    rangeSource: (solved && solved.rangeSource) || street.rangeSource || 'personality-free-baseline',
    rangeLine: (solved && solved.rangeLine) || street.rangeLine || null,
    rangeNodes: ((solved && solved.rangeNodes) || street.rangeNodes || []).map(nodes => Array.isArray(nodes) ? nodes.slice() : []),
    rangeExactFrequencies: ((solved && solved.rangeExactFrequencies) ?? street.rangeExactFrequencies) === true,
    actionHistory: history.map(action => ({ ...action })),
  };
}

function solverMixText(result) {
  return result.branches.filter(branch => branch.frequency >= 0.005)
    .sort((a, b) => b.frequency - a.frequency)
    .map(branch => `${branch.label}${branch.target && ['raise', 'allin'].includes(branch.rec) ? ` ${branch.target}` : ''} ${Math.round(branch.frequency * 100)}%`)
    .join(' · ');
}

function solverPriorTextKey(result, stem) {
  return `${stem}${result && result.rangeExactFrequencies === true ? 'Exact' : 'Conditional'}`;
}

function solverApplyCoachStrategy(player, fallbackResult) {
  const result = fallbackResult || {};
  const support = solverSupport(player, result);
  result.strategyProvider = support.ok ? 'solver-pending' : `fallback-${support.reason}`;
  result.solverSupport = support.reason || null;
  if (!support.ok) return result;
  const solved = solverCachedResult(player);
  const installSolverRanges = solvedResult => {
    if (typeof coachSolverRangeCharts !== 'function') return;
    const charts = coachSolverRangeCharts(player, solvedResult);
    result.rangeCharts = charts;
    result.chartInfo = charts[0] || null;
  };
  if (!solved) {
    installSolverRanges(null);
    return result;
  }
  if (solved.converged !== true) {
    installSolverRanges(null);
    return result;
  }
  installSolverRanges(solved);
  result.heuristicRec = result.rec;
  result.rec = solved.rec.toUpperCase();
  result.coachT = solved.target;
  const solverActionEvs = { FOLD: null, CALL: null, RAISE: null };
  solved.branches.forEach(branch => {
    const label = branch.rec === 'fold' ? 'FOLD'
      : (branch.rec === 'check' || branch.rec === 'call') ? 'CALL' : 'RAISE';
    if (Number.isFinite(branch.ev) && (!Number.isFinite(solverActionEvs[label]) || branch.ev > solverActionEvs[label])) solverActionEvs[label] = branch.ev;
  });
  result.evs = solverActionEvs;
  result.solver = solved;
  result.strategyProvider = 'solver';
  result.strategyMode = 'solver';
  const solverEquity = solved.equity;
  result.eq = typeof solverEquity === 'number' && Number.isFinite(solverEquity) &&
    solverEquity >= 0 && solverEquity <= 1 ? solverEquity : null;
  result.eqAdj = result.eq;
  result.equitySource = result.eq == null ? 'solver-policy-only' : 'solver-equilibrium-node';
  /* The fallback computed these fields from Bayesian/profile-conditioned
     ranges. They must not survive beside an equilibrium solver decision. */
  result.drawRow = '';
  result.drawInfo = null;
  result.impliedInfo = null;
  result.needEq = null;
  result.airPen = 0;
  result.underpairPen = 0;
  result.underpairInfo = null;
  result.flushInfo = null;
  result.multiwayContinueInfo = null;
  result.bluffBreakEven = null;
  result.modeledFoldEquity = 0;
  result.actionIntent = solved.rec === 'fold' ? 'fold' : solved.rec === 'check' ? 'check' : 'rangeRaise';
  result.concepts = [];
  result.bluffInfo = null;
  result.why = [solverText('solverReason').replace('{mix}', solverMixText(solved))];
  result.extra = [
    `${solverText(solverPriorTextKey(solved, 'source'))}. ` +
    solverText(solverPriorTextKey(solved, 'approximate')),
  ];
  return result;
}

async function solverRequestCoachStrategy(player, fallbackResult) {
  gtoPanelResult = fallbackResult;
  const support = solverSupport(player, fallbackResult);
  if (!support.ok) return false;
  const alreadyCached = solverCachedResult(player);
  if (alreadyCached) return false;
  const street = {
    ...support.street,
    board: support.street.board.map(card => ({ ...card })),
    playerSeats: support.street.playerSeats.slice(),
    rangeRaw: support.street.rangeRaw.slice(),
    rangeNodes: (support.street.rangeNodes || []).map(nodes => Array.isArray(nodes) ? nodes.slice() : []),
    actionHistory: (support.street.actionHistory || []).map(action => ({ ...action })),
    actions: support.street.actions.map(action => ({ ...action })),
  };
  const requestSignature = solverRequestSignature(street, player);
  const priorTerminalFailure = gtoTerminalNodeFailures.get(requestSignature);
  if (priorTerminalFailure) {
    solverSetRuntime({
      phase: 'unavailable', message: solverText(`${priorTerminalFailure.reason}Unavailable`),
      error: priorTerminalFailure.error, retryAttempt: 0,
    });
    return false;
  }
  const existing = gtoRequestJobs.get(requestSignature);
  if (existing) return existing;
  const isCurrent = () => typeof state === 'undefined' ||
    requestSignature === solverRequestSignature(state.solverStreet, player);
  const request = (async () => {
    let nodeAttempt = 0;
    solverSetRuntime({ phase: 'pending', message: solverText('pending'), retryAttempt: 0, error: '' });
    while (isCurrent()) {
      const active = await solverEnsureBaseReliable(street, isCurrent);
      if (!active || !isCurrent()) return false;
      try {
        const result = await solverQueueNode(active, player, street);
        const key = solverSpotKey(street, player, active.baseKey);
        solverSaveCache(key, result);
        gtoTerminalNodeFailures.delete(requestSignature);
        solverSetRuntime({ phase: 'ready', message: solverText('ready'), retryAttempt: 0, error: '' });
        return isCurrent();
      } catch (error) {
        if (error && error.message === 'solver-superseded' && !isCurrent()) return false;
        const terminalReason = solverTerminalNodeFailureReason(error);
        if (terminalReason) {
          if (gtoTerminalNodeFailures.size >= GTO_CACHE_LIMIT)
            gtoTerminalNodeFailures.delete(gtoTerminalNodeFailures.keys().next().value);
          gtoTerminalNodeFailures.set(requestSignature, {
            reason: terminalReason, error: String(error && error.message || error),
          });
          solverSetRuntime({
            phase: 'unavailable', message: solverText(`${terminalReason}Unavailable`),
            error: String(error && error.message || error), retryAttempt: nodeAttempt,
          });
          return false;
        }
        nodeAttempt++;
        solverTerminate();
        solverSetRuntime({
          phase: 'retrying', message: solverText('retrying'),
          error: String(error && error.message || error), retryAttempt: nodeAttempt,
        });
        await solverRetryPause(nodeAttempt);
      }
    }
    return false;
  })();
  gtoRequestJobs.set(requestSignature, request);
  try {
    return await request;
  } finally {
    if (gtoRequestJobs.get(requestSignature) === request) gtoRequestJobs.delete(requestSignature);
  }
}

function solverSampleCachedDecision(player, strategicContext) {
  if (!solverSupport(player, strategicContext || null).ok) return null;
  const solved = solverCachedResult(player);
  if (!solved) return null;
  const total = solved.branches.reduce((sum, branch) => sum + Math.max(0, branch.frequency), 0);
  let random = Math.random() * total;
  let selected = [...solved.branches].reverse().find(branch => branch.frequency > 0) || solved.branches[0];
  for (const branch of solved.branches) {
    random -= branch.frequency;
    if (random <= 0) { selected = branch; break; }
  }
  return { action: selected.rec, target: selected.target, source: 'solver', mix: solved.branches };
}

function solverPanelHtml(result) {
  const support = result && result.solver ? { ok: true } : (
    typeof humanPlayer === 'function' ? solverSupport(humanPlayer(), result) : { ok: false, reason: 'browser' }
  );
  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
  let body;
  let className = 'gto-provider-card';
  if (result && result.solver) {
    const solved = result.solver;
    const exploitability = Number.isFinite(solved.exploitability) ? `${solved.exploitability.toFixed(3)} chips` : '—';
    const source = solverText(solverPriorTextKey(solved, 'source'));
    const approximate = solverText(solverPriorTextKey(solved, 'approximate'));
    body = `<strong>${escapeHtml(solverText('ready'))}</strong><div>${escapeHtml(solverText('mix'))}: ${escapeHtml(solverMixText(solved))}</div><div>${escapeHtml(source)}</div><small>${escapeHtml(solverText('exploit'))}: ${escapeHtml(exploitability)} · ${solved.iterations} ${escapeHtml(solverText('iterations'))} · ${escapeHtml(approximate)}</small>`;
    className += ' solved';
  } else if (!support.ok) {
    body = escapeHtml(solverText(support.reason || 'error'));
    className += ' fallback';
  } else if (gtoRuntime.phase === 'unavailable') {
    body = escapeHtml(gtoRuntime.message || solverText('error'));
    className += ' fallback';
  } else {
    const progress = gtoRuntime.phase === 'iterating'
      ? `${gtoRuntime.iterations} ${solverText('iterations')}${Number.isFinite(gtoRuntime.exploitability) ? ` · ${solverText('exploit')}: ${gtoRuntime.exploitability.toFixed(3)}` : ''}`
      : (gtoRuntime.message || solverText('pending'));
    body = `<strong>${escapeHtml(solverText('pending'))}</strong><div>${escapeHtml(progress)}</div>`;
    className += ' pending';
  }
  return `<div class="${className}"><div class="gto-provider-title">${escapeHtml(solverText('title'))}</div>${body}</div>`;
}

function solverProviderDebug() {
  return {
    engine: GTO_ENGINE_META,
    runtime: { ...gtoRuntime },
    activeKey: gtoActive && gtoActive.baseKey,
    cacheEntries: gtoMemoryCache.size,
    street: typeof state !== 'undefined' && state.solverStreet ? {
      stage: state.solverStreet.stage,
      supported: state.solverStreet.supported,
      actions: state.solverStreet.actions.length,
    } : null,
  };
}
