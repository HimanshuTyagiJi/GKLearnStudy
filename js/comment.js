let db, addDocFn, collectionFn, getDocsFn, deleteDocFn, queryFn, orderByFn, serverTimestampFn, docFn;
let auth, onAuthStateChangedFn, GoogleAuthProviderFn, signInWithRedirectFn, signOutFn, getRedirectResultFn;

let currentUser = null;
let firebaseApp = null;
let authInitialized = false;

// Initialize Firebase App
function initializeFirebaseApp() {
    if (firebaseApp) return firebaseApp;
    const { initializeApp } = window.firebase.app;
    firebaseApp = initializeApp({
        apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
        authDomain: "appcomment.firebaseapp.com",
        projectId: "appcomment",
        storageBucket: "appcomment.firebasestorage.app",
        messagingSenderId: "156258808941",
        appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
    });
    return firebaseApp;
}

// Lazy load Firebase services
async function loadFirebaseDependencies() {
    const firebaseAppScript = document.createElement('script');
    firebaseAppScript.src = "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
    document.head.appendChild(firebaseAppScript);

    await new Promise(resolve => firebaseAppScript.onload = resolve);
}


async function initFirestore() {
  if(db) return;
  const { getFirestore, addDoc, collection, getDocs, deleteDoc, query, orderBy, serverTimestamp, doc } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js");
  
  const app = initializeFirebaseApp();
  db = getFirestore(app);
  
  addDocFn = addDoc; collectionFn = collection; getDocsFn = getDocs;
  deleteDocFn = deleteDoc; queryFn = query; orderByFn = orderBy;
  serverTimestampFn = serverTimestamp; docFn = doc;
}

async function initFirebaseAuth() {
    if (authInitialized) return;
    const { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, signOut, getRedirectResult } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js");

    const app = initializeFirebaseApp();
    auth = getAuth(app);
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
    await initFirebaseAuth();
    const provider = new GoogleAuthProviderFn();
    try {
        await signInWithRedirectFn(auth, provider);
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        alert("Could not sign in with Google. Please try again.");
        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign in with Google to Comment';
    }
}

async function signOut() {
    await signOutFn(auth);
}

loginBtn.addEventListener('click', signInWithGoogle);
logoutBtn.addEventListener('click', signOut);

async function handleRedirectResult() {
    await initFirebaseAuth();
    try {
        const result = await getRedirectResultFn(auth);
        if (result) {
            // User just signed in.
            // The onAuthStateChanged observer will handle the UI update.
        }
    } catch (error) {
        console.error("Error handling redirect result:", error);
    }
    // Always set up the observer
    setupAuthObserver();
}

function setupAuthObserver() {
    onAuthStateChangedFn(auth, user => {
        currentUser = user;
        if (user) {
            userInfo.innerHTML = `
                <img src="${user.photoURL}" alt="${user.displayName}" class="user-avatar">
                <span class="user-name">${user.displayName}</span>
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
    ? `<img src="${node.photoURL}" alt="${escapeHTML(node.name)}" class="comment-avatar">`
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

// ====== Lazy Load Comments on Scroll ======
let commentsLoaded = false;
async function initCommentsIfNeeded(){
    if(commentsLoaded) return;
    commentsLoaded = true;

    // Load base firebase app first
    const appScript = document.createElement('script');
    appScript.src = "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
    document.head.appendChild(appScript);
    await new Promise(resolve => { appScript.onload = resolve });

    // Step 1: Init Firestore and load comments first for fast perceived performance
    await initFirestore();
    await loadComments();
    
    // Step 2: In parallel, check for auth redirect result and setup observer
    await handleRedirectResult();
}

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
    loginBtn.addEventListener('focus', initCommentsIfNeeded, { once: true });
}
