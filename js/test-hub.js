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

// --- Firebase Initialization ---
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

// ---------------------------------------------------
// MAIN FUNCTION
// ---------------------------------------------------
async function initializeTestHub() {

    const testCategory = document.body.dataset.testCategory;
    if (!testCategory) {
        console.error("Fatal: <body data-test-category='?'> missing");
        return;
    }

    const leaderboardContainer = document.getElementById("leaderboard-container");
    const testPartsContainer = document.getElementById("test-parts-container");
    const isCategoryPage = testCategory !== "all" && testPartsContainer;

    if (leaderboardContainer) {
        leaderboardContainer.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;
    }

    try {
        // ------------------------------
        // FIRESTORE QUERY
        // ------------------------------
        let scoresQuery;

        if (testCategory === "all") {
            scoresQuery = query(collection(db, "quizScores"));
        } else {
            const prefix = `${testCategory}-test-`;
            scoresQuery = query(
                collection(db, "quizScores"),
                where("quizId", ">=", prefix),
                where("quizId", "<", prefix + "\uf8ff")
            );
        }

        const querySnapshot = await getDocs(scoresQuery);

        // Maps to store latest scores
        const userLatestScores = new Map();
        const userLatestTestScores = new Map();

        querySnapshot.forEach(doc => {
            const data = doc.data();

            console.log("Score Doc:", data); // DEBUG — helpful

            // Validate important fields
            if (!data.userId || !data.timestamp) return;

            // Fix type issues
            data.score = Number(data.score || 0);
            data.totalQuestions = Number(data.totalQuestions || 0);

            // Convert timestamp if needed
            if (typeof data.timestamp === "string") {
                data.timestamp = new Date(data.timestamp);
                data.timestamp = { toMillis: () => data.timestamp.getTime() };
            }

            // ------------------------------
            // 1. LATEST SCORE PER USER
            // ------------------------------
            const existing = userLatestScores.get(data.userId);

            if (!existing || data.timestamp.toMillis() > existing.timestamp.toMillis()) {
                userLatestScores.set(data.userId, data);
            }

            // ------------------------------
            // 2. USER SPECIFIC TEST SCORES
            // ------------------------------
            if (isCategoryPage && currentUser && data.userId === currentUser.uid) {
                const old = userLatestTestScores.get(data.quizId);

                if (!old || data.timestamp.toMillis() > old.timestamp.toMillis()) {
                    userLatestTestScores.set(data.quizId, data);
                }
            }
        });

        // ------------------------------
        // RENDER LEADERBOARD
        // ------------------------------
        if (leaderboardContainer) {
            const fullLeaderboardData = Array.from(userLatestScores.values()).map(s => ({
                ...s,
                percentage: (s.totalQuestions > 0)
                    ? (s.score / s.totalQuestions) * 100
                    : 0
            }));

            fullLeaderboardData.sort((a, b) => b.percentage - a.percentage);

            renderLeaderboard(fullLeaderboardData, testCategory);
        }

        // ------------------------------
        // USER TEST STATUS
        // ------------------------------
        if (isCategoryPage && currentUser) {
            updateUserTestStatusDOM(userLatestTestScores);
        }

    } catch (err) {
        console.error("ERROR:", err);
        if (leaderboardContainer) {
            leaderboardContainer.innerHTML = "<p>Error loading leaderboard.</p>";
        }
    }
}

// ---------------------------------------------------
// LEADERBOARD RENDER
// ---------------------------------------------------
function renderLeaderboard(leaderboard, category) {
    const container = document.getElementById("leaderboard-container");
    if (!container) return;

    const topLimit = category === "all" ? 50 : 10;
    const topScores = leaderboard.slice(0, topLimit);

    if (topScores.length === 0) {
        container.innerHTML = "<p>No scores yet.</p>";
        return;
    }

    let html = `<ol class="leaderboard">`;

    topScores.forEach((s, i) => {
        const isSelf = currentUser && currentUser.uid === s.userId;
        const name = isSelf ? "You" : s.userName || "User";
        const avatar = s.userPhotoURL || "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23ddd'/></svg>";

        html += `
            <li class="${isSelf ? 'current-user' : ''}">
                <div class="rank">${i + 1}</div>
                <img src="${avatar}" class="avatar">
                <div class="name">${name}</div>
                <div class="score">${s.percentage.toFixed(2)}%</div>
            </li>`;
    });

    html += `</ol>`;

    container.innerHTML = html;
}

// ---------------------------------------------------
// CATEGORY PAGE — USER TEST BOXES
// ---------------------------------------------------
function updateUserTestStatusDOM(latestScores) {
    const container = document.getElementById("test-parts-container");
    if (!container) return;

    container.querySelectorAll(".box").forEach(box => {
        const quizId = box.dataset.quizId;

        if (latestScores.has(quizId)) {
            const s = latestScores.get(quizId);
            const link = box.querySelector("a");
            if (!link) return;

            const href = link.href;
            const title = box.querySelector("h3").textContent;

            box.innerHTML = `
                <div class="user-score-display">
                    <h4>${title}</h4>
                    <p><strong>Your Score:</strong> ${s.score} / ${s.totalQuestions}</p>
                </div>
                <div class="button-group">
                    <button class="btn retry-btn">Play Again</button>
                    <button class="btn review-btn">View Result</button>
                </div>
            `;

            box.querySelector(".retry-btn").onclick = () => {
                sessionStorage.removeItem(`review_${quizId}`);
                sessionStorage.removeItem("reviewDataForNextPage");
                window.location.href = href;
            };

            box.querySelector(".review-btn").onclick = () => {
                if (s && s.questions && s.userAnswers) {
                    sessionStorage.setItem("reviewDataForNextPage", JSON.stringify(s));
                    sessionStorage.setItem(`review_${quizId}`, "true");
                    window.location.href = href;
                } else {
                    alert("No review data found. Play the test again.");
                }
            };
        }
    });
}

// ---------------------------------------------------
// AUTH LISTENER
// ---------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, user => {
        currentUser = user;
        initializeTestHub();
    });
});
