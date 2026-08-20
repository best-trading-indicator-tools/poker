#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context = vm.createContext({ console, Float32Array, Math, Number, Object, Array, Set, Map, JSON, Date });
vm.runInContext(fs.readFileSync(new URL('../js/preflop-blueprint.js', import.meta.url), 'utf8'), context, {
  filename: 'js/preflop-blueprint.js',
});

const results = vm.runInContext(`(() => {
  const pack = {
    packId: 'runtime-legality-test', rootNodeId: 'root', treeId: 'tree',
    manifestSha256: 'a'.repeat(64), payloadSha256: 'b'.repeat(64),
    solve: { productionReady: true }, provenance: { sourceType: 'self-generated' },
  };
  let policyActions = [];
  let transitionTerminal = false;
  let childActorSeat = 1;
  const frequencies = probability => {
    const values = new Float32Array(1326);
    values.fill(probability);
    return values;
  };
  globalThis.gtoPreflopPackForScenario = () => ({ ok: true, pack });
  globalThis.gtoPreflopPackComboIndex = () => 0;
  globalThis.gtoPreflopPackPolicy = (_pack, nodeId, comboIndex) => ({
    ok: true, strategyProvider: 'preflop-equilibrium-policy-pack', strategyMode: 'equilibrium-baseline',
    rangeExactFrequencies: true, nodeId, historyKey: '', actorSeat: nodeId === 'child' ? childActorSeat : 0,
    actions: policyActions.map(action => ({
      ...action,
      childNodeId: null,
      terminal: nodeId === 'child',
      frequencies: action.frequencies.slice(),
      ...(comboIndex == null ? {} : { probability: action.frequencies[comboIndex] }),
    })),
  });
  globalThis.gtoPreflopPackNextNode = (_pack, _nodeId, observed) => {
    const match = policyActions.find(action => action.type === observed.type &&
      (action.raiseToMilliBB === undefined || action.raiseToMilliBB === observed.raiseToMilliBB));
    return match
      ? { ok: true, terminal: transitionTerminal, nodeId: transitionTerminal ? null : 'child',
          action: { actionId: match.actionId, type: match.type } }
      : { ok: false, reason: 'gto-unavailable:off-tree-action' };
  };

  const action = (actionId, type, raiseToMilliBB, probability) => ({
    actionId, type,
    ...(raiseToMilliBB == null ? {} : { raiseToMilliBB }),
    frequencies: frequencies(probability),
  });
  const install = specs => {
    const probability = 1 / specs.length;
    policyActions = specs.map(([id, type, size]) => action(id, type, size, probability));
  };
  const begin = (options = {}) => {
    const heroBet = options.heroBet == null ? 50 : options.heroBet;
    const heroChips = options.heroChips == null ? 9950 : options.heroChips;
    const opponentChips = options.opponentChips == null ? 9900 : options.opponentChips;
    const players = [
      {
        i: 0, pos: 'SB/BTN', out: false, sittingOut: false, folded: false, allIn: false,
        acted: options.acted === true, chips: heroChips, bet: heroBet, totalBet: heroBet,
        hole: [{ r: 14, s: 0 }, { r: 14, s: 1 }],
      },
      {
        i: 1, pos: 'BB', out: false, sittingOut: false, folded: false,
        allIn: options.opponentAllIn === true, acted: false,
        chips: opponentChips, bet: 100, totalBet: 100,
        hole: [{ r: 7, s: 3 }, { r: 2, s: 2 }],
      },
    ];
    state = {
      cfg: { gameType: 'cash' }, stage: 'preflop', ante: 0, sb: 50, bb: 100,
      handNum: (typeof state === 'undefined' ? 0 : state.handNum || 0) + 1,
      currentBet: 100, lastRaiseSize: 100, players,
    };
    gtoPreflopBeginHand();
    return players[0];
  };
  const query = (specs, options) => {
    install(specs);
    const hero = begin(options);
    const policy = gtoPreflopCurrentPolicy(hero);
    return { policy, valid: state.gtoPreflop.valid, reason: state.gtoPreflop.reason };
  };

  const legalFacingBet = query([
    ['fold', 'fold'], ['call', 'call'], ['raise-2500', 'raise', 2500], ['jam', 'all-in', 100000],
  ]);
  const missingCall = query([
    ['fold', 'fold'], ['raise-2500', 'raise', 2500],
  ]);
  const wrongCheck = query([
    ['fold', 'fold'], ['check', 'check'], ['call', 'call'],
  ]);
  const legalFreeOption = query([
    ['check', 'check'], ['raise-2500', 'raise', 2500], ['jam', 'all-in', 100000],
  ], { heroBet: 100, heroChips: 9900 });
  const foldWhenFree = query([
    ['fold', 'fold'], ['raise-2500', 'raise', 2500],
  ], { heroBet: 100, heroChips: 9900 });
  const raiseNotReopened = query([
    ['fold', 'fold'], ['call', 'call'], ['raise-2500', 'raise', 2500],
  ], { acted: true });
  const passiveWhenNotReopened = query([
    ['fold', 'fold'], ['call', 'call'],
  ], { acted: true });
  const raiseWithoutResponder = query([
    ['fold', 'fold'], ['call', 'call'], ['raise-2500', 'raise', 2500],
  ], { opponentAllIn: true, opponentChips: 0 });
  const passiveWithoutResponder = query([
    ['fold', 'fold'], ['call', 'call'],
  ], { opponentAllIn: true, opponentChips: 0 });
  const underMinimumRaise = query([
    ['fold', 'fold'], ['call', 'call'], ['raise-1500', 'raise', 1500],
  ]);
  const legalShortAllIn = query([
    ['fold', 'fold'], ['call', 'call'], ['short-jam', 'all-in', 1500],
  ], { heroChips: 100 });
  const fakeAllIn = query([
    ['fold', 'fold'], ['call', 'call'], ['fake-jam', 'all-in', 5000],
  ]);
  const normalRaiseAtMaximum = query([
    ['fold', 'fold'], ['call', 'call'], ['raise-max', 'raise', 100000],
  ]);
  const overMaximum = query([
    ['fold', 'fold'], ['call', 'call'], ['over-max', 'raise', 101000],
  ]);
  const fractionalChipTarget = query([
    ['fold', 'fold'], ['call', 'call'], ['fractional', 'raise', 2501],
  ]);
  const raiseNotAboveCurrent = query([
    ['fold', 'fold'], ['call', 'call'], ['not-above', 'raise', 1000],
  ]);

  install([
    ['fold', 'fold'], ['call', 'call'], ['raise-2500', 'raise', 2500], ['jam', 'all-in', 100000],
  ]);
  const observedHero = begin();
  gtoPreflopObserveAction(observedHero, 'raise', {
    preflopRaisesBefore: 0, callAmt: 50, targetBB: 2.5, isAllIn: false,
  });
  const observed = {
    valid: state.gtoPreflop.valid,
    terminal: state.gtoPreflop.terminal,
    reach: state.gtoPreflop.players[0].rangeRaw[0],
  };

  transitionTerminal = true;
  const prematureHero = begin();
  gtoPreflopObserveAction(prematureHero, 'raise', {
    preflopRaisesBefore: 0, callAmt: 50, targetBB: 2.5, isAllIn: false,
  });
  const prematureTerminal = {
    valid: state.gtoPreflop.valid,
    reason: state.gtoPreflop.reason,
  };

  transitionTerminal = false;
  childActorSeat = 0;
  const wrongActorHero = begin();
  gtoPreflopObserveAction(wrongActorHero, 'raise', {
    preflopRaisesBefore: 0, callAmt: 50, targetBB: 2.5, isAllIn: false,
  });
  const wrongChildActor = {
    valid: state.gtoPreflop.valid,
    reason: state.gtoPreflop.reason,
  };

  return {
    legalFacingBet, missingCall, wrongCheck, legalFreeOption, foldWhenFree,
    raiseNotReopened, passiveWhenNotReopened, raiseWithoutResponder,
    passiveWithoutResponder, underMinimumRaise, legalShortAllIn, fakeAllIn,
    normalRaiseAtMaximum, overMaximum, fractionalChipTarget, raiseNotAboveCurrent, observed,
    prematureTerminal, wrongChildActor,
  };
})()`, context);

assert.equal(results.legalFacingBet.policy.ok, true);
assert.equal(results.legalFacingBet.policy.branches.length, 4, 'a legal node must retain every branch');

for (const result of [results.missingCall, results.wrongCheck, results.foldWhenFree]) {
  assert.equal(result.policy.ok, false);
  assert.equal(result.policy.reason, 'gto-unavailable:runtime-passive-action-set');
  assert.equal(result.valid, false, 'an illegal action set must invalidate exact tracking');
}
assert.equal(results.legalFreeOption.policy.ok, true);

assert.equal(results.raiseNotReopened.policy.reason, 'gto-unavailable:runtime-aggressive-action');
assert.equal(results.passiveWhenNotReopened.policy.ok, true);
assert.equal(results.raiseWithoutResponder.policy.reason, 'gto-unavailable:runtime-aggressive-action');
assert.equal(results.passiveWithoutResponder.policy.ok, true);

assert.equal(results.underMinimumRaise.policy.reason, 'gto-unavailable:runtime-full-raise');
assert.equal(results.legalShortAllIn.policy.ok, true, 'an exact stack-limited short all-in must remain legal');
assert.equal(results.fakeAllIn.policy.reason, 'gto-unavailable:runtime-all-in');
assert.equal(results.normalRaiseAtMaximum.policy.reason, 'gto-unavailable:runtime-full-raise');
assert.equal(results.overMaximum.policy.reason, 'gto-unavailable:runtime-action-size');
assert.equal(results.fractionalChipTarget.policy.reason, 'gto-unavailable:runtime-action-size');
assert.equal(results.raiseNotAboveCurrent.policy.reason, 'gto-unavailable:runtime-action-size');

assert.equal(results.observed.valid, true);
assert.equal(results.observed.terminal, false);
assert.ok(Math.abs(results.observed.reach - Math.fround(0.25)) < 1e-8,
  'observed reach must use the original branch frequency without filtering or renormalizing');
assert.equal(results.prematureTerminal.valid, false);
assert.equal(results.prematureTerminal.reason, 'gto-unavailable:terminal-state-mismatch');
assert.equal(results.wrongChildActor.valid, false);
assert.equal(results.wrongChildActor.reason, 'gto-unavailable:next-actor-seat');

const unsupportedRules = vm.runInContext(`(() => {
  state.cfg.rake = { kind: 'percentage', basisPoints: 500, capMilliBB: 4000, noFlopNoDrop: true };
  const rake = gtoPreflopScenario();
  state.cfg.rake = { kind: 'none' };
  const noRake = gtoPreflopScenario();
  delete state.cfg.rake;
  state.cfg.straddle = true;
  const straddle = gtoPreflopScenario();
  delete state.cfg.straddle;
  return { rake: rake.reason, noRake: noRake.ok, straddle: straddle.reason };
})()`, context);
assert.equal(unsupportedRules.rake, 'gto-unavailable:rake-unsupported');
assert.equal(unsupportedRules.noRake, true, 'canonical {kind:none} must match the engine no-rake rules');
assert.equal(unsupportedRules.straddle, 'gto-unavailable:straddle-unsupported');

const roundedTail = vm.runInContext(`(() => {
  const currentPolicy = gtoPreflopCurrentPolicy;
  gtoPreflopCurrentPolicy = () => ({ ok: true, branches: [
    { actionId: 'fold', type: 'fold', frequency: 0.49999, target: 0 },
    { actionId: 'raise', type: 'raise', frequency: 0.49999, target: 250 },
    { actionId: 'zero-tail', type: 'call', frequency: 0, target: 0 },
  ] });
  const selected = gtoPreflopSampleDecision({}, () => 1 - Number.EPSILON).selected.actionId;
  gtoPreflopCurrentPolicy = currentPolicy;
  return selected;
})()`, context);
assert.equal(roundedTail, 'raise', 'Float32 rounding tails must never select a zero-frequency action');

console.log('preflop runtime legality tests passed');
