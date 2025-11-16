
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
        return;
    }

    const quizId = document.body.dataset.quizId;
    if (!quizId) return;

    // --- State Management ---
    let currentUser = null;
    let timerInterval;
    let timeTaken = 0;
    let currentQuestionIndex = 0;
    let userAnswers = []; // Will store selected option values or 'skipped'
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

        // Inject the new layout
        quizForm.innerHTML = `
            <div id="quiz-layout">
                <div id="question-area">
                    <div id="questions-container"></div>
                    <div id="question-navigation-buttons"></div>
                </div>
                <div id="question-palette-container">
                    <div class="palette-header">
                        <h4>Questions</h4>
                        <button class="submit-btn" id="main-submit-btn" title="Submit Test">Submit</button>
                    </div>
                    <div id="question-palette"></div>
                </div>
            </div>
        `;
        
        document.getElementById('main-submit-btn').addEventListener('click', () => {
             if (confirm("Are you sure you want to submit the test?")) {
                calculateResult();
            }
        });

        displayQuestion(currentQuestionIndex);
    }

    function displayQuestion(index) {
        currentQuestionIndex = index;
        const questionsContainer = document.getElementById('questions-container');
        const navigationContainer = document.getElementById('question-navigation-buttons');
        if (!questionsContainer || !navigationContainer) return;

        const q = shuffledQuestions[index];
        
        // --- Question Numbering Fix ---
        const questionHTML = `
            <div class="question-block" id="question-${index}">
                <p class="question">${index + 1}. ${q.question}</p>
                <div class="options">
                    ${q.options.map(option => `
                        <label>
                            <input type="radio" name="question${index}" value="${option.value}" ${userAnswers[index] === option.value ? 'checked' : ''}>
                            <span>${option.text}</span>
                        </label>`).join("")}
                </div>
            </div>`;
        questionsContainer.innerHTML = questionHTML;

        // Add event listener to save answer on change
        questionsContainer.querySelectorAll(`input[name="question${index}"]`).forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    userAnswers[index] = e.target.value;
                    updatePalette();
                }
            });
        });
        
        // --- Navigation Buttons ---
        let navHTML = `<button type="button" class="skip-btn">Skip</button>`;
        if (index < shuffledQuestions.length - 1) {
            navHTML += `<button type="button" class="next-btn">Next</button>`;
        } else {
            navHTML += `<button type="button" class="submit-btn">Submit</button>`;
        }
        navigationContainer.innerHTML = navHTML;

        // Attach listeners for navigation
        navigationContainer.querySelector('.skip-btn').addEventListener('click', skipQuestion);
        if (index < shuffledQuestions.length - 1) {
            navigationContainer.querySelector('.next-btn').addEventListener('click', nextQuestion);
        } else {
            navigationContainer.querySelector('.submit-btn').addEventListener('click', () => {
                if (confirm("Are you sure you want to submit the test?")) {
                    calculateResult();
                }
            });
        }

        updatePalette();
    }

    function updatePalette() {
        const paletteContainer = document.getElementById('question-palette');
        if (!paletteContainer) return;
        
        let paletteHTML = '';
        for (let i = 0; i < shuffledQuestions.length; i++) {
            let statusClass = 'unvisited';
            if (userAnswers[i] === 'skipped') statusClass = 'skipped';
            else if (userAnswers[i] !== null) statusClass = 'answered';

            if (i === currentQuestionIndex) statusClass += ' current';
            
            paletteHTML += `<div class="palette-item ${statusClass}" data-index="${i}">${i + 1}</div>`;
        }
        paletteContainer.innerHTML = paletteHTML;

        // Attach jump-to-question listeners
        paletteContainer.querySelectorAll('.palette-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index, 10);
                displayQuestion(index);
            });
        });
    }

    function nextQuestion() {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            displayQuestion(currentQuestionIndex + 1);
        }
    }

    function skipQuestion() {
        userAnswers[currentQuestionIndex] = 'skipped';
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            nextQuestion();
        } else {
            // If on the last question, skipping means submitting
            if (confirm("This is the last question. Are you sure you want to submit the test?")) {
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
        let skippedCount = 0;

        shuffledQuestions.forEach((q, index) => {
            const userAnswer = userAnswers[index];
            if (userAnswer === 'skipped' || userAnswer === null) {
                skippedCount++;
            } else if (userAnswer === q.correctOption) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        });

        const totalQuestions = shuffledQuestions.length;
        const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

        const correctPercentageForSVG = percentage;
        const incorrectPercentageForSVG = totalQuestions > 0 ? (incorrectCount / totalQuestions) * 100 : 0;
        const greenDashArray = `${correctPercentageForSVG}, 100`;
        const redDashArray = `${incorrectPercentageForSVG}, 100`;
        const redDashOffset = `-${correctPercentageForSVG}`;
        
        quizForm.innerHTML = ''; // Clear the quiz UI

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
            saveScore(correctCount, totalQuestions, shuffledQuestions, userAnswers);
        }
    }

    async function saveScore(score, totalQuestions, questionsArray, answers) {
        if (!currentUser || !db) return;

        const quizData = {
            userId: currentUser.uid,
            userName: currentUser.displayName,
            userPhotoURL: currentUser.photoURL,
            score: score,
            totalQuestions: totalQuestions,
            quizId: quizId,
            timestamp: serverTimestamp(),
            userAnswers: answers, // Storing array of answers
            questions: questionsArray.map(q => ({ question: q.question, options: q.options, correctOption: q.correctOption, explanation: q.explanation }))
        };

        const q = query(collection(db, "quizScores"), where("userId", "==", currentUser.uid), where("quizId", "==", quizId));
        
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                // To keep a history, we always add a new doc. If we wanted to update, we'd do this:
                // const docId = querySnapshot.docs[0].id;
                // const docRef = doc(db, "quizScores", docId);
                // await updateDoc(docRef, quizData);
                // console.log("Score updated successfully!");
                await addDoc(collection(db, "quizScores"), quizData);
                console.log("New score saved successfully!");
            } else {
                await addDoc(collection(db, "quizScores"), quizData);
                console.log("Score saved successfully!");
            }
        } catch (error) {
            console.error("Error saving or updating score: ", error);
        }
    }

    function retryQuiz() {
        location.reload();
    }
    
    function reviewQuestions() {
       renderReviewMode();
    }
    
    function renderReviewMode() {
        startModal.classList.remove('active');
        quizSection.style.display = "none";
        resultModal.classList.remove('active');
        const reviewContainer = document.getElementById("review-container");

        let reviewHTML = "";
        if (!shuffledQuestions || !userAnswers) {
            reviewContainer.innerHTML = "<p>Review data is incomplete.</p>";
            reviewSection.style.display = "block";
            return;
        }

        shuffledQuestions.forEach((q, index) => {
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
    }

    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (reviewBtn) reviewBtn.addEventListener('click', reviewQuestions);
    if (retryBtn) retryBtn.addEventListener('click', retryQuiz);
    if (reviewRetryBtn) reviewRetryBtn.addEventListener('click', retryQuiz);
    
    // Initial UI setup
    startModal.classList.add('active');
});
