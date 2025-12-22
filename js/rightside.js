/* =========================
   Inject CSS
========================= */
(function () {
  const css = document.createElement("style");
  css.innerHTML = `
  
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

