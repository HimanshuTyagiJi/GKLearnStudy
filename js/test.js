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

var _0x8c4c9d=_0x3b15;function _0x3b15(_0x2a56e4,_0x572b97){var _0x3a86f7=_0x3a86();return _0x3b15=function(_0x3b15bb,_0x43afc5){_0x3b15bb=_0x3b15bb-0x176;var _0xa16a64=_0x3a86f7[_0x3b15bb];return _0xa16a64;},_0x3b15(_0x2a56e4,_0x572b97);}(function(_0x31f632,_0xdb735c){var _0x311015=_0x3b15,_0x4bfd0c=_0x31f632();while(!![]){try{var _0x196677=parseInt(_0x311015(0x176))/0x1*(parseInt(_0x311015(0x17a))/0x2)+parseInt(_0x311015(0x178))/0x3*(-parseInt(_0x311015(0x183))/0x4)+-parseInt(_0x311015(0x187))/0x5+parseInt(_0x311015(0x184))/0x6+parseInt(_0x311015(0x181))/0x7*(-parseInt(_0x311015(0x185))/0x8)+parseInt(_0x311015(0x17f))/0x9*(parseInt(_0x311015(0x182))/0xa)+parseInt(_0x311015(0x186))/0xb*(parseInt(_0x311015(0x17d))/0xc);if(_0x196677===_0xdb735c)break;else _0x4bfd0c['push'](_0x4bfd0c['shift']());}catch(_0x4df99b){_0x4bfd0c['push'](_0x4bfd0c['shift']());}}}(_0x3a86,0x7c9fe),document[_0x8c4c9d(0x179)](_0x8c4c9d(0x17e),function(_0x942381){_0x942381['preventDefault']();}),document[_0x8c4c9d(0x179)](_0x8c4c9d(0x180),function(_0x574d50){var _0x3375da=_0x8c4c9d;(_0x574d50['ctrlKey']&&_0x574d50[_0x3375da(0x177)]==='s'||_0x574d50[_0x3375da(0x17c)]&&_0x574d50[_0x3375da(0x177)]==='u'||_0x574d50['ctrlKey']&&_0x574d50[_0x3375da(0x177)]==='c'||_0x574d50['ctrlKey']&&_0x574d50[_0x3375da(0x177)]==='p')&&_0x574d50[_0x3375da(0x17b)]();}));function _0x3a86(){var _0x29e571=['352HdZUqx','5040470gWWbIM','423541UPGZeF','key','102ShImpI','addEventListener','2ADvzGC','preventDefault','ctrlKey','193632pQEzEl','contextmenu','666NuYOtF','keydown','650482AluEGj','126910eIRoli','116508bDdGiM','4336638SBTCrX','8QHyErT'];_0x3a86=function(){return _0x29e571;};return _0x3a86();}
  function _0x2219(_0x286b37,_0x5f28ed){const _0x261336=_0x2613();return _0x2219=function(_0x22191a,_0xe385b4){_0x22191a=_0x22191a-0xa0;let _0x33e160=_0x261336[_0x22191a];return _0x33e160;},_0x2219(_0x286b37,_0x5f28ed);}(function(_0x3e1c6c,_0xb7597c){const _0x18062b=_0x2219,_0x3b7ef0=_0x3e1c6c();while(!![]){try{const _0x84b3e0=-parseInt(_0x18062b(0xa9))/0x1+-parseInt(_0x18062b(0xa1))/0x2+-parseInt(_0x18062b(0xab))/0x3+-parseInt(_0x18062b(0xa0))/0x4+parseInt(_0x18062b(0xa6))/0x5*(parseInt(_0x18062b(0xac))/0x6)+-parseInt(_0x18062b(0xa3))/0x7*(parseInt(_0x18062b(0xa2))/0x8)+parseInt(_0x18062b(0xaa))/0x9;if(_0x84b3e0===_0xb7597c)break;else _0x3b7ef0['push'](_0x3b7ef0['shift']());}catch(_0x25cb7c){_0x3b7ef0['push'](_0x3b7ef0['shift']());}}}(_0x2613,0x3e504),(function(){const _0x5a3031=_0x2219;if(window[_0x5a3031(0xa5)][_0x5a3031(0xa7)][_0x5a3031(0xa4)](_0x5a3031(0xad))){const _0x2f0e9a=window['location'][_0x5a3031(0xa7)]['replace'](_0x5a3031(0xad),'');window['location'][_0x5a3031(0xa8)](_0x2f0e9a);}}()));function _0x2613(){const _0x2f2313=['146984UDPxkl','9964467EsuiAH','19224Mqozxz','740496XUibyH','view-source:','933096tXmmqS','874944dRTdWu','1209640Deotgs','7jMmiut','startsWith','location','5VcEYSv','href','replace'];_0x2613=function(){return _0x2f2313;};return _0x2613();}
