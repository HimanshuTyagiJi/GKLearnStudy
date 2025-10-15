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

messaging.onBackgroundMessage(async (payload) => {
  console.log("[SW] Received background message ", payload);

  const url = payload.data.url;
  if (!url) {
    console.log("[SW] No URL in payload, showing notification.");
  } else {
    // Check if a window for this page is already open and focused.
    const clientList = await clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    });
    
    for (const client of clientList) {
      const clientUrl = new URL(client.url);
      const notificationUrl = new URL(url);
      // If a tab with the same path is open and focused, don't show the notification.
      if (clientUrl.pathname === notificationUrl.pathname && client.focused) {
        console.log('[SW] Suppressing notification because a relevant tab is focused.');
        return; 
      }
    }
  }

  // If no focused window was found, show the notification.
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    data: {
        url: payload.data.url,
        commentId: payload.data.commentId
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
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
                if (clientUrl.pathname === finalUrl.pathname && 'focus' in client) {
                    // Navigate the existing client to the new URL (with hash)
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
