
// --- Global Namespace ---
window.GKApp = window.GKApp || {};

// --- Promise for Data Readiness ---
let resolveDataReady;
window.GKApp.dataReady = new Promise(resolve => {
    resolveDataReady = resolve;
});

document.addEventListener("DOMContentLoaded", async () => {
    // --- State Variables ---
    let allPosts = [];
    let displayedPosts = [];
    let currentFilter = 'All';
    let postsToShow = 6;
    let fuzzySearchInstance = null;

    // --- DOM Elements ---
    const postGrid = document.getElementById('post-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const categoryList = document.querySelector('.category-list');
    const filterInput = document.getElementById('post-filter-input');
    
    // --- Utility Functions ---
    const debounce = (func, delay = 300) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    /**
     * Generates a simple, consistent SVG placeholder based on the first letter of a title.
     * @param {string} title - The title of the post.
     * @returns {string} - An SVG string.
     */
    const generatePlaceholderSVG = (title) => {
        const letter = (title?.[0] || 'G').toUpperCase();
        let hash = 0;
        for (let i = 0; i < title.length; i++) {
            hash = title.charCodeAt(i) + ((hash << 5) - hash);
        }
        const h = hash % 360;
        const s = 60 + (hash % 10);
        const l = 35 + (hash % 10);
        const color = `hsl(${h}, ${s}%, ${l}%)`;
        return `<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="background-color:${color};"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="50" fill="white" font-weight="bold">${letter}</text></svg>`;
    };
    window.GKApp.generatePlaceholderSVG = generatePlaceholderSVG;
    
     /**
     * Fuzzy search implementation using a simple scoring mechanism.
     * @param {string} query - The search query.
     * @param {Array} data - The array of post objects to search through.
     * @returns {Array} - A sorted array of matching posts.
     */
    const fuzzySearch = (query, data) => {
        const lowerQuery = query.toLowerCase();
        return data.map(item => {
            const lowerTitle = item.title.toLowerCase();
            const lowerParagraph = item.paragraph.toLowerCase();
            const lowerAuthor = item.author.toLowerCase();
            let score = 0;

            if (lowerTitle.includes(lowerQuery)) score += 10;
            if (lowerParagraph.includes(lowerQuery)) score += 5;
            if (lowerAuthor.includes(lowerQuery)) score += 2;
            
            if (lowerTitle.startsWith(lowerQuery)) score += 5;

            return { ...item, score };
        }).filter(item => item.score > 0)
          .sort((a, b) => b.score - a.score);
    };
    window.GKApp.fuzzySearch = fuzzySearch;


    /**
     * Creates an HTML element for a single post card.
     * @param {object} post - The post data object.
     * @param {number} index - The index of the post, used for lazy loading.
     * @returns {HTMLElement} - The article element for the post card.
     */
    const createPostCard = (post, index) => {
        const card = document.createElement('article');
        card.className = 'post-card';

        const thumbnailSrc = post.svg ? `data:image/svg+xml,${encodeURIComponent(post.svg)}` 
            : (post.icon ? `data:image/svg+xml,${encodeURIComponent(generatePlaceholderSVG(post.icon))}` 
            : `data:image/svg+xml,${encodeURIComponent(generatePlaceholderSVG(post.title))}`);

        const isKaiseKarenPage = window.location.pathname.includes('/kaise-karen');
        
        const summaryElement = `<p class="post-summary">${post.paragraph}</p>`;
        const readMoreButton = `<a href="${post.url}" class="read-more-btn">Read More →</a>`;

        card.innerHTML = `
            <a href="${post.url}" class="post-thumbnail-link" aria-label="Read more about ${post.title}">
                <div class="post-thumbnail">
                    <img ${index > 5 ? `loading="lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${thumbnailSrc}"` : `src="${thumbnailSrc}"`} alt="Thumbnail for ${post.title}">
                </div>
            </a>
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-category">${post.category}</span>
                    ${!isKaiseKarenPage ? `<span class="post-reading-time">${post.readingTime}</span>` : ''}
                </div>
                <h3 class="post-title"><a href="${post.url}">${post.title}</a></h3>
                ${summaryElement}
                ${isKaiseKarenPage ? readMoreButton : ''}
                <div class="post-footer">
                    <a href="/profile.html?author=${encodeURIComponent(post.author)}" class="post-author">
                        <span class="author-name">${post.author}</span>
                    </a>
                    ${!isKaiseKarenPage ? `<a href="${post.url}" class="read-more-btn">Read More →</a>` : ''}
                </div>
            </div>
        `;
        return card;
    };
    window.GKApp.createPostCard = createPostCard;


    /**
     * Initializes lazy loading for images within a given container.
     * @param {HTMLElement} container - The container element (e.g., post grid).
     */
    const initializeLazyLoading = (container) => {
        const lazyImages = container.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.removeAttribute('loading');
                        observer.unobserve(lazyImage);
                    }
                });
            });
            lazyImages.forEach(lazyImage => lazyImageObserver.observe(lazyImage));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => img.src = img.dataset.src);
        }
    };
    window.GKApp.initializeLazyLoading = initializeLazyLoading;
    

    /**
     * Renders a list of posts to the grid.
     * @param {Array} posts - The array of post objects to render.
     */
    const renderPosts = (posts) => {
        if (!postGrid) return;
        postGrid.innerHTML = ''; // Clear previous posts
        const fragment = document.createDocumentFragment();
        posts.forEach((post, index) => {
            fragment.appendChild(createPostCard(post, index));
        });
        postGrid.appendChild(fragment);
        initializeLazyLoading(postGrid);
    };

    /**
     * Filters and displays posts based on the current state.
     */
    const filterAndDisplayPosts = () => {
        const query = filterInput ? filterInput.value.toLowerCase() : '';
        let filtered = allPosts;

        // Page-specific filtering (e.g., only show 'kaise-karen' posts)
        const path = window.location.pathname;
        if (path.includes('/kaise-karen.html')) {
            filtered = filtered.filter(p => p.page && p.page.includes('kaise-karen'));
        }
        
        // Category filter
        if (currentFilter !== 'All') {
            filtered = filtered.filter(post => post.category === currentFilter);
        }

        // Search query filter
        if (query.length > 0) {
            filtered = fuzzySearch(query, filtered);
        }
        
        displayedPosts = filtered;
        renderPosts(displayedPosts.slice(0, postsToShow));

        // Show/hide the "Load More" button
        if (loadMoreBtn) {
            loadMoreBtn.style.display = displayedPosts.length > postsToShow ? 'inline-block' : 'none';
        }
    };
    
    /**
     * Handles the "Load More" button click.
     */
    const handleLoadMore = () => {
        postsToShow += 6;
        renderPosts(displayedPosts.slice(0, postsToShow));
        if (postsToShow >= displayedPosts.length && loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    };

    /**
     * Populates the category filter buttons.
     */
    const populateCategories = () => {
        if (!categoryList) return;
        
        let categories = ['All', ...new Set(allPosts.map(post => post.category))];

        // On specific pages, only show relevant categories
        const path = window.location.pathname;
        if (path.includes('/kaise-karen.html')) {
            const kaiseKarenPosts = allPosts.filter(p => p.page && p.page.includes('kaise-karen'));
            categories = ['All', ...new Set(kaiseKarenPosts.map(p => p.category))];
        }

        categoryList.innerHTML = categories.map(cat => 
            `<li><button class="${cat === 'All' ? 'active' : ''}" data-category="${cat}">${cat}</button></li>`
        ).join('');
    };
    
    /**
     * Renders related posts based on the current article's category.
     */
    const renderRelatedPosts = () => {
        const relatedContainer = document.querySelector('.related-posts-container');
        if (!relatedContainer) return;

        const currentUrl = window.location.pathname;
        const currentPost = allPosts.find(p => p.url === currentUrl);
        if (!currentPost) {
            relatedContainer.style.display = 'none';
            return;
        }

        let related = allPosts.filter(post => 
            post.category === currentPost.category && post.url !== currentUrl
        );

        // For 'kaise-karen' articles, ensure related posts are also from 'kaise-karen'
        if (currentUrl.includes('/kaise-karen/')) {
            related = allPosts.filter(post =>
                post.page && post.page.includes('kaise-karen') && post.url !== currentUrl
            );
        }

        const relatedGrid = relatedContainer.querySelector('.related-posts-grid');
        if (!relatedGrid) return;
        
        relatedGrid.innerHTML = '';
        if (related.length > 0) {
            related.slice(0, 2).forEach((post, index) => {
                relatedGrid.appendChild(createPostCard(post, index));
            });
        } else {
            relatedContainer.style.display = 'none';
        }
    };


    /**
     * Main initialization function.
     */
    const init = async () => {
        try {
            const response = await fetch('/js/search-data.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            allPosts = await response.json();
            window.GKApp.searchData = allPosts; // Make data globally available
            resolveDataReady(); // Resolve the promise

            if (categoryList) {
                 populateCategories();
            }
           
            if (postGrid) {
                 filterAndDisplayPosts();
            }

            renderRelatedPosts(); // Attempt to render related posts on any page

        } catch (error) {
            console.error("Failed to load or process post data:", error);
            if (postGrid) postGrid.innerHTML = '<p class="error">Could not load articles. Please try again later.</p>';
        }
    };

    // --- Event Listeners ---
    loadMoreBtn?.addEventListener('click', handleLoadMore);
    
    if (categoryList) {
        categoryList.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const selectedCategory = e.target.dataset.category;
                if (currentFilter === selectedCategory) return;
                
                categoryList.querySelector('.active')?.classList.remove('active');
                e.target.classList.add('active');
                currentFilter = selectedCategory;
                postsToShow = 6; // Reset pagination
                filterAndDisplayPosts();
            }
        });
    }

    filterInput?.addEventListener('input', debounce(filterAndDisplayPosts));

    // --- Start the app ---
    init();
});
