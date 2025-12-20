
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
        // --- 1. फोल्डर डिटेक्शन (Smarter Path Detection) ---
        const currentPath = window.location.pathname; 
        const segments = currentPath.split('/').filter(s => s.length > 0);
        
        let currentFolder = "General";
        // अगर आप /himanshu/tyagi.html पर हैं, तो segments[0] 'himanshu' होगा
        if (segments.length >= 1) {
            if (!segments[0].includes('.html')) {
                currentFolder = segments[0];
            }
        }

        console.log("Active Category Folder:", currentFolder);

        try {
            // --- 2. JSON Fetch (Direct Root Path) ---
            // GitHub या Website पर '/data/...' हमेशा Root से फाइल उठाता है
            const response = await fetch('/data/topic-menu.json?v=' + Date.now());
            if (!response.ok) throw new Error("Could not load menu data");
            
            const menuData = await response.json();
            const links = menuData[currentFolder] || [];
            
            let ul = sidebarNav.querySelector('ul');
            if (!ul) {
                ul = document.createElement('ul');
                sidebarNav.appendChild(ul);
            }

            ul.innerHTML = ''; 

            if (links.length > 0) {
                links.forEach(item => {
                    const li = document.createElement('li');
                    
                    // --- 3. URL FIX: Ensure Root-Relative ---
                    let cleanUrl = item.url;
                    // अगर लिंक में पहले से '/' नहीं है, तो जोड़ दो (e.g. 'himanshu/a.html' -> '/himanshu/a.html')
                    if (!cleanUrl.startsWith('/') && !cleanUrl.startsWith('http')) {
                        cleanUrl = '/' + cleanUrl;
                    }
                    
                    // Active Link check
                    const normalizedCurrent = currentPath.toLowerCase().replace(/\/$/, '');
                    const normalizedTarget = cleanUrl.toLowerCase().replace(/\/$/, '');
                    const isMatch = normalizedCurrent === normalizedTarget || currentPath.endsWith(cleanUrl);
                    
                    const activeClass = isMatch ? 'class="active"' : '';
                    
                    // लिंक में सीधे cleanUrl डालना ताकि browser domain के साथ उसे सही जोड़े
                    li.innerHTML = `<a href="${cleanUrl}" ${activeClass}>${item.title}</a>`;
                    ul.appendChild(li);
                });

                // Title Update
                const titleEl = sidebar.querySelector('.sidebar-title');
                if(titleEl) titleEl.textContent = currentFolder.toUpperCase();
                
                // Show sidebar on desktop
                if (window.innerWidth > 991) {
                    sidebar.style.transform = "translateX(0)";
                    sidebar.style.display = "block";
                }
            } else {
                ul.innerHTML = '<li><a href="/" class="active">Home / GK Study</a></li>';
            }
        } catch (error) {
            console.error("Sidebar Sync Error:", error);
        }

        sidebarNav.addEventListener("click", (e) => {
            if (e.target.tagName === "A" && window.innerWidth <= 991) {
                closeMobileSidebar();
            }
        });
    }
});

// Right Sidebar & Other Logic (Fixed potential errors)
document.addEventListener("DOMContentLoaded", function () {
    const topicMenu = document.querySelector("nav#topic-nav");
    if (!topicMenu) return;

    if (!document.getElementById("right-sidebar")) {
        const rightBar = document.createElement("div");
        rightBar.id = "right-sidebar";
        rightBar.innerHTML = `<strong>Our App</strong><ul id="link-list"></ul>`;
        document.body.appendChild(rightBar);
    }

    if (!document.querySelector('link[href*="rightside.css"]')) {
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "https://gklearnstudy.in/css/rightside.css";
        document.head.appendChild(css);
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
