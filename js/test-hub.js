
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
    if (!leaderboardContainer) return;

    const testPartsContainer = document.getElementById('test-parts-container');
    const isCategoryPage = testCategory !== 'all' && testPartsContainer;

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
        
        // Find the single LATEST score for each user within the category.
        const userLatestScores = new Map();
        querySnapshot.forEach((doc) => {
            const scoreData = doc.data();
            if (!scoreData.userId || !scoreData.userName || !scoreData.timestamp) return;

            // If we haven't seen this user, or if the current score is newer than the one stored, update it.
            if (!userLatestScores.has(scoreData.userId) || scoreData.timestamp.toMillis() > userLatestScores.get(scoreData.userId).timestamp.toMillis()) {
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

    const categoryPrefix = `${category}-test-`;
    
    // Query for all user scores without ordering to avoid index requirement.
    const q = query(collection(db, "quizScores"), where("userId", "==", currentUser.uid));
    const userSnapshot = await getDocs(q);
    
    const userScores = [];
    userSnapshot.forEach(doc => userScores.push(doc.data()));

    // Group scores by quizId on the client-side.
    const scoresByQuiz = userScores
        .filter(score => score.quizId && score.quizId.startsWith(categoryPrefix) && score.timestamp)
        .reduce((acc, score) => {
            if (!acc[score.quizId]) {
                acc[score.quizId] = [];
            }
            acc[score.quizId].push(score);
            return acc;
        }, {});

    const latestPlayedQuizzes = new Map();
    // For each quiz the user played in this category, find the latest score by sorting.
    for (const quizId in scoresByQuiz) {
        const scores = scoresByQuiz[quizId];
        if (scores.length > 0) {
            scores.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
            latestPlayedQuizzes.set(quizId, scores[0]);
        }
    }

    testPartsContainer.querySelectorAll('.box').forEach(box => {
        const quizId = box.dataset.quizId;
        if (latestPlayedQuizzes.has(quizId)) {
            const scoreData = latestPlayedQuizzes.get(quizId);
            const originalLink = box.querySelector('a');
            if (!originalLink) return;

            const originalHref = originalLink.href;
            const partNameMatch = originalLink.textContent.match(/.*(भाग \d+|Part \d+)/);
            const partName = partNameMatch ? partNameMatch[0] : box.querySelector('h3').textContent;


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
