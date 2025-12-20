import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAij67tprGMKb7SGJ8v1BNVVqfilUmyHP0",
    authDomain: "gklearnstudy-c298c.firebaseapp.com",
    projectId: "gklearnstudy-c298c",
    storageBucket: "gklearnstudy-c298c.firebasestorage.app",
    messagingSenderId: "307990626713",
    appId: "1:307990626713:web:e7b650c718c0cade4e5308",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async () => {
    const sidebar = document.getElementById("topic-sidebar");
    const sidebarToggle = document.getElementById("topic-sidebar-toggle");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const sidebarNav = document.getElementById("topic-nav");

    // 1. Mobile Toggle Logic (OLD CODE PRESERVED)
    function closeMobileSidebar() {
        if (sidebar) sidebar.classList.remove("is-open");
        if (sidebarOverlay) sidebarOverlay.classList.remove("is-open");
    }

    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("is-open");
            sidebarOverlay.classList.toggle("is-open");
        });
        sidebarOverlay.addEventListener("click", closeMobileSidebar);
    }

    // 2. Automated Sidebar Logic - Fetch ALL posts in this category
    const metaCat = document.querySelector('meta[property="article:section"]');
    const currentCategory = metaCat ? metaCat.content.trim() : "";

    if (currentCategory && sidebarNav) {
        const sidebarTitle = document.querySelector(".sidebar-title");
        if (sidebarTitle) sidebarTitle.textContent = currentCategory;

        try {
            // Query for all posts belonging to the meta category
            const q = query(
                collection(db, "published_posts"),
                where("category", "==", currentCategory),
                orderBy("date", "asc")
            );

            const snap = await getDocs(q);
            const ul = document.createElement('ul');

            if (!snap.empty) {
                snap.forEach(doc => {
                    const post = doc.data();
                    const li = document.createElement('li');
                    
                    // Logic to mark active link
                    const currentPath = window.location.pathname;
                    const postPath = post.url.startsWith('/') ? post.url : '/' + post.url;
                    const isActive = currentPath.includes(postPath) || (currentPath === '/' && postPath === '/index.html');
                    
                    li.innerHTML = `<a href="${post.url}" class="${isActive ? 'active' : ''}">${post.title}</a>`;
                    ul.appendChild(li);
                });
                sidebarNav.innerHTML = ''; 
                sidebarNav.appendChild(ul);
            } else {
                console.log("No other posts found for category:", currentCategory);
            }
        } catch (e) { 
            console.error("Auto-Sidebar Error:", e); 
        }
    }
    
    // Move Sidebar Logic for Mobile (PRESERVED)
    function moveSidebarForMobile() {
        const rightSidebar = document.getElementById("right-sidebar");
        const commentsBlock = document.getElementById("comments-and-ratings-container");
        if (!rightSidebar || !commentsBlock) return;
        if (window.innerWidth <= 768) {
            if (rightSidebar.parentNode !== commentsBlock.parentNode) {
                commentsBlock.parentNode.insertBefore(rightSidebar, commentsBlock);
            }
        } else {
            if (rightSidebar.parentNode !== document.body) {
                document.body.appendChild(rightSidebar);
            }
        }
    }
    moveSidebarForMobile();
    window.addEventListener("resize", moveSidebarForMobile);
});
