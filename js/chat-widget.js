
import { GoogleGenAI } from "https://esm.run/@google/genai";
import { marked } from "https://esm.run/marked@12.0.2";
import DOMPurify from "https://esm.run/dompurify@3.0.8";

const API_KEY = "AIzaSyADifk5i87QT2q5EaChypYmfu4NalKcUiU";
const CHAT_STORAGE_KEY = 'aiChatHistory_v2';

// --- 1. Inject CSS & HTML ---
function injectResources() {
    // Inject CSS if not present
    if (!document.querySelector('link[href$="chat-widget.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/chat-widget.css';
        document.head.appendChild(link);
    }

    // HTML Template
    const widgetHTML = `
        <!-- Toggle Button -->
        <button id="ai-widget-toggle-btn" aria-label="Toggle AI Chat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 13.5C20 13.09 19.67 12.75 19.25 12.75C18.83 12.75 18.5 13.09 18.5 13.5V14.5C18.5 17.26 16.26 19.5 13.5 19.5C13.09 19.5 12.75 19.83 12.75 20.25C12.75 20.67 13.09 21 13.5 21C17.09 21 20 18.09 20 14.5V13.5M10.5 3C7.91 3 5.5 5.41 5.5 8V9C5.5 9.41 5.17 9.75 4.75 9.75C4.33 9.75 4 9.41 4 9V8C4 4.91 6.91 2 10.5 2C14.09 2 17 4.91 17 8V9C17 9.41 16.67 9.75 16.25 9.75C15.83 9.75 15.5 9.41 15.5 9V8C15.5 5.41 13.09 3 10.5 3M10.5 13.5C10.5 13.09 10.17 12.75 9.75 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H9.75C10.17 11.25 10.5 10.91 10.5 10.5C10.5 10.09 10.17 9.75 9.75 9.75H8C6.75 9.75 5.75 10.75 5.75 12C5.75 13.25 6.75 14.25 8 14.25H9.75C10.17 14.25 10.5 13.91 10.5 13.5M16 12.75H14.25C13.83 12.75 13.5 13.09 13.5 13.5C13.5 13.91 13.83 14.25 14.25 14.25H16C17.25 14.25 18.25 13.25 18.25 12C18.25 10.75 17.25 9.75 16 9.75H14.25C13.83 9.75 13.5 10.09 13.5 10.5C13.5 10.91 13.83 11.25 14.25 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"></path></svg>
        </button>

        <!-- Chat Widget Container -->
        <div id="ai-chat-widget">
            <div class="ai-container">
                <!-- Sidebar (History) -->
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

                <!-- Main Chat Area -->
                <section id="chat-area">
                    <header class="chat-header">
                        <div class="chat-header-left">
                            <button id="menu-toggle" aria-label="Menu">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
                            </button>
                            <h1>AI Solver</h1>
                        </div>
                        <div class="chat-header-right">
                            <button id="new-chat-btn" title="New Chat">New Chat</button>
                            <button id="full-view-btn" title="Expand">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17H7V14H5V19H10V17Z"></path></svg>
                            </button>
                            <button id="close-widget-btn" title="Close">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                            </button>
                        </div>
                    </header>

                    <div id="chat-log">
                        <div class="chat-message ai-message">
                            <div class="message-avatar">🤖</div>
                            <div class="message-content">
                                <p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?</p>
                            </div>
                        </div>
                    </div>

                    <div class="chat-input-area">
                        <form id="ai-solver-form">
                            <textarea id="question-input" rows="1" placeholder="अपना सवाल यहाँ पूछें..." required></textarea>
                            <button type="submit" id="solve-button">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path></svg>
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>

        <!-- Preview Modal -->
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

    // Container for widget to avoid overwriting body
    let container = document.getElementById('ai-widget-root');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ai-widget-root';
        document.body.appendChild(container);
    }
    container.innerHTML = widgetHTML;
}

// --- 2. Logic Controller ---
class ChatWidget {
    constructor() {
        this.ai = new GoogleGenAI({ apiKey: API_KEY });
        this.chatHistory = this.loadHistoryFromStorage();
        this.currentChatId = null;
        
        this.elements = {
            toggleBtn: document.getElementById('ai-widget-toggle-btn'),
            widget: document.getElementById('ai-chat-widget'),
            closeBtn: document.getElementById('close-widget-btn'),
            fullViewBtn: document.getElementById('full-view-btn'),
            menuBtn: document.getElementById('menu-toggle'),
            newChatBtn: document.getElementById('new-chat-btn'),
            historyPanel: document.getElementById('history-panel'),
            closeHistoryBtn: document.getElementById('close-history-btn'),
            clearHistoryBtn: document.getElementById('clear-history-btn'),
            historyList: document.getElementById('history-list'),
            form: document.getElementById('ai-solver-form'),
            input: document.getElementById('question-input'),
            log: document.getElementById('chat-log'),
            previewModal: document.getElementById('preview-modal'),
            closePreviewBtn: document.getElementById('close-preview-btn'),
            previewIframe: document.getElementById('preview-iframe')
        };

        this.bindEvents();
        this.renderHistoryList();
        
        // Auto-start a new chat session if none exists
        if (this.chatHistory.length === 0) {
            this.startNewChat(false);
        } else {
            // Load the most recent chat
            this.loadChat(this.chatHistory[0].id);
        }
    }

    loadHistoryFromStorage() {
        try {
            return JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    saveHistoryToStorage() {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.chatHistory));
    }

    bindEvents() {
        // Toggle Widget
        this.elements.toggleBtn.addEventListener('click', () => {
            this.elements.widget.classList.add('active');
            this.elements.toggleBtn.style.display = 'none';
            setTimeout(() => this.elements.input.focus(), 100);
        });

        this.elements.closeBtn.addEventListener('click', () => {
            this.elements.widget.classList.remove('active');
            this.elements.toggleBtn.style.display = 'flex';
        });

        // Full View
        this.elements.fullViewBtn.addEventListener('click', () => {
            this.elements.widget.classList.toggle('full-view');
        });

        // History Menu
        this.elements.menuBtn.addEventListener('click', () => {
            this.elements.historyPanel.classList.toggle('active');
        });
        this.elements.closeHistoryBtn.addEventListener('click', () => {
            this.elements.historyPanel.classList.remove('active');
        });

        // New Chat
        this.elements.newChatBtn.addEventListener('click', () => this.startNewChat());

        // Clear History
        this.elements.clearHistoryBtn.addEventListener('click', () => {
            if(confirm('Delete all history?')) {
                this.chatHistory = [];
                this.saveHistoryToStorage();
                this.startNewChat();
                this.renderHistoryList();
            }
        });

        // Input Handling
        this.elements.input.addEventListener('input', (e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
        });
        this.elements.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSubmit();
            }
        });

        this.elements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // History List Click
        this.elements.historyList.addEventListener('click', (e) => {
            const li = e.target.closest('li');
            const delBtn = e.target.closest('.history-item-delete-btn');
            
            if (!li) return;
            const id = li.dataset.id;

            if (delBtn) {
                e.stopPropagation();
                this.deleteChat(id);
            } else {
                this.loadChat(id);
                this.elements.historyPanel.classList.remove('active');
                // Mobile check to close menu
                if (window.innerWidth <= 768) this.elements.historyPanel.classList.remove('active');
            }
        });

        // Code Preview & Copy
        this.elements.log.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-action]');
            if (!btn) return;
            const action = btn.dataset.action;
            const pre = btn.closest('pre');
            
            if (action === 'copy' && pre) {
                const code = pre.querySelector('code').innerText;
                navigator.clipboard.writeText(code);
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Copied!';
                setTimeout(() => btn.innerHTML = originalText, 2000);
            } 
            else if (action === 'preview' && pre) {
                const code = pre.querySelector('code').innerText;
                this.openPreview(code);
            }
            else if (action === 'edit' && pre) {
                this.toggleEditMode(pre);
            }
        });

        this.elements.closePreviewBtn.addEventListener('click', () => {
            this.elements.previewModal.classList.remove('active');
        });
    }

    startNewChat(clearUI = true) {
        const newId = Date.now().toString();
        const newChat = { id: newId, title: 'New Chat', messages: [] };
        this.chatHistory.unshift(newChat);
        this.currentChatId = newId;
        
        if (clearUI) {
            this.elements.log.innerHTML = `
                <div class="chat-message ai-message">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content"><p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?</p></div>
                </div>`;
        }
        this.saveHistoryToStorage();
        this.renderHistoryList();
        this.elements.historyPanel.classList.remove('active');
    }

    loadChat(id) {
        const chat = this.chatHistory.find(c => c.id === id);
        if (!chat) return;
        
        this.currentChatId = id;
        this.elements.log.innerHTML = '';
        
        if (chat.messages.length === 0) {
             this.elements.log.innerHTML = `
                <div class="chat-message ai-message">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content"><p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?</p></div>
                </div>`;
        } else {
            chat.messages.forEach(msg => {
                if (msg.role === 'user') this.appendUserMessage(msg.text);
                else this.appendAIMessage(msg.text, false); // false = don't stream
            });
        }
        this.renderHistoryList();
    }

    deleteChat(id) {
        this.chatHistory = this.chatHistory.filter(c => c.id !== id);
        this.saveHistoryToStorage();
        if (this.currentChatId === id) {
            if (this.chatHistory.length > 0) {
                this.loadChat(this.chatHistory[0].id);
            } else {
                this.startNewChat();
            }
        } else {
            this.renderHistoryList();
        }
    }

    renderHistoryList() {
        if (this.chatHistory.length === 0) {
            this.elements.historyList.innerHTML = '<li class="empty">No history</li>';
            return;
        }
        
        this.elements.historyList.innerHTML = this.chatHistory.map(chat => `
            <li data-id="${chat.id}" class="${chat.id === this.currentChatId ? 'active' : ''}">
                <span class="history-item-text">${chat.title}</span>
                <button class="history-item-delete-btn">&times;</button>
            </li>
        `).join('');
    }

    appendUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'chat-message user-message';
        div.innerHTML = `<div class="message-avatar">You</div><div class="message-content"><p>${this.escapeHtml(text)}</p></div>`;
        this.elements.log.appendChild(div);
        this.scrollToBottom();
    }

    appendAIMessage(htmlContent, isNew = true) {
        const div = document.createElement('div');
        div.className = 'chat-message ai-message';
        div.innerHTML = `<div class="message-avatar">🤖</div><div class="message-content">${isNew ? htmlContent : this.renderMarkdown(htmlContent)}</div>`;
        this.elements.log.appendChild(div);
        this.scrollToBottom();
    }

    async handleSubmit() {
        const text = this.elements.input.value.trim();
        if (!text) return;

        this.elements.input.value = '';
        this.elements.input.style.height = 'auto';

        // 1. Update History Object
        const currentChat = this.chatHistory.find(c => c.id === this.currentChatId);
        if (currentChat) {
            if (currentChat.messages.length === 0) {
                currentChat.title = text.substring(0, 30) + (text.length > 30 ? '...' : '');
                this.renderHistoryList();
            }
            currentChat.messages.push({ role: 'user', text: text });
        }

        // 2. Show User Message
        this.appendUserMessage(text);

        // 3. Show Loading
        const loadingId = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = loadingId;
        loadingDiv.className = 'chat-message ai-message typing-indicator';
        loadingDiv.innerHTML = `<div class="message-avatar">🤖</div><div class="message-content"><div class="dots">Thinking...</div></div>`;
        this.elements.log.appendChild(loadingDiv);
        this.scrollToBottom();

        try {
            // 4. Call AI
            const response = await this.ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: text
            });

            const responseText = response.text;
            
            // Remove loading
            document.getElementById(loadingId).remove();

            // Save AI response
            if (currentChat) {
                currentChat.messages.push({ role: 'model', text: responseText });
                this.saveHistoryToStorage();
            }

            // Render AI Response
            const renderedHTML = this.renderMarkdown(responseText);
            this.appendAIMessage(renderedHTML, true);

        } catch (error) {
            document.getElementById(loadingId).remove();
            console.error("AI Error", error);
            this.appendAIMessage(`<p style="color:red;">Error: ${error.message || 'Could not connect to AI.'}</p>`, true);
        }
    }

    renderMarkdown(text) {
        // Custom renderer to wrap code blocks with toolbar
        const renderer = new marked.Renderer();
        renderer.code = (code, language) => {
             const validLang = language || 'plaintext';
             return `
                <div class="code-wrapper">
                    <div class="code-toolbar">
                        <button data-action="copy">Copy</button>
                        <button data-action="preview">Preview</button>
                        <button data-action="edit">Edit</button>
                    </div>
                    <pre><code class="language-${validLang}">${code}</code></pre>
                </div>
             `;
        };
        
        const rawHtml = marked.parse(text, { renderer: renderer });
        return DOMPurify.sanitize(rawHtml);
    }

    toggleEditMode(preElement) {
        const codeElement = preElement.querySelector('code');
        const currentCode = codeElement.innerText;
        const wrapper = preElement.parentElement; // .code-wrapper
        
        const textarea = document.createElement('textarea');
        textarea.className = 'code-editor';
        textarea.value = currentCode;
        
        const saveBtn = document.createElement('button');
        saveBtn.className = 'save-code-btn';
        saveBtn.textContent = 'Save & Preview';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'cancel-code-btn';
        cancelBtn.textContent = 'Cancel';
        
        const editContainer = document.createElement('div');
        editContainer.className = 'edit-container';
        editContainer.appendChild(textarea);
        
        const actions = document.createElement('div');
        actions.className = 'edit-actions';
        actions.appendChild(cancelBtn);
        actions.appendChild(saveBtn);
        editContainer.appendChild(actions);
        
        preElement.style.display = 'none';
        wrapper.appendChild(editContainer);
        
        saveBtn.onclick = () => {
            const newCode = textarea.value;
            codeElement.innerText = newCode;
            this.openPreview(newCode);
            editContainer.remove();
            preElement.style.display = 'block';
        };
        
        cancelBtn.onclick = () => {
            editContainer.remove();
            preElement.style.display = 'block';
        };
    }

    openPreview(code) {
        this.elements.previewIframe.srcdoc = code;
        this.elements.previewModal.classList.add('active');
    }

    scrollToBottom() {
        this.elements.log.scrollTop = this.elements.log.scrollHeight;
    }

    escapeHtml(text) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }
}

// --- 3. Initialize ---
injectResources();
// Wait for DOM to receive injected elements
setTimeout(() => {
    window.aiChatWidget = new ChatWidget();
}, 100);
