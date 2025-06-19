// Custom Cursor with Glowing Star Trail
class CursorTrail {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.isActive = true;
        this.maxParticles = 20;
        
        this.init();
    }

    init() {
        this.createCanvas();
        this.bindEvents();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'cursor-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
        `;
        
        this.ctx = this.canvas.getContext('2d');
        document.getElementById('cursor-trail').appendChild(this.canvas);
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.addParticle();
        });

        document.addEventListener('mouseenter', () => {
            this.isActive = true;
        });

        document.addEventListener('mouseleave', () => {
            this.isActive = false;
        });

        // Add click effect
        document.addEventListener('click', (e) => {
            this.createClickEffect(e.clientX, e.clientY);
        });

        // Hide cursor on touch devices
        document.addEventListener('touchstart', () => {
            this.isActive = false;
        });
    }

    addParticle() {
        if (!this.isActive) return;

        const particle = {
            x: this.mouse.x,
            y: this.mouse.y,
            size: Math.random() * 3 + 2,
            life: 1,
            decay: Math.random() * 0.02 + 0.01,
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            color: this.getRandomColor(),
            glow: Math.random() * 10 + 5
        };

        this.particles.push(particle);

        // Limit particles
        if (this.particles.length > this.maxParticles) {
            this.particles.shift();
        }
    }

    createClickEffect(x, y) {
        // Create burst of particles on click
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            const velocity = 3;
            
            const particle = {
                x: x,
                y: y,
                size: Math.random() * 4 + 3,
                life: 1,
                decay: 0.02,
                velocity: {
                    x: Math.cos(angle) * velocity,
                    y: Math.sin(angle) * velocity
                },
                color: '#00ffff',
                glow: 15,
                isClickParticle: true
            };

            this.particles.push(particle);
        }
    }

    getRandomColor() {
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff80'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    updateParticles() {
        this.particles = this.particles.filter(particle => {
            // Update position
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            
            // Update life
            particle.life -= particle.decay;
            
            // Apply friction
            particle.velocity.x *= 0.99;
            particle.velocity.y *= 0.99;
            
            // Shrink size over time
            particle.size *= 0.98;
            
            return particle.life > 0 && particle.size > 0.1;
        });
    }

    drawParticles() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            const alpha = particle.life;
            
            // Draw glow
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.glow, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = alpha * 0.1;
            this.ctx.fill();
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = alpha * 0.8;
            this.ctx.fill();
            
            // Draw inner core
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.globalAlpha = alpha;
            this.ctx.fill();
        });
        
        this.ctx.globalAlpha = 1;
    }

    drawCursor() {
        if (!this.isActive || !this.ctx) return;
        
        // Draw main cursor
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 8, 0, Math.PI * 2);
        this.ctx.strokeStyle = '#00ffff';
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = 0.8;
        this.ctx.stroke();
        
        // Draw inner dot
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 2, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.globalAlpha = 1;
        this.ctx.fill();
        
        // Draw crosshair
        this.ctx.beginPath();
        this.ctx.moveTo(this.mouse.x - 15, this.mouse.y);
        this.ctx.lineTo(this.mouse.x + 15, this.mouse.y);
        this.ctx.moveTo(this.mouse.x, this.mouse.y - 15);
        this.ctx.lineTo(this.mouse.x, this.mouse.y + 15);
        this.ctx.strokeStyle = '#00ffff';
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0.4;
        this.ctx.stroke();
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        this.drawCursor();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    // Hover effects for interactive elements
    addHoverEffect(element) {
        element.addEventListener('mouseenter', () => {
            this.maxParticles = 30;
            this.particles.forEach(particle => {
                particle.glow *= 1.5;
                particle.size *= 1.2;
            });
        });

        element.addEventListener('mouseleave', () => {
            this.maxParticles = 20;
        });
    }

    // Special effects
    createStarBurst(x, y) {
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            const distance = Math.random() * 50 + 20;
            
            const particle = {
                x: x,
                y: y,
                size: Math.random() * 2 + 1,
                life: 1,
                decay: 0.015,
                velocity: {
                    x: Math.cos(angle) * (distance / 10),
                    y: Math.sin(angle) * (distance / 10)
                },
                color: '#ffff00',
                glow: 20,
                isSpecial: true
            };

            this.particles.push(particle);
        }
    }

    // Performance optimization
    setQuality(level) {
        switch (level) {
            case 'low':
                this.maxParticles = 10;
                break;
            case 'medium':
                this.maxParticles = 20;
                break;
            case 'high':
                this.maxParticles = 30;
                break;
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.canvas) {
            this.canvas.remove();
        }
        
        this.particles = [];
    }
}

// Auto-initialize hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('button, a, input, .cart-btn, .nav-link');
    
    setTimeout(() => {
        if (window.cursorTrail) {
            interactiveElements.forEach(element => {
                window.cursorTrail.addHoverEffect(element);
            });
        }
    }, 1000);
});

// Export for global use
window.CursorTrail = CursorTrail;
