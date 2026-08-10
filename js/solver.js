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

const GTO_PROVIDER_VERSION = 3;
const GTO_CACHE_KEY = 'sg_solver_cache_v3';
const GTO_CACHE_LIMIT = 48;
const GTO_MEMORY_LIMIT = 512 * 1024 * 1024;
const GTO_HAS_BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined';

let gtoWorker = null;
let gtoProxy = null;
let gtoHandler = null;
let gtoActive = null;
let gtoPending = null;
let gtoGeneration = 0;
let gtoCacheLoaded = false;
let gtoPanelResult = null;
let gtoNodeQueue = Promise.resolve();
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
      loading: 'Loading the solver…',
      building: 'Building the game tree…',
      memory: 'Allocating solver memory…',
      iterating: 'Running CFR iterations…',
      multiway: 'Exact solver unavailable: this hand is multiway. Using the range-aware heuristic fallback.',
      preflop: 'Preflop uses the chart provider; the exact engine is postflop only.',
      icm: 'Exact chip-EV would ignore meaningful ICM pressure, so the ICM-aware fallback remains authoritative.',
      allin: 'No decision remains to solve because a player is already all-in.',
      state: 'The street began before solver tracking was available. Using the heuristic fallback for this node.',
      ranges: 'The exact preflop line is not covered by the independent baseline blueprint. Personality estimates were not substituted; using the heuristic fallback.',
      reach: 'The previous postflop street was not solved through this exact line and runout. Personality estimates were not substituted; using the heuristic fallback.',
      browser: 'The WASM solver is unavailable in this browser. Using the heuristic fallback.',
      memoryFail: 'This tree exceeds the browser memory budget. Using the heuristic fallback.',
      convergence: 'The solver did not reach its exploitability target. Using the heuristic fallback.',
      line: 'The exact action or sizing is not present in this tree. It was not mapped to a nearby node; using the heuristic fallback.',
      error: 'The exact solver could not finish this node. Using the heuristic fallback.',
      approximate: 'Resolved for personality-free baseline reach ranges and a discrete bet-size tree; the preflop chart policy remains an abstraction, not universal GTO.',
      exploit: 'exploitability',
      iterations: 'iterations',
      cache: 'cached result',
      mix: 'Recommended mix',
      source: 'Equilibrium for this heads-up chip-EV tree and the supplied personality-free baseline reach ranges',
      solverReason: 'For your hand, the resolved CFR strategy mixes {mix}. The primary suggestion is the highest-frequency branch; every displayed positive-frequency branch belongs to the mix.',
    },
    fr: {
      title: 'Solveur d’équilibre post-flop',
      ready: 'Résolu avec b-inary postflop-solver.',
      pending: 'Résolution de ce nœud dans le navigateur…',
      loading: 'Chargement du solveur…',
      building: 'Construction de l’arbre de jeu…',
      memory: 'Allocation de la mémoire…',
      iterating: 'Itérations CFR en cours…',
      multiway: 'Solveur exact indisponible : le coup est multiway. Le fallback heuristique sensible aux ranges est utilisé.',
      preflop: 'Le préflop utilise le fournisseur de charts ; le moteur exact est postflop uniquement.',
      icm: 'Le chip-EV exact ignorerait une pression ICM importante ; le fallback ICM reste donc prioritaire.',
      allin: 'Aucune décision à résoudre : un joueur est déjà à tapis.',
      state: 'La street a commencé avant le suivi du solveur. Le fallback heuristique est utilisé pour ce nœud.',
      ranges: 'La ligne préflop exacte n’est pas couverte par le blueprint baseline indépendant. Aucune estimation liée au profil n’a été substituée ; le fallback heuristique est utilisé.',
      reach: 'La street post-flop précédente n’a pas été résolue jusqu’à cette ligne et ce runout exacts. Aucune estimation liée au profil n’a été substituée ; le fallback heuristique est utilisé.',
      browser: 'Le solveur WASM est indisponible dans ce navigateur. Le fallback heuristique est utilisé.',
      memoryFail: 'Cet arbre dépasse le budget mémoire du navigateur. Le fallback heuristique est utilisé.',
      convergence: 'Le solveur n’a pas atteint sa cible d’exploitabilité. Le fallback heuristique est utilisé.',
      line: 'L’action ou le sizing exact n’existe pas dans cet arbre. Aucun nœud voisin n’a été substitué ; le fallback heuristique est utilisé.',
      error: 'Le solveur exact n’a pas terminé ce nœud. Le fallback heuristique est utilisé.',
      approximate: 'Résolu pour des ranges de reach baseline indépendantes des profils et un arbre de sizings discret ; la politique préflop reste une abstraction, pas du GTO universel.',
      exploit: 'exploitabilité',
      iterations: 'itérations',
      cache: 'résultat en cache',
      mix: 'Mix recommandé',
      source: 'Équilibre de cet arbre heads-up en chip-EV pour les ranges de reach baseline indépendantes des profils',
      solverReason: 'Pour votre main, la stratégie CFR résolue mélange {mix}. La suggestion principale est la branche la plus fréquente ; chaque branche affichée avec une fréquence positive appartient au mix.',
    },
    es: {
      title: 'Solver de equilibrio postflop',
      ready: 'Resuelto con b-inary postflop-solver.',
      pending: 'Resolviendo este nodo en el navegador…',
      loading: 'Cargando el solver…',
      building: 'Construyendo el árbol…',
      memory: 'Reservando memoria del solver…',
      iterating: 'Ejecutando iteraciones CFR…',
      multiway: 'Solver exacto no disponible: la mano es multiway. Se usa el fallback heurístico sensible a rangos.',
      preflop: 'El preflop usa el proveedor de tablas; el motor exacto solo resuelve postflop.',
      icm: 'El chip-EV exacto ignoraría una presión ICM importante, así que el fallback con ICM sigue siendo autoritativo.',
      allin: 'No queda una decisión por resolver porque un jugador ya está all-in.',
      state: 'La calle empezó antes del seguimiento del solver. Se usa el fallback heurístico para este nodo.',
      ranges: 'La línea preflop exacta no está cubierta por el blueprint base independiente. No se sustituyeron estimaciones de personalidad; se usa el fallback heurístico.',
      reach: 'La calle postflop anterior no se resolvió hasta esta línea y runout exactos. No se sustituyeron estimaciones de personalidad; se usa el fallback heurístico.',
      browser: 'El solver WASM no está disponible en este navegador. Se usa el fallback heurístico.',
      memoryFail: 'Este árbol supera el límite de memoria del navegador. Se usa el fallback heurístico.',
      convergence: 'El solver no alcanzó su objetivo de explotabilidad. Se usa el fallback heurístico.',
      line: 'La acción o el tamaño exacto no existe en este árbol. No se sustituyó por un nodo cercano; se usa el fallback heurístico.',
      error: 'El solver exacto no pudo terminar este nodo. Se usa el fallback heurístico.',
      approximate: 'Resuelto para rangos base de alcance independientes de la personalidad y un árbol discreto de tamaños; la política preflop sigue siendo una abstracción, no GTO universal.',
      exploit: 'explotabilidad',
      iterations: 'iteraciones',
      cache: 'resultado en caché',
      mix: 'Mezcla recomendada',
      source: 'Equilibrio de este árbol heads-up de chip-EV para rangos base de alcance independientes de la personalidad',
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
    const parsed = JSON.parse(localStorage.getItem(GTO_CACHE_KEY) || '[]');
    parsed.forEach(entry => {
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
  try {
    localStorage.setItem(GTO_CACHE_KEY, JSON.stringify(
      [...gtoMemoryCache.entries()].map(([cacheKey, cacheValue]) => ({ key: cacheKey, value: cacheValue })),
    ));
  } catch (_) { /* memory cache remains usable */ }
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
        source: 'equilibrium-reach-propagation',
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
  state.solverStreet = {
    handId: state.handNum || 0,
    stage: state.stage,
    board: state.board.map(card => ({ r: card.r, s: card.s })),
    startingPot: Math.max(1, Math.round(state.players.reduce((sum, player) => sum + (player.totalBet || 0), 0))),
    effectiveStack: supported ? Math.max(1, Math.round(Math.min(ordered[0].chips, ordered[1].chips))) : 0,
    playerSeats: ordered.map(player => player.i),
    rangeRaw: supported ? baseline.ranges : [],
    rangeSource: supported ? baseline.source : null,
    rangeNodes: supported ? (baseline.nodes || []) : [],
    rangeExactFrequencies: supported && baseline.exactFrequencies === true,
    actions: [],
    supported,
    reason: supported ? null : (baseline.reason || (structurallySupported ? 'ranges' : 'state')),
  };
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

function solverSupport(player, result) {
  if (typeof state === 'undefined' || state.stage === 'preflop') return { ok: false, reason: 'preflop' };
  if (!GTO_HAS_BROWSER || typeof Worker === 'undefined' || typeof Comlink === 'undefined') return { ok: false, reason: 'browser' };
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
    solverHash(config),
  ].join('|');
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

function solverSetRuntime(patch) {
  Object.assign(gtoRuntime, patch);
  if (!GTO_HAS_BROWSER) return;
  const panel = document.getElementById('gtoBox');
  if (panel && typeof solverPanelHtml === 'function') panel.innerHTML = solverPanelHtml(gtoPanelResult);
  try { window.dispatchEvent(new CustomEvent('gto-solver-status', { detail: { ...gtoRuntime } })); } catch (_) {}
}

function solverTerminate() {
  if (gtoWorker) gtoWorker.terminate();
  gtoWorker = null;
  gtoProxy = null;
  gtoHandler = null;
  gtoActive = null;
}

async function solverCreateHandler() {
  if (gtoHandler) return gtoHandler;
  solverSetRuntime({ phase: 'loading', message: solverText('loading') });
  const workerUrl = new URL('vendor/wasm-postflop/worker.js', document.baseURI);
  gtoWorker = new Worker(workerUrl);
  gtoProxy = Comlink.wrap(gtoWorker);
  gtoHandler = await gtoProxy.initHandler(1);
  return gtoHandler;
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
    if (initialized.memoryBytes > GTO_MEMORY_LIMIT) {
      solverTerminate();
      const error = new Error('memory-limit');
      error.solverReason = 'memoryFail';
      throw error;
    }
    solverSetRuntime({
      phase: 'memory', message: solverText('memory'), memoryBytes: initialized.memoryBytes,
      iterations: 0, exploitability: null, compactTree: compact,
    });
    await initialized.handler.allocateMemory(true);
    const maxIterations = 1000;
    const target = Math.max(0.01, street.startingPot * 0.003);
    let exploitability = Number(await initialized.handler.exploitability());
    let iterations = 0;
    for (let iteration = 0; iteration < maxIterations && exploitability > target; iteration++) {
      if (generation !== gtoGeneration) throw new Error('solver-superseded');
      await initialized.handler.iterate(iteration);
      iterations = iteration + 1;
      if ((iteration + 1) % 10 === 0) {
        exploitability = Number(await initialized.handler.exploitability());
        solverSetRuntime({
          phase: 'iterating', message: solverText('iterating'), iterations: iteration + 1, exploitability,
        });
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
    if (!Number.isFinite(exploitability) || exploitability > target) {
      const error = new Error(`solver-not-converged:${exploitability}`);
      error.solverReason = 'convergence';
      throw error;
    }
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
  return exactType.find(action => Math.round(action.amount) === target) || null;
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
  const handCards = player.hole.map(solverCardId).sort((a, b) => a - b);
  const encoded = handCards[0] | (handCards[1] << 8);
  const privateCards = currentIndex === 0 ? cardsOop : cardsIp;
  const handIndex = privateCards.indexOf(encoded);
  if (handIndex < 0 || !parsed.strategy || !parsed.actionEv) throw new Error('solver-hand-not-in-range');
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
    engine: GTO_ENGINE_META.name,
    engineCommit: GTO_ENGINE_META.engineCommit,
    source: 'solver',
    rec: chosen.rec,
    target: Math.round(chosen.target || 0),
    ev: chosen.ev,
    exploitability: active.exploitability,
    targetExploitability: active.targetExploitability,
    converged: active.converged,
    iterations: active.iterations,
    compactTree: active.compact,
    rangeSource: street.rangeSource || 'personality-free-baseline',
    rangeExactFrequencies: street.rangeExactFrequencies === true,
    rangeNodes: (street.rangeNodes || []).map(nodes => Array.isArray(nodes) ? nodes.slice() : []),
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
    const cached = solverReadCache(solverSpotKey(support.street, player, baseKey));
    if (cached) return cached;
  }
  return null;
}

function solverMixText(result) {
  return result.branches.filter(branch => branch.frequency >= 0.005)
    .sort((a, b) => b.frequency - a.frequency)
    .map(branch => `${branch.label}${branch.target && ['raise', 'allin'].includes(branch.rec) ? ` ${branch.target}` : ''} ${Math.round(branch.frequency * 100)}%`)
    .join(' · ');
}

function solverApplyCoachStrategy(player, fallbackResult) {
  const result = fallbackResult || {};
  const support = solverSupport(player, result);
  result.strategyProvider = support.ok ? 'solver-pending' : `fallback-${support.reason}`;
  result.solverSupport = support.reason || null;
  if (!support.ok) return result;
  const solved = solverCachedResult(player);
  if (!solved) return result;
  if (solved.converged !== true) return result;
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
  result.actionIntent = solved.rec === 'fold' ? 'fold' : solved.rec === 'check' ? 'check' : 'rangeRaise';
  result.bluffInfo = null;
  result.why = [solverText('solverReason').replace('{mix}', solverMixText(solved))];
  result.extra = [`${solverText('source')}. ${solverText('approximate')}`];
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
    actions: support.street.actions.map(action => ({ ...action })),
  };
  const requestSignature = solverRequestSignature(street, player);
  solverSetRuntime({ phase: 'pending', message: solverText('pending') });
  try {
    const active = await solverEnsureBase(street);
    const result = await solverQueueNode(active, player, street);
    const key = solverSpotKey(street, player, active.baseKey);
    solverSaveCache(key, result);
    solverSetRuntime({ phase: 'ready', message: solverText('ready') });
    if (typeof state === 'undefined') return true;
    const currentSignature = solverRequestSignature(state.solverStreet, player);
    return requestSignature === currentSignature;
  } catch (error) {
    if (error && error.message === 'solver-superseded') return false;
    const lineError = error && /^(unmapped-action|solver-action-state-mismatch|solver-no-legal-action|solver-empty-strategy)/.test(error.message || '');
    const reason = error && error.solverReason ? error.solverReason : lineError ? 'line' : 'error';
    solverSetRuntime({ phase: 'error', message: solverText(reason), error: String(error && error.message || error) });
    return false;
  }
}

function solverSampleCachedDecision(player, strategicContext) {
  if (!solverSupport(player, strategicContext || null).ok) return null;
  const solved = solverCachedResult(player);
  if (!solved) return null;
  let random = Math.random();
  let selected = solved.branches[solved.branches.length - 1];
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
    body = `<strong>${escapeHtml(solverText('ready'))}</strong><div>${escapeHtml(solverText('mix'))}: ${escapeHtml(solverMixText(solved))}</div><small>${escapeHtml(solverText('exploit'))}: ${escapeHtml(exploitability)} · ${solved.iterations} ${escapeHtml(solverText('iterations'))} · ${escapeHtml(solverText('approximate'))}</small>`;
    className += ' solved';
  } else if (!support.ok) {
    body = escapeHtml(solverText(support.reason || 'error'));
    className += ' fallback';
  } else if (gtoRuntime.phase === 'error') {
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
