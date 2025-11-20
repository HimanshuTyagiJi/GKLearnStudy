
import { GoogleGenAI } from "https://esm.run/@google/genai";
import { marked } from "https://esm.run/marked@12.0.2";
import DOMPurify from "https://esm.run/dompurify@3.0.8";

// --- 1. HTML Injection ---
function injectWidgetHTML() {
    if (document.getElementById('ai-chat-widget')) return;

    const widgetHTML = `
    <button id="ai-widget-toggle-btn" aria-label="Toggle AI Chat" style="z-index: 10000;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 13.5C20 13.09 19.67 12.75 19.25 12.75C18.83 12.75 18.5 13.09 18.5 13.5V14.5C18.5 17.26 16.26 19.5 13.5 19.5C13.09 19.5 12.75 19.83 12.75 20.25C12.75 20.67 13.09 21 13.5 21C17.09 21 20 18.09 20 14.5V13.5M10.5 3C7.91 3 5.5 5.41 5.5 8V9C5.5 9.41 5.17 9.75 4.75 9.75C4.33 9.75 4 9.41 4 9V8C4 4.91 6.91 2 10.5 2C14.09 2 17 4.91 17 8V9C17 9.41 16.67 9.75 16.25 9.75C15.83 9.75 15.5 9.41 15.5 9V8C15.5 5.41 13.09 3 10.5 3M10.5 13.5C10.5 13.09 10.17 12.75 9.75 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H9.75C10.17 11.25 10.5 10.91 10.5 10.5C10.5 10.09 10.17 9.75 9.75 9.75H8C6.75 9.75 5.75 10.75 5.75 12C5.75 13.25 6.75 14.25 8 14.25H9.75C10.17 14.25 10.5 13.91 10.5 13.5M16 12.75H14.25C13.83 12.75 13.5 13.09 13.5 13.5C13.5 13.91 13.83 14.25 14.25 14.25H16C17.25 14.25 18.25 13.25 18.25 12C18.25 10.75 17.25 9.75 16 9.75H14.25C13.83 9.75 13.5 10.09 13.5 10.5C13.5 10.91 13.83 11.25 14.25 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"></path></svg>
    </button>
    
    <div id="ai-chat-widget">
        <div class="ai-container">
            <aside id="history-panel">
                <div class="history-header">
                    <h2>History</h2>
                    <div class="history-header-actions">
                        <button id="clear-history-btn">Clear</button>
                        <button id="close-history-btn" aria-label="Close History">&times;</button>
                    </div>
                </div>
                <ul id="history-list">
                    <li>No history yet.</li>
                </ul>
            </aside>

            <section id="chat-area">
                <header class="chat-header">
                     <div class="chat-header-left">
                        <button id="menu-toggle" aria-label="Toggle History Menu">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
                        </button>
                        <h1>AI Solver</h1>
                        <button id="new-chat-btn" aria-label="Start New Chat">New Chat</button>
                    </div>
                    <div class="chat-header-right">
                        <button id="full-view-btn" aria-label="Toggle Full View">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17H7V14H5V19H10V17Z"></path></svg>
                        </button>
                        <button id="close-widget-btn" aria-label="Close Chat">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                        </button>
                    </div>
                </header>
                <div id="chat-log" role="log" aria-live="polite"></div>
                <div class="chat-input-area">
                    <form id="ai-solver-form">
                        <textarea id="question-input" rows="1" placeholder="अपना सवाल यहाँ पूछें..." required></textarea>
                        <button type="submit" id="solve-button" aria-label="Send message">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path></svg>
                        </button>
                    </form>
                </div>
            </section>
        </div>
    </div>

    <div id="preview-modal">
        <div class="preview-content">
            <div class="preview-header">
                <h3>Code Preview</h3>
                <button id="close-preview-btn">&times;</button>
            </div>
            <iframe id="preview-iframe"></iframe>
        </div>
    </div>
    `;

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '0';
    container.style.height = '0';
    container.style.pointerEvents = 'none'; 
    container.innerHTML = widgetHTML;
    document.body.appendChild(container);

    if (!document.querySelector('link[href="css/chat-widget.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/chat-widget.css';
        document.head.appendChild(link);
    }
    if (!document.querySelector('script[src="js/search-data.js"]')) {
        const script = document.createElement('script');
        script.src = '/js/search-data.js';
        document.head.appendChild(script);
    }
}

// --- 2. Main Logic ---
function initializeApp() {
    injectWidgetHTML();

    const get = (id) => document.getElementById(id);
    let ai;
    let chatHistory = [];
    let currentChatIndex = -1; 
    const placeholders = ["2+2 का हल करें...", "होली पर निबंध...", "What is photosynthesis?", "HTML code...", "vyakaran kya hai?", "Story about a lion."];
    let placeholderIndex = 0;

    // Elements
    const historyPanel = get('history-panel');
    const chatLog = get('chat-log');
    const questionInput = get('question-input');
    const historyList = get('history-list');
    const chatWidget = get('ai-chat-widget');
    
    // 1. Initialize Events FIRST to ensure buttons work
    attachEventListeners();
    
    // 2. Load History immediately so user sees old chats
    loadHistory();

    // 3. Initialize AI (Silent fail if network bad, but UI still works for local search/history)
    try {
        // Using the key you provided
        ai = new GoogleGenAI({ apiKey: "AIzaSyADifk5i87QT2q5EaChypYmfu4NalKcUiU" });
    } catch (error) {
        console.error("AI Init Error:", error);
    }
    
    setInterval(() => {
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        if(questionInput) questionInput.placeholder = placeholders[placeholderIndex];
    }, 4000);

    function attachEventListeners() {
        // Toggle Widget
        get('ai-widget-toggle-btn')?.addEventListener('click', () => {
            chatWidget.classList.add('active');
            get('ai-widget-toggle-btn').style.display = 'none';
            // Scroll to bottom when opening
            setTimeout(() => chatLog.scrollTop = chatLog.scrollHeight, 100);
        });

        get('close-widget-btn')?.addEventListener('click', () => {
            chatWidget.classList.remove('active');
            get('ai-widget-toggle-btn').style.display = 'flex';
        });

        // Full View
        get('full-view-btn')?.addEventListener('click', () => chatWidget.classList.toggle('full-view'));

        // New Chat
        get('new-chat-btn')?.addEventListener('click', startNewChat);

        // History Menu
        get('menu-toggle')?.addEventListener('click', () => historyPanel.classList.toggle('active'));
        get('close-history-btn')?.addEventListener('click', () => historyPanel.classList.remove('active'));
        get('clear-history-btn')?.addEventListener('click', clearHistory);
        historyList?.addEventListener('click', handleHistoryClick);

        // Input Form
        get('ai-solver-form')?.addEventListener('submit', handleFormSubmit);
        questionInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleFormSubmit(e);
            }
        });
        questionInput?.addEventListener('input', () => {
            questionInput.style.height = 'auto';
            questionInput.style.height = (questionInput.scrollHeight) + 'px';
        });

        // Actions (Copy/Edit/Preview)
        chatLog?.addEventListener('click', handleChatLogClicks);
        
        // Modal Close
        get('close-preview-btn')?.addEventListener('click', () => get('preview-modal').classList.remove('active'));
    }

    function loadHistory() {
        try {
            const saved = localStorage.getItem('aiChatHistory');
            chatHistory = saved ? JSON.parse(saved) : [];
        } catch (e) {
            chatHistory = [];
        }
        renderHistoryList();

        // If history exists, load the most recent one (index 0) automatically
        if (chatHistory.length > 0) {
            loadChatFromHistory(0);
        } else {
            // If no history, start a fresh chat
            startNewChat();
        }
    }

    function startNewChat() {
        currentChatIndex = -1;
        chatLog.innerHTML = `
            <div class="chat-message ai-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ? आप गणित, विज्ञान, इतिहास या किसी भी विषय पर सवाल पूछ सकते हैं।</p>
                </div>
            </div>`;
        questionInput.value = '';
        renderHistoryList();
        historyPanel.classList.remove('active');
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const userQuestion = questionInput.value.trim();
        if (!userQuestion) return;

        // 1. Show user message
        appendMessage(userQuestion, 'user');
        questionInput.value = '';
        questionInput.style.height = 'auto';

        // 2. Call AI
        submitQuestionToAI(userQuestion);
    }

    function appendMessage(content, type) {
        const isUser = type === 'user';
        const div = document.createElement('div');
        div.className = `chat-message ${type}-message`;
        
        let innerContent = '';
        if (isUser) {
            innerContent = `
                <div class="message-content">
                    <p>${escapeHTML(content)}</p>
                    <button class="edit-btn" data-action="edit" aria-label="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z"></path></svg>
                    </button>
                </div>
                <div class="message-avatar" style="background-color:var(--primary-color)">You</div>`;
        } else {
             innerContent = `
                <div class="message-avatar" style="background-color:#19c37d">🤖</div>
                <div class="message-content">${content}</div>`; // AI content is usually HTML from marked
        }
        div.innerHTML = innerContent;
        chatLog.appendChild(div);
        chatLog.scrollTop = chatLog.scrollHeight;
        return div;
    }

    // Simple Helper
    const escapeHTML = s => String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);

    async function submitQuestionToAI(userQuestion) {
        // Typing Indicator
        const indicator = document.createElement('div');
        indicator.className = 'chat-message ai-message typing-indicator';
        indicator.innerHTML = `<div class="message-avatar" style="background-color:#19c37d">🤖</div><div class="message-content"><p>Thinking...</p></div>`;
        chatLog.appendChild(indicator);
        chatLog.scrollTop = chatLog.scrollHeight;

        // Context from local site search
        let contextPart = "";
        if (window.GKApp && window.GKApp.fuzzySearch && window.GKApp.searchData) {
            try {
                const results = window.GKApp.fuzzySearch(userQuestion, window.GKApp.searchData);
                if (results && results.length > 0) {
                    const top = results.slice(0, 3);
                    contextPart = `\n\nCONTEXT FROM WEBSITE:\n${top.map(i => `Title: ${i.title}\nSnippet: ${i.paragraph}\nURL: ${i.url}`).join('\n')}`;
                }
            } catch(e) { console.log("Search error", e); }
        }

        try {
            if (!ai) throw new Error("AI not initialized");
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: contextPart + "\n\nUser Question: " + userQuestion,
                config: {
                    systemInstruction: "You are a helpful AI for GK Learn Study. Answer in detail using Markdown. If showing code, wrap in code blocks."
                }
            });

            indicator.remove();
            const html = renderMarkdown(response.text);
            
            const aiMsgDiv = document.createElement('div');
            aiMsgDiv.className = 'chat-message ai-message';
            aiMsgDiv.innerHTML = `<div class="message-avatar" style="background-color:#19c37d">🤖</div><div class="message-content">${html}</div>`;
            chatLog.appendChild(aiMsgDiv);
            
            saveToHistory(userQuestion, response.text); // Save raw text

        } catch (err) {
            console.error(err);
            indicator.remove();
            
            // Fallback to local search results display if API fails
            let fallback = `<p style="color:var(--danger-color);">Unable to connect to AI. Checking local database...</p>`;
            if (window.GKApp && window.GKApp.fuzzySearch && window.GKApp.searchData) {
                 const results = window.GKApp.fuzzySearch(userQuestion, window.GKApp.searchData);
                 if (results.length > 0) {
                     fallback += `<p><strong>Found these articles:</strong></p>`;
                     results.slice(0, 3).forEach(item => {
                         fallback += `<div class="source-box"><a href="${item.url}" target="_blank">${item.title}</a><br>${item.paragraph.substring(0, 100)}...</div>`;
                     });
                 } else {
                     fallback += `<p>No local results found.</p>`;
                 }
            }
            const aiMsgDiv = document.createElement('div');
            aiMsgDiv.className = 'chat-message ai-message';
            aiMsgDiv.innerHTML = `<div class="message-avatar" style="background-color:#19c37d">🤖</div><div class="message-content">${fallback}</div>`;
            chatLog.appendChild(aiMsgDiv);
        }
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function renderMarkdown(text) {
        // Custom renderer for code blocks to add buttons
        const parts = text.split(/(\`\`\`[\s\S]*?\`\`\`)/g);
        let finalHTML = '';

        parts.forEach(part => {
            if (part.startsWith('```')) {
                const match = part.match(/^```(\w*)\n([\s\S]*?)```$/);
                const lang = match ? match[1] : '';
                const code = match ? match[2] : part.replace(/^```|```$/g, '');
                
                finalHTML += `
                    <div style="position:relative">
                        <div class="code-toolbar">
                            <button data-action="copy">Copy</button>
                            <button data-action="preview">Preview</button>
                            <button data-action="edit">Edit</button>
                        </div>
                        <pre data-lang="${lang}"><code>${escapeHTML(code)}</code></pre>
                    </div>`;
            } else {
                finalHTML += DOMPurify.sanitize(marked.parse(part));
            }
        });
        return finalHTML;
    }

    function saveToHistory(q, a) {
        if (currentChatIndex === -1) {
             chatHistory.unshift({ conversation: [{ question: q, answer: a }] });
             currentChatIndex = 0;
        } else {
             if (!chatHistory[currentChatIndex]) chatHistory[currentChatIndex] = { conversation: [] };
             chatHistory[currentChatIndex].conversation.push({ question: q, answer: a });
        }
        if (chatHistory.length > 50) chatHistory.pop();
        localStorage.setItem('aiChatHistory', JSON.stringify(chatHistory));
        renderHistoryList();
    }

    function renderHistoryList() {
        historyList.innerHTML = chatHistory.map((item, index) => {
            const txt = item.conversation[0]?.question || 'New Chat';
            return `<li data-index="${index}" class="${index === currentChatIndex ? 'active' : ''}">
                <span class="history-item-text">${escapeHTML(txt)}</span>
                <button class="history-item-delete-btn">&times;</button>
            </li>`;
        }).join('') || '<li>No history.</li>';
    }

    function loadChatFromHistory(index) {
        if (!chatHistory[index]) return;
        currentChatIndex = index;
        chatLog.innerHTML = '';
        chatHistory[index].conversation.forEach(turn => {
            appendMessage(turn.question, 'user');
            const aiMsgDiv = document.createElement('div');
            aiMsgDiv.className = 'chat-message ai-message';
            // Re-render markdown for history
            aiMsgDiv.innerHTML = `<div class="message-avatar" style="background-color:#19c37d">🤖</div><div class="message-content">${renderMarkdown(turn.answer)}</div>`;
            chatLog.appendChild(aiMsgDiv);
        });
        renderHistoryList();
        chatLog.scrollTop = chatLog.scrollHeight;
        historyPanel.classList.remove('active');
    }

    function deleteHistoryItem(index) {
        chatHistory.splice(index, 1);
        localStorage.setItem('aiChatHistory', JSON.stringify(chatHistory));
        if (index === currentChatIndex) startNewChat();
        else renderHistoryList();
    }

    function clearHistory() {
        if(confirm("Delete all?")) {
            chatHistory = [];
            localStorage.removeItem('aiChatHistory');
            startNewChat();
        }
    }

    function handleChatLogClicks(e) {
        const btn = e.target.closest('button');
        if (!btn) {
            // Edit User Message Logic
            const editBtn = e.target.closest('.edit-btn');
            if(editBtn) {
                const userMsgDiv = editBtn.closest('.user-message');
                const text = userMsgDiv.querySelector('p').textContent;
                questionInput.value = text;
                // Remove this message and the AI response following it
                if(userMsgDiv.nextElementSibling && userMsgDiv.nextElementSibling.classList.contains('ai-message')){
                    userMsgDiv.nextElementSibling.remove();
                }
                userMsgDiv.remove();
                // Remove from data
                if(currentChatIndex !== -1 && chatHistory[currentChatIndex]) {
                    chatHistory[currentChatIndex].conversation.pop();
                    localStorage.setItem('aiChatHistory', JSON.stringify(chatHistory));
                }
            }
            return;
        }

        const action = btn.dataset.action;
        const pre = btn.closest('div').querySelector('pre');
        if (!pre) return;
        const code = pre.querySelector('code').textContent;

        if (action === 'copy') {
            navigator.clipboard.writeText(code);
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = 'Copy', 2000);
        }
        else if (action === 'preview') {
             const modal = get('preview-modal');
             const iframe = get('preview-iframe');
             modal.classList.add('active');
             iframe.srcdoc = code; // Simple preview
        }
        else if (action === 'edit') {
             // Replace pre with textarea
             const wrapper = document.createElement('div');
             wrapper.className = 'code-editor-wrapper';
             wrapper.innerHTML = `<textarea class="code-editor">${code}</textarea><div class="code-editor-actions"><button class="save-preview-btn">Update & Preview</button></div>`;
             const container = btn.closest('div').parentNode; // The relative parent
             container.replaceChild(wrapper, btn.closest('div')); // Replace the whole toolbar+pre block
             
             wrapper.querySelector('.save-preview-btn').addEventListener('click', () => {
                 const newCode = wrapper.querySelector('textarea').value;
                 // Re-render the block
                 const newHTML = `
                    <div style="position:relative">
                        <div class="code-toolbar">
                            <button data-action="copy">Copy</button>
                            <button data-action="preview">Preview</button>
                            <button data-action="edit">Edit</button>
                        </div>
                        <pre><code>${escapeHTML(newCode)}</code></pre>
                    </div>`;
                 const tempDiv = document.createElement('div');
                 tempDiv.innerHTML = newHTML;
                 wrapper.replaceWith(tempDiv.firstElementChild);
                 
                 // Immediately preview
                 const modal = get('preview-modal');
                 const iframe = get('preview-iframe');
                 modal.classList.add('active');
                 iframe.srcdoc = newCode;
             });
        }
    }
    
    function showCombinedPreview(msgElement) { /* ... logic if needed ... */ }
    function enterEditMode(pre) { /* ... logic above handles this ... */ }

    function autoResizeTextarea() {
        questionInput.style.height = 'auto';
        questionInput.style.height = (questionInput.scrollHeight) + 'px';
    }
}

initializeApp();
