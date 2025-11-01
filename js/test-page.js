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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
        leaderboardContainer.innerHTML = "<p>लीडरबोर्ड लोड नहीं हो सका। कृपया बाद में पुनः प्रयास करें।</p>";
    }
}

function renderLeaderboard(leaderboardData) {
    const top50 = leaderboardData.slice(0, 50);

    let leaderboardHTML = '<h2>Top 50 Players</h2><ol class="leaderboard">';
    top50.forEach((user, index) => {
        const isCurrentUser = currentUser && currentUser.uid === user.userId;
        const displayName = isCurrentUser ? "You" : user.userName;
        leaderboardHTML += `
            <li class="${isCurrentUser ? 'current-user' : ''}">
                <div class="rank">${index + 1}</div>
                <img src="${user.userPhotoURL}" alt="${user.userName}" class="avatar">
                <div class="name">${displayName}</div>
                <div class="score">${user.averagePercentage.toFixed(2)}%</div>
            </li>
        `;
    });
    leaderboardHTML += '</ol>';

    let userRankHTML = '';
    if (currentUser) {
        const userRankIndex = leaderboardData.findIndex(user => user.userId === currentUser.uid);
        if (userRankIndex !== -1 && userRankIndex >= 50) {
            const userData = leaderboardData[userRankIndex];
            userRankHTML = `
                <div class="user-rank-display">
                    <h2>Your Rank</h2>
                    <ol class="leaderboard">
                        <li class="current-user">
                            <div class="rank">${userRankIndex + 1}</div>
                            <img src="${userData.userPhotoURL}" alt="${userData.userName}" class="avatar">
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
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        loadLeaderboard();
    });
});
