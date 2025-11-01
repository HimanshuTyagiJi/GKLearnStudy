import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    } catch (e) {
        console.error("Firebase initialization error:", e);
        alert("टेस्ट लोड करने में असमर्थ। कृपया पृष्ठ को रीफ़्रेश करें।");
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
                timerElement.innerHTML = `<strong>समय:</strong> ${min}:${sec < 10 ? "0" + sec : sec}`;
            }
        }, 1000);
    }

    function calculateResult() {
        clearInterval(timerInterval);
        let score = 0;
        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            userAnswers[index] = selectedOption ? selectedOption.value : null;
            if (selectedOption && selectedOption.value === q.correctOption) {
                score++;
            }
        });

        const totalQuestions = questions.length;
        if (resultContent) {
            resultContent.innerHTML = `
                <p>आपने ${totalQuestions} में से <strong>${score}</strong> अंक प्राप्त किए हैं।</p>
                <p>कुल समय: ${Math.floor(timeTaken / 60)} मिनट ${timeTaken % 60} सेकंड</p>
            `;
        }
        if (resultModal) resultModal.classList.add('active');
        
        if (currentUser) {
            saveScore(score, totalQuestions);
        }
    }

    async function saveScore(score, totalQuestions) {
        if (!currentUser || !db) return;

        try {
            const quizId = "hindi-test-part-01";
            await addDoc(collection(db, "quizScores"), {
                userId: currentUser.uid,
                userName: currentUser.displayName,
                userPhotoURL: currentUser.photoURL,
                score: score,
                totalQuestions: totalQuestions,
                quizId: quizId,
                timestamp: serverTimestamp()
            });
        } catch (error) {
            console.error("Error saving score: ", error);
        }
    }

    function retryQuiz() {
        location.reload();
    }

    function reviewQuestions() {
        if (resultModal) resultModal.classList.remove('active');
        if (quizSection) quizSection.style.display = "none";

        let reviewHTML = "";
        questions.forEach((q, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === q.correctOption;
            let resultClass = 'incorrect';
            if (isCorrect) resultClass = 'correct';
            else if (userAnswer === null) resultClass = 'unanswered';

            reviewHTML += `
                <div class="question-block review ${resultClass}">
                    <p class="question">${index + 1}. ${q.question}</p>
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
                </div>`;
        });
        if (reviewContainer) reviewContainer.innerHTML = reviewHTML;
        if (reviewSection) reviewSection.style.display = "block";
    }

    // Event Listeners
    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (quizForm) quizForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (confirm("क्या आप वाकई टेस्ट सबमिट करना चाहते हैं?")) {
            calculateResult();
        }
    });
    if (reviewBtn) reviewBtn.addEventListener('click', reviewQuestions);
    if (retryBtn) retryBtn.addEventListener('click', retryQuiz);
    if (reviewRetryBtn) reviewRetryBtn.addEventListener('click', retryQuiz);
});
