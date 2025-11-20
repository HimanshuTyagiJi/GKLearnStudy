
import { GoogleGenAI } from "https://esm.run/@google/genai";
import { marked } from "https://esm.run/marked@12.0.2";
import DOMPurify from "https://esm.run/dompurify@3.0.8";

// --- CONFIGURATION ---
const API_KEY = "AIzaSyADifk5i87QT2q5EaChypYmfu4NalKcUiU"; // Hardcoded as requested
const CHAT_STORAGE_KEY = 'aiChatHistory_v2';

// --- 1. INJECT HTML & CSS ---
function injectWidget() {
    if (document.getElementById('ai-chat-widget')) return; // Prevent duplicate injection

    // Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/chat-widget.css';
    document.head.appendChild(link);

    // Inject HTML
    const container = document.createElement('div');
    container.id = 'ai-widget-root';
    container.innerHTML = `
        <!-- Toggle Button -->
        <button id="ai-widget-toggle-btn" aria-label="Toggle AI Chat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 13.5C20 13.09 19.67 12.75 19.25 12.75C18.83 12.75 18.5 13.09 18.5 13.5V14.5C18.5 17.26 16.26 19.5 13.5 19.5C13.09 19.5 12.75 19.83 12.75 20.25C12.75 20.67 13.09 21 13.5 21C17.09 21 20 18.09 20 14.5V13.5M10.5 3C7.91 3 5.5 5.41 5.5 8V9C5.5 9.41 5.17 9.75 4.75 9.75C4.33 9.75 4 9.41 4 9V8C4 4.91 6.91 2 10.5 2C14.09 2 17 4.91 17 8V9C17 9.41 16.67 9.75 16.25 9.75C15.83 9.75 15.5 9.41 15.5 9V8C15.5 5.41 13.09 3 10.5 3M10.5 13.5C10.5 13.09 10.17 12.75 9.75 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H9.75C10.17 11.25 10.5 10.91 10.5 10.5C10.5 10.09 10.17 9.75 9.75 9.75H8C6.75 9.75 5.75 10.75 5.75 12C5.75 13.25 6.75 14.25 8 14.25H9.75C10.17 14.25 10.5 13.91 10.5 13.5M16 12.75H14.25C13.83 12.75 13.5 13.09 13.5 13.5C13.5 13.91 13.83 14.25 14.25 14.25H16C17.25 14.25 18.25 13.25 18.25 12C18.25 10.75 17.25 9.75 16 9.75H14.25C13.83 9.75 13.5 10.09 13.5 10.5C13.5 10.91 13.83 11.25 14.25 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"></path></svg>
        </button>

        <!-- Chat Widget Window -->
        <div id="ai-chat-widget">
            <div class="ai-container">
                <!-- History Sidebar -->
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

                <!-- Chat Area -->
                <section id="chat-area">
                    <header class="chat-header">
                        <div class="chat-header-left">
                            <button id="menu-toggle"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg></button>
                            <h1>AI Solver</h1>
                        </div>
                        <div class="chat-header-right">
                            <button id="new-chat-btn">New Chat</button>
                            <button id="full-view-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17H7V14H5V19H10V17Z"></path></svg></button>
                            <button id="close-widget-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg></button>
                        </div>
                    </header>

                    <div id="chat-log">
                        <div class="chat-message ai-message">
                            <div class="message-avatar">🤖</div>
                            <div class="message-content"><p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?</p></div>
                        </div>
                    </div>

                    <div class="chat-input-area">
                        <form id="ai-solver-form">
                            <textarea id="question-input" rows="1" placeholder="अपना सवाल यहाँ पूछें..." required></textarea>
                            <button type="submit" id="solve-button"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path></svg></button>
                        </form>
                    </div>
                </section>
            </div>
        </div>

        <!-- Preview Modal -->
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
    document.body.appendChild(container);
}

// --- 2. CONTROLLER LOGIC ---
class AIChatApp {
    constructor() {
        this.ai = new GoogleGenAI({ apiKey: API_KEY });
        this.chatHistory = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
        this.currentChatId = null;
        
        this.cacheElements();
        this.bindEvents();
        
        // Always ensure we are ready to chat
        if (this.chatHistory.length > 0) {
            this.loadChat(this.chatHistory[0].id);
        } else {
            this.startNewChat(false); // Don't clear UI if it's the very first load
        }
    }

    cacheElements() {
        const $ = (id) => document.getElementById(id);
        this.ui = {
            toggleBtn: $('ai-widget-toggle-btn'),
            widget: $('ai-chat-widget'),
            closeBtn: $('close-widget-btn'),
            fullViewBtn: $('full-view-btn'),
            menuBtn: $('menu-toggle'),
            historyPanel: $('history-panel'),
            closeHistoryBtn: $('close-history-btn'),
            clearHistoryBtn: $('clear-history-btn'),
            historyList: $('history-list'),
            newChatBtn: $('new-chat-btn'),
            form: $('ai-solver-form'),
            input: $('question-input'),
            log: $('chat-log'),
            previewModal: $('preview-modal'),
            closePreviewBtn: $('close-preview-btn'),
            previewIframe: $('preview-iframe')
        };
    }

    bindEvents() {
        // Widget Toggle
        this.ui.toggleBtn.onclick = () => {
            this.ui.widget.classList.add('active');
            this.ui.toggleBtn.style.display = 'none';
            setTimeout(() => this.ui.input.focus(), 100);
        };
        this.ui.closeBtn.onclick = () => {
            this.ui.widget.classList.remove('active');
            this.ui.toggleBtn.style.display = 'flex';
        };
        this.ui.fullViewBtn.onclick = () => this.ui.widget.classList.toggle('full-view');

        // History Menu
        this.ui.menuBtn.onclick = () => this.ui.historyPanel.classList.add('active');
        this.ui.closeHistoryBtn.onclick = () => this.ui.historyPanel.classList.remove('active');
        
        // Form Submit
        this.ui.form.onsubmit = (e) => {
            e.preventDefault();
            this.handleSendMessage();
        };
        this.ui.input.onkeydown = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        };
        this.ui.input.oninput = () => {
            this.ui.input.style.height = 'auto';
            this.ui.input.style.height = this.ui.input.scrollHeight + 'px';
        };

        // New Chat & Clear
        this.ui.newChatBtn.onclick = () => this.startNewChat(true);
        this.ui.clearHistoryBtn.onclick = () => {
            if(confirm('Clear all history?')) {
                this.chatHistory = [];
                this.saveHistory();
                this.startNewChat(true);
            }
        };

        // History List Delegation
        this.ui.historyList.onclick = (e) => {
            const li = e.target.closest('li');
            const delBtn = e.target.closest('.history-item-delete-btn');
            if (!li) return;
            
            const id = li.dataset.id;
            if (delBtn) {
                e.stopPropagation();
                this.deleteChat(id);
            } else {
                this.loadChat(id);
                this.ui.historyPanel.classList.remove('active');
            }
        };

        // Chat Log Delegation (Copy/Preview/Edit)
        this.ui.log.onclick = (e) => {
            const btn = e.target.closest('button[data-action]');
            if (!btn) return;
            const action = btn.dataset.action;
            const pre = btn.closest('pre');
            const aiMessage = btn.closest('.ai-message');

            if (action === 'copy' && pre) {
                const code = pre.querySelector('code').innerText;
                navigator.clipboard.writeText(code);
                const original = btn.innerHTML;
                btn.innerText = 'Copied!';
                setTimeout(() => btn.innerHTML = original, 2000);
            }
            if (action === 'preview' && aiMessage) {
                this.showPreview(aiMessage);
            }
            if (action === 'edit' && pre) {
                this.enterEditMode(pre);
            }
        };

        // Preview Modal
        this.ui.closePreviewBtn.onclick = () => {
            this.ui.previewModal.classList.remove('active');
        };
    }

    // --- CHAT LOGIC ---
    
    startNewChat(clearUI = false) {
        const id = Date.now().toString();
        const newChat = { id, title: 'New Chat', messages: [] };
        this.chatHistory.unshift(newChat);
        this.currentChatId = id;
        
        if (clearUI) {
            this.ui.log.innerHTML = `<div class="chat-message ai-message"><div class="message-avatar">🤖</div><div class="message-content"><p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?</p></div></div>`;
        }
        this.saveHistory();
        this.renderHistory();
    }

    loadChat(id) {
        const chat = this.chatHistory.find(c => c.id === id);
        if (!chat) return;
        
        this.currentChatId = id;
        this.ui.log.innerHTML = '';
        
        if (chat.messages.length === 0) {
             this.ui.log.innerHTML = `<div class="chat-message ai-message"><div class="message-avatar">🤖</div><div class="message-content"><p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?</p></div></div>`;
        } else {
            chat.messages.forEach(msg => {
                if (msg.role === 'user') this.appendUserMessage(msg.text);
                else this.appendAIMessage(msg.text, false);
            });
        }
        this.renderHistory();
    }

    deleteChat(id) {
        this.chatHistory = this.chatHistory.filter(c => c.id !== id);
        this.saveHistory();
        if (this.currentChatId === id) {
            this.chatHistory.length > 0 ? this.loadChat(this.chatHistory[0].id) : this.startNewChat(true);
        } else {
            this.renderHistory();
        }
    }

    saveHistory() {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.chatHistory));
    }

    renderHistory() {
        if (this.chatHistory.length === 0) {
            this.ui.historyList.innerHTML = '<li style="padding:15px;color:#666;">No history</li>';
            return;
        }
        this.ui.historyList.innerHTML = this.chatHistory.map(chat => `
            <li data-id="${chat.id}" class="${chat.id === this.currentChatId ? 'active' : ''}">
                <span>${chat.title}</span>
                <button class="history-item-delete-btn">&times;</button>
            </li>
        `).join('');
    }

    async handleSendMessage() {
        const text = this.ui.input.value.trim();
        if (!text) return;

        this.ui.input.value = '';
        this.ui.input.style.height = 'auto';

        // Ensure we have a valid chat object
        let currentChat = this.chatHistory.find(c => c.id === this.currentChatId);
        if (!currentChat) {
            this.startNewChat(false);
            currentChat = this.chatHistory[0];
        }

        // Update Title if first message
        if (currentChat.messages.length === 0) {
            currentChat.title = text.substring(0, 25) + (text.length > 25 ? '...' : '');
            this.renderHistory();
        }

        // Add User Message
        currentChat.messages.push({ role: 'user', text });
        this.appendUserMessage(text);
        this.saveHistory();

        // Show Loading
        const loadingId = 'loading-' + Date.now();
        const loadingHTML = `<div id="${loadingId}" class="chat-message ai-message"><div class="message-avatar">🤖</div><div class="message-content">Thinking...</div></div>`;
        this.ui.log.insertAdjacentHTML('beforeend', loadingHTML);
        this.scrollToBottom();

        try {
            const response = await this.ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: text
            });
            
            const aiText = response.text;
            document.getElementById(loadingId).remove();
            
            currentChat.messages.push({ role: 'model', text: aiText });
            this.saveHistory();
            
            this.appendAIMessage(aiText, true);
        } catch (err) {
            document.getElementById(loadingId).remove();
            console.error(err);
            this.appendAIMessage(`<p style="color:red">Error: ${err.message}</p>`, true);
        }
    }

    appendUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'chat-message user-message';
        div.innerHTML = `<div class="message-avatar">You</div><div class="message-content">${this.escapeHTML(text)}</div>`;
        this.ui.log.appendChild(div);
        this.scrollToBottom();
    }

    appendAIMessage(text, processMarkdown = true) {
        const div = document.createElement('div');
        div.className = 'chat-message ai-message';
        
        let content = text;
        if (processMarkdown) {
            content = this.parseMarkdown(text);
        }

        div.innerHTML = `<div class="message-avatar">🤖</div><div class="message-content">${content}</div>`;
        this.ui.log.appendChild(div);
        this.scrollToBottom();
    }

    parseMarkdown(text) {
        const renderer = new marked.Renderer();
        renderer.code = (code, lang) => {
            return `<div class="code-wrapper">
                <div class="code-toolbar">
                    <button data-action="copy">Copy</button>
                    <button data-action="preview">Preview</button>
                    <button data-action="edit">Edit</button>
                </div>
                <pre><code class="language-${lang || 'text'}">${code}</code></pre>
            </div>`;
        };
        return DOMPurify.sanitize(marked.parse(text, { renderer }));
    }

    showPreview(messageEl) {
        const codes = Array.from(messageEl.querySelectorAll('code'));
        let html = '', css = '', js = '';
        
        codes.forEach(block => {
            const lang = block.className.replace('language-', '');
            const txt = block.innerText;
            if(lang === 'html') html += txt;
            else if(lang === 'css') css += txt;
            else if(lang === 'js' || lang === 'javascript') js += txt;
        });

        if(!html && !css && !js) return alert('No code found to preview.');

        if(!html) html = '<!DOCTYPE html><html><body></body></html>';
        
        const content = `${html}<style>${css}</style><script>${js}<\/script>`;
        this.ui.previewIframe.srcdoc = content;
        this.ui.previewModal.classList.add('active');
    }

    enterEditMode(pre) {
        const code = pre.querySelector('code').innerText;
        const wrapper = pre.parentElement;
        
        const area = document.createElement('textarea');
        area.className = 'code-editor';
        area.value = code;
        area.style.width = '100%';
        area.style.minHeight = '150px';
        area.style.fontFamily = 'monospace';
        
        const saveBtn = document.createElement('button');
        saveBtn.innerText = 'Save & Preview';
        saveBtn.className = 'save-code-btn';
        saveBtn.onclick = () => {
             pre.querySelector('code').innerText = area.value;
             wrapper.innerHTML = ''; 
             wrapper.appendChild(pre.parentElement.querySelector('.code-toolbar')); // Re-append toolbar logic if needed, simplified here:
             // Actually, easier to just refresh the view logic or simply:
             pre.style.display = 'block';
             area.remove();
             saveBtn.remove();
             cancelBtn.remove();
             wrapper.appendChild(pre);
             this.showPreview(wrapper.closest('.ai-message'));
        };

        const cancelBtn = document.createElement('button');
        cancelBtn.innerText = 'Cancel';
        cancelBtn.className = 'cancel-code-btn';
        cancelBtn.onclick = () => {
            pre.style.display = 'block';
            area.remove();
            saveBtn.remove();
            cancelBtn.remove();
        };

        pre.style.display = 'none';
        wrapper.appendChild(area);
        wrapper.appendChild(cancelBtn);
        wrapper.appendChild(saveBtn);
    }

    scrollToBottom() {
        this.ui.log.scrollTop = this.ui.log.scrollHeight;
    }

    escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'}[tag]));
    }
}

// --- START ---
injectWidget();
window.addEventListener('DOMContentLoaded', () => {
    window.aiChatApp = new AIChatApp();
});
