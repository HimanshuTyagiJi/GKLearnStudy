document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById("topic-sidebar");
    const sidebarToggle = document.getElementById("topic-sidebar-toggle");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const sidebarNav = document.getElementById("topic-nav");

    function closeMobileSidebar() {
        if (sidebar) sidebar.classList.remove("is-open");
        if (sidebarOverlay) sidebarOverlay.classList.remove("is-open");
    }

    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("is-open");
            sidebarOverlay.classList.toggle("is-open");
        });

        sidebarOverlay.addEventListener("click", closeMobileSidebar);
    }

    if (sidebarNav) {
        sidebarNav.addEventListener("click", (e) => {
            if (e.target.tagName === "A") {
                const currentActive = sidebarNav.querySelector("a.active");
                if (currentActive) {
                    currentActive.classList.remove("active");
                }
                e.target.classList.add("active");

                // Close sidebar on mobile after selection
                if (window.innerWidth <= 991) {
                    closeMobileSidebar();
                }
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const topicNav = document.getElementById("topic-nav");
    const searchData = window.GKApp?.searchData;

    if (!topicNav || !searchData) return;

    // ---------------- Normalize Path ----------------
    function normalizePath(path) {
        if (!path) return "";
        let normalized = path.startsWith("/") ? path : "/" + path;
        normalized = normalized.replace(/\/index\.html$/i, "");
        normalized = normalized.replace(/\.html$/i, "");
        if (normalized.length > 1 && normalized.endsWith("/")) {
            normalized = normalized.slice(0, -1);
        }
        return normalized || "/";
    }

    // ---------------- Collect All Links ----------------
    const navLinks = Array.from(topicNav.querySelectorAll("a")).map(link => ({
        title: link.textContent.trim(),
        url: new URL(link.getAttribute("href"), window.location.origin).pathname,
        active: link.classList.contains("active"),
    }));

    const currentPagePath = normalizePath(window.location.pathname);
    const activeIndex = navLinks.findIndex(l => normalizePath(l.url) === currentPagePath);

    // ---------------- Create Link HTML ----------------
    function createLinkHTML(post, subtitle = "") {
        return `
        <li>
            <a href="${post.url}">
                <span class="link-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                </span>
                <div class="link-text">
                    <span>${post.title}</span>
                    ${subtitle ? `<small>${subtitle}</small>` : ""}
                </div>
            </a>
        </li>`;
    }

    // ---------------- Next Chapter ----------------
    const nextChapterDiv = document.getElementById("next-chapter-content");
    if (nextChapterDiv && activeIndex !== -1 && navLinks[activeIndex + 1]) {
        const nextPost = navLinks[activeIndex + 1];

        // searchData से छोटा description निकालना
        const dataPost = searchData.find(d => normalizePath(d.url) === normalizePath(nextPost.url));
        const desc = dataPost?.paragraph ? dataPost.paragraph.substring(0, 100) + "..." : "";

        nextChapterDiv.innerHTML = `
            <p>
                भाषा के इन मूल सिद्धांतों को समझने के बाद, हमारा अगला अध्याय
                <strong>'${nextPost.title}'</strong> पर होगा। ${desc}
            </p>
        `;
    } else {
        document.getElementById("next-chapter-widget").style.display = "none";
    }

    // ---------------- Popular Posts ----------------
    const popularList = document.getElementById("popular-posts-list");
    if (popularList) {
        const shuffled = [...searchData].sort(() => 0.5 - Math.random()).slice(0, 6);
        popularList.innerHTML = shuffled.map(p => createLinkHTML({
            title: p.title,
            url: new URL(p.url, window.location.origin).pathname
        }, p.date || "")).join("");
    }

    // ---------------- Recently Updated ----------------
    const recentList = document.getElementById("recently-updated-list");
    if (recentList) {
        const sorted = [...searchData]
            .filter(p => p.updated)
            .sort((a, b) => new Date(b.updated) - new Date(a.updated))
            .slice(0, 6);
        if (sorted.length) {
            recentList.innerHTML = sorted.map(p => createLinkHTML({
                title: p.title,
                url: new URL(p.url, window.location.origin).pathname
            }, "Updated: " + p.updated)).join("");
        } else {
            document.getElementById("recently-updated-widget").style.display = "none";
        }
    }

    // ---------------- Suggestion Pages ----------------
    const suggestionList = document.getElementById("suggestion-pages-list");
    if (suggestionList) {
        const filtered = [...navLinks].filter(l => !l.active).slice(0, 6);
        suggestionList.innerHTML = filtered
            .map(p => `<li><a href="${p.url}" class="page-button">${p.title}</a></li>`)
            .join("");
    }
});
