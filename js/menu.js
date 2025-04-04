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





// Footer function
function goToUrl() {
    window.location.href = "mailto:contact@gklearnstudy.in";
}
document.getElementById("my-paragraph").innerHTML = "Copyright All right reserved.";

// Social icons
const svgLinks = [
     {
          svg: `<svg height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" width="25px">
                  <g>
                      <path d="M501.299,132.766c-5.888,-22.03 -23.234,-39.377 -45.264,-45.264c-39.932,-10.701 -200.037,-10.701 -200.037,-10.701c0,0 -160.105,0 -200.038,10.701c-22.025,5.887 -39.376,23.234 -45.264,45.264c-10.696,39.928 -10.696,123.236 -10.696,123.236c0,0 0,83.308 10.696,123.232c5.888,22.03 23.239,39.381 45.264,45.268c39.933,10.697 200.038,10.697 200.038,10.697c0,0 160.105,0 200.037,-10.697c22.03,-5.887 39.376,-23.238 45.264,-45.268c10.701,-39.924 10.701,-123.232 10.701,-123.232c0,0 0,-83.308 -10.701,-123.236Z" style="fill:#ed1f24;fill-rule:nonzero;"/>
                      <path d="M204.796,332.803l133.018,-76.801l-133.018,-76.801l0,153.602Z" style="fill:#fff;fill-rule:nonzero;"/>
                  </g>
              </svg>`,
          href: 'https://youtube.com/@gklearnstudy',
         label: 'GK Learn Study YouTube channel'
      },
      {
          svg: `<svg height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" width="25px">
                  <g>
                      <path d="M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z" style="fill:#1877f2;fill-rule:nonzero;"/>
                      <path d="M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z" style="fill:#fff;fill-rule:nonzero;"/>
                  </g>
              </svg>`,
          href: 'https://www.facebook.com/GoluLiv',
        label: 'GK Learn Study Facebook page'
      },
      {
          svg: ` <svg height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" width="25px">
                <svg enable-background="new 0 0 128 128" id="Social_Icons" version="1.1" viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="_x37__stroke">
            <g id="Instagram_1_">
                <rect clip-rule="evenodd" fill="none" fill-rule="evenodd" height="128" width="128"/>
                <radialGradient cx="19.1111" cy="128.4444" gradientUnits="userSpaceOnUse" id="Instagram_2_" r="163.5519">
                    <stop offset="0" style="stop-color:#FFB140"/>
                    <stop offset="0.2559" style="stop-color:#FF5445"/>
                    <stop offset="0.599" style="stop-color:#FC2B82"/>
                    <stop offset="1" style="stop-color:#8E40B7"/>
                </radialGradient>
                <path clip-rule="evenodd" d="M105.843,29.837c0,4.242-3.439,7.68-7.68,7.68c-4.241,0-7.68-3.438-7.68-7.68c0-4.242,3.439-7.68,7.68-7.68C102.405,22.157,105.843,25.595,105.843,29.837z M64,85.333c-11.782,0-21.333-9.551-21.333-21.333c0-11.782,9.551-21.333,21.333-21.333c11.782,0,21.333,9.551,21.333,21.333C85.333,75.782,75.782,85.333,64,85.333z M64,31.135c-18.151,0-32.865,14.714-32.865,32.865c0,18.151,14.714,32.865,32.865,32.865c18.151,0,32.865-14.714,32.865-32.865C96.865,45.849,82.151,31.135,64,31.135z M64,11.532c17.089,0,19.113,0.065,25.861,0.373c6.24,0.285,9.629,1.327,11.884,2.204c2.987,1.161,5.119,2.548,7.359,4.788c2.24,2.239,3.627,4.371,4.788,7.359c0.876,2.255,1.919,5.644,2.204,11.884c0.308,6.749,0.373,8.773,0.373,25.862c0,17.089-0.065,19.113-0.373,25.861c-0.285,6.24-1.327,9.629-2.204,11.884c-1.161,2.987-2.548,5.119-4.788,7.359c-2.239,2.24-4.371,3.627-7.359,4.788c-2.255,0.876-5.644,1.919-11.884,2.204c-6.748,0.308-8.772,0.373-25.861,0.373c-17.09,0-19.114-0.065-25.862-0.373c-6.24-0.285-9.629-1.327-11.884-2.204c-2.987-1.161-5.119-2.548-7.359-4.788c-2.239-2.239-3.627-4.371-4.788-7.359c-0.876-2.255-1.919-5.644-2.204-11.884c-0.308-6.749-0.373-8.773-0.373-25.861c0-17.089,0.065-19.113,0.373-25.862c0.285-6.24,1.327-9.629,2.204-11.884c1.161-2.987,2.548-5.119,4.788-7.359c2.239-2.24,4.371-3.627,7.359-4.788c2.255-0.876,5.644-1.919,11.884-2.204C44.887,11.597,46.911,11.532,64,11.532z M64,0C46.619,0,44.439,0.074,37.613,0.385C30.801,0.696,26.148,1.778,22.078,3.36c-4.209,1.635-7.778,3.824-11.336,7.382C7.184,14.3,4.995,17.869,3.36,22.078c-1.582,4.071-2.664,8.723-2.975,15.535C0.074,44.439,0,46.619,0,64c0,17.381,0.074,19.561,0.385,26.387c0.311,6.812,1.393,11.464,2.975,15.535c1.635,4.209,3.824,7.778,7.382,11.336c3.558,3.558,7.127,5.746,11.336,7.382c4.071,1.582,8.723,2.664,15.535,2.975C44.439,127.926,46.619,128,64,128c17.381,0,19.561-0.074,26.387-0.385c6.812-0.311,11.464-1.393,15.535-2.975c4.209-1.636,7.778-3.824,11.336-7.382c3.558-3.558,5.746-7.127,7.382-11.336c1.582-4.071,2.664-8.723,2.975-15.535C127.926,83.561,128,81.381,128,64c0-17.381-0.074-19.561-0.385-26.387c-0.311-6.812-1.393-11.464-2.975-15.535c-1.636-4.209-3.824-7.778-7.382-11.336c-3.558-3.558-7.127-5.746-11.336-7.382c-4.071-1.582-8.723-2.664-15.535-2.975C83.561,0.074,81.381,0,64,0z" fill="url(#Instagram_2_)" fill-rule="evenodd" id="Instagram"/>
            </g>
        </g>
    </svg>`,
          href: 'https://www.instagram.com/gklearnstudy',
        label: 'GK Learn Study Instagram page'
      },
];

// Set up the container styles for social links
const socialLinksDiv = document.getElementById('social-links');
socialLinksDiv.style.display = 'flex';
socialLinksDiv.style.gap = '10px';
socialLinksDiv.style.justifyContent = 'center';

// Loop through the svgLinks array to dynamically add links
svgLinks.forEach(linkInfo => {
    // Create a container div for each SVG link
    const div = document.createElement('div');
    div.className = 'svg-link';

    // Create the <a> element with the appropriate href and target
    const link = document.createElement('a');
    link.href = linkInfo.href;
    link.target = "_blank"; // Open in a new tab
    link.setAttribute('aria-label', linkInfo.label); // Accessibility

    // Add the SVG content to the <a> element
    link.innerHTML = linkInfo.svg;

    // Append the link to the div container
    div.appendChild(link);

    // Append the div to the main container
    socialLinksDiv.appendChild(div);
});




document.addEventListener("DOMContentLoaded", function () {
  const nonSelectableTags = [
    "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h", "p", "b", "th", "td", "tr",
    "a", "br", "span", ".strong", "div", "button", "input", "textarea", "select",
    "option", "label", "ul", "ol", "li", "dl", "dt", "dd", "em", "i", "code",
    "pre", "blockquote", "address", "dfn", "cite", "kbd", "samp", "var", "small",
    "sub", "sup", "abbr", "acronym", "q", "ins", "del", "a:hover", "a:active",
    "a:focus"
  ];

  nonSelectableTags.forEach(tag => {
    const elements = document.querySelectorAll(tag);
    elements.forEach(element => {
      element.style.webkitUserSelect = "none";
      element.style.webkitTouchCallout = "none";
      element.style.mozUserSelect = "none";
      element.style.msUserSelect = "none";
      element.style.userSelect = "none";
      element.style.oUserSelect = "none";
    });
  });
});
