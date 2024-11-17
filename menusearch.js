
document.addEventListener('DOMContentLoaded', () => {
  let installPopup = document.createElement('div');
  installPopup.id = 'install-popup';
  installPopup.innerHTML = `
    <p>Install our PWA for a better experience!</p>
    <button id="install-btn">Install</button>
  `;
  document.body.appendChild(installPopup);

  let installBtn = document.getElementById('install-btn');
  let popup = document.getElementById('install-popup');

  // Retrieve previous install status and visit count from localStorage
  let isInstallClicked = localStorage.getItem('installClicked'); 
  let visitCount = parseInt(localStorage.getItem('visitCount') || 0); 

  // If already installed or clicked install, don't show popup
  if (isInstallClicked || visitCount >= 10000) {
    popup.style.display = 'none';
  } else {
    // Increment visit count on first visit
    visitCount++;
    localStorage.setItem('visitCount', visitCount);

    // Show popup for first two visits
    if (visitCount <= 10000) {
      popup.style.display = 'block';
    }
  }

  // Handle Install Button Click
  installBtn.addEventListener('click', () => {
    localStorage.setItem('installClicked', true); // Mark install as clicked
    popup.style.display = 'none';
  });

  // Optional: Handle 'beforeinstallprompt' event for the installation flow
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default install prompt
    e.preventDefault();
    deferredPrompt = e;
  });

  // Show the install prompt on clicking the button
  installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    }
  });
});





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
menuBrand.href = './index.html';
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
  { text: "Home", href: "index.html" },
  { text: "Conversion", href: "conversion.html" },
  { text: "Education", href: "education.html" },
  { text: "All Formula", href: "all-formulas.html" },
  { text: "Computer", href: "computer.html" },
  { text: "How to", href: "how-to.html" },
  { text: "GK Quiz", href: "gk-quiz.html" },
  { text: "Test", href: "test.html" },
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

function updateSuggestions(event) {
  const query = event.target.value.toLowerCase();
  const suggestionsContainer = document.getElementById('suggestions');
  suggestionsContainer.innerHTML = ''; // पूर्व सुझावों को साफ करें

  if (!query) {
    suggestionsContainer.style.display = 'none'; // यदि इनपुट खाली है तो सुझाव छिपाएं
    return;
  }

  const searchResults = contentData.filter(item => {
    const title = item.title.toLowerCase();
    const snippet = item.snippet.toLowerCase();
    return title.includes(query) ||
           snippet.includes(query) ||
           levenshteinDistance(query, title) <= 2 ||
           levenshteinDistance(query, snippet) <= 2 ||
           fuzzyMatch(query, title) ||
           fuzzyMatch(query, snippet);
  });

  // प्रासंगिकता के आधार पर परिणामों को क्रमबद्ध करें
  searchResults.sort((a, b) => relevanceScore(query, b) - relevanceScore(query, a));

  if (searchResults.length > 0) {
    searchResults.forEach(result => {
      const suggestionDiv = document.createElement('div');
      suggestionDiv.className = 'suggestion-item';
      suggestionDiv.innerHTML = result.title;
      suggestionDiv.onclick = () => navigateToSection(result.link, result.id); // क्लिक इवेंट सेट करें

      suggestionsContainer.appendChild(suggestionDiv);
    });
    suggestionsContainer.style.display = 'block'; // सुझाव दिखाएं
  } else {
    suggestionsContainer.style.display = 'none'; // यदि कोई मेल नहीं है तो सुझाव छिपाएं
  }
}

// प्रासंगिकता स्कोर की गणना करने का फ़ंक्शन
function relevanceScore(query, item) {
  const title = item.title.toLowerCase();
  const snippet = item.snippet.toLowerCase();
  const queryLength = query.length;

  // शीर्षक और स्निपेट के आधार पर स्कोर की गणना करें
  const titleScore = title.includes(query) ? queryLength : 0;
  const snippetScore = snippet.includes(query) ? queryLength / 2 : 0;

  // उच्च स्कोर का मतलब अधिक प्रासंगिकता
  return titleScore + snippetScore;
}

// सुझाव पर क्लिक करने पर सेक्शन पर नेविगेट करने का फ़ंक्शन
function navigateToSection(link, id) {
  window.location.href = link; // लिंक पर नेविगेट करें
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100); // नेविगेशन पूरा होने के लिए देरी
  document.getElementById('searchInput').value = ''; // चयन के बाद इनपुट साफ करें
  document.getElementById('suggestions').style.display = 'none'; // सुझाव छिपाएं
}

// मॉडल1 को बंद करने का फ़ंक्शन
function closeModal1(event) {
  if (event.target === document.getElementById('searchModal1') || event.target.classList.contains('close')) {
    document.getElementById('searchModal1').style.display = 'none';
  }
}

// मुख्य खोज फ़ंक्शन
function performSearch(event) {
  if (event) event.preventDefault(); // डिफ़ॉल्ट फॉर्म सबमिशन को रोकें

  const query = document.getElementById('searchInput').value.toLowerCase();
  if (!query) {
    alert('कृपया एक खोज शब्द दर्ज करें');
    return;
  }

  const searchResults = contentData.filter(item => {
    const title = item.title.toLowerCase();
    const snippet = item.snippet.toLowerCase();
    return fuzzyMatch(query, title) || fuzzyMatch(query, snippet);
  });

  // प्रासंगिकता के आधार पर परिणामों को क्रमबद्ध करें
  searchResults.sort((a, b) => relevanceScore(query, b) - relevanceScore(query, a));

  if (searchResults.length > 0) {
    displayResults(searchResults);
  } else {
    document.getElementById('results').innerHTML = '<p>कोई परिणाम नहीं मिला।</p>';
    document.getElementById('searchModal1').style.display = 'block';
  }
}

// फ़ज़ी मैच फ़ंक्शन
function fuzzyMatch(query, text) {
  // अगर क्वेरी टेक्स्ट के शुरू में मेल खाती है या टेक्स्ट में अधिकांश अक्षर शामिल हैं
  return text.startsWith(query) || 
         text.split('').filter((char, index) => query.includes(char)).length >= query.length - 1;
}

// खोज परिणाम दिखाने का फ़ंक्शन
function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // पूर्व परिणामों को साफ करें

  results.forEach(result => {
    const resultHTML = `
      <div class="result-card">
        <div class="result-image">
          <img src="${result.image}" alt="${result.title}">
        </div>
        <div class="result-content">
          <div class="result-title">
            <a href="#${result.id}" class="result-link" onclick="navigateToSection('${result.link}', '${result.id}')">${result.title}</a>
          </div>
          <div class="result-snippet">${result.snippet}</div>
        </div>
      </div>
    `;
    resultsContainer.innerHTML += resultHTML;
  });

  document.getElementById('searchModal1').style.display = 'block';
}

// लेवेनस्टीन दूरी का फ़ंक्शन
function levenshteinDistance(a, b) {
  let i, j;
  const alen = a.length;
  const blen = b.length;
  const d = Array.from({ length: alen + 1 }, () => []);

  for (i = 0; i <= alen; i++) d[i] = Array.from({ length: blen + 1 }, (_, j) => (i === 0 ? j : i));

  for (i = 1; i <= alen; i++) {
    for (j = 1; j <= blen; j++) {
      const tmp = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + tmp);
    }
  }
  return d[alen][blen];
}
document.addEventListener('DOMContentLoaded', function () {
  const searchIcon = document.querySelector('.search-icon');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchContainer = document.querySelector('.search-container');
  const suggestions = document.getElementById('suggestions');

  // Add the back icon to the search container
  const backIcon = document.createElement('span');
  backIcon.classList.add('back-icon');
  backIcon.innerHTML = '←';
  searchContainer.prepend(backIcon);

  // Event listener for back icon to close the search input
  backIcon.addEventListener('click', function () {
    searchContainer.classList.remove('expanded'); // Collapse the search container
    searchInput.value = ''; // Clear the input
    searchIcon.style.display = 'block'; // Show the search icon
    suggestions.style.display = 'none'; // Hide suggestions
    searchInput.blur(); // Remove focus from the input
  });

  // Event listener for search icon to open the search input
  searchIcon.addEventListener('click', function () {
    searchContainer.classList.add('expanded'); // Expand the search container
    searchInput.focus(); // Focus on the input field
    searchIcon.style.display = 'none'; // Hide the search icon
  });

  // Event listener for search input to show/hide suggestions
  searchInput.addEventListener('input', updateSuggestions);

  // Event listener for search input to perform search on Enter key
  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      performSearch(event);
    }
  });

  // Event listener for search button to perform search
  searchButton.addEventListener('click', performSearch);

  // Event listener to close the modal when clicking outside
  document.addEventListener('click', function (event) {
    if (event.target === document.getElementById('searchModal1') || event.target.classList.contains('close')) {
      document.getElementById('searchModal1').style.display = 'none';
    }
  });
});
