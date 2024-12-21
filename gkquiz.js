// सभी सवालों की संख्या ट्रैक करने के लिए
const allPagesQuestionsCount = {
    "page1": 0, // Page 1 में 2 सवाल हैं
    "page2": 2, // Page 2 में 2 सवाल हैं
    // अन्य पृष्ठ जोड़ें, जैसे:
    // "page3": 3,
};

// वर्तमान पृष्ठ का नाम निकालें
const currentPage = location.pathname.match(/page(\d+)\.html/);
const currentPageKey = currentPage ? `page${currentPage[1]}` : "page1";

// पिछले पेज के सभी सवालों की संख्या
let totalQuestionsBeforeCurrentPage = 0;
Object.keys(allPagesQuestionsCount).forEach((pageKey) => {
    if (pageKey === currentPageKey) return; // वर्तमान पृष्ठ पर रुकें
    totalQuestionsBeforeCurrentPage += allPagesQuestionsCount[pageKey];
});

// प्रश्नों की सही संख्या सेट करें
function setQuestionNumbers() {
    const questions = document.querySelectorAll('.questions h3');
    questions.forEach((question, index) => {
        const questionNumber = totalQuestionsBeforeCurrentPage + index + 1;
        question.textContent = `Q-${questionNumber}: ${question.textContent}`;
    });
}

// पृष्ठ संख्या प्रदर्शित करें
function setupPagination() {
    const paginationDiv = document.getElementById('pagination');
    const totalPages = Object.keys(allPagesQuestionsCount).length;

    for (let i = 1; i <= totalPages; i++) {
        const link = document.createElement('a');
        link.href = `page${i}.html`;
        link.textContent = `Page ${i}`;
        if (`page${i}` === currentPageKey) {
            link.style.fontWeight = 'bold'; // वर्तमान पृष्ठ हाइलाइट करें
        }
        paginationDiv.appendChild(link);
        paginationDiv.appendChild(document.createTextNode(" | "));
    }
}

// सभी कार्य करें
setQuestionNumbers();
setupPagination();
