// Shopping Cart Management
class CartManager {
    constructor() {
        this.isOpen = false;
        this.items = [];
        this.init();
    }

    init() {
        this.loadCart();
        this.bindEvents();
        this.updateDisplay();
    }

    bindEvents() {
        // Cart toggle button
        const cartToggle = document.getElementById('cart-toggle');
        if (cartToggle) {
            cartToggle.addEventListener('click', () => this.toggleCart());
        }

        // Cart close button
        const cartClose = document.getElementById('cart-close');
        if (cartClose) {
            cartClose.addEventListener('click', () => this.closeCart());
        }

        // Cart overlay
        const cartOverlay = document.getElementById('cart-overlay');
        if (cartOverlay) {
            cartOverlay.addEventListener('click', () => this.closeCart());
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }

        // Listen for storage changes (if multiple tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === 'sephyx_cartItems') {
                this.loadCart();
                this.updateDisplay();
            }
        });
    }

    loadCart() {
        this.items = StorageManager.get('cartItems', []);
    }

    saveCart() {
        StorageManager.set('cartItems', this.items);
    }

    addItem(product, size = 'M', quantity = 1) {
        // Check if item already exists
        const existingItem = this.items.find(item => 
            item.id === product.id && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: size,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        this.updateDisplay();
        this.showAddAnimation(product);
        
        // Track event
        StorageManager.trackEvent('add_to_cart', {
            productId: product.id,
            productName: product.name,
            size: size,
            quantity: quantity
        });

        // Show notification
        window.sephyxApp.showNotification(`${product.name} added to cart`, 'success');
    }

    removeItem(productId, size) {
        this.items = this.items.filter(item => 
            !(item.id === productId && item.size === size)
        );
        
        this.saveCart();
        this.updateDisplay();
        this.renderCartItems();
    }

    updateQuantity(productId, size, quantity) {
        const item = this.items.find(item => 
            item.id === productId && item.size === size
        );

        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId, size);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateDisplay();
                this.renderCartItems();
            }
        }
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateDisplay();
        this.renderCartItems();
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    toggleCart() {
        if (this.isOpen) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }

    openCart() {
        this.isOpen = true;
        this.renderCartItems();
        
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.getElementById('cart-overlay');
        
        drawer.classList.add('open');
        overlay.classList.add('active');
        
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        this.isOpen = false;
        
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.getElementById('cart-overlay');
        
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        
        document.body.style.overflow = '';
    }

    updateDisplay() {
        // Update cart count
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const count = this.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }

        // Update cart total
        const cartTotal = document.getElementById('cart-total');
        if (cartTotal) {
            cartTotal.textContent = this.getTotal().toFixed(0);
        }
    }

    renderCartItems() {
        const cartItems = document.getElementById('cart-items');
        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some drip to get started</p>
                    <button onclick="window.location.hash = '#/shop'" class="glitch-btn">
                        Enter the Vault
                    </button>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-size">Size: ${item.size}</p>
                    <p class="item-price">QR ${item.price}</p>
                </div>
                <div class="item-controls">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="cartManager.updateQuantity('${item.id}', '${item.size}', ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="cartManager.updateQuantity('${item.id}', '${item.size}', ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-btn" onclick="cartManager.removeItem('${item.id}', '${item.size}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Add CSS for cart items
        this.addCartItemStyles();
    }

    addCartItemStyles() {
        if (document.getElementById('cart-item-styles')) return;

        const style = document.createElement('style');
        style.id = 'cart-item-styles';
        style.textContent = `
            .empty-cart {
                text-align: center;
                padding: 2rem;
                color: var(--text-secondary);
            }
            
            .empty-cart i {
                font-size: 3rem;
                margin-bottom: 1rem;
                color: var(--text-muted);
            }
            
            .cart-item {
                display: flex;
                gap: 1rem;
                padding: 1rem;
                border-bottom: 1px solid var(--border-color);
                align-items: center;
            }
            
            .item-image {
                width: 60px;
                height: 60px;
                flex-shrink: 0;
            }
            
            .item-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 5px;
            }
            
            .item-details {
                flex: 1;
            }
            
            .item-details h4 {
                color: var(--primary-color);
                margin-bottom: 0.25rem;
                font-size: 0.9rem;
            }
            
            .item-size, .item-price {
                font-size: 0.8rem;
                color: var(--text-secondary);
                margin: 0;
            }
            
            .item-controls {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                align-items: center;
            }
            
            .quantity-controls {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .qty-btn {
                width: 24px;
                height: 24px;
                border: 1px solid var(--border-color);
                background: var(--bg-color);
                color: var(--text-primary);
                border-radius: 3px;
                cursor: none;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.7rem;
                transition: all var(--transition-normal);
            }
            
            .qty-btn:hover {
                border-color: var(--primary-color);
                color: var(--primary-color);
            }
            
            .quantity {
                min-width: 30px;
                text-align: center;
                font-weight: bold;
            }
            
            .remove-btn {
                background: none;
                border: none;
                color: var(--error-color);
                cursor: none;
                padding: 0.25rem;
                border-radius: 3px;
                transition: all var(--transition-normal);
            }
            
            .remove-btn:hover {
                background: rgba(255, 0, 128, 0.1);
                transform: scale(1.1);
            }
        `;
        
        document.head.appendChild(style);
    }

    showAddAnimation(product) {
        // Create floating animation from product to cart
        const cartBtn = document.getElementById('cart-toggle');
        if (!cartBtn) return;

        const floatingItem = document.createElement('div');
        floatingItem.className = 'floating-cart-item';
        floatingItem.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
        
        // Position at click location or center of screen
        const rect = cartBtn.getBoundingClientRect();
        floatingItem.style.cssText = `
            position: fixed;
            width: 50px;
            height: 50px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            pointer-events: none;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        
        floatingItem.querySelector('img').style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            border: 2px solid var(--primary-color);
            box-shadow: 0 0 20px var(--primary-color);
        `;
        
        document.body.appendChild(floatingItem);
        
        // Animate to cart
        setTimeout(() => {
            floatingItem.style.left = rect.right + 'px';
            floatingItem.style.top = rect.top + 'px';
            floatingItem.style.transform = 'translate(-50%, -50%) scale(0)';
            floatingItem.style.opacity = '0';
        }, 100);
        
        // Remove element
        setTimeout(() => {
            floatingItem.remove();
        }, 900);
    }

    checkout() {
        if (this.items.length === 0) {
            window.sephyxApp.showNotification('Your cart is empty', 'error');
            return;
        }

        // Show confirmation popup
        const confirmed = confirm('⚠️ We only do cash on delivery in Qatar.\n\nContinue to Instagram DM?');
        
        if (confirmed) {
            this.generateInstagramMessage();
        }
    }

    generateInstagramMessage() {
        let message = 'yo sephyx, i want to order:\n';
        
        this.items.forEach(item => {
            message += `- ${item.name.toLowerCase()} | size ${item.size.toLowerCase()} | qty: ${item.quantity}\n`;
        });
        
        message += `total: qr ${this.getTotal()}\n`;
        message += 'name:\n';
        message += 'phone:\n';
        message += 'address:\n';
        message += 'payment method: cash on delivery';
        
        // URL encode the message
        const encodedMessage = encodeURIComponent(message);
        
        // Open Instagram DM
        const instagramUrl = `https://www.instagram.com/direct/new/?text=${encodedMessage}`;
        window.open(instagramUrl, '_blank');
        
        // Track checkout event
        StorageManager.trackEvent('checkout_attempted', {
            itemCount: this.getItemCount(),
            total: this.getTotal(),
            items: this.items.map(item => ({
                id: item.id,
                name: item.name,
                size: item.size,
                quantity: item.quantity
            }))
        });
        
        // Show success message
        window.sephyxApp.showNotification('Redirecting to Instagram DM...', 'success');
        
        // Optionally clear cart after successful checkout
        setTimeout(() => {
            const shouldClear = confirm('Clear your cart?');
            if (shouldClear) {
                this.clearCart();
                this.closeCart();
            }
        }, 2000);
    }

    // Quick add method for product pages
    quickAdd(productId, size = 'M') {
        // Find product in products array
        const product = window.products?.find(p => p.id === productId);
        if (product) {
            this.addItem(product, size, 1);
        }
    }

    // Get cart summary for other components
    getCartSummary() {
        return {
            itemCount: this.getItemCount(),
            total: this.getTotal(),
            items: this.items
        };
    }
}

// Export for global use
window.CartManager = CartManager;
