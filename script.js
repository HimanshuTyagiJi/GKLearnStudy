// Create and insert the manifest link element
function addManifest() {
    var manifest = {
        "name": "GK Learn Study",
        "short_name": "GK Learn Study",
        "start_url": "https://gklearnstudy.in",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#000000",
        "icons": [
            {
                "src": "https://gklearnstudy.in/gklearnstudy.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "https://gklearnstudy.in/gklearnstudy.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
    };

    var manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/manifest+json' });
    var manifestURL = URL.createObjectURL(manifestBlob);

    var manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = manifestURL;
    document.head.appendChild(manifestLink);
}

// Register the service worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
}

// Initialize PWA features
function initializePWA() {
    addManifest();
    registerServiceWorker();
}

// Ensure the script runs after DOM is loaded
document.addEventListener('DOMContentLoaded', initializePWA);



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





function showPopup(element) {
  var popup = document.getElementById("popup");
  var overlay = document.getElementById("overlay");
  var closeBtn = document.getElementById("closeBtn");
  var popupContent = document.getElementById("popupContent");

  // Fetch real data or use predefined data
  var elementData = getElementData(element);

  // Set content based on the element data
  popupContent.innerHTML = `
      <h2>${elementData.name} (${elementData.symbol})</h2>
      <p><strong>Atomic Number:</strong> ${elementData.atomicNumber}</p>
      <p><strong>Atomic Mass:</strong> ${elementData.atomicMass}</p>
      <p><strong>Group:</strong> ${elementData.group}</p>
      <p><strong>Period:</strong> ${elementData.period}</p>
      <p><strong>Block:</strong> ${elementData.block}</p>
      <p><strong>Electronic Configuration:</strong> ${elementData.electronic}</p>
      <p><strong>Type:</strong> ${elementData.type}</p>
      <p><strong>Specific Name:</strong> ${elementData.specific}</p>
      <p><strong>Physical State:</strong> ${elementData.physical}</p>
      <p><strong>Description:</strong> ${elementData.description}</p>
  `;

  // Apply different background colors based on element type
  popup.className = elementData.type === 'metal' ? 'popup metal' : 'popup non-metal';

  // Show the popup and overlay
  popup.style.display = "block";
  overlay.style.display = "block";

  // Close the popup when clicking on overlay or close button
  overlay.onclick = closePopup;
  closeBtn.onclick = closePopup;
}

function closePopup() {
  var popup = document.getElementById("popup");
  var overlay = document.getElementById("overlay");

  // Remove background color class
  popup.classList.remove('metal', 'non-metal');

  // Hide the popup and overlay
  popup.style.display = "none";
  overlay.style.display = "none";
}

// Replace this with a real data fetching mechanism
function getElementData(element) {
  // Example data, replace with real data
  var data;
  switch (element) {
      case 'H':
          data = {
              name: "Hydrogen",
              symbol: "H",
              atomicNumber: 1,
              atomicMass: "1.0079 u",
              group:"1",
              period:"1",
              block:"s-block",
              electronic:"1s<sup>1</sup>",
              type: "non-metal",
              specific:"Reactive nonmetal",
              physical:"Gas",
              description: "Hydrogen is a chemical element with the symbol H and atomic number 1. It is the lightest and most abundant element in the universe.<br>हाइड्रोजन एक रासायनिक तत्व है जिसका प्रतीक H और परमाणु क्रमांक 1 है। यह ब्रह्मांड में सबसे हल्का और सबसे प्रचुर तत्व है।",
              
          };
          break;
          case 'He':
            data = {
                name: "Helium",
                symbol: "He",
                atomicNumber: 2,
                atomicMass: "4.0026 u",
                group: "18",
                period: "1",
                block: "s-block",
                electronic: "1s<sup>2</sup>",
                type: "Non-metal",
                specific: "Noble gas",
                physical: "Gas",
                description: "Helium is a chemical element with the symbol He and atomic number 2. It is a colorless, odorless, tasteless, non-toxic, inert, monatomic gas that heads the noble gas group in the periodic table.<br>हीलियम एक रासायनिक तत्व है जिसका प्रतीक He और परमाणु क्रमांक 2 है। यह एक रंगहीन, गंधहीन, स्वादहीन, गैर-विषाक्त, निष्क्रिय, मोनोएटोमिक गैस है जो आवर्त सारणी में उत्कृष्ट गैस समूह का प्रमुख है।"
            };
            break;
        case 'Li':
            data = {
                name: "Lithium",
                symbol: "Li",
                atomicNumber: 3,
                atomicMass: "6.94 u",
                group: "1",
                period: "2",
                block: "s-block",
                electronic: "1s<sup>2</sup>, 2s<sup>1</sup>",
                type: "Metal",
                specific: "Alkali metal",
                physical: "Solid",
                description: "Lithium is a chemical element with the symbol Li and atomic number 3. It is a soft, silvery-white alkali metal. Under standard conditions, it is the lightest metal and the lightest solid element.<br>लिथियम एक रासायनिक तत्व है जिसका प्रतीक ली और परमाणु संख्या 3 है। यह एक नरम, चांदी-सफेद क्षार धातु है। मानक परिस्थितियों में, यह सबसे हल्की धातु और सबसे हल्का ठोस तत्व है।"
            };
            break;
        // You can continue adding cases for other elements up to sulfur (S)
        // Example:
        case 'Be':
            data = {
                name: "Beryllium",
                symbol: "Be",
                atomicNumber: 4,
                atomicMass: "9.0122 u",
                group: "2",
                period: "2",
                block: "s-block",
                electronic: "1s<sup>2</sup>,  2s<sup>2</sup>",
                type: "Metal",
                specific: "Alkaline earth metal",
                physical: "Solid",
                description: "Beryllium is a chemical element with the symbol Be and atomic number 4. It is a relatively rare element in the universe, usually occurring as a product of the spallation of larger atomic nuclei.<br>बेरिलियम एक रासायनिक तत्व है जिसका प्रतीक Be और परमाणु संख्या 4 है। यह ब्रह्मांड में एक अपेक्षाकृत दुर्लभ तत्व है, जो आमतौर पर बड़े परमाणु नाभिक के फैलाव के उत्पाद के रूप में होता है।"
            };
            break;
        // Add more cases for other elements...
        // Example:
        case 'B':
            data = {
                name: "Boron",
                symbol: "B",
                atomicNumber: 5,
                atomicMass: "10.81 u",
                group: "13",
                period: "2",
                block: "p-block",
                electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>1</sup>",
                type: "Metalloid",
                specific: "Metalloid",
                physical: "Solid",
                description: "Boron is a chemical element with the symbol B and atomic number 5. It is a low-abundance element in the Solar System and in the Earth's crust.<br>बोरॉन एक रासायनिक तत्व है जिसका प्रतीक बी और परमाणु संख्या 5 है। यह सौर मंडल और पृथ्वी की पपड़ी में एक कम बहुतायत वाला तत्व है।"
            };
            break;
            case 'C':
              data = {
                  name: "Carbon",
                  symbol: "C",
                  atomicNumber: 6,
                  atomicMass: "12.011 u",
                  group: "14",
                  period: "2",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup> ,2p<sup>2</sup>",
                  type: "non-metal",
                  specific: "Reactive nonmetal",
                  physical: "Solid",
                  description: "Carbon is a chemical element with the symbol C and atomic number 6. It is nonmetallic and tetravalent—making four electrons available to form covalent chemical bonds.<br>कार्बन एक रासायनिक तत्व है जिसका प्रतीक C और परमाणु संख्या 6 है। यह अधात्विक और चतुष्संयोजक है - जो सहसंयोजक रासायनिक बंधन बनाने के लिए चार इलेक्ट्रॉन उपलब्ध कराता है।"
              };
              break;
          case 'N':
              data = {
                  name: "Nitrogen",
                  symbol: "N",
                  atomicNumber: 7,
                  atomicMass: "14.007 u",
                  group: "15",
                  period: "2",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>3</sup>",
                  type: "non-metal",
                  specific: "Reactive nonmetal",
                  physical: "Gas",
                  description: "Nitrogen is a chemical element with the symbol N and atomic number 7. It is a nonmetal and has an electronegativity of 3.04, making it a strong oxidizing agent."
              };
              break;
          case 'O':
              data = {
                  name: "Oxygen",
                  symbol: "O",
                  atomicNumber: 8,
                  atomicMass: "15.999 u",
                  group: "16",
                  period: "2",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>, 2s<sup>2</sup>, 2p<sup>4</sup>",
                  type: "non-metal",
                  specific: "Reactive nonmetal",
                  physical: "Gas",
                  description: "Oxygen is a chemical element with the symbol O and atomic number 8. It is a member of the chalcogen group in the periodic table, a highly reactive nonmetal, and an oxidizing agent that readily forms oxides with most elements as well as with other compounds.<br>ऑक्सीजन एक रासायनिक तत्व है जिसका प्रतीक O और परमाणु क्रमांक 8 है। यह आवर्त सारणी में चाकोजेन समूह का सदस्य है, एक अत्यधिक प्रतिक्रियाशील अधातु है, और एक ऑक्सीकरण एजेंट है जो अधिकांश तत्वों के साथ-साथ अन्य यौगिकों के साथ आसानी से ऑक्साइड बनाता है।"
              };
              break;
          // Continue adding cases for elements up to sulfur (S)...
          // Example:
          case 'F':
              data = {
                  name: "Fluorine",
                  symbol: "F",
                  atomicNumber: 9,
                  atomicMass: "18.998 u",
                  group: "17",
                  period: "2",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>5</sup>",
                  type: "Non-metal",
                  specific: "Reactive nonmetal",
                  physical: "Gas",
                  description: "Fluorine is a chemical element with the symbol F and atomic number 9. It is the lightest Non-metal and exists as a highly toxic pale yellow diatomic gas at standard conditions.<br>फ्लोरीन एक रासायनिक तत्व है जिसका प्रतीक F और परमाणु संख्या 9 है। यह सबसे हल्की गैर-धातु है और मानक स्थितियों में अत्यधिक जहरीली हल्के पीले रंग की द्विपरमाणुक गैस के रूप में मौजूद होती है।"
              };
              break;
          // Add more cases for elements...
          // Till you reach sulfur (S)
          case 'Ne':
              data = {
                  name: "Neon",
                  symbol: "Ne",
                  atomicNumber: 10,
                  atomicMass: "20.180 u",
                  group: "18",
                  period: "2",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>",
                  type: "Non-metal",
                  specific: "Noble gas",
                  physical: "Gas",
                  description: "Neon is a chemical element with the symbol Ne and atomic number 10. It is a noble gas. Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about two-thirds the density of air.<br>नियॉन एक रासायनिक तत्व है जिसका प्रतीक Ne और परमाणु संख्या 10 है। यह एक उत्कृष्ट गैस है। नियॉन मानक परिस्थितियों में एक रंगहीन, गंधहीन, अक्रिय मोनोएटोमिक गैस है, जिसका घनत्व हवा का लगभग दो-तिहाई है।"
              };
              break;
          // Add more cases for elements...
          // Till you reach sulfur (S)
          case 'Na':
              data = {
                  name: "Sodium",
                  symbol: "Na",
                  atomicNumber: 11,
                  atomicMass: "22.990 u",
                  group: "1",
                  period: "3",
                  block: "s-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>,2p<sup>6</sup>, 3s<sup>1</sup>",
                  type: "Metal",
                  specific: "Alkali metal",
                  physical: "Solid",
                  description: "Sodium is a chemical element with the symbol Na and atomic number 11. It is a soft, silvery-white, highly reactive metal. Sodium is an alkali metal, being in group 1 of the periodic table."
              };
              break;
          // Add more cases for elements...
          // Till you reach sulfur (S)
          case 'Mg':
              data = {
                  name: "Magnesium",
                  symbol: "Mg",
                  atomicNumber: 12,
                  atomicMass: "24.305 u",
                  group: "2",
                  period: "3",
                  block: "s-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>,2p<sup>6</sup>, 3s<sup>2</sup>",
                  type: "Metal",
                  specific: "Alkaline earth metal",
                  physical: "Solid",
                  description: "Magnesium is a chemical element with the symbol Mg and atomic number 12. It is a shiny gray solid which bears a close physical resemblance to the other five elements in the second column (group 2, or alkaline earth metals) of the periodic table: all group 2 elements have the same electron configuration in the outer electron shell and a similar crystal structure."
              };
              break;
          // Add more cases for elements...
          // Till you reach sulfur (S)
          case 'Al':
              data = {
                  name: "Aluminium",
                  symbol: "Al",
                  atomicNumber: 13,
                  atomicMass: "26.982 u",
                  group: "13",
                  period: "3",
                  block: "P-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>, 3p<sup>1</sup>",
                  type: "Metal",
                  specific: "Post-transition metal",
                  physical: "Solid",
                  description: "Aluminium is a chemical element with the symbol Al and atomic number 13. It is a silvery-white, soft, non-magnetic and ductile metal in the boron group."
              };
              break;
          // Add more cases for elements...
          // Till you reach sulfur (S)
          case 'Si':
              data = {
                  name: "Silicon",
                  symbol: "Si",
                  atomicNumber: 14,
                  atomicMass: "28.085 u",
                  group: "14",
                  period: "3",
                  block: "P-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>, 3p<sup>2</sup>",
                  type: "Metalloid",
                  specific: "Metalloid",
                  physical: "Solid",
                  description: "Silicon is a chemical element with the symbol Si and atomic number 14. It is a hard, brittle crystalline solid with a blue-grey metallic lustre, and is a tetravalent metalloid and semiconductor."
              };
              break;
          // Add more cases for elements...
          // Till you reach sulfur (S)
          case 'P':
              data = {
                  name: "Phosphorus",
                  symbol: "P",
                  atomicNumber: 15,
                  atomicMass: "30.974 u",
                  group: "15",
                  period: "3",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>, 3p<sup>3</sup>",
                  type: "non-metal",
                  specific: "Reactive nonmetal",
                  physical: "Solid",
                  description: "Phosphorus is a chemical element with the symbol P and atomic number 15. Elemental phosphorus exists in two major forms, white phosphorus and red phosphorus, but because it is highly reactive, phosphorus is never found as a free element on Earth."
              };
              break;
          case 'S':
              data = {
                  name: "Sulfur",
                  symbol: "S",
                  atomicNumber: 16,
                  atomicMass: "32.06 u",
                  group: "16",
                  period: "3",
                  block: "p-block",
                  electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>, 3p<sup>4</sup>",
                  type: "non-metal",
                  specific: "Reactive nonmetal",
                  physical: "Solid",
                  description: "Sulfur is a chemical element with the symbol S and atomic number 16. It is abundant, multivalent, and nonmetallic."
              };
              break;
              case 'Cl':
        data = {
            name: "Chlorine",
            symbol: "Cl",
            atomicNumber: 17,
            atomicMass: "35.45 u",
            group: "17",
            period: "3",
            block: "p-block",
            electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>, 3p<sup>5</sup>",
            type: "Non-metal",
            specific: "Reactive nonmetal",
            physical: "Gas",
            description: "Chlorine is a chemical element with the symbol Cl and atomic number 17. It is in the Non-metal group (17) and is the second lightest Non-metal following fluorine. The element is a yellow-green gas under standard conditions, where it forms diatomic molecules."
        };
        break;
    case 'Ar':
        data = {
            name: "Argon",
            symbol: "Ar",
            atomicNumber: 18,
            atomicMass: "39.948 u",
            group: "18",
            period: "3",
            block: "p-block",
            electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>, 3p<sup>6</sup>",
            type: "Non-metal",
            specific: "Noble Gases",
            physical: "Gas",
            description: "Argon is a chemical element with the symbol Ar and atomic number 18. It is in group 18 of the periodic table and is a noble gas. Argon is the third-most abundant gas in the Earth's atmosphere, at 0.934% (9340 ppmv)."
        };
        break;
    case 'K':
        data = {
            name: "Potassium",
            symbol: "K",
            atomicNumber: 19,
            atomicMass: "39.098 u",
            group: "1",
            period: "4",
            block: "s-block",
            electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>,3p<sup>6</sup>, 4s<sup>1</sup>",
            type: "Metal",
            specific: "Alkali metal",
            physical: "Solid",
            description: "Potassium is a chemical element with the symbol K and atomic number 19. It was first isolated from potash, the ashes of plants, from which its name derives."
        };
        break;
    // Continue adding cases for elements...
    // Till you reach 27
    case 'Ca':
        data = {
            name: "Calcium",
            symbol: "Ca",
            atomicNumber: 20,
            atomicMass: "40.078 u",
            group: "2",
            period: "4",
            block: "s-block",
            electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>,3p<sup>6</sup>, 4s<sup>2</sup>",
            type: "Metal",
            specific: "Alkaline earth metal",
            physical: "Solid",
            description: "Calcium is a chemical element with the symbol Ca and atomic number 20. As an alkaline earth metal, calcium is a reactive metal that forms a dark oxide-nitride layer when exposed to air. Its physical and chemical properties are most similar to its heavier homologues strontium and barium."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'Sc':
        data = {
            name: "Scandium",
            symbol: "Sc",
            atomicNumber: 21,
            atomicMass: "44.956 u",
            group: "3",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>,3p<sup>6</sup>, 3d<sup>1</sup> 4s<sup>2</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Scandium is a chemical element with the symbol Sc and atomic number 21. A silvery-white metallic d-block element, it has historically been sometimes classified as a rare-earth element, together with yttrium and the lanthanides."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'Ti':
        data = {
            name: "Titanium",
            symbol: "Ti",
            atomicNumber: 22,
            atomicMass: "47.867 u",
            group: "4",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup>,  2s<sup>2</sup>, 2p<sup>6</sup>, 3s<sup>2</sup>,3p<sup>6</sup>, 3d<sup>2</sup> 4s<sup>2</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Titanium is a chemical element with the symbol Ti and atomic number 22. It is a lustrous transition metal with a silver color, low density, and high strength. Titanium is resistant to corrosion in sea water, aqua regia, and chlorine."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'V':
        data = {
            name: "Vanadium",
            symbol: "V",
            atomicNumber: 23,
            atomicMass: "50.942 u",
            group: "5",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>2 </sup>3d<sup>3</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Vanadium is a chemical element with the symbol V and atomic number 23. It is a hard, silvery-grey, malleable transition metal. The elemental metal is rarely found in nature, but once isolated artificially, the formation of an oxide layer stabilizes the free metal somewhat against further oxidation."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'Cr':
        data = {
            name: "Chromium",
            symbol: "Cr",
            atomicNumber: 24,
            atomicMass: "51.996 u",
            group: "6",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>1</sup> 3d<sup>5</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Chromium is a chemical element with the symbol Cr and atomic number 24. It is the first element in group 6. It is a steely-grey, lustrous, hard and brittle transition metal."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'Mn':
        data = {
            name: "Manganese",
            symbol: "Mn",
            atomicNumber: 25,
            atomicMass: "54.938 u",
            group: "7",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>2 </sup>3d<sup>5</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Manganese is a chemical element with the symbol Mn and atomic number 25. It is not found as a free element in nature; it is often found in minerals in combination with iron. Manganese is a transition metal with important industrial alloy uses, particularly in stainless steels."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'Fe':
        data = {
            name: "Iron",
            symbol: "Fe",
            atomicNumber: 26,
            atomicMass: "55.845 u",
            group: "8",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>2 </sup>3d<sup>6</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Iron is a chemical element with the symbol Fe and atomic number 26. It is a metal that belongs to the first transition series and group 8 of the periodic table. It is, by mass, the most common element on Earth, forming much of Earth's outer and inner core."
        };
        break;
    // Add more cases for elements...
    // Till you reach 27
    case 'Co':
        data = {
            name: "Cobalt",
            symbol: "Co",
            atomicNumber: 27,
            atomicMass: "58.933 u",
            group: "9",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>2</sup> 3d<sup>7</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Cobalt is a chemical element with the symbol Co and atomic number 27. Like nickel, cobalt is found in the Earth's crust only in chemically combined form, save for small deposits found in alloys of natural meteoric iron."
        };
        break;case 'Ni':
        data = {
            name: "Nickel",
            symbol: "Ni",
            atomicNumber: 28,
            atomicMass: "58.693 u",
            group: "10",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>2</sup> 3d<sup>8</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Nickel is a chemical element with the symbol Ni and atomic number 28. It is a silvery-white lustrous metal with a slight golden tinge. Nickel belongs to the transition metals and is hard and ductile."
        };
        break;
    case 'Cu':
        data = {
            name: "Copper",
            symbol: "Cu",
            atomicNumber: 29,
            atomicMass: "63.546 u",
            group: "11",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>1 </sup>3d<sup>10</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Copper is a chemical element with the symbol Cu and atomic number 29. It is a soft, malleable, and ductile metal with very high thermal and electrical conductivity. A freshly exposed surface of pure copper has a pinkish-orange color."
        };
        break;
    case 'Zn':
        data = {
            name: "Zinc",
            symbol: "Zn",
            atomicNumber: 30,
            atomicMass: "65.38 u",
            group: "12",
            period: "4",
            block: "d-block",
            electronic: "1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>6</sup> 4s<sup>2</sup> 3d<sup>10</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Zinc is a chemical element with the symbol Zn and atomic number 30. It is the first element in group 12 of the periodic table. In some respects, zinc is chemically similar to magnesium: both elements exhibit only one normal oxidation state (+2), and the Zn<sup>2+</sup> and Mg<sup>2+</sup> ions are of similar size."
        };
        break;
    // Continue adding cases for elements...
    // Till you reach 38
    case 'Ga':
        data = {
            name: "Gallium",
            symbol: "Ga",
            atomicNumber: 31,
            atomicMass: "69.723 u",
            group: "13",
            period: "4",
            block: "p-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>1</sup>",
            type: "Metal",
            specific: "Post-transition metal",
            physical: "Solid",
            description: "Gallium is a chemical element with the symbol Ga and atomic number 31. Elemental gallium is a soft, silvery metal at standard temperature and pressure; however in its liquid state it becomes silvery white."
        };
        break;
    // Add more cases for elements...
    // Till you reach 38
    case 'Ge':
        data = {
            name: "Germanium",
            symbol: "Ge",
            atomicNumber: 32,
            atomicMass: "72.63 u",
            group: "14",
            period: "4",
            block: "p-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>2</sup>",
            type: "Metalloid",
            specific: "Metalloid",
            physical: "Solid",
            description: "Germanium is a chemical element with the symbol Ge and atomic number 32. It is a lustrous, hard-brittle, grayish-white metalloid in the carbon group, chemically similar to its group neighbors silicon and tin."
        };
        break;
    // Add more cases for elements...
    // Till you reach 38
    case 'As':
        data = {
            name: "Arsenic",
            symbol: "As",
            atomicNumber: 33,
            atomicMass: "74.922 u",
            group: "15",
            period: "4",
            block: "p-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>3</sup>",
            type: "Metalloid",
            specific: "Metalloid",
            physical: "Solid",
            description: "Arsenic is a chemical element with the symbol As and atomic number 33. Arsenic occurs in many minerals, usually in combination with sulfur and metals, but also as a pure elemental crystal. Arsenic is a metalloid."
        };
        break;
    // Add more cases for elements...
    // Till you reach 38
    case 'Se':
        data = {
            name: "Selenium",
            symbol: "Se",
            atomicNumber: 34,
            atomicMass: "78.971 u",
            group: "16",
            period: "4",
            block: "p-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>4</sup>",
            type: "Non-metal",
            specific: "Reactive nonmetal",
            physical: "Solid",
            description: "Selenium is a chemical element with the symbol Se and atomic number 34. It is a nonmetal with properties that are intermediate between the elements above and below in the periodic table, sulfur and tellurium, and also has similarities to arsenic. It rarely occurs in its elemental state or as pure ore compounds in the Earth's crust."
        };
        break;
    // Add more cases for elements...
    // Till you reach 38
    case 'Br':
        data = {
            name: "Bromine",
            symbol: "Br",
            atomicNumber: 35,
            atomicMass: "79.904 u",
            group: "17",
            period: "4",
            block: "p-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>5</sup>",
            type: "Non-metal",
            specific: "Reactive nonmetal",
            physical: "Liquid",
            description: "Bromine is a chemical element with the symbol Br and atomic number 35. It is the third-lightest Non-metal, and is a fuming red-brown liquid at room temperature that evaporates readily to form a similarly coloured gas. Its properties are thus intermediate between those of chlorine and iodine."
        };
        break;
        case 'Kr':
        data = {
            name: "Krypton",
            symbol: "Kr",
            atomicNumber: 36,
            atomicMass: "83.798 u",
            group: "18",
            period: "4",
            block: "p-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>",
            type: "Non-metal",
            specific: "Noble Gases",
            physical: "Gas",
            description: "Krypton is a chemical element with the symbol Kr and atomic number 36. It is a member of group 18 (noble gases) elements. A colorless, odorless, tasteless noble gas, krypton occurs in trace amounts in the atmosphere and is often used with other rare gases in fluorescent lamps."
        };
        break;
    case 'Rb':
        data = {
            name: "Rubidium",
            symbol: "Rb",
            atomicNumber: 37,
            atomicMass: "85.468 u",
            group: "1",
            period: "5",
            block: "s-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>1</sup>",
            type: "Metal",
            specific: "Alkali metal",
            physical: "Solid",
            description: "Rubidium is a chemical element with the symbol Rb and atomic number 37. Rubidium is a soft, silvery-white metallic element of the alkali metal group, with a standard atomic weight of 85.4678. Elemental rubidium is highly reactive, with properties similar to those of other alkali metals, such as very rapid oxidation in air."
        };
        break;
    case 'Sr':
        data = {
            name: "Strontium",
            symbol: "Sr",
            atomicNumber: 38,
            atomicMass: "87.62 u",
            group: "2",
            period: "5",
            block: "s-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>",
            type: "Metal",
            specific: "Alkaline earth metal",
            physical: "Solid",
            description: "Strontium is a chemical element with the symbol Sr and atomic number 38. An alkaline earth metal, strontium is a soft silver-white yellowish metallic element that is highly chemically reactive. The metal forms a dark oxide layer when it is exposed to air."
        };
        break;
    // Continue adding cases for elements...
    // Till you reach 47
    case 'Y':
        data = {
            name: "Yttrium",
            symbol: "Y",
            atomicNumber: 39,
            atomicMass: "88.906 u",
            group: "3",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>1</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Yttrium is a chemical element with the symbol Y and atomic number 39. It is a silvery-metallic transition metal chemically similar to the lanthanides and has often been classified as a &quot;rare-earth element&quot;. Yttrium is almost always found in combination with lanthanide elements in rare-earth minerals, and is never found in nature as a free element."
        };
        break;
    
    case 'Zr':
        data = {
            name: "Zirconium",
            symbol: "Zr",
            atomicNumber: 40,
            atomicMass: "91.224 u",
            group: "4",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>2</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Zirconium is a chemical element with the symbol Zr and atomic number 40. It is a lustrous, grey-white, strong transition metal that closely resembles hafnium and, to a lesser extent, titanium."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Nb':
        data = {
            name: "Niobium",
            symbol: "Nb",
            atomicNumber: 41,
            atomicMass: "92.906 u",
            group: "5",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>3</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Niobium, formerly known as columbium, is a chemical element with the symbol Nb and atomic number 41. Niobium is a light grey, crystalline, and ductile transition metal. Pure niobium has a hardness similar to that of pure titanium, and it has similar ductility to iron."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Mo':
        data = {
            name: "Molybdenum",
            symbol: "Mo",
            atomicNumber: 42,
            atomicMass: "95.95 u",
            group: "6",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>1</sup>4d<sup>5</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Molybdenum is a chemical element with the symbol Mo and atomic number 42. It has the sixth-highest melting point of any element, and for this reason, it is often used in high-strength steel alloys."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Tc':
        data = {
            name: "Technetium",
            symbol: "Tc",
            atomicNumber: 43,
            atomicMass: "(98) u",
            group: "7",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>5</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Technetium is a chemical element with the symbol Tc and atomic number 43. It is the lightest element whose isotopes are all radioactive. Nearly all technetium is produced synthetically, and only minute amounts are found in the Earth's crust."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Ru':
        data = {
            name: "Ruthenium",
            symbol: "Ru",
            atomicNumber: 44,
            atomicMass: "101.07 u",
            group: "8",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>6</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Ruthenium is a chemical element with the symbol Ru and atomic number 44. It is a rare transition metal belonging to the platinum group of the periodic table. Like the other metals of the platinum group, ruthenium is inert to most other chemicals."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Rh':
        data = {
            name: "Rhodium",
            symbol: "Rh",
            atomicNumber: 45,
            atomicMass: "102.91 u",
            group: "9",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>7</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Rhodium is a chemical element with the symbol Rh and atomic number 45. It is a rare, silvery-white, hard, corrosion-resistant, and chemically inert transition metal. It is a noble metal and a member of the platinum group."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Pd':
        data = {
            name: "Palladium",
            symbol: "Pd",
            atomicNumber: 46,
            atomicMass: "106.42 u",
            group: "10",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>8</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Palladium is a chemical element with the symbol Pd and atomic number 46. It is a rare and lustrous silvery-white metal discovered in 1803 by the English chemist William Hyde Wollaston. He named it after the asteroid Pallas, which was itself named after the epithet of the Greek goddess Athena, acquired by her when she slew Pallas."
        };
        break;
    // Add more cases for elements...
    // Till you reach 47
    case 'Ag':
        data = {
            name: "Silver",
            symbol: "Ag",
            atomicNumber: 47,
            atomicMass: "107.87 u",
            group: "11",
            period: "5",
            block: "d-block",
            electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>1</sup>4d<sup>10</sup>",
            type: "Metal",
            specific: "Transition metal",
            physical: "Solid",
            description: "Silver is a chemical element with the symbol Ag and atomic number 47. A soft, white, lustrous transition metal, it exhibits the highest electrical conductivity, thermal conductivity, and reflectivity of any metal."
        };
        break;
        
        case 'Cd':
          data = {
              name: "Cadmium",
              symbol: "Cd",
              atomicNumber: 48,
              atomicMass: "112.41 u",
              group: "12",
              period: "5",
              block: "d-block",
              electronic: "1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>5s<sup>2</sup>4d<sup>10</sup>",
              type: "Metal",
              specific: "Transition metal",
              physical: "Solid",
              description: "Cadmium is a chemical element with the symbol Cd and atomic number 48. This soft, silvery-white metal is chemically similar to the two other stable metals in group 12, zinc and mercury. Like zinc, it demonstrates oxidation state +2 in most of its compounds, and like mercury, it has a lower melting point than the transition metals in groups 3 through 11."
          };
          break;


          
      case 'In':
          data = {
              name: "Indium",
              symbol: "In",
              atomicNumber: 49,
              atomicMass: "114.82 u",
              group: "13",
              period: "5",
              block: "p-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p¹",
              type: "Metal",
              specific: "Post-transition metal",
              physical: "Solid",
              description: "Indium is a chemical element with the symbol In and atomic number 49. Indium is the softest metal that is not an alkali metal. It is a silvery-white metal that resembles tin in appearance. It is a post-transition metal that makes up 0.21 parts per million of the Earth's crust."
          };
          break;
      case 'Sn':
          data = {
              name: "Tin",
              symbol: "Sn",
              atomicNumber: 50,
              atomicMass: "118.71 u",
              group: "14",
              period: "5",
              block: "p-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p²",
              type: "Metal",
              specific: "Post-transition metal",
              physical: "Solid",
              description: "Tin is a chemical element with the symbol Sn and atomic number 50. Tin is a silvery-white metal that is malleable, ductile, and highly crystalline. The largest applications of tin are in tinplate, solder alloys, and lead-free solders."
          };
          break;
      // Continue adding cases for elements...
      // Till you reach 70
      case 'Sb':
          data = {
              name: "Antimony",
              symbol: "Sb",
              atomicNumber: 51,
              atomicMass: "121.76 u",
              group: "15",
              period: "5",
              block: "p-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p³",
              type: "Metalloid",
              specific: "Metalloid",
              physical: "Solid",
              description: "Antimony is a chemical element with the symbol Sb and atomic number 51. It is a lustrous gray metalloid, found in nature mainly as the sulfide mineral stibnite. Antimony compounds have been known since ancient times and were powdered for use as medicine and cosmetics, often known by the Arabic name, kohl."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Te':
          data = {
              name: "Tellurium",
              symbol: "Te",
              atomicNumber: 52,
              atomicMass: "127.6 u",
              group: "16",
              period: "5",
              block: "p-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁴",
              type: "Metalloid",
              specific: "Metalloid",
              physical: "Solid",
              description: "Tellurium is a chemical element with the symbol Te and atomic number 52. It is a brittle, mildly toxic, rare, silver-white metalloid. Tellurium is chemically related to selenium and sulfur, all three of which are chalcogens."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'I':
          data = {
              name: "Iodine",
              symbol: "I",
              atomicNumber: 53,
              atomicMass: "126.9 u",
              group: "17",
              period: "5",
              block: "p-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁵",
              type: "Non-metal",
              specific: "Reactive nonmetal",
              physical: "Solid",
              description: "Iodine is a chemical element with the symbol I and atomic number 53. It is the heaviest of the stable Non-metals, and the 47th heaviest of 118 known elements. The element is the seventh most abundant Non-metal, being the sixty-first most abundant element overall."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Xe':
          data = {
              name: "Xenon",
              symbol: "Xe",
              atomicNumber: 54,
              atomicMass: "131.29 u",
              group: "18",
              period: "5",
              block: "p-block",
              electronic: " 1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶",
              type: "Non-metal",
              specific: "Noble Gases",
              physical: "Gas",
              description: "Xenon is a chemical element with the symbol Xe and atomic number 54. It is a colorless, dense, odorless noble gas found in Earth's atmosphere in trace amounts. Although generally unreactive, xenon can undergo a few chemical reactions such as the formation of xenon hexafluoroplatinate, the first noble gas compound to be synthesized."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Cs':
          data = {
              name: "Cesium",
              symbol: "Cs",
              atomicNumber: 55,
              atomicMass: "132.91 u",
              group: "1",
              period: "6",
              block: "s-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 6s¹",
              type: "Metal",
              specific: "Alkali metal",
              physical: "Solid",
              description: "Cesium is a chemical element with the symbol Cs and atomic number 55. It is a soft, silvery-golden alkali metal with a melting point of 28.5 °C, which makes it one of only five elemental metals that are liquid at or near room temperature."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Ba':
          data = {
              name: "Barium",
              symbol: "Ba",
              atomicNumber: 56,
              atomicMass: "137.33 u",
              group: "2",
              period: "6",
              block: "s-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 6s²",
              type: "Metal",
              specific: "Alkaline earth metal",
              physical: "Solid",
              description: "Barium is a chemical element with the symbol Ba and atomic number 56. It is the fifth element in group 2 and is a soft, silvery alkaline earth metal. Because of its high chemical reactivity, barium is never found in nature as a free element."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'La':
          data = {
              name: "Lanthanum",
              symbol: "La",
              atomicNumber: 57,
              atomicMass: "138.91 u",
              group: "Lanthanoids",
              period: "6",
              block: "f-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁰ 5d¹ 6s²",
               type: "Metal",
              specific: "Lanthanide",
              physical: "Solid",
              description: "Lanthanum is a chemical element with the symbol La and atomic number 57. It is a soft, ductile, silvery-white metal that tarnishes slowly when exposed to air and is soft enough to be cut with a knife. It is the eponym of the lanthanide series, a group of 15 similar elements between lanthanum and lutetium in the periodic table, of which lanthanum is the first and the prototype."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Ce':
    data = {
        name: "Cerium",
        symbol: "Ce",
        atomicNumber: 58,
        atomicMass: "140.12 u",
        group: "Lanthanoids",
        period: "6",
        block: "f-block",
        electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹ 5d¹ 6s²",
         type: "Metal",
        specific: "Lanthanide",
        physical: "Solid",
        description: "Cerium is a chemical element with the symbol Ce and atomic number 58. It is a soft, ductile, silvery-white metal that tarnishes when exposed to air, and it is soft enough to be cut with a knife. Cerium is the second element in the lanthanide series."
    };
    break;
case 'Pr':
    data = {
        name: "Praseodymium",
        symbol: "Pr",
        atomicNumber: 59,
        atomicMass: "140.91 u",
        group: "Lanthanoids",
        period: "6",
        block: "f-block",
        electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f³ 5d¹ 6s²",
         type: "Metal",
        specific: "Lanthanide",
        physical: "Solid",
        description: "Praseodymium is a chemical element with the symbol Pr and atomic number 59. It is a soft, silvery, malleable and ductile metal in the lanthanide group. Praseodymium is a member of the lanthanide series and is usually found in the oxidation state +3."
    };
    break;
case 'Nd':
    data = {
        name: "Neodymium",
        symbol: "Nd",
        atomicNumber: 60,
        atomicMass: "144.24 u",
        group: "Lanthanoids",
        period: "6",
        block: "f-block",
        electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁴ 5d¹ 6s²",
         type: "Metal",
        specific: "Lanthanide",
        physical: "Solid",
        description: "Neodymium is a chemical element with the symbol Nd and atomic number 60. It is a soft silvery metal that tarnishes in air. Neodymium was discovered in 1885 by the Austrian chemist Carl Auer von Welsbach."
    };
    break;

      // Add more cases for elements...
      // Till you reach 70
      case 'Pm':
          data = {
              name: "Promethium",
              symbol: "Pm",
              atomicNumber: 61,
              atomicMass: "(145) u",
              group: "Lanthanoids",
              period: "6",
              block: "f-block",
              electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁵ 6s²",
               type: "Metal",
              specific: "Lanthanide",
              physical: "Solid",
              description: "Promethium is a chemical element with the symbol Pm and atomic number 61. All of its isotopes are radioactive; it is one of only two such elements that are followed in the periodic table by elements with stable forms, a distinction shared with technetium. Chemically, promethium is a lanthanide."
          };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Sm':
          data ={
            name: "Samarium",
            symbol: "Sm",
            atomicNumber: 62,
            atomicMass: "150.36 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁶ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Samarium is a chemical element with the symbol Sm and atomic number 62. It is a moderately hard silvery metal that readily oxidizes in air. Being a typical member of the lanthanide series, samarium usually assumes the oxidation state +3."
        };
          break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Eu':
        data = {
            name: "Europium",
            symbol: "Eu",
            atomicNumber: 63,
            atomicMass: "151.96 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁷ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Europium is a chemical element with the symbol Eu and atomic number 63. It is a moderately hard, silvery metal which readily oxidizes in air and water. Europium is a member of the lanthanide series, and is used in the manufacture of fluorescent glass."
        };
        break;
    case 'Gd':
        data = {
            name: "Gadolinium",
            symbol: "Gd",
            atomicNumber: 64,
            atomicMass: "157.25 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁷ 5d¹ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Gadolinium is a chemical element with the symbol Gd and atomic number 64. It is a silvery-white, malleable, and ductile rare-earth metal. It is found in nature only in oxidized form, and even when separated, it usually has impurities of the other rare earths."
        };
        break;
      // Add more cases for elements...
      // Till you reach 70
      case 'Tb':
        data = {
            name: "Terbium",
            symbol: "Tb",
            atomicNumber: 65,
            atomicMass: "158.93 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f⁹ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Terbium is a chemical element with the symbol Tb and atomic number 65. It is a silvery-white, rare earth metal that is malleable, ductile, and soft enough to be cut with a knife. Terbium is used to dope calcium fluoride, calcium tungstate, and strontium molybdate, materials that are used in solid-state devices."
        };
        break;
    case 'Dy':
        data = {
            name: "Dysprosium",
            symbol: "Dy",
            atomicNumber: 66,
            atomicMass: "162.50 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁰ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Dysprosium is a chemical element with the symbol Dy and atomic number 66. It is a rare-earth element with a metallic silver luster. Dysprosium is never found in nature as a free element, though it is found in various minerals, such as xenotime."
        };
        break;
    case 'Ho':
        data = {
            name: "Holmium",
            symbol: "Ho",
            atomicNumber: 67,
            atomicMass: "164.93 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹¹ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Holmium is a chemical element with the symbol Ho and atomic number 67. It is a relatively soft and malleable silvery-white metal. Holmium is a part of the lanthanide series and is traditionally considered one of the rare-earth metals."
        };
        break;
    case 'Er':
        data = {
            name: "Erbium",
            symbol: "Er",
            atomicNumber: 68,
            atomicMass: "167.26 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹² 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Erbium is a chemical element with the symbol Er and atomic number 68. It is a silvery-white, soft, malleable, and ductile metal in the lanthanide series. Erbium is used in nuclear reactors as a neutron absorber and in optical amplifiers in fiber-optic communication networks."
        };
        break;
    case 'Tm':
        data = {
            name: "Thulium",
            symbol: "Tm",
            atomicNumber: 69,
            atomicMass: "168.93 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹³ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Thulium is a chemical element with the symbol Tm and atomic number 69. It is a silvery-gray, lustrous, malleable, and ductile metal in the lanthanide series. Thulium is the second-least abundant of the lanthanides after promethium, which is only found in trace quantities on Earth."
        };
        break;
    case 'Yb':
        data = {
            name: "Ytterbium",
            symbol: "Yb",
            atomicNumber: 70,
            atomicMass: "173.05 u",
            group: "Lanthanoids",
            period: "6",
            block: "f-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 6s²",
             type: "Metal",
            specific: "Lanthanide",
            physical: "Solid",
            description: "Ytterbium is a chemical element with the symbol Yb and atomic number 70. It is the fourteenth and penultimate element in the lanthanide series, which is the basis of the relative stability of its +2 oxidation state. However, like the other lanthanides, its most common oxidation state is +3, seen in its oxide, halides, and other compounds."
        };
        break;


        case 'Lu':
        data = {
            name: "Lutetium",
            symbol: "Lu",
            atomicNumber: 71,
            atomicMass: "174.97 u",
            group: "Lanthanoids",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Lutetium is a chemical element with the symbol Lu and atomic number 71. It is a silvery-white metal that is relatively stable in air. Lutetium is the last element in the lanthanide series, and it is traditionally counted among the rare earths. It is sometimes considered the first element of the 6th-period transition metals."
        };
        break;
    case 'Hf':
        data = {
            name: "Hafnium",
            symbol: "Hf",
            atomicNumber: 72,
            atomicMass: "178.49 u",
            group: "4",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d² 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Hafnium is a chemical element with the symbol Hf and atomic number 72. A lustrous, silvery gray, tetravalent transition metal, hafnium chemically resembles zirconium and is found in many zirconium minerals. Hafnium is used in filaments and electrodes, as a getter for oxygen and nitrogen, and as a component of high-temperature alloys."
        };
        break;
    case 'Ta':
        data = {
            name: "Tantalum",
            symbol: "Ta",
            atomicNumber: 73,
            atomicMass: "180.95 u",
            group: "5",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d³ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Tantalum is a chemical element with the symbol Ta and atomic number 73. Previously known as tantalium, it is named after Tantalus, a villain from Greek mythology. Tantalum is a rare, hard, blue-gray, lustrous transition metal that is highly corrosion-resistant. It is part of the refractory metals group, which are widely used as minor components in alloys. The chemical inertness of tantalum makes it a valuable substance for laboratory equipment and a substitute for platinum."
        };
        break;
    case 'W':
        data = {
            name: "Tungsten",
            symbol: "W",
            atomicNumber: 74,
            atomicMass: "183.84 u",
            group: "6",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d⁴ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Tungsten, or wolfram, is a chemical element with the symbol W and atomic number 74. The name tungsten comes from the former Swedish name for the tungstate mineral scheelite, tung sten or &quot;heavy stone&quot;. Tungsten is a rare metal found naturally on Earth almost exclusively combined with other elements in chemical compounds rather than alone. It was identified as a new element in 1781 and first isolated as a metal in 1783."
        };
        break;
    case 'Re':
        data = {
            name: "Rhenium",
            symbol: "Re",
            atomicNumber: 75,
            atomicMass: "186.21 u",
            group: "7",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d⁵ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Rhenium is a chemical element with the symbol Re and atomic number 75. It is a silvery-gray, heavy, third-row transition metal in group 7 of the periodic table. With an estimated average concentration of 1 part per billion (ppb), rhenium is one of the rarest elements in the Earth's crust. Rhenium has the third-highest melting point and highest boiling point of any stable element at 5903 K."
        };
        break;
    case 'Os':
        data = {
            name: "Osmium",
            symbol: "Os",
            atomicNumber: 76,
            atomicMass: "190.23 u",
            group: "8",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d⁶ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Osmium is a chemical element with the symbol Os and atomic number 76. It is a hard, brittle, bluish-white transition metal in the platinum group that is found as a trace element in alloys, mostly in platinum ores. Osmium is the densest naturally occurring element, with an experimentally measured (using x-ray crystallography) density of 22.59 g/cm³. It is also the heaviest naturally occurring element."
        };
        break;
    case 'Ir':
        data = {
            name: "Iridium",
            symbol: "Ir",
            atomicNumber: 77,
            atomicMass: "192.22 u",
            group: "9",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d⁷ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Iridium is a chemical element with the symbol Ir and atomic number 77. A very hard, brittle, silvery-white transition metal of the platinum group, iridium is considered to be the second-densest metal (after osmium) with a density of 22.56 g/cm³ as defined by experimental X-ray crystallography."
        };
        break;
    case 'Pt':
        data = {
            name: "Platinum",
            symbol: "Pt",
            atomicNumber: 78,
            atomicMass: "195.08 u",
            group: "10",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d⁹ 6s¹",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Platinum is a chemical element with the symbol Pt and atomic number 78. It is a dense, malleable, ductile, highly unreactive, precious, silverish-white transition metal. Its name is derived from the Spanish term platino, meaning 'little silver'."
        };
        break;
    case 'Au':
        data = {
            name: "Gold",
            symbol: "Au",
            atomicNumber: 79,
            atomicMass: "196.97 u",
            group: "11",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s¹",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Solid",
            description: "Gold is a chemical element with the symbol Au and atomic number 79. It is a bright, slightly reddish yellow, dense, soft, malleable, and ductile metal in group 11 of the periodic table. Economically, gold is valuable due to its rarity in nature and its use in jewelry and electronics."
        };
        break;
    case 'Hg':
        data = {
            name: "Mercury",
            symbol: "Hg",
            atomicNumber: 80,
            atomicMass: "200.59 u",
            group: "12",
            period: "6",
            block: "d-block",
            electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s²",
            type: "Metal",
            specific: "Transition Metal",
            physical: "Liquid",
            description: "Mercury is a chemical element with the symbol Hg and atomic number 80. It is commonly known as quicksilver and was formerly named hydrargyrum. Mercury is a heavy, silvery-white liquid metal. It is the only metallic element that is liquid at standard conditions for temperature and pressure. Mercury occurs in deposits throughout the world mostly as cinnabar (mercuric sulfide)."
        };
        break;
        
            case 'Tl':
                data = {
                    name: "Thallium",
                    symbol: "Tl",
                    atomicNumber: 81,
                    atomicMass: "204.38 u",
                    group: "13",
                    period: "6",
                    block: "p-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p¹",
                    type: "Metal",
                    specific: "Post-Transition Metal",
                    physical: "Solid",
                    description: "Thallium is a chemical element with the symbol Tl and atomic number 81. It is a gray post-transition metal that is not found free in nature. When isolated, thallium resembles tin, but discolors when exposed to air."
                };
                break;

            case 'Pb':
                data = {
                    name: "Lead",
                    symbol: "Pb",
                    atomicNumber: 82,
                    atomicMass: "207.2 u",
                    group: "14",
                    period: "6",
                    block: "p-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p²",
                    type: "Metal",
                    specific: "Post-Transition Metal",
                    physical: "Solid",
                    description: "Lead is a chemical element with the symbol Pb and atomic number 82. It is a heavy metal that is denser than most common materials. Lead is soft and malleable, and also has a relatively low melting point. When freshly cut, lead is silvery with a hint of blue; it tarnishes to a dull gray color when exposed to air."
                };
                break;
            case 'Bi':
                data = {
                    name: "Bismuth",
                    symbol: "Bi",
                    atomicNumber: 83,
                    atomicMass: "208.98 u",
                    group: "15",
                    period: "6",
                    block: "p-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p³",
                    type: "Metal",
                    specific: "Post-Transition Metal",
                    physical: "Solid",
                    description: "Bismuth is a chemical element with the symbol Bi and atomic number 83. It is a pentavalent post-transition metal and one of the pnictogens with chemical properties resembling its lighter homologs arsenic and antimony."
                };
                break;
            case 'Po':
                data = {
                    name: "Polonium",
                    symbol: "Po",
                    atomicNumber: 84,
                    atomicMass: "209 u",
                    group: "16",
                    period: "6",
                    block: "p-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
                    type: "Metal",
                    specific: "Post-Transition Metal",
                    physical: "Solid",
                    description: "Polonium is a chemical element with the symbol Po and atomic number 84. A rare and highly radioactive metal with no stable isotopes, polonium is chemically similar to selenium and tellurium, though its metallic character resembles that of its horizontal neighbors in the periodic table: thallium, lead, and bismuth."
                };
                break;
            case 'At':
                data = {
                    name: "Astatine",
                    symbol: "At",
                    atomicNumber: 85,
                    atomicMass: "210 u",
                    group: "17",
                    period: "6",
                    block: "p-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
                    type: "Non-metal",
                    specific: "Metalloid",
                    physical: "Solid",
                    description: "Astatine is a chemical element with the symbol At and atomic number 85. It is the rarest naturally occurring element in the Earth's crust, occurring only as the decay product of various heavier elements. All of its isotopes are short-lived; the most stable isotope, astatine-210, has a half-life of only 8.1 hours."
                };
                break;
            case 'Rn':
                data = {
                    name: "Radon",
                    symbol: "Rn",
                    atomicNumber: 86,
                    atomicMass: "222 u",
                    group: "18",
                    period: "6",
                    block: "p-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
                    type: "Non-metal",
                    specific: "Noble Gas",
                    physical: "Gas",
                    description: "Radon is a chemical element with the symbol Rn and atomic number 86. It is a radioactive, colorless, odorless, tasteless noble gas. It occurs naturally in minute quantities as an intermediate step in the normal radioactive decay chains through which thorium and uranium slowly decay into lead and various other short-lived radioactive elements."
                };
                break;
            case 'Fr':
                data = {
                    name: "Francium",
                    symbol: "Fr",
                    atomicNumber: 87,
                    atomicMass: "223 u",
                    group: "1",
                    period: "7",
                    block: "s-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 7s¹",
                    type: "Metal",
                    specific: "Alkali Metal",
                    physical: "Solid",
                    description: "Francium is a chemical element with the symbol Fr and atomic number 87. It is extremely radioactive; its most stable isotope, francium-223, has a half-life of only 22 minutes. It is the second-least electronegative element, behind only caesium, and is the second rarest naturally occurring element (after astatine)."
                };
                break;
            case 'Ra':
                data = {
                    name: "Radium",
                    symbol: "Ra",
                    atomicNumber: 88,
                    atomicMass: "226 u",
                    group: "2",
                    period: "7",
                    block: "s-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 7s²",
                    type: "Metal",
                    specific: "Alkaline Earth Metal",
                    physical: "Solid",
                    description: "Radium is a chemical element with the symbol Ra and atomic number 88. It is the sixth element in group 2 of the periodic table, also known as the alkaline earth metals. Radium is an almost pure-white alkaline earth metal, but it readily oxidizes on exposure to air, becoming black in color."
                };
                break;
            case 'Ac':
                data = {
                    name: "Actinium",
                    symbol: "Ac",
                    atomicNumber: 89,
                    atomicMass: "227 u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁷ 6d¹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Actinium is a chemical element with the symbol Ac and atomic number 89. It was discovered in 1899 by Friedrich Oskar Giesel. It is a very rare radioactive metal and is chemically similar to the rare earth metals. Its principal isotope, 227Ac, has a half-life of about 21.772 years."
                };
                break;
            case 'Th':
                data = {
                    name: "Thorium",
                    symbol: "Th",
                    atomicNumber: 90,
                    atomicMass: "232.04 u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁰ 6d² 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Thorium is a weakly radioactive metallic chemical element with the symbol Th and atomic number 90. Thorium is silvery and tarnishes black when it is exposed to air, forming thorium dioxide; it is moderately hard, malleable, and has a high melting point."
                };
                break;
            case 'Pa':
                data = {
                    name: "Protactinium",
                    symbol: "Pa",
                    atomicNumber: 91,
                    atomicMass: "231.04 u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f² 6d¹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Protactinium is a chemical element with the symbol Pa and atomic number 91. It is a dense, silvery-gray actinide metal which readily reacts with oxygen, water vapor, and inorganic acids. It forms various chemical compounds in which protactinium is usually present in the oxidation state +5, but it can also assume +4 and even +3 or +2 states."
                };
                break;
            case 'U':
                data = {
                    name: "Uranium",
                    symbol: "U",
                    atomicNumber: 92,
                    atomicMass: "238.03 u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f³ 6d¹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Uranium is a chemical element with the symbol U and atomic number 92. It is a silvery-grey metal in the actinide series of the periodic table. A uranium atom has 92 protons and 92 electrons, of which 6 are valence electrons. Uranium is weakly radioactive because all isotopes of uranium are unstable; the half-lives of its naturally occurring isotopes range between 159,200 years and 4.5 billion years."
                };
                break;
            case 'Np':
                data = {
                    name: "Neptunium",
                    symbol: "Np",
                    atomicNumber: 93,
                    atomicMass: "(237) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁴ 6d¹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Neptunium is a chemical element with the symbol Np and atomic number 93. A radioactive actinide metal, neptunium is the first transuranic element. Its position in the periodic table just after uranium, named after the planet Uranus, led to it being named after Neptune, the next planet beyond Uranus."
                };
                break;
            case 'Pu':
                data = {
                    name: "Plutonium",
                    symbol: "Pu",
                    atomicNumber: 94,
                    atomicMass: "(244) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁶ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Plutonium is a radioactive chemical element with the symbol Pu and atomic number 94. It is an actinide metal of silvery-gray appearance that tarnishes when exposed to air, and forms a dull coating when oxidized. The element normally exhibits six allotropes and four oxidation states. It reacts with carbon, Non-metals, nitrogen, silicon, and hydrogen."
                };
                break;
            case 'Am':
                data = {
                    name: "Americium",
                    symbol: "Am",
                    atomicNumber: 95,
                    atomicMass: "(243) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁷ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Americium is a synthetic chemical element with the symbol Am and atomic number 95. It is a transuranic member of the actinide series, in the periodic table located under the lanthanide element europium, and thus by analogy was named after the Americas. Americium was first produced in 1944 by the group of Glenn T. Seaborg from Berkeley, California, at the Metallurgical Laboratory of the University of Chicago, a part of the Manhattan Project."
                };
                break;
            case 'Cm':
                data = {
                    name: "Curium",
                    symbol: "Cm",
                    atomicNumber: 96,
                    atomicMass: "(247) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁷ 6d¹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Curium is a transuranic radioactive chemical element with the symbol Cm and atomic number 96. This element of the actinide series was named after Marie and Pierre Curie – both were known for their research on radioactivity. Curium was first intentionally produced and identified in July 1944 by the group of Glenn T. Seaborg at the University of California, Berkeley."
                };
                break;
            case 'Bk':
                data = {
                    name: "Berkelium",
                    symbol: "Bk",
                    atomicNumber: 97,
                    atomicMass: "(247) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f⁹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Berkelium is a transuranic radioactive chemical element with the symbol Bk and atomic number 97. It is a member of the actinide and transuranium element series. It is named after the city of Berkeley, California, the location of the University of California Radiation Laboratory where it was discovered in December 1949."
                };
                break;
            case 'Cf':
                data = {
                    name: "Californium",
                    symbol: "Cf",
                    atomicNumber: 98,
                    atomicMass: "(251) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁰ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Californium is a radioactive chemical element with the symbol Cf and atomic number 98. The element was first made in 1950 at the University of California Radiation Laboratory in Berkeley, by bombarding curium with alpha particles (helium-4 ions). It is an actinide element, the sixth transuranium element to be synthesized, and has the second-highest atomic mass of all the elements that have been produced in amounts large enough to see with the unaided eye (after einsteinium)."
                };
                break;
            case 'Es':
                data = {
                    name: "Einsteinium",
                    symbol: "Es",
                    atomicNumber: 99,
                    atomicMass: "(252) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹¹ 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Einsteinium is a synthetic element with the symbol Es and atomic number 99. It is the seventh transuranic element, and an actinide. Einsteinium was discovered as a component of the debris of the first hydrogen bomb explosion in 1952, and named after Albert Einstein."
                };
                break;
            case 'Fm':
                data = {
                    name: "Fermium",
                    symbol: "Fm",
                    atomicNumber: 100,
                    atomicMass: "(257) u",
                    group: "Actinide",
                    period: "7",
                    block: "f-block",
                    electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹² 7s²",
                    type: "Metal",
                    specific: "Actinide",
                    physical: "Solid",
                    description: "Fermium is a synthetic element with the symbol Fm and atomic number 100. It is a member of the actinide series. It is a radioactive metal that is synthesized by bombarding plutonium with neutrons. It was discovered in the debris of the first hydrogen bomb explosion in 1952, and named after physicist Enrico Fermi."
                };
                break;
            
                case 'Md':
                  data = {
                      name: "Mendelevium",
                      symbol: "Md",
                      atomicNumber: 101,
                      atomicMass: "(258) u",
                      group: "Actinide",
                      period: "7",
                      block: "f-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹³ 7s²",
                      type: "Metal",
                      specific: "Actinide",
                      physical: "Solid",
                      description: "Mendelevium is a synthetic element with the symbol Md (formerly Mv) and atomic number 101. A metallic radioactive transuranic element in the actinide series, it is the first element that currently cannot be produced in macroscopic quantities through neutron bombardment of lighter elements. It is named after Dmitri Mendeleev, father of the periodic table of the chemical elements."
                  };
                  break;
              case 'No':
                  data = {
                      name: "Nobelium",
                      symbol: "No",
                      atomicNumber: 102,
                      atomicMass: "(259) u",
                      group: "Actinide",
                      period: "7",
                      block: "f-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 7s²",
                      type: "Metal",
                      specific: "Actinide",
                      physical: "Solid",
                      description: "Nobelium is a synthetic chemical element with the symbol No and atomic number 102. It is named in honor of Alfred Nobel, the inventor of dynamite and benefactor of science. A radioactive metal, it is the tenth transuranic element and is the penultimate member of the actinide series."
                  };
                  break;
              case 'Lr':
                  data = {
                      name: "Lawrencium",
                      symbol: "Lr",
                      atomicNumber: 103,
                      atomicMass: "(266) u",
                      group: "3",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹ 7s²",
                      type: "Metal",
                      specific: "Transition Metal",
                      physical: "Solid",
                      description: "Lawrencium is a synthetic chemical element with the symbol Lr and atomic number 103. It is named in honor of Ernest Lawrence, inventor of the cyclotron, a device that was used to discover many artificial radioactive elements. A radioactive metal, lawrencium is the eleventh transuranic element and is also the final member of the actinide series."
                  };
                  break;
              case 'Rf':
                  data = {
                      name: "Rutherfordium",
                      symbol: "Rf",
                      atomicNumber: 104,
                      atomicMass: "(267) u",
                      group: "4",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d² 7s²",
                      type: "Metal",
                      specific: "Transition Metal",
                      physical: "Unknown",
                      description: "Rutherfordium is a synthetic chemical element with the symbol Rf and atomic number 104, named after physicist Ernest Rutherford. It is a synthetic element (an element that can be created in a laboratory but is not found in nature) and is radioactive; the most stable known isotope, 267Rf, has a half-life of approximately 1.3 hours."
                  };
                  break;
              case 'Db':
                  data = {
                      name: "Dubnium",
                      symbol: "Db",
                      atomicNumber: 105,
                      atomicMass: "(268) u",
                      group: "5",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d³ 7s²",
                      type: "Metal",
                      specific: "Transition Metal",
                      physical: "Unknown",
                      description: "Dubnium is a synthetic chemical element with the symbol Db and atomic number 105. Dubnium is highly radioactive: the most stable known isotope, dubnium-268, has a half-life of about 28 hours. This greatly limits the extent of research on dubnium."
                  };
                  break;
              case 'Sg':
                  data = {
                      name: "Seaborgium",
                      symbol: "Sg",
                      atomicNumber: 106,
                      atomicMass: "(269) u",
                      group: "6",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d⁴ 7s²",
                      type: "Metal",
                      specific: "Transition Metal",
                      physical: "Unknown",
                      description: "Seaborgium is a synthetic element with the symbol Sg and atomic number 106. It is named after the American nuclear chemist Glenn T. Seaborg. As a synthetic element, it can be created in a laboratory but is not found in nature. It is also radioactive; the most stable known isotope, seaborgium-269, has a half-life of about 1.3 minutes."
                  };
                  break;
              case 'Bh':
                  data = {
                      name: "Bohrium",
                      symbol: "Bh",
                      atomicNumber: 107,
                      atomicMass: "(270) u",
                      group: "7",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d⁵ 7s²",
                      type: "Metal",
                      specific: "Transition Metal",
                      physical: "Unknown",
                      description: "Bohrium is a synthetic chemical element with the symbol Bh and atomic number 107. It is named after Danish physicist Niels Bohr. It is a synthetic element and radioactive; the most stable known isotope, bohrium-270, has a half-life of approximately 61 seconds."
                  };
                  break;
              case 'Hs':
                  data = {
                      name: "Hassium",
                      symbol: "Hs",
                      atomicNumber: 108,
                      atomicMass: "(269) u",
                      group: "8",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d⁶ 7s²",
                      type: "Metal",
                      specific: "Transition Metal",
                      physical: "Unknown",
                      description: "Hassium is a synthetic chemical element with the symbol Hs and atomic number 108. It was first synthesized in 1984 by a German research team led by Peter Armbruster and Gottfried Münzenberg at the Institute for Heavy Ion Research (Gesellschaft für Schwerionenforschung) in Darmstadt. It is named after the German state of Hesse."
                  };
                  break;
              case 'Mt':
                  data = {
                      name: "Meitnerium",
                      symbol: "Mt",
                      atomicNumber: 109,
                      atomicMass: "(278) u",
                      group: "9",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d⁷ 7s²",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Meitnerium is a synthetic chemical element with the symbol Mt and atomic number 109. It is an extremely radioactive synthetic element (an element not found naturally). The most stable known isotope, meitnerium-278, has a half-life of 7.6 seconds, although the unconfirmed meitnerium-282 may have a longer half-life of about 67 seconds."
                  };
                  break;
              case 'Ds':
                  data = {
                      name: "Darmstadtium",
                      symbol: "Ds",
                      atomicNumber: 110,
                      atomicMass: "(281) u",
                      group: "10",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d⁸ 7s²",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Darmstadtium is a synthetic chemical element with the symbol Ds and atomic number 110. It is an extremely radioactive synthetic element. The most stable known isotope, darmstadtium-281, has a half-life of approximately 12.7 seconds."
                  };
                  break;
              case 'Rg':
                  data = {
                      name: "Roentgenium",
                      symbol: "Rg",
                      atomicNumber: 111,
                      atomicMass: "(282) u",
                      group: "11",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d⁹ 7s²",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Roentgenium is a synthetic chemical element with the symbol Rg and atomic number 111. It is an extremely radioactive synthetic element. The most stable known isotope, roentgenium-282, has a half-life of approximately 2.1 minutes, although an unconfirmed isotope, roentgenium-286, may have a longer half-life of about 10.7 minutes."
                  };
                  break;
              case 'Cn':
                  data = {
                      name: "Copernicium",
                      symbol: "Cn",
                      atomicNumber: 112,
                      atomicMass: "(285) u",
                      group: "12",
                      period: "7",
                      block: "d-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s²",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Copernicium is a synthetic chemical element with the symbol Cn and atomic number 112. It is an extremely radioactive element and can only be created in a laboratory. The most stable known isotope, copernicium-285, has a half-life of approximately 29 seconds."
                  };
                  break;
              case 'Nh':
                  data = {
                      name: "Nihonium",
                      symbol: "Nh",
                      atomicNumber: 113,
                      atomicMass: "(286) u",
                      group: "13",
                      period: "7",
                      block: "p-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s² 7p¹",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Nihonium is a synthetic chemical element with the symbol Nh and atomic number 113. It is extremely radioactive; its most stable known isotope, nihonium-286, has a half-life of about 10 seconds. In the periodic table, nihonium is a transactinide element in the p-block."
                  };
                  break;
              case 'Fl':
                  data = {
                      name: "Flerovium",
                      symbol: "Fl",
                      atomicNumber: 114,
                      atomicMass: "(289) u",
                      group: "14",
                      period: "7",
                      block: "p-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s² 7p²",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Flerovium is a synthetic element with the symbol Fl and atomic number 114. It is an extremely radioactive synthetic element. The element is named after the Flerov Laboratory of Nuclear Reactions of the Joint Institute for Nuclear Research in Dubna, Russia, where the element was discovered in 1998."
                  };
                  break;
              case 'Mc':
                  data = {
                      name: "Moscovium",
                      symbol: "Mc",
                      atomicNumber: 115,
                      atomicMass: "(290) u",
                      group: "15",
                      period: "7",
                      block: "p-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s² 7p³",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Moscovium is a synthetic chemical element with the symbol Mc and atomic number 115. It was first synthesized in 2003 by a joint team of Russian and American scientists at the Joint Institute for Nuclear Research (JINR) in Dubna, Russia. In December 2015, it was recognized as one of four new elements by the Joint Working Party of international scientific bodies IUPAC and IUPAP. On 28 November 2016, it was officially named."
                  };
                  break;
              case 'Lv':
                  data = {
                      name: "Livermorium",
                      symbol: "Lv",
                      atomicNumber: 116,
                      atomicMass: "(293) u",
                      group: "16",
                      period: "7",
                      block: "p-block",
                      electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s² 7p⁴",
                      type: "Unknown",
                      specific: "Unknown",
                      physical: "Unknown",
                      description: "Livermorium is a synthetic chemical element with the symbol Lv and atomic number 116. It is an extremely radioactive element that has only been created in the laboratory and has not been observed in nature. The element is named after the Lawrence Livermore National Laboratory in the United States."
                  };
                  break;
                  case 'Ts':
                    data = {
                        name: "Tennessine",
                        symbol: "Ts",
                        atomicNumber: 117,
                        atomicMass: "(294) u",
                        group: "17",
                        period: "7",
                        block: "p-block",
                        electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s² 7p⁵",
                        type: "Unknown",
                        specific: "Unknown",
                        physical: "Unknown",
                        description: "Tennessine is a synthetic chemical element with the symbol Ts and atomic number 117. It is the second-heaviest known element and the penultimate element of the 7th period of the periodic table. The discovery of tennessine was officially announced in Dubna, Russia, by a Russian–American collaboration in 2010, which makes it the most recently discovered element as of 2020."
                    };
                    break;
                case 'Og':
                    data = {
                        name: "Oganesson",
                        symbol: "Og",
                        atomicNumber: 118,
                        atomicMass: "(294) u",
                        group: "18",
                        period: "7",
                        block: "p-block",
                        electronic: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
                        type: "Non-metal",
                        specific: "Noble Gas",
                        physical: "Gas",
                        description: "Oganesson is a synthetic chemical element with the symbol Og and atomic number 118. It was first synthesized in 2002 by a joint team of Russian and American scientists at the Joint Institute for Nuclear Research (JINR) in Dubna, Russia. In December 2015, it was recognized as one of four new elements by the Joint Working Party of international scientific bodies IUPAC and IUPAP. On 28 November 2016, it was officially named after Russian physicist Yuri Oganessian, who helped discover several superheavy elements."
                      };

                    }
                  
                    return data;
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



const linkData = [
  {name: "Mathematics All formulas", url: "https://www.example.com/link1", color: "red"},
  {name: "Physics formulas", url: "https://www.example.com/link2", color: "#03736f"},
  {name: "Chemical formulas", url: "https://www.example.com/link3", color: "#11f705"},
  {name: "Periodic table", url: "https://www.example.com/link4", color: "orange"},
  {name: "Conversion", url: "https://www.example.com/link5", color: "purple"},
  {name: "Mathematics All formulas", url: "https://www.example.com/link1", color: "red"},
  {name: "Physics formulas", url: "https://www.example.com/link2", color: "#03736f"},
  {name: "Chemical formulas", url: "https://www.example.com/link3", color: "#11f705"},
  {name: "Periodic table", url: "https://www.example.com/link4", color: "orange"},
  {name: "Conversion", url: "https://www.example.com/link5", color: "purple"},
  {name: "Mathematics All formulas", url: "https://www.example.com/link1", color: "red"},
  {name: "Physics formulas", url: "https://www.example.com/link2", color: "#03736f"},
  {name: "Chemical formulas", url: "https://www.example.com/link3", color: "#11f705"},
  {name: "Periodic table", url: "https://www.example.com/link4", color: "orange"},
  {name: "Conversion", url: "https://www.example.com/link5", color: "purple"},
 
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


  function goToUrl() {
    window.location.href = "mailto:himanshutyagi9710@gmail.com";
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
          href: 'https://www.example.com/'
      },
      {
          svg: `<svg height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" width="25px">
                  <g>
                      <path d="M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z" style="fill:#1877f2;fill-rule:nonzero;"/>
                      <path d="M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z" style="fill:#fff;fill-rule:nonzero;"/>
                  </g>
              </svg>`,
          href: 'https://www.example.com/'
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
          href: 'https://www.instagram.com/'
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

     
function AngleConverter(source,valNum){valNum = parseFloat(valNum);
  var inputDegrees = document.getElementById("inputDegrees");
  var inputRadians = document.getElementById("inputRadians");
  var inputGradians = document.getElementById("inputGradians");
  if (source=="inputDegrees") {
    inputGradians.value=(valNum*1.111111).toFixed(6);
    inputRadians.value=(valNum*0.017453).toFixed(6);}
  
    if (source=="inputRadians") {
    inputDegrees.value=(valNum*57.29578).toFixed(5);
    inputGradians.value=(valNum*63.66198).toFixed(5);}
      
    if 
    (source=="inputGradians"){
    inputDegrees.value=(valNum*0.9).toFixed(1);
    inputRadians.value=(valNum*0.015708).toFixed(6);}}

function AreaConverter(source,valNum) 
{
  valNum = parseFloat(valNum);
  var inputSquaremillimetre = document.getElementById("inputSquaremillimetre");
  var inputSquarecentimetre = document.getElementById("inputSquarecentimetre");
  var inputSquaremetres = document.getElementById("inputSquaremetres");
  var inputHectares = document.getElementById("inputHectares");
  var inputSquarekilometres = document.getElementById("inputSquarekilometres");
  var inputSquareinches = document.getElementById("inputSquareinches");
  var inputSquareFeet = document.getElementById("inputSquareFeet");
  var inputSquareYards = document.getElementById("inputSquareYards");
  var inputAcres = document.getElementById("inputAcres");
  var inputSquareMiles = document.getElementById("inputSquareMiles");
  if (source=="inputSquaremillimetre") {
    
    inputSquaremetres.value=(valNum*0.000001).toFixed(6);
    inputHectares.value=(valNum*0.0000000001).toFixed(10);
    inputSquarekilometres.value=(valNum*0.000000000001).toFixed(12);
    inputSquareinches.value=(valNum*0.00155).toFixed(5);
    inputSquareFeet.value=(valNum*0.000011).toFixed(6);
    inputSquareYards.value=(valNum*0.000001).toFixed(6);
    inputAcres.value=(valNum*0.000000000247105).toFixed(15);
    inputSquareMiles.value=(valNum*0.000000000000386).toFixed(15);
    inputSquarecentimetre.value=(valNum*0.01).toFixed(2);
  }
  if (source=="inputSquarecentimetre") {
    inputSquaremillimetre.value=(valNum*100).toFixed();
    inputSquaremetres.value=(valNum*0.0001).toFixed(4);
    inputHectares.value=(valNum*0.00000001).toFixed(8);
    inputSquarekilometres.value=(valNum*0.0000000001).toFixed(10);
    inputSquareinches.value=(valNum*0.155).toFixed(3);
    inputSquareFeet.value=(valNum*0.001076).toFixed(6);
    inputSquareYards.value=(valNum*0.00012).toFixed(5);
    inputAcres.value=(valNum*0.000000024710538).toFixed(15);
    inputSquareMiles.value=(valNum*0.000000000003861).toFixed(15);
  }
  if (source=="inputSquaremetres") {
    inputSquaremillimetre.value=(valNum*1000000).toFixed();
    inputSquarecentimetre.value=(valNum*10000).toFixed();
    inputHectares.value=(valNum*0.0001).toFixed(4);
    inputSquarekilometres.value=(valNum*0.000001).toFixed(6);
    inputSquareinches.value=(valNum*1550.003).toFixed(3);
    inputSquareFeet.value=(valNum*10.76391).toFixed(5);
    inputSquareYards.value=(valNum*1.19599).toFixed(5);
    inputAcres.value=(valNum*0.000247).toFixed(6);
    inputSquareMiles.value=(valNum*0.000000386102159).toFixed(15);
  }
  if (source=="inputHectares") {
    inputSquaremillimetre.value=(valNum*10000000000).toFixed();
    inputSquarecentimetre.value=(valNum*100000000).toFixed();
    inputSquaremetres.value=(valNum*10000).toFixed();
    inputSquarekilometres.value=(valNum*0.01).toFixed(2);
    inputSquareinches.value=(valNum*15500031).toFixed();
    inputSquareFeet.value=(valNum*107639.1).toFixed(1);
    inputSquareYards.value=(valNum*11959.9).toFixed(1);
    inputAcres.value=(valNum*2.471054).toFixed(6);
    inputSquareMiles.value=(valNum*0.003861).toFixed(6);
  }
  if (source=="inputSquarekilometres") {
    inputSquaremillimetre.value=(valNum*1000000000000).toFixed();
    inputSquarecentimetre.value=(valNum*10000000000).toFixed();
    inputHectares.value=(valNum*100).toFixed();
    inputSquareinches.value=(valNum*1550003100).toFixed();
    inputSquareFeet.value=(valNum*10763910).toFixed();
    inputSquareYards.value=(valNum*1195990).toFixed();
    inputSquaremetres.value=(valNum*1000000).toFixed();
    inputAcres.value=(valNum*247.1054).toFixed(4);
    inputSquareMiles.value=(valNum*0.386102).toFixed(6);
  }
  if (source=="inputSquareinches") {
    inputSquaremillimetre.value=(valNum*645.16).toFixed(2);
    inputSquarecentimetre.value=(valNum*6.4516).toFixed(4);
    inputSquaremetres.value=(valNum*0.000645).toFixed(6);
    inputHectares.value=(valNum*0.000000064516).toFixed(12);
    inputSquarekilometres.value=(valNum*0.00000000064516).toFixed(14);
    inputSquareFeet.value=(valNum*0.006944).toFixed(6);
    inputSquareYards.value=(valNum*0.000772).toFixed(6);
    inputAcres.value=(valNum*0.000000159422508).toFixed(15);
    inputSquareMiles.value=(valNum*0.000000000249098).toFixed(15);
  }
  if (source=="inputSquareFeet") {
    inputSquaremillimetre.value=(valNum*92903.04).toFixed(2);
    inputSquarecentimetre.value=(valNum*929.0304).toFixed(4);
    inputSquaremetres.value=(valNum*0.092903).toFixed(6);
    inputHectares.value=(valNum*0.000009).toFixed(6);
    inputSquarekilometres.value=(valNum*0.00000009290304).toFixed(14);
    inputSquareinches.value=(valNum*144).toFixed();
    inputSquareYards.value=(valNum*0.111111).toFixed(6);
    inputAcres.value=(valNum*0.000023).toFixed(6);
    inputSquareMiles.value=(valNum*0.000000035870064).toFixed(15);
  }
  if (source=="inputSquareYards") {
    inputSquaremillimetre.value=(valNum*836127.4).toFixed(1);
    inputSquarecentimetre.value=(valNum*8361.274).toFixed(3);
    inputSquaremetres.value=(valNum*0.836127).toFixed(6);
    inputHectares.value=(valNum*0.000084).toFixed(6);
    inputSquarekilometres.value=(valNum*0.00000083612736).toFixed(14);
    inputSquareinches.value=(valNum*1296).toFixed();
    inputSquareFeet.value=(valNum*9).toFixed();
    inputAcres.value=(valNum*0.000207).toFixed(6);
    inputSquareMiles.value=(valNum*0.000000322830579).toFixed(15);
  }
  if (source=="inputAcres") {
    inputSquaremillimetre.value=(valNum*4046856422).toFixed();
    inputSquarecentimetre.value=(valNum*40468564).toFixed();
    inputSquaremetres.value=(valNum*4046.856).toFixed(3);
    inputHectares.value=(valNum*0.404686).toFixed(6);
    inputSquarekilometres.value=(valNum*0.004047).toFixed(6);
    inputSquareinches.value=(valNum*6272640).toFixed();
    inputSquareFeet.value=(valNum*43560).toFixed();
    inputSquareYards.value=(valNum*4840).toFixed();
    inputSquareMiles.value=(valNum*0.001563).toFixed(6);
  }
  if (source=="inputSquareMiles") {
    inputSquaremillimetre.value=(valNum*2589988110336).toFixed();
    inputSquarecentimetre.value=(valNum*25899881103).toFixed();
    inputSquaremetres.value=(valNum*2589988).toFixed();
    inputHectares.value=(valNum*258.9988).toFixed(4);
    inputSquarekilometres.value=(valNum*2.589988).toFixed(6);
    inputSquareinches.value=(valNum*4014489600).toFixed();
    inputSquareFeet.value=(valNum*27878400).toFixed();
    inputSquareYards.value=(valNum*3097600).toFixed();
    inputAcres.value=(valNum*640).toFixed();
  }
}


function lengthConverter(source,valNum) {
  valNum = parseFloat(valNum);
  var inputFeet = document.getElementById("inputFeet");
  var inputMetres = document.getElementById("inputMetres");
  var inputInches = document.getElementById("inputInches");
  var inputcm = document.getElementById("inputcm");
  var inputYards = document.getElementById("inputYards");
  var inputKilometres = document.getElementById("inputKilometres");
  var inputMiles = document.getElementById("inputMiles");
  var inputnm = document.getElementById("inputnm");
  var inputmicrons = document.getElementById("inputmicrons");
  var inputMillimetres = document.getElementById("inputMillimetres");
  var inputNauticalMiles = document.getElementById("inputNauticalMiles");
  
   if (source=="inputFeet") 
  {
    inputMetres.value=(valNum*0.3048).toFixed(4);
    inputInches.value=(valNum*12).toFixed();
    inputcm.value=(valNum*30.48).toFixed(2);
    inputYards.value=(valNum*0.33333).toFixed(5);
    inputKilometres.value=(valNum*0.000305).toFixed(6);    
    inputMiles.value=(valNum*0.00018939).toFixed(8);
    inputnm.value=(valNum*304800000).toFixed();
    inputmicrons.value=(valNum*304800).toFixed();
    inputMillimetres.value=(valNum*304.8).toFixed(1);    
    inputNauticalMiles.value=(valNum*0.000165).toFixed(6);
  }
  if (source=="inputMetres") 
  {
    inputFeet.value=(valNum*3.280).toFixed(3);
    inputInches.value=(valNum*39.370).toFixed(3);
    inputcm.value=(valNum*100).toFixed();
    inputYards.value=(valNum*1.093613).toFixed(5);
    inputKilometres.value=(valNum*0.001).toFixed(3);    
    inputMiles.value=(valNum*0.000621).toFixed(6);
    inputnm.value=(valNum*1000000000).toFixed();
    inputmicrons.value=(valNum*1000000).toFixed();
    inputMillimetres.value=(valNum*1000).toFixed();    
    inputNauticalMiles.value=(valNum*0.00054).toFixed(5);
  }
  if (source=="inputInches") 
  {
    inputMetres.value=(valNum*0.0254).toFixed(4);
    inputFeet.value=(valNum*0.0833).toFixed(3);
    inputcm.value=(valNum*2.54).toFixed(2);
    inputYards.value=(valNum*0.027778).toFixed(6);
    inputKilometres.value=(valNum*0.000025).toFixed(6);    
    inputMiles.value=(valNum*0.000016).toFixed(6);
    inputnm.value=(valNum*25400000).toFixed();
    inputmicrons.value=(valNum*25400).toFixed();
    inputMillimetres.value=(valNum*25.4).toFixed(1);    
    inputNauticalMiles.value=(valNum*0.000014).toFixed(6);
  }
  if (source=="inputcm") 
  {
    inputMetres.value=(valNum*0.01).toFixed(2);
    inputInches.value=(valNum*0.393701).toFixed(6);
    inputFeet.value=(valNum*0.032808).toFixed(6);
    inputYards.value=(valNum*0.010936).toFixed(6);
    inputKilometres.value=(valNum*0.00001).toFixed(5);    
    inputMiles.value=(valNum*0.000006).toFixed(6);
    inputnm.value=(valNum*10000000).toFixed();
    inputmicrons.value=(valNum*10000).toFixed();
    inputMillimetres.value=(valNum*10).toFixed();    
    inputNauticalMiles.value=(valNum*0.000005).toFixed(6);
  }
  if (source=="inputYards") 
  {
    inputMetres.value=(valNum*9144).toFixed(4);
    inputInches.value=(valNum*36).toFixed();
    inputcm.value=(valNum*91.44).toFixed(2);
    inputFeet.value=(valNum*3).toFixed();
    inputKilometres.value=(valNum*0.000914).toFixed(6);    
    inputMiles.value=(valNum*0.000568).toFixed(6);
    inputnm.value=(valNum*914400000).toFixed();
    inputmicrons.value=(valNum*914400).toFixed();
    inputMillimetres.value=(valNum*914.4).toFixed(1);    
    inputNauticalMiles.value=(valNum*0.000494).toFixed(6);
  }
  if (source=="inputKilometres") 
  {
    inputMetres.value=(valNum*1000).toFixed();
    inputInches.value=(valNum*39370.08).toFixed(2);
    inputcm.value=(valNum*100000).toFixed();
    inputYards.value=(valNum*1093.613).toFixed(3);
    inputFeet.value=(valNum*3280.84).toFixed(2);    
    inputMiles.value=(valNum*0.621371).toFixed(6);
    inputnm.value=(valNum*1000000000000).toFixed();
    inputmicrons.value=(valNum*1000000000).toFixed();
    inputNauticalMiles.value=(valNum*0.539957).toFixed(6);
    inputMillimetres.value=(valNum*1000000).toFixed();    
    
  }
  if (source=="inputMiles") 
  {
    inputMetres.value=(valNum*1609).toFixed(3);
    inputInches.value=(valNum*63360).toFixed();
    inputcm.value=(valNum*160934).toFixed(1);
    inputYards.value=(valNum*1760).toFixed();
    inputKilometres.value=(valNum*1.609344).toFixed(5);    
    inputFeet.value=(valNum*5280).toFixed(3);
    inputnm.value=(valNum*1609344000000).toFixed();
    inputmicrons.value=(valNum*1609344000).toFixed();
    inputMillimetres.value=(valNum*1609344).toFixed();    
    inputNauticalMiles.value=(valNum*0.868976).toFixed(6);
  }
  if (source=="inputnm") 
  {
    inputMetres.value=(valNum*0.000000001).toFixed(9);
    inputInches.value=(valNum*0.000000039370079).toFixed(15);
    inputcm.value=(valNum*0.0000001).toFixed(7);
    inputYards.value=(valNum*0.000000001093613).toFixed(15);
    inputKilometres.value=(valNum*0.000000000001).toFixed(12);    
    inputMiles.value=(valNum*0.000000000000621).toFixed(15);
    inputFeet.value=(valNum*0.00000000328084).toFixed(14);
    inputmicrons.value=(valNum*0.001).toFixed(3);
    inputMillimetres.value=(valNum*0.000001).toFixed(6);    
    inputNauticalMiles.value=(valNum*0.00000000000054).toFixed(14);
  }
  if (source=="inputmicrons") 
  {
    inputMetres.value=(valNum*0.000001).toFixed(6);
    inputInches.value=(valNum*0.000039).toFixed(6);
    inputcm.value=(valNum*0.0001).toFixed(4);
    inputYards.value=(valNum*0.000001).toFixed(6);
    inputKilometres.value=(valNum*0.000000001).toFixed(9);    
    inputMiles.value=(valNum*0.000000000621371).toFixed(15);
    inputnm.value=(valNum*1000).toFixed();
    inputFeet.value=(valNum*0.000003).toFixed(6);
    inputMillimetres.value=(valNum*0.001).toFixed(3);    
    inputNauticalMiles.value=(valNum*0.000000000539957).toFixed(15);
  }if (source=="inputNauticalMiles") 
  {
    inputMetres.value=(valNum*1852).toFixed();
    inputInches.value=(valNum*72913.39).toFixed(2);
    inputcm.value=(valNum*185200).toFixed();
    inputYards.value=(valNum*2025.372).toFixed(3);
    inputmicrons.value=(valNum*1852000000).toFixed();
    inputMillimetres.value=(valNum*1852000).toFixed(); 
    inputMiles.value=(valNum*1.150779).toFixed(6);
    inputnm.value=(valNum*1852000000000).toFixed(); 
    inputFeet.value=(valNum*6076.115).toFixed(3);
    inputKilometres.value=(valNum*1.852).toFixed(3); 
    
  }
  if (source=="inputMillimetres") 
  {
    inputMetres.value=(valNum*0.001).toFixed(3);
    inputInches.value=(valNum*0.03937).toFixed(5);
    inputcm.value=(valNum*0.1).toFixed(2);
    inputYards.value=(valNum*0.001094).toFixed(6);
    inputKilometres.value=(valNum*0.000001).toFixed(6);    
    inputMiles.value=(valNum*0.000000621371192).toFixed(15);
    inputnm.value=(valNum*1000000).toFixed();
    inputmicrons.value=(valNum*1000).toFixed();
    inputFeet.value=(valNum*0.003281).toFixed(6);    
    inputNauticalMiles.value=(valNum*0.000000539956803).toFixed(15);
  }
  
}

function powerConverter(source,valNum) 
{
  valNum =parseFloat(valNum);
  var inputWatts = document.getElementById("inputWatts");
  var inputKilowatts = document.getElementById("inputKilowatts");
  var inputHorsepower = document.getElementById("inputHorsepower");
  
  if (source=="inputWatts") {
    inputKilowatts.value=(valNum*0.001).toFixed(3);
    inputHorsepower.value=(valNum*0.00134).toFixed(5);
   
  }
  if (source=="inputKilowatts") {
    inputWatts.value=(valNum*1000).toFixed();
    inputHorsepower.value=(valNum*1.341).toFixed(3);
   
  }
  if (source=="inputHorsepower") {
    inputWatts.value=(valNum*745.699).toFixed(3);
    inputKilowatts.value=(valNum*0.745699).toFixed(6);
  
  }
}

function weightConverter(source,valNum) {
  valNum = parseFloat(valNum);
  var inputCarats = document.getElementById("inputCarats");
  var inputMilligrams = document.getElementById("inputMilligrams");
  var inputCentigrams = document.getElementById("inputCentigrams");
  var inputDecigrams = document.getElementById("inputDecigrams");
  var inputGrams = document.getElementById("inputGrams");
  var inputDecagrams = document.getElementById("inputDecagrams");
  var inputHectograms = document.getElementById("inputHectograms");
  var inputKilograms = document.getElementById("inputKilograms");
  var inputMetrictonnes = document.getElementById("inputMetrictonnes");
  var inputOunces = document.getElementById("inputOunces");
  var inputPounds = document.getElementById("inputPounds");
  var inputStones = document.getElementById("inputStones");

  if (source=="inputCarats") {
    inputMilligrams.value=(valNum*200).toFixed();
    inputCentigrams.value=(valNum*20).toFixed();
    inputDecigrams.value=(valNum*2).toFixed();
    inputGrams.value=(valNum*0.2).toFixed(1);
    inputDecagrams.value=(valNum*0.02).toFixed(2);
    inputHectograms.value=(valNum*0.002).toFixed(3);
    inputKilograms.value=(valNum*0.0002).toFixed(4);
    inputMetrictonnes.value=(valNum*0.0000002).toFixed(7);
    inputOunces.value=(valNum*0.007055).toFixed(6);
    inputPounds.value=(valNum*0.000441).toFixed(6);
    inputStones.value=(valNum*0.000031).toFixed(6);
  }
  if (source=="inputMilligrams") {
    inputCarats.value=(valNum*0.005).toFixed(3);
    inputCentigrams.value=(valNum*0.1).toFixed(1);
    inputDecigrams.value=(valNum*0.01).toFixed(2);
    inputGrams.value=(valNum*0.001).toFixed(3);
    inputDecagrams.value=(valNum*0.0001).toFixed(4);
    inputHectograms.value=(valNum*0.00001).toFixed(5);
    inputKilograms.value=(valNum*0.000001).toFixed(6);
    inputMetrictonnes.value=(valNum*0.000000001).toFixed(9);
    inputOunces.value=(valNum*0.000035).toFixed(6);
    inputPounds.value=(valNum*0.000002).toFixed(6);
    inputStones.value=(valNum*0.000000157473044).toFixed(15);
  }
  if (source=="inputCentigrams") {
    inputMilligrams.value=(valNum*10).toFixed();
    inputCarats.value=(valNum*0.05).toFixed(2);
    inputDecigrams.value=(valNum*0.1).toFixed(1);
    inputGrams.value=(valNum*0.01).toFixed(2);
    inputDecagrams.value=(valNum*0.001).toFixed(3);
    inputHectograms.value=(valNum*0.0001).toFixed(4);
    inputKilograms.value=(valNum*0.00001).toFixed(5);
    inputMetrictonnes.value=(valNum*0.00000001).toFixed(8);
    inputOunces.value=(valNum*0.000353).toFixed(6);
    inputPounds.value=(valNum*0.000022).toFixed(6);
    inputStones.value=(valNum*0.000002).toFixed(6);
  }
  if (source=="inputDecigrams") {
    inputMilligrams.value=(valNum*100).toFixed();
    inputCentigrams.value=(valNum*10).toFixed();
    inputCarats.value=(valNum*0.5).toFixed(1);
    inputGrams.value=(valNum*0.1).toFixed(1);
    inputDecagrams.value=(valNum*0.01).toFixed(2);
    inputHectograms.value=(valNum*0.001).toFixed(3);
    inputKilograms.value=(valNum*0.0001).toFixed(4);
    inputMetrictonnes.value=(valNum*0.0000001).toFixed(7);
    inputOunces.value=(valNum*0.003527).toFixed(6);
    inputPounds.value=(valNum*0.00022).toFixed(5);
    inputStones.value=(valNum*0.000016).toFixed(6);
  }
  if (source=="inputGrams") {
    inputMilligrams.value=(valNum*1000).toFixed();
    inputCentigrams.value=(valNum*100).toFixed();
    inputDecigrams.value=(valNum*10).toFixed();
    inputCarats.value=(valNum*5).toFixed();
    inputDecagrams.value=(valNum*0.1).toFixed(1);
    inputHectograms.value=(valNum*0.01).toFixed(2);
    inputKilograms.value=(valNum*0.001).toFixed(3);
    inputMetrictonnes.value=(valNum*0.000001).toFixed(6);
    inputOunces.value=(valNum*0.035274).toFixed(6);
    inputPounds.value=(valNum*0.002205).toFixed(6);
    inputStones.value=(valNum*0.000157).toFixed(6);
  }
  if (source=="inputDecagrams") {
    inputMilligrams.value=(valNum*10000).toFixed();
    inputCentigrams.value=(valNum*1000).toFixed();
    inputDecigrams.value=(valNum*100).toFixed();
    inputGrams.value=(valNum*10).toFixed();
    inputCarats.value=(valNum*50).toFixed();
    inputHectograms.value=(valNum*0.1).toFixed(1);
    inputKilograms.value=(valNum*0.01).toFixed(2);
    inputMetrictonnes.value=(valNum*0.00001).toFixed(5);
    inputOunces.value=(valNum*0.35274).toFixed(5);
    inputPounds.value=(valNum*0.022046).toFixed(6);
    inputStones.value=(valNum*0.001575).toFixed(6);
  }
  if (source=="inputHectograms") {
    inputMilligrams.value=(valNum*100000).toFixed();
    inputCentigrams.value=(valNum*10000).toFixed();
    inputDecigrams.value=(valNum*1000).toFixed();
    inputGrams.value=(valNum*100).toFixed();
    inputDecagrams.value=(valNum*10).toFixed();
    inputCarats.value=(valNum*500).toFixed();
    inputKilograms.value=(valNum*0.1).toFixed(1);
    inputMetrictonnes.value=(valNum*0.0001).toFixed(4);
    inputOunces.value=(valNum*3.527396).toFixed(6);
    inputPounds.value=(valNum*0.220462).toFixed(6);
    inputStones.value=(valNum*0.015747).toFixed(6);
  }
  if (source=="inputKilograms") {
    inputMilligrams.value=(valNum*1000000).toFixed();
    inputCentigrams.value=(valNum*100000).toFixed();
    inputDecigrams.value=(valNum*10000).toFixed();
    inputGrams.value=(valNum*1000).toFixed();
    inputDecagrams.value=(valNum*100).toFixed();
    inputHectograms.value=(valNum*10).toFixed();
    inputCarats.value=(valNum*5000).toFixed();
    inputMetrictonnes.value=(valNum*0.001).toFixed(3);
    inputOunces.value=(valNum*35.27396).toFixed(5);
    inputPounds.value=(valNum*2.204623).toFixed(6);
    inputStones.value=(valNum*0.157473).toFixed(6);
  }
  if (source=="inputMetrictonnes") {
    inputMilligrams.value=(valNum*1000000000).toFixed();
    inputCentigrams.value=(valNum*100000000).toFixed();
    inputDecigrams.value=(valNum*10000000).toFixed();
    inputGrams.value=(valNum*1000000).toFixed();
    inputDecagrams.value=(valNum*100000).toFixed();
    inputHectograms.value=(valNum*10000).toFixed();
    inputKilograms.value=(valNum*1000).toFixed();
    inputCarats.value=(valNum*5000000).toFixed();
    inputOunces.value=(valNum*35273.96).toFixed(2);
    inputPounds.value=(valNum*2204.623).toFixed(3);
    inputStones.value=(valNum*157.473).toFixed(3);
  }
  if (source=="inputOunces") {
    inputMilligrams.value=(valNum*28349.52).toFixed(2);
    inputCentigrams.value=(valNum*2834.952).toFixed(3);
    inputDecigrams.value=(valNum*283.4952).toFixed(4);
    inputGrams.value=(valNum*28.34952).toFixed(5);
    inputDecagrams.value=(valNum*2.834952).toFixed(6);
    inputHectograms.value=(valNum*0.2834952).toFixed(7);
    inputKilograms.value=(valNum*0.02835).toFixed(5);
    inputMetrictonnes.value=(valNum*0.000028).toFixed(6);
    inputCarats.value=(valNum*141.7476).toFixed(4);
    inputPounds.value=(valNum*0.0625).toFixed(4);
    inputStones.value=(valNum*0.004464).toFixed(6);
  }
  if (source=="inputPounds") {
    inputMilligrams.value=(valNum*2453592.4).toFixed(1);
    inputCentigrams.value=(valNum*45359.24).toFixed(2);
    inputDecigrams.value=(valNum*4535.924).toFixed(3);
    inputGrams.value=(valNum*453.5924).toFixed(4);
    inputDecagrams.value=(valNum*45.35924).toFixed(5);
    inputHectograms.value=(valNum*4.535924).toFixed(6);
    inputKilograms.value=(valNum*0.453592).toFixed(6);
    inputMetrictonnes.value=(valNum*0.000454).toFixed(6);
    inputOunces.value=(valNum*16).toFixed();
    inputCarats.value=(valNum*2267.962).toFixed(3);
    inputStones.value=(valNum*0.071429).toFixed(6);
  }
  if (source=="inputStones") {
    inputMilligrams.value=(valNum*6350293).toFixed();
    inputCentigrams.value=(valNum*635029.3).toFixed(1);
    inputDecigrams.value=(valNum*63502.93).toFixed(2);
    inputGrams.value=(valNum*6350.293).toFixed(3);
    inputDecagrams.value=(valNum*635.0293).toFixed(4);
    inputHectograms.value=(valNum*63.50293).toFixed(5);
    inputKilograms.value=(valNum*6.350293).toFixed(6);
    inputMetrictonnes.value=(valNum*0.00635).toFixed(5);
    inputOunces.value=(valNum*224).toFixed();
    inputPounds.value=(valNum*14).toFixed();
    inputCarats.value=(valNum*31751.47).toFixed(2);
  }
}

function Pressure(source,valNum) {
  valNum = parseFloat(valNum);
  var inputAtmospheres = document.getElementById("inputAtmospheres");
  var inputKilopascals = document.getElementById("inputKilopascals");
  var inputPascals = document.getElementById("inputPascals");
  var inputBars = document.getElementById("inputBars");
  var inputMillimetresofmercury = document.getElementById("inputMillimetresofmercury");
  var inputPoundspersquareinch = document.getElementById("inputPoundspersquareinch");
  
  if (source=="inputAtmospheres") {
    inputBars.value=(valNum*1.01325).toFixed(5);
    inputPascals.value=(valNum*101325).toFixed();
    inputPoundspersquareinch.value=(valNum*14.69595).toFixed(5);
    inputKilopascals.value=(valNum*101.325).toFixed(3);
    inputMillimetresofmercury.value=(valNum*760.1275).toFixed(4);
  }
  
  if (source=="inputPascals") {
    inputAtmospheres.value=(valNum*0.00001).toFixed(5);
    inputKilopascals.value=(valNum*0.001).toFixed(3);
    inputBars.value=(valNum*0.00001).toFixed(5);
    inputMillimetresofmercury.value=(valNum*0.007502).toFixed(6);
    inputPoundspersquareinch.value=(valNum*0.000145).toFixed(6);
    
  }
  if (source=="inputKilopascals") {
    inputAtmospheres.value=(valNum*0.009869).toFixed(4);
    inputPascals.value=(valNum*1000).toFixed();
    inputBars.value=(valNum*0.01).toFixed(2);
    
    inputPoundspersquareinch.value=(valNum*145038).toFixed(6);
    inputMillimetresofmercury.value=(valNum*7.501875).toFixed();
    
  }
  if (source=="inputBars") {
    inputAtmospheres.value=(valNum*0.986923).toFixed(6);
    inputKilopascals.value=(valNum*100).toFixed();
    inputPascals.value=(valNum*100000).toFixed();
    inputMillimetresofmercury.value=(valNum*750.1875).toFixed(4);
    inputPoundspersquareinch.value=(valNum*14.50377).toFixed(5);
   
  }
  if (source=="inputMillimetresofmercury") {
    inputAtmospheres.value=(valNum*0.001316).toFixed(6);
    inputKilopascals.value=(valNum*0.1333).toFixed(4);
    inputPascals.value=(valNum*133.3).toFixed(1);
    inputBars.value=(valNum*0.001333).toFixed(6);
    inputPoundspersquareinch.value=(valNum*0.019334).toFixed(6);
    
  }
  if (source=="inputPoundspersquareinch") {
    inputAtmospheres.value=(valNum*0.068046).toFixed(6);
    inputKilopascals.value=(valNum*6.894757).toFixed(6);
    inputPascals.value=(valNum*6894.757).toFixed(3);
    inputBars.value=(valNum*0.068948).toFixed(6);
    inputMillimetresofmercury.value=(valNum*51.72361).toFixed(5);
    
  }

}

function speedConverter(source,valNum) 
{
  valNum = parseFloat(valNum);
  var inputCPS = document.getElementById("inputCPS");
  var inputMPS = document.getElementById("inputMPS");
  var inputKPH = document.getElementById("inputKPH");
  var inputFPS = document.getElementById("inputFPS");
  var inputMPH = document.getElementById("inputMPH");
  var inputKnots = document.getElementById("inputKnots");
  var inputMach = document.getElementById("inputMach");
  if (source=="inputCPS") {
    inputKPH.value=(valNum*0.036).toFixed(3);
    inputKnots.value=(valNum*0.01944).toFixed(5);
    inputMach.value=(valNum*0.000029).toFixed(6);
    inputMPH.value=(valNum*0.022371).toFixed(5);
    inputMPS.value=(valNum*0.01).toFixed(2);
    inputFPS.value=(valNum*0.032808).toFixed(4);
  }
  if (source=="inputMPS") {
    inputCPS.value=(valNum*100).toFixed();
    inputKnots.value=(valNum*1.944012).toFixed(5);
    inputMach.value=(valNum*0.002939).toFixed(6);
    inputKPH.value=(valNum*3.6).toFixed(2);
    inputMPH.value=(valNum*2.237136).toFixed(5);
    inputFPS.value=(valNum*3.28084).toFixed(4);
  }
  if (source=="inputKPH") {
    inputMPH.value=(valNum*0.621427).toFixed(6);
    inputMPS.value=(valNum*0.2777).toFixed(3);
    inputFPS.value=(valNum*0.911344).toFixed(4);
    inputCPS.value=(valNum*27.777).toFixed(3);
    inputKnots.value=(valNum*0.540003).toFixed(2);
    inputMach.value=(valNum*0.000816).toFixed(6);
  }
  if (source=="inputFPS") {
    inputMPH.value=(valNum*0.681879).toFixed(5);
    inputKPH.value=(valNum*1.09728).toFixed(5);
    inputKnots.value=(valNum*0.592535).toFixed();
    inputCPS.value=(valNum*30.48).toFixed(2);
    inputMPS.value=(valNum*0.3048).toFixed(4);
    inputMach.value=(valNum*0.000896).toFixed(6);
  }
  if (source=="inputMPH") {
    inputMPS.value=(valNum*0.447).toFixed(3);
    inputKPH.value=(valNum*1.6092).toFixed(4);
    inputKnots.value=(valNum*0.868974).toFixed(4);
    inputFPS.value=(valNum*1.466535).toFixed(3);
    inputCPS.value=(valNum*44.7).toFixed(2);
    inputMach.value=(valNum*0.001314).toFixed(5);
  }
  if (source=="inputKnots") {
    inputMPH.value=(valNum*1.150783).toFixed(6);
    inputKPH.value=(valNum*1.85184).toFixed(4);
    inputFPS.value=(valNum*1.687664).toFixed(6);
    inputCPS.value=(valNum*51.44).toFixed(2);
    inputMPS.value=(valNum*0.5144).toFixed(4);
    inputMach.value=(valNum*0.001512).toFixed(5);
  }
  if (source=="inputMach") {
    inputMPH.value=(valNum*761.2975).toFixed(4);
    inputKPH.value=(valNum*1225.08).toFixed(2);
    inputKnots.value=(valNum*661.5474).toFixed(4);
    inputCPS.value=(valNum*34030).toFixed();
    inputFPS.value=(valNum*1116.47).toFixed(2);
    inputMPS.value=(valNum*340.3).toFixed(1);
  }
}

function temperatureConverter(source,valNum) {
  valNum = parseFloat(valNum);
  var inputFahrenheit = document.getElementById("inputFahrenheit");
  var inputCelsius = document.getElementById("inputCelsius");
  var inputKelvin = document.getElementById("inputKelvin");
  if (source=="inputFahrenheit") {
    inputCelsius.value=((valNum-32)/1.8).toFixed(2);
    inputKelvin.value=(((valNum-32)/1.8)+273.15).toFixed(2);
  }
  if (source=="inputCelsius") {
    inputFahrenheit.value=((valNum*1.8)+32).toFixed(2);
    inputKelvin.value=((valNum)+273.15).toFixed(2);
  }
  if (source=="inputKelvin") {
    inputFahrenheit.value=(((valNum-273.15)*1.8)+32).toFixed(2);
    inputCelsius.value=((valNum)-273.15).toFixed(2);
  }
}

function timeConverter(source,valNum) 
{
  valNum = parseFloat(valNum);
  var inputMicroseconds = document.getElementById("inputMicroseconds");
  var inputMilliseconds = document.getElementById("inputMilliseconds");
  var inputSecond = document.getElementById("inputSecond");
  var inputMinutes = document.getElementById("inputMinutes");
  var inputHours = document.getElementById("inputHours");
  var inputDays = document.getElementById("inputDays");
  var inputWeeks = document.getElementById("inputWeeks");
  var inputYears = document.getElementById("inputYears");
  if (source=="inputMicroseconds") {
    inputMilliseconds.value=(valNum*0.001).toFixed(3);
    inputSecond.value=(valNum*0.000001).toFixed(6);
    inputMinutes.value=(valNum*0.000000016666667).toFixed(15);
    inputHours.value=(valNum*0.000000000277778).toFixed(15);
    inputDays.value=(valNum*0.000000000011574).toFixed(15);
    inputWeeks.value=(valNum*0.000000000001653).toFixed(15);
    inputYears.value=(valNum*0.000000000000032).toFixed(15);
  }
  if (source=="inputMilliseconds") {
    inputMicroseconds.value=(valNum*1000).toFixed();
    inputSecond.value=(valNum*0.001).toFixed(3);
    inputMinutes.value=(valNum*0.000017).toFixed(6);
    inputHours.value=(valNum*0.000000277777777).toFixed(15);
    inputDays.value=(valNum*0.000000011574074).toFixed(15);
    inputWeeks.value=(valNum*0.000000001653439).toFixed(15);
    inputYears.value=(valNum*0.000000000031688).toFixed(15);
  }
  if (source=="inputSecond") {
    inputMicroseconds.value=(valNum*1000000).toFixed();
    inputMilliseconds.value=(valNum*1000).toFixed();
    inputMinutes.value=(valNum*0.016666).toFixed(6);
    inputHours.value=(valNum*0.000278).toFixed(6);
    inputDays.value=(valNum*0.000012).toFixed(6);
    inputWeeks.value=(valNum*0.000002).toFixed(6);
    inputYears.value=(valNum*0.000000031688088).toFixed(15);
  }
  if (source=="inputMinutes") {
    inputMicroseconds.value=(valNum*60000000).toFixed();
    inputMilliseconds.value=(valNum*60000).toFixed();
    inputSecond.value=(valNum*60).toFixed();
    inputHours.value=(valNum*0.016666).toFixed(6);
    inputDays.value=(valNum*0.000694).toFixed(6);
    inputWeeks.value=(valNum*0.000099).toFixed(6);
    inputYears.value=(valNum*0.000002).toFixed(6);
  }
  if (source=="inputHours") {
    inputMicroseconds.value=(valNum*3600000000).toFixed();
    inputMilliseconds.value=(valNum*3600000).toFixed();
    
    inputMinutes.value=(valNum*60).toFixed();
    inputDays.value=(valNum*0.041666).toFixed(6);
    inputWeeks.value=(valNum*0.005952).toFixed(6);
    inputYears.value=(valNum*0.000114).toFixed(6);
    inputSecond.value=(valNum*3600).toFixed();
  }
  if (source=="inputDays") {
    inputMicroseconds.value=(valNum*86400000000).toFixed();
    inputMilliseconds.value=(valNum*86400000).toFixed();
    inputSecond.value=(valNum*86400).toFixed();
    inputMinutes.value=(valNum*1440).toFixed();
    inputHours.value=(valNum*24).toFixed();
    inputWeeks.value=(valNum*0.142857).toFixed(6);
    inputYears.value=(valNum*0.002738).toFixed(6);
  }
  if (source=="inputWeeks") {
    inputMicroseconds.value=(valNum*604800000000).toFixed();
    inputMilliseconds.value=(valNum*604800000).toFixed();
    inputSecond.value=(valNum*604800).toFixed();
    inputMinutes.value=(valNum*10080).toFixed();
    inputHours.value=(valNum*168).toFixed();
    inputDays.value=(valNum*7).toFixed();
    inputYears.value=(valNum*0.019165).toFixed(6);
  }
  if (source=="inputYears") {
    inputMicroseconds.value=(valNum*31557600000000).toFixed();
    inputMilliseconds.value=(valNum*31557600000).toFixed();
    inputSecond.value=(valNum*31557600).toFixed();
    inputMinutes.value=(valNum*525960).toFixed();
    inputHours.value=(valNum*8766).toFixed();
    inputDays.value=(valNum*365.25).toFixed(2);
    inputWeeks.value=(valNum*52.17857).toFixed(5);
  }
}
function Volume(source,valNum) {
  valNum = parseFloat(valNum);
  var inputMillilitres = document.getElementById("inputMillilitres");
  var inputCubiccentimetres = document.getElementById("inputCubiccentimetres");
  var inputCubicmetres = document.getElementById("inputCubicmetres");
  var inputLitres = document.getElementById("inputLitres");
  var inputCubicinches = document.getElementById("inputCubicinches");
  var inputCubicfeet = document.getElementById("inputCubicfeet");
  var inputCubicyards = document.getElementById("inputCubicyards");
  var inputCentlitre = document.getElementById("inputCentlitre");
  var inputDecilitre = document.getElementById("inputDecilitre");
  var inputDecalitre = document.getElementById("inputDecalitre");
  var inputKilolitre = document.getElementById("inputKilolitre");
  var inputCentlitre = document.getElementById("inputCentlitre");
  
  if (source=="inputMillilitres") {
    inputLitres.value=(valNum*0.001).toFixed(3);
    inputCubicmetres.value=(valNum*0.000001).toFixed(6);
    inputCubicyards.value=(valNum*0.000001).toFixed(6);
    inputCubiccentimetres.value=(valNum*1).toFixed();
    inputCubicfeet.value=(valNum*0.000035).toFixed(6);
    inputCubicinches.value=(valNum*0.061024).toFixed(6);
    inputCentlitre.value=(valNum*0.1).toFixed(2);
    inputDecilitre.value=(valNum*0.01).toFixed(2);
    inputDecalitre.value=(valNum*0.0001).toFixed(4);
    inputHectolitre.value=(valNum*0.00001).toFixed(5);
    inputKilolitre.value=(valNum*0.000001).toFixed(6);
  }
  
  if (source=="inputCubicmetres") {
    inputMillilitres.value=(valNum*1000000).toFixed();
    inputCubiccentimetres.value=(valNum*1000000).toFixed();
    inputLitres.value=(valNum*1000).toFixed();
    inputCubicfeet.value=(valNum*35.31467).toFixed(5);
    inputCubicyards.value=(valNum*1.307951).toFixed(6);
    inputCubicinches.value=(valNum*61023.74).toFixed(2);
    inputCentlitre.value=(valNum*100000).toFixed();
    inputDecilitre.value=(valNum*10000).toFixed();
    inputDecalitre.value=(valNum*100).toFixed();
    inputHectolitre.value=(valNum*10).toFixed();
    inputKilolitre.value=(valNum*1).toFixed();
    
  }
  if (source=="inputCubiccentimetres") {
    inputMillilitres.value=(valNum*1).toFixed();
    inputCubicmetres.value=(valNum*0.000001).toFixed(6);
    inputLitres.value=(valNum*0.001).toFixed(3);
    inputCubicyards.value=(valNum*0.00000).toFixed(6);
    inputCubicfeet.value=(valNum*0.000035).toFixed(6);
    inputCubicinches.value=(valNum*0.061024).toFixed(6);
    inputCentlitre.value=(valNum*0.1).toFixed(1);
    inputDecilitre.value=(valNum*0.01).toFixed(2);
    inputDecalitre.value=(valNum*0.0001).toFixed(4);
    inputHectolitre.value=(valNum*0.00001).toFixed(5);
    inputKilolitre.value=(valNum*0.000001).toFixed(6);
  }
  if (source=="inputLitres") {
    inputMillilitres.value=(valNum*1000).toFixed();
    inputCubiccentimetres.value=(valNum*1000).toFixed();
    inputCubicmetres.value=(valNum*0.001).toFixed(3);
    inputCubicfeet.value=(valNum*0.035315).toFixed(6);
    inputCubicyards.value=(valNum*0.001308).toFixed(6);
    inputCubicinches.value=(valNum*61.02374).toFixed(5);
    inputCentlitre.value=(valNum*100).toFixed();
    inputDecilitre.value=(valNum*10).toFixed();
    inputDecalitre.value=(valNum*0.1).toFixed(1);
    inputHectolitre.value=(valNum*0.01).toFixed(2);
    inputKilolitre.value=(valNum*0.001).toFixed(3);
  }
  if (source=="inputCubicfeet") {
    inputMillilitres.value=(valNum*28316.85).toFixed(2);
    inputCubiccentimetres.value=(valNum*28316.85).toFixed(2);
    inputCubicmetres.value=(valNum*0.028316).toFixed(6);
    inputLitres.value=(valNum*28.31685).toFixed(5);
    inputCubicyards.value=(valNum*0.037037).toFixed(6);
    inputCubicinches.value=(valNum*1728).toFixed();
    inputCentlitre.value=(valNum*2831.6846592).toFixed(7);
    inputDecilitre.value=(valNum*283.16846592).toFixed(8);
    inputDecalitre.value=(valNum*2.8316846592).toFixed(10);
    inputHectolitre.value=(valNum*0.2831684659).toFixed(10);
    inputKilolitre.value=(valNum*0.0283168466).toFixed(10);
  }
  if (source=="inputCubicyards") {
    inputMillilitres.value=(valNum*764554.9).toFixed(1);
    inputCubiccentimetres.value=(valNum*764554.9).toFixed(1);
    inputCubicmetres.value=(valNum*0.764555).toFixed(6);
    inputLitres.value=(valNum*764.5549).toFixed(4);
    inputCubicfeet.value=(valNum*27).toFixed();
    inputCubicinches.value=(valNum*46656).toFixed();
    inputCentlitre.value=(valNum*76455.485798).toFixed(6);
    inputDecilitre.value=(valNum*7645.5485798).toFixed(7);
    inputDecalitre.value=(valNum*76.455485798).toFixed(9);
    inputHectolitre.value=(valNum*7.6455485798).toFixed(10);
    inputKilolitre.value=(valNum*0.764554858).toFixed(9);
  }
  if (source=="inputCubicinches") {
    inputMillilitres.value=(valNum*16.38706).toFixed(5);
    inputCubiccentimetres.value=(valNum*16.38706).toFixed(5);
    inputCubicmetres.value=(valNum*60.000016).toFixed(4);
    inputLitres.value=(valNum*0.016387).toFixed(6);
    inputCubicfeet.value=(valNum*0.000579).toFixed(6);
    inputCubicyards.value=(valNum*0.000021).toFixed(6);
    inputCentlitre.value=(valNum*1.6387064).toFixed(7);
    inputDecilitre.value=(valNum*0.16387064).toFixed(8);
    inputDecalitre.value=(valNum*0.0016387064).toFixed(10);
    inputHectolitre.value=(valNum*0.0001638706).toFixed(10);
    inputKilolitre.value=(valNum*0.0000163871).toFixed(10);
  }
  if (source=="inputCentlitre") {
    inputMillilitres.value=(valNum*10).toFixed();
    inputCubiccentimetres.value=(valNum*10).toFixed();
    inputCubicmetres.value=(valNum*0.00001).toFixed(5);
    inputLitres.value=(valNum*0.01).toFixed(2);
    inputCubicfeet.value=(valNum*0.0003531467).toFixed(10);
    inputCubicyards.value=(valNum*0.0000130795).toFixed(10);
    inputCubicinches.value=(valNum*0.6102374409).toFixed(10);
    inputDecilitre.value=(valNum*0.1).toFixed(1);
    inputDecalitre.value=(valNum*0.001).toFixed(3);
    inputHectolitre.value=(valNum*0.0001).toFixed(4);
    inputKilolitre.value=(valNum*0.00001).toFixed(5);
  }
  if (source=="inputDecilitre") {
    inputMillilitres.value=(valNum*100).toFixed();
    inputCubiccentimetres.value=(valNum*100).toFixed();
    inputCubicmetres.value=(valNum*0.0001).toFixed(4);
    inputLitres.value=(valNum*0.1).toFixed(1);
    inputCubicfeet.value=(valNum*0.0035314667).toFixed(10);
    inputCubicyards.value=(valNum*0.0001307951).toFixed(10);
    inputCentlitre.value=(valNum*10).toFixed();
    inputCubicinches.value=(valNum*6.1023744095).toFixed(10);
    inputDecalitre.value=(valNum*0.01).toFixed(2);
    inputHectolitre.value=(valNum*0.001).toFixed(3);
    inputKilolitre.value=(valNum*0.0001).toFixed(4);
  }
  if (source=="inputDecalitre") {
    inputMillilitres.value=(valNum*10000).toFixed();
    inputCubiccentimetres.value=(valNum*10000).toFixed();
    inputCubicmetres.value=(valNum*0.01).toFixed(2);
    inputLitres.value=(valNum*10).toFixed();
    inputCubicfeet.value=(valNum*0.3531466672).toFixed(10);
    inputCubicyards.value=(valNum*0.0130795062).toFixed(10);
    inputCentlitre.value=(valNum*1000).toFixed();
    inputDecilitre.value=(valNum*100).toFixed();
    inputCubicinches.value=(valNum*610.23744095).toFixed(8);
    inputHectolitre.value=(valNum*0.1).toFixed(1);
    inputKilolitre.value=(valNum*0.01).toFixed(2);
  }
  if (source=="inputHectolitre") {
    inputMillilitres.value=(valNum*100000).toFixed();
    inputCubiccentimetres.value=(valNum*100000).toFixed();
    inputCubicmetres.value=(valNum*0.1).toFixed(1);
    inputLitres.value=(valNum*100).toFixed();
    inputCubicfeet.value=(valNum*3.5314666721).toFixed(10);
    inputCubicyards.value=(valNum*0.1307950619).toFixed(10);
    inputCentlitre.value=(valNum*10000).toFixed();
    inputDecilitre.value=(valNum*1000).toFixed();
    inputDecalitre.value=(valNum*10).toFixed();
    inputCubicinches.value=(valNum*6102.3744095).toFixed(7);
    inputKilolitre.value=(valNum*0.1).toFixed(1);
  }
  if (source=="inputKilolitre") {
    inputMillilitres.value=(valNum*1000000).toFixed();
    inputCubiccentimetres.value=(valNum*1000000).toFixed();
    inputCubicmetres.value=(valNum*1).toFixed();
    inputLitres.value=(valNum*1000).toFixed();
    inputCubicfeet.value=(valNum*35.314666721).toFixed(9);
    inputCubicyards.value=(valNum*1.3079506193).toFixed(10);
    inputCentlitre.value=(valNum*100000).toFixed();
    inputDecilitre.value=(valNum*10000).toFixed();
    inputDecalitre.value=(valNum*100).toFixed();
    inputHectolitre.value=(valNum*10).toFixed();
    inputCubicinches.value=(valNum*61023.744095).toFixed(6);
  }
}  function filterQuestions() {
  var input = document.getElementById('filterInput').value.toLowerCase();
  var questions = document.querySelectorAll('.accordion-container .accordion');

  questions.forEach(function(question) {
      var text = question.textContent.toLowerCase();
      var panel = question.nextElementSibling;
      var panelText = panel.textContent.toLowerCase(); // Get text content of panel

      if (text.includes(input) || panelText.includes(input)) {
          question.style.display = 'block';
      } else {
          question.style.display = 'none';
          panel.style.display = 'none'; // Hide the panel if the question doesn't match
      }
  });
}

// Add event listener to the input field
document.getElementById('filterInput') 
