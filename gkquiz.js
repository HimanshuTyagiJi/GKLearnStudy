// gkquiz.js

// Initialize an empty array to store all questions
let questionsArray = [];

// Function to auto-number questions
function autoNumberQuestions() {
    const questions = document.querySelectorAll('.questions');
    questions.forEach((question, index) => {
        const questionNumber = questionsArray.length + index + 1; // Total questions so far + index + 1 for current question
        const questionHeader = question.querySelector('h3');
        questionHeader.innerHTML = `Q-${questionNumber}: ${questionHeader.innerHTML}`;
    });
    questionsArray = questionsArray.concat(Array.from(questions)); // Append the current page's questions to the global array
}

// Function to set up pagination
function setupQuizPage(currentPage, totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    const paginationList = document.createElement('div');
    paginationList.classList.add('pagination-list');

    const createPageLink = (pageNumber, isActive = false) => {
        const link = document.createElement('a');
        link.href = `page${pageNumber}.html`; // Adjust this according to your page structure
        link.textContent = pageNumber;
        link.classList.add('page-link');
        if (isActive) {
            link.classList.add('active');
        }
        return link;
    };

    // Always show the first page
    paginationList.appendChild(createPageLink(1));

    // Previous pages (up to 2 before current)
    for (let i = Math.max(2, currentPage - 2); i < currentPage; i++) {
        paginationList.appendChild(createPageLink(i));
    }

    // Current page
    paginationList.appendChild(createPageLink(currentPage, true));

    // Next pages (up to 2 after current)
    for (let i = currentPage + 1; i <= Math.min(totalPages, currentPage + 2); i++) {
        paginationList.appendChild(createPageLink(i));
    }

    // Last page if it's greater than the first
    if (totalPages > 1) {
        paginationList.appendChild(createPageLink(totalPages));
    }

    paginationContainer.innerHTML = ''; // Clear existing pagination
    paginationContainer.appendChild(paginationList);
}

// Initialize the quiz page
document.addEventListener('DOMContentLoaded', () => {
    // Extract current page number from the URL
    const currentPage = parseInt(location.pathname.match(/page(\d+)\.html/)?.[1], 10);
    
    // Count the total number of pages
    const totalPages = document.querySelectorAll('.questions').length > 0 ? document.querySelectorAll('.questions').length : 1;

    autoNumberQuestions();
    setupQuizPage(currentPage, totalPages);
});
