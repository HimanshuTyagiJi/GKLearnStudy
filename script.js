window.onload = function() {
    localStorage.clear();
    sessionStorage.clear();
    caches.keys().then(function(names) {
        for (let name of names) caches.delete(name);
    });
};

self.addEventListener('install', (event) => {
    self.skipWaiting(); // Update service worker immediately
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => caches.delete(cache)) // Old cache clear
            );
        })
    );
});

// Automatically clear cache and load new content
(function () {
    const resources = document.querySelectorAll('link[rel="stylesheet"], script[src]');

    resources.forEach((resource) => {
        const url = new URL(resource.href || resource.src);
        url.searchParams.set('v', Date.now()); // Add a unique version query param
        if (resource.tagName === 'LINK') {
            resource.href = url.toString();
        } else if (resource.tagName === 'SCRIPT') {
            resource.src = url.toString();
        }
    });
})();

(function() {
    // Check if the current URL has .html
    var currentUrl = window.location.href;

    // If .html is in the URL, remove it from the visible URL
    if (currentUrl.includes('.html')) {
        var newUrl = currentUrl.replace(/\.html(\?|#|$)/, '$1');
        history.replaceState(null, null, newUrl);
    }
})();

        function myFunction() {
            document.getElementById("myDropdown").classList.toggle("show");
        }

        // Close the dropdown if the user clicks outside of it
        window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }

        document.addEventListener("DOMContentLoaded", function() {
            // Replace the web icon
            var favicon = document.querySelector('link[rel="icon"]');
            if (!favicon) {
                favicon = document.createElement('link');
                favicon.rel = 'icon';
                document.head.appendChild(favicon);
            }
            favicon.href = "https://gklearnstudy.in/gklearnstudy.png";

            // Change the website title
           

            // Change the text of the span
           var textSpan = document.querySelector('.q0vns .VuuXrf');
if (textSpan) {
    textSpan.textContent = "GK Learn Study";
}


            // Replace the icon SVG with your image
            var iconContainer = document.querySelector('.H9lube .eqA2re');
            if (iconContainer) {
                iconContainer.innerHTML = '<img src="https://gklearnstudy.in/gklearnstudy.png" alt="GK Learn Study" style="height:18px;line-height:18px;width:18px">';
            }
        });

      
    
    window.onload = function() {
        // Ensure that your elements have loaded
        setTimeout(function() {
            // Update the image source with your logo URL
            var logoElement = document.querySelector('img.rms_img');
            if (logoElement) {
                logoElement.src = 'https://gklearnstudy.in/gklearnstudy.png';
                logoElement.alt = 'GK Learn Study';
            }

            // Update the title text
            var titleElement = document.querySelector('div.tptt');
            if (titleElement) {
                titleElement.textContent = 'GK Learn Study';
            }

        
            // Update the aria-label attribute for the link
            var linkElement = document.querySelector('a.tilk');
            if (linkElement) {
                linkElement.setAttribute('aria-label', 'GK Learn Study');
            }
        },);// Delay to ensure elements are loaded
    };





document.addEventListener('DOMContentLoaded', (event) => {
    // Existing code to add favicon, manifest, and metadata
    const head = document.querySelector('head');

    // Favicon
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/png'; // Correct MIME type for PNG image
    faviconLink.href = 'https://gklearnstudy.in/gklearnstudy.png';
    head.appendChild(faviconLink);

    // Metadata
    const metaOgTitle = document.createElement('meta');
    metaOgTitle.setAttribute('property', 'og:title');
    metaOgTitle.content = 'GK Learn Study';
    head.appendChild(metaOgTitle);

    const metaOgImage = document.createElement('meta');
    metaOgImage.setAttribute('property', 'og:image');
    metaOgImage.content = 'https://gklearnstudy.in/gklearnstudy.png';
    head.appendChild(metaOgImage);

    const metaOgUrl = document.createElement('meta');
    metaOgUrl.setAttribute('property', 'og:url');
    metaOgUrl.content = 'https://gklearnstudy.in'; // Corrected URL
    head.appendChild(metaOgUrl);
});





document.addEventListener('DOMContentLoaded', function() {
  var menuList = document.getElementById('menuList');
  var listItem = document.getElementById('myListItem');
  var link = document.getElementById('myLink');

  
});




function scrollMenu(direction) {
  const scrollContainer = document.getElementById('scrollmenu');
  if (direction === 'left') {
      scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
  } else if (direction === 'right') {
      scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
  }
}

function toggleMenu() {
  var menuList = document.getElementById('menuList');
  var menuToggle = document.querySelector('.menu-toggle');
  if (menuList.style.display === 'none' || menuList.style.display === '') {
      menuList.style.display = 'block';
      menuToggle.style.display = 'none'; // Hide toggle button
      document.addEventListener('click', closeMenuOnClickOutside);
  } else {
      menuList.style.display = 'none';
      menuToggle.style.display = 'block'; // Show toggle button
      document.removeEventListener('click', closeMenuOnClickOutside);
  }
}

function closeMenuOnClickOutside(event) {
  var menuList = document.getElementById('menuList');
  var menuToggle = document.querySelector('.menu-toggle');
  if (!menuList.contains(event.target) && event.target !== menuToggle) {
      menuList.style.display = 'none';
      menuToggle.style.display = 'block'; // Show toggle button
      document.removeEventListener('click', closeMenuOnClickOutside);
  }
}

var youtubeChannelID = "https://youtube.com/@gklearnstudy";
var instagramProfileURL = "https://www.instagram.com/gklearnstudy";

document.addEventListener("DOMContentLoaded", function() {
    var youtubeMetaTag = document.querySelector('meta[property="youtube:channel"]');
    if (youtubeMetaTag) {
        youtubeMetaTag.content = youtubeChannelID;
    }


    var instagramMetaTag = document.querySelector('meta[property="instagram:profile"]');
    if (instagramMetaTag) {
        instagramMetaTag.content = instagramProfileURL;
    }
});
        // Sabhi input elements ko select karna
var inputElements = document.querySelectorAll('[id^="input"]');

// Sabhi input elements ko iterate karke styling apply karna
inputElements.forEach(function(inputElement) {
  inputElement.style.border = "none";
  inputElement.style.outline = "none";
  inputElement.style.background = "none";
  inputElement.style.color = "green";
  inputElement.style.fontSize = "18px"; 
  inputElement.style.width = "100%";

  // Apni desired font size daal sakte hain
 
});


// Current web page ka title extract karna
var currentPageTitle = document.title;

// Title generate karne ka example
var generatedTitle = currentPageTitle + " - GK Learn Study";

// Generated title ko current web page ke title tag mein set karna
document.title = generatedTitle;

// Console mein new title ko display karna
console.log("New Title: " + generatedTitle);




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






                  








function multiplicationTable() {
        var table;
        table='<table id="mtable">';

        var num=document.getElementById("number").value;
        if(num==null || num=="")
        num=n;
           for(i=1;i<=100;i++){
              table+='<tr><td>'+num+'  x  '+ i + '  =  '  +num*i+' </td></tr> ';
           }

        table+='</table>';
        document.getElementById("result").innerHTML = table;
        }var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}




document.addEventListener('DOMContentLoaded', function() {
  var headers = document.querySelectorAll('.collapsible-header');
  
  headers.forEach(function(header) {
    header.addEventListener('click', function() {
      var content = this.nextElementSibling;
      var arrow = this.querySelector('.arrow');
      
      if (content.style.display === 'block') {
        content.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
      } else {
        content.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
      }
    });
  });
});

function getAntonyms() {
  const word = document.getElementById("word").value;
  const url = `https://api.datamuse.com/words?rel_ant=${word}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      let antonyms = data.map(obj => obj.word).join(", ");
      if (antonyms) {
        document.getElementById("output").textContent = `Antonyms: ${antonyms}`;
      } else {
        document.getElementById("output").textContent = `No antonyms found for ${word}`;
      }
    })
    .catch(error => {
      console.error("Antonym search failed:", error);
    });
}
function getSynonyms() {
  const word = document.getElementById("word").value;
  const url = `https://api.datamuse.com/words?rel_syn=${word}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const synonyms = data.map(obj => obj.word);
      const output = document.getElementById("output");
      output.innerHTML = `Synonyms for "${word}": ${synonyms.join(", ")}`;
    })
    .catch(error => {
      console.error(error);
      const output = document.getElementById("output");
      output.innerHTML = "An error occurred while fetching synonyms.";
    });
}






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
          href: 'https://youtube.com/@gklearnstudy'
      },
      {
          svg: `<svg height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" width="25px">
                  <g>
                      <path d="M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z" style="fill:#1877f2;fill-rule:nonzero;"/>
                      <path d="M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z" style="fill:#fff;fill-rule:nonzero;"/>
                  </g>
              </svg>`,
          href: 'https://www.facebook.com/GoluLiv'
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
          href: 'https://www.instagram.com/gklearnstudy'
      },
      // Add more SVG objects as needed...
  ];
  
  // Get the element where the SVG links will be inserted
  const svgLinksDiv = document.getElementById('social-links');
  
  // Loop through the svgLinks array and create a div for each SVG link
  svgLinks.forEach(linkInfo => {
      const div = document.createElement('div');
      div.className = 'svg-link';
  
      // Create an <a> element with the SVG link information
      const link = document.createElement('a');
      link.href = linkInfo.href;
      link.target = "_blank"; // Open link in new tab
  
      // Set inner HTML of the link to the SVG
      link.innerHTML = linkInfo.svg;
  
      // Append the <a> element to the <div> element
      div.appendChild(link);
  
      // Append the <div> element to the svgLinksDiv element
      svgLinksDiv.appendChild(div);
  });
  
      // script.js

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

     

// Add event listener to the input field
document.getElementById('filterInput') 
