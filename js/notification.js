// --- Firebase SDK Imports ---
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getMessaging, getToken, deleteToken, isSupported } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-functions.js";

document.addEventListener('DOMContentLoaded', async () => {
    // --- State and Config ---
    let auth, db, messaging, functions;
    let currentUser = null;
    let isProcessing = false;
    
    const OWNER_UID = "Pq5f4jTfiEOJCtXBLG0mZyyikIC2";

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
        if (p.includes('/comments.html')) return 'owner_dashboard';
        return ['/', '/index.html', ''].includes(p) ? 'main_page' : p.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '_').replace(/\.html$/, '');
    })();

    const isDashboard = pageId === 'owner_dashboard';

    // --- DOM Elements ---
    const notificationBtn = document.getElementById('notification-btn');
    if (!notificationBtn) return;
    
    // --- Toast Notification Utility ---
    const showToast = (message, type = 'info', duration = 4000) => {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
        }, duration);
    };

    // --- Firebase Initialization ---
    try {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(app);
        db = getFirestore(app);
        functions = getFunctions(app);
        messaging = (await isSupported()) ? getMessaging(app) : null;

        if (!messaging) throw new Error("Firebase Messaging is not supported.");

        onAuthStateChanged(auth, user => {
            currentUser = user;
            initializeNotificationState();
        });
    } catch (error) {
        console.error("Notification system failed to initialize:", error.message);
        notificationBtn.style.display = 'none';
    }

    // --- UI & State Management ---
    const setButtonState = (state, title = '') => {
        notificationBtn.classList.remove('loading', 'subscribed', 'disabled');
        notificationBtn.disabled = false;
        notificationBtn.title = title;

        switch(state) {
            case 'loading':
                notificationBtn.classList.add('loading');
                break;
            case 'subscribed':
                notificationBtn.classList.add('subscribed');
                notificationBtn.title = title || 'You are subscribed. Click to unsubscribe.';
                break;
            case 'unsubscribed':
                 notificationBtn.title = title || 'Click to get notifications.';
                 break;
            case 'denied':
                notificationBtn.classList.add('disabled');
                notificationBtn.disabled = true;
                notificationBtn.title = title || 'Notifications are blocked in your browser settings.';
                break;
        }
    }
    
    const initializeNotificationState = async () => {
        if (!currentUser) {
            notificationBtn.style.display = 'none';
            return;
        }

        if (isDashboard && currentUser.uid !== OWNER_UID) {
            notificationBtn.style.display = 'none';
            return;
        }

        notificationBtn.style.display = 'inline-flex';
        setButtonState('loading');

        try {
            if (Notification.permission === 'denied') {
                setButtonState('denied');
                return;
            }
            
            let isSubscribed = false;
            if (Notification.permission === 'granted') {
                 await navigator.serviceWorker.ready;
                 const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY }).catch(() => null);

                 if (currentToken) {
                    if (isDashboard) { // Owner's global subscription
                        const userTokenRef = doc(db, 'userTokens', OWNER_UID);
                        const userTokenDoc = await getDoc(userTokenRef);
                        isSubscribed = userTokenDoc.exists() && (userTokenDoc.data().tokens || []).includes(currentToken);
                    } else { // Page-specific subscription
                        const pageSubRef = doc(db, 'pageSubscriptions', pageId);
                        const docSnap = await getDoc(pageSubRef);
                        isSubscribed = docSnap.exists() && (docSnap.data().tokens || []).includes(currentToken);
                    }
                 }
            }
            setButtonState(isSubscribed ? 'subscribed' : 'unsubscribed');
        } catch (error) {
            console.error("Error checking subscription status:", error);
            setButtonState('unsubscribed', 'Could not check status.');
        }
    };
    
    // --- Core Subscription Logic ---
    const handleSubscriptionRequest = async () => {
        if (isProcessing || !messaging || !currentUser) return;
        isProcessing = true;
        setButtonState('loading');
        
        try {
            if (Notification.permission === 'default') {
                const permissionResult = await Notification.requestPermission();
                if (permissionResult !== 'granted') throw new Error("Permission was not granted.");
            }
            if (Notification.permission === 'denied') throw new Error("Notifications are blocked by your browser.");
            
            await navigator.serviceWorker.ready;
            const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
            if (!fcmToken) throw new Error("Could not get a notification token from the browser.");

            const isCurrentlySubscribed = notificationBtn.classList.contains('subscribed');
            const action = isCurrentlySubscribed ? 'unsubscribe' : 'subscribe';
            
            if (isDashboard) {
                const userTokenRef = doc(db, 'userTokens', OWNER_UID);
                const operation = action === 'subscribe' ? arrayUnion(fcmToken) : arrayRemove(fcmToken);
                await updateDoc(userTokenRef, { tokens: operation });
                if (action === 'unsubscribe') await deleteToken(messaging).catch(() => {});
            } else {
                const manageSubscription = httpsCallable(functions, 'manageSubscription');
                const result = await manageSubscription({ pageId, token: fcmToken, action });
                if (!result.data.success) throw new Error(result.data.message || `Could not ${action}.`);
            }
            
            const successMessage = action === 'subscribe' ? "Notifications successfully turned ON." : "Notifications turned OFF.";
            showToast(successMessage, 'success');

        } catch (error) {
            console.error("Subscription failed:", error);
            showToast(error.message || "An unexpected error occurred.", 'error');
        } finally {
            isProcessing = false;
            await initializeNotificationState();
        }
    };

    notificationBtn.addEventListener('click', handleSubscriptionRequest);
});
