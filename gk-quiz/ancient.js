// Function to get page number from the URL
function getPageNumber() {
    // Get page number from the current URL
    const url = window.location.href; // Current page URL
    const pageMatch = url.match(/page(\d+)/); // Extract the number after 'page' in the URL

    // Return the page number if found, otherwise return default 1
    return pageMatch ? parseInt(pageMatch[1]) : 1;
}

// Function for auto-numbering questions from the starting number
function autoNumberQuestions(startNumber) {
    // Get all questions
    const questions = document.querySelectorAll('.questions');

    // Set the starting number
    let questionNumber = startNumber;

    // Set the number for each question
    questions.forEach((question) => {
        question.querySelector('h3').textContent = `Q-${questionNumber}: ${question.querySelector('h3').textContent}`;
        questionNumber++;
    });
}

// Main code
const pageNumber = getPageNumber();
let startingNumber = 1; // Default starting number

// Set the starting number based on the page number
if (pageNumber === 1) {
    startingNumber = 1; // Start from 1 for page 1
} else if (pageNumber === 2) {
    startingNumber = 31; // Start from 31 for page 2
} else {
    startingNumber = (pageNumber - 1) * 31 + 1; // Increment for pages 3 to 20
}

// Display questions
autoNumberQuestions(startingNumber);

// Add CSS styles
const styles = `
    .paginations {
        justify-content: center;
        text-align: center;
        margin: 20px 0;
        display: flex; /* Make the container flex */
        flex-wrap: wrap; /* Allow wrapping */
    }
    .paginations a:link, 
    .paginations a:visited {
        color: white; /* Make visited links white */
    }
    .button {
        display: inline-block;
        margin: 0 5px; /* Reduced margin for smaller screens */
        padding: 5px 10px;
        font-size: 16px;
        color: white;
        background-color: #007BFF;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }
    .button:hover {
        background-color: #0056b3;
        transform: scale(1.05);
    }
    .button.active {
        background-color: green;
    }
    .active {
        pointer-events: none; /* Disable click on active page */
    }
`;

// Create a style element
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Total number of pages
const totalPages = 20;

// Get the current page from the URL
const url = window.location.href;
const currentPage = parseInt(url.match(/page(\d+)/)?.[1]) || 1;

function renderPagination(currentPage, totalPages) {
    const paginationContainer = document.querySelector('.paginations');
    paginationContainer.innerHTML = ''; // Clear previous pagination

    // Check if the URL does not contain 'page'
    const baseLink = url.includes('page') ? `https://gklearnstudy.in/gk-quiz/ancient-indian-history/page` : `https://gklearnstudy.in/gk-quiz/ancient-indian-history`;

    // Check if on the first page
    const firstPageLink = document.createElement('a');
    firstPageLink.href = `${baseLink}/page1`;
    firstPageLink.innerText = 'First';
    firstPageLink.className = 'button';
    if (currentPage === 1) {
        firstPageLink.classList.add('active');
    }
    paginationContainer.appendChild(firstPageLink);

    // Calculate the range of pages to show
    const range = 2; // Number of pages to show around the current page
    let startPage = Math.max(2, currentPage - range); // Start from 2 if not on the first page
    let endPage = Math.min(totalPages - 1, currentPage + range); // End before last page if not on it

    // Ensure the range is always 5 pages
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
        pageLink.href = `${baseLink}/page${i}`;
        pageLink.innerText = i;
        pageLink.className = 'button';
        if (i === currentPage) {
            pageLink.classList.add('active'); // Mark as active
        }
        paginationContainer.appendChild(pageLink);
    }

    // Check if on the last page
    const lastPageLink = document.createElement('a');
    lastPageLink.href = `${baseLink}/page${totalPages}`;
    lastPageLink.innerText = 'Last';
    lastPageLink.className = 'button';
    if (currentPage === totalPages) {
        lastPageLink.classList.add('active');
    }
    paginationContainer.appendChild(lastPageLink);
}

// Render the pagination on page load
renderPagination(currentPage, totalPages);
