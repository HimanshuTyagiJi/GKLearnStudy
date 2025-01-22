
const questions = document.querySelectorAll(".questions");

// Function to get page number from the URL
function getPageNumber() {
    const url = window.location.href;
    const match = url.match(/\/page(\d+)/); // Matches /pageX (e.g., /page1, /page2)
    return match ? parseInt(match[1]) : 1; // Default to 1 if no page is found
}

// Function to auto-number the questions based on the starting number
function autoNumberQuestions(startingNumber) {
    let questionNumber = startingNumber;
    questions.forEach((question) => {
        const questionTitle = question.querySelector("h3");
        questionTitle.textContent = `Q-${questionNumber}: ${questionTitle.textContent}`;
        questionNumber++;
    });
}

// Get the current page number
const pageNumber = getPageNumber();

// Calculate the starting question number for the current page
const startingNumber = (pageNumber - 1) * 30 + 1;

// Apply numbering to questions
autoNumberQuestions(startingNumber);

// Add event listeners for options and show explanation
questions.forEach((question) => {
    const options = question.querySelectorAll(".options li");
    const explanation = question.querySelector(".explanation");

    options.forEach((option) => {
        option.addEventListener("click", () => {
            options.forEach((opt) => {
                opt.style.pointerEvents = "none"; // Disable all options after a click
            });

            if (option.getAttribute("data-correct") === "true") {
                option.classList.add("correct");
            } else {
                option.classList.add("wrong");
                options.forEach((opt) => {
                    if (opt.getAttribute("data-correct") === "true") {
                        opt.classList.add("correct");
                    }
                });
            }

            explanation.style.display = "block";
        });
    });
});
