
document.addEventListener('DOMContentLoaded', () => {
    // This script now waits for the notification button to be added to the DOM
    // before it initializes, making it compatible with dynamic UI changes.

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
            return ['/','/index.html',''].includes(p) ? 'main_page' : p.replace(/^\//,'').replace(/\/$/,'').replace(/\//g,'_').replace(/\.html$/,'');
        })();

        // --- Firebase Initialization ---
        async function initializeFirebase() {
            if (isFirebaseInitialized) return;
            try {
                // Dynamically import Firebase modules to avoid race conditions
                const { initializeApp, getApps, getApp } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js');
                const { getAuth, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js');
                const { getFirestore } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js');
                const { getMessaging } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');
                const { getFunctions } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-functions.js');

                if (getApps().length === 0) {
                    firebaseApp = initializeApp(firebaseConfig);
                } else {
                    firebaseApp = getApp();
                }
                auth = getAuth(firebaseApp);
                db = getFirestore(firebaseApp);
                messaging = getMessaging(firebaseApp);
                functions = getFunctions(firebaseApp);
                isFirebaseInitialized = true;
                
                onAuthStateChanged(auth, user => {
                    currentUser = user;
                    updateUIState();
                });

            } catch (error) {
                console.error("Firebase initialization failed:", error);
                notificationBtn.classList.add('disabled');
                notificationBtn.title = "Notification service unavailable";
            }
        }

        // --- UI Update Logic ---
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

        
        // --- Core Notification Logic ---
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
                    alert('Notifications are blocked. Please enable them in your browser settings.');
                    isProcessing = false;
                    return;
                }
                
                if (Notification.permission === 'default') {
                    const permissionResult = await Notification.requestPermission();
                    if (permissionResult !== 'granted') {
                        alert('Permission was not granted for notifications.');
                        isProcessing = false;
                        return;
                    }
                }
                
                const wasSubscribed = isSubscribedOnThisPage;
                isSubscribedOnThisPage = !wasSubscribed; 
                notificationBtn.classList.toggle('subscribed', isSubscribedOnThisPage);
                notificationBtn.title = isSubscribedOnThisPage ? 'Unsubscribing...' : 'Subscribing...';
                notificationBtn.classList.add('loading');
                
                await navigator.serviceWorker.ready;
                const { getToken } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');
                const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
                
                if (fcmToken) {
                    currentToken = fcmToken;
                    await saveTokenForUser(fcmToken); 
                    const success = await togglePageSubscription(fcmToken, wasSubscribed);

                    if (!success) {
                        isSubscribedOnThisPage = wasSubscribed;
                        notificationBtn.classList.toggle('subscribed', wasSubscribed);
                    }
                } else {
                    throw new Error("Could not retrieve FCM token.");
                }
            } catch (error) {
                console.error('An error occurred during the subscription process:', error);
                alert('Failed to manage subscription. Please try again.');
                isSubscribedOnThisPage = !isSubscribedOnThisPage; 
                notificationBtn.classList.toggle('subscribed', isSubscribedOnThisPage);
            } finally {
                await updateUIState(); 
            }
        }

        async function saveTokenForUser(token) {
            if (!currentUser || !db || !token) return;
            try {
                const { doc, setDoc, arrayUnion } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js');
                const userTokenRef = doc(db, 'userTokens', currentUser.uid);
                await setDoc(userTokenRef, { tokens: arrayUnion(token) }, { merge: true });
            } catch (error) {
                console.error("Failed to save user-specific token:", error);
            }
        }
        
        async function togglePageSubscription(token, wasSubscribed) {
            if (!currentUser || !functions || !token) return false;
            const action = wasSubscribed ? 'unsubscribe' : 'subscribe';
            try {
                const { httpsCallable } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-functions.js');
                const manageSubscription = httpsCallable(functions, 'manageSubscription');
                const result = await manageSubscription({ pageId: pageId, token: token, action: action });
                return result.data.success;
            } catch (error) {
                console.error(`Error calling manageSubscription for ${action}:`, error);
                alert(`Could not ${action}. Please try again.`);
                return false;
            }
        }

        async function checkCurrentPageSubscription() {
            if (Notification.permission !== 'granted' || !currentUser || !db) {
                isSubscribedOnThisPage = false;
                return;
            }
            try {
                if (!currentToken) {
                    await navigator.serviceWorker.ready;
                    const { getToken } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');
                    currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
                }
                if (!currentToken) { isSubscribedOnThisPage = false; return; }

                const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js');
                const pageSubRef = doc(db, 'pageSubscriptions', pageId);
                const docSnap = await getDoc(pageSubRef);
                isSubscribedOnThisPage = docSnap.exists() && docSnap.data().tokens?.includes(currentToken);
            } catch (error) {
                console.error("Could not check subscription state:", error);
                isSubscribedOnThisPage = false;
            }
        }
        
        // --- Attach Listener and Initialize State ---
        notificationBtn.addEventListener('click', handleSubscriptionRequest);
        initializeFirebase(); // Start initialization
    };

    // --- Observer to find the button ---
    // The button is now added dynamically by comment.js, so we must wait for it.
    const authContainer = document.getElementById('auth-container');
    if (authContainer) {
        const observer = new MutationObserver((mutationsList, obs) => {
            const notificationBtn = document.getElementById('notification-btn');
            if (notificationBtn) {
                initButton(notificationBtn);
                obs.disconnect(); // Found it, no need to observe anymore
            }
        });
        observer.observe(authContainer, { childList: true, subtree: true });
    }
});
