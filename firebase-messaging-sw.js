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

  // Only show if it's a comment notification
  if (payload.data?.type !== "comment") {
    console.log("[SW] Skipping non-comment notification");
    return;
  }

  const notificationTitle = payload.data.title || "New Comment";
  const notificationOptions = {
    body: payload.data.body || "You have a new comment",
    icon: payload.data.icon || "/favicon.ico",
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
  // The final URL is constructed to include the comment hash for direct navigation.
  const finalUrl = data.commentId ? `${url}` : url; // The hash will be added on the client-side for smooth scrolling

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Check if a window for the target URL is already open.
        for (const client of clientList) {
          // A simple URL check might not be enough if there are query parameters.
          // We'll focus on the base URL and let the client-side JS handle the hash.
          const clientUrl = new URL(client.url);
          const targetUrl = new URL(url, self.location.origin);

          if (clientUrl.pathname === targetUrl.pathname && "focus" in client) {
            // Navigate the existing client to the final URL and focus it.
            client.navigate(finalUrl); 
            return client.focus();
          }
        }
        // If no matching window is found, open a new one.
        return clients.openWindow(finalUrl);
      })
  );
});
