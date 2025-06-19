/**
 * Enhanced Storage Manager with Database Integration
 * Provides backward compatibility while leveraging the new database system
 */

class StorageManager {
    constructor() {
        this.prefix = 'sephyx_';
        this.initializeWithDatabase();
    }

    /**
     * Initialize with database integration
     */
    initializeWithDatabase() {
        // Wait for database to be ready
        if (typeof sephyxDB !== 'undefined') {
            this.db = sephyxDB;
        } else {
            // Fallback to direct localStorage if database not ready
            setTimeout(() => this.initializeWithDatabase(), 100);
            return;
        }
    }

    /**
     * Set data with database integration
     */
    static set(key, value) {
        try {
            if (window.sephyxDB) {
                // Map legacy keys to database tables
                const tableMapping = {
                    'sephyx_cart': 'cart',
                    'sephyx_saved': 'saved',
                    'sephyx_profile': 'users',
                    'sephyx_timeline': 'timeline',
                    'sephyx_saved_fits': 'fits',
                    'sephyx_settings': 'settings'
                };

                const tableName = tableMapping[key];
                if (tableName) {
                    return window.sephyxDB.set(tableName, null, value);
                }
            }
            
            // Fallback to localStorage
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage SET error:', error);
            return false;
        }
    }

    /**
     * Get data with database integration
     */
    static get(key, defaultValue = null) {
        try {
            if (window.sephyxDB) {
                // Map legacy keys to database tables
                const tableMapping = {
                    'sephyx_cart': 'cart',
                    'sephyx_saved': 'saved',
                    'sephyx_profile': 'users',
                    'sephyx_timeline': 'timeline',
                    'sephyx_saved_fits': 'fits',
                    'sephyx_settings': 'settings'
                };

                const tableName = tableMapping[key];
                if (tableName) {
                    return window.sephyxDB.get(tableName, null, defaultValue);
                }
            }
            
            // Fallback to localStorage
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage GET error:', error);
            return defaultValue;
        }
    }

    /**
     * Remove data
     */
    static remove(key) {
        try {
            if (window.sephyxDB) {
                const tableMapping = {
                    'sephyx_cart': 'cart',
                    'sephyx_saved': 'saved',
                    'sephyx_profile': 'users',
                    'sephyx_timeline': 'timeline',
                    'sephyx_saved_fits': 'fits',
                    'sephyx_settings': 'settings'
                };

                const tableName = tableMapping[key];
                if (tableName) {
                    return window.sephyxDB.clearTable(tableName);
                }
            }
            
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage REMOVE error:', error);
            return false;
        }
    }

    /**
     * Clear all data
     */
    static clear() {
        try {
            if (window.sephyxDB) {
                window.sephyxDB.clearDatabase();
                return true;
            }
            
            // Fallback: clear localStorage items with prefix
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('sephyx_')) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('Storage CLEAR error:', error);
            return false;
        }
    }

    /**
     * Get all keys
     */
    static getAllKeys() {
        try {
            if (window.sephyxDB) {
                return Object.keys(window.sephyxDB.tables);
            }
            
            return Object.keys(localStorage).filter(key => key.startsWith('sephyx_'));
        } catch (error) {
            console.error('Storage GET_ALL_KEYS error:', error);
            return [];
        }
    }

    /**
     * Get storage size
     */
    static getSize() {
        try {
            if (window.sephyxDB) {
                const stats = window.sephyxDB.getStats();
                return stats.totalSizeFormatted;
            }
            
            let total = 0;
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('sephyx_')) {
                    total += localStorage.getItem(key).length;
                }
            });
            
            return (total / 1024).toFixed(2) + ' KB';
        } catch (error) {
            console.error('Storage GET_SIZE error:', error);
            return '0 KB';
        }
    }

    /**
     * Get user data
     */
    static getUserData() {
        if (window.sephyxDB) {
            return window.sephyxDB.getUser();
        }
        return StorageManager.get('sephyx_profile', {});
    }

    /**
     * Update user data
     */
    static updateUserData(data) {
        if (window.sephyxDB) {
            return window.sephyxDB.updateUser(data);
        }
        
        const currentUser = StorageManager.getUserData();
        const updatedUser = { ...currentUser, ...data };
        return StorageManager.set('sephyx_profile', updatedUser);
    }

    /**
     * Add item to cart
     */
    static addToCart(item) {
        if (window.sephyxDB) {
            // Check if item already exists
            const existingItems = window.sephyxDB.find('cart', { 
                productId: item.productId, 
                size: item.size 
            });
            
            if (existingItems.length > 0) {
                // Update quantity
                return window.sephyxDB.update('cart', 
                    { productId: item.productId, size: item.size },
                    { quantity: existingItems[0].quantity + (item.quantity || 1) }
                );
            } else {
                // Add new item
                return window.sephyxDB.add('cart', {
                    ...item,
                    addedAt: new Date().toISOString()
                });
            }
        }
        
        // Fallback to legacy method
        const cart = StorageManager.get('sephyx_cart', []);
        const existingIndex = cart.findIndex(cartItem => 
            cartItem.productId === item.productId && cartItem.size === item.size
        );
        
        if (existingIndex > -1) {
            cart[existingIndex].quantity += (item.quantity || 1);
        } else {
            cart.push({ ...item, addedAt: new Date().toISOString() });
        }
        
        return StorageManager.set('sephyx_cart', cart);
    }

    /**
     * Remove item from cart
     */
    static removeFromCart(itemId, size) {
        if (window.sephyxDB) {
            return window.sephyxDB.remove('cart', { productId: itemId, size: size });
        }
        
        const cart = StorageManager.get('sephyx_cart', []);
        const filteredCart = cart.filter(item => 
            !(item.productId === itemId && item.size === size)
        );
        return StorageManager.set('sephyx_cart', filteredCart);
    }

    /**
     * Update cart item quantity
     */
    static updateCartQuantity(itemId, size, quantity) {
        if (window.sephyxDB) {
            if (quantity <= 0) {
                return window.sephyxDB.remove('cart', { productId: itemId, size: size });
            }
            return window.sephyxDB.update('cart', 
                { productId: itemId, size: size },
                { quantity: quantity }
            );
        }
        
        const cart = StorageManager.get('sephyx_cart', []);
        const itemIndex = cart.findIndex(item => 
            item.productId === itemId && item.size === size
        );
        
        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.splice(itemIndex, 1);
            } else {
                cart[itemIndex].quantity = quantity;
            }
            return StorageManager.set('sephyx_cart', cart);
        }
        
        return false;
    }

    /**
     * Clear cart
     */
    static clearCart() {
        if (window.sephyxDB) {
            return window.sephyxDB.set('cart', null, []);
        }
        return StorageManager.set('sephyx_cart', []);
    }

    /**
     * Add to saved items
     */
    static addToSaved(item) {
        if (window.sephyxDB) {
            // Check if already saved
            const existing = window.sephyxDB.find('saved', { productId: item.productId });
            if (existing.length === 0) {
                return window.sephyxDB.add('saved', {
                    ...item,
                    savedAt: new Date().toISOString()
                });
            }
            return false;
        }
        
        const saved = StorageManager.get('sephyx_saved', []);
        const exists = saved.some(savedItem => savedItem.productId === item.productId);
        
        if (!exists) {
            saved.push({ ...item, savedAt: new Date().toISOString() });
            return StorageManager.set('sephyx_saved', saved);
        }
        
        return false;
    }

    /**
     * Remove from saved items
     */
    static removeFromSaved(itemId) {
        if (window.sephyxDB) {
            return window.sephyxDB.remove('saved', { productId: itemId });
        }
        
        const saved = StorageManager.get('sephyx_saved', []);
        const filtered = saved.filter(item => item.productId !== itemId);
        return StorageManager.set('sephyx_saved', filtered);
    }

    /**
     * Save custom fit
     */
    static saveCustomFit(fit) {
        if (window.sephyxDB) {
            return window.sephyxDB.add('fits', {
                ...fit,
                createdAt: new Date().toISOString()
            });
        }
        
        const fits = StorageManager.get('sephyx_saved_fits', []);
        fits.push({ ...fit, createdAt: new Date().toISOString() });
        return StorageManager.set('sephyx_saved_fits', fits);
    }

    /**
     * Remove custom fit
     */
    static removeCustomFit(fitId) {
        if (window.sephyxDB) {
            return window.sephyxDB.remove('fits', fitId);
        }
        
        const fits = StorageManager.get('sephyx_saved_fits', []);
        const filtered = fits.filter(fit => fit.id !== fitId);
        return StorageManager.set('sephyx_saved_fits', filtered);
    }

    /**
     * Add chat message
     */
    static addChatMessage(message) {
        const messages = StorageManager.get('sephyx_chat_history', []);
        messages.push({
            ...message,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 100 messages
        if (messages.length > 100) {
            messages.splice(0, messages.length - 100);
        }
        
        return StorageManager.set('sephyx_chat_history', messages);
    }

    /**
     * Clear chat history
     */
    static clearChatHistory() {
        return StorageManager.remove('sephyx_chat_history');
    }

    /**
     * Increment visit count
     */
    static incrementVisitCount() {
        if (window.sephyxDB) {
            const analytics = window.sephyxDB.get('analytics', null, {});
            analytics.visitCount = (analytics.visitCount || 0) + 1;
            analytics.lastVisit = new Date().toISOString();
            return window.sephyxDB.set('analytics', null, analytics);
        }
        
        const visits = StorageManager.get('sephyx_visit_count', 0);
        return StorageManager.set('sephyx_visit_count', visits + 1);
    }

    /**
     * Track event
     */
    static trackEvent(eventName, data = {}) {
        if (window.sephyxDB) {
            const analytics = window.sephyxDB.get('analytics', null, { clickEvents: [] });
            analytics.clickEvents = analytics.clickEvents || [];
            analytics.clickEvents.push({
                event: eventName,
                data: data,
                timestamp: new Date().toISOString()
            });
            
            // Keep only last 200 events
            if (analytics.clickEvents.length > 200) {
                analytics.clickEvents.splice(0, analytics.clickEvents.length - 200);
            }
            
            return window.sephyxDB.set('analytics', null, analytics);
        }
        
        const events = StorageManager.get('sephyx_events', []);
        events.push({
            event: eventName,
            data: data,
            timestamp: new Date().toISOString()
        });
        
        return StorageManager.set('sephyx_events', events);
    }

    /**
     * Add loyalty points
     */
    static addLoyaltyPoints(points) {
        if (window.sephyxDB) {
            return window.sephyxDB.addLoyaltyPoints(points);
        }
        
        const user = StorageManager.getUserData();
        const newPoints = (user.loyaltyPoints || 0) + points;
        return StorageManager.updateUserData({ loyaltyPoints: newPoints });
    }

    /**
     * Update loyalty status
     */
    static updateLoyaltyStatus(points) {
        if (window.sephyxDB) {
            const rank = window.sephyxDB.calculateLoyaltyRank(points);
            return window.sephyxDB.updateUser({ loyaltyRank: rank });
        }
        
        // Legacy implementation
        const ranks = [
            { name: 'STREET STARTER', min: 0 },
            { name: 'DRIP DEALER', min: 500 },
            { name: 'CYBER CULTIST', min: 1500 },
            { name: 'NEON LEGEND', min: 3000 },
            { name: 'SEPHYX SAINT', min: 5000 }
        ];
        
        let rank = ranks[0].name;
        for (let i = ranks.length - 1; i >= 0; i--) {
            if (points >= ranks[i].min) {
                rank = ranks[i].name;
                break;
            }
        }
        
        return StorageManager.updateUserData({ loyaltyRank: rank });
    }

    /**
     * Export all data
     */
    static exportData() {
        if (window.sephyxDB) {
            return window.sephyxDB.exportDatabase();
        }
        
        // Legacy export
        const data = {};
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('sephyx_')) {
                try {
                    data[key] = JSON.parse(localStorage.getItem(key));
                } catch (e) {
                    data[key] = localStorage.getItem(key);
                }
            }
        });
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sephyx_data_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        
        return true;
    }

    /**
     * Import data
     */
    static importData(jsonData) {
        try {
            if (window.sephyxDB) {
                return window.sephyxDB.restore(jsonData);
            }
            
            // Legacy import
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            Object.keys(data).forEach(key => {
                if (key.startsWith('sephyx_')) {
                    localStorage.setItem(key, JSON.stringify(data[key]));
                }
            });
            
            return true;
        } catch (error) {
            console.error('Import error:', error);
            return false;
        }
    }
}

// Initialize storage manager
document.addEventListener('DOMContentLoaded', () => {
    window.StorageManager = StorageManager;
});