
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
    // REMOVED: No more action buttons for simplicity.
    // actions: [], 
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
    
    // Always append the comment hash since the main body is the only click target.
    if (commentId) {
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
