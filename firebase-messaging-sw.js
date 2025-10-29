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

// ✅ Add this to fix pushManager undefined error
self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.pushManager.getSubscription().catch(() => null)
  );
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
    // Store data needed for actions
    data: {
        url: payload.data.url,
        commentId: payload.data.commentId
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handler for when a user clicks on the notification OR its action buttons.
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const data = event.notification.data;
    const urlToOpen = data.url;
    const commentId = data.commentId;

    if (!urlToOpen) {
        console.error("No URL found in notification data.");
        return;
    }
    
    // --- URL and Deep Link Logic ---
    const finalUrl = new URL(urlToOpen, self.location.origin);
    
    // If the main body (no action) or the 'open' button is clicked, scroll to the comment.
    // For 'unsubscribe', we just open the page without a hash.
    if ((!event.action || event.action === 'open') && commentId) {
        finalUrl.hash = `comment-${commentId}`;
    }

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then((clientList) => {
            // Check if a client for this URL's pathname is already open.
            for (const client of clientList) {
                const clientUrl = new URL(client.url);
                if (clientUrl.pathname === finalUrl.pathname && 'focus' in client) {
                    // Navigate the existing client to the new URL (with hash if applicable)
                    client.navigate(finalUrl.href);
                    return client.focus();
                }
            }
            // If no tab is found, open a new one.
            if (clients.openWindow) {
                return clients.openWindow(finalUrl.href);
            }
        })
    );
});
