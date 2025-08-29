document.addEventListener("DOMContentLoaded", () => {
    // This script makes sidebar sections dynamic by using the global searchData
    // to find rich content for links listed in the page's topic navigation.

    const topicNav = document.getElementById("topic-nav");
    const searchData = window.GKApp?.searchData;

    if (!topicNav || !searchData) {
        return; // Exit if necessary elements or data are not found.
    }

    // --- Data Preparation ---

    /**
     * Normalizes a URL path for consistent matching.
     * This robust version handles leading/trailing slashes and .html extensions.
     * @param {string} path - The URL path to normalize.
     * @returns {string} - The normalized path.
     */
    function normalizePath(path) {
        if (!path) return '';
        
        let normalized = path;

        // 1. Ensure it starts with a slash
        if (!normalized.startsWith('/')) {
            normalized = '/' + normalized;
        }

        // 2. Remove 'index.html' from the end
        if (normalized.endsWith('/index.html')) {
            normalized = normalized.slice(0, -11); // length of '/index.html'
        }
        
        // 3. Remove '.html' from the end
        if (normalized.endsWith('.html')) {
            normalized = normalized.slice(0, -5); // length of '.html'
        }

        // 4. Remove trailing slash if it's not the root path
        if (normalized.length > 1 && normalized.endsWith('/')) {
            normalized = normalized.slice(0, -1);
        }
        
        // 5. Handle the case where the path became empty (was originally "/" or "/index.html")
        if (normalized === '') {
            return '/';
        }

        return normalized;
    }


    // Create a Set of normalized pathnames from the topic navigation for efficient lookup.
    const navLinksHrefs = new Set(
        Array.from(topicNav.querySelectorAll("a")).map(link => 
            normalizePath(new URL(link.href, window.location.origin).pathname)
        )
    );
    
    // Filter the global search data to get only the posts relevant to the current topic navigation.
    const allLinks = searchData.filter(item => {
        const itemPath = normalizePath(item.url);
        return navLinksHrefs.has(itemPath);
    });

    if (allLinks.length === 0) return;

    // Find the index of the currently active page within our filtered list.
    const currentPagePath = normalizePath(window.location.pathname);
    const activeLinkIndex = allLinks.findIndex(link => normalizePath(link.url) === currentPagePath);

    // --- Helper Functions ---

    /**
     * Creates the HTML for a single link item in a sidebar widget.
     * @param {object} post - The post object from searchData.
     * @param {string} subtitleType - Determines the subtitle ('date' or 'paragraph').
     * @returns {string} - The generated HTML string for one list item.
     */
    function createLinkHTML(post, subtitleType) {
        let subtitle = '';
        if (subtitleType === 'date' && post.date) {
            subtitle = post.date;
        } else if (subtitleType === 'paragraph' && post.paragraph) {
            // Create a short, descriptive subtitle from the main paragraph.
            const maxLength = 50;
            subtitle = post.paragraph.length > maxLength 
                ? post.paragraph.substring(0, maxLength).trim() + '...' 
                : post.paragraph;
        }
        
        // Use a root-relative path for robustness across different page depths.
        const postUrl = new URL(post.url, window.location.origin).pathname;

        return `
            <li>
                <a href="${postUrl}" title="${post.title}">
                    <span class="link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /></svg>
                    </span>
                    <div class="link-text">
                        <span>${post.title}</span>
                        ${subtitle ? `<small class="post-date">${subtitle}</small>` : ''}
                    </div>
                </a>
            </li>
        `;
    }
    
    /**
     * Gets a specified number of random items from an array, excluding a given index.
     * @param {Array} array - The source array.
     * @param {number} numItems - The number of random items to return.
     * @param {number} excludeIndex - The index of the item to exclude from the selection.
     * @returns {Array} - A new array of random items.
     */
    function getRandomLinks(array, numItems, excludeIndex) {
        const pool = array.filter((_, index) => index !== excludeIndex);
        const shuffled = pool.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numItems);
    }

    // --- Widget Population Logic ---

    // 1. Populate "अगला अध्याय" (Next Chapters)
    const nextChaptersList = document.getElementById("next-chapters-list");
    if (nextChaptersList) {
        if (activeLinkIndex !== -1 && allLinks.length > 1) {
            const nextLinksData = [];
            const nextIndex1 = (activeLinkIndex + 1) % allLinks.length;
            nextLinksData.push(allLinks[nextIndex1]);
            
            if (allLinks.length > 2) {
                const nextIndex2 = (activeLinkIndex + 2) % allLinks.length;
                if (nextIndex2 !== activeLinkIndex && nextIndex2 !== nextIndex1) {
                     nextLinksData.push(allLinks[nextIndex2]);
                }
            }
            // Use the post's descriptive paragraph for "Next Chapter" links.
            nextChaptersList.innerHTML = nextLinksData.map(post => createLinkHTML(post, 'paragraph')).join('');
        } else {
            const widget = nextChaptersList.closest('.sidebar-widget');
            if (widget) widget.style.display = 'none';
        }
    }

    // 2. Populate "Popular Posts"
    const popularPostsList = document.getElementById("popular-posts-list");
    if (popularPostsList) {
        if (allLinks.length > 0) {
            const popularLinks = getRandomLinks(allLinks, 6, activeLinkIndex);
            // Use the post's date for "Popular Posts" links, as requested.
            popularPostsList.innerHTML = popularLinks.map(post => createLinkHTML(post, 'date')).join('');
        } else {
            const widget = popularPostsList.closest('.sidebar-widget');
            if (widget) widget.style.display = 'none';
        }
    }

    // 3. Populate "Suggestion Pages"
    const suggestionPagesList = document.getElementById("suggestion-pages-list");
    if (suggestionPagesList) {
        if (allLinks.length > 0) {
             const suggestionLinks = getRandomLinks(allLinks, 6, activeLinkIndex);
             // Use the post's descriptive paragraph for "Suggestion Pages".
             suggestionPagesList.innerHTML = suggestionLinks.map(post => createLinkHTML(post, 'paragraph')).join('');
        } else {
            const widget = suggestionPagesList.closest('.sidebar-widget');
            if (widget) widget.style.display = 'none';
        }
    }
});
