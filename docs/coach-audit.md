# Live Coach decision audit

Last full run: 2026-07-27

Run it again with:

```sh
npm run audit:coach
```

## Result

The current suite passes **464 / 464 checks**.

| Area | Checks | Result |
| --- | ---: | --- |
| Preflop matrix across 2, 3, 4, 5, 6 and 9 players | 90 | Pass |
| Preflop strategic anchors | 36 | Pass |
| Short-handed position compression | 1 | Pass |
| Postflop strategic anchors | 8 | Pass |
| Price monotonicity | 4 | Pass |
| Street/player-count/difficulty cross-product | 324 | Pass |
| ICM threshold invariant | 1 | Pass |

## What is checked

- Every recommendation is a legal `FOLD`, `CHECK`, `CALL`, `RAISE` or `ALLIN`.
- Equity, adjusted equity and EV outputs remain finite and bounded.
- Every recommended raise has a valid positive target.
- Pocket aces never open-fold at the tested stack depths and table sizes.
- Deep early-position 72o folds at five or more players.
- QJo opens from compressed five-handed UTG at 14 BB.
- Flopped and rivered nuts never fold to a bet.
- Pure air folds against meaningful flop and river bets.
- A free action never recommends folding.
- A nut-flush draw continues at a cheap price.
- A bare gutshot folds against an overbet.
- Making the same call materially more expensive cannot turn a fold into a call.
- ICM pressure is non-negative and cannot reduce the required calling equity.
- Flop, turn and river decisions remain stable across:
  - 2, 3 and 5 players;
  - Easy, Medium and Hard opponents;
  - free actions, small bets and large bets;
  - made hands, pairs, connected hands and air.

## Important interpretation

This audit catches contradictions, illegal actions, impossible numbers and strategically
obvious failures. It is deliberately deterministic and reproducible.

It does **not** prove that every borderline mixed-frequency decision is solver-perfect.
The Live Coach still combines exact pot math with charts, range simulations, heuristics,
an abstracted CFR calculation and estimated future action. Those approximations are
communicated through the confidence label.

The remaining high-end validation step would be to compare a large exported benchmark
set against an external commercial solver for exact frequencies and EV deltas. That is
separate from internal correctness and requires solver-produced reference data.
