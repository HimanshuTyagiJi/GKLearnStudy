
// --- Firebase Module Placeholders ---
let db, addDocFn, collectionFn, deleteDocFn, queryFn, orderByFn, serverTimestampFn, docFn, runTransactionFn, onSnapshotFn, getDocFn, collectionGroupFn;
let auth, onAuthStateChangedFn, GoogleAuthProviderFn, signInWithPopupFn, signOutFn;

// --- State Variables ---
let currentUser = null;
let firebaseApp = null;
let isAuthInitialized = false;
let isFirestoreInitialized = false;
let authPromise = null;
let unsubscribeComments = null;
let allComments = []; // Global cache for comments
let activeReplyForm = null;

// The owner's Firebase UID.
const OWNER_UID = "Pq5f4jTfiEOJCtXBLG0mZyyikIC2"; 

// --- Dynamic Script Loader ---
function loadFirebaseScript(module) {
    const url = `https://www.gstatic.com/firebasejs/9.22.1/firebase-${module}.js`;
    return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${url}"]`);
        if (existingScript) {
            if (existingScript.dataset.loaded) resolve();
            else existingScript.addEventListener('load', resolve);
            return;
        }
        const script = document.createElement('script');
        script.src = url; script.type = "module";
        script.onload = () => { script.dataset.loaded = true; resolve(); };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// --- Firebase Initialization ---
async function initializeFirebaseApp() {
    if (firebaseApp) return;
    await loadFirebaseScript('app');
    const { initializeApp, getApps, getApp } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js');
    if (getApps().length === 0) {
        firebaseApp = initializeApp({
            apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
            authDomain: "appcomment.firebaseapp.com",
            projectId: "appcomment",
            storageBucket: "appcomment.firebasestorage.app",
            messagingSenderId: "156258808941",
            appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
        });
    } else {
        firebaseApp = getApp();
    }
}

async function initFirestore() {
    if (isFirestoreInitialized) return;
    await initializeFirebaseApp();
    await loadFirebaseScript('firestore');
    const firestore = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js");
    db = firestore.getFirestore(firebaseApp);
    addDocFn = firestore.addDoc; collectionFn = firestore.collection; 
    deleteDocFn = firestore.deleteDoc; queryFn = firestore.query; orderByFn = firestore.orderBy;
    serverTimestampFn = firestore.serverTimestamp; docFn = firestore.doc;
    runTransactionFn = firestore.runTransaction; onSnapshotFn = firestore.onSnapshot;
    getDocFn = firestore.getDoc; collectionGroupFn = firestore.collectionGroup;
    isFirestoreInitialized = true;
}

function initFirebaseAuth() {
    if (!authPromise) {
        authPromise = (async () => {
            await initializeFirebaseApp();
            await loadFirebaseScript('auth');
            const authModule = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js");
            auth = authModule.getAuth(firebaseApp);
            onAuthStateChangedFn = authModule.onAuthStateChanged;
            GoogleAuthProviderFn = authModule.GoogleAuthProvider;
            signInWithPopupFn = authModule.signInWithPopup;
            signOutFn = authModule.signOut;
            setupAuthObserver();
            isAuthInitialized = true;
        })();
    }
    return authPromise;
}

// ====== Helpers ======
const escapeHTML = s => String(s||'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
const fmtDate = d => {
  const p = n => String(n).padStart(2,'0');
  const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${p(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`;
};
const safeToDate = ts => ts?.toDate?.() ?? new Date();

// ====== DOM Elements ======
const dashboardAuthPrompt = document.getElementById('dashboard-auth-prompt');
const customCommentSection = document.getElementById('custom-comment-section');
const authContainer = document.getElementById('auth-container');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const ownerView = document.getElementById('owner-view');
const nonOwnerMessage = document.getElementById('non-owner-message');
const mainFormShell = document.getElementById('comment-form-shell');

// ====== Auth Functions ======
async function signInWithGoogle() {
    try {
        await initFirebaseAuth();
        const provider = new GoogleAuthProviderFn();
        await signInWithPopupFn(auth, provider);
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        if (error.code !== 'auth/popup-closed-by-user') {
            alert("Could not sign in with Google.");
        }
    }
}
async function signOutUser() { if (isAuthInitialized) await signOutFn(auth); }

loginBtn.addEventListener('click', signInWithGoogle);
logoutBtn.addEventListener('click', signOutUser);

function setupAuthObserver() {
    onAuthStateChangedFn(auth, user => {
        currentUser = user;
        dashboardAuthPrompt.style.display = user ? 'none' : 'block';
        customCommentSection.style.display = user ? 'block' : 'none';

        if (user) {
            userInfo.innerHTML = `<img src="${user.photoURL}" alt="${escapeHTML(user.displayName)}" class="user-avatar"><span class="user-name">${escapeHTML(user.displayName)}</span>`;
            authContainer.classList.add('logged-in');

            if (user.uid === OWNER_UID) {
                ownerView.style.display = 'block';
                nonOwnerMessage.style.display = 'none';
                if (!unsubscribeComments) { // Start loading comments only if owner logs in
                    loadAllComments();
                }
            } else {
                ownerView.style.display = 'none';
                nonOwnerMessage.style.display = 'block';
                if (unsubscribeComments) { // Stop listener if a non-owner logs in
                    unsubscribeComments();
                    unsubscribeComments = null;
                }
            }
        } else {
            authContainer.classList.remove('logged-in');
            ownerView.innerHTML = '<div class="spinner"></div>'; // Clear view on logout
            if (unsubscribeComments) {
                unsubscribeComments();
                unsubscribeComments = null;
            }
        }
    });
}

// ====== Comment Tree & Rendering Logic ======
const buildTree = items => {
  const byId = {};
  items.forEach(it => (it.children = [], byId[it.id] = it));
  const roots = [];
  items.forEach(it => it.parentId && byId[it.parentId] ? byId[it.parentId].children.push(it) : roots.push(it));
  return roots;
};
const flattenTree = nodes => {
  const res = [];
  (function trav(n,d){
    for(const x of n){ x.depth = d; res.push(x); if(x.children?.length) trav(x.children,d+1); }
  })(nodes,0);
  return res;
};

function renderNode(node){
  const li = document.createElement('div');
  li.className = 'comment-item';
  li.dataset.pageId = node.pageId; // Store pageId for replies
  if (node.depth > 0) li.classList.add('reply-item');
  
  const isOwner = currentUser && currentUser.uid === OWNER_UID;
  const isCommentOwner = node.uid === OWNER_UID;
  if (isCommentOwner) li.classList.add('owner-comment');

  const authorName = isCommentOwner ? 'GK Learn Study' : escapeHTML(node.name);
  const verificationBadge = isCommentOwner ? `<span class="verified-badge" title="Verified Owner"><svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></span>` : '';
  
  const ownerAvatarSVG = `<svg class="comment-avatar owner-avatar" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="owner-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#641ef9;"/><stop offset="100%" style="stop-color:#c0a4fb;"/></linearGradient></defs><circle cx="20" cy="20" r="20" fill="url(#owner-grad)"/><text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="12" font-weight="bold" fill="white" font-family="Arial, sans-serif">GK</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-size="5" fill="white" font-family="Arial, sans-serif">Learn Study</text></svg>`;
  const authorAvatar = isCommentOwner 
    ? ownerAvatarSVG 
    : (node.photoURL ? `<img src="${escapeHTML(node.photoURL)}" alt="${escapeHTML(authorName)}" class="comment-avatar" loading="lazy">` : `<div class="comment-avatar default-avatar">${escapeHTML(node.name?.charAt(0) || 'A')}</div>`);

  const headerHTML = `<div class="comment-header"><div class="comment-author-info">${authorAvatar}<div class="comment-author">${authorName}${verificationBadge}</div></div><div class="comment-date">${fmtDate(safeToDate(node.timestamp))}</div></div>`;
  
  const showDeleteButton = currentUser && (currentUser.uid === node.uid || isOwner);

  const actionsHTML = `<div class="comment-actions" data-comment-id="${node.id}"><button class="btn small vote-btn like-btn">👍 <span class="count">${node.likes || 0}</span></button><button class="btn small vote-btn dislike-btn">👎 <span class="count">${node.dislikes || 0}</span></button><button class="btn small reply-btn" data-action="reply">Reply</button>${showDeleteButton ? `<button class="btn small danger delete-btn" data-action="delete">Delete</button>` : ''}</div>`;
  const inlineReplySlot = `<div class="inline-reply-slot"></div>`;
  
  const body = document.createElement('div');
  body.className = 'comment-body';
  body.textContent = node.comment || '';
  body.style.whiteSpace = 'pre-wrap';

  li.innerHTML = headerHTML;
  li.appendChild(body);
  li.insertAdjacentHTML('beforeend', actionsHTML + inlineReplySlot);
  
  return li;
}

function renderDashboard(comments) {
    if (!ownerView) return;

    // Group comments by pageId
    const groupedByPage = comments.reduce((acc, comment) => {
        const pageId = comment.pageId || 'unknown';
        if (!acc[pageId]) {
            acc[pageId] = [];
        }
        acc[pageId].push(comment);
        return acc;
    }, {});

    ownerView.innerHTML = ''; // Clear previous content

    if (Object.keys(groupedByPage).length === 0) {
        ownerView.innerHTML = '<p class="muted">No comments found across the site.</p>';
        return;
    }

    // Sort pages for consistent order, e.g., alphabetically
    const sortedPageIds = Object.keys(groupedByPage).sort();

    sortedPageIds.forEach(pageId => {
        const pageSection = document.createElement('section');
        pageSection.className = 'dashboard-page-section';

        const pageTitle = pageId === 'main_page' ? 'Home Page' : pageId.replace(/_/g, ' ');
        const pageUrl = pageId === 'main_page' ? '/' : `/${pageId.replace(/_/g, '/')}`;
        
        pageSection.innerHTML = `
            <h2 class="page-section-header">
                Comments on: <a href="${pageUrl}" target="_blank" rel="noopener noreferrer">${pageTitle}</a>
            </h2>
        `;

        const commentListContainer = document.createElement('div');
        commentListContainer.className = 'comment-list-container';
        pageSection.appendChild(commentListContainer);

        const pageComments = groupedByPage[pageId];
        const commentTree = buildTree(pageComments);
        const flattenedNodes = flattenTree(commentTree);
        
        flattenedNodes.forEach(node => {
            commentListContainer.appendChild(renderNode(node));
        });
        
        ownerView.appendChild(pageSection);
    });
}


// ====== Load ALL Comments with Real-Time Listener ======
async function loadAllComments(){
  try {
    await initFirestore();
    if (unsubscribeComments) unsubscribeComments();

    const q = queryFn(collectionGroupFn(db, 'comments'), orderByFn('timestamp','desc'));
    
    unsubscribeComments = onSnapshotFn(q, (snapshot) => {
        const newComments = [];
        snapshot.forEach(doc => {
            // Extract pageId from the document's path
            const pageId = doc.ref.parent.parent.id;
            newComments.push({ id: doc.id, pageId, ...doc.data() });
        });
        
        allComments = newComments; // Replace global cache
        renderDashboard(allComments); // Re-render the entire dashboard
        
    }, (error) => {
        console.error('Dashboard listener error:', error);
        ownerView.innerHTML = `<p class="muted error">Could not load comments.</p>`;
    });
  } catch(err){
    console.error('Error setting up dashboard listener:', err);
    ownerView.innerHTML = `<p class="muted error">Could not load comments.</p>`;
  }
}

// ====== Inline Reply Form Management ======
function closeActiveReplyForm() {
    if (activeReplyForm) {
        activeReplyForm.remove();
        activeReplyForm = null;
    }
}

function openReplyForm(commentId, authorName, targetSlot, pageId) {
    closeActiveReplyForm(); 

    const formClone = mainFormShell.cloneNode(true);
    formClone.id = ''; 
    formClone.style.display = 'block';

    const form = formClone.querySelector('form');
    const parentIdInput = form.querySelector('#parent-id');
    const pageIdInput = form.querySelector('#page-id'); // New hidden input
    const replyingToEl = form.querySelector('#replying-to');
    const cancelBtn = form.querySelector('#cancel-reply');
    const commentInput = form.querySelector('#comment');
    
    parentIdInput.value = commentId;
    pageIdInput.value = pageId; // Set the pageId for submission
    replyingToEl.innerHTML = `Replying to <strong>${escapeHTML(authorName)}</strong>`;
    replyingToEl.style.display = 'block';
    cancelBtn.style.display = 'inline-block';
    
    targetSlot.appendChild(formClone);
    activeReplyForm = formClone;
    commentInput.focus();
}

// ====== Delete Logic ======
async function deleteWithDescendants(rootId, pageId){
    const commentsForPage = allComments.filter(c => c.pageId === pageId);
    const toDeleteIds = new Set([rootId]);
    let added = true;
    while(added){
        added = false;
        for(const it of commentsForPage) {
            if(it.parentId && toDeleteIds.has(it.parentId) && !toDeleteIds.has(it.id)) { 
                toDeleteIds.add(it.id); 
                added = true; 
            }
        }
    }
    
    // Optimistic UI update
    allComments = allComments.filter(c => !toDeleteIds.has(c.id));
    renderDashboard(allComments);

    try {
        const deletePromises = [...toDeleteIds].map(id => 
            deleteDocFn(docFn(db, 'pages', pageId, 'comments', id))
        );
        await Promise.all(deletePromises);
    } catch (error) {
        console.error("Failed to delete comments:", error);
        // Note: Reverting state is complex here, a full reload might be simpler
        alert("Could not delete the comment. The view will refresh.");
        loadAllComments(); // Refresh data from server
    }
}

// ====== Delegated Event Listeners Setup ======
function setupDelegatedListeners() {
    customCommentSection.addEventListener('click', async (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        if (button.id === 'cancel-reply') {
             closeActiveReplyForm();
             return; 
        }
        
        const action = button.dataset.action;
        if (!action) return;
        
        const commentItem = button.closest('.comment-item');
        if (!commentItem) return;
        
        const commentId = button.closest('[data-comment-id]')?.dataset.commentId;
        const pageId = commentItem.dataset.pageId;

        if (!commentId || !pageId) return;

        const node = allComments.find(c => c.id === commentId);
        if (!node) return;

        switch (action) {
            case 'reply':
                const replySlot = commentItem.querySelector('.inline-reply-slot');
                openReplyForm(node.id, node.name, replySlot, pageId);
                break;
            case 'delete':
                if (confirm('Delete this comment and all its replies?')) {
                    deleteWithDescendants(node.id, pageId);
                }
                break;
        }
    });

    customCommentSection.addEventListener('submit', async e => {
        e.preventDefault();
        const form = e.target;
        if (!form.matches('.comment-form') || !currentUser) return;

        const commentInput = form.querySelector('#comment');
        const parentIdInput = form.querySelector('#parent-id');
        const pageIdInput = form.querySelector('#page-id');
        const submitButton = form.querySelector('#submit-button');
        
        const commentText = commentInput.value.trim();
        const parentId = parentIdInput.value;
        const pageId = pageIdInput.value;

        if (!commentText || !parentId || !pageId) return;

        submitButton.disabled = true;
        submitButton.innerHTML = `<span class="spinner-small"></span> Posting...`;
        
        try {
            const commentsPath = ['pages', pageId, 'comments'];
            await addDocFn(collectionFn(db, ...commentsPath), {
                name: currentUser.displayName, uid: currentUser.uid, photoURL: currentUser.photoURL,
                comment: commentText, timestamp: serverTimestampFn(), parentId: parentId,
                likes: 0, dislikes: 0, likedBy: [], dislikedBy: []
            });
            closeActiveReplyForm();
        } catch(err){
            console.error('Error adding reply:', err);
            alert('Could not post reply.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Reply';
        }
    });
}

// ====== Initializer ======
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initFirestore();
        await initFirebaseAuth(); 
        setupDelegatedListeners();
    } catch (error) {
        console.error("Failed to initialize dashboard:", error);
        if (dashboardAuthPrompt) dashboardAuthPrompt.textContent = "Could not load dashboard services.";
    }
});
