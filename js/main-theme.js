// Establish a global namespace to share data and functions
window.GKApp = window.GKApp || {};

// --- Single Source of Truth for Data ---
window.GKApp.searchData = [
    { title: "Weight & Mass Unit Conversion", url: "/conversion/weight-mass-unit-conversion", paragraph: "Convert between various units of weight and mass, such as kilograms (kg), grams (g), pounds (lb), and ounces (oz). An essential tool for science, cooking, and daily life.", date: "February 24, 2025", author: "Himanshu Tyagi", category: "Conversion" },
    { title: "विशेषण: परिभाषा, भेद, उदाहरण", url: "vyakaran/adjective-in-hindi.html", paragraph: "जो शब्द संज्ञा या सर्वनाम की विशेषता बताते हैं, उन्हें विशेषण कहते हैं। यह गुण, संख्या, परिमाण आदि से संबंधित हो सकते हैं।", date: "January 15, 2025", author: "Owner", category: "Vyakaran" },
    { title: "सर्वनाम: परिभाषा, भेद, उदाहरण", url: "vyakaran/pronoun-in-hindi.html", paragraph: "संज्ञा के स्थान पर प्रयोग होने वाले शब्दों को सर्वनाम कहते हैं। जैसे - मैं, तुम, वह, यह आदि।", date: "January 14, 2025", author: "Golu Tyagi", category: "Vyakaran" },
    { title: "कारक: परिभाषा, भेद, उदाहरण", url: "vyakaran/case-in-hindi.html", paragraph: "कारक संज्ञा या सर्वनाम का क्रिया के साथ संबंध बताते हैं। हिंदी में आठ कारक होते हैं, जिनके अपने विभक्ति चिन्ह होते हैं।", date: "January 13, 2025", author: "Himanshu Tyagi", category: "Vyakaran" },
    { title: "लिंग: परिभाषा, भेद, उदाहरण", url: "vyakaran/gender-in-hindi.html", paragraph: "जिस चिह्न से यह पता चले कि कोई संज्ञा पुरुष जाति की है या स्त्री जाति की, उसे लिंग कहते हैं। इसके दो भेद हैं - पुल्लिंग और स्त्रीलिंग।", date: "January 12, 2025", author: "Owner", category: "Vyakaran" },
    { title: "वचन: परिभाषा, भेद, उदाहरण", url: "vyakaran/number-in-hindi.html", paragraph: "शब्द के जिस रूप से उसके एक या अनेक होने का बोध हो, उसे वचन कहते हैं। हिंदी में दो वचन हैं - एकवचन और बहुवचन।", date: "January 11, 2025", author: "Golu Tyagi", category: "Vyakaran" },
    { title: "संज्ञा: परिभाषा, भेद, उदाहरण", url: "vyakaran/noun-in-hindi.html", paragraph: "किसी व्यक्ति, वस्तु, स्थान, या भाव के नाम को संज्ञा कहते हैं। इसके मुख्य भेद व्यक्तिवाचक, जातिवाचक, और भाववाचक हैं।", date: "January 10, 2025", author: "Himanshu Tyagi", category: "Vyakaran" },
    { title: "वाक्य-विचार: परिभाषा, भेद, उदाहरण", url: "vyakaran/syntax-in-hindi.html", paragraph: "शब्दों का व्यवस्थित समूह जिससे कोई अर्थ प्रकट हो, वाक्य कहलाता है। यहाँ रचना और अर्थ के आधार पर वाक्य के भेद बताए गए हैं।", date: "January 9, 2025", author: "Owner", category: "Vyakaran" },
    { title: "शब्द-विचार: परिभाषा, भेद, उदाहरण", url: "vyakaran/morphology-in-hindi.html", paragraph: "वर्णों के सार्थक समूह को शब्द कहते हैं। यहाँ उत्पत्ति, रचना, प्रयोग और अर्थ के आधार पर शब्दों के वर्गीकरण का वर्णन है।", date: "January 8, 2025", author: "Golu Tyagi", category: "Vyakaran" },
    { title: "वर्ण-विचार: परिभाषा, भेद, उदाहरण", url: "vyakaran/phonology-in-hindi.html", paragraph: "भाषा की सबसे छोटी इकाई वर्ण कहलाती है। इस खंड में स्वर और व्यंजन वर्णों के भेद, उच्चारण स्थान और वर्गीकरण की जानकारी है।", date: "January 7, 2025", author: "Himanshu Tyagi", category: "Vyakaran" },
    { title: "भाषा और व्याकरण: परिभाषा, भेद, उदाहरण", url: "vyakaran-language.html", paragraph: "भाषा विचारों के आदान-प्रदान का माध्यम है, और व्याकरण भाषा को शुद्ध रूप से लिखने और बोलने के नियम सिखाता है।", date: "January 6, 2025", author: "Owner", category: "Vyakaran" },
];

// --- HINGLISH TO HINDI TRANSLITERATION ---
window.GKApp.transliterateRomanToHindi = (input) => {
    const map = {
        consonants: {
            // Complex consonants
            'ksh': 'क्ष', 'gy': 'ज्ञ', 'dny': 'ज्ञ', 'jn': 'ज्ञ', 'shr': 'श्र',
            // 2-letter consonants
            'kh': 'ख', 'gh': 'घ', 'chh': 'छ', 'jh': 'झ',
            'th': 'थ', 'dh': 'ध', 'ph': 'फ', 'bh': 'भ',
            'shh': 'ष', 'sh': 'श', 'tr': 'त्र',
            'gn': 'ङ', 'ny': 'ञ',
            // Single consonants
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
        symbols: {
            'an': 'ं', 'am': 'ं', 'ah': 'ः',
            'om': 'ॐ', 'shree': 'श्री'
        }
    };

    let output = '';
    let i = 0;

    while (i < input.length) {
        let matched = false;

        // --- Try 4-char (e.g., shree, dnya)
        if (i + 3 < input.length) {
            const fourChar = input.substring(i, i + 4).toLowerCase();
            if (map.consonants[fourChar] || map.vowels[fourChar] || map.symbols[fourChar]) {
                output += map.consonants[fourChar] || map.vowels[fourChar] || map.symbols[fourChar];
                i += 4;
                matched = true;
            }
        }

        // --- Try 3-char combos
        if (!matched && i + 2 < input.length) {
            const threeChar = input.substring(i, i + 3).toLowerCase();
            if (map.consonants[threeChar] || map.vowels[threeChar] || map.symbols[threeChar]) {
                output += map.consonants[threeChar] || map.vowels[threeChar] || map.symbols[threeChar];
                i += 3;
                matched = true;
            }
        }

        // --- Try 2-char combos
        if (!matched && i + 1 < input.length) {
            const twoChar = input.substring(i, i + 2).toLowerCase();
            if (map.consonants[twoChar] || map.vowels[twoChar] || map.matras[twoChar] || map.symbols[twoChar]) {
                const lastChar = output.slice(-1);
                const lastIsConsonant = Object.values(map.consonants).includes(lastChar);

                if (lastIsConsonant && map.matras[twoChar] !== undefined) {
                    if (output.endsWith('्')) output = output.slice(0, -1);
                    output += map.matras[twoChar];
                } else {
                    output += map.consonants[twoChar] || map.vowels[twoChar] || map.symbols[twoChar];
                }
                i += 2;
                matched = true;
            }
        }

        // --- Single char fallback
        if (!matched) {
            const oneChar = input.charAt(i).toLowerCase();
            const lastChar = output.slice(-1);
            const lastIsConsonant = Object.values(map.consonants).includes(lastChar);

            if (lastIsConsonant && map.matras[oneChar] !== undefined) {
                if (output.endsWith('्')) output = output.slice(0, -1);
                output += map.matras[oneChar];
            } else if (map.vowels[oneChar]) {
                output += map.vowels[oneChar];
            } else if (map.consonants[oneChar]) {
                output += map.consonants[oneChar];
                // Add halant for consonant clusters
                if (i + 1 < input.length && map.consonants[input.charAt(i + 1)]) {
                    output += '्';
                }
            } else {
                output += oneChar;
            }
            i++;
        }
    }

    return output;
};


// --- LEVENSHTEIN DISTANCE ALGORITHM for Typo Tolerance ---
window.GKApp.levenshtein = (s1, s2) => {
    if (s1.length > s2.length) { [s1, s2] = [s2, s1]; }
    const distances = Array(s1.length + 1).fill(0).map((_, i) => i);
    for (let i = 0; i < s2.length; i++) {
        let prev = i + 1;
        for (let j = 0; j < s1.length; j++) {
            const current = distances[j];
            distances[j] = prev;
            prev = s1[j] === s2[i] ? current : 1 + Math.min(current, prev, distances[j+1]);
        }
        distances[s1.length] = prev;
    }
    return distances[s1.length];
};

// --- ADVANCED FUZZY SEARCH with TYPO TOLERANCE ---
window.GKApp.fuzzySearch = function (query, items) {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (!lowerCaseQuery) return [];

    const hindiQuery = window.GKApp.transliterateRomanToHindi(lowerCaseQuery);
    
    // Split query by space or common punctuation
    const queryWords = lowerCaseQuery.split(/[\s,،।.]+/).filter(w => w);
    const hindiQueryWords = hindiQuery.split(/[\s,،।.]+/).filter(w => w);
    const allQueryWords = [...new Set([...queryWords, ...hindiQueryWords])];

    const results = items.map(item => {
        let score = 0;
        const matchedWords = new Set();
        
        // Combine title and paragraph for a full search field
        const content = `${item.title} ${item.paragraph}`;
        const contentWords = content.split(/[\s,،।.]+/);

        allQueryWords.forEach(qWord => {
            let bestMatchScore = 0;
            
            contentWords.forEach(cWord => {
                const distance = window.GKApp.levenshtein(qWord.toLowerCase(), cWord.toLowerCase());
                // Allow more typos for longer words
                const threshold = qWord.length > 4 ? 2 : 1;

                if (distance <= threshold) {
                    let currentScore = 0;
                    // Higher score for title match
                    if (item.title.toLowerCase().includes(cWord.toLowerCase())) {
                       currentScore = 15;
                    } else {
                       currentScore = 5;
                    }
                    // Bonus for being a better match (less distance)
                    currentScore -= distance * 2;
                    
                    if(currentScore > bestMatchScore) {
                        bestMatchScore = currentScore;
                    }
                }
            });
            
            if (bestMatchScore > 0) {
                score += bestMatchScore;
                matchedWords.add(qWord);
            }
        });
        
        // Bonus score if all query words are matched
        if (matchedWords.size === allQueryWords.length) {
            score *= 1.5;
        }

        return { item, score };
    })
    .filter(result => result.score > 2) // Set a minimum threshold to avoid irrelevant results
    .sort((a, b) => b.score - a.score)
    .map(result => result.item);
    
  return [...new Map(results.map((item) => [item.url, item])).values()];
};


// --- SVG Placeholder for Search Results ---
window.GKApp.generatePlaceholderSVG = (title = 'G') => {
    const text = title.charAt(0).toUpperCase();
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash % 360);
    const color = `hsl(${h}, 65%, 55%)`;
    const svg = `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="${color}" />
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle" dy=".3em">${text}</text>
    </svg>`;
    return svg;
};


// --- CONCEPTUAL IMAGE GENERATOR ---
window.GKApp.generateConceptImage = (() => {
    // Optimized, web-safe dimensions to ensure full rendering (16:9 ratio)
    const W = 640;
    const H = 360;
    // Base dimensions for scaling calculations remain high for quality
    const BASE_W = 1280;
    const BASE_H = 720;
    const S = W / BASE_W; // Scale factor

    const palettes = [
        { bg1: '#6a11cb', bg2: '#2575fc', primary: '#ffffff', accent: '#f5d142' },
        { bg1: '#00c6ff', bg2: '#0072ff', primary: '#ffffff', accent: '#fefefe' },
        { bg1: '#f7971e', bg2: '#ffd200', primary: '#434343', accent: '#ffffff' },
        { bg1: '#34e89e', bg2: '#08aeea', primary: '#ffffff', accent: '#f6f0ea' },
        { bg1: '#ff4b1f', bg2: '#ff9068', primary: '#ffffff', accent: '#f7f2b2' },
        { bg1: '#1a2a6c', bg2: '#b21f1f', bg3: '#fdbb2d', primary: '#ffffff', accent: '#eeeeee' },
        { bg1: '#8e2de2', bg2: '#4a00e0', primary: '#ffffff', accent: '#d4d4d4' },
    ];

    function getPalette(title) {
        let hash = 0;
        for (let i = 0; i < title.length; i++) {
            hash = title.charCodeAt(i) + ((hash << 5) - hash);
        }
        return palettes[Math.abs(hash % palettes.length)];
    }
    
    function drawBackground(ctx, palette, w, h) {
        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, palette.bg1);
        gradient.addColorStop(1, palette.bg2);
        if (palette.bg3) gradient.addColorStop(0.5, palette.bg3);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
    }

    function drawPattern(ctx, w, h) {
        ctx.save();
        ctx.globalAlpha = 0.05;
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * w;
            const y = Math.random() * h;
            const size = Math.random() * 30 + 10;
            ctx.fillStyle = 'white';
            ctx.beginPath();
            if (i % 2 === 0) ctx.arc(x, y, size, 0, 2 * Math.PI);
            else ctx.rect(x - size/2, y-size/2, size, size);
            ctx.fill();
        }
        ctx.restore();
    }
    
    function wrapText(ctx, text, x, y, maxWidth, lineHeight, palette) {
        ctx.font = `bold 90px 'Arial', sans-serif`;
        ctx.fillStyle = palette.primary;
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 8;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.35)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 6;

        const words = text.split(' ');
        let line = '';
        const lines = [];
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            if (ctx.measureText(testLine).width > maxWidth && n > 0) {
                lines.push(line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        const startY = y - (lineHeight * (lines.length - 1)) / 2;
        for (let i = 0; i < lines.length; i++) {
            const currentLine = lines[i].trim();
            ctx.strokeText(currentLine, x, startY + i * lineHeight);
            ctx.fillText(currentLine, x, startY + i * lineHeight);
        }
        
        ctx.shadowColor = 'transparent';
    }

    function drawEducationIcons(ctx, palette, w, h) {
        ctx.save();
        ctx.globalAlpha = 0.4;
        
        ctx.translate(w * 0.15, h * 0.5);
        ctx.scale(2, 2);
        ctx.rotate(-0.15);
        ctx.fillStyle = palette.accent;
        ctx.strokeStyle = palette.primary;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(-90, -70);
        ctx.quadraticCurveTo(-10, -90, 90, -70);
        ctx.lineTo(90, 70);
        ctx.quadraticCurveTo(0, 95, -90, 70);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -80);
        ctx.lineTo(0, 82);
        ctx.stroke();

        ctx.setTransform(S, 0, 0, S, 0, 0); // Reset scale and transform
        ctx.translate(w - 250, h - 200);
        ctx.rotate(0.8);
        ctx.fillStyle = '#f5b041';
        ctx.strokeStyle = palette.primary;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.rect(-100, -15, 200, 30);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#2c3e50';
        ctx.beginPath();
        ctx.moveTo(100, -15);
        ctx.lineTo(130, 0);
        ctx.lineTo(100, 15);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }

    function drawGeometryTools(ctx, palette, w, h) {
        ctx.save();
        ctx.globalAlpha = 0.5;
        
        ctx.translate(200, h - 200);
        ctx.rotate(-0.4);
        ctx.fillStyle = palette.accent;
        ctx.strokeStyle = palette.primary;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(0, 0, 120, Math.PI, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.setTransform(S, 0, 0, S, 0, 0); // Reset
        ctx.translate(w - 200, 200);
        ctx.rotate(0.3);
        ctx.fillStyle = palette.accent;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(200,0);
        ctx.lineTo(0,200);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }

    function drawComputerIcon(ctx, palette, w, h) {
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = palette.primary;
        ctx.fillStyle = palette.accent;
        ctx.lineWidth = 8;
        
        ctx.translate(w - 350, h / 2);
        ctx.beginPath();
        ctx.roundRect(-150, -100, 300, 180, 15);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-30, 80);
        ctx.lineTo(30, 80);
        ctx.lineTo(50, 120);
        ctx.lineTo(-50, 120);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
    }
    
    function drawAbstractShapes(ctx, palette, w, h) {
        ctx.save();
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = palette.accent;
        ctx.beginPath();
        ctx.arc(w - 150, 150, 200, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = palette.primary;
        ctx.beginPath();
        ctx.moveTo(120, h - 80);
        ctx.lineTo(320, h - 120);
        ctx.lineTo(150, h - 300);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function createImageFor(title) {
        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, W, H);
        ctx.scale(S, S); // Scale the entire context

        const palette = getPalette(title);
        const name = title.toLowerCase();

        drawBackground(ctx, palette, BASE_W, BASE_H);
        drawPattern(ctx, BASE_W, BASE_H);

        if (name.includes("vyakaran") || name.includes("hindi") || name.includes("विशेषण") || name.includes("सर्वनाम") || name.includes("संज्ञा")) {
            drawEducationIcons(ctx, palette, BASE_W, BASE_H);
        } else if (name.includes("conversion") || name.includes("unit") || name.includes("mass") || name.includes("weight")) {
            drawGeometryTools(ctx, palette, BASE_W, BASE_H);
        } else if (name.includes("computer")) {
            drawComputerIcon(ctx, palette, BASE_W, BASE_H);
        } else {
            drawAbstractShapes(ctx, palette, BASE_W, BASE_H);
        }
        
        wrapText(ctx, title, BASE_W / 2, BASE_H / 2, BASE_W * 0.8, 110, palette);

        ctx.font = "600 28px 'Arial', sans-serif";
        ctx.fillStyle = palette.primary;
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.globalAlpha = 0.7;
        ctx.fillText("gklearnstudy.in", BASE_W - 30, BASE_H - 25);
        ctx.globalAlpha = 1;

        return canvas.toDataURL('image/png');
    }

    return createImageFor;
})();


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

            const imageUrl = window.GKApp.generateConceptImage(post.title);
            const imageHtml = `<img src="${imageUrl}" alt="${post.title}" loading="lazy" width="320" height="180">`;

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
                            <span class="author vcard">by <span class="name"><a class="url fn n" href="profile.html" rel="author">${post.author}</a></span></span>
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
                <div class="card-thumbnail" aria-hidden="true">
                    <a href="categories.html" class="category-badge">${post.category}</a>
                    <a href="${post.url}" class="card-image-link">${imageHtml}</a>
                </div>
                <div class="card-content">
                    <h3 class="card-title"><a href="${post.url}">${post.title}</a></h3>
                    <p class="card-summary">${post.paragraph}</p>
                </div>
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

        const shareButton = event.target.closest('.share-button');
        if (shareButton) {
            event.preventDefault();
            const postIndex = parseInt(card.dataset.index, 10);
            const post = currentFilteredPosts[postIndex];

            if (post && navigator.share) {
                navigator.share({
                    title: post.title,
                    text: post.paragraph,
                    url: new URL(post.url, window.location.origin).href,
                }).catch((error) => console.log('Error sharing:', error));
            } else {
                alert('Share functionality is not supported by your browser.');
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
