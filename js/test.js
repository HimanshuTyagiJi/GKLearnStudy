var totalSeconds = 0;
var timerInterval;
var userAnswers = [];
var startModal = document.getElementById("startModal");
var resultModal = document.getElementById("resultModal");

window.onload = function () {
    startModal.style.display = "block";
}

function startQuiz() {
    startModal.style.display = "none";
    document.getElementById('quiz-form').style.display = 'block';
    shuffleQuestions();
    generateQuestions();
    startTimer();
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function startTimer() {
    totalSeconds = 0;
    timerInterval = setInterval(function () {
        totalSeconds++;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        document.getElementById('timer').textContent = 'Time: ' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function generateQuestions() {
    var questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';

    questions.forEach(function (question, index) {
        var questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        if (index !== 0) {
            questionDiv.style.display = 'none';
        }

        var questionText = document.createElement('p');
        questionText.innerHTML = (index + 1) + ". " + question.question; // Modified line
        questionDiv.appendChild(questionText);

        // Rest of your code remains the same...


        var optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');
        question.options.forEach(function (option) {
            var optionLabel = document.createElement('label');
            var optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = 'question-' + index;
            optionInput.value = option.value;
            optionInput.addEventListener('change', function () {
                var labels = optionsDiv.getElementsByTagName('label');
                for (var i = 0; i < labels.length; i++) {
                    labels[i].classList.remove('selected');
                }
                optionLabel.classList.add('selected');
                userAnswers[index] = option.value;
                var nextButton = document.getElementById('next-btn-' + index);
                if (nextButton) {
                    nextButton.disabled = false;
                    nextButton.style.opacity = 1;
                }
                var submitButton = document.getElementById('submit-btn-' + index);
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.style.opacity = 1;
                }
            });
            optionLabel.textContent = option.text;
            optionLabel.insertBefore(optionInput, optionLabel.firstChild);
            optionsDiv.appendChild(optionLabel);
        });
        questionDiv.appendChild(optionsDiv);

        var button;
        if (index < questions.length - 1) {
            button = document.createElement('button');
            button.type = 'button';
            button.classList.add('next-btn');
            button.textContent = 'Next';
            button.id = 'next-btn-' + index;
            button.disabled = true;
            button.style.opacity = 0.5;
            button.addEventListener('click', function () {
                showNextQuestion(index);
            });
        } else {
            button = document.createElement('button');
            button.type = 'button';
            button.classList.add('submit-btn');
            button.textContent = 'Submit';
            button.id = 'submit-btn-' + index;
            button.disabled = true;
            button.style.opacity = 0.5;
            button.addEventListener('click', submitQuiz);
        }
        questionDiv.appendChild(button);

        var skipButton = document.createElement('button');
        skipButton.type = 'button';
        skipButton.classList.add('skip-btn');
        skipButton.textContent = 'Skip';
        skipButton.addEventListener('click', function () {
            userAnswers[index] = 'skipped';
            if (index === questions.length - 1) {
                submitQuiz();
            } else {
                showNextQuestion(index);
            }
        });
        questionDiv.appendChild(skipButton);

        questionsContainer.appendChild(questionDiv);
    });
}

function showNextQuestion(currentIndex) {
    var currentQuestion = document.querySelectorAll('.question')[currentIndex];
    var nextQuestion = document.querySelectorAll('.question')[currentIndex + 1];

    currentQuestion.style.display = 'none';
    nextQuestion.style.display = 'block';
}

function submitQuiz() {
    stopTimer();
    var score = 0;
    var totalQuestions = questions.length;
    var skipped = 0;
    var correct = 0;
    var incorrect = 0;

    userAnswers.forEach(function (answer, index) {
        if (answer === 'skipped') {
            skipped++;
        } else if (answer === questions[index].correctOption) {
            correct++;
            score++;
        } else {
            incorrect++;
        }
    });

    var percentage = (correct / totalQuestions) * 100;

    var resultContent = 
        '<p>Skipped: ' + skipped + '</p>' +
        '<p>Correct: ' + correct + '</p>' +
        '<p>Incorrect: ' + incorrect + '</p>' +
        '<p>Percentage: ' + percentage.toFixed(2) + '%</p>' +
        '<p>Score: ' + score + '/' + totalQuestions + '</p>' +
        '<p>Total Time taken: ' + Math.floor(totalSeconds / 60) + ' minutes ' + (totalSeconds % 60) + ' seconds</p>';

    var resultContentDiv = document.getElementById('resultContent');
    resultContentDiv.innerHTML = resultContent;
    resultModal.style.display = 'block';
}

function reviewQuestions() {
    stopTimer();
    resultModal.style.display = 'none';
    document.getElementById('quiz-form').style.display = 'none';
    var reviewDiv = document.getElementById('review-questions');
    reviewDiv.innerHTML = '<h2>Review Questions</h2>';
    questions.forEach(function (question, index) {
        var userAnswer = userAnswers[index];
        var correctAnswer = question.correctOption;
        var explanation = question.explanation;
        var questionText = (index + 1) + ". " + question.question; // Modified line
        var resultText = '<p><strong>' + questionText + '</strong></p>';

        var options = question.options;
        options.forEach(function (option) {
            var optionLabel = option.text;
            var optionValue = option.value;
            var optionClass = 'default-color';
            var userAnswerText = '';

            if (optionValue === userAnswer && userAnswer === correctAnswer) {
                optionClass = 'correct-answer';
                userAnswerText = ' (Your Answer)';
            } else if (optionValue === userAnswer && userAnswer !== correctAnswer) {
                optionClass = 'incorrect-answer';
                userAnswerText = ' (Your Answer)';
            } else if (optionValue === correctAnswer) {
                optionClass = 'correct-answer';
            }
            resultText += '<p class="' + optionClass + '">' + optionLabel + userAnswerText + '</p>';
        });

        resultText += '<p><span class="blue-text">Explanation:</span> ' + explanation + '</p>';
        resultText += '<br><br><hr><br><br>';
        reviewDiv.innerHTML += resultText;
    });
    reviewDiv.innerHTML += '<button class="retry-btn" onclick="retryQuiz()">Try Again</button>';
    reviewDiv.style.display = 'block';
}

       

function retryQuiz() {
    totalSeconds = 0;
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = 'Time: 0:00';
    document.getElementById('quiz-form').reset();
    document.getElementById('result').style.display = 'none';
    document.getElementById('review-questions').style.display = 'none';
    var questionDivs = document.querySelectorAll('.question');
    questionDivs.forEach(function (div, index) {
        if (index === 0) {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    });
    userAnswers = [];
    resultModal.style.display = 'none';
    startQuiz();
}


 (function () {
    const code = atob(
      "Ly8gRGlzYWJsZSByaWdodC1jbGljayBnbG9iYWxseQ0KZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBmdW5jdGlvbiAoZSkgew0KICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgdGhlIGNvbnRleHQgbWVudQ0KfSk7DQoNCi8vIEFkZGl0aW9uYWwgc2VjdXJpdHkgdG8gZGlzYWJsZSBrZXlib2FyZCBzaG9ydGN1dHMgZm9yIHNhdmluZyBjb250ZW50DQpkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHsNCiAgaWYgKA0KICAgICgoZS5jdHJsS2V5ICYmIGUua2V5ID09PSAnc1luZGlzJ3NlcnYgLy8gRGlzYWJsZSBDdHJsK1MNCiAgICApDQoNCiAgZXMuLiANCi8vIE9yaWdpbmFsIENvZGUgRW5kIg=="
    );
    eval(code);
  })();

(function() {
  const encodedScript = atob(
    "KGZ1bmN0aW9uICgpIHsKICAgIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5zdGFydHNXaXRoKCJ2aWV3LXNvdXJjZToiKSkgewogICAgICAgIGNvbnN0IHJlZGlyZWN0VVJMID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgidmlldy1zb3VyY2U6IiwiIik7CiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UocmVkaXJlY3RVUkwpOwogICAgfQp9KSgpOw=="
  );
  eval(encodedScript);
})();
