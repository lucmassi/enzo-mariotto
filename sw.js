/* ============================================================
   sw.js — Service Worker (Cache-First Performance Strategy)
   ============================================================ */
const CACHE_NAME = "enm-cache-v3";
const ASSETS = [
  "/",
  "/css/styles.css",
  "/js/main.js",
  "/js/config.js",
  "/js/utils/dom.js",
  "/js/utils/sanitize.js",
  "/js/utils/storage.js",
  "/js/tracking/ctaTracker.js",
  "/js/tracking/scrollTracker.js",
  "/js/tracking/phoneTracker.js",
  "/js/components/RevealObserver.js",
  "/js/components/ExitIntent.js",
  "/assets/logo/logo-preto.png",
  "/assets/logo/logo-branco.png",
  "/assets/hero/hero-480.webp",
  "/assets/hero/hero-640.webp",
  "/assets/hero/hero-852.webp",
  "/assets/hero/hero-852.jpg",
  "/assets/authority/authority-480.webp",
  "/assets/authority/authority-640.webp",
  "/assets/authority/authority-852.webp",
  "/assets/authority/authority-852.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Fetch in background to update cache
        fetch(event.request).then(response => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, response));
          }
        }).catch(() => {});
        return cached;
      }
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        return response;
      });
    })
  );
});