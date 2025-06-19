// Account Page Component
class AccountPage {
    constructor() {
        this.userStats = {};
        this.activityHistory = [];
        this.loyaltyInfo = {};
    }

    async render() {
        return `
            <div class="account-page page-container">
                <!-- Page Header -->
                <div class="account-header">
                    <h1 class="page-title glitch neon" data-text="ACCOUNT">ACCOUNT</h1>
                    <p class="account-subtitle">Your digital identity in the SEPHYX underground</p>
                </div>

                <!-- Account Setup -->
                <div class="account-setup" id="account-setup">
                    <div class="setup-card">
                        <h2 class="setup-title neon-secondary">JOIN THE CULT</h2>
                        <p class="setup-desc">Enter your neural link to unlock exclusive features</p>
                        
                        <div class="setup-form">
                            <div class="input-group">
                                <input type="email" id="user-email" placeholder="neural.link@future.net" class="setup-input">
                                <input type="text" id="user-name" placeholder="Cyber Handle" class="setup-input">
                            </div>
                            <button onclick="accountPage.createAccount()" class="setup-btn glitch-btn">
                                Initialize Profile
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Main Account Dashboard -->
                <div class="account-dashboard hidden" id="account-dashboard">
                    <!-- Profile Section -->
                    <div class="profile-section">
                        <div class="profile-card">
                            <div class="profile-avatar">
                                <div class="avatar-image" id="avatar-image">
                                    <i class="fas fa-user-astronaut"></i>
                                </div>
                                <div class="avatar-overlay">
                                    <button class="avatar-btn" onclick="accountPage.changeAvatar()">
                                        <i class="fas fa-camera"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="profile-info">
                                <h2 class="profile-name" id="profile-name">Cyber User</h2>
                                <div class="profile-email" id="profile-email">user@sephyx.com</div>
                                <div class="profile-joined" id="profile-joined">Joined the underground: Date</div>
                                
                                <div class="profile-badges">
                                    <div class="badge" id="loyalty-badge">
                                        <i class="fas fa-star"></i>
                                        <span>Street Starter</span>
                                    </div>
                                    <div class="badge vault-badge hidden" id="vault-badge">
                                        <i class="fas fa-lock-open"></i>
                                        <span>Vault Access</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="profile-actions">
                            <button class="profile-btn" onclick="accountPage.editProfile()">
                                <i class="fas fa-edit"></i> Edit Profile
                            </button>
                            <button class="profile-btn" onclick="accountPage.exportData()">
                                <i class="fas fa-download"></i> Export Data
                            </button>
                            <button class="profile-btn danger" onclick="accountPage.resetAccount()">
                                <i class="fas fa-trash"></i> Reset Account
                            </button>
                        </div>
                    </div>

                    <!-- Stats Grid -->
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">🛍️</div>
                            <div class="stat-number" id="items-saved">0</div>
                            <div class="stat-label">Items Saved</div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">🎨</div>
                            <div class="stat-number" id="fits-created">0</div>
                            <div class="stat-label">Fits Created</div>
                        </div>
                        
                        <div class="stat-icon">💎</div>
                            <div class="stat-number neon" id="loyalty-points">0</div>
                            <div class="stat-label">Loyalty Points</div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">⏱️</div>
                            <div class="stat-number" id="time-spent">0h</div>
                            <div class="stat-label">Time in System</div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">🔥</div>
                            <div class="stat-number" id="streak-days">0</div>
                            <div class="stat-label">Day Streak</div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">📈</div>
                            <div class="stat-number" id="level-number">1</div>
                            <div class="stat-label">Cult Level</div>
                        </div>
                    </div>

                    <!-- Loyalty System -->
                    <div class="loyalty-section">
                        <h2 class="section-title neon-secondary">LOYALTY STATUS</h2>
                        
                        <div class="loyalty-card">
                            <div class="loyalty-current">
                                <div class="loyalty-tier" id="current-tier">
                                    <div class="tier-icon">🧊</div>
                                    <div class="tier-info">
                                        <div class="tier-name">Street Starter</div>
                                        <div class="tier-desc">Welcome to the underground</div>
                                    </div>
                                </div>
                                
                                <div class="loyalty-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" id="loyalty-progress"></div>
                                    </div>
                                    <div class="progress-text">
                                        <span id="current-points">0</span> / <span id="next-tier-points">500</span> points
                                    </div>
                                </div>
                            </div>
                            
                            <div class="loyalty-tiers">
                                <div class="tier-item">
                                    <div class="tier-icon">🧊</div>
                                    <div class="tier-name">Street Starter</div>
                                    <div class="tier-requirement">0 points</div>
                                </div>
                                <div class="tier-item">
                                    <div class="tier-icon">💧</div>
                                    <div class="tier-name">Drip Dealer</div>
                                    <div class="tier-requirement">500 points</div>
                                </div>
                                <div class="tier-item">
                                    <div class="tier-icon">🛸</div>
                                    <div class="tier-name">Sephyx Saint</div>
                                    <div class="tier-requirement">1000 points</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Activity Timeline -->
                    <div class="activity-section">
                        <h2 class="section-title neon">ACTIVITY TIMELINE</h2>
                        <div class="timeline" id="activity-timeline">
                            <!-- Timeline events will be populated here -->
                        </div>
                    </div>

                    <!-- Achievements -->
                    <div class="achievements-section">
                        <h2 class="section-title neon-secondary">ACHIEVEMENTS</h2>
                        <div class="achievements-grid" id="achievements-grid">
                            <!-- Achievement badges will be populated here -->
                        </div>
                    </div>
                </div>

                <!-- Edit Profile Modal -->
                <div id="edit-profile-modal" class="modal-overlay">
                    <div class="modal-content">
                        <button class="modal-close" onclick="accountPage.closeEditModal()">
                            <i class="fas fa-times"></i>
                        </button>
                        
                        <h3 class="modal-title">Edit Profile</h3>
                        
                        <div class="edit-form">
                            <div class="form-group">
                                <label>Display Name</label>
                                <input type="text" id="edit-name" class="form-input">
                            </div>
                            
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" id="edit-email" class="form-input">
                            </div>
                            
                            <div class="form-group">
                                <label>Bio</label>
                                <textarea id="edit-bio" class="form-textarea" placeholder="Tell the underground about yourself..."></textarea>
                            </div>
                            
                            <div class="form-actions">
                                <button onclick="accountPage.saveProfile()" class="save-btn glitch-btn">
                                    Save Changes
                                </button>
                                <button onclick="accountPage.closeEditModal()" class="cancel-btn">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.loadUserData();
        this.addStyles();
        this.checkAccountStatus();
        
        // Track page view
        StorageManager.trackEvent('page_view', { page: 'account' });
    }

    addStyles() {
        if (document.getElementById('account-styles')) return;

        const style = document.createElement('style');
        style.id = 'account-styles';
        style.textContent = `
            .account-page {
                min-height: 100vh;
            }
            
            .account-header {
                text-align: center;
                margin-bottom: 3rem;
                padding: 2rem 0;
                background: radial-gradient(ellipse at center, rgba(0,255,255,0.1) 0%, transparent 70%);
                border-radius: 10px;
            }
            
            .page-title {
                font-size: clamp(2rem, 4vw, 3.5rem);
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .account-subtitle {
                color: var(--text-secondary);
                font-size: 1.2rem;
                font-style: italic;
            }
            
            .account-setup {
                max-width: 600px;
                margin: 0 auto;
            }
            
            .setup-card {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 15px;
                padding: 3rem;
                text-align: center;
                backdrop-filter: blur(10px);
            }
            
            .setup-title {
                font-size: 2rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .setup-desc {
                color: var(--text-secondary);
                margin-bottom: 2rem;
                line-height: 1.6;
            }
            
            .input-group {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .setup-input {
                background: rgba(0,0,0,0.5);
                border: 2px solid var(--border-color);
                border-radius: 10px;
                padding: 1rem 1.5rem;
                color: var(--text-primary);
                font-family: var(--font-primary);
                font-size: 1rem;
                transition: all var(--transition-normal);
                text-align: center;
            }
            
            .setup-input:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 20px rgba(0,255,255,0.3);
            }
            
            .setup-btn {
                padding: 1.2rem 2.5rem;
                font-size: 1.1rem;
            }
            
            .account-dashboard {
                display: grid;
                gap: 3rem;
            }
            
            .profile-section {
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 2rem;
                align-items: start;
            }
            
            .profile-card {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 15px;
                padding: 2rem;
                display: flex;
                gap: 2rem;
                align-items: center;
                backdrop-filter: blur(10px);
            }
            
            .profile-avatar {
                position: relative;
                flex-shrink: 0;
            }
            
            .avatar-image {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                color: var(--bg-color);
                position: relative;
                overflow: hidden;
            }
            
            .avatar-overlay {
                position: absolute;
                bottom: 0;
                right: 0;
                background: var(--primary-color);
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .avatar-btn {
                background: none;
                border: none;
                color: var(--bg-color);
                cursor: none;
                font-size: 0.8rem;
            }
            
            .profile-info {
                flex: 1;
            }
            
            .profile-name {
                color: var(--primary-color);
                font-size: 1.8rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            
            .profile-email {
                color: var(--text-secondary);
                margin-bottom: 0.5rem;
            }
            
            .profile-joined {
                color: var(--text-muted);
                font-size: 0.9rem;
                margin-bottom: 1rem;
            }
            
            .profile-badges {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .badge {
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                color: var(--bg-color);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .vault-badge {
                background: linear-gradient(45deg, var(--accent-color), var(--error-color));
            }
            
            .profile-actions {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .profile-btn {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                padding: 0.75rem 1.5rem;
                border-radius: 5px;
                cursor: none;
                transition: all var(--transition-normal);
                font-family: var(--font-primary);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
                white-space: nowrap;
            }
            
            .profile-btn:hover {
                border-color: var(--primary-color);
                color: var(--primary-color);
            }
            
            .profile-btn.danger:hover {
                border-color: var(--error-color);
                color: var(--error-color);
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
            }
            
            .stat-card {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 1.5rem;
                text-align: center;
                transition: all var(--transition-normal);
                cursor: none;
            }
            
            .stat-card:hover {
                transform: translateY(-5px);
                border-color: var(--primary-color);
                box-shadow: 0 10px 25px rgba(0,255,255,0.2);
            }
            
            .stat-icon {
                font-size: 2rem;
                margin-bottom: 1rem;
            }
            
            .stat-number {
                color: var(--primary-color);
                font-size: 2rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            
            .stat-label {
                color: var(--text-secondary);
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .loyalty-section {
                background: rgba(26,26,26,0.6);
                border-radius: 15px;
                padding: 2rem;
            }
            
            .section-title {
                text-align: center;
                font-size: 2rem;
                margin-bottom: 2rem;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .loyalty-card {
                background: rgba(0,0,0,0.5);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 2rem;
            }
            
            .loyalty-current {
                margin-bottom: 2rem;
            }
            
            .loyalty-tier {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.5rem;
            }
            
            .tier-icon {
                font-size: 3rem;
            }
            
            .tier-name {
                color: var(--primary-color);
                font-size: 1.5rem;
                font-weight: bold;
            }
            
            .tier-desc {
                color: var(--text-secondary);
                font-style: italic;
            }
            
            .loyalty-progress {
                margin-bottom: 1rem;
            }
            
            .progress-bar {
                background: var(--bg-secondary);
                border-radius: 10px;
                height: 10px;
                overflow: hidden;
                margin-bottom: 0.5rem;
            }
            
            .progress-fill {
                background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
                height: 100%;
                border-radius: 10px;
                transition: width 1s ease;
            }
            
            .progress-text {
                text-align: center;
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .loyalty-tiers {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
            }
            
            .tier-item {
                background: rgba(0,0,0,0.3);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 1rem;
                text-align: center;
                transition: all var(--transition-normal);
            }
            
            .tier-item:hover {
                border-color: var(--primary-color);
            }
            
            .tier-item .tier-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
            
            .tier-item .tier-name {
                font-size: 1rem;
                margin-bottom: 0.5rem;
            }
            
            .tier-requirement {
                color: var(--text-muted);
                font-size: 0.8rem;
            }
            
            .activity-section {
                background: rgba(26,26,26,0.6);
                border-radius: 15px;
                padding: 2rem;
            }
            
            .timeline {
                max-height: 400px;
                overflow-y: auto;
                padding: 1rem 0;
            }
            
            .timeline-event {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem 0;
                border-bottom: 1px solid var(--border-color);
                position: relative;
            }
            
            .timeline-event:last-child {
                border-bottom: none;
            }
            
            .timeline-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: var(--primary-color);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--bg-color);
                flex-shrink: 0;
            }
            
            .timeline-content {
                flex: 1;
            }
            
            .timeline-action {
                color: var(--text-primary);
                margin-bottom: 0.25rem;
            }
            
            .timeline-time {
                color: var(--text-muted);
                font-size: 0.8rem;
            }
            
            .achievements-section {
                background: rgba(26,26,26,0.6);
                border-radius: 15px;
                padding: 2rem;
            }
            
            .achievements-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 1.5rem;
            }
            
            .achievement-badge {
                background: rgba(0,0,0,0.5);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 1.5rem;
                text-align: center;
                transition: all var(--transition-normal);
                position: relative;
                overflow: hidden;
            }
            
            .achievement-badge.unlocked {
                border-color: var(--success-color);
                box-shadow: 0 0 20px rgba(0,255,128,0.3);
            }
            
            .achievement-badge.locked {
                opacity: 0.5;
                filter: grayscale(1);
            }
            
            .achievement-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            
            .achievement-name {
                color: var(--primary-color);
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            
            .achievement-desc {
                color: var(--text-secondary);
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                backdrop-filter: blur(10px);
            }
            
            .modal-overlay.active {
                display: flex;
            }
            
            .modal-content {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                padding: 2rem;
            }
            
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.5rem;
                cursor: none;
                transition: color var(--transition-normal);
            }
            
            .modal-close:hover {
                color: var(--primary-color);
            }
            
            .modal-title {
                color: var(--primary-color);
                font-size: 1.5rem;
                margin-bottom: 2rem;
                text-align: center;
            }
            
            .edit-form {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .form-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .form-group label {
                color: var(--text-primary);
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-size: 0.9rem;
            }
            
            .form-input,
            .form-textarea {
                background: rgba(0,0,0,0.5);
                border: 1px solid var(--border-color);
                border-radius: 5px;
                padding: 0.75rem;
                color: var(--text-primary);
                font-family: var(--font-primary);
                transition: all var(--transition-normal);
            }
            
            .form-input:focus,
            .form-textarea:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 10px rgba(0,255,255,0.3);
            }
            
            .form-textarea {
                min-height: 100px;
                resize: vertical;
            }
            
            .form-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .save-btn {
                padding: 0.75rem 2rem;
            }
            
            .cancel-btn {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                padding: 0.75rem 2rem;
                border-radius: 5px;
                cursor: none;
                transition: all var(--transition-normal);
                font-family: var(--font-primary);
            }
            
            .cancel-btn:hover {
                border-color: var(--error-color);
                color: var(--error-color);
            }
            
            @media (max-width: 768px) {
                .profile-section {
                    grid-template-columns: 1fr;
                }
                
                .profile-card {
                    flex-direction: column;
                    text-align: center;
                }
                
                .profile-actions {
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .stats-grid {
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                }
                
                .loyalty-tiers {
                    grid-template-columns: 1fr;
                }
                
                .input-group {
                    gap: 0.75rem;
                }
                
                .achievements-grid {
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    loadUserData() {
        this.userStats = StorageManager.getUserData();
        this.activityHistory = StorageManager.get('events', []).slice(-10).reverse();
        this.updateLoyaltyInfo();
    }

    checkAccountStatus() {
        const hasEmail = this.userStats.email && this.userStats.email.length > 0;
        
        if (hasEmail) {
            this.showDashboard();
        } else {
            this.showSetup();
        }
    }

    showSetup() {
        document.getElementById('account-setup').classList.remove('hidden');
        document.getElementById('account-dashboard').classList.add('hidden');
    }

    showDashboard() {
        document.getElementById('account-setup').classList.add('hidden');
        document.getElementById('account-dashboard').classList.remove('hidden');
        this.updateDashboard();
    }

    createAccount() {
        const email = document.getElementById('user-email').value.trim();
        const name = document.getElementById('user-name').value.trim();

        if (!email || !name) {
            window.sephyxApp.showNotification('Enter both email and name to proceed', 'error');
            return;
        }

        if (!this.validateEmail(email)) {
            window.sephyxApp.showNotification('Invalid email format', 'error');
            return;
        }

        // Save user data
        StorageManager.updateUserData({
            userEmail: email,
            userName: name,
            joinDate: new Date().toISOString()
        });

        // Add welcome points
        StorageManager.addLoyaltyPoints(100);

        // Add welcome activity
        StorageManager.trackEvent('account_created', { email, name });

        // Reload data and show dashboard
        this.loadUserData();
        this.showDashboard();

        // Show welcome message
        window.sephyxApp.showNotification(`Welcome to the underground, ${name}! 🔮`, 'success');

        // Add special effect
        if (window.particleSystem) {
            window.particleSystem.createBurst(window.innerWidth / 2, window.innerHeight / 2, 25);
        }
    }

    updateDashboard() {
        this.updateProfile();
        this.updateStats();
        this.updateLoyalty();
        this.updateTimeline();
        this.updateAchievements();
    }

    updateProfile() {
        document.getElementById('profile-name').textContent = this.userStats.userName || 'Cyber User';
        document.getElementById('profile-email').textContent = this.userStats.email || 'user@sephyx.com';
        
        const joinDate = new Date(this.userStats.joinDate).toLocaleDateString();
        document.getElementById('profile-joined').textContent = `Joined the underground: ${joinDate}`;

        // Update loyalty badge
        const loyaltyBadge = document.getElementById('loyalty-badge');
        loyaltyBadge.innerHTML = `
            <i class="fas fa-star"></i>
            <span>${this.userStats.loyaltyStatus}</span>
        `;

        // Show vault badge if user has access
        const vaultBadge = document.getElementById('vault-badge');
        if (this.userStats.vaultAccess) {
            vaultBadge.classList.remove('hidden');
        }
    }

    updateStats() {
        document.getElementById('items-saved').textContent = this.userStats.savedFits.length;
        document.getElementById('fits-created').textContent = this.userStats.customFits.length;
        document.getElementById('loyalty-points').textContent = this.userStats.loyaltyPoints.toLocaleString();
        
        // Calculate time spent (mock calculation)
        const daysSinceJoin = Math.floor((Date.now() - new Date(this.userStats.joinDate)) / (1000 * 60 * 60 * 24));
        document.getElementById('time-spent').textContent = `${Math.max(1, daysSinceJoin)}h`;
        
        // Calculate streak (mock)
        document.getElementById('streak-days').textContent = Math.min(daysSinceJoin, 30);
        
        // Calculate level
        const level = Math.floor(this.userStats.loyaltyPoints / 100) + 1;
        document.getElementById('level-number').textContent = level;
    }

    updateLoyaltyInfo() {
        const points = this.userStats.loyaltyPoints;
        
        if (points >= 1000) {
            this.loyaltyInfo = {
                current: 'Sephyx Saint',
                icon: '🛸',
                desc: 'Digital deity status achieved',
                currentPoints: points,
                nextTier: null,
                nextTierPoints: null,
                progress: 100
            };
        } else if (points >= 500) {
            this.loyaltyInfo = {
                current: 'Drip Dealer',
                icon: '💧',
                desc: 'Spreading the drip nationwide',
                currentPoints: points,
                nextTier: 'Sephyx Saint',
                nextTierPoints: 1000,
                progress: ((points - 500) / 500) * 100
            };
        } else {
            this.loyaltyInfo = {
                current: 'Street Starter',
                icon: '🧊',
                desc: 'Welcome to the underground',
                currentPoints: points,
                nextTier: 'Drip Dealer',
                nextTierPoints: 500,
                progress: (points / 500) * 100
            };
        }
    }

    updateLoyalty() {
        const currentTier = document.getElementById('current-tier');
        currentTier.innerHTML = `
            <div class="tier-icon">${this.loyaltyInfo.icon}</div>
            <div class="tier-info">
                <div class="tier-name">${this.loyaltyInfo.current}</div>
                <div class="tier-desc">${this.loyaltyInfo.desc}</div>
            </div>
        `;

        const progressFill = document.getElementById('loyalty-progress');
        progressFill.style.width = `${this.loyaltyInfo.progress}%`;

        document.getElementById('current-points').textContent = this.loyaltyInfo.currentPoints;
        
        if (this.loyaltyInfo.nextTierPoints) {
            document.getElementById('next-tier-points').textContent = this.loyaltyInfo.nextTierPoints;
        } else {
            document.querySelector('.progress-text').textContent = 'Maximum tier achieved!';
        }
    }

    updateTimeline() {
        const timeline = document.getElementById('activity-timeline');
        
        if (this.activityHistory.length === 0) {
            timeline.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No activity yet. Start exploring!</p>';
            return;
        }

        timeline.innerHTML = this.activityHistory.map(event => {
            const time = new Date(event.timestamp).toLocaleString();
            const icon = this.getEventIcon(event.name);
            const description = this.getEventDescription(event);

            return `
                <div class="timeline-event">
                    <div class="timeline-icon">
                        <i class="fas fa-${icon}"></i>
                    </div>
                    <div class="timeline-content">
                        <div class="timeline-action">${description}</div>
                        <div class="timeline-time">${time}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    getEventIcon(eventName) {
        const iconMap = {
            'account_created': 'user-plus',
            'page_view': 'eye',
            'add_to_cart': 'shopping-cart',
            'product_save_toggle': 'heart',
            'customizer_save_fit': 'palette',
            'newsletter_signup': 'envelope',
            'vault_access': 'unlock',
            'checkout_attempted': 'credit-card'
        };
        return iconMap[eventName] || 'circle';
    }

    getEventDescription(event) {
        const descriptions = {
            'account_created': 'Joined the SEPHYX underground',
            'page_view': `Explored ${event.data.page} section`,
            'add_to_cart': 'Added item to cart',
            'product_save_toggle': 'Saved/unsaved an item',
            'customizer_save_fit': `Created fit: "${event.data.fitName}"`,
            'newsletter_signup': 'Subscribed to underground updates',
            'vault_access': 'Unlocked The Vault',
            'checkout_attempted': 'Attempted checkout'
        };
        return descriptions[event.name] || event.name.replace(/_/g, ' ');
    }

    updateAchievements() {
        const achievements = [
            {
                id: 'first_visit',
                name: 'Digital Initiate',
                desc: 'Entered the SEPHYX system',
                icon: '🚪',
                unlocked: true
            },
            {
                id: 'first_save',
                name: 'Collector',
                desc: 'Saved your first item',
                icon: '💾',
                unlocked: this.userStats.savedFits.length > 0
            },
            {
                id: 'first_fit',
                name: 'Style Creator',
                desc: 'Created your first custom fit',
                icon: '🎨',
                unlocked: this.userStats.customFits.length > 0
            },
            {
                id: 'vault_access',
                name: 'Vault Keeper',
                desc: 'Unlocked The Vault',
                icon: '🔓',
                unlocked: this.userStats.vaultAccess
            },
            {
                id: 'loyalty_dealer',
                name: 'Drip Dealer',
                desc: 'Reached Drip Dealer status',
                icon: '💧',
                unlocked: this.userStats.loyaltyPoints >= 500
            },
            {
                id: 'loyalty_saint',
                name: 'Sephyx Saint',
                desc: 'Achieved maximum loyalty tier',
                icon: '🛸',
                unlocked: this.userStats.loyaltyPoints >= 1000
            }
        ];

        const grid = document.getElementById('achievements-grid');
        grid.innerHTML = achievements.map(achievement => `
            <div class="achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.desc}</div>
            </div>
        `).join('');
    }

    editProfile() {
        document.getElementById('edit-name').value = this.userStats.userName || '';
        document.getElementById('edit-email').value = this.userStats.email || '';
        document.getElementById('edit-bio').value = this.userStats.bio || '';
        
        document.getElementById('edit-profile-modal').classList.add('active');
    }

    closeEditModal() {
        document.getElementById('edit-profile-modal').classList.remove('active');
    }

    saveProfile() {
        const name = document.getElementById('edit-name').value.trim();
        const email = document.getElementById('edit-email').value.trim();
        const bio = document.getElementById('edit-bio').value.trim();

        if (!name || !email) {
            window.sephyxApp.showNotification('Name and email are required', 'error');
            return;
        }

        if (!this.validateEmail(email)) {
            window.sephyxApp.showNotification('Invalid email format', 'error');
            return;
        }

        // Update user data
        StorageManager.updateUserData({
            userName: name,
            userEmail: email,
            bio: bio
        });

        // Reload and update display
        this.loadUserData();
        this.updateProfile();
        this.closeEditModal();

        window.sephyxApp.showNotification('Profile updated successfully! ✨', 'success');
        
        // Track event
        StorageManager.trackEvent('profile_updated', { name, email });
    }

    changeAvatar() {
        // Mock avatar change functionality
        const avatars = ['👤', '🤖', '👽', '🦾', '🔮', '⚡', '💎', '🌟'];
        const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
        
        document.querySelector('.avatar-image').innerHTML = randomAvatar;
        
        // Store avatar preference
        StorageManager.set('userAvatar', randomAvatar);
        
        window.sephyxApp.showNotification('Avatar updated! 📸', 'success');
        
        // Track event
        StorageManager.trackEvent('avatar_changed', { avatar: randomAvatar });
    }

    exportData() {
        try {
            const data = StorageManager.exportData();
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `sephyx-data-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            window.sephyxApp.showNotification('Data exported successfully! 📊', 'success');
            
            // Track event
            StorageManager.trackEvent('data_exported');
            
        } catch (error) {
            window.sephyxApp.showNotification('Failed to export data', 'error');
        }
    }

    resetAccount() {
        const confirmed = confirm('⚠️ This will permanently delete all your data. Are you absolutely sure?');
        if (!confirmed) return;

        const doubleConfirm = confirm('This action cannot be undone. Type "DELETE" in the next prompt to confirm.');
        if (!doubleConfirm) return;

        const deleteConfirm = prompt('Type "DELETE" to confirm account reset:');
        if (deleteConfirm !== 'DELETE') {
            window.sephyxApp.showNotification('Account reset cancelled', 'info');
            return;
        }

        // Clear all data
        StorageManager.clear();
        
        // Reload page data
        this.loadUserData();
        this.showSetup();

        window.sephyxApp.showNotification('Account reset successfully. Welcome back! 🔄', 'info');
        
        // Track event (will be the only event in clean storage)
        StorageManager.trackEvent('account_reset');
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Export for global use
window.AccountPage = AccountPage;
