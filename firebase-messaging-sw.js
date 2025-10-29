// firebase-messaging-sw.js

// --- Firebase Messaging Setup (must come first) ---
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain: "appcomment.firebaseapp.com",
    projectId: "appcomment",
    storageBucket: "appcomment.firebasestorage.app",
    messagingSenderId: "156258808941",
    appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// --- Caching Logic (from sw.js) ---
const CACHE_NAME = 'gklearnstudy-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/theme.css',
  '/css/notification.css',
  '/css/kaise-karen.css',
  '/js/theme.js',
  '/js/search-data.js',
  '/js/comment.js',
  '/js/notification.js',
  '/js/search-data.json',
  '/favicon.ico',
  '/favicon.svg',
  '/profile.html',
  '/css/profile.css',
  '/js/profile.js',
  '/categories.html',
  '/js/categories.js',
  '/kaise-karen.html',
  '/kaise-karen/vlookup-in-excel.html',
  '/kaise-karen/how-to-write-formal-letter.html',
  '/kaise-karen/interview-preparation-guide.html',
  '/kaise-karen/online-safety-tips.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache for offline access');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


// --- Firebase Messaging Handlers ---
let pageVisibilityState = {};

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'VISIBILITY_CHANGE') {
        const { pageId, isVisible } = event.data;
        console.log(`[SW] Visibility for page ${pageId} is now ${isVisible}`);
        pageVisibilityState[pageId] = isVisible;
    }
});


messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Received background message ", payload);

  const pageId = payload.data.pageId;

  if (pageVisibilityState[pageId]) {
      console.log(`[SW] Suppressing notification because page ${pageId} is visible.`);
      return;
  }

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    actions: [
        { action: 'open', title: 'Open Page' },
        { action: 'unsubscribe', title: 'Unsubscribe' }
    ],
    data: {
        url: payload.data.url,
        commentId: payload.data.commentId
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const data = event.notification.data;
    const urlToOpen = data.url;
    const commentId = data.commentId;

    if (!urlToOpen) {
        console.error("No URL found in notification data.");
        return;
    }
    
    const finalUrl = new URL(urlToOpen, self.location.origin);
    
    if ((!event.action || event.action === 'open') && commentId) {
        finalUrl.hash = `comment-${commentId}`;
    }

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then((clientList) => {
            for (const client of clientList) {
                const clientUrl = new URL(client.url);
                if (clientUrl.pathname === finalUrl.pathname && 'focus' in client) {
                    client.navigate(finalUrl.href);
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(finalUrl.href);
            }
        })
    );
});
