
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Helper: Get Current Page Number from URL
    // Supports patterns like '...-part-2.html'
    function getPageNumber() {
        let path = window.location.pathname;
        let match = path.match(/-part-(\d+)\.html$/);
        
        if (match) {
            return parseInt(match[1]);
        }
        // Default to page 1 if no part number found
        return 1;
    }

    // 2. Logic: Determine Starting Question Number
    // owner2.html uses QUESTIONS_PER_PAGE = 5
    function getStartingNumber() {
        const QUESTIONS_PER_PAGE = 5; 
        const pageNumber = getPageNumber();
        return ((pageNumber - 1) * QUESTIONS_PER_PAGE) + 1;
    }

    // 3. Apply Numbering to Questions
    function autoNumberQuestions() {
        let questionElements = document.querySelectorAll(".questions");
        let currentNum = getStartingNumber();

        questionElements.forEach(question => {
            const titleEl = question.querySelector("h3");
            // Remove any existing prefix like "Q-1: " to avoid double prefixing
            let text = titleEl.textContent.replace(/^Q-\d+:\s*/, '');
            
            titleEl.textContent = `Q-${currentNum}: ${text}`;
            currentNum++;
        });
    }

    // 4. Initialize Interactive Features (Click to show answer)
    function initializeQuestionInteractions() {
        const questions = document.querySelectorAll(".questions");

        questions.forEach(question => {
            let options = question.querySelectorAll(".options li");
            let explanation = question.querySelector(".explanation");

            options.forEach(option => {
                option.addEventListener("click", () => {
                    // Disable clicks after first selection
                    options.forEach(opt => opt.style.pointerEvents = "none");

                    // Check answer
                    if (option.getAttribute("data-correct") === "true") {
                        option.classList.add("correct");
                    } else {
                        option.classList.add("wrong");
                        // Highlight real answer
                        options.forEach(opt => {
                            if (opt.getAttribute("data-correct") === "true") {
                                opt.classList.add("correct");
                            }
                        });
                    }

                    // Show Explanation
                    if(explanation) explanation.style.display = "block";
                });
            });
        });
    }

    // Run
    autoNumberQuestions();
    initializeQuestionInteractions();
});
