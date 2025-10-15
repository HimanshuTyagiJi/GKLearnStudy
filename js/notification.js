document.addEventListener('DOMContentLoaded', () => {
    // --- State and Config ---
    let firebaseApp = null;
    let messaging = null;
    let db = null;
    let auth = null;
    let currentUser = null;
    let isFirebaseInitialized = false;
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
    function updateUIState() {
        if (!notificationBtn) return;
        
        notificationBtn.classList.remove('loading', 'permission-denied', 'subscribed');
        
        const permission = Notification.permission;
        
        if (!currentUser) {
            notificationBtn.classList.remove('disabled');
            notificationBtn.title = 'Sign in to enable notifications.';
            return;
        }

        if (permission === 'denied') {
            notificationBtn.classList.add('disabled', 'permission-denied');
            notificationBtn.title = 'Notifications are blocked in your browser settings.';
            return;
        }

        notificationBtn.classList.remove('disabled');

        if (permission === 'granted') {
            notificationBtn.classList.add('subscribed'); // Visually show as "active"
            notificationBtn.title = 'Notifications are enabled. Click to refresh token if needed.';
        } else {
            notificationBtn.title = 'Click to enable notifications for replies.';
        }
    }
    
    // --- Core Notification Logic ---
    async function handlePermissionRequest() {
        if (isProcessing) return;
        isProcessing = true;
        notificationBtn.classList.add('loading');
        
        try {
            if (!isFirebaseInitialized) await initializeFirebase();
            if (!currentUser) {
                alert('Please sign in to enable notifications.');
                // Attempt to trigger the sign-in flow if possible
                document.querySelector('#google-login-btn, #login-btn')?.click();
                return;
            }

            if (Notification.permission === 'denied') {
                alert('Notifications are blocked. Please enable them in your browser or site settings.');
                return;
            }
            
            // This will prompt the user if permission is 'default'
            await navigator.serviceWorker.ready;
            const { getToken } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');
            const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
            
            if (fcmToken) {
                await saveTokenForUser(fcmToken); 
                alert('Notifications enabled! You will now be notified of replies to your comments.');
            } else {
                // This can happen if the user denies the permission prompt
                console.log("Could not get FCM token. Permission might have been denied.");
            }
        } catch (error) {
            console.error('An error occurred during the notification setup:', error);
            alert('Failed to enable notifications. Please try again.');
        } finally {
            isProcessing = false;
            // Always update the UI to reflect the final state of Notification.permission
            updateUIState(); 
        }
    }

    async function saveTokenForUser(token) {
        if (!currentUser || !db || !token) return;
        try {
            const { doc, setDoc, arrayUnion } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js');
            const userTokenRef = doc(db, 'userTokens', currentUser.uid);
            await setDoc(userTokenRef, { tokens: arrayUnion(token) }, { merge: true });
            console.log("User's FCM token saved successfully.");
        } catch (error) {
            console.error("Failed to save user-specific token:", error);
            throw new Error("Could not save token to database.");
        }
    }
    
    // --- Event Listener ---
    notificationBtn.addEventListener('click', handlePermissionRequest);
    
    // --- Lazy Initialization ---
    const observer = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
            await initializeFirebase();
            observer.disconnect();
        }
    }, { rootMargin: '100px' });
    
    observer.observe(notificationBtn);
});
