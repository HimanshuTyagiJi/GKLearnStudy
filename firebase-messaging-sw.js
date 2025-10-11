
// Import the Firebase app and messaging scripts (v9 modular syntax for service workers)
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js");

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
const app = firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.getMessaging(app);

// Add a handler for background messages.
// This will be triggered when the app is in the background or closed.
firebase.onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here from the received payload.
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    data: {
        // This makes the notification clickable and opens the link
        click_action: payload.fcmOptions.link 
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Add an event listener for notification clicks to open the correct URL.
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Close the notification

    const urlToOpen = event.notification.data.click_action;

    event.waitUntil(
        clients.matchAll({
            type: "window"
        }).then(function(clientList) {
            // If the site is already open, focus it.
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // Otherwise, open a new window.
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
