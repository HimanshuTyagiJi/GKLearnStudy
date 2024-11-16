if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js') // सही पथ दें
    .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
        console.error('Service Worker registration failed:', error);
    });
}
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
