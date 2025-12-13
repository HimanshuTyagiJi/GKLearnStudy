
document.addEventListener('DOMContentLoaded', async () => {
    const mountPoint = document.getElementById('dynamic-pagination');
    if (!mountPoint) return;

    const categoryKey = mountPoint.dataset.category;
    const currentFileName = window.location.pathname.split('/').pop();
    
    let currentPage = 1;
    // Logic: if file ends with -part-X.html, extract X. Else it's page 1.
    const match = currentFileName.match(/-part-(\d+)\.html$/);
    if (match) {
        currentPage = parseInt(match[1]);
    }

    try {
        const res = await fetch('/data/page-counts.json?t=' + Date.now());
        if (!res.ok) throw new Error("Failed to load page counts");
        
        const data = await res.json();
        const totalPages = data[categoryKey] || 1;

        if (totalPages <= 1) return; 

        let html = '<div class="pagination">';
        
        // Base URL Logic (remove .html or -part-X.html)
        let baseUrl = currentFileName.replace(/-part-\d+\.html$/, '').replace(/\.html$/, '');
        
        const getLink = (page) => {
            if (page === 1) return `${baseUrl}.html`;
            return `${baseUrl}-part-${page}.html`;
        };

        // PREV
        if (currentPage > 1) {
            html += `<a href="${getLink(currentPage - 1)}" class="button prev">Prev</a>`;
        }

        // NUMBERS (Smart range)
        const range = [];
        const delta = 2; 
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        let l;
        for (let i of range) {
            if (l) {
                if (i - l === 2) html += `<a href="${getLink(l + 1)}" class="button">${l + 1}</a>`;
                else if (i - l !== 1) html += `<span class="dots">...</span>`;
            }
            if (i === currentPage) html += `<span class="button active">${i}</span>`;
            else html += `<a href="${getLink(i)}" class="button">${i}</a>`;
            l = i;
        }

        // NEXT
        if (currentPage < totalPages) {
            html += `<a href="${getLink(currentPage + 1)}" class="button next">Next</a>`;
        }

        html += '</div>';
        mountPoint.innerHTML = html;

    } catch (e) {
        console.error("Pagination Error:", e);
    }
});
