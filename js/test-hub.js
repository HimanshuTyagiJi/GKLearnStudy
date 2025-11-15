

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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
    const testCategory = document.body.dataset.testCategory;
    if (!testCategory) {
        console.error("Fatal: 'data-test-category' attribute is missing from the <body> tag.");
        return;
    }

    const leaderboardContainer = document.getElementById('leaderboard-container');
    const testPartsContainer = document.getElementById('test-parts-container');
    const isCategoryPage = testCategory !== 'all' && testPartsContainer;

    if (leaderboardContainer) {
        leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';
    }

    try {
        // Single, efficient query for the current page context
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

        // Process all fetched scores in one loop
        const userLatestScores = new Map(); // For leaderboard (latest score of any test in this context)
        const userLatestTestScores = new Map(); // For user's score boxes on category pages (latest score for each specific test)

        querySnapshot.forEach((doc) => {
            const scoreData = doc.data();
            if (!scoreData.userId || !scoreData.userName || !scoreData.timestamp) return;

            // 1. Update the latest score for each user for the leaderboard
            const existingLatest = userLatestScores.get(scoreData.userId);
            if (!existingLatest || scoreData.timestamp.toMillis() > existingLatest.timestamp.toMillis()) {
                userLatestScores.set(scoreData.userId, scoreData);
            }
            
            // 2. If on a category page, find the latest score for the current user for each specific test
            if (isCategoryPage && currentUser && scoreData.userId === currentUser.uid) {
                const existingTestScore = userLatestTestScores.get(scoreData.quizId);
                if (!existingTestScore || scoreData.timestamp.toMillis() > existingTestScore.timestamp.toMillis()) {
                    userLatestTestScores.set(scoreData.quizId, scoreData);
                }
            }
        });
        
        // --- Leaderboard Logic ---
        if (leaderboardContainer) {
            const leaderboardData = Array.from(userLatestScores.values()).map(latestScore => ({
                ...latestScore,
                percentage: latestScore.totalQuestions > 0 ? (latestScore.score / latestScore.totalQuestions) * 100 : 0,
            }));
            
            leaderboardData.sort((a, b) => b.percentage - a.percentage);
            renderLeaderboard(leaderboardData, testCategory);
        }
        
        // --- User Test Status Logic ---
        if (isCategoryPage && currentUser) {
            updateUserTestStatusDOM(userLatestTestScores);
        }

    } catch (error) {
        console.error(`Error loading page data for category '${testCategory}':`, error);
        if (leaderboardContainer) {
            leaderboardContainer.innerHTML = "<p>The leaderboard could not be loaded. Please try again later.</p>";
        }
    }
}

function renderLeaderboard(fullLeaderboardData, category) {
    const leaderboardContainer = document.getElementById('leaderboard-container');
    if (!leaderboardContainer) return;
    const topCount = (category === 'all') ? 50 : 10;
    const topScores = fullLeaderboardData.slice(0, topCount);

    if (topScores.length === 0) {
        leaderboardContainer.innerHTML = `<p>${category === 'all' ? "No scores have been recorded yet. Be the first to take a test!" : "No scores have been recorded in this category yet."}</p>`;
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
                <div class="score">${scoreData.percentage.toFixed(2)}%</div>
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
                    <ol class="leaderboard"><li class="current-user"><div class="rank">${userRankIndex + 1}</div><img src="${avatar}" alt="${userData.userName}" class="avatar"><div class="name">You</div><div class="score">${userData.percentage.toFixed(2)}%</div></li></ol>
                </div>
            `;
        }
    }
    
    leaderboardContainer.innerHTML = leaderboardHTML + userRankHTML;
}

// This function only updates the DOM, it doesn't fetch data.
function updateUserTestStatusDOM(playedQuizzes) {
    const testPartsContainer = document.getElementById('test-parts-container');
    if (!testPartsContainer) return;

    testPartsContainer.querySelectorAll('.box').forEach(box => {
        const quizId = box.dataset.quizId;
        if (playedQuizzes.has(quizId)) {
            const scoreData = playedQuizzes.get(quizId);
            const originalLink = box.querySelector('a');
            if (!originalLink) return;

            const originalHref = originalLink.href;
            const partName = box.querySelector('h3').textContent;

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
                // The `scoreData` we have from the initial query contains the review data saved by test.js
                if (scoreData && scoreData.questions && scoreData.userAnswers) {
                    sessionStorage.setItem('reviewDataForNextPage', JSON.stringify(scoreData));
                    sessionStorage.setItem(`review_${quizId}`, 'true');
                    window.location.href = originalHref;
                } else {
                    alert('No review data found for this attempt. This might be an older test. Please play again to generate a review.');
                }
            };
        }
    });
}

// Entry point
document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        initializeTestHub(); // Re-run everything when auth state changes
    });
});

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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

        if (testCategory === 'all') {
            // Global page ('test.html'): fetch all scores, ordered by timestamp to efficiently find the latest.
            scoresQuery = query(collection(db, "quizScores"), orderBy("timestamp", "desc"));
        } else {
            // Category page (e.g., 'hindi-test.html'): fetch only scores for that specific category.
            scoresQuery = query(
                collection(db, "quizScores"),
                where("quizId", ">=", categoryPrefix),
                where("quizId", "<", categoryPrefix + '\uf8ff'),
                orderBy("quizId"), // Order by quizId first to satisfy Firestore query constraints
                orderBy("timestamp", "desc") // Then order by timestamp to get the latest first
            );
        }

        const querySnapshot = await getDocs(scoresQuery);
        
        // This map will store the single LATEST score for each user.
        const userLatestScores = new Map();
        querySnapshot.forEach((doc) => {
            const scoreData = doc.data();
            // Since the query is ordered by timestamp descending, the first score we see for a user is their latest one.
            if (scoreData.userId && !userLatestScores.has(scoreData.userId)) {
                userLatestScores.set(scoreData.userId, scoreData);
            }
        });

        // Map the latest scores to the format needed for the leaderboard.
        const leaderboardData = Array.from(userLatestScores.values()).map(latestScore => ({
            userId: latestScore.userId,
            userName: latestScore.userName,
            userPhotoURL: latestScore.userPhotoURL,
            // Calculate percentage from that single latest score for ranking.
            percentage: latestScore.totalQuestions > 0 ? (latestScore.score / latestScore.totalQuestions) * 100 : 0,
        }));
        
        leaderboardData.sort((a, b) => b.percentage - a.percentage);
        
        renderLeaderboard(leaderboardData, testCategory);
        
        if (currentUser && isCategoryPage) {
            await updateUserTestStatus(testCategory);
        }

    } catch (error) {
        console.error(`Error loading page data for category '${testCategory}':`, error);
        // Provide a user-friendly error, which might include the Firestore index creation link from the error message.
        let errorMessage = "The leaderboard could not be loaded. Please try again later.";
        if (error.message && error.message.includes('indexes?create_composite=')) {
            errorMessage = `A database index is required. Please ask the site administrator to create it using the link in the developer console. Error: ${error.message}`;
        }
        leaderboardContainer.innerHTML = `<p style="color: var(--danger-color);">${errorMessage}</p>`;
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
                <div class="score">${scoreData.percentage.toFixed(2)}%</div>
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
                    <ol class="leaderboard"><li class="current-user"><div class="rank">${userRankIndex + 1}</div><img src="${avatar}" alt="${userData.userName}" class="avatar"><div class="name">You</div><div class="score">${userData.percentage.toFixed(2)}%</div></li></ol>
                </div>
            `;
        }
    }
    
    leaderboardContainer.innerHTML = leaderboardHTML + userRankHTML;
}

async function updateUserTestStatus(category) {
    const testPartsContainer = document.getElementById('test-parts-container');
    if (!currentUser || !testPartsContainer) return;

    // This query fetches only the scores for the current user and current category, ordered by time.
    // It requires a composite index, but is far more efficient than fetching all user scores.
    // Firestore will provide a link in the console to create this index if it doesn't exist.
    const q = query(
        collection(db, "quizScores"), 
        where("userId", "==", currentUser.uid),
        where("quizId", ">=", `${category}-test-`),
        where("quizId", "<", `${category}-test-\uf8ff`),
        orderBy("quizId"),
        orderBy("timestamp", "desc")
    );
    const userSnapshot = await getDocs(q);
    
    // Since the query is ordered by timestamp desc, the first one we find for each quizId is the latest.
    const latestPlayedQuizzes = new Map();
    userSnapshot.forEach(doc => {
        const scoreData = doc.data();
        if (scoreData.quizId && !latestPlayedQuizzes.has(scoreData.quizId)) {
            latestPlayedQuizzes.set(scoreData.quizId, scoreData);
        }
    });

    testPartsContainer.querySelectorAll('.box').forEach(box => {
        const quizId = box.dataset.quizId;
        if (latestPlayedQuizzes.has(quizId)) {
            const scoreData = latestPlayedQuizzes.get(quizId);
            const originalLink = box.querySelector('a');
            if (!originalLink) return;

            const originalHref = originalLink.href;
            const partName = box.querySelector('h3').textContent;

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
