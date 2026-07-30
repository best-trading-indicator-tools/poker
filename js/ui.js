/* ================= I18N (UI chrome; coach prose stays English for now) ================= */
const TR={
en:{sub:"No-Limit Texas Hold'em tournament vs AI",subCash:"No-Limit Texas Hold'em cash game vs AI",modeLbl:"Game mode",modeSng:"Sit & Go",modeCash:"Cash Game",titleSng:"Sit & Go Hold'em",titleCash:"Cash Game Hold'em",
players:"Players",blinds:"Blinds",buyin:"Buy-in",stackDepth:"Starting stack",ante:"Ante",noAnte:"no ante",
speed:"Blinds Change Speed",turbo:"Turbo",standard:"Standard",slow:"Slow",koBonusOpt:"🎯 KO bonus",koBonusInfo:"Bounty-style Sit & Go option: when you personally eliminate an opponent, you instantly gain a chip bonus equal to 10% of the starting stack. It rewards knockouts and makes big-stack pressure stronger. Only the player who wins chips from the busted opponent gets the bonus.",koBonusAward:(n,b)=>`🎯 KO bonus: +${b} for eliminating ${n} player${n>1?'s':''}`,diff:"AI Difficulty",easy:"Easy",medium:"Medium",hard:"Hard",language:"Language",
tableStyle:"Table style",tableBalanced:"Balanced mix",tableTight:"Tight table",tableLoose:"Loose table",tableAggressive:"Aggressive table",tableWild:"Wild table",tableRandom:"Random",tableCustom:"Custom",
tableDescBalanced:"A varied table containing every opponent personality.",tableDescTight:"A disciplined table that enters fewer pots and gives large bets more credit.",tableDescLoose:"A sticky table that sees more flops and calls with wider ranges.",tableDescAggressive:"A pressure-heavy table with frequent steals, c-bets and raises.",tableDescWild:"A volatile table with very wide ranges, larger bets and more bluffs.",tableDescRandom:"Every bot receives an independently randomized personality.",tableDescCustom:"Choose the exact number of bots for every personality.",
profileRock:"Tight",profileStation:"Loose",profileShark:"Aggressive",profileManiac:"Wild",tableRandomLine:n=>`${n} bot${n!==1?'s':''} · roles rerolled when the game starts`,tableCustomTotal:(n,t)=>`${n} of ${t} bot roles assigned`,tableCustomInvalid:t=>`Assign exactly ${t} bot role${t!==1?'s':''} to start.`,
deal:"Deal me in",startCash:"Sit down",resume:"▶ Resume tournament",resumeMid:"▶ Resume mid-hand",resumeCash:"▶ Resume cash session",review:"Session review",
quickPlayTitle:"Ready to play?",quickPlaySub:"Start a fresh table or continue where you left off.",
sessionPnL:"Session",cashSessionEnd:"Session complete",cashSessionSub:(h,r,pnl)=>`${h} hands · ${r} rebuy${r!==1?'s':''} · ${pnl>=0?'+':'−'}${usd(Math.abs(pnl))} net`,
cashRebuy:b=>`Rebuy for ${b}`,
revTitle:"Session review",reviewBtnSub:"Review leaks and continue your improvement plan",revWinRate:"Win rate",revITM:"In the money",revAvgFinish:"Avg finish",
revNet:"Total net",revEVLeaked:"EV leaked",revGames:"Games",revNoGames:"No finished games yet — play a tournament!",revNoGamesCash:"No finished sessions yet — play a cash game!",
revCashBadge:"Cash",revSngBadge:"Sit & Go",
revFilterAll:"All",revFilterCash:"Cash",revFilterSng:"Sit & Go",
revBB100:"BB/100",revCashHands:"Cash hands",revCashNetBB:"Net (BB)",revCashRebuys:"Rebuys",
sprLbl:"SPR",sprZoneDeep:"deep",sprZoneMid:"medium",sprZoneLow:"low",
statBB100:"BB/100",statNetBB:"Net (BB)",statRebuys:"Rebuys",
revLeaksTitle:"Leak finder (by spot)",revLeaksNone:"No classified leaks yet — deviate from the coach and finish games to populate this.",
leakPfOpen:"Preflop opens",leakPfFace:"Facing raises",leakCbet:"C-bet defense",leakMultiway:"Multiway pots",leakRiver:"River calls",leakRiverAir:n=>`${n} river call${n>1?'s':''} with high card / no hand`,
revIntro:"Find the decisions costing you the most, spot repeated habits, and replay the exact hands.",
revFocusTitle:"What to work on next",revFocusSub:"Prioritized by total EV lost and repetition. A frequent small mistake can matter more than one dramatic hand.",
revFocusRank:n=>`Priority ${n}`,revTimes:n=>`${n} time${n!==1?'s':''}`,revAvgLoss:"average loss",
planTitle:"Your adaptive improvement plan",planSub:"Your three highest-impact skills, recalculated after every session and practice drill.",planNoData:"Finish a session with coach decisions to generate your first personalized plan.",
planMastery:"Mastery",planEvidence:n=>`${n} decision${n!==1?'s':''} measured`,planEarly:"Early signal",planReliable:"Reliable sample",
planStatusFocus:"Focus now",planStatusBuilding:"Building",planStatusStrong:"Nearly mastered",
planTrendUp:n=>`↑ Improved ${n} points recently`,planTrendDown:n=>`↓ Down ${n} points recently`,planTrendFlat:"→ Stable recently",
planDrillResult:(s,t)=>`Last drill: ${s}/${t}`,planPracticeSaved:"This result now counts toward your mastery score.",
planLessonPfOpen:"Build a cleaner opening range by position. Enter fewer weak hands early and apply pressure with stronger hands late.",
planLessonPfFace:"Before calling a raise, compare the price with usable—not raw—equity, position and players still able to re-raise.",
planLessonCbet:"Defend c-bets according to board texture, bet size and future-street playability—not just whether you paired.",
planLessonMultiway:"Tighten up as more opponents enter. One-pair hands and weak draws lose value quickly in multiway pots.",
planLessonRiver:"On the river, count the value hands and credible bluffs. Do not pay simply because your hand was strong earlier.",
adaptiveAiTitle:"What the opponents learn about you",adaptiveAiSub:"Only your visible actions are measured — never your hidden cards.",adaptiveAiSample:n=>`${n} observed action${n!==1?'s':''}`,adaptiveAiEarly:"Early read",adaptiveAiReliable:"Reliable read",
adaptiveAiEasy:"Easy · barely adapts",adaptiveAiMedium:"Medium · adapts carefully",adaptiveAiHard:"Hard · fully adapts",
adaptiveAiNeedMore:n=>`The bots need ${n} more visible actions before this difficulty starts adapting.`,
adaptiveAiBalanced:"No strong tendency yet. The bots keep their normal strategy.",
adaptiveAiOverfold:"You often fold when facing pressure. The bots will bluff and apply pressure more often.",
adaptiveAiSticky:"You call pressure frequently. The bots will bluff less and value-bet stronger hands for larger sizes.",
adaptiveAiAggressive:"You bet and raise often after the flop. The bots will continue tighter and trap more often.",
adaptiveAiPassive:"You check frequently after the flop. The bots will stab more often when you show weakness.",
adaptiveAiPreAgg:"You raise often before the flop. The bots will defend with stronger ranges.",
revDecisionsTitle:"Costliest decisions",revDecisionsSub:"Filter your mistakes, then open the exact hand to understand the action in context.",
revSpot:"Spot",revStreet:"Street",revPeriod:"Sessions",revAny:"All",revRecent10:"Latest 10",revRecent25:"Latest 25",
revReplayHand:"Replay hand",revNoDecisions:"No mistakes match these filters. Try a broader filter or play another session.",
revPractice:n=>`Practice ${n} similar spot${n!==1?'s':''}`,practiceTitle:"Focused practice",practiceSub:"Choose first. The coach answer appears only after your decision.",practiceProgress:(n,t)=>`Spot ${n} of ${t}`,
practicePrompt:"What would you do?",practiceNext:"Next spot",practiceFinish:"Finish",practiceClose:"Exit practice",
practicePot:"Pot",practiceToCall:"To call",practiceOpponents:"Opponents",
practiceCorrect:"Correct — this matches the coach's recommendation.",practiceWrong:r=>`Not this time. The coach recommends ${r}.`,
practiceDone:(s,t)=>`Practice complete: ${s}/${t} decisions matched the coach. These are real saved spots from your sessions.`,
confidenceTitle:(source,level)=>`${source} · ${level} confidence`,confidenceHigh:"High",confidenceMedium:"Medium",confidenceLimited:"Limited",
confidenceChart:"Preflop chart",confidenceMath:"Exact pot math + equity simulation",confidenceHeuristic:"Range heuristic",
confidenceChartNote:"Uses the position and stack-depth chart for this preflop spot.",
confidenceMathNote:"Pot odds are exact; equity and future action use simulations and estimated opponent ranges.",
confidenceHeuristicNote:"Multiway ranges and future actions require broader assumptions, so treat the recommendation as directional.",
strategyLabel:"Strategy",strategyBaseline:"Baseline / balanced",strategyExploit:"Exploitative adjustment",
bluffBreakEven:"Pure-bluff break-even",bluffBreakEvenNote:(f,fe)=>`Needs about ${f}% folds at this size; the model estimates about ${fe}%. Showdown equity adds value when called.`,
bluffTitle:"Bluff assessment",bluffVerdict:"Verdict",bluffWhy:"Why",bluffPlan:"If called or raised",
intentBluff:"BLUFF",intentSemiBluff:"SEMI-BLUFF",intentValue:"VALUE",intentProtection:"PROTECTION",intentRangeBluff:"RANGE BLUFF",intentRangeRaise:"RANGE RAISE",intentBluffCatch:"BLUFF-CATCH",intentCall:"CALL",intentCheck:"CHECK",intentFold:"FOLD",
bluffGood:"Good bluff candidate",bluffThin:"Thin bluff — use caution",bluffSemi:"Semi-bluff: folds now + draw equity",bluffNot:"Not a bluff — build the pot for value",bluffNo:"Bluff not recommended",
bluffFoldCompare:(need,est)=>`Needs about ${need}% folds · estimated folds ~${est}%`,bluffCalledEquity:e=>`About ${e}% usable equity if called`,
bluffReasonPassive:"Opponents have shown weakness by checking, so their ranges contain many hands that can fold.",bluffReasonBlocker:"Your cards block some of the opponent's strongest possible hands.",bluffReasonDraw:"Your draw can still improve when the bluff gets called.",bluffReasonPosition:"Acting last gives you more information and makes pressure safer.",bluffReasonDry:"This dry board leaves opponents with fewer strong draws and continues.",bluffReasonStation:"A loose calling player is unlikely to fold enough, which makes bluffing worse.",bluffReasonMultiway:"Several opponents remain, so somebody is more likely to call.",bluffReasonHistoryFolds:"This specific opponent has folded to pressure more often than their profile predicts across previous hands.",bluffReasonHistoryCalls:"This specific opponent has called or raised pressure more often than their profile predicts across previous hands.",bluffReasonStrength:"You are facing active aggression, so the opponent's range is less likely to fold.",bluffReasonShowdown:"Your hand has showdown value; turning it into a bluff would often fold worse hands and get action from better ones.",bluffReasonRange:"This action follows the position and range strategy rather than a postflop pure bluff.",
bluffHistoryRead:(n,rate,delta,d)=>`Opponent history: ${n} pressure decision${n!==1?'s':''} · learned fold rate ~${rate}% · ${delta>=0?'+':''}${delta}% applied on ${d}`,
bluffPlanGiveUp:"If called, usually give up unless the next card materially improves your story or hand. Fold to a strong raise.",bluffPlanDraw:"Continue on cards that complete or strengthen the draw; slow down after a bad card or strong raise.",bluffPlanValue:"Continue for value on safe cards, but reassess when the board or opponent's action becomes dangerous.",bluffPlanCatch:"Call to catch bluffs; do not re-raise because worse hands usually fold and stronger hands continue.",bluffPlanFree:"Take the free card/showdown and reconsider after the next action.",bluffPlanFold:"Fold now and preserve chips; no bluff investment is justified.",bluffPlanFollow:"Follow the recommended action and reassess using the next card and opponent response.",
readConfidence:"Read confidence",readSample:n=>`${n} visible action${n!==1?'s':''}`,readConfidenceEarly:"early — lean on the default profile",readConfidenceTentative:"tentative tendency",readConfidenceReliable:"reliable table sample",
processGoodBad:"Good process, bad outcome: your decisions matched the +EV coach line. Variance does not make them mistakes.",
processBadGood:"Good outcome, questionable process: you won chips, but at least one decision gave up estimated EV. Do not let the result validate the play.",
analyticsTitle:"Advanced leak analytics",analyticsSub:"Every coach decision is grouped by context. Accuracy means how often your action matched the coach.",
analyticsPosition:"By position",analyticsStreet:"By street",analyticsDepth:"By stack depth",analyticsPotType:"By pot type",analyticsTableSize:"By players remaining",
analyticsDecisions:n=>`${n} decision${n!==1?'s':''}`,analyticsAccuracy:"accuracy",analyticsRecent:"Latest 10 sessions",analyticsPrevious:"Previous 10",
analyticsNoData:"Play a few new hands to unlock contextual analytics. Older decisions still appear in the basic leak finder.",
analyticsSample:"Treat groups below 10 decisions as early signals, not established leaks.",
analyticsWorst:(name,ev,n)=>`Your largest measured leak is <b>${name}</b>: −${ev} EV across ${n} decisions.`,
analyticsFrequent:(name,pct,n)=>`Your lowest coach-match rate is <b>${name}</b>: ${pct}% across ${n} decisions.`,
analyticsTrendUp:n=>`Coach-match accuracy improved by <b>${n} points</b> versus the previous 10 sessions.`,
analyticsTrendDown:n=>`Coach-match accuracy fell by <b>${n} points</b> versus the previous 10 sessions.`,
potUnopened:"Unopened / limped",potSingle:"Single-raised pot",potThreeBet:"3-bet+ pot",potMultiway:"Multiway pot",
tableHeadsUp:"Heads-up",tableThree:"3-handed",tableFour:"4-handed",tableFive:"5-handed",tableSixMax:"6-max",tableFullRing:"Full-ring (7–9)",
scenarioBtn:"Scenario builder",scenarioBtnSub:"Build and practice any poker decision",scenarioTitle:"Custom Scenario Builder",scenarioSub:"Build a decision, analyze it, save it or practice it immediately.",
scCards:"Hero cards",scBoard:"Board",scPos:"Position",scOpps:"Opponents",scStack:"Effective stack (BB)",scPot:"Pot",scCall:"To call",scProfile:"Opponent profile",scGame:"Context",scAction:"Previous action",
scCardsHelp:"Choose your two private cards.",scBoardHelp:"Leave empty preflop, or choose 3–5 community cards.",scEmptyCard:"— Empty —",
scAnalyze:"Analyze spot",scSave:"Save scenario",scShare:"Copy share link",scSaved:"Saved scenarios",scClose:"Close",
scInvalid:"Choose two different private cards and either 0, 3, 4 or 5 different board cards, without empty gaps.",scSavedOk:"Scenario saved.",scCopied:"Share link copied.",
scRecommendation:"Recommendation",scEquity:"Estimated equity",scPrice:"Pot odds",scConfidence:"Confidence",scPlay:"Play this decision",scDrill:"Practice 10 variations",scCorrect:"Correct.",scWrong:r=>`Coach recommendation: ${r}.`,
scReasonCall:(e,n)=>`Your estimated equity (${e}%) clears the ${n}% price after a small realization adjustment.`,
scReasonFold:(e,n)=>`Your estimated equity (${e}%) does not clear the adjusted ${n}% requirement.`,
scReasonRaise:e=>`With about ${e}% equity, building the pot is preferred against the selected range profile.`,
scReasonCheck:e=>`Checking keeps the pot controlled with about ${e}% equity and costs nothing.`,
scUnopened:"Unopened",scLimp:"Limp",scRaise:"Raise",scThreeBet:"3-bet",scCbet:"C-bet",scCheckRaise:"Check-raise",scAllin:"All-in",
revAllHands:"All saved hands",revReplay:"Tap a game to replay its hands",revMidBanner:"Hand in progress — resumed",
resetData:"Clear saved data",resetInfo:"Deletes lifetime stats, hand history, session reviews, saved scenarios and any unfinished game you could resume. Your Rewards level, XP, unlocks, equipped cosmetics and language choice are kept. This can't be undone.",resetConfirm:"Delete all stats, hand history, session reviews, saved scenarios and unfinished games? Rewards level and progress will be kept.",resetDone:"✓ Cleared",
level:"Level ",hand:"Hand ",blindsUpA:"Blinds up in ",blindsUpB:" hands",autoNext:"Auto next hand",coachLbl:"🧭 Live coach",coachBtn:"Coach",quit:"Quit",quitSng:"Quit this tournament?",quitCash:"Leave the table?",
fold:"Fold",check:"Check",call:"Call",allin:"All-in",raiseTo:"Raise to ",betW:"Bet ",raiseW:"Raise",min:"Min",halfPot:"½ Pot",pot:"Pot",
actMenu:"◀ Menu",actTurn:"◀ Your turn",
log:"Log",lastHand:"Last hand",exportH:"Export history",nextHand:"Next hand ▶",liveCoach:"🧭 LIVE COACH",coachScrollMore:"Scroll for more",
waiting:"Advice appears here when it's your turn.",
outQuality:"Out quality",weightedOuts:"range-adjusted outs",weightedOutsNote:n=>`${n} raw cards, discounted when they can chop, be dominated, improve the board for everyone, or lose more often against the opponent's estimated range.`,overcardOuts:"Overcard pair outs",pairImproveOuts:"Trips / two-pair outs",redrawOuts:"Full-house / quads redraws",
yourHand:"Your hand",position:"Position",actingOrder:"Acting order",postflopOrder:"Postflop order",winChance:"Win chance",playersBehind:"Players behind",openingDecision:"Opening decision",raiseOrFold:"Raise or fold · no limp",draws:"Draws",outs:"Outs",unique:"unique",shared:"shared",countedOnce:"counted once",dirtyOuts:"Dirty outs",dirtyOutsInfoLbl:"What is a dirty out?",dirtyOutsInfo:"A dirty (tainted) out completes your draw on paper but often doesn't win the pot — e.g. it pairs the board (helping everyone) or is the 4th card to a board flush that gives an opponent the winning flush. Use clean outs for your odds.",potOdds:"Pot odds",impliedOdds:"Implied odds",realisticNeed:"realistic need",bestCaseNeed:"best case",effectiveNeed:"Effective call threshold",effectiveNeedNote:"Equity needed after position, ranges and tournament pressure.",preflopRank:p=>`Preflop rank: top ~${p}% of starting hands`,lowerStronger:"lower is stronger",yourStack:"Your stack",sugSize:"Suggested size",
firstToAct:"first to act (OOP)",lastToAct:"last to act (IP)",ofN:"of",need:"need ",vs:"vs",opp:"opponent",opps:"opponents",
beginnerMath:(raw,usable,need,enough)=>`Raw equity: ${raw}%. Usable after position and risk: ~${usable}%. A call needs ${need}% — ${enough?'enough to continue':'not enough, so fold'}.`,
beginnerFree:"In plain English: checking costs no chips. You keep your hand alive and see what develops without making the pot bigger.",
beginnerDrySidePot:"In plain English: you do have top pair. The check is recommended because one player is already all-in and there is no side pot yet. On this dry board, betting mainly makes worse hands fold and creates a new pot against stronger hands.",
beginnerAgg:"In plain English: your win chance is only part of a bet or raise. Opponents may fold immediately (fold equity), and weaker hands may still call.",
beginnerOpenFold:"In plain English: no chips are required yet, but this starting hand is too weak to enter profitably from this seat. Folding preserves your stack.",
thisGame:"THIS GAME",lifetime:"LIFETIME",handsPW:"Hands played / won",net:"Net",biggestPot:"Biggest pot won",vpipPfr:"VPIP / PFR",aggF:"Aggression factor",wonSd:"Won at showdown",evLeak:"EV leaked vs coach",coachFollowed:"Coach followed",followedCoach:"followed coach",coachSaid:"coach said",youChose:"you chose",
recFOLD:"FOLD",recCHECK:"CHECK",recCALL:"CALL",recRAISETO:"RAISE TO",recBET:"BET",recALLIN:"ALL-IN",
zoneG:"🟢 comfortable",zoneY:"🟡 fight for pots",zoneO:"🟠 shove-or-fold soon",zoneR:"🔴 all-in or fold",
prizeP:"Prize pressure",extraNeeded:"extra needed",
icmTitle:"Tournament value (ICM)",icmImpact:"This call is worth more than chip odds alone because losing chips can end or damage your tournament.",
icmPlayers:(left,paid)=>`${left} players remain · ${paid} paid place${paid!==1?'s':''}`,icmStackRank:(rank,left)=>`Stack rank: ${rank} of ${left}`,
icmRisk:p=>`This call risks ${p}% of your stack`,icmCovered:"The bettor covers you: losing can eliminate you.",icmCovers:"You cover the bettor: you survive a loss with chips behind.",
icmThreshold:(chip,icm,extra)=>`Pot odds need ${chip}%. ICM raises the break-even point to ${icm}% (+${extra}%).`,
benchRun:"🧪 Coach benchmark",
mpTitle:"👥 Play with friends",mpSub:"Invite friends with a link — free, no accounts",mpNamePh:"Your name",mpCreate:"Create room",mpJoinB:"Join",mpCodePh:"CODE",
mpLobbyTitle:"Room",mpCopy:"📋 Copy invite link",mpCopied:"✓ Copied — send it to your friends",
mpFillLbl:"Fill empty seats with AI bots",mpStart:"▶ Start game",mpLeave:"Leave",
mpWaitHost:"Waiting for the host to start the game…",mpConnecting:"Connecting…",
mpNetFail:"Could not reach the network. Check your internet and try again.",
mpHostLeft:"The host left — the game is over.",mpNeedName:"Pick a name first 🙂",
mpAutoA:"Auto-start at",mpAutoB:"players",
mpTest:"🔧 Test my connection",mpTestSig:"reaching the signaling cloud…",mpTestRtc:"cloud OK — testing the direct connection…",mpTestSigFail:"cannot reach the signaling cloud. A firewall, VPN or ad-blocker may be blocking 0.peerjs.com.",mpTestRtcFail:"signaling works but the direct connection failed — this network blocks WebRTC. Try another Wi-Fi or disable VPN.",mpTestOK:"Connection test passed — this device can create and join rooms.",
mpStarted:"This room's game has already started.",
mpFull:"This room is full (9 players max).",
mpWaitNext:"Game in progress — you'll be dealt in at the next hand. Hang tight!",
mpMigrating:"Connection to the host lost — recovering the game…",
mpMigrated:n=>`${n} is the new host — the tournament continues!`,
mpRejoined:n=>`${n} is back at the table`,
mpReplaced:(n,b2)=>`${n} takes over from 🤖 ${b2} — humans beat robots`,
mpWaitingPlayers:"Table open — waiting for players to join. Share the invite link!",
react:"React",reactHint:"Tap to react — appears over your seat for everyone",timerOpt:"⏱ Turn timer (25s + bank)",timerBank:"🏦 Time bank engaged — extra seconds burning!",timerInfo:"Like a real casino clock: you get 25 seconds for each decision — a countdown appears under your seat. If it runs out on a tough spot, your personal TIME BANK takes over automatically (60 extra seconds for the whole tournament, it only burns what you actually use — shown as 🏦). When both are empty, the game checks or folds for you. Great training for live games. Always on when playing with friends.",
mpKnock:n=>`${n} joins at the next hand`,
mpVerMismatch:"The host is running a different version of the game. BOTH of you: refresh the page (hold Shift while reloading), then create the room again.",
mpNeed2:"You need at least one friend in the room to start — or tick \"Fill empty seats with AI bots\".",
mpHostHint:"Share the invite link and wait — friends appear in the list below as they join. Then press Start.",
mpRoomGone:"Room not found — check the code, and make sure the host still has the room open.",
mpConnFail:"Could not connect to the room. Phone networks sometimes block direct connections — try joining from the same Wi-Fi as the host, then retry.",
mpJoined:n=>`${n} joined the room`,mpGone:n=>`${n} disconnected — their hand is folded`,
mpYou:"(you · host)",mpYouG:"(you)",chatPh:"Message…",
viewChart:"📊 View this position's chart",chartTitleOpen:"opening chart",chartTitleIso:"iso vs limpers chart",chartTitleShove:"all-in chart",chartTitleFacing:"chart vs this raise",chartTitleBbDefend:"BB defense chart",chartTitleFourBet:"response vs 3-bet",
showRange:"📊 Show opponent range",hideRange:"▴ Hide opponent range",viewRange:"🔎 Open interactive Range Explorer",chartTitleRange:"estimated range right now",legendRange:"hands he could still have",rangeFringe:"Fringe",rangePossible:"Possible",rangeLikely:"Likely",rangeVeryLikely:"Very likely",
rangeExplore:"Explore range",rangeFilter:"Show",rangeFilterAll:"All hands",rangeFilterMade:"Made hands",rangeFilterDraws:"Draws",rangeFilterNut:"Nut draws",rangeFilterNonNut:"Non-nut draws",rangeFilterBackdoor:"Backdoors",rangeFilterAir:"Air / bluffs",rangePick:"Select a hand class in the grid to understand why it remains possible.",rangeCellShare:(h,p,a,c)=>`${h} represents about ${p}% of this opponent range. ${a} exact combo${a!==1?'s':''} remain weighted out of ${c} unblocked suit combination${c!==1?'s':''}.`,rangeCellDensity:n=>`Each available ${n} combo is weighted relative to an average legal combo.`,rangeCellMix:"What these combos currently make",rangeUnavailable:"This hand class has no remaining weighted combinations after blockers and the action line.",revExploreRange:"Explore range",
rangeDensity:"Per-combo likelihood",rangeClassProb:"Class probability",rangeEffective:"effective combos",rangeLine:"Action line",rangeTopCard:"Top-card hands now",rangeTopHands:"Top candidates",rangeOpen:"Open",rangeOfRange:"of range",rangeCombos:"available combos",rangeAvgCombo:"average combo likelihood",
rangeComposition:"Exact hand mix",rangeFullHousePlus:"Full house or better",rangeMadeFlushes:"Made flushes",rangeStraights:"Straights",rangeTrips:"Trips",rangeTwoPair:"Two pair",rangeOnePair:"One pair",rangeDrawOnly:"Draw only",rangeAir:"Air / bluff candidates",rangeBoardOnly:"Playing the board",
rangeDrawBreakdown:"Exact draw texture",rangeComboDraw:"Combo draws",rangeNutFlushDraw:"Nut flush draws",rangeNonNutFlushDraw:"Non-nut flush draws",rangeStraightDraw:"Straight draws",rangePairPlusDraw:"Pair + draw",rangeBackdoorDraw:"Backdoor-only draws",
rangeWeightRaise:(d,x,h)=>d==='up'?`${h} gained weight (${x}× average): the latest aggressive action is more consistent with its value or semi-bluff potential.`:d==='down'?`${h} lost weight (${x}× average): the latest aggressive action is less consistent with this class than with stronger value hands or credible draws.`:`${h} stayed near its prior weight (${x}× average) after the latest aggressive action.`,
rangeWeightCall:(d,x,h)=>d==='up'?`${h} gained weight (${x}× average): calling fits this class's showdown value or draw realization.`:d==='down'?`${h} lost weight (${x}× average): this class continues less often than the opponent's stronger calls and draws.`:`${h} stayed near its prior weight (${x}× average) after the call.`,
rangeWeightCheck:(d,x,h)=>d==='up'?`${h} gained weight (${x}× average): checking is consistent with its medium-strength or give-up profile.`:d==='down'?`${h} lost weight (${x}× average): checking makes strong value versions of this class less likely.`:`${h} stayed near its prior weight (${x}× average) after the check.`,
rangeWeightPrior:(d,x,h)=>`${h} is weighted at ${x}× an average legal combo from the current position, profile and prior range.`,
rangeBlockerImpact:n=>`Known cards remove ${n} exact combo${n!==1?'s':''}.`,rangeActionRemoved:n=>`The modeled action line reduces ${n} other unblocked combo${n!==1?'s':''} to zero weight.`,
rangeIso:"Iso-raise",rangeSqueeze:"Squeeze",rangeLimp:"Limp",rangeOption:"Check option",rangeEntering:s=>`Range entering ${s} — opponent has not acted yet`,
legendOpen:"raise first-in",legendShove:"go all-in",legendFold:"fold",legendYou:"your hand",legend3bet:"re-raise (3-bet)",legendFourBet:"4-bet",legendCall:"call",
benchConfirm:"Simulate 25 full 9-player tournaments where a bot plays PURE coach advice, to measure how good the coach really is. Takes a minute or two. Run it?",
youWin:"You win the tournament!",playAgain:"Play again",
youWinSub:(n,h)=>`Outlasted ${n} opponents over ${h} hands.`,
bustedTitle:p=>`Busted in ${p} place`,bustedSub:h=>`Survived ${h} hands. Run it back?`,
evTotal:"📉 Total EV leaked",deviations:"deviations",cleanGame:"No EV leaked vs the coach — clean game! 🎯",smallerLeaks:"smaller leaks",
handNavP:"‹ hand",handNavN:"hand ›",streetNavP:"‹ street",streetNavN:"street ›",jumpHand:"Go to hand",jumpGo:"Go",handNotFound:n=>`Hand #${n} is not available in this session.`,close:"Close",replayTitle:"Hand replay",
cfTitle:"Counterfactual explorer",cfSub:"Compare what could have happened at each of your decisions.",cfDecision:n=>`Decision ${n}`,cfActual:"You chose",cfCoach:"Coach",cfBest:"Highest EV",cfEv:"Estimated EV",cfLoss:"Gap to best",cfCaptured:"Captured at the table",cfEstimated:"Reconstructed estimate",
cfFoldWhy:"Fold risks no more chips and has 0 additional chip EV.",cfCheckWhy:eq=>`Check costs nothing, keeps your hand alive and realizes about ${eq}% equity without growing the pot.`,cfCallWhy:(eq,need,amt)=>`Call invests ${amt} with about ${eq}% usable equity versus ${need}% required.`,cfRaiseWhy:(eq,amt)=>`Raise to ${amt} combines about ${eq}% equity with modeled fold equity when opponents release weaker ranges.`,cfAssumption:"EV is directional, not a promise: future cards and opponent responses remain uncertain.",
won:"won",foldedTag:"folded",showdown:"showdown",fullHand:"Full hand",preflop:"Preflop",flop:"Flop",turnSt:"Turn",riverSt:"River",noHands:"No completed hand yet this game.",
ord:n=>{const s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);}},
fr:{sub:"Tournoi de Texas Hold'em No-Limit contre l'IA",subCash:"Cash game Texas Hold'em No-Limit contre l'IA",modeLbl:"Mode de jeu",modeSng:"Sit & Go",modeCash:"Cash game",titleSng:"Sit & Go Hold'em",titleCash:"Cash Game Hold'em",
players:"Joueurs",blinds:"Blinds",buyin:"Cave (buy-in)",stackDepth:"Tapis de départ",ante:"Ante",noAnte:"sans ante",
speed:"Vitesse des blinds",turbo:"Turbo",standard:"Standard",slow:"Lente",koBonusOpt:"🎯 Bonus KO",koBonusInfo:"Option Sit & Go façon bounty : quand vous éliminez personnellement un adversaire, vous gagnez tout de suite un bonus en jetons égal à 10% du tapis de départ. Cela récompense les éliminations et renforce la pression du gros tapis. Seul le joueur qui gagne les jetons de l'adversaire éliminé reçoit le bonus.",koBonusAward:(n,b)=>`🎯 Bonus KO : +${b} pour ${n} élimination${n>1?'s':''}`,diff:"Niveau de l'IA",easy:"Facile",medium:"Moyen",hard:"Difficile",language:"Langue",
tableStyle:"Style de table",tableBalanced:"Mix équilibré",tableTight:"Table serrée",tableLoose:"Table loose",tableAggressive:"Table agressive",tableWild:"Table sauvage",tableRandom:"Aléatoire",tableCustom:"Personnalisé",
tableDescBalanced:"Une table variée avec toutes les personnalités adverses.",tableDescTight:"Une table disciplinée qui joue moins de pots et respecte davantage les grosses mises.",tableDescLoose:"Une table collante qui voit plus de flops et suit avec des ranges plus larges.",tableDescAggressive:"Une table sous pression avec beaucoup de steals, c-bets et relances.",tableDescWild:"Une table volatile avec des ranges très larges, de grosses mises et davantage de bluffs.",tableDescRandom:"Chaque bot reçoit une personnalité tirée indépendamment au hasard.",tableDescCustom:"Choisissez le nombre exact de bots pour chaque personnalité.",
profileRock:"Serré",profileStation:"Loose",profileShark:"Agressif",profileManiac:"Sauvage",tableRandomLine:n=>`${n} bot${n>1?'s':''} · profils retirés au sort au lancement`,tableCustomTotal:(n,t)=>`${n} rôle${n>1?'s':''} attribué${n>1?'s':''} sur ${t}`,tableCustomInvalid:t=>`Attribuez exactement ${t} rôle${t>1?'s':''} de bot pour commencer.`,
deal:"Distribuez !",startCash:"S'asseoir",resume:"▶ Reprendre le tournoi",resumeMid:"▶ Reprendre la main en cours",resumeCash:"▶ Reprendre la session cash",review:"Bilan des sessions",
quickPlayTitle:"Prêt à jouer ?",quickPlaySub:"Lancez une nouvelle table ou reprenez là où vous étiez.",
sessionPnL:"Session",cashSessionEnd:"Session terminée",cashSessionSub:(h,r,pnl)=>`${h} mains · ${r} rebuy${r>1?'s':''} · ${pnl>=0?'+':'−'}${usd(Math.abs(pnl))} net`,
cashRebuy:b=>`Rebuy pour ${b}`,
revTitle:"Bilan des sessions",reviewBtnSub:"Analysez vos leaks et poursuivez votre progression",revWinRate:"Taux de victoire",revITM:"Dans l'argent",revAvgFinish:"Place moyenne",
revNet:"Net total",revEVLeaked:"EV perdu",revGames:"Parties",revNoGames:"Aucune partie terminée — jouez un tournoi !",revNoGamesCash:"Aucune session terminée — jouez une partie cash !",
revCashBadge:"Cash",revSngBadge:"Sit & Go",
revFilterAll:"All",revFilterCash:"Cash",revFilterSng:"Sit & Go",
revBB100:"BB/100",revCashHands:"Cash hands",revCashNetBB:"Net (BB)",revCashRebuys:"Rebuys",
sprLbl:"SPR",sprZoneDeep:"deep",sprZoneMid:"medium",sprZoneLow:"low",
statBB100:"BB/100",statNetBB:"Net (BB)",statRebuys:"Rebuys",
revLeaksTitle:"Fuites par type de spot",revLeaksNone:"Pas encore de fuites classées — écartez-vous du coach et terminez des parties.",
leakPfOpen:"Ouvertures préflop",leakPfFace:"Face aux relances",leakCbet:"Défense c-bet",leakMultiway:"Pots multiway",leakRiver:"Calls rivière",leakRiverAir:n=>`${n} call${n>1?'s':''} rivière sans main`,
revIntro:"Repérez les décisions qui vous coûtent le plus, les erreurs répétées et rejouez les mains exactes.",
revFocusTitle:"Prochain axe de travail",revFocusSub:"Priorisé selon l'EV totale perdue et la répétition. Une petite erreur fréquente peut coûter plus qu'une main spectaculaire.",
revFocusRank:n=>`Priorité ${n}`,revTimes:n=>`${n} fois`,revAvgLoss:"perte moyenne",
planTitle:"Votre plan de progression adaptatif",planSub:"Vos trois compétences prioritaires, recalculées après chaque session et chaque entraînement.",planNoData:"Terminez une session avec des décisions du coach pour générer votre premier plan personnalisé.",
planMastery:"Maîtrise",planEvidence:n=>`${n} décision${n!==1?'s':''} mesurée${n!==1?'s':''}`,planEarly:"Signal précoce",planReliable:"Échantillon fiable",
planStatusFocus:"À travailler",planStatusBuilding:"En progression",planStatusStrong:"Presque maîtrisé",
planTrendUp:n=>`↑ Progression récente de ${n} points`,planTrendDown:n=>`↓ Baisse récente de ${n} points`,planTrendFlat:"→ Stable récemment",
planDrillResult:(s,t)=>`Dernier drill : ${s}/${t}`,planPracticeSaved:"Ce résultat compte maintenant dans votre score de maîtrise.",
planLessonPfOpen:"Construisez une range d'ouverture propre selon la position : moins de mains faibles tôt, davantage de pression avec de bonnes mains en position tardive.",
planLessonPfFace:"Avant de payer une relance, comparez le prix à l'équité réellement utilisable, puis ajoutez la position et les joueurs pouvant encore sur-relancer.",
planLessonCbet:"Défendez les c-bets selon la texture du board, la taille de mise et la jouabilité des streets suivantes — pas seulement parce que vous avez touché.",
planLessonMultiway:"Resserrez votre range quand plusieurs adversaires entrent. Une paire et les tirages faibles perdent vite de la valeur en multiway.",
planLessonRiver:"À la rivière, comptez les mains de value et les bluffs crédibles. Ne payez pas uniquement parce que votre main était forte plus tôt.",
adaptiveAiTitle:"Ce que les adversaires apprennent sur vous",adaptiveAiSub:"Seules vos actions visibles sont mesurées — jamais vos cartes cachées.",adaptiveAiSample:n=>`${n} action${n!==1?'s':''} observée${n!==1?'s':''}`,adaptiveAiEarly:"Lecture précoce",adaptiveAiReliable:"Lecture fiable",
adaptiveAiEasy:"Facile · s’adapte à peine",adaptiveAiMedium:"Moyen · s’adapte prudemment",adaptiveAiHard:"Difficile · s’adapte pleinement",
adaptiveAiNeedMore:n=>`Les bots ont besoin de ${n} action${n!==1?'s':''} visible${n!==1?'s':''} supplémentaire${n!==1?'s':''} avant de s’adapter à ce niveau.`,
adaptiveAiBalanced:"Aucune tendance forte pour le moment. Les bots conservent leur stratégie normale.",
adaptiveAiOverfold:"Vous vous couchez souvent sous la pression. Les bots vont bluffer et mettre la pression plus souvent.",
adaptiveAiSticky:"Vous payez souvent sous la pression. Les bots vont moins bluffer et miser plus gros leurs bonnes mains.",
adaptiveAiAggressive:"Vous misez et relancez souvent après le flop. Les bots vont continuer plus serré et tendre davantage de pièges.",
adaptiveAiPassive:"Vous checkez souvent après le flop. Les bots vont miser plus souvent quand vous montrez de la faiblesse.",
adaptiveAiPreAgg:"Vous relancez souvent préflop. Les bots vont défendre avec des ranges plus fortes.",
revDecisionsTitle:"Décisions les plus coûteuses",revDecisionsSub:"Filtrez vos erreurs puis ouvrez la main exacte pour revoir toute l’action.",
revSpot:"Spot",revStreet:"Street",revPeriod:"Sessions",revAny:"Tous",revRecent10:"10 dernières",revRecent25:"25 dernières",
revReplayHand:"Rejouer la main",revNoDecisions:"Aucune erreur ne correspond à ces filtres. Élargissez-les ou jouez une nouvelle session.",
revPractice:n=>`Pratiquer ${n} spot${n!==1?'s':''} similaire${n!==1?'s':''}`,practiceTitle:"Entraînement ciblé",practiceSub:"Décidez d'abord. La réponse du coach apparaît ensuite.",practiceProgress:(n,t)=>`Spot ${n} sur ${t}`,
practicePrompt:"Que feriez-vous ?",practiceNext:"Spot suivant",practiceFinish:"Terminer",practiceClose:"Quitter l'entraînement",
practicePot:"Pot",practiceToCall:"À payer",practiceOpponents:"Adversaires",
practiceCorrect:"Correct — votre décision correspond à celle du coach.",practiceWrong:r=>`Pas cette fois. Le coach recommande ${r}.`,
practiceDone:(s,t)=>`Entraînement terminé : ${s}/${t} décisions correspondent au coach. Ce sont de vrais spots sauvegardés de vos sessions.`,
confidenceTitle:(source,level)=>`${source} · confiance ${level}`,confidenceHigh:"élevée",confidenceMedium:"moyenne",confidenceLimited:"limitée",
confidenceChart:"Charte préflop",confidenceMath:"Calcul du pot exact + simulation d'équité",confidenceHeuristic:"Heuristique de ranges",
confidenceChartNote:"Utilise la charte de position et de profondeur pour ce spot préflop.",
confidenceMathNote:"Les cotes du pot sont exactes ; l'équité et l'action future utilisent des simulations et des ranges adverses estimées.",
confidenceHeuristicNote:"Les ranges multiway et les actions futures demandent plus d'hypothèses : considérez ce conseil comme directionnel.",
strategyLabel:"Stratégie",strategyBaseline:"Base / équilibrée",strategyExploit:"Ajustement exploitant",
bluffBreakEven:"Seuil d'un bluff pur",bluffBreakEvenNote:(f,fe)=>`Cette taille exige environ ${f} % de folds ; le modèle en estime environ ${fe} %. L'équité à l'abattage ajoute de la valeur si vous êtes payé.`,
bluffTitle:"Évaluation du bluff",bluffVerdict:"Verdict",bluffWhy:"Pourquoi",bluffPlan:"Si vous êtes payé ou relancé",
intentBluff:"BLUFF",intentSemiBluff:"SEMI-BLUFF",intentValue:"VALUE",intentProtection:"PROTECTION",intentRangeBluff:"BLUFF DE RANGE",intentRangeRaise:"RELANCE DE RANGE",intentBluffCatch:"BLUFF-CATCH",intentCall:"CALL",intentCheck:"CHECK",intentFold:"FOLD",
bluffGood:"Bon candidat au bluff",bluffThin:"Bluff limite — prudence",bluffSemi:"Semi-bluff : folds immédiats + équité du tirage",bluffNot:"Pas un bluff — construisez le pot pour valeur",bluffNo:"Bluff déconseillé",
bluffFoldCompare:(need,est)=>`Environ ${need} % de folds requis · estimation ~${est} %`,bluffCalledEquity:e=>`Environ ${e} % d'équité utilisable si vous êtes payé`,
bluffReasonPassive:"Les adversaires ont montré de la faiblesse en checkant ; leurs ranges contiennent beaucoup de mains qui peuvent folder.",bluffReasonBlocker:"Vos cartes bloquent certaines des mains adverses les plus fortes.",bluffReasonDraw:"Votre tirage peut encore s'améliorer quand le bluff est payé.",bluffReasonPosition:"Parler en dernier apporte plus d'informations et rend la pression plus sûre.",bluffReasonDry:"Ce board sec laisse moins de gros tirages et de mains capables de continuer.",bluffReasonStation:"Un joueur loose qui paie souvent ne foldera probablement pas assez.",bluffReasonMultiway:"Plusieurs adversaires restent ; l'un d'eux est donc plus susceptible de payer.",bluffReasonHistoryFolds:"Cet adversaire précis a foldé sous pression plus souvent que son profil ne le prévoit lors des mains précédentes.",bluffReasonHistoryCalls:"Cet adversaire précis a payé ou relancé sous pression plus souvent que son profil ne le prévoit lors des mains précédentes.",bluffReasonStrength:"Vous faites face à de l'agression ; la range adverse est moins susceptible de folder.",bluffReasonShowdown:"Votre main a de la valeur à l'abattage ; la transformer en bluff ferait souvent folder moins bien et continuer mieux.",bluffReasonRange:"Cette action suit la stratégie de position/range plutôt qu'un bluff pur postflop.",
bluffHistoryRead:(n,rate,delta,d)=>`Historique adverse : ${n} ${n===1?'décision':'décisions'} sous pression · taux de fold appris ~${rate} % · ${delta>=0?'+':''}${delta} % appliqué en ${d}`,
bluffPlanGiveUp:"Si vous êtes payé, abandonnez généralement sauf si la prochaine carte améliore vraiment votre histoire ou votre main. Foldez face à une forte relance.",bluffPlanDraw:"Continuez sur les cartes qui complètent ou renforcent le tirage ; ralentissez après une mauvaise carte ou une forte relance.",bluffPlanValue:"Continuez pour valeur sur les cartes sûres, mais réévaluez si le board ou l'action adverse devient dangereux.",bluffPlanCatch:"Payez pour attraper les bluffs ; ne relancez pas, car les mains moins bonnes folderont et les meilleures continueront.",bluffPlanFree:"Prenez la carte gratuite/l'abattage et réévaluez après la prochaine action.",bluffPlanFold:"Foldez maintenant et préservez vos jetons ; aucun investissement de bluff n'est justifié.",bluffPlanFollow:"Suivez l'action recommandée puis réévaluez avec la prochaine carte et la réponse adverse.",
readConfidence:"Confiance de la lecture",readSample:n=>`${n} action${n!==1?'s':''} visible${n!==1?'s':''}`,readConfidenceEarly:"précoce — privilégiez le profil par défaut",readConfidenceTentative:"tendance provisoire",readConfidenceReliable:"échantillon fiable à cette table",
processGoodBad:"Bonne décision, mauvais résultat : vos choix suivaient la ligne +EV du coach. La variance n'en fait pas des erreurs.",
processBadGood:"Bon résultat, processus discutable : vous avez gagné des jetons, mais au moins une décision a sacrifié de l'EV estimée. Le résultat ne valide pas le choix.",
analyticsTitle:"Analyse avancée des leaks",analyticsSub:"Chaque décision du coach est regroupée par contexte. La précision indique à quelle fréquence votre action correspond au coach.",
analyticsPosition:"Par position",analyticsStreet:"Par street",analyticsDepth:"Par profondeur",analyticsPotType:"Par type de pot",analyticsTableSize:"Par joueurs restants",
analyticsDecisions:n=>`${n} décision${n!==1?'s':''}`,analyticsAccuracy:"de précision",analyticsRecent:"10 dernières sessions",analyticsPrevious:"10 précédentes",
analyticsNoData:"Jouez quelques nouvelles mains pour débloquer l'analyse contextuelle. Les anciennes décisions restent dans le leak finder.",
analyticsSample:"Les groupes de moins de 10 décisions sont des signaux précoces, pas encore des leaks établis.",
analyticsWorst:(name,ev,n)=>`Votre leak mesuré principal est <b>${name}</b> : −${ev} EV sur ${n} décisions.`,
analyticsFrequent:(name,pct,n)=>`Votre plus faible correspondance au coach est <b>${name}</b> : ${pct}% sur ${n} décisions.`,
analyticsTrendUp:n=>`La précision face au coach progresse de <b>${n} points</b> par rapport aux 10 sessions précédentes.`,
analyticsTrendDown:n=>`La précision face au coach baisse de <b>${n} points</b> par rapport aux 10 sessions précédentes.`,
potUnopened:"Pot non ouvert / limpé",potSingle:"Pot relancé",potThreeBet:"Pot 3-bet+",potMultiway:"Pot multiway",
tableHeadsUp:"Heads-up",tableThree:"3 joueurs",tableFour:"4 joueurs",tableFive:"5 joueurs",tableSixMax:"6-max",tableFullRing:"Full-ring (7–9)",
scenarioBtn:"Builder de scénarios",scenarioBtnSub:"Créez et entraînez n'importe quelle décision",scenarioTitle:"Builder de scénarios personnalisés",scenarioSub:"Construisez une décision, analysez-la, sauvegardez-la ou jouez-la immédiatement.",
scCards:"Vos cartes",scBoard:"Board",scPos:"Position",scOpps:"Adversaires",scStack:"Tapis effectif (BB)",scPot:"Pot",scCall:"À payer",scProfile:"Profil adverse",scGame:"Contexte",scAction:"Action précédente",
scCardsHelp:"Choisissez vos deux cartes privées.",scBoardHelp:"Laissez vide préflop, ou choisissez 3 à 5 cartes communes.",scEmptyCard:"— Vide —",
scAnalyze:"Analyser le spot",scSave:"Sauvegarder",scShare:"Copier le lien",scSaved:"Scénarios sauvegardés",scClose:"Fermer",
scInvalid:"Choisissez deux cartes privées différentes puis 0, 3, 4 ou 5 cartes différentes au board, sans emplacement vide entre elles.",scSavedOk:"Scénario sauvegardé.",scCopied:"Lien copié.",
scRecommendation:"Recommandation",scEquity:"Équité estimée",scPrice:"Cotes du pot",scConfidence:"Confiance",scPlay:"Jouer cette décision",scDrill:"Pratiquer 10 variantes",scCorrect:"Correct.",scWrong:r=>`Recommandation du coach : ${r}.`,
scReasonCall:(e,n)=>`Votre équité estimée (${e} %) dépasse le prix de ${n} % après un léger ajustement de réalisation.`,
scReasonFold:(e,n)=>`Votre équité estimée (${e} %) ne dépasse pas le seuil ajusté de ${n} %.`,
scReasonRaise:e=>`Avec environ ${e} % d'équité, construire le pot est préférable face au profil sélectionné.`,
scReasonCheck:e=>`Checker contrôle le pot avec environ ${e} % d'équité et ne coûte rien.`,
scUnopened:"Non ouvert",scLimp:"Limp",scRaise:"Relance",scThreeBet:"3-bet",scCbet:"C-bet",scCheckRaise:"Check-raise",scAllin:"Tapis",
revAllHands:"Toutes les mains sauvegardées",revReplay:"Touchez une partie pour revoir ses mains",revMidBanner:"Main en cours — reprise",
resetData:"Effacer les données sauvegardées",resetInfo:"Supprime les statistiques globales, l’historique des mains, les bilans, les scénarios sauvegardés et toute partie en cours à reprendre. Votre niveau Rewards, XP, éléments débloqués, cosmétiques équipés et choix de langue sont conservés. Irréversible.",resetConfirm:"Supprimer toutes les statistiques, l’historique, les bilans, les scénarios et les parties en cours ? Le niveau et la progression Rewards seront conservés.",resetDone:"✓ Effacé",
level:"Niveau ",hand:"Main ",blindsUpA:"Blinds montent dans ",blindsUpB:" mains",autoNext:"Main suivante auto",coachLbl:"🧭 Coach en direct",coachBtn:"Coach",quit:"Quitter",quitSng:"Quitter ce tournoi ?",quitCash:"Quitter la table ?",
fold:"Se coucher",check:"Parole",call:"Suivre",allin:"Tapis",raiseTo:"Relancer à ",betW:"Miser ",raiseW:"Relancer",min:"Min",halfPot:"½ Pot",pot:"Pot",
actMenu:"◀ Menu",actTurn:"◀ À vous",
log:"Journal",lastHand:"Dernière main",exportH:"Exporter l'historique",nextHand:"Main suivante ▶",liveCoach:"🧭 COACH EN DIRECT",coachScrollMore:"Faites défiler pour voir la suite",
waiting:"Les conseils apparaissent ici quand c'est votre tour.",
outQuality:"Qualité des outs",weightedOuts:"outs ajustés à la range",weightedOutsNote:n=>`${n} cartes brutes, réduites lorsqu’elles peuvent partager, être dominées, améliorer le board pour tous ou perdre plus souvent face à la range adverse estimée.`,overcardOuts:"Outs d'overcards vers une paire",pairImproveOuts:"Outs vers brelan / deux paires",redrawOuts:"Redraws full / carré",
yourHand:"Votre main",position:"Position",actingOrder:"Ordre de parole",postflopOrder:"Ordre post-flop",winChance:"Chance de gain",playersBehind:"Joueurs derrière",openingDecision:"Décision d'ouverture",raiseOrFold:"Relancer ou se coucher · pas de limp",draws:"Tirages",outs:"Outs",unique:"uniques",shared:"communs",countedOnce:"comptés une fois",dirtyOuts:"Outs sales",dirtyOutsInfoLbl:"Qu'est-ce qu'un out sale ?",dirtyOutsInfo:"Un out sale complète votre tirage sur le papier mais ne gagne souvent pas le pot — ex. il pair le board (aide tout le monde) ou est la 4e carte d'une couleur au board qui donne la couleur gagnante à l'adversaire. Comptez les outs propres pour vos cotes.",potOdds:"Cote du pot",impliedOdds:"Cotes implicites",realisticNeed:"seuil réaliste",bestCaseNeed:"meilleur cas",effectiveNeed:"Seuil effectif du call",effectiveNeedNote:"Équité requise après position, ranges et pression du tournoi.",preflopRank:p=>`Classement préflop : top ~${p}% des mains de départ`,lowerStronger:"plus bas = plus fort",yourStack:"Votre tapis",sugSize:"Taille suggérée",
firstToAct:"premier à parler (OOP)",lastToAct:"dernier à parler (IP)",ofN:"sur",need:"requis ",vs:"vs",opp:"adversaire",opps:"adversaires",
beginnerMath:(raw,usable,need,enough)=>`Équité brute : ${raw} %. Utilisable après position et risque : ~${usable} %. Un call exige ${need} % — ${enough?'assez pour continuer':'pas assez, couchez-vous'}.`,
beginnerFree:"En clair : checker ne coûte aucun jeton. Vous gardez votre main en vie et voyez la suite sans grossir le pot.",
beginnerDrySidePot:"En clair : vous avez bien top paire. Le check est recommandé parce qu'un joueur est déjà à tapis et qu'il n'existe encore aucun side pot. Sur ce board sec, miser ferait surtout coucher les mains moins bonnes et créerait un nouveau pot contre les mains plus fortes.",
beginnerAgg:"En clair : votre chance de gagner n’est qu’une partie d’un bet ou d’une relance. Les adversaires peuvent se coucher immédiatement (fold equity), et des mains moins bonnes peuvent payer.",
beginnerOpenFold:"En clair : aucun jeton supplémentaire n’est encore requis, mais cette main est trop faible pour entrer rentablement depuis cette position. Se coucher préserve votre tapis.",
thisGame:"CETTE PARTIE",lifetime:"GLOBAL",handsPW:"Mains jouées / gagnées",net:"Net",biggestPot:"Plus gros pot gagné",vpipPfr:"VPIP / PFR",aggF:"Facteur d'agression",wonSd:"Gagné à l'abattage",evLeak:"EV perdue vs coach",coachFollowed:"Coach suivi",followedCoach:"coach suivi",coachSaid:"le coach a dit",youChose:"vous avez choisi",
recFOLD:"SE COUCHER",recCHECK:"PAROLE",recCALL:"SUIVRE",recRAISETO:"RELANCER À",recBET:"MISER",recALLIN:"TAPIS",
zoneG:"🟢 confortable",zoneY:"🟡 battez-vous pour les pots",zoneO:"🟠 bientôt tapis-ou-couché",zoneR:"🔴 tapis ou couché",
prizeP:"Pression des prix",extraNeeded:"requis en plus",
icmTitle:"Valeur du tournoi (ICM)",icmImpact:"Ce call vaut plus que son simple calcul en jetons, car perdre des jetons peut éliminer ou fortement handicaper votre tournoi.",
icmPlayers:(left,paid)=>`${left} joueurs restants · ${paid} place${paid!==1?'s':''} payée${paid!==1?'s':''}`,icmStackRank:(rank,left)=>`Classement des tapis : ${rank}e sur ${left}`,
icmRisk:p=>`Ce call risque ${p} % de votre tapis`,icmCovered:"Le relanceur vous couvre : perdre peut vous éliminer.",icmCovers:"Vous couvrez le relanceur : vous conserverez des jetons si vous perdez.",
icmThreshold:(chip,icm,extra)=>`La cote du pot exige ${chip} %. L’ICM monte le seuil de rentabilité à ${icm} % (+${extra} %).`,
benchRun:"🧪 Benchmark du coach",
mpTitle:"👥 Jouer entre amis",mpSub:"Invitez vos amis avec un lien — gratuit, sans compte",mpNamePh:"Votre prénom",mpCreate:"Créer un salon",mpJoinB:"Rejoindre",mpCodePh:"CODE",
mpLobbyTitle:"Salon",mpCopy:"📋 Copier le lien d'invitation",mpCopied:"✓ Copié — envoyez-le à vos amis",
mpFillLbl:"Compléter avec des bots IA",mpStart:"▶ Lancer la partie",mpLeave:"Quitter",
mpWaitHost:"En attente du lancement par l'hôte…",mpConnecting:"Connexion…",
mpNetFail:"Réseau injoignable. Vérifiez votre connexion et réessayez.",
mpHostLeft:"L'hôte est parti — la partie est terminée.",mpNeedName:"Choisissez d'abord un prénom 🙂",
mpAutoA:"Lancement auto à",mpAutoB:"joueurs",
mpTest:"🔧 Tester ma connexion",mpTestSig:"contact du cloud de signalisation…",mpTestRtc:"cloud OK — test de la connexion directe…",mpTestSigFail:"impossible de joindre le cloud de signalisation. Un pare-feu, VPN ou bloqueur de pub bloque peut-être 0.peerjs.com.",mpTestRtcFail:"la signalisation fonctionne mais la connexion directe a échoué — ce réseau bloque WebRTC. Essayez un autre Wi-Fi ou coupez le VPN.",mpTestOK:"Test réussi — cet appareil peut créer et rejoindre des salons.",
mpStarted:"La partie de ce salon a déjà commencé.",
mpFull:"Ce salon est complet (9 joueurs max).",
mpWaitNext:"Partie en cours — vous serez servi à la prochaine main. Patience !",
mpMigrating:"Connexion à l'hôte perdue — récupération de la partie…",
mpMigrated:n=>`${n} est le nouvel hôte — le tournoi continue !`,
mpRejoined:n=>`${n} est de retour à la table`,
mpReplaced:(n,b2)=>`${n} remplace 🤖 ${b2} — les humains avant les robots`,
mpWaitingPlayers:"Table ouverte — en attente de joueurs. Partagez le lien d'invitation !",
react:"Réagir",reactHint:"Touchez pour réagir — visible au-dessus de votre siège par tous",timerOpt:"⏱ Minuteur de tour (25s + réserve)",timerBank:"🏦 Réserve de temps enclenchée — les secondes filent !",timerInfo:"Comme au casino : 25 secondes par décision — un compte à rebours s'affiche sous votre siège. S'il expire sur un choix difficile, votre RÉSERVE DE TEMPS prend le relais automatiquement (60 secondes pour tout le tournoi, elle ne consomme que ce que vous utilisez — affichée 🏦). Quand tout est épuisé, le jeu checke ou se couche pour vous. Excellent entraînement pour le live. Toujours actif entre amis.",
mpKnock:n=>`${n} rejoint à la prochaine main`,
mpVerMismatch:"L'hôte utilise une autre version du jeu. TOUS LES DEUX : rechargez la page (Maj + rechargement), puis recréez le salon.",
mpNeed2:"Il faut au moins un ami dans le salon pour lancer — ou cochez « Compléter avec des bots IA ».",
mpHostHint:"Partagez le lien et patientez — vos amis apparaissent dans la liste ci-dessous. Puis appuyez sur Lancer.",
mpRoomGone:"Salon introuvable — vérifiez le code et que l'hôte a toujours le salon ouvert.",
mpConnFail:"Connexion au salon impossible. Les réseaux mobiles bloquent parfois les connexions directes — essayez le même Wi-Fi que l'hôte, puis réessayez.",
mpJoined:n=>`${n} a rejoint le salon`,mpGone:n=>`${n} s'est déconnecté — sa main est couchée`,
mpYou:"(vous · hôte)",mpYouG:"(vous)",chatPh:"Message…",
viewChart:"📊 Voir la charte de cette position",chartTitleOpen:"charte d'ouverture",chartTitleIso:"charte iso vs limps",chartTitleShove:"charte de tapis",chartTitleFacing:"charte face à cette relance",chartTitleBbDefend:"charte défense BB",chartTitleFourBet:"réponse face au 3-bet",
showRange:"📊 Afficher la range adverse",hideRange:"▴ Masquer la range adverse",viewRange:"🔎 Ouvrir le Range Explorer interactif",chartTitleRange:"range estimée en ce moment",legendRange:"mains qu'il peut encore avoir",rangeFringe:"Marginal",rangePossible:"Possible",rangeLikely:"Probable",rangeVeryLikely:"Très probable",
rangeExplore:"Explorer la range",rangeFilter:"Afficher",rangeFilterAll:"Toutes les mains",rangeFilterMade:"Mains faites",rangeFilterDraws:"Tirages",rangeFilterNut:"Tirages max",rangeFilterNonNut:"Tirages non max",rangeFilterBackdoor:"Backdoors",rangeFilterAir:"Air / bluffs",rangePick:"Sélectionnez une classe de mains dans la grille pour comprendre pourquoi elle reste possible.",rangeCellShare:(h,p,a,c)=>`${h} représente environ ${p} % de cette range adverse. ${a} combo${a!==1?'s':''} exact${a!==1?'s':''} reste${a!==1?'nt':''} pondéré${a!==1?'s':''} parmi ${c} combinaison${c!==1?'s':''} de couleurs non bloquée${c!==1?'s':''}.`,rangeCellDensity:n=>`Chaque combo disponible de ${n} est pondéré par rapport à un combo légal moyen.`,rangeCellMix:"Ce que ces combos ont actuellement",rangeUnavailable:"Cette classe de mains n’a plus aucune combinaison pondérée après les bloqueurs et la ligne d’action.",revExploreRange:"Explorer la range",
rangeDensity:"Probabilité par combo",rangeClassProb:"Probabilité de la classe",rangeEffective:"combos effectifs",rangeLine:"Ligne d'actions",rangeTopCard:"Mains avec la top card",rangeTopHands:"Candidats principaux",rangeOpen:"Open",rangeOfRange:"de la range",rangeCombos:"combos disponibles",rangeAvgCombo:"la probabilité moyenne d'un combo",
rangeComposition:"Répartition exacte",rangeFullHousePlus:"Full ou mieux",rangeMadeFlushes:"Couleurs faites",rangeStraights:"Quintes",rangeTrips:"Brelans",rangeTwoPair:"Deux paires",rangeOnePair:"Une paire",rangeDrawOnly:"Tirage seul",rangeAir:"Air / bluffs possibles",rangeBoardOnly:"Board joué",
rangeDrawBreakdown:"Texture exacte des tirages",rangeComboDraw:"Combo draws",rangeNutFlushDraw:"Tirages couleur max",rangeNonNutFlushDraw:"Tirages couleur non max",rangeStraightDraw:"Tirages quinte",rangePairPlusDraw:"Paire + tirage",rangeBackdoorDraw:"Tirages backdoor uniquement",
rangeWeightRaise:(d,x,h)=>d==='up'?`${h} gagne du poids (${x}× la moyenne) : la dernière action agressive correspond mieux à sa valeur ou à son potentiel de semi-bluff.`:d==='down'?`${h} perd du poids (${x}× la moyenne) : cette action agressive correspond moins à cette classe qu'aux mains fortes et tirages crédibles.`:`${h} reste proche de son poids initial (${x}× la moyenne) après la dernière action agressive.`,
rangeWeightCall:(d,x,h)=>d==='up'?`${h} gagne du poids (${x}× la moyenne) : payer correspond à sa valeur à l'abattage ou à la réalisation de son tirage.`:d==='down'?`${h} perd du poids (${x}× la moyenne) : cette classe continue moins souvent que les calls forts et les tirages adverses.`:`${h} reste proche de son poids initial (${x}× la moyenne) après le call.`,
rangeWeightCheck:(d,x,h)=>d==='up'?`${h} gagne du poids (${x}× la moyenne) : checker correspond à son profil de force moyenne ou d'abandon.`:d==='down'?`${h} perd du poids (${x}× la moyenne) : le check rend les versions fortes de cette classe moins probables.`:`${h} reste proche de son poids initial (${x}× la moyenne) après le check.`,
rangeWeightPrior:(d,x,h)=>`${h} pèse ${x}× un combo légal moyen selon la position, le profil et la range initiale.`,
rangeBlockerImpact:n=>`Les cartes connues retirent ${n} combo${n!==1?'s':''} exact${n!==1?'s':''}.`,rangeActionRemoved:n=>`La ligne d'action modélisée réduit ${n} autre${n!==1?'s':''} combo${n!==1?'s':''} non bloqué${n!==1?'s':''} à un poids nul.`,
rangeIso:"Relance d'isolation",rangeSqueeze:"Squeeze",rangeLimp:"Limp",rangeOption:"Check gratuit",rangeEntering:s=>`Range à l'entrée du ${s} — l'adversaire n'a pas encore agi`,
legendOpen:"relancer en premier",legendShove:"partir à tapis",legendFold:"se coucher",legendYou:"votre main",legend3bet:"sur-relancer (3-bet)",legendFourBet:"4-bet",legendCall:"suivre",
benchConfirm:"Simuler 25 tournois complets à 9 joueurs où un bot suit UNIQUEMENT les conseils du coach, pour mesurer sa vraie valeur. Compte une à deux minutes. Lancer ?",
youWin:"Vous remportez le tournoi !",playAgain:"Rejouer",
youWinSub:(n,h)=>`Vous avez survécu à ${n} adversaires en ${h} mains.`,
bustedTitle:p=>`Éliminé à la ${p} place`,bustedSub:h=>`${h} mains jouées. On remet ça ?`,
evTotal:"📉 EV totale perdue",deviations:"écarts",cleanGame:"Aucune EV perdue face au coach — partie parfaite ! 🎯",smallerLeaks:"autres fuites mineures",
handNavP:"‹ main",handNavN:"main ›",streetNavP:"‹ rue",streetNavN:"rue ›",jumpHand:"Aller à la main",jumpGo:"Aller",handNotFound:n=>`La main nº ${n} n'est pas disponible dans cette session.`,close:"Fermer",replayTitle:"Revoir la main",
cfTitle:"Explorateur contrefactuel",cfSub:"Comparez ce qui aurait pu se produire à chacune de vos décisions.",cfDecision:n=>`Décision ${n}`,cfActual:"Votre choix",cfCoach:"Coach",cfBest:"EV maximale",cfEv:"EV estimée",cfLoss:"Écart au meilleur choix",cfCaptured:"Capturé à la table",cfEstimated:"Estimation reconstruite",
cfFoldWhy:"Se coucher ne risque aucun jeton supplémentaire et vaut 0 EV additionnelle.",cfCheckWhy:eq=>`Checker ne coûte rien, garde votre main en jeu et réalise environ ${eq} % d'équité sans grossir le pot.`,cfCallWhy:(eq,need,amt)=>`Payer investit ${amt} avec environ ${eq} % d'équité utilisable pour ${need} % requis.`,cfRaiseWhy:(eq,amt)=>`Relancer à ${amt} combine environ ${eq} % d'équité avec la fold equity modélisée quand les adversaires abandonnent leurs ranges faibles.`,cfAssumption:"L'EV indique une direction, pas une promesse : les prochaines cartes et les réponses adverses restent incertaines.",
won:"gagné",foldedTag:"couché",showdown:"abattage",fullHand:"Main complète",preflop:"Pré-flop",flop:"Flop",turnSt:"Turn",riverSt:"River",noHands:"Aucune main terminée pour cette partie.",
ord:n=>n===1?'1re':n+'e'},
es:{sub:"Torneo de Texas Hold'em No-Limit contra la IA",subCash:"Cash game Texas Hold'em No-Limit contra la IA",modeLbl:"Modo de juego",modeSng:"Sit & Go",modeCash:"Cash game",titleSng:"Sit & Go Hold'em",titleCash:"Cash Game Hold'em",
players:"Jugadores",blinds:"Ciegas",buyin:"Entrada (buy-in)",stackDepth:"Stack inicial",ante:"Ante",noAnte:"sin ante",
speed:"Velocidad de ciegas",turbo:"Turbo",standard:"Estándar",slow:"Lenta",koBonusOpt:"🎯 Bono KO",koBonusInfo:"Opción Sit & Go estilo bounty: cuando eliminas personalmente a un rival, ganas al instante un bono en fichas igual al 10% del stack inicial. Premia las eliminaciones y hace más fuerte la presión del stack grande. Solo recibe el bono quien gana fichas del rival eliminado.",koBonusAward:(n,b)=>`🎯 Bono KO: +${b} por eliminar ${n} jugador${n>1?'es':''}`,diff:"Nivel de la IA",easy:"Fácil",medium:"Medio",hard:"Difícil",language:"Idioma",
tableStyle:"Estilo de mesa",tableBalanced:"Mezcla equilibrada",tableTight:"Mesa cerrada",tableLoose:"Mesa loose",tableAggressive:"Mesa agresiva",tableWild:"Mesa salvaje",tableRandom:"Aleatoria",tableCustom:"Personalizada",
tableDescBalanced:"Una mesa variada con todas las personalidades rivales.",tableDescTight:"Una mesa disciplinada que juega menos botes y respeta más las apuestas grandes.",tableDescLoose:"Una mesa pegajosa que ve más flops e iguala con rangos más amplios.",tableDescAggressive:"Una mesa de mucha presión, con robos, c-bets y subidas frecuentes.",tableDescWild:"Una mesa volátil con rangos muy amplios, apuestas mayores y más faroles.",tableDescRandom:"Cada bot recibe una personalidad elegida independientemente al azar.",tableDescCustom:"Elige el número exacto de bots de cada personalidad.",
profileRock:"Cerrado",profileStation:"Loose",profileShark:"Agresivo",profileManiac:"Salvaje",tableRandomLine:n=>`${n} bot${n!==1?'s':''} · perfiles sorteados al empezar`,tableCustomTotal:(n,t)=>`${n} de ${t} roles de bot asignados`,tableCustomInvalid:t=>`Asigna exactamente ${t} rol${t!==1?'es':''} de bot para empezar.`,
deal:"¡Reparte!",startCash:"Sentarse",resume:"▶ Reanudar torneo",resumeMid:"▶ Reanudar mano en curso",resumeCash:"▶ Reanudar sesión cash",review:"Resumen de sesiones",
quickPlayTitle:"¿Listo para jugar?",quickPlaySub:"Empieza una mesa nueva o continúa donde lo dejaste.",
sessionPnL:"Sesión",cashSessionEnd:"Sesión terminada",cashSessionSub:(h,r,pnl)=>`${h} manos · ${r} rebuy${r!==1?'s':''} · ${pnl>=0?'+':'−'}${usd(Math.abs(pnl))} neto`,
cashRebuy:b=>`Rebuy por ${b}`,
revTitle:"Resumen de sesiones",reviewBtnSub:"Revisa tus fugas y continúa tu plan de mejora",revWinRate:"Tasa de victorias",revITM:"En premios",revAvgFinish:"Puesto medio",
revNet:"Neto total",revEVLeaked:"EV perdido",revGames:"Partidas",revNoGames:"Sin partidas terminadas — ¡juega un torneo!",revNoGamesCash:"Sin sesiones terminadas — ¡juega cash!",
revCashBadge:"Cash",revSngBadge:"Sit & Go",
revFilterAll:"All",revFilterCash:"Cash",revFilterSng:"Sit & Go",
revBB100:"BB/100",revCashHands:"Cash hands",revCashNetBB:"Net (BB)",revCashRebuys:"Rebuys",
sprLbl:"SPR",sprZoneDeep:"deep",sprZoneMid:"medium",sprZoneLow:"low",
statBB100:"BB/100",statNetBB:"Net (BB)",statRebuys:"Rebuys",
revLeaksTitle:"Fugas por tipo de spot",revLeaksNone:"Sin fugas clasificadas aún — desvíate del coach y termina partidas.",
leakPfOpen:"Aperturas preflop",leakPfFace:"Frente a subidas",leakCbet:"Defensa c-bet",leakMultiway:"Pots multiway",leakRiver:"Calls en river",leakRiverAir:n=>`${n} call${n>1?'s':''} en river sin mano`,
revIntro:"Encuentra las decisiones que más te cuestan, detecta errores repetidos y reproduce las manos exactas.",
revFocusTitle:"Qué trabajar ahora",revFocusSub:"Priorizado por EV total perdido y repetición. Un error pequeño y frecuente puede importar más que una mano espectacular.",
revFocusRank:n=>`Prioridad ${n}`,revTimes:n=>`${n} vez${n!==1?'es':''}`,revAvgLoss:"pérdida media",
planTitle:"Tu plan de mejora adaptativo",planSub:"Tus tres habilidades prioritarias, recalculadas después de cada sesión y práctica.",planNoData:"Termina una sesión con decisiones del coach para generar tu primer plan personalizado.",
planMastery:"Dominio",planEvidence:n=>`${n} decisión${n!==1?'es':''} medida${n!==1?'s':''}`,planEarly:"Señal inicial",planReliable:"Muestra fiable",
planStatusFocus:"Prioridad actual",planStatusBuilding:"Mejorando",planStatusStrong:"Casi dominado",
planTrendUp:n=>`↑ Mejora reciente de ${n} puntos`,planTrendDown:n=>`↓ Bajada reciente de ${n} puntos`,planTrendFlat:"→ Estable recientemente",
planDrillResult:(s,t)=>`Última práctica: ${s}/${t}`,planPracticeSaved:"Este resultado ya cuenta para tu puntuación de dominio.",
planLessonPfOpen:"Construye un rango de apertura limpio por posición: menos manos débiles temprano y más presión con buenas manos en posiciones tardías.",
planLessonPfFace:"Antes de igualar una subida, compara el precio con la equity realmente utilizable, la posición y los jugadores que aún pueden resubir.",
planLessonCbet:"Defiende c-bets según la textura, el tamaño y la jugabilidad futura, no solo porque conectaste algo.",
planLessonMultiway:"Cierra tu rango cuando entran más rivales. Las parejas y proyectos débiles pierden valor rápidamente en botes multiway.",
planLessonRiver:"En el river, cuenta las manos de valor y los faroles creíbles. No pagues solo porque tu mano era fuerte antes.",
adaptiveAiTitle:"Lo que los rivales aprenden de ti",adaptiveAiSub:"Solo se miden tus acciones visibles, nunca tus cartas ocultas.",adaptiveAiSample:n=>`${n} acción${n!==1?'es':''} observada${n!==1?'s':''}`,adaptiveAiEarly:"Lectura inicial",adaptiveAiReliable:"Lectura fiable",
adaptiveAiEasy:"Fácil · apenas se adapta",adaptiveAiMedium:"Medio · se adapta con cuidado",adaptiveAiHard:"Difícil · se adapta plenamente",
adaptiveAiNeedMore:n=>`Los bots necesitan ${n} acción${n!==1?'es':''} visible${n!==1?'s':''} más antes de adaptarse en este nivel.`,
adaptiveAiBalanced:"Aún no hay una tendencia fuerte. Los bots mantienen su estrategia normal.",
adaptiveAiOverfold:"Te retiras a menudo bajo presión. Los bots harán más faroles y presionarán más.",
adaptiveAiSticky:"Igualas a menudo bajo presión. Los bots harán menos faroles y apostarán más fuerte por valor.",
adaptiveAiAggressive:"Apuestas y subes a menudo postflop. Los bots continuarán con rangos más fuertes y tenderán más trampas.",
adaptiveAiPassive:"Pasas a menudo postflop. Los bots apostarán más cuando muestras debilidad.",
adaptiveAiPreAgg:"Subes a menudo preflop. Los bots defenderán con rangos más fuertes.",
revDecisionsTitle:"Decisiones más costosas",revDecisionsSub:"Filtra tus errores y abre la mano exacta para revisar la acción completa.",
revSpot:"Situación",revStreet:"Calle",revPeriod:"Sesiones",revAny:"Todas",revRecent10:"Últimas 10",revRecent25:"Últimas 25",
revReplayHand:"Repetir mano",revNoDecisions:"Ningún error coincide con estos filtros. Amplía los filtros o juega otra sesión.",
revPractice:n=>`Practicar ${n} situación${n!==1?'es':''} similar${n!==1?'es':''}`,practiceTitle:"Práctica enfocada",practiceSub:"Decide primero. La respuesta del coach aparece después.",practiceProgress:(n,t)=>`Situación ${n} de ${t}`,
practicePrompt:"¿Qué harías?",practiceNext:"Siguiente",practiceFinish:"Terminar",practiceClose:"Salir de práctica",
practicePot:"Bote",practiceToCall:"A pagar",practiceOpponents:"Rivales",
practiceCorrect:"Correcto: coincide con la recomendación del coach.",practiceWrong:r=>`Esta vez no. El coach recomienda ${r}.`,
practiceDone:(s,t)=>`Práctica terminada: ${s}/${t} decisiones coincidieron con el coach. Son situaciones reales guardadas de tus sesiones.`,
confidenceTitle:(source,level)=>`${source} · confianza ${level}`,confidenceHigh:"alta",confidenceMedium:"media",confidenceLimited:"limitada",
confidenceChart:"Tabla preflop",confidenceMath:"Cálculo exacto del bote + simulación de equity",confidenceHeuristic:"Heurística de rangos",
confidenceChartNote:"Usa la tabla de posición y profundidad para esta situación preflop.",
confidenceMathNote:"Las odds del bote son exactas; la equity y la acción futura usan simulaciones y rangos rivales estimados.",
confidenceHeuristicNote:"Los rangos multiway y las acciones futuras requieren más supuestos; interpreta el consejo como direccional.",
strategyLabel:"Estrategia",strategyBaseline:"Base / equilibrada",strategyExploit:"Ajuste explotador",
bluffBreakEven:"Umbral de farol puro",bluffBreakEvenNote:(f,fe)=>`Este tamaño necesita cerca del ${f}% de folds; el modelo estima cerca del ${fe}%. La equity al showdown añade valor cuando pagan.`,
bluffTitle:"Evaluación del farol",bluffVerdict:"Veredicto",bluffWhy:"Por qué",bluffPlan:"Si pagan o resuben",
intentBluff:"FAROL",intentSemiBluff:"SEMIFAROL",intentValue:"VALOR",intentProtection:"PROTECCIÓN",intentRangeBluff:"FAROL DE RANGO",intentRangeRaise:"SUBIDA DE RANGO",intentBluffCatch:"CAZAFAROLES",intentCall:"IGUALAR",intentCheck:"PASAR",intentFold:"RETIRARSE",
bluffGood:"Buen candidato a farol",bluffThin:"Farol ajustado — precaución",bluffSemi:"Semifarol: folds ahora + equity del proyecto",bluffNot:"No es farol — construye el bote por valor",bluffNo:"Farol no recomendado",
bluffFoldCompare:(need,est)=>`Necesita cerca del ${need}% de folds · estimación ~${est}%`,bluffCalledEquity:e=>`Cerca del ${e}% de equity utilizable si pagan`,
bluffReasonPassive:"Los rivales mostraron debilidad al pasar; sus rangos contienen muchas manos que pueden foldear.",bluffReasonBlocker:"Tus cartas bloquean algunas de las manos rivales más fuertes.",bluffReasonDraw:"Tu proyecto todavía puede mejorar cuando pagan el farol.",bluffReasonPosition:"Actuar último aporta más información y hace la presión más segura.",bluffReasonDry:"Esta mesa seca deja menos proyectos fuertes y manos capaces de continuar.",bluffReasonStation:"Un jugador loose que paga mucho probablemente no foldeará lo suficiente.",bluffReasonMultiway:"Quedan varios rivales, así que es más probable que alguno pague.",bluffReasonHistoryFolds:"Este rival concreto se ha retirado ante presión más de lo que predice su perfil en manos anteriores.",bluffReasonHistoryCalls:"Este rival concreto ha pagado o resubido ante presión más de lo que predice su perfil en manos anteriores.",bluffReasonStrength:"Afrontas agresión activa; el rango rival tiene menos probabilidades de retirarse.",bluffReasonShowdown:"Tu mano tiene valor al showdown; convertirla en farol suele tirar manos peores y recibir acción de mejores.",bluffReasonRange:"Esta acción sigue la estrategia de posición y rango, no un farol puro postflop.",
bluffHistoryRead:(n,rate,delta,d)=>`Historial rival: ${n} ${n===1?'decisión':'decisiones'} bajo presión · fold aprendido ~${rate}% · ${delta>=0?'+':''}${delta}% aplicado en ${d}`,
bluffPlanGiveUp:"Si pagan, normalmente abandona salvo que la siguiente carta mejore mucho tu historia o tu mano. Retírate ante una subida fuerte.",bluffPlanDraw:"Continúa con cartas que completen o refuercen el proyecto; frena tras una mala carta o una subida fuerte.",bluffPlanValue:"Sigue por valor en cartas seguras, pero reevalúa si la mesa o la acción rival se vuelve peligrosa.",bluffPlanCatch:"Paga para cazar faroles; no resubas porque las manos peores suelen retirarse y las mejores continúan.",bluffPlanFree:"Toma la carta gratis/showdown y reevalúa después de la siguiente acción.",bluffPlanFold:"Retírate ahora y conserva fichas; no se justifica invertir en un farol.",bluffPlanFollow:"Sigue la acción recomendada y reevalúa con la siguiente carta y la respuesta rival.",
readConfidence:"Confianza de la lectura",readSample:n=>`${n} acción${n!==1?'es':''} visible${n!==1?'s':''}`,readConfidenceEarly:"temprana — apóyate en el perfil por defecto",readConfidenceTentative:"tendencia provisional",readConfidenceReliable:"muestra fiable en esta mesa",
processGoodBad:"Buen proceso, mal resultado: tus decisiones siguieron la línea +EV del coach. La varianza no las convierte en errores.",
processBadGood:"Buen resultado, proceso cuestionable: ganaste fichas, pero al menos una decisión cedió EV estimada. No dejes que el resultado valide la jugada.",
analyticsTitle:"Análisis avanzado de fugas",analyticsSub:"Cada decisión del coach se agrupa por contexto. La precisión indica con qué frecuencia tu acción coincidió con el coach.",
analyticsPosition:"Por posición",analyticsStreet:"Por calle",analyticsDepth:"Por profundidad",analyticsPotType:"Por tipo de bote",analyticsTableSize:"Por jugadores restantes",
analyticsDecisions:n=>`${n} decisión${n!==1?'es':''}`,analyticsAccuracy:"de precisión",analyticsRecent:"Últimas 10 sesiones",analyticsPrevious:"10 anteriores",
analyticsNoData:"Juega algunas manos nuevas para desbloquear el análisis contextual. Las decisiones antiguas siguen en el buscador de fugas.",
analyticsSample:"Los grupos con menos de 10 decisiones son señales iniciales, no fugas confirmadas.",
analyticsWorst:(name,ev,n)=>`Tu mayor fuga medida es <b>${name}</b>: −${ev} EV en ${n} decisiones.`,
analyticsFrequent:(name,pct,n)=>`Tu menor coincidencia con el coach es <b>${name}</b>: ${pct}% en ${n} decisiones.`,
analyticsTrendUp:n=>`La precisión mejoró <b>${n} puntos</b> frente a las 10 sesiones anteriores.`,
analyticsTrendDown:n=>`La precisión bajó <b>${n} puntos</b> frente a las 10 sesiones anteriores.`,
potUnopened:"Bote sin abrir / limpeado",potSingle:"Bote subido",potThreeBet:"Bote 3-bet+",potMultiway:"Bote multiway",
tableHeadsUp:"Heads-up",tableThree:"3 jugadores",tableFour:"4 jugadores",tableFive:"5 jugadores",tableSixMax:"6-max",tableFullRing:"Full-ring (7–9)",
scenarioBtn:"Constructor de situaciones",scenarioBtnSub:"Crea y practica cualquier decisión",scenarioTitle:"Constructor de situaciones personalizadas",scenarioSub:"Crea una decisión, analízala, guárdala o juégala de inmediato.",
scCards:"Tus cartas",scBoard:"Mesa",scPos:"Posición",scOpps:"Rivales",scStack:"Stack efectivo (BB)",scPot:"Bote",scCall:"A pagar",scProfile:"Perfil rival",scGame:"Contexto",scAction:"Acción anterior",
scCardsHelp:"Elige tus dos cartas privadas.",scBoardHelp:"Déjalo vacío preflop o elige entre 3 y 5 cartas comunitarias.",scEmptyCard:"— Vacía —",
scAnalyze:"Analizar",scSave:"Guardar",scShare:"Copiar enlace",scSaved:"Situaciones guardadas",scClose:"Cerrar",
scInvalid:"Elige dos cartas privadas distintas y 0, 3, 4 o 5 cartas distintas en la mesa, sin huecos vacíos.",scSavedOk:"Situación guardada.",scCopied:"Enlace copiado.",
scRecommendation:"Recomendación",scEquity:"Equity estimada",scPrice:"Odds del bote",scConfidence:"Confianza",scPlay:"Jugar esta decisión",scDrill:"Practicar 10 variantes",scCorrect:"Correcto.",scWrong:r=>`Recomendación del coach: ${r}.`,
scReasonCall:(e,n)=>`Tu equity estimada (${e} %) supera el precio del ${n} % tras un pequeño ajuste de realización.`,
scReasonFold:(e,n)=>`Tu equity estimada (${e} %) no supera el requisito ajustado del ${n} %.`,
scReasonRaise:e=>`Con cerca del ${e} % de equity, construir el bote es preferible contra el perfil elegido.`,
scReasonCheck:e=>`Pasar controla el bote con cerca del ${e} % de equity y no cuesta nada.`,
scUnopened:"Sin abrir",scLimp:"Limp",scRaise:"Subida",scThreeBet:"3-bet",scCbet:"C-bet",scCheckRaise:"Check-raise",scAllin:"All-in",
revAllHands:"Todas las manos guardadas",revReplay:"Toca una partida para repetir sus manos",revMidBanner:"Mano en curso — reanudada",
resetData:"Borrar datos guardados",resetInfo:"Elimina estadísticas globales, historial de manos, resúmenes, situaciones guardadas y cualquier partida sin terminar. Se conservan tu nivel Rewards, XP, desbloqueos, cosméticos equipados e idioma. No se puede deshacer.",resetConfirm:"¿Borrar estadísticas, historial, resúmenes, situaciones y partidas sin terminar? El nivel y progreso Rewards se conservarán.",resetDone:"✓ Borrado",
level:"Nivel ",hand:"Mano ",blindsUpA:"Ciegas suben en ",blindsUpB:" manos",autoNext:"Mano siguiente auto",coachLbl:"🧭 Coach en vivo",coachBtn:"Coach",quit:"Salir",quitSng:"¿Salir de este torneo?",quitCash:"¿Dejar la mesa?",
fold:"Retirarse",check:"Pasar",call:"Igualar",allin:"All-in",raiseTo:"Subir a ",betW:"Apostar ",raiseW:"Subir",min:"Mín",halfPot:"½ Bote",pot:"Bote",
actMenu:"◀ Menú",actTurn:"◀ Tu turno",
log:"Registro",lastHand:"Última mano",exportH:"Exportar historial",nextHand:"Siguiente mano ▶",liveCoach:"🧭 COACH EN VIVO",coachScrollMore:"Desplázate para ver más",
waiting:"Los consejos aparecen aquí cuando es tu turno.",
outQuality:"Calidad de los outs",weightedOuts:"outs ajustados al rango",weightedOutsNote:n=>`${n} cartas brutas, reducidas cuando pueden empatar, estar dominadas, mejorar la mesa para todos o perder más contra el rango rival estimado.`,overcardOuts:"Outs de overcards a pareja",pairImproveOuts:"Outs a trío / dobles parejas",redrawOuts:"Redraws a full / póquer",
yourHand:"Tu mano",position:"Posición",actingOrder:"Orden de palabra",postflopOrder:"Orden post-flop",winChance:"Prob. de ganar",playersBehind:"Jugadores por hablar",openingDecision:"Decisión de apertura",raiseOrFold:"Subir o retirarse · sin limp",draws:"Proyectos",outs:"Outs",unique:"únicos",shared:"compartidos",countedOnce:"contados una vez",dirtyOuts:"Outs sucios",dirtyOutsInfoLbl:"¿Qué es un out sucio?",dirtyOutsInfo:"Un out sucio completa tu proyecto en papel pero a menudo no gana el bote — p. ej. empareja la mesa (ayuda a todos) o es la 4ª carta a color en la mesa que da el color ganador al rival. Cuenta los outs limpios para tus odds.",potOdds:"Odds del bote",impliedOdds:"Odds implícitas",realisticNeed:"umbral realista",bestCaseNeed:"mejor caso",effectiveNeed:"Umbral efectivo del call",effectiveNeedNote:"Equity necesaria tras posición, rangos y presión del torneo.",preflopRank:p=>`Rango preflop: top ~${p}% de las manos iniciales`,lowerStronger:"más bajo = más fuerte",yourStack:"Tu stack",sugSize:"Tamaño sugerido",
firstToAct:"primero en hablar (OOP)",lastToAct:"último en hablar (IP)",ofN:"de",need:"necesitas ",vs:"vs",opp:"rival",opps:"rivales",
beginnerMath:(raw,usable,need,enough)=>`Equity bruta: ${raw} %. Utilizable tras posición y riesgo: ~${usable} %. Igualar exige ${need} % — ${enough?'suficiente para continuar':'insuficiente, retírate'}.`,
beginnerFree:"En claro: pasar no cuesta fichas. Mantienes viva la mano y ves qué ocurre sin agrandar el bote.",
beginnerDrySidePot:"En claro: sí tienes top pair. Se recomienda pasar porque un jugador ya está all-in y todavía no hay bote lateral. En esta mesa seca, apostar haría retirarse sobre todo a manos peores y crearía un bote nuevo contra manos más fuertes.",
beginnerAgg:"En claro: tu probabilidad de ganar es solo una parte de apostar o subir. Los rivales pueden retirarse de inmediato (fold equity), y manos peores aún pueden pagar.",
beginnerOpenFold:"En claro: todavía no hacen falta más fichas, pero esta mano es demasiado débil para entrar con beneficio desde esta posición. Retirarse conserva tu stack.",
thisGame:"ESTA PARTIDA",lifetime:"GLOBAL",handsPW:"Manos jugadas / ganadas",net:"Neto",biggestPot:"Mayor bote ganado",vpipPfr:"VPIP / PFR",aggF:"Factor de agresión",wonSd:"Ganadas en showdown",evLeak:"EV perdido vs coach",coachFollowed:"Coach seguido",followedCoach:"coach seguido",coachSaid:"el coach dijo",youChose:"tú elegiste",
recFOLD:"RETIRARSE",recCHECK:"PASAR",recCALL:"IGUALAR",recRAISETO:"SUBIR A",recBET:"APOSTAR",recALLIN:"ALL-IN",
zoneG:"🟢 cómodo",zoneY:"🟡 pelea por los botes",zoneO:"🟠 pronto all-in o fold",zoneR:"🔴 all-in o retirarse",
prizeP:"Presión de premios",extraNeeded:"extra necesario",
icmTitle:"Valor del torneo (ICM)",icmImpact:"Esta igualada vale más que su simple cálculo en fichas, porque perder fichas puede eliminarte o dañar mucho tu torneo.",
icmPlayers:(left,paid)=>`${left} jugadores restantes · ${paid} puesto${paid!==1?'s':''} pagado${paid!==1?'s':''}`,icmStackRank:(rank,left)=>`Posición por stack: ${rank} de ${left}`,
icmRisk:p=>`Esta igualada arriesga el ${p}% de tu stack`,icmCovered:"El apostador te cubre: perder puede eliminarte.",icmCovers:"Cubres al apostador: conservarás fichas si pierdes.",
icmThreshold:(chip,icm,extra)=>`Las odds exigen ${chip}%. El ICM eleva el umbral al ${icm}% (+${extra}%).`,
benchRun:"🧪 Benchmark del coach",
mpTitle:"👥 Jugar con amigos",mpSub:"Invita a tus amigos con un enlace — gratis, sin cuentas",mpNamePh:"Tu nombre",mpCreate:"Crear sala",mpJoinB:"Entrar",mpCodePh:"CÓDIGO",
mpLobbyTitle:"Sala",mpCopy:"📋 Copiar enlace de invitación",mpCopied:"✓ Copiado — envíalo a tus amigos",
mpFillLbl:"Rellenar asientos vacíos con bots",mpStart:"▶ Empezar partida",mpLeave:"Salir",
mpWaitHost:"Esperando a que el anfitrión empiece…",mpConnecting:"Conectando…",
mpNetFail:"No se pudo conectar a la red. Revisa tu internet e inténtalo de nuevo.",
mpHostLeft:"El anfitrión se fue — la partida ha terminado.",mpNeedName:"Elige un nombre primero 🙂",
mpAutoA:"Inicio automático con",mpAutoB:"jugadores",
mpTest:"🔧 Probar mi conexión",mpTestSig:"contactando la nube de señalización…",mpTestRtc:"nube OK — probando la conexión directa…",mpTestSigFail:"no se puede alcanzar la nube de señalización. Un cortafuegos, VPN o bloqueador puede estar bloqueando 0.peerjs.com.",mpTestRtcFail:"la señalización funciona pero la conexión directa falló — esta red bloquea WebRTC. Prueba otra Wi-Fi o desactiva la VPN.",mpTestOK:"Prueba superada — este dispositivo puede crear y unirse a salas.",
mpStarted:"La partida de esta sala ya empezó.",
mpFull:"Esta sala está llena (9 jugadores máx.).",
mpWaitNext:"Partida en curso — entrarás en la próxima mano. ¡Un momento!",
mpMigrating:"Conexión con el anfitrión perdida — recuperando la partida…",
mpMigrated:n=>`${n} es el nuevo anfitrión — ¡el torneo continúa!`,
mpRejoined:n=>`${n} ha vuelto a la mesa`,
mpReplaced:(n,b2)=>`${n} sustituye a 🤖 ${b2} — los humanos antes que los robots`,
mpWaitingPlayers:"Mesa abierta — esperando jugadores. ¡Comparte el enlace!",
react:"Reaccionar",reactHint:"Toca para reaccionar — aparece sobre tu asiento para todos",timerOpt:"⏱ Temporizador (25s + banco)",timerBank:"🏦 ¡Banco de tiempo activado — segundos extra en marcha!",timerInfo:"Como en un casino real: 25 segundos por decisión — aparece una cuenta atrás bajo tu asiento. Si se agota en una decisión difícil, tu BANCO DE TIEMPO entra automáticamente (60 segundos extra para todo el torneo, solo gasta lo que uses — se muestra 🏦). Cuando ambos se acaban, el juego pasa o se retira por ti. Gran entrenamiento para el directo. Siempre activo con amigos.",
mpKnock:n=>`${n} entra en la próxima mano`,
mpVerMismatch:"El anfitrión usa otra versión del juego. AMBOS: recargad la página (Shift + recargar) y cread la sala de nuevo.",
mpNeed2:"Necesitas al menos un amigo en la sala para empezar — o marca \"Rellenar asientos vacíos con bots\".",
mpHostHint:"Comparte el enlace y espera — tus amigos aparecen en la lista de abajo. Luego pulsa Empezar.",
mpRoomGone:"Sala no encontrada — revisa el código y que el anfitrión siga con la sala abierta.",
mpConnFail:"No se pudo conectar a la sala. Las redes móviles a veces bloquean conexiones directas — prueba el mismo Wi-Fi que el anfitrión y reintenta.",
mpJoined:n=>`${n} entró en la sala`,mpGone:n=>`${n} se desconectó — su mano se retira`,
mpYou:"(tú · anfitrión)",mpYouG:"(tú)",chatPh:"Mensaje…",
viewChart:"📊 Ver la tabla de esta posición",chartTitleOpen:"tabla de apertura",chartTitleIso:"tabla iso vs limps",chartTitleShove:"tabla de all-in",chartTitleFacing:"tabla contra esta subida",chartTitleBbDefend:"tabla defensa BB",chartTitleFourBet:"respuesta frente al 3-bet",
showRange:"📊 Mostrar rango rival",hideRange:"▴ Ocultar rango rival",viewRange:"🔎 Abrir el explorador de rangos interactivo",chartTitleRange:"rango estimado ahora mismo",legendRange:"manos que aún puede tener",rangeFringe:"Marginal",rangePossible:"Posible",rangeLikely:"Probable",rangeVeryLikely:"Muy probable",
rangeExplore:"Explorar rango",rangeFilter:"Mostrar",rangeFilterAll:"Todas las manos",rangeFilterMade:"Manos hechas",rangeFilterDraws:"Proyectos",rangeFilterNut:"Proyectos máximos",rangeFilterNonNut:"Proyectos no máximos",rangeFilterBackdoor:"Backdoors",rangeFilterAir:"Aire / faroles",rangePick:"Selecciona una clase de manos en la cuadrícula para entender por qué sigue siendo posible.",rangeCellShare:(h,p,a,c)=>`${h} representa aproximadamente el ${p}% de este rango rival. Quedan ponderados ${a} combo${a!==1?'s':''} exacto${a!==1?'s':''} de ${c} combinaciones de palos no bloqueadas.`,rangeCellDensity:n=>`Cada combo disponible de ${n} se pondera frente a un combo legal medio.`,rangeCellMix:"Qué forman actualmente estos combos",rangeUnavailable:"Esta clase de manos ya no tiene combinaciones ponderadas tras los bloqueadores y la línea de acción.",revExploreRange:"Explorar rango",
rangeDensity:"Probabilidad por combo",rangeClassProb:"Probabilidad de la clase",rangeEffective:"combos efectivos",rangeLine:"Línea de acciones",rangeTopCard:"Manos con la carta más alta",rangeTopHands:"Candidatos principales",rangeOpen:"Open",rangeOfRange:"del rango",rangeCombos:"combos disponibles",rangeAvgCombo:"la probabilidad media de un combo",
rangeComposition:"Distribución exacta",rangeFullHousePlus:"Full o mejor",rangeMadeFlushes:"Colores hechos",rangeStraights:"Escaleras",rangeTrips:"Tríos",rangeTwoPair:"Doble pareja",rangeOnePair:"Una pareja",rangeDrawOnly:"Solo proyecto",rangeAir:"Aire / posibles faroles",rangeBoardOnly:"Juega la mesa",
rangeDrawBreakdown:"Textura exacta de proyectos",rangeComboDraw:"Proyectos combinados",rangeNutFlushDraw:"Proyectos de color máximo",rangeNonNutFlushDraw:"Proyectos de color no máximo",rangeStraightDraw:"Proyectos de escalera",rangePairPlusDraw:"Pareja + proyecto",rangeBackdoorDraw:"Solo proyectos backdoor",
rangeWeightRaise:(d,x,h)=>d==='up'?`${h} gana peso (${x}× la media): la última acción agresiva encaja mejor con su valor o potencial de semifarol.`:d==='down'?`${h} pierde peso (${x}× la media): la acción agresiva encaja menos con esta clase que con manos fuertes y proyectos creíbles.`:`${h} queda cerca de su peso previo (${x}× la media) tras la última acción agresiva.`,
rangeWeightCall:(d,x,h)=>d==='up'?`${h} gana peso (${x}× la media): pagar encaja con su valor al showdown o la realización de su proyecto.`:d==='down'?`${h} pierde peso (${x}× la media): esta clase continúa menos que las igualadas fuertes y los proyectos rivales.`:`${h} queda cerca de su peso previo (${x}× la media) tras pagar.`,
rangeWeightCheck:(d,x,h)=>d==='up'?`${h} gana peso (${x}× la media): pasar encaja con su fuerza media o perfil de abandono.`:d==='down'?`${h} pierde peso (${x}× la media): pasar hace menos probables las versiones fuertes de esta clase.`:`${h} queda cerca de su peso previo (${x}× la media) tras pasar.`,
rangeWeightPrior:(d,x,h)=>`${h} pesa ${x}× un combo legal medio según posición, perfil y rango previo.`,
rangeBlockerImpact:n=>`Las cartas conocidas eliminan ${n} combo${n!==1?'s':''} exacto${n!==1?'s':''}.`,rangeActionRemoved:n=>`La línea de acción modelada reduce ${n} combo${n!==1?'s':''} no bloqueado${n!==1?'s':''} adicional${n!==1?'es':''} a peso cero.`,
rangeIso:"Subida de aislamiento",rangeSqueeze:"Squeeze",rangeLimp:"Limp",rangeOption:"Check gratis",rangeEntering:s=>`Rango al entrar en ${s} — el rival aún no ha actuado`,
legendOpen:"subir de primeras",legendShove:"ir all-in",legendFold:"retirarse",legendYou:"tu mano",legend3bet:"resubir (3-bet)",legendFourBet:"4-bet",legendCall:"igualar",
benchConfirm:"Simular 25 torneos completos de 9 jugadores donde un bot sigue SOLO los consejos del coach, para medir lo bueno que es de verdad. Tarda uno o dos minutos. ¿Lanzar?",
youWin:"¡Ganas el torneo!",playAgain:"Jugar de nuevo",
youWinSub:(n,h)=>`Sobreviviste a ${n} rivales en ${h} manos.`,
bustedTitle:p=>`Eliminado en ${p} lugar`,bustedSub:h=>`Aguantaste ${h} manos. ¿Otra vez?`,
evTotal:"📉 EV total perdido",deviations:"desviaciones",cleanGame:"Sin EV perdido frente al coach — ¡partida perfecta! 🎯",smallerLeaks:"fugas menores",
handNavP:"‹ mano",handNavN:"mano ›",streetNavP:"‹ calle",streetNavN:"calle ›",jumpHand:"Ir a la mano",jumpGo:"Ir",handNotFound:n=>`La mano n.º ${n} no está disponible en esta sesión.`,close:"Cerrar",replayTitle:"Repetición",
cfTitle:"Explorador contrafactual",cfSub:"Compara qué podría haber ocurrido en cada una de tus decisiones.",cfDecision:n=>`Decisión ${n}`,cfActual:"Elegiste",cfCoach:"Coach",cfBest:"EV máxima",cfEv:"EV estimada",cfLoss:"Diferencia con la mejor",cfCaptured:"Capturado en la mesa",cfEstimated:"Estimación reconstruida",
cfFoldWhy:"Retirarse no arriesga más fichas y tiene 0 EV adicional.",cfCheckWhy:eq=>`Pasar no cuesta nada, mantiene viva tu mano y realiza cerca del ${eq}% de equity sin aumentar el bote.`,cfCallWhy:(eq,need,amt)=>`Igualar invierte ${amt} con cerca de ${eq}% de equity utilizable frente al ${need}% necesario.`,cfRaiseWhy:(eq,amt)=>`Subir a ${amt} combina cerca de ${eq}% de equity con fold equity modelada cuando los rivales abandonan sus rangos débiles.`,cfAssumption:"La EV es orientativa, no una promesa: las cartas futuras y respuestas rivales siguen siendo inciertas.",
won:"ganó",foldedTag:"retirado",showdown:"showdown",fullHand:"Mano completa",preflop:"Pre-flop",flop:"Flop",turnSt:"Turn",riverSt:"River",noHands:"Aún no hay manos terminadas en esta partida.",
ord:n=>n+'º'}};
try{lang=localStorage.getItem('sg_poker_lang')||'en';}catch(e){}
if(!TR[lang])lang='en';
function T(k){return (TR[lang]&&TR[lang][k])!==undefined?TR[lang][k]:TR.en[k];}
function recWord(r){return r==='RAISE'?T('raiseW').toUpperCase():r==='ALLIN'?T('recALLIN'):(T('rec'+r)||r);}
function actWord(a){return (a==='raise'?T('raiseW'):T(a)||a).toUpperCase();}
const LEAK_ORDER=['pf_open','pf_face_raise','cbet_def','multiway','river_call'];
const LEAK_LABEL={pf_open:'leakPfOpen',pf_face_raise:'leakPfFace',cbet_def:'leakCbet',multiway:'leakMultiway',river_call:'leakRiver'};
function classifyLeakSpotRetro(d){
  if(d.spot) return d.spot;
  if(d.stage==='preflop') return d.action==='raise'?'pf_open':'pf_face_raise';
  if(d.stage==='river') return 'river_call';
  if(d.stage==='flop'||d.stage==='turn') return d.action==='call'?'cbet_def':'multiway';
  return 'other';
}
function aggregateLeaks(games){
  const tot={};
  for(const k of LEAK_ORDER) tot[k]={ev:0,n:0,airEv:0,airN:0};
  for(const g of games){
    for(const d of (g.decisions||[])){
      const spot=classifyLeakSpotRetro(d);
      if(!tot[spot]) continue;
      tot[spot].ev+=d.evLoss||0;
      tot[spot].n++;
      if(d.air){tot[spot].airEv+=d.evLoss||0;tot[spot].airN++;}
    }
  }
  let hist=[];
  try{hist=JSON.parse(localStorage.getItem('sg_poker_history')||'[]');}catch(e){}
  const hasDec=games.some(g=>(g.decisions||[]).length);
  if(!hasDec){
    for(const h of hist){
      if(h.mp) continue;
      for(const d of (h.myDecisions||[])){
        if(!d.evLoss||d.evLoss<=0) continue;
        const spot=classifyLeakSpotRetro(d);
        if(!tot[spot]) continue;
        tot[spot].ev+=d.evLoss;
        tot[spot].n++;
      }
    }
  }
  return tot;
}
function renderRevLeaks(games){
  const leaks=aggregateLeaks(games);
  const rows=LEAK_ORDER.map(k=>({k,...leaks[k]})).filter(r=>r.ev>0).sort((a,b)=>b.ev-a.ev);
  if(!rows.length) return `<p class="leak-none">${T('revLeaksNone')}</p>`;
  return `<h3 class="leak-h3">${T('revLeaksTitle')}</h3>`+
    rows.map(r=>{
      let sub='';
      if(r.k==='river_call'&&r.airN>0)
        sub=`<div class="leak-sub">${T('leakRiverAir')(r.airN)} · −${usd(r.airEv)} EV</div>`;
      return `<div class="leak-row"><div class="leak-main"><b>${T(LEAK_LABEL[r.k])}</b>`+
        `<span class="leak-meta">${r.n} ${T('deviations')}</span>${sub}</div>`+
        `<span class="leak-ev neg">−${usd(r.ev)}</span></div>`;
    }).join('');
}
let revDecisionSpot='all',revDecisionStreet='all',revDecisionPeriod='25';
function reviewDecisions(games){
  const out=[];
  games.forEach(g=>{
    (g.decisions||[]).forEach(d=>{
      if((d.evLoss||0)<=0)return;
      out.push({...d,spot:classifyLeakSpotRetro(d),game:g});
    });
  });
  return out;
}
function reviewFilteredGames(games){
  const lim=revDecisionPeriod==='all'?games.length:Number(revDecisionPeriod)||25;
  return games.slice(0,lim);
}
const IMPROVEMENT_STORE='sg_poker_improvement_v1';
const PLAN_LESSON_KEYS={
  pf_open:'planLessonPfOpen',pf_face_raise:'planLessonPfFace',cbet_def:'planLessonCbet',
  multiway:'planLessonMultiway',river_call:'planLessonRiver'
};
function loadImprovementProgress(){
  try{
    const value=JSON.parse(localStorage.getItem(IMPROVEMENT_STORE)||'{}');
    return value&&typeof value==='object'?value:{};
  }catch(e){return {};}
}
function recordImprovementPractice(spot,score,total){
  if(!LEAK_LABEL[spot]||!total)return;
  const progress=loadImprovementProgress();
  const attempts=Array.isArray(progress[spot])?progress[spot]:[];
  attempts.push({t:Date.now(),score:Math.max(0,Number(score)||0),total:Math.max(1,Number(total)||1)});
  progress[spot]=attempts.slice(-30);
  try{localStorage.setItem(IMPROVEMENT_STORE,JSON.stringify(progress));}catch(e){}
}
function adaptiveSpotAccuracy(rows,spot){
  const selected=rows.filter(d=>classifyLeakSpotRetro(d)===spot);
  return selected.length?Math.round(selected.filter(d=>d.followed===true).length/selected.length*100):null;
}
function adaptivePlanRows(games){
  const rows=analyticsSamples(games);
  const recentRows=analyticsSamples(games.slice(0,10));
  const previousRows=analyticsSamples(games.slice(10,20));
  const progress=loadImprovementProgress();
  return LEAK_ORDER.map(spot=>{
    const decisions=rows.filter(d=>classifyLeakSpotRetro(d)===spot);
    const mistakes=decisions.filter(d=>d.followed===false||(d.evLoss||0)>0);
    const ev=mistakes.reduce((sum,d)=>sum+(d.evLoss||0),0);
    const attempts=Array.isArray(progress[spot])?progress[spot]:[];
    const drillTotal=attempts.reduce((sum,a)=>sum+(Number(a.total)||0),0);
    const drillCorrect=attempts.reduce((sum,a)=>sum+(Number(a.score)||0),0);
    const gameCorrect=decisions.filter(d=>d.followed===true).length;
    const evidence=decisions.length+drillTotal;
    const mastery=evidence?Math.round((gameCorrect+drillCorrect)/evidence*100):0;
    const recent=adaptiveSpotAccuracy(recentRows,spot);
    const previous=adaptiveSpotAccuracy(previousRows,spot);
    const recentN=recentRows.filter(d=>classifyLeakSpotRetro(d)===spot).length;
    const previousN=previousRows.filter(d=>classifyLeakSpotRetro(d)===spot).length;
    const trend=recentN>=3&&previousN>=3?recent-previous:null;
    const latest=attempts.length?attempts[attempts.length-1]:null;
    return {spot,n:decisions.length,mistakes:mistakes.length,ev,evidence,mastery,trend,latest,
      priority:ev*2+mistakes.length*Math.max(1,100-mastery)};
  }).filter(r=>r.mistakes>0)
    .sort((a,b)=>b.priority-a.priority||b.ev-a.ev||a.mastery-b.mastery)
    .slice(0,3);
}
function renderReviewFocus(games){
  const rows=adaptivePlanRows(reviewFilteredGames(games));
  if(!rows.length)return `<div class="adaptive-plan"><h3 class="rev-section-title">🎯 ${T('planTitle')}</h3>`+
    `<p class="rev-section-sub">${T('planSub')}</p><div class="rev-empty">${T('planNoData')}</div></div>`;
  return `<div class="adaptive-plan"><h3 class="rev-section-title">🎯 ${T('planTitle')}</h3>`+
    `<p class="rev-section-sub">${T('planSub')}</p><div class="rev-focus">`+
    rows.map((r,i)=>{
      const practiceCount=practiceSavedSpots(r.spot).length;
      const status=r.mastery>=80?T('planStatusStrong'):r.mastery>=60?T('planStatusBuilding'):T('planStatusFocus');
      const trend=r.trend==null?'':r.trend>=5?T('planTrendUp')(r.trend):r.trend<=-5?T('planTrendDown')(Math.abs(r.trend)):T('planTrendFlat');
      return `<div class="rev-focus-card adaptive-plan-card"><div class="rev-focus-rank">${T('revFocusRank')(i+1)} · ${status}</div>`+
      `<b>${T(LEAK_LABEL[r.spot])}</b>`+
      `<div class="plan-mastery"><span>${T('planMastery')}</span><strong>${r.mastery}%</strong></div>`+
      `<div class="plan-progress"><i style="width:${r.mastery}%"></i></div>`+
      `<span class="plan-evidence">${T('planEvidence')(r.evidence)} · ${T(r.evidence>=10?'planReliable':'planEarly')}</span>`+
      `<p class="plan-lesson">${T(PLAN_LESSON_KEYS[r.spot])}</p>`+
      `<span>${T('revTimes')(r.mistakes)} · ${T('revAvgLoss')} −${usd(Math.round(r.ev/Math.max(r.mistakes,1)))}</span>`+
      `<span class="rev-focus-ev">−${usd(r.ev)} EV</span>`+
      (trend?`<span class="plan-trend ${r.trend>=5?'pos':r.trend<=-5?'neg':''}">${trend}</span>`:'')+
      (r.latest?`<span class="plan-last-drill">${T('planDrillResult')(r.latest.score,r.latest.total)}</span>`:'')+
      (practiceCount?`<button type="button" class="rev-practice-btn" data-practice-spot="${r.spot}" data-practice-source="adaptive">${T('revPractice')(practiceCount)}</button>`:'')+
      `</div>`;
    }).join('')+`</div></div>`;
}
function analyticsSamples(games){
  if(!games.length)return [];
  const ids=new Set(games.map(g=>String(g.gameId??'')));
  const hist=loadHandHistory();
  const rows=[];
  hist.forEach(h=>{
    if(ids.size&&!ids.has(String(h.gameId??'')))return;
    (h.myDecisions||[]).forEach(d=>rows.push({...d,gameId:h.gameId,hand:h.hand,t:h.t}));
  });
  if(rows.length)return rows;
  games.forEach(g=>(g.decisions||[]).forEach(d=>rows.push({...d,gameId:g.gameId,t:g.t})));
  return rows;
}
function analyticsAccuracy(rows){
  return rows.length?Math.round(rows.filter(d=>d.followed).length/rows.length*100):0;
}
function analyticsGroups(rows,keyFn,labelFn){
  const map={};
  rows.forEach(d=>{
    const key=keyFn(d);
    if(!key)return;
    const r=map[key]||(map[key]={key,label:labelFn(key),n:0,followed:0,ev:0});
    r.n++;if(d.followed)r.followed++;r.ev+=d.evLoss||0;
  });
  return Object.values(map).map(r=>({...r,accuracy:Math.round(r.followed/r.n*100)}));
}
function analyticsDepthKey(d){
  const bb=Number(d.stackBB);
  if(!Number.isFinite(bb)||bb<=0)return '';
  return bb<10?'under10':bb<25?'10to24':bb<50?'25to49':'50plus';
}
function analyticsDepthLabel(k){
  return k==='under10'?'< 10 BB':k==='10to24'?'10–24 BB':k==='25to49'?'25–49 BB':'50+ BB';
}
function analyticsPotLabel(k){
  return T(k==='unopened'?'potUnopened':k==='singleRaised'?'potSingle':k==='threeBet'?'potThreeBet':'potMultiway');
}
function analyticsTableSizeKey(d){
  const n=Number(d.tableSize);
  return n===2?'2':n===3?'3':n===4?'4':n===5?'5':n===6?'6max':n>=7?'fullRing':'';
}
function analyticsTableSizeLabel(k){
  return T(k==='2'?'tableHeadsUp':k==='3'?'tableThree':k==='4'?'tableFour':k==='5'?'tableFive':k==='6max'?'tableSixMax':'tableFullRing');
}
function renderAnalyticsDimension(title,rows){
  if(!rows.length)return '';
  return `<div class="rev-dim"><h4>${title}</h4>`+
    rows.sort((a,b)=>b.ev-a.ev||b.n-a.n).map(r=>`<div class="rev-dim-row"><span>${r.label}</span>`+
      `<small>${r.n} · ${r.accuracy}%</small><b class="${r.ev>0?'neg':''}">${r.ev>0?'−'+usd(r.ev):'$0'}</b></div>`).join('')+`</div>`;
}
function renderAdvancedAnalytics(games){
  const samples=analyticsSamples(games);
  if(!samples.length)return `<h3 class="rev-section-title">${T('analyticsTitle')}</h3><div class="rev-empty">${T('analyticsNoData')}</div>`;
  const positions=analyticsGroups(samples,d=>d.pos||'',k=>k);
  const streets=analyticsGroups(samples,d=>d.stage||'',reviewStreetLabel);
  const depths=analyticsGroups(samples,analyticsDepthKey,analyticsDepthLabel);
  const pots=analyticsGroups(samples,d=>d.potType||'',analyticsPotLabel);
  const tableSizes=analyticsGroups(samples,analyticsTableSizeKey,analyticsTableSizeLabel);
  const hasDimensions=positions.length||streets.length||depths.length||pots.length||tableSizes.length;
  const candidates=[...positions,...streets,...depths,...pots,...tableSizes];
  const worst=candidates.filter(r=>r.n>=3&&r.ev>0).sort((a,b)=>b.ev-a.ev)[0];
  const frequent=candidates.filter(r=>r.n>=5).sort((a,b)=>a.accuracy-b.accuracy||b.n-a.n)[0];
  const latestGames=games.slice(0,10),previousGames=games.slice(10,20);
  const latest=analyticsSamples(latestGames),previous=analyticsSamples(previousGames);
  const latestAcc=analyticsAccuracy(latest),previousAcc=analyticsAccuracy(previous);
  const delta=latest.length&&previous.length?latestAcc-previousAcc:0;
  const insights=[];
  if(worst)insights.push(T('analyticsWorst')(worst.label,usd(worst.ev),worst.n));
  if(frequent&&(!worst||frequent.key!==worst.key))insights.push(T('analyticsFrequent')(frequent.label,frequent.accuracy,frequent.n));
  if(delta>0)insights.push(T('analyticsTrendUp')(delta));
  else if(delta<0)insights.push(T('analyticsTrendDown')(Math.abs(delta)));
  return `<div class="rev-analytics"><h3 class="rev-section-title">${T('analyticsTitle')}</h3>`+
    `<p class="rev-section-sub">${T('analyticsSub')}</p>`+
    (insights.length?`<div class="rev-insights">${insights.slice(0,2).map(x=>`<div class="rev-insight">${x}</div>`).join('')}</div>`:'')+
    (latest.length&&previous.length?`<div class="rev-trend"><div class="rev-trend-block"><span>${T('analyticsPrevious')}</span><b>${previousAcc}%</b></div>`+
      `<span class="rev-trend-arrow">→</span><div class="rev-trend-block"><span>${T('analyticsRecent')}</span><b class="${delta>=0?'pos':'neg'}">${latestAcc}% ${delta?`(${delta>0?'+':''}${delta})`:''}</b></div></div>`:'')+
    (hasDimensions?`<div class="rev-dim-grid">${renderAnalyticsDimension(T('analyticsPosition'),positions)}${renderAnalyticsDimension(T('analyticsStreet'),streets)}`+
      `${renderAnalyticsDimension(T('analyticsDepth'),depths)}${renderAnalyticsDimension(T('analyticsPotType'),pots)}`+
      `${renderAnalyticsDimension(T('analyticsTableSize'),tableSizes)}</div>`:
      `<div class="rev-empty">${T('analyticsNoData')}</div>`)+
    `<p class="rev-sample-note">${T('analyticsSample')}</p></div>`;
}
function reviewStreetLabel(stage){
  return T(stage==='turn'?'turnSt':stage==='river'?'riverSt':stage)||stage;
}
function renderReviewDecisionTools(){
  const spotOptions=[['all',T('revAny')],...LEAK_ORDER.map(k=>[k,T(LEAK_LABEL[k])])];
  const streetOptions=[['all',T('revAny')],['preflop',T('preflop')],['flop',T('flop')],['turn',T('turnSt')],['river',T('riverSt')]];
  const periodOptions=[['10',T('revRecent10')],['25',T('revRecent25')],['all',T('revAny')]];
  const opts=(rows,current)=>rows.map(([v,l])=>`<option value="${v}"${v===current?' selected':''}>${l}</option>`).join('');
  return `<h3 class="rev-section-title">${T('revDecisionsTitle')}</h3><p class="rev-section-sub">${T('revDecisionsSub')}</p>`+
    `<div class="rev-controls"><label>${T('revSpot')}<select id="revSpotSel">${opts(spotOptions,revDecisionSpot)}</select></label>`+
    `<label>${T('revStreet')}<select id="revStreetSel">${opts(streetOptions,revDecisionStreet)}</select></label>`+
    `<label>${T('revPeriod')}<select id="revPeriodSel">${opts(periodOptions,revDecisionPeriod)}</select></label></div>`;
}
function openReviewDecision(d){
  const hands=replayHandsForGame(d.game);
  const idx=hands.findIndex(h=>Number(h.hand)===Number(d.hand));
  if(idx<0)return;
  rpAll=hands;rpHandIdx=idx;rpStreet=99;rpDecisionIdx=0;rpCfAction='';
  closeDialog($('reviewOv'));rpRender();openDialog($('replayOv'),'rpTitle');
}
function renderReviewDecisions(games){
  const rows=reviewDecisions(reviewFilteredGames(games))
    .filter(d=>revDecisionSpot==='all'||d.spot===revDecisionSpot)
    .filter(d=>revDecisionStreet==='all'||d.stage===revDecisionStreet)
    .sort((a,b)=>(b.evLoss||0)-(a.evLoss||0)).slice(0,20);
  if(!rows.length){
    $('revDecisions').innerHTML=`<div class="rev-empty">${T('revNoDecisions')}</div>`;
    return;
  }
  $('revDecisions').innerHTML=rows.map((d,i)=>{
    const label=LEAK_LABEL[d.spot]?T(LEAK_LABEL[d.spot]):reviewStreetLabel(d.stage);
    const when=new Date(d.game.t).toLocaleDateString();
    return `<div class="rev-decision"><div class="rev-decision-main"><div class="rev-decision-title">${label} · ${T('hand')}#${d.hand}</div>`+
      `<div class="rev-decision-meta">${when} · ${reviewStreetLabel(d.stage)} · ${T('coachSaid')} ${recWord(d.rec)} · ${T('youChose')} ${actWord(d.action)}</div></div>`+
      `<div class="rev-decision-actions"><span class="rev-decision-ev">−${usd(d.evLoss)} EV</span>`+
      (d.rangeSnapshots?.length?`<button type="button" class="rev-range-btn" data-range-decision="${i}">${T('revExploreRange')}</button>`:'')+
      `<button type="button" class="rev-hand-btn" data-decision="${i}">${T('revReplayHand')}</button></div></div>`;
  }).join('');
  $('revDecisions').querySelectorAll('.rev-hand-btn').forEach(btn=>{
    btn.onclick=()=>openReviewDecision(rows[Number(btn.dataset.decision)]);
  });
  $('revDecisions').querySelectorAll('.rev-range-btn').forEach(btn=>btn.onclick=()=>{
    const d=rows[Number(btn.dataset.rangeDecision)],ranges=d?.rangeSnapshots||[],info=ranges[0];
    if(info)showChartMatrix(info,d.heroCode||'',ranges);
  });
}
function wireReviewDecisionTools(games){
  const wirePractice=()=>$('revFocus').querySelectorAll('[data-practice-spot]').forEach(btn=>{
    btn.onclick=()=>startScenarioPractice(btn.dataset.practiceSpot,btn.dataset.practiceSource||'');
  });
  const rerender=()=>{
    $('revFocus').innerHTML=renderReviewFocus(games);
    wirePractice();
    renderReviewDecisions(games);
  };
  wirePractice();
  $('revSpotSel').onchange=e=>{revDecisionSpot=e.target.value;rerender();};
  $('revStreetSel').onchange=e=>{revDecisionStreet=e.target.value;rerender();};
  $('revPeriodSel').onchange=e=>{
    revDecisionPeriod=e.target.value;
    rerender();
  };
}
let practiceQueue=[],practiceIndex=0,practiceScore=0,practiceAnswered=false,practiceSource='',practiceSpot='';
function practiceSavedSpots(spot){
  const games=loadGames().filter(g=>!g.mp);
  const hist=loadHandHistory();
  const byGameHand=new Map();
  hist.forEach(h=>byGameHand.set(`${String(h.gameId??'')}:${Number(h.hand)||0}`,h));
  const rows=[],seen=new Set();
  games.forEach(g=>(g.decisions||[]).forEach(d=>{
    if(classifyLeakSpotRetro(d)!==spot)return;
    const hand=byGameHand.get(`${String(g.gameId??'')}:${Number(d.hand)||0}`);
    if(hand){
      const key=`${String(g.gameId??'')}:${Number(d.hand)||0}:${d.stage}:${d.rec}`;
      seen.add(key);rows.push({...d,spot,hand});
    }
  }));
  hist.slice().reverse().forEach(hand=>(hand.myDecisions||[]).forEach(d=>{
    if(classifyLeakSpotRetro(d)!==spot)return;
    const key=`${String(hand.gameId??'')}:${Number(hand.hand)||0}:${d.stage}:${d.rec}`;
    if(seen.has(key))return;
    seen.add(key);rows.push({...d,spot,hand});
  }));
  rows.sort((a,b)=>replayHandTime(b.hand)-replayHandTime(a.hand));
  return rows.slice(0,10);
}
function practiceBoardCount(stage){
  return stage==='flop'?3:stage==='turn'?4:stage==='river'?5:0;
}
function practiceCardGroup(codes,cls){
  return `<div class="${cls}">${(codes||[]).map(c=>cardHTML(parseCardCode(c),true)).join('')}</div>`;
}
function renderPracticeSpot(){
  const d=practiceQueue[practiceIndex];
  if(!d)return;
  practiceAnswered=false;
  $('practiceProgress').textContent=T('practiceProgress')(practiceIndex+1,practiceQueue.length);
  $('practiceNext').classList.add('hidden');
  const hero=d.hand.players&&d.hand.players[0];
  const board=(d.hand.board||[]).slice(0,practiceBoardCount(d.stage));
  const label=LEAK_LABEL[d.spot]?T(LEAK_LABEL[d.spot]):reviewStreetLabel(d.stage);
  const actions=['FOLD','CHECK','CALL','RAISE','ALLIN'];
  const facts=[
    d.pot!=null?`${T('practicePot')}: ${usd(d.pot)}`:'',
    d.callAmt!=null?`${T('practiceToCall')}: ${usd(d.callAmt)}`:'',
    d.opps!=null?`${T('practiceOpponents')}: ${d.opps}`:'',
    d.pos||''
  ].filter(Boolean).join(' · ');
  const priorActions=d.logIndex!=null?(d.hand.actions||[]).slice(0,d.logIndex).slice(-4):[];
  $('practiceBody').innerHTML=`<div class="practice-context"><div class="practice-spot">${label} · ${reviewStreetLabel(d.stage)}</div>`+
    `<div class="practice-cards">${practiceCardGroup(hero?.cards||[],'practice-hole')}<span class="practice-vs">vs</span>${practiceCardGroup(board,'practice-board')}</div>`+
    (facts?`<div class="rev-decision-meta" style="margin-top:10px">${facts}</div>`:'')+
    (priorActions.length?`<div class="rp-log" style="margin:10px 0 0">${priorActions.map(a=>`<div>${a}</div>`).join('')}</div>`:'')+
    `<div class="practice-prompt">${T('practicePrompt')}</div><div class="practice-actions">`+
    actions.map(a=>`<button type="button" data-practice-action="${a}">${recWord(a)}</button>`).join('')+`</div><div id="practiceResult"></div></div>`;
  $('practiceBody').querySelectorAll('[data-practice-action]').forEach(btn=>btn.onclick=()=>{
    if(practiceAnswered)return;
    practiceAnswered=true;
    const picked=btn.dataset.practiceAction;
    const correct=picked===d.rec;
    if(correct)practiceScore++;
    $('practiceBody').querySelectorAll('[data-practice-action]').forEach(b=>{
      b.disabled=true;
      if(b.dataset.practiceAction===d.rec)b.classList.add('correct');
    });
    if(!correct)btn.classList.add('wrong');
    const result=$('practiceResult');
    result.className=`practice-result ${correct?'good':'bad'}`;
    result.textContent=correct?T('practiceCorrect'):T('practiceWrong')(recWord(d.rec));
    $('practiceNext').textContent=practiceIndex===practiceQueue.length-1?T('practiceFinish'):T('practiceNext');
    $('practiceNext').classList.remove('hidden');
  });
}
function startScenarioPractice(spot,source=''){
  practiceQueue=practiceSavedSpots(spot);
  if(!practiceQueue.length)return;
  practiceIndex=0;practiceScore=0;practiceSource=source;practiceSpot=spot;
  $('practiceTitle').textContent=T('practiceTitle');
  $('practiceSub').textContent=T('practiceSub');
  $('practiceClose').textContent=T('practiceClose');
  closeDialog($('reviewOv'));
  renderPracticeSpot();
  openDialog($('practiceOv'),'practiceTitle');
}
function advanceScenarioPractice(){
  if(!practiceAnswered)return;
  if(practiceIndex<practiceQueue.length-1){
    practiceIndex++;renderPracticeSpot();return;
  }
  if(practiceSource==='adaptive')recordImprovementPractice(practiceSpot,practiceScore,practiceQueue.length);
  $('practiceProgress').textContent='';
  $('practiceBody').innerHTML=`<div class="practice-result good">${T('practiceDone')(practiceScore,practiceQueue.length)}`+
    (practiceSource==='adaptive'?`<div class="plan-practice-saved">${T('planPracticeSaved')}</div>`:'')+`</div>`;
  $('practiceNext').classList.add('hidden');
}
function scenarioCode(c){return `${RANK_CH[c.r]}${'shdc'[c.s]}`;}
function scenarioCardLabel(code){
  if(!code)return T('scEmptyCard');
  const c=parseCardCode(code);
  return `${RANK_CH[c.r]}${SUIT_CH[c.s]}`;
}
function scenarioRefreshCardSlot(slot){
  if(!slot)return;
  const code=slot.dataset.value||'';
  slot.textContent=code?scenarioCardLabel(code):'+';
  slot.classList.toggle('filled',!!code);
  slot.classList.toggle('red-card',/[hd]$/.test(code));
  slot.setAttribute('aria-label',code?scenarioCardLabel(code):T('scEmptyCard'));
}
let scenarioActiveCardSlot=null;
function scenarioUsedCardCodes(){
  return new Set([...document.querySelectorAll('.scenario-card-slot')].map(b=>b.dataset.value).filter(Boolean));
}
function scenarioOpenDeckPicker(slot){
  scenarioActiveCardSlot=slot;
  const used=scenarioUsedCardCodes(),current=slot.dataset.value||'',picker=$('scDeckPicker');
  picker.innerHTML=`<div class="scenario-deck-head"><span>${slot.closest('#scCards')?T('scCards'):T('scBoard')}</span><button type="button" aria-label="${T('close')}">×</button></div>`+
    `<div class="scenario-deck-grid">`+
    [0,1,2,3].flatMap(s=>[14,13,12,11,10,9,8,7,6,5,4,3,2].map(r=>{
      const code=scenarioCode({r,s}),disabled=used.has(code)&&code!==current;
      return `<button type="button" class="scenario-deck-card${s===1||s===2?' red-card':''}" data-card-code="${code}"${disabled?' disabled':''}>${scenarioCardLabel(code)}</button>`;
    })).join('')+
    `<button type="button" class="scenario-deck-empty" data-card-code="">${T('scEmptyCard')}</button></div>`;
  picker.classList.remove('hidden');
  picker.querySelector('.scenario-deck-head button').onclick=()=>picker.classList.add('hidden');
  picker.querySelectorAll('[data-card-code]').forEach(btn=>btn.onclick=()=>{
    slot.dataset.value=btn.dataset.cardCode||'';scenarioRefreshCardSlot(slot);picker.classList.add('hidden');
  });
}
function scenarioBuildCardPickers(){
  const build=(rootId,count,defaults)=>{
    const root=$(rootId);if(!root)return;
    if(!root.children.length){
      for(let i=0;i<count;i++){
        const slot=document.createElement('button');
        slot.type='button';slot.className='scenario-card-slot';slot.dataset.value=defaults[i]||'';
        slot.onclick=()=>scenarioOpenDeckPicker(slot);
        scenarioRefreshCardSlot(slot);root.appendChild(slot);
      }
    }else [...root.querySelectorAll('.scenario-card-slot')].forEach(scenarioRefreshCardSlot);
  };
  build('scCards',2,['As','Kh']);build('scBoard',5,[]);
}
function scenarioSelectedCards(rootId){
  return [...$(rootId).querySelectorAll('.scenario-card-slot')].map(s=>s.dataset.value||'').filter(Boolean);
}
function scenarioSetCards(rootId,codes){
  scenarioBuildCardPickers();
  [...$(rootId).querySelectorAll('.scenario-card-slot')].forEach((slot,i)=>{slot.dataset.value=codes[i]||'';scenarioRefreshCardSlot(slot);});
}
function scenarioRead(){
  const holeCodes=scenarioSelectedCards('scCards'),boardCodes=scenarioSelectedCards('scBoard');
  const hole=holeCodes.map(parseCardCode),board=boardCodes.map(parseCardCode);
  const all=hole.concat(board),unique=new Set(all.map(c=>c.r*4+c.s));
  const boardSlots=[...$('scBoard').querySelectorAll('.scenario-card-slot')].map(s=>s.dataset.value||'');
  const hasGap=boardSlots.some((v,i)=>!v&&boardSlots.slice(i+1).some(Boolean));
  if(hole.length!==2||![0,3,4,5].includes(board.length)||unique.size!==all.length||hasGap)return null;
  return {
    hole:hole.map(scenarioCode),board:board.map(scenarioCode),pos:$('scPos').value,
    opps:clamp(Math.round(Number($('scOpps').value)||1),1,5),
    stackBB:clamp(Number($('scStack').value)||100,2,300),
    pot:Math.max(1,Number($('scPot').value)||1),callAmt:Math.max(0,Number($('scCall').value)||0),
    profile:$('scProfile').value,gameType:$('scGame').value,previousAction:$('scAction').value
  };
}
function scenarioStage(s){return s.board.length===0?'preflop':s.board.length===3?'flop':s.board.length===4?'turn':'river';}
function scenarioAnalyzeData(s,sims=700){
  const hole=s.hole.map(parseCardCode),board=s.board.map(parseCardCode);
  const baseCap={rock:.22,station:.7,shark:.46,maniac:.82}[s.profile]||.5;
  const actionFactor={unopened:1,limp:1.12,raise:.78,threeBet:.48,cbet:.88,checkRaise:.38,allin:.24}[s.previousAction]||1;
  const cap=clamp(baseCap*actionFactor,.04,1);
  const floor={rock:0,station:0,shark:.015,maniac:.04}[s.profile]||0;
  const eq=mcEquityR(hole,board,Array.from({length:s.opps},()=>({cap,floor})),sims);
  const price=s.callAmt>0?s.callAmt/(s.pot+s.callAmt):0,stage=scenarioStage(s);
  const need=clamp(price+(s.opps>1?0.025:0)+((s.pos==='SB'||s.pos==='BB')?0.015:-0.005)+
    (s.gameType==='sng'&&s.stackBB<20?0.015:0),0,.95);
  let rec;
  if(stage==='preflop'){
    const code=holeCode(hole),rank=handPct[code]||1;
    const open={UTG:.14,HJ:.19,CO:.27,BTN:.45,SB:.52,BB:.6}[s.pos]||.22;
    if(s.stackBB<=12)rec=rank<=Math.min(open*1.15,.55)?'ALLIN':'FOLD';
    else rec=s.callAmt>0?(rank<=.08?'RAISE':eq>=need?'CALL':'FOLD'):(rank<=open?'RAISE':'FOLD');
  }else rec=s.callAmt>0?(eq>=.72?'RAISE':eq>=need?'CALL':'FOLD'):(eq>=.58?'RAISE':'CHECK');
  if(rec==='RAISE'&&s.stackBB<=8)rec='ALLIN';
  const confidence=stage==='preflop'
    ?{source:T('confidenceChart'),level:T('confidenceHigh'),kind:'chart'}
    :s.opps===1?{source:T('confidenceMath'),level:T('confidenceMedium'),kind:'simulation'}
    :{source:T('confidenceHeuristic'),level:T('confidenceLimited'),kind:'heuristic'};
  const e=Math.round(eq*100),n=Math.round(need*100);
  const reason=rec==='CALL'?T('scReasonCall')(e,n):rec==='FOLD'?T('scReasonFold')(e,n):(rec==='RAISE'||rec==='ALLIN')?T('scReasonRaise')(e):T('scReasonCheck')(e);
  return {rec,eq,price,need,confidence,reason,stage,hand:stage==='preflop'?holeCode(hole):handName(evalBest(hole.concat(board)))};
}
function scenarioShowError(text){
  const el=$('scenarioError');el.textContent=text;el.classList.toggle('hidden',!text);
}
let scenarioCurrent=null,scenarioCurrentResult=null;
function scenarioRenderResult(s,r){
  const actions=['FOLD','CHECK','CALL','RAISE','ALLIN'];
  $('scenarioResult').innerHTML=`<div class="scenario-result"><div class="scenario-result-head"><span>${T('scRecommendation')}</span><strong>${recWord(r.rec)}</strong></div>`+
    `<div class="scenario-metrics"><div class="scenario-metric"><span>${T('scEquity')}</span><b>~${Math.round(r.eq*100)}%</b></div>`+
    `<div class="scenario-metric"><span>${T('scPrice')}</span><b>${s.callAmt>0?Math.round(r.price*100)+'%':'—'}</b></div>`+
    `<div class="scenario-metric"><span>${T('scConfidence')}</span><b>${r.confidence.level}</b></div></div>`+
    `<p class="scenario-reason">${r.hand} · ${r.reason}</p><h4 style="margin-top:13px">${T('scPlay')}</h4>`+
    `<div class="scenario-play-actions">${actions.map(a=>`<button type="button" data-sc-action="${a}">${recWord(a)}</button>`).join('')}</div>`+
    `<div id="scPlayFeedback"></div><button id="scDrillBtn" type="button" class="rev-practice-btn">${T('scDrill')}</button></div>`;
  $('scenarioResult').querySelectorAll('[data-sc-action]').forEach(btn=>btn.onclick=()=>{
    const ok=btn.dataset.scAction===r.rec;
    $('scenarioResult').querySelectorAll('[data-sc-action]').forEach(b=>{b.disabled=true;if(b.dataset.scAction===r.rec)b.classList.add('correct');});
    if(!ok)btn.classList.add('wrong');
    $('scPlayFeedback').className=`practice-result ${ok?'good':'bad'}`;
    $('scPlayFeedback').textContent=ok?T('scCorrect'):T('scWrong')(recWord(r.rec));
  });
  $('scDrillBtn').onclick=()=>scenarioStartDrill(s);
}
function scenarioAnalyzeFromForm(){
  const s=scenarioRead();
  if(!s){scenarioShowError(T('scInvalid'));return null;}
  scenarioShowError('');scenarioCurrent=s;
  scenarioCurrentResult=scenarioAnalyzeData(s);
  scenarioRenderResult(s,scenarioCurrentResult);
  return s;
}
function scenarioStore(){
  try{return JSON.parse(localStorage.getItem('sg_poker_scenarios')||'[]');}catch(e){return [];}
}
function scenarioSave(){
  const s=scenarioRead();if(!s){scenarioShowError(T('scInvalid'));return;}
  const list=scenarioStore();list.unshift({...s,id:Date.now()});while(list.length>40)list.pop();
  localStorage.setItem('sg_poker_scenarios',JSON.stringify(list));scenarioShowError(T('scSavedOk'));scenarioRenderSaved();
}
function scenarioFill(s){
  scenarioSetCards('scCards',s.hole);scenarioSetCards('scBoard',s.board);$('scPos').value=s.pos;
  $('scOpps').value=s.opps;$('scStack').value=s.stackBB;$('scPot').value=s.pot;$('scCall').value=s.callAmt;
  $('scProfile').value=s.profile;$('scGame').value=s.gameType;$('scAction').value=s.previousAction||'unopened';scenarioShowError('');$('scenarioResult').innerHTML='';
}
function scenarioRenderSaved(){
  const list=scenarioStore();
  $('scenarioSaved').innerHTML=`<h3>${T('scSaved')}</h3>`+(list.length?list.map((s,i)=>
    `<div class="scenario-saved-row"><span>${s.hole.join(' ')} · ${s.board.join(' ')||'preflop'} · ${s.pos} · ${s.stackBB} BB</span>`+
    `<button type="button" data-sc-load="${i}">↗</button><button type="button" data-sc-del="${i}">×</button></div>`).join(''):
    `<p class="rev-section-sub">—</p>`);
  $('scenarioSaved').querySelectorAll('[data-sc-load]').forEach(b=>b.onclick=()=>scenarioFill(list[Number(b.dataset.scLoad)]));
  $('scenarioSaved').querySelectorAll('[data-sc-del]').forEach(b=>b.onclick=()=>{
    list.splice(Number(b.dataset.scDel),1);localStorage.setItem('sg_poker_scenarios',JSON.stringify(list));scenarioRenderSaved();
  });
}
function scenarioShare(){
  const s=scenarioRead();if(!s){scenarioShowError(T('scInvalid'));return;}
  const url=location.href.split('#')[0]+'#scenario='+btoa(JSON.stringify(s));
  navigator.clipboard?.writeText(url);scenarioShowError(T('scCopied'));
}
function scenarioStartDrill(s){
  const board=s.board.map(parseCardCode),used=new Set(board.map(c=>c.r*4+c.s)),deck=FULL_DECK.filter(c=>!used.has(c.r*4+c.s));
  practiceQueue=[];practiceSource='';practiceSpot='';
  for(let i=0;i<10;i++){
    const shuffled=shuffle(deck),hole=shuffled.slice(0,2).map(scenarioCode),variant={...s,hole};
    const r=scenarioAnalyzeData(variant,260);
    practiceQueue.push({rec:r.rec,stage:r.stage,spot:'other',pot:s.pot,callAmt:s.callAmt,opps:s.opps,pos:s.pos,
      hand:{players:[{cards:hole}],board:s.board,actions:[]}});
  }
  practiceIndex=0;practiceScore=0;
  $('practiceTitle').textContent=T('practiceTitle');$('practiceSub').textContent=T('practiceSub');$('practiceClose').textContent=T('practiceClose');
  closeDialog($('scenarioOv'));renderPracticeSpot();openDialog($('practiceOv'),'practiceTitle');
}
function openScenarioBuilder(){
  scenarioBuildCardPickers();
  $('scDeckPicker').classList.add('hidden');
  scenarioShowError('');$('scenarioResult').innerHTML='';
  try{
    const raw=location.hash.startsWith('#scenario=')?location.hash.slice(10):'';
    if(raw)scenarioFill(JSON.parse(atob(raw)));
  }catch(e){}
  scenarioRenderSaved();openDialog($('scenarioOv'),'scenarioTitle');
}
function showInstantLesson(text){
  if(!HAS_DOM||!text) return;
  const el=$('coachFeed');
  el.classList.remove('hidden');
  el.innerHTML=`<div class="lesson">💡 ${text}</div>`;
}


/* ================= UI ================= */
const $=id=>HAS_DOM?document.getElementById(id):null;
let _dlgFocus=null;
function dlgFocusables(root){
  return [...root.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')]
    .filter(el=>!el.disabled&&el.tabIndex!==-1&&!el.closest('.hidden'));
}
function openDialog(ov,labelId){
  if(!ov)return;
  if(ov.classList.contains('hidden')) _dlgFocus=document.activeElement;
  else if(ov._dlgKey){document.removeEventListener('keydown',ov._dlgKey);ov._dlgKey=null;}
  ov.classList.remove('hidden');
  ov.setAttribute('aria-hidden','false');
  ov.setAttribute('role','dialog');
  ov.setAttribute('aria-modal','true');
  if(labelId) ov.setAttribute('aria-labelledby',labelId);
  const onKey=e=>{
    if(e.key==='Escape'){closeDialog(ov);return;}
    if(e.key!=='Tab')return;
    const items=dlgFocusables(ov);
    if(!items.length)return;
    const first=items[0],last=items[items.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  };
  ov._dlgKey=onKey;
  document.addEventListener('keydown',onKey);
  const items=dlgFocusables(ov);
  if(items.length) items[0].focus();
}
function closeDialog(ov){
  if(!ov||ov.classList.contains('hidden'))return;
  ov.classList.add('hidden');
  ov.setAttribute('aria-hidden','true');
  ov.removeAttribute('role');
  ov.removeAttribute('aria-modal');
  ov.removeAttribute('aria-labelledby');
  if(ov._dlgKey){document.removeEventListener('keydown',ov._dlgKey);ov._dlgKey=null;}
  if(_dlgFocus&&typeof _dlgFocus.focus==='function'){_dlgFocus.focus();_dlgFocus=null;}
}
let logLines=[],nextTimer=null,prevBoardLen=0,coachRangeVisible=false;

function log(msg){
  logLines.push(msg);
  if(state&&state.handLog) state.handLog.push(msg);
  if(logLines.length>200)logLines.shift();
  if(!HAS_DOM||BENCH)return;
  const el=$('log');
  el.innerHTML=logLines.slice(-100).map(l=>`<div>${l}</div>`).join('');
  el.scrollTop=el.scrollHeight;
}
function showBanner(t){
  if(BENCH)return;
  if(!HAS_DOM)return;
  const b=$('banner');
  b.textContent=t;
  b.classList.remove('show');
  if(t){ void b.offsetWidth; b.classList.add('show'); }
}
const CHIP_DENOMS=[[5000,'#3d6bd6'],[1000,'#e8b64c'],[500,'#9b59b6'],[100,'#23262d'],[25,'#2e9e5b'],[5,'#c94f4c']];
function chipStackHTML(amount,small){
  if(!amount||amount<=0) return '';
  let rem=amount;
  const stacks=[];
  for(const [v,col] of CHIP_DENOMS){
    const n=Math.floor(rem/v); rem-=n*v;
    if(n>0) stacks.push([col,Math.min(n,8)]);
  }
  return `<div class="chipstack${small?' sm':''}">`+stacks.slice(0,4).map(([col,n])=>{
    let s='<div class="chipcol">';
    for(let i=0;i<n;i++) s+=`<div class="chip" style="--c:${col}"></div>`;
    return s+'</div>';
  }).join('')+'</div>';
}
function cardHTML(c,small,anim){
  const red=c.s===1||c.s===2;
  const cls = anim===true?' deal' : anim?' '+anim : '';
  const ix=`<div class="ix"><span>${RANK_CH[c.r]}</span><span class="si">${SUIT_CH[c.s]}</span></div>`;
  return `<div class="card${red?' red':''}${small?' small':''}${cls}">${ix}<div class="pip">${SUIT_CH[c.s]}</div><div class="ix flip"><span>${RANK_CH[c.r]}</span><span class="si">${SUIT_CH[c.s]}</span></div></div>`;
}
function backHTML(small,anim){ return `<div class="card back${small?' small':''}${anim?' deal':''}"></div>`; }
/* set innerHTML only when content actually changed (so CSS animations fire once) */
function setHTML(el,html){ if(el&&el.dataset.h!==html){el.innerHTML=html;el.dataset.h=html;} }

/* ---------- arcade reward UI ---------- */
let rewardToastTimer=0;
function rewardsEnabled(){return typeof getRewardState==='function';}
function rewardStateSafe(){try{return rewardsEnabled()?getRewardState():null;}catch(e){return null;}}
function rewardLevelProgress(rs){
  const cur=typeof rewardXpForLevel==='function'?rewardXpForLevel(rs.level):0;
  const next=typeof rewardXpForLevel==='function'?rewardXpForLevel(rs.level+1):cur+500;
  const pct=clamp((rs.xp-cur)/Math.max(1,next-cur)*100,0,100);
  return {cur,next,pct};
}
function rewardKindLabel(kind){
  return kind==='cardBack'?'Card backs'
    :kind==='avatarFrame'?'Avatar frames'
    :kind==='emotePack'?'Emote packs'
    :kind==='winFx'?'Win/KO animations'
    :kind==='soundPack'?'Sound packs'
    :'Table felt';
}
function rewardKindDescription(kind){
  return kind==='cardBack'?'Changes the design shown on face-down cards around the table.'
    :kind==='avatarFrame'?'Changes the border/glow around your player plate.'
    :kind==='emotePack'?'Changes the quick reactions available from the React button.'
    :kind==='winFx'?'Changes the visual punch for big wins, knockouts, and reward pops.'
    :kind==='soundPack'?'Changes all table and reward sounds, including cards, chips, actions, wins, XP, big pots, and KOs.'
    :'Changes the table surface theme behind the cards and seats.';
}
function rewardCosmeticEffect(kind,id){
  const txt={
    felt:{
      classic:'Default green table look.',
      midnight:'Cool blue midnight table theme.',
      emerald:'Brighter premium green felt.',
      royal:'Purple royal table theme.',
      lava:'Warm red lava table theme.',
      arctic:'Ice-blue arctic table theme.'
    },
    cardBack:{
      blue:'Default blue face-down card backs.',
      gold:'Gold face-down card backs.',
      red:'Red face-down card backs.',
      black:'Black face-down card backs.',
      carbon:'Dark carbon-style card backs.',
      platinum:'Light platinum card backs.'
    },
    avatarFrame:{
      plain:'Default player plate border.',
      neon:'Green neon glow around your seat.',
      champion:'Gold champion glow around your seat.',
      diamond:'Blue diamond-style glow around your seat.',
      crown:'Bright crown-style glow around your seat.'
    },
    emotePack:{
      classic:'Basic table reaction emojis.',
      hype:'Bigger celebration and hype reactions.',
      elite:'Premium trophy and focus reactions.',
      legend:'High-roller reaction set.'
    },
    winFx:{
      classic:'Default reward toast and chip burst.',
      fireworks:'More glow and extra chip burst on wins.',
      goldRush:'Stronger gold glow and bigger chip burst.',
      neonBurst:'Blue/green neon reward glow.',
      jackpot:'Largest casino-style reward glow.'
    },
    soundPack:{
      classic:'Default table and reward sound set.',
      arcade:'Brighter arcade-style cards, actions, wins, and reward sounds.',
      retro:'Old-school square-wave soundscape across the whole game.',
      casino:'Higher casino-style table sounds and reward chimes.'
    }
  };
  return txt[kind]?.[id]||'Cosmetic-only unlock; it never changes poker odds.';
}
function rewardNextUnlockText(){
  if(typeof getNextRewardUnlock!=='function')return '';
  const n=getNextRewardUnlock();
  return n?`Next L${n.level}: ${n.label}`:'All unlocks claimed';
}
function renderRewardTop(){
  if(!HAS_DOM)return;
  const el=$('tRewards'); if(!el||!rewardsEnabled())return;
  const rs=rewardStateSafe(); if(!rs){el.textContent='';return;}
  const p=rewardLevelProgress(rs);
  const next=typeof getNextRewardUnlock==='function'?getNextRewardUnlock():null;
  el.setAttribute('aria-label','Open rewards room');
  el.innerHTML=`<span class="reward-icon">🏆</span><span>Rewards</span> <b>Lv ${rs.level}</b> <span class="reward-pct">${Math.round(p.pct)}%</span>${next?` <span class="reward-next">Next L${next.level}</span>`:''}<span class="reward-cta">Open ›</span>`;
  el.title=next?`Open rewards room · Next level ${next.level}: ${next.label}`:'Open rewards room · All unlocks claimed';
}
function rewardSummaryLine(summary){
  if(!summary||summary.duplicate||(!summary.xp&&!summary.missions?.length&&!summary.records?.length&&!summary.unlocks?.length&&!summary.trophies?.length&&!summary.koBonus))return '';
  const bits=[];
  if(summary.koBonus)bits.push(`<b>KO bonus +${usd(summary.koBonus)}</b>`);
  if(summary.xp)bits.push(`<b>+${summary.xp} XP</b>`);
  if(summary.missions&&summary.missions.length)bits.push(`${summary.missions.length} mission${summary.missions.length>1?'s':''}`);
  if(summary.records&&summary.records.length)bits.push(`${summary.records.length} record${summary.records.length>1?'s':''}`);
  if(summary.trophies&&summary.trophies.length)bits.push(`${summary.trophies.length} troph${summary.trophies.length>1?'ies':'y'}`);
  if(summary.unlocks&&summary.unlocks.length)bits.push(`${summary.unlocks.length} unlock${summary.unlocks.length>1?'s':''}`);
  return `<div class="reward-line">Arcade rewards: ${bits.join(' · ')}</div>`;
}
function renderRewardReview(){
  const rs=rewardStateSafe(); if(!rs)return '';
  const p=rewardLevelProgress(rs);
  const active=(globalThis.REWARD_MISSIONS||[]).map(def=>{
    const m=rs.missions[def.id]||{progress:0,goal:def.goal};
    return `${def.label}: ${Math.min(m.progress,m.goal)}/${m.goal}`;
  }).slice(0,2).join(' · ');
  return `<div class="reward-review"><b>Arcade rewards</b>`+
    `<div class="rr-row"><span>Level ${rs.level}</span><span>${rs.xp} XP</span></div>`+
    `<div class="reward-bar" style="margin:8px 0 6px;"><i style="width:${p.pct}%"></i></div>`+
    `<div>${rewardNextUnlockText()}</div>`+
    `<div style="margin-top:4px;">${active}</div></div>`;
}
function renderRewardEndSummary(summary){
  const rs=rewardStateSafe(); if(!rs)return '';
  const parts=[];
  if(summary&&summary.koBonus)parts.push(`KO bonus +${usd(summary.koBonus)}`);
  if(summary&&summary.xp)parts.push(`+${summary.xp} XP`);
  if(summary&&summary.missions&&summary.missions.length)parts.push(`${summary.missions.length} mission${summary.missions.length>1?'s':''}`);
  if(summary&&summary.trophies&&summary.trophies.length)parts.push(`${summary.trophies.length} troph${summary.trophies.length>1?'ies':'y'}`);
  if(summary&&summary.unlocks&&summary.unlocks.length)parts.push(`Unlocked ${summary.unlocks.map(u=>u.label).join(', ')}`);
  if(summary&&summary.records&&summary.records.length)parts.push(`${summary.records.length} record${summary.records.length>1?'s':''}`);
  return `<div class="reward-review"><b>Arcade reward payout</b>`+
    `<div class="rr-row"><span>Level ${rs.level}</span><span>${rs.xp} XP</span></div>`+
    `<div style="margin-top:7px;color:var(--text);">${parts.length?parts.join(' · '):'Progress saved'}</div>`+
    `<div style="margin-top:5px;">${rewardNextUnlockText()}</div></div>`;
}
function renderRewardsRoom(){
  if(!HAS_DOM||!rewardsEnabled())return;
  const rs=rewardStateSafe(); if(!rs)return;
  const p=rewardLevelProgress(rs);
  const missions=(globalThis.REWARD_MISSIONS||[]).map(def=>{
    const m=rs.missions[def.id]||{progress:0,goal:def.goal,complete:false,claimed:false};
    const done=m.complete||m.progress>=m.goal;
    return `<div class="reward-row${done?' done':''}"><div><b>${def.label}</b><span>${Math.min(m.progress,m.goal)} / ${m.goal}${done?' · complete':''}</span></div><b>${done?'+'+def.xp+' XP':Math.round(m.progress/m.goal*100)+'%'}</b></div>`;
  }).join('');
  const catalog=globalThis.REWARD_COSMETICS||{};
  const cosmetics=Object.keys(catalog).map(kind=>{
    const unlocked=rs.unlockedCosmetics&&rs.unlockedCosmetics[kind]||[];
    const equipped=rs.equippedCosmetics&&rs.equippedCosmetics[kind];
    const rows=(catalog[kind]||[]).map(c=>{
      const has=unlocked.includes(c.id);
      const on=equipped===c.id;
      const status=has?'Unlocked':'Unlocks at level '+c.level;
      const btnClass=on?' on':has?' available':' locked';
      const label=on?'Active':has?'Use':'Locked';
      const aria=on?`${c.label} is active`:has?`Use ${c.label}`:`${c.label} unlocks at level ${c.level}`;
      return `<div class="reward-row"><div><b>${c.label}</b><span>${rewardCosmeticEffect(kind,c.id)}</span><span class="reward-status">${status}</span></div>`+
        `<button type="button" class="reward-equip${btnClass}" data-reward-kind="${kind}" data-reward-id="${c.id}" aria-label="${aria}" ${has?'':'disabled'}><span>${label}</span></button></div>`;
    }).join('');
    return `<div class="reward-panel"><h3>${rewardKindLabel(kind)}</h3><p class="reward-help">${rewardKindDescription(kind)}</p>${rows}</div>`;
  }).join('');
  const trophies=(globalThis.REWARD_TROPHIES||[]).map(t=>{
    const got=rs.trophies&&rs.trophies[t.id]&&rs.trophies[t.id].done;
    return `<div class="reward-row${got?' done':''}"><div><b>${got?'✓ ':'□ '}${t.label}</b><span>${t.desc||''}</span></div><span>${got?'Done':'Locked'}</span></div>`;
  }).join('');
  const records=rs.records||{};
  $('rewardBody').innerHTML=
    `<div class="reward-grid">`+
      `<div class="reward-panel wide"><h3>Progress</h3>`+
        `<p class="reward-help">Rewards are cosmetic only: they change table look, reactions, animations, and sounds. They never change cards, odds, or AI behavior.</p>`+
        `<div class="reward-kv"><span>Level</span><b>${rs.level}</b></div>`+
        `<div class="reward-kv"><span>XP</span><b>${rs.xp} / ${p.next}</b></div>`+
        `<div class="reward-bar" style="margin:10px 0;"><i style="width:${p.pct}%"></i></div>`+
        `<div class="reward-kv"><span>${rewardNextUnlockText()}</span><b>${Math.max(0,p.next-rs.xp)} XP left</b></div>`+
      `</div>`+
      `<div class="reward-panel"><h3>Daily missions</h3>${missions}</div>`+
      `<div class="reward-panel"><h3>Trophy room</h3>${trophies}</div>`+
      `<div class="reward-panel wide"><h3>Records</h3>`+
        `<div class="reward-kv"><span>Biggest pot</span><b>${records.biggestPot?usd(records.biggestPot):'—'}</b></div>`+
        `<div class="reward-kv"><span>Best finish</span><b>${records.bestFinish?'#'+records.bestFinish:'—'}</b></div>`+
        `<div class="reward-kv"><span>Max KOs in one game</span><b>${records.maxKosInGame||0}</b></div>`+
        `<div class="reward-kv"><span>Tournament wins</span><b>${records.tournamentWins||0}</b></div>`+
      `</div>`+
      cosmetics+
    `</div>`;
  $('rewardBody').querySelectorAll('[data-reward-kind]').forEach(btn=>{
    btn.onclick=()=>{
      if(typeof equipCosmetic==='function'&&equipCosmetic(btn.dataset.rewardKind,btn.dataset.rewardId)){
        if(btn.dataset.rewardKind==='soundPack'&&typeof sfx==='function')sfx('preview');
        applyRewardCosmetics();
        renderRewardTop();
        renderRewardsRoom();
      }
    };
  });
}
function showRewardsRoom(){
  renderRewardsRoom();
  openDialog($('rewardOv'),'rewardTitle');
}
function rewardReducedMotion(){
  return !!(HAS_DOM&&window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}
function rewardBurst(summary){
  if(!HAS_DOM||rewardReducedMotion()||typeof flyChips!=='function'||!state)return;
  const seat=$('seat0'), felt=$('felt'); if(!seat||!felt)return;
  const c=feltCenter();
  const tx=seat.offsetLeft+seat.offsetWidth/2, ty=seat.offsetTop+seat.offsetHeight/2;
  const rs=rewardStateSafe();
  const fx=rs&&rs.equippedCosmetics?rs.equippedCosmetics.winFx:'classic';
  const mult=fx==='goldRush'?1.7:fx==='fireworks'?1.35:1;
  const base=summary.koBonus?22:summary.winTier==='monster'?16:summary.winTier==='big'?10:summary.koCount?12:summary.levelAfter>summary.levelBefore?14:0;
  const count=Math.round(base*mult);
  if(count) flyChips(c.x,c.y+4,tx,ty,count,0);
}
function showRewardToast(summary){
  if(!HAS_DOM||!summary||summary.duplicate)return;
  const el=$('rewardToast');
  if(!el||(!summary.xp&&!summary.toasts?.length&&!summary.unlocks?.length&&!summary.records?.length&&!summary.trophies?.length&&!summary.koBonus))return;
  const koBonus=Math.max(0,Number(summary.koBonus)||0);
  const koNames=(summary.koNames||[]).filter(Boolean).join(', ');
  const title=koBonus?'KO bonus collected':
    summary.levelAfter>summary.levelBefore?`Level ${summary.levelAfter}`:
    summary.winTier==='monster'?'Monster pot':
    summary.winTier==='big'?'Big pot':
    summary.koCount?'Knockout':
    summary.trophies?.length?'Trophy unlocked':
    summary.unlocks?.length?'New unlock':
    summary.missions?.length?'Mission complete':'Arcade rewards';
  const sub=koBonus
    ? `${summary.koCount||1} elimination${(summary.koCount||1)>1?'s':''}${koNames?` · ${koNames}`:''}`
    : (summary.toasts||[]).filter(Boolean).slice(0,2).join(' · ');
  el.classList.toggle('ko-bonus',!!koBonus);
  el.innerHTML=`<div class="rt-title">${title}</div>${sub?`<div class="rt-sub">${sub}</div>`:''}${koBonus?`<div class="rt-bonus">+${usd(koBonus)}</div>`:''}${summary.xp?`<div class="rt-xp">+${summary.xp} XP</div>`:''}`;
  el.classList.remove('hidden','show');
  void el.offsetWidth;
  el.classList.add('show');
  clearTimeout(rewardToastTimer);
  rewardToastTimer=setTimeout(()=>el.classList.add('hidden'),3200);
  if(koBonus){sfx('bounty');haptic([20,30,20,45,20]);setTimeout(()=>showBanner(`KO BONUS +${usd(koBonus)}`),180);}
  else if(summary.levelAfter>summary.levelBefore){sfx('levelup');haptic([18,40,18,40,18]);setTimeout(()=>showBanner(`LEVEL ${summary.levelAfter}`),180);}
  else if(summary.winTier==='monster'||summary.winTier==='big'){sfx('bigwin');haptic([16,28,16]);setTimeout(()=>showBanner(summary.winTier==='monster'?'MONSTER POT':'BIG POT'),180);}
  else if(summary.koCount){sfx('ko');haptic([20,35,20]);setTimeout(()=>showBanner('KNOCKOUT'),180);}
  else if(summary.xp>0){sfx('xp');haptic(10);}
  rewardBurst(summary);
}
function applyRewardCosmetics(){
  if(!HAS_DOM)return;
  const rs=rewardStateSafe(); if(!rs)return;
  const cls=[
    'felt-midnight','felt-emerald','felt-royal','felt-lava','felt-arctic',
    'cardback-gold','cardback-red','cardback-black','cardback-carbon','cardback-platinum',
    'frame-neon','frame-champion','frame-diamond','frame-crown',
    'winfx-fireworks','winfx-goldRush','winfx-neonBurst','winfx-jackpot',
    'soundpack-arcade','soundpack-retro','soundpack-casino'
  ];
  document.body.classList.remove(...cls);
  const eq=rs.equippedCosmetics||{};
  if(eq.felt&&eq.felt!=='classic')document.body.classList.add('felt-'+eq.felt);
  if(eq.cardBack&&eq.cardBack!=='blue')document.body.classList.add('cardback-'+eq.cardBack);
  if(eq.avatarFrame&&eq.avatarFrame!=='plain')document.body.classList.add('frame-'+eq.avatarFrame);
  if(eq.winFx&&eq.winFx!=='classic')document.body.classList.add('winfx-'+eq.winFx);
  if(eq.soundPack&&eq.soundPack!=='classic')document.body.classList.add('soundpack-'+eq.soundPack);
  renderEmoteButtons();
}
function handleRewardEvent(summary){
  applyRewardCosmetics();
  renderRewardTop();
  if(HAS_DOM&&$('rewardOv')&&!$('rewardOv').classList.contains('hidden'))renderRewardsRoom();
  showRewardToast(summary);
}
if(HAS_DOM) globalThis.__onRewardEvent=handleRewardEvent;

function buildSeats(){
  if(!HAS_DOM)return;
  document.body.classList.toggle('few',state.players.length<=6);
  const felt=$('felt');
  felt.querySelectorAll('.seat,.betchip').forEach(e=>e.remove());
  for(const p of state.players){
    const seat=document.createElement('div');
    seat.className='seat'+(p.isHuman?' human':''); seat.id='seat'+p.i;
    seat.innerHTML=`<div class="hole" id="hole${p.i}"></div>
      <div class="plate"><span class="avatar">${p.avatar}</span><div><div class="pname">${p.name}<span class="ppos" id="pos${p.i}"></span></div><div class="pchips" id="chips${p.i}"></div>${p.style?`<div class="pstyle">${profileLabel(p.style)}</div>`:''}</div></div>
      <div class="lastact" id="act${p.i}"></div>
      <div class="tmr" id="tmr${p.i}"></div>`;
    felt.appendChild(seat);
    const bet=document.createElement('div');
    bet.className='betchip hidden'; bet.id='bet'+p.i;
    felt.appendChild(bet);
  }
  layoutSeats();
}
function countSeatOverlaps(gap){
  gap=gap??2;
  const rects=[];
  for(const p of state.players){
    const s=$('seat'+p.i);
    if(s&&s.offsetHeight) rects.push(elementRectFelt(s));
  }
  let n=0;
  for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++)
    if(boxOverlap(rects[i],rects[j],gap)) n++;
  return n;
}
/* Equal arc-length samples on an ellipse (hero at bottom = π/2) */
function ovalArcAngles(rx,ry,n){
  const steps=720,dt=2*Math.PI/steps;
  const cum=new Float64Array(steps+1);
  let total=0;
  for(let k=1;k<=steps;k++){
    const t=k*dt;
    total+=Math.hypot(rx*Math.sin(t),ry*Math.cos(t))*dt;
    cum[k]=total;
  }
  const findT=(s)=>{
    s=((s%total)+total)%total;
    let lo=0,hi=steps;
    while(lo<hi-1){
      const m=(lo+hi)>>1;
      if(cum[m]<s) lo=m; else hi=m;
    }
    const seg=cum[lo+1]-cum[lo]||1;
    return (lo+(s-cum[lo])/seg)*dt;
  };
  const startS=cum[Math.round((Math.PI/2)/dt)];
  const heroIdx=state.players.findIndex(p=>p.isHuman);
  const pinAt=heroIdx>=0?heroIdx:0;
  const angs=new Array(n);
  for(let i=0;i<n;i++){
    const playerIdx=(pinAt+i)%n;
    angs[playerIdx]=findT(startS+total*i/n);
  }
  return angs;
}
function placeOvalAngles(angs,rx,ry,cx,cy,lift){
  for(let k=0;k<angs.length;k++){
    const p=state.players[k], seat=$('seat'+p.i);
    if(seat){
      seat.style.left=(cx+rx*Math.cos(angs[k]))+'px';
      seat.style.top=(cy+ry*Math.sin(angs[k])-lift)+'px';
    }
  }
}
function ovalSeatsFit(W,H,pad,overlapGap){
  if(countLayoutOverlaps(overlapGap)>0) return false;
  return ovalSeatsInBounds(W,H,pad);
}
function ovalSeatsInBounds(W,H,pad){
  for(const p of state.players){
    const s=$('seat'+p.i);
    if(!s||!s.offsetHeight) continue;
    const r=elementRectSeatLayout(s);
    if(r.l<pad.l||r.t<pad.t||r.r>W-pad.r||r.b>H-pad.b) return false;
  }
  return true;
}
function resolveOvalAngles(angs,rx,ry,cx,cy,lift,overlapGap){
  const n=angs.length;
  const heroIdx=state.players.findIndex(p=>p.isHuman);
  const pinAt=heroIdx>=0?heroIdx:-1;
  const minHalf=Math.PI/n*0.52;
  for(let iter=0;iter<80;iter++){
    let moved=false;
    for(let i=0;i<n;i++) for(let j=i+1;j<n;j++){
      const si=$('seat'+state.players[i].i), sj=$('seat'+state.players[j].i);
      if(!si||!sj||!si.offsetHeight) continue;
      if(!boxOverlap(elementRectSeatLayout(si),elementRectSeatLayout(sj),overlapGap)) continue;
      const half=Math.max(minHalf,Math.abs(angs[i]-angs[j])/2+0.04);
      if(pinAt>=0&&(i===pinAt||j===pinAt)){
        const other=i===pinAt?j:i;
        const d=angs[other]-angs[pinAt];
        angs[other]=angs[pinAt]+(d>=0?1:-1)*half*2;
        moved=true;
        continue;
      }
      const mid=(angs[i]+angs[j])/2;
      angs[i]=mid-half; angs[j]=mid+half;
      moved=true;
    }
    if(!moved) break;
    placeOvalAngles(angs,rx,ry,cx,cy,lift);
  }
}
function nudgeLayoutOverlaps(overlapGap){
  const n=state.players.length;
  const pinAt=state.players.findIndex(p=>p.isHuman);
  for(let iter=0;iter<24;iter++){
    let moved=false;
    for(let i=0;i<n;i++) for(let j=i+1;j<n;j++){
      const si=$('seat'+state.players[i].i), sj=$('seat'+state.players[j].i);
      if(!si||!sj||!si.offsetHeight) continue;
      const a=elementRectSeatLayout(si), b=elementRectSeatLayout(sj);
      if(!boxOverlap(a,b,overlapGap)) continue;
      const ox=Math.min(a.r,b.r)-Math.max(a.l,b.l);
      const oy=Math.min(a.b,b.b)-Math.max(a.t,b.t);
      if(ox<=0||oy<=0) continue;
      let ax=0,ay=0;
      if(ox<=oy){const dir=a.cx<b.cx?-1:1;ax=dir*(ox/2+2);}
      else{const dir=a.cy<b.cy?-1:1;ay=dir*(oy/2+2);}
      if(pinAt>=0&&(i===pinAt||j===pinAt)){
        const other=i===pinAt?sj:si;
        const lo=parseFloat(other.style.left)||0,to=parseFloat(other.style.top)||0;
        other.style.left=(lo+ax)+'px'; other.style.top=(to+ay)+'px';
        moved=true;
        continue;
      }
      const li=parseFloat(si.style.left)||0,ti=parseFloat(si.style.top)||0;
      const lj=parseFloat(sj.style.left)||0,tj=parseFloat(sj.style.top)||0;
      si.style.left=(li-ax)+'px'; si.style.top=(ti-ay)+'px';
      sj.style.left=(lj+ax)+'px'; sj.style.top=(tj+ay)+'px';
      moved=true;
    }
    if(!moved) break;
  }
}
function clampSeatLayout(s,W,H,pad){
  const r=elementRectSeatLayout(s);
  let dx=0,dy=0;
  if(r.l<pad.l) dx=pad.l-r.l;
  else if(r.r>W-pad.r) dx=W-pad.r-r.r;
  if(r.t<pad.t) dy=pad.t-r.t;
  else if(r.b>H-pad.b) dy=H-pad.b-r.b;
  if(dx||dy){
    s.style.left=((parseFloat(s.style.left)||0)+dx)+'px';
    s.style.top=((parseFloat(s.style.top)||0)+dy)+'px';
  }
}
/* Push seats out of the central pot/board zone, radially away from table center.
   The top seat rises, the bottom drops, the sides spread — pot/board stay centered & clear. */
function resolveCenterClearance(W,H,cx,cy,cBox,pad,overlapGap){
  if(!cBox||!cBox.w)return;
  const mX=10,mY=8;
  const ezL=cBox.x-cBox.w/2-mX, ezR=cBox.x+cBox.w/2+mX;
  const ezT=cBox.y-cBox.h/2-mY, ezB=cBox.y+cBox.h/2+mY;
  for(const p of state.players){
    if(p.isHuman) continue;            // hero is pinned bottom-center
    const s=$('seat'+p.i); if(!s||!s.offsetHeight) continue;
    for(let guard=0;guard<24;guard++){
      const r=elementRectSeatLayout(s);
      const ox=Math.min(r.r,ezR)-Math.max(r.l,ezL);
      const oy=Math.min(r.b,ezB)-Math.max(r.t,ezT);
      if(ox<=0||oy<=0) break;
      let dx=r.cx-cx, dy=r.cy-cy;
      if(Math.abs(dx)<1&&Math.abs(dy)<1) dy=-1;   // dead-center → push up
      const L=Math.hypot(dx,dy)||1; dx/=L; dy/=L;
      const step=Math.min(ox,oy)+3;
      s.style.left=((parseFloat(s.style.left)||0)+dx*step)+'px';
      s.style.top=((parseFloat(s.style.top)||0)+dy*step)+'px';
    }
    clampSeatLayout(s,W,H,pad);
  }
  nudgeLayoutOverlaps(overlapGap);
}
/* Uniform oval: equal arc-length spacing + angular overlap spread (no edge clamp stacking) */
function layoutOvalSeats(felt,W,H,cx,cy){
  const fl=document.body.classList.contains('fl');
  const lls=document.body.classList.contains('lls');
  const compact=fl||lls;
  const n=state.players.length;
  const pad={l:8,r:8,t:8,b:6};
  if(document.body.classList.contains('act-panel-open')&&useLandscapePanel()) pad.r=56;
  const overlapGap=compact?1:2;
  felt.style.setProperty('--seatScale','1');
  let sW=118,sH=48;
  for(const p of state.players){
    const s=$('seat'+p.i);
    if(s&&s.offsetHeight){sW=Math.max(sW,s.offsetWidth);sH=Math.max(sH,s.offsetHeight);}
  }
  const lift=compact?14:28;
  const maxRx=(W-sW)/2-pad.l, maxRy=(H-sH)/2-pad.t;
  let rx=Math.min(compact?W*0.42:W*0.41,Math.max(50,maxRx));
  let ry=Math.min(compact?H*0.42:H*0.40,Math.max(compact?32:50,maxRy));
  /* phone landscape (native lls + rotated-portrait fl): flatter oval + lower center
     so the top seats clear the edge instead of crowding it */
  if(compact&&W>H&&n<=6){
    ry=Math.min(ry,H*0.34);
    cy=H*0.53;
  }
  let angs=ovalArcAngles(rx,ry,n);
  placeOvalAngles(angs,rx,ry,cx,cy,lift);
  resolveOvalAngles(angs,rx,ry,cx,cy,lift,overlapGap);
  for(let i=0;i<14&&!ovalSeatsFit(W,H,pad,overlapGap);i++){
    resolveOvalAngles(angs,rx,ry,cx,cy,lift,overlapGap);
    if(ovalSeatsFit(W,H,pad,overlapGap)) break;
    rx=Math.min(maxRx,rx*1.035);
    ry=Math.min(maxRy,ry*1.035);
    angs=ovalArcAngles(rx,ry,n);
    placeOvalAngles(angs,rx,ry,cx,cy,lift);
    resolveOvalAngles(angs,rx,ry,cx,cy,lift,overlapGap);
  }
  for(let i=0;i<16&&!ovalSeatsInBounds(W,H,pad);i++){
    rx*=0.97; ry*=0.97;
    angs=ovalArcAngles(rx,ry,n);
    placeOvalAngles(angs,rx,ry,cx,cy,lift);
    resolveOvalAngles(angs,rx,ry,cx,cy,lift,overlapGap);
  }
  placeOvalAngles(angs,rx,ry,cx,cy,lift);
  for(let pass=0;pass<6;pass++){
    if(countLayoutOverlaps(overlapGap)===0) break;
    nudgeLayoutOverlaps(overlapGap);
    if(!ovalSeatsInBounds(W,H,pad)){
      rx*=0.97; ry*=0.97;
      if(compact&&W>H&&n<=6) ry=Math.min(ry,H*0.34);
      angs=ovalArcAngles(rx,ry,n);
      placeOvalAngles(angs,rx,ry,cx,cy,lift);
      resolveOvalAngles(angs,rx,ry,cx,cy,lift,overlapGap);
    }
  }
  if(fl&&W>H&&n>1){
    const chord=2*rx*Math.sin(Math.PI/n);
    const gap=chord/(n-1);
    felt.style.setProperty('--seatScale',String(Math.max(n<=6?0.92:0.75,Math.min(1,gap/(sW+6)))));
  }
  /* short landscape: drop hero slightly below the oval so the board can sit between */
  if(lls&&W>H){
    const hero=state.players.find(p=>p.isHuman);
    if(hero){
      const seat=$('seat'+hero.i);
      if(seat) seat.style.top=(Math.min(H-pad.b,parseFloat(seat.style.top)+10))+'px';
    }
  }
}
function layoutDesktopSeats(felt,W,H,cx,cy){
  layoutOvalSeats(felt,W,H,cx,cy);
}
/* Mobile: hero bottom-center; opponents on an upper arc. Board sits above hero. */
function layoutMobileSeats(felt){
  const W=felt.clientWidth,H=felt.clientHeight,cx=W/2,n=state.players.length;
  const fl=document.body.classList.contains('fl')||document.body.classList.contains('lls');
  let sW=102,sH=100;
  for(const p of state.players){
    const s=$('seat'+p.i);
    if(s&&s.offsetHeight){sW=Math.max(sW,s.offsetWidth);sH=Math.max(sH,s.offsetHeight);}
  }
  const shrink=Math.max(0,n-4)*0.02;
  /* wide-short landscape: spread opponents across the full width on a flat top arc */
  const land=W>H;
  const rx=land
    ? Math.max(120,(W-sW)/2-6)
    : Math.min(W*(0.40-shrink)*(fl?0.90:1),(W-sW)/2-8);
  const ry=land
    ? Math.min(H*0.14,Math.max(12,H*0.22-sH*0.15))
    : Math.min(H*(fl?0.32:0.35)-shrink*H*0.25,H*0.36);
  const ocy=H*(fl?0.41:0.43);
  const topY=land?(fl||document.body.classList.contains('lls')?8:sH*0.42):sH*0.42;
  const opponents=state.players.filter(p=>!p.isHuman);
  const m=opponents.length;
  /* landscape: if the even per-seat width is tighter than a plate, scale seats to fit */
  const gap=m>1?(2*rx)/(m-1):sW;
  const seatScale=land?Math.max(n<=6?0.92:0.72,Math.min(1,gap/(sW+6))):1;
  felt.style.setProperty('--seatScale',seatScale);
  const a0=205*Math.PI/180,a1=335*Math.PI/180;
  for(const p of state.players){
    const seat=$('seat'+p.i);
    if(!seat)continue;
    if(p.isHuman){
      seat.style.left=cx+'px';
      seat.style.top=(H-2)+'px';
      continue;
    }
    const oi=opponents.indexOf(p);
    if(land){
      /* even horizontal spread; gentle parabolic drop so the ends sit lower than center */
      const t=m===1?0.5:oi/(m-1);
      const u=2*t-1;
      seat.style.left=(cx-rx+2*rx*t)+'px';
      seat.style.top=(topY+ry*u*u-24)+'px';
    }else{
      const ang=m===1?-Math.PI/2:a0+(a1-a0)*oi/(m-1);
      seat.style.left=(cx+rx*Math.cos(ang))+'px';
      seat.style.top=(ocy+ry*Math.sin(ang)-24)+'px';
    }
  }
  const actOpen=document.body.classList.contains('act-panel-open')&&useLandscapePanel();
  const pad={l:4,r:actOpen?14:4,t:6,b:2};
  for(const p of state.players){
    const seat=$('seat'+p.i); if(!seat||!seat.offsetHeight)continue;
    const l=seat.offsetLeft,t=seat.offsetTop,w=seat.offsetWidth,h=seat.offsetHeight;
    let dx=0,dy=0;
    if(l<pad.l) dx=pad.l-l;
    if(l+dx+w>W-pad.r) dx=W-pad.r-w-l;
    if(t<pad.t) dy=pad.t-t;
    if(t+dy+h>H-pad.b) dy=H-pad.b-h-t;
    if(dx)seat.style.left=(parseFloat(seat.style.left)+dx)+'px';
    if(dy)seat.style.top=(parseFloat(seat.style.top)+dy)+'px';
  }
  const hero=state.players.find(p=>p.isHuman);
  if(hero){
    const seat=$('seat'+hero.i);
    if(seat&&seat.offsetHeight){
      seat.style.left=cx+'px';
      seat.style.top=(H-seat.offsetHeight)+'px';
    }
  }
}
/* Deterministic rotated-portrait (fl) layout: hero pinned bottom-center, opponents
   on a top arc (one or two rows) evenly spread across the width, with a single
   computed scale so any player count fits any viewport without overlap. The center
   pot/board is placed in the middle band by positionCenterArea(). */
function layoutCompactRows(felt,W,H){
  const cx=W/2;
  const sideL=8,sideR=(document.body.classList.contains('act-panel-open')&&useLandscapePanel())?56:8;
  const hasBoard=$('board')?.classList.contains('has-cards');
  const topPad=6,botPad=2,gapV=10,gapH=5,rowGap=6,boardH=hasBoard?84:24;
  /* measure unscaled sizes */
  felt.style.setProperty('--seatScale','1');
  const hero=state.players.find(p=>p.isHuman);
  let pw=70,oppH=40,heroH=60;
  for(const p of state.players){
    const s=$('seat'+p.i); if(!s||!s.offsetHeight)continue;
    const plate=s.querySelector('.plate');
    const w=plate?plate.offsetWidth:s.offsetWidth;
    if(p.isHuman){ heroH=Math.max(heroH,s.offsetHeight); }
    else { pw=Math.max(pw,w); oppH=Math.max(oppH,s.offsetHeight); }
  }
  const m=state.players.length-1;            // opponents
  const usableW=W-sideL-sideR;
  const sSingle=m>1?(usableW-(m-1)*gapH)/(m*pw):1;
  const twoRow=m>=4&&sSingle<0.9;
  let s,rows;
  if(!twoRow){
    const sV=(H-topPad-botPad-2*gapV-boardH)/(oppH+14+heroH);
    s=Math.max(0.5,Math.min(1,sSingle,sV));
    rows=[m];
  }else{
    const back=Math.ceil(m/2),front=m-back,per=Math.max(back,front);
    const sH=(usableW-(per-1)*gapH)/(per*pw);
    const sV=(H-topPad-botPad-rowGap-2*gapV-boardH)/(2*oppH+heroH);
    s=Math.max(0.45,Math.min(1,sH,sV));
    rows=[back,front];
  }
  felt.style.setProperty('--seatScale',String(s));
  const seatW=pw*s, oH=oppH*s, hH=heroH*s;
  const xL=sideL+seatW/2, xR=W-sideR-seatW/2;
  /* hero bottom-center */
  if(hero){
    const hs=$('seat'+hero.i);
    if(hs){ hs.style.left=cx+'px'; hs.style.top=Math.max(topPad,H-botPad-hH)+'px'; }
  }
  /* opponents */
  const opps=state.players.filter(p=>!p.isHuman);
  const place=(list,topY)=>{
    const c=list.length;
    list.forEach((p,i)=>{
      const seat=$('seat'+p.i); if(!seat)return;
      const t=c>1?i/(c-1):0.5;
      const x=(c>1)?(xL+(xR-xL)*t):cx;
      seat.style.left=x+'px';
      seat.style.top=topY+'px';
    });
  };
  if(rows.length===1){
    const dip=14*s, c=opps.length;
    opps.forEach((p,i)=>{
      const seat=$('seat'+p.i); if(!seat)return;
      const t=c>1?i/(c-1):0.5, u=2*t-1;
      const x=(c>1)?(xL+(xR-xL)*t):cx;
      seat.style.left=x+'px';
      seat.style.top=(topPad+dip*u*u)+'px';
    });
  }else{
    const back=rows[0];
    place(opps.slice(0,back),topPad);
    place(opps.slice(back),topPad+oH+rowGap);
  }
}
function layoutSeats(){
  if(!HAS_DOM||!state||BENCH)return;
  const felt=$('felt');
  const W=felt.clientWidth,H=felt.clientHeight,cx=W/2,cy=H/2;
  /* mobile portrait: upper arc + hero bottom; mobile landscape + desktop: uniform oval */
  let usedOval=false;
  if(isMobile()){
    if(document.body.classList.contains('fl')){ layoutCompactRows(felt,W,H); }
    else if(W>H){ layoutOvalSeats(felt,W,H,cx,cy); usedOval=true; }
    else layoutMobileSeats(felt);
  }else{ layoutDesktopSeats(felt,W,H,cx,cy); usedOval=true; }
  positionCenterArea();
  if(usedOval){
    const compact=document.body.classList.contains('fl')||document.body.classList.contains('lls');
    const pad={l:8,r:8,t:8,b:6};
    if(document.body.classList.contains('act-panel-open')&&useLandscapePanel()) pad.r=56;
    resolveCenterClearance(W,H,cx,cy,centerAreaBox(felt),pad,compact?1:2);
  }
  const centerBox=centerAreaBox(felt);
  /* bet chips: anchored to the seat's FINAL position, pushed toward the table center,
     never on top of the seat box and never inside the board/pot zone */
  for(const p of state.players){
    const seat=$('seat'+p.i), bet=$('bet'+p.i);
    if(!seat||!bet||!seat.offsetHeight)continue;
    const r={width:seat.offsetWidth,height:seat.offsetHeight};
    const scx=seat.offsetLeft+r.width/2, scy=seat.offsetTop+r.height/2;
    let ux=cx-scx, uy=cy-scy;
    const L=Math.hypot(ux,uy)||1; ux/=L; uy/=L;
    /* per-axis clearance: the seat box half-size PLUS the bet label's own half-size
       along the travel direction — so the label body can never rest on the cards */
    const bw=bet.offsetWidth||64, bh=bet.offsetHeight||56;
    const off=Math.abs(ux)*(r.width/2+bw/2)+Math.abs(uy)*(r.height/2+bh/2)+12;
    let bx=scx+ux*off, by=scy+uy*off;
    /* rectangular exclusion zone around the board + pot text */
    const ezX=centerBox.w/2+10, ezY=centerBox.h/2+8;
    if(Math.abs(bx-centerBox.x)<ezX&&Math.abs(by-centerBox.y)<ezY){
      const s=Math.min(ezX/Math.max(Math.abs(bx-centerBox.x),1), ezY/Math.max(Math.abs(by-centerBox.y),1));
      const bx2=centerBox.x+(bx-centerBox.x)*s, by2=centerBox.y+(by-centerBox.y)*s;
      /* if escaping the board zone would shove the label back onto its own seat
         (hero on short screens), put it BESIDE the seat instead */
      const hitsSeat=Math.abs(bx2-scx)<(r.width+bw)/2+6 && Math.abs(by2-scy)<(r.height+bh)/2+6;
      if(hitsSeat){
        const side=scx>cx+5?1:scx<cx-5?-1:(p.i%2?1:-1);
        bx=scx+side*((r.width+bw)/2+10);
        by=scy-r.height*0.08;
      }else{ bx=bx2; by=by2; }
    }
    bet.style.left=bx+'px'; bet.style.top=by+'px';
  }
  /* FINAL GUARANTEE: no bet label may intersect ANY seat or another label.
     Iterative minimal-push resolution against every box on the table. */
  {
    const seats=[];
    for(const p of state.players){
      const s=$('seat'+p.i);
      if(s&&s.offsetHeight)seats.push({x:s.offsetLeft+s.offsetWidth/2,y:s.offsetTop+s.offsetHeight/2,w:s.offsetWidth,h:s.offsetHeight});
    }
    const labels=[];
    for(const p of state.players){
      const b=$('bet'+p.i);
      if(!b||(b.offsetWidth||0)<12)continue;   // empty = no bet this street
      labels.push({el:b,w:b.offsetWidth,h:b.offsetHeight||56});
    }
    const boardBox={x:centerBox.x,y:centerBox.y,w:centerBox.w,h:centerBox.h};
    for(let it=0;it<3;it++){
      for(const L of labels){
        /* label is anchored with translate(-50%,-60%): visual center ≈ (left, top-0.1h) */
        let lx=parseFloat(L.el.style.left)||0, ly=(parseFloat(L.el.style.top)||0)-0.1*L.h;
        const others=labels.filter(o=>o!==L).map(o=>({x:parseFloat(o.el.style.left)||0,y:(parseFloat(o.el.style.top)||0)-0.1*o.h,w:o.w,h:o.h}));
        const obst=seats.concat(others,[boardBox]);
        let lastAxis='';
        for(let k=0;k<10;k++){
          const hit=obst.find(o=>(L.w+o.w)/2-Math.abs(lx-o.x)>2&&(L.h+o.h)/2-Math.abs(ly-o.y)>2);
          if(!hit)break;
          const px=(L.w+hit.w)/2-Math.abs(lx-hit.x);
          const py=(L.h+hit.h)/2-Math.abs(ly-hit.y);
          /* min-penetration axis, but alternate when ping-ponging between two boxes */
          let axis=px<py?'x':'y';
          if(axis===lastAxis&&k>2) axis=axis==='x'?'y':'x';
          if(axis==='x') lx+=(lx>=hit.x?1:-1)*(px+3);
          else           ly+=(ly>=hit.y?1:-1)*(py+3);
          lastAxis=axis;
          lx=clamp(lx,L.w/2+2,W-L.w/2-2);
          ly=clamp(ly,L.h/2+2,H-L.h/2-2);
        }
        L.el.style.left=lx+'px'; L.el.style.top=(ly+0.1*L.h)+'px';
      }
    }
  }
  positionCenterArea();
  if(usedOval){
    const compact=document.body.classList.contains('fl')||document.body.classList.contains('lls');
    const pad={l:8,r:8,t:8,b:6};
    if(document.body.classList.contains('act-panel-open')&&useLandscapePanel()) pad.r=56;
    resolveCenterClearance(W,H,cx,cy,centerAreaBox(felt),pad,compact?1:2);
  }
  positionDealerBtn();
}
function elementRectFelt(el){
  const l=el.offsetLeft,t=el.offsetTop,w=el.offsetWidth,h=el.offsetHeight;
  return {l,t,r:l+w,b:t+h,w,h,cx:l+w/2,cy:t+h/2};
}
/* Layout overlap box: plate (+ hero hole on compact) — avoids false stacks from hole cards */
function elementRectSeatLayout(el){
  const plate=el.querySelector('.plate');
  if(!plate||!plate.offsetHeight) return elementRectFelt(el);
  let l=el.offsetLeft+plate.offsetLeft,t=el.offsetTop+plate.offsetTop;
  let r=l+plate.offsetWidth,b=t+plate.offsetHeight;
  const compact=document.body.classList.contains('fl')||document.body.classList.contains('lls');
  if(compact&&el.classList.contains('human')){
    const hole=el.querySelector('.hole');
    if(hole&&hole.offsetHeight){
      const hl=el.offsetLeft+hole.offsetLeft,ht=el.offsetTop+hole.offsetTop;
      l=Math.min(l,hl); t=Math.min(t,ht);
      r=Math.max(r,hl+hole.offsetWidth); b=Math.max(b,ht+hole.offsetHeight);
    }
  }
  const act=el.querySelector('.lastact');
  if(act&&act.offsetHeight&&act.textContent.trim()){
    const al=el.offsetLeft+act.offsetLeft,at=el.offsetTop+act.offsetTop;
    l=Math.min(l,al); r=Math.max(r,al+act.offsetWidth);
    b=Math.max(b,at+act.offsetHeight);
  }
  return {l,t,r,b,w:r-l,h:b-t,cx:(l+r)/2,cy:(t+b)/2};
}
function countLayoutOverlaps(gap){
  gap=gap??1;
  const rects=[];
  for(const p of state.players){
    const s=$('seat'+p.i);
    if(s&&s.offsetHeight) rects.push(elementRectSeatLayout(s));
  }
  let n=0;
  for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++)
    if(boxOverlap(rects[i],rects[j],gap)) n++;
  return n;
}
function seatBoxes(gap){
  if(!HAS_DOM||!state)return [];
  const felt=$('felt');
  if(!felt)return [];
  const W=felt.clientWidth,H=felt.clientHeight,cx=W/2,cy=H/2;
  const grow=gap||0;
  const boxes=[];
  for(const p of state.players){
    const s=$('seat'+p.i);
    if(!s||!s.offsetHeight)continue;
    let {l,t,r,b}=elementRectFelt(s);
    if(grow>0){
      const scx=(l+r)/2,scy=(t+b)/2;
      const dx=cx-scx,dy=cy-scy;
      const L=Math.hypot(dx,dy)||1;
      l-=grow*0.25; t-=grow*0.25; r+=grow*0.25; b+=grow*0.25;
      l-=grow*0.75*Math.max(0,-dx/L);
      r+=grow*0.75*Math.max(0,dx/L);
      t-=grow*0.75*Math.max(0,-dy/L);
      b+=grow*0.75*Math.max(0,dy/L);
      l=Math.max(0,l); t=Math.max(0,t);
      r=Math.min(W,r); b=Math.min(H,b);
    }
    boxes.push({l,t,r,b,cx:(l+r)/2,cy:(t+b)/2});
  }
  return boxes;
}
function boxOverlap(a,b,pad){
  pad=pad||0;
  return Math.min(a.r,b.r)-Math.max(a.l,b.l)>pad&&Math.min(a.b,b.b)-Math.max(a.t,b.t)>pad;
}
function boardCardMetrics(){
  if(!HAS_DOM)return {cardW:54,gap:7};
  const board=$('board');
  let cardW=0,gap=0;
  const sample=board?.querySelector('.card')||document.querySelector('#felt .card:not(.small)');
  if(sample&&sample.offsetWidth)cardW=sample.offsetWidth;
  if(board){
    const g=parseFloat(getComputedStyle(board).columnGap||getComputedStyle(board).gap);
    if(!isNaN(g))gap=g;
  }
  if(!cardW){
    if(document.body.classList.contains('fl'))cardW=50;
    else if(isMobile())cardW=50;
    else cardW=54;
  }
  if(!gap){
    if(document.body.classList.contains('fl'))gap=3;
    else if(isMobile())gap=4;
    else gap=7;
  }
  return {cardW,gap};
}
function boardMinWidth(){
  const {cardW,gap}=boardCardMetrics();
  return 5*cardW+4*gap+20;
}
function centerRectDOM(center){
  /* offsetLeft/Top ignore CSS transforms; #centerArea uses translate(-50%,-50%),
     so add the transform translation to get the real visual box. */
  const l0=center.offsetLeft,t0=center.offsetTop,w=center.offsetWidth,h=center.offsetHeight;
  let tx=0,ty=0;
  const cs=getComputedStyle(center).transform;
  if(cs&&cs!=='none'){
    try{const m=new DOMMatrixReadOnly(cs);tx=m.m41;ty=m.m42;}
    catch(e){const mm=cs.match(/matrix\(([^)]+)\)/);if(mm){const a=mm[1].split(',');tx=parseFloat(a[4])||0;ty=parseFloat(a[5])||0;}}
  }
  const l=l0+tx,t=t0+ty,r=l+w,b=t+h;
  return {l,t,r,b,w,h,cx:l+w/2,cy:t+h/2};
}
function centerAreaBox(felt){
  const W=felt.clientWidth,H=felt.clientHeight,cx=W/2,cy=H/2;
  const center=$('centerArea');
  if(!center||!center.offsetHeight)return {x:cx,y:cy,w:W*0.46,h:H*0.30,l:cx-W*0.23,t:cy-H*0.15,r:cx+W*0.23,b:cy+H*0.15};
  const r=centerRectDOM(center);
  return {x:r.cx,y:r.cy,w:r.w,h:r.h,l:r.l,t:r.t,r:r.r,b:r.b};
}
/* Hero overlap box for center lift (hole + plate on compact mobile). */
function heroCenterClearRect(seat){
  const compact=document.body.classList.contains('fl')||document.body.classList.contains('lls');
  if(compact&&seat.classList.contains('human')) return elementRectSeatLayout(seat);
  const plate=seat.querySelector('.plate');
  if(plate&&plate.offsetHeight){
    const l=seat.offsetLeft+plate.offsetLeft,t=seat.offsetTop+plate.offsetTop;
    const r=l+plate.offsetWidth,b=t+plate.offsetHeight;
    return {l,t,r,b,w:r-l,h:b-t,cx:(l+r)/2,cy:(t+b)/2};
  }
  return elementRectFelt(seat);
}
/* Find the lowest (max top%) center position that clears hero hole and top opponents. */
function settleCenterVertical(center,felt,W,H,minPct,maxPct){
  const hero=state.players.find(p=>p.isHuman);
  const hSeat=hero?$('seat'+hero.i):null;
  const gap=10;
  let topB=0, topT=Infinity;
  for(const p of state.players){
    if(p.isHuman)continue;
    const s=$('seat'+p.i); if(!s?.offsetHeight)continue;
    const r=elementRectSeatLayout(s);
    if(r.t<topT){ topT=r.t; topB=r.b; }
    else if(r.t===topT) topB=Math.max(topB,r.b);
  }
  let best=minPct;
  for(let pct=minPct;pct<=maxPct;pct++){
    center.style.top=pct+'%';
    void center.offsetHeight;
    const c=centerRectDOM(center);
    const heroOk=!hSeat||c.b+gap<=heroCenterClearRect(hSeat).t;
    const topOk=!topT||topT===Infinity||c.t>=topB+gap;
    if(heroOk&&topOk) best=pct;
  }
  center.style.top=best+'%';
  void center.offsetHeight;
  if(topT!==Infinity){
    const c=centerRectDOM(center);
    const need=c.t-(topB+gap);
    if(need<0){
      const pct=(parseFloat(center.style.top)||best)+((need/H)*100);
      center.style.top=Math.max(minPct,pct)+'%';
    }
  }
}
/* lift the center zone above the hero seat when the board would land on the hero's cards */
function liftCenterAboveHero(center,felt,W,H,minTopPct,maxTopPct){
  void center.offsetHeight;
  const hero=state.players.find(p=>p.isHuman);
  const hSeat=hero?$('seat'+hero.i):null;
  if(!hSeat||!hSeat.offsetHeight)return;
  const cBox=centerRectDOM(center);
  const heroBox=heroCenterClearRect(hSeat);
  const gap=10;
  if(cBox.b+gap>heroBox.t){
    const lift=cBox.b+gap-heroBox.t;
    const newTopPct=Math.max(minTopPct,Math.min(maxTopPct,((cBox.cy-lift)/H)*100));
    center.style.top=newTopPct+'%';
  }
}
function positionCenterArea(){
  if(!HAS_DOM||!state)return;
  const felt=$('felt'), center=$('centerArea');
  if(!felt||!center)return;
  const W=felt.clientWidth,H=felt.clientHeight,n=state.players.length;
  const boardMin=boardMinWidth();
  const maxW=Math.max(boardMin,Math.min(W*0.88,300-n*8));
  if(!isMobile()){
    center.style.top='';
    center.style.width='';
    center.style.left='';
    center.style.minWidth='';
    center.style.maxWidth='';
    /* desktop oval: keep CSS centering, but rescue short windows where the board
       would otherwise drop onto the hero's cards */
    liftCenterAboveHero(center,felt,W,H,30,46);
    return;
  }
  center.style.left='50%';
  center.style.width='auto';
  center.style.minWidth=boardMin+'px';
  center.style.maxWidth=maxW+'px';
  const fl=document.body.classList.contains('fl');
  /* rotated-portrait post-flop: board+pot laid out in a row (see CSS) so the pot
     renders below the flop after the 90° rotation — let it size to its content. */
  if(fl&&$('board')?.classList.contains('has-cards')){
    center.style.minWidth='';
    center.style.maxWidth='none';
  }
  const land=W>H;
  const base=land?50:(fl?36:40);
  center.style.top=base+'%';
  if(land){
    settleCenterVertical(center,felt,W,H,28,base);
    liftCenterAboveHero(center,felt,W,H,24,parseFloat(center.style.top)||base);
  }
  else liftCenterAboveHero(center,felt,W,H,fl?34:38,base);
}
function positionDealerBtn(){
  if(!HAS_DOM||!state)return;
  const felt=$('felt');
  const W=felt.clientWidth,H=felt.clientHeight;
  const cx=W/2,cy=H/2;
  const d=$('dbtn');
  const seat=$('seat'+state.dealerIdx);
  if(seat&&seat.offsetHeight){
    /* next to the dealer's seat, toward the center, rotated ~35° so it misses the bet chip */
    const scx=seat.offsetLeft+seat.offsetWidth/2, scy=seat.offsetTop+seat.offsetHeight/2;
    let ux=cx-scx, uy=cy-scy; const L=Math.hypot(ux,uy)||1; ux/=L; uy/=L;
    const A=0.61; // ~35°
    let rxv=ux*Math.cos(A)-uy*Math.sin(A), ryv=ux*Math.sin(A)+uy*Math.cos(A);
    let off=Math.max(seat.offsetWidth,seat.offsetHeight)/2+18;
    let dx=scx+rxv*off, dy=scy+ryv*off;
    /* keep dealer chip off the board / pot zone and player seats */
    const center=$('centerArea');
    const dbW=d.offsetWidth||24, dbH=d.offsetHeight||24;
    const obstacles=[];
    if(center&&center.offsetHeight){
      const zone=centerRectDOM(center);
      obstacles.push({x:zone.cx,y:zone.cy,w:zone.w+dbW+16,h:zone.h+dbH+12});
    }
    for(const b of seatBoxes())obstacles.push({x:b.cx,y:b.cy,w:b.r-b.l+dbW+8,h:b.b-b.t+dbH+8});
    for(let pass=0;pass<8;pass++){
      let moved=false;
      for(const o of obstacles){
        if(Math.abs(dx-o.x)>=(o.w)/2||Math.abs(dy-o.y)>=(o.h)/2)continue;
        const px=(o.w)/2-Math.abs(dx-o.x)+4;
        const py=(o.h)/2-Math.abs(dy-o.y)+4;
        if(px<py) dx+=(dx>=o.x?1:-1)*px;
        else dy+=(dy>=o.y?1:-1)*py;
        moved=true;
      }
      if(!moved)break;
      dx=clamp(dx,dbW/2+2,W-dbW/2-2);
      dy=clamp(dy,dbH/2+2,H-dbH/2-2);
    }
    d.style.left=dx+'px';
    d.style.top=dy+'px';
  }else{
    const n=state.players.length;
    const ang=(90+360*state.dealerIdx/n+14)*Math.PI/180;
    d.style.left=(cx+W*0.29*Math.cos(ang))+'px';
    d.style.top=(cy+H*0.26*Math.sin(ang))+'px';
  }
}

function render(winners){
  if(!HAS_DOM||BENCH)return;
  if(!state)return;
  const cash=isCashGame();
  document.querySelectorAll('.tb-sng-only').forEach(el=>el.classList.toggle('hidden',cash));
  const pnlWrap=$('tPnLWrap');
  if(pnlWrap) pnlWrap.classList.toggle('hidden',!cash);
  $('tBlinds').textContent=usd(state.sb)+'/'+usd(state.bb);
  $('tHand').textContent=state.handNum;
  if(cash){
    const pnl=getMode().sessionPnL(state);
    const pnlEl=$('tPnLVal');
    if(pnlEl) pnlEl.textContent=(pnl>=0?'+':'−')+usd(Math.abs(pnl));
  }else{
    $('tLevel').textContent=state.level+1;
    $('tAnte').textContent=state.ante?usd(state.ante):'—';
    const per=SPEED_HANDS[state.cfg.speed];
    $('tNext').textContent= state.level>=state.levels.length-1 ? '—' : (per-((state.handNum-1)%per+1)+1);
    renderKoBonusTop();
  }
  renderRewardTop();
  const potCollected=state.players.reduce((s,p)=>s+p.totalBet-p.bet,0);
  const totalPot=state.players.reduce((s,p)=>s+p.totalBet,0);
  $('pot').textContent= totalPot>0?`Pot: ${money(totalPot)}`:'';
  setHTML($('potChips'),chipStackHTML(potCollected,true));
  setHTML($('board'),state.board.map((c,i)=>cardHTML(c,false,i>=prevBoardLen)).join(''));
  prevBoardLen=state.board.length;
  const boardEl=$('board');
  if(boardEl) boardEl.classList.toggle('has-cards',state.board.length>0);
  const caEl=$('centerArea');
  if(caEl) caEl.classList.toggle('has-board',state.board.length>0);
  for(const p of state.players){
    const seat=$('seat'+p.i); if(!seat)continue;
    const isActing=playerIsActing(p);
    const cardsLive=!p.folded&&!p.out||isActing;
    seat.classList.toggle('active',isActing);
    seat.classList.toggle('cards-live',cardsLive);
    seat.classList.toggle('folded',p.folded&&!p.out&&!isActing);
    seat.classList.toggle('busted', p.out);
    seat.classList.toggle('winner', !!(winners&&winners.includes(p)));
    seat.classList.toggle('revealed', !!p.revealed&&!p.isHuman&&!p.folded&&!p.out&&p.hole.length>0);
    $('chips'+p.i).textContent= p.out?'OUT':money(p.chips)+(p.allIn?' · all-in':'');
    $('pos'+p.i).textContent= p.out?'':(p.pos||'');
    const lls=document.body.classList.contains('lls');
    $('act'+p.i).textContent=(lls&&/^(SB|BB) /.test(p.lastAct))?'':p.lastAct;
    const hole=$('hole'+p.i);
    if(p.hole.length===0) setHTML(hole,'');
    else if(p.isHuman) setHTML(hole,p.hole.map(c=>cardHTML(c,false,true)).join(''));
    else if(p.revealed) setHTML(hole,p.hole.map(c=>cardHTML(c,true,'flip')).join(''));
    else setHTML(hole,backHTML(true,true)+backHTML(true,true));
    const bet=$('bet'+p.i);
    const mob=isMobile();
    const actor=state.handOver?-1:state.turnIdx;
    if(p.bet>0){
      const showMobBet=mob&&(p.i===0||p.i===actor);
      if(showMobBet) setHTML(bet,`<span class="amt">${usd(p.bet)} · ${bbs(p.bet)}</span>`);
      else setHTML(bet,chipStackHTML(p.bet,true)+`<span class="amt">${usd(p.bet)} · ${bbs(p.bet)}</span>`);
      bet.classList.toggle('mobile-show',showMobBet);
      bet.classList.remove('hidden');
    }else{
      bet.classList.remove('mobile-show');
      bet.classList.add('hidden');
    }
  }
  layoutSeats();
  mpBroadcast();
}
function playerIsActing(p){
  return !!p&&!state.handOver&&state.turnIdx===p.i&&!p.out&&!p.folded&&!p.allIn&&inHand().length>1;
}

/* ---------- live coach ---------- */
const pct=e=>Math.round(e*100)+'%';
function isMobile(){ return HAS_DOM && typeof window.matchMedia==='function' && window.matchMedia('(max-width:680px),(max-width:1024px) and (orientation:portrait),(max-width:1024px) and (orientation:landscape) and (max-height:500px)').matches; }
function maxSetupPlayers(){ return isMobile()?6:9; }
function useLandscapePanel(){
  /* mobile always uses a bottom action bar — never the right slide-out panel */
  return false;
}
function syncActPanelMode(){
  if(!HAS_DOM)return;
  /* fl (rotated portrait) and lls (native landscape) both use the always-visible bottom
     action dock, not the slide-out right-side panel */
  const on=useLandscapePanel()&&!document.body.classList.contains('fl')&&!document.body.classList.contains('lls');
  document.body.classList.toggle('act-panel-mode',on);
  if(!on){
    document.body.classList.remove('act-panel-open','act-panel-collapsed');
    const g=$('game');
    if(g){g.classList.remove('act-open','act-collapsed');}
  }else if(!document.body.classList.contains('act-panel-open')){
    document.body.classList.add('act-panel-collapsed');
    $('game')?.classList.add('act-collapsed');
  }
  syncActFab();
}
function setActBar(open){
  if(!HAS_DOM||!useLandscapePanel())return;
  document.body.classList.toggle('act-panel-open',open);
  document.body.classList.toggle('act-panel-collapsed',!open);
  const g=$('game');
  if(g){g.classList.toggle('act-open',open);g.classList.toggle('act-collapsed',!open);}
  const fab=$('actFab');
  if(fab){fab.setAttribute('aria-expanded',open?'true':'false');}
  syncActFab();
  layoutSeats();
}
function syncActFab(){
  if(!HAS_DOM||!isMobile())return;
  const fab=$('actFab'),g=$('game');
  if(document.body.classList.contains('fl')){ if(fab)fab.classList.add('hidden'); return; }
  if(!fab||!g||g.classList.contains('hidden')||!useLandscapePanel()){
    if(fab)fab.classList.add('hidden');
    return;
  }
  const open=document.body.classList.contains('act-panel-open');
  const onTurn=$('humanCtls')&&!$('humanCtls').classList.contains('hidden');
  fab.classList.toggle('hidden',open);
  fab.textContent=onTurn?T('actTurn'):T('actMenu');
  fab.classList.toggle('pulse',onTurn&&!open);
}
/* force landscape on phones: rotate the whole game 90° when held portrait */
function updateOrient(){
  if(!HAS_DOM)return;
  const g=$('game'); if(!g)return;
  const portrait=window.innerHeight>window.innerWidth;
  const phone=Math.min(window.innerWidth,window.innerHeight)<=620;
  const on=portrait&&phone&&!g.classList.contains('hidden');
  document.body.classList.toggle('fl',on);
  /* genuine phone landscape (short, wide): compact oval + bottom control dock */
  const landShort=!on&&!g.classList.contains('hidden')&&window.innerWidth>window.innerHeight&&Math.min(window.innerWidth,window.innerHeight)<=500;
  document.body.classList.toggle('lls',landShort);
  const bar=$('actionbar');
  const tb=$('topbar');
  /* everything stays INSIDE the rotated frame so the menu (top) and action bar (bottom)
     read in the same landscape orientation as the table */
  if(tb&&tb.parentNode!==g) g.insertBefore(tb,g.firstChild);
  if(bar&&bar.parentNode!==g) g.appendChild(bar);
  if(on){
    g.style.width=window.innerHeight+'px';
    g.style.height=window.innerWidth+'px';
    g.style.transform=`translateX(${window.innerWidth}px) rotate(90deg)`;
  }else{
    g.style.width=''; g.style.height=''; g.style.transform='';
  }
  layoutSeats();
  syncActPanelMode();
}
function setCoach(on){
  if(!HAS_DOM)return;
  const c=$('coach'); if(!c)return;
  $('coachChk').checked=on;
  const tb=$('coachToggle');
  if(tb){tb.classList.toggle('on',on);tb.setAttribute('aria-pressed',on?'true':'false');}
  if(isMobile()){
    c.classList.remove('hidden');   // keep in DOM so it can slide; transform handles on/off
    c.classList.toggle('open',on);
  }else{
    c.classList.toggle('hidden',!on);
    c.classList.toggle('open',on);
    const cr=$('coachResize'); if(cr)cr.classList.toggle('hidden',!on);
  }
  layoutSeats();
}

function mixTip(rec,R){
  if(rec==='FOLD'||rec==='ALLIN')return'';
  if(R.icmPrem>=0.01||R.M<8)return'';                       // never mix under tournament pressure
  let key=null;
  if(rec==='CALL'&&R.eq>=0.30)key='mixCall';                 // call -> occasional raise
  else if(rec==='CHECK'&&R.eq>=0.30&&R.eq<=0.65)key='mixCheck'; // check -> occasional small bet
  else if(rec==='RAISE'&&state.stage!=='preflop'&&R.eq>=0.78)key='mixTrap'; // monster -> occasional trap
  if(!key)return'';
  /* deterministic 1-in-8 per decision point */
  const seed=(state.gameId||0)+'-'+state.handNum+'-'+state.stage+'-'+state.turnIdx+'-'+state.currentBet;
  let h=0; for(let i=0;i<seed.length;i++)h=(h*31+seed.charCodeAt(i))>>>0;
  if(h%8!==0)return'';
  return `<div class="mixtip"><b>${C('mixTitle')}</b><br>${C(key)}</div>`;
}

function coachProseHtml(why,extra){
  const paras=[...why,...extra].map(s=>(s||'').trim()).filter(Boolean);
  if(!paras.length)return'';
  return`<div class="why">${paras.map(t=>`<p class="why-p">${t}</p>`).join('')}</div>`;
}
function coachDetailsLabel(){
  return lang==='fr'?'Voir l’analyse complète':lang==='es'?'Ver análisis completo':'See full analysis';
}
function coachDecisionLabel(){
  return lang==='fr'?'Action recommandée':lang==='es'?'Acción recomendada':'Recommended action';
}
function coachReasonLabel(){
  return lang==='fr'?'Pourquoi':lang==='es'?'Por qué':'Why';
}
function coachMathLabel(){
  return lang==='fr'?'Calculs en direct':lang==='es'?'Cálculos en vivo':'Live math';
}
function coachMetric(label,value,cls=''){
  if(!value)return'';
  return `<div class="coach-metric ${cls}"><span>${label}</span><b>${value}</b></div>`;
}
function coachConfidence(R){
  const preflop=state.stage==='preflop';
  const chart=preflop&&R.chartInfo&&R.chartInfo.kind!=='range';
  if(chart)return{
    kind:'chart',source:T('confidenceChart'),level:T('confidenceHigh'),note:T('confidenceChartNote'),icon:'▦'
  };
  if((R.opps||0)<=1)return{
    kind:'simulation',source:T('confidenceMath'),level:T('confidenceMedium'),note:T('confidenceMathNote'),icon:'≈'
  };
  return{
    kind:'heuristic',source:T('confidenceHeuristic'),level:T('confidenceLimited'),note:T('confidenceHeuristicNote'),icon:'◇'
  };
}
function coachConfidenceHtml(R){
  const c=coachConfidence(R);
  return `<div class="coach-confidence"><span class="coach-confidence-icon">${c.icon}</span><div>`+
    `<b>${T('confidenceTitle')(c.source,c.level)}</b><span>${c.note}</span></div></div>`;
}
function coachIcmHtml(info){
  if(!info)return '';
  const pctRound=n=>Math.round(n*100);
  const coverage=info.covered?T('icmCovered'):info.covers?T('icmCovers'):'';
  return `<section class="coach-icm"><span class="coach-icm-title">💰 ${T('icmTitle')}</span>`+
    `<p>${T('icmImpact')}</p><div class="coach-icm-grid">`+
    `<div class="coach-icm-chip">${T('icmPlayers')(info.players,info.paid)}<br>${T('icmStackRank')(info.rank,info.players)}</div>`+
    `<div class="coach-icm-chip">${T('icmRisk')(pctRound(info.riskPct))}${coverage?`<br>${coverage}`:''}</div>`+
    `<div class="coach-icm-chip coach-icm-threshold">${T('icmThreshold')(pctRound(info.chipNeed),pctRound(info.icmNeed),pctRound(info.premium))}</div>`+
    `</div></section>`;
}
function coachIntentLabel(intent){
  const key={bluff:'intentBluff',semiBluff:'intentSemiBluff',value:'intentValue',
    protection:'intentProtection',rangeBluff:'intentRangeBluff',rangeRaise:'intentRangeRaise',
    bluffCatch:'intentBluffCatch',call:'intentCall',check:'intentCheck',fold:'intentFold'}[intent];
  return key?T(key):'';
}
function coachBluffHtml(info){
  if(!info)return '';
  const verdictKey={goodBluff:'bluffGood',thinBluff:'bluffThin',semiBluff:'bluffSemi',
    notBluff:'bluffNot',doNotBluff:'bluffNo'}[info.verdict]||'bluffNo';
  const reasonKey={passive:'bluffReasonPassive',blocker:'bluffReasonBlocker',draw:'bluffReasonDraw',
    position:'bluffReasonPosition',dry:'bluffReasonDry',station:'bluffReasonStation',
    multiway:'bluffReasonMultiway',historyFolds:'bluffReasonHistoryFolds',
    historyCalls:'bluffReasonHistoryCalls',strength:'bluffReasonStrength',showdown:'bluffReasonShowdown',
    range:'bluffReasonRange'};
  const planKey={giveUpIfCalled:'bluffPlanGiveUp',continueGoodCards:'bluffPlanDraw',
    continueForValue:'bluffPlanValue',callNoRaise:'bluffPlanCatch',takeFreeCard:'bluffPlanFree',
    preserveStack:'bluffPlanFold',followAction:'bluffPlanFollow'}[info.plan]||'bluffPlanFollow';
  const foldMath=info.requiredFolds!=null
    ?`<div class="coach-bluff-math">${T('bluffFoldCompare')(Math.round(info.requiredFolds*100),Math.round(info.estimatedFolds*100))}<br>${T('bluffCalledEquity')(Math.round(info.equityWhenCalled*100))}</div>`:'';
  const historyMath=info.historySample>0&&info.learnedFoldRate!=null
    ?`<div class="coach-bluff-history">${T('bluffHistoryRead')(info.historySample,
      Math.round(info.learnedFoldRate*100),Math.round(info.historyAdjustment*100),T(info.difficulty))}</div>`:'';
  return `<section class="coach-bluff coach-bluff-${info.verdict}">`+
    `<div class="coach-bluff-head"><span>🎭 ${T('bluffTitle')}</span><b>${coachIntentLabel(info.intent)}</b></div>`+
    `<div class="coach-bluff-verdict"><span>${T('bluffVerdict')}</span><strong>${T(verdictKey)}</strong></div>`+
    foldMath+historyMath+
    `<div class="coach-bluff-copy"><b>${T('bluffWhy')}</b><ul>${info.reasons.slice(0,4).map(r=>`<li>${T(reasonKey[r]||'bluffReasonRange')}</li>`).join('')}</ul></div>`+
    `<div class="coach-bluff-plan"><b>${T('bluffPlan')}</b><p>${T(planKey)}</p></div></section>`;
}

function updateCoach(p){
  if(!HAS_DOM)return;
  const R=coachDecide(p);
  const {rec,coachT,evs,why,extra,handDesc,drawRow,eq,odds,callAmt,pot,opps,pos,early,late,
         actsFirst,actsLast,ordIdx,ordLen,M,mZone,icmPrem,spr,sprZone}=R;
  const flags=getMode().coachFlags||{};
  if(rec==='RAISE'||rec==='ALLIN'){
    /* pre-set the raise slider to the coach's size so R raises exactly this */
    if($('raiseCtl').style.visibility!=='hidden'){
      const sl=$('raiseSlider');
      if(rec==='ALLIN') setRaiseExact(p.bet+p.chips);
      else{ clearRaiseExact(); sl.value=clamp(coachT,+sl.min,+sl.max); updateRaiseLabel(); }
    }
  }
  const recLabelBase = rec==='ALLIN' ? `${T('recALLIN')} ${usd(p.bet+p.chips)}`
    : rec==='RAISE' ? `${state.currentBet>0?T('recRAISETO'):T('recBET')} ${usd(coachT)} · ${bbs(coachT)}`
    : T('rec'+rec);
  const intentLabel=coachIntentLabel(R.actionIntent);
  const showIntent=!['call','check','fold'].includes(R.actionIntent);
  const recLabel=recLabelBase+(showIntent&&intentLabel?` · ${intentLabel}`:'');
  const showM=flags.mRatio;
  const sprRow=flags.showSpr&&spr!=null&&state.stage!=='preflop'
    ?`<div class="coach-row"><span>${T('sprLbl')}</span><b>~${Math.round(spr*10)/10} · ${T(sprZone==='deep'?'sprZoneDeep':sprZone==='mid'?'sprZoneMid':'sprZoneLow')}</b></div>`:'';
  const rangeCharts=R.rangeCharts?.length?R.rangeCharts:(R.chartInfo?.kind==='range'?[R.chartInfo]:[]);
  const rangePanel=rangeCharts.length?`<button class="chart-link range-toggle" id="rangeToggleBtn" aria-expanded="${coachRangeVisible}">${T(coachRangeVisible?'hideRange':'showRange')}</button>`+
    `<div id="coachRangeDisclosure" class="${coachRangeVisible?'':'hidden'}"><div class="coach-range-inline">`+
    (rangeCharts.length>1?`<div class="coach-range-tabs">${rangeCharts.map((x,i)=>`<button type="button" data-range-index="${i}" class="${i===0?'on':''}">${x.pos}</button>`).join('')}</div>`:'')+
    `<b id="coachRangeTitle">${rangeCharts[0].pos} — ${T('chartTitleRange')}</b><div id="coachRangeMeta">${rangeMatrixMetaHtml(rangeCharts[0])}</div><div id="coachRangeMatrix">${rangeMatrixCells(rangeCharts[0],R.code,true)}</div>${rangeMatrixLegend()}</div>`+
    `<button class="chart-link" id="chartViewBtn">${T('viewRange')}</button></div>`:'';
  const allReasons=[...why,...extra].map(s=>(s||'').trim()).filter(Boolean);
  const keyReason=allReasons.shift()||'';
  /* When nobody has entered the pot, matching the big blind would be a limp,
     not a priced call. Show the actual strategic question instead of presenting
     showdown equity and 1-BB pot odds as the reason to open or fold. */
  const openingDecision=state.stage==='preflop'&&state.currentBet<=state.bb&&limperCount(p)===0&&p.bet<state.bb;
  const priceMetric=callAmt>0?`${T('need')}${pct(odds)} · ${usd(callAmt)} → ${usd(pot)}`:'';
  const impliedRow=R.impliedInfo
    ?`<div class="coach-row"><span>${T('impliedOdds')}</span><b>~${pct(R.impliedInfo.realisticNeed)} ${T('realisticNeed')}<br>${pct(R.impliedInfo.bestCaseNeed)} ${T('bestCaseNeed')} · ${usd(R.impliedInfo.maxFuture)} max</b></div>`:'';
  const effectiveRow=callAmt>0&&R.needEq!=null&&Math.abs(R.needEq-odds)>=.005
    ?`<div class="coach-row"><span>${T('effectiveNeed')}</span><b>~${pct(R.needEq)}<small class="coach-row-note">${T('effectiveNeedNote')}</small></b></div>`:'';
  const bluffRow=R.bluffBreakEven!=null
    ?`<div class="coach-row"><span>${T('bluffBreakEven')}</span><b>${pct(R.bluffBreakEven)}<small class="coach-row-note">${T('bluffBreakEvenNote')(Math.round(R.bluffBreakEven*100),Math.round((R.modeledFoldEquity||0)*100))}</small></b></div>`:'';
  const liveMathRows=drawRow+impliedRow+sprRow+effectiveRow+bluffRow;
  const usableEq=clamp(R.eqAdj==null?eq:R.eqAdj,0,1);
  const decisionNeed=R.needEq==null?odds:R.needEq;
  const beginnerRead=R.drySidePot
    ?T('beginnerDrySidePot')
    :openingDecision
    ?(rec==='FOLD'?T('beginnerOpenFold'):T('beginnerAgg'))
    :callAmt>0
    ?T('beginnerMath')(Math.round(eq*100),Math.round(usableEq*100),Math.round(decisionNeed*100),usableEq>=decisionNeed)
    :(rec==='CHECK'?T('beginnerFree'):rec==='FOLD'?T('beginnerOpenFold'):T('beginnerAgg'));
  const detailRows=
    `<div class="coach-row"><span>${T('strategyLabel')}</span><b>${T(R.strategyMode==='exploit'?'strategyExploit':'strategyBaseline')}</b></div>`+
    (pos?`<div class="coach-row"><span>${T('position')}</span><b>${pos}${early?' (early)':late?' (late)':''}</b></div>`:'')+
    (opps>0?`<div class="coach-row"><span>${state.stage==='preflop'?T('postflopOrder'):T('actingOrder')}</span><b>${actsFirst?T('firstToAct'):actsLast?T('lastToAct'):(ordIdx+1)+' '+T('ofN')+' '+ordLen}</b></div>`:'')+
    `<div class="coach-row"><span>${T('yourStack')}</span><b>${bbs(p.chips+p.bet)}</b></div>`+
    (showM?`<div class="coach-row"><span>M-ratio</span><b>M = ${M>99?'99+':Math.round(M)} · ${T('zone'+mZone)}</b></div>`:'')+
    coachProseHtml(allReasons,[]);
  $('coachBody').innerHTML=
    `<div class="coach-decision"><span class="coach-decision-label">${coachDecisionLabel()}</span><div class="rec ${rec}">${recLabel}</div></div>`+
    `<div class="coach-glance">`+
      coachMetric(T('yourHand'),handDesc,'wide')+
      (openingDecision
        ?coachMetric(T('playersBehind'),String(opps),'emphasis')+
          coachMetric(T('openingDecision'),T('raiseOrFold'))
        :coachMetric(T('winChance'),`~${pct(eq)} ${T('vs')} ${opps} ${opps===1?T('opp'):T('opps')}`,'emphasis')+
          coachMetric(T('potOdds'),priceMetric))+
    `</div>`+
    coachConfidenceHtml(R)+
    `<div class="coach-beginner-read"><span>💡</span><p>${beginnerRead}</p></div>`+
    coachBluffHtml(R.bluffInfo)+
    coachIcmHtml(R.icmInfo)+
    (liveMathRows?`<div class="coach-live-math"><span class="coach-live-math-title">${coachMathLabel()}</span>${liveMathRows}</div>`:'')+
    (keyReason?`<div class="coach-key-reason"><span class="coach-key-reason-label">${coachReasonLabel()}</span>${keyReason}</div>`:'')+
    `<details class="coach-details"><summary>${coachDetailsLabel()}</summary><div class="coach-details-body">`+
      detailRows+
      rangePanel+
      (R.chartInfo&&!rangeCharts.length?`<button class="chart-link" id="chartViewBtn">${T('viewChart')}</button>`:'')+
      mixTip(rec,R)+
    `</div></details>`;
  $('coach').scrollTop=0;
  let activeChart=R.chartInfo;
  if(rangeCharts.length){
    activeChart=rangeCharts[0];
    const toggle=$('rangeToggleBtn'),disclosure=$('coachRangeDisclosure');
    if(toggle&&disclosure)toggle.onclick=()=>{
      coachRangeVisible=!coachRangeVisible;
      disclosure.classList.toggle('hidden',!coachRangeVisible);
      toggle.textContent=T(coachRangeVisible?'hideRange':'showRange');
      toggle.setAttribute('aria-expanded',String(coachRangeVisible));
    };
    $('coachBody').querySelectorAll('[data-range-index]').forEach(btn=>btn.onclick=()=>{
      const idx=Number(btn.dataset.rangeIndex),info=rangeCharts[idx];
      if(!info)return;
      activeChart=info;
      $('coachBody').querySelectorAll('[data-range-index]').forEach(b=>b.classList.toggle('on',b===btn));
      const title=$('coachRangeTitle'),meta=$('coachRangeMeta'),matrix=$('coachRangeMatrix');
      if(title)title.textContent=`${info.pos} — ${T('chartTitleRange')}`;
      if(meta)meta.innerHTML=rangeMatrixMetaHtml(info);
      if(matrix)matrix.innerHTML=rangeMatrixCells(info,R.code,true);
    });
  }
  if(R.chartInfo){
    const cb=$('chartViewBtn');
    if(cb) cb.onclick=()=>showChartMatrix(activeChart,R.code);
  }
  coachRecNow={rec,stage:state.stage,evs,coachT:R.coachT,eq,eqAdj:R.eqAdj??eq,odds,needEq:R.needEq,callAmt,pot,
    airPen:R.airPen||0,opps,pos,confidenceKind:coachConfidence(R).kind,rangeCharts,heroCode:R.code};

  /* GTO mini-solver: heads-up postflop spots */
  if(state.stage!=='preflop'){
    if(opps===1){
      const villain=inHand().find(q=>q!==p);
      $('coachBody').insertAdjacentHTML('beforeend',`<div id="gtoBox">${C('gtoSolving')}</div>`);
      const turnToken=state.handNum+'-'+state.stage+'-'+state.turnIdx;
      setTimeout(()=>{
        const box=$('gtoBox'); if(!box)return;
        if(state.handNum+'-'+state.stage+'-'+state.turnIdx!==turnToken)return;
        try{
          const res=gtoSolve({
            board:state.board, P0:pot, toCall:callAmt,
            eff:Math.min(p.chips,villain.chips),
            heroCap:p.rangeCap||1, villCap:villain.rangeCap||1, villFloor:villain.rangeFloor||0,
            heroHand:p.hole, villFirst:!villain.acted
          });
          if(!res||res.unavailable){box.textContent=C('gtoUnavail',res?.unavailable||'range');return;}
          const best=res.actions.reduce((a,b)=>b.freq>a.freq?b:a);
          box.innerHTML='<h4>⚖️ GTO MIX (CFR, abstracted)</h4>'+
            res.actions.map(a=>`<div class="grow${a===best?' top':''}"><span>${a.name}</span><span>${Math.round(a.freq*100)}%</span><span>EV ${a.ev>=0?'+':'−'}${usd(Math.abs(Math.round(a.ev)))}</span></div>`).join('')+
            `<div class="gnote">${C('gtoNote')}</div>`;
        }catch(err){box.textContent=C('gtoFail');}
      },40);
    }else{
      $('coachBody').insertAdjacentHTML('beforeend',`<div id="gtoBox"><div class="gnote">${C('gtoMulti',opps)}</div></div>`);
    }
  }
}
function coachWait(){
  if(HAS_DOM) $('coachBody').innerHTML=`<div class="waiting">${T('waiting')}</div>`;
}
function renderFeedback(net){
  if(!HAS_DOM)return;
  const el=$('coachFeed');
  el.classList.remove('hidden');
  const n=state.humanDecisions.length, f=state.humanDecisions.filter(d=>d.followed).length;
  let html=`<b>${T('hand')}#${state.handNum}:</b> <span class="${net>=0?'pos':'neg'}">${net>=0?'+':'−'}${usd(Math.abs(net))}</span>`;
  if(n>0){
    html+=` · ${T('followedCoach')} ${f}/${n}`;
    for(const d of state.humanDecisions.filter(x=>!x.followed))
      html+=`<div class="dev">${d.stage}: ${T('coachSaid')} ${recWord(d.rec)}, ${T('youChose')} ${actWord(d.action)}${d.evLoss>0?` <span class="neg">(−${usd(d.evLoss)} EV)</span>`:''}</div>`;
    if(f===n&&net<0)html+=`<div class="dev">🎯 ${T('processGoodBad')}</div>`;
    else if(f<n&&net>0)html+=`<div class="dev">⚠️ ${T('processBadGood')}</div>`;
  }
  html+=rewardSummaryLine(state.lastRewardSummary);
  el.innerHTML=html;
}
function renderKoBonusTop(){
  if(!HAS_DOM||!state)return;
  const wrap=$('tKoWrap'), ko=$('tKoBonus');
  if(!wrap||!ko)return;
  const cash=isCashGame();
  wrap.classList.toggle('hidden',cash);
  if(cash)return;
  const on=!!state.cfg.koBonus;
  ko.textContent=on?'ON':'OFF';
  ko.className=on?'on':'off';
  wrap.title=on?'KO bonus enabled: eliminating a player pays an extra chip bounty.':'KO bonus disabled: eliminations do not pay extra chips.';
}
function renderStats(){
  if(!HAS_DOM||!state||!state.sessStats||BENCH)return;
  const s=state.sessStats,l=lifeStats;
  const fp=S=>S.decisions>0?Math.round(100*S.followed/S.decisions)+'%':'—';
  const pof=(a,b)=>b>0?Math.round(100*(a||0)/b)+'%':'—';
  const af=(s.aCalls||0)>0?((s.aBets||0)/s.aCalls).toFixed(1):((s.aBets||0)>0?'∞':'—');
  const cash=isCashGame();
  const blind=cash?(state.cfg?.startBlind||state.bb||1):1;
  const bbNet=cash?Math.round((s.net/blind)*10)/10:0;
  const bb100=cash&&s.hands>0?Math.round((bbNet/s.hands)*1000)/10:0;
  const fmtBB=v=>(v>=0?'+':'−')+Math.abs(v).toFixed(1)+' BB';
  $('coachStats').innerHTML=
    `<h4>${T('thisGame')}</h4>`+
    `<div class="srow"><span>${T('handsPW')}</span><b>${cash?s.hands:`${s.hands} / ${s.won}`}</b></div>`+
    (cash
      ?`<div class="srow"><span>${T('statBB100')}</span><b class="${bb100>=0?'pos':'neg'}">${bb100>=0?'+':''}${bb100}</b></div>`+
       `<div class="srow"><span>${T('statNetBB')}</span><b class="${bbNet>=0?'pos':'neg'}">${fmtBB(bbNet)}</b></div>`+
       `<div class="srow"><span>${T('statRebuys')}</span><b>${state.cashRebuys||0}</b></div>`
      :`<div class="srow"><span>${T('net')}</span><b>${s.net>=0?'+':'−'}${usd(Math.abs(s.net))}</b></div>`)+
    `<div class="srow"><span>${T('biggestPot')}</span><b>${s.biggest?usd(s.biggest):'—'}</b></div>`+
    `<div class="srow"><span>${T('vpipPfr')}</span><b>${pof(s.vpipH,s.hands)} / ${pof(s.pfrH,s.hands)}</b></div>`+
    `<div class="srow"><span>${T('aggF')}</span><b>${af}</b></div>`+
    `<div class="srow"><span>${T('wonSd')}</span><b>${s.sdSeen?`${s.sdWon}/${s.sdSeen} (${pof(s.sdWon,s.sdSeen)})`:'—'}</b></div>`+
    `<div class="srow"><span>${T('evLeak')}</span><b>${s.evLost?'−'+usd(s.evLost):'$0'}</b></div>`+
    `<div class="srow"><span>${T('coachFollowed')}</span><b>${fp(s)}</b></div>`+
    `<h4 style="margin-top:10px;">${T('lifetime')}</h4>`+
    `<div class="srow"><span>${T('handsPW')}</span><b>${l.hands} / ${l.won}</b></div>`+
    `<div class="srow"><span>${T('net')}</span><b>${l.net>=0?'+':'−'}${usd(Math.abs(l.net))}</b></div>`+
    `<div class="srow"><span>${T('coachFollowed')}</span><b>${fp(l)}</b></div>`;
  renderKoBonusTop();
  renderRewardTop();
}
/* ---------- hand replayer: browse hands (this game or saved history), step through streets ---------- */
let rpHandIdx=0, rpStreet=99, rpAll=null, rpDecisionIdx=0, rpCfAction='';
const STREET_NM=['Preflop','Flop','Turn','River'];
function findReplayHandIndex(hands,value,currentIdx=0){
  const wanted=Number(value);
  if(!Array.isArray(hands)||!Number.isInteger(wanted))return -1;
  const matches=[];
  hands.forEach((h,i)=>{if(Number(h&&h.hand)===wanted)matches.push(i);});
  if(!matches.length)return -1;
  return matches.reduce((best,i)=>
    Math.abs(i-currentIdx)<Math.abs(best-currentIdx)?i:best,matches[0]);
}
function jumpReplayToHand(value){
  const arr=rpAll||(state&&state.gameHands)||[];
  const input=$('rpHandInput');
  const idx=findReplayHandIndex(arr,value,rpHandIdx);
  if(idx<0){
    if(input){
      input.setCustomValidity(T('handNotFound')(value));
      input.reportValidity();
    }
    return false;
  }
  if(input)input.setCustomValidity('');
  rpHandIdx=idx;
  rpStreet=99;
  rpDecisionIdx=0;rpCfAction='';
  rpRender();
  return true;
}
function parseCardCode(code){
  const rank=code.slice(0,-1).toUpperCase();
  return {r:rank==='T'?10:+(RANK_CH_INV[rank]||2), s:Math.max(0,'shdc'.indexOf(code.slice(-1)))};
}
const RANK_CH_INV=Object.fromEntries(Object.entries(RANK_CH).map(([k,v])=>[v,k]));
function counterfactualActionKey(action){
  return action==='fold'||action==='FOLD'?'FOLD':action==='raise'||action==='RAISE'||action==='ALLIN'?'RAISE':'CALL';
}
function counterfactualModel(d){
  const captured=d&&d.evs&&['FOLD','CALL','RAISE'].every(k=>Number.isFinite(Number(d.evs[k])));
  if(captured)return {evs:Object.fromEntries(['FOLD','CALL','RAISE'].map(k=>[k,Math.round(Number(d.evs[k]))])),captured:true};
  const eq=clamp(Number(d?.eqAdj??d?.eq)||0,0,1);
  const pot=Math.max(0,Number(d?.pot)||0),callAmt=Math.max(0,Number(d?.callAmt)||0);
  const opps=Math.max(1,Number(d?.opps)||1);
  const raiseCost=Math.max(callAmt*2,Math.round(pot*.66),1);
  const foldEquity=clamp(.42-.09*(opps-1),.08,.45);
  return {captured:false,evs:{
    FOLD:0,
    CALL:Math.round(callAmt>0?eq*(pot+callAmt)-callAmt:eq*pot),
    RAISE:Math.round(foldEquity*pot+(1-foldEquity)*(eq*(pot+2*raiseCost)-raiseCost))
  }};
}
function counterfactualVisibleDecisions(hand){
  const stageIndex={preflop:0,flop:1,turn:2,river:3};
  return (hand?.myDecisions||[]).filter(d=>(stageIndex[d.stage]??3)<=rpStreet);
}
function counterfactualActionLabel(key,d){
  if(key==='FOLD')return recWord('FOLD');
  if(key==='CALL')return recWord((Number(d.callAmt)||0)>0?'CALL':'CHECK');
  return recWord(d.rec==='ALLIN'?'ALLIN':'RAISE');
}
function renderCounterfactualExplorer(hand){
  const decisions=counterfactualVisibleDecisions(hand);
  if(!decisions.length)return '';
  rpDecisionIdx=clamp(rpDecisionIdx,0,decisions.length-1);
  const d=decisions[rpDecisionIdx],model=counterfactualModel(d),keys=['FOLD','CALL','RAISE'];
  const best=keys.reduce((a,k)=>model.evs[k]>model.evs[a]?k:a,keys[0]);
  const actual=counterfactualActionKey(d.action),coach=counterfactualActionKey(d.rec);
  if(!keys.includes(rpCfAction))rpCfAction=best;
  const selected=rpCfAction,eq=Math.round(clamp(Number(d.eqAdj??d.eq)||0,0,1)*100);
  const need=Math.round(clamp(Number(d.needEq)||0,0,1)*100);
  const raiseTo=d.raiseTo>0?usd(d.raiseTo):usd(Math.max(Number(d.callAmt)||0,Math.round((Number(d.pot)||0)*.66)));
  const why=selected==='FOLD'?T('cfFoldWhy')
    :selected==='CALL'?(Number(d.callAmt)||0)>0?T('cfCallWhy')(eq,need,usd(Number(d.callAmt)||0)):T('cfCheckWhy')(eq)
    :T('cfRaiseWhy')(eq,raiseTo);
  return `<section id="rpCounterfactual" class="cf-explorer"><div class="cf-head"><div><h3>↗ ${T('cfTitle')}</h3><p>${T('cfSub')}</p></div>`+
    `<span class="cf-source ${model.captured?'captured':'estimated'}">${T(model.captured?'cfCaptured':'cfEstimated')}</span></div>`+
    `<div class="cf-decision-tabs">${decisions.map((x,i)=>`<button type="button" data-cf-decision="${i}" class="${i===rpDecisionIdx?'on':''}">`+
      `${T('cfDecision')(i+1)} · ${reviewStreetLabel(x.stage)}</button>`).join('')}</div>`+
    `<div class="cf-context"><span>${T('cfActual')}: <b>${counterfactualActionLabel(actual,d)}</b></span>`+
      `<span>${T('cfCoach')}: <b>${counterfactualActionLabel(coach,d)}</b></span></div>`+
    `<div class="cf-actions">${keys.map(key=>{
      const gap=Math.max(0,model.evs[best]-model.evs[key]);
      return `<button type="button" data-cf-action="${key}" class="cf-action ${key===selected?'selected':''} ${key===best?'best':''}">`+
        `<span class="cf-action-name">${counterfactualActionLabel(key,d)}</span>`+
        `<strong>${model.evs[key]>=0?'+':'−'}${usd(Math.abs(model.evs[key]))}</strong>`+
        `<small>${T('cfEv')}${gap?` · ${T('cfLoss')} −${usd(gap)}`:''}</small>`+
        `<em>${key===actual?T('cfActual'):''}${key===actual&&key===coach?' · ':''}${key===coach?T('cfCoach'):''}${key===best?`${key===actual||key===coach?' · ':''}${T('cfBest')}`:''}</em></button>`;
    }).join('')}</div>`+
    `<div class="cf-explanation"><b>${counterfactualActionLabel(selected,d)}</b><p>${why}</p><small>${T('cfAssumption')}</small></div></section>`;
}
function wireCounterfactualExplorer(hand){
  const root=$('rpCounterfactual');
  if(!root)return;
  const refresh=()=>{
    const current=$('rpCounterfactual');
    if(!current)return;
    current.outerHTML=renderCounterfactualExplorer(hand);
    wireCounterfactualExplorer(hand);
  };
  root.querySelectorAll('[data-cf-decision]').forEach(btn=>btn.onclick=()=>{
    rpDecisionIdx=Number(btn.dataset.cfDecision)||0;rpCfAction='';refresh();
  });
  root.querySelectorAll('[data-cf-action]').forEach(btn=>btn.onclick=()=>{
    rpCfAction=btn.dataset.cfAction;refresh();
  });
}
function rpRender(){
  if(!HAS_DOM)return;
  const arr=rpAll||(state&&state.gameHands)||[];
  const body=$('rpBody');
  if(!arr.length){
    $('rpHandLbl').textContent='—'; $('rpStreetLbl').textContent='—';
    ['rpPrevH','rpNextH','rpPrevS','rpNextS'].forEach(id=>$(id).disabled=true);
    $('rpHandInput').value=''; $('rpHandInput').disabled=true; $('rpGoH').disabled=true;
    body.innerHTML=`<p style="color:var(--dim);font-size:13px;margin-bottom:14px;">${T('noHands')}</p>`;
    return;
  }
  rpHandIdx=clamp(rpHandIdx,0,arr.length-1);
  const e=arr[rpHandIdx];
  /* split action log into street segments using the dealt-card markers */
  const segs=[[]];
  for(const ln of e.actions){
    if(/^— (Flop|Turn|River):/.test(ln)) segs.push([]);
    segs[segs.length-1].push(ln);
  }
  rpStreet=clamp(rpStreet,0,segs.length-1);
  const final=rpStreet===segs.length-1;
  const boardN=segs.length===1?e.board.length:([0,3,4,5][rpStreet]??e.board.length);
  const shownLog=segs.slice(0,rpStreet+1).flat();
  const net=e.myNet!=null?e.myNet:0;
  const when=rpAll&&e.t?` · ${new Date(e.t).toLocaleDateString()} ${new Date(e.t).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}`:'';
  $('rpHandLbl').textContent=`${T('hand')}#${e.hand} (${rpHandIdx+1}/${arr.length}) · ${net>=0?'+':'−'}${usd(Math.abs(net))}${when}`;
  const handNumbers=arr.map(h=>Number(h&&h.hand)).filter(Number.isFinite);
  const currentHand=Number.isFinite(Number(e.hand))?Number(e.hand):rpHandIdx+1;
  const handMin=handNumbers.length?Math.min(...handNumbers):1;
  const handMax=handNumbers.length?Math.max(...handNumbers):arr.length;
  const jumpInput=$('rpHandInput');
  jumpInput.disabled=false; $('rpGoH').disabled=arr.length<2;
  jumpInput.min=String(handMin);
  jumpInput.max=String(handMax);
  jumpInput.value=String(currentHand);
  jumpInput.setCustomValidity('');
  const stNames=[T('preflop'),T('flop'),T('turnSt'),T('riverSt')];
  $('rpStreetLbl').textContent=segs.length===1&&e.board.length?T('fullHand'):(stNames[rpStreet]||T('preflop'));
  $('rpPrevH').disabled=rpHandIdx<=0; $('rpNextH').disabled=rpHandIdx>=arr.length-1;
  $('rpPrevS').disabled=rpStreet<=0;  $('rpNextS').disabled=rpStreet>=segs.length-1;
  const board=e.board.slice(0,Math.min(boardN,e.board.length)).map(c=>cardHTML(parseCardCode(c))).join('');
  body.innerHTML=
    `<div class="rp-board">${board||'<span style="color:var(--dim);font-size:13px;">(preflop)</span>'}</div>`+
    e.players.map(q=>
      `<div class="rp-row"><span style="font-size:18px;">${q.avatar||''}</span><span class="nm">${q.name}</span>`+
      `<span class="hole">${q.cards.map(c=>cardHTML(parseCardCode(c),true)).join('')}</span>`+
      `<span class="tag${q.won&&final?' win':''}">${final?(q.won?T('won'):q.folded?T('foldedTag'):T('showdown')):''}</span></div>`
    ).join('')+
    (final?`<div class="rp-result">${e.result}</div>`:'')+
    renderCounterfactualExplorer(e)+
    `<div class="rp-log">${shownLog.map(l=>`<div>${l}</div>`).join('')}</div>`;
  wireCounterfactualExplorer(e);
}
function showReplay(){
  if(!HAS_DOM)return;
  rpAll=null;           // in-game: this game's hands
  rpHandIdx=((state&&state.gameHands)||[]).length-1;
  rpStreet=99;          // open on the final street
  rpDecisionIdx=0;rpCfAction='';
  rpRender();
  openDialog($('replayOv'),'rpTitle');
}
function showHistoryReplay(){
  if(!HAS_DOM)return;
  let hist=[];
  try{hist=JSON.parse(localStorage.getItem('sg_poker_history')||'[]');}catch(e){}
  rpAll=hist;
  rpHandIdx=hist.length-1; rpStreet=99;rpDecisionIdx=0;rpCfAction='';
  rpRender();
  openDialog($('replayOv'),'rpTitle');
}

function raiseAllInAmt(){
  const p=state.players[0];
  return p?p.bet+p.chips:0;
}
function getRaiseSliderAmt(){
  const sl=$('raiseSlider');
  if(sl&&sl.dataset.exact) return +sl.dataset.exact;
  return sl?+sl.value:0;
}
function clearRaiseExact(){
  const sl=$('raiseSlider'); if(sl) delete sl.dataset.exact;
}
function setRaiseExact(amt){
  const sl=$('raiseSlider'); if(!sl)return;
  sl.dataset.exact=String(amt);
  sl.value=Math.min(+sl.max, amt);
  updateRaiseLabel();
}
function setActionAmountButton(btn,label,amount){
  if(!btn)return;
  const text=(label.trim()+' '+amount).trim();
  if(btn.dataset.actionText===text)return;
  btn.dataset.actionText=text;
  btn.textContent='';
  const lab=document.createElement('span');
  lab.className='act-label';
  lab.textContent=label.trim();
  const amt=document.createElement('span');
  amt.className='act-amount';
  amt.textContent=amount;
  btn.append(lab,amt);
  btn.setAttribute('aria-label',text);
}

/* ---------- human actions ---------- */
function showActions(p){
  if(!HAS_DOM)return;
  const callAmt=Math.min(state.currentBet-p.bet,p.chips);
  sfx('alert'); haptic([16,30,16]);
  $('waitMsg').textContent='';
  $('humanCtls').classList.remove('hidden');
  $('callBtn').textContent= callAmt<=0 ? T('check') : (callAmt>=p.chips?`${T('call')} ${usd(callAmt)} (${bbs(callAmt)}) ${T('allin').toLowerCase()}`:`${T('call')} ${usd(callAmt)} (${bbs(callAmt)})`);
  $('foldBtn').disabled=false;
  const minTarget=Math.min(state.currentBet+state.lastRaiseSize, p.bet+p.chips);
  const maxTarget=p.bet+p.chips;
  const canRaise=maxTarget>state.currentBet;
  $('raiseCtl').style.visibility=canRaise?'visible':'hidden';
  if(canRaise){
    const sl=$('raiseSlider');
    clearRaiseExact();
    sl.min=minTarget; sl.max=maxTarget; sl.step=state.sb; sl.value=minTarget;
    updateRaiseLabel();
  }
  try{ updateCoach(p); }catch(err){ $('coachBody').innerHTML=`<div class="waiting">${C('coachErr')}</div>`; }
  syncActFab();
}
function hideActions(){
  if(!HAS_DOM)return;
  $('humanCtls').classList.add('hidden');
  $('waitMsg').textContent='';
  coachWait();
  setActBar(false);
  syncActFab();
}
function updateRaiseLabel(){
  const v=getRaiseSliderAmt();
  const p=state.players[0];
  const allin=raiseAllInAmt();
  setActionAmountButton(
    $('raiseBtn'),
    v>=allin ? T('allin') : (state.currentBet>0?T('raiseTo'):T('betW')),
    `${usd(v)} (${bbs(v)})`
  );
  $('chipPreview').innerHTML=chipStackHTML(v,true);
}
function humanAct(type,amount){
  /* multiplayer client: send the action to the host instead of applying it locally */
  if(MP&&MP.role==='client'){
    if(!state||state.turnIdx!==0)return;
    MP.sentTok=state.handNum+'-'+state.stage+'-'+state.currentBet+'-'+state.players[0].bet;
    try{MP.conn.send({t:'act',type,amount});}catch(e){}
    hideActions();
    return;
  }
  const p=state.players[state.turnIdx];
  if(!p||!p.isHuman)return;
  const callNow=Math.min(state.currentBet-p.bet,p.chips);
  /* per-hand stat tracking (VPIP / PFR / aggression) */
  const hs=state.humanHandStats;
  if(hs){
    if(state.stage==='preflop'){
      if(type==='raise'){hs.vpip=true;hs.pfr=true;}
      else if(type==='call'&&callNow>0)hs.vpip=true;
    }else{
      if(type==='raise')hs.aBets++;
      else if(type==='call'&&callNow>0)hs.aCalls++;
    }
  }
  if(coachRecNow&&coachRecNow.stage===state.stage){
    const r=coachRecNow.rec;
    const followed = r==='FOLD' ? type==='fold'
      : (r==='CALL'||r==='CHECK') ? type==='call'
      : type==='raise';
    /* EV lost vs the coach's line (rough chip-EV model) */
    let evLoss=0;
    if(coachRecNow.evs){
      const key=t=>t==='fold'?'FOLD':t==='call'?'CALL':'RAISE';
      const recKey=r==='ALLIN'?'RAISE':r==='CHECK'?'CALL':r;
      evLoss=Math.max(0,Math.round((coachRecNow.evs[recKey]||0)-(coachRecNow.evs[key(type)]||0)));
    }
    const opps=inHand().length-1;
    const spot=typeof classifyLeakSpot==='function'?classifyLeakSpot(callNow,opps):classifyLeakSpotRetro({stage:state.stage,action:type});
    const potType=opps>=2?'multiway':(state.preflopRaiseCount||0)>=2?'threeBet'
      :(state.preflopRaiseCount||0)>=1?'singleRaised':'unopened';
    const decisionContext={stage:state.stage,rec:r,action:type,followed,evLoss,spot,opps,
      pos:coachRecNow.pos||'',confidenceKind:coachRecNow.confidenceKind||'heuristic',
      pot:coachRecNow.pot,callAmt:coachRecNow.callAmt,eq:coachRecNow.eq,needEq:coachRecNow.needEq,
      eqAdj:coachRecNow.eqAdj,raiseTo:coachRecNow.coachT||0,
      evs:coachRecNow.evs?{FOLD:coachRecNow.evs.FOLD,CALL:coachRecNow.evs.CALL,RAISE:coachRecNow.evs.RAISE}:null,
      heroCode:coachRecNow.heroCode||'',
      stackBB:state.bb>0?Math.round((p.chips+p.bet)/state.bb*10)/10:0,potType,tableSize:alive().length,
      logIndex:(state.handLog||[]).length};
    if(evLoss>0)decisionContext.rangeSnapshots=(coachRecNow.rangeCharts||[]).slice(0,3).map(rangeSnapshot).filter(Boolean);
    state.humanDecisions.push(decisionContext);
    if(evLoss>0&&state.sessStats){
      const air=!!(coachRecNow.airPen>=0.1);
      state.sessStats.evLost=(state.sessStats.evLost||0)+evLoss;
      (state.gameDecisions=state.gameDecisions||[]).push({hand:state.handNum,...decisionContext,air});
    }
    if(!followed){
      const lesson=typeof coachMicroLesson==='function'?coachMicroLesson(coachRecNow,type):'';
      if(lesson) showInstantLesson(lesson);
    }
    coachRecNow=null;
  }
  haptic(type==='raise'?[10,20,10]:8);
  hideActions();
  applyAction(p,type,amount);
  state.turnIdx=(p.i+1)%state.players.length;
  promptNext();
}

/* ---------- next hand / overlays ---------- */
function showNextBtn(autoMs){
  if(!HAS_DOM){ setTimeout(startHand,autoMs); return; }
  clearTimeout(nextTimer);
  /* auto-advance if auto mode is on, OR if nobody could act this hand (all-in from blinds) —
     waiting for a click when there was nothing to decide is pointless */
  if($('autoNext').checked||state.noActionHand){
    nextTimer=setTimeout(()=>{ if(!state.gameOver) doNextHand(); },autoMs);
  }else{
    $('nextHandBtn').classList.remove('hidden');
  }
}
function hideNextBtn(){ if(HAS_DOM){$('nextHandBtn').classList.add('hidden');} clearTimeout(nextTimer); }
function doNextHand(){ hideNextBtn(); startHand(); }

function saveGameRecord(won,place){
  if(BENCH||!state)return;
  try{
    const cash=isCashGame();
    const net=cash?getMode().sessionPnL(state):(state.sessStats?state.sessStats.net:0);
    const startBlind=cash?(state.cfg?.startBlind||state.bb||1):0;
    const startBB=cash?(state.cfg?.startBB||0):0;
    const bbNet=cash&&startBlind>0?net/startBlind:0;
    const bbPer100=cash&&state.handNum>0?(bbNet/state.handNum)*100:0;
    const a2=JSON.parse(localStorage.getItem('sg_poker_games')||'[]');
    a2.push({gameId:state.gameId,t:Date.now(),gameType:state.cfg?.gameType||'sng',
      mp:!!(state.cfg&&(state.cfg.mpRemotes||state.cfg.mpClient)),
      n:state.cfg?state.cfg.numPlayers:0,diff:state.cfg?state.cfg.difficulty:'medium',
      tableScenario:state.cfg?.tableScenario||'balanced',
      place:cash?0:(won?1:(place||0)),hands:state.handNum,rebuys:cash?(state.cashRebuys||0):0,
      net,evLost:state.sessStats?(state.sessStats.evLost||0):0,
      startBlind,startBB,bbNet,bbPer100,
      decisions:(state.gameDecisions||[]).slice(),
      series:(gameSeries||[]).slice(-300)});
    while(a2.length>200)a2.shift();
    localStorage.setItem('sg_poker_games',JSON.stringify(a2));
  }catch(e){}
}
function loadGames(){
  try{return JSON.parse(localStorage.getItem('sg_poker_games')||'[]');}catch(e){return [];}
}
function loadHandHistory(){
  try{
    const hist=JSON.parse(localStorage.getItem('sg_poker_history')||'[]');
    return Array.isArray(hist)?hist:[];
  }catch(e){return [];}
}
function replayHandTime(h){
  const t=h&&h.t;
  if(!t)return 0;
  const ms=typeof t==='number'?t:Date.parse(t);
  return Number.isFinite(ms)?ms:0;
}
function replayHandsForGame(g){
  const hist=loadHandHistory();
  if(!g||!hist.length)return [];
  const gid=g.gameId==null?'':String(g.gameId);
  let hands=gid?hist.filter(h=>String(h.gameId??'')===gid):[];
  if(!hands.length&&g.t){
    const end=Number(g.t)+120000;
    const nHands=Math.max(0,Number(g.hands)||0);
    if(Number.isFinite(end)){
      hands=hist.filter(h=>{
        const ms=replayHandTime(h);
        return !ms||ms<=end;
      }).slice(nHands?-nHands:undefined);
    }
  }
  return hands.slice().sort((a,b)=>
    (Number(a.hand)||0)-(Number(b.hand)||0)||replayHandTime(a)-replayHandTime(b)
  );
}
function paidPlaces(n){ return PAYOUTS(n||9).length; }
function evSparklineSVG(games){
  if(!games||games.length<2)return '';
  const series=games.map((g,i)=>({h:i+1,c:games.slice(0,i+1).reduce((s,x)=>s+(x.evLost||0),0)}));
  return sparklineSVG(series);
}
let revFilter='all';
function cashBB100(games){
  const cash=games.filter(g=>g.gameType==='cash'&&g.hands>0);
  if(!cash.length)return 0;
  const bbTot=cash.reduce((s,g)=>s+(g.bbNet!=null?g.bbNet:(g.startBlind>0?(g.net||0)/g.startBlind:0)),0);
  const hands=cash.reduce((s,g)=>s+g.hands,0);
  return hands>0?Math.round(bbTot/hands*1000)/10:0;
}
function renderAdaptiveAIReview(games){
  if(typeof aiHumanRead!=='function')return '';
  const difficulty=(state?.cfg?.difficulty||games?.[0]?.diff||'medium').toLowerCase();
  const read=aiHumanRead(difficulty);
  const profile=AI_ADAPT_PROFILE[difficulty]||AI_ADAPT_PROFILE.medium;
  let insight=T('adaptiveAiBalanced');
  if(read.fold>.49)insight=T('adaptiveAiOverfold');
  else if(read.fold<.32||read.call>.41)insight=T('adaptiveAiSticky');
  else if(read.postAgg>.43)insight=T('adaptiveAiAggressive');
  else if(read.checks>.42)insight=T('adaptiveAiPassive');
  else if(read.preAgg>.30)insight=T('adaptiveAiPreAgg');
  if(!read.reliable)insight=T('adaptiveAiNeedMore')(Math.max(0,profile.minActions-read.sample));
  const confidence=Math.round(read.confidence*100);
  const modes=[
    ['easy',T('adaptiveAiEasy'),15],
    ['medium',T('adaptiveAiMedium'),55],
    ['hard',T('adaptiveAiHard'),100]
  ];
  const strengthLabel=lang==='fr'?'de force adaptative':lang==='es'?'de fuerza adaptativa':'adaptation strength';
  return `<section class="adaptive-ai-review"><div class="adaptive-ai-head"><div>`+
    `<h3>🧠 ${T('adaptiveAiTitle')}</h3><p>${T('adaptiveAiSub')}</p></div>`+
    `<span class="adaptive-ai-confidence">${T('adaptiveAiSample')(read.sample)} · ${read.reliable?T('adaptiveAiReliable'):T('adaptiveAiEarly')} ${confidence}%</span></div>`+
    `<div class="adaptive-ai-meters">${modes.map(([id,label,pct])=>
      `<div class="adaptive-ai-meter ${id===difficulty?'current':''}"><b>${label}</b>`+
      `<span>${pct}% ${strengthLabel}${id===difficulty?' · ●':''}</span></div>`
    ).join('')}</div><p class="adaptive-ai-read">💡 ${insight}</p></section>`;
}
function showSessionReview(){
  if(!HAS_DOM)return;
  const allGames=loadGames().filter(g=>!g.mp).reverse();
  const games=revFilter==='cash'?allGames.filter(g=>g.gameType==='cash')
    :revFilter==='sng'?allGames.filter(g=>g.gameType!=='cash'):allGames;
  const n=games.length;
  const sngGames=games.filter(g=>g.gameType!=='cash');
  const cashGames=games.filter(g=>g.gameType==='cash');
  const wins=sngGames.filter(g=>g.place===1).length;
  const itm=sngGames.filter(g=>g.place>0&&g.place<=paidPlaces(g.n)).length;
  const finishes=sngGames.filter(g=>g.place>0);
  const avgFin=finishes.length?finishes.reduce((s,g)=>s+g.place,0)/finishes.length:0;
  const netTot=games.reduce((s,g)=>s+(g.net||0),0);
  const evTot=games.reduce((s,g)=>s+(g.evLost||0),0);
  const cashHands=cashGames.reduce((s,g)=>s+g.hands,0);
  const cashNetBB=cashGames.reduce((s,g)=>s+(g.bbNet!=null?g.bbNet:(g.startBlind>0?(g.net||0)/g.startBlind:0)),0);
  const cashRebuys=cashGames.reduce((s,g)=>s+(g.rebuys||0),0);
  const bb100=cashBB100(cashGames);
  $('revIntro').textContent=T('revIntro');
  let summary='';
  if(revFilter==='cash'){
    summary=
      `<div class="rv"><span>${T('revGames')}</span><b>${n}</b></div>`+
      `<div class="rv"><span>${T('revCashHands')}</span><b>${cashHands}</b></div>`+
      `<div class="rv"><span>${T('revBB100')}</span><b class="${bb100>=0?'pos':'neg'}">${bb100>=0?'+':''}${bb100}</b></div>`+
      `<div class="rv"><span>${T('revCashNetBB')}</span><b class="${cashNetBB>=0?'pos':'neg'}">${cashNetBB>=0?'+':'−'}${Math.abs(cashNetBB).toFixed(1)} BB</b></div>`+
      `<div class="rv"><span>${T('revCashRebuys')}</span><b>${cashRebuys}</b></div>`+
      `<div class="rv"><span>${T('revEVLeaked')}</span><b class="neg">−${usd(evTot)}</b></div>`;
  }else if(revFilter==='sng'){
    summary=
      `<div class="rv"><span>${T('revGames')}</span><b>${n}</b></div>`+
      `<div class="rv"><span>${T('revWinRate')}</span><b>${n?Math.round(wins/n*100):0}%</b></div>`+
      `<div class="rv"><span>${T('revITM')}</span><b>${n?Math.round(itm/n*100):0}%</b></div>`+
      `<div class="rv"><span>${T('revAvgFinish')}</span><b>${avgFin?avgFin.toFixed(1):'—'}</b></div>`+
      `<div class="rv"><span>${T('revNet')}</span><b class="${netTot>=0?'pos':'neg'}">${netTot>=0?'+':'−'}${usd(Math.abs(netTot))}</b></div>`+
      `<div class="rv"><span>${T('revEVLeaked')}</span><b class="neg">−${usd(evTot)}</b></div>`;
  }else{
    summary=
      `<div class="rv"><span>${T('revGames')}</span><b>${n}</b></div>`+
      `<div class="rv"><span>${T('revWinRate')}</span><b>${sngGames.length?Math.round(wins/sngGames.length*100):0}%</b></div>`+
      `<div class="rv"><span>${T('revITM')}</span><b>${sngGames.length?Math.round(itm/sngGames.length*100):0}%</b></div>`+
      (cashGames.length?`<div class="rv"><span>${T('revBB100')}</span><b class="${bb100>=0?'pos':'neg'}">${bb100>=0?'+':''}${bb100}</b></div>`:'')+
      `<div class="rv"><span>${T('revNet')}</span><b class="${netTot>=0?'pos':'neg'}">${netTot>=0?'+':'−'}${usd(Math.abs(netTot))}</b></div>`+
      `<div class="rv"><span>${T('revEVLeaked')}</span><b class="neg">−${usd(evTot)}</b></div>`;
  }
  $('revSummary').innerHTML=summary;
  $('revSpark').innerHTML=n>=2?evSparklineSVG(games.slice().reverse()):'';
  $('revRewards').innerHTML=renderRewardReview();
  $('revAdaptiveAI').innerHTML=renderAdaptiveAIReview(games);
  $('revFocus').innerHTML=renderReviewFocus(games);
  $('revAnalytics').innerHTML=renderAdvancedAnalytics(games);
  $('revLeaks').innerHTML=renderRevLeaks(games.slice().reverse());
  $('revDecisionTools').innerHTML=renderReviewDecisionTools();
  renderReviewDecisions(games);
  wireReviewDecisionTools(games);
  if(!n){
    $('revList').innerHTML=`<p style="color:var(--dim);font-size:13px;">${T(revFilter==='cash'?'revNoGamesCash':'revNoGames')}</p>`;
  }else{
    $('revList').innerHTML=`<p style="color:var(--dim);font-size:12px;margin-bottom:8px;">${T('revReplay')}</p>`+
      games.map((g,i)=>{
        const when=new Date(g.t).toLocaleDateString();
        const net=g.net||0;
        const isCash=g.gameType==='cash';
        const badge=isCash?T('revCashBadge'):T('revSngBadge');
        const place=isCash?badge:(g.place===1?T('youWin'):g.place?T('ord')(g.place):'—');
        const rebuyTxt=isCash&&g.rebuys?` · ${g.rebuys} rebuy${g.rebuys!==1?'s':''}`:'';
        const bbTxt=isCash&&g.hands>0?` · ${(g.bbPer100!=null?g.bbPer100:0)>=0?'+':''}${Math.round((g.bbPer100||0)*10)/10} BB/100`:'';
        return `<div class="rev-game" data-idx="${i}" data-gid="${g.gameId||''}" role="button" tabindex="0"><div class="rg-main">`+
          `<div class="rg-title">${place} · ${g.n}p ${g.diff||''} · ${g.hands} hands</div>`+
          `<div class="rg-sub">${when}${rebuyTxt}${bbTxt}${g.evLost?` · EV −${usd(g.evLost)}`:''}</div></div>`+
          `<span class="rg-net ${net>=0?'pos':'neg'}">${net>=0?'+':'−'}${usd(Math.abs(net))}</span></div>`;
      }).join('');
    $('revList').querySelectorAll('.rev-game').forEach(el=>{
      const openGame=()=>{
        const g=games[Number(el.dataset.idx)];
        rpAll=replayHandsForGame(g);
        rpHandIdx=0; rpStreet=99;rpDecisionIdx=0;rpCfAction='';
        closeDialog($('reviewOv'));
        rpRender();
        openDialog($('replayOv'),'rpTitle');
      };
      el.onclick=openGame;
      el.onkeydown=e=>{
        if(e.key==='Enter'||e.key===' '){e.preventDefault();openGame();}
      };
    });
  }
  openDialog($('reviewOv'),'revTitle');
}
function sparklineSVG(series){
  if(!series||series.length<2)return '';
  const w=260,h=56,cs=series.map(p2=>p2.c);
  const mx=Math.max(...cs),mn=Math.min(...cs),rg=Math.max(mx-mn,1);
  const pts=series.map((p2,i)=>(i/(series.length-1)*w).toFixed(1)+','+(h-4-(p2.c-mn)/rg*(h-8)).toFixed(1)).join(' ');
  return `<svg width="${w}" height="${h}" style="margin:6px 0;"><polyline points="${pts}" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linejoin="round"/></svg>`;
}
function showGameOver(won,place){
  if(!HAS_DOM)return;
  clearResume();
  saveGameRecord(won,place);
  state.lastGameRewardSummary=null;
  if(!BENCH&&typeof recordRewardEvent==='function'&&!(state.cfg.mpRemotes||state.cfg.mpClient)){
    const comeback=Math.max(0,(state.rewardStartStack||0)-(state.rewardMinHeroChips||state.players[0].chips||0));
    state.lastGameRewardSummary=recordRewardEvent('gameEnd',{
      key:`game:${state.gameId}:end`,mode:'sng',won,place,hands:state.handNum,comeback,
      headsUpComeback:!!(won&&state.rewardWasHeadsUp&&state.rewardHeadsUpTrailed)
    });
  }
  render();
  $('ovEmoji').textContent=won?'🏆':'💀';
  $('ovTitle').textContent=won?T('youWin'):T('bustedTitle')(T('ord')(place));
  $('ovSub').textContent=won?T('youWinSub')(state.cfg.numPlayers-1,state.handNum):T('bustedSub')(state.handNum);
  $('ovSpark').innerHTML=sparklineSVG(gameSeries);
  $('ovRewards').innerHTML=renderRewardEndSummary(state.lastGameRewardSummary);
  /* blunder report: biggest EV leaks vs the coach this game */
  const gd=(state.gameDecisions||[]).slice().sort((a,b)=>b.evLoss-a.evLoss);
  const tot=gd.reduce((s,d)=>s+d.evLoss,0);
  const nDec=state.sessStats?state.sessStats.decisions:0;
  $('ovBlunders').innerHTML = nDec===0 ? '' : gd.length===0
    ? `<h3 class="bl-clean">${T('cleanGame')}</h3>`
    : `<h3>${T('evTotal')}: −${usd(tot)} (${gd.length} ${T('deviations')})</h3>`+
      gd.slice(0,5).map(d=>
        `<div class="bl-row"><span>${T('hand')}#${d.hand} · ${d.stage}</span>`+
        `<span class="bl-what">${T('coachSaid')} ${recWord(d.rec)} · ${T('youChose')} ${actWord(d.action)}</span>`+
        `<b>−${usd(d.evLoss)}</b></div>`).join('')+
      (gd.length>5?`<div class="bl-more">+ ${gd.length-5} ${T('smallerLeaks')}</div>`:'');
  openDialog($('overlay'),'ovTitle');
}
function showCashSessionEnd(){
  if(!HAS_DOM)return;
  state.gameOver=true;
  clearResume();
  const pnl=getMode().sessionPnL(state);
  saveGameRecord(false,0);
  state.lastGameRewardSummary=null;
  if(!BENCH&&typeof recordRewardEvent==='function'&&!(state.cfg.mpRemotes||state.cfg.mpClient)){
    state.lastGameRewardSummary=recordRewardEvent('gameEnd',{
      key:`cash:${state.gameId}:end`,mode:'cash',hands:state.handNum,pnl
    });
  }
  render();
  $('ovEmoji').textContent='💵';
  $('ovTitle').textContent=T('cashSessionEnd');
  $('ovSub').textContent=T('cashSessionSub')(state.handNum,state.cashRebuys||0,pnl);
  $('ovSpark').innerHTML=sparklineSVG(gameSeries);
  $('ovRewards').innerHTML=renderRewardEndSummary(state.lastGameRewardSummary);
  const gd=(state.gameDecisions||[]).slice().sort((a,b)=>b.evLoss-a.evLoss);
  const tot=gd.reduce((s,d)=>s+d.evLoss,0);
  const nDec=state.sessStats?state.sessStats.decisions:0;
  $('ovBlunders').innerHTML = nDec===0 ? '' : gd.length===0
    ? `<h3 class="bl-clean">${T('cleanGame')}</h3>`
    : `<h3>${T('evTotal')}: −${usd(tot)} (${gd.length} ${T('deviations')})</h3>`+
      gd.slice(0,5).map(d=>
        `<div class="bl-row"><span>${T('hand')}#${d.hand} · ${d.stage}</span>`+
        `<span class="bl-what">${T('coachSaid')} ${recWord(d.rec)} · ${T('youChose')} ${actWord(d.action)}</span>`+
        `<b>−${usd(d.evLoss)}</b></div>`).join('')+
      (gd.length>5?`<div class="bl-more">+ ${gd.length-5} ${T('smallerLeaks')}</div>`:'');
  openDialog($('overlay'),'ovTitle');
}
function ordinal(n){const s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);}

const TABLE_SCENARIO_KEYS={
  balanced:'Balanced',tight:'Tight',loose:'Loose',aggressive:'Aggressive',
  wild:'Wild',random:'Random',custom:'Custom'
};
const TABLE_PROFILE_META={
  rock:{emoji:'🪨',key:'profileRock'},station:{emoji:'📞',key:'profileStation'},
  shark:{emoji:'🦈',key:'profileShark'},maniac:{emoji:'🔥',key:'profileManiac'}
};
function tableCustomCountsFromDom(){
  const counts={rock:0,station:0,shark:0,maniac:0};
  if(!HAS_DOM)return counts;
  document.querySelectorAll('.table-role-count').forEach(el=>{
    counts[el.dataset.style]=clamp(Math.round(Number(el.value)||0),0,8);
  });
  return counts;
}
function setTableCustomCounts(counts){
  if(!HAS_DOM)return;
  document.querySelectorAll('.table-role-count').forEach(el=>{el.value=counts[el.dataset.style]||0;});
}
function selectedTableScenarioConfig(){
  if(!HAS_DOM)return {tableScenario:'balanced'};
  const tableScenario=normalizeTableScenario($('tableScenarioSel')?.value);
  const cfg={tableScenario};
  if(tableScenario==='custom')cfg.tableCustom=tableCustomCountsFromDom();
  return cfg;
}
function tableScenarioLineup(counts){
  return TABLE_STYLE_IDS.filter(id=>counts&&counts[id]>0)
    .map(id=>`${TABLE_PROFILE_META[id].emoji} ${T(TABLE_PROFILE_META[id].key)} ×${counts[id]}`).join(' · ');
}
function rescaleTableCustom(botCount){
  const current=tableCustomCountsFromDom();
  const weights=TABLE_STYLE_IDS.some(id=>current[id]>0)?current:TABLE_SCENARIOS.balanced.weights;
  setTableCustomCounts(allocateTableStyleCounts(weights,botCount,TABLE_SCENARIOS.balanced.priority));
}
function refreshTableScenarioSetup(numPlayers){
  if(!HAS_DOM)return true;
  const botCount=Math.max(1,(Number(numPlayers)||2)-1);
  const scenario=normalizeTableScenario($('tableScenarioSel')?.value);
  const key=TABLE_SCENARIO_KEYS[scenario];
  $('tableScenarioName').textContent=T('table'+key);
  $('tableScenarioDesc').textContent=T('tableDesc'+key);
  $('tableCustom').classList.toggle('hidden',scenario!=='custom');
  $('tableCustomStatus').classList.toggle('hidden',scenario!=='custom');
  let valid=true,line='';
  if(scenario==='random')line=T('tableRandomLine')(botCount);
  else{
    const custom=tableCustomCountsFromDom();
    const counts=scenario==='custom'?custom:tableScenarioCounts(scenario,botCount);
    line=tableScenarioLineup(counts);
    if(scenario==='custom'){
      const assigned=TABLE_STYLE_IDS.reduce((s,id)=>s+(custom[id]||0),0);
      valid=assigned===botCount;
      $('tableCustomStatus').textContent=valid?T('tableCustomTotal')(assigned,botCount):T('tableCustomInvalid')(botCount);
      $('tableCustomStatus').classList.toggle('invalid',!valid);
    }
  }
  $('tableScenarioLineup').textContent=line;
  $('startBtn').disabled=!valid;
  return valid;
}

function updateSetupMode(gameType){
  if(!HAS_DOM)return;
  const cash=gameType==='cash';
  /* Mode visibility must not reuse the disclosure's `hidden` class: doing so used
     to expand the KO explanation whenever Sit & Go controls were revealed. */
  document.querySelectorAll('#setup .sng-only').forEach(el=>el.classList.toggle('setup-mode-hidden',cash));
  const title=$('setupTitle');
  const sub=$('setupSub');
  if(title) title.textContent=T(cash?'titleCash':'titleSng');
  if(sub) sub.textContent=T(cash?'subCash':'sub');
  const buyLbl=document.querySelectorAll('#setup .row label.main')[3];
  if(buyLbl) buyLbl.textContent=T(cash?'stackDepth':'buyin');
  $('startBtn').textContent=T(cash?'startCash':'deal');
  $('modeSeg').querySelectorAll('button').forEach(b=>{
    b.classList.toggle('on',b.dataset.m===gameType);
  });
}

/* apply the chosen language to all static UI chrome */
function applyLang(){
  if(!HAS_DOM)return;
  const set=(id,k)=>{const el=$(id);if(el)el.textContent=T(k);};
  updateSetupMode(setupGameType);
  const rowKeys=['modeLbl','players','blinds','buyin','ante','speed','koBonusOpt','timerOpt','language','diff','tableStyle'];
  document.querySelectorAll('#setup .row label.main').forEach((el,i)=>{if(rowKeys[i])el.textContent=T(rowKeys[i]);});
  const buyLbl=document.querySelectorAll('#setup .row label.main')[3];
  if(buyLbl) buyLbl.textContent=T(setupGameType==='cash'?'stackDepth':'buyin');
  $('modeSeg').querySelectorAll('button').forEach(b=>{b.textContent=T(b.dataset.m==='cash'?'modeCash':'modeSng');});
  const aSel=$('anteSel'); if(aSel) aSel.options[0].text=T('noAnte');
  const radios=document.querySelectorAll('#setup .radios label');
  const spKeys=['turbo','standard','slow'];
  radios.forEach((el,i)=>{if(el.lastChild)el.lastChild.nodeValue=' '+T(spKeys[i]);});
  const dBtns=$('diffSeg').querySelectorAll('button');
  ['easy','medium','hard'].forEach((k,i)=>{if(dBtns[i])dBtns[i].textContent=T(k);});
  const scenarioSel=$('tableScenarioSel');
  if(scenarioSel)Array.from(scenarioSel.options).forEach(o=>{const k=TABLE_SCENARIO_KEYS[o.value];if(k)o.textContent=T('table'+k);});
  set('tableRoleRock','profileRock');set('tableRoleStation','profileStation');set('tableRoleShark','profileShark');set('tableRoleManiac','profileManiac');
  if($('tableRoleRock'))$('tableRoleRock').textContent='🪨 '+T('profileRock');
  if($('tableRoleStation'))$('tableRoleStation').textContent='📞 '+T('profileStation');
  if($('tableRoleShark'))$('tableRoleShark').textContent='🦈 '+T('profileShark');
  if($('tableRoleManiac'))$('tableRoleManiac').textContent='🔥 '+T('profileManiac');
  refreshTableScenarioSetup(+$('pCount').textContent||2);
  set('startBtn',setupGameType==='cash'?'startCash':'deal'); set('resumeBtn','resume'); set('reviewBtnTitle','review'); set('reviewBtnSub','reviewBtnSub');
  set('scenarioBtnTitle','scenarioBtn');set('scenarioBtnSub','scenarioBtnSub');set('scenarioTitle','scenarioTitle');set('scenarioSub','scenarioSub');
  set('scCardsLbl','scCards');set('scBoardLbl','scBoard');set('scPosLbl','scPos');set('scOppLbl','scOpps');
  set('scCardsHelp','scCardsHelp');set('scBoardHelp','scBoardHelp');
  set('scStackLbl','scStack');set('scPotLbl','scPot');set('scCallLbl','scCall');set('scProfileLbl','scProfile');set('scGameLbl','scGame');set('scActionLbl','scAction');
  set('scenarioAnalyze','scAnalyze');set('scenarioSave','scSave');set('scenarioShare','scShare');set('scenarioClose','scClose');
  const scProf=$('scProfile');if(scProf)['profileRock','profileStation','profileShark','profileManiac'].forEach((k,i)=>{if(scProf.options[i])scProf.options[i].textContent=['🪨 ','📞 ','🦈 ','🔥 '][i]+T(k);});
  const scGame=$('scGame');if(scGame){scGame.options[0].textContent=T('modeCash');scGame.options[1].textContent=T('modeSng');}
  const scAct=$('scAction');if(scAct)['scUnopened','scLimp','scRaise','scThreeBet','scCbet','scCheckRaise','scAllin'].forEach((k,i)=>{if(scAct.options[i])scAct.options[i].textContent=T(k);});
  scenarioBuildCardPickers();
  set('quickPlayTitle','quickPlayTitle');set('quickPlaySub','quickPlaySub');
  set('revTitle','revTitle'); set('revAllHands','revAllHands'); set('revClose','close');
  ['revFilterAll','revFilterCash','revFilterSng'].forEach(id=>set(id,id));
  set('resetLbl','resetData'); set('resetInfo','resetInfo');
  set('mpTitle','mpTitle'); set('mpSub','mpSub'); set('mpCreate','mpCreate'); set('mpJoinBtn','mpJoinB');
  set('mpLobbyTitle','mpLobbyTitle'); set('mpCopy','mpCopy'); set('mpFillLbl','mpFillLbl');
  set('mpStartBtn','mpStart'); set('mpLeave','mpLeave');
  set('mpAutoLbl1','mpAutoA'); set('mpAutoLbl2','mpAutoB'); set('emoLbl','react'); set('emoHint','reactHint'); set('timerInfo','timerInfo'); set('koBonusInfo','koBonusInfo');
  const mpn=$('mpName'); if(mpn)mpn.placeholder=T('mpNamePh');
  const mpc=$('mpCode'); if(mpc)mpc.placeholder=T('mpCodePh');
  const ci=$('chatIn'); if(ci)ci.placeholder=T('chatPh');
  /* topbar */
  const tn=(id,k)=>{const b=$(id);if(b&&b.parentNode.firstChild)b.parentNode.firstChild.nodeValue=T(k);};
  tn('tLevel','level'); tn('tHand','hand');
  const koTop=$('tKoWrap');
  if(koTop&&koTop.firstChild)koTop.firstChild.nodeValue=T('koBonusOpt')+' ';
  const up=$('tNext');
  if(up){up.parentNode.firstChild.nodeValue=T('blindsUpA'); up.parentNode.lastChild.nodeValue=T('blindsUpB');}
  const an=$('autoNextLbl'); if(an) an.textContent=T('autoNext');
  const cc=$('coachTopLbl'); if(cc) cc.textContent=T('coachLbl');
  set('quitBtn','quit');
  /* bottom bar + modals */
  set('logToggle','log'); set('replayBtn','lastHand'); set('exportBtn','exportH'); set('coachToggle','coachBtn'); set('nextHandBtn','nextHand');
  set('coachScrollHintLbl','coachScrollMore');
  set('foldBtn','fold'); set('prMin','min'); set('prHalf','halfPot'); set('prPot','pot'); set('prMax','allin');
  set('rpClose','close'); set('rpTitle','replayTitle'); set('ovBtn','playAgain'); set('chartClose','close');
  set('rpPrevH','handNavP'); set('rpNextH','handNavN'); set('rpPrevS','streetNavP'); set('rpNextS','streetNavN');
  set('rpJumpLbl','jumpHand'); set('rpGoH','jumpGo');
  const af=$('actFab'); if(af)af.textContent=T('actMenu');
  const ch=$('coach').querySelector('h3'); if(ch)ch.textContent=T('liveCoach');
  const w=$('coachBody').querySelector('.waiting'); if(w)w.textContent=T('waiting');
  $('langSel').value=lang; $('langTop').value=lang;
}
function setLang(v){
  lang=TR[v]?v:'en';
  try{localStorage.setItem('sg_poker_lang',lang);}catch(e){}
  applyLang();
  if(state&&state.sessStats) renderStats();
  /* refresh live views if mid-game */
  if(state&&!$('humanCtls').classList.contains('hidden')&&state.players[state.turnIdx]&&state.players[state.turnIdx].isHuman){
    showActions(state.players[state.turnIdx]);
  }
}

/* ===== emotes: quick reactions popping over seats ===== */
function showEmoteBtn(){
  if(!HAS_DOM)return;
  const el=$('emoBtn'); if(!el)return;
  el.classList.remove('hidden');
  try{
    if(!localStorage.getItem('sg_poker_emoSeen')){
      localStorage.setItem('sg_poker_emoSeen','1');
      el.classList.add('pulse');
      setTimeout(()=>el.classList.remove('pulse'),3500);
    }
  }catch(e){}
}
const EMOJI_PACKS={
  classic:['👍','😂','😱','🔥','🐔','🤝'],
  hype:['💥','🤑','⚡','🏆','😎','🚀'],
  elite:['🏆','💎','👑','🎯','🥶','🚀'],
  legend:['👑','💰','🏆','💎','🎰','⚡']
};
function currentEmojis(){
  const rs=rewardStateSafe();
  const pack=rs&&rs.equippedCosmetics?rs.equippedCosmetics.emotePack:'classic';
  return EMOJI_PACKS[pack]||EMOJI_PACKS.classic;
}
function renderEmoteButtons(){
  if(!HAS_DOM)return;
  const row=$('emoRow'); if(!row)return;
  const emojis=currentEmojis();
  row.innerHTML=emojis.map(e=>`<button>${e}</button>`).join('');
  row.querySelectorAll('button').forEach((bt,i)=>{bt.onclick=()=>{mpEmote(i);$('emoBar').classList.add('hidden');};});
}
function showEmote(localSeat,e){
  if(!HAS_DOM)return;
  const seat=$('seat'+localSeat); if(!seat)return;
  const d=document.createElement('div');
  const emojis=currentEmojis();
  d.className='emoPop'; d.textContent=emojis[e]||emojis[0]||'👍';
  d.style.left=(seat.offsetLeft)+'px';
  d.style.top=(seat.offsetTop+14)+'px';
  $('felt').appendChild(d);
  setTimeout(()=>{try{d.remove();}catch(err){}},1600);
}
function mpEmote(i){
  if(!MP){ showEmote(0,i); return; }   // solo: react at the bots, why not
  if(MP.role==='host'){
    showEmote(0,i);
    MP.conns.forEach(c=>{try{c.conn.send({t:'emo',seat:0,e:i});}catch(e){}});
  }else{
    try{MP.conn.send({t:'emo',e:i});}catch(e){}
  }
}
/* visible countdown on the acting seat — audible tic-tac for the last 5 seconds */
let tmrLastTick=0,tmrPrevBank=false;
if(HAS_DOM)setInterval(()=>{
  ttCheck();   // primary expiry enforcement — survives throttled/dropped setTimeouts
  document.querySelectorAll('.tmr').forEach(el=>{if(el.textContent){el.textContent='';el.classList.remove('low');}});
  if(!state||!state.turnDeadline||state.handOver||state.gameOver){tmrPrevBank=false;return;}
  const left=Math.ceil((state.turnDeadline-Date.now())/1000);
  if(left<=0||left>65){tmrPrevBank=!!state.turnBank;return;}
  const el=$('tmr'+state.turnIdx);
  if(el){el.textContent=(state.turnBank?'🏦 ':'⏱ ')+left;el.classList.toggle('low',left<=5);}
  const myTurn=state.turnIdx===0&&state.players[0]&&state.players[0].isHuman;
  if(myTurn){
    if(left<=5&&left>=1&&left!==tmrLastTick){tmrLastTick=left;sfx('tick');haptic(20);}
    if(state.turnBank&&!tmrPrevBank){showBanner(T('timerBank'));sfx('alert');}
  }
  tmrPrevBank=!!state.turnBank;
},350);

function wireCoachInfoTips(){
  const body=$('coachBody');
  if(!body||body._infoWired) return;
  body._infoWired=true;
  body.addEventListener('click',e=>{
    const btn=e.target.closest('.coach-info-btn');
    if(!btn||!body.contains(btn)) return;
    e.stopPropagation();
    const tip=btn.closest('.coach-row')?.nextElementSibling;
    if(!tip?.classList.contains('coach-info-tip')) return;
    const hidden=tip.classList.toggle('hidden');
    btn.setAttribute('aria-expanded',hidden?'false':'true');
  });
}
let coachScrollHintFrame=0;
function updateCoachScrollHint(){
  if(!HAS_DOM)return;
  const coach=$('coach'),hint=$('coachScrollHint');
  if(!coach||!hint)return;
  const remaining=coach.scrollHeight-coach.scrollTop-coach.clientHeight;
  hint.classList.toggle('hidden',remaining<=28);
}
function scheduleCoachScrollHint(){
  if(!HAS_DOM||coachScrollHintFrame)return;
  coachScrollHintFrame=requestAnimationFrame(()=>{
    coachScrollHintFrame=0;
    updateCoachScrollHint();
  });
}

/* ================= INIT / WIRING ================= */
let setupGameType='sng';
function initUI(){
  let numPlayers=maxSetupPlayers(), difficulty='medium';
  $('pCount').textContent=numPlayers;
  setTableCustomCounts(tableScenarioCounts('balanced',numPlayers-1));
  refreshTableScenarioSetup(numPlayers);
  const setSetupPlayerCount=next=>{
    const prevBots=Math.max(1,numPlayers-1);
    numPlayers=clamp(next,2,maxSetupPlayers());
    $('pCount').textContent=numPlayers;
    if($('tableScenarioSel').value==='custom'&&numPlayers-1!==prevBots)rescaleTableCustom(numPlayers-1);
    refreshTableScenarioSetup(numPlayers);
  };
  const syncSetupPlayerCap=()=>{
    const max=maxSetupPlayers();
    if(numPlayers>max)setSetupPlayerCount(max);
    else refreshTableScenarioSetup(numPlayers);
  };
  const restoreSetupFromGame=()=>{
    const cfg=state&&state.cfg;
    if(!cfg)return;
    setupGameType=cfg.gameType==='cash'?'cash':'sng';
    updateSetupMode(setupGameType);
    setSetupPlayerCount(Number(cfg.numPlayers)||numPlayers);
    const setSelect=(id,value)=>{
      const el=$(id);
      if(el&&Array.from(el.options).some(option=>String(option.value)===String(value)))el.value=String(value);
    };
    setSelect('startBlind',cfg.startBlind);
    setSelect('startBB',cfg.startBB);
    if($('timerChk'))$('timerChk').checked=!!cfg.timer;
    difficulty=['easy','medium','hard'].includes(cfg.difficulty)?cfg.difficulty:'medium';
    $('diffSeg').querySelectorAll('button').forEach(button=>{
      button.classList.toggle('on',button.dataset.d===difficulty);
    });
    if(setupGameType==='sng'){
      setSelect('anteSel',cfg.ante);
      const speed=cfg.speed||'turbo';
      document.querySelectorAll('input[name=speed]').forEach(input=>{
        input.checked=input.value===speed;
      });
      $('koBonusChk').checked=!!cfg.koBonus;
    }
    const scenario=normalizeTableScenario(cfg.tableScenario);
    $('tableScenarioSel').value=scenario;
    if(scenario==='custom'&&cfg.tableCustom)setTableCustomCounts(cfg.tableCustom);
    refreshTableScenarioSetup(numPlayers);
  };
  $('modeSeg').querySelectorAll('button').forEach(b=>{
    b.onclick=()=>{setupGameType=b.dataset.m; updateSetupMode(setupGameType); refreshResume();};
  });
  updateSetupMode(setupGameType);
  $('pMinus').onclick=()=>setSetupPlayerCount(numPlayers-1);
  $('pPlus').onclick =()=>setSetupPlayerCount(numPlayers+1);
  window.addEventListener('resize',syncSetupPlayerCap);
  window.addEventListener('orientationchange',syncSetupPlayerCap);
  $('diffSeg').querySelectorAll('button').forEach(b=>{
    b.onclick=()=>{
      $('diffSeg').querySelectorAll('button').forEach(x=>x.classList.remove('on'));
      b.classList.add('on'); difficulty=b.dataset.d;
    };
  });
  $('tableScenarioSel').onchange=()=>{
    if($('tableScenarioSel').value==='custom'){
      const current=tableCustomCountsFromDom();
      const assigned=TABLE_STYLE_IDS.reduce((s,id)=>s+(current[id]||0),0);
      if(assigned!==numPlayers-1)rescaleTableCustom(numPlayers-1);
    }
    refreshTableScenarioSetup(numPlayers);
  };
  document.querySelectorAll('.table-role-count').forEach(el=>{
    el.oninput=()=>{
      el.value=clamp(Math.round(Number(el.value)||0),0,Math.max(0,numPlayers-1));
      refreshTableScenarioSetup(numPlayers);
    };
  });
  $('startBtn').onclick=()=>{
    numPlayers=Math.min(numPlayers,maxSetupPlayers());
    $('pCount').textContent=numPlayers;
    if(!refreshTableScenarioSetup(numPlayers))return;
    const cfg={
      gameType:setupGameType,
      numPlayers,
      startBB:+$('startBB').value,
      startBlind:+$('startBlind').value,
      timer:$('timerChk').checked,
      difficulty
    };
    Object.assign(cfg,selectedTableScenarioConfig());
    if(setupGameType==='sng'){
      cfg.ante=+$('anteSel').value;
      cfg.speed=document.querySelector('input[name=speed]:checked').value;
      cfg.koBonus=$('koBonusChk').checked;
    }
    logLines=[];
    $('setup').classList.add('hidden');
    $('game').classList.remove('hidden');
    closeDialog($('overlay'));
    $('tDiff').textContent=difficulty[0].toUpperCase()+difficulty.slice(1);
    newGame(cfg);
    buildSeats();
    hideActions();
    lastHand=null;
    $('coachFeed').classList.add('hidden');
    applyRewardCosmetics();
    renderRewardTop();
    renderStats();
    updateOrient();
    showEmoteBtn();
    setTimeout(startHand,400);
  };
  $('foldBtn').onclick=()=>humanAct('fold');
  $('callBtn').onclick=()=>humanAct('call');
  $('raiseBtn').onclick=()=>humanAct('raise',getRaiseSliderAmt());
  $('raiseSlider').oninput=()=>{clearRaiseExact();updateRaiseLabel();};
  $('prMin').onclick=()=>{clearRaiseExact();const sl=$('raiseSlider');sl.value=sl.min;updateRaiseLabel();};
  $('prMax').onclick=()=>setRaiseExact(raiseAllInAmt());
  $('prHalf').onclick=()=>{
    clearRaiseExact();
    const pot=state.players.reduce((s,p)=>s+p.totalBet,0);
    const sl=$('raiseSlider');
    sl.value=clamp(Math.round((state.currentBet+pot*0.5)/state.sb)*state.sb,+sl.min,+sl.max);
    updateRaiseLabel();
  };
  $('prPot').onclick=()=>{
    clearRaiseExact();
    const pot=state.players.reduce((s,p)=>s+p.totalBet,0);
    const sl=$('raiseSlider');
    sl.value=clamp(Math.round((state.currentBet+pot)/state.sb)*state.sb,+sl.min,+sl.max);
    updateRaiseLabel();
  };
  $('nextHandBtn').onclick=doNextHand;
  /* --- language --- */
  $('langSel').onchange=e=>setLang(e.target.value);
  $('langTop').onchange=e=>setLang(e.target.value);
  applyLang();
  applyRewardCosmetics();
  renderRewardTop();
  /* --- resume saved tournament --- */
  const refreshResume=()=>{
    let sv=null; try{sv=JSON.parse(localStorage.getItem('sg_poker_resume'));}catch(e){}
    const match=sv&&(sv.cfg?.gameType||'sng')===setupGameType;
    $('resumeBtn').classList.toggle('hidden',!sv||!match);
    if(sv&&match){
      const cash=(sv.cfg?.gameType||'sng')==='cash';
      $('resumeBtn').textContent=sv.midHand?T('resumeMid'):(cash?T('resumeCash'):T('resume'));
    }
    let nHist=0; try{nHist=(JSON.parse(localStorage.getItem('sg_poker_history')||'[]')).length;}catch(e){}
    let nGames=0; try{nGames=loadGames().length;}catch(e){}
    $('reviewBtn').classList.toggle('hidden',!nHist&&!nGames);
    return sv;
  };
  refreshResume();
  $('reviewBtn').onclick=showSessionReview;
  $('revClose').onclick=()=>closeDialog($('reviewOv'));
  $('reviewOv').onclick=e=>{if(e.target.id==='reviewOv')closeDialog($('reviewOv'));};
  $('practiceClose').onclick=()=>closeDialog($('practiceOv'));
  $('practiceNext').onclick=advanceScenarioPractice;
  $('practiceOv').onclick=e=>{if(e.target.id==='practiceOv')closeDialog($('practiceOv'));};
  $('scenarioBtn').onclick=openScenarioBuilder;
  $('scenarioAnalyze').onclick=scenarioAnalyzeFromForm;
  $('scenarioSave').onclick=scenarioSave;
  $('scenarioShare').onclick=scenarioShare;
  $('scenarioClose').onclick=()=>closeDialog($('scenarioOv'));
  $('scenarioOv').onclick=e=>{if(e.target.id==='scenarioOv')closeDialog($('scenarioOv'));};
  $('tRewards').onclick=showRewardsRoom;
  $('rewardClose').onclick=()=>closeDialog($('rewardOv'));
  $('rewardCloseTop').onclick=()=>closeDialog($('rewardOv'));
  $('rewardOv').onclick=e=>{if(e.target.id==='rewardOv')closeDialog($('rewardOv'));};
  ['revFilterAll','revFilterCash','revFilterSng'].forEach(id=>{
    const el=$(id);
    if(!el)return;
    el.onclick=()=>{
      revFilter=id==='revFilterCash'?'cash':id==='revFilterSng'?'sng':'all';
      ['revFilterAll','revFilterCash','revFilterSng'].forEach(x=>$(x)?.classList.toggle('on',x===id));
      showSessionReview();
    };
  });
  $('revAllHands').onclick=()=>{closeDialog($('reviewOv'));showHistoryReplay();};
  /* --- clear gameplay data while preserving Rewards progress and language --- */
  $('resetInfoBtn').onclick=()=>{
    const info=$('resetInfo');
    const hidden=info.classList.toggle('hidden');
    $('resetInfoBtn').setAttribute('aria-expanded',hidden?'false':'true');
  };
  $('timerInfoBtn').onclick=()=>$('timerInfo').classList.toggle('hidden');
  $('koBonusInfoBtn').onclick=()=>{
    const hidden=$('koBonusInfo').classList.toggle('hidden');
    $('koBonusInfoBtn').setAttribute('aria-expanded',hidden?'false':'true');
  };
  wireCoachInfoTips();
  const coachPanel=$('coach');
  coachPanel.addEventListener('scroll',scheduleCoachScrollHint,{passive:true});
  $('coachScrollHint').onclick=()=>coachPanel.scrollBy({
    top:Math.max(180,coachPanel.clientHeight*.55),behavior:'smooth'
  });
  new MutationObserver(scheduleCoachScrollHint).observe(coachPanel,{subtree:true,childList:true,characterData:true});
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(scheduleCoachScrollHint).observe(coachPanel);
  scheduleCoachScrollHint();
  $('resetBtn').onclick=()=>{
    if(!confirm(T('resetConfirm')))return;
    try{
      localStorage.removeItem('sg_poker_stats');
      localStorage.removeItem('sg_poker_history');
      localStorage.removeItem('sg_poker_resume');
      localStorage.removeItem('sg_poker_games');
      localStorage.removeItem('sg_poker_scenarios');
      localStorage.removeItem(IMPROVEMENT_STORE);
      localStorage.removeItem('sg_poker_human_model_v1');
    }catch(e){}
    Object.assign(lifeStats,{hands:0,won:0,net:0,biggest:0,decisions:0,followed:0});
    if(state&&typeof aiHumanModelDefault==='function')state.humanModel=aiHumanModelDefault();
    applyRewardCosmetics();
    renderRewardTop();
    refreshResume();
    if(state&&state.sessStats) renderStats();
    const lbl=$('resetLbl'),old=T('resetData');
    lbl.textContent=T('resetDone');
    setTimeout(()=>{lbl.textContent=T('resetData');},1600);
  };
  $('resumeBtn').onclick=()=>{
    const sv=refreshResume(); if(!sv)return;
    setupGameType=sv.cfg?.gameType||'sng';
    updateSetupMode(setupGameType);
    applyResumeSnapshot(sv);
    applyRewardCosmetics();
    renderRewardTop();
  };
  /* --- keyboard shortcuts: F fold · C check/call · R raise · 1-4 sizes · N next hand --- */
  $('foldBtn').title='Fold (F)'; $('callBtn').title='Check / Call (C)'; $('raiseBtn').title='Raise (R)';
  $('prMin').title='Min raise (1)'; $('prHalf').title='½ pot (2)'; $('prPot').title='Pot (3)'; $('prMax').title='All-in (4)';
  window.addEventListener('keydown',e=>{
    if(e.metaKey||e.ctrlKey||e.altKey)return;
    const tag=((e.target&&e.target.tagName)||'').toLowerCase();
    if(tag==='input'||tag==='select'||tag==='textarea')return;
    if(!state||$('game').classList.contains('hidden'))return;
    if(!$('replayOv').classList.contains('hidden'))return;
    const k=e.key.toLowerCase();
    if(!$('humanCtls').classList.contains('hidden')){
      if(k==='f'&&!$('foldBtn').disabled){e.preventDefault();humanAct('fold');}
      else if(k==='c'){e.preventDefault();humanAct('call');}
      else if(k==='r'){if($('raiseCtl').style.visibility!=='hidden'){e.preventDefault();humanAct('raise',getRaiseSliderAmt());}}
      else if(k>='1'&&k<='4'){e.preventDefault();$(['prMin','prHalf','prPot','prMax'][+k-1]).click();}
    }else if(k==='n'&&!$('nextHandBtn').classList.contains('hidden')){e.preventDefault();doNextHand();}
  });
  /* --- replayer navigation --- */
  $('rpPrevH').onclick=()=>{rpHandIdx--;rpStreet=99;rpDecisionIdx=0;rpCfAction='';rpRender();};
  $('rpNextH').onclick=()=>{rpHandIdx++;rpStreet=99;rpDecisionIdx=0;rpCfAction='';rpRender();};
  $('rpPrevS').onclick=()=>{rpStreet--;rpRender();};
  $('rpNextS').onclick=()=>{rpStreet++;rpRender();};
  $('rpJump').onsubmit=e=>{e.preventDefault();jumpReplayToHand($('rpHandInput').value);};
  $('rpHandInput').oninput=e=>e.target.setCustomValidity('');
  $('coachChk').onchange=e=>setCoach(e.target.checked);
  $('coachToggle').onclick=()=>setCoach(!$('coachChk').checked);
  $('coachClose').onclick=()=>setCoach(false);
  /* --- desktop: drag-resize the coach panel --- */
  {
    const cr=$('coachResize'), panel=$('coach');
    let drag=null;
    try{const w=+localStorage.getItem('sg_poker_coachw'); if(w)panel.style.width=clamp(w,240,620)+'px';}catch(e){}
    cr.addEventListener('pointerdown',e=>{
      drag={x:e.clientX,w:panel.offsetWidth};
      cr.classList.add('dragging');
      cr.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    cr.addEventListener('pointermove',e=>{
      if(!drag)return;
      const w=clamp(drag.w+(e.clientX-drag.x),240,Math.min(620,window.innerWidth*0.45));
      panel.style.width=w+'px';
      layoutSeats();
    });
    const end=e=>{
      if(!drag)return;
      drag=null; cr.classList.remove('dragging');
      try{localStorage.setItem('sg_poker_coachw',panel.offsetWidth);}catch(e2){}
      layoutSeats();
    };
    cr.addEventListener('pointerup',end);
    cr.addEventListener('pointercancel',end);
  }
  setCoach(!isMobile());   // default: docked on desktop, hidden sheet on mobile
  if(isMobile()){
    const g=$('game');
    ['actFab','actBackdrop','actionbar'].forEach(id=>{
      const el=$(id);
      if(el&&g&&!g.contains(el)) g.appendChild(el);
    });
    $('actFab').onclick=e=>{e.stopPropagation();setActBar(true);};
    $('actBackdrop').onclick=()=>setActBar(false);
    syncActPanelMode();
  }
  $('autoNext').onchange=e=>{
    if(!e.target.checked){
      clearTimeout(nextTimer);
      /* if a hand just ended, give the user the manual button instead */
      if(state&&!state.gameOver&&state.handOver) $('nextHandBtn').classList.remove('hidden');
    }else if(state&&!state.gameOver&&state.handOver){
      doNextHand();
    }
  };
  $('logToggle').onclick=()=>$('log').classList.toggle('hidden');
  $('replayBtn').onclick=showReplay;
  $('exportBtn').onclick=()=>{
    let hist=[];
    try{hist=JSON.parse(localStorage.getItem('sg_poker_history')||'[]');}catch(e){}
    const payload={exported:new Date().toISOString(),lifetimeStats:lifeStats,handCount:hist.length,hands:hist};
    const blob=new Blob([JSON.stringify(payload,null,1)],{type:'application/json'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='poker-history.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  $('chartClose').onclick=()=>closeDialog($('chartOv'));
  $('chartOv').onclick=e=>{if(e.target.id==='chartOv')closeDialog($('chartOv'));};
  $('rpClose').onclick=()=>closeDialog($('replayOv'));
  $('replayOv').onclick=e=>{if(e.target.id==='replayOv')closeDialog($('replayOv'));};
  $('sndBtn').onclick=()=>{soundOn=!soundOn;$('sndBtn').textContent=soundOn?'🔊':'🔇';};
  /* --- multiplayer wiring --- */
  try{$('mpName').value=localStorage.getItem('sg_poker_mpname')||'';}catch(e){}
  const hm=location.hash.match(/room=([A-Za-z0-9]{4,8})/);
  if(hm)$('mpCode').value=hm[1].toUpperCase();
  $('mpCreate').onclick=mpCreate;
  $('mpJoinBtn').onclick=mpJoin;
  $('mpStartBtn').onclick=mpStartGame;
  $('mpLeave').onclick=mpLeave;
  $('mpCopy').onclick=()=>{
    if(!MP)return;
    const base=location.protocol==='file:'?location.href.split('#')[0]:location.origin+location.pathname;
    const url=base+'#room='+MP.code;
    const done=()=>{$('mpCopy').textContent=T('mpCopied');setTimeout(()=>{$('mpCopy').textContent=T('mpCopy');},2200);};
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(url).then(done,done);
    else{prompt('',url);done();}
  };
  $('chatBtn').onclick=()=>{$('chat').classList.toggle('hidden');$('chatBtn').textContent='💬';};
  $('emoBtn').onclick=()=>$('emoBar').classList.toggle('hidden');
  renderEmoteButtons();
  $('chatSend').onclick=mpChatSend;
  $('sitOutBtn').onclick=mpToggleSitOut;
  $('chatIn').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();mpChatSend();}});
  $('quitBtn').onclick=()=>{
    if(MP){ if(confirm(T('quit')+'?')) mpLeave(); return; }
    const cash=isCashGame();
    if(confirm(T(cash?'quitCash':'quitSng'))){
      if(cash){
        showCashSessionEnd();
        restoreSetupFromGame();
        $('game').classList.add('hidden');
        $('setup').classList.remove('hidden');
        refreshResume(); updateOrient();
        return;
      }
      state.gameOver=true; clearResume(); hideNextBtn(); hideActions();
      restoreSetupFromGame();
      $('game').classList.add('hidden'); $('setup').classList.remove('hidden');
      refreshResume(); updateOrient();
    }
  };
  $('ovBtn').onclick=()=>{
    if(MP){mpRequestRematch();return;}
    closeDialog($('overlay'));
    restoreSetupFromGame();
    $('game').classList.add('hidden');
    $('setup').classList.remove('hidden');
    refreshResume(); updateOrient();
  };
  /* in-game overlays must live INSIDE #game so the forced-landscape rotation applies to them
     (mpLobby & replayOv stay outside — they are also used from the setup screen) */
  ['chartOv','overlay','chat','emoBar'].forEach(id=>{const el=$(id);if(el)$('game').appendChild(el);});
  window.addEventListener('resize',updateOrient);
  window.addEventListener('orientationchange',()=>setTimeout(updateOrient,250));
  if(window.visualViewport)window.visualViewport.addEventListener('resize',()=>setTimeout(updateOrient,80));
}

if(HAS_DOM) initUI();
