if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js') // सही पथ दें
    .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
        console.error('Service Worker registration failed:', error);
    });
}
const CACHE_NAME = "cache-v1.001"; 
const STATIC_ASSETS = [
  "/", 
  "index.html",
  "manifest.json",
  "https://gklearnstudy.in/GK-Learn-Study.png", 
];

// Install Event
self.addEventListener("install", (event) => {
  console.log("Service Worker Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching Static Assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate Event
self.addEventListener("activate", (event) => {
  console.log("Service Worker Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch Event (Dynamic Caching for New Pages)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // अगर कैश में है, तो वही रिटर्न करें
      }
      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (event.request.url.startsWith("http")) {
            cache.put(event.request, response.clone()); // नई फाइल को कैश करें
          }
          return response;
        });
      });
    })
  );
});

