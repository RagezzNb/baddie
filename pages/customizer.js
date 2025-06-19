// Outfit Customizer Page Component
class CustomizerPage {
    constructor() {
        this.selectedItems = {
            hoodies: null,
            tees: null,
            bottoms: null,
            accessories: null
        };
        this.availableItems = {
            hoodies: [],
            tees: [],
            bottoms: [],
            accessories: []
        };
        this.savedFits = [];
        this.currentFit = null;
    }

    async render() {
        return `
            <div class="customizer-page page-container">
                <!-- Page Header -->
                <div class="customizer-header">
                    <h1 class="page-title glitch neon" data-text="OUTFIT GENERATOR">OUTFIT GENERATOR</h1>
                    <p class="customizer-subtitle">AI-powered fit combinations for maximum drip</p>
                    
                    <div class="generator-controls">
                        <button class="generator-btn glitch-btn" onclick="customizerPage.randomizeFit()">
                            <i class="fas fa-dice"></i> Randomize Fit
                        </button>
                        <button class="generator-btn glitch-btn" onclick="customizerPage.saveFit()" id="save-fit-btn" disabled>
                            <i class="fas fa-save"></i> Save My Fit
                        </button>
                        <button class="generator-btn glitch-btn" onclick="customizerPage.shareFit()" id="share-fit-btn" disabled>
                            <i class="fas fa-share"></i> Share This Drip
                        </button>
                    </div>
                </div>

                <!-- Main Customizer -->
                <div class="customizer-main">
                    <!-- Selected Outfit Display -->
                    <div class="outfit-display">
                        <div class="outfit-preview">
                            <div class="fit-stack" id="fit-stack">
                                <div class="fit-layer fit-background">
                                    <div class="mannequin">
                                        <div class="mannequin-head"></div>
                                        <div class="mannequin-body"></div>
                                        <div class="mannequin-arms"></div>
                                        <div class="mannequin-legs"></div>
                                    </div>
                                </div>
                                <div class="fit-layer fit-hoodies" id="layer-hoodies"></div>
                                <div class="fit-layer fit-tees" id="layer-tees"></div>
                                <div class="fit-layer fit-bottoms" id="layer-bottoms"></div>
                                <div class="fit-layer fit-accessories" id="layer-accessories"></div>
                            </div>
                            
                            <div class="outfit-info" id="outfit-info">
                                <div class="fit-name">Untitled Fit</div>
                                <div class="fit-price">QR 0</div>
                                <div class="fit-vibe">Select items to see the vibe</div>
                            </div>
                        </div>
                        
                        <div class="fit-controls">
                            <button class="fit-control-btn" onclick="customizerPage.clearFit()">
                                <i class="fas fa-eraser"></i> Clear All
                            </button>
                            <button class="fit-control-btn" onclick="customizerPage.addAllToCart()">
                                <i class="fas fa-shopping-cart"></i> Add All to Cart
                            </button>
                        </div>
                    </div>

                    <!-- Item Categories -->
                    <div class="categories-panel">
                        <div class="category-tabs">
                            <button class="category-tab active" data-category="hoodies">
                                <i class="fas fa-tshirt"></i> Hoodies
                            </button>
                            <button class="category-tab" data-category="tees">
                                <i class="fas fa-tshirt"></i> T-Shirts
                            </button>
                            <button class="category-tab" data-category="bottoms">
                                <i class="fas fa-user"></i> Bottoms
                            </button>
                            <button class="category-tab" data-category="accessories">
                                <i class="fas fa-crown"></i> Accessories
                            </button>
                        </div>
                        
                        <div class="category-content">
                            <div class="category-section active" data-category="hoodies">
                                <div id="hoodies-grid" class="items-grid"></div>
                            </div>
                            <div class="category-section" data-category="tees">
                                <div id="tees-grid" class="items-grid"></div>
                            </div>
                            <div class="category-section" data-category="bottoms">
                                <div id="bottoms-grid" class="items-grid"></div>
                            </div>
                            <div class="category-section" data-category="accessories">
                                <div id="accessories-grid" class="items-grid"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Saved Fits -->
                <div class="saved-fits-section">
                    <h2 class="section-title neon-secondary">MY SAVED FITS</h2>
                    <div id="saved-fits-grid" class="saved-fits-grid">
                        <!-- Saved fits will be populated here -->
                    </div>
                </div>

                <!-- Style Suggestions -->
                <div class="suggestions-section">
                    <h2 class="section-title neon">STYLE SUGGESTIONS</h2>
                    <div class="suggestions-grid">
                        <div class="suggestion-card">
                            <div class="suggestion-icon">🔥</div>
                            <h4>Cyberpunk Core</h4>
                            <p>Oversized hoodie + slim fit bottoms + tech accessories</p>
                            <button onclick="customizerPage.applySuggestion('cyberpunk')" class="suggestion-btn">Try This Vibe</button>
                        </div>
                        
                        <div class="suggestion-card">
                            <div class="suggestion-icon">💫</div>
                            <h4>Neon Dreams</h4>
                            <p>Holographic tee + cargo pants + glowing accessories</p>
                            <button onclick="customizerPage.applySuggestion('neon')" class="suggestion-btn">Try This Vibe</button>
                        </div>
                        
                        <div class="suggestion-card">
                            <div class="suggestion-icon">⚡</div>
                            <h4>Digital Underground</h4>
                            <p>Matrix hoodie + tech pants + neural cap</p>
                            <button onclick="customizerPage.applySuggestion('digital')" class="suggestion-btn">Try This Vibe</button>
                        </div>
                        
                        <div class="suggestion-card">
                            <div class="suggestion-icon">🌟</div>
                            <h4>Future Minimalist</h4>
                            <p>Clean lines + monochrome + subtle tech details</p>
                            <button onclick="customizerPage.applySuggestion('minimal')" class="suggestion-btn">Try This Vibe</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.loadProducts();
        this.loadSavedFits();
        this.addStyles();
        this.bindEvents();
        this.renderCategories();
        this.renderSavedFits();
        
        // Track page view
        StorageManager.trackEvent('page_view', { page: 'customizer' });
    }

    addStyles() {
        if (document.getElementById('customizer-styles')) return;

        const style = document.createElement('style');
        style.id = 'customizer-styles';
        style.textContent = `
            .customizer-page {
                min-height: 100vh;
            }
            
            .customizer-header {
                text-align: center;
                margin-bottom: 3rem;
                padding: 2rem 0;
                background: radial-gradient(ellipse at center, rgba(255,255,0,0.1) 0%, transparent 70%);
                border-radius: 10px;
            }
            
            .page-title {
                font-size: clamp(2rem, 4vw, 3.5rem);
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .customizer-subtitle {
                color: var(--text-secondary);
                font-size: 1.2rem;
                margin-bottom: 2rem;
            }
            
            .generator-controls {
                display: flex;
                justify-content: center;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .generator-btn {
                padding: 1rem 2rem;
                font-size: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .generator-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                background: var(--text-muted);
            }
            
            .customizer-main {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 3rem;
                margin-bottom: 4rem;
            }
            
            .outfit-display {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 15px;
                padding: 2rem;
                text-align: center;
                backdrop-filter: blur(10px);
            }
            
            .outfit-preview {
                margin-bottom: 2rem;
            }
            
            .fit-stack {
                position: relative;
                width: 300px;
                height: 400px;
                margin: 0 auto 2rem;
                background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(255,0,255,0.1));
                border-radius: 15px;
                overflow: hidden;
                border: 2px solid var(--border-color);
            }
            
            .fit-layer {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .mannequin {
                position: relative;
                width: 80px;
                height: 200px;
                opacity: 0.3;
            }
            
            .mannequin-head {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: var(--text-muted);
                margin: 0 auto 10px;
            }
            
            .mannequin-body {
                width: 60px;
                height: 80px;
                background: var(--text-muted);
                margin: 0 auto 10px;
                border-radius: 10px;
            }
            
            .mannequin-arms {
                width: 80px;
                height: 20px;
                background: var(--text-muted);
                margin: -50px auto 10px;
                border-radius: 10px;
            }
            
            .mannequin-legs {
                width: 40px;
                height: 80px;
                background: var(--text-muted);
                margin: 0 auto;
                border-radius: 10px;
            }
            
            .fit-item-preview {
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
                opacity: 0.9;
            }
            
            .outfit-info {
                background: rgba(0,0,0,0.5);
                padding: 1rem;
                border-radius: 10px;
                margin-bottom: 1rem;
            }
            
            .fit-name {
                color: var(--primary-color);
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            
            .fit-price {
                color: var(--secondary-color);
                font-size: 1.1rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            
            .fit-vibe {
                color: var(--text-secondary);
                font-size: 0.9rem;
                font-style: italic;
            }
            
            .fit-controls {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .fit-control-btn {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                padding: 0.75rem 1rem;
                border-radius: 5px;
                cursor: none;
                transition: all var(--transition-normal);
                font-family: var(--font-primary);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
            }
            
            .fit-control-btn:hover {
                border-color: var(--primary-color);
                color: var(--primary-color);
            }
            
            .categories-panel {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 15px;
                overflow: hidden;
                backdrop-filter: blur(10px);
            }
            
            .category-tabs {
                display: flex;
                background: rgba(0,0,0,0.3);
                border-bottom: 1px solid var(--border-color);
            }
            
            .category-tab {
                flex: 1;
                background: none;
                border: none;
                color: var(--text-secondary);
                padding: 1rem;
                cursor: none;
                transition: all var(--transition-normal);
                font-family: var(--font-primary);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .category-tab:hover {
                background: rgba(0,255,255,0.1);
                color: var(--primary-color);
            }
            
            .category-tab.active {
                background: var(--primary-color);
                color: var(--bg-color);
            }
            
            .category-tab i {
                font-size: 1.2rem;
            }
            
            .category-content {
                height: 400px;
                overflow-y: auto;
                padding: 1rem;
            }
            
            .category-section {
                display: none;
            }
            
            .category-section.active {
                display: block;
            }
            
            .items-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                gap: 1rem;
            }
            
            .customizer-item {
                background: rgba(0,0,0,0.3);
                border: 2px solid var(--border-color);
                border-radius: 10px;
                padding: 0.5rem;
                cursor: none;
                transition: all var(--transition-normal);
                text-align: center;
                position: relative;
            }
            
            .customizer-item:hover {
                border-color: var(--primary-color);
                box-shadow: 0 5px 15px rgba(0,255,255,0.3);
                transform: translateY(-2px);
            }
            
            .customizer-item.selected {
                border-color: var(--secondary-color);
                background: rgba(255,0,255,0.2);
                box-shadow: 0 0 20px rgba(255,0,255,0.4);
            }
            
            .customizer-item img {
                width: 100%;
                aspect-ratio: 1;
                object-fit: cover;
                border-radius: 5px;
                margin-bottom: 0.5rem;
            }
            
            .customizer-item-name {
                color: var(--text-primary);
                font-size: 0.8rem;
                font-weight: 600;
                margin-bottom: 0.25rem;
                line-height: 1.2;
            }
            
            .customizer-item-price {
                color: var(--primary-color);
                font-size: 0.8rem;
                font-weight: bold;
            }
            
            .saved-fits-section {
                margin: 4rem 0;
            }
            
            .section-title {
                text-align: center;
                font-size: 2rem;
                margin-bottom: 2rem;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .saved-fits-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 1.5rem;
            }
            
            .saved-fit-card {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                overflow: hidden;
                cursor: none;
                transition: all var(--transition-normal);
            }
            
            .saved-fit-card:hover {
                transform: translateY(-5px);
                border-color: var(--secondary-color);
                box-shadow: 0 10px 25px rgba(255,0,255,0.2);
            }
            
            .saved-fit-preview {
                aspect-ratio: 1;
                background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(255,0,255,0.1));
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
            }
            
            .saved-fit-info {
                padding: 1rem;
                text-align: center;
            }
            
            .saved-fit-name {
                color: var(--primary-color);
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            
            .saved-fit-price {
                color: var(--secondary-color);
                font-size: 0.9rem;
                margin-bottom: 0.5rem;
            }
            
            .saved-fit-date {
                color: var(--text-muted);
                font-size: 0.8rem;
                margin-bottom: 1rem;
            }
            
            .saved-fit-actions {
                display: flex;
                gap: 0.5rem;
                justify-content: center;
            }
            
            .saved-fit-btn {
                background: rgba(0,255,255,0.2);
                border: 1px solid var(--primary-color);
                color: var(--primary-color);
                padding: 0.5rem;
                border-radius: 5px;
                cursor: none;
                transition: all var(--transition-normal);
                font-size: 0.8rem;
                flex: 1;
            }
            
            .saved-fit-btn:hover {
                background: var(--primary-color);
                color: var(--bg-color);
            }
            
            .suggestions-section {
                margin: 4rem 0;
                padding: 3rem 0;
                background: linear-gradient(45deg, rgba(26,26,26,0.8), rgba(10,10,10,0.9));
                border-radius: 15px;
            }
            
            .suggestions-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
                max-width: 1000px;
                margin: 0 auto;
                padding: 0 2rem;
            }
            
            .suggestion-card {
                background: rgba(0,0,0,0.5);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 2rem;
                text-align: center;
                transition: all var(--transition-normal);
                cursor: none;
            }
            
            .suggestion-card:hover {
                transform: translateY(-5px);
                border-color: var(--primary-color);
                box-shadow: 0 10px 25px rgba(0,255,255,0.2);
            }
            
            .suggestion-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            
            .suggestion-card h4 {
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-size: 1.2rem;
            }
            
            .suggestion-card p {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 1.5rem;
            }
            
            .suggestion-btn {
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
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
            }
            
            .suggestion-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,255,255,0.3);
            }
            
            @media (max-width: 768px) {
                .customizer-main {
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
                
                .generator-controls {
                    flex-direction: column;
                    align-items: center;
                }
                
                .category-tabs {
                    grid-template-columns: repeat(2, 1fr);
                    display: grid;
                }
                
                .category-tab {
                    font-size: 0.8rem;
                }
                
                .items-grid {
                    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                }
                
                .fit-stack {
                    width: 250px;
                    height: 320px;
                }
                
                .suggestions-grid {
                    grid-template-columns: 1fr;
                    padding: 0 1rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    bindEvents() {
        // Category tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchCategory(e.target.dataset.category);
            });
        });
    }

    loadProducts() {
        const allProducts = window.products || [];
        
        // Sort products into categories
        this.availableItems.hoodies = allProducts.filter(p => p.category === 'hoodies');
        this.availableItems.tees = allProducts.filter(p => p.category === 'tees');
        this.availableItems.bottoms = allProducts.filter(p => p.category === 'bottoms');
        this.availableItems.accessories = allProducts.filter(p => p.category === 'accessories');
    }

    loadSavedFits() {
        this.savedFits = StorageManager.get('customFits', []);
    }

    switchCategory(category) {
        // Update active tab
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });
        
        // Update active section
        document.querySelectorAll('.category-section').forEach(section => {
            section.classList.toggle('active', section.dataset.category === category);
        });
    }

    renderCategories() {
        Object.keys(this.availableItems).forEach(category => {
            this.renderCategoryItems(category);
        });
    }

    renderCategoryItems(category) {
        const grid = document.getElementById(`${category}-grid`);
        if (!grid) return;

        const items = this.availableItems[category];
        
        grid.innerHTML = items.map(item => `
            <div class="customizer-item" data-item-id="${item.id}" data-category="${category}" onclick="customizerPage.selectItem('${category}', '${item.id}')">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="customizer-item-name">${item.name}</div>
                <div class="customizer-item-price">QR ${item.price}</div>
            </div>
        `).join('');
    }

    selectItem(category, itemId) {
        const item = this.availableItems[category].find(i => i.id === itemId);
        if (!item) return;

        // Update selection
        this.selectedItems[category] = item;
        
        // Update UI
        this.updateCategorySelection(category, itemId);
        this.updateOutfitDisplay();
        this.updateOutfitInfo();
        this.updateControls();
        
        // Track selection
        StorageManager.trackEvent('customizer_item_select', { category, itemId, itemName: item.name });
    }

    updateCategorySelection(category, selectedId) {
        const categoryGrid = document.getElementById(`${category}-grid`);
        if (!categoryGrid) return;

        // Remove previous selections
        categoryGrid.querySelectorAll('.customizer-item').forEach(item => {
            item.classList.toggle('selected', item.dataset.itemId === selectedId);
        });
    }

    updateOutfitDisplay() {
        Object.keys(this.selectedItems).forEach(category => {
            const layer = document.getElementById(`layer-${category}`);
            if (!layer) return;

            const item = this.selectedItems[category];
            if (item) {
                layer.innerHTML = `<img src="${item.image}" alt="${item.name}" class="fit-item-preview">`;
            } else {
                layer.innerHTML = '';
            }
        });
    }

    updateOutfitInfo() {
        const selectedCount = Object.values(this.selectedItems).filter(item => item !== null).length;
        
        if (selectedCount === 0) {
            document.querySelector('.fit-name').textContent = 'Untitled Fit';
            document.querySelector('.fit-price').textContent = 'QR 0';
            document.querySelector('.fit-vibe').textContent = 'Select items to see the vibe';
            return;
        }

        // Calculate total price
        const totalPrice = Object.values(this.selectedItems)
            .filter(item => item !== null)
            .reduce((sum, item) => sum + item.price, 0);

        // Generate fit name
        const fitName = this.generateFitName();
        
        // Generate vibe description
        const vibe = this.generateVibeDescription();

        document.querySelector('.fit-name').textContent = fitName;
        document.querySelector('.fit-price').textContent = `QR ${totalPrice}`;
        document.querySelector('.fit-vibe').textContent = vibe;
    }

    generateFitName() {
        const adjectives = ['Cyber', 'Neon', 'Digital', 'Future', 'Quantum', 'Neural', 'Holographic', 'Matrix'];
        const nouns = ['Drip', 'Fit', 'Vibe', 'Look', 'Style', 'Aesthetic', 'Flow', 'Energy'];
        
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        
        return `${adjective} ${noun}`;
    }

    generateVibeDescription() {
        const selectedCount = Object.values(this.selectedItems).filter(item => item !== null).length;
        
        const vibes = [
            'Cyberpunk energy activated 🔥',
            'Digital underground aesthetic 💫',
            'Future streetwear certified ⚡',
            'Neon dreams realized 🌟',
            'Matrix-level drip achieved 💎',
            'Holographic vibes detected 🔮',
            'Neural network fashion 🧠',
            'Quantum style unlocked 🚀'
        ];
        
        if (selectedCount >= 3) {
            return vibes[Math.floor(Math.random() * vibes.length)];
        } else if (selectedCount >= 2) {
            return 'Solid foundation, add more for maximum drip';
        } else {
            return 'Building the perfect fit...';
        }
    }

    updateControls() {
        const selectedCount = Object.values(this.selectedItems).filter(item => item !== null).length;
        const hasSelection = selectedCount > 0;
        
        document.getElementById('save-fit-btn').disabled = !hasSelection;
        document.getElementById('share-fit-btn').disabled = !hasSelection;
    }

    randomizeFit() {
        // Clear current selection
        this.clearFit();
        
        // Randomly select 2-3 items from different categories
        const categories = Object.keys(this.availableItems);
        const numItems = Math.floor(Math.random() * 2) + 2; // 2-3 items
        
        const selectedCategories = categories
            .sort(() => Math.random() - 0.5)
            .slice(0, numItems);

        selectedCategories.forEach(category => {
            const items = this.availableItems[category];
            if (items.length > 0) {
                const randomItem = items[Math.floor(Math.random() * items.length)];
                this.selectItem(category, randomItem.id);
            }
        });

        // Add special effect
        if (window.particleSystem) {
            window.particleSystem.createBurst(window.innerWidth / 2, window.innerHeight / 2, 15);
        }

        window.sephyxApp.showNotification('Random fit generated! 🎲', 'success');
        
        // Track event
        StorageManager.trackEvent('customizer_randomize', { selectedCategories, numItems });
    }

    clearFit() {
        // Clear all selections
        Object.keys(this.selectedItems).forEach(category => {
            this.selectedItems[category] = null;
        });
        
        // Update UI
        document.querySelectorAll('.customizer-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        this.updateOutfitDisplay();
        this.updateOutfitInfo();
        this.updateControls();
        
        // Track event
        StorageManager.trackEvent('customizer_clear_fit');
    }

    saveFit() {
        const selectedCount = Object.values(this.selectedItems).filter(item => item !== null).length;
        if (selectedCount === 0) {
            window.sephyxApp.showNotification('Select some items first!', 'error');
            return;
        }

        const fitName = document.querySelector('.fit-name').textContent;
        const totalPrice = Object.values(this.selectedItems)
            .filter(item => item !== null)
            .reduce((sum, item) => sum + item.price, 0);

        const fit = {
            id: Date.now().toString(),
            name: fitName,
            items: { ...this.selectedItems },
            totalPrice,
            createdAt: new Date().toISOString()
        };

        // Save to storage
        this.savedFits.push(fit);
        StorageManager.set('customFits', this.savedFits);
        
        // Add loyalty points
        StorageManager.addLoyaltyPoints(25);
        
        // Re-render saved fits
        this.renderSavedFits();
        
        window.sephyxApp.showNotification(`"${fitName}" saved to your collection! 💾`, 'success');
        
        // Track event
        StorageManager.trackEvent('customizer_save_fit', { fitName, totalPrice, itemCount: selectedCount });
    }

    shareFit() {
        const selectedCount = Object.values(this.selectedItems).filter(item => item !== null).length;
        if (selectedCount === 0) {
            window.sephyxApp.showNotification('Select some items first!', 'error');
            return;
        }

        const fitName = document.querySelector('.fit-name').textContent;
        const selectedItems = Object.values(this.selectedItems)
            .filter(item => item !== null)
            .map(item => item.name)
            .join(', ');

        const shareText = `Check out my custom SEPHYX fit: "${fitName}"\n\nItems: ${selectedItems}\n\nBuilt with the SEPHYX Outfit Generator 🔮`;

        if (navigator.share) {
            navigator.share({
                title: `My SEPHYX Fit: ${fitName}`,
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(shareText)
                .then(() => {
                    window.sephyxApp.showNotification('Fit details copied to clipboard! 📋', 'success');
                })
                .catch(() => {
                    window.sephyxApp.showNotification('Unable to share fit', 'error');
                });
        }
        
        // Track event
        StorageManager.trackEvent('customizer_share_fit', { fitName, itemCount: selectedCount });
    }

    addAllToCart() {
        const selectedItems = Object.values(this.selectedItems).filter(item => item !== null);
        
        if (selectedItems.length === 0) {
            window.sephyxApp.showNotification('No items selected!', 'error');
            return;
        }

        selectedItems.forEach(item => {
            if (window.cartManager) {
                window.cartManager.addItem(item, 'M', 1);
            }
        });

        window.sephyxApp.showNotification(`Added ${selectedItems.length} items to cart! 🛒`, 'success');
        
        // Track event
        StorageManager.trackEvent('customizer_add_all_to_cart', { itemCount: selectedItems.length });
    }

    renderSavedFits() {
        const grid = document.getElementById('saved-fits-grid');
        if (!grid) return;

        if (this.savedFits.length === 0) {
            grid.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1 / -1;">No saved fits yet. Create your first fit above!</p>';
            return;
        }

        grid.innerHTML = this.savedFits.map(fit => this.renderSavedFitCard(fit)).join('');
    }

    renderSavedFitCard(fit) {
        const createdDate = new Date(fit.createdAt).toLocaleDateString();
        
        return `
            <div class="saved-fit-card">
                <div class="saved-fit-preview">
                    <div class="fit-stack-mini">
                        ${Object.values(fit.items).filter(item => item !== null).slice(0, 3).map(item => 
                            `<img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 5px; margin: 2px;" loading="lazy">`
                        ).join('')}
                    </div>
                </div>
                
                <div class="saved-fit-info">
                    <div class="saved-fit-name">${fit.name}</div>
                    <div class="saved-fit-price">QR ${fit.totalPrice}</div>
                    <div class="saved-fit-date">${createdDate}</div>
                    
                    <div class="saved-fit-actions">
                        <button class="saved-fit-btn" onclick="customizerPage.loadFit('${fit.id}')">Load</button>
                        <button class="saved-fit-btn" onclick="customizerPage.deleteFit('${fit.id}')">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }

    loadFit(fitId) {
        const fit = this.savedFits.find(f => f.id === fitId);
        if (!fit) return;

        // Clear current selection
        this.clearFit();
        
        // Load fit items
        Object.keys(fit.items).forEach(category => {
            if (fit.items[category]) {
                this.selectedItems[category] = fit.items[category];
                this.updateCategorySelection(category, fit.items[category].id);
            }
        });

        // Update display
        this.updateOutfitDisplay();
        this.updateOutfitInfo();
        this.updateControls();

        window.sephyxApp.showNotification(`Loaded "${fit.name}" 📂`, 'success');
        
        // Track event
        StorageManager.trackEvent('customizer_load_fit', { fitId, fitName: fit.name });
    }

    deleteFit(fitId) {
        const fit = this.savedFits.find(f => f.id === fitId);
        if (!fit) return;

        const confirmed = confirm(`Delete "${fit.name}"? This cannot be undone.`);
        if (!confirmed) return;

        // Remove from array
        this.savedFits = this.savedFits.filter(f => f.id !== fitId);
        
        // Update storage
        StorageManager.set('customFits', this.savedFits);
        
        // Re-render
        this.renderSavedFits();

        window.sephyxApp.showNotification(`"${fit.name}" deleted`, 'info');
        
        // Track event
        StorageManager.trackEvent('customizer_delete_fit', { fitId, fitName: fit.name });
    }

    applySuggestion(suggestionType) {
        // Clear current fit
        this.clearFit();

        // Apply suggestion based on type
        const suggestions = {
            cyberpunk: ['hoodies', 'bottoms', 'accessories'],
            neon: ['tees', 'bottoms', 'accessories'],
            digital: ['hoodies', 'bottoms', 'accessories'],
            minimal: ['tees', 'bottoms']
        };

        const categories = suggestions[suggestionType] || ['hoodies', 'bottoms'];
        
        categories.forEach(category => {
            const items = this.availableItems[category];
            if (items.length > 0) {
                // Try to pick items that match the theme
                let selectedItem;
                if (suggestionType === 'cyberpunk') {
                    selectedItem = items.find(item => item.name.toLowerCase().includes('cyber') || item.name.toLowerCase().includes('matrix')) || items[0];
                } else if (suggestionType === 'neon') {
                    selectedItem = items.find(item => item.name.toLowerCase().includes('neon') || item.name.toLowerCase().includes('glow')) || items[0];
                } else {
                    selectedItem = items[Math.floor(Math.random() * items.length)];
                }
                
                this.selectItem(category, selectedItem.id);
            }
        });

        window.sephyxApp.showNotification(`Applied ${suggestionType} style suggestion! ✨`, 'success');
        
        // Track event
        StorageManager.trackEvent('customizer_apply_suggestion', { suggestionType });
    }
}

// Export for global use
window.CustomizerPage = CustomizerPage;
