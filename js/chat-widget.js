
import { GoogleGenAI } from "https://esm.run/@google/genai";
import { marked } from "https://esm.run/marked@12.0.2";
import DOMPurify from "https://esm.run/dompurify@3.0.8";

// --- Global Configuration & State ---
const API_KEY = "AIzaSyADifk5i87QT2q5EaChypYmfu4NalKcUiU"; // Hardcoded as per your setup
let aiClient = null;
let chatHistory = [];
let currentChatIndex = -1;
let isGenerating = false;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject HTML immediately
    injectWidgetHTML();

    // 2. Initialize AI Client
    try {
        aiClient = new GoogleGenAI({ apiKey: API_KEY });
    } catch (error) {
        console.error("AI Initialization Failed:", error);
    }

    // 3. Load History from LocalStorage
    loadHistory();

    // 4. Attach Event Listeners (using delegation for robustness)
    attachGlobalEventListeners();

    // 5. Check for URL params or deep links if any (optional)
    // 6. Restore UI state
    restoreUIState();
});

// --- 1. HTML Injection ---
function injectWidgetHTML() {
    if (document.getElementById('ai-chat-widget')) return;

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
                    <div class="chat-message ai-message">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            <p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ? आप गणित, विज्ञान, इतिहास या किसी भी विषय पर सवाल पूछ सकते हैं।</p>
                        </div>
                    </div>
                </div>

                <!-- Input Area -->
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

    // Inject CSS dynamically if not present
    if (!document.querySelector('link[href*="chat-widget.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/chat-widget.css';
        document.head.appendChild(link);
    }
}

// --- 2. State Management & UI Restoration ---

function restoreUIState() {
    const chatLog = document.getElementById('chat-log');
    
    // If we have a selected chat index, load it. Otherwise start fresh or show welcome.
    if (currentChatIndex !== -1 && chatHistory[currentChatIndex]) {
        renderChatFromHistory(currentChatIndex);
    } else if (chatHistory.length > 0) {
        // Automatically load the most recent chat
        currentChatIndex = 0;
        renderChatFromHistory(0);
    }
    
    renderHistoryList();
}

function loadHistory() {
    try {
        const saved = localStorage.getItem('aiChatHistory');
        if (saved) {
            chatHistory = JSON.parse(saved);
        }
    } catch (e) {
        console.error("Failed to load history:", e);
        chatHistory = [];
    }
}

function saveHistoryToStorage() {
    try {
        // Limit history to last 50 conversations to prevent localStorage overflow
        if (chatHistory.length > 50) chatHistory = chatHistory.slice(0, 50);
        localStorage.setItem('aiChatHistory', JSON.stringify(chatHistory));
        renderHistoryList();
    } catch (e) {
        console.error("Failed to save history:", e);
    }
}

// --- 3. Event Listeners ---

function attachGlobalEventListeners() {
    // Using document delegation for buttons that might be dynamically added or removed
    document.addEventListener('click', (e) => {
        const target = e.target;

        // Toggle Widget Open
        if (target.closest('#ai-widget-toggle-btn')) {
            document.getElementById('ai-chat-widget').classList.add('active');
            document.getElementById('ai-widget-toggle-btn').style.display = 'none';
            scrollToBottom();
        }

        // Close Widget
        if (target.closest('#close-widget-btn')) {
            document.getElementById('ai-chat-widget').classList.remove('active');
            document.getElementById('ai-widget-toggle-btn').style.display = 'flex';
        }

        // Full Screen Toggle
        if (target.closest('#full-view-btn')) {
            document.getElementById('ai-chat-widget').classList.toggle('full-view');
        }

        // Menu/History Toggle
        if (target.closest('#menu-toggle')) {
            document.getElementById('history-panel').classList.toggle('active');
        }
        if (target.closest('#close-history-btn')) {
            document.getElementById('history-panel').classList.remove('active');
        }

        // Clear History
        if (target.closest('#clear-history-btn')) {
            if (confirm("Are you sure you want to delete all history?")) {
                chatHistory = [];
                saveHistoryToStorage();
                startNewChat();
            }
        }

        // New Chat
        if (target.closest('#new-chat-btn')) {
            startNewChat();
        }

        // History Item Selection
        const historyItem = target.closest('#history-list li');
        if (historyItem && !target.closest('.history-item-delete-btn')) {
            const index = parseInt(historyItem.dataset.index);
            if (!isNaN(index)) {
                currentChatIndex = index;
                renderChatFromHistory(index);
                document.getElementById('history-panel').classList.remove('active');
                // Update active class in list
                document.querySelectorAll('#history-list li').forEach(li => li.classList.remove('active'));
                historyItem.classList.add('active');
            }
        }

        // Delete Single History Item
        const deleteHistoryBtn = target.closest('.history-item-delete-btn');
        if (deleteHistoryBtn) {
            e.stopPropagation();
            const li = deleteHistoryBtn.closest('li');
            const index = parseInt(li.dataset.index);
            deleteChat(index);
        }

        // Message Actions: Copy Code
        if (target.matches('button[data-action="copy"]')) {
            const wrapper = target.closest('.code-wrapper');
            const code = wrapper.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                const originalText = target.innerText;
                target.innerText = "Copied!";
                setTimeout(() => target.innerText = originalText, 2000);
            });
        }

        // Message Actions: Preview Code
        if (target.matches('button[data-action="preview"]')) {
            const wrapper = target.closest('.code-wrapper');
            const code = wrapper.querySelector('code').innerText;
            openPreviewModal(code);
        }

        // Close Preview Modal
        if (target.closest('#close-preview-btn') || target.id === 'preview-modal') {
            document.getElementById('preview-modal').classList.remove('active');
        }

        // --- NEW: Message Edit & Regenerate ---
        
        // Edit User Message
        if (target.closest('.msg-edit-btn')) {
            const msgDiv = target.closest('.chat-message');
            const contentP = msgDiv.querySelector('.message-content p');
            const text = contentP ? contentP.innerText : "";
            
            // Populate input
            const input = document.getElementById('question-input');
            input.value = text;
            input.focus();
            
            // Remove this message and everything after it from the current conversation
            // We need to find the index of this message in the current chat conversation array
            const messageIndex = getMessageIndexInCurrentChat(msgDiv);
            if (messageIndex !== -1) {
                truncateConversationAt(messageIndex);
            }
        }

        // Regenerate AI Response
        if (target.closest('.msg-regen-btn')) {
             // Find the AI message element
             const msgDiv = target.closest('.chat-message');
             const messageIndex = getMessageIndexInCurrentChat(msgDiv);
             
             if (messageIndex > 0) {
                 // Get the user query immediately preceding this AI response
                 const prevUserMsg = chatHistory[currentChatIndex].conversation[messageIndex - 1];
                 if (prevUserMsg && prevUserMsg.role === 'user') {
                     // Remove this AI response
                     truncateConversationAt(messageIndex); 
                     // Resubmit the previous user question
                     submitQuestionToAI(prevUserMsg.text);
                 }
             }
        }
    });

    // Form Submit
    const form = document.getElementById('ai-solver-form');
    const input = document.getElementById('question-input');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleMessageSend();
        });
    }

    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleMessageSend();
            }
        });
        input.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            if (this.value === '') this.style.height = 'auto';
        });
    }
}

// --- 4. Chat Logic ---

function startNewChat() {
    currentChatIndex = -1;
    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML = `
        <div class="chat-message ai-message">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ? आप गणित, विज्ञान, इतिहास या किसी भी विषय पर सवाल पूछ सकते हैं।</p>
            </div>
        </div>`;
    
    // Unselect history items
    document.querySelectorAll('#history-list li').forEach(li => li.classList.remove('active'));
    if(window.innerWidth <= 768) document.getElementById('history-panel').classList.remove('active');
}

function handleMessageSend() {
    const input = document.getElementById('question-input');
    const text = input.value.trim();
    
    if (!text) return;
    if (isGenerating) return; // Prevent double submit

    // 1. Add User Message to UI
    appendMessageToUI(text, 'user');
    input.value = '';
    input.style.height = 'auto';

    // 2. Process Logic
    submitQuestionToAI(text);
}

async function submitQuestionToAI(questionText) {
    isGenerating = true;
    const chatLog = document.getElementById('chat-log');
    
    // Add Thinking Indicator
    const indicatorId = 'thinking-' + Date.now();
    const indicatorHTML = `
        <div class="chat-message ai-message typing-indicator" id="${indicatorId}">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-dots"><span>.</span><span>.</span><span>.</span></div>
            </div>
        </div>`;
    chatLog.insertAdjacentHTML('beforeend', indicatorHTML);
    scrollToBottom();

    try {
        // API Call
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: questionText
        });

        const responseText = response.text;
        
        // Remove indicator
        const indicator = document.getElementById(indicatorId);
        if (indicator) indicator.remove();

        // Add AI Message to UI
        appendMessageToUI(responseText, 'model');

        // Save to History
        saveToConversation(questionText, responseText);

    } catch (error) {
        console.error("API Error:", error);
        const indicator = document.getElementById(indicatorId);
        if (indicator) indicator.remove();

        // Fallback: Local Search
        if (window.GKApp && window.GKApp.fuzzySearch && window.GKApp.searchData) {
            const results = window.GKApp.fuzzySearch(questionText, window.GKApp.searchData);
            if (results && results.length > 0) {
                let fallbackHTML = `<strong>नेटवर्क समस्या। स्थानीय डेटाबेस परिणाम:</strong><br>`;
                results.slice(0, 3).forEach(item => {
                    fallbackHTML += `<a href="${item.url}" class="source-box">
                        <strong>${item.title}</strong><br>
                        ${item.paragraph ? item.paragraph.substring(0, 80) + '...' : 'Click to read more'}
                    </a>`;
                });
                appendMessageToUI(fallbackHTML, 'model', true); // true = raw HTML
                saveToConversation(questionText, fallbackHTML);
            } else {
                const errorMsg = "क्षमा करें, मुझे इसका उत्तर नहीं मिला और इंटरनेट उपलब्ध नहीं है।";
                appendMessageToUI(errorMsg, 'model');
                saveToConversation(questionText, errorMsg);
            }
        } else {
            const errorMsg = "त्रुटि: कृपया अपना इंटरनेट कनेक्शन जांचें।";
            appendMessageToUI(errorMsg, 'model');
            saveToConversation(questionText, errorMsg);
        }
    } finally {
        isGenerating = false;
    }
}

// --- 5. UI Rendering Helpers ---

function appendMessageToUI(content, role, isRawHTML = false) {
    const chatLog = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.className = `chat-message ${role === 'user' ? 'user-message' : 'ai-message'}`;
    
    let innerContent = '';
    
    if (role === 'user') {
        // Simple text for user, escape HTML
        innerContent = `<p>${escapeHTML(content)}</p>`;
        // Add Edit Button
        innerContent += `
            <div class="msg-actions">
                <button class="msg-edit-btn" title="Edit Message">✏️</button>
            </div>`;
    } else {
        // Markdown rendering for AI
        if (isRawHTML) {
            innerContent = content;
        } else {
            innerContent = renderMarkdown(content);
        }
        // Add Regenerate Button
        innerContent += `
            <div class="msg-actions">
                 <button class="msg-regen-btn" title="Try Again">↻</button>
            </div>`;
    }

    const avatarHTML = `<div class="message-avatar" style="background-color: ${role === 'user' ? 'var(--primary-color)' : '#19c37d'}">${role === 'user' ? 'You' : '🤖'}</div>`;
    const contentWrapperHTML = `<div class="message-content">${innerContent}</div>`;

    div.innerHTML = role === 'user' ? contentWrapperHTML + avatarHTML : avatarHTML + contentWrapperHTML;
    
    chatLog.appendChild(div);
    scrollToBottom();
}

function renderMarkdown(text) {
    // 1. Handle Code Blocks manually to insert toolbar
    const parts = text.split(/(\`\`\`[\s\S]*?\`\`\`)/g);
    let finalHTML = '';

    parts.forEach(part => {
        if (part.startsWith('```')) {
            // Extract language
            const firstLineEnd = part.indexOf('\n');
            let lang = 'text';
            let code = '';
            
            if (firstLineEnd > 3) {
                lang = part.substring(3, firstLineEnd).trim().toLowerCase();
                code = part.substring(firstLineEnd + 1, part.length - 3);
            } else {
                code = part.substring(3, part.length - 3);
            }
            
            code = escapeHTML(code.trim()); // Escape code content

            finalHTML += `
            <div class="code-wrapper">
                <div class="code-header">
                    <span>${lang}</span>
                    <div class="code-toolbar">
                        <button data-action="copy">Copy</button>
                        <button data-action="preview">Preview</button>
                    </div>
                </div>
                <pre><code>${code}</code></pre>
            </div>`;
        } else {
            // Parse regular markdown
            finalHTML += DOMPurify.sanitize(marked.parse(part));
        }
    });
    return finalHTML;
}

function scrollToBottom() {
    const chatLog = document.getElementById('chat-log');
    if(chatLog) chatLog.scrollTop = chatLog.scrollHeight;
}

function openPreviewModal(code) {
    const modal = document.getElementById('preview-modal');
    const iframe = document.getElementById('preview-iframe');
    if (modal && iframe) {
        iframe.srcdoc = code;
        modal.classList.add('active');
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag]));
}

// --- 6. Data Management ---

function saveToConversation(question, answer) {
    if (currentChatIndex === -1) {
        // Start new conversation
        chatHistory.unshift({
            title: question.substring(0, 30) + (question.length > 30 ? "..." : ""),
            timestamp: Date.now(),
            conversation: []
        });
        currentChatIndex = 0;
    }
    
    // Add turn
    chatHistory[currentChatIndex].conversation.push({ role: 'user', text: question });
    chatHistory[currentChatIndex].conversation.push({ role: 'model', text: answer });
    
    saveHistoryToStorage();
}

function renderChatFromHistory(index) {
    if (!chatHistory[index]) return;
    
    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML = ''; // Clear current view
    
    chatHistory[index].conversation.forEach(msg => {
        // Use isRawHTML=true if the stored text looks like our HTML fallback string, else false
        const isRaw = msg.text.includes('source-box'); 
        appendMessageToUI(msg.text, msg.role, isRaw);
    });
}

function renderHistoryList() {
    const list = document.getElementById('history-list');
    if (!list) return;

    if (chatHistory.length === 0) {
        list.innerHTML = '<li class="empty-history">No history yet.</li>';
        return;
    }

    list.innerHTML = chatHistory.map((chat, index) => `
        <li data-index="${index}" class="${index === currentChatIndex ? 'active' : ''}">
            <span class="history-item-text">${escapeHTML(chat.title || 'Conversation')}</span>
            <button class="history-item-delete-btn" aria-label="Delete Chat">&times;</button>
        </li>
    `).join('');
}

function deleteChat(index) {
    if (confirm("Delete this chat?")) {
        chatHistory.splice(index, 1);
        saveHistoryToStorage();
        if (index === currentChatIndex) {
            startNewChat();
        } else if (index < currentChatIndex) {
            currentChatIndex--; // Adjust index
        }
        renderHistoryList();
    }
}

// --- 7. Advanced History Modification (Edit/Regenerate Support) ---

function getMessageIndexInCurrentChat(msgElement) {
    // This creates a mapping between DOM nodes and the conversation array
    // Since the chat log DOM order matches the array order exactly:
    const chatLog = document.getElementById('chat-log');
    const allMessages = Array.from(chatLog.querySelectorAll('.chat-message'));
    const domIndex = allMessages.indexOf(msgElement);
    
    // Adjust for the initial "Welcome" message if it exists and isn't in history
    // In startNewChat, we add a welcome message. But renderChatFromHistory clears it.
    // If we are in a saved chat, the welcome message isn't there usually, or index 0 is the first history item.
    // We rely on exact match.
    
    // However, the 'conversation' array stores {user, model, user, model}.
    // The DOM has div.chat-message.
    // If currentChatIndex is -1 (unsaved), array is empty.
    if (currentChatIndex === -1) return -1;
    
    return domIndex;
}

function truncateConversationAt(index) {
    if (currentChatIndex === -1 || !chatHistory[currentChatIndex]) return;
    
    // Remove elements from array starting at index
    chatHistory[currentChatIndex].conversation.splice(index);
    saveHistoryToStorage();
    
    // Re-render UI to reflect the truncation
    renderChatFromHistory(currentChatIndex);
}
