import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Use the globally initialized Firebase instances from comment.js
const auth = window.firebaseAuth;
const db = window.firebaseDb;

const leaderboardContainer = document.getElementById('leaderboard-container');
const testPartsContainer = document.getElementById('test-parts-container');
let currentUser = null;

async function loadPageData() {
    if (!leaderboardContainer || !testPartsContainer || !db) {
        if (leaderboardContainer) leaderboardContainer.innerHTML = "<p>सेवाओं से कनेक्ट करने में त्रुटि।</p>";
        return;
    };

    leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

    try {
        const q = query(collection(db, "quizScores"));
        const querySnapshot = await getDocs(q);

        const allScores = [];
        querySnapshot.forEach(doc => {
            allScores.push(doc.data());
        });
        
        const hindiScores = allScores.filter(scoreData => 
            scoreData.quizId && scoreData.quizId.startsWith('hindi-test-')
        );
        
        // --- NEW LEADERBOARD LOGIC (AVERAGE PERCENTAGE) ---
        const userAggregates = new Map();
        hindiScores.forEach(score => {
            if (!userAggregates.has(score.userId)) {
                userAggregates.set(score.userId, {
                    userName: score.userName,
                    userPhotoURL: score.userPhotoURL,
                    userId: score.userId,
                    bestScores: new Map() // To store best score for each quiz part
                });
            }
            const user = userAggregates.get(score.userId);
            // If this quiz part is not recorded yet, or the new score is higher, update it
            if (!user.bestScores.has(score.quizId) || score.score > user.bestScores.get(score.quizId).score) {
                user.bestScores.set(score.quizId, { score: score.score, total: score.totalQuestions });
            }
        });

        const leaderboardData = [];
        userAggregates.forEach(user => {
            let totalBestScore = 0;
            let totalPossibleScore = 0;
            user.bestScores.forEach(quiz => {
                totalBestScore += quiz.score;
                totalPossibleScore += quiz.total;
            });
            const averagePercentage = totalPossibleScore > 0 ? (totalBestScore / totalPossibleScore) * 100 : 0;
            leaderboardData.push({ ...user, averagePercentage });
        });
        
        leaderboardData.sort((a, b) => b.averagePercentage - a.averagePercentage);
        
        renderLeaderboard(leaderboardData.slice(0, 10));
        
        if (currentUser) {
            await updateUserTestStatus();
        }

    } catch (error) {
        console.error("Error loading page data:", error);
        leaderboardContainer.innerHTML = "<p>लीडरबोर्ड लोड नहीं हो सका। कृपया बाद में पुनः प्रयास करें।</p>";
    }
}

function renderLeaderboard(leaderboardData) {
    if (leaderboardData.length === 0) {
        leaderboardContainer.innerHTML = "<p>इस श्रेणी में कोई स्कोर दर्ज नहीं किया गया है।</p>";
        return;
    }

    let leaderboardHTML = '<ol class="leaderboard">';
    leaderboardData.forEach((user, index) => {
        const isCurrentUser = currentUser && currentUser.uid === user.userId;
        const displayName = isCurrentUser ? "You" : user.userName;
        leaderboardHTML += `
            <li class="${isCurrentUser ? 'current-user' : ''}">
                <div class="rank">${index + 1}</div>
                <img src="${user.userPhotoURL}" alt="${user.userName}" class="avatar">
                <div class="name">${displayName}</div>
                <div class="score">${user.averagePercentage.toFixed(2)}%</div>
            </li>
        `;
    });
    leaderboardHTML += '</ol>';
    leaderboardContainer.innerHTML = leaderboardHTML;
}

async function updateUserTestStatus() {
    if (!currentUser || !db) return;
    
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
            // Store only the HIGHEST score for each quiz part
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
            
            box.innerHTML = `
                <h3>${originalLink.textContent.replace(' (Coming Soon)', '')}</h3>
                <div class="user-score-display">
                    <h4>Your Best Score: ${scoreData.score} / ${scoreData.totalQuestions}</h4>
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
                const reviewData = {
                    questions: window.questions, 
                    userAnswers: {} 
                };
                sessionStorage.setItem(`reviewData_${quizId}`, JSON.stringify(reviewData));
                sessionStorage.setItem(`review_${quizId}`, 'true');
                window.location.href = originalLink.href;
            };
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    if (auth) {
        onAuthStateChanged(auth, (user) => {
            currentUser = user;
            loadPageData();
        });
    } else {
        console.error("Firebase auth is not initialized. Leaderboard cannot function.");
        if (leaderboardContainer) leaderboardContainer.innerHTML = "<p>सेवाओं से कनेक्ट करने में त्रुटि।</p>";
    }
});
