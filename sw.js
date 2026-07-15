const CACHE_NAME = 'nexusiq-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './dashboard.html',
  './ai-assistant.html',
  './crowd-intelligence.html',
  './navigation.html',
  './emergency.html',
  './style.css',
  './app.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
