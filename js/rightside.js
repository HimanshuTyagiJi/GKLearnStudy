const style = document.createElement("style");
style.innerHTML = `
#link-list{list-style:none;padding:0;margin:0}
.app-box{text-align:center;padding:15px;border-radius:10px;background:transparent;color:#fff;margin-top:15px}
.app-icon{width:75px;height:75px;border-radius:15px;margin-bottom:10px}
.app-box h3{font-size:18px;margin:5px 0 3px 0}
.small{font-size:13px;opacity:.9;margin-bottom:8px}
.install-btn,.installed-btn,.uninstall-btn{width:100%;padding:10px;margin-top:8px;border-radius:8px;border:none;font-size:15px;cursor:pointer}
.install-btn{background:#4cd964;color:#000}
.installed-btn{background:#3498db;color:#fff;cursor:default}
.uninstall-btn{background:#e74c3c;color:#fff}
.coming-title{font-size:15px;margin-top:18px;opacity:.9}
`;
document.head.appendChild(style);

const linkList = document.getElementById("link-list");
const APP_NAME = "GK Learn Study App";
const APP_ICON = "https://gklearnstudy.in/GK-Learn-Study.png";
const PWA_URL = "https://gklearnstudy.in/?source=pwa";

let deferredPrompt = null;

function renderAppBox() {
  if (!linkList) return;
  linkList.innerHTML = `
    <li>
      <div class="app-box">
        <img src="${APP_ICON}" class="app-icon">
        <h3>${APP_NAME}</h3>
        <p class="small">Install our PWA App</p>
        <button id="installBtn" class="install-btn">Install App</button>
        <button id="installedBtn" class="installed-btn" style="display:none">Installed ✓</button>
        <button id="uninstallBtn" class="uninstall-btn" style="display:none">Uninstall</button>
        <p class="coming-title">More apps are coming soon...</p>
      </div>
    </li>
  `;
  document.getElementById("installBtn").onclick = installApp;
}

if (linkList) renderAppBox();

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
});

window.addEventListener("appinstalled", () => {
  const i = document.getElementById("installBtn");
  const d = document.getElementById("installedBtn");
  const u = document.getElementById("uninstallBtn");
  if (i && d && u) {
    i.style.display = "none";
    d.style.display = "block";
    u.style.display = "block";
  }
});

async function installApp() {
  if (!deferredPrompt) {
    location.href = PWA_URL;
    return;
  }
  deferredPrompt.prompt();
  deferredPrompt = null;
}

function toggleMenu() {
  const m = document.getElementById("menuList");
  const b = document.querySelector(".menu-toggle");
  if (!m || !b) return;
  m.classList.toggle("open");
  b.classList.toggle("open");
}

function setMenuMode() {
  const m = document.getElementById("menuList");
  const b = document.querySelector(".menu-toggle");
  if (!m || !b) return;
  if (window.innerWidth >= 769) {
    m.classList.add("open");
    b.style.display = "none";
  } else {
    m.classList.remove("open");
    b.style.display = "inline-block";
  }
}

window.addEventListener("resize", setMenuMode);
window.addEventListener("load", setMenuMode);

document.addEventListener("DOMContentLoaded", () => {
  const h = document.head;

  if (!document.querySelector('meta[name="google-adsense-account"]')) {
    const m = document.createElement("meta");
    m.name = "google-adsense-account";
    m.content = "ca-pub-7067722696020503";
    h.appendChild(m);
  }

  if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7067722696020503";
    s.crossOrigin = "anonymous";
    h.appendChild(s);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 768) return;
  if (document.getElementById("auto-vertical-ad")) return;

  function injectAd() {
    if (!window.adsbygoogle || !Array.isArray(window.adsbygoogle)) {
      setTimeout(injectAd, 300);
      return;
    }

    const aside = document.createElement("aside");
    aside.id = "auto-vertical-ad";
    aside.style.margin = "20px auto";

    aside.innerHTML = `
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-7067722696020503"
        data-ad-slot="8188086907"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    `;

    // 🔥 YAHI MAIN FIX HAI
    // body ke FIRST CHILD ke turant baad
    document.body.insertBefore(aside, document.body.firstChild);

    window.adsbygoogle.push({});
  }

  injectAd();
});
