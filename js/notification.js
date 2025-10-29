document.addEventListener('DOMContentLoaded', () => {
    // --- State and Config ---
    let firebaseApp = null;
    let messaging = null;
    let db = null;
    let auth = null;
    let functions = null; // Added for callable functions
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

    // --- DOM Elements ---
    const notificationBtn = document.getElementById('notification-btn');
    if (!notificationBtn) return;

    // --- Dynamic Script Loader ---
    const loadFirebaseScript = (module) => {
        const url = `https://www.gstatic.com/firebasejs/9.22.1/firebase-${module}.js`;
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${url}"]`);
            if (existing) {
                if(existing.dataset.loaded) return resolve();
                existing.addEventListener('load', resolve);
                return;
            }
            const script = document.createElement('script');
            script.src = url; script.type = "module";
            script.onload = () => { script.dataset.loaded = true; resolve(); };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };

    // --- Firebase Initialization ---
    async function initializeFirebase() {
        if (isFirebaseInitialized) return;
        try {
            await Promise.all([
                loadFirebaseScript('app'),
                loadFirebaseScript('auth'),
                loadFirebaseScript('firestore'),
                loadFirebaseScript('messaging'),
                loadFirebaseScript('functions') // Added functions module
            ]);
            
            const { initializeApp, getApps, getApp } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js');
            if (getApps().length === 0) {
                firebaseApp = initializeApp(firebaseConfig);
            } else {
                firebaseApp = getApp();
            }

            const { getAuth, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js');
            auth = getAuth(firebaseApp);

            const { getFirestore } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js');
            db = getFirestore(firebaseApp);

            const { getMessaging } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');
            messaging = getMessaging(firebaseApp);
            
            const { getFunctions } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-functions.js');
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
    async function updateUIState() {
        if (!notificationBtn) return;
        
        // Stop any loading spinners before updating the final state
        isProcessing = false;
        notificationBtn.classList.remove('loading');
        
        const permission = Notification.permission;
        if (permission === 'denied') {
            notificationBtn.classList.add('disabled');
            notificationBtn.classList.remove('subscribed');
            notificationBtn.title = 'Notifications are blocked in your browser settings.';
            return;
        }

        notificationBtn.classList.remove('disabled');

        if (permission === 'granted' && currentUser) {
            await checkCurrentPageSubscription();
            if (isSubscribedOnThisPage) {
                notificationBtn.classList.add('subscribed');
                notificationBtn.title = 'You are subscribed to notifications for this page. Click to unsubscribe.';
            } else {
                notificationBtn.classList.remove('subscribed');
                notificationBtn.title = 'Click to get notifications for new comments on this page.';
            }
        } else {
            isSubscribedOnThisPage = false; // Reset state if not logged in or no permission
            notificationBtn.classList.remove('subscribed');
            notificationBtn.title = 'Sign in and click to enable notifications.';
        }
    }
    
    // --- Core Notification Logic ---
    async function handleSubscriptionRequest() {
        if (isProcessing) return;
        isProcessing = true;
        
        try {
            if (!isFirebaseInitialized) await initializeFirebase();
            if (!currentUser) {
                alert('Please sign in to subscribe to notifications.');
                document.getElementById('login-btn')?.click();
                isProcessing = false;
                return;
            }

            if (Notification.permission === 'denied') {
                alert('Notifications are blocked. Please enable them in your browser settings.');
                isProcessing = false;
                return;
            }
            
            if (Notification.permission === 'default') {
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    alert('Permission was not granted for notifications.');
                    isProcessing = false;
                    return;
                }
            }
            
            // --- OPTIMISTIC UI UPDATE ---
            const wasSubscribed = isSubscribedOnThisPage;
            // Instantly toggle the visual state
            isSubscribedOnThisPage = !wasSubscribed; 
            notificationBtn.classList.toggle('subscribed', isSubscribedOnThisPage);
            notificationBtn.title = isSubscribedOnThisPage ? 'Unsubscribing...' : 'Subscribing...';
            notificationBtn.classList.add('loading');
            
            // --- BACKGROUND PROCESSING ---
            await navigator.serviceWorker.ready;
            const { getToken } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');
            const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
            
            if (fcmToken) {
                currentToken = fcmToken;
                await saveTokenForUser(fcmToken); 
                const success = await togglePageSubscription(fcmToken, wasSubscribed);

                // If background operation failed, revert the optimistic UI change
                if (!success) {
                    console.log("Operation failed, reverting UI.");
                    isSubscribedOnThisPage = wasSubscribed; // Revert state
                    notificationBtn.classList.toggle('subscribed', wasSubscribed);
                }
            } else {
                throw new Error("Could not retrieve FCM token.");
            }
        } catch (error) {
            console.error('An error occurred during the subscription process:', error);
            alert('Failed to manage subscription. Please try again.');
            // Revert UI on any error
            isSubscribedOnThisPage = !isSubscribedOnThisPage; 
            notificationBtn.classList.toggle('subscribed', isSubscribedOnThisPage);
        } finally {
            // Final, authoritative UI update
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

            if (result.data.success) {
                console.log(`Successfully ${action}d.`);
                return true;
            } else {
                 throw new Error(result.data.message || 'Function call was not successful.');
            }
        } catch (error) {
            console.error(`Error calling manageSubscription function for ${action}:`, error);
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

            if (!currentToken) {
                isSubscribedOnThisPage = false;
                return;
            }

            const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js');
            const pageSubRef = doc(db, 'pageSubscriptions', pageId);
            const docSnap = await getDoc(pageSubRef);
            
            isSubscribedOnThisPage = docSnap.exists() && docSnap.data().tokens?.includes(currentToken);
        } catch (error) {
            console.error("Could not check subscription state:", error);
            isSubscribedOnThisPage = false;
        }
    }
    
    // --- Event Listener ---
    notificationBtn.addEventListener('click', handleSubscriptionRequest);
    
    // --- Lazy Initialization ---
    const observer = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
            await initializeFirebase();
            await updateUIState(); // Initial check
            observer.disconnect();
        }
    }, { rootMargin: '100px' });
    
    observer.observe(notificationBtn);
});
