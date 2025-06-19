// Main application initialization
class SephyxApp {
    constructor() {
        this.router = null;
        this.isLoaded = false;
        this.secretInput = '';
        this.alertMessages = [
            'SEPHYX SIGNAL ACTIVE ⚡',
            'YOU ARE BEING WATCHED.',
            'CULT TRANSMISSION INCOMING…',
            'DIGITAL UNDERGROUND ACTIVATED',
            'NEON PROPHECY FULFILLED',
            'MATRIX BREACH DETECTED'
        ];
        this.currentAlert = 0;
        
        this.init();
    }

    async init() {
        // Initialize all components
        await this.initLoader();
        this.initSecretListener();
        this.initAlertBar();
        this.initRouter();
        this.initEventListeners();
        
        // Initialize other components
        window.particleSystem = new ParticleSystem();
        window.cursorTrail = new CursorTrail();
        window.audioManager = new AudioManager();
        window.cartManager = new CartManager();
        window.chatbot = new Chatbot();
        
        // Start the app
        this.startApp();
    }

    async initLoader() {
        return new Promise((resolve) => {
            const loader = document.getElementById('loader');
            const app = document.getElementById('app');
            
            // Simulate loading time
            setTimeout(() => {
                loader.classList.add('fade-out');
                
                setTimeout(() => {
                    loader.style.display = 'none';
                    app.style.display = 'block';
                    app.classList.add('fade-in');
                    this.isLoaded = true;
                    resolve();
                }, 500);
            }, 3000);
        });
    }

    initSecretListener() {
        let secretInput = '';
        const secretCode = '2025streetwear';
        
        document.addEventListener('keydown', (e) => {
            secretInput += e.key.toLowerCase();
            
            // Keep only the last characters equal to secret code length
            if (secretInput.length > secretCode.length) {
                secretInput = secretInput.slice(-secretCode.length);
            }
            
            // Check if secret code is typed
            if (secretInput === secretCode) {
                this.activateVault();
                secretInput = '';
            }
        });

        // Easter egg for glitchcore theme
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'g') {
                this.secretInput += 'g';
            } else if (e.key.toLowerCase() === 'l' && this.secretInput === 'g') {
                this.secretInput += 'l';
            } else if (e.key.toLowerCase() === 'i' && this.secretInput === 'gl') {
                this.secretInput += 'i';
            } else if (e.key.toLowerCase() === 't' && this.secretInput === 'gli') {
                this.secretInput += 't';
            } else if (e.key.toLowerCase() === 'c' && this.secretInput === 'glit') {
                this.secretInput += 'c';
            } else if (e.key.toLowerCase() === 'h' && this.secretInput === 'glitc') {
                this.secretInput += 'h';
            } else if (e.key.toLowerCase() === 'c' && this.secretInput === 'glitch') {
                this.secretInput += 'c';
            } else if (e.key.toLowerCase() === 'o' && this.secretInput === 'glitchc') {
                this.secretInput += 'o';
            } else if (e.key.toLowerCase() === 'r' && this.secretInput === 'glitchco') {
                this.secretInput += 'r';
            } else if (e.key.toLowerCase() === 'e' && this.secretInput === 'glitchcor') {
                this.activateGlitchcoreTheme();
                this.secretInput = '';
            } else {
                this.secretInput = '';
            }
        });
    }

    activateVault() {
        // Set vault access in storage
        StorageManager.set('vaultAccess', true);
        
        // Show notification
        this.showNotification('🔮 VAULT ACCESS GRANTED', 'success');
        
        // Navigate to vault
        window.location.hash = '#/vault';
    }

    activateGlitchcoreTheme() {
        document.body.style.setProperty('--primary-color', '#ff69b4');
        document.body.style.setProperty('--secondary-color', '#00bfff');
        document.body.classList.add('holographic');
        
        this.showNotification('🌈 GLITCHCORE MODE ACTIVATED', 'success');
        
        // Store theme preference
        StorageManager.set('theme', 'glitchcore');
    }

    initAlertBar() {
        const alertBar = document.getElementById('alert-bar');
        const alertContent = alertBar.querySelector('.alert-content');
        
        // Show random alert messages
        const showAlert = () => {
            const message = this.alertMessages[this.currentAlert];
            alertContent.textContent = message;
            alertContent.setAttribute('data-text', message);
            
            alertBar.style.display = 'block';
            alertBar.classList.add('slide-in-down');
            
            setTimeout(() => {
                alertBar.classList.remove('slide-in-down');
                alertBar.classList.add('slide-in-up');
                
                setTimeout(() => {
                    alertBar.style.display = 'none';
                    alertBar.classList.remove('slide-in-up');
                    this.currentAlert = (this.currentAlert + 1) % this.alertMessages.length;
                }, 300);
            }, 3000);
        };

        // Show first alert after app loads
        setTimeout(showAlert, 2000);
        
        // Show alerts periodically
        setInterval(showAlert, 15000);
    }

    initRouter() {
        this.router = new Router();
    }

    initEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                document.body.classList.toggle('mobile-menu-open');
            });
        }

        // Close mobile menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('mobile-menu-open');
            });
        });

        // Konami code easter egg
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                this.activateKonamiEasterEgg();
                konamiCode = [];
            }
        });
    }

    activateKonamiEasterEgg() {
        // Add special effects
        document.body.classList.add('matrix');
        
        // Show special message
        this.showNotification('🎮 KONAMI CODE ACTIVATED - EXTRA LIFE GRANTED', 'success');
        
        // Add loyalty points
        const currentPoints = StorageManager.get('loyaltyPoints', 0);
        StorageManager.set('loyaltyPoints', currentPoints + 100);
        
        // Remove effect after 10 seconds
        setTimeout(() => {
            document.body.classList.remove('matrix');
        }, 10000);
    }

    startApp() {
        // Load saved theme
        const savedTheme = StorageManager.get('theme');
        if (savedTheme === 'glitchcore') {
            this.activateGlitchcoreTheme();
        }

        // Initialize particles and effects
        window.particleSystem.init();
        window.cursorTrail.init();
        
        // Initialize audio
        window.audioManager.init();
        
        // Start router
        this.router.init();
        
        console.log('🔮 SEPHYX SYSTEM ONLINE');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--bg-secondary);
            border: 2px solid var(--primary-color);
            border-radius: 5px;
            padding: 1rem;
            z-index: 10000;
            min-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.borderColor = 'var(--success-color)';
        } else if (type === 'error') {
            notification.style.borderColor = 'var(--error-color)';
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sephyxApp = new SephyxApp();
});

// Service worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // We'll skip service worker for now since it's not required
        console.log('SEPHYX running in browser mode');
    });
}
