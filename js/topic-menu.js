
document.addEventListener('DOMContentLoaded', async () => {
    const sidebar = document.getElementById("topic-sidebar");
    const sidebarToggle = document.getElementById("topic-sidebar-toggle");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const sidebarNav = document.getElementById("topic-nav");

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

    if (sidebarNav) {
        // --- 1. CURRENT FOLDER & PATH DETECTION ---
        const fullPath = window.location.pathname; 
        const segments = fullPath.split('/').filter(s => s.length > 0);
        
        // Example: /himanshu/golu.html -> folder is 'himanshu'
        // If it's a root file like /index.html -> folder is 'General'
        const currentFolder = (segments.length > 1) ? segments[0] : "General";

        try {
            // --- 2. FETCH THE DATABASE ---
            const response = await fetch('/data/topic-menu.json?v=' + Date.now());
            if (response.ok) {
                const menuData = await response.json();
                const folderLinks = menuData[currentFolder] || [];
                
                let ul = sidebarNav.querySelector('ul');
                if (!ul) {
                    ul = document.createElement('ul');
                    sidebarNav.appendChild(ul);
                }

                // --- 3. DYNAMIC RENDER ---
                // साफ़ करें ताकि केवल फोल्डर के लिंक्स ही दिखें
                ul.innerHTML = ''; 

                if (folderLinks.length > 0) {
                    folderLinks.forEach(item => {
                        const li = document.createElement('li');
                        
                        // Check if this link is the current active page
                        // We check if the pathname ends with the item.url or matches exactly
                        const isThisPage = fullPath.endsWith(item.url) || fullPath === item.url;
                        const activeClass = isThisPage ? 'class="active"' : '';
                        
                        li.innerHTML = `<a href="${item.url}" ${activeClass}>${item.title}</a>`;
                        ul.appendChild(li);
                    });

                    // Update Sidebar Title to Category Name
                    const titleEl = sidebar.querySelector('.sidebar-title');
                    if(titleEl) {
                        titleEl.textContent = currentFolder.replace(/-/g, ' ').toUpperCase();
                    }
                } else {
                    // Fallback if folder has no links in JSON
                    ul.innerHTML = '<li><a href="/" class="active">Home</a></li>';
                }
            }
        } catch (error) {
            console.error("Dynamic menu render failed:", error);
        }

        // Handle mobile auto-close
        sidebarNav.addEventListener("click", (e) => {
            if (e.target.tagName === "A" && window.innerWidth <= 991) {
                closeMobileSidebar();
            }
        });
    }
});

// Existing Right Sidebar & Mobile Logic (Preserved)
document.addEventListener("DOMContentLoaded", function () {
    const topicMenu = document.querySelector("nav#topic-nav");
    if (!topicMenu) return;

    if (!document.getElementById("right-sidebar")) {
        const rightBar = document.createElement("div");
        rightBar.id = "right-sidebar";
        rightBar.innerHTML = `<strong>Our App</strong><ul id="link-list"></ul>`;
        document.body.appendChild(rightBar);
    }

    if (!document.querySelector('link[href="https://gklearnstudy.in/css/rightside.css"]')) {
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "https://gklearnstudy.in/css/rightside.css";
        document.head.appendChild(css);
    }

    if (!document.querySelector('script[src="https://gklearnstudy.in/js/rightside.js"]')) {
        const script = document.createElement("script");
        script.src = "https://gklearnstudy.in/js/rightside.js";
        script.defer = true;
        document.body.appendChild(script);
    }

    function moveSidebarForMobile() {
        const sidebar = document.getElementById("right-sidebar");
        if (!sidebar) return;
        const commentsBlock = document.getElementById("comments-and-ratings-container");
        if (!commentsBlock) return;

        if (window.innerWidth <= 768) {
            if (sidebar.parentNode !== commentsBlock.parentNode) {
                commentsBlock.parentNode.insertBefore(sidebar, commentsBlock);
            }
        } else {
            if (sidebar.parentNode !== document.body) {
                document.body.appendChild(sidebar);
            }
        }
    }
    moveSidebarForMobile();
    window.addEventListener("resize", moveSidebarForMobile);
});
