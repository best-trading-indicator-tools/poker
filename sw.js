/* offline support: network-first with full cache fallback */
const CACHE='sg-poker-v54';
const ASSETS=['/','/poker.html','/charts.js','/manifest.json','/docs/icon.svg',
  '/js/eval.js','/js/modes/registry.js','/js/modes/tournament.js','/js/modes/cash.js',
  '/js/engine.js','/js/coach.js','/js/ai.js','/js/mp.js','/js/ui.js'];
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
