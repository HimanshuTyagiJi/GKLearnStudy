document.addEventListener('DOMContentLoaded', () => {
    // --- State and Config ---
    let firebaseApp = null;
    let messaging = null;
    let db = null;
    let auth = null;
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
                loadFirebaseScript('messaging')
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

        notificationBtn.classList.remove('loading', 'subscribed', 'disabled');

        const permission = Notification.permission;
        if (permission === 'denied') {
            notificationBtn.classList.add('disabled');
            notificationBtn.title = 'Notifications are blocked in your browser settings.';
            return;
        }

        if (permission === 'granted' && currentUser) {
            await checkCurrentPageSubscription();
            if (isSubscribedOnThisPage) {
                notificationBtn.classList.add('subscribed');
                notificationBtn.title = 'You are subscribed to notifications for this page.';
            } else {
                notificationBtn.title = 'Click to get notifications for this page.';
            }
        } else {
             notificationBtn.title = 'Click to enable notifications.';
        }
    }
    
    // --- Core Notification Logic ---
    async function handleSubscriptionRequest() {
        if (isProcessing) return;
        isProcessing = true;
        notificationBtn.classList.add('loading');

        try {
            if (!isFirebaseInitialized) await initializeFirebase();
            if (!currentUser) {
                alert('Please sign in to subscribe to notifications.');
                document.getElementById('login-btn')?.click();
                return;
            }

            if (Notification.permission === 'denied') {
                alert('Notifications are blocked. Please enable them in your browser settings.');
                return;
            }
            
            if (Notification.permission === 'default') {
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    alert('Permission was not granted for notifications.');
                    return;
                }
            }
            
            const { getToken } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');
            const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
            
            if (fcmToken) {
                currentToken = fcmToken;
                await togglePageSubscription(fcmToken);
            } else {
                console.warn('No registration token available. Request permission to generate one.');
            }
        } catch (error) {
            console.error('An error occurred during the subscription process:', error);
            alert('Failed to manage subscription. Please try again.');
        } finally {
            isProcessing = false;
            await updateUIState(); // Refresh UI based on the new state
        }
    }
    
    async function togglePageSubscription(token) {
        if (!currentUser || !db || !token) return;
        
        const { doc, setDoc, getDoc, arrayUnion, arrayRemove } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js');
        const pageSubRef = doc(db, 'pageSubscriptions', pageId);

        try {
            const docSnap = await getDoc(pageSubRef);
            const isCurrentlySubscribed = docSnap.exists() && docSnap.data().tokens?.includes(token);

            if (isCurrentlySubscribed) {
                await setDoc(pageSubRef, { tokens: arrayRemove(token) }, { merge: true });
                isSubscribedOnThisPage = false;
            } else {
                await setDoc(pageSubRef, { tokens: arrayUnion(token) }, { merge: true });
                isSubscribedOnThisPage = true;
            }
        } catch (error) {
            console.error('Error toggling subscription in Firestore:', error);
            throw error; // Re-throw to be caught by the handler
        }
    }

    async function checkCurrentPageSubscription() {
        if (Notification.permission !== 'granted' || !currentUser) {
            isSubscribedOnThisPage = false;
            return;
        }

        try {
            if (!currentToken) {
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
            updateUIState(); // Initial check once Firebase is ready
            observer.disconnect();
        }
    }, { rootMargin: '100px' });
    
    observer.observe(notificationBtn);
});
