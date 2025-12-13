
document.addEventListener('DOMContentLoaded', async () => {
    // 1. DYNAMIC PAGINATION BUTTONS
    const mountPoint = document.getElementById('dynamic-pagination');
    
    // Helper to get current part number
    const getCurrentPart = () => {
        const match = window.location.pathname.match(/-part-(\d+)\.html$/);
        return match ? parseInt(match[1]) : 1;
    };

    const currentPage = getCurrentPart();

    if (mountPoint) {
        const categoryKey = mountPoint.dataset.category;
        
        try {
            // Force fetch fresh JSON (bypass cache)
            const res = await fetch('/data/page-counts.json?t=' + Date.now());
            if (res.ok) {
                const data = await res.json();
                const totalPages = data[categoryKey] || 1;

                if (totalPages > 1) {
                    renderPagination(mountPoint, currentPage, totalPages);
                }
            }
        } catch (e) {
            console.error("Pagination load failed:", e);
        }
    }

    // 2. SMART LANGUAGE SWITCHER (Link Sync)
    // Finds the link button and updates href to match the current part
    updateLanguageLink(currentPage);
});

function renderPagination(container, current, total) {
    let html = '<div class="pagination">';
    
    // Clean Base URL (remove -part-X.html or .html)
    let path = window.location.pathname;
    let filename = path.split('/').pop();
    let baseUrl = filename.replace(/-part-\d+\.html$/, '').replace(/\.html$/, '');
    
    // Construct Link Function
    const getLink = (p) => p === 1 ? `${baseUrl}.html` : `${baseUrl}-part-${p}.html`;

    // PREV
    if (current > 1) {
        html += `<a href="${getLink(current - 1)}" class="button prev">Prev</a>`;
    }

    // LOGIC: Show 1, current-1, current, current+1, last
    const showPages = new Set([1, total, current, current-1, current+1]);
    let prevShown = 0;

    for (let i = 1; i <= total; i++) {
        if (showPages.has(i)) {
            if (i - prevShown > 1) html += `<span class="dots">...</span>`;
            
            if (i === current) html += `<span class="button active">${i}</span>`;
            else html += `<a href="${getLink(i)}" class="button">${i}</a>`;
            
            prevShown = i;
        }
    }

    // NEXT
    if (current < total) {
        html += `<a href="${getLink(current + 1)}" class="button next">Next</a>`;
    }

    html += '</div>';
    container.innerHTML = html;
}

function updateLanguageLink(currentPart) {
    // Determine target file name structure based on current page
    // Needs manual mapping or strict naming convention. 
    // Assuming simple mapping based on known files.
    
    const linkBtn = document.querySelector('.link-container .link-button');
    if (!linkBtn) return;

    const currentHref = linkBtn.getAttribute('href');
    if (!currentHref) return;

    // Logic: If we are on Part 3, append -part-3 to the base filename of the target
    if (currentPart > 1) {
        // Strip existing extension
        let baseTarget = currentHref.replace(/-part-\d+\.html$/, '').replace(/\.html$/, '');
        linkBtn.setAttribute('href', `${baseTarget}-part-${currentPart}.html`);
    } else {
        // If on Part 1, ensure link goes to base file (remove part info if present in href cache)
        let baseTarget = currentHref.replace(/-part-\d+\.html$/, '').replace(/\.html$/, '');
        linkBtn.setAttribute('href', `${baseTarget}.html`);
    }
}
