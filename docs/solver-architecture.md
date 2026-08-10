# Solver architecture

## Upstream choice

The exact provider uses `b-inary/postflop-solver` through its official `b-inary/wasm-postflop` browser application. At the selection snapshot on 2026-08-10, the repositories had roughly 362 and 584 GitHub stars respectively. More important than popularity, the upstream project publishes a benchmark in which its bet frequency, equity, and EV closely match PioSOLVER and GTO+ for the same tree.

The upstream open-source project has been development-frozen since October 2023. This integration therefore pins exact commits and artifacts instead of following a moving branch. TexasSolver was not embedded because its repository requests a commercial license for integration and its own comparison was materially less convincing. A small MIT DCFR experiment was also rejected because it lacked the usage history and browser application of b-inary's engine and did not publish a precomputed preflop blueprint that could be pinned and audited.

## Strategy-provider flow

```text
uniform 1,326-combo priors + public preflop actions
                         |
                         v
          independent baseline reach tracker
                         |
                         v
                  support router
                   /          \
 covered heads-up chip-EV      uncovered line / multiway / ICM / error
             |                                  |
             v                                  v
      b-inary WASM worker                explicit fallback provider
             |
             v
 converged hand mix + action EVs + both players' reach weights
             |
             +---- exact action + runout propagation to next street
             +---- conditional coach override
             +---- cached bot mixed-strategy sample
             +---- saved decision provenance
```

`js/solver.js` owns this boundary. `js/coach.js` still produces a complete fallback result first; a cached solved strategy replaces its action, native sizing, EVs, confidence, mix, and explanation only when the support router accepts the chip-EV model, the real line replays exactly, and the exploitability target was reached. This keeps poker-domain fallbacks independent from the WASM runtime and prevents a worker or memory failure from blocking the game.

## Inputs and tree abstraction

- Every seat begins with the same unconditioned 1,326-combination prior. Public preflop actions multiply that range by the independent baseline policy; player personalities, observed tendencies, and `rangeModel` are never read by the solver provider.
- The bundled preflop policy covers only 80–120 BB, ante-free cash RFI plus one call/BB-defence nodes represented by `charts.js`. Because those charts are pure/overlap action abstractions rather than a complete mixed-frequency blueprint, the UI does not call them universal GTO. An unsupported node invalidates solver eligibility for the hand.
- The board, starting pot, effective stack, and exact ordered action history are captured at the beginning of every street.
- At a street transition, the exact previous action history and actual turn/river card are replayed into the converged tree. The worker's full-combo reach weights become the next street's input ranges. If the previous tree was unavailable, nonconverged, off-tree, or lacked the actual runout, no turn/river solve is promoted.
- OOP and IP receive the same baseline action set: 33%/67% flop bets, 50%/75% turn bets, 50%/75%/100% river bets, 2.5× raises, and solver-managed all-ins.
- A custom size already used in the real line is added only to that street and actor's action set. The compact retry preserves observed sizes. If the exact action and target still cannot be replayed, the result is rejected rather than mapped to a nearby node.
- The solver runs compressed, single-threaded DCFR in a Worker. It targets 0.3% of the starting pot in exploitability, with the upstream default ceiling of 1,000 iterations.
- A tree estimated above 512 MB is retried with one baseline bet size per street plus the sizes required by the observed line. If it remains too large, the provider returns the labeled memory fallback.

The private-card postflop game is not bucketed. The result is a converged equilibrium for the full-combo, discrete action tree and supplied personality-free baseline reach ranges; it is not a continuous no-limit solution or a claim that the bundled preflop chart abstraction is universal GTO.

## Cache and invalidation

The LRU cache stores at most 48 compact node results in memory and `localStorage`. A key includes:

- provider schema plus pinned solver and WASM commits;
- street and board;
- starting pot and effective stack;
- hashes of both full ranges;
- action-tree configuration;
- ordered action history;
- acting seat and exact private cards.

Changing any material game input naturally invalidates the hit. Cached data contains only mixed frequencies, action EVs, sizing, exploitability, and provenance—not full game trees.

## Deliberate fallbacks

| Spot | Authoritative provider | Reason |
|---|---|---|
| Covered heads-up postflop cash/chip-EV | Range-resolved WASM solver | Independent preflop baseline and exact reach chain are available |
| Preflop | Existing position/stack chart provider | Vendored engine is postflop-only |
| Limp, 3-bet/squeeze, unsupported defence, non-cash or off-policy hero range | Range-aware heuristic | Bundled preflop baseline has no exact node/frequency data |
| Turn/river without a preceding converged tree and exact runout replay | Range-aware heuristic | Equilibrium reach cannot be reconstructed honestly |
| Multiway postflop | Range-aware heuristic | Standard postflop solver models are heads-up |
| Payout-sensitive tournament with more than two players alive | ICM-aware heuristic | A chip-EV solution would optimize the wrong objective, including checked-to betting nodes |
| Player already all-in | Equity/runout logic | No betting decision remains |
| Resume began mid-street without solver history | Range-aware heuristic | Cannot reconstruct a trustworthy root pot/range snapshot |
| Worker, browser, or memory failure | Range-aware heuristic | Game remains responsive and the UI names the fallback |
| Nonconverged tree or exact line/sizing unavailable | Range-aware heuristic | Approximate output is never promoted to a solved recommendation |

## Licensing and deployment

The integrated solver is AGPL-3.0, so the repository is distributed under AGPL-3.0-or-later. Provenance and checksums are in `THIRD_PARTY_NOTICES.md` and `vendor/wasm-postflop/README.md`.

The single-thread build avoids COOP/COEP headers and fits the existing static deployment. The Worker, JavaScript chunk, WASM binary, and Comlink are included in the service-worker cache for offline PWA use. Direct `file://` use cannot reliably create the Worker across browsers; in that mode the game stays functional and labels the fallback.
