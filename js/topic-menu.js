
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
        // --- DYNAMIC FOLDER DETECTION ---
        const path = window.location.pathname; 
        const segments = path.split('/').filter(s => s.length > 0);
        // अगर path /himanshu/golu.html है, तो folder 'himanshu' होगा
        const currentFolder = segments.length > 1 ? segments[0] : "General";

        try {
            // Fetch the menu database
            const response = await fetch('/data/topic-menu.json?v=' + Date.now());
            if (response.ok) {
                const menuData = await response.json();
                const dynamicLinks = menuData[currentFolder] || [];
                
                let ul = sidebarNav.querySelector('ul');
                if (!ul) {
                    ul = document.createElement('ul');
                    sidebarNav.appendChild(ul);
                }

                // उस फोल्डर के सभी लिंक्स को लूप करके साइडबार में जोड़ें
                dynamicLinks.forEach(item => {
                    // चेक करें कि क्या यह लिंक पहले से HTML में मौजूद है (डुप्लीकेट रोकने के लिए)
                    const existingLinks = Array.from(ul.querySelectorAll('a'));
                    const isAlreadyInHtml = existingLinks.some(a => {
                        const href = a.getAttribute('href');
                        return href === item.url || href === 'https://gklearnstudy.in' + item.url;
                    });

                    if (!isAlreadyInHtml) {
                        const li = document.createElement('li');
                        // अगर वर्तमान URL लिंक के URL से मैच करता है, तो active क्लास दें
                        const isActive = path.endsWith(item.url) ? 'class="active"' : '';
                        li.innerHTML = `<a href="${item.url}" ${isActive}>${item.title}</a>`;
                        ul.appendChild(li);
                    } else {
                        // अगर पहले से मौजूद है, तो बस चेक करें कि क्या उसे active दिखाना है
                        existingLinks.forEach(a => {
                            if(a.getAttribute('href') === item.url && path.endsWith(item.url)) {
                                a.classList.add('active');
                            }
                        });
                    }
                });

                // साइडबार का टाइटल फोल्डर के नाम पर रखें
                const titleEl = sidebar.querySelector('.sidebar-title');
                if(titleEl && currentFolder !== "General") {
                    titleEl.textContent = currentFolder.replace(/-/g, ' ').toUpperCase();
                }
            }
        } catch (error) {
            console.warn("Dynamic menu system failed to load folder items:", error);
        }

        // Sidebar click handler for mobile
        sidebarNav.addEventListener("click", (e) => {
            if (e.target.tagName === "A") {
                if (window.innerWidth <= 991) closeMobileSidebar();
            }
        });
    }
});

// Existing Right Sidebar & Mobile Logic
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
