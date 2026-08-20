# Sit & Go Hold'em

A free No-Limit Texas Hold'em tournament game vs AI. No install, no ads, works offline — open `poker.html` in any browser (loads `js/*.js` modules; optional single-file bundle via `node scripts/build.mjs bundle`). Plays on desktop and mobile.

## Quick start

Double-click `poker.html`, or serve it from any static host. Set up your table (players, blinds, buy-in, ante, blind speed, AI difficulty) and play.

## Code layout

Game logic is split from `poker.html` into ordered modules (shared global scope):

| File | Responsibility |
|------|----------------|
| `js/eval.js` | Hand evaluation (`evalFive`, `evalSeven`, `handName`), deck helpers, `seatOrderFromDealer` (side-pot tiebreaks) |
| `js/modes/registry.js` | Game mode dispatcher (`registerMode`, `getMode`, `isCashGame`) |
| `js/modes/tournament.js` | Sit & Go rules: blind ladder, antes, elimination |
| `js/modes/cash.js` | Cash game rules: fixed blinds, auto-rebuy, session P&L |
| `js/engine.js` | Shared NLHE core: game state, hand flow (`startHand`, `applyAction`, showdown/side pots), sound/haptics/chip animations, resume snapshots |
| `js/solver.js` | Strategy-provider layer, b-inary WASM solver bridge, action-tree replay, result cache, and explicit fallback routing |
| `js/preflop-policy-pack.js` | Strict local policy-pack registry: schema/config/checksum/convergence gates and deterministic 169→1,326 expansion |
| `js/preflop-blueprint.js` | Preflop policy routing, exact mixed-frequency reach tracking, and explicitly labeled heuristic fallback ranges |
| `js/coach.js` | Preflop charts, `mcEquityR`, `coachDecide`, ICM, fallback logic, coach prose (EN/FR/ES) |
| `js/ai.js` | AI profiles (`STYLES`), `aiDecide`, range/equity reads |
| `js/mp.js` | PeerJS multiplayer, host migration, public checkpoints, P2P snapshots |
| `js/ui.js` | i18n UI strings, rendering, coach panel display, replayer, session review, init/wiring |

`poker.html` holds HTML/CSS plus `<script src="js/…">` tags. `charts.js` remains separate as heuristic fallback chart data; it is not an exact-frequency equilibrium pack.

### Build

```bash
node scripts/build.mjs multifile   # default — refresh js/*.js from git HEAD monolith & wire poker.html
node scripts/build.mjs extract     # re-split js/*.js only
node scripts/build.mjs bundle      # inline app modules; exact solver assets remain in vendor/
```

Edit the modules under `js/`, then run `multifile` (or deploy as-is — Vercel serves the repo root as static files; no build step). A bundled HTML opened without its `vendor/` folder still works, but supported solver nodes use the labeled heuristic fallback.

## Features

- **Engine confidence suite**: Web Crypto card shuffling by default, opt-in seeded dealing for reproducible bug reports, pure/tested side-pot settlement, and one-command `npm test` coverage for engine rules, ranges, scenarios, and rendered mobile layout.
- **Multiplayer 2.0**: Sit & Go or cash tables, sit-out/sit-back-in, same-room rematches, reconnect/host migration checkpoints, and an explicit fairness disclosure.
- **👥 Multiplayer with friends (P2P, no server)**: create a room, share the invite link (your address bar IS the link), friends join from any browser — host-authoritative WebRTC with free signaling, each player receives only their own hole cards. Open a table alone and play starts when friends arrive; start vs AI bots and friends replace them as they join; late joiners spectate live until dealt in next hand. Built-in chat, auto-start at N players, **host migration** (host dies → another player takes over from a public checkpoint), seat+chips reconnect, version handshake, connection self-test. 100% free, nothing to install or maintain
- **Configurable Sit & Go**: 2–9 players, starting blinds ($10/$20 up to $100/$200 — the whole blind ladder scales), buy-in in BB (50–200), ante as a fraction of the BB (none / 5% / 10% / 20%), turbo/standard/slow blind schedule (turbo raises blinds every 5 hands)
- **Cash game mode** (solo vs AI): choose **Cash Game** on the start screen — same NLHE rules with **fixed SB/BB every hand** (blinds do not escalate; no antes). Starting stack in BB (50–200), auto-rebuy on bust, live **session P&L** in the top bar, resume mid-session, quit anytime for a session summary. Multiplayer stays Sit & Go only for now.
- **Money display**: $ and BB shown everywhere, casino-style chip stacks
- **Live Coach** (toggleable): validated local preflop policies when an exact configuration pack is registered, clearly labeled chart fallback otherwise, range-conditioned equity postflop, order-of-action awareness, bet-size-aware range reading, and plain-English reasoning
- **Visible ICM teaching**: tournament calls affected by prize value receive a dedicated Live Coach section showing stack rank, stack at risk, coverage and the exact increase from chip-odds break-even to the ICM-adjusted threshold; cash games never show it
- **Bluff break-even teaching**: recommended bets and raises show `risk ÷ (pot + risk)`, the fold rate a pure bluff needs, beside the coach's modeled fold rate; showdown equity is explicitly treated as additional value rather than double-counted
- **Strategy intent labels**: every recommendation identifies itself as a balanced baseline or an exploitative adjustment driven by opponent profiles and observed action
- **Read sample confidence**: explicitly estimated fallback range panels show the number of visible actions behind the read and label it early, tentative or reliable; solver-covered matrices instead identify their equilibrium-reach source and never show a personality-read confidence label
- **Process over outcome**: post-hand feedback calls out correct decisions that lost and winning hands containing estimated-EV mistakes
- **Situation plans in plain language**: the coach identifies squeeze opportunities over capped callers, warns about dominated top pairs and counterfeit-prone two pair, sizes postflop bets from board texture, labels purposeful flop floats, categorizes the turn plan, and selects river blocker bluffs only against credible folders
- **Dedicated bluff assessment**: every live recommendation is classified as value, protection, semi-bluff, pure bluff, range aggression, bluff-catch or “do not bluff”; the panel explains fold drivers and risks, compares required with estimated folds, shows equity when called, and gives a response plan. Persistent opponent reads learn who folds or calls under pressure across hands, with small-sample smoothing and difficulty-scaled influence
- **Draw Engine 2.0**: the coach distinguishes open-ended straights, single gutshots, double gutshots, ace-low edge cases and runner-runner straight/flush backdoors; exact outs are deduplicated across combined draws, filtered for dirty cards and never produce negative usable equity after risk discounts
- **Full-combo postflop solver**: b-inary's open-source Rust CFR engine resolves covered heads-up postflop spots from an independent preflop baseline, carries equilibrium reach through later actions/runouts, shows the mixed strategy and per-action EVs, and drives the range explorer from both players' current-node reach weights after strict line replay and convergence checks
- **Local preflop solver pipeline**: a headless Rust research trainer plays its abstract game through the river, checkpoints deterministically, and exports provenance-rich floating-point policies. Browser policy packs are accepted only after strict configuration, tree, checksum, coverage, and convergence gates; research exports cannot silently become coach recommendations.
- **Stats & training**: post-hand feedback, session + lifetime stats (persisted), full hand-history export to JSON, plus an internal admin `.txt` audit export of up to 20 hands from the current game with action context and AI-coach/solver metadata for recommendation debugging; starting a fresh game resets this audit buffer while resuming preserves it
- **Blunder report**: every decision is scored against the coach's line in chip-EV; deviations show their estimated EV cost live, the coach panel tracks total "EV leaked" this game, and the game-over screen lists your top 5 costliest mistakes ("Hand #14 · turn — coach: FOLD, you: CALL — −$1,800")
- **Hand replayer**: browse every hand of the current game and step through it street by street — board reveals progressively, hole cards shown, action log per street. After quitting (or any time), "Review past hands" on the start screen replays your full saved history, timestamped per hand
- **Counterfactual Hand Explorer**: every saved hero decision in the replayer compares Fold, Check/Call and Raise side by side, marks the actual choice, coach choice and highest-EV alternative, explains each line and preserves the coach's table-time EV snapshot for new hands while clearly labeling reconstructed estimates for older history
- **Prominent raise sizing**: the coach's recommendation button reads "RAISE TO $60 · 3 BB" and the bet slider pre-sets to the suggested size — pressing R takes exactly the coach's line
- **Per-game poker stats**: VPIP, PFR, aggression factor and won-at-showdown tracked live in the coach panel
- **Resume tournament**: progress is saved at every hand boundary; refreshing, closing the tab, or using **Quit** mid-game offers a resume button on the start screen (permanent abandonment remains under **Clear saved data**)
- **Mid-hand resume (solo)**: progress is saved after every action — refresh mid-pot and recover cards, board, bets, and whose turn. Because lossless policy reach is not yet serialized, equilibrium tracking fails closed for that resumed hand instead of inventing a range.
- **Session Review 2.0**: finished games are logged with win rate, ITM %, avg finish, total net and cumulative EV leaked; repeated leaks are ranked by total cost and frequency, individual mistakes can be filtered by spot/street/recent sessions, and every listed decision opens its exact hand in the replayer
- **Focused scenario replay**: launch a drill directly from a prioritized Session Review leak and answer up to 10 comparable saved decisions before seeing the coach's recommendation; new decisions preserve pot, price, position, opponent count and prior-action context
- **Coach confidence labels**: every live recommendation states whether it comes primarily from a preflop chart, exact pot math plus simulated range equity, or a broader multiway range heuristic, with high / medium / limited confidence explained in plain language
- **Advanced leak analytics**: Session Review groups every saved coach decision by position, street, stack depth and pot type, reports coach-match accuracy plus EV lost, compares the latest 10 sessions with the previous 10, surfaces plain-language conclusions and warns when a sample is too small to trust
- **Adaptive AI opponents**: bots learn only from the player's visible actions across sessions; Easy adapts minimally, Medium cautiously and Hard uses the full confidence-weighted read, with the detected tendency explained in Session Review
- **Automatic table-size strategy**: the existing player-count control stays unchanged while bot and coach ranges transition automatically through Heads-up, 3-handed, 4-handed, 5-handed, true 6-max and 7–9 player full-ring; short-handed tables progressively widen opens, defenses and pressure, scaled by AI difficulty
- **Adaptive Improvement Plan**: Session Review continuously recalculates the player's three highest-impact skills from real decisions and EV loss, explains exactly what to work on, combines table decisions with focused-drill results into a persistent mastery score, shows recent improvement/regression and launches the relevant practice queue directly
- **Custom Scenario Builder**: enter hero cards, board, position, opponents, effective stack, pot, price and opponent profile; get range-equity analysis with confidence disclosure, play the decision before revealing the answer, save/load locally, copy a shareable URL and generate a 10-variation focused drill
- **Keyboard shortcuts**: F fold · C check/call · R raise · 1–4 bet sizes (min / ½ pot / pot / all-in) · N next hand
- **Offline mode (PWA)**: visit the hosted game once and it works with no internet afterwards; installable to home screen / dock. The local file always works offline by nature
- **Multi-language**: English, Français, Español — selector on the start screen and in the game header; choice persists. everything is translated, including the coach's full reasoning, hand names ("une Paire de Dix", "Trío de Seises"), draw names and board warnings
- **Mobile-first & touch-friendly**: responsive portrait layout, thumb-sized action buttons, slide-down coach sheet, compact table that fits all 9 seats on a phone, notch-safe insets
- **Game feel**: chips slide into the pot at the end of each street and push out to the winner, winner-seat pop, animated result banner, cards flip face-up at showdown, plus haptic feedback on mobile (your turn, your action, winning a pot)
- **More polish**: card/chip deal animations, generated sound effects with mute, auto/manual next hand, fast-forward when you fold, position badges (UTG, CO, BTN, SB, BB…). All motion respects `prefers-reduced-motion`.

## How the AI works

The AI combines three independent layers: a **difficulty level** (how well it reads its hand), a **player profile** (its temperament), and **tournament-pressure adaptation** (how its play shifts as blinds rise).

### Difficulty levels

All three run the same pipeline — estimate equity, compare to pot odds, decide — but differ in accuracy and aggression.

| | Easy | Medium | Hard |
|---|---|---|---|
| Equity estimation | 35 Monte Carlo sims | 70 sims | 160 sims (most accurate) |
| Judgment noise | ±0.22 (often misreads) | ±0.10 | ±0.045 (rarely wrong) |
| Calling | calls too wide (−0.12 vs odds) | break-even pot odds | tight, value-driven |
| Raising | rarely (~35% even with strong hands) | ~55% when ahead | ~75%, position-aware |
| Bluffing | almost never | occasional | semi-bluffs, small bluff-raises |
| Short stack | no adaptation | push/fold under 10 BB | push/fold under 10 BB |
| Position | ignored | ignored | late-position bonus |

The big lever is **judgment noise**: Easy "feels" its hand is much better or worse than it is, so it stacks off light and folds winners. Hard almost always knows where it stands. None of them can see your cards — Hard just estimates more accurately and prices its decisions tighter.

### Player profiles

On top of difficulty, every bot is dealt a random temperament (shown on its seat). Each profile has its own **heuristic preflop opening range** (scaled from the bundled position charts), bet-sizing multiplier, and decision biases — not just label tweaks on the same formula:

| Profile | Opens (~UTG→BTN) | Raises with | Bluffs | Bet size | Short stack |
|---|---|---|---|---|---|
| 🪨 **Tight** | ~6%→21% | top 8% only | rarely | 0.70× | tight push/fold; over-folds to raises |
| 📞 **Loose** | ~16%→57% | top 15% only | never | 0.85× | calls shoves too wide; won't fold |
| 🦈 **Aggressive** | ~12%→48% (+ steals) | top 22% | sometimes | 1.15× | position-aware push/fold; adapts fully |
| 🔥 **Wild** | ~17%→61% | top 35% | often | 1.40× | shoves wide late; aggression varies hand-to-hand |

Postflop, bots estimate equity against opponents' **betting ranges** (same model as the coach). Profile bluffing: rocks and stations never bluff; sharks c-bet more in position; maniacs bluff most and sometimes check back.

**How to exploit them:**
- 🪨 **Tight** — steal relentlessly; they fold too much and almost never fight back.
- 📞 **Loose** — value-bet thin, never bluff; they call everything but only bet when strong.
- 🦈 **Aggressive** — toughest opponent; respect pressure but trap when you have it.
- 🔥 **Wild** — trap with strong hands; call down lighter than vs anyone else.

### Tournament-pressure adaptation (blind pressure)

Real players don't play the same with 100 BB at level 1 as with 15 BB at level 8 — and crucially, **different profiles adapt differently**. The game models this with a *pressure* factor derived from effective stack depth in big blinds (deep = 0, short ≤ 12 BB = 1), scaled by each profile's **adapt coefficient**:

| Profile | Adapt | Behavior as blinds rise |
|---|---|---|
| 🦈 Aggressive | 1.00 | Adapts most — tightens up early with deep stacks, then widens stealing ranges and fights hard for pots when short. The hallmark of a strong player. |
| 🔥 Wild | 0.70 | Already loose; gets even spewier under pressure. |
| 📞 Loose | 0.35 | Keeps calling, but starts open-shoving when short because it can't fold. |
| 🪨 Tight | 0.20 | Barely changes — still folds too much even when the blinds are eating its stack. Its exploitable flaw. |

As pressure rises, an adapting bot lowers the equity it needs to continue, widens its raising/3-bet threshold, raises more often, and — especially from late position in unopened pots — opens up its **stealing** range to fight for the blinds and antes that are now worth winning. A 🦈 shark on the button with 18 BB will open hands it would fold at 100 BB; a 🪨 rock in the same spot mostly won't budge.

## Cash game mode

Pick **Cash Game** on the start screen (Sit & Go is still the default). Cash uses the same hand engine and live coach as tournaments, with mode-specific rules in [`js/modes/cash.js`](js/modes/cash.js):

| | Sit & Go | Cash |
|---|---|---|
| Blinds | Escalate on a schedule | **Fixed** SB/BB every hand |
| Antes | Optional | None |
| Bust | Eliminated | **Auto-rebuy** to starting stack |
| Session end | Win tournament or bust | **Quit** → P&L summary |
| Coach | ICM, M-ratio, blind-pressure | Chip EV only; no ICM/M-ratio panel row |

**Setup:** players, blind level ($10/$20 … $100/$200), starting stack (BB), difficulty, optional turn timer. Ante, blind speed, and multiplayer are hidden in cash.

**Coach in cash:** heuristic preflop charts, equity, pot odds, and postflop buckets unchanged. Tournament-only prose (ICM, Harrington M, “blinds up in N hands”) is off. At **50+ BB**, the coach adds deep-stack cash notes (implied odds, IP steals). **SPR** (stack-to-pot ratio) appears postflop with zone-specific prose. **BB defense charts** vs CO/BTN/SB steals. Iso charts apply only when someone **limped** — the big blind alone does not count.

**Cash stats:** live panel shows **BB/100**, net in BB, and rebuys. Session review filters All / Cash / Sit & Go with cash-specific BB/100 summary.

**AI in cash:** bots use **depth-based** ranges instead of escalating-blind pressure — wider opens IP when deep (100 BB), more postflop c-bets and calls from stations, push/fold only under ~14 BB. Rocks stay tight; maniacs bluff more with deep stacks.

## Coach & equilibrium solvers

- **Preflop, strict path**: an audited, app-pinned production policy pack supplies the mixed action frequencies for the current cards, complete stack vector, blinds, table size, action history, and discrete tree. The current game has no rake, ante, or straddle, and the production gate rejects packs that claim rules the engine does not implement. The coach and bots consume the same accepted mix before any profile, Bayesian, chart, or equity heuristic. Raise sizes, round termination, and acting seats must match the real engine state exactly. The shipping trust allowlist is currently empty, so no self-declared pack can acquire a solver label.
- **Preflop, current shipping state**: no production pack is bundled yet. The existing position/depth charts therefore remain an explicitly labeled heuristic fallback, including their tournament-pressure, 3-bet/fold, and push/fold adjustments. They are not presented as exact-frequency GTO.
- **Local trainer**: `tools/preflop-solver` is an AGPL headless Rust MCCFR/DCFR research engine for 2–9 players. It uses real fold/showdown/side-pot payoffs through the river rather than an equity tax, but its postflop cards and bet sizes are abstracted. Its exports are hard-coded `production_ready: false` until a separate exploitability/deviation validator and full coverage gates exist. See [`tools/preflop-solver/README.md`](tools/preflop-solver/README.md).
- **Postflop**: equity is simulated against opponents' *realistic ranges* — each call/raise narrows their assumed range, scaled by their profile **and by bet size** (a pot-sized raise or overbet is read far tighter than a small stab), not random cards.
- **Big-bet discipline**: facing large bets the coach discounts raw equity (big bets are usually made hands), warns against chasing 4-out gutshots into them, and never tells you to "take a free card" on the river — street-aware advice throughout.
- **Order of action**: every recommendation shows whether you're first or last to talk on the current street (or the upcoming flop when preflop).
- **Checks as information**: a check trims the top of an opponent's assumed range (personality-scaled — a maniac's check says more than a shark's); check-raises read as traps; checked-to-you in position triggers stab recommendations at capped ranges.
- **No-hand discipline**: with no made hand (high cards only, or just the board's pair) and no real draw, the coach heavily discounts equity when facing bets — bettors usually have at least a pair, and "pot-odds correct" high-card calls are a classic leak.
- **ICM / prize pressure**: real payout structures with Malmuth-Harville prize-equity math; calls that risk tournament life require extra equity near the bubble, shown and explained in the panel.
- **Line reading**: continuation bets, double/triple barrels, donk bets and check-raises each narrow opponent ranges differently — and the coach explains each in plain language.
- **Blockers & playability**: ace blockers vs big bets, nut-flush blockers, suited-connector playability beyond raw rankings.
- **Postflop exploitation**: bluff-catching decisions adjust to WHO is betting (rocks don't bluff; maniacs do; stations' raises are real).
- **Range-resolved equilibrium provider** (heads-up postflop): uses [`b-inary/postflop-solver`](https://github.com/b-inary/postflop-solver) through the official [`b-inary/wasm-postflop`](https://github.com/b-inary/wasm-postflop) build. It solves all 1,326 private-card combinations without hand-strength buckets or rollout-valued leaves and returns the mixed strategy, action EVs, and both players' current-node reach weights. Those exact reach weights now feed the 13×13 solver matrix. Personality-conditioned `rangeModel` posteriors cannot enter either the solver provider or a solver-labeled matrix.
- **Reach propagation**: validated packs start every seat from all 1,326 exact private-card combinations and multiply the acting player's reach by the selected action frequency without renormalizing. The HU postflop solver then extracts both players' current-node reach after exact replay. When no production pack is present, the older chart reach may still feed a useful HU postflop solve, but provenance remains `heuristic-preflop-chart` and `exactFrequencies:false`.
- **Strict coverage**: policy packs are keyed by the exact table size and full game configuration; no 9-max position compression, nearest-stack substitution, or off-tree size snapping is allowed. The current postflop engine is heads-up only. A hand that began 3–9 handed is not handed off as an audited equilibrium line after folds because folded-card bunching is not yet represented.
- **Practical action abstraction**: flop uses 33%/67%, turn 50%/75%, river 50%/75%/100%, plus 2.5× raises and all-ins. An observed custom size is added to the next tree when needed. Action matching is exact inside that discrete tree; the converged result is still an approximate equilibrium of the configured abstraction, not unrestricted poker.
- **Validated strategy override**: converged output overrides the heuristic recommendation, feeds native action sizes and frequencies into the mix panel, is cached by board/ranges/stacks/history/hand, and can be sampled by bots. The primary displayed action is the highest-frequency branch; every displayed mixed branch remains valid. The old 8-bucket “GTO-lite” CFR implementation has been removed.
- **Honest fallbacks**: missing/mismatched/research-only preflop packs, uncovered lines, a missing prior-street equilibrium reach, multiway pots, payout-sensitive tournament play, all-in nodes, non-replayable lines, and hosts without WebAssembly use explicitly labeled heuristic or unavailable states rather than GTO. Deterministic solver errors fail closed; only transient runtime failures retry.
- **Runtime model**: a single-thread Web Worker is preferred, while hosts that block or omit workers run the same pinned WASM engine directly on the main thread. Large trees retry with a compact exact action set, and convergence continues to the exploitability target rather than stopping at an arbitrary iteration ceiling. Exact solving requires HTTP(S); opening the HTML directly still runs the rest of the game with labeled fallbacks.
- **License**: the solver is AGPL-3.0, so this integrated application is distributed under AGPL-3.0-or-later. Exact upstream commits and vendored checksums are recorded in `vendor/wasm-postflop/README.md` and `THIRD_PARTY_NOTICES.md`.

## Changelog

### 2026-08-20 — Local equilibrium-first preflop foundation
- Added a strict, checksum-verified policy-pack boundary with exact configuration matching, mixed-frequency actions, 1,326-combo reach propagation, and fail-closed off-tree routing
- Routed the coach and bots through the same validated baseline before all exploit/profile logic; retained the existing charts only as an explicitly heuristic fallback
- Added a headless 2–9-player Rust full-hand abstract-game trainer with deterministic checkpoints and research-only exports; no production pack is claimed yet

### 2026-08-20 — Exact solver-reach range matrices
- Replaced Bayesian/personality matrices in solver-covered nodes with the two full-combo reach distributions extracted from the converged CFR node
- Solver street roots show the supplied reach; after a current-street action the matrix waits for exact node extraction instead of briefly showing a Bayesian or stale root range
- Added explicit solver provenance (including whether the preflop prior is audited or heuristic), removed read-confidence metadata from solver matrices, and preserved the distinction in saved range snapshots and audit exports
- Added lossless sparse/dense Float32 reach caching, invalidated the old result schema, and capped disk usage independently from the in-memory LRU

### 2026-08-18 — Heads-up 3-bet-pot solver coverage
- Added personality-free opener-continuation ranges for ordinary RFI/3-bet/call cash pots
- The full-combo postflop solver can now resolve those covered flops and records the exact preflop line in solver provenance
- Kept limped pots, squeezes, 4-bets, all-ins, multiway pots, and payout-sensitive ICM spots on explicitly labeled non-solver providers; deep limped trees exceed the browser memory budget even under an impractically narrow action tree
- Split coach strategy labels into preflop chart, all-in range/equity, ICM-adjusted, custom heuristic, exploitative, and resolved-equilibrium sources

### 2026-08-10 — Full-combo Rust/WASM postflop strategy provider
- Replaced the 8-bucket display-only CFR mini-solver with b-inary's full-combo postflop solver
- Solver recommendations now override the coach in supported heads-up chip-EV nodes and expose the real mixed frequencies and action EVs
- Added a shared solver cache/path for bot decisions, explicit chart/heuristic/ICM fallback labels, worker progress, memory limits, PWA assets, and EN/FR/ES UI copy
- Added AGPL licensing and pinned third-party provenance
- Removed personality-conditioned ranges from the equilibrium provider; added independent preflop public-action reach tracking and exact postflop reach carry across streets

### 2026-06-12 — Cash coach tier: SPR, BB defense, session stats
- **SPR row + prose (cash)**: postflop stack-to-pot ratio in coach panel with deep/medium/low zone notes (en/fr/es)
- **BB defense charts**: `charts.js` `bbDefend` vs CO/BTN/SB; coach 3-bet/call/fold branch + matrix viewer
- **Cash session stats**: BB/100 and net in BB in live stats; session review filters All / Cash / SNG with cash BB/100 summary

### 2026-06-12 — Cash depth: coach prose + tuned bots
- **Coach (cash, 50+ BB)**: deep-stack notes on implied odds, IP steals; lower set-mining / suited-connector thresholds; depth-based open widening (not blind-pressure)
- **AI (cash)**: depth-based opens and steals, wider postflop play deep, push/fold only &lt;14 BB, slightly larger IP opens at 60+ BB

### 2026-06-12 — Cash coach polish
- **Limp detection fix**: BB blind post no longer counted as a limper — facing BB only uses RFI charts, iso charts only with real limps
- **Coach panel**: M-ratio row hidden in cash mode (tournament-only metric)

### 2026-06-12 — Cash game mode
- **Main menu toggle**: Sit & Go vs Cash Game; tournament-only setup rows (ante, blind speed, multiplayer) hidden in cash
- **`js/modes/`**: `registry.js`, `tournament.js`, `cash.js` — mode hooks keep shared `engine.js` clean
- **Cash rules**: fixed blinds, auto-rebuy to starting stack, session P&L top bar, quit → session summary
- **Coach**: ICM/M-ratio/ante widen disabled in cash via `coachFlags`

### 2026-06-12 — Coach depth: iso charts, shove ladders, multiway buckets, spot brief
- **Iso charts** (`charts.js`): per-position raise-over-limp matrices; coach uses them when facing limpers (not just RFI)
- **Shove depths**: 12 BB and 20 BB ladders added (now 5 / 8 / 10 / 12 / 15 / 20)
- **Multiway buckets**: IP/OOP, paired board, flush-draw board, big pot, squeeze spots
- **Spot brief**: structured top-line summary (equity, price, position, villain line) before detailed prose

### 2026-06-12 — Turbo blind schedule
- **Turbo** raises blinds every **5 hands** (was 3)

### 2026-06-12 — Coach: stack dominance (big stack vs table)
- **Relative stack edge**: when you have ~1.35×+ the largest stack (or ~1.55× average), late-position steal/iso ranges widen slightly; borderline hands can iso-raise for pressure — not loose calls

### 2026-06-12 — Coach teaching: leaks, micro-lessons, multiway, dirty outs
- **Leak finder** (session review): groups EV lost by spot — preflop opens, facing raises, c-bet defense, multiway, river calls (with high-card subtotals); persisted per game in `decisions[]`
- **Post-hand micro-lesson**: immediate one-line why when you deviate from the coach (uses discounted equity vs pot odds / air penalty)
- **Multiway postflop buckets**: checked-to-you, facing c-bet, wet/dry board guidance when 2+ opponents (an explicitly heuristic fallback where the solver is HU-only)
- **Dirty outs**: tainted outs row (pairs board, 4th flush card) alongside clean outs

### 2026-06-12 — Coach: draw outs listed
- **Live coach outs row**: when you have a draw, the coach lists the exact cards that complete it (e.g. all four 2s for a gutshot)

### 2026-06-12 — Coach: multi-street passive lines
- **Check–check reads**: tracks `checkStreets` per player; coach calls out 2+ consecutive passive streets with **profile-specific** prose (🪨 capped / 🔥 air / 🦈 trap risk / 📞 medium pairs) and multiway “table looks weak” notes

### 2026-06-12 — Mobile collapsible action menu
- **Tap-to-open action panel (landscape right)**: on phones in forced/native landscape, a scrollable panel slides in from the **landscape right** (inside the rotated game frame); tap **◀ Menu** / **◀ Your turn**, tap the table to dismiss

### 2026-06-12 — Mobile landscape layout (rotated phone)
- **Forced-landscape (`body.fl`)**: smaller seats/cards, wider felt inset, inward seat slots so topbar/action bar no longer cover players
- **Topbar**: horizontal scroll + safe-area padding so **Quit** stays reachable; compact checkbox row

### 2026-06-12 — Modular source layout
- **Split `poker.html` logic** into `js/eval.js`, `js/engine.js`, `js/coach.js`, `js/ai.js`, `js/mp.js`, `js/ui.js` — same behavior, shared globals, load order documented in README
- **`scripts/build.mjs`**: `extract` / `multifile` (default deploy) / `bundle` (optional single-file inline for offline double-click)

### 2026-06-12 — Mobile bet legibility + accessibility
- **Mobile bet amounts**: on phones, floating bet chips show for **you** and the **current actor** only (compact amount label; full chip stack on desktop)
- **Pinch-zoom disabled on mobile**: viewport locked again (`user-scalable=no`) — accidental zoom while tapping was more annoying than helpful
- **Dialog focus trap**: replay, session review, range chart, game-over, and MP lobby — Tab cycles inside, Escape dismisses, focus returns on close
- **`aria-live` coach**: `#coachBody` announces advice updates to screen readers
- **Larger touch targets**: topbar checkboxes and setup timer toggle use 44px hit areas; `:focus-visible` outlines on primary controls
- **Mobile coach off by default**: no longer auto-opens on your turn — only shows when you enable **Live coach** (top bar or action-bar **Coach** button)

### 2026-06-12 — Phase B: session review + mid-hand resume
- **Session review dashboard** (setup screen): win rate, ITM %, avg finish, total net, cumulative EV-leaked sparkline; tap any finished game to replay its hands
- **Mid-hand resume (solo)**: snapshot after every action — deck, board, bets, ranges, and turn; button reads "Resume mid-hand" when a pot is in progress
- **Game records** now store `gameId` + difficulty for linking to hand history

### 2026-06-12 — Phase A: smarter AI + exact side pots
- **Range-based postflop equity**: bots use `mcEquityR` against opponents' `rangeCap`/`rangeFloor` (same reads the coach uses), not random hands
- **Profile postflop behavior**: rocks/stations never bluff; rocks fold more to barrels; stations call wider; sharks c-bet more IP; maniacs bluff more with occasional check-backs
- **Exact side-pot splits**: odd chips go to winners left of the dealer — no more $5 rounding artifacts

### 2026-06-12 — Tier 1 UX fixes
- **All-in button**: uses your full stack exactly (`bet + chips`) — the raise slider step no longer leaves chips behind (e.g. $3,650 not $3,520)
- **MP turn timer**: clients no longer auto-fold locally (`guest` → `client` role fix); only the host enforces timer actions
- **Mobile coach**: thumb-reachable **Coach** toggle in the action bar (synced with topbar checkbox); off by default on phones — enable **Live coach** when you want the sheet
- **Haptics decoupled from mute**: vibration works even when sound is off
- **`prefers-reduced-motion`**: also disables active-seat glow, timer pulse, coach sheet slide, emote animations
- **PWA install**: static manifest link, `theme-color`, and `apple-touch-icon` in `<head>`

### 2026-06-12 — Profile-specific AI ranges & behavior
- **Distinct preflop ranges per profile**: rocks open ~6–21%, stations ~16–57%, sharks ~12–48% (wider steals on CO/BTN), maniacs ~17–61% — scaled by position from bundled heuristic charts, not shared equity thresholds
- **Stations never bluff** and only raise with top ~15%; **rocks over-fold to raises** and bet at 0.70× sizing; **maniac aggression varies** (~22% check-back, randomized raise frequency); **sharks widen steals** from late position under blind pressure
- **Short-stack modes** (<12 BB): profile-specific push/fold — rocks tight, stations call too wide, maniacs shove any two from late position

### 2026-06-12 — Timer reliability & coach deception layer
- **Turn timer is now throttle-proof**: auto check/fold is enforced from the 350 ms UI loop based on the deadline itself, not just `setTimeout` — it fires reliably even when the browser throttles or drops timers (phone screen dim, tab switch, suspended PWA, game resumed from a snapshot). Guests never enforce; the host stays authoritative.
- **Coach "Mix it up" tips**: rarely (~1 in 8 eligible spots, deterministic so it doesn't flicker), the coach suggests deviating from the EV-best line — raise instead of call, surprise bet instead of check, trap instead of raise with a monster — so observant opponents can't pattern-read you. Never on clear folds, all-ins, ICM prize-pressure spots or short stacks. EN/FR/ES.
- **React button readable**: emote/chat buttons now use full text color + semibold

### 2026-06-11 — Multiplayer polish
- **Open table**: start alone with bots off — you wait at your own table and dealing begins automatically when the first friend arrives
- **Humans beat robots**: friends joining a bots game replace the shortest-stacked AI instead of growing the table (start solo, end up heads-up vs your friend)
- **Late joiners spectate**: joining a running game shows the live table (fully redacted — no cards visible) until you're dealt in at the next hand
- **Auto-start at N players** (lobby option), **🔧 connection self-test** (staged diagnosis: signaling cloud → WebRTC), **protocol version handshake** ("both refresh" message instead of ghost failures, version tag in lobby), accurate join errors (room not found / connection blocked / room full)
- **Postflop range viewer**: facing any bet, "📊 View the bettor's estimated range" opens the 13×13 grid of hands the coach currently puts them on — built live from their actions

### 2026-06-11 — Host migration: the game survives the host
- **The host can vanish — the tournament continues.** Every hand, the host broadcasts a public checkpoint (chips, seats, blind level — never hole cards). If the host disconnects, players first try to rejoin (maybe it was their own link); if the room is truly gone, the first remaining player automatically becomes the new host at a deterministic room id, rebuilds the game from the checkpoint, and everyone reconnects. Verified live: killed the host tab mid-game, the guest promoted itself and kept playing
- **Player reconnect**: a disconnected player's seat and chips are kept — they auto-fold while away and reclaim everything by rejoining with the same name (even via the original invite link, which now probes migrated rooms)
- **Late join**: joining a running game queues you politely — dealt in at the next hand with a fresh stack
- The host's address bar now carries `#room=CODE`, so the URL itself is the invite link

### 2026-06-11 — Multiplayer rooms & chat (P2P, serverless)
- **Play with friends**: create a room, copy the invite link (`#room=CODE`), friends join with their name — host's browser runs the game, guests connect peer-to-peer via WebRTC (PeerJS free cloud signaling). No server, no accounts, $0
- **Fair by construction**: the host sends each player a personalized, redacted view — your opponents' hole cards never reach your device until showdown
- **Chat** (💬 in the action bar), AI-fill for empty seats, live coach works for every player on their own cards, graceful disconnect handling (folded + announced)
- BB added to the short-stack shove charts (the chart button now appears in the big blind too)

### 2026-06-11 — Vs-raise charts, matrix viewer & resizable panel
- **3-bet / call / fold charts**: when someone raises before you, the fallback coach now consults bundled heuristic vs-raise matrices (different ranges vs an early-position raiser and a late-position one) — big pairs re-raise for value, hands like A5s re-raise as "blocker bluffs", a teal middle tier flat-calls, the rest folds, each explained in plain words. ICM can still override a chart call near the bubble, and the coach says so
- **Two-tier matrix viewer**: the 13×13 grid now shows gold = re-raise, teal = call, dark = fold for vs-raise spots
- **Drag-resizable coach panel (desktop)**: grab the panel's right edge and drag — 240 to 620px, the table reflows live, width remembered across sessions

### 2026-06-11 — Heuristic range charts (external data file)
- **`charts.js`**: heuristic per-position range matrices live in an external, human-editable data file — raise-first-in charts for all 8 positions (UTG 11% → BTN 41%) and short-stack all-in charts at 10 BB and 5 BB depths
- **`charts.js` expanded**: per-raiser-position 3-bet/call matrices (UTG through SB), **iso-over-limp** ranges, and shove ladders at 5 / 8 / 10 / 12 / 15 / 20 BB; coach picks the nearest depth automatically
- The fallback coach consults the bundled chart first and uses the percentile engine when no chart covers the spot (facing raises, missing file), with both paths labeled heuristic
- Unlike a single hand-ranking cutoff, matrix lists can encode non-linear shapes (suited connectors and small pairs enter ranges "early", weak offsuit broadways late)
- Tournament-pressure scaling, antes, profiles, ICM and all postflop logic apply unchanged on top

### 2026-06-11 — Coach benchmark
- **🧪 Coach benchmark** button on the start screen: simulates 25 full 9-player tournaments where a bot follows the coach's advice on every single decision, then reports win rate, in-the-money rate and average finish vs a random player baseline. First measurements: the coach bot wins ~3–4× the random baseline. This is the live measuring stick for every future coach improvement
- The coach brain was refactored into a pure, headless decision engine (`coachDecide`) — the on-screen panel and the benchmark bot now share the exact same logic by construction
- **Hard-mode regression benchmark**: `node scripts/benchmark-hard.mjs 100` runs the coach policy against eight hard bots and fails when the coach wins >18%, finishes top-three >46%, or averages better than 4.35th place.

### 2026-06-11 — The road to "follow the coach, win the tournament"
- **💰 ICM prize pressure**: the game now has a real payout structure (50/30/20 for 7–9 players, 65/35 for 5–6, winner-takes-all under 5) and the coach computes Malmuth-Harville ICM. When a call risks your tournament life near the bubble, the panel shows "Prize pressure: +6% extra needed" and explains in plain words why chips you might lose are worth more than chips you might win
- **Reading the story of the hand**: the coach now understands betting lines — a routine continuation bet barely narrows a range, a second/third barrel narrows it hard, a donk bet into the raiser reads as strength, a check-raise reads as a trap — and explains each read in plain language
- **Blockers**: holding an ace against a big bet (fewer monster aces in his range) or the ace of the flush suit (he can't have the nut flush) now adjusts and explains the decision
- **Suited connectors**: recognized as playing above their raw ranking when deep — hidden straights and flushes win big pots
- **Exploit the player postflop**: facing a bet, the coach uses WHO bet — a 🪨 rock's big bet almost never bluffs (fold more), a 🔥 maniac's bet is bluff-heavy (call lighter), a 📞 station's sudden raise is always real — and says so in plain words


### 2026-06-11 — Tournament pressure & live training
- **M-ratio & Harrington zones in the coach**: every recommendation shows "M = 14 · yellow zone", with a warning when the next blind level will drop you a zone ("look for spots now rather than being forced later")
- **Stack-depth steal scaling**: the heuristic fallback widens late-position opening ranges progressively from 25 BB down to 10 BB (BTN ~42% → ~60%) while keeping early position disciplined; this is a coaching abstraction, not solver output
- **Ante-aware opens**: dead money from antes widens recommended opening ranges proportionally
- **Profile-aware stealing**: the coach reads the profiles still to act — steal wider when rocks/tights wait behind, tighter into stations and maniacs who defend or 3-bet
- **🧮 Live mental math teaching**: facing any bet, the coach shows how to compute the price (call ÷ (pot + call)), estimate win% with the ×4/×2 outs rule, and apply the same discounts it uses — so you can do it at a real table


### 2026-06-10 — Mobile & data control
- **Forced landscape on phones**: hold your phone any way you like — the game always renders in landscape (rotated automatically when held portrait); installed PWAs request landscape natively
- **Mobile layout fixes**: the start menu scrolls instead of clipping on phones, modals stay inside the viewport, replayer controls compact, extra-small tier (≤390px) shrinks seats/cards, and a seat clamp keeps every seat inside the felt so plates never spill onto the action bar
- **"Clear saved data" button** on the start menu with an ℹ️ explainer — wipes lifetime stats, hand history and any resumable tournament from the browser (language choice kept), with confirmation

### 2026-06-10 — Languages
- **French and Spanish**: language selector on the landing page and the game header — translates the full UI chrome, coach labels and recommendations, stats, blunder report, replayer and game-over screens
- **Fully translated coach reasoning**: all ~40 advice templates (preflop charts, push/fold, set-mining, pot odds, big-bet discounts, stabs, river logic), localized hand names, draw names, board-texture warnings and solver provenance notes — in all three languages

### 2026-06-10 — Reading the action & offline play
- **Checks carry information**: range floors trim opponents' top hands on checks (scaled by personality), check-raises read as traps and narrow ranges hard, stab recommendation when checked to in position — all flowing into the heuristic equity simulation and exploit model, never into the CFR solver's input ranges
- **No-hand call discipline**: the coach no longer recommends "pot-odds" calls with high cards and no draw against bets — equity is discounted ~15% in those spots and the panel explains why
- **Pocket-pair implied odds**: deep stacks (40 BB+) widen pair opens (set-mining value); 15-to-1 set-mine calls vs raises
- **Offline mode (PWA)**: service worker + manifest — the hosted game keeps working without internet and can be installed as an app
- **Vercel deploy support**: root URL serves the game


### 2026-06-10 — Training & quality of life
- **Blunder report**: every decision scored against the coach in chip-EV; live "−$X EV" tags on deviations, "EV leaked" total in the coach panel, top-5 costliest mistakes on the game-over screen
- **Hand replayer**: browse every hand of the current game, step through it street by street with progressive board reveal and per-street action log
- **Per-game stats**: VPIP, PFR, aggression factor, won-at-showdown in the coach panel
- **Resume tournament**: auto-saved at every hand boundary; pick up where you left off after a refresh or restart
- **Keyboard shortcuts**: F fold · C check/call · R raise · 1–4 bet sizes · N next hand

### 2026-06-10 — Smarter coach & table setup
- Coach reads **bet size as information**: pot-sized raises and overbets narrow the opponent's assumed range sharply; raw equity is discounted against big bets, with an explicit warning against chasing gutshots into them
- Coach reads **checks as information too**: a check trims the top of an opponent's assumed range (scaled by personality — a maniac's check says more than a shark's), check-raises read as traps and narrow ranges hard, and when everyone checks to you in position the coach recommends stabbing at capped ranges
- **Order-of-action awareness**: every recommendation shows first/last to act on the current street, and preflop advice accounts for your *future* postflop position
- Street-aware advice — no more "take a free card" on the river
- Start menu: selectable **starting blinds** (whole ladder scales), **buy-in in BB**, **ante** (% of BB)
- **Turbo** now raises blinds every 5 hands

Built with Claude.
