/* ================= ARCADE REWARD LOOP (local-only) ================= */
(function(global){
  const STORE_KEY='sg_poker_rewards_v1';
  const VERSION=1;
  const DAILY_MISSIONS=[
    {id:'win3pots',label:'Win 3 pots',goal:3,xp:80},
    {id:'showdownWin',label:'Win a showdown',goal:1,xp:70},
    {id:'eliminate1',label:'Eliminate 1 player',goal:1,xp:120},
    {id:'final3',label:'Reach final 3',goal:1,xp:130},
    {id:'allInPressure',label:'Win with all-in pressure',goal:1,xp:110}
  ];
  const COSMETICS={
    felt:[
      {id:'classic',label:'Classic felt',level:1},
      {id:'midnight',label:'Midnight felt',level:2},
      {id:'emerald',label:'Emerald felt',level:6},
      {id:'royal',label:'Royal felt',level:11},
      {id:'lava',label:'Lava felt',level:16},
      {id:'arctic',label:'Arctic felt',level:21}
    ],
    cardBack:[
      {id:'blue',label:'Blue backs',level:1},
      {id:'gold',label:'Gold backs',level:3},
      {id:'red',label:'Red backs',level:8},
      {id:'black',label:'Black backs',level:12},
      {id:'carbon',label:'Carbon backs',level:17},
      {id:'platinum',label:'Platinum backs',level:22}
    ],
    avatarFrame:[
      {id:'plain',label:'Plain frame',level:1},
      {id:'neon',label:'Neon frame',level:4},
      {id:'champion',label:'Champion frame',level:10},
      {id:'diamond',label:'Diamond frame',level:18},
      {id:'crown',label:'Crown frame',level:23}
    ],
    emotePack:[
      {id:'classic',label:'Classic reactions',level:1},
      {id:'hype',label:'Hype reactions',level:5},
      {id:'elite',label:'Elite reactions',level:15},
      {id:'legend',label:'Legend reactions',level:20}
    ],
    winFx:[
      {id:'classic',label:'Classic win pop',level:1},
      {id:'fireworks',label:'Fireworks wins',level:7},
      {id:'goldRush',label:'Gold rush wins',level:13},
      {id:'neonBurst',label:'Neon burst wins',level:19},
      {id:'jackpot',label:'Jackpot wins',level:24}
    ],
    soundPack:[
      {id:'classic',label:'Classic sounds',level:1},
      {id:'arcade',label:'Arcade sounds',level:9},
      {id:'retro',label:'Retro sounds',level:14},
      {id:'casino',label:'Casino sounds',level:25}
    ]
  };
  const UNLOCKS=[
    {level:2,kind:'felt',id:'midnight'},
    {level:3,kind:'cardBack',id:'gold'},
    {level:4,kind:'avatarFrame',id:'neon'},
    {level:5,kind:'emotePack',id:'hype',major:true},
    {level:6,kind:'felt',id:'emerald'},
    {level:7,kind:'winFx',id:'fireworks'},
    {level:8,kind:'cardBack',id:'red'},
    {level:9,kind:'soundPack',id:'arcade'},
    {level:10,kind:'avatarFrame',id:'champion',major:true},
    {level:11,kind:'felt',id:'royal'},
    {level:12,kind:'cardBack',id:'black'},
    {level:13,kind:'winFx',id:'goldRush'},
    {level:14,kind:'soundPack',id:'retro'},
    {level:15,kind:'emotePack',id:'elite',major:true},
    {level:16,kind:'felt',id:'lava'},
    {level:17,kind:'cardBack',id:'carbon'},
    {level:18,kind:'avatarFrame',id:'diamond'},
    {level:19,kind:'winFx',id:'neonBurst'},
    {level:20,kind:'emotePack',id:'legend',major:true},
    {level:21,kind:'felt',id:'arctic'},
    {level:22,kind:'cardBack',id:'platinum'},
    {level:23,kind:'avatarFrame',id:'crown'},
    {level:24,kind:'winFx',id:'jackpot'},
    {level:25,kind:'soundPack',id:'casino',major:true}
  ];
  const TROPHIES=[
    {id:'biggestPot',label:'Biggest pot won',desc:'Set a personal biggest-pot record.'},
    {id:'firstTournamentWin',label:'First tournament win',desc:'Win a Sit & Go tournament.'},
    {id:'threeKosOneGame',label:'3 KOs in one game',desc:'Eliminate 3 players in one tournament.'},
    {id:'headsUpComeback',label:'Heads-up comeback',desc:'Trail heads-up, then win the tournament.'},
    {id:'bluffWin',label:'Win with a bluff',desc:'Win a pot after raising against the coach line.'},
    {id:'trashHandWin',label:'Win with trash hand',desc:'Win a pot with a weak unsuited starter.'}
  ];
  const emptySummary=()=>({
    xp:0,levelBefore:1,levelAfter:1,toasts:[],missions:[],records:[],unlocks:[],trophies:[],
    koCount:0,koBonus:0,koNames:[],
    winTier:'',duplicate:false
  });
  function todayKey(){
    const d=new Date();
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }
  function xpForLevel(level){
    const n=Math.max(0,(level||1)-1);
    return Math.round(300*n+75*n*(n-1));
  }
  function levelFromXp(xp){
    let level=1;
    while(level<99 && xp>=xpForLevel(level+1)) level++;
    return level;
  }
  function missionDefaults(){
    return Object.fromEntries(DAILY_MISSIONS.map(m=>[m.id,{progress:0,goal:m.goal,complete:false,claimed:false}]));
  }
  function defaultState(){
    return {
      version:VERSION,
      xp:0,
      level:1,
      lastDaily:todayKey(),
      missions:missionDefaults(),
      streaks:{win:0,bestWin:0,coach:0,bestCoach:0},
      records:{biggestPot:0,bestFinish:0,longestWinStreak:0,biggestComeback:0,tournamentWins:0,maxKosInGame:0,bluffWins:0,trashHandWins:0,headsUpComebackWins:0,allInPressureWins:0},
      trophies:{},
      unlockedCosmetics:{felt:['classic'],cardBack:['blue'],avatarFrame:['plain'],emotePack:['classic'],winFx:['classic'],soundPack:['classic']},
      equippedCosmetics:{felt:'classic',cardBack:'blue',avatarFrame:'plain',emotePack:'classic',winFx:'classic',soundPack:'classic'},
      processed:[]
    };
  }
  function clone(v){return JSON.parse(JSON.stringify(v));}
  function listIds(kind){return (COSMETICS[kind]||[]).map(x=>x.id);}
  function cosmeticLabel(kind,id){
    const c=(COSMETICS[kind]||[]).find(x=>x.id===id);
    return c?c.label:id;
  }
  function trophyLabel(id){
    const t=TROPHIES.find(x=>x.id===id);
    return t?t.label:id;
  }
  function nextUnlock(s){
    return UNLOCKS.filter(u=>u.level>s.level).sort((a,b)=>a.level-b.level)[0]||null;
  }
  function awardTrophy(s,summary,id){
    const t=s.trophies[id]||(s.trophies[id]={done:false,at:0});
    if(t.done)return;
    t.done=true;
    t.at=Date.now();
    summary.trophies.push({id,label:trophyLabel(id)});
    addToast(summary,`Trophy: ${trophyLabel(id)}`);
  }
  function normalize(raw){
    const s=raw&&typeof raw==='object'?raw:defaultState();
    s.version=VERSION;
    s.xp=Math.max(0,Number(s.xp)||0);
    s.level=levelFromXp(s.xp);
    if(s.lastDaily!==todayKey()){
      s.lastDaily=todayKey();
      s.missions=missionDefaults();
    }
    const existingMissions=s.missions&&typeof s.missions==='object'?s.missions:{};
    s.missions=missionDefaults();
    for(const m of DAILY_MISSIONS){
      const cur=existingMissions[m.id]||{};
      s.missions[m.id]={
        progress:Math.max(0,Math.min(m.goal,Number(cur.progress)||0)),
        goal:m.goal,
        complete:!!cur.complete,
        claimed:!!cur.claimed
      };
      if(s.missions[m.id].progress>=m.goal) s.missions[m.id].complete=true;
    }
    s.streaks=Object.assign({win:0,bestWin:0,coach:0,bestCoach:0},s.streaks||{});
    s.records=Object.assign({biggestPot:0,bestFinish:0,longestWinStreak:0,biggestComeback:0,tournamentWins:0,maxKosInGame:0,bluffWins:0,trashHandWins:0,headsUpComebackWins:0,allInPressureWins:0},s.records||{});
    s.trophies=s.trophies&&typeof s.trophies==='object'?s.trophies:{};
    for(const t of TROPHIES){
      if(!s.trophies[t.id])s.trophies[t.id]={done:false,at:0};
    }
    if(s.records.biggestPot>0)s.trophies.biggestPot={done:true,at:s.trophies.biggestPot.at||0};
    if(s.records.tournamentWins>0)s.trophies.firstTournamentWin={done:true,at:s.trophies.firstTournamentWin.at||0};
    if(s.records.maxKosInGame>=3)s.trophies.threeKosOneGame={done:true,at:s.trophies.threeKosOneGame.at||0};
    if(s.records.headsUpComebackWins>0)s.trophies.headsUpComeback={done:true,at:s.trophies.headsUpComeback.at||0};
    if(s.records.bluffWins>0)s.trophies.bluffWin={done:true,at:s.trophies.bluffWin.at||0};
    if(s.records.trashHandWins>0)s.trophies.trashHandWin={done:true,at:s.trophies.trashHandWin.at||0};
    s.unlockedCosmetics=s.unlockedCosmetics&&typeof s.unlockedCosmetics==='object'?s.unlockedCosmetics:{};
    s.equippedCosmetics=s.equippedCosmetics&&typeof s.equippedCosmetics==='object'?s.equippedCosmetics:{};
    for(const kind of Object.keys(COSMETICS)){
      const ids=listIds(kind);
      let unlocked=Array.isArray(s.unlockedCosmetics[kind])?s.unlockedCosmetics[kind].filter(id=>ids.includes(id)):[];
      const base=ids[0];
      if(base&&!unlocked.includes(base)) unlocked.unshift(base);
      s.unlockedCosmetics[kind]=[...new Set(unlocked)];
      if(!s.unlockedCosmetics[kind].includes(s.equippedCosmetics[kind])) s.equippedCosmetics[kind]=base;
    }
    s.processed=Array.isArray(s.processed)?s.processed.slice(-300):[];
    applyLevelUnlocks(s,emptySummary());
    return s;
  }
  function load(){
    try{return normalize(JSON.parse(localStorage.getItem(STORE_KEY)||'null'));}catch(e){return defaultState();}
  }
  function save(s){
    try{localStorage.setItem(STORE_KEY,JSON.stringify(s));}catch(e){}
  }
  function emit(summary){
    if(summary&&typeof global.__onRewardEvent==='function'){
      try{global.__onRewardEvent(summary);}catch(e){}
    }
  }
  function addToast(summary,text){if(text)summary.toasts.push(text);}
  function addXp(s,summary,amt,text){
    amt=Math.max(0,Math.round(Number(amt)||0));
    if(!amt)return;
    s.xp+=amt;
    summary.xp+=amt;
    if(text)addToast(summary,`${text} +${amt} XP`);
  }
  function applyLevelUnlocks(s,summary){
    for(const u of UNLOCKS){
      if(s.level<u.level)continue;
      const arr=s.unlockedCosmetics[u.kind]||(s.unlockedCosmetics[u.kind]=[]);
      if(arr.includes(u.id))continue;
      arr.push(u.id);
      summary.unlocks.push({kind:u.kind,id:u.id,label:cosmeticLabel(u.kind,u.id),level:u.level});
      addToast(summary,`Unlocked ${cosmeticLabel(u.kind,u.id)}`);
    }
  }
  function finalize(s,summary){
    summary.levelAfter=levelFromXp(s.xp);
    s.level=summary.levelAfter;
    applyLevelUnlocks(s,summary);
    if(summary.levelAfter>summary.levelBefore)addToast(summary,`Level ${summary.levelAfter}`);
    save(s);
    const out=clone(summary);
    if(!summary.silent)emit(out);
    return out;
  }
  function alreadyProcessed(s,key){
    if(!key)return false;
    if(s.processed.includes(key))return true;
    s.processed.push(key);
    while(s.processed.length>300)s.processed.shift();
    return false;
  }
  function progressMission(s,summary,id,amount){
    const def=DAILY_MISSIONS.find(m=>m.id===id);
    const m=def&&s.missions[id];
    if(!def||!m||m.claimed)return;
    const before=m.progress;
    m.progress=Math.min(m.goal,m.progress+Math.max(1,Number(amount)||1));
    if(before<m.goal&&m.progress>=m.goal){
      m.complete=true;
      m.claimed=true;
      summary.missions.push({id:def.id,label:def.label,xp:def.xp});
      addXp(s,summary,def.xp,`Mission: ${def.label}`);
    }
  }
  function recordEvent(type,payload){
    const s=load();
    const summary=emptySummary();
    summary.type=type;
    summary.levelBefore=s.level;
    summary.levelAfter=s.level;
    payload=payload||{};
    summary.silent=!!payload.silent;
    if(payload.key&&alreadyProcessed(s,payload.key)){
      summary.duplicate=true;
      return summary;
    }
    if(type==='handEnd'){
      if(payload.won){
        s.streaks.win=(s.streaks.win||0)+1;
        if(s.streaks.win>s.streaks.bestWin){
          s.streaks.bestWin=s.streaks.win;
          s.records.longestWinStreak=s.streaks.bestWin;
          summary.records.push({id:'longestWinStreak',label:'Longest win streak',value:s.streaks.bestWin});
        }
        progressMission(s,summary,'win3pots',1);
      }else{
        s.streaks.win=0;
      }
    }else if(type==='potWin'){
      const pot=Math.max(0,Number(payload.pot)||0);
      const bb=Math.max(1,Number(payload.bb)||1);
      const tier=pot>=bb*20?'monster':pot>=bb*8?'big':'normal';
      summary.winTier=tier;
      addXp(s,summary,tier==='monster'?50:tier==='big'?25:10,tier==='monster'?'Monster pot':tier==='big'?'Big pot':'Pot won');
      if(pot>(s.records.biggestPot||0)){
        s.records.biggestPot=pot;
        summary.records.push({id:'biggestPot',label:'Biggest pot',value:pot});
        addToast(summary,'New biggest pot');
        awardTrophy(s,summary,'biggestPot');
      }
      if(payload.allInPressure){
        s.records.allInPressureWins=(s.records.allInPressureWins||0)+1;
        progressMission(s,summary,'allInPressure',1);
      }
      if(payload.bluff){
        s.records.bluffWins=(s.records.bluffWins||0)+1;
        awardTrophy(s,summary,'bluffWin');
      }
      if(payload.trashHand){
        s.records.trashHandWins=(s.records.trashHandWins||0)+1;
        awardTrophy(s,summary,'trashHandWin');
      }
    }else if(type==='showdownWin'){
      progressMission(s,summary,'showdownWin',1);
      addXp(s,summary,15,'Showdown win');
    }else if(type==='allInShowdown'){
      if(payload.won){
        addXp(s,summary,35,'All-in won');
      }
    }else if(type==='ko'){
      const count=Math.max(1,Number(payload.count)||1);
      const bonus=Math.max(0,Number(payload.bonus)||0);
      summary.koCount=count;
      summary.koBonus=bonus;
      summary.koNames=Array.isArray(payload.names)?payload.names.filter(Boolean).slice(0,4):[];
      progressMission(s,summary,'eliminate1',count);
      addXp(s,summary,60*count,`KO x${count}`);
      if(bonus>0)addToast(summary,'KO bonus collected');
      const gameKo=Math.max(count,Number(payload.gameKoCount)||0);
      if(gameKo>(s.records.maxKosInGame||0))s.records.maxKosInGame=gameKo;
      if(gameKo>=3)awardTrophy(s,summary,'threeKosOneGame');
    }else if(type==='coachFollowed'){
      const count=Math.max(1,Number(payload.count)||1);
      s.streaks.coach=(s.streaks.coach||0)+count;
      s.streaks.bestCoach=Math.max(s.streaks.bestCoach||0,s.streaks.coach||0);
    }else if(type==='coachMissed'){
      s.streaks.coach=0;
    }else if(type==='gameEnd'){
      const mode=payload.mode||'sng';
      if(mode==='cash'){
        addXp(s,summary,20,'Cash session');
      }else{
        const place=Math.max(1,Number(payload.place)||9);
        const won=!!payload.won;
        if(won){
          addXp(s,summary,200,'Tournament win');
          s.records.tournamentWins=(s.records.tournamentWins||0)+1;
          awardTrophy(s,summary,'firstTournamentWin');
        }
        else if(place<=3)addXp(s,summary,100,'Final table finish');
        else addXp(s,summary,30,'Tournament finish');
        if(place<=3)progressMission(s,summary,'final3',1);
        if(!s.records.bestFinish||place<s.records.bestFinish){
          s.records.bestFinish=place;
          summary.records.push({id:'bestFinish',label:'Best finish',value:place});
          addToast(summary,`New best finish: #${place}`);
        }
        const comeback=Math.max(0,Number(payload.comeback)||0);
        if(comeback>(s.records.biggestComeback||0)){
          s.records.biggestComeback=comeback;
          summary.records.push({id:'biggestComeback',label:'Biggest comeback',value:comeback});
          addToast(summary,'New biggest comeback');
        }
        if(won&&payload.headsUpComeback){
          s.records.headsUpComebackWins=(s.records.headsUpComebackWins||0)+1;
          awardTrophy(s,summary,'headsUpComeback');
        }
      }
    }
    return finalize(s,summary);
  }
  function claimMission(id){
    const s=load();
    const summary=emptySummary();
    summary.type='missionClaim';
    summary.levelBefore=s.level;
    const def=DAILY_MISSIONS.find(m=>m.id===id);
    const m=def&&s.missions[id];
    if(!def||!m||!m.complete||m.claimed)return summary;
    m.claimed=true;
    summary.missions.push({id:def.id,label:def.label,xp:def.xp});
    addXp(s,summary,def.xp,`Mission: ${def.label}`);
    return finalize(s,summary);
  }
  function equipCosmetic(kind,id){
    const s=load();
    if(!COSMETICS[kind]||!(s.unlockedCosmetics[kind]||[]).includes(id))return false;
    s.equippedCosmetics[kind]=id;
    save(s);
    emit({type:'cosmetic',xp:0,levelBefore:s.level,levelAfter:s.level,toasts:[`Equipped ${cosmeticLabel(kind,id)}`],missions:[],records:[],unlocks:[],winTier:''});
    return true;
  }
  function resetRewards(){
    try{localStorage.removeItem(STORE_KEY);}catch(e){}
    const s=defaultState();
    save(s);
    emit({type:'reset',xp:0,levelBefore:1,levelAfter:1,toasts:[],missions:[],records:[],unlocks:[],winTier:''});
  }
  function combineSummaries(a,b){
    if(!b||b.duplicate)return a||null;
    const out=a?clone(a):emptySummary();
    if(!a){
      out.levelBefore=b.levelBefore||1;
      out.type=b.type||'combined';
    }
    out.xp+=(b.xp||0);
    out.levelAfter=b.levelAfter||out.levelAfter;
    out.toasts=out.toasts.concat(b.toasts||[]);
    out.missions=out.missions.concat(b.missions||[]);
    out.records=out.records.concat(b.records||[]);
    out.unlocks=out.unlocks.concat(b.unlocks||[]);
    out.trophies=out.trophies.concat(b.trophies||[]);
    out.koCount+=(b.koCount||0);
    out.koBonus+=(b.koBonus||0);
    out.koNames=[...new Set(out.koNames.concat(b.koNames||[]))].slice(0,4);
    if(b.winTier==='monster'||(b.winTier==='big'&&out.winTier!=='monster')||(!out.winTier&&b.winTier))out.winTier=b.winTier;
    return out;
  }
  global.getRewardState=()=>load();
  global.getNextRewardUnlock=()=>{
    const s=load();
    const u=nextUnlock(s);
    return u?{...u,label:cosmeticLabel(u.kind,u.id)}:null;
  };
  global.recordRewardEvent=recordEvent;
  global.claimMission=claimMission;
  global.equipCosmetic=equipCosmetic;
  global.resetRewards=resetRewards;
  global.combineRewardSummaries=combineSummaries;
  global.rewardXpForLevel=xpForLevel;
  global.REWARD_MISSIONS=DAILY_MISSIONS;
  global.REWARD_COSMETICS=COSMETICS;
  global.REWARD_TROPHIES=TROPHIES;
})(typeof window!=='undefined'?window:globalThis);
