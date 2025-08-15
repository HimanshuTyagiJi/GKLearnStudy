let db, addDocFn, collectionFn, getDocsFn, deleteDocFn, queryFn, orderByFn, docFn;

async function initFirebase() {
  if (db) return db;
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js");
  const f = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js");
  db = f.getFirestore(initializeApp({
    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain: "appcomment.firebaseapp.com",
    projectId: "appcomment",
    storageBucket: "appcomment.firebasestorage.app",
    messagingSenderId: "156258808941",
    appId: "1:156258808941:web:04a1f7470ac43657c7fb64",
    measurementId: "G-2HX1M5QQ44"
  }));
  addDocFn = f.addDoc;
  collectionFn = f.collection;
  getDocsFn = f.getDocs;
  deleteDocFn = f.deleteDoc;
  queryFn = f.query;
  orderByFn = f.orderBy;
  docFn = f.doc;
  return db;
}

// ================== Helpers ==================
const escapeHTML = s => String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
const pageId = (() => {
  const p = location.pathname;
  return ['/', '/index.html', ''].includes(p) ? 'main_page' : p.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '_');
})();
const commentsPath = ['pages', pageId, 'comments'];

// ================== DOM ==================
const commentsList = document.getElementById('comments-list');
const formShell = document.getElementById('comment-form-shell');
const form = document.getElementById('comment-form');
const nameInput = form.querySelector('#name');
const commentInput = form.querySelector('#comment');
const parentIdInput = form.querySelector('#parent-id');
const charCounter = form.querySelector('#char-counter');
const cancelBtn = form.querySelector('#cancel-reply');
const replyingToEl = form.querySelector('#replying-to');
const submitButton = form.querySelector('#submit-button');

// ================== Char Counter ==================
const updateCharCounter = () => charCounter.textContent = `${commentInput.value.length} / ${commentInput.maxLength}`;
commentInput.addEventListener('input', updateCharCounter);

// ================== Comment Tree ==================
function buildTree(items) {
  const byId = {};
  items.forEach(it => (it.children = [], byId[it.id] = it));
  const roots = [];
  items.forEach(it => it.parentId && byId[it.parentId] ? byId[it.parentId].children.push(it) : roots.push(it));
  return roots;
}
function flattenTree(nodes) {
  const res = [];
  function trav(n, d) { for (const x of n) { x.depth = d; res.push(x); if (x.children?.length) trav(x.children, d + 1); } }
  trav(nodes, 0);
  return res;
}

// ================== Render ==================
function renderNode(node) {
  const li = document.createElement('li');
  li.className = 'comment-item' + (node.depth ? ' reply-item' : '');
  li.setAttribute('role', 'listitem');

  const h = document.createElement('div'); h.className = 'comment-header';
  const a = document.createElement('div'); a.className = 'comment-author'; a.textContent = node.name || 'Anonymous';
  const dt = document.createElement('div'); dt.className = 'comment-date'; dt.textContent = node.timestamp; // ← saved India time
  h.append(a, dt);

  const b = document.createElement('div'); b.className = 'comment-body'; b.textContent = node.comment || ''; b.style.whiteSpace = 'pre-wrap';

  const ac = document.createElement('div'); ac.className = 'comment-actions';
  const r = document.createElement('button'); r.type = 'button'; r.className = 'btn small'; r.textContent = 'Reply';
  const d = document.createElement('button'); d.type = 'button'; d.className = 'btn small danger'; d.textContent = 'Delete';
  ac.append(r, d);

  const slot = document.createElement('div'); slot.className = 'inline-reply-slot';
  li.append(h, b, ac, slot);

  r.addEventListener('click', () => {
    parentIdInput.value = node.id;
    replyingToEl.style.display = 'block';
    replyingToEl.textContent = `Replying to ${escapeHTML(node.name || 'Anonymous')}`;
    cancelBtn.style.display = 'inline-block';
    slot.appendChild(formShell);
    commentInput.placeholder = 'Write a reply…';
    commentInput.focus({ preventScroll: false });
  });
  d.addEventListener('click', async () => {
    if (!confirm('Delete this comment and all its replies?')) return;
    await deleteWithDescendants(node.id);
    await loadComments();
  });
  return li;
}

function renderFlatList(nodes, container) {
  const ul = document.createElement('ul'); ul.className = 'comment-list'; ul.setAttribute('role', 'list');
  nodes.forEach(n => ul.appendChild(renderNode(n)));
  container.innerHTML = '';
  container.appendChild(ul);
}

// ================== Load Comments ==================
async function loadComments() {
  commentsList.innerHTML = `<div class="spinner"></div><p class="muted">Loading…</p>`;
  try {
    await initFirebase();
    const q = queryFn(collectionFn(db, ...commentsPath), orderByFn('timestamp', 'desc'));
    const snap = await getDocsFn(q);
    const rows = []; snap.forEach(d => rows.push({ id: d.id, ...d.data() }));
    renderFlatList(flattenTree(buildTree(rows)), commentsList);
    if (!parentIdInput.value) resetFormToTop();
  } catch (err) {
    console.error('Error loading comments:', err);
    commentsList.innerHTML = `<p class="muted error">Could not load comments.</p>`;
  }
}

// ================== Delete Recursive ==================
async function deleteWithDescendants(rootId) {
  await initFirebase();
  const q = queryFn(collectionFn(db, ...commentsPath), orderByFn('timestamp', 'desc'));
  const snap = await getDocsFn(q);
  const all = []; snap.forEach(d => all.push({ id: d.id, ...d.data() }));
  const toDelete = new Set([rootId]); let added = true;
  while (added) { added = false; for (const it of all) if (it.parentId && toDelete.has(it.parentId) && !toDelete.has(it.id)) { toDelete.add(it.id); added = true; } }
  for (const id of toDelete) await deleteDocFn(docFn(db, ...commentsPath, id));
}

// ================== Submit ==================
form.addEventListener('submit', async e => {
  e.preventDefault();
  const name = nameInput.value.trim(), text = commentInput.value.trim(), parentId = parentIdInput.value || null;
  if (!name || !text) return;
  submitButton.disabled = true; submitButton.textContent = 'Posting…';

  // ====== India local time ======
  const timestamp = new Date().toLocaleString("en-IN", {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false
  });

  try {
    await initFirebase();
    await addDocFn(collectionFn(db, ...commentsPath), { name, comment: text, timestamp, parentId });
    form.reset(); updateCharCounter(); resetFormToTop(); await loadComments();
  } catch (err) {
    console.error('Error adding comment:', err);
    alert('Could not post comment. Please try again.');
  } finally {
    submitButton.disabled = false; submitButton.textContent = 'Post';
  }
});

// ================== Cancel Reply ==================
cancelBtn.addEventListener('click', () => resetFormToTop());
function resetFormToTop() {
  parentIdInput.value = '';
  replyingToEl.style.display = 'none';
  cancelBtn.style.display = 'none';
  commentInput.placeholder = 'Your comment';
  const w = document.getElementById('custom-comment-section');
  if (w && w.firstChild !== formShell) w.prepend(formShell);
}

// ================== Init ==================
updateCharCounter();
loadComments();
