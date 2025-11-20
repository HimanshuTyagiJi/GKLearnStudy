
import { GoogleGenAI } from "https://esm.run/@google/genai";
import { marked } from "https://esm.run/marked@12.0.2";
import DOMPurify from "https://esm.run/dompurify@3.0.8";

/**
 * ====================================================================
 * GK LEARN STUDY - AI CHAT WIDGET (FINAL CORRECTED VERSION)
 * ====================================================================
 */

// --- 1. GLOBAL CONFIGURATION ---

const CONFIG = {
    API_KEY: "AIzaSyADifk5i87QT2q5EaChypYmfu4NalKcUiU",
    MODEL_NAME: "gemini-2.5-flash",
    STORAGE_KEY: "aiChatHistory",
    MAX_HISTORY_ITEMS: 50
};

// --- 2. STATE MANAGEMENT ---

let state = {
    aiClient: null,
    chatHistory: [],     // Array of saved chat objects
    currentChat: null,   // The active chat object (might not be in history yet)
    isGenerating: false,
    isWidgetOpen: false
};

// --- 3. INITIALIZATION SEQUENCE ---

document.addEventListener('DOMContentLoaded', () => {
    initializeWidget();
});

// Fallback for async loading
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    if (!document.getElementById('ai-chat-widget')) {
        initializeWidget();
    }
}

function initializeWidget() {
    injectWidgetHTML();
    injectWidgetCSS();

    try {
        state.aiClient = new GoogleGenAI({ apiKey: CONFIG.API_KEY });
    } catch (error) {
        console.error("AI Client Init Failed:", error);
    }

    loadHistory(); // Load past chats
    startNewChat(false); // Prepare a fresh state, but don't render or save yet
    attachEventListeners();
}

// --- 4. DOM INJECTION ---

function injectWidgetHTML() {
    const widgetHTML = `
    <!-- Toggle Button -->
    <button id="ai-widget-toggle-btn" aria-label="Open AI Chat">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 13.5C20 13.09 19.67 12.75 19.25 12.75C18.83 12.75 18.5 13.09 18.5 13.5V14.5C18.5 17.26 16.26 19.5 13.5 19.5C13.09 19.5 12.75 19.83 12.75 20.25C12.75 20.67 13.09 21 13.5 21C17.09 21 20 18.09 20 14.5V13.5M10.5 3C7.91 3 5.5 5.41 5.5 8V9C5.5 9.41 5.17 9.75 4.75 9.75C4.33 9.75 4 9.41 4 9V8C4 4.91 6.91 2 10.5 2C14.09 2 17 4.91 17 8V9C17 9.41 16.67 9.75 16.25 9.75C15.83 9.75 15.5 9.41 15.5 9V8C15.5 5.41 13.09 3 10.5 3M10.5 13.5C10.5 13.09 10.17 12.75 9.75 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H9.75C10.17 11.25 10.5 10.91 10.5 10.5C10.5 10.09 10.17 9.75 9.75 9.75H8C6.75 9.75 5.75 10.75 5.75 12C5.75 13.25 6.75 14.25 8 14.25H9.75C10.17 14.25 10.5 13.91 10.5 13.5M16 12.75H14.25C13.83 12.75 13.5 13.09 13.5 13.5C13.5 13.91 13.83 14.25 14.25 14.25H16C17.25 14.25 18.25 13.25 18.25 12C18.25 10.75 17.25 9.75 16 9.75H14.25C13.83 9.75 13.5 10.09 13.5 10.5C13.5 10.91 13.83 11.25 14.25 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"></path>
        </svg>
    </button>

    <!-- Widget Container -->
    <div id="ai-chat-widget">
        <div class="ai-container">
            
            <!-- History Sidebar -->
            <aside id="history-panel">
                <div class="history-header">
                    <h2>Conversations</h2>
                    <div class="history-header-actions">
                        <button id="clear-history-btn" title="Delete all history">Clear All</button>
                        <button id="close-history-btn" title="Close Menu">&times;</button>
                    </div>
                </div>
                <ul id="history-list">
                    <!-- History items injected here -->
                </ul>
            </aside>

            <!-- Chat Interface -->
            <section id="chat-area">
                <!-- Header -->
                <header class="chat-header">
                     <div class="chat-header-left">
                        <button id="menu-toggle" title="Menu">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
                        </button>
                        <h1>GK AI Assistant</h1>
                    </div>
                    <div class="chat-header-right">
                        <button id="new-chat-btn" title="New Chat">New Chat</button>
                        <button id="full-view-btn" title="Maximize">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17H7V14H5V19H10V17Z"></path></svg>
                        </button>
                        <button id="close-widget-btn" title="Close">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                        </button>
                    </div>
                </header>
                
                <!-- Messages Area -->
                <div id="chat-log" role="log"></div>

                <!-- Input Area -->
                <div class="chat-input-area">
                    <div id="stop-generating-container" style="display:none;">
                        <button id="stop-generating-btn">Stop Generating</button>
                    </div>
                    <form id="ai-solver-form">
                        <textarea id="question-input" rows="1" placeholder="Ask me anything..." required></textarea>
                        <button type="submit" id="solve-button" title="Send">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path></svg>
                        </button>
                    </form>
                </div>
            </section>
        </div>
    </div>

    <!-- Preview Modal (For Code) -->
    <div id="preview-modal">
        <div class="preview-content">
            <div class="preview-header">
                <h3>Live Preview</h3>
                <button id="close-preview-btn">&times;</button>
            </div>
            <iframe id="preview-iframe"></iframe>
        </div>
    </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = widgetHTML;
    document.body.appendChild(div);
}

function injectWidgetCSS() {
    if (document.querySelector('link[href*="chat-widget.css"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/chat-widget.css';
    document.head.appendChild(link);
}

// --- 5. EVENT LISTENERS ---

function attachEventListeners() {
    const widget = document.getElementById('ai-chat-widget');
    const toggleBtn = document.getElementById('ai-widget-toggle-btn');
    const input = document.getElementById('question-input');
    const form = document.getElementById('ai-solver-form');

    // --- Global Click Delegation ---
    document.addEventListener('click', (e) => {
        const target = e.target;

        // Toggle Open (Starts blank chat)
        if (target.closest('#ai-widget-toggle-btn')) {
            if (!widget.classList.contains('active')) {
                startNewChat(true); // Always blank on open
                widget.classList.add('active');
                toggleBtn.style.display = 'none';
                setTimeout(() => input.focus(), 300);
            }
        }

        // Close Widget
        if (target.closest('#close-widget-btn')) {
            widget.classList.remove('active');
            toggleBtn.style.display = 'flex';
        }

        // New Chat
        if (target.closest('#new-chat-btn')) {
            startNewChat(true);
        }

        // History Menu
        if (target.closest('#menu-toggle')) {
            document.getElementById('history-panel').classList.toggle('active');
        }
        if (target.closest('#close-history-btn')) {
            document.getElementById('history-panel').classList.remove('active');
        }

        // Full View
        if (target.closest('#full-view-btn')) {
            widget.classList.toggle('full-view');
        }

        // Clear History
        if (target.closest('#clear-history-btn')) {
            if (confirm("Delete all history?")) clearAllHistory();
        }

        // Stop Generation
        if (target.closest('#stop-generating-btn')) {
            stopGeneration();
        }

        // --- Message Actions ---

        // Edit User Message
        if (target.closest('.msg-edit-btn')) {
            const msgElement = target.closest('.chat-message');
            const textDiv = msgElement.querySelector('.text-content');
            handleEditMessage(msgElement, textDiv.innerText);
        }

        // Regenerate
        if (target.closest('.msg-regen-btn')) {
            handleRegenerate();
        }

        // Code Copy
        if (target.closest('.code-copy-btn')) {
            const btn = target.closest('.code-copy-btn');
            const codeText = decodeURIComponent(btn.dataset.code);
            navigator.clipboard.writeText(codeText).then(() => {
                const originalText = btn.innerText;
                btn.innerText = "Copied!";
                setTimeout(() => btn.innerText = originalText, 2000);
            });
        }

        // Code Preview (The complex logic)
        if (target.closest('.code-preview-btn')) {
            const msgElement = target.closest('.chat-message');
            openMergedPreview(msgElement);
        }

        // Close Preview Modal
        if (target.closest('#close-preview-btn')) {
            document.getElementById('preview-modal').classList.remove('active');
        }

        // History Item Click
        const historyItem = target.closest('#history-list li');
        if (historyItem && !target.closest('.history-item-delete-btn')) {
            loadChatById(historyItem.dataset.id);
            if (window.innerWidth < 600) {
                document.getElementById('history-panel').classList.remove('active');
            }
        }

        // History Item Delete
        if (target.closest('.history-item-delete-btn')) {
            e.stopPropagation();
            const li = target.closest('li');
            deleteSingleChat(li.dataset.id);
        }
    });

    // --- Input Handling ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text && !state.isGenerating) {
            input.value = '';
            input.style.height = 'auto';
            handleUserMessage(text);
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });

    input.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}

// --- 6. CHAT MANAGEMENT LOGIC ---

/**
 * Starts a new session.
 * CRITICAL FIX: Does NOT save to history array immediately.
 * Prevents ghost empty chats.
 */
function startNewChat(forceUIUpdate = true) {
    state.currentChat = {
        id: Date.now().toString(),
        title: "New Conversation",
        messages: [],
        timestamp: Date.now(),
        isUnsaved: true // Mark as unsaved
    };

    if (forceUIUpdate) {
        renderChatMessages([]); // Shows blank/welcome screen
        renderHistoryList();    // Updates sidebar (won't show current chat yet)
    }
}

/**
 * Saves current chat to history ONLY if it has messages.
 */
function saveCurrentChatIfNeeded() {
    if (!state.currentChat || state.currentChat.messages.length === 0) return;

    // Check if already in history
    const existingIndex = state.chatHistory.findIndex(c => c.id === state.currentChat.id);
    
    if (existingIndex === -1) {
        // New chat, push to history
        state.currentChat.isUnsaved = false;
        state.chatHistory.unshift(state.currentChat);
    } else {
        // Update existing
        state.chatHistory[existingIndex] = state.currentChat;
    }

    // Trim history
    if (state.chatHistory.length > CONFIG.MAX_HISTORY_ITEMS) {
        state.chatHistory.pop();
    }

    // Save to LocalStorage
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state.chatHistory));
    renderHistoryList();
}

function loadHistory() {
    try {
        const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
        state.chatHistory = stored ? JSON.parse(stored) : [];
    } catch (e) {
        state.chatHistory = [];
    }
}

function loadChatById(id) {
    const chat = state.chatHistory.find(c => c.id === id);
    if (chat) {
        state.currentChat = chat;
        renderChatMessages(chat.messages);
        renderHistoryList();
    }
}

function deleteSingleChat(id) {
    if (!confirm("Delete this chat?")) return;
    state.chatHistory = state.chatHistory.filter(c => c.id !== id);
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state.chatHistory));
    
    if (state.currentChat && state.currentChat.id === id) {
        startNewChat(true);
    } else {
        renderHistoryList();
    }
}

function clearAllHistory() {
    state.chatHistory = [];
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify([]));
    startNewChat(true);
}

// --- 7. MESSAGE PROCESSING & AI LOGIC ---

async function handleUserMessage(text) {
    // 1. Render User Msg
    appendMessageToUI('user', text);

    // 2. Update State
    state.currentChat.messages.push({ role: 'user', content: text });
    
    // Set title from first message
    if (state.currentChat.messages.length === 1) {
        state.currentChat.title = text.substring(0, 25) + (text.length > 25 ? "..." : "");
    }
    
    // Save now that we have data
    saveCurrentChatIfNeeded();

    // 3. Generate Response
    await generateResponse(text);
}

async function generateResponse(prompt) {
    state.isGenerating = true;
    updateUIControls();
    
    const msgId = 'ai-' + Date.now();
    appendLoadingIndicator(msgId);

    let responseText = "";
    let linksHTML = "";

    try {
        // Step A: Try API
        if (!state.aiClient) throw new Error("No API Client");

        const result = await state.aiClient.models.generateContent({
            model: CONFIG.MODEL_NAME,
            contents: prompt
        });
        
        responseText = result.text;

        // Step B: Check Local Links (Contextual)
        // If API worked, ONLY add links if we actually found good matches.
        linksHTML = getLocalLinksHTML(prompt);
        
        if (linksHTML) {
            responseText += `\n\n<div class='related-links-section'>${linksHTML}</div>`;
        }

    } catch (error) {
        console.warn("API Failed/Offline", error);
        
        // Step C: Offline Fallback
        linksHTML = getLocalLinksHTML(prompt);

        if (linksHTML) {
            responseText = `I cannot connect to the server right now, but I found this on our website:\n\n<div class='related-links-section'>${linksHTML}</div>`;
        } else {
            // No API AND No Local results
            responseText = `<span style="color:var(--danger-color)">Unable to connect. Please check your internet connection and try again later. (थोड़ी देर बाद प्रयास करें)</span>`;
        }
    }

    // Finalize
    removeLoadingIndicator(msgId);
    appendMessageToUI('model', responseText);

    state.currentChat.messages.push({ role: 'model', content: responseText });
    saveCurrentChatIfNeeded();

    state.isGenerating = false;
    updateUIControls();
}

function getLocalLinksHTML(query) {
    if (window.GKApp && window.GKApp.fuzzySearch && window.GKApp.searchData) {
        const results = window.GKApp.fuzzySearch(query, window.GKApp.searchData);
        if (results && results.length > 0) {
            // Take top 3
            const topResults = results.slice(0, 3);
            const items = topResults.map(item => 
                `<li><a href="${item.url}" target="_blank">${item.title}</a></li>`
            ).join('');
            return `<strong>Related Links:</strong><ul>${items}</ul>`;
        }
    }
    return "";
}

// --- 8. EDITING & PREVIEW LOGIC ---

/**
 * Problem 3 Fix: Edit keeps context above.
 */
function handleEditMessage(msgElement, oldText) {
    // 1. Find index based on DOM position (ignoring welcome msg if any)
    const allMsgs = Array.from(document.querySelectorAll('.chat-message'));
    // Filter out messages that might not correspond to state (like loading)
    const validMsgs = allMsgs.filter(el => !el.classList.contains('typing-indicator') && !el.querySelector('p')?.textContent.includes('नमस्ते')); 
    
    const domIndex = validMsgs.indexOf(msgElement);
    
    if (domIndex === -1 || !state.currentChat.messages[domIndex]) return;

    // 2. Set input
    const input = document.getElementById('question-input');
    input.value = state.currentChat.messages[domIndex].content; // Raw user text
    input.focus();

    // 3. Slice history: Keep everything BEFORE this message.
    state.currentChat.messages = state.currentChat.messages.slice(0, domIndex);
    
    // 4. Save & Render
    saveCurrentChatIfNeeded();
    renderChatMessages(state.currentChat.messages);
}

function handleRegenerate() {
    if (!state.currentChat.messages.length) return;
    
    // Remove last AI response
    const lastMsg = state.currentChat.messages[state.currentChat.messages.length - 1];
    if (lastMsg.role === 'model') {
        state.currentChat.messages.pop();
        saveCurrentChatIfNeeded();
        renderChatMessages(state.currentChat.messages);
        
        // Get last user prompt
        const lastUserMsg = state.currentChat.messages[state.currentChat.messages.length - 1];
        if (lastUserMsg) generateResponse(lastUserMsg.content);
    }
}

/**
 * Problem 3 (Preview) Logic:
 * Scans a specific message for ALL code blocks (HTML/CSS/JS) and merges them.
 */
function openMergedPreview(msgElement) {
    // 1. Get all code blocks in this specific message
    const codeBlocks = msgElement.querySelectorAll('code[class*="language-"]');
    
    let html = "";
    let css = "";
    let js = "";

    codeBlocks.forEach(block => {
        const langClass = Array.from(block.classList).find(c => c.startsWith('language-'));
        const lang = langClass ? langClass.replace('language-', '') : '';
        const code = block.innerText;

        if (lang === 'html') html += code + "\n";
        else if (lang === 'css') css += code + "\n";
        else if (lang === 'javascript' || lang === 'js') js += code + "\n";
    });

    // 2. Construct full document
    const fullDoc = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `;

    // 3. Inject into iframe
    const modal = document.getElementById('preview-modal');
    const iframe = document.getElementById('preview-iframe');
    
    modal.classList.add('active');
    
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(fullDoc);
    doc.close();
}

function stopGeneration() {
    state.isGenerating = false;
    updateUIControls();
    const loader = document.querySelector('.typing-indicator');
    if (loader) {
        loader.innerHTML = `<div class="message-content">Generation stopped.</div>`;
        loader.classList.remove('typing-indicator');
        loader.classList.add('chat-message', 'ai-message');
    }
}

// --- 9. UI RENDERING ---

function renderChatMessages(messages) {
    const log = document.getElementById('chat-log');
    log.innerHTML = ''; 

    // Always show welcome if empty
    if (!messages || messages.length === 0) {
        const welcome = document.createElement('div');
        welcome.className = 'chat-message ai-message';
        welcome.innerHTML = `<div class="message-avatar">🤖</div><div class="message-content"><p>नमस्ते! मैं GK AI हूँ। आप मुझसे कोई भी सवाल पूछ सकते हैं।</p></div>`;
        log.appendChild(welcome);
        return;
    }

    messages.forEach(msg => appendMessageToUI(msg.role, msg.content));
    scrollToBottom();
}

function appendMessageToUI(role, content) {
    const log = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.className = `chat-message ${role === 'user' ? 'user-message' : 'ai-message'}`;

    let innerHTML = '';

    if (role === 'user') {
        innerHTML = `
            <div class="text-content">${escapeHTML(content)}</div>
            <div class="msg-actions">
                <button class="msg-edit-btn" title="Edit">✎</button>
            </div>`;
    } else {
        // Parse Markdown
        const parsedHTML = DOMPurify.sanitize(marked.parse(content));
        innerHTML = `<div class="text-content">${parsedHTML}</div>`;
        
        // Add Regenerate Button
        innerHTML += `
            <div class="msg-actions">
                <button class="msg-regen-btn" title="Regenerate">↻</button>
            </div>`;
        
        // Inject Code Toolbar if code blocks exist
        // Use a setTimeout to wait for DOM update, or construct string manually.
        // Manual construction is safer for the innerHTML set.
        innerHTML = injectCodeToolbars(innerHTML);
    }

    const avatar = `<div class="message-avatar">${role === 'user' ? 'You' : '🤖'}</div>`;
    div.innerHTML = role === 'user' ? 
        `<div class="message-content">${innerHTML}</div>${avatar}` : 
        `${avatar}<div class="message-content">${innerHTML}</div>`;

    log.appendChild(div);
    scrollToBottom();
}

/**
 * Injects Copy and Preview buttons into <pre> blocks
 */
function injectCodeToolbars(htmlString) {
    // Create a temp div to manipulate DOM
    const temp = document.createElement('div');
    temp.innerHTML = htmlString;

    const preBlocks = temp.querySelectorAll('pre');
    preBlocks.forEach(pre => {
        const codeBlock = pre.querySelector('code');
        if (codeBlock) {
            const rawCode = codeBlock.innerText;
            const encodedCode = encodeURIComponent(rawCode);
            
            // Determine if we should show Preview button (only for html/css/js)
            const isRenderable = Array.from(codeBlock.classList).some(c => 
                ['language-html', 'language-css', 'language-javascript', 'language-js', 'language-xml'].includes(c)
            );

            const toolbar = document.createElement('div');
            toolbar.className = 'code-toolbar';
            toolbar.innerHTML = `
                <button class="code-copy-btn" data-code="${encodedCode}">Copy</button>
                ${isRenderable ? '<button class="code-preview-btn">Preview</button>' : ''}
            `;
            
            // Insert toolbar before the <code> element inside <pre>
            pre.insertBefore(toolbar, codeBlock);
        }
    });

    return temp.innerHTML;
}

function appendLoadingIndicator(id) {
    const log = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.id = id;
    div.className = 'chat-message ai-message typing-indicator';
    div.innerHTML = `<div class="message-avatar">🤖</div><div class="message-content"><div class="typing-dots"><span>.</span><span>.</span><span>.</span></div></div>`;
    log.appendChild(div);
    scrollToBottom();
}

function removeLoadingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function renderHistoryList() {
    const list = document.getElementById('history-list');
    if (!list) return;

    // If there are no saved chats, or the only chat is the active blank one
    const savedChats = state.chatHistory;

    if (savedChats.length === 0) {
        list.innerHTML = '<li class="empty-history">No saved conversations.</li>';
        return;
    }

    list.innerHTML = savedChats.map(chat => {
        const isActive = (state.currentChat && chat.id === state.currentChat.id) ? 'active' : '';
        return `
        <li data-id="${chat.id}" class="${isActive}">
            <span class="history-item-text">${escapeHTML(chat.title || "Chat")}</span>
            <button class="history-item-delete-btn" title="Delete">&times;</button>
        </li>`;
    }).join('');
}

function updateUIControls() {
    const stopBtn = document.getElementById('stop-generating-container');
    const sendBtn = document.getElementById('solve-button');
    if (state.isGenerating) {
        stopBtn.style.display = 'block';
        sendBtn.disabled = true;
        sendBtn.style.opacity = '0.5';
    } else {
        stopBtn.style.display = 'none';
        sendBtn.disabled = false;
        sendBtn.style.opacity = '1';
    }
}

// --- 10. UTILS ---

function scrollToBottom() {
    const log = document.getElementById('chat-log');
    if (log) setTimeout(() => log.scrollTop = log.scrollHeight, 50);
}

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}
