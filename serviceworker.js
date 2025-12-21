const CACHE_NAME = "cache-v1.1";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/GK-Learn-Study.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        STATIC_ASSETS.map(url =>
          fetch(url)
            .then(res => {
              if (res.ok) {
                return cache.put(url, res.clone());
              }
            })
            .catch(() => {})
        )
      )
    )
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(res => {
        if (res && res.status === 200 && res.type === "basic") {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });
        }
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
