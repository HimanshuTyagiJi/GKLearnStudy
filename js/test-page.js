
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, query, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain: "appcomment.firebaseapp.com",
    projectId: "appcomment",
    storageBucket: "appcomment.firebasestorage.app",
    messagingSenderId: "156258808941",
    appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
};

let app, auth, db;
try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
} catch (e) {
    console.error("Firebase initialization error:", e);
    const leaderboardContainer = document.getElementById('leaderboard-container');
    if(leaderboardContainer) leaderboardContainer.innerHTML = "<p>Error connecting to services.</p>";
}


const leaderboardContainer = document.getElementById('leaderboard-container');
let currentUser = null;

async function loadLeaderboard() {
    if (!leaderboardContainer) return;

    leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

    try {
        const querySnapshot = await getDocs(collection(db, "quizScores"));
        
        const userScores = new Map();
        querySnapshot.forEach((doc) => {
            const scoreData = doc.data();
            if (!scoreData.userId || !scoreData.userName) return;

            if (!userScores.has(scoreData.userId)) {
                userScores.set(scoreData.userId, {
                    totalScore: 0,
                    totalPossible: 0,
                    quizCount: 0,
                    userName: scoreData.userName,
                    userPhotoURL: scoreData.userPhotoURL,
                    userId: scoreData.userId,
                });
            }
            
            const userData = userScores.get(scoreData.userId);
            userData.totalScore += scoreData.score;
            userData.totalPossible += scoreData.totalQuestions;
            userData.quizCount += 1;
        });

        const leaderboardData = Array.from(userScores.values()).map(userData => {
            const averagePercentage = userData.totalPossible > 0 ? (userData.totalScore / userData.totalPossible) * 100 : 0;
            return {
                ...userData,
                averagePercentage,
            };
        });

        leaderboardData.sort((a, b) => b.averagePercentage - a.averagePercentage);
        
        renderLeaderboard(leaderboardData);

    } catch (error) {
        console.error("Error loading leaderboard:", error);
        leaderboardContainer.innerHTML = "<p>Leaderboard could not be loaded. Please try again later.</p>";
    }
}

function renderLeaderboard(leaderboardData) {
    const top50 = leaderboardData.slice(0, 50);

    let leaderboardHTML = '<ol class="leaderboard">';
    top50.forEach((user, index) => {
        const isCurrentUser = currentUser && currentUser.uid === user.userId;
        const displayName = isCurrentUser ? "You (Your Rank)" : user.userName;
        const avatar = user.userPhotoURL || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23ddd"/></svg>';
        leaderboardHTML += `
            <li class="${isCurrentUser ? 'current-user' : ''}">
                <div class="rank">${index + 1}</div>
                <img src="${avatar}" alt="${user.userName}" class="avatar">
                <div class="name">${displayName}</div>
                <div class="score">${user.averagePercentage.toFixed(2)}%</div>
            </li>
        `;
    });
    leaderboardHTML += '</ol>';

    let userRankHTML = '';
    if (currentUser) {
        const userRankIndex = leaderboardData.findIndex(user => user.userId === currentUser.uid);
        if (userRankIndex !== -1 && userRankIndex >= 50) { // Only show if user is outside top 50
            const userData = leaderboardData[userRankIndex];
             const avatar = userData.userPhotoURL || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23ddd"/></svg>';
            userRankHTML = `
                <div class="user-rank-display">
                    <h2>Your Overall Rank</h2>
                    <ol class="leaderboard">
                        <li class="current-user">
                            <div class="rank">${userRankIndex + 1}</div>
                            <img src="${avatar}" alt="${userData.userName}" class="avatar">
                            <div class="name">You</div>
                            <div class="score">${userData.averagePercentage.toFixed(2)}%</div>
                        </li>
                    </ol>
                </div>
            `;
        }
    }

    leaderboardContainer.innerHTML = leaderboardHTML + userRankHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    // onAuthStateChanged from comment.js will handle the user state.
    // We just need to listen for it here to reload the leaderboard with the correct user highlighted.
    if(auth) {
        onAuthStateChanged(auth, (user) => {
            currentUser = user;
            // The auth container UI is handled by comment.js, we just need to re-render the leaderboard
            loadLeaderboard();
        });
    } else {
        // Fallback if Firebase fails to init
        loadLeaderboard();
    }
});
