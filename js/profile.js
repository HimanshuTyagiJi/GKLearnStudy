document.addEventListener('DOMContentLoaded', () => {
    
    // Use lowercase, normalized keys for robust matching.
    const authorBios = {
        "himanshu tyagi": {
            name: "Himanshu Tyagi",
            bio: "An avid learner and educator, specializing in Computer Science and General Knowledge. Dedicated to making complex topics simple and accessible for everyone.",
            education: "M.C.A. (Master of Computer Applications)",
        },
        "owner": { // Alias for Himanshu Tyagi
            name: "Himanshu Tyagi",
            bio: "An avid learner and educator, specializing in Computer Science and General Knowledge. Dedicated to making complex topics simple and accessible for everyone.",
            education: "M.C.A. (Master of Computer Applications)",
        },
        "golu": {
            name: "Golu",
            bio: "A passionate content creator with a focus on 'How-To' guides and practical knowledge. Golu believes in learning by doing and sharing experiences.",
            education: "B.A. (Bachelor of Arts)",
        }
    };
    
    const profileCard = document.getElementById('author-profile-card');
    const postsGrid = document.getElementById('author-post-grid');
    const postsHeading = document.getElementById('author-posts-heading');

    const urlParams = new URLSearchParams(window.location.search);
    const authorParam = urlParams.get('author');

    const renderProfile = (authorName, authorData, postCount) => {
        if (!profileCard) return;
        
        // Use the same avatar SVG from the post cards for consistency
        const authorAvatar = `<div class="author-avatar-large"><svg width="120" height="120" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="avatar-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#641ef9;stop-opacity:1" /><stop offset="100%" style="stop-color:#c0a4fb;stop-opacity:1" /></linearGradient></defs><circle cx="20" cy="20" r="20" fill="url(#avatar-grad)"/><text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="12" font-weight="bold" fill="white" font-family="Arial, sans-serif">GK</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-size="5" fill="white" font-family="Arial, sans-serif">Learn Study</text></svg></div>`;
        
        profileCard.innerHTML = `
            ${authorAvatar}
            <div class="author-info">
                <h1 class="author-name-large">${authorName}</h1>
                <p class="author-education">${authorData.education}</p>
                <p class="author-bio">${authorData.bio}</p>
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
        if (!authorParam) {
            profileCard.innerHTML = `<p class="muted error">No author specified. Please go back and select an author.</p>`;
            postsHeading.style.display = 'none';
            return;
        }

        // Normalize the author name from the URL for lookup
        const normalizedAuthorKey = authorParam.toLowerCase().replace('mr. ', '').trim();
        const authorData = authorBios[normalizedAuthorKey];

        if (!authorData) {
            profileCard.innerHTML = `<p class="muted error">Author "${authorParam}" not found.</p>`;
            postsHeading.style.display = 'none';
            return;
        }
        
        const displayName = authorData.name;

        document.title = `${displayName} | Author Profile | GK Learn Study`;
        postsHeading.textContent = `Articles by ${displayName}`;

        await window.GKApp.dataReady;
        
        const allPosts = window.GKApp.searchData || [];
        // Filter posts by the original name from the data, not the display name
        const authorPosts = allPosts.filter(post => post.author === authorParam);

        renderProfile(displayName, authorPosts.length, authorData);
        renderPosts(authorPosts);
    };

    initializePage().catch(error => {
        console.error("Failed to initialize profile page:", error);
        profileCard.innerHTML = `<p class="muted error">Could not load author details. Please try again later.</p>`;
    });

});
