// =========================
//  Inject CSS dynamically
// =========================
const style = document.createElement("style");
style.innerHTML = `
#link-list { list-style:none; padding:0; margin:0; }

/* App Box */
.app-box {
    text-align:center;
    padding:15px;
    border-radius:10px;
    background: transparent;
    color:#fff;
    margin-top:15px;
}

/* App Icon */
.app-icon {
    width:75px;
    height:75px;
    border-radius:15px;
    margin-bottom:10px;
}

/* Main Title */
.app-box h3 {
    font-size:18px;
    margin:5px 0 3px 0;
}

/* Subtitle */
.small {
    font-size:13px;
    opacity:0.9;
    margin-bottom:8px;
}

/* Buttons */
.install-btn, .installed-btn, .uninstall-btn {
    width:100%;
    padding:10px;
    margin-top:8px;
    border-radius:8px;
    border:none;
    font-size:15px;
    cursor:pointer;
}

/* Install Button */
.install-btn {
    background:#4cd964;
    color:#000;
}

/* Installed Button */
.installed-btn {
    background:#3498db;
    color:#fff;
    cursor:default;
}

/* Uninstall Button */
.uninstall-btn {
    background:#e74c3c;
    color:#fff;
}

/* Coming Soon Title */
.coming-title {
    font-size:16px;
    margin-top:18px;
    margin-bottom:6px;
    font-weight:bold;
}

/* Coming Soon Items */
.coming-item {
    font-size:14px;
    opacity:0.85;
    padding:4px 0;
}
`;
document.head.appendChild(style);



// =========================
//  PWA INSTALL HANDLING
// =========================

const linkList = document.getElementById("link-list");

const APP_NAME = "GK Learn Study App";
const APP_ICON = "https://gklearnstudy.in/GK-Learn-Study.png";
const PWA_URL = "https://gklearnstudy.in/?source=pwa";

let deferredPrompt = null;
let isInstalled = false;

// Detect PWA install availability
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    renderAppBox();
});

// Detect app installed
window.addEventListener("appinstalled", () => {
    isInstalled = true;
    updateButtons();
});


// =========================
//  Render APP INSTALL BOX
// =========================
function renderAppBox() {
    linkList.innerHTML = `
        <li>
        <div class="app-box">
            <img src="${APP_ICON}" class="app-icon" alt="App Icon">

            <h3>${APP_NAME}</h3>
            <p class="small">अभी इंस्टॉल करें (PWA)</p>

            <button id="installBtn" class="install-btn">Install App</button>
            <button id="installedBtn" class="installed-btn" style="display:none;">Installed ✓</button>
            <button id="uninstallBtn" class="uninstall-btn" style="display:none;">Uninstall</button>

            <h4 class="coming-title">नई ऐप्स जल्द आ रही हैं</h4>
            <div class="coming-item">• GK Learn Study Test App</div>
            <div class="coming-item">• GK Learn Study NCERT Notes App</div>
            <div class="coming-item">• GK Learn Study Video App</div>
        </div>
        </li>
    `;

    document.getElementById("installBtn").onclick = installApp;
}


// =========================
//  Install App
// =========================
async function installApp() {
    if (!deferredPrompt) {
        window.location.href = PWA_URL;  // fallback: open app
        return;
    }

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
        console.log("App Installed");
    }

    deferredPrompt = null;
}


// =========================
//  Installed → Buttons Update
// =========================
function updateButtons() {
    document.getElementById("installBtn").style.display = "none";
    document.getElementById("installedBtn").style.display = "block";
    document.getElementById("uninstallBtn").style.display = "block";

    document.getElementById("uninstallBtn").onclick = () => {
        alert("अपने मोबाइल की होम स्क्रीन से ऐप को Long-Press करके Remove करें।\nBrowser uninstall सपोर्ट नहीं देता।");
    };
}


// Load UI initially
renderAppBox();
