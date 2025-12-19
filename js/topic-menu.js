
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

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async () => {
    const sidebar = document.getElementById("topic-sidebar");
    const sidebarToggle = document.getElementById("topic-sidebar-toggle");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const sidebarNav = document.getElementById("topic-nav");
    const sidebarTitle = document.querySelector(".sidebar-title");

    // 1. Mobile Toggle Logic
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

    // 2. AUTO-FETCH LINKS FROM FIREBASE
    async function populateSidebarAutomatically() {
        if (!sidebarNav) return;

        // Detect current category from meta tag
        const metaCat = document.querySelector('meta[property="article:section"]');
        const currentCategory = metaCat ? metaCat.content.trim() : "";

        if (!currentCategory) {
            console.warn("Category meta tag not found. Sidebar will remain empty.");
            return;
        }

        // Update Sidebar Title to Category Name
        if (sidebarTitle) sidebarTitle.textContent = currentCategory;

        try {
            // Fetch all published posts in this category from Firestore
            const q = query(
                collection(db, "published_posts"),
                where("category", "==", currentCategory),
                orderBy("date", "asc") // Purane se naya
            );

            const querySnapshot = await getDocs(q);
            const ul = document.createElement('ul');

            if (querySnapshot.empty) {
                ul.innerHTML = '<li><span style="padding:10px; color:#999;">No related topics</span></li>';
            } else {
                querySnapshot.forEach((doc) => {
                    const post = doc.data();
                    const li = document.createElement('li');
                    // Check if current page is this link
                    const isActive = window.location.pathname.includes(post.url);
                    li.innerHTML = `<a href="${post.url}" class="${isActive ? 'active' : ''}">${post.title}</a>`;
                    ul.appendChild(li);
                });
            }

            // Replace existing static list with new dynamic list
            const oldUl = sidebarNav.querySelector('ul');
            if (oldUl) oldUl.remove();
            sidebarNav.appendChild(ul);

        } catch (error) {
            console.error("Error fetching dynamic sidebar links:", error);
        }
    }

    populateSidebarAutomatically();

    // Right Sidebar Mobile Move Logic (Existing)
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
