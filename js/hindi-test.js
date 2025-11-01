import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain: "appcomment.firebaseapp.com",
    projectId: "appcomment",
    storageBucket: "appcomment.firebasestorage.app",
    messagingSenderId: "156258808941",
    appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const leaderboardContainer = document.getElementById('leaderboard-container');
const testPartsContainer = document.getElementById('test-parts-container');
let currentUser = null;

async function loadPageData() {
    if (!leaderboardContainer || !testPartsContainer) return;

    leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

    try {
        // Fetch all scores for Hindi tests, ordered by score.
        // NOTE: This query requires a composite index in Firestore. 
        // The user must create it using the link provided in the console error.
        const q = query(
            collection(db, "quizScores"),
            where("quizId", ">=", "hindi-test-"),
            where("quizId", "<", "hindi-test-~"),
            orderBy("score", "desc")
        );
        const querySnapshot = await getDocs(q);

        const userBestScores = new Map();
        querySnapshot.forEach((doc) => {
            const scoreData = doc.data();
            // Store only the best score for each user for the leaderboard
            if (!userBestScores.has(scoreData.userId) || scoreData.score > userBestScores.get(scoreData.userId).score) {
                userBestScores.set(scoreData.userId, scoreData);
            }
        });

        const topScores = Array.from(userBestScores.values())
            .sort((a, b) => b.score - a.score) // Re-sort as the map doesn't preserve order
            .slice(0, 10);

        renderLeaderboard(topScores);
        
        if (currentUser) {
            await updateUserTestStatus();
        }

    } catch (error) {
        console.error("Error loading page data:", error);
        leaderboardContainer.innerHTML = "<p>लीडरबोर्ड लोड नहीं हो सका। कृपया बाद में पुनः प्रयास करें।</p>";
    }
}

function renderLeaderboard(topScores) {
    if (topScores.length === 0) {
        leaderboardContainer.innerHTML = "<p>इस श्रेणी में कोई स्कोर दर्ज नहीं किया गया है।</p>";
        return;
    }

    let leaderboardHTML = '<ol class="leaderboard">';
    topScores.forEach((score, index) => {
        const isCurrentUser = currentUser && currentUser.uid === score.userId;
        const displayName = isCurrentUser ? "You" : score.userName;
        leaderboardHTML += `
            <li class="${isCurrentUser ? 'current-user' : ''}">
                <div class="rank">${index + 1}</div>
                <img src="${score.userPhotoURL}" alt="${score.userName}" class="avatar">
                <div class="name">${displayName}</div>
                <div class="score">${score.score} / ${score.totalQuestions}</div>
            </li>
        `;
    });
    leaderboardHTML += '</ol>';
    leaderboardContainer.innerHTML = leaderboardHTML;
}

async function updateUserTestStatus() {
    if (!currentUser) return;
    
    const q = query(
        collection(db, "quizScores"), 
        where("userId", "==", currentUser.uid)
    );

    const userSnapshot = await getDocs(q);
    const playedQuizzes = new Map();
    userSnapshot.forEach(doc => {
        const scoreData = doc.data();
        const quizId = scoreData.quizId;
        if(quizId && quizId.startsWith('hindi-test-')) {
            // If we haven't seen this quiz, or the new score is higher, update it
            if (!playedQuizzes.has(quizId) || scoreData.score > playedQuizzes.get(quizId).score) {
                playedQuizzes.set(quizId, scoreData);
            }
        }
    });

    testPartsContainer.querySelectorAll('.box').forEach(box => {
        const quizId = box.dataset.quizId;
        if (playedQuizzes.has(quizId)) {
            const scoreData = playedQuizzes.get(quizId);
            const originalLink = box.querySelector('a'); // Get href before overwriting
            
            box.innerHTML = `
                <div class="user-score-display">
                    <h4>Your Score: ${scoreData.score} / ${scoreData.totalQuestions}</h4>
                </div>
                <div class="button-group">
                    <button class="btn retry-btn">Play Again</button>
                    <button class="btn review-btn">View Result</button>
                </div>
            `;
            box.querySelector('.retry-btn').onclick = () => {
                sessionStorage.removeItem(`review_${quizId}`);
                sessionStorage.removeItem(`reviewData_${quizId}`);
                window.location.href = originalLink.href;
            };
            box.querySelector('.review-btn').onclick = () => {
                sessionStorage.setItem(`review_${quizId}`, 'true');
                window.location.href = originalLink.href;
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
