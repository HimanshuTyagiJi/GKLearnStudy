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

/* Coming Soon Section */
.coming-title {
    font-size:15px;
    margin-top:18px;
    opacity:0.9;
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

// Detect when installed
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
            <p class="small">Install our PWA App</p>

            <button id="installBtn" class="install-btn">Install App</button>
            <button id="installedBtn" class="installed-btn" style="display:none;">Installed ✓</button>
            <button id="uninstallBtn" class="uninstall-btn" style="display:none;">Uninstall</button>

            <p class="coming-title">More apps are coming soon...</p>
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
        window.location.href = PWA_URL;  // fallback
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
//  Update Buttons on Install
// =========================
function updateButtons() {
    document.getElementById("installBtn").style.display = "none";
    document.getElementById("installedBtn").style.display = "block";
    document.getElementById("uninstallBtn").style.display = "block";

    // Browser cannot uninstall PWAs → show info only
    document.getElementById("uninstallBtn").onclick = () => {
        alert("To uninstall, please remove the app from your device's home screen manually.");
    };
}


// Load the app box initially
renderAppBox();


function toggleMenu() {
    const menu = document.getElementById("menuList");
    const btn = document.querySelector(".menu-toggle");

    menu.classList.toggle("open");
    btn.classList.toggle("open");
}

// AUTO BEHAVIOR CONTROL
function setMenuMode() {
    const menu = document.getElementById("menuList");
    const btn = document.querySelector(".menu-toggle");

    if (window.innerWidth >= 769.01) {
        menu.classList.add("open");   // desktop always open
        btn.style.display = "none";   // hide button
    } else {
        menu.classList.remove("open"); // mobile starts closed
        btn.style.display = "inline-block"; // show button
    }
}

window.addEventListener("resize", setMenuMode);
window.addEventListener("load", setMenuMode);


document.addEventListener("DOMContentLoaded", function () {

  if(window.innerWidth <= 768) return;

  if(document.getElementById("menuList")) return;

  if(document.getElementById("auto-left-ad")) return;

  function injectAd(){
    if(!window.adsbygoogle || !Array.isArray(window.adsbygoogle)){
      setTimeout(injectAd,300);
      return;
    }

    const ul = document.createElement("ul");
    ul.className = "menu-list";
    ul.id = "auto-left-ad";

    ul.innerHTML = `
      <li>
      <ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7067722696020503"
     data-ad-slot="8188086907"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
      </li>
    `;

    const main = document.querySelector("main") || document.querySelector("article");
    if(main){
      document.body.insertBefore(ul, main);
    }else{
      document.body.insertBefore(ul, document.body.firstChild);
    }

    window.adsbygoogle.push({});
  }

  injectAd();
});

