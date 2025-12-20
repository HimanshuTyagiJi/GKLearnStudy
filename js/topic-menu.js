
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
        // --- 1. फोल्डर ढूंढने का नया और सटीक तरीका ---
        // उदाहरण: /himanshu/tyagi.html -> segments = ['himanshu', 'tyagi.html']
        const fullPath = window.location.pathname; 
        const segments = fullPath.split('/').filter(s => s.length > 0);
        
        let currentFolder = "General";
        
        // अगर पाथ में कम से कम एक स्लैश है, तो पहला हिस्सा फोल्डर है
        if (segments.length >= 1) {
            // अगर पहला हिस्सा .html पर खत्म नहीं हो रहा, तो वही फोल्डर है
            if (!segments[0].includes('.html')) {
                currentFolder = segments[0];
            }
        }

        console.log("Auto-Detected Folder:", currentFolder);

        try {
            // --- 2. JSON डेटा फेच करना (Cache साफ़ करने के लिए ?v= का उपयोग) ---
            const response = await fetch('/data/topic-menu.json?v=' + Date.now());
            if (response.ok) {
                const menuData = await response.json();
                
                // फोल्डर के लिंक निकालें (जैसे 'himanshu')
                const folderLinks = menuData[currentFolder] || [];
                
                let ul = sidebarNav.querySelector('ul');
                if (!ul) {
                    ul = document.createElement('ul');
                    sidebarNav.appendChild(ul);
                }

                // पुराने लिंक साफ़ करें
                ul.innerHTML = ''; 

                if (folderLinks.length > 0) {
                    folderLinks.forEach(item => {
                        const li = document.createElement('li');
                        
                        // पाथ मैचिंग को आसान बनाना (स्लैश की चिंता छोड़कर)
                        const normalizedCurrent = fullPath.toLowerCase().replace(/^\/|\/$/g, '');
                        const normalizedItem = item.url.toLowerCase().replace(/^\/|\/$/g, '');
                        
                        const isThisPage = normalizedCurrent === normalizedItem || 
                                         fullPath.endsWith(item.url) || 
                                         item.url.includes(segments[segments.length-1]);

                        const activeClass = isThisPage ? 'class="active"' : '';
                        
                        li.innerHTML = `<a href="${item.url}" ${activeClass}>${item.title}</a>`;
                        ul.appendChild(li);
                    });

                    // साइडबार टाइटल को फोल्डर के नाम से बदलें
                    const titleEl = sidebar.querySelector('.sidebar-title');
                    if(titleEl) {
                        titleEl.textContent = currentFolder.toUpperCase().replace(/-/g, ' ');
                    }
                    
                    // डेस्कटॉप पर साइडबार दिखाना सुनिश्चित करें
                    if (window.innerWidth > 991) {
                        sidebar.style.transform = "translateX(0)";
                        sidebar.style.display = "block";
                    }
                } else {
                    console.warn("No data for folder in JSON:", currentFolder);
                    ul.innerHTML = '<li><a href="/" class="active">Home / General</a></li>';
                }
            }
        } catch (error) {
            console.error("Sidebar logic failed:", error);
        }

        sidebarNav.addEventListener("click", (e) => {
            if (e.target.tagName === "A" && window.innerWidth <= 991) {
                closeMobileSidebar();
            }
        });
    }
});

// Right Sidebar Logic (Preserved)
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
