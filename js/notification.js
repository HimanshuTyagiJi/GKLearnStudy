// ✅ Service Worker Register karo (Firebase Messaging ke liye)
async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    await navigator.serviceWorker.ready;
    console.log("✅ Service Worker registered successfully");
    return registration;
  } catch (err) {
    console.error("❌ Service Worker registration failed:", err);
    throw err;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const initButton = (notificationBtn) => {
    // --- State and Config ---
    let firebaseApp = null;
    let messaging = null;
    let db = null;
    let auth = null;
    let functions = null;
    let currentUser = null;
    let currentToken = null;
    let isFirebaseInitialized = false;
    let isSubscribedOnThisPage = false;
    let isProcessing = false;
    let registration = null;

    const firebaseConfig = {
      apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
      authDomain: "appcomment.firebaseapp.com",
      projectId: "appcomment",
      storageBucket: "appcomment.firebasestorage.app",
      messagingSenderId: "156258808941",
      appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
    };

    const VAPID_KEY = "BPSPa7nCW1nGok9peZQepk25VC1OxeFxFHtWVZsen2TnwVCya3Sq2Dtb4W0sX8u06fRsg-eAqgxEUoW2XP1Oyvo";

    const pageId = (() => {
      const p = location.pathname;
      return ['/','/index.html',''].includes(p)
        ? 'main_page'
        : p.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '_').replace(/\.html$/, '');
    })();

    // --- Firebase Initialization ---
    async function initializeFirebase() {
      if (isFirebaseInitialized) return;

      try {
        const { initializeApp, getApps, getApp } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js');
        const { getAuth, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js');
        const { getFirestore } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js');
        const { getMessaging } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');
        const { getFunctions } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-functions.js');

        firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(firebaseApp);
        db = getFirestore(firebaseApp);
        messaging = getMessaging(firebaseApp);
        functions = getFunctions(firebaseApp);
        registration = await registerServiceWorker();

        isFirebaseInitialized = true;
        console.log("✅ Firebase initialized");

        onAuthStateChanged(auth, (user) => {
          currentUser = user;
          updateUIState();
        });
      } catch (error) {
        console.error("❌ Firebase initialization failed:", error);
        notificationBtn.classList.add('disabled');
        notificationBtn.title = "Notification service unavailable";
      }
    }

    // --- UI Update Function ---
    function updateUIState() {
      if (!notificationBtn) return;
      if (!currentUser) {
        notificationBtn.classList.remove('subscribed');
        notificationBtn.disabled = true;
        notificationBtn.textContent = "Sign in to enable notifications";
        return;
      }

      notificationBtn.disabled = false;
      if (isSubscribedOnThisPage) {
        notificationBtn.classList.add('subscribed');
        notificationBtn.textContent = "🔕 Unsubscribe";
      } else {
        notificationBtn.classList.remove('subscribed');
        notificationBtn.textContent = "🔔 Subscribe";
      }
    }

    // --- Button Click ---
    async function handleSubscriptionRequest() {
      if (isProcessing) return;
      isProcessing = true;

      try {
        await initializeFirebase();

        if (!currentUser) {
          alert('Please sign in to manage notifications.');
          return;
        }

        if (Notification.permission === 'denied') {
          alert('Notifications are blocked in your browser.');
          return;
        }

        if (Notification.permission === 'default') {
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            alert('Permission denied.');
            return;
          }
        }

        const wasSubscribed = isSubscribedOnThisPage;
        const action = wasSubscribed ? 'unsubscribe' : 'subscribe';

        // ✅ Token fetch with service worker
        const { getToken } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');
        const fcmToken = await getToken(messaging, {
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: registration
        });

        if (!fcmToken) throw new Error("Failed to get FCM token.");
        currentToken = fcmToken;

        await saveTokenForUser(fcmToken);

        const success = await togglePageSubscription(fcmToken, action);
        if (success) {
          isSubscribedOnThisPage = !wasSubscribed;
          alert(`Successfully ${action}d!`);
        } else {
          alert(`Failed to ${action}.`);
        }
      } catch (error) {
        console.error("Subscription error:", error);
      } finally {
        isProcessing = false;
        updateUIState();
      }
    }

    // --- Save Token to Firestore ---
    async function saveTokenForUser(token) {
      if (!currentUser || !db || !token) return;
      try {
        const { doc, setDoc, arrayUnion } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js');
        const ref = doc(db, 'userTokens', currentUser.uid);
        await setDoc(ref, { tokens: arrayUnion(token) }, { merge: true });
      } catch (error) {
        console.error("Token save failed:", error);
      }
    }

    // --- Cloud Function call ---
    async function togglePageSubscription(token, action) {
      try {
        const res = await fetch("https://us-central1-appcomment.cloudfunctions.net/manageSubscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pageId, token, action })
        });
        const data = await res.json();
        return data.success === true;
      } catch (err) {
        console.error("Subscription toggle failed:", err);
        return false;
      }
    }

    notificationBtn.addEventListener('click', handleSubscriptionRequest);
    initializeFirebase();
  };

  // --- Detect dynamic button (auth system ke baad load hota hai) ---
  const authContainer = document.getElementById('auth-container');
  if (authContainer) {
    const observer = new MutationObserver((mutations, obs) => {
      const btn = document.getElementById('notification-btn');
      if (btn) {
        initButton(btn);
        obs.disconnect();
      }
    });
    observer.observe(authContainer, { childList: true, subtree: true });
  }
});
