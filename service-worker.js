if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js') // सही पथ दें
    .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
        console.error('Service Worker registration failed:', error);
    });
}







const staticCacheName = "pwa-v1"; // Cache versioning for easy updates

// Install event: Cache static resources
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll([
        "/", // Root URL
        "/index.html", // Main HTML
        "/styles.css", // CSS file
        "/app.js", // JavaScript file
        "/favicon.ico", // Favicon
        "/manifest.json", // Web App Manifest
        "/images/icon-192x192.png", // App icon
        "/images/icon-512x512.png", // Larger icon for PWA
      ]);
    })
  );
  console.log("Service Worker Installed");
});

// Activate event: Clean up old caches
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cache) {
          if (cache !== staticCacheName) {
            console.log("Clearing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  console.log("Service Worker Activated");
});

// Fetch event: Serve cached resources, fallback to network
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return (
        response ||
        fetch(event.request).catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html"); // Offline fallback
          }
        })
      );
    })
  );
  console.log("Fetching:", event.request.url);
});
