// ================================
//  1️⃣  Inject CSS (no external file)
// ================================
const style = document.createElement("style");
style.innerHTML = `
#link-list { list-style:none; padding:0; margin:0; }

/* App Box */
.app-box {
    text-align:center;
    padding:15px;
    border-radius:12px;
    background:#111;
    color:#fff;
    margin-top:15px;
    border:1px solid #222;
}
.app-icon {
    width:80px;
    height:80px;
    border-radius:14px;
    margin-bottom:8px;
}
.app-box h3 {
    font-size:18px;
    margin:6px 0;
}
.small {
    font-size:13px;
    opacity:0.8;
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
.install-btn { background:#4cd964; color:#000; }
.installed-btn { background:#3498db; color:#fff; cursor:default; }
.uninstall-btn { background:#e74c3c; color:#fff; }

.playstore {
    display:block;
    margin-top:10px;
    color:#58a6ff;
    font-size:14px;
    text-decoration:none;
}
`;
document.head.appendChild(style);

// ================================
//  2️⃣  APP Install Logic
// ================================
const linkList = document.getElementById("link-list");

const APP_NAME = "GK Learn Study App";
const APP_ICON = "https://gklearnstudy.in/GK-Learn-Study.png";
const PLAYSTORE_URL = "#";  // Coming soon

let deferredPrompt = null;
let isInstalled = false;

// Capture install event
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    renderAppBox();
});

window.addEventListener("appinstalled", () => {
    isInstalled = true;
    updateButtons();
});

// ================================
//  3️⃣  Render App Box
// ================================
function renderAppBox() {
    linkList.innerHTML = `
        <li>
        <div class="app-box">
            <img src="${APP_ICON}" class="app-icon">
            <h3>${APP_NAME}</h3>
            <p class="small">Coming Soon on Play Store</p>

            <button id="installBtn" class="install-btn">Install</button>
            <button id="installedBtn" class="installed-btn" style="display:none;">Installed ✓</button>
            <button id="uninstallBtn" class="uninstall-btn" style="display:none;">Uninstall</button>

            <a href="${PLAYSTORE_URL}" class="playstore">Play Store (Coming Soon)</a>
        </div>
        </li>
    `;

    document.getElementById("installBtn").onclick = installApp;
}

// ================================
//  4️⃣  Install button action
// ================================
async function installApp() {
    if (!deferredPrompt) {
        alert("Browser install support nahi deta.");
        return;
    }
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
        console.log("App installed");
    }
    deferredPrompt = null;
}

// ================================
//  5️⃣  Buttons update after install
// ================================
function updateButtons() {
    document.getElementById("installBtn").style.display = "none";
    document.getElementById("installedBtn").style.display = "block";
    document.getElementById("uninstallBtn").style.display = "block";

    document.getElementById("uninstallBtn").onclick = () => {
        alert("Uninstall manually from Home Screen.\nBrowser auto-uninstall allow nahi karta.");
    };
}

// Load default box at start
renderAppBox();
