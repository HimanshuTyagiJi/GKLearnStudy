
document.addEventListener('DOMContentLoaded', async () => {
    const sidebar = document.getElementById("topic-sidebar");
    const sidebarToggle = document.getElementById("topic-sidebar-toggle");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const sidebarNav = document.getElementById("topic-nav");

    // मोबाइल के लिए क्लोज फंक्शन
    function closeMobileSidebar() {
        if (sidebar) sidebar.classList.remove("is-open");
        if (sidebarOverlay) sidebarOverlay.classList.remove("is-open");
    }

    // टॉगल बटन इवेंट
    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("is-open");
            sidebarOverlay.classList.toggle("is-open");
        });
        sidebarOverlay.addEventListener("click", closeMobileSidebar);
    }

    if (sidebarNav) {
        // --- 1. फोल्डर डिटेक्शन (Very Important) ---
        const fullPath = window.location.pathname; 
        const segments = fullPath.split('/').filter(s => s.length > 0);
        
        // अगर आप https://gklearnstudy.in/himanshu/golu.html पर हैं:
        // segments[0] होगा 'himanshu'
        let currentFolder = "General";
        
        if (segments.length > 1) {
            currentFolder = segments[0]; // 'himanshu' फोल्डर मिल गया
        } else if (segments.length === 1 && !segments[0].endsWith('.html')) {
            currentFolder = segments[0];
        }

        console.log("Current Detected Folder:", currentFolder);

        try {
            // --- 2. JSON डेटा फेच करना ---
            // 'v=' वाला हिस्सा ब्राउज़र को मजबूर करता है कि वह पुरानी फाइल न दिखाए (No Cache)
            const response = await fetch('/data/topic-menu.json?v=' + Date.now());
            if (response.ok) {
                const data = await response.json();
                
                // फोल्डर के हिसाब से लिंक चुनना
                const links = data[currentFolder] || [];
                
                let ul = sidebarNav.querySelector('ul');
                if (!ul) {
                    ul = document.createElement('ul');
                    sidebarNav.appendChild(ul);
                }

                // --- 3. लिंक्स को HTML में डालना ---
                ul.innerHTML = ''; // पुरानी लिस्ट साफ़ करें

                if (links.length > 0) {
                    links.forEach(item => {
                        const li = document.createElement('li');
                        
                        // चेक करना कि क्या यही पेज अभी खुला है (Active link highlight)
                        const isMatch = fullPath.endsWith(item.url) || fullPath === item.url;
                        const activeClass = isMatch ? 'class="active"' : '';
                        
                        li.innerHTML = `<a href="${item.url}" ${activeClass}>${item.title}</a>`;
                        ul.appendChild(li);
                    });

                    // साइडबार का हेडर अपडेट करें
                    const titleEl = document.querySelector('.sidebar-title');
                    if(titleEl) {
                        titleEl.textContent = currentFolder.toUpperCase().replace(/-/g, ' ');
                    }
                } else {
                    // अगर डेटा न मिले
                    ul.innerHTML = '<li><a href="/" class="active">Home / General</a></li>';
                    console.warn("No links found in JSON for folder:", currentFolder);
                }
            }
        } catch (error) {
            console.error("Dynamic Sidebar Error:", error);
        }

        // मोबाइल पर ऑटो-क्लोज
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
