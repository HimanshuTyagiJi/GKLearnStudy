
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
    if (typeof ts.toMillis === "function") return ts.toMillis();
    if (ts instanceof Date) return ts.getTime();
    if (typeof ts === "number") return ts > 2000000000 ? ts : ts * 1000;
    const d = new Date(ts);
    return isNaN(d) ? 0 : d.getTime();
}

// Resets the UI of test boxes to their original "Start Test" state.
function resetCategoryPageUI() {
    const testPartsContainer = document.getElementById('test-parts-container');
    if (!testPartsContainer) return;
    testPartsContainer.querySelectorAll('.box[data-quiz-id]').forEach(box => {
        if (box.dataset.originalHtml) {
            box.innerHTML = box.dataset.originalHtml;
        }
    });
}

// Main function to initialize the page view
async function initializeTestHub() {
    const testCategory = document.body.dataset.testCategory;
    if (!testCategory) {
        console.error("Fatal: 'data-test-category' attribute is missing from <body>.");
        return;
    }

    const leaderboardSection = document.querySelector('.leaderboard-section');
    const isGlobalPage = testCategory === 'all';

    if (leaderboardSection) {
        leaderboardSection.style.display = isGlobalPage ? 'block' : 'none';
    }

    if (isGlobalPage) {
        const leaderboardContainer = document.getElementById('leaderboard-container');
        if (!leaderboardContainer) return;
        leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';
        try {
            const scoresQuery = query(collection(db, "quizScores"));
            const querySnapshot = await getDocs(scoresQuery);
            const userAggregates = new Map();
            querySnapshot.forEach(doc => {
                const d = doc.data();
                if (!d.userId || !d.userName) return;
                if (!userAggregates.has(d.userId)) userAggregates.set(d.userId, { totalScore: 0, totalPossible: 0, userName: d.userName, userPhotoURL: d.userPhotoURL, userId: d.userId });
                const u = userAggregates.get(d.userId);
                u.totalScore += d.score;
                u.totalPossible += d.totalQuestions;
            });
            const leaderboardData = Array.from(userAggregates.values()).map(u => ({ ...u, avg: u.totalPossible > 0 ? (u.totalScore / u.totalPossible) * 100 : 0 }));
            leaderboardData.sort((a, b) => b.avg - a.avg);
            renderLeaderboard(leaderboardData);
        } catch (error) {
            console.error(`Error loading global leaderboard:`, error);
            if(leaderboardContainer) leaderboardContainer.innerHTML = "<p>Leaderboard could not be loaded.</p>";
        }
    } else {
        resetCategoryPageUI();
        if (currentUser) {
            await updateUserTestStatus(testCategory);
        }
    }
}

function renderLeaderboard(data) {
    const container = document.getElementById('leaderboard-container');
    const top50 = data.slice(0, 50);
    if (top50.length === 0) {
        container.innerHTML = `<p>No scores yet. Be the first!</p>`;
        return;
    }
    let html = '<ol class="leaderboard">';
    top50.forEach((d, i) => {
        const isMe = currentUser && currentUser.uid === d.userId;
        const name = isMe ? "You" : d.userName;
        html += `<li class="${isMe ? 'current-user' : ''}"><div class="rank">${i + 1}</div><img src="${d.userPhotoURL || ""}" class="avatar"><div class="name">${name}</div><div class="score">${d.avg.toFixed(2)}%</div></li>`;
    });
    html += '</ol>';
    container.innerHTML = html;
}

async function updateUserTestStatus(category) {
    const testPartsContainer = document.getElementById('test-parts-container');
    if (!currentUser || !testPartsContainer) return;

    try {
        const categoryPrefix = `${category}-test-`;
        const q = query(collection(db, "quizScores"), where("userId", "==", currentUser.uid));
        const userSnapshot = await getDocs(q);
        const latestScores = new Map();

        userSnapshot.forEach(doc => {
            const scoreData = doc.data();
            if (scoreData.quizId && scoreData.quizId.startsWith(categoryPrefix)) {
                const existing = latestScores.get(scoreData.quizId);
                if (!existing || getSafeTimestampMillis(scoreData.timestamp) > getSafeTimestampMillis(existing.timestamp)) {
                    latestScores.set(scoreData.quizId, scoreData);
                }
            }
        });

        testPartsContainer.querySelectorAll('.box[data-quiz-id]').forEach(box => {
            const quizId = box.dataset.quizId;
            if (latestScores.has(quizId)) {
                const scoreData = latestScores.get(quizId);
                const originalLink = box.querySelector('a');
                if (!originalLink) return;
                const partName = box.querySelector('h3')?.textContent || "Test Part";
                
                box.innerHTML = `
                    <div class="user-score-display"><h4>${partName}</h4><p><strong>Your Latest Score:</strong> ${scoreData.score} / ${scoreData.totalQuestions}</p></div>
                    <div class="button-group"><button class="btn retry-btn">Play Again</button><button class="btn review-btn">View Result</button></div>
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
                        alert('No review data found for this attempt. Please play again.');
                    }
                };
            }
        });
    } catch (error) {
        console.error("Error updating user test status:", error);
    }
}

// --- Entry Point Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // Store original HTML for all test boxes on first load to enable easy UI reset
    document.querySelectorAll('#test-parts-container .box[data-quiz-id]').forEach(box => {
        box.dataset.originalHtml = box.innerHTML;
    });

    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        initializeTestHub(); // Re-run logic on login/logout
    });
});

// ⭐ CRITICAL FIX FOR BACK BUTTON (BFCache) ⭐
// This ensures data is re-fetched when navigating back to the page.
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        initializeTestHub();
    }
});
