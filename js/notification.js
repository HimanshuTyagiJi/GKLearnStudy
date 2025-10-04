
document.addEventListener('DOMContentLoaded', () => {
    // --- State and Config ---
    let firebaseApp = null;
    let messaging = null;
    let db = null;
    let auth = null;
    let currentUser = null;
    let isFirebaseInitialized = false;

    const firebaseConfig = {
        apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
        authDomain: "appcomment.firebaseapp.com",
        projectId: "appcomment",
        storageBucket: "appcomment.firebasestorage.app",
        messagingSenderId: "156258808941",
        appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
    };
    
    // !!! IMPORTANT: Replace this with your VAPID key from Firebase Console
    const VAPID_KEY = "BPSPa7nCW1nGok9peZQepk25VC1OxeFxFHtWVZsen2TnwVCya3Sq2Dtb4W0sX8u06fRsg-eAqgxEUoW2XP1Oyvo";

    // --- DOM Elements ---
    const notificationBtn = document.getElementById('notification-btn');

    // --- Dynamic Script Loader ---
    const loadFirebaseScript = (module) => {
        const url = `https://www.gstatic.com/firebasejs/9.22.1/firebase-${module}.js`;
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${url}"]`);
            if (existing) return resolve();
            const script = document.createElement('script');
            script.src = url; script.type = "module";
            script.onload = resolve; script.onerror = reject;
            document.head.appendChild(script);
        });
    };

    // --- Firebase Initialization ---
    async function initializeFirebase() {
        if (isFirebaseInitialized || !notificationBtn) return;
        try {
            await Promise.all([
                loadFirebaseScript('app'),
                loadFirebaseScript('auth'),
                loadFirebaseScript('firestore'),
                loadFirebaseScript('messaging')
            ]);
            
            const { initializeApp } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js');
            firebaseApp = initializeApp(firebaseConfig);

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
        
        const permission = Notification.permission;
        notificationBtn.classList.remove('loading', 'subscribed', 'disabled');

        if (permission === 'granted') {
            notificationBtn.classList.add('subscribed');
            notificationBtn.title = 'You are subscribed to notifications';
        } else if (permission === 'denied') {
            notificationBtn.classList.add('disabled');
            notificationBtn.title = 'Notifications are blocked in your browser settings';
        } else {
            notificationBtn.title = 'Click to enable notifications';
        }
    }
    
    // --- Core Notification Logic ---
    async function requestPermissionAndToken() {
        if (!currentUser) {
            alert('Please sign in to enable notifications.');
            // Attempt to trigger Google Sign-In from the other script
            document.getElementById('login-btn')?.click();
            return;
        }

        if (Notification.permission === 'denied') {
            alert('Notifications are blocked. Please enable them in your browser settings.');
            return;
        }

        notificationBtn.classList.add('loading');
        notificationBtn.disabled = true;

        try {
            const permission = await Notification.requestPermission();
            updateUIState();

            if (permission === 'granted') {
                const { getToken } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');
                const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
                
                if (fcmToken) {
                    await saveTokenToFirestore(fcmToken);
                    notificationBtn.classList.add('subscribed');
                } else {
                    console.warn('No registration token available. Request permission to generate one.');
                }
            }
        } catch (error) {
            console.error('An error occurred while getting token:', error);
            updateUIState(); // Revert to previous state on error
        } finally {
            notificationBtn.disabled = false;
        }
    }
    
    async function saveTokenToFirestore(token) {
        if (!currentUser || !db) return;

        const { doc, setDoc, arrayUnion } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js');
        const userTokensRef = doc(db, 'fcmTokens', currentUser.uid);

        try {
            // Atomically add the new token to the 'tokens' array field.
            await setDoc(userTokensRef, { 
                tokens: arrayUnion(token) 
            }, { merge: true });
            console.log('Token saved successfully.');
        } catch (error) {
            console.error('Error saving token to Firestore:', error);
        }
    }
    
    // --- Event Listener ---
    if (notificationBtn) {
        notificationBtn.addEventListener('click', requestPermissionAndToken);
    }
    
    // --- Lazy Initialization ---
    // Use an observer to initialize Firebase only when the button is visible.
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            initializeFirebase();
            observer.disconnect();
        }
    });
    
    if (notificationBtn) {
        observer.observe(notificationBtn);
    }
});
