// Page Mapping: Key is source page (without .html), Value is target page (without .html)
const pageMappings = {
    "Ancient-Indian-History": "प्राचीन-भारतीय-इतिहास",
    "Medieval-Indian-History": "मध्यकालीन-भारतीय-इतिहास",
    "Modern-Indian-History": "आधुनिक-भारतीय-इतिहास",
    "World-History": "विश्व-इतिहास",
    "Indian-Polity-and-Constitution": "भारतीय-राजव्यवस्था-और-संविधान",
    "Indian-Economy": "भारतीय-अर्थव्यवस्था",
    "Environment-and-Biodiversity": "पर्यावरण-और-जैवविविधता",
    "Indian-Art-and-Culture": "भारतीय-कला-और-संस्कृति",
    "General-Science-Physics": "भौतिकी",
    "General-Science-Chemistry": "रसायन विज्ञान",
    "General-Science-Biology": "जीव विज्ञान",
    "Computer": "कंप्यूटर",
    "Sanskrit": "संस्कृत",
    "Books-and-Authors": "पुस्तकें-और-लेखक",
    "Sports-GK": "खेल-कूद-सामान्य-ज्ञान",
    "Famous-Personalities": "प्रसिद्ध-व्यक्तित्व",
    "Technology-and-Inventions": "प्रौद्योगिकी-और-आविष्कार",
    "Space-and-Universe": "अंतरिक्ष-और-ब्रह्मांड",
    "Indian-Geography": "भारतीय-भूगोल",
    "World-Geography": "विश्व-भूगोल",
    "Indian-Festivals-and-Traditions": "भारतीय-त्योहार-और-परंपराएं",
    "World-Organizations": "विश्व-संगठन",
    "International-Relations": "अंतरराष्ट्रीय-संबंध",
    "Awards-and-Honours": "पुरस्कार-और-सम्मान",
    "Current-Affairs": "समसामयिक-घटनाएं",
    "Indian-Defense": "भारतीय-रक्षा",
    "Important-Dates-and-Events": "महत्वपूर्ण-तिथियां-और-घटनाएं",
    "Transport-and-Communication": "परिवहन-और-संचार",
    "Famous-Monuments": "प्रसिद्ध-स्मारक",
    "Wildlife-and-National-Parks": "वन्यजीव-और-राष्ट्रीय-उद्यान",
    "Rivers-and-Lakes": "नदियां-और-झीलें",
    "Disasters-and-Calamities": "आपदाएं-और-दुर्घटनाएं",
    "Science-and-Technology": "विज्ञान-और-प्रौद्योगिकी",
    "Mathematical-GK": "गणितीय-सामान्य-ज्ञान"
};

// Custom domain or base URL
const customDomain = "https://gklearnstudy.in/";

// Function to check and display link for the current page
async function showCurrentPageLink() {
    const currentPage = window.location.pathname.split("/").pop().replace(/\.html$/, ""); // Get current page name without .html
    const targetPage = pageMappings[currentPage]; // Find mapping for the current page

    if (targetPage) {
        try {
            // Check if target file exists
            const response = await fetch(`${customDomain}${targetPage}`, { method: "HEAD" });
            if (response.ok) {
                // Create link if file exists
                const link = document.createElement("a");
                link.href = `${customDomain}${targetPage}`;
                link.textContent = `🌐 हिन्दी`;
                document.getElementById("link-container").appendChild(link);
            }
        } catch (error) {
            console.error(`Error checking file: ${customDomain}${targetPage}`, error);
        }
    }
}

// Call function to show the link for the current page
showCurrentPageLink();





// common.js
(function() {
  // Automatically add manifest link
  const manifestLink = document.createElement('link');
  manifestLink.rel = 'manifest';
  manifestLink.href = '/manifest.json';
  document.head.appendChild(manifestLink);

  // Automatically register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js', { scope: '/' })
      .then(() => console.log("Service Worker Registered"))
      .catch((err) => console.log("Service Worker Registration Failed", err));
  }
})();




// Create elements
const body = document.body;
const themeToggle = document.createElement('button');
const themeIcon = document.createElement('span');
const sunIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const moonIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

// Set attributes and properties
themeToggle.id = 'themeToggle';
themeToggle.textContent = '';
themeIcon.id = 'themeIcon';

sunIcon.setAttribute('id', 'sunIcon');
sunIcon.setAttribute('fill', 'yellow');
sunIcon.setAttribute('version', '1.1');
sunIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
sunIcon.setAttribute('viewBox', '-87.6 -87.6 1051.20 1051.20');
sunIcon.setAttribute('xml:space', 'preserve');
sunIcon.setAttribute('stroke', 'red');
sunIcon.setAttribute('stroke-width', '20.00876');
sunIcon.innerHTML = '<g><circle cx="438" cy="438" r="246"></circle><path d="M420.5,163h35c11.046,0,20-8.954,20-20V20c0-11.046-8.954-20-20-20h-35c-11.046,0-20,8.954-20,20v123C400.5,154.046,409.454,163,420.5,163z"></path><path d="M713,420.5v35c0,11.046,8.954,20,20,20h123c11.046,0,20-8.954,20-20v-35c0-11.046-8.954-20-20-20H733C721.954,400.5,713,409.454,713,420.5z"></path><path d="M455.5,876c11.046,0,20-8.954,20-20V733c0-11.046-8.954-20-20-20h-35c-11.046,0-20,8.954-20,20v123c0,11.046,8.954,20,20,20H455.5z"></path><path d="M20,475.5h123c11.046,0,20-8.954,20-20v-35c0-11.046-8.954-20-20-20H20c-11.046,0-20,8.954-20,20v35C0,466.546,8.954,475.5,20,475.5z"></path><path d="M644.829,255.92c7.811,7.81,20.474,7.811,28.284,0l86.975-86.974c7.811-7.812,7.811-20.474,0-28.284l-24.749-24.749c-7.811-7.811-20.474-7.811-28.284,0l-86.975,86.974c-7.812,7.81-7.812,20.474,0,28.284L644.829,255.92z"></path><path d="M735.338,760.087l24.749-24.749c7.811-7.81,7.811-20.474,0-28.284l-86.975-86.974c-7.812-7.811-20.475-7.811-28.284,0l-24.749,24.749c-7.812,7.811-7.812,20.474,0,28.284l86.975,86.974C714.865,767.898,727.528,767.898,735.338,760.087z"></path><path d="M168.946,760.087l86.975-86.974c7.812-7.811,7.812-20.475,0-28.284l-24.749-24.749c-7.811-7.811-20.474-7.811-28.284,0l-86.975,86.974c-7.811,7.812-7.811,20.475,0,28.284l24.749,24.749C148.472,767.898,161.135,767.898,168.946,760.087z"></path><path d="M202.887,255.92c7.811,7.811,20.474,7.81,28.284,0l24.749-24.749c7.812-7.81,7.812-20.474,0-28.284l-86.975-86.974c-7.811-7.811-20.474-7.811-28.284,0l-24.749,24.749c-7.811,7.81-7.811,20.474,0,28.284L202.887,255.92z"></path></g>';

moonIcon.setAttribute('id', 'moonIcon');
moonIcon.setAttribute('viewBox', '0 0 48.00 48.00');
moonIcon.setAttribute('fill', '#ffffff');
moonIcon.setAttribute('stroke', '#000000');
moonIcon.style.display = 'none';
moonIcon.innerHTML = '<path d="m32.8,29.3c-8.9-.8-16.2-7.8-17.5-16.6-.3-1.8-.3-3.7,0-5.4.2-1.4-1.4-2.3-2.5-1.6C6.3,9.7,2.1,16.9,2.5,25c.5,10.7,9,19.5,19.7,20.4,10.6.9,19.8-6,22.5-15.6.4-1.4-1-2.6-2.3-2-2.9,1.3-6.1,1.8-9.6,1.5Z"></path>';

// Append icons to themeIcon
themeIcon.appendChild(sunIcon);
themeIcon.appendChild(moonIcon);

// Append themeIcon to themeToggle
themeToggle.appendChild(themeIcon);

// Append themeToggle to body
body.appendChild(themeToggle);

// Function to switch theme
function switchTheme() {
    let currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        localStorage.setItem('theme', 'dark');
    }
}

// Check saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    let savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        document.documentElement.removeAttribute('data-theme');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
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

logocontainer1.style.borderRadius = '50%';
logocontainer1.style.background = 'white';
logocontainer1.style.position = 'relative';
logocontainer1.style.overflow = 'hidden';

// Create the demo2 div with SVG inside it
const demo2 = document.createElement('div');
demo2.className = 'demo2';
demo2.style.position = 'relative';
demo2.style.width = '200%';
demo2.style.height = '0px';


// SVG code
demo2.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
    <defs>
        <path id="gentle-wave" class="st0" d="M-160,35.6 c 30,0,58-6.6,88-6.6 s58,6.6,88,6.6s58-6.6,88-6.6s58,6.6,88,6.6V59h-352V35.6z"></path>
    </defs>
    <g class="parallax">
        <use style="fill:#c0a4fb;fill-opacity: 1;" xlink:href="#gentle-wave" x="48" y="0"></use>
        <use style="fill:#641ef9;fill-opacity: 1;" xlink:href="#gentle-wave" x="48" y="0"></use>
    </g>
</svg>
`;

// Create the logo text div
const logoText = document.createElement('div');
logoText.className = 'logo-text';
logoText.style.position = 'absolute';
logoText.style.top = '12%';
logoText.style.width = '100%';
logoText.style.color = 'red';
logoText.style.textAlign = 'center';
logoText.style.fontFamily = 'Arial, sans-serif';
logoText.style.animation = 'fadeInScale 2s ease-in-out forwards';
logoText.style.opacity = '0';
logoText.style.transform = 'scale(0.8)';

// Logo text content (h1 and p)
logoText.innerHTML = `
    <h1 style="font-size: 20px; margin: 0;">GK</h1>
    <p style="color: green; font-size: 9px; margin: 0;">Learn Study</p>
`;

// Append the demo2 and logoText to logocontainer1
logocontainer1.appendChild(demo2);
logocontainer1.appendChild(logoText);

// Create the brand link
const brandLink = document.createElement('a');
brandLink.href = './index.html';
brandLink.className = 'brand';
brandLink.appendChild(logocontainer1); // Append the logo container1 to the brand link

// Append the brand link to the nav
nav.appendChild(brandLink);



// Function to apply styles based on media query
function applyResponsiveStyles() {
    const minMax900 = window.matchMedia('(min-width: 320px) and (max-width: 900px)');
    const max320 = window.matchMedia('(max-width: 320px)');
    const min900 = window.matchMedia('(min-width: 900px)');
    
    if (max320.matches) {
        // Apply styles for screens with a max width of 320px
       
        logocontainer1.style.width = '25px';
        logocontainer1.style.height = '25px';
        logoText.querySelector('h1').style.fontSize = '9px';
        logoText.querySelector('p').style.fontSize = '3px';
        demo2.style.top = '40%';
        
    } else if (minMax900.matches) {
        // Apply styles for screens between 320px and 720px
        
       logocontainer1.style.width = '35px';
       logocontainer1.style.height = '35px';
       logoText.querySelector('h1').style.fontSize = '12px';
       logoText.querySelector('p').style.fontSize = '4px';
       demo2.style.top = '40%';
        
    } else if (min900.matches) {
        // Apply styles for screens with a min width of 720px
        logocontainer1.style.width = '45px';
        logocontainer1.style.height = '45px';
        logoText.querySelector('h1').style.fontSize = '20px';
        logoText.querySelector('p').style.fontSize = '5px';
        demo2.style.top = '60%';
    }
}

// Initial call to apply styles
applyResponsiveStyles();

// Add event listener to handle changes in viewport size
window.addEventListener('resize', applyResponsiveStyles);

// Add animation styles using JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes waveAnimateB {
        0% {
            transform: translate3d(-90px, 0, 0);
        }
        100% {
            transform: translate3d(85px, 0, 0);
        }
    }

    .demo2 .parallax > use {
        animation: waveAnimateB 14s linear infinite;
    }

    .demo2 .parallax > use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
        fill-opacity: 0.2;
    }

    .demo2 .parallax > use:nth-child(2) {
        animation-delay: -3s;
        animation-duration: 12s;
        fill-opacity: 1;
    }
`;
document.head.appendChild(style);


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
menuBrand.href = '/';
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

// Define menu items
const menuItems = [
  { text: "Home", href: "/" },
  { text: "Video", href: "https://gklearnstudy.in/Video.html" },
  { text: "Education", href: "https://gklearnstudy.in/education.html" },
  { text: "All Formula", href: "https://gklearnstudy.in/all-formulas.html" },
  { text: "Computer", href: "https://gklearnstudy.in/computer.html" },
  { text: "How to", href: "https://gklearnstudy.in/how-to.html" },
  { text: "GK Quiz", href: "https://gklearnstudy.in/gk-quiz.html" },
  { text: "Test", href: "https://gklearnstudy.in/test.html" },
];

// Create the menu inner container
const menuInner = document.createElement('div');
menuInner.className = 'menu-inner';

// Function to set active class based on current page
function setActiveLink() {
    // Get current page path
    const currentPath = window.location.pathname.split('/').pop(); // Extract current file name

    // Loop through each item and create link elements
    menuItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;

        // Compare link's href with current path and add active class if they match
        if (currentPath === item.href) {
            link.classList.add('active'); // Add active class
        }

        // Append each link to the menu inner container
        menuInner.appendChild(link);
    });
}

// Call function to set active link
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
document.querySelector('.back-arrow').addEventListener('click', () => {
  document.querySelector('.menu').classList.remove('is-active');
  document.querySelector('.overlay').classList.remove('is-active');
  document.querySelector('.burger').classList.remove('hide'); // Show the burger when the menu is closed
});


// Scroll menu items left and right
const menuInnerDiv = document.querySelector('.menu-inner');
const leftArrowDiv = document.querySelector('.menu-arrow.left');
const rightArrowDiv = document.querySelector('.menu-arrow.right');

const updateArrows = () => {
  const scrollWidth = menuInnerDiv.scrollWidth;
  const clientWidth = menuInnerDiv.clientWidth;
  const scrollLeft = menuInnerDiv.scrollLeft;

  leftArrowDiv.style.visibility = scrollLeft > 0 ? 'visible' : 'hidden';
  rightArrowDiv.style.visibility = scrollWidth > clientWidth + scrollLeft ? 'visible' : 'hidden';
};

leftArrowDiv.addEventListener('click', () => {
  menuInnerDiv.scrollBy({ left: -200, behavior: 'smooth' });
  updateArrows(); // Update arrow visibility after scrolling
});

rightArrowDiv.addEventListener('click', () => {
  menuInnerDiv.scrollBy({ left: 200, behavior: 'smooth' });
  updateArrows(); // Update arrow visibility after scrolling
});

// Initial update to set arrow visibility based on initial state
updateArrows();



// Function to add 'active' class to clicked link and remove from others
function activateLink(link) {
  var links = document.querySelectorAll('a');
  links.forEach(function(item) {
    item.classList.remove('active');
  });
  link.classList.add('active');
}








const linkData = [
  {name: "Mathematics All formulas", url: "https://gklearnstudy.in/mathematics-all-formulas", color: "red"},
  {name: "Physics formulas", url: "https://gklearnstudy.in/physics-all-formulas", color: "#03736f"},
  {name: "Chemical formulas", url: "https://gklearnstudy.in/all-formulas/all-chemical-formulas", color: "#11f705"},
  {name: "Periodic table", url: "https://gklearnstudy.in/all-formulas/periodic-table", color: "orange"},
    ];

// Getting a reference to the list element where the links will be added:
const linksList = document.getElementById("links-list");

// Looping through the link data and creating the links:
for (let i = 0; i < linkData.length; i++) {
  const link = document.createElement("a");
  link.href = linkData[i].url;
  link.textContent = linkData[i].name;

  // Changing the link color:
  link.style.color = linkData[i].color;
const listItem = document.createElement("p");
  
  // Disabling the default <li> styles:
  listItem.style.listStyle = 'none';
  listItem.style.marginLeft = '-24px';
  listItem.style.padding = '0';
listItem.style.textAlign = 'left';  // Ensure text-align is not justified

  listItem.appendChild(link);
  linksList.appendChild(listItem);
}


