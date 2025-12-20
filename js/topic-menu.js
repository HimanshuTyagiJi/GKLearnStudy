
document.addEventListener('DOMContentLoaded', async () => {
    const sidebar = document.getElementById("topic-sidebar");
    const sidebarToggle = document.getElementById("topic-sidebar-toggle");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const sidebarNav = document.getElementById("topic-nav");

    // --- 1. मोबाइल साइडबार टॉगल लॉजिक (Open/Close) ---
    function closeMobileSidebar() {
        if (sidebar) sidebar.classList.remove("is-open");
        if (sidebarOverlay) sidebarOverlay.classList.remove("is-open");
    }

    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("is-open");
            sidebarOverlay.classList.toggle("is-open");
        });
        sidebarOverlay.addEventListener("click", closeMobileSidebar);
    }

    // अगर साइडबार या नेविगेशन मौजूद नहीं है तो आगे न बढ़ें
    if (!sidebar || !sidebarNav) return;

    const ul = sidebarNav.querySelector('ul');
    if (!ul) return;

    // --- 2. मैन्युअल लिंक चेक (Manual Links Check) ---
    // अगर HTML में पहले से <li> मौजूद हैं, तो स्क्रिप्ट लिंक लोड नहीं करेगी
    if (ul.children.length > 0) {
        console.log("Sidebar: Manual links detected. Auto-loading skipped.");
        return;
    }

    // --- 3. Canonical Link से फोल्डर का नाम निकालना ---
    const canonical = document.querySelector('link[rel="canonical"]')?.href;
    let folderName = "General";

    if (canonical) {
        try {
            const urlPath = new URL(canonical).pathname;
            const segments = urlPath.split('/').filter(s => s.length > 0);
            
            // अगर URL /folder/file.html है तो segments[0] फोल्डर है
            if (segments.length >= 1) {
                if (!segments[0].endsWith('.html')) {
                    folderName = segments[0];
                }
            }
        } catch (e) {
            console.error("Sidebar: Canonical parsing error:", e);
        }
    }

    // --- 4. JSON से डेटा फेच और लिंक रेंडर करना ---
    try {
        const response = await fetch('https://gklearnstudy.in/data/topic-menu.json?v=' + Date.now());
        if (!response.ok) return;
        
        const menuData = await response.json();
        
        // फोल्डर का नाम मैच करें (Case-insensitive)
        const folderKey = Object.keys(menuData).find(k => k.toLowerCase() === folderName.toLowerCase());
        const links = folderKey ? menuData[folderKey] : [];

        if (links.length > 0) {
            ul.innerHTML = ''; // पुराना कंटेंट साफ करें
            
            links.forEach(item => {
                const li = document.createElement('li');
                // सुनिश्चित करें कि URL सही फॉर्मेट में है
                let finalUrl = item.url.startsWith('/') ? item.url : '/' + item.url;
                
                // वर्तमान पेज को हाईलाइट करने के लिए चेक
                const isMatch = window.location.pathname.endsWith(finalUrl) || window.location.pathname === finalUrl;
                const activeClass = isMatch ? 'class="active"' : '';
                
                li.innerHTML = `<a href="${finalUrl}" ${activeClass}>${item.title}</a>`;
                ul.appendChild(li);
            });

            // साइडबार का टाइटल बदलें
            const titleEl = sidebar.querySelector('.sidebar-title');
            if (titleEl) {
                titleEl.textContent = folderKey.toUpperCase().replace(/-/g, ' ');
            }
        } else {
            // अगर कोई लिंक न मिले
            ul.innerHTML = '<li><a href="/">Home / GK Learn Study</a></li>';
        }
    } catch (error) {
        console.error("Sidebar: JSON fetch error:", error);
    }
});
