// js/comments-dashboard.js

// Firebase Initialisation (Compatibility SDKs)
// Ensure firebase-app-compat.js, firebase-auth-compat.js, firebase-firestore-compat.js, firebase-messaging-compat.js are loaded in HTML.
firebase.initializeApp({
    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain: "appcomment.firebaseapp.com",
    projectId: "appcomment",
    storageBucket: "appcomment.firebasestorage.app",
    messagingSenderId: "156258808941",
    appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
});

const auth = firebase.auth();
const db = firebase.firestore();
const messaging = firebase.messaging(); // For notifications

// --- CONSTANTS ---
const OWNER_UID = "yIUdX2RGoqfzgaHtE8qdX4rHEEy2";

// --- STATE ---
let currentUser = null; // Current logged-in user
let isOwner = false;    // Is the current user the owner?
const allComments = []; // Global cache for all comments
let unsubscribeComments = null; // To unsubscribe the Firestore listener
let activeReplyForm = null; // Currently open reply form

// --- UI ELEMENTS ---
// Link to HTML elements by their IDs
const dashboardAuthPrompt = document.getElementById('dashboard-auth-prompt');
const customCommentSection = document.getElementById('custom-comment-section');
const authContainer = document.getElementById('auth-container');
const googleLoginBtn = document.getElementById('google-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfoDiv = document.getElementById('user-info');
const ownerViewDiv = document.getElementById('owner-view');
const nonOwnerMessage = document.getElementById('non-owner-message');
const mainFormShell = document.getElementById('main-form-shell');
const notificationButton = document.getElementById('notification-btn');
const notificationBellIcon = notificationButton ? notificationButton.querySelector('.bell-icon') : null;
const notificationBellOffIcon = notificationButton ? notificationButton.querySelector('.bell-off-icon') : null;
const notificationSpinnerIcon = notificationButton ? notificationButton.querySelector('.spinner-icon') : null;


// --- HELPER FUNCTIONS ---

const escapeHTML = s => String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
const fmtDate = ts => {
    const d = ts ? ts.toDate() : new Date(); // Convert Firestore Timestamp to Date object
    const p = n => String(n).padStart(2, '0');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${p(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`;
};

// Formats pageId for display (e.g., 'computer_science' -> 'Computer Science')
function formatPageId(pageId) {
    if (!pageId) return 'Unknown Page';
    if (pageId === 'main_page') return 'Home Page';
    return pageId.replace(/_/g, " ")
                 .split(" ")
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(" ");
}

// ====== Comment Tree & Rendering Logic ======
const buildTree = items => {
    const byId = {};
    items.forEach(it => (it.children = [], byId[it.id] = it));
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
    (function trav(n, d) {
        for (const x of n) {
            x.depth = d;
            res.push(x);
            if (x.children && x.children.length) trav(x.children, d + 1);
        }
    })(nodes, 0);
    return res;
};

function renderNode(node) {
    const li = document.createElement('div');
    li.className = 'comment-item';
    li.dataset.pageId = node.pageId; // Store pageId for replies
    li.dataset.commentId = node.id; // Store commentId for replies
    if (node.depth > 0) li.classList.add('reply-item');

    const isCommentOwner = node.uid === OWNER_UID; // Is this comment from the site owner?
    if (isCommentOwner) li.classList.add('owner-comment');

    const authorName = isCommentOwner ? 'GK Learn Study' : escapeHTML(node.name);
    const verificationBadge = isCommentOwner ? `<span class="verified-badge" title="Verified Owner"><svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></span>` : '';

    const ownerAvatarSVG = `<svg class="comment-avatar owner-avatar" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="owner-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#641ef9;"/><stop offset="100%" style="stop-color:#c0a4fb;"/></linearGradient></defs><circle cx="20" cy="20" r="20" fill="url(#owner-grad)"/><text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="12" font-weight="bold" fill="white" font-family="Arial, sans-serif">GK</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-size="5" fill="white" font-family="Arial, sans-serif">Learn Study</text></svg>`;
    const authorAvatar = isCommentOwner
        ? ownerAvatarSVG
        : (node.photoURL ? `<img src="${escapeHTML(node.photoURL)}" alt="${escapeHTML(authorName)}'s avatar" class="comment-avatar" loading="lazy">` : `<div class="comment-avatar default-avatar">${escapeHTML(node.name?.charAt(0) || 'A')}</div>`);

    const headerHTML = `
        <div class="comment-header">
            <div class="comment-author-info">
                ${authorAvatar}
                <div class="comment-author">${authorName}${verificationBadge}</div>
            </div>
            <div class="comment-date">${fmtDate(node.timestamp)}</div>
        </div>`;

    const showDeleteButton = currentUser && (currentUser.uid === node.uid || isOwner); // Only the comment author or owner can delete

    const actionsHTML = `
        <div class="comment-actions" data-comment-id="${node.id}">
            <!-- Likes/Dislikes (if you want to implement them) -->
            <!-- <button class="btn small vote-btn like-btn">👍 <span class="count">${node.likes || 0}</span></button>
            <button class="btn small vote-btn dislike-btn">👎 <span class="count">${node.dislikes || 0}</span></button> -->
            <button class="btn small reply-btn" data-action="reply">Reply</button>
            ${showDeleteButton ? `<button class="btn small danger delete-btn" data-action="delete">Delete</button>` : ''}
        </div>`;
    const inlineReplySlot = `<div class="inline-reply-slot"></div>`;

    const body = document.createElement('div');
    body.className = 'comment-body';
    body.textContent = node.comment || '';
    body.style.whiteSpace = 'pre-wrap'; // For pre-formatted text

    li.innerHTML = headerHTML;
    li.appendChild(body);
    li.insertAdjacentHTML('beforeend', actionsHTML + inlineReplySlot);

    return li;
}

function renderDashboard(comments) {
    if (!ownerViewDiv) return;

    // Group comments by pageId
    const groupedByPage = comments.reduce((acc, comment) => {
        const pageId = comment.pageId || 'unknown_page'; // Use 'unknown_page' for grouping as well
        if (!acc[pageId]) {
            acc[pageId] = [];
        }
        acc[pageId].push(comment);
        return acc;
    }, {});

    ownerViewDiv.innerHTML = ''; // Clear previous content

    if (Object.keys(groupedByPage).length === 0) {
        ownerViewDiv.innerHTML = '<p class="muted" style="text-align: center; padding: 20px;">No comments found across the site.</p>';
        return;
    }

    // Sort pages for consistent order, e.g., alphabetically
    const sortedPageIds = Object.keys(groupedByPage).sort((a,b) => formatPageId(a).localeCompare(formatPageId(b)));

    sortedPageIds.forEach(pageId => {
        const pageSection = document.createElement('section');
        pageSection.className = 'dashboard-page-section';

        const pageUrl = pageId === 'main_page' ? '/' : `/${pageId.replace(/_/g, '/')}.html`;

        pageSection.innerHTML = `
            <h2 class="page-section-header">
                Comments on: <a href="${pageUrl}" target="_blank" rel="noopener noreferrer">${formatPageId(pageId)}</a>
            </h2>
        `;

        const commentListContainer = document.createElement('div');
        commentListContainer.className = 'comment-list-container';
        pageSection.appendChild(commentListContainer);

        const pageComments = groupedByPage[pageId];
        // Sort by timestamp first for correct tree building order
        pageComments.sort((a, b) => (a.timestamp && b.timestamp) ? a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime() : 0);
        
        const commentTree = buildTree(pageComments);
        const flattenedNodes = flattenTree(commentTree);

        flattenedNodes.forEach(node => {
            commentListContainer.appendChild(renderNode(node));
        });

        ownerViewDiv.appendChild(pageSection);
    });
}


// ====== Load ALL Comments with Real-Time Listener ======
async function loadAllComments() {
    try {
        if (unsubscribeComments) unsubscribeComments(); // Unsubscribe existing listener

        ownerViewDiv.innerHTML = '<p class="muted" style="text-align: center; padding: 20px;">Loading comments...</p>';

        // A collectionGroup('comments') index is required for Firestore.
        // When you first run this query without an index, the Firebase console will provide a link to create it automatically.
        unsubscribeComments = db.collectionGroup('comments')
            .orderBy('timestamp', 'asc') // Order by timestamp (oldest to newest)
            .onSnapshot(snapshot => {
                const newComments = [];
                snapshot.forEach(doc => {
                    let pageId;
                    if (doc.ref.parent && doc.ref.parent.parent) {
                        pageId = doc.ref.parent.parent.id;
                    } else {
                        // Warn if pageId cannot be extracted. This suggests data not conforming to pages/{pageId}/comments/{commentId} structure.
                        console.warn(`Could not extract pageId for comment ID ${doc.id}. It is likely not in the correct hierarchy.`);
                        // If you don't want to display such comments, uncomment the 'return;' below
                        // return; 
                        pageId = 'unknown_page'; // Assign a default pageId for rendering if desired
                    }
                    newComments.push({ id: doc.id, pageId, ...doc.data() });
                });

                allComments.length = 0; // Clear global cache
                allComments.push(...newComments); // Add new comments
                renderDashboard(allComments); // Re-render the dashboard
            }, (error) => {
                console.error('Dashboard listener error:', error);
                ownerViewDiv.innerHTML = `<p class="error-message">Failed to load comments. Please check the Collection Group Index in Firebase Console.</p>`;
            });
    } catch (err) {
        console.error('Error setting up dashboard listener:', err);
        ownerViewDiv.innerHTML = `<p class="error-message">Failed to load comments.</p>`;
    }
}

// ====== Auth Functions ======
googleLoginBtn.addEventListener('click', async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.signInWithPopup(provider);
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        if (error.code !== 'auth/popup-closed-by-user') {
            alert("An error occurred during Google Sign-In. Please try again.");
        }
    }
});

logoutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error("Sign-Out Error:", error);
        alert("An error occurred during sign-out.");
    }
});

// Listen to authentication state changes
auth.onAuthStateChanged(user => {
    currentUser = user;
    isOwner = (user && user.uid === OWNER_UID);

    if (user) {
        // User is logged in.
        googleLoginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        userInfoDiv.innerHTML = `
            Hello, <span class="text-primary">${escapeHTML(user.displayName || 'Anonymous User')}</span>!
            <img src="${escapeHTML(user.photoURL || 'https://via.placeholder.com/30')}" alt="User Photo" class="user-avatar">
        `;
        userInfoDiv.style.display = 'flex'; // Display as flexbox
        dashboardAuthPrompt.style.display = 'none';

        if (isOwner) {
            customCommentSection.style.display = 'block';
            nonOwnerMessage.style.display = 'none';
            if (!unsubscribeComments) { // Start loading comments only if owner logs in
                loadAllComments();
            }
        } else {
            // Logged in but not the owner
            customCommentSection.style.display = 'block'; // Show the custom section for the message
            ownerViewDiv.innerHTML = ''; // Clear comments view (to make sure only the message is visible)
            nonOwnerMessage.style.display = 'block'; // Show the restricted access message
            if (unsubscribeComments) { // Stop listener if a non-owner logs in
                unsubscribeComments();
                unsubscribeComments = null;
            }
        }
        updateNotificationButtonState(); // Update notification button status
    } else {
        // User is logged out.
        googleLoginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        userInfoDiv.style.display = 'none';
        customCommentSection.style.display = 'none';
        dashboardAuthPrompt.style.display = 'block';
        nonOwnerMessage.style.display = 'none'; // Ensure this is hidden when logged out
        closeActiveReplyForm(); // Close reply form on logout
        if (unsubscribeComments) {
            unsubscribeComments();
            unsubscribeComments = null;
        }
        updateNotificationButtonState(); // Update notification button status
    }
});

// ====== Inline Reply Form Management ======
function closeActiveReplyForm() {
    if (activeReplyForm) {
        activeReplyForm.remove();
        activeReplyForm = null;
    }
}

function openReplyForm(commentId, authorName, targetSlot, pageId) {
    closeActiveReplyForm(); // Close any previously open form

    if (!mainFormShell) {
        console.error("main-form-shell element not found. Cannot open reply form.");
        alert("Failed to load reply form.");
        return;
    }

    const formClone = mainFormShell.cloneNode(true);
    formClone.id = ''; // Remove ID from clone to prevent duplicates
    formClone.style.display = 'block';

    const form = formClone.querySelector('form');
    const parentIdInput = form.querySelector('#parent-id');
    const pageIdInput = form.querySelector('#page-id');
    const replyingToEl = form.querySelector('#replying-to');
    const cancelBtn = form.querySelector('#cancel-reply');
    const commentInput = form.querySelector('#comment-input');
    const charCounter = form.querySelector('.comment-form-char-counter');

    parentIdInput.value = commentId;
    pageIdInput.value = pageId; // Set pageId for submission
    replyingToEl.innerHTML = `Replying to <strong class="text-primary">${escapeHTML(authorName)}</strong>.`;
    replyingToEl.style.display = 'block';
    cancelBtn.style.display = 'inline-block';
    commentInput.value = ''; // Clear text input
    charCounter.textContent = '0 / 1000';

    // Event listener to update char counter
    commentInput.addEventListener('input', () => {
        charCounter.textContent = `${commentInput.value.length} / 1000`;
    });

    targetSlot.appendChild(formClone);
    activeReplyForm = formClone;
    commentInput.focus();
}

// ====== Delete Logic ======
async function deleteWithDescendants(rootId, pageId) {
    if (!currentUser || !isOwner) { // Ensure only the owner can delete
        alert("You do not have permission to delete comments.");
        return;
    }

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

    if (confirm(`Are you sure you want to delete this comment and all its ${toDeleteIds.size - 1} replies?`)) {
        try {
            const deletePromises = [...toDeleteIds].map(id =>
                db.collection('pages').doc(pageId).collection('comments').doc(id).delete()
            );
            await Promise.all(deletePromises);
            alert("Comment(s) successfully deleted.");
            // The Firestore listener will automatically update the UI
        } catch (error) {
            console.error("Failed to delete comments:", error);
            alert("An error occurred while deleting the comment(s).");
            // On error, the Firestore listener will revert the UI to the server's state
        }
    }
}

// ====== Delegated Event Listeners Setup ======
function setupDelegatedListeners() {
    // Handle all click events within customCommentSection
    customCommentSection.addEventListener('click', async (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        // For the reply form's cancel button
        if (button.id === 'cancel-reply') {
            closeActiveReplyForm();
            return;
        }

        const action = button.dataset.action;
        if (!action) return; // Only process buttons with data-action

        const commentItem = button.closest('.comment-item');
        if (!commentItem) return;

        const commentId = commentItem.dataset.commentId;
        const pageId = commentItem.dataset.pageId;

        if (!commentId || !pageId) {
            console.error("Comment ID or Page ID not found.");
            return;
        }

        const node = allComments.find(c => c.id === commentId && c.pageId === pageId);
        if (!node) {
            console.error("Comment node not found in cache.");
            return;
        }

        switch (action) {
            case 'reply':
                if (!currentUser) {
                    alert("Please sign in to reply.");
                    return;
                }
                if (!isOwner) {
                    alert("Only the site administrator can reply.");
                    return;
                }
                const replySlot = commentItem.querySelector('.inline-reply-slot');
                openReplyForm(node.id, node.name, replySlot, pageId);
                break;
            case 'delete':
                if (isOwner) { // Only owner can delete
                    deleteWithDescendants(node.id, pageId);
                } else {
                    alert("You do not have permission to delete this comment.");
                }
                break;
            // You can add logic for likes/dislikes here
        }
    });

    // Handle all form submissions within customCommentSection (for reply form)
    customCommentSection.addEventListener('submit', async e => {
        e.preventDefault();
        const form = e.target;
        // Ensure it's the reply form and user is logged in and is owner
        if (!form.matches('.comment-form') || !currentUser || !isOwner) return;

        const commentInput = form.querySelector('#comment-input');
        const parentIdInput = form.querySelector('#parent-id');
        const pageIdInput = form.querySelector('#page-id'); // pageId input
        const submitButton = form.querySelector('#submit-button');

        const commentText = commentInput.value.trim();
        const parentId = parentIdInput.value;
        const pageId = pageIdInput.value; // Get pageId

        if (!commentText || !parentId || !pageId) { // pageId is also required
            alert("Please write your reply and ensure all information is available.");
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = `<span class="spinner-small"></span> Posting...`;

        try {
            // Add to the comments collection of the correct page
            await db.collection('pages').doc(pageId).collection('comments').add({
                name: currentUser.displayName,
                uid: currentUser.uid,
                profilePicUrl: currentUser.photoURL,
                comment: commentText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                parentId: parentId,
                likes: 0, dislikes: 0, likedBy: [], dislikedBy: []
            });
            alert('Reply successfully posted!');
            closeActiveReplyForm(); // Close form
        } catch (err) {
            console.error('Error adding reply:', err);
            alert('Failed to post reply.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Reply';
        }
    });
}

// --- NOTIFICATION LOGIC (FCM) ---
// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
                // Send initial visibility state to SW
                if (navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({
                        type: 'VISIBILITY_CHANGE',
                        pageId: 'main_page', // This dashboard acts as 'main_page'
                        isVisible: document.visibilityState === 'visible'
                    });
                }
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });

    // Inform SW about visibility changes
    document.addEventListener('visibilitychange', () => {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'VISIBILITY_CHANGE',
                pageId: 'main_page', // This dashboard acts as 'main_page'
                isVisible: document.visibilityState === 'visible'
            });
        }
    });
}

// Function to update notification button state
async function updateNotificationButtonState() {
    if (!notificationButton) return;

    notificationButton.style.display = 'none'; // Default hide

    if (!currentUser || !isOwner) { // Only owner can manage notifications for the dashboard
        return;
    }

    // Show spinner while checking permissions/token
    if (notificationSpinnerIcon) notificationSpinnerIcon.style.display = 'block';
    if (notificationBellIcon) notificationBellIcon.style.display = 'none';
    if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'none';
    notificationButton.style.display = 'inline-block';

    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const currentToken = await messaging.getToken();
            if (currentToken) {
                // Check if this token is saved for the owner in Firestore
                const userTokenDoc = await db.collection('userTokens').doc(OWNER_UID).get();
                if (userTokenDoc.exists) {
                    const tokens = userTokenDoc.data().tokens || [];
                    if (tokens.includes(currentToken)) {
                        if (notificationBellIcon) notificationBellIcon.style.display = 'block';
                        if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'none';
                        notificationButton.dataset.subscribed = 'true';
                    } else {
                        if (notificationBellIcon) notificationBellIcon.style.display = 'none';
                        if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
                        notificationButton.dataset.subscribed = 'false';
                    }
                } else {
                    // No token doc for owner, so not subscribed
                    if (notificationBellIcon) notificationBellIcon.style.display = 'none';
                    if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
                    notificationButton.dataset.subscribed = 'false';
                }
            } else {
                // No token, so not subscribed
                if (notificationBellIcon) notificationBellIcon.style.display = 'none';
                if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
                notificationButton.dataset.subscribed = 'false';
            }
        } else {
            // Permission denied, show bell-off
            if (notificationBellIcon) notificationBellIcon.style.display = 'none';
            if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
            notificationButton.dataset.subscribed = 'false';
        }
    } catch (error) {
        console.error("Error updating notification button state:", error);
        if (notificationBellIcon) notificationBellIcon.style.display = 'none';
        if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
        notificationButton.dataset.subscribed = 'false';
    } finally {
        if (notificationSpinnerIcon) notificationSpinnerIcon.style.display = 'none';
    }
}

// Notification button click handler
if (notificationButton) {
    notificationButton.addEventListener('click', async () => {
        if (!currentUser || !isOwner) {
            alert("You must be signed in to manage notifications.");
            return;
        }

        if (notificationSpinnerIcon) notificationSpinnerIcon.style.display = 'block';
        if (notificationBellIcon) notificationBellIcon.style.display = 'none';
        if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'none';

        try {
            const subscribed = notificationButton.dataset.subscribed === 'true';

            if (subscribed) {
                // Unsubscribe
                const currentToken = await messaging.getToken();
                if (currentToken) {
                    await messaging.deleteToken(currentToken);
                    // Remove token from Firestore
                    const userTokenRef = db.collection('userTokens').doc(OWNER_UID);
                    await db.runTransaction(async (transaction) => {
                        const doc = await transaction.get(userTokenRef);
                        if (doc.exists) {
                            const tokens = doc.data().tokens || [];
                            const updatedTokens = tokens.filter(t => t !== currentToken);
                            transaction.update(userTokenRef, { tokens: updatedTokens });
                        }
                    });
                    alert("Notifications successfully turned OFF.");
                }
            } else {
                // Subscribe
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    const newToken = await messaging.getToken();
                    if (newToken) {
                        // Save token to Firestore
                        const userTokenRef = db.collection('userTokens').doc(OWNER_UID);
                        await db.runTransaction(async (transaction) => {
                            const doc = await transaction.get(userTokenRef);
                            if (doc.exists) {
                                const tokens = doc.data().tokens || [];
                                if (!tokens.includes(newToken)) {
                                    transaction.update(userTokenRef, { tokens: firebase.firestore.FieldValue.arrayUnion(newToken) });
                                }
                            } else {
                                transaction.set(userTokenRef, { tokens: [newToken] });
                            }
                        });
                        alert("Notifications successfully turned ON.");
                    } else {
                        alert("Unable to get notification token.");
                    }
                } else {
                    alert("You must grant browser permissions to enable notifications.");
                }
            }
        } catch (error) {
            console.error("Error managing notifications:", error);
            alert("An error occurred while managing notifications.");
        } finally {
            updateNotificationButtonState(); // Update UI after action
        }
    });
}

// ====== Initializer ======
document.addEventListener('DOMContentLoaded', () => {
    // Authentication observer is already set up via `auth.onAuthStateChanged`
    setupDelegatedListeners();
});
