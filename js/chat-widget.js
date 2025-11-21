
import { GoogleGenAI } from "https://esm.run/@google/genai";
import { marked } from "https://esm.run/marked@12.0.2";
import DOMPurify from "https://esm.run/dompurify@3.0.8";
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
import katex from "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.mjs";

// ==========================================
// CONFIGURATION
// ==========================================
const CONFIG = {
    API_KEY: "AIzaSyAVEPlqyyOEMqDZkIqMcof7q0KEhWsiVp8", 
    MODEL_NAME: "gemini-2.5-flash",
    STORAGE_KEY: "aiChatHistory_Full_V8",
    MAX_HISTORY_ITEMS: 50,
    SYSTEM_INSTRUCTION: `
    You are an expert AI assistant for 'GK Learn Study'.

    **DESIGN & FORMATTING RULES:**
    1.  **Headings:** Use #, ##, ### for structuring content.
    2.  **Emphasis:** Use **Bold** for important concepts.
    3.  **Lists:** Use bullet points (-) or numbered lists (1.) for steps.
    4.  **Tables:** Use Markdown tables for comparisons.
    5.  **Links:** Provide helpful external links when necessary.

    **CRITICAL CODE BLOCK RULES:**
    1.  **NEVER** write raw HTML/CSS/JS that renders immediately.
    2.  **ALWAYS** wrap code in Markdown code blocks (e.g., \`\`\`html ... \`\`\`).
    3.  **EXPLAIN** the code briefly after providing it.
    
    **MATH RULES:**
    1. Use LaTeX wrapped in $ for inline ($E=mc^2$) and $$ for block math.
    `
};

// ==========================================
// STATE MANAGEMENT
// ==========================================
let state = {
    aiClient: null,
    chatHistory: [],
    currentChat: null,
    isGenerating: false,
    isWidgetOpen: false,
    isResizing: false,
    resizeStartX: 0,
    resizeStartWidth: 0
};

// ==========================================
// LOCAL SEARCH DATA (Fallback)
// ==========================================
const KEYWORD_MAP = {
    'sangya': 'noun', 'sarvanam': 'pronoun', 'visheshan': 'adjective', 'kriya': 'verb',
    'kaal': 'tense', 'alankar': 'alankar', 'samas': 'compound', 'sandhi': 'joining',
    'upsarg': 'prefix', 'pratyay': 'suffix', 'muhavare': 'idioms', 'paryayvacchi': 'synonyms',
    'vilom': 'antonyms', 'vyakaran': 'grammar', 'ganit': 'math', 'bhautik': 'physics',
    'rasayan': 'chemistry', 'itihaas': 'history', 'bhugol': 'geography', 'samvidhan': 'constitution'
};

// ==========================================
// MARKDOWN & RENDERING SETUP
// ==========================================
const renderer = new marked.Renderer();

// Custom Code Renderer to ensure Black Box & No Execution
renderer.code = (code, language) => {
    if (language === 'mermaid') {
        return `<div class="mermaid">${code}</div>`;
    }
    
    // CRITICAL: Escape HTML characters so browser displays them as text, not elements
    const validLang = !!(language && hljs.getLanguage(language)) ? language : 'plaintext';
    const escapedCode = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    return `<pre><div class="code-header"><span>${language || 'Code'}</span></div><code class="language-${validLang}">${escapedCode}</code></pre>`;
};

// Custom Table Renderer for Styling
renderer.table = (header, body) => {
    return `<div class="table-container"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
};

marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: true,
    headerIds: false,
    mangle: false
});

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeWidget();
});

// Fallback for lazy loading
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    if (!document.getElementById('ai-chat-widget')) {
        initializeWidget();
    }
}

function initializeWidget() {
    // 1. Inject HTML
    injectWidgetHTML();

    // 2. Initialize Libraries
    mermaid.initialize({ startOnLoad: false, theme: 'default' });
    // Highlight.js is loaded via CDN in main HTML or we assume standard pre-styling.
    // If hljs is not defined, we just use plaintext.
    if (typeof hljs === 'undefined') {
        window.hljs = { getLanguage: () => false, highlightAuto: (code) => ({ value: code }) };
    }

    // 3. Initialize AI
    try {
        state.aiClient = new GoogleGenAI({ apiKey: CONFIG.API_KEY });
    } catch (error) {
        console.error("AI Init Failed:", error);
    }

    // 4. Load Data & Event Listeners
    loadHistory();
    attachEventListeners();
    setupResizer();
}

// ==========================================
// HTML INJECTION (The Full Layout)
// ==========================================
function injectWidgetHTML() {
    if (document.getElementById('ai-chat-widget')) return;

    const widgetHTML = `
    <!-- Floating Toggle Button -->
    <button id="ai-widget-toggle-btn" aria-label="Open AI Chat">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 13.5C20 13.09 19.67 12.75 19.25 12.75C18.83 12.75 18.5 13.09 18.5 13.5V14.5C18.5 17.26 16.26 19.5 13.5 19.5C13.09 19.5 12.75 19.83 12.75 20.25C12.75 20.67 13.09 21 13.5 21C17.09 21 20 18.09 20 14.5V13.5M10.5 3C7.91 3 5.5 5.41 5.5 8V9C5.5 9.41 5.17 9.75 4.75 9.75C4.33 9.75 4 9.41 4 9V8C4 4.91 6.91 2 10.5 2C14.09 2 17 4.91 17 8V9C17 9.41 16.67 9.75 16.25 9.75C15.83 9.75 15.5 9.41 15.5 9V8C15.5 5.41 13.09 3 10.5 3M10.5 13.5C10.5 13.09 10.17 12.75 9.75 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H9.75C10.17 11.25 10.5 10.91 10.5 10.5C10.5 10.09 10.17 9.75 9.75 9.75H8C6.75 9.75 5.75 10.75 5.75 12C5.75 13.25 6.75 14.25 8 14.25H9.75C10.17 14.25 10.5 13.91 10.5 13.5M16 12.75H14.25C13.83 12.75 13.5 13.09 13.5 13.5C13.5 13.91 13.83 14.25 14.25 14.25H16C17.25 14.25 18.25 13.25 18.25 12C18.25 10.75 17.25 9.75 16 9.75H14.25C13.83 9.75 13.5 10.09 13.5 10.5C13.5 10.91 13.83 11.25 14.25 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"></path>
        </svg>
    </button>

    <!-- Main Widget Container -->
    <div id="ai-chat-widget">
        <div class="ai-container">
            
            <!-- Sidebar / History -->
            <aside id="history-panel">
                <div class="history-header">
                    <h2>History</h2>
                    <div class="history-header-actions">
                        <button id="clear-history-btn" title="Clear All">Clear</button>
                        <button id="close-history-btn" aria-label="Close History">&times;</button>
                    </div>
                </div>
                <ul id="history-list">
                    <!-- History items will be injected here -->
                </ul>
            </aside>

            <!-- Chat Area -->
            <section id="chat-area">
                <header class="chat-header">
                     <div class="chat-header-left">
                        <button id="menu-toggle" aria-label="Toggle History Menu" title="History">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
                        </button>
                        <h1>GK AI Assistant</h1>
                    </div>
                    <div class="chat-header-right">
                        <button id="new-chat-btn" aria-label="Start New Chat" title="New Chat">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> New
                        </button>
                        <button id="full-view-btn" aria-label="Toggle Full View" title="Expand">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17H7V14H5V19H10V17Z"></path></svg>
                        </button>
                        <button id="close-widget-btn" aria-label="Close Chat" title="Close">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                        </button>
                    </div>
                </header>
                
                <div id="chat-log" role="log" aria-live="polite">
                    <!-- Messages will appear here -->
                </div>

                <div class="chat-input-area">
                    <div id="stop-generating-container" style="display:none;">
                        <button id="stop-generating-btn">Stop Generating</button>
                    </div>
                    <form id="ai-solver-form">
                        <textarea id="question-input" rows="1" placeholder="Ask about code, grammar, math..." required></textarea>
                        <button type="submit" id="solve-button" aria-label="Send message">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path></svg>
                        </button>
                    </form>
                </div>
            </section>
        </div>
    </div>

    <!-- Code Preview Modal -->
    <div id="preview-modal">
        <div class="preview-content">
            <div class="preview-header">
                <h3>Live Code Preview</h3>
                <div class="preview-controls">
                    <button class="device-btn active" data-view="desktop" title="Desktop View">💻</button>
                    <button class="device-btn" data-view="tablet" title="Tablet View">📟</button>
                    <button class="device-btn" data-view="mobile" title="Mobile View">📱</button>
                </div>
                <div class="preview-actions">
                    <button id="run-code-btn">▶ Run Code</button>
                    <button id="close-preview-btn">&times;</button>
                </div>
            </div>
            <div class="preview-body">
                <div class="editor-pane">
                    <textarea id="code-editor-textarea" spellcheck="false" placeholder="HTML/CSS/JS goes here..."></textarea>
                </div>
                <div class="resizer" id="drag-resizer"></div>
                <div class="preview-pane-wrapper">
                    <div class="device-frame" id="device-frame">
                        <div class="camera-notch"></div>
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

// ==========================================
// EVENT HANDLING
// ==========================================
function attachEventListeners() {
    const widget = document.getElementById('ai-chat-widget');
    const toggleBtn = document.getElementById('ai-widget-toggle-btn');
    const input = document.getElementById('question-input');
    const form = document.getElementById('ai-solver-form');

    document.addEventListener('click', (e) => {
        const target = e.target;

        // Toggle Widget
        if (target.closest('#ai-widget-toggle-btn')) {
            widget.classList.add('active');
            toggleBtn.style.display = 'none';
            if(!state.currentChat) startNewChat(true);
            setTimeout(() => input.focus(), 300);
        }
        // Close Widget
        if (target.closest('#close-widget-btn')) {
            widget.classList.remove('active');
            toggleBtn.style.display = 'flex';
        }
        // New Chat
        if (target.closest('#new-chat-btn')) startNewChat(true);
        
        // Sidebar Toggles
        if (target.closest('#menu-toggle')) document.getElementById('history-panel').classList.toggle('active');
        if (target.closest('#close-history-btn')) document.getElementById('history-panel').classList.remove('active');
        
        // Maximize
        if (target.closest('#full-view-btn')) widget.classList.toggle('full-view');
        
        // Clear History
        if (target.closest('#clear-history-btn') && confirm("Are you sure you want to clear all history?")) clearAllHistory();
        
        // Stop Generation
        if (target.closest('#stop-generating-btn')) stopGeneration();

        // --- CODE ACTIONS ---
        if (target.closest('.code-copy-btn')) {
            const btn = target.closest('.code-copy-btn');
            const rawCode = decodeURIComponent(btn.dataset.code);
            navigator.clipboard.writeText(rawCode).then(() => {
                const orig = btn.innerText; 
                btn.innerText = "Copied!";
                setTimeout(() => btn.innerText = orig, 2000);
            });
        }
        if (target.closest('.code-preview-btn')) {
            const messageDiv = target.closest('.chat-message');
            openMergedPreview(messageDiv);
        }

        // --- PREVIEW MODAL ACTIONS ---
        if (target.closest('#close-preview-btn')) document.getElementById('preview-modal').classList.remove('active');
        if (target.closest('#run-code-btn')) updatePreviewIframe();
        if (target.closest('.device-btn')) {
            document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
            const btn = target.closest('.device-btn');
            btn.classList.add('active');
            setPreviewDevice(btn.dataset.view);
        }

        // --- HISTORY SELECTION ---
        const historyItem = target.closest('#history-list li');
        if (historyItem && !target.closest('.history-item-delete-btn')) {
            loadChatById(historyItem.dataset.id);
            document.getElementById('history-panel').classList.remove('active');
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

    // Auto-resize textarea
    input.addEventListener('input', () => { 
        input.style.height = 'auto'; 
        input.style.height = Math.min(input.scrollHeight, 120) + 'px'; 
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
}

// ==========================================
// RESIZER LOGIC
// ==========================================
function setupResizer() {
    const resizer = document.getElementById('drag-resizer');
    const editorPane = document.querySelector('.editor-pane');
    const container = document.querySelector('.preview-body');
    if (!resizer) return;

    const onMouseDown = (e) => {
        state.isResizing = true;
        state.resizeStartX = e.clientX;
        state.resizeStartWidth = editorPane.getBoundingClientRect().width;
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        
        // Prevent iframe interfering with mouse events
        document.body.style.userSelect = 'none';
        document.querySelector('.preview-content').style.pointerEvents = 'none';
    };

    const onMouseMove = (e) => {
        if (!state.isResizing) return;
        const dx = e.clientX - state.resizeStartX;
        const newWidth = state.resizeStartWidth + dx;
        // Min/Max width constraints
        if (newWidth > 100 && newWidth < container.getBoundingClientRect().width - 100) {
            editorPane.style.width = `${newWidth}px`;
            editorPane.style.flex = 'none';
        }
    };

    const onMouseUp = () => {
        state.isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.userSelect = '';
        document.querySelector('.preview-content').style.pointerEvents = 'auto';
    };

    resizer.addEventListener('mousedown', onMouseDown);
}

// ==========================================
// CHAT LOGIC & HISTORY
// ==========================================
function startNewChat(forceUI = true) {
    state.currentChat = { 
        id: Date.now().toString(), 
        title: "New Chat", 
        messages: [], 
        isUnsaved: true 
    };
    if (forceUI) {
        renderChatMessages([]);
        renderHistoryList();
    }
}

function saveCurrentChatIfNeeded() {
    if (!state.currentChat || state.currentChat.messages.length === 0) return;
    
    // Generate title from first user message if not set
    if (state.currentChat.isUnsaved && state.currentChat.messages.length > 0) {
        const firstMsg = state.currentChat.messages.find(m => m.role === 'user');
        if (firstMsg) {
            state.currentChat.title = firstMsg.content.substring(0, 25) + (firstMsg.content.length > 25 ? "..." : "");
            state.currentChat.isUnsaved = false;
        }
    }

    const idx = state.chatHistory.findIndex(c => c.id === state.currentChat.id);
    if (idx === -1) {
        state.chatHistory.unshift(state.currentChat);
    } else {
        state.chatHistory[idx] = state.currentChat;
    }

    // Limit history size
    if (state.chatHistory.length > CONFIG.MAX_HISTORY_ITEMS) {
        state.chatHistory.pop();
    }

    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state.chatHistory));
    renderHistoryList();
}

function loadHistory() {
    try { 
        const data = localStorage.getItem(CONFIG.STORAGE_KEY);
        state.chatHistory = data ? JSON.parse(data) : []; 
    } catch (e) { 
        console.error("Error loading history", e);
        state.chatHistory = []; 
    }
    renderHistoryList();
}

function loadChatById(id) {
    const chat = state.chatHistory.find(c => c.id === id);
    if (chat) { 
        state.currentChat = chat; 
        renderChatMessages(chat.messages); 
    }
}

function deleteSingleChat(id) {
    if (!confirm("Delete this chat permanently?")) return;
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
    localStorage.removeItem(CONFIG.STORAGE_KEY);
    startNewChat(true);
}

function renderHistoryList() {
    const list = document.getElementById('history-list');
    if (state.chatHistory.length === 0) { 
        list.innerHTML = '<li class="empty-history">No chat history. Start a new conversation!</li>'; 
        return; 
    }
    
    list.innerHTML = state.chatHistory.map(c => {
        const isActive = state.currentChat && state.currentChat.id === c.id ? 'active' : '';
        return `
        <li data-id="${c.id}" class="${isActive}">
            <span class="history-title">${escapeHTML(c.title || "Chat")}</span>
            <button class="history-item-delete-btn" title="Delete">&times;</button>
        </li>`;
    }).join('');
}

// ==========================================
// AI INTERACTION
// ==========================================
async function handleUserMessage(text) {
    appendMessageToUI('user', text);
    state.currentChat.messages.push({ role: 'user', content: text });
    saveCurrentChatIfNeeded();
    await generateResponse(text);
}

async function generateResponse(prompt) {
    state.isGenerating = true;
    updateUIControls();
    
    const msgId = 'ai-' + Date.now();
    appendLoadingIndicator(msgId);
    let responseText = "";

    try {
        if (!state.aiClient) throw new Error("AI Client not initialized");
        
        const result = await state.aiClient.models.generateContent({
            model: CONFIG.MODEL_NAME,
            contents: prompt,
            config: { 
                systemInstruction: CONFIG.SYSTEM_INSTRUCTION,
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
            }
        });
        responseText = result.text;
        
        // Fallback logic for local data if AI is confused or for additional context
        const localLinks = getAggressiveLinks(prompt);
        if(localLinks) {
            responseText += `\n\n**Related Resources from GK Learn Study:**\n${localLinks}`;
        }

    } catch (error) {
        console.error("Generation Error:", error);
        
        if (error.toString().includes('403') || error.status === 403) {
            responseText = "**Authentication Error (403):** The API Key may be invalid or restricted. Please check your configuration.";
        } else {
            // Try Local Search Fallback completely if API fails
            const links = getAggressiveLinks(prompt);
            if (links) {
                responseText = `I'm having trouble connecting to the AI server right now. However, I found these related topics in our local database:\n\n${links}`;
            } else {
                responseText = "**Connection Error:** Unable to reach the AI service and no local matches found. Please check your internet connection.";
            }
        }
    }

    removeLoadingIndicator(msgId);
    appendMessageToUI('model', responseText);
    state.currentChat.messages.push({ role: 'model', content: responseText });
    saveCurrentChatIfNeeded();
    state.isGenerating = false;
    updateUIControls();
}

function getAggressiveLinks(query) {
    if (!window.GKApp || !window.GKApp.searchData) return "";
    const qLower = query.toLowerCase();
    
    let searchTerms = [qLower];
    // Add mapped keywords
    for (const [hi, en] of Object.entries(KEYWORD_MAP)) {
        if (qLower.includes(hi)) searchTerms.push(en);
    }

    const matches = window.GKApp.searchData.filter(item => {
        const text = (item.title + " " + item.url).toLowerCase();
        return searchTerms.some(t => text.includes(t) && t.length > 3);
    });

    if (matches.length > 0) {
        // Limit to 3 distinct links
        const uniqueLinks = [];
        const seenUrls = new Set();
        for (const m of matches) {
            if(!seenUrls.has(m.url)) {
                seenUrls.add(m.url);
                uniqueLinks.push(`- [${m.title}](${m.url})`);
                if(uniqueLinks.length >= 3) break;
            }
        }
        return uniqueLinks.join('\n');
    }
    return "";
}

function updateUIControls() {
    const btn = document.getElementById('stop-generating-container');
    if(btn) btn.style.display = state.isGenerating ? 'block' : 'none';
    
    const sendBtn = document.getElementById('solve-button');
    if(sendBtn) sendBtn.disabled = state.isGenerating;
}

function stopGeneration() {
    state.isGenerating = false;
    updateUIControls();
    // Note: The Google GenAI SDK currently doesn't support aborting a specific request easily without AbortController wrapping, 
    // but this flag stops the UI from waiting.
}

// ==========================================
// UI RENDERING & PROCESSING
// ==========================================

// Helper: Escape HTML for safe rendering in history lists or raw output
function escapeHTML(s) {
    return String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}

// 1. Mask Math ($...$)
function maskMath(text) {
    const placeholders = [];
    // Block Math $$...$$
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (match, expr) => {
        try {
            const html = katex.renderToString(expr, { displayMode: true, throwOnError: false });
            placeholders.push(html);
            return `___MATH_BLOCK_${placeholders.length - 1}___`;
        } catch(e) { return match; }
    });
    // Inline Math $...$
    text = text.replace(/\$([^$\n]+?)\$/g, (match, expr) => {
        try {
            const html = katex.renderToString(expr, { displayMode: false, throwOnError: false });
            placeholders.push(html);
            return `___MATH_INLINE_${placeholders.length - 1}___`;
        } catch(e) { return match; }
    });
    return { text, placeholders };
}

// 2. Restore Math
function restoreMath(html, placeholders) {
    return html.replace(/___MATH_(BLOCK|INLINE)_(\d+)___/g, (match, type, index) => {
        return placeholders[parseInt(index)] || match;
    });
}

function appendMessageToUI(role, content) {
    const log = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.className = `chat-message ${role === 'user' ? 'user-message' : 'ai-message'}`;
    
    const avatar = role === 'user' ? '👤' : '🤖';
    
    let htmlContent = "";
    
    if (role === 'user') {
        // Simple text escape for user
        htmlContent = escapeHTML(content).replace(/\n/g, "<br>");
    } else {
        // 1. Mask Math
        const { text: maskedText, placeholders } = maskMath(content);
        
        // 2. Parse Markdown (This handles code blocks via renderer.code)
        let rawHtml = marked.parse(maskedText);
        
        // 3. Sanitize (Allowing specific tags for styling/math/svg)
        const cleanHtml = DOMPurify.sanitize(rawHtml, {
            ADD_TAGS: ['iframe', 'math', 'semantics', 'mrow', 'mi', 'mo', 'mn', 'annotation', 'svg', 'path', 'rect', 'circle', 'line', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span', 'pre', 'code'],
            ADD_ATTR: ['src', 'width', 'height', 'frameborder', 'allowfullscreen', 'xmlns', 'viewBox', 'd', 'fill', 'stroke', 'class', 'style']
        });
        
        // 4. Restore Math
        htmlContent = restoreMath(cleanHtml, placeholders);
    }

    div.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">${htmlContent}</div>
    `;
    
    log.appendChild(div);
    
    if (role === 'model') {
        postProcessAIResponse(div);
    }
    
    requestAnimationFrame(() => {
        log.scrollTop = log.scrollHeight;
    });
}

function postProcessAIResponse(messageDiv) {
    // Add Copy/Preview Toolbars to Code Blocks
    messageDiv.querySelectorAll('pre').forEach(pre => {
        // Skip if it's a mermaid container
        if(pre.parentElement && pre.parentElement.classList.contains('mermaid')) return;
        
        const codeEl = pre.querySelector('code');
        if (!codeEl) return;

        const rawCode = codeEl.innerText; // Get raw text for copying
        const encoded = encodeURIComponent(rawCode);
        
        // Create Toolbar
        const toolbar = document.createElement('div');
        toolbar.className = 'code-toolbar';
        toolbar.innerHTML = `
            <button class="code-copy-btn" data-code="${encoded}">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="vertical-align:-2px; margin-right:2px;"><path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"/></svg> Copy
            </button>
            <button class="code-preview-btn">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="vertical-align:-2px; margin-right:2px;"><path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"/></svg> Preview
            </button>
        `;
        
        pre.insertBefore(toolbar, pre.firstChild);
    });

    // Render Mermaid Diagrams
    setTimeout(() => {
        const mermaidNodes = messageDiv.querySelectorAll('.mermaid');
        if (mermaidNodes.length > 0) {
            try {
                mermaid.run({ nodes: mermaidNodes });
            } catch(e) {
                console.warn("Mermaid Render Error", e);
            }
        }
    }, 100);
}

function renderChatMessages(messages) {
    const log = document.getElementById('chat-log');
    log.innerHTML = '';
    
    // Intro Message
    const introDiv = document.createElement('div');
    introDiv.className = 'chat-message ai-message';
    introDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <p><strong>नमस्ते! मैं आपका GK Learn Study AI Assistant हूँ।</strong></p>
            <p>आप मुझसे पूछ सकते हैं:</p>
            <ul>
                <li>HTML/CSS/JS कोड बनाने के लिए</li>
                <li>गणित, विज्ञान या इतिहास के सवाल</li>
                <li>निबंध या व्याकरण के नियम</li>
            </ul>
        </div>`;
    log.appendChild(introDiv);

    if (messages && messages.length > 0) {
        messages.forEach(msg => appendMessageToUI(msg.role === 'user' ? 'user' : 'model', msg.content));
    }
}

function appendLoadingIndicator(id) {
    const div = document.createElement('div');
    div.id = id;
    div.className = 'chat-message ai-message typing-indicator';
    div.innerHTML = `<div class="message-avatar">🤖</div><div class="message-content"><div class="dot-flashing"></div></div>`;
    document.getElementById('chat-log').appendChild(div);
    document.getElementById('chat-log').scrollTop = document.getElementById('chat-log').scrollHeight;
}

function removeLoadingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// ==========================================
// PREVIEW MODAL LOGIC
// ==========================================
function openMergedPreview(messageDiv) {
    let html = "", css = "", js = "";
    
    // Extract code from all blocks in the message
    messageDiv.querySelectorAll('code').forEach(block => {
        const cls = block.className;
        const txt = block.innerText;
        if (cls.includes('html') || cls.includes('xml')) html += txt + "\n";
        else if (cls.includes('css')) css += txt + "\n";
        else if (cls.includes('javascript') || cls.includes('js')) js += txt + "\n";
    });

    // If no specific type found but there's code, try to guess or just put in HTML
    if (!html && !css && !js) {
        const firstBlock = messageDiv.querySelector('code');
        if(firstBlock) html = firstBlock.innerText;
    }

    const combinedCode = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
${css}
</style>
</head>
<body>
${html}
<script>
try {
    ${js}
} catch(e) { console.error(e); }
<\/script>
</body>
</html>`;

    const editor = document.getElementById('code-editor-textarea');
    editor.value = combinedCode;
    
    document.getElementById('preview-modal').classList.add('active');
    updatePreviewIframe();
}

function updatePreviewIframe() {
    const val = document.getElementById('code-editor-textarea').value;
    const iframe = document.getElementById('preview-iframe');
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(val);
    doc.close();
}

function setPreviewDevice(mode) {
    const frame = document.getElementById('device-frame');
    frame.className = 'device-frame ' + (mode === 'mobile' ? 'mobile-device' : mode === 'tablet' ? 'tablet-device' : 'desktop-device');
}
