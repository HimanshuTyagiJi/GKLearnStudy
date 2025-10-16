document.addEventListener('DOMContentLoaded', () => {
    
    const profileCard = document.getElementById('author-profile-card');
    const postsGrid = document.getElementById('author-post-grid');
    const postsHeading = document.getElementById('author-posts-heading');

    const renderProfile = (authorName, postCount) => {
        if (!profileCard) return;
        
        // A consistent, professional avatar for all authors.
        const authorAvatar = `<div class="author-avatar-large"><svg width="120" height="120" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="avatar-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#641ef9;stop-opacity:1" /><stop offset="100%" style="stop-color:#c0a4fb;stop-opacity:1" /></linearGradient></defs><circle cx="20" cy="20" r="20" fill="url(#avatar-grad)"/><text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="12" font-weight="bold" fill="white" font-family="Arial, sans-serif">GK</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-size="5" fill="white" font-family="Arial, sans-serif">Learn Study</text></svg></div>`;
        
        profileCard.innerHTML = `
            ${authorAvatar}
            <div class="author-info">
                <h1 class="author-name-large">${authorName}</h1>
                <p class="author-education">Author at GK Learn Study</p>
                <p class="author-bio">Explore all articles and contributions by ${authorName} below.</p>
            </div>
            <div class="author-stats">
                <div class="stat-item">
                    <span class="stat-number">${postCount}</span>
                    <span>Total Posts</span>
                </div>
            </div>
        `;
    };

    const renderPosts = (posts) => {
        if (!postsGrid || !window.GKApp.createPostCard) return;

        postsGrid.innerHTML = ''; // Clear existing content

        if (posts.length === 0) {
            postsGrid.innerHTML = '<p class="no-posts-found">This author has not published any articles yet.</p>';
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
        const urlParams = new URLSearchParams(window.location.search);
        const authorParam = urlParams.get('author');

        if (!authorParam) {
            profileCard.innerHTML = `<p class="muted error">No author specified. Please go back and select an author.</p>`;
            postsHeading.style.display = 'none';
            return;
        }
        
        const authorName = authorParam; // Use the name directly from the URL

        await window.GKApp.dataReady;
        
        const allPosts = window.GKApp.searchData || [];
        
        // Filter posts where the author name matches the one from the URL parameter exactly.
        const authorPosts = allPosts.filter(post => post.author === authorName);

        // If no posts are found for this author name, it means the author doesn't exist in the data.
        if (authorPosts.length === 0) {
            profileCard.innerHTML = `<p class="muted error">Author "${authorName}" not found or has no articles.</p>`;
            postsHeading.style.display = 'none';
            return;
        }

        document.title = `${authorName} | Author Profile | GK Learn Study`;
        postsHeading.textContent = `Articles by ${authorName}`;

        renderProfile(authorName, authorPosts.length);
        renderPosts(authorPosts);
    };

    initializePage().catch(error => {
        console.error("Failed to initialize profile page:", error);
        profileCard.innerHTML = `<p class="muted error">Could not load author details. Please try again later.</p>`;
    });

});
