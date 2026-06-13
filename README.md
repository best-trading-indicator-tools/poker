# Sit & Go Hold'em

A free, single-file No-Limit Texas Hold'em tournament game vs AI. No install, no ads, works offline — just open `poker.html` in any browser. Engine, AI, GTO solver and UI are all in the one file. Plays on desktop and mobile.

![Gameplay — live coach with per-game stats, GTO advice and order-of-action awareness](docs/screenshot.png)

## Quick start

Double-click `poker.html`, or serve it from any static host. Set up your table (players, blinds, buy-in, ante, blind speed, AI difficulty) and play.

## Features

- **👥 Multiplayer with friends (P2P, no server)**: create a room, share the invite link (your address bar IS the link), friends join from any browser — host-authoritative WebRTC with free signaling, each player receives only their own hole cards. Open a table alone and play starts when friends arrive; start vs AI bots and friends replace them as they join; late joiners spectate live until dealt in next hand. Built-in chat, auto-start at N players, **host migration** (host dies → another player takes over from a public checkpoint), seat+chips reconnect, version handshake, connection self-test. 100% free, nothing to install or maintain
- **Configurable Sit & Go**: 2–9 players, starting blinds ($10/$20 up to $100/$200 — the whole blind ladder scales), buy-in in BB (50–200), ante as a fraction of the BB (none / 5% / 10% / 20%), turbo/standard/slow blind schedule (turbo raises blinds every 3 hands)
- **Money display**: $ and BB shown everywhere, casino-style chip stacks
- **Live Coach** (toggleable): position-aware preflop advice from GTO charts, range-conditioned equity postflop, order-of-action awareness (first/last to talk, including your *future* postflop position when advising preflop), bet-size-aware range reading, plain-English reasoning
- **GTO mini-solver**: real CFR (counterfactual regret minimization) for heads-up postflop spots — shows the equilibrium mixed strategy with EVs
- **Stats & training**: post-hand feedback, session + lifetime stats (persisted), full hand-history export to JSON
- **Blunder report**: every decision is scored against the coach's line in chip-EV; deviations show their estimated EV cost live, the coach panel tracks total "EV leaked" this game, and the game-over screen lists your top 5 costliest mistakes ("Hand #14 · turn — coach: FOLD, you: CALL — −$1,800")
- **Hand replayer**: browse every hand of the current game and step through it street by street — board reveals progressively, hole cards shown, action log per street. After quitting (or any time), "Review past hands" on the start screen replays your full saved history, timestamped per hand
- **Prominent raise sizing**: the coach's recommendation button reads "RAISE TO $60 · 3 BB" and the bet slider pre-sets to the suggested size — pressing R takes exactly the coach's line
- **Per-game poker stats**: VPIP, PFR, aggression factor and won-at-showdown tracked live in the coach panel
- **Resume tournament**: progress is saved at every hand boundary; refreshing or closing the tab mid-game offers a "Resume tournament" button on the start screen
- **Mid-hand resume (solo)**: progress is also saved after every action — refresh mid-pot and pick up exactly where you left off (cards, board, bets, whose turn)
- **Session review dashboard**: finished games are logged with win rate, ITM %, avg finish, total net, cumulative EV leaked chart, and tap-any-game → hand replayer
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

On top of difficulty, every bot is dealt a random temperament (shown on its seat). Each profile has its own **preflop opening range** (scaled from GTO charts by position), bet-sizing multiplier, and decision biases — not just label tweaks on the same formula:

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

## Coach & GTO solver

- **Preflop**: hands are ranked against all 169 starting hands; advice uses position-based GTO opening ranges scaled by tournament pressure (stack depth in M/BB, antes, and the profiles left to act), 3-bet/fold logic against raises, and Nash push/fold under ~10 BB. The coach shows your M-ratio and Harrington zone, warns before a blind level drops you a zone, and tells you whether you'll act first or last *after* the flop.
- **Postflop**: equity is simulated against opponents' *realistic ranges* — each call/raise narrows their assumed range, scaled by their profile **and by bet size** (a pot-sized raise or overbet is read far tighter than a small stab), not random cards.
- **Big-bet discipline**: facing large bets the coach discounts raw equity (big bets are usually made hands), warns against chasing 4-out gutshots into them, and never tells you to "take a free card" on the river — street-aware advice throughout.
- **Order of action**: every recommendation shows whether you're first or last to talk on the current street (or the upcoming flop when preflop).
- **Checks as information**: a check trims the top of an opponent's assumed range (personality-scaled — a maniac's check says more than a shark's); check-raises read as traps; checked-to-you in position triggers stab recommendations at capped ranges.
- **No-hand discipline**: with no made hand (high cards only, or just the board's pair) and no real draw, the coach heavily discounts equity when facing bets — bettors usually have at least a pair, and "pot-odds correct" high-card calls are a classic leak.
- **ICM / prize pressure**: real payout structures with Malmuth-Harville prize-equity math; calls that risk tournament life require extra equity near the bubble, shown and explained in the panel.
- **Line reading**: continuation bets, double/triple barrels, donk bets and check-raises each narrow opponent ranges differently — and the coach explains each in plain language.
- **Blockers & playability**: ace blockers vs big bets, nut-flush blockers, suited-connector playability beyond raw rankings.
- **Postflop exploitation**: bluff-catching decisions adjust to WHO is betting (rocks don't bluff; maniacs do; stations' raises are real).
- **GTO mini-solver** (heads-up postflop): runs CFR on an abstracted tree — current street, 66%-pot + all-in sizings, 8 strength buckets, rollout-valued leaves — and prints the equilibrium mix with EVs. Directionally GTO, not solver-exact (multiway pots have no computable GTO, as with commercial solvers).

## Changelog

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
- **Mobile coach**: auto-opens on your turn; thumb-reachable **Coach** toggle in the action bar (synced with topbar checkbox)
- **Haptics decoupled from mute**: vibration works even when sound is off
- **`prefers-reduced-motion`**: also disables active-seat glow, timer pulse, coach sheet slide, emote animations
- **PWA install**: static manifest link, `theme-color`, and `apple-touch-icon` in `<head>`

### 2026-06-12 — Profile-specific AI ranges & behavior
- **Distinct preflop ranges per profile**: rocks open ~6–21%, stations ~16–57%, sharks ~12–48% (wider steals on CO/BTN), maniacs ~17–61% — scaled by position from GTO charts, not shared equity thresholds
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
- **3-bet / call / fold charts**: when someone raises before you, the coach now consults vs-raise solver matrices (different ranges vs an early-position raiser and a late-position one) — big pairs re-raise for value, hands like A5s re-raise as "blocker bluffs", a teal middle tier flat-calls, the rest folds, each explained in plain words. ICM can still override a chart call near the bubble, and the coach says so
- **Two-tier matrix viewer**: the 13×13 grid now shows gold = re-raise, teal = call, dark = fold for vs-raise spots
- **Drag-resizable coach panel (desktop)**: grab the panel's right edge and drag — 240 to 620px, the table reflows live, width remembered across sessions

### 2026-06-11 — Solver range charts (external data file)
- **`charts.js`**: real per-position GTO range matrices now live in an external, human-editable data file — raise-first-in charts for all 8 positions (UTG 11% → BTN 41%) and short-stack all-in charts at 10 BB and 5 BB depths, approximating published solver/Nash ranges
- The coach consults the chart FIRST ("77 is in the MP opening chart — solver-computed ranges say raising it is profitable") and falls back to the percentile engine when no chart covers the spot (facing raises, missing file) — so the single-file copy still works standalone
- Unlike a single hand ranking with cutoffs, true matrices capture solver non-linearities (suited connectors and small pairs enter ranges "early", weak offsuit broadways late)
- Tournament-pressure scaling, antes, profiles, ICM and all postflop logic apply unchanged on top

### 2026-06-11 — Coach benchmark
- **🧪 Coach benchmark** button on the start screen: simulates 25 full 9-player tournaments where a bot follows the coach's advice on every single decision, then reports win rate, in-the-money rate and average finish vs a random player baseline. First measurements: the coach bot wins ~3–4× the random baseline. This is the live measuring stick for every future coach improvement
- The coach brain was refactored into a pure, headless decision engine (`coachDecide`) — the on-screen panel and the benchmark bot now share the exact same logic by construction

### 2026-06-11 — The road to "follow the coach, win the tournament"
- **💰 ICM prize pressure**: the game now has a real payout structure (50/30/20 for 7–9 players, 65/35 for 5–6, winner-takes-all under 5) and the coach computes Malmuth-Harville ICM. When a call risks your tournament life near the bubble, the panel shows "Prize pressure: +6% extra needed" and explains in plain words why chips you might lose are worth more than chips you might win
- **Reading the story of the hand**: the coach now understands betting lines — a routine continuation bet barely narrows a range, a second/third barrel narrows it hard, a donk bet into the raiser reads as strength, a check-raise reads as a trap — and explains each read in plain language
- **Blockers**: holding an ace against a big bet (fewer monster aces in his range) or the ace of the flush suit (he can't have the nut flush) now adjusts and explains the decision
- **Suited connectors**: recognized as playing above their raw ranking when deep — hidden straights and flushes win big pots
- **Exploit the player postflop**: facing a bet, the coach uses WHO bet — a 🪨 rock's big bet almost never bluffs (fold more), a 🔥 maniac's bet is bluff-heavy (call lighter), a 📞 station's sudden raise is always real — and says so in plain words


### 2026-06-11 — Tournament pressure & live training
- **M-ratio & Harrington zones in the coach**: every recommendation shows "M = 14 · yellow zone", with a warning when the next blind level will drop you a zone ("look for spots now rather than being forced later")
- **Stack-depth steal scaling**: late-position opening ranges widen progressively from 25 BB down to 10 BB (BTN ~42% → ~60%), early position stays disciplined — matching Harrington zone theory and solver stack-depth ranges
- **Ante-aware opens**: dead money from antes widens recommended opening ranges proportionally
- **Profile-aware stealing**: the coach reads the profiles still to act — steal wider when rocks/tights wait behind, tighter into stations and maniacs who defend or 3-bet
- **🧮 Live mental math teaching**: facing any bet, the coach shows how to compute the price (call ÷ (pot + call)), estimate win% with the ×4/×2 outs rule, and apply the same discounts it uses — so you can do it at a real table


### 2026-06-10 — Mobile & data control
- **Forced landscape on phones**: hold your phone any way you like — the game always renders in landscape (rotated automatically when held portrait); installed PWAs request landscape natively
- **Mobile layout fixes**: the start menu scrolls instead of clipping on phones, modals stay inside the viewport, replayer controls compact, extra-small tier (≤390px) shrinks seats/cards, and a seat clamp keeps every seat inside the felt so plates never spill onto the action bar
- **"Clear saved data" button** on the start menu with an ℹ️ explainer — wipes lifetime stats, hand history and any resumable tournament from the browser (language choice kept), with confirmation

### 2026-06-10 — Languages
- **French and Spanish**: language selector on the landing page and the game header — translates the full UI chrome, coach labels and recommendations, stats, blunder report, replayer and game-over screens
- **Fully translated coach reasoning**: all ~40 advice templates (preflop charts, push/fold, set-mining, pot odds, big-bet discounts, stabs, river logic), localized hand names, draw names, board-texture warnings and GTO solver notes — in all three languages

### 2026-06-10 — Reading the action & offline play
- **Checks carry information**: range floors trim opponents' top hands on checks (scaled by personality), check-raises read as traps and narrow ranges hard, stab recommendation when checked to in position — all flowing into the equity sim and the CFR solver
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
- **Turbo** now raises blinds every 3 hands

Built with Claude.
