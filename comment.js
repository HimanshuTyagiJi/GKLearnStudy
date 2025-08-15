(function() {
  const originalError = console.error;
  console.error = function(...args) {
    // Safely check for messages to suppress without causing circular reference errors.
    // We achieve this by checking if any of the string arguments match our patterns.
    let suppress = false;
    for (const arg of args) {
      if (typeof arg === 'string') {
        if (/firestore\.googleapis\.com.*Listen\/channel/i.test(arg) || /ERR_TIMED_OUT/i.test(arg) || /\b404\b/.test(arg)) {
          suppress = true;
          break;
        }
      }
    }

    if (suppress) {
      return;
    }

    originalError.apply(console, args);
  };
})();

/* ========= Config ========= */
const firebaseConfig = {
  apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
  authDomain: "appcomment.firebaseapp.com",
  projectId: "appcomment",
  storageBucket: "appcomment.firebasestorage.app",
  messagingSenderId: "156258808941",
  appId: "1:156258808941:web:04a1f7470ac43657c7fb64",
  measurementId: "G-2HX1M5QQ44"
};

/* ========= Helpers ========= */
const escapeHTML = (str) => String(str ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const safeToDate = (ts) => (ts && typeof ts.toDate === 'function') ? ts.toDate() : new Date();
const fmtDate = (d) => {
  // e.g., 15 Aug 2025, 14:37
  const pad = (n)=>String(n).padStart(2,'0');
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const getPageIdentifier = () => {
  const path = window.location.pathname;
  if (path === '/' || path === '/index.html' || path === '') return 'main_page';
  return path.substring(1).replace(/\/$/, '').replace(/\//g, '_');
};

/* ========= Load Firebase (no onSnapshot) ========= */
const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js");
const { getFirestore, collection, addDoc, orderBy, serverTimestamp, doc, deleteDoc, getDocs, query } =
  await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ========= DOM refs ========= */
const commentsList = document.getElementById('comments-list');
const formShell = document.getElementById('comment-form-shell');
const form = document.getElementById('comment-form');

/* ========= Form elements ========= */
const nameInput = form.querySelector('#name');
const commentInput = form.querySelector('#comment');
const parentIdInput = form.querySelector('#parent-id');
const charCounter = form.querySelector('#char-counter');
const cancelBtn = form.querySelector('#cancel-reply');
const replyingToEl = form.querySelector('#replying-to');
const submitButton = form.querySelector('#submit-button');

/* ========= Page collection ========= */
const pageId = getPageIdentifier();
const commentsPath = ['pages', pageId, 'comments'];

/* ========= Character counter ========= */
function updateCharCounter(){
  charCounter.textContent = `${commentInput.value.length} / ${commentInput.maxLength}`;
}
commentInput.addEventListener('input', updateCharCounter);

/* ========= Render helpers ========= */
function buildTree(items){
  const byId = {}; items.forEach(it => (it.children = [], byId[it.id] = it));
  const roots = [];
  items.forEach(it => {
    if (it.parentId && byId[it.parentId]) byId[it.parentId].children.push(it);
    else roots.push(it);
  });
  // Sort all children arrays chronologically (oldest first)
  Object.values(byId).forEach(node => {
    if (node.children.length > 1) {
        node.children.sort((a,b) => safeToDate(a.timestamp) - safeToDate(b.timestamp));
    }
  });
  return roots;
}

function flattenTree(nodes) {
  const flatList = [];
  function traverse(nodesToTraverse, depth) {
    for (const node of nodesToTraverse) {
      node.depth = depth;
      flatList.push(node);
      if (node.children && node.children.length) {
        traverse(node.children, depth + 1);
      }
    }
  }
  traverse(nodes, 0);
  return flatList;
}

function renderFlatList(nodes, container){
  const ul = document.createElement('ul');
  ul.className='comment-list';
  ul.setAttribute('role', 'list');
  nodes.forEach(n => ul.appendChild(renderNode(n)));
  container.innerHTML = '';
  container.appendChild(ul);
}

function renderNode(node){
  const li = document.createElement('li');
  li.className = 'comment-item';
  if (node.depth > 0) {
      li.classList.add('reply-item');
  }
  li.setAttribute('role', 'listitem');

  const header = document.createElement('div'); header.className='comment-header';
  const author = document.createElement('div'); author.className='comment-author'; author.textContent = node.name || 'Anonymous';
  const date = document.createElement('div'); date.className='comment-date'; date.textContent = fmtDate(safeToDate(node.timestamp));
  header.appendChild(author); header.appendChild(date);

  const body = document.createElement('div');
  body.className='comment-body';
  body.textContent = node.comment || '';
  body.style.whiteSpace = 'pre-wrap'; // Preserve line breaks

  const actions = document.createElement('div'); actions.className='comment-actions';
  const replyBtn = document.createElement('button');
  replyBtn.type='button';
  replyBtn.className='btn small';
  replyBtn.textContent='Reply';
  replyBtn.setAttribute('aria-label', `Reply to ${escapeHTML(node.name || 'Anonymous')}`);
  const delBtn = document.createElement('button');
  delBtn.type='button';
  delBtn.className='btn small danger';
  delBtn.textContent='Delete';
  delBtn.setAttribute('aria-label', `Delete comment by ${escapeHTML(node.name || 'Anonymous')}`);
  actions.appendChild(replyBtn); actions.appendChild(delBtn);

  const inlineSlot = document.createElement('div'); inlineSlot.className='inline-reply-slot';

  li.appendChild(header);
  li.appendChild(body);
  li.appendChild(actions);
  li.appendChild(inlineSlot);

  replyBtn.addEventListener('click', () => {
    // move the single form right under this comment
    parentIdInput.value = node.id;
    replyingToEl.style.display = 'block';
    replyingToEl.textContent = `Replying to ${escapeHTML(node.name || 'Anonymous')}`;
    cancelBtn.style.display = 'inline-block';
    inlineSlot.appendChild(formShell);
    commentInput.placeholder = `Write a reply…`;
    commentInput.focus({ preventScroll:false });
  });

  delBtn.addEventListener('click', async () => {
    if (!confirm('Delete this comment and all its replies?')) return;
    await deleteWithDescendants(node.id);
    await loadComments();
  });

  return li;
}

/* ========= Load comments (latest first) ========= */
async function loadComments(){
  commentsList.innerHTML = `<div class="spinner"></div><p class="muted">Loading…</p>`;
  try{
    const q = query(collection(db, ...commentsPath), orderBy('timestamp','desc'));
    const snap = await getDocs(q);
    const rows = [];
    snap.forEach(d => rows.push({ id:d.id, ...d.data() }));

    const tree = buildTree(rows);
    const flatList = flattenTree(tree);
    renderFlatList(flatList, commentsList);

    // ensure if we were replying and comment disappeared, reset form to top
    if (!parentIdInput.value) resetFormToTop();
  }catch(err){
    console.error('Error loading comments:', err);
    commentsList.innerHTML = `<p class="muted error">Could not load comments.</p>`;
  }
}

/* ========= Delete recursively ========= */
async function deleteWithDescendants(rootId){
  // fetch all once and recursively delete those in chain
  const q = query(collection(db, ...commentsPath), orderBy('timestamp','desc'));
  const snap = await getDocs(q);
  const all = []; snap.forEach(d => all.push({ id:d.id, ...d.data() }));
  const toDelete = new Set([rootId]);
  let added = true;
  while(added){
    added = false;
    for (const it of all){
      if (it.parentId && toDelete.has(it.parentId) && !toDelete.has(it.id)){
        toDelete.add(it.id); added = true;
      }
    }
  }
  // delete all collected
  for (const id of toDelete){
    await deleteDoc(doc(db, ...commentsPath, id));
  }
}

/* ========= Submit (new or reply) ========= */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const text = commentInput.value.trim();
  const parentId = parentIdInput.value || null;
  if (!name || !text) return;
  submitButton.disabled = true; submitButton.textContent = 'Posting…';
  try{
    await addDoc(collection(db, ...commentsPath), {
      name, comment: text, timestamp: serverTimestamp(), parentId
    });
    form.reset();
    updateCharCounter();
    resetFormToTop();
    await loadComments();
  }catch(err){
    console.error('Error adding comment:', err);
    alert('Could not post comment. Please try again.');
  }finally{
    submitButton.disabled = false; submitButton.textContent = 'Post';
  }
});

/* ========= Cancel reply -> move form back to top ========= */
cancelBtn.addEventListener('click', () => resetFormToTop());

function resetFormToTop(){
  parentIdInput.value = '';
  replyingToEl.style.display = 'none';
  cancelBtn.style.display = 'none';
  commentInput.placeholder = 'Your comment';
  const widget = document.getElementById('custom-comment-section');
  // Prepend the form shell back to the main widget container
  if (widget && widget.firstChild !== formShell) {
      widget.prepend(formShell);
  }
}

/* ========= Init ========= */
updateCharCounter();
await loadComments();
