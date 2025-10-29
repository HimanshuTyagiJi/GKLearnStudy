// --- Firebase SDK Imports (Static & Modular) ---
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getMessaging, getToken, isSupported } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-functions.js";

document.addEventListener('DOMContentLoaded', async () => {
    // --- State and Config ---
    let auth, db, messaging, functions;
    let currentUser = null;
    let currentToken = null;
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
        return ['/', '/index.html', ''].includes(p) ? 'main_page' : p.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '_').replace(/\.html$/, '');
    })();

    // --- DOM Elements ---
    const notificationBtn = document.getElementById('notification-btn');
    if (!notificationBtn) return;

    // --- Firebase Initialization (Simplified & Robust) ---
    try {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(app);
        db = getFirestore(app);
        functions = getFunctions(app);
        messaging = (await isSupported()) ? getMessaging(app) : null;

        if (!messaging) {
            throw new Error("Firebase Messaging is not supported in this browser.");
        }

        onAuthStateChanged(auth, user => {
            currentUser = user;
            updateUIState();
        });
    } catch (error) {
        console.error("Firebase initialization failed:", error);
        notificationBtn.classList.add('disabled');
        notificationBtn.title = "Notification service unavailable";
        return; // Stop execution if Firebase fails to initialize
    }

    // --- UI Update Logic ---
    async function updateUIState() {
        if (!notificationBtn) return;
        
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
            const isSubscribed = await checkCurrentPageSubscription();
            notificationBtn.classList.toggle('subscribed', isSubscribed);
            notificationBtn.title = isSubscribed 
                ? 'You are subscribed. Click to unsubscribe.' 
                : 'Click to get notifications for new comments.';
        } else {
            notificationBtn.classList.remove('subscribed');
            notificationBtn.title = 'Sign in and click to enable notifications.';
        }
    }
    
    // --- Core Notification Logic ---
    async function handleSubscriptionRequest() {
        if (isProcessing || !messaging) return;
        isProcessing = true;
        notificationBtn.classList.add('loading');

        try {
            if (!currentUser) {
                alert('Please sign in to subscribe to notifications.');
                document.getElementById('login-btn')?.click();
                throw new Error("User not signed in.");
            }

            if (Notification.permission === 'default') {
                const permissionResult = await Notification.requestPermission();
                if (permissionResult !== 'granted') throw new Error("Permission not granted.");
            }

            if (Notification.permission === 'denied') {
                throw new Error('Notifications are blocked. Please enable them in your browser settings.');
            }
            
            await navigator.serviceWorker.ready;
            const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
            
            if (!fcmToken) throw new Error("Could not retrieve FCM token.");
            currentToken = fcmToken;
            
            await saveTokenForUser(fcmToken); 
            
            const isCurrentlySubscribed = notificationBtn.classList.contains('subscribed');
            await togglePageSubscription(fcmToken, isCurrentlySubscribed);

        } catch (error) {
            console.error('An error occurred during the subscription process:', error);
            if (error.message.includes("Could not subscribe") || error.message.includes("Could not unsubscribe")) {
                 alert(error.message);
            } else if (!error.message.includes("User not signed in")) {
                alert('Failed to manage subscription. Please try again.');
            }
        } finally {
            await updateUIState(); // Always refresh the UI state from the server truth
        }
    }

    async function saveTokenForUser(token) {
        if (!currentUser || !token) return;
        const userTokenRef = doc(db, 'userTokens', currentUser.uid);
        await setDoc(userTokenRef, { tokens: arrayUnion(token) }, { merge: true });
    }
    
    async function togglePageSubscription(token, isCurrentlySubscribed) {
        const action = isCurrentlySubscribed ? 'unsubscribe' : 'subscribe';
        try {
            const manageSubscription = httpsCallable(functions, 'manageSubscription');
            const result = await manageSubscription({ pageId, token, action });

            if (!result.data.success) {
                throw new Error(result.data.message || `Could not ${action}.`);
            }
            console.log(`Successfully ${action}d.`);
        } catch (error) {
            console.error(`Error calling manageSubscription function for ${action}:`, error);
            throw new Error(`Could not ${action}. Please try again.`);
        }
    }

    async function checkCurrentPageSubscription() {
        if (Notification.permission !== 'granted' || !currentUser || !messaging) {
            return false;
        }

        try {
            if (!currentToken) {
                currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
            }
            if (!currentToken) return false;

            const pageSubRef = doc(db, 'pageSubscriptions', pageId);
            const docSnap = await getDoc(pageSubRef);
            
            return docSnap.exists() && (docSnap.data().tokens || []).includes(currentToken);
        } catch (error) {
            console.error("Could not check subscription state:", error);
            return false;
        }
    }
    
    // --- Event Listener ---
    notificationBtn.addEventListener('click', handleSubscriptionRequest);
});
