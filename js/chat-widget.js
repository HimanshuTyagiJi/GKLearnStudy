import { GoogleGenAI } from "https://esm.run/@google/genai";
import { marked } from "https://esm.run/marked@12.0.2";
import DOMPurify from "https://esm.run/dompurify@3.0.8";

// --- 1. HTML Injection (Only if missing) ---
function injectWidgetHTML() {
    // If the widget already exists, don't inject again
    if (document.getElementById('ai-chat-widget')) return;

    const widgetHTML = `
    <button id="ai-widget-toggle-btn" aria-label="Toggle AI Chat" style="z-index: 10000;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 13.5C20 13.09 19.67 12.75 19.25 12.75C18.83 12.75 18.5 13.09 18.5 13.5V14.5C18.5 17.26 16.26 19.5 13.5 19.5C13.09 19.5 12.75 19.83 12.75 20.25C12.75 20.67 13.09 21 13.5 21C17.09 21 20 18.09 20 14.5V13.5M10.5 3C7.91 3 5.5 5.41 5.5 8V9C5.5 9.41 5.17 9.75 4.75 9.75C4.33 9.75 4 9.41 4 9V8C4 4.91 6.91 2 10.5 2C14.09 2 17 4.91 17 8V9C17 9.41 16.67 9.75 16.25 9.75C15.83 9.75 15.5 9.41 15.5 9V8C15.5 5.41 13.09 3 10.5 3M10.5 13.5C10.5 13.09 10.17 12.75 9.75 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H9.75C10.17 11.25 10.5 10.91 10.5 10.5C10.5 10.09 10.17 9.75 9.75 9.75H8C6.75 9.75 5.75 10.75 5.75 12C5.75 13.25 6.75 14.25 8 14.25H9.75C10.17 14.25 10.5 13.91 10.5 13.5M16 12.75H14.25C13.83 12.75 13.5 13.09 13.5 13.5C13.5 13.91 13.83 14.25 14.25 14.25H16C17.25 14.25 18.25 13.25 18.25 12C18.25 10.75 17.25 9.75 16 9.75H14.25C13.83 9.75 13.5 10.09 13.5 10.5C13.5 10.91 13.83 11.25 14.25 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"></path></svg>
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
                <ul id="history-list">
                    <li>No history yet.</li>
                </ul>
            </aside>

            <section id="chat-area">
                <header class="chat-header">
                     <div class="chat-header-left">
                        <button id="menu-toggle" aria-label="Toggle History Menu">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
                        </button>
                        <h1>AI Solver</h1>
                        <button id="new-chat-btn" aria-label="Start New Chat">New Chat</button>
                    </div>
                    <div class="chat-header-right">
                        <button id="full-view-btn" aria-label="Toggle Full View">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17H7V14H5V19H10V17Z"></path></svg>
                        </button>
                        <button id="close-widget-btn" aria-label="Close Chat">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                        </button>
                    </div>
                </header>
                <div id="chat-log" role="log" aria-live="polite">
                    <!-- Initial message will be injected by logic -->
                </div>
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
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '0';
    container.style.height = '0';
    container.style.pointerEvents = 'none'; 
    container.innerHTML = widgetHTML;
    
    document.body.appendChild(container);

    // Inject CSS if missing
    if (!document.querySelector('link[href="css/chat-widget.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/chat-widget.css';
        document.head.appendChild(link);
    }
    // Inject Search Data if missing
    if (!document.querySelector('script[src="js/search-data.js"]')) {
        const script = document.createElement('script');
        script.src = '/js/search-data.js';
        document.head.appendChild(script);
    }
}

// --- 2. Main App Logic ---
function initializeApp() {
    // Ensure HTML is present before we try to get elements
    injectWidgetHTML();

    // Helper to get elements safely
    const get = (id) => document.getElementById(id);

    // Variables
    let ai;
    let chatHistory = [];
    let currentChatIndex = -1; 
    const placeholders = [
        "2+2 का हल करें...", "होली पर निबंध लिखें...", "What is photosynthesis?", "Write HTML for a login form...", "vyakaran kya hai?", "Tell me a story about a lion."
    ];
    let placeholderIndex = 0;

    // Get Elements
    const historyPanel = get('history-panel');
    const chatLog = get('chat-log');
    const questionInput = get('question-input');
    const historyList = get('history-list');
    const widgetToggleBtn = get('ai-widget-toggle-btn');
    const chatWidget = get('ai-chat-widget');
    const closeWidgetBtn = get('close-widget-btn');
    const fullViewBtn = get('full-view-btn');
    const newChatBtn = get('new-chat-btn');
    const form = get('ai-solver-form');

    // Initialize Sequence
    try {
        // 1. Initialize AI Client
        ai = new GoogleGenAI({ apiKey: "AIzaSyADifk5i87QT2q5EaChypYmfu4NalKcUiU" });
    } catch (error) {
        console.error("AI Client Init Error:", error);
        // We do NOT stop execution here, so the UI (search fallback) still works.
    }

    // 2. Attach Event Listeners (Critical step)
    attachEventListeners();

    // 3. Load History or Start New Chat
    loadHistory();

    // 4. Start Placeholder Animation
    setInterval(updatePlaceholder, 4000);


    // --- Functions ---

    function attachEventListeners() {
        if(widgetToggleBtn) widgetToggleBtn.addEventListener('click', openWidget);
        if(closeWidgetBtn) closeWidgetBtn.addEventListener('click', closeWidget);
        if(fullViewBtn) fullViewBtn.addEventListener('click', () => chatWidget.classList.toggle('full-view'));
        if(newChatBtn) newChatBtn.addEventListener('click', startNewChat);
        
        get('menu-toggle')?.addEventListener('click', () => historyPanel.classList.toggle('active'));
        get('close-history-btn')?.addEventListener('click', () => historyPanel.classList.remove('active'));
        
        // Send Logic
        if(form) form.addEventListener('submit', handleFormSubmit);
        if(questionInput) {
            questionInput.addEventListener('keydown', handleInputKeyDown);
            questionInput.addEventListener('input', autoResizeTextarea);
        }

        get('clear-history-btn')?.addEventListener('click', clearHistory);
        historyList?.addEventListener('click', handleHistoryClick);
        
        get('close-preview-btn')?.addEventListener('click', () => get('preview-modal').classList.remove('active'));
        
        // Delegation for dynamic buttons (copy, preview, edit)
        chatLog?.addEventListener('click', handleChatLogClicks);
    }
    
    function openWidget() {
        chatWidget.classList.add('active');
        if(widgetToggleBtn) widgetToggleBtn.style.display = 'none';
        // Auto scroll to bottom
        setTimeout(() => {
             chatLog.scrollTop = chatLog.scrollHeight;
        }, 50);
    }

    function closeWidget() {
        chatWidget.classList.remove('active');
        if(widgetToggleBtn) widgetToggleBtn.style.display = 'flex';
    }

    function startNewChat() {
        currentChatIndex = -1;
        chatLog.innerHTML = `
            <div class="chat-message ai-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ? आप गणित, विज्ञान, इतिहास या किसी भी विषय पर सवाल पूछ सकते हैं।</p>
                </div>
            </div>`;
        questionInput.value = '';
        autoResizeTextarea();
        renderHistoryList(); 
        historyPanel.classList.remove('active');
    }

    function handleFormSubmit(e) {
        e.preventDefault(); // Stop page reload
        const userQuestion = questionInput.value.trim();
        if (userQuestion) {
            appendMessage(userQuestion, 'user');
            submitQuestionToAI(userQuestion);
            questionInput.value = '';
            autoResizeTextarea();
        }
    }

    function handleInputKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent newline
            handleFormSubmit(e); // Submit form
        }
    }

    // --- Handling History Clicks (Load & Delete) ---
    function handleHistoryClick(e) {
        // Check for delete button first
        const deleteBtn = e.target.closest('.history-item-delete-btn');
        if (deleteBtn) {
            e.stopPropagation(); // Prevent triggering loadChat
            const li = deleteBtn.closest('li');
            if (li && li.dataset.index) {
                const indexToDelete = parseInt(li.dataset.index, 10);
                if (confirm('Delete this chat?')) {
                    deleteHistoryItem(indexToDelete);
                }
            }
            return; 
        }

        // Load chat
        const li = e.target.closest('li');
        if (li && li.dataset.index) {
            const index = parseInt(li.dataset.index, 10);
            loadChatFromHistory(index);
            historyPanel.classList.remove('active');
        }
    }
    
    // --- Handling Code Block Buttons (Copy, Preview, Edit) ---
    function handleChatLogClicks(e) {
        const button = e.target.closest('button[data-action]');
        
        // Handle "Try Again" or other non-toolbar buttons here if needed
        if (!button) {
             const tryAgainButton = e.target.closest('.btn-try-again');
             if (tryAgainButton) {
                const questionToRetry = tryAgainButton.dataset.question;
                tryAgainButton.closest('.chat-message').remove(); 
                submitQuestionToAI(questionToRetry);
            }
            return;
        }

        const action = button.dataset.action;
        const aiMessage = button.closest('.ai-message');
        // The pre block is usually next sibling or parent depending on layout, 
        // but here buttons are inside .code-toolbar inside the pre/div wrapper.
        const pre = button.closest('.code-toolbar').nextElementSibling; // Assuming structure <toolbar><pre>

        switch (action) {
            case 'copy':
                if (pre) {
                    const codeEl = pre.querySelector('code');
                    navigator.clipboard.writeText(codeEl.textContent).then(() => {
                        const originalText = button.innerHTML;
                        button.textContent = 'Copied!';
                        setTimeout(() => button.innerHTML = originalText, 2000);
                    });
                }
                break;
            case 'preview':
                if (aiMessage) {
                    showCombinedPreview(aiMessage);
                }
                break;
            case 'edit':
                if (pre) {
                   enterEditMode(pre);
                } else {
                    // Edit user message logic
                    const userMessageDiv = button.closest('.user-message');
                    if (userMessageDiv) {
                        const messageText = userMessageDiv.querySelector('p').textContent;
                        questionInput.value = messageText;
                        questionInput.focus();
                        autoResizeTextarea();
                        userMessageDiv.remove();
                        // Remove subsequent AI response if exists
                         if (userMessageDiv.nextElementSibling && userMessageDiv.nextElementSibling.classList.contains('ai-message')) {
                            userMessageDiv.nextElementSibling.remove();
                        }
                        // Update history state logic (remove last interaction)
                        if (currentChatIndex !== -1 && chatHistory[currentChatIndex]) {
                            chatHistory[currentChatIndex].conversation.pop();
                            localStorage.setItem('aiChatHistory', JSON.stringify(chatHistory));
                        }
                    }
                }
                break;
        }
    }

    const escapeHTML = s => String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);

    function appendMessage(content, type) {
        const isUser = type === 'user';
        const avatarChar = isUser ? 'You' : '🤖';
        const avatarColor = isUser ? 'var(--primary-color)' : '#19c37d';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}-message`;

        if (isUser) {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${escapeHTML(content)}</p>
                    <button class="edit-btn" data-action="edit" aria-label="Edit message" style="display:none;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z"></path></svg>
                    </button>
                </div>
                <div class="message-avatar" style="background-color: ${avatarColor};">${avatarChar}</div>`;
        } else {
             messageDiv.innerHTML = `
                <div class="message-avatar" style="background-color: ${avatarColor};">${avatarChar}</div>
                <div class="message-content"><p>${escapeHTML(content)}</p></div>`;
        }

        chatLog.appendChild(messageDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
        return messageDiv;
    }

    function appendResponse(htmlContent) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message ai-message';
        messageDiv.innerHTML = `
            <div class="message-avatar" style="background-color: #19c37d;">🤖</div>
            <div class="message-content">${htmlContent}</div>
        `;
        chatLog.appendChild(messageDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
    }
    
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'chat-message ai-message typing-indicator';
        indicator.innerHTML = `
            <div class="message-avatar" style="background-color: #19c37d;">🤖</div>
            <div class="message-content"><p>Thinking...</p></div>
        `;
        chatLog.appendChild(indicator);
        chatLog.scrollTop = chatLog.scrollHeight;
        return indicator;
    }

    async function submitQuestionToAI(userQuestion) {
        const indicator = showTypingIndicator();
        let contextPromptPart = "";
        
        // --- Website Search Context Integration ---
        try {
            if (window.GKApp && window.GKApp.dataReady) {
                await window.GKApp.dataReady;
            }
            
            if (window.GKApp && window.GKApp.fuzzySearch && window.GKApp.searchData) {
                 const searchResults = window.GKApp.fuzzySearch(userQuestion, window.GKApp.searchData);
                 
                 if (searchResults && searchResults.length > 0) {
                    const topResults = searchResults.slice(0, 3);
                    contextPromptPart = `
**WEBSITE CONTEXT (gklearnstudy.in):**
${topResults.map((item, idx) => `
[${idx+1}] Title: ${item.title}
URL: ${item.url}
Snippet: ${item.paragraph}
`).join('\n')}

**INSTRUCTION:** If the user's question matches the context, use it. Add a "Source" link at the end.
`;
                 }
            }
        } catch (e) {
            console.warn("Search context unavailable:", e);
        }

        const finalPrompt = `${contextPromptPart}\n\n**QUESTION:** ${userQuestion}`;

        const systemInstruction = `You are an expert AI assistant for GK Learn Study.
        1. Answer in detail using Markdown.
        2. If explaining code, use \`\`\`language blocks.
        3. Be helpful and polite.`;

        try {
            if (!ai) throw new Error("AI Client not initialized.");

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: finalPrompt,
                config: { systemInstruction: systemInstruction }
            });
            
            const solutionText = response.text;
            indicator.remove();
            renderResponse(solutionText);
            saveNewHistory(userQuestion, solutionText);
            
        } catch (apiError) {
            console.error("API Error:", apiError);
            indicator.remove();
            
            // --- FALLBACK: Local Search if API fails ---
            let fallbackHTML = `<p style="color:var(--danger-color);">Connection Issue. Searching local database...</p>`;
            
            if (window.GKApp && window.GKApp.fuzzySearch && window.GKApp.searchData) {
                 const results = window.GKApp.fuzzySearch(userQuestion, window.GKApp.searchData);
                 if (results && results.length > 0) {
                     fallbackHTML += `<p><strong>Here are some related articles:</strong></p>`;
                     results.slice(0, 3).forEach(item => {
                         fallbackHTML += `<div class="source-box">
                            <strong><a href="${item.url}" target="_blank">${item.title}</a></strong><br>
                            ${item.paragraph.substring(0, 100)}...
                         </div>`;
                     });
                     appendResponse(fallbackHTML);
                     saveNewHistory(userQuestion, "Local Search Results Provided (Offline Mode)");
                 } else {
                     appendResponse(`<p style="color:var(--danger-color);">No results found in local database.</p>`);
                 }
            } else {
                 appendResponse(`<p style="color:var(--danger-color);">Service unavailable. Please check internet connection.</p>`);
            }
        }
    }

    function renderResponse(text) {
        // Split by code blocks to handle formatting and toolbar injection
        const parts = text.split(/(\`\`\`[\s\S]*?\`\`\`)/g);
        let finalHTML = '';

        parts.forEach(part => {
            if (part.startsWith('```')) {
                const lang = (part.match(/^```(\w*)/)?.[1] || '').toLowerCase();
                // Remove ticks
                const code = escapeHTML(part.replace(/^```\w*\n|```$/g, ''));

                finalHTML += `
                    <div class="code-wrapper-container" style="position: relative;">
                        <div class="code-toolbar">
                            <button data-action="copy"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg> Copy</button>
                            <button data-action="preview"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path></svg> Preview</button>
                            <button data-action="edit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z"></path></svg> Edit</button>
                        </div>
                        <pre data-lang="${lang}"><code>${code}</code></pre>
                    </div>`;
            } else if (part.trim()){
                const unsafeHtml = marked.parse(part);
                finalHTML += DOMPurify.sanitize(unsafeHtml, { ADD_ATTR: ['target'] });
            }
        });
        appendResponse(finalHTML);
    }
    
    function showCombinedPreview(aiMessageElement) {
        let htmlCode = '', cssCode = '', jsCode = '';
        const codeBlocks = aiMessageElement.querySelectorAll('pre');

        codeBlocks.forEach(block => {
            const lang = block.dataset.lang || '';
            const codeContent = block.querySelector('code').textContent;
            if (lang === 'html') {
                htmlCode += codeContent + '\n';
            } else if (lang === 'css') {
                cssCode += codeContent + '\n';
            } else if (lang === 'javascript' || lang === 'js') {
                jsCode += codeContent + '\n';
            }
        });

        if (!htmlCode && !cssCode && !jsCode) {
             // If no specific blocks, try to render whatever code is there
             if (codeBlocks.length > 0) {
                 htmlCode = codeBlocks[0].querySelector('code').textContent;
             } else {
                 alert("No code found to preview.");
                 return;
             }
        }

        if (!htmlCode.includes('<html>')) { 
             // Wrap snippets
             const styleTag = cssCode ? `<style>${cssCode}</style>` : '';
             const scriptTag = jsCode ? `<script>${jsCode}<\/script>` : '';
             htmlCode = `<!DOCTYPE html><html><head><title>Preview</title>${styleTag}</head><body>${htmlCode}${scriptTag}</body></html>`;
        }

        document.getElementById('preview-iframe').srcdoc = htmlCode;
        document.getElementById('preview-modal').classList.add('active');
    }
    
    function enterEditMode(preElement) {
        // Find the wrapper container (the parent div)
        const container = preElement.closest('.code-wrapper-container');
        const originalCode = preElement.querySelector('code').textContent;
        
        const editorWrapper = document.createElement('div');
        editorWrapper.className = 'code-editor-wrapper';
        
        editorWrapper.innerHTML = `
            <textarea class="code-editor"></textarea>
            <div class="code-editor-actions">
                <button class="cancel-edit-btn">Cancel</button>
                <button class="save-preview-btn">Update & Preview</button>
            </div>
        `;
        
        const textarea = editorWrapper.querySelector('textarea');
        textarea.value = originalCode;
        
        // Replace the pre element (or the whole container)
        container.style.display = 'none';
        container.parentNode.insertBefore(editorWrapper, container.nextSibling);
        
        textarea.style.height = (textarea.scrollHeight) + 'px';
        textarea.focus();

        editorWrapper.querySelector('.cancel-edit-btn').addEventListener('click', () => {
            editorWrapper.remove();
            container.style.display = 'block';
        });

        editorWrapper.querySelector('.save-preview-btn').addEventListener('click', () => {
            const newCode = textarea.value;
            // Update the original PRE
            preElement.querySelector('code').textContent = newCode;
            
            editorWrapper.remove();
            container.style.display = 'block';
            
            // Trigger preview immediately
            const aiMessage = container.closest('.ai-message');
            if (aiMessage) {
                showCombinedPreview(aiMessage);
            }
        });
    }

    // --- History Management ---

    function loadHistory() {
        try {
            const saved = localStorage.getItem('aiChatHistory');
            chatHistory = (saved && Array.isArray(JSON.parse(saved))) ? JSON.parse(saved) : [];
        } catch {
            chatHistory = [];
        }
        renderHistoryList();

        // AUTO LOAD: If history exists, load the first chat. If not, show new chat screen.
        if (chatHistory.length > 0) {
            loadChatFromHistory(0); 
        } else {
            startNewChat();
        }
    }

    function saveNewHistory(question, answer) {
        if (currentChatIndex === -1) {
             chatHistory.unshift({ conversation: [{ question, answer }] });
        } else if (chatHistory[currentChatIndex]) {
             chatHistory[currentChatIndex].conversation.push({ question, answer });
        }
        
        if (chatHistory.length > 50) chatHistory.pop();
        localStorage.setItem('aiChatHistory', JSON.stringify(chatHistory));
        if (currentChatIndex === -1) currentChatIndex = 0; 
        renderHistoryList();
    }

    function renderHistoryList() {
        if (!historyList) return;
        historyList.innerHTML = chatHistory.map((item, index) => {
            const firstQuestion = item?.conversation?.[0]?.question || 'Empty Chat';
            return `<li data-index="${index}" class="${index === currentChatIndex ? 'active' : ''}">
                       <span class="history-item-text">${escapeHTML(firstQuestion)}</span>
                       <button class="history-item-delete-btn" aria-label="Delete this chat">&times;</button>
                    </li>`;
        }).join('') || '<li>No history yet.</li>';
    }

    function loadChatFromHistory(index) {
        if (chatHistory[index] && chatHistory[index].conversation) {
            currentChatIndex = index;
            const conversation = chatHistory[index].conversation;
            chatLog.innerHTML = ''; // Clear current view
            conversation.forEach((turn, turnIndex) => {
                appendMessage(turn.question, 'user');
                renderResponse(turn.answer);
            });
            renderHistoryList(); // Update active state in sidebar
        }
    }

    function deleteHistoryItem(index) {
        if (index < 0 || index >= chatHistory.length) return;
        chatHistory.splice(index, 1);
        localStorage.setItem('aiChatHistory', JSON.stringify(chatHistory));

        if (currentChatIndex === index) {
            // If we deleted the current chat, either load the previous one or start new
            if (chatHistory.length > 0) {
                loadChatFromHistory(0);
            } else {
                startNewChat();
            }
        } else {
            if (currentChatIndex > index) {
                currentChatIndex--;
            }
            renderHistoryList();
        }
    }

    function clearHistory() {
        if (confirm('Are you sure you want to clear all chat history?')) {
            chatHistory = [];
            currentChatIndex = -1;
            localStorage.removeItem('aiChatHistory');
            renderHistoryList();
            startNewChat();
        }
    }

    function updatePlaceholder() {
        if (questionInput) {
            placeholderIndex = (placeholderIndex + 1) % placeholders.length;
            questionInput.placeholder = placeholders[placeholderIndex];
        }
    }

    function autoResizeTextarea() {
        if(questionInput) {
            questionInput.style.height = 'auto';
            questionInput.style.height = (questionInput.scrollHeight) + 'px';
        }
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
