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

// ✅ Extra safety fix for pushManager undefined
self.addEventListener("activate", (event) => {
  event.waitUntil(self.registration.pushManager.getSubscription().catch(() => null));
});

// ✅ Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Received background message:", payload);

  // Only show if it's a comment notification
  if (payload.data?.type !== "comment") {
    console.log("[SW] Skipping non-comment notification");
    return;
  }

  const notificationTitle = payload.data.title || "New Comment";
  const notificationOptions = {
    body: payload.data.body || "You have a new comment",
    icon: payload.data.icon || "/comment-icon.png",
    data: {
      url: payload.data.url || "/",
      commentId: payload.data.commentId || null,
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Click handler – open the page and scroll to the comment
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const data = event.notification.data;
  const url = data.url || "/";
  const finalUrl = data.commentId ? `${url}#comment-${data.commentId}` : url;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            client.navigate(finalUrl);
            return client.focus();
          }
        }
        return clients.openWindow(finalUrl);
      })
  );
});
