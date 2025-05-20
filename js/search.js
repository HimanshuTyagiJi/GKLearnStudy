   // Sample Data (आप अपना XML या JSON डेटा यहां रख सकते हैं)
    const data = [
      {
        title: "Hindi Grammar",
        paragraph: "यह पेज हिंदी व्याकरण के मूल सिद्धांत समझाता है।",
        url: "https://example.com/hindi-grammar",
        image: "https://via.placeholder.com/50",
        transliteratedTitle: "Hindi Grammar",
        transliteratedParagraph: "Yah page Hindi vyaakaran ke mool siddhant samjhata hai."
      },
      {
        title: "English Grammar",
        paragraph: "Learn about English grammar here.",
        url: "https://example.com/english-grammar",
        image: "https://via.placeholder.com/50",
        transliteratedTitle: "English Grammar",
        transliteratedParagraph: "Learn about English grammar here."
      },
      {
        title: "Mathematics",
        paragraph: "Mathematics topics and formulas explained.",
        url: "https://example.com/math",
        image: "https://via.placeholder.com/50",
        transliteratedTitle: "Mathematics",
        transliteratedParagraph: "Mathematics topics and formulas explained."
      }
      // अपनी entries यहाँ और जोड़ सकते हैं
    ];

    // Fuse.js options
    const options = {
      includeScore: true,
      threshold: 0.4,
      keys: ["title", "paragraph", "transliteratedTitle", "transliteratedParagraph"],
    };

    // Fuse instance बनाएँ
    const fuse = new Fuse(data, options);

    // Search बार खोलने के लिए बटन
    document.getElementById("searchBtn").addEventListener("click", () => {
      document.querySelector(".search-container").classList.add("active");
      document.getElementById("searchInput").focus();
    });

    // Search बार बंद करने के लिए बटन
    document.getElementById("backBtn").addEventListener("click", () => {
      document.getElementById("searchInput").value = "";
      document.querySelector(".search-container").classList.remove("active");
      document.getElementById("suggestions").style.display = "none";
      document.getElementById("results").style.display = "none";
    });

    // Transliterate function (यह साधारण है, जरूरत अनुसार बढ़ा सकते हैं)
    function transliterateToLatin(text) {
      // यह example है, आप इसे बेहतर बना सकते हैं
      return text.normalize('NFD').replace(/[\u0900-\u097F]/g, ''); 
    }

    // Suggestions दिखाने वाला फ़ंक्शन
    function showSuggestions() {
      const input = document.getElementById("searchInput");
      const query = input.value.trim();
      const suggestions = document.getElementById("suggestions");
      suggestions.innerHTML = "";

      if (!query) {
        suggestions.style.display = "none";
        return;
      }

      const transliteratedQuery = transliterateToLatin(query);

      // Fuse से सर्च दोनों ओर से करें: जैसे हिंदी, अंग्रेजी दोनों
      let results = fuse.search(query);
      let results2 = fuse.search(transliteratedQuery);

      // दोनों results मिलाएं और डुप्लीकेट हटाएं
      const combined = [...results, ...results2];
      const uniqueResults = [];
      const seen = new Set();
      combined.forEach((result) => {
        if (!seen.has(result.item.title)) {
          seen.add(result.item.title);
          uniqueResults.push(result);
        }
      });

      if (uniqueResults.length === 0) {
        suggestions.innerHTML = "<li>No suggestions found</li>";
        suggestions.style.display = "block";
        return;
      }

      uniqueResults.forEach(({ item }) => {
        const li = document.createElement("li");
        li.textContent = item.title;
        li.addEventListener("click", () => {
          input.value = item.title;
          suggestions.innerHTML = "";
          suggestions.style.display = "none";
          showResults(item.title);
        });
        suggestions.appendChild(li);
      });

      suggestions.style.display = "block";
    }

    // Search Results दिखाने वाला फ़ंक्शन
    function showResults(query) {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = "";

      if (!query) {
        resultsDiv.style.display = "none";
        return;
      }

      const transliteratedQuery = transliterateToLatin(query);
      let results = fuse.search(query);
      let results2 = fuse.search(transliteratedQuery);

      // दोनों results मिलाएं और डुप्लीकेट हटाएं
      const combined = [...results, ...results2];
      const uniqueResults = [];
      const seen = new Set();
      combined.forEach((result) => {
        if (!seen.has(result.item.title)) {
          seen.add(result.item.title);
          uniqueResults.push(result);
        }
      });

      if (uniqueResults.length === 0) {
        resultsDiv.innerHTML = "<div>No results found</div>";
        resultsDiv.style.display = "block";
        return;
      }

      uniqueResults.forEach(({ item }) => {
        const div = document.createElement("div");
        div.classList.add("result-item");
        div.innerHTML = `
          <a href="${item.url}" target="_blank" style="display:flex; align-items:center; text-decoration:none; color:inherit;">
            <img src="${item.image}" alt="${item.title}" />
            <div>
              <div class="result-title">${item.title}</div>
              <div class="result-paragraph">${item.paragraph}</div>
            </div>
          </a>
        `;
        resultsDiv.appendChild(div);
      });

      resultsDiv.style.display = "block";
    }

    // इनपुट पर showSuggestions चलाएँ
    document.getElementById("searchInput").addEventListener("input", showSuggestions);

    // Enter दबाने पर results दिखाएँ
    document.getElementById("searchInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        showResults(document.getElementById("searchInput").value.trim());
        document.getElementById("suggestions").style.display = "none";
      }
    });
