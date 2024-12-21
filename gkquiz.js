// URL से पृष्ठ संख्या प्राप्त करने के लिए फ़ंक्शन
function getPageNumber() {
    // URL से पृष्ठ संख्या प्राप्त करें (उदाहरण के लिए, "?page=1" या "?page=2" के साथ)
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('page')) || 1; // यदि कोई पृष्ठ संख्या नहीं है, तो डिफ़ॉल्ट 1
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
    startingNumber = 5; // page2 के लिए 5 से प्रारंभ करें
}

// प्रश्नों को प्रदर्शित करें
autoNumberQuestions(startingNumber);
