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

// --- State for Smart Notifications ---
// This object will store the visibility state for each page.
// e.g., { 'main_page': true, 'education_computer': false }
let pageVisibilityState = {};

// Listen for messages from the main page (client).
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'VISIBILITY_CHANGE') {
        const { pageId, isVisible } = event.data;
        console.log(`[SW] Visibility for page ${pageId} is now ${isVisible}`);
        pageVisibilityState[pageId] = isVisible;
    }
});


// Handler for background messages. This will now reliably fire for all messages.
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const pageId = payload.data.pageId;

  // --- SMART NOTIFICATION LOGIC ---
  // If the page where the comment was posted is currently visible, DO NOT show a notification.
  if (pageVisibilityState[pageId]) {
      console.log(`[SW] Suppressing notification because page ${pageId} comment section is visible.`);
      return; // Exit without showing anything.
  }

  // Extract notification data from the 'data' payload.
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    // Store the URL and the new commentId in the notification's data object.
    data: {
        url: payload.data.url,
        commentId: payload.data.commentId
    }
  };

  // Display the notification.
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
    
    // --- AUTO-SCROLL LOGIC ---
    // Create a new URL object and add the comment ID as a hash.
    // This creates a "deep link" like: https://example.com/page#comment-xyz123
    const finalUrl = new URL(urlToOpen, self.location.origin);
    if (commentId) {
        finalUrl.hash = `comment-${commentId}`;
    }

    // This code attempts to focus an existing tab or open a new one with the deep link.
    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then((clientList) => {
            // Check if a client for this URL is already open.
            for (const client of clientList) {
                // We use .pathname to ignore the hash, so we can focus the right tab
                // even if it doesn't have the hash yet.
                const clientUrl = new URL(client.url);
                if (clientUrl.pathname === finalUrl.pathname && 'focus' in client) {
                    // Navigate the existing client to the new URL with the hash
                    client.navigate(finalUrl.href);
                    return client.focus();
                }
            }
            // If no tab is found, open a new one with the final URL.
            if (clients.openWindow) {
                return clients.openWindow(finalUrl.href);
            }
        })
    );
});
