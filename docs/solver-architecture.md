# Solver architecture

## Upstream choice

The exact provider uses `b-inary/postflop-solver` through its official `b-inary/wasm-postflop` browser application. At the selection snapshot on 2026-08-10, the repositories had roughly 362 and 584 GitHub stars respectively. More important than popularity, the upstream project publishes a benchmark in which its bet frequency, equity, and EV closely match PioSOLVER and GTO+ for the same tree.

The upstream open-source project has been development-frozen since October 2023. This integration therefore pins exact commits and artifacts instead of following a moving branch. TexasSolver was not embedded because its repository requests a commercial license for integration and its own comparison was materially less convincing. A small MIT DCFR experiment was also rejected because it lacked the usage history and browser application of b-inary's engine.

## Strategy-provider flow

```text
game state + ordered actions + posterior ranges
                    |
                    v
             support router
              /          \
   heads-up chip-EV       preflop / multiway / ICM / error
          |                              |
          v                              v
 b-inary WASM worker              explicit fallback provider
          |
          v
 exact hand mix + action EVs
          |
          +---- authoritative coach recommendation
          +---- cached bot mixed-strategy sample
          +---- saved decision provenance
```

`js/solver.js` owns this boundary. `js/coach.js` still produces a complete fallback result first; a cached solved strategy replaces its action, sizing, EVs, confidence, mix, and explanation only when the support router says the exact chip-EV result is valid. This keeps poker-domain fallbacks independent from the WASM runtime and prevents a worker or memory failure from blocking the game.

## Inputs and tree abstraction

- Both players' 1,326-combination posterior ranges are converted from the app's card ordering to the solver's ordering.
- The board, starting pot, effective stack, and exact ordered action history are captured at the beginning of every street.
- OOP and IP receive the same baseline action set: 33%/67% flop bets, 50%/75% turn bets, 50%/75%/100% river bets, 2.5× raises, and solver-managed all-ins.
- A custom size already used in the real line is added to a rebuilt tree when it is not represented by the baseline abstraction.
- The solver runs compressed, single-threaded DCFR in a Worker. It targets 0.3% of the starting pot in exploitability, with the upstream default ceiling of 1,000 iterations.
- A tree estimated above 512 MB is retried with one bet size per street. If it remains too large, the provider returns the labeled memory fallback.

The private-card game is not bucketed. “Exact” here means the converged strategy for the full-combo, discrete action tree and supplied ranges; it does not mean a continuous no-limit action space.

## Cache and invalidation

The LRU cache stores at most 48 compact node results in memory and `localStorage`. A key includes:

- pinned solver commit;
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
| Heads-up postflop cash/chip-EV | Exact WASM solver | Supported game model |
| Preflop | Existing position/stack chart provider | Vendored engine is postflop-only |
| Multiway postflop | Range-aware heuristic | Standard postflop solver models are heads-up |
| Meaningful tournament ICM | ICM-aware heuristic | A chip-EV solution would optimize the wrong objective |
| Player already all-in | Equity/runout logic | No betting decision remains |
| Resume began mid-street without solver history | Range-aware heuristic | Cannot reconstruct a trustworthy root pot/range snapshot |
| Worker, browser, or memory failure | Range-aware heuristic | Game remains responsive and the UI names the fallback |

## Licensing and deployment

The integrated solver is AGPL-3.0, so the repository is distributed under AGPL-3.0-or-later. Provenance and checksums are in `THIRD_PARTY_NOTICES.md` and `vendor/wasm-postflop/README.md`.

The single-thread build avoids COOP/COEP headers and fits the existing static deployment. The Worker, JavaScript chunk, WASM binary, and Comlink are included in the service-worker cache for offline PWA use. Direct `file://` use cannot reliably create the Worker across browsers; in that mode the game stays functional and labels the fallback.
