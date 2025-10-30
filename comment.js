// --- Centralized Firebase SDK Imports ---
import { app, auth, db, messaging, functions } from './firebase-init.js';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { addDoc, collection, deleteDoc, query, orderBy, serverTimestamp, doc, runTransaction, onSnapshot, getDoc, setDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging.js";

// --- Configuration & State ---
const OWNER_UID = "Pq5f4jTfiEOJCtXBLG0mZyyikIC2"; 
const VAPID_KEY = "BPSPa7nCW1nGok9peZQepk25VC1OxeFxFHtWVZsen2TnwVCya3Sq2Dtb4W0sX8u06fRsg-eAqgxEUoW2XP1Oyvo";

let currentUser = null;
let allComments = [];
let userRating = 0;
let currentRatingSummary = null;
let activeReplyForm = null;
let unsubscribeComments = null;
let unsubscribeRating = null;
let isAppInitialized = false;
let isRatingSubmissionPending = false;
let isNotificationProcessing = false;
let currentFcmToken = null;
let isSubscribedOnThisPage = false;


// --- DOM Element Selection ---
const commentsWrapper = document.getElementById('comments-main-container');
const ratingWidgetWrapper = document.getElementById('rating-widget-wrapper');
const commentsList = document.getElementById('comments-list');
const mainFormShell = document.getElementById('comment-form-shell');
const mainForm = document.getElementById('comment-form');
const authContainer = document.getElementById('auth-container');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const loginPrompt = document.getElementById('login-prompt');
const commentCountSpan = document.getElementById('comment-count');
const ratingStarsContainer = document.getElementById('rating-stars');
const ratingLoginPrompt = document.getElementById('rating-login-prompt');
const averageRatingValue = document.getElementById('average-rating-value');
const totalRatingsCount = document.getElementById('total-ratings-count');
const originalLoginHTML = loginBtn ? loginBtn.innerHTML : '';

// --- Helper Functions ---
const escapeHTML = s => String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
const fmtDate = d => {
    const p = n => String(n).padStart(2, '0');
    const m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${p(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`;
};
const safeToDate = ts => ts?.toDate?.() ?? new Date();
const pageId = (() => {
    const p = location.pathname;
    return ['/', '/index.html', ''].includes(p) ? 'main_page' : p.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '_').replace(/\.html$/, '');
})();
const commentsPath = ['pages', pageId, 'comments'];
const ratingsPath = ['pages', pageId, 'ratings'];

function showErrorUI(targetElement, message, retryCallback) {
    if (!targetElement) return;
    targetElement.innerHTML = `
        <div class="error-container">
            <p>${message}</p>
            <button class="btn retry-btn">Try Again</button>
        </div>
    `;
    targetElement.querySelector('.retry-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        targetElement.innerHTML = '<div class="spinner"></div>';
        setTimeout(retryCallback, 50);
    });
}

// ====== UNIFIED INITIALIZATION LOGIC ======

async function awaitInitialAuthState() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            currentUser = user;
            unsubscribe();
            resolve();
        });
    });
}

function setupPersistentAuthObserver() {
    onAuthStateChanged(auth, (user) => {
        const wasLoggedIn = !!currentUser;
        currentUser = user;
        if (wasLoggedIn !== !!user) {
            updateUIAfterAuthChange();
        }
    });
}

async function initializeSystem() {
    if (isAppInitialized) return;
    isAppInitialized = true;

    try {
        await awaitInitialAuthState();
        setupPersistentAuthObserver();
        
        onMessage(messaging, (payload) => {
            console.log('Foreground message received. ', payload);
            alert(`New Notification:\n${payload.data.title}\n${payload.data.body}`);
        });

        loadComments();
        loadRatings();
        setupAllEventListeners();
        updateUIAfterAuthChange();
        handleCommentDeepLink();
        
    } catch (error) {
        console.error("Failed to initialize the comment system:", error);
        if (commentsWrapper) showErrorUI(commentsWrapper, 'Could not connect. Please try again.', initializeSystem);
        if (ratingWidgetWrapper) showErrorUI(ratingWidgetWrapper, 'Could not connect. Please try again.', initializeSystem);
    }
}

// ====== NOTIFICATION LOGIC (MERGED) ======

async function updateNotificationUIState() {
    const notificationBtn = document.getElementById('notification-btn');
    if (!notificationBtn) return;

    isNotificationProcessing = false;
    notificationBtn.classList.remove('loading');

    const permission = Notification.permission;
    if (permission === 'denied') {
        notificationBtn.classList.add('disabled');
        notificationBtn.classList.remove('subscribed');
        notificationBtn.title = 'Notifications are blocked in your browser.';
        return;
    }

    notificationBtn.classList.remove('disabled');

    if (permission === 'granted' && currentUser) {
        await checkCurrentPageSubscription();
        if (isSubscribedOnThisPage) {
            notificationBtn.classList.add('subscribed');
            notificationBtn.title = 'You are subscribed. Click to unsubscribe.';
        } else {
            notificationBtn.classList.remove('subscribed');
            notificationBtn.title = 'Click to subscribe for this page.';
        }
    } else {
        isSubscribedOnThisPage = false;
        notificationBtn.classList.remove('subscribed');
        notificationBtn.title = 'Sign in and click to enable notifications.';
    }
}

async function handleSubscriptionRequest() {
    const notificationBtn = document.getElementById('notification-btn');
    if (!notificationBtn || isNotificationProcessing) return;
    
    isNotificationProcessing = true;
    notificationBtn.classList.add('loading');

    try {
        if (!currentUser) {
            alert('Please sign in to subscribe to notifications.');
            return;
        }

        if (Notification.permission === 'denied') {
            alert('Notifications are blocked. Please enable them in your browser settings.');
            return;
        }

        if (Notification.permission === 'default') {
            const permissionResult = await Notification.requestPermission();
            if (permissionResult !== 'granted') {
                alert('You denied permission for notifications.');
                return;
            }
        }

        const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });

        if (!fcmToken) throw new Error("Failed to get FCM token.");
        currentFcmToken = fcmToken;

        const wasSubscribed = isSubscribedOnThisPage;
        await saveTokenForUser(fcmToken);
        const success = await togglePageSubscription(fcmToken, wasSubscribed);

        if (success) {
            isSubscribedOnThisPage = !wasSubscribed;
        }
    } catch (error) {
        console.error("Subscription error:", error);
        alert('Failed to manage subscription. Please try again.');
    } finally {
        await updateNotificationUIState();
    }
}

async function saveTokenForUser(token) {
    if (!currentUser || !token) return;
    try {
        const userTokenRef = doc(db, 'userTokens', currentUser.uid);
        await setDoc(userTokenRef, { tokens: arrayUnion(token) }, { merge: true });
    } catch (error) {
        console.error("Failed to save user token:", error);
    }
}

async function togglePageSubscription(token, wasSubscribed) {
    if (!currentUser || !token) return false;
    const action = wasSubscribed ? 'unsubscribe' : 'subscribe';
    try {
        const response = await fetch("https://us-central1-appcomment.cloudfunctions.net/manageSubscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pageId, token, action })
        });
        const result = await response.json();
        return result.success === true;
    } catch (error) {
        console.error(`Error calling manageSubscription for ${action}:`, error);
        alert(`Could not ${action}. A network error occurred.`);
        return false;
    }
}

async function checkCurrentPageSubscription() {
    if (Notification.permission !== 'granted' || !currentUser) {
        isSubscribedOnThisPage = false;
        return;
    }
    try {
        if (!currentFcmToken) {
            currentFcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
        }
        if (!currentFcmToken) return;

        const pageSubRef = doc(db, 'pageSubscriptions', pageId);
        const docSnap = await getDoc(pageSubRef);
        isSubscribedOnThisPage = docSnap.exists() && docSnap.data().tokens?.includes(currentFcmToken);
    } catch (error) {
        console.error("Error checking subscription:", error);
        isSubscribedOnThisPage = false;
    }
}

function initializeNotificationButton() {
    const notificationBtn = document.getElementById('notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', handleSubscriptionRequest);
        updateNotificationUIState();
    }
}


// ====== Auth Management & UI Updates ======

function updateUIAfterAuthChange() {
    const dashboardLink = document.getElementById('dashboard-link');
    if (dashboardLink) {
        dashboardLink.style.display = (currentUser && currentUser.uid === OWNER_UID) ? 'list-item' : 'none';
    }
    
    if (currentUser) {
        const bellIconHTML = `
            <button class="notification-btn" id="notification-btn" title="Enable notifications" aria-label="Toggle notifications">
                <svg class="bell-icon" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                <svg class="bell-off-icon" viewBox="0 0 24 24"><path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8a6 6 0 0 0-6-6 6 6 0 0 0-6 6c0 7-3 9-3 9h18s-3-2-3-9"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                <svg class="spinner-icon" viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            </button>
        `;
        userInfo.innerHTML = `<img src="${currentUser.photoURL}" alt="${escapeHTML(currentUser.displayName)}" class="user-avatar"><span class="user-name">${escapeHTML(currentUser.displayName)}</span>${bellIconHTML}`;
        authContainer.classList.add('logged-in');
        mainFormShell.style.display = 'block';
        loginPrompt.style.display = 'none';
        
        // Initialize the notification button now that it's in the DOM
        initializeNotificationButton();

    } else {
        userInfo.innerHTML = '';
        authContainer.classList.remove('logged-in');
        mainFormShell.style.display = 'none';
        loginPrompt.style.display = 'block';
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.innerHTML = originalLoginHTML;
        }
        closeActiveReplyForm();
    }
    
    renderFlatList(flattenTree(buildTree(allComments)), commentsList);
    if (currentRatingSummary) {
        fetchUserRatingAndUpdateUI(currentRatingSummary);
    }
}

async function signInWithGoogle() {
    loginBtn.disabled = true;
    loginBtn.innerHTML = `<span class="spinner-small"></span> Connecting...`;
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        if (error.code !== 'auth/popup-closed-by-user') {
            alert("Could not sign in. Please check your connection and try again.");
        }
    } finally {
        if (!currentUser) {
            loginBtn.disabled = false;
            loginBtn.innerHTML = originalLoginHTML;
        }
    }
}

async function signOutUser() {
    await signOut(auth);
}

// ====== RATING SYSTEM LOGIC ======

async function fetchUserRatingAndUpdateUI(summaryData) {
    if (currentUser) {
        const userRatingDocRef = doc(db, ...ratingsPath, currentUser.uid);
        const userDoc = await getDoc(userRatingDocRef);
        userRating = userDoc.exists() ? userDoc.data().rating : 0;
    } else {
        userRating = 0;
    }
    updateRatingUI(summaryData, userRating);
}

function updateRatingUI(summaryData, currentUserRating) {
    if (!ratingWidgetWrapper) return;

    const breakdown = summaryData?.breakdown || {};
    const totalCount = summaryData?.totalCount || 0;
    const totalSum = summaryData?.totalSum || 0;
    const average = totalCount > 0 ? (totalSum / totalCount) : 0;

    if (averageRatingValue) averageRatingValue.textContent = average.toFixed(1);
    if (totalRatingsCount) totalRatingsCount.textContent = `${totalCount} rating${totalCount !== 1 ? 's' : ''}`;

    for (let i = 5; i >= 1; i--) {
        const row = ratingWidgetWrapper.querySelector(`.breakdown-row[data-star-level="${i}"]`);
        if (row) {
            const countForStar = breakdown[String(i)] || 0;
            const percentage = totalCount > 0 ? (countForStar / totalCount) * 100 : 0;
            row.querySelector('.progress-bar').style.width = `${percentage}%`;
            row.querySelector('.vote-count').textContent = countForStar;
        }
    }

    const stars = ratingStarsContainer.querySelectorAll('.star');
    stars.forEach(star => {
        const starValue = parseInt(star.dataset.value, 10);
        star.classList.remove('filled', 'selected');
        if (currentUserRating >= starValue) star.classList.add('selected');
        else if (Math.round(average) >= starValue) star.classList.add('filled');
    });
    
    if (currentUser) {
        ratingStarsContainer.classList.add('user-can-rate');
        ratingLoginPrompt.style.display = 'none';
    } else {
        ratingStarsContainer.classList.remove('user-can-rate');
        ratingLoginPrompt.style.display = 'block';
    }
}

function loadRatings() {
    if (unsubscribeRating) unsubscribeRating();
    const summaryDocRef = doc(db, ...ratingsPath, '_summary');
    
    unsubscribeRating = onSnapshot(summaryDocRef, (doc) => {
        const summaryData = doc.exists() ? doc.data() : { totalCount: 0, totalSum: 0, breakdown: {} };
        currentRatingSummary = summaryData;
        fetchUserRatingAndUpdateUI(summaryData);
        ratingWidgetWrapper?.classList.remove('rating-loading');
    }, (error) => {
        console.error("Error loading rating summary:", error);
        showErrorUI(document.getElementById('rating-widget'), "Could not load ratings.", initializeSystem);
    });
}

async function submitRating(newRating) {
    if (!currentUser || isRatingSubmissionPending) return;
    
    const oldUserRating = userRating;
    if (newRating === oldUserRating) return;
    isRatingSubmissionPending = true;

    const optimisticSummary = JSON.parse(JSON.stringify(currentRatingSummary || { totalCount: 0, totalSum: 0, breakdown: {} }));
    if (oldUserRating > 0) {
        optimisticSummary.breakdown[String(oldUserRating)] = Math.max(0, (optimisticSummary.breakdown[String(oldUserRating)] || 0) - 1);
        optimisticSummary.totalSum -= oldUserRating;
        optimisticSummary.totalCount -= 1;
    }
    optimisticSummary.breakdown[String(newRating)] = (optimisticSummary.breakdown[String(newRating)] || 0) + 1;
    optimisticSummary.totalSum += newRating;
    optimisticSummary.totalCount += 1;
    userRating = newRating;
    updateRatingUI(optimisticSummary, newRating);

    try {
        await runTransaction(db, async (transaction) => {
            const summaryRef = doc(db, ...ratingsPath, '_summary');
            const userRatingRef = doc(db, ...ratingsPath, currentUser.uid);
            const summaryDoc = await transaction.get(summaryRef);
            const serverSummary = summaryDoc.exists() ? summaryDoc.data() : { totalCount: 0, totalSum: 0, breakdown: {} };
            
            const breakdown = { ...serverSummary.breakdown };
            let newSum = serverSummary.totalSum || 0;
            let newCount = serverSummary.totalCount || 0;

            if (oldUserRating > 0) {
                breakdown[String(oldUserRating)] = Math.max(0, (breakdown[String(oldUserRating)] || 0) - 1);
                newSum -= oldUserRating;
                newCount -= 1;
            }
            breakdown[String(newRating)] = (breakdown[String(newRating)] || 0) + 1;
            newSum += newRating;
            newCount += 1;

            transaction.set(userRatingRef, { rating: newRating, timestamp: serverTimestamp() });
            transaction.set(summaryRef, { totalSum: newSum, totalCount: newCount, breakdown: breakdown });
        });
    } catch (error) {
        console.error("Rating submission failed:", error);
        alert("Could not save your rating. Please try again.");
        userRating = oldUserRating;
        updateRatingUI(currentRatingSummary, oldUserRating);
    } finally {
        isRatingSubmissionPending = false;
    }
}

// ====== Comment Tree & Rendering Logic ======
const buildTree = items => {
  const byId = {}; items.forEach(it => (it.children = [], byId[it.id] = it));
  const roots = []; items.forEach(it => it.parentId && byId[it.parentId] ? byId[it.parentId].children.push(it) : roots.push(it));
  return roots;
};
const flattenTree = nodes => {
  const res = []; (function trav(n,d){ for(const x of n){ x.depth = d; res.push(x); if(x.children?.length) trav(x.children,d+1); } })(nodes,0);
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

  const ownerAvatarSVG = `<svg class="comment-avatar owner-avatar" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="owner-grad-comment" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#641ef9;"/><stop offset="100%" style="stop-color:#c0a4fb;"/></linearGradient></defs><circle cx="20" cy="20" r="20" fill="url(#owner-grad-comment)"/><text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="12" font-weight="bold" fill="white" font-family="Arial, sans-serif">GK</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-size="5" fill="white" font-family="Arial, sans-serif">Learn Study</text></svg>`;
  const authorAvatar = isCommentOwner ? ownerAvatarSVG : (node.photoURL ? `<img src="${escapeHTML(node.photoURL)}" alt="${escapeHTML(authorName)}" class="comment-avatar" loading="lazy">` : `<div class="comment-avatar default-avatar">${escapeHTML(node.name?.charAt(0) || 'A')}</div>`);
  const headerHTML = `<div class="comment-header"><div class="comment-author-info">${authorAvatar}<div class="comment-author">${authorName}${verificationBadge}</div></div><div class="comment-date">${fmtDate(safeToDate(node.timestamp))}</div></div>`;
  const hasLiked = currentUser && node.likedBy?.includes(currentUser.uid);
  const hasDisliked = currentUser && node.dislikedBy?.includes(currentUser.uid);
  const showDeleteButton = currentUser && (currentUser.uid === node.uid || isOwner);
  const actionsHTML = `<div class="comment-actions" data-comment-id="${node.id}"><button class="btn small vote-btn like-btn ${hasLiked ? 'voted' : ''}" data-action="like" aria-pressed="${!!hasLiked}">👍 <span class="count">${node.likes || 0}</span></button><button class="btn small vote-btn dislike-btn ${hasDisliked ? 'voted' : ''}" data-action="dislike" aria-pressed="${!!hasDisliked}">👎 <span class="count">${node.dislikes || 0}</span></button><button class="btn small reply-btn" data-action="reply">Reply</button>${showDeleteButton ? `<button class="btn small danger delete-btn" data-action="delete">Delete</button>` : ''}</div>`;
  const body = document.createElement('div');
  body.className = 'comment-body'; body.textContent = node.comment || ''; body.style.whiteSpace = 'pre-wrap';
  li.innerHTML = headerHTML + replyInfoHTML;
  li.appendChild(body);
  li.insertAdjacentHTML('beforeend', actionsHTML + `<div class="inline-reply-slot"></div>`);
  return li;
}

function renderFlatList(nodes, container){
    if (!container) return;
    container.innerHTML = ''; 
    if (nodes.length > 0) {
        nodes.forEach(n => container.appendChild(renderNode(n)));
    } else {
        container.insertAdjacentHTML('beforeend', '<p class="muted">Be the first to comment!</p>');
    }
}

function loadComments(){
    if (unsubscribeComments) unsubscribeComments();
    const q = query(collection(db, ...commentsPath), orderBy('timestamp','desc'));
    unsubscribeComments = onSnapshot(q, (snapshot) => {
        const newComments = [];
        snapshot.forEach(d => newComments.push({id: d.id, ...d.data()}));
        const optimisticComments = allComments.filter(c => c.isOptimistic && !newComments.some(nc => nc.uid === c.uid && nc.comment === c.comment));
        allComments = [...optimisticComments, ...newComments];
        renderFlatList(flattenTree(buildTree(allComments)), commentsList);
        
        const totalComments = allComments.length;
        if (commentCountSpan) {
            commentCountSpan.textContent = totalComments;
            const plural = totalComments !== 1 ? 's' : '';
            if(commentCountSpan.nextSibling) commentCountSpan.nextSibling.textContent = ` Comment${plural}`;
        }
        commentsWrapper?.classList.remove('comments-loading');
    }, (error) => {
        console.error('Comment listener error:', error);
        showErrorUI(commentsList, 'A network error occurred.', initializeSystem);
    });
}

// ====== Comment Actions (Reply, Vote, Delete) ======
function closeActiveReplyForm() {
    if (activeReplyForm) { activeReplyForm.remove(); activeReplyForm = null; }
}

function openReplyForm(commentId, authorName, targetSlot) {
    closeActiveReplyForm(); 
    const formClone = mainFormShell.cloneNode(true);
    formClone.id = ''; formClone.style.display = 'block';
    const form = formClone.querySelector('form'), parentIdInput = form.querySelector('#parent-id'), replyingToEl = form.querySelector('#replying-to'), cancelBtn = form.querySelector('#cancel-reply'), commentInput = form.querySelector('#comment'), charCounter = form.querySelector('#char-counter');
    parentIdInput.value = commentId;
    replyingToEl.innerHTML = `Replying to <strong>${escapeHTML(authorName)}</strong>`;
    replyingToEl.style.display = 'block'; cancelBtn.style.display = 'inline-block';
    commentInput.placeholder = `Replying to ${escapeHTML(authorName)}...`;
    charCounter.textContent = `0 / ${commentInput.maxLength}`;
    commentInput.addEventListener('input', () => { charCounter.textContent = `${commentInput.value.length} / ${commentInput.maxLength}`; });
    targetSlot.appendChild(formClone); activeReplyForm = formClone; commentInput.focus();
}

async function handleVote(commentId, voteType) {
    if (!currentUser) { signInWithGoogle(); return; }
    
    const commentRef = doc(db, ...commentsPath, commentId);

    try {
        await runTransaction(db, async (transaction) => {
            const commentDoc = await transaction.get(commentRef);
            if (!commentDoc.exists()) throw "Document does not exist!";
            
            const data = commentDoc.data();
            const likedBy = data.likedBy || [];
            const dislikedBy = data.dislikedBy || [];
            const uid = currentUser.uid;

            const isLiked = likedBy.includes(uid);
            const isDisliked = dislikedBy.includes(uid);
            
            if (voteType === 'like') {
                if (isLiked) { likedBy.splice(likedBy.indexOf(uid), 1); } 
                else { likedBy.push(uid); if (isDisliked) dislikedBy.splice(dislikedBy.indexOf(uid), 1); }
            } else if (voteType === 'dislike') {
                if (isDisliked) { dislikedBy.splice(dislikedBy.indexOf(uid), 1); } 
                else { dislikedBy.push(uid); if (isLiked) likedBy.splice(likedBy.indexOf(uid), 1); }
            }
            transaction.update(commentRef, { likedBy, dislikedBy, likes: likedBy.length, dislikes: dislikedBy.length });
        });
    } catch (e) {
        console.error("Vote transaction failed: ", e);
        alert("Could not process vote. Please try again.");
    }
}

async function deleteWithDescendants(rootId){
    const toDeleteIds = new Set([rootId]);
    let added = true;
    while(added){ added = false; for(const it of allComments) if(it.parentId && toDeleteIds.has(it.parentId) && !toDeleteIds.has(it.id)) { toDeleteIds.add(it.id); added = true; } }
    
    const originalComments = [...allComments];
    allComments = allComments.filter(c => !toDeleteIds.has(c.id));
    renderFlatList(flattenTree(buildTree(allComments)), commentsList);

    try {
        const deletePromises = [...toDeleteIds].map(id => deleteDoc(doc(db, ...commentsPath, id)));
        await Promise.all(deletePromises);
    } catch (error) {
        console.error("Failed to delete comments:", error);
        allComments = originalComments; renderFlatList(flattenTree(buildTree(allComments)), commentsList);
        alert("Could not delete the comment.");
    }
}

async function postComment(form) {
    if (!currentUser) { signInWithGoogle(); return; }
    const commentInput = form.querySelector('#comment');
    const parentIdInput = form.querySelector('#parent-id');
    const submitButton = form.querySelector('#submit-button');
    const commentText = commentInput.value.trim(); 
    if (!commentText) return;

    submitButton.disabled = true;
    submitButton.innerHTML = `<span class="spinner-small"></span> Posting...`;
    
    const parentId = parentIdInput.value || null;
    const tempId = `temp_${Date.now()}`;
    const tempComment = { id: tempId, name: currentUser.displayName, uid: currentUser.uid, photoURL: currentUser.photoURL, comment: commentText, timestamp: { toDate: () => new Date() }, parentId, likes: 0, dislikes: 0, likedBy: [], dislikedBy: [], isOptimistic: true };
    allComments.unshift(tempComment);
    renderFlatList(flattenTree(buildTree(allComments)), commentsList);

    try {
        await addDoc(collection(db, ...commentsPath), { 
            name: currentUser.displayName, 
            uid: currentUser.uid, 
            photoURL: currentUser.photoURL, 
            comment: commentText, 
            timestamp: serverTimestamp(), 
            parentId, 
            likes: 0, 
            dislikes: 0, 
            likedBy: [], 
            dislikedBy: [] 
        });
        if (form.closest('.inline-reply-slot')) {
            closeActiveReplyForm();
        } else {
            form.reset();
            const charCounter = form.querySelector('#char-counter');
            if (charCounter) charCounter.textContent = `0 / ${commentInput.maxLength}`;
        }
    } catch (err) {
        console.error('Error adding comment:', err);
        allComments = allComments.filter(c => c.id !== tempId);
        renderFlatList(flattenTree(buildTree(allComments)), commentsList);
        alert('Could not post comment. Please check your connection.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
    }
}

// ====== Event Listeners Setup ======
function setupAllEventListeners() {
    loginBtn?.addEventListener('click', signInWithGoogle);
    logoutBtn?.addEventListener('click', signOutUser);

    const container = document.getElementById('custom-comment-section');
    if (!container) return;

    container.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        if (button.id === 'cancel-reply') {
            closeActiveReplyForm();
            return;
        }
        
        const action = button.dataset.action;
        const commentItem = button.closest('.comment-item');
        const commentId = button.closest('[data-comment-id]')?.dataset.commentId;
        
        if (action && commentId) {
            const node = allComments.find(c => c.id === commentId);
            if (!node) return;

            if (!currentUser && ['like', 'dislike', 'reply', 'delete'].includes(action)) {
                signInWithGoogle();
                return;
            }

            switch (action) {
                case 'reply':
                    openReplyForm(node.id, node.name, commentItem.querySelector('.inline-reply-slot'));
                    break;
                case 'delete':
                    if (confirm('Delete this comment and all its replies?')) deleteWithDescendants(node.id);
                    break;
                case 'like': case 'dislike':
                    handleVote(node.id, action);
                    break;
            }
        }
    });

    container.addEventListener('submit', (e) => {
        e.preventDefault();
        if (e.target.matches('.comment-form')) {
            postComment(e.target);
        }
    });
    
    ratingStarsContainer?.addEventListener('click', (e) => {
        const star = e.target.closest('.star');
        if (!star || !currentUser) { signInWithGoogle(); return; }
        submitRating(parseInt(star.dataset.value, 10));
    });

    const mainCommentInput = mainForm?.querySelector('#comment');
    if (mainCommentInput) {
        const mainCharCounter = mainForm.querySelector('#char-counter');
        mainCommentInput.addEventListener('input', () => {
            mainCharCounter.textContent = `${mainCommentInput.value.length} / ${mainCommentInput.maxLength}`;
        });
    }
}

// ====== Deep Linking ======
function handleCommentDeepLink() {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#comment-')) return;
    const commentId = hash.substring('#comment-'.length);
    if (!commentId) return;

    let attempts = 0;
    const interval = setInterval(() => {
        const el = document.querySelector(`.comment-actions[data-comment-id="${commentId}"]`)?.closest('.comment-item');
        if (el) {
            clearInterval(interval);
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('highlighted');
            setTimeout(() => el.classList.remove('highlighted'), 2500);
        } else if (attempts++ > 50) { // Stop after 10 seconds
            clearInterval(interval);
        }
    }, 200);
}

// ====== Entry Point ======
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('comments-and-ratings-container');
    if (!container) return;
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            initializeSystem();
            observer.disconnect();
        }
    }, { rootMargin: "200px" });
    
    observer.observe(container);
});
