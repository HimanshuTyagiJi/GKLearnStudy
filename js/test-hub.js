
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
        // NOTE: This query reads the ENTIRE quizScores collection to calculate averages.
        // This is highly inefficient and can quickly exhaust the daily free quota of 50,000 document reads.
        const scoresQuery = query(collection(db, "quizScores"));
        const querySnapshot = await getDocs(scoresQuery);
        
        const userAggregates = new Map();

        querySnapshot.forEach((doc) => {
            const scoreData = doc.data();
            if (!scoreData.userId || !scoreData.userName) return;

            if (!userAggregates.has(scoreData.userId)) {
                userAggregates.set(scoreData.userId, {
                    totalScore: 0,
                    totalPossible: 0,
                    userName: scoreData.userName,
                    userPhotoURL: scoreData.userPhotoURL,
                    userId: scoreData.userId,
                });
            }
            
            const userData = userAggregates.get(scoreData.userId);
            userData.totalScore += scoreData.score;
            userData.totalPossible += scoreData.totalQuestions;
        });

        const leaderboardData = Array.from(userAggregates.values()).map(userData => ({
            ...userData,
            averagePercentage: userData.totalPossible > 0 ? (userData.totalScore / userData.totalPossible) * 100 : 0,
        }));
        
        leaderboardData.sort((a, b) => b.averagePercentage - a.averagePercentage);
        
        renderLeaderboard(leaderboardData);

    } catch (error) {
        console.error("Error loading leaderboard:", error);
        leaderboardContainer.innerHTML = "<p>Leaderboard could not be loaded. Please try again later.</p>";
    }
}

function renderLeaderboard(fullLeaderboardData) {
    const topScores = fullLeaderboardData.slice(0, 50);

    if (topScores.length === 0) {
        leaderboardContainer.innerHTML = `<p>No scores have been recorded yet. Be the first to take a test!</p>`;
        return;
    }

    let leaderboardHTML = '<ol class="leaderboard">';
    topScores.forEach((scoreData, index) => {
        const isCurrentUser = currentUser && currentUser.uid === scoreData.userId;
        const displayName = isCurrentUser ? "You" : scoreData.userName;
        const avatar = scoreData.userPhotoURL || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23ddd"/></svg>';
        leaderboardHTML += `
            <li class="${isCurrentUser ? 'current-user' : ''}">
                <div class="rank">${index + 1}</div>
                <img src="${avatar}" alt="${scoreData.userName}" class="avatar">
                <div class="name">${displayName}</div>
                <div class="score">${scoreData.averagePercentage.toFixed(2)}%</div>
            </li>
        `;
    });
    leaderboardHTML += '</ol>';

    let userRankHTML = '';
    if (currentUser) {
        const userRankIndex = fullLeaderboardData.findIndex(user => user.userId === currentUser.uid);
        if (userRankIndex !== -1 && userRankIndex >= topScores.length) {
            const userData = fullLeaderboardData[userRankIndex];
            const avatar = userData.userPhotoURL || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23ddd"/></svg>';
            userRankHTML = `
                <div class="user-rank-display">
                    <h2>Your Overall Rank</h2>
                    <ol class="leaderboard"><li class="current-user"><div class="rank">${userRankIndex + 1}</div><img src="${avatar}" alt="${userData.userName}" class="avatar"><div class="name">You</div><div class="score">${userData.averagePercentage.toFixed(2)}%</div></li></ol>
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
        // Fallback if auth fails to initialize
        loadLeaderboard();
    }
});
