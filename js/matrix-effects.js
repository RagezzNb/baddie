class MatrixEffects {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-={}[]|;':\",./<>?`~";
        this.drops = [];
        this.fontSize = 14;
        this.animationId = null;
        this.isRunning = false;
        
        this.init();
    }

    init() {
        this.createMatrixCanvas();
        this.setupDrops();
        this.start();
    }

    createMatrixCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'matrix-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -3;
            opacity: 0.1;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Reset drops for new dimensions
        this.setupDrops();
    }

    setupDrops() {
        const columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        
        for (let i = 0; i < columns; i++) {
            this.drops[i] = {
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 3 + 1,
                char: this.getRandomChar(),
                opacity: Math.random() * 0.8 + 0.2
            };
        }
    }

    getRandomChar() {
        return this.chars.charAt(Math.floor(Math.random() * this.chars.length));
    }

    draw() {
        // Create fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set text properties
        this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;
        this.ctx.textAlign = 'center';
        
        // Draw characters
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            const x = i * this.fontSize;
            
            // Gradient color based on position
            const alpha = Math.max(0.1, drop.opacity - (drop.y / this.canvas.height) * 0.8);
            this.ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
            
            this.ctx.fillText(drop.char, x, drop.y);
            
            // Update drop
            drop.y += drop.speed;
            
            // Reset when off screen or randomly
            if (drop.y > this.canvas.height || Math.random() < 0.005) {
                drop.y = -this.fontSize;
                drop.speed = Math.random() * 3 + 1;
                drop.char = this.getRandomChar();
                drop.opacity = Math.random() * 0.8 + 0.2;
            }
            
            // Randomly change character
            if (Math.random() < 0.02) {
                drop.char = this.getRandomChar();
            }
        }
    }

    animate() {
        if (!this.isRunning) return;
        
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    setIntensity(level) {
        // Adjust opacity based on intensity
        const opacity = level === 'high' ? 0.2 : level === 'medium' ? 0.1 : 0.05;
        this.canvas.style.opacity = opacity;
    }

    destroy() {
        this.stop();
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}

// Initialize matrix effects
let matrixEffects;
document.addEventListener('DOMContentLoaded', () => {
    matrixEffects = new MatrixEffects();
    window.matrixEffects = matrixEffects;
});