const CACHE_NAME = "gklearnstudy-v11";

const PRECACHE_URLS = [
  "/css/theme.css",
  "/js/theme.js",
  "/offline.html"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        PRECACHE_URLS.map(url =>
          fetch(url)
            .then(res => {
              if (res && res.ok) {
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
    caches.keys()
      .then(keys =>
        Promise.all(
          keys.map(key => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (
    url.origin === self.location.origin &&
    (
      url.pathname === "/" ||
      url.pathname.endsWith(".html") ||
      url.pathname.endsWith(".css") ||
      url.pathname.endsWith(".js") ||
      url.pathname.endsWith(".json")
    )
  ) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (
            response &&
            response.status === 200 &&
            response.type === "basic"
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(() =>
          caches.match(event.request).then(res =>
            res || caches.match("/offline.html")
          )
        )
    );
    return;
  }

  if (
    event.request.destination === "image" ||
    event.request.destination === "font"
  ) {
    event.respondWith(
      caches.match(event.request).then(cached =>
        cached ||
        fetch(event.request).then(response => {
          if (
            response &&
            response.status === 200 &&
            response.type === "basic"
          ) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, response.clone());
            });
          }
          return response;
        })
      )
    );
  }
});
