import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, query, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Use the globally initialized Firebase instances from comment.js
const auth = window.firebaseAuth;
const db = window.firebaseDb;

const leaderboardContainer = document.getElementById('leaderboard-container');
let currentUser = null;

function getSubjectFromQuizId(quizId) {
    if (!quizId) return 'unknown';
    const parts = quizId.split('-');
    return parts[0]; // 'hindi-test-part-01' -> 'hindi'
}

async function loadLeaderboard() {
    if (!leaderboardContainer || !db) {
         if (leaderboardContainer) leaderboardContainer.innerHTML = "<p>Error connecting to services.</p>";
        return;
    }

    leaderboardContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

    try {
        const querySnapshot = await getDocs(collection(db, "quizScores"));
        
        const userScoresBySubject = new Map();
        
        querySnapshot.forEach((doc) => {
            const scoreData = doc.data();
            if (!scoreData.userId || !scoreData.userName) return;

            const subject = getSubjectFromQuizId(scoreData.quizId);

            // Initialize user data if not present
            if (!userScoresBySubject.has(scoreData.userId)) {
                userScoresBySubject.set(scoreData.userId, {
                    userName: scoreData.userName,
                    userPhotoURL: scoreData.userPhotoURL,
                    userId: scoreData.userId,
                    subjects: new Map()
                });
            }
            
            const userData = userScoresBySubject.get(scoreData.userId);

            // Initialize subject data for the user if not present
            if (!userData.subjects.has(subject)) {
                userData.subjects.set(subject, {
                    totalScore: 0,
                    totalPossible: 0,
                    quizCount: 0
                });
            }

            const subjectData = userData.subjects.get(subject);
            subjectData.totalScore += scoreData.score;
            subjectData.totalPossible += scoreData.totalQuestions;
            subjectData.quizCount += 1;
        });

        // --- NEW LEADERBOARD CALCULATION ---
        const leaderboardData = Array.from(userScoresBySubject.values()).map(userData => {
            const subjectAverages = [];
            userData.subjects.forEach(subjectData => {
                if (subjectData.totalPossible > 0) {
                    const subjectAverage = (subjectData.totalScore / subjectData.totalPossible) * 100;
                    subjectAverages.push(subjectAverage);
                }
            });

            let globalAveragePercentage = 0;
            if (subjectAverages.length > 0) {
                const sumOfAverages = subjectAverages.reduce((sum, avg) => sum + avg, 0);
                globalAveragePercentage = sumOfAverages / subjectAverages.length;
            }
            
            return {
                ...userData,
                globalAveragePercentage,
            };
        });

        leaderboardData.sort((a, b) => b.globalAveragePercentage - a.globalAveragePercentage);
        
        renderLeaderboard(leaderboardData);

    } catch (error) {
        console.error("Error loading leaderboard:", error);
        leaderboardContainer.innerHTML = "<p>Leaderboard could not be loaded. Please try again later.</p>";
    }
}

function renderLeaderboard(leaderboardData) {
    const top50 = leaderboardData.slice(0, 50);

    let leaderboardHTML = '<ol class="leaderboard">';
    top50.forEach((user, index) => {
        const isCurrentUser = currentUser && currentUser.uid === user.userId;
        const displayName = isCurrentUser ? "You" : user.userName;
        const avatar = user.userPhotoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.userName)}&background=random`;
        leaderboardHTML += `
            <li class="${isCurrentUser ? 'current-user' : ''}">
                <div class="rank">${index + 1}</div>
                <img src="${avatar}" alt="${user.userName}" class="avatar">
                <div class="name">${displayName}</div>
                <div class="score">${user.globalAveragePercentage.toFixed(2)}%</div>
            </li>
        `;
    });
    leaderboardHTML += '</ol>';

    let userRankHTML = '';
    if (currentUser) {
        const userRankIndex = leaderboardData.findIndex(user => user.userId === currentUser.uid);
        if (userRankIndex !== -1 && userRankIndex >= 50) { // Only show if user is outside top 50
            const userData = leaderboardData[userRankIndex];
            const avatar = userData.userPhotoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.userName)}&background=random`;
            userRankHTML = `
                <div class="user-rank-display">
                    <h2>Your Overall Rank</h2>
                    <ol class="leaderboard">
                        <li class="current-user">
                            <div class="rank">${userRankIndex + 1}</div>
                            <img src="${avatar}" alt="${userData.userName}" class="avatar">
                            <div class="name">You</div>
                            <div class="score">${userData.globalAveragePercentage.toFixed(2)}%</div>
                        </li>
                    </ol>
                </div>
            `;
        }
    }

    leaderboardContainer.innerHTML = leaderboardHTML + userRankHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    // onAuthStateChanged is handled by comment.js which is now the primary auth script.
    // We just need to listen for it here to reload the leaderboard with the correct user highlighted.
    if(auth) {
        onAuthStateChanged(auth, (user) => {
            currentUser = user;
            // The auth container UI is now fully handled by comment.js
            // We just need to re-render our specific leaderboard
            loadLeaderboard();
        });
    } else {
        console.error("Firebase auth is not initialized. Leaderboard cannot function.");
        loadLeaderboard(); // Attempt to load a public leaderboard anyway
    }
});
