

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// --- Configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain: "appcomment.firebaseapp.com",
    projectId: "appcomment",
    storageBucket: "appcomment.firebasestorage.app",
    messagingSenderId: "156258808941",
    appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
};

// --- Firebase Initialization (Robust Singleton) ---
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

// The main function that orchestrates everything for the current page.
async function initializeTestHub() {
    // CRITICAL: Read category from the body tag. This is the reliable source of truth.
    const testCategory = document.body.dataset.testCategory;

    if (!testCategory) {
        console.error("Fatal: 'data-test-category' attribute is missing from the <body> tag.");
        return;
    }

    const leaderboardContainer = document.getElementById('leaderboard-container');
    if (!leaderboardContainer) return;

    const testPartsContainer = document.getElementById('test-parts-container');
    const isCategoryPage = testCategory !== 'all' && testPartsContainer;

    leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

    try {
        let scoresQuery;
        const categoryPrefix = `${testCategory}-test-`;

        // Create the correct Firestore query based on the page's category.
        if (testCategory === 'all') {
            // Global page ('test.html'): fetch all scores.
            scoresQuery = query(collection(db, "quizScores"));
        } else {
            // Category page (e.g., 'hindi-test.html'): fetch only scores for that specific category.
            scoresQuery = query(
                collection(db, "quizScores"),
                where("quizId", ">=", categoryPrefix),
                where("quizId", "<", categoryPrefix + '\uf8ff') 
            );
        }

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
        
        renderLeaderboard(leaderboardData, testCategory);
        
        if (currentUser && isCategoryPage) {
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

async function updateUserTestStatus(category) {
    const testPartsContainer = document.getElementById('test-parts-container');
    if (!currentUser || !testPartsContainer) return;

    const categoryPrefix = `${category}-test-`;
    
    // Fetch user scores, ordered by most recent first.
    const q = query(collection(db, "quizScores"), where("userId", "==", currentUser.uid), orderBy("timestamp", "desc"));
    const userSnapshot = await getDocs(q);
    
    const latestPlayedQuizzes = new Map();
    userSnapshot.forEach(doc => {
        const scoreData = doc.data();
        const quizId = scoreData.quizId;
        // Filter client-side for the current page's category.
        if (quizId && quizId.startsWith(categoryPrefix)) {
            // Since the query is ordered by timestamp descending, the first one we find for a quizId is the latest.
            if (!latestPlayedQuizzes.has(quizId)) {
                // Store the entire score document data.
                latestPlayedQuizzes.set(quizId, scoreData);
            }
        }
    });

    // Update the DOM for each test part.
    testPartsContainer.querySelectorAll('.box').forEach(box => {
        const quizId = box.dataset.quizId;
        if (latestPlayedQuizzes.has(quizId)) {
            const scoreData = latestPlayedQuizzes.get(quizId);
            const originalLink = box.querySelector('a');
            if (!originalLink) return; // Skip if the box is already updated

            const originalHref = originalLink.href;
            const partName = originalLink.textContent;

            box.innerHTML = `
                <div class="user-score-display"><h4>${partName}</h4><p><strong>Your Latest Score:</strong> ${scoreData.score} / ${scoreData.totalQuestions}</p></div>
                <div class="button-group"><button class="btn retry-btn">Play Again</button><button class="btn review-btn">View Result</button></div>
            `;
            box.querySelector('.retry-btn').onclick = () => {
                sessionStorage.removeItem(`review_${quizId}`);
                sessionStorage.removeItem('reviewDataForNextPage');
                window.location.href = originalHref;
            };
            box.querySelector('.review-btn').onclick = () => {
                const scoreDataForReview = latestPlayedQuizzes.get(quizId);
                // Check for the persisted review data in the Firestore document
                if (scoreDataForReview && scoreDataForReview.questions && scoreDataForReview.userAnswers) {
                    sessionStorage.setItem('reviewDataForNextPage', JSON.stringify(scoreDataForReview));
                    sessionStorage.setItem(`review_${quizId}`, 'true');
                    window.location.href = originalHref;
                } else {
                    alert('No review data found for this attempt. Please play the test again to generate a review.');
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
