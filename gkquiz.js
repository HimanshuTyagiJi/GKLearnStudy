// Number of questions per page
const QUESTIONS_PER_PAGE = 25;

// Function to get the current page number from the URL
function getCurrentPage() {
    const match = location.pathname.match(/page(\d+)\.html/);
    return match ? parseInt(match[1], 10) : 1; // Default to 1 if no match
}

// Function to calculate total number of pages dynamically
function calculateTotalPages(totalQuestions) {
    return Math.ceil(totalQuestions / QUESTIONS_PER_PAGE); // Total pages calculation
}

// Function to auto-number questions based on the current page
function autoNumberQuestions() {
    const currentPage = getCurrentPage(); // Get current page number
    const questions = document.querySelectorAll('.questions'); // Select all question elements
    const startingQuestionNumber = (currentPage - 1) * QUESTIONS_PER_PAGE + 1; // Calculate starting number based on page

    questions.forEach((question, index) => {
        const questionHeader = question.querySelector('h3'); // Assuming question header is in <h3>
        const questionNumber = startingQuestionNumber + index; // Sequential number based on current page
        questionHeader.innerHTML = `Q-${questionNumber}: ${questionHeader.innerHTML}`; // Update the header with question number
    });
}

// Function to set up pagination dynamically
function setupQuizPagination(totalQuestions) {
    const paginationContainer = document.querySelector('.pagination'); // Select pagination container
    const totalPages = calculateTotalPages(totalQuestions); // Get total pages
    const currentPage = getCurrentPage(); // Get current page number

    const paginationList = document.createElement('div');
    paginationList.classList.add('pagination-list');

    for (let page = 1; page <= totalPages; page++) {
        const link = document.createElement('a');
        link.href = `page${page}.html`; // Link to the respective page
        link.textContent = `Page ${page}`; // Display page number
        link.classList.add('page-link');
        if (page === currentPage) {
            link.classList.add('active'); // Highlight the current page
        }
        paginationList.appendChild(link); // Append link to pagination
    }

    paginationContainer.innerHTML = ''; // Clear existing pagination
    paginationContainer.appendChild(paginationList); // Add new pagination
}

// Initialize the quiz page
document.addEventListener('DOMContentLoaded', () => {
    const totalQuestions = document.querySelectorAll('.questions').length; // Count total questions
    autoNumberQuestions(); // Call function to number questions
    setupQuizPagination(totalQuestions); // Setup pagination
});
