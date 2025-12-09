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

    // 1️⃣ Check if topic menu exists
    const topicMenu = document.querySelector("nav#topic-nav");
    if (!topicMenu) return; // No topic menu → no sidebar needed

    // 2️⃣ Check if Right Sidebar already exists
    if (!document.getElementById("right-sidebar")) {
        const rightBar = document.createElement("div");
        rightBar.id = "right-sidebar";
        rightBar.innerHTML = `
            <strong>Our App</strong>
            <ul id="link-list"></ul>
        `;

        // Insert after topic navigation
        topicMenu.insertAdjacentElement("afterend", rightBar);
    }

    // 3️⃣ Check if rightside.js already loaded
    const existingScript = document.querySelector(
        'script[src="https://gklearnstudy.in/js/rightside.js"]'
    );

    if (!existingScript) {
        const rightSideScript = document.createElement("script");
        rightSideScript.src = "https://gklearnstudy.in/js/rightside.js";
        rightSideScript.defer = true;
        document.body.appendChild(rightSideScript);
    }

});


