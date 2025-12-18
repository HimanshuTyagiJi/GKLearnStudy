
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
    updateLanguageLink(currentPage);
});

function renderPagination(container, current, total) {
    let html = '<div class="pagination" style="display:flex; justify-content:center; gap:10px; margin:20px 0; flex-wrap:wrap;">';
    
    // Clean Base URL
    let path = window.location.pathname;
    let filename = path.split('/').pop();
    let baseUrl = filename.replace(/-part-\d+\.html$/, '').replace(/\.html$/, '');
    
    const getLink = (p) => p === 1 ? `${baseUrl}.html` : `${baseUrl}-part-${p}.html`;

    // PREV
    if (current > 1) {
        html += `<a href="${getLink(current - 1)}" class="button" style="border:1px solid #ccc; padding:5px 12px; border-radius:4px; text-decoration:none; color:#333;">Prev</a>`;
    }

    // LOGIC: Show 1, current-1, current, current+1, last
    const showPages = new Set([1, total, current, current-1, current+1]);
    let prevShown = 0;

    for (let i = 1; i <= total; i++) {
        if (showPages.has(i)) {
            if (i - prevShown > 1) html += `<span class="dots" style="padding:5px;">...</span>`;
            
            if (i === current) html += `<span class="button active" style="background:#2271b1; color:white; padding:5px 12px; border-radius:4px;">${i}</span>`;
            else html += `<a href="${getLink(i)}" class="button" style="border:1px solid #ccc; padding:5px 12px; border-radius:4px; text-decoration:none; color:#333;">${i}</a>`;
            
            prevShown = i;
        }
    }

    // NEXT
    if (current < total) {
        html += `<a href="${getLink(current + 1)}" class="button" style="border:1px solid #ccc; padding:5px 12px; border-radius:4px; text-decoration:none; color:#333;">Next</a>`;
    }

    html += '</div>';
    container.innerHTML = html;
}

function updateLanguageLink(currentPart) {
    const linkBtn = document.querySelector('.link-container .link-button');
    if (!linkBtn) return;

    const currentHref = linkBtn.getAttribute('href');
    if (!currentHref) return;

    let baseTarget = currentHref.replace(/-part-\d+\.html$/, '').replace(/\.html$/, '');
    
    if (currentPart > 1) {
        linkBtn.setAttribute('href', `${baseTarget}-part-${currentPart}.html`);
    } else {
        linkBtn.setAttribute('href', `${baseTarget}.html`);
    }
}

