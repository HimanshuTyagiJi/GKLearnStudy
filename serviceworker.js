const CACHE_NAME = "cache-v1.003";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "https://gklearnstudy.in/GK-Learn-Study.png", // Your PWA icon
];

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching Static Assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting(); // Ensure service worker activates immediately
});

// Activate event (to remove old caches)
self.addEventListener('activate', (event) => {
  console.log('Service Worker Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing Old Cache:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim(); // Ensure clients use updated SW immediately
});

// Fetch event (handling redirects and caching)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request, { redirect: "follow" }) // Follow redirects
      .then((response) => {
        if (response.redirected) {
          return Response.redirect(response.url, 302);
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || fetch(event.request);
        })
      )
  );
});
