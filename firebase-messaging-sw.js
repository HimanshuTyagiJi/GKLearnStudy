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

// Handler for background messages. This will now reliably fire for all messages.
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  // Extract notification data from the 'data' payload.
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    // Store the URL in the notification's data object to use in the 'notificationclick' event.
    data: {
        url: payload.data.url 
    }
  };

  // Display the notification.
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handler for when a user clicks on the notification.
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); 

    // Get the URL to open from the notification's data object.
    const urlToOpen = event.notification.data.url;
    if (!urlToOpen) {
        console.error("No URL found in notification data.");
        return;
    }

    // This code attempts to focus an existing tab or open a new one.
    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then((clientList) => {
            for (const client of clientList) {
                // Check if a tab with the exact URL is already open.
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // If no tab is found, open a new one.
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
