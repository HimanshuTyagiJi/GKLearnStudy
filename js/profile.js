document.addEventListener('DOMContentLoaded', () => {
    
    const profileCard = document.getElementById('author-profile-card');
    const postsGrid = document.getElementById('author-post-grid');
    const postsHeading = document.getElementById('author-posts-heading');

    /**
     * Generates a unique SVG avatar for an author based on their name.
     * @param {string} name - The author's full name.
     * @returns {string} - The HTML string for the SVG avatar.
     */
    const generateAuthorAvatarSVG = (name) => {
        const words = name.split(' ').filter(Boolean);
        let initials = words[0] ? words[0][0] : '';
        if (words.length > 1) {
            initials += words[words.length - 1][0];
        }
        initials = initials.toUpperCase();

        // Generate a consistent color from the name's characters
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash; // Ensure it's a 32bit integer
        }
        const hue = Math.abs(hash % 360);
        const color = `hsl(${hue}, 70%, 45%)`;

        // Adjust font size based on number of initials for better centering
        const fontSize = initials.length > 1 ? '48' : '60';

        return `<div class="author-avatar-large">
            <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="60" fill="${color}" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" font-weight="bold" fill="white" font-family="Arial, sans-serif">${initials}</text>
            </svg>
        </div>`;
    };

    const renderProfile = (authorName, postCount) => {
        if (!profileCard) return;
        
        let authorAvatar;

        // Use the specific GK Learn Study logo for the owner.
        if (authorName === "Mr. Himanshu Tyagi" || authorName === "Owner") {
            const ownerLogoSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 300 300" role="img" aria-label="GK Learn Study logo">
                            <title>GK Learn Study</title>
                            <circle cx="150" cy="150" r="150" fill="white"></circle>
                            <defs><clipPath id="circle-clip-main"><circle cx="150" cy="150" r="150"></circle></clipPath></defs>
                            <g clip-path="url(#circle-clip-main)">
                                <path fill="#c0a4fb" fill-opacity="1"><animate attributeName="d" dur="8s" repeatCount="indefinite" values="M0 230 Q 75 210, 150 230 T 300 210 L 300 300 L 0 300 Z; M0 240 Q 75 260, 150 240 T 300 250 L 300 300 L 0 300 Z; M0 230 Q 75 210, 150 230 T 300 210 L 300 300 L 0 300 Z"></animate></path>
                                <path fill="#641ef9" fill-opacity="0.7"><animate attributeName="d" dur="7s" repeatCount="indefinite" values="M0 220 Q 75 245, 150 220 T 300 235 L 300 300 L 0 300 Z; M0 250 Q 75 220, 150 250 T 300 220 L 300 300 L 0 300 Z; M0 220 Q 75 245, 150 220 T 300 235 L 300 300 L 0 300 Z"></animate></path>
                            </g>
                            <text x="50%" y="35%" font-size="90" font-weight="700" fill="#e53935" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" style="transform-origin: 150px 90px;" opacity="0"> GK <animate attributeName="opacity" from="0" to="1" begin="0.35s" dur="1.2s" fill="freeze"></animate><animateTransform attributeName="transform" type="rotate" from="-15 150 90" to="0 150 90" begin="0.35s" dur="1.2s" fill="freeze" additive="sum"></animateTransform><animateTransform attributeName="transform" type="scale" from="0.55 0.55" to="1 1" begin="0.35s" dur="1.2s" fill="freeze" additive="sum"></animateTransform></text>
                            <text x="50%" y="65%" font-size="38" fill="#6a1b9a" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" style="transform-origin: 150px 195px;" opacity="0"> Learn Study <animate attributeName="opacity" from="0" to="1" begin="0.8s" dur="1.2s" fill="freeze"></animate><animateTransform attributeName="transform" type="scale" from="0.75 0.75" to="1 1" begin="0.8s" dur="1.2s" fill="freeze"></animateTransform></text>
                            <circle cx="150" cy="150" r="145" fill="none" stroke="#f0e6ff" stroke-width="4" opacity="0.6"></circle>
                        </svg>`;
            authorAvatar = `<div class="author-avatar-large">${ownerLogoSVG}</div>`;
        } else {
            // Generate a dynamic avatar for all other authors.
            authorAvatar = generateAuthorAvatarSVG(authorName);
        }
        
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
        if (authorPosts.length === 0 && authorName !== "Mr. Himanshu Tyagi" && authorName !== "Owner") {
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
