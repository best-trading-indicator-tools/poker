# Local preflop blueprint trainer

This is a headless, local research trainer. It does not call a hosted solver or
use proprietary range data. Sampled hands are played through river betting and
settled with real fold, showdown, and side-pot payoffs. There is no equity-tax
or "check it down" terminal standing in for postflop play.

The trainer uses external-sampling Monte Carlo CFR, the simple
opponent-traversal average-policy estimator, and periodic DCFR-style
discounting. Preflop cards remain in the lossless 169-class suit
symmetry; postflop information is bucketed and betting uses a discrete action
abstraction. Consequently its output is an **approximate strategy for the
declared abstract game**, not exact no-limit hold'em GTO. For three or more
players, CFR also lacks the two-player zero-sum Nash convergence guarantee.

Every export is deliberately marked `production_ready: false`. The browser app
must not call a pack GTO or use it as an authoritative recommendation until a
separate validation milestone adds and passes the appropriate exploitability or
deviation-gain gates.

The regret traversal follows external-sampling MCCFR from Lanctot et al. The
simple average-policy update uses the same opponent-traversal convention as
[OpenSpiel's reference implementation](https://github.com/google-deepmind/open_spiel/blob/master/open_spiel/algorithms/external_sampling_mccfr.cc).
The trainer separately counts those averaging updates. A visited information
set with zero averaging samples is omitted from export; its current
regret-matched policy is never mislabeled as an average policy.

## Commands

From this directory:

```sh
cargo test
cargo run --release -- train \
  --config config/smoke-hu.toml \
  --checkpoint target/smoke.checkpoint.bin
cargo run --release -- resume \
  --checkpoint target/smoke.checkpoint.bin \
  --additional-iterations 200
cargo run --release -- export \
  --checkpoint target/smoke.checkpoint.bin \
  --out target/smoke-pack
cargo run --release -- inspect \
  --checkpoint target/smoke.checkpoint.bin
cargo run --release -- verify \
  --checkpoint target/smoke.checkpoint.bin
```

`cash-100bb-hu.toml` is the first realistic configuration contract. Its one
million iterations are still a calibration run, not a production proof.
Configurations accept `players = 2` through `9`; table sizes and stack models
must be trained and validated independently.

## Model boundary

- Fixed equal starting stacks, blinds, no ante, no rake.
- Sampled private cards and complete public runout, with card removal.
- Exact hand evaluator at showdown and chip-conserving side pots.
- One normal abstract raise plus all-in. The
  `max_non_all_in_raises_per_street` cap applies only to ordinary abstract
  raises; a legal all-in branch remains explicit after that cap.
- Board-aware postflop hand buckets; no postflop value oracle.
- Atomic binary checkpoints preserve every floating-point bit and the exact RNG
  state, making stop/resume identical to an uninterrupted run. Checkpoints also
  bind the algorithm contract, solver source and locked dependencies, target,
  toolchain, build configuration, package version, and checkpoint schema. A different build must
  start a new run rather than mixing regret tables across trainer semantics. The in-memory
  sparse map still needs a sharded/disk-backed store before serious 6-max
  through 9-max runs.
- The milestone trainer is single-threaded. `max_infosets` is a hard failure
  guard, not a claim that its configured count fits a particular memory budget.
  Deterministic batch merging and a measured 36 GB ceiling are prerequisites
  before using all cores of a 48 GB machine.
- The export contains only visited preflop information sets and hand classes
  with at least one true average-policy update. The manifest reports visited,
  exported, and omitted-zero-average counts. Missing rows are unsupported,
  never silently filled or mapped to a neighbor.
- Research JSON retains normalized floating-point frequencies. It deliberately
  avoids lossy integer quantization, so tiny positive mixed actions survive.
- Research exports are intentionally incompatible with the app's production
  pack registry. A future audited promotion step must verify convergence,
  coverage, checksums, and provenance before conversion.
