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
    { href: "https://gklearnstudy.in/index.html", text: "Home" },
    { href: "https://gklearnstudy.in/education.html", text: "Education" },
    { href: "https://gklearnstudy.in/all-formulas.html", text: "All Formula" },
    { href: "https://gklearnstudy.in/computer.html", text: "Computer" },
    { href: "https://gklearnstudy.in/kaise-karen.html", text: "How to" },
    { href: "https://gklearnstudy.in/gk-quiz.html", text: "GK Quiz" },
    { href: "https://gklearnstudy.in/test.html", text: "Test" },
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

/**
 * Creates and injects the footer content and social links dynamically.
 * This centralizes the footer for easy updating across the site.
 */
function initFooter() {
  const footerContent = document.querySelector(".footer-content");
  if (!footerContent) return;

  const footerHTML = `
    <div class="footer-section footer-about">
        <h3>About GK Learn Study</h3>
        <p>Your one-stop destination for knowledge, tools, and tutorials on a wide range of subjects. We aim to make learning easy and accessible for everyone.</p>
    </div>
    <div class="footer-section">
        <h4>About Us</h4>
        <ul>
            <li><a href="/about.html">About Us</a></li>
            <li><a href="/contact.html">Contact Us</a></li>
            <li><a href="/privacy-policy.html">Privacy Policy</a></li>
            <li><a href="/terms.html">Terms of Service</a></li>
        </ul>
    </div>
    <div class="footer-section">
        <h4>For you</h4>
        <ul>
            <li><a href="https://gklearnstudy.in/gk-quiz/ancient-indian-history">Ancient Indian History</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/medieval-indian-history">Medieval Indian History</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/modern-indian-history">Modern Indian History</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/indian-geography-mcq-quiz">Indian Geography</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/world-geography-mcq-quiz">World Geography</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/rivers-and-lakes-mcq-quiz">Rivers and Lakes</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/physics-mcq-quiz">Physics</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/chemistry-mcq-quiz">Chemistry</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/biology-mcq-quiz">Biology</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/science-and-technology-mcq-quiz">Science and Technology</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/sanskrit-mcq-quiz">Sanskrit</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/books-and-authors-mcq-quiz">Books and Authors</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/indian-art-and-culture-mcq-quiz">Indian Art and Culture</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/indian-festivals-and-traditions-mcq-quiz">Festivals and Traditions</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/famous-monuments-mcq-quiz">Famous Monuments</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/indian-government-and-constitution-mcq-quiz">Indian Constitution</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/indian-defense-mcq-quiz">Indian Defense</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/international-relations-mcq-quiz">International Relations</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/indian-economy-mcq-quiz">Indian Economy</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/famous-personalities-mcq-quiz">Famous Personalities</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/awards-and-honors-mcq-quiz">Awards and Honors</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/technology-and-inventions-mcq-quiz">Technology and Inventions</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/space-and-universe-mcq-quiz">Space and Universe</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/environment-and-biodiversity-mcq-quiz">Environment and Biodiversity</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/wildlife-and-national-parks-mcq-quiz">Wildlife and National Parks</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/mathematical-mcq-quiz">Mathematics</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/computer-mcq-quiz">Computer</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/sports-general-knowledge-mcq-quiz">Sports GK</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/world-history">World History</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/world-organizations-mcq-quiz">World Organizations</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/important-dates-and-events-mcq-quiz">Important Dates & Events</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/disasters-and-accidents-mcq-quiz">Disasters and Accidents</a></li>
            <li><a href="https://gklearnstudy.in/gk-quiz/transport-and-communication-mcq-quiz">Transport and Communication</a></li>
        </ul>
    </div>
    <div class="footer-section">
        <h4>Science & Computer</h4>
        <ul>
            <li><a href="conversion.html">Conversion</a></li>
            <li><a href="all-formulas.html">All formulas</a></li>
        </ul>
    </div>
    <div class="footer-section">
        <h4>Follow Us</h4>
        <ul class="footer-socials"></ul>
    </div>
  `;
  footerContent.innerHTML = footerHTML;

  const socialLinksContainer = footerContent.querySelector(".footer-socials");
  if (!socialLinksContainer) return;

  const socialLinksData = [
    {
      name: "YouTube",
      url: "https://www.youtube.com/@GKLearnStudy",
      label: "YouTube",
      title: "Subscribe to our YouTube channel",
      svg: `<svg viewBox="0 0 24 24" style="width:28px; fill:currentColor;">
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
  </svg>`,
    },
  ];

  const linksHTML = socialLinksData
    .map(
      (link) =>
        `<li><a href="${link.url}" aria-label="${link.label}" title="${link.title}" target="_blank" rel="noopener noreferrer">${link.svg}</a></li>`
    )
    .join("");

  socialLinksContainer.innerHTML = linksHTML;
}

// --- Main Application Logic ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. Build the static UI parts
  initMenuItems(); // Create menu links
  initFooter(); // Create footer structure and content, including social links
  initNavigation(); // Then initialize navigation logic (like active states)
  initImagePlaceholders();
  initLinkAttributes();
  initFavicon();
  initReadingProgressBar();

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

  // 3. Setup Blog Post rendering and filtering logic (On-page filter)
  const POSTS_PER_PAGE = 25;
  const postsContainer = document.getElementById("posts-container");
  const postFilterInput = document.getElementById("post-filter-input");
  const categoryLinks = document.querySelectorAll(".category-list a");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const backToTopBtn = document.getElementById("back-to-top-btn");

  if (!postsContainer || !loadMoreBtn || !backToTopBtn) {
    return;
  }

  const allPosts = window.GKApp?.searchData || [];
  let currentFilteredPosts = [...allPosts];
  let visiblePostCount = POSTS_PER_PAGE;

  const renderPosts = (posts) => {
    // Clear skeletons or previous posts
    postsContainer.innerHTML = "";
    if (posts.length === 0) {
      postsContainer.innerHTML =
        '<p class="no-posts-found">No articles match your filter.</p>';
      return;
    }

    posts.forEach((post, index) => {
      const postElement = document.createElement("a");
      postElement.href = post.url;
      postElement.className = "post-card-link";
      postElement.setAttribute("title", post.title);

      const words = post.paragraph.split(/\s+/).length;
      const readingTime = Math.ceil(words / 225);

      let imageOrSvgHtml = "";
      if (post.svg) {
        imageOrSvgHtml = `<div class="post-card-svg-container">${post.svg}</div>`;
      } else if (post.image) {
        imageOrSvgHtml = `<img src="${post.image}" alt="${post.title}" class="post-card-image" loading="lazy">`;
      }

      postElement.innerHTML = `
                <article class="post-card" style="animation-delay: ${
                  index * 100
                }ms">
                    ${imageOrSvgHtml}
                    <div class="post-card-content">
                        <h2 class="post-card-title">${post.title}</h2>
                        <div class="post-card-meta">
                            <span class="post-author">By ${post.author}</span>
                             <span class="post-reading-time">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4V7z"></path></svg>
                                ${readingTime} min read
                            </span>
                            <span class="post-date">${post.date}</span>
                        </div>
                        <p class="post-card-excerpt">${post.paragraph}</p>
                    </div>
                </article>
            `;
      postsContainer.appendChild(postElement);
    });
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
    const category =
      document.querySelector(".category-list a.active-category")?.dataset
        .category || "all";
    const query = postFilterInput
      ? postFilterInput.value.trim().toLowerCase()
      : "";

    let filtered = allPosts;

    if (category.toLowerCase() !== "all") {
      filtered = filtered.filter((post) => post.category === category);
    }

    if (query) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.paragraph.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
      );
    }

    handleFilter(filtered);
  };

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

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Initial render and setup. A small timeout allows the browser to paint the skeleton loaders first.
  setTimeout(applyFilters, 50);
});

// To avoid polluting the global scope, we'll attach our data and functions to a single object.
window.GKApp = window.GKApp || {};

            document.addEventListener("DOMContentLoaded", () => {
                const shareButton = document.getElementById("shareButton");
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
            });
    
