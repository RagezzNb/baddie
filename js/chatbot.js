// Static Chatbot with Gen Z personality
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.userMemory = [];
        this.responses = {};
        this.isTyping = false;
        
        this.init();
    }

    init() {
        this.loadChatbotData();
        this.loadHistory();
        this.bindEvents();
        this.showWelcomeMessage();
    }

    loadChatbotData() {
        // Load responses from the chatbot data file
        if (window.chatbotResponses) {
            this.responses = window.chatbotResponses;
        } else {
            // Fallback responses if data file doesn't load
            this.responses = {
                greetings: [
                    "yooo what's good! welcome to sephyx 🔥",
                    "ayy welcome to the digital underground fam",
                    "wassup! ready to get that drip? 💧"
                ],
                about_orders: [
                    "yo we only do COD in qatar rn, but the drip is worth it fr 💯",
                    "just hit up our insta @sephyxofficial to place orders, we got you covered",
                    "cash on delivery only in qatar, but trust the process bestie"
                ],
                style_advice: [
                    "oversized hoodies with cargo pants = unmatched drip energy",
                    "layer that crop tee over a long sleeve, thank me later 🔥",
                    "black on black never misses, but add some neon accessories"
                ],
                fallback: [
                    "ngl i'm not sure about that one chief, try asking something else",
                    "hmm that's not computing rn, what else you need help with?",
                    "my ai brain is lagging, can you rephrase that? 💀"
                ]
            };
        }
    }

    loadHistory() {
        this.conversationHistory = StorageManager.get('chatHistory', []);
        this.renderMessages();
    }

    bindEvents() {
        // Toggle chatbot
        const toggleBtn = document.getElementById('chatbot-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleChat());
        }

        // Close chatbot
        const closeBtn = document.getElementById('chatbot-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeChat());
        }

        // Send message
        const sendBtn = document.getElementById('chatbot-send');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        // Input handling
        const input = document.getElementById('chatbot-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });

            input.addEventListener('input', () => {
                this.handleTypingIndicator();
            });
        }
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        const chatWindow = document.getElementById('chatbot-window');
        if (chatWindow) {
            chatWindow.classList.add('open');
            
            // Focus input
            const input = document.getElementById('chatbot-input');
            if (input) {
                setTimeout(() => input.focus(), 300);
            }
        }
    }

    closeChat() {
        this.isOpen = false;
        const chatWindow = document.getElementById('chatbot-window');
        if (chatWindow) {
            chatWindow.classList.remove('open');
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        if (!input) return;

        const message = input.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage('user', message);
        
        // Clear input
        input.value = '';
        
        // Update memory
        this.updateUserMemory(message);
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage('bot', response);
        }, 1000 + Math.random() * 1000); // Random delay for realism
    }

    addMessage(sender, text) {
        const message = {
            sender,
            text,
            timestamp: new Date().toISOString()
        };

        this.conversationHistory.push(message);
        
        // Keep only last 50 messages
        if (this.conversationHistory.length > 50) {
            this.conversationHistory.shift();
        }

        // Save to storage
        StorageManager.addChatMessage(message);
        
        // Render message
        this.renderMessage(message);
        
        // Scroll to bottom
        this.scrollToBottom();
    }

    renderMessages() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        messagesContainer.innerHTML = '';
        
        this.conversationHistory.forEach(message => {
            this.renderMessage(message);
        });
        
        this.scrollToBottom();
    }

    renderMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${message.sender}`;
        
        const time = new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageElement.innerHTML = `
            <div class="message-content">
                <p>${this.formatMessage(message.text)}</p>
                <span class="message-time">${time}</span>
            </div>
        `;

        messagesContainer.appendChild(messageElement);
        
        // Add CSS if not already added
        this.addChatStyles();
        
        // Animate in
        messageElement.classList.add('fade-in');
    }

    showWelcomeMessage() {
        // Show welcome message if no history
        if (this.conversationHistory.length === 0) {
            setTimeout(() => {
                const welcomeMessage = this.getRandomResponse('greetings');
                this.addMessage('bot', welcomeMessage);
            }, 1000);
        }
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const typingElement = document.createElement('div');
        typingElement.className = 'chat-message bot typing-indicator';
        typingElement.id = 'typing-indicator';
        typingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typingElement);
        this.scrollToBottom();
        this.isTyping = true;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }

    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Check for specific keywords and topics
        if (this.containsKeywords(lowerMessage, ['order', 'buy', 'purchase', 'checkout', 'payment'])) {
            return this.getRandomResponse('about_orders');
        }
        
        if (this.containsKeywords(lowerMessage, ['style', 'outfit', 'fit', 'look', 'wear', 'match'])) {
            return this.getRandomResponse('style_advice');
        }
        
        if (this.containsKeywords(lowerMessage, ['hello', 'hi', 'hey', 'sup', 'yo'])) {
            return this.getRandomResponse('greetings');
        }
        
        if (this.containsKeywords(lowerMessage, ['price', 'cost', 'expensive', 'cheap', 'money'])) {
            return "prices are on the product pages fam, everything's worth the investment 💰";
        }
        
        if (this.containsKeywords(lowerMessage, ['size', 'sizing', 'fit'])) {
            return "we got sizes S to XXL, most fits are oversized so size down if you want regular fit 📏";
        }
        
        if (this.containsKeywords(lowerMessage, ['shipping', 'delivery', 'when'])) {
            return "we deliver same day in qatar with COD, hit up the gram for orders 🚚";
        }
        
        if (this.containsKeywords(lowerMessage, ['quality', 'material', 'fabric'])) {
            return "premium materials only, we don't do fast fashion here bestie ✨";
        }
        
        if (this.containsKeywords(lowerMessage, ['vault', 'secret', 'hidden'])) {
            return "👀 some things are meant to be discovered... keep exploring the site";
        }
        
        if (this.containsKeywords(lowerMessage, ['discount', 'sale', 'coupon'])) {
            return "no discounts needed when the drip is already priceless 💎 but follow our insta for drops";
        }

        // Personality responses
        if (this.containsKeywords(lowerMessage, ['thanks', 'thank you', 'appreciate'])) {
            return "no cap, you're welcome! anything else you need? 🙏";
        }
        
        if (this.containsKeywords(lowerMessage, ['love', 'amazing', 'fire', 'sick'])) {
            return "ayy you got taste! that's what sephyx is all about 🔥";
        }

        // Gen Z comebacks
        if (this.containsKeywords(lowerMessage, ['boring', 'mid', 'trash', 'ugly'])) {
            return "SYBAU lil bro 💀 this ain't for everyone, only the cultured understand";
        }

        // Default fallback with some personality
        const fallbacks = [
            ...this.responses.fallback,
            "nah i'm not picking up what you're putting down, try again chief",
            "my circuits are confused rn, what you really trying to ask? 🤖",
            "that's not in my database bestie, ask me about fits or orders"
        ];
        
        return this.getRandomResponse(null, fallbacks);
    }

    containsKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }

    getRandomResponse(category, customResponses = null) {
        const responses = customResponses || this.responses[category] || this.responses.fallback;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    updateUserMemory(message) {
        this.userMemory.push(message);
        
        // Keep only last 5 messages for context
        if (this.userMemory.length > 5) {
            this.userMemory.shift();
        }
    }

    formatMessage(text) {
        // Add emoji and styling
        return text
            .replace(/:\)/g, '😊')
            .replace(/:\(/g, '😢')
            .replace(/:D/g, '😃')
            .replace(/fire/gi, '🔥')
            .replace(/drip/gi, '💧')
            .replace(/sephyx/gi, '<span class="brand-name">SEPHYX</span>');
    }

    handleTypingIndicator() {
        // Could add "bot is typing" when user is typing
        // For now, we'll skip this to keep it simple
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    addChatStyles() {
        if (document.getElementById('chat-styles')) return;

        const style = document.createElement('style');
        style.id = 'chat-styles';
        style.textContent = `
            .chat-message {
                margin-bottom: 1rem;
                animation: slideInUp 0.3s ease;
            }
            
            .chat-message.user {
                text-align: right;
            }
            
            .chat-message.bot {
                text-align: left;
            }
            
            .message-content {
                display: inline-block;
                max-width: 80%;
                padding: 0.8rem 1rem;
                border-radius: 15px;
                position: relative;
            }
            
            .chat-message.user .message-content {
                background: var(--primary-color);
                color: var(--bg-color);
                border-bottom-right-radius: 5px;
            }
            
            .chat-message.bot .message-content {
                background: var(--bg-secondary);
                color: var(--text-primary);
                border: 1px solid var(--border-color);
                border-bottom-left-radius: 5px;
            }
            
            .message-content p {
                margin: 0;
                word-wrap: break-word;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .message-time {
                font-size: 0.7rem;
                opacity: 0.6;
                display: block;
                margin-top: 0.25rem;
            }
            
            .brand-name {
                color: var(--primary-color);
                font-weight: bold;
                text-shadow: 0 0 10px var(--primary-color);
            }
            
            .typing-indicator .message-content {
                padding: 1rem;
            }
            
            .typing-dots {
                display: flex;
                gap: 4px;
                align-items: center;
            }
            
            .typing-dots span {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: var(--primary-color);
                animation: typingDots 1.4s infinite;
            }
            
            .typing-dots span:nth-child(2) {
                animation-delay: 0.2s;
            }
            
            .typing-dots span:nth-child(3) {
                animation-delay: 0.4s;
            }
            
            @keyframes typingDots {
                0%, 60%, 100% {
                    transform: scale(1);
                    opacity: 0.4;
                }
                30% {
                    transform: scale(1.2);
                    opacity: 1;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Clear chat history
    clearHistory() {
        this.conversationHistory = [];
        StorageManager.clearChatHistory();
        this.renderMessages();
        this.showWelcomeMessage();
    }

    // Get chat summary
    getChatSummary() {
        return {
            messageCount: this.conversationHistory.length,
            lastMessage: this.conversationHistory[this.conversationHistory.length - 1],
            isOpen: this.isOpen
        };
    }
}

// Export for global use
window.Chatbot = Chatbot;
