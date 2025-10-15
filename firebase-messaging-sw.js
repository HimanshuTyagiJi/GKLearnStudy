// firebase-messaging-sw.js

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

/**
 * Helper function to normalize URL pathnames for comparison.
 * This treats "/", "/index.html", and "/index" as the same path.
 * @param {string} path The pathname from a URL.
 * @returns {string} The normalized pathname.
 */
function normalizePathname(path) {
    if (path === '/index.html' || path === '/index') {
        return '/';
    }
    return path;
}


messaging.onBackgroundMessage(async (payload) => {
  console.log("[SW] Received background message ", payload);

  const urlString = payload.data.url;
  
  // If there's a URL, check if we should suppress the notification.
  if (urlString) {
    const clientsList = await clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    });
    
    const notificationUrl = new URL(urlString);
    const normalizedNotificationPath = normalizePathname(notificationUrl.pathname);

    for (const client of clientsList) {
      const clientUrl = new URL(client.url);
      const normalizedClientPath = normalizePathname(clientUrl.pathname);

      // If a tab with the same path is open AND focused, suppress the notification.
      if (normalizedClientPath === normalizedNotificationPath && client.focused) {
        console.log(`[SW] Suppressing notification. Reason: A tab for path "${normalizedClientPath}" is already open and focused.`);
        return; // Exit without showing a notification.
      }
    }
  }

  // If no matching focused client was found, proceed to show the notification.
  const notificationTitle = payload.data.title || "New Notification";
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    data: {
        url: payload.data.url,
        commentId: payload.data.commentId
    }
  };
  
  console.log("[SW] Showing notification:", notificationTitle);
  await self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handler for when a user clicks on the notification.
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
    
    // Add the comment hash to scroll to the specific comment.
    if (commentId) {
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
                if (normalizePathname(clientUrl.pathname) === normalizePathname(finalUrl.pathname) && 'focus' in client) {
                    // Navigate the existing client to the new URL (with hash) and focus it.
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
