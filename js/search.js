let titles = [];

function loadSitemap() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://gklearnstudy.in/searchsitemap.xml', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
            const urlElements = xmlDoc.getElementsByTagName('url');

            for (let urlElement of urlElements) {
                const titleElement = urlElement.getElementsByTagName('title')[0];
                const locElement = urlElement.getElementsByTagName('loc')[0];
                const paragraphElement = urlElement.getElementsByTagName('p')[0];
                const imageElement = urlElement.getElementsByTagName('image')[0];
                const imageURL = imageElement ? imageElement.getElementsByTagName('loc')[0].textContent : 'https://via.placeholder.com/50';

                if (titleElement && locElement) {
                    titles.push({
                        title: titleElement.textContent,
                        url: locElement.textContent,
                        paragraph: paragraphElement ? paragraphElement.textContent : '',
                        image: imageURL,
                        // Add transliterated fields
                        transliteratedTitle: transliterateToHindi(titleElement.textContent),
                        transliteratedParagraph: paragraphElement ? transliterateToHindi(paragraphElement.textContent) : '',
                    });
                }
            }

            fuse = new Fuse(titles, options);
        } else if (xhr.readyState === 4) {
            console.error('Error loading sitemap:', xhr.status, xhr.statusText);
        }
    };
    xhr.send();
}

// Transliterating English to Hindi (You can implement this function based on your requirements)
function transliterateToHindi(englishText) {
    // Example mapping (implement actual transliteration logic or use a library)
    const transliterationMap = {
     
    "अ": "a",
    "आ": "aa",
    "इ": "i",
    "ई": "ee",
    "उ": "u",
    "ऊ": "oo",
    "ऋ": "ri",
    "ए": "e",
    "ऐ": "ai",
    "ओ": "o",
    "औ": "au",
    "अं": "am",
    "अः": "ah",
    "क": "ka",
    "ख": "kha",
    "ग": "ga",
    "घ": "gha",
    "ङ": "nga",
    "च": "cha",
    "छ": "chha",
    "ज": "ja",
    "झ": "jha",
    "ञ": "nya",
    "ट": "ta",
    "ठ": "tha",
    "ड": "da",
    "ढ": "dha",
    "ण": "na",
    "त": "ta",
    "थ": "tha",
    "द": "da",
    "ध": "dha",
    "न": "na",
    "प": "pa",
    "फ": "pha",
    "ब": "ba",
    "भ": "bha",
    "म": "ma",
    "य": "ya",
    "र": "ra",
    "ल": "la",
    "व": "va",
    "श": "sha",
    "ष": "sha",
    "स": "sa",
    "ह": "ha",
    "क्ष": "ksha",
    "ज्ञ": "gya"
,

        // Add more mappings as needed
    };
    return englishText.split(" ").map(word => transliterationMap[word.toLowerCase()] || word).join(" ");
}

const options = {
    includeScore: true,
    threshold: 0.4,
    keys: ['title', 'paragraph', 'transliteratedTitle', 'transliteratedParagraph'] // Include transliterated fields
};

let fuse;

loadSitemap();

document.getElementById("searchBtn").addEventListener("click", () => {
    document.querySelector(".search-container").classList.add("active");
    document.getElementById("searchInput").focus();
});

document.getElementById("backBtn").addEventListener("click", closeSearch);

function closeSearch() {
    const searchInput = document.getElementById("searchInput");
    searchInput.classList.add("closing");
    setTimeout(() => {
        document.querySelector(".search-container").classList.remove("active");
        searchInput.classList.remove("closing");
        searchInput.value = "";
        document.getElementById('results').innerHTML = ''; // Clear results
        document.getElementById('suggestions').innerHTML = ''; // Clear suggestions
        document.getElementById('suggestions').style.display = 'none'; // Hide suggestions
        document.getElementById('results').style.display = 'none'; // Hide results
    }, 300);
}

function searchTitles(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('results');
    const suggestionsDiv = document.getElementById('suggestions');

    resultsDiv.innerHTML = ''; // Clear previous results
    suggestionsDiv.innerHTML = ''; // Clear previous suggestions

    if (query.length > 0) {
        // Search in both original and transliterated content
        const transliteratedQuery = transliterateToHindi(query);
        const result = fuse.search(query).concat(fuse.search(transliteratedQuery));

        // Remove duplicate results
        const uniqueResults = [...new Set(result.map(item => item.item.title))];

        if (uniqueResults.length > 0) {
            displayResults(uniqueResults, result, 1); // Load first page of results
            resultsDiv.style.display = 'block'; // Show results
        } else {
            resultsDiv.innerHTML = '<div class="no-result">No result found</div>';
            resultsDiv.style.display = 'block'; // Show no result message
        }
    }
}

function displayResults(uniqueResults, result, page) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    const start = (page - 1) * 10;
    const end = start + 10;
    uniqueResults.slice(start, end).forEach(title => {
        const item = result.find(r => r.item.title === title).item;
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.style.display = 'flex'; // Display as flex for inline layout
        resultItem.style.alignItems = 'center'; // Center align items
        resultItem.innerHTML = `
            <a href="${item.url}" style="display: flex; align-items: center; width: 100%;">
                <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; margin-right: 10px;">
                <div class="result-content" style="flex-grow: 1;">
                    <div class="result-title">${item.title}</div>
                    <div class="result-paragraph">${item.paragraph}</div>
                </div>
            </a>
        `;
        resultsDiv.appendChild(resultItem);
    });

    // Create pagination
    const paginationDiv = document.createElement('div');
    paginationDiv.classList.add('pagination');
    const totalPages = Math.ceil(uniqueResults.length / 10);
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.innerText = i;
        pageLink.href = '#';
        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            displayResults(uniqueResults, result, i); // Load the selected page
        });
        paginationDiv.appendChild(pageLink);
    }
    resultsDiv.appendChild(paginationDiv);
}

function showSuggestions(event) {
    const query = document.getElementById('searchInput').value.trim();
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = ''; // Clear previous suggestions

    if (query.length > 0) {
        const suggestions = fuse.search(query); // Get all suggestions

        // Remove duplicates from suggestions
        const uniqueSuggestions = [...new Set(suggestions.map(item => item.item.title))];

        uniqueSuggestions.forEach(title => {
            const item = suggestions.find(s => s.item.title === title).item;
            const suggestionItem = document.createElement('li');
            suggestionItem.innerHTML = item.title; // No highlight
            suggestionItem.onclick = () => {
                document.getElementById('searchInput').value = item.title; // Fill input with suggestion
                suggestionsDiv.innerHTML = ''; // Clear suggestions
                suggestionsDiv.style.display = 'none'; // Hide suggestions
                document.getElementById('searchInput').focus(); // Keep input active
            };
            suggestionsDiv.appendChild(suggestionItem);
        });

        if (uniqueSuggestions.length > 0) {
            suggestionsDiv.style.display = 'block'; // Show suggestions
        } else {
            suggestionsDiv.innerHTML = '<li>No result found</li>'; // No suggestions found
            suggestionsDiv.style.display = 'block'; // Show no result message
        }
    } else {
        suggestionsDiv.style.display = 'none'; // Hide suggestions
    }
}

document.getElementById("searchInput").addEventListener("input", function (event) {
    showSuggestions(event);   // Sirf suggestion har input par
});
document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchTitles(event);  // Sirf result Enter par
        document.getElementById('suggestions').style.display = 'none'; // Suggestion chhupa do
    }
});









