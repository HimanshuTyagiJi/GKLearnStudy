
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
        // --- 1. फोल्डर डिटेक्शन ---
        const fullPath = window.location.pathname; 
        const segments = fullPath.split('/').filter(s => s.length > 0);
        
        let currentFolder = "General";
        if (segments.length >= 1) {
            // अगर /himanshu/tyagi.html है तो segments[0] 'himanshu' होगा
            if (!segments[0].includes('.html')) {
                currentFolder = segments[0];
            }
        }

        console.log("Detecting links for folder:", currentFolder);

        // --- 2. JSON Fetch (Absolute Path Logic) ---
        // 'gklearnstudy.in' को बेस मानकर फाइल ढूंढना
        const domain = window.location.origin;
        const jsonUrl = (domain.includes('file://') ? '' : domain) + '/data/topic-menu.json?v=' + Date.now();

        try {
            const response = await fetch(jsonUrl);
            if (!response.ok) throw new Error("JSON file not found at " + jsonUrl);
            
            const menuData = await response.json();
            const folderLinks = menuData[currentFolder] || [];
            
            let ul = sidebarNav.querySelector('ul');
            if (!ul) {
                ul = document.createElement('ul');
                sidebarNav.appendChild(ul);
            }

            ul.innerHTML = ''; 

            if (folderLinks.length > 0) {
                folderLinks.forEach(item => {
                    const li = document.createElement('li');
                    
                    // Active link check
                    const normalizedCurrent = fullPath.toLowerCase().replace(/^\/|\/$/g, '');
                    const normalizedItem = item.url.toLowerCase().replace(/^\/|\/$/g, '');
                    
                    const isThisPage = normalizedCurrent === normalizedItem || 
                                     fullPath.endsWith(item.url) || 
                                     item.url.includes(segments[segments.length-1]);

                    const activeClass = isThisPage ? 'class="active"' : '';
                    
                    li.innerHTML = `<a href="${item.url}" ${activeClass}>${item.title}</a>`;
                    ul.appendChild(li);
                });

                // Title Update
                const titleEl = sidebar.querySelector('.sidebar-title');
                if(titleEl) titleEl.textContent = currentFolder.toUpperCase().replace(/-/g, ' ');
                
                // Desktop Sidebar Visible Fix
                if (window.innerWidth > 991) {
                    sidebar.style.transform = "translateX(0)";
                    sidebar.style.display = "block";
                }
            } else {
                console.warn("No links found for:", currentFolder);
                ul.innerHTML = '<li><a href="/" class="active">Home / No Topic Data</a></li>';
            }
        } catch (error) {
            console.error("Critical Sidebar Error:", error.message);
            if(window.location.protocol === 'file:') {
                console.error("TIP: You are opening HTML as a file. Use a local server (like Live Server) for AJAX/Fetch to work.");
            }
        }

        sidebarNav.addEventListener("click", (e) => {
            if (e.target.tagName === "A" && window.innerWidth <= 991) {
                closeMobileSidebar();
            }
        });
    }
});

// Right Sidebar Logic (Unchanged but fixed potential null error from console)
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
        const commentsBlock = document.getElementById("comments-and-ratings-container");
        if (!sidebar || !commentsBlock) return;

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
