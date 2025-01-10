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
    updateManifestIcon(defaultFaviconUrl);
}

function updateManifestIcon(iconUrl) {
    const manifestContent = {
        "short_name": "GK",
        "name": "GK Learn Study",
        "icons": [
            {
                "src": iconUrl,
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": iconUrl,
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#ffffff"
    };

    const manifestBlob = new Blob([JSON.stringify(manifestContent)], { type: 'application/json' });
    const manifestUrl = URL.createObjectURL(manifestBlob);

    const manifestLink = document.getElementById('manifest');
    if (manifestLink) {
        manifestLink.href = manifestUrl;
    } else {
        console.error("Manifest link element not found.");
    }
}

function updateUserIcon(initial) {
    const canvas = document.createElement('canvas');
    canvas.width = 192;
    canvas.height = 192;
    const ctx = canvas.getContext('2d');
    
    // Draw circular background and clip it
    ctx.beginPath();
    ctx.arc(96, 96, 96, 0, Math.PI * 2, true); // Full circle
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = '#007bff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text in the center
    ctx.font = '100px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initial, canvas.width / 2, canvas.height / 2);

    const newFaviconUrl = canvas.toDataURL('image/png');
    setFavicon(newFaviconUrl);
    updateManifestIcon(newFaviconUrl);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('userLoggedIn');
    if (savedUser) {
        const initial = savedUser.charAt(0).toUpperCase();
        updateUserIcon(initial);
    } else {
        resetFavicon();
    }
});

// Check if URL contains "index" or "index.html"
if (window.location.pathname === '/index' || window.location.pathname === '/index.html') {
    // Redirect to root
    window.location.href = '/';
}
