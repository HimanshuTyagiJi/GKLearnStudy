
// Levenshtein Distance function to calculate similarity between two strings
function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

const data = [
  {
    "title": "Math Formulas",
    "url": "https://gklearnstudy.in/math/formulas",
    "paragraph": "This page contains all important math formulas for 9th to 12th.",
    "image": "https://gklearnstudy.in/images/math.jpg"
  },
  {
    "title": "Science Formulas",
    "url": "https://gklearnstudy.in/science/formulas",
    "paragraph": "Important science formulas and concepts for school students.",
    "image": "https://gklearnstudy.in/images/science.jpg"
  },
  {
    "title": "English Grammar",
    "url": "https://gklearnstudy.in/english/grammar",
    "paragraph": "Complete guide to English grammar with examples.",
    "image": "https://gklearnstudy.in/images/english.jpg"
  }
];

const searchContainer = document.querySelector('.search-container');
const searchIcon = document.querySelector('.search-icon');
const backIcon = document.querySelector('.back-icon');
const searchInput = document.querySelector('.search-input');
const results = document.getElementById('results');
const suggestions = document.getElementById('suggestions');

function showResults() {
  const input = searchInput.value.trim().toLowerCase();
  results.innerHTML = '';

  if (input === '') {
    results.style.display = 'none';
    suggestions.style.display = 'none';
    return;
  }

  // Split input into words
  const inputWords = input.split(/\s+/);

  // First: try exact or partial match of all words
  let filtered = data.filter(item => {
    const titleLower = item.title.toLowerCase();
    const paraLower = item.paragraph.toLowerCase();

    // Check if all input words are somewhere included in title or paragraph (partial match)
    return inputWords.every(word =>
      titleLower.includes(word) || paraLower.includes(word)
    );
  });

  // If no results found, try fuzzy matching for each word
  if (filtered.length === 0) {
    // Define max allowed distance based on word length (40% of length or min 2)
    const maxDistForWord = word => Math.max(2, Math.floor(word.length * 0.4));

    filtered = data.filter(item => {
      // Get all words from title and paragraph
      const titleWords = item.title.toLowerCase().split(/\s+/);
      const paraWords = item.paragraph.toLowerCase().split(/\s+/);
      const allWords = [...titleWords, ...paraWords];

      // For each input word, check if any word in data is within maxDist fuzzy distance
      // We will allow partial matching: if at least one input word matches fuzzily in the data item, include it
      return inputWords.some(inputWord => {
        const maxDist = maxDistForWord(inputWord);
        return allWords.some(dataWord =>
          levenshteinDistance(inputWord, dataWord) <= maxDist
        );
      });
    });
  }

  if (filtered.length === 0) {
    results.style.display = 'block';
    results.innerHTML = '<p>No results found.</p>';
    suggestions.style.display = 'none';
    return;
  }

  // Show results cards
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('result-card');

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    img.classList.add('result-image');

    const textDiv = document.createElement('div');
    textDiv.classList.add('result-text');

    const titleLink = document.createElement('a');
    titleLink.href = item.url;
    titleLink.textContent = item.title;
    titleLink.target = '_blank';
    titleLink.classList.add('result-title');

    const para = document.createElement('p');
    para.textContent = item.paragraph;
    para.classList.add('result-paragraph');

    textDiv.appendChild(titleLink);
    textDiv.appendChild(para);

    card.appendChild(img);
    card.appendChild(textDiv);

    results.appendChild(card);
  });

  results.style.display = 'block';
  suggestions.style.display = 'none';
}

searchIcon.addEventListener('click', () => {
  searchContainer.classList.add('active');
  searchInput.focus();
  if (searchInput.value.trim() !== '') {
    showResults();
  }
});

backIcon.addEventListener('click', () => {
  searchContainer.classList.remove('active');
  searchInput.value = '';
  results.innerHTML = '';
  results.style.display = 'none';
  suggestions.style.display = 'none';
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  if (query.length > 0) {
    showResults();
  } else {
    suggestions.style.display = 'none';
    results.style.display = 'none';
    results.innerHTML = '';
  }
});

// Suggestions click handler (optional)
suggestions.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    searchInput.value = e.target.textContent;
    suggestions.style.display = 'none';
    showResults();
  }
});

document.addEventListener('click', (e) => {
  const isClickInside = searchContainer.contains(e.target) || results.contains(e.target) || suggestions.contains(e.target);
  if (!isClickInside) {
    searchContainer.classList.remove('active');
    searchInput.value = '';
    results.innerHTML = '';
    results.style.display = 'none';
    suggestions.style.display = 'none';
  }
});

