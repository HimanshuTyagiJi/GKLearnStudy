

document.addEventListener("DOMContentLoaded", function () {
    let deferredPrompt;
    
    // Install Button Create or Select
    let installBtn = document.createElement('button');
    installBtn.id = 'installBtn';
    installBtn.innerText = 'Install GK Learn App';
    installBtn.style.display = 'none';
    installBtn.style.position = 'fixed';
    installBtn.style.bottom = '20px';
    installBtn.style.right = '20px';
    installBtn.style.zIndex = '9999';
    installBtn.style.padding = '10px 15px';
    installBtn.style.backgroundColor = '#641ef9';
    installBtn.style.color = '#fff';
    installBtn.style.border = 'none';
    installBtn.style.borderRadius = '8px';
    installBtn.style.cursor = 'pointer';
    document.body.appendChild(installBtn);

    // Listen for the install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault(); // Default prompt रोकें
        deferredPrompt = e;

        // Show the install button
        installBtn.style.display = 'block';

        installBtn.addEventListener('click', () => {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
                installBtn.style.display = 'none';
            });
        });
    });

    // अगर पहले से installed हो तो बटन hide रखें
    window.addEventListener('appinstalled', () => {
        installBtn.style.display = 'none';
    });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get all heading elements from h1 to h6
  const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));

  // Keep track of the last heading level
  let lastLevel = 0;

  headings.forEach((heading, index) => {
    const currentLevel = parseInt(heading.tagName.charAt(1));
    if (index === 0) {
      // Set lastLevel for first heading
      lastLevel = currentLevel;
      return;
    }

    // Check if current heading level jumps beyond lastLevel + 1
    if (currentLevel > lastLevel + 1) {
      const missingHeadings = [];

      // Insert all missing headings between lastLevel and currentLevel
      for (let i = lastLevel + 1; i < currentLevel; i++) {
        const emptyHeading = document.createElement("h" + i);
        emptyHeading.innerHTML = ""; // Blank content
        missingHeadings.push(emptyHeading);
      }

      // Insert missing headings before current heading
      const parent = heading.parentNode;
      missingHeadings.forEach(mh => {
        parent.insertBefore(mh, heading);
      });
    }

    // Update lastLevel to current
    lastLevel = currentLevel;
  });
});



(function() {
  const existingFavicon = document.querySelector('link[rel="icon"]');
  if (!existingFavicon) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = 'https://gklearnstudy.in/favicon.ico';
    link.type = 'image/x-icon';
    document.head.appendChild(link);
    console.log("Favicon added dynamically.");
  } else {
    console.log("Favicon already exists. Skipping addition.");
  }
})();







window.addEventListener('scroll', function () {
    const scrollY = window.scrollY || window.pageYOffset;
    const trigger = window.innerHeight * 0.25; // 25% scroll

    if (scrollY > trigger) {
      document.body.classList.add('scrolled');
    }
  });


 document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a');

  links.forEach(link => {
    // Add title if not present
    if (!link.hasAttribute('title') || link.getAttribute('title').trim() === "") {
      let titleText = link.textContent.trim();
      if (titleText === "") {
        const href = link.getAttribute('href');
        titleText = href ? `Visit: ${href}` : 'Go to link';
      }
      link.setAttribute('title', titleText);
    }

    // SECURITY FIX: Add rel="noopener noreferrer" if target="_blank"
    if (link.getAttribute('target') === '_blank') {
      const currentRel = link.getAttribute('rel') || '';
      if (!currentRel.includes('noopener')) {
        link.setAttribute('rel', (currentRel + ' noopener noreferrer').trim());
      }
    }
  });
});




// File: inject-adsense.js
(function () {
  const adsScript = document.createElement("script");
  adsScript.setAttribute("async", "");
  adsScript.setAttribute("src", "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7067722696020503");
  adsScript.setAttribute("crossorigin", "anonymous");

  document.head.appendChild(adsScript);
})();


// Prevent right-click context menu
document.addEventListener("contextmenu", function (e) {
    e.preventDefault(); // Prevent the context menu
});

// Disable specific keyboard shortcuts
document.addEventListener("keydown", function (e) {
    if (
        (e.ctrlKey && e.key === "s") || // Disable Ctrl+S
        (e.ctrlKey && e.key === "u") || // Disable Ctrl+U
        (e.ctrlKey && e.key === "c") || // Disable Ctrl+C
        (e.ctrlKey && e.key === "p") || // Disable Ctrl+P
        (e.ctrlKey && e.shiftKey && e.key === "I") // Disable Ctrl+Shift+I (DevTools)
    ) {
        e.preventDefault();
    }
}); 

// Redirect if 'view-source:' URL is detected
if (window.location.protocol === 'view-source:') {
    window.location.href = "https://your-website-url.com"; // Replace with your website URL
}




        // JavaScript for image error handling and auto placeholder generation
        document.addEventListener("DOMContentLoaded", () => {
            const images = document.querySelectorAll("img");

            images.forEach(img => {
                const imagePath = img.src.split('/').pop();  // Get the image name like 'phonology.webp'
                
                // Check if image is available
                const image = new Image();
                image.src = img.src;
                
                image.onload = () => {
                    // Image loaded successfully, no placeholder needed
                    console.log("Image loaded:", img.src);
                };

                image.onerror = () => {
                    // Image not found, show placeholder
                    const name = imagePath.split(".")[0];  // Get name of the image without extension
                    const placeholder = document.createElement("div");
                    placeholder.className = "placeholder";
                    placeholder.innerHTML = `
                        <div class="emoji">📘</div>
                        <div>${name.charAt(0).toUpperCase() + name.slice(1)}</div>
                    `;
                    img.replaceWith(placeholder);
                };
            });
        });
    










const searchInput = document.getElementById("searchInput");

if (searchInput) {
    // Search bar ke focus ko rokne ke liye
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === "Tab") {
            event.preventDefault();
            console.log("Search function called"); // Apne search function ko yaha call karein
        }
    });

    // Mobile devices par keyboard behavior customize karne ke liye
    searchInput.addEventListener("focus", function () {
        document.querySelectorAll("input").forEach((input) => {
            if (input !== this) {
                input.setAttribute("tabindex", "-1");
            }
        });
    });

    searchInput.addEventListener("blur", function () {
        document.querySelectorAll("input").forEach((input) => {
            input.removeAttribute("tabindex");
        });
    });
}



if (window.location.pathname === "/hindi-test-part-01") {
    window.location.replace("/hindi-test/part-01");
}

if (window.location.pathname === "/vyakaran.html") {
    window.location.replace("/vyakaran-language.html");
}


//theme
// Create elements
const body = document.body;
const themeToggle = document.createElement('button');
const themeIcon = document.createElement('span');

themeToggle.id = 'themeToggle';
themeIcon.id = 'themeIcon';

// Define SVG icons as strings
const sunIcon = `
<svg id="sunIcon" fill="yellow" viewBox="-87.6 -87.6 1051.20 1051.20" stroke="red" stroke-width="20.00876" aria-hidden="true">
    <g>
        <circle cx="438" cy="438" r="246"></circle>
        <path d="M420.5,163h35c11.046,0,20-8.954,20-20V20c0-11.046-8.954-20-20-20h-35c-11.046,0-20,8.954-20,20v123C400.5,154.046,409.454,163,420.5,163z"></path>
        <path d="M713,420.5v35c0,11.046,8.954,20,20,20h123c11.046,0,20-8.954,20-20v-35c0-11.046-8.954-20-20-20H733C721.954,400.5,713,409.454,713,420.5z"></path>
        <path d="M455.5,876c11.046,0,20-8.954,20-20V733c0-11.046-8.954-20-20-20h-35c-11.046,0-20,8.954-20,20v123c0,11.046,8.954,20,20,20H455.5z"></path>
        <path d="M20,475.5h123c11.046,0,20-8.954,20-20v-35c0-11.046-8.954-20-20-20H20c-11.046,0-20,8.954-20,20v35C0,466.546,8.954,475.5,20,475.5z"></path>
        <path d="M644.829,255.92c7.811,7.81,20.474,7.811,28.284,0l86.975-86.974c7.811-7.812,7.811-20.474,0-28.284l-24.749-24.749c-7.811-7.811-20.474-7.811-28.284,0l-86.975,86.974c-7.812,7.81-7.812,20.474,0,28.284L644.829,255.92z"></path>
        <path d="M735.338,760.087l24.749-24.749c7.811-7.81,7.811-20.474,0-28.284l-86.975-86.974c-7.812-7.811-20.475-7.811-28.284,0l-24.749,24.749c-7.812,7.811-7.812,20.474,0,28.284l86.975,86.974C714.865,767.898,727.528,767.898,735.338,760.087z"></path>
        <path d="M168.946,760.087l86.975-86.974c7.812-7.811,7.812-20.475,0-28.284l-24.749-24.749c-7.811-7.811-20.474-7.811-28.284,0l-86.975,86.974c-7.811,7.812-7.811,20.475,0,28.284l24.749,24.749C148.472,767.898,161.135,767.898,168.946,760.087z"></path>
        <path d="M202.887,255.92c7.811,7.811,20.474,7.81,28.284,0l24.749-24.749c7.812-7.81,7.812-20.474,0-28.284l-86.975-86.974c-7.811-7.811-20.474-7.811-28.284,0l-24.749,24.749c-7.811,7.81-7.811,20.474,0,28.284L202.887,255.92z"></path>
    </g>
</svg>`;
const moonIcon = `
<svg id="moonIcon" viewBox="0 0 48.00 48.00" fill="#ffffff" stroke="#000000" style="display: none;" aria-hidden="true">
    <path d="m32.8,29.3c-8.9-.8-16.2-7.8-17.5-16.6-.3-1.8-.3-3.7,0-5.4.2-1.4-1.4-2.3-2.5-1.6C6.3,9.7,2.1,16.9,2.5,25c.5,10.7,9,19.5,19.7,20.4,10.6.9,19.8-6,22.5-15.6.4-1.4-1-2.6-2.3-2-2.9,1.3-6.1,1.8-9.6,1.5Z"></path>
</svg>`;


// Set innerHTML for icons
themeIcon.innerHTML = sunIcon + moonIcon;

// Set aria-label for accessibility
themeToggle.setAttribute('aria-label', 'Switch theme');

// Append themeIcon to themeToggle
themeToggle.appendChild(themeIcon);

// Append themeToggle to body
body.appendChild(themeToggle);

// Function to switch theme
function switchTheme() {
    let currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        document.getElementById('sunIcon').style.display = 'block';
        document.getElementById('moonIcon').style.display = 'none';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('sunIcon').style.display = 'none';
        document.getElementById('moonIcon').style.display = 'block';
        localStorage.setItem('theme', 'dark');
    }
}

// Check saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    let savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('sunIcon').style.display = 'none';
        document.getElementById('moonIcon').style.display = 'block';
    } else {
        document.documentElement.removeAttribute('data-theme');
        document.getElementById('sunIcon').style.display = 'block';
        document.getElementById('moonIcon').style.display = 'none';
    }
});

// Toggle theme on button click
themeToggle.addEventListener('click', switchTheme);

// Create the header element
const header = document.createElement('header');
header.className = 'header';
header.id = 'header';

// Create the nav element
const nav = document.createElement('nav');
nav.className = 'navbar container1';

// Create the logo container1 div
const logocontainer1 = document.createElement('div');
logocontainer1.className = 'logo-container1';

// Create the brand link
const brandLink = document.createElement('a');
brandLink.href = 'https://gklearnstudy.in';
brandLink.className = 'brand';
brandLink.setAttribute('aria-label', 'GK Learn Study'); // Accessibility fix

brandLink.appendChild(logocontainer1); // Append the logo container1 to the brand link

// Append the brand link to the nav
nav.appendChild(brandLink);

// Create the demo2 div with SVG inside it
const demo2 = document.createElement('div');
demo2.className = 'demo2';
logocontainer1.appendChild(demo2);


// SVG code
demo2.innerHTML = `
<svg width="40" height="40" viewBox="0 0 300 300">
    <circle cx="150" cy="150" r="150" fill="white"/>

    <text x="50%" y="35%" font-size="90" font-weight="bold" fill="red" text-anchor="middle" opacity="0">
        GK
        <animate attributeName="opacity" from="0" to="1" begin="0.5s" dur="2s" fill="freeze"/>
        <animateTransform attributeName="transform" type="scale" from="0.8" to="1" begin="0.5s" dur="2s" fill="freeze"/>
    </text>

    <text x="50%" y="65%" font-size="38" fill="purple" text-anchor="middle" opacity="0">
        Learn Study
        <animate attributeName="opacity" from="0" to="1" begin="0.5s" dur="2s" fill="freeze"/>
        <animateTransform attributeName="transform" type="scale" from="0.8" to="1" begin="0.5s" dur="2s" fill="freeze"/>
    </text>

    <clipPath id="circle-clip">
        <circle cx="150" cy="150" r="150"/>
    </clipPath>

    <g clip-path="url(#circle-clip)">
        <path fill="#c0a4fb" fill-opacity="1">
            <animate attributeName="d" dur="6s" repeatCount="indefinite"
                values="
                M0 230 Q 75 220, 150 230 T 300 200 L 300 300 L 0 300 Z;
                M0 220 Q 75 230, 150 220 T 300 230 L 300 300 L 0 300 Z;
                M0 230 Q 75 220, 150 230 T 300 220 L 300 300 L 0 300 Z"
            />
        </path>
        <path fill="#641ef9" fill-opacity="0.7">
            <animate attributeName="d" dur="6s" repeatCount="indefinite"
                values="
                M0 220 Q 75 235, 150 240 T 300 230 L 300 300 L 0 300 Z;
                M0 230 Q 75 250, 150 235 T 300 220 L 300 300 L 0 300 Z;
                M0 220 Q 75 240, 150 215 T 300 250 L 300 300 L 0 300 Z"
            />
        </path>
    </g>
</svg>
`;



// Create and append the burger menu
const burger = document.createElement('div');
burger.className = 'burger';
burger.id = 'burger';
for (let i = 0; i < 3; i++) {
  const line = document.createElement('span');
  line.className = 'burger-line';
  burger.appendChild(line);
}
nav.appendChild(burger);

// Create and append the overlay
const overlay = document.createElement('span');
overlay.className = 'overlay';
nav.appendChild(overlay);

// Create and append the menu
const menu = document.createElement('div');
menu.className = 'menu';
menu.id = 'menu';

// Create the back arrow inside the menu
const backArrow = document.createElement('span');
backArrow.className = 'back-arrow';
backArrow.innerHTML = '×'; 
menu.appendChild(backArrow);

// Add the brand inside the menu
const menuBrand = document.createElement('a');
menuBrand.href = 'https://gklearnstudy.in';
menuBrand.className = 'menu-brand';
menuBrand.textContent = 'GK';
menu.appendChild(menuBrand);


// Create the left and right menu arrows
const leftArrow = document.createElement('div');
leftArrow.className = 'menu-arrow left';
leftArrow.innerHTML = '&#8249;';
menu.appendChild(leftArrow);

const rightArrow = document.createElement('div');
rightArrow.className = 'menu-arrow right';
rightArrow.innerHTML = '&#8250;';
menu.appendChild(rightArrow);
document.querySelectorAll('.logo-container1, .menu-inner, .burger-line').forEach(el => {
    el.style.position = 'absolute';
    el.style.transition = 'none';
});
// Define menu items
const menuItems = [
  { text: "Home", href: "https://gklearnstudy.in" },
  { text: "Education", href: "https://gklearnstudy.in/education.html" },
  { text: "All Formula", href: "https://gklearnstudy.in/all-formulas.html" },
  { text: "Computer", href: "https://gklearnstudy.in/computer.html" },
  { text: "How to", href: "https://gklearnstudy.in/kaise-karen.html" },
  { text: "GK Quiz", href: "https://gklearnstudy.in/gk-quiz.html" },
  { text: "Test", href: "https://gklearnstudy.in/test.html" },
];

// Create the menu inner container
const menuInner = document.createElement('div');
menuInner.className = 'menu-inner';

// Function to set active class based on current page
function setActiveLink() {
    const currentPath = window.location.pathname.toLowerCase(); // e.g., /education.html

    menuItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;

        const itemPath = new URL(item.href).pathname.toLowerCase();

        // 1. Home should be active only on root or /index.html
        if ((currentPath === "/" || currentPath === "/index.html") && item.text.toLowerCase() === "home") {
            link.classList.add("active");
        }

        // 2. All Formula should be active if "formula" is in URL
        else if (currentPath.includes("formula") && item.text.toLowerCase() === "all formula") {
            link.classList.add("active");
        }

        // 3. GK Quiz, Computer, How to – sublink active
        else if (
            (currentPath.startsWith("/gk-quiz") && item.text.toLowerCase() === "gk quiz") ||
            (currentPath.startsWith("/computer") && item.text.toLowerCase() === "computer") ||
            (currentPath.startsWith("/kaise-karen") && item.text.toLowerCase() === "how to") ||
            (currentPath.startsWith("/education") && item.text.toLowerCase() === "education") ||
            (currentPath.startsWith("/test") && item.text.toLowerCase() === "test") ||
            (currentPath.startsWith("/hindi-test") && item.text.toLowerCase() === "test") ||
            (currentPath.startsWith("/computer-test") && item.text.toLowerCase() === "test")
        ) {
            link.classList.add("active");
        }

        menuInner.appendChild(link);
    });
}

// Call the function
setActiveLink();


// Append menu inner to the menu container
menu.appendChild(menuInner);
nav.appendChild(menu);



   
// Append the nav to the header
header.appendChild(nav);

// Append the header to the body
document.body.appendChild(header);

// JavaScript for interactivity
// JavaScript for interactivity

// Toggle menu open/close on burger click
document.querySelector('.burger').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('is-active');
  document.querySelector('.overlay').classList.toggle('is-active');
  document.querySelector('.burger').classList.toggle('hide'); // Hide the burger when the menu is open
});

// Close menu on overlay click
document.querySelector('.overlay').addEventListener('click', () => {
  document.querySelector('.menu').classList.remove('is-active');
  document.querySelector('.overlay').classList.remove('is-active');
  document.querySelector('.burger').classList.remove('hide'); // Show the burger when the menu is closed
});

// Close menu on back arrow click inside the menu
document.querySelector('.back-arrow')?.addEventListener('click', () => {
  document.querySelector('.menu')?.classList.remove('is-active');
  document.querySelector('.overlay')?.classList.remove('is-active');
  document.querySelector('.burger')?.classList.remove('hide');
});

const menuInnerDiv = document.querySelector('.menu-inner');
const leftArrowDiv = document.querySelector('.menu-arrow.left');
const rightArrowDiv = document.querySelector('.menu-arrow.right');

const updateArrows = () => {
  window.requestAnimationFrame(() => {
    const scrollWidth = menuInnerDiv.scrollWidth;
    const clientWidth = menuInnerDiv.clientWidth;
    const scrollLeft = menuInnerDiv.scrollLeft;

    leftArrowDiv.style.visibility = scrollLeft > 0 ? 'visible' : 'hidden';
    rightArrowDiv.style.visibility = scrollWidth > clientWidth + scrollLeft ? 'visible' : 'hidden';
  });
};

leftArrowDiv.addEventListener('click', () => {
  menuInnerDiv.scrollBy({ left: -200, behavior: 'smooth' });
  setTimeout(updateArrows, 300);
});

rightArrowDiv.addEventListener('click', () => {
  menuInnerDiv.scrollBy({ left: 200, behavior: 'smooth' });
  setTimeout(updateArrows, 300);
});

// Optional: Also update on scroll to catch user drag
menuInnerDiv.addEventListener('scroll', updateArrows);

// Initial update
updateArrows();




// Function to add 'active' class to clicked link and remove from others
function activateLink(link) {
  var links = document.querySelectorAll('a');
  links.forEach(function(item) {
    item.classList.remove('active');
  });
  link.classList.add('active');
}

/* ============================================================
   GK LEARN STUDY — OLD VERSION FOOTER CLEAN REPLACEMENT SYSTEM
   JUST AS YOU SAID — NOTHING MORE, NOTHING LESS
===============================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /* ------------------------------------------------------------
       1️⃣ Old footer को पूरी तरह disable कर दो
    -------------------------------------------------------------*/
    const oldFooter = document.querySelector("footer .custom-row");

    if (oldFooter) {
        oldFooter.style.opacity = "0";
        oldFooter.style.pointerEvents = "none";
        oldFooter.style.height = "0px";
        oldFooter.style.overflow = "hidden";
    }

    /* old footer functions disable */
    const oldBtn = document.querySelector("footer button");
    if (oldBtn) oldBtn.style.display = "none";

    const oldPara = document.getElementById("my-paragraph");
    if (oldPara) oldPara.style.display = "none";

    const oldSocial = document.getElementById("social-links");
    if (oldSocial) oldSocial.innerHTML = "";

    /* ------------------------------------------------------------
       2️⃣ Insert NEW footer + rating/comment — हमेशा <footer> के ऊपर
    -------------------------------------------------------------*/
    const footerTag = document.querySelector("footer");

    if (footerTag) {
        footerTag.insertAdjacentHTML("beforebegin", `

            <div id="comments-and-ratings-container">

                <!-- ⭐ NEW VERSION — RATING BOX ⭐ -->
                <div id="rating-widget-wrapper" class="rating-widget-wrapper rating-loading">
                    <div class="rating-skeleton">
                        <div class="rating-skeleton-display">
                            <div class="skeleton-summary">
                                <div class="skeleton-circle"></div>
                                <div class="skeleton-line short"></div>
                            </div>
                            <div class="skeleton-breakdown">
                                <div class="skeleton-line"></div>
                                <div class="skeleton-line"></div>
                                <div class="skeleton-line"></div>
                                <div class="skeleton-line"></div>
                                <div class="skeleton-line"></div>
                            </div>
                        </div>
                    </div>

                    <div id="rating-widget" class="rating-content">
                        <h2>Rate this Page</h2>

                        <div id="rating-display">
                            <div class="average-summary">
                                <div id="average-rating-value">0.0</div>
                                <div id="total-ratings-count">0 ratings</div>
                            </div>
                        </div>

                        <div id="rating-stars">
                            <svg class="star" data-value="1" viewBox="0 0 24 24"></svg>
                            <svg class="star" data-value="2" viewBox="0 0 24 24"></svg>
                            <svg class="star" data-value="3" viewBox="0 0 24 24"></svg>
                            <svg class="star" data-value="4" viewBox="0 0 24 24"></svg>
                            <svg class="star" data-value="5" viewBox="0 0 24 24"></svg>
                        </div>

                        <div id="rating-login-prompt" style="display:none;">
                            <p>Please sign in to rate.</p>
                        </div>
                    </div>
                </div>

                <!-- 💬 COMMENTS BOX -->
                <div class="comments-wrapper comments-loading" id="comments-main-container">
                    <div class="firebase-comments-widget" id="custom-comment-section">
                        <h2><span id="comment-count">0</span> Comments</h2>

                        <div id="auth-container">
                            <div id="user-info"></div>
                            <button id="login-btn" class="btn primary">Sign in with Google</button>
                            <button id="logout-btn" class="btn">Logout</button>
                        </div>

                        <div id="login-prompt" style="display:none;">
                            <p>Please sign in to comment.</p>
                        </div>

                        <div class="comment-form-shell" id="comment-form-shell" style="display:none;">
                            <form id="comment-form">
                                <textarea id="comment" maxlength="1000" placeholder="Add a public comment..." required></textarea>
                                <input type="hidden" id="parent-id" />
                                <div class="form-footer">
                                    <div id="char-counter">0 / 1000</div>
                                    <button type="submit" class="btn primary">Submit</button>
                                </div>
                            </form>
                        </div>

                        <div id="comments-list"></div>
                    </div>
                </div>

                <!-- 🌐 NEW FINAL FOOTER -->
                <footer class="app-footer">
                    <div class="footer-content"></div>
                    <div class="footer-bottom" id="footer-year">
                        © 2024 - <span id="year"></span> GK Learn Study | All Rights Reserved
                    </div>
                </footer>

            </div>
        `);
    }

    /* ------------------------------------------------------------
       3️⃣ Apply Footer Content (जो तूने exact दिया)
    -------------------------------------------------------------*/
    function initFooterContent() {
        const footerContent = document.querySelector('.app-footer .footer-content');
        if (!footerContent) return;

        const footerData = {
            about: {
                title: "About GK Learn Study",
                text: "Your one-stop destination for knowledge, tools, and tutorials..."
            },
            company: {
                title: "About Us",
                links: [
                    { href: "/about.html", text: "About Us" },
                    { href: "/contact.html", text: "Contact Us" },
                    { href: "/privacy-policy.html", text: "Privacy Policy" },
                    { href: "/terms.html", text: "Terms of Service" },
                    { href: "/comments.html", text: "Owner Dashboard", id: "dashboard-link" }
                ]
            },
            foryou: {
                title: "For you",
                links: [
                    { href: "https://gklearnstudy.in/gk-quiz/ancient-indian-history", text: "Ancient Indian History" },
                    { href: "https://gklearnstudy.in/gk-quiz/medieval-indian-history", text: "Medieval Indian History" }
                ]
            },
            science: {
                title: "Science & Computer",
                links: [
                    { href: "conversion.html", text: "Conversion" },
                    { href: "all-formulas.html", text: "All formulas" },
                    { href: "calculator.html", text: "Calculator" }
                ]
            },
            socials: {
                title: "Follow Us",
                links: [
                    {
                        href: "https://www.youtube.com/@GKLearnStudy",
                        label: "YouTube",
                        svg: '<svg viewBox="0 0 24 24" style="width:28px;"><path d="M21.5..."/></svg>'
                    }
                ]
            }
        };

        const makeLinks = arr =>
            arr.map(x => `<li ${x.id ? `id="${x.id}"` : ""}><a href="${x.href}">${x.text}</a></li>`).join("");

        const makeSocial = arr =>
            arr.map(x => `<li><a href="${x.href}" target="_blank">${x.svg}</a></li>`).join("");

        footerContent.innerHTML = `
            <div class="footer-section footer-about">
                <h3>${footerData.about.title}</h3>
                <p>${footerData.about.text}</p>
            </div>

            <div class="footer-section">
                <h4>${footerData.company.title}</h4>
                <ul>${makeLinks(footerData.company.links)}</ul>
            </div>

            <div class="footer-section">
                <h4>${footerData.foryou.title}</h4>
                <ul>${makeLinks(footerData.foryou.links)}</ul>
            </div>

            <div class="footer-section">
                <h4>${footerData.science.title}</h4>
                <ul>${makeLinks(footerData.science.links)}</ul>
            </div>

            <div class="footer-section">
                <h4>${footerData.socials.title}</h4>
                <ul class="footer-socials">${makeSocial(footerData.socials.links)}</ul>
            </div>
        `;
    }

    initFooterContent();

    /* ------------------------------------------------------------
       4️⃣ Dynamic Year Set
    -------------------------------------------------------------*/
    const yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();

    /* ------------------------------------------------------------
       5️⃣ Auto load needed scripts once
    -------------------------------------------------------------*/
    function loadOnce(src) {
        if (!document.querySelector(`script[src="${src}"]`)) {
            const s = document.createElement("script");
            s.src = src;
            s.defer = true;
            document.body.appendChild(s);
        }
    }

    loadOnce("https://gklearnstudy.in/js/comment.js");
    loadOnce("https://gklearnstudy.in/js/notification.js");
    loadOnce("https://gklearnstudy.in/js/search-data.js");
 loadOnce("https://gklearnstudy.in/css/theme.css");
     loadOnce("https://gklearnstudy.in/css/comment.css");
});







document.addEventListener("DOMContentLoaded", function () {
  const nonSelectableTags = [
    "h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "th", "td", "tr", "a",
    "br", "span", "div", "button", "input", "textarea", "select",
    "option", "label", "ul", "ol", "li", "dl", "dt", "dd", "em", "i", "code",
    "pre", "blockquote", "address", "dfn", "cite", "kbd", "samp", "var", "small",
    "sub", "sup", "abbr", "acronym", "q", "ins", "del"
  ];

  nonSelectableTags.forEach(tag => {
    document.querySelectorAll(tag).forEach(element => {
      element.classList.add('no-select');
    });
  });

  // Optional: copy event रोकना
  document.addEventListener('copy', function(e) {
    e.preventDefault();
  });
});



function myFunction() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) { // starting from 1 to skip header row
        tr[i].style.display = "none"; // hide the row by default
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""; // show the row if any of its cells match
                break; // no need to check other cells in this row
            }
        }       
    }
}
