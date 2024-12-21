// Global variable to track the total number of questions
let globalQuestionCount = 0;

// Function to auto-number questions
function autoNumberQuestions() {
    const questions = document.querySelectorAll('.questions');
    questions.forEach((question) => {
        const questionHeader = question.querySelector('h3');
        globalQuestionCount += 1; // Increment the global question count
        questionHeader.innerHTML = `Q-${globalQuestionCount}: ${questionHeader.innerHTML}`;
    });
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

// Function to load global question count from localStorage
function loadGlobalQuestionCount() {
    const storedCount = localStorage.getItem('globalQuestionCount');
    return storedCount ? parseInt(storedCount, 10) : 0;
}

// Function to save global question count to localStorage
function saveGlobalQuestionCount() {
    localStorage.setItem('globalQuestionCount', globalQuestionCount);
}

// Initialize the quiz page
document.addEventListener('DOMContentLoaded', () => {
    // Load the global question count
    globalQuestionCount = loadGlobalQuestionCount();

    // Extract current page number from the URL
    const currentPage = parseInt(location.pathname.match(/page(\d+)\.html/)?.[1], 10) || 1;

    // Total pages (you might want to dynamically determine this)
    const totalPages = 5; // Adjust this value based on your pagination structure

    autoNumberQuestions();
    saveGlobalQuestionCount(); // Save the updated question count to localStorage
    setupQuizPage(currentPage, totalPages);
});
