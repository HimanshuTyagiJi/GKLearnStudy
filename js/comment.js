// --- Firebase Module Placeholders ---
let db, addDocFn, collectionFn, deleteDocFn, queryFn, orderByFn, serverTimestampFn, docFn, runTransactionFn, onSnapshotFn, getDocFn, setDocFn;
let auth, onAuthStateChangedFn, GoogleAuthProviderFn, signInWithPopupFn, signOutFn;

// --- State Variables ---
let currentUser = null;
let firebaseApp = null;
let isAuthInitialized = false;
let isFirestoreInitialized = false;
let authPromise = null;
let unsubscribeComments = null;
let unsubscribeRating = null;
let allComments = []; // Global cache for comments
let activeReplyForm = null;

const OWNER_UID = "Pq5f4jTfiEOJCtXBLG0mZyyikIC2"; 

// --- Dynamic Script Loader ---
function loadFirebaseScript(module) {
    const url = `https://www.gstatic.com/firebasejs/9.22.1/firebase-${module}.js`;
    return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${url}"]`);
        if (existingScript) {
            if (existingScript.dataset.loaded) {
                resolve();
            } else {
                existingScript.addEventListener('load', resolve);
            }
            return;
        }
        const script = document.createElement('script');
        script.src = url;
        script.type = "module";
        script.onload = () => {
            script.dataset.loaded = true;
            resolve();
        };
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
    addDocFn = firestore.addDoc;
    collectionFn = firestore.collection;
    deleteDocFn = firestore.deleteDoc;
    queryFn = firestore.query;
    orderByFn = firestore.orderBy;
    serverTimestampFn = firestore.serverTimestamp;
    docFn = firestore.doc;
    runTransactionFn = firestore.runTransaction;
    onSnapshotFn = firestore.onSnapshot;
    getDocFn = firestore.getDoc;
    setDocFn = firestore.setDoc;
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
const escapeHTML = s => String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);

const fmtDate = d => {
    const pad = n => String(n).padStart(2, '0');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const safeToDate = ts => ts?.toDate?.() ?? new Date();

const pageId = (() => {
    const p = location.pathname;
    return ['/', '/index.html', ''].includes(p) ? 'main_page' : p.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '_').replace(/\.html$/, '');
})();

const commentsPath = ['pages', pageId, 'comments'];
const ratingsPath = ['pages', pageId, 'ratings'];

// ====== DOM Elements ======
const commentsList = document.getElementById('comments-list');
const mainFormShell = document.getElementById('comment-form-shell');
const mainForm = document.getElementById('comment-form');
const commentsWrapper = document.getElementById('comments-main-container');
const authContainer = document.getElementById('auth-container');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const loginPrompt = document.getElementById('login-prompt');
const originalLoginHTML = loginBtn.innerHTML;
const commentCountSpan = document.getElementById('comment-count');
const ratingWidgetWrapper = document.getElementById('rating-widget-wrapper');
const ratingStarsContainer = document.getElementById('rating-stars');
const ratingLoginPrompt = document.getElementById('rating-login-prompt');
const averageRatingValue = document.getElementById('average-rating-value');
const totalRatingsCount = document.getElementById('total-ratings-count');


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
    if (isAuthInitialized) {
        await signOutFn(auth);
    }
}

loginBtn.addEventListener('click', signInWithGoogle);
logoutBtn.addEventListener('click', signOutUser);

function setupAuthObserver() {
    onAuthStateChangedFn(auth, user => {
        const wasLoggedIn = !!currentUser;
        currentUser = user;
        
        // This element is on the main page, not the dashboard
        const dashboardLink = document.getElementById("dashboard-link");
        if (dashboardLink) {
            dashboardLink.style.display = (user && user.uid === OWNER_UID) ? 'list-item' : 'none';
        }

        if (user) {
            userInfo.innerHTML = `<img src="${user.photoURL}" alt="${escapeHTML(user.displayName)}" class="user-avatar"><span class="user-name">${escapeHTML(user.displayName)}</span>`;
            authContainer.classList.add('logged-in');
            mainFormShell.style.display = 'block';
            loginPrompt.style.display = 'none';
        } else {
            authContainer.classList.remove('logged-in');
            mainFormShell.style.display = 'none';
            loginPrompt.style.display = 'block';
            loginBtn.disabled = false;
            loginBtn.innerHTML = originalLoginHTML;
            closeActiveReplyForm();
        }

        // If auth state changed, re-render comments and update rating UI
        if (wasLoggedIn !== !!user) {
            renderFlatList(flattenTree(buildTree(allComments)), commentsList);
            if (ratingWidgetWrapper) {
                initializeRatingSystem();
            }
        }
    });
}

// ====== Rating System ======
let userRating = 0;
let isRatingSubmissionPending = false;
let currentRatingSummary = null;

function updateRatingUI(summary, currentUserRating, isInstant = false) {
    if (!ratingWidgetWrapper) return;

    const ratingDisplay = document.getElementById("rating-display");
    if (isInstant) {
        ratingDisplay?.classList.add("no-transition");
        ratingStarsContainer?.classList.add("no-transition");
    }

    const breakdown = summary?.breakdown || {};
    let totalCount = summary?.totalCount || 0;
    let totalSum = summary?.totalSum || 0;
    
    // Fallback calculation if summary fields are missing
    if (typeof summary?.totalCount === 'undefined' || typeof summary?.totalSum === 'undefined') {
        totalCount = 0;
        totalSum = 0;
        for (let r = 1; r <= 5; r++) {
            const count = Number(breakdown[String(r)]) || 0;
            totalCount += count;
            totalSum += count * r;
        }
    }

    const averageRating = totalCount > 0 ? totalSum / totalCount : 0;
    if (averageRatingValue) averageRatingValue.textContent = isNaN(averageRating) ? "0.0" : averageRating.toFixed(1);
    if (totalRatingsCount) totalRatingsCount.textContent = `${totalCount} rating${totalCount !== 1 ? 's' : ''}`;

    for (let i = 5; i >= 1; i--) {
        const row = ratingWidgetWrapper.querySelector(`.breakdown-row[data-star-level="${i}"]`);
        if (row) {
            const count = breakdown[String(i)] || 0;
            const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
            row.querySelector('.progress-bar').style.width = `${percentage}%`;
            row.querySelector('.vote-count').textContent = count;
        }
    }

    const stars = ratingStarsContainer.querySelectorAll('.star');
    stars.forEach(star => {
        const value = parseInt(star.dataset.value, 10);
        star.classList.remove('filled', 'selected');
        if (currentUserRating >= value) {
            star.classList.add('selected');
        } else if (Math.round(averageRating) >= value) {
            star.classList.add('filled');
        }
    });

    if (currentUser) {
        ratingStarsContainer.classList.add('user-can-rate');
        ratingLoginPrompt.style.display = 'none';
    } else {
        ratingStarsContainer.classList.remove('user-can-rate');
        ratingLoginPrompt.style.display = 'block';
    }

    if (isInstant) {
        setTimeout(() => {
            ratingDisplay?.classList.remove("no-transition");
            ratingStarsContainer?.classList.remove("no-transition");
        }, 50);
    }
}

async function loadRatings() {
    await initFirestore();
    if (unsubscribeRating) unsubscribeRating();

    const summaryRef = docFn(db, ...ratingsPath, '_summary');
    unsubscribeRating = onSnapshotFn(summaryRef, (docSnap) => {
        const summary = docSnap.exists() ? docSnap.data() : { totalCount: 0, totalSum: 0, breakdown: {} };
        currentRatingSummary = summary;
        
        if (currentUser) {
            getDocFn(docFn(db, ...ratingsPath, currentUser.uid)).then(userRatingDoc => {
                userRating = userRatingDoc.exists() ? userRatingDoc.data().rating : 0;
                updateRatingUI(summary, userRating);
            });
        } else {
            userRating = 0;
            updateRatingUI(summary, 0);
        }
        ratingWidgetWrapper?.classList.remove('rating-loading');

    }, (error) => {
        console.error("Error loading rating summary:", error);
        if (totalRatingsCount) totalRatingsCount.textContent = "Could not load ratings.";
        ratingWidgetWrapper?.classList.remove('rating-loading');
    });
}

async function submitRatingToServer(newRating, oldRating) {
    if (!currentUser) return;
    isRatingSubmissionPending = true;

    try {
        await runTransactionFn(db, async (transaction) => {
            const summaryRef = docFn(db, ...ratingsPath, '_summary');
            const userRatingRef = docFn(db, ...ratingsPath, currentUser.uid);

            const summaryDoc = await transaction.get(summaryRef);
            const summary = summaryDoc.exists() ? summaryDoc.data() : { totalCount: 0, totalSum: 0, breakdown: {} };
            
            const newBreakdown = { ...(summary.breakdown || {}) };
            let newTotalSum = summary.totalSum || 0;
            let newTotalCount = summary.totalCount || 0;

            if (oldRating > 0) {
                newBreakdown[String(oldRating)] = Math.max(0, (newBreakdown[String(oldRating)] || 0) - 1);
                newTotalSum -= oldRating;
                newTotalCount -= 1;
            }

            newBreakdown[String(newRating)] = (newBreakdown[String(newRating)] || 0) + 1;
            newTotalSum += newRating;
            newTotalCount += 1;

            transaction.set(userRatingRef, { rating: newRating, timestamp: serverTimestampFn() });
            transaction.set(summaryRef, { totalSum: newTotalSum, totalCount: newTotalCount, breakdown: newBreakdown });
        });
    } catch (error) {
        console.error("Rating submission failed:", error);
        alert("Could not save your rating. Please try again.");
        // Revert UI on failure
        updateRatingUI(currentRatingSummary, oldRating);
        userRating = oldRating;
    } finally {
        isRatingSubmissionPending = false;
    }
}

function setupRatingListeners() {
    if (ratingStarsContainer) {
        ratingStarsContainer.addEventListener('click', (e) => {
            const star = e.target.closest('.star');
            if (!star || isRatingSubmissionPending) return;
            if (!currentUser) {
                signInWithGoogle();
                return;
            }

            const newRating = parseInt(star.dataset.value, 10);
            const oldRating = userRating;
            if (newRating === oldRating) return;

            // Optimistic UI update
            const tempSummary = JSON.parse(JSON.stringify(currentRatingSummary || { totalCount: 0, totalSum: 0, breakdown: {} }));
            if (oldRating > 0) {
                tempSummary.breakdown[String(oldRating)] = Math.max(0, (tempSummary.breakdown[String(oldRating)] || 0) - 1);
                tempSummary.totalSum -= oldRating;
                tempSummary.totalCount -= 1;
            }
            tempSummary.breakdown[String(newRating)] = (tempSummary.breakdown[String(newRating)] || 0) + 1;
            tempSummary.totalSum += newRating;
            tempSummary.totalCount += 1;
            userRating = newRating;
            updateRatingUI(tempSummary, newRating, true);

            // Send to server
            submitRatingToServer(newRating, oldRating);
        });
    }
}

// ====== Comment Tree & Rendering Logic ======
const buildTree = items => {
    const byId = {};
    items.forEach(it => {
        it.children = [];
        byId[it.id] = it;
    });
    const roots = [];
    items.forEach(it => {
        if (it.parentId && byId[it.parentId]) {
            byId[it.parentId].children.push(it);
        } else {
            roots.push(it);
        }
    });
    return roots;
};

const flattenTree = nodes => {
    const res = [];
    (function traverse(nodes, depth) {
        for (const node of nodes) {
            node.depth = depth;
            res.push(node);
            if (node.children?.length) {
                traverse(node.children, depth + 1);
            }
        }
    })(nodes, 0);
    return res;
};

function renderNode(node) {
    const li = document.createElement('div');
    li.className = 'comment-item';
    if (node.depth > 0) li.classList.add('reply-item');
    if (node.isOptimistic) li.classList.add('is-optimistic');

    const isUserOwner = currentUser && currentUser.uid === OWNER_UID;
    const isCommentOwner = node.uid === OWNER_UID;
    if (isCommentOwner) li.classList.add('owner-comment');

    let replyInfoHTML = '';
    if (node.parentId) {
        const parentNode = allComments.find(c => c.id === node.parentId);
        if (parentNode) {
            const isParentOwner = parentNode.uid === OWNER_UID;
            const parentName = isParentOwner ? "GK Learn Study" : escapeHTML(parentNode.name);
            const parentBadge = isParentOwner ? ` <span class="verified-badge" title="Verified Owner"><svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></span>` : '';
            replyInfoHTML = `<div class="reply-info">Replying to <strong>@${parentName}${parentBadge}</strong></div>`;
        }
    }

    const ownerAvatarSVG = `<svg class="comment-avatar owner-avatar" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="owner-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#641ef9;"/><stop offset="100%" style="stop-color:#c0a4fb;"/></linearGradient></defs><circle cx="20" cy="20" r="20" fill="url(#owner-grad)"/><text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="12" font-weight="bold" fill="white" font-family="Arial, sans-serif">GK</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-size="5" fill="white" font-family="Arial, sans-serif">Learn Study</text></svg>`;
    const authorAvatar = isCommentOwner
        ? ownerAvatarSVG
        : (node.photoURL
            ? `<img src="${escapeHTML(node.photoURL)}" alt="${escapeHTML(node.name)}" class="comment-avatar" loading="lazy">`
            : `<div class="comment-avatar default-avatar">${escapeHTML(node.name?.charAt(0) || 'A')}</div>`);

    const hasLiked = currentUser && node.likedBy?.includes(currentUser.uid);
    const hasDisliked = currentUser && node.dislikedBy?.includes(currentUser.uid);
    const showDeleteButton = currentUser && (currentUser.uid === node.uid || isUserOwner);
    const authorName = isCommentOwner ? "GK Learn Study" : escapeHTML(node.name);
    const verificationBadge = isCommentOwner ? `<span class="verified-badge" title="Verified Owner"><svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></span>` : '';

    const actionsHTML = `
        <div class="comment-actions" data-comment-id="${node.id}">
            <button class="btn small vote-btn like-btn ${hasLiked ? 'voted' : ''}" data-action="like" aria-pressed="${!!hasLiked}">👍 <span class="count">${node.likes || 0}</span></button>
            <button class="btn small vote-btn dislike-btn ${hasDisliked ? 'voted' : ''}" data-action="dislike" aria-pressed="${!!hasDisliked}">👎 <span class="count">${node.dislikes || 0}</span></button>
            <button class="btn small reply-btn" data-action="reply">Reply</button>
            ${showDeleteButton ? `<button class="btn small danger delete-btn" data-action="delete">Delete</button>` : ''}
        </div>
        <div class="inline-reply-slot"></div>
    `;

    const body = document.createElement('div');
    body.className = 'comment-body';
    body.textContent = node.comment || '';
    body.style.whiteSpace = 'pre-wrap';

    li.innerHTML = `
        <div class="comment-header">
            <div class="comment-author-info">
                ${authorAvatar}
                <div class="comment-author">${authorName}${verificationBadge}</div>
            </div>
            <div class="comment-date">${fmtDate(safeToDate(node.timestamp))}</div>
        </div>
        ${replyInfoHTML}
    `;
    li.appendChild(body);
    li.insertAdjacentHTML('beforeend', actionsHTML);
    return li;
}

function renderFlatList(nodes, container) {
    if (!container) return;
    container.innerHTML = '';
    if (nodes.length > 0) {
        nodes.forEach(node => container.appendChild(renderNode(node)));
    } else {
        container.insertAdjacentHTML('beforeend', '<p class="muted">Be the first to comment!</p>');
    }
}

async function loadComments() {
    try {
        await initFirestore();
        if (unsubscribeComments) unsubscribeComments();

        const q = queryFn(collectionFn(db, ...commentsPath), orderByFn("timestamp", "desc"));

        unsubscribeComments = onSnapshotFn(q, (snapshot) => {
            const serverComments = [];
            snapshot.forEach(doc => serverComments.push({ id: doc.id, ...doc.data() }));

            // Keep optimistic comments that haven't been replaced by server comments yet
            const optimisticComments = allComments.filter(c => c.isOptimistic && !serverComments.some(sc => sc.uid === c.uid && sc.comment === c.comment));

            allComments = [...optimisticComments, ...serverComments];
            renderFlatList(flattenTree(buildTree(allComments)), commentsList);
            
            const count = allComments.length;
            if (commentCountSpan) {
                commentCountSpan.textContent = count;
                commentCountSpan.nextSibling.textContent = ` Comment${count !== 1 ? 's' : ''}`;
            }
            commentsWrapper?.classList.remove('comments-loading');

        }, (error) => {
            console.error("Real-time listener error:", error);
            if (commentsList) commentsList.innerHTML = `<p class="muted error">Could not load comments. Check security rules.</p>`;
            commentsWrapper?.classList.remove('comments-loading');
        });
    } catch (error) {
        console.error("Error setting up listener:", error);
        if (commentsList) commentsList.innerHTML = `<p class="muted error">Could not load comments.</p>`;
        commentsWrapper?.classList.remove('comments-loading');
    }
}

// ====== Inline Reply Form Management ======
function closeActiveReplyForm() {
    if (activeReplyForm) {
        activeReplyForm.remove();
        activeReplyForm = null;
    }
}

function openReplyForm(commentId, authorName, targetSlot) {
    closeActiveReplyForm();

    const formClone = mainFormShell.cloneNode(true);
    formClone.id = '';
    formClone.style.display = 'block';

    const form = formClone.querySelector('form');
    const parentIdInput = form.querySelector('#parent-id');
    const replyingToEl = form.querySelector('#replying-to');
    const cancelBtn = form.querySelector('#cancel-reply');
    const commentInput = form.querySelector('#comment');
    const charCounter = form.querySelector('#char-counter');

    parentIdInput.value = commentId;
    replyingToEl.innerHTML = `Replying to <strong>${escapeHTML(authorName)}</strong>`;
    replyingToEl.style.display = 'block';
    cancelBtn.style.display = 'inline-block';
    commentInput.placeholder = `Replying to ${escapeHTML(authorName)}...`;
    charCounter.textContent = `0 / ${commentInput.maxLength}`;
    
    commentInput.addEventListener('input', () => {
        charCounter.textContent = `${commentInput.value.length} / ${commentInput.maxLength}`;
    });

    targetSlot.appendChild(formClone);
    activeReplyForm = formClone;
    commentInput.focus();
}

// ====== Actions (Vote, Delete) ======
async function handleVote(commentId, action) {
    if (!currentUser) return;
    const userId = currentUser.uid;
    
    const commentIndex = allComments.findIndex(c => c.id === commentId);
    if (commentIndex === -1) return;

    // Optimistic UI Update
    const comment = allComments[commentIndex];
    const likedBy = comment.likedBy || [];
    const dislikedBy = comment.dislikedBy || [];
    const hadLiked = likedBy.includes(userId);
    const hadDisliked = dislikedBy.includes(userId);

    if (action === 'like') {
        if (hadLiked) {
            likedBy.splice(likedBy.indexOf(userId), 1);
        } else {
            likedBy.push(userId);
            if (hadDisliked) {
                dislikedBy.splice(dislikedBy.indexOf(userId), 1);
            }
        }
    } else if (action === 'dislike') {
        if (hadDisliked) {
            dislikedBy.splice(dislikedBy.indexOf(userId), 1);
        } else {
            dislikedBy.push(userId);
            if (hadLiked) {
                likedBy.splice(likedBy.indexOf(userId), 1);
            }
        }
    }
    comment.likes = likedBy.length;
    comment.dislikes = dislikedBy.length;
    renderFlatList(flattenTree(buildTree(allComments)), commentsList);

    // Server Update
    try {
        const commentRef = docFn(db, ...commentsPath, commentId);
        await runTransactionFn(db, async (transaction) => {
            const doc = await transaction.get(commentRef);
            if (!doc.exists()) throw "Doc not found";
            
            const serverLikedBy = doc.data().likedBy || [];
            const serverDislikedBy = doc.data().dislikedBy || [];
            
            const idxLiked = serverLikedBy.indexOf(userId);
            const idxDisliked = serverDislikedBy.indexOf(userId);

            if (action === 'like') {
                if (idxLiked > -1) serverLikedBy.splice(idxLiked, 1);
                else {
                    serverLikedBy.push(userId);
                    if (idxDisliked > -1) serverDislikedBy.splice(idxDisliked, 1);
                }
            } else if (action === 'dislike') {
                if (idxDisliked > -1) serverDislikedBy.splice(idxDisliked, 1);
                else {
                    serverDislikedBy.push(userId);
                    if (idxLiked > -1) serverLikedBy.splice(idxLiked, 1);
                }
            }
            transaction.update(commentRef, {
                likedBy: serverLikedBy,
                dislikedBy: serverDislikedBy,
                likes: serverLikedBy.length,
                dislikes: serverDislikedBy.length
            });
        });
    } catch (error) {
        console.error("Vote transaction failed:", error);
    }
}

async function deleteWithDescendants(rootId){
    const toDeleteIds = new Set([rootId]);
    let added = true;
    while(added){
        added = false;
        for(const it of allComments) {
            if(it.parentId && toDeleteIds.has(it.parentId) && !toDeleteIds.has(it.id)) { 
                toDeleteIds.add(it.id); 
                added = true; 
            }
        }
    }
    
    const originalComments = [...allComments];
    // Optimistic UI update
    allComments = allComments.filter(c => !toDeleteIds.has(c.id));
    renderFlatList(flattenTree(buildTree(allComments)), commentsList);

    try {
        const deletePromises = [...toDeleteIds].map(id => 
            deleteDocFn(docFn(db, ...commentsPath, id))
        );
        await Promise.all(deletePromises);
    } catch (error) {
        console.error("Failed to delete comments:", error);
        allComments = originalComments;
        renderFlatList(flattenTree(buildTree(allComments)), commentsList);
        alert("Could not delete the comment.");
    }
}

// ====== Delegated Event Listeners Setup ======
function setupDelegatedListeners() {
    const commentSection = document.getElementById("custom-comment-section");
    if (!commentSection) return;

    commentSection.addEventListener('click', async (e) => {
        const button = e.target.closest('button');
        if (button) {
            if (button.id === 'cancel-reply') {
                closeActiveReplyForm();
                return;
            }

            const action = button.dataset.action;
            if (action) {
                const commentId = button.closest('[data-comment-id]')?.dataset.commentId;
                if (commentId) {
                    if (!currentUser && ['like', 'dislike', 'reply', 'delete'].includes(action)) {
                        signInWithGoogle();
                        return;
                    }
                    const node = allComments.find(c => c.id === commentId);
                    if (node) {
                        switch (action) {
                            case 'reply':
                                const replySlot = button.closest('.comment-item').querySelector('.inline-reply-slot');
                                openReplyForm(node.id, node.name, replySlot);
                                break;
                            case 'delete':
                                if (confirm('Delete this comment and all its replies?')) {
                                    deleteWithDescendants(node.id);
                                }
                                break;
                            case 'like':
                            case 'dislike':
                                handleVote(node.id, action);
                                break;
                        }
                    }
                }
            }
        }
    });

    commentSection.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        if (form.matches('.comment-form') && currentUser) {
            const commentInput = form.querySelector('#comment');
            const parentIdInput = form.querySelector('#parent-id');
            const submitButton = form.querySelector('#submit-button');

            const commentText = commentInput.value.trim();
            if (commentText) {
                submitButton.disabled = true;
                submitButton.innerHTML = `<span class="spinner-small"></span> Posting...`;
                const parentId = parentIdInput.value || null;

                const tempId = `temp_${Date.now()}`;
                const optimisticComment = {
                    id: tempId,
                    name: currentUser.displayName, uid: currentUser.uid, photoURL: currentUser.photoURL,
                    comment: commentText,
                    timestamp: { toDate: () => new Date() },
                    parentId: parentId,
                    likes: 0, dislikes: 0, likedBy: [], dislikedBy: [],
                    isOptimistic: true
                };

                allComments.unshift(optimisticComment);
                renderFlatList(flattenTree(buildTree(allComments)), commentsList);

                try {
                    await addDocFn(collectionFn(db, ...commentsPath), {
                        name: currentUser.displayName, uid: currentUser.uid, photoURL: currentUser.photoURL,
                        comment: commentText,
                        timestamp: serverTimestampFn(),
                        parentId: parentId,
                        likes: 0, dislikes: 0, likedBy: [], dislikedBy: []
                    });
                    
                    if (form.closest('.inline-reply-slot')) {
                        closeActiveReplyForm();
                    } else {
                        form.reset();
                        form.querySelector('#char-counter').textContent = `0 / ${commentInput.maxLength}`;
                    }
                } catch (error) {
                    console.error("Error adding comment:", error);
                    allComments = allComments.filter(c => c.id !== tempId);
                    renderFlatList(flattenTree(buildTree(allComments)), commentsList);
                    alert("Could not post comment.");
                } finally {
                    submitButton.disabled = false;
                    submitButton.textContent = "Submit";
                }
            }
        }
    });

    if (mainForm) {
        const mainCommentInput = mainForm.querySelector('#comment');
        const mainCharCounter = mainForm.querySelector('#char-counter');
        mainCommentInput.addEventListener('input', () => {
            mainCharCounter.textContent = `${mainCommentInput.value.length} / ${mainCommentInput.maxLength}`;
        });
    }
}

// ====== Service Worker Communication & Visibility ======
function notifyServiceWorkerVisibility(isVisible) {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'VISIBILITY_CHANGE',
            pageId: pageId,
            isVisible: isVisible
        });
    }
}

function setupVisibilityObserver() {
    if (commentsWrapper) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                notifyServiceWorkerVisibility(entry.isIntersecting);
            });
        }, { root: null, threshold: 0.1 });
        observer.observe(commentsWrapper);
    }
}

// ====== Deep Link to Comments ======
function handleCommentDeepLink() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#comment-')) {
        const commentId = hash.substring('#comment-'.length);
        if (commentId) {
            let attempts = 0;
            const interval = setInterval(() => {
                const element = document.querySelector(`.comment-actions[data-comment-id="${commentId}"]`)?.closest('.comment-item');
                if (element) {
                    clearInterval(interval);
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.classList.add('highlighted');
                    setTimeout(() => { element.classList.remove('highlighted'); }, 2500);
                } else if (++attempts > 50) { // Try for 10 seconds
                    clearInterval(interval);
                    console.warn(`Could not find comment ${commentId} to scroll to.`);
                }
            }, 200);
        }
    }
}

// ====== Initializer ======
let commentsInitialized = false;
async function initializeCommentsSection() {
    if (commentsInitialized) return;
    commentsInitialized = true;
    try {
        await initFirestore();
        await loadComments();
        await initFirebaseAuth();
        setupDelegatedListeners();
        setupVisibilityObserver();
        handleCommentDeepLink();
    } catch (error) {
        console.error("Failed to initialize comments section:", error);
        if (commentsList) commentsList.innerHTML = `<p class="muted error">Could not load comments section.</p>`;
    }
}

let ratingInitialized = false;
async function initializeRatingSystem() {
    if (unsubscribeRating) unsubscribeRating(); // Always reset listener
    
    if (!ratingInitialized) {
        setupRatingListeners();
        ratingInitialized = true;
    }
    
    try {
        await initFirestore();
        await loadRatings();
        if (!isAuthInitialized) {
            await initFirebaseAuth();
        }
    } catch (error) {
        console.error("Failed to initialize rating system:", error);
        if (totalRatingsCount) totalRatingsCount.textContent = "Could not load rating system.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const observeAndInit = (element, initFn) => {
        if (element) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        initFn();
                        observer.disconnect();
                    }
                });
            }, { rootMargin: '200px' });
            observer.observe(element);
        }
    };
    
    // Check if the elements exist before observing
    const commentsContainer = document.getElementById("comments-main-container");
    const ratingContainer = document.getElementById("rating-widget-wrapper");

    observeAndInit(commentsContainer, initializeCommentsSection);
    observeAndInit(ratingContainer, initializeRatingSystem);
});
