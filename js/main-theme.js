
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
    const W = 1600;
    const H = 900;

    function drawGradient(ctx, w, h, c1, c2) {
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, c1);
        g.addColorStop(1, c2);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
    }

    function drawRoundedRect(ctx, x, y, w, h, r, fillStyle, strokeStyle) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        if (fillStyle) { ctx.fillStyle = fillStyle; ctx.fill(); }
        if (strokeStyle) { ctx.strokeStyle = strokeStyle; ctx.stroke(); }
    }

    function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        const lines = [];
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
                lines.push(line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);
        const startY = y - (lineHeight * (lines.length - 1)) / 2;
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i].trim(), x, startY + i * lineHeight);
        }
    }

    function drawDefault(ctx, w, h, title) {
        let hash = 0;
        for (let i = 0; i < title.length; i++) {
            hash = title.charCodeAt(i) + ((hash << 5) - hash);
        }
        const h1 = Math.abs(hash % 360);
        const h2 = (h1 + 40) % 360;
        const color1 = `hsl(${h1}, 70%, 50%)`;
        const color2 = `hsl(${h2}, 60%, 35%)`;
        drawGradient(ctx, w, h, color1, color2);

        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.font = `bold 90px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        wrapText(ctx, title, w / 2, h / 2, w * 0.8, 110);
    }

    /* --- Individual concept drawers --- */
    function drawConversion(ctx, w, h, title) {
        drawGradient(ctx, w, h, "#0f172a", "#0b3a5b");
        const cx = w / 2, cy = h / 2;
        const boxW = 260, boxH = 130;
        drawRoundedRect(ctx, cx - boxW - 40, cy - boxH / 2, boxW, boxH, 16, "rgba(255,255,255,0.95)");
        drawRoundedRect(ctx, cx + 40, cy - boxH / 2, boxW, boxH, 16, "rgba(255,255,255,0.95)");
        ctx.strokeStyle = "#ffd166"; ctx.lineWidth = 12;
        ctx.beginPath(); ctx.moveTo(cx - 20, cy); ctx.lineTo(cx + 20, cy); ctx.stroke();
        ctx.fillStyle = "#ffd166";
        ctx.beginPath(); ctx.moveTo(cx + 20, cy); ctx.lineTo(cx + 5, cy - 12); ctx.lineTo(cx + 5, cy + 12); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#06202a"; ctx.font = "bold 32px Arial"; ctx.textAlign = "center";
        ctx.fillText("From", cx - boxW / 2 - 40, cy + 10);
        ctx.fillText("To", cx + boxW / 2 + 40, cy + 10);
        ctx.fillStyle = "#fff"; ctx.font = "700 42px Arial"; ctx.fillText(title, w / 2, 100);
    }

    function drawAngle(ctx, w, h, title) {
        drawGradient(ctx, w, h, "#2b2d42", "#8d99ae");
        const cx = w * 0.36, cy = h * 0.56, r = 260;
        ctx.beginPath(); ctx.fillStyle = "#edf2f4"; ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI); ctx.fill();
        ctx.strokeStyle = "#2b2d42";
        for (let a = 0; a <= 180; a += 10) {
            const rad = (Math.PI * (180 - a)) / 180;
            const x1 = cx + Math.cos(rad) * (r - 6), y1 = cy + Math.sin(rad) * (r - 6);
            const x2 = cx + Math.cos(rad) * (r - 20), y2 = cy + Math.sin(rad) * (r - 20);
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        }
        ctx.strokeStyle = "#ef233c"; ctx.lineWidth = 8;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(Math.PI * 0.25) * 220, cy - Math.sin(Math.PI * 0.25) * 220); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(Math.PI * 0.6) * 220, cy - Math.sin(Math.PI * 0.6) * 220); ctx.stroke();
        ctx.beginPath(); ctx.strokeStyle = "#2b2d42"; ctx.lineWidth = 6; ctx.arc(cx, cy, 120, -Math.PI * 0.6, -Math.PI * 0.25); ctx.stroke();
        ctx.fillStyle = "#fff"; ctx.font = "700 44px Arial"; ctx.textAlign = "left";
        ctx.fillText(title, w * 0.55, 160);
        ctx.font = "24px Arial"; ctx.fillStyle = "#fff"; ctx.fillText("Protractor / Angle diagram", w * 0.55, 210);
    }

    function drawArea(ctx, w, h, title) {
        drawGradient(ctx, w, h, "#0f172a", "#083d77");
        ctx.fillStyle = "#e8f1ff"; ctx.globalAlpha = 0.06;
        for (let x = 0; x < w; x += 40) { ctx.fillRect(x, 0, 1, h); }
        for (let y = 0; y < h; y += 40) { ctx.fillRect(0, y, w, 1); }
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(255,205,210,0.95)"; ctx.fillRect(w * 0.22, h * 0.3, 520, 300);
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 6; ctx.strokeRect(w * 0.22, h * 0.3, 520, 300);
        ctx.fillStyle = "#06202a"; ctx.font = "700 38px Arial"; ctx.textAlign = "left";
        ctx.fillText("Area = length × width", w * 0.62, h * 0.45);
        ctx.fillStyle = "#fff"; ctx.font = "700 44px Arial"; ctx.fillText(title, w * 0.06, 110);
    }

    function drawLength(ctx, w, h, title) {
        drawGradient(ctx, w, h, "#073b4c", "#118ab2");
        const y = h * 0.6;
        ctx.fillStyle = "#fff3db"; ctx.fillRect(80, y - 30, w - 160, 60);
        ctx.strokeStyle = "#333"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(80, y); ctx.lineTo(w - 80, y); ctx.stroke();
        ctx.strokeStyle = "#333"; for (let x = 90; x < w - 80; x += 20) { ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + 10); ctx.stroke(); }
        for (let x = 90; x < w - 80; x += 100) { ctx.fillStyle = "#333"; ctx.fillText(((x - 90) / 20).toFixed(0) + "cm", x, y + 40); }
        ctx.fillStyle = "#fff"; ctx.font = "700 44px Arial"; ctx.fillText(title, 100, 140);
        ctx.font = "26px Arial"; ctx.fillText("Ruler / length units", 100, 190);
    }

    function drawPower(ctx, w, h, title) {
        drawGradient(ctx, w, h, "#0f172a", "#2b9348");
        ctx.save(); ctx.translate(w * 0.5, h * 0.45);
        ctx.fillStyle = "#ffd166";
        ctx.beginPath(); ctx.moveTo(-40, -150); ctx.lineTo(30, -20); ctx.lineTo(-10, -20); ctx.lineTo(40, 140); ctx.lineTo(-40, 40); ctx.lineTo(10, 40); ctx.closePath(); ctx.fill();
        ctx.restore();
        ctx.strokeStyle = "#95d5b2"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(80, h - 140); ctx.lineTo(w - 80, h - 140); ctx.stroke();
        ctx.fillStyle = "#fff"; ctx.font = "700 44px Arial"; ctx.fillText(title, 80, 110);
    }

    function drawPressure(ctx, w, h, title) {
        drawGradient(ctx, w, h, "#1b3b6f", "#1f7aea");
        const cx = w * 0.5, cy = h * 0.55, r = 220;
        ctx.beginPath(); ctx.fillStyle = "#fff"; ctx.arc(cx, cy, r + 20, Math.PI - 0.6, 2 * Math.PI + 0.6); ctx.fill();
        ctx.strokeStyle = "#1b3b6f"; ctx.lineWidth = 4;
        for (let a = 0; a <= 180; a += 10) {
            const rad = Math.PI + (a * Math.PI / 180);
            const x1 = cx + Math.cos(rad) * (r + 10), y1 = cy + Math.sin(rad) * (r + 10);
            const x2 = cx + Math.cos(rad) * (r - 20), y2 = cy + Math.sin(rad) * (r - 20);
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        }
        ctx.strokeStyle = "#ef233c"; ctx.lineWidth = 10;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(Math.PI * 1.2) * r * 0.8, cy + Math.sin(Math.PI * 1.2) * r * 0.8); ctx.stroke();
        ctx.fillStyle = "#fff"; ctx.font = "700 44px Arial"; ctx.fillText(title, 60, 110);
    }

    function drawSpeed(ctx, w, h, title) {
        drawGradient(ctx, w, h, "#171717", "#ff7b00");
        const cx = w * 0.5, cy = h * 0.62, r = 260;
        ctx.beginPath(); ctx.fillStyle = "#fff"; ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI); ctx.fill();
        ctx.strokeStyle = "#333"; ctx.lineWidth = 4;
        for (let i = 0; i <= 10; i++) {
            const ang = Math.PI + (i * (Math.PI / 10));
            const x1 = cx + Math.cos(ang) * (r - 10), y1 = cy + Math.sin(ang) * (r - 10);
            const x2 = cx + Math.cos(ang) * (r - 40), y2 = cy + Math.sin(ang) * (r - 40);
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        }
        ctx.strokeStyle = "#ef233c"; ctx.lineWidth = 8;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(Math.PI * 1.3) * r * 0.8, cy + Math.sin(Math.PI * 1.3) * r * 0.8); ctx.stroke();
        ctx.fillStyle = "#fff"; ctx.font = "700 44px Arial"; ctx.fillText(title, 60, 110);
    }

    function drawTemperature(ctx, w, h, title) {
        drawGradient(ctx, w, h, "#083d77", "#ffb4a2");
        const cx = w * 0.75, cy = h * 0.55;
        ctx.fillStyle = "#ff6b6b"; ctx.beginPath(); ctx.arc(cx, cy + 120, 60, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.fillRect(cx - 20, cy - 220, 40, 260);
        ctx.fillStyle = "#ff6b6b"; ctx.fillRect(cx - 16, cy + 20, 32, 160);
        ctx.fillStyle = "#fff"; ctx.font = "700 44px Arial"; ctx.fillText(title, 60, 110);
        ctx.font = "600 30px Arial"; ctx.fillText("°C / °F conversion", 60, 160);
    }

    function drawTime(ctx, w, h, title) {
        drawGradient(ctx, w, h, "#0b1b2b", "#3a506b");
        const cx = w * 0.5, cy = h * 0.45, r = 180;
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#111"; ctx.lineWidth = 6;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(-Math.PI / 3) * 90, cy + Math.sin(-Math.PI / 3) * 90); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(-Math.PI / 6) * 130, cy + Math.sin(-Math.PI / 6) * 130); ctx.stroke();
        ctx.fillStyle = "#fff"; ctx.font = "700 44px Arial"; ctx.fillText(title, 80, 110);
    }

    function drawVolume(ctx, w, h, title) {
        drawGradient(ctx, w, h, "#022b3a", "#3fb0ac");
        const left = w * 0.58, top = h * 0.22;
        ctx.fillStyle = "#fff"; ctx.fillRect(left, top, 140, 520);
        ctx.fillStyle = "#5eead4"; ctx.fillRect(left + 8, top + 450, 124, 120);
        ctx.strokeStyle = "#0b3a3a";
        for (let i = 0; i < 8; i++) {
            ctx.beginPath(); ctx.moveTo(left, top + 40 + i * 60); ctx.lineTo(left - 20, top + 40 + i * 60); ctx.stroke();
        }
        ctx.fillStyle = "#fff"; ctx.font = "700 44px Arial"; ctx.fillText(title, 60, 110);
    }

    function drawWeight(ctx, w, h, title) {
        drawGradient(ctx, w, h, "#1e1f26", "#6c5ce7");
        const cx = w * 0.5, cy = h * 0.5;
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 8;
        ctx.beginPath(); ctx.moveTo(cx, cy - 160); ctx.lineTo(cx, cy + 60); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx - 220, cy - 40); ctx.lineTo(cx + 220, cy - 40); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx - 140, cy + 80, 60, 0, Math.PI * 2); ctx.fillStyle = "#fff"; ctx.fill();
        ctx.beginPath(); ctx.arc(cx + 140, cy + 80, 60, 0, Math.PI * 2); ctx.fillStyle = "#fff"; ctx.fill();
        ctx.fillStyle = "#fff"; ctx.font = "700 44px Arial"; ctx.fillText(title, 80, 110);
    }

    function createImageFor(concept) {
        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, W, H);

        const name = concept.toLowerCase();
        if (name.includes("angle")) drawAngle(ctx, W, H, concept);
        else if (name.includes("area")) drawArea(ctx, W, H, concept);
        else if (name.includes("length")) drawLength(ctx, W, H, concept);
        else if (name.includes("power")) drawPower(ctx, W, H, concept);
        else if (name.includes("pressure")) drawPressure(ctx, W, H, concept);
        else if (name.includes("speed")) drawSpeed(ctx, W, H, concept);
        else if (name.includes("temperature")) drawTemperature(ctx, W, H, concept);
        else if (name.includes("time")) drawTime(ctx, W, H, concept);
        else if (name.includes("volume")) drawVolume(ctx, W, H, concept);
        else if (name.includes("weight")) drawWeight(ctx, W, H, concept);
        else if (name.includes("conversion")) drawConversion(ctx, W, H, concept);
        else drawDefault(ctx, W, H, concept);

        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.font = "600 24px Arial";
        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.fillText("gklearnstudy.in", W - 40, H - 40);
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
