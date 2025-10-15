// js/firebase-init.js

(function() {
    // Prevent multiple initializations
    if (window.firebaseServices && window.firebaseServices.ready) {
        return;
    }

    // Use a simple script loader for the compat libraries
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            // Using async=false ensures scripts load and execute in order,
            // which is critical for dependent libraries like Firebase.
            script.async = false;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    const readyPromise = (async () => {
        try {
            // Load compat libraries which attach `firebase` to the window
            await loadScript("https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js");
            await loadScript("https://www.gstatic.com/firebasejs/9.22.1/firebase-auth-compat.js");
            await loadScript("https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js");
            await loadScript("https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js");

            const firebaseConfig = {
                apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
                authDomain: "appcomment.firebaseapp.com",
                projectId: "appcomment",
                storageBucket: "appcomment.firebasestorage.app",
                messagingSenderId: "156258808941",
                appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
            };

            // Initialize Firebase from the global object
            if (!firebase.apps.length) {
                 firebase.initializeApp(firebaseConfig);
            }
            
            const app = firebase.app();
            const auth = firebase.auth();
            const db = firebase.firestore();
            const messaging = firebase.messaging();

            // Return an object that matches the v8/compat structure
            return {
                app,
                auth,
                db,
                messaging,
                GoogleAuthProvider: firebase.auth.GoogleAuthProvider,
                serverTimestamp: firebase.firestore.FieldValue.serverTimestamp,
                arrayUnion: firebase.firestore.FieldValue.arrayUnion,
            };
        } catch (error) {
            console.error("Fatal Error: Firebase failed to initialize.", error);
            document.body.innerHTML = '<div style="padding: 2rem; text-align: center; color: red;">Could not connect to services. Please try again later.</div>';
            throw error;
        }
    })();
    
    window.firebaseServices = {
        ready: readyPromise
    };
})();
