/* ===== coach prose (the "why" explanations), fully translated ===== */
const CPROSE={
en:{
rangesNote:(n,c)=>` Equity is simulated against realistic ranges: ${n} opponent${n>1?'s have':' has'} shown strength and ${n>1?'are':'is'} modeled on roughly the top ${c}% of hands, not random cards.`,
checksNote:n=>` ${n===1?'One opponent has':n+' opponents have'} checked — checks usually deny a strong hand, so the very top of ${n===1?'that range':'those ranges'} is trimmed in the simulation (watch out for traps, though).`,
madeBoardPair:' — careful: that pair sits entirely on the board, so every opponent has it too.',
madeOverpair:' — an overpair, very strong.',madeUnderPair:' — a pocket pair below the top board card.',madeTopPair:' — top pair, solid.',
madeTwoPair:(a,b)=>` — real two pair (${a} and ${b}), strong enough to bet when checked to.`,
madeNotTop:r=>` — not top pair; anyone holding a ${r} is ahead of you.`,
drawFlush:o=>`flush draw (9 outs, ≈${o})`,drawOESD:o=>`open-ended straight draw (8 outs, ≈${o})`,drawGut:o=>`gutshot straight draw (4 outs, ≈${o})`,
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
huPush:(bb,c,pr,t,p)=>`Heads-up at ${bb} BB effective, there is no ladder left to wait for. ${c} (${pr}) is inside the ~${t}% heads-up shove range from ${p} — all-in maximizes fold equity and denies the big blind a cheap flop.`,
huOpen:(bb,c,p)=>`Heads-up at ${bb} BB effective is deep enough to play postflop. ${c} is playable from ${p}, but it is not a pure shove spot — open small and keep weaker hands in.`,
huCall:(bb,c,e,o)=>`Heads-up at ${bb} BB effective, calling ranges widen because there is no ladder pressure left. ${c} has about ${e} equity versus the price ${o}, so continue.`,
huFold:(bb,c,pr,t,p)=>`Heads-up at ${bb} BB effective, ${c} (${pr}) is below the ~${t}% shove/continue range for ${p}. Let this one go rather than gambling the match with pure trash.`,
pfOpen:(c,pr,t,p,pair)=>`No one has raised yet, and ${c} (${pr}) is inside the chart-based ~${t}% opening range for ${p}${pair?' once its set-mining value is counted — pocket pairs play above their raw ranking when stacks are deep, because flopping a set (~12%) is disguised and wins big pots':''}. Come in raising, not limping — it takes the initiative and can win the blinds outright.`,
pfBBfree:c=>`${c} isn't strong enough to raise from the big blind, but you see the flop for free.`,
pfOpenFold:(c,pr,t,p)=>`${c} (${pr}) is below the ~${t}% opening range for ${p}. Open-folding here is the textbook play — limping weak hands leaks chips long-term.`,
pf3bet:c=>`${c} is a premium holding (top 5%). Against a raise the standard play is to re-raise (3-bet) for value — flat calling lets weaker hands in cheaply behind you.`,
pfCallRange:(p,ct,c,pr,e,o)=>`Facing a raise, ${p} continues with roughly the top ${ct}% — ${c} (${pr}) qualifies, and your equity vs their range (${e}) covers the price (${o}).`,
pfSetMine:(c,amt,x)=>`${c} doesn't qualify on raw strength, but this is a textbook set-mine: the call is only ${amt} with ~${x}x that behind. You flop a set ~12% of the time — disguised, and it wins stacks. The 15-to-1 rule says the implied odds are there. Miss the flop, and it's an easy fold.`,
pfFoldRange:(ct,p,c,pr,e,o)=>`Against a raise, the ~top ${ct}% continues from ${p}; ${c} (${pr}) doesn't make it. Your equity vs a raiser's range is ~${e} needing ${o} — let it go.`,
valRiver:(e,n)=>`With ~${e} to win against ${n} opponent${n>1?'s':''}, you're likely best at showdown. Bet for value — a check wins you nothing extra, and worse hands may still pay you off.`,
valBet:(e,n)=>`With ~${e} to win against ${n} opponent${n>1?'s':''}, you're likely ahead. Bet for value — checking gives weaker hands and draws a free card to outdraw you.`,
protectBet:(h,e,n)=>`${h} is strong but vulnerable multiway. After checks in front, bet for value/protection: worse pairs, pair+draws, and straight/flush draws can pay, and checking gives them a free card. Raw equity is only ~${e} vs ${n} opponents because they share many outs, but betting is still better than giving a free card.`,
stab:e=>`Everyone has checked to you, and checks usually mean weakness — their ranges look capped. With ~${e} plus all that fold equity, a stab takes this pot down often. If anyone calls or check-raises, slow down: that's real strength.`,
checkedDownStab:(e,n)=>`${n===1?'Villain has':'Opponents have'} checked the free preflop option and then kept checking down. That line is heavily capped, so with ~${e} and a hand that is not pure trash, make a small stab — you do not need a big bet to pressure nothing.`,
probeStab:(e,n,o)=>`${n===1?'Villain has':'Opponents have'} checked multiple streets, so the line is capped. Even ${o?'out of position, ':''}with ~${e} and no bet to call, a small bluff/probe bet can fold air and weak showdown hands — keep it small, then shut down if raised.`,
midRiver:e=>`A decent but unspectacular ~${e}. The board is complete — betting mostly gets called by better hands. Check and try to get to showdown cheaply.`,
midCheck:e=>`A decent but unspectacular ~${e}. Not strong enough to build a big pot; check and keep the pot small while you see what develops.`,
weakRiverLast:e=>`Only ~${e} to win and no cards left to come — your hand is final. Everyone has checked to you: check behind and take the free showdown.`,
weakRiverFirst:e=>`Only ~${e} to win and no cards left to come — your hand can't improve anymore. Check, and fold to any serious bet.`,
weakFree:e=>`Only ~${e} to win, but checking costs nothing. Take the free card and fold to any serious bet.`,
bigBet:r=>` This bet is ≈${r}% of the pot — bets that large are usually made hands (two pair or better), so the coach discounts your raw win chance here.`,
gutWarn:' Chasing a 4-out gutshot into big bets is a long-term money leak — even when you hit, you may not get paid enough to cover all the misses (poor implied odds).',
airWarn:' You have no made hand and no real draw — players who bet usually have at least a pair, and "pot-odds correct" calls with high cards are one of the biggest leaks in poker. The coach heavily discounts your raw win chance here.',
raiseVal:e=>`~${e} to win is a strong favorite. Raise for value and to charge draws — flat calling leaves money on the table.`,
postflopRaiseSize:(amt,bb,x,bet,ratio)=>` Suggested postflop raise size: ${amt} (${bb}). The opponent's bet is about ${ratio}% pot, so use roughly ${x}x that bet: small bets can be raised much larger, while big bets and overbets usually only need about 2-3x.`,
callOk:(amt,pt,o,e,disc,ea)=>`The call costs ${amt} to win a ${pt} pot, so you need ${o} equity to break even. You have ~${e}${disc?` (counted as ~${ea} after discounts)`:''} — calling is profitable long-term, but raising would risk too much with a non-premium hand.`,
foldAdv:(o,amt,pt,ea,resp)=>`You need ${o} equity to call (${amt} into ${pt}) but only have ~${ea}${resp?' once the size of this bet is respected':''}. Every chip you put in here loses value — fold and wait for a better spot.`,
chart3bet:(c,e)=>`${c} is in the re-raise (3-bet) chart against ${e?'an early-position raiser':'a late-position raiser'} — solver ranges re-raise these hands instead of just calling: the big pairs for value, and hands like A5s as "blocker bluffs" (your ace makes his monster hands less likely). Flat-calling would let players behind you in cheaply.`,
chartCallRaise:(c,e,o)=>`${c} is in the calling chart against this raise — strong enough to see a flop, not strong enough to re-raise. Your win chance (${e}) covers the price (${o}). Call, and play carefully if you miss the flop.`,
chartIcmFold:(c,e,o)=>`${c} is normally a call here, but right now your simulated win chance (${e}) doesn't cover the price (${o}) once prize pressure and this raiser's range are counted. The chart is a guide — the math of THIS table says fold.`,
chartFoldVs:c=>`${c} is in neither the re-raise nor the calling chart against this raise — solver ranges simply fold it. Calling raises with hands like this is one of the most expensive habits in poker.`,
chartOpen:(c,p)=>`${c} is in the ${p} opening chart — a hand list taken from solver-computed ranges: raising it first-in from this seat is profitable in the long run. Come in raising, not limping.`,
chartIso:(c,p,n)=>`${c} is in the ${p} iso chart — solver-style ranges for raising over ${n} limper${n>1?'s':''}. Isolate with a raise; calling behind limpers bleeds chips.`,
chartNotInIso:(c,p)=>`${c} is not in the ${p} iso chart — even over limpers, this hand loses money as a raise long-term. Fold, or make a very tight exception only with a huge stack edge.`,
limpPotNote:n=>` ${n} limper${n>1?'s':''} — dead money widens iso-raise ranges slightly; still raise or fold, don't call behind with marginal hands.`,
pfRaiseSize:(amt,bb,pos,callers,ante,depth)=>` Suggested preflop size: ${amt} (${bb}). Start around ${pos==='IP'?'3x in position':'4x out of position'}; add about +1x for each flat caller or limper${callers?` (${callers} here)`:''}${ante?' and size up when antes add dead money':''}${depth>0?' and when stacks are deep enough that callers can realize implied odds':depth<0?' while keeping it controlled because stacks are shallower':''}.`,
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
icmNote:(x,left,paid)=>` 💰 Prize pressure: ${paid} place${paid>1?'s':''} get paid and ${left} player${left>1?'s are':' is'} left. In a tournament, chips you might LOSE are worth more than chips you might WIN — going broke costs you your shot at the prizes. So this call needs an extra ~${x}% win chance on top of the normal pot math. Near the bubble, when in doubt: fold and let the others bust each other.`,
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
bucketMWFlushDraw:n=>` Multiway (${n} opponents) with a flush draw possible — someone may already have a flush or be drawing.`,
bucketMWBigPot:p=>` Large multiway pot (~${p} BB) — mistakes are costly; continue only with clear equity or strong draws.`,
bucketMWSqueeze:n=>` Multiway (${n} opponents) facing a squeeze/raise — ranges are strong; fold marginal continues unless odds are excellent.`,
briefSpot:(eq,need,call,pot,pos,ip,opps)=>` 📋 Spot: ~${eq} equity${need!=='—'?` vs ${need} needed`:''}${call!=='—'?` · price ${call} → ${pot}`:''} · ${pos} (${ip}) · ${opps} opp${opps>1?'s':''}.`,
briefAir:` No real made hand — equity heavily discounted vs bets.`,
briefVillain:(name,style,line)=>` vs ${name} (${style}) on a ${line} line.`,
dirtyOutPairs:c=>` Dirty outs (${c}): pairing the board — helps everyone, not just you.`,
dirtyOutFlush:c=>` Dirty outs (${c}): fourth card to a board flush — often gives an opponent the winning flush.`,
profRock:` The bettor is the 🪨 Tight type — players like this almost never bluff big. Give this bet extra respect: without a strong hand yourself, folding is usually right.`,
profManiac:` The bettor is the 🔥 Wild type — he bluffs so often that medium-strength hands go UP in value against him. You can call him down lighter than against anyone else.`,
profStation:` The bettor is the 📞 Loose-passive type — he calls everything but almost never bets big without a real hand. His sudden aggression deserves respect.`,
blockerAce:` You hold an Ace — a "blocker": since one of the four aces is in YOUR hand, it's less likely he holds the big ace-hands (like a pair of aces or top pair with an ace). That makes calling slightly better.`,
blockerFlush:` You hold the ace of the flush suit — even without a flush yourself, that card means HE cannot have the best possible flush. A bluff-raise from you is also extra believable, because you could have the nut flush.`,
suitedConn:` Hands like this (suited and connected) play better than their raw ranking suggests — they make hidden straights and flushes that win big pots when stacks are deep. The coach loosens up slightly for them.`,
gtoSolving:'⚖️ Running GTO solve…',gtoUnavail:'GTO solve unavailable for this spot.',gtoFail:'GTO solve failed for this spot.',
gtoMulti:n=>'⚖️ GTO solving applies heads-up only (like commercial solvers). With '+n+' opponents, advice uses range-equity math.',
gtoNote:'Equilibrium of your range vs theirs on this exact board. Abstractions: current street only, 66%-pot + all-in sizings, 8 strength buckets, check-down rollouts. Directionally GTO — not solver-exact.',
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
drawFlush:o=>`tirage couleur (9 outs, ≈${o})`,drawOESD:o=>`tirage quinte par les deux bouts (8 outs, ≈${o})`,drawGut:o=>`tirage quinte ventral (4 outs, ≈${o})`,
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
huPush:(bb,c,pr,t,p)=>`Heads-up à ${bb} BB effectives : il n'y a plus de palier à attendre. ${c} (${pr}) est dans la range de shove heads-up (~${t}%) depuis ${p} — tapis maximise la fold equity et empêche la BB de voir un flop gratuit.`,
huOpen:(bb,c,p)=>`Heads-up à ${bb} BB effectives : c'est assez deep pour jouer postflop. ${c} est jouable depuis ${p}, mais ce n'est pas un shove pur — ouvrez petit et gardez les mains faibles dedans.`,
huCall:(bb,c,e,o)=>`Heads-up à ${bb} BB effectives, les ranges de call s'élargissent car il n'y a plus de pression de palier. ${c} a environ ${e} d'équité pour un prix de ${o}, donc continuez.`,
huFold:(bb,c,pr,t,p)=>`Heads-up à ${bb} BB effectives, ${c} (${pr}) est sous la range shove/continue (~${t}%) pour ${p}. Couchez plutôt que de jouer le match avec une main poubelle.`,
pfOpen:(c,pr,t,p,pair)=>`Personne n’a relancé, et ${c} (${pr}) est dans la range d’ouverture (~${t}%) pour ${p}${pair?' une fois sa valeur de set-mining comptée — les paires servies valent plus que leur classement brut quand les tapis sont profonds : flopper un brelan (~12%) est caché et gagne de gros pots':''}. Entrez en relançant, pas en limpant — vous prenez l’initiative et pouvez gagner les blinds directement.`,
pfBBfree:c=>`${c} n’est pas assez fort pour relancer depuis la grosse blind, mais vous voyez le flop gratuitement.`,
pfOpenFold:(c,pr,t,p)=>`${c} (${pr}) est sous la range d’ouverture (~${t}%) pour ${p}. Se coucher ici est le jeu correct — limper des mains faibles fait fuir des jetons à long terme.`,
pf3bet:c=>`${c} est une main premium (top 5%). Face à une relance, le jeu standard est de sur-relancer (3-bet) pour la valeur — caller laisse entrer des mains plus faibles à bas prix derrière vous.`,
pfCallRange:(p,ct,c,pr,e,o)=>`Face à une relance, ${p} continue avec environ le top ${ct}% — ${c} (${pr}) est dedans, et votre équité contre sa range (${e}) couvre le prix (${o}).`,
pfSetMine:(c,amt,x)=>`${c} ne se qualifie pas sur sa force brute, mais c’est un set-mine d’école : le call ne coûte que ${amt} avec ~${x}x derrière. Vous floppez un brelan ~12% du temps — caché, et il gagne des tapis. La règle du 15 contre 1 valide les cotes implicites. Flop raté : on se couche sans regret.`,
pfFoldRange:(ct,p,c,pr,e,o)=>`Face à une relance, seul le top ~${ct}% continue depuis ${p} ; ${c} (${pr}) n’en fait pas partie. Votre équité contre la range d’un relanceur est ~${e} pour ${o} requis — laissez tomber.`,
valRiver:(e,n)=>`Avec ~${e} de chances de gain contre ${n} adversaire${n>1?'s':''}, vous êtes probablement devant à l’abattage. Misez pour la valeur — un check ne rapporte rien de plus, et des mains moins bonnes peuvent encore payer.`,
valBet:(e,n)=>`Avec ~${e} de chances de gain contre ${n} adversaire${n>1?'s':''}, vous êtes probablement devant. Misez pour la valeur — checker offre une carte gratuite aux mains plus faibles et aux tirages.`,
protectBet:(h,e,n)=>`${h} est forte mais vulnérable en multiway. Après les checks devant vous, misez pour value/protection : des paires moins bonnes, paire+tirage et tirages quinte/couleur peuvent payer, et checker leur donne une carte gratuite. L’équité brute n’est que ~${e} contre ${n} adversaires car ils partagent beaucoup d’outs, mais miser reste mieux que donner une carte gratuite.`,
stab:e=>`Tout le monde a checké jusqu’à vous, et les checks trahissent souvent la faiblesse — leurs ranges semblent plafonnées. Avec ~${e} plus toute cette fold equity, une mise ramasse souvent ce pot. Si quelqu’un paie ou check-relance, ralentissez : c’est de la vraie force.`,
checkedDownStab:(e,n)=>`${n===1?'Vilain a':'Les adversaires ont'} checké l'option gratuite préflop puis continué à checker. Cette ligne est très capée : avec ~${e} et une main pas totalement poubelle, faites une petite mise — inutile de miser gros pour faire pression sur rien.`,
probeStab:(e,n,o)=>`${n===1?'Vilain a':'Les adversaires ont'} checké plusieurs streets, donc la ligne est capée. Même ${o?'hors de position, ':''}avec ~${e} et aucune mise à payer, une petite mise bluff/probe peut faire folder l'air et les mains faibles de showdown — gardez-la petite, puis abandonnez si ça relance.`,
midRiver:e=>`Un score correct mais quelconque : ~${e}. Le board est complet — miser ne se fait payer que par mieux. Checkez et essayez d’atteindre l’abattage à bas prix.`,
midCheck:e=>`Un score correct mais quelconque : ~${e}. Pas assez fort pour gonfler le pot ; checkez et gardez le pot petit en attendant la suite.`,
weakRiverLast:e=>`Seulement ~${e} de chances de gain et plus aucune carte à venir — votre main est figée. Tout le monde a checké : checkez derrière et prenez l’abattage gratuit.`,
weakRiverFirst:e=>`Seulement ~${e} de chances de gain et plus aucune carte à venir — votre main ne peut plus s’améliorer. Checkez, et couchez-vous face à toute mise sérieuse.`,
weakFree:e=>`Seulement ~${e} de chances de gain, mais checker ne coûte rien. Prenez la carte gratuite et couchez-vous face à toute mise sérieuse.`,
bigBet:r=>` Cette mise fait ≈${r}% du pot — des mises aussi grosses sont généralement des mains faites (deux paires ou mieux), donc le coach décote votre chance de gain brute.`,
gutWarn:' Payer de grosses mises pour chasser un ventral à 4 outs est une fuite d’argent à long terme — même touché, vous ne serez pas assez payé pour couvrir tous les échecs (cotes implicites médiocres).',
airWarn:' Vous n’avez ni main faite ni vrai tirage — celui qui mise a généralement au moins une paire, et les calls « corrects en cotes » avec hauteur sont l’une des plus grosses fuites du poker. Le coach décote fortement votre chance de gain ici.',
raiseVal:e=>`~${e} de chances de gain : vous êtes grand favori. Relancez pour la valeur et pour faire payer les tirages — caller laisse de l’argent sur la table.`,
postflopRaiseSize:(amt,bb,x,bet,ratio)=>` Taille de relance postflop suggérée : ${amt} (${bb}). La mise adverse fait environ ${ratio}% du pot, donc utilisez environ ${x}x cette mise : les petites mises peuvent être relancées beaucoup plus cher, tandis que les grosses mises et overbets demandent souvent seulement 2-3x.`,
callOk:(amt,pt,o,e,disc,ea)=>`Le call coûte ${amt} pour gagner un pot de ${pt} : il vous faut ${o} d’équité pour être à l’équilibre. Vous avez ~${e}${disc?` (compté ~${ea} après décotes)`:''} — caller est rentable à long terme, mais relancer risquerait trop avec une main non premium.`,
foldAdv:(o,amt,pt,ea,resp)=>`Il vous faut ${o} d’équité pour payer (${amt} dans ${pt}) mais vous n’avez que ~${ea}${resp?' une fois la taille de cette mise respectée':''}. Chaque jeton investi ici perd de la valeur — couchez-vous et attendez un meilleur spot.`,
chart3bet:(c,e)=>`${c} figure dans la charte de sur-relance (3-bet) contre ${e?'un relanceur en début de parole':'un relanceur en fin de parole'} — les ranges solveur sur-relancent ces mains au lieu de suivre : les grosses paires pour la valeur, et des mains comme A5s en « bluff à blocker » (votre as rend ses monstres moins probables). Suivre laisserait entrer les joueurs derrière à bas prix.`,
chartCallRaise:(c,e,o)=>`${c} figure dans la charte de call contre cette relance — assez fort pour voir un flop, pas assez pour sur-relancer. Votre chance de gain (${e}) couvre le prix (${o}). Suivez, et jouez prudemment si vous ratez le flop.`,
chartIcmFold:(c,e,o)=>`${c} serait normalement un call ici, mais votre chance de gain simulée (${e}) ne couvre pas le prix (${o}) une fois la pression des prix et la range de ce relanceur comptées. La charte est un guide — le calcul de CETTE table dit de se coucher.`,
chartFoldVs:c=>`${c} ne figure ni dans la charte de 3-bet ni dans celle de call contre cette relance — les ranges solveur la couchent, tout simplement. Suivre des relances avec ce genre de main est l'une des habitudes les plus coûteuses du poker.`,
chartOpen:(c,p)=>`${c} figure dans la charte d'ouverture ${p} — une liste de mains issue de ranges calculées par solveur : la relancer en premier depuis ce siège est rentable à long terme. Entrez en relançant, pas en limpant.`,
chartIso:(c,p,n)=>`${c} figure dans la charte iso ${p} — ranges pour relancer sur ${n} limpeur${n>1?'s':''}. Isolez en relançant ; suivre derrière des limps perd des jetons.`,
chartNotInIso:(c,p)=>`${c} n'est pas dans la charte iso ${p} — même sur des limps, cette main perd de l'argent en relance. Couchez-vous.`,
limpPotNote:n=>` ${n} limpeur${n>1?'s':''} — argent mort : les ranges d'iso s'élargissent un peu ; relancez ou couchez, ne suivez pas en marginal.`,
pfRaiseSize:(amt,bb,pos,callers,ante,depth)=>` Taille préflop suggérée : ${amt} (${bb}). Basez-vous sur environ ${pos==='IP'?'3x en position':'4x hors position'} ; ajoutez environ +1x par caller/limpeur${callers?` (${callers} ici)`:''}${ante?' et augmentez quand les antes ajoutent de l\'argent mort':''}${depth>0?' et quand les tapis profonds donnent des cotes implicites aux callers':depth<0?' tout en contrôlant la taille avec des tapis plus courts':''}.`,
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
icmNote:(x,left,paid)=>` 💰 Pression des prix : ${paid} place${paid>1?'s sont payées':' est payée'} et il reste ${left} joueur${left>1?'s':''}. En tournoi, les jetons que vous risquez de PERDRE valent plus que ceux que vous pouvez GAGNER — sauter vous coûte votre chance de prix. Ce call demande donc ~${x}% de chances de gain EN PLUS du calcul normal du pot. Près de la bulle, dans le doute : couchez-vous et laissez les autres s'éliminer.`,
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
bucketMWFlushDraw:n=>` Multiway (${n} adversaires) avec tirage couleur possible — quelqu'un peut déjà avoir la couleur.`,
bucketMWBigPot:p=>` Gros pot multiway (~${p} BB) — les erreurs coûtent cher ; continuez seulement avec équité claire.`,
bucketMWSqueeze:n=>` Multiway (${n} adversaires) face à une squeeze — ranges fortes ; couchez les marginales sauf excellentes cotes.`,
briefSpot:(eq,need,call,pot,pos,ip,opps)=>` 📋 Spot : ~${eq} d'équité${need!=='—'?` vs ${need} requis`:''}${call!=='—'?` · prix ${call} → ${pot}`:''} · ${pos} (${ip}) · ${opps} adv.`,
briefAir:` Pas de vraie main faite — équité fortement décotée face aux mises.`,
briefVillain:(name,style,line)=>` vs ${name} (${style}) sur une ligne ${line}.`,
dirtyOutPairs:c=>` Outs sales (${c}) : pair le board — aide tout le monde, pas seulement vous.`,
dirtyOutFlush:c=>` Outs sales (${c}) : 4e carte à une couleur au board — donne souvent la couleur gagnante à l'adversaire.`,
profRock:` Le miseur est du type 🪨 Serré — ces joueurs ne bluffent presque jamais gros. Respectez cette mise : sans main forte, se coucher est généralement correct.`,
profManiac:` Le miseur est du type 🔥 Fou — il bluffe si souvent que vos mains moyennes PRENNENT de la valeur contre lui. Vous pouvez le payer plus léger que n'importe qui d'autre.`,
profStation:` Le miseur est du type 📞 Passif — il paie tout mais ne mise presque jamais gros sans une vraie main. Son agression soudaine mérite le respect.`,
blockerAce:` Vous tenez un As — un « blocker » : comme l'un des quatre as est dans VOTRE main, il est moins probable qu'il ait les grosses mains à as (paire d'as, top paire avec as). Cela rend le call un peu meilleur.`,
blockerFlush:` Vous tenez l'as de la couleur du board — même sans couleur vous-même, cette carte signifie qu'IL ne peut pas avoir la meilleure couleur possible. Et un bluff-raise de votre part devient très crédible.`,
suitedConn:` Ce genre de main (assortie et connectée) joue mieux que son classement brut — elle fait des quintes et couleurs cachées qui gagnent de gros pots quand les tapis sont profonds. Le coach s'élargit légèrement pour elles.`,
gtoSolving:'⚖️ Calcul GTO en cours…',gtoUnavail:'Calcul GTO indisponible pour ce spot.',gtoFail:'Échec du calcul GTO pour ce spot.',
gtoMulti:n=>'⚖️ Le calcul GTO ne s’applique qu’en tête-à-tête (comme les solveurs commerciaux). Avec '+n+' adversaires, le conseil repose sur l’équité contre les ranges.',
gtoNote:'Équilibre de votre range contre la sienne sur ce board exact. Abstractions : rue courante seulement, mises 66% pot + tapis, 8 niveaux de force, rollouts en check-down. Directionnellement GTO — pas exact au solveur près.',
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
drawFlush:o=>`proyecto de color (9 outs, ≈${o})`,drawOESD:o=>`proyecto de escalera abierta (8 outs, ≈${o})`,drawGut:o=>`proyecto de escalera interna (4 outs, ≈${o})`,
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
huPush:(bb,c,pr,t,p)=>`Heads-up con ${bb} BB efectivas: ya no hay salto de premios que esperar. ${c} (${pr}) está dentro del rango de all-in heads-up (~${t}%) desde ${p} — all-in maximiza fold equity y evita que la BB vea un flop barato.`,
huOpen:(bb,c,p)=>`Heads-up con ${bb} BB efectivas hay suficiente profundidad para jugar postflop. ${c} es jugable desde ${p}, pero no es un shove puro — abre pequeño y mantén manos peores dentro.`,
huCall:(bb,c,e,o)=>`Heads-up con ${bb} BB efectivas, los rangos de call se amplían porque ya no hay presión de saltos de premio. ${c} tiene aprox. ${e} equity contra el precio ${o}, así que continúa.`,
huFold:(bb,c,pr,t,p)=>`Heads-up con ${bb} BB efectivas, ${c} (${pr}) está por debajo del rango de shove/continuación (~${t}%) para ${p}. Retírate en vez de jugarte el match con basura pura.`,
pfOpen:(c,pr,t,p,pair)=>`Nadie ha subido aún, y ${c} (${pr}) está dentro del rango de apertura (~${t}%) para ${p}${pair?' contando su valor de set-mining — las parejas de mano valen más que su ranking bruto con stacks profundos: ligar un trío (~12%) va disfrazado y gana botes grandes':''}. Entra subiendo, no de limp — tomas la iniciativa y puedes llevarte las ciegas directamente.`,
pfBBfree:c=>`${c} no es lo bastante fuerte para subir desde la ciega grande, pero ves el flop gratis.`,
pfOpenFold:(c,pr,t,p)=>`${c} (${pr}) está por debajo del rango de apertura (~${t}%) para ${p}. Retirarse aquí es el juego de libro — entrar de limp con manos débiles pierde fichas a largo plazo.`,
pf3bet:c=>`${c} es una mano premium (top 5%). Contra una subida, lo estándar es resubir (3-bet) por valor — solo igualar deja entrar barato a manos peores detrás de ti.`,
pfCallRange:(p,ct,c,pr,e,o)=>`Ante una subida, ${p} continúa con aproximadamente el top ${ct}% — ${c} (${pr}) califica, y tu equidad contra su rango (${e}) cubre el precio (${o}).`,
pfSetMine:(c,amt,x)=>`${c} no califica por fuerza bruta, pero es un set-mine de manual: la llamada cuesta solo ${amt} con ~${x}x detrás. Ligas trío ~12% de las veces — disfrazado, y gana stacks enteros. La regla del 15 a 1 dice que las odds implícitas están. Si fallas el flop, te retiras sin dudar.`,
pfFoldRange:(ct,p,c,pr,e,o)=>`Contra una subida, solo continúa el ~top ${ct}% desde ${p}; ${c} (${pr}) no llega. Tu equidad contra el rango de quien sube es ~${e} necesitando ${o} — déjala ir.`,
valRiver:(e,n)=>`Con ~${e} de probabilidad contra ${n} rival${n>1?'es':''}, probablemente eres el mejor en el showdown. Apuesta por valor — pasar no te gana nada extra, y manos peores aún pueden pagarte.`,
valBet:(e,n)=>`Con ~${e} de probabilidad contra ${n} rival${n>1?'es':''}, probablemente vas por delante. Apuesta por valor — pasar regala una carta gratis a manos peores y proyectos.`,
protectBet:(h,e,n)=>`${h} es fuerte pero vulnerable en multiway. Tras checks delante, apuesta por valor/protección: parejas peores, pareja+proyecto y proyectos de escalera/color pueden pagar, y pasar les regala una carta. La equity bruta es solo ~${e} contra ${n} rivales porque comparten muchos outs, pero apostar sigue siendo mejor que dar carta gratis.`,
stab:e=>`Todos han pasado hasta ti, y pasar suele significar debilidad — sus rangos parecen limitados. Con ~${e} más toda esa fold equity, una apuesta se lleva este bote a menudo. Si alguien iguala o sube tras pasar, frena: eso es fuerza de verdad.`,
checkedDownStab:(e,n)=>`${n===1?'El rival ha':'Los rivales han'} pasado la opción gratis preflop y luego siguieron pasando. Esa línea está muy limitada, así que con ~${e} y una mano que no es basura pura, haz una apuesta pequeña: no necesitas apostar grande para presionar aire.`,
probeStab:(e,n,o)=>`${n===1?'El rival ha':'Los rivales han'} pasado varias calles, así que su línea está limitada. Incluso ${o?'fuera de posición, ':''}con ~${e} y sin apuesta que pagar, una apuesta pequeña de bluff/probe puede tirar aire y manos débiles de showdown — mantenla pequeña y abandona si resuben.`,
midRiver:e=>`Un ~${e} decente pero sin más. La mesa está completa — apostar solo lo pagan manos mejores. Pasa e intenta llegar barato al showdown.`,
midCheck:e=>`Un ~${e} decente pero sin más. No da para inflar el bote; pasa y mantén el bote pequeño mientras ves qué pasa.`,
weakRiverLast:e=>`Solo ~${e} de probabilidad y no quedan cartas — tu mano es definitiva. Todos han pasado: pasa también y llévate el showdown gratis.`,
weakRiverFirst:e=>`Solo ~${e} de probabilidad y no quedan cartas — tu mano ya no puede mejorar. Pasa, y retírate ante cualquier apuesta seria.`,
weakFree:e=>`Solo ~${e} de probabilidad, pero pasar no cuesta nada. Toma la carta gratis y retírate ante cualquier apuesta seria.`,
bigBet:r=>` Esta apuesta es ≈${r}% del bote — apuestas tan grandes suelen ser manos hechas (doble pareja o mejor), así que el coach descuenta tu probabilidad bruta aquí.`,
gutWarn:' Perseguir una escalera interna de 4 outs contra apuestas grandes es una fuga de dinero a largo plazo — incluso cuando ligas, no te pagan lo suficiente para cubrir todos los fallos (odds implícitas pobres).',
airWarn:' No tienes mano hecha ni proyecto real — quien apuesta suele tener al menos una pareja, y las llamadas "correctas por odds" con carta alta son una de las mayores fugas del póker. El coach descuenta mucho tu probabilidad bruta aquí.',
raiseVal:e=>`~${e} de probabilidad: eres gran favorito. Sube por valor y para cobrar a los proyectos — solo igualar deja dinero sobre la mesa.`,
postflopRaiseSize:(amt,bb,x,bet,ratio)=>` Tamaño de subida postflop sugerido: ${amt} (${bb}). La apuesta rival es aprox. ${ratio}% del bote, así que usa cerca de ${x}x esa apuesta: las apuestas pequeñas se pueden subir mucho más, mientras que apuestas grandes y overbets suelen necesitar solo 2-3x.`,
callOk:(amt,pt,o,e,disc,ea)=>`La llamada cuesta ${amt} para ganar un bote de ${pt}: necesitas ${o} de equidad para no perder. Tienes ~${e}${disc?` (contado como ~${ea} tras descuentos)`:''} — igualar es rentable a largo plazo, pero subir arriesgaría demasiado con una mano no premium.`,
foldAdv:(o,amt,pt,ea,resp)=>`Necesitas ${o} de equidad para igualar (${amt} en ${pt}) pero solo tienes ~${ea}${resp?' una vez respetado el tamaño de esta apuesta':''}. Cada ficha que pongas aquí pierde valor — retírate y espera un mejor momento.`,
chart3bet:(c,e)=>`${c} está en la tabla de resubida (3-bet) contra ${e?'quien sube desde posición temprana':'quien sube desde posición tardía'} — los rangos de solver resuben estas manos en vez de solo igualar: las parejas grandes por valor, y manos como A5s como "farol con blocker" (tu as hace menos probables sus monstruos). Solo igualar dejaría entrar barato a los de detrás.`,
chartCallRaise:(c,e,o)=>`${c} está en la tabla de llamada contra esta subida — bastante fuerte para ver un flop, no tanto como para resubir. Tu probabilidad (${e}) cubre el precio (${o}). Iguala, y juega con cuidado si fallas el flop.`,
chartIcmFold:(c,e,o)=>`${c} normalmente sería una llamada aquí, pero tu probabilidad simulada (${e}) no cubre el precio (${o}) contando la presión de premios y el rango de quien sube. La tabla es una guía — las cuentas de ESTA mesa dicen retirarse.`,
chartFoldVs:c=>`${c} no está ni en la tabla de 3-bet ni en la de llamada contra esta subida — los rangos de solver simplemente la tiran. Igualar subidas con manos así es uno de los hábitos más caros del póker.`,
chartOpen:(c,p)=>`${c} está en la tabla de apertura de ${p} — una lista de manos sacada de rangos calculados por solver: subirla primero desde este asiento es rentable a largo plazo. Entra subiendo, no de limp.`,
chartIso:(c,p,n)=>`${c} está en la tabla iso de ${p} — rangos para subir sobre ${n} limper${n>1?'s':''}. Aísla con subida; pagar detrás de limps pierde fichas.`,
chartNotInIso:(c,p)=>`${c} no está en la tabla iso de ${p} — incluso sobre limps, subir pierde dinero a largo plazo. Retírate.`,
limpPotNote:n=>` ${n} limper${n>1?'s':''} — dinero muerto: los rangos iso se amplían un poco; sube o retírate, no pagues marginal.`,
pfRaiseSize:(amt,bb,pos,callers,ante,depth)=>` Tamaño preflop sugerido: ${amt} (${bb}). Empieza cerca de ${pos==='IP'?'3x en posición':'4x fuera de posición'}; añade alrededor de +1x por cada caller o limper${callers?` (${callers} aquí)`:''}${ante?' y sube el tamaño cuando los antes añaden dinero muerto':''}${depth>0?' y cuando los stacks profundos dan odds implícitas a los callers':depth<0?' manteniéndolo controlado con stacks más cortos':''}.`,
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
icmNote:(x,left,paid)=>` 💰 Presión de premios: se paga${paid>1?'n':''} ${paid} puesto${paid>1?'s':''} y quedan ${left} jugador${left>1?'es':''}. En un torneo, las fichas que puedes PERDER valen más que las que puedes GANAR — quedarte sin fichas te cuesta tu opción a premio. Esta llamada necesita ~${x}% extra de probabilidad además del cálculo normal del bote. Cerca de la burbuja, ante la duda: retírate y deja que los demás se eliminen.`,
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
bucketMWFlushDraw:n=>` Multiway (${n} rivales) con posible proyecto de color — alguien puede tener ya el color.`,
bucketMWBigPot:p=>` Bote multiway grande (~${p} BB) — los errores cuestan; continúa solo con equity clara.`,
bucketMWSqueeze:n=>` Multiway (${n} rivales) frente a squeeze — rangos fuertes; retira marginales salvo odds excelentes.`,
briefSpot:(eq,need,call,pot,pos,ip,opps)=>` 📋 Spot: ~${eq} equity${need!=='—'?` vs ${need} necesario`:''}${call!=='—'?` · precio ${call} → ${pot}`:''} · ${pos} (${ip}) · ${opps} rival${opps>1?'es':''}.`,
briefAir:` Sin mano hecha real — equity muy descontada vs apuestas.`,
briefVillain:(name,style,line)=>` vs ${name} (${style}) en línea ${line}.`,
dirtyOutPairs:c=>` Outs sucios (${c}): emparejan el board — ayuda a todos, no solo a ti.`,
dirtyOutFlush:c=>` Outs sucios (${c}): 4ª carta a color en el board — a menudo le da el color ganador al rival.`,
profRock:` El apostador es del tipo 🪨 Cerrado — estos jugadores casi nunca farolean fuerte. Respeta esta apuesta: sin una mano fuerte, retirarse suele ser lo correcto.`,
profManiac:` El apostador es del tipo 🔥 Salvaje — farolea tanto que tus manos medias SUBEN de valor contra él. Puedes pagarle más ligero que a nadie.`,
profStation:` El apostador es del tipo 📞 Pasivo — lo paga todo pero casi nunca apuesta fuerte sin mano real. Su agresión repentina merece respeto.`,
blockerAce:` Tienes un As — un "blocker": como uno de los cuatro ases está en TU mano, es menos probable que él tenga las grandes manos con as (pareja de ases, top pair con as). Eso mejora un poco la llamada.`,
blockerFlush:` Tienes el as del palo del color — aunque tú no tengas color, esa carta significa que ÉL no puede tener el mejor color posible. Y un farol-subida tuyo resulta muy creíble.`,
suitedConn:` Manos así (del mismo palo y conectadas) juegan mejor que su ranking bruto — hacen escaleras y colores escondidos que ganan botes grandes con stacks profundos. El coach se abre un poco con ellas.`,
gtoSolving:'⚖️ Calculando GTO…',gtoUnavail:'Cálculo GTO no disponible para esta situación.',gtoFail:'Falló el cálculo GTO en esta situación.',
gtoMulti:n=>'⚖️ El cálculo GTO solo aplica mano a mano (como los solvers comerciales). Con '+n+' rivales, el consejo usa equidad contra rangos.',
gtoNote:'Equilibrio de tu rango contra el suyo en esta mesa exacta. Abstracciones: solo la calle actual, apuestas de 66% del bote + all-in, 8 niveles de fuerza, rollouts de check-down. Direccionalmente GTO — no exacto a nivel solver.',
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
    base=effBB<=5?1.00:effBB<=7?0.92:effBB<=9?0.82:effBB<=12?0.68:effBB<=15?0.54:effBB<=20?0.36:0;
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
  if(n===3) return late?1.38:1.18;
  if(n===4) return late?1.24:1.12;
  if(n===5) return early?1.08:1.14;
  if(n===6) return early?1.03:1.06;
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
  return 1;
}
/* equity vs RANGES: each opponent sampled from their top-X% range (rejection sampling) */
function mcEquityR(hole,board,caps,sims){
  const used=new Set();
  for(const c of hole.concat(board)) used.add(c.r*4+c.s);
  const base=FULL_DECK.filter(c=>!used.has(c.r*4+c.s));
  let win=0;
  for(let t=0;t<sims;t++){
    const pool=base.slice();
    const oppH=[];
    for(const o of caps){
      const cap=typeof o==='number'?o:o.cap;
      const floor=Math.min(typeof o==='number'?0:(o.floor||0), cap*0.5); // never empty the window
      let i=0,j=1;
      for(let k=0;k<12;k++){
        i=Math.floor(Math.random()*pool.length);
        j=Math.floor(Math.random()*(pool.length-1)); if(j>=i)j++;
        const pct=handPct[holeCode([pool[i],pool[j]])]||1;
        if(pct<=cap&&pct>floor) break;
      }
      oppH.push([pool[i],pool[j]]);
      const hi=Math.max(i,j),lo=Math.min(i,j);
      pool.splice(hi,1); pool.splice(lo,1);
    }
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

/* ====== GTO-LITE SOLVER ======
   Real CFR (counterfactual regret minimization) on an abstracted tree:
   heads-up, current street, 66%-pot + all-in sizings, 8 strength buckets,
   leaf showdowns valued by board-rollout equity. Directionally GTO. */
function combosInRange(cap,board,exclude,floor){
  const used=new Set(board.map(c=>c.r*4+c.s));
  for(const c of exclude||[]) used.add(c.r*4+c.s);
  const f=Math.min(floor||0,cap*0.5);
  const out=[];
  for(let i=0;i<52;i++)for(let j=i+1;j<52;j++){
    const a=FULL_DECK[i],b=FULL_DECK[j];
    if(used.has(a.r*4+a.s)||used.has(b.r*4+b.s))continue;
    const pct=handPct[holeCode([a,b])]||1;
    if(pct<=cap&&pct>f) out.push([a,b]);
  }
  return out;
}
function comboStrength(combo,board){
  const s=evalBest(combo.concat(board));
  let v=s[0]*1e6+(s[1]||0)*1e4+(s[2]||0)*100+(s[3]||0);
  if(board.length<5){
    const d=detectDraws(combo,board);
    if(d.flush)v+=8e5; if(d.oesd)v+=6e5; else if(d.gutshot)v+=2.5e5;
  }
  return v;
}
function gtoSolve(opt){
  const {board,P0,toCall,eff,heroCap,villCap,heroHand,villFirst}=opt;
  const NB=8;
  const villCombos=combosInRange(clamp(villCap,0.03,1),board,heroHand,opt.villFloor||0);
  const heroCombos=combosInRange(clamp(Math.max(heroCap,0.15),0.03,1),board,[]);
  if(villCombos.length<NB*2||heroCombos.length<NB*2||eff<=0) return null;
  const bucketize=(combos)=>{
    const scored=combos.map(c=>({c,v:comboStrength(c,board)})).sort((x,y)=>x.v-y.v);
    const B=Array.from({length:NB},()=>[]);
    scored.forEach((x,k)=>B[Math.min(NB-1,Math.floor(k*NB/scored.length))].push(x.c));
    return B;
  };
  const hB=bucketize(heroCombos), vB=bucketize(villCombos);
  /* hero's own bucket by strength percentile within his range */
  const hv=comboStrength(heroHand,board);
  const below=heroCombos.reduce((s,c)=>s+(comboStrength(c,board)<=hv?1:0),0);
  const myB=clamp(Math.floor((below-1)*NB/heroCombos.length),0,NB-1);
  /* bucket-vs-bucket equity matrix via board rollouts */
  const E=[];
  for(let i=0;i<NB;i++){E.push([]);
    for(let j=0;j<NB;j++){
      let w=0,n=0;
      for(let t=0;t<70;t++){
        let hc=null,vc=null;
        for(let k=0;k<5;k++){
          hc=hB[i][Math.floor(Math.random()*hB[i].length)];
          vc=vB[j][Math.floor(Math.random()*vB[j].length)];
          if(hc&&vc&&!hc.some(c=>vc.some(d=>d.r===c.r&&d.s===c.s)))break;
          hc=null;
        }
        if(!hc)continue;
        const used=new Set(hc.concat(vc,board).map(c=>c.r*4+c.s));
        const pool=FULL_DECK.filter(c=>!used.has(c.r*4+c.s));
        const need=5-board.length;
        for(let k=0;k<need;k++){const idx=k+Math.floor(Math.random()*(pool.length-k));const tmp=pool[k];pool[k]=pool[idx];pool[idx]=tmp;}
        const fb=board.concat(pool.slice(0,need));
        const c=cmpScore(evalSeven(hc.concat(fb)),evalSeven(vc.concat(fb)));
        w+=c>0?1:c===0?0.5:0; n++;
      }
      E[i][j]=n?w/n:0.5;
    }
  }
  /* build betting tree for the current street */
  function mk(actor,tc,cH,cV,raises){
    const node={player:actor,actions:[],children:[],leaf:null,info:[]};
    const pot=P0+cH+cV, inv=actor===0?cH:cV, remain=eff-inv;
    if(tc>0){
      node.actions.push({n:'Fold'});
      node.children.push({leaf:'fold',folder:actor,cH,cV});
      const callAdd=Math.min(tc,remain);
      node.actions.push({n:'Call'});
      node.children.push({leaf:'sd',cH:actor===0?cH+callAdd:cH,cV:actor===1?cV+callAdd:cV});
      if(raises>0&&remain>tc*2){
        const rAdd=Math.min(tc+Math.round((pot+tc)*0.9),remain);
        node.actions.push({n:rAdd>=remain?'Raise all-in':'Raise'});
        node.children.push(mk(1-actor,rAdd-tc,actor===0?cH+rAdd:cH,actor===1?cV+rAdd:cV,raises-1));
      }
    }else{
      node.actions.push({n:'Check'});
      if(actor===0&&villFirst) node.children.push(mk(1,0,cH,cV,raises));
      else node.children.push({leaf:'sd',cH,cV});
      if(remain>0){
        const bAdd=Math.min(Math.max(Math.round(pot*0.66),10),remain);
        node.actions.push({n:bAdd>=remain?'Bet all-in':'Bet 66% pot'});
        node.children.push(mk(1-actor,bAdd,actor===0?cH+bAdd:cH,actor===1?cV+bAdd:cV,raises-1));
        if(remain>bAdd*2.5){
          node.actions.push({n:'Bet all-in'});
          node.children.push(mk(1-actor,remain,actor===0?cH+remain:cH,actor===1?cV+remain:cV,0));
        }
      }
    }
    return node;
  }
  const root=mk(0,toCall,0,0,2);
  const leafEV=(node,hb,vb)=>{
    if(node.leaf==='fold') return node.folder===0?-node.cH:P0+node.cV;
    const T=P0+node.cH+node.cV;
    return E[hb][vb]*T-node.cH;
  };
  /* CFR with regret matching */
  function walk(node,hb,vb,pH,pV){
    if(node.leaf) return leafEV(node,hb,vb);
    const actor=node.player,b=actor===0?hb:vb,n=node.actions.length;
    const I=node.info[b]||(node.info[b]={r:new Float64Array(n),s:new Float64Array(n)});
    let sum=0; const strat=new Array(n);
    for(let a=0;a<n;a++){strat[a]=I.r[a]>0?I.r[a]:0;sum+=strat[a];}
    for(let a=0;a<n;a++) strat[a]=sum>0?strat[a]/sum:1/n;
    const evs=new Array(n); let ev=0;
    for(let a=0;a<n;a++){
      evs[a]=walk(node.children[a],hb,vb,actor===0?pH*strat[a]:pH,actor===1?pV*strat[a]:pV);
      ev+=strat[a]*evs[a];
    }
    const w=actor===0?pV:pH, rp=actor===0?pH:pV;
    for(let a=0;a<n;a++){
      I.r[a]+=w*(actor===0?evs[a]-ev:ev-evs[a]);
      I.s[a]+=rp*strat[a];
    }
    return ev;
  }
  for(let it=0;it<2000;it++)
    walk(root,Math.floor(Math.random()*NB),Math.floor(Math.random()*NB),1,1);
  /* extract average strategy + EVs for hero's bucket */
  const avg=(node,b)=>{
    const n=node.actions.length, I=node.info[b];
    if(!I) return Array(n).fill(1/n);
    let s=0; for(let a=0;a<n;a++)s+=I.s[a];
    return s>0?Array.from(I.s,x=>x/s):Array(n).fill(1/n);
  };
  function evPair(node,hb,vb){
    if(node.leaf) return leafEV(node,hb,vb);
    const strat=avg(node,node.player===0?hb:vb);
    let ev=0;
    for(let a=0;a<node.actions.length;a++) ev+=strat[a]*evPair(node.children[a],hb,vb);
    return ev;
  }
  const strat=avg(root,myB), out=[];
  for(let a=0;a<root.actions.length;a++){
    let e=0; for(let vb=0;vb<NB;vb++) e+=evPair(root.children[a],myB,vb)/NB;
    out.push({name:root.actions[a].n,freq:strat[a],ev:e});
  }
  return {actions:out};
}

/* detect draws that use at least one hole card */
function detectDraws(hole,board){
  const made=evalBest(hole.concat(board));
  const out={flush:false,oesd:false,gutshot:false};
  if(made[0]>=5) return out; // already flush or better, draws moot
  const cards=hole.concat(board);
  const suitCount=[0,0,0,0];
  for(const c of cards) suitCount[c.s]++;
  for(let s=0;s<4;s++)
    if(suitCount[s]===4 && (hole[0].s===s||hole[1].s===s)) out.flush=true;
  if(made[0]!==4){ // no made straight
    const ranks=new Set(cards.map(c=>c.r));
    if(ranks.has(14)) ranks.add(1);
    const boardRanks=new Set(board.map(c=>c.r));
    if(boardRanks.has(14)) boardRanks.add(1);
    for(let lo=1;lo<=10;lo++){
      let cnt=0,bcnt=0,consec=0,maxConsec=0;
      for(let v=lo;v<lo+5;v++){
        if(ranks.has(v)){cnt++;consec++;maxConsec=Math.max(maxConsec,consec);}else consec=0;
        if(boardRanks.has(v))bcnt++;
      }
      if(cnt===4&&bcnt<4){ if(maxConsec>=4) out.oesd=true; else out.gutshot=true; }
    }
  }
  return out;
}
function findDrawOuts(hole,board){
  const known=new Set(hole.concat(board).map(c=>c.r*4+c.s));
  const made=evalBest(hole.concat(board));
  const flush=[], straight=[];
  for(const c of FULL_DECK){
    if(known.has(c.r*4+c.s))continue;
    const all=hole.concat(board).concat([c]);
    const sc=evalBest(all);
    if(made[0]<5&&sc[0]>=5&&(hole[0].s===c.s||hole[1].s===c.s)) flush.push(c);
    if(made[0]<4&&sc[0]>=4) straight.push(c);
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
function limperCount(p){
  if(state.stage!=='preflop'||state.currentBet>state.bb)return 0;
  /* voluntary limps only — BB posting the blind is not a limp */
  return inHand().filter(q=>q!==p&&q.bet>=state.bb&&(q.pos||'')!=='BB').length;
}
function flatCallerCount(p){
  if(state.stage!=='preflop'||state.currentBet<=state.bb)return 0;
  const raiserIdx=state.lastAggIdx;
  return inHand().filter(q=>q!==p&&q.i!==raiserIdx&&q.bet>=state.currentBet).length;
}
function coachPreflopRaiseSizing(p,actsLast){
  const facingRaise=state.currentBet>state.bb;
  const unit=facingRaise?state.currentBet:state.bb;
  const callers=facingRaise?flatCallerCount(p):limperCount(p);
  const stackBB=(p.chips+p.bet)/state.bb;
  const anteBB=state.ante*alive().length/Math.max(state.bb,1);
  const posKey=actsLast?'IP':'OOP';
  let mult=actsLast?3:4;
  mult+=callers;
  if(anteBB>=1) mult+=0.5;
  else if(anteBB>0) mult+=0.25;
  let depthAdj=0;
  if(stackBB>=120) depthAdj=0.5;
  else if(stackBB>=80) depthAdj=0.25;
  else if(stackBB<=20) depthAdj=-0.25;
  mult+=depthAdj;
  mult=Math.max(3,mult);
  return {
    target:unit*mult,
    mult,
    posKey,
    callers,
    anteAdj:anteBB>0,
    depthAdj
  };
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
function boardTexture(board){
  if(!board.length) return {paired:false,monotone:false,wet:false,flushDraw:false,dry:true};
  const bs=[0,0,0,0]; for(const c of board)bs[c.s]++;
  const br=board.map(c=>c.r).sort((a,b)=>a-b);
  const paired=br.some((r,i,a)=>i&&a[i-1]===r);
  const monotone=Math.max(...bs)>=3;
  const twoTone=bs.filter(v=>v>=2).length>=1&&Math.max(...bs)<3;
  const connected=br.length>=3&&br[br.length-1]-br[0]<=4;
  const wet=paired||monotone||connected;
  return {paired,monotone,wet,flushDraw:monotone||twoTone,dry:!wet};
}
function coachSpotBrief(p,extra,ctx){
  const {eq,eqAdj,odds,callAmt,pot,opps,pos,actsFirst,actsLast,airPen}=ctx;
  const eqShow=pct(eqAdj!=null?eqAdj:eq);
  const ip=actsLast?'IP':actsFirst?'OOP':'mid';
  let line=C('briefSpot',eqShow,callAmt>0?pct(odds):'—',callAmt>0?usd(callAmt):'—',usd(pot),pos||'—',ip,opps);
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
  const need=pct(R.odds||0);
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
function realTwoPairOrBetter(score,hole){
  if(!score)return false;
  if(score[0]>=3)return true;
  return score[0]===2&&hole.some(c=>c.r===score[1]||c.r===score[2]);
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
/* per-raiser-position 3-bet/call matrix, falling back to EP/LP buckets */
function facingChartFor(raiser){
  const rp=raiser&&raiser.pos;
  if(rp){
    const direct=chartFor('facing',rp);
    if(direct&&direct.raise&&direct.call) return {fc:direct,label:rp,perPos:true};
  }
  const vsEarlyR=raiser?/^(UTG|MP)/.test(raiser.pos||''):false;
  const key=vsEarlyR?'vsEarly':'vsLate';
  const fc=chartFor('facing',key);
  return fc&&fc.raise&&fc.call?{fc,label:key,perPos:false}:null;
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
  const opps=inHand().length-1;
  const stackBB=(p.chips+p.bet)/state.bb;
  const difficulty=coachDifficulty();
  const difficultyApplies=coachDifficultyApplies(p,difficulty);

  /* order of action on postflop streets (current or upcoming) */
  const ord=postflopOrder().filter(q=>q===p||!q.allIn);
  const ordIdx=ord.indexOf(p);
  const actsFirst=ordIdx===0, actsLast=ordIdx===ord.length-1&&ord.length>1;

  /* equity vs realistic RANGES (not random cards): caps from bets, floors from checks */
  const oppCaps=inHand().filter(q=>q!==p)
    .map(q=>{
      let cap=clamp(q.rangeCap||1,0.03,1), floor=clamp(q.rangeFloor||0,0,0.25);
      if(difficultyApplies){const d=coachDifficultyRange(q,cap,floor,difficulty);cap=d.cap;floor=d.floor;}
      return {cap,floor};
    })
    .sort((a,b)=>a.cap-b.cap).slice(0,4);
  const code=holeCode(p.hole), pr=handPct[code]||1;
  let eq,handDesc,drawRow='',extra=[];
  let eqAdj,airPen=0;
  let madeScore=null;
  const tightOpps=oppCaps.filter(o=>o.cap<1).length;
  const weakOpps=oppCaps.filter(o=>o.floor>0).length;
  if(tightOpps>0) extra.push(C('rangesNote',tightOpps,Math.round(Math.min(...oppCaps.map(o=>o.cap))*100)));
  if(weakOpps>0) extra.push(C('checksNote',weakOpps));
  coachPassiveLines(p,extra);
  const flags=getMode().coachFlags||{};
  if(difficultyApplies) extra.push(C(difficulty==='hard'?'diffHard':'diffEasy'));
  if(state.stage==='preflop'){
    eq=mcEquityR(p.hole,[],oppCaps,sims);
    handDesc=`${RANK_CH[p.hole[0].r]}${SUIT_CH[p.hole[0].s]} ${RANK_CH[p.hole[1].r]}${SUIT_CH[p.hole[1].s]} — ${code}, top ~${Math.round(pr*100)}%`;
  }else{
    eq=mcEquityR(p.hole,state.board,oppCaps,sims);
    const score=evalBest(p.hole.concat(state.board));
    madeScore=score;
    handDesc=handName(score);
    extra.push(classifyMade(p.hole,state.board,score));
    /* draws (only before the river) */
    if(state.stage!=='river'){
      const d=detectDraws(p.hole,state.board);
      const streets=state.stage==='flop'?2:1;
      const dr=[];
      const outs=findDrawOuts(p.hole,state.board);
      if(d.flush) dr.push(C('drawFlush',pct(Math.min(0.9,9*0.02*streets+0.02))));
      if(d.oesd) dr.push(C('drawOESD',pct(8*0.02*streets+0.02)));
      else if(d.gutshot) dr.push(C('drawGut',pct(4*0.02*streets+0.01)));
      if(dr.length){
        drawRow=`<div class="coach-row"><span>${T('draws')}</span><b>${dr.join('<br>')}</b></div>`;
        const outCards=d.flush&&d.oesd?[...outs.flush,...outs.straight]
          :d.flush?outs.flush:d.oesd||d.gutshot?outs.straight:[];
        const outTxt=formatOutList(outCards);
        if(outTxt){
          const split=splitCleanDirtyOuts(p.hole,state.board,outCards);
          const cleanTxt=formatOutList(split.clean);
          const dirtyTxt=formatOutList(split.dirty.map(x=>x.card));
          if(cleanTxt) drawRow+=`<div class="coach-row"><span>${T('outs')}</span><b>${cleanTxt}</b></div>`;
          if(dirtyTxt){
            drawRow+=`<div class="coach-row coach-row-dirty"><span>${T('dirtyOuts')}<button type="button" class="coach-info-btn" aria-expanded="false" aria-label="${T('dirtyOutsInfoLbl')}">&#8505;</button></span><b>${dirtyTxt}</b></div>`+
              `<p class="coach-info-tip hidden">${T('dirtyOutsInfo')}</p>`;
            const pairs=split.dirty.filter(x=>x.why==='pairs').map(x=>x.card);
            const fl=split.dirty.filter(x=>x.why==='flush').map(x=>x.card);
            if(pairs.length) extra.push(C('dirtyOutPairs',formatOutList(pairs)));
            if(fl.length) extra.push(C('dirtyOutFlush',formatOutList(fl)));
          }
        }
        extra.push(C('drawBaked'));
      }
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

  /* M-ratio (Harrington): stack vs the cost of one orbit's blinds+antes */
  const aliveN=alive().length;
  const orbitCost=state.sb+state.bb+state.ante*aliveN;
  const M=(p.chips+p.bet)/Math.max(orbitCost,1);
  const zoneOf=m=>m>20?'G':m>10?'Y':m>5?'O':'R';
  const mZone=zoneOf(M);

  /* ICM prize pressure: extra win-chance this call needs because busting costs prize equity */
  const icmPrem=flags.icm&&callAmt>0&&aliveN>2?icmPremium(p,callAmt,pot):0;
  if(flags.icm&&icmPrem>=0.01) extra.push(C('icmNote',Math.round(icmPrem*100),aliveN,Math.min(PAYOUTS(state.cfg.numPlayers).length,aliveN)));
  if(flags.cashNote) extra.push(C('cashModeNote'));

  let rec,why=[],chartInfo=null, smallStab=false;
  if(state.stage==='preflop'){
    const bucket=posBucket(pos), prTxt='top ~'+Math.round(pr*100)+'%';
    const unopened=state.currentBet<=state.bb;
    /* pocket pairs gain implied-odds value when deep: sets are disguised and win stacks */
    const isPair=p.hole[0].r===p.hole[1].r;
    const pairAdj=isPair&&stackBB>=(flags.deepStack?30:40);
    /* suited connectors also play above their raw ranking when deep (hidden straights/flushes) */
    const gapSC=Math.abs(p.hole[0].r-p.hole[1].r);
    const scAdj=!isPair&&p.hole[0].s===p.hole[1].s&&gapSC>=1&&gapSC<=2
      &&Math.max(p.hole[0].r,p.hole[1].r)<=12&&Math.min(p.hole[0].r,p.hole[1].r)>=5&&stackBB>=(flags.deepStack?25:30);
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
      const isoList=limpPot?chartFor('iso',pos):null;
      const rfi=chartFor('rfi',pos);
      const chartList=isoList||rfi;
      if(chartList) chartInfo={kind:isoList?'iso':'rfi',pos,list:chartList};
      const chartHit=chartList?chartList.includes(code):false;
      const pressureOpen=prEff<=thrEff&&callAmt>0||prEff<=Math.min(thrEff,0.10)&&callAmt===0;
      const isoSlack=dom.tier===2?0.13:dom.tier===1?0.08:0;
      const borderlineIso=dom.iso&&lateSteal&&callAmt>0&&!chartHit&&prEff<=thrEff+isoSlack&&eq>=0.14;
      if(chartHit&&callAmt>0||pressureOpen){
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
        if(isoList) why.push(C('chartNotInIso',code,pos));
        else why.push(rfi?C('chartNotIn',code,pos):C('pfOpenFold',code,prTxt,Math.round(thrEff*100),pos));
        if(dom.tier>=1&&lateSteal&&callAmt>0) extra.push(C('stackDomFoldHint'));
      }
    }else{
      /* facing a raise: BB defense vs steals, then per-raiser-position chart, then EP/LP bucket */
      const raiser=state.lastAggIdx>=0&&state.lastAggIdx!==p.i?state.players[state.lastAggIdx]:null;
      const shortCtBase=clamp(0.13+(late?0.05:0)+(early?-0.03:0),0.06,0.25);
      const shortCt=clamp(shortCtBase*tableSizeFacingFactor(aliveN,pos),0.06,aliveN<=2?0.45:aliveN===3?0.36:aliveN===4?0.30:0.25);
      if(aliveN<=4&&shortCt>shortCtBase*1.08) extra.push(C('tableSizeNote',aliveN,Math.round(shortCtBase*100),Math.round(shortCt*100)));
      let facing=pos==='BB'?bbDefendChartFor(raiser,pos):null;
      if(!facing) facing=facingChartFor(raiser);
      const domCall=stackDominance(p);
      const diffCallPad=difficultyApplies?coachDifficultyCallPad(difficulty):0;
      const stackCallOk=list=>isPair&&domCall.tier===2&&list.includes(code)&&callAmt>0&&eq>=odds+icmPrem+diffCallPad-0.05;
      if(facing){
        const {fc,label,perPos,bbDefend}=facing;
        chartInfo={kind:bbDefend?'bbDefend':'facing',pos:bbDefend?`BB vs ${label}`:(perPos?`vs ${label}`:label),list:fc.raise,list2:fc.call};
        if(bbDefend){
          if(fc.raise.includes(code)){
            rec='RAISE';
            why.push(C('chartBb3bet',code,label));
          }else if(fc.call.includes(code)&&eq>=odds+icmPrem+diffCallPad){
            rec='CALL';
            why.push(C('chartBbCall',code,label,pct(eq),pct(odds)));
          }else if(stackCallOk(fc.call)){
            rec='CALL';
            why.push(C('stackDomCall',code,Math.round(domCall.ratio*10)/10,pct(eq),pct(odds)));
          }else if(isPair&&callAmt>0&&callAmt<=(p.chips+p.bet)/15){
            rec='CALL';
            why.push(C('pfSetMine',code,usd(callAmt),Math.round((p.chips+p.bet)/callAmt)));
          }else if(aliveN<=4&&pr<=shortCt&&eq>=odds+icmPrem+diffCallPad){
            rec='CALL';
            why.push(C('pfCallRange',pos,Math.round(shortCt*100),code,prTxt,pct(eq),pct(odds)));
          }else if(fc.call.includes(code)){
            rec='FOLD';
            why.push(C('chartIcmFold',code,pct(eq),pct(odds)));
          }else{
            rec='FOLD';
            why.push(C('chartBbFold',code,label));
          }
        }else{
        const vsEarlyR=raiser?/^(UTG|MP)/.test(raiser.pos||''):false;
        if(fc.raise.includes(code)){
          rec='RAISE';
          why.push(C('chart3bet',code,vsEarlyR));
        }else if(fc.call.includes(code)&&eq>=odds+icmPrem+diffCallPad){
          rec='CALL';
          why.push(C('chartCallRaise',code,pct(eq),pct(odds)));
        }else if(stackCallOk(fc.call)){
          rec='CALL';
          why.push(C('stackDomCall',code,Math.round(domCall.ratio*10)/10,pct(eq),pct(odds)));
        }else if(isPair&&callAmt>0&&callAmt<=(p.chips+p.bet)/15){
          rec='CALL';
          why.push(C('pfSetMine',code,usd(callAmt),Math.round((p.chips+p.bet)/callAmt)));
        }else if(aliveN<=4&&pr<=shortCt&&eq>=odds+icmPrem+diffCallPad){
          rec='CALL';
          why.push(C('pfCallRange',pos,Math.round(shortCt*100),code,prTxt,pct(eq),pct(odds)));
        }else if(fc.call.includes(code)){
          rec='FOLD';
          why.push(C('chartIcmFold',code,pct(eq),pct(odds)));
        }else{
          rec='FOLD';
          why.push(C('chartFoldVs',code));
        }
        }
      }else{
        const ct=shortCt;
        if(pr<=0.05){
          rec='RAISE';
          why.push(C('pf3bet',code));
        }else if(pr<=ct&&eq>=odds+icmPrem+diffCallPad){
          rec='CALL';
          why.push(C('pfCallRange',pos,Math.round(ct*100),code,prTxt,pct(eq),pct(odds)));
        }else if(isPair&&callAmt>0&&callAmt<=(p.chips+p.bet)/15){
          rec='CALL';
          why.push(C('pfSetMine',code,usd(callAmt),Math.round((p.chips+p.bet)/callAmt)));
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
    const protectMade=!river&&checkedInFront>0&&opps<=3&&eq>=0.32&&realTwoPairOrBetter(madeScore,p.hole);
    const protectTopPair=!river&&checkedInFront>0&&opps<=3&&eq>=0.48&&hasTopPairOrBetter(madeScore,p.hole,state.board);
    if(eq>valueThresh){
      rec='RAISE';
      why.push(river?C('valRiver',pct(eq),opps):C('valBet',pct(eq),opps));
    }else if(protectMade||protectTopPair){
      rec='RAISE';
      why.push(C('protectBet',handDesc,pct(eq),opps));
    }else if(checkedDown.length&&eq>probeMin){
      rec='RAISE';
      smallStab=true;
      why.push(C('checkedDownStab',pct(eq),checkedDown.length));
    }else if(!river&&checkedToMe&&eq>stabMin){
      rec='RAISE';
      smallStab=true;
      why.push(C('stab',pct(eq)));
    }else if(probeStab){
      rec='RAISE';
      smallStab=true;
      why.push(C('probeStab',pct(eq),passiveStabbers.length,!actsLast));
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
    const myScore=evalBest(p.hole.concat(state.board));
    const drawOnly=d&&(d.gutshot||d.oesd||d.flush)&&myScore[0]<2;
    /* WHO is betting, and WHAT LINE did they take? exploit the player, read the story */
    const agg=state.lastAggIdx>=0&&state.lastAggIdx!==p.i?state.players[state.lastAggIdx]:null;
    /* postflop "matrix": show the hands the bettor is currently modeled on */
    if(agg){
      let capA=clamp(agg.rangeCap||1,0.03,1), floorA=clamp(agg.rangeFloor||0,0,0.25);
      if(difficultyApplies){const dA=coachDifficultyRange(agg,capA,floorA,difficulty);capA=dA.cap;floorA=dA.floor;}
      floorA=Math.min(floorA,capA*0.5);
      const lst=[];
      for(const h of HAND_ORDER){const ph=handPct[h];if(ph<=capA&&ph>floorA)lst.push(h);}
      chartInfo={kind:'range',pos:`${agg.name}${agg.pos?' ('+agg.pos+')':''}`,list:lst};
    }
    let exploitAdj=0;
    if(agg&&agg.style&&!agg.folded){
      if(agg.style.id==='rock'){exploitAdj=-0.04;extra.push(C('profRock'));}
      else if(agg.style.id==='maniac'){exploitAdj=+0.05;extra.push(C('profManiac'));}
      else if(agg.style.id==='station'){exploitAdj=-0.03;extra.push(C('profStation'));}
    }
    const diffAggAdj=difficultyApplies?coachDifficultyAggAdj(agg,betRatio,difficulty):0;
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
    const goodDraw=d&&(d.flush||d.oesd);
    airPen=(noMade&&!goodDraw)?0.15:0;
    eqAdj=eq-bigBetPen-airPen+exploitAdj+blockAdj+diffAggAdj;
    const edge=eqAdj-odds-posAdj-icmPrem;
    if(bigBetPen>=0.05) extra.push(C('bigBet',Math.round(betRatio*100)));
    if(d&&d.gutshot&&!d.oesd&&!d.flush&&betRatio>=0.5) extra.push(C('gutWarn'));
    if(airPen) extra.push(C('airWarn'));
    extra.push(C('mentalMath',usd(callAmt),usd(pot+callAmt),pct(odds)));
    if(eqAdj>0.68+posAdj&&!drawOnly){
      rec='RAISE';
      why.push(C('raiseVal',pct(eq)));
    }else if(edge>=0){
      rec='CALL';
      why.push(C('callOk',usd(callAmt),usd(pot),pct(odds),pct(eq),!!(bigBetPen||airPen),pct(eqAdj)));
    }else{
      rec='FOLD';
      why.push(C('foldAdv',pct(odds),usd(callAmt),usd(pot),pct(eqAdj),!!bigBetPen));
    }
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
      t=state.currentBet+Math.max(state.lastRaiseSize,Math.round(pot*(smallStab?0.33:0.66)));
    }
    coachT=clamp(Math.round(t/state.sb)*state.sb, state.currentBet+state.lastRaiseSize, p.bet+p.chips);
    if(sizePlan) extra.push(C('pfRaiseSize',usd(coachT),bbs(coachT),sizePlan.posKey,sizePlan.callers,sizePlan.anteAdj,sizePlan.depthAdj));
    if(postSizePlan) extra.push(C('postflopRaiseSize',usd(coachT),bbs(coachT),Math.round(postSizePlan.mult*10)/10,usd(callAmt),Math.round(postSizePlan.betRatio*100)));
  }
  /* rough chip-EV per available action (for blunder tracking) */
  const evRaiseTarget=state.stage==='preflop'
      ? coachPreflopRaiseSizing(p,actsLast).target
      : callAmt>0
      ? coachPostflopRaiseSizing(p,pot,callAmt).target
      : state.currentBet+Math.max(state.lastRaiseSize,Math.round(pot*(smallStab?0.33:0.66)));
  const tEv=clamp(Math.round(evRaiseTarget/state.sb)*state.sb,
    state.currentBet+state.lastRaiseSize, p.bet+p.chips);
  const FE=clamp(0.42-0.09*(opps-1),0.08,0.45);            // fold equity vs # of opponents
  const evR=A=>FE*pot+(1-FE)*(eq*(pot+2*A)-A);             // raise A more chips
  const evs={
    FOLD:0,
    CALL:Math.round(callAmt>0 ? eq*(pot+callAmt)-callAmt : eq*pot),
    RAISE:Math.round(evR(rec==='ALLIN' ? p.chips : tEv-p.bet))
  };
  coachSpotBrief(p,extra,{eq,eqAdj,odds,callAmt,pot,opps,pos,actsFirst,actsLast,airPen});
  return {rec,coachT,evs,why,extra,handDesc,drawRow,eq,eqAdj,airPen,odds,callAmt,pot,opps,pos,early,late,
          actsFirst,actsLast,ordIdx,ordLen:ord.length,M,mZone,icmPrem,chartInfo,code,spr,sprZone};
}

/* 13×13 range-matrix viewer: shows the chart the coach just used, hero's hand outlined */
function showChartMatrix(info,heroCode){
  if(!HAS_DOM||!info)return;
  const R=['A','K','Q','J','T','9','8','7','6','5','4','3','2'];
  const inSet=new Set(info.list), inSet2=new Set(info.list2||[]);
  let html='';
  for(let i=0;i<13;i++)for(let j=0;j<13;j++){
    const h=i===j?R[i]+R[j]:i<j?R[i]+R[j]+'s':R[j]+R[i]+'o';
    html+=`<div class="cc${inSet.has(h)?' in':inSet2.has(h)?' in2':''}${h===heroCode?' me':''}">${h}</div>`;
  }
  $('chartGrid').innerHTML=html;
  const titleKey=info.kind==='rfi'?'chartTitleOpen':info.kind==='iso'?'chartTitleIso':info.kind==='facing'?'chartTitleFacing':info.kind==='bbDefend'?'chartTitleBbDefend':info.kind==='range'?'chartTitleRange':'chartTitleShove';
  $('chartTitle').textContent=`${info.pos} — ${T(titleKey)}`;
  $('chartLegend').innerHTML=
    `<span><span class="sw" style="background:var(--gold);"></span>${T(info.kind==='rfi'||info.kind==='iso'?'legendOpen':info.kind==='facing'||info.kind==='bbDefend'?'legend3bet':info.kind==='range'?'legendRange':'legendShove')}</span>`+
    (info.list2?`<span><span class="sw" style="background:#2e7d8f;"></span>${T('legendCall')}</span>`:'')+
    `<span><span class="sw" style="background:#1d232e;"></span>${T('legendFold')}</span>`+
    `<span><span class="sw" style="background:none;outline:2px solid #4da3ff;outline-offset:-1px;"></span>${T('legendYou')}</span>`;
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
