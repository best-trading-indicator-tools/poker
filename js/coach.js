/* ===== coach prose (the "why" explanations), fully translated ===== */
const CPROSE={
en:{
rangesNote:(n,c)=>` Equity is simulated against realistic ranges: ${n} opponent${n>1?'s have':' has'} shown strength and ${n>1?'are':'is'} modeled on roughly the top ${c}% of hands, not random cards.`,
checksNote:n=>` ${n===1?'One opponent has':n+' opponents have'} checked — checks usually deny a strong hand, so the very top of ${n===1?'that range':'those ranges'} is trimmed in the simulation (watch out for traps, though).`,
madeBoardPair:' — careful: that pair sits entirely on the board, so every opponent has it too.',
madeOverpair:' — an overpair, very strong.',madeUnderPair:' — a pocket pair below the top board card.',madeTopPair:' — top pair, solid.',
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
pfOpen:(c,pr,t,p,pair)=>`No one has raised yet, and ${c} (${pr}) is inside the chart-based ~${t}% opening range for ${p}${pair?' once its set-mining value is counted — pocket pairs play above their raw ranking when stacks are deep, because flopping a set (~12%) is disguised and wins big pots':''}. Come in raising, not limping — it takes the initiative and can win the blinds outright.`,
pfBBfree:c=>`${c} isn't strong enough to raise from the big blind, but you see the flop for free.`,
pfOpenFold:(c,pr,t,p)=>`${c} (${pr}) is below the ~${t}% opening range for ${p}. Open-folding here is the textbook play — limping weak hands leaks chips long-term.`,
pf3bet:c=>`${c} is a premium holding (top 5%). Against a raise the standard play is to re-raise (3-bet) for value — flat calling lets weaker hands in cheaply behind you.`,
pfCallRange:(p,ct,c,pr,e,o)=>`Facing a raise, ${p} continues with roughly the top ${ct}% — ${c} (${pr}) qualifies, and your equity vs their range (${e}) covers the price (${o}).`,
pfSetMine:(c,amt,x)=>`${c} doesn't qualify on raw strength, but this is a textbook set-mine: the call is only ${amt} with ~${x}x that behind. You flop a set ~12% of the time — disguised, and it wins stacks. The 15-to-1 rule says the implied odds are there. Miss the flop, and it's an easy fold.`,
pfFoldRange:(ct,p,c,pr,e,o)=>`Against a raise, the ~top ${ct}% continues from ${p}; ${c} (${pr}) doesn't make it. Your equity vs a raiser's range is ~${e} needing ${o} — let it go.`,
valRiver:(e,n)=>`With ~${e} to win against ${n} opponent${n>1?'s':''}, you're likely best at showdown. Bet for value — a check wins you nothing extra, and worse hands may still pay you off.`,
valBet:(e,n)=>`With ~${e} to win against ${n} opponent${n>1?'s':''}, you're likely ahead. Bet for value — checking gives weaker hands and draws a free card to outdraw you.`,
stab:e=>`Everyone has checked to you, and checks usually mean weakness — their ranges look capped. With ~${e} plus all that fold equity, a stab takes this pot down often. If anyone calls or check-raises, slow down: that's real strength.`,
midRiver:e=>`A decent but unspectacular ~${e}. The board is complete — betting mostly gets called by better hands. Check and try to get to showdown cheaply.`,
midCheck:e=>`A decent but unspectacular ~${e}. Not strong enough to build a big pot; check and keep the pot small while you see what develops.`,
weakRiverLast:e=>`Only ~${e} to win and no cards left to come — your hand is final. Everyone has checked to you: check behind and take the free showdown.`,
weakRiverFirst:e=>`Only ~${e} to win and no cards left to come — your hand can't improve anymore. Check, and fold to any serious bet.`,
weakFree:e=>`Only ~${e} to win, but checking costs nothing. Take the free card and fold to any serious bet.`,
bigBet:r=>` This bet is ≈${r}% of the pot — bets that large are usually made hands (two pair or better), so the coach discounts your raw win chance here.`,
gutWarn:' Chasing a 4-out gutshot into big bets is a long-term money leak — even when you hit, you may not get paid enough to cover all the misses (poor implied odds).',
airWarn:' You have no made hand and no real draw — players who bet usually have at least a pair, and "pot-odds correct" calls with high cards are one of the biggest leaks in poker. The coach heavily discounts your raw win chance here.',
raiseVal:e=>`~${e} to win is a strong favorite. Raise for value and to charge draws — flat calling leaves money on the table.`,
callOk:(amt,pt,o,e,disc,ea)=>`The call costs ${amt} to win a ${pt} pot, so you need ${o} equity to break even. You have ~${e}${disc?` (counted as ~${ea} after discounts)`:''} — calling is profitable long-term, but raising would risk too much with a non-premium hand.`,
foldAdv:(o,amt,pt,ea,resp)=>`You need ${o} equity to call (${amt} into ${pt}) but only have ~${ea}${resp?' once the size of this bet is respected':''}. Every chip you put in here loses value — fold and wait for a better spot.`,
chart3bet:(c,e)=>`${c} is in the re-raise (3-bet) chart against ${e?'an early-position raiser':'a late-position raiser'} — solver ranges re-raise these hands instead of just calling: the big pairs for value, and hands like A5s as "blocker bluffs" (your ace makes his monster hands less likely). Flat-calling would let players behind you in cheaply.`,
chartCallRaise:(c,e,o)=>`${c} is in the calling chart against this raise — strong enough to see a flop, not strong enough to re-raise. Your win chance (${e}) covers the price (${o}). Call, and play carefully if you miss the flop.`,
chartIcmFold:(c,e,o)=>`${c} is normally a call here, but right now your simulated win chance (${e}) doesn't cover the price (${o}) once prize pressure and this raiser's range are counted. The chart is a guide — the math of THIS table says fold.`,
chartFoldVs:c=>`${c} is in neither the re-raise nor the calling chart against this raise — solver ranges simply fold it. Calling raises with hands like this is one of the most expensive habits in poker.`,
chartOpen:(c,p)=>`${c} is in the ${p} opening chart — a hand list taken from solver-computed ranges: raising it first-in from this seat is profitable in the long run. Come in raising, not limping.`,
chartNotIn:(c,p)=>`${c} is not in the ${p} opening chart — solver-computed ranges say this hand loses money when raised from this seat over the long run. Folding now saves chips for a better spot.`,
chartShove:(c,bb,p)=>`At ${bb} BB, ${c} is in the ${p} all-in chart (solver-computed shove ranges for short stacks). Going all-in maximizes your chance of winning the blinds and antes uncontested.`,
chartNotInShove:(c,p)=>`${c} is not in the ${p} all-in chart for this stack depth — shoving it loses money long-term. Fold and wait: even one round of patience usually offers a better hand.`,
benchProg:(i,n)=>`Running… tournament ${i} of ${n}`,
benchResult:(g,np,w,rw,im,ri,av,rav)=>`Over ${g} simulated ${np}-player tournaments, a bot following the coach's advice on EVERY decision: 🏆 won ${w}% of tournaments (a random player would win ${rw}%) · 💰 finished in the money ${im}% (random: ${ri}%) · average finish ${av} of ${np} (random: ${rav}). The coach can't beat luck in one game — but this is its long-term edge.`,
mentalMath:(c,s,o)=>` 🧮 Live mental math: price = call ÷ (pot + call) = ${c} ÷ ${s} ≈ ${o}. Your win%: count outs (cards that improve you to the best hand) × 4 on the flop, × 2 on the turn; with a made hand, estimate how often you beat what they'd bet like this. Then knock off ~5–15% versus big bets or with no pair — the same discounts the coach applied here.`,
mWarn:(n,m,z)=>` Blinds go up in ${n} hand${n>1?'s':''} — your M drops to ~${m} (${z}). Look for spots now rather than being forced to gamble later.`,
mExplain:m=>` What "M = ${m}" means: your stack divided by the cost of one full round of blinds and antes — i.e. you could survive ${m} more rounds folding everything. Above 20 🟢 play your normal game; 10–20 🟡 start fighting for pots; 5–10 🟠 favor shoving over small raises; under 5 🔴 it's all-in or fold.`,
widenNote:(b,e,d)=>` Rising blinds and dead money change the math: your normal ~${b}% opening range here is adjusted to ~${e}%${d===1?' — and the players left to act fold too much, so attack them':d===-1?' — tempered, because the players left to act defend wide, so steal less into them':''}.`,
icmNote:(x,left,paid)=>` 💰 Prize pressure: ${paid} place${paid>1?'s':''} get paid and ${left} player${left>1?'s are':' is'} left. In a tournament, chips you might LOSE are worth more than chips you might WIN — going broke costs you your shot at the prizes. So this call needs an extra ~${x}% win chance on top of the normal pot math. Near the bubble, when in doubt: fold and let the others bust each other.`,
lineCbet:` His flop bet is a routine "continuation bet" — players who raised before the flop bet again on almost any flop, good or bad. It tells us very little, so his range is barely narrowed for it.`,
lineBarrel:n=>` He has now bet ${n===3?'THREE streets in a row (flop, turn and river)':'two streets in a row'} — most players don't keep firing like that without a real hand. His range is read much tighter.`,
lineDonk:` He bet INTO the player who raised before the flop (a "donk bet") — an unusual move that's usually either a sneaky monster or a wild bluff. To be safe, it's read as strength.`,
lineCR:` He checked first, then raised (a "check-raise") — the classic trap move. That's read as a very strong range.`,
profRock:` The bettor is the 🪨 tight type — players like this almost never bluff big. Give this bet extra respect: without a strong hand yourself, folding is usually right.`,
profManiac:` The bettor is the 🔥 wild type — he bluffs so often that medium-strength hands go UP in value against him. You can call him down lighter than against anyone else.`,
profStation:` The bettor is the 📞 loose-passive type — he calls everything but almost never bets big without a real hand. His sudden aggression deserves respect.`,
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
pfOpen:(c,pr,t,p,pair)=>`Personne n’a relancé, et ${c} (${pr}) est dans la range d’ouverture (~${t}%) pour ${p}${pair?' une fois sa valeur de set-mining comptée — les paires servies valent plus que leur classement brut quand les tapis sont profonds : flopper un brelan (~12%) est caché et gagne de gros pots':''}. Entrez en relançant, pas en limpant — vous prenez l’initiative et pouvez gagner les blinds directement.`,
pfBBfree:c=>`${c} n’est pas assez fort pour relancer depuis la grosse blind, mais vous voyez le flop gratuitement.`,
pfOpenFold:(c,pr,t,p)=>`${c} (${pr}) est sous la range d’ouverture (~${t}%) pour ${p}. Se coucher ici est le jeu correct — limper des mains faibles fait fuir des jetons à long terme.`,
pf3bet:c=>`${c} est une main premium (top 5%). Face à une relance, le jeu standard est de sur-relancer (3-bet) pour la valeur — caller laisse entrer des mains plus faibles à bas prix derrière vous.`,
pfCallRange:(p,ct,c,pr,e,o)=>`Face à une relance, ${p} continue avec environ le top ${ct}% — ${c} (${pr}) est dedans, et votre équité contre sa range (${e}) couvre le prix (${o}).`,
pfSetMine:(c,amt,x)=>`${c} ne se qualifie pas sur sa force brute, mais c’est un set-mine d’école : le call ne coûte que ${amt} avec ~${x}x derrière. Vous floppez un brelan ~12% du temps — caché, et il gagne des tapis. La règle du 15 contre 1 valide les cotes implicites. Flop raté : on se couche sans regret.`,
pfFoldRange:(ct,p,c,pr,e,o)=>`Face à une relance, seul le top ~${ct}% continue depuis ${p} ; ${c} (${pr}) n’en fait pas partie. Votre équité contre la range d’un relanceur est ~${e} pour ${o} requis — laissez tomber.`,
valRiver:(e,n)=>`Avec ~${e} de chances de gain contre ${n} adversaire${n>1?'s':''}, vous êtes probablement devant à l’abattage. Misez pour la valeur — un check ne rapporte rien de plus, et des mains moins bonnes peuvent encore payer.`,
valBet:(e,n)=>`Avec ~${e} de chances de gain contre ${n} adversaire${n>1?'s':''}, vous êtes probablement devant. Misez pour la valeur — checker offre une carte gratuite aux mains plus faibles et aux tirages.`,
stab:e=>`Tout le monde a checké jusqu’à vous, et les checks trahissent souvent la faiblesse — leurs ranges semblent plafonnées. Avec ~${e} plus toute cette fold equity, une mise ramasse souvent ce pot. Si quelqu’un paie ou check-relance, ralentissez : c’est de la vraie force.`,
midRiver:e=>`Un score correct mais quelconque : ~${e}. Le board est complet — miser ne se fait payer que par mieux. Checkez et essayez d’atteindre l’abattage à bas prix.`,
midCheck:e=>`Un score correct mais quelconque : ~${e}. Pas assez fort pour gonfler le pot ; checkez et gardez le pot petit en attendant la suite.`,
weakRiverLast:e=>`Seulement ~${e} de chances de gain et plus aucune carte à venir — votre main est figée. Tout le monde a checké : checkez derrière et prenez l’abattage gratuit.`,
weakRiverFirst:e=>`Seulement ~${e} de chances de gain et plus aucune carte à venir — votre main ne peut plus s’améliorer. Checkez, et couchez-vous face à toute mise sérieuse.`,
weakFree:e=>`Seulement ~${e} de chances de gain, mais checker ne coûte rien. Prenez la carte gratuite et couchez-vous face à toute mise sérieuse.`,
bigBet:r=>` Cette mise fait ≈${r}% du pot — des mises aussi grosses sont généralement des mains faites (deux paires ou mieux), donc le coach décote votre chance de gain brute.`,
gutWarn:' Payer de grosses mises pour chasser un ventral à 4 outs est une fuite d’argent à long terme — même touché, vous ne serez pas assez payé pour couvrir tous les échecs (cotes implicites médiocres).',
airWarn:' Vous n’avez ni main faite ni vrai tirage — celui qui mise a généralement au moins une paire, et les calls « corrects en cotes » avec hauteur sont l’une des plus grosses fuites du poker. Le coach décote fortement votre chance de gain ici.',
raiseVal:e=>`~${e} de chances de gain : vous êtes grand favori. Relancez pour la valeur et pour faire payer les tirages — caller laisse de l’argent sur la table.`,
callOk:(amt,pt,o,e,disc,ea)=>`Le call coûte ${amt} pour gagner un pot de ${pt} : il vous faut ${o} d’équité pour être à l’équilibre. Vous avez ~${e}${disc?` (compté ~${ea} après décotes)`:''} — caller est rentable à long terme, mais relancer risquerait trop avec une main non premium.`,
foldAdv:(o,amt,pt,ea,resp)=>`Il vous faut ${o} d’équité pour payer (${amt} dans ${pt}) mais vous n’avez que ~${ea}${resp?' une fois la taille de cette mise respectée':''}. Chaque jeton investi ici perd de la valeur — couchez-vous et attendez un meilleur spot.`,
chart3bet:(c,e)=>`${c} figure dans la charte de sur-relance (3-bet) contre ${e?'un relanceur en début de parole':'un relanceur en fin de parole'} — les ranges solveur sur-relancent ces mains au lieu de suivre : les grosses paires pour la valeur, et des mains comme A5s en « bluff à blocker » (votre as rend ses monstres moins probables). Suivre laisserait entrer les joueurs derrière à bas prix.`,
chartCallRaise:(c,e,o)=>`${c} figure dans la charte de call contre cette relance — assez fort pour voir un flop, pas assez pour sur-relancer. Votre chance de gain (${e}) couvre le prix (${o}). Suivez, et jouez prudemment si vous ratez le flop.`,
chartIcmFold:(c,e,o)=>`${c} serait normalement un call ici, mais votre chance de gain simulée (${e}) ne couvre pas le prix (${o}) une fois la pression des prix et la range de ce relanceur comptées. La charte est un guide — le calcul de CETTE table dit de se coucher.`,
chartFoldVs:c=>`${c} ne figure ni dans la charte de 3-bet ni dans celle de call contre cette relance — les ranges solveur la couchent, tout simplement. Suivre des relances avec ce genre de main est l'une des habitudes les plus coûteuses du poker.`,
chartOpen:(c,p)=>`${c} figure dans la charte d'ouverture ${p} — une liste de mains issue de ranges calculées par solveur : la relancer en premier depuis ce siège est rentable à long terme. Entrez en relançant, pas en limpant.`,
chartNotIn:(c,p)=>`${c} ne figure pas dans la charte d'ouverture ${p} — les ranges calculées par solveur indiquent que cette main perd de l'argent relancée depuis ce siège. Se coucher maintenant garde des jetons pour un meilleur spot.`,
chartShove:(c,bb,p)=>`À ${bb} BB, ${c} figure dans la charte de tapis ${p} (ranges de shove calculées par solveur pour tapis courts). Partir à tapis maximise vos chances de gagner blinds et antes sans bagarre.`,
chartNotInShove:(c,p)=>`${c} ne figure pas dans la charte de tapis ${p} à cette profondeur — la jouer à tapis perd de l'argent à long terme. Couchez-vous : un tour de patience offre souvent une meilleure main.`,
benchProg:(i,n)=>`Simulation… tournoi ${i} sur ${n}`,
benchResult:(g,np,w,rw,im,ri,av,rav)=>`Sur ${g} tournois simulés à ${np} joueurs, un bot suivant les conseils du coach à CHAQUE décision : 🏆 a gagné ${w}% des tournois (un joueur aléatoire en gagnerait ${rw}%) · 💰 fini dans les places payées ${im}% (aléatoire : ${ri}%) · place moyenne ${av} sur ${np} (aléatoire : ${rav}). Le coach ne bat pas la chance sur une partie — mais voilà son avantage à long terme.`,
mentalMath:(c,s,o)=>` 🧮 Calcul mental en live : prix = mise à payer ÷ (pot + mise) = ${c} ÷ ${s} ≈ ${o}. Votre % de gain : comptez vos outs (cartes qui vous donnent la meilleure main) × 4 au flop, × 2 au turn ; avec une main faite, estimez la fréquence à laquelle vous battez ce qu'il miserait ainsi. Retirez ensuite ~5–15 % face aux grosses mises ou sans paire — les mêmes décotes que le coach a appliquées ici.`,
mWarn:(n,m,z)=>` Les blinds montent dans ${n} main${n>1?'s':''} — votre M tombera à ~${m} (${z}). Cherchez des spots maintenant plutôt que d'être forcé de jouer à pile ou face plus tard.`,
mExplain:m=>` Ce que signifie « M = ${m} » : votre tapis divisé par le coût d'un tour complet de blinds et d'antes — vous pourriez survivre ${m} tours en jetant tout. Au-dessus de 20 🟢, jouez votre jeu normal ; 10–20 🟡, commencez à vous battre pour les pots ; 5–10 🟠, préférez le tapis aux petites relances ; sous 5 🔴, c'est tapis ou couché.`,
widenNote:(b,e,d)=>` Les blinds qui montent et l'argent mort changent le calcul : votre range d'ouverture normale (~${b}%) est ajustée à ~${e}%${d===1?' — et les joueurs restants se couchent trop : attaquez-les':d===-1?' — tempérée, car les joueurs restants défendent large : volez moins contre eux':''}.`,
icmNote:(x,left,paid)=>` 💰 Pression des prix : ${paid} place${paid>1?'s sont payées':' est payée'} et il reste ${left} joueur${left>1?'s':''}. En tournoi, les jetons que vous risquez de PERDRE valent plus que ceux que vous pouvez GAGNER — sauter vous coûte votre chance de prix. Ce call demande donc ~${x}% de chances de gain EN PLUS du calcul normal du pot. Près de la bulle, dans le doute : couchez-vous et laissez les autres s'éliminer.`,
lineCbet:` Sa mise au flop est un « continuation bet » de routine — celui qui a relancé avant le flop remise sur presque n'importe quel flop, bon ou mauvais. Cela ne nous apprend presque rien : sa range n'est guère resserrée.`,
lineBarrel:n=>` Il vient de miser ${n===3?'TROIS rues d\'affilée (flop, turn et river)':'deux rues d\'affilée'} — la plupart des joueurs ne continuent pas à tirer ainsi sans une vraie main. Sa range est lue beaucoup plus serrée.`,
lineDonk:` Il a misé CONTRE le relanceur pré-flop (un « donk bet ») — un coup inhabituel : en général soit un monstre déguisé, soit un gros bluff. Par prudence, on le lit comme de la force.`,
lineCR:` Il a d'abord checké, puis relancé (un « check-raise ») — le piège classique. C'est lu comme une range très forte.`,
profRock:` Le miseur est du type 🪨 serré — ces joueurs ne bluffent presque jamais gros. Respectez cette mise : sans main forte, se coucher est généralement correct.`,
profManiac:` Le miseur est du type 🔥 fou — il bluffe si souvent que vos mains moyennes PRENNENT de la valeur contre lui. Vous pouvez le payer plus léger que n'importe qui d'autre.`,
profStation:` Le miseur est du type 📞 passif — il paie tout mais ne mise presque jamais gros sans une vraie main. Son agression soudaine mérite le respect.`,
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
pfOpen:(c,pr,t,p,pair)=>`Nadie ha subido aún, y ${c} (${pr}) está dentro del rango de apertura (~${t}%) para ${p}${pair?' contando su valor de set-mining — las parejas de mano valen más que su ranking bruto con stacks profundos: ligar un trío (~12%) va disfrazado y gana botes grandes':''}. Entra subiendo, no de limp — tomas la iniciativa y puedes llevarte las ciegas directamente.`,
pfBBfree:c=>`${c} no es lo bastante fuerte para subir desde la ciega grande, pero ves el flop gratis.`,
pfOpenFold:(c,pr,t,p)=>`${c} (${pr}) está por debajo del rango de apertura (~${t}%) para ${p}. Retirarse aquí es el juego de libro — entrar de limp con manos débiles pierde fichas a largo plazo.`,
pf3bet:c=>`${c} es una mano premium (top 5%). Contra una subida, lo estándar es resubir (3-bet) por valor — solo igualar deja entrar barato a manos peores detrás de ti.`,
pfCallRange:(p,ct,c,pr,e,o)=>`Ante una subida, ${p} continúa con aproximadamente el top ${ct}% — ${c} (${pr}) califica, y tu equidad contra su rango (${e}) cubre el precio (${o}).`,
pfSetMine:(c,amt,x)=>`${c} no califica por fuerza bruta, pero es un set-mine de manual: la llamada cuesta solo ${amt} con ~${x}x detrás. Ligas trío ~12% de las veces — disfrazado, y gana stacks enteros. La regla del 15 a 1 dice que las odds implícitas están. Si fallas el flop, te retiras sin dudar.`,
pfFoldRange:(ct,p,c,pr,e,o)=>`Contra una subida, solo continúa el ~top ${ct}% desde ${p}; ${c} (${pr}) no llega. Tu equidad contra el rango de quien sube es ~${e} necesitando ${o} — déjala ir.`,
valRiver:(e,n)=>`Con ~${e} de probabilidad contra ${n} rival${n>1?'es':''}, probablemente eres el mejor en el showdown. Apuesta por valor — pasar no te gana nada extra, y manos peores aún pueden pagarte.`,
valBet:(e,n)=>`Con ~${e} de probabilidad contra ${n} rival${n>1?'es':''}, probablemente vas por delante. Apuesta por valor — pasar regala una carta gratis a manos peores y proyectos.`,
stab:e=>`Todos han pasado hasta ti, y pasar suele significar debilidad — sus rangos parecen limitados. Con ~${e} más toda esa fold equity, una apuesta se lleva este bote a menudo. Si alguien iguala o sube tras pasar, frena: eso es fuerza de verdad.`,
midRiver:e=>`Un ~${e} decente pero sin más. La mesa está completa — apostar solo lo pagan manos mejores. Pasa e intenta llegar barato al showdown.`,
midCheck:e=>`Un ~${e} decente pero sin más. No da para inflar el bote; pasa y mantén el bote pequeño mientras ves qué pasa.`,
weakRiverLast:e=>`Solo ~${e} de probabilidad y no quedan cartas — tu mano es definitiva. Todos han pasado: pasa también y llévate el showdown gratis.`,
weakRiverFirst:e=>`Solo ~${e} de probabilidad y no quedan cartas — tu mano ya no puede mejorar. Pasa, y retírate ante cualquier apuesta seria.`,
weakFree:e=>`Solo ~${e} de probabilidad, pero pasar no cuesta nada. Toma la carta gratis y retírate ante cualquier apuesta seria.`,
bigBet:r=>` Esta apuesta es ≈${r}% del bote — apuestas tan grandes suelen ser manos hechas (doble pareja o mejor), así que el coach descuenta tu probabilidad bruta aquí.`,
gutWarn:' Perseguir una escalera interna de 4 outs contra apuestas grandes es una fuga de dinero a largo plazo — incluso cuando ligas, no te pagan lo suficiente para cubrir todos los fallos (odds implícitas pobres).',
airWarn:' No tienes mano hecha ni proyecto real — quien apuesta suele tener al menos una pareja, y las llamadas "correctas por odds" con carta alta son una de las mayores fugas del póker. El coach descuenta mucho tu probabilidad bruta aquí.',
raiseVal:e=>`~${e} de probabilidad: eres gran favorito. Sube por valor y para cobrar a los proyectos — solo igualar deja dinero sobre la mesa.`,
callOk:(amt,pt,o,e,disc,ea)=>`La llamada cuesta ${amt} para ganar un bote de ${pt}: necesitas ${o} de equidad para no perder. Tienes ~${e}${disc?` (contado como ~${ea} tras descuentos)`:''} — igualar es rentable a largo plazo, pero subir arriesgaría demasiado con una mano no premium.`,
foldAdv:(o,amt,pt,ea,resp)=>`Necesitas ${o} de equidad para igualar (${amt} en ${pt}) pero solo tienes ~${ea}${resp?' una vez respetado el tamaño de esta apuesta':''}. Cada ficha que pongas aquí pierde valor — retírate y espera un mejor momento.`,
chart3bet:(c,e)=>`${c} está en la tabla de resubida (3-bet) contra ${e?'quien sube desde posición temprana':'quien sube desde posición tardía'} — los rangos de solver resuben estas manos en vez de solo igualar: las parejas grandes por valor, y manos como A5s como "farol con blocker" (tu as hace menos probables sus monstruos). Solo igualar dejaría entrar barato a los de detrás.`,
chartCallRaise:(c,e,o)=>`${c} está en la tabla de llamada contra esta subida — bastante fuerte para ver un flop, no tanto como para resubir. Tu probabilidad (${e}) cubre el precio (${o}). Iguala, y juega con cuidado si fallas el flop.`,
chartIcmFold:(c,e,o)=>`${c} normalmente sería una llamada aquí, pero tu probabilidad simulada (${e}) no cubre el precio (${o}) contando la presión de premios y el rango de quien sube. La tabla es una guía — las cuentas de ESTA mesa dicen retirarse.`,
chartFoldVs:c=>`${c} no está ni en la tabla de 3-bet ni en la de llamada contra esta subida — los rangos de solver simplemente la tiran. Igualar subidas con manos así es uno de los hábitos más caros del póker.`,
chartOpen:(c,p)=>`${c} está en la tabla de apertura de ${p} — una lista de manos sacada de rangos calculados por solver: subirla primero desde este asiento es rentable a largo plazo. Entra subiendo, no de limp.`,
chartNotIn:(c,p)=>`${c} no está en la tabla de apertura de ${p} — los rangos calculados por solver dicen que esta mano pierde dinero subida desde este asiento. Retirarse ahora guarda fichas para un momento mejor.`,
chartShove:(c,bb,p)=>`Con ${bb} BB, ${c} está en la tabla de all-in de ${p} (rangos de shove calculados por solver para stacks cortos). Ir all-in maximiza tus opciones de llevarte ciegas y antes sin pelea.`,
chartNotInShove:(c,p)=>`${c} no está en la tabla de all-in de ${p} a esta profundidad — jugarla all-in pierde dinero a largo plazo. Retírate: una ronda de paciencia suele traer una mano mejor.`,
benchProg:(i,n)=>`Simulando… torneo ${i} de ${n}`,
benchResult:(g,np,w,rw,im,ri,av,rav)=>`En ${g} torneos simulados de ${np} jugadores, un bot que sigue el consejo del coach en CADA decisión: 🏆 ganó el ${w}% de los torneos (un jugador aleatorio ganaría el ${rw}%) · 💰 terminó en premios el ${im}% (aleatorio: ${ri}%) · puesto medio ${av} de ${np} (aleatorio: ${rav}). El coach no vence a la suerte en una partida — pero esta es su ventaja a largo plazo.`,
mentalMath:(c,s,o)=>` 🧮 Cálculo mental en vivo: precio = llamada ÷ (bote + llamada) = ${c} ÷ ${s} ≈ ${o}. Tu % de ganar: cuenta tus outs (cartas que te dan la mejor mano) × 4 en el flop, × 2 en el turn; con mano hecha, estima cuántas veces ganas a lo que apostaría así. Luego resta ~5–15% contra apuestas grandes o sin pareja — los mismos descuentos que el coach aplicó aquí.`,
mWarn:(n,m,z)=>` Las ciegas suben en ${n} mano${n>1?'s':''} — tu M caerá a ~${m} (${z}). Busca jugadas ahora antes de verte forzado a jugártela.`,
mExplain:m=>` Qué significa «M = ${m}»: tu stack dividido por el coste de una ronda completa de ciegas y antes — sobrevivirías ${m} rondas tirándolo todo. Por encima de 20 🟢, juega tu juego normal; 10–20 🟡, empieza a pelear por los botes; 5–10 🟠, prefiere el all-in a subidas pequeñas; bajo 5 🔴, all-in o retirarse.`,
widenNote:(b,e,d)=>` Las ciegas crecientes y el dinero muerto cambian el cálculo: tu rango de apertura normal (~${b}%) se ajusta a ~${e}%${d===1?' — y los jugadores por hablar se retiran demasiado: atácalos':d===-1?' — moderado, porque los que quedan defienden mucho: roba menos contra ellos':''}.`,
icmNote:(x,left,paid)=>` 💰 Presión de premios: se paga${paid>1?'n':''} ${paid} puesto${paid>1?'s':''} y quedan ${left} jugador${left>1?'es':''}. En un torneo, las fichas que puedes PERDER valen más que las que puedes GANAR — quedarte sin fichas te cuesta tu opción a premio. Esta llamada necesita ~${x}% extra de probabilidad además del cálculo normal del bote. Cerca de la burbuja, ante la duda: retírate y deja que los demás se eliminen.`,
lineCbet:` Su apuesta en el flop es una "apuesta de continuación" rutinaria — quien subió antes del flop vuelve a apostar en casi cualquier flop, bueno o malo. Dice muy poco, así que su rango apenas se estrecha.`,
lineBarrel:n=>` Ya ha apostado ${n===3?'TRES calles seguidas (flop, turn y river)':'dos calles seguidas'} — la mayoría no sigue disparando así sin una mano real. Su rango se lee mucho más estrecho.`,
lineDonk:` Apostó CONTRA quien subió antes del flop (un "donk bet") — una jugada rara: suele ser un monstruo disimulado o un farol salvaje. Por seguridad, se lee como fuerza.`,
lineCR:` Primero pasó y luego subió (un "check-raise") — la trampa clásica. Se lee como un rango muy fuerte.`,
profRock:` El apostador es del tipo 🪨 cerrado — estos jugadores casi nunca farolean fuerte. Respeta esta apuesta: sin una mano fuerte, retirarse suele ser lo correcto.`,
profManiac:` El apostador es del tipo 🔥 salvaje — farolea tanto que tus manos medias SUBEN de valor contra él. Puedes pagarle más ligero que a nadie.`,
profStation:` El apostador es del tipo 📞 pasivo — lo paga todo pero casi nunca apuesta fuerte sin mano real. Su agresión repentina merece respeto.`,
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
/* classify a made pair/two-pair relative to the board */
function classifyMade(hole,board,score){
  if(board.length===0||score[0]>2) return '';
  const boardRanks=board.map(c=>c.r);
  const boardMax=Math.max(...boardRanks);
  const cnt=r=>boardRanks.filter(x=>x===r).length;
  if(score[0]===1||score[0]===2){
    const pr=score[1];
    if(cnt(pr)>=2) return C('madeBoardPair');
    if(hole[0].r===pr&&hole[1].r===pr) return pr>boardMax?C('madeOverpair'):C('madeUnderPair');
    if(pr===boardMax) return C('madeTopPair');
    if(pr<boardMax) return C('madeNotTop',rankNm(boardMax));
  }
  return '';
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
  if(stackBB<=10) return '10';
  if(stackBB<=15) return '15';
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
    if(alive().length<=1)return 0;
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
    return clamp(need-chipNeed,0,0.25);
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
/* the coach BRAIN: pure decision logic, runs headless (also powers the benchmark bot) */
function coachDecide(p){
  const sims=BENCH?180:500;
  const callAmt=Math.min(state.currentBet-p.bet,p.chips);
  const pot=state.players.reduce((s,q)=>s+q.totalBet,0);
  const opps=inHand().length-1;
  const stackBB=(p.chips+p.bet)/state.bb;

  /* order of action on postflop streets (current or upcoming) */
  const ord=postflopOrder().filter(q=>q===p||!q.allIn);
  const ordIdx=ord.indexOf(p);
  const actsFirst=ordIdx===0, actsLast=ordIdx===ord.length-1&&ord.length>1;

  /* equity vs realistic RANGES (not random cards): caps from bets, floors from checks */
  const oppCaps=inHand().filter(q=>q!==p)
    .map(q=>({cap:clamp(q.rangeCap||1,0.03,1),floor:clamp(q.rangeFloor||0,0,0.25)}))
    .sort((a,b)=>a.cap-b.cap).slice(0,4);
  const code=holeCode(p.hole), pr=handPct[code]||1;
  let eq,handDesc,drawRow='',extra=[];
  const tightOpps=oppCaps.filter(o=>o.cap<1).length;
  const weakOpps=oppCaps.filter(o=>o.floor>0).length;
  if(tightOpps>0) extra.push(C('rangesNote',tightOpps,Math.round(Math.min(...oppCaps.map(o=>o.cap))*100)));
  if(weakOpps>0) extra.push(C('checksNote',weakOpps));
  if(state.stage==='preflop'){
    eq=mcEquityR(p.hole,[],oppCaps,sims);
    handDesc=`${RANK_CH[p.hole[0].r]}${SUIT_CH[p.hole[0].s]} ${RANK_CH[p.hole[1].r]}${SUIT_CH[p.hole[1].s]} — ${code}, top ~${Math.round(pr*100)}%`;
  }else{
    eq=mcEquityR(p.hole,state.board,oppCaps,sims);
    const score=evalBest(p.hole.concat(state.board));
    handDesc=handName(score);
    extra.push(classifyMade(p.hole,state.board,score));
    /* draws (only before the river) */
    if(state.stage!=='river'){
      const d=detectDraws(p.hole,state.board);
      const streets=state.stage==='flop'?2:1;
      const dr=[];
      if(d.flush) dr.push(C('drawFlush',pct(Math.min(0.9,9*0.02*streets+0.02))));
      if(d.oesd) dr.push(C('drawOESD',pct(8*0.02*streets+0.02)));
      else if(d.gutshot) dr.push(C('drawGut',pct(4*0.02*streets+0.01)));
      if(dr.length){
        drawRow=`<div class="coach-row"><span>${T('draws')}</span><b>${dr.join('<br>')}</b></div>`;
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
  }
  const odds=callAmt>0?callAmt/(pot+callAmt):0;

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
  const icmPrem=callAmt>0?icmPremium(p,callAmt,pot):0;
  if(icmPrem>=0.01) extra.push(C('icmNote',Math.round(icmPrem*100),aliveN,Math.min(PAYOUTS(state.cfg.numPlayers).length,aliveN)));

  let rec,why=[],chartInfo=null;
  if(state.stage==='preflop'){
    const bucket=posBucket(pos), prTxt='top ~'+Math.round(pr*100)+'%';
    const unopened=state.currentBet<=state.bb;
    /* pocket pairs gain implied-odds value when deep: sets are disguised and win stacks */
    const isPair=p.hole[0].r===p.hole[1].r;
    const pairAdj=isPair&&stackBB>=40;
    /* suited connectors also play above their raw ranking when deep (hidden straights/flushes) */
    const gapSC=Math.abs(p.hole[0].r-p.hole[1].r);
    const scAdj=!isPair&&p.hole[0].s===p.hole[1].s&&gapSC>=1&&gapSC<=2
      &&Math.max(p.hole[0].r,p.hole[1].r)<=12&&Math.min(p.hole[0].r,p.hole[1].r)>=5&&stackBB>=30;
    const prEff=(pairAdj?pr*0.8:pr)*(scAdj?0.85:1);
    if(scAdj&&state.currentBet<=state.bb) extra.push(C('suitedConn'));
    /* zone-drop warning: what does the NEXT blind level do to your M? */
    if(state.level<state.levels.length-1){
      const per=SPEED_HANDS[state.cfg.speed];
      const handsLeft=per-((state.handNum-1)%per+1)+1;
      const nbb=state.levels[state.level+1];
      const nante=state.cfg.ante?Math.max(1,Math.round(nbb*state.cfg.ante)):0;
      const mNext=(p.chips+p.bet)/Math.max(nbb*1.5+nante*aliveN,1);
      if(zoneOf(mNext)!==mZone&&mNext<M) extra.push(C('mWarn',handsLeft,Math.round(mNext),T('zone'+zoneOf(mNext))));
    }
    /* always teach what M means — jargon is useless unexplained */
    extra.push(C('mExplain',Math.round(M)));
    if(stackBB<=10){
      /* push/fold territory: prefer the external solver chart, fall back to Nash threshold */
      const thr=PUSH_THR[bucket];
      const shoveCharts=chartFor('shove',shoveChartKey(stackBB));
      const sChart=shoveCharts?shoveCharts[bucket]:null;
      if(sChart) chartInfo={kind:'shove',pos:pos||bucket,list:sChart};
      const shoveYes=sChart?sChart.includes(code):pr<=thr;
      if(shoveYes&&state.currentBet<=state.bb){
        rec='ALLIN';
        why.push(sChart?C('chartShove',code,Math.round(stackBB),pos||bucket):C('pfShove',Math.round(stackBB),code,prTxt,Math.round(thr*100),pos||'—'));
      }else if(!shoveYes&&sChart&&callAmt>0&&!(eq>=odds+0.07+icmPrem)){
        rec='FOLD';
        why.push(C('chartNotInShove',code,pos||bucket));
      }else if(pr<=thr&&state.currentBet>state.bb&&eq>=odds+icmPrem){
        rec='ALLIN';
        why.push(C('pfShove',Math.round(stackBB),code,prTxt,Math.round(thr*100),pos||'—'));
      }else if(callAmt===0){
        rec='CHECK';
        why.push(C('pfShortCheck',code,pos));
      }else if(eq>=odds+0.07+icmPrem){
        rec='CALL';
        why.push(C('pfShortCall',code,pct(eq),pct(odds)));
      }else{
        rec='FOLD';
        why.push(C('pfShortFold',Math.round(stackBB),code,prTxt,Math.round(thr*100),pos));
      }
    }else if(unopened){
      const thr=OPEN_THR[bucket];
      /* tournament pressure: shorter stacks widen steals (late pos), antes add dead money,
         and the profiles still to act matter — steal more vs folders, less vs defenders */
      const lateSteal=/(BTN|CO|HJ|SB)/.test(pos);
      const press=clamp((25-stackBB)/15,0,1);                 // 0 at 25BB+, 1 at 10BB
      const fStack=lateSteal?1+0.45*press:/^MP/.test(pos)?1+0.15*press:1;
      const fAnte=Math.min(1.35,1+0.6*(state.ante*aliveN)/(1.5*state.bb));
      let fProf=1, profDir=0;
      if(lateSteal){
        const behind=inHand().filter(q=>q!==p&&!q.acted&&q.style);
        if(behind.length){
          const mlt={rock:1.25,station:0.8,shark:0.95,maniac:0.7};
          fProf=behind.reduce((s,q)=>s+(mlt[q.style.id]||1),0)/behind.length;
          profDir=fProf>1.08?1:fProf<0.92?-1:0;
        }
      }
      const thrEff=Math.min(0.6,thr*fStack*fAnte*fProf);
      /* always explain when profiles behind shift the steal math, even slightly */
      if(Math.abs(thrEff-thr)/thr>0.12||profDir!==0) extra.push(C('widenNote',Math.round(thr*100),Math.round(thrEff*100),profDir));
      /* solver chart first: is this exact hand in this position's opening matrix? */
      const rfi=chartFor('rfi',pos);
      if(rfi) chartInfo={kind:'rfi',pos,list:rfi};
      const chartHit=rfi?rfi.includes(code):false;
      const pressureOpen=prEff<=thrEff&&callAmt>0||prEff<=Math.min(thrEff,0.10)&&callAmt===0;
      if(chartHit&&callAmt>0||pressureOpen){
        rec='RAISE';
        why.push(chartHit?C('chartOpen',code,pos):C('pfOpen',code,prTxt,Math.round(thrEff*100),pos,pairAdj&&pr>thrEff));
      }else if(callAmt===0){
        rec='CHECK';
        why.push(C('pfBBfree',code));
      }else{
        rec='FOLD';
        why.push(rfi?C('chartNotIn',code,pos):C('pfOpenFold',code,prTxt,Math.round(thrEff*100),pos));
      }
    }else{
      /* facing a raise: per-raiser-position solver chart, then EP/LP bucket fallback */
      const raiser=state.lastAggIdx>=0&&state.lastAggIdx!==p.i?state.players[state.lastAggIdx]:null;
      const facing=facingChartFor(raiser);
      if(facing){
        const {fc,label,perPos}=facing;
        chartInfo={kind:'facing',pos:perPos?`vs ${label}`:label,list:fc.raise,list2:fc.call};
        const vsEarlyR=raiser?/^(UTG|MP)/.test(raiser.pos||''):false;
        if(fc.raise.includes(code)){
          rec='RAISE';
          why.push(C('chart3bet',code,vsEarlyR));
        }else if(fc.call.includes(code)&&eq>=odds+icmPrem){
          rec='CALL';
          why.push(C('chartCallRaise',code,pct(eq),pct(odds)));
        }else if(isPair&&callAmt>0&&callAmt<=(p.chips+p.bet)/15){
          rec='CALL';
          why.push(C('pfSetMine',code,usd(callAmt),Math.round((p.chips+p.bet)/callAmt)));
        }else if(fc.call.includes(code)){
          rec='FOLD';
          why.push(C('chartIcmFold',code,pct(eq),pct(odds)));
        }else{
          rec='FOLD';
          why.push(C('chartFoldVs',code));
        }
      }else{
        const ct=clamp(0.13+(late?0.05:0)+(early?-0.03:0),0.06,0.25);
        if(pr<=0.05){
          rec='RAISE';
          why.push(C('pf3bet',code));
        }else if(pr<=ct&&eq>=odds+icmPrem){
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
    if(eq>0.62){
      rec='RAISE';
      why.push(river?C('valRiver',pct(eq),opps):C('valBet',pct(eq),opps));
    }else if(!river&&checkedToMe&&eq>0.38){
      rec='RAISE';
      why.push(C('stab',pct(eq)));
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
      const capA=clamp(agg.rangeCap||1,0.03,1), floorA=Math.min(clamp(agg.rangeFloor||0,0,0.25),capA*0.5);
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
    const airPen=(noMade&&!goodDraw)?0.15:0;
    const eqAdj=eq-bigBetPen-airPen+exploitAdj+blockAdj;
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
  let coachT=0;
  if(rec==='RAISE'||rec==='ALLIN'){
    let t = rec==='ALLIN' ? p.bet+p.chips
      : state.stage==='preflop'
      ? Math.max(state.bb*3, state.currentBet*2.6)
      : state.currentBet+Math.max(state.lastRaiseSize,Math.round(pot*0.66));
    coachT=clamp(Math.round(t/state.sb)*state.sb, state.currentBet+state.lastRaiseSize, p.bet+p.chips);
  }
  /* rough chip-EV per available action (for blunder tracking) */
  const tEv=clamp(Math.round((state.stage==='preflop'
      ? Math.max(state.bb*3,state.currentBet*2.6)
      : state.currentBet+Math.max(state.lastRaiseSize,Math.round(pot*0.66)))/state.sb)*state.sb,
    state.currentBet+state.lastRaiseSize, p.bet+p.chips);
  const FE=clamp(0.42-0.09*(opps-1),0.08,0.45);            // fold equity vs # of opponents
  const evR=A=>FE*pot+(1-FE)*(eq*(pot+2*A)-A);             // raise A more chips
  const evs={
    FOLD:0,
    CALL:Math.round(callAmt>0 ? eq*(pot+callAmt)-callAmt : eq*pot),
    RAISE:Math.round(evR(rec==='ALLIN' ? p.chips : tEv-p.bet))
  };
  return {rec,coachT,evs,why,extra,handDesc,drawRow,eq,odds,callAmt,pot,opps,pos,early,late,
          actsFirst,actsLast,ordIdx,ordLen:ord.length,M,mZone,icmPrem,chartInfo,code};
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
  const titleKey=info.kind==='rfi'?'chartTitleOpen':info.kind==='facing'?'chartTitleFacing':info.kind==='range'?'chartTitleRange':'chartTitleShove';
  $('chartTitle').textContent=`${info.pos} — ${T(titleKey)}`;
  $('chartLegend').innerHTML=
    `<span><span class="sw" style="background:var(--gold);"></span>${T(info.kind==='rfi'?'legendOpen':info.kind==='facing'?'legend3bet':info.kind==='range'?'legendRange':'legendShove')}</span>`+
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
  const cfgB={numPlayers:9,startBB:100,startBlind:100,ante:0.10,speed:'turbo',difficulty:'medium',allAI:true,coachBot:true};
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
