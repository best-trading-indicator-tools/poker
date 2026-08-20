/* ===== coach prose (the "why" explanations), fully translated ===== */
const CPROSE={
en:{
rangesNote:(n,c)=>` Equity is simulated against realistic ranges: ${n} opponent${n>1?'s have':' has'} shown strength and ${n>1?'are':'is'} modeled on roughly the top ${c}% of hands, not random cards.`,
checksNote:n=>` ${n===1?'One opponent has':n+' opponents have'} checked — checks usually deny a strong hand, so the very top of ${n===1?'that range':'those ranges'} is trimmed in the simulation (watch out for traps, though).`,
madeBoardPair:' — careful: that pair sits entirely on the board, so every opponent has it too.',
madeOverpair:' — an overpair, very strong.',madeUnderPair:' — a pocket pair below the top board card.',madeTopPair:' — top pair, solid.',
madeTwoPair:(a,b)=>` — real two pair (${a} and ${b}), strong enough to bet when checked to.`,
madeNotTop:r=>` — not top pair; anyone holding a ${r} is ahead of you.`,
drawFlush:(n,o)=>`flush draw (${n} outs, ≈${o})`,drawOESD:(n,o)=>`open-ended straight draw (${n} outs, ≈${o})`,drawGut:(n,o)=>`gutshot straight draw (${n} outs, ≈${o})`,
drawDoubleGut:(n,o)=>`double-gutshot straight draw (${n} outs, ≈${o})`,
drawBackdoorStraight:o=>`backdoor straight only (needs two specific running ranks, ≈${o} to complete)`,
drawBackdoorFlush:o=>`backdoor flush only (needs the same suit on turn AND river, ≈${o} to complete)`,
backdoorFlushWarn:' You only have a backdoor flush possibility: both remaining cards must be the right suit. That is not a normal one-card flush draw and is too weak to justify this call.',
backdoorStraightWarn:' You only have a backdoor straight possibility: two specific ranks must arrive on turn and river. It is not a normal one-card straight draw and is too weak to justify this call.',
drawBaked:' Your draw is already baked into the win-chance number — hitting it would likely give you the best hand.',
warnFlush:' Three of one suit are on the board — be wary of opponents holding a flush.',
warnPaired:' The board is paired, so full houses and trips are possible.',
multiway:n=>` With ${n} opponents still in, marginal hands shrink in value — someone usually has something.`,
posEarly:p=>` You're in early position (${p}) — most of the table acts after you, so play tighter than normal.`,
posLate:p=>` You're in late position (${p}) — acting after most players is an edge, so you can play slightly looser.`,
futFirst:' After the flop you will be FIRST to act — playing every street out of position is a real handicap, so enter with a stronger range and prefer raising (to take the initiative) over flat calling.',
futLast:' After the flop you will be LAST to act — you see everyone’s move before deciding, which lets you play a few more hands profitably.',
futMid:(o,n)=>` After the flop you will act ${o} of ${n} — middling position, so don’t over-commit with marginal holdings.`,
stFirst:' You act first on this street (out of position) — opponents get to react to you, so lean toward checking marginal hands.',
stLast:' You act last on this street (in position) — everyone has already spoken, so their checks are extra information you can use.',
pfShove:(bb,c,pr,t,p)=>`At ${bb} BB you're in push/fold territory. ${c} (${pr}) is inside the ~${t}% Nash shoving range from ${p} — shove rather than raise small: it maximizes fold equity and avoids being blinded out.`,
pfShortCheck:(c,p)=>`${c} is below the shoving range for ${p}, but checking is free.`,
pfShortCall:(c,e,o)=>`${c} is below a standard shoving range, but your simulated equity (${e}) comfortably beats the price (${o}).`,
pfShortFold:(bb,c,pr,t,p)=>`At ${bb} BB, ${c} (${pr}) is outside the ~${t}% Nash range for ${p}. Fold and wait — even short, patience beats spew.`,
huPush:(bb,c,pr,t,p)=>`Heads-up at ${bb} BB effective, folding or limping gives up too much to the blinds. ${c} (${pr}) is near the bottom of the ~${t}% shove range from ${p}, but it is still a profitable all-in: you can win the pot immediately when the big blind folds, and you retain equity when called. The displayed win chance is your showdown equity if called — it is not the only reason to shove.`,
huOpen:(bb,c,p)=>`Heads-up at ${bb} BB effective is deep enough to play postflop. ${c} is playable from ${p}, but it is not a pure shove spot — open small and keep weaker hands in.`,
huCall:(bb,c,e,o)=>`Heads-up at ${bb} BB effective, calling ranges widen because there is no ladder pressure left. ${c} has about ${e} equity versus the price ${o}, so continue.`,
huFold:(bb,c,pr,t,p)=>`Heads-up at ${bb} BB effective, ${c} (${pr}) is below the ~${t}% shove/continue range for ${p}. Let this one go rather than gambling the match with pure trash.`,
pfOpen:(c,pr,t,p,pair)=>`No one has raised yet, and ${c} (${pr}) is inside the chart-based ~${t}% opening range for ${p}${pair?' once its set-mining value is counted — pocket pairs play above their raw ranking when stacks are deep, because flopping a set (~12%) is disguised and wins big pots':''}. Come in raising, not limping — it takes the initiative and can win the blinds outright.`,
pfBBfree:c=>`${c} isn't strong enough to raise from the big blind, but you see the flop for free.`,
pfOpenFold:(c,pr,t,p)=>`${c} (${pr}) is below the ~${t}% opening range for ${p}. Open-folding here is the textbook play — limping weak hands leaks chips long-term.`,
pfOpenFoldPair:(c,p)=>`${c} is a small pocket pair, but from ${p} with no raise yet it is not a good limp. Small pairs mostly want to flop a set (~12%); if the chart/depth does not support an open-raise, just fold and avoid playing a tiny pair out of position.`,
pf3bet:c=>`${c} is a premium holding (top 5%). Against a raise the standard play is to re-raise (3-bet) for value — flat calling lets weaker hands in cheaply behind you.`,
pfCallRange:(p,ct,c,pr,e,o)=>`Facing a raise, ${p} continues with roughly the top ${ct}% — ${c} (${pr}) qualifies, and your equity vs their range (${e}) covers the price (${o}).`,
pfSetMine:(c,amt,x)=>`${c} doesn't qualify on raw strength, but this is a textbook set-mine: the call is only ${amt} with ~${x}x that behind. You flop a set ~12% of the time — disguised, and it wins stacks. The 15-to-1 rule says the implied odds are there. Miss the flop, and it's an easy fold.`,
pfSetMineFold:(c,amt,x)=>`${c} is basically a set-mining hand versus this raise. You only flop a set ~12% of the time, so the call needs deep implied odds — roughly 15x the call behind. Here it costs ${amt} with only ~${x}x effective, so folding is cleaner than paying to miss most flops.`,
pfFoldRange:(ct,p,c,pr,e,o)=>`Against a raise, the ~top ${ct}% continues from ${p}; ${c} (${pr}) doesn't make it. Your equity vs a raiser's range is ~${e} needing ${o} — let it go.`,
valRiver:(e,n)=>`With ~${e} to win against ${n} opponent${n>1?'s':''}, you're likely best at showdown. Bet for value — a check wins you nothing extra, and worse hands may still pay you off.`,
valBet:(e,n)=>`With ~${e} to win against ${n} opponent${n>1?'s':''}, you're likely ahead. Bet for value — checking gives weaker hands and draws a free card to outdraw you.`,
protectBet:(h,e,n)=>`${h} is strong but vulnerable. Bet for value/protection: worse pairs, pair+draws, and straight/flush draws can pay, and checking gives them a free card. Raw equity is only ~${e} vs ${n} opponent${n>1?'s':''} because they share many outs, but betting is still better than giving a free card.`,
overcardCbet:(c,e,checked)=>`${c} has two live overcards and about ${e} equity heads-up. You were the preflop aggressor${checked?', and the blind has checked a capped range to you':''}, so make a small continuation bet: worse high cards and draws can call, while weak hands may fold. This is not empty air, but slow down if raised.`,
sidePotOvercardCbet:(c,e,s)=>`${c} has two live overcards, and ${s} is already in a side pot against the only opponent who can still act. They checked a capped range to the preflop aggressor, so make a small continuation bet for protection and fold equity. The displayed ~${e} includes the all-in player and understates this heads-up side-pot opportunity; slow down if raised.`,
stab:e=>`Everyone has checked to you, and checks usually mean weakness — their ranges look capped. With ~${e} plus all that fold equity, a stab takes this pot down often. If anyone calls or check-raises, slow down: that's real strength.`,
checkedDownStab:(e,n)=>`${n===1?'Villain has':'Opponents have'} checked the free preflop option and then kept checking down. That line is heavily capped, so with ~${e} and a hand that is not pure trash, make a small stab — you do not need a big bet to pressure nothing.`,
probeStab:(e,n,o)=>`${n===1?'Villain has':'Opponents have'} checked multiple streets, so the line is capped. Even ${o?'out of position, ':''}with ~${e} and no bet to call, a small bluff/probe bet can fold air and weak showdown hands — keep it small, then shut down if raised.`,
midRiver:e=>`A decent but unspectacular ~${e}. The board is complete — betting mostly gets called by better hands. Check and try to get to showdown cheaply.`,
midCheck:e=>`A decent but unspectacular ~${e}. Not strong enough to build a big pot; check and keep the pot small while you see what develops.`,
multiwayTopPairCheck:(e,k,n)=>`You have top pair, but the ${k} kicker is vulnerable in a ${n+1}-way pot, and the preflop raiser still acts behind you. Leading folds much of the air you beat while stronger Jx and overpairs can call or raise. Check, keep their bluffs in, and decide after seeing the raiser's action. Your ~${e} equity is a share of a multiway pot, not a reason to build one immediately.`,
drySidePotCheck:(h,e)=>`${h} is strong enough to contest the main pot, but one opponent is already all-in and the side pot is still empty. On this dry board there is little to protect: checking keeps weaker hands and bluffs in, while betting would mostly build a new side pot against the only opponent who can still act. Your ~${e} equity includes the all-in player — it is not a reason to force a side pot.`,
weakRiverLast:e=>`Only ~${e} to win and no cards left to come — your hand is final. Everyone has checked to you: check behind and take the free showdown.`,
weakRiverFirst:e=>`Only ~${e} to win and no cards left to come — your hand can't improve anymore. Check, and fold to any serious bet.`,
weakFree:e=>`Only ~${e} to win, but checking costs nothing. Take the free card and fold to any serious bet.`,
bigBet:r=>` This bet is ≈${r}% of the pot — bets that large are usually made hands (two pair or better), so the coach discounts your raw win chance here.`,
gutWarn:' Chasing a 4-out gutshot into big bets is a long-term money leak — even when you hit, you may not get paid enough to cover all the misses (poor implied odds).',
airWarn:' You have no made hand and no real draw — players who bet usually have at least a pair, and "pot-odds correct" calls with high cards are one of the biggest leaks in poker. The coach heavily discounts your raw win chance here.',
weakDrawWarn:' You have no made hand and only a weak gutshot — those four outs are included in the equity, but this is not a strong draw like an open-ender or flush draw. The coach discounts it heavily against aggression.',
underpairRealization:(n,pen,size,oop,backdoors,commit,spr)=>` Your pocket pair sits below ${n} distinct board rank${n>1?'s':''}. ${oop?'Out of position, ':''}facing a ${size}%-pot bet with more betting still possible, raw showdown equity overstates how often you can profitably reach the river.${commit>=25?` Calling also commits ${commit}% of your remaining stack and leaves an SPR of only ~${spr}, so the next barrel is highly leveraged.`:''} The coach removes about ${pen} equity points${backdoors?' after giving some credit to your backdoor possibilities':''}.`,
fragileFlushCheck:(tuple,higher,danger,continued,n)=>` This is a low ${tuple} flush on a four-flush board, not a nut flush: ${higher} higher suited card${higher!==1?'s':''} remain available. Across ${n} opponent${n>1?'s':''}, the modeled chance that someone already has a better flush is about ${danger}; against hands willing to continue versus a real bet, this hand is ahead only about ${continued}. Check for pot control — betting folds too much worse and concentrates action in better flushes.`,
rangeLikelyHands:(n,h)=>` ${n}'s most likely hand classes after the full action history: ${h}. Percentages are their normalized share of the current range, after known-card blockers — not a claim that one exact hand is certain.`,
raiseVal:e=>`~${e} to win is a strong favorite. Raise for value and to charge draws — flat calling leaves money on the table.`,
postflopRaiseSize:(amt,bb,x,bet,ratio)=>` Suggested postflop raise size: ${amt} (${bb}). The opponent's bet is about ${ratio}% pot, so use roughly ${x}x that bet: small bets can be raised much larger, while big bets and overbets usually only need about 2-3x.`,
callOk:(amt,pt,o,e,disc,ea,need)=>`The call costs ${amt} to win a ${pt} pot, so the immediate price needs ${o} equity. After position, prize pressure and realistic implied odds, the effective requirement is ~${need}; you have ~${e}${disc?` (counted as ~${ea} after hand-strength discounts)`:''}. Calling is profitable long-term, but raising would risk too much with a non-premium hand.`,
foldAdv:(o,amt,pt,ea,resp,need)=>`The immediate price needs ${o} equity to call (${amt} into ${pt}). After position, prize pressure and realistic implied odds, the effective requirement is ~${need}, but your usable equity is only ~${ea}${resp?' once this bet size is respected':''}. Fold and wait for a better spot.`,
impliedOddsNote:(now,real,best,future,max,hit,reverse)=>` Implied odds: the immediate price needs ${now}. With about ${hit} to hit a clean out and up to ${max} still available behind, the coach conservatively credits about ${future} of future payment; that lowers the realistic break-even price to ~${real}. The absolute best case is ${best} if every remaining chip is paid${reverse?' — but the non-nut draw also carries reverse-implied-odds risk, so that best case is not used':''}.`,
chart3bet:(c,e)=>`${c} is in the re-raise (3-bet) chart against ${e?'an early-position raiser':'a late-position raiser'} — solver ranges re-raise these hands instead of just calling: the big pairs for value, and hands like A5s as "blocker bluffs" (your ace makes his monster hands less likely). Flat-calling would let players behind you in cheaply.`,
shortAllInValue:(c,b,n)=>`${c} is strong enough to isolate this ${b} BB all-in for value. The all-in player cannot fold, so this is not a chart bluff: the raise charges the ${n} live player${n!==1?'s':''} behind for entering the main pot.`,
shortAllInCall:(c,b,r,u,n,x)=>`${c} has enough equity to call this ${b} BB all-in at the offered price. Raw equity is ${r} and remains about ${u} because the main pot is guaranteed to reach showdown${n?`; the adjusted ${x} requirement still includes the risk from ${n} live player${n!==1?'s':''} behind`:''}. Call — do not turn a hand with adequate price into a 3-bet bluff against someone who cannot fold.`,
shortAllInFold:(c,b,r,u,n,x)=>`${c} cannot profitably call this ${b} BB all-in. The all-in player cannot fold or offer future implied odds: raw equity is ${r}, about ${u} after the remaining risk, below the adjusted ${x} requirement${n?` with ${n} live player${n!==1?'s':''} still involved`:''}. Fold; the ordinary 3-bet bluff chart does not apply to an all-in.`,
squeezePlay:(c,n)=>`${c} is a squeeze: one player raised and ${n} caller${n>1?'s have':' has'} put dead money in with a usually capped hand. Re-raise large enough to pressure both; you can win now, and this hand still has value when called.`,
dominatedTopPair:(k,n)=>` Top pair is useful, but the ${k} kicker is vulnerable: ${n} higher kicker${n>1?'s are':' is'} still possible. Avoid turning one pair into a huge pot against strong action.`,
madeCounterfeit:(r,n)=>` Your two pair is vulnerable to counterfeiting: ${n} remaining ${r}${n>1?'s':''} pair the high board card and can make your smaller pair stop playing. Bet for value/protection, but reassess if that card arrives.`,
textureSize:(kind,p)=>` Board-aware sizing: this is a ${kind} board, so the suggested bet uses about ${p}% pot — smaller on safe boards, larger when draws need charging.`,
floatPlan:` This flop call is a float with a plan, not a hopeful call: you have position and enough equity to continue, then can attack many turn checks. If the opponent barrels again or the turn strongly favors their range, shut down.`,
turnPlan:k=>` Turn plan: ${k==='value'?'strong value — keep building the pot':k==='draw'?'strong draw — semi-bluff only when fold equity is credible':k==='control'?'medium strength — control the pot and avoid a huge river decision':'weak hand — stop investing without a clear bluff opportunity'}.`,
riverBlockerBluff:` River blocker bluff: your ace removes the nut-flush hands from the opponent's range, while their passive line contains many folds. Use a small, disciplined bluff; this is not permission to bluff a player who calls too often.`,
fourBetFold:(c,amt,bb,eff,read)=>`This is not a 3-bet spot: you already raised and now face a 3-bet to ${amt} (${bb}). ${c} is not strong enough to continue${read?' against this large/tight line':''}. The ace blocker can make it an occasional 4-bet bluff against a normal, wide 3-bet when stacks are deep, but at ${eff} BB effective this sizing commits too much — fold.`,
fourBetValue:(c,amt,bb)=>`You already raised and now face a 3-bet to ${amt} (${bb}). ${c} belongs to the value 4-bet range; with this much already in the middle, use a committed raise rather than an awkward size that leaves a tiny stack behind.`,
fourBetBluff:(c,amt,bb)=>`You already raised and now face a 3-bet to ${amt} (${bb}). ${c} can be used as a selective 4-bet bluff here: your ace blocks AA/AK, the 3-bettor's range is wide, the size is still normal, and stacks are deep enough to fold if shoved on.`,
fourBetCall:(c,e,o)=>`You already raised and now face a 3-bet. ${c} is strong enough to continue but does not want to build a 4-bet pot; call with ${e} equity versus a ${o} price.`,
chartCallRaise:(c,e,o)=>`${c} is in the calling chart against this raise — strong enough to see a flop, not strong enough to re-raise. Your win chance (${e}) covers the price (${o}). Call, and play carefully if you miss the flop.`,
pfContextCall:(c,raw,usable,need,open,eff,pos,behind,sq)=>`${c} is a contextual call, not an automatic defend. Against a ${open} BB open at ${eff} BB effective, you will be ${pos>0?'in position':pos<0?'out of position':'without guaranteed last action'} after the flop${behind?`, with ${behind} player${behind>1?'s':''} still able to squeeze`:''}. Raw equity of ${raw} becomes about ${usable} after position, stack depth, implied/reverse-implied odds and the modeled ${sq}% squeeze risk; that still clears the adjusted ${need} requirement.`,
pfContextFold:(c,raw,usable,need,open,eff,pos,behind,sq)=>`${c} may look playable on a static chart, but this exact call is not profitable. Against a ${open} BB open at ${eff} BB effective, you will be ${pos>0?'in position':pos<0?'out of position':'without guaranteed last action'} after the flop${behind?`, and ${behind} player${behind>1?'s':''} can still squeeze`:''}. Raw equity of ${raw} falls to about ${usable} once realization, implied/reverse-implied odds and ${sq}% squeeze risk are counted, below the adjusted ${need} requirement — fold.`,
pfMultiwayValue:(c,n)=>`${n} caller${n>1?'s':''} improve the immediate price for ${c}. This hand retains its equity relatively well multiway and can make a strong disguised hand, so the coach gives it a small, capped implied-odds credit when stacks are deep enough. The benefit is not unlimited: every extra opponent still lowers raw equity and adds non-nut and reverse-implied-odds risk.`,
chartIcmFold:(c,e,o)=>`${c} is normally a call here, but right now your simulated win chance (${e}) doesn't cover the price (${o}) once prize pressure and this raiser's range are counted. The chart is a guide — the math of THIS table says fold.`,
chartFoldVs:(c,r,b,d)=>`${c} is outside both the re-raise and calling ranges versus this ${r||'position'} open.${d?' A weak suited ace is often dominated by the opener’s stronger aces, creating costly reverse implied odds.':''}${b?` ${b} player${b>1?'s':''} behind can still squeeze or enter the pot.`:''} The equity estimate is close, but equity alone does not override the position-specific range — fold.`,
broadwayFlat:(c,o,s,b)=>`${c} is a connected or one-gap high-card hand facing a small ${o} BB raise. Under the wider multiway-building strategy, call this price with ${s} BB behind${b?` even though ${b} player${b>1?'s':''} can still enter`:''}. This is an intentional loose/exploit adjustment, not the standard solver chart; fold the same hand to a larger raise or with a shorter stack.`,
chartOpen:(c,p)=>`${c} is in the ${p} opening chart — a hand list taken from solver-computed ranges: raising it first-in from this seat is profitable in the long run. Come in raising, not limping.`,
chartIso:(c,p,n)=>`${c} is in the ${p} iso chart — solver-style ranges for raising over ${n} limper${n>1?'s':''}. Isolate with a raise; calling behind limpers bleeds chips.`,
chartNotInIso:(c,p)=>`${c} is not in the ${p} iso chart — even over limpers, this hand loses money as a raise long-term. Fold, or make a very tight exception only with a huge stack edge.`,
limpPotNote:n=>` ${n} limper${n>1?'s':''} — dead money widens iso-raise ranges slightly, but speculative suited connectors need position/depth before you build a big pot.`,
pfRaiseSize:(amt,bb,pos,callers,anteAdj,depthAdj,effBB)=>` Suggested preflop size: ${amt} (${bb}). ${pos==='IP'?'In position, start at 3 BB':'Out of position, start at 4 BB'} and add 1 BB per limper (${callers} here)${anteAdj?'; antes add dead money':''}${depthAdj>0?'; deep effective stacks support a small increase':effBB?`; the ~${effBB} BB effective stack needs no deep-stack increase`:''}.`,
pfOpenSize:(amt,bb,pos,antes)=>` Suggested open size: ${amt} (${bb}). ${pos==='IP'?(antes?'Antes add enough dead money to move the in-position baseline from 3 BB to 4 BB.':'With no antes, the in-position first-in baseline is 3 BB.'):'The out-of-position first-in baseline remains 4 BB.'}`,
threeBetSize:(amt,bb,open,callers,pos)=>` Suggested 3-bet size: ${amt} (${bb}) — ${pos==='IP'?'3× in position':'4× out of position'} over the ${open} opening raise${callers?`, plus 1× for each of the ${callers} flat caller${callers>1?'s':''}`:''}.`,
fourBetSize:(amt,bb,x)=>` Suggested 4-bet size: ${amt} (${bb}), about ${x}x the 3-bet. This is deliberately much smaller than a 3x 3-bet sizing; if that size would commit roughly 40% of the effective stack, the clean choice with a value hand is all-in instead.`,
chartNotIn:(c,p)=>`${c} is not in the ${p} opening chart — solver-computed ranges say this hand loses money when raised from this seat over the long run. Folding now saves chips for a better spot.`,
chartShove:(c,bb,p)=>`At ${bb} BB, ${c} is in the ${p} all-in chart (solver-computed shove ranges for short stacks). Going all-in maximizes your chance of winning the blinds and antes uncontested.`,
chartNotInShove:(c,p)=>`${c} is not in the ${p} all-in chart for this stack depth — shoving it loses money long-term. Fold and wait: even one round of patience usually offers a better hand.`,
benchProg:(i,n)=>`Running… tournament ${i} of ${n}`,
benchResult:(g,np,w,rw,im,ri,av,rav)=>`Over ${g} simulated ${np}-player tournaments, a bot following the coach's advice on EVERY decision: 🏆 won ${w}% of tournaments (a random player would win ${rw}%) · 💰 finished in the money ${im}% (random: ${ri}%) · average finish ${av} of ${np} (random: ${rav}). The coach can't beat luck in one game — but this is its long-term edge.`,
mentalMath:(c,s,o)=>` 🧮 Live mental math: price = call ÷ (pot + call) = ${c} ÷ ${s} ≈ ${o}. Your win%: count outs (cards that improve you to the best hand) × 4 on the flop, × 2 on the turn; with a made hand, estimate how often you beat what they'd bet like this. Then knock off ~5–15% versus big bets or with no pair — the same discounts the coach applied here.`,
mWarn:(n,m,z)=>` Blinds go up in ${n} hand${n>1?'s':''} — your M drops to ~${m} (${z}). Look for spots now rather than being forced to gamble later.`,
mExplain:m=>` What "M = ${m}" means: your stack divided by the cost of one full round of blinds and antes — i.e. you could survive ${m} more rounds folding everything. Above 20 🟢 play your normal game; 10–20 🟡 start fighting for pots; 5–10 🟠 favor shoving over small raises; under 5 🔴 it's all-in or fold.`,
cashModeNote:` Fixed blinds in cash — chip EV equals real money EV here (no ICM or prize pressure).`,
diffEasy:` AI difficulty: Easy opponents are noisier and call too wide, but their big aggression is usually less balanced. The coach trusts exact range reads less, value-bets thinner, and bluffs less.`,
diffHard:` AI difficulty: Hard opponents are more position-aware and balanced. Their aggression can include more bluffs, so the coach gives c-bets and late-position pressure less automatic credit.`,
cashDeepNote:bb=>` At ${bb} BB deep in cash, implied odds matter: pocket pairs and suited connectors play bigger than their rank suggests, and you can widen steals in position — but blinds never rise, so play for value and avoid bloating pots out of position without equity.`,
cashDeepIp:bb=>` In position at ${bb} BB, you can open wider and stab after checks — deep stacks let callers continue with medium hands, so pressure capped ranges; still fold trash to big raises.`,
sprDeep:s=>` SPR ~${s} (deep) — implied odds are live: sets and draws can win big pots; one pair alone is rarely worth stacking off unless the board is dry.`,
sprMid:s=>` SPR ~${s} (medium) — top pair+ can stack off vs aggression; draws need correct odds; don't inflate pots OOP with marginal made hands.`,
sprLow:s=>` SPR ~${s} (low) — you're committed territory: one pair or better often has to get the money in; don't float wide hoping to improve.`,
chartBb3bet:(c,v)=>`${c} is in the BB defense chart (${v}) — 3-bet for value or as a blocker bluff vs this steal.`,
chartBbCall:(c,v,e,o)=>`${c} is in the BB calling range vs ${v} — defend wide enough that steals can't print money. Your equity (${e}) covers the price (${o}).`,
chartBbFold:(c,v)=>`${c} is outside the BB defense chart vs ${v} — folding saves chips; calling trash from the BB is a classic cash-game leak.`,
widenNote:(b,e,d)=>` Rising blinds and dead money change the math: your normal ~${b}% opening range here is adjusted to ~${e}%${d===1?' — and the players left to act fold too much, so attack them':d===-1?' — tempered, because the players left to act defend wide, so steal less into them':''}.`,
tableSizeNote:(n,b,e)=>` Only ${n} players remain, so preflop ranges are not full-ring ranges anymore: this seat's baseline range moves from about ${b}% to about ${e}% before the other live adjustments.`,
stackDomNote:(r,c,n)=>` You have ~${r}× the largest stack and cover ${c} of ${n} opponents still in — shorter stacks fold more often, so the coach widens steal/iso ranges slightly. Calling marginal hands is still a leak; raise or fold.`,
stackDomIso:(c,p,r)=>`${c} is outside the standard ${p} chart, but with ~${r}× the table's biggest stack you can iso-raise as a pressure play — shorter stacks can't gamble back easily. Raise, don't call.`,
stackDomCall:(c,r,e,o)=>`${c} is a chart defend and you are the clear chip leader (~${r}× the next stack). The raw sim is close (${e} vs ${o} price), and the call is small relative to your stack, so continue instead of over-folding to short-stack pressure.`,
stackDomFoldHint:` Your stack edge makes an iso-raise possible here, but this hand is still too weak even for that line. Fold — patience preserves your advantage.`,
icmNote:(x,left,paid)=>` 💰 Tournament value: ${paid} place${paid>1?'s':''} get paid and ${left} player${left>1?'s are':' is'} left. Chips you might lose are worth more than chips you might win, so this call needs an extra ~${x}% win chance on top of the normal pot math.`,
lineCbet:` His flop bet is a routine "continuation bet" — players who raised before the flop bet again on almost any flop, good or bad. It tells us very little, so his range is barely narrowed for it.`,
lineBarrel:n=>` He has now bet ${n===3?'THREE streets in a row (flop, turn and river)':'two streets in a row'} — most players don't keep firing like that without a real hand. His range is read much tighter.`,
lineDonk:` He bet INTO the player who raised before the flop (a "donk bet") — an unusual move that's usually either a sneaky monster or a wild bluff. To be safe, it's read as strength.`,
lineCR:` He checked first, then raised (a "check-raise") — the classic trap move. That's read as a very strong range.`,
lineCC:(n,len)=>`${n} has checked ${len} consecutive streets without betting — their range is heavily capped (mostly medium pairs, weak showdown hands, and give-ups). A bet often wins the pot here.`,
lineCCRock:(n,len)=>`${n} (🪨 Tight) passed on ${len} streets in a row — rocks rarely slowplay twice; you're usually facing one pair or less.`,
lineCCManiac:(n,len)=>`${n} (🔥 Wild) checked ${len} streets — strong tell: maniacs bet when they're strong, so passive lines are usually air or a weak float.`,
lineCCShark:(n,len)=>`${n} (🦈 Aggressive) checked ${len} streets — sharks can trap, so respect a check-raise, but many lines are still capped medium hands.`,
lineCCStation:(n,len)=>`${n} (📞 Loose) checked ${len} streets — often a medium pair they'll call down with, but rarely two pair or better.`,
lineTablePassive:n=>`${n} opponents have multi-street passive lines — the table looks weak and checked-through. Thin value bets and bluffs often work.`,
lessonFold:(rec,eq,need)=>`Coach said ${rec}: ~${eq} after discounts vs ${need} needed — folding is the +EV line.`,
lessonFoldAir:(eq,need)=>`Coach folded: high cards / no real hand (~${eq} vs ${need} needed) — calling is a classic leak.`,
lessonCall:(rec,you,eq,need)=>`Coach said ${rec} (~${eq} vs ${need} needed) — you chose ${you} instead.`,
lessonRaise:(rec,you)=>`Coach said ${rec} — you chose ${you}; raising risks more with a non-premium hand.`,
bucketMWCheck:n=>` Multiway (${n} opponents): checked to you — ranges are capped; stab thin value or bluff, but respect check-raises (someone often has something).`,
bucketMWCbet:n=>` Multiway (${n} opponents) facing a c-bet — defend tighter than heads-up; one caller often has a piece. Fold marginal pairs and draws without odds.`,
bucketMWWet:n=>` Multiway (${n} opponents) on a wet board — straights and flushes are live for someone; don't stack off with one pair.`,
bucketMWDry:n=>` Multiway (${n} opponents) on a dry board — bluffs work more often, but multiple players still means someone often has a pair.`,
bucketMWFace:n=>` Multiway (${n} opponents) facing a bet — continue only with strong made hands or draws with clear odds.`,
bucketMWIP:n=>` Multiway (${n} opponents) and you act last (IP) — more bluffs and thin value bets work; still respect raises.`,
bucketMWOOP:n=>` Multiway (${n} opponents) and you act first (OOP) — check more marginal hands; betting gets called by someone too often.`,
bucketMWPaired:n=>` Multiway (${n} opponents) on a paired board — trips/full houses are live; one pair is often not enough.`,
bucketMWFlushDraw:n=>` Multiway (${n} opponents) with a flush draw possible — a caller may be drawing to a flush.`,
bucketMWBigPot:p=>` Large multiway pot (~${p} BB) — mistakes are costly; continue only with clear equity or strong draws.`,
bucketMWSqueeze:n=>` Multiway (${n} opponents) facing a squeeze/raise — ranges are strong; fold marginal continues unless odds are excellent.`,
pairedBoardBetCall:(callers,opps,pair,kicker,over)=>`One opponent bet and ${callers===1?'another opponent':`${callers} opponents`} called in this ${opps+1}-way pot. Your displayed two pair is only ${pair} plus the paired board, with a ${kicker} kicker${over?` and ${over===1?'a':over} higher board rank${over>1?'s':''}`:''}; the apparent redraws can still make a losing full house. This marginal bluff-catcher must be folded.`,
briefSpot:(eq,need,call,pot,pos,ip,opps)=>` 📋 Spot: ~${eq} equity${need!=='—'?` vs ${need} needed`:''}${call!=='—'?` · price ${call} → ${pot}`:''} · ${pos} (${ip}) · ${opps} opp${opps>1?'s':''}.`,
briefAir:` No real made hand — equity heavily discounted vs bets.`,
briefVillain:(name,style,line)=>` vs ${name} (${style}) on a ${line} line.`,
dirtyOutPairs:c=>` Dirty outs (${c}): pairing the board — helps everyone, not just you.`,
dirtyOutFlush:c=>` Dirty outs (${c}): fourth card to a board flush — often gives an opponent the winning flush.`,
profRock:` The bettor is the 🪨 Tight type — players like this almost never bluff big. Give this bet extra respect: without a strong hand yourself, folding is usually right.`,
profManiac:` The bettor is the 🔥 Wild type — his range contains more bluffs, so medium-strength hands gain value. That wider range is already included in the equity estimate; call lighter only when the price and equity realization still support it.`,
profStation:` The bettor is the 📞 Loose-passive type — he calls everything but almost never bets big without a real hand. His sudden aggression deserves respect.`,
blockerAce:` You hold an Ace — a "blocker": since one of the four aces is in YOUR hand, it's less likely he holds the big ace-hands (like a pair of aces or top pair with an ace). That makes calling slightly better.`,
blockerFlush:` You hold the ace of the flush suit — even without a flush yourself, that card means HE cannot have the best possible flush. A bluff-raise from you is also extra believable, because you could have the nut flush.`,
suitedConn:` Hands like this (suited and connected) play better than their raw ranking suggests — they make hidden straights and flushes that win big pots when stacks are deep. The coach loosens up slightly for them.`,
scFlatMulti:(c,n)=>`${c} is a speculative suited connector, not a hand that wants to build a big pot into ${n} limper${n>1?'s':''}/callers. Take the cheap price and try to flop a strong draw or hidden made hand; if you miss, be ready to let it go.`,
scFoldEarly:c=>`${c} is a speculative suited connector, but too many players can still wake up behind you. Without late position or dead money to attack, do not force a big raise — fold and wait for a cleaner spot.`,
drawMwCheck:n=>`This is mostly a draw in a multiway pot (${n} opponents). Semi-bluffing works best heads-up or against capped ranges; with several players still in, take the free card instead of building a pot you may not win.`,
mixTitle:'🎭 Mix it up (optional)',
mixCall:'The math says call — but once in a while, raising here instead keeps sharp opponents guessing. If you always play the same hand the same way, they will read you like a book. Slightly worse for this exact hand, but it pays off across the session.',
mixCheck:'Checking is the solid play — but every now and then, throw in a small bet here. Opponents who learn that your check always means weakness will run you over. A rare surprise bet keeps them honest.',
mixTrap:'Raising is the money play — but with a hand this strong you can occasionally just call and trap. If you always raise your monsters, observant players fold and you win less. Mixing in a slow-play hides your strength.',
coachErr:'Coach unavailable this turn.'},
fr:{
rangesNote:(n,c)=>` L'équité est simulée contre des ranges réalistes : ${n} adversaire${n>1?'s ont':' a'} montré de la force et ${n>1?'sont modélisés':'est modélisé'} sur environ le top ${c}% des mains, pas des cartes aléatoires.`,
checksNote:n=>` ${n===1?'Un adversaire a':n+' adversaires ont'} fait parole — un check exclut généralement une main très forte, donc le haut de ${n===1?'sa range':'leurs ranges'} est retiré de la simulation (attention aux pièges quand même).`,
madeBoardPair:' — attention : cette paire est entièrement sur le board, tous vos adversaires l’ont aussi.',
madeOverpair:' — une overpair, très forte.',madeUnderPair:' — une paire servie sous la plus haute carte du board.',madeTopPair:' — top paire, solide.',
madeTwoPair:(a,b)=>` — vraie double paire (${a} et ${b}), assez forte pour miser quand on checke jusqu’à vous.`,
madeNotTop:r=>` — pas la top paire ; quiconque détient un ${r} est devant vous.`,
drawFlush:(n,o)=>`tirage couleur (${n} outs, ≈${o})`,drawOESD:(n,o)=>`tirage quinte par les deux bouts (${n} outs, ≈${o})`,drawGut:(n,o)=>`tirage quinte ventral (${n} outs, ≈${o})`,
drawDoubleGut:(n,o)=>`double gutshot (${n} outs, ≈${o})`,
drawBackdoorStraight:o=>`quinte backdoor seulement (deux hauteurs précises au turn et à la river, ≈${o} pour la compléter)`,
drawBackdoorFlush:o=>`couleur backdoor seulement (même couleur au turn ET à la river, ≈${o} pour la compléter)`,
backdoorFlushWarn:" Vous avez seulement une possibilité de couleur backdoor : les deux prochaines cartes doivent être de la bonne couleur. Ce n'est pas un vrai tirage couleur à une carte et cela ne justifie pas ce call.",
backdoorStraightWarn:" Vous avez seulement une possibilité de quinte backdoor : deux hauteurs précises doivent tomber au turn et à la river. Ce n'est pas un vrai tirage quinte à une carte et cela ne justifie pas ce call.",
drawBaked:' Votre tirage est déjà intégré dans la chance de gain — le toucher vous donnerait probablement la meilleure main.',
warnFlush:' Trois cartes d’une même couleur sur le board — méfiez-vous d’une couleur adverse.',
warnPaired:' Le board est apparié : full et brelans sont possibles.',
multiway:n=>` Avec ${n} adversaires encore en jeu, les mains marginales perdent de la valeur — quelqu’un a souvent touché.`,
posEarly:p=>` Vous êtes en début de parole (${p}) — presque toute la table parle après vous : jouez plus serré que d’habitude.`,
posLate:p=>` Vous êtes en fin de parole (${p}) — parler après les autres est un avantage : vous pouvez élargir un peu.`,
futFirst:' Après le flop vous parlerez en PREMIER — jouer chaque rue hors de position est un vrai handicap : entrez avec une range plus forte et préférez la relance au call.',
futLast:' Après le flop vous parlerez en DERNIER — vous verrez les décisions de tous avant la vôtre, ce qui rend plus de mains jouables.',
futMid:(o,n)=>` Après le flop vous parlerez ${o} sur ${n} — position moyenne : ne vous engagez pas trop avec des mains marginales.`,
stFirst:' Vous parlez en premier sur cette rue (hors de position) — les adversaires réagissent après vous : privilégiez le check avec les mains marginales.',
stLast:' Vous parlez en dernier sur cette rue (en position) — tout le monde s’est exprimé : leurs checks sont une information à exploiter.',
pfShove:(bb,c,pr,t,p)=>`À ${bb} BB vous êtes en zone push/fold. ${c} (${pr}) est dans la range de shove Nash d’environ ${t}% depuis ${p} — partez à tapis plutôt que de min-relancer : cela maximise la fold equity et évite de fondre sur les blinds.`,
pfShortCheck:(c,p)=>`${c} est sous la range de shove pour ${p}, mais le check est gratuit.`,
pfShortCall:(c,e,o)=>`${c} est sous une range de shove standard, mais votre équité simulée (${e}) bat largement le prix (${o}).`,
pfShortFold:(bb,c,pr,t,p)=>`À ${bb} BB, ${c} (${pr}) est hors de la range Nash (~${t}%) pour ${p}. Couchez-vous et attendez — même court, la patience bat le spew.`,
huPush:(bb,c,pr,t,p)=>`Heads-up à ${bb} BB effectives : folder ou limper abandonne trop de valeur aux blindes. ${c} (${pr}) est près du bas de la range de tapis (~${t}%) depuis ${p}, mais le all-in reste rentable : vous gagnez immédiatement quand la grosse blinde passe et conservez de l'équité quand elle paie. Le pourcentage de victoire affiché est votre équité à l'abattage si vous êtes payé — ce n'est pas la seule raison de faire tapis.`,
huOpen:(bb,c,p)=>`Heads-up à ${bb} BB effectives : c'est assez deep pour jouer postflop. ${c} est jouable depuis ${p}, mais ce n'est pas un shove pur — ouvrez petit et gardez les mains faibles dedans.`,
huCall:(bb,c,e,o)=>`Heads-up à ${bb} BB effectives, les ranges de call s'élargissent car il n'y a plus de pression de palier. ${c} a environ ${e} d'équité pour un prix de ${o}, donc continuez.`,
huFold:(bb,c,pr,t,p)=>`Heads-up à ${bb} BB effectives, ${c} (${pr}) est sous la range shove/continue (~${t}%) pour ${p}. Couchez plutôt que de jouer le match avec une main poubelle.`,
pfOpen:(c,pr,t,p,pair)=>`Personne n’a relancé, et ${c} (${pr}) est dans la range d’ouverture (~${t}%) pour ${p}${pair?' une fois sa valeur de set-mining comptée — les paires servies valent plus que leur classement brut quand les tapis sont profonds : flopper un brelan (~12%) est caché et gagne de gros pots':''}. Entrez en relançant, pas en limpant — vous prenez l’initiative et pouvez gagner les blinds directement.`,
pfBBfree:c=>`${c} n’est pas assez fort pour relancer depuis la grosse blind, mais vous voyez le flop gratuitement.`,
pfOpenFold:(c,pr,t,p)=>`${c} (${pr}) est sous la range d’ouverture (~${t}%) pour ${p}. Se coucher ici est le jeu correct — limper des mains faibles fait fuir des jetons à long terme.`,
pfOpenFoldPair:(c,p)=>`${c} est une petite paire servie, mais depuis ${p} sans relance avant vous, ce n’est pas un bon limp. Les petites paires cherchent surtout à flopper un brelan (~12%) ; si la charte/profondeur ne justifie pas une ouverture en relance, couchez et évitez de jouer une mini-paire hors de position.`,
pf3bet:c=>`${c} est une main premium (top 5%). Face à une relance, le jeu standard est de sur-relancer (3-bet) pour la valeur — caller laisse entrer des mains plus faibles à bas prix derrière vous.`,
pfCallRange:(p,ct,c,pr,e,o)=>`Face à une relance, ${p} continue avec environ le top ${ct}% — ${c} (${pr}) est dedans, et votre équité contre sa range (${e}) couvre le prix (${o}).`,
pfSetMine:(c,amt,x)=>`${c} ne se qualifie pas sur sa force brute, mais c’est un set-mine d’école : le call ne coûte que ${amt} avec ~${x}x derrière. Vous floppez un brelan ~12% du temps — caché, et il gagne des tapis. La règle du 15 contre 1 valide les cotes implicites. Flop raté : on se couche sans regret.`,
pfSetMineFold:(c,amt,x)=>`${c} est surtout une main de set-mining face à cette relance. Vous ne floppez un brelan qu’environ 12% du temps, donc le call exige de fortes cotes implicites — environ 15x le call derrière. Ici cela coûte ${amt} avec seulement ~${x}x effectifs, donc folder est plus propre que payer pour rater la plupart des flops.`,
pfFoldRange:(ct,p,c,pr,e,o)=>`Face à une relance, seul le top ~${ct}% continue depuis ${p} ; ${c} (${pr}) n’en fait pas partie. Votre équité contre la range d’un relanceur est ~${e} pour ${o} requis — laissez tomber.`,
valRiver:(e,n)=>`Avec ~${e} de chances de gain contre ${n} adversaire${n>1?'s':''}, vous êtes probablement devant à l’abattage. Misez pour la valeur — un check ne rapporte rien de plus, et des mains moins bonnes peuvent encore payer.`,
valBet:(e,n)=>`Avec ~${e} de chances de gain contre ${n} adversaire${n>1?'s':''}, vous êtes probablement devant. Misez pour la valeur — checker offre une carte gratuite aux mains plus faibles et aux tirages.`,
protectBet:(h,e,n)=>`${h} est forte mais vulnérable. Misez pour value/protection : des paires moins bonnes, paire+tirage et tirages quinte/couleur peuvent payer, et checker leur donne une carte gratuite. L’équité brute n’est que ~${e} contre ${n} adversaire${n>1?'s':''} car ils partagent beaucoup d’outs, mais miser reste mieux que donner une carte gratuite.`,
overcardCbet:(c,e,checked)=>`${c} a deux overcards vivantes et environ ${e} d'équité en heads-up. Vous étiez l'agresseur préflop${checked?', et la grosse blinde a checké une range plafonnée jusqu’à vous':''} : faites un petit continuation bet. Des hauteurs et tirages inférieurs peuvent payer, tandis que les mains faibles peuvent folder. Ce n'est pas de l'air pur, mais ralentissez face à une relance.`,
sidePotOvercardCbet:(c,e,s)=>`${c} a deux overcards vivantes, et ${s} se trouve déjà dans un side pot contre le seul adversaire pouvant encore agir. Sa range plafonnée a checké vers l'agresseur préflop : faites un petit continuation bet pour protection et fold equity. Les ~${e} affichés incluent le joueur à tapis et sous-estiment ce duel pour le side pot ; ralentissez face à une relance.`,
stab:e=>`Tout le monde a checké jusqu’à vous, et les checks trahissent souvent la faiblesse — leurs ranges semblent plafonnées. Avec ~${e} plus toute cette fold equity, une mise ramasse souvent ce pot. Si quelqu’un paie ou check-relance, ralentissez : c’est de la vraie force.`,
checkedDownStab:(e,n)=>`${n===1?'Vilain a':'Les adversaires ont'} checké l'option gratuite préflop puis continué à checker. Cette ligne est très capée : avec ~${e} et une main pas totalement poubelle, faites une petite mise — inutile de miser gros pour faire pression sur rien.`,
probeStab:(e,n,o)=>`${n===1?'Vilain a':'Les adversaires ont'} checké plusieurs streets, donc la ligne est capée. Même ${o?'hors de position, ':''}avec ~${e} et aucune mise à payer, une petite mise bluff/probe peut faire folder l'air et les mains faibles de showdown — gardez-la petite, puis abandonnez si ça relance.`,
midRiver:e=>`Un score correct mais quelconque : ~${e}. Le board est complet — miser ne se fait payer que par mieux. Checkez et essayez d’atteindre l’abattage à bas prix.`,
midCheck:e=>`Un score correct mais quelconque : ~${e}. Pas assez fort pour gonfler le pot ; checkez et gardez le pot petit en attendant la suite.`,
multiwayTopPairCheck:(e,k,n)=>`Vous avez top paire, mais le kicker ${k} est vulnérable dans un pot à ${n+1} joueurs, et le relanceur préflop doit encore parler derrière vous. Miser fait coucher une grande partie de l'air que vous battez, tandis que les meilleurs Jx et les overpairs peuvent payer ou relancer. Checkez, gardez ses bluffs et décidez après son action. Vos ~${e} d'équité représentent une part d'un pot multiway, pas une raison de le gonfler immédiatement.`,
drySidePotCheck:(h,e)=>`${h} est assez forte pour disputer le pot principal, mais un adversaire est déjà à tapis et le side pot est encore vide. Sur ce board sec, il y a peu à protéger : checker garde les mains plus faibles et les bluffs, tandis qu'une mise construirait surtout un nouveau side pot contre le seul adversaire encore actif. Votre équité d'environ ${e} inclut le joueur à tapis — elle ne justifie pas à elle seule de créer un side pot.`,
weakRiverLast:e=>`Seulement ~${e} de chances de gain et plus aucune carte à venir — votre main est figée. Tout le monde a checké : checkez derrière et prenez l’abattage gratuit.`,
weakRiverFirst:e=>`Seulement ~${e} de chances de gain et plus aucune carte à venir — votre main ne peut plus s’améliorer. Checkez, et couchez-vous face à toute mise sérieuse.`,
weakFree:e=>`Seulement ~${e} de chances de gain, mais checker ne coûte rien. Prenez la carte gratuite et couchez-vous face à toute mise sérieuse.`,
bigBet:r=>` Cette mise fait ≈${r}% du pot — des mises aussi grosses sont généralement des mains faites (deux paires ou mieux), donc le coach décote votre chance de gain brute.`,
gutWarn:' Payer de grosses mises pour chasser un ventral à 4 outs est une fuite d’argent à long terme — même touché, vous ne serez pas assez payé pour couvrir tous les échecs (cotes implicites médiocres).',
airWarn:' Vous n’avez ni main faite ni vrai tirage — celui qui mise a généralement au moins une paire, et les calls « corrects en cotes » avec hauteur sont l’une des plus grosses fuites du poker. Le coach décote fortement votre chance de gain ici.',
weakDrawWarn:' Vous n’avez pas de main faite et seulement une gutshot faible — ces quatre outs sont inclus dans l’équité, mais ce n’est pas un gros tirage comme une quinte par les deux bouts ou une couleur. Le coach la décote fortement face à l’agression.',
underpairRealization:(n,pen,size,oop,backdoors,commit,spr)=>` Votre paire servie est sous ${n} hauteur${n>1?'s':''} distincte${n>1?'s':''} du board. ${oop?'Hors de position, ':''}face à une mise de ${size}% du pot avec encore des décisions à venir, l’équité brute jusqu’au showdown surestime la fréquence à laquelle vous atteindrez la river de façon rentable.${commit>=25?` Le call engage aussi ${commit}% de votre tapis restant et laisse un SPR d’environ ${spr} seulement : le prochain barrel exercera une pression énorme.`:''} Le coach retire environ ${pen} points d’équité${backdoors?' après avoir accordé un peu de valeur à vos backdoors':''}.`,
fragileFlushCheck:(tuple,higher,danger,continued,n)=>` C’est une petite couleur ${tuple} sur un board à quatre cartes de la même couleur, pas la couleur max : ${higher} carte${higher!==1?'s':''} assortie${higher!==1?'s restent':' reste'} disponible${higher!==1?'s':''} au-dessus. Contre ${n} adversaire${n>1?'s':''}, la probabilité modélisée que quelqu’un ait déjà une meilleure couleur est d’environ ${danger} ; face aux mains prêtes à continuer contre une vraie mise, cette main n’est devant qu’environ ${continued}. Checkez pour contrôler le pot : miser fait trop souvent coucher moins bien et concentre l’action sur les meilleures couleurs.`,
rangeLikelyHands:(n,h)=>` Les classes de mains les plus probables de ${n} après toute l'action : ${h}. Les pourcentages représentent leur part normalisée de la range actuelle après les blockers connus — pas la certitude d'une main exacte.`,
raiseVal:e=>`~${e} de chances de gain : vous êtes grand favori. Relancez pour la valeur et pour faire payer les tirages — caller laisse de l’argent sur la table.`,
postflopRaiseSize:(amt,bb,x,bet,ratio)=>` Taille de relance postflop suggérée : ${amt} (${bb}). La mise adverse fait environ ${ratio}% du pot, donc utilisez environ ${x}x cette mise : les petites mises peuvent être relancées beaucoup plus cher, tandis que les grosses mises et overbets demandent souvent seulement 2-3x.`,
callOk:(amt,pt,o,e,disc,ea,need)=>`Le call coûte ${amt} pour gagner un pot de ${pt} : le prix immédiat demande ${o} d'équité. Après la position, la pression des prix et les cotes implicites réalistes, le seuil effectif est d'environ ${need} ; vous avez ~${e}${disc?` (compté ~${ea} après les décotes liées à la main)`:''}. Caller est rentable à long terme, mais relancer risquerait trop avec une main non premium.`,
foldAdv:(o,amt,pt,ea,resp,need)=>`Le prix immédiat demande ${o} d'équité pour payer (${amt} dans ${pt}). Après la position, la pression des prix et les cotes implicites réalistes, le seuil effectif monte à ~${need}, mais votre équité utilisable n'est que de ~${ea}${resp?' une fois cette taille de mise respectée':''}. Couchez-vous et attendez un meilleur spot.`,
impliedOddsNote:(now,real,best,future,max,hit,reverse)=>` Cotes implicites : le prix immédiat demande ${now}. Avec environ ${hit} de chances de toucher un out propre et jusqu'à ${max} encore disponible derrière, le coach crédite prudemment environ ${future} de paiement futur ; le seuil réaliste descend ainsi à ~${real}. Le meilleur cas absolu serait ${best} si tous les jetons restants étaient payés${reverse?' — mais le tirage non max comporte aussi des cotes implicites inverses, donc ce meilleur cas n\'est pas utilisé':''}.`,
chart3bet:(c,e)=>`${c} figure dans la charte de sur-relance (3-bet) contre ${e?'un relanceur en début de parole':'un relanceur en fin de parole'} — les ranges solveur sur-relancent ces mains au lieu de suivre : les grosses paires pour la valeur, et des mains comme A5s en « bluff à blocker » (votre as rend ses monstres moins probables). Suivre laisserait entrer les joueurs derrière à bas prix.`,
shortAllInValue:(c,b,n)=>`${c} est assez forte pour isoler ce tapis de ${b} BB pour la valeur. Le joueur à tapis ne peut pas se coucher : ce n’est donc pas un bluff de charte ; la relance fait payer cher aux ${n} joueur${n!==1?'s':''} encore actif${n!==1?'s':''} derrière l’entrée dans le pot principal.`,
shortAllInCall:(c,b,r,u,n,x)=>`${c} a assez d’équité pour payer ce tapis de ${b} BB au prix proposé. L’équité brute est de ${r} et reste proche de ${u}, car le pot principal ira forcément à l’abattage${n?` ; le seuil ajusté de ${x} conserve le risque créé par ${n} joueur${n!==1?'s':''} encore actif${n!==1?'s':''} derrière`:''}. Payez sans transformer une main correctement cotée en bluff 3-bet contre quelqu’un qui ne peut pas folder.`,
shortAllInFold:(c,b,r,u,n,x)=>`${c} ne peut pas payer rentablement ce tapis de ${b} BB. Le joueur à tapis ne peut ni folder ni offrir de cotes implicites futures : l’équité brute est de ${r}, environ ${u} après le risque restant, sous le seuil ajusté de ${x}${n?` avec ${n} joueur${n!==1?'s':''} encore actif${n!==1?'s':''}`:''}. Couchez-vous : la charte ordinaire de bluff 3-bet ne s’applique pas à un tapis.`,
squeezePlay:(c,n)=>`${c} est un squeeze : un joueur a relancé et ${n} autre${n>1?'s ont':' a'} mis de l'argent mort avec une main souvent capée. Sur-relancez assez pour mettre les deux sous pression ; vous pouvez gagner tout de suite et gardez de la valeur si vous êtes payé.`,
dominatedTopPair:(k,n)=>` La top paire est utile, mais le kicker ${k} reste vulnérable : ${n} kicker${n>1?'s supérieurs restent':' supérieur reste'} possible${n>1?'s':''}. Évitez de transformer une paire en pot énorme face à une forte action.`,
madeCounterfeit:(r,n)=>` Vos deux paires peuvent être contrefaites : les ${n} ${r} restant${n>1?'s':''} doublent la plus haute carte du board et peuvent faire disparaître votre petite paire. Misez pour valeur/protection, puis réévaluez si cette carte tombe.`,
textureSize:(kind,p)=>` Taille adaptée au board : board ${kind}, donc la mise suggérée fait environ ${p} % du pot — petite sur board sûr, plus grosse quand il faut faire payer les tirages.`,
floatPlan:` Ce call au flop est un float avec un plan, pas un call d'espoir : vous avez la position et assez d'équité, puis pourrez attaquer beaucoup de checks au turn. S'il mise encore ou si le turn favorise fortement sa range, abandonnez.`,
turnPlan:k=>` Plan au turn : ${k==='value'?'forte valeur — continuez à construire le pot':k==='draw'?'gros tirage — semi-bluffez seulement avec une fold equity crédible':k==='control'?'force moyenne — contrôlez le pot et évitez une énorme décision river':'main faible — n’investissez plus sans occasion claire de bluff'}.`,
riverBlockerBluff:` Bluff river avec blocker : votre as retire les couleurs max de la range adverse, tandis que sa ligne passive contient beaucoup de folds. Faites un petit bluff discipliné ; ne le tentez pas contre un joueur qui paie trop.`,
fourBetFold:(c,amt,bb,eff,read)=>`Ce n'est pas un spot de 3-bet : vous avez déjà relancé et faites maintenant face à un 3-bet à ${amt} (${bb}). ${c} n'est pas assez forte pour continuer${read?' contre cette ligne grosse/serrée':''}. Le bloqueur As peut servir de bluff 4-bet occasionnel contre un 3-bet normal et large avec des tapis profonds, mais à ${eff} BB effectives cette taille engage trop de jetons — couchez-vous.`,
fourBetValue:(c,amt,bb)=>`Vous avez déjà relancé et faites maintenant face à un 3-bet à ${amt} (${bb}). ${c} appartient à la range de 4-bet pour valeur ; avec autant de jetons déjà au milieu, utilisez une relance engagée plutôt qu'une taille bancale qui laisse un tout petit tapis.`,
fourBetBluff:(c,amt,bb)=>`Vous avez déjà relancé et faites maintenant face à un 3-bet à ${amt} (${bb}). ${c} peut servir de bluff 4-bet sélectif : votre As bloque AA/AK, la range de 3-bet adverse est large, la taille reste normale et les tapis permettent encore de folder face à un shove.`,
fourBetCall:(c,e,o)=>`Vous avez déjà relancé et faites maintenant face à un 3-bet. ${c} est assez forte pour continuer sans vouloir gonfler un pot 4-bet ; payez avec ${e} d'équité pour un prix de ${o}.`,
chartCallRaise:(c,e,o)=>`${c} figure dans la charte de call contre cette relance — assez fort pour voir un flop, pas assez pour sur-relancer. Votre chance de gain (${e}) couvre le prix (${o}). Suivez, et jouez prudemment si vous ratez le flop.`,
pfContextCall:(c,raw,usable,need,open,eff,pos,behind,sq)=>`${c} est un call contextuel, pas une défense automatique. Face à une ouverture de ${open} BB avec ${eff} BB effectives, vous serez ${pos>0?'en position':pos<0?'hors position':'sans garantie de parler en dernier'} après le flop${behind?`, avec encore ${behind} joueur${behind>1?'s':''} capable${behind>1?'s':''} de squeeze`:''}. L'équité brute de ${raw} devient environ ${usable} après la position, la profondeur, les cotes implicites/inverses et le risque de squeeze modélisé à ${sq}% ; elle dépasse encore le seuil ajusté de ${need}.`,
pfContextFold:(c,raw,usable,need,open,eff,pos,behind,sq)=>`${c} peut sembler jouable dans une charte statique, mais ce call précis n'est pas rentable. Face à une ouverture de ${open} BB avec ${eff} BB effectives, vous serez ${pos>0?'en position':pos<0?'hors position':'sans garantie de parler en dernier'} après le flop${behind?`, et ${behind} joueur${behind>1?'s':''} peu${behind>1?'vent':'t'} encore squeeze`:''}. L'équité brute de ${raw} tombe à environ ${usable} après réalisation, cotes implicites/inverses et ${sq}% de risque de squeeze, sous le seuil ajusté de ${need} — couchez-vous.`,
pfMultiwayValue:(c,n)=>`${n} caller${n>1?'s':''} améliore${n>1?'nt':''} le prix immédiat pour ${c}. Cette main conserve relativement bien son équité en multiway et peut toucher une grosse main cachée : le coach lui accorde donc un petit crédit de cotes implicites, plafonné, si les tapis sont assez profonds. Le bénéfice n'est pas illimité : chaque adversaire supplémentaire réduit toujours l'équité brute et augmente les risques de main non max et de cotes implicites inverses.`,
chartIcmFold:(c,e,o)=>`${c} serait normalement un call ici, mais votre chance de gain simulée (${e}) ne couvre pas le prix (${o}) une fois la pression des prix et la range de ce relanceur comptées. La charte est un guide — le calcul de CETTE table dit de se coucher.`,
chartFoldVs:(c,r,b,d)=>`${c} est hors des ranges de sur-relance et de call face à cette ouverture de ${r||'cette position'}.${d?' Un As suité faible est souvent dominé par les meilleurs As de l’ouvreur, avec de coûteuses cotes implicites inverses.':''}${b?` ${b} joueur${b>1?'s':''} derrière peu${b>1?'vent':'t'} encore squeeze ou entrer dans le pot.`:''} L’estimation d’équité est proche, mais elle ne remplace pas la range propre à la position — couchez-vous.`,
broadwayFlat:(c,o,s,b)=>`${c} est une main haute connectée ou à un écart face à une petite relance de ${o} BB. Selon la stratégie élargie de construction de pots multiway, payez ce prix avec ${s} BB derrière${b?`, même si ${b} joueur${b>1?'s peuvent':' peut'} encore entrer`:''}. C’est un ajustement volontairement loose/exploit, pas la charte solveur standard ; couchez la même main face à une relance plus grosse ou avec un tapis plus court.`,
chartOpen:(c,p)=>`${c} figure dans la charte d'ouverture ${p} — une liste de mains issue de ranges calculées par solveur : la relancer en premier depuis ce siège est rentable à long terme. Entrez en relançant, pas en limpant.`,
chartIso:(c,p,n)=>`${c} figure dans la charte iso ${p} — ranges pour relancer sur ${n} limpeur${n>1?'s':''}. Isolez en relançant ; suivre derrière des limps perd des jetons.`,
chartNotInIso:(c,p)=>`${c} n'est pas dans la charte iso ${p} — même sur des limps, cette main perd de l'argent en relance. Couchez-vous.`,
limpPotNote:n=>` ${n} limpeur${n>1?'s':''} — l'argent mort élargit un peu les ranges d'iso, mais les connecteurs assortis spéculatifs ont besoin de position/profondeur avant de grossir le pot.`,
pfRaiseSize:(amt,bb,pos,callers,anteAdj,depthAdj,effBB)=>` Taille préflop suggérée : ${amt} (${bb}). ${pos==='IP'?'En position, partez de 3 BB':'Hors position, partez de 4 BB'} et ajoutez 1 BB par limpeur (${callers} ici)${anteAdj?' ; les antes ajoutent de l’argent mort':''}${depthAdj>0?' ; un tapis effectif profond justifie une petite hausse':effBB?` ; le tapis effectif d’environ ${effBB} BB ne nécessite aucune hausse pour profondeur`:''}.`,
pfOpenSize:(amt,bb,pos,antes)=>` Taille d'ouverture suggérée : ${amt} (${bb}). ${pos==='IP'?(antes?'Les antes ajoutent assez d’argent mort pour faire passer la base en position de 3 BB à 4 BB.':'Sans antes, la base d’ouverture en position est de 3 BB.'):'La base d’ouverture hors position reste à 4 BB.'}`,
threeBetSize:(amt,bb,open,callers,pos)=>` Taille de 3-bet suggérée : ${amt} (${bb}) — ${pos==='IP'?'3× en position':'4× hors position'} sur la relance d’ouverture à ${open}${callers?`, plus 1× pour chacun des ${callers} caller${callers>1?'s':''}`:''}.`,
fourBetSize:(amt,bb,x)=>` Taille de 4-bet suggérée : ${amt} (${bb}), soit environ ${x}x le 3-bet. C'est volontairement bien moins que la formule 3x d'un 3-bet ; si cette taille engage environ 40 % du tapis effectif, le choix propre avec une main de valeur est le tapis.`,
chartNotIn:(c,p)=>`${c} ne figure pas dans la charte d'ouverture ${p} — les ranges calculées par solveur indiquent que cette main perd de l'argent relancée depuis ce siège. Se coucher maintenant garde des jetons pour un meilleur spot.`,
chartShove:(c,bb,p)=>`À ${bb} BB, ${c} figure dans la charte de tapis ${p} (ranges de shove calculées par solveur pour tapis courts). Partir à tapis maximise vos chances de gagner blinds et antes sans bagarre.`,
chartNotInShove:(c,p)=>`${c} ne figure pas dans la charte de tapis ${p} à cette profondeur — la jouer à tapis perd de l'argent à long terme. Couchez-vous : un tour de patience offre souvent une meilleure main.`,
benchProg:(i,n)=>`Simulation… tournoi ${i} sur ${n}`,
benchResult:(g,np,w,rw,im,ri,av,rav)=>`Sur ${g} tournois simulés à ${np} joueurs, un bot suivant les conseils du coach à CHAQUE décision : 🏆 a gagné ${w}% des tournois (un joueur aléatoire en gagnerait ${rw}%) · 💰 fini dans les places payées ${im}% (aléatoire : ${ri}%) · place moyenne ${av} sur ${np} (aléatoire : ${rav}). Le coach ne bat pas la chance sur une partie — mais voilà son avantage à long terme.`,
mentalMath:(c,s,o)=>` 🧮 Calcul mental en live : prix = mise à payer ÷ (pot + mise) = ${c} ÷ ${s} ≈ ${o}. Votre % de gain : comptez vos outs (cartes qui vous donnent la meilleure main) × 4 au flop, × 2 au turn ; avec une main faite, estimez la fréquence à laquelle vous battez ce qu'il miserait ainsi. Retirez ensuite ~5–15 % face aux grosses mises ou sans paire — les mêmes décotes que le coach a appliquées ici.`,
mWarn:(n,m,z)=>` Les blinds montent dans ${n} main${n>1?'s':''} — votre M tombera à ~${m} (${z}). Cherchez des spots maintenant plutôt que d'être forcé de jouer à pile ou face plus tard.`,
mExplain:m=>` Ce que signifie « M = ${m} » : votre tapis divisé par le coût d'un tour complet de blinds et d'antes — vous pourriez survivre ${m} tours en jetant tout. Au-dessus de 20 🟢, jouez votre jeu normal ; 10–20 🟡, commencez à vous battre pour les pots ; 5–10 🟠, préférez le tapis aux petites relances ; sous 5 🔴, c'est tapis ou couché.`,
cashModeNote:` Blinds fixes en cash — l'EV en jetons = l'argent réel (pas d'ICM ni de pression des prix).`,
diffEasy:` Niveau IA : les adversaires faciles sont plus imprécis et paient trop large, mais leurs grosses agressions sont rarement équilibrées. Le coach fait moins confiance aux lectures exactes, value plus finement, et bluffe moins.`,
diffHard:` Niveau IA : les adversaires difficiles sont plus conscients de la position et plus équilibrés. Leur agressivité contient plus de bluffs, donc le coach respecte moins automatiquement les c-bets et la pression en position tardive.`,
cashDeepNote:bb=>` À ${bb} BB en cash, les cotes implicites comptent : paires et connecteurs assortis jouent plus fort que leur rang, et vous pouvez élargir les steals en position — mais les blinds ne montent jamais : jouez pour la valeur, évitez de gonfler les pots hors position sans équité.`,
cashDeepIp:bb=>` En position à ${bb} BB, ouvrez plus large et stabe après checks — les tapis profonds laissent suivre avec des mains moyennes ; couchez quand même le trash face aux grosses relances.`,
sprDeep:s=>` SPR ~${s} (profond) — les cotes implicites comptent : sets et tirages peuvent gagner gros ; une paire seule ne suffit souvent pas pour tout miser.`,
sprMid:s=>` SPR ~${s} (moyen) — top paire+ peut aller au tapis sous pression ; les tirages ont besoin des bonnes cotes ; ne gonflez pas les pots hors position.`,
sprLow:s=>` SPR ~${s} (bas) — zone d'engagement : une paire ou mieux doit souvent aller chercher l'argent ; ne flottez pas large en espérant vous améliorer.`,
chartBb3bet:(c,v)=>`${c} figure dans la charte de défense BB (${v}) — 3-bet pour valeur ou en bluff bloqueur face à ce steal.`,
chartBbCall:(c,v,e,o)=>`${c} est dans la range de call BB vs ${v} — défendez assez large pour que les steals ne soient pas gratuits. Votre équité (${e}) couvre le prix (${o}).`,
chartBbFold:(c,v)=>`${c} est hors de la charte BB vs ${v} — couchez et économisez ; suivre du trash en BB est une fuite classique.`,
widenNote:(b,e,d)=>` Les blinds qui montent et l'argent mort changent le calcul : votre range d'ouverture normale (~${b}%) est ajustée à ~${e}%${d===1?' — et les joueurs restants se couchent trop : attaquez-les':d===-1?' — tempérée, car les joueurs restants défendent large : volez moins contre eux':''}.`,
tableSizeNote:(n,b,e)=>` Il ne reste que ${n} joueurs : les ranges préflop ne sont plus celles d'une table pleine. La base de ce siège passe d'environ ${b}% à environ ${e}% avant les autres ajustements live.`,
stackDomNote:(r,c,n)=>` Vous avez ~${r}× le plus gros tapis et couvrez ${c} sur ${n} adversaires encore en jeu — les tapis courts se couchent plus souvent : le coach élargit légèrement les ranges de vol/iso. Suivre des mains marginales reste une fuite ; relancez ou couchez.`,
stackDomIso:(c,p,r)=>`${c} n'est pas dans la charte ${p} standard, mais avec ~${r}× le plus gros tapis vous pouvez iso-relancer pour faire pression — les courts ne peuvent pas vous contrer facilement. Relancez, ne suivez pas.`,
stackDomCall:(c,r,e,o)=>`${c} est une défense de charte et vous êtes énorme chip leader (~${r}× le tapis suivant). La simulation brute est proche (${e} vs prix ${o}) et le call coûte peu par rapport à votre stack : continuez plutôt que de trop folder face à la pression des short stacks.`,
stackDomFoldHint:` Votre avantage de tapis rend une iso possible, mais cette main reste trop faible même pour ça. Couchez — la patience préserve votre avantage.`,
icmNote:(x,left,paid)=>` 💰 Valeur du tournoi : ${paid} place${paid>1?'s sont payées':' est payée'} et il reste ${left} joueur${left>1?'s':''}. Les jetons risqués valent plus que les jetons gagnés ; ce call demande donc ~${x}% de chances de gain en plus du calcul normal du pot.`,
lineCbet:` Sa mise au flop est un « continuation bet » de routine — celui qui a relancé avant le flop remise sur presque n'importe quel flop, bon ou mauvais. Cela ne nous apprend presque rien : sa range n'est guère resserrée.`,
lineBarrel:n=>` Il vient de miser ${n===3?'TROIS rues d\'affilée (flop, turn et river)':'deux rues d\'affilée'} — la plupart des joueurs ne continuent pas à tirer ainsi sans une vraie main. Sa range est lue beaucoup plus serrée.`,
lineDonk:` Il a misé CONTRE le relanceur pré-flop (un « donk bet ») — un coup inhabituel : en général soit un monstre déguisé, soit un gros bluff. Par prudence, on le lit comme de la force.`,
lineCR:` Il a d'abord checké, puis relancé (un « check-raise ») — le piège classique. C'est lu comme une range très forte.`,
lineCC:(n,len)=>`${n} a checké ${len} streets d'affilée sans miser — sa range est très capée (paires moyennes, mains faibles, abandons). Une mise prend souvent le pot.`,
lineCCRock:(n,len)=>`${n} (🪨 Serré) a passé ${len} streets — les rocks slowplayent rarement deux fois ; vous voyez en général une paire ou moins.`,
lineCCManiac:(n,len)=>`${n} (🔥 Sauvage) a checké ${len} streets — tell fort : les maniacs misent quand ils sont forts, donc passif = souvent air ou float faible.`,
lineCCShark:(n,len)=>`${n} (🦈 Agressif) a checké ${len} streets — les sharks piègent parfois, respectez le check-raise, mais beaucoup de lignes restent des mains moyennes capées.`,
lineCCStation:(n,len)=>`${n} (📞 Loose) a checké ${len} streets — souvent une paire moyenne qu'il paiera, mais rarement deux paires ou mieux.`,
lineTablePassive:n=>`${n} adversaires ont des lignes passives sur plusieurs streets — la table semble faible. Mises de valeur fines et bluffs passent souvent.`,
lessonFold:(rec,eq,need)=>`Le coach dit ${rec} : ~${eq} après décotes vs ${need} requis — se coucher est +EV.`,
lessonFoldAir:(eq,need)=>`Le coach se couche : cartes hautes / pas de main (~${eq} vs ${need} requis) — payer est une fuite classique.`,
lessonCall:(rec,you,eq,need)=>`Le coach dit ${rec} (~${eq} vs ${need} requis) — vous avez choisi ${you}.`,
lessonRaise:(rec,you)=>`Le coach dit ${rec} — vous avez choisi ${you} ; relancer risque plus avec une main non premium.`,
bucketMWCheck:n=>` Multiway (${n} adversaires) : checké sur vous — ranges plafonnées ; mise fine ou bluff, mais respectez les check-raises.`,
bucketMWCbet:n=>` Multiway (${n} adversaires) face à un c-bet — défendez plus serré qu'en HU ; un caller a souvent un morceau.`,
bucketMWWet:n=>` Multiway (${n} adversaires) sur board humide — quintes et couleurs vivantes pour quelqu'un ; ne stack pas avec une paire.`,
bucketMWDry:n=>` Multiway (${n} adversaires) sur board sec — les bluffs passent plus, mais plusieurs joueurs = souvent une paire.`,
bucketMWFace:n=>` Multiway (${n} adversaires) face à une mise — continuez seulement avec main forte ou tirage avec cotes claires.`,
bucketMWIP:n=>` Multiway (${n} adversaires) et vous parlez en dernier (IP) — plus de bluffs et de mises fines ; respectez quand même les relances.`,
bucketMWOOP:n=>` Multiway (${n} adversaires) et vous parlez en premier (OOP) — checkez plus de mains marginales ; miser se fait trop souvent suivre.`,
bucketMWPaired:n=>` Multiway (${n} adversaires) sur board apparié — brelans/full sont possibles ; une paire ne suffit souvent pas.`,
bucketMWFlushDraw:n=>` Multiway (${n} adversaires) avec tirage couleur possible — un joueur peut être en train de tirer la couleur.`,
bucketMWBigPot:p=>` Gros pot multiway (~${p} BB) — les erreurs coûtent cher ; continuez seulement avec équité claire.`,
bucketMWSqueeze:n=>` Multiway (${n} adversaires) face à une squeeze — ranges fortes ; couchez les marginales sauf excellentes cotes.`,
pairedBoardBetCall:(callers,opps,pair,kicker,over)=>`Un adversaire a misé et ${callers} adversaire${callers>1?'s ont':' a'} payé dans ce pot à ${opps+1} joueurs. Vos deux paires affichées ne sont que ${pair} avec la paire du board et un kicker ${kicker}${over?`, avec ${over} rang${over>1?'s':''} supérieur${over>1?'s':''} au board`:''} ; les redraws apparents peuvent encore faire un full perdant. Ce bluff-catcher marginal doit être couché.`,
briefSpot:(eq,need,call,pot,pos,ip,opps)=>` 📋 Spot : ~${eq} d'équité${need!=='—'?` vs ${need} requis`:''}${call!=='—'?` · prix ${call} → ${pot}`:''} · ${pos} (${ip}) · ${opps} adv.`,
briefAir:` Pas de vraie main faite — équité fortement décotée face aux mises.`,
briefVillain:(name,style,line)=>` vs ${name} (${style}) sur une ligne ${line}.`,
dirtyOutPairs:c=>` Outs sales (${c}) : pair le board — aide tout le monde, pas seulement vous.`,
dirtyOutFlush:c=>` Outs sales (${c}) : 4e carte à une couleur au board — donne souvent la couleur gagnante à l'adversaire.`,
profRock:` Le miseur est du type 🪨 Serré — ces joueurs ne bluffent presque jamais gros. Respectez cette mise : sans main forte, se coucher est généralement correct.`,
profManiac:` Le miseur est du type 🔥 Sauvage — sa range contient davantage de bluffs, donc vos mains moyennes gagnent de la valeur. Cette range élargie est déjà intégrée à l’équité estimée ; ne payez plus léger que si le prix et la réalisation d’équité le permettent encore.`,
profStation:` Le miseur est du type 📞 Passif — il paie tout mais ne mise presque jamais gros sans une vraie main. Son agression soudaine mérite le respect.`,
blockerAce:` Vous tenez un As — un « blocker » : comme l'un des quatre as est dans VOTRE main, il est moins probable qu'il ait les grosses mains à as (paire d'as, top paire avec as). Cela rend le call un peu meilleur.`,
blockerFlush:` Vous tenez l'as de la couleur du board — même sans couleur vous-même, cette carte signifie qu'IL ne peut pas avoir la meilleure couleur possible. Et un bluff-raise de votre part devient très crédible.`,
suitedConn:` Ce genre de main (assortie et connectée) joue mieux que son classement brut — elle fait des quintes et couleurs cachées qui gagnent de gros pots quand les tapis sont profonds. Le coach s'élargit légèrement pour elles.`,
scFlatMulti:(c,n)=>`${c} est une main spéculative assortie/connectée, pas une main qui veut grossir le pot contre ${n} limper${n>1?'s':''}/caller${n>1?'s':''}. Prenez le prix pas cher et cherchez un gros tirage ou une main cachée ; si le flop rate, lâchez facilement.`,
scFoldEarly:c=>`${c} est une main spéculative assortie/connectée, mais trop de joueurs peuvent encore se réveiller derrière vous. Sans position tardive ni dead money à attaquer, ne forcez pas une grosse relance — couchez et attendez un spot plus propre.`,
drawMwCheck:n=>`C'est surtout un tirage dans un pot multiway (${n} adversaires). Les semi-bluffs marchent mieux en heads-up ou contre des ranges plafonnées ; avec plusieurs joueurs encore là, prenez la carte gratuite au lieu de grossir un pot que vous ne gagnerez pas toujours.`,
mixTitle:'🎭 Variez votre jeu (optionnel)',
mixCall:'Les maths disent de payer — mais de temps en temps, relancer ici garde vos adversaires dans le flou. Si vous jouez toujours la même main de la même façon, ils vous liront comme un livre ouvert. Un peu moins bon pour cette main précise, mais rentable sur la durée.',
mixCheck:'Checker est le jeu solide — mais de temps en temps, glissez une petite mise ici. Les adversaires qui apprennent que votre check signifie toujours faiblesse vous marcheront dessus. Une mise surprise rare les garde honnêtes.',
mixTrap:'Relancer est le jeu rentable — mais avec une main aussi forte, vous pouvez parfois juste payer et tendre un piège. Si vous relancez toujours vos monstres, les joueurs attentifs se couchent et vous gagnez moins. Un slow-play occasionnel cache votre force.',
coachErr:'Coach indisponible pour ce tour.'},
es:{
rangesNote:(n,c)=>` La equidad se simula contra rangos realistas: ${n} rival${n>1?'es han':' ha'} mostrado fuerza y se ${n>1?'modelan':'modela'} sobre aproximadamente el top ${c}% de manos, no cartas aleatorias.`,
checksNote:n=>` ${n===1?'Un rival ha':n+' rivales han'} pasado — pasar suele descartar una mano muy fuerte, así que la parte alta de ${n===1?'ese rango':'esos rangos'} se recorta en la simulación (ojo con las trampas, eso sí).`,
madeBoardPair:' — cuidado: esa pareja está entera en la mesa, todos tus rivales también la tienen.',
madeOverpair:' — una overpair, muy fuerte.',madeUnderPair:' — una pareja de mano por debajo de la carta más alta de la mesa.',madeTopPair:' — top pair, sólida.',
madeTwoPair:(a,b)=>` — doble pareja real (${a} y ${b}), bastante fuerte para apostar cuando pasan hasta ti.`,
madeNotTop:r=>` — no es top pair; cualquiera con un ${r} va por delante de ti.`,
drawFlush:(n,o)=>`proyecto de color (${n} outs, ≈${o})`,drawOESD:(n,o)=>`proyecto de escalera abierta (${n} outs, ≈${o})`,drawGut:(n,o)=>`proyecto de escalera interna (${n} outs, ≈${o})`,
drawDoubleGut:(n,o)=>`doble gutshot (${n} outs, ≈${o})`,
drawBackdoorStraight:o=>`escalera backdoor solamente (dos rangos concretos en turn y river, ≈${o} para completarla)`,
drawBackdoorFlush:o=>`color backdoor solamente (mismo palo en turn Y river, ≈${o} para completarlo)`,
backdoorFlushWarn:' Solo tienes una posibilidad de color backdoor: las dos cartas restantes deben ser del palo correcto. No es un proyecto de color normal de una carta y no justifica esta igualada.',
backdoorStraightWarn:' Solo tienes una posibilidad de escalera backdoor: deben llegar dos rangos concretos en turn y river. No es un proyecto de escalera normal de una carta y no justifica esta igualada.',
drawBaked:' Tu proyecto ya está incluido en la probabilidad de ganar — completarlo te daría probablemente la mejor mano.',
warnFlush:' Hay tres cartas del mismo palo en la mesa — cuidado con un color rival.',
warnPaired:' La mesa está emparejada: son posibles fulls y tríos.',
multiway:n=>` Con ${n} rivales todavía en la mano, las manos marginales pierden valor — alguien suele tener algo.`,
posEarly:p=>` Estás en posición temprana (${p}) — casi toda la mesa habla después de ti: juega más cerrado de lo normal.`,
posLate:p=>` Estás en posición tardía (${p}) — actuar después de los demás es una ventaja: puedes abrirte un poco.`,
futFirst:' Después del flop serás el PRIMERO en hablar — jugar cada calle fuera de posición es un lastre real: entra con un rango más fuerte y prefiere subir (tomar la iniciativa) antes que igualar.',
futLast:' Después del flop serás el ÚLTIMO en hablar — verás la decisión de todos antes de la tuya, lo que hace rentables algunas manos más.',
futMid:(o,n)=>` Después del flop hablarás ${o} de ${n} — posición intermedia: no te comprometas demasiado con manos marginales.`,
stFirst:' Hablas primero en esta calle (fuera de posición) — los rivales reaccionan después de ti: tiende a pasar con manos marginales.',
stLast:' Hablas último en esta calle (en posición) — todos ya hablaron: sus pases son información extra que puedes usar.',
pfShove:(bb,c,pr,t,p)=>`Con ${bb} BB estás en territorio push/fold. ${c} (${pr}) está dentro del rango Nash de all-in (~${t}%) desde ${p} — ve all-in en vez de subir poco: maximiza la fold equity y evita que las ciegas te coman.`,
pfShortCheck:(c,p)=>`${c} está por debajo del rango de all-in para ${p}, pero pasar es gratis.`,
pfShortCall:(c,e,o)=>`${c} está por debajo de un rango estándar de all-in, pero tu equidad simulada (${e}) supera con holgura el precio (${o}).`,
pfShortFold:(bb,c,pr,t,p)=>`Con ${bb} BB, ${c} (${pr}) queda fuera del rango Nash (~${t}%) para ${p}. Retírate y espera — incluso corto de fichas, la paciencia gana al despilfarro.`,
huPush:(bb,c,pr,t,p)=>`Heads-up con ${bb} BB efectivas: retirarse o completar cede demasiado valor a las ciegas. ${c} (${pr}) está cerca de la parte baja del rango de all-in (~${t}%) desde ${p}, pero el all-in sigue siendo rentable: ganas el bote cuando la ciega grande se retira y conservas equity cuando paga. El porcentaje de victoria mostrado es tu equity al showdown si te pagan; no es la única razón para ir all-in.`,
huOpen:(bb,c,p)=>`Heads-up con ${bb} BB efectivas hay suficiente profundidad para jugar postflop. ${c} es jugable desde ${p}, pero no es un shove puro — abre pequeño y mantén manos peores dentro.`,
huCall:(bb,c,e,o)=>`Heads-up con ${bb} BB efectivas, los rangos de call se amplían porque ya no hay presión de saltos de premio. ${c} tiene aprox. ${e} equity contra el precio ${o}, así que continúa.`,
huFold:(bb,c,pr,t,p)=>`Heads-up con ${bb} BB efectivas, ${c} (${pr}) está por debajo del rango de shove/continuación (~${t}%) para ${p}. Retírate en vez de jugarte el match con basura pura.`,
pfOpen:(c,pr,t,p,pair)=>`Nadie ha subido aún, y ${c} (${pr}) está dentro del rango de apertura (~${t}%) para ${p}${pair?' contando su valor de set-mining — las parejas de mano valen más que su ranking bruto con stacks profundos: ligar un trío (~12%) va disfrazado y gana botes grandes':''}. Entra subiendo, no de limp — tomas la iniciativa y puedes llevarte las ciegas directamente.`,
pfBBfree:c=>`${c} no es lo bastante fuerte para subir desde la ciega grande, pero ves el flop gratis.`,
pfOpenFold:(c,pr,t,p)=>`${c} (${pr}) está por debajo del rango de apertura (~${t}%) para ${p}. Retirarse aquí es el juego de libro — entrar de limp con manos débiles pierde fichas a largo plazo.`,
pfOpenFoldPair:(c,p)=>`${c} es una pareja pequeña de mano, pero desde ${p} sin subida previa no es un buen limp. Las parejas pequeñas buscan sobre todo ligar trío (~12%); si la tabla/profundidad no justifica abrir subiendo, retírate y evita jugar una pareja mínima fuera de posición.`,
pf3bet:c=>`${c} es una mano premium (top 5%). Contra una subida, lo estándar es resubir (3-bet) por valor — solo igualar deja entrar barato a manos peores detrás de ti.`,
pfCallRange:(p,ct,c,pr,e,o)=>`Ante una subida, ${p} continúa con aproximadamente el top ${ct}% — ${c} (${pr}) califica, y tu equidad contra su rango (${e}) cubre el precio (${o}).`,
pfSetMine:(c,amt,x)=>`${c} no califica por fuerza bruta, pero es un set-mine de manual: la llamada cuesta solo ${amt} con ~${x}x detrás. Ligas trío ~12% de las veces — disfrazado, y gana stacks enteros. La regla del 15 a 1 dice que las odds implícitas están. Si fallas el flop, te retiras sin dudar.`,
pfSetMineFold:(c,amt,x)=>`${c} es básicamente una mano de set-mining contra esta subida. Solo ligas trío ~12% de las veces, así que pagar necesita odds implícitas profundas — más o menos 15x la llamada detrás. Aquí cuesta ${amt} con solo ~${x}x efectivas, así que retirarse es más limpio que pagar para fallar la mayoría de flops.`,
pfFoldRange:(ct,p,c,pr,e,o)=>`Contra una subida, solo continúa el ~top ${ct}% desde ${p}; ${c} (${pr}) no llega. Tu equidad contra el rango de quien sube es ~${e} necesitando ${o} — déjala ir.`,
valRiver:(e,n)=>`Con ~${e} de probabilidad contra ${n} rival${n>1?'es':''}, probablemente eres el mejor en el showdown. Apuesta por valor — pasar no te gana nada extra, y manos peores aún pueden pagarte.`,
valBet:(e,n)=>`Con ~${e} de probabilidad contra ${n} rival${n>1?'es':''}, probablemente vas por delante. Apuesta por valor — pasar regala una carta gratis a manos peores y proyectos.`,
protectBet:(h,e,n)=>`${h} es fuerte pero vulnerable. Apuesta por valor/protección: parejas peores, pareja+proyecto y proyectos de escalera/color pueden pagar, y pasar les regala una carta. La equity bruta es solo ~${e} contra ${n} rival${n>1?'es':''} porque comparten muchos outs, pero apostar sigue siendo mejor que dar carta gratis.`,
overcardCbet:(c,e,checked)=>`${c} tiene dos overcards vivas y cerca de ${e} de equity heads-up. Fuiste el agresor preflop${checked?', y la ciega grande ha pasado una range limitada hasta ti':''}, así que haz una pequeña apuesta de continuación: alturas y proyectos peores pueden pagar, mientras las manos débiles pueden retirarse. No es aire puro, pero frena si te resuben.`,
sidePotOvercardCbet:(c,e,s)=>`${c} tiene dos overcards vivas y ya hay ${s} en un bote lateral contra el único rival que aún puede actuar. Su rango limitado ha pasado ante el agresor preflop, así que haz una pequeña apuesta de continuación por protección y fold equity. El ~${e} mostrado incluye al jugador all-in y subestima este duelo por el bote lateral; frena si te resuben.`,
stab:e=>`Todos han pasado hasta ti, y pasar suele significar debilidad — sus rangos parecen limitados. Con ~${e} más toda esa fold equity, una apuesta se lleva este bote a menudo. Si alguien iguala o sube tras pasar, frena: eso es fuerza de verdad.`,
checkedDownStab:(e,n)=>`${n===1?'El rival ha':'Los rivales han'} pasado la opción gratis preflop y luego siguieron pasando. Esa línea está muy limitada, así que con ~${e} y una mano que no es basura pura, haz una apuesta pequeña: no necesitas apostar grande para presionar aire.`,
probeStab:(e,n,o)=>`${n===1?'El rival ha':'Los rivales han'} pasado varias calles, así que su línea está limitada. Incluso ${o?'fuera de posición, ':''}con ~${e} y sin apuesta que pagar, una apuesta pequeña de bluff/probe puede tirar aire y manos débiles de showdown — mantenla pequeña y abandona si resuben.`,
midRiver:e=>`Un ~${e} decente pero sin más. La mesa está completa — apostar solo lo pagan manos mejores. Pasa e intenta llegar barato al showdown.`,
midCheck:e=>`Un ~${e} decente pero sin más. No da para inflar el bote; pasa y mantén el bote pequeño mientras ves qué pasa.`,
multiwayTopPairCheck:(e,k,n)=>`Tienes pareja máxima, pero el kicker ${k} es vulnerable en un bote de ${n+1} jugadores, y quien subió preflop todavía actúa detrás. Apostar tira buena parte del aire que ya ganas, mientras mejores Jx y overpairs pueden pagar o subir. Pasa, mantén sus faroles dentro y decide después de ver su acción. Tu ~${e} de equity es una parte de un bote multiway, no una razón para inflarlo de inmediato.`,
drySidePotCheck:(h,e)=>`${h} es suficientemente fuerte para disputar el bote principal, pero un rival ya está all-in y el bote lateral sigue vacío. En esta mesa seca hay poco que proteger: pasar mantiene manos peores y faroles, mientras apostar construiría sobre todo un nuevo bote lateral contra el único rival que aún puede actuar. Tu ~${e} de equity incluye al jugador all-in; no basta por sí solo para crear un bote lateral.`,
weakRiverLast:e=>`Solo ~${e} de probabilidad y no quedan cartas — tu mano es definitiva. Todos han pasado: pasa también y llévate el showdown gratis.`,
weakRiverFirst:e=>`Solo ~${e} de probabilidad y no quedan cartas — tu mano ya no puede mejorar. Pasa, y retírate ante cualquier apuesta seria.`,
weakFree:e=>`Solo ~${e} de probabilidad, pero pasar no cuesta nada. Toma la carta gratis y retírate ante cualquier apuesta seria.`,
bigBet:r=>` Esta apuesta es ≈${r}% del bote — apuestas tan grandes suelen ser manos hechas (doble pareja o mejor), así que el coach descuenta tu probabilidad bruta aquí.`,
gutWarn:' Perseguir una escalera interna de 4 outs contra apuestas grandes es una fuga de dinero a largo plazo — incluso cuando ligas, no te pagan lo suficiente para cubrir todos los fallos (odds implícitas pobres).',
airWarn:' No tienes mano hecha ni proyecto real — quien apuesta suele tener al menos una pareja, y las llamadas "correctas por odds" con carta alta son una de las mayores fugas del póker. El coach descuenta mucho tu probabilidad bruta aquí.',
weakDrawWarn:' No tienes mano hecha y solo una gutshot débil — esos cuatro outs ya están incluidos en la equity, pero no es un proyecto fuerte como una escalera abierta o color. El coach la descuenta mucho frente a agresión.',
underpairRealization:(n,pen,size,oop,backdoors,commit,spr)=>` Tu pareja de mano está por debajo de ${n} altura${n>1?'s':''} distinta${n>1?'s':''} de la mesa. ${oop?'Fuera de posición, ':''}ante una apuesta del ${size}% del bote y con más decisiones por venir, la equity bruta hasta el showdown exagera la frecuencia con la que llegarás al river de forma rentable.${commit>=25?` Igualar también compromete el ${commit}% de tu stack restante y deja un SPR de apenas ~${spr}, así que el siguiente barrel tendrá mucha presión.`:''} El coach resta unos ${pen} puntos de equity${backdoors?' después de dar algo de crédito a tus backdoors':''}.`,
fragileFlushCheck:(tuple,higher,danger,continued,n)=>` Es un color bajo ${tuple} en una mesa con cuatro cartas del mismo palo, no el color máximo: quedan ${higher} carta${higher!==1?'s':''} del palo por encima. Contra ${n} rival${n>1?'es':''}, la probabilidad modelada de que alguien ya tenga un color mejor es de aproximadamente ${danger}; frente a las manos dispuestas a continuar ante una apuesta real, esta mano solo va por delante cerca del ${continued}. Pasa para controlar el bote: apostar retira demasiadas manos peores y concentra la acción en colores mejores.`,
rangeLikelyHands:(n,h)=>` Las clases de manos más probables de ${n} tras todo el historial: ${h}. Los porcentajes son su parte normalizada del rango actual después de los blockers conocidos, no la certeza de una mano exacta.`,
raiseVal:e=>`~${e} de probabilidad: eres gran favorito. Sube por valor y para cobrar a los proyectos — solo igualar deja dinero sobre la mesa.`,
postflopRaiseSize:(amt,bb,x,bet,ratio)=>` Tamaño de subida postflop sugerido: ${amt} (${bb}). La apuesta rival es aprox. ${ratio}% del bote, así que usa cerca de ${x}x esa apuesta: las apuestas pequeñas se pueden subir mucho más, mientras que apuestas grandes y overbets suelen necesitar solo 2-3x.`,
callOk:(amt,pt,o,e,disc,ea,need)=>`La llamada cuesta ${amt} para ganar un bote de ${pt}: el precio inmediato exige ${o} de equity. Tras posición, presión de premios y odds implícitas realistas, el requisito efectivo es ~${need}; tienes ~${e}${disc?` (contado como ~${ea} después de los descuentos de la mano)`:''}. Igualar es rentable a largo plazo, pero subir arriesgaría demasiado con una mano no premium.`,
foldAdv:(o,amt,pt,ea,resp,need)=>`El precio inmediato exige ${o} de equity para igualar (${amt} en ${pt}). Tras posición, presión de premios y odds implícitas realistas, el requisito efectivo es ~${need}, pero tu equity utilizable es solo ~${ea}${resp?' una vez respetado este tamaño de apuesta':''}. Retírate y espera un mejor momento.`,
impliedOddsNote:(now,real,best,future,max,hit,reverse)=>` Odds implícitas: el precio inmediato exige ${now}. Con cerca de ${hit} de ligar un out limpio y hasta ${max} aún disponibles detrás, el coach acredita prudentemente unos ${future} de pago futuro; así, el umbral realista baja a ~${real}. El mejor caso absoluto sería ${best} si se pagaran todas las fichas restantes${reverse?' — pero el proyecto no máximo también tiene riesgo de odds implícitas inversas, así que no se usa ese mejor caso':''}.`,
chart3bet:(c,e)=>`${c} está en la tabla de resubida (3-bet) contra ${e?'quien sube desde posición temprana':'quien sube desde posición tardía'} — los rangos de solver resuben estas manos en vez de solo igualar: las parejas grandes por valor, y manos como A5s como "farol con blocker" (tu as hace menos probables sus monstruos). Solo igualar dejaría entrar barato a los de detrás.`,
shortAllInValue:(c,b,n)=>`${c} es lo bastante fuerte para aislar por valor este all-in de ${b} BB. El jugador all-in no puede retirarse, así que no es un farol de tabla: la subida cobra a los ${n} jugador${n!==1?'es':''} activo${n!==1?'s':''} detrás por entrar en el bote principal.`,
shortAllInCall:(c,b,r,u,n,x)=>`${c} tiene equity suficiente para pagar este all-in de ${b} BB al precio ofrecido. La equity bruta es ${r} y se mantiene cerca de ${u} porque el bote principal llegará necesariamente al showdown${n?`; el requisito ajustado de ${x} aún incluye el riesgo de ${n} jugador${n!==1?'es':''} activo${n!==1?'s':''} detrás`:''}. Paga; no conviertas una mano con precio suficiente en un farol 3-bet contra alguien que no puede retirarse.`,
shortAllInFold:(c,b,r,u,n,x)=>`${c} no puede pagar rentablemente este all-in de ${b} BB. El jugador all-in no puede retirarse ni ofrecer odds implícitas futuras: la equity bruta es ${r}, cerca de ${u} tras el riesgo restante, por debajo del requisito ajustado de ${x}${n?` con ${n} jugador${n!==1?'es':''} aún activo${n!==1?'s':''}`:''}. Retírate: la tabla normal de faroles 3-bet no se aplica contra un all-in.`,
squeezePlay:(c,n)=>`${c} es un squeeze: un jugador subió y ${n} caller${n>1?'s pusieron':' puso'} dinero muerto con una mano normalmente limitada. Resube lo suficiente para presionar a ambos; puedes ganar ya y conservar valor si pagan.`,
dominatedTopPair:(k,n)=>` La pareja máxima sirve, pero el kicker ${k} es vulnerable: todavía ${n===1?'queda':'quedan'} ${n} kicker${n>1?'s':''} superior${n>1?'es':''}. Evita convertir una pareja en un bote enorme ante acción fuerte.`,
madeCounterfeit:(r,n)=>` Tus dobles parejas pueden quedar falsificadas: los ${n} ${r} restantes emparejan la carta alta de la mesa y pueden hacer que tu pareja pequeña deje de jugar. Apuesta por valor/protección y reevalúa si llega esa carta.`,
textureSize:(kind,p)=>` Tamaño según la mesa: es una mesa ${kind}, así que la apuesta sugerida usa cerca del ${p}% del bote — menor en mesas seguras y mayor cuando hay que cobrar proyectos.`,
floatPlan:` Este call del flop es un float con plan, no una esperanza: tienes posición y equity suficiente, y puedes atacar muchos checks del turn. Si el rival vuelve a apostar o el turn favorece mucho su rango, abandona.`,
turnPlan:k=>` Plan del turn: ${k==='value'?'valor fuerte — sigue construyendo el bote':k==='draw'?'proyecto fuerte — semifarolea solo con fold equity creíble':k==='control'?'fuerza media — controla el bote y evita una enorme decisión en river':'mano débil — deja de invertir sin una oportunidad clara de farol'}.`,
riverBlockerBluff:` Farol de river con blocker: tu as elimina los colores máximos del rango rival y su línea pasiva contiene muchos folds. Haz un farol pequeño y disciplinado; no lo intentes contra quien paga demasiado.`,
fourBetFold:(c,amt,bb,eff,read)=>`Este no es un spot de 3-bet: ya subiste y ahora afrontas un 3-bet a ${amt} (${bb}). ${c} no es lo bastante fuerte para continuar${read?' contra esta línea grande/cerrada':''}. El bloqueo del As puede servir como farol de 4-bet ocasional contra un 3-bet normal y amplio con stacks profundos, pero con ${eff} BB efectivas este tamaño compromete demasiado — retírate.`,
fourBetValue:(c,amt,bb)=>`Ya subiste y ahora afrontas un 3-bet a ${amt} (${bb}). ${c} pertenece al rango de 4-bet por valor; con tanto dinero ya en medio, usa una subida comprometida en vez de un tamaño incómodo que deje un stack diminuto.`,
fourBetBluff:(c,amt,bb)=>`Ya subiste y ahora afrontas un 3-bet a ${amt} (${bb}). ${c} puede usarse como farol selectivo de 4-bet: tu As bloquea AA/AK, el rango rival es amplio, el tamaño aún es normal y los stacks permiten retirarse ante un shove.`,
fourBetCall:(c,e,o)=>`Ya subiste y ahora afrontas un 3-bet. ${c} es lo bastante fuerte para continuar, pero no quiere inflar un bote de 4-bet; iguala con ${e} de equity frente a un precio de ${o}.`,
chartCallRaise:(c,e,o)=>`${c} está en la tabla de llamada contra esta subida — bastante fuerte para ver un flop, no tanto como para resubir. Tu probabilidad (${e}) cubre el precio (${o}). Iguala, y juega con cuidado si fallas el flop.`,
pfContextCall:(c,raw,usable,need,open,eff,pos,behind,sq)=>`${c} es una llamada contextual, no una defensa automática. Ante una apertura de ${open} BB con ${eff} BB efectivas, jugarás ${pos>0?'con posición':pos<0?'fuera de posición':'sin garantizar la última acción'} tras el flop${behind?`, con ${behind} jugador${behind>1?'es':''} todavía capaz${behind>1?'es':''} de hacer squeeze`:''}. La equity bruta de ${raw} queda en torno a ${usable} tras posición, profundidad, odds implícitas/inversas y el riesgo modelado de squeeze del ${sq}%; aún supera el requisito ajustado de ${need}.`,
pfContextFold:(c,raw,usable,need,open,eff,pos,behind,sq)=>`${c} puede parecer jugable en una tabla estática, pero esta llamada exacta no es rentable. Ante una apertura de ${open} BB con ${eff} BB efectivas, jugarás ${pos>0?'con posición':pos<0?'fuera de posición':'sin garantizar la última acción'} tras el flop${behind?`, y ${behind} jugador${behind>1?'es':''} todavía puede${behind>1?'n':''} hacer squeeze`:''}. La equity bruta de ${raw} baja a cerca de ${usable} al contar realización, odds implícitas/inversas y ${sq}% de riesgo de squeeze, por debajo del requisito ajustado de ${need}; retírate.`,
pfMultiwayValue:(c,n)=>`${n} caller${n>1?'s':''} mejora${n>1?'n':''} el precio inmediato para ${c}. Esta mano conserva relativamente bien su equity multiway y puede ligar una mano fuerte y escondida, así que el coach le concede un pequeño crédito de odds implícitas, limitado, si los stacks son suficientemente profundos. El beneficio no es ilimitado: cada rival adicional sigue reduciendo la equity bruta y añade riesgo de mano no máxima y odds implícitas inversas.`,
chartIcmFold:(c,e,o)=>`${c} normalmente sería una llamada aquí, pero tu probabilidad simulada (${e}) no cubre el precio (${o}) contando la presión de premios y el rango de quien sube. La tabla es una guía — las cuentas de ESTA mesa dicen retirarse.`,
chartFoldVs:(c,r,b,d)=>`${c} queda fuera de los rangos de resubida y call contra esta apertura desde ${r||'esa posición'}.${d?' Un as suited débil suele estar dominado por los ases mejores de quien abre, creando costosas odds implícitas inversas.':''}${b?` ${b} jugador${b>1?'es':''} detrás todavía puede${b>1?'n':''} hacer squeeze o entrar en el bote.`:''} La estimación de equity está cerca, pero por sí sola no invalida el rango específico por posición — retírate.`,
broadwayFlat:(c,o,s,b)=>`${c} es una mano alta conectada o con un hueco ante una subida pequeña de ${o} BB. Con la estrategia ampliada de construir botes multiway, paga este precio con ${s} BB detrás${b?`, aunque ${b} jugador${b>1?'es':''} todavía puede${b>1?'n':''} entrar`:''}. Es un ajuste loose/exploit intencional, no la tabla solver estándar; tira la misma mano ante una subida mayor o con un stack más corto.`,
chartOpen:(c,p)=>`${c} está en la tabla de apertura de ${p} — una lista de manos sacada de rangos calculados por solver: subirla primero desde este asiento es rentable a largo plazo. Entra subiendo, no de limp.`,
chartIso:(c,p,n)=>`${c} está en la tabla iso de ${p} — rangos para subir sobre ${n} limper${n>1?'s':''}. Aísla con subida; pagar detrás de limps pierde fichas.`,
chartNotInIso:(c,p)=>`${c} no está en la tabla iso de ${p} — incluso sobre limps, subir pierde dinero a largo plazo. Retírate.`,
limpPotNote:n=>` ${n} limper${n>1?'s':''} — el dinero muerto amplía un poco los rangos de iso, pero los conectores suited especulativos necesitan posición/profundidad antes de inflar el bote.`,
pfRaiseSize:(amt,bb,pos,callers,anteAdj,depthAdj,effBB)=>` Tamaño preflop sugerido: ${amt} (${bb}). ${pos==='IP'?'En posición, empieza en 3 BB':'Fuera de posición, empieza en 4 BB'} y añade 1 BB por limper (${callers} aquí)${anteAdj?'; los antes añaden dinero muerto':''}${depthAdj>0?'; los stacks efectivos profundos permiten un pequeño aumento':effBB?`; el stack efectivo de ~${effBB} BB no requiere aumento por profundidad`:''}.`,
pfOpenSize:(amt,bb,pos,antes)=>` Tamaño de apertura sugerido: ${amt} (${bb}). ${pos==='IP'?(antes?'Los antes añaden suficiente dinero muerto para mover la base en posición de 3 BB a 4 BB.':'Sin antes, la base de apertura en posición es de 3 BB.'):'La base de apertura fuera de posición se mantiene en 4 BB.'}`,
threeBetSize:(amt,bb,open,callers,pos)=>` Tamaño de 3-bet sugerido: ${amt} (${bb}) — ${pos==='IP'?'3× en posición':'4× fuera de posición'} sobre la subida inicial a ${open}${callers?`, más 1× por cada uno de los ${callers} caller${callers>1?'s':''}`:''}.`,
fourBetSize:(amt,bb,x)=>` Tamaño de 4-bet sugerido: ${amt} (${bb}), unas ${x}x el 3-bet. Es deliberadamente mucho menor que una fórmula 3x de 3-bet; si ese tamaño compromete cerca del 40 % del stack efectivo, con una mano de valor la opción limpia es ir all-in.`,
chartNotIn:(c,p)=>`${c} no está en la tabla de apertura de ${p} — los rangos calculados por solver dicen que esta mano pierde dinero subida desde este asiento. Retirarse ahora guarda fichas para un momento mejor.`,
chartShove:(c,bb,p)=>`Con ${bb} BB, ${c} está en la tabla de all-in de ${p} (rangos de shove calculados por solver para stacks cortos). Ir all-in maximiza tus opciones de llevarte ciegas y antes sin pelea.`,
chartNotInShove:(c,p)=>`${c} no está en la tabla de all-in de ${p} a esta profundidad — jugarla all-in pierde dinero a largo plazo. Retírate: una ronda de paciencia suele traer una mano mejor.`,
benchProg:(i,n)=>`Simulando… torneo ${i} de ${n}`,
benchResult:(g,np,w,rw,im,ri,av,rav)=>`En ${g} torneos simulados de ${np} jugadores, un bot que sigue el consejo del coach en CADA decisión: 🏆 ganó el ${w}% de los torneos (un jugador aleatorio ganaría el ${rw}%) · 💰 terminó en premios el ${im}% (aleatorio: ${ri}%) · puesto medio ${av} de ${np} (aleatorio: ${rav}). El coach no vence a la suerte en una partida — pero esta es su ventaja a largo plazo.`,
mentalMath:(c,s,o)=>` 🧮 Cálculo mental en vivo: precio = llamada ÷ (bote + llamada) = ${c} ÷ ${s} ≈ ${o}. Tu % de ganar: cuenta tus outs (cartas que te dan la mejor mano) × 4 en el flop, × 2 en el turn; con mano hecha, estima cuántas veces ganas a lo que apostaría así. Luego resta ~5–15% contra apuestas grandes o sin pareja — los mismos descuentos que el coach aplicó aquí.`,
mWarn:(n,m,z)=>` Las ciegas suben en ${n} mano${n>1?'s':''} — tu M caerá a ~${m} (${z}). Busca jugadas ahora antes de verte forzado a jugártela.`,
mExplain:m=>` Qué significa «M = ${m}»: tu stack dividido por el coste de una ronda completa de ciegas y antes — sobrevivirías ${m} rondas tirándolo todo. Por encima de 20 🟢, juega tu juego normal; 10–20 🟡, empieza a pelear por los botes; 5–10 🟠, prefiere el all-in a subidas pequeñas; bajo 5 🔴, all-in o retirarse.`,
cashModeNote:` Ciegas fijas en cash — el EV en fichas = dinero real (sin ICM ni presión de premios).`,
diffEasy:` Dificultad IA: los rivales fáciles son más ruidosos y pagan demasiado amplio, pero su gran agresión suele estar menos equilibrada. El coach confía menos en lecturas exactas, apuesta por valor más fino y farolea menos.`,
diffHard:` Dificultad IA: los rivales difíciles entienden mejor la posición y son más equilibrados. Su agresión incluye más faroles, así que el coach da menos crédito automático a c-bets y presión desde posición tardía.`,
cashDeepNote:bb=>` Con ${bb} BB en cash, las odds implícitas importan: parejas y conectores suited juegan mejor que su ranking; puedes ampliar robos en posición — pero las ciegas no suben: juega por valor y no hinches botes fuera de posición sin equity.`,
cashDeepIp:bb=>` En posición con ${bb} BB, abre más ancho y apuesta tras checks — stacks profundos permiten calls con manos medias; retírate igual ante subidas grandes con basura.`,
sprDeep:s=>` SPR ~${s} (profundo) — las odds implícitas importan: sets y proyectos pueden ganar botes grandes; un par solo rara vez basta para apilar.`,
sprMid:s=>` SPR ~${s} (medio) — top pair+ puede ir all-in bajo presión; los proyectos necesitan odds correctas; no hinches botes fuera de posición.`,
sprLow:s=>` SPR ~${s} (bajo) — territorio de compromiso: un par o mejor suele tener que meter el dinero; no flotes ancho esperando mejorar.`,
chartBb3bet:(c,v)=>`${c} está en la tabla de defensa BB (${v}) — 3-bet por valor o como bluff bloqueador contra este steal.`,
chartBbCall:(c,v,e,o)=>`${c} está en el rango de call BB vs ${v} — defiende lo bastante ancho para que los steals no sean gratis. Tu equity (${e}) cubre el precio (${o}).`,
chartBbFold:(c,v)=>`${c} está fuera de la tabla BB vs ${v} — retírate y ahorra; pagar basura desde BB es una fuga clásica en cash.`,
widenNote:(b,e,d)=>` Las ciegas crecientes y el dinero muerto cambian el cálculo: tu rango de apertura normal (~${b}%) se ajusta a ~${e}%${d===1?' — y los jugadores por hablar se retiran demasiado: atácalos':d===-1?' — moderado, porque los que quedan defienden mucho: roba menos contra ellos':''}.`,
tableSizeNote:(n,b,e)=>` Solo quedan ${n} jugadores, así que los rangos preflop ya no son de mesa completa: el rango base de este asiento pasa de aprox. ${b}% a aprox. ${e}% antes de los demás ajustes en vivo.`,
stackDomNote:(r,c,n)=>` Tienes ~${r}× el stack más grande y cubres a ${c} de ${n} rivales en juego — los stacks cortos se retiran más: el coach amplía un poco los rangos de robo/iso. Pagar manos marginales sigue siendo fuga; sube o retírate.`,
stackDomIso:(c,p,r)=>`${c} no está en la tabla ${p} estándar, pero con ~${r}× el mayor stack puedes iso-subir como presión — los cortos no pueden devolverte la apuesta fácilmente. Sube, no pagues.`,
stackDomCall:(c,r,e,o)=>`${c} es una defensa de tabla y eres claro chip leader (~${r}× el siguiente stack). La simulación bruta está cerca (${e} vs precio ${o}) y el call es pequeño frente a tu stack, así que continúa en vez de foldear demasiado ante presión de short stacks.`,
stackDomFoldHint:` Tu ventaja de stack hace posible un iso, pero esta mano sigue siendo demasiado débil incluso para eso. Retírate — la paciencia conserva tu ventaja.`,
icmNote:(x,left,paid)=>` 💰 Valor del torneo: se paga${paid>1?'n':''} ${paid} puesto${paid>1?'s':''} y quedan ${left} jugador${left>1?'es':''}. Las fichas arriesgadas valen más que las ganadas, así que esta igualada necesita ~${x}% extra además del cálculo normal del bote.`,
lineCbet:` Su apuesta en el flop es una "apuesta de continuación" rutinaria — quien subió antes del flop vuelve a apostar en casi cualquier flop, bueno o malo. Dice muy poco, así que su rango apenas se estrecha.`,
lineBarrel:n=>` Ya ha apostado ${n===3?'TRES calles seguidas (flop, turn y river)':'dos calles seguidas'} — la mayoría no sigue disparando así sin una mano real. Su rango se lee mucho más estrecho.`,
lineDonk:` Apostó CONTRA quien subió antes del flop (un "donk bet") — una jugada rara: suele ser un monstruo disimulado o un farol salvaje. Por seguridad, se lee como fuerza.`,
lineCR:` Primero pasó y luego subió (un "check-raise") — la trampa clásica. Se lee como un rango muy fuerte.`,
lineCC:(n,len)=>`${n} ha pasado ${len} calles seguidas sin apostar — su rango está muy capado (parejas medias, manos débiles, renuncias). Una apuesta suele llevarse el bote.`,
lineCCRock:(n,len)=>`${n} (🪨 Cerrado) pasó ${len} calles — los rocks rara vez hacen slowplay dos veces; suele ser una pareja o menos.`,
lineCCManiac:(n,len)=>`${n} (🔥 Salvaje) pasó ${len} calles — tell fuerte: los maníacos apuestan con fuerza, así que líneas pasivas suelen ser air o float débil.`,
lineCCShark:(n,len)=>`${n} (🦈 Agresivo) pasó ${len} calles — los sharks pueden tender trampas; respeta el check-raise, pero muchas líneas siguen siendo manos medias capadas.`,
lineCCStation:(n,len)=>`${n} (📞 Pasivo) pasó ${len} calles — a menudo una pareja media que pagará, pero rara vez dos parejas o mejor.`,
lineTablePassive:n=>`${n} rivales tienen líneas pasivas en varias calles — la mesa parece débil. Apuestas de valor finas y faroles suelen funcionar.`,
lessonFold:(rec,eq,need)=>`El coach dice ${rec}: ~${eq} tras descuentos vs ${need} necesario — retirarse es +EV.`,
lessonFoldAir:(eq,need)=>`El coach se retira: cartas altas / sin mano real (~${eq} vs ${need} necesario) — pagar es una fuga clásica.`,
lessonCall:(rec,you,eq,need)=>`El coach dice ${rec} (~${eq} vs ${need} necesario) — elegiste ${you}.`,
lessonRaise:(rec,you)=>`El coach dice ${rec} — elegiste ${you}; subir arriesga más sin mano premium.`,
bucketMWCheck:n=>` Multiway (${n} rivales): check a ti — rangos limitados; apuesta fina o farol, pero respeta check-raises.`,
bucketMWCbet:n=>` Multiway (${n} rivales) frente a c-bet — defiende más tight que HU; un caller suele tener algo.`,
bucketMWWet:n=>` Multiway (${n} rivales) en board húmedo — escaleras y colores vivos para alguien; no apilar con una pareja.`,
bucketMWDry:n=>` Multiway (${n} rivales) en board seco — los faroles funcionan más, pero varios jugadores = alguien con pareja.`,
bucketMWFace:n=>` Multiway (${n} rivales) frente a apuesta — continúa solo con mano fuerte o proyecto con odds claras.`,
bucketMWIP:n=>` Multiway (${n} rivales) y hablas último (IP) — más faroles y apuestas finas; respeta subidas.`,
bucketMWOOP:n=>` Multiway (${n} rivales) y hablas primero (OOP) — pasa más manos marginales; apostar suele recibir call.`,
bucketMWPaired:n=>` Multiway (${n} rivales) en board emparejado — tríos/full son posibles; una pareja a menudo no basta.`,
bucketMWFlushDraw:n=>` Multiway (${n} rivales) con posible proyecto de color — un jugador puede estar buscando completar el color.`,
bucketMWBigPot:p=>` Bote multiway grande (~${p} BB) — los errores cuestan; continúa solo con equity clara.`,
bucketMWSqueeze:n=>` Multiway (${n} rivales) frente a squeeze — rangos fuertes; retira marginales salvo odds excelentes.`,
pairedBoardBetCall:(callers,opps,pair,kicker,over)=>`Un rival apostó y ${callers} rival${callers>1?'es':''} pagó${callers>1?'ron':''} en este bote de ${opps+1} jugadores. Tus dobles parejas mostradas son solo ${pair} junto con la pareja de la mesa y kicker ${kicker}${over?`, con ${over} rango${over>1?'s':''} superior${over>1?'es':''} en la mesa`:''}; los redraws aparentes todavía pueden completar un full perdedor. Este bluff-catcher marginal debe retirarse.`,
briefSpot:(eq,need,call,pot,pos,ip,opps)=>` 📋 Spot: ~${eq} equity${need!=='—'?` vs ${need} necesario`:''}${call!=='—'?` · precio ${call} → ${pot}`:''} · ${pos} (${ip}) · ${opps} rival${opps>1?'es':''}.`,
briefAir:` Sin mano hecha real — equity muy descontada vs apuestas.`,
briefVillain:(name,style,line)=>` vs ${name} (${style}) en línea ${line}.`,
dirtyOutPairs:c=>` Outs sucios (${c}): emparejan el board — ayuda a todos, no solo a ti.`,
dirtyOutFlush:c=>` Outs sucios (${c}): 4ª carta a color en el board — a menudo le da el color ganador al rival.`,
profRock:` El apostador es del tipo 🪨 Cerrado — estos jugadores casi nunca farolean fuerte. Respeta esta apuesta: sin una mano fuerte, retirarse suele ser lo correcto.`,
profManiac:` El apostador es del tipo 🔥 Salvaje — su rango contiene más faroles, así que las manos medias ganan valor. Ese rango más amplio ya está incluido en la equity estimada; paga más ligero solo si el precio y la realización de equity aún lo permiten.`,
profStation:` El apostador es del tipo 📞 Pasivo — lo paga todo pero casi nunca apuesta fuerte sin mano real. Su agresión repentina merece respeto.`,
blockerAce:` Tienes un As — un "blocker": como uno de los cuatro ases está en TU mano, es menos probable que él tenga las grandes manos con as (pareja de ases, top pair con as). Eso mejora un poco la llamada.`,
blockerFlush:` Tienes el as del palo del color — aunque tú no tengas color, esa carta significa que ÉL no puede tener el mejor color posible. Y un farol-subida tuyo resulta muy creíble.`,
suitedConn:` Manos así (del mismo palo y conectadas) juegan mejor que su ranking bruto — hacen escaleras y colores escondidos que ganan botes grandes con stacks profundos. El coach se abre un poco con ellas.`,
scFlatMulti:(c,n)=>`${c} es una mano especulativa suited/conectada, no una mano que quiera inflar el bote contra ${n} limper${n>1?'s':''}/caller${n>1?'s':''}. Toma el precio barato y busca un proyecto fuerte o una mano escondida; si fallas el flop, suelta fácil.`,
scFoldEarly:c=>`${c} es una mano especulativa suited/conectada, pero demasiados jugadores aún pueden despertar detrás. Sin posición tardía ni dinero muerto claro que atacar, no fuerces una subida grande — retírate y espera un spot más limpio.`,
drawMwCheck:n=>`Esto es sobre todo un proyecto en un bote multiway (${n} rivales). El semi-bluff funciona mejor heads-up o contra rangos limitados; con varios jugadores dentro, toma la carta gratis en vez de inflar un bote que quizá no ganes.`,
mixTitle:'🎭 Varía tu juego (opcional)',
mixCall:'Las matemáticas dicen pagar — pero de vez en cuando, subir aquí mantiene a los rivales atentos adivinando. Si siempre juegas la misma mano igual, te leerán como un libro. Algo peor para esta mano exacta, pero rentable a lo largo de la sesión.',
mixCheck:'Pasar es la jugada sólida — pero de vez en cuando, mete una apuesta pequeña aquí. Los rivales que aprenden que tu check siempre es debilidad te pasarán por encima. Una apuesta sorpresa ocasional los mantiene honestos.',
mixTrap:'Subir es la jugada rentable — pero con una mano tan fuerte puedes a veces solo pagar y tender una trampa. Si siempre subes tus monstruos, los jugadores observadores se retiran y ganas menos. Un slow-play ocasional esconde tu fuerza.',
coachErr:'Coach no disponible este turno.'}};
function C(k,...a){
  const d=CPROSE[lang]||CPROSE.en;
  const f=d[k]!==undefined?d[k]:CPROSE.en[k];
  return typeof f==='function'?f(...a):f;
}

/* ===== preflop chart (169 starting hands in strength order) ===== */
const CODE_R={2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'T',11:'J',12:'Q',13:'K',14:'A'};
const HAND_ORDER=['AA','KK','QQ','JJ','TT','AKs','99','AQs','AKo','AJs','KQs','88','ATs','AQo','KJs','QJs','KTs','77','AJo','A9s','JTs','QTs','KQo','A8s','K9s','ATo','A7s','A5s','66','J9s','T9s','A4s','Q9s','A6s','KJo','A3s','QJo','98s','55','A2s','K8s','JTo','T8s','K7s','Q8s','87s','KTo','44','J8s','A9o','97s','K6s','QTo','76s','K5s','86s','33','T7s','65s','K4s','A8o','J7s','22','96s','54s','75s','Q7s','K3s','K2s','Q6s','85s','64s','T9o','J9o','A7o','Q5s','95s','53s','J6s','T6s','A5o','74s','Q4s','J5s','K9o','A6o','43s','63s','84s','Q3s','A4o','T5s','J4s','94s','Q2s','98o','A3o','73s','J3s','T4s','52s','87o','Q9o','J2s','T8o','A2o','62s','93s','42s','T3s','83s','K8o','J8o','T2s','92s','32s','76o','97o','K7o','65o','82s','72s','K6o','86o','54o','Q8o','K5o','75o','96o','K4o','64o','Q7o','53o','85o','T7o','K3o','Q6o','43o','K2o','74o','Q5o','J7o','63o','Q4o','95o','52o','Q3o','84o','T6o','42o','Q2o','J6o','73o','32o','J5o','94o','62o','J4o','93o','T5o','J3o','83o','T4o','J2o','92o','T3o','82o','T2o','72o'];
const handPct={};
(function(){let cum=0;for(const h of HAND_ORDER){cum+=h.length===2?6:(h[2]==='s'?4:12);handPct[h]=cum/1326;}})();
function holeCode(hole){
  const a=hole[0],b=hole[1];
  const hi=a.r>=b.r?a:b, lo=a.r>=b.r?b:a;
  if(a.r===b.r) return CODE_R[a.r]+CODE_R[b.r];
  return CODE_R[hi.r]+CODE_R[lo.r]+(a.s===b.s?'s':'o');
}
/* GTO-style thresholds (fraction of all hands) */
const OPEN_THR ={EP:0.12,MP:0.16,HJ:0.21,CO:0.27,BTN:0.42,SB:0.36,BB:0.10};
const PUSH_THR ={EP:0.13,MP:0.16,HJ:0.20,CO:0.25,BTN:0.33,SB:0.42,BB:0.35};
function posBucket(pos){
  if(/^UTG/.test(pos))return 'EP';
  if(/^MP/.test(pos))return 'MP';
  if(pos==='HJ')return 'HJ';
  if(pos==='CO')return 'CO';
  if(pos==='BB')return 'BB';
  if(pos==='SB')return 'SB';
  return 'BTN'; // BTN and heads-up SB/BTN
}
function effectiveStackBB(p){
  const villains=alive().filter(q=>q!==p&&!q.out);
  if(!villains.length)return (p.chips+p.bet)/Math.max(state.bb,1);
  const hero=p.chips+p.bet;
  const eff=Math.min(hero,...villains.map(q=>q.chips+q.bet));
  return eff/Math.max(state.bb,1);
}
function headsUpStackBoost(p){
  const live=alive();
  if(live.length!==2)return 0;
  const opp=live.find(q=>q!==p);
  if(!opp)return 0;
  const hero=p.chips+p.bet, villain=opp.chips+opp.bet;
  const ratio=hero/Math.max(villain,1);
  if(ratio>=3)return 0.10;
  if(ratio>=2)return 0.07;
  if(ratio>=1.4)return 0.04;
  if(ratio<=0.5)return 0.04;
  return 0;
}
function headsUpShoveThreshold(pos,effBB,callAmt){
  const sbBtn=/^(SB\/BTN|BTN|SB)$/.test(pos||'');
  const facing=callAmt>0;
  let base;
  if(sbBtn){
    /* Approximate HU push/fold coverage. Keep the displayed percentage tied to
       the actual chart boundary: at five blinds 95o is a marginal shove, not
       evidence that virtually every starting hand should be pushed. */
    base=effBB<=2?0.96:effBB<=3?0.92:effBB<=4?0.86:effBB<=5?0.79:
      effBB<=7?0.68:effBB<=9?0.56:effBB<=12?0.43:effBB<=15?0.32:effBB<=20?0.22:0;
  }else{
    base=effBB<=5?0.78:effBB<=7?0.66:effBB<=9?0.56:effBB<=12?0.44:effBB<=15?0.33:effBB<=20?0.24:0;
  }
  if(facing&&!sbBtn)base*=0.92;
  return clamp(base,0,0.96);
}
function headsUpOpenThreshold(pos,effBB){
  if(effBB<=12)return 0;
  if(/^(SB\/BTN|BTN|SB)$/.test(pos||''))return effBB<=15?0.72:0.82;
  return effBB<=15?0.32:0.42;
}
function handsThroughPct(thr){
  return HAND_ORDER.filter(h=>(handPct[h]||1)<=thr);
}
function tableSizeOpenFactor(pos,n){
  const late=/(BTN|CO|HJ|SB\/BTN|SB)/.test(pos);
  const early=/^(UTG|MP)/.test(pos);
  if(n<=2) return late?1.65:1.30;
  if(n===3) return late?1.38:1.80;
  /* Seat labels remain UTG/MP as a table shrinks, but their strategic meaning
     moves later: 4-handed UTG is effectively CO, and 5-handed UTG is HJ.
     Widen early-seat ranges accordingly instead of reusing full-ring UTG. */
  if(n===4) return early?2.15:1.24;
  if(n===5) return early?1.75:1.14;
  if(n===6) return early?1.30:1.06;
  return 1;
}
function tableSizeOpenCap(n){
  if(n<=2) return 0.82;
  if(n===3) return 0.72;
  if(n===4) return 0.68;
  if(n===5) return 0.65;
  return 0.62;
}
function tableSizeFacingFactor(n,pos){
  const late=/(BTN|CO|HJ|SB\/BTN|SB|BB)/.test(pos);
  if(n<=2) return late?1.45:1.25;
  if(n===3) return late?1.25:1.12;
  if(n===4) return late?1.14:1.08;
  if(n===5) return 1.06;
  if(n===6) return late?1.04:1.02;
  return 1;
}
const RANGE_DISTRIBUTION_CACHE=new WeakMap();
function rangeDistribution(o,hole,board){
  const cap=typeof o==='number'?o:o.cap;
  const floor=Math.min(typeof o==='number'?0:(o.floor||0),cap*0.5);
  const model=typeof o==='number'?null:o.model;
  const cacheKey=hole.concat(board).map(c=>c.r*4+c.s).sort((a,b)=>a-b).join(',');
  const weights=model&&Array.isArray(model.weights)?model.weights:null;
  if(weights){
    const cached=RANGE_DISTRIBUTION_CACHE.get(weights);
    if(cached&&cached.key===cacheKey)return cached.value;
  }
  const dead=new Set(hole.concat(board).map(c=>c.r*4+c.s));
  const out=[];let total=0;
  for(let i=0;i<FULL_DECK.length;i++)for(let j=i+1;j<FULL_DECK.length;j++){
    const a=FULL_DECK[i],b=FULL_DECK[j];
    if(dead.has(a.r*4+a.s)||dead.has(b.r*4+b.s))continue;
    let w=null;
    if(model&&typeof rangeModelPosteriorWeight==='function')w=rangeModelPosteriorWeight(model,[a,b]);
    if(w===null){
      const pct=handPct[holeCode([a,b])]||1;
      w=pct<=cap&&pct>floor?1:0;
    }
    if(w<=0)continue;
    total+=w;out.push({a,b,ai:a.r*4+a.s,bi:b.r*4+b.s,w,cdf:total});
  }
  if(total<=0)return [];
  for(const x of out)x.cdf/=total;
  if(weights)RANGE_DISTRIBUTION_CACHE.set(weights,{key:cacheKey,value:out});
  return out;
}
function sampleRangeDistribution(dist,used){
  if(!dist.length)return null;
  for(let tries=0;tries<64;tries++){
    const x=Math.random();let lo=0,hi=dist.length-1;
    while(lo<hi){const mid=(lo+hi)>>1;if(dist[mid].cdf<x)lo=mid+1;else hi=mid;}
    const pick=dist[lo];
    if(!used.has(pick.ai)&&!used.has(pick.bi))return pick;
  }
  /* Exact compatible fallback for extremely blocker-heavy multiway samples. */
  let total=0;const compatible=[];
  for(const x of dist)if(!used.has(x.ai)&&!used.has(x.bi)){total+=x.w;compatible.push({x,total});}
  if(!compatible.length)return null;
  const r=Math.random()*total;let lo=0,hi=compatible.length-1;
  while(lo<hi){const mid=(lo+hi)>>1;if(compatible[mid].total<r)lo=mid+1;else hi=mid;}
  return compatible[lo].x;
}
/* Equity vs explicit weighted ranges. Distributions are built once, then sampled proportionally;
   multiway samples are conditioned on card removal so two villains can never share a blocker. */
function mcEquityR(hole,board,caps,sims){
  const deadBase=new Set();
  for(const c of hole.concat(board))deadBase.add(c.r*4+c.s);
  const distributions=caps.map(o=>rangeDistribution(o,hole,board));
  let win=0;
  for(let t=0;t<sims;t++){
    const used=new Set(deadBase);
    const oppH=[];
    for(const dist of distributions){
      const pick=sampleRangeDistribution(dist,used);
      if(!pick)continue;
      oppH.push([pick.a,pick.b]);used.add(pick.ai);used.add(pick.bi);
    }
    const pool=FULL_DECK.filter(c=>!used.has(c.r*4+c.s));
    const need=5-board.length;
    for(let k=0;k<need;k++){const idx=k+Math.floor(Math.random()*(pool.length-k));const tmp=pool[k];pool[k]=pool[idx];pool[idx]=tmp;}
    const fullBoard=board.concat(pool.slice(0,need));
    const my=evalSeven(hole.concat(fullBoard));
    let res=1;
    for(const oh of oppH){
      const os=evalSeven(oh.concat(fullBoard));
      const c=cmpScore(my,os);
      if(c<0){res=0;break;}
      if(c===0)res=Math.min(res,0.5);
    }
    win+=res;
  }
  return win/sims;
}

function straightRankSet(cards){
  const ranks=new Set(cards.map(c=>c.r));
  if(ranks.has(14))ranks.add(1);
  return ranks;
}
function straightWindows(hole,board){
  const ranks=straightRankSet(hole.concat(board)),boardRanks=straightRankSet(board),windows=[];
  for(let lo=1;lo<=10;lo++){
    const seq=[];for(let r=lo;r<lo+5;r++)seq.push(r);
    const present=seq.filter(r=>ranks.has(r)),missing=seq.filter(r=>!ranks.has(r));
    const boardPresent=seq.filter(r=>boardRanks.has(r)).length;
    if(present.length>=3&&boardPresent<present.length)
      windows.push({lo,seq,present,missing});
  }
  return windows;
}
function straightBackdoorChance(hole,board){
  if(board.length!==3)return 0;
  const canonical=r=>r===1?14:r,pairs=new Set();
  for(const w of straightWindows(hole,board)){
    if(w.missing.length!==2)continue;
    const pair=w.missing.map(canonical).sort((a,b)=>a-b);
    if(pair[0]!==pair[1])pairs.add(pair.join('-'));
  }
  const unknown=52-hole.length-board.length,total=unknown*(unknown-1)/2;
  /* Every absent rank has four available suits. Deduplicate rank pairs shared by
     overlapping straight windows before converting them to exact card runouts. */
  return total?pairs.size*16/total:0;
}
/* Exact one-card and runner-runner straight classification, using at least one hole card. */
function straightDrawAnalysis(hole,board){
  const made=evalBest(hole.concat(board));
  if(made[0]===4||made[0]===8)return {type:'made',outRanks:[],backdoorChance:0};
  const candidates=straightWindows(hole,board).filter(w=>w.missing.length===1);
  const canonical=r=>r===1?14:r;
  const outRanks=[...new Set(candidates.map(w=>canonical(w.missing[0])))].sort((a,b)=>a-b);
  let openEnded=false;
  for(let i=0;i<candidates.length&&!openEnded;i++)for(let j=i+1;j<candidates.length;j++){
    const a=new Set(candidates[i].present),shared=candidates[j].present.filter(r=>a.has(r));
    const sorted=[...new Set(shared)].sort((x,y)=>x-y);
    if(sorted.length===4&&sorted.every((r,k)=>k===0||r===sorted[k-1]+1))openEnded=true;
  }
  const type=openEnded?'oesd':outRanks.length>=2?'doubleGutshot':outRanks.length===1?'gutshot':'none';
  const backdoorChance=type==='none'&&board.length===3?straightBackdoorChance(hole,board):0;
  return {type,outRanks,backdoorChance};
}
/* detect draws that use at least one hole card */
function detectDraws(hole,board){
  const made=evalBest(hole.concat(board));
  if(made[0]>=5)return {flush:false,oesd:false,doubleGutshot:false,gutshot:false,
    backdoorStraight:false,backdoorStraightChance:0,straightType:'made',straightOutRanks:[]};
  const straight=straightDrawAnalysis(hole,board);
  const out={flush:false,oesd:straight.type==='oesd',doubleGutshot:straight.type==='doubleGutshot',
    gutshot:straight.type==='gutshot'||straight.type==='doubleGutshot',
    backdoorStraight:straight.backdoorChance>0,backdoorStraightChance:straight.backdoorChance,
    straightType:straight.type,straightOutRanks:straight.outRanks};
  const cards=hole.concat(board);
  const suitCount=[0,0,0,0];
  for(const c of cards) suitCount[c.s]++;
  for(let s=0;s<4;s++)
    if(suitCount[s]===4 && (hole[0].s===s||hole[1].s===s)) out.flush=true;
  return out;
}
function findDrawOuts(hole,board){
  const known=new Set(hole.concat(board).map(c=>c.r*4+c.s));
  const made=evalBest(hole.concat(board));
  const flush=[], straight=[];
  const makesStraight=cards=>{
    const ranks=new Set(cards.map(c=>c.r));
    if(ranks.has(14))ranks.add(1);
    for(let lo=1;lo<=10;lo++){
      let complete=true;
      for(let r=lo;r<lo+5;r++)if(!ranks.has(r)){complete=false;break;}
      if(complete)return true;
    }
    return false;
  };
  for(const c of FULL_DECK){
    if(known.has(c.r*4+c.s))continue;
    const all=hole.concat(board).concat([c]);
    const sc=evalBest(all);
    if(made[0]<5&&sc[0]>=5&&(hole[0].s===c.s||hole[1].s===c.s)) flush.push(c);
    if(made[0]<4&&makesStraight(all)) straight.push(c);
  }
  const sort=(a,b)=>a.r-b.r||a.s-b.s;
  flush.sort(sort); straight.sort(sort);
  return {flush,straight};
}
function formatOutList(cards){
  const seen=new Set(), out=[];
  for(const c of cards){
    const k=c.r*4+c.s;
    if(seen.has(k))continue;
    seen.add(k);
    out.push(`${RANK_CH[c.r]}${SUIT_CH[c.s]}`);
  }
  return out.join(' · ');
}
function compareScores(a,b){
  for(let i=0;i<Math.max(a.length,b.length);i++){
    const d=(a[i]||0)-(b[i]||0);
    if(d)return d;
  }
  return 0;
}
function boardOnlyScore(board){
  return board.length>=5?evalBest(board):null;
}
function canOpponentMakeHigherStraight(hole,board,card,heroScore){
  if(heroScore[0]!==4)return false;
  const known=new Set(hole.concat(board,[card]).map(c=>c.r*4+c.s));
  const deck=FULL_DECK.filter(c=>!known.has(c.r*4+c.s));
  for(let i=0;i<deck.length;i++)for(let j=i+1;j<deck.length;j++){
    const sc=evalBest(board.concat([card,deck[i],deck[j]]));
    if(sc[0]===4&&compareScores(sc,heroScore)>0)return true;
  }
  return false;
}
/* Structural out analysis complements raw straight/flush detection. It describes
   what an improving card really does instead of treating every nominal out as 1. */
function advancedOutAnalysis(hole,board,drawInfo){
  const known=new Set(hole.concat(board).map(c=>c.r*4+c.s));
  const current=evalBest(hole.concat(board)),cards=[],overcards=[],pairImprove=[];
  const fullHouse=[],quads=[],counterfeit=[],chop=[],dominatedStraight=[];
  const maxBoard=Math.max(...board.map(c=>c.r));
  const holeCounts={};for(const c of hole)holeCounts[c.r]=(holeCounts[c.r]||0)+1;
  const boardCounts={};for(const c of board)boardCounts[c.r]=(boardCounts[c.r]||0)+1;
  const madeUsesHole=handUsesHoleCards(hole,board,current);
  const privateOverRanks=[...new Set(hole.filter(c=>c.r>maxBoard&&!boardCounts[c.r]).map(c=>c.r))];
  for(const c of FULL_DECK){
    const key=c.r*4+c.s;if(known.has(key))continue;
    const nextBoard=board.concat(c),next=evalBest(hole.concat(nextBoard));
    const improves=compareScores(next,current)>0;
    if(privateOverRanks.includes(c.r)&&next[0]>=1)overcards.push(c);
    /* With one pair, the familiar five private improvement outs are the two
       remaining cards of the paired rank plus the three mates of the kicker.
       Pairing an unrelated board rank is a shared-board change, not a clean
       private two-pair out. */
    if(improves&&current[0]===1&&madeUsesHole&&holeCounts[c.r])pairImprove.push(c);
    if(improves&&next[0]===6)fullHouse.push(c);
    if(improves&&next[0]>=7)quads.push(c);
    if(improves&&next[0]===4&&canOpponentMakeHigherStraight(hole,board,c,next))
      dominatedStraight.push(c);
    const boardScore=boardOnlyScore(nextBoard);
    if(boardScore&&compareScores(boardScore,next)===0){
      chop.push(c);
      if(improves)counterfeit.push(c);
    }else if(current[0]===2&&boardCounts[c.r]&&next[0]===2){
      /* A board pair can erase the lower half of two pair without changing the
         category shown by a conventional evaluator. */
      counterfeit.push(c);
    }
    if(improves)cards.push(c);
  }
  const boardDraw=detectBoardOnlyDraws(board);
  const backdoor=runnerRunnerPairAnalysis(hole,board);
  const pairPlusDraw=current[0]>=1&&madeUsesHole&&
    !!(drawInfo?.draw.flush||drawInfo?.draw.oesd||drawInfo?.draw.doubleGutshot||drawInfo?.draw.gutshot);
  const redraw=current[0]>=2&&(fullHouse.length||quads.length||
    drawInfo?.draw.flush||drawInfo?.draw.oesd||drawInfo?.draw.doubleGutshot||drawInfo?.draw.gutshot);
  const nonNutFlush=!!(drawInfo?.draw.flush&&drawInfo.higherFlushThreats>0);
  const classifications=new Map();
  for(const c of drawInfo?.unique||[])classifications.set(c.r*4+c.s,{card:c,kind:'clean',weight:1});
  const mark=(list,kind,weight)=>{for(const c of list){
    const k=c.r*4+c.s,old=classifications.get(k);
    if(!old||weight<old.weight)classifications.set(k,{card:c,kind,weight});
  }};
  mark(drawInfo?.dirty?.map(x=>x.card)||[],'dirty',.25);
  mark(overcards,'overcard',.65);
  mark(pairImprove,'pairImprove',.85);
  mark(fullHouse,'fullHouse',1);
  mark(quads,'quads',1);
  mark(dominatedStraight,'dominated',.55);
  mark(chop,'chop',.5);
  if(nonNutFlush)mark(drawInfo.flush,'nonNut',.75);
  const weightedOuts=[...classifications.values()].reduce((s,x)=>s+x.weight,0);
  return {current,cards,overcards,pairImprove,fullHouse,quads,counterfeit,chop,
    dominatedStraight,boardDraw,backdoor,pairPlusDraw,redraw,nonNutFlush,
    nutFlushDraw:!!(drawInfo?.draw.flush&&!nonNutFlush),weightedOuts,
    rawOuts:classifications.size,classifications:[...classifications.values()]};
}
function rangeOutShowdownWeight(hole,board,card,oppCaps){
  if(!hole||!board||!card||!oppCaps?.length)return 1;
  const nextBoard=board.concat(card),heroScore=evalBest(hole.concat(nextBoard));
  let winAll=1,measured=0;
  for(const range of oppCaps){
    const dist=rangeDistribution(range,hole,nextBoard);
    let total=0,share=0;
    for(const combo of dist){
      const cmp=compareScores(heroScore,evalBest([combo.a,combo.b].concat(nextBoard)));
      total+=combo.w;
      if(cmp>0)share+=combo.w;
      else if(cmp===0)share+=combo.w*.5;
    }
    if(total>0){winAll*=clamp(share/total,0,1);measured++;}
  }
  return measured?clamp(winAll,0,1):1;
}
function applyRangeOutWeights(a,oppCaps,hole,board){
  if(!a||!a.classifications.length)return a;
  const strongest=oppCaps?.length?Math.min(...oppCaps.map(o=>o.cap||1)):1;
  const pressure=clamp((.45-strongest)/.42,0,1);
  let total=0;
  for(const x of a.classifications){
    let w=x.weight;
    /* Pairing an overcard is far less likely to win against a tight, strength-
       showing range. Then test every apparent out against each opponent's
       actual range so a losing full house is not presented as a clean out. */
    if(x.kind==='overcard')w*=1-.42*pressure;
    else if(x.kind==='pairImprove')w*=1-.20*pressure;
    else if(x.kind==='dominated'||x.kind==='nonNut')w*=1-.18*pressure;
    const showdownWeight=rangeOutShowdownWeight(hole,board,x.card,oppCaps);
    w*=showdownWeight;
    x.showdownWeight=showdownWeight;
    x.rangeWeight=clamp(w,0,1);total+=x.rangeWeight;
  }
  a.weightedOuts=total;
  a.rangePressure=pressure;
  return a;
}
function detectBoardOnlyDraws(board){
  if(board.length<3)return {flush:false,straight:false};
  const suits=[0,0,0,0];for(const c of board)suits[c.s]++;
  const ranks=straightRankSet(board);
  let straight=false;
  for(let lo=1;lo<=10;lo++){
    let n=0;for(let r=lo;r<lo+5;r++)if(ranks.has(r))n++;
    if(n>=4){straight=true;break;}
  }
  return {flush:Math.max(...suits)>=4,straight};
}
function runnerRunnerPairAnalysis(hole,board){
  if(board.length!==3)return {twoPairChance:0,tripsChance:0};
  const knownRanks={};for(const c of hole.concat(board))knownRanks[c.r]=(knownRanks[c.r]||0)+1;
  const unknown=47,total=unknown*(unknown-1)/2;
  const distinct=[...new Set(hole.map(c=>c.r))];
  let twoPairCombos=0,tripsCombos=0;
  if(distinct.length===2&&!board.some(c=>distinct.includes(c.r))){
    twoPairCombos=(4-knownRanks[distinct[0]])*(4-knownRanks[distinct[1]]);
    for(const r of distinct){const n=4-knownRanks[r];tripsCombos+=n*(n-1)/2;}
  }
  return {twoPairChance:twoPairCombos/total,tripsChance:tripsCombos/total};
}
function advancedOutNotes(a){
  const lang=(typeof cfg!=='undefined'&&cfg.lang)||'en',notes=[];
  const n=(en,fr,es)=>lang==='fr'?fr:lang==='es'?es:en;
  if(a.pairPlusDraw)notes.push(n(
    'This is a pair + draw, not a bare draw: you already have showdown value as well as ways to improve.',
    'C’est une paire + tirage, pas un tirage nu : vous avez déjà de la valeur au showdown et des améliorations possibles.',
    'Es pareja + proyecto, no un proyecto desnudo: ya tienes valor al showdown y formas de mejorar.'));
  if(a.redraw)notes.push(n(
    'You already have a made hand and redraws to an even stronger hand.',
    'Vous avez déjà une main faite avec des redraws vers une main encore plus forte.',
    'Ya tienes una mano hecha y redraws hacia una mano aún más fuerte.'));
  if(a.nutFlushDraw)notes.push(n(
    'Nut flush draw: when the flush arrives, no higher flush is possible from a single opponent card.',
    'Tirage couleur max : quand la couleur rentre, aucune carte adverse seule ne peut faire une couleur supérieure.',
    'Proyecto de color máximo: si entra, ninguna carta rival por sí sola puede formar un color superior.'));
  if(a.nonNutFlush)notes.push(n(
    'Non-nut flush draw: some flush cards can still leave you behind a higher flush. Reverse implied odds apply.',
    'Tirage couleur non max : certaines couleurs rentrées peuvent rester dominées. Attention aux cotes implicites inversées.',
    'Proyecto de color no máximo: algunos colores completados aún pueden perder contra uno superior.'));
  if(a.dominatedStraight.length)notes.push(n(
    `${a.dominatedStraight.length} straight out(s) are partial: they make your straight, but a higher straight remains possible.`,
    `${a.dominatedStraight.length} out(s) de quinte sont partiels : ils font votre quinte, mais une quinte supérieure reste possible.`,
    `${a.dominatedStraight.length} out(s) de escalera son parciales: completan tu escalera, pero sigue siendo posible una superior.`));
  if(a.counterfeit.length)notes.push(n(
    `${a.counterfeit.length} card(s) can counterfeit your apparent improvement by making the board play.`,
    `${a.counterfeit.length} carte(s) peuvent contrefaire l’amélioration affichée en faisant jouer le board.`,
    `${a.counterfeit.length} carta(s) pueden falsificar la mejora aparente haciendo que juegue la mesa.`));
  if(a.chop.length)notes.push(n(
    `${a.chop.length} card(s) mainly create a board-only hand or chop; they count as half-outs, not full wins.`,
    `${a.chop.length} carte(s) créent surtout une main commune au board ou un partage ; elles comptent comme demi-outs.`,
    `${a.chop.length} carta(s) crean sobre todo una mano de mesa o empate; cuentan como medios outs.`));
  if(a.boardDraw.flush||a.boardDraw.straight)notes.push(n(
    `The ${a.boardDraw.flush&&a.boardDraw.straight?'flush and straight threats are':'draw is'} on the board itself, so every player can use it; it is not a private draw.`,
    `La menace de ${a.boardDraw.flush&&a.boardDraw.straight?'couleur et de quinte est':'tirage est'} sur le board lui-même : tout le monde peut l’utiliser, ce n’est pas un tirage privé.`,
    `La amenaza de ${a.boardDraw.flush&&a.boardDraw.straight?'color y escalera está':'proyecto está'} en la mesa: todos pueden usarla, no es un proyecto privado.`));
  if(a.backdoor.twoPairChance||a.backdoor.tripsChance)notes.push(n(
    `Runner-runner only: two pair ≈${pct(a.backdoor.twoPairChance)}, trips ≈${pct(a.backdoor.tripsChance)}. These are backdoors, not normal outs.`,
    `Runner-runner seulement : deux paires ≈${pct(a.backdoor.twoPairChance)}, brelan ≈${pct(a.backdoor.tripsChance)}. Ce sont des backdoors, pas des outs normaux.`,
    `Solo runner-runner: dobles parejas ≈${pct(a.backdoor.twoPairChance)}, trío ≈${pct(a.backdoor.tripsChance)}. Son backdoors, no outs normales.`));
  return notes;
}
function dirtyOutReason(hole,board,card){
  const br=board.map(c=>c.r), brCnt={};
  for(const r of br) brCnt[r]=(brCnt[r]||0)+1;
  if(brCnt[card.r]>=2){
    const sc=evalBest(hole.concat(board).concat([card]));
    if(sc[0]<3) return 'pairs';
  }
  const bs=[0,0,0,0]; for(const c of board) bs[c.s]++;
  const flushSuit=bs.findIndex(v=>v>=3);
  if(flushSuit>=0&&card.s===flushSuit){
    const sc=evalBest(hole.concat(board).concat([card]));
    if(sc[0]<5) return 'flush';
  }
  return null;
}
function splitCleanDirtyOuts(hole,board,cards){
  const clean=[], dirty=[], seen=new Set();
  for(const c of cards){
    const k=c.r*4+c.s; if(seen.has(k))continue; seen.add(k);
    const why=dirtyOutReason(hole,board,c);
    if(why) dirty.push({card:c,why}); else clean.push(c);
  }
  return {clean,dirty};
}
function drawHitChance(outCount,unknownCount,streets){
  const n=clamp(outCount,0,unknownCount),u=Math.max(1,unknownCount);
  if(!n)return 0;
  if(streets<=1||u<=1)return n/u;
  return 1-((u-n)/u)*((u-n-1)/Math.max(1,u-1));
}
function coachDrawOutInfo(hole,board,draw=null){
  const d=draw||detectDraws(hole,board),outs=findDrawOuts(hole,board);
  const flush=d.flush?outs.flush:[],straight=d.oesd||d.gutshot
    ?outs.straight.filter(c=>!d.straightOutRanks?.length||d.straightOutRanks.includes(c.r)):[];
  const flushKeys=new Set(flush.map(c=>c.r*4+c.s));
  const overlap=straight.filter(c=>flushKeys.has(c.r*4+c.s));
  const unique=[],seen=new Set();
  for(const c of flush.concat(straight)){
    const k=c.r*4+c.s;if(seen.has(k))continue;seen.add(k);unique.push(c);
  }
  const split=splitCleanDirtyOuts(hole,board,unique);
  const unknown=52-hole.length-board.length,streets=board.length===3?2:1;
  const suitCounts=[0,0,0,0];for(const c of hole.concat(board))suitCounts[c.s]++;
  const flushSuit=suitCounts.findIndex((n,s)=>n===4&&hole.some(c=>c.s===s));
  let higherFlushThreats=0;
  if(d.flush&&flushSuit>=0){
    const heroHigh=Math.max(...hole.filter(c=>c.s===flushSuit).map(c=>c.r));
    const known=new Set(hole.concat(board).map(c=>c.r*4+c.s));
    higherFlushThreats=FULL_DECK.filter(c=>c.s===flushSuit&&c.r>heroHigh&&!known.has(c.r*4+c.s)).length;
  }
  const info={draw:d,flush,straight,overlap,unique,clean:split.clean,dirty:split.dirty,
    unknown,streets,flushChance:drawHitChance(flush.length,unknown,streets),
    straightChance:drawHitChance(straight.length,unknown,streets),
    uniqueHitChance:drawHitChance(unique.length,unknown,streets),
    cleanHitChance:drawHitChance(split.clean.length,unknown,streets),
    higherFlushThreats};
  info.advanced=advancedOutAnalysis(hole,board,info);
  return info;
}
/* Conservative postflop implied-odds estimate. It never assumes the full stack
   will be paid: visibility of the draw, position, line, profile and non-nut risk
   determine a capped future payment, which is then converted into EV credit. */
function coachPostflopImpliedOdds(p,callAmt,pot,drawInfo,actsFirst,actsLast,icmPrem){
  if(state.stage==='river'||callAmt<=0||!drawInfo||!drawInfo.clean.length)return null;
  const villains=inHand().filter(q=>q!==p&&!q.allIn);
  const heroBehind=Math.max(0,p.chips-callAmt);
  if(!villains.length||heroBehind<=0)return null;
  const maxFuture=villains.reduce((sum,q)=>sum+Math.min(heroBehind,Math.max(0,q.chips)),0);
  if(maxFuture<=0)return null;
  const agg=state.lastAggIdx>=0&&state.lastAggIdx!==p.i?state.players[state.lastAggIdx]:villains[0];
  let payRate=.42;
  payRate*=actsLast ? .86 : actsFirst ? .62 : .74;
  if(drawInfo.draw.flush&&(drawInfo.draw.oesd||drawInfo.draw.doubleGutshot))payRate*=.68;
  else if(drawInfo.draw.flush)payRate*=.72;
  else if(drawInfo.draw.oesd||drawInfo.draw.doubleGutshot)payRate*=.86;
  else payRate*=.74;
  const sid=agg?.style?.id;
  payRate*=sid==='station' ? 1.12 : sid==='maniac' ? 1.04 : sid==='rock' ? .78 : .95;
  if(/^(barrel2|barrel3|donk|checkraise)$/.test(agg?.lineRead||''))payRate*=1.12;
  else if(agg?.lineRead==='cbet')payRate*=.88;
  if(villains.length>1)payRate*=Math.pow(.82,villains.length-1);
  if(drawInfo.higherFlushThreats>0)payRate*=clamp(1-drawInfo.higherFlushThreats*.12,.58,.92);
  payRate*=1-clamp(icmPrem*3,0,.35);
  payRate=clamp(payRate,.08,.62);
  const uncappedFuture=maxFuture*payRate;
  const finalPot=Math.max(1,pot+callAmt);
  const weightedHitChance=drawInfo.rangeWeightedHitChance??drawInfo.cleanHitChance;
  const maxCreditFuture=weightedHitChance>0
    ?finalPot*.06/weightedHitChance
    :0;
  const futureChips=Math.min(uncappedFuture,maxCreditFuture);
  const equityCredit=clamp(weightedHitChance*futureChips/finalPot,0,.06);
  return {
    maxFuture,futureChips,payRate,equityCredit,hitChance:weightedHitChance,
    immediateNeed:callAmt/finalPot,
    realisticNeed:callAmt/(finalPot+futureChips),
    bestCaseNeed:callAmt/(finalPot+maxFuture),
    reverseRisk:drawInfo.higherFlushThreats>0||drawInfo.dirty.length>0
  };
}
function classifyLeakSpot(callAmt,opps){
  const st=state.stage;
  if(st==='preflop') return state.currentBet<=state.bb?'pf_open':'pf_face_raise';
  if(st==='river'&&callAmt>0) return 'river_call';
  if(opps>=2){
    if(callAmt>0){
      const agg=state.lastAggIdx>=0?state.players[state.lastAggIdx]:null;
      if(agg&&(agg.lineRead==='cbet'||(st==='flop'&&state.pfAggIdx===agg.i))) return 'cbet_def';
    }
    return 'multiway';
  }
  if(callAmt>0){
    const agg=state.lastAggIdx>=0?state.players[state.lastAggIdx]:null;
    if(agg&&(agg.lineRead==='cbet'||(st==='flop'&&state.pfAggIdx===agg.i))) return 'cbet_def';
  }
  return 'other';
}
function preflopLimpers(p){
  if(state.stage!=='preflop'||state.currentBet>state.bb)return [];
  /* voluntary limps only — BB posting the blind is not a limp */
  return inHand().filter(q=>q!==p&&q.bet>=state.bb&&(q.pos||'')!=='BB');
}
function limperCount(p){
  return preflopLimpers(p).length;
}
function flatCallerCount(p){
  if(state.stage!=='preflop'||state.currentBet<=state.bb)return 0;
  const raiserIdx=state.lastAggIdx;
  return inHand().filter(q=>q!==p&&q.i!==raiserIdx&&q.bet>=state.currentBet).length;
}
function defaultPreflopOpenBB(limpers=0,inPosition=false,hasAntes=false){
  const count=Math.max(0,Math.floor(Number(limpers)||0));
  const base=inPosition?3:4;
  return base+count+(inPosition&&hasAntes&&!count?1:0);
}
function preflopSizingInPosition(p,opponents=[]){
  const relevant=(opponents||[]).filter(q=>q&&q!==p&&!q.out&&!q.folded);
  if(!relevant.length)return !/^(SB|BB)$/.test(p.pos||'');
  const ord=postflopOrder(),heroIdx=ord.indexOf(p);
  if(heroIdx<0)return false;
  return relevant.every(q=>{
    const idx=ord.indexOf(q);
    return idx>=0&&heroIdx>idx;
  });
}
function coachFourBetSizing(p,actsLast){
  const raiser=state.lastAggIdx>=0&&state.lastAggIdx!==p.i?state.players[state.lastAggIdx]:null;
  const heroTotal=p.bet+p.chips;
  const villainTotal=raiser?raiser.bet+raiser.chips:heroTotal;
  const effective=Math.max(state.currentBet,Math.min(heroTotal,villainTotal));
  const mult=actsLast?2.15:2.3;
  const minTarget=state.currentBet+state.lastRaiseSize;
  const target=Math.max(minTarget,state.currentBet*mult);
  return {
    kind:'fourBet',
    target,
    mult,
    effective,
    /* Once a normal 4-bet invests this much, leaving a small tail is worse than jamming value. */
    jam:target>=effective*0.40||effective-target<state.bb*20
  };
}
function coachPreflopRaiseSizing(p,actsLast){
  const facingRaise=state.currentBet>state.bb;
  /* A player can face a 3-bet cold (for example BTN opens, SB 3-bets and the
     hero is still in the BB). Their own contribution is then only one blind,
     so p.bet cannot tell us which raise level the action has reached. */
  if(facingRaise&&(state.preflopRaiseCount||0)>=2) return coachFourBetSizing(p,actsLast);
  const unit=facingRaise?state.currentBet:state.bb;
  const limpers=facingRaise?[]:preflopLimpers(p);
  const callers=facingRaise?flatCallerCount(p):limpers.length;
  const stackBB=(p.chips+p.bet)/state.bb;
  const anteBB=state.ante*alive().length/Math.max(state.bb,1);
  const raiser=state.lastAggIdx>=0&&state.lastAggIdx!==p.i?state.players[state.lastAggIdx]:null;
  const involved=facingRaise?inHand().filter(q=>q!==p&&(q===raiser||q.bet>=state.currentBet)):limpers;
  const sizingIP=preflopSizingInPosition(p,involved);
  const posKey=sizingIP?'IP':'OOP';
  if(!facingRaise){
    let mult=defaultPreflopOpenBB(callers,sizingIP,!callers&&anteBB>0),anteAdj=0,depthAdj=0,effectiveBB=stackBB;
    if(callers){
      const deepestLimper=Math.max(...limpers.map(q=>q.chips+q.bet));
      effectiveBB=Math.min(p.chips+p.bet,deepestLimper)/Math.max(state.bb,1);
      if(anteBB>=1)anteAdj=0.5;
      else if(anteBB>0)anteAdj=0.25;
      if(effectiveBB>=120)depthAdj=0.5;
      else if(effectiveBB>=80)depthAdj=0.25;
      mult+=anteAdj+depthAdj;
    }else if(sizingIP&&anteBB>0){
      anteAdj=1;
    }
    return {kind:callers?'iso':'open',target:state.bb*mult,mult,posKey,callers,
      anteAdj:anteAdj>0,depthAdj,effectiveBB};
  }
  const mult=(sizingIP?3:4)+callers;
  return {
    kind:'threeBet',
    target:unit*mult,
    mult,
    posKey,
    callers,
    anteAdj:false,
    depthAdj:0,
    effectiveBB:stackBB
  };
}
function coachFourBetPlan(p,raiser,actsLast,code,icmPrem){
  const sizing=coachFourBetSizing(p,actsLast);
  const effectiveBB=sizing.effective/Math.max(state.bb,1);
  const threeBetBB=state.currentBet/Math.max(state.bb,1);
  const tight=!!(raiser&&((raiser.style&&raiser.style.id==='rock')||(raiser.rangeCap||1)<=0.10));
  const wide=!!(raiser&&raiser.style&&/^(shark|maniac)$/.test(raiser.style.id));
  const large=state.currentBet>=sizing.effective*0.22||threeBetBB>=16;
  const lateOpen=/^(HJ|CO|BTN|SB|SB\/BTN)$/.test(p.pos||'');
  const value=tight&&large?['AA','KK']:['AA','KK','QQ','AKs','AKo'];
  const calls=tight&&large?['QQ','JJ','AKs','AKo']
    :(tight||large)?['JJ','TT','AQs','AKo']:['JJ','TT','99','AQs','AJs','KQs','AQo'];
  const canBluff=wide&&!large&&lateOpen&&effectiveBB>=75&&icmPrem<0.02;
  const bluffs=canBluff?['A5s','A4s']:[];
  return {sizing,effectiveBB,threeBetBB,tight,large,value,calls,bluffs,
    valueHit:value.includes(code),callHit:calls.includes(code),bluffHit:bluffs.includes(code)};
}
function coachPostflopRaiseSizing(p,pot,callAmt){
  const potBeforeBet=Math.max(pot-callAmt,state.bb);
  const betRatio=callAmt/potBeforeBet;
  const mult=clamp(2.4/Math.max(betRatio,0.12),2.5,20);
  return {
    target:callAmt*mult,
    mult,
    betRatio
  };
}
function coachPostflopOpenSizing(pot,smallStab,madeScore,drawInfo){
  const texture=boardTexture(state.board);
  const strong=!!(madeScore&&madeScore[0]>=2);
  const strongDraw=!!(drawInfo&&(drawInfo.flush?.length>=8||drawInfo.straight?.length>=8));
  let ratio;
  if(smallStab)ratio=texture.dry ? .33 : .42;
  else if(texture.wet&&(strong||strongDraw))ratio=.72;
  else if(texture.dry)ratio=.38;
  else ratio=.58;
  return {target:pot*ratio,ratio,texture:texture.dry?'dry':texture.wet?'wet':'neutral'};
}
/* Return the chips already contestable only by players who still have chips.
   This is distinct from a dry side pot: when two active players contributed
   above the largest all-in cap, folding one of them wins real chips even though
   the all-in player remains eligible for the main pot. */
function coachExistingSidePot(p){
  const contenders=inHand();
  const allIns=contenders.filter(q=>q!==p&&q.allIn);
  const active=contenders.filter(q=>!q.allIn);
  if(!allIns.length||active.length<2)return {amount:0,activeOpponents:Math.max(0,active.length-1)};
  const cap=Math.max(...allIns.map(q=>q.totalBet||0));
  const sideLevel=Math.min(...active.map(q=>q.totalBet||0));
  if(sideLevel<=cap)return {amount:0,activeOpponents:active.length-1,cap};
  const amount=state.players.reduce((sum,q)=>sum+Math.max(0,Math.min(q.totalBet||0,sideLevel)-cap),0);
  return {amount,activeOpponents:active.length-1,cap};
}
function boardTexture(board){
  if(!board.length) return {paired:false,monotone:false,wet:false,flushDraw:false,dry:true};
  const bs=[0,0,0,0]; for(const c of board)bs[c.s]++;
  const br=board.map(c=>c.r).sort((a,b)=>a-b);
  const paired=br.some((r,i,a)=>i&&a[i-1]===r);
  const monotone=Math.max(...bs)>=3;
  const twoTone=bs.filter(v=>v>=2).length>=1&&Math.max(...bs)<3;
  const connected=br.length>=3&&br[br.length-1]-br[0]<=4;
  const wet=paired||monotone||twoTone||connected;
  return {paired,monotone,wet,flushDraw:monotone||twoTone,dry:!wet};
}
function coachTopPairDomination(hole,board,score){
  if(!score||score[0]!==1||board.length<3)return null;
  const top=Math.max(...board.map(c=>c.r));
  if(score[1]!==top)return null;
  const pairCard=hole.find(c=>c.r===top),kicker=hole.find(c=>c!==pairCard);
  if(!pairCard||!kicker||kicker.r>=13)return null;
  const higher=[];
  for(let r=kicker.r+1;r<=14;r++)if(r!==top&&!board.some(c=>c.r===r))higher.push(r);
  return higher.length?{kicker:kicker.r,higher:higher.length}:null;
}
function coachMadeCounterfeit(hole,board,score){
  if(!score||score[0]!==2||board.length<3||board.length>=5)return null;
  const holeRanks=new Set(hole.map(c=>c.r));
  if(!holeRanks.has(score[1])||!holeRanks.has(score[2]))return null;
  const boardHigh=Math.max(...board.map(c=>c.r));
  if(boardHigh===score[1]||boardHigh===score[2])return null;
  const seen=hole.concat(board).filter(c=>c.r===boardHigh).length;
  return seen<4?{rank:boardHigh,remaining:4-seen}:null;
}
function coachRiverNutBlockerBluff(p,score,opps){
  if(state.stage!=='river'||opps!==1||!score||score[0]>=1)return null;
  const suits=[0,0,0,0];for(const c of state.board)suits[c.s]++;
  const suit=suits.findIndex(n=>n===3);
  if(suit<0||!p.hole.some(c=>c.r===14&&c.s===suit))return null;
  const villain=inHand().find(q=>q!==p);
  if(villain?.style?.id==='station')return null;
  const passive=!!(villain&&(villain.checkedStreet||passiveLineLen(villain.checkStreets)>=2));
  return passive?{suit}:null;
}
function coachBluffAssessment(p,ctx){
  const {rec,madeScore,drawInfo,eqAdj,callAmt,pot,opps,actsLast,concepts,
    smallStab,bluffBreakEven,baseFoldEquity,code,bettingLocked}=ctx;
  /* No opponent with chips means no fold equity and therefore no bluff
     decision. The main coach explanation already handles the call/fold math. */
  if(bettingLocked)return null;
  const aggressive=rec==='RAISE'||rec==='ALLIN';
  const postflop=state.stage!=='preflop';
  const made=madeScore?.[0]||0;
  const strongDraw=postflop&&state.stage!=='river'&&!!(drawInfo&&
    ((drawInfo.flush?.length||0)>=8||(drawInfo.straight?.length||0)>=8));
  const villains=inHand().filter(q=>q!==p);
  const station=villains.some(q=>q.style?.id==='station');
  const tight=villains.length>0&&villains.every(q=>q.style?.id==='rock');
  const passive=villains.length>0&&villains.every(q=>q.checkedStreet||passiveLineLen(q.checkStreets)>=2);
  const texture=postflop?boardTexture(state.board):null;
  const boardSuits=[0,0,0,0];if(postflop)for(const c of state.board)boardSuits[c.s]++;
  const nutSuit=boardSuits.findIndex(n=>n>=3);
  const blocker=concepts.includes('riverBlockerBluff')||
    (nutSuit>=0&&p.hole.some(c=>c.r===14&&c.s===nutSuit));
  let estimatedFolds=baseFoldEquity;
  if(passive)estimatedFolds+=.12;
  if(tight)estimatedFolds+=.06;
  if(station)estimatedFolds-=.18;
  if(actsLast)estimatedFolds+=.03;
  if(texture?.dry)estimatedFolds+=.04;
  if(opps>=2)estimatedFolds-=.05;
  if(blocker&&state.stage==='river')estimatedFolds+=.06;
  const difficulty=state.cfg?.difficulty||'medium';
  const learnStrength={easy:.25,medium:.65,hard:1}[difficulty]||.65;
  let historyAdjustment=0,historySample=0,historyWeight=0,learnedFoldRate=null;
  if(typeof rangeTendencyRead==='function'&&typeof rangeProfilePrior==='function'&&villains.length){
    let weightedDelta=0,weightedRate=0,totalWeight=0;
    for(const v of villains){
      const read=rangeTendencyRead(v),prior=rangeProfilePrior(v);
      const river=state.stage==='river'&&read.riverSample>0;
      const sample=river?read.riverSample:read.sample;
      const confidence=river?read.riverConfidence:read.confidence;
      const foldRate=river?read.riverFoldRate:read.foldRate;
      if(!sample||!Number.isFinite(foldRate))continue;
      const weight=Math.max(.05,confidence);
      weightedDelta+=(foldRate-prior.foldRate)*weight;
      weightedRate+=foldRate*weight;totalWeight+=weight;historySample+=sample;
    }
    if(totalWeight>0){
      historyWeight=clamp(totalWeight/villains.length,0,1)*learnStrength;
      historyAdjustment=clamp(weightedDelta/totalWeight*historyWeight,-.14,.14);
      learnedFoldRate=weightedRate/totalWeight;
      estimatedFolds+=historyAdjustment;
    }
  }
  estimatedFolds=clamp(estimatedFolds,.04,.72);

  let intent;
  if(aggressive&&postflop&&concepts.includes('riverBlockerBluff'))intent='bluff';
  else if(aggressive&&postflop&&strongDraw&&made<2)intent='semiBluff';
  else if(aggressive&&postflop&&smallStab&&made===0&&eqAdj<.50)intent='bluff';
  else if(aggressive&&postflop&&(made>=2||eqAdj>=.64))intent='value';
  else if(aggressive&&postflop&&made>=1)intent='protection';
  else if(aggressive&&state.stage==='preflop'&&['A5s','A4s'].includes(code))intent='rangeBluff';
  else if(aggressive)intent='rangeRaise';
  else if(rec==='CALL'&&postflop&&callAmt>0&&made>=1&&eqAdj<.62)intent='bluffCatch';
  else intent=rec.toLowerCase();

  const bluffing=intent==='bluff'||intent==='semiBluff'||intent==='rangeBluff';
  const reasons=[];
  if(passive)reasons.push('passive');
  if(blocker)reasons.push('blocker');
  if(strongDraw)reasons.push('draw');
  if(actsLast)reasons.push('position');
  if(texture?.dry)reasons.push('dry');
  if(station)reasons.push('station');
  if(opps>=2)reasons.push('multiway');
  if(historyAdjustment>=.02)reasons.push('historyFolds');
  else if(historyAdjustment<=-.02)reasons.push('historyCalls');
  if(callAmt>0&&!passive)reasons.push('strength');
  if(made>=1&&!bluffing)reasons.push('showdown');
  if(!reasons.length)reasons.push('range');
  const enoughFolds=bluffBreakEven!=null&&estimatedFolds>=bluffBreakEven;
  let verdict;
  if(intent==='value'||intent==='protection'||intent==='rangeRaise')verdict='notBluff';
  else if(intent==='bluff')verdict=enoughFolds?'goodBluff':'thinBluff';
  else if(intent==='semiBluff'||intent==='rangeBluff')verdict='semiBluff';
  else verdict='doNotBluff';
  const plan=intent==='bluff'?'giveUpIfCalled':intent==='semiBluff'?'continueGoodCards':
    intent==='value'||intent==='protection'?'continueForValue':
    intent==='bluffCatch'?'callNoRaise':rec==='CHECK'?'takeFreeCard':rec==='FOLD'?'preserveStack':'followAction';
  return {intent,verdict,reasons,plan,bluffing,requiredFolds:bluffBreakEven,
    estimatedFolds,equityWhenCalled:eqAdj,pot,callAmt,historyAdjustment,
    historySample,historyWeight,learnedFoldRate,difficulty};
}
function coachSpotBrief(p,extra,ctx){
  const {eq,eqAdj,odds,needEq,callAmt,pot,opps,pos,actsFirst,actsLast,airPen}=ctx;
  const eqShow=pct(eqAdj!=null?eqAdj:eq);
  const ip=actsLast?'IP':actsFirst?'OOP':'mid';
  const needed=needEq==null?odds:needEq;
  let line=C('briefSpot',eqShow,callAmt>0?pct(needed):'—',callAmt>0?usd(callAmt):'—',usd(pot),pos||'—',ip,opps);
  if(airPen>=0.1) line+=C('briefAir');
  const agg=state.lastAggIdx>=0&&state.lastAggIdx!==p.i?state.players[state.lastAggIdx]:null;
  if(agg&&callAmt>0&&state.stage!=='preflop'&&agg.lineRead)
    line+=C('briefVillain',agg.name,agg.style?profileLabel(agg.style):'—',agg.lineRead);
  extra.unshift(line);
}
function coachMultiwayBuckets(p,extra,opps,callAmt,actsFirst,actsLast){
  if(state.stage==='preflop'||opps<2)return;
  const tex=boardTexture(state.board);
  const agg=state.lastAggIdx>=0?state.players[state.lastAggIdx]:null;
  const cbet=agg&&(agg.lineRead==='cbet'||(state.stage==='flop'&&state.pfAggIdx===agg.i));
  const checkedToMe=callAmt===0&&inHand().filter(q=>q!==p&&!q.allIn).some(q=>q.checkedStreet);
  const potBB=state.players.reduce((s,q)=>s+q.totalBet,0)/state.bb;
  if(actsLast) extra.push(C('bucketMWIP',opps));
  else if(actsFirst) extra.push(C('bucketMWOOP',opps));
  if(tex.paired) extra.push(C('bucketMWPaired',opps));
  if(tex.flushDraw&&!tex.monotone) extra.push(C('bucketMWFlushDraw',opps));
  if(callAmt>0&&cbet) extra.push(C('bucketMWCbet',opps));
  else if(checkedToMe) extra.push(C('bucketMWCheck',opps));
  else if(tex.wet) extra.push(C('bucketMWWet',opps));
  else if(callAmt===0) extra.push(C('bucketMWDry',opps));
  else extra.push(C('bucketMWFace',opps));
  if(potBB>=8) extra.push(C('bucketMWBigPot',Math.round(potBB)));
  if(callAmt>0&&opps>=2&&agg&&state.pfAggIdx>=0&&agg.i!==state.pfAggIdx)
    extra.push(C('bucketMWSqueeze',opps));
}
function coachMicroLesson(R,action){
  if(!R||!R.rec)return'';
  const rec=R.rec, type=action;
  const recLbl={FOLD:T('recFOLD'),CHECK:T('recCHECK'),CALL:T('recCALL'),RAISE:T('recRAISETO').trim(),ALLIN:T('recALLIN')}[rec]||rec;
  const youLbl=type==='raise'?T('raiseW').toUpperCase():T(type).toUpperCase();
  const eqShow=pct(R.eqAdj!=null?R.eqAdj:R.eq);
  const need=pct(R.needEq??R.odds??0);
  if(rec==='FOLD'&&type==='fold')return'';
  if((rec==='CALL'||rec==='CHECK')&&type==='call')return'';
  if((rec==='RAISE'||rec==='ALLIN')&&type==='raise')return'';
  if(rec==='FOLD'||(rec==='CALL'&&type==='fold')||(rec==='CHECK'&&type==='fold')){
    if(R.airPen>=0.1) return C('lessonFoldAir',eqShow,need);
    return C('lessonFold',recLbl,eqShow,need);
  }
  if((rec==='RAISE'||rec==='ALLIN')&&type==='call') return C('lessonCall',recLbl,youLbl,eqShow,need);
  if(rec==='CALL'&&type==='raise') return C('lessonRaise',recLbl,youLbl);
  if(rec==='CHECK'&&type==='raise') return C('lessonRaise',recLbl,youLbl);
  return C('lessonCall',recLbl,youLbl,eqShow,need);
}
function classifyMade(hole,board,score){
  if(board.length===0||score[0]>2) return '';
  const boardRanks=board.map(c=>c.r);
  const boardMax=Math.max(...boardRanks);
  const cnt=r=>boardRanks.filter(x=>x===r).length;
  if(score[0]===2){
    if(hole.some(c=>c.r===score[1]||c.r===score[2])) return C('madeTwoPair',rankPl(score[1]),rankPl(score[2]));
    return C('madeBoardPair');
  }
  if(score[0]===1){
    const pr=score[1];
    if(cnt(pr)>=2) return C('madeBoardPair');
    if(hole[0].r===pr&&hole[1].r===pr) return pr>boardMax?C('madeOverpair'):C('madeUnderPair');
    if(pr===boardMax) return C('madeTopPair');
    if(pr<boardMax) return C('madeNotTop',rankNm(boardMax));
  }
  return '';
}
function underpairBackdoors(hole,board,draw){
  if(board.length!==3)return {flush:false,straight:false,frontdoor:false};
  const frontdoor=!!(draw&&(draw.flush||draw.oesd||draw.doubleGutshot));
  const flush=hole.some(h=>board.filter(c=>c.s===h.s).length===2);
  const ranks=new Set(hole.concat(board).map(c=>c.r));
  if(ranks.has(14))ranks.add(1);
  const pairRank=hole[0].r;
  let straight=false;
  for(let lo=1;lo<=10&&!straight;lo++){
    const window=[];for(let r=lo;r<lo+5;r++)window.push(r);
    const pairInWindow=window.includes(pairRank)||(pairRank===14&&window.includes(1));
    if(pairInWindow&&window.filter(r=>ranks.has(r)).length===3)straight=true;
  }
  return {flush,straight,frontdoor};
}
/* Raw all-the-way equity overstates the value of an underpair when future barrels can
   force it off the hand. Scale that realization loss by board coverage, sizing,
   position, remaining streets and how much of the effective stack this call commits;
   genuine/frontdoor and runner-runner draws soften it. */
function coachUnderpairRealization(hole,board,betRatio,actsFirst,draw,ctx={}){
  if(!hole||hole.length!==2||board.length<3||board.length>=5||hole[0].r!==hole[1].r)return null;
  const pairRank=hole[0].r,score=evalBest(hole.concat(board));
  if(score[0]!==1||score[1]!==pairRank)return null;
  const overRanks=[...new Set(board.map(c=>c.r).filter(r=>r>pairRank))];
  if(!overRanks.length)return null;
  const flop=board.length===3,bd=underpairBackdoors(hole,board,draw);
  let penalty=0.025+overRanks.length*0.012;
  penalty+=Math.min(Math.max(betRatio,0),1.25)*0.018;
  if(actsFirst)penalty+=0.012;
  const callAmt=Math.max(0,ctx.callAmt||0),stackBefore=Math.max(callAmt,ctx.stackBefore||0);
  const callFraction=stackBefore>0?callAmt/stackBefore:0;
  const potAfter=Math.max(1,(ctx.pot||0)+callAmt);
  const stackAfter=Math.max(0,stackBefore-callAmt);
  const sprAfter=stackBefore>0?stackAfter/potAfter:null;
  if(flop){
    /* A call that consumes a large part of the remaining stack does not buy a cheap
       showdown: it creates a tiny-SPR turn where another barrel is highly leveraged. */
    penalty+=clamp(callFraction-0.15,0,0.70)*0.075;
    if(sprAfter!==null&&sprAfter<1.5)penalty+=clamp(1.5-sprAfter,0,1.5)*0.018;
    if(overRanks.length>=2&&betRatio>=0.65)penalty+=0.010;
  }
  if(!flop)penalty*=0.58;
  if(bd.frontdoor)penalty*=0.25;
  else{
    if(draw&&draw.gutshot)penalty-=0.014;
    if(bd.flush)penalty-=0.008;
    if(bd.straight)penalty-=0.006;
  }
  penalty=clamp(penalty,0.01,0.14);
  return {penalty,overcards:overRanks.length,backdoors:bd.flush||bd.straight||bd.frontdoor,
    callFraction,sprAfter};
}
function coachBackdoorFlushInfo(hole,board){
  if(!hole||hole.length!==2||!board||board.length!==3||hole[0].s!==hole[1].s)return null;
  const suit=hole[0].s,boardSuitCount=board.filter(c=>c.s===suit).length;
  if(boardSuitCount!==1)return null;
  const unseen=13-3;
  return {suit,chance:(unseen/47)*((unseen-1)/46)};
}
/* A flush category alone is not enough to justify a value bet. On four-flush boards,
   compare the exact five-card tuple with every legal combo in each opponent posterior,
   then weight those combos by how often that profile would call or raise a 2/3-pot bet.
   This estimates the range that gives action, not merely the range dealt before betting. */
function coachFlushRelativeStrength(p,board,opponentRanges,pot,betRatio=0.66){
  if(!p||!p.hole||board.length<3)return null;
  const heroScore=evalBest(p.hole.concat(board));
  if(!heroScore||heroScore[0]!==5)return null;
  const suitCounts=[0,0,0,0];
  for(const c of p.hole.concat(board))suitCounts[c.s]++;
  const flushSuit=suitCounts.findIndex(n=>n>=5);
  if(flushSuit<0)return null;
  const boardSuitCount=board.filter(c=>c.s===flushSuit).length;
  const dead=new Set(p.hole.concat(board).map(c=>c.r*4+c.s));
  const higherRanks=[];
  if(boardSuitCount>=4){
    for(let r=2;r<=14;r++){
      const suited={r,s:flushSuit},id=r*4+flushSuit;
      if(dead.has(id))continue;
      const filler=FULL_DECK.find(c=>c.s!==flushSuit&&!dead.has(c.r*4+c.s));
      if(filler&&cmpScore(evalBest([suited,filler].concat(board)),heroScore)>0)higherRanks.push(r);
    }
  }
  const ord=postflopOrder(),heroOrd=ord.indexOf(p);
  const comboVector=typeof rangeComboInfoVector==='function'?rangeComboInfoVector():null;
  let combinedContinue=0,combinedAheadContinue=0,combinedTieContinue=0;
  let noBetterProbability=1;
  const villains=[];
  for(const range of opponentRanges||[]){
    const villain=range.villain;
    const dist=rangeDistribution(range,p.hole,board);
    let total=0,better=0,worse=0,tie=0,continued=0,aheadContinued=0,tieContinued=0;
    const villainOrd=villain?ord.indexOf(villain):-1;
    const ctx={
      stage:state.stage,callAmt:Math.round(Math.max(pot,1)*betRatio),
      facedBetRatio:betRatio,betRatio,activePlayers:(opponentRanges||[]).length+1,
      inPosition:villainOrd>=0&&heroOrd>=0?villainOrd>heroOrd:false,
      facedLine:'lead',spr:villain?Math.max(0,villain.chips)/(Math.max(pot,1)*(1+betRatio)):8,
      posterior:true,rangePriorPostChecks:(villain?.checkStreets||[]).length,
      _rangeStyle:villain&&typeof rangeModelStyle==='function'?rangeModelStyle(villain,true):undefined
    };
    for(const combo of dist){
      const hole=[combo.a,combo.b],score=evalBest(hole.concat(board));
      const cmp=cmpScore(score,heroScore);
      let continueWeight=cmp<0?0.18:cmp===0?0.55:0.90;
      if(villain&&typeof rangePostflopActionPolicy==='function'&&typeof rangeModelComboInfo==='function'){
        const comboInfo=comboVector&&typeof rangeComboIndex==='function'
          ?comboVector[rangeComboIndex(hole)]:rangeModelComboInfo(hole,board);
        const policy=rangePostflopActionPolicy(villain,villain.rangeModel||{},ctx,hole,comboInfo);
        continueWeight=clamp((policy.call||0)+(policy.raise||0),0,1);
      }
      total+=combo.w;
      if(cmp>0)better+=combo.w;
      else if(cmp<0)worse+=combo.w;
      else tie+=combo.w;
      const cw=combo.w*continueWeight;
      continued+=cw;
      if(cmp<0)aheadContinued+=cw;
      else if(cmp===0)tieContinued+=cw;
    }
    const betterShare=better/Math.max(total,1e-12);
    noBetterProbability*=1-betterShare;
    combinedContinue+=continued/Math.max(total,1e-12);
    combinedAheadContinue+=aheadContinued/Math.max(total,1e-12);
    combinedTieContinue+=tieContinued/Math.max(total,1e-12);
    villains.push({name:villain?.name||'',better:betterShare,worse:worse/Math.max(total,1e-12),
      tie:tie/Math.max(total,1e-12),continue:continued/Math.max(total,1e-12),
      aheadWhenContinued:(aheadContinued+tieContinued*0.5)/Math.max(continued,1e-12)});
  }
  const aheadWhenContinued=(combinedAheadContinue+combinedTieContinue*0.5)/Math.max(combinedContinue,1e-12);
  const anyBetter=1-noBetterProbability,opps=Math.max(1,(opponentRanges||[]).length);
  const requiredContinueShare=opps>=2?0.62:0.55;
  const caution=boardSuitCount>=4&&(
    aheadWhenContinued<requiredContinueShare||
    (higherRanks.length>=4&&anyBetter>=0.12)||
    (opps>=2&&higherRanks.length>=3&&anyBetter>=0.08)
  );
  return {heroScore,tuple:heroScore.slice(1,6).map(r=>RANK_CH[r]).join('-'),
    flushSuit,boardSuitCount,higherRanks,higherCount:higherRanks.length,
    anyBetter,aheadWhenContinued,requiredContinueShare,caution,villains};
}
function realTwoPairOrBetter(score,hole){
  if(!score)return false;
  if(score[0]>=3)return true;
  if(score[0]!==2)return false;
  const ranks=new Set(hole.map(c=>c.r));
  return (ranks.has(score[1])&&ranks.has(score[2]))||
    (hole[0].r===hole[1].r&&hole[0].r===score[1]);
}
function coachPairedBoardBetCallRisk(p,score,drawInfo,callAmt,opps){
  if(state.stage==='preflop'||callAmt<=0||opps<2||!score||score[0]!==2)return null;
  if(realTwoPairOrBetter(score,p.hole))return null;
  const boardCounts={};for(const card of state.board)boardCounts[card.r]=(boardCounts[card.r]||0)+1;
  const boardPairRank=[score[1],score[2]].find(rank=>(boardCounts[rank]||0)>=2);
  const privatePairRank=[score[1],score[2]].find(rank=>rank!==boardPairRank&&p.hole.some(card=>card.r===rank));
  if(!boardPairRank||!privatePairRank)return null;
  const strongDraw=!!(drawInfo?.draw&&(drawInfo.draw.flush||drawInfo.draw.oesd||drawInfo.draw.doubleGutshot));
  if(strongDraw)return null;
  const callers=inHand().filter(q=>q!==p&&q.i!==state.lastAggIdx&&q.acted&&
    q.bet>=state.currentBet).length;
  if(!callers)return null;
  const kicker=p.hole.find(card=>card.r!==privatePairRank)?.r||privatePairRank;
  const overcards=[...new Set(state.board.map(card=>card.r).filter(rank=>rank>privatePairRank))].length;
  let penalty=.045+.015*Math.max(0,opps-2)+.015*Math.max(0,callers-1);
  if(overcards)penalty+=.02;
  if(kicker<=9)penalty+=.01;
  if(state.stage==='turn')penalty+=.01;
  return {penalty:clamp(penalty,.04,.12),callers,opps,boardPairRank,privatePairRank,kicker,overcards};
}
function hasTopPairOrBetter(score,hole,board){
  if(!score||!board.length)return false;
  if(realTwoPairOrBetter(score,hole))return true;
  if(score[0]!==1)return false;
  const boardMax=Math.max(...board.map(c=>c.r));
  return score[1]===boardMax&&hole.some(c=>c.r===score[1]);
}
/* external GTO chart lookup (charts.js) — returns null when unavailable, callers fall back */
function chartFor(kind,key){
  try{
    if(typeof GTO_CHARTS==='undefined'||!GTO_CHARTS[kind])return null;
    return key!==undefined?(GTO_CHARTS[kind][key]||null):GTO_CHARTS[kind];
  }catch(e){return null;}
}
/* charts.js stores 9-max ranges, while the engine compresses the early-seat
   labels as players are eliminated (for example, 7-handed UTG has the same
   six players behind as 9-max MP). Resolve that strategic position before a
   chart lookup instead of treating every seat named UTG as full-ring UTG. */
function fullRingChartPosition(pos,tableSize){
  if(!pos||!Number.isFinite(tableSize))return pos;
  if(['HJ','CO','BTN','SB','BB'].includes(pos))return pos;
  let earlyIndex;
  if(pos==='UTG')earlyIndex=0;
  else if(pos==='UTG+1')earlyIndex=1;
  else if(pos==='MP')earlyIndex=2;
  else{
    const m=/^MP\+(\d+)$/.exec(pos);
    if(!m)return pos;
    earlyIndex=2+Number(m[1]);
  }
  const playersBehind=Math.max(0,tableSize-1-earlyIndex);
  return ({8:'UTG',7:'UTG+1',6:'MP',5:'MP+1',4:'HJ',3:'CO',2:'BTN',1:'SB',0:'BB'})[playersBehind]||pos;
}
/* pick shove ladder by effective stack depth (BB); 15 used for 11–15 BB reshove spots */
function shoveChartKey(stackBB){
  if(stackBB<=5) return '5';
  if(stackBB<=7) return '8';
  if(stackBB<=9) return '10';
  if(stackBB<=11) return '12';
  if(stackBB<=16) return '15';
  if(stackBB<=22) return '20';
  return '10';
}
/* per-raiser-position 3-bet/call matrix, falling back to EP/LP buckets.
   A compressed early-seat label must be resolved exactly as it is for RFI:
   at a 7-handed table, for example, UTG+1 has five players behind and is the
   strategic equivalent of 9-max MP+1, not full-ring UTG+1. */
function facingChartFor(raiser,tableSize){
  const rawPos=raiser&&raiser.pos;
  const rp=fullRingChartPosition(rawPos,tableSize);
  if(rp){
    const direct=chartFor('facing',rp);
    if(direct&&direct.raise&&direct.call) return {
      fc:direct,label:rp,rawLabel:rawPos,perPos:true,shifted:rp!==rawPos,tableSize
    };
  }
  const vsEarlyR=/^(UTG|MP)/.test(rp||rawPos||'');
  const key=vsEarlyR?'vsEarly':'vsLate';
  const fc=chartFor('facing',key);
  return fc&&fc.raise&&fc.call?{fc,label:key,rawLabel:rawPos,perPos:false,shifted:false,tableSize}:null;
}
/* BB defense vs CO/BTN/SB steals — wider than generic facing charts */
function bbDefendChartFor(raiser,heroPos){
  if(heroPos!=='BB'||!raiser)return null;
  const rp=raiser.pos||'';
  const key=/^CO$/.test(rp)?'vsCO':/^BTN$/.test(rp)?'vsBTN':/^SB$/.test(rp)?'vsSB':null;
  if(!key)return null;
  const fc=chartFor('bbDefend',key);
  return fc&&fc.raise&&fc.call?{fc,label:rp,key,bbDefend:true}:null;
}
/* Generic preflop call model. A static rank chart is only the prior: the exact
   open size, effective depth, postflop position and action still pending behind
   hero decide how much of raw all-in equity can actually be realized. */
function coachPreflopHandShape(hole){
  const a=hole[0],b=hole[1],pair=a.r===b.r,suited=a.s===b.s;
  const hi=Math.max(a.r,b.r),lo=Math.min(a.r,b.r),gap=pair?0:hi-lo-1;
  const connected=!pair&&gap===0,oneGap=!pair&&gap===1,broadway=lo>=10;
  const lowPair=pair&&hi<=9;
  const suitedRun=suited&&(connected||oneGap)&&hi<=12;
  const speculative=lowPair||suitedRun;
  let playability=(pair ? .48 : 0)+(suited ? .22 : 0)+(connected ? .20 : oneGap ? .11 : 0)+
    (broadway ? .18 : 0)+(hi===14 ? .08 : 0)-(gap>=4&&hi!==14 ? .12 : 0);
  playability=clamp(playability,.16,.98);
  let nutPotential=pair ? .48 : suited&&hi===14 ? .94 : suited&&broadway ? .82 :
    suitedRun ? clamp(.52+(hi-7)*.045,.46,.74) : broadway ? .58 : suited ? .42 : .28;
  if(pair&&hi>=10)nutPotential=.68;
  return {pair,suited,hi,lo,gap,connected,oneGap,broadway,lowPair,suitedRun,
    speculative,playability,nutPotential};
}
/* How well a hand keeps realizing value after callers enter the pot. Raw equity
   is still simulated against every committed player; this only models the
   postflop playability and implied-odds part that all-in equity cannot express. */
function coachPreflopMultiwayProfile(shape,callers,effBB,openBB,odds,position){
  let retention;
  if(shape.suited&&shape.hi===14)retention=.96;
  else if(shape.lowPair)retention=.88;
  else if(shape.suited&&shape.broadway)retention=.82;
  else if(shape.pair)retention=.76;
  else if(shape.suitedRun)retention=clamp(.66+(shape.hi-7)*.025,.64,.76);
  else if(shape.suited)retention=.50;
  else if(shape.broadway)retention=.25;
  else if(shape.connected||shape.oneGap)retention=.34;
  else retention=.18;

  const count=Math.max(0,callers);
  const callerRealizationCost=count*(.0015+.024*(1-retention));
  const reverseImpliedPenalty=count*.004*(1-retention);
  const cheapOpen=clamp((3.25-openBB)/.75,0,1);
  const goodPrice=clamp((.34-odds)/.14,0,1);
  const depth=clamp((effBB-35)/65,0,1);
  const positionalFactor=position>0?1:position<0?.58:.78;
  const impliedEligible=shape.lowPair||shape.suitedRun||(shape.suited&&shape.hi===14)||
    (shape.suited&&shape.broadway);
  const impliedCredit=impliedEligible&&count&&effBB>=45
    ?Math.min(.015,Math.min(count,3)*.005*retention*cheapOpen*goodPrice*
      (.55+.45*depth)*positionalFactor)
    :0;
  return {retention,callerRealizationCost,reverseImpliedPenalty,impliedCredit,
    impliedEligible,cheapOpen,goodPrice,depth};
}
function coachPreflopSqueezeRisk(q,raiser,openBB,callers,difficulty){
  const sid=q.style?.id||'neutral';
  const base={rock:.028,station:.024,shark:.088,maniac:.10,neutral:.055}[sid]||.055;
  let aggression=1;
  if(typeof rangeModelStyle==='function'){
    const learned=rangeModelStyle(q,true);
    aggression=clamp(learned?.raise||1,.72,1.45);
  }
  let risk=base*aggression;
  const openerPos=fullRingChartPosition(raiser?.pos||'',alive().length);
  if(/^(CO|BTN|SB|SB\/BTN)$/.test(openerPos))risk*=1.18;
  else if(/^(UTG|UTG\+1|MP|MP\+1)$/.test(openerPos))risk*=.76;
  if(/^(SB|BB)$/.test(q.pos||''))risk+=.012;
  risk+=Math.min(.035,Math.max(0,callers)*.014);
  const stackBB=(q.chips+q.bet)/Math.max(state.bb,1);
  if(stackBB<=24)risk*=1.10;
  if(openBB>3)risk*=clamp(1-(openBB-3)*.10,.58,1);
  if(difficulty==='hard')risk*=1.06;
  else if(difficulty==='easy')risk*=.88;
  return clamp(risk,.008,.22);
}
function coachShortAllInValueRange(shoveBB,icmPrem){
  /* Bluff 3-bets have no fold equity against the all-in player. Keep isolation
     raises value-heavy, and tighten again as the shove or tournament premium grows. */
  if(shoveBB<=4&&icmPrem<.04)return ['AA','KK','QQ','JJ','TT','AKs','AQs','AKo'];
  if(shoveBB<=8&&icmPrem<.04)return ['AA','KK','QQ','JJ','AKs','AQs','AKo'];
  return ['AA','KK','QQ','AKs','AKo'];
}
function coachPreflopCallModel(p,raiser,callAmt,pot,eq,odds,actsFirst,actsLast,icmPrem,diffCallPad,difficulty){
  const bb=Math.max(state.bb,1),shape=coachPreflopHandShape(p.hole);
  const strategicRaiserPos=fullRingChartPosition(raiser?.pos||'',alive().length);
  const heroTotal=p.chips+p.bet,villainTotal=raiser?raiser.chips+raiser.bet:heroTotal;
  const effBB=Math.min(heroTotal,villainTotal)/bb;
  const openBB=state.currentBet/bb;
  const position=actsLast?1:actsFirst?-1:0;
  const callers=inHand().filter(q=>q!==p&&q!==raiser&&(q.allIn||q.bet>=state.currentBet)).length;
  const behind=inHand().filter(q=>q!==p&&q!==raiser&&!q.allIn&&!q.acted&&q.bet<state.currentBet);
  let noSqueeze=1;
  const seatRisks=[];
  for(const q of behind){
    const risk=coachPreflopSqueezeRisk(q,raiser,openBB,callers,difficulty);
    seatRisks.push({player:q,risk});noSqueeze*=1-risk;
  }
  let squeezeRisk=clamp(1-noSqueeze,0,.55);
  const allInCall=callAmt>=p.chips;
  const mainPotLocked=!!raiser?.allIn;
  const lockedShowdown=!!(mainPotLocked&&!behind.length&&
    inHand().filter(q=>q!==p).every(q=>q.allIn));
  if(allInCall||lockedShowdown)squeezeRisk=0;
  const multiway=coachPreflopMultiwayProfile(shape,callers,effBB,openBB,odds,position);

  let realization=1;
  if(!allInCall&&!mainPotLocked){
    realization+=position>0 ? .03 : position<0 ? -.10 : -.045;
    if(shape.speculative){
      if(effBB<=22)realization-=.15;
      else if(effBB<=32)realization-=.10;
      else if(effBB<=45)realization-=.045;
      else if(effBB>=80)realization+=.02;
    }else if(effBB<=22&&(shape.broadway||shape.pair)){
      realization+=.015;
    }
    const sizeExcess=Math.max(0,openBB-2.5);
    realization-=Math.min(.20,sizeExcess*(.015+(shape.speculative ? .035 : .012)));
    const callFraction=callAmt/Math.max(Math.min(heroTotal,villainTotal),1);
    if(shape.speculative&&callFraction>.08)
      realization-=Math.min(.10,(callFraction-.08)*.65);
    realization-=multiway.callerRealizationCost;
    const villainStyle=typeof rangeModelStyle==='function'&&raiser?rangeModelStyle(raiser,true):null;
    const postAgg=villainStyle?.postAgg||.36;
    if(postAgg>.40&&shape.playability<.82)
      realization-=position>0 ? .008 : position<0 ? .032 : .018;
  }
  realization=clamp(realization,.62,1.06);

  let impliedCredit=0;
  if(!allInCall&&!mainPotLocked&&effBB>=45&&(shape.speculative||shape.nutPotential>=.78)){
    const deep=clamp((effBB-40)/80,0,1);
    impliedCredit=(.004+.014*deep)*(position>0 ? 1.25 : position<0 ? .55 : .82);
    if(raiser?.style?.id==='station')impliedCredit+=.003;
    if(openBB>3.5)impliedCredit*=.55;
  }
  if(!mainPotLocked)impliedCredit+=multiway.impliedCredit;
  let reversePenalty=multiway.reverseImpliedPenalty;
  if(shape.suited&&shape.hi<14)
    reversePenalty+=.0035+(1-shape.nutPotential)*.006;
  else if(!shape.suited&&shape.broadway&&shape.hi<14)
    reversePenalty+=.004;
  if(allInCall||mainPotLocked){impliedCredit=0;reversePenalty=0;realization=1;}

  const rawContinue=handPct[holeCode(p.hole)]||1;
  const continueVsSqueeze=rawContinue<=.055 ? .55 : rawContinue<=.10 ? .22 : rawContinue<=.16 ? .08 : .025;
  const squeezePremium=squeezeRisk>0
    ?clamp((squeezeRisk/Math.max(1-squeezeRisk,.45))*odds*(1-continueVsSqueeze),0,.14)
    :0;
  const realizedEq=clamp(eq*realization+impliedCredit-reversePenalty,0,.99);
  /* A tougher opponent may change the posterior, but cannot make the mathematical
     break-even price disappear. Only positive caution pads survive here. */
  let policy=null,strategyPremium=0;
  if(!mainPotLocked&&typeof rangePreflopActionPolicy==='function'){
    policy=rangePreflopActionPolicy(p,{
      stage:'preflop',callAmt,cbBefore:state.currentBet,playerBetBefore:p.bet,potBefore:pot,
      raisesBefore:1,preflopRaisesBefore:1,facedRaiseSize:state.lastRaiseSize||state.bb,
      lastAggPos:strategicRaiserPos,lastAggStyle:raiser?.style?.id||'',bb:state.bb,sb:state.sb,
      stackTotalBefore:heroTotal,effectiveStackBB:effBB,position:p.pos||'',
      icmPressure:clamp(icmPrem/.11,0,1),callersAtLevel:callers,limpersBefore:0,
      activePlayers:inHand().length
    },p.hole);
    const support=(policy.call||0)+(policy.raise||0);
    strategyPremium=clamp((.24-support)*.10,0,.025);
  }
  const requiredEq=clamp(odds+icmPrem+Math.max(0,diffCallPad)+squeezePremium+strategyPremium,0,.95);
  const callEv=(realizedEq-requiredEq)*(pot+callAmt);
  return {shape,effBB,openBB,position,callers,behindCount:behind.length,
    seatRisks:seatRisks.map(x=>({name:x.player.name,pos:x.player.pos||'',profile:x.player.style?.id||'neutral',risk:x.risk})),
    squeezeRisk,realization,impliedCredit,reversePenalty,squeezePremium,realizedEq,
    multiwayRetention:multiway.retention,callerRealizationCost:multiway.callerRealizationCost,
    multiwayImpliedCredit:multiway.impliedCredit,multiwayReversePenalty:multiway.reverseImpliedPenalty,
    strategyPremium,policy,requiredEq,callEv,profitable:callEv>=0,
    allInCall,mainPotLocked,lockedShowdown};
}
function coachSpr(p,callAmt,pot){
  const villains=inHand().filter(q=>q!==p);
  let eff=p.chips;
  for(const v of villains) eff=Math.min(eff,v.chips+v.bet);
  const potLine=pot+(callAmt>0?callAmt:0);
  return potLine>0?eff/potLine:99;
}

/* ===== ICM: tournament prize-money math (Malmuth-Harville) ===== */
const PAYOUTS=n=>n<=4?[1]:n<=6?[0.65,0.35]:[0.5,0.3,0.2];
function icmEq(stacks,pay){
  const n=stacks.length, T=stacks.reduce((a,b)=>a+(b>0?b:0),0)||1;
  const eq=new Array(n).fill(0);
  for(let i=0;i<n;i++){
    if(stacks[i]<=0)continue;
    eq[i]+=pay[0]*stacks[i]/T;
    if(!pay[1])continue;
    for(let j=0;j<n;j++){
      if(j===i||stacks[j]<=0)continue;
      const pj=stacks[j]/T;
      eq[i]+=pay[1]*pj*stacks[i]/(T-stacks[j]);
      if(!pay[2])continue;
      for(let k=0;k<n;k++){
        if(k===i||k===j||stacks[k]<=0)continue;
        eq[i]+=pay[2]*pj*(stacks[k]/(T-stacks[j]))*(stacks[i]/(T-stacks[j]-stacks[k]));
      }
    }
  }
  return eq;
}
/* how much EXTRA win-chance a call needs once prize money is at stake (0 when chips ≈ $) */
function icmPremium(p,callAmt,pot){
  try{
    if(callAmt<=0||!state)return 0;
    const pay=PAYOUTS(state.cfg.numPlayers);
    const live=alive();
    if(live.length<=1||pay.length<=1)return 0;
    const base=state.players.map(q=>q.out?0:Math.max(q.chips,0));
    const i=p.i;
    const W=base.slice(); W[i]+=pot;
    const L=base.slice(); L[i]=Math.max(0,L[i]-callAmt);
    const v=state.lastAggIdx>=0&&state.lastAggIdx!==i?state.lastAggIdx:-1;
    if(v>=0) L[v]+=pot;
    const eF=icmEq(base,pay)[i], eW=icmEq(W,pay)[i], eL=icmEq(L,pay)[i];
    if(eW-eL<1e-9)return 0;
    const need=(eF-eL)/(eW-eL);
    const chipNeed=callAmt/(pot+callAmt);
    const raw=clamp(need-chipNeed,0,0.25);
    const paid=pay.length;
    const distance=Math.max(0,live.length-paid);
    const bubbleFactor=distance<=1?1:distance<=paid?0.55:0.20;
    const riskFrac=callAmt/Math.max(p.chips+p.bet,1);
    const riskFactor=clamp(riskFrac/0.25,0.15,1);
    const heroStack=p.chips+p.bet;
    const oppStacks=live.filter(q=>q!==p).map(q=>q.chips+q.bet);
    const coverFactor=oppStacks.length&&oppStacks.every(s=>heroStack>s)?0.55:1;
    return clamp(raw*bubbleFactor*riskFactor*coverFactor,0,0.25);
  }catch(e){return 0;}
}
function icmDecisionContext(p,callAmt,pot,premium){
  if(isCashGame()||callAmt<=0||premium<.005)return null;
  const live=alive();
  const pay=PAYOUTS(state.cfg.numPlayers);
  if(live.length<=2||pay.length<=1)return null;
  const stacks=live.map(q=>({p:q,total:q.chips+q.bet})).sort((a,b)=>b.total-a.total);
  const rank=stacks.findIndex(x=>x.p===p)+1;
  const aggressor=state.lastAggIdx>=0?state.players[state.lastAggIdx]:null;
  const heroTotal=p.chips+p.bet;
  const villainTotal=aggressor&&!aggressor.out?aggressor.chips+aggressor.bet:0;
  return {
    players:live.length,paid:Math.min(pay.length,live.length),rank,
    riskPct:callAmt/Math.max(heroTotal,1),
    covered:!!aggressor&&villainTotal>=heroTotal,
    covers:!!aggressor&&heroTotal>villainTotal,
    chipNeed:callAmt/Math.max(pot+callAmt,1),
    icmNeed:clamp(callAmt/Math.max(pot+callAmt,1)+premium,0,.95),
    premium
  };
}

/* postflop acting order (SB first): who talks before/after the hero */
function postflopOrder(){
  const n=state.players.length, ord=[];
  for(let k=1;k<=n;k++){
    const q=state.players[(state.dealerIdx+k)%n];
    if(!q.out&&!q.folded) ord.push(q);
  }
  return ord;
}
/* consecutive passive streets (flop→turn, turn→river, or all three) */
function passiveLineLen(checkStreets){
  if(!checkStreets||!checkStreets.length)return 0;
  const s=new Set(checkStreets);
  if(s.has('flop')&&s.has('turn')&&s.has('river'))return 3;
  if(s.has('flop')&&s.has('turn'))return 2;
  if(s.has('turn')&&s.has('river'))return 2;
  return 0;
}
function checkedDownVillains(p){
  if(state.stage==='preflop')return [];
  const needed=['preflop','flop'];
  if(state.stage==='turn'||state.stage==='river') needed.push('turn');
  if(state.stage==='river') needed.push('river');
  return inHand().filter(q=>{
    if(q===p||q.allIn)return false;
    const s=new Set(q.checkStreets||[]);
    return needed.every(st=>s.has(st));
  });
}
function passiveStreetVillains(p,minLen=2){
  if(state.stage==='preflop')return [];
  return inHand().filter(q=>q!==p&&!q.allIn&&passiveLineLen(q.checkStreets)>=minLen);
}
function coachPassiveLines(p,extra){
  if(state.stage==='preflop')return;
  const villains=inHand().filter(q=>q!==p&&!q.allIn);
  let tablePassive=0;
  for(const q of villains){
    const len=passiveLineLen(q.checkStreets);
    if(len<2)continue;
    tablePassive++;
    const sid=q.style?.id;
    const k=sid==='rock'?'lineCCRock':sid==='maniac'?'lineCCManiac':sid==='shark'?'lineCCShark':sid==='station'?'lineCCStation':'lineCC';
    extra.push(C(k,q.name,len));
  }
  if(tablePassive>=2)extra.push(C('lineTablePassive',tablePassive));
}
/* stack vs table: widen steals/isos when hero covers most opponents by a large margin */
function stackDominance(p){
  const hero=p.chips+p.bet;
  const oppStacks=inHand().filter(q=>q!==p).map(q=>q.chips+q.bet);
  if(!oppStacks.length) return {factor:1,ratio:1,avgRatio:1,covers:0,coverPct:0,iso:false,tier:0,oppN:0};
  const maxOpp=Math.max(...oppStacks);
  const avg=oppStacks.reduce((s,x)=>s+x,0)/oppStacks.length;
  const ratio=hero/Math.max(maxOpp,1);
  const avgRatio=hero/Math.max(avg,1);
  const covers=oppStacks.filter(s=>hero>s*1.02).length;
  const coverPct=covers/oppStacks.length;
  let tier=0,factor=1,iso=false;
  if(ratio>=1.6&&coverPct>=0.5){tier=2;factor=1.12;iso=true;}
  else if((ratio>=1.35&&coverPct>=0.5)||(avgRatio>=1.55&&coverPct>=0.67)){tier=1;factor=1.07;iso=true;}
  return {factor,ratio,avgRatio,covers,coverPct,iso,tier,oppN:oppStacks.length};
}
function setMineMultiple(p,callAmt,raiser){
  if(!callAmt)return 0;
  const hero=p.chips+p.bet;
  const villain=raiser&&!raiser.folded&&!raiser.out
    ?raiser.chips+raiser.bet
    :Math.max(...inHand().filter(q=>q!==p).map(q=>q.chips+q.bet),0);
  return Math.max(0,Math.floor(Math.min(hero,villain)/callAmt));
}
function coachDifficulty(){
  return state&&state.cfg&&state.cfg.difficulty?state.cfg.difficulty:'medium';
}
function coachDifficultyApplies(p,diff){
  return diff!=='medium'&&inHand().some(q=>q!==p&&q.style);
}
function coachDifficultyRange(q,cap,floor,diff){
  if(diff==='easy'){
    const loose=q.style&&(q.style.id==='station'||q.style.id==='maniac');
    return {
      cap:clamp(cap*(loose?1.35:1.25)+0.03,0.03,1),
      floor:clamp(floor*0.65,0,0.20)
    };
  }
  if(diff==='hard'){
    const late=/^(CO|BTN|SB|SB\/BTN)$/.test(q.pos||'');
    const balanced=state.stage!=='preflop'&&(q.lineRead==='cbet'||late||q.style?.id==='shark'||q.style?.id==='maniac');
    const checked=q.checkedStreet||(q.checkStreets||[]).includes(state.stage);
    return {
      cap:clamp(cap*(balanced?1.18:1.06),0.03,1),
      floor:clamp(floor*(checked?0.75:0.90),0,0.25)
    };
  }
  return {cap,floor};
}
function coachDifficultyAggAdj(agg,betRatio,diff){
  if(!agg)return 0;
  if(diff==='hard'){
    let adj=0.015;
    if(/^(CO|BTN|SB|SB\/BTN)$/.test(agg.pos||''))adj+=0.01;
    if(agg.lineRead==='cbet')adj+=0.02;
    else if(agg.lineRead==='barrel2')adj+=0.01;
    else if(agg.lineRead==='barrel3'||agg.lineRead==='checkraise'||agg.lineRead==='donk')adj*=0.45;
    if(betRatio>=1)adj*=0.5;
    return adj;
  }
  if(diff==='easy'){
    let adj=-0.01;
    if(betRatio>=0.6)adj-=0.015;
    if(agg.lineRead==='cbet')adj+=0.005;
    if(agg.style?.id==='maniac')adj+=0.01;
    return adj;
  }
  return 0;
}
function coachDifficultyCallPad(diff){
  return diff==='hard'?-0.02:diff==='easy'?0.02:0;
}
function headsUpFinalProfile(p){
  const players=inHand();
  if(alive().length!==2||players.length!==2)return null;
  const opp=players.find(q=>q!==p);
  if(!opp)return null;
  const heroStack=p.chips+p.bet, oppStack=opp.chips+opp.bet;
  const effBB=effectiveStackBB(p);
  const coverRatio=heroStack/Math.max(oppStack,1);
  const chartBucket=(p.pos||'')==='BB'?'BB':'SB';
  const pos=p.pos||chartBucket;
  const button=chartBucket!=='BB';
  const callAmt=Math.max(0,Math.min(state.currentBet-p.bet,p.chips));
  const shoveThr=headsUpShoveThreshold(pos,effBB,callAmt)+headsUpStackBoost(p);
  return {
    effBB,chartBucket,coverRatio,button,
    covers:coverRatio>=1.4,
    active:effBB<=20,
    shoveThr:clamp(shoveThr,0,0.96),
    openThr:headsUpOpenThreshold(pos,effBB)
  };
}
/* the coach BRAIN: pure decision logic, runs headless (also powers the benchmark bot) */
function coachDecide(p){
  const sims=BENCH?180:500;
  const callAmt=Math.min(state.currentBet-p.bet,p.chips);
  const pot=state.players.reduce((s,q)=>s+q.totalBet,0);
  const liveOpponents=inHand().filter(q=>q!==p);
  const bettingLocked=liveOpponents.length>0&&liveOpponents.every(q=>q.allIn);
  /* Before players behind have responded to an open, do not pretend they have
     already called and drag raw equity into a fictitious multiway showdown.
     Their possible calls/3-bets are handled by the branch/squeeze model below. */
  const committedPreflopOpponents=state.stage==='preflop'&&state.currentBet>state.bb
    ?liveOpponents.filter(q=>q.i===state.lastAggIdx||q.allIn||
      (q.acted&&q.bet>=state.currentBet)||(q.acted&&q.bet>state.bb))
    :liveOpponents;
  const equityOpponents=committedPreflopOpponents.length?committedPreflopOpponents:liveOpponents;
  const opps=equityOpponents.length;
  const stackBB=(p.chips+p.bet)/state.bb;
  const difficulty=coachDifficulty();
  const difficultyApplies=coachDifficultyApplies(p,difficulty);

  /* order of action on postflop streets (current or upcoming) */
  const ord=postflopOrder().filter(q=>q===p||!q.allIn);
  const ordIdx=ord.indexOf(p);
  const actsFirst=ordIdx===0, actsLast=ordIdx===ord.length-1&&ord.length>1;

  /* equity vs realistic RANGES (not random cards): caps from bets, floors from checks */
  const oppCaps=equityOpponents
    .map(q=>{
      let cap=clamp(q.rangeCap||1,0.03,1), floor=clamp(q.rangeFloor||0,0,0.25);
      if(difficultyApplies){const d=coachDifficultyRange(q,cap,floor,difficulty);cap=d.cap;floor=d.floor;}
      return {cap,floor,model:difficultyApplies&&difficulty==='hard'?q.rangeModel:null,villain:q};
    })
    .sort((a,b)=>a.cap-b.cap).slice(0,4);
  const code=holeCode(p.hole), pr=handPct[code]||1;
  let eq,handDesc,drawRow='',extra=[],concepts=[];
  let eqAdj,airPen=0,underpairPen=0,underpairInfo=null;
  let madeScore=null,flushInfo=null,drawInfo=null,impliedInfo=null,drySidePot=false,sidePotInfo=null;
  let multiwayContinueInfo=null;
  const tightOpps=oppCaps.filter(o=>o.cap<1).length;
  const weakOpps=oppCaps.filter(o=>o.floor>0).length;
  if(tightOpps>0) extra.push(C('rangesNote',tightOpps,Math.round(Math.min(...oppCaps.map(o=>o.cap))*100)));
  if(weakOpps>0) extra.push(C('checksNote',weakOpps));
  coachPassiveLines(p,extra);
  const flags=getMode().coachFlags||{};
  if(difficultyApplies) extra.push(C(difficulty==='hard'?'diffHard':'diffEasy'));
  if(state.stage==='preflop'){
    eq=mcEquityR(p.hole,[],oppCaps,sims);
    const preflopPct=Math.round(pr*100);
    handDesc=`${RANK_CH[p.hole[0].r]}${SUIT_CH[p.hole[0].s]} ${RANK_CH[p.hole[1].r]}${SUIT_CH[p.hole[1].s]} — ${code}`+
      `<small class="coach-metric-note">${T('preflopRank')(preflopPct)} · ${T('lowerStronger')}</small>`;
  }else{
    eq=mcEquityR(p.hole,state.board,oppCaps,sims);
    const score=evalBest(p.hole.concat(state.board));
    madeScore=score;
    handDesc=handName(score);
    flushInfo=coachFlushRelativeStrength(p,state.board,oppCaps,pot);
    extra.push(classifyMade(p.hole,state.board,score));
    const domination=coachTopPairDomination(p.hole,state.board,score);
    if(domination){extra.push(C('dominatedTopPair',rankNm(domination.kicker),domination.higher));concepts.push('dominatedTopPair');}
    const counterfeitMade=coachMadeCounterfeit(p.hole,state.board,score);
    if(counterfeitMade){extra.push(C('madeCounterfeit',rankNm(counterfeitMade.rank),counterfeitMade.remaining));concepts.push('madeCounterfeit');}
    /* draws (only before the river) */
    if(state.stage!=='river'){
      const d=detectDraws(p.hole,state.board);
      const dr=[];
      const backdoorFlush=coachBackdoorFlushInfo(p.hole,state.board);
      drawInfo=coachDrawOutInfo(p.hole,state.board,d);
      applyRangeOutWeights(drawInfo.advanced,oppCaps,p.hole,state.board);
      drawInfo.rangeWeightedHitChance=drawHitChance(
        drawInfo.advanced.weightedOuts,drawInfo.unknown,drawInfo.streets);
      if(d.flush) dr.push(C('drawFlush',drawInfo.flush.length,pct(drawInfo.flushChance)));
      if(d.oesd) dr.push(C('drawOESD',drawInfo.straight.length,pct(drawInfo.straightChance)));
      else if(d.doubleGutshot)dr.push(C('drawDoubleGut',drawInfo.straight.length,pct(drawInfo.straightChance)));
      else if(d.gutshot) dr.push(C('drawGut',drawInfo.straight.length,pct(drawInfo.straightChance)));
      if(backdoorFlush&&!d.flush)dr.push(C('drawBackdoorFlush',pct(backdoorFlush.chance)));
      if(d.backdoorStraight&&!d.oesd&&!d.gutshot)
        dr.push(C('drawBackdoorStraight',pct(d.backdoorStraightChance)));
      if(dr.length){
        drawRow=`<div class="coach-row"><span>${T('draws')}</span><b>${dr.join('<br>')}</b></div>`;
        const outCards=drawInfo.unique;
        const outTxt=formatOutList(outCards);
        if(outTxt){
          const cleanTxt=formatOutList(drawInfo.clean);
          const dirtyTxt=formatOutList(drawInfo.dirty.map(x=>x.card));
          const overlapTxt=formatOutList(drawInfo.overlap);
          const outSummary=`${drawInfo.unique.length} ${T('unique')}`+
            (drawInfo.overlap.length?` · ${drawInfo.overlap.length} ${T('shared')}`:'');
          if(cleanTxt) drawRow+=`<div class="coach-row"><span>${T('outs')}</span><b>${outSummary}<br>${cleanTxt}</b></div>`;
          if(overlapTxt)
            drawRow+=`<div class="coach-row"><span>${T('shared')}</span><b>${overlapTxt} · ${T('countedOnce')}</b></div>`;
          if(dirtyTxt){
            drawRow+=`<div class="coach-row coach-row-dirty"><span>${T('dirtyOuts')}<button type="button" class="coach-info-btn" aria-expanded="false" aria-label="${T('dirtyOutsInfoLbl')}">&#8505;</button></span><b>${dirtyTxt}</b></div>`+
              `<p class="coach-info-tip hidden">${T('dirtyOutsInfo')}</p>`;
            const pairs=drawInfo.dirty.filter(x=>x.why==='pairs').map(x=>x.card);
            const fl=drawInfo.dirty.filter(x=>x.why==='flush').map(x=>x.card);
            if(pairs.length) extra.push(C('dirtyOutPairs',formatOutList(pairs)));
            if(fl.length) extra.push(C('dirtyOutFlush',formatOutList(fl)));
          }
        }
        if(d.flush||d.oesd||d.gutshot)extra.push(C('drawBaked'));
      }
      const adv=drawInfo.advanced;
      if(adv.overcards.length)
        drawRow+=`<div class="coach-row"><span>${T('overcardOuts')}</span><b>${adv.overcards.length}<br>${formatOutList(adv.overcards)}</b></div>`;
      if(adv.pairImprove.length)
        drawRow+=`<div class="coach-row"><span>${T('pairImproveOuts')}</span><b>${adv.pairImprove.length}<br>${formatOutList(adv.pairImprove)}</b></div>`;
      if(adv.fullHouse.length||adv.quads.length){
        const redrawCards=[...adv.fullHouse,...adv.quads];
        drawRow+=`<div class="coach-row"><span>${T('redrawOuts')}</span><b>${new Set(redrawCards.map(c=>c.r*4+c.s)).size}<br>${formatOutList(redrawCards)}</b></div>`;
      }
      if(adv.rawOuts){
        const weighted=Math.round(adv.weightedOuts*10)/10;
        drawRow+=`<div class="coach-row"><span>${T('outQuality')}</span><b>${weighted} ${T('weightedOuts')}<small class="coach-metric-note">${T('weightedOutsNote')(adv.rawOuts)}</small></b></div>`;
      }
      extra.push(...advancedOutNotes(adv));
    }
    /* board texture warnings */
    const bs=[0,0,0,0]; for(const c of state.board) bs[c.s]++;
    const score0=score[0];
    if(Math.max(...bs)>=3 && score0<5) extra.push(C('warnFlush'));
    const br=state.board.map(c=>c.r), brCnt={};
    for(const r of br) brCnt[r]=(brCnt[r]||0)+1;
    if(Object.values(brCnt).some(c=>c>=2) && score0<6) extra.push(C('warnPaired'));
    if(opps>=3) extra.push(C('multiway',opps));
    coachMultiwayBuckets(p,extra,opps,callAmt,actsFirst,actsLast);
  }
  eqAdj=eq;
  const odds=callAmt>0?callAmt/(pot+callAmt):0;
  let spr,sprZone;
  if(flags.showSpr&&state.stage!=='preflop'){
    spr=coachSpr(p,callAmt,pot);
    sprZone=spr>=10?'deep':spr>=4?'mid':'low';
    extra.push(C(spr>=10?'sprDeep':spr>=4?'sprMid':'sprLow',Math.round(spr*10)/10));
  }

  /* position adjustment: tighter early, looser late (preflop) */
  const pos=p.pos||'';
  const early=/^(UTG|MP)/.test(pos), late=/(BTN|CO|HJ)/.test(pos);
  const posAdj = state.stage==='preflop'
    ? (early?0.04 : late?-0.03 : 0) + (actsFirst?0.02:0)
    : (actsFirst?0.03 : actsLast?-0.02 : 0);
  if(state.stage==='preflop'){
    if(early) extra.push(C('posEarly',pos));
    else if(late) extra.push(C('posLate',pos));
    /* future position: who talks first once the flop comes */
    if(opps>0){
      if(actsFirst) extra.push(C('futFirst'));
      else if(actsLast) extra.push(C('futLast'));
      else extra.push(C('futMid',T('ord')(ordIdx+1),ord.length));
    }
  }else{
    if(opps>0){
      if(actsFirst) extra.push(C('stFirst'));
      else if(actsLast) extra.push(C('stLast'));
    }
  }

  if(state.stage!=='preflop'){
    multiwayContinueInfo=coachPairedBoardBetCallRisk(p,madeScore,drawInfo,callAmt,opps);
    if(multiwayContinueInfo)concepts.push('pairedBoardBetCall');
  }

  /* M-ratio (Harrington): stack vs the cost of one orbit's blinds+antes */
  const aliveN=alive().length;
  const orbitCost=state.sb+state.bb+state.ante*aliveN;
  const M=(p.chips+p.bet)/Math.max(orbitCost,1);
  const zoneOf=m=>m>20?'G':m>10?'Y':m>5?'O':'R';
  const mZone=zoneOf(M);

  /* ICM prize pressure: extra win-chance this call needs because busting costs prize equity */
  const icmPrem=flags.icm&&callAmt>0&&aliveN>2?icmPremium(p,callAmt,pot):0;
  const icmActive=!!(flags.icm&&aliveN>2&&typeof PAYOUTS==='function'&&PAYOUTS(state.cfg.numPlayers).length>1);
  const icmInfo=flags.icm?icmDecisionContext(p,callAmt,pot,icmPrem):null;
  impliedInfo=coachPostflopImpliedOdds(p,callAmt,pot,drawInfo,actsFirst,actsLast,icmPrem);
  if(impliedInfo)extra.push(C('impliedOddsNote',pct(impliedInfo.immediateNeed),
    pct(impliedInfo.realisticNeed),pct(impliedInfo.bestCaseNeed),usd(Math.round(impliedInfo.futureChips)),
    usd(impliedInfo.maxFuture),pct(impliedInfo.hitChance),impliedInfo.reverseRisk));
  if(flags.cashNote) extra.push(C('cashModeNote'));

  let decisionNeed=state.stage==='preflop'
    ?clamp(odds+icmPrem,0,.95)
    :clamp(odds+(multiwayContinueInfo?Math.max(0,posAdj):posAdj)+icmPrem-
      (impliedInfo?.equityCredit||0),0,.95);
  let rec,why=[],chartInfo=null,rangeCharts=[],smallStab=false,preflopCallInfo=null;
  let strategyMode='baseline';
  if(state.stage==='preflop'){
    const bucket=posBucket(pos), prTxt='top ~'+Math.round(pr*100)+'%';
    const unopened=state.currentBet<=state.bb;
    /* pocket pairs gain implied-odds value when deep: sets are disguised and win stacks */
    const isPair=p.hole[0].r===p.hole[1].r;
    const smallPair=isPair&&p.hole[0].r<=6;
    const pairAdj=isPair&&stackBB>=(flags.deepStack?30:40);
    /* suited connectors also play above their raw ranking when deep (hidden straights/flushes) */
    const gapSC=Math.abs(p.hole[0].r-p.hole[1].r);
    const scAdj=!isPair&&p.hole[0].s===p.hole[1].s&&gapSC>=1&&gapSC<=2
      &&Math.max(p.hole[0].r,p.hole[1].r)<=12&&Math.min(p.hole[0].r,p.hole[1].r)>=5&&stackBB>=(flags.deepStack?25:30);
    const lowSuitedConnector=scAdj&&Math.max(p.hole[0].r,p.hole[1].r)<=10;
    const prEff=(pairAdj?pr*0.8:pr)*(scAdj?0.85:1);
    if(scAdj&&state.currentBet<=state.bb) extra.push(C('suitedConn'));
    if(flags.deepStack&&stackBB>=50) extra.push(C('cashDeepNote',Math.round(stackBB)));
    /* zone-drop warning: what does the NEXT blind level do to your M? */
    if(flags.blindLevelWarn&&state.level<state.levels.length-1){
      const per=SPEED_HANDS[state.cfg.speed];
      const handsLeft=per-((state.handNum-1)%per+1)+1;
      const nbb=state.levels[state.level+1];
      const nante=state.cfg.ante?Math.max(1,Math.round(nbb*state.cfg.ante)):0;
      const mNext=(p.chips+p.bet)/Math.max(nbb*1.5+nante*aliveN,1);
      if(zoneOf(mNext)!==mZone&&mNext<M) extra.push(C('mWarn',handsLeft,Math.round(mNext),T('zone'+zoneOf(mNext))));
    }
    /* always teach what M means — jargon is useless unexplained */
    if(flags.mRatio) extra.push(C('mExplain',Math.round(M)));
    const hu=headsUpFinalProfile(p);
    const pushBB=hu?hu.effBB:stackBB;
    const pushBucket=hu?hu.chartBucket:bucket;
    const pushMode=stackBB<=10||(hu&&hu.active);
    if(hu&&hu.active&&hu.covers) extra.push(C('stackDomNote',Math.round(hu.coverRatio*10)/10,1,1));
    if(pushMode){
      /* push/fold territory: heads-up uses effective stack; larger tables use solver charts first */
      const baseThr=PUSH_THR[pushBucket]||PUSH_THR[bucket];
      const thr=hu?hu.shoveThr:baseThr;
      const shoveCharts=chartFor('shove',shoveChartKey(pushBB));
      const sChart=shoveCharts?shoveCharts[pushBucket]:null;
      const shoveYes=hu?prEff<=thr:(sChart&&sChart.includes(code))||prEff<=thr;
      const huOpenSmall=hu&&unopened&&callAmt>0&&pushBB>12&&prEff<=hu.openThr;
      if(hu) chartInfo={kind:huOpenSmall?'rfi':'shove',pos:`HU ${pos||pushBucket} ${Math.max(1,Math.round(pushBB))}BB`,list:handsThroughPct(huOpenSmall?hu.openThr:thr)};
      else if(sChart) chartInfo={kind:'shove',pos:pos||pushBucket,list:sChart};
      const callPad=hu?0.02:0.07;
      if(shoveYes&&state.currentBet<=state.bb){
        rec='ALLIN';
        why.push(hu?C('huPush',Math.max(1,Math.round(pushBB)),code,prTxt,Math.round(thr*100),pos||pushBucket)
          :sChart?C('chartShove',code,Math.round(pushBB),pos||pushBucket):C('pfShove',Math.round(pushBB),code,prTxt,Math.round(thr*100),pos||'—'));
      }else if(huOpenSmall){
        rec='RAISE';
        why.push(C('huOpen',Math.max(1,Math.round(pushBB)),code,pos||pushBucket));
      }else if(!shoveYes&&sChart&&callAmt>0&&!(eq>=odds+callPad+icmPrem)){
        rec='FOLD';
        why.push(hu?C('huFold',Math.max(1,Math.round(pushBB)),code,prTxt,Math.round(thr*100),pos||pushBucket):C('chartNotInShove',code,pos||pushBucket));
      }else if(shoveYes&&state.currentBet>state.bb&&eq>=odds+icmPrem){
        rec='ALLIN';
        why.push(hu?C('huPush',Math.max(1,Math.round(pushBB)),code,prTxt,Math.round(thr*100),pos||pushBucket):C('pfShove',Math.round(pushBB),code,prTxt,Math.round(thr*100),pos||'—'));
      }else if(callAmt===0){
        rec='CHECK';
        why.push(C('pfShortCheck',code,pos));
      }else if((!hu||!hu.button)&&eq>=odds+callPad+icmPrem){
        rec='CALL';
        why.push(hu?C('huCall',Math.max(1,Math.round(pushBB)),code,pct(eq),pct(odds)):C('pfShortCall',code,pct(eq),pct(odds)));
      }else{
        rec='FOLD';
        why.push(hu?C('huFold',Math.max(1,Math.round(pushBB)),code,prTxt,Math.round(thr*100),pos||pushBucket):C('pfShortFold',Math.round(pushBB),code,prTxt,Math.round(thr*100),pos));
      }
    }else if(unopened){
      const thr=OPEN_THR[bucket];
      /* tournament: blind pressure widens steals as stacks shrink; cash: depth widens IP, short only when actually short */
      const lateSteal=/(BTN|CO|HJ|SB)/.test(pos);
      const openCap=tableSizeOpenCap(aliveN);
      const fTable=tableSizeOpenFactor(pos,aliveN);
      const thrTable=Math.min(openCap,thr*fTable);
      if(fTable>1.01) extra.push(C('tableSizeNote',aliveN,Math.round(thr*100),Math.round(thrTable*100)));
      let press,fStack;
      if(flags.deepStack){
        const deep=clamp((stackBB-40)/60,0,1);
        press=clamp((18-stackBB)/8,0,1);
        fStack=lateSteal?1+0.28*deep+0.22*press:/^MP/.test(pos)?1+0.12*deep+0.10*press:1;
        if(actsLast&&stackBB>=60) extra.push(C('cashDeepIp',Math.round(stackBB)));
      }else{
        press=clamp((25-stackBB)/15,0,1);
        fStack=lateSteal?1+0.45*press:/^MP/.test(pos)?1+0.15*press:1;
      }
      const fAnte=flags.anteWiden?Math.min(1.35,1+0.6*(state.ante*aliveN)/(1.5*state.bb)):1;
      let fProf=1, profDir=0;
      if(lateSteal){
        const behind=inHand().filter(q=>q!==p&&!q.acted&&q.style);
        if(behind.length){
          const mlt={rock:1.25,station:0.8,shark:0.95,maniac:0.7};
          fProf=behind.reduce((s,q)=>s+(mlt[q.style.id]||1),0)/behind.length;
          profDir=fProf>1.08?1:fProf<0.92?-1:0;
          if(profDir!==0)strategyMode='exploit';
        }
      }
      if(lateSteal&&difficultyApplies){
        if(difficulty==='easy'){fProf*=0.92;if(profDir===0)profDir=-1;}
        else if(difficulty==='hard'){fProf*=0.96;if(profDir===0)profDir=-1;}
      }
      let thrEff=Math.min(openCap,thrTable*fStack*fAnte*fProf);
      const dom=stackDominance(p);
      if(lateSteal&&dom.tier>0){
        thrEff=Math.min(openCap,thrEff*dom.factor);
        extra.push(C('stackDomNote',Math.round(dom.ratio*10)/10,dom.covers,dom.oppN));
      }
      /* always explain when profiles behind shift the steal math, even slightly */
      if(Math.abs(thrEff-thrTable)/thrTable>0.12||profDir!==0) extra.push(C('widenNote',Math.round(thrTable*100),Math.round(thrEff*100),profDir));
      const nLimps=limperCount(p);
      const limpPot=nLimps>0&&state.currentBet<=state.bb;
      if(limpPot){
        extra.push(C('limpPotNote',nLimps));
        thrEff=Math.min(Math.max(openCap,0.65),thrEff*(1+0.04*Math.min(nLimps,3)));
      }
      /* solver chart: iso over limpers, else raise-first-in */
      /* The BB has a free check after limpers, but strong hands still belong in
         an isolation range. The chart data has no dedicated BB key, so use its
         tightest existing iso range instead of falling through to a check. */
      const chartPos=fullRingChartPosition(pos,aliveN);
      const isoList=limpPot?(chartFor('iso',chartPos)||(pos==='BB'?chartFor('iso','UTG'):null)):null;
      const rfi=chartFor('rfi',chartPos);
      const chartList=isoList||rfi;
      if(chartList){
        const adjusted=!isoList&&aliveN<=6
          ?[...new Set(chartList.concat(handsThroughPct(thrEff)))]:chartList;
        const shifted=chartPos!==pos?` · ${aliveN}-handed → ${chartPos}`:!isoList&&aliveN<=6?` · ${aliveN}-handed`:'';
        chartInfo={kind:isoList?'iso':'rfi',pos:`${pos}${shifted}`,list:adjusted};
      }
      const chartHit=chartList?chartList.includes(code):false;
      const pressureOpen=prEff<=thrEff&&callAmt>0||prEff<=Math.min(thrEff,0.10)&&callAmt===0;
      const isoSlack=dom.tier===2?0.13:dom.tier===1?0.08:0;
      const borderlineIso=dom.iso&&lateSteal&&callAmt>0&&!chartHit&&prEff<=thrEff+isoSlack&&eq>=0.14;
      const scCrowded=lowSuitedConnector&&((limpPot&&(nLimps>=2||!actsLast||opps>=3))||(!limpPot&&!late&&aliveN>=6));
      const scFlatOk=scCrowded&&limpPot&&callAmt>0&&stackBB>=20;
      if(scFlatOk){
        rec='CALL';
        why.push(C('scFlatMulti',code,nLimps));
      }else if(scCrowded&&callAmt>0){
        rec='FOLD';
        why.push(C('scFoldEarly',code));
      }else if((chartHit&&(callAmt>0||limpPot))||pressureOpen){
        rec='RAISE';
        if(chartHit&&isoList) why.push(C('chartIso',code,pos,nLimps));
        else why.push(chartHit?C('chartOpen',code,pos):C('pfOpen',code,prTxt,Math.round(thrEff*100),pos,pairAdj&&pr>thrEff));
      }else if(borderlineIso){
        rec='RAISE';
        why.push(C('stackDomIso',code,pos,Math.round(dom.ratio*10)/10));
      }else if(callAmt===0){
        rec='CHECK';
        why.push(C('pfBBfree',code));
      }else{
        rec='FOLD';
        if(smallPair) why.push(C('pfOpenFoldPair',code,pos));
        else if(isoList) why.push(C('chartNotInIso',code,pos));
        else why.push(rfi?C('chartNotIn',code,pos):C('pfOpenFold',code,prTxt,Math.round(thrEff*100),pos));
        if(dom.tier>=1&&lateSteal&&callAmt>0) extra.push(C('stackDomFoldHint'));
      }
    }else{
      /* facing a raise: BB defense vs steals, then per-raiser-position chart, then EP/LP bucket */
      const raiser=state.lastAggIdx>=0&&state.lastAggIdx!==p.i?state.players[state.lastAggIdx]:null;
      const facingAllIn=!!raiser?.allIn;
      /* Use the action level, not the hero's contribution. In a cold 3-bet
         spot the hero may have posted only the BB, but this is still a
         4-bet/call/fold decision rather than an ordinary BB steal defense. */
      const facingReraise=(state.preflopRaiseCount||0)>=2;
      const squeezeCallers=flatCallerCount(p);
      const squeezeEligible=squeezeCallers>0&&
        (['JJ','QQ','KK','AA','AKs','AKo'].includes(code)||raiser?.style?.id!=='rock');
      const shortCtBase=clamp(0.13+(late?0.05:0)+(early?-0.03:0),0.06,0.25);
      const shortCt=clamp(shortCtBase*tableSizeFacingFactor(aliveN,pos),0.06,aliveN<=2?0.45:aliveN===3?0.36:aliveN===4?0.30:0.25);
      if(aliveN<=4&&shortCt>shortCtBase*1.08) extra.push(C('tableSizeNote',aliveN,Math.round(shortCtBase*100),Math.round(shortCt*100)));
      let facing=pos==='BB'?bbDefendChartFor(raiser,pos):null;
      if(!facing) facing=facingChartFor(raiser,aliveN);
      const domCall=stackDominance(p);
      const diffCallPad=difficultyApplies?coachDifficultyCallPad(difficulty):0;
      if(!facingReraise&&callAmt>0){
        preflopCallInfo=coachPreflopCallModel(p,raiser,callAmt,pot,eq,odds,
          actsFirst,actsLast,icmPrem,diffCallPad,difficulty);
        eqAdj=preflopCallInfo.realizedEq;
        decisionNeed=preflopCallInfo.requiredEq;
        if(preflopCallInfo.multiwayImpliedCredit>.001)
          extra.push(C('pfMultiwayValue',code,preflopCallInfo.callers));
      }
      const contextCallOk=()=>preflopCallInfo
        ?preflopCallInfo.profitable
        :eq>=odds+icmPrem+Math.max(0,diffCallPad);
      const contextNearOk=margin=>preflopCallInfo
        ?preflopCallInfo.realizedEq>=preflopCallInfo.requiredEq-margin
        :eq>=odds+icmPrem+Math.max(0,diffCallPad)-margin;
      const contextProse=key=>{
        const x=preflopCallInfo;
        return x?C(key,code,pct(eq),pct(x.realizedEq),pct(x.requiredEq),
          Math.round(x.openBB*10)/10,Math.max(1,Math.round(x.effBB)),x.position,
          x.behindCount,Math.round(x.squeezeRisk*100)):null;
      };
      const stackCallOk=list=>isPair&&domCall.tier===2&&list.includes(code)&&callAmt>0&&contextNearOk(.05);
      const highCards=p.hole[0].r>=10&&p.hole[1].r>=10&&p.hole[0].r!==p.hole[1].r;
      const connectedBroadway=highCards&&Math.abs(p.hole[0].r-p.hole[1].r)<=2;
      const cheapBroadwayFlat=connectedBroadway&&callAmt>0&&state.currentBet<=state.bb*2.5&&
        stackBB>=20&&callAmt/(p.chips+p.bet)<=.12&&icmPrem<=.02;
      const setMineX=setMineMultiple(p,callAmt,raiser);
      const setMineOk=smallPair&&callAmt>0&&setMineX>=15;
      const setMineThin=smallPair&&callAmt>0&&setMineX<15;
      if(bettingLocked){
        /* With every remaining opponent already all-in there is nobody left to
           fold, so raising cannot isolate, bluff, or gain value. This decision
           is purely call versus fold at the current pot price. */
        if(callAmt>0&&contextCallOk()){
          rec='CALL';
          why.push(contextProse('pfContextCall')||C('chartCallRaise',code,pct(eq),pct(odds)));
        }else{
          rec=callAmt>0?'FOLD':'CHECK';
          if(callAmt>0)
            why.push(contextProse('pfContextFold')||C('chartIcmFold',code,pct(eq),pct(odds)));
        }
      }else if(facingAllIn){
        /* A normal facing-open chart contains bluff 3-bets whose profit comes
           from making the opener fold. That logic is impossible once the
           opener is all-in. Continue by price, or isolate only with real value. */
        const shoveBB=Math.round(state.currentBet/Math.max(state.bb,1)*10)/10;
        const liveBehind=liveOpponents.filter(q=>q!==raiser&&!q.allIn).length;
        const valueRange=coachShortAllInValueRange(shoveBB,icmPrem);
        const canRaise=p.bet+p.chips>state.currentBet;
        const valueIsolation=canRaise&&liveBehind>0&&valueRange.includes(code);
        const usable=pct(preflopCallInfo?.realizedEq??eq);
        strategyMode='short-allin';
        concepts.push('shortAllIn');
        chartInfo=null;
        if(valueIsolation){
          rec='RAISE';
          concepts.push('valueIsolation');
          why.push(C('shortAllInValue',code,shoveBB,liveBehind));
        }else if(callAmt>0&&contextCallOk()){
          rec='CALL';
          why.push(C('shortAllInCall',code,shoveBB,pct(eq),usable,liveBehind,pct(decisionNeed)));
        }else{
          rec=callAmt>0?'FOLD':'CHECK';
          if(callAmt>0)
            why.push(C('shortAllInFold',code,shoveBB,pct(eq),usable,liveBehind,pct(decisionNeed)));
        }
      }else if(facingReraise){
        /* Hero already opened (or 3-bet): this is a 4-bet-or-fold decision, never the 3-bet chart. */
        const four=coachFourBetPlan(p,raiser,actsLast,code,icmPrem);
        const villainPos=raiser&&raiser.pos?raiser.pos:'villain';
        chartInfo={kind:'fourBet',pos:`${pos} vs ${villainPos} 3-bet`,list:four.value.concat(four.bluffs),list2:four.calls};
        if(four.valueHit){
          rec=four.sizing.jam?'ALLIN':'RAISE';
          why.push(C('fourBetValue',code,usd(state.currentBet),bbs(state.currentBet)));
        }else if(four.bluffHit){
          rec='RAISE';
          why.push(C('fourBetBluff',code,usd(state.currentBet),bbs(state.currentBet)));
        }else if(four.callHit&&eq>=odds+icmPrem+diffCallPad){
          rec='CALL';
          why.push(C('fourBetCall',code,pct(eq),pct(odds)));
        }else{
          rec='FOLD';
          why.push(C('fourBetFold',code,usd(state.currentBet),bbs(state.currentBet),Math.round(four.effectiveBB),four.tight||four.large));
        }
      }else if(facing){
        const {fc,label,rawLabel,perPos,bbDefend,shifted,tableSize}=facing;
        const mappedLabel=shifted?`${rawLabel} · ${tableSize}-handed → ${label}`:label;
        chartInfo={kind:bbDefend?'bbDefend':'facing',pos:bbDefend?`BB vs ${mappedLabel}`:(perPos?`vs ${mappedLabel}`:mappedLabel),list:fc.raise,list2:fc.call};
        if(bbDefend){
          if(fc.raise.includes(code)){
            rec='RAISE';
            why.push(C('chartBb3bet',code,label));
          }else if(fc.call.includes(code)&&contextCallOk()){
            rec='CALL';
            why.push(contextProse('pfContextCall')||C('chartBbCall',code,label,pct(eq),pct(odds)));
          }else if(stackCallOk(fc.call)){
            rec='CALL';
            why.push(C('stackDomCall',code,Math.round(domCall.ratio*10)/10,pct(eq),pct(odds)));
          }else if(setMineOk){
            rec='CALL';
            why.push(C('pfSetMine',code,usd(callAmt),setMineX));
          }else if(aliveN<=4&&pr<=shortCt&&contextCallOk()){
            rec='CALL';
            why.push(contextProse('pfContextCall')||C('pfCallRange',pos,Math.round(shortCt*100),code,prTxt,pct(eq),pct(odds)));
          }else if(setMineThin){
            rec='FOLD';
            why.push(C('pfSetMineFold',code,usd(callAmt),setMineX));
          }else if(fc.call.includes(code)){
            rec='FOLD';
            why.push(contextProse('pfContextFold')||C('chartIcmFold',code,pct(eq),pct(odds)));
          }else{
            rec='FOLD';
            why.push(C('chartBbFold',code,label));
          }
        }else{
        const strategicRaiserPos=fullRingChartPosition(raiser?.pos||'',aliveN);
        const vsEarlyR=/^(UTG|MP)/.test(strategicRaiserPos);
        if(fc.raise.includes(code)){
          rec='RAISE';
          why.push(squeezeEligible?C('squeezePlay',code,squeezeCallers):C('chart3bet',code,vsEarlyR));
          if(squeezeEligible)concepts.push('squeeze');
        }else if(squeezeCallers>0&&raiser?.style?.id!=='rock'&&icmPrem<.02&&
          ['A5s','A4s','KQs','AQs','JJ','QQ','KK','AA'].includes(code)){
          rec='RAISE';
          strategyMode='exploit';
          why.push(C('squeezePlay',code,squeezeCallers));
          concepts.push('squeeze');
        }else if(fc.call.includes(code)&&contextCallOk()){
          rec='CALL';
          why.push(contextProse('pfContextCall')||C('chartCallRaise',code,pct(eq),pct(odds)));
        }else if(stackCallOk(fc.call)){
          rec='CALL';
          why.push(C('stackDomCall',code,Math.round(domCall.ratio*10)/10,pct(eq),pct(odds)));
        }else if(setMineOk){
          rec='CALL';
          why.push(C('pfSetMine',code,usd(callAmt),setMineX));
        }else if(aliveN<=4&&pr<=shortCt&&contextCallOk()){
          rec='CALL';
          why.push(contextProse('pfContextCall')||C('pfCallRange',pos,Math.round(shortCt*100),code,prTxt,pct(eq),pct(odds)));
        }else if(cheapBroadwayFlat){
          rec='CALL';
          strategyMode='exploit';
          concepts.push('broadwayFlat');
          why.push(C('broadwayFlat',code,Math.round(state.currentBet/state.bb*10)/10,
            Math.round((p.chips-callAmt)/state.bb),preflopCallInfo?.behindCount||0));
        }else if(setMineThin){
          rec='FOLD';
          why.push(C('pfSetMineFold',code,usd(callAmt),setMineX));
        }else if(fc.call.includes(code)){
          rec='FOLD';
          why.push(contextProse('pfContextFold')||C('chartIcmFold',code,pct(eq),pct(odds)));
        }else{
          rec='FOLD';
          why.push(C('chartFoldVs',code,raiser?.pos||'',preflopCallInfo?.behindCount||0,
            /^A[2-9][so]$/.test(code)));
        }
        }
      }else{
        const ct=shortCt;
        if(pr<=0.05){
          rec='RAISE';
          why.push(C('pf3bet',code));
        }else if(pr<=ct&&contextCallOk()){
          rec='CALL';
          why.push(contextProse('pfContextCall')||C('pfCallRange',pos,Math.round(ct*100),code,prTxt,pct(eq),pct(odds)));
        }else if(setMineOk){
          rec='CALL';
          why.push(C('pfSetMine',code,usd(callAmt),setMineX));
        }else if(setMineThin){
          rec='FOLD';
          why.push(C('pfSetMineFold',code,usd(callAmt),setMineX));
        }else{
          rec='FOLD';
          why.push(C('pfFoldRange',Math.round(ct*100),pos,code,prTxt,pct(eq),pct(odds)));
        }
      }
    }
  }else if(callAmt===0){
    const river=state.stage==='river';
    const checkedToMe=actsLast&&inHand().filter(q=>q!==p&&!q.allIn).some(q=>q.checkedStreet);
    const checkedInFront=inHand().filter(q=>q!==p&&!q.allIn&&q.checkedStreet).length;
    const checkedDown=actsLast?checkedDownVillains(p):[];
    const passiveStabbers=opps<=2?passiveStreetVillains(p,2):[];
    const passiveMajority=passiveStabbers.length>=Math.max(1,Math.ceil(opps*0.75));
    const valueThresh=difficultyApplies&&difficulty==='easy'?0.58:0.62;
    const stabMin=difficultyApplies&&difficulty==='easy'?0.44:difficultyApplies&&difficulty==='hard'?0.34:0.38;
    const probeMin=difficultyApplies&&difficulty==='easy'?0.38:difficultyApplies&&difficulty==='hard'?0.26:0.30;
    const probeMax=difficultyApplies&&difficulty==='hard'?0.65:0.62;
    const probeStab=passiveMajority&&eq>=probeMin&&eq<=probeMax&&(actsLast||river||boardTexture(state.board).dry);
    const boardKickerValue=river&&typeof boardTwoPairKickerInfo==='function'
      ?boardTwoPairKickerInfo(p.hole,state.board)
      :null;
    const thinBoardKickerValue=boardKickerValue&&checkedInFront>0&&boardKickerValue.kicker>=13;
    const strongMade=realTwoPairOrBetter(madeScore,p.hole);
    sidePotInfo=coachExistingSidePot(p);
    drySidePot=state.players.some(q=>q!==p&&!q.folded&&!q.out&&q.allIn)&&
      inHand().some(q=>q!==p&&!q.allIn)&&sidePotInfo.amount===0&&boardTexture(state.board).dry&&
      madeScore?.[0]===1&&hasTopPairOrBetter(madeScore,p.hole,state.board);
    const freeDraw=state.stage!=='river'?detectDraws(p.hole,state.board):null;
    const drawOnlyFree=freeDraw&&(freeDraw.flush||freeDraw.oesd||freeDraw.gutshot)&&madeScore&&madeScore[0]<1;
    const stationPresent=inHand().some(q=>q!==p&&q.style?.id==='station');
    const pureAirFree=madeScore?.[0]===0&&!(freeDraw&&(freeDraw.flush||freeDraw.oesd||freeDraw.doubleGutshot));
    const boardHigh=Math.max(...state.board.map(c=>c.r));
    const twoLiveOvercards=madeScore?.[0]===0&&p.hole.filter(c=>c.r>boardHigh).length===2;
    const premiumOvercards=/^(AK|AQ)[so]$/.test(code);
    const standardOvercardCbet=state.stage==='flop'&&state.pfAggIdx===p.i&&opps===1&&
      twoLiveOvercards&&eq>=.48;
    const sidePotOvercardCbet=state.stage==='flop'&&state.pfAggIdx===p.i&&
      sidePotInfo.amount>0&&sidePotInfo.activeOpponents===1&&checkedInFront>0&&
      twoLiveOvercards&&premiumOvercards&&!boardTexture(state.board).monotone;
    const overcardCbet=standardOvercardCbet||sidePotOvercardCbet;
    const multiwayDrawCaution=drawOnlyFree&&opps>=2&&!realTwoPairOrBetter(madeScore,p.hole);
    const riverBlocker=coachRiverNutBlockerBluff(p,madeScore,opps);
    const weakTopPair=coachTopPairDomination(p.hole,state.board,madeScore);
    const preflopAggressor=state.pfAggIdx>=0?state.players[state.pfAggIdx]:null;
    const preflopAggressorBehind=preflopAggressor&&preflopAggressor!==p&&
      !preflopAggressor.folded&&!preflopAggressor.allIn&&ord.indexOf(preflopAggressor)>ordIdx;
    const protectMade=!river&&checkedInFront>0&&opps<=3&&eq>=0.32&&strongMade;
    const leadStrongMade=!river&&checkedInFront===0&&opps<=2&&eq>=0.45&&strongMade;
    const protectTopPair=!river&&checkedInFront>0&&opps<=3&&eq>=0.48&&hasTopPairOrBetter(madeScore,p.hole,state.board);
    if(flushInfo&&flushInfo.caution){
      rec='CHECK';
      why.push(C('fragileFlushCheck',flushInfo.tuple,flushInfo.higherCount,
        pct(flushInfo.anyBetter),pct(flushInfo.aheadWhenContinued),opps));
    }else if(eq>valueThresh||thinBoardKickerValue){
      rec='RAISE';
      if(thinBoardKickerValue)smallStab=true;
      why.push(river?C('valRiver',pct(eq),opps):C('valBet',pct(eq),opps));
    }else if(protectMade||leadStrongMade||protectTopPair){
      rec='RAISE';
      why.push(C('protectBet',handDesc,pct(eq),opps));
    }else if(overcardCbet){
      rec='RAISE';
      smallStab=true;
      concepts.push('overcardCbet');
      if(sidePotOvercardCbet){
        concepts.push('sidePotCbet');
        why.push(C('sidePotOvercardCbet',code,pct(eq),usd(sidePotInfo.amount)));
      }else why.push(C('overcardCbet',code,pct(eq),checkedInFront>0));
    }else if(multiwayDrawCaution){
      rec='CHECK';
      why.push(C('drawMwCheck',opps));
    }else if(riverBlocker){
      rec='RAISE';
      smallStab=true;
      why.push(C('riverBlockerBluff'));
      concepts.push('riverBlockerBluff');
    }else if(checkedDown.length&&eq>probeMin&&!(stationPresent&&pureAirFree)){
      rec='RAISE';
      smallStab=true;
      why.push(C('checkedDownStab',pct(eq),checkedDown.length));
    }else if(!river&&checkedToMe&&eq>stabMin&&!(stationPresent&&pureAirFree)){
      rec='RAISE';
      smallStab=true;
      why.push(C('stab',pct(eq)));
    }else if(probeStab&&!(stationPresent&&pureAirFree)){
      rec='RAISE';
      smallStab=true;
      why.push(C('probeStab',pct(eq),passiveStabbers.length,!actsLast));
    }else if(drySidePot){
      rec='CHECK';
      why.push(C('drySidePotCheck',handDesc,pct(eq)));
    }else if(weakTopPair&&opps>=2&&preflopAggressorBehind){
      rec='CHECK';
      why.push(C('multiwayTopPairCheck',pct(eq),rankNm(weakTopPair.kicker),opps));
    }else if(eq>0.42){
      rec='CHECK';
      why.push(river?C('midRiver',pct(eq)):C('midCheck',pct(eq)));
    }else{
      rec='CHECK';
      why.push(river
        ?(actsLast?C('weakRiverLast',pct(eq)):C('weakRiverFirst',pct(eq)))
        :C('weakFree',pct(eq)));
    }
  }else{
    /* a big bet usually means a strong made hand — discount raw equity */
    const betRatio=callAmt/Math.max(pot-callAmt,1);
    const bigBetPen=betRatio>=1?0.10:betRatio>=0.6?0.05:betRatio>=0.35?0.02:0;
    const d=state.stage!=='river'?detectDraws(p.hole,state.board):null;
    const backdoorFlush=state.stage==='flop'?coachBackdoorFlushInfo(p.hole,state.board):null;
    const myScore=evalBest(p.hole.concat(state.board));
    const drawOnly=d&&(d.gutshot||d.oesd||d.flush)&&myScore[0]<2;
    /* WHO is betting, and WHAT LINE did they take? exploit the player, read the story */
    const agg=state.lastAggIdx>=0&&state.lastAggIdx!==p.i?state.players[state.lastAggIdx]:null;
    let exploitAdj=0;
    const profileAlreadyModeled=!!(difficultyApplies&&difficulty==='hard'&&agg?.rangeModel&&
      Array.isArray(agg.rangeModel.weights));
    if(agg&&agg.style&&!agg.folded){
      strategyMode='exploit';
      if(agg.style.id==='rock'){if(!profileAlreadyModeled)exploitAdj=-0.04;extra.push(C('profRock'));}
      else if(agg.style.id==='maniac'){if(!profileAlreadyModeled)exploitAdj=+0.05;extra.push(C('profManiac'));}
      else if(agg.style.id==='station'){if(!profileAlreadyModeled)exploitAdj=-0.03;extra.push(C('profStation'));}
    }
    /* Hard-mode equity already samples the profile-aware posterior. Applying another
       fixed Wild/c-bet bonus here would count the same looseness twice. */
    const diffAggAdj=difficultyApplies&&!profileAlreadyModeled?coachDifficultyAggAdj(agg,betRatio,difficulty):0;
    if(agg&&agg.lineRead){
      if(agg.lineRead==='cbet')extra.push(C('lineCbet'));
      else if(agg.lineRead==='donk')extra.push(C('lineDonk'));
      else if(agg.lineRead==='barrel2')extra.push(C('lineBarrel',2));
      else if(agg.lineRead==='barrel3')extra.push(C('lineBarrel',3));
      else if(agg.lineRead==='checkraise')extra.push(C('lineCR'));
    }
    /* blockers: cards in YOUR hand remove combos from HIS range */
    let blockAdj=0;
    if(betRatio>=0.6&&p.hole.some(c=>c.r===14)){blockAdj=0.02;extra.push(C('blockerAce'));}
    {
      const fsB=[0,0,0,0];for(const c of state.board)fsB[c.s]++;
      const fSuit=fsB.findIndex(v=>v>=3);
      if(fSuit>=0&&myScore[0]<5&&p.hole.some(c=>c.r===14&&c.s===fSuit))extra.push(C('blockerFlush'));
    }
    /* "no hand, no draw" discipline: a pair that uses a hole card, or a real draw, is showdown value.
       High cards only (or just the board's pair) vs a bet = fold unless the price is absurdly good. */
    const usesHole=myScore[0]>=1&&myScore[0]<=2&&p.hole.some(c=>c.r===myScore[1]);
    const noMade=myScore[0]===0||(myScore[0]<=2&&!usesHole);
    const goodDraw=d&&(d.flush||d.oesd||d.doubleGutshot);
    airPen=(noMade&&!goodDraw)?0.15:0;
    underpairInfo=coachUnderpairRealization(p.hole,state.board,betRatio,actsFirst,d,{
      callAmt,pot,stackBefore:p.chips
    });
    underpairPen=underpairInfo?underpairInfo.penalty:0;
    const multiwayContinuePen=multiwayContinueInfo?.penalty||0;
    eqAdj=clamp(eq-bigBetPen-airPen-underpairPen-multiwayContinuePen+
      exploitAdj+blockAdj+diffAggAdj,0,1);
    const edge=eqAdj-decisionNeed;
    if(bigBetPen>=0.05) extra.push(C('bigBet',Math.round(betRatio*100)));
    if(d&&d.gutshot&&!d.doubleGutshot&&!d.oesd&&!d.flush&&betRatio>=0.5) extra.push(C('gutWarn'));
    if(airPen){
      if(d&&d.gutshot&&!d.doubleGutshot)extra.push(C('weakDrawWarn'));
      else if(backdoorFlush)extra.push(C('backdoorFlushWarn'));
      else if(d?.backdoorStraight)extra.push(C('backdoorStraightWarn'));
      else extra.push(C('airWarn'));
    }
    if(underpairInfo)extra.push(C('underpairRealization',underpairInfo.overcards,Math.round(underpairPen*100),
      Math.round(betRatio*100),actsFirst,underpairInfo.backdoors,
      Math.round(underpairInfo.callFraction*100),underpairInfo.sprAfter===null?'—':Math.round(underpairInfo.sprAfter*10)/10));
    extra.push(C('mentalMath',usd(callAmt),usd(pot+callAmt),pct(odds)));
    if(eqAdj>0.68+posAdj&&!drawOnly){
      rec='RAISE';
      why.push(C('raiseVal',pct(eq)));
    }else if(edge>=0){
      rec='CALL';
      why.push(C('callOk',usd(callAmt),usd(pot),pct(odds),pct(eq),
        !!(bigBetPen||airPen||underpairPen),pct(eqAdj),pct(decisionNeed)));
      if(state.stage==='flop'&&actsLast&&agg?.lineRead==='cbet'&&(madeScore?.[0]<2||eqAdj<=.68))
        {extra.push(C('floatPlan'));concepts.push('floatPlan');}
    }else{
      rec='FOLD';
      why.push(multiwayContinueInfo
        ?C('pairedBoardBetCall',multiwayContinueInfo.callers,multiwayContinueInfo.opps,
          rankPl(multiwayContinueInfo.privatePairRank),rankNm(multiwayContinueInfo.kicker),multiwayContinueInfo.overcards)
        :C('foldAdv',pct(odds),usd(callAmt),usd(pot),pct(eqAdj),!!bigBetPen,pct(decisionNeed)));
    }
  }
  /* Normally the engine runs the board automatically when action is locked, but
     the coach can render during that transition or from a restored snapshot.
     With nobody left able to respond, betting and bluffing have zero purpose. */
  if(bettingLocked){
    why=[];
    if(callAmt<=0){
      rec='CHECK';
      why.push(C('weakFree',pct(eqAdj)));
    }else if(eqAdj>=decisionNeed){
      rec='CALL';
      why.push(C('callOk',usd(callAmt),usd(pot),pct(odds),pct(eq),
        eqAdj!==eq,pct(eqAdj),pct(decisionNeed)));
    }else{
      rec='FOLD';
      why.push(C('foldAdv',pct(odds),usd(callAmt),usd(pot),pct(eqAdj),
        eqAdj!==eq,pct(decisionNeed)));
    }
  }
  /* Every live opponent gets a matrix. Current aggressor first, then checked/acted players. */
  if(state.stage!=='preflop'){
    const villains=coachRelevantVillains(p);
    rangeCharts=villains.map(v=>coachRangeChartInfo(v,p,difficultyApplies,difficulty)).filter(Boolean);
    if(rangeCharts.length){
      chartInfo=rangeCharts[0];
      rangeCharts.slice(0,3).forEach((info,i)=>{
        const likely=rangeMostLikelyCodes(info,6);
        if(likely.length)extra.push(C('rangeLikelyHands',info.playerName||villains[i]?.name||info.pos,likely.join(', ')));
      });
    }
  }
  if(state.stage==='turn'){
    const strongDraw=!!(drawInfo&&(drawInfo.flush?.length>=8||drawInfo.straight?.length>=8));
    const plan=(rec==='RAISE'||rec==='ALLIN')&&madeScore?.[0]>=2?'value':
      (rec==='RAISE'||rec==='CALL')&&strongDraw?'draw':
      rec==='CHECK'||(rec==='CALL'&&madeScore?.[0]>=1)?'control':'giveup';
    extra.push(C('turnPlan',plan));
    concepts.push('turnPlan');
  }
  let coachT=0, sizePlan=null, postSizePlan=null;
  if(rec==='RAISE'||rec==='ALLIN'){
    let t;
    if(rec==='ALLIN') t=p.bet+p.chips;
    else if(state.stage==='preflop'){
      sizePlan=coachPreflopRaiseSizing(p,actsLast);
      t=sizePlan.target;
    }else if(callAmt>0){
      postSizePlan=coachPostflopRaiseSizing(p,pot,callAmt);
      t=postSizePlan.target;
    }else{
      const sizingPot=concepts.includes('sidePotCbet')&&sidePotInfo?.amount>0?sidePotInfo.amount:pot;
      postSizePlan=coachPostflopOpenSizing(sizingPot,smallStab,madeScore,drawInfo);
      t=state.currentBet+Math.max(state.lastRaiseSize,Math.round(postSizePlan.target));
    }
    coachT=clamp(Math.round(t/state.sb)*state.sb, state.currentBet+state.lastRaiseSize, p.bet+p.chips);
    if(sizePlan) extra.push(sizePlan.kind==='fourBet'
      ?C('fourBetSize',usd(coachT),bbs(coachT),Math.round(sizePlan.mult*10)/10)
      :sizePlan.kind==='threeBet'?C('threeBetSize',usd(coachT),bbs(coachT),usd(state.currentBet),sizePlan.callers,sizePlan.posKey)
      :sizePlan.kind==='open'?C('pfOpenSize',usd(coachT),bbs(coachT),sizePlan.posKey,sizePlan.anteAdj)
      :C('pfRaiseSize',usd(coachT),bbs(coachT),sizePlan.posKey,sizePlan.callers,sizePlan.anteAdj,
        sizePlan.depthAdj,Math.round(sizePlan.effectiveBB||0)));
    if(postSizePlan){
      if(callAmt>0)extra.push(C('postflopRaiseSize',usd(coachT),bbs(coachT),Math.round(postSizePlan.mult*10)/10,usd(callAmt),Math.round(postSizePlan.betRatio*100)));
      else extra.push(C('textureSize',postSizePlan.texture,Math.round(postSizePlan.ratio*100)));
      if(callAmt===0)concepts.push('textureSizing');
    }
  }
  /* rough chip-EV per available action (for blunder tracking) */
  const evRaiseTarget=state.stage==='preflop'
      ? coachPreflopRaiseSizing(p,actsLast).target
      : callAmt>0
      ? coachPostflopRaiseSizing(p,pot,callAmt).target
      : state.currentBet+Math.max(state.lastRaiseSize,Math.round(
          coachPostflopOpenSizing(pot,smallStab,madeScore,drawInfo).target));
  const tEv=clamp(Math.round(evRaiseTarget/state.sb)*state.sb,
    state.currentBet+state.lastRaiseSize, p.bet+p.chips);
  const FE=bettingLocked?0:clamp(0.42-0.09*(opps-1),0.08,0.45); // all-in-only response has zero fold equity
  const evR=A=>FE*pot+(1-FE)*(eq*(pot+2*A)-A);             // raise A more chips
  const evs={
    FOLD:0,
    CALL:Math.round(callAmt>0
      ?(preflopCallInfo?preflopCallInfo.callEv:
        eqAdj*(pot+callAmt)-callAmt+(impliedInfo?.hitChance||0)*(impliedInfo?.futureChips||0))
      :eq*pot),
    RAISE:Math.round(evR(rec==='ALLIN' ? p.chips : tEv-p.bet))
  };
  if(bettingLocked)evs.RAISE=evs.CALL;
  const raiseInvestment=Math.max(0,(rec==='ALLIN'?p.bet+p.chips:coachT)-p.bet);
  const aggressorAllIn=state.stage==='preflop'&&state.lastAggIdx>=0&&
    state.players[state.lastAggIdx]?.allIn;
  if(strategyMode==='short-allin'||bettingLocked||(state.stage==='preflop'&&aggressorAllIn))
    strategyMode='allin';
  else if(strategyMode==='baseline'&&state.stage==='preflop'&&chartInfo&&chartInfo.kind!=='range')
    strategyMode='chart';
  if(strategyMode!=='exploit'&&icmPrem>=.005&&callAmt>0)
    strategyMode=strategyMode==='allin'?'icm-allin':'icm';
  const bluffBreakEven=!bettingLocked&&!aggressorAllIn&&(rec==='RAISE'||rec==='ALLIN')&&raiseInvestment>0
    ?raiseInvestment/Math.max(pot+raiseInvestment,1):null;
  const bluffInfo=coachBluffAssessment(p,{rec,madeScore,drawInfo,eqAdj,callAmt,pot,opps,
    actsLast,concepts,smallStab,bluffBreakEven,baseFoldEquity:FE,code,bettingLocked});
  coachSpotBrief(p,extra,{eq,eqAdj,odds,needEq:callAmt>0?decisionNeed:null,
    callAmt,pot,opps,pos,actsFirst,actsLast,airPen});
  const result={rec,coachT,evs,why,extra,handDesc,drawRow,eq,eqAdj,airPen,underpairPen,underpairInfo,flushInfo,odds,callAmt,pot,opps,pos,early,late,
          actsFirst,actsLast,ordIdx,ordLen:ord.length,M,mZone,icmPrem,icmActive,icmInfo,chartInfo,rangeCharts,code,spr,sprZone,
          preflopCallInfo,drawInfo,impliedInfo,drySidePot,sidePotInfo,multiwayContinueInfo,needEq:decisionNeed,
          strategyMode,bluffBreakEven,modeledFoldEquity:bluffInfo?bluffInfo.estimatedFolds:0,
          bluffInfo,actionIntent:bluffInfo?bluffInfo.intent:rec.toLowerCase(),concepts,postSizePlan};
  return typeof solverApplyCoachStrategy==='function'?solverApplyCoachStrategy(p,result):result;
}

/* 13×13 range-matrix viewer: shows the chart the coach just used, hero's hand outlined */
function coachRelevantVillains(hero){
  return inHand().filter(q=>q!==hero).sort((a,b)=>{
    const relevance=q=>(q.i===state.lastAggIdx?1000:0)+(q.checkedStreet?100:0)+(q.acted?25:0)+(q.checkStreets||[]).length*10;
    return relevance(b)-relevance(a);
  });
}
function coachRangeChartInfo(villain,hero,difficultyApplies,difficulty,solved=undefined){
  const solverRange=typeof solverRangeChartData==='function'
    ?solverRangeChartData(villain,hero,solved):null;
  if(solverRange?.covered){
    if(solverRange.pending)return null;
    return {kind:'range',sourceKind:'solver',nodeReach:solverRange.nodeReach,
      reachSource:solverRange.reachSource,rangeSource:solverRange.rangeSource,
      rangeLine:solverRange.rangeLine,rangeNodes:solverRange.rangeNodes,
      rangeExactFrequencies:solverRange.rangeExactFrequencies,
      rawWeights:solverRange.weights,actionHistory:solverRange.actionHistory,
      seat:villain.i,playerName:villain.name,
      pos:`${villain.name}${villain.pos?' ('+villain.pos+')':''}`,list:[],model:null,cap:1,floor:0,
      board:state.board.slice(),dead:hero.hole.slice(),sample:null,sampleConfidence:null};
  }
  let cap=clamp(villain.rangeCap||1,0.03,1),floor=clamp(villain.rangeFloor||0,0,0.25);
  if(difficultyApplies){const adjusted=coachDifficultyRange(villain,cap,floor,difficulty);cap=adjusted.cap;floor=adjusted.floor;}
  floor=Math.min(floor,cap*0.5);
  const list=HAND_ORDER.filter(h=>{const pct=handPct[h];return pct<=cap&&pct>floor;});
  const tendency=typeof rangeTendencyRead==='function'?rangeTendencyRead(villain):null;
  const sample=Math.max(0,tendency?.sample??villain.observedActions??0);
  const sampleConfidence=sample>=60?'reliable':sample>=15?'tentative':'early';
  return {kind:'range',sourceKind:'estimated',seat:villain.i,playerName:villain.name,
    pos:`${villain.name}${villain.pos?' ('+villain.pos+')':''}`,list,
    model:villain.rangeModel?Object.assign({},villain.rangeModel):null,cap,floor,
    board:state.board.slice(),dead:hero.hole.slice(),sample,sampleConfidence};
}
function coachSolverRangeCharts(hero,solved){
  return coachRelevantVillains(hero)
    .map(villain=>coachRangeChartInfo(villain,hero,false,'hard',solved))
    .filter(info=>info&&info.sourceKind==='solver');
}
function rangeComboDrawOrAir(hole,board){
  if(board.length<5){
    const draw=detectDraws(hole,board);
    if(draw.flush||draw.oesd||draw.gutshot)return 'drawOnly';
  }
  return 'air';
}
/* Mutually exclusive current-hand bucket for one exact two-card combo. Rank-only
   matrix cells cannot provide this because AQs, for example, merges four suits. */
function rangeComboCurrentClass(hole,board){
  if(!board||board.length<3)return null;
  const score=evalBest(hole.concat(board)),category=score[0];
  const usesHole=handUsesHoleCards(hole,board,score);
  if(!usesHole)return category===1?rangeComboDrawOrAir(hole,board):category===0?rangeComboDrawOrAir(hole,board):'boardOnly';
  if(category===8)return 'fullHousePlus';
  if(category===7||category===6)return 'fullHousePlus';
  if(category===5)return 'flush';
  if(category===4)return 'straight';
  if(category===3)return 'trips';
  if(category===2)return 'twoPair';
  if(category===1)return 'onePair';
  return rangeComboDrawOrAir(hole,board);
}
/* Draw texture is an overlay rather than a made-hand bucket: a combo may be
   both one pair and a draw. Keep exact suits here so A♣Q♣ and the other AQs
   combinations are not described as if they had the same flush potential. */
function rangeComboDrawFeatures(hole,board){
  if(!board||board.length<3||board.length>=5)return [];
  const draw=detectDraws(hole,board),features=[];
  const straight=!!(draw.oesd||draw.doubleGutshot||draw.gutshot);
  if(draw.flush){
    let nut=false;
    for(let suit=0;suit<4;suit++){
      const suited=hole.filter(c=>c.s===suit);
      if(!suited.length||suited.length+board.filter(c=>c.s===suit).length!==4)continue;
      const known=new Set(hole.concat(board).filter(c=>c.s===suit).map(c=>c.r));
      const highestMissing=Math.max(0,...Array.from({length:13},(_,i)=>i+2).filter(r=>!known.has(r)));
      if(Math.max(...suited.map(c=>c.r))>highestMissing)nut=true;
    }
    features.push(nut?'nutFlushDraw':'nonNutFlushDraw');
  }
  if(straight)features.push('straightDraw');
  if(draw.flush&&straight)features.push('comboDraw');
  const backdoorFlush=board.length===3&&!!coachBackdoorFlushInfo(hole,board);
  if(!draw.flush&&!straight&&(backdoorFlush||draw.backdoorStraight))
    features.push('backdoorDraw');
  const score=evalBest(hole.concat(board));
  if(score[0]>=1&&(draw.flush||straight))features.push('pairPlusDraw');
  return features;
}
function rangeHandClassVector(board){
  if(!board||board.length<3)return null;
  const key=board.map(c=>c.r*4+c.s).sort((a,b)=>a-b).join('-');
  if(!state._rangeHandClassCache)state._rangeHandClassCache=Object.create(null);
  if(state._rangeHandClassCache[key])return state._rangeHandClassCache[key];
  const dead=new Set(board.map(c=>c.r*4+c.s)),out=[];
  for(let i=0;i<FULL_DECK.length;i++)for(let j=i+1;j<FULL_DECK.length;j++)
    out.push(dead.has(FULL_DECK[i].r*4+FULL_DECK[i].s)||dead.has(FULL_DECK[j].r*4+FULL_DECK[j].s)
      ?null:rangeComboCurrentClass([FULL_DECK[i],FULL_DECK[j]],board));
  state._rangeHandClassCache[key]=out;
  return out;
}
function rangeDrawFeatureVector(board){
  if(!board||board.length<3||board.length>=5)return null;
  const key=board.map(c=>c.r*4+c.s).sort((a,b)=>a-b).join('-');
  if(!state._rangeDrawFeatureCache)state._rangeDrawFeatureCache=Object.create(null);
  if(state._rangeDrawFeatureCache[key])return state._rangeDrawFeatureCache[key];
  const dead=new Set(board.map(c=>c.r*4+c.s)),out=[];
  for(let i=0;i<FULL_DECK.length;i++)for(let j=i+1;j<FULL_DECK.length;j++)
    out.push(dead.has(FULL_DECK[i].r*4+FULL_DECK[i].s)||dead.has(FULL_DECK[j].r*4+FULL_DECK[j].s)
      ?null:rangeComboDrawFeatures([FULL_DECK[i],FULL_DECK[j]],board));
  state._rangeDrawFeatureCache[key]=out;
  return out;
}
function rangeMatrixMetrics(info){
  if(info._rangeMetrics)return info._rangeMetrics;
  if(info.snapshotMetrics){
    const s=info.snapshotMetrics,available=s.available||Object.create(null);
    if(!s.available){
      const dead=new Set((info.board||[]).concat(info.dead||[]).map(c=>c.r*4+c.s));
      for(let i=0;i<FULL_DECK.length;i++)for(let j=i+1;j<FULL_DECK.length;j++){
        const a=FULL_DECK[i],b=FULL_DECK[j];
        if(dead.has(a.r*4+a.s)||dead.has(b.r*4+b.s))continue;
        const code=holeCode([a,b]);available[code]=(available[code]||0)+1;
      }
    }
    const lift=s.lift||Object.create(null);
    if(!s.lift)for(const code of Object.keys(s.mass||{}))
      lift[code]=(s.mass[code]/Math.max(available[code]||1,1))*(s.legal||1);
    return info._rangeMetrics={mass:s.mass||{},available,active:s.active||available,lift,
      composition:s.composition||null,classMass:s.classMass||{},
      drawFeatures:s.drawFeatures||null,classDrawFeatures:s.classDrawFeatures||{},
      effective:s.effective||0,legal:s.legal||0};
  }
  const mass=Object.create(null),available=Object.create(null),active=Object.create(null),comboWeights=[];
  if(info.kind!=='range'){
    for(const code of info.list||[]){mass[code]=1;available[code]=1;}
    return info._rangeMetrics={mass,available,lift:mass,composition:null,effective:(info.list||[]).length,legal:(info.list||[]).length};
  }
  const dead=new Set((info.board||[]).concat(info.dead||[]).map(c=>c.r*4+c.s));
  const classVector=rangeHandClassVector(info.board||[]),drawVector=rangeDrawFeatureVector(info.board||[]);
  const composition=Object.create(null),classMass=Object.create(null);
  const drawFeatures=Object.create(null),classDrawFeatures=Object.create(null);
  let total=0,legal=0,k=0;
  for(let i=0;i<FULL_DECK.length;i++)for(let j=i+1;j<FULL_DECK.length;j++,k++){
    const a=FULL_DECK[i],b=FULL_DECK[j];
    if(dead.has(a.r*4+a.s)||dead.has(b.r*4+b.s))continue;
    const code=holeCode([a,b]);available[code]=(available[code]||0)+1;legal++;
    let w=null;
    if(info.sourceKind==='solver'){
      const solverIndex=typeof solverPairIndex==='function'&&typeof solverCardId==='function'
        ?solverPairIndex(solverCardId(a),solverCardId(b)):-1;
      w=solverIndex>=0?Math.max(0,Number(info.rawWeights?.[solverIndex])||0):0;
    }else if(info.model&&typeof rangeModelPosteriorWeight==='function')w=rangeModelPosteriorWeight(info.model,[a,b]);
    if(w===null&&info.sourceKind!=='solver'){
      if(info.model&&typeof rangeModelComboWeight==='function')w=rangeModelComboWeight(info.model,[a,b],info.board||[],info.cap,info.floor);
      else w=(info.list||[]).includes(holeCode([a,b]))?1:0;
    }
    if(w<=0)continue;
    active[code]=(active[code]||0)+1;
    mass[code]=(mass[code]||0)+w;total+=w;comboWeights.push(w);
    if(classVector){
      const bucket=classVector[k];
      composition[bucket]=(composition[bucket]||0)+w;
      const byCode=classMass[code]||(classMass[code]=Object.create(null));
      byCode[bucket]=(byCode[bucket]||0)+w;
    }
    for(const feature of drawVector?.[k]||[]){
      drawFeatures[feature]=(drawFeatures[feature]||0)+w;
      const byCode=classDrawFeatures[code]||(classDrawFeatures[code]=Object.create(null));
      byCode[feature]=(byCode[feature]||0)+w;
    }
  }
  if(total>0)for(const code of Object.keys(mass))mass[code]/=total;
  if(total>0)for(const bucket of Object.keys(composition))composition[bucket]/=total;
  if(total>0)for(const code of Object.keys(classMass))
    for(const bucket of Object.keys(classMass[code]))classMass[code][bucket]/=total;
  if(total>0)for(const feature of Object.keys(drawFeatures))drawFeatures[feature]/=total;
  if(total>0)for(const code of Object.keys(classDrawFeatures))
    for(const feature of Object.keys(classDrawFeatures[code]))classDrawFeatures[code][feature]/=total;
  const lift=Object.create(null);
  for(const code of Object.keys(mass))lift[code]=(mass[code]/Math.max(available[code]||1,1))*legal;
  let sq=0;for(const w of comboWeights){const n=w/Math.max(total,1e-12);sq+=n*n;}
  return info._rangeMetrics={mass,available,active,lift,composition:classVector?composition:null,classMass,
    drawFeatures:drawVector?drawFeatures:null,classDrawFeatures,
    effective:Math.round(1/Math.max(sq,1/Math.max(legal,1))),legal};
}
function rangeMatrixMassMap(info){
  return rangeMatrixMetrics(info).mass;
}
function rangeMatrixWeight(code,info){
  return rangeMatrixMassMap(info)[code]||0;
}
function rangeMostLikelyCodes(info,n=8){
  return HAND_ORDER.map(code=>({code,w:rangeMatrixWeight(code,info)}))
    .filter(x=>x.w>0).sort((a,b)=>b.w-a.w).slice(0,n)
    .map(x=>`${x.code} (${x.w>=0.001?Math.round(x.w*1000)/10:Math.round(x.w*10000)/100}%)`);
}
function rangeMatrixCells(info,heroCode,compact=false,mode='density',filter='all'){
  const R=['A','K','Q','J','T','9','8','7','6','5','4','3','2'];
  const inSet2=new Set(info.list2||[]),metrics=rangeMatrixMetrics(info);
  const cells=[];
  for(let i=0;i<13;i++)for(let j=0;j<13;j++){
    const h=i===j?R[i]+R[j]:i<j?R[i]+R[j]+'s':R[j]+R[i]+'o';
    const mass=metrics.mass[h]||0,lift=metrics.lift[h]||0,combos=metrics.available[h]||0;
    cells.push({h,mass,lift,combos,in2:inSet2.has(h),me:h===heroCode});
  }
  const html=cells.map(c=>{
    const buckets=metrics.classMass?.[c.h]||{},features=metrics.classDrawFeatures?.[c.h]||{};
    const madeMass=['fullHousePlus','flush','straight','trips','twoPair','onePair'].reduce((s,k)=>s+(buckets[k]||0),0);
    const visible=filter==='all'||(filter==='made'?madeMass:filter==='draws'?buckets.drawOnly:
      filter==='air'?(buckets.air||0)+(buckets.boardOnly||0):(buckets[filter]||0)+(features[filter]||0))>0;
    const score=mode==='mass'?c.mass:c.lift;
    const tier=info.kind!=='range'?(c.mass>0?' rw4':''):mode==='mass'
      ?score>=0.02?' rw4':score>=0.01?' rw3':score>=0.0035?' rw2':score>=0.0003?' rw1':''
      :score>=4?' rw4':score>=2?' rw3':score>=0.8?' rw2':score>=0.2?' rw1':'';
    const probability=c.mass>=0.001?`${Math.round(c.mass*1000)/10}%`:`${Math.round(c.mass*10000)/100}%`;
    const title=info.kind==='range'?` · ${probability} ${T('rangeOfRange')} · ${c.combos} ${T('rangeCombos')} · ${Math.round(c.lift*10)/10}× ${T('rangeAvgCombo')}`:'';
    return `<div class="cc${tier}${c.in2?' in2':''}${c.me?' me':''}${visible?'':' range-filtered'}" data-range-code="${c.h}" tabindex="${compact?'-1':'0'}" title="${c.h}${title}"><span>${c.h}</span>${!compact&&info.kind==='range'&&c.mass>0?`<small>${probability}</small>`:''}</div>`;
  }).join('');
  return `<div class="range-grid${compact?' compact':''}">${html}</div>`;
}
function rangeSnapshot(info){
  if(!info||info.kind!=='range')return null;
  const m=rangeMatrixMetrics(info),plain=x=>JSON.parse(JSON.stringify(x||{}));
  return {kind:'range',pos:info.pos,seat:info.seat,playerName:info.playerName,
    sourceKind:info.sourceKind||'estimated',nodeReach:info.nodeReach===true,
    reachSource:info.reachSource||null,rangeSource:info.rangeSource||null,
    rangeLine:info.rangeLine||null,rangeNodes:plain(info.rangeNodes||[]),
    rangeExactFrequencies:info.rangeExactFrequencies===true,cap:info.cap,floor:info.floor,
    board:(info.board||[]).map(c=>({r:c.r,s:c.s})),dead:(info.dead||[]).map(c=>({r:c.r,s:c.s})),
    actionHistory:plain(info.actionHistory||[]),
    model:info.sourceKind==='solver'?null:{history:plain(info.model?.history||[])},
    snapshotMetrics:{mass:plain(m.mass),available:plain(m.available),active:plain(m.active),
      composition:plain(m.composition),
      classMass:plain(m.classMass),drawFeatures:plain(m.drawFeatures),
      classDrawFeatures:plain(m.classDrawFeatures),effective:m.effective,legal:m.legal}};
}
function rangeMatrixTitle(info){
  return T(info?.sourceKind==='solver'?'chartTitleSolverRange':'chartTitleRange');
}
function rangeMatrixLegend(){
  return `<div class="range-heat-legend"><span><i class="rw1"></i>${T('rangeFringe')}</span><span><i class="rw2"></i>${T('rangePossible')}</span><span><i class="rw3"></i>${T('rangeLikely')}</span><span><i class="rw4"></i>${T('rangeVeryLikely')}</span></div>`;
}
function rangeActionTrail(info){
  const history=info.actionHistory?.length?info.actionHistory:(info.model?.history||[]);
  return history.map(h=>{
    const street=h.street==='preflop'?T('preflop'):h.street==='flop'?T('flop'):h.street==='turn'?T('turnSt'):T('riverSt');
    if(['raise','bet','allin'].includes(h.action)){
      const ratio=h.actionPotRatio||h.ratio||h.betRatio||0;
      const size=h.targetBB?` ${Math.round(h.targetBB*10)/10} BB`:ratio?` ${Math.round(ratio*100)}% pot`:'';
      if(h.street==='preflop'){
        const action=h.nodeType==='limpedPot'?T('rangeIso'):h.nodeType==='squeeze'?T('rangeSqueeze'):
          h.raiseOrdinal===1?T('rangeOpen'):h.raiseOrdinal===2?'3-bet':h.raiseOrdinal===3?'4-bet':h.raiseOrdinal>=4?'5-bet':T('raiseW');
        return `${action}${size}`;
      }
      const action=h.action==='allin'?T('allin'):(h.action==='raise'||h.raisesBefore>0?T('raiseW'):T('betW'));
      return `${action} ${street}${size}`;
    }
    if(h.action==='check')return h.street==='preflop'?`${T('rangeOption')} ${T('preflop')}`:`${T('check')} ${street}`;
    if(h.action==='call'){
      if(h.street==='preflop'&&h.nodeType==='open'&&(h.cbBB||0)<=1)return `${T('rangeLimp')} ${T('preflop')}`;
      return `${T('call')} ${h.callBB||''}${h.callBB?' BB ':''}${street}`;
    }
    return `${h.action} ${street}`;
  }).join(' → ');
}
function rangeCurrentStreet(info){
  const n=(info.board||[]).length;
  return n<3?'preflop':n===3?'flop':n===4?'turn':'river';
}
function rangeEnteringStreetHtml(info){
  const current=rangeCurrentStreet(info),history=info.actionHistory?.length?info.actionHistory:(info.model?.history||[]),last=history.at(-1);
  if(current==='preflop'||last?.street===current)return '';
  const street=current==='flop'?T('flop'):current==='turn'?T('turnSt'):T('riverSt');
  return `<div class="range-line range-entering">${T('rangeEntering')(street)}</div>`;
}
function rangePct(w){
  return w>=0.001?Math.round(w*1000)/10:Math.round(w*10000)/100;
}
function rangeCompositionHtml(composition){
  if(!composition)return '';
  const order=[
    ['fullHousePlus','rangeFullHousePlus'],['flush','rangeMadeFlushes'],
    ['straight','rangeStraights'],['trips','rangeTrips'],['twoPair','rangeTwoPair'],
    ['onePair','rangeOnePair'],['drawOnly','rangeDrawOnly'],['air','rangeAir'],
    ['boardOnly','rangeBoardOnly']
  ];
  const parts=order.filter(([bucket])=>(composition[bucket]||0)>0)
    .map(([bucket,key])=>`${T(key)} ≈ ${rangePct(composition[bucket])}%`);
  return parts.length
    ?`<div class="range-line range-read range-composition"><b>${T('rangeComposition')}:</b> ${parts.join(' · ')}</div>`
    :'';
}
function rangeDrawFeaturesHtml(features){
  if(!features)return '';
  const order=[
    ['comboDraw','rangeComboDraw'],['nutFlushDraw','rangeNutFlushDraw'],
    ['nonNutFlushDraw','rangeNonNutFlushDraw'],['straightDraw','rangeStraightDraw'],
    ['pairPlusDraw','rangePairPlusDraw'],['backdoorDraw','rangeBackdoorDraw']
  ];
  const parts=order.filter(([bucket])=>(features[bucket]||0)>0)
    .map(([bucket,key])=>`${T(key)} ≈ ${rangePct(features[bucket])}%`);
  return parts.length
    ?`<div class="range-line range-read range-draw-features"><b>${T('rangeDrawBreakdown')}:</b> ${parts.join(' · ')}</div>`
    :'';
}
function rangeComboBaseline(code){
  return code.length===2?6:code.endsWith('s')?4:12;
}
function rangeCellWeightReason(info,code,lift,active,available){
  const history=info.actionHistory?.length?info.actionHistory:(info.model?.history||[]),last=history.at(-1),action=last?.action||'';
  const direction=lift>=1.15?'up':lift<=0.75?'down':'flat';
  if(info.sourceKind==='solver')return T('rangeWeightSolver')(Math.round(lift*10)/10,code)+
    (available<rangeComboBaseline(code)?` ${T('rangeBlockerImpact')(rangeComboBaseline(code)-available)}`:'')+
    (active<available?` ${T('rangeActionRemoved')(available-active)}`:'');
  const actionKey=action==='raise'?'rangeWeightRaise':action==='call'?'rangeWeightCall':
    action==='check'?'rangeWeightCheck':'rangeWeightPrior';
  return T(actionKey)(direction,Math.round(lift*10)/10,code)+
    (available<rangeComboBaseline(code)?` ${T('rangeBlockerImpact')(rangeComboBaseline(code)-available)}`:'')+
    (active<available?` ${T('rangeActionRemoved')(available-active)}`:'');
}
function rangeMatrixMetaHtml(info,controls=false,mode='density'){
  if(info.kind!=='range')return '';
  const metrics=rangeMatrixMetrics(info),trail=rangeActionTrail(info),top=rangeMostLikelyCodes(info,5).join(' · ');
  const topRank=(info.board||[]).length?Math.max(...info.board.map(c=>c.r)):0,topChar=topRank?RANK_CH[topRank]:'',topCode=topRank?CODE_R[topRank]:'';
  const topCardMass=topCode?Object.keys(metrics.mass).reduce((s,code)=>s+(code.slice(0,2).includes(topCode)?metrics.mass[code]:0),0):0;
  const topCardPct=rangePct(topCardMass);
  const sampleLine=info.sample!=null
    ?`<div class="range-line"><b>${T('readConfidence')}:</b> ${T('readSample')(info.sample)} · ${T('readConfidence'+
      (info.sampleConfidence==='reliable'?'Reliable':info.sampleConfidence==='tentative'?'Tentative':'Early'))}</div>`:'';
  const sourceLine=info.sourceKind==='solver'
    ?`<div class="range-line range-solver-source"><b>${T('rangeSource')}:</b> ${T(info.nodeReach?'rangeSolverNode':'rangeSolverStreet')}</div>`:'';
  return `<div class="range-meta"><span>≈${metrics.effective} ${T('rangeEffective')}</span>`+
    (controls?`<span class="range-mode"><button data-range-mode="density" class="${mode==='density'?'on':''}">${T('rangeDensity')}</button><button data-range-mode="mass" class="${mode==='mass'?'on':''}">${T('rangeClassProb')}</button></span>`:`<span>${T('rangeDensity')}</span>`)+
    `</div>${sourceLine}${sampleLine}${trail?`<div class="range-line"><b>${T('rangeLine')}:</b> ${trail}</div>`:''}`+
    rangeEnteringStreetHtml(info)+
    rangeCompositionHtml(metrics.composition)+
    rangeDrawFeaturesHtml(metrics.drawFeatures)+
    (topCardMass?`<div class="range-line range-read"><b>${T('rangeTopCard')}:</b> ${topChar}x ≈ ${topCardPct}%</div>`:'')+
    (top?`<div class="range-line range-top"><b>${T('rangeTopHands')}:</b> ${top}</div>`:'');
}
function showChartMatrix(info,heroCode,alternatives=null){
  if(!HAS_DOM||!info)return;
  const ranges=alternatives?.length?alternatives:[info];
  let active=info,mode='density',filter='all',selected='';
  const bucketLabels={
    fullHousePlus:'rangeFullHousePlus',flush:'rangeMadeFlushes',straight:'rangeStraights',
    trips:'rangeTrips',twoPair:'rangeTwoPair',onePair:'rangeOnePair',drawOnly:'rangeDrawOnly',
    air:'rangeAir',boardOnly:'rangeBoardOnly'
  };
  const featureLabels={
    comboDraw:'rangeComboDraw',nutFlushDraw:'rangeNutFlushDraw',
    nonNutFlushDraw:'rangeNonNutFlushDraw',straightDraw:'rangeStraightDraw',
    pairPlusDraw:'rangePairPlusDraw',backdoorDraw:'rangeBackdoorDraw'
  };
  const detail=code=>{
    const m=rangeMatrixMetrics(active),mass=m.mass[code]||0,combos=m.available[code]||0;
    const liveCombos=m.active?.[code]||0,lift=m.lift[code]||0;
    if(!mass)return `<div class="range-cell-empty">${T('rangeUnavailable')}</div>`;
    const buckets=m.classMass?.[code]||{},parts=Object.keys(bucketLabels)
      .filter(k=>(buckets[k]||0)>0)
      .map(k=>`${T(bucketLabels[k])} ${Math.round((buckets[k]/mass)*100)}%`);
    const features=m.classDrawFeatures?.[code]||{},drawParts=Object.keys(featureLabels)
      .filter(k=>(features[k]||0)>0)
      .map(k=>`${T(featureLabels[k])} ${Math.round((features[k]/mass)*100)}%`);
    return `<div class="range-cell-title">${code} · ${rangePct(mass)}%</div>`+
      `<p>${T('rangeCellShare')(code,rangePct(mass),liveCombos,combos)}</p>`+
      `<p>${T('rangeCellDensity')(Math.round(lift*10)/10+'×')}</p>`+
      `<p class="range-cell-reason">${rangeCellWeightReason(active,code,lift,liveCombos,combos)}</p>`+
      (parts.length?`<div class="range-cell-mix"><b>${T('rangeCellMix')}:</b> ${parts.join(' · ')}</div>`:'')+
      (drawParts.length?`<div class="range-cell-mix"><b>${T('rangeDrawBreakdown')}:</b> ${drawParts.join(' · ')}</div>`:'');
  };
  const controls=()=>active.kind!=='range'?'':`<div class="range-explorer-controls">`+
    (ranges.length>1?ranges.map((x,i)=>`<button type="button" data-range-opponent="${i}" class="${active===x?'on':''}">${x.pos}</button>`).join(''):'')+
    `<span>${T('rangeFilter')}</span>`+
    [['all','rangeFilterAll'],['made','rangeFilterMade'],['draws','rangeFilterDraws'],
      ['nutFlushDraw','rangeFilterNut'],['nonNutFlushDraw','rangeFilterNonNut'],
      ['backdoorDraw','rangeFilterBackdoor'],['air','rangeFilterAir']]
      .map(([v,k])=>`<button type="button" data-range-filter="${v}" class="${filter===v?'on':''}">${T(k)}</button>`).join('')+
    `</div>`;
  const paint=()=>{
    $('chartGrid').innerHTML=rangeMatrixCells(active,heroCode,false,mode,filter);
    $('chartRangeMeta').innerHTML=rangeMatrixMetaHtml(active,true,mode)+controls();
    $('chartCellDetail').innerHTML=active.kind==='range'
      ?(selected?detail(selected):`<div class="range-cell-empty">${T('rangePick')}</div>`):'';
    $('chartRangeMeta').querySelectorAll('[data-range-mode]').forEach(btn=>btn.onclick=()=>{mode=btn.dataset.rangeMode;paint();});
    $('chartRangeMeta').querySelectorAll('[data-range-filter]').forEach(btn=>btn.onclick=()=>{filter=btn.dataset.rangeFilter;selected='';paint();});
    $('chartRangeMeta').querySelectorAll('[data-range-opponent]').forEach(btn=>btn.onclick=()=>{
      active=ranges[Number(btn.dataset.rangeOpponent)]||active;selected='';paint();
      $('chartTitle').textContent=`${active.pos} — ${rangeMatrixTitle(active)}`;
    });
    $('chartGrid').querySelectorAll('[data-range-code]').forEach(cell=>{
      const choose=()=>{selected=cell.dataset.rangeCode;$('chartCellDetail').innerHTML=detail(selected);
        $('chartGrid').querySelectorAll('.selected').forEach(x=>x.classList.remove('selected'));cell.classList.add('selected');};
      cell.onclick=choose;
      cell.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose();}};
    });
    if(active.kind==='range')$('chartLegend').innerHTML=rangeMatrixLegend();
  };
  paint();
  const titleKey=active.kind==='rfi'?'chartTitleOpen':active.kind==='iso'?'chartTitleIso':active.kind==='facing'?'chartTitleFacing':active.kind==='bbDefend'?'chartTitleBbDefend':active.kind==='fourBet'?'chartTitleFourBet':'chartTitleShove';
  $('chartTitle').textContent=`${active.pos} — ${active.kind==='range'?rangeMatrixTitle(active):T(titleKey)}`;
  if(active.kind!=='range'){
    $('chartRangeMeta').innerHTML='';
    $('chartLegend').innerHTML=
      `<span><span class="sw" style="background:var(--gold);"></span>${T(active.kind==='rfi'||active.kind==='iso'?'legendOpen':active.kind==='fourBet'?'legendFourBet':active.kind==='facing'||active.kind==='bbDefend'?'legend3bet':'legendShove')}</span>`+
      (active.list2?`<span><span class="sw" style="background:#2e7d8f;"></span>${T('legendCall')}</span>`:'')+
      `<span><span class="sw" style="background:#1d232e;"></span>${T('legendFold')}</span>`+
      `<span><span class="sw" style="background:none;outline:2px solid #4da3ff;outline-offset:-1px;"></span>${T('legendYou')}</span>`;
  }
  openDialog($('chartOv'),'chartTitle');
}

/* run N headless tournaments with the coach bot in seat 0, report win/ITM/avg finish */
function runCoachBenchmark(nGames){
  if(!HAS_DOM)return;
  const btn=$('benchBtn')||{disabled:false,classList:{remove(){},add(){}}};
  const out=$('benchOut')||{classList:{remove(){},add(){}},set textContent(v){console.log('[bench]',v);},get textContent(){return '';}};
  out.classList.remove('hidden');
  btn.disabled=true;
  const cfgB={gameType:'sng',numPlayers:9,startBB:100,startBlind:100,ante:0.10,speed:'turbo',difficulty:'medium',allAI:true,coachBot:true};
  const sv={a:AI_DELAY_MIN,b:AI_DELAY_MAX,r:RUNOUT_DELAY,s:SHOWDOWN_PAUSE,f:FOLDWIN_PAUSE};
  AI_DELAY_MIN=0;AI_DELAY_MAX=0;RUNOUT_DELAY=0;SHOWDOWN_PAUSE=0;FOLDWIN_PAUSE=0;
  const prevGO=globalThis.__onGameOver;
  const places=[];
  const finish=()=>{
    BENCH=false;
    AI_DELAY_MIN=sv.a;AI_DELAY_MAX=sv.b;RUNOUT_DELAY=sv.r;SHOWDOWN_PAUSE=sv.s;FOLDWIN_PAUSE=sv.f;
    globalThis.__onGameOver=prevGO;
    state=null;
    btn.disabled=false;
    const n=places.length, np=cfgB.numPlayers, paid=PAYOUTS(np).length;
    const w=places.filter(x=>x===1).length, im=places.filter(x=>x<=paid).length;
    const avg=(places.reduce((a,b)=>a+b,0)/n).toFixed(1);
    out.textContent=C('benchResult',n,np,Math.round(100*w/n),Math.round(100/np),
      Math.round(100*im/n),Math.round(100*paid/np),avg,((np+1)/2).toFixed(1));
  };
  const runOne=()=>{
    globalThis.__onGameOver=s=>{
      const hero=s.players[0];
      places.push(hero.out?(hero.place||cfgB.numPlayers):1);
      out.textContent=C('benchProg',places.length,nGames)+' · 🏆×'+places.filter(x=>x===1).length;
      if(places.length>=nGames) finish();
      else setTimeout(runOne,25);
    };
    BENCH=true;
    newGame(cfgB);
    startHand();
  };
  out.textContent=C('benchProg',0,nGames);
  setTimeout(runOne,25);
}

/* the benchmark bot: plays seat 0 by pure coach recommendations */
function coachBotDecide(p){
  const R=coachDecide(p);
  if(R.rec==='FOLD') return R.callAmt>0?{type:'fold'}:{type:'call'};
  if(R.rec==='CHECK'||R.rec==='CALL') return {type:'call'};
  if(R.rec==='ALLIN') return {type:'raise',amount:p.bet+p.chips};
  return {type:'raise',amount:R.coachT||state.currentBet+state.lastRaiseSize};
}
