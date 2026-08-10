// Personality-free preflop reach tracker for the postflop equilibrium provider.
//
// The bundled charts are action abstractions rather than a complete solved
// preflop tree.  This adapter deliberately supports only the public nodes the
// data actually describes: raise-first-in followed by one call/defence.  A
// limp, squeeze, 3-bet pot, unsupported blind defence, all-in, or non-cash
// configuration invalidates the baseline instead of silently substituting a
// personality-conditioned range.

const GTO_PREFLOP_META = Object.freeze({
  name: 'Independent preflop chart blueprint',
  version: 1,
  source: 'GTO_CHARTS',
  model: '100bb cash, raise-first-in and single-raised-pot abstraction',
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
  } else {
    chart = gtoPreflopChart('facing', openerPosition);
    node = `facing:${openerPosition}`;
  }
  if (!chart || !Array.isArray(chart.raise) || !Array.isArray(chart.call)) return null;
  return {
    node,
    weight: gtoPreflopPolicyFromLists(chart.raise, chart.call, observedAction),
  };
}

function gtoPreflopInvalidate(tracker, reason) {
  if (!tracker.valid) return;
  tracker.valid = false;
  tracker.reason = reason || 'preflop-line-uncovered';
}

function gtoPreflopBeginHand() {
  if (typeof state === 'undefined' || !state) return;
  const players = state.players.filter(player => !player.out && !player.sittingOut);
  const cash = Boolean(state.cfg && state.cfg.gameType === 'cash');
  state.gtoPreflop = {
    handId: state.handNum || 0,
    tableSize: players.length,
    valid: cash && Number(state.ante || 0) === 0,
    reason: cash ? (Number(state.ante || 0) === 0 ? '' : 'preflop-ante-uncovered') : 'preflop-model-uncovered',
    openerSeat: -1,
    openTargetBB: 0,
    voluntaryCalls: 0,
    actions: [],
    players: Object.fromEntries(players.map(player => [player.i, {
      rangeRaw: gtoPreflopBlankRange(),
      initialStackBB: (player.chips + player.totalBet) / Math.max(1, state.bb),
      nodes: [],
    }])),
    meta: GTO_PREFLOP_META,
  };
}

function gtoPreflopObserveAction(player, action, context) {
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
    policy = gtoPreflopRfiPolicy(player, observed, tracker);
    if (observed === 'raise') {
      const targetBB = Number(contextData.targetBB || 0);
      if (tracker.openerSeat !== -1 || targetBB < 2 || targetBB > 4) {
        gtoPreflopInvalidate(tracker, 'preflop-open-size-uncovered');
        return;
      }
      tracker.openerSeat = player.i;
      tracker.openTargetBB = targetBB;
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
      gtoPreflopInvalidate(tracker, 'preflop-threebet-uncovered');
      return;
    }
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

function gtoPreflopRangesFor(players) {
  if (typeof state === 'undefined' || !state) return { ok: false, reason: 'preflop-state-missing' };
  const tracker = state.gtoPreflop;
  if (!tracker || tracker.handId !== (state.handNum || 0)) return { ok: false, reason: 'preflop-state-missing' };
  if (!tracker.valid) return { ok: false, reason: tracker.reason || 'preflop-line-uncovered' };
  if (!Array.isArray(players) || players.length !== 2 || tracker.openerSeat < 0 || tracker.voluntaryCalls !== 1) {
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
    source: 'independent-preflop-chart-blueprint',
    exactFrequencies: false,
    nodes: players.map(player => tracker.players[player.i].nodes.slice()),
    meta: tracker.meta,
  };
}
