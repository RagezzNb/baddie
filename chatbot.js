// Chatbot functionality
class SephyxChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = JSON.parse(localStorage.getItem('sephyx_chat_history')) || [];
        this.responses = {
            greetings: [
                "yo what's good? need some drip advice? 💀",
                "welcome to the sephyx dimension fr 🔥",
                "ready to level up your fit game? let's go",
                "what's the vibe today? need some cyberpunk energy?"
            ],
            style_advice: [
                "oversized hoodies with cargo pants = eternal drip formula ngl",
                "layer that neural interface mask with the eclipse drift hoodie for maximum cyberpunk energy",
                "quantum cargos + neon dawn tee = street certified combo 💯",
                "always go one size up for that futuristic oversized aesthetic",
                "accessories are everything - future chain hits different with any fit"
            ],
            ordering: [
                "just slide into our instagram dms @sephyxofficial with your order fam",
                "we only do cash on delivery in qatar rn but the drip is worth the wait",
                "dm us on insta with what you want + your size and we'll sort you out",
                "qatar cult members get priority delivery fr fr"
            ],
            general: [
                "sephyx isn't just a brand, it's a whole vibe honestly",
                "we're building the future of streetwear one fit at a time",
                "cyberpunk aesthetic meets qatar street culture = pure fire",
                "every piece is designed for the digital nomads and future rebels"
            ],
            sass: [
                "SYBAU lil bro 💀",
                "respectfully, your fit needs some work chief",
                "not you asking me to explain drip... that's concerning",
                "imagine not knowing about the sephyx movement in 2025 💀"
            ]
        };
        
        this.keywords = {
            style: ['fit', 'outfit', 'style', 'drip', 'wear', 'look', 'aesthetic', 'cyberpunk', 'oversized'],
            ordering: ['order', 'buy', 'purchase', 'delivery', 'cod', 'cash', 'qatar', 'dm', 'instagram'],
            greeting: ['hi', 'hello', 'hey', 'yo', 'sup', 'what up', 'good'],
            help: ['help', 'support', 'question', 'how', 'what', 'when', 'where'],
            brand: ['sephyx', 'brand', 'story', 'about', 'cult', 'future', 'streetwear']
        };
        
        this.setupEventListeners();
        this.loadChatHistory();
    }
    
    setupEventListeners() {
        const chatButton = document.getElementById('chatbot-button');
        const chatClose = document.getElementById('chatbot-close');
        const chatSend = document.getElementById('chatbot-send');
        const chatInput = document.getElementById('chatbot-input');
        
        chatButton.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.toggleChat());
        chatSend.addEventListener('click', () => this.sendMessage());
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chatbot-window');
        chatWindow.classList.toggle('open', this.isOpen);
        
        if (this.isOpen && this.conversationHistory.length === 1) {
            // Show welcome message if first time opening
            setTimeout(() => {
                this.addBotMessage("yo! i'm your personal sephyx stylist 🤖 ask me about fits, orders, or just vibe with me fr");
            }, 500);
        }
    }
    
    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        input.value = '';
        
        // Add typing indicator
        this.showTypingIndicator();
        
        // Generate response after delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addBotMessage(response);
        }, 1000 + Math.random() * 1500);
    }
    
    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        
        this.conversationHistory.push({ type: 'user', message, timestamp: Date.now() });
        this.saveAndScrollChat();
    }
    
    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message';
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        
        this.conversationHistory.push({ type: 'bot', message, timestamp: Date.now() });
        this.saveAndScrollChat();
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const indicator = document.createElement('div');
        indicator.className = 'bot-message typing-indicator';
        indicator.innerHTML = 'typing... <span class="dots">...</span>';
        indicator.id = 'typing-indicator';
        messagesContainer.appendChild(indicator);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for specific product mentions
        if (lowerMessage.includes('eclipse drift') || lowerMessage.includes('hoodie')) {
            return "yo the eclipse drift hoodie is literally our most fire piece 🔥 oversized fit, holographic details, perfect for that cyberpunk energy. pairs crazy well with quantum cargos ngl";
        }
        
        if (lowerMessage.includes('neon dawn') || lowerMessage.includes('tee')) {
            return "neon dawn tee goes hard fr 💯 that glitch print hits different and the reactive fibers are next level tech. perfect for layering or wearing solo when it's hot out";
        }
        
        if (lowerMessage.includes('quantum') || lowerMessage.includes('cargo')) {
            return "quantum cargos are straight up game changers bro 🚀 all those pockets for your tech plus that tactical streetwear aesthetic? chef's kiss honestly";
        }
        
        // Check for keywords and respond accordingly
        for (const [category, words] of Object.entries(this.keywords)) {
            if (words.some(word => lowerMessage.includes(word))) {
                return this.getRandomResponse(category);
            }
        }
        
        // Context-aware responses based on conversation history
        const recentMessages = this.conversationHistory.slice(-5);
        const userMessages = recentMessages.filter(msg => msg.type === 'user').map(msg => msg.message.toLowerCase());
        
        // If user seems confused or asking for help
        if (lowerMessage.includes('?') || lowerMessage.includes('don\'t know') || lowerMessage.includes('confused')) {
            return "no worries fam, what specifically you need help with? i can help with fit advice, ordering info, or just chat about the sephyx vision 💭";
        }
        
        // If user is being negative
        if (lowerMessage.includes('expensive') || lowerMessage.includes('too much') || lowerMessage.includes('overpriced')) {
            return "look, quality costs money fr 💯 we're not making fast fashion here - every sephyx piece is investment in your future self. plus the drip is priceless honestly";
        }
        
        // Default responses with some personality
        const defaultResponses = [
            "that's interesting... tell me more about what you're looking for 👀",
            "bet, i see you. what else is on your mind?",
            "valid question fr. anything specific about sephyx you wanna know?",
            "hmm, let me think... what's your current vibe like?",
            "yo that's actually pretty deep. you feeling the cyberpunk aesthetic?",
            "respectfully, can you be more specific? i'm here to help with whatever",
            "not gonna lie, that's an interesting perspective. what's your style like currently?"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    getRandomResponse(category) {
        let responses;
        
        switch (category) {
            case 'style':
                responses = this.responses.style_advice;
                break;
            case 'ordering':
                responses = this.responses.ordering;
                break;
            case 'greeting':
                responses = this.responses.greetings;
                break;
            case 'brand':
                responses = this.responses.general;
                break;
            default:
                responses = this.responses.general;
        }
        
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    saveAndScrollChat() {
        // Keep only last 50 messages to prevent localStorage bloat
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-50);
        }
        
        localStorage.setItem('sephyx_chat_history', JSON.stringify(this.conversationHistory));
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    loadChatHistory() {
        const messagesContainer = document.getElementById('chatbot-messages');
        
        // Clear existing messages except the initial one
        const initialMessage = messagesContainer.querySelector('.bot-message');
        messagesContainer.innerHTML = '';
        
        if (this.conversationHistory.length === 0) {
            // Add initial welcome message
            messagesContainer.appendChild(initialMessage);
            this.conversationHistory.push({ 
                type: 'bot', 
                message: "yo what's good? need some drip advice? 💀", 
                timestamp: Date.now() 
            });
        } else {
            // Load conversation history
            this.conversationHistory.forEach(msg => {
                const messageDiv = document.createElement('div');
                messageDiv.className = msg.type === 'user' ? 'user-message' : 'bot-message';
                messageDiv.textContent = msg.message;
                messagesContainer.appendChild(messageDiv);
            });
        }
        
        this.scrollToBottom();
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new SephyxChatbot();
});

// Add typing animation CSS
const chatbotStyle = document.createElement('style');
chatbotStyle.textContent = `
    .typing-indicator {
        opacity: 0.7;
        font-style: italic;
    }
    
    .dots {
        animation: typing-dots 1.5s infinite;
    }
    
    @keyframes typing-dots {
        0%, 20% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    .chatbot-messages {
        scrollbar-width: thin;
        scrollbar-color: var(--primary-color) var(--card-bg);
    }
    
    .chatbot-messages::-webkit-scrollbar {
        width: 8px;
    }
    
    .chatbot-messages::-webkit-scrollbar-track {
        background: var(--card-bg);
    }
    
    .chatbot-messages::-webkit-scrollbar-thumb {
        background: var(--primary-color);
        border-radius: 4px;
    }
    
    .bot-message,
    .user-message {
        animation: message-slide-in 0.3s ease-out;
    }
    
    @keyframes message-slide-in {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(chatbotStyle);
