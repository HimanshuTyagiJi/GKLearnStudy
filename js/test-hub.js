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
const testCategory = document.body.dataset.testCategory; // e.g., 'hindi', 'history'
let currentUser = null;

async function loadPageData() {
    if (!leaderboardContainer || !testPartsContainer || !testCategory) {
        console.error("Required elements or data-test-category attribute is missing.");
        if (leaderboardContainer) leaderboardContainer.innerHTML = "<p>Page configuration error.</p>";
        return;
    }

    leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

    try {
        const categoryPrefix = `${testCategory}-test-`;
        // Fetch all scores and filter on the client to avoid needing a specific index.
        const allScoresQuery = query(collection(db, "quizScores"));
        const querySnapshot = await getDocs(allScoresQuery);

        const userAggregates = new Map();
        querySnapshot.forEach((doc) => {
            const scoreData = doc.data();
            // Client-side filtering for the specific category
            if (scoreData.quizId && scoreData.quizId.startsWith(categoryPrefix)) {
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
        
        renderLeaderboard(leaderboardData.slice(0, 10));
        
        if (currentUser) {
            await updateUserTestStatus();
        }

    } catch (error) {
        console.error(`Error loading page data:`, error);
        leaderboardContainer.innerHTML = "<p>The leaderboard could not be loaded. Please try again later.</p>";
    }
}

function renderLeaderboard(topScores) {
    if (topScores.length === 0) {
        leaderboardContainer.innerHTML = "<p>No scores have been recorded in this category yet.</p>";
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
    leaderboardContainer.innerHTML = leaderboardHTML;
}

async function updateUserTestStatus() {
    if (!currentUser) return;
    
    const categoryPrefix = `${testCategory}-test-`;
    // Query for all of the current user's scores to filter client-side
    const q = query(
        collection(db, "quizScores"), 
        where("userId", "==", currentUser.uid)
    );

    const userSnapshot = await getDocs(q);
    const playedQuizzes = new Map();
    
    userSnapshot.forEach(doc => {
        const scoreData = doc.data();
        const quizId = scoreData.quizId;
        // Filter on the client for the current category
        if(quizId && quizId.startsWith(categoryPrefix)) {
            // If a quiz was played multiple times, keep the highest score
            if (!playedQuizzes.has(quizId) || scoreData.score > playedQuizzes.get(quizId).score) {
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
