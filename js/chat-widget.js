
import { GoogleGenAI } from "https://esm.run/@google/genai";
import { marked } from "https://esm.run/marked@12.0.2";
import DOMPurify from "https://esm.run/dompurify@3.0.8";
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
import katex from "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.mjs";
import hljs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js";

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

// 1. Code Block Handler: Applies Syntax Highlighting and wraps in "Black Box"
renderer.code = (code, language) => {
    if (language === 'mermaid') {
        return `<div class="mermaid">${code}</div>`;
    }

    // Syntax Highlighting using highlight.js
    const validLang = language && hljs.getLanguage(language) ? language : 'plaintext';
    let highlightedCode;
    try {
        highlightedCode = hljs.highlight(code, { language: validLang }).value;
    } catch (e) {
        // Fallback to basic escaping if highlighting fails
        highlightedCode = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    const langClass = language ? `language-${language}` : '';
    
    // We store the raw code in data-code for the Copy functionality
    // The Preview button triggers the auto-merging logic
    return `
    <div class="code-block-wrapper">
        <div class="code-header">
            <span class="code-lang">${language || 'code'}</span>
            <div style="display:flex; align-items:center;">
                ${['html', 'css', 'js', 'javascript'].includes(language?.toLowerCase()) ? `<button class="code-edit-btn" data-code="${encodeURIComponent(code)}">Preview</button>` : ''}
                <button class="code-copy-btn" data-code="${encodeURIComponent(code)}">Copy</button>
            </div>
        </div>
        <pre><code class="hljs ${langClass}">${highlightedCode}</code></pre>
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
    // injectWidgetCSS(); // Removed, CSS is now in separate file
    
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
                        <button id="close-history-btn" aria-label="Close History">&times;</button>
                    </div>
                </div>
                <ul id="history-list"><li class="empty-history">No history yet.</li></ul>
            </aside>

            <section id="chat-area">
                <header class="chat-header">
                    <div class="chat-header-left">
                        <button id="menu-toggle" aria-label="History">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/></svg>
                        </button>
                        <h1>AI Solver</h1>
                    </div>
                    <div class="chat-header-right">
                        <button id="new-chat-btn">New Chat</button>
                        <button id="full-view-btn" aria-label="Full View"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17H7V14H5V19H10V17Z"/></svg></button>
                        <button id="close-widget-btn" aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/></svg></button>
                    </div>
                </header>

                <div id="chat-log">
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
                        <textarea id="question-input" rows="1" placeholder="Ask a question (Math, GK, Coding)..." required></textarea>
                        <button type="submit" id="solve-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/></svg>
                        </button>
                    </form>
                </div>
            </section>
        </div>
    </div>

    <div id="preview-modal">
        <div class="preview-content">
            <div class="preview-header">
                <div class="preview-controls">
                    <button class="device-btn active" data-device="desktop">Desktop</button>
                    <button class="device-btn" data-device="tablet">Tablet</button>
                    <button class="device-btn" data-device="mobile">Mobile</button>
                </div>
                <div class="preview-actions">
                    <button id="run-code-btn">Run ▶</button>
                    <button id="close-preview-btn">&times;</button>
                </div>
            </div>
            <div class="preview-body">
                <div class="editor-pane">
                    <textarea id="code-editor-textarea" spellcheck="false"></textarea>
                </div>
                <div class="resizer" id="drag-handle"></div>
                <div class="preview-pane-wrapper">
                    <div class="device-frame desktop-device" id="device-frame">
                        <div class="camera-notch"></div>
                        <div class="preview-pane">
                            <iframe id="preview-iframe"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
}

function attachEventListeners() {
    const widgetToggleBtn = document.getElementById('ai-widget-toggle-btn');
    const chatWidget = document.getElementById('ai-chat-widget');
    const closeWidgetBtn = document.getElementById('close-widget-btn');
    const fullViewBtn = document.getElementById('full-view-btn');
    const historyPanel = document.getElementById('history-panel');
    const form = document.getElementById('ai-solver-form');
    const input = document.getElementById('question-input');
    const chatLog = document.getElementById('chat-log');

    widgetToggleBtn.addEventListener('click', () => {
        chatWidget.classList.add('active');
        widgetToggleBtn.style.display = 'none';
        setTimeout(() => input.focus(), 100);
    });

    closeWidgetBtn.addEventListener('click', () => {
        chatWidget.classList.remove('active');
        widgetToggleBtn.style.display = 'flex';
    });

    fullViewBtn.addEventListener('click', () => chatWidget.classList.toggle('full-view'));

    document.getElementById('menu-toggle').addEventListener('click', () => historyPanel.classList.add('active'));
    document.getElementById('close-history-btn').addEventListener('click', () => historyPanel.classList.remove('active'));
    
    document.getElementById('new-chat-btn').addEventListener('click', startNewChat);
    document.getElementById('clear-history-btn').addEventListener('click', clearHistory);

    form.addEventListener('submit', handleFormSubmit);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleFormSubmit(e);
        }
    });
    input.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    chatLog.addEventListener('click', handleChatLogClick);

    // Preview Modal Events
    document.getElementById('close-preview-btn').addEventListener('click', () => {
        document.getElementById('preview-modal').classList.remove('active');
    });
    document.getElementById('run-code-btn').addEventListener('click', () => {
        const code = document.getElementById('code-editor-textarea').value;
        updateIframe(code);
    });
    
    document.querySelectorAll('.device-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const device = e.target.dataset.device;
            const frame = document.getElementById('device-frame');
            frame.className = 'device-frame'; // reset
            frame.classList.add(`${device}-device`);
        });
    });
}

function setupResizer() {
    const resizer = document.getElementById('drag-handle');
    const leftSide = resizer.previousElementSibling;
    let x = 0;
    let leftWidth = 0;

    const mouseDownHandler = function(e) {
        x = e.clientX;
        leftWidth = leftSide.getBoundingClientRect().width;
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function(e) {
        const dx = e.clientX - x;
        const newWidth = leftWidth + dx;
        if (newWidth > 100 && newWidth < window.innerWidth * 0.8) {
             leftSide.style.width = `${newWidth}px`;
             leftSide.style.flex = "none";
        }
    };

    const mouseUpHandler = function() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    resizer.addEventListener('mousedown', mouseDownHandler);
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('question-input');
    const question = input.value.trim();
    if (!question || state.isGenerating) return;

    addMessage(question, 'user');
    input.value = '';
    input.style.height = '48px';

    state.isGenerating = true;
    document.getElementById('solve-button').disabled = true;
    const stopBtn = document.getElementById('stop-generating-container');
    stopBtn.style.display = 'block';

    // Check for local search
    const localData = await searchLocalDatabase(question);
    let prompt = question;
    if (localData) {
        prompt = `Context from website: ${localData}\n\nUser Question: ${question}`;
    }

    const aiMsgId = addMessage("Thinking...", 'ai', true);
    
    try {
        const response = await state.aiClient.models.generateContent({
            model: CONFIG.MODEL_NAME,
            contents: prompt,
            config: { systemInstruction: CONFIG.SYSTEM_INSTRUCTION }
        });
        
        const text = response.text;
        updateMessage(aiMsgId, text);
        saveToHistory(question, text);

    } catch (error) {
        console.error("GenAI Error:", error);
        updateMessage(aiMsgId, "Sorry, I encountered an error. Please check your internet connection.");
    } finally {
        state.isGenerating = false;
        document.getElementById('solve-button').disabled = false;
        stopBtn.style.display = 'none';
    }
}

async function searchLocalDatabase(query) {
    if (!window.GKApp || !window.GKApp.searchData || !window.GKApp.fuzzySearch) return null;
    
    // Mapping
    const lowerQ = query.toLowerCase();
    let targetKeyword = lowerQ;
    for (const [hindi, english] of Object.entries(KEYWORD_MAP)) {
        if (lowerQ.includes(hindi)) {
            targetKeyword = english;
            break;
        }
    }

    const results = window.GKApp.fuzzySearch(targetKeyword, window.GKApp.searchData);
    if (results && results.length > 0) {
        const topResult = results[0];
        return `Title: ${topResult.title}\nContent: ${topResult.paragraph}`;
    }
    return null;
}

function addMessage(text, sender, isTyping = false) {
    const chatLog = document.getElementById('chat-log');
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}-message`;
    const id = `msg-${Date.now()}`;
    msgDiv.id = id;
    
    const avatar = sender === 'user' 
        ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`
        : '🤖';

    let contentHtml = isTyping 
        ? `<div class="typing-dots"><span></span><span></span><span></span></div>` 
        : marked.parse(text);

    // Sanitize if not typing
    if(!isTyping) {
        contentHtml = DOMPurify.sanitize(contentHtml);
    }

    msgDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">${contentHtml}</div>
    `;
    
    chatLog.appendChild(msgDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
    
    if (!isTyping) {
        renderMathAndDiagrams(msgDiv);
    }
    return id;
}

function updateMessage(id, text) {
    const msgDiv = document.getElementById(id);
    if (msgDiv) {
        const contentDiv = msgDiv.querySelector('.message-content');
        contentDiv.innerHTML = DOMPurify.sanitize(marked.parse(text));
        renderMathAndDiagrams(msgDiv);
        
        // IMPORTANT: Check for code blocks and add "Merge" context
        // If response contains HTML/CSS/JS, enable merging logic
        const hasCode = text.includes('```');
        if (hasCode) {
            // We store the raw response text in a data attribute for the preview merger to access
            msgDiv.dataset.rawResponse = text; 
        }
    }
}

function renderMathAndDiagrams(container) {
    // Render Mermaid
    container.querySelectorAll('.mermaid').forEach(el => {
        try {
            mermaid.init(undefined, el);
        } catch (e) { console.error(e); }
    });
    
    // Render Math (KaTeX)
    // This is a simplistic replacement, better use a dedicated lib extension
    // For now, assuming $$...$$ blocks are handled by marked or need manual pass.
}

// --- LOGIC TO MERGE ALL CODE BLOCKS ---
function openMergedPreview(clickedBtn) {
    // 1. Find the message container that holds this button
    const messageDiv = clickedBtn.closest('.chat-message');
    if (!messageDiv) return;

    // 2. Get the raw Markdown/text response we stored earlier
    const rawText = messageDiv.dataset.rawResponse || "";
    if (!rawText) {
        // Fallback: Try to parse from DOM if raw text missing
        // But parsing back from highlighted HTML is hard. 
        // Let's assume rawText is always there if updateMessage logic worked.
        alert("Cannot merge: Original code data missing.");
        return;
    }

    // 3. Extract ALL code blocks from the raw text
    // Regex to capture language and content of ``` blocks
    const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```/g;
    let match;
    
    let html = "";
    let css = "";
    let js = "";

    while ((match = codeBlockRegex.exec(rawText)) !== null) {
        const lang = (match[1] || "").toLowerCase();
        const code = match[2];

        if (lang === 'html') {
            html += code + "\n";
        } else if (lang === 'css') {
            css += code + "\n";
        } else if (lang === 'js' || lang === 'javascript') {
            js += code + "\n";
        }
    }

    // 4. Combine them
    const combinedCode = `
<!DOCTYPE html>
<html>
<head>
<style>
${css}
</style>
</head>
<body>
${html}
<script>
${js}
<\/script>
</body>
</html>`;

    // 5. Open Editor
    const modal = document.getElementById('preview-modal');
    const textarea = document.getElementById('code-editor-textarea');
    
    // Fill editor with specific parts for clarity or just HTML if mixed
    // For "Preview", usually we just want to see the result, but showing code is good.
    // Let's populate the editor with the combined code so user can edit it all.
    textarea.value = combinedCode.trim();
    
    updateIframe(combinedCode);
    modal.classList.add('active');
}

function updateIframe(code) {
    const iframe = document.getElementById('preview-iframe');
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
}

function handleChatLogClick(e) {
    const target = e.target;
    
    // Copy Button
    if (target.classList.contains('code-copy-btn')) {
        const code = decodeURIComponent(target.dataset.code);
        navigator.clipboard.writeText(code).then(() => {
            const original = target.textContent;
            target.textContent = "Copied!";
            setTimeout(() => target.textContent = original, 2000);
        });
    }
    
    // Preview/Edit Button
    if (target.classList.contains('code-edit-btn')) {
        openMergedPreview(target);
    }
}

// --- HISTORY ---
function loadHistory() {
    try {
        const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
        state.chatHistory = stored ? JSON.parse(stored) : [];
    } catch (e) {
        state.chatHistory = [];
    }
    renderHistoryList();
}

function saveToHistory(question, answer) {
    if (!state.currentChat) {
        const newChat = {
            id: Date.now(),
            title: question.substring(0, 30) + "...",
            messages: []
        };
        state.chatHistory.unshift(newChat);
        state.currentChat = newChat;
    }
    
    state.currentChat.messages.push({ role: 'user', text: question });
    state.currentChat.messages.push({ role: 'ai', text: answer });
    
    // Limit history
    if (state.chatHistory.length > CONFIG.MAX_HISTORY_ITEMS) {
        state.chatHistory.pop();
    }
    
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state.chatHistory));
    renderHistoryList();
}

function renderHistoryList() {
    const list = document.getElementById('history-list');
    if (state.chatHistory.length === 0) {
        list.innerHTML = '<li class="empty-history">No history yet.</li>';
        return;
    }
    
    list.innerHTML = state.chatHistory.map(chat => `
        <li data-id="${chat.id}" class="${state.currentChat && state.currentChat.id === chat.id ? 'active' : ''}">
            <span class="history-item-text">${chat.title}</span>
            <button class="history-item-delete-btn">&times;</button>
        </li>
    `).join('');
    
    // Add Click Events
    list.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', (e) => {
            if (e.target.classList.contains('history-item-delete-btn')) {
                deleteChat(parseInt(li.dataset.id));
            } else {
                loadChat(parseInt(li.dataset.id));
            }
        });
    });
}

function loadChat(id) {
    const chat = state.chatHistory.find(c => c.id === id);
    if (!chat) return;
    
    state.currentChat = chat;
    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML = '';
    
    chat.messages.forEach(msg => {
        const id = addMessage(msg.text, msg.role);
        // Re-attach raw response data for history items too if they contain code
        if (msg.role === 'ai' && msg.text.includes('```')) {
            const div = document.getElementById(id);
            if(div) div.dataset.rawResponse = msg.text;
        }
    });
    
    renderHistoryList(); // Update active state
    document.getElementById('history-panel').classList.remove('active'); // Close menu on mobile
}

function startNewChat() {
    state.currentChat = null;
    document.getElementById('chat-log').innerHTML = `
        <div class="chat-message ai-message">
            <div class="message-avatar">🤖</div>
            <div class="message-content"><p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?</p></div>
        </div>`;
    renderHistoryList();
}

function deleteChat(id) {
    state.chatHistory = state.chatHistory.filter(c => c.id !== id);
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state.chatHistory));
    if (state.currentChat && state.currentChat.id === id) {
        startNewChat();
    } else {
        renderHistoryList();
    }
}

function clearHistory() {
    if (confirm("Delete all history?")) {
        state.chatHistory = [];
        localStorage.removeItem(CONFIG.STORAGE_KEY);
        startNewChat();
    }
}
