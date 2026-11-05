const C='da-v22',F=['./index.html','./parent.html','./js/plans.js','./js/fall.js','./js/edits.js','./js/i18n.js','./logo.svg','./css/styles.css','./js/qrcode.js','./js/data.js','./js/store.js','./js/components.js','./js/app.js','./manifest.json','./icon.svg','./alt2/index.html','./alt2/timeline.css','./alt2/timeline.js','./alt2/plans.js','./alt2/edits.js','./alt2/owl.svg','./classic/index.html'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET'||/\/media\//.test(e.request.url)) return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request))); });
