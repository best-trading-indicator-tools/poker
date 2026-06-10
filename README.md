# Sit & Go Hold'em

A free, single-file No-Limit Texas Hold'em tournament game vs AI. No install, no ads, works offline — just open `poker.html` in any browser.

## Features

- **Configurable Sit & Go**: 2–9 players, starting stack in BB (50–200), optional ante, turbo/standard/slow blind schedule
- **3 AI difficulty levels** (Easy / Medium / Hard) — Hard uses Monte Carlo equity simulation, position awareness, bluffing, and short-stack push/fold
- **AI personalities**: each bot plays a visible style (tight, loose, aggressive, wild) that changes calling, raising, bluffing and bet sizing
- **Live Coach**: position-aware, GTO-chart preflop advice (opening ranges, 3-bet/fold, Nash push/fold) and range-conditioned equity postflop, with plain-English reasoning
- **GTO mini-solver**: real CFR (counterfactual regret minimization) on an abstracted tree for heads-up postflop spots — shows the equilibrium mixed strategy with EVs
- **Money display**: $ and BB shown everywhere (100 BB = $2,000), casino-style chip stacks
- **Stats & training**: post-hand coach feedback, session + lifetime stats (persisted), last-hand replay with all hole cards revealed, full hand-history export to JSON
- **Polish**: card/chip animations, generated sound effects with mute, auto/manual next hand, fast-forward when you fold

## Run it

Double-click `poker.html`, or serve it from anywhere. Everything (engine, AI, solver, UI) is in the one file.

Built with Claude.
