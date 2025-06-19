// Saved Fits Page Component
class SavedPage {
    constructor() {
        this.savedItems = [];
        this.viewMode = 'grid'; // grid or list
    }

    async render() {
        return `
            <div class="saved-page page-container">
                <!-- Page Header -->
                <div class="saved-header">
                    <h1 class="page-title glitch neon" data-text="SAVED FITS">SAVED FITS</h1>
                    <p class="saved-subtitle">Keep your drip locked in 'til payday.</p>
                    
                    <div class="saved-stats">
                        <div class="stat-item">
                            <span class="stat-number neon" id="saved-count">0</span>
                            <span class="stat-label">Items Saved</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number neon-secondary" id="saved-value">QR 0</span>
                            <span class="stat-label">Total Value</span>
                        </div>
                    </div>
                </div>

                <!-- Controls -->
                <div class="saved-controls">
                    <div class="view-controls">
                        <button class="view-btn ${this.viewMode === 'grid' ? 'active' : ''}" data-view="grid">
                            <i class="fas fa-th"></i> Grid
                        </button>
                        <button class="view-btn ${this.viewMode === 'list' ? 'active' : ''}" data-view="list">
                            <i class="fas fa-list"></i> List
                        </button>
                    </div>
                    
                    <div class="action-controls">
                        <button class="control-btn" onclick="savedPage.addAllToCart()">
                            <i class="fas fa-shopping-cart"></i> Add All to Cart
                        </button>
                        <button class="control-btn" onclick="savedPage.clearAll()">
                            <i class="fas fa-trash"></i> Clear All
                        </button>
                        <button class="control-btn" onclick="savedPage.shareWishlist()">
                            <i class="fas fa-share"></i> Share Wishlist
                        </button>
                    </div>
                </div>

                <!-- Saved Items Grid -->
                <div class="saved-content">
                    <div id="saved-items" class="saved-items ${this.viewMode}">
                        <!-- Items will be populated here -->
                    </div>
                    
                    <div id="empty-state" class="empty-state hidden">
                        <div class="empty-icon">💔</div>
                        <h3>No saved fits yet</h3>
                        <p>Start building your wishlist by saving items from the vault</p>
                        <button onclick="window.location.hash = '#/shop'" class="glitch-btn">
                            Explore the Vault
                        </button>
                    </div>
                </div>

                <!-- Recommendations -->
                <div class="recommendations-section">
                    <h2 class="section-title neon-secondary">RECOMMENDED FOR YOU</h2>
                    <div id="recommendations" class="recommendations-grid">
                        <!-- Recommendations will be populated here -->
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.loadSavedItems();
        this.addStyles();
        this.bindEvents();
        this.renderItems();
        this.updateStats();
        this.loadRecommendations();
        
        // Track page view
        StorageManager.trackEvent('page_view', { page: 'saved' });
    }

    addStyles() {
        if (document.getElementById('saved-styles')) return;

        const style = document.createElement('style');
        style.id = 'saved-styles';
        style.textContent = `
            .saved-page {
                min-height: 100vh;
            }
            
            .saved-header {
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
            
            .saved-subtitle {
                color: var(--text-secondary);
                font-size: 1.2rem;
                margin-bottom: 2rem;
                font-style: italic;
            }
            
            .saved-stats {
                display: flex;
                justify-content: center;
                gap: 3rem;
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
            
            .saved-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                flex-wrap: wrap;
                gap: 1rem;
            }
            
            .view-controls {
                display: flex;
                gap: 0.5rem;
                background: rgba(26,26,26,0.8);
                padding: 0.5rem;
                border-radius: 25px;
                border: 1px solid var(--border-color);
            }
            
            .view-btn {
                background: none;
                border: none;
                color: var(--text-secondary);
                padding: 0.75rem 1.5rem;
                border-radius: 20px;
                cursor: none;
                transition: all var(--transition-normal);
                font-family: var(--font-primary);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-size: 0.9rem;
            }
            
            .view-btn:hover {
                color: var(--primary-color);
                background: rgba(0,255,255,0.1);
            }
            
            .view-btn.active {
                background: var(--primary-color);
                color: var(--bg-color);
                box-shadow: 0 0 20px rgba(0,255,255,0.3);
            }
            
            .action-controls {
                display: flex;
                gap: 1rem;
            }
            
            .control-btn {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                padding: 0.75rem 1rem;
                border-radius: 5px;
                cursor: none;
                transition: all var(--transition-normal);
                font-family: var(--font-primary);
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .control-btn:hover {
                border-color: var(--primary-color);
                color: var(--primary-color);
                background: rgba(0,255,255,0.1);
            }
            
            .saved-items.grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 2rem;
            }
            
            .saved-items.list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .saved-item {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                overflow: hidden;
                transition: all var(--transition-normal);
                cursor: none;
                backdrop-filter: blur(10px);
            }
            
            .saved-item:hover {
                transform: translateY(-5px);
                border-color: var(--primary-color);
                box-shadow: 0 15px 30px rgba(0,255,255,0.2);
            }
            
            .saved-items.grid .saved-item-image {
                aspect-ratio: 1;
                overflow: hidden;
                position: relative;
            }
            
            .saved-items.list .saved-item {
                display: flex;
                align-items: center;
                padding: 1rem;
            }
            
            .saved-items.list .saved-item-image {
                width: 80px;
                height: 80px;
                flex-shrink: 0;
                margin-right: 1rem;
                border-radius: 5px;
                overflow: hidden;
            }
            
            .saved-item-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform var(--transition-normal);
            }
            
            .saved-item:hover .saved-item-image img {
                transform: scale(1.1);
            }
            
            .saved-badge {
                position: absolute;
                top: 1rem;
                left: 1rem;
                background: linear-gradient(45deg, var(--error-color), var(--secondary-color));
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .saved-item-actions {
                position: absolute;
                top: 1rem;
                right: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                opacity: 0;
                transform: translateX(20px);
                transition: all var(--transition-normal);
            }
            
            .saved-item:hover .saved-item-actions {
                opacity: 1;
                transform: translateX(0);
            }
            
            .saved-items.list .saved-item-actions {
                position: static;
                opacity: 1;
                transform: none;
                flex-direction: row;
                margin-left: auto;
            }
            
            .action-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: none;
                background: rgba(0,0,0,0.8);
                color: var(--primary-color);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: none;
                transition: all var(--transition-normal);
                backdrop-filter: blur(10px);
            }
            
            .action-btn:hover {
                background: var(--primary-color);
                color: var(--bg-color);
                transform: scale(1.1);
            }
            
            .action-btn.remove:hover {
                background: var(--error-color);
            }
            
            .saved-item-info {
                padding: 1.5rem;
                flex: 1;
            }
            
            .saved-items.list .saved-item-info {
                padding: 0;
            }
            
            .saved-item-category {
                color: var(--text-muted);
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 0.5rem;
            }
            
            .saved-item-name {
                color: var(--text-primary);
                font-size: 1.1rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                line-height: 1.3;
            }
            
            .saved-item-price {
                color: var(--primary-color);
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 1rem;
            }
            
            .saved-item-date {
                color: var(--text-muted);
                font-size: 0.8rem;
                margin-bottom: 1rem;
            }
            
            .saved-item-controls {
                display: flex;
                gap: 1rem;
                align-items: center;
            }
            
            .saved-items.list .saved-item-controls {
                justify-content: flex-end;
            }
            
            .size-select-small {
                background: var(--bg-color);
                border: 1px solid var(--border-color);
                border-radius: 5px;
                padding: 0.5rem;
                color: var(--text-primary);
                font-family: var(--font-primary);
                cursor: none;
                flex: 1;
            }
            
            .add-to-cart-small {
                background: var(--primary-color);
                color: var(--bg-color);
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-family: var(--font-primary);
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: none;
                transition: all var(--transition-normal);
                flex: 2;
                font-size: 0.8rem;
            }
            
            .add-to-cart-small:hover {
                background: var(--secondary-color);
                transform: translateY(-2px);
            }
            
            .empty-state {
                text-align: center;
                padding: 4rem 2rem;
                color: var(--text-secondary);
            }
            
            .empty-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
                opacity: 0.5;
            }
            
            .empty-state h3 {
                color: var(--text-primary);
                margin-bottom: 1rem;
                font-size: 1.5rem;
            }
            
            .empty-state p {
                margin-bottom: 2rem;
                line-height: 1.6;
            }
            
            .recommendations-section {
                margin-top: 4rem;
                padding-top: 3rem;
                border-top: 1px solid var(--border-color);
            }
            
            .section-title {
                text-align: center;
                font-size: 2rem;
                margin-bottom: 2rem;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .recommendations-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 1.5rem;
            }
            
            .recommendation-item {
                background: rgba(26,26,26,0.6);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                overflow: hidden;
                transition: all var(--transition-normal);
                cursor: none;
            }
            
            .recommendation-item:hover {
                transform: translateY(-5px);
                border-color: var(--secondary-color);
                box-shadow: 0 10px 25px rgba(255,0,255,0.2);
            }
            
            .recommendation-image {
                aspect-ratio: 1;
                overflow: hidden;
            }
            
            .recommendation-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform var(--transition-normal);
            }
            
            .recommendation-item:hover .recommendation-image img {
                transform: scale(1.1);
            }
            
            .recommendation-info {
                padding: 1rem;
                text-align: center;
            }
            
            .recommendation-name {
                color: var(--text-primary);
                font-size: 0.9rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
            }
            
            .recommendation-price {
                color: var(--secondary-color);
                font-weight: bold;
            }
            
            @media (max-width: 768px) {
                .saved-controls {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .action-controls {
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                .saved-stats {
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                .saved-items.grid {
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1rem;
                }
                
                .saved-items.list .saved-item {
                    flex-direction: column;
                    text-align: center;
                }
                
                .saved-items.list .saved-item-image {
                    margin-right: 0;
                    margin-bottom: 1rem;
                    width: 100px;
                    height: 100px;
                    align-self: center;
                }
                
                .recommendations-grid {
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    bindEvents() {
        // View mode toggles
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setViewMode(e.target.dataset.view);
            });
        });
    }

    loadSavedItems() {
        this.savedItems = StorageManager.get('savedFits', []);
    }

    setViewMode(mode) {
        this.viewMode = mode;
        
        // Update active button
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === mode);
        });
        
        // Update grid class
        const itemsContainer = document.getElementById('saved-items');
        itemsContainer.className = `saved-items ${mode}`;
        
        // Re-render items
        this.renderItems();
        
        // Track view mode change
        StorageManager.trackEvent('saved_view_mode', { mode });
    }

    renderItems() {
        const itemsContainer = document.getElementById('saved-items');
        const emptyState = document.getElementById('empty-state');
        
        if (this.savedItems.length === 0) {
            itemsContainer.style.display = 'none';
            emptyState.classList.remove('hidden');
            return;
        }
        
        itemsContainer.style.display = this.viewMode === 'grid' ? 'grid' : 'flex';
        emptyState.classList.add('hidden');
        
        itemsContainer.innerHTML = this.savedItems.map(item => this.renderSavedItem(item)).join('');
        
        // Bind item events
        this.bindItemEvents();
        
        // Add stagger animation
        document.querySelectorAll('.saved-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('stagger-item');
        });
    }

    renderSavedItem(item) {
        const savedDate = new Date(item.savedAt || Date.now()).toLocaleDateString();
        const sizes = item.sizes || ['S', 'M', 'L', 'XL'];
        
        return `
            <div class="saved-item" data-item-id="${item.id}">
                <div class="saved-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    ${item.badge ? `<div class="saved-badge">${item.badge}</div>` : ''}
                    
                    <div class="saved-item-actions">
                        <button class="action-btn" onclick="savedPage.viewProduct('${item.id}')" title="View product">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn remove" onclick="savedPage.removeItem('${item.id}')" title="Remove from saved">
                            <i class="fas fa-heart-broken"></i>
                        </button>
                    </div>
                </div>
                
                <div class="saved-item-info">
                    <div class="saved-item-category">${item.category || 'streetwear'}</div>
                    <h3 class="saved-item-name">${item.name}</h3>
                    <div class="saved-item-price">QR ${item.price}</div>
                    <div class="saved-item-date">Saved ${savedDate}</div>
                    
                    <div class="saved-item-controls">
                        <select class="size-select-small" data-item-id="${item.id}">
                            ${sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                        <button class="add-to-cart-small" onclick="savedPage.addToCart('${item.id}')">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    bindItemEvents() {
        // Additional event binding if needed
    }

    updateStats() {
        const savedCount = document.getElementById('saved-count');
        const savedValue = document.getElementById('saved-value');
        
        if (savedCount) {
            savedCount.textContent = this.savedItems.length;
        }
        
        if (savedValue) {
            const totalValue = this.savedItems.reduce((sum, item) => sum + (item.price || 0), 0);
            savedValue.textContent = `QR ${totalValue}`;
        }
    }

    removeItem(itemId) {
        const itemIndex = this.savedItems.findIndex(item => item.id === itemId);
        if (itemIndex === -1) return;
        
        const item = this.savedItems[itemIndex];
        this.savedItems.splice(itemIndex, 1);
        
        // Update storage
        StorageManager.set('savedFits', this.savedItems);
        
        // Re-render
        this.renderItems();
        this.updateStats();
        
        // Show notification
        window.sephyxApp.showNotification(`${item.name} removed from saved`, 'info');
        
        // Track event
        StorageManager.trackEvent('saved_item_remove', { itemId, itemName: item.name });
    }

    addToCart(itemId) {
        const item = this.savedItems.find(item => item.id === itemId);
        if (!item) return;
        
        // Get selected size
        const sizeSelect = document.querySelector(`[data-item-id="${itemId}"].size-select-small`);
        const size = sizeSelect ? sizeSelect.value : 'M';
        
        // Add to cart
        if (window.cartManager) {
            window.cartManager.addItem(item, size, 1);
        }
        
        // Track event
        StorageManager.trackEvent('saved_to_cart', { itemId, size });
    }

    viewProduct(itemId) {
        // Navigate to shop and show quick view
        window.location.hash = '#/shop';
        
        // Track event
        StorageManager.trackEvent('saved_product_view', { itemId });
    }

    addAllToCart() {
        if (this.savedItems.length === 0) {
            window.sephyxApp.showNotification('No items to add to cart', 'error');
            return;
        }
        
        let addedCount = 0;
        this.savedItems.forEach(item => {
            if (window.cartManager) {
                window.cartManager.addItem(item, 'M', 1);
                addedCount++;
            }
        });
        
        window.sephyxApp.showNotification(`Added ${addedCount} items to cart 🛒`, 'success');
        
        // Track event
        StorageManager.trackEvent('saved_add_all_to_cart', { count: addedCount });
    }

    clearAll() {
        if (this.savedItems.length === 0) {
            window.sephyxApp.showNotification('No items to clear', 'error');
            return;
        }
        
        const confirmed = confirm('Are you sure you want to clear all saved items? This cannot be undone.');
        if (!confirmed) return;
        
        const count = this.savedItems.length;
        this.savedItems = [];
        
        // Update storage
        StorageManager.set('savedFits', []);
        
        // Re-render
        this.renderItems();
        this.updateStats();
        
        window.sephyxApp.showNotification(`Cleared ${count} saved items`, 'info');
        
        // Track event
        StorageManager.trackEvent('saved_clear_all', { count });
    }

    shareWishlist() {
        if (this.savedItems.length === 0) {
            window.sephyxApp.showNotification('No items to share', 'error');
            return;
        }
        
        const itemNames = this.savedItems.map(item => item.name).join(', ');
        const shareText = `Check out my SEPHYX wishlist: ${itemNames}\n\nTotal drip value: QR ${this.savedItems.reduce((sum, item) => sum + item.price, 0)} 💎`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My SEPHYX Wishlist',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(shareText)
                .then(() => {
                    window.sephyxApp.showNotification('Wishlist copied to clipboard 📋', 'success');
                })
                .catch(() => {
                    window.sephyxApp.showNotification('Unable to share wishlist', 'error');
                });
        }
        
        // Track event
        StorageManager.trackEvent('saved_share_wishlist', { itemCount: this.savedItems.length });
    }

    loadRecommendations() {
        const recommendationsGrid = document.getElementById('recommendations');
        if (!recommendationsGrid) return;
        
        // Get products that aren't already saved
        const allProducts = window.products || [];
        const savedIds = this.savedItems.map(item => item.id);
        const recommendations = allProducts
            .filter(product => !savedIds.includes(product.id))
            .slice(0, 6);
        
        if (recommendations.length === 0) {
            recommendationsGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No recommendations available</p>';
            return;
        }
        
        recommendationsGrid.innerHTML = recommendations.map(item => `
            <div class="recommendation-item" onclick="window.location.hash = '#/shop'; setTimeout(() => shopPage?.showQuickView?.('${item.id}'), 500);">
                <div class="recommendation-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="recommendation-info">
                    <div class="recommendation-name">${item.name}</div>
                    <div class="recommendation-price">QR ${item.price}</div>
                </div>
            </div>
        `).join('');
    }
}

// Export for global use
window.SavedPage = SavedPage;
