const CACHE_NAME = "cache-v1.004";
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

// Activate Event (पुराना Cache हटाएं)
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

// Fetch Event (हमेशा लाइव अपडेट दिखाने के लिए)
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request) // हमेशा नया डेटा लाने की कोशिश करें
      .then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone()); // नया डेटा स्टोर करें
          return response; // लाइव डेटा दिखाएं
        });
      })
      .catch(() => caches.match(event.request)) // अगर इंटरनेट नहीं है, तो कैश से दिखाएं
  );
});
