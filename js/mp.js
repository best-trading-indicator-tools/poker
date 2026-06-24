/* ================= MULTIPLAYER (P2P via WebRTC / PeerJS) =================
   Host-authoritative: the room creator's browser runs the engine and broadcasts
   redacted state snapshots (each player only ever receives their own hole cards).
   Free signaling via the public PeerJS cloud; game data flows directly P2P. */
let MP=null;
const MP_V='mp3';   // protocol version — both sides must match
function mpMaxPlayers(){ return typeof maxSetupPlayers==='function'?maxSetupPlayers():9; }
/* STUN + free TURN relays: lets phones on cellular/strict NATs reach the host */
const MP_ICE={config:{iceServers:[
  {urls:['stun:stun.l.google.com:19302','stun:global.stun.twilio.com:3478']},
  {urls:'turn:openrelay.metered.ca:80',username:'openrelayproject',credential:'openrelayproject'},
  {urls:'turn:openrelay.metered.ca:443',username:'openrelayproject',credential:'openrelayproject'}
]}};
function mpLoadLib(cb){
  if(window.Peer)return cb();
  const s=document.createElement('script');
  s.src='https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.4/peerjs.min.js';
  s.onload=cb;
  s.onerror=()=>{mpStatus(T('mpNetFail'));};
  document.head.appendChild(s);
}
function mpStatus(t){const el=$('mpStatus');el.classList.remove('hidden');el.textContent=t;}
function mpCode(){const A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let c='';for(let i=0;i<6;i++)c+=A[Math.floor(Math.random()*A.length)];return c;}
function mpName(){const v=($('mpName').value||'').trim();if(!v){mpStatus(T('mpNeedName'));return null;}try{localStorage.setItem('sg_poker_mpname',v);}catch(e){}return v;}

function mpCreate(){
  const name=mpName(); if(!name)return;
  mpStatus(T('mpConnecting'));
  mpLoadLib(()=>{
    const code=mpCode();
    const peer=new Peer('sgp-'+code,MP_ICE);
    MP={role:'host',peer,code,hostId:'sgp-'+code,myName:name,conns:[],started:false,mig:0};
    peer.on('open',()=>{
      mpStatus(''); mpLobbyShow();
      try{location.hash='room='+code;}catch(e){}   // host URL becomes the invite link itself
    });
    peer.on('disconnected',()=>{try{peer.reconnect();}catch(e){}});  // keep signaling alive
    peer.on('error',e=>{if(!MP||!MP.started)mpStatus(T('mpNetFail')+' ('+e.type+')');});
    peer.on('connection',conn=>{
      conn.on('data',d=>mpHostData(conn,d));
      conn.on('close',()=>mpHostDrop(conn));   // only a real close drops a player (errors can be transient)
    });
  });
}
function mpJoin(){
  const name=mpName(); if(!name)return;
  const code=($('mpCode').value||'').trim().toUpperCase();
  if(code.length<4){mpStatus(T('mpCodePh'));return;}
  mpStatus(T('mpConnecting'));
  mpLoadLib(()=>{
    const peer=new Peer(MP_ICE);
    MP={role:'client',peer,code,myName:name,seat:null,sentTok:'',lastBanner:0,ended:false,connected:false};
    const fail=msg=>{
      closeDialog($('mpLobby'));
      mpStatus(msg);
      try{peer.destroy();}catch(e){}
      MP=null;
    };
    peer.on('disconnected',()=>{try{peer.reconnect();}catch(e){}});  // keep signaling alive
    peer.on('error',e=>{
      if(e.type==='peer-unavailable'){if(MP&&MP._adv&&!MP.connected)MP._adv();}
      else if(!MP||!MP.connected)fail(T('mpNetFail')+' ('+e.type+')');
    });
    peer.on('open',()=>{
      /* JSON serialization (iOS Safari kills binary channels). Probe the original
         room id, then migrated ids (-m1, -m2…) so invite links survive host changes. */
      let attempt=0,opened=false;
      const tryNext=()=>{
        if(!MP||opened)return;
        if(attempt>6){fail(T('mpRoomGone'));return;}
        const id='sgp-'+code+(attempt===0?'':'-m'+attempt);
        attempt++;
        const conn=peer.connect(id,{reliable:true,serialization:'json'});
        MP.conn=conn;
        const wd=setTimeout(()=>{if(MP&&!opened){try{conn.close();}catch(e){}tryNext();}},5000);
        conn.on('open',()=>{
          clearTimeout(wd);opened=true;MP.connected=true;MP.hostId=id;
          mpStatus('');conn.send({t:'hello',n:name,v:MP_V});mpLobbyShow();
        });
        conn.on('data',d=>mpClientData(d));
        conn.on('close',()=>{if(opened&&MP&&MP.connected)mpHostGone();else{clearTimeout(wd);tryNext();}});
        conn.on('error',()=>{});
      };
      MP._adv=tryNext;
      tryNext();
    });
  });
}
function mpHostData(conn,d){
  if(!MP)return;
  if(d.t==='hello'){
    if(d.v!==MP_V){try{conn.send({t:'badver'});}catch(e){}setTimeout(()=>{try{conn.close();}catch(e){}},400);return;}
    if(MP.started){
      /* reconnect: same name as a disconnected seat → give the seat (and chips) back */
      const nm=(''+d.n).slice(0,14);
      const back=state&&state.players.find(q=>q.remote&&q.name===nm&&!q.out&&!MP.conns.some(c=>c.seat===q.i));
      if(back){
        MP.conns.push({conn,name:nm,seat:back.i});
        try{conn.send({t:'start',seat:back.i});}catch(e){}
        if(MP.lastCK){try{conn.send({t:'ck',d:MP.lastCK});}catch(e){}}
        mpChatAll('🛜',C2('mpRejoined',nm));
        render();
        return;
      }
      /* game running: queue the player — they get dealt in at the next hand */
      if(state&&!state.gameOver&&state.players.length+(MP.pending?MP.pending.length:0)<mpMaxPlayers()){
        (MP.pending=MP.pending||[]).push({conn,name:(''+d.n).slice(0,14)});
        try{conn.send({t:'wait'});}catch(e){}
        mpChatAll('🛜',C2('mpKnock',d.n));
      }else{
        try{conn.send({t:'full'});}catch(e){}
        setTimeout(()=>{try{conn.close();}catch(e){}},400);
      }
      return;
    }
    if(MP.conns.length>=mpMaxPlayers()-1){try{conn.send({t:'full'});}catch(e){}setTimeout(()=>{try{conn.close();}catch(e){}},400);return;}
    MP.conns.push({conn,name:(''+d.n).slice(0,14),seat:null});
    mpRoster(); mpChatLocal('· '+C2('mpJoined',d.n));
  }else if(d.t==='act'){
    const rec=MP.conns.find(c=>c.conn===conn);
    if(!rec||rec.seat==null||!state||state.gameOver||state.handOver)return;
    const p=state.players[state.turnIdx];
    if(!p||!p.remote||p.i!==rec.seat)return;
    applyAction(p,d.type==='raise'?'raise':d.type==='fold'?'fold':'call',+d.amount||0);
    state.turnIdx=(p.i+1)%state.players.length;
    promptNext();
  }else if(d.t==='chat'){
    const rec=MP.conns.find(c=>c.conn===conn);
    mpChatAll((rec?rec.name:'?'),(''+d.x).slice(0,200));
  }else if(d.t==='emo'){
    const rec=MP.conns.find(c=>c.conn===conn);
    if(!rec||rec.seat==null)return;
    const now=Date.now();
    if(rec.lastEmo&&now-rec.lastEmo<900)return;   // rate limit
    rec.lastEmo=now;
    showEmote(rec.seat,+d.e||0);
    MP.conns.forEach(c=>{try{c.conn.send({t:'emo',seat:rec.seat,e:+d.e||0});}catch(e){}});
  }
}
function mpClientData(d){
  if(!MP)return;
  if(d.t==='lobby'){MP.names=d.names;mpRosterRender(d.names);}
  else if(d.t==='start'){
    MP.seat=d.seat; MP.spectator=false; gameSeries=[]; MP.lastHand=null;
    closeDialog($('mpLobby'));
    $('setup').classList.add('hidden');
    $('game').classList.remove('hidden');
    $('chatBtn').classList.remove('hidden');showEmoteBtn();
    hideActions(); updateOrient();
  }
  else if(d.t==='st'){mpApplySnapshot(d.s);}
  else if(d.t==='ck'){MP.lastCK=d.d;}
  else if(d.t==='emo'){
    const N=state&&state.players?state.players.length:mpMaxPlayers();
    const my=MP.seat||0;
    showEmote(((+d.seat-my)%N+N)%N,+d.e||0);
  }
  else if(d.t==='chat'){mpChatRender(d.n,d.x);}
  else if(d.t==='wait'){
    /* game in progress — watch the table as a spectator until we're dealt in */
    MP.spectator=true;
    closeDialog($('mpLobby'));
    $('setup').classList.add('hidden');
    $('game').classList.remove('hidden');
    $('chatBtn').classList.remove('hidden');showEmoteBtn();
    hideActions(); updateOrient();
    showBanner(T('mpWaitNext'));
  }
  else if(d.t==='badver'||d.t==='started'||d.t==='full'){
    MP.connected=false;          // suppress the "host left" path
    closeDialog($('mpLobby'));
    mpStatus(T(d.t==='badver'?'mpVerMismatch':d.t==='full'?'mpFull':'mpStarted'));
    try{MP.peer.destroy();}catch(e){}
    MP=null;
  }
  else if(d.t==='end'){mpHostGone();}
}
function mpHostDrop(conn){
  if(!MP||MP.role!=='host')return;
  if(MP.pending)MP.pending=MP.pending.filter(q=>q.conn!==conn);
  const rec=MP.conns.find(c=>c.conn===conn);
  if(!rec)return;
  MP.conns=MP.conns.filter(c=>c!==rec);
  if(MP.started&&rec.seat!=null&&state&&!state.gameOver){
    /* keep the seat — they auto-fold until they reconnect (same name = same seat & chips) */
    const p=state.players[rec.seat];
    if(p&&!p.out&&state.turnIdx===p.i&&!state.handOver&&!p.folded){
      const ca=Math.min(state.currentBet-p.bet,p.chips);
      applyAction(p,ca>0?'fold':'call');
      state.turnIdx=(p.i+1)%state.players.length;
      promptNext();
    }
    mpChatAll('🛜',C2('mpGone',rec.name));
  }else mpRoster();
}
function mpHostGone(){
  if(!MP)return;
  /* mid-game with a checkpoint: don't die — recover (rejoin the host, or take over) */
  if(MP.lastCK){ mpRecover(); return; }
  try{MP.peer&&MP.peer.destroy();}catch(e){}
  MP=null;
  alert(T('mpHostLeft'));
  location.hash='';
  location.reload();
}
/* connection to host lost mid-game: 1) try the host again (maybe OUR link blipped),
   2) if the host's room is truly gone, ranked takeover — first name in the checkpoint
   claims the deterministic next room id; everyone else joins them. */
function mpRecover(){
  const ck=MP.lastCK, code=MP.code, myName=MP.myName, oldHostId=MP.hostId||('sgp-'+code+(ck.mig?'-m'+ck.mig:''));
  try{MP.peer&&MP.peer.destroy();}catch(e){}
  MP={role:'recovering',code,myName,lastCK:ck};
  showBanner(T('mpMigrating'));
  const probe=new Peer(MP_ICE);
  let settled=false;
  const escalate=()=>{
    if(settled||!MP)return; settled=true;
    try{probe.destroy();}catch(e){}
    mpMigrate();
  };
  const wd=setTimeout(escalate,8000);
  probe.on('error',e=>{if(e.type==='peer-unavailable'){clearTimeout(wd);escalate();}});
  probe.on('open',()=>{
    const c=probe.connect(oldHostId,{reliable:true,serialization:'json'});
    c.on('open',()=>{           // host is alive — it was our link; rejoin our seat
      if(settled)return; settled=true; clearTimeout(wd);
      MP={role:'client',peer:probe,code,myName,hostId:oldHostId,conn:c,seat:null,sentTok:'',lastBanner:0,ended:false,connected:true,lastCK:ck};
      c.on('data',d=>mpClientData(d));
      c.on('close',()=>mpHostGone());
      c.send({t:'hello',n:myName,v:MP_V});
    });
    c.on('error',()=>{});
    c.on('close',()=>{if(!settled){clearTimeout(wd);escalate();}});
  });
}
function mpMigrate(){
  const ck=MP&&MP.lastCK; if(!ck){alert(T('mpHostLeft'));location.reload();return;}
  const code=MP.code,myName=MP.myName;
  const order=ck.players.filter(p2=>!p2.ai&&!p2.out&&p2.name!==ck.hostName).map(p2=>p2.name);
  const rank=Math.max(0,order.indexOf(myName));
  const newId='sgp-'+code+'-m'+(ck.mig+1);
  MP={role:'migrating',code,myName,lastCK:ck};
  setTimeout(()=>{
    if(!MP)return;
    const peer=new Peer(newId,MP_ICE);
    peer.on('open',()=>mpBecomeHost(peer,newId));
    peer.on('disconnected',()=>{try{peer.reconnect();}catch(e){}});
    peer.on('error',e=>{
      if(e.type==='unavailable-id'){
        /* someone outranked us — join their new room */
        const p2=new Peer(MP_ICE);
        MP={role:'client',peer:p2,code,myName,hostId:newId,seat:null,sentTok:'',lastBanner:0,ended:false,connected:false,lastCK:ck};
        p2.on('disconnected',()=>{try{p2.reconnect();}catch(e2){}});
        p2.on('open',()=>{
          const c=p2.connect(newId,{reliable:true,serialization:'json'});
          MP.conn=c;
          c.on('open',()=>{MP.connected=true;c.send({t:'hello',n:myName,v:MP_V});});
          c.on('data',d=>mpClientData(d));
          c.on('close',()=>mpHostGone());
        });
      }else if(!MP||MP.role==='migrating'){alert(T('mpHostLeft'));location.reload();}
    });
  },rank*3000+600);
}
/* a guest becomes the new host: rebuild the tournament from the public checkpoint */
function mpBecomeHost(peer,newId){
  const ck=MP.lastCK,myName=MP.myName,code=MP.code;
  MP={role:'host',peer,code,hostId:newId,myName,conns:[],started:true,mig:ck.mig+1,pending:[],lastCK:ck};
  peer.on('connection',conn=>{
    conn.on('data',d=>mpHostData(conn,d));
    conn.on('close',()=>mpHostDrop(conn));
  });
  newGame({numPlayers:ck.players.length,startBB:ck.cfg.startBB,startBlind:ck.cfg.startBlind,
           ante:ck.cfg.ante,speed:ck.cfg.speed,difficulty:ck.cfg.difficulty});
  ck.players.forEach((cp,i)=>{
    const q=state.players[i]; if(!q)return;
    q.name=cp.name; q.avatar=cp.avatar||q.avatar; q.chips=cp.chips; q.out=cp.out; q.place=cp.place||0; q.bank=cp.bank!=null?cp.bank:TT_BANK;
    if(cp.ai){q.isHuman=false;q.remote=false;q.style=STYLES.find(s2=>s2.id===cp.style)||q.style;}
    else if(cp.name===myName){q.isHuman=true;q.remote=false;q.avatar='😎';}
    else{q.isHuman=false;q.remote=true;q.style=null;}
  });
  state.handNum=ck.handNumNext-1;
  state.dealerIdx=ck.dealerIdx;
  state.cfg.numPlayers=ck.players.length;
  state.cfg.mpRemotes=[];   // marks this as a multiplayer game (no resume saving etc.)
  if(HAS_DOM){
    closeDialog($('mpLobby'));
    $('setup').classList.add('hidden');
    $('game').classList.remove('hidden');
    $('chatBtn').classList.remove('hidden');showEmoteBtn();
    buildSeats(); hideActions(); renderStats(); updateOrient();
    mpChatRender('🛜',C2('mpMigrated',myName));
    showBanner(C2('mpMigrated',myName));
  }
  setTimeout(startHand,7000);   // grace: give the others time to find the new room
}
function mpRoster(){
  if(!MP||MP.role!=='host')return;
  const names=[MP.myName].concat(MP.conns.map(c=>c.name));
  mpRosterRender(names);
  MP.conns.forEach(c=>{try{c.conn.send({t:'lobby',names});}catch(e){}});
  /* opt-in auto-start once the table size chosen in the setup menu is reached */
  const target=Math.max(2,+($('mpAutoN').textContent)||2);
  if($('mpAuto').checked&&!MP.started&&names.length>=target){
    setTimeout(()=>{if(MP&&!MP.started)mpStartGame();},1500);
  }
}
function mpRosterRender(names){
  $('mpList').innerHTML=names.map((n,i)=>{
    const you=(MP.role==='host'&&i===0)||(MP.role==='client'&&n===MP.myName&&names.indexOf(n)===i&&i>0);
    return `<div><span class="mpdot">●</span>${n} ${i===0?(MP.role==='host'?T('mpYou'):''):''}${you&&i>0?T('mpYouG'):''}</div>`;
  }).join('');
}
function mpLobbyShow(){
  openDialog($('mpLobby'),'mpLobbyTitle');
  $('mpLobbyCode').textContent=MP.code;
  $('mpVerTag').textContent='v '+MP_V;
  const host=MP.role==='host';
  $('mpStartBtn').classList.toggle('hidden',!host);
  $('mpFillWrap').style.display=host?'flex':'none';
  $('mpAutoWrap').style.display=host?'flex':'none';
  $('mpAutoN').textContent=Math.max(2,+($('pCount').textContent)||2);
  $('mpWait').classList.remove('hidden');
  $('mpWait').textContent=host?T('mpHostHint'):T('mpWaitHost');
  if(host)mpRoster(); else $('mpList').innerHTML='<div><span class="mpdot">●</span>…</div>';
}
function mpStartGame(){
  if(!MP||MP.role!=='host')return;
  const humans=1+MP.conns.length;
  const fill=$('mpFill').checked;
  MP.started=true;   // solo + no bots = open table: sit and wait, dealing starts when a friend arrives
  MP.conns.forEach((c,k)=>{c.seat=k+1;});
  const cap=mpMaxPlayers();
  const want=+($('pCount').textContent)||cap;
  const total=fill?Math.max(humans,Math.min(cap,Math.max(want,humans))):humans;
  const cfg={
    numPlayers:total,
    gameType:'sng',
    startBB:+$('startBB').value, startBlind:+$('startBlind').value,
    ante:+$('anteSel').value, speed:document.querySelector('input[name=speed]:checked').value,
    difficulty:'medium',
    mpRemotes:MP.conns.map(c=>({name:c.name,seat:c.seat}))
  };
  MP.conns.forEach(c=>{try{c.conn.send({t:'start',seat:c.seat});}catch(e){}});
  closeDialog($('mpLobby'));
  logLines=[];
  $('setup').classList.add('hidden');
  $('game').classList.remove('hidden');
  $('chatBtn').classList.remove('hidden');showEmoteBtn();
  newGame(cfg);
  state.players[0].name=MP.myName;   // host plays under their chosen name
  buildSeats(); hideActions(); lastHand=null;
  $('coachFeed').classList.add('hidden');
  renderStats(); updateOrient();
  setTimeout(startHand,600);
}
/* multiplayer turn timer: 25s to act, then your personal TIME BANK (60s per tournament)
   kicks in automatically for the big decisions; only then auto check/fold */
let TT_BASE=25000,TT_BANK=60000;
/* Deadline-driven expiry. ttCheck() is called BOTH from setTimeout backups and from the
   350ms UI interval, so auto check/fold fires even when the browser throttles or drops
   timers (phone screen dim, tab switch, suspended PWA, game resumed from a snapshot). */
function ttCheck(){
  if(!state||!state._tt||!state.turnDeadline||state.gameOver||state.handOver)return;
  if(typeof MP!=='undefined'&&MP&&MP.role==='client')return;   // host enforces; clients just display
  if(Date.now()<state.turnDeadline+600)return;
  const q=state.players[state.turnIdx];
  if(!q||(!q.isHuman&&!q.remote)){state._tt=null;return;}
  if(!state.turnBank&&(q.bank||0)>1000){
    /* big decision: burn the time bank */
    state.turnBank=true;
    state.turnDeadline=Date.now()+q.bank;
    q.bankInUse=Date.now();
    setTimeout(ttCheck,q.bank+700);   // backup for the bank leg (headless / belt & suspenders)
    if(HAS_DOM)render();
    return;
  }
  if(state.turnBank){q.bank=0;q.bankInUse=0;state.turnBank=false;}
  state._tt=null;state.turnDeadline=0;
  const ca=Math.min(state.currentBet-q.bet,q.chips);
  log(`${q.name}: ⏱`);
  if(q.isHuman&&HAS_DOM)hideActions();
  applyAction(q,ca>0?'fold':'call');
  state.turnIdx=(q.i+1)%state.players.length;
  promptNext();
}
function armTurnTimer(p){
  if(!state||!state.cfg||(!state.cfg.mpRemotes&&!state.cfg.timer))return;   // multiplayer, or solo opt-in
  state.turnDeadline=Date.now()+TT_BASE;
  state.turnBank=false;
  state._tt=state.handNum+'-'+state.stage+'-'+state.turnIdx+'-'+state.currentBet;
  setTimeout(ttCheck,TT_BASE+700);   // backup; the UI interval is the primary enforcer
}

/* checkpoint: PUBLIC tournament state at each hand boundary — chips, seats, level.
   Every client stores the latest one; if the host vanishes, the first remaining
   player rebuilds the game from it and becomes the new host. No hole cards inside. */
function mpBroadcastCK(){
  if(!MP||MP.role!=='host'||!MP.started||!state)return;
  const d={mig:MP.mig||0,hostName:MP.myName,handNumNext:state.handNum+1,dealerIdx:state.dealerIdx,
    cfg:{numPlayers:state.players.length,startBB:state.cfg.startBB,startBlind:state.cfg.startBlind,
         ante:state.cfg.ante,speed:state.cfg.speed,difficulty:state.cfg.difficulty},
    players:state.players.map(q=>({name:q.name,avatar:q.avatar,chips:q.chips,out:q.out,place:q.place||0,
      ai:!q.isHuman&&!q.remote,style:q.style?q.style.id:null,bank:q.bank||0}))};
  MP.lastCK=d;
  for(const c of MP.conns){try{c.conn.send({t:'ck',d});}catch(e){}}
}

/* a remote seat with no live connection auto-folds its turns until the player returns */
function mpConnAlive(seat){
  return !!(MP&&MP.role==='host'&&MP.conns.some(c=>c.seat===seat&&c.conn&&c.conn.open));
}

/* seat queued late-joiners at the start of a hand (host only) */
function mpSeatPending(){
  if(!MP||MP.role!=='host'||!MP.pending||!MP.pending.length||!state||state.gameOver)return;
  let added=false;
  while(MP.pending.length){
    const q=MP.pending.shift();
    /* friends beat robots: a joining human takes over the shortest-stacked AI seat */
    const ai=state.players.filter(p2=>!p2.isHuman&&!p2.remote&&!p2.out).sort((x,y)=>x.chips-y.chips)[0];
    let i;
    if(ai){
      i=ai.i;
      mpChatAll('🛜',C2('mpReplaced',q.name,ai.name));
      ai.name=q.name; ai.avatar='🙂'; ai.remote=true; ai.isHuman=false; ai.style=null;
      ai.chips=state.cfg.startBB*(state.cfg.startBlind||100);
      ai.rangeCap=1; ai.rangeFloor=0; ai.aggStreets=[]; ai.checkStreets=[]; ai.lineRead=''; ai.bank=TT_BANK;
    }else if(state.players.length<mpMaxPlayers()){
      i=state.players.length;
      state.players.push({i,name:q.name,avatar:'🙂',isHuman:false,remote:true,
        chips:state.cfg.startBB*(state.cfg.startBlind||100),hole:[],folded:false,out:false,allIn:false,
        bet:0,totalBet:0,acted:false,lastAct:'',revealed:false,place:0,style:null,
        rangeCap:1,rangeFloor:0,checkedStreet:false,aggStreets:[],checkStreets:[],lineRead:'',bank:TT_BANK});
      mpChatAll('🛜',C2('mpJoined',q.name));
    }else{
      try{q.conn.send({t:'full'});}catch(e){}
      setTimeout(()=>{try{q.conn.close();}catch(e){}},400);
      continue;
    }
    MP.conns.push({conn:q.conn,name:q.name,seat:i});
    try{q.conn.send({t:'start',seat:i});}catch(e){}
    added=true;
  }
  if(added){
    state.cfg.numPlayers=state.players.length;
    if(HAS_DOM&&!BENCH)buildSeats();
  }
}

/* per-recipient snapshot: seats rotated so the recipient sits at index 0; hole cards redacted */
function mpSnapshotFor(seat){
  const N=state.players.length;
  const rs=seat>=0?seat:0;            // spectators (seat -1) see the host-side view
  const rot=i=>((i-rs)%N+N)%N;
  const players=new Array(N);
  for(const q of state.players){
    players[rot(q.i)]={i:rot(q.i),name:q.name,avatar:q.avatar,
      isHuman:seat>=0&&q.i===seat,remote:false,chips:q.chips,bet:q.bet,totalBet:q.totalBet,
      folded:q.folded,out:q.out,allIn:q.allIn,acted:q.acted,lastAct:q.lastAct,
      revealed:q.revealed,place:q.place||0,pos:q.pos,style:q.style||null,bank:q.bank||0,
      rangeCap:q.rangeCap,rangeFloor:q.rangeFloor,checkedStreet:q.checkedStreet,
      aggStreets:q.aggStreets||[],checkStreets:q.checkStreets||[],lineRead:q.lineRead||'',
      hole:((seat>=0&&q.i===seat)||q.revealed)?q.hole:(q.hole||[]).map(()=>({r:2,s:0,hid:1}))};
  }
  return {players,board:state.board,stage:state.stage,
    currentBet:state.currentBet,lastRaiseSize:state.lastRaiseSize,
    turnIdx:rot(state.turnIdx),dealerIdx:rot(state.dealerIdx),
    pfAggIdx:state.pfAggIdx>=0?rot(state.pfAggIdx):-1,
    lastAggIdx:state.lastAggIdx>=0?rot(state.lastAggIdx):-1,
    handNum:state.handNum,level:state.level,levels:state.levels,bb:state.bb,sb:state.sb,ante:state.ante,
    turnLeft:state.turnDeadline?Math.max(0,state.turnDeadline-Date.now()):0,
    turnBank:!!state.turnBank,
    handOver:state.handOver,gameOver:state.gameOver,resultText:state.resultText||'',
    cfg:{numPlayers:state.cfg.numPlayers,speed:state.cfg.speed,ante:state.cfg.ante,
         startBlind:state.cfg.startBlind,startBB:state.cfg.startBB,difficulty:state.cfg.difficulty,mpClient:true},
    log:logLines.slice(-50)};
}
function mpBroadcast(){
  if(!MP||MP.role!=='host'||!MP.started||!state)return;
  if(MP.bq)return; MP.bq=true;
  queueMicrotask(()=>{
    MP.bq=false;
    if(!MP||!state)return;
    for(const c of MP.conns){
      if(c.seat==null)continue;
      try{c.conn.send({t:'st',s:mpSnapshotFor(c.seat)});}catch(e){}
    }
    /* queued players spectate (fully redacted view) until they're dealt in */
    if(MP.pending&&MP.pending.length){
      const spec=mpSnapshotFor(-1);
      for(const q of MP.pending){try{q.conn.send({t:'st',s:spec});}catch(e){}}
    }
  });
}
function mpApplySnapshot(s){
  state=s;
  state.turnDeadline=s.turnLeft?Date.now()+s.turnLeft:0;
  state.turnBank=!!s.turnBank;
  if(MP&&typeof MP.lastHand==='number'&&s.handNum!==MP.lastHand){gameSeries.push({h:s.handNum,c:s.players[0].chips});}
  if(MP)MP.lastHand=s.handNum;
  logLines=s.log||logLines;
  if(HAS_DOM){const el=$('log');if(el)el.innerHTML=logLines.slice(-100).map(l=>`<div>${l}</div>`).join('');}
  if(!$('seat0')) buildSeats();
  render();
  const me=s.players[0];
  const myTurn=!s.gameOver&&!s.handOver&&me.isHuman&&s.turnIdx===0&&!me.folded&&!me.out&&!me.allIn
    &&(!me.acted||me.bet<s.currentBet);
  const tok=s.handNum+'-'+s.stage+'-'+s.currentBet+'-'+me.bet;
  if(myTurn&&MP.sentTok!==tok){showActions(me);}
  else if(!myTurn)hideActions();
  if(s.handOver&&s.resultText&&MP.lastBanner!==s.handNum){MP.lastBanner=s.handNum;showBanner(s.resultText);}
  if(s.gameOver&&!MP.ended){MP.ended=true;showGameOver(!me.out,me.out?(me.place||s.cfg.numPlayers):1);}
}
/* chat */
function mpChatRender(n,x){
  if(!HAS_DOM)return;
  const m=$('chatMsgs');
  const div=document.createElement('div');
  div.innerHTML=`<b></b> `;
  div.querySelector('b').textContent=n+':';
  div.appendChild(document.createTextNode(' '+x));
  m.appendChild(div);
  while(m.children.length>120)m.removeChild(m.firstChild);
  m.scrollTop=m.scrollHeight;
  if($('chat').classList.contains('hidden'))$('chatBtn').textContent='💬•';
}
function mpChatLocal(x){mpChatRender('ℹ️',x);}
function mpChatAll(n,x){
  mpChatRender(n,x);
  if(MP&&MP.role==='host')MP.conns.forEach(c=>{try{c.conn.send({t:'chat',n,x});}catch(e){}});
}
function mpChatSend(){
  const inp=$('chatIn'); const x=(inp.value||'').trim();
  if(!x||!MP)return;
  inp.value='';
  if(MP.role==='host')mpChatAll(MP.myName,x);
  else{try{MP.conn.send({t:'chat',x});}catch(e){}}
}
function mpLeave(){
  if(MP){
    if(MP.role==='host')MP.conns.forEach(c=>{try{c.conn.send({t:'end'});}catch(e){}});
    try{MP.peer&&MP.peer.destroy();}catch(e){}
  }
  MP=null;
  location.hash='';
  location.reload();
}
/* connection self-test: two peers on THIS device talk through the real cloud + TURN —
   tests the exact stack a room uses, and reports which stage failed */
function mpSelfTest(){
  const out=$('mpStatus'); out.classList.remove('hidden');
  out.textContent='1/3 — '+T('mpTestSig');
  mpLoadLib(()=>{
    let a=null,b=null,done=false;
    const finish=msg=>{if(done)return;done=true;out.textContent=msg;try{a&&a.destroy();}catch(e){}try{b&&b.destroy();}catch(e){}};
    const t=setTimeout(()=>finish('❌ 3/3 — '+T('mpTestRtcFail')),20000);
    a=new Peer(MP_ICE);
    a.on('error',e=>{clearTimeout(t);finish('❌ 1/3 — '+T('mpTestSigFail')+' ('+e.type+')');});
    a.on('open',()=>{
      out.textContent='2/3 — '+T('mpTestRtc');
      a.on('connection',cc=>{cc.on('data',()=>{clearTimeout(t);finish('✅ '+T('mpTestOK'));});});
      b=new Peer(MP_ICE);
      b.on('error',e=>{clearTimeout(t);finish('❌ 2/3 — '+T('mpTestSigFail')+' ('+e.type+')');});
      b.on('open',()=>{
        const c=b.connect(a.id,{reliable:true,serialization:'json'});
        c.on('open',()=>c.send({ping:1}));
        c.on('error',()=>{});
      });
    });
  });
}

/* helper: template strings that live in TR (mpJoined/mpGone are functions there) */
function C2(k,...a){
  const f=(TR[lang]&&TR[lang][k])!==undefined?TR[lang][k]:TR.en[k];
  if(typeof f==='function')return f(...a);
  if(f!==undefined)return f;
  try{return C(k,...a);}catch(e){return k;}
}
