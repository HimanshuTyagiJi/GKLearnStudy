let db, addDocFn, collectionFn, getDocsFn, deleteDocFn, queryFn, orderByFn, serverTimestampFn, docFn;
let auth, onAuthStateChangedFn, GoogleAuthProviderFn, signInWithRedirectFn, signOutFn, getRedirectResultFn;

let currentUser = null;
let firebaseApp = null;
let authInitialized = false;
let firestoreInitialized = false;

// Initialize Firebase App
function initializeFirebaseApp() {
    if (firebaseApp) return firebaseApp;
    // Dynamically load the base firebase-app script if not already present
    if (!window.firebase || !window.firebase.app) {
        return new Promise((resolve, reject) => {
            const firebaseAppScript = document.createElement('script');
            firebaseAppScript.src = "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
            firebaseAppScript.onload = () => {
                const { initializeApp } = window.firebase.app;
                firebaseApp = initializeApp({
                    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
                    authDomain: "appcomment.firebaseapp.com",
                    projectId: "appcomment",
                    storageBucket: "appcomment.firebasestorage.app",
                    messagingSenderId: "156258808941",
                    appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
                });
                resolve(firebaseApp);
            };
            firebaseAppScript.onerror = reject;
            document.head.appendChild(firebaseAppScript);
        });
    } else {
        const { initializeApp } = window.firebase.app;
        firebaseApp = initializeApp({
            apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
            authDomain: "appcomment.firebaseapp.com",
            projectId: "appcomment",
            storageBucket: "appcomment.firebasestorage.app",
            messagingSenderId: "156258808941",
            appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
        });
        return Promise.resolve(firebaseApp);
    }
}


async function initFirestore() {
  if(firestoreInitialized) return;
  const { getFirestore, addDoc, collection, getDocs, deleteDoc, query, orderBy, serverTimestamp, doc } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js");
  
  await initializeFirebaseApp();
  db = getFirestore(firebaseApp);
  
  addDocFn = addDoc; collectionFn = collection; getDocsFn = getDocs;
  deleteDocFn = deleteDoc; queryFn = query; orderByFn = orderBy;
  serverTimestampFn = serverTimestamp; docFn = doc;
  firestoreInitialized = true;
}

async function initFirebaseAuth() {
    if (authInitialized) return;
    const { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, signOut, getRedirectResult } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js");

    await initializeFirebaseApp();
    auth = getAuth(firebaseApp);
    onAuthStateChangedFn = onAuthStateChanged;
    GoogleAuthProviderFn = GoogleAuthProvider;
    signInWithRedirectFn = signInWithRedirect;
    signOutFn = signOut;
    getRedirectResultFn = getRedirectResult;
    authInitialized = true;
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

// ====== DOM ======
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

// ====== Auth Functions ======
async function signInWithGoogle() {
    loginBtn.disabled = true;
    loginBtn.textContent = 'Redirecting...';
    try {
        await initFirebaseAuth();
        const provider = new GoogleAuthProviderFn();
        await signInWithRedirectFn(auth, provider);
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        alert("Could not sign in with Google. Please try again.");
        loginBtn.disabled = false;
        loginBtn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path><path d="M1 1h22v22H1z" fill="none"></path></svg> Sign in with Google to Comment`;
    }
}

async function signOutUser() {
    await initFirebaseAuth();
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
        }
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

// ====== Render ======
function renderNode(node){
  const li = document.createElement('div');
  li.className = 'comment-item' + (node.depth ? ' reply-item' : '');
  
  const authorAvatar = node.photoURL 
    ? `<img src="${escapeHTML(node.photoURL)}" alt="${escapeHTML(node.name)}" class="comment-avatar">`
    : `<div class="comment-avatar default-avatar">${escapeHTML(node.name?.charAt(0) || 'A')}</div>`;

  const headerHTML = `
    <div class="comment-header">
        <div class="comment-author-info">
            ${authorAvatar}
            <div class="comment-author">${escapeHTML(node.name) || 'Anonymous'}</div>
        </div>
        <div class="comment-date">${fmtDate(safeToDate(node.timestamp))}</div>
    </div>`;

  li.innerHTML = headerHTML;

  const body = document.createElement('div');
  body.className = 'comment-body';
  body.textContent = node.comment || '';
  body.style.whiteSpace = 'pre-wrap';

  const actions = document.createElement('div');
  actions.className = 'comment-actions';
  
  if (currentUser) {
    const replyBtn = document.createElement('button');
    replyBtn.type = 'button';
    replyBtn.className = 'btn small';
    replyBtn.textContent = 'Reply';
    replyBtn.addEventListener('click', () => {
        parentIdInput.value = node.id;
        replyingToEl.style.display = 'block';
        replyingToEl.textContent = `Replying to ${escapeHTML(node.name||'Anonymous')}`;
        cancelBtn.style.display = 'inline-block';
        commentInput.placeholder = 'Write a reply…';
        commentInput.focus();
    });
    actions.appendChild(replyBtn);
  }

  if (currentUser && currentUser.uid === node.uid) {
      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'btn small danger';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', async () => {
        if(!confirm('Delete this comment and all its replies?')) return;
        await deleteWithDescendants(node.id);
        await loadComments();
      });
      actions.appendChild(delBtn);
  }
  
  li.append(body, actions);
  return li;
}
function renderFlatList(nodes, container){
  container.innerHTML = ''; // Clear skeleton
  nodes.forEach(n => container.appendChild(renderNode(n)));
}

// ====== Load Comments ======
async function loadComments(){
  try {
    await initFirestore();
    const q = queryFn(collectionFn(db, ...commentsPath), orderByFn('timestamp','desc'));
    const snap = await getDocsFn(q);
    const rows = [];
    snap.forEach(d => rows.push({id:d.id, ...d.data()}));
    
    if (rows.length === 0) {
        commentsList.innerHTML = '<p class="muted">Be the first to comment!</p>';
    } else {
        renderFlatList(flattenTree(buildTree(rows)), commentsList);
    }
  } catch(err){
    console.error('Error loading comments:', err);
    commentsList.innerHTML = `<p class="muted error">Could not load comments.</p>`;
  } finally {
    if(commentsWrapper) commentsWrapper.classList.remove('comments-loading');
  }
}

// ====== Delete Recursive ======
async function deleteWithDescendants(rootId){
  await initFirestore();
  const q = queryFn(collectionFn(db,...commentsPath),orderByFn('timestamp','desc'));
  const snap = await getDocsFn(q);
  const all = [];
  snap.forEach(d=>all.push({id:d.id,...d.data()}));
  const toDelete = new Set([rootId]);
  let added = true;
  while(added){
    added = false;
    for(const it of all){
      if(it.parentId && toDelete.has(it.parentId) && !toDelete.has(it.id)){
        toDelete.add(it.id); added = true;
      }
    }
  }
  for(const id of toDelete) await deleteDocFn(docFn(db,...commentsPath,id));
}

// ====== Submit ======
form.addEventListener('submit', async e => {
  e.preventDefault();
  if(!currentUser || !commentInput.value.trim()) return;

  submitButton.disabled = true;
  submitButton.textContent = 'Posting…';
  try {
    await initFirestore();
    await addDocFn(collectionFn(db,...commentsPath), {
      name: currentUser.displayName,
      uid: currentUser.uid,
      photoURL: currentUser.photoURL,
      comment: commentInput.value.trim(),
      timestamp: serverTimestampFn(),
      parentId: parentIdInput.value || null
    });
    form.reset();
    commentInput.value = ''; // Ensure textarea is cleared
    charCounter.textContent = `0 / ${commentInput.maxLength}`;
    replyingToEl.style.display = 'none';
    cancelBtn.style.display = 'none';
    nameInput.value = currentUser.displayName; // Re-fill after reset
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


// ====== INITIALIZATION LOGIC ======

// 1. Initialize Auth immediately on script load to catch redirect results.
async function initializeAuthOnLoad() {
    try {
        await initFirebaseAuth();
        // This checks if the user is returning from a sign-in redirect
        await getRedirectResultFn(auth); 
        // This sets up a listener that will fire with the user's state
        // either from the redirect result, a stored session, or null.
        setupAuthObserver();
    } catch (error) {
        console.error("Auth initialization failed:", error);
    }
}

// 2. Lazy Load Comments on Scroll.
let commentsLoaded = false;
async function initCommentsIfNeeded(){
    if(commentsLoaded) return;
    commentsLoaded = true;

    // Firestore is now loaded only when comments are actually needed.
    await initFirestore();
    await loadComments();
}

// --- Start the process ---
document.addEventListener('DOMContentLoaded', () => {
    // Start auth check right away
    initializeAuthOnLoad();

    // Set up lazy loading for comments section
    if (commentsWrapper) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if(entry.isIntersecting){
              initCommentsIfNeeded();
              observer.disconnect();
            }
          });
        }, { rootMargin: "200px" });

        observer.observe(commentsWrapper);
    }
});
