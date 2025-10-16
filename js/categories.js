
document.addEventListener('DOMContentLoaded', () => {

    const postsGrid = document.getElementById('category-post-grid');
    const postsHeading = document.getElementById('category-posts-heading');

    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('category');

    const renderPosts = (posts) => {
        if (!postsGrid || !window.GKApp.createPostCard) return;

        postsGrid.innerHTML = ''; // Clear existing content

        if (posts.length === 0) {
            postsGrid.innerHTML = '<p class="no-posts-found">No articles found in this category.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();
        posts.forEach((post, index) => {
            fragment.appendChild(window.GKApp.createPostCard(post, index));
        });
        postsGrid.appendChild(fragment);
        
        if (window.GKApp.initializeLazyLoading) {
            window.GKApp.initializeLazyLoading(postsGrid);
        }
    };
    
    const initializePage = async () => {
        if (!categoryName) {
            postsHeading.textContent = 'No Category Specified';
            postsGrid.innerHTML = `<p class="muted error">Please go back and select a category.</p>`;
            return;
        }

        document.title = `${categoryName} | GK Learn Study`;
        postsHeading.textContent = `Articles in: ${categoryName}`;

        await window.GKApp.dataReady;
        
        const allPosts = window.GKApp.searchData || [];
        const categoryPosts = allPosts.filter(post => post.category === categoryName);

        renderPosts(categoryPosts);
    };

    initializePage().catch(error => {
        console.error("Failed to initialize category page:", error);
        postsHeading.textContent = 'Error';
        postsGrid.innerHTML = `<p class="muted error">Could not load articles for this category. Please try again later.</p>`;
    });

});
