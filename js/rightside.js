const linkList = document.getElementById('link-list');
const links = [
  {name: "Mathematics All formulas", url: "https://gklearnstudy.in/mathematics-all-formulas"},
  {name: "Physics formulas", url: "https://gklearnstudy.in/physics-all-formulas"},
  {name: "Chemical formulas", url: "https://gklearnstudy.in/all-formulas/all-chemical-formulas"},
  {name: "Periodic table", url: "https://gklearnstudy.in/all-formulas/periodic-table"},
  {name: "Ancient Indian History", url: "https://gklearnstudy.in/gk-quiz/ancient-indian-history"},
  {name: "Medieval Indian History", url: "https://gklearnstudy.in/gk-quiz/medieval-indian-history"},
  {name: "Meodern Indian History", url: "https://gklearnstudy.in/gk-quiz/modern-indian-history"},
  {name: "World History", url: "https://gklearnstudy.in/gk-quiz/world-history"},
  {name: "Science & Technology", url: "https://gklearnstudy.in/gk-quiz/science-and-technology-mcq-quiz"},
  {name: "Rivers & Lakes", url: "https://gklearnstudy.in/gk-quiz/rivers-and-lakes-mcq-quiz"},
  {name: "Spacea & Universe", url: "https://gklearnstudy.in/gk-quiz/space-and-universe-mcq-quiz"},

];


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


addLinks();


function toggleMenu() {
  var menuList = document.getElementById('menuList');
  var menuToggle = document.querySelector('.menu-toggle');
  if (menuList.style.display === 'none' || menuList.style.display === '') {
    menuList.style.display = 'block';
    menuToggle.style.display = 'none';
    document.addEventListener('click', closeMenuOnClickOutside);
  } else {
    menuList.style.display = 'none';
    menuToggle.style.display = 'block'; 
    document.removeEventListener('click', closeMenuOnClickOutside);
  }
}


function closeMenuOnClickOutside(event) {
  var menuList = document.getElementById('menuList');
  var menuToggle = document.querySelector('.menu-toggle');
  if (!menuList.contains(event.target) && event.target !== menuToggle) {
    menuList.style.display = 'none';
    menuToggle.style.display = 'block'; 
    document.removeEventListener('click', closeMenuOnClickOutside);
  }
}
