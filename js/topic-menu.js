
document.addEventListener('DOMContentLoaded', async () => {
    const sidebar = document.getElementById("topic-sidebar");
    const sidebarToggle = document.getElementById("topic-sidebar-toggle");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const sidebarNav = document.getElementById("topic-nav");

    // मोबाइल साइडबार क्लोज करने का फंक्शन
    function closeMobileSidebar() {
        if (sidebar) sidebar.classList.remove("is-open");
        if (sidebarOverlay) sidebarOverlay.classList.remove("is-open");
    }

    // साइडबार टॉगल इवेंट्स
    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("is-open");
            sidebarOverlay.classList.toggle("is-open");
        });
        sidebarOverlay.addEventListener("click", closeMobileSidebar);
    }

    if (sidebarNav) {
        // --- 1. फोल्डर डिटेक्शन (Robust Logic) ---
        const fullPath = window.location.pathname; 
        const segments = fullPath.split('/').filter(s => s.length > 0);
        
        // अगर पाथ /himanshu/golu.html है, तो segments[0] = 'himanshu' होगा
        let currentFolder = "General";
        if (segments.length > 1) {
            currentFolder = segments[0];
        } else if (segments.length === 1 && !segments[0].endsWith('.html')) {
            currentFolder = segments[0];
        }

        try {
            // --- 2. JSON डेटा लोड करना ---
            const response = await fetch('/data/topic-menu.json?v=' + Date.now());
            if (response.ok) {
                const menuData = await response.json();
                
                // उस फोल्डर के लिंक्स निकालना (जैसे 'himanshu' के अंदर 3 लिंक)
                const folderLinks = menuData[currentFolder] || [];
                
                // आपके HTML में मौजूद UL को ढूंढना
                let ul = sidebarNav.querySelector('ul');
                if (!ul) {
                    ul = document.createElement('ul');
                    sidebarNav.appendChild(ul);
                }

                // --- 3. पुराने लिंक साफ़ करके नए इंजेक्ट करना ---
                ul.innerHTML = ''; 

                if (folderLinks.length > 0) {
                    folderLinks.forEach(item => {
                        const li = document.createElement('li');
                        
                        // चेक करना कि क्या यही पेज अभी खुला है (Active Link Highlight)
                        const cleanPath = fullPath.replace(/\/$/, "");
                        const cleanItemUrl = item.url.replace(/\/$/, "");
                        
                        const isThisPage = cleanPath === cleanItemUrl || 
                                         fullPath.endsWith(item.url) || 
                                         item.url.endsWith(fullPath.split('/').pop());

                        const activeClass = isThisPage ? 'class="active"' : '';
                        
                        // लिंक को बनाना और जोड़ना
                        li.innerHTML = `<a href="${item.url}" ${activeClass}>${item.title}</a>`;
                        ul.appendChild(li);
                    });

                    // साइडबार का टाइटल फोल्डर के नाम पर सेट करना
                    const titleEl = document.querySelector('.sidebar-title');
                    if(titleEl) {
                        titleEl.textContent = currentFolder.replace(/-/g, ' ').toUpperCase();
                    }
                } else {
                    // अगर JSON में उस फोल्डर का कोई डेटा नहीं है
                    ul.innerHTML = '<li><a href="/" class="active">Home / General</a></li>';
                }
            }
        } catch (error) {
            console.warn("Dynamic sidebar injection failed:", error);
        }

        // मोबाइल पर लिंक क्लिक होने के बाद साइडबार बंद करना
        sidebarNav.addEventListener("click", (e) => {
            if (e.target.tagName === "A" && window.innerWidth <= 991) {
                closeMobileSidebar();
            }
        });
    }
});

// Right Sidebar Logic (Unchanged)
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
