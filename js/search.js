// Fuse.js के लिए options
const options = {
  includeScore: true,
  threshold: 0.4,
  keys: ['title', 'paragraph', 'transliteratedTitle', 'transliteratedParagraph']
};

let data = [
  {
    title: "Hindi Grammar",
    paragraph: "This page explains Hindi grammar basics.",
    url: "https://example.com/hindi-grammar",
    image: "https://via.placeholder.com/50",
    transliteratedTitle: "हिंदी ग्रामर",
    transliteratedParagraph: "यह पेज हिंदी ग्रामर बेसिक्स को समझाता है।"
  },
  {
    title: "English Grammar",
    paragraph: "Learn about English grammar here.",
    url: "https://example.com/english-grammar",
    image: "https://via.placeholder.com/50",
    transliteratedTitle: "इंग्लिश ग्रामर",
    transliteratedParagraph: "यहाँ इंग्लिश ग्रामर सीखें।"
  },
  // अपना data यहां डालें
];

// Fuse object initialize करें
const fuse = new Fuse(data, options);

// Hindi transliteration (साधारण फ़ंक्शन, जरूरत अनुसार बढ़ाएं)
function transliterateToHindi(text) {
  const map = {
    "a": "अ", "aa": "आ", "i": "इ", "ee": "ई", "u": "उ", "oo": "ऊ",
    "e": "ए", "ai": "ऐ", "o": "ओ", "au": "औ"
  };
  return text.split(" ").map(w => map[w.toLowerCase()] || w).join(" ");
}

// Search बार खोलने का बटन
document.getElementById("searchBtn").addEventListener("click", () => {
  document.querySelector(".search-container").classList.add("active");
  document.getElementById("searchInput").focus();
});

// Search बार बंद करने का बटन
document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  document.querySelector(".search-container").classList.remove("active");
  document.getElementById('suggestions').style.display = 'none';
  document.getElementById('results').style.display = 'none';
});

// Suggestions दिखाने का फ़ंक्शन
function showSuggestions() {
  const query = document.getElementById('searchInput').value.trim();
  const suggestions = document.getElementById('suggestions');
  suggestions.innerHTML = '';

  if (!query) {
    suggestions.style.display = 'none';
    return;
  }

  const transliteratedQuery = transliterateToHindi(query);
  const results = fuse.search(query).concat(fuse.search(transliteratedQuery));

  // Duplicate हटाना
  const unique = [...new Map(results.map(r => [r.item.title, r])).values()];

  if (unique.length === 0) {
    suggestions.innerHTML = '<li>No suggestions found</li>';
    suggestions.style.display = 'block';
    return;
  }

  unique.forEach(({item}) => {
    const li = document.createElement('li');
    li.textContent = item.title;
    li.onclick = () => {
      document.getElementById('searchInput').value = item.title;
      suggestions.innerHTML = '';
      suggestions.style.display = 'none';
      showResults(item.title);
    };
    suggestions.appendChild(li);
  });

  suggestions.style.display = 'block';
}

// Results दिखाने का फ़ंक्शन
function showResults(query) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  const transliteratedQuery = transliterateToHindi(query);
  const results = fuse.search(query).concat(fuse.search(transliteratedQuery));

  const unique = [...new Map(results.map(r => [r.item.title, r])).values()];

  if (unique.length === 0) {
    resultsDiv.innerHTML = '<div class="no-result">No results found</div>';
    resultsDiv.style.display = 'block';
    return;
  }

  unique.forEach(({item}) => {
    const div = document.createElement('div');
    div.classList.add('result-item');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.marginBottom = '10px';
    div.innerHTML = `
      <a href="${item.url}" style="display:flex; align-items:center; text-decoration:none; color:inherit;">
        <img src="${item.image}" alt="${item.title}" style="width:50px; height:50px; margin-right:10px; object-fit:cover;" />
        <div>
          <div class="result-title" style="font-weight:bold;">${item.title}</div>
          <div class="result-paragraph" style="font-size:0.9em; color:#555;">${item.paragraph}</div>
        </div>
      </a>
    `;
    resultsDiv.appendChild(div);
  });
  resultsDiv.style.display = 'block';
}

// इनपुट पर showSuggestions कॉल करें
document.getElementById('searchInput').addEventListener('input', showSuggestions);

// Enter दबाने पर search results दिखाएं
document.getElementById('searchInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    showResults(document.getElementById('searchInput').value.trim());
    document.getElementById('suggestions').style.display = 'none';
  }
});
