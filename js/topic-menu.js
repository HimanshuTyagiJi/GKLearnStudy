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

    // Normalize URL paths for consistent matching
    const normalizePath = path => {
        if (!path) return '';
        let normalized = path.startsWith('/') ? path : '/' + path;
        normalized = normalized.replace(/\/index\.html$/i, '');
        normalized = normalized.replace(/\.html$/i, '');
        if (normalized.length > 1 && normalized.endsWith('/')) normalized = normalized.slice(0, -1);
        return normalized || '/';
    };

    // Create a set of all topic-nav links for quick lookup
    const navLinksHrefs = new Set(
        Array.from(topicNav.querySelectorAll("a"))
            .map(link => normalizePath(new URL(link.href, window.location.origin).pathname))
    );

    // Filter searchData to match only topic-nav items
    const allLinks = searchData.filter(item => navLinksHrefs.has(normalizePath(item.url)));
    if (!allLinks.length) return;

    const currentPagePath = normalizePath(window.location.pathname);
    const activeLinkIndex = allLinks.findIndex(link => normalizePath(link.url) === currentPagePath);

    const createLinkHTML = (post, subtitleType) => {
        let subtitle = '';
        if (subtitleType === 'date' && post.date) subtitle = post.date;
        else if (subtitleType === 'paragraph' && post.paragraph) {
            subtitle = post.paragraph.length > 50 ? post.paragraph.substring(0, 50).trim() + '...' : post.paragraph;
        }

        const postUrl = new URL(post.url, window.location.origin).pathname;

        return `
            <li>
                <a href="${postUrl}" title="${post.title}">
                    <span class="link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"/>
                        </svg>
                    </span>
                    <div class="link-text">
                        <span>${post.title}</span>
                        ${subtitle ? `<small class="post-date">${subtitle}</small>` : ''}
                    </div>
                </a>
            </li>
        `;
    };

    const getRandomLinks = (array, numItems, excludeIndex) => {
        const pool = array.filter((_, i) => i !== excludeIndex);
        const shuffled = pool.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numItems);
    };

    // Populate Next Chapters
    const nextChaptersList = document.getElementById("next-chapters-list");
    if (nextChaptersList) {
        if (activeLinkIndex !== -1 && allLinks.length > 1) {
            const nextLinks = [];
            const nextIndex1 = (activeLinkIndex + 1) % allLinks.length;
            nextLinks.push(allLinks[nextIndex1]);
            const nextIndex2 = (activeLinkIndex + 2) % allLinks.length;
            if (allLinks.length > 2 && nextIndex2 !== nextIndex1) nextLinks.push(allLinks[nextIndex2]);
            nextChaptersList.innerHTML = nextLinks.map(p => createLinkHTML(p, 'paragraph')).join('');
        } else nextChaptersList.closest('.sidebar-widget')?.remove();
    }

    // Populate Popular Posts
    const popularPostsList = document.getElementById("popular-posts-list");
    if (popularPostsList) {
        if (allLinks.length > 0) {
            const popularLinks = getRandomLinks(allLinks, 6, activeLinkIndex);
            popularPostsList.innerHTML = popularLinks.map(p => createLinkHTML(p, 'date')).join('');
        } else popularPostsList.closest('.sidebar-widget')?.remove();
    }

    // Populate Suggestion Pages
    const suggestionPagesList = document.getElementById("suggestion-pages-list");
    if (suggestionPagesList) {
        if (allLinks.length > 0) {
            const suggestionLinks = getRandomLinks(allLinks, 6, activeLinkIndex);
            suggestionPagesList.innerHTML = suggestionLinks.map(p => createLinkHTML(p, 'paragraph')).join('');
        } else suggestionPagesList.closest('.sidebar-widget')?.remove();
    }
});
