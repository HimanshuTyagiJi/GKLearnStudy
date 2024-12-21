// Number of questions per page
const QUESTIONS_PER_PAGE = 25;

// Function to get the current page number from the URL
function getCurrentPage() {
    const match = location.pathname.match(/page(\d+)\.html/);
    return match ? parseInt(match[1], 10) : 1;
}

// Function to calculate total number of pages dynamically
function calculateTotalPages(totalQuestions) {
    return Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
}

// Function to auto-number questions based on the current page
function autoNumberQuestions() {
    const currentPage = getCurrentPage();
    const questions = document.querySelectorAll('.questions');
    const startingQuestionNumber = (currentPage - 1) * QUESTIONS_PER_PAGE + 1;

    questions.forEach((question, index) => {
        const questionHeader = question.querySelector('h3');
        const questionNumber = startingQuestionNumber + index; // Sequential number
        questionHeader.innerHTML = `Q-${questionNumber}: ${questionHeader.innerHTML}`;
    });
}

// Function to set up pagination dynamically
function setupQuizPagination(totalQuestions) {
    const paginationContainer = document.querySelector('.pagination');
    const totalPages = calculateTotalPages(totalQuestions);
    const currentPage = getCurrentPage();

    const paginationList = document.createElement('div');
    paginationList.classList.add('pagination-list');

    for (let page = 1; page <= totalPages; page++) {
        const link = document.createElement('a');
        link.href = `page${page}.html`; // Link to the respective page
        link.textContent = `Page ${page}`;
        link.classList.add('page-link');
        if (page === currentPage) {
            link.classList.add('active');
        }
        paginationList.appendChild(link);
    }

    paginationContainer.innerHTML = ''; // Clear existing pagination
    paginationContainer.appendChild(paginationList);
}

// Initialize the quiz page
document.addEventListener('DOMContentLoaded', () => {
    const totalQuestions = document.querySelectorAll('.questions').length;
    autoNumberQuestions();
    setupQuizPagination(totalQuestions);
});
