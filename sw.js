/* offline support: network-first with full cache fallback */
const CACHE='sg-poker-v87';
const ASSETS=['/','/poker.html','/charts.js?v=87','/manifest.json','/docs/icon.svg',
  '/js/eval.js?v=87','/js/preflop-blueprint.js?v=87','/js/modes/registry.js?v=87','/js/modes/tournament.js?v=87','/js/modes/cash.js?v=87',
  '/js/engine.js?v=87','/js/rewards.js?v=87','/js/solver.js?v=87','/js/coach.js?v=87','/js/ai.js?v=87','/js/mp.js?v=87','/js/ui.js?v=87',
  '/vendor/wasm-postflop/comlink.js?v=87','/vendor/wasm-postflop/worker.js',
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
    }).catch(()=>caches.match(e.request).then(m=>m||caches.match('/poker.html')))
  );
});
