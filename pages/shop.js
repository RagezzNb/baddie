// Shop Page Component
class ShopPage {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilter = 'all';
        this.sortBy = 'newest';
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.selectedProduct = null;
    }

    async render() {
        return `
            <div class="shop-page page-container">
                <!-- Shop Header -->
                <div class="shop-header">
                    <h1 class="page-title glitch neon" data-text="ENTER THE VAULT">ENTER THE VAULT</h1>
                    <p class="shop-subtitle">Exclusive streetwear for the digital underground</p>
                    
                    <div class="shop-badge">
                        <span class="badge-text">Available only in Qatar – Cash on delivery</span>
                        <span class="badge-icon">🇶🇦</span>
                    </div>
                </div>

                <!-- Filters & Search -->
                <div class="shop-controls">
                    <div class="filter-section">
                        <div class="filter-tabs">
                            <button class="filter-tab active" data-filter="all">All</button>
                            <button class="filter-tab" data-filter="hoodies">Hoodies</button>
                            <button class="filter-tab" data-filter="tees">T-Shirts</button>
                            <button class="filter-tab" data-filter="bottoms">Bottoms</button>
                            <button class="filter-tab" data-filter="accessories">Accessories</button>
                        </div>
                        
                        <div class="sort-section">
                            <select id="sort-select" class="sort-select">
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="popular">Most Popular</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="search-section">
                        <div class="search-container">
                            <input type="text" id="search-input" placeholder="Search the matrix..." class="search-input">
                            <button class="search-btn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Product Grid -->
                <div class="products-section">
                    <div id="products-grid" class="products-grid">
                        <!-- Products will be populated here -->
                    </div>
                    
                    <div id="products-loading" class="loading-container hidden">
                        <div class="spinner"></div>
                        <p>Loading drip...</p>
                    </div>
                    
                    <div id="no-products" class="no-products hidden">
                        <div class="no-products-icon">🔍</div>
                        <h3>No drip found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                </div>

                <!-- Pagination -->
                <div id="pagination" class="pagination-container">
                    <!-- Pagination will be populated here -->
                </div>

                <!-- Quick View Modal -->
                <div id="quick-view-modal" class="modal-overlay">
                    <div class="modal-content">
                        <button class="modal-close" id="modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                        <div id="modal-body" class="modal-body">
                            <!-- Product details will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.loadProducts();
        this.addStyles();
        this.bindEvents();
        this.renderProducts();
        
        // Track page view
        StorageManager.trackEvent('page_view', { page: 'shop' });
    }

    loadProducts() {
        // Get products from global products array
        this.products = window.products || [];
        this.filteredProducts = [...this.products];
    }

    addStyles() {
        if (document.getElementById('shop-styles')) return;

        const style = document.createElement('style');
        style.id = 'shop-styles';
        style.textContent = `
            .shop-page {
                min-height: 100vh;
            }
            
            .shop-header {
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
            
            .shop-subtitle {
                color: var(--text-secondary);
                font-size: 1.1rem;
                margin-bottom: 1.5rem;
            }
            
            .shop-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                color: var(--bg-color);
                padding: 0.5rem 1.5rem;
                border-radius: 25px;
                font-weight: bold;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .shop-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                gap: 2rem;
                flex-wrap: wrap;
            }
            
            .filter-section {
                display: flex;
                align-items: center;
                gap: 2rem;
            }
            
            .filter-tabs {
                display: flex;
                gap: 0.5rem;
                background: rgba(26,26,26,0.8);
                padding: 0.5rem;
                border-radius: 25px;
                border: 1px solid var(--border-color);
            }
            
            .filter-tab {
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
            
            .filter-tab:hover {
                color: var(--primary-color);
                background: rgba(0,255,255,0.1);
            }
            
            .filter-tab.active {
                background: var(--primary-color);
                color: var(--bg-color);
                box-shadow: 0 0 20px rgba(0,255,255,0.3);
            }
            
            .sort-select {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 5px;
                padding: 0.75rem 1rem;
                color: var(--text-primary);
                font-family: var(--font-primary);
                cursor: none;
                min-width: 180px;
            }
            
            .sort-select:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 10px rgba(0,255,255,0.3);
            }
            
            .search-container {
                display: flex;
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 25px;
                overflow: hidden;
                transition: all var(--transition-normal);
            }
            
            .search-container:focus-within {
                border-color: var(--primary-color);
                box-shadow: 0 0 20px rgba(0,255,255,0.3);
            }
            
            .search-input {
                background: none;
                border: none;
                padding: 0.75rem 1.5rem;
                color: var(--text-primary);
                font-family: var(--font-primary);
                min-width: 250px;
            }
            
            .search-input:focus {
                outline: none;
            }
            
            .search-btn {
                background: var(--primary-color);
                border: none;
                color: var(--bg-color);
                padding: 0.75rem 1.5rem;
                cursor: none;
                transition: all var(--transition-normal);
            }
            
            .search-btn:hover {
                background: var(--secondary-color);
            }
            
            .products-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 2rem;
                margin-bottom: 3rem;
            }
            
            .product-card {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                overflow: hidden;
                transition: all var(--transition-normal);
                cursor: none;
                position: relative;
                backdrop-filter: blur(10px);
            }
            
            .product-card:hover {
                transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
                border-color: var(--primary-color);
                box-shadow: 0 20px 40px rgba(0,255,255,0.2);
            }
            
            .product-image {
                position: relative;
                aspect-ratio: 1;
                overflow: hidden;
            }
            
            .product-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform var(--transition-normal);
            }
            
            .product-card:hover .product-image img {
                transform: scale(1.1);
            }
            
            .product-badge {
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
            
            .product-actions {
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
            
            .product-card:hover .product-actions {
                opacity: 1;
                transform: translateX(0);
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
            
            .product-info {
                padding: 1.5rem;
            }
            
            .product-name {
                color: var(--text-primary);
                font-size: 1.1rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                line-height: 1.3;
            }
            
            .product-category {
                color: var(--text-muted);
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 1rem;
            }
            
            .product-price {
                color: var(--primary-color);
                font-size: 1.3rem;
                font-weight: bold;
                margin-bottom: 1rem;
            }
            
            .product-controls {
                display: flex;
                gap: 1rem;
                align-items: center;
            }
            
            .size-select {
                background: var(--bg-color);
                border: 1px solid var(--border-color);
                border-radius: 5px;
                padding: 0.5rem;
                color: var(--text-primary);
                font-family: var(--font-primary);
                cursor: none;
                flex: 1;
            }
            
            .add-to-cart-btn {
                background: var(--primary-color);
                color: var(--bg-color);
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 5px;
                font-family: var(--font-primary);
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: none;
                transition: all var(--transition-normal);
                flex: 2;
            }
            
            .add-to-cart-btn:hover {
                background: var(--secondary-color);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(255,0,255,0.3);
            }
            
            .loading-container {
                text-align: center;
                padding: 3rem;
                color: var(--text-secondary);
            }
            
            .loading-container .spinner {
                margin: 0 auto 1rem;
            }
            
            .no-products {
                text-align: center;
                padding: 4rem 2rem;
                color: var(--text-secondary);
            }
            
            .no-products-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
                opacity: 0.5;
            }
            
            .pagination-container {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                margin: 2rem 0;
            }
            
            .page-btn {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                padding: 0.75rem 1rem;
                border-radius: 5px;
                cursor: none;
                transition: all var(--transition-normal);
                min-width: 40px;
                text-align: center;
            }
            
            .page-btn:hover {
                border-color: var(--primary-color);
                color: var(--primary-color);
            }
            
            .page-btn.active {
                background: var(--primary-color);
                color: var(--bg-color);
                border-color: var(--primary-color);
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
                border-radius: 10px;
                max-width: 800px;
                max-height: 90vh;
                width: 90%;
                overflow-y: auto;
                position: relative;
                animation: scaleIn 0.3s ease;
            }
            
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(0,0,0,0.8);
                border: none;
                color: var(--text-primary);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: none;
                transition: all var(--transition-normal);
                z-index: 1001;
            }
            
            .modal-close:hover {
                background: var(--error-color);
                transform: scale(1.1);
            }
            
            @media (max-width: 768px) {
                .shop-controls {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .filter-section {
                    flex-direction: column;
                    align-items: stretch;
                    gap: 1rem;
                }
                
                .filter-tabs {
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                .search-input {
                    min-width: auto;
                }
                
                .products-grid {
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1rem;
                }
                
                .product-controls {
                    flex-direction: column;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    bindEvents() {
        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Sort selection
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.setSorting(e.target.value);
            });
        }

        // Search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.setSearch(e.target.value);
            });
        }

        // Modal close
        const modalClose = document.getElementById('modal-close');
        const modalOverlay = document.getElementById('quick-view-modal');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.closeModal();
                }
            });
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        
        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.filter === filter);
        });
        
        this.filterProducts();
        this.renderProducts();
        
        // Track filter usage
        StorageManager.trackEvent('shop_filter', { filter });
    }

    setSorting(sortBy) {
        this.sortBy = sortBy;
        this.currentPage = 1;
        this.sortProducts();
        this.renderProducts();
        
        // Track sorting usage
        StorageManager.trackEvent('shop_sort', { sortBy });
    }

    setSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.currentPage = 1;
        this.filterProducts();
        this.renderProducts();
        
        // Track search
        if (query.length > 2) {
            StorageManager.trackEvent('shop_search', { query });
        }
    }

    filterProducts() {
        let filtered = [...this.products];

        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(product => product.category === this.currentFilter);
        }

        // Apply search filter
        if (this.searchQuery && this.searchQuery.length > 0) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(this.searchQuery) ||
                product.category.toLowerCase().includes(this.searchQuery) ||
                product.description?.toLowerCase().includes(this.searchQuery)
            );
        }

        this.filteredProducts = filtered;
        this.sortProducts();
    }

    sortProducts() {
        switch (this.sortBy) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                this.filteredProducts.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
                break;
            case 'newest':
            default:
                this.filteredProducts.sort((a, b) => new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0));
                break;
        }
    }

    renderProducts() {
        const grid = document.getElementById('products-grid');
        const loading = document.getElementById('products-loading');
        const noProducts = document.getElementById('no-products');
        
        if (!grid) return;

        // Show loading
        loading.classList.remove('hidden');
        grid.innerHTML = '';
        noProducts.classList.add('hidden');

        setTimeout(() => {
            loading.classList.add('hidden');

            if (this.filteredProducts.length === 0) {
                noProducts.classList.remove('hidden');
                return;
            }

            // Calculate pagination
            const startIndex = (this.currentPage - 1) * this.productsPerPage;
            const endIndex = startIndex + this.productsPerPage;
            const pageProducts = this.filteredProducts.slice(startIndex, endIndex);

            // Render products
            grid.innerHTML = pageProducts.map(product => this.renderProductCard(product)).join('');

            // Add event listeners to product cards
            this.bindProductEvents();

            // Render pagination
            this.renderPagination();

            // Add stagger animation
            document.querySelectorAll('.product-card').forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('stagger-item');
            });
        }, 500);
    }

    renderProductCard(product) {
        const isSaved = StorageManager.get('savedFits', []).some(item => item.id === product.id);
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    
                    <div class="product-actions">
                        <button class="action-btn save-btn ${isSaved ? 'saved' : ''}" data-product-id="${product.id}" title="Save to favorites">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn quick-view-btn" data-product-id="${product.id}" title="Quick view">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">QR ${product.price}</div>
                    
                    <div class="product-controls">
                        <select class="size-select" data-product-id="${product.id}">
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                        <button class="add-to-cart-btn" data-product-id="${product.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    bindProductEvents() {
        // Save buttons
        document.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleSave(btn.dataset.productId, btn);
            });
        });

        // Quick view buttons
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showQuickView(btn.dataset.productId);
            });
        });

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.addToCart(btn.dataset.productId);
            });
        });
    }

    toggleSave(productId, btnElement) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const savedItems = StorageManager.get('savedFits', []);
        const existingIndex = savedItems.findIndex(item => item.id === productId);

        if (existingIndex > -1) {
            // Remove from saved
            savedItems.splice(existingIndex, 1);
            btnElement.classList.remove('saved');
            window.sephyxApp.showNotification(`${product.name} removed from saved`, 'info');
        } else {
            // Add to saved
            savedItems.push(product);
            btnElement.classList.add('saved');
            window.sephyxApp.showNotification(`${product.name} saved to favorites`, 'success');
            
            // Add loyalty points
            StorageManager.addLoyaltyPoints(10);
        }

        StorageManager.set('savedFits', savedItems);
        StorageManager.trackEvent('product_save_toggle', { productId, action: existingIndex > -1 ? 'remove' : 'add' });
    }

    showQuickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        this.selectedProduct = product;
        
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = this.renderQuickViewContent(product);
        
        const modal = document.getElementById('quick-view-modal');
        modal.classList.add('active');
        
        // Bind modal events
        this.bindModalEvents();
        
        // Track quick view
        StorageManager.trackEvent('product_quick_view', { productId });
    }

    renderQuickViewContent(product) {
        return `
            <div class="quick-view-content">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                
                <div class="quick-view-info">
                    <div class="product-category">${product.category}</div>
                    <h2 class="product-name">${product.name}</h2>
                    <div class="product-price">QR ${product.price}</div>
                    
                    <div class="product-description">
                        <p>${product.description || 'Premium streetwear designed for the digital underground.'}</p>
                    </div>
                    
                    <div class="model-info">
                        <h4>Model Info</h4>
                        <p>${product.modelInfo || "5'9, wearing M, oversized fit"}</p>
                    </div>
                    
                    <div class="size-selection">
                        <label>Size:</label>
                        <div class="size-options">
                            ${product.sizes.map(size => `
                                <button class="size-option" data-size="${size}">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="quick-view-actions">
                        <button class="add-to-cart-btn-modal" data-product-id="${product.id}">
                            Add to Cart
                        </button>
                        <button class="save-btn-modal ${StorageManager.get('savedFits', []).some(item => item.id === product.id) ? 'saved' : ''}" data-product-id="${product.id}">
                            <i class="fas fa-heart"></i> Save
                        </button>
                    </div>
                    
                    <div class="suggested-bundles">
                        <h4>Complete the look</h4>
                        <div class="bundle-items">
                            ${this.renderSuggestedItems(product)}
                        </div>
                        <button class="bundle-dm-btn">
                            DM for bundle discount 💬
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderSuggestedItems(product) {
        // Get 2-3 random products from different categories
        const otherProducts = this.products.filter(p => 
            p.id !== product.id && p.category !== product.category
        ).slice(0, 3);

        return otherProducts.map(item => `
            <div class="bundle-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="bundle-item-info">
                    <div class="bundle-item-name">${item.name}</div>
                    <div class="bundle-item-price">QR ${item.price}</div>
                </div>
            </div>
        `).join('');
    }

    bindModalEvents() {
        // Size selection
        document.querySelectorAll('.size-option').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Modal add to cart
        const modalAddBtn = document.querySelector('.add-to-cart-btn-modal');
        if (modalAddBtn) {
            modalAddBtn.addEventListener('click', () => {
                const selectedSize = document.querySelector('.size-option.active');
                const size = selectedSize ? selectedSize.dataset.size : this.selectedProduct.sizes[0];
                this.addToCart(this.selectedProduct.id, size);
                this.closeModal();
            });
        }

        // Modal save button
        const modalSaveBtn = document.querySelector('.save-btn-modal');
        if (modalSaveBtn) {
            modalSaveBtn.addEventListener('click', () => {
                this.toggleSave(this.selectedProduct.id, modalSaveBtn);
            });
        }

        // Bundle DM button
        const bundleDmBtn = document.querySelector('.bundle-dm-btn');
        if (bundleDmBtn) {
            bundleDmBtn.addEventListener('click', () => {
                const message = `yo sephyx, interested in a bundle deal with ${this.selectedProduct.name}. what deals you got? 👀`;
                const encodedMessage = encodeURIComponent(message);
                window.open(`https://www.instagram.com/direct/new/?text=${encodedMessage}`, '_blank');
            });
        }

        // Auto-select first size
        const firstSize = document.querySelector('.size-option');
        if (firstSize) {
            firstSize.classList.add('active');
        }
    }

    addToCart(productId, selectedSize = null) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Get selected size
        let size = selectedSize;
        if (!size) {
            const sizeSelect = document.querySelector(`[data-product-id="${productId}"].size-select`);
            size = sizeSelect ? sizeSelect.value : product.sizes[0];
        }

        // Add to cart
        if (window.cartManager) {
            window.cartManager.addItem(product, size, 1);
        }

        // Track add to cart
        StorageManager.trackEvent('add_to_cart', { productId, size });
    }

    closeModal() {
        const modal = document.getElementById('quick-view-modal');
        modal.classList.remove('active');
        this.selectedProduct = null;
    }

    renderPagination() {
        const paginationContainer = document.getElementById('pagination');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<button class="page-btn" data-page="${this.currentPage - 1}">‹</button>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<button class="page-btn active" data-page="${i}">${i}</button>`;
            } else if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                paginationHTML += `<button class="page-btn" data-page="${i}">${i}</button>`;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
        }

        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `<button class="page-btn" data-page="${this.currentPage + 1}">›</button>`;
        }

        paginationContainer.innerHTML = paginationHTML;

        // Bind pagination events
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentPage = parseInt(btn.dataset.page);
                this.renderProducts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }
}

// Export for global use
window.ShopPage = ShopPage;
