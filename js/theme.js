document.addEventListener("DOMContentLoaded", () => {
    // --- DOM Elements ---
    const themeSwitcher = document.getElementById('themeSwitcher');
    const html = document.documentElement;
    const burger = document.getElementById("burger");
    const menu = document.getElementById("menu");
    const menuInner = menu?.querySelector(".menu-inner");
    const header = document.getElementById("header");
    const searchBtn = document.getElementById("searchBtn");
    const backBtn = document.getElementById("backBtn");
    const searchInput = document.getElementById("searchInput");
    const suggestionsList = document.getElementById("suggestions-list");
    const overlay = document.querySelector(".overlay");
    const leftArrow = document.getElementById('menuLeft');
    const rightArrow = document.getElementById('menuRight');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const horiSelector = menu?.querySelector('.hori-selector');
    
    let isInitialLoad = true;

    // --- Dynamic Content Injection ---
    function initMenuItems() {
        if (!menuInner) return;
        const menuItems = [
            { href: "#", text: "Home" },
            { href: "#", text: "Education" },
            { href: "#", text: "All Formula" },
            { href: "#", text: "Computer" },
            { href: "#", text: "How to" },
            { href: "#", text: "GK Quiz" },
            { href: "#", text: "Test" }, { href: "#", text: "All Formula" },
            { href: "#", text: "Computer" },
            { href: "#", text: "How to" },
            { href: "#", text: "GK Quiz" },
            { href: "#", text: "Test" }, { href: "#", text: "All Formula" },
            { href: "#", text: "Computer" },
            { href: "#", text: "How to" },
            { href: "#", text: "GK Quiz" },
            { href: "#", text: "Test" },
        ];
        menuInner.insertAdjacentHTML('afterbegin', menuItems.map(item => `<a href="${item.href}">${item.text}</a>`).join(''));
        menuInner.querySelector('a')?.classList.add('active'); // Set first item as active
    }

    function initFooterContent() {
        const footerContent = document.querySelector('.app-footer .footer-content');
        if (!footerContent) return;
        
        const footerData = {
            about: {
                title: "About GK Learn Study",
                text: "Your one-stop destination for knowledge, tools, and tutorials on a wide range of subjects. We aim to make learning easy and accessible for everyone."
            },
            company: {
                title: "About Us",
                links: [
                    { href: "/about.html", text: "About Us" },
                    { href: "/contact.html", text: "Contact Us" },
                    { href: "/privacy-policy.html", text: "Privacy Policy" },
                    { href: "/terms.html", text: "Terms of Service" }
                ]
            },
            foryou: {
                title: "For you",
                links: [
                     { href: "https://gklearnstudy.in/gk-quiz/ancient-indian-history", text: "Ancient Indian History" },
                     { href: "https://gklearnstudy.in/gk-quiz/medieval-indian-history", text: "Medieval Indian History" },
                ]
            },
            science: {
                 title: "Science & Computer",
                 links: [
                    { href: "conversion.html", text: "Conversion" },
                    { href: "all-formulas.html", text: "All formulas" }
                ]
            },
            socials: {
                title: "Follow Us",
                links: [
                    { href: "https://www.youtube.com/@GKLearnStudy", label: "YouTube", svg: '<svg viewBox="0 0 24 24" style="width:28px; fill:currentColor;"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/></svg>' }
                ]
            }
        };

        const createLinks = (links) => links.map(l => `<li><a href="${l.href}">${l.text}</a></li>`).join('');
        const createSocials = (links) => links.map(l => `<li><a href="${l.href}" aria-label="${l.label}" target="_blank" rel="noopener noreferrer">${l.svg}</a></li>`).join('');

        footerContent.innerHTML = `
            <div class="footer-section footer-about"><h3>${footerData.about.title}</h3><p>${footerData.about.text}</p></div>
            <div class="footer-section"><h4>${footerData.company.title}</h4><ul>${createLinks(footerData.company.links)}</ul></div>
            <div class="footer-section"><h4>${footerData.foryou.title}</h4><ul>${createLinks(footerData.foryou.links)}</ul></div>
            <div class="footer-section"><h4>${footerData.science.title}</h4><ul>${createLinks(footerData.science.links)}</ul></div>
            <div class="footer-section"><h4>${footerData.socials.title}</h4><ul class="footer-socials">${createSocials(footerData.socials.links)}</ul></div>
        `;
    }

    // --- Theme Switcher Logic ---
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    themeSwitcher.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- Mobile Burger Menu Logic ---
    const toggleMenu = (isActive) => {
        menu?.classList.toggle("is-active", isActive);
        overlay?.classList.toggle("is-active", isActive);
    };
    burger?.addEventListener("click", () => toggleMenu(!menu.classList.contains("is-active")));
    closeMenuBtn?.addEventListener('click', () => toggleMenu(false));

    // --- Search Bar Logic ---
    const openSearch = (e) => {
        e.stopPropagation();
        const isMobile = window.innerWidth <= 850;
        if (isMobile) {
            header.classList.add('search-active');
        } else {
            header.classList.add('search-active-desktop');
            overlay.classList.add('is-active');
        }
        searchInput.focus();
    };

    const closeSearch = () => {
        header.classList.remove('search-active', 'search-active-desktop');
        overlay.classList.remove('is-active');
        searchInput.value = '';
        suggestionsList.style.display = 'none';
    };

    searchBtn.addEventListener('click', openSearch);
    backBtn.addEventListener('click', closeSearch);

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        const searchData = window.GKApp?.searchData || [];
        const fuzzySearch = window.GKApp?.fuzzySearch;
        const generateSVG = window.GKApp?.generatePlaceholderSVG;

        if (!fuzzySearch || !generateSVG || query.length === 0) {
            suggestionsList.style.display = 'none';
            return;
        }
        const filteredData = fuzzySearch(query, searchData);
        suggestionsList.innerHTML = '';
        if (filteredData.length > 0) {
            filteredData.slice(0, 10).forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${item.url}" class="result-card">
                        <div class="result-icon">${item.svg || generateSVG(item.title)}</div>
                        <div class="result-text">
                            <div class="result-title">${item.title}</div>
                            <div class="result-description">${item.paragraph}</div>
                        </div>
                        <svg class="result-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
                        </a>`;
                suggestionsList.appendChild(li);
            });
        } else {
            suggestionsList.innerHTML = `<li class="no-results">No results found</li>`;
        }
        suggestionsList.style.display = 'block';
    });

    // --- Global Click/Key Listeners ---
    overlay?.addEventListener("click", () => {
        toggleMenu(false);
        closeSearch();
    });
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && !suggestionsList.contains(e.target)) {
            closeSearch();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            closeSearch();
            toggleMenu(false);
        }
    });

    // --- Arrow Scroll Logic ---
    const updateArrows = () => {
        if (!leftArrow || !rightArrow || !menuInner) return;
        const isDesktop = window.innerWidth > 850;
        if (!isDesktop) {
            leftArrow.style.display = "none";
            rightArrow.style.display = "none";
            return;
        }
        const hasOverflow = menuInner.scrollWidth > menuInner.clientWidth + 1;
        menuInner.classList.toggle('is-overflowing', hasOverflow);
        if (!hasOverflow) {
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
            return;
        }
        const scrollLeft = menuInner.scrollLeft;
        const maxScroll = menuInner.scrollWidth - menuInner.clientWidth;
        leftArrow.style.display = scrollLeft > 1 ? "flex" : "none";
        rightArrow.style.display = scrollLeft < maxScroll - 1 ? "flex" : "none";
    };
    leftArrow?.addEventListener("click", () => menuInner.scrollBy({ left: -300, behavior: "smooth" }));
    rightArrow?.addEventListener("click", () => menuInner.scrollBy({ left: 300, behavior: "smooth" }));
    
    // --- Active Menu Selector Logic ---
    const moveActiveSelector = () => {
        if (!horiSelector || !menuInner) return;
        const activeLink = menuInner.querySelector("a.active");
        if (activeLink) {
            if (isInitialLoad) horiSelector.style.transition = 'none';
            horiSelector.style.display = 'block';
            horiSelector.style.left = `${activeLink.offsetLeft}px`;
            horiSelector.style.width = `${activeLink.offsetWidth}px`;
            horiSelector.style.top = `${activeLink.offsetTop}px`;
            const isDesktop = window.innerWidth > 850;
            horiSelector.style.height = `${isDesktop ? 53 : activeLink.offsetHeight}px`;
            if (isInitialLoad) {
                void horiSelector.offsetHeight;
                horiSelector.style.transition = '';
            }
        } else {
            horiSelector.style.display = 'none';
        }
    };

    // --- Combined Initializer & Resize Handler ---
    let resizeTimer;
    const handleResizeAndLoad = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateArrows();
            moveActiveSelector();
            if (isInitialLoad) isInitialLoad = false;
        }, 150);
    };
    
    // --- INITIALIZATION ---
    initMenuItems();
    initFooterContent();
    const menuLinks = menuInner?.querySelectorAll('a');
    menuLinks?.forEach(link => {
        link.addEventListener('click', function(e) {
            if(this.getAttribute('href') === '#') e.preventDefault();
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            moveActiveSelector();
        });
    });

    menuInner?.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", handleResizeAndLoad);
    handleResizeAndLoad();
});
