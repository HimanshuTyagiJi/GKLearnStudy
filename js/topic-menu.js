document.addEventListener('DOMContentLoaded', () => {
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
                if (currentActive) {
                    currentActive.classList.remove("active");
                }
                e.target.classList.add("active");

                // Close sidebar on mobile after selection
                if (window.innerWidth <= 991) {
                    closeMobileSidebar();
                }
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {

    // Check topic menu exists
    const topicMenu = document.querySelector("nav#topic-nav");
    if (!topicMenu) return;

    // Prevent duplicate sidebar
    if (!document.getElementById("right-sidebar")) {
        const rightBar = document.createElement("div");
        rightBar.id = "right-sidebar";
        rightBar.innerHTML = `
            <strong>Our App</strong>
            <ul id="link-list"></ul>
        `;

        // 📌 Desktop: right side (default)
        document.body.appendChild(rightBar);
    }

    // Inject CSS if missing
    if (!document.querySelector('link[href="https://gklearnstudy.in/css/rightside.css"]')) {
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "https://gklearnstudy.in/css/rightside.css";
        document.head.appendChild(css);
    }

    // Inject JS if missing
    if (!document.querySelector('script[src="https://gklearnstudy.in/js/rightside.js"]')) {
        const script = document.createElement("script");
        script.src = "https://gklearnstudy.in/js/rightside.js";
        script.defer = true;
        document.body.appendChild(script);
    }

    /* 
    ===================================================
    📱 MOBILE MODE → Sidebar को comments के ऊपर ले जाना
    ===================================================
    */

    function moveSidebarForMobile() {
        const sidebar = document.getElementById("right-sidebar");
        if (!sidebar) return;

        const commentsBlock = document.getElementById("comments-and-ratings-container");
        if (!commentsBlock) return;

        if (window.innerWidth <= 768) {
            // Mobile → comments block के पहले insert करें
            if (sidebar.parentNode !== commentsBlock.parentNode) {
                commentsBlock.parentNode.insertBefore(sidebar, commentsBlock);
            }
        } else {
            // Desktop → body में right side पर रखें
            if (sidebar.parentNode !== document.body) {
                document.body.appendChild(sidebar);
            }
        }
    }

    // On load
    moveSidebarForMobile();

    // On resize
    window.addEventListener("resize", moveSidebarForMobile);

});
