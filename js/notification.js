(async () => {
    // Wait for the shared Firebase services to be ready
    const firebase = await window.firebaseServices.ready;
    const { auth, db, messaging } = firebase;

    // --- State and Config ---
    let currentUser = null;
    let isProcessing = false;
    const VAPID_KEY = "BPSPa7nCW1nGok9peZQepk25VC1OxeFxFHtWVZsen2TnwVCya3Sq2Dtb4W0sX8u06fRsg-eAqgxEUoW2XP1Oyvo";

    // --- DOM Elements ---
    const notificationBtn = document.getElementById('notification-btn');
    if (!notificationBtn) return;

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
            notificationBtn.classList.add('subscribed');
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
            if (!currentUser) {
                alert('Please sign in to enable notifications.');
                document.querySelector('#google-login-btn')?.click();
                return;
            }

            if (Notification.permission === 'denied') {
                alert('Notifications are blocked. Please enable them in your browser or site settings.');
                return;
            }
            
            await navigator.serviceWorker.ready;
            const fcmToken = await messaging.getToken({ vapidKey: VAPID_KEY });
            
            if (fcmToken) {
                await saveTokenForUser(fcmToken); 
                alert('Notifications enabled! You will now be notified of replies to your comments.');
            } else {
                console.log("Could not get FCM token. Permission might have been denied.");
            }
        } catch (error) {
            console.error('An error occurred during the notification setup:', error);
            alert('Failed to enable notifications. Please try again.');
        } finally {
            isProcessing = false;
            updateUIState(); 
        }
    }

    async function saveTokenForUser(token) {
        if (!currentUser || !token) return;
        try {
            const userTokenRef = db.doc(`userTokens/${currentUser.uid}`);
            await userTokenRef.set({ tokens: firebase.arrayUnion(token) }, { merge: true });
            console.log("User's FCM token saved successfully.");
        } catch (error) {
            console.error("Failed to save user-specific token:", error);
            throw new Error("Could not save token to database.");
        }
    }
    
    // --- Event Listener ---
    notificationBtn.addEventListener('click', handlePermissionRequest);
    
    // Listen for auth changes from the central service to update UI
    auth.onAuthStateChanged((user) => {
        currentUser = user;
        updateUIState();
    });

})();
