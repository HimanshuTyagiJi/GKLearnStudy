

var accordionContainer = document.getElementById("accordion-container");
var filterInput = document.getElementById("filterInput");
var paginationContainer = document.getElementById("pagination");

var sections = [
    
  
{

        title: 'ho gaya done',



        options: ["","","",""],
        correctOption: '0',
        content: '<p><span class="color-content4">Explanation: </span></p>'
    },
   
    // Add more sections as needed
];

var filteredSections = sections.slice(); // Copy of sections
var itemsPerPage = 10;
var currentPage = 1;

function showSections(startIndex) {
    accordionContainer.innerHTML = "";
    for (var i = startIndex; i < Math.min(startIndex + itemsPerPage, filteredSections.length); i++) {
        (function(i) {
            var section = filteredSections[i];
            var accordionItem = document.createElement("div");
            accordionItem.className = "accordion-item";

            var titleBox = document.createElement("div");
            titleBox.className = "accordion";
            titleBox.innerHTML = "Q-" + (i + 1) + ": " + section.title;

           

            var optionsBox = document.createElement("div");
            optionsBox.className = "options";

            var panel = document.createElement("div");
            panel.className = "panel";
            panel.innerHTML = section.content;
            section.options.forEach((option, optionIndex) => {
                var optionElement = document.createElement("div");
                optionElement.className = "option";
                optionElement.innerHTML = option;

                optionElement.addEventListener("click", function() {
                   if (!optionsBox.classList.contains('answered')) {
                            if (optionIndex === section.correctOption) {
                                optionElement.classList.add("correct");
                            } else {
                                optionElement.classList.add("incorrect");
                                optionsBox.children[section.correctOption].classList.add("correct");
                            }
                            optionsBox.classList.add('answered'); // Prevent further clicks
                            panel.style.display = "block";
                            
                        }
                    });

                    optionsBox.appendChild(optionElement);
                });


           
            
            accordionItem.appendChild(titleBox);
            accordionItem.appendChild(optionsBox);
            accordionItem.appendChild(panel);

            accordionContainer.appendChild(accordionItem);
        })(i);
    }
}
function updatePagination() {
    paginationContainer.innerHTML = "";
    var totalPages = Math.ceil(filteredSections.length / itemsPerPage);

    var firstPageButton = document.createElement("li");
    var firstPageLink = document.createElement("a");
    firstPageLink.href = "#";
    firstPageLink.textContent = "First Page";
    firstPageButton.appendChild(firstPageLink);
    firstPageButton.addEventListener("click", function(e) {
        e.preventDefault();
        currentPage = 1;
        showSections(0);
        updatePagination();
    });

    var prevButton = document.createElement("li");
    var prevLink = document.createElement("a");
    prevLink.href = "#";
    prevLink.textContent = "Previous";
    prevButton.appendChild(prevLink);
    prevButton.addEventListener("click", function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;

            showSections((currentPage - 1) * itemsPerPage);
            updatePagination();
        }
    });

    paginationContainer.appendChild(firstPageButton);
    paginationContainer.appendChild(prevButton);

    for (var i = 1; i <= totalPages; i++) {
        var listItem = document.createElement("li");
        var link = document.createElement("a");
        link.href = "#";
        link.textContent = i;
        if (i === currentPage) {
            link.classList.add("active");
        }
        link.addEventListener("click", function(e) {
            e.preventDefault();
            currentPage = parseInt(this.textContent);
            showSections((currentPage - 1) * itemsPerPage);
            updatePagination();
        });
        listItem.appendChild(link);
        paginationContainer.appendChild(listItem);
    }

    var nextButton = document.createElement("li");
    var nextLink = document.createElement("a");
    nextLink.href = "#";
    nextLink.textContent = "Next";
    nextButton.appendChild(nextLink);
    nextButton.addEventListener("click", function(e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            showSections((currentPage - 1) * itemsPerPage);
            updatePagination();
        }
    });

    var lastPageButton = document.createElement("li");
    var lastPageLink = document.createElement("a");
    lastPageLink.href = "#";
    lastPageLink.textContent = "Last Page";
    lastPageButton.appendChild(lastPageLink);
    lastPageButton.addEventListener("click", function(e) {
        e.preventDefault();
        currentPage = totalPages;
        showSections((totalPages - 1) * itemsPerPage);
        updatePagination();
    });

    paginationContainer.appendChild(nextButton);
    paginationContainer.appendChild(lastPageButton);

    if (currentPage === 1) {
        firstPageButton.style.display = "none";
        prevButton.style.display = "none";
    } else {
        firstPageButton.style.display = "inline-block";
        prevButton.style.display = "inline-block";
    }
    
    if (currentPage === totalPages) {
        nextButton.style.display = "none";
        lastPageButton.style.display = "none";
    } else {
        nextButton.style.display = "inline-block";
        lastPageButton.style.display = "inline-block";
    }
    
}

function searchContent() {
    var query = filterInput.value.toLowerCase().trim();
    if (query === "") {
        filteredSections = sections.slice();
    } else {
        filteredSections = sections.filter(function(section) {
            return section.title.toLowerCase().includes(query) || 
                   section.options.some(option => option.toLowerCase().includes(query)) || 
                   section.content.toLowerCase().includes(query);
        });
    }
    currentPage = 1;
    showSections(0);
    updatePagination();
}

filterInput.addEventListener("input", searchContent);

showSections(0);
updatePagination();
