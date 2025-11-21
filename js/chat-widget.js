
import { GoogleGenAI } from "https://esm.run/@google/genai";
import { marked } from "https://esm.run/marked@12.0.2";
import DOMPurify from "https://esm.run/dompurify@3.0.8";
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
import katex from "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.mjs";

const CONFIG = {
    API_KEY: "AIzaSyAlQLgoG7I8ieSp2RSQ3sgwxl5g0hDIQqA",
    MODEL_NAME: "gemini-2.5-flash",
    STORAGE_KEY: "aiChatHistory_Ultimate_Pro_Max",
    MAX_HISTORY_ITEMS: 50,
    SYSTEM_INSTRUCTION: `
    You are a sophisticated AI assistant for 'GK Learn Study'.
    
    CAPABILITIES:
    1. **RICH UI**: Use Markdown for structure.
       - Use # for main headings.
       - Use ## for subheadings.
       - Use **bold** for emphasis.
       - Use - or 1. for lists.
    
    2. **CODE BLOCKS**: Always wrap code in triple backticks with the language name.
       Example:
       \`\`\`html
       <div>Code here</div>
       \`\`\`
    
    3. **MATH**: Use LaTeX for math. 
       - Block math: $$ \\int_0^\\infty x^2 dx $$
       - Inline math: $ E = mc^2 $
    
    4. **DIAGRAMS**: Create flowcharts using Mermaid syntax inside a code block.
       \`\`\`mermaid
       graph TD;
       A-->B;
       \`\`\`

    TONE: Educational, Encouraging, and Visual.
    `
};

// --- HINDI TO ENGLISH MAPPING FOR SEARCH ---
const KEYWORD_MAP = {
    'sangya': 'noun',
    'sarvanam': 'pronoun',
    'visheshan': 'adjective',
    'kriya': 'verb',
    'kaal': 'tense',
    'alankar': 'alankar',
    'samas': 'compound',
    'sandhi': 'joining',
    'upsarg': 'prefix',
    'pratyay': 'suffix',
    'muhavare': 'idioms',
    'paryayvacchi': 'synonyms',
    'vilom': 'antonyms',
    'vyakaran': 'grammar',
    'ganit': 'math',
    'bhautik': 'physics',
    'rasayan': 'chemistry',
    'itihaas': 'history',
    'bhugol': 'geography',
    'samvidhan': 'constitution',
    'vlookup': 'excel'
};

let state = {
    aiClient: null,
    chatHistory: [],
    currentChat: null,
    isGenerating: false,
    isWidgetOpen: false,
    isResizing: false
};

// --- CUSTOM MARKED RENDERER ---
const renderer = new marked.Renderer();

// 1. Code Block Handler: Escapes HTML to prevent execution, wraps in "Black Box"
renderer.code = (code, language) => {
    if (language === 'mermaid') {
        return `<div class="mermaid">${code}</div>`;
    }
    // Manually escape characters to ensure browser treats it as text, not HTML tags
    const escapedCode = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const langClass = language ? `language-${language}` : '';
    
    return `
    <div class="code-block-wrapper">
        <div class="code-header">
            <span class="code-lang">${language || 'code'}</span>
            <button class="code-copy-btn" data-code="${encodeURIComponent(code)}">Copy</button>
        </div>
        <pre><code class="${langClass}">${escapedCode}</code></pre>
    </div>`;
};

marked.use({ renderer });

document.addEventListener('DOMContentLoaded', () => {
    initializeWidget();
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    if (!document.getElementById('ai-chat-widget')) {
        initializeWidget();
    }
}

function initializeWidget() {
    injectWidgetHTML();
    injectWidgetCSS();
    
    mermaid.initialize({ startOnLoad: false, theme: 'default' });

    try {
        state.aiClient = new GoogleGenAI({ apiKey: CONFIG.API_KEY });
    } catch (error) {
        console.error("AI Init Failed:", error);
    }

    loadHistory();
    state.currentChat = null;
    attachEventListeners();
    setupResizer();
}

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
                    <h2>History</h2>
                    <div class="history-header-actions">
                        <button id="clear-history-btn">Clear</button>
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
                        <h1>AI Assistant</h1>
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
                
                <div id="chat-log" role="log"></div>

                <div class="chat-input-area">
                    <div id="stop-generating-container" style="display:none;">
                        <button id="stop-generating-btn">Stop Generating</button>
                    </div>
                    <form id="ai-solver-form">
                        <textarea id="question-input" rows="1" placeholder="Ask me..." required></textarea>
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
                
                <div class="resizer" id="drag-resizer" title="Drag to resize"></div>
                
                <div class="preview-pane-wrapper">
                    <div class="device-frame" id="device-frame">
                        <div class="camera-notch"></div>
                        <div class="preview-pane" id="preview-pane-container">
                            <iframe id="preview-iframe"></iframe>
                        </div>
                        <div class="home-button"></div>
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
    if (!document.querySelector('link[href*="chat-widget.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/chat-widget.css';
        document.head.appendChild(link);
    }
    // Inject KaTeX CSS
    if (!document.querySelector('link[href*="katex.min.css"]')) {
        const katexLink = document.createElement('link');
        katexLink.rel = 'stylesheet';
        katexLink.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
        document.head.appendChild(katexLink);
    }
}

function attachEventListeners() {
    const widget = document.getElementById('ai-chat-widget');
    const toggleBtn = document.getElementById('ai-widget-toggle-btn');
    const input = document.getElementById('question-input');
    const form = document.getElementById('ai-solver-form');

    document.addEventListener('click', (e) => {
        const target = e.target;

        if (target.closest('#ai-widget-toggle-btn')) {
            if (!widget.classList.contains('active')) {
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
        if (target.closest('#new-chat-btn')) startNewChat(true);
        if (target.closest('#menu-toggle')) document.getElementById('history-panel').classList.toggle('active');
        if (target.closest('#close-history-btn')) document.getElementById('history-panel').classList.remove('active');
        if (target.closest('#full-view-btn')) widget.classList.toggle('full-view');
        if (target.closest('#clear-history-btn') && confirm("Delete all history?")) clearAllHistory();
        if (target.closest('#stop-generating-btn')) stopGeneration();

        if (target.closest('.msg-edit-btn')) {
            const msg = target.closest('.chat-message');
            handleEditMessage(msg, msg.querySelector('.text-content').innerText);
        }
        if (target.closest('.msg-regen-btn')) handleRegenerate();
        
        // Code Copy Button
        if (target.closest('.code-copy-btn')) {
            const btn = target.closest('.code-copy-btn');
            const rawCode = decodeURIComponent(btn.dataset.code);
            navigator.clipboard.writeText(rawCode).then(() => {
                const orig = btn.innerText; 
                btn.innerText = "Copied!";
                setTimeout(() => btn.innerText = orig, 2000);
            });
        }
        
        // Edit Code Button (Opens Preview Modal)
        if (target.closest('.code-edit-btn')) {
             openMergedPreview(target.closest('.code-block-wrapper'));
        }

        if (target.closest('#close-preview-btn')) document.getElementById('preview-modal').classList.remove('active');
        if (target.closest('#run-code-btn')) updatePreviewIframe();
        
        if (target.closest('.device-btn')) {
            const btn = target.closest('.device-btn');
            document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setPreviewDevice(btn.dataset.view);
        }

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
}

function setupResizer() {
    const resizer = document.getElementById('drag-resizer');
    const editorPane = document.querySelector('.editor-pane');
    const container = document.querySelector('.preview-body');

    if (!resizer || !editorPane || !container) return;

    const onMouseDown = (e) => {
        state.isResizing = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
    };

    const onMouseMove = (e) => {
        if (!state.isResizing) return;
        const containerRect = container.getBoundingClientRect();
        let newWidth = e.clientX - containerRect.left;
        if (newWidth < containerRect.width * 0.15) newWidth = containerRect.width * 0.15;
        if (newWidth > containerRect.width * 0.85) newWidth = containerRect.width * 0.85;
        editorPane.style.width = `${newWidth}px`;
        editorPane.style.flex = 'none';
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
        
        linksHTML = getAggressiveLinks(prompt);
        if (linksHTML) {
            responseText += `\n\n<div class='related-links-section'>${linksHTML}</div>`;
        }
        
    } catch (error) {
        console.warn("API Offline/Error", error);
        linksHTML = getAggressiveLinks(prompt);
        if (linksHTML) {
            responseText = `Internet issue, but I found this in the library:\n\n<div class='related-links-section'>${linksHTML}</div>`;
        } else {
            responseText = `<span style="color:var(--danger-color)">Connection failed. Please check internet.</span>`;
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
    const searchData = window.GKApp.searchData;
    
    let searchTerms = [qLower];
    Object.keys(KEYWORD_MAP).forEach(hindiKey => {
        if (qLower.includes(hindiKey)) {
            searchTerms.push(KEYWORD_MAP[hindiKey]);
        }
    });

    let matches = searchData.filter(item => {
        const title = item.title.toLowerCase();
        const url = item.url.toLowerCase();
        const para = (item.paragraph || "").toLowerCase();
        
        return searchTerms.some(term => {
            if (term.length < 3 && !KEYWORD_MAP[term]) return false;
            return title.includes(term) || url.includes(term) || para.includes(term);
        });
    });

    matches.sort((a, b) => {
        const aTitleMatch = searchTerms.some(t => a.title.toLowerCase().includes(t));
        const bTitleMatch = searchTerms.some(t => b.title.toLowerCase().includes(t));
        return bTitleMatch - aTitleMatch; 
    });

    if (matches.length > 0) {
        const uniqueItems = [...new Map(matches.map(item => [item.url, item])).values()].slice(0, 5);
        const list = uniqueItems.map(item => `<li><a href="${item.url}" target="_blank">${item.title}</a></li>`).join('');
        return `<strong>Related Topics:</strong><ul>${list}</ul>`;
    }
    return "";
}

function processMath(text) {
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (match, expr) => {
        try {
            return katex.renderToString(expr, { displayMode: true, throwOnError: false });
        } catch (e) { return match; }
    });
    text = text.replace(/\$([^$]+?)\$/g, (match, expr) => {
        try {
            return katex.renderToString(expr, { displayMode: false, throwOnError: false });
        } catch (e) { return match; }
    });
    return text;
}

function openMergedPreview(codeWrapper) {
    const messageDiv = codeWrapper.closest('.chat-message');
    if (!messageDiv) return;

    // 1. Scan the entire message for ANY code blocks
    const blocks = messageDiv.querySelectorAll('.code-block-wrapper');
    
    let html = '';
    let css = '';
    let js = '';
    let fullDoc = '';

    blocks.forEach(block => {
        const lang = block.querySelector('.code-lang')?.innerText.toLowerCase().trim();
        const code = block.querySelector('code').innerText;

        if (lang === 'html' || lang === 'xml') {
            // Check if this block is already a full document
            if (code.includes('<!DOCTYPE html') || code.includes('<html')) {
                fullDoc = code;
            } else {
                html += code + '\n';
            }
        } else if (lang === 'css') {
            css += code + '\n';
        } else if (lang === 'javascript' || lang === 'js') {
            js += code + '\n';
        }
    });

    // 2. Construct the merged result
    let finalContent = '';

    if (fullDoc) {
        // If we found a full HTML document, try to inject CSS/JS if they aren't already there
        // (Simple string injection for basic cases)
        finalContent = fullDoc;
        if (css && !fullDoc.includes(css.substring(0, 20))) { // Basic check to avoid duplication
            finalContent = finalContent.replace('</head>', `<style>\n${css}\n</style>\n</head>`);
        }
        if (js && !fullDoc.includes(js.substring(0, 20))) {
            finalContent = finalContent.replace('</body>', `<script>\n${js}\n</script>\n</body>`);
        }
    } else {
        // Fallback: Wrap fragments
        // If no HTML found but CSS/JS exists, create a skeleton
        if (!html && (css || js)) {
            html = '<h1>Preview</h1><p>See the result of your code below.</p>';
        }

        finalContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
${css}
</style>
</head>
<body>
${html}
<script>
${js}
</script>
</body>
</html>`;
    }

    // 3. Populate Editor
    setEditorContent(finalContent);
}

function setEditorContent(content) {
    const editor = document.getElementById('code-editor-textarea');
    editor.value = content;
    document.getElementById('preview-modal').classList.add('active');
    
    setPreviewDevice('desktop');
    document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.device-btn[data-view="desktop"]').classList.add('active');
    
    updatePreviewIframe();
}

function setPreviewDevice(mode) {
    const frame = document.getElementById('device-frame');
    frame.className = 'device-frame'; 
    if (mode === 'mobile') frame.classList.add('mobile-device');
    else if (mode === 'tablet') frame.classList.add('tablet-device');
    else frame.classList.add('desktop-device');
}

function updatePreviewIframe() {
    const rawCode = document.getElementById('code-editor-textarea').value;
    const iframe = document.getElementById('preview-iframe');
    const doc = iframe.contentWindow.document;
    doc.open(); 
    doc.write(rawCode); 
    doc.close();
}

function handleEditMessage(msgElement, oldText) {
    const allMsgs = Array.from(document.querySelectorAll('.chat-message')).filter(el => !el.classList.contains('typing-indicator')); 
    const domIndex = allMsgs.indexOf(msgElement);
    if (domIndex === -1) return;

    document.getElementById('question-input').value = state.currentChat.messages[domIndex].content;
    document.getElementById('question-input').focus();
    
    state.currentChat.messages = state.currentChat.messages.slice(0, domIndex);
    saveCurrentChatIfNeeded();
    renderChatMessages(state.currentChat.messages);
}

function handleRegenerate() {
    if (!state.currentChat.messages.length) return;
    const lastMsg = state.currentChat.messages[state.currentChat.messages.length - 1];
    if (lastMsg.role === 'model') {
        state.currentChat.messages.pop();
        saveCurrentChatIfNeeded();
        renderChatMessages(state.currentChat.messages);
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

    let processedContent = escapeHTML(content);
    
    if (role === 'model') {
        let mathProcessed = processMath(content);
        let markdownProcessed = marked.parse(mathProcessed);
        // Sanitization is important, but we must allow the structure for our code blocks
        processedContent = DOMPurify.sanitize(markdownProcessed, {
            ADD_TAGS: ['math', 'maction', 'maligngroup', 'malignmark', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mlongdiv', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mscarries', 'mscarry', 'msgroup', 'msline', 'mspace', 'msqrt', 'msrow', 'mstack', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'semantics', 'annotation', 'annotation-xml', 'svg', 'path', 'rect', 'circle', 'line', 'iframe', 'button'],
            ADD_ATTR: ['class', 'style', 'viewBox', 'd', 'fill', 'stroke', 'src', 'width', 'height', 'frameborder', 'data-code']
        });
    }

    let contentHTML = role === 'user' ? 
        `<div class="message-content"><div class="text-content">${processedContent}</div><div class="msg-actions"><button class="msg-edit-btn">✎</button></div></div>` :
        `<div class="message-content"><div class="text-content">${processedContent}</div><div class="msg-actions"><button class="msg-regen-btn">↻</button></div></div>`;
    
    div.innerHTML = role === 'user' ? (contentHTML + avatarHTML) : (avatarHTML + contentHTML);
    log.appendChild(div);

    if (role === 'model') {
        setTimeout(() => {
            try {
                mermaid.run({ nodes: div.querySelectorAll('.mermaid') });
            } catch (e) { console.warn("Mermaid error", e); }
            
            // Inject Edit Buttons for Code Blocks
            div.querySelectorAll('.code-block-wrapper').forEach(wrapper => {
                const header = wrapper.querySelector('.code-header');
                if(header) {
                    const editBtn = document.createElement('button');
                    editBtn.className = 'code-edit-btn';
                    editBtn.innerText = 'Edit / Run';
                    header.appendChild(editBtn);
                }
            });

        }, 100);
    }
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

function stopGeneration() {
    state.isGenerating = false; updateUIControls();
    const loader = document.querySelector('.typing-indicator');
    if (loader) { loader.innerHTML = `<div class="message-content">Stopped.</div>`; loader.classList.remove('typing-indicator'); }
}

function scrollToBottom() { const log = document.getElementById('chat-log'); setTimeout(() => log.scrollTop = log.scrollHeight, 50); }
function escapeHTML(s) { return s ? s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]) : ''; }
