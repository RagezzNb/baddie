// Global variables
let currentPage = 'home';
let cart = JSON.parse(localStorage.getItem('sephyx_cart')) || [];
let savedItems = JSON.parse(localStorage.getItem('sephyx_saved')) || [];
let loyaltyPoints = parseInt(localStorage.getItem('sephyx_loyalty')) || 0;
let vaultUnlocked = localStorage.getItem('sephyx_vault') === 'true';
let currentFit = JSON.parse(localStorage.getItem('sephyx_current_fit')) || {};
let accountTimeline = JSON.parse(localStorage.getItem('sephyx_timeline')) || [];

// Product data with tough streetwear imagery
const products = [
    {
        id: 1,
        name: 'Eclipse Drift Hoodie',
        price: 299,
        category: 'hoodies',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Oversized cyberpunk hoodie with holographic details'
    },
    {
        id: 2,
        name: 'Neon Dawn Tee',
        price: 149,
        category: 'tees',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Glitch-print streetwear tee with reactive fibers'
    },
    {
        id: 3,
        name: 'Quantum Cargo Pants',
        price: 399,
        category: 'bottoms',
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
        sizes: ['28', '30', '32', '34', '36'],
        description: 'Multi-pocket tactical streetwear bottoms'
    },
    {
        id: 4,
        name: 'Neural Interface Mask',
        price: 199,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
        sizes: ['One Size'],
        description: 'LED-embedded cyberpunk face mask'
    },
    {
        id: 5,
        name: 'Void Walker Jacket',
        price: 599,
        category: 'hoodies',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Reflective streetwear jacket with smart fabric'
    },
    {
        id: 6,
        name: 'Cyber Punk Tee',
        price: 129,
        category: 'tees',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4325?w=400&h=400&fit=crop',
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Classic cyberpunk aesthetic streetwear'
    },
    {
        id: 7,
        name: 'Future Chain',
        price: 249,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
        sizes: ['One Size'],
        description: 'Smart chain with LED pulse effects'
    },
    {
        id: 8,
        name: 'Matrix Shorts',
        price: 199,
        category: 'bottoms',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Digital camo shorts with tech pockets'
    },
    {
        id: 9,
        name: 'Shadow Tech Vest',
        price: 349,
        category: 'hoodies',
        image: 'https://images.unsplash.com/photo-1506629905607-bb5c0e8457b5?w=400&h=400&fit=crop',
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Tactical vest with built-in tech pockets'
    },
    {
        id: 10,
        name: 'Rebel Beanie',
        price: 89,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1544923408-75c5cef46a00?w=400&h=400&fit=crop',
        sizes: ['One Size'],
        description: 'Wireless charging beanie with LED strip'
    }
];

// Glitch alerts
const glitchAlerts = [
    "SEPHYX SIGNAL ACTIVE ⚡",
    "YOU ARE BEING WATCHED.",
    "CULT TRANSMISSION INCOMING…",
    "NEURAL LINK ESTABLISHED",
    "QUANTUM DRIP DETECTED",
    "SYSTEM BREACH DETECTED"
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    createStarfield();
    createParticles();
    setupCursorTrail();
    showLoader();
    setupSecretListener();
});

function initializeApp() {
    // Initialize account timeline if empty
    if (accountTimeline.length === 0) {
        const today = new Date().toLocaleDateString();
        accountTimeline.push(`${today}: Entered the SEPHYX dimension`);
        localStorage.setItem('sephyx_timeline', JSON.stringify(accountTimeline));
    }
    
    // Update cart count
    updateCartCount();
    
    // Generate products
    generateProducts();
    
    // Setup glitch alerts
    startGlitchAlerts();
    
    // Update loyalty badge
    updateLoyaltyBadge();
    
    // Load saved fits
    loadSavedFits();
    
    // Load account timeline
    loadAccountTimeline();
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.audioManager) {
                audioManager.playSound('click');
            }
            navigateToPage(this.dataset.page);
        });
    });

    // Cart toggle
    document.getElementById('cart-toggle').addEventListener('click', toggleCart);
    document.getElementById('cart-close').addEventListener('click', toggleCart);

    // Audio toggle
    document.getElementById('audio-toggle').addEventListener('click', () => {
        if (window.audioManager) {
            audioManager.toggleMute();
            audioManager.playSound('click');
        }
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (window.audioManager) {
                audioManager.playSound('click');
            }
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProducts(this.dataset.filter);
        });
        
        // Add hover sounds
        btn.addEventListener('mouseenter', function() {
            if (window.audioManager) {
                audioManager.playSound('hover');
            }
        });
    });
    
    // Add sound effects to all buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('button, .glitch-btn, .add-to-cart, .save-item, .quick-view') && window.audioManager) {
            audioManager.playSound('click');
        }
    });
    
    // Add hover sounds to all interactive elements
    document.addEventListener('mouseenter', function(e) {
        if (e.target.matches('button, .glitch-btn, .product-card, .nav-menu a') && window.audioManager) {
            audioManager.playSound('hover');
        }
    }, true);

    // Outfit customizer
    document.getElementById('randomize-fit')?.addEventListener('click', randomizeFit);
    document.getElementById('save-fit')?.addEventListener('click', saveFit);
    document.getElementById('share-fit')?.addEventListener('click', shareFit);

    // Track order
    document.getElementById('track-btn')?.addEventListener('click', trackOrder);

    // Cart checkout
    document.getElementById('cart-checkout')?.addEventListener('click', checkout);

    // Modal close
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
}

function showLoader() {
    const loader = document.getElementById('loader');
    const progress = document.querySelector('.loader-progress');
    
    // Animate progress bar
    setTimeout(() => {
        progress.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide loader after animation
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 3000);
}

function createStarfield() {
    // Starfield is now handled by the ParticleSystem class
    console.log('Starfield initialized via ParticleSystem');
}

function createParticles() {
    // Particles are now handled by the ParticleSystem class
    console.log('Particles initialized via ParticleSystem');
}

function setupCursorTrail() {
    const trail = document.getElementById('cursor-trail');
    
    document.addEventListener('mousemove', function(e) {
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
    });
}

function startGlitchAlerts() {
    setInterval(() => {
        if (Math.random() < 0.3) {
            showGlitchAlert();
        }
    }, 5000);
}

function showGlitchAlert() {
    const alertsContainer = document.getElementById('glitch-alerts');
    const alert = document.createElement('div');
    alert.className = 'glitch-alert';
    alert.textContent = glitchAlerts[Math.floor(Math.random() * glitchAlerts.length)];
    
    alertsContainer.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function navigateToPage(page) {
    currentPage = page;
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(page + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Special handling for vault page
    if (page === 'vault' && !vaultUnlocked) {
        return;
    }
}

function generateProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    
    card.innerHTML = `
        <div class="qatar-badge">Available only in Qatar – COD</div>
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">QR ${product.price}</p>
            <div class="product-controls">
                <select class="size-select">
                    ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                </select>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="save-item" onclick="saveItem(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="quick-view" onclick="quickView(${product.id})">Quick View</button>
            </div>
        </div>
    `;
    
    return card;
}

function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const sizeSelect = document.querySelector(`[onclick="addToCart(${productId})"]`).parentElement.querySelector('.size-select');
    const selectedSize = sizeSelect.value;
    
    const cartItem = {
        id: productId,
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: product.image,
        quantity: 1
    };
    
    // Check if item already exists
    const existingItem = cart.find(item => item.id === productId && item.size === selectedSize);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(cartItem);
    }
    
    localStorage.setItem('sephyx_cart', JSON.stringify(cart));
    updateCartCount();
    
    // Play sound and effects
    if (window.audioManager) {
        audioManager.playSound('notification');
    }
    showItemDropAnimation();
    
    // Add to timeline
    const today = new Date().toLocaleDateString();
    accountTimeline.push(`${today}: Added ${product.name} to cart`);
    localStorage.setItem('sephyx_timeline', JSON.stringify(accountTimeline));
}

function saveItem(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!savedItems.find(item => item.id === productId)) {
        savedItems.push(product);
        localStorage.setItem('sephyx_saved', JSON.stringify(savedItems));
        
        // Add to timeline
        const today = new Date().toLocaleDateString();
        accountTimeline.push(`${today}: Saved ${product.name}`);
        localStorage.setItem('sephyx_timeline', JSON.stringify(accountTimeline));
        
        // Update loyalty points
        loyaltyPoints += 10;
        localStorage.setItem('sephyx_loyalty', loyaltyPoints.toString());
        updateLoyaltyBadge();
        
        loadSavedFits();
    }
}

function quickView(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('quick-view-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="quick-view-content">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; max-width: 300px; border-radius: 10px;">
            <h2>${product.name}</h2>
            <p class="product-price">QR ${product.price}</p>
            <p>${product.description}</p>
            <div class="model-stats">
                <h4>Model Stats:</h4>
                <p>5'9", wearing M, oversized fit</p>
            </div>
            <div class="suggested-bundles">
                <h4>Suggested Bundles:</h4>
                <button class="glitch-btn" onclick="suggestBundle()">DM for Custom Bundle</button>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('quick-view-modal').classList.remove('show');
}

function suggestBundle() {
    const message = `yo sephyx, i want a custom bundle suggestion! hit me up with some fire fits 🔥`;
    window.open(`https://instagram.com/direct/new/?text=${encodeURIComponent(message)}`, '_blank');
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    drawer.classList.toggle('open');
    
    if (drawer.classList.contains('open')) {
        renderCartItems();
    }
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-details">Size: ${item.size} | Qty: ${item.quantity}</div>
                    <div class="cart-item-price">QR ${item.price * item.quantity}</div>
                </div>
                <button onclick="removeFromCart(${item.id}, '${item.size}')" style="background: var(--glitch-1); border: none; color: white; padding: 5px 10px; cursor: pointer;">Remove</button>
            `;
            container.appendChild(cartItem);
        });
    }
    
    document.getElementById('cart-total').textContent = `Total: QR ${total}`;
}

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    localStorage.setItem('sephyx_cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Show warning popup
    const confirmed = confirm('⚠️ we only do cash on delivery in qatar.\n\nProceed to Instagram DM?');
    
    if (confirmed) {
        const orderText = cart.map(item => 
            `- ${item.name} | size ${item.size} | qty: ${item.quantity}`
        ).join('\n');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const message = `yo sephyx, i want to order:
${orderText}
total: qr ${total}
name:
phone:
address:
payment method: cash on delivery`;
        
        window.open(`https://instagram.com/direct/new/?text=${encodeURIComponent(message)}`, '_blank');
    }
}

function showItemDropAnimation() {
    const cartIcon = document.getElementById('cart-toggle');
    cartIcon.classList.add('drop-animation');
    
    setTimeout(() => {
        cartIcon.classList.remove('drop-animation');
    }, 500);
}

function loadSavedFits() {
    const grid = document.getElementById('saved-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (savedItems.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No saved fits yet. Start building your collection!</p>';
        return;
    }
    
    savedItems.forEach(item => {
        const savedItem = document.createElement('div');
        savedItem.className = 'saved-item';
        savedItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 200px; object-fit: cover;">
            <div style="padding: 1rem;">
                <h3>${item.name}</h3>
                <p style="color: var(--secondary-color);">QR ${item.price}</p>
            </div>
            <button class="remove-btn" onclick="removeSavedItem(${item.id})">💔 Remove</button>
        `;
        grid.appendChild(savedItem);
    });
}

function removeSavedItem(productId) {
    savedItems = savedItems.filter(item => item.id !== productId);
    localStorage.setItem('sephyx_saved', JSON.stringify(savedItems));
    loadSavedFits();
}

function randomizeFit() {
    const hoodies = products.filter(p => p.category === 'hoodies');
    const bottoms = products.filter(p => p.category === 'bottoms');
    const accessories = products.filter(p => p.category === 'accessories');
    
    currentFit = {
        hoodie: hoodies[Math.floor(Math.random() * hoodies.length)],
        bottoms: bottoms[Math.floor(Math.random() * bottoms.length)],
        accessories: accessories[Math.floor(Math.random() * accessories.length)]
    };
    
    updateOutfitDisplay();
}

function updateOutfitDisplay() {
    const slots = document.querySelectorAll('.outfit-slot');
    
    slots.forEach(slot => {
        const type = slot.dataset.type;
        const item = currentFit[type];
        
        if (item) {
            slot.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 5px;">
                <p style="margin-top: 10px; font-weight: bold;">${item.name}</p>
                <p style="color: var(--secondary-color);">QR ${item.price}</p>
            `;
            slot.classList.add('filled');
        }
    });
}

function saveFit() {
    if (Object.keys(currentFit).length === 0) {
        alert('No fit to save! Randomize a fit first.');
        return;
    }
    
    const fits = JSON.parse(localStorage.getItem('sephyx_saved_fits')) || [];
    const fitId = Date.now();
    
    fits.push({
        id: fitId,
        fit: currentFit,
        date: new Date().toLocaleDateString()
    });
    
    localStorage.setItem('sephyx_saved_fits', JSON.stringify(fits));
    
    // Add to timeline
    const today = new Date().toLocaleDateString();
    accountTimeline.push(`${today}: Saved custom fit`);
    localStorage.setItem('sephyx_timeline', JSON.stringify(accountTimeline));
    
    alert('Fit saved! 🔥');
}

function shareFit() {
    if (Object.keys(currentFit).length === 0) {
        alert('No fit to share! Randomize a fit first.');
        return;
    }
    
    const fitText = Object.entries(currentFit)
        .map(([type, item]) => `${type}: ${item.name}`)
        .join(' | ');
    
    const shareText = `Check out my SEPHYX fit: ${fitText} 🔥 #SEPHYX #cyberpunk #streetwear`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My SEPHYX Fit',
            text: shareText
        });
    } else {
        navigator.clipboard.writeText(shareText);
        alert('Fit copied to clipboard!');
    }
}

function trackOrder() {
    const orderId = document.getElementById('order-id').value;
    const result = document.getElementById('track-result');
    
    if (!orderId.trim()) {
        alert('Please enter an order ID');
        return;
    }
    
    // Mock tracking statuses
    const statuses = [
        '🟢 Out for delivery',
        '📦 COD – Get Ready',
        '🚚 ETA: Tonight',
        '📍 Driver nearby',
        '✅ Order confirmed'
    ];
    
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    result.innerHTML = `
        <h3>Order Status</h3>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Status:</strong> ${randomStatus}</p>
        <p><strong>Last Updated:</strong> ${new Date().toLocaleString()}</p>
    `;
    
    result.classList.add('show');
}

function updateLoyaltyBadge() {
    const badge = document.getElementById('loyalty-badge');
    if (!badge) return;
    
    let badgeData;
    
    if (loyaltyPoints < 50) {
        badgeData = { icon: '🧊', title: 'Street Starter' };
    } else if (loyaltyPoints < 200) {
        badgeData = { icon: '💧', title: 'Drip Dealer' };
    } else {
        badgeData = { icon: '🛸', title: 'Sephyx Saint' };
    }
    
    badge.innerHTML = `
        <span class="badge-icon">${badgeData.icon}</span>
        <span class="badge-title">${badgeData.title}</span>
        <p style="margin-top: 10px; color: var(--secondary-color);">${loyaltyPoints} points</p>
    `;
}

function loadAccountTimeline() {
    const timeline = document.getElementById('account-timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '<h3>Timeline</h3>';
    
    accountTimeline.slice(-5).reverse().forEach(entry => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.textContent = entry;
        timeline.appendChild(item);
    });
}

function toggleAudio() {
    const audio = document.getElementById('background-audio');
    const button = document.getElementById('audio-toggle');
    const icon = button.querySelector('i');
    
    if (audio.paused) {
        audio.play();
        icon.className = 'fas fa-volume-up';
    } else {
        audio.pause();
        icon.className = 'fas fa-volume-mute';
    }
}

function setupSecretListener() {
    let keyBuffer = '';
    const secretCode = '2025streetwear';
    
    document.addEventListener('keydown', function(e) {
        keyBuffer += e.key.toLowerCase();
        
        if (keyBuffer.length > secretCode.length) {
            keyBuffer = keyBuffer.slice(-secretCode.length);
        }
        
        if (keyBuffer === secretCode) {
            unlockVault();
            keyBuffer = '';
        }
    });
    
    // Easter egg for glitchcore theme
    document.addEventListener('keydown', function(e) {
        let glitchBuffer = '';
        const glitchCode = 'glitchcore';
        
        glitchBuffer += e.key.toLowerCase();
        
        if (glitchBuffer.length > glitchCode.length) {
            glitchBuffer = glitchBuffer.slice(-glitchCode.length);
        }
        
        if (glitchBuffer === glitchCode) {
            document.body.classList.toggle('holographic-theme');
            glitchBuffer = '';
        }
    });
}

function unlockVault() {
    vaultUnlocked = true;
    localStorage.setItem('sephyx_vault', 'true');
    
    // Add vault page to navigation
    const navMenu = document.querySelector('.nav-menu');
    const vaultLink = document.createElement('li');
    vaultLink.innerHTML = '<a href="#" data-page="vault" style="color: var(--secondary-color); text-shadow: var(--neon-glow);">🔮 Vault</a>';
    navMenu.appendChild(vaultLink);
    
    // Add event listener to new link
    vaultLink.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        navigateToPage('vault');
    });
    
    // Show notification
    showGlitchAlert();
    const alert = document.createElement('div');
    alert.className = 'glitch-alert';
    alert.textContent = '🔮 VAULT UNLOCKED - ACCESS GRANTED';
    alert.style.background = 'var(--secondary-color)';
    document.getElementById('glitch-alerts').appendChild(alert);
    
    // Add to timeline
    const today = new Date().toLocaleDateString();
    accountTimeline.push(`${today}: 🔮 Unlocked The Vault`);
    localStorage.setItem('sephyx_timeline', JSON.stringify(accountTimeline));
    
    // Navigate to vault
    setTimeout(() => {
        navigateToPage('vault');
    }, 2000);
}

// Countdown timer for vault
function startVaultCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    setInterval(() => {
        const now = new Date().getTime();
        const target = now + (72 * 60 * 60 * 1000); // 72 hours from now
        const distance = target - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        countdownElement.textContent = `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }, 1000);
}

// Initialize vault countdown when page loads
setTimeout(startVaultCountdown, 1000);

// Add CSS animation for twinkle effect
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);
