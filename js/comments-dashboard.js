(async () => {
    // Wait for the shared Firebase services to be ready
    const firebase = await window.firebaseServices.ready;

    // --- State Variables ---
    let currentUser = null;
    let unsubscribeComments = null;
    let allComments = [];
    let activeReplyForm = null;

    const OWNER_UID = "Pq5f4jTfiEOJCtXBLG0mZyyikIC2";

    // ====== Helpers ======
    const escapeHTML = s => String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
    const fmtDate = d => {
        const p = n => String(n).padStart(2, '0');
        const m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${p(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`;
    };
    const safeToDate = ts => ts?.toDate?.() ?? new Date();

    // ====== DOM Elements ======
    const dashboardAuthPrompt = document.getElementById('dashboard-auth-prompt');
    const customCommentSection = document.getElementById('custom-comment-section');
    const authContainer = document.getElementById('auth-container');
    const logoutBtn = document.getElementById('logout-btn');
    const userInfo = document.getElementById('user-info');
    const ownerView = document.getElementById('owner-view');
    const nonOwnerMessage = document.getElementById('non-owner-message');
    const mainFormShell = document.getElementById('comment-form-shell');

    // ====== Auth Functions ======
    async function signInWithProvider(provider) {
        const loginButton = document.getElementById('google-login-btn');
        if (loginButton) {
            loginButton.disabled = true;
            const textSpan = loginButton.querySelector('.btn-text');
            if (textSpan) textSpan.textContent = 'Connecting...';
        }
        try {
            await firebase.signInWithPopup(firebase.auth, provider);
        } catch (error) {
            console.error("Sign-In Error:", error);
            if (error.code !== 'auth/popup-closed-by-user') {
                alert(`Could not sign in. Error: ${error.message}`);
            }
        } finally {
            if (!currentUser && loginButton) {
                loginButton.disabled = false;
                const textSpan = loginButton.querySelector('.btn-text');
                if (textSpan) textSpan.textContent = loginButton.dataset.originalText || 'Sign In with Google';
            }
        }
    }

    async function signOutUser() { await firebase.signOut(firebase.auth); }

    function setupLoginButtons() {
        document.getElementById('google-login-btn')?.addEventListener('click', () => signInWithProvider(new firebase.GoogleAuthProvider()));
        logoutBtn.addEventListener('click', signOutUser);
    }

    function setupAuthObserver() {
        firebase.onAuthStateChanged(firebase.auth, user => {
            currentUser = user;
            dashboardAuthPrompt.style.display = user ? 'none' : 'block';
            customCommentSection.style.display = user ? 'block' : 'none';

            if (user) {
                userInfo.innerHTML = `<img src="${user.photoURL}" alt="${escapeHTML(user.displayName)}" class="user-avatar"><span class="user-name">${escapeHTML(user.displayName)}</span>`;
                authContainer.classList.add('logged-in');
                if (user.uid === OWNER_UID) {
                    ownerView.style.display = 'block';
                    nonOwnerMessage.style.display = 'none';
                    if (!unsubscribeComments) loadAllComments();
                } else {
                    ownerView.style.display = 'none';
                    nonOwnerMessage.style.display = 'block';
                    if (unsubscribeComments) {
                        unsubscribeComments();
                        unsubscribeComments = null;
                    }
                }
            } else {
                authContainer.classList.remove('logged-in');
                ownerView.innerHTML = '<div class="spinner"></div>';
                if (unsubscribeComments) {
                    unsubscribeComments();
                    unsubscribeComments = null;
                }
                const loginButton = document.getElementById('google-login-btn');
                if (loginButton) {
                    loginButton.disabled = false;
                    const textSpan = loginButton.querySelector('.btn-text');
                    if (textSpan) textSpan.textContent = loginButton.dataset.originalText || 'Sign In with Google';
                }
            }
        });
    }

    // ====== Comment Tree & Rendering ======
    const buildTree = items => {
        const byId = {};
        items.forEach(it => (it.children = [], byId[it.id] = it));
        const roots = [];
        items.forEach(it => it.parentId && byId[it.parentId] ? byId[it.parentId].children.push(it) : roots.push(it));
        return roots;
    };
    const flattenTree = nodes => {
        const res = [];
        (function trav(n, d) {
            for (const x of n) { x.depth = d; res.push(x); if (x.children?.length) trav(x.children, d + 1); }
        })(nodes, 0);
        return res;
    };

    function renderNode(node) {
        const li = document.createElement('div');
        li.className = 'comment-item';
        li.dataset.pageId = node.pageId;
        if (node.depth > 0) li.classList.add('reply-item');
        const isOwner = currentUser && currentUser.uid === OWNER_UID;
        const isCommentOwner = node.uid === OWNER_UID;
        if (isCommentOwner) li.classList.add('owner-comment');
        const authorName = isCommentOwner ? 'GK Learn Study' : escapeHTML(node.name);
        const verificationBadge = isCommentOwner ? `<span class="verified-badge" title="Verified Owner"><svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></span>` : '';
        const ownerAvatarSVG = `<svg class="comment-avatar owner-avatar" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="owner-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#641ef9;"/><stop offset="100%" style="stop-color:#c0a4fb;"/></linearGradient></defs><circle cx="20" cy="20" r="20" fill="url(#owner-grad)"/><text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="12" font-weight="bold" fill="white" font-family="Arial, sans-serif">GK</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-size="5" fill="white" font-family="Arial, sans-serif">Learn Study</text></svg>`;
        const authorAvatar = isCommentOwner ? ownerAvatarSVG : (node.photoURL ? `<img src="${escapeHTML(node.photoURL)}" alt="${escapeHTML(authorName)}" class="comment-avatar" loading="lazy">` : `<div class="comment-avatar default-avatar">${escapeHTML(node.name?.charAt(0) || 'A')}</div>`);
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
        const groupedByPage = comments.reduce((acc, comment) => {
            const pageId = comment.pageId || 'unknown';
            if (!acc[pageId]) acc[pageId] = [];
            acc[pageId].push(comment);
            return acc;
        }, {});
        ownerView.innerHTML = '';
        if (Object.keys(groupedByPage).length === 0) {
            ownerView.innerHTML = '<p class="muted">No comments found across the site.</p>';
            return;
        }
        const sortedPageIds = Object.keys(groupedByPage).sort();
        sortedPageIds.forEach(pageId => {
            const pageSection = document.createElement('section');
            pageSection.className = 'dashboard-page-section';
            const pageTitle = pageId === 'main_page' ? 'Home Page' : pageId.replace(/_/g, ' ');
            const pageUrl = pageId === 'main_page' ? '/' : `/${pageId.replace(/_/g, '/')}.html`;
            pageSection.innerHTML = `<h2 class="page-section-header">Comments on: <a href="${pageUrl}" target="_blank" rel="noopener noreferrer">${pageTitle}</a></h2>`;
            const commentListContainer = document.createElement('div');
            commentListContainer.className = 'comment-list-container';
            pageSection.appendChild(commentListContainer);
            const pageComments = groupedByPage[pageId];
            const flattenedNodes = flattenTree(buildTree(pageComments));
            flattenedNodes.forEach(node => {
                commentListContainer.appendChild(renderNode(node));
            });
            ownerView.appendChild(pageSection);
        });
    }

    // ====== Load ALL Comments ======
    async function loadAllComments() {
        if (unsubscribeComments) unsubscribeComments();
        const q = firebase.query(firebase.collectionGroup(firebase.db, 'comments'), firebase.orderBy('timestamp', 'desc'));
        unsubscribeComments = firebase.onSnapshot(q, (snapshot) => {
            const newComments = [];
            snapshot.forEach(doc => {
                const pageId = doc.ref.parent.parent.id;
                newComments.push({ id: doc.id, pageId, ...doc.data() });
            });
            allComments = newComments;
            renderDashboard(allComments);
        }, (error) => {
            console.error('Dashboard listener error:', error);
            ownerView.innerHTML = `
                <div class="muted error" style="padding: 1rem; border: 1px solid var(--danger-color); border-radius: 8px;">
                    <p><strong>Could not load comments.</strong></p>
                    <p>This is likely due to a missing Firestore index required for this dashboard to fetch comments from all pages.</p>
                    <p><strong>To fix this:</strong></p>
                    <ol style="text-align: left; margin-left: 20px;">
                        <li>Open the browser's developer console (F12).</li>
                        <li>Look for an error message containing a long URL.</li>
                        <li>Click that URL. It will take you directly to the index creation page in your Firebase console.</li>
                        <li>Follow the prompts to create the index (this may take a few minutes).</li>
                        <li>Once the index is built, refresh this page.</li>
                    </ol>
                    <p>If you still have issues, ensure your Firestore security rules are correct.</p>
                </div>`;
        });
    }

    // ====== Reply Form Management ======
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
        const pageIdInput = form.querySelector('#page-id');
        const replyingToEl = form.querySelector('#replying-to');
        const cancelBtn = form.querySelector('#cancel-reply');
        const commentInput = form.querySelector('#comment');
        parentIdInput.value = commentId;
        pageIdInput.value = pageId;
        replyingToEl.innerHTML = `Replying to <strong>${escapeHTML(authorName)}</strong>`;
        replyingToEl.style.display = 'block';
        cancelBtn.style.display = 'inline-block';
        targetSlot.appendChild(formClone);
        activeReplyForm = formClone;
        commentInput.focus();
    }

    // ====== Delete Logic ======
    async function deleteWithDescendants(rootId, pageId) {
        const commentsForPage = allComments.filter(c => c.pageId === pageId);
        const toDeleteIds = new Set([rootId]);
        let added = true;
        while (added) {
            added = false;
            for (const it of commentsForPage) {
                if (it.parentId && toDeleteIds.has(it.parentId) && !toDeleteIds.has(it.id)) {
                    toDeleteIds.add(it.id);
                    added = true;
                }
            }
        }
        allComments = allComments.filter(c => !toDeleteIds.has(c.id));
        renderDashboard(allComments);
        try {
            const deletePromises = [...toDeleteIds].map(id => firebase.deleteDoc(firebase.doc(firebase.db, 'pages', pageId, 'comments', id)));
            await Promise.all(deletePromises);
        } catch (error) {
            console.error("Failed to delete comments:", error);
            alert("Could not delete the comment. The view will refresh.");
            loadAllComments();
        }
    }

    // ====== Event Listeners Setup ======
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
                await firebase.addDoc(firebase.collection(firebase.db, ...commentsPath), {
                    name: currentUser.displayName, uid: currentUser.uid, photoURL: currentUser.photoURL,
                    comment: commentText, timestamp: firebase.serverTimestamp(), parentId: parentId,
                    likes: 0, dislikes: 0, likedBy: [], dislikedBy: []
                });
                closeActiveReplyForm();
            } catch (err) {
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
            setupLoginButtons();
            setupAuthObserver();
            setupDelegatedListeners();
        } catch (error) {
            console.error("Failed to initialize dashboard:", error);
            if (dashboardAuthPrompt) dashboardAuthPrompt.textContent = "Could not load dashboard services.";
        }
    });
})();
