
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
                <div id="chat-log" role="log" aria-live="polite">
                    <div class="chat-message ai-message">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            <p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ? आप गणित, विज्ञान, इतिहास या किसी भी विषय पर सवाल पूछ सकते हैं।</p>
                        </div>
                    </div>
                </div>
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
                <button id="close-preview-btn" title="Close Preview">&times;</button>
            </div>
            <iframe id="preview-iframe"></iframe>
        </div>
    </div>
    `;

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '0'; container.style.left = '0'; container.style.width = '0'; container.style.height = '0'; container.style.pointerEvents = 'none'; 
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

// --- Main Logic ---
function initializeApp() {
    injectWidgetHTML();

    // Direct API Key Usage (Hardcoded as requested for stability)
    const API_KEY = "AIzaSyADifk5i87QT2q5EaChypYmfu4NalKcUiU";
    let ai;

    try {
        ai = new GoogleGenAI({ apiKey: API_KEY });
    } catch (e) {
        console.error("AI Init failed:", e);
    }

    // Variables
    let chatHistory = [];
    let currentChatIndex = -1;

    // Elements
    const get = (id) => document.getElementById(id);
    const elements = {
        historyPanel: get('history-panel'),
        chatLog: get('chat-log'),
        questionInput: get('question-input'),
        historyList: get('history-list'),
        widgetToggleBtn: get('ai-widget-toggle-btn'),
        chatWidget: get('ai-chat-widget'),
        closeWidgetBtn: get('close-widget-btn'),
        fullViewBtn: get('full-view-btn'),
        newChatBtn: get('new-chat-btn'),
        form: get('ai-solver-form'),
        previewModal: get('preview-modal'),
        closePreviewBtn: get('close-preview-btn')
    };

    // Initialize
    loadHistory();
    attachEventListeners();

    function attachEventListeners() {
        if (elements.widgetToggleBtn) {
            elements.widgetToggleBtn.addEventListener('click', () => {
                elements.chatWidget.classList.add('active');
                elements.widgetToggleBtn.style.display = 'none';
            });
        }
        if (elements.closeWidgetBtn) {
            elements.closeWidgetBtn.addEventListener('click', () => {
                elements.chatWidget.classList.remove('active');
                elements.widgetToggleBtn.style.display = 'flex';
            });
        }
        if (elements.fullViewBtn) elements.fullViewBtn.addEventListener('click', () => elements.chatWidget.classList.toggle('full-view'));
        if (elements.newChatBtn) elements.newChatBtn.addEventListener('click', startNewChat);
        if (elements.form) elements.form.addEventListener('submit', handleFormSubmit);
        if (elements.questionInput) {
            elements.questionInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleFormSubmit(e); }
            });
            elements.questionInput.addEventListener('input', () => {
                elements.questionInput.style.height = 'auto';
                elements.questionInput.style.height = elements.questionInput.scrollHeight + 'px';
            });
        }
        
        get('menu-toggle')?.addEventListener('click', () => elements.historyPanel.classList.toggle('active'));
        get('close-history-btn')?.addEventListener('click', () => elements.historyPanel.classList.remove('active'));
        get('clear-history-btn')?.addEventListener('click', clearHistory);
        
        if (elements.historyList) elements.historyList.addEventListener('click', handleHistoryClick);
        if (elements.chatLog) elements.chatLog.addEventListener('click', handleChatLogClicks);
        if (elements.closePreviewBtn) elements.closePreviewBtn.addEventListener('click', () => elements.previewModal.classList.remove('active'));
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const text = elements.questionInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        submitQuestionToAI(text);
        elements.questionInput.value = '';
        elements.questionInput.style.height = 'auto';
    }

    function appendMessage(content, type) {
        const isUser = type === 'user';
        const div = document.createElement('div');
        div.className = `chat-message ${type}-message`;
        div.innerHTML = `
            <div class="message-avatar" style="background-color:${isUser ? 'var(--primary-color)' : '#19c37d'}">${isUser ? 'You' : '🤖'}</div>
            <div class="message-content"><p>${escapeHTML(content)}</p></div>`;
        elements.chatLog.appendChild(div);
        elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
    }

    function appendResponse(html) {
        const div = document.createElement('div');
        div.className = 'chat-message ai-message';
        div.innerHTML = `<div class="message-avatar" style="background-color: #19c37d;">🤖</div><div class="message-content">${html}</div>`;
        elements.chatLog.appendChild(div);
        elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
    }

    async function submitQuestionToAI(question) {
        // Add indicator
        const indicator = document.createElement('div');
        indicator.className = 'chat-message ai-message typing-indicator';
        indicator.innerHTML = `<div class="message-avatar" style="background-color: #19c37d;">🤖</div><div class="message-content"><p>Thinking...</p></div>`;
        elements.chatLog.appendChild(indicator);
        elements.chatLog.scrollTop = elements.chatLog.scrollHeight;

        try {
            if (!ai) {
                 ai = new GoogleGenAI({ apiKey: API_KEY }); // Retry init if missing
            }
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: question,
                config: { systemInstruction: "You are a helpful assistant for GK Learn Study. Answer in detail with Markdown. If code is requested, wrap it in triple backticks." }
            });

            const text = response.text;
            indicator.remove();
            renderResponse(text);
            saveHistory(question, text);

        } catch (error) {
            console.error("AI Error:", error);
            indicator.remove();
            
            // Fallback to Local Search
            if (window.GKApp && window.GKApp.fuzzySearch && window.GKApp.searchData) {
                const results = window.GKApp.fuzzySearch(question, window.GKApp.searchData);
                if (results.length > 0) {
                    let html = `<p><strong>AI is offline. Found in local database:</strong></p>`;
                    results.slice(0, 3).forEach(res => {
                        html += `<div class="source-box"><a href="${res.url}" target="_blank">${res.title}</a><br>${res.paragraph.substring(0, 80)}...</div>`;
                    });
                    appendResponse(html);
                    saveHistory(question, "Local Search Results Provided");
                } else {
                    appendResponse("<p style='color:red'>Error connecting to AI and no local results found.</p>");
                }
            } else {
                appendResponse("<p style='color:red'>Error connecting to AI. Please check your internet connection.</p>");
            }
        }
    }

    function renderResponse(text) {
        const parts = text.split(/(\`\`\`[\s\S]*?\`\`\`)/g);
        let html = '';
        parts.forEach(part => {
            if (part.startsWith('```')) {
                const lang = (part.match(/^```(\w*)/)?.[1] || '').toLowerCase();
                const code = escapeHTML(part.replace(/^```\w*\n|```$/g, ''));
                html += `
                    <pre data-lang="${lang}">
                        <div class="code-toolbar">
                            <button data-action="copy"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg> Copy</button>
                            <button data-action="preview"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path></svg> Preview</button>
                            <button data-action="edit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z"></path></svg> Edit</button>
                        </div>
                        <code>${code}</code>
                    </pre>`;
            } else {
                html += DOMPurify.sanitize(marked.parse(part));
            }
        });
        appendResponse(html);
    }

    // --- History Handling ---
    function loadHistory() {
        try {
            const data = localStorage.getItem('aiChatHistory');
            chatHistory = data ? JSON.parse(data) : [];
            // Validate structure
            if (!Array.isArray(chatHistory)) chatHistory = [];
        } catch (e) {
            console.error("History Parse Error", e);
            chatHistory = [];
        }
        renderHistoryList();
    }

    function saveHistory(q, a) {
        if (currentChatIndex === -1) {
            chatHistory.unshift({ conversation: [] });
            currentChatIndex = 0;
        }
        
        if (chatHistory[currentChatIndex]) {
            chatHistory[currentChatIndex].conversation.push({ question: q, answer: a });
            localStorage.setItem('aiChatHistory', JSON.stringify(chatHistory));
        }
        renderHistoryList();
    }
    
    function renderHistoryList() {
        if (!elements.historyList) return;
        if (chatHistory.length === 0) {
            elements.historyList.innerHTML = '<li>No history.</li>';
            return;
        }
        elements.historyList.innerHTML = chatHistory.map((chat, idx) => {
            const title = chat.conversation?.[0]?.question || 'New Chat';
            return `<li data-index="${idx}" class="${idx === currentChatIndex ? 'active' : ''}">
                <span class="history-item-text">${escapeHTML(title)}</span>
                <button class="history-item-delete-btn">&times;</button>
            </li>`;
        }).join('');
    }

    function startNewChat() {
        currentChatIndex = -1;
        elements.chatLog.innerHTML = `
            <div class="chat-message ai-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content"><p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?</p></div>
            </div>`;
        elements.historyPanel.classList.remove('active');
        renderHistoryList();
    }
    
    function handleHistoryClick(e) {
        const deleteBtn = e.target.closest('.history-item-delete-btn');
        const li = e.target.closest('li');

        if (deleteBtn && li) {
            e.stopPropagation();
            const idx = parseInt(li.dataset.index);
            chatHistory.splice(idx, 1);
            localStorage.setItem('aiChatHistory', JSON.stringify(chatHistory));
            if (idx === currentChatIndex) startNewChat();
            else renderHistoryList();
            return;
        }

        if (li) {
            const idx = parseInt(li.dataset.index);
            currentChatIndex = idx;
            const chat = chatHistory[idx];
            elements.chatLog.innerHTML = '';
            chat.conversation.forEach(pair => {
                appendMessage(pair.question, 'user');
                renderResponse(pair.answer);
            });
            elements.historyPanel.classList.remove('active');
            renderHistoryList();
        }
    }

    function clearHistory() {
        if(confirm("Delete all history?")) {
            chatHistory = [];
            localStorage.removeItem('aiChatHistory');
            startNewChat();
        }
    }

    // --- Helper: Click Actions (Copy, Preview, Edit) ---
    function handleChatLogClicks(e) {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;
        const pre = btn.closest('pre');
        const aiMsg = btn.closest('.ai-message');

        if (action === 'copy' && pre) {
            const code = pre.querySelector('code').innerText;
            navigator.clipboard.writeText(code);
            btn.innerHTML = 'Copied!';
            setTimeout(() => btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg> Copy', 1500);
        }
        
        if (action === 'preview' && aiMsg) {
            let code = '';
            aiMsg.querySelectorAll('pre').forEach(p => {
                code += p.querySelector('code').innerText + '\n';
            });
            if (code) {
                const iframe = get('preview-iframe');
                iframe.srcdoc = code;
                elements.previewModal.classList.add('active');
            }
        }

        if (action === 'edit' && pre) {
             const codeEl = pre.querySelector('code');
             const originalCode = codeEl.innerText;
             const wrapper = document.createElement('div');
             wrapper.className = 'code-editor-wrapper';
             wrapper.innerHTML = `
                <textarea class="code-editor"></textarea>
                <div class="code-editor-actions">
                    <button class="cancel-edit-btn">Cancel</button>
                    <button class="save-preview-btn">Save & Preview</button>
                </div>`;
             
             const textArea = wrapper.querySelector('textarea');
             textArea.value = originalCode;
             pre.replaceWith(wrapper);
             
             wrapper.querySelector('.cancel-edit-btn').onclick = () => wrapper.replaceWith(pre);
             wrapper.querySelector('.save-preview-btn').onclick = () => {
                 codeEl.innerText = textArea.value;
                 wrapper.replaceWith(pre);
                 // Auto preview after save
                 const iframe = get('preview-iframe');
                 iframe.srcdoc = textArea.value;
                 elements.previewModal.classList.add('active');
             };
        }
    }
    
    const escapeHTML = s => String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}

initializeApp();
