// firebase-messaging-sw.js

// Firebase SDKs को इंपोर्ट करें
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js");

// अपने Firebase प्रोजेक्ट के क्रेडेंशियल के साथ कॉन्फ़िगर करें
const firebaseConfig = {
    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain: "appcomment.firebaseapp.com",
    projectId: "appcomment",
    storageBucket: "appcomment.firebasestorage.app",
    messagingSenderId: "156258808941",
    appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
};

// Firebase ऐप को इनिशियलाइज़ करें
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// onBackgroundMessage हैंडलर: यह तब ट्रिगर होता है जब
// 1. ब्राउज़र बैकग्राउंड में हो (खुला लेकिन फोकस में न हो)
// 2. और FCM मैसेज में *केवल 'data' पेलोड* हो (Cloud Function में 'notification' पेलोड न भेजा गया हो)
// अगर Cloud Function 'notification' पेलोड भेजता है (जैसा कि हमने अब कॉन्फ़िगर किया है),
// तो FCM नोटिफ़िकेशन को सीधे डिस्प्ले करेगा और यह हैंडलर ट्रिगर नहीं होगा।
messaging.onBackgroundMessage(async (payload) => {
  console.log("[SW] Received background message (data-only or when browser open but not focused) ", payload);

  const url = payload.data.url;
  // यह लॉजिक केवल तभी चलेगा जब यह onBackgroundMessage हैंडलर ट्रिगर होगा।
  // चूंकि अब हम Cloud Function से 'notification' पेलोड भेज रहे हैं,
  // यह हिस्सा आमतौर पर तभी चलेगा जब Cloud Function केवल 'data' पेलोड भेजेगा।
  if (url) { // अगर payload.data में URL है, तो देखें कि क्या संबंधित टैब पहले से खुला है।
    const clientList = await clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    });
    
    for (const client of clientList) {
      const clientUrl = new URL(client.url);
      const notificationUrl = new URL(url);
      // यदि समान पाथ वाला कोई टैब खुला और केंद्रित है, तो नोटिफ़िकेशन न दिखाएं।
      if (clientUrl.pathname === notificationUrl.pathname && client.focused) {
        console.log('[SW] Suppressing notification because a relevant tab is focused.');
        return; // नोटिफ़िकेशन न दिखाएं
      }
    }
  }

  // यदि कोई केंद्रित विंडो नहीं मिली, तो नोटिफ़िकेशन दिखाएं।
  // यह हिस्सा भी केवल तभी चलेगा जब यह onBackgroundMessage हैंडलर ट्रिगर होगा।
  const notificationTitle = payload.data.title || "नया अपडेट";
  const notificationOptions = {
    body: payload.data.body || "आपकी साइट पर एक नया अपडेट है।",
    icon: payload.data.icon || "/favicon.ico", // डिफ़ॉल्ट आइकन प्रदान करें
    data: { // डेटा जिसे notificationclick हैंडलर एक्सेस करेगा
        url: payload.data.url,
        commentId: payload.data.commentId
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// notificationclick हैंडलर: यह तब ट्रिगर होता है जब यूज़र किसी नोटिफ़िकेशन पर क्लिक करता है।
// यह FCM द्वारा सीधे दिखाए गए नोटिफ़िकेशन (जब 'notification' पेलोड भेजा गया हो)
// या onBackgroundMessage द्वारा दिखाए गए नोटिफ़िकेशन दोनों के लिए काम करेगा।
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // क्लिक करने के बाद नोटिफ़िकेशन बंद करें

    // नोटिफ़िकेशन के डेटा से URL और commentId प्राप्त करें
    const data = event.notification.data;
    const urlToOpen = data.url;
    const commentId = data.commentId;

    if (!urlToOpen) {
        console.error("नोटिफ़िकेशन डेटा में URL नहीं मिला।");
        return;
    }
    
    // अंतिम URL बनाएं, जिसमें commentId के लिए हैश शामिल हो
    const finalUrl = new URL(urlToOpen, self.location.origin);
    if (commentId) {
        finalUrl.hash = `comment-${commentId}`; // कमेंट के लिए विशिष्ट ID हैश के रूप में जोड़ें
    }

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true // अनियंत्रित क्लाइंट्स (पुराने टैब) को भी शामिल करें
        }).then((clientList) => {
            // चेक करें कि क्या इस URL के पाथनेम के लिए कोई क्लाइंट पहले से खुला है।
            for (const client of clientList) {
                const clientUrl = new URL(client.url);
                if (clientUrl.pathname === finalUrl.pathname && 'focus' in client) {
                    // मौजूदा क्लाइंट को नए URL पर नेविगेट करें (हैश के साथ)
                    client.navigate(finalUrl.href);
                    return client.focus(); // उस टैब पर फोकस करें
                }
            }
            // यदि कोई टैब नहीं मिला है, तो एक नया टैब खोलें।
            if (clients.openWindow) {
                return clients.openWindow(finalUrl.href);
            }
        })
    );
});
