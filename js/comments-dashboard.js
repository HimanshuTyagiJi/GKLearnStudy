// js/comments-dashboard.js

// Firebase Initialisation (Compatibility SDK का उपयोग करके)
// सुनिश्चित करें कि firebase-app-compat.js, firebase-auth-compat.js, firebase-firestore-compat.js, firebase-messaging-compat.js HTML में पहले ही लोड हो चुके हैं।
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
const messaging = firebase.messaging(); // नोटिफिकेशन के लिए

// --- CONSTANTS ---
const OWNER_UID = "Pq5f4jTfiEOJCtXBLG0mZyyikIC2"; // आपके क्लाउड फंक्शन से लिया गया मालिक का UID

// --- STATE ---
let currentUser = null; // वर्तमान लॉग-इन उपयोगकर्ता
let isOwner = false;    // क्या वर्तमान उपयोगकर्ता मालिक है
const allComments = []; // सभी कमेंट्स का ग्लोबल कैश
let unsubscribeComments = null; // Firestore लिसनर को अनसब्सक्राइब करने के लिए
let activeReplyForm = null; // वर्तमान में खुला रिप्लाई फॉर्म

// --- UI ELEMENTS ---
// HTML में मौजूद एलिमेंट्स को JavaScript वेरिएबल्स से लिंक करें
const dashboardAuthPrompt = document.getElementById('dashboard-auth-prompt');
const customCommentSection = document.getElementById('custom-comment-section');
const authContainer = document.getElementById('auth-container');
const googleLoginBtn = document.getElementById('google-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfoDiv = document.getElementById('user-info');
const ownerViewDiv = document.getElementById('owner-view');
const nonOwnerMessage = document.getElementById('non-owner-message');
const mainFormShell = document.getElementById('main-form-shell'); // यह अब HTML में है
const notificationButton = document.getElementById('notification-btn');
const notificationBellIcon = notificationButton ? notificationButton.querySelector('.bell-icon') : null;
const notificationBellOffIcon = notificationButton ? notificationButton.querySelector('.bell-off-icon') : null;
const notificationSpinnerIcon = notificationButton ? notificationButton.querySelector('.spinner-icon') : null;


// --- HELPER FUNCTIONS ---

const escapeHTML = s => String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
const fmtDate = ts => {
    const d = ts ? ts.toDate() : new Date(); // Firestore Timestamp को Date ऑब्जेक्ट में बदलें
    const p = n => String(n).padStart(2, '0');
    const m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${p(d.getDate())} ${m[d.getMonth()]} ${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`;
};

// pageId को पढ़ने योग्य फॉर्मेट में बदलने के लिए (जैसे 'computer_science' -> 'Computer Science')
function formatPageId(pageId) {
    if (!pageId) return 'अज्ञात पेज';
    if (pageId === 'main_page') return 'होम पेज';
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

    const isCommentOwner = node.uid === OWNER_UID; // यह कमेंट मालिक का है या नहीं
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

    const showDeleteButton = currentUser && (currentUser.uid === node.uid || isOwner); // केवल कमेंट का लेखक या मालिक ही हटा सकता है

    const actionsHTML = `
        <div class="comment-actions" data-comment-id="${node.id}">
            <!-- Likes/Dislikes (यदि आप इन्हें लागू करना चाहें तो) -->
            <!-- <button class="btn small vote-btn like-btn">👍 <span class="count">${node.likes || 0}</span></button>
            <button class="btn small vote-btn dislike-btn">👎 <span class="count">${node.dislikes || 0}</span></button> -->
            <button class="btn small reply-btn" data-action="reply">रिप्लाई</button>
            ${showDeleteButton ? `<button class="btn small danger delete-btn" data-action="delete">हटाएं</button>` : ''}
        </div>`;
    const inlineReplySlot = `<div class="inline-reply-slot"></div>`;

    const body = document.createElement('div');
    body.className = 'comment-body';
    body.textContent = node.comment || '';
    body.style.whiteSpace = 'pre-wrap'; // प्री-फॉरमेटेड टेक्स्ट के लिए

    li.innerHTML = headerHTML;
    li.appendChild(body);
    li.insertAdjacentHTML('beforeend', actionsHTML + inlineReplySlot);

    return li;
}

function renderDashboard(comments) {
    if (!ownerViewDiv) return;

    // Comments को pageId द्वारा ग्रुप करें
    const groupedByPage = comments.reduce((acc, comment) => {
        const pageId = comment.pageId || 'unknown';
        if (!acc[pageId]) {
            acc[pageId] = [];
        }
        acc[pageId].push(comment);
        return acc;
    }, {});

    ownerViewDiv.innerHTML = ''; // पिछली सामग्री साफ़ करें

    if (Object.keys(groupedByPage).length === 0) {
        ownerViewDiv.innerHTML = '<p class="muted" style="text-align: center; padding: 20px;">साइट पर कोई कमेंट नहीं मिला।</p>';
        return;
    }

    // पेजों को नाम के अनुसार सॉर्ट करें
    const sortedPageIds = Object.keys(groupedByPage).sort((a,b) => formatPageId(a).localeCompare(formatPageId(b)));

    sortedPageIds.forEach(pageId => {
        const pageSection = document.createElement('section');
        pageSection.className = 'dashboard-page-section';

        const pageUrl = pageId === 'main_page' ? '/' : `/${pageId.replace(/_/g, '/')}.html`;

        pageSection.innerHTML = `
            <h2 class="page-section-header">
                पेज पर कमेंट्स: <a href="${pageUrl}" target="_blank" rel="noopener noreferrer">${formatPageId(pageId)}</a>
            </h2>
        `;

        const commentListContainer = document.createElement('div');
        commentListContainer.className = 'comment-list-container';
        pageSection.appendChild(commentListContainer);

        const pageComments = groupedByPage[pageId];
        // पहले टाइमस्टैम्प द्वारा सॉर्ट करें ताकि `buildTree` सही क्रम में काम करे
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
        if (unsubscribeComments) unsubscribeComments(); // मौजूदा लिसनर को अनसब्सक्राइब करें

        ownerViewDiv.innerHTML = '<p class="muted" style="text-align: center; padding: 20px;">कमेंट्स लोड हो रहे हैं...</p>';

        // Firestore में एक collectionGroup('comments') के लिए इंडेक्स की आवश्यकता होगी।
        // जब आप पहली बार इस क्वेरी को बिना इंडेक्स के चलाएंगे, तो Firebase कंसोल आपको एक लिंक देगा जिससे आप इसे स्वचालित रूप से बना सकते हैं।
        unsubscribeComments = db.collectionGroup('comments')
            .orderBy('timestamp', 'asc') // पुराने से नए कमेंट्स
            .onSnapshot(snapshot => {
                const newComments = [];
                snapshot.forEach(doc => {
                    // पेज आईडी को दस्तावेज़ के संदर्भ पथ से निकालें
                    const pageId = doc.ref.parent.parent.id;
                    newComments.push({ id: doc.id, pageId, ...doc.data() });
                });

                allComments.length = 0; // ग्लोबल कैश साफ़ करें
                allComments.push(...newComments); // नए कमेंट्स जोड़ें
                renderDashboard(allComments); // डैशबोर्ड को फिर से रेंडर करें

            }, (error) => {
                console.error('Dashboard listener error:', error);
                ownerViewDiv.innerHTML = `<p class="muted error">कमेंट्स लोड नहीं हो सके। Firebase कंसोल में कलेक्शन ग्रुप इंडेक्स की जांच करें।</p>`;
            });
    } catch (err) {
        console.error('Error setting up dashboard listener:', err);
        ownerViewDiv.innerHTML = `<p class="muted error">कमेंट्स लोड नहीं हो सके।</p>`;
    }
}

// ====== Auth Functions ======
googleLoginBtn.addEventListener('click', async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.signInWithPopup(provider);
    } catch (error) {
        console.error("Google साइन इन करते समय त्रुटि:", error);
        if (error.code !== 'auth/popup-closed-by-user') {
            alert("Google साइन इन करते समय त्रुटि आई। कृपया पुनः प्रयास करें।");
        }
    }
});

logoutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error("साइन आउट करते समय त्रुटि:", error);
        alert("साइन आउट करते समय त्रुटि आई।");
    }
});

// प्रमाणीकरण स्थिति परिवर्तनों को सुनें
auth.onAuthStateChanged(user => {
    currentUser = user;
    isOwner = (user && user.uid === OWNER_UID);

    if (user) {
        // उपयोगकर्ता लॉग-इन है।
        googleLoginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        userInfoDiv.innerHTML = `
            नमस्ते, <span class="text-primary">${escapeHTML(user.displayName || 'अनाम उपयोगकर्ता')}</span>!
            <img src="${escapeHTML(user.photoURL || 'https://via.placeholder.com/30')}" alt="User Photo" class="user-avatar">
        `;
        userInfoDiv.style.display = 'flex'; // flexbox के रूप में दिखाएं
        dashboardAuthPrompt.style.display = 'none';

        if (isOwner) {
            customCommentSection.style.display = 'block';
            nonOwnerMessage.style.display = 'none';
            if (!unsubscribeComments) { // केवल मालिक लॉग इन होने पर ही कमेंट्स लोड करना शुरू करें
                loadAllComments();
            }
        } else {
            customCommentSection.style.display = 'none';
            nonOwnerMessage.style.display = 'block';
            if (unsubscribeComments) { // यदि मालिक नहीं है तो लिसनर बंद करें
                unsubscribeComments();
                unsubscribeComments = null;
            }
        }
        updateNotificationButtonState(); // नोटिफिकेशन बटन की स्थिति अपडेट करें
    } else {
        // उपयोगकर्ता लॉग आउट है।
        googleLoginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        userInfoDiv.style.display = 'none';
        customCommentSection.style.display = 'none';
        dashboardAuthPrompt.style.display = 'block';
        nonOwnerMessage.style.display = 'none';
        closeActiveReplyForm(); // लॉग आउट होने पर रिप्लाई फॉर्म बंद करें
        if (unsubscribeComments) {
            unsubscribeComments();
            unsubscribeComments = null;
        }
        updateNotificationButtonState(); // नोटिफिकेशन बटन की स्थिति अपडेट करें
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
    closeActiveReplyForm(); // पहले से खुले किसी भी फॉर्म को बंद करें

    if (!mainFormShell) {
        console.error("main-form-shell element not found. Cannot open reply form.");
        alert("रिप्लाई फॉर्म लोड नहीं हो सका।");
        return;
    }

    const formClone = mainFormShell.cloneNode(true);
    formClone.id = ''; // क्लोन की आईडी हटा दें ताकि डुप्लिकेट न हो
    formClone.style.display = 'block';

    const form = formClone.querySelector('form');
    const parentIdInput = form.querySelector('#parent-id');
    const pageIdInput = form.querySelector('#page-id'); // नया हिडन इनपुट
    const replyingToEl = form.querySelector('#replying-to');
    const cancelBtn = form.querySelector('#cancel-reply');
    const commentInput = form.querySelector('#comment-input'); // HTML में #comment-input
    const charCounter = form.querySelector('.comment-form-char-counter');

    parentIdInput.value = commentId;
    pageIdInput.value = pageId; // सबमिशन के लिए pageId सेट करें
    replyingToEl.innerHTML = `आप <strong class="text-primary">${escapeHTML(authorName)}</strong> के कमेंट पर रिप्लाई कर रहे हैं।`;
    replyingToEl.style.display = 'block';
    cancelBtn.style.display = 'inline-block';
    commentInput.value = ''; // टेक्स्ट इनपुट साफ़ करें
    charCounter.textContent = '0 / 1000';

    // char counter अपडेट करने के लिए इवेंट लिसनर
    commentInput.addEventListener('input', () => {
        charCounter.textContent = `${commentInput.value.length} / 1000`;
    });

    targetSlot.appendChild(formClone);
    activeReplyForm = formClone;
    commentInput.focus();
}

// ====== Delete Logic ======
async function deleteWithDescendants(rootId, pageId) {
    if (!currentUser || !isOwner) { // सुनिश्चित करें कि केवल मालिक ही हटा सके
        alert("आपको कमेंट हटाने की अनुमति नहीं है।");
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

    // ऑप्टिमिस्टिक UI अपडेट (तत्काल हटाना दिखाएं)
    // allComments = allComments.filter(c => !toDeleteIds.has(c.id)); // यह Realtime listener के साथ थोड़ा जटिल हो सकता है
    // renderDashboard(allComments); // इसलिए इसे हटाने के बाद Firestore listener खुद ही अपडेट कर देगा

    if (confirm(`क्या आप इस कमेंट और इसके सभी ${toDeleteIds.size - 1} रिप्लाई हटाना चाहते हैं?`)) {
        try {
            const deletePromises = [...toDeleteIds].map(id =>
                db.collection('pages').doc(pageId).collection('comments').doc(id).delete()
            );
            await Promise.all(deletePromises);
            alert("कमेंट सफलतापूर्वक हटा दिए गए।");
            // Firestore listener अपने आप UI को अपडेट कर देगा
        } catch (error) {
            console.error("कमेंट्स हटाने में विफल रहा:", error);
            alert("कमेंट हटाने में त्रुटि आई।");
            // त्रुटि होने पर, Firestore listener UI को सर्वर से सही स्थिति में वापस लाएगा
        }
    }
}

// ====== Delegated Event Listeners Setup ======
function setupDelegatedListeners() {
    // customCommentSection के अंदर सभी क्लिक इवेंट्स को हैंडल करें
    customCommentSection.addEventListener('click', async (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        // रिप्लाई फॉर्म के कैंसिल बटन के लिए
        if (button.id === 'cancel-reply') {
            closeActiveReplyForm();
            return;
        }

        const action = button.dataset.action;
        if (!action) return; // केवल data-action वाले बटनों को प्रोसेस करें

        const commentItem = button.closest('.comment-item');
        if (!commentItem) return;

        const commentId = commentItem.dataset.commentId;
        const pageId = commentItem.dataset.pageId;

        if (!commentId || !pageId) {
            console.error("कमेंट ID या पेज ID नहीं मिला।");
            return;
        }

        const node = allComments.find(c => c.id === commentId && c.pageId === pageId);
        if (!node) {
            console.error("कमेंट नोड नहीं मिला।");
            return;
        }

        switch (action) {
            case 'reply':
                if (!currentUser) {
                    alert("रिप्लाई करने के लिए कृपया साइन इन करें।");
                    return;
                }
                if (!isOwner) {
                    alert("केवल साइट एडमिनिस्ट्रेटर ही रिप्लाई कर सकते हैं।");
                    return;
                }
                const replySlot = commentItem.querySelector('.inline-reply-slot');
                openReplyForm(node.id, node.name, replySlot, pageId);
                break;
            case 'delete':
                if (isOwner) { // केवल मालिक ही हटा सकता है
                    deleteWithDescendants(node.id, pageId);
                } else {
                    alert("आपको इस कमेंट को हटाने की अनुमति नहीं है।");
                }
                break;
            // यहां आप लाइक/डिसलाइक के लिए भी लॉजिक जोड़ सकते हैं
        }
    });

    // customCommentSection के अंदर सभी फॉर्म सबमिशन को हैंडल करें (रिप्लाई फॉर्म के लिए)
    customCommentSection.addEventListener('submit', async e => {
        e.preventDefault();
        const form = e.target;
        // सुनिश्चित करें कि यह रिप्लाई फॉर्म है और उपयोगकर्ता लॉग-इन है
        if (!form.matches('.comment-form') || !currentUser || !isOwner) return;

        const commentInput = form.querySelector('#comment-input');
        const parentIdInput = form.querySelector('#parent-id');
        const pageIdInput = form.querySelector('#page-id'); // pageId इनपुट
        const submitButton = form.querySelector('#submit-button');

        const commentText = commentInput.value.trim();
        const parentId = parentIdInput.value;
        const pageId = pageIdInput.value; // pageId प्राप्त करें

        if (!commentText || !parentId || !pageId) { // pageId भी आवश्यक है
            alert("कृपया अपना रिप्लाई लिखें और सुनिश्चित करें कि सभी जानकारी उपलब्ध है।");
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = `<span class="spinner-small"></span> पोस्ट कर रहा है...`;

        try {
            // सही पेज के कमेंट्स कलेक्शन में जोड़ें
            await db.collection('pages').doc(pageId).collection('comments').add({
                name: currentUser.displayName,
                uid: currentUser.uid,
                profilePicUrl: currentUser.photoURL,
                comment: commentText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                parentId: parentId,
                likes: 0, dislikes: 0, likedBy: [], dislikedBy: []
            });
            alert('रिप्लाई सफलतापूर्वक पोस्ट किया गया!');
            closeActiveReplyForm(); // फॉर्म बंद करें
        } catch (err) {
            console.error('रिप्लाई जोड़ने में त्रुटि:', err);
            alert('रिप्लाई पोस्ट नहीं हो सका।');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'जवाब सबमिट करें';
        }
    });
}

// --- NOTIFICATION LOGIC (FCM) ---
// सर्विस वर्कर पंजीकरण
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
                // SW को प्रारंभिक दृश्यता स्थिति भेजें
                if (navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({
                        type: 'VISIBILITY_CHANGE',
                        pageId: 'main_page', // यह डैशबोर्ड 'main_page' के रूप में कार्य करता है
                        isVisible: document.visibilityState === 'visible'
                    });
                }
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });

    // SW को दृश्यता परिवर्तनों के बारे में सूचित करें
    document.addEventListener('visibilitychange', () => {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'VISIBILITY_CHANGE',
                pageId: 'main_page', // यह डैशबोर्ड 'main_page' के रूप में कार्य करता है
                isVisible: document.visibilityState === 'visible'
            });
        }
    });
}

// नोटिफिकेशन बटन की स्थिति को अपडेट करने के लिए
async function updateNotificationButtonState() {
    if (!notificationButton) return;

    notificationButton.style.display = 'none'; // Default hide

    if (!currentUser || !isOwner) { // केवल मालिक ही डैशबोर्ड के लिए नोटिफिकेशन मैनेज कर सकता है
        return;
    }

    // अनुमति/टोकन की जांच करते समय स्पिनर दिखाएं
    if (notificationSpinnerIcon) notificationSpinnerIcon.style.display = 'block';
    if (notificationBellIcon) notificationBellIcon.style.display = 'none';
    if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'none';
    notificationButton.style.display = 'inline-block';

    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const currentToken = await messaging.getToken();
            if (currentToken) {
                // जांचें कि यह टोकन मालिक के लिए Firestore में सहेजा गया है या नहीं
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
                    // मालिक के लिए कोई टोकन डॉक नहीं, इसलिए सब्सक्राइब्ड नहीं
                    if (notificationBellIcon) notificationBellIcon.style.display = 'none';
                    if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
                    notificationButton.dataset.subscribed = 'false';
                }
            } else {
                // कोई टोकन नहीं, इसलिए सब्सक्राइब्ड नहीं
                if (notificationBellIcon) notificationBellIcon.style.display = 'none';
                if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
                notificationButton.dataset.subscribed = 'false';
            }
        } else {
            // अनुमति अस्वीकृत, बेल-ऑफ दिखाएं
            if (notificationBellIcon) notificationBellIcon.style.display = 'none';
            if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
            notificationButton.dataset.subscribed = 'false';
        }
    } catch (error) {
        console.error("नोटिफिकेशन बटन की स्थिति अपडेट करने में त्रुटि:", error);
        if (notificationBellIcon) notificationBellIcon.style.display = 'none';
        if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
        notificationButton.dataset.subscribed = 'false';
    } finally {
        if (notificationSpinnerIcon) notificationSpinnerIcon.style.display = 'none';
    }
}

// नोटिफिकेशन बटन पर क्लिक हैंडलर
if (notificationButton) {
    notificationButton.addEventListener('click', async () => {
        if (!currentUser || !isOwner) {
            alert("आपको नोटिफ़िकेशन मैनेज करने के लिए साइन इन करना होगा।");
            return;
        }

        if (notificationSpinnerIcon) notificationSpinnerIcon.style.display = 'block';
        if (notificationBellIcon) notificationBellIcon.style.display = 'none';
        if (notificationBellOffIcon) notificationBellOffIcon.style.display = 'none';

        try {
            const subscribed = notificationButton.dataset.subscribed === 'true';

            if (subscribed) {
                // अनसब्सक्राइब करें
                const currentToken = await messaging.getToken();
                if (currentToken) {
                    await messaging.deleteToken(currentToken);
                    // Firestore से टोकन हटाएँ
                    const userTokenRef = db.collection('userTokens').doc(OWNER_UID);
                    await db.runTransaction(async (transaction) => {
                        const doc = await transaction.get(userTokenRef);
                        if (doc.exists) {
                            const tokens = doc.data().tokens || [];
                            const updatedTokens = tokens.filter(t => t !== currentToken);
                            transaction.update(userTokenRef, { tokens: updatedTokens });
                        }
                    });
                    alert("नोटिफ़िकेशन सफलतापूर्वक बंद कर दिए गए हैं।");
                }
            } else {
                // सब्सक्राइब करें
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    const newToken = await messaging.getToken();
                    if (newToken) {
                        // टोकन को Firestore में सहेजें
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
                        alert("नोटिफ़िकेशन सफलतापूर्वक चालू कर दिए गए हैं।");
                    } else {
                        alert("नोटिफ़िकेशन टोकन प्राप्त करने में असमर्थ।");
                    }
                } else {
                    alert("नोटिफ़िकेशन चालू करने के लिए आपको ब्राउज़र अनुमतियाँ देनी होंगी।");
                }
            }
        } catch (error) {
            console.error("नोटिफ़िकेशन मैनेज करते समय त्रुटि:", error);
            alert("नोटिफ़िकेशन मैनेज करते समय त्रुटि आई।");
        } finally {
            updateNotificationButtonState(); // एक्शन के बाद UI अपडेट करें
        }
    });
}

// ====== Initializer ======
document.addEventListener('DOMContentLoaded', () => {
    // Authentication observer पहले ही `auth.onAuthStateChanged` द्वारा सेट हो चुका है
    setupDelegatedListeners();
});
