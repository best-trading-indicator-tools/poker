// Preflop reach tracking for the postflop equilibrium provider.
//
// The bundled charts are action abstractions rather than a complete solved
// preflop tree. This adapter supports only public nodes described by that
// personality-free data: single-raised pots and heads-up RFI/3-bet/call pots.
// Limps, squeezes, 4-bets, unsupported blind defences, all-ins, and non-cash
// configurations invalidate the baseline instead of silently substituting a
// personality-conditioned range.

const GTO_PREFLOP_META = Object.freeze({
  name: 'Heuristic preflop chart blueprint',
  version: 2,
  source: 'HEURISTIC_CHARTS',
  model: '100bb cash, single-raised and heads-up 3-bet-pot abstraction',
  personalityConditioned: false,
  exactFrequencies: false,
});

const GTO_PREFLOP_RANKS = '23456789TJQKA';
const gtoPreflopComboClasses = (() => {
  const result = new Array(1326);
  for (let first = 0; first < 52; first++) {
    for (let second = first + 1; second < 52; second++) {
      const rankA = 2 + Math.floor(first / 4);
      const rankB = 2 + Math.floor(second / 4);
      const high = Math.max(rankA, rankB);
      const low = Math.min(rankA, rankB);
      const pair = high === low;
      const suited = first % 4 === second % 4;
      const code = pair
        ? GTO_PREFLOP_RANKS[high - 2] + GTO_PREFLOP_RANKS[low - 2]
        : GTO_PREFLOP_RANKS[high - 2] + GTO_PREFLOP_RANKS[low - 2] + (suited ? 's' : 'o');
      const index = first * (101 - first) / 2 + second - 1;
      result[index] = code;
    }
  }
  return result;
})();

function gtoPreflopChart(kind, key) {
  try {
    if (typeof GTO_CHARTS === 'undefined' || !GTO_CHARTS[kind]) return null;
    return key === undefined ? GTO_CHARTS[kind] : (GTO_CHARTS[kind][key] || null);
  } catch (_) { return null; }
}

function gtoPreflopPosition(position, tableSize) {
  if (position === 'SB/BTN') return 'SB';
  if (!position || !Number.isFinite(tableSize)) return position;
  if (['HJ', 'CO', 'BTN', 'SB', 'BB'].includes(position)) return position;
  let earlyIndex;
  if (position === 'UTG') earlyIndex = 0;
  else if (position === 'UTG+1') earlyIndex = 1;
  else if (position === 'MP') earlyIndex = 2;
  else {
    const match = /^MP\+(\d+)$/.exec(position);
    if (!match) return position;
    earlyIndex = 2 + Number(match[1]);
  }
  const playersBehind = Math.max(0, tableSize - 1 - earlyIndex);
  return ({ 8: 'UTG', 7: 'UTG+1', 6: 'MP', 5: 'MP+1', 4: 'HJ', 3: 'CO', 2: 'BTN', 1: 'SB', 0: 'BB' })[playersBehind] || position;
}

function gtoPreflopBlankRange() {
  const range = new Float32Array(1326);
  range.fill(1);
  return range;
}

function gtoPreflopPolicyFromLists(raiseList, callList, observedAction) {
  const raises = new Set(raiseList || []);
  const calls = new Set(callList || []);
  return code => {
    const raise = raises.has(code);
    const call = calls.has(code);
    if (observedAction === 'raise') return raise ? (call ? 0.5 : 1) : 0;
    if (observedAction === 'call') return call ? (raise ? 0.5 : 1) : 0;
    if (observedAction === 'fold') return !raise && !call ? 1 : 0;
    return 0;
  };
}

function gtoPreflopRfiPolicy(player, observedAction, tracker) {
  const chartPosition = gtoPreflopPosition(player.pos || '', tracker.tableSize);
  const range = gtoPreflopChart('rfi', chartPosition);
  if (!Array.isArray(range)) return null;
  return {
    node: `RFI:${chartPosition}`,
    weight: gtoPreflopPolicyFromLists(range, [], observedAction),
  };
}

function gtoPreflopFacingPolicy(player, opener, observedAction, tracker) {
  const heroPosition = player.pos === 'SB/BTN' ? 'SB' : player.pos;
  const openerPosition = gtoPreflopPosition(opener.pos || '', tracker.tableSize);
  let chart = null;
  let node = '';
  if (heroPosition === 'BB') {
    const key = openerPosition === 'CO' ? 'vsCO'
      : openerPosition === 'BTN' ? 'vsBTN'
        : openerPosition === 'SB' ? 'vsSB' : null;
    if (key) {
      chart = gtoPreflopChart('bbDefend', key);
      node = `BB:${key}`;
    }
  }
  if (!chart) {
    chart = gtoPreflopChart('facing', openerPosition);
    node = `facing:${openerPosition}`;
  }
  if (!chart || !Array.isArray(chart.raise) || !Array.isArray(chart.call)) return null;
  return {
    node,
    weight: gtoPreflopPolicyFromLists(chart.raise, chart.call, observedAction),
  };
}

function gtoPreflopVsThreeBetPolicy(opener, observedAction, tracker) {
  const openerPosition = gtoPreflopPosition(opener.pos || '', tracker.tableSize);
  const chart = gtoPreflopChart('vs3bet', openerPosition);
  if (!chart || !Array.isArray(chart.raise) || !Array.isArray(chart.call)) return null;
  return {
    node: `vs3bet:${openerPosition}`,
    weight: gtoPreflopPolicyFromLists(chart.raise, chart.call, observedAction),
  };
}

function gtoPreflopInvalidate(tracker, reason) {
  if (!tracker.valid) return;
  tracker.valid = false;
  tracker.reason = reason || 'preflop-line-uncovered';
}

function gtoPreflopLegacyBeginHand() {
  if (typeof state === 'undefined' || !state) return;
  const players = state.players.filter(player => !player.out && !player.sittingOut);
  const cash = Boolean(state.cfg && state.cfg.gameType === 'cash');
  state.gtoPreflop = {
    handId: state.handNum || 0,
    tableSize: players.length,
    valid: cash && Number(state.ante || 0) === 0,
    reason: cash ? (Number(state.ante || 0) === 0 ? '' : 'preflop-ante-uncovered') : 'preflop-model-uncovered',
    line: 'unopened',
    openerSeat: -1,
    openTargetBB: 0,
    voluntaryCalls: 0,
    threeBettorSeat: -1,
    threeBetTargetBB: 0,
    threeBetCalls: 0,
    actions: [],
    players: Object.fromEntries(players.map(player => [player.i, {
      rangeRaw: gtoPreflopBlankRange(),
      initialStackBB: (player.chips + player.totalBet) / Math.max(1, state.bb),
      nodes: [],
    }])),
    meta: GTO_PREFLOP_META,
  };
}

function gtoPreflopLegacyObserveAction(player, action, context) {
  if (typeof state === 'undefined' || !state || state.stage !== 'preflop') return;
  const tracker = state.gtoPreflop;
  if (!tracker || tracker.handId !== (state.handNum || 0)) return;
  const contextData = context || {};
  const raisesBefore = Number(contextData.preflopRaisesBefore || 0);
  const callAmount = Number(contextData.callAmt || 0);
  const allIn = Boolean(contextData.isAllIn);
  const observed = action === 'raise' ? 'raise'
    : action === 'fold' ? 'fold'
      : callAmount > 0 ? 'call' : 'check';
  const record = {
    seat: player.i,
    position: player.pos || '',
    action: observed,
    raisesBefore,
    targetBB: Number(contextData.targetBB || 0),
    callBB: callAmount / Math.max(1, Number(state.bb || 1)),
  };
  tracker.actions.push(record);
  if (!tracker.valid) return;

  const playerState = tracker.players[player.i];
  if (!playerState) {
    gtoPreflopInvalidate(tracker, 'preflop-state-missing');
    return;
  }
  // A folded range cannot reach postflop. Later position charts already encode
  // the preceding folds, so filtering (or rejecting) that dead range adds no
  // information to either surviving player's reach distribution.
  if (observed === 'fold') return;
  const stackDepth = Number(playerState.initialStackBB || 0);
  if (stackDepth < 80 || stackDepth > 120) {
    gtoPreflopInvalidate(tracker, 'preflop-stack-uncovered');
    return;
  }
  if (allIn) {
    gtoPreflopInvalidate(tracker, 'preflop-allin-uncovered');
    return;
  }

  let policy = null;
  if (raisesBefore === 0) {
    if (observed === 'check') return;
    if (observed === 'call') {
      gtoPreflopInvalidate(tracker, 'preflop-limp-uncovered');
      return;
    }
    if (observed === 'raise') {
      policy = gtoPreflopRfiPolicy(player, observed, tracker);
      const targetBB = Number(contextData.targetBB || 0);
      if (tracker.openerSeat !== -1 || targetBB < 2 || targetBB > 4) {
        gtoPreflopInvalidate(tracker, 'preflop-open-size-uncovered');
        return;
      }
      tracker.openerSeat = player.i;
      tracker.openTargetBB = targetBB;
      tracker.line = 'single-raised';
    }
  } else if (raisesBefore === 1 && tracker.openerSeat >= 0 && tracker.voluntaryCalls === 0) {
    const opener = state.players[tracker.openerSeat];
    if (!opener || player.i === tracker.openerSeat || !['call', 'raise'].includes(observed)) {
      gtoPreflopInvalidate(tracker, 'preflop-line-uncovered');
      return;
    }
    policy = gtoPreflopFacingPolicy(player, opener, observed, tracker);
    if (observed === 'call') tracker.voluntaryCalls++;
    if (observed === 'raise') {
      const targetBB = Number(contextData.targetBB || 0);
      const raiseRatio = targetBB / Math.max(tracker.openTargetBB, 0.01);
      if (tracker.threeBettorSeat >= 0 || targetBB < 5 || targetBB > 18 || raiseRatio < 2 || raiseRatio > 5) {
        gtoPreflopInvalidate(tracker, 'preflop-threebet-size-uncovered');
        return;
      }
      tracker.threeBettorSeat = player.i;
      tracker.threeBetTargetBB = targetBB;
      tracker.line = 'three-bet';
    }
  } else if (raisesBefore === 2 && tracker.openerSeat >= 0 && tracker.threeBettorSeat >= 0 &&
      tracker.voluntaryCalls === 0 && tracker.threeBetCalls === 0) {
    if (player.i !== tracker.openerSeat || !['call', 'raise'].includes(observed)) {
      gtoPreflopInvalidate(tracker, 'preflop-threebet-line-uncovered');
      return;
    }
    if (observed === 'raise') {
      gtoPreflopInvalidate(tracker, 'preflop-fourbet-uncovered');
      return;
    }
    policy = gtoPreflopVsThreeBetPolicy(player, observed, tracker);
    tracker.threeBetCalls++;
    tracker.line = 'three-bet-called';
  } else {
    gtoPreflopInvalidate(tracker, 'preflop-line-uncovered');
    return;
  }

  if (!policy) {
    gtoPreflopInvalidate(tracker, 'preflop-node-uncovered');
    return;
  }
  let maximum = 0;
  for (let index = 0; index < playerState.rangeRaw.length; index++) {
    const next = playerState.rangeRaw[index] * policy.weight(gtoPreflopComboClasses[index]);
    playerState.rangeRaw[index] = next;
    maximum = Math.max(maximum, next);
  }
  playerState.nodes.push(policy.node + ':' + observed);
  if (!(maximum > 0)) gtoPreflopInvalidate(tracker, 'preflop-empty-range');
}

function gtoPreflopLegacyRangesFor(players) {
  if (typeof state === 'undefined' || !state) return { ok: false, reason: 'preflop-state-missing' };
  const tracker = state.gtoPreflop;
  if (!tracker || tracker.handId !== (state.handNum || 0)) return { ok: false, reason: 'preflop-state-missing' };
  if (!tracker.valid) return { ok: false, reason: tracker.reason || 'preflop-line-uncovered' };
  if (!Array.isArray(players) || players.length !== 2) {
    return { ok: false, reason: 'preflop-line-uncovered' };
  }
  let line = null;
  let expectedSeats = [];
  if (tracker.line === 'single-raised' && tracker.openerSeat >= 0 && tracker.voluntaryCalls === 1 &&
      tracker.threeBettorSeat < 0) {
    line = 'single-raised';
    expectedSeats = [tracker.openerSeat, players.find(player => player.i !== tracker.openerSeat)?.i];
  } else if (tracker.line === 'three-bet-called' && tracker.openerSeat >= 0 && tracker.threeBettorSeat >= 0 &&
      tracker.threeBetCalls === 1) {
    line = 'three-bet';
    expectedSeats = [tracker.openerSeat, tracker.threeBettorSeat];
  } else {
    return { ok: false, reason: 'preflop-line-uncovered' };
  }
  const actualSeats = players.map(player => player.i).sort((a, b) => a - b);
  const requiredSeats = expectedSeats.filter(Number.isFinite).sort((a, b) => a - b);
  if (requiredSeats.length !== 2 || actualSeats.some((seat, index) => seat !== requiredSeats[index])) {
    return { ok: false, reason: 'preflop-line-uncovered' };
  }
  const ranges = [];
  for (const player of players) {
    const playerState = tracker.players[player.i];
    if (!playerState || !playerState.nodes.length) return { ok: false, reason: 'preflop-node-uncovered' };
    const raw = playerState.rangeRaw.slice();
    let maximum = 0;
    for (const weight of raw) maximum = Math.max(maximum, weight);
    if (!(maximum > 0)) return { ok: false, reason: 'preflop-empty-range' };
    if (maximum !== 1) for (let index = 0; index < raw.length; index++) raw[index] /= maximum;
    ranges.push(raw);
  }
  return {
    ok: true,
    ranges,
    source: `heuristic-preflop-chart-blueprint:${line}`,
    line,
    exactFrequencies: false,
    nodes: players.map(player => tracker.players[player.i].nodes.slice()),
    meta: tracker.meta,
  };
}

/*
 * Exact preflop policy-pack integration.
 *
 * The chart adapter above remains available for deployments which do not load
 * the policy-pack API at all (including old/offline builds). An absent,
 * mismatched, or research-only pack keeps that adapter as an explicitly
 * heuristic postflop baseline. It never becomes a GTO recommendation or an
 * exact-frequency range. Once an exact pack is selected, off-tree actions
 * invalidate exact tracking rather than switching models mid-hand.
 */
const GTO_PREFLOP_SEAT_ORDER = Object.freeze({
  2: Object.freeze(['SB/BTN', 'BB']),
  3: Object.freeze(['BTN', 'SB', 'BB']),
  /* Clockwise from the button. This matches the local Rust trainer's stable
     seat ordinals; preflop action begins at ordinal 3 for tables of 4+. */
  4: Object.freeze(['BTN', 'SB', 'BB', 'CO']),
  5: Object.freeze(['BTN', 'SB', 'BB', 'UTG', 'CO']),
  6: Object.freeze(['BTN', 'SB', 'BB', 'UTG', 'HJ', 'CO']),
  7: Object.freeze(['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'HJ', 'CO']),
  8: Object.freeze(['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'MP', 'HJ', 'CO']),
  9: Object.freeze(['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO']),
});

function gtoPreflopPackApiAvailable() {
  return typeof gtoPreflopPackForScenario === 'function' &&
    typeof gtoPreflopPackPolicy === 'function' &&
    typeof gtoPreflopPackNextNode === 'function' &&
    typeof gtoPreflopPackComboIndex === 'function';
}

function gtoPreflopExactReason(result, fallback) {
  return result && typeof result.reason === 'string' && result.reason
    ? result.reason : (fallback || 'gto-unavailable:preflop-policy');
}

function gtoPreflopScenario() {
  if (typeof state === 'undefined' || !state || !state.cfg)
    return { ok: false, reason: 'gto-unavailable:runtime-state' };
  if (state.cfg.gameType !== 'cash')
    return { ok: false, reason: 'gto-unavailable:non-cash-game' };
  const players = state.players.filter(player => !player.out && !player.sittingOut);
  const seatOrder = GTO_PREFLOP_SEAT_ORDER[players.length];
  if (!seatOrder) return { ok: false, reason: 'gto-unavailable:player-count' };
  const byPosition = new Map();
  for (const player of players) {
    const position = player.pos || '';
    if (!position || byPosition.has(position))
      return { ok: false, reason: 'gto-unavailable:seat-order' };
    byPosition.set(position, player);
  }
  const orderedPlayers = seatOrder.map(position => byPosition.get(position));
  if (orderedPlayers.some(player => !player) || byPosition.size !== seatOrder.length)
    return { ok: false, reason: 'gto-unavailable:seat-order' };
  const bigBlind = Number(state.bb || 0);
  const smallBlind = Number(state.sb || 0);
  if (!(bigBlind > 0) || !(smallBlind > 0))
    return { ok: false, reason: 'gto-unavailable:blinds' };
  const exactMilliBB = value => {
    const scaled = Number(value) * 1000 / bigBlind;
    const rounded = Math.round(scaled);
    return Number.isSafeInteger(rounded) && Math.abs(scaled - rounded) <= 1e-9 ? rounded : null;
  };
  const sbMilliBB = exactMilliBB(smallBlind);
  const anteMilliBB = exactMilliBB(Number(state.ante || 0));
  const initialStacksMilliBB = orderedPlayers.map(player =>
    exactMilliBB(Number(player.chips || 0) + Number(player.totalBet || 0)));
  if (!(sbMilliBB > 0) || sbMilliBB >= 1000 || anteMilliBB === null ||
      initialStacksMilliBB.some(stack => !(stack >= 1000)))
    return { ok: false, reason: 'gto-unavailable:chip-denomination' };
  /* The current game engine neither deducts rake nor posts a straddle. Refuse
     such policy configurations until those rules exist in actual gameplay. */
  const configuredRake = state.cfg.rake;
  const explicitNoRake = configuredRake && typeof configuredRake === 'object' &&
    !Array.isArray(configuredRake) && configuredRake.kind === 'none' &&
    Object.keys(configuredRake).length === 1;
  if (configuredRake != null && configuredRake !== 0 && !explicitNoRake)
    return { ok: false, reason: 'gto-unavailable:rake-unsupported' };
  if (state.cfg.straddle === true)
    return { ok: false, reason: 'gto-unavailable:straddle-unsupported' };
  const game = {
    variant: 'NLHE',
    objective: 'chipEV',
    activePlayers: orderedPlayers.length,
    seatOrder: seatOrder.slice(),
    blindsMilliBB: { sb: sbMilliBB, bb: 1000 },
    anteMilliBB,
    initialStacksMilliBB,
    rake: { kind: 'none' },
    straddle: false,
  };
  const scenario = { game };
  const configuredTree = state.cfg.gtoPreflopTreeId;
  if (typeof configuredTree === 'string' && configuredTree) scenario.treeId = configuredTree;
  return { ok: true, scenario, game, orderedPlayers, seatOrder: seatOrder.slice() };
}

function gtoPreflopUseHeuristicFallback(scenarioResult, reason) {
  /* Preserve the established HU postflop coverage when no exact pack was ever
     selected. Its chart reach stays explicitly approximate and is never used by
     gtoPreflopCurrentPolicy, so it cannot acquire a GTO recommendation label. */
  gtoPreflopLegacyBeginHand();
  if (!state.gtoPreflop) return;
  state.gtoPreflop.mode = 'heuristic';
  state.gtoPreflop.exact = false;
  state.gtoPreflop.strategyProvider = 'heuristic-preflop-charts';
  state.gtoPreflop.gtoUnavailableReason = reason || 'gto-unavailable:preflop-policy';
  state.gtoPreflop.scenario = scenarioResult && scenarioResult.scenario
    ? scenarioResult.scenario : null;
}

function gtoPreflopBeginHand() {
  if (typeof state === 'undefined' || !state) return;
  if (!gtoPreflopPackApiAvailable()) {
    gtoPreflopLegacyBeginHand();
    if (state.gtoPreflop) {
      state.gtoPreflop.mode = 'heuristic';
      state.gtoPreflop.strategyProvider = 'heuristic-preflop-charts';
      state.gtoPreflop.gtoUnavailableReason = 'gto-unavailable:policy-api';
    }
    return;
  }
  const scenarioResult = gtoPreflopScenario();
  if (!scenarioResult.ok) {
    gtoPreflopUseHeuristicFallback(scenarioResult, scenarioResult.reason);
    return;
  }
  let selected;
  try { selected = gtoPreflopPackForScenario(scenarioResult.scenario); }
  catch (error) {
    gtoPreflopUseHeuristicFallback(scenarioResult,
      `gto-unavailable:policy-query${error && error.message ? `:${error.message}` : ''}`);
    return;
  }
  if (!selected || selected.ok !== true || !selected.pack) {
    gtoPreflopUseHeuristicFallback(scenarioResult, gtoPreflopExactReason(selected, 'gto-unavailable:no-policy-pack'));
    return;
  }
  const pack = selected.pack;
  if (typeof pack.rootNodeId !== 'string' || !pack.rootNodeId) {
    gtoPreflopUseHeuristicFallback(scenarioResult, 'gto-unavailable:root-node');
    return;
  }
  const playerStates = {};
  scenarioResult.orderedPlayers.forEach((player, seatOrdinal) => {
    playerStates[player.i] = {
      seatOrdinal,
      position: player.pos || '',
      initialStackBB: scenarioResult.game.initialStacksMilliBB[seatOrdinal] / 1000,
      rangeRaw: gtoPreflopBlankRange(),
      nodes: [],
      folded: false,
    };
  });
  state.gtoPreflop = {
    handId: state.handNum || 0,
    tableSize: scenarioResult.orderedPlayers.length,
    mode: 'exact-pack',
    valid: true,
    exact: true,
    reason: '',
    pack,
    packId: pack.packId,
    packSha256: pack.manifestSha256 || pack.payloadSha256,
    payloadSha256: pack.payloadSha256,
    treeId: pack.treeId,
    nodeId: pack.rootNodeId,
    terminal: false,
    historyKey: '',
    seatOrder: scenarioResult.seatOrder,
    scenario: scenarioResult.scenario,
    actions: [],
    players: playerStates,
    meta: Object.freeze({
      name: 'Audited approximate-equilibrium preflop policy pack',
      source: pack.packId,
      manifestSha256: pack.manifestSha256 || pack.payloadSha256,
      payloadSha256: pack.payloadSha256,
      treeId: pack.treeId,
      personalityConditioned: false,
      exactFrequencies: true,
      solve: pack.solve,
      provenance: pack.provenance,
    }),
  };
  const rootPolicy = gtoPreflopPackPolicy(pack, pack.rootNodeId);
  if (!rootPolicy || rootPolicy.ok !== true)
    gtoPreflopInvalidate(state.gtoPreflop, gtoPreflopExactReason(rootPolicy, 'gto-unavailable:root-node'));
}

function gtoPreflopRuntimeComboIndex(player) {
  if (!player || !Array.isArray(player.hole) || player.hole.length !== 2) return -1;
  try { return gtoPreflopPackComboIndex(player.hole[0], player.hole[1]); }
  catch (_) { return -1; }
}

function gtoPreflopRuntimePolicyLegality(player, actions, observedContext) {
  const afterObservedAction = observedContext && typeof observedContext === 'object' &&
    ['cbBefore', 'facedRaiseSize', 'playerBetBefore', 'stackTotalBefore']
      .every(key => Number.isFinite(Number(observedContext[key])));
  if (typeof state === 'undefined' || !state || state.stage !== 'preflop' ||
      !player || !Array.isArray(state.players) || !state.players.includes(player) ||
      player.out || player.sittingOut || (!afterObservedAction && (player.folded || player.allIn)))
    return { ok: false, reason: 'gto-unavailable:runtime-player' };
  if (!Array.isArray(actions) || !actions.length)
    return { ok: false, reason: 'gto-unavailable:runtime-action-set' };
  const currentBet = Number(afterObservedAction ? observedContext.cbBefore : state.currentBet);
  const lastRaiseSize = Number(afterObservedAction ? observedContext.facedRaiseSize : state.lastRaiseSize);
  const playerBet = Number(afterObservedAction ? observedContext.playerBetBefore : player.bet);
  const playerChips = Number(afterObservedAction
    ? Number(observedContext.stackTotalBefore) - playerBet : player.chips);
  if (![currentBet, lastRaiseSize, playerBet, playerChips].every(Number.isSafeInteger) ||
      currentBet < 0 || lastRaiseSize <= 0 || playerBet < 0 || playerChips <= 0 || playerBet > currentBet)
    return { ok: false, reason: 'gto-unavailable:runtime-betting-state' };
  const callAmount = Math.max(0, Math.min(currentBet - playerBet, playerChips));
  const maximumTarget = playerBet + playerChips;
  const minimumFullRaiseTarget = currentBet + lastRaiseSize;
  const opponentCanRespond = Array.isArray(state.players) && state.players.some(candidate =>
    candidate && candidate !== player && !candidate.out && !candidate.sittingOut &&
    !candidate.folded && !candidate.allIn && Number(candidate.chips || 0) > 0);
  const raiseReopened = player.acted !== true;
  const canRaise = raiseReopened && opponentCanRespond && maximumTarget > currentBet;
  const requiredPassive = callAmount > 0 ? ['fold', 'call'] : ['check'];
  const passive = [];
  const targets = new Map();
  for (const action of actions) {
    if (!action || typeof action.actionId !== 'string' || typeof action.type !== 'string')
      return { ok: false, reason: 'gto-unavailable:runtime-action-set' };
    if (['fold', 'check', 'call'].includes(action.type)) {
      passive.push(action.type);
      if (action.raiseToMilliBB !== undefined)
        return { ok: false, reason: 'gto-unavailable:runtime-passive-action' };
      continue;
    }
    if (!['raise', 'all-in'].includes(action.type) || !canRaise)
      return { ok: false, reason: 'gto-unavailable:runtime-aggressive-action' };
    const rawTarget = Number(action.raiseToMilliBB) * Number(state.bb) / 1000;
    const target = Math.round(rawTarget);
    if (!Number.isSafeInteger(target) || Math.abs(rawTarget - target) > 1e-9 ||
        target <= currentBet || target > maximumTarget)
      return { ok: false, reason: 'gto-unavailable:runtime-action-size' };
    if (action.type === 'raise') {
      if (target < minimumFullRaiseTarget || target >= maximumTarget)
        return { ok: false, reason: 'gto-unavailable:runtime-full-raise' };
    } else if (target !== maximumTarget) {
      /* An all-in can be below the minimum full-raise target only when the
         player's exact remaining stack makes it a legal short all-in. */
      return { ok: false, reason: 'gto-unavailable:runtime-all-in' };
    }
    targets.set(action.actionId, target);
  }
  const passiveSet = new Set(passive);
  if (passiveSet.size !== passive.length || passiveSet.size !== requiredPassive.length ||
      requiredPassive.some(type => !passiveSet.has(type)))
    return { ok: false, reason: 'gto-unavailable:runtime-passive-action-set' };
  return {
    ok: true,
    callAmount,
    maximumTarget,
    minimumFullRaiseTarget,
    opponentCanRespond,
    raiseReopened,
    targets,
  };
}

function gtoPreflopExactNodePolicy(tracker, player, comboIndex, observedContext) {
  if (!tracker || tracker.mode !== 'exact-pack' || !tracker.valid)
    return { ok: false, reason: tracker && tracker.reason ? tracker.reason : 'gto-unavailable:preflop-policy' };
  if (tracker.terminal || !tracker.nodeId)
    return { ok: false, reason: 'gto-unavailable:preflop-terminal' };
  const playerState = tracker.players[player && player.i];
  if (!playerState) return { ok: false, reason: 'gto-unavailable:player-seat' };
  let policy;
  try { policy = gtoPreflopPackPolicy(tracker.pack, tracker.nodeId, comboIndex); }
  catch (_) { return { ok: false, reason: 'gto-unavailable:policy-query' }; }
  if (!policy || policy.ok !== true) return policy || { ok: false, reason: 'gto-unavailable:policy-query' };
  if (policy.actorSeat !== playerState.seatOrdinal)
    return { ok: false, reason: 'gto-unavailable:actor-seat' };
  const legality = gtoPreflopRuntimePolicyLegality(player, policy.actions, observedContext);
  if (!legality.ok) {
    gtoPreflopInvalidate(tracker, legality.reason);
    return legality;
  }
  return { ok: true, policy, playerState, legality };
}

function gtoPreflopBranchRec(type, player, target) {
  if (type === 'fold') return 'FOLD';
  if (type === 'check') return 'CHECK';
  if (type === 'call') return 'CALL';
  if (type === 'all-in' || (player && Number.isFinite(target) && target >= player.bet + player.chips)) return 'ALLIN';
  return 'RAISE';
}

function gtoPreflopCurrentPolicy(player) {
  if (typeof state === 'undefined' || !state || state.stage !== 'preflop')
    return { ok: false, reason: 'gto-unavailable:not-preflop' };
  const tracker = state.gtoPreflop;
  if (!tracker || tracker.handId !== (state.handNum || 0))
    return { ok: false, reason: 'gto-unavailable:preflop-state' };
  if (tracker.mode !== 'exact-pack' || !tracker.valid)
    return { ok: false, reason: tracker.gtoUnavailableReason || tracker.reason || 'gto-unavailable:preflop-policy' };
  const comboIndex = gtoPreflopRuntimeComboIndex(player);
  if (comboIndex < 0) return { ok: false, reason: 'gto-unavailable:hole-cards' };
  const queried = gtoPreflopExactNodePolicy(tracker, player, comboIndex);
  if (!queried.ok) return queried;
  const policy = queried.policy;
  const branches = [];
  let sum = 0;
  for (const action of policy.actions || []) {
    const frequency = Number(action.probability);
    if (!Number.isFinite(frequency) || frequency < 0 || frequency > 1)
      return { ok: false, reason: 'gto-unavailable:frequency-value' };
    const target = queried.legality.targets.get(action.actionId) || 0;
    const rec = gtoPreflopBranchRec(action.type, player, target);
    branches.push({
      actionId: action.actionId,
      type: action.type,
      rec: rec.toLowerCase(),
      label: rec,
      target,
      targetBB: action.raiseToMilliBB === undefined ? null : action.raiseToMilliBB / 1000,
      frequency,
      childNodeId: action.childNodeId,
      terminal: action.terminal === true,
      ev: null,
    });
    sum += frequency;
  }
  if (!branches.length || Math.abs(sum - 1) > 5e-5)
    return { ok: false, reason: 'gto-unavailable:frequency-sum' };
  const primary = branches.reduce((best, branch) =>
    !best || branch.frequency > best.frequency ? branch : best, null);
  return {
    ok: true,
    strategyProvider: policy.strategyProvider || 'preflop-equilibrium-policy-pack',
    strategyMode: 'equilibrium-baseline',
    rangeExactFrequencies: true,
    packId: tracker.packId,
    packSha256: tracker.packSha256,
    payloadSha256: tracker.pack.payloadSha256,
    treeId: tracker.treeId,
    treeConfigSha256: tracker.pack.tree && tracker.pack.tree.configSha256 || null,
    game: tracker.pack.game || null,
    nodeId: tracker.nodeId,
    historyKey: policy.historyKey,
    actorSeat: policy.actorSeat,
    comboIndex,
    branches,
    primary,
    solve: tracker.pack.solve,
    provenance: tracker.pack.provenance,
  };
}

function gtoPreflopActionRecord(player, action, context) {
  const contextData = context || {};
  const callAmount = Number(contextData.callAmt || 0);
  const observed = action === 'raise' || action === 'all-in' ? 'raise'
    : action === 'fold' ? 'fold' : callAmount > 0 ? 'call' : 'check';
  return {
    seat: player.i,
    position: player.pos || '',
    action: observed,
    raisesBefore: Number(contextData.preflopRaisesBefore || 0),
    targetBB: Number(contextData.targetBB || 0),
    callBB: callAmount / Math.max(1, Number(state.bb || 1)),
  };
}

function gtoPreflopNextRuntimeActor(player) {
  if (typeof state === 'undefined' || !state || !Array.isArray(state.players)) return null;
  const players = state.players;
  const start = Math.max(0, players.indexOf(player));
  for (let offset = 1; offset <= players.length; offset++) {
    const candidate = players[(start + offset) % players.length];
    if (!candidate || candidate === player || candidate.out || candidate.sittingOut ||
        candidate.folded || candidate.allIn) continue;
    if (!candidate.acted || Number(candidate.bet || 0) < Number(state.currentBet || 0)) return candidate;
  }
  return null;
}

function gtoPreflopValidateTransitionSemantics(tracker, player, transition) {
  const live = state.players.filter(candidate => candidate && !candidate.out &&
    !candidate.sittingOut && !candidate.folded);
  const nextActor = live.length > 1 ? gtoPreflopNextRuntimeActor(player) : null;
  const roundEnded = live.length <= 1 || !nextActor;
  if ((transition.terminal === true) !== roundEnded)
    return { ok: false, reason: 'gto-unavailable:terminal-state-mismatch' };
  if (roundEnded) return { ok: true, terminal: true, nextActor: null };
  if (typeof transition.nodeId !== 'string' || !transition.nodeId)
    return { ok: false, reason: 'gto-unavailable:next-node' };
  const nextState = tracker.players[nextActor.i];
  if (!nextState) return { ok: false, reason: 'gto-unavailable:next-actor-seat' };
  let nextPolicy;
  try { nextPolicy = gtoPreflopPackPolicy(tracker.pack, transition.nodeId); }
  catch (_) { return { ok: false, reason: 'gto-unavailable:next-node' }; }
  if (!nextPolicy || nextPolicy.ok !== true)
    return { ok: false, reason: gtoPreflopExactReason(nextPolicy, 'gto-unavailable:next-node') };
  if (nextPolicy.actorSeat !== nextState.seatOrdinal)
    return { ok: false, reason: 'gto-unavailable:next-actor-seat' };
  return { ok: true, terminal: false, nextActor };
}

function gtoPreflopObserveAction(player, action, context) {
  if (typeof state === 'undefined' || !state || state.stage !== 'preflop') return;
  const tracker = state.gtoPreflop;
  if (!tracker || tracker.handId !== (state.handNum || 0)) return;
  if (tracker.mode === 'heuristic' || !gtoPreflopPackApiAvailable()) {
    gtoPreflopLegacyObserveAction(player, action, context);
    return;
  }
  const record = gtoPreflopActionRecord(player, action, context);
  tracker.actions.push(record);
  if (tracker.mode !== 'exact-pack' || !tracker.valid) return;
  if (tracker.terminal || !tracker.nodeId) {
    gtoPreflopInvalidate(tracker, 'gto-unavailable:action-after-terminal');
    return;
  }
  const contextData = context || {};
  const exactType = (action === 'raise' || action === 'all-in')
    ? (contextData.isAllIn ? 'all-in' : 'raise') : record.action;
  const observedAction = { type: exactType };
  if (exactType === 'raise' || exactType === 'all-in') {
    const targetBB = Number(contextData.targetBB || (player.bet / Math.max(1, state.bb)));
    const rawMilliBB = targetBB * 1000;
    const raiseToMilliBB = Math.round(rawMilliBB);
    if (!(raiseToMilliBB > 0) || Math.abs(rawMilliBB - raiseToMilliBB) > 1e-9) {
      gtoPreflopInvalidate(tracker, 'gto-unavailable:observed-action-size');
      return;
    }
    observedAction.raiseToMilliBB = raiseToMilliBB;
  }
  const queried = gtoPreflopExactNodePolicy(tracker, player, undefined, contextData);
  if (!queried.ok) {
    gtoPreflopInvalidate(tracker, gtoPreflopExactReason(queried, 'gto-unavailable:policy-query'));
    return;
  }
  let transition;
  try { transition = gtoPreflopPackNextNode(tracker.pack, tracker.nodeId, observedAction); }
  catch (_) { transition = { ok: false, reason: 'gto-unavailable:policy-transition' }; }
  if (!transition || transition.ok !== true) {
    gtoPreflopInvalidate(tracker, gtoPreflopExactReason(transition, 'gto-unavailable:off-tree-action'));
    return;
  }
  const semantics = gtoPreflopValidateTransitionSemantics(tracker, player, transition);
  if (!semantics.ok) {
    gtoPreflopInvalidate(tracker, semantics.reason);
    return;
  }
  const policy = queried.policy;
  const matched = (policy.actions || []).find(candidate => candidate.actionId === transition.action.actionId);
  if (!matched || !matched.frequencies || matched.frequencies.length !== 1326) {
    gtoPreflopInvalidate(tracker, 'gto-unavailable:action-frequencies');
    return;
  }
  const playerState = queried.playerState;
  let maximum = 0;
  for (let index = 0; index < playerState.rangeRaw.length; index++) {
    const frequency = Number(matched.frequencies[index]);
    if (!Number.isFinite(frequency) || frequency < 0 || frequency > 1) {
      gtoPreflopInvalidate(tracker, 'gto-unavailable:frequency-value');
      return;
    }
    const next = playerState.rangeRaw[index] * frequency;
    playerState.rangeRaw[index] = Math.fround(next);
    maximum = Math.max(maximum, next);
  }
  if (!(maximum > 0)) {
    gtoPreflopInvalidate(tracker, 'gto-unavailable:zero-reach-action');
    return;
  }
  playerState.folded = record.action === 'fold';
  playerState.nodes.push(`${tracker.nodeId}:${matched.actionId}`);
  record.nodeId = tracker.nodeId;
  record.actionId = matched.actionId;
  record.exactActionType = exactType;
  record.exact = true;
  tracker.historyKey = policy.historyKey
    ? `${policy.historyKey}/${matched.actionId}` : matched.actionId;
  tracker.terminal = semantics.terminal;
  tracker.nodeId = tracker.terminal ? null : transition.nodeId;
}

function gtoPreflopRangesFor(players) {
  if (typeof state === 'undefined' || !state)
    return { ok: false, reason: 'gto-unavailable:preflop-state' };
  const tracker = state.gtoPreflop;
  if (!tracker || tracker.handId !== (state.handNum || 0))
    return { ok: false, reason: 'gto-unavailable:preflop-state' };
  if (tracker.mode === 'heuristic' || !gtoPreflopPackApiAvailable())
    return gtoPreflopLegacyRangesFor(players);
  if (tracker.mode !== 'exact-pack' || !tracker.valid)
    return { ok: false, reason: tracker.reason || 'gto-unavailable:preflop-policy' };
  if (!tracker.terminal)
    return { ok: false, reason: 'gto-unavailable:preflop-line-incomplete' };
  if (!Array.isArray(players) || players.length !== 2)
    return { ok: false, reason: 'gto-unavailable:heads-up-postflop-only' };
  /* The current postflop engine accepts two marginal ranges but no dead-card
     reach for folded seats. Starting 3--9 handed would therefore omit bunching
     and cannot honestly be called an exact GTO continuation yet. */
  if (tracker.tableSize !== 2)
    return { ok: false, reason: 'gto-unavailable:multiway-bunching' };
  const ranges = [];
  for (const player of players) {
    const playerState = tracker.players[player.i];
    if (!playerState || playerState.folded)
      return { ok: false, reason: 'gto-unavailable:survivor-range' };
    const raw = playerState.rangeRaw.slice();
    if (!Array.from(raw).some(weight => weight > 0))
      return { ok: false, reason: 'gto-unavailable:empty-range' };
    ranges.push(raw);
  }
  return {
    ok: true,
    ranges,
    source: `preflop-equilibrium-policy-pack:${tracker.packId}@${String(tracker.packSha256)}`,
    line: tracker.historyKey,
    exactFrequencies: true,
    nodes: players.map(player => tracker.players[player.i].nodes.slice()),
    foldedRanges: [],
    meta: tracker.meta,
  };
}

function gtoPreflopSampleDecision(player, randomSource) {
  const policy = gtoPreflopCurrentPolicy(player);
  if (!policy.ok) return policy;
  const random = typeof randomSource === 'function' ? Number(randomSource()) : Math.random();
  const draw = Math.min(1 - Number.EPSILON, Math.max(0, Number.isFinite(random) ? random : 0));
  const total = policy.branches.reduce((sum, branch) => sum + Math.max(0, Number(branch.frequency) || 0), 0);
  if (!(total > 0)) return { ok: false, reason: 'gto-unavailable:frequency-sum' };
  const threshold = draw * total;
  let cumulative = 0;
  let selected = policy.branches.slice().reverse().find(branch => Number(branch.frequency) > 0) ||
    policy.branches[policy.branches.length - 1];
  for (const branch of policy.branches) {
    cumulative += Math.max(0, Number(branch.frequency) || 0);
    if (threshold < cumulative) { selected = branch; break; }
  }
  return {
    ...policy,
    selected,
    type: selected.type === 'check' ? 'call'
      : selected.type === 'all-in' ? 'raise' : selected.type,
    amount: selected.target || undefined,
    source: 'preflop-equilibrium-policy-pack',
    mix: policy.branches.map(branch => ({
      action: branch.type,
      target: branch.target,
      frequency: branch.frequency,
    })),
  };
}

function gtoPreflopCoachDecision(player) {
  const policy = gtoPreflopCurrentPolicy(player);
  if (!policy.ok) return policy;
  const primary = policy.primary;
  return {
    ...policy,
    rec: gtoPreflopBranchRec(primary.type, player, primary.target),
    coachT: primary.target || 0,
    actionIntent: primary.type === 'all-in' ? 'rangeRaise' :
      primary.type === 'raise' ? 'rangeRaise' : primary.type,
    policyBranches: policy.branches.map(branch => ({ ...branch })),
    gtoBaseline: {
      packId: policy.packId,
      packSha256: policy.packSha256,
      treeId: policy.treeId,
      nodeId: policy.nodeId,
      historyKey: policy.historyKey,
      comboIndex: policy.comboIndex,
      branches: policy.branches.map(branch => ({ ...branch })),
    },
  };
}
