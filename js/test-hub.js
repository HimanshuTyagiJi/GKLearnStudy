
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

    const leaderboardSection = document.querySelector('.leaderboard-section');

    if (testCategory === 'all') {
        // --- GLOBAL LEADERBOARD LOGIC ---
        if (!leaderboardSection) return;
        const leaderboardContainer = document.getElementById('leaderboard-container');
        if (!leaderboardContainer) return;
        
        leaderboardSection.style.display = 'block'; // Ensure it's visible
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
            renderLeaderboard(leaderboardData, 'all');
        } catch (error) {
            console.error(`Error loading global leaderboard:`, error);
            if (leaderboardContainer) leaderboardContainer.innerHTML = "<p>The leaderboard could not be loaded. Please try again later.</p>";
        }

    } else {
        // --- CATEGORY PAGE LOGIC ---
        // Hide the leaderboard section entirely as requested.
        if (leaderboardSection) {
            leaderboardSection.style.display = 'none';
        }

        // Only run the user status update logic to show scores in boxes.
        if (currentUser) {
            await updateUserTestStatus(testCategory);
        }
    }
}

function renderLeaderboard(fullLeaderboardData, category) {
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const topCount = 50; // Always top 50 for global leaderboard
    const topScores = fullLeaderboardData.slice(0, topCount);

    if (topScores.length === 0) {
        leaderboardContainer.innerHTML = `<p>No scores have been recorded yet. Be the first to take a test!</p>`;
        return;
    }

    let leaderboardHTML = '<ol class="leaderboard">';
    topScores.forEach((scoreData, index) => {
        const isCurrentUser = currentUser && currentUser.uid === scoreData.userId;
        const displayName = isCurrentUser ? "You" : scoreData.userName;
        const avatar = scoreData.userPhotoURL || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23ddd"/></svg>';
        
        const scoreDisplay = `${scoreData.averagePercentage.toFixed(2)}%`;

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
