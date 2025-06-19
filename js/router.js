// Single Page Application Router
class Router {
    constructor() {
        this.routes = {
            '/': 'home',
            '/shop': 'shop',
            '/lookbook': 'lookbook',
            '/saved': 'saved',
            '/customizer': 'customizer',
            '/about': 'contact',
            '/contact': 'contact',
            '/track': 'track',
            '/account': 'account',
            '/vault': 'vault',
            '/terminal': 'terminal',
            '/admin': 'admin'
        };
        
        this.currentPage = null;
        this.pageInstances = {};
    }

    init() {
        // Handle hash changes
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Handle initial load
        this.handleRoute();
        
        // Update nav links
        this.updateNavigation();
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const page = this.routes[hash];
        
        if (page) {
            this.loadPage(page, hash);
        } else {
            // 404 - redirect to home
            window.location.hash = '#/';
        }
    }

    async loadPage(pageKey, route) {
        const mainContent = document.getElementById('main-content');
        
        // Add exit animation to current content
        if (this.currentPage) {
            mainContent.classList.add('page-exit');
            await this.delay(300);
        }
        
        // Special access checks
        if (pageKey === 'vault' && !StorageManager.get('vaultAccess', false)) {
            this.showAccessDenied();
            window.location.hash = '#/';
            return;
        }
        
        if (pageKey === 'admin' && !this.checkAdminAccess()) {
            this.showAccessDenied();
            window.location.hash = '#/';
            return;
        }
        
        // Load page content
        try {
            let pageInstance;
            
            switch (pageKey) {
                case 'home':
                    pageInstance = new HomePage();
                    break;
                case 'shop':
                    pageInstance = new ShopPage();
                    break;
                case 'lookbook':
                    pageInstance = new LookbookPage();
                    break;
                case 'saved':
                    pageInstance = new SavedPage();
                    break;
                case 'customizer':
                    pageInstance = new CustomizerPage();
                    break;
                case 'contact':
                    pageInstance = new ContactPage();
                    break;
                case 'track':
                    pageInstance = new TrackPage();
                    break;
                case 'account':
                    pageInstance = new AccountPage();
                    break;
                case 'vault':
                    pageInstance = new VaultPage();
                    break;
                case 'terminal':
                    pageInstance = new TerminalPage();
                    break;
                case 'admin':
                    pageInstance = new AdminPage();
                    break;
                default:
                    throw new Error('Page not found');
            }
            
            // Store page instance
            this.pageInstances[pageKey] = pageInstance;
            
            // Render page
            const content = await pageInstance.render();
            mainContent.innerHTML = content;
            
            // Initialize page
            if (pageInstance.init) {
                pageInstance.init();
            }
            
            // Add enter animation
            mainContent.classList.remove('page-exit');
            mainContent.classList.add('page-enter');
            
            // Update current page
            this.currentPage = pageKey;
            
            // Update navigation
            this.updateNavigation();
            
            // Update page title
            this.updateTitle(pageKey);
            
        } catch (error) {
            console.error('Error loading page:', error);
            mainContent.innerHTML = `
                <div class="error-page">
                    <h1 class="glitch" data-text="SYSTEM ERROR">SYSTEM ERROR</h1>
                    <p>Failed to load page. Please try again.</p>
                    <button onclick="window.location.hash = '#/'" class="glitch-btn">Return Home</button>
                </div>
            `;
        }
    }

    updateNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentHash = window.location.hash.slice(1) || '/';
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href').slice(1);
            if (href === currentHash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    updateTitle(pageKey) {
        const titles = {
            home: 'SEPHYX - drip designed for the future',
            shop: 'SEPHYX - Enter the Vault',
            lookbook: 'SEPHYX - Lookbook',
            saved: 'SEPHYX - Saved Fits',
            customizer: 'SEPHYX - Outfit Generator',
            contact: 'SEPHYX - Contact',
            track: 'SEPHYX - Track Order',
            account: 'SEPHYX - Account',
            vault: 'SEPHYX - The Vault',
            terminal: 'SEPHYX - Terminal',
            admin: 'SEPHYX - Admin Panel'
        };
        
        document.title = titles[pageKey] || 'SEPHYX';
    }

    checkAdminAccess() {
        // Mock email check
        const userEmail = StorageManager.get('userEmail', '');
        return userEmail === 'gamingrage347@gmail.com';
    }

    showAccessDenied() {
        window.sephyxApp.showNotification('🚫 ACCESS DENIED - UNAUTHORIZED', 'error');
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Navigation methods
    navigate(route) {
        window.location.hash = `#${route}`;
    }

    goBack() {
        window.history.back();
    }

    goForward() {
        window.history.forward();
    }
}

// Export for global use
window.Router = Router;
