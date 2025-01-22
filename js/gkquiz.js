// Function to extract page information from the URL
function getPageNumber() {
    let url = window.location.href;

    // Match '/pageX' in the URL
    let match = url.match(/\/page(\d+)/);

    // If '/pageX' exists, return its number, else return 0 (indicating '/gk/ancient')
    return match ? parseInt(match[1]) : 0;
}

// Function to determine the starting number based on the URL
function getStartingNumber() {
    const pageNumber = getPageNumber(); // Get the current page number

    if (pageNumber === 0) {
        // Default case for '/gk/ancient': Questions 1-30
        return 1;
    } else {
        // For '/pageX': Calculate starting number dynamically
        return (pageNumber * 30) + 1;
    }
}

// Function to manually set page numbers
function setPageNumbers() {
    let questionElements = document.querySelectorAll(".questions");
    questionElements.forEach((question, index) => {
        question.querySelector("h3").textContent = `Q-${index + 1}: ${question.querySelector("h3").textContent}`;
    });
}

// Function to initialize question interactions
function initializeQuestionInteractions() {
    const questions = document.querySelectorAll(".questions");

    questions.forEach(question => {
        let options = question.querySelectorAll(".options li");
        let explanation = question.querySelector(".explanation");

        options.forEach(option => {
            option.addEventListener("click", () => {
                // Disable further clicks on options
                options.forEach(opt => {
                    opt.style.pointerEvents = "none";
                });

                // Highlight the correct and incorrect options
                if (option.getAttribute("data-correct") === "true") {
                    option.classList.add("correct");
                } else {
                    option.classList.add("wrong");
                    options.forEach(opt => {
                        if (opt.getAttribute("data-correct") === "true") {
                            opt.classList.add("correct");
                        }
                    });
                }

                // Display the explanation
                explanation.style.display = "block";
            });
        });
    });
}

// Function to find the largest page number
function findLargestPageNumber() {
    const allLinks = document.querySelectorAll("a[href]");
    let maxPageNumber = 0;

    allLinks.forEach((link) => {
        const href = link.getAttribute("href");
        const match = href.match(/page(\d+)/);
        if (match) {
            const pageNumber = parseInt(match[1], 10);
            if (pageNumber > maxPageNumber) {
                maxPageNumber = pageNumber;
            }
        }
    });

    return maxPageNumber;
}

// Function to get the current folder from the URL
function getCurrentFolder() {
    const urlSegments = window.location.pathname.split("/");
    return urlSegments[1]; // Get the first segment after the root
}

// Function to display the last page notification with custom links
function showLastPageNotification(currentFolder) {
    const notificationContainer = document.createElement("div");
    notificationContainer.style.border = "1px solid #ccc";
    notificationContainer.style.padding = "10px";
    notificationContainer.style.margin = "20px 0";
    notificationContainer.style.backgroundColor = "#f9f9f9";
    notificationContainer.style.textAlign = "center";

    // Define custom links based on the current folder
    const customLinks = {
        'gk': {
            link: 'https://gklearnstudy.in/gk-quiz/ancient-indian-history/page2',
            text: 'GK Page'
        },
        'hi': {
            link: 'hi/page1',
            text: 'HI Page'
        }
    };

    let lastPageLink = '';
    if (currentFolder === 'gk') {
        lastPageLink = `<a href="${customLinks.gk.link}" style="color: blue; text-decoration: underline;">${customLinks.gk.text}</a>`;
    } else if (currentFolder === 'hi') {
        lastPageLink = `<a href="${customLinks.hi.link}" style="color: blue; text-decoration: underline;">${customLinks.hi.text}</a>`;
    }

    notificationContainer.innerHTML = `
        <p>New questions have been added. Click here to view: ${lastPageLink}</p>
    `;
    document.body.prepend(notificationContainer);
}

// Function to display the last updated time
function showLastUpdatedTime(lastUpdated) {
    const dateContainer = document.createElement("div");
    dateContainer.style.textAlign = "center";
    dateContainer.style.marginTop = "20px";
    dateContainer.style.fontSize = "14px";
    dateContainer.style.color = "#555";

    dateContainer.innerHTML = `<p>Page last updated on: ${lastUpdated}</p>`;
    document.body.append(dateContainer);
}

// Initialize the script
setPageNumbers(); // Manually set page numbers
initializeQuestionInteractions(); // Set up interactions

// Get the current folder
const currentFolder = getCurrentFolder();

// Show the notification for the last page based on the current folder
showLastPageNotification(currentFolder);

// Specify the last updated time manually
const lastUpdated = "2025-01-22 at 10:00 AM"; // Change this to your desired time
showLastUpdatedTime(lastUpdated);
