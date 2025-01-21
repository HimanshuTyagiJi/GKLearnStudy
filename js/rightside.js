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
