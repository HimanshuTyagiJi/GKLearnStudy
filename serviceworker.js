const CACHE_NAME = "cache-v1.003"; 
const STATIC_ASSETS = [
  "/",
  "index.html",
  "manifest.json",
  "https://gklearnstudy.in/GK-Learn-Study.png"
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

// Activate Event (Old Cache Delete)
self.addEventListener("activate", (event) => {
  console.log("Service Worker Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Clearing Old Cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// Fetch Event (Auto Update)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => caches.match(event.request)) // अगर इंटरनेट न हो तो कैश से लोड करे
  );
});
