class AudioManager {
    constructor() {
        this.audioContext = null;
        this.backgroundMusic = null;
        this.sounds = {};
        this.isPlaying = false;
        this.isMuted = localStorage.getItem('sephyx_audio_muted') === 'true';
        this.volume = parseFloat(localStorage.getItem('sephyx_volume')) || 0.3;
        this.init();
    }

    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            await this.loadSounds();
            this.updateUI();
        } catch (error) {
            console.log('Audio not supported');
        }
    }

    async loadSounds() {
        // Generate synthetic sounds using Web Audio API
        this.sounds = {
            click: this.createClickSound(),
            hover: this.createHoverSound(),
            notification: this.createNotificationSound(),
            glitch: this.createGlitchSound(),
            whoosh: this.createWhooshSound()
        };
        
        // Start background music
        this.startBackgroundMusic();
    }

    createClickSound() {
        return () => {
            if (this.isMuted || !this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.1);
        };
    }

    createHoverSound() {
        return () => {
            if (this.isMuted || !this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(this.volume * 0.15, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.05);
        };
    }

    createNotificationSound() {
        return () => {
            if (this.isMuted || !this.audioContext) return;
            
            const oscillator1 = this.audioContext.createOscillator();
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator1.connect(gainNode);
            oscillator2.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator1.frequency.setValueAtTime(660, this.audioContext.currentTime);
            oscillator2.frequency.setValueAtTime(880, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(this.volume * 0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
            
            oscillator1.start();
            oscillator2.start();
            oscillator1.stop(this.audioContext.currentTime + 0.3);
            oscillator2.stop(this.audioContext.currentTime + 0.3);
        };
    }

    createGlitchSound() {
        return () => {
            if (this.isMuted || !this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(2000, this.audioContext.currentTime + 0.1);
            oscillator.frequency.linearRampToValueAtTime(100, this.audioContext.currentTime + 0.2);
            
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(100, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(this.volume * 0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.2);
        };
    }

    createWhooshSound() {
        return () => {
            if (this.isMuted || !this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.4);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
            filter.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.4);
            
            gainNode.gain.setValueAtTime(this.volume * 0.25, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.4);
        };
    }

    startBackgroundMusic() {
        if (this.isMuted || !this.audioContext) return;
        
        const createAmbientLoop = () => {
            const oscillator1 = this.audioContext.createOscillator();
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator1.connect(filter);
            oscillator2.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator1.type = 'sine';
            oscillator1.frequency.setValueAtTime(55, this.audioContext.currentTime); // Low A
            oscillator2.type = 'sine';
            oscillator2.frequency.setValueAtTime(82.4, this.audioContext.currentTime); // Low E
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(400, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(this.volume * 0.1, this.audioContext.currentTime);
            
            oscillator1.start();
            oscillator2.start();
            oscillator1.stop(this.audioContext.currentTime + 8);
            oscillator2.stop(this.audioContext.currentTime + 8);
            
            setTimeout(() => {
                if (!this.isMuted && this.audioContext) {
                    createAmbientLoop();
                }
            }, 8000);
        };
        
        createAmbientLoop();
    }

    playSound(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('sephyx_audio_muted', this.isMuted.toString());
        this.updateUI();
        
        if (!this.isMuted && this.audioContext) {
            this.startBackgroundMusic();
        }
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        localStorage.setItem('sephyx_volume', this.volume.toString());
    }

    updateUI() {
        const audioBtn = document.getElementById('audio-toggle');
        if (audioBtn) {
            const icon = audioBtn.querySelector('i');
            if (icon) {
                icon.className = this.isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            }
        }
    }
}

// Initialize audio manager
let audioManager;
document.addEventListener('DOMContentLoaded', () => {
    audioManager = new AudioManager();
    window.audioManager = audioManager; // Make globally accessible
});