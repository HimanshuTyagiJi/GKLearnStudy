document.addEventListener("DOMContentLoaded", () => {
    // This script makes sidebar sections dynamic by using the global searchData
    // to find rich content for links listed in the page's topic navigation.

    const topicNav = document.getElementById("topic-nav");
    const searchData = window.GKApp?.searchData;

    // --- Selectors for Widgets ---
    const nextChapterWidget = document.getElementById("next-chapter-widget");
    const popularPostsWidget = document.getElementById("popular-posts-widget");
    const suggestionPagesWidget = document.getElementById("suggestion-pages-widget");
    
    const nextChaptersList = document.getElementById("next-chapters-list");
    const popularPostsList = document.getElementById("popular-posts-list");
    const suggestionPagesList = document.getElementById("suggestion-pages-list");

    // Exit if essential components are missing
    if (!topicNav || !searchData || !searchData.length) {
        if (nextChapterWidget) nextChapterWidget.style.display = 'none';
        if (popularPostsWidget) popularPostsWidget.style.display = 'none';
        if (suggestionPagesWidget) suggestionPagesWidget.style.display = 'none';
        return;
    }

    // --- Utility Functions ---

    /**
     * Normalizes a URL path for consistent matching.
     * Handles leading/trailing slashes and .html extensions.
     * @param {string} path - The URL path to normalize.
     * @returns {string} - The normalized path.
     */
    function normalizePath(path) {
        if (!path) return '';
        let normalized = path.startsWith('/') ? path : '/' + path;
        if (normalized.endsWith('.html')) {
            normalized = normalized.slice(0, -5);
        }
        if (normalized.length > 1 && normalized.endsWith('/')) {
            normalized = normalized.slice(0, -1);
        }
        return normalized || '/';
    }

    /**
     * Creates a Map of normalized paths to post data for quick lookups.
     * @param {Array} data - The search data array.
     * @returns {Map<string, object>}
     */
    function createSearchDataMap(data) {
        const map = new Map();
        data.forEach(item => {
            map.set(normalizePath(item.url), item);
        });
        return map;
    }
    
    /**
     * Creates the HTML for a single link item in a sidebar widget.
     * @param {object} post - The post object from searchData.
     * @returns {string} - The generated HTML string for one list item.
     */
    function createLinkHTML(post) {
        if (!post) return '';
        const postUrl = new URL(post.url, window.location.origin).pathname;
        const shortDescription = post.paragraph.length > 60
            ? post.paragraph.substring(0, 60).trim() + '...'
            : post.paragraph;

        return `
            <li>
                <a href="${postUrl}" title="${post.title}">
                    <span class="link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /></svg>
                    </span>
                    <div class="link-text">
                        <span>${post.title}</span>
                        <small class="post-date">${shortDescription}</small>
                    </div>
                </a>
            </li>
        `;
    }

    // --- Main Logic ---

    const searchDataMap = createSearchDataMap(searchData);
    
    // Get all links from the topic navigation menu.
    const topicLinks = Array.from(topicNav.querySelectorAll("a")).map(link => {
        return {
            element: link,
            path: normalizePath(new URL(link.href, window.location.origin).pathname)
        };
    });

    if (topicLinks.length === 0) {
        if (nextChapterWidget) nextChapterWidget.style.display = 'none';
        if (popularPostsWidget) popularPostsWidget.style.display = 'none';
        if (suggestionPagesWidget) suggestionPagesWidget.style.display = 'none';
        return;
    }

    // Find the index of the current page. Prioritize the .active class.
    let activeLinkIndex = topicLinks.findIndex(link => link.element.classList.contains('active'));
    if (activeLinkIndex === -1) {
        const currentPagePath = normalizePath(window.location.pathname);
        activeLinkIndex = topicLinks.findIndex(link => link.path === currentPagePath);
    }
    
    // 1. Populate "Next Chapter"
    if (nextChapterWidget && nextChaptersList) {
        const nextLinksData = [];
        if (activeLinkIndex !== -1 && topicLinks.length > 1) {
            const nextIndex1 = (activeLinkIndex + 1) % topicLinks.length;
            const post1 = searchDataMap.get(topicLinks[nextIndex1].path);
            if (post1) nextLinksData.push(post1);

            if (topicLinks.length > 2) {
                const nextIndex2 = (activeLinkIndex + 2) % topicLinks.length;
                if (nextIndex2 !== activeLinkIndex && nextIndex2 !== nextIndex1) {
                    const post2 = searchDataMap.get(topicLinks[nextIndex2].path);
                    if (post2) nextLinksData.push(post2);
                }
            }
        }
        
        if (nextLinksData.length > 0) {
            nextChaptersList.innerHTML = nextLinksData.map(createLinkHTML).join('');
        } else {
            nextChapterWidget.style.display = 'none';
        }
    }

    // 2. Populate "Popular Posts" (from current topic)
    if (popularPostsWidget && popularPostsList) {
        const popularPool = topicLinks
            .map(link => searchDataMap.get(link.path))
            .filter((post, index) => post && index !== activeLinkIndex);

        if (popularPool.length > 0) {
            const shuffled = popularPool.sort(() => 0.5 - Math.random());
            const popularLinks = shuffled.slice(0, 5);
            popularPostsList.innerHTML = popularLinks.map(createLinkHTML).join('');
        } else {
            popularPostsWidget.style.display = 'none';
        }
    }

    // 3. Populate "Suggestion Pages" (from all site data)
    if (suggestionPagesWidget && suggestionPagesList) {
        const currentPagePath = (activeLinkIndex !== -1) ? topicLinks[activeLinkIndex].path : normalizePath(window.location.pathname);
        
        const suggestionPool = searchData.filter(post => normalizePath(post.url) !== currentPagePath);

        if (suggestionPool.length > 0) {
            const shuffled = suggestionPool.sort(() => 0.5 - Math.random());
            const suggestionLinks = shuffled.slice(0, 5);
            suggestionPagesList.innerHTML = suggestionLinks.map(createLinkHTML).join('');
        } else {
            suggestionPagesWidget.style.display = 'none';
        }
    }
});
