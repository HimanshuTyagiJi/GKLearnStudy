/* =========================
   Inject CSS
========================= */
(function () {
  const css = document.createElement("style");
  css.innerHTML = `
    .menu-list{
      position: fixed;
      top: 60px;
      width: 16%;
      display: block;
      overflow-y: auto;
         height: 100%;
    border: 1px solid #ccc;
      left: 0;
      z-index: 0;
    }
    @media (max-width:768px){
      .menu-list{
        display:none !important;
      }
    }
    #link-list{list-style:none;padding:0;margin:0}
    .app-box{text-align:center;padding:15px;border-radius:10px;background:transparent;color:#fff;margin-top:15px}
    .app-icon{width:75px;height:75px;border-radius:15px;margin-bottom:10px}
    .app-box h3{font-size:18px;margin:5px 0 3px 0}
    .small{font-size:13px;opacity:.9;margin-bottom:8px}
    .install-btn,.installed-btn,.uninstall-btn{width:100%;padding:10px;margin-top:8px;border-radius:8px;border:none;font-size:15px;cursor:pointer}
    .install-btn{background:#4cd964;color:#000}
    .installed-btn{background:#3498db;color:#fff}
    .uninstall-btn{background:#e74c3c;color:#fff}
    .coming-title{font-size:15px;margin-top:18px;opacity:.9}
  `;
  document.head.appendChild(css);
})();

/* =========================
   APP INSTALL BOX
========================= */
const linkList = document.getElementById("link-list");
const APP_NAME = "GK Learn Study App";
const APP_ICON = "https://gklearnstudy.in/GK-Learn-Study.png";
const PWA_URL = "https://gklearnstudy.in/?source=pwa";
let deferredPrompt = null;

function renderAppBox(){
  if(!linkList) return;
  linkList.innerHTML = `
    <li>
      <div class="app-box">
        <img src="${APP_ICON}" class="app-icon" alt="GK Learn Study App Icon">
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
if(linkList) renderAppBox();

window.addEventListener("beforeinstallprompt", e=>{
  e.preventDefault();
  deferredPrompt = e;
});
window.addEventListener("appinstalled", ()=>{
  const i=document.getElementById("installBtn");
  const d=document.getElementById("installedBtn");
  const u=document.getElementById("uninstallBtn");
  if(i&&d&&u){
    i.style.display="none";
    d.style.display="block";
    u.style.display="block";
  }
});
async function installApp(){
  if(!deferredPrompt){
    location.href=PWA_URL;
    return;
  }
  deferredPrompt.prompt();
  deferredPrompt=null;
}

/* =========================
   LEFT SIDE ADS (MENU-LIST LOGIC)
========================= */
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
