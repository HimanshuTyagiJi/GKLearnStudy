document.addEventListener("DOMContentLoaded", () => {
    // --- Utility Functions ---
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // --- DOM Elements ---
    const html = document.documentElement;
    const header = document.getElementById("header");
    const overlay = document.querySelector(".overlay");
    
    // Theme
    const themeSwitcher = document.getElementById('themeSwitcher');
    
    // Mobile Menu
    const burger = document.getElementById("burger");
    const mobileMenuContainer = document.getElementById('mobile-menu-container');
    const mobileMenuInner = mobileMenuContainer?.querySelector(".mobile-menu-inner");
    const closeMenuBtn = document.getElementById('closeMenuBtn');

    // Desktop Menu
    const menu = document.getElementById("menu");
    const menuInner = menu?.querySelector(".menu-inner");
    const leftArrow = document.getElementById('menuLeft');
    const rightArrow = document.getElementById('menuRight');
    
    // Search
    const searchBtn = document.getElementById("searchBtn");
    const backBtn = document.getElementById("backBtn");
    const searchInput = document.getElementById("searchInput");
    const suggestionsList = document.getElementById("suggestions-list");

    // Content
    const shareButton = document.getElementById("shareButton");

    // --- DYNAMIC CONTENT INJECTION ---
    const menuItems = [
        { href: "https://gklearnstudy.in", text: "Home" },
        { href: "https://gklearnstudy.in/education", text: "Education" },
        { href: "https://gklearnstudy.in/all-formulas", text: "All Formula" },
        { href: "https://gklearnstudy.in/computer", text: "Computer" },
        { href: "https://gklearnstudy.in/kaise-karen", text: "How to" },
        { href: "https://gklearnstudy.in/gk-quiz", text: "GK Quiz" },
        { href: "https://gklearnstudy.in/test", text: "Test" },
    ];

    function initMenuItems() {
        // 1. Inject into Desktop Menu
        if (menuInner) {
            menuInner.innerHTML = menuItems.map(item => `<a href="${item.href}">${item.text}</a>`).join('');
        }
        // 2. Inject into Mobile Menu
        if (mobileMenuInner) {
            mobileMenuInner.innerHTML = menuItems.map(item => `<a href="${item.href}">${item.text}</a>`).join('');
        }

        // 3. Set active class for both menus
        const currentUrl = window.location.href;
        const allLinks = document.querySelectorAll('.menu-inner a, .mobile-menu-inner a');
        let bestMatch = null;

        allLinks.forEach(link => {
            if (currentUrl.startsWith(link.href)) {
                if (!bestMatch || link.href.length > bestMatch.href.length) {
                    bestMatch = link;
                }
            }
        });
        
        if (bestMatch) {
            // Find all links matching the best match href and add 'active' class
            allLinks.forEach(link => {
                if (link.href === bestMatch.href) {
                    link.classList.add('active');
                }
            });
        }
    }

    function initFooterContent() {
        const footerContent = document.querySelector('.app-footer .footer-content');
        if (!footerContent) return;
        
        const footerData = {
            about: { title: "About GK Learn Study", text: "Your one-stop destination for knowledge, tools, and tutorials on a wide range of subjects. We aim to make learning easy and accessible for everyone." },
            company: { title: "About Us", links: [ { href: "/about.html", text: "About Us" }, { href: "/contact.html", text: "Contact Us" }, { href: "/privacy-policy.html", text: "Privacy Policy" }, { href: "/terms.html", text: "Terms of Service" } ] },
            foryou: { title: "For you", links: [ { href: "https://gklearnstudy.in/gk-quiz/ancient-indian-history", text: "Ancient Indian History" }, { href: "https://gklearnstudy.in/gk-quiz/medieval-indian-history", text: "Medieval Indian History" } ] },
            science: { title: "Science & Computer", links: [ { href: "conversion.html", text: "Conversion" }, { href: "all-formulas.html", text: "All formulas" } ] },
            socials: { title: "Follow Us", links: [ { href: "https://www.youtube.com/@GKLearnStudy", label: "YouTube", svg: '<svg viewBox="0 0 24 24" style="width:28px; fill:currentColor;"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/></svg>' } ] }
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

    // --- HANDLERS ---
    const updateArrows = () => {
        if (!leftArrow || !rightArrow || !menuInner) return;
        
        // Batch DOM reads
        const isDesktop = window.innerWidth > 850;
        const hasOverflow = menuInner.scrollWidth > menuInner.clientWidth;
        const scrollLeft = menuInner.scrollLeft;
        const maxScroll = menuInner.scrollWidth - menuInner.clientWidth;

        // Batch DOM writes
        if (!isDesktop || !hasOverflow) {
            leftArrow.style.display = "none";
            rightArrow.style.display = "none";
            return;
        }
        leftArrow.style.display = scrollLeft > 1 ? "flex" : "none";
        rightArrow.style.display = scrollLeft < maxScroll - 1 ? "flex" : "none";
    };

    const toggleMobileMenu = (show) => {
        mobileMenuContainer?.classList.toggle("is-active", show);
        overlay?.classList.toggle("is-active", show);
        document.body.style.overflow = show ? 'hidden' : '';
    };

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
        if (!mobileMenuContainer.classList.contains('is-active')) {
             overlay.classList.remove('is-active');
        }
        searchInput.value = '';
        suggestionsList.style.display = 'none';
    };
    
    // --- EVENT LISTENERS ---

    // Theme Switcher
    themeSwitcher?.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Menu
    burger?.addEventListener("click", () => toggleMobileMenu(true));
    closeMenuBtn?.addEventListener('click', () => toggleMobileMenu(false));

    // Search
    searchBtn?.addEventListener('click', openSearch);
    backBtn?.addEventListener('click', closeSearch);
    searchInput?.addEventListener('input', async () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length === 0) {
            suggestionsList.style.display = 'none';
            return;
        }
        const searchData = window.GKApp?.searchData || [];
        const fuzzySearch = window.GKApp?.fuzzySearch;
        const generateSVG = window.GKApp?.generatePlaceholderSVG;
        if (!fuzzySearch || !generateSVG) return;

        const filteredData = fuzzySearch(query, searchData);
        suggestionsList.innerHTML = '';
        if (filteredData.length > 0) {
            filteredData.slice(0, 10).forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${item.url}" class="result-card">
                        <div class="result-icon">${item.svg || generateSVG(item.title)}</div>
                        <div class="result-text"><div class="result-title">${item.title}</div><div class="result-description">${item.paragraph}</div></div>
                        <svg class="result-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
                        </a>`;
                suggestionsList.appendChild(li);
            });
        } else {
            suggestionsList.innerHTML = `<li class="no-results">No results found</li>`;
        }
        suggestionsList.style.display = 'block';
    });

    // Desktop Menu Arrows
    leftArrow?.addEventListener("click", () => menuInner.scrollBy({ left: -300, behavior: "smooth" }));
    rightArrow?.addEventListener("click", () => menuInner.scrollBy({ left: 300, behavior: "smooth" }));
    menuInner?.addEventListener("scroll", throttle(updateArrows, 100));
    window.addEventListener("resize", throttle(updateArrows, 150));

    // Share Button
    shareButton?.addEventListener("click", async () => {
        const shareData = { title: document.title, text: "Check out this comprehensive formula guide from GK Learn Study!", url: window.location.href };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                alert("Sharing is not supported on this browser, but you can copy the link manually.");
            }
        } catch (err) {
            console.error("Couldn't share content", err);
        }
    });

    // Global Listeners
    overlay?.addEventListener("click", () => {
        toggleMobileMenu(false);
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
            toggleMobileMenu(false);
        }
    });

    // --- INITIALIZATION ---
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    
    initMenuItems();
    initFooterContent();
    
    // Initial check for arrows after everything is rendered
    window.addEventListener("load", updateArrows);
});
