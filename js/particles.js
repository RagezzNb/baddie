class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.stars = [];
        this.animationId = null;
        this.isRunning = false;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }

    init() {
        this.createParticleCanvas();
        this.createStarfield();
        this.bindEvents();
        this.start();
    }

    createParticleCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }

    createStarfield() {
        const starCanvas = document.createElement('canvas');
        starCanvas.id = 'star-canvas';
        starCanvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2;
        `;
        
        document.body.appendChild(starCanvas);
        this.starCtx = starCanvas.getContext('2d');
        this.resizeStarCanvas();
        this.createStars();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    resizeStarCanvas() {
        const starCanvas = document.getElementById('star-canvas');
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.resizeStarCanvas();
            this.createStars();
        });

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.handleMouseMove(e);
        });

        document.addEventListener('click', (e) => {
            this.createBurst(e.clientX, e.clientY, 8);
        });
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: this.canvas.height + 10,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 3 - 1,
            size: Math.random() * 3 + 1,
            life: 1,
            decay: Math.random() * 0.02 + 0.005,
            color: this.getRandomColor(),
            trail: []
        };
    }

    createStars() {
        this.stars = [];
        const numStars = 200;
        
        for (let i = 0; i < numStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                phase: Math.random() * Math.PI * 2
            });
        }
        
        this.drawStars();
    }

    getRandomColor() {
        const colors = [
            'rgba(0, 255, 255, ',    // Cyan
            'rgba(255, 0, 255, ',    // Magenta
            'rgba(255, 255, 0, ',    // Yellow
            'rgba(255, 0, 64, ',     // Red-pink
            'rgba(0, 255, 128, '     // Green-cyan
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Add to trail
            particle.trail.push({ x: particle.x, y: particle.y });
            if (particle.trail.length > 10) {
                particle.trail.shift();
            }
            
            // Update life
            particle.life -= particle.decay;
            
            // Apply gravity and wind
            particle.vy += 0.02;
            particle.vx += (Math.random() - 0.5) * 0.1;
            
            // Remove dead particles
            if (particle.life <= 0 || particle.y < -10) {
                this.particles.splice(i, 1);
            }
        }
        
        // Add new particles occasionally
        if (Math.random() < 0.1 && this.particles.length < 100) {
            this.particles.push(this.createParticle());
        }
    }

    updateStars() {
        this.stars.forEach(star => {
            star.phase += star.twinkleSpeed;
            star.opacity = 0.2 + Math.sin(star.phase) * 0.6;
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            const alpha = particle.life;
            
            // Draw trail
            if (particle.trail.length > 1) {
                this.ctx.strokeStyle = particle.color + (alpha * 0.3) + ')';
                this.ctx.lineWidth = particle.size * 0.5;
                this.ctx.beginPath();
                this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
                
                for (let i = 1; i < particle.trail.length; i++) {
                    this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
                }
                this.ctx.stroke();
            }
            
            // Draw particle
            this.ctx.fillStyle = particle.color + alpha + ')';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow
            this.ctx.shadowColor = particle.color.replace('rgba', 'rgb').replace(', ', ')');
            this.ctx.shadowBlur = particle.size * 2;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }

    drawStars() {
        const starCanvas = document.getElementById('star-canvas');
        if (!starCanvas) return;
        
        this.starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        
        this.stars.forEach(star => {
            this.starCtx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            this.starCtx.beginPath();
            this.starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.starCtx.fill();
            
            // Add subtle glow
            if (star.opacity > 0.6) {
                this.starCtx.shadowColor = 'rgba(0, 255, 255, 0.5)';
                this.starCtx.shadowBlur = star.size * 2;
                this.starCtx.beginPath();
                this.starCtx.arc(star.x, star.y, star.size * 0.3, 0, Math.PI * 2);
                this.starCtx.fill();
                this.starCtx.shadowBlur = 0;
            }
        });
    }

    animate() {
        if (!this.isRunning) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.updateStars();
        this.drawParticles();
        this.drawStars();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.createParticles();
        this.animate();
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    handleMouseMove(e) {
        // Create particle at mouse position occasionally
        if (Math.random() < 0.1) {
            this.addParticleAtPosition(e.clientX, e.clientY);
        }
    }

    addParticleAtPosition(x, y) {
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            size: Math.random() * 2 + 1,
            life: 1,
            decay: Math.random() * 0.03 + 0.01,
            color: this.getRandomColor(),
            trail: []
        };
        
        this.particles.push(particle);
    }

    createBurst(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = Math.random() * 5 + 2;
            
            const particle = {
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 3 + 1,
                life: 1,
                decay: Math.random() * 0.02 + 0.01,
                color: this.getRandomColor(),
                trail: []
            };
            
            this.particles.push(particle);
        }
        
        // Play sound effect
        if (window.audioManager) {
            audioManager.playSound('whoosh');
        }
    }

    setQuality(level) {
        // Adjust particle count based on performance
        const maxParticles = level === 'high' ? 150 : level === 'medium' ? 100 : 50;
        while (this.particles.length > maxParticles) {
            this.particles.pop();
        }
    }

    destroy() {
        this.stop();
        if (this.canvas) {
            this.canvas.remove();
        }
        
        const starCanvas = document.getElementById('star-canvas');
        if (starCanvas) {
            starCanvas.remove();
        }
    }
}

// Initialize particle system
let particleSystem;
document.addEventListener('DOMContentLoaded', () => {
    particleSystem = new ParticleSystem();
    window.particleSystem = particleSystem;
});