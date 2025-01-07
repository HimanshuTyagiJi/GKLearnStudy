// 1. फोल्डर और उनके प्रश्नों की संख्या का कॉन्फ़िगरेशन
const folderPageConfig = {
    'gk-quiz/Ancient-Indian-History.html': 20, // प्रति पृष्ठ 20 प्रश्न
    'gk-quiz/ancient.html': 10, // प्रति पृष्ठ 10 प्रश्न
    'gk-quiz/hello.html': 9,    // प्रति पृष्ठ 9 प्रश्न
};

// 2. URL से फोल्डर का नाम प्राप्त करने का फ़ंक्शन
function getFolderName() {
    const url = window.location.pathname; // वर्तमान URL का path प्राप्त करें
    const folderMatch = url.match(/gk-quiz\/[^/]+/); // 'gk-quiz' और उसके बाद का नाम निकालें
    return folderMatch ? folderMatch[0] : null; // फोल्डर का नाम लौटाएं या null
}

// 3. URL से पृष्ठ संख्या प्राप्त करने का फ़ंक्शन
function getPageNumber() {
    const url = window.location.href; // वर्तमान पृष्ठ का URL
    const pageMatch = url.match(/page(\d+)/); // 'page' के बाद की संख्या निकालें
    return pageMatch ? parseInt(pageMatch[1]) : 1; // यदि संख्या मिले तो लौटाएं, अन्यथा 1
}

// 4. प्रारंभिक प्रश्न संख्या की गणना करने का फ़ंक्शन
function calculateStartingNumber(folder, currentPage) {
    const questionsPerPage = folderPageConfig[folder] || 20; // Default 20 प्रश्न
    return (currentPage - 1) * questionsPerPage + 1; // प्रारंभिक संख्या की गणना
}

// 5. सभी प्रश्नों को क्रमांकित करने का फ़ंक्शन
function autoNumberQuestions(startNumber) {
    const questions = document.querySelectorAll('.questions'); // सभी प्रश्न प्राप्त करें
    let questionNumber = startNumber; // प्रारंभिक संख्या सेट करें

    questions.forEach((question) => {
        question.querySelector('h3').textContent = `Q-${questionNumber}: ${question.querySelector('h3').textContent}`;
        questionNumber++;
    });
}

// 6. पेजिनेशन रेंडर करने का फ़ंक्शन
function renderPagination(currentPage, totalPages) {
    const paginationContainer = document.querySelector('.paginations');
    paginationContainer.innerHTML = ''; // पहले के पेजिनेशन को साफ करें

    // पहली पृष्ठ लिंक
    const firstPageLink = document.createElement('a');
    firstPageLink.href = `?page1`;
    firstPageLink.innerText = 'First';
    firstPageLink.className = 'button';
    if (currentPage === 1) {
        firstPageLink.classList.add('active');
    }
    paginationContainer.appendChild(firstPageLink);

    // पृष्ठ सीमा की गणना
    const range = 2; // वर्तमान पृष्ठ के आसपास दिखाने वाले पृष्ठों की संख्या
    let startPage = Math.max(2, currentPage - range);
    let endPage = Math.min(totalPages - 1, currentPage + range);

    // मध्य पृष्ठ लिंक
    for (let i = startPage; i <= endPage; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = `?page${i}`;
        pageLink.innerText = i;
        pageLink.className = 'button';
        if (i === currentPage) {
            pageLink.classList.add('active');
        }
        paginationContainer.appendChild(pageLink);
    }

    // अंतिम पृष्ठ लिंक
    const lastPageLink = document.createElement('a');
    lastPageLink.href = `?page${totalPages}`;
    lastPageLink.innerText = 'Last';
    lastPageLink.className = 'button';
    if (currentPage === totalPages) {
        lastPageLink.classList.add('active');
    }
    paginationContainer.appendChild(lastPageLink);
}

// 7. मुख्य कोड
const currentFolder = getFolderName(); // फोल्डर का नाम प्राप्त करें
const currentPage = getPageNumber();  // पृष्ठ संख्या प्राप्त करें

if (!currentFolder) {
    console.error('Folder name not found in the URL');
} else {
    const startingNumber = calculateStartingNumber(currentFolder, currentPage); // प्रारंभिक संख्या की गणना
    autoNumberQuestions(startingNumber); // प्रश्नों को क्रमांकित करें

    // कुल प्रश्न और पृष्ठ संख्या की गणना
    const questionsPerPage = folderPageConfig[currentFolder];
    const totalQuestions = 200; // उदाहरण के लिए कुल प्रश्न
    const totalPages = Math.ceil(totalQuestions / questionsPerPage);

    renderPagination(currentPage, totalPages); // पेजिनेशन रेंडर करें
}

// 8. पेजिनेशन के लिए CSS
const styles = `
    .paginations {
        justify-content: center;
        text-align: center;
        margin: 20px 0;
        display: flex;
        flex-wrap: wrap;
    }
    .paginations a:link, 
    .paginations a:visited {
        color: white;
    }
    .button {
        display: inline-block;
        margin: 0 5px;
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
        pointer-events: none;
    }
`;

// CSS जोड़ें
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
