
import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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

// The main function that fetches data and updates the UI.
async function initializeTestHub() {
    const testCategory = document.body.dataset.testCategory;
    if (!testCategory) {
        console.error("Fatal: 'data-test-category' attribute is missing from the <body> tag.");
        return;
    }

    const leaderboardSection = document.querySelector('.leaderboard-section');
    const isGlobalPage = testCategory === 'all';

    // Conditionally show or hide the leaderboard section based on the page type.
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
            querySnapshot.forEach((doc) => {
                const scoreData = doc.data();
                if (!scoreData.userId || !scoreData.userName) return;

                if (!userAggregates.has(scoreData.userId)) {
                    userAggregates.set(scoreData.userId, {
                        totalScore: 0, totalPossible: 0,
                        userName: scoreData.userName, userPhotoURL: scoreData.userPhotoURL, userId: scoreData.userId,
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
            if(leaderboardContainer) leaderboardContainer.innerHTML = "<p>The leaderboard could not be loaded.</p>";
        }
    } else { // This is a category page
        // The updateUserTestStatus function will handle both logged-in and logged-out states.
        await updateUserTestStatus(testCategory);
    }
}

// Renders the global leaderboard (only used on test.html).
function renderLeaderboard(fullLeaderboardData) {
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const top50 = fullLeaderboardData.slice(0, 50);

    if (top50.length === 0) {
        leaderboardContainer.innerHTML = `<p>No scores have been recorded yet. Be the first to take a test!</p>`;
        return;
    }

    let leaderboardHTML = '<ol class="leaderboard">';
    top50.forEach((scoreData, index) => {
        const isCurrentUser = currentUser && currentUser.uid === scoreData.userId;
        const displayName = isCurrentUser ? "You" : scoreData.userName;
        const avatar = scoreData.userPhotoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
        
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
    if (currentUser) {
        const userRankIndex = fullLeaderboardData.findIndex(user => user.userId === currentUser.uid);
        if (userRankIndex !== -1 && userRankIndex >= top50.length) {
            const userData = fullLeaderboardData[userRankIndex];
            const avatar = userData.userPhotoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.userName)}&background=random`;
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

// Fetches the user's latest scores for a category and updates the test part boxes.
async function updateUserTestStatus(category) {
    const testPartsContainer = document.getElementById('test-parts-container');
    if (!testPartsContainer) return;

    // First, reset all test boxes to their initial HTML state to handle logout or prepare for fresh data.
    testPartsContainer.querySelectorAll('.box[data-quiz-id]').forEach(box => {
        const partName = box.querySelector('h3')?.textContent || `Test Part`;
        const description = box.querySelector('p')?.textContent || `Test your knowledge.`;
        const originalLinkHref = box.querySelector('a')?.href || '#';
        const isComingSoon = box.classList.contains('disabled');
        const iconNumber = box.querySelector('.icon')?.textContent || '?';

        if (isComingSoon) {
            box.innerHTML = `
                <div class="coming-soon-badge">Soon</div>
                <div class="icon">${iconNumber}</div>
                <h3>${partName}</h3>
                <p>${description}</p>
                <a href="#" class="btn-start-test" onclick="event.preventDefault();">Coming Soon</a>
            `;
        } else {
            box.innerHTML = `
                <div class="icon">${iconNumber}</div>
                <h3>${partName}</h3>
                <p>${description}</p>
                <a href="${originalLinkHref}" class="btn-start-test">Start Test</a>
            `;
        }
    });

    // If the user is not logged in, we stop here. The boxes are now in their default state.
    if (!currentUser) return;

    const categoryPrefix = `${category}-test-`;
    
    // ⭐ EFFICIENT QUERY: Order by timestamp descending to get the newest scores first.
    const q = query(
        collection(db, "quizScores"), 
        where("userId", "==", currentUser.uid),
        orderBy("timestamp", "desc")
    );
    
    const userSnapshot = await getDocs(q);
    
    const latestScoresForParts = new Map();

    userSnapshot.forEach(doc => {
        const scoreData = doc.data();
        const quizId = scoreData.quizId;
        
        // Since results are ordered by newest first, the first one we see for each quizId IS the latest one.
        // We only add it to the map if it's not already there.
        if (quizId && quizId.startsWith(categoryPrefix) && !latestScoresForParts.has(quizId)) {
            latestScoresForParts.set(quizId, scoreData);
        }
    });

    // Update the DOM again, this time with the user's latest score.
    testPartsContainer.querySelectorAll('.box[data-quiz-id]').forEach(box => {
        const quizId = box.dataset.quizId;
        const originalLinkHref = box.querySelector('a')?.href; // Get href again from the reset HTML
        
        if (latestScoresForParts.has(quizId) && originalLinkHref) {
            const scoreData = latestScoresForParts.get(quizId);
            const partName = box.querySelector('h3')?.textContent;

            box.innerHTML = `
                <div class="user-score-display"><h4>${partName}</h4><p><strong>Your Latest Score:</strong> ${scoreData.score} / ${scoreData.totalQuestions}</p></div>
                <div class="button-group"><button class="btn retry-btn">Play Again</button><button class="btn review-btn">View Result</button></div>
            `;
            box.querySelector('.retry-btn').onclick = () => {
                // Clear any review state before retrying
                sessionStorage.removeItem(`review_${quizId}`);
                sessionStorage.removeItem('reviewDataForNextPage');
                window.location.href = originalLinkHref;
            };
            box.querySelector('.review-btn').onclick = () => {
                // The scoreData from our query contains the full review data saved by test.js
                if (scoreData && scoreData.questions && scoreData.userAnswers) {
                    sessionStorage.setItem('reviewDataForNextPage', JSON.stringify(scoreData));
                    sessionStorage.setItem(`review_${quizId}`, 'true');
                    window.location.href = originalLinkHref;
                } else {
                    alert('No review data found for this attempt. Please play again to generate a review.');
                }
            };
        }
    });
}

// --- ENTRY POINT LOGIC ---

// Handles initial page load
document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        initializeTestHub();
    });
});

// Handles navigation back to the page (e.g., using the browser's back button)
window.addEventListener('pageshow', (event) => {
    // event.persisted is true if the page is from the bfcache (Back-Forward Cache)
    if (event.persisted) {
        console.log("Page restored from bfcache. Re-fetching latest scores.");
        // Re-run the main logic to get fresh data from Firestore and update the UI
        initializeTestHub();
    }
});
