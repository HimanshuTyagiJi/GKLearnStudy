
import { GoogleGenAI } from "https://esm.run/@google/genai";
import { marked } from "https://esm.run/marked@12.0.2";
import DOMPurify from "https://esm.run/dompurify@3.0.8";

/**
 * AI Chat Widget - Comprehensive Logic
 * 
 * Features:
 * 1. Google GenAI Integration (Gemini 2.5 Flash).
 * 2. Local Content Grounding (Website Links in Responses).
 * 3. Persistent History (LocalStorage).
 * 4. Context-Aware Editing (Preserves previous history).
 * 5. Robust UI State Management.
 */

// --- 1. Global Configurations & State Management ---

const API_KEY = "AIzaSyADifk5i87QT2q5EaChypYmfu4NalKcUiU"; // API Key
const LOCAL_STORAGE_KEY = 'aiChatHistory';
const MODEL_NAME = 'gemini-2.5-flash';

// State Variables
let aiClient = null;
let chatHistory = [];
let currentChatId = null;
let isGenerating = false;
let abortController = null; // To manage cancellation if supported, or UI state cancellation

// --- 2. Initialization Sequence ---

/**
 * Entry point for the widget.
 * Checks for DOM readiness and prevents double initialization.
 */
document.addEventListener('DOMContentLoaded', () => {
    initWidget();
});

// Fallback check for async loading
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initWidget();
}

function initWidget() {
    // Prevent multiple injections
    if (document.getElementById('ai-chat-widget')) {
        console.log("AI Widget already initialized.");
        return;
    }

    console.log("Initializing AI Chat Widget...");

    // Step 1: Inject HTML Structure and CSS
    injectWidgetHTML();
    injectWidgetCSS();

    // Step 2: Initialize AI Client
    try {
        aiClient = new GoogleGenAI({ apiKey: API_KEY });
    } catch (error) {
        console.error("Failed to initialize Google GenAI Client:", error);
        // We continue initialization so the UI still works (offline mode)
    }

    // Step 3: Load History
    loadHistoryFromStorage();

    // Step 4: Prepare State (Start fresh on load)
    // Requirement: "Page refresh ... har baar new chat me open hona chaiye"
    startNewChat(false); // Initialize state but don't force UI open

    // Step 5: Attach Event Listeners
    attachGlobalEventListeners();
}

// --- 3. DOM Injection (HTML & CSS) ---

function injectWidgetHTML() {
    const widgetHTML = `
    <!-- Floating Toggle Button -->
    <button id="ai-widget-toggle-btn" aria-label="Ask AI">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 13.5C20 13.09 19.67 12.75 19.25 12.75C18.83 12.75 18.5 13.09 18.5 13.5V14.5C18.5 17.26 16.26 19.5 13.5 19.5C13.09 19.5 12.75 19.83 12.75 20.25C12.75 20.67 13.09 21 13.5 21C17.09 21 20 18.09 20 14.5V13.5M10.5 3C7.91 3 5.5 5.41 5.5 8V9C5.5 9.41 5.17 9.75 4.75 9.75C4.33 9.75 4 9.41 4 9V8C4 4.91 6.91 2 10.5 2C14.09 2 17 4.91 17 8V9C17 9.41 16.67 9.75 16.25 9.75C15.83 9.75 15.5 9.41 15.5 9V8C15.5 5.41 13.09 3 10.5 3M10.5 13.5C10.5 13.09 10.17 12.75 9.75 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H9.75C10.17 11.25 10.5 10.91 10.5 10.5C10.5 10.09 10.17 9.75 9.75 9.75H8C6.75 9.75 5.75 10.75 5.75 12C5.75 13.25 6.75 14.25 8 14.25H9.75C10.17 14.25 10.5 13.91 10.5 13.5M16 12.75H14.25C13.83 12.75 13.5 13.09 13.5 13.5C13.5 13.91 13.83 14.25 14.25 14.25H16C17.25 14.25 18.25 13.25 18.25 12C18.25 10.75 17.25 9.75 16 9.75H14.25C13.83 9.75 13.5 10.09 13.5 10.5C13.5 10.91 13.83 11.25 14.25 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"></path>
        </svg>
    </button>

    <!-- Main Chat Widget Container -->
    <div id="ai-chat-widget">
        <div class="ai-container">
            
            <!-- Sidebar: Chat History -->
            <aside id="history-panel">
                <div class="history-header">
                    <h2>History</h2>
                    <div class="history-header-actions">
                        <button id="clear-history-btn" title="Delete All History">Clear All</button>
                        <button id="close-history-btn" aria-label="Close History Panel">&times;</button>
                    </div>
                </div>
                <ul id="history-list">
                    <!-- History items will be injected here -->
                    <li class="empty-history">No history yet.</li>
                </ul>
            </aside>

            <!-- Main Chat Area -->
            <section id="chat-area">
                <!-- Header -->
                <header class="chat-header">
                     <div class="chat-header-left">
                        <button id="menu-toggle" aria-label="Toggle History Menu" title="History">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
                        </button>
                        <h1>GK AI Solver</h1>
                    </div>
                    <div class="chat-header-right">
                        <button id="new-chat-btn" title="Start New Chat">New Chat</button>
                        <button id="full-view-btn" aria-label="Toggle Full Screen" title="Expand">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17H7V14H5V19H10V17Z"></path></svg>
                        </button>
                        <button id="close-widget-btn" aria-label="Close Chat" title="Close">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                        </button>
                    </div>
                </header>
                
                <!-- Chat Log (Messages) -->
                <div id="chat-log" role="log" aria-live="polite">
                    <!-- Welcome Message injected by JS -->
                </div>

                <!-- Input Area -->
                <div class="chat-input-area">
                    <div id="stop-generating-container" style="display:none;">
                        <button id="stop-generating-btn">Stop Generating ■</button>
                    </div>
                    <form id="ai-solver-form">
                        <textarea id="question-input" rows="1" placeholder="Ask anything..." required></textarea>
                        <button type="submit" id="solve-button" aria-label="Send message" title="Send">
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
                <h3>Preview</h3>
                <button id="close-preview-btn">&times;</button>
            </div>
            <iframe id="preview-iframe"></iframe>
        </div>
    </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = widgetHTML;
    document.body.appendChild(wrapper);
}

function injectWidgetCSS() {
    if (!document.querySelector('link[href*="chat-widget.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/chat-widget.css';
        document.head.appendChild(link);
    }
}

// --- 4. Event Handlers & UI Interaction ---

function attachGlobalEventListeners() {
    const widget = document.getElementById('ai-chat-widget');
    const toggleBtn = document.getElementById('ai-widget-toggle-btn');
    const input = document.getElementById('question-input');
    const form = document.getElementById('ai-solver-form');

    // Global Click Listener (Delegation)
    document.addEventListener('click', (e) => {
        const target = e.target;

        // --- Toggle Button (OPEN) ---
        // Requirement: "jb chat ko close kiya jata hai ... toh har baar new chat me open hona chaiye"
        if (target.closest('#ai-widget-toggle-btn')) {
            // Check if the widget is currently hidden/inactive
            if (!widget.classList.contains('active')) {
                // Requirement Met: Start a fresh chat session every time it opens
                startNewChat(true); 
                
                widget.classList.add('active');
                toggleBtn.style.display = 'none';
                input.focus();
            }
        }

        // --- Close Button ---
        if (target.closest('#close-widget-btn')) {
            widget.classList.remove('active');
            toggleBtn.style.display = 'flex';
        }

        // --- Full Screen Toggle ---
        if (target.closest('#full-view-btn')) {
            widget.classList.toggle('full-view');
        }

        // --- New Chat Button ---
        if (target.closest('#new-chat-btn')) {
            startNewChat(true);
        }

        // --- History Sidebar Toggles ---
        if (target.closest('#menu-toggle')) {
            document.getElementById('history-panel').classList.toggle('active');
        }
        if (target.closest('#close-history-btn')) {
            document.getElementById('history-panel').classList.remove('active');
        }

        // --- Clear History ---
        if (target.closest('#clear-history-btn')) {
            if (confirm("Are you sure you want to clear all history?")) {
                chatHistory = [];
                saveHistoryToStorage();
                startNewChat(true);
            }
        }

        // --- Message Actions: EDIT ---
        if (target.closest('.msg-edit-btn')) {
            const msgDiv = target.closest('.chat-message');
            // Get raw text from the hidden attribute or parse it back
            // For simplicity, we use the innerText of the text content
            const textContent = msgDiv.querySelector('.text-content').innerText;
            editMessage(msgDiv, textContent);
        }

        // --- Message Actions: REGENERATE ---
        if (target.closest('.msg-regen-btn')) {
            const msgDiv = target.closest('.chat-message');
            regenerateResponse(msgDiv);
        }

        // --- Stop Generation ---
        if (target.closest('#stop-generating-btn')) {
            stopGeneration();
        }

        // --- History Item Click ---
        const historyItem = target.closest('#history-list li');
        if (historyItem && !target.closest('.history-item-delete-btn')) {
            const chatId = historyItem.dataset.id;
            openChat(chatId);
            // On mobile, close the sidebar after selection
            if (window.innerWidth < 768) {
                document.getElementById('history-panel').classList.remove('active');
            }
        }

        // --- History Item Delete ---
        if (target.closest('.history-item-delete-btn')) {
            e.stopPropagation();
            const li = target.closest('li');
            deleteChat(li.dataset.id);
        }

        // --- Preview Modal Close ---
        if (target.closest('#close-preview-btn') || target.id === 'preview-modal') {
            document.getElementById('preview-modal').classList.remove('active');
        }
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text && !isGenerating) {
            input.value = '';
            input.style.height = 'auto'; // Reset height
            processUserMessage(text);
        }
    });

    // Enter Key Handling
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });

    // Auto-resize Textarea
    input.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}

// --- 5. Logic: Chat & History Management ---

/**
 * Starts a completely new conversation.
 * @param {boolean} updateUI - If true, clears the view and updates the history list.
 */
function startNewChat(updateUI = true) {
    currentChatId = Date.now().toString();
    
    // Create new chat object
    const newChat = {
        id: currentChatId,
        title: "New Conversation",
        messages: []
    };

    // Add to history (at the top)
    chatHistory.unshift(newChat);
    
    // Save to storage
    saveHistoryToStorage();

    if (updateUI) {
        renderChatView(newChat);
        renderHistoryList();
        
        // Focus input
        setTimeout(() => document.getElementById('question-input').focus(), 100);
    }
}

/**
 * Opens an existing chat from history.
 */
function openChat(chatId) {
    currentChatId = chatId;
    const chat = chatHistory.find(c => c.id === chatId);
    
    if (chat) {
        renderChatView(chat);
        renderHistoryList(); // Refresh active class
    } else {
        // Fallback if ID not found
        startNewChat();
    }
}

/**
 * Deletes a specific chat.
 */
function deleteChat(chatId) {
    if (!confirm("Delete this chat?")) return;

    chatHistory = chatHistory.filter(c => c.id !== chatId);
    saveHistoryToStorage();

    // If we deleted the current chat, start a new one
    if (currentChatId === chatId) {
        startNewChat();
    } else {
        renderHistoryList();
    }
}

/**
 * Gets the current active chat object.
 * Creates one if it doesn't exist.
 */
function getOrCreateCurrentChat() {
    let chat = chatHistory.find(c => c.id === currentChatId);
    if (!chat) {
        // Should ideally not happen if startNewChat is called correctly
        startNewChat(false);
        chat = chatHistory[0];
    }
    return chat;
}

// --- 6. Logic: Messaging & AI Generation ---

/**
 * Handles the user sending a message.
 */
async function processUserMessage(text) {
    // 1. Update UI immediately
    addMessageToUI('user', text);

    // 2. Update Data Model
    const chat = getOrCreateCurrentChat();
    chat.messages.push({ role: 'user', content: text });

    // 3. Update Chat Title if it's the first message
    if (chat.messages.length === 1) {
        chat.title = text.substring(0, 30) + (text.length > 30 ? '...' : '');
    }

    // 4. Save
    saveHistoryToStorage();

    // 5. Trigger AI
    await generateAIResponse(text);
}

/**
 * Calls Google GenAI and handles response + links.
 * Requirement: "jaise online hone per ... bhai mera link aana chahiye"
 */
async function generateAIResponse(prompt) {
    if (!aiClient) {
        // Fallback if AI client didn't init (e.g. script load fail)
        simulateOfflineResponse(prompt);
        return;
    }

    isGenerating = true;
    updateUIState();

    // Add placeholder ID
    const responseId = 'ai-' + Date.now();
    addLoadingIndicator(responseId);

    try {
        // 1. Generate Content from AI
        const result = await aiClient.models.generateContent({
            model: MODEL_NAME,
            contents: prompt
        });
        
        const aiText = result.text;

        // 2. Fetch Related Links (Requirement: ALWAYS fetch links)
        let linksHTML = "";
        if (window.GKApp && window.GKApp.fuzzySearch && window.GKApp.searchData) {
            const results = window.GKApp.fuzzySearch(prompt, window.GKApp.searchData);
            if (results && results.length > 0) {
                const items = results.slice(0, 3); // Top 3 links
                const linksList = items.map(r => `<li><a href="${r.url}" target="_blank">${r.title}</a></li>`).join('');
                linksHTML = `<div class="related-links-section">
                                <strong>Related Articles:</strong>
                                <ul>${linksList}</ul>
                             </div>`;
            }
        }

        // 3. Combine AI Text + Links
        const finalContent = aiText + (linksHTML ? "\n\n" + linksHTML : "");

        // 4. Update UI
        replaceLoadingWithContent(responseId, finalContent);

        // 5. Save to History
        const chat = getOrCreateCurrentChat();
        chat.messages.push({ role: 'model', content: finalContent });
        saveHistoryToStorage();

    } catch (error) {
        console.error("AI Generation Error:", error);
        // Remove loading indicator
        const el = document.getElementById(responseId);
        if(el) el.remove();

        // Fail gracefully -> Try offline search explicitly
        simulateOfflineResponse(prompt);
    } finally {
        isGenerating = false;
        updateUIState();
    }
}

/**
 * Simulates response using only local data (Offline fallback).
 */
function simulateOfflineResponse(prompt) {
    let responseText = "I'm having trouble connecting to the AI. ";
    let linksHTML = "";

    if (window.GKApp && window.GKApp.fuzzySearch && window.GKApp.searchData) {
        const results = window.GKApp.fuzzySearch(prompt, window.GKApp.searchData);
        if (results && results.length > 0) {
            responseText = "I am currently offline, but I found these pages on our website that might help:";
            const items = results.slice(0, 3);
            const linksList = items.map(r => `<li><a href="${r.url}" target="_blank">${r.title}</a></li>`).join('');
            linksHTML = `<div class="related-links-section">
                            <strong>Found Locally:</strong>
                            <ul>${linksList}</ul>
                         </div>`;
        } else {
            responseText += "And I couldn't find any local articles matching your query.";
        }
    } else {
        responseText += "Please check your internet connection.";
    }

    const finalContent = responseText + linksHTML;
    addMessageToUI('model', finalContent);

    const chat = getOrCreateCurrentChat();
    chat.messages.push({ role: 'model', content: finalContent });
    saveHistoryToStorage();

    isGenerating = false;
    updateUIState();
}

/**
 * Stops the current generation (UI only for now).
 */
function stopGeneration() {
    isGenerating = false;
    updateUIState();
    
    // Find loading indicator and change to stopped message
    const loader = document.querySelector('.typing-indicator');
    if (loader) {
        loader.innerHTML = `<div class="message-content">Generation stopped by user.</div>`;
        loader.classList.remove('typing-indicator');
        
        const chat = getOrCreateCurrentChat();
        chat.messages.push({ role: 'model', content: "Generation stopped by user." });
        saveHistoryToStorage();
    }
}

// --- 7. Message Editing & Regeneration ---

/**
 * Handles editing a previous user message.
 * Requirement: "baki ki chat upper ... vhi rahe" (Keep previous context).
 */
function editMessage(msgElement, oldText) {
    const chat = getOrCreateCurrentChat();
    
    // 1. Find the index of the message in the data model
    // We need to be careful to find the *correct* message index.
    // Since DOM order matches Array order, we can use index mapping.
    const allMessagesInDOM = Array.from(document.querySelectorAll('.chat-message'));
    const uiIndex = allMessagesInDOM.indexOf(msgElement);
    
    // NOTE: renderChatView sometimes adds a welcome message if chat is empty, 
    // but if we are editing, chat is not empty.
    // chat.messages array maps 1:1 to the rendered .chat-message elements in renderChatView.
    
    if (uiIndex > -1 && chat.messages[uiIndex]) {
        // 2. Set input value to old text
        const input = document.getElementById('question-input');
        input.value = chat.messages[uiIndex].content; // Use raw content from data, not DOM text
        input.focus();
        
        // 3. Truncate history
        // Keep everything BEFORE this index (0 to uiIndex - 1)
        // Remove this message (uiIndex) and everything AFTER it.
        chat.messages = chat.messages.slice(0, uiIndex);
        
        // 4. Update Storage
        saveHistoryToStorage();
        
        // 5. Re-render View
        // This visually removes the edited message and subsequent answers, 
        // preserving the "upper" chat as requested.
        renderChatView(chat);
    }
}

/**
 * Regenerates the last AI response.
 */
function regenerateResponse(aiMsgElement) {
    const chat = getOrCreateCurrentChat();
    
    // Check if the last message is indeed from the model
    const lastMsg = chat.messages[chat.messages.length - 1];
    const secondLastMsg = chat.messages[chat.messages.length - 2];

    if (lastMsg && lastMsg.role === 'model' && secondLastMsg && secondLastMsg.role === 'user') {
        // Remove the last AI message
        chat.messages.pop();
        saveHistoryToStorage();
        
        // Re-render (removes the AI message from UI)
        renderChatView(chat);
        
        // Re-submit the user's last prompt
        generateAIResponse(secondLastMsg.content);
    }
}

// --- 8. UI Rendering Helpers ---

function renderChatView(chat) {
    const log = document.getElementById('chat-log');
    log.innerHTML = '';
    
    if (chat.messages.length === 0) {
        log.innerHTML = `
        <div class="chat-message ai-message">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>नमस्ते! मैं GK AI हूँ। आप मुझसे कोई भी सवाल पूछ सकते हैं।</p>
            </div>
        </div>`;
    } else {
        chat.messages.forEach(msg => {
            addMessageToUI(msg.role, msg.content);
        });
    }
    scrollToBottom();
}

function addMessageToUI(role, content) {
    const log = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.className = `chat-message ${role === 'user' ? 'user-message' : 'ai-message'}`;
    
    let innerHTML = '';
    
    if (role === 'user') {
        // User message: simple text, show Edit button
        innerHTML = `<div class="text-content">${escapeHTML(content)}</div>
                     <div class="msg-actions">
                        <button class="msg-edit-btn" title="Edit">✏️</button>
                     </div>`;
    } else {
        // AI message: Markdown parsing + Links HTML
        // We need to be careful not to markdown-parse the HTML links we injected.
        // Strategy: Split by our known link container class if present.
        
        let mainText = content;
        let linksHTML = '';
        
        if (content.includes('<div class="related-links-section">')) {
            const parts = content.split('<div class="related-links-section">');
            mainText = parts[0];
            linksHTML = '<div class="related-links-section">' + parts[1];
        }
        
        // Parse Markdown for main text
        const parsedText = DOMPurify.sanitize(marked.parse(mainText));
        
        innerHTML = `<div class="text-content">${parsedText} ${linksHTML}</div>
                     <div class="msg-actions">
                        <button class="msg-regen-btn" title="Regenerate">↻</button>
                     </div>`;
    }

    const avatar = `<div class="message-avatar">${role==='user'?'You':'🤖'}</div>`;
    
    if (role === 'user') {
        div.innerHTML = `<div class="message-content">${innerHTML}</div>${avatar}`;
    } else {
        div.innerHTML = `${avatar}<div class="message-content">${innerHTML}</div>`;
    }
    
    log.appendChild(div);
    scrollToBottom();
}

function addLoadingIndicator(id) {
    const log = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.id = id;
    div.className = 'chat-message ai-message typing-indicator';
    div.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-dots"><span>.</span><span>.</span><span>.</span></div>
        </div>`;
    log.appendChild(div);
    scrollToBottom();
}

function replaceLoadingWithContent(id, content) {
    const el = document.getElementById(id);
    if (el) el.remove(); // Remove loader
    // Add real message
    addMessageToUI('model', content);
}

function renderHistoryList() {
    const list = document.getElementById('history-list');
    if (!list) return;

    if (chatHistory.length === 0) {
        list.innerHTML = '<li class="empty-history">No history.</li>';
        return;
    }

    list.innerHTML = chatHistory.map(c => {
        const isActive = c.id === currentChatId ? 'active' : '';
        const title = c.title || "New Conversation";
        return `
        <li data-id="${c.id}" class="${isActive}">
            <span class="history-item-text">${escapeHTML(title)}</span>
            <button class="history-item-delete-btn" title="Delete Chat">&times;</button>
        </li>`;
    }).join('');
}

function updateUIState() {
    const btn = document.getElementById('solve-button');
    const stopContainer = document.getElementById('stop-generating-container');
    
    if (isGenerating) {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        stopContainer.style.display = 'flex';
    } else {
        btn.disabled = false;
        btn.style.opacity = "1";
        stopContainer.style.display = 'none';
        document.getElementById('question-input').focus();
    }
}

// --- 9. Storage & Utils ---

function saveHistoryToStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chatHistory));
    renderHistoryList();
}

function loadHistoryFromStorage() {
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        chatHistory = stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Error loading history:", e);
        chatHistory = [];
    }
}

function scrollToBottom() {
    const log = document.getElementById('chat-log');
    if (log) {
        setTimeout(() => log.scrollTop = log.scrollHeight, 50);
    }
}

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag]));
}
