
    // Function to determine the current page number from the URL
    function getPageNumber() {
        let url = window.location.href;
        let match = url.match(/\/page(\d+)/); // Match '/page1', '/page2', etc.
        return match ? parseInt(match[1]) : 1; // Default to page 1 if not found
    }

    // Function to auto-number the questions based on the starting number
    function autoNumberQuestions(startNumber) {
        let questionElements = document.querySelectorAll(".questions");
        let questionNumber = startNumber;

        questionElements.forEach(question => {
            question.querySelector("h3").textContent = `Q-${questionNumber}: ${question.querySelector("h3").textContent}`;
            questionNumber++;
        });
    }

    // Function to initialize question numbering
    function initializeQuestionNumbering() {
        const pageNumber = getPageNumber(); // Get the current page number
        let startingNumber;

        // Determine the starting number based on the page number
        if (pageNumber === 1) {
            startingNumber = 1; // Page 1: Questions 1-30
        } else if (pageNumber === 2) {
            startingNumber = 31; // Page 2: Questions 31-60
        } else {
            startingNumber = (pageNumber - 1) * 30 + 1; // Subsequent pages
        }

        // Apply auto-numbering to the questions
        autoNumberQuestions(startingNumber);
    }

    // Add event listeners to options for each question
    function initializeQuestionInteractions() {
        const questions = document.querySelectorAll(".questions");

        questions.forEach(question => {
            let options = question.querySelectorAll(".options li");
            let explanation = question.querySelector(".explanation");

            options.forEach(option => {
                option.addEventListener("click", () => {
                    // Disable further clicks on options
                    options.forEach(opt => {
                        opt.style.pointerEvents = "none";
                    });

                    // Highlight the correct and incorrect options
                    if (option.getAttribute("data-correct") === "true") {
                        option.classList.add("correct");
                    } else {
                        option.classList.add("wrong");
                        options.forEach(opt => {
                            if (opt.getAttribute("data-correct") === "true") {
                                opt.classList.add("correct");
                            }
                        });
                    }

                    // Display the explanation
                    explanation.style.display = "block";
                });
            });
        });
    }

    // Initialize numbering and interactions
    initializeQuestionNumbering();
    initializeQuestionInteractions();
