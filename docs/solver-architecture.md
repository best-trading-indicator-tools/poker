# Solver architecture

## Upstream choice

The exact provider uses `b-inary/postflop-solver` through its official `b-inary/wasm-postflop` browser application. At the selection snapshot on 2026-08-10, the repositories had roughly 362 and 584 GitHub stars respectively. More important than popularity, the upstream project publishes a benchmark in which its bet frequency, equity, and EV closely match PioSOLVER and GTO+ for the same tree.

The upstream open-source project has been development-frozen since October 2023. This integration therefore pins exact commits and artifacts instead of following a moving branch. TexasSolver was not embedded because its repository requests a commercial license for integration and its own comparison was materially less convincing. A small MIT DCFR experiment was also rejected because it lacked the usage history and browser application of b-inary's engine and did not publish a precomputed preflop blueprint that could be pinned and audited.

## Strategy-provider flow

```text
audited, app-pinned pack for the exact configuration
        | exact mixed actions + 1,326-combo reaches
        |                            OR
        +------ unavailable ------> labeled heuristic charts
                                      (never solver/GTO-labeled)
                         |
                         v
              heads-up postflop support router
                   /                       \
 covered chip-EV tree                     multiway / ICM / all-in /
             |                            off-tree / unavailable host
             v                                      |
  b-inary WASM worker/direct host                    v
             |                              explicit fallback provider
             v
 converged hand mix + action EVs + both players' node reaches
             |
             +---- exact action + runout propagation to next street
             +---- current-node equilibrium range matrices
             +---- conditional coach override and bot mix
             +---- saved prior provenance and validation evidence
```

`js/preflop-policy-pack.js` is the strict preflop trust and decoding boundary. A pack must match the exact table configuration, pass schema/tree/probability/checksum/convergence checks, and have its manifest hash pinned by the application. The shipping allowlist is empty and no production pack is bundled, so current preflop play uses the explicitly labeled heuristic charts. The local Rust trainer is research-only and its exports cannot self-promote into this path.

`js/solver.js` owns the postflop boundary. `js/coach.js` still produces a complete fallback result first; a cached solved strategy replaces its action, native sizing, EVs, confidence, mix, explanation, and displayed opponent ranges only when the support router accepts the chip-EV model, the real line replays exactly, and the exploitability target was reached. A solver-covered node never displays the personality/Bayesian posterior as if it were solver output. At an action-free street root the matrix uses the solver input reach; after any current-street action it waits for extraction of that node's converged reach weights. The UI distinguishes a postflop equilibrium conditioned on an audited exact-frequency pack from one conditioned on heuristic, personality-free chart reaches.

## Inputs and tree abstraction

- A validated pack starts every seat with all 1,326 exact private-card combinations. Each observed action multiplies the actor's unnormalized reach by that combo's exact mixed frequency. Pack lookup is keyed by table size, ordered stacks, blinds, ante, rake, positions, action tree, and exact history. No nearest configuration or action is substituted.
- `charts.js` is only a personality-free heuristic fallback. It contains hand lists rather than a solved mixed-frequency tree and carries `exactFrequencies:false`. It may seed a useful heads-up postflop subgame, but neither the recommendation nor the resulting conditional solve is labeled as an end-to-end GTO solution.
- Player personalities, observed tendencies, and Bayesian `rangeModel` state are never read by either the audited-pack path or the postflop solver. Exploit recommendations remain a separate, explicitly labeled provider.
- The board, starting pot, effective stack, and exact ordered action history are captured at the beginning of every street.
- At a street transition, the exact previous action history and actual turn/river card are replayed into the converged tree. The worker's full-combo reach weights become the next street's input ranges. If the previous tree was unavailable, nonconverged, off-tree, or lacked the actual runout, no turn/river solve is promoted.
- At every solved decision node, both players' full-combo reach arrays are extracted from the WASM result. The range explorer maps them with the solver's rank-major/reversed-suit card indexing, then applies only known board/hero blockers before normalization. It does not call the Bayesian posterior or personality model.
- OOP and IP receive the same baseline action set: 33%/67% flop bets, 50%/75% turn bets, 50%/75%/100% river bets, 2.5× raises, and solver-managed all-ins.
- A custom size already used in the real line is added only to that street and actor's action set. The compact retry preserves observed sizes. If the exact action and target still cannot be replayed, the result is rejected rather than mapped to a nearby node.
- The solver runs compressed, single-threaded DCFR in a Worker when the host permits one. Embedded hosts without a usable Worker run the same pinned WASM engine directly rather than dropping to a heuristic. It targets 0.3% of the starting pot in exploitability and continues until that target is reached instead of abandoning the solve at an arbitrary iteration count.
- Every eligible street is solved before action resumes, preserving an authoritative tree for exact turn/river reach propagation. A tree estimated above 512 MB is rebuilt with one baseline bet size per street plus sizes required by the observed line; the compact exact tree is then allowed to allocate the memory it reports.
- Transient worker, asset, WASM, extraction, and allocation failures restart from a clean engine. Covered bot decisions wait for the resolved strategy instead of racing the solver against a heuristic timeout.

The private-card postflop game is not bucketed. The result is a converged equilibrium for the full-combo, discrete action tree and supplied reach ranges. With heuristic chart priors it is only a conditional postflop equilibrium; with an audited pack it is a validated approximate equilibrium of the combined declared abstractions. Neither case is a continuous, unrestricted no-limit solution.

## Cache and invalidation

The memory LRU stores at most 48 compact node results; `localStorage` keeps the newest subset that fits the separate disk ceiling. A key includes:

- provider schema plus pinned solver and WASM commits;
- street and board;
- starting pot and effective stack;
- hashes of both full ranges;
- exact-frequency flag plus full preflop source, line, and policy-node provenance;
- action-tree configuration;
- ordered action history;
- acting seat and exact private cards.

Changing any material game input naturally invalidates the hit. Cached data contains mixed frequencies, action EVs, sizing, exploitability, provenance, and both current-node reach arrays—not full game trees. Reach arrays use an adaptive sparse/dense, lossless Float32 binary encoding. Disk persistence is capped independently from the 48-entry memory LRU so this rebuildable cache cannot crowd out hand-resume data.

## Deliberate fallbacks

| Spot | Authoritative provider | Reason |
|---|---|---|
| Exact-config preflop with an app-pinned audited pack | Validated approximate-equilibrium policy pack | Mixed frequencies and exact action node passed every trust/coverage gate |
| Preflop without such a pack | Heuristic position/stack charts | The vendored engine is postflop-only; charts are not solver output |
| Covered heads-up postflop with audited pack reaches | Range-resolved WASM solver | Exact-frequency preflop prior and postflop reach chain are available |
| Covered heads-up postflop with chart reaches | Range-resolved WASM solver, labeled conditional | The node converged, but its preflop prior remains heuristic |
| Limped pot | Range-aware heuristic | Deep limped trees exceed the browser budget even with an impractically narrow no-raise action abstraction |
| Squeeze, 4-bet, unsupported defence, non-cash or off-policy hero range | Range-aware heuristic | No exact matching audited policy node is available |
| Turn/river without a preceding converged tree and exact runout replay | Range-aware heuristic | Equilibrium reach cannot be reconstructed honestly |
| Multiway postflop | Range-aware heuristic | Standard postflop solver models are heads-up |
| Payout-sensitive tournament with more than two players alive | ICM-aware heuristic | A chip-EV solution would optimize the wrong objective, including checked-to betting nodes |
| Facing an all-in | Range/equity or ICM-aware provider | Shove/call decisions need range equity and, in tournaments, prize utility—not a postflop chip-EV tree |
| Player already all-in with no remaining betting decision | Equity/runout logic | No strategic action remains |
| Resume began mid-street without solver history | Range-aware heuristic | Cannot reconstruct a trustworthy root pot/range snapshot |
| Worker unavailable or blocked | Same range-resolved WASM solver on the main thread | Exact solving remains available in constrained embedded browser hosts |
| WebAssembly or browser protocol unavailable | Range-aware heuristic | The engine cannot execute in that host; the UI names the fallback |
| Transient engine failure or interrupted solve | Automatic exact-solver restart | A covered node remains pending and is never permanently promoted as heuristic |

## Licensing and deployment

The integrated solver is AGPL-3.0, so the repository is distributed under AGPL-3.0-or-later. Provenance and checksums are in `THIRD_PARTY_NOTICES.md` and `vendor/wasm-postflop/README.md`.

The single-thread build avoids COOP/COEP headers and fits the existing static deployment. The Worker, JavaScript chunk, WASM binary, and Comlink are included in the service-worker cache for offline PWA use. Direct `file://` use cannot reliably create the Worker across browsers; in that mode the game stays functional and labels the fallback.
