

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain: "appcomment.firebaseapp.com",
    projectId: "appcomment",
    storageBucket: "appcomment.firebasestorage.app",
    messagingSenderId: "156258808941",
    appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
};

// Initialize Firebase at the module level using a singleton pattern to prevent errors.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    let currentUser = null;
    let timerInterval;
    let userAnswers = {};
    let timeTaken = 0;
    const quizId = "hindi-test-part-01"; // Hardcoded for this specific test part
    
    const quizForm = document.getElementById("quiz-form");
    const questionsContainer = document.getElementById("questions-container");
    const startModal = document.getElementById("startModal");
    const resultModal = document.getElementById("resultModal");
    const resultContent = document.getElementById("resultContent");
    const submitBtn = document.querySelector(".submit-btn");
    const reviewContainer = document.getElementById("review-container");
    const reviewSection = document.getElementById("review-questions");
    const quizSection = document.getElementById("quiz-section");
    const startBtn = document.getElementById("start-btn");
    const reviewBtn = document.getElementById("review-btn");
    const retryBtn = document.getElementById("retry-btn");
    const reviewRetryBtn = document.getElementById("review-retry-btn");

    onAuthStateChanged(auth, (user) => {
        currentUser = user;
    });

    // Check for review mode on page load
    const isInReviewMode = sessionStorage.getItem(`review_${quizId}`);
    if (isInReviewMode === 'true') {
        const reviewData = JSON.parse(sessionStorage.getItem('reviewDataForNextPage'));
        if (reviewData) {
            // Important: Clear the data and flag so a normal refresh doesn't re-trigger review mode.
            sessionStorage.removeItem(`review_${quizId}`);
            sessionStorage.removeItem('reviewDataForNextPage');
            
            questions = reviewData.questions;
            userAnswers = reviewData.userAnswers;
            renderReviewMode();
        } else {
            // If data is missing for some reason, clear the flag and show the start modal.
            sessionStorage.removeItem(`review_${quizId}`);
            startModal.classList.add('active');
        }
    } else {
        startModal.classList.add('active');
    }


    function startQuiz() {
        startModal.classList.remove('active');
        quizSection.style.display = "block";
        displayQuestions();
        startTimer();
    }

    function displayQuestions() {
        let questionsHTML = "";
        questions.sort(() => Math.random() - 0.5); 
        questions.forEach((q, index) => {
            questionsHTML += `
                <li class="question-block" id="question-${index}">
                    <p class="question">${q.question}</p>
                    <div class="options">
                        ${q.options.map(option => `
                            <label>
                                <input type="radio" name="question${index}" value="${option.value}">
                                <span>${option.text}</span>
                            </label>`).join("")}
                    </div>
                </li>`;
        });
        questionsContainer.innerHTML = `<ol>${questionsHTML}</ol>`;
        submitBtn.style.display = "block";
    }

    function startTimer() {
        let seconds = 0;
        const timerElement = document.getElementById("timer");
        timerInterval = setInterval(() => {
            seconds++;
            timeTaken = seconds;
            let min = Math.floor(seconds / 60);
            let sec = seconds % 60;
            if (timerElement) {
                timerElement.innerHTML = `<strong>समय:</strong> ${min}:${sec < 10 ? "0" + sec : sec}`;
            }
        }, 1000);
    }

    async function calculateResult() {
        clearInterval(timerInterval);
        let correctCount = 0;
        let incorrectCount = 0;

        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            userAnswers[index] = selectedOption ? selectedOption.value : null;
            if (userAnswers[index]) {
                if (userAnswers[index] === q.correctOption) {
                    correctCount++;
                } else {
                    incorrectCount++;
                }
            }
        });

        const totalQuestions = questions.length;
        const skippedCount = totalQuestions - correctCount - incorrectCount;
        const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

        // Save results for review mode using the generic key
        const reviewData = { questions: questions, userAnswers: userAnswers, score: correctCount, totalQuestions: totalQuestions };
        sessionStorage.setItem('reviewDataForNextPage', JSON.stringify(reviewData));

        // SVG donut chart calculations
        const correctPercentageForSVG = percentage;
        const incorrectPercentageForSVG = totalQuestions > 0 ? (incorrectCount / totalQuestions) * 100 : 0;

        const greenDashArray = `${correctPercentageForSVG}, 100`;
        const redDashArray = `${incorrectPercentageForSVG}, 100`;
        const redDashOffset = `-${correctPercentageForSVG}`;

        if (resultContent) {
            resultContent.innerHTML = `
                <div style="text-align: center;">
                    <div style="position: relative; width: 150px; height: 150px; margin: 1rem auto;">
                        <svg viewBox="0 0 36 36" style="transform: rotate(-90deg); width: 100%; height: 100%;">
                            <!-- Background Circle -->
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                  fill="none" stroke="#e6e6e6" stroke-width="3"></path>
                            <!-- Green Part (Correct) -->
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                  fill="none" stroke="var(--success-color, #28a745)" stroke-width="3" 
                                  stroke-dasharray="${greenDashArray}"></path>
                            <!-- Red Part (Incorrect) -->
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                  fill="none" stroke="var(--danger-color, #dc3545)" stroke-width="3" 
                                  stroke-dasharray="${redDashArray}" stroke-dashoffset="${redDashOffset}"></path>
                        </svg>
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem; font-weight: bold; color: var(--text-color);">
                            ${percentage.toFixed(2)}%
                        </div>
                    </div>
                    <p>कुल प्रश्न: ${totalQuestions}</p>
                    <p style="color: var(--success-color, #28a745); font-weight: bold;">सही: ${correctCount}</p>
                    <p style="color: var(--danger-color, #dc3545); font-weight: bold;">गलत: ${incorrectCount}</p>
                    <p style="color: var(--secondary-color, #6c757d);">छोड़े गए: ${skippedCount}</p>
                    <p>कुल समय: ${Math.floor(timeTaken / 60)} मिनट ${timeTaken % 60} सेकंड</p>
                </div>
            `;
        }
        
        if (currentUser) {
            // Wait for the score to be saved before showing the result modal
            await saveScore(correctCount, totalQuestions, questions, userAnswers);
        }

        if (resultModal) resultModal.classList.add('active');
    }

    async function saveScore(score, totalQuestions, questions, userAnswers) {
        if (!currentUser || !db) return;

        try {
            await addDoc(collection(db, "quizScores"), {
                userId: currentUser.uid,
                userName: currentUser.displayName,
                userPhotoURL: currentUser.photoURL,
                score: score,
                totalQuestions: totalQuestions,
                quizId: quizId,
                timestamp: serverTimestamp(),
                // Persist review data in Firestore
                questions: questions,
                userAnswers: userAnswers
            });
            console.log("Score saved successfully!");
        } catch (error) {
            console.error("Error saving score: ", error);
        }
    }

    function retryQuiz() {
        sessionStorage.removeItem(`review_${quizId}`);
        sessionStorage.removeItem('reviewDataForNextPage');
        location.reload();
    }

    function reviewQuestions() {
       sessionStorage.setItem(`review_${quizId}`, 'true');
       // Data is already in 'reviewDataForNextPage' from calculateResult()
       location.reload();
    }

    function renderReviewMode() {
        startModal.classList.remove('active');
        quizSection.style.display = "none";
        
        let reviewHTML = "";
        questions.forEach((q, index) => {
            const userAnswer = userAnswers[index];
            reviewHTML += `
                <li class="question-block review">
                    <p class="question">${q.question}</p>
                    <div class="options">
                        ${q.options.map(opt => {
                            const isUserAnswer = userAnswer === opt.value;
                            const isCorrectAnswer = opt.value === q.correctOption;
                            let className = '';
                            if (isCorrectAnswer) className = 'correct-option';
                            else if (isUserAnswer && !isCorrectAnswer) className = 'incorrect-option';
                            
                            return `<label class="${className}">
                                        <input type="radio" name="review${index}" value="${opt.value}" ${isUserAnswer ? 'checked' : ''} disabled> 
                                        <span>${opt.text}</span>
                                    </label>`;
                        }).join('')}
                    </div>
                    <div class="explanation"><strong>स्पष्टीकरण:</strong> ${q.explanation}</div>
                </li>`;
        });

        if (reviewContainer) reviewContainer.innerHTML = `<ol>${reviewHTML}</ol>`;
        if (reviewSection) reviewSection.style.display = "block";
    }

    // Event Listeners
    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (quizForm) quizForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (confirm("क्या आप वाकई टेस्ट सबमिट करना चाहते हैं?")) {
            await calculateResult();
        }
    });
    if (reviewBtn) reviewBtn.addEventListener('click', reviewQuestions);
    if (retryBtn) retryBtn.addEventListener('click', retryQuiz);
    if (reviewRetryBtn) reviewRetryBtn.addEventListener('click', retryQuiz);
});
