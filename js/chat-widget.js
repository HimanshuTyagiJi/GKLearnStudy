
import { GoogleGenAI } from "https://esm.run/@google/genai";
import { marked } from "https://esm.run/marked@12.0.2";
import DOMPurify from "https://esm.run/dompurify@3.0.8";

// --- Global Configuration & State ---
const API_KEY = "AIzaSyADifk5i87QT2q5EaChypYmfu4NalKcUiU"; // Hardcoded Key
const LOCAL_STORAGE_KEY = 'aiChatHistory';

let aiClient = null;
let chatHistory = [];
let currentChatId = null;
let isGenerating = false;
let abortController = null; // For cancelling requests

// --- 1. Initialization Logic ---
document.addEventListener('DOMContentLoaded', () => {
    initWidget();
});

// Also run if DOM is already ready (handle async script loading issues)
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initWidget();
}

function initWidget() {
    // Prevent double initialization
    if (document.getElementById('ai-chat-widget')) return;

    console.log("Initializing AI Chat Widget...");

    // 1. Inject HTML & CSS
    injectWidgetHTML();

    // 2. Initialize AI Client
    try {
        aiClient = new GoogleGenAI({ apiKey: API_KEY });
    } catch (error) {
        console.error("AI Client Init Failed:", error);
    }

    // 3. Load Data
    loadHistoryFromStorage();

    // 4. Setup UI State (Restore last chat or show new)
    if (chatHistory.length > 0) {
        // Restore the most recent chat by default
        openChat(chatHistory[0].id);
    } else {
        startNewChat(false); // false = don't clear view yet, just setup state
    }

    // 5. Attach Listeners
    attachGlobalEventListeners();
}

// --- 2. HTML Injection ---
function injectWidgetHTML() {
    const widgetHTML = `
    <!-- Floating Toggle Button -->
    <button id="ai-widget-toggle-btn" aria-label="Toggle AI Chat">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 13.5C20 13.09 19.67 12.75 19.25 12.75C18.83 12.75 18.5 13.09 18.5 13.5V14.5C18.5 17.26 16.26 19.5 13.5 19.5C13.09 19.5 12.75 19.83 12.75 20.25C12.75 20.67 13.09 21 13.5 21C17.09 21 20 18.09 20 14.5V13.5M10.5 3C7.91 3 5.5 5.41 5.5 8V9C5.5 9.41 5.17 9.75 4.75 9.75C4.33 9.75 4 9.41 4 9V8C4 4.91 6.91 2 10.5 2C14.09 2 17 4.91 17 8V9C17 9.41 16.67 9.75 16.25 9.75C15.83 9.75 15.5 9.41 15.5 9V8C15.5 5.41 13.09 3 10.5 3M10.5 13.5C10.5 13.09 10.17 12.75 9.75 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H9.75C10.17 11.25 10.5 10.91 10.5 10.5C10.5 10.09 10.17 9.75 9.75 9.75H8C6.75 9.75 5.75 10.75 5.75 12C5.75 13.25 6.75 14.25 8 14.25H9.75C10.17 14.25 10.5 13.91 10.5 13.5M16 12.75H14.25C13.83 12.75 13.5 13.09 13.5 13.5C13.5 13.91 13.83 14.25 14.25 14.25H16C17.25 14.25 18.25 13.25 18.25 12C18.25 10.75 17.25 9.75 16 9.75H14.25C13.83 9.75 13.5 10.09 13.5 10.5C13.5 10.91 13.83 11.25 14.25 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"></path>
        </svg>
    </button>

    <!-- Chat Widget Container -->
    <div id="ai-chat-widget">
        <div class="ai-container">
            <!-- Sidebar: History -->
            <aside id="history-panel">
                <div class="history-header">
                    <h2>History</h2>
                    <div class="history-header-actions">
                        <button id="clear-history-btn" title="Clear All">Clear</button>
                        <button id="close-history-btn" aria-label="Close History">&times;</button>
                    </div>
                </div>
                <ul id="history-list">
                    <li class="empty-history">No history yet.</li>
                </ul>
            </aside>

            <!-- Main Chat Area -->
            <section id="chat-area">
                <header class="chat-header">
                     <div class="chat-header-left">
                        <button id="menu-toggle" aria-label="Toggle History Menu">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
                        </button>
                        <h1>AI Solver</h1>
                    </div>
                    <div class="chat-header-right">
                        <button id="new-chat-btn" title="Start New Chat">New Chat</button>
                        <button id="full-view-btn" aria-label="Toggle Full View" title="Expand/Collapse">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17H7V14H5V19H10V17Z"></path></svg>
                        </button>
                        <button id="close-widget-btn" aria-label="Close Chat" title="Close">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                        </button>
                    </div>
                </header>
                
                <!-- Chat Messages Log -->
                <div id="chat-log" role="log" aria-live="polite">
                    <!-- Messages will be injected here -->
                </div>

                <!-- Input Area -->
                <div class="chat-input-area">
                    <div id="stop-generating-container" style="display:none;">
                        <button id="stop-generating-btn">Stop Generating ■</button>
                    </div>
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

    <!-- Preview Modal (High Z-Index) -->
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
    container.innerHTML = widgetHTML;
    document.body.appendChild(container);

    // Inject CSS dynamically
    if (!document.querySelector('link[href*="chat-widget.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/chat-widget.css';
        document.head.appendChild(link);
    }
}

// --- 3. Core Logic & Event Listeners ---

function attachGlobalEventListeners() {
    // 1. Toggle Widget Visibility
    const widget = document.getElementById('ai-chat-widget');
    const toggleBtn = document.getElementById('ai-widget-toggle-btn');

    document.addEventListener('click', (e) => {
        const target = e.target;

        // Open Widget
        if (target.closest('#ai-widget-toggle-btn')) {
            widget.classList.add('active');
            toggleBtn.style.display = 'none';
            scrollToBottom();
        }

        // Close Widget
        if (target.closest('#close-widget-btn')) {
            widget.classList.remove('active');
            toggleBtn.style.display = 'flex';
        }

        // Full Screen
        if (target.closest('#full-view-btn')) {
            widget.classList.toggle('full-view');
        }

        // Stop Generation
        if (target.closest('#stop-generating-btn')) {
            stopGeneration();
        }

        // Menu Toggle
        if (target.closest('#menu-toggle')) {
            document.getElementById('history-panel').classList.toggle('active');
        }
        if (target.closest('#close-history-btn')) {
            document.getElementById('history-panel').classList.remove('active');
        }

        // New Chat
        if (target.closest('#new-chat-btn')) {
            startNewChat();
        }

        // Clear History
        if (target.closest('#clear-history-btn')) {
            if (confirm("Are you sure you want to delete all chat history?")) {
                chatHistory = [];
                saveHistoryToStorage();
                startNewChat();
            }
        }

        // --- Chat Item Actions ---
        
        // Edit Message
        if (target.closest('.msg-edit-btn')) {
            const msgDiv = target.closest('.chat-message');
            const text = msgDiv.querySelector('.text-content').innerText;
            editMessage(msgDiv, text);
        }

        // Regenerate
        if (target.closest('.msg-regen-btn')) {
            const msgDiv = target.closest('.chat-message');
            regenerateResponse(msgDiv);
        }

        // Copy Code
        if (target.matches('button[data-action="copy"]')) {
            const code = target.closest('.code-wrapper').querySelector('code').innerText;
            navigator.clipboard.writeText(code);
            const originalText = target.innerText;
            target.innerText = "Copied!";
            setTimeout(() => target.innerText = originalText, 2000);
        }

        // Preview Code
        if (target.matches('button[data-action="preview"]')) {
            const code = target.closest('.code-wrapper').querySelector('code').innerText;
            openPreview(code);
        }

        // Close Preview
        if (target.closest('#close-preview-btn') || target.id === 'preview-modal') {
            document.getElementById('preview-modal').classList.remove('active');
        }

        // History Item Click
        const historyItem = target.closest('#history-list li');
        if (historyItem && !target.closest('.history-item-delete-btn')) {
            const chatId = historyItem.dataset.id;
            openChat(chatId);
            document.getElementById('history-panel').classList.remove('active');
        }

        // Delete History Item
        if (target.closest('.history-item-delete-btn')) {
            e.stopPropagation();
            const li = target.closest('li');
            deleteChat(li.dataset.id);
        }
    });

    // Input Handling
    const input = document.getElementById('question-input');
    const form = document.getElementById('ai-solver-form');

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

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text || isGenerating) return;
        
        input.value = '';
        input.style.height = 'auto';
        processUserMessage(text);
    });
}

// --- 4. Chat Operations ---

function startNewChat(clearView = true) {
    currentChatId = Date.now().toString();
    const newChat = {
        id: currentChatId,
        title: "New Conversation",
        messages: []
    };
    chatHistory.unshift(newChat);
    saveHistoryToStorage();
    
    if (clearView) {
        renderChatView(newChat);
        renderHistoryList();
        document.getElementById('question-input').focus();
    }
    
    // Hide sidebar on mobile when starting new
    if (window.innerWidth < 768) {
        document.getElementById('history-panel').classList.remove('active');
    }
}

function openChat(chatId) {
    currentChatId = chatId;
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
        renderChatView(chat);
        renderHistoryList(); // To update active state
    } else {
        startNewChat();
    }
}

function deleteChat(chatId) {
    if (!confirm("Delete this chat?")) return;
    
    chatHistory = chatHistory.filter(c => c.id !== chatId);
    saveHistoryToStorage();
    
    if (currentChatId === chatId) {
        if (chatHistory.length > 0) {
            openChat(chatHistory[0].id);
        } else {
            startNewChat();
        }
    } else {
        renderHistoryList();
    }
}

// --- 5. Messaging Logic ---

async function processUserMessage(text) {
    // 1. Update UI
    addMessageToUI('user', text);
    
    // 2. Update Data
    const chat = getOrCreateCurrentChat();
    chat.messages.push({ role: 'user', content: text });
    
    // Update Title if first message
    if (chat.messages.length === 1) {
        chat.title = text.substring(0, 30) + (text.length > 30 ? '...' : '');
    }
    saveHistoryToStorage();

    // 3. Call AI
    await generateAIResponse(text);
}

async function generateAIResponse(prompt) {
    if (!aiClient) return;

    isGenerating = true;
    updateUIState();
    
    // Create Placeholder for AI response
    const responseId = 'ai-response-' + Date.now();
    addLoadingIndicator(responseId);

    try {
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });

        const text = response.text;
        
        // Replace loading with actual content
        replaceLoadingWithContent(responseId, text);
        
        // Save to history
        const chat = getOrCreateCurrentChat();
        chat.messages.push({ role: 'model', content: text });
        saveHistoryToStorage();

    } catch (error) {
        console.error("Generation Error:", error);
        replaceLoadingWithContent(responseId, "Sorry, I encountered an error or the connection was lost. Please try again.");
        
        // Try Local Search Fallback
        if (window.GKApp && window.GKApp.fuzzySearch && window.GKApp.searchData) {
             const results = window.GKApp.fuzzySearch(prompt, window.GKApp.searchData);
             if(results.length > 0) {
                 const chat = getOrCreateCurrentChat();
                 const fallbackText = `<strong>Network unavailable. Found locally:</strong><br><a href="${results[0].url}">${results[0].title}</a>`;
                 chat.messages.push({ role: 'model', content: fallbackText, isRaw: true });
                 // Update UI to show this instead
                 const msgDiv = document.getElementById(responseId);
                 if(msgDiv) msgDiv.querySelector('.message-content').innerHTML = fallbackText;
                 saveHistoryToStorage();
             }
        }
    } finally {
        isGenerating = false;
        updateUIState();
    }
}

function stopGeneration() {
    // Since simple REST calls can't easily be aborted without AbortController support in the SDK wrapper,
    // we mainly handle the UI side here to allow the user to regain control.
    isGenerating = false;
    updateUIState();
    const loading = document.querySelector('.typing-indicator');
    if (loading) {
        loading.innerHTML = '<div class="message-content">Stopped.</div>';
        loading.classList.remove('typing-indicator');
    }
}

function editMessage(msgElement, oldText) {
    // 1. Find message index
    const chat = getOrCreateCurrentChat();
    // We need to map DOM index to array index. 
    // The chat log contains a welcome message sometimes, so we filter by class.
    const allMsgs = Array.from(document.querySelectorAll('.chat-message'));
    const domIndex = allMsgs.indexOf(msgElement);
    
    // Adjust for welcome message if present (welcome message usually doesn't have edit buttons, so logic holds)
    // Note: Our renderChatView clears log and re-renders from array.
    // So domIndex should match array index IF array is in sync.
    
    // Better approach: Check text content match
    let msgIndex = -1;
    for(let i=0; i<chat.messages.length; i++) {
        if (chat.messages[i].role === 'user' && chat.messages[i].content === oldText) {
             // We found a match, but what if duplicates? We assume the user clicks the relevant one.
             // Ideally we store ID on the DOM element.
             // Let's trust the user wants to edit *this* context.
             // Simple truncation: remove this and everything after.
             msgIndex = i;
             break;
        }
    }

    if (msgIndex !== -1) {
        // 2. Populate Input
        document.getElementById('question-input').value = oldText;
        
        // 3. Truncate History
        chat.messages = chat.messages.slice(0, msgIndex);
        saveHistoryToStorage();
        
        // 4. Re-render
        renderChatView(chat);
    }
}

function regenerateResponse(aiMsgElement) {
    const chat = getOrCreateCurrentChat();
    // The AI message is the last one usually.
    // We remove the last message (AI) and re-submit the one before it (User).
    
    const lastMsg = chat.messages[chat.messages.length - 1];
    const prevMsg = chat.messages[chat.messages.length - 2];
    
    if (lastMsg && lastMsg.role === 'model' && prevMsg && prevMsg.role === 'user') {
        chat.messages.pop(); // Remove AI response
        saveHistoryToStorage();
        renderChatView(chat); // Update UI
        
        // Re-trigger generation
        generateAIResponse(prevMsg.content);
    }
}

// --- 6. UI Rendering ---

function renderChatView(chat) {
    const log = document.getElementById('chat-log');
    log.innerHTML = '';
    
    // Default Welcome Message if empty
    if (chat.messages.length === 0) {
        log.innerHTML = `
        <div class="chat-message ai-message">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>नमस्ते! मैं AI Solver हूँ। आप मुझसे पढ़ाई, विज्ञान, गणित या इतिहास से जुड़ा कोई भी सवाल पूछ सकते हैं।</p>
            </div>
        </div>`;
        return;
    }

    chat.messages.forEach(msg => {
        addMessageToUI(msg.role, msg.content, msg.isRaw);
    });
    scrollToBottom();
}

function addMessageToUI(role, content, isRaw = false) {
    const log = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.className = `chat-message ${role === 'user' ? 'user-message' : 'ai-message'}`;
    
    let innerHTML = '';
    if (role === 'user') {
        innerHTML = `<div class="text-content">${escapeHTML(content)}</div>
                     <div class="msg-actions"><button class="msg-edit-btn" title="Edit">✏️</button></div>`;
    } else {
        const parsedContent = isRaw ? content : renderMarkdown(content);
        innerHTML = `<div class="text-content">${parsedContent}</div>
                     <div class="msg-actions"><button class="msg-regen-btn" title="Regenerate">↻</button></div>`;
    }

    const avatar = `<div class="message-avatar" style="background-color:${role==='user'?'var(--primary-color)':'#10a37f'}">${role==='user'?'You':'🤖'}</div>`;
    const body = `<div class="message-content">${innerHTML}</div>`;
    
    div.innerHTML = role === 'user' ? body + avatar : avatar + body;
    log.appendChild(div);
    scrollToBottom();
}

function addLoadingIndicator(id) {
    const log = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.className = 'chat-message ai-message typing-indicator';
    div.id = id;
    div.innerHTML = `
        <div class="message-avatar" style="background-color:#10a37f">🤖</div>
        <div class="message-content">
            <div class="typing-dots"><span>.</span><span>.</span><span>.</span></div>
        </div>`;
    log.appendChild(div);
    scrollToBottom();
}

function replaceLoadingWithContent(id, text) {
    const el = document.getElementById(id);
    if (!el) return;
    
    el.classList.remove('typing-indicator');
    const contentDiv = el.querySelector('.message-content');
    contentDiv.innerHTML = `<div class="text-content">${renderMarkdown(text)}</div>
                            <div class="msg-actions"><button class="msg-regen-btn" title="Regenerate">↻</button></div>`;
    scrollToBottom();
}

function renderHistoryList() {
    const list = document.getElementById('history-list');
    if (!list) return;
    
    if (chatHistory.length === 0) {
        list.innerHTML = '<li class="empty-history">No history yet.</li>';
        return;
    }

    list.innerHTML = chatHistory.map(chat => `
        <li data-id="${chat.id}" class="${chat.id === currentChatId ? 'active' : ''}">
            <span class="history-item-text">${escapeHTML(chat.title || 'New Chat')}</span>
            <button class="history-item-delete-btn" title="Delete">&times;</button>
        </li>
    `).join('');
}

function updateUIState() {
    const stopBtn = document.getElementById('stop-generating-container');
    const input = document.getElementById('question-input');
    const sendBtn = document.getElementById('solve-button');
    
    if (isGenerating) {
        stopBtn.style.display = 'flex';
        input.disabled = true;
        sendBtn.disabled = true;
        sendBtn.style.opacity = '0.5';
    } else {
        stopBtn.style.display = 'none';
        input.disabled = false;
        sendBtn.disabled = false;
        sendBtn.style.opacity = '1';
        input.focus();
    }
}

// --- 7. Utilities ---

function getOrCreateCurrentChat() {
    let chat = chatHistory.find(c => c.id === currentChatId);
    if (!chat) {
        startNewChat(false); // Create data but don't reset UI blindly
        chat = chatHistory[0];
    }
    return chat;
}

function saveHistoryToStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chatHistory));
    renderHistoryList();
}

function loadHistoryFromStorage() {
    try {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (data) chatHistory = JSON.parse(data);
    } catch (e) {
        console.error("History Load Error", e);
        chatHistory = [];
    }
}

function scrollToBottom() {
    const log = document.getElementById('chat-log');
    if(log) log.scrollTop = log.scrollHeight;
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag]));
}

function renderMarkdown(text) {
    // Custom handling for code blocks to add Copy/Preview buttons
    const renderer = new marked.Renderer();
    renderer.code = (code, language) => {
        return `
        <div class="code-wrapper">
            <div class="code-header">
                <span>${language || 'code'}</span>
                <div class="code-toolbar">
                    <button data-action="copy">Copy</button>
                    <button data-action="preview">Preview</button>
                </div>
            </div>
            <pre><code>${code}</code></pre>
        </div>`;
    };
    return DOMPurify.sanitize(marked.parse(text, { renderer: renderer }));
}

function openPreview(code) {
    const modal = document.getElementById('preview-modal');
    const iframe = document.getElementById('preview-iframe');
    iframe.srcdoc = code;
    modal.classList.add('active');
}
