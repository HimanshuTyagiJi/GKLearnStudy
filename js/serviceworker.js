// serviceworker.js

const CACHE_NAME = "cache-v1.004";
const STATIC_ASSETS = [
  "/",
  "index.html",
  "manifest.json",
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
});

// Activate event (to manage old caches)
self.addEventListener('activate', (event) => {
  console.log('Service Worker Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch event (handling dynamic cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Return cached response if available
      }
      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (event.request.url.startsWith('http')) {
            cache.put(event.request, response.clone()); // Cache the new response
          }
          return response;
        });
      });
    })
  );
});

// Push Notifications
self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'Default notification body',
    icon: 'https://gklearnstudy.in/GK-Learn-Study.png', // Your PWA icon
    vibrate: [200, 100, 200],
    actions: [
      {action: 'explore', title: 'Go to site'},
      {action: 'close', title: 'Close notification'},
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('New Notification', options)
  );
});

// Message event to clear cache
self.addEventListener('message', (event) => {
  if (event.data.action === 'clearCache') {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName); // Clear all caches
      });
      console.log('All caches cleared.');
    });
  }
});




        window.addEventListener('load', () => {
          registerSW();
        });
     
        // Register the Service Worker
        async function registerSW() {
          if ('serviceWorker' in navigator) {
            try {
              await navigator
                    .serviceWorker
                    .register('serviceworker.js');
              console.log("Service Worker Registered!");
            }
            catch (e) {
              console.log('SW registration failed:', e);
            }
          }
        }
  
