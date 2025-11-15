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


// ⭐ UNIVERSAL TIMESTAMP FIX
function getSafeTimestampMillis(ts) {
    if (!ts) return 0;

    if (typeof ts.toMillis === "function") return ts.toMillis();   // Firestore timestamp
    if (typeof ts === "number") {
        if (ts < 2000000000) return ts * 1000;  // seconds → ms
        return ts;                               // already ms
    }
    if (typeof ts === "string") {
        const d = new Date(ts);
        return d.getTime() || 0;
    }
    return 0;
}


// The main function that orchestrates everything for the current page.
async function initializeTestHub() {
    const testCategory = document.body.dataset.testCategory;
    if (!testCategory) {
        console.error("Fatal: 'data-test-category' attribute is missing.");
        return;
    }

    const leaderboardSection = document.querySelector('.leaderboard-section');

    if (testCategory === 'all') {

        if (!leaderboardSection) return;
        const leaderboardContainer = document.getElementById('leaderboard-container');
        if (!leaderboardContainer) return;

        leaderboardSection.style.display = 'block';
        leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

        try {
            const scoresQuery = query(collection(db, "quizScores"));
            const querySnapshot = await getDocs(scoresQuery);

            const userAggregates = new Map();

            querySnapshot.forEach(doc => {
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

            const leaderboardData = Array.from(userAggregates.values()).map(u => ({
                ...u,
                averagePercentage: u.totalPossible > 0 ? (u.totalScore / u.totalPossible) * 100 : 0,
            }));

            leaderboardData.sort((a, b) => b.averagePercentage - a.averagePercentage);

            renderLeaderboard(leaderboardData);

        } catch (error) {
            console.error("Error loading leaderboard:", error);
            leaderboardContainer.innerHTML = "<p>Error loading leaderboard.</p>";
        }

    } else {

        if (leaderboardSection) leaderboardSection.style.display = 'none';

        if (currentUser) await updateUserTestStatus(testCategory);
    }
}


function renderLeaderboard(fullLeaderboardData) {
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const topCount = 50;
    const topScores = fullLeaderboardData.slice(0, topCount);

    if (topScores.length === 0) {
        leaderboardContainer.innerHTML = `<p>No scores yet. Be first!</p>`;
        return;
    }

    let html = '<ol class="leaderboard">';
    topScores.forEach((s, i) => {
        const isCurrent = currentUser && currentUser.uid === s.userId;
        html += `
            <li class="${isCurrent ? 'current-user' : ''}">
                <div class="rank">${i + 1}</div>
                <img src="${s.userPhotoURL || ''}" class="avatar">
                <div class="name">${isCurrent ? "You" : s.userName}</div>
                <div class="score">${s.averagePercentage.toFixed(2)}%</div>
            </li>
        `;
    });
    html += "</ol>";

    leaderboardContainer.innerHTML = html;
}


// ⭐ FINAL FIXED: ALWAYS SHOW LATEST ATTEMPT (NOT HIGHEST)
async function updateUserTestStatus(category) {
    const container = document.getElementById('test-parts-container');
    if (!currentUser || !container) return;

    const prefix = `${category}-test-`;

    const q = query(collection(db, "quizScores"), where("userId", "==", currentUser.uid));
    const snap = await getDocs(q);

    const latestScoresForParts = new Map();

    snap.forEach(doc => {
        const data = doc.data();
        const quizId = data.quizId;

        if (quizId && quizId.startsWith(prefix)) {

            const existing = latestScoresForParts.get(quizId);

            const newTime = getSafeTimestampMillis(data.timestamp);
            const oldTime = existing ? getSafeTimestampMillis(existing.timestamp) : -1;

            // ALWAYS TAKE NEWEST TIMESTAMP
            if (!existing || newTime > oldTime) {
                latestScoresForParts.set(quizId, data);
            }
        }
    });


    // Update DOM
    container.querySelectorAll('.box').forEach(box => {
        const quizId = box.dataset.quizId;

        if (latestScoresForParts.has(quizId)) {
            const scoreData = latestScoresForParts.get(quizId);
            const link = box.querySelector('a');
            if (!link) return;

            const partName = box.querySelector('h3')?.textContent || "Test";

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
                sessionStorage.removeItem("reviewDataForNextPage");
                window.location.href = link.href;
            };

            box.querySelector('.review-btn').onclick = () => {
                if (scoreData.questions && scoreData.userAnswers) {
                    sessionStorage.setItem("reviewDataForNextPage", JSON.stringify(scoreData));
                    sessionStorage.setItem(`review_${quizId}`, 'true');
                    window.location.href = link.href;
                } else {
                    alert("No review data available. Please play again.");
                }
            };
        }
    });
}


// Entry point
document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        initializeTestHub();
    });
});
