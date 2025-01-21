// Get the link list element
const linkList = document.getElementById('link-list');

// Links data
const links = [
  {name: "Mathematics All formulas", url: "https://gklearnstudy.in/mathematics-all-formulas"},
  {name: "Physics formulas", url: "https://gklearnstudy.in/physics-all-formulas"},
  {name: "Chemical formulas", url: "https://gklearnstudy.in/all-formulas/all-chemical-formulas"},
  {name: "Periodic table", url: "https://gklearnstudy.in/all-formulas/periodic-table"},
];

// Function to add links dynamically
function addLinks() {
    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.name;
        li.appendChild(a);
        linkList.appendChild(li);
    });
}

// Call the function to add links
addLinks();



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
