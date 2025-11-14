

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, query, getDocs, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
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
        // --- SEVERE OPTIMIZATION ---
        // The previous method of calculating averages client-side was reading the ENTIRE quizScores collection
        // for EVERY user load. This is the primary reason for hitting the 50k daily read limit.
        //
        // A proper solution involves using Cloud Functions to maintain an aggregate score in a separate 'users' collection.
        //
        // As a pragmatic client-side-only solution, we will change the leaderboard logic. Instead of showing an
        // average (which requires reading all scores), we will show the top 50 users based on their SINGLE HIGHEST SCORE.
        // This is a much more efficient query.

        const scoresCollection = collection(db, "quizScores");
        const q = query(
            scoresCollection, 
            orderBy("score", "desc"), // Order by the single score field
            limit(1000) // Fetch the top 1000 scores to find unique top users
        );

        const querySnapshot = await getDocs(q);
        
        const userBestScores = new Map();
        querySnapshot.forEach((doc) => {
            const scoreData = doc.data();
            if (!scoreData.userId || !scoreData.userName) return;

            // Since the query is already ordered by score descending, the first score we see for a user is their best one.
            if (!userBestScores.has(scoreData.userId)) {
                userBestScores.set(scoreData.userId, {
                    bestScore: scoreData.score,
                    totalQuestions: scoreData.totalQuestions,
                    userName: scoreData.userName,
                    userPhotoURL: scoreData.userPhotoURL,
                    userId: scoreData.userId,
                });
            }
        });

        const leaderboardData = Array.from(userBestScores.values());
        
        // This sort is now much faster as it's on a smaller, pre-filtered dataset.
        leaderboardData.sort((a, b) => b.bestScore - a.bestScore);
        
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
        const displayName = isCurrentUser ? "You" : user.userName;
        const avatar = user.userPhotoURL || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23ddd"/></svg>';
        
        // Displaying best score instead of average percentage
        const scoreText = `${user.bestScore} / ${user.totalQuestions}`;

        leaderboardHTML += `
            <li class="${isCurrentUser ? 'current-user' : ''}">
                <div class="rank">${index + 1}</div>
                <img src="${avatar}" alt="${user.userName}" class="avatar">
                <div class="name">${displayName}</div>
                <div class="score">${scoreText} (Best)</div>
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
            const scoreText = `${userData.bestScore} / ${userData.totalQuestions}`;
            userRankHTML = `
                <div class="user-rank-display">
                    <h2>Your Overall Rank</h2>
                    <ol class="leaderboard">
                        <li class="current-user">
                            <div class="rank">${userRankIndex + 1}</div>
                            <img src="${avatar}" alt="${userData.userName}" class="avatar">
                            <div class="name">You</div>
                            <div class="score">${scoreText} (Best)</div>
                        </li>
                    </ol>
                </div>
            `;
        }
    }

    leaderboardContainer.innerHTML = leaderboardHTML + userRankHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    if(auth) {
        onAuthStateChanged(auth, (user) => {
            currentUser = user;
            loadLeaderboard();
        });
    } else {
        loadLeaderboard();
    }
});
