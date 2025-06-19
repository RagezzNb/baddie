/**
 * SEPHYX Static Database System
 * A comprehensive localStorage-based database for static websites
 * Provides database-like functionality without requiring a backend
 */

class SephyxDatabase {
    constructor() {
        this.prefix = 'sephyx_';
        this.version = '1.0';
        this.initialized = false;
        this.tables = {
            users: 'user_profiles',
            products: 'product_catalog',
            cart: 'shopping_cart',
            saved: 'saved_items',
            orders: 'order_history',
            fits: 'custom_fits',
            timeline: 'user_timeline',
            settings: 'user_settings',
            analytics: 'user_analytics',
            notifications: 'notifications'
        };
        this.init();
    }

    /**
     * Initialize the database system
     */
    init() {
        this.checkVersion();
        this.initializeTables();
        this.setupAutoBackup();
        this.initialized = true;
        console.log('SEPHYX Database initialized successfully');
    }

    /**
     * Check database version and handle migrations
     */
    checkVersion() {
        const currentVersion = this.get('system', 'version', '0.0');
        if (currentVersion !== this.version) {
            this.migrate(currentVersion, this.version);
            this.set('system', 'version', this.version);
        }
    }

    /**
     * Initialize all database tables with default structures
     */
    initializeTables() {
        // Initialize user profile table
        if (!this.tableExists('users')) {
            this.createTable('users', {
                id: 1,
                username: 'StreetRebel',
                email: '',
                location: 'Qatar Underground',
                bio: 'Living the cyberpunk dream in the digital underground.',
                avatar: 2,
                styleTags: ['cyberpunk', 'streetwear'],
                customTags: [],
                loyaltyPoints: 150,
                loyaltyRank: 'STREET STARTER',
                totalSpent: 0,
                totalOrders: 0,
                daysActive: 1,
                joinDate: new Date().toISOString(),
                lastActive: new Date().toISOString(),
                preferences: {
                    notifications: true,
                    audioEnabled: false,
                    theme: 'dark'
                }
            });
        }

        // Initialize other tables
        this.ensureTable('cart', []);
        this.ensureTable('saved', []);
        this.ensureTable('orders', []);
        this.ensureTable('fits', []);
        this.ensureTable('timeline', []);
        this.ensureTable('settings', {
            audioEnabled: false,
            particlesEnabled: true,
            notificationsEnabled: true,
            glitchEffects: true
        });
        this.ensureTable('analytics', {
            pageViews: {},
            sessionTime: 0,
            clickEvents: [],
            searchQueries: [],
            lastSession: new Date().toISOString()
        });
        this.ensureTable('notifications', []);
    }

    /**
     * Create a new table with initial data
     */
    createTable(tableName, initialData) {
        const key = this.prefix + this.tables[tableName];
        localStorage.setItem(key, JSON.stringify(initialData));
    }

    /**
     * Ensure table exists, create if not
     */
    ensureTable(tableName, defaultData) {
        if (!this.tableExists(tableName)) {
            this.createTable(tableName, defaultData);
        }
    }

    /**
     * Check if table exists
     */
    tableExists(tableName) {
        const key = this.prefix + this.tables[tableName];
        return localStorage.getItem(key) !== null;
    }

    /**
     * Get data from a table
     */
    get(tableName, field = null, defaultValue = null) {
        try {
            const key = this.prefix + this.tables[tableName];
            const data = JSON.parse(localStorage.getItem(key) || 'null');
            
            if (data === null) return defaultValue;
            if (field === null) return data;
            
            return data[field] !== undefined ? data[field] : defaultValue;
        } catch (error) {
            console.error(`Database GET error for ${tableName}:`, error);
            return defaultValue;
        }
    }

    /**
     * Set data in a table
     */
    set(tableName, field, value) {
        try {
            const key = this.prefix + this.tables[tableName];
            let data = JSON.parse(localStorage.getItem(key) || '{}');
            
            if (field === null) {
                data = value;
            } else {
                data[field] = value;
            }
            
            localStorage.setItem(key, JSON.stringify(data));
            this.trackChange(tableName, 'update', { field, value });
            return true;
        } catch (error) {
            console.error(`Database SET error for ${tableName}:`, error);
            return false;
        }
    }

    /**
     * Add item to array-based table
     */
    add(tableName, item) {
        try {
            const data = this.get(tableName, null, []);
            
            // Ensure it's an array
            if (!Array.isArray(data)) {
                console.error(`Table ${tableName} is not an array`);
                return false;
            }
            
            // Add unique ID if not present
            if (typeof item === 'object' && !item.id) {
                item.id = this.generateId();
            }
            
            data.push(item);
            this.set(tableName, null, data);
            this.trackChange(tableName, 'add', item);
            return true;
        } catch (error) {
            console.error(`Database ADD error for ${tableName}:`, error);
            return false;
        }
    }

    /**
     * Remove item from array-based table
     */
    remove(tableName, condition) {
        try {
            const data = this.get(tableName, null, []);
            
            if (!Array.isArray(data)) {
                console.error(`Table ${tableName} is not an array`);
                return false;
            }
            
            const originalLength = data.length;
            let filteredData;
            
            if (typeof condition === 'function') {
                filteredData = data.filter(item => !condition(item));
            } else if (typeof condition === 'object') {
                filteredData = data.filter(item => {
                    return !Object.keys(condition).every(key => item[key] === condition[key]);
                });
            } else {
                filteredData = data.filter(item => item.id !== condition);
            }
            
            if (filteredData.length !== originalLength) {
                this.set(tableName, null, filteredData);
                this.trackChange(tableName, 'remove', condition);
                return true;
            }
            
            return false;
        } catch (error) {
            console.error(`Database REMOVE error for ${tableName}:`, error);
            return false;
        }
    }

    /**
     * Find items in array-based table
     */
    find(tableName, condition) {
        try {
            const data = this.get(tableName, null, []);
            
            if (!Array.isArray(data)) {
                return [];
            }
            
            if (typeof condition === 'function') {
                return data.filter(condition);
            } else if (typeof condition === 'object') {
                return data.filter(item => {
                    return Object.keys(condition).every(key => item[key] === condition[key]);
                });
            } else {
                return data.filter(item => item.id === condition);
            }
        } catch (error) {
            console.error(`Database FIND error for ${tableName}:`, error);
            return [];
        }
    }

    /**
     * Update items in array-based table
     */
    update(tableName, condition, updates) {
        try {
            const data = this.get(tableName, null, []);
            
            if (!Array.isArray(data)) {
                console.error(`Table ${tableName} is not an array`);
                return false;
            }
            
            let updated = false;
            
            const updatedData = data.map(item => {
                let shouldUpdate = false;
                
                if (typeof condition === 'function') {
                    shouldUpdate = condition(item);
                } else if (typeof condition === 'object') {
                    shouldUpdate = Object.keys(condition).every(key => item[key] === condition[key]);
                } else {
                    shouldUpdate = item.id === condition;
                }
                
                if (shouldUpdate) {
                    updated = true;
                    return { ...item, ...updates, updatedAt: new Date().toISOString() };
                }
                
                return item;
            });
            
            if (updated) {
                this.set(tableName, null, updatedData);
                this.trackChange(tableName, 'update', { condition, updates });
            }
            
            return updated;
        } catch (error) {
            console.error(`Database UPDATE error for ${tableName}:`, error);
            return false;
        }
    }

    /**
     * Generate unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Track database changes for analytics
     */
    trackChange(tableName, operation, data) {
        const change = {
            id: this.generateId(),
            table: tableName,
            operation: operation,
            data: data,
            timestamp: new Date().toISOString(),
            session: this.getSessionId()
        };
        
        // Add to timeline if it's a user-facing change
        if (['cart', 'saved', 'orders', 'fits'].includes(tableName)) {
            this.addToTimeline(this.formatTimelineEvent(change));
        }
    }

    /**
     * Add event to user timeline
     */
    addToTimeline(event) {
        const timeline = this.get('timeline', null, []);
        timeline.unshift(event);
        
        // Keep only last 100 events
        if (timeline.length > 100) {
            timeline.splice(100);
        }
        
        this.set('timeline', null, timeline);
    }

    /**
     * Format change for timeline display
     */
    formatTimelineEvent(change) {
        const eventMap = {
            cart: {
                add: 'Added item to cart',
                remove: 'Removed item from cart',
                update: 'Updated cart item'
            },
            saved: {
                add: 'Saved item to arsenal',
                remove: 'Removed saved item'
            },
            orders: {
                add: 'Placed new order'
            },
            fits: {
                add: 'Created custom fit',
                remove: 'Deleted custom fit'
            }
        };
        
        const eventText = eventMap[change.table]?.[change.operation] || `${change.operation} on ${change.table}`;
        
        return {
            id: change.id,
            event: eventText,
            details: change.data,
            timestamp: change.timestamp
        };
    }

    /**
     * Get or create session ID
     */
    getSessionId() {
        let sessionId = sessionStorage.getItem('sephyx_session');
        if (!sessionId) {
            sessionId = this.generateId();
            sessionStorage.setItem('sephyx_session', sessionId);
        }
        return sessionId;
    }

    /**
     * Backup entire database
     */
    backup() {
        try {
            const backup = {
                version: this.version,
                timestamp: new Date().toISOString(),
                tables: {}
            };
            
            Object.keys(this.tables).forEach(tableName => {
                backup.tables[tableName] = this.get(tableName);
            });
            
            return JSON.stringify(backup, null, 2);
        } catch (error) {
            console.error('Database backup error:', error);
            return null;
        }
    }

    /**
     * Restore from backup
     */
    restore(backupData) {
        try {
            const backup = typeof backupData === 'string' ? JSON.parse(backupData) : backupData;
            
            if (!backup || !backup.tables) {
                throw new Error('Invalid backup format');
            }
            
            // Restore each table
            Object.keys(backup.tables).forEach(tableName => {
                if (this.tables[tableName]) {
                    this.set(tableName, null, backup.tables[tableName]);
                }
            });
            
            console.log('Database restored successfully');
            return true;
        } catch (error) {
            console.error('Database restore error:', error);
            return false;
        }
    }

    /**
     * Export database as downloadable file
     */
    exportDatabase() {
        const backup = this.backup();
        if (!backup) return false;
        
        const blob = new Blob([backup], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sephyx_database_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        
        return true;
    }

    /**
     * Import database from file
     */
    importDatabase(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const success = this.restore(e.target.result);
                    resolve(success);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('File read error'));
            reader.readAsText(file);
        });
    }

    /**
     * Setup automatic backup system
     */
    setupAutoBackup() {
        // Auto-backup every 30 minutes
        setInterval(() => {
            const backup = this.backup();
            if (backup) {
                sessionStorage.setItem('sephyx_auto_backup', backup);
                console.log('Auto-backup completed');
            }
        }, 30 * 60 * 1000);
    }

    /**
     * Get database statistics
     */
    getStats() {
        const stats = {
            tables: {},
            totalSize: 0,
            lastBackup: sessionStorage.getItem('sephyx_auto_backup') ? 'Available' : 'None'
        };
        
        Object.keys(this.tables).forEach(tableName => {
            const data = this.get(tableName);
            const size = JSON.stringify(data).length;
            
            stats.tables[tableName] = {
                records: Array.isArray(data) ? data.length : 1,
                size: size,
                sizeFormatted: this.formatBytes(size)
            };
            
            stats.totalSize += size;
        });
        
        stats.totalSizeFormatted = this.formatBytes(stats.totalSize);
        return stats;
    }

    /**
     * Format bytes to human readable
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Clear specific table
     */
    clearTable(tableName) {
        if (this.tables[tableName]) {
            const key = this.prefix + this.tables[tableName];
            localStorage.removeItem(key);
            return true;
        }
        return false;
    }

    /**
     * Clear entire database
     */
    clearDatabase() {
        Object.keys(this.tables).forEach(tableName => {
            this.clearTable(tableName);
        });
        localStorage.removeItem(this.prefix + 'system');
        console.log('Database cleared');
    }

    /**
     * Handle version migrations
     */
    migrate(fromVersion, toVersion) {
        console.log(`Migrating database from ${fromVersion} to ${toVersion}`);
        // Add migration logic here for future versions
    }

    /**
     * Get user profile (shortcut method)
     */
    getUser() {
        return this.get('users');
    }

    /**
     * Update user profile (shortcut method)
     */
    updateUser(updates) {
        const currentUser = this.getUser();
        const updatedUser = { ...currentUser, ...updates, lastActive: new Date().toISOString() };
        return this.set('users', null, updatedUser);
    }

    /**
     * Add loyalty points and update rank
     */
    addLoyaltyPoints(points) {
        const user = this.getUser();
        const newPoints = (user.loyaltyPoints || 0) + points;
        const newRank = this.calculateLoyaltyRank(newPoints);
        
        this.updateUser({
            loyaltyPoints: newPoints,
            loyaltyRank: newRank
        });
        
        this.addToTimeline({
            id: this.generateId(),
            event: `Earned ${points} loyalty points`,
            details: { points, newTotal: newPoints, rank: newRank },
            timestamp: new Date().toISOString()
        });
        
        return { points: newPoints, rank: newRank };
    }

    /**
     * Calculate loyalty rank based on points
     */
    calculateLoyaltyRank(points) {
        const ranks = [
            { name: 'STREET STARTER', min: 0 },
            { name: 'DRIP DEALER', min: 500 },
            { name: 'CYBER CULTIST', min: 1500 },
            { name: 'NEON LEGEND', min: 3000 },
            { name: 'SEPHYX SAINT', min: 5000 }
        ];
        
        for (let i = ranks.length - 1; i >= 0; i--) {
            if (points >= ranks[i].min) {
                return ranks[i].name;
            }
        }
        
        return ranks[0].name;
    }
}

// Initialize global database instance
let sephyxDB;
document.addEventListener('DOMContentLoaded', () => {
    sephyxDB = new SephyxDatabase();
    window.sephyxDB = sephyxDB;
    
    // Make database methods globally accessible
    window.db = {
        get: (table, field, defaultValue) => sephyxDB.get(table, field, defaultValue),
        set: (table, field, value) => sephyxDB.set(table, field, value),
        add: (table, item) => sephyxDB.add(table, item),
        remove: (table, condition) => sephyxDB.remove(table, condition),
        find: (table, condition) => sephyxDB.find(table, condition),
        update: (table, condition, updates) => sephyxDB.update(table, condition, updates),
        backup: () => sephyxDB.backup(),
        restore: (data) => sephyxDB.restore(data),
        export: () => sephyxDB.exportDatabase(),
        stats: () => sephyxDB.getStats(),
        clear: () => sephyxDB.clearDatabase()
    };
});