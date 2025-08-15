// ==== Fully Block Firestore Listen Requests (No Console Error) ====
(function () {
  // Suppress console.error for Firestore listen timeouts
  const origConsoleError = console.error;
  console.error = function (...args) {
    if (args[0] && typeof args[0] === "string" && args[0].includes("Listen/channel")) {
      return; // skip error
    }
    return origConsoleError.apply(console, args);
  };

  // Block fetch calls
  const origFetch = window.fetch;
  window.fetch = function (url, opts) {
    if (typeof url === "string" && url.includes("firestore.googleapis.com") && url.includes("Listen/channel")) {
      console.warn("Blocked Firestore Listen request (fetch):", url);
      return Promise.resolve(new Response("{}", {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }));
    }
    return origFetch.apply(this, arguments);
  };

  // Block XHR calls
  const origOpen = XMLHttpRequest.prototype.open;
  const origSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url) {
    this.__blockFirestore = (
      typeof url === "string" &&
      url.includes("firestore.googleapis.com") &&
      url.includes("Listen/channel")
    );
    if (this.__blockFirestore) {
      console.warn("Blocked Firestore Listen request (XHR):", url);
    }
    return origOpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function (body) {
    if (this.__blockFirestore) {
      setTimeout(() => {
        if (this.onload) this.onload();
        if (this.onreadystatechange) {
          this.readyState = 4;
          this.status = 200;
          this.responseText = "{}";
          this.onreadystatechange();
        }
      }, 0);
      return;
    }
    return origSend.apply(this, arguments);
  };
})();


let db, addDocFn, collectionFn, getDocsFn, deleteDocFn, queryFn, orderByFn, serverTimestampFn, docFn;
async function initFirebase(){
  if(db) return db;
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js");
  const f = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js");
  db=f.getFirestore(initializeApp({
    apiKey:"AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain:"appcomment.firebaseapp.com",
    projectId:"appcomment",
    storageBucket:"appcomment.firebasestorage.app",
    messagingSenderId:"156258808941",
    appId:"1:156258808941:web:04a1f7470ac43657c7fb64"
  }));
  addDocFn=f.addDoc; collectionFn=f.collection; getDocsFn=f.getDocs;
  deleteDocFn=f.deleteDoc; queryFn=f.query; orderByFn=f.orderBy;
  serverTimestampFn=f.serverTimestamp; docFn=f.doc;
  return db;
}

// ====== Block Failed Firestore Requests ======
(function(){
  const origFetch = window.fetch;
  window.fetch = async function(...args){
    if (typeof args[0] === 'string' && args[0].includes("firestore.googleapis.com") && args[0].includes("/Listen/channel")) {
      console.warn("Blocked Firestore Listen request:", args[0]);
      return new Response("", {status: 204});
    }
    return origFetch.apply(this, args);
  };
})();

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
  const li = document.createElement('li');
  li.className = 'comment-item' + (node.depth ? ' reply-item' : '');
  const header = document.createElement('div');
  header.className = 'comment-header';
  const author = document.createElement('div');
  author.className = 'comment-author';
  author.textContent = node.name || 'Anonymous';
  const date = document.createElement('div');
  date.className = 'comment-date';
  date.textContent = fmtDate(safeToDate(node.timestamp));
  header.append(author, date);

  const body = document.createElement('div');
  body.className = 'comment-body';
  body.textContent = node.comment || '';
  body.style.whiteSpace = 'pre-wrap';

  const actions = document.createElement('div');
  actions.className = 'comment-actions';
  const replyBtn = document.createElement('button');
  replyBtn.type = 'button';
  replyBtn.className = 'btn small';
  replyBtn.textContent = 'Reply';
  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'btn small danger';
  delBtn.textContent = 'Delete';
  actions.append(replyBtn, delBtn);

  replyBtn.addEventListener('click', () => {
    parentIdInput.value = node.id;
    replyingToEl.style.display = 'block';
    replyingToEl.textContent = `Replying to ${escapeHTML(node.name||'Anonymous')}`;
    cancelBtn.style.display = 'inline-block';
    commentInput.placeholder = 'Write a reply…';
    commentInput.focus();
  });
  delBtn.addEventListener('click', async () => {
    if(!confirm('Delete this comment and all its replies?')) return;
    await deleteWithDescendants(node.id);
    await loadComments();
  });

  li.append(header, body, actions);
  return li;
}
function renderFlatList(nodes, container){
  const ul = document.createElement('ul');
  ul.className = 'comment-list';
  nodes.forEach(n => ul.appendChild(renderNode(n)));
  container.innerHTML = '';
  container.appendChild(ul);
}

// ====== Load Comments ======
async function loadComments(){
  commentsList.innerHTML = `<div class="spinner"></div><p class="muted">Loading…</p>`;
  try {
    await initFirebase();
    const q = queryFn(collectionFn(db, ...commentsPath), orderByFn('timestamp','desc'));
    const snap = await getDocsFn(q);
    const rows = [];
    snap.forEach(d => rows.push({id:d.id, ...d.data()}));
    renderFlatList(flattenTree(buildTree(rows)), commentsList);
  } catch(err){
    console.error('Error loading comments:', err);
    commentsList.innerHTML = `<p class="muted error">Could not load comments.</p>`;
  }
}

// ====== Delete Recursive ======
async function deleteWithDescendants(rootId){
  await initFirebase();
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
  if(!nameInput.value.trim() || !commentInput.value.trim()) return;
  submitButton.disabled = true;
  submitButton.textContent = 'Posting…';
  try {
    await initFirebase();
    await addDocFn(collectionFn(db,...commentsPath), {
      name: nameInput.value.trim(),
      comment: commentInput.value.trim(),
      timestamp: serverTimestampFn(),
      parentId: parentIdInput.value || null
    });
    form.reset();
    charCounter.textContent = `0 / ${commentInput.maxLength}`;
    replyingToEl.style.display = 'none';
    cancelBtn.style.display = 'none';
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

// ====== Lazy Load Comments ======
const commentSection = document.getElementById('custom-comment-section');
let commentsLoaded = false;
function initCommentsIfNeeded(){
  if(commentsLoaded) return;
  commentsLoaded = true;
  loadComments();
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      initCommentsIfNeeded();
      observer.disconnect();
    }
  });
}, { rootMargin: "200px" });
observer.observe(commentSection);

// Agar user bina scroll kare submit kare
form.addEventListener('focusin', initCommentsIfNeeded);





