import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain: "appcomment.firebaseapp.com",
    projectId: "appcomment",
    storageBucket: "appcomment.firebasestorage.app",
    messagingSenderId: "156258808941",
    appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginModal = document.getElementById('login-modal');
const signInBtn = document.getElementById('sign-in-btn');
const continueGuestBtn = document.getElementById('continue-guest-btn');
const leaderboardContainer = document.getElementById('leaderboard-container');

function showModal() {
    if (loginModal && !sessionStorage.getItem('hideLoginModal')) {
        loginModal.classList.add('active');
    }
}

function hideModal() {
    if (loginModal) {
        loginModal.classList.remove('active');
    }
}

async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInBtn.disabled = true;
    signInBtn.textContent = "Connecting...";
    try {
        await signInWithPopup(auth, provider);
        // onAuthStateChanged will handle hiding the modal
    } catch (error) {
        console.error("Sign in error", error);
        alert("Could not sign in with Google. Please try again.");
        signInBtn.disabled = false;
        signInBtn.textContent = "गूगल से साइन-इन करें";
    }
}

async function loadLeaderboard() {
    if (!leaderboardContainer) return;

    leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    try {
        const q = query(
            collection(db, "quizScores"),
            where("timestamp", ">=", sevenDaysAgo),
            orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(q);
        const scores = [];
        querySnapshot.forEach((doc) => {
            scores.push(doc.data());
        });
        
        const userBestScores = new Map();
        scores.forEach(score => {
            if (!userBestScores.has(score.userId) || score.score > userBestScores.get(score.userId).score) {
                userBestScores.set(score.userId, score);
            }
        });

        const topScores = Array.from(userBestScores.values())
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        renderLeaderboard(topScores);

    } catch (error) {
        console.error("Error loading leaderboard:", error);
        leaderboardContainer.innerHTML = "<p>लीडरबोर्ड लोड नहीं हो सका। कृपया बाद में पुनः प्रयास करें।</p>";
    }
}

function renderLeaderboard(topScores) {
    if (topScores.length === 0) {
        leaderboardContainer.innerHTML = "<p>इस सप्ताह कोई स्कोर दर्ज नहीं किया गया। पहले बनें!</p>";
        return;
    }

    let leaderboardHTML = '<ol class="leaderboard">';
    topScores.forEach((score, index) => {
        leaderboardHTML += `
            <li>
                <div class="rank">${index + 1}</div>
                <img src="${score.userPhotoURL}" alt="${score.userName}" class="avatar">
                <div class="name">${score.userName}</div>
                <div class="score">${score.score} / ${score.totalQuestions}</div>
            </li>
        `;
    });
    leaderboardHTML += '</ol>';
    leaderboardContainer.innerHTML = leaderboardHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            hideModal();
        } else {
            showModal();
        }
    });

    if(signInBtn) signInBtn.addEventListener('click', signInWithGoogle);
    if(continueGuestBtn) continueGuestBtn.addEventListener('click', () => {
        sessionStorage.setItem('hideLoginModal', 'true');
        hideModal();
    });

    loadLeaderboard();
});
