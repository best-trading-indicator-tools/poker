/* offline support: network-first with full cache fallback */
const CACHE='sg-poker-v97';
const ASSETS=['/','/poker.html','/charts.js?v=97','/manifest.json','/docs/icon.svg',
  '/js/eval.js?v=97','/js/preflop-policy-pack.js?v=97','/js/preflop-blueprint.js?v=97','/js/modes/registry.js?v=97','/js/modes/tournament.js?v=97','/js/modes/cash.js?v=97',
  '/js/engine.js?v=97','/js/rewards.js?v=97','/js/solver.js?v=97','/js/coach.js?v=97','/js/ai.js?v=97','/js/mp.js?v=97','/js/ui.js?v=97',
  '/vendor/wasm-postflop/comlink.js?v=97','/vendor/wasm-postflop/worker.js?v=97',
  '/vendor/wasm-postflop/7a023623e45ca364f00b.js','/vendor/wasm-postflop/solver-st.wasm'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(r=>{
      const copy=r.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy));
      return r;
    }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(m=>m||
      (e.request.mode==='navigate'?caches.match('/poker.html'):Response.error())))
  );
});
