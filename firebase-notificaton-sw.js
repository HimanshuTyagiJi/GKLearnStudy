
// firebase-notificaton-sw.js - OWNER PROJECT ONLY
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js");

// GKLEARNSTUDY-C298C CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyAij67tprGMKb7SGJ8v1BNVVqfilUmyHP0",
    authDomain: "gklearnstudy-c298c.firebaseapp.com",
    projectId: "gklearnstudy-c298c",
    storageBucket: "gklearnstudy-c298c.firebasestorage.app",
    messagingSenderId: "307990626713",
    appId: "1:307990626713:web:e7b650c718c0cade4e5308"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[Owner SW] Background notification received: ", payload);
  const notificationTitle = payload.data.title || "GK Update Needed";
  const notificationOptions = {
    body: payload.data.body || "A new batch is waiting for approval.",
    icon: "/GK-Learn-Study.png",
    data: { url: payload.data.url || "/owner2.html" }
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const urlToOpen = event.notification.data.url;
    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes('owner2.html') && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow(urlToOpen);
        })
    );
});
