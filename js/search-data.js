// Establish a global namespace to share data and functions
window.GKApp = window.GKApp || {};

// --- Asynchronous Data Loading ---
// Fetch data and create a promise to signal when it's ready.
// Other scripts can wait for this promise to resolve before using the data.
window.GKApp.dataReady = fetch('/js/search-data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        window.GKApp.searchData = data;
    })
    .catch(error => {
        console.error("Could not load search data:", error);
        // Propagate the error to allow other parts of the app to handle it gracefully.
        throw error;
    });


// --- HINGLISH TO HINDI TRANSLITERATION ---
window.GKApp.transliterateRomanToHindi = (input) => {
    const map = {
        consonants: {
            'ksh': 'क्ष', 'gy': 'ज्ञ', 'dny': 'ज्ञ', 'jn': 'ज्ञ', 'shr': 'श्र',
            'kh': 'ख', 'gh': 'घ', 'chh': 'छ', 'jh': 'झ',
            'th': 'थ', 'dh': 'ध', 'ph': 'फ', 'bh': 'भ',
            'shh': 'ष', 'sh': 'श', 'tr': 'त्र',
            'gn': 'ङ', 'ny': 'ञ',
            'k': 'क', 'g': 'ग', 'c': 'क', 'j': 'ज',
            't': 'त', 'd': 'द', 'n': 'न',
            'p': 'प', 'b': 'ब', 'm': 'म',
            'y': 'य', 'r': 'र', 'l': 'ल',
            'v': 'व', 'w': 'व', 's': 'स', 'h': 'ह',
            'z': 'ज़', 'f': 'फ़', 'q': 'क़', 'x': 'क्ष'
        },
        vowels: {
            'aa': 'आ', 'ee': 'ई', 'ii': 'ई', 'oo': 'ऊ', 'uu': 'ऊ',
            'ai': 'ऐ', 'au': 'औ', 'ri': 'ऋ',
            'a': 'अ', 'i': 'इ', 'e': 'ए',
            'o': 'ओ', 'u': 'उ'
        },
        matras: {
            'aa': 'ा', 'ee': 'ी', 'ii': 'ी', 'oo': 'ू', 'uu': 'ू',
            'ai': 'ै', 'au': 'ौ', 'ri': 'ृ',
            'a': '', 'i': 'ि', 'e': 'े',
            'o': 'ो', 'u': 'ु'
        },
        symbols: { 'an': 'ं', 'am': 'ं', 'ah': 'ः', 'om': 'ॐ', 'shree': 'श्री' }
    };
    let output = ''; let i = 0;
    while (i < input.length) {
        let matched = false;
        if (i + 3 < input.length) { const fourChar = input.substring(i, i + 4).toLowerCase(); if (map.consonants[fourChar] || map.vowels[fourChar] || map.symbols[fourChar]) { output += map.consonants[fourChar] || map.vowels[fourChar] || map.symbols[fourChar]; i += 4; matched = true; } }
        if (!matched && i + 2 < input.length) { const threeChar = input.substring(i, i + 3).toLowerCase(); if (map.consonants[threeChar] || map.vowels[threeChar] || map.symbols[threeChar]) { output += map.consonants[threeChar] || map.vowels[threeChar] || map.symbols[threeChar]; i += 3; matched = true; } }
        if (!matched && i + 1 < input.length) { const twoChar = input.substring(i, i + 2).toLowerCase(); if (map.consonants[twoChar] || map.vowels[twoChar] || map.matras[twoChar] || map.symbols[twoChar]) { const lastChar = output.slice(-1); const lastIsConsonant = Object.values(map.consonants).includes(lastChar); if (lastIsConsonant && map.matras[twoChar] !== undefined) { if (output.endsWith('्')) output = output.slice(0, -1); output += map.matras[twoChar]; } else { output += map.consonants[twoChar] || map.vowels[twoChar] || map.symbols[twoChar]; } i += 2; matched = true; } }
        if (!matched) { const oneChar = input.charAt(i).toLowerCase(); const lastChar = output.slice(-1); const lastIsConsonant = Object.values(map.consonants).includes(lastChar); if (lastIsConsonant && map.matras[oneChar] !== undefined) { if (output.endsWith('्')) output = output.slice(0, -1); output += map.matras[oneChar]; } else if (map.vowels[oneChar]) { output += map.vowels[oneChar]; } else if (map.consonants[oneChar]) { output += map.consonants[oneChar]; if (i + 1 < input.length && map.consonants[input.charAt(i + 1)]) { output += '्'; } } else { output += oneChar; } i++; }
    }
    return output;
};

// --- LEVENSHTEIN DISTANCE ALGORITHM for Typo Tolerance ---
window.GKApp.levenshtein = (s1, s2) => {
    if (s1.length > s2.length) { [s1, s2] = [s2, s1]; }
    const distances = Array(s1.length + 1).fill(0).map((_, i) => i);
    for (let i = 0; i < s2.length; i++) {
        let prev = i + 1;
        for (let j = 0; j < s1.length; j++) { const current = distances[j]; distances[j] = prev; prev = s1[j] === s2[i] ? current : 1 + Math.min(current, prev, distances[j + 1]); }
        distances[s1.length] = prev;
    }
    return distances[s1.length];
};

// --- ADVANCED FUZZY SEARCH with TYPO TOLERANCE ---
window.GKApp.fuzzySearch = function (query, items) {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (!lowerCaseQuery) return [];
    const hindiQuery = window.GKApp.transliterateRomanToHindi(lowerCaseQuery);
    const queryWords = lowerCaseQuery.split(/[\s,،।.]+/).filter(w => w);
    const hindiQueryWords = hindiQuery.split(/[\s,،।.]+/).filter(w => w);
    const allQueryWords = [...new Set([...queryWords, ...hindiQueryWords])];
    const results = items.map(item => {
        let score = 0; const matchedWords = new Set();
        const content = `${item.title} ${item.paragraph}`; const contentWords = content.split(/[\s,،।.]+/);
        allQueryWords.forEach(qWord => {
            let bestMatchScore = 0;
            contentWords.forEach(cWord => {
                const distance = window.GKApp.levenshtein(qWord.toLowerCase(), cWord.toLowerCase());
                const threshold = qWord.length > 4 ? 2 : 1;
                if (distance <= threshold) { let currentScore = 0; if (item.title.toLowerCase().includes(cWord.toLowerCase())) { currentScore = 15; } else { currentScore = 5; } currentScore -= distance * 2; if (currentScore > bestMatchScore) { bestMatchScore = currentScore; } }
            });
            if (bestMatchScore > 0) { score += bestMatchScore; matchedWords.add(qWord); }
        });
        if (matchedWords.size === allQueryWords.length) { score *= 1.5; }
        return { item, score };
    }).filter(result => result.score > 2).sort((a, b) => b.score - a.score).map(result => result.item);
    return [...new Map(results.map((item) => [item.url, item])).values()];
};

// --- SVG Placeholder for Search Results ---
window.GKApp.generatePlaceholderSVG = (title = 'G') => {
    const text = title.charAt(0).toUpperCase(); let hash = 0;
    for (let i = 0; i < title.length; i++) { hash = title.charCodeAt(i) + ((hash << 5) - hash); }
    const h = Math.abs(hash % 360); const color = `hsl(${h}, 65%, 55%)`;
    return `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="${color}" /><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle" dy=".3em">${text}</text></svg>`;
};

// --- ADVANCED CONCEPTUAL IMAGE GENERATOR ---
// Lazily initialize the image generator to reduce initial script evaluation time.
// The setup is performed only on the first call.
window.GKApp.generateConceptImage = (() => {
    let createImageFor = null; // This will hold the actual generator function

    return (title) => {
        // If the generator hasn't been initialized yet, set it up.
        if (!createImageFor) {
            const W = 640, H = 360, BASE_W = 1280, BASE_H = 720, S = W / BASE_W;
            const palettes = [ { bg1: '#6a11cb', bg2: '#2575fc', primary: '#ffffff', accent: '#f5d142' }, { bg1: '#00c6ff', bg2: '#0072ff', primary: '#ffffff', accent: '#fefefe' }, { bg1: '#f7971e', bg2: '#ffd200', primary: '#434343', accent: '#ffffff' }, { bg1: '#34e89e', bg2: '#08aeea', primary: '#ffffff', accent: '#f6f0ea' }, { bg1: '#ff4b1f', bg2: '#ff9068', primary: '#ffffff', accent: '#f7f2b2' }, { bg1: '#1a2a6c', bg2: '#b21f1f', bg3: '#fdbb2d', primary: '#ffffff', accent: '#eeeeee' }, { bg1: '#8e2de2', bg2: '#4a00e0', primary: '#ffffff', accent: '#d4d4d4' }, { bg1: '#1d2b64', bg2: '#f8cdda', primary: '#ffffff', accent: '#f0f0f0' }, { bg1: '#2193b0', bg2: '#6dd5ed', primary: '#ffffff', accent: '#f5f5f5' }, { bg1: '#ff512f', bg2: '#dd2476', primary: '#ffffff', accent: '#fdd835' }, { bg1: '#43cea2', bg2: '#185a9d', primary: '#ffffff', accent: '#e0f2f1' }, { bg1: '#c33764', bg2: '#1d2671', primary: '#ffffff', accent: '#fce4ec' }, { bg1: '#5614B0', bg2: '#dbd65c', primary: '#ffffff', accent: '#f3e5f5' }, { bg1: '#0f2027', bg2: '#203a43', bg3: '#2c5364', primary: '#ffffff', accent: '#cfd8dc' }, { bg1: '#141E30', bg2: '#243B55', primary: '#ffffff', accent: '#90a4ae' }, { bg1: '#2b5876', bg2: '#4e4376', primary: '#ffffff', accent: '#e8eaf6' }, { bg1: '#e52d27', bg2: '#b31217', primary: '#ffffff', accent: '#ffebee' }, { bg1: '#00416A', bg2: '#799F0C', bg3: '#FFE000', primary: '#ffffff', accent: '#f1f8e9' }, { bg1: '#373B44', bg2: '#4286f4', primary: '#ffffff', accent: '#e3f2fd' }, { bg1: '#1e3c72', bg2: '#2a5298', primary: '#ffffff', accent: '#d1d9ff' }, { bg1: '#3a6186', bg2: '#89253e', primary: '#ffffff', accent: '#fbe9e7' }, { bg1: '#16222A', bg2: '#3A6073', primary: '#ffffff', accent: '#eceff1' }, { bg1: '#4b6cb7', bg2: '#182848', primary: '#ffffff', accent: '#e7e9f8' }, { bg1: '#7b4397', bg2: '#dc2430', primary: '#ffffff', accent: '#fae8ff' }, { bg1: '#360033', bg2: '#0b8793', primary: '#ffffff', accent: '#e0f7fa' }];
            
            const getPalette = (titleStr) => { let hash = 0; for (let i = 0; i < titleStr.length; i++) hash = titleStr.charCodeAt(i) + ((hash << 5) - hash); return palettes[Math.abs(hash % palettes.length)]; }
            const drawBackground = (ctx, palette, w, h) => { const gradient = ctx.createLinearGradient(0, 0, w, h); gradient.addColorStop(0, palette.bg1); gradient.addColorStop(1, palette.bg2); if (palette.bg3) gradient.addColorStop(0.5, palette.bg3); ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h); }
            const drawGeometricPattern = (ctx, w, h) => { ctx.save(); ctx.globalAlpha = 0.04; for (let i = 0; i < 60; i++) { const x = Math.random() * w, y = Math.random() * h, size = Math.random() * 80 + 20; ctx.fillStyle = 'white'; ctx.beginPath(); const type = Math.random(); if (type < 0.3) ctx.arc(x, y, size / 2, 0, 2 * Math.PI); else if (type < 0.6) ctx.rect(x - size / 2, y - size / 2, size, size); else { ctx.moveTo(x, y - size / 2); ctx.lineTo(x + size / 2, y + size / 2); ctx.lineTo(x - size / 2, y + size / 2); ctx.closePath(); } ctx.fill(); } ctx.restore(); }
            const wrapText = (ctx, text, x, y, maxWidth, lineHeight, palette) => { const fontSize = text.length > 30 ? 75 : 90; ctx.font = `bold ${fontSize}px 'Arial', sans-serif`; ctx.fillStyle = palette.primary; ctx.strokeStyle = 'rgba(0,0,0,0.2)'; ctx.lineWidth = 8; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 12; ctx.shadowOffsetX = 6; ctx.shadowOffsetY = 6; const words = text.split(' '); let line = '', lines = []; for (let n = 0; n < words.length; n++) { const testLine = line + words[n] + ' '; if (ctx.measureText(testLine).width > maxWidth && n > 0) { lines.push(line); line = words[n] + ' '; } else line = testLine; } lines.push(line); const startY = y - (lineHeight * (lines.length - 1)) / 2; lines.forEach((currentLine, i) => { currentLine = currentLine.trim(); ctx.strokeText(currentLine, x, startY + i * lineHeight); ctx.fillText(currentLine, x, startY + i * lineHeight); }); ctx.shadowColor = 'transparent'; }
            
            // Define and assign the actual function.
            createImageFor = (imgTitle) => { 
                const canvas = document.createElement('canvas'); canvas.width = W; canvas.height = H; const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, W, H); ctx.scale(S, S); const palette = getPalette(imgTitle); drawBackground(ctx, palette, BASE_W, BASE_H); drawGeometricPattern(ctx, BASE_W, BASE_H); wrapText(ctx, imgTitle, BASE_W / 2, BASE_H / 2, BASE_W * 0.8, 100, palette); ctx.font = "600 28px 'Arial', sans-serif"; ctx.fillStyle = palette.primary; ctx.textAlign = "right"; ctx.textBaseline = "bottom"; ctx.globalAlpha = 0.7; ctx.fillText("gklearnstudy.in", BASE_W - 30, BASE_H - 25); ctx.globalAlpha = 1; return canvas.toDataURL('image/png'); 
            };
        }
        // Call the generator.
        return createImageFor(title);
    };
})();


/**
 * Initializes all the post-rendering logic for the current page.
 * This function should only be called after `window.GKApp.dataReady` has resolved.
 */
function initializePostRendering() {
    // --- CONFIGURATION ---
    const POSTS_INITIAL_LOAD = 40;
    const POSTS_PER_PAGE = 20;
    // Pages listed here will show random articles from the entire site in their "Related Articles" section.
    const PAGES_WITH_RANDOM_RELATED = ['kaise-karen'];

    // --- DOM Elements ---
    const postsContainer = document.getElementById("post-grid");
    const postFilterInput = document.getElementById("post-filter-input");
    const categoryListContainer = document.querySelector(".category-list");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const relatedPostsGrid = document.getElementById("related-posts-grid");

    // --- Page Context ---
    const path = window.location.pathname;
    let pageSlug = path.substring(path.lastIndexOf('/') + 1) || 'index';
    const dotIndex = pageSlug.lastIndexOf('.');
    if (dotIndex > -1) pageSlug = pageSlug.substring(0, dotIndex);
    if (pageSlug === '' || pageSlug === 'index' || pageSlug.endsWith('index.html')) pageSlug = 'index';

    // --- Post Card Creation ---
    const createPostCard = (post, index) => {
        const card = document.createElement('article');
        card.className = 'card';
        card.setAttribute('aria-label', post.title);
        card.dataset.index = index;

        const imageHtml = post.svg || `<img src="${window.GKApp.generateConceptImage(post.title)}" alt="${post.title}" loading="lazy" width="320" height="180">`;
        const clipPathId = `circle-clip-avatar-gt-${index}-${Math.random()}`;

        const metaBlock = `
            <div class="post-meta-container">
                <div class="byline">
                    <div class="author-avatar">
                        <svg width="40" height="40" viewBox="0 0 300 300"><circle cx="150" cy="150" r="150" fill="white"></circle><text x="50%" y="35%" font-size="90" font-weight="bold" fill="red" text-anchor="middle">GK</text><text x="50%" y="65%" font-size="38" fill="purple" text-anchor="middle">Learn Study</text><clipPath id="${clipPathId}"><circle cx="150" cy="150" r="150"></circle></clipPath><g clip-path="url(#${clipPathId})"><path fill="#c0a4fb" fill-opacity="1"><animate attributeName="d" dur="8s" repeatCount="indefinite" values="M0 230 Q 75 210, 150 230 T 300 210 L 300 300 L 0 300 Z; M0 240 Q 75 260, 150 240 T 300 250 L 300 300 L 0 300 Z; M0 230 Q 75 210, 150 230 T 300 210 L 300 300 L 0 300 Z"></animate></path><path fill="#641ef9" fill-opacity="0.7"><animate attributeName="d" dur="7s" repeatCount="indefinite" values="M0 220 Q 75 245, 150 220 T 300 235 L 300 300 L 0 300 Z; M0 250 Q 75 220, 150 250 T 300 220 L 300 300 L 0 300 Z; M0 220 Q 75 245, 150 220 T 300 235 L 300 300 L 0 300 Z"></animate></path></g></svg>
                    </div>
                    <div class="author-details">
                        <span class="author vcard">by <span class="name">${post.author}</span></span>
                        <span class="entry-modified-date">Updated on <time class="entry-date updated">${post.date}</time>${post.readingTime ? ` &bull; ${post.readingTime}` : ''}</span>
                    </div>
                </div>
                <div class="share-button-wrapper">
                    <button class="share-button" title="Share this page"><svg class="share-icon" viewBox="0 0 24 24" width="20" height="20"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path></svg><span>Share</span></button>
                </div>
            </div>`;

        card.innerHTML = `<div class="card-thumbnail"><a href="categories.html" class="category-badge">${post.category}</a><a href="${post.url}" class="card-image-link" tabindex="-1">${imageHtml}</a></div><div class="card-content"><h3 class="card-title"><a href="${post.url}">${post.title}</a></h3><p class="card-summary"><a href="${post.url}">${post.paragraph}</a></p></div>${metaBlock}`;
        return card;
    };

    // --- Main Post Grid Logic ---
    if (postsContainer && loadMoreBtn) {
        let pageKeyForFiltering = 'index';
        if (path.includes('/vyakaran/')) pageKeyForFiltering = 'vyakaran';
        else if (path.includes('/conversion/')) pageKeyForFiltering = 'conversion';
        else if (path.includes('/computer')) pageKeyForFiltering = 'computer';
        else if (pageSlug === 'kaise-karen') pageKeyForFiltering = 'kaise-karen';

        const allPostsForPage = (pageKeyForFiltering === 'index')
            ? window.GKApp.searchData
            : window.GKApp.searchData.filter(p => p.page && p.page.split(';').includes(pageKeyForFiltering));

        let currentFilteredPosts = [...allPostsForPage];
        let visiblePostCount = POSTS_INITIAL_LOAD;

        const renderPosts = (posts) => {
            postsContainer.innerHTML = "";
            if (posts.length === 0) { postsContainer.innerHTML = '<p class="no-posts-found">No articles match your filter.</p>'; return; }
            const fragment = document.createDocumentFragment();
            posts.forEach((post, index) => { fragment.appendChild(createPostCard(post, index)); });
            postsContainer.appendChild(fragment);
        };
        const updatePostsDisplay = () => {
            const postsToRender = currentFilteredPosts.slice(0, visiblePostCount);
            renderPosts(postsToRender);
            loadMoreBtn.style.display = (visiblePostCount >= currentFilteredPosts.length) ? "none" : "block";
        };
        const handleFilter = (filteredPosts) => { currentFilteredPosts = filteredPosts; visiblePostCount = POSTS_INITIAL_LOAD; updatePostsDisplay(); };
        const applyFilters = () => {
            const category = document.querySelector(".category-list a.active-category")?.dataset.category || "all";
            const query = postFilterInput ? postFilterInput.value.trim().toLowerCase() : "";
            let filtered = allPostsForPage;
            if (category.toLowerCase() !== "all") { filtered = filtered.filter((post) => post.category === category); }
            if (query) { filtered = window.GKApp.fuzzySearch(query, filtered); }
            handleFilter(filtered);
        };
        postsContainer.addEventListener('click', (event) => {
            const card = event.target.closest('.card'); if (!card) return;
            const shareButton = event.target.closest('.share-button');
            if (shareButton) {
                event.preventDefault();
                const postIndex = parseInt(card.dataset.index, 10);
                const post = currentFilteredPosts[postIndex];
                if (post && navigator.share) { navigator.share({ title: post.title, text: post.paragraph, url: new URL(post.url, window.location.origin).href }).catch(console.log); } else { alert('Share functionality not supported.'); }
            }
        });
        if (postFilterInput) { postFilterInput.addEventListener("input", applyFilters); }
        const generateCategories = () => {
            if (!categoryListContainer) return;
            const categoryCounts = allPostsForPage.reduce((acc, post) => { if (post.category) { acc[post.category] = (acc[post.category] || 0) + 1; } return acc; }, {});
            const categoryDisplayNames = { 'Conversion': 'Unit Conversion', 'Vyakaran': 'Vyakaran', 'Kaise Karen': 'How To', 'Computer': 'Computer Guides' };
            let categoryHTML = `<li><a href="#" data-category="all" class="active-category">All Articles <span class="category-count">${allPostsForPage.length}</span></a></li>`;
            Object.entries(categoryCounts).forEach(([category, count]) => { const displayName = categoryDisplayNames[category] || category; categoryHTML += `<li><a href="#" data-category="${category}">${displayName} <span class="category-count">${count}</span></a></li>`; });
            categoryListContainer.innerHTML = categoryHTML;
            const categoryLinks = categoryListContainer.querySelectorAll("a");
            categoryLinks.forEach((link) => { link.addEventListener("click", (e) => { e.preventDefault(); categoryLinks.forEach((l) => l.classList.remove("active-category")); link.classList.add("active-category"); applyFilters(); }); });
        };
        loadMoreBtn.addEventListener("click", () => { visiblePostCount += POSTS_PER_PAGE; updatePostsDisplay(); });
        generateCategories();
        applyFilters();
    }
    
    // --- Related Articles Logic ---
    if (relatedPostsGrid) {
        const MAX_RELATED_POSTS = 6;
        const renderPostsToGrid = (posts, grid) => {
            const fragment = document.createDocumentFragment();
            posts.slice(0, MAX_RELATED_POSTS).forEach((post, index) => { fragment.appendChild(createPostCard(post, index)); });
            grid.innerHTML = '';
            grid.appendChild(fragment);
        };
        
        const renderContextualPosts = (currentUrlPath) => {
            const allPosts = window.GKApp.searchData;
            const currentArticle = allPosts.find(p => p.url === currentUrlPath || p.url === `/${currentUrlPath}` || p.url.endsWith(currentUrlPath));
            const stopwords = new Set(['a', 'an', 'the', 'in', 'on', 'off', 'is', 'are', 'to', 'and', 'or', 'was', 'it', 'this', 'that', 'kaise', 'karen', 'how', 'to', 'do', 'get', 'kya', 'hai', 'mein', 'ko', 'of', 'for', 'with', 'html', 'in-hindi', 'kren', 'chalaye', 'definition', 'use', 'what', 'for', 'with', 'परिभाषा', 'भेद', 'उदाहरण', 'लेखन', 'शब्द', 'विचार']);
            const urlKeywords = new Set(pageSlug.split('-').filter(word => word.length > 2 && !stopwords.has(word)));
            const currentArticleTags = new Set(currentArticle && currentArticle.page ? currentArticle.page.split(';') : []);
            
            const scoredPosts = allPosts
                .filter(p => p.url !== currentArticle?.url)
                .map(post => {
                    let score = 0;
                    const postContent = `${post.title.toLowerCase()} ${post.url.toLowerCase()}`;
                    const postTags = new Set(post.page ? post.page.split(';') : []);
                    urlKeywords.forEach(keyword => { if (postContent.includes(keyword)) { score += 15; } });
                    postTags.forEach(tag => { if (currentArticleTags.has(tag)) { score += 10; } });
                    if (score > 15 && score % 10 !== 0) { score += 5; }
                    return { post, score };
                })
                .filter(item => item.score > 0)
                .sort((a, b) => b.score - a.score);

            let stickyPosts = scoredPosts.map(p => p.post);
            const stickyUrls = new Set(stickyPosts.map(p => p.url));
            let finalRelatedList = [...stickyPosts];
            
            if (finalRelatedList.length < MAX_RELATED_POSTS) {
                let fillerCandidates = [];
                if (currentArticleTags.size > 0) {
                    const primaryTag = Array.from(currentArticleTags)[0];
                     fillerCandidates = allPosts.filter(p => !stickyUrls.has(p.url) && p.url !== currentArticle?.url && p.page && p.page.split(';').includes(primaryTag));
                }
                finalRelatedList.push(...fillerCandidates.sort(() => 0.5 - Math.random()));
            }

            finalRelatedList = [...new Map(finalRelatedList.map(item => [item.url, item])).values()];
            if (finalRelatedList.length < MAX_RELATED_POSTS) {
                const existingUrls = new Set(finalRelatedList.map(p => p.url));
                if (currentArticle) existingUrls.add(currentArticle.url);
                const randomFill = allPosts.filter(p => !existingUrls.has(p.url)).sort(() => 0.5 - Math.random());
                finalRelatedList.push(...randomFill.slice(0, MAX_RELATED_POSTS - finalRelatedList.length));
            }
            
            renderPostsToGrid(finalRelatedList, relatedPostsGrid);
        };
        
        if (pageSlug === 'index' || PAGES_WITH_RANDOM_RELATED.includes(pageSlug)) {
            // For index page OR any page in the special list, show random posts from the entire site.
            const allPosts = [...window.GKApp.searchData];
            renderPostsToGrid(allPosts.sort(() => 0.5 - Math.random()), relatedPostsGrid);
        } else {
            // For all other pages, use the appropriate contextual logic.
            const mainPageSlugs = ['vyakaran', 'conversion', 'computer'];
            const isCategoryPage = mainPageSlugs.includes(pageSlug) && (path === `/${pageSlug}` || path === `/${pageSlug}.html`);

            if (isCategoryPage) {
                // Show random posts from within that specific category.
                const postsForCategory = window.GKApp.searchData.filter(p => p.page && p.page.split(';').includes(pageSlug));
                renderPostsToGrid(postsForCategory.sort(() => 0.5 - Math.random()), relatedPostsGrid);
            } else if (pageSlug) {
                // This is an individual article page. Use the smart contextual logic.
                renderContextualPosts(path.substring(1));
            } else {
                // Fallback for safety (e.g., unexpected URL).
                renderPostsToGrid([...window.GKApp.searchData].sort(() => 0.5 - Math.random()), relatedPostsGrid);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.GKApp.dataReady
        .then(initializePostRendering)
        .catch(error => {
            console.error("Failed to initialize post rendering due to data loading error:", error);
            const postsContainer = document.getElementById("post-grid");
            if (postsContainer) {
                postsContainer.innerHTML = '<p class="no-posts-found">Could not load articles. Please check your connection and try again.</p>';
            }
        });
});
