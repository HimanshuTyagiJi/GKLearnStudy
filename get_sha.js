import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFH1SGy9Gc7JJZhTLv2bktvTE4q_mSU3M",
    authDomain: "gklearnstudyy.firebaseapp.com",
    projectId: "gklearnstudyy",
    storageBucket: "gklearnstudyy.appspot.com",
    messagingSenderId: "256328121620",
    appId: "1:256328121620:web:6de8ba9ae25e83c4875601"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to get SHA of an existing file from GitHub
async function getSHA(fileName) {
    const response = await fetch(`https://api.github.com/repos/HimanshuTyagiJi/GKLearnStudy/contents/${fileName}`, {
        headers: {
            "Authorization": `token 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`
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data.sha; // Return SHA if file exists
    } else {
        return null; // File not found
    }
}

// Export the getSHA function for use in other files
export { getSHA };
