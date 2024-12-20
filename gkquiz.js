// gkquiz.js

// Function to set up pagination
function setupQuizPage(currentPage, totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    const paginationList = document.createElement('div');
    paginationList.classList.add('pagination-list');

    const createPageLink = (pageNumber, isActive = false) => {
        const link = document.createElement('a');
        link.href = `page${pageNumber}.html`;
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

    // Adjust styles for pagination
    const buttons = paginationList.querySelectorAll('.page-link');
    buttons.forEach(button => {
        button.style.margin = '0 5px';
        button.style.padding = '5px 10px';
        button.style.backgroundColor = '#007BFF';
        button.style.color = 'white';
        button.style.borderRadius = '5px';
        button.style.textDecoration = 'none';
        button.style.transition = 'background-color 0.3s ease';
    });
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#0056b3';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#007BFF';
        });
    });
}

// Function to auto-number questions
function autoNumberQuestions() {
    const questions = document.querySelectorAll('.questions h3');
    questions.forEach((question, index) => {
        question.innerHTML = `Q-${index + 1}: ${question.innerHTML}`;
    });
}

// Initialize the quiz page
document.addEventListener('DOMContentLoaded', () => {
    // Extract current page number from the URL
    const currentPage = parseInt(location.pathname.match(/page(\d+)\.html/)[1], 10);
    const totalPages = 50; // Set total number of pages

    setupQuizPage(currentPage, totalPages);
    autoNumberQuestions();
});
