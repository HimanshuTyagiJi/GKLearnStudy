const CACHE_NAME = 'gklearnstudy-dynamic-v7';

// The install event is now very simple and does not pre-cache any assets, avoiding the 'addAll' error.
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
  console.log('Service Worker: Installed');
});

self.addEventListener('activate', event => {
  // Clean up old caches.
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        // Take control of the page immediately.
        return self.clients.claim();
    })
  );
  console.log('Service Worker: Activated');
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Only handle GET requests for local assets.
  if (event.request.method !== 'GET' || requestUrl.origin !== self.location.origin) {
    return;
  }

  // Caching strategy for CSS and JS files: Cache First, falling back to Network.
  // This is the "automatic" caching the user requested.
  if (requestUrl.pathname.endsWith('.css') || requestUrl.pathname.endsWith('.js')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          // If we have a cached response, return it (fast).
          if (response) {
            return response;
          }

          // Otherwise, fetch from the network.
          return fetch(event.request).then(networkResponse => {
            // Put a copy of the response in the cache for next time.
            // We clone the response because it's a stream and can be consumed only once.
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          }).catch(error => {
            console.error('Fetch failed for CSS/JS:', event.request.url, error);
            // If fetching fails (e.g., offline) and it's not in the cache, the request will fail.
            // This is expected behavior for a cache-first strategy on the first visit.
          });
        });
      })
    );
  } else {
    // For all other requests (HTML, images, etc.), just go to the network.
    // This follows the instruction to ONLY cache CSS and JS.
    // It means other assets won't be available offline.
    return;
  }
});
