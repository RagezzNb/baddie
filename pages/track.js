// Track Order Page Component
class TrackPage {
    constructor() {
        this.trackingStatuses = [
            { status: '🟢 Out for delivery', description: 'Your order is on the way!' },
            { status: '📦 COD – Get Ready', description: 'Prepare cash for delivery' },
            { status: '🚚 ETA: Tonight', description: 'Delivery expected today' },
            { status: '✅ Order Confirmed', description: 'Your order has been confirmed' },
            { status: '👕 Being Prepared', description: 'Your drip is being prepared' },
            { status: '🎯 Quality Check', description: 'Final quality inspection' },
            { status: '📍 In Transit', description: 'En route to your location' },
            { status: '🔄 Processing', description: 'Order is being processed' }
        ];
    }

    async render() {
        return `
            <div class="track-page page-container">
                <!-- Page Header -->
                <div class="track-header">
                    <h1 class="page-title glitch neon" data-text="TRACK ORDER">TRACK ORDER</h1>
                    <p class="track-subtitle">Monitor your drip delivery in real-time</p>
                </div>

                <!-- Tracking Form -->
                <div class="tracking-form-section">
                    <div class="tracking-form-card">
                        <h2 class="form-title neon-secondary">ENTER ORDER ID</h2>
                        <p class="form-desc">Enter your order ID to track your SEPHYX delivery</p>
                        
                        <div class="tracking-form">
                            <div class="input-group">
                                <input type="text" id="order-id" placeholder="SPX-XXXX-XXXX" class="tracking-input" maxlength="12">
                                <button onclick="trackPage.trackOrder()" class="track-btn glitch-btn">
                                    <i class="fas fa-search"></i> Track Order
                                </button>
                            </div>
                            <p class="input-hint">Order ID format: SPX-1234-5678</p>
                        </div>
                    </div>
                </div>

                <!-- Tracking Results -->
                <div class="tracking-results hidden" id="tracking-results">
                    <div class="tracking-card">
                        <div class="tracking-header">
                            <h3 class="tracking-title">Order Status</h3>
                            <div class="order-id-display" id="order-id-display"></div>
                        </div>
                        
                        <div class="status-display" id="status-display">
                            <!-- Status will be populated here -->
                        </div>
                        
                        <div class="tracking-timeline" id="tracking-timeline">
                            <!-- Timeline will be populated here -->
                        </div>
                        
                        <div class="delivery-info" id="delivery-info">
                            <!-- Delivery info will be populated here -->
                        </div>
                        
                        <div class="tracking-actions">
                            <button onclick="trackPage.contactSupport()" class="action-btn">
                                <i class="fas fa-headset"></i> Contact Support
                            </button>
                            <button onclick="trackPage.trackAnother()" class="action-btn">
                                <i class="fas fa-search"></i> Track Another
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Sample Orders -->
                <div class="sample-orders-section">
                    <h2 class="section-title neon">TRY THESE SAMPLE ORDERS</h2>
                    <p class="sample-desc">Don't have an order yet? Try these demo tracking IDs</p>
                    
                    <div class="sample-grid">
                        <div class="sample-card" onclick="trackPage.useSample('SPX-2024-0001')">
                            <div class="sample-icon">🚚</div>
                            <div class="sample-id">SPX-2024-0001</div>
                            <div class="sample-status">Out for Delivery</div>
                        </div>
                        
                        <div class="sample-card" onclick="trackPage.useSample('SPX-2024-0002')">
                            <div class="sample-icon">📦</div>
                            <div class="sample-id">SPX-2024-0002</div>
                            <div class="sample-status">Being Prepared</div>
                        </div>
                        
                        <div class="sample-card" onclick="trackPage.useSample('SPX-2024-0003')">
                            <div class="sample-icon">✅</div>
                            <div class="sample-id">SPX-2024-0003</div>
                            <div class="sample-status">Order Confirmed</div>
                        </div>
                    </div>
                </div>

                <!-- How to Order -->
                <div class="how-to-order-section">
                    <h2 class="section-title neon-secondary">HOW TO ORDER</h2>
                    
                    <div class="steps-grid">
                        <div class="step-card">
                            <div class="step-number">01</div>
                            <div class="step-icon">📱</div>
                            <h3>DM on Instagram</h3>
                            <p>Send us a DM @sephyxofficial with your order</p>
                        </div>
                        
                        <div class="step-card">
                            <div class="step-number">02</div>
                            <div class="step-icon">✅</div>
                            <h3>Order Confirmation</h3>
                            <p>We'll confirm your order and provide an order ID</p>
                        </div>
                        
                        <div class="step-card">
                            <div class="step-number">03</div>
                            <div class="step-icon">📦</div>
                            <h3>Preparation</h3>
                            <p>Your drip gets prepared and quality checked</p>
                        </div>
                        
                        <div class="step-card">
                            <div class="step-number">04</div>
                            <div class="step-icon">🚚</div>
                            <h3>Delivery</h3>
                            <p>Cash on delivery anywhere in Qatar</p>
                        </div>
                    </div>
                </div>

                <!-- FAQ -->
                <div class="tracking-faq">
                    <h2 class="section-title neon">TRACKING FAQ</h2>
                    
                    <div class="faq-grid">
                        <div class="faq-item">
                            <h4>When will I get my tracking ID?</h4>
                            <p>You'll receive your tracking ID via Instagram DM once your order is confirmed and being prepared.</p>
                        </div>
                        
                        <div class="faq-item">
                            <h4>How long does delivery take?</h4>
                            <p>Same-day delivery in Doha, next-day for other areas in Qatar. We'll keep you updated!</p>
                        </div>
                        
                        <div class="faq-item">
                            <h4>Can I change my delivery address?</h4>
                            <p>Contact us immediately via Instagram if you need to change your delivery address.</p>
                        </div>
                        
                        <div class="faq-item">
                            <h4>What if I'm not home for delivery?</h4>
                            <p>Our delivery team will call you. We can reschedule or leave with someone you trust.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.addStyles();
        this.bindEvents();
        
        // Track page view
        StorageManager.trackEvent('page_view', { page: 'track' });
    }

    addStyles() {
        if (document.getElementById('track-styles')) return;

        const style = document.createElement('style');
        style.id = 'track-styles';
        style.textContent = `
            .track-page {
                min-height: 100vh;
            }
            
            .track-header {
                text-align: center;
                margin-bottom: 3rem;
                padding: 2rem 0;
                background: radial-gradient(ellipse at center, rgba(255,0,255,0.1) 0%, transparent 70%);
                border-radius: 10px;
            }
            
            .page-title {
                font-size: clamp(2rem, 4vw, 3.5rem);
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .track-subtitle {
                color: var(--text-secondary);
                font-size: 1.2rem;
                font-style: italic;
            }
            
            .tracking-form-section {
                max-width: 600px;
                margin: 0 auto 3rem;
            }
            
            .tracking-form-card {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 15px;
                padding: 3rem;
                text-align: center;
                backdrop-filter: blur(10px);
            }
            
            .form-title {
                font-size: 1.8rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            
            .form-desc {
                color: var(--text-secondary);
                margin-bottom: 2rem;
                line-height: 1.6;
            }
            
            .input-group {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .tracking-input {
                flex: 1;
                background: rgba(0,0,0,0.5);
                border: 2px solid var(--border-color);
                border-radius: 10px;
                padding: 1rem 1.5rem;
                color: var(--text-primary);
                font-family: var(--font-primary);
                font-size: 1.1rem;
                text-align: center;
                text-transform: uppercase;
                letter-spacing: 2px;
                transition: all var(--transition-normal);
            }
            
            .tracking-input:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 20px rgba(0,255,255,0.3);
            }
            
            .track-btn {
                padding: 1rem 2rem;
                font-size: 1rem;
                white-space: nowrap;
            }
            
            .input-hint {
                color: var(--text-muted);
                font-size: 0.9rem;
                font-style: italic;
            }
            
            .tracking-results {
                max-width: 800px;
                margin: 0 auto 3rem;
            }
            
            .tracking-card {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 15px;
                padding: 2rem;
                backdrop-filter: blur(10px);
            }
            
            .tracking-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .tracking-title {
                color: var(--primary-color);
                font-size: 1.5rem;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            
            .order-id-display {
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                color: var(--bg-color);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-weight: bold;
                font-family: var(--font-secondary);
            }
            
            .status-display {
                text-align: center;
                margin-bottom: 2rem;
                padding: 2rem;
                background: rgba(0,0,0,0.3);
                border-radius: 10px;
                border: 1px solid var(--border-color);
            }
            
            .current-status {
                font-size: 2rem;
                margin-bottom: 1rem;
                animation: pulse 2s ease-in-out infinite;
            }
            
            .status-description {
                color: var(--text-secondary);
                font-size: 1.1rem;
                margin-bottom: 1rem;
            }
            
            .estimated-time {
                color: var(--primary-color);
                font-weight: bold;
                font-size: 1.2rem;
            }
            
            .tracking-timeline {
                margin-bottom: 2rem;
            }
            
            .timeline-step {
                display: flex;
                align-items: center;
                margin-bottom: 1rem;
                padding: 1rem;
                border-radius: 10px;
                transition: all var(--transition-normal);
            }
            
            .timeline-step.completed {
                background: rgba(0,255,128,0.1);
                border: 1px solid var(--success-color);
            }
            
            .timeline-step.current {
                background: rgba(0,255,255,0.1);
                border: 1px solid var(--primary-color);
                box-shadow: 0 0 20px rgba(0,255,255,0.3);
            }
            
            .timeline-step.pending {
                background: rgba(26,26,26,0.5);
                border: 1px solid var(--border-color);
                opacity: 0.6;
            }
            
            .timeline-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                font-size: 1.2rem;
                flex-shrink: 0;
            }
            
            .timeline-step.completed .timeline-icon {
                background: var(--success-color);
                color: var(--bg-color);
            }
            
            .timeline-step.current .timeline-icon {
                background: var(--primary-color);
                color: var(--bg-color);
                animation: pulse 2s ease-in-out infinite;
            }
            
            .timeline-step.pending .timeline-icon {
                background: var(--bg-secondary);
                color: var(--text-muted);
                border: 2px solid var(--border-color);
            }
            
            .timeline-content {
                flex: 1;
            }
            
            .timeline-title {
                color: var(--text-primary);
                font-weight: bold;
                margin-bottom: 0.25rem;
            }
            
            .timeline-time {
                color: var(--text-muted);
                font-size: 0.9rem;
            }
            
            .delivery-info {
                background: rgba(0,0,0,0.3);
                padding: 1.5rem;
                border-radius: 10px;
                margin-bottom: 2rem;
            }
            
            .delivery-detail {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
                color: var(--text-secondary);
            }
            
            .delivery-detail strong {
                color: var(--text-primary);
            }
            
            .tracking-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .action-btn {
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
            }
            
            .action-btn:hover {
                border-color: var(--primary-color);
                color: var(--primary-color);
                transform: translateY(-2px);
            }
            
            .sample-orders-section {
                margin: 4rem 0;
                text-align: center;
            }
            
            .section-title {
                font-size: 2rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 3px;
                text-align: center;
            }
            
            .sample-desc {
                color: var(--text-secondary);
                margin-bottom: 2rem;
            }
            
            .sample-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                max-width: 800px;
                margin: 0 auto;
            }
            
            .sample-card {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 2rem 1rem;
                text-align: center;
                cursor: none;
                transition: all var(--transition-normal);
                backdrop-filter: blur(10px);
            }
            
            .sample-card:hover {
                transform: translateY(-5px);
                border-color: var(--primary-color);
                box-shadow: 0 10px 25px rgba(0,255,255,0.2);
            }
            
            .sample-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            
            .sample-id {
                color: var(--primary-color);
                font-weight: bold;
                font-family: var(--font-secondary);
                margin-bottom: 0.5rem;
                font-size: 1.1rem;
            }
            
            .sample-status {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .how-to-order-section {
                margin: 4rem 0;
                padding: 3rem 0;
                background: linear-gradient(45deg, rgba(26,26,26,0.8), rgba(10,10,10,0.9));
                border-radius: 15px;
            }
            
            .steps-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
                max-width: 1000px;
                margin: 0 auto;
                padding: 0 2rem;
            }
            
            .step-card {
                background: rgba(0,0,0,0.5);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 2rem;
                text-align: center;
                position: relative;
                transition: all var(--transition-normal);
            }
            
            .step-card:hover {
                border-color: var(--primary-color);
                box-shadow: 0 10px 25px rgba(0,255,255,0.2);
            }
            
            .step-number {
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                color: var(--bg-color);
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 0.9rem;
            }
            
            .step-icon {
                font-size: 2.5rem;
                margin: 1rem 0;
            }
            
            .step-card h3 {
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-size: 1.2rem;
            }
            
            .step-card p {
                color: var(--text-secondary);
                line-height: 1.6;
            }
            
            .tracking-faq {
                margin: 4rem 0;
            }
            
            .faq-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                max-width: 1000px;
                margin: 0 auto;
            }
            
            .faq-item {
                background: rgba(26,26,26,0.6);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 1.5rem;
                transition: all var(--transition-normal);
            }
            
            .faq-item:hover {
                border-color: var(--primary-color);
                box-shadow: 0 5px 20px rgba(0,255,255,0.2);
            }
            
            .faq-item h4 {
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-size: 1.1rem;
            }
            
            .faq-item p {
                color: var(--text-secondary);
                line-height: 1.6;
                margin: 0;
            }
            
            @media (max-width: 768px) {
                .input-group {
                    flex-direction: column;
                }
                
                .tracking-header {
                    flex-direction: column;
                    gap: 1rem;
                    text-align: center;
                }
                
                .tracking-actions {
                    flex-direction: column;
                }
                
                .sample-grid {
                    grid-template-columns: 1fr;
                }
                
                .steps-grid {
                    grid-template-columns: 1fr;
                    padding: 0 1rem;
                }
                
                .faq-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    bindEvents() {
        // Enter key handling for order ID input
        const orderInput = document.getElementById('order-id');
        if (orderInput) {
            orderInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.trackOrder();
                }
            });

            // Format input as user types
            orderInput.addEventListener('input', (e) => {
                this.formatOrderId(e.target);
            });
        }
    }

    formatOrderId(input) {
        let value = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        
        // Format as SPX-XXXX-XXXX
        if (value.length > 3) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        }
        if (value.length > 8) {
            value = value.slice(0, 8) + '-' + value.slice(8, 12);
        }
        
        input.value = value;
    }

    trackOrder() {
        const orderId = document.getElementById('order-id').value.trim();
        
        if (!orderId) {
            window.sephyxApp.showNotification('Please enter an order ID', 'error');
            return;
        }

        if (!this.validateOrderId(orderId)) {
            window.sephyxApp.showNotification('Invalid order ID format. Use SPX-XXXX-XXXX', 'error');
            return;
        }

        // Show loading state
        this.showLoading();

        // Simulate API call delay
        setTimeout(() => {
            this.showTrackingResults(orderId);
        }, 2000);

        // Track event
        StorageManager.trackEvent('order_tracking', { orderId });
    }

    validateOrderId(orderId) {
        const pattern = /^SPX-\d{4}-\d{4}$/;
        return pattern.test(orderId);
    }

    showLoading() {
        const resultsDiv = document.getElementById('tracking-results');
        resultsDiv.classList.remove('hidden');
        resultsDiv.innerHTML = `
            <div class="tracking-card">
                <div class="loading-state">
                    <div class="spinner"></div>
                    <h3>Tracking your order...</h3>
                    <p>Connecting to SEPHYX delivery network</p>
                </div>
            </div>
        `;

        // Add loading styles
        if (!document.getElementById('loading-styles')) {
            const loadingStyle = document.createElement('style');
            loadingStyle.id = 'loading-styles';
            loadingStyle.textContent = `
                .loading-state {
                    text-align: center;
                    padding: 3rem 2rem;
                    color: var(--text-secondary);
                }
                
                .loading-state .spinner {
                    margin: 0 auto 2rem;
                }
                
                .loading-state h3 {
                    color: var(--primary-color);
                    margin-bottom: 1rem;
                }
            `;
            document.head.appendChild(loadingStyle);
        }
    }

    showTrackingResults(orderId) {
        // Generate random tracking data
        const randomStatus = this.trackingStatuses[Math.floor(Math.random() * this.trackingStatuses.length)];
        const randomETA = this.generateRandomETA();
        const trackingData = this.generateTrackingTimeline(randomStatus);

        document.getElementById('order-id-display').textContent = orderId;
        
        const statusDisplay = document.getElementById('status-display');
        statusDisplay.innerHTML = `
            <div class="current-status">${randomStatus.status}</div>
            <div class="status-description">${randomStatus.description}</div>
            <div class="estimated-time">${randomETA}</div>
        `;

        const timeline = document.getElementById('tracking-timeline');
        timeline.innerHTML = trackingData.map(step => `
            <div class="timeline-step ${step.status}">
                <div class="timeline-icon">
                    <i class="fas fa-${step.icon}"></i>
                </div>
                <div class="timeline-content">
                    <div class="timeline-title">${step.title}</div>
                    <div class="timeline-time">${step.time}</div>
                </div>
            </div>
        `).join('');

        const deliveryInfo = document.getElementById('delivery-info');
        deliveryInfo.innerHTML = `
            <h4 style="color: var(--primary-color); margin-bottom: 1rem;">Delivery Information</h4>
            <div class="delivery-detail">
                <span>Payment Method:</span>
                <strong>Cash on Delivery</strong>
            </div>
            <div class="delivery-detail">
                <span>Delivery Area:</span>
                <strong>Qatar</strong>
            </div>
            <div class="delivery-detail">
                <span>Contact:</span>
                <strong>Via Instagram DM</strong>
            </div>
            <div class="delivery-detail">
                <span>Order Value:</span>
                <strong>QR ${Math.floor(Math.random() * 500) + 100}</strong>
            </div>
        `;

        // Re-render the full results
        const resultsDiv = document.getElementById('tracking-results');
        resultsDiv.innerHTML = `
            <div class="tracking-card">
                <div class="tracking-header">
                    <h3 class="tracking-title">Order Status</h3>
                    <div class="order-id-display">${orderId}</div>
                </div>
                
                <div class="status-display">
                    <div class="current-status">${randomStatus.status}</div>
                    <div class="status-description">${randomStatus.description}</div>
                    <div class="estimated-time">${randomETA}</div>
                </div>
                
                <div class="tracking-timeline">
                    ${trackingData.map(step => `
                        <div class="timeline-step ${step.status}">
                            <div class="timeline-icon">
                                <i class="fas fa-${step.icon}"></i>
                            </div>
                            <div class="timeline-content">
                                <div class="timeline-title">${step.title}</div>
                                <div class="timeline-time">${step.time}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="delivery-info">
                    <h4 style="color: var(--primary-color); margin-bottom: 1rem;">Delivery Information</h4>
                    <div class="delivery-detail">
                        <span>Payment Method:</span>
                        <strong>Cash on Delivery</strong>
                    </div>
                    <div class="delivery-detail">
                        <span>Delivery Area:</span>
                        <strong>Qatar</strong>
                    </div>
                    <div class="delivery-detail">
                        <span>Contact:</span>
                        <strong>Via Instagram DM</strong>
                    </div>
                    <div class="delivery-detail">
                        <span>Order Value:</span>
                        <strong>QR ${Math.floor(Math.random() * 500) + 100}</strong>
                    </div>
                </div>
                
                <div class="tracking-actions">
                    <button onclick="trackPage.contactSupport()" class="action-btn">
                        <i class="fas fa-headset"></i> Contact Support
                    </button>
                    <button onclick="trackPage.trackAnother()" class="action-btn">
                        <i class="fas fa-search"></i> Track Another
                    </button>
                </div>
            </div>
        `;

        window.sephyxApp.showNotification('Order found! 📦', 'success');
    }

    generateRandomETA() {
        const options = [
            'ETA: Tonight (6-8 PM)',
            'ETA: Tomorrow Morning',
            'ETA: Within 2 hours',
            'ETA: Today 3-5 PM',
            'ETA: Next business day'
        ];
        return options[Math.floor(Math.random() * options.length)];
    }

    generateTrackingTimeline(currentStatus) {
        const allSteps = [
            { title: 'Order Placed', icon: 'check', time: '2 days ago' },
            { title: 'Order Confirmed', icon: 'clipboard-check', time: '2 days ago' },
            { title: 'Being Prepared', icon: 'tshirt', time: '1 day ago' },
            { title: 'Quality Check', icon: 'search', time: '12 hours ago' },
            { title: 'Out for Delivery', icon: 'truck', time: '2 hours ago' },
            { title: 'Delivered', icon: 'home', time: 'Pending' }
        ];

        // Randomly determine current step
        const currentStepIndex = Math.floor(Math.random() * (allSteps.length - 1));

        return allSteps.map((step, index) => ({
            ...step,
            status: index < currentStepIndex ? 'completed' : 
                   index === currentStepIndex ? 'current' : 'pending'
        }));
    }

    useSample(orderId) {
        document.getElementById('order-id').value = orderId;
        this.trackOrder();
        
        // Scroll to results
        setTimeout(() => {
            document.getElementById('tracking-results').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }, 2500);
    }

    contactSupport() {
        const message = 'Hi SEPHYX! I need help with my order tracking. Can you assist me?';
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://www.instagram.com/direct/new/?text=${encodedMessage}`, '_blank');
        
        StorageManager.trackEvent('tracking_support_contact');
    }

    trackAnother() {
        document.getElementById('order-id').value = '';
        document.getElementById('tracking-results').classList.add('hidden');
        document.getElementById('order-id').focus();
        
        // Scroll to form
        document.querySelector('.tracking-form-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

// Export for global use
window.TrackPage = TrackPage;
