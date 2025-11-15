import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// --- Configuration & Initialization ---
const firebaseConfig = {
    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain: "appcomment.firebaseapp.com",
    projectId: "appcomment",
    storageBucket: "appcomment.firebasestorage.app",
    messagingSenderId: "156258808941",
    appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

// ⭐ SAFE TIMESTAMP CONVERSION ⭐
function getSafeTimestampMillis(ts) {
    if (!ts) return 0;

    // Firestore Timestamp
    if (typeof ts.toMillis === "function") {
        return ts.toMillis();
    }

    // number
    if (typeof ts === "number") {
        if (ts < 2000000000) return ts * 1000; // seconds → ms
        return ts; // already ms
    }

    // string
    if (typeof ts === "string") {
        const d = new Date(ts);
        return d.getTime() || 0;
    }

    return 0;
}

// --- Main Initialization ---
async function initializeTestHub() {
    const testCategory = document.body.dataset.testCategory;
    if (!testCategory) {
        console.error("Fatal: 'data-test-category' attribute is missing from <body>.");
        return;
    }

    const leaderboardSection = document.querySelector('.leaderboard-section');

    if (testCategory === 'all') {
        const leaderboardContainer = document.getElementById('leaderboard-container');
        if (!leaderboardContainer) return;

        leaderboardSection.style.display = 'block';
        leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

        try {
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
            console.error(`Error loading global leaderboard:`, error);
            leaderboardContainer.innerHTML = "<p>The leaderboard could not be loaded. Please try again later.</p>";
        }

    } else {
        if (leaderboardSection) leaderboardSection.style.display = 'none';
        if (currentUser) {
            await updateUserTestStatus(testCategory);
        }
    }
}

function renderLeaderboard(fullLeaderboardData) {
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const topScores = fullLeaderboardData.slice(0, 50);

    if (topScores.length === 0) {
        leaderboardContainer.innerHTML = `<p>No scores yet. Be the first!</p>`;
        return;
    }

    let leaderboardHTML = '<ol class="leaderboard">';
    topScores.forEach((scoreData, index) => {
        const isCurrentUser = currentUser && currentUser.uid === scoreData.userId;
        const displayName = isCurrentUser ? "You" : scoreData.userName;
        const avatar = scoreData.userPhotoURL || "";

        leaderboardHTML += `
            <li class="${isCurrentUser ? 'current-user' : ''}">
                <div class="rank">${index + 1}</div>
                <img src="${avatar}" class="avatar">
                <div class="name">${displayName}</div>
                <div class="score">${scoreData.averagePercentage.toFixed(2)}%</div>
            </li>
        `;
    });
    leaderboardHTML += '</ol>';

    leaderboardContainer.innerHTML = leaderboardHTML;
}

// ⭐ ——————————————
// ⭐ UPDATE USER TEST STATUS WITH LATEST SCORE
// ⭐ ——————————————
async function updateUserTestStatus(category) {
    const testPartsContainer = document.getElementById('test-parts-container');
    if (!currentUser || !testPartsContainer) return;

    const categoryPrefix = `${category}-test-`;

    const q = query(collection(db, "quizScores"), where("userId", "==", currentUser.uid));
    const userSnapshot = await getDocs(q);

    const latestScoresForParts = new Map();

    userSnapshot.forEach(doc => {
        const scoreData = doc.data();
        const quizId = scoreData.quizId;

        if (quizId && quizId.startsWith(categoryPrefix)) {
            const existing = latestScoresForParts.get(quizId);

            const newTime = getSafeTimestampMillis(scoreData.timestamp);
            const oldTime = existing ? getSafeTimestampMillis(existing.timestamp) : 0;

            if (!existing || newTime > oldTime) {
                latestScoresForParts.set(quizId, scoreData);
            }
        }
    });

    testPartsContainer.querySelectorAll('.box').forEach(box => {
        const quizId = box.dataset.quizId;

        if (latestScoresForParts.has(quizId)) {
            const scoreData = latestScoresForParts.get(quizId);

            const originalLink = box.querySelector('a');
            if (!originalLink) return;

            const partName = box.querySelector('h3')?.textContent || originalLink.textContent;

            box.innerHTML = `
                <div class="user-score-display">
                    <h4>${partName}</h4>
                    <p><strong>Your Latest Score:</strong> ${scoreData.score} / ${scoreData.totalQuestions}</p>
                </div>
                <div class="button-group">
                    <button class="btn retry-btn">Play Again</button>
                    <button class="btn review-btn">View Result</button>
                </div>
            `;

            box.querySelector('.retry-btn').onclick = () => {
                sessionStorage.removeItem(`review_${quizId}`);
                sessionStorage.removeItem('reviewDataForNextPage');
                window.location.href = originalLink.href;
            };

            box.querySelector('.review-btn').onclick = () => {
                if (scoreData && scoreData.questions && scoreData.userAnswers) {
                    sessionStorage.setItem('reviewDataForNextPage', JSON.stringify(scoreData));
                    sessionStorage.setItem(`review_${quizId}`, 'true');
                    window.location.href = originalLink.href;
                } else {
                    alert('No review data found. Please play again.');
                }
            };
        }
    });
}

// Entry
document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        initializeTestHub();
    });
});
