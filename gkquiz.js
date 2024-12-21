// Function to get the current page number from the URL
function getCurrentPage() {
    const match = location.pathname.match(/page(\d+)\.html/);
    return match ? parseInt(match[1], 10) : 1;
}

// Function to auto-number questions based on the current page
function autoNumberQuestions() {
    const currentPage = getCurrentPage();
    const questions = document.querySelectorAll('.questions');
    const startingQuestionNumber = calculateStartingQuestionNumber(currentPage);

    questions.forEach((question, index) => {
        const questionHeader = question.querySelector('h3');
        const questionNumber = startingQuestionNumber + index; // Sequential number
        questionHeader.innerHTML = `Q-${questionNumber}: ${questionHeader.innerHTML}`;
    });
}

// Function to calculate the starting question number for the current page
function calculateStartingQuestionNumber(currentPage) {
    let totalQuestions = 0;

    // Simulate the number of questions on previous pages
    for (let page = 1; page < currentPage; page++) {
        const pageQuestions = getQuestionsCountForPage(page);
        totalQuestions += pageQuestions;
    }

    return totalQuestions + 1; // Starting number for the current page
}

// Function to retrieve the number of questions on a specific page
// This function simulates the data; replace it with dynamic data if available
function getQuestionsCountForPage(page) {
    const questionsPerPage = {
        1: 25, // Page 1 has 25 questions
        2: 10, // Page 2 has 10 questions
        3: 5,  // Page 3 has 5 questions
        // Add more pages as needed
    };

    return questionsPerPage[page] || 0; // Default to 0 if page not defined
}

// Function to set up pagination dynamically
function setupQuizPagination() {
    const paginationContainer = document.querySelector('.pagination');
    const totalPages = Object.keys(getQuestionsCountForPage).length; // Get the total pages
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
    autoNumberQuestions();
    setupQuizPagination();
});
