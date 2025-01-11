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

// Logo text content (h2 and p)
logoText.innerHTML = `
    <h2 style="font-size: 20px; margin: 0;">GK</h2>
    <p style="color: green; font-size: 9px; margin: 0;">Learn Study</p>
`;

// Append the demo2 and logoText to logocontainer1
logocontainer1.appendChild(demo2);
logocontainer1.appendChild(logoText);

// Create the brand link
const brandLink = document.createElement('a');
brandLink.href = 'https://gklearnstudy.in';
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
        logoText.querySelector('h2').style.fontSize = '9px';
        logoText.querySelector('p').style.fontSize = '3px';
        demo2.style.top = '40%';
        
    } else if (minMax900.matches) {
        // Apply styles for screens between 320px and 720px
        
       logocontainer1.style.width = '35px';
       logocontainer1.style.height = '35px';
       logoText.querySelector('h2').style.fontSize = '12px';
       logoText.querySelector('p').style.fontSize = '4px';
       demo2.style.top = '40%';
        
    } else if (min900.matches) {
        // Apply styles for screens with a min width of 720px
        logocontainer1.style.width = '45px';
        logocontainer1.style.height = '45px';
        logoText.querySelector('h2').style.fontSize = '20px';
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

// Define menu items
const menuItems = [
  { text: "Home", href: "https://gklearnstudy.in" },
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



//important link 




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




// footer


 function goToUrl() {
    window.location.href = "mailto:contact@gklearnstudy.in";
  }
      document.getElementById("my-paragraph").innerHTML = "Copyright All right reserved.";
    // Define an array of objects containing image information
   
  // Define an array of objects containing SVG link information
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
        svg: `<svg height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" width="25px">
                <g>
                    <path d="M105.843,29.837c0,4.242-3.439,7.68-7.68,7.68c-4.241,0-7.68-3.438-7.68-7.68c0-4.242,3.439-7.68,7.68-7.68C102.405,22.157,105.843,25.595,105.843,29.837z M64,85.333c-11.782,0-21.333-9.551-21.333-21.333c0-11.782,9.551-21.333,21.333-21.333c11.782,0,21.333,9.551,21.333,21.333C85.333,75.782,75.782,85.333,64,85.333z M64,31.135c-18.151,0-32.865,14.714-32.865,32.865c0,18.151,14.714,32.865,32.865,32.865c18.151,0,32.865-14.714,32.865-32.865C96.865,45.849,82.151,31.135,64,31.135z M64,11.532c17.089,0,19.113,0.065,25.861,0.373c6.24,0.285,9.629,1.327,11.884,2.204c2.987,1.161,5.119,2.548,7.359,4.788c2.24,2.239,3.627,4.371,4.788,7.359c0.876,2.255,1.919,5.644,2.204,11.884c0.308,6.749,0.373,8.773,0.373,25.862c0,17.089-0.065,19.113-0.373,25.861c-0.285,6.24-1.327,9.629-2.204,11.884c-1.161,2.987-2.548,5.119-4.788,7.359c-2.239,2.24-4.371,3.627-7.359,4.788c-2.255,0.876-5.644,1.919-11.884,2.204C44.887,11.597,46.911,11.532,64,11.532z M64,0C46.619,0,44.439,0.074,37.613,0.235C20.658,0.553,10.194,3.036,2.467,10.39C-3.491,16.137-6.292,23.439-6.292,32.179C-6.292,40.67-3.032,48.891,2.627,55.128c5.662,6.086,12.571,8.019,22.697,8.019c11.553,0,19.02-3.574,25.136-8.699C58.182,48.879,64,41.148,64,32.179C64,23.581,61.093,16.167,56.432,10.052C51.477,4.037,44.968,0.236,37.613,0.235C44.439,0.074,46.619,0,64,0z" style="fill:#f5f5f5;fill-rule:nonzero;"/>
                </g>
            </svg>`,
        href: 'https://www.instagram.com/gklearnstudy',
        label: 'GK Learn Study Instagram page'
    }
];

// Iterate through the svgLinks array to create and append SVG links
svgLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.target = '_blank'; // Open in a new tab
    a.innerHTML = link.svg;
    a.setAttribute('aria-label', link.label); // Adding aria-label for accessibility
    document.getElementById('social-media-links').appendChild(a);
});

 
