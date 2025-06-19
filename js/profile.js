class ProfileManager {
    constructor() {
        this.profileData = this.loadProfileData();
        this.currentAvatar = 2; // Default avatar
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSavedFits();
        this.updateLoyaltyDisplay();
        this.updateStats();
        this.loadProfileFields();
    }

    loadProfileData() {
        const defaultProfile = {
            username: 'StreetRebel',
            location: 'Qatar Underground',
            bio: 'Living the cyberpunk dream in the digital underground. Fashion is rebellion.',
            avatar: 2,
            styleTags: ['cyberpunk', 'streetwear'],
            customTags: [],
            loyaltyPoints: 150,
            totalOrders: 12,
            daysActive: 45
        };

        return {
            ...defaultProfile,
            ...JSON.parse(localStorage.getItem('sephyx_profile') || '{}')
        };
    }

    saveProfileData() {
        localStorage.setItem('sephyx_profile', JSON.stringify(this.profileData));
        
        if (window.audioManager) {
            audioManager.playSound('notification');
        }
        
        this.showSuccessMessage('Profile saved successfully!');
    }

    bindEvents() {
        // Avatar selection
        document.getElementById('profile-avatar')?.addEventListener('click', () => {
            const options = document.getElementById('avatar-options');
            options.style.display = options.style.display === 'none' ? 'block' : 'none';
        });

        // Preset avatar selection
        document.querySelectorAll('.preset-avatars img').forEach(img => {
            img.addEventListener('click', (e) => {
                this.selectAvatar(parseInt(e.target.dataset.avatar));
            });
        });

        // Style tags
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                this.toggleStyleTag(e.target.dataset.tag);
            });
        });

        // Custom tag input
        const customTagInput = document.getElementById('custom-tag');
        customTagInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
                this.addCustomTag(e.target.value.trim());
                e.target.value = '';
            }
        });

        // Save profile
        document.getElementById('save-profile')?.addEventListener('click', () => {
            this.saveProfile();
        });

        // Export profile
        document.getElementById('export-profile')?.addEventListener('click', () => {
            this.exportProfile();
        });

        // Reset profile
        document.getElementById('reset-profile')?.addEventListener('click', () => {
            this.resetProfile();
        });

        // Input field updates
        ['profile-username', 'profile-location', 'profile-bio'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', (e) => {
                    this.updateProfileField(id, e.target.value);
                });
            }
        });
    }

    selectAvatar(avatarId) {
        this.currentAvatar = avatarId;
        this.profileData.avatar = avatarId;
        
        // Update main avatar display
        const avatarImage = document.getElementById('avatar-image');
        const avatarSources = [
            '',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&h=200&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=200&h=200&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face'
        ];
        
        if (avatarImage) {
            avatarImage.src = avatarSources[avatarId];
        }

        // Update preset avatar selection
        document.querySelectorAll('.preset-avatars img').forEach((img, index) => {
            img.classList.toggle('active', index + 1 === avatarId);
        });

        // Hide options
        document.getElementById('avatar-options').style.display = 'none';
        
        if (window.audioManager) {
            audioManager.playSound('click');
        }
    }

    toggleStyleTag(tagName) {
        const tagElement = document.querySelector(`[data-tag="${tagName}"]`);
        if (!tagElement) return;

        const isActive = tagElement.classList.contains('active');
        
        if (isActive) {
            // Remove tag
            this.profileData.styleTags = this.profileData.styleTags.filter(tag => tag !== tagName);
            tagElement.classList.remove('active');
        } else {
            // Add tag
            if (!this.profileData.styleTags.includes(tagName)) {
                this.profileData.styleTags.push(tagName);
            }
            tagElement.classList.add('active');
        }

        if (window.audioManager) {
            audioManager.playSound('click');
        }
    }

    addCustomTag(tagName) {
        if (tagName.startsWith('#')) {
            tagName = tagName.substring(1);
        }
        
        if (!this.profileData.customTags.includes(tagName)) {
            this.profileData.customTags.push(tagName);
            this.renderCustomTag(tagName);
            
            if (window.audioManager) {
                audioManager.playSound('notification');
            }
        }
    }

    renderCustomTag(tagName) {
        const tagsContainer = document.getElementById('style-tags');
        const tag = document.createElement('span');
        tag.className = 'tag active custom-tag';
        tag.textContent = `#${tagName}`;
        tag.dataset.tag = tagName;
        
        // Add remove functionality for custom tags
        tag.addEventListener('dblclick', () => {
            this.removeCustomTag(tagName);
        });
        
        tag.addEventListener('click', () => {
            this.toggleStyleTag(tagName);
        });
        
        tagsContainer.appendChild(tag);
    }

    removeCustomTag(tagName) {
        this.profileData.customTags = this.profileData.customTags.filter(tag => tag !== tagName);
        this.profileData.styleTags = this.profileData.styleTags.filter(tag => tag !== tagName);
        
        const tagElement = document.querySelector(`[data-tag="${tagName}"]`);
        if (tagElement && tagElement.classList.contains('custom-tag')) {
            tagElement.remove();
        }
    }

    updateProfileField(fieldId, value) {
        switch (fieldId) {
            case 'profile-username':
                this.profileData.username = value;
                break;
            case 'profile-location':
                this.profileData.location = value;
                break;
            case 'profile-bio':
                this.profileData.bio = value;
                break;
        }
    }

    loadSavedFits() {
        const savedItems = JSON.parse(localStorage.getItem('sephyx_saved') || '[]');
        const fitsGrid = document.getElementById('saved-fits-preview');
        const fitCount = document.getElementById('fit-count');
        
        if (!fitsGrid) return;

        fitsGrid.innerHTML = '';
        
        // Show first 6 saved fits
        const displayFits = savedItems.slice(0, 6);
        
        displayFits.forEach(item => {
            const fitPreview = document.createElement('div');
            fitPreview.className = 'fit-preview';
            fitPreview.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="fit-name">${item.name}</div>
            `;
            
            fitPreview.addEventListener('click', () => {
                if (window.audioManager) {
                    audioManager.playSound('click');
                }
                navigateToPage('saved');
            });
            
            fitsGrid.appendChild(fitPreview);
        });

        if (fitCount) {
            fitCount.textContent = `${savedItems.length} fits locked`;
        }
    }

    updateLoyaltyDisplay() {
        const loyaltyRanks = [
            { name: 'STREET STARTER', icon: '🧊', min: 0, subtitle: 'Building street cred' },
            { name: 'DRIP DEALER', icon: '💧', min: 500, subtitle: 'Moving that heat' },
            { name: 'CYBER CULTIST', icon: '⚡', min: 1500, subtitle: 'Deep in the matrix' },
            { name: 'NEON LEGEND', icon: '🌟', min: 3000, subtitle: 'Living the dream' },
            { name: 'SEPHYX SAINT', icon: '🛸', min: 5000, subtitle: 'Ascended rebel' }
        ];

        const points = this.profileData.loyaltyPoints || 0;
        let currentRank = loyaltyRanks[0];
        let nextRank = loyaltyRanks[1];
        
        for (let i = loyaltyRanks.length - 1; i >= 0; i--) {
            if (points >= loyaltyRanks[i].min) {
                currentRank = loyaltyRanks[i];
                nextRank = loyaltyRanks[i + 1] || null;
                break;
            }
        }

        // Update badge display
        const badgeIcon = document.querySelector('.loyalty-badge .badge-icon');
        const badgeTitle = document.querySelector('.badge-title');
        const badgeSubtitle = document.querySelector('.badge-subtitle');
        const loyaltyPointsEl = document.getElementById('loyalty-points');
        
        if (badgeIcon) badgeIcon.textContent = currentRank.icon;
        if (badgeTitle) badgeTitle.textContent = currentRank.name;
        if (badgeSubtitle) badgeSubtitle.textContent = currentRank.subtitle;
        if (loyaltyPointsEl) loyaltyPointsEl.textContent = points;

        // Update progress bar
        if (nextRank) {
            const progress = ((points - currentRank.min) / (nextRank.min - currentRank.min)) * 100;
            const progressFill = document.querySelector('.progress-fill');
            const progressText = document.querySelector('.progress-text');
            
            if (progressFill) {
                progressFill.style.width = `${Math.min(progress, 100)}%`;
            }
            
            if (progressText) {
                const pointsNeeded = nextRank.min - points;
                progressText.innerHTML = `${pointsNeeded} pts to <strong>${nextRank.name}</strong>`;
            }
        } else {
            // Max rank reached
            const progressFill = document.querySelector('.progress-fill');
            const progressText = document.querySelector('.progress-text');
            
            if (progressFill) progressFill.style.width = '100%';
            if (progressText) progressText.innerHTML = '<strong>MAX RANK ACHIEVED</strong>';
        }
    }

    updateStats() {
        // Update from various localStorage data
        const cart = JSON.parse(localStorage.getItem('sephyx_cart') || '[]');
        const saved = JSON.parse(localStorage.getItem('sephyx_saved') || '[]');
        const timeline = JSON.parse(localStorage.getItem('sephyx_timeline') || '[]');
        
        const totalOrdersEl = document.getElementById('total-orders');
        const totalSavedEl = document.getElementById('total-saved');
        const daysActiveEl = document.getElementById('days-active');
        
        if (totalOrdersEl) {
            // Count unique "Added to cart" events as orders
            const orderEvents = timeline.filter(event => event.includes('Added') && event.includes('cart'));
            totalOrdersEl.textContent = Math.max(orderEvents.length, this.profileData.totalOrders || 0);
        }
        
        if (totalSavedEl) {
            totalSavedEl.textContent = saved.length;
        }
        
        if (daysActiveEl) {
            // Calculate days since first timeline event or use stored value
            const firstEvent = timeline[0];
            if (firstEvent) {
                const firstDate = new Date(firstEvent.split(':')[0]);
                const today = new Date();
                const daysDiff = Math.floor((today - firstDate) / (1000 * 60 * 60 * 24));
                daysActiveEl.textContent = Math.max(daysDiff, 1);
            } else {
                daysActiveEl.textContent = this.profileData.daysActive || 1;
            }
        }
    }

    loadProfileFields() {
        // Load saved profile data into form fields
        const usernameEl = document.getElementById('profile-username');
        const locationEl = document.getElementById('profile-location');
        const bioEl = document.getElementById('profile-bio');
        
        if (usernameEl) usernameEl.value = this.profileData.username || '';
        if (locationEl) locationEl.value = this.profileData.location || '';
        if (bioEl) bioEl.value = this.profileData.bio || '';
        
        // Load avatar
        this.selectAvatar(this.profileData.avatar || 2);
        
        // Load style tags
        this.profileData.styleTags?.forEach(tagName => {
            const tagElement = document.querySelector(`[data-tag="${tagName}"]`);
            if (tagElement) {
                tagElement.classList.add('active');
            }
        });
        
        // Render custom tags
        this.profileData.customTags?.forEach(tagName => {
            this.renderCustomTag(tagName);
        });
    }

    saveProfile() {
        // Collect current form data
        const username = document.getElementById('profile-username')?.value;
        const location = document.getElementById('profile-location')?.value;
        const bio = document.getElementById('profile-bio')?.value;
        
        if (username) this.profileData.username = username;
        if (location) this.profileData.location = location;
        if (bio) this.profileData.bio = bio;
        
        this.saveProfileData();
    }

    exportProfile() {
        const exportData = {
            profile: this.profileData,
            cart: JSON.parse(localStorage.getItem('sephyx_cart') || '[]'),
            saved: JSON.parse(localStorage.getItem('sephyx_saved') || '[]'),
            timeline: JSON.parse(localStorage.getItem('sephyx_timeline') || '[]'),
            fits: JSON.parse(localStorage.getItem('sephyx_saved_fits') || '[]')
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `sephyx_profile_${this.profileData.username || 'user'}_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        if (window.audioManager) {
            audioManager.playSound('whoosh');
        }
        
        this.showSuccessMessage('Profile exported successfully!');
    }

    resetProfile() {
        if (confirm('Are you sure you want to reset your profile? This action cannot be undone.')) {
            // Clear profile data
            localStorage.removeItem('sephyx_profile');
            
            // Optionally clear other data
            if (confirm('Also clear your cart, saved items, and timeline?')) {
                localStorage.removeItem('sephyx_cart');
                localStorage.removeItem('sephyx_saved');
                localStorage.removeItem('sephyx_timeline');
                localStorage.removeItem('sephyx_saved_fits');
            }
            
            // Reload page to reset everything
            location.reload();
        }
    }

    showSuccessMessage(message) {
        // Create temporary success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: var(--bg-color);
            padding: 1rem 2rem;
            border-radius: 5px;
            font-family: 'Orbitron', monospace;
            font-weight: bold;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize profile manager
let profileManager;
document.addEventListener('DOMContentLoaded', () => {
    profileManager = new ProfileManager();
    window.profileManager = profileManager;
});