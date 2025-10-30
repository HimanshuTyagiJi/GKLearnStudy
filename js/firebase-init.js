// --- Centralized Firebase Initialization (v9 Modular) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, initializeFirestore, persistentLocalCache } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js";
import { getFunctions } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-functions.js";

const firebaseConfig = {
    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain: "appcomment.firebaseapp.com",
    projectId: "appcomment",
    storageBucket: "appcomment.firebasestorage.app",
    messagingSenderId: "156258808941",
    appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth(app);
const functions = getFunctions(app);
const messaging = getMessaging(app);

// Initialize Firestore with an attempt for persistence
let db;
try {
    db = initializeFirestore(app, {
        localCache: persistentLocalCache({})
    });
} catch (e) {
    console.warn("Firestore persistence failed to initialize. This can happen in some browser environments. Falling back to in-memory.", e);
    db = getFirestore(app);
}

// Export the initialized services to be used in other modules
export { app, auth, db, messaging, functions };
