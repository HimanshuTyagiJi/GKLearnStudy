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
    startingNumber = 5; // page2 के लिए 5 से प्रारंभ करें
} else {
    startingNumber = (pageNumber - 1) * 5 + 1; // page3 से page20 के लिए 5 से बढ़ते हुए क्रमांकित करें
}

// प्रश्नों को प्रदर्शित करें
autoNumberQuestions(startingNumber);
