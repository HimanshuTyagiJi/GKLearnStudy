document.addEventListener('DOMContentLoaded', async () => {
  // ✅ Service Worker Register करो
  let registration;
  try {
    registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log("✅ Service Worker registered:", registration);
    await navigator.serviceWorker.ready;
    console.log("✅ Service Worker ready");
  } catch (err) {
    console.error("❌ Service Worker registration failed:", err);
    return;
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
      return ['/', '/index.html', ''].includes(p)
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

        isFirebaseInitialized = true;

        onAuthStateChanged(auth, (user) => {
          currentUser = user;
          updateUIState();
        });
      } catch (error) {
        console.error("Firebase initialization failed:", error);
        notificationBtn.classList.add('disabled');
      }
    }

    // --- Handle Subscribe/Unsubscribe ---
    async function handleSubscriptionRequest() {
      if (isProcessing) return;
      isProcessing = true;
      try {
        await initializeFirebase();

        if (!currentUser) {
          alert('Please sign in to subscribe.');
          return;
        }

        if (Notification.permission === 'default') {
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            alert('Notifications blocked.');
            return;
          }
        }

        const { getToken } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');
        const token = await getToken(messaging, {
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: registration   // ✅ yahan se error fix ho gaya
        });

        console.log("✅ Got FCM token:", token);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        isProcessing = false;
      }
    }

    // --- Button click listener ---
    notificationBtn.addEventListener('click', handleSubscriptionRequest);
    initializeFirebase();
  };

  // --- Wait for button to appear ---
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
