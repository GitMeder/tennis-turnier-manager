const CACHE = 'app-shell-v1';
const ASSETS = [
  './',
  './index.html',
  './icon-192.png',
  './icon-512.png',
  './manifest.json'
  // falls du extra .css/.js Dateien hast, hier ergänzen
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
