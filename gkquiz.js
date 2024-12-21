// Helper function: पिछले सभी पेजों के सवाल गिनें
function countQuestionsOnPreviousPages() {
    const pageMatch = location.pathname.match(/page(\d+)\.html/);
    if (!pageMatch) return 0;

    const currentPageNumber = parseInt(pageMatch[1], 10);
    let totalQuestions = 0;

    for (let i = 1; i < currentPageNumber; i++) {
        // हर पेज का URL बनाएं
        const pageUrl = `page${i}.html`;

        // Synchronous request (क्योंकि सवाल गिनने हैं)
        const xhr = new XMLHttpRequest();
        xhr.open("GET", pageUrl, false); // `false` -> synchronous request
        xhr.send();

        if (xhr.status === 200) {
            // जवाब से सवाल गिनें
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = xhr.responseText;

            const questions = tempDiv.querySelectorAll(".questions");
            totalQuestions += questions.length;
        }
    }

    return totalQuestions;
}

// Helper function: सवालों की नंबरिंग सेट करें
function setQuestionNumbers(startFrom) {
    const questions = document.querySelectorAll(".questions h3");
    questions.forEach((question, index) => {
        question.textContent = `Q-${startFrom + index + 1}: ${question.textContent}`;
    });
}

// Helper function: Pagination सेट करें
function setupPagination() {
    const paginationDiv = document.getElementById("pagination");

    // पहले और बाद के पेज के लिए लिंक बनाएं
    const pageMatch = location.pathname.match(/page(\d+)\.html/);
    const currentPageNumber = pageMatch ? parseInt(pageMatch[1], 10) : 1;

    // Previous Page Link
    if (currentPageNumber > 1) {
        const prevLink = document.createElement("a");
        prevLink.href = `page${currentPageNumber - 1}.html`;
        prevLink.textContent = "Previous";
        paginationDiv.appendChild(prevLink);
    }

    // Current Page
    const currentPage = document.createElement("span");
    currentPage.textContent = ` Page ${currentPageNumber} `;
    paginationDiv.appendChild(currentPage);

    // Next Page Link
    const nextLink = document.createElement("a");
    nextLink.href = `page${currentPageNumber + 1}.html`;
    nextLink.textContent = "Next";
    paginationDiv.appendChild(nextLink);
}

// Main Function
(function main() {
    const previousQuestionsCount = countQuestionsOnPreviousPages();
    setQuestionNumbers(previousQuestionsCount);
    setupPagination();
})();
