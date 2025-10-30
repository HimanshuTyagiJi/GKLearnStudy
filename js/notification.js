document.addEventListener('DOMContentLoaded', async () => {
  // ✅ Step 1: Register the Service Worker (Firebase Messaging के लिए)
  let swRegistration = null;
  try {
    swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    await navigator.serviceWorker.ready;
    console.log("✅ Service Worker registered successfully:", swRegistration);
  } catch (err) {
    console.error("❌ Service Worker registration failed:", err);
  }

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

    // ✅ Firebase app initialize karo
    firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
    functions = getFunctions(firebaseApp);

    // ✅ Ye line sabse important hai:
    // messaging ko registered Service Worker se explicitly link kar rahe hain
    messaging = getMessaging(firebaseApp, { serviceWorkerRegistration: swRegistration });

    // ✅ Optional safety log
    if (!swRegistration.pushManager) {
      console.warn("⚠️ pushManager is undefined in this browser or context!");
    }

    isFirebaseInitialized = true;

    onAuthStateChanged(auth, (user) => {
      currentUser = user;
      updateUIState();
    });

  } catch (error) {
    console.error("Firebase initialization failed:", error);
    notificationBtn.classList.add('disabled');
    notificationBtn.title = "Notification service unavailable";
  }
}
// --- Update Button State ---
async function updateUIState() {
  isProcessing = false;
  notificationBtn.classList.remove('loading');

  const permission = Notification.permission;
  if (permission === 'denied') {
    notificationBtn.classList.add('disabled');
    notificationBtn.classList.remove('subscribed');
    notificationBtn.title = 'Notifications are blocked in your browser.';
    notificationBtn.innerHTML = '🚫 Blocked';
    return;
  }

  notificationBtn.classList.remove('disabled');

  if (permission === 'granted' && currentUser) {
    await checkCurrentPageSubscription();
    if (isSubscribedOnThisPage) {
      notificationBtn.classList.add('subscribed');
      notificationBtn.title = 'You are subscribed. Click to unsubscribe.';
      notificationBtn.innerHTML = '🔔 Unsubscribe';
    } else {
      notificationBtn.classList.remove('subscribed');
      notificationBtn.title = 'Click to subscribe for this page.';
      notificationBtn.innerHTML = '🔕 Subscribe';
    }
  } else {
    isSubscribedOnThisPage = false;
    notificationBtn.classList.remove('subscribed');
    notificationBtn.title = 'Sign in and click to enable notifications.';
    notificationBtn.innerHTML = '🔔 Subscribe';
  }
}

    async function handleSubscriptionRequest() {
      if (isProcessing) return;
      isProcessing = true;

      try {
        await initializeFirebase();

        if (!currentUser) {
          alert('Please sign in to subscribe to notifications.');
          isProcessing = false;
          return;
        }

        if (Notification.permission === 'denied') {
          alert('Notifications are blocked. Enable them in settings.');
          isProcessing = false;
          return;
        }

        if (Notification.permission === 'default') {
          const permissionResult = await Notification.requestPermission();
          if (permissionResult !== 'granted') {
            alert('Permission denied for notifications.');
            isProcessing = false;
            return;
          }
        }

        const wasSubscribed = isSubscribedOnThisPage;
        isSubscribedOnThisPage = !wasSubscribed;
        notificationBtn.classList.toggle('subscribed', isSubscribedOnThisPage);
        notificationBtn.classList.add('loading');
        notificationBtn.title = isSubscribedOnThisPage ? 'Unsubscribing...' : 'Subscribing...';

        const { getToken } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');
        const fcmToken = await getToken(messaging, {
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: swRegistration
        });

        if (!fcmToken) throw new Error("Failed to get FCM token.");
        currentToken = fcmToken;

        await saveTokenForUser(fcmToken);
        const success = await togglePageSubscription(fcmToken, wasSubscribed);

        if (!success) {
          isSubscribedOnThisPage = wasSubscribed;
          notificationBtn.classList.toggle('subscribed', wasSubscribed);
        }
      } catch (error) {
        console.error("Subscription error:", error);
        alert('Failed to manage subscription. Try again.');
      } finally {
        await updateUIState();
      }
    }

    // --- Save FCM Token to Firestore ---
    async function saveTokenForUser(token) {
      if (!currentUser || !db || !token) return;
      try {
        const { doc, setDoc, arrayUnion } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js');
        const userTokenRef = doc(db, 'userTokens', currentUser.uid);
        await setDoc(userTokenRef, { tokens: arrayUnion(token) }, { merge: true });
      } catch (error) {
        console.error("Failed to save user token:", error);
      }
    }

    // --- Subscribe/Unsubscribe in Firestore via Cloud Function ---
    async function togglePageSubscription(token, wasSubscribed) {
      if (!currentUser || !token) return false;
      const action = wasSubscribed ? 'unsubscribe' : 'subscribe';
      try {
        const response = await fetch("https://us-central1-appcomment.cloudfunctions.net/manageSubscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pageId, token, action })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Server responded with error:", errorData);
          alert("Subscription request failed.");
          return false;
        }

        const result = await response.json();
        return result.success === true;
      } catch (error) {
        console.error(`Error calling manageSubscription for ${action}:`, error);
        alert(`Could not ${action}. Please try again.`);
        return false;
      }
    }

    // --- Check if user already subscribed ---
    async function checkCurrentPageSubscription() {
      if (Notification.permission !== 'granted' || !currentUser || !db) {
        isSubscribedOnThisPage = false;
        return;
      }
      try {
        if (!currentToken) {
          const { getToken } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');
          currentToken = await getToken(messaging, {
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: swRegistration
          });
        }
        if (!currentToken) return;

        const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js');
        const pageSubRef = doc(db, 'pageSubscriptions', pageId);
        const docSnap = await getDoc(pageSubRef);
        isSubscribedOnThisPage = docSnap.exists() && docSnap.data().tokens?.includes(currentToken);
      } catch (error) {
        console.error("Error checking subscription:", error);
        isSubscribedOnThisPage = false;
      }
    }

    // --- Setup Button ---
    notificationBtn.addEventListener('click', handleSubscriptionRequest);
    initializeFirebase();
  };

  // --- Observe for dynamically added button ---
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
