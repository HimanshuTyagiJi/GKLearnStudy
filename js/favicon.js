
        const defaultFaviconUrl = 'https://gklearnstudy.in/GK-Learn-Study.png';
        
    
function setFavicon(url) {
    let favicon = document.querySelector("link[rel~='icon']");
    if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
    }
    favicon.href = url;
}

function resetFavicon() {
    setFavicon(defaultFaviconUrl);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('userLoggedIn');
    if (savedUser) {
        const initial = savedUser.charAt(0).toUpperCase();
        console.log('User initial:', initial);
        resetFavicon(); // Placeholder फेविकॉन
    } else {
        resetFavicon();
    }
});

if (window.location.pathname === '/index' || window.location.pathname === '/index.html') {
    window.location.href = '/';
}

