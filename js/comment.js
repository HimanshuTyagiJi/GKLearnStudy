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
let activeReplyForm = null; // Track the currently open inline reply form

// !!! IMPORTANT: Paste your Firebase User ID here to be recognized as the owner.
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
    await loadFirebaseScript('firestore');
    const firestore = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js");
    
    db = firestore.getFirestore(firebaseApp);
    addDocFn = firestore.addDoc; collectionFn = firestore.collection; 
    deleteDocFn = firestore.deleteDoc; queryFn = firestore.query; orderByFn = firestore.orderBy;
    serverTimestampFn = firestore.serverTimestamp; docFn = firestore.doc;
    runTransactionFn = firestore.runTransaction;
    onSnapshotFn = firestore.onSnapshot;
    getDocFn = firestore.getDoc; setDocFn = firestore.setDoc;
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
    if (!isAuthInitialized) return;
    await signOutFn(auth);
}

loginBtn.addEventListener('click', signInWithGoogle);
logoutBtn.addEventListener('click', signOutUser);

function setupAuthObserver() {
    onAuthStateChangedFn(auth, user => {
        const wasLoggedIn = !!currentUser;
        currentUser = user;
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
        if (wasLoggedIn !== !!user) {
           renderFlatList(flattenTree(buildTree(allComments)), commentsList);
           // Re-initialize rating system to reflect login state
           if(ratingWidgetWrapper) initializeRatingSystem();
        }
    });
}


// ====== RATING SYSTEM LOGIC ======
let userRating = 0; // The current user's rating for this page
let isRatingSubmissionPending = false;

function updateRatingUI(summaryData, currentUserRating) {
    if (!ratingWidgetWrapper) return;

    userRating = currentUserRating || 0;
    const { totalCount = 0, totalSum = 0 } = summaryData || {};
    const breakdown = summaryData?.breakdown || {};
    const average = totalCount > 0 ? (totalSum / totalCount) : 0;

    // Update summary text
    if (averageRatingValue) averageRatingValue.textContent = isNaN(average) ? '0.0' : average.toFixed(1);
    if (totalRatingsCount) totalRatingsCount.textContent = `${totalCount} rating${totalCount !== 1 ? 's' : ''}`;

    // Update breakdown bars
    for (let i = 5; i >= 1; i--) {
        const row = ratingWidgetWrapper.querySelector(`.breakdown-row[data-star-level="${i}"]`);
        if (row) {
            const countForStar = breakdown[String(i)] || 0;
            const percentage = totalCount > 0 ? (countForStar / totalCount) * 100 : 0;
            row.querySelector('.progress-bar').style.width = `${percentage}%`;
            row.querySelector('.vote-count').textContent = countForStar;
        }
    }

    // Update star visuals
    const stars = ratingStarsContainer.querySelectorAll('.star');
    stars.forEach(star => {
        const starValue = parseInt(star.dataset.value, 10);
        star.classList.remove('filled', 'selected');
        if (userRating >= starValue) {
            star.classList.add('selected'); // User's own rating
        } else if (Math.round(average) >= starValue) {
            star.classList.add('filled');
        }
    });
    
    // Handle user interaction state
    if (currentUser) {
        ratingStarsContainer.classList.add('user-can-rate');
        ratingLoginPrompt.style.display = 'none';
    } else {
        ratingStarsContainer.classList.remove('user-can-rate');
        ratingLoginPrompt.style.display = 'block';
    }
}


async function loadRatings() {
    await initFirestore();
    if (unsubscribeRating) unsubscribeRating();

    const summaryDocRef = docFn(db, ...ratingsPath, '_summary');
    
    // Real-time listener for the summary
    unsubscribeRating = onSnapshotFn(summaryDocRef, (doc) => {
        const summaryData = doc.exists() ? doc.data() : { totalCount: 0, totalSum: 0, breakdown: {} };
        // We get the user's rating once, then update the UI with the live summary
        if (currentUser) {
            const userRatingDocRef = docFn(db, ...ratingsPath, currentUser.uid);
            getDocFn(userRatingDocRef).then(userDoc => {
                const userRatingData = userDoc.exists() ? userDoc.data().rating : 0;
                updateRatingUI(summaryData, userRatingData);
            });
        } else {
            updateRatingUI(summaryData, 0);
        }
         ratingWidgetWrapper?.classList.remove('rating-loading');
    }, (error) => {
        console.error("Error loading rating summary:", error);
        if (totalRatingsCount) totalRatingsCount.textContent = "Could not load ratings.";
        ratingWidgetWrapper?.classList.remove('rating-loading');
    });
}

async function submitRating(newRating) {
    if (!currentUser || isRatingSubmissionPending) return;
    isRatingSubmissionPending = true;

    try {
        await runTransactionFn(db, async (transaction) => {
            const summaryRef = docFn(db, ...ratingsPath, '_summary');
            const userRatingRef = docFn(db, ...ratingsPath, currentUser.uid);

            const [summaryDoc, userRatingDoc] = await Promise.all([
                transaction.get(summaryRef),
                transaction.get(userRatingRef)
            ]);
            
            const summaryData = summaryDoc.exists() ? summaryDoc.data() : {};
            const oldUserRating = userRatingDoc.exists() ? userRatingDoc.data().rating : 0;
            
            const breakdown = {
                '1': 0, '2': 0, '3': 0, '4': 0, '5': 0,
                ...(summaryData.breakdown || {})
            };

            // Adjust breakdown for the change in vote
            if (oldUserRating > 0) {
                 breakdown[String(oldUserRating)] = Math.max(0, (breakdown[String(oldUserRating)] || 0) - 1);
            }
            breakdown[String(newRating)] = (breakdown[String(newRating)] || 0) + 1;

            // Recalculate totals directly from the breakdown for data integrity
            let newSum = 0;
            let newCount = 0;
            for (const star in breakdown) {
                const count = breakdown[star] || 0;
                newCount += count;
                newSum += count * parseInt(star, 10);
            }

            // Update user's specific rating
            transaction.set(userRatingRef, { rating: newRating, timestamp: serverTimestampFn() });
            // Update the aggregate summary
            transaction.set(summaryRef, { totalSum: newSum, totalCount: newCount, breakdown: breakdown });
        });
        userRating = newRating; // Optimistically update local state
    } catch (error) {
        console.error("Rating submission failed:", error);
        alert("Could not save your rating. Please try again.");
    } finally {
        isRatingSubmissionPending = false;
    }
}

function setupRatingListeners() {
    if (!ratingStarsContainer) return;

    // The mouseover/mouseout listeners were inefficient and causing state update issues.
    // The existing CSS :hover rule provides a sufficient and more stable hover effect.
    // Removing the JS-based hover handlers fixes the core problem of the rating count
    // and progress bars not updating.

    ratingStarsContainer.addEventListener('click', (e) => {
        const star = e.target.closest('.star');
        if (!star) return;

        if (!currentUser) {
            signInWithGoogle();
            return;
        }

        const ratingValue = parseInt(star.dataset.value, 10);
        if (ratingValue === userRating) {
             // If they click the same star, maybe do nothing or allow un-rating in the future
            return;
        }
        submitRating(ratingValue);
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
  if (node.depth > 0) li.classList.add('reply-item');
  if (node.isOptimistic) li.classList.add('is-optimistic');
  
  const isOwner = currentUser && currentUser.uid === OWNER_UID;
  const isCommentOwner = node.uid === OWNER_UID;
  if (isCommentOwner) li.classList.add('owner-comment');

  const authorName = isCommentOwner ? 'GK Learn Study' : escapeHTML(node.name);
  const verificationBadge = isCommentOwner ? `<span class="verified-badge" title="Verified Owner"><svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></span>` : '';

  let replyInfoHTML = '';
  if (node.parentId) {
      const parent = allComments.find(c => c.id === node.parentId);
      if (parent) {
          const parentIsOwner = parent.uid === OWNER_UID;
          const parentName = parentIsOwner ? 'GK Learn Study' : escapeHTML(parent.name);
          const parentVerificationBadge = parentIsOwner ? ` <span class="verified-badge" title="Verified Owner"><svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></span>` : '';
          replyInfoHTML = `<div class="reply-info">Replying to <strong>@${parentName}${parentVerificationBadge}</strong></div>`;
      }
  }

  const ownerAvatarSVG = `<svg class="comment-avatar owner-avatar" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="owner-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#641ef9;"/><stop offset="100%" style="stop-color:#c0a4fb;"/></linearGradient></defs><circle cx="20" cy="20" r="20" fill="url(#owner-grad)"/><text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="12" font-weight="bold" fill="white" font-family="Arial, sans-serif">GK</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-size="5" fill="white" font-family="Arial, sans-serif">Learn Study</text></svg>`;
  const authorAvatar = isCommentOwner 
    ? ownerAvatarSVG 
    : (node.photoURL ? `<img src="${escapeHTML(node.photoURL)}" alt="${escapeHTML(authorName)}" class="comment-avatar" loading="lazy">` : `<div class="comment-avatar default-avatar">${escapeHTML(node.name?.charAt(0) || 'A')}</div>`);

  const headerHTML = `<div class="comment-header"><div class="comment-author-info">${authorAvatar}<div class="comment-author">${authorName}${verificationBadge}</div></div><div class="comment-date">${fmtDate(safeToDate(node.timestamp))}</div></div>`;
  
  const hasLiked = currentUser && node.likedBy?.includes(currentUser.uid);
  const hasDisliked = currentUser && node.dislikedBy?.includes(currentUser.uid);
  const showDeleteButton = currentUser && (currentUser.uid === node.uid || isOwner);

  const actionsHTML = `<div class="comment-actions" data-comment-id="${node.id}"><button class="btn small vote-btn like-btn ${hasLiked ? 'voted' : ''}" data-action="like" aria-pressed="${!!hasLiked}">👍 <span class="count">${node.likes || 0}</span></button><button class="btn small vote-btn dislike-btn ${hasDisliked ? 'voted' : ''}" data-action="dislike" aria-pressed="${!!hasDisliked}">👎 <span class="count">${node.dislikes || 0}</span></button><button class="btn small reply-btn" data-action="reply">Reply</button>${showDeleteButton ? `<button class="btn small danger delete-btn" data-action="delete">Delete</button>` : ''}</div>`;
  const inlineReplySlot = `<div class="inline-reply-slot"></div>`;
  
  const body = document.createElement('div');
  body.className = 'comment-body';
  body.textContent = node.comment || '';
  body.style.whiteSpace = 'pre-wrap';

  li.innerHTML = headerHTML + replyInfoHTML;
  li.appendChild(body);
  li.insertAdjacentHTML('beforeend', actionsHTML + inlineReplySlot);
  
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

// ====== Load Comments with Real-Time Listener ======
async function loadComments(){
  try {
    await initFirestore();
    if (unsubscribeComments) unsubscribeComments();

    const q = queryFn(collectionFn(db, ...commentsPath), orderByFn('timestamp','desc'));
    unsubscribeComments = onSnapshotFn(q, (snapshot) => {
        const newComments = [];
        snapshot.forEach(d => newComments.push({id: d.id, ...d.data()}));
        
        const optimisticComments = allComments.filter(c => c.isOptimistic && !newComments.some(nc => nc.uid === c.uid && nc.comment === c.comment));
        allComments = [...optimisticComments, ...newComments];

        renderFlatList(flattenTree(buildTree(allComments)), commentsList);
        
        // Update total comment count
        const totalComments = allComments.length;
        if (commentCountSpan) {
            commentCountSpan.textContent = totalComments;
            commentCountSpan.nextSibling.textContent = ` Comment${totalComments !== 1 ? 's' : ''}`;
        }
        
        commentsWrapper?.classList.remove('comments-loading');
    }, (error) => {
        console.error('Real-time listener error:', error);
        commentsList.innerHTML = `<p class="muted error">Could not load comments. Check security rules.</p>`;
        commentsWrapper?.classList.remove('comments-loading');
    });
  } catch(err){
    console.error('Error setting up listener:', err);
    commentsList.innerHTML = `<p class="muted error">Could not load comments.</p>`;
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

// ====== Vote and Delete Logic ======
async function handleVote(commentId, voteType) {
    if (!currentUser) return;
    const uid = currentUser.uid;

    const commentIndex = allComments.findIndex(c => c.id === commentId);
    if (commentIndex === -1) return;

    const comment = allComments[commentIndex];
    const likedBy = comment.likedBy || [];
    const dislikedBy = comment.dislikedBy || [];
    const isLiked = likedBy.includes(uid);
    const isDisliked = dislikedBy.includes(uid);

    if (voteType === 'like') {
        if (isLiked) likedBy.splice(likedBy.indexOf(uid), 1);
        else {
            likedBy.push(uid);
            if (isDisliked) dislikedBy.splice(dislikedBy.indexOf(uid), 1);
        }
    } else if (voteType === 'dislike') {
        if (isDisliked) dislikedBy.splice(dislikedBy.indexOf(uid), 1);
        else {
            dislikedBy.push(uid);
            if (isLiked) likedBy.splice(likedBy.indexOf(uid), 1);
        }
    }
    comment.likes = likedBy.length;
    comment.dislikes = dislikedBy.length;
    renderFlatList(flattenTree(buildTree(allComments)), commentsList);

    try {
        const docRef = docFn(db, ...commentsPath, commentId);
        await runTransactionFn(db, async t => {
            const doc = await t.get(docRef);
            if (!doc.exists()) throw "Doc not found";
            const data = doc.data();
            const serverLikedBy = data.likedBy || [], serverDislikedBy = data.dislikedBy || [];
            const isServerLiked = serverLikedBy.includes(uid), isServerDisliked = serverDislikedBy.includes(uid);
            if (voteType === 'like') {
                if (isServerLiked) serverLikedBy.splice(serverLikedBy.indexOf(uid), 1);
                else { serverLikedBy.push(uid); if (isServerDisliked) serverDislikedBy.splice(serverDislikedBy.indexOf(uid), 1); }
            } else if (voteType === 'dislike') {
                if (isServerDisliked) {
                    serverDislikedBy.splice(serverDislikedBy.indexOf(uid), 1);
                } else {
                    serverDislikedBy.push(uid);
                    if (isServerLiked) {
                        serverLikedBy.splice(serverLikedBy.indexOf(uid), 1);
                    }
                }
            }
            t.update(docRef, { likedBy: serverLikedBy, dislikedBy: serverDislikedBy, likes: serverLikedBy.length, dislikes: serverDislikedBy.length });
        });
    } catch (e) {
        console.error("Vote transaction failed:", e); 
    }
}

async function deleteWithDescendants(rootId){
    const toDeleteIds = new Set([rootId]);
    let added = true;
    while(added){
        added = false;
        for(const it of allComments) if(it.parentId && toDeleteIds.has(it.parentId) && !toDeleteIds.has(it.id)) { toDeleteIds.add(it.id); added = true; }
    }

    const originalComments = [...allComments];
    allComments = allComments.filter(c => !toDeleteIds.has(c.id));
    renderFlatList(flattenTree(buildTree(allComments)), commentsList);

    try {
        await Promise.all([...toDeleteIds].map(id => deleteDocFn(docFn(db, ...commentsPath, id))));
    } catch (error) {
        console.error("Failed to delete comments:", error);
        allComments = originalComments; 
        renderFlatList(flattenTree(buildTree(allComments)), commentsList);
        alert("Could not delete the comment.");
    }
}

// ====== Delegated Event Listeners Setup ======
function setupDelegatedListeners() {
    const container = document.getElementById('custom-comment-section');

    container.addEventListener('click', async (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        if (button.id === 'cancel-reply') {
             closeActiveReplyForm();
             return; 
        }
        
        const action = button.dataset.action;
        if (!action) return;
        
        const commentId = button.closest('[data-comment-id]')?.dataset.commentId;
        if (!commentId) return;

        if (!currentUser && ['like', 'dislike', 'reply', 'delete'].includes(action)) {
            signInWithGoogle();
            return;
        }

        const node = allComments.find(c => c.id === commentId);
        if (!node) return;

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
            case 'like': case 'dislike':
                handleVote(node.id, action);
                break;
        }
    });

    container.addEventListener('submit', async e => {
        e.preventDefault();
        const form = e.target;
        if (!form.matches('.comment-form')) return;

        if (!currentUser) return;
        
        const commentInput = form.querySelector('#comment');
        const parentIdInput = form.querySelector('#parent-id');
        const submitButton = form.querySelector('#submit-button');

        const commentText = commentInput.value.trim();
        if (!commentText) return;

        submitButton.disabled = true;
        submitButton.innerHTML = `<span class="spinner-small"></span> Posting...`;

        const parentId = parentIdInput.value || null;
        const tempId = `temp_${Date.now()}`;

        const tempComment = {
            id: tempId, name: currentUser.displayName, uid: currentUser.uid, photoURL: currentUser.photoURL,
            comment: commentText, timestamp: { toDate: () => new Date() }, parentId: parentId,
            likes: 0, dislikes: 0, likedBy: [], dislikedBy: [], isOptimistic: true
        };
        allComments.unshift(tempComment);
        renderFlatList(flattenTree(buildTree(allComments)), commentsList);
        
        try {
            await addDocFn(collectionFn(db,...commentsPath), {
                name: currentUser.displayName, uid: currentUser.uid, photoURL: currentUser.photoURL,
                comment: commentText, timestamp: serverTimestampFn(), parentId: parentId,
                likes: 0, dislikes: 0, likedBy: [], dislikedBy: []
            });
            
            // If it was an inline form, close it. Otherwise, reset the main form.
            if (form.closest('.inline-reply-slot')) {
                closeActiveReplyForm();
            } else {
                form.reset();
                form.querySelector('#char-counter').textContent = `0 / ${commentInput.maxLength}`;
            }

        } catch(err){
            console.error('Error adding comment:', err);
            allComments = allComments.filter(c => c.id !== tempId); 
            renderFlatList(flattenTree(buildTree(allComments)), commentsList);
            alert('Could not post comment.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
    });

    const mainCommentInput = mainForm.querySelector('#comment');
    const mainCharCounter = mainForm.querySelector('#char-counter');
    mainCommentInput.addEventListener('input', () => { 
        mainCharCounter.textContent = `${mainCommentInput.value.length} / ${mainCommentInput.maxLength}`; 
    });
}

// ====== LAZY INITIALIZATION LOGIC ======
let commentsInitialized = false;
async function initializeCommentsSection() {
    if (commentsInitialized) return;
    commentsInitialized = true;
    try {
        await initFirestore();
        await loadComments();
        await initFirebaseAuth(); 
        setupDelegatedListeners();
    } catch (error) {
        console.error("Failed to initialize comments section:", error);
        if (commentsList) commentsList.innerHTML = `<p class="muted error">Could not load comments section.</p>`;
    }
}

let ratingInitialized = false;
async function initializeRatingSystem() {
    if (ratingInitialized) { // allow re-initialization on auth change
        if (unsubscribeRating) unsubscribeRating();
    }
    ratingInitialized = true;
    try {
        await initFirestore();
        await loadRatings();
        if (!isAuthInitialized) await initFirebaseAuth();
        setupRatingListeners();
    } catch (error) {
        console.error("Failed to initialize rating system:", error);
        if (totalRatingsCount) totalRatingsCount.textContent = `Could not load rating system.`;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const lazyLoad = (target, callback) => {
        if (!target) return;
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              callback();
              observer.disconnect(); 
            }
          });
        }, { rootMargin: "200px" });
        observer.observe(target);
    };
    
    lazyLoad(commentsWrapper, initializeCommentsSection);
    lazyLoad(ratingWidgetWrapper, initializeRatingSystem);
});
