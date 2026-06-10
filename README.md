# Sit & Go Hold'em

A free, single-file No-Limit Texas Hold'em tournament game vs AI. No install, no ads, works offline — just open `poker.html` in any browser. Engine, AI, GTO solver and UI are all in the one file. Plays on desktop and mobile.

![Gameplay — live coach, GTO mix and per-game stats](docs/screenshot.png)

## Quick start

Double-click `poker.html`, or serve it from any static host. Set up your table (players, blinds, buy-in, ante, blind speed, AI difficulty) and play.

## Features

- **Configurable Sit & Go**: 2–9 players, starting blinds ($10/$20 up to $100/$200 — the whole blind ladder scales), buy-in in BB (50–200), ante as a fraction of the BB (none / 5% / 10% / 20%), turbo/standard/slow blind schedule (turbo raises blinds every 3 hands)
- **Money display**: $ and BB shown everywhere, casino-style chip stacks
- **Live Coach** (toggleable): position-aware preflop advice from GTO charts, range-conditioned equity postflop, order-of-action awareness (first/last to talk, including your *future* postflop position when advising preflop), bet-size-aware range reading, plain-English reasoning
- **GTO mini-solver**: real CFR (counterfactual regret minimization) for heads-up postflop spots — shows the equilibrium mixed strategy with EVs
- **Stats & training**: post-hand feedback, session + lifetime stats (persisted), last-hand replay with all hole cards revealed, full hand-history export to JSON
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

On top of difficulty, every bot is dealt a random temperament (shown on its seat) that shifts how it calls, raises, bluffs and sizes bets:

- 🪨 **Tight (rock)** — folds a lot, only plays strong hands, raises rarely, bets small. Exploitable by stealing relentlessly.
- 📞 **Loose (station)** — calls far too much, but doesn't raise enough. Punish it by value-betting thin and never bluffing.
- 🦈 **Aggressive (shark)** — raises and bluffs more, applies pressure, sizes up. The toughest baseline opponent.
- 🔥 **Wild (maniac)** — huge bets, constant bluffs, very loose. High-variance; trap it with strong hands.

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

- **Preflop**: hands are ranked against all 169 starting hands; advice uses position-based GTO opening ranges, 3-bet/fold logic against raises, and Nash push/fold under ~10 BB. The coach also tells you whether you'll act first or last *after* the flop and tightens/loosens accordingly.
- **Postflop**: equity is simulated against opponents' *realistic ranges* — each call/raise narrows their assumed range, scaled by their profile **and by bet size** (a pot-sized raise or overbet is read far tighter than a small stab), not random cards.
- **Big-bet discipline**: facing large bets the coach discounts raw equity (big bets are usually made hands), warns against chasing 4-out gutshots into them, and never tells you to "take a free card" on the river — street-aware advice throughout.
- **Order of action**: every recommendation shows whether you're first or last to talk on the current street (or the upcoming flop when preflop).
- **GTO mini-solver** (heads-up postflop): runs CFR on an abstracted tree — current street, 66%-pot + all-in sizings, 8 strength buckets, rollout-valued leaves — and prints the equilibrium mix with EVs. Directionally GTO, not solver-exact (multiway pots have no computable GTO, as with commercial solvers).

Built with Claude.
