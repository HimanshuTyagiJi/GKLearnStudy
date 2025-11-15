
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

// The main function that orchestrates everything for the current page.
async function initializeTestHub() {
    const testCategory = document.body.dataset.testCategory;
    if (!testCategory) {
        console.error("Fatal: 'data-test-category' attribute is missing from the <body> tag.");
        return;
    }

    const leaderboardContainer = document.getElementById('leaderboard-container');
    if (!leaderboardContainer) return;

    leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

    try {
        let scoresQuery;
        if (testCategory === 'all') {
            scoresQuery = query(collection(db, "quizScores"));
        } else {
            const categoryPrefix = `${testCategory}-test-`;
            scoresQuery = query(
                collection(db, "quizScores"),
                where("quizId", ">=", categoryPrefix),
                where("quizId", "<", categoryPrefix + '\uf8ff')
            );
        }

        const querySnapshot = await getDocs(scoresQuery);
        let leaderboardData;

        if (testCategory === 'all') {
            // GLOBAL PAGE ('test.html'): Calculate average score for leaderboard.
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

            leaderboardData = Array.from(userAggregates.values()).map(userData => ({
                ...userData,
                averagePercentage: userData.totalPossible > 0 ? (userData.totalScore / userData.totalPossible) * 100 : 0,
            }));
            
            leaderboardData.sort((a, b) => b.averagePercentage - a.averagePercentage);
        } else {
            // CATEGORY PAGE (e.g., 'hindi-test.html'): Find latest score for leaderboard.
            const userLatestScores = new Map();
            querySnapshot.forEach((doc) => {
                const scoreData = doc.data();
                if (!scoreData.userId || !scoreData.userName || !scoreData.timestamp) return;

                const existing = userLatestScores.get(scoreData.userId);
                if (!existing || scoreData.timestamp.toMillis() > existing.timestamp.toMillis()) {
                    userLatestScores.set(scoreData.userId, scoreData);
                }
            });
            
            leaderboardData = Array.from(userLatestScores.values());
            
            // Sort by the percentage of that single latest score for ranking fairness
            leaderboardData.sort((a, b) => {
                const percA = a.totalQuestions > 0 ? (a.score / a.totalQuestions) : 0;
                const percB = b.totalQuestions > 0 ? (b.score / b.totalQuestions) : 0;
                return percB - percA;
            });
        }
        
        renderLeaderboard(leaderboardData, testCategory);
        
        if (currentUser && testCategory !== 'all') {
            await updateUserTestStatus(testCategory);
        }

    } catch (error) {
        console.error(`Error loading page data for category '${testCategory}':`, error);
        leaderboardContainer.innerHTML = "<p>The leaderboard could not be loaded. Please try again later.</p>";
    }
}

function renderLeaderboard(fullLeaderboardData, category) {
    const leaderboardContainer = document.getElementById('leaderboard-container');
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
        
        // Conditional score display based on the page type
        const scoreDisplay = category === 'all'
            ? `${scoreData.averagePercentage.toFixed(2)}%`
            : `${scoreData.score} / ${scoreData.totalQuestions}`;

        leaderboardHTML += `
            <li class="${isCurrentUser ? 'current-user' : ''}">
                <div class="rank">${index + 1}</div>
                <img src="${avatar}" alt="${scoreData.userName}" class="avatar">
                <div class="name">${displayName}</div>
                <div class="score">${scoreDisplay}</div>
            </li>
        `;
    });
    leaderboardHTML += '</ol>';

    let userRankHTML = '';
    // User's own rank display only appears on the global page
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

async function updateUserTestStatus(category) {
    const testPartsContainer = document.getElementById('test-parts-container');
    if (!currentUser || !testPartsContainer) return;

    const categoryPrefix = `${category}-test-`;
    
    // Fetch all scores for the current user to find their latest attempt for each test part.
    const q = query(collection(db, "quizScores"), where("userId", "==", currentUser.uid));
    const userSnapshot = await getDocs(q);
    
    const latestScoresForParts = new Map();
    userSnapshot.forEach(doc => {
        const scoreData = doc.data();
        const quizId = scoreData.quizId;
        
        // Filter for the current page's category.
        if (quizId && quizId.startsWith(categoryPrefix) && scoreData.timestamp) {
            const existing = latestScoresForParts.get(quizId);
            if (!existing || scoreData.timestamp.toMillis() > existing.timestamp.toMillis()) {
                latestScoresForParts.set(quizId, scoreData);
            }
        }
    });

    // Update the DOM with the latest score for each part.
    testPartsContainer.querySelectorAll('.box').forEach(box => {
        const quizId = box.dataset.quizId;
        if (latestScoresForParts.has(quizId)) {
            const scoreData = latestScoresForParts.get(quizId);
            const originalLink = box.querySelector('a');
            if (!originalLink) return; // Skip if the box has already been modified or has no link.

            const partName = box.querySelector('h3')?.textContent || originalLink.textContent;

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
                // The scoreData from the query contains the full review data saved by test.js
                if (scoreData && scoreData.questions && scoreData.userAnswers) {
                    sessionStorage.setItem('reviewDataForNextPage', JSON.stringify(scoreData));
                    sessionStorage.setItem(`review_${quizId}`, 'true');
                    window.location.href = originalLink.href;
                } else {
                    alert('No review data found for this attempt. This may be an older test. Please play again to generate a review.');
                }
            };
        }
    });
}

// Entry point: Listen for auth changes and re-initialize the page.
document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        initializeTestHub();
    });
});
