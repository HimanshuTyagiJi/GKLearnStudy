import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- LANGUAGE SWITCH ---------------- */
    let currentLanguage = "english";

    const languageSelect = document.getElementById("language-select");
    if (languageSelect) {
        languageSelect.addEventListener("change", function () {
            currentLanguage = this.value;
            displayQuestion(currentQuestionIndex);
        });
    }
    /* -------------------------------------------------- */


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
        return;
    }

    const quizId = document.body.dataset.quizId;
    if (!quizId) return;

    // --- State Management ---
    let currentUser = null;
    let timerInterval;
    let timeTaken = 0;
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let shuffledQuestions = [];

    // --- DOM Elements ---
    const quizForm = document.getElementById("quiz-form");
    const startModal = document.getElementById("startModal");
    const resultModal = document.getElementById("resultModal");
    const resultContent = document.getElementById("resultContent");
    const reviewSection = document.getElementById("review-questions");
    const quizSection = document.getElementById("quiz-section");
    const startBtn = document.getElementById("start-btn");
    const reviewBtn = document.getElementById("review-btn");
    const retryBtn = document.getElementById("retry-btn");
    const reviewRetryBtn = document.getElementById("review-retry-btn");

    onAuthStateChanged(auth, (user) => {
        currentUser = user;
    });

    function startQuiz() {
        startModal.classList.remove('active');
        quizSection.style.display = "block";

        shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        userAnswers = new Array(shuffledQuestions.length).fill(null);
        currentQuestionIndex = 0;

        renderQuizUI();
        startTimer();
    }

    function renderQuizUI() {
        if (!quizForm) return;

        quizForm.innerHTML = `
            <div id="quiz-layout">
                <div id="question-area">
                    <div id="questions-container"></div>
                    <div id="question-navigation-buttons"></div>
                </div>
                <div id="question-palette-container">
                    <div class="palette-header">
                        <h4>Questions</h4>
                        <button class="submit-btn" id="main-submit-btn">Submit</button>
                    </div>
                    <div id="question-palette"></div>
                </div>
            </div>
        `;

        document.getElementById("main-submit-btn").addEventListener("click", () => {
            if (confirm("Are you sure you want to submit the test?")) {
                calculateResult();
            }
        });

        displayQuestion(currentQuestionIndex);
    }

    function displayQuestion(index) {
        currentQuestionIndex = index;
        const q = shuffledQuestions[index];

        /* ------------------ LANGUAGE OUTPUT FIX ------------------ */
        const questionText = (currentLanguage === "hindi") ? q.question_hi : q.question_en;
        const optionList = (currentLanguage === "hindi") ? q.options_hi : q.options_en;
        const explanationText = (currentLanguage === "hindi")
            ? q.explanation_hi
            : q.explanation_en;

        q.question = questionText;
        q.options = optionList;
        q.explanation = explanationText;
        /* --------------------------------------------------------- */

        const questionsContainer = document.getElementById("questions-container");
        const navigationContainer = document.getElementById("question-navigation-buttons");

        const questionHTML = `
            <div class="question-block" id="question-${index}">
                <p class="question">${index + 1}. ${q.question}</p>
                <div class="options">
                    ${q.options.map(option => `
                        <label>
                            <input type="radio" 
                                   name="question${index}" 
                                   value="${option.value}"
                                   ${userAnswers[index] === option.value ? 'checked' : ''}>
                            <span>${option.text}</span>
                        </label>
                    `).join("")}
                </div>
            </div>
        `;

        questionsContainer.innerHTML = questionHTML;

        questionsContainer
            .querySelectorAll(`input[name="question${index}"]`)
            .forEach(radio => {
                radio.addEventListener("change", (e) => {
                    userAnswers[index] = e.target.value;
                    updatePalette();
                });
            });

        let navHTML = `<button class="skip-btn">Skip</button>`;
        if (index < shuffledQuestions.length - 1) {
            navHTML += `<button class="next-btn">Next</button>`;
        } else {
            navHTML += `<button class="submit-btn">Submit</button>`;
        }

        navigationContainer.innerHTML = navHTML;

        navigationContainer.querySelector(".skip-btn").addEventListener("click", skipQuestion);

        if (index < shuffledQuestions.length - 1) {
            navigationContainer.querySelector(".next-btn").addEventListener("click", nextQuestion);
        } else {
            navigationContainer.querySelector(".submit-btn").addEventListener("click", () => {
                if (confirm("Submit test?")) {
                    calculateResult();
                }
            });
        }

        updatePalette();
    }

    function updatePalette() {
        const paletteContainer = document.getElementById("question-palette");
        if (!paletteContainer) return;

        let paletteHTML = "";

        for (let i = 0; i < shuffledQuestions.length; i++) {
            let status = "unvisited";
            if (userAnswers[i] === "skipped") status = "skipped";
            else if (userAnswers[i] !== null) status = "answered";
            if (i === currentQuestionIndex) status += " current";

            paletteHTML += `<div class="palette-item ${status}" data-index="${i}">${i + 1}</div>`;
        }

        paletteContainer.innerHTML = paletteHTML;

        paletteContainer.querySelectorAll(".palette-item").forEach(item => {
            item.addEventListener("click", () => {
                displayQuestion(parseInt(item.dataset.index));
            });
        });
    }

    function nextQuestion() {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            displayQuestion(currentQuestionIndex + 1);
        }
    }

    function skipQuestion() {
        userAnswers[currentQuestionIndex] = "skipped";

        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            nextQuestion();
        } else {
            if (confirm("Last question. Submit now?")) {
                calculateResult();
            }
        }
    }

    function startTimer() {
        let seconds = 0;
        const timerElement = document.getElementById("timer");
        timerInterval = setInterval(() => {
            seconds++;
            timeTaken = seconds;
            const min = Math.floor(seconds / 60);
            const sec = seconds % 60;

            timerElement.innerHTML = `<strong>Time:</strong> ${min}:${sec < 10 ? "0" + sec : sec}`;
        }, 1000);
    }

    function calculateResult() {
        clearInterval(timerInterval);

        let correct = 0, incorrect = 0, skipped = 0;

        shuffledQuestions.forEach((q, idx) => {
            const ans = userAnswers[idx];
            if (ans === null || ans === "skipped") skipped++;
            else if (ans === q.correctOption) correct++;
            else incorrect++;
        });

        const total = shuffledQuestions.length;
        const percentage = (correct / total) * 100;

        quizForm.innerHTML = "";

        resultContent.innerHTML = `
            <div style="text-align:center;">
                <h2>${percentage.toFixed(2)}% Score</h2>
                <p>Correct: ${correct}</p>
                <p>Incorrect: ${incorrect}</p>
                <p>Skipped: ${skipped}</p>
            </div>
        `;

        resultModal.classList.add("active");
    }

    function retryQuiz() {
        location.reload();
    }

    function reviewQuestions() {
        renderReviewMode();
    }

    function renderReviewMode() {
        quizSection.style.display = "none";
        resultModal.classList.remove("active");
        const reviewContainer = document.getElementById("review-container");

        let html = "";

        shuffledQuestions.forEach((q, index) => {
            html += `
                <div class="question-block review">
                    <p class="question">${index + 1}. ${q.question}</p>
                    <div class="options">
                        ${q.options.map(opt => {
                            const isCorrect = opt.value === q.correctOption;
                            const isSelected = userAnswers[index] === opt.value;

                            return `
                                <label class="${isCorrect ? 'correct-option' : isSelected ? 'incorrect-option' : ''}">
                                    <input type="radio" disabled ${isSelected ? 'checked' : ''}>
                                    <span>${opt.text}</span>
                                </label>
                            `;
                        }).join("")}
                    </div>
                    <div class="explanation"><strong>Explanation:</strong> ${q.explanation}</div>
                </div>
            `;
        });

        reviewContainer.innerHTML = html;
        reviewSection.style.display = "block";
    }

    if (startBtn) startBtn.addEventListener("click", startQuiz);
    if (reviewBtn) reviewBtn.addEventListener("click", reviewQuestions);
    if (retryBtn) retryBtn.addEventListener("click", retryQuiz);
    if (reviewRetryBtn) reviewRetryBtn.addEventListener("click", retryQuiz);

    startModal.classList.add("active");
});
