// URL से पृष्ठ संख्या प्राप्त करने के लिए फ़ंक्शन
function getPageNumber() {
    // वर्तमान URL से पृष्ठ संख्या प्राप्त करें
    const url = window.location.href; // वर्तमान पृष्ठ का URL
    const pageMatch = url.match(/page(\d+)/); // URL में 'page' के बाद की संख्या निकालें

    // यदि पृष्ठ संख्या मिली तो उसे लौटाएं, अन्यथा डिफ़ॉल्ट 1 लौटाएं
    return pageMatch ? parseInt(pageMatch[1]) : 1;
}

// प्रारंभिक संख्या से क्रमांकित प्रश्नों के लिए फ़ंक्शन
function autoNumberQuestions(startNumber) {
    // सभी प्रश्नों को प्राप्त करें
    const questions = document.querySelectorAll('.questions');

    // प्रारंभिक संख्या सेट करें
    let questionNumber = startNumber;

    // प्रत्येक प्रश्न के लिए क्रमांक सेट करें
    questions.forEach((question) => {
        question.querySelector('h3').textContent = `Q-${questionNumber}: ${question.querySelector('h3').textContent}`;
        questionNumber++;
    });
}

// मुख्य कोड
const pageNumber = getPageNumber();
let startingNumber = 1; // Default starting number

// पृष्ठ संख्या के आधार पर प्रारंभिक संख्या सेट करें
if (pageNumber === 1) {
    startingNumber = 1; // page1 के लिए 1 से प्रारंभ करें
} else if (pageNumber === 2) {
    startingNumber = 31; // page2 के लिए 31 से प्रारंभ करें
} else {
    startingNumber = (pageNumber - 1) * 31 + 1; // page3 से page20 के लिए 5 से बढ़ते हुए क्रमांकित करें
}

// प्रश्नों को प्रदर्शित करें
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

    // Check if on the first page
    const firstPageLink = document.createElement('a');
    firstPageLink.href = `page1`;
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
        pageLink.href = `page${i}`;
        pageLink.innerText = i;
        pageLink.className = 'button';
        if (i === currentPage) {
            pageLink.classList.add('active'); // Mark as active
        }
        paginationContainer.appendChild(pageLink);
    }

    // Check if on the last page
    const lastPageLink = document.createElement('a');
    lastPageLink.href = `page${totalPages}`;
    lastPageLink.innerText = 'Last';
    lastPageLink.className = 'button';
    if (currentPage === totalPages) {
        lastPageLink.classList.add('active');
    }
    paginationContainer.appendChild(lastPageLink);
}

// Render the pagination on page load
renderPagination(currentPage, totalPages);
