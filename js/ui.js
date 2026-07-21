/* ================= I18N (UI chrome; coach prose stays English for now) ================= */
const TR={
en:{sub:"No-Limit Texas Hold'em tournament vs AI",subCash:"No-Limit Texas Hold'em cash game vs AI",modeLbl:"Game mode",modeSng:"Sit & Go",modeCash:"Cash Game",titleSng:"Sit & Go Hold'em",titleCash:"Cash Game Hold'em",
players:"Players",blinds:"Blinds",buyin:"Buy-in",stackDepth:"Starting stack",ante:"Ante",noAnte:"no ante",
speed:"Blinds Change Speed",turbo:"Turbo",standard:"Standard",slow:"Slow",koBonusOpt:"🎯 KO bonus",koBonusInfo:"Bounty-style Sit & Go option: when you personally eliminate an opponent, you instantly gain a chip bonus equal to 10% of the starting stack. It rewards knockouts and makes big-stack pressure stronger. Only the player who wins chips from the busted opponent gets the bonus.",koBonusAward:(n,b)=>`🎯 KO bonus: +${b} for eliminating ${n} player${n>1?'s':''}`,diff:"AI Difficulty",easy:"Easy",medium:"Medium",hard:"Hard",language:"Language",
deal:"Deal me in",startCash:"Sit down",resume:"▶ Resume tournament",resumeMid:"▶ Resume mid-hand",resumeCash:"▶ Resume cash session",review:"📊 Session review",
sessionPnL:"Session",cashSessionEnd:"Session complete",cashSessionSub:(h,r,pnl)=>`${h} hands · ${r} rebuy${r!==1?'s':''} · ${pnl>=0?'+':'−'}${usd(Math.abs(pnl))} net`,
cashRebuy:b=>`Rebuy for ${b}`,
revTitle:"Session review",revWinRate:"Win rate",revITM:"In the money",revAvgFinish:"Avg finish",
revNet:"Total net",revEVLeaked:"EV leaked",revGames:"Games",revNoGames:"No finished games yet — play a tournament!",revNoGamesCash:"No finished sessions yet — play a cash game!",
revCashBadge:"Cash",revSngBadge:"Sit & Go",
revFilterAll:"All",revFilterCash:"Cash",revFilterSng:"Sit & Go",
revBB100:"BB/100",revCashHands:"Cash hands",revCashNetBB:"Net (BB)",revCashRebuys:"Rebuys",
sprLbl:"SPR",sprZoneDeep:"deep",sprZoneMid:"medium",sprZoneLow:"low",
statBB100:"BB/100",statNetBB:"Net (BB)",statRebuys:"Rebuys",
revLeaksTitle:"Leak finder (by spot)",revLeaksNone:"No classified leaks yet — deviate from the coach and finish games to populate this.",
leakPfOpen:"Preflop opens",leakPfFace:"Facing raises",leakCbet:"C-bet defense",leakMultiway:"Multiway pots",leakRiver:"River calls",leakRiverAir:n=>`${n} river call${n>1?'s':''} with high card / no hand`,
revAllHands:"All saved hands",revReplay:"Tap a game to replay its hands",revMidBanner:"Hand in progress — resumed",
resetData:"Clear saved data",resetInfo:"Deletes everything this game keeps in your browser: lifetime stats, hand history, arcade rewards and any unfinished tournament you could resume. Your language choice stays. This can't be undone.",resetConfirm:"Delete all saved stats, hand history, arcade rewards and any unfinished tournament?",resetDone:"✓ Cleared",
level:"Level ",hand:"Hand ",blindsUpA:"Blinds up in ",blindsUpB:" hands",autoNext:"Auto next hand",coachLbl:"🧭 Live coach",coachBtn:"Coach",quit:"Quit",quitSng:"Quit this tournament?",quitCash:"Leave the table?",
fold:"Fold",check:"Check",call:"Call",allin:"All-in",raiseTo:"Raise to ",betW:"Bet ",raiseW:"Raise",min:"Min",halfPot:"½ Pot",pot:"Pot",
actMenu:"◀ Menu",actTurn:"◀ Your turn",
log:"Log",lastHand:"Last hand",exportH:"Export history",nextHand:"Next hand ▶",liveCoach:"🧭 LIVE COACH",
waiting:"Advice appears here when it's your turn.",
yourHand:"Your hand",position:"Position",actingOrder:"Acting order",postflopOrder:"Postflop order",winChance:"Win chance",draws:"Draws",outs:"Outs",dirtyOuts:"Dirty outs",dirtyOutsInfoLbl:"What is a dirty out?",dirtyOutsInfo:"A dirty (tainted) out completes your draw on paper but often doesn't win the pot — e.g. it pairs the board (helping everyone) or is the 4th card to a board flush that gives an opponent the winning flush. Use clean outs for your odds.",potOdds:"Pot odds",yourStack:"Your stack",sugSize:"Suggested size",
firstToAct:"first to act (OOP)",lastToAct:"last to act (IP)",ofN:"of",need:"need ",vs:"vs",opp:"opp",opps:"opps",
thisGame:"THIS GAME",lifetime:"LIFETIME",handsPW:"Hands played / won",net:"Net",biggestPot:"Biggest pot won",vpipPfr:"VPIP / PFR",aggF:"Aggression factor",wonSd:"Won at showdown",evLeak:"EV leaked vs coach",coachFollowed:"Coach followed",followedCoach:"followed coach",coachSaid:"coach said",youChose:"you chose",
recFOLD:"FOLD",recCHECK:"CHECK",recCALL:"CALL",recRAISETO:"RAISE TO",recBET:"BET",recALLIN:"ALL-IN",
zoneG:"🟢 comfortable",zoneY:"🟡 fight for pots",zoneO:"🟠 shove-or-fold soon",zoneR:"🔴 all-in or fold",
prizeP:"Prize pressure",extraNeeded:"extra needed",
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
viewChart:"📊 View this position's chart",chartTitleOpen:"opening chart",chartTitleIso:"iso vs limpers chart",chartTitleShove:"all-in chart",chartTitleFacing:"chart vs this raise",chartTitleBbDefend:"BB defense chart",
viewRange:"📊 Enlarge opponent range",chartTitleRange:"estimated range right now",legendRange:"hands he could still have",rangeFringe:"Fringe",rangePossible:"Possible",rangeLikely:"Likely",rangeVeryLikely:"Very likely",
legendOpen:"raise first-in",legendShove:"go all-in",legendFold:"fold",legendYou:"your hand",legend3bet:"re-raise (3-bet)",legendCall:"call",
benchConfirm:"Simulate 25 full 9-player tournaments where a bot plays PURE coach advice, to measure how good the coach really is. Takes a minute or two. Run it?",
youWin:"You win the tournament!",playAgain:"Play again",
youWinSub:(n,h)=>`Outlasted ${n} opponents over ${h} hands.`,
bustedTitle:p=>`Busted in ${p} place`,bustedSub:h=>`Survived ${h} hands. Run it back?`,
evTotal:"📉 Total EV leaked",deviations:"deviations",cleanGame:"No EV leaked vs the coach — clean game! 🎯",smallerLeaks:"smaller leaks",
handNavP:"‹ hand",handNavN:"hand ›",streetNavP:"‹ street",streetNavN:"street ›",close:"Close",replayTitle:"Hand replay",
won:"won",foldedTag:"folded",showdown:"showdown",fullHand:"Full hand",preflop:"Preflop",flop:"Flop",turnSt:"Turn",riverSt:"River",noHands:"No completed hand yet this game.",
ord:n=>{const s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);}},
fr:{sub:"Tournoi de Texas Hold'em No-Limit contre l'IA",subCash:"Cash game Texas Hold'em No-Limit contre l'IA",modeLbl:"Mode de jeu",modeSng:"Sit & Go",modeCash:"Cash game",titleSng:"Sit & Go Hold'em",titleCash:"Cash Game Hold'em",
players:"Joueurs",blinds:"Blinds",buyin:"Cave (buy-in)",stackDepth:"Tapis de départ",ante:"Ante",noAnte:"sans ante",
speed:"Vitesse des blinds",turbo:"Turbo",standard:"Standard",slow:"Lente",koBonusOpt:"🎯 Bonus KO",koBonusInfo:"Option Sit & Go façon bounty : quand vous éliminez personnellement un adversaire, vous gagnez tout de suite un bonus en jetons égal à 10% du tapis de départ. Cela récompense les éliminations et renforce la pression du gros tapis. Seul le joueur qui gagne les jetons de l'adversaire éliminé reçoit le bonus.",koBonusAward:(n,b)=>`🎯 Bonus KO : +${b} pour ${n} élimination${n>1?'s':''}`,diff:"Niveau de l'IA",easy:"Facile",medium:"Moyen",hard:"Difficile",language:"Langue",
deal:"Distribuez !",startCash:"S'asseoir",resume:"▶ Reprendre le tournoi",resumeMid:"▶ Reprendre la main en cours",resumeCash:"▶ Reprendre la session cash",review:"📊 Bilan des sessions",
sessionPnL:"Session",cashSessionEnd:"Session terminée",cashSessionSub:(h,r,pnl)=>`${h} mains · ${r} rebuy${r>1?'s':''} · ${pnl>=0?'+':'−'}${usd(Math.abs(pnl))} net`,
cashRebuy:b=>`Rebuy pour ${b}`,
revTitle:"Bilan des sessions",revWinRate:"Taux de victoire",revITM:"Dans l'argent",revAvgFinish:"Place moyenne",
revNet:"Net total",revEVLeaked:"EV perdu",revGames:"Parties",revNoGames:"Aucune partie terminée — jouez un tournoi !",revNoGamesCash:"Aucune session terminée — jouez une partie cash !",
revCashBadge:"Cash",revSngBadge:"Sit & Go",
revFilterAll:"All",revFilterCash:"Cash",revFilterSng:"Sit & Go",
revBB100:"BB/100",revCashHands:"Cash hands",revCashNetBB:"Net (BB)",revCashRebuys:"Rebuys",
sprLbl:"SPR",sprZoneDeep:"deep",sprZoneMid:"medium",sprZoneLow:"low",
statBB100:"BB/100",statNetBB:"Net (BB)",statRebuys:"Rebuys",
revLeaksTitle:"Fuites par type de spot",revLeaksNone:"Pas encore de fuites classées — écartez-vous du coach et terminez des parties.",
leakPfOpen:"Ouvertures préflop",leakPfFace:"Face aux relances",leakCbet:"Défense c-bet",leakMultiway:"Pots multiway",leakRiver:"Calls rivière",leakRiverAir:n=>`${n} call${n>1?'s':''} rivière sans main`,
revAllHands:"Toutes les mains sauvegardées",revReplay:"Touchez une partie pour revoir ses mains",revMidBanner:"Main en cours — reprise",
resetData:"Effacer les données sauvegardées",resetInfo:"Supprime tout ce que le jeu garde dans votre navigateur : statistiques globales, historique des mains, récompenses arcade et tout tournoi en cours à reprendre. Votre choix de langue est conservé. Irréversible.",resetConfirm:"Supprimer toutes les statistiques, l'historique des mains, les récompenses arcade et tout tournoi en cours ?",resetDone:"✓ Effacé",
level:"Niveau ",hand:"Main ",blindsUpA:"Blinds montent dans ",blindsUpB:" mains",autoNext:"Main suivante auto",coachLbl:"🧭 Coach en direct",coachBtn:"Coach",quit:"Quitter",quitSng:"Quitter ce tournoi ?",quitCash:"Quitter la table ?",
fold:"Se coucher",check:"Parole",call:"Suivre",allin:"Tapis",raiseTo:"Relancer à ",betW:"Miser ",raiseW:"Relancer",min:"Min",halfPot:"½ Pot",pot:"Pot",
actMenu:"◀ Menu",actTurn:"◀ À vous",
log:"Journal",lastHand:"Dernière main",exportH:"Exporter l'historique",nextHand:"Main suivante ▶",liveCoach:"🧭 COACH EN DIRECT",
waiting:"Les conseils apparaissent ici quand c'est votre tour.",
yourHand:"Votre main",position:"Position",actingOrder:"Ordre de parole",postflopOrder:"Ordre post-flop",winChance:"Chance de gain",draws:"Tirages",outs:"Outs",dirtyOuts:"Outs sales",dirtyOutsInfoLbl:"Qu'est-ce qu'un out sale ?",dirtyOutsInfo:"Un out sale complète votre tirage sur le papier mais ne gagne souvent pas le pot — ex. il pair le board (aide tout le monde) ou est la 4e carte d'une couleur au board qui donne la couleur gagnante à l'adversaire. Comptez les outs propres pour vos cotes.",potOdds:"Cote du pot",yourStack:"Votre tapis",sugSize:"Taille suggérée",
firstToAct:"premier à parler (OOP)",lastToAct:"dernier à parler (IP)",ofN:"sur",need:"requis ",vs:"vs",opp:"adv.",opps:"adv.",
thisGame:"CETTE PARTIE",lifetime:"GLOBAL",handsPW:"Mains jouées / gagnées",net:"Net",biggestPot:"Plus gros pot gagné",vpipPfr:"VPIP / PFR",aggF:"Facteur d'agression",wonSd:"Gagné à l'abattage",evLeak:"EV perdue vs coach",coachFollowed:"Coach suivi",followedCoach:"coach suivi",coachSaid:"le coach a dit",youChose:"vous avez choisi",
recFOLD:"SE COUCHER",recCHECK:"PAROLE",recCALL:"SUIVRE",recRAISETO:"RELANCER À",recBET:"MISER",recALLIN:"TAPIS",
zoneG:"🟢 confortable",zoneY:"🟡 battez-vous pour les pots",zoneO:"🟠 bientôt tapis-ou-couché",zoneR:"🔴 tapis ou couché",
prizeP:"Pression des prix",extraNeeded:"requis en plus",
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
viewChart:"📊 Voir la charte de cette position",chartTitleOpen:"charte d'ouverture",chartTitleIso:"charte iso vs limps",chartTitleShove:"charte de tapis",chartTitleFacing:"charte face à cette relance",chartTitleBbDefend:"charte défense BB",
viewRange:"📊 Agrandir la range adverse",chartTitleRange:"range estimée en ce moment",legendRange:"mains qu'il peut encore avoir",rangeFringe:"Marginal",rangePossible:"Possible",rangeLikely:"Probable",rangeVeryLikely:"Très probable",
legendOpen:"relancer en premier",legendShove:"partir à tapis",legendFold:"se coucher",legendYou:"votre main",legend3bet:"sur-relancer (3-bet)",legendCall:"suivre",
benchConfirm:"Simuler 25 tournois complets à 9 joueurs où un bot suit UNIQUEMENT les conseils du coach, pour mesurer sa vraie valeur. Compte une à deux minutes. Lancer ?",
youWin:"Vous remportez le tournoi !",playAgain:"Rejouer",
youWinSub:(n,h)=>`Vous avez survécu à ${n} adversaires en ${h} mains.`,
bustedTitle:p=>`Éliminé à la ${p} place`,bustedSub:h=>`${h} mains jouées. On remet ça ?`,
evTotal:"📉 EV totale perdue",deviations:"écarts",cleanGame:"Aucune EV perdue face au coach — partie parfaite ! 🎯",smallerLeaks:"autres fuites mineures",
handNavP:"‹ main",handNavN:"main ›",streetNavP:"‹ rue",streetNavN:"rue ›",close:"Fermer",replayTitle:"Revoir la main",
won:"gagné",foldedTag:"couché",showdown:"abattage",fullHand:"Main complète",preflop:"Pré-flop",flop:"Flop",turnSt:"Turn",riverSt:"River",noHands:"Aucune main terminée pour cette partie.",
ord:n=>n===1?'1re':n+'e'},
es:{sub:"Torneo de Texas Hold'em No-Limit contra la IA",subCash:"Cash game Texas Hold'em No-Limit contra la IA",modeLbl:"Modo de juego",modeSng:"Sit & Go",modeCash:"Cash game",titleSng:"Sit & Go Hold'em",titleCash:"Cash Game Hold'em",
players:"Jugadores",blinds:"Ciegas",buyin:"Entrada (buy-in)",stackDepth:"Stack inicial",ante:"Ante",noAnte:"sin ante",
speed:"Velocidad de ciegas",turbo:"Turbo",standard:"Estándar",slow:"Lenta",koBonusOpt:"🎯 Bono KO",koBonusInfo:"Opción Sit & Go estilo bounty: cuando eliminas personalmente a un rival, ganas al instante un bono en fichas igual al 10% del stack inicial. Premia las eliminaciones y hace más fuerte la presión del stack grande. Solo recibe el bono quien gana fichas del rival eliminado.",koBonusAward:(n,b)=>`🎯 Bono KO: +${b} por eliminar ${n} jugador${n>1?'es':''}`,diff:"Nivel de la IA",easy:"Fácil",medium:"Medio",hard:"Difícil",language:"Idioma",
deal:"¡Reparte!",startCash:"Sentarse",resume:"▶ Reanudar torneo",resumeMid:"▶ Reanudar mano en curso",resumeCash:"▶ Reanudar sesión cash",review:"📊 Resumen de sesiones",
sessionPnL:"Sesión",cashSessionEnd:"Sesión terminada",cashSessionSub:(h,r,pnl)=>`${h} manos · ${r} rebuy${r!==1?'s':''} · ${pnl>=0?'+':'−'}${usd(Math.abs(pnl))} neto`,
cashRebuy:b=>`Rebuy por ${b}`,
revTitle:"Resumen de sesiones",revWinRate:"Tasa de victorias",revITM:"En premios",revAvgFinish:"Puesto medio",
revNet:"Neto total",revEVLeaked:"EV perdido",revGames:"Partidas",revNoGames:"Sin partidas terminadas — ¡juega un torneo!",revNoGamesCash:"Sin sesiones terminadas — ¡juega cash!",
revCashBadge:"Cash",revSngBadge:"Sit & Go",
revFilterAll:"All",revFilterCash:"Cash",revFilterSng:"Sit & Go",
revBB100:"BB/100",revCashHands:"Cash hands",revCashNetBB:"Net (BB)",revCashRebuys:"Rebuys",
sprLbl:"SPR",sprZoneDeep:"deep",sprZoneMid:"medium",sprZoneLow:"low",
statBB100:"BB/100",statNetBB:"Net (BB)",statRebuys:"Rebuys",
revLeaksTitle:"Fugas por tipo de spot",revLeaksNone:"Sin fugas clasificadas aún — desvíate del coach y termina partidas.",
leakPfOpen:"Aperturas preflop",leakPfFace:"Frente a subidas",leakCbet:"Defensa c-bet",leakMultiway:"Pots multiway",leakRiver:"Calls en river",leakRiverAir:n=>`${n} call${n>1?'s':''} en river sin mano`,
revAllHands:"Todas las manos guardadas",revReplay:"Toca una partida para repetir sus manos",revMidBanner:"Mano en curso — reanudada",
resetData:"Borrar datos guardados",resetInfo:"Elimina todo lo que el juego guarda en tu navegador: estadísticas globales, historial de manos, recompensas arcade y cualquier torneo sin terminar. Tu idioma se mantiene. No se puede deshacer.",resetConfirm:"¿Borrar todas las estadísticas, el historial de manos, las recompensas arcade y cualquier torneo sin terminar?",resetDone:"✓ Borrado",
level:"Nivel ",hand:"Mano ",blindsUpA:"Ciegas suben en ",blindsUpB:" manos",autoNext:"Mano siguiente auto",coachLbl:"🧭 Coach en vivo",coachBtn:"Coach",quit:"Salir",quitSng:"¿Salir de este torneo?",quitCash:"¿Dejar la mesa?",
fold:"Retirarse",check:"Pasar",call:"Igualar",allin:"All-in",raiseTo:"Subir a ",betW:"Apostar ",raiseW:"Subir",min:"Mín",halfPot:"½ Bote",pot:"Bote",
actMenu:"◀ Menú",actTurn:"◀ Tu turno",
log:"Registro",lastHand:"Última mano",exportH:"Exportar historial",nextHand:"Siguiente mano ▶",liveCoach:"🧭 COACH EN VIVO",
waiting:"Los consejos aparecen aquí cuando es tu turno.",
yourHand:"Tu mano",position:"Posición",actingOrder:"Orden de palabra",postflopOrder:"Orden post-flop",winChance:"Prob. de ganar",draws:"Proyectos",outs:"Outs",dirtyOuts:"Outs sucios",dirtyOutsInfoLbl:"¿Qué es un out sucio?",dirtyOutsInfo:"Un out sucio completa tu proyecto en papel pero a menudo no gana el bote — p. ej. empareja el board (ayuda a todos) o es la 4ª carta a color en el board que le da el color ganador al rival. Cuenta los outs limpios para tus odds.",potOdds:"Odds del bote",yourStack:"Tu stack",sugSize:"Tamaño sugerido",
firstToAct:"primero en hablar (OOP)",lastToAct:"último en hablar (IP)",ofN:"de",need:"necesitas ",vs:"vs",opp:"rival",opps:"rivales",
thisGame:"ESTA PARTIDA",lifetime:"GLOBAL",handsPW:"Manos jugadas / ganadas",net:"Neto",biggestPot:"Mayor bote ganado",vpipPfr:"VPIP / PFR",aggF:"Factor de agresión",wonSd:"Ganadas en showdown",evLeak:"EV perdido vs coach",coachFollowed:"Coach seguido",followedCoach:"coach seguido",coachSaid:"el coach dijo",youChose:"tú elegiste",
recFOLD:"RETIRARSE",recCHECK:"PASAR",recCALL:"IGUALAR",recRAISETO:"SUBIR A",recBET:"APOSTAR",recALLIN:"ALL-IN",
zoneG:"🟢 cómodo",zoneY:"🟡 pelea por los botes",zoneO:"🟠 pronto all-in o fold",zoneR:"🔴 all-in o retirarse",
prizeP:"Presión de premios",extraNeeded:"extra necesario",
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
viewChart:"📊 Ver la tabla de esta posición",chartTitleOpen:"tabla de apertura",chartTitleIso:"tabla iso vs limps",chartTitleShove:"tabla de all-in",chartTitleFacing:"tabla contra esta subida",chartTitleBbDefend:"tabla defensa BB",
viewRange:"📊 Ampliar el rango rival",chartTitleRange:"rango estimado ahora mismo",legendRange:"manos que aún puede tener",rangeFringe:"Marginal",rangePossible:"Posible",rangeLikely:"Probable",rangeVeryLikely:"Muy probable",
legendOpen:"subir de primeras",legendShove:"ir all-in",legendFold:"retirarse",legendYou:"tu mano",legend3bet:"resubir (3-bet)",legendCall:"igualar",
benchConfirm:"Simular 25 torneos completos de 9 jugadores donde un bot sigue SOLO los consejos del coach, para medir lo bueno que es de verdad. Tarda uno o dos minutos. ¿Lanzar?",
youWin:"¡Ganas el torneo!",playAgain:"Jugar de nuevo",
youWinSub:(n,h)=>`Sobreviviste a ${n} rivales en ${h} manos.`,
bustedTitle:p=>`Eliminado en ${p} lugar`,bustedSub:h=>`Aguantaste ${h} manos. ¿Otra vez?`,
evTotal:"📉 EV total perdido",deviations:"desviaciones",cleanGame:"Sin EV perdido frente al coach — ¡partida perfecta! 🎯",smallerLeaks:"fugas menores",
handNavP:"‹ mano",handNavN:"mano ›",streetNavP:"‹ calle",streetNavN:"calle ›",close:"Cerrar",replayTitle:"Repetición",
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
let logLines=[],nextTimer=null,prevBoardLen=0;

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
    :kind==='soundPack'?'Changes reward sounds for XP, level-ups, big pots, and KOs.'
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
      classic:'Default reward sound set.',
      arcade:'Brighter arcade-style reward sounds.',
      retro:'Old-school square-wave reward sounds.',
      casino:'Higher casino-style reward chimes.'
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
    seat.classList.toggle('active', !state.handOver&&state.turnIdx===p.i&&!p.folded&&!p.out&&!p.allIn&&inHand().length>1);
    seat.classList.toggle('folded', p.folded&&!p.out);
    seat.classList.toggle('busted', p.out);
    seat.classList.toggle('winner', !!(winners&&winners.includes(p)));
    seat.classList.toggle('revealed', !!p.revealed&&!p.isHuman&&!p.folded&&!p.out&&p.hole.length>0);
    $('chips'+p.i).textContent= p.out?'OUT':money(p.chips)+(p.allIn?' · all-in':'');
    $('pos'+p.i).textContent= p.out?'':(p.pos||'');
    const lls=document.body.classList.contains('lls');
    $('act'+p.i).textContent=(lls&&/^(SB|BB) /.test(p.lastAct))?'':p.lastAct;
    const hole=$('hole'+p.i);
    if(p.out||p.folded||p.hole.length===0) setHTML(hole,'');
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

function updateCoach(p){
  if(!HAS_DOM)return;
  const R=coachDecide(p);
  const {rec,coachT,evs,why,extra,handDesc,drawRow,eq,odds,callAmt,pot,opps,pos,early,late,
         actsFirst,actsLast,ordIdx,ordLen,M,mZone,icmPrem,spr,sprZone}=R;
  const flags=getMode().coachFlags||{};
  let sizeRow='';
  if(rec==='RAISE'||rec==='ALLIN'){
    sizeRow=`<div class="coach-row"><span>${T('sugSize')}</span><b>${usd(coachT)} (${bbs(coachT)})</b></div>`;
    /* pre-set the raise slider to the coach's size so R raises exactly this */
    if($('raiseCtl').style.visibility!=='hidden'){
      const sl=$('raiseSlider');
      if(rec==='ALLIN') setRaiseExact(p.bet+p.chips);
      else{ clearRaiseExact(); sl.value=clamp(coachT,+sl.min,+sl.max); updateRaiseLabel(); }
    }
  }
  const recLabel = rec==='ALLIN' ? `${T('recALLIN')} ${usd(p.bet+p.chips)}`
    : rec==='RAISE' ? `${state.currentBet>0?T('recRAISETO'):T('recBET')} ${usd(coachT)} · ${bbs(coachT)}`
    : T('rec'+rec);
  const showM=flags.mRatio;
  const sprRow=flags.showSpr&&spr!=null&&state.stage!=='preflop'
    ?`<div class="coach-row"><span>${T('sprLbl')}</span><b>~${Math.round(spr*10)/10} · ${T(sprZone==='deep'?'sprZoneDeep':sprZone==='mid'?'sprZoneMid':'sprZoneLow')}</b></div>`:'';
  const rangeCharts=R.rangeCharts?.length?R.rangeCharts:(R.chartInfo?.kind==='range'?[R.chartInfo]:[]);
  const rangePanel=rangeCharts.length?`<div class="coach-range-inline">`+
    (rangeCharts.length>1?`<div class="coach-range-tabs">${rangeCharts.map((x,i)=>`<button type="button" data-range-index="${i}" class="${i===0?'on':''}">${x.pos}</button>`).join('')}</div>`:'')+
    `<b id="coachRangeTitle">${rangeCharts[0].pos} — ${T('chartTitleRange')}</b><div id="coachRangeMatrix">${rangeMatrixCells(rangeCharts[0],R.code,true)}</div>${rangeMatrixLegend()}</div>`:'';
  $('coachBody').innerHTML=
    `<div class="rec ${rec}">${recLabel}</div>`+
    `<div class="coach-row"><span>${T('yourHand')}</span><b>${handDesc}</b></div>`+
    (pos?`<div class="coach-row"><span>${T('position')}</span><b>${pos}${early?' (early)':late?' (late)':''}</b></div>`:'')+
    (opps>0?`<div class="coach-row"><span>${state.stage==='preflop'?T('postflopOrder'):T('actingOrder')}</span><b>${actsFirst?T('firstToAct'):actsLast?T('lastToAct'):(ordIdx+1)+' '+T('ofN')+' '+ordLen}</b></div>`:'')+
    `<div class="coach-row"><span>${T('winChance')}</span><b>~${pct(eq)} ${T('vs')} ${opps} ${opps>1?T('opps'):T('opp')}</b></div>`+
    drawRow+
    (callAmt>0?`<div class="coach-row"><span>${T('potOdds')}</span><b>${T('need')}${pct(odds)} (${usd(callAmt)} &rarr; ${usd(pot)})</b></div>`:'')+
    sprRow+
    `<div class="coach-row"><span>${T('yourStack')}</span><b>${bbs(p.chips+p.bet)}</b></div>`+
    (showM?`<div class="coach-row"><span>M-ratio</span><b>M = ${M>99?'99+':Math.round(M)} · ${T('zone'+mZone)}</b></div>`:'')+
    (icmPrem>=0.01?`<div class="coach-row"><span>💰 ${T('prizeP')}</span><b>+${Math.round(icmPrem*100)}% ${T('extraNeeded')}</b></div>`:'')+
    sizeRow+
    rangePanel+
    (R.chartInfo?`<button class="chart-link" id="chartViewBtn">${T(R.chartInfo.kind==='range'?'viewRange':'viewChart')}</button>`:'')+
    coachProseHtml(why,extra)+
    mixTip(rec,R);
  let activeChart=R.chartInfo;
  if(rangeCharts.length){
    activeChart=rangeCharts[0];
    $('coachBody').querySelectorAll('[data-range-index]').forEach(btn=>btn.onclick=()=>{
      const idx=Number(btn.dataset.rangeIndex),info=rangeCharts[idx];
      if(!info)return;
      activeChart=info;
      $('coachBody').querySelectorAll('[data-range-index]').forEach(b=>b.classList.toggle('on',b===btn));
      const title=$('coachRangeTitle'),matrix=$('coachRangeMatrix');
      if(title)title.textContent=`${info.pos} — ${T('chartTitleRange')}`;
      if(matrix)matrix.innerHTML=rangeMatrixCells(info,R.code,true);
    });
  }
  if(R.chartInfo){
    const cb=$('chartViewBtn');
    if(cb) cb.onclick=()=>showChartMatrix(activeChart,R.code);
  }
  coachRecNow={rec,stage:state.stage,evs,eq,eqAdj:R.eqAdj??eq,odds,callAmt,pot,airPen:R.airPen||0};

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
          if(!res){box.textContent=C('gtoUnavail');return;}
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
let rpHandIdx=0, rpStreet=99, rpAll=null;
const STREET_NM=['Preflop','Flop','Turn','River'];
function parseCardCode(code){
  return {r:+(RANK_CH_INV[code.slice(0,-1)]||2), s:Math.max(0,'shdc'.indexOf(code.slice(-1)))};
}
const RANK_CH_INV=Object.fromEntries(Object.entries(RANK_CH).map(([k,v])=>[v,k]));
function rpRender(){
  if(!HAS_DOM)return;
  const arr=rpAll||(state&&state.gameHands)||[];
  const body=$('rpBody');
  if(!arr.length){
    $('rpHandLbl').textContent='—'; $('rpStreetLbl').textContent='—';
    ['rpPrevH','rpNextH','rpPrevS','rpNextS'].forEach(id=>$(id).disabled=true);
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
    `<div class="rp-log">${shownLog.map(l=>`<div>${l}</div>`).join('')}</div>`;
}
function showReplay(){
  if(!HAS_DOM)return;
  rpAll=null;           // in-game: this game's hands
  rpHandIdx=((state&&state.gameHands)||[]).length-1;
  rpStreet=99;          // open on the final street
  rpRender();
  openDialog($('replayOv'),'rpTitle');
}
function showHistoryReplay(){
  if(!HAS_DOM)return;
  let hist=[];
  try{hist=JSON.parse(localStorage.getItem('sg_poker_history')||'[]');}catch(e){}
  rpAll=hist;
  rpHandIdx=hist.length-1; rpStreet=99;
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
    state.humanDecisions.push({stage:state.stage,rec:r,action:type,followed,evLoss});
    if(evLoss>0&&state.sessStats){
      const opps=inHand().length-1;
      const spot=typeof classifyLeakSpot==='function'?classifyLeakSpot(callNow,opps):classifyLeakSpotRetro({stage:state.stage,action:type});
      const air=!!(coachRecNow.airPen>=0.1);
      state.sessStats.evLost=(state.sessStats.evLost||0)+evLoss;
      (state.gameDecisions=state.gameDecisions||[]).push({hand:state.handNum,stage:state.stage,rec:r,action:type,evLoss,spot,air});
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
  $('revLeaks').innerHTML=renderRevLeaks(games.slice().reverse());
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
        rpHandIdx=0; rpStreet=99;
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

function updateSetupMode(gameType){
  if(!HAS_DOM)return;
  const cash=gameType==='cash';
  document.querySelectorAll('#setup .sng-only').forEach(el=>el.classList.toggle('hidden',cash));
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
  const rowKeys=['modeLbl','players','blinds','buyin','ante','speed','koBonusOpt','timerOpt','language','diff'];
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
  set('startBtn',setupGameType==='cash'?'startCash':'deal'); set('resumeBtn','resume'); set('reviewBtn','review');
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
  set('foldBtn','fold'); set('prMin','min'); set('prHalf','halfPot'); set('prPot','pot'); set('prMax','allin');
  set('rpClose','close'); set('rpTitle','replayTitle'); set('ovBtn','playAgain'); set('chartClose','close');
  set('rpPrevH','handNavP'); set('rpNextH','handNavN'); set('rpPrevS','streetNavP'); set('rpNextS','streetNavN');
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

/* ================= INIT / WIRING ================= */
let setupGameType='sng';
function initUI(){
  let numPlayers=maxSetupPlayers(), difficulty='medium';
  $('pCount').textContent=numPlayers;
  const syncSetupPlayerCap=()=>{
    const max=maxSetupPlayers();
    if(numPlayers>max) numPlayers=max;
    $('pCount').textContent=numPlayers;
  };
  $('modeSeg').querySelectorAll('button').forEach(b=>{
    b.onclick=()=>{setupGameType=b.dataset.m; updateSetupMode(setupGameType); refreshResume();};
  });
  updateSetupMode(setupGameType);
  $('pMinus').onclick=()=>{numPlayers=Math.max(2,numPlayers-1);$('pCount').textContent=numPlayers;};
  $('pPlus').onclick =()=>{numPlayers=Math.min(maxSetupPlayers(),numPlayers+1);$('pCount').textContent=numPlayers;};
  window.addEventListener('resize',syncSetupPlayerCap);
  window.addEventListener('orientationchange',syncSetupPlayerCap);
  $('diffSeg').querySelectorAll('button').forEach(b=>{
    b.onclick=()=>{
      $('diffSeg').querySelectorAll('button').forEach(x=>x.classList.remove('on'));
      b.classList.add('on'); difficulty=b.dataset.d;
    };
  });
  $('startBtn').onclick=()=>{
    numPlayers=Math.min(numPlayers,maxSetupPlayers());
    $('pCount').textContent=numPlayers;
    const cfg={
      gameType:setupGameType,
      numPlayers,
      startBB:+$('startBB').value,
      startBlind:+$('startBlind').value,
      timer:$('timerChk').checked,
      difficulty
    };
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
  /* --- clear saved data (human name for localStorage wipe) --- */
  $('resetInfoBtn').onclick=()=>{
    const info=$('resetInfo');
    const hidden=info.classList.toggle('hidden');
    $('resetInfoBtn').setAttribute('aria-expanded',hidden?'false':'true');
  };
  $('timerInfoBtn').onclick=()=>$('timerInfo').classList.toggle('hidden');
  $('koBonusInfoBtn').onclick=()=>$('koBonusInfo').classList.toggle('hidden');
  wireCoachInfoTips();
  $('resetBtn').onclick=()=>{
    if(!confirm(T('resetConfirm')))return;
    try{
      localStorage.removeItem('sg_poker_stats');
      localStorage.removeItem('sg_poker_history');
      localStorage.removeItem('sg_poker_resume');
      localStorage.removeItem('sg_poker_games');
      if(typeof resetRewards==='function') resetRewards();
    }catch(e){}
    Object.assign(lifeStats,{hands:0,won:0,net:0,biggest:0,decisions:0,followed:0});
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
  $('rpPrevH').onclick=()=>{rpHandIdx--;rpStreet=99;rpRender();};
  $('rpNextH').onclick=()=>{rpHandIdx++;rpStreet=99;rpRender();};
  $('rpPrevS').onclick=()=>{rpStreet--;rpRender();};
  $('rpNextS').onclick=()=>{rpStreet++;rpRender();};
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
  $('chatIn').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();mpChatSend();}});
  $('quitBtn').onclick=()=>{
    if(MP){ if(confirm(T('quit')+'?')) mpLeave(); return; }
    const cash=isCashGame();
    if(confirm(T(cash?'quitCash':'quitSng'))){
      if(cash){
        showCashSessionEnd();
        $('game').classList.add('hidden');
        $('setup').classList.remove('hidden');
        refreshResume(); updateOrient();
        return;
      }
      state.gameOver=true; clearResume(); hideNextBtn(); hideActions();
      $('game').classList.add('hidden'); $('setup').classList.remove('hidden');
      refreshResume(); updateOrient();
    }
  };
  $('ovBtn').onclick=()=>{
    closeDialog($('overlay'));
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
