import { GoogleGenAI } from "https://esm.run/@google/genai";
import { marked } from "https://esm.run/marked@12.0.2";
import DOMPurify from "https://esm.run/dompurify@3.0.8";

// --- Global Configuration ---
const API_KEY = "AIzaSyADifk5i87QT2q5EaChypYmfu4NalKcUiU"; 
const LOCAL_STORAGE_KEY = 'aiChatHistory';

let aiClient = null;
let chatHistory = [];
let currentChatId = null;
let isGenerating = false;
let abortController = null;

// --- 1. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initWidget();
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initWidget();
}

function initWidget() {
    if (document.getElementById('ai-chat-widget')) return;

    injectWidgetHTML();

    try {
        aiClient = new GoogleGenAI({ apiKey: API_KEY });
    } catch (error) {
        console.error("AI Init Failed:", error);
    }

    loadHistoryFromStorage();
    
    // Note: We do NOT open a chat here immediately.
    // We wait for the user to interact.
    
    attachGlobalEventListeners();
}

// --- 2. HTML Injection ---
function injectWidgetHTML() {
    const widgetHTML = `
    <button id="ai-widget-toggle-btn" aria-label="Ask AI">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 13.5C20 13.09 19.67 12.75 19.25 12.75C18.83 12.75 18.5 13.09 18.5 13.5V14.5C18.5 17.26 16.26 19.5 13.5 19.5C13.09 19.5 12.75 19.83 12.75 20.25C12.75 20.67 13.09 21 13.5 21C17.09 21 20 18.09 20 14.5V13.5M10.5 3C7.91 3 5.5 5.41 5.5 8V9C5.5 9.41 5.17 9.75 4.75 9.75C4.33 9.75 4 9.41 4 9V8C4 4.91 6.91 2 10.5 2C14.09 2 17 4.91 17 8V9C17 9.41 16.67 9.75 16.25 9.75C15.83 9.75 15.5 9.41 15.5 9V8C15.5 5.41 13.09 3 10.5 3M10.5 13.5C10.5 13.09 10.17 12.75 9.75 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H9.75C10.17 11.25 10.5 10.91 10.5 10.5C10.5 10.09 10.17 9.75 9.75 9.75H8C6.75 9.75 5.75 10.75 5.75 12C5.75 13.25 6.75 14.25 8 14.25H9.75C10.17 14.25 10.5 13.91 10.5 13.5M16 12.75H14.25C13.83 12.75 13.5 13.09 13.5 13.5C13.5 13.91 13.83 14.25 14.25 14.25H16C17.25 14.25 18.25 13.25 18.25 12C18.25 10.75 17.25 9.75 16 9.75H14.25C13.83 9.75 13.5 10.09 13.5 10.5C13.5 10.91 13.83 11.25 14.25 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"></path></svg>
    </button>

    <div id="ai-chat-widget">
        <div class="ai-container">
            <aside id="history-panel">
                <div class="history-header">
                    <h2>History</h2>
                    <div class="history-header-actions">
                        <button id="clear-history-btn">Clear All</button>
                        <button id="close-history-btn">&times;</button>
                    </div>
                </div>
                <ul id="history-list"><li class="empty-history">No history.</li></ul>
            </aside>

            <section id="chat-area">
                <header class="chat-header">
                     <div class="chat-header-left">
                        <button id="menu-toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg></button>
                        <h1>GK AI Solver</h1>
                    </div>
                    <div class="chat-header-right">
                        <button id="new-chat-btn">New Chat</button>
                        <button id="full-view-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17H7V14H5V19H10V17Z"></path></svg></button>
                        <button id="close-widget-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg></button>
                    </div>
                </header>
                
                <div id="chat-log" role="log"></div>

                <div class="chat-input-area">
                    <div id="stop-generating-container" style="display:none;"><button id="stop-generating-btn">Stop Generating</button></div>
                    <form id="ai-solver-form">
                        <textarea id="question-input" rows="1" placeholder="Ask anything..." required></textarea>
                        <button type="submit" id="solve-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path></svg></button>
                    </form>
                </div>
            </section>
        </div>
    </div>
    
    <div id="preview-modal">
        <div class="preview-content">
            <div class="preview-header"><h3>Preview</h3><button id="close-preview-btn">&times;</button></div>
            <iframe id="preview-iframe"></iframe>
        </div>
    </div>
    `;
    const d = document.createElement('div');
    d.innerHTML = widgetHTML;
    document.body.appendChild(d);
    
    if (!document.querySelector('link[href*="chat-widget.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/chat-widget.css';
        document.head.appendChild(link);
    }
}

// --- 3. Event Listeners ---
function attachGlobalEventListeners() {
    const widget = document.getElementById('ai-chat-widget');
    const toggleBtn = document.getElementById('ai-widget-toggle-btn');

    document.addEventListener('click', (e) => {
        const target = e.target;

        // Toggle Open - FIX: Always Start New Chat on Open
        if (target.closest('#ai-widget-toggle-btn')) {
            widget.classList.add('active');
            toggleBtn.style.display = 'none';
            startNewChat(); 
        }

        // Toggle Close
        if (target.closest('#close-widget-btn')) {
            widget.classList.remove('active');
            toggleBtn.style.display = 'flex';
        }

        // New Chat
        if (target.closest('#new-chat-btn')) startNewChat();
        
        // Stop Generation
        if (target.closest('#stop-generating-btn')) stopGeneration();

        // History Panel
        if (target.closest('#menu-toggle')) document.getElementById('history-panel').classList.toggle('active');
        if (target.closest('#close-history-btn')) document.getElementById('history-panel').classList.remove('active');
        
        // Clear History
        if (target.closest('#clear-history-btn')) {
            if(confirm("Clear all history?")) { chatHistory = []; saveHistoryToStorage(); startNewChat(); }
        }
        
        // Full View
        if (target.closest('#full-view-btn')) widget.classList.toggle('full-view');

        // Message Actions
        if (target.closest('.msg-edit-btn')) {
            const msgDiv = target.closest('.chat-message');
            // Grab the original raw text which we store in a data attribute or find in array
            // For simplicity in this specific implementation, we can grab the text content
            // BUT for safety, let's find the index and get it from state.
            const allMsgs = Array.from(document.getElementById('chat-log').children);
            const idx = allMsgs.indexOf(msgDiv);
            if (idx !== -1) {
                 // Adjust index because chat-log might have a welcome message not in array?
                 // renderChatView ensures sync. If empty, welcome msg is there.
                 // If chat is active, renderChatView clears log and adds messages.
                 // So index in DOM corresponds to index in chat.messages
                 editMessage(idx);
            }
        }
        
        if (target.closest('.msg-regen-btn')) {
            regenerateResponse();
        }

        // History Click
        const historyItem = target.closest('#history-list li');
        if (historyItem && !target.closest('.history-item-delete-btn')) {
            openChat(historyItem.dataset.id);
            document.getElementById('history-panel').classList.remove('active');
        }
        
        // History Delete
        if (target.closest('.history-item-delete-btn')) {
            e.stopPropagation();
            deleteChat(target.closest('li').dataset.id);
        }
        
        // Close Preview
        if (target.closest('#close-preview-btn')) document.getElementById('preview-modal').classList.remove('active');
    });

    // Form Submit
    const form = document.getElementById('ai-solver-form');
    const input = document.getElementById('question-input');

    input.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.dispatchEvent(new Event('submit')); }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if(text && !isGenerating) {
            input.value = '';
            processUserMessage(text);
        }
    });
}

// --- 4. Logic ---

function startNewChat() {
    currentChatId = Date.now().toString();
    const newChat = { id: currentChatId, title: "New Conversation", messages: [] };
    chatHistory.unshift(newChat);
    saveHistoryToStorage();
    renderChatView(newChat);
    renderHistoryList();
}

function openChat(id) {
    currentChatId = id;
    const chat = chatHistory.find(c => c.id === id);
    if(chat) renderChatView(chat);
}

function deleteChat(id) {
    chatHistory = chatHistory.filter(c => c.id !== id);
    saveHistoryToStorage();
    if(currentChatId === id) startNewChat();
    else renderHistoryList();
}

async function processUserMessage(text) {
    const chat = getOrCreateCurrentChat();
    
    // Optimistically add user message
    chat.messages.push({ role: 'user', content: text });
    
    // Update title if first message
    if (chat.messages.length === 1) chat.title = text.substring(0, 30);
    
    saveHistoryToStorage();
    renderChatView(chat); // Re-render to show user message

    await generateAIResponse(text);
}

async function generateAIResponse(prompt) {
    if (!aiClient) return;
    isGenerating = true;
    updateUIState();
    
    abortController = new AbortController();
    const signal = abortController.signal;

    const responseId = 'ai-' + Date.now();
    addLoadingIndicator(responseId);

    // FIX: Always prepare local links
    let linksHTML = "";
    if (window.GKApp && window.GKApp.fuzzySearch && window.GKApp.searchData) {
        const results = window.GKApp.fuzzySearch(prompt, window.GKApp.searchData);
        if (results && results.length > 0) {
            linksHTML = `<div class="related-links-section">
                <strong>Related Website Links:</strong>
                <ul>
                    ${results.slice(0, 3).map(r => `<li><a href="${r.url}" target="_blank">${r.title}</a></li>`).join('')}
                </ul>
            </div>`;
        }
    }

    try {
        const result = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        if (signal.aborted) throw new Error("Cancelled");

        const aiText = result.text;
        
        // FIX: Append links to Online Response
        const finalContent = aiText + linksHTML;

        // Update Data
        const chat = getOrCreateCurrentChat();
        chat.messages.push({ role: 'model', content: finalContent });
        saveHistoryToStorage();
        
        // Update UI
        removeLoadingIndicator(responseId);
        renderChatView(chat); // Re-render to show formatted AI response

    } catch (error) {
        removeLoadingIndicator(responseId);
        if (error.message === "Cancelled") {
             // Do nothing or show cancelled state
        } else {
            console.error(error);
            // Fallback or Error message
            const errorContent = `Unable to connect to AI. ` + (linksHTML ? linksHTML : "Please check your internet connection.");
            const chat = getOrCreateCurrentChat();
            chat.messages.push({ role: 'model', content: errorContent });
            saveHistoryToStorage();
            renderChatView(chat);
        }
    } finally {
        isGenerating = false;
        abortController = null;
        updateUIState();
    }
}

function stopGeneration() {
    if (abortController) {
        abortController.abort();
        abortController = null;
    }
    isGenerating = false;
    updateUIState();
    // Remove the loading indicator
    const loading = document.querySelector('.typing-indicator');
    if(loading) loading.remove();
}

// FIX: Edit Message Logic
function editMessage(index) {
    const chat = getOrCreateCurrentChat();
    if (!chat.messages[index]) return;

    const msgToEdit = chat.messages[index];
    
    // Only allow editing user messages
    if (msgToEdit.role === 'user') {
        // Populate input
        document.getElementById('question-input').value = msgToEdit.content;
        
        // Remove this message and everything AFTER it
        // This preserves the history BEFORE this message
        chat.messages = chat.messages.slice(0, index);
        
        saveHistoryToStorage();
        renderChatView(chat);
    }
}

function regenerateResponse() {
    const chat = getOrCreateCurrentChat();
    const lastMsgIndex = chat.messages.length - 1;
    
    if (lastMsgIndex >= 0) {
        const lastMsg = chat.messages[lastMsgIndex];
        
        // If last message is AI, remove it and re-trigger generation for the user message before it
        if (lastMsg.role === 'model') {
            chat.messages.pop(); // Remove AI msg
            const prevUserMsg = chat.messages[chat.messages.length - 1];
            
            saveHistoryToStorage();
            renderChatView(chat);
            
            if (prevUserMsg && prevUserMsg.role === 'user') {
                generateAIResponse(prevUserMsg.content);
            }
        }
    }
}

// --- UI Helpers ---

function renderChatView(chat) {
    const log = document.getElementById('chat-log');
    log.innerHTML = '';
    
    if (!chat || chat.messages.length === 0) {
        log.innerHTML = `<div class="chat-message ai-message"><div class="message-avatar">🤖</div><div class="message-content"><p>नमस्ते! मैं GK AI हूँ। पूछिए!</p></div></div>`;
    } else {
        chat.messages.forEach(m => appendMessageToUI(m.role, m.content));
    }
    scrollToBottom();
}

function appendMessageToUI(role, content) {
    const log = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.className = `chat-message ${role === 'user' ? 'user-message' : 'ai-message'}`;
    
    let innerHTML = '';
    if (role === 'user') {
        innerHTML = `<div class="text-content">${escapeHTML(content)}</div>
                     <div class="msg-actions"><button class="msg-edit-btn" title="Edit">✏️</button></div>`;
    } else {
        // Separate links for markdown parsing
        const splitParts = content.split('<div class="related-links-section">');
        let mainBody = splitParts[0];
        let linksPart = splitParts.length > 1 ? '<div class="related-links-section">' + splitParts[1] : '';
        
        const parsedBody = DOMPurify.sanitize(marked.parse(mainBody));
        
        innerHTML = `<div class="text-content">${parsedBody} ${linksPart}</div>
                     <div class="msg-actions"><button class="msg-regen-btn" title="Regenerate">↻</button></div>`;
    }

    const avatar = `<div class="message-avatar">${role==='user'?'You':'🤖'}</div>`;
    div.innerHTML = role === 'user' ? `<div class="message-content">${innerHTML}</div>${avatar}` : `${avatar}<div class="message-content">${innerHTML}</div>`;
    
    log.appendChild(div);
}

function addLoadingIndicator(id) {
    const log = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.id = id;
    div.className = 'chat-message ai-message typing-indicator';
    div.innerHTML = `<div class="message-avatar">🤖</div><div class="message-content">...</div>`;
    log.appendChild(div);
    scrollToBottom();
}

function removeLoadingIndicator(id) {
    const el = document.getElementById(id);
    if(el) el.remove();
}

function replaceLoadingWithContent(id, content) {
    removeLoadingIndicator(id);
    // We use renderChatView usually, but this is for direct replacement if needed
    // In current logic, we re-render whole chat in generateAIResponse finally block/success
}

function renderHistoryList() {
    const list = document.getElementById('history-list');
    if(!list) return;
    list.innerHTML = chatHistory.map(c => 
        `<li data-id="${c.id}" class="${c.id === currentChatId ? 'active':''}"><span class="history-item-text">${escapeHTML(c.title)}</span><button class="history-item-delete-btn">&times;</button></li>`
    ).join('') || '<li class="empty-history">No history.</li>';
}

function getOrCreateCurrentChat() {
    let chat = chatHistory.find(c => c.id === currentChatId);
    if (!chat) { 
        currentChatId = Date.now().toString();
        chat = { id: currentChatId, title: "New Chat", messages:[] };
        chatHistory.unshift(chat);
    }
    return chat;
}

function saveHistoryToStorage() { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chatHistory)); renderHistoryList(); }
function loadHistoryFromStorage() { try { chatHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []; } catch(e){ chatHistory=[]; } }
function updateUIState() {
    document.getElementById('solve-button').disabled = isGenerating;
    document.getElementById('stop-generating-container').style.display = isGenerating ? 'block' : 'none';
}
function scrollToBottom() { const log = document.getElementById('chat-log'); if(log) log.scrollTop = log.scrollHeight; }
function escapeHTML(str) { return str.replace(/[&<>'"]/g, t => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'}[t])); }
