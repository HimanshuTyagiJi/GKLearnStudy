// ✅ Firebase Messaging Service Worker

importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js");

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
  authDomain: "appcomment.firebaseapp.com",
  projectId: "appcomment",
  storageBucket: "appcomment.firebasestorage.app",
  messagingSenderId: "156258808941",
  appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// ✅ Fix for “pushManager undefined” error
self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration && self.registration.pushManager
      ? self.registration.pushManager.getSubscription().catch(() => null)
      : Promise.resolve()
  );
});

// ✅ Optional: Page visibility tracking (safe default)
let pageVisibilityState = {};

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'VISIBILITY_CHANGE') {
    const { pageId, isVisible } = event.data;
    console.log(`[SW] Page ${pageId} is now ${isVisible ? 'visible' : 'hidden'}`);
    pageVisibilityState[pageId] = isVisible;
  }
});

// ✅ Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Background message received: ", payload);

  const pageId = payload?.data?.pageId;
  if (pageId && pageVisibilityState[pageId]) {
    console.log(`[SW] Suppressing notification — page ${pageId} is visible.`);
    return;
  }

  const notificationTitle = payload?.data?.title || "New Notification";
  const notificationOptions = {
    body: payload?.data?.body || "",
    icon: payload?.data?.icon || "/favicon.ico",
    data: {
      url: payload?.data?.url || "/",
      commentId: payload?.data?.commentId || null
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const data = event.notification.data || {};
  const urlToOpen = data.url;
  const commentId = data.commentId;

  if (!urlToOpen) {
    console.error("[SW] No URL in notification data.");
    return;
  }

  const finalUrl = new URL(urlToOpen, self.location.origin);
  if ((!event.action || event.action === 'open') && commentId) {
    finalUrl.hash = `comment-${commentId}`;
  }

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        const clientUrl = new URL(client.url);
        if (clientUrl.pathname === finalUrl.pathname && "focus" in client) {
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
