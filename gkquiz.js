// gkquiz.js

// Store the number of questions on each page
const questionsPerPage = [5, 20, 10, 15, 30]; // Example: Number of questions on each page
let totalQuestions = questionsPerPage.reduce((a, b) => a + b, 0); // Total questions across all pages

// Function to set up pagination
function setupQuizPage(currentPage, totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    const paginationList = document.createElement('div');
    paginationList.classList.add('pagination-list');

    const createPageLink = (pageNumber, isActive = false) => {
        const link = document.createElement('a');
        link.href = `page${pageNumber}.html`; // Update this to your actual page URL structure
        link.textContent = pageNumber;
        link.classList.add('page-link');
        if (isActive) {
            link.classList.add('active');
        }
        return link;
    };

    // First Page
    paginationList.appendChild(createPageLink(1));

    // Previous Pages
    for (let i = Math.max(2, currentPage - 2); i < currentPage; i++) {
        paginationList.appendChild(createPageLink(i));
    }

    // Current Page
    paginationList.appendChild(createPageLink(currentPage, true));

    // Next Pages
    for (let i = currentPage + 1; i <= Math.min(totalPages, currentPage + 2); i++) {
        paginationList.appendChild(createPageLink(i));
    }

    // Last Page
    if (totalPages > 1) {
        paginationList.appendChild(createPageLink(totalPages));
    }

    paginationContainer.innerHTML = ''; // Clear existing pagination
    paginationContainer.appendChild(paginationList);
}

// Function to auto-number questions
function autoNumberQuestions(currentPage) {
    const questions = document.querySelectorAll('.questions');
    let questionCounter = 0;

    // Calculate the starting number based on the current page
    for (let i = 0; i < currentPage - 1; i++) {
        questionCounter += questionsPerPage[i]; // Increment counter by the number of questions in previous pages
    }

    questions.forEach((question, index) => {
        const questionNumber = questionCounter + index + 1;
        const questionHeader = question.querySelector('h3');
        questionHeader.innerHTML = `Q-${questionNumber}: ${questionHeader.innerHTML}`;
    });
}

// Initialize the quiz page
document.addEventListener('DOMContentLoaded', () => {
    // Extract current page number from the URL
    const currentPage = parseInt(location.pathname.match(/page(\d+)\.html/)?.[1], 10);
    const totalPages = questionsPerPage.length; // Total pages based on the questionsPerPage array

    setupQuizPage(currentPage, totalPages);
    autoNumberQuestions(currentPage);
});
