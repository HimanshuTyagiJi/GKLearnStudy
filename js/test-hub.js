
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
// Converts various timestamp formats to milliseconds for reliable comparison.
function getSafeTimestampMillis(ts) {
    if (!ts) return 0;
    // Firestore Timestamp object
    if (typeof ts.toMillis === "function") {
        return ts.toMillis();
    }
    // JavaScript Date object
    if (ts instanceof Date) {
        return ts.getTime();
    }
    // Number (seconds or milliseconds)
    if (typeof ts === "number") {
        return ts > 2000000000 ? ts : ts * 1000;
    }
    // String date
    const d = new Date(ts);
    return isNaN(d) ? 0 : d.getTime();
}

// Resets the UI of test boxes to their original "Start Test" state.
function resetCategoryPageUI() {
    const testPartsContainer = document.getElementById('test-parts-container');
    if (!testPartsContainer) return;
    testPartsContainer.querySelectorAll('.box[data-quiz-id]').forEach(box => {
        // Restore original HTML if it was saved
        if (box.dataset.originalHtml) {
            box.innerHTML = box.dataset.originalHtml;
        }
    });
}


// --- Main Initialization ---
async function initializeTestHub() {
    const testCategory = document.body.dataset.testCategory;
    if (!testCategory) {
        console.error("Fatal: 'data-test-category' attribute is missing from <body>.");
        return;
    }

    const leaderboardSection = document.querySelector('.leaderboard-section');
    const isGlobalPage = testCategory === 'all';

    // Show/hide leaderboard section based on page type
    if (leaderboardSection) {
        leaderboardSection.style.display = isGlobalPage ? 'block' : 'none';
    }

    if (isGlobalPage) {
        // --- Logic for Global Leaderboard on test.html ---
        const leaderboardContainer = document.getElementById('leaderboard-container');
        if (!leaderboardContainer) return;

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
            if(leaderboardContainer) leaderboardContainer.innerHTML = "<p>The leaderboard could not be loaded. Please try again later.</p>";
        }

    } else {
        // --- Logic for Category-Specific Pages (e.g., hindi-test.html) ---
        // 1. Always reset the UI first to handle logout or data changes.
        resetCategoryPageUI();
        
        // 2. If a user is logged in, fetch and display their latest scores.
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
// ⭐ UPDATE USER TEST STATUS WITH LATEST SCORE (FIXED LOGIC)
// ⭐ ——————————————
async function updateUserTestStatus(category) {
    const testPartsContainer = document.getElementById('test-parts-container');
    if (!currentUser || !testPartsContainer) return;

    try {
        const categoryPrefix = `${category}-test-`;
        // Fetch all scores for the current user to process them client-side.
        const q = query(collection(db, "quizScores"), where("userId", "==", currentUser.uid));
        const userSnapshot = await getDocs(q);

        const latestScores = new Map();

        // Find the most recent score for each test part.
        userSnapshot.forEach(doc => {
            const scoreData = doc.data();
            const quizId = scoreData.quizId;

            // Only consider scores relevant to the current category page.
            if (quizId && quizId.startsWith(categoryPrefix)) {
                const existing = latestScores.get(quizId);
                const newTime = getSafeTimestampMillis(scoreData.timestamp);

                // If no score exists for this quizId yet, or if the new one is more recent, save it.
                if (!existing || newTime > getSafeTimestampMillis(existing.timestamp)) {
                    latestScores.set(quizId, scoreData);
                }
            }
        });

        // Update the UI for each test box on the page.
        testPartsContainer.querySelectorAll('.box[data-quiz-id]').forEach(box => {
            const quizId = box.dataset.quizId;
            if (latestScores.has(quizId)) {
                const scoreData = latestScores.get(quizId);
                const originalLink = box.querySelector('a');
                if (!originalLink) return;

                const partName = box.querySelector('h3')?.textContent || "Test Part";

                // Replace the box content with the score display and action buttons.
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

                // Wire up the "Play Again" button.
                box.querySelector('.retry-btn').onclick = () => {
                    sessionStorage.removeItem(`review_${quizId}`);
                    sessionStorage.removeItem('reviewDataForNextPage');
                    window.location.href = originalLink.href;
                };

                // Wire up the "View Result" button.
                box.querySelector('.review-btn').onclick = () => {
                    // The 'scoreData' here is the latest attempt fetched from Firestore.
                    // It contains all the necessary info (questions, answers) for review.
                    if (scoreData && scoreData.questions && scoreData.userAnswers) {
                        sessionStorage.setItem('reviewDataForNextPage', JSON.stringify(scoreData));
                        sessionStorage.setItem(`review_${quizId}`, 'true');
                        window.location.href = originalLink.href;
                    } else {
                        // This case handles old score documents that might not have the review data.
                        alert('No review data found for this attempt. Please play again.');
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
    // On first load, save the original HTML of each test box. This allows us to easily
    // reset the UI when a user logs out, without a page reload.
    document.querySelectorAll('#test-parts-container .box[data-quiz-id]').forEach(box => {
        if (!box.dataset.originalHtml) {
            box.dataset.originalHtml = box.innerHTML;
        }
    });

    // Main auth listener. Triggers the page logic on initial load and on any login/logout event.
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        initializeTestHub();
    });
});

// ⭐ CRITICAL FIX FOR BROWSER'S BACK BUTTON (BFCache) ⭐
// This event fires when a user navigates back to a page that was in the browser's cache.
// The 'persisted' property is true if the page is from the cache.
// We must re-run our initialization logic to fetch the latest scores from Firestore.
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        console.log("Page loaded from BFCache. Forcing data refresh.");
        initializeTestHub();
    }
});
