
// --- Firebase Module Placeholders ---
let db, addDocFn, collectionFn, getDocsFn, deleteDocFn, queryFn, orderByFn, serverTimestampFn, docFn, runTransactionFn;
let auth, onAuthStateChangedFn, GoogleAuthProviderFn, signInWithPopupFn, signOutFn;

// --- State Variables ---
let currentUser = null;
let firebaseApp = null;
let isAuthInitialized = false;
let isFirestoreInitialized = false;
let authPromise = null;

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
        script.src = url;
        script.type = "module";
        script.onload = () => { script.dataset.loaded = true; resolve(); };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// --- Firebase Initialization Functions ---
async function initializeFirebaseApp() {
    if (firebaseApp) return;
    await loadFirebaseScript('app');
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js');
    firebaseApp = initializeApp({
        apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
        authDomain: "appcomment.firebaseapp.com",
        projectId: "appcomment",
        storageBucket: "appcomment.firebasestorage.app",
        messagingSenderId: "156258808941",
        appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
    });
}

async function initFirestore() {
    if (isFirestoreInitialized) return;
    await initializeFirebaseApp();
    await loadFirebaseScript('firestore-lite');
    const firestore = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js");
    
    db = firestore.getFirestore(firebaseApp);
    addDocFn = firestore.addDoc; collectionFn = firestore.collection; getDocsFn = firestore.getDocs;
    deleteDocFn = firestore.deleteDoc; queryFn = firestore.query; orderByFn = firestore.orderBy;
    serverTimestampFn = firestore.serverTimestamp; docFn = firestore.doc;
    runTransactionFn = firestore.runTransaction;
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
const pageId = (() => {
  const p = location.pathname;
  return ['/','/index.html',''].includes(p) ? 'main_page' : p.replace(/^\//,'').replace(/\/$/,'').replace(/\//g,'_');
})();
const commentsPath = ['pages', pageId, 'comments'];

// ====== DOM Elements ======
const commentsList = document.getElementById('comments-list');
const form = document.getElementById('comment-form');
const nameInput = form.querySelector('#name');
const commentInput = form.querySelector('#comment');
const parentIdInput = form.querySelector('#parent-id');
const charCounter = form.querySelector('#char-counter');
const cancelBtn = form.querySelector('#cancel-reply');
const replyingToEl = form.querySelector('#replying-to');
const submitButton = form.querySelector('#submit-button');
const commentsWrapper = document.getElementById('comments-main-container');
const authContainer = document.getElementById('auth-container');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const commentFormShell = document.getElementById('comment-form-shell');
const loginPrompt = document.getElementById('login-prompt');
const originalLoginHTML = loginBtn.innerHTML;

// ====== Auth Functions ======
async function signInWithGoogle() {
    loginBtn.disabled = true;
    loginBtn.innerHTML = `<span class="spinner-small"></span> Connecting...`;
    
    try {
        await initFirebaseAuth();
        const provider = new GoogleAuthProviderFn();
        await signInWithPopupFn(auth, provider);
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        if (error.code !== 'auth/popup-closed-by-user') {
            alert("Could not sign in with Google. Please check your connection and try again.");
        }
    } finally {
        if (!currentUser) {
            loginBtn.disabled = false;
            loginBtn.innerHTML = originalLoginHTML;
        }
    }
}

async function signOutUser() {
    if (!isAuthInitialized) return;
    await signOutFn(auth);
}

loginBtn.addEventListener('click', signInWithGoogle);
logoutBtn.addEventListener('click', signOutUser);


function setupAuthObserver() {
    onAuthStateChangedFn(auth, user => {
        currentUser = user;
        if (user) {
            userInfo.innerHTML = `
                <img src="${user.photoURL}" alt="${escapeHTML(user.displayName)}" class="user-avatar">
                <span class="user-name">${escapeHTML(user.displayName)}</span>
            `;
            authContainer.classList.add('logged-in');
            commentFormShell.style.display = 'block';
            loginPrompt.style.display = 'none';
            nameInput.value = user.displayName;
            nameInput.readOnly = true;
        } else {
            authContainer.classList.remove('logged-in');
            commentFormShell.style.display = 'none';
            loginPrompt.style.display = 'block';
            nameInput.value = '';
            nameInput.readOnly = false;
            loginBtn.disabled = false;
            loginBtn.innerHTML = originalLoginHTML;
        }
        // Re-render comments to show/hide user-specific buttons
        loadComments();
    });
}

// ====== Char Counter ======
commentInput.addEventListener('input', () => {
  charCounter.textContent = `${commentInput.value.length} / ${commentInput.maxLength}`;
});
charCounter.textContent = `0 / ${commentInput.maxLength}`;

// ====== Build Comment Tree ======
function buildTree(items){
  const byId = {};
  items.forEach(it => (it.children = [], byId[it.id] = it));
  const roots = [];
  items.forEach(it => it.parentId && byId[it.parentId] ? byId[it.parentId].children.push(it) : roots.push(it));
  return roots;
}
function flattenTree(nodes){
  const res = [];
  (function trav(n,d){
    for(const x of n){
      x.depth = d;
      res.push(x);
      if(x.children?.length) trav(x.children,d+1);
    }
  })(nodes,0);
  return res;
}

let allComments = []; // Cache comments to avoid re-fetching

// ====== Render Comments ======
function renderNode(node){
  const li = document.createElement('div');
  li.className = 'comment-item' + (node.depth ? ' reply-item' : '');
  
  const authorAvatar = node.photoURL 
    ? `<img src="${escapeHTML(node.photoURL)}" alt="${escapeHTML(node.name)}" class="comment-avatar" loading="lazy">`
    : `<div class="comment-avatar default-avatar">${escapeHTML(node.name?.charAt(0) || 'A')}</div>`;

  const headerHTML = `
    <div class="comment-header">
        <div class="comment-author-info">
            ${authorAvatar}
            <div class="comment-author">${escapeHTML(node.name) || 'Anonymous'}</div>
        </div>
        <div class="comment-date">${fmtDate(safeToDate(node.timestamp))}</div>
    </div>`;
  
  const hasLiked = currentUser && node.likedBy?.includes(currentUser.uid);
  const hasDisliked = currentUser && node.dislikedBy?.includes(currentUser.uid);

  const actionsHTML = `
    <div class="comment-actions" data-comment-id="${node.id}">
        <button class="btn small vote-btn like-btn ${hasLiked ? 'voted' : ''}" data-action="like" aria-pressed="${!!hasLiked}">
            👍 <span class="count">${node.likes || 0}</span>
        </button>
        <button class="btn small vote-btn dislike-btn ${hasDisliked ? 'voted' : ''}" data-action="dislike" aria-pressed="${!!hasDisliked}">
            👎 <span class="count">${node.dislikes || 0}</span>
        </button>
        <button class="btn small reply-btn" data-action="reply">Reply</button>
        ${currentUser && currentUser.uid === node.uid ? `<button class="btn small danger delete-btn" data-action="delete">Delete</button>` : ''}
    </div>`;

  li.innerHTML = headerHTML;

  const body = document.createElement('div');
  body.className = 'comment-body';
  body.textContent = node.comment || '';
  body.style.whiteSpace = 'pre-wrap';
  
  li.append(body);
  li.insertAdjacentHTML('beforeend', actionsHTML);
  return li;
}
function renderFlatList(nodes, container){
  container.innerHTML = ''; 
  if (nodes.length > 0) {
      nodes.forEach(n => container.appendChild(renderNode(n)));
  } else {
      container.innerHTML = '<p class="muted">Be the first to comment!</p>';
  }
}

// ====== Load Comments ======
async function loadComments(){
  try {
    await initFirestore();
    const q = queryFn(collectionFn(db, ...commentsPath), orderByFn('timestamp','desc'));
    const snap = await getDocsFn(q);
    allComments = [];
    snap.forEach(d => allComments.push({id:d.id, ...d.data()}));
    
    renderFlatList(flattenTree(buildTree(allComments)), commentsList);
  } catch(err){
    console.error('Error loading comments:', err);
    commentsList.innerHTML = `<p class="muted error">Could not load comments. Check Firebase security rules.</p>`;
  } finally {
    if(commentsWrapper) commentsWrapper.classList.remove('comments-loading');
  }
}

// ====== Handle Actions using Event Delegation ======
commentsList.addEventListener('click', async (e) => {
    const button = e.target.closest('button[data-action]');
    if (!button) return;

    const action = button.dataset.action;
    const commentId = button.parentElement.dataset.commentId;

    if (!currentUser && (action === 'like' || action === 'dislike' || action === 'reply')) {
        signInWithGoogle();
        return;
    }
    
    const node = allComments.find(c => c.id === commentId);

    switch (action) {
        case 'reply':
            parentIdInput.value = node.id;
            replyingToEl.style.display = 'block';
            replyingToEl.textContent = `Replying to ${escapeHTML(node.name || 'Anonymous')}`;
            cancelBtn.style.display = 'inline-block';
            commentInput.placeholder = 'Write a reply…';
            commentInput.focus();
            break;
        case 'delete':
            if (confirm('Delete this comment and all its replies?')) {
                await deleteWithDescendants(node.id);
                await loadComments();
            }
            break;
        case 'like':
        case 'dislike':
            await handleVote(node.id, action);
            await loadComments();
            break;
    }
});

// ====== Voting Logic ======
async function handleVote(commentId, voteType) {
    const docRef = docFn(db, ...commentsPath, commentId);
    const uid = currentUser.uid;

    try {
        await runTransactionFn(db, async (transaction) => {
            const doc = await transaction.get(docRef);
            if (!doc.exists()) throw "Document does not exist!";

            const data = doc.data();
            const likedBy = data.likedBy || [];
            const dislikedBy = data.dislikedBy || [];

            const isLiked = likedBy.includes(uid);
            const isDisliked = dislikedBy.includes(uid);

            const newLikedBy = [...likedBy];
            const newDislikedBy = [...dislikedBy];

            if (voteType === 'like') {
                if (isLiked) { // Unlike
                    const index = newLikedBy.indexOf(uid);
                    newLikedBy.splice(index, 1);
                } else { // Like
                    newLikedBy.push(uid);
                    if (isDisliked) { // Remove from dislike if previously disliked
                        const index = newDislikedBy.indexOf(uid);
                        newDislikedBy.splice(index, 1);
                    }
                }
            } else if (voteType === 'dislike') {
                if (isDisliked) { // Undislike
                    const index = newDislikedBy.indexOf(uid);
                    newDislikedBy.splice(index, 1);
                } else { // Dislike
                    newDislikedBy.push(uid);
                    if (isLiked) { // Remove from like if previously liked
                        const index = newLikedBy.indexOf(uid);
                        newLikedBy.splice(index, 1);
                    }
                }
            }
            
            transaction.update(docRef, {
                likedBy: newLikedBy,
                dislikedBy: newDislikedBy,
                likes: newLikedBy.length,
                dislikes: newDislikedBy.length
            });
        });
    } catch (e) {
        console.error("Transaction failed: ", e);
    }
}


// ====== Delete Recursive ======
async function deleteWithDescendants(rootId){
  const toDelete = new Set([rootId]);
  let added = true;
  while(added){
    added = false;
    for(const it of allComments){
      if(it.parentId && toDelete.has(it.parentId) && !toDelete.has(it.id)){
        toDelete.add(it.id); added = true;
      }
    }
  }
  for(const id of toDelete) await deleteDocFn(docFn(db,...commentsPath,id));
}

// ====== Submit Comment ======
form.addEventListener('submit', async e => {
  e.preventDefault();
  if(!currentUser || !commentInput.value.trim()) {
      if (!currentUser) alert("Please sign in to post a comment.");
      return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Posting…';
  try {
    await addDocFn(collectionFn(db,...commentsPath), {
      name: currentUser.displayName,
      uid: currentUser.uid,
      photoURL: currentUser.photoURL,
      comment: commentInput.value.trim(),
      timestamp: serverTimestampFn(),
      parentId: parentIdInput.value || null,
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: []
    });
    form.reset();
    commentInput.value = '';
    charCounter.textContent = `0 / ${commentInput.maxLength}`;
    replyingToEl.style.display = 'none';
    cancelBtn.style.display = 'none';
    nameInput.value = currentUser.displayName;
    await loadComments();
  } catch(err){
    console.error('Error adding comment:', err);
    alert('Could not post comment.');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Post';
  }
});

cancelBtn.addEventListener('click', () => {
  parentIdInput.value = '';
  replyingToEl.style.display = 'none';
  cancelBtn.style.display = 'none';
  commentInput.placeholder = 'Your comment';
});


// ====== LAZY INITIALIZATION LOGIC ======
let commentsInitialized = false;

async function initializeCommentsSection() {
    if (commentsInitialized) return;
    commentsInitialized = true;

    try {
        await initFirestore();
        await loadComments();
        initFirebaseAuth(); 
    } catch (error) {
        console.error("Failed to initialize comments section:", error);
        if (commentsList) {
            commentsList.innerHTML = `<p class="muted error">Could not load the comments section.</p>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (commentsWrapper) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              initializeCommentsSection();
              observer.disconnect(); 
            }
          });
        }, { rootMargin: "200px" });

        observer.observe(commentsWrapper);
    }
});
