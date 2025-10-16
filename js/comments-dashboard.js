// js/comments-dashboard.js

// Firebase Initialisation (compatibility SDK का उपयोग करके)
const firebaseConfig = {
    apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
    authDomain: "appcomment.firebaseapp.com",
    projectId: "appcomment",
    storageBucket: "appcomment.firebasestorage.app",
    messagingSenderId: "156258808941",
    appId: "1:156258808941:web:04a1f7470ac43657c7fb64"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const messaging = firebase.messaging(); // नोटिफिकेशन के लिए

// --- CONSTANTS ---
const OWNER_UID = "Pq5f4jTfiEOJCtXBLG0mZyyikIC2"; // आपके क्लाउड फंक्शन से लिया गया मालिक का UID

// --- STATE ---
let currentUser = null; // वर्तमान लॉग-इन उपयोगकर्ता
let isOwner = false;    // क्या वर्तमान उपयोगकर्ता मालिक है
const commentsMap = new Map(); // कमेंट्स को ID द्वारा स्टोर करने के लिए (प्रबंधन और रेंडरिंग में आसानी के लिए)

// --- UI ELEMENTS ---
// HTML में मौजूद एलिमेंट्स को JavaScript वेरिएबल्स से लिंक करें
const dashboardAuthPrompt = document.getElementById('dashboard-auth-prompt');
const customCommentSection = document.getElementById('custom-comment-section');
const googleLoginBtn = document.getElementById('google-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfoDiv = document.getElementById('user-info');
const ownerViewDiv = document.getElementById('owner-view');
const nonOwnerMessage = document.getElementById('non-owner-message');
const replyFormWrapper = document.getElementById('reply-form-wrapper');
const replyCommentForm = document.getElementById('reply-comment-form');
const replyingToText = document.getElementById('replying-to-text');
const replyCommentTextarea = document.getElementById('reply-comment-textarea');
const replyParentIdInput = document.getElementById('reply-parent-id');
const replyPageIdInput = document.getElementById('reply-page-id');
const cancelReplyButton = document.getElementById('cancel-reply-button');
const replyCharCounter = document.getElementById('reply-char-counter');
const notificationButton = document.getElementById('notification-btn');
const notificationBellIcon = notificationButton ? notificationButton.querySelector('.bell-icon') : null;
const notificationBellOffIcon = notificationButton ? notificationButton.querySelector('.bell-off-icon') : null;
const notificationSpinnerIcon = notificationButton ? notificationButton.querySelector('.spinner-icon') : null;

// --- HELPER FUNCTIONS ---

// pageId को पढ़ने योग्य फॉर्मेट में बदलने के लिए (जैसे 'computer_science' -> 'Computer Science')
function formatPageId(pageId) {
    if (!pageId) return 'अज्ञात पेज';
    return pageId.replace(/_/g, " ")
                 .split(" ")
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(" ");
}

// सभी कमेंट्स को current commentsMap के आधार पर रेंडर करता है
function renderComments() {
    ownerViewDiv.innerHTML = ''; // मौजूदा कमेंट्स को साफ़ करें

    if (commentsMap.size === 0) {
        ownerViewDiv.innerHTML = '<p class="muted" style="text-align: center; padding: 20px;">अभी कोई कमेंट उपलब्ध नहीं है।</p>';
        return;
    }

    // कमेंट्स को पहले pageId द्वारा ग्रुप करें
    const commentsByPage = new Map();
    Array.from(commentsMap.values()).forEach(comment => {
        if (!commentsByPage.has(comment.pageId)) {
            commentsByPage.set(comment.pageId, []);
        }
        commentsByPage.get(comment.pageId).push(comment);
    });

    // पेजों को नाम के अनुसार सॉर्ट करें
    const sortedPageIds = Array.from(commentsByPage.keys()).sort();

    sortedPageIds.forEach(pageId => {
        const pageContainer = document.createElement('div');
        pageContainer.className = 'page-comments-container'; // CSS के लिए क्लास
        pageContainer.innerHTML = `<h2>पेज: <a href="https://gklearnstudy.in/${pageId === 'main_page' ? '' : pageId.replace(/_/g, "/") + '.html'}" target="_blank">${formatPageId(pageId)}</a></h2>`;
        
        const pageComments = commentsByPage.get(pageId);

        // रिप्लाई के लिए पदानुक्रम बनाने के लिए
        const topLevelComments = pageComments.filter(c => !c.parentId);
        // रिप्लाई को एक अलग सेट में रखें ताकि रिकर्शन आसान हो
        const replies = pageComments.filter(c => c.parentId);

        const buildCommentTree = (commentsToProcess, parentId = null) => {
            const children = commentsToProcess.filter(c => c.parentId === parentId);
            children.sort((a, b) => (a.createdAt && b.createdAt) ? a.createdAt.toDate().getTime() - b.createdAt.toDate().getTime() : 0);

            let html = '';
            children.forEach(comment => {
                const commentDate = comment.createdAt ? new Date(comment.createdAt.toDate()).toLocaleString() : 'दिनांक उपलब्ध नहीं';
                const profilePic = comment.profilePicUrl || 'https://via.placeholder.com/30';
                const commentAuthor = comment.name || 'अनाम';

                // .comment-body क्लास का उपयोग करें
                html += `
                    <div class="comment ${comment.parentId ? 'is-reply' : ''}" id="comment-${comment.id}">
                        <div class="comment-header">
                            <img src="${profilePic}" alt="${commentAuthor}'s profile picture" class="comment-avatar">
                            <span class="comment-author">${commentAuthor}</span>
                            <span class="comment-date">${commentDate}</span>
                        </div>
                        <p class="comment-body">${comment.comment}</p>
                        ${isOwner ? `<button class="btn btn-small reply-btn" data-page-id="${comment.pageId}" data-parent-id="${comment.id}" data-comment-author="${commentAuthor}">रिप्लाई करें</button>` : ''}
                        <div class="replies-container">
                            ${buildCommentTree(replies, comment.id)}
                        </div>
                    </div>
                `;
            });
            return html;
        };

        const topLevelHtml = buildCommentTree(topLevelComments.concat(replies)); // रिकर्शन के लिए सभी कमेंट्स पास करें
        pageContainer.innerHTML += topLevelHtml;
        ownerViewDiv.appendChild(pageContainer);
    });

    // रिप्लाई बटन के लिए इवेंट लिसनर्स जोड़ें
    document.querySelectorAll('.reply-btn').forEach(button => {
        button.onclick = (event) => {
            const pageId = event.target.dataset.pageId;
            const parentId = event.target.dataset.parentId;
            const commentAuthor = event.target.dataset.commentAuthor;
            
            // फॉर्म के मान सेट करें
            replyPageIdInput.value = pageId;
            replyParentIdInput.value = parentId;
            replyCommentTextarea.value = ''; // टेक्स्ट एरिया साफ़ करें
            replyCharCounter.textContent = '0 / 1000';
            
            replyingToText.innerHTML = `आप <strong class="text-primary">${commentAuthor}</strong> के कमेंट पर रिप्लाई कर रहे हैं, जो पेज <strong class="text-primary">${formatPageId(pageId)}</strong> पर है।`;
            
            replyFormWrapper.style.display = 'block'; // रिप्लाई फॉर्म दिखाएं
            replyFormWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' }); // फॉर्म पर स्क्रॉल करें
        };
    });
}

// Firestore कमेंट्स में रियल-टाइम बदलावों को सुनता है
let commentsUnsubscribe = null;
function startListeningForComments() {
    if (commentsUnsubscribe) {
        commentsUnsubscribe(); // यदि कोई पिछला लिसनर हो तो उसे अनसब्सक्राइब करें
    }
    commentsMap.clear(); // नया लिसनर शुरू करने से पहले मैप साफ़ करें
    ownerViewDiv.innerHTML = '<p class="muted" style="text-align: center; padding: 20px;">कमेंट्स लोड हो रहे हैं...</p>';

    // महत्वपूर्ण: collectionGroup queries के लिए, आपको Firestore इंडेक्स की आवश्यकता होगी।
    // जब आप पहली बार इस क्वेरी को बिना इंडेक्स के चलाएंगे, तो Firebase कंसोल आपको एक लिंक देगा जिससे आप इसे स्वचालित रूप से बना सकते हैं।
    commentsUnsubscribe = db.collectionGroup('comments')
                            .orderBy('createdAt', 'asc') // टाइमस्टैम्प द्वारा क्रमबद्ध करें
                            .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            const commentData = change.doc.data();
            const commentId = change.doc.id;
            // 'comments' कलेक्शन के पैरेंट डॉक्यूमेंट से pageId प्राप्त करें
            const pageId = change.doc.ref.parent.parent.id; 

            if (change.type === 'added' || change.type === 'modified') {
                commentsMap.set(commentId, { id: commentId, pageId: pageId, ...commentData });
            } else if (change.type === 'removed') {
                commentsMap.delete(commentId);
            }
        });
        renderComments(); // किसी भी बदलाव पर सभी कमेंट्स को फिर से रेंडर करें
    }, error => {
        console.error("कमेंट्स प्राप्त करते समय त्रुटि:", error);
        ownerViewDiv.innerHTML = '<p class="error-message">कमेंट्स लोड करने में त्रुटि आई। कृपया Firebase कंसोल में कलेक्शन ग्रुप इंडेक्स की जांच करें।</p>';
    });
}

// --- AUTHENTICATION HANDLERS ---

googleLoginBtn.addEventListener('click', async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.signInWithPopup(provider);
    } catch (error) {
        console.error("Google साइन इन करते समय त्रुटि:", error);
        alert("Google साइन इन करते समय त्रुटि आई। कृपया पुनः प्रयास करें।");
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
            नमस्ते, <span class="text-primary">${user.displayName || 'अनाम उपयोगकर्ता'}</span>! 
            <img src="${user.photoURL || 'https://via.placeholder.com/30'}" alt="User Photo" width="30" height="30" style="border-radius: 50%; vertical-align: middle; margin-left: 5px;">
        `;
        userInfoDiv.style.display = 'block';
        dashboardAuthPrompt.style.display = 'none';

        if (isOwner) {
            customCommentSection.style.display = 'block';
            nonOwnerMessage.style.display = 'none';
            startListeningForComments(); // मालिक के लिए कमेंट्स सुनना शुरू करें
        } else {
            customCommentSection.style.display = 'none';
            nonOwnerMessage.style.display = 'block';
            if (commentsUnsubscribe) {
                commentsUnsubscribe(); // यदि मालिक नहीं है तो सुनना बंद करें
            }
        }

        // मालिक/उपयोगकर्ता के लिए नोटिफिकेशन बटन की स्थिति को इनिशियलाइज़ करें
        updateNotificationButtonState(); 

    } else {
        // उपयोगकर्ता लॉग आउट है।
        googleLoginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        userInfoDiv.style.display = 'none';
        customCommentSection.style.display = 'none';
        dashboardAuthPrompt.style.display = 'block';
        nonOwnerMessage.style.display = 'none';
        replyFormWrapper.style.display = 'none'; // रिप्लाई फॉर्म छिपाएं
        if (commentsUnsubscribe) {
            commentsUnsubscribe(); // सुनना बंद करें
        }
    }
});

// --- REPLY FORM HANDLERS ---

replyCommentTextarea.addEventListener('input', () => {
    const charCount = replyCommentTextarea.value.length;
    replyCharCounter.textContent = `${charCount} / 1000`;
});

cancelReplyButton.addEventListener('click', () => {
    replyFormWrapper.style.display = 'none';
    replyCommentTextarea.value = '';
    replyCharCounter.textContent = '0 / 1000';
});

replyCommentForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // फॉर्म के डिफ़ॉल्ट सबमिशन को रोकें

    if (!currentUser) {
        alert("रिप्लाई करने के लिए पहले साइन इन करें।");
        return;
    }
    if (!isOwner) {
        alert("केवल मालिक ही रिप्लाई कर सकते हैं।");
        return;
    }

    const pageId = replyPageIdInput.value;
    const parentId = replyParentIdInput.value;
    const commentText = replyCommentTextarea.value.trim();

    if (!commentText) {
        alert("कृपया अपना रिप्लाई लिखें।");
        return;
    }

    try {
        await db.collection('pages').doc(pageId).collection('comments').add({
            comment: commentText,
            name: currentUser.displayName || 'अनाम उपयोगकर्ता',
            uid: currentUser.uid,
            profilePicUrl: currentUser.photoURL || '',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(), // सर्वर टाइमस्टैम्प का उपयोग करें
            parentId: parentId // पैरेंट कमेंट ID जोड़ें
        });
        alert("आपका रिप्लाई सफलतापूर्वक पोस्ट हो गया है!");
        replyFormWrapper.style.display = 'none';
        replyCommentTextarea.value = '';
        replyCharCounter.textContent = '0 / 1000';
    } catch (error) {
        console.error("रिप्लाई पोस्ट करते समय त्रुटि:", error);
        alert("रिप्लाई पोस्ट करते समय त्रुटि आई। कृपया पुनः प्रयास करें।");
    }
});


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
    if (!notificationButton) return; // अगर बटन मौजूद नहीं है तो बाहर निकलें

    notificationButton.style.display = 'none'; // डिफ़ॉल्ट रूप से छिपाएं

    if (!currentUser || !isOwner) { // केवल मालिक ही डैशबोर्ड के लिए नोटिफिकेशन मैनेज कर सकता है
        return;
    }

    // अनुमति/टोकन की जांच करते समय स्पिनर दिखाएं
    if(notificationSpinnerIcon) notificationSpinnerIcon.style.display = 'block';
    if(notificationBellIcon) notificationBellIcon.style.display = 'none';
    if(notificationBellOffIcon) notificationBellOffIcon.style.display = 'none';
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
                        if(notificationBellIcon) notificationBellIcon.style.display = 'block';
                        if(notificationBellOffIcon) notificationBellOffIcon.style.display = 'none';
                        notificationButton.dataset.subscribed = 'true';
                    } else {
                        if(notificationBellIcon) notificationBellIcon.style.display = 'none';
                        if(notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
                        notificationButton.dataset.subscribed = 'false';
                    }
                } else {
                    // मालिक के लिए कोई टोकन डॉक नहीं, इसलिए सब्सक्राइब्ड नहीं
                    if(notificationBellIcon) notificationBellIcon.style.display = 'none';
                    if(notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
                    notificationButton.dataset.subscribed = 'false';
                }
            } else {
                // कोई टोकन नहीं, इसलिए सब्सक्राइब्ड नहीं
                if(notificationBellIcon) notificationBellIcon.style.display = 'none';
                if(notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
                notificationButton.dataset.subscribed = 'false';
            }
        } else {
            // अनुमति अस्वीकृत, बेल-ऑफ दिखाएं
            if(notificationBellIcon) notificationBellIcon.style.display = 'none';
            if(notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
            notificationButton.dataset.subscribed = 'false';
        }
    } catch (error) {
        console.error("नोटिफिकेशन बटन की स्थिति अपडेट करने में त्रुटि:", error);
        if(notificationBellIcon) notificationBellIcon.style.display = 'none';
        if(notificationBellOffIcon) notificationBellOffIcon.style.display = 'block';
        notificationButton.dataset.subscribed = 'false';
    } finally {
        if(notificationSpinnerIcon) notificationSpinnerIcon.style.display = 'none';
    }
}

// नोटिफिकेशन बटन पर क्लिक हैंडलर
if(notificationButton) {
    notificationButton.addEventListener('click', async () => {
        if (!currentUser || !isOwner) {
            alert("आपको नोटिफ़िकेशन मैनेज करने के लिए साइन इन करना होगा।");
            return;
        }

        if(notificationSpinnerIcon) notificationSpinnerIcon.style.display = 'block';
        if(notificationBellIcon) notificationBellIcon.style.display = 'none';
        if(notificationBellOffIcon) notificationBellOffIcon.style.display = 'none';

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
