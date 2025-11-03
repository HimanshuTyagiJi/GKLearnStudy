// The Firebase services are initialized by comment.js which is loaded before this script.
// We just need to import the functions and get the initialized instances.
import { getApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Get the already initialized instances
const app = getApp();
const auth = getAuth(app);
const db = getFirestore(app);

const leaderboardContainer = document.getElementById('leaderboard-container');
const testPartsContainer = document.getElementById('test-parts-container');
// *** KEY CHANGE: Read the category from the body tag. Falls back to 'all' for test.html ***
const testCategory = document.body.dataset.testCategory || 'all'; 
let currentUser = null;

async function loadPageData() {
    if (!leaderboardContainer) return;

    // The testPartsContainer might not exist on the global test.html page, so we check for it conditionally.
    const isCategoryPage = testCategory !== 'all' && testPartsContainer;

    leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

    try {
        // Fetch all scores once. This is more efficient and avoids complex Firestore indexes.
        const allScoresQuery = query(collection(db, "quizScores"));
        const querySnapshot = await getDocs(allScoresQuery);

        const userAggregates = new Map();

        querySnapshot.forEach((doc) => {
            const scoreData = doc.data();
            
            // *** KEY CHANGE: Dynamically decide whether to include the score based on the page's category ***
            let shouldInclude = false;
            if (testCategory === 'all') { // For the global test.html page
                shouldInclude = true;
            } else { // For specific category pages like hindi-test.html
                const categoryPrefix = `${testCategory}-test-`;
                if (scoreData.quizId && scoreData.quizId.startsWith(categoryPrefix)) {
                    shouldInclude = true;
                }
            }
            
            if (shouldInclude) {
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
            }
        });

        const leaderboardData = Array.from(userAggregates.values()).map(userData => {
            const averagePercentage = userData.totalPossible > 0 ? (userData.totalScore / userData.totalPossible) * 100 : 0;
            return {
                ...userData,
                averagePercentage,
            };
        });
        
        leaderboardData.sort((a, b) => b.averagePercentage - a.averagePercentage);
        
        // On global page, show top 50. On category pages, show top 10.
        renderLeaderboard(leaderboardData.slice(0, testCategory === 'all' ? 50 : 10), leaderboardData);
        
        if (currentUser && isCategoryPage) {
            await updateUserTestStatus();
        }

    } catch (error) {
        console.error(`Error loading page data for category '${testCategory}':`, error);
        leaderboardContainer.innerHTML = "<p>The leaderboard could not be loaded. Please try again later.</p>";
    }
}

function renderLeaderboard(topScores, fullLeaderboardData) {
    if (topScores.length === 0) {
        const message = testCategory === 'all' 
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

    // Show user's own rank if they are logged in and outside the top list on the global page
    let userRankHTML = '';
    if (currentUser && testCategory === 'all') {
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


async function updateUserTestStatus() {
    if (!currentUser || !testPartsContainer || testCategory === 'all') return;
    
    // Query for all of the current user's scores to filter client-side
    const q = query(
        collection(db, "quizScores"), 
        where("userId", "==", currentUser.uid)
    );

    const userSnapshot = await getDocs(q);
    const playedQuizzes = new Map();
    const categoryPrefix = `${testCategory}-test-`;
    
    userSnapshot.forEach(doc => {
        const scoreData = doc.data();
        const quizId = scoreData.quizId;
        // Filter on the client for the current category
        if(quizId && quizId.startsWith(categoryPrefix)) {
            // If a quiz was played multiple times, keep the highest score's data
            if (!playedQuizzes.has(quizId) || scoreData.timestamp.toMillis() > playedQuizzes.get(quizId).timestamp.toMillis()) {
                playedQuizzes.set(quizId, scoreData);
            }
        }
    });

    testPartsContainer.querySelectorAll('.box').forEach(box => {
        const quizId = box.dataset.quizId;
        if (playedQuizzes.has(quizId)) {
            const scoreData = playedQuizzes.get(quizId);
            const originalLink = box.querySelector('a');
            
            const partName = originalLink.textContent;

            box.innerHTML = `
                <div class="user-score-display">
                    <h4>${partName}</h4>
                    <p><strong>Your Score:</strong> ${scoreData.score} / ${scoreData.totalQuestions}</p>
                </div>
                <div class="button-group">
                    <button class="btn retry-btn">Play Again</button>
                    <button class="btn review-btn">View Result</button>
                </div>
            `;
            box.querySelector('.retry-btn').onclick = () => {
                sessionStorage.removeItem(`review_${quizId}`);
                sessionStorage.removeItem(`reviewDataForNextPage`);
                window.location.href = originalLink.href;
            };
            box.querySelector('.review-btn').onclick = () => {
                const scoreDataForReview = playedQuizzes.get(quizId);
                if (scoreDataForReview && scoreDataForReview.questions && scoreDataForReview.userAnswers) {
                    sessionStorage.setItem('reviewDataForNextPage', JSON.stringify(scoreDataForReview));
                    sessionStorage.setItem(`review_${quizId}`, 'true');
                    window.location.href = originalLink.href;
                } else {
                    alert('No review data found. Please play the test again to generate and save a review.');
                }
            };
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        loadPageData();
    });
});
