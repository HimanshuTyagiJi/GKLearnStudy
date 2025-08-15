/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// --- Start of Core UI Initialization ---

/**
 * Creates and injects the navigation menu items dynamically.
 * This centralizes the menu links for easy updating across the site.
 */
function initMenuItems() {
  const menuInner = document.querySelector(".menu-inner");
  if (!menuInner) return;

  // Central array for all navigation links
  const menuItems = [
    { href: "index.html", text: "Home" },
    { href: "education.html", text: "Education" },
    { href: "all-formulas.html", text: "All Formula" },
    { href: "computer.html", text: "Computer" },
    { href: "kaise-karen.html", text: "How to" },
    { href: "gk-quiz.html", text: "GK Quiz" },
    { href: "test.html", text: "Test" },
  ];

  // Generate the HTML for the links and inject it into the menu container
  menuInner.innerHTML = menuItems
    .map((item) => `<a href="${item.href}">${item.text}</a>`)
    .join("");
}

function initNavigation() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const overlay = document.querySelector(".overlay");
  const backArrow = document.querySelector(".back-arrow");

  const toggleMenu = (isActive) => {
    menu?.classList.toggle("is-active", isActive);
    overlay?.classList.toggle("is-active", isActive);
  };

  burger?.addEventListener("click", () => toggleMenu(true));
  overlay?.addEventListener("click", () => toggleMenu(false));
  backArrow?.addEventListener("click", () => toggleMenu(false));

  const menuInner = document.querySelector(".menu-inner");
  const leftArrow = document.querySelector(".menu-arrow.left");
  const rightArrow = document.querySelector(".menu-arrow.right");

  if (menuInner && leftArrow && rightArrow) {
    const updateArrows = () => {
      requestAnimationFrame(() => {
        const { scrollWidth, clientWidth, scrollLeft } = menuInner;
        leftArrow.style.visibility = scrollLeft > 0 ? "visible" : "hidden";
        rightArrow.style.visibility =
          scrollWidth > clientWidth + scrollLeft + 1 ? "visible" : "hidden";
      });
    };

    leftArrow.addEventListener("click", () => {
      menuInner.scrollBy({ left: -200, behavior: "smooth" });
    });
    rightArrow.addEventListener("click", () => {
      menuInner.scrollBy({ left: 200, behavior: "smooth" });
    });

    menuInner.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    updateArrows();
  }

  const currentPath = window.location.pathname.toLowerCase();
  const menuLinks = document.querySelectorAll(".menu-inner a");
  menuLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname.toLowerCase();
    let isActive =
      currentPath === "/" || currentPath === "/index.html"
        ? linkPath === "/" || linkPath === "/index.html"
        : linkPath !== "/" &&
          currentPath.startsWith(linkPath.replace(".html", ""));
    if (isActive) {
      link.classList.add("active");
    }
  });
}

function initImagePlaceholders() {
  document.querySelectorAll("img").forEach((img) => {
    img.onerror = () => {
      const imageName = img.src.split("/").pop()?.split(".")[0] || "image";
      const placeholder = document.createElement("div");
      placeholder.className = "placeholder";
      placeholder.innerHTML = `<div class="emoji">📘</div><div>${
        imageName.charAt(0).toUpperCase() + imageName.slice(1)
      }</div>`;
      img.replaceWith(placeholder);
    };
  });
}

function initLinkAttributes() {
  document.querySelectorAll("a").forEach((link) => {
    if (!link.title) {
      link.title = link.textContent?.trim() || link.href;
    }
    if (link.target === "_blank") {
      link.rel = "noopener noreferrer";
    }
  });
}

function initFavicon() {
  if (!document.querySelector('link[rel="icon"]')) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = "https://gklearnstudy.in/favicon.ico";
    link.type = "image/x-icon";
    document.head.appendChild(link);
  }
}

function initReadingProgressBar() {
  const progressBar = document.getElementById("reading-progress-bar");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    progressBar.style.width =
      docHeight > 0 ? `${(window.scrollY / docHeight) * 100}%` : "0%";
  });
}

function initSocialLinks() {
  const socialLinksContainer = document.querySelector(".footer-socials");
  if (!socialLinksContainer) return;

  // Central place to manage all social media links. Just update the URL here.
  const socialLinksData = [
   
    {
      name: "YouTube",
      url: "https://www.youtube.com/@GKLearnStudy", 
      label: "YouTube",
      title: "Subscribe to our YouTube channel",
      svg: '<svg viewBox="0 0 24 24"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/></svg>',
    },
   
  
  ];

  const linksHTML = socialLinksData
    .map(
      (link) => `
        <li><a href="${link.url}" aria-label="${link.label}" title="${link.title}" target="_blank" rel="noopener noreferrer">${link.svg}</a></li>
    `
    )
    .join("");

  socialLinksContainer.innerHTML = linksHTML;
}

// --- Main Application Logic ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. Build the static UI parts
  initMenuItems(); // Create menu links first
  initNavigation(); // Then initialize navigation logic (like active states)
  initImagePlaceholders();
  initLinkAttributes();
  initFavicon();
  initReadingProgressBar();
  initSocialLinks();

  // 2. Setup Header Search Logic (Global Search)
  const searchContainer = document.querySelector(".search-container");
  const searchIcon = document.getElementById("searchBtn");
  const backIcon = document.getElementById("backBtn");
  const headerSearchInput = document.getElementById("searchInput");
  const suggestionsList = document.getElementById("suggestions-list");

  const closeHeaderSearch = () => {
    searchContainer.classList.remove("active");
    headerSearchInput.value = "";
    if (suggestionsList) {
      suggestionsList.innerHTML = "";
      suggestionsList.style.display = "none";
    }
  };

  if (searchIcon) {
    searchIcon.addEventListener("click", () => {
      searchContainer.classList.add("active");
      headerSearchInput.focus();
    });
  }

  if (backIcon) {
    backIcon.addEventListener("click", closeHeaderSearch);
  }

  if (headerSearchInput && suggestionsList) {
    headerSearchInput.addEventListener("input", () => {
      const query = headerSearchInput.value.trim();
      const searchData = window.GKApp?.searchData || [];
      const fuzzySearch = window.GKApp?.fuzzySearch;

      if (!fuzzySearch || query.length < 1) {
        suggestionsList.innerHTML = "";
        suggestionsList.style.display = "none";
        return;
      }

      const filtered = fuzzySearch(query, searchData);

      suggestionsList.style.display = "block";
      if (filtered.length > 0) {
        suggestionsList.innerHTML = filtered
          .map((post) => {
            let imageOrSvgHtml = "";
            if (post.svg) {
              imageOrSvgHtml = `<div class="result-svg-container">${post.svg}</div>`;
            } else if (post.image) {
              imageOrSvgHtml = `<img src="${post.image}" alt="${post.title}" class="result-image">`;
            }
            return `
                        <li>
                            <a href="${post.url}" class="result-card" title="${post.title}">
                                ${imageOrSvgHtml}
                                <div class="result-text">
                                    <div class="result-title">${post.title}</div>
                                    <p class="result-paragraph">${post.paragraph}</p>
                                </div>
                                <div class="result-arrow">›</div>
                            </a>
                        </li>
                    `;
          })
          .join("");
      } else {
        suggestionsList.innerHTML =
          '<li style="padding: 1rem; text-align: center; color: var(--text-secondary);">No results found.</li>';
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (
      searchContainer &&
      !searchContainer.contains(e.target) &&
      searchContainer.classList.contains("active")
    ) {
      closeHeaderSearch();
    }
  });
