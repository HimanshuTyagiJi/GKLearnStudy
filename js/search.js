// Levenshtein Distance function to calculate similarity between two strings
function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
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

document.addEventListener("DOMContentLoaded", function() {
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

    const inputWords = input.split(/\s+/);

    // Score calculation: more matches (and better ones) = higher priority
    function getMatchInfo(item) {
      const titleLower = item.title.toLowerCase();
      const paraLower = item.paragraph.toLowerCase();

      let exactCount = 0, partialCount = 0, fuzzyCount = 0, totalScore = 0;

      inputWords.forEach(word => {
        if (titleLower === word || paraLower === word) {
          exactCount++;
          totalScore += 0;
        } else if (titleLower.includes(word) || paraLower.includes(word)) {
          partialCount++;
          totalScore += 1;
        } else {
          // Fuzzy match (Levenshtein)
          const titleWords = titleLower.split(/\s+/);
          const paraWords = paraLower.split(/\s+/);
          const allWords = [...titleWords, ...paraWords];
          const maxDist = Math.max(2, Math.floor(word.length * 0.4));
          if (allWords.some(dataWord => levenshteinDistance(word, dataWord) <= maxDist)) {
            fuzzyCount++;
            totalScore += 2;
          } else {
            totalScore += 3; // no match for this word
          }
        }
      });

      return {
        item,
        exactCount,
        partialCount,
        fuzzyCount,
        totalScore
      };
    }

    // Get all matching results with score info
    let scoredData = data
      .map(getMatchInfo)
      // Only show results that matched at least one word
      .filter(obj => (obj.exactCount + obj.partialCount + obj.fuzzyCount) > 0);

    if (scoredData.length === 0) {
      results.style.display = 'block';
      results.innerHTML = '<p>No results found.</p>';
      suggestions.style.display = 'none';
      return;
    }

    // Sort:
    // 1. By lowest totalScore (more/better matches = less score)
    // 2. By most exactCount
    // 3. By most partialCount
    // 4. By most fuzzyCount
    // 5. Finally by title alphabetically
    scoredData.sort((a, b) => 
      a.totalScore - b.totalScore ||
      b.exactCount - a.exactCount ||
      b.partialCount - a.partialCount ||
      b.fuzzyCount - a.fuzzyCount ||
      a.item.title.localeCompare(b.item.title)
    );

    // Show result cards
    scoredData.forEach(({ item }) => {
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

  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      searchContainer.classList.add('active');
      searchInput.focus();
      if (searchInput.value.trim() !== '') {
        showResults();
      }
    });
  }

  if (backIcon) {
    backIcon.addEventListener('click', () => {
      searchContainer.classList.remove('active');
      searchInput.value = '';
      results.innerHTML = '';
      results.style.display = 'none';
      suggestions.style.display = 'none';
    });
  }

  if (searchInput) {
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
  }

  if (suggestions) {
    suggestions.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'li') {
        searchInput.value = e.target.textContent;
        suggestions.style.display = 'none';
        showResults();
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (
      !searchContainer.contains(e.target) &&
      !results.contains(e.target) &&
      !suggestions.contains(e.target)
    ) {
      searchContainer.classList.remove('active');
      searchInput.value = '';
      results.innerHTML = '';
      results.style.display = 'none';
      suggestions.style.display = 'none';
    }
  });
});
