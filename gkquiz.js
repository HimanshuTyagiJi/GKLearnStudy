// Dynamic configuration for pages per folder
const folderPageConfig = {
    'gk-quiz/ancient-indian-history.html': 20,  // प्राचीन में 20 प्रश्न प्रति पृष्ठ
    'gk-quiz/ancient.html': 10, // प्राचीन में 10 प्रश्न प्रति पृष्ठ
    'gk-quiz/hello.html': 9     // हेलो में 9 प्रश्न प्रति पृष्ठ
};

// Function to get the current folder and file
function getCurrentFolder() {
    const url = window.location.pathname;
    const match = url.match(/gk-quiz\/[^/]+\.html/);
    return match ? match[0] : null;
}

// Get the current page number from the URL
function getPageNumber() {
    const url = window.location.href;
    const pageMatch = url.match(/page(\d+)/);
    return pageMatch ? parseInt(pageMatch[1]) : 1;
}

// Function to dynamically calculate the total pages
function getTotalPages() {
    const folder = getCurrentFolder();
    return folder ? folderPageConfig[folder] || 1 : 1;
}

// Function to render pagination
function renderPagination(currentPage, totalPages) {
    const paginationContainer = document.querySelector('.paginations');
    paginationContainer.innerHTML = ''; // Clear previous pagination

    // First Page Link
    const firstPageLink = document.createElement('a');
    firstPageLink.href = `page1`;
    firstPageLink.innerText = 'First';
    firstPageLink.className = 'button';
    if (currentPage === 1) {
        firstPageLink.classList.add('active');
    }
    paginationContainer.appendChild(firstPageLink);

    // Calculate range for pagination
    const range = 2;
    let startPage = Math.max(2, currentPage - range);
    let endPage = Math.min(totalPages - 1, currentPage + range);

    // Adjust range to maintain 5 pages if possible
    if (endPage - startPage < 4) {
        if (startPage === 2) {
            endPage = Math.min(totalPages - 1, startPage + 4);
        } else if (endPage === totalPages - 1) {
            startPage = Math.max(2, endPage - 4);
        }
    }

    // Create page links
    for (let i = startPage; i <= endPage; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = `page${i}`;
        pageLink.innerText = i;
        pageLink.className = 'button';
        if (i === currentPage) {
            pageLink.classList.add('active');
        }
        paginationContainer.appendChild(pageLink);
    }

    // Last Page Link
    const lastPageLink = document.createElement('a');
    lastPageLink.href = `page${totalPages}`;
    lastPageLink.innerText = 'Last';
    lastPageLink.className = 'button';
    if (currentPage === totalPages) {
        lastPageLink.classList.add('active');
    }
    paginationContainer.appendChild(lastPageLink);
}

// Function to auto-number questions based on page
function autoNumberQuestions(startNumber) {
    const questions = document.querySelectorAll('.questions');
    let questionNumber = startNumber;
    questions.forEach((question) => {
        const questionHeader = question.querySelector('h3');
        if (questionHeader) {
            questionHeader.textContent = `Q-${questionNumber}: ${questionHeader.textContent}`;
            questionNumber++;
        }
    });
}

// Main Code Execution
const currentPage = getPageNumber();
const totalPages = getTotalPages();
const questionsPerPage = folderPageConfig[getCurrentFolder()] || 1;

// Calculate starting question number
const startingNumber = (currentPage - 1) * questionsPerPage + 1;

// Display questions and pagination
autoNumberQuestions(startingNumber);
renderPagination(currentPage, totalPages);
