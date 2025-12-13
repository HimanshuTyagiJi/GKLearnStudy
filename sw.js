
const CACHE_NAME = 'gklearnstudy-v9-network-first'; // Version bump to v9 to force update

// Files to cache immediately (Core App Shell)
const PRECACHE_URLS = [
  '/css/theme.css',
  '/js/theme.js',
  '/offline.html'
];

// 1. INSTALL: Force the new Service Worker to activate immediately
self.addEventListener('install', event => {
  self.skipWaiting(); // IMPORTANT: Forces this new SW to become active instantly, replacing the old one
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Pre-cache core files, but don't stop installation if one fails
      return cache.addAll(PRECACHE_URLS).catch(err => console.log('Precache warning:', err));
    })
  );
  console.log('SW: Installed and skipped waiting.');
});

// 2. ACTIVATE: Delete all old caches to remove stale data
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('SW: Claiming clients (taking control).');
      return self.clients.claim(); // Take control of all open tabs immediately
    })
  );
});

// 3. FETCH: The "Automatic Hard Reload" Logic
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Ignore non-GET requests (like POST to Firebase) and external links (mostly)
  if (event.request.method !== 'GET') return;

  // STRATEGY: Network First (Freshness over Speed)
  // For HTML, CSS, JS, and JSON, we ALWAYS try the network first.
  // This ensures the user sees your updates immediately.
  if (
    url.origin === self.location.origin && (
    url.pathname.endsWith('.html') || 
    url.pathname.endsWith('/') || 
    url.pathname.endsWith('.css') || 
    url.pathname.endsWith('.js') || 
    url.pathname.endsWith('.json'))
  ) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // 1. Network success: Return fresh content
          // 2. Also update the cache with this fresh content for next time (or offline use)
          const clonedResponse = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clonedResponse);
          });
          return networkResponse;
        })
        .catch(() => {
          // Network failed (Offline): Fallback to Cache
          console.log('SW: Network failed, serving cached version for:', url.pathname);
          return caches.match(event.request).then(cachedResponse => {
            // If cache has it, return it. If not, maybe show offline page.
            return cachedResponse || caches.match('/offline.html'); 
          });
        })
    );
    return;
  }

  // STRATEGY: Stale-While-Revalidate (Speed)
  // For Images, Fonts, and other static assets that rarely change.
  // Shows cached version instantly, but updates cache in background.
  if (
    event.request.destination === 'image' || 
    event.request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }
});
