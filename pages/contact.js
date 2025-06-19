// Contact Page Component
class ContactPage {
    constructor() {
        this.contactInfo = {
            location: 'Qatar',
            paymentMethod: 'Cash on Delivery Only',
            instagram: '@sephyxofficial',
            email: 'contact@sephyx.digital'
        };
    }

    async render() {
        return `
            <div class="contact-page page-container">
                <!-- Page Header -->
                <div class="contact-header">
                    <h1 class="page-title glitch neon" data-text="CONTACT">CONTACT</h1>
                    <p class="contact-subtitle">Connect with the digital underground</p>
                </div>

                <!-- Contact Grid -->
                <div class="contact-grid">
                    <!-- Contact Info -->
                    <div class="contact-info-section">
                        <h2 class="section-title neon-secondary">GET IN TOUCH</h2>
                        
                        <div class="contact-cards">
                            <div class="contact-card">
                                <div class="contact-icon">📍</div>
                                <h3>Location</h3>
                                <p>Based in Qatar</p>
                                <div class="contact-detail">Serving the Gulf region with premium streetwear</div>
                            </div>
                            
                            <div class="contact-card">
                                <div class="contact-icon">💰</div>
                                <h3>Payment</h3>
                                <p>Cash on Delivery Only</p>
                                <div class="contact-detail">Secure payment upon receipt</div>
                            </div>
                            
                            <div class="contact-card instagram-card" onclick="contactPage.openInstagram()">
                                <div class="contact-icon">📱</div>
                                <h3>Instagram</h3>
                                <p>@sephyxofficial</p>
                                <div class="contact-detail">DM us for orders, questions, or collabs</div>
                                <button class="contact-btn">
                                    <i class="fab fa-instagram"></i> Follow Us
                                </button>
                            </div>
                            
                            <div class="contact-card">
                                <div class="contact-icon">✉️</div>
                                <h3>Email</h3>
                                <p>contact@sephyx.digital</p>
                                <div class="contact-detail">For business inquiries and support</div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div class="contact-form-section">
                        <h2 class="section-title neon">SEND MESSAGE</h2>
                        
                        <form class="contact-form" id="contact-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="contact-name">Name</label>
                                    <input type="text" id="contact-name" name="name" required class="form-input">
                                </div>
                                <div class="form-group">
                                    <label for="contact-email">Email</label>
                                    <input type="email" id="contact-email" name="email" required class="form-input">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="contact-phone">Phone (Qatar)</label>
                                <input type="tel" id="contact-phone" name="phone" placeholder="+974 XXXX XXXX" class="form-input">
                            </div>
                            
                            <div class="form-group">
                                <label for="contact-subject">Subject</label>
                                <select id="contact-subject" name="subject" required class="form-select">
                                    <option value="">Select a topic</option>
                                    <option value="order">Place Order</option>
                                    <option value="inquiry">Product Inquiry</option>
                                    <option value="collaboration">Collaboration</option>
                                    <option value="support">Customer Support</option>
                                    <option value="wholesale">Wholesale/Business</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="contact-message">Message</label>
                                <textarea id="contact-message" name="message" rows="6" required class="form-textarea" placeholder="Tell us about your inquiry..."></textarea>
                            </div>
                            
                            <button type="submit" class="submit-btn glitch-btn">
                                <i class="fas fa-paper-plane"></i> Send Message
                            </button>
                        </form>
                    </div>
                </div>

                <!-- FAQ Section -->
                <div class="faq-section">
                    <h2 class="section-title neon-secondary">FREQUENTLY ASKED</h2>
                    
                    <div class="faq-grid">
                        <div class="faq-item">
                            <h3 class="faq-question">How do I place an order?</h3>
                            <div class="faq-answer">
                                <p>DM us on Instagram @sephyxofficial with your order details. We'll confirm availability and arrange cash on delivery.</p>
                            </div>
                        </div>
                        
                        <div class="faq-item">
                            <h3 class="faq-question">Do you ship outside Qatar?</h3>
                            <div class="faq-answer">
                                <p>Currently, we only deliver within Qatar with cash on delivery. International shipping coming soon to the digital underground.</p>
                            </div>
                        </div>
                        
                        <div class="faq-item">
                            <h3 class="faq-question">What's your return policy?</h3>
                            <div class="faq-answer">
                                <p>We accept returns within 7 days for unworn items with tags. Contact us immediately if there are any issues with your order.</p>
                            </div>
                        </div>
                        
                        <div class="faq-item">
                            <h3 class="faq-question">How long is delivery?</h3>
                            <div class="faq-answer">
                                <p>Same-day delivery in Doha, next-day for other areas in Qatar. We'll provide tracking info via WhatsApp.</p>
                            </div>
                        </div>
                        
                        <div class="faq-item">
                            <h3 class="faq-question">Do you do custom designs?</h3>
                            <div class="faq-answer">
                                <p>Yes! We love collaborating on custom pieces. DM us your ideas and we'll make your cyberpunk dreams reality.</p>
                            </div>
                        </div>
                        
                        <div class="faq-item">
                            <h3 class="faq-question">What about wholesale orders?</h3>
                            <div class="faq-answer">
                                <p>We offer wholesale pricing for retailers and businesses. Contact us directly to discuss volume discounts and terms.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Contact -->
                <div class="quick-contact-section">
                    <h2 class="section-title neon">QUICK CONNECT</h2>
                    
                    <div class="quick-contact-grid">
                        <button class="quick-btn" onclick="contactPage.quickOrder()">
                            <i class="fas fa-shopping-bag"></i>
                            <span>Quick Order</span>
                            <small>Start your order via Instagram</small>
                        </button>
                        
                        <button class="quick-btn" onclick="contactPage.sizeGuide()">
                            <i class="fas fa-ruler"></i>
                            <span>Size Guide</span>
                            <small>Find your perfect fit</small>
                        </button>
                        
                        <button class="quick-btn" onclick="contactPage.collaboration()">
                            <i class="fas fa-handshake"></i>
                            <span>Collaborate</span>
                            <small>Work with SEPHYX</small>
                        </button>
                        
                        <button class="quick-btn" onclick="contactPage.support()">
                            <i class="fas fa-headset"></i>
                            <span>Support</span>
                            <small>Get help instantly</small>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.addStyles();
        this.bindEvents();
        
        // Track page view
        StorageManager.trackEvent('page_view', { page: 'contact' });
    }

    addStyles() {
        if (document.getElementById('contact-styles')) return;

        const style = document.createElement('style');
        style.id = 'contact-styles';
        style.textContent = `
            .contact-page {
                min-height: 100vh;
            }
            
            .contact-header {
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
            
            .contact-subtitle {
                color: var(--text-secondary);
                font-size: 1.2rem;
                font-style: italic;
            }
            
            .contact-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 3rem;
                margin-bottom: 4rem;
            }
            
            .section-title {
                color: var(--primary-color);
                font-size: 1.8rem;
                margin-bottom: 2rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                text-align: center;
            }
            
            .contact-cards {
                display: grid;
                gap: 1.5rem;
            }
            
            .contact-card {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 2rem;
                text-align: center;
                transition: all var(--transition-normal);
                cursor: none;
                backdrop-filter: blur(10px);
            }
            
            .contact-card:hover {
                transform: translateY(-5px);
                border-color: var(--primary-color);
                box-shadow: 0 15px 30px rgba(0,255,255,0.2);
            }
            
            .instagram-card {
                cursor: pointer;
            }
            
            .instagram-card:hover {
                border-color: var(--secondary-color);
                box-shadow: 0 15px 30px rgba(255,0,255,0.2);
            }
            
            .contact-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            
            .contact-card h3 {
                color: var(--primary-color);
                margin-bottom: 0.5rem;
                font-size: 1.2rem;
            }
            
            .contact-card p {
                color: var(--text-primary);
                font-weight: bold;
                margin-bottom: 1rem;
                font-size: 1.1rem;
            }
            
            .contact-detail {
                color: var(--text-secondary);
                font-size: 0.9rem;
                line-height: 1.4;
                margin-bottom: 1rem;
            }
            
            .contact-btn {
                background: linear-gradient(45deg, var(--secondary-color), var(--primary-color));
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
            
            .contact-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(255,0,255,0.4);
            }
            
            .contact-form {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 2rem;
                backdrop-filter: blur(10px);
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                margin-bottom: 1.5rem;
            }
            
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-group label {
                display: block;
                color: var(--text-primary);
                font-weight: 600;
                margin-bottom: 0.5rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-size: 0.9rem;
            }
            
            .form-input,
            .form-select,
            .form-textarea {
                width: 100%;
                background: rgba(0,0,0,0.5);
                border: 1px solid var(--border-color);
                border-radius: 5px;
                padding: 0.75rem;
                color: var(--text-primary);
                font-family: var(--font-primary);
                font-size: 1rem;
                transition: all var(--transition-normal);
            }
            
            .form-input:focus,
            .form-select:focus,
            .form-textarea:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 15px rgba(0,255,255,0.3);
            }
            
            .form-textarea {
                resize: vertical;
                min-height: 120px;
            }
            
            .submit-btn {
                width: 100%;
                padding: 1rem 2rem;
                font-size: 1.1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }
            
            .faq-section {
                margin: 4rem 0;
                padding: 3rem 0;
                background: linear-gradient(45deg, rgba(26,26,26,0.8), rgba(10,10,10,0.9));
                border-radius: 15px;
            }
            
            .faq-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
            }
            
            .faq-item {
                background: rgba(0,0,0,0.5);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 1.5rem;
                transition: all var(--transition-normal);
                cursor: none;
            }
            
            .faq-item:hover {
                border-color: var(--primary-color);
                box-shadow: 0 5px 20px rgba(0,255,255,0.2);
            }
            
            .faq-question {
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-size: 1.1rem;
                line-height: 1.3;
            }
            
            .faq-answer p {
                color: var(--text-secondary);
                line-height: 1.6;
                margin: 0;
            }
            
            .quick-contact-section {
                margin: 4rem 0;
                text-align: center;
            }
            
            .quick-contact-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                max-width: 800px;
                margin: 0 auto;
            }
            
            .quick-btn {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 2rem 1rem;
                color: var(--text-primary);
                font-family: var(--font-primary);
                cursor: none;
                transition: all var(--transition-normal);
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
            }
            
            .quick-btn:hover {
                transform: translateY(-5px);
                border-color: var(--primary-color);
                box-shadow: 0 10px 25px rgba(0,255,255,0.2);
            }
            
            .quick-btn i {
                font-size: 2rem;
                color: var(--primary-color);
                margin-bottom: 0.5rem;
            }
            
            .quick-btn span {
                font-weight: bold;
                font-size: 1.1rem;
                margin-bottom: 0.25rem;
            }
            
            .quick-btn small {
                color: var(--text-secondary);
                font-size: 0.8rem;
            }
            
            @media (max-width: 768px) {
                .contact-grid {
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
                
                .form-row {
                    grid-template-columns: 1fr;
                }
                
                .faq-grid {
                    grid-template-columns: 1fr;
                    padding: 0 1rem;
                }
                
                .quick-contact-grid {
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                }
                
                .quick-btn {
                    padding: 1.5rem 1rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    bindEvents() {
        // Contact form submission
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitForm();
            });
        }
    }

    submitForm() {
        const formData = new FormData(document.getElementById('contact-form'));
        const data = Object.fromEntries(formData);

        // Validate required fields
        if (!data.name || !data.email || !data.subject || !data.message) {
            window.sephyxApp.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Generate Instagram message
        const message = `Hi SEPHYX! 

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Subject: ${data.subject}

Message:
${data.message}

Sent via SEPHYX website contact form.`;

        // Open Instagram with pre-filled message
        const encodedMessage = encodeURIComponent(message);
        const instagramUrl = `https://www.instagram.com/direct/new/?text=${encodedMessage}`;
        window.open(instagramUrl, '_blank');

        // Show success message
        window.sephyxApp.showNotification('Redirecting to Instagram DM... 📱', 'success');

        // Clear form
        document.getElementById('contact-form').reset();

        // Track event
        StorageManager.trackEvent('contact_form_submit', { 
            subject: data.subject,
            hasPhone: !!data.phone 
        });
    }

    openInstagram() {
        window.open('https://www.instagram.com/sephyxofficial/', '_blank');
        StorageManager.trackEvent('instagram_visit', { source: 'contact_page' });
    }

    quickOrder() {
        const message = 'Hey SEPHYX! I want to place an order. Can you help me with the available items and pricing?';
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://www.instagram.com/direct/new/?text=${encodedMessage}`, '_blank');
        
        StorageManager.trackEvent('quick_order_click');
    }

    sizeGuide() {
        const message = 'Hi! Can you send me the size guide for your items? I want to make sure I get the right fit.';
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://www.instagram.com/direct/new/?text=${encodedMessage}`, '_blank');
        
        StorageManager.trackEvent('size_guide_request');
    }

    collaboration() {
        const message = 'Hey SEPHYX! I\'m interested in collaborating with you. Can we discuss potential partnership opportunities?';
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://www.instagram.com/direct/new/?text=${encodedMessage}`, '_blank');
        
        StorageManager.trackEvent('collaboration_inquiry');
    }

    support() {
        const message = 'Hi SEPHYX! I need some help with my order/inquiry. Can you assist me?';
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://www.instagram.com/direct/new/?text=${encodedMessage}`, '_blank');
        
        StorageManager.trackEvent('support_request');
    }
}

// Export for global use
window.ContactPage = ContactPage;
