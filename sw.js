// ============================================================
// kkk - Service Worker
// ============================================================
const CACHE_NAME = 'kokokara-v1';
const CACHE_FILES = [
  '/vendor.html',
  '/manifest.json',
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.url.includes('script.google.com')) return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
