
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

// Converts various timestamp formats to milliseconds for reliable comparison.
function getSafeTimestampMillis(ts) {
    if (!ts) return 0;
    if (typeof ts.toMillis === "function") return ts.toMillis();
    if (ts instanceof Date) return ts.getTime();
    if (typeof ts === "number") return ts > 2000000000 ? ts : ts * 1000;
    if (typeof ts === "string") {
        const d = new Date(ts);
        return isNaN(d) ? 0 : d.getTime();
    }
    return 0;
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

// Main initialization function for both global and category test pages.
async function initializeTestHub() {
    const testCategory = document.body.dataset.testCategory;
    if (!testCategory) {
        console.error("Fatal: 'data-test-category' attribute is missing from <body>.");
        return;
    }

    const leaderboardContainer = document.getElementById('leaderboard-container');
    const testPartsContainer = document.getElementById('test-parts-container');
    const isCategoryPage = testCategory !== 'all';

    // --- Part 1: Handle Leaderboard ---
    if (leaderboardContainer) {
        leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';
        try {
            let scoresQuery;
            const categoryPrefix = `${testCategory}-test-`;

            if (testCategory === 'all') {
                scoresQuery = query(collection(db, "quizScores"));
            } else {
                scoresQuery = query(
                    collection(db, "quizScores"),
                    where("quizId", ">=", categoryPrefix),
                    where("quizId", "<", categoryPrefix + '\uf8ff')
                );
            }

            const querySnapshot = await getDocs(scoresQuery);

            // FIX: Filter for latest scores for each user-quiz pair before aggregating.
            const latestScoresMap = new Map();
            querySnapshot.forEach((doc) => {
                const scoreData = doc.data();
                if (!scoreData.userId || !scoreData.quizId) return;
                const key = `${scoreData.userId}-${scoreData.quizId}`;
                const existing = latestScoresMap.get(key);
                if (!existing || getSafeTimestampMillis(scoreData.timestamp) > getSafeTimestampMillis(existing.timestamp)) {
                    latestScoresMap.set(key, scoreData);
                }
            });

            const userAggregates = new Map();
            latestScoresMap.forEach((scoreData) => { // Iterate over the filtered map
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
            
            renderLeaderboard(leaderboardData, testCategory);
        } catch (error) {
            console.error(`Error loading leaderboard for '${testCategory}':`, error);
            leaderboardContainer.innerHTML = "<p>The leaderboard could not be loaded. Please try again later.</p>";
        }
    }

    // --- Part 2: Handle User-Specific Score Boxes ---
    if (isCategoryPage && testPartsContainer) {
        resetCategoryPageUI();
        if (currentUser) {
            await updateUserTestStatus(testCategory);
        }
    }
}

// Renders the leaderboard, adapting for global vs. category view.
function renderLeaderboard(fullLeaderboardData, category) {
    const leaderboardContainer = document.getElementById('leaderboard-container');
    if(!leaderboardContainer) return;

    const topCount = (category === 'all') ? 50 : 10;
    const topScores = fullLeaderboardData.slice(0, topCount);

    if (topScores.length === 0) {
        const message = category === 'all' 
            ? "No scores have been recorded yet. Be the first to take a test!"
            : "No scores have been recorded in this category yet.";
        leaderboardContainer.innerHTML = `<p>${message}</p>`;
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
    if (currentUser && category === 'all') {
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

// Fetches and displays the user's LATEST scores on category pages.
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
            const quizId = scoreData.quizId;

            if (quizId && quizId.startsWith(categoryPrefix)) {
                const existing = latestScores.get(quizId);
                const newTime = getSafeTimestampMillis(scoreData.timestamp);
                if (!existing || newTime > getSafeTimestampMillis(existing.timestamp)) {
                    latestScores.set(quizId, scoreData);
                }
            }
        });

        testPartsContainer.querySelectorAll('.box[data-quiz-id]').forEach(box => {
            const quizId = box.dataset.quizId;
            if (latestScores.has(quizId)) {
                const scoreData = latestScores.get(quizId);
                
                // **THE FIX IS HERE**
                // Read the name from the permanent 'data-part-name' attribute. This is reliable.
                const partName = box.dataset.partName || "Test Part";
                
                // Get the original link href from the stored original HTML.
                const tempDiv = document.createElement('div');
                if (box.dataset.originalHtml) {
                    tempDiv.innerHTML = box.dataset.originalHtml;
                }
                const originalLink = tempDiv.querySelector('a');
                if (!originalLink) return;

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
                        alert('No review data found for this attempt. Please play the test again.');
                    }
                };
            }
        });
    } catch (error) {
        console.error("Error updating user test status:", error);
    }
}

// --- Entry Point & Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // On first load, save the original HTML of each test box for easy UI reset on logout.
    document.querySelectorAll('#test-parts-container .box[data-quiz-id]').forEach(box => {
        if (!box.dataset.originalHtml) {
            box.dataset.originalHtml = box.innerHTML;
        }
    });

    // Main auth listener. Triggers the page logic on initial load and on login/logout.
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        initializeTestHub();
    });
});

// CRITICAL: This event fires when navigating back from the browser's back/forward cache (bfcache).
// It forces the page to re-run the logic and fetch the latest score from Firestore.
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        console.log("Page loaded from BFCache. Forcing data refresh.");
        currentUser = auth.currentUser;
        initializeTestHub();
    }
});
