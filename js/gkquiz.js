     
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

    // Function to auto-number the questions
    function autoNumberQuestions(startNumber) {
        let questionElements = document.querySelectorAll(".questions");
        let questionNumber = startNumber;

        questionElements.forEach(question => {
            question.querySelector("h3").textContent = `Q-${questionNumber}: ${question.querySelector("h3").textContent}`;
            questionNumber++;
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

    // Initialize the script
    const startingNumber = getStartingNumber(); // Determine the starting question number
    autoNumberQuestions(startingNumber); // Auto-number questions
    initializeQuestionInteractions(); // Set up interactions
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

        // Function to display the last page notification
        function showLastPageNotification(lastPageNumber) {
            const notificationContainer = document.createElement("div");
            notificationContainer.style.border = "1px solid #ccc";
            notificationContainer.style.padding = "10px";
            notificationContainer.style.margin = "20px 0";
            notificationContainer.style.backgroundColor = "#f9f9f9";
            notificationContainer.style.textAlign = "center";

            const lastPageLink = lastPageNumber > 0 
                ? `page${lastPageNumber}` 
                : ``;

            notificationContainer.innerHTML = `
                <p>New questions have been added on the last page. <a href="${lastPageLink}" style="color: blue; text-decoration: underline;">Click here</a> to view the latest page.</p>
            `;
            document.body.prepend(notificationContainer);
        }

        // Function to display the last updated time
        function showLastUpdatedTime() {
            const dateContainer = document.createElement("div");
            dateContainer.style.textAlign = "center";
            dateContainer.style.marginTop = "20px";
            dateContainer.style.fontSize = "14px";
            dateContainer.style.color = "#555";

            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString();
            const formattedTime = currentDate.toLocaleTimeString();

            dateContainer.innerHTML = `<p>Page last updated on: ${formattedDate} at ${formattedTime}</p>`;
            document.body.append(dateContainer);
        }

        // Get the largest page number from existing links
        const lastPageNumber = findLargestPageNumber();

        // Show the notification for the last page
        showLastPageNotification(lastPageNumber);

        // Show the last updated time
        showLastUpdatedTime();
