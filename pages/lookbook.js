// Lookbook Page Component
class LookbookPage {
    constructor() {
        this.videos = [];
        this.currentFilter = 'all';
        this.isPlaying = {};
    }

    async render() {
        return `
            <div class="lookbook-page page-container">
                <!-- Page Header -->
                <div class="lookbook-header">
                    <h1 class="page-title glitch neon" data-text="DIGITAL LOOKBOOK">DIGITAL LOOKBOOK</h1>
                    <p class="lookbook-subtitle">Cinematic visuals showcasing the future of streetwear</p>
                    
                    <div class="lookbook-filters">
                        <button class="filter-btn active" data-filter="all">All Looks</button>
                        <button class="filter-btn" data-filter="editorial">Editorial</button>
                        <button class="filter-btn" data-filter="street">Street Style</button>
                        <button class="filter-btn" data-filter="studio">Studio</button>
                        <button class="filter-btn" data-filter="campaign">Campaign</button>
                    </div>
                </div>

                <!-- Video Grid -->
                <div class="video-grid" id="video-grid">
                    <!-- Videos will be populated here -->
                </div>

                <!-- Featured Section -->
                <div class="featured-section">
                    <h2 class="section-title neon-secondary">FEATURED COLLECTION</h2>
                    <div class="featured-grid">
                        <div class="featured-item main-feature">
                            <div class="featured-video">
                                <video loop muted>
                                    <source src="https://pixabay.com/get/ge3a2764662b4b592ba9dd5ca21cc510de1ac7729e4aa8226410f5f13196e847e4d00adcbc81f01ca9bbf3e7885271f474f63a9d133ce38801d6dda1f3c0e7116_1280.jpg" type="video/mp4">
                                </video>
                                <div class="featured-overlay">
                                    <div class="featured-content">
                                        <h3 class="featured-title">NEON PROPHECY</h3>
                                        <p class="featured-desc">The future is now. Experience our latest cyberpunk collection.</p>
                                        <button class="featured-btn glitch-btn">Explore Collection</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="featured-item">
                            <div class="featured-image">
                                <img src="https://pixabay.com/get/gc8e1c26ebaa8f6e7113272b059cdc875d0af3c4332ee8ce7e4fa0acd6110bd3a63f4ef7b1002afac96b07c65a811959854e1fe264e186213c5c9386e7c7713c8_1280.jpg" alt="Digital Underground">
                                <div class="featured-overlay">
                                    <div class="featured-content">
                                        <h4>DIGITAL UNDERGROUND</h4>
                                        <p>Where technology meets streetwear</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="featured-item">
                            <div class="featured-image">
                                <img src="https://pixabay.com/get/gaf1dd90343e702a9896c97929dbea75f75c0fbab07352137aca0fd03176168a1fbfd31389c43ba89d58c1984e83de4b1ae7dab8a170807c8201b9e07e17d6941_1280.jpg" alt="Cult Aesthetics">
                                <div class="featured-overlay">
                                    <div class="featured-content">
                                        <h4>CULT AESTHETICS</h4>
                                        <p>Join the digital revolution</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Gallery Section -->
                <div class="gallery-section">
                    <h2 class="section-title neon">BEHIND THE SCENES</h2>
                    <div class="gallery-grid" id="gallery-grid">
                        <!-- Gallery items will be populated here -->
                    </div>
                </div>

                <!-- Interactive Elements -->
                <div class="interactive-section">
                    <div class="vr-preview">
                        <div class="vr-content">
                            <h3 class="vr-title holographic">EXPERIENCE IN VR</h3>
                            <p class="vr-desc">Step into the digital realm with our immersive VR lookbook</p>
                            <button class="vr-btn glitch-btn" onclick="lookbookPage.launchVRExperience()">
                                <i class="fas fa-vr-cardboard"></i> Launch VR
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Video Modal -->
                <div id="video-modal" class="video-modal">
                    <div class="video-modal-content">
                        <button class="video-modal-close" id="video-modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="video-modal-player" id="video-modal-player">
                            <!-- Video player will be populated here -->
                        </div>
                        <div class="video-modal-info" id="video-modal-info">
                            <!-- Video info will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.loadVideos();
        this.addStyles();
        this.bindEvents();
        this.renderVideos();
        this.renderGallery();
        this.initParallax();
        
        // Track page view
        StorageManager.trackEvent('page_view', { page: 'lookbook' });
    }

    loadVideos() {
        // Mock video data with actual stock images as placeholders
        this.videos = [
            {
                id: 'vid1',
                title: 'Cyberpunk Streets',
                category: 'street',
                thumbnail: 'https://pixabay.com/get/ge3a2764662b4b592ba9dd5ca21cc510de1ac7729e4d00adcbc81f01ca9bbf3e7885271f474f63a9d133ce38801d6dda1f3c0e7116_1280.jpg',
                duration: '2:34',
                description: 'Street style meets digital aesthetics in this urban exploration.',
                products: ['Eclipse Drift Hoodie', 'Neon Dawn Tee', 'Void Cargo Pants']
            },
            {
                id: 'vid2',
                title: 'Digital Underground',
                category: 'editorial',
                thumbnail: 'https://pixabay.com/get/gc8e1c26ebaa8f6e7113272b059cdc875d0af3c4332ee8ce7e4fa0acd6110bd3a63f4ef7b1002afac96b07c65a811959854e1fe264e186213c5c9386e7c7713c8_1280.jpg',
                duration: '1:47',
                description: 'Editorial fashion meets cyberpunk aesthetics.',
                products: ['Matrix Bomber', 'Glitch Tee', 'Neural Interface Cap']
            },
            {
                id: 'vid3',
                title: 'Neon Prophecy',
                category: 'campaign',
                thumbnail: 'https://pixabay.com/get/gaf1dd90343e702a9896c97929dbea75f75c0fbab07352137aca0fd03176168a1fbfd31389c43ba89d58c1984e83de4b1ae7dab8a170807c8201b9e07e17d6941_1280.jpg',
                duration: '3:12',
                description: 'Our flagship campaign showcasing the future of streetwear.',
                products: ['Prophecy Hoodie', 'Quantum Joggers', 'Cyber Kicks']
            },
            {
                id: 'vid4',
                title: 'Holographic Dreams',
                category: 'studio',
                thumbnail: 'https://pixabay.com/get/gafe1aa79072b32afd5097e488051b89f57ab18598bc92721c35f93c1f958719620112af903d2b30f000788091073aeacc12b11eac3c12db5864c83d87615ba80_1280.jpg',
                duration: '2:56',
                description: 'Studio session exploring holographic textures and neon lighting.',
                products: ['Hologram Jacket', 'Prism Shorts', 'Light Beam Sneakers']
            },
            {
                id: 'vid5',
                title: 'Future Tribe',
                category: 'street',
                thumbnail: 'https://pixabay.com/get/gda91f42cf0eb8f2ebec1971ff62d858a774d9ef8affaed29127e4f9d2d7fe175fdb19d9bcefe745523fe84d7417c3d6b56b45137924c2277ce4f4c83557ff351_1280.jpg',
                duration: '4:23',
                description: 'Community style showcase featuring our cult members.',
                products: ['Tribe Hoodie', 'Unity Pants', 'Collective Cap']
            },
            {
                id: 'vid6',
                title: 'Synthwave Session',
                category: 'editorial',
                thumbnail: 'https://pixabay.com/get/g52c9d4ffd4e9b2227f784d27e7ad7f786ff55526e362880266a88bba5d78f4ec668f89451d5f66c1e9628bd3b00d8e2854be01952a297111a6b967ff4c51dd68_1280.jpg',
                duration: '3:45',
                description: 'Retro-futuristic editorial inspired by 80s synthwave.',
                products: ['Synthwave Bomber', 'Retro Tee', 'Wave Runners']
            }
        ];
    }

    addStyles() {
        if (document.getElementById('lookbook-styles')) return;

        const style = document.createElement('style');
        style.id = 'lookbook-styles';
        style.textContent = `
            .lookbook-page {
                min-height: 100vh;
            }
            
            .lookbook-header {
                text-align: center;
                margin-bottom: 4rem;
                padding: 3rem 0;
                background: radial-gradient(ellipse at center, rgba(255,0,255,0.1) 0%, transparent 70%);
                border-radius: 10px;
            }
            
            .page-title {
                font-size: clamp(2.5rem, 5vw, 4rem);
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 4px;
            }
            
            .lookbook-subtitle {
                color: var(--text-secondary);
                font-size: 1.2rem;
                margin-bottom: 2rem;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .lookbook-filters {
                display: flex;
                justify-content: center;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .filter-btn {
                background: rgba(26,26,26,0.8);
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                cursor: none;
                transition: all var(--transition-normal);
                font-family: var(--font-primary);
                text-transform: uppercase;
                letter-spacing: 1px;
                font-size: 0.9rem;
            }
            
            .filter-btn:hover {
                border-color: var(--primary-color);
                color: var(--primary-color);
                box-shadow: 0 0 20px rgba(0,255,255,0.3);
            }
            
            .filter-btn.active {
                background: var(--primary-color);
                color: var(--bg-color);
                border-color: var(--primary-color);
            }
            
            .video-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
                margin-bottom: 5rem;
            }
            
            .video-item {
                position: relative;
                aspect-ratio: 16/9;
                border-radius: 10px;
                overflow: hidden;
                cursor: none;
                transition: all var(--transition-normal);
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
            }
            
            .video-item:hover {
                transform: translateY(-10px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                border-color: var(--primary-color);
            }
            
            .video-thumbnail {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform var(--transition-slow);
            }
            
            .video-item:hover .video-thumbnail {
                transform: scale(1.1);
            }
            
            .video-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(
                    to bottom,
                    transparent 0%,
                    rgba(0,0,0,0.3) 50%,
                    rgba(0,0,0,0.8) 100%
                );
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding: 1.5rem;
                opacity: 0;
                transition: opacity var(--transition-normal);
            }
            
            .video-item:hover .video-overlay {
                opacity: 1;
            }
            
            .video-play-btn {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: rgba(0,255,255,0.9);
                border: none;
                color: var(--bg-color);
                font-size: 2rem;
                cursor: none;
                transition: all var(--transition-normal);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .video-play-btn:hover {
                transform: translate(-50%, -50%) scale(1.1);
                background: var(--primary-color);
                box-shadow: 0 0 30px var(--primary-color);
            }
            
            .video-duration {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: bold;
            }
            
            .video-category {
                position: absolute;
                top: 1rem;
                left: 1rem;
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                color: var(--bg-color);
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .video-title {
                color: white;
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
                text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            }
            
            .video-description {
                color: rgba(255,255,255,0.9);
                font-size: 0.9rem;
                line-height: 1.4;
                margin-bottom: 1rem;
            }
            
            .video-products {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .product-tag {
                background: rgba(255,255,255,0.2);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 10px;
                font-size: 0.7rem;
                backdrop-filter: blur(5px);
            }
            
            .featured-section {
                margin: 5rem 0;
                padding: 3rem 0;
                background: linear-gradient(45deg, rgba(26,26,26,0.8), rgba(10,10,10,0.9));
                border-radius: 15px;
            }
            
            .section-title {
                text-align: center;
                font-size: 2.5rem;
                margin-bottom: 3rem;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .featured-grid {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr;
                gap: 2rem;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
            }
            
            .featured-item {
                position: relative;
                border-radius: 15px;
                overflow: hidden;
                cursor: none;
                transition: all var(--transition-normal);
            }
            
            .featured-item:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 35px rgba(0,255,255,0.2);
            }
            
            .main-feature {
                grid-row: span 2;
            }
            
            .featured-video,
            .featured-image {
                width: 100%;
                height: 100%;
                position: relative;
            }
            
            .featured-video video,
            .featured-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .featured-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(
                    to bottom,
                    transparent 0%,
                    rgba(0,0,0,0.5) 70%,
                    rgba(0,0,0,0.9) 100%
                );
                display: flex;
                align-items: flex-end;
                padding: 2rem;
                color: white;
            }
            
            .featured-title {
                font-size: 2rem;
                font-weight: bold;
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            
            .featured-desc {
                font-size: 1rem;
                line-height: 1.6;
                margin-bottom: 1.5rem;
                opacity: 0.9;
            }
            
            .featured-btn {
                align-self: flex-start;
            }
            
            .gallery-section {
                margin: 5rem 0;
            }
            
            .gallery-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
                margin-top: 2rem;
            }
            
            .gallery-item {
                aspect-ratio: 1;
                border-radius: 10px;
                overflow: hidden;
                position: relative;
                cursor: none;
                transition: all var(--transition-normal);
            }
            
            .gallery-item:hover {
                transform: scale(1.05);
                z-index: 10;
            }
            
            .gallery-item img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform var(--transition-slow);
            }
            
            .gallery-item:hover img {
                transform: scale(1.1);
            }
            
            .interactive-section {
                margin: 5rem 0;
                text-align: center;
            }
            
            .vr-preview {
                background: radial-gradient(ellipse at center, rgba(255,255,0,0.1) 0%, transparent 70%);
                padding: 4rem 2rem;
                border-radius: 20px;
                border: 1px solid var(--border-color);
            }
            
            .vr-title {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .vr-desc {
                color: var(--text-secondary);
                font-size: 1.2rem;
                margin-bottom: 2rem;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .vr-btn {
                font-size: 1.2rem;
                padding: 1.5rem 3rem;
            }
            
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.95);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                backdrop-filter: blur(10px);
            }
            
            .video-modal.active {
                display: flex;
            }
            
            .video-modal-content {
                max-width: 90vw;
                max-height: 90vh;
                width: 1000px;
                background: var(--bg-secondary);
                border-radius: 15px;
                overflow: hidden;
                position: relative;
                border: 1px solid var(--border-color);
            }
            
            .video-modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(0,0,0,0.8);
                border: none;
                color: white;
                cursor: none;
                z-index: 2001;
                transition: all var(--transition-normal);
            }
            
            .video-modal-close:hover {
                background: var(--error-color);
                transform: scale(1.1);
            }
            
            .video-modal-player {
                aspect-ratio: 16/9;
                background: #000;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-secondary);
                font-size: 1.2rem;
            }
            
            .video-modal-info {
                padding: 2rem;
            }
            
            @media (max-width: 768px) {
                .video-grid {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }
                
                .featured-grid {
                    grid-template-columns: 1fr;
                    padding: 0 1rem;
                }
                
                .main-feature {
                    grid-row: span 1;
                }
                
                .gallery-grid {
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                }
                
                .lookbook-filters {
                    gap: 0.5rem;
                }
                
                .filter-btn {
                    padding: 0.5rem 1rem;
                    font-size: 0.8rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    bindEvents() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Modal close
        const modalClose = document.getElementById('video-modal-close');
        const modal = document.getElementById('video-modal');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeVideoModal());
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeVideoModal();
                }
            });
        }

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeVideoModal();
            }
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.renderVideos();
        
        // Track filter usage
        StorageManager.trackEvent('lookbook_filter', { filter });
    }

    renderVideos() {
        const grid = document.getElementById('video-grid');
        if (!grid) return;

        const filteredVideos = this.currentFilter === 'all' 
            ? this.videos 
            : this.videos.filter(video => video.category === this.currentFilter);

        grid.innerHTML = filteredVideos.map(video => this.renderVideoItem(video)).join('');

        // Add event listeners
        this.bindVideoEvents();

        // Add stagger animation
        document.querySelectorAll('.video-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('stagger-item');
        });
    }

    renderVideoItem(video) {
        return `
            <div class="video-item" data-video-id="${video.id}">
                <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail" loading="lazy">
                
                <div class="video-duration">${video.duration}</div>
                <div class="video-category">${video.category}</div>
                
                <button class="video-play-btn" data-video-id="${video.id}">
                    <i class="fas fa-play"></i>
                </button>
                
                <div class="video-overlay">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-description">${video.description}</p>
                    <div class="video-products">
                        ${video.products.map(product => `
                            <span class="product-tag">${product}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    bindVideoEvents() {
        // Video play buttons
        document.querySelectorAll('.video-play-btn, .video-item').forEach(element => {
            element.addEventListener('click', (e) => {
                e.stopPropagation();
                const videoId = element.dataset.videoId || element.querySelector('[data-video-id]')?.dataset.videoId;
                if (videoId) {
                    this.playVideo(videoId);
                }
            });
        });
    }

    playVideo(videoId) {
        const video = this.videos.find(v => v.id === videoId);
        if (!video) return;

        const modal = document.getElementById('video-modal');
        const player = document.getElementById('video-modal-player');
        const info = document.getElementById('video-modal-info');

        // Create video player placeholder (since we don't have actual videos)
        player.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary);">
                <i class="fas fa-play-circle" style="font-size: 4rem; margin-bottom: 1rem; color: var(--primary-color);"></i>
                <h3>Video Player</h3>
                <p>Playing: ${video.title}</p>
                <p style="opacity: 0.7; font-size: 0.9rem;">Video content would load here in production</p>
            </div>
        `;

        // Populate video info
        info.innerHTML = `
            <h2 style="color: var(--primary-color); margin-bottom: 1rem;">${video.title}</h2>
            <div style="color: var(--text-secondary); text-transform: uppercase; font-size: 0.9rem; margin-bottom: 1rem;">
                ${video.category} • ${video.duration}
            </div>
            <p style="line-height: 1.6; margin-bottom: 2rem;">${video.description}</p>
            
            <div style="margin-bottom: 2rem;">
                <h4 style="color: var(--primary-color); margin-bottom: 1rem;">Featured Products:</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${video.products.map(product => `
                        <span style="
                            background: var(--primary-color); 
                            color: var(--bg-color); 
                            padding: 0.5rem 1rem; 
                            border-radius: 15px; 
                            font-size: 0.8rem;
                            font-weight: bold;
                        ">${product}</span>
                    `).join('')}
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="window.location.hash = '#/shop'" class="glitch-btn">
                    Shop Featured Items
                </button>
                <button onclick="lookbookPage.shareVideo('${video.id}')" class="glitch-btn" style="background: var(--secondary-color);">
                    Share Video
                </button>
            </div>
        `;

        modal.classList.add('active');
        
        // Track video play
        StorageManager.trackEvent('video_play', { videoId, title: video.title });
    }

    closeVideoModal() {
        const modal = document.getElementById('video-modal');
        modal.classList.remove('active');
    }

    renderGallery() {
        const gallery = document.getElementById('gallery-grid');
        if (!gallery) return;

        const galleryImages = [
            'https://pixabay.com/get/ge3a2764662b4b592ba9dd5ca21cc510de1ac7729e4aa8226410f5f13196e847e4d00adcbc81f01ca9bbf3e7885271f474f63a9d133ce38801d6dda1f3c0e7116_1280.jpg',
            'https://pixabay.com/get/gc8e1c26ebaa8f6e7113272b059cdc875d0af3c4332ee8ce7e4fa0acd6110bd3a63f4ef7b1002afac96b07c65a811959854e1fe264e186213c5c9386e7c7713c8_1280.jpg',
            'https://pixabay.com/get/gaf1dd90343e702a9896c97929dbea75f75c0fbab07352137aca0fd03176168a1fbfd31389c43ba89d58c1984e83de4b1ae7dab8a170807c8201b9e07e17d6941_1280.jpg',
            'https://pixabay.com/get/gafe1aa79072b32afd5097e488051b89f57ab18598bc92721c35f93c1f958719620112af903d2b30f000788091073aeacc12b11eac3c12db5864c83d87615ba80_1280.jpg',
            'https://pixabay.com/get/gda91f42cf0eb8f2ebec1971ff62d858a774d9ef8affaed29127e4f9d2d7fe175fdb19d9bcefe745523fe84d7417c3d6b56b45137924c2277ce4f4c83557ff351_1280.jpg',
            'https://pixabay.com/get/g52c9d4ffd4e9b2227f784d27e7ad7f786ff55526e362880266a88bba5d78f4ec668f89451d5f66c1e9628bd3b00d8e2854be01952a297111a6b967ff4c51dd68_1280.jpg'
        ];

        gallery.innerHTML = galleryImages.map((image, index) => `
            <div class="gallery-item" onclick="lookbookPage.openGalleryImage(${index})">
                <img src="${image}" alt="Behind the scenes ${index + 1}" loading="lazy">
            </div>
        `).join('');
    }

    openGalleryImage(index) {
        // Could implement a full-screen gallery viewer here
        StorageManager.trackEvent('gallery_image_view', { index });
    }

    initParallax() {
        // Simple parallax effect for featured section
        window.addEventListener('scroll', () => {
            const featuredSection = document.querySelector('.featured-section');
            if (!featuredSection) return;

            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            featuredSection.style.transform = `translateY(${parallax}px)`;
        });
    }

    shareVideo(videoId) {
        const video = this.videos.find(v => v.id === videoId);
        if (!video) return;

        const shareText = `Check out this sick SEPHYX lookbook video: "${video.title}" 🔥\n\nThe future of streetwear is here ⚡`;
        
        if (navigator.share) {
            navigator.share({
                title: `SEPHYX - ${video.title}`,
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(shareText + '\n' + window.location.href)
                .then(() => {
                    window.sephyxApp.showNotification('Link copied to clipboard 📋', 'success');
                })
                .catch(() => {
                    window.sephyxApp.showNotification('Unable to copy link', 'error');
                });
        }
        
        StorageManager.trackEvent('video_share', { videoId, title: video.title });
    }

    launchVRExperience() {
        // Mock VR experience launch
        window.sephyxApp.showNotification('🥽 VR Experience launching... Put on your headset!', 'info');
        
        // Create immersive full-screen effect
        document.body.style.background = 'radial-gradient(circle, #ff00ff 0%, #00ffff 50%, #ffff00 100%)';
        document.body.style.animation = 'holographic 2s ease infinite';
        
        setTimeout(() => {
            document.body.style.background = '';
            document.body.style.animation = '';
            window.sephyxApp.showNotification('VR Experience demo completed ✨', 'success');
        }, 5000);
        
        StorageManager.trackEvent('vr_experience_launch');
        StorageManager.addLoyaltyPoints(25);
    }
}

// Export for global use
window.LookbookPage = LookbookPage;
