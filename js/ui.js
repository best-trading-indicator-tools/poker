/* ================= I18N (UI chrome; coach prose stays English for now) ================= */
const TR={
en:{sub:"No-Limit Texas Hold'em tournament vs AI",players:"Players",blinds:"Blinds",buyin:"Buy-in",ante:"Ante",noAnte:"no ante",
speed:"Blinds Change Speed",turbo:"Turbo",standard:"Standard",slow:"Slow",diff:"AI Difficulty",easy:"Easy",medium:"Medium",hard:"Hard",language:"Language",
deal:"Deal me in",resume:"▶ Resume tournament",resumeMid:"▶ Resume mid-hand",review:"📊 Session review",
revTitle:"Session review",revWinRate:"Win rate",revITM:"In the money",revAvgFinish:"Avg finish",
revNet:"Total net",revEVLeaked:"EV leaked",revGames:"Games",revNoGames:"No finished games yet — play a tournament!",
revAllHands:"All saved hands",revReplay:"Tap a game to replay its hands",revMidBanner:"Hand in progress — resumed",
resetData:"Clear saved data",resetInfo:"Deletes everything this game keeps in your browser: lifetime stats, hand history and any unfinished tournament you could resume. Your language choice stays. This can't be undone.",resetConfirm:"Delete all saved stats, hand history and any unfinished tournament?",resetDone:"✓ Cleared",
level:"Level ",hand:"Hand ",blindsUpA:"Blinds up in ",blindsUpB:" hands",autoNext:"Auto next hand",coachLbl:"🧭 Live coach",coachBtn:"Coach",quit:"Quit",
fold:"Fold",check:"Check",call:"Call",allin:"All-in",raiseTo:"Raise to ",betW:"Bet ",raiseW:"Raise",min:"Min",halfPot:"½ Pot",pot:"Pot",
actMenu:"◀ Menu",actTurn:"◀ Turn",
log:"Log",lastHand:"Last hand",exportH:"Export history",nextHand:"Next hand ▶",liveCoach:"🧭 LIVE COACH",
waiting:"Advice appears here when it's your turn.",
yourHand:"Your hand",position:"Position",actingOrder:"Acting order",postflopOrder:"Postflop order",winChance:"Win chance",draws:"Draws",potOdds:"Pot odds",yourStack:"Your stack",sugSize:"Suggested size",
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
viewChart:"📊 View this position's chart",chartTitleOpen:"opening chart",chartTitleShove:"all-in chart",chartTitleFacing:"chart vs this raise",
viewRange:"📊 View the bettor's estimated range",chartTitleRange:"estimated range right now",legendRange:"hands he could still have",
legendOpen:"raise first-in",legendShove:"go all-in",legendFold:"fold",legendYou:"your hand",legend3bet:"re-raise (3-bet)",legendCall:"call",
benchConfirm:"Simulate 25 full 9-player tournaments where a bot plays PURE coach advice, to measure how good the coach really is. Takes a minute or two. Run it?",
youWin:"You win the tournament!",playAgain:"Play again",
youWinSub:(n,h)=>`Outlasted ${n} opponents over ${h} hands.`,
bustedTitle:p=>`Busted in ${p} place`,bustedSub:h=>`Survived ${h} hands. Run it back?`,
evTotal:"📉 Total EV leaked",deviations:"deviations",cleanGame:"No EV leaked vs the coach — clean game! 🎯",smallerLeaks:"smaller leaks",
handNavP:"‹ hand",handNavN:"hand ›",streetNavP:"‹ street",streetNavN:"street ›",close:"Close",replayTitle:"Hand replay",
won:"won",foldedTag:"folded",showdown:"showdown",fullHand:"Full hand",preflop:"Preflop",flop:"Flop",turnSt:"Turn",riverSt:"River",noHands:"No completed hand yet this game.",
ord:n=>{const s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);}},
fr:{sub:"Tournoi de Texas Hold'em No-Limit contre l'IA",players:"Joueurs",blinds:"Blinds",buyin:"Cave (buy-in)",ante:"Ante",noAnte:"sans ante",
speed:"Vitesse des blinds",turbo:"Turbo",standard:"Standard",slow:"Lente",diff:"Niveau de l'IA",easy:"Facile",medium:"Moyen",hard:"Difficile",language:"Langue",
deal:"Distribuez !",resume:"▶ Reprendre le tournoi",resumeMid:"▶ Reprendre la main en cours",review:"📊 Bilan des sessions",
revTitle:"Bilan des sessions",revWinRate:"Taux de victoire",revITM:"Dans l'argent",revAvgFinish:"Place moyenne",
revNet:"Net total",revEVLeaked:"EV perdu",revGames:"Parties",revNoGames:"Aucune partie terminée — jouez un tournoi !",
revAllHands:"Toutes les mains sauvegardées",revReplay:"Touchez une partie pour revoir ses mains",revMidBanner:"Main en cours — reprise",
resetData:"Effacer les données sauvegardées",resetInfo:"Supprime tout ce que le jeu garde dans votre navigateur : statistiques globales, historique des mains et tout tournoi en cours à reprendre. Votre choix de langue est conservé. Irréversible.",resetConfirm:"Supprimer toutes les statistiques, l'historique des mains et tout tournoi en cours ?",resetDone:"✓ Effacé",
level:"Niveau ",hand:"Main ",blindsUpA:"Blinds montent dans ",blindsUpB:" mains",autoNext:"Main suivante auto",coachLbl:"🧭 Coach en direct",coachBtn:"Coach",quit:"Quitter",
fold:"Se coucher",check:"Parole",call:"Suivre",allin:"Tapis",raiseTo:"Relancer à ",betW:"Miser ",raiseW:"Relancer",min:"Min",halfPot:"½ Pot",pot:"Pot",
actMenu:"◀ Menu",actTurn:"◀ À vous",
log:"Journal",lastHand:"Dernière main",exportH:"Exporter l'historique",nextHand:"Main suivante ▶",liveCoach:"🧭 COACH EN DIRECT",
waiting:"Les conseils apparaissent ici quand c'est votre tour.",
yourHand:"Votre main",position:"Position",actingOrder:"Ordre de parole",postflopOrder:"Ordre post-flop",winChance:"Chance de gain",draws:"Tirages",potOdds:"Cote du pot",yourStack:"Votre tapis",sugSize:"Taille suggérée",
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
viewChart:"📊 Voir la charte de cette position",chartTitleOpen:"charte d'ouverture",chartTitleShove:"charte de tapis",chartTitleFacing:"charte face à cette relance",
viewRange:"📊 Voir la range estimée du miseur",chartTitleRange:"range estimée en ce moment",legendRange:"mains qu'il peut encore avoir",
legendOpen:"relancer en premier",legendShove:"partir à tapis",legendFold:"se coucher",legendYou:"votre main",legend3bet:"sur-relancer (3-bet)",legendCall:"suivre",
benchConfirm:"Simuler 25 tournois complets à 9 joueurs où un bot suit UNIQUEMENT les conseils du coach, pour mesurer sa vraie valeur. Compte une à deux minutes. Lancer ?",
youWin:"Vous remportez le tournoi !",playAgain:"Rejouer",
youWinSub:(n,h)=>`Vous avez survécu à ${n} adversaires en ${h} mains.`,
bustedTitle:p=>`Éliminé à la ${p} place`,bustedSub:h=>`${h} mains jouées. On remet ça ?`,
evTotal:"📉 EV totale perdue",deviations:"écarts",cleanGame:"Aucune EV perdue face au coach — partie parfaite ! 🎯",smallerLeaks:"autres fuites mineures",
handNavP:"‹ main",handNavN:"main ›",streetNavP:"‹ rue",streetNavN:"rue ›",close:"Fermer",replayTitle:"Revoir la main",
won:"gagné",foldedTag:"couché",showdown:"abattage",fullHand:"Main complète",preflop:"Pré-flop",flop:"Flop",turnSt:"Turn",riverSt:"River",noHands:"Aucune main terminée pour cette partie.",
ord:n=>n===1?'1re':n+'e'},
es:{sub:"Torneo de Texas Hold'em No-Limit contra la IA",players:"Jugadores",blinds:"Ciegas",buyin:"Entrada (buy-in)",ante:"Ante",noAnte:"sin ante",
speed:"Velocidad de ciegas",turbo:"Turbo",standard:"Estándar",slow:"Lenta",diff:"Nivel de la IA",easy:"Fácil",medium:"Medio",hard:"Difícil",language:"Idioma",
deal:"¡Reparte!",resume:"▶ Reanudar torneo",resumeMid:"▶ Reanudar mano en curso",review:"📊 Resumen de sesiones",
revTitle:"Resumen de sesiones",revWinRate:"Tasa de victorias",revITM:"En premios",revAvgFinish:"Puesto medio",
revNet:"Neto total",revEVLeaked:"EV perdido",revGames:"Partidas",revNoGames:"Sin partidas terminadas — ¡juega un torneo!",
revAllHands:"Todas las manos guardadas",revReplay:"Toca una partida para repetir sus manos",revMidBanner:"Mano en curso — reanudada",
resetData:"Borrar datos guardados",resetInfo:"Elimina todo lo que el juego guarda en tu navegador: estadísticas globales, historial de manos y cualquier torneo sin terminar. Tu idioma se mantiene. No se puede deshacer.",resetConfirm:"¿Borrar todas las estadísticas, el historial de manos y cualquier torneo sin terminar?",resetDone:"✓ Borrado",
level:"Nivel ",hand:"Mano ",blindsUpA:"Ciegas suben en ",blindsUpB:" manos",autoNext:"Mano siguiente auto",coachLbl:"🧭 Coach en vivo",coachBtn:"Coach",quit:"Salir",
fold:"Retirarse",check:"Pasar",call:"Igualar",allin:"All-in",raiseTo:"Subir a ",betW:"Apostar ",raiseW:"Subir",min:"Mín",halfPot:"½ Bote",pot:"Bote",
actMenu:"◀ Menú",actTurn:"◀ Turno",
log:"Registro",lastHand:"Última mano",exportH:"Exportar historial",nextHand:"Siguiente mano ▶",liveCoach:"🧭 COACH EN VIVO",
waiting:"Los consejos aparecen aquí cuando es tu turno.",
yourHand:"Tu mano",position:"Posición",actingOrder:"Orden de palabra",postflopOrder:"Orden post-flop",winChance:"Prob. de ganar",draws:"Proyectos",potOdds:"Odds del bote",yourStack:"Tu stack",sugSize:"Tamaño sugerido",
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
viewChart:"📊 Ver la tabla de esta posición",chartTitleOpen:"tabla de apertura",chartTitleShove:"tabla de all-in",chartTitleFacing:"tabla contra esta subida",
viewRange:"📊 Ver el rango estimado del apostador",chartTitleRange:"rango estimado ahora mismo",legendRange:"manos que aún puede tener",
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

function buildSeats(){
  if(!HAS_DOM)return;
  document.body.classList.toggle('few',state.players.length<=6);
  const felt=$('felt');
  felt.querySelectorAll('.seat,.betchip').forEach(e=>e.remove());
  for(const p of state.players){
    const seat=document.createElement('div');
    seat.className='seat'; seat.id='seat'+p.i;
    seat.innerHTML=`<div class="hole" id="hole${p.i}"></div>
      <div class="plate"><span class="avatar">${p.avatar}</span><div><div class="pname">${p.name}<span class="ppos" id="pos${p.i}"></span></div><div class="pchips" id="chips${p.i}"></div>${p.style?`<div class="pstyle">${p.style.label}</div>`:''}</div></div>
      <div class="lastact" id="act${p.i}"></div>
      <div class="tmr" id="tmr${p.i}"></div>`;
    felt.appendChild(seat);
    const bet=document.createElement('div');
    bet.className='betchip hidden'; bet.id='bet'+p.i;
    felt.appendChild(bet);
  }
  layoutSeats();
}
/* edge slots per player count: [x,y] fractions of the felt, seat CENTERS.
   index 0 = hero (bottom center), then counterclockwise (left first) like the ellipse order */
const SEAT_SLOTS={
2:[[.50,.92],[.50,.10]],
3:[[.50,.92],[.12,.24],[.88,.24]],
4:[[.50,.92],[.06,.52],[.50,.09],[.94,.52]],
5:[[.50,.92],[.09,.62],[.26,.10],[.74,.10],[.91,.62]],
6:[[.50,.92],[.09,.68],[.09,.18],[.50,.08],[.91,.18],[.91,.68]],
7:[[.50,.92],[.18,.80],[.05,.40],[.28,.09],[.72,.09],[.95,.40],[.82,.80]],
8:[[.50,.92],[.21,.82],[.05,.50],[.14,.13],[.50,.08],[.86,.13],[.95,.50],[.79,.82]],
9:[[.50,.92],[.24,.84],[.05,.56],[.08,.20],[.33,.07],[.67,.07],[.92,.20],[.95,.56],[.76,.84]]};
/* rotated-phone (body.fl): pull seats inward — topbar/action bar sit on the felt edges */
const SEAT_SLOTS_FL={
2:[[.50,.84],[.50,.16]],
3:[[.50,.84],[.16,.28],[.84,.28]],
4:[[.50,.84],[.12,.52],[.50,.16],[.88,.52]],
5:[[.50,.84],[.14,.62],[.30,.16],[.70,.16],[.86,.62]],
6:[[.50,.84],[.14,.66],[.14,.22],[.50,.14],[.86,.22],[.86,.66]],
7:[[.50,.84],[.22,.74],[.12,.44],[.30,.16],[.70,.16],[.88,.44],[.78,.74]],
8:[[.50,.84],[.24,.76],[.12,.50],[.18,.18],[.50,.14],[.82,.18],[.88,.50],[.76,.76]],
9:[[.50,.84],[.26,.74],[.12,.54],[.14,.24],[.33,.14],[.67,.14],[.86,.24],[.88,.54],[.74,.74]]};
function layoutSeats(){
  if(!HAS_DOM||!state||BENCH)return;
  const felt=$('felt');
  const W=felt.clientWidth,H=felt.clientHeight;
  /* size the ellipse to the REAL seat dimensions so full tables fit on narrow screens */
  let sW=100,sH=96;
  for(const p of state.players){
    const s=$('seat'+p.i);
    if(s&&s.offsetHeight){sW=Math.max(sW,s.offsetWidth);sH=Math.max(sH,s.offsetHeight);}
  }
  const cx=W/2,cy=H/2;
  const rx=Math.min(W*0.41,Math.max(60,(W-sW)/2-4));
  const ry=Math.min(H*0.40,Math.max(60,(H-sH)/2-8));
  const n=state.players.length;
  /* on mobile, an ellipse bunches seats at its ends — use hand-tuned edge slots instead
     (hero is always slot 0 at bottom center, others run counterclockwise like the ellipse) */
  const fl=HAS_DOM&&document.body.classList.contains('fl');
  const slots=isMobile()?(fl?SEAT_SLOTS_FL[n]:SEAT_SLOTS[n]):null;
  for(const p of state.players){
    let x,y;
    if(slots){
      x=W*slots[p.i][0]; y=H*slots[p.i][1];
    }else{
      const ang=(90+360*p.i/n)*Math.PI/180;
      x=cx+rx*Math.cos(ang); y=cy+ry*Math.sin(ang);
    }
    const seat=$('seat'+p.i);
    if(seat){seat.style.left=x+'px'; seat.style.top=(y-28)+'px';}
  }
  /* clamp pass: no seat may leave the felt (offset* geometry — safe under CSS transforms) */
  const actOpen=HAS_DOM&&document.body.classList.contains('act-panel-open');
  const pad=fl?{l:4,r:actOpen?22:6,t:8,b:6}:isMobile()?{l:2,r:actOpen?16:2,t:4,b:2}:{l:2,r:2,t:2,b:2};
  for(const p of state.players){
    const seat=$('seat'+p.i); if(!seat||!seat.offsetHeight)continue;
    const l=seat.offsetLeft,t=seat.offsetTop,w=seat.offsetWidth,h=seat.offsetHeight;
    let dx=0,dy=0;
    if(t+h>H-pad.b) dy=H-pad.b-(t+h);
    if(t+dy<pad.t)  dy=pad.t-t;
    if(l<pad.l)     dx=pad.l-l;
    if(l+dx+w>W-pad.r) dx=W-pad.r-(l+w);
    if(dx)seat.style.left=(parseFloat(seat.style.left)+dx)+'px';
    if(dy)seat.style.top=(parseFloat(seat.style.top)+dy)+'px';
  }
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
    const ezX=W*0.30, ezY=H*0.16;
    if(Math.abs(bx-cx)<ezX&&Math.abs(by-cy)<ezY){
      const s=Math.min(ezX/Math.max(Math.abs(bx-cx),1), ezY/Math.max(Math.abs(by-cy),1));
      const bx2=cx+(bx-cx)*s, by2=cy+(by-cy)*s;
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
    const boardBox={x:cx,y:cy,w:W*0.46,h:H*0.30};   // labels must not cover the board/pot either
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
  positionDealerBtn();
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
    const rxv=ux*Math.cos(A)-uy*Math.sin(A), ryv=ux*Math.sin(A)+uy*Math.cos(A);
    const off=Math.max(seat.offsetWidth,seat.offsetHeight)/2+18;
    d.style.left=(scx+rxv*off)+'px';
    d.style.top=(scy+ryv*off)+'px';
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
  $('tLevel').textContent=state.level+1;
  $('tBlinds').textContent=usd(state.sb)+'/'+usd(state.bb);
  $('tAnte').textContent=state.ante?usd(state.ante):'—';
  $('tHand').textContent=state.handNum;
  const per=SPEED_HANDS[state.cfg.speed];
  $('tNext').textContent= state.level>=LEVELS.length-1 ? '—' : (per-((state.handNum-1)%per+1)+1);
  const potCollected=state.players.reduce((s,p)=>s+p.totalBet-p.bet,0);
  const totalPot=state.players.reduce((s,p)=>s+p.totalBet,0);
  $('pot').textContent= totalPot>0?`Pot: ${money(totalPot)}`:'';
  setHTML($('potChips'),chipStackHTML(potCollected,true));
  setHTML($('board'),state.board.map((c,i)=>cardHTML(c,false,i>=prevBoardLen)).join(''));
  prevBoardLen=state.board.length;
  for(const p of state.players){
    const seat=$('seat'+p.i); if(!seat)continue;
    seat.classList.toggle('active', !state.handOver&&state.turnIdx===p.i&&!p.folded&&!p.out&&!p.allIn&&inHand().length>1);
    seat.classList.toggle('folded', p.folded&&!p.out);
    seat.classList.toggle('busted', p.out);
    seat.classList.toggle('winner', !!(winners&&winners.includes(p)));
    $('chips'+p.i).textContent= p.out?'OUT':money(p.chips)+(p.allIn?' · all-in':'');
    $('pos'+p.i).textContent= p.out?'':(p.pos||'');
    $('act'+p.i).textContent=p.lastAct;
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
function isMobile(){ return HAS_DOM && typeof window.matchMedia==='function' && window.matchMedia('(max-width:680px),(max-width:980px) and (orientation:portrait)').matches; }
function setActBar(open){
  if(!HAS_DOM||!isMobile())return;
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
  if(!fab||!g||g.classList.contains('hidden')){if(fab)fab.classList.add('hidden');return;}
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
  if(on){
    g.style.width=window.innerHeight+'px';
    g.style.height=window.innerWidth+'px';
    g.style.transform=`translateX(${window.innerWidth}px) rotate(90deg)`;
  }else{
    g.style.width=''; g.style.height=''; g.style.transform='';
  }
  layoutSeats();
  syncActFab();
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

function updateCoach(p){
  if(!HAS_DOM)return;
  const R=coachDecide(p);
  const {rec,coachT,evs,why,extra,handDesc,drawRow,eq,odds,callAmt,pot,opps,pos,early,late,
         actsFirst,actsLast,ordIdx,ordLen,M,mZone,icmPrem}=R;
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
  $('coachBody').innerHTML=
    `<div class="rec ${rec}">${recLabel}</div>`+
    `<div class="coach-row"><span>${T('yourHand')}</span><b>${handDesc}</b></div>`+
    (pos?`<div class="coach-row"><span>${T('position')}</span><b>${pos}${early?' (early)':late?' (late)':''}</b></div>`:'')+
    (opps>0?`<div class="coach-row"><span>${state.stage==='preflop'?T('postflopOrder'):T('actingOrder')}</span><b>${actsFirst?T('firstToAct'):actsLast?T('lastToAct'):(ordIdx+1)+' '+T('ofN')+' '+ordLen}</b></div>`:'')+
    `<div class="coach-row"><span>${T('winChance')}</span><b>~${pct(eq)} ${T('vs')} ${opps} ${opps>1?T('opps'):T('opp')}</b></div>`+
    drawRow+
    (callAmt>0?`<div class="coach-row"><span>${T('potOdds')}</span><b>${T('need')}${pct(odds)} (${usd(callAmt)} &rarr; ${usd(pot)})</b></div>`:'')+
    `<div class="coach-row"><span>${T('yourStack')}</span><b>${bbs(p.chips+p.bet)}</b></div>`+
    `<div class="coach-row"><span>M-ratio</span><b>M = ${M>99?'99+':Math.round(M)} · ${T('zone'+mZone)}</b></div>`+
    (icmPrem>=0.01?`<div class="coach-row"><span>💰 ${T('prizeP')}</span><b>+${Math.round(icmPrem*100)}% ${T('extraNeeded')}</b></div>`:'')+
    sizeRow+
    (R.chartInfo?`<button class="chart-link" id="chartViewBtn">${T(R.chartInfo.kind==='range'?'viewRange':'viewChart')}</button>`:'')+
    `<p class="why">${why.join(' ')}${extra.join('')}</p>`+
    mixTip(rec,R);
  if(R.chartInfo){
    const cb=$('chartViewBtn');
    if(cb) cb.onclick=()=>showChartMatrix(R.chartInfo,R.code);
  }
  coachRecNow={rec,stage:state.stage,evs};

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
  el.innerHTML=html;
}
function renderStats(){
  if(!HAS_DOM||!state||!state.sessStats||BENCH)return;
  const s=state.sessStats,l=lifeStats;
  const fp=S=>S.decisions>0?Math.round(100*S.followed/S.decisions)+'%':'—';
  const pof=(a,b)=>b>0?Math.round(100*(a||0)/b)+'%':'—';
  const af=(s.aCalls||0)>0?((s.aBets||0)/s.aCalls).toFixed(1):((s.aBets||0)>0?'∞':'—');
  $('coachStats').innerHTML=
    `<h4>${T('thisGame')}</h4>`+
    `<div class="srow"><span>${T('handsPW')}</span><b>${s.hands} / ${s.won}</b></div>`+
    `<div class="srow"><span>${T('net')}</span><b>${s.net>=0?'+':'−'}${usd(Math.abs(s.net))}</b></div>`+
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
  $('raiseBtn').textContent = (v>=allin ? T('allin')+' ' : (state.currentBet>0?T('raiseTo'):T('betW')))
    + `${usd(v)} (${bbs(v)})`;
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
      state.sessStats.evLost=(state.sessStats.evLost||0)+evLoss;
      (state.gameDecisions=state.gameDecisions||[]).push({hand:state.handNum,stage:state.stage,rec:r,action:type,evLoss});
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
    const a2=JSON.parse(localStorage.getItem('sg_poker_games')||'[]');
    a2.push({gameId:state.gameId,t:Date.now(),mp:!!(state.cfg&&(state.cfg.mpRemotes||state.cfg.mpClient)),
      n:state.cfg?state.cfg.numPlayers:0,diff:state.cfg?state.cfg.difficulty:'medium',
      place:won?1:(place||0),hands:state.handNum,
      net:state.sessStats?state.sessStats.net:0,evLost:state.sessStats?(state.sessStats.evLost||0):0,
      series:(gameSeries||[]).slice(-300)});
    while(a2.length>200)a2.shift();
    localStorage.setItem('sg_poker_games',JSON.stringify(a2));
  }catch(e){}
}
function loadGames(){
  try{return JSON.parse(localStorage.getItem('sg_poker_games')||'[]');}catch(e){return [];}
}
function paidPlaces(n){ return PAYOUTS(n||9).length; }
function evSparklineSVG(games){
  if(!games||games.length<2)return '';
  const series=games.map((g,i)=>({h:i+1,c:games.slice(0,i+1).reduce((s,x)=>s+(x.evLost||0),0)}));
  return sparklineSVG(series);
}
function showSessionReview(){
  if(!HAS_DOM)return;
  const games=loadGames().filter(g=>!g.mp).reverse();
  const n=games.length;
  const wins=games.filter(g=>g.place===1).length;
  const itm=games.filter(g=>g.place>0&&g.place<=paidPlaces(g.n)).length;
  const finishes=games.filter(g=>g.place>0);
  const avgFin=finishes.length?finishes.reduce((s,g)=>s+g.place,0)/finishes.length:0;
  const netTot=games.reduce((s,g)=>s+(g.net||0),0);
  const evTot=games.reduce((s,g)=>s+(g.evLost||0),0);
  $('revSummary').innerHTML=
    `<div class="rv"><span>${T('revGames')}</span><b>${n}</b></div>`+
    `<div class="rv"><span>${T('revWinRate')}</span><b>${n?Math.round(wins/n*100):0}%</b></div>`+
    `<div class="rv"><span>${T('revITM')}</span><b>${n?Math.round(itm/n*100):0}%</b></div>`+
    `<div class="rv"><span>${T('revAvgFinish')}</span><b>${avgFin?avgFin.toFixed(1):'—'}</b></div>`+
    `<div class="rv"><span>${T('revNet')}</span><b class="${netTot>=0?'pos':'neg'}">${netTot>=0?'+':'−'}${usd(Math.abs(netTot))}</b></div>`+
    `<div class="rv"><span>${T('revEVLeaked')}</span><b class="neg">−${usd(evTot)}</b></div>`;
  $('revSpark').innerHTML=n>=2?evSparklineSVG(games.slice().reverse()):'';
  if(!n){
    $('revList').innerHTML=`<p style="color:var(--dim);font-size:13px;">${T('revNoGames')}</p>`;
  }else{
    $('revList').innerHTML=`<p style="color:var(--dim);font-size:12px;margin-bottom:8px;">${T('revReplay')}</p>`+
      games.map(g=>{
        const when=new Date(g.t).toLocaleDateString();
        const net=g.net||0;
        const place=g.place===1?T('youWin'):g.place?T('ord')(g.place):'—';
        return `<div class="rev-game" data-gid="${g.gameId||''}"><div class="rg-main">`+
          `<div class="rg-title">${place} · ${g.n}p ${g.diff||''} · ${g.hands} hands</div>`+
          `<div class="rg-sub">${when}${g.evLost?` · EV −${usd(g.evLost)}`:''}</div></div>`+
          `<span class="rg-net ${net>=0?'pos':'neg'}">${net>=0?'+':'−'}${usd(Math.abs(net))}</span></div>`;
      }).join('');
    $('revList').querySelectorAll('.rev-game').forEach(el=>{
      el.onclick=()=>{
        const gid=el.dataset.gid;
        if(!gid)return;
        let hist=[]; try{hist=JSON.parse(localStorage.getItem('sg_poker_history')||'[]');}catch(e){}
        rpAll=hist.filter(h=>h.gameId===gid);
        if(!rpAll.length)return;
        rpHandIdx=0; rpStreet=99;
        closeDialog($('reviewOv'));
        rpRender();
        openDialog($('replayOv'),'rpTitle');
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
  render();
  $('ovEmoji').textContent=won?'🏆':'💀';
  $('ovTitle').textContent=won?T('youWin'):T('bustedTitle')(T('ord')(place));
  $('ovSub').textContent=won?T('youWinSub')(state.cfg.numPlayers-1,state.handNum):T('bustedSub')(state.handNum);
  $('ovSpark').innerHTML=sparklineSVG(gameSeries);
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
function ordinal(n){const s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);}

/* apply the chosen language to all static UI chrome */
function applyLang(){
  if(!HAS_DOM)return;
  const set=(id,k)=>{const el=$(id);if(el)el.textContent=T(k);};
  $('setup').querySelector('.sub').textContent=T('sub');
  const rowKeys=['players','blinds','buyin','ante','speed','timerOpt','language','diff'];
  document.querySelectorAll('#setup .row label.main').forEach((el,i)=>{if(rowKeys[i])el.textContent=T(rowKeys[i]);});
  const aSel=$('anteSel'); if(aSel) aSel.options[0].text=T('noAnte');
  const radios=document.querySelectorAll('#setup .radios label');
  const spKeys=['turbo','standard','slow'];
  radios.forEach((el,i)=>{if(el.lastChild)el.lastChild.nodeValue=' '+T(spKeys[i]);});
  const dBtns=$('diffSeg').querySelectorAll('button');
  ['easy','medium','hard'].forEach((k,i)=>{if(dBtns[i])dBtns[i].textContent=T(k);});
  set('startBtn','deal'); set('resumeBtn','resume'); set('reviewBtn','review');
  set('revTitle','revTitle'); set('revAllHands','revAllHands'); set('revClose','close');
  set('resetLbl','resetData'); set('resetInfo','resetInfo');
  set('mpTitle','mpTitle'); set('mpSub','mpSub'); set('mpCreate','mpCreate'); set('mpJoinBtn','mpJoinB');
  set('mpLobbyTitle','mpLobbyTitle'); set('mpCopy','mpCopy'); set('mpFillLbl','mpFillLbl');
  set('mpStartBtn','mpStart'); set('mpLeave','mpLeave');
  set('mpAutoLbl1','mpAutoA'); set('mpAutoLbl2','mpAutoB'); set('emoLbl','react'); set('emoHint','reactHint'); set('timerInfo','timerInfo');
  const mpn=$('mpName'); if(mpn)mpn.placeholder=T('mpNamePh');
  const mpc=$('mpCode'); if(mpc)mpc.placeholder=T('mpCodePh');
  const ci=$('chatIn'); if(ci)ci.placeholder=T('chatPh');
  /* topbar */
  const tn=(id,k)=>{const b=$(id);if(b&&b.parentNode.firstChild)b.parentNode.firstChild.nodeValue=T(k);};
  tn('tLevel','level'); tn('tHand','hand');
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
const EMOJIS=['👍','😂','😱','🔥','🐔','🤝'];
function showEmote(localSeat,e){
  if(!HAS_DOM)return;
  const seat=$('seat'+localSeat); if(!seat)return;
  const d=document.createElement('div');
  d.className='emoPop'; d.textContent=EMOJIS[e]||'👍';
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

/* ================= INIT / WIRING ================= */
function initUI(){
  let numPlayers=9, difficulty='medium';
  $('pMinus').onclick=()=>{numPlayers=Math.max(2,numPlayers-1);$('pCount').textContent=numPlayers;};
  $('pPlus').onclick =()=>{numPlayers=Math.min(9,numPlayers+1);$('pCount').textContent=numPlayers;};
  $('diffSeg').querySelectorAll('button').forEach(b=>{
    b.onclick=()=>{
      $('diffSeg').querySelectorAll('button').forEach(x=>x.classList.remove('on'));
      b.classList.add('on'); difficulty=b.dataset.d;
    };
  });
  $('startBtn').onclick=()=>{
    const cfg={
      numPlayers,
      startBB:+$('startBB').value,
      startBlind:+$('startBlind').value,
      timer:$('timerChk').checked,
      ante:+$('anteSel').value,
      speed:document.querySelector('input[name=speed]:checked').value,
      difficulty
    };
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
  /* --- resume saved tournament --- */
  const refreshResume=()=>{
    let sv=null; try{sv=JSON.parse(localStorage.getItem('sg_poker_resume'));}catch(e){}
    $('resumeBtn').classList.toggle('hidden',!sv);
    if(sv) $('resumeBtn').textContent=sv.midHand?T('resumeMid'):T('resume');
    let nHist=0; try{nHist=(JSON.parse(localStorage.getItem('sg_poker_history')||'[]')).length;}catch(e){}
    let nGames=0; try{nGames=loadGames().length;}catch(e){}
    $('reviewBtn').classList.toggle('hidden',!nHist&&!nGames);
    return sv;
  };
  refreshResume();
  $('reviewBtn').onclick=showSessionReview;
  $('revClose').onclick=()=>closeDialog($('reviewOv'));
  $('reviewOv').onclick=e=>{if(e.target.id==='reviewOv')closeDialog($('reviewOv'));};
  $('revAllHands').onclick=()=>{closeDialog($('reviewOv'));showHistoryReplay();};
  /* --- clear saved data (human name for localStorage wipe) --- */
  $('resetInfoBtn').onclick=()=>$('resetInfo').classList.toggle('hidden');
  $('timerInfoBtn').onclick=()=>$('timerInfo').classList.toggle('hidden');
  $('resetBtn').onclick=()=>{
    if(!confirm(T('resetConfirm')))return;
    try{
      localStorage.removeItem('sg_poker_stats');
      localStorage.removeItem('sg_poker_history');
      localStorage.removeItem('sg_poker_resume');
      localStorage.removeItem('sg_poker_games');
    }catch(e){}
    Object.assign(lifeStats,{hands:0,won:0,net:0,biggest:0,decisions:0,followed:0});
    refreshResume();
    if(state&&state.sessStats) renderStats();
    const lbl=$('resetLbl'),old=T('resetData');
    lbl.textContent=T('resetDone');
    setTimeout(()=>{lbl.textContent=T('resetData');},1600);
  };
  $('resumeBtn').onclick=()=>{
    const sv=refreshResume(); if(!sv)return;
    applyResumeSnapshot(sv);
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
    ['actFab','actBackdrop','actionbar'].forEach(id=>{
      const el=$(id); if(el) document.body.appendChild(el);
    });
    document.body.classList.add('act-panel-collapsed');
    $('game').classList.add('act-collapsed');
    $('actFab').classList.remove('hidden');
    $('actFab').onclick=e=>{e.stopPropagation();setActBar(true);};
    $('actBackdrop').onclick=()=>setActBar(false);
    syncActFab();
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
  $('emoBar').querySelectorAll('button').forEach((bt,i)=>{bt.onclick=()=>{mpEmote(i);$('emoBar').classList.add('hidden');};});
  $('chatSend').onclick=mpChatSend;
  $('chatIn').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();mpChatSend();}});
  $('quitBtn').onclick=()=>{
    if(MP){ if(confirm(T('quit')+'?')) mpLeave(); return; }
    if(confirm('Quit this tournament?')){
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
