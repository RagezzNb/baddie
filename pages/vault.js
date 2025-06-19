// Vault Page Component (Secret Page)
class VaultPage {
    constructor() {
        this.secretItems = [];
        this.vaultLevel = 1;
        this.unlockedFeatures = [];
    }

    async render() {
        return `
            <div class="vault-page page-container">
                <!-- Vault Header -->
                <div class="vault-header">
                    <div class="vault-entrance">
                        <div class="vault-logo">
                            <img src="assets/logo.svg" alt="SEPHYX VAULT" class="vault-logo-img rotate pulse">
                        </div>
                        <h1 class="vault-title glitch holographic" data-text="THE VAULT">THE VAULT</h1>
                        <p class="vault-subtitle neon">You have successfully breached the digital underground</p>
                    </div>
                    
                    <div class="access-status">
                        <div class="status-indicator">
                            <div class="status-light pulse"></div>
                            <span class="status-text">VAULT ACCESS: GRANTED</span>
                        </div>
                        <div class="vault-level">
                            <span class="level-label">CLEARANCE LEVEL:</span>
                            <span class="level-number neon" id="vault-level">1</span>
                        </div>
                    </div>
                </div>

                <!-- Vault Stats -->
                <div class="vault-stats">
                    <div class="stat-card">
                        <div class="stat-icon">🔓</div>
                        <div class="stat-value" id="unlocked-items">0</div>
                        <div class="stat-label">Items Unlocked</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⚡</div>
                        <div class="stat-value" id="vault-points">0</div>
                        <div class="stat-label">Vault Points</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🚀</div>
                        <div class="stat-value" id="next-unlock">500</div>
                        <div class="stat-label">Next Unlock</div>
                    </div>
                </div>

                <!-- Exclusive Collections -->
                <div class="vault-collections">
                    <h2 class="section-title glitch neon-secondary" data-text="EXCLUSIVE COLLECTIONS">EXCLUSIVE COLLECTIONS</h2>
                    
                    <div class="collections-grid" id="collections-grid">
                        <!-- Collections will be populated here -->
                    </div>
                </div>

                <!-- Prototype Items -->
                <div class="prototype-section">
                    <h2 class="section-title glitch neon" data-text="PROTOTYPE ARCHIVE">PROTOTYPE ARCHIVE</h2>
                    <p class="section-desc">Unreleased designs from the SEPHYX laboratory</p>
                    
                    <div class="prototype-grid" id="prototype-grid">
                        <!-- Prototype items will be populated here -->
                    </div>
                </div>

                <!-- Secret Drop Countdown -->
                <div class="countdown-section">
                    <h2 class="section-title holographic">⚡ NEXT SECRET DROP ⚡</h2>
                    <div class="countdown-display" id="countdown-display">
                        <div class="countdown-unit">
                            <span class="countdown-number" id="days">00</span>
                            <span class="countdown-label">Days</span>
                        </div>
                        <div class="countdown-separator">:</div>
                        <div class="countdown-unit">
                            <span class="countdown-number" id="hours">00</span>
                            <span class="countdown-label">Hours</span>
                        </div>
                        <div class="countdown-separator">:</div>
                        <div class="countdown-unit">
                            <span class="countdown-number" id="minutes">00</span>
                            <span class="countdown-label">Minutes</span>
                        </div>
                    </div>
                    <button class="notify-btn glitch-btn" onclick="vaultPage.setDropNotification()">
                        <i class="fas fa-bell"></i> Notify Me
                    </button>
                </div>

                <!-- AR Filter Section -->
                <div class="ar-section">
                    <h2 class="section-title neon-secondary">SEPHYX VISION AR</h2>
                    <div class="ar-container">
                        <div class="ar-preview">
                            <div class="ar-mockup">
                                <div class="ar-frame">
                                    <div class="ar-overlay">
                                        <div class="ar-logo pulse">SEPHYX</div>
                                        <div class="ar-effects">
                                            <div class="effect-particle"></div>
                                            <div class="effect-particle"></div>
                                            <div class="effect-particle"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ar-info">
                            <h3>Unlock Sephyx Vision</h3>
                            <p>Experience our exclusive AR filters that transform reality into a cyberpunk dream</p>
                            <div class="qr-container">
                                <div class="qr-code">
                                    <div class="qr-pattern">
                                        <div class="qr-corner"></div>
                                        <div class="qr-corner"></div>
                                        <div class="qr-corner"></div>
                                        <div class="qr-corner"></div>
                                        <div class="qr-center">AR</div>
                                    </div>
                                </div>
                                <p class="qr-label">Scan with Instagram Camera</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Vault Features -->
                <div class="vault-features">
                    <h2 class="section-title neon">VAULT PRIVILEGES</h2>
                    
                    <div class="features-grid">
                        <div class="feature-card unlocked">
                            <div class="feature-icon">🎯</div>
                            <h3>Early Access</h3>
                            <p>Get first access to new drops 24 hours before public release</p>
                            <div class="feature-status">UNLOCKED</div>
                        </div>
                        
                        <div class="feature-card unlocked">
                            <div class="feature-icon">💎</div>
                            <h3>Exclusive Designs</h3>
                            <p>Access to vault-only designs never released to the public</p>
                            <div class="feature-status">UNLOCKED</div>
                        </div>
                        
                        <div class="feature-card locked" data-unlock-level="2">
                            <div class="feature-icon">🤖</div>
                            <h3>AI Style Assistant</h3>
                            <p>Personal AI that creates custom fits based on your preferences</p>
                            <div class="feature-status">LEVEL 2 REQUIRED</div>
                        </div>
                        
                        <div class="feature-card locked" data-unlock-level="3">
                            <div class="feature-icon">🎨</div>
                            <h3>Custom Design Portal</h3>
                            <p>Commission custom pieces directly from SEPHYX designers</p>
                            <div class="feature-status">LEVEL 3 REQUIRED</div>
                        </div>
                    </div>
                </div>

                <!-- Download Section -->
                <div class="download-section">
                    <h2 class="section-title glitch holographic" data-text="DIGITAL ASSETS">DIGITAL ASSETS</h2>
                    
                    <div class="download-grid">
                        <div class="download-card" onclick="vaultPage.downloadAsset('drip-pack')">
                            <div class="download-icon">📦</div>
                            <h3>Drip Pack</h3>
                            <p>High-res wallpapers, logos, and digital assets</p>
                            <div class="download-size">156 MB</div>
                            <button class="download-btn">
                                <i class="fas fa-download"></i> Download
                            </button>
                        </div>
                        
                        <div class="download-card" onclick="vaultPage.downloadAsset('music-pack')">
                            <div class="download-icon">🎵</div>
                            <h3>Underground Beats</h3>
                            <p>Exclusive SEPHYX lo-fi trap playlist</p>
                            <div class="download-size">89 MB</div>
                            <button class="download-btn">
                                <i class="fas fa-download"></i> Download
                            </button>
                        </div>
                        
                        <div class="download-card" onclick="vaultPage.downloadAsset('style-guide')">
                            <div class="download-icon">📖</div>
                            <h3>Style Guide</h3>
                            <p>Digital lookbook and styling tips from SEPHYX</p>
                            <div class="download-size">45 MB</div>
                            <button class="download-btn">
                                <i class="fas fa-download"></i> Download
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Secret Terminal -->
                <div class="terminal-section">
                    <h2 class="section-title neon-secondary">VAULT TERMINAL</h2>
                    <div class="terminal-container">
                        <div class="terminal-header">
                            <div class="terminal-title">SEPHYX_VAULT_SYSTEM v2.0</div>
                            <div class="terminal-controls">
                                <div class="terminal-btn"></div>
                                <div class="terminal-btn"></div>
                                <div class="terminal-btn"></div>
                            </div>
                        </div>
                        <div class="terminal-body">
                            <div class="terminal-output" id="terminal-output">
                                <div class="terminal-line">Welcome to SEPHYX Vault Terminal</div>
                                <div class="terminal-line">Type 'help' for available commands</div>
                                <div class="terminal-line">&gt; <span class="cursor-blink">_</span></div>
                            </div>
                        </div>
                        <button class="terminal-access-btn" onclick="window.location.hash = '#/terminal'">
                            Access Full Terminal
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.addStyles();
        this.loadVaultData();
        this.renderCollections();
        this.renderPrototypes();
        this.startCountdown();
        this.updateVaultLevel();
        this.addVaultEffects();
        
        // Track vault access
        StorageManager.trackEvent('vault_access');
        StorageManager.addLoyaltyPoints(50); // Bonus for finding vault
    }

    addStyles() {
        if (document.getElementById('vault-styles')) return;

        const style = document.createElement('style');
        style.id = 'vault-styles';
        style.textContent = `
            .vault-page {
                min-height: 100vh;
                background: radial-gradient(ellipse at center, rgba(0,255,255,0.05) 0%, rgba(255,0,255,0.05) 50%, transparent 100%);
                animation: vaultPulse 10s ease-in-out infinite;
            }
            
            @keyframes vaultPulse {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            .vault-header {
                text-align: center;
                margin-bottom: 3rem;
                padding: 3rem 0;
                position: relative;
            }
            
            .vault-entrance {
                margin-bottom: 2rem;
            }
            
            .vault-logo {
                margin-bottom: 2rem;
            }
            
            .vault-logo-img {
                width: 120px;
                height: auto;
                filter: drop-shadow(0 0 30px var(--primary-color)) drop-shadow(0 0 60px var(--secondary-color));
            }
            
            .vault-title {
                font-size: clamp(3rem, 6vw, 5rem);
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 5px;
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color), var(--accent-color));
                background-size: 300% 300%;
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: holographic 3s ease infinite;
            }
            
            .vault-subtitle {
                font-size: 1.3rem;
                font-style: italic;
                opacity: 0.8;
            }
            
            .access-status {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 3rem;
                flex-wrap: wrap;
            }
            
            .status-indicator {
                display: flex;
                align-items: center;
                gap: 1rem;
                background: rgba(0,0,0,0.5);
                padding: 1rem 2rem;
                border-radius: 25px;
                border: 1px solid var(--success-color);
            }
            
            .status-light {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: var(--success-color);
                box-shadow: 0 0 20px var(--success-color);
            }
            
            .status-text {
                color: var(--success-color);
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .vault-level {
                background: rgba(0,0,0,0.5);
                padding: 1rem 2rem;
                border-radius: 25px;
                border: 1px solid var(--primary-color);
            }
            
            .level-label {
                color: var(--text-secondary);
                margin-right: 1rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .level-number {
                font-size: 1.5rem;
                font-weight: bold;
            }
            
            .vault-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
                margin-bottom: 4rem;
            }
            
            .stat-card {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 15px;
                padding: 2rem;
                text-align: center;
                transition: all var(--transition-normal);
                backdrop-filter: blur(10px);
            }
            
            .stat-card:hover {
                transform: translateY(-10px);
                border-color: var(--primary-color);
                box-shadow: 0 20px 40px rgba(0,255,255,0.3);
            }
            
            .stat-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            
            .stat-value {
                color: var(--primary-color);
                font-size: 2.5rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            
            .stat-label {
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 1px;
                font-size: 0.9rem;
            }
            
            .section-title {
                text-align: center;
                font-size: 2.5rem;
                margin-bottom: 2rem;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .section-desc {
                text-align: center;
                color: var(--text-secondary);
                margin-bottom: 3rem;
                font-size: 1.1rem;
                font-style: italic;
            }
            
            .collections-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
                margin-bottom: 5rem;
            }
            
            .collection-card {
                background: rgba(26,26,26,0.9);
                border: 2px solid var(--border-color);
                border-radius: 15px;
                overflow: hidden;
                transition: all var(--transition-slow);
                cursor: none;
                position: relative;
            }
            
            .collection-card:hover {
                transform: translateY(-15px) rotateX(5deg);
                border-color: var(--secondary-color);
                box-shadow: 0 25px 50px rgba(255,0,255,0.4);
            }
            
            .collection-image {
                height: 250px;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                position: relative;
                overflow: hidden;
            }
            
            .collection-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity var(--transition-normal);
            }
            
            .collection-card:hover .collection-overlay {
                opacity: 1;
            }
            
            .collection-unlock-btn {
                background: var(--secondary-color);
                color: var(--bg-color);
                border: none;
                padding: 1rem 2rem;
                border-radius: 25px;
                font-family: var(--font-primary);
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 2px;
                cursor: none;
                transition: all var(--transition-normal);
            }
            
            .collection-unlock-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 0 30px var(--secondary-color);
            }
            
            .collection-info {
                padding: 2rem;
            }
            
            .collection-name {
                color: var(--secondary-color);
                font-size: 1.3rem;
                font-weight: bold;
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            
            .collection-desc {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 1rem;
            }
            
            .collection-stats {
                display: flex;
                justify-content: space-between;
                font-size: 0.9rem;
            }
            
            .collection-items {
                color: var(--primary-color);
                font-weight: bold;
            }
            
            .collection-rarity {
                color: var(--accent-color);
                font-weight: bold;
            }
            
            .prototype-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 2rem;
                margin-bottom: 5rem;
            }
            
            .prototype-item {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                overflow: hidden;
                transition: all var(--transition-normal);
                cursor: none;
                position: relative;
            }
            
            .prototype-item::before {
                content: 'PROTOTYPE';
                position: absolute;
                top: 10px;
                left: 10px;
                background: var(--error-color);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.7rem;
                font-weight: bold;
                z-index: 2;
                transform: rotate(-15deg);
            }
            
            .prototype-item:hover {
                transform: translateY(-10px);
                border-color: var(--accent-color);
                box-shadow: 0 15px 35px rgba(255,255,0,0.3);
            }
            
            .prototype-image {
                height: 200px;
                background: var(--bg-secondary);
                position: relative;
                overflow: hidden;
            }
            
            .prototype-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: saturate(0.7) contrast(1.2);
                transition: filter var(--transition-normal);
            }
            
            .prototype-item:hover .prototype-image img {
                filter: saturate(1) contrast(1);
            }
            
            .prototype-info {
                padding: 1.5rem;
            }
            
            .prototype-name {
                color: var(--accent-color);
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            
            .prototype-status {
                color: var(--text-muted);
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .countdown-section {
                text-align: center;
                margin: 5rem 0;
                padding: 3rem;
                background: linear-gradient(45deg, rgba(26,26,26,0.8), rgba(10,10,10,0.9));
                border-radius: 20px;
                border: 1px solid var(--border-color);
            }
            
            .countdown-display {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                margin: 2rem 0;
                font-family: var(--font-secondary);
            }
            
            .countdown-unit {
                text-align: center;
                background: rgba(0,0,0,0.5);
                border: 1px solid var(--primary-color);
                border-radius: 10px;
                padding: 1.5rem 1rem;
                min-width: 80px;
            }
            
            .countdown-number {
                display: block;
                font-size: 2.5rem;
                font-weight: bold;
                color: var(--primary-color);
                line-height: 1;
            }
            
            .countdown-label {
                font-size: 0.8rem;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .countdown-separator {
                font-size: 2rem;
                color: var(--primary-color);
                font-weight: bold;
            }
            
            .notify-btn {
                margin-top: 2rem;
                padding: 1rem 2rem;
            }
            
            .ar-section {
                margin: 5rem 0;
                padding: 3rem 0;
                background: radial-gradient(ellipse at center, rgba(255,255,0,0.1) 0%, transparent 70%);
                border-radius: 20px;
            }
            
            .ar-container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 3rem;
                align-items: center;
                max-width: 1000px;
                margin: 0 auto;
            }
            
            .ar-preview {
                text-align: center;
            }
            
            .ar-mockup {
                position: relative;
                max-width: 300px;
                margin: 0 auto;
            }
            
            .ar-frame {
                width: 200px;
                height: 350px;
                background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
                border-radius: 25px;
                border: 3px solid var(--border-color);
                position: relative;
                overflow: hidden;
                margin: 0 auto;
            }
            
            .ar-overlay {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
            }
            
            .ar-logo {
                color: var(--accent-color);
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 1rem;
            }
            
            .ar-effects {
                position: relative;
                width: 100px;
                height: 100px;
                margin: 0 auto;
            }
            
            .effect-particle {
                position: absolute;
                width: 6px;
                height: 6px;
                background: var(--primary-color);
                border-radius: 50%;
                animation: particleFloat 3s ease-in-out infinite;
            }
            
            .effect-particle:nth-child(1) {
                top: 20%;
                left: 30%;
                animation-delay: 0s;
            }
            
            .effect-particle:nth-child(2) {
                top: 60%;
                right: 20%;
                animation-delay: 1s;
            }
            
            .effect-particle:nth-child(3) {
                bottom: 20%;
                left: 50%;
                animation-delay: 2s;
            }
            
            @keyframes particleFloat {
                0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
                50% { transform: translateY(-20px) scale(1.2); opacity: 0.7; }
            }
            
            .ar-info h3 {
                color: var(--accent-color);
                font-size: 1.8rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            
            .ar-info p {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 2rem;
            }
            
            .qr-container {
                text-align: center;
            }
            
            .qr-code {
                background: white;
                padding: 1rem;
                border-radius: 10px;
                display: inline-block;
                margin-bottom: 1rem;
            }
            
            .qr-pattern {
                width: 120px;
                height: 120px;
                background: #000;
                position: relative;
                border-radius: 5px;
            }
            
            .qr-corner {
                position: absolute;
                width: 20px;
                height: 20px;
                border: 3px solid white;
            }
            
            .qr-corner:nth-child(1) { top: 5px; left: 5px; }
            .qr-corner:nth-child(2) { top: 5px; right: 5px; }
            .qr-corner:nth-child(3) { bottom: 5px; left: 5px; }
            .qr-corner:nth-child(4) { bottom: 5px; right: 5px; }
            
            .qr-center {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-weight: bold;
                font-size: 1.2rem;
            }
            
            .qr-label {
                color: var(--text-muted);
                font-size: 0.9rem;
            }
            
            .vault-features {
                margin: 5rem 0;
            }
            
            .features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
            }
            
            .feature-card {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 15px;
                padding: 2rem;
                text-align: center;
                transition: all var(--transition-normal);
                position: relative;
                overflow: hidden;
            }
            
            .feature-card.unlocked {
                border-color: var(--success-color);
                background: rgba(0,255,128,0.05);
            }
            
            .feature-card.locked {
                opacity: 0.6;
                filter: grayscale(0.5);
            }
            
            .feature-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
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
            
            .feature-status {
                background: var(--success-color);
                color: var(--bg-color);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .feature-card.locked .feature-status {
                background: var(--text-muted);
            }
            
            .download-section {
                margin: 5rem 0;
                text-align: center;
            }
            
            .download-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 2rem;
                max-width: 1000px;
                margin: 0 auto;
            }
            
            .download-card {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 15px;
                padding: 2rem;
                text-align: center;
                cursor: none;
                transition: all var(--transition-normal);
            }
            
            .download-card:hover {
                transform: translateY(-10px);
                border-color: var(--accent-color);
                box-shadow: 0 20px 40px rgba(255,255,0,0.3);
            }
            
            .download-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            
            .download-card h3 {
                color: var(--accent-color);
                margin-bottom: 1rem;
                font-size: 1.2rem;
            }
            
            .download-card p {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 1rem;
            }
            
            .download-size {
                color: var(--text-muted);
                font-size: 0.9rem;
                margin-bottom: 1.5rem;
            }
            
            .download-btn {
                background: var(--accent-color);
                color: var(--bg-color);
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 5px;
                font-family: var(--font-primary);
                font-weight: bold;
                cursor: none;
                transition: all var(--transition-normal);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin: 0 auto;
            }
            
            .download-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(255,255,0,0.4);
            }
            
            .terminal-section {
                margin: 5rem 0;
            }
            
            .terminal-container {
                background: #000;
                border: 1px solid var(--primary-color);
                border-radius: 10px;
                overflow: hidden;
                max-width: 600px;
                margin: 0 auto;
                box-shadow: 0 0 30px rgba(0,255,255,0.3);
            }
            
            .terminal-header {
                background: var(--primary-color);
                color: var(--bg-color);
                padding: 0.5rem 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .terminal-title {
                font-family: var(--font-secondary);
                font-size: 0.9rem;
                font-weight: bold;
            }
            
            .terminal-controls {
                display: flex;
                gap: 0.5rem;
            }
            
            .terminal-btn {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: var(--bg-color);
                opacity: 0.7;
            }
            
            .terminal-body {
                padding: 1rem;
                height: 150px;
                overflow-y: auto;
            }
            
            .terminal-output {
                font-family: var(--font-secondary);
                color: var(--primary-color);
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .terminal-line {
                margin-bottom: 0.5rem;
            }
            
            .cursor-blink {
                animation: blink 1s infinite;
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
            
            .terminal-access-btn {
                width: 100%;
                background: var(--bg-secondary);
                border: none;
                color: var(--primary-color);
                padding: 1rem;
                font-family: var(--font-primary);
                cursor: none;
                transition: all var(--transition-normal);
            }
            
            .terminal-access-btn:hover {
                background: var(--primary-color);
                color: var(--bg-color);
            }
            
            @media (max-width: 768px) {
                .access-status {
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .vault-stats {
                    grid-template-columns: 1fr;
                }
                
                .collections-grid {
                    grid-template-columns: 1fr;
                }
                
                .ar-container {
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
                
                .countdown-display {
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                
                .countdown-unit {
                    min-width: 60px;
                    padding: 1rem 0.5rem;
                }
                
                .countdown-number {
                    font-size: 2rem;
                }
                
                .download-grid {
                    grid-template-columns: 1fr;
                }
                
                .features-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    loadVaultData() {
        // Load user's vault progress
        const loyaltyPoints = StorageManager.get('loyaltyPoints', 0);
        this.vaultLevel = Math.floor(loyaltyPoints / 500) + 1;
        
        // Define exclusive collections
        this.secretItems = [
            {
                id: 'cyber-prophet',
                name: 'Cyber Prophet Collection',
                desc: 'Ultra-exclusive pieces for digital prophets who see the future',
                items: 5,
                rarity: 'LEGENDARY',
                unlockCost: 1000
            },
            {
                id: 'neon-genesis',
                name: 'Neon Genesis Series',
                desc: 'Birth of a new era in cyberpunk fashion',
                items: 8,
                rarity: 'RARE',
                unlockCost: 750
            },
            {
                id: 'matrix-core',
                name: 'Matrix Core Essentials',
                desc: 'Core pieces that define the digital underground',
                items: 6,
                rarity: 'EPIC',
                unlockCost: 500
            }
        ];
    }

    renderCollections() {
        const grid = document.getElementById('collections-grid');
        if (!grid) return;

        grid.innerHTML = this.secretItems.map(collection => `
            <div class="collection-card">
                <div class="collection-image">
                    <div class="collection-overlay">
                        <button class="collection-unlock-btn" onclick="vaultPage.unlockCollection('${collection.id}')">
                            Unlock ${collection.unlockCost} Points
                        </button>
                    </div>
                </div>
                <div class="collection-info">
                    <h3 class="collection-name">${collection.name}</h3>
                    <p class="collection-desc">${collection.desc}</p>
                    <div class="collection-stats">
                        <span class="collection-items">${collection.items} Items</span>
                        <span class="collection-rarity">${collection.rarity}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderPrototypes() {
        const prototypes = [
            { name: 'Neural Interface Hoodie', image: 'https://pixabay.com/get/g19b579c85833982d7f7ac02454f4f40f5861b28fc8d6265fc9cbb48b4886d0478547f6b03e36dc3d95dd2c9b0a4d5d87ca83b6bb4114432fdbc929f3bf47f505_1280.jpg' },
            { name: 'Quantum Mesh Tee', image: 'https://pixabay.com/get/g0741ff1afeef1deb27ab90dbc45bb9614435bc3cb2584ec626a9e939a808b179763a542dd422a6de21390544b1f57827963b54eb0a94e6ce26be30865e500159_1280.jpg' },
            { name: 'Holographic Bomber', image: 'https://pixabay.com/get/gc5354768bf3b381e3068accb86a9f1a69b78cf1de7e075be032f715a38a9354b139393e2efe9b1bac18088ea9ca26db2d027feb4dded61a3cc876ead88f44c42_1280.jpg' },
            { name: 'Digital Camo Pants', image: 'https://pixabay.com/get/ge05609656e88af056469871ddbc356bd86af0076e97227b9119bb890f993d09ac1c4ac2c31dd2f37f574769061f0c4837600678c71219a36363435df287d6ae5_1280.jpg' },
            { name: 'Cyber Vision Goggles', image: 'https://pixabay.com/get/gb3966b4127b0b35903418e319eadbb199f49334ad3eba6aede18f63724cf1555812a0c3bad1124f4fa89a93c4c47e076241ab1a28d2c2cabe83b6e305b6dc220_1280.jpg' },
            { name: 'Matrix Gloves', image: 'https://pixabay.com/get/g6f9f6cc89ff3f8a8beaa3e5850dc8d918c817c658fa3e35086eb45ce7e8a0e11a180ce76025b0363c5febdfead70e46383d63aa0e3a4abced0618de1572e0d36_1280.jpg' }
        ];

        const grid = document.getElementById('prototype-grid');
        if (!grid) return;

        grid.innerHTML = prototypes.map(prototype => `
            <div class="prototype-item">
                <div class="prototype-image">
                    <img src="${prototype.image}" alt="${prototype.name}" loading="lazy">
                </div>
                <div class="prototype-info">
                    <h4 class="prototype-name">${prototype.name}</h4>
                    <div class="prototype-status">Development Phase</div>
                </div>
            </div>
        `).join('');
    }

    startCountdown() {
        // Set countdown to 7 days from now
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 7);
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        };
        
        updateCountdown();
        setInterval(updateCountdown, 60000); // Update every minute
    }

    updateVaultLevel() {
        const loyaltyPoints = StorageManager.get('loyaltyPoints', 0);
        const level = Math.floor(loyaltyPoints / 500) + 1;
        
        document.getElementById('vault-level').textContent = level;
        document.getElementById('unlocked-items').textContent = this.secretItems.length;
        document.getElementById('vault-points').textContent = loyaltyPoints;
        document.getElementById('next-unlock').textContent = (level * 500);
    }

    addVaultEffects() {
        // Add special particle effects
        if (window.particleSystem) {
            window.particleSystem.createBurst(window.innerWidth / 2, 100, 30);
        }

        // Add glitch effects to random elements
        setTimeout(() => {
            const elements = document.querySelectorAll('.vault-title, .section-title');
            elements.forEach(el => {
                el.classList.add('glitch');
            });
        }, 1000);
    }

    unlockCollection(collectionId) {
        const collection = this.secretItems.find(c => c.id === collectionId);
        if (!collection) return;

        const currentPoints = StorageManager.get('loyaltyPoints', 0);
        
        if (currentPoints < collection.unlockCost) {
            window.sephyxApp.showNotification(`Need ${collection.unlockCost - currentPoints} more points to unlock`, 'error');
            return;
        }

        // Deduct points and unlock
        StorageManager.set('loyaltyPoints', currentPoints - collection.unlockCost);
        
        // Store unlocked collection
        const unlockedCollections = StorageManager.get('unlockedCollections', []);
        unlockedCollections.push(collectionId);
        StorageManager.set('unlockedCollections', unlockedCollections);

        window.sephyxApp.showNotification(`${collection.name} unlocked! 🔓`, 'success');
        
        // Add special effect
        if (window.particleSystem) {
            window.particleSystem.createBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
        }

        // Track event
        StorageManager.trackEvent('vault_collection_unlock', { collectionId, cost: collection.unlockCost });
        
        // Update display
        this.updateVaultLevel();
    }

    setDropNotification() {
        StorageManager.set('dropNotificationSet', true);
        window.sephyxApp.showNotification('You\'ll be notified when the next drop launches! 🔔', 'success');
        
        // Track event
        StorageManager.trackEvent('drop_notification_set');
    }

    downloadAsset(assetType) {
        // Simulate download
        window.sephyxApp.showNotification('Download starting... 📦', 'info');
        
        setTimeout(() => {
            window.sephyxApp.showNotification('Download complete! Check your downloads folder 📁', 'success');
        }, 2000);
        
        // Track download
        StorageManager.trackEvent('vault_asset_download', { assetType });
        
        // Add loyalty points for engagement
        StorageManager.addLoyaltyPoints(25);
    }
}

// Export for global use
window.VaultPage = VaultPage;
