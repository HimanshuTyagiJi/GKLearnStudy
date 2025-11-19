document.addEventListener("DOMContentLoaded", function() {
    // --- UTILITY FUNCTIONS ---
    const debounce = (func, delay = 250) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

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
    const shareButton = document.getElementById("shareButton");

    // --- Dynamic Content Injection ---
    function initMenuItems() {
        if (!menuInner) return;
        const menuItems = [
            { href: "https://gklearnstudy.in/index.html", text: "Home" },
            { href: "https://gklearnstudy.in/education.html", text: "Education" },
            { href: "https://gklearnstudy.in/all-formulas.html", text: "All Formula" },
            { href: "https://gklearnstudy.in/computer.html", text: "Computer" },
            { href: "https://gklearnstudy.in/kaise-karen.html", text: "How to" },
            { href: "https://gklearnstudy.in/gk-quiz.html", text: "GK Quiz" },
            { href: "https://gklearnstudy.in/test.html", text: "Test" },
        ];
        menuInner.innerHTML = menuItems.map(item => `<a href="${item.href}">${item.text}</a>`).join('');
        
        const currentPath = window.location.pathname.split('/').pop();
        const links = menuInner.querySelectorAll('a');
        
        links.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
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
                    { href: "/terms.html", text: "Terms of Service" },
                    { href: "/comments.html", text: "Owner Dashboard", id: "dashboard-link" }
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

        const createLinks = (links) => links.map(l => `<li ${l.id ? `id="${l.id}"` : ''}><a href="${l.href}">${l.text}</a></li>`).join('');
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
    themeSwitcher?.addEventListener('click', () => {
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
        // Defer focus to prevent forced reflow by allowing the browser to paint first.
        setTimeout(() => searchInput.focus(), 0);
    };

    const closeSearch = () => {
        header.classList.remove('search-active', 'search-active-desktop');
        overlay.classList.remove('is-active');
        searchInput.value = '';
        suggestionsList.style.display = 'none';
    };

    searchBtn?.addEventListener('click', openSearch);
    backBtn?.addEventListener('click', closeSearch);
    
    const handleSearchInput = async () => {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query.length === 0) {
            suggestionsList.style.display = 'none';
            return;
        }

        await window.GKApp.dataReady;

        const searchData = window.GKApp?.searchData || [];
        const fuzzySearch = window.GKApp?.fuzzySearch;
        const generateSVG = window.GKApp?.generatePlaceholderSVG;

        if (!fuzzySearch || !generateSVG) {
            suggestionsList.style.display = 'none';
            return;
        }

        const filteredData = fuzzySearch(query, searchData);
        
        let suggestionsHTML = '';
        if (filteredData.length > 0) {
            suggestionsHTML = filteredData.slice(0, 10).map(item => `
                <li>
                    <a href="${item.url}" class="result-card">
                        <div class="result-icon">${item.svg || generateSVG(item.title)}</div>
                        <div class="result-text">
                            <div class="result-title">${item.title}</div>
                            <div class="result-description">${item.paragraph}</div>
                        </div>
                        <svg class="result-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
                    </a>
                </li>
            `).join('');
        } else {
            suggestionsHTML = `<li class="no-results">No results found</li>`;
        }

        suggestionsList.innerHTML = suggestionsHTML;
        suggestionsList.style.display = 'block';
    };
    
    searchInput?.addEventListener('input', debounce(handleSearchInput, 300));


    // --- Global Click/Key/Interaction Listeners ---
    overlay?.addEventListener("click", () => {
        toggleMenu(false);
        closeSearch();
    });
    document.addEventListener('click', (e) => {
        if (header && suggestionsList && !header.contains(e.target) && !suggestionsList.contains(e.target)) {
            closeSearch();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            closeSearch();
            toggleMenu(false);
        }
    });
    
    if (shareButton) {
        shareButton.addEventListener("click", async () => {
            const shareData = {
                title: document.title,
                text: "Check out this comprehensive formula guide from GK Learn Study!",
                url: window.location.href,
            };
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
    }

    // --- Arrow Scroll Logic ---
    let isUpdateArrowsScheduled = false;

    const updateArrows = () => {
        isUpdateArrowsScheduled = false;

        if (!leftArrow || !rightArrow || !menuInner) return;
        
        // **PERFORMANCE FIX:** Batch all DOM reads first to avoid forced reflow (layout thrashing).
        const isDesktop = window.innerWidth > 850;
        const scrollWidth = menuInner.scrollWidth;
        const clientWidth = menuInner.clientWidth;
        const scrollLeft = menuInner.scrollLeft;
        
        // Now, perform calculations and DOM writes.
        const maxScroll = scrollWidth - clientWidth;

        if (!isDesktop || scrollWidth <= clientWidth) {
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
        } else {
            leftArrow.style.display = scrollLeft > 1 ? "flex" : "none";
            rightArrow.style.display = scrollLeft < maxScroll - 1 ? "flex" : "none";
        }
    };

    const throttledUpdateArrows = () => {
        if (isUpdateArrowsScheduled) return;
        isUpdateArrowsScheduled = true;
        requestAnimationFrame(updateArrows);
    };
    
    leftArrow?.addEventListener("click", () => menuInner.scrollBy({ left: -300, behavior: "smooth" }));
    rightArrow?.addEventListener("click", () => menuInner.scrollBy({ left: 300, behavior: "smooth" }));

    // --- INITIALIZATION ---
    initMenuItems();
    initFooterContent();

    menuInner?.addEventListener("scroll", throttledUpdateArrows);
    window.addEventListener("resize", throttledUpdateArrows);
    
    // Use requestAnimationFrame to ensure initial calculation happens after layout is stable.
    window.addEventListener("load", () => requestAnimationFrame(updateArrows)); 
});

// Google AdSense Ad Blocking Recovery Full Script
(function() {
  // Step 1: Dynamically load the Google funding choices script
  var script = document.createElement('script');
  script.async = true;
  script.src = "https://fundingchoicesmessages.google.com/i/pub-7067722696020503?ers=1";
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);

  // Step 2: Signal presence (official Google function)
  function signalGooglefcPresent() {
    if (!window.frames['googlefcPresent']) {
      if (document.body) {
        const iframe = document.createElement('iframe');
        iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
        iframe.style.display = 'none';
        iframe.name = 'googlefcPresent';
        document.body.appendChild(iframe);
      } else {
        setTimeout(signalGooglefcPresent, 0);
      }
    }
  }

  // Step 3: Call it after short delay (to ensure body loaded)
  window.addEventListener('load', signalGooglefcPresent);
})();






document.addEventListener("DOMContentLoaded", function () {

    var iframe = document.createElement("iframe");
    iframe.src = "https://gklearnstudy.in/aichat.html";

    // Position bottom-right
    iframe.style.position = "fixed";
    iframe.style.right = "20px";
    iframe.style.bottom = "20px";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.style.borderRadius = "10px";
    iframe.style.zIndex = "999999";

    document.body.appendChild(iframe);
});

