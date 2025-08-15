(async function() {
    // Error filter: Firestore related errors hide
    (function() {
        const originalError = console.error;
        console.error = function(...args) {
            const msg = args.join(" ");
            if (/firestore\.googleapis\.com.*Listen\/channel/i.test(msg) || /ERR_TIMED_OUT/i.test(msg) || /404/.test(msg)) {
                return;
            }
            originalError.apply(console, args);
        };
    })();

    // Firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
        authDomain: "appcomment.firebaseapp.com",
        projectId: "appcomment",
        storageBucket: "appcomment.firebasestorage.app",
        messagingSenderId: "156258808941",
        appId: "1:156258808941:web:04a1f7470ac43657c7fb64",
        measurementId: "G-2HX1M5QQ44"
    };

    // Helper functions
    const escapeHTML = (str) => String(str ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
    const safeToDate = (timestamp) => (timestamp && typeof timestamp.toDate === 'function') ? timestamp.toDate() : new Date();
    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 5) return "just now";
        const intervals = { 'year': 31536000, 'month': 2592000, 'day': 86400, 'hour': 3600, 'minute': 60, 'second': 1 };
        for (const unit in intervals) {
            const interval = seconds / intervals[unit];
            if (interval > 1) {
                const floor = Math.floor(interval);
                return `${floor} ${unit}${floor === 1 ? '' : 's'} ago`;
            }
        }
        return 'just now';
    };

    // Load Firebase
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js");
    const {
        getFirestore,
        collection,
        addDoc,
        orderBy,
        serverTimestamp,
        doc,
        deleteDoc,
        getDocs
    } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js");

    // Init
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const widgetContainer = document.querySelector('.firebase-comments-widget');
    const commentForm = widgetContainer.querySelector('#comment-form');
    const nameInput = widgetContainer.querySelector('#name');
    const commentInput = widgetContainer.querySelector('#comment');
    const submitButton = widgetContainer.querySelector('#submit-button');
    const commentsList = widgetContainer.querySelector('#comments-list');
    const charCounter = widgetContainer.querySelector('#char-counter');

    const updateCharCounter = () => {
        const currentLength = commentInput.value.length;
        const maxLength = commentInput.maxLength;
        charCounter.textContent = `${currentLength} / ${maxLength}`;
    };

    const createCommentElement = (id, data) => {
        const element = document.createElement('div');
        element.classList.add('comment-item');
        element.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${escapeHTML(data.name)}</span>
                <span class="comment-date">${timeAgo(safeToDate(data.timestamp))}</span>
            </div>
            <p class="comment-body">${escapeHTML(data.comment)}</p>
            <div class="comment-actions">
                <button class="action-btn delete-btn" aria-label="Delete">Delete</button>
            </div>
        `;
        element.querySelector('.delete-btn').addEventListener('click', async () => {
            if (!confirm("Delete this comment?")) return;
            await deleteDoc(doc(db, 'pages', pageId, 'comments', id));
            loadComments(); // reload after delete
        });
        return element;
    };

    const pageId = (() => {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html' || path === '') {
            return 'main_page';
        }
        return path.substring(1).replace(/\/$/, '').replace(/\//g, '_');
    })();

    const commentsCollectionPath = ['pages', pageId, 'comments'];

    async function loadComments() {
        commentsList.innerHTML = `<div class="spinner-container"><div class="spinner"></div><p>Loading comments...</p></div>`;
        try {
            const querySnapshot = await getDocs(collection(db, ...commentsCollectionPath));
            commentsList.innerHTML = '';
            if (querySnapshot.empty) {
                commentsList.innerHTML = `<div class="no-comments"><p><strong>No comments yet.</strong></p></div>`;
                return;
            }
            querySnapshot.forEach(docSnap => {
                const commentElement = createCommentElement(docSnap.id, docSnap.data());
                commentsList.appendChild(commentElement);
            });
        } catch (err) {
            console.error("Error loading comments:", err);
            commentsList.innerHTML = `<div class="config-error"><p>Could not load comments.</p></div>`;
        }
    }

    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();
        if (!name || !comment) return;
        submitButton.disabled = true;
        submitButton.textContent = 'Posting...';
        try {
            await addDoc(collection(db, ...commentsCollectionPath), { name, comment, timestamp: serverTimestamp() });
            commentForm.reset();
            updateCharCounter();
            loadComments(); // reload after new comment
        } catch (err) {
            console.error("Error adding comment:", err);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Post Comment';
        }
    });

    commentInput.addEventListener('input', updateCharCounter);
    updateCharCounter();
    loadComments();
})();
