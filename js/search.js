// Fuse.js CDN लोड करें डायनामिकली (अगर पहले से नहीं है)
(function loadFuse() {
  if (!window.Fuse) {
    let script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.min.js";
    script.onload = () => {
      initSearch();
    };
    document.head.appendChild(script);
  } else {
    initSearch();
  }
})();
let titles = [
    {
        title: "भारतीय इतिहास",
        url: "https://gklearnstudy.in/indian-history",
        paragraph: "भारतीय इतिहास के महत्वपूर्ण अध्याय...",
        image: "https://gklearnstudy.in/assets/images/indian-history.jpg",
        transliteratedTitle: transliterateToHindi("भारतीय इतिहास"),
        transliteratedParagraph: transliterateToHindi("भारतीय इतिहास के महत्वपूर्ण अध्याय...")
    },
    {
        title: "राजनीति विज्ञान",
        url: "https://gklearnstudy.in/political-science",
        paragraph: "राजनीति विज्ञान से जुड़ी अवधारणाएँ...",
        image: "https://gklearnstudy.in/assets/images/political-science.jpg",
        transliteratedTitle: transliterateToHindi("राजनीति विज्ञान"),
        transliteratedParagraph: transliterateToHindi("राजनीति विज्ञान से जुड़ी अवधारणाएँ...")
    },
    // 🔽 Add more items below in same format
];

const options = {
    includeScore: true,
    threshold: 0.4,
    keys: ['title', 'paragraph', 'transliteratedTitle', 'transliteratedParagraph']
};

let fuse = new Fuse(titles, options);

// Transliterating English to Hindi (Dummy Logic – replace with real logic as needed)
function transliterateToHindi(englishText) {
    // Placeholder – replace with real transliteration or remove if not needed
    return englishText;
}

// SEARCH BUTTON FUNCTIONALITY
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
        document.getElementById('results').innerHTML = '';
        document.getElementById('suggestions').innerHTML = '';
        document.getElementById('suggestions').style.display = 'none';
        document.getElementById('results').style.display = 'none';
    }, 300);
}

function searchTitles(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('results');
    const suggestionsDiv = document.getElementById('suggestions');

    resultsDiv.innerHTML = '';
    suggestionsDiv.innerHTML = '';

    if (query.length > 0) {
        const transliteratedQuery = transliterateToHindi(query);
        const result = fuse.search(query).concat(fuse.search(transliteratedQuery));
        const uniqueResults = [...new Set(result.map(item => item.item.title))];

        if (uniqueResults.length > 0) {
            displayResults(uniqueResults, result, 1);
            resultsDiv.style.display = 'block';
        } else {
            resultsDiv.innerHTML = '<div class="no-result">No result found</div>';
            resultsDiv.style.display = 'block';
        }
    }
}

function displayResults(uniqueResults, result, page) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const start = (page - 1) * 10;
    const end = start + 10;
    uniqueResults.slice(start, end).forEach(title => {
        const item = result.find(r => r.item.title === title).item;
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.style.display = 'flex';
        resultItem.style.alignItems = 'center';
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

    const paginationDiv = document.createElement('div');
    paginationDiv.classList.add('pagination');
    const totalPages = Math.ceil(uniqueResults.length / 10);
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.innerText = i;
        pageLink.href = '#';
        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            displayResults(uniqueResults, result, i);
        });
        paginationDiv.appendChild(pageLink);
    }
    resultsDiv.appendChild(paginationDiv);
}

function showSuggestions(event) {
    const query = document.getElementById('searchInput').value.trim();
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    if (query.length > 0) {
        const suggestions = fuse.search(query);
        const uniqueSuggestions = [...new Set(suggestions.map(item => item.item.title))];

        uniqueSuggestions.forEach(title => {
            const item = suggestions.find(s => s.item.title === title).item;
            const suggestionItem = document.createElement('li');
            suggestionItem.innerHTML = item.title;
            suggestionItem.onclick = () => {
                document.getElementById('searchInput').value = item.title;
                suggestionsDiv.innerHTML = '';
                suggestionsDiv.style.display = 'none';
                document.getElementById('searchInput').focus();
            };
            suggestionsDiv.appendChild(suggestionItem);
        });

        if (uniqueSuggestions.length > 0) {
            suggestionsDiv.style.display = 'block';
        } else {
            suggestionsDiv.innerHTML = '<li>No result found</li>';
            suggestionsDiv.style.display = 'block';
        }
    } else {
        suggestionsDiv.style.display = 'none';
    }
}

document.getElementById("searchInput").addEventListener("input", function (event) {
    showSuggestions(event);
});
document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchTitles(event);
        document.getElementById('suggestions').style.display = 'none';
    }
});
