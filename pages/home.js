// Home Page Component
class HomePage {
    constructor() {
        this.alerts = [
            'SEPHYX SIGNAL ACTIVE ⚡',
            'YOU ARE BEING WATCHED.',
            'CULT TRANSMISSION INCOMING…',
            'DIGITAL UNDERGROUND ACTIVATED',
            'NEON PROPHECY FULFILLED'
        ];
        this.currentAlert = 0;
    }

    async render() {
        return `
            <div class="home-page page-container">
                <!-- Hero Section -->
                <section class="hero-section">
                    <div class="hero-content">
                        <div class="logo-container">
                            <img src="assets/logo.svg" alt="SEPHYX" class="hero-logo glitch-logo rotate">
                        </div>
                        
                        <h1 class="hero-tagline glitch neon" data-text="drip designed for the future.">
                            drip designed for the future.
                        </h1>
                        
                        <div class="hero-cta">
                            <button onclick="window.location.hash = '#/shop'" class="cta-button glitch-btn">
                                <span class="btn-text">Enter the Vault</span>
                                <span class="btn-icon">🔮</span>
                            </button>
                        </div>
                        
                        <div class="hero-stats">
                            <div class="stat-item">
                                <span class="stat-number neon" id="visitor-count">1337</span>
                                <span class="stat-label">Cult Members</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number neon-secondary" id="items-saved">420</span>
                                <span class="stat-label">Fits Saved</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number neon" id="vault-unlocks">69</span>
                                <span class="stat-label">Vault Access</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Floating elements -->
                    <div class="floating-elements">
                        <div class="float-item float" style="top: 20%; left: 10%;">⚡</div>
                        <div class="float-item float" style="top: 40%; right: 15%; animation-delay: 1s;">🔮</div>
                        <div class="float-item float" style="bottom: 30%; left: 20%; animation-delay: 2s;">💫</div>
                        <div class="float-item float" style="top: 60%; right: 30%; animation-delay: 1.5s;">🌟</div>
                    </div>
                </section>

                <!-- Features Section -->
                <section class="features-section">
                    <div class="features-grid">
                        <div class="feature-card hover-lift stagger-item" onclick="window.location.hash = '#/shop'">
                            <div class="feature-icon">🛍️</div>
                            <h3>Exclusive Drops</h3>
                            <p>Limited edition streetwear designed for the digital age</p>
                            <div class="feature-badge">Qatar COD Only</div>
                        </div>
                        
                        <div class="feature-card hover-lift stagger-item" onclick="window.location.hash = '#/customizer'">
                            <div class="feature-icon">🎨</div>
                            <h3>Outfit Generator</h3>
                            <p>AI-powered fit combinations for maximum drip</p>
                            <div class="feature-badge">Beta Access</div>
                        </div>
                        
                        <div class="feature-card hover-lift stagger-item" onclick="window.location.hash = '#/vault'">
                            <div class="feature-icon">🔒</div>
                            <h3>The Vault</h3>
                            <p>Secret collections for verified cult members</p>
                            <div class="feature-badge">Members Only</div>
                        </div>
                        
                        <div class="feature-card hover-lift stagger-item" onclick="window.location.hash = '#/lookbook'">
                            <div class="feature-icon">📸</div>
                            <h3>Digital Lookbook</h3>
                            <p>Cinematic visuals showcasing the future of fashion</p>
                            <div class="feature-badge">4K Ready</div>
                        </div>
                    </div>
                </section>

                <!-- Live Feed Section -->
                <section class="live-feed-section">
                    <h2 class="section-title glitch" data-text="LIVE CULT ACTIVITY">LIVE CULT ACTIVITY</h2>
                    <div class="feed-container" id="live-feed">
                        <!-- Live activity will be populated here -->
                    </div>
                </section>

                <!-- Newsletter Section -->
                <section class="newsletter-section">
                    <div class="newsletter-content">
                        <h2 class="newsletter-title neon">JOIN THE UNDERGROUND</h2>
                        <p class="newsletter-subtitle">Get early access to drops, secret codes, and cult intel</p>
                        
                        <div class="newsletter-form">
                            <div class="input-group">
                                <input type="email" placeholder="Enter your neural link..." class="newsletter-input" id="newsletter-email">
                                <button class="newsletter-btn glitch-btn" onclick="homePage.submitNewsletter()">
                                    TRANSMIT
                                </button>
                            </div>
                            <p class="newsletter-disclaimer">
                                No spam, only future drip alerts 💎
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    init() {
        this.addStyles();
        this.updateStats();
        this.startLiveFeed();
        this.addEventListeners();
        
        // Track page view
        StorageManager.trackEvent('page_view', { page: 'home' });
    }

    addStyles() {
        if (document.getElementById('home-styles')) return;

        const style = document.createElement('style');
        style.id = 'home-styles';
        style.textContent = `
            .home-page {
                min-height: 100vh;
            }
            
            .hero-section {
                min-height: 80vh;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                text-align: center;
                background: radial-gradient(ellipse at center, rgba(0,255,255,0.1) 0%, transparent 70%);
            }
            
            .hero-content {
                z-index: 2;
                position: relative;
            }
            
            .hero-logo {
                width: 150px;
                height: auto;
                margin-bottom: 2rem;
                filter: drop-shadow(0 0 30px var(--primary-color));
            }
            
            .hero-tagline {
                font-size: clamp(2rem, 5vw, 4rem);
                font-weight: 900;
                margin-bottom: 3rem;
                line-height: 1.2;
                text-transform: lowercase;
            }
            
            .hero-cta {
                margin-bottom: 4rem;
            }
            
            .cta-button {
                font-size: 1.2rem;
                padding: 1.5rem 3rem;
                position: relative;
                overflow: hidden;
                border-radius: 0;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .cta-button:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 50px rgba(0,255,255,0.4);
            }
            
            .btn-icon {
                margin-left: 1rem;
                font-size: 1.5rem;
            }
            
            .hero-stats {
                display: flex;
                gap: 3rem;
                justify-content: center;
                margin-top: 2rem;
            }
            
            .stat-item {
                text-align: center;
            }
            
            .stat-number {
                display: block;
                font-size: 2rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            
            .stat-label {
                font-size: 0.9rem;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .floating-elements {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            
            .float-item {
                position: absolute;
                font-size: 2rem;
                opacity: 0.3;
                animation: float 3s ease-in-out infinite;
            }
            
            .features-section {
                padding: 5rem 0;
                background: linear-gradient(45deg, rgba(26,26,26,0.8), rgba(10,10,10,0.9));
            }
            
            .features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 2rem;
                max-width: 1200px;
                margin: 0 auto;
            }
            
            .feature-card {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 2rem;
                text-align: center;
                position: relative;
                cursor: none;
                transition: all var(--transition-normal);
                backdrop-filter: blur(10px);
            }
            
            .feature-card:hover {
                border-color: var(--primary-color);
                box-shadow: 0 20px 40px rgba(0,255,255,0.2);
                transform: translateY(-10px);
            }
            
            .feature-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            
            .feature-card h3 {
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-size: 1.3rem;
            }
            
            .feature-card p {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 1.5rem;
            }
            
            .feature-badge {
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                color: var(--bg-color);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .live-feed-section {
                padding: 4rem 0;
                background: var(--bg-color);
            }
            
            .section-title {
                text-align: center;
                font-size: 2.5rem;
                margin-bottom: 3rem;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .feed-container {
                max-width: 800px;
                margin: 0 auto;
                background: rgba(26,26,26,0.5);
                border-radius: 10px;
                padding: 2rem;
                border: 1px solid var(--border-color);
            }
            
            .feed-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem 0;
                border-bottom: 1px solid var(--border-color);
                animation: slideInLeft 0.5s ease;
            }
            
            .feed-item:last-child {
                border-bottom: none;
            }
            
            .feed-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                color: var(--bg-color);
            }
            
            .feed-content {
                flex: 1;
            }
            
            .feed-action {
                color: var(--text-primary);
                margin-bottom: 0.25rem;
            }
            
            .feed-time {
                color: var(--text-muted);
                font-size: 0.8rem;
            }
            
            .newsletter-section {
                padding: 5rem 0;
                background: radial-gradient(ellipse at center, rgba(255,0,255,0.1) 0%, transparent 70%);
                text-align: center;
            }
            
            .newsletter-title {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .newsletter-subtitle {
                color: var(--text-secondary);
                font-size: 1.1rem;
                margin-bottom: 2rem;
            }
            
            .input-group {
                display: flex;
                max-width: 500px;
                margin: 0 auto 1rem;
                gap: 1rem;
            }
            
            .newsletter-input {
                flex: 1;
                padding: 1rem 1.5rem;
                background: rgba(26,26,26,0.8);
                border: 2px solid var(--border-color);
                border-radius: 5px;
                color: var(--text-primary);
                font-family: var(--font-primary);
                font-size: 1rem;
                transition: all var(--transition-normal);
            }
            
            .newsletter-input:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 20px rgba(0,255,255,0.3);
            }
            
            .newsletter-btn {
                padding: 1rem 2rem;
                white-space: nowrap;
            }
            
            .newsletter-disclaimer {
                color: var(--text-muted);
                font-size: 0.9rem;
                margin-top: 1rem;
            }
            
            @media (max-width: 768px) {
                .hero-stats {
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                .input-group {
                    flex-direction: column;
                }
                
                .features-grid {
                    grid-template-columns: 1fr;
                    padding: 0 1rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    updateStats() {
        // Update visitor count
        const visitCount = StorageManager.get('visitCount', 1337);
        document.getElementById('visitor-count').textContent = visitCount.toLocaleString();

        // Update saved items count
        const savedItems = StorageManager.get('savedFits', []);
        document.getElementById('items-saved').textContent = (420 + savedItems.length).toLocaleString();

        // Update vault unlocks
        const vaultUsers = StorageManager.get('vaultAccess', false) ? 70 : 69;
        document.getElementById('vault-unlocks').textContent = vaultUsers;
    }

    startLiveFeed() {
        const feedContainer = document.getElementById('live-feed');
        if (!feedContainer) return;

        const activities = [
            'just unlocked The Vault 🔮',
            'saved Eclipse Drift Hoodie 💫',
            'generated a fire outfit combo 🔥',
            'joined the digital underground ⚡',
            'placed order via Instagram DM 📱',
            'achieved Sephyx Saint status 👑',
            'discovered secret terminal access 💻',
            'customized their perfect fit 🎨'
        ];

        const usernames = ['cyber_kid', 'neon_angel', 'glitch_lord', 'street_prophet', 'digital_nomad', 'future_drip', 'vault_keeper', 'cult_member'];

        const addFeedItem = () => {
            const username = usernames[Math.floor(Math.random() * usernames.length)];
            const activity = activities[Math.floor(Math.random() * activities.length)];
            const timeAgo = Math.floor(Math.random() * 30) + 1;

            const feedItem = document.createElement('div');
            feedItem.className = 'feed-item';
            feedItem.innerHTML = `
                <div class="feed-avatar">${username.charAt(0).toUpperCase()}</div>
                <div class="feed-content">
                    <div class="feed-action">
                        <strong>${username}</strong> ${activity}
                    </div>
                    <div class="feed-time">${timeAgo}m ago</div>
                </div>
            `;

            feedContainer.insertBefore(feedItem, feedContainer.firstChild);

            // Remove old items
            const items = feedContainer.querySelectorAll('.feed-item');
            if (items.length > 5) {
                items[items.length - 1].remove();
            }
        };

        // Add initial items
        for (let i = 0; i < 3; i++) {
            setTimeout(addFeedItem, i * 1000);
        }

        // Add new items periodically
        setInterval(addFeedItem, 10000);
    }

    addEventListeners() {
        // Add click tracking to feature cards
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                StorageManager.trackEvent('feature_click', { index, feature: card.querySelector('h3').textContent });
            });
        });
    }

    submitNewsletter() {
        const emailInput = document.getElementById('newsletter-email');
        const email = emailInput.value.trim();

        if (!email) {
            window.sephyxApp.showNotification('Enter your neural link address 🧠', 'error');
            return;
        }

        if (!this.validateEmail(email)) {
            window.sephyxApp.showNotification('Invalid neural link format 💀', 'error');
            return;
        }

        // Store email (mock signup)
        StorageManager.set('newsletterEmail', email);
        StorageManager.trackEvent('newsletter_signup', { email });

        // Add loyalty points
        StorageManager.addLoyaltyPoints(50);

        // Clear input
        emailInput.value = '';

        // Show success
        window.sephyxApp.showNotification('Welcome to the underground 🔮', 'success');

        // Add special effect
        if (window.particleSystem) {
            window.particleSystem.createBurst(window.innerWidth / 2, window.innerHeight / 2, 20);
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Export for global use
window.HomePage = HomePage;
