

    // Function to extract page information from the URL
    function getPageNumber() {
        let url = window.location.href;
        
        // Match '/pageX' in the URL
        let match = url.match(/\/page(\d+)/);
        
        // If '/pageX' exists, return its number, else return 0 (indicating '/gk/ancient')
        return match ? parseInt(match[1]) : 0;
    }

    // Function to determine the starting number based on the URL
    function getStartingNumber() {
        const pageNumber = getPageNumber(); // Get the current page number
        
        if (pageNumber === 0) {
            // Default case for '/gk/ancient': Questions 1-30
            return 1;
        } else {
            // For '/pageX': Calculate starting number dynamically
            return (pageNumber * 30) + 1;
        }
    }

    // Function to auto-number the questions
    function autoNumberQuestions(startNumber) {
        let questionElements = document.querySelectorAll(".questions");
        let questionNumber = startNumber;

        questionElements.forEach(question => {
            question.querySelector("h3").textContent = `Q-${questionNumber}: ${question.querySelector("h3").textContent}`;
            questionNumber++;
        });
    }

    // Function to initialize question interactions
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

    // Initialize the script
    const startingNumber = getStartingNumber(); // Determine the starting question number
    autoNumberQuestions(startingNumber); // Auto-number questions
    initializeQuestionInteractions(); // Set up interactions




document.addEventListener('DOMContentLoaded', () => {
    const link = "https://gklearnstudy.in/gk-quiz.html"; // The specific link to activate
    const el = document.querySelector(`a[href="${link}"]`); // Select the anchor tag with the given href

    if (el) {
        // Function to update the link's color based on the theme
        const updateColor = () => {
            el.style.color = document.documentElement.getAttribute("data-theme") === "dark" ? "yellow" : "#B30000";
        };

        // Update the color initially
        updateColor();

        // Observe changes to the 'data-theme' attribute
        new MutationObserver(updateColor).observe(document.documentElement, { 
            attributes: true, 
            attributeFilter: ["data-theme"] 
        });

        // Optionally, you can also add the 'active' class for styling purposes
        el.classList.add("active");
    }
});



