
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
        sidebarNav.addEventListener("click", (e) => {
            if (e.target.tagName === "A") {
                const currentActive = sidebarNav.querySelector("a.active");
                if (currentActive) currentActive.classList.remove("active");
                e.target.classList.add("active");
                if (window.innerWidth <= 991) closeMobileSidebar();
            }
        });

        // --- NEW DYNAMIC LINK LOADING ---
        const path = window.location.pathname;
        const segments = path.split('/').filter(s => s.length > 0);
        const currentFolder = segments.length > 1 ? segments[0] : "General";

        try {
            const response = await fetch('/data/topic-menu.json?v=' + Date.now());
            if (response.ok) {
                const menuData = await response.json();
                const dynamicLinks = menuData[currentFolder] || [];
                
                let ul = sidebarNav.querySelector('ul');
                if (!ul) {
                    ul = document.createElement('ul');
                    sidebarNav.appendChild(ul);
                }

                dynamicLinks.forEach(item => {
                    // Check if link already exists in manual HTML to avoid duplicates
                    const exists = Array.from(ul.querySelectorAll('a')).some(a => a.getAttribute('href') === item.url);
                    if (!exists) {
                        const li = document.createElement('li');
                        const isActive = path.endsWith(item.url) ? 'class="active"' : '';
                        li.innerHTML = `<a href="${item.url}" ${isActive}>${item.title}</a>`;
                        ul.appendChild(li);
                    }
                });

                const titleEl = sidebar.querySelector('.sidebar-title');
                if (titleEl && currentFolder !== "General") {
                    titleEl.textContent = currentFolder.replace(/-/g, ' ').toUpperCase();
                }
            }
        } catch (error) {
            console.warn("Dynamic menu failed to load, keeping manual links:", error);
        }
    }
});

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
