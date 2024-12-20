// gkquiz.js

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
function autoNumberQuestions() {
    const questions = document.querySelectorAll('.questions');
    questions.forEach((question, index) => {
        const questionHeader = question.querySelector('h3');
        questionHeader.innerHTML = `Q-${index + 1}: ${questionHeader.innerHTML}`;
    });
}

// Initialize the quiz page
document.addEventListener('DOMContentLoaded', () => {
    // Extract current page number from the URL
    const currentPage = parseInt(location.pathname.match(/page(\d+)\.html/)?.[1], 10);
    const totalPages = 50; // Set total number of pages dynamically based on your content

    setupQuizPage(currentPage, totalPages);
    autoNumberQuestions();
});
