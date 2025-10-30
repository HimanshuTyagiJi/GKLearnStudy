
// --- Firebase v9 Modular SDK Imports ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getMessaging, onBackgroundMessage } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-sw.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
  authDomain: "appcomment.firebaseapp.com",
  projectId: "appcomment",
  storageBucket: "appcomment.firebasestorage.app",
  messagingSenderId: "156258808941",
  appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ✅ Background message handler using the v9 modular syntax
onBackgroundMessage(messaging, (payload) => {
  console.log("[SW] Received background message:", payload);

  // Construct notification data from the payload
  const notificationTitle = payload.data.title || "New Notification";
  const notificationOptions = {
    body: payload.data.body || "You have a new message.",
    icon: payload.data.icon || "/favicon.ico",
    data: {
      url: payload.data.url || "/",
      commentId: payload.data.commentId || null,
    }
  };

  // Display the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Click handler – open the page and scroll to the comment
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const data = event.notification.data;
  // Construct the final URL, adding a hash for the comment if it exists.
  const finalUrl = data.commentId ? `${data.url}#comment-${data.commentId}` : data.url;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Check if a window for the target URL is already open.
        for (const client of clientList) {
          const clientUrl = new URL(client.url);
          const targetUrl = new URL(data.url, self.location.origin);

          if (clientUrl.pathname === targetUrl.pathname && "focus" in client) {
            // If found, navigate the existing client to the final URL (with hash) and focus it.
            client.navigate(finalUrl); 
            return client.focus();
          }
        }
        // If no matching window is found, open a new one.
        return clients.openWindow(finalUrl);
      })
  );
});
