// firebase-messaging-sw.js

// Using the V9 COMPAT libraries for the service worker for maximum compatibility.
// This is the recommended approach by Firebase when not using ES modules (.mjs).
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain: "appcomment.firebaseapp.com",
    projectId: "appcomment",
    storageBucket: "appcomment.firebasestorage.app",
    messagingSenderId: "156258808941",
    appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// Add a handler for background messages.
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    // The data object is where we store custom data, like the URL to open.
    data: {
        url: payload.fcmOptions.link // The backend function should put the URL here.
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Add an event listener for notification clicks to open the correct URL.
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Close the notification

    // Get the URL to open from the data object.
    const urlToOpen = event.notification.data.url;
    if (!urlToOpen) {
        return;
    }

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then((clientList) => {
            // If the site is already open in a tab, focus it.
            for (const client of clientList) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // Otherwise, open a new tab.
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
