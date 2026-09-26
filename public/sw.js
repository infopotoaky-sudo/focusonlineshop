const CACHE_NAME = 'focus-store-v1';

// Install - just skip waiting
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - network only for now (no caching to avoid issues)
self.addEventListener('fetch', (event) => {
  // Let the browser handle all requests normally
  event.respondWith(fetch(event.request));
});
