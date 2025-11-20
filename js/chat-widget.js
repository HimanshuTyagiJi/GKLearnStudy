import { GoogleGenAI } from "https://esm.run/@google/genai";
import { marked } from "https://esm.run/marked@12.0.2";
import DOMPurify from "https://esm.run/dompurify@3.0.8";

/**
 * ====================================================================
 * GK LEARN STUDY - AI CHAT WIDGET (ULTIMATE EDITION)
 * ====================================================================
 * 
 * AUTHOR: GK Learn Study Dev Team
 * 
 * FEATURES INCLUDED:
 * 1. Smart Link Injection: Deep search in window.GKApp.searchData
 * 2. Offline Mode: Falls back to local search if API fails.
 * 3. Advanced Code Editor: Split screen with HTML/CSS/JS merging.
 * 4. Draggable Preview: Resize the preview pane using a drag handle.
 * 5. Device Toggles: Quick switch between Mobile, Tablet, Desktop.
 * 6. Persistent History: Saves chats to LocalStorage.
 * 7. Clean UI: User messages have no background color, SVG avatars.
 */

// --- 1. GLOBAL CONFIGURATION ---

const CONFIG = {
    API_KEY: "AIzaSyADifk5i87QT2q5EaChypYmfu4NalKcUiU",
    MODEL_NAME: "gemini-2.5-flash",
    STORAGE_KEY: "aiChatHistory_vFinal_Plus", // Changed key to ensure fresh start with new structure
    MAX_HISTORY_ITEMS: 50,
    SYSTEM_INSTRUCTION: `
    You are a helpful, friendly, and knowledgeable AI assistant for 'GK Learn Study'. 
    
    GUIDELINES:
    1. TONE: Be conversational, natural, and encouraging.
    2. FORMATTING: Use Markdown. ALWAYS use ## for main headings and bullet points for lists.
    3. CONTENT: If asked for a topic (e.g., "Holi Essay"), provide a structured response.
    4. CODE: If providing code, separate HTML, CSS, and JS if possible.
    5. LINKS: Do NOT invent links. If you don't know a URL, just answer the question. The system will append links automatically from the database.
    `
};

// --- 2. STATE MANAGEMENT ---

let state = {
    aiClient: null,
    chatHistory: [],
    currentChat: null,
    isGenerating: false,
    isWidgetOpen: false,
    isResizing: false // For the preview window drag handle
};

// --- 3. INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    initializeWidget();
});

// Fallback if DOMContentLoaded already fired
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
        console.error("AI Init Failed:", error);
    }

    loadHistory();
    state.currentChat = null; // Always start fresh UI-wise, but history is loaded in background
    attachEventListeners();
    setupResizer(); // Initialize the drag handle logic
}

// --- 4. DOM INJECTION ---

function injectWidgetHTML() {
    const widgetHTML = `
    <button id="ai-widget-toggle-btn" aria-label="Open AI Chat">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 13.5C20 13.09 19.67 12.75 19.25 12.75C18.83 12.75 18.5 13.09 18.5 13.5V14.5C18.5 17.26 16.26 19.5 13.5 19.5C13.09 19.5 12.75 19.83 12.75 20.25C12.75 20.67 13.09 21 13.5 21C17.09 21 20 18.09 20 14.5V13.5M10.5 3C7.91 3 5.5 5.41 5.5 8V9C5.5 9.41 5.17 9.75 4.75 9.75C4.33 9.75 4 9.41 4 9V8C4 4.91 6.91 2 10.5 2C14.09 2 17 4.91 17 8V9C17 9.41 16.67 9.75 16.25 9.75C15.83 9.75 15.5 9.41 15.5 9V8C15.5 5.41 13.09 3 10.5 3M10.5 13.5C10.5 13.09 10.17 12.75 9.75 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H9.75C10.17 11.25 10.5 10.91 10.5 10.5C10.5 10.09 10.17 9.75 9.75 9.75H8C6.75 9.75 5.75 10.75 5.75 12C5.75 13.25 6.75 14.25 8 14.25H9.75C10.17 14.25 10.5 13.91 10.5 13.5M16 12.75H14.25C13.83 12.75 13.5 13.09 13.5 13.5C13.5 13.91 13.83 14.25 14.25 14.25H16C17.25 14.25 18.25 13.25 18.25 12C18.25 10.75 17.25 9.75 16 9.75H14.25C13.83 9.75 13.5 10.09 13.5 10.5C13.5 10.91 13.83 11.25 14.25 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"></path>
        </svg>
    </button>

    <div id="ai-chat-widget">
        <div class="ai-container">
            <aside id="history-panel">
                <div class="history-header">
                    <h2>Conversations</h2>
                    <div class="history-header-actions">
                        <button id="clear-history-btn">Clear All</button>
                        <button id="close-history-btn">&times;</button>
                    </div>
                </div>
                <ul id="history-list"></ul>
            </aside>

            <section id="chat-area">
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
                
                <div id="chat-log" role="log">
                     <div class="chat-message ai-message">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content"><p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?</p></div>
                    </div>
                </div>

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

    <!-- Advanced Code Editor / Preview Modal -->
    <div id="preview-modal">
        <div class="preview-content">
            <div class="preview-header">
                <h3>Code Editor & Preview</h3>
                <div class="preview-controls">
                    <button class="device-btn active" data-view="desktop" title="Desktop View">💻 Desktop</button>
                    <button class="device-btn" data-view="tablet" title="Tablet View">📟 Tablet</button>
                    <button class="device-btn" data-view="mobile" title="Mobile View">📱 Mobile</button>
                </div>
                <div class="preview-actions">
                    <button id="run-code-btn">▶ Run</button>
                    <button id="close-preview-btn">&times;</button>
                </div>
            </div>
            
            <div class="preview-body">
                <div class="editor-pane">
                    <textarea id="code-editor-textarea" spellcheck="false" placeholder="HTML/CSS/JS code here..."></textarea>
                </div>
                
                <!-- Draggable Resizer Handle -->
                <div class="resizer" id="drag-resizer"></div>
                
                <div class="preview-pane-wrapper">
                    <div class="preview-pane" id="preview-pane-container">
                        <iframe id="preview-iframe"></iframe>
                    </div>
                </div>
            </div>
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

    document.addEventListener('click', (e) => {
        const target = e.target;

        // Widget Toggles
        if (target.closest('#ai-widget-toggle-btn')) {
            if (!widget.classList.contains('active')) {
                // Only start a new chat session concept, but don't clear screen if resuming
                if(!state.currentChat) startNewChat(true);
                
                widget.classList.add('active');
                toggleBtn.style.display = 'none';
                setTimeout(() => input.focus(), 300);
            }
        }
        if (target.closest('#close-widget-btn')) {
            widget.classList.remove('active');
            toggleBtn.style.display = 'flex';
        }
        if (target.closest('#new-chat-btn')) {
            startNewChat(true);
        }
        if (target.closest('#menu-toggle')) document.getElementById('history-panel').classList.toggle('active');
        if (target.closest('#close-history-btn')) document.getElementById('history-panel').classList.remove('active');
        if (target.closest('#full-view-btn')) widget.classList.toggle('full-view');
        if (target.closest('#clear-history-btn') && confirm("Delete all history?")) clearAllHistory();
        if (target.closest('#stop-generating-btn')) stopGeneration();

        // Message Actions
        if (target.closest('.msg-edit-btn')) {
            const msg = target.closest('.chat-message');
            handleEditMessage(msg, msg.querySelector('.text-content').innerText);
        }
        if (target.closest('.msg-regen-btn')) handleRegenerate();
        if (target.closest('.code-copy-btn')) {
            const btn = target.closest('.code-copy-btn');
            navigator.clipboard.writeText(decodeURIComponent(btn.dataset.code)).then(() => {
                const orig = btn.innerText; btn.innerText = "Copied!";
                setTimeout(() => btn.innerText = orig, 2000);
            });
        }
        if (target.closest('.code-edit-btn') || target.closest('.code-preview-btn')) {
            openMergedPreview(target.closest('.chat-message'));
        }

        // Modal Actions
        if (target.closest('#close-preview-btn')) document.getElementById('preview-modal').classList.remove('active');
        if (target.closest('#run-code-btn')) updatePreviewIframe();
        
        // Device View Toggles
        if (target.closest('.device-btn')) {
            const btn = target.closest('.device-btn');
            document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setPreviewDevice(btn.dataset.view);
        }

        // History Navigation
        const historyItem = target.closest('#history-list li');
        if (historyItem && !target.closest('.history-item-delete-btn') && !target.closest('.empty-history')) {
            loadChatById(historyItem.dataset.id);
            if (window.innerWidth < 768) document.getElementById('history-panel').classList.remove('active');
        }
        if (target.closest('.history-item-delete-btn')) {
            e.stopPropagation();
            deleteSingleChat(target.closest('li').dataset.id);
        }
    });

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

// --- 5.5 RESIZER LOGIC (Drag Handle) ---
function setupResizer() {
    const resizer = document.getElementById('drag-resizer');
    const editorPane = document.querySelector('.editor-pane');
    const container = document.querySelector('.preview-body');

    if (!resizer || !editorPane || !container) return;

    const onMouseDown = (e) => {
        state.isResizing = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        // Prevent text selection while resizing
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
    };

    const onMouseMove = (e) => {
        if (!state.isResizing) return;
        
        const containerRect = container.getBoundingClientRect();
        // Calculate new width relative to container
        let newWidth = e.clientX - containerRect.left;
        
        // Limits (min 15%, max 85%)
        if (newWidth < containerRect.width * 0.15) newWidth = containerRect.width * 0.15;
        if (newWidth > containerRect.width * 0.85) newWidth = containerRect.width * 0.85;

        editorPane.style.width = `${newWidth}px`;
        editorPane.style.flex = 'none'; // Disable flex grow/shrink to respect fixed width
    };

    const onMouseUp = () => {
        state.isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
    };

    resizer.addEventListener('mousedown', onMouseDown);
}

// --- 6. CHAT LOGIC ---

function startNewChat(forceUIUpdate = true) {
    state.currentChat = { id: Date.now().toString(), title: "New Conversation", messages: [], timestamp: Date.now(), isUnsaved: true };
    if (forceUIUpdate) {
        renderChatMessages([]);
        renderHistoryList();
    }
}

function saveCurrentChatIfNeeded() {
    if (!state.currentChat || state.currentChat.messages.length === 0) return;
    const idx = state.chatHistory.findIndex(c => c.id === state.currentChat.id);
    if (idx === -1) { state.currentChat.isUnsaved = false; state.chatHistory.unshift(state.currentChat); }
    else { state.chatHistory[idx] = state.currentChat; }
    if (state.chatHistory.length > CONFIG.MAX_HISTORY_ITEMS) state.chatHistory.pop();
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state.chatHistory));
    renderHistoryList();
}

function loadHistory() {
    try { state.chatHistory = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY)) || []; } 
    catch { state.chatHistory = []; }
}

function loadChatById(id) {
    const chat = state.chatHistory.find(c => c.id === id);
    if (chat) { state.currentChat = chat; renderChatMessages(chat.messages); renderHistoryList(); }
}

function deleteSingleChat(id) {
    if (!confirm("Delete this chat?")) return;
    state.chatHistory = state.chatHistory.filter(c => c.id !== id);
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state.chatHistory));
    if (state.currentChat && state.currentChat.id === id) startNewChat(true);
    else renderHistoryList();
}

function clearAllHistory() {
    state.chatHistory = [];
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify([]));
    startNewChat(true);
}

// --- 7. RESPONSE GENERATION & LINKS ---

async function handleUserMessage(text) {
    appendMessageToUI('user', text);
    state.currentChat.messages.push({ role: 'user', content: text });
    if (state.currentChat.messages.length === 1) state.currentChat.title = text.substring(0, 25) + (text.length > 25 ? "..." : "");
    saveCurrentChatIfNeeded();
    await generateResponse(text);
}

async function generateResponse(prompt) {
    state.isGenerating = true;
    updateUIControls();
    const msgId = 'ai-' + Date.now();
    appendLoadingIndicator(msgId);
    let responseText = "", linksHTML = "";

    try {
        if (!state.aiClient) throw new Error("No API");
        const result = await state.aiClient.models.generateContent({
            model: CONFIG.MODEL_NAME,
            contents: prompt,
            config: { systemInstruction: CONFIG.SYSTEM_INSTRUCTION }
        });
        responseText = result.text;
        
        // --- LINK INJECTION LOGIC ---
        linksHTML = getLocalLinksHTML(prompt);
        if (linksHTML) {
            responseText += `\n\n<div class='related-links-section'>${linksHTML}</div>`;
        }
        
    } catch (error) {
        console.warn("API Offline/Error", error);
        // Fallback to local search if API fails
        linksHTML = getLocalLinksHTML(prompt);
        if (linksHTML) {
            responseText = `I cannot connect to the server right now, but I found these related topics in our library:\n\n<div class='related-links-section'>${linksHTML}</div>`;
        } else {
            responseText = `<span style="color:var(--danger-color)">Unable to connect. Please check your internet connection.</span>`;
        }
    }

    removeLoadingIndicator(msgId);
    appendMessageToUI('model', responseText);
    state.currentChat.messages.push({ role: 'model', content: responseText });
    saveCurrentChatIfNeeded();
    state.isGenerating = false;
    updateUIControls();
}

/**
 * ROBUST LINK MATCHING LOGIC
 * Matches keywords from user prompt against the `window.GKApp.searchData` JSON.
 * Returns HTML string of <ul> links or empty string.
 */
function getLocalLinksHTML(query) {
    if (!window.GKApp || !window.GKApp.searchData) return "";
    
    // 1. Clean and Tokenize Query
    const ignore = ['hi','hello','hey','namaste','help','test','kaise','kya','good','morning','what','is','the','how','to','in','hindi','define','explain'];
    const qLower = query.toLowerCase().trim();
    
    // If query is too short, ignore
    if (qLower.length < 3) return "";

    // Split into words, filter out ignore list and small words
    const keywords = qLower.replace(/[?.!]/g, '').split(/\s+/).filter(w => w.length > 2 && !ignore.includes(w));
    
    if (keywords.length === 0) return "";

    const allData = window.GKApp.searchData;
    let matches = [];

    // 2. Scoring System
    // Title match = 5 points
    // Paragraph match = 1 point
    // Keyword match = 2 points

    matches = allData.map(item => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const paraLower = (item.paragraph || "").toLowerCase();

        // Exact phrase match in title (Bonus)
        if (titleLower.includes(qLower)) score += 10;

        keywords.forEach(kw => {
            if (titleLower.includes(kw)) score += 5;
            if (paraLower.includes(kw)) score += 1;
        });

        return { item, score };
    });

    // 3. Filter and Sort
    // Must have a score > 0 to be relevant
    matches = matches.filter(m => m.score > 0);
    matches.sort((a, b) => b.score - a.score);

    // 4. Generate HTML
    if (matches.length > 0) {
        // Take top 4 results
        const topResults = matches.slice(0, 4).map(m => m.item);
        
        // If score is very low (weak match), maybe don't show? 
        // But user asked to "Give links correctly", so even weak matches might be useful if context aligns.
        
        const items = topResults.map(item => `<li><a href="${item.url}" target="_blank">${item.title}</a></li>`).join('');
        return `<strong>Related Content from GK Learn Study:</strong><ul>${items}</ul>`;
    }

    return "";
}

// --- 8. EDITOR & PREVIEW ---

function openMergedPreview(msgElement) {
    const codeBlocks = msgElement.querySelectorAll('code[class*="language-"]');
    let html = "", css = "", js = "";

    codeBlocks.forEach(block => {
        const lang = Array.from(block.classList).find(c => c.startsWith('language-'))?.replace('language-', '');
        const code = block.innerText;
        if (lang === 'html' || lang === 'xml') html += code + "\n";
        else if (lang === 'css') css += code + "\n";
        else if (lang === 'javascript' || lang === 'js') js += code + "\n";
    });

    if (!html && !css && !js) html = "<!-- No code found in this message -->";

    const editor = document.getElementById('code-editor-textarea');
    // Pre-format the editor content
    editor.value = `<!-- HTML -->\n${html}\n\n<style>\n/* CSS */\n${css}\n</style>\n\n<script>\n// JS\n${js}\n<\/script>`;

    document.getElementById('preview-modal').classList.add('active');
    
    // Reset UI state
    setPreviewDevice('desktop');
    document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.device-btn[data-view="desktop"]').classList.add('active');
    
    // Reset editor pane width in case it was resized previously
    const editorPane = document.querySelector('.editor-pane');
    if(editorPane) {
        editorPane.style.width = ''; 
        editorPane.style.flex = '1';
    }

    updatePreviewIframe();
}

function setPreviewDevice(mode) {
    const container = document.getElementById('preview-pane-container');
    if (mode === 'mobile') container.style.width = '375px';
    else if (mode === 'tablet') container.style.width = '768px';
    else container.style.width = '100%';
}

function updatePreviewIframe() {
    const rawCode = document.getElementById('code-editor-textarea').value;
    const iframe = document.getElementById('preview-iframe');
    const doc = iframe.contentWindow.document;
    
    // Basic error handling for iframe
    try {
        doc.open(); 
        doc.write(rawCode); 
        doc.close();
    } catch(e) {
        console.error("Preview Error", e);
    }
}

// --- 9. HELPERS ---

function handleEditMessage(msgElement, oldText) {
    const allMsgs = Array.from(document.querySelectorAll('.chat-message')).filter(el => !el.classList.contains('typing-indicator')); 
    const domIndex = allMsgs.indexOf(msgElement);
    if (domIndex === -1) return;

    document.getElementById('question-input').value = state.currentChat.messages[domIndex].content;
    document.getElementById('question-input').focus();
    
    // Truncate chat history up to this point so we can "rewrite" history
    state.currentChat.messages = state.currentChat.messages.slice(0, domIndex);
    saveCurrentChatIfNeeded();
    renderChatMessages(state.currentChat.messages);
}

function handleRegenerate() {
    if (!state.currentChat.messages.length) return;
    const lastMsg = state.currentChat.messages[state.currentChat.messages.length - 1];
    
    // Only regenerate if the last message was from the model
    if (lastMsg.role === 'model') {
        state.currentChat.messages.pop(); // Remove last model response
        saveCurrentChatIfNeeded();
        renderChatMessages(state.currentChat.messages);
        
        // Find the user prompt that triggered it
        const lastUserMsg = state.currentChat.messages[state.currentChat.messages.length - 1];
        if (lastUserMsg) generateResponse(lastUserMsg.content);
    }
}

function renderChatMessages(messages) {
    const log = document.getElementById('chat-log');
    log.innerHTML = '';
    if (!messages || messages.length === 0) {
        log.innerHTML = `<div class="chat-message ai-message"><div class="message-avatar">🤖</div><div class="message-content"><p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?</p></div></div>`;
        return;
    }
    messages.forEach(msg => appendMessageToUI(msg.role, msg.content));
    scrollToBottom();
}

function appendMessageToUI(role, content) {
    const log = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.className = `chat-message ${role === 'user' ? 'user-message' : 'ai-message'}`;
    
    let avatarHTML = role === 'user' ? 
        `<div class="message-avatar"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>` :
        `<div class="message-avatar">🤖</div>`;

    // For user messages: Simple text
    // For AI messages: Markdown parsed + Code Toolbars
    let contentHTML = role === 'user' ? 
        `<div class="message-content"><div class="text-content">${escapeHTML(content)}</div><div class="msg-actions"><button class="msg-edit-btn">✎</button></div></div>` :
        `<div class="message-content"><div class="text-content">${DOMPurify.sanitize(marked.parse(content))}</div><div class="msg-actions"><button class="msg-regen-btn">↻</button></div></div>`;
    
    div.innerHTML = role === 'user' ? (contentHTML + avatarHTML) : (avatarHTML + contentHTML);
    log.appendChild(div);

    if (role === 'model') setTimeout(() => injectCodeToolbars(div), 0);
    scrollToBottom();
}

function appendLoadingIndicator(id) {
    const div = document.createElement('div'); div.id = id; div.className = 'chat-message ai-message typing-indicator';
    div.innerHTML = `<div class="message-avatar">🤖</div><div class="message-content"><div class="typing-dots"><span>.</span><span>.</span><span>.</span></div></div>`;
    document.getElementById('chat-log').appendChild(div); scrollToBottom();
}

function removeLoadingIndicator(id) { const el = document.getElementById(id); if(el) el.remove(); }

function renderHistoryList() {
    const list = document.getElementById('history-list');
    if (!list) return;
    if (state.chatHistory.length === 0) { list.innerHTML = '<li class="empty-history">No conversations.</li>'; return; }
    
    list.innerHTML = state.chatHistory.map(c => 
        `<li data-id="${c.id}" class="${state.currentChat && c.id === state.currentChat.id ? 'active' : ''}">
            <span class="history-item-text">${escapeHTML(c.title || "Chat")}</span>
            <button class="history-item-delete-btn">&times;</button>
        </li>`
    ).join('');
}

function updateUIControls() {
    const isGen = state.isGenerating;
    document.getElementById('stop-generating-container').style.display = isGen ? 'block' : 'none';
    const btn = document.getElementById('solve-button');
    btn.disabled = isGen; btn.style.opacity = isGen ? '0.5' : '1';
}

function scrollToBottom() { const log = document.getElementById('chat-log'); setTimeout(() => log.scrollTop = log.scrollHeight, 50); }
function escapeHTML(s) { return s ? s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]) : ''; }

/* 
   End of JS file. 
   Logic handles all aspects of the chat, including history, API calls, 
   UI rendering, and the new resizable preview window.
*/
