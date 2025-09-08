
// Establish a global namespace to share data and functions
window.GKApp = window.GKApp || {};

// --- Single Source of Truth for Data ---
window.GKApp.searchData = [
    { title: "Weight & Mass Unit Conversion", url: "/conversion/weight-mass-unit-conversion", image: "https://images.unsplash.com/photo-1590812492147-033519b5c330?w=380&h=214&fit=crop&q=80", paragraph: "Convert between various units of weight and mass, such as kilograms (kg), grams (g), pounds (lb), and ounces (oz). An essential tool for science, cooking, and daily life.", svg: `<svg viewBox="0 0 100 100"><style>.balance-beam { fill: #60a5fa; transform-origin: 50px 40px; animation: balance-swing 3s ease-in-out infinite; } .balance-base { fill: #3b82f6; } .pan { fill: #93c5fd; } @keyframes balance-swing { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } } .title { font: bold 10px sans-serif; fill: #1e3a8a; text-anchor: middle; }</style><text x="50" y="15" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">Weight & Mass</text><rect class="balance-base" x="47" y="40" width="6" height="45" /><rect class="balance-base" x="35" y="85" width="30" height="5" rx="2"/><g class="balance-beam"><rect x="10" y="35" width="80" height="10" rx="3"/><circle class="pan" cx="20" cy="60" r="15"/><circle class="pan" cx="80" cy="60" r="15"/><line stroke="#60a5fa" stroke-width="2" x1="20" y1="45" x2="20" y2="50"/><line stroke="#60a5fa" stroke-width="2" x1="80" y1="45" x2="80" y2="50"/></g></svg>`, date: "February 24, 2025", author: "Himanshu Tyagi", category: "Conversion" },
    { title: "विशेषण: परिभाषा, भेद, उदाहरण", url: "vyakaran/adjective-in-hindi.html", image: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=380&h=214&fit=crop&q=80", paragraph: "जो शब्द संज्ञा या सर्वनाम की विशेषता बताते हैं, उन्हें विशेषण कहते हैं। यह गुण, संख्या, परिमाण आदि से संबंधित हो सकते हैं।", svg: `<svg viewBox="0 0 100 100"><style>.title { font: bold 24px 'Hind', sans-serif; fill: #2980b9; text-anchor: middle; } .object { fill: #aed6f1; } .highlight { stroke: #5dade2; stroke-width: 3; fill: none; animation: glow 2s ease-in-out infinite; } @keyframes glow { 0%, 100% { stroke-dasharray: 1 10; stroke-width: 2; opacity: 0.5; } 50% { stroke-dasharray: 5 5; stroke-width: 4; opacity: 1; } }</style><text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">विशेषण</text><circle class="object" cx="50" cy="65" r="25"/><circle class="highlight" cx="50" cy="65" r="28"/></svg>`, date: "January 15, 2025", author: "Owner", category: "Vyakaran" },
    { title: "सर्वनाम: परिभाषा, भेद, उदाहरण", url: "vyakaran/pronoun-in-hindi.html", image: "https://images.unsplash.com/photo-1516534775-7472b2e89845?w=380&h=214&fit=crop&q=80", paragraph: "संज्ञा के स्थान पर प्रयोग होने वाले शब्दों को सर्वनाम कहते हैं। जैसे - मैं, तुम, वह, यह आदि।", svg: `<svg viewBox="0 0 100 100"><style>.vyakaran-title { font: bold 24px 'Hind', sans-serif; fill: #c0392b; text-anchor: middle; } .pronoun-text { font: 20px 'Hind', sans-serif; fill: #2c3e50; opacity: 0; animation: popIn 0.8s forwards; } .p1 { animation-delay: 0.5s; } .p2 { animation-delay: 1s; } .p3 { animation-delay: 1.5s; } .arrow-path { stroke: #3498db; stroke-width: 3; fill: none; stroke-dasharray: 50; stroke-dashoffset: 50; animation: drawPath 1.5s forwards 1.8s; } @keyframes popIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } @keyframes drawPath { to { stroke-dashoffset: 0; } }</style><text x="50" y="30" class="vyakaran-title" textLength="95" lengthAdjust="spacingAndGlyphs">सर्वनाम</text><text x="15" y="60" class="pronoun-text p1">मैं</text><text x="45" y="80" class="pronoun-text p2">तुम</text><text x="75" y="60" class="pronoun-text p3">वह</text><path class="arrow-path" d="M25,65 Q 50,50 75,65" /></svg>`, date: "January 14, 2025", author: "Golu Tyagi", category: "Vyakaran" },
    { title: "कारक: परिभाषा, भेद, उदाहरण", url: "vyakaran/case-in-hindi.html", image: "https://images.unsplash.com/photo-1508881598448-3242f514cd3d?w=380&h=214&fit=crop&q=80", paragraph: "कारक संज्ञा या सर्वनाम का क्रिया के साथ संबंध बताते हैं। हिंदी में आठ कारक होते हैं, जिनके अपने विभक्ति चिन्ह होते हैं।", svg: `<svg viewBox="0 0 100 100"><style>.title { font: bold 24px 'Hind', sans-serif; fill: #16a085; text-anchor: middle; } .node { fill: #a2d9ce; stroke: #1abc9c; stroke-width: 2; } .link { stroke: #16a085; stroke-width: 3; stroke-dasharray: 40; stroke-dashoffset: 40; animation: draw-link 2s ease-in-out infinite alternate; } @keyframes draw-link { to { stroke-dashoffset: 0; } }</style><text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">कारक</text><circle class="node" cx="30" cy="65" r="15"/><circle class="node" cx="70" cy="65" r="15"/><line class="link" x1="45" y1="65" x2="55" y2="65" /></svg>`, date: "January 13, 2025", author: "Himanshu Tyagi", category: "Vyakaran" },
    { title: "लिंग: परिभाषा, भेद, उदाहरण", url: "vyakaran/gender-in-hindi.html", image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=380&h=214&fit=crop&q=80", paragraph: "जिस चिह्न से यह पता चले कि कोई संज्ञा पुरुष जाति की है या स्त्री जाति की, उसे लिंग कहते हैं। इसके दो भेद हैं - पुल्लिंग और स्त्रीलिंग।", svg: `<svg viewBox="0 0 100 100"><style>.title { font: bold 24px 'Hind', sans-serif; fill: #2c3e50; text-anchor: middle; } .male { fill: #5dade2; } .female { fill: #f1948a; } .symbol { transition: transform 0.4s ease-in-out; } .container:hover .male { transform: translateX(-5px); } .container:hover .female { transform: translateX(5px); } </style><text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">लिंग</text><g class="container"><g class="symbol male"><circle cx="40" cy="60" r="15"/><path d="M40 45 V 30 M 30 30 H 50" stroke="#5dade2" stroke-width="3" fill="none" stroke-linecap="round"/></g><g class="symbol female"><circle cx="60" cy="60" r="15"/><path d="M60 75 V 90 M 50 90 H 70" stroke="#f1948a" stroke-width="3" fill="none" stroke-linecap="round"/></g></g></svg>`, date: "January 12, 2025", author: "Owner", category: "Vyakaran" },
    { title: "वचन: परिभाषा, भेद, उदाहरण", url: "vyakaran/number-in-hindi.html", image: "https://images.unsplash.com/photo-1474224017042-45d2e1e658a0?w=380&h=214&fit=crop&q=80", paragraph: "शब्द के जिस रूप से उसके एक या अनेक होने का बोध हो, उसे वचन कहते हैं। हिंदी में दो वचन हैं - एकवचन और बहुवचन।", svg: `<svg viewBox="0 0 100 100"><style>.title { font: bold 24px 'Hind', sans-serif; fill: #9b59b6; text-anchor: middle; } .one { fill: #d7bde2; animation: fade-out 4s linear infinite; } .many { fill: #a569bd; opacity: 0; animation: fade-in 4s linear infinite; } @keyframes fade-out { 0%, 80% { opacity: 1; } 100% { opacity: 0; } } @keyframes fade-in { 0%, 20% { opacity: 0; } 100% { opacity: 1; } }</style><text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">वचन</text><circle class="one" cx="50" cy="65" r="20"/><g class="many"><circle cx="35" cy="65" r="10" /><circle cx="65" cy="65" r="10" /><circle cx="50" cy="50" r="10" /></g></svg>`, date: "January 11, 2025", author: "Golu Tyagi", category: "Vyakaran" },
    { title: "संज्ञा: परिभाषा, भेद, उदाहरण", url: "vyakaran/noun-in-hindi.html", image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=380&h=214&fit=crop&q=80", paragraph: "किसी व्यक्ति, वस्तु, स्थान, या भाव के नाम को संज्ञा कहते हैं। इसके मुख्य भेद व्यक्तिवाचक, जातिवाचक, और भाववाचक हैं।", svg: `<svg viewBox="0 0 100 100"><style>.vyakaran-title { font: bold 24px 'Hind', sans-serif; fill: #e67e22; text-anchor: middle; } .vyakaran-icon { opacity: 0; animation: fadeInScale 1s ease-out forwards; } .icon-person { animation-delay: 0.5s; fill: #3498db; } .icon-place { animation-delay: 1s; fill: #2ecc71; } .icon-thing { animation-delay: 1.5s; fill: #9b59b6; } @keyframes fadeInScale { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }</style><text x="50" y="30" class="vyakaran-title" textLength="95" lengthAdjust="spacingAndGlyphs">संज्ञा</text><circle class="vyakaran-icon icon-person" cx="25" cy="65" r="10"/><rect class="vyakaran-icon icon-person" x="18" y="75" width="14" height="15" rx="5"/><polygon class="vyakaran-icon icon-place" points="40,55 60,55 50,45" /><rect class="vyakaran-icon icon-place" x="42" y="55" width="16" height="20"/><path class="vyakaran-icon icon-thing" d="M75,55 C65,55 65,65 70,70 S80,75 80,65 C85,55 80,55 75,55 Z" /><path class="vyakaran-icon icon-thing" d="M75,55 Q 80 50, 78 45" stroke="#16a085" stroke-width="2" fill="none"/></svg>`, date: "January 10, 2025", author: "Himanshu Tyagi", category: "Vyakaran" },
    { title: "वाक्य-विचार: परिभाषा, भेद, उदाहरण", url: "vyakaran/syntax-in-hindi.html", image: "https://images.unsplash.com/photo-1453928582365-b6ad3332a09a?w=380&h=214&fit=crop&q=80", paragraph: "शब्दों का व्यवस्थित समूह जिससे कोई अर्थ प्रकट हो, वाक्य कहलाता है। यहाँ रचना और अर्थ के आधार पर वाक्य के भेद बताए गए हैं।", svg: `<svg viewBox="0 0 100 100"><style>.title { font: bold 22px 'Hind', sans-serif; fill: #34495e; text-anchor: middle; } .word-box { fill: #d6dbdf; stroke: #bdc3c7; stroke-width: 1.5; } .w1, .w2, .w3 { animation: arrange-words 3s ease-in-out infinite; } .w2 { animation-delay: -0.2s; } .w3 { animation-delay: -0.4s; } @keyframes arrange-words { 0%, 100% { y: 70; } 50% { y: 50; } }</style><text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">वाक्य-विचार</text><rect class="word-box w1" x="15" y="50" width="20" height="20" rx="3" /><rect class="word-box w2" x="40" y="50" width="20" height="20" rx="3" /><rect class="word-box w3" x="65" y="50" width="20" height="20" rx="3" /></svg>`, date: "January 9, 2025", author: "Owner", category: "Vyakaran" },
    { title: "शब्द-विचार: परिभाषा, भेद, उदाहरण", url: "vyakaran/morphology-in-hindi.html", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=380&h=214&fit=crop&q=80", paragraph: "वर्णों के सार्थक समूह को शब्द कहते हैं। यहाँ उत्पत्ति, रचना, प्रयोग और अर्थ के आधार पर शब्दों के वर्गीकरण का वर्णन है।", svg: `<svg viewBox="0 0 100 100"><style>.title { font: bold 22px 'Hind', sans-serif; fill: #d35400; text-anchor: middle; } .letter { font: 25px 'Hind', sans-serif; fill: #e67e22; animation: form-word 3s ease-in-out infinite; } .l1 { transform: translateX(30px); animation-delay: 0s; } .l2 { transform: translateX(-30px); animation-delay: -0.2s; } @keyframes form-word { 50% { transform: translateX(0); } }</style><text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">शब्द-विचार</text><text class="letter l1" x="20" y="65">व</text><text class="letter" x="45" y="65">र्ण</text><text class="letter l2" x="70" y="65">=</text></svg>`, date: "January 8, 2025", author: "Golu Tyagi", category: "Vyakaran" },
    { title: "वर्ण-विचार: परिभाषा, भेद, उदाहरण", url: "vyakaran/phonology-in-hindi.html", image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=380&h=214&fit=crop&q=80", paragraph: "भाषा की सबसे छोटी इकाई वर्ण कहलाती है। इस खंड में स्वर और व्यंजन वर्णों के भेद, उच्चारण स्थान और वर्गीकरण की जानकारी है।", svg: `<svg viewBox="0 0 100 100"><style>.title { font: bold 22px 'Hind', sans-serif; fill: #c0392b; text-anchor: middle; } .char { font-family: 'Hind', sans-serif; font-size: 50px; fill: #e74c3c; animation: change-char 4s steps(1, end) infinite; } @keyframes change-char { 0% { opacity: 0; } 25% { opacity: 1; } 50% { opacity: 0; } }</style><text x="50" y="30" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">वर्ण-विचार</text><text x="40" y="75" class="char">अ</text><text x="40" y="75" class="char" style="animation-delay: -2s;">क</text></svg>`, date: "January 7, 2025", author: "Himanshu Tyagi", category: "Vyakaran" },
    { title: "भाषा और व्याकरण: परिभाषा, भेद, उदाहरण", url: "vyakaran-language.html", image: "https://images.unsplash.com/photo-1491841550275-5b462bf48375?w=380&h=214&fit=crop&q=80", paragraph: "भाषा विचारों के आदान-प्रदान का माध्यम है, और व्याकरण भाषा को शुद्ध रूप से लिखने और बोलने के नियम सिखाता है।", svg: `<svg viewBox="0 0 100 100"><style>.title { font: bold 18px 'Hind', sans-serif; fill: #2c3e50; text-anchor: middle; } .book-cover { fill: #34495e; } .book-page { fill: #ecf0f1; transform-origin: left; animation: turn-page 3s ease-in-out infinite; } @keyframes turn-page { 0% { transform: perspective(300px) rotateY(0deg); } 50% { transform: perspective(300px) rotateY(-180deg); } 100% { transform: perspective(300px) rotateY(-180deg); } }</style><text x="50" y="25" class="title" textLength="95" lengthAdjust="spacingAndGlyphs">भाषा और व्याकरण</text><rect class="book-cover" x="25" y="35" width="50" height="60" rx="3" /><rect class="book-page" x="27" y="37" width="23" height="56" /></svg>`, date: "January 6, 2025", author: "Owner", category: "Vyakaran" },
];

window.GKApp.fuzzySearch = function (query, items) {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (!lowerCaseQuery) return [];
  const queryWords = lowerCaseQuery.split(" ").filter((w) => w.length > 1);
  const results = items
    .map((item) => {
      let score = 0;
      const title = item.title.toLowerCase();
      const paragraph = item.paragraph.toLowerCase();
      const author = item.author.toLowerCase();
      if (title.includes(lowerCaseQuery)) score += 20;
      if (paragraph.includes(lowerCaseQuery)) score += 5;
      queryWords.forEach((qWord) => {
        if (title.includes(qWord)) score += 10;
        if (paragraph.includes(qWord)) score += 2;
        if (author.includes(qWord)) score += 1;
      });
      return { item: item, score: score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);
  return [...new Map(results.map((item) => [item.url, item])).values()];
};

window.GKApp.generatePlaceholderSVG = function (title) {
    const colors = ['#fecaca', '#fed7aa', '#fef08a', '#d9f99d', '#bfdbfe', '#e9d5ff', '#ffc0cb', '#b2f2bb', '#a7f3d0'];
    const color = colors[(title || '').length % colors.length];
    const initial = (title || 'A').charAt(0).toUpperCase();
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="${color}" />
                <text x="50" y="55" font-family="Roboto, sans-serif" font-size="50" dy=".1em" fill="#444" text-anchor="middle">${initial}</text>
            </svg>`;
};


document.addEventListener("DOMContentLoaded", () => {
    const POSTS_PER_PAGE = 25;
    const postsContainer = document.getElementById("post-grid");
    const postFilterInput = document.getElementById("post-filter-input");
    const categoryLinks = document.querySelectorAll(".category-list a");
    const loadMoreBtn = document.getElementById("load-more-btn");
    
    if (!postsContainer || !loadMoreBtn) {
      console.error("Required elements for post grid not found.");
      return;
    }

    const allPosts = window.GKApp.searchData;
    let currentFilteredPosts = [...allPosts];
    let visiblePostCount = POSTS_PER_PAGE;

    const renderPosts = (posts) => {
        postsContainer.innerHTML = "";
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p class="no-posts-found">No articles match your filter.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();
        posts.forEach((post, index) => {
            const card = document.createElement('article');
            card.className = 'card';
            card.setAttribute('aria-label', post.title);
            card.dataset.index = index; 

            let imageOrSvgHtml = "";
            if (post.image) {
                imageOrSvgHtml = `<img src="${post.image}" alt="${post.title}" loading="lazy">`;
            } else if (post.svg) {
                imageOrSvgHtml = post.svg;
            } else {
                imageOrSvgHtml = window.GKApp.generatePlaceholderSVG(post.title);
            }

            const clipPathId = `circle-clip-avatar-gt-${index}`;

            const metaBlock = `
                <div class="post-meta-container">
                    <div class="byline">
                        <div class="author-avatar">
                            <svg width="40" height="40" viewBox="0 0 300 300">
                                <circle cx="150" cy="150" r="150" fill="white"></circle>
                                <text x="50%" y="35%" font-size="90" font-weight="bold" fill="red" text-anchor="middle">GK</text>
                                <text x="50%" y="65%" font-size="38" fill="purple" text-anchor="middle">Learn Study</text>
                                <clipPath id="${clipPathId}"><circle cx="150" cy="150" r="150"></circle></clipPath>
                                <g clip-path="url(#${clipPathId})">
                                    <path fill="#c0a4fb" fill-opacity="1"><animate attributeName="d" dur="8s" repeatCount="indefinite" values="M0 230 Q 75 210, 150 230 T 300 210 L 300 300 L 0 300 Z; M0 240 Q 75 260, 150 240 T 300 250 L 300 300 L 0 300 Z; M0 230 Q 75 210, 150 230 T 300 210 L 300 300 L 0 300 Z"></animate></path>
                                    <path fill="#641ef9" fill-opacity="0.7"><animate attributeName="d" dur="7s" repeatCount="indefinite" values="M0 220 Q 75 245, 150 220 T 300 235 L 300 300 L 0 300 Z; M0 250 Q 75 220, 150 250 T 300 220 L 300 300 L 0 300 Z; M0 220 Q 75 245, 150 220 T 300 235 L 300 300 L 0 300 Z"></animate></path>
                                </g>
                            </svg>
                        </div>
                        <div class="author-details">
                            <span class="author vcard">by <span class="name"><a class="url fn n" href="#" rel="author">${post.author}</a></span></span>
                            <span class="entry-modified-date">Updated on <time class="entry-date updated">${post.date}</time> </span>
                        </div>
                    </div>
                    <div class="share-button-wrapper">
                        <button class="share-button" title="Share this page">
                            <svg class="share-icon" viewBox="0 0 24 24" width="20" height="20" role="img" aria-hidden="true"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path></svg>
                            <span>Share</span>
                        </button>
                    </div>
                </div>`;

            card.innerHTML = `
                <a href="${post.url}" class="card-link-wrapper">
                    <div class="card-thumbnail" aria-hidden="true">
                        <span class="category-badge">${post.category}</span>
                        ${imageOrSvgHtml}
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${post.title}</h3>
                        <p class="card-summary">${post.paragraph}</p>
                    </div>
                </a>
                ${metaBlock}
            `;
            fragment.appendChild(card);
        });
        postsContainer.appendChild(fragment);
    };

    const updatePostsDisplay = () => {
        const postsToRender = currentFilteredPosts.slice(0, visiblePostCount);
        renderPosts(postsToRender);

        if (visiblePostCount >= currentFilteredPosts.length) {
            loadMoreBtn.style.display = "none";
        } else {
            loadMoreBtn.style.display = "block";
        }
    };

    const handleFilter = (filteredPosts) => {
        currentFilteredPosts = filteredPosts;
        visiblePostCount = POSTS_PER_PAGE;
        updatePostsDisplay();
    };

    const applyFilters = () => {
        const category = document.querySelector(".category-list a.active-category")?.dataset.category || "all";
        const query = postFilterInput ? postFilterInput.value.trim().toLowerCase() : "";
        let filtered = allPosts;
        if (category.toLowerCase() !== "all") {
            filtered = filtered.filter((post) => post.category === category);
        }
        if (query) {
            filtered = window.GKApp.fuzzySearch(query, filtered);
        }
        handleFilter(filtered);
    };
  
    postsContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        if (!card) return;
        event.preventDefault();

        const shareButton = event.target.closest('.share-button');
        const postIndex = parseInt(card.dataset.index, 10);
        const post = currentFilteredPosts[postIndex];

        if (shareButton) {
            if (navigator.share && post) {
                navigator.share({
                    title: post.title,
                    text: post.paragraph,
                    url: new URL(post.url, window.location.origin).href,
                }).catch((error) => console.log('Error sharing:', error));
            } else {
                alert('Share functionality is not supported by your browser.');
            }
        } else {
            if (post) {
                window.location.href = post.url;
            }
        }
    });

    if (postFilterInput) {
        postFilterInput.addEventListener("input", applyFilters);
    }

    categoryLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            categoryLinks.forEach((l) => l.classList.remove("active-category"));
            link.classList.add("active-category");
            applyFilters();
        });
    });

    loadMoreBtn.addEventListener("click", () => {
        visiblePostCount += POSTS_PER_PAGE;
        updatePostsDisplay();
    });

    applyFilters();
});
