/* ========== GK LEARN STUDY – UNIFIED OLD-VERSION SCRIPT (menu.js) ========== */
/*  Everything enabled: header + menu + theme + protection + adsense +
    install button + redirects + image placeholder + table search +
    rating + comments + new footer injection into #social-links        */


/* ========== 1. PWA INSTALL BUTTON ========== */
document.addEventListener("DOMContentLoaded", function () {
    let deferredPrompt;

    const installBtn = document.createElement('button');
    installBtn.id = 'installBtn';
    installBtn.innerText = 'Install GK Learn App';
    installBtn.style.display = 'none';
    installBtn.style.position = 'fixed';
    installBtn.style.bottom = '20px';
    installBtn.style.right = '20px';
    installBtn.style.zIndex = '9999';
    installBtn.style.padding = '10px 15px';
    installBtn.style.backgroundColor = '#641ef9';
    installBtn.style.color = '#fff';
    installBtn.style.border = 'none';
    installBtn.style.borderRadius = '8px';
    installBtn.style.cursor = 'pointer';
    document.body.appendChild(installBtn);

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.style.display = 'block';

        installBtn.addEventListener('click', () => {
            if (!deferredPrompt) return;

            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                console.log('PWA install choice:', choiceResult.outcome);
                deferredPrompt = null;
                installBtn.style.display = 'none';
            });
        }, { once: true });
    });

    window.addEventListener('appinstalled', () => {
        installBtn.style.display = 'none';
        deferredPrompt = null;
    });
});


/* ========== 2. HEADING LEVEL AUTO-FIX (H1–H6 GAP FILL) ========== */
document.addEventListener("DOMContentLoaded", function () {
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    let lastLevel = 0;

    headings.forEach((heading, index) => {
        const currentLevel = parseInt(heading.tagName.charAt(1), 10);
        if (index === 0) {
            lastLevel = currentLevel;
            return;
        }

        if (currentLevel > lastLevel + 1) {
            const missingHeadings = [];
            for (let i = lastLevel + 1; i < currentLevel; i++) {
                const emptyHeading = document.createElement("h" + i);
                emptyHeading.innerHTML = "";
                missingHeadings.push(emptyHeading);
            }

            const parent = heading.parentNode;
            missingHeadings.forEach(mh => parent.insertBefore(mh, heading));
        }

        lastLevel = currentLevel;
    });
});


/* ========== 3. FAVICON ENSURE ========== */
(function () {
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (!existingFavicon) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = 'https://gklearnstudy.in/favicon.ico';
        link.type = 'image/x-icon';
        document.head.appendChild(link);
        console.log("Favicon added dynamically.");
    }
})();


/* ========== 4. BODY SCROLL CLASS (for sticky header / effects) ========== */
window.addEventListener('scroll', function () {
    const scrollY = window.scrollY || window.pageYOffset;
    const trigger = window.innerHeight * 0.25; // 25% scroll
    if (scrollY > trigger) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});


/* ========== 5. LINK TITLE + SECURITY FIX (noopener) ========== */
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        if (!link.hasAttribute('title') || link.getAttribute('title').trim() === "") {
            let titleText = link.textContent.trim();
            if (titleText === "") {
                const href = link.getAttribute('href');
                titleText = href ? `Visit: ${href}` : 'Go to link';
            }
            link.setAttribute('title', titleText);
        }

        if (link.getAttribute('target') === '_blank') {
            const currentRel = link.getAttribute('rel') || '';
            if (!currentRel.includes('noopener')) {
                link.setAttribute('rel', (currentRel + ' noopener noreferrer').trim());
            }
        }
    });
});


/* ========== 6. ADSENSE INJECT ========== */
(function () {
    const existing = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
    if (existing) return;

    const adsScript = document.createElement("script");
    adsScript.setAttribute("async", "");
    adsScript.setAttribute("src", "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7067722696020503");
    adsScript.setAttribute("crossorigin", "anonymous");
    document.head.appendChild(adsScript);
})();


/* ========== 7. PROTECTION: RIGHT-CLICK + KEYS + VIEW-SOURCE REDIRECT ========== */
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

document.addEventListener("keydown", function (e) {
    if (
        (e.ctrlKey && e.key.toLowerCase() === "s") ||
        (e.ctrlKey && e.key.toLowerCase() === "u") ||
        (e.ctrlKey && e.key.toLowerCase() === "c") ||
        (e.ctrlKey && e.key.toLowerCase() === "p") ||
        (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "I")
    ) {
        e.preventDefault();
    }
});

if (window.location.protocol === 'view-source:') {
    window.location.href = "https://gklearnstudy.in";
}


/* ========== 8. IMAGE ERROR → PLACEHOLDER CARD ========== */
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img");

    images.forEach(img => {
        const imagePath = img.src.split('/').pop();
        const image = new Image();
        image.src = img.src;

        image.onload = () => {
            // OK
        };

        image.onerror = () => {
            const name = imagePath.split(".")[0];
            const placeholder = document.createElement("div");
            placeholder.className = "placeholder";
            placeholder.innerHTML = `
                <div class="emoji">📘</div>
                <div>${name.charAt(0).toUpperCase() + name.slice(1)}</div>
            `;
            img.replaceWith(placeholder);
        };
    });
});


/* ========== 9. SEARCH INPUT BEHAVIOR (OLD TOP SEARCH) ========== */
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === "Tab") {
            event.preventDefault();
            console.log("Search function blocked from submit.");
        }
    });

    searchInput.addEventListener("focus", function () {
        document.querySelectorAll("input").forEach((input) => {
            if (input !== this) {
                input.setAttribute("tabindex", "-1");
            }
        });
    });

    searchInput.addEventListener("blur", function () {
        document.querySelectorAll("input").forEach((input) => {
            input.removeAttribute("tabindex");
        });
    });
});


/* ========== 10. REDIRECT RULES (OLD PATHS) ========== */
if (window.location.pathname === "/hindi-test-part-01") {
    window.location.replace("/hindi-test/part-01");
}
if (window.location.pathname === "/vyakaran.html") {
    window.location.replace("/vyakaran-language.html");
}


/* ========== 11. THEME TOGGLE (SUN / MOON) + HEADER + MENU ========== */
// NOTE: This builds the OLD VERSION header + menu on every page
const body = document.body;
const themeToggle = document.createElement('button');
const themeIcon = document.createElement('span');

themeToggle.id = 'themeToggle';
themeIcon.id = 'themeIcon';

const sunIcon = `
<svg id="sunIcon" fill="yellow" viewBox="-87.6 -87.6 1051.20 1051.20" stroke="red" stroke-width="20.00876" aria-hidden="true">
    <g>
        <circle cx="438" cy="438" r="246"></circle>
        <path d="M420.5,163h35c11.046,0,20-8.954,20-20V20c0-11.046-8.954-20-20-20h-35c-11.046,0-20,8.954-20,20v123C400.5,154.046,409.454,163,420.5,163z"></path>
        <path d="M713,420.5v35c0,11.046,8.954,20,20,20h123c11.046,0,20-8.954,20-20v-35c0-11.046-8.954-20-20-20H733C721.954,400.5,713,409.454,713,420.5z"></path>
        <path d="M455.5,876c11.046,0,20-8.954,20-20V733c0-11.046-8.954-20-20-20h-35c-11.046,0-20,8.954-20,20v123c0,11.046,8.954,20,20,20H455.5z"></path>
        <path d="M20,475.5h123c11.046,0,20-8.954,20-20v-35c0-11.046-8.954-20-20-20H20c-11.046,0-20,8.954-20,20v35C0,466.546,8.954,475.5,20,475.5z"></path>
        <path d="M644.829,255.92c7.811,7.81,20.474,7.811,28.284,0l86.975-86.974c7.811-7.812,7.811-20.474,0-28.284l-24.749-24.749c-7.811-7.811-20.474-7.811-28.284,0l-86.975,86.974c-7.812,7.81-7.812,20.474,0,28.284L644.829,255.92z"></path>
        <path d="M735.338,760.087l24.749-24.749c7.811-7.81,7.811-20.474,0-28.284l-86.975-86.974c-7.812-7.811-20.475-7.811-28.284,0l-24.749,24.749c-7.812,7.811-7.812,20.474,0,28.284l86.975,86.974C714.865,767.898,727.528,767.898,735.338,760.087z"></path>
        <path d="M168.946,760.087l86.975-86.974c7.812-7.811,7.812-20.475,0-28.284l-24.749-24.749c-7.811-7.811-20.474-7.811-28.284,0l-86.975,86.974c-7.811,7.812-7.811,20.475,0,28.284l24.749,24.749C148.472,767.898,161.135,767.898,168.946,760.087z"></path>
        <path d="M202.887,255.92c7.811,7.811,20.474,7.81,28.284,0l24.749-24.749c7.812-7.81,7.812-20.474,0-28.284l-86.975-86.974c-7.811-7.811-20.474-7.811-28.284,0l-24.749,24.749c-7.811,7.81-7.811,20.474,0,28.284L202.887,255.92z"></path>
    </g>
</svg>`;

const moonIcon = `
<svg id="moonIcon" viewBox="0 0 48.00 48.00" fill="#ffffff" stroke="#000000" style="display: none;" aria-hidden="true">
    <path d="m32.8,29.3c-8.9-.8-16.2-7.8-17.5-16.6-.3-1.8-.3-3.7,0-5.4.2-1.4-1.4-2.3-2.5-1.6C6.3,9.7,2.1,16.9,2.5,25c.5,10.7,9,19.5,19.7,20.4,10.6.9,19.8-6,22.5-15.6.4-1.4-1-2.6-2.3-2-2.9,1.3-6.1,1.8-9.6,1.5Z"></path>
</svg>`;

themeIcon.innerHTML = sunIcon + moonIcon;
themeToggle.setAttribute('aria-label', 'Switch theme');
themeToggle.appendChild(themeIcon);
body.appendChild(themeToggle);

function switchTheme() {
    let currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        const s = document.getElementById('sunIcon');
        const m = document.getElementById('moonIcon');
        if (s) s.style.display = 'block';
        if (m) m.style.display = 'none';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        const s = document.getElementById('sunIcon');
        const m = document.getElementById('moonIcon');
        if (s) s.style.display = 'none';
        if (m) m.style.display = 'block';
        localStorage.setItem('theme', 'dark');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        const s = document.getElementById('sunIcon');
        const m = document.getElementById('moonIcon');
        if (s) s.style.display = 'none';
        if (m) m.style.display = 'block';
    } else {
        document.documentElement.removeAttribute('data-theme');
        const s = document.getElementById('sunIcon');
        const m = document.getElementById('moonIcon');
        if (s) s.style.display = 'block';
        if (m) m.style.display = 'none';
    }
});
themeToggle.addEventListener('click', switchTheme);


/* ========== 12. BUILD OLD HEADER + MENU ========== */
const header = document.createElement('header');
header.className = 'header';
header.id = 'header';

const nav = document.createElement('nav');
nav.className = 'navbar container1';

const logocontainer1 = document.createElement('div');
logocontainer1.className = 'logo-container1';

const brandLink = document.createElement('a');
brandLink.href = 'https://gklearnstudy.in';
brandLink.className = 'brand';
brandLink.setAttribute('aria-label', 'GK Learn Study');
brandLink.appendChild(logocontainer1);
nav.appendChild(brandLink);

const demo2 = document.createElement('div');
demo2.className = 'demo2';
logocontainer1.appendChild(demo2);

demo2.innerHTML = `
<svg width="40" height="40" viewBox="0 0 300 300">
    <circle cx="150" cy="150" r="150" fill="white"/>
    <text x="50%" y="35%" font-size="90" font-weight="bold" fill="red" text-anchor="middle" opacity="0">
        GK
        <animate attributeName="opacity" from="0" to="1" begin="0.5s" dur="2s" fill="freeze"/>
        <animateTransform attributeName="transform" type="scale" from="0.8" to="1" begin="0.5s" dur="2s" fill="freeze"/>
    </text>
    <text x="50%" y="65%" font-size="38" fill="purple" text-anchor="middle" opacity="0">
        Learn Study
        <animate attributeName="opacity" from="0" to="1" begin="0.5s" dur="2s" fill="freeze"/>
        <animateTransform attributeName="transform" type="scale" from="0.8" to="1" begin="0.5s" dur="2s" fill="freeze"/>
    </text>
    <clipPath id="circle-clip">
        <circle cx="150" cy="150" r="150"/>
    </clipPath>
    <g clip-path="url(#circle-clip)">
        <path fill="#c0a4fb" fill-opacity="1">
            <animate attributeName="d" dur="6s" repeatCount="indefinite"
                values="
                M0 230 Q 75 220, 150 230 T 300 200 L 300 300 L 0 300 Z;
                M0 220 Q 75 230, 150 220 T 300 230 L 300 300 L 0 300 Z;
                M0 230 Q 75 220, 150 230 T 300 220 L 300 300 L 0 300 Z"
            />
        </path>
        <path fill="#641ef9" fill-opacity="0.7">
            <animate attributeName="d" dur="6s" repeatCount="indefinite"
                values="
                M0 220 Q 75 235, 150 240 T 300 230 L 300 300 L 0 300 Z;
                M0 230 Q 75 250, 150 235 T 300 220 L 300 300 L 0 300 Z;
                M0 220 Q 75 240, 150 215 T 300 250 L 300 300 L 0 300 Z"
            />
        </path>
    </g>
</svg>
`;

const burger = document.createElement('div');
burger.className = 'burger';
burger.id = 'burger';
for (let i = 0; i < 3; i++) {
    const line = document.createElement('span');
    line.className = 'burger-line';
    burger.appendChild(line);
}
nav.appendChild(burger);

const overlaySpan = document.createElement('span');
overlaySpan.className = 'overlay';
nav.appendChild(overlaySpan);

const menu = document.createElement('div');
menu.className = 'menu';
menu.id = 'menu';

const backArrow = document.createElement('span');
backArrow.className = 'back-arrow';
backArrow.innerHTML = '×';
menu.appendChild(backArrow);

const menuBrand = document.createElement('a');
menuBrand.href = 'https://gklearnstudy.in';
menuBrand.className = 'menu-brand';
menuBrand.textContent = 'GK';
menu.appendChild(menuBrand);

const leftArrow = document.createElement('div');
leftArrow.className = 'menu-arrow left';
leftArrow.innerHTML = '&#8249;';
menu.appendChild(leftArrow);

const rightArrow = document.createElement('div');
rightArrow.className = 'menu-arrow right';
rightArrow.innerHTML = '&#8250;';
menu.appendChild(rightArrow);

document.querySelectorAll('.logo-container1, .menu-inner, .burger-line').forEach(el => {
    el.style.position = 'absolute';
    el.style.transition = 'none';
});

const menuItems = [
    { text: "Home",        href: "https://gklearnstudy.in" },
    { text: "Education",   href: "https://gklearnstudy.in/education.html" },
    { text: "All Formula", href: "https://gklearnstudy.in/all-formulas.html" },
    { text: "Computer",    href: "https://gklearnstudy.in/computer.html" },
    { text: "How to",      href: "https://gklearnstudy.in/kaise-karen.html" },
    { text: "GK Quiz",     href: "https://gklearnstudy.in/gk-quiz.html" },
    { text: "Test",        href: "https://gklearnstudy.in/test.html" }
];

const menuInner = document.createElement('div');
menuInner.className = 'menu-inner';

function setActiveLink() {
    const currentPath = window.location.pathname.toLowerCase();

    menuItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;

        const itemPath = new URL(item.href).pathname.toLowerCase();

        if ((currentPath === "/" || currentPath === "/index.html") && item.text.toLowerCase() === "home") {
            link.classList.add("active");
        } else if (currentPath.includes("formula") && item.text.toLowerCase() === "all formula") {
            link.classList.add("active");
        } else if (
            (currentPath.startsWith("/gk-quiz")      && item.text.toLowerCase() === "gk quiz") ||
            (currentPath.startsWith("/computer")     && item.text.toLowerCase() === "computer") ||
            (currentPath.startsWith("/kaise-karen")  && item.text.toLowerCase() === "how to") ||
            (currentPath.startsWith("/education")    && item.text.toLowerCase() === "education") ||
            (currentPath.startsWith("/test")         && item.text.toLowerCase() === "test") ||
            (currentPath.startsWith("/hindi-test")   && item.text.toLowerCase() === "test") ||
            (currentPath.startsWith("/computer-test")&& item.text.toLowerCase() === "test")
        ) {
            link.classList.add("active");
        }

        menuInner.appendChild(link);
    });
}
setActiveLink();

menu.appendChild(menuInner);
nav.appendChild(menu);
header.appendChild(nav);
document.body.insertBefore(header, document.body.firstChild);


/* ========== 13. MENU INTERACTIVITY ========== */
document.querySelector('.burger').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('is-active');
    document.querySelector('.overlay').classList.toggle('is-active');
    document.querySelector('.burger').classList.toggle('hide');
});

document.querySelector('.overlay').addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('is-active');
    document.querySelector('.overlay').classList.remove('is-active');
    document.querySelector('.burger').classList.remove('hide');
});

document.querySelector('.back-arrow')?.addEventListener('click', () => {
    document.querySelector('.menu')?.classList.remove('is-active');
    document.querySelector('.overlay')?.classList.remove('is-active');
    document.querySelector('.burger')?.classList.remove('hide');
});

const menuInnerDiv = document.querySelector('.menu-inner');
const leftArrowDiv = document.querySelector('.menu-arrow.left');
const rightArrowDiv = document.querySelector('.menu-arrow.right');

const updateArrows = () => {
    window.requestAnimationFrame(() => {
        const scrollWidth = menuInnerDiv.scrollWidth;
        const clientWidth = menuInnerDiv.clientWidth;
        const scrollLeft = menuInnerDiv.scrollLeft;

        leftArrowDiv.style.visibility = scrollLeft > 0 ? 'visible' : 'hidden';
        rightArrowDiv.style.visibility = scrollWidth > clientWidth + scrollLeft ? 'visible' : 'hidden';
    });
};

leftArrowDiv.addEventListener('click', () => {
    menuInnerDiv.scrollBy({ left: -200, behavior: 'smooth' });
    setTimeout(updateArrows, 300);
});

rightArrowDiv.addEventListener('click', () => {
    menuInnerDiv.scrollBy({ left: 200, behavior: 'smooth' });
    setTimeout(updateArrows, 300);
});

menuInnerDiv.addEventListener('scroll', updateArrows);
updateArrows();

function activateLink(link) {
    const links = document.querySelectorAll('a');
    links.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
}


/* ========== 14. NON-SELECTABLE CONTENT + COPY BLOCK ========== */
document.addEventListener("DOMContentLoaded", function () {
    const nonSelectableTags = [
        "h1","h2","h3","h4","h5","h6",
        "p","b","th","td","tr","a",
        "br","span","div","button","input","textarea","select",
        "option","label","ul","ol","li","dl","dt","dd","em","i","code",
        "pre","blockquote","address","dfn","cite","kbd","samp","var","small",
        "sub","sup","abbr","acronym","q","ins","del"
    ];

    nonSelectableTags.forEach(tag => {
        document.querySelectorAll(tag).forEach(element => {
            element.classList.add('no-select');
        });
    });

    document.addEventListener('copy', function (e) {
        e.preventDefault();
    });
});


/* ========== 15. TABLE SEARCH FILTER (myFunction) ========== */
function myFunction() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("search");
    if (!input) return;
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    if (!table) return;
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break;
            }
        }
    }
}


/* ========== 16. RATING + COMMENTS + NEW FOOTER INJECTION (IN #social-links) ========== */
document.addEventListener("DOMContentLoaded", function () {
    const socialBox = document.getElementById("social-links");
    if (!socialBox) return;

    // Old footer controls disable
    const contactBtn = document.querySelector("footer .custom-column button");
    if (contactBtn) contactBtn.style.display = "none";

    const para = document.getElementById("my-paragraph");
    if (para) para.style.display = "none";

    // Clear any old icon content (social icons) from #social-links
    socialBox.innerHTML = "";

    // Inject full rating + comments block (same as new version) + new footer bottom
    socialBox.insertAdjacentHTML("beforeend", `
        <div id="comments-and-ratings-container">
            <div id="rating-widget-wrapper" class="rating-widget-wrapper rating-loading">
                <div class="rating-skeleton">
                    <div class="rating-skeleton-display">
                        <div class="skeleton-summary">
                            <div class="skeleton-circle"></div>
                            <div class="skeleton-line short" style="width: 80%; margin: 0 auto;"></div>
                        </div>
                        <div class="skeleton-breakdown">
                            <div class="skeleton-line" style="height: 10px;"></div>
                            <div class="skeleton-line" style="height: 10px;"></div>
                            <div class="skeleton-line" style="height: 10px;"></div>
                            <div class="skeleton-line" style="height: 10px;"></div>
                            <div class="skeleton-line" style="height: 10px;"></div>
                        </div>
                    </div>
                </div>
                <div id="rating-widget" class="rating-content">
                    <h2>Rate this Page</h2>
                    <div id="rating-display">
                        <div class="average-summary">
                            <div id="average-rating-value">0.0</div>
                            <div id="total-ratings-count">0 ratings</div>
                        </div>
                        <div class="rating-breakdown">
                            <div class="breakdown-row" data-star-level="5">
                                <span class="star-label">5 star</span>
                                <div class="progress-bar-container"><div class="progress-bar progress-bar-5"></div></div>
                                <span class="vote-count">0</span>
                            </div>
                            <div class="breakdown-row" data-star-level="4">
                                <span class="star-label">4 star</span>
                                <div class="progress-bar-container"><div class="progress-bar progress-bar-4"></div></div>
                                <span class="vote-count">0</span>
                            </div>
                            <div class="breakdown-row" data-star-level="3">
                                <span class="star-label">3 star</span>
                                <div class="progress-bar-container"><div class="progress-bar progress-bar-3"></div></div>
                                <span class="vote-count">0</span>
                            </div>
                            <div class="breakdown-row" data-star-level="2">
                                <span class="star-label">2 star</span>
                                <div class="progress-bar-container"><div class="progress-bar progress-bar-2"></div></div>
                                <span class="vote-count">0</span>
                            </div>
                            <div class="breakdown-row" data-star-level="1">
                                <span class="star-label">1 star</span>
                                <div class="progress-bar-container"><div class="progress-bar progress-bar-1"></div></div>
                                <span class="vote-count">0</span>
                            </div>
                        </div>
                    </div>
                    <div id="rating-stars">
                        <svg class="star" data-value="1" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        <svg class="star" data-value="2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        <svg class="star" data-value="3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        <svg class="star" data-value="4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        <svg class="star" data-value="5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    </div>
                    <div id="rating-login-prompt" style="display: none;">
                        <p class="muted">Please <a href="#" onclick="document.getElementById('login-btn').click(); return false;">sign in</a> to rate.</p>
                    </div>
                </div>
            </div>

            <div class="comments-wrapper comments-loading" id="comments-main-container">
                <div class="firebase-comments-widget" id="custom-comment-section">
                    <h2 id="comment-count-header"><span id="comment-count">0</span> Comments</h2>
                    <div id="auth-container">
                        <div id="user-info"></div>
                        <button id="login-btn" class="btn primary">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                <path d="M1 1h22v22H1z" fill="none"></path>
                            </svg>
                            Sign in with Google
                        </button>
                        <button id="logout-btn" class="btn">Logout</button>
                    </div>
                    <div id="login-prompt" style="display: none;">
                        <p class="muted">Please <a href="#" onclick="document.getElementById('login-btn').click(); return false;">sign in</a> to comment.</p>
                    </div>
                    <div class="comment-form-shell" id="comment-form-shell" style="display: none;">
                        <form class="comment-form" id="comment-form">
                            <div class="replying-to" id="replying-to" style="display: none;" aria-live="polite"></div>
                            <textarea id="comment" placeholder="Add a public comment..." maxlength="1000" required aria-label="Comment input"></textarea>
                            <input type="hidden" id="parent-id" value="" />
                            <div class="form-footer">
                                <div id="char-counter">0 / 1000</div>
                                <div class="actions">
                                    <button type="submit" class="btn primary" id="submit-button">Submit</button>
                                    <button type="button" class="btn" id="cancel-reply" style="display: none;">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="comments-list" class="comment-list">
                        <div class="skeleton-comment">
                            <div class="skeleton-line header"></div>
                            <div class="skeleton-line"></div>
                            <div class="skeleton-line short"></div>
                        </div>
                        <div class="skeleton-comment">
                            <div class="skeleton-line header"></div>
                            <div class="skeleton-line"></div>
                            <div class="skeleton-line short"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom" style="margin-top:20px;text-align:center;">
                © 2024 - <span id="yearNew"></span> GK Learn Study | All Rights Reserved
            </div>
        </div>
    `);

    const y = document.getElementById("yearNew");
    if (y) y.textContent = new Date().getFullYear();

    function autoLoad(src, typeModule = false) {
        if (document.querySelector('script[src="' + src + '"]')) return;
        const s = document.createElement("script");
        s.src = src;
        if (typeModule) s.type = "module";
        s.defer = true;
        document.body.appendChild(s);
    }

    autoLoad("https://gklearnstudy.in/js/comment.js", true);
    autoLoad("https://gklearnstudy.in/js/notification.js", true);
    autoLoad("https://gklearnstudy.in/js/search-data.js", false);
});
