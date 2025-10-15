// js/firebase-init.js

(function() {
    // Prevent multiple initializations
    if (window.firebaseServices && window.firebaseServices.ready) {
        return;
    }

    // --- Dynamic Script Loader ---
    function loadFirebaseScript(module) {
        const url = `https://www.gstatic.com/firebasejs/9.22.1/firebase-${module}.js`;
        return new Promise((resolve, reject) => {
            const existingScript = document.querySelector(`script[src="${url}"]`);
            if (existingScript) {
                if (existingScript.dataset.loaded) resolve();
                else existingScript.addEventListener('load', resolve);
                return;
            }
            const script = document.createElement('script');
            script.src = url;
            script.type = "module";
            script.onload = () => { script.dataset.loaded = true; resolve(); };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    const readyPromise = (async () => {
        try {
            await Promise.all([
                loadFirebaseScript('app'),
                loadFirebaseScript('auth'),
                loadFirebaseScript('firestore'),
                loadFirebaseScript('messaging'),
            ]);

            const firebaseConfig = {
                apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
                authDomain: "appcomment.firebaseapp.com",
                projectId: "appcomment",
                storageBucket: "appcomment.firebasestorage.app",
                messagingSenderId: "156258808941",
                appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
            };

            const appModule = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js');
            const authModule = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js');
            const firestoreModule = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js');
            const messagingModule = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js');

            const app = appModule.getApps().length === 0 ? appModule.initializeApp(firebaseConfig) : appModule.getApp();
            
            const auth = authModule.getAuth(app);
            const db = firestoreModule.getFirestore(app);
            const messaging = messagingModule.getMessaging(app);

            // Export everything needed by other scripts
            return {
                app,
                auth,
                db,
                messaging,
                // Auth functions
                onAuthStateChanged: authModule.onAuthStateChanged,
                GoogleAuthProvider: authModule.GoogleAuthProvider,
                signInWithPopup: authModule.signInWithPopup,
                signOut: authModule.signOut,
                // Firestore functions
                addDoc: firestoreModule.addDoc,
                collection: firestoreModule.collection,
                deleteDoc: firestoreModule.deleteDoc,
                query: firestoreModule.query,
                orderBy: firestoreModule.orderBy,
                serverTimestamp: firestoreModule.serverTimestamp,
                doc: firestoreModule.doc,
                runTransaction: firestoreModule.runTransaction,
                onSnapshot: firestoreModule.onSnapshot,
                getDoc: firestoreModule.getDoc,
                setDoc: firestoreModule.setDoc,
                arrayUnion: firestoreModule.arrayUnion,
                collectionGroup: firestoreModule.collectionGroup,
                // Messaging functions
                getToken: messagingModule.getToken,
            };
        } catch (error) {
            console.error("Fatal Error: Firebase failed to initialize.", error);
            document.body.innerHTML = '<div style="padding: 2rem; text-align: center; color: red;">Could not connect to services. Please try again later.</div>';
            throw error; // Propagate the error to stop further script execution
        }
    })();
    
    window.firebaseServices = {
        ready: readyPromise
    };
})();
