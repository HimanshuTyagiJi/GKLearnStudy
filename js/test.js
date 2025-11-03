import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
        authDomain: "appcomment.firebaseapp.com",
        projectId: "appcomment",
        storageBucket: "appcomment.firebasestorage.app",
        messagingSenderId: "156258808941",
        appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
    };

    let app, auth, db;
    try {
        app = getApps().length ? getApp() : initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    } catch (e) {
        console.error("Firebase initialization error:", e);
        alert("Could not load the test. Please refresh the page.");
        return;
    }

    const quizId = document.body.dataset.quizId;
    if (!quizId) {
        alert("Quiz configuration error: Quiz ID is missing.");
        document.body.innerHTML = "<h1>Error: Quiz ID not found.</h1>";
        return;
    }

    let currentUser = null;
    let timerInterval;
    let userAnswers = {};
    let timeTaken = 0;
    
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

    const isInReviewMode = sessionStorage.getItem(`review_${quizId}`);
    if (isInReviewMode === 'true') {
        const reviewDataJSON = sessionStorage.getItem('reviewDataForNextPage');
        if (reviewDataJSON) {
            const reviewData = JSON.parse(reviewDataJSON);
            questions = reviewData.questions;
            userAnswers = reviewData.userAnswers;
            renderReviewMode();
        } else {
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
                <div class="question-block" id="question-${index}">
                    <p class="question">${index + 1}. ${q.question}</p>
                    <div class="options">
                        ${q.options.map(option => `
                            <label>
                                <input type="radio" name="question${index}" value="${option.value}">
                                <span>${option.text}</span>
                            </label>`).join("")}
                    </div>
                </div>`;
        });
        questionsContainer.innerHTML = questionsHTML;
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
                timerElement.innerHTML = `<strong>Time:</strong> ${min}:${sec < 10 ? "0" + sec : sec}`;
            }
        }, 1000);
    }

    function calculateResult() {
        clearInterval(timerInterval);
        let correctCount = 0;
        let incorrectCount = 0;
        userAnswers = {}; // Reset user answers before calculation

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
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e6e6e6" stroke-width="3"></path>
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--success-color, #28a745)" stroke-width="3" stroke-dasharray="${greenDashArray}"></path>
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--danger-color, #dc3545)" stroke-width="3" stroke-dasharray="${redDashArray}" stroke-dashoffset="${redDashOffset}"></path>
                        </svg>
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem; font-weight: bold; color: var(--text-color);">${percentage.toFixed(2)}%</div>
                    </div>
                    <p>Total Questions: ${totalQuestions}</p>
                    <p style="color: var(--success-color, #28a745); font-weight: bold;">Correct: ${correctCount}</p>
                    <p style="color: var(--danger-color, #dc3545); font-weight: bold;">Incorrect: ${incorrectCount}</p>
                    <p style="color: var(--secondary-color, #6c757d);">Skipped: ${skippedCount}</p>
                    <p>Total Time: ${Math.floor(timeTaken / 60)} min ${timeTaken % 60} sec</p>
                </div>`;
        }
        
        if (resultModal) resultModal.classList.add('active');
        
        if (currentUser) {
            saveScore(correctCount, totalQuestions, userAnswers, questions);
        }
    }

    async function saveScore(score, totalQuestions, answers, questionsArray) {
        if (!currentUser || !db) return;

        const quizData = {
            userId: currentUser.uid,
            userName: currentUser.displayName,
            userPhotoURL: currentUser.photoURL,
            score: score,
            totalQuestions: totalQuestions,
            quizId: quizId,
            timestamp: serverTimestamp(),
            userAnswers: answers,
            questions: questionsArray.map(q => ({ question: q.question, options: q.options, correctOption: q.correctOption, explanation: q.explanation }))
        };

        const q = query(collection(db, "quizScores"), where("userId", "==", currentUser.uid), where("quizId", "==", quizId));
        
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const docId = querySnapshot.docs[0].id;
                const docRef = doc(db, "quizScores", docId);
                await updateDoc(docRef, quizData);
                console.log("Score updated successfully!");
            } else {
                await addDoc(collection(db, "quizScores"), quizData);
                console.log("Score saved successfully!");
            }
        } catch (error) {
            console.error("Error saving or updating score: ", error);
        }
    }

    function retryQuiz() {
        sessionStorage.removeItem(`review_${quizId}`);
        sessionStorage.removeItem(`reviewDataForNextPage`);
        location.reload();
    }

    function reviewQuestions() {
       renderReviewMode();
    }
    
    function renderReviewMode() {
        startModal.classList.remove('active');
        quizSection.style.display = "none";
        resultModal.classList.remove('active');

        let reviewHTML = "";
        if (!questions || !userAnswers) {
            reviewContainer.innerHTML = "<p>Review data is incomplete.</p>";
            reviewSection.style.display = "block";
            return;
        }

        questions.forEach((q, index) => {
            const userAnswer = userAnswers[index];
            reviewHTML += `
                <div class="question-block review">
                    <p class="question">${index + 1}. ${q.question}</p>
                    <div class="options">
                        ${q.options.map(opt => {
                            const isUserAnswer = userAnswer === opt.value;
                            const isCorrectAnswer = opt.value === q.correctOption;
                            let className = '';
                            if (isCorrectAnswer) {
                                className = 'correct-option';
                            } else if (isUserAnswer && !isCorrectAnswer) {
                                className = 'incorrect-option';
                            }
                            
                            return `<label class="${className}">
                                        <input type="radio" name="review${index}" value="${opt.value}" ${isUserAnswer ? 'checked' : ''} disabled> 
                                        <span>${opt.text}</span>
                                    </label>`;
                        }).join('')}
                    </div>
                    <div class="explanation"><strong>Explanation:</strong> ${q.explanation}</div>
                </div>`;
        });

        reviewContainer.innerHTML = reviewHTML;
        reviewSection.style.display = "block";

        sessionStorage.removeItem(`review_${quizId}`);
        sessionStorage.removeItem('reviewDataForNextPage');
    }

    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (quizForm) quizForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to submit the test?")) {
            calculateResult();
        }
    });
    if (reviewBtn) reviewBtn.addEventListener('click', reviewQuestions);
    if (retryBtn) retryBtn.addEventListener('click', retryQuiz);
    if (reviewRetryBtn) reviewRetryBtn.addEventListener('click', retryQuiz);
});
