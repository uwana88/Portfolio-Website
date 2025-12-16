// Liquid Canvas Animation
class LiquidCanvas {
    constructor() {
        this.canvas = document.getElementById('liquidCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.pointCount = 5;
        this.radius = 150;
        this.time = 0;
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Initialize points
        for (let i = 0; i < this.pointCount; i++) {
            this.points.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            });
        }
        
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    drawLiquid() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Create gradient
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
        gradient.addColorStop(0.5, 'rgba(118, 75, 162, 0.3)');
        gradient.addColorStop(1, 'rgba(240, 147, 251, 0.3)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.globalCompositeOperation = 'screen';
        
        // Draw liquid shapes
        this.points.forEach((point, index) => {
            this.ctx.beginPath();
            
            const x = point.x + Math.sin(this.time * 0.001 + index) * 50;
            const y = point.y + Math.cos(this.time * 0.001 + index) * 50;
            
            // Create organic shape
            for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
                const noise = Math.sin(angle * 3 + this.time * 0.002 + index) * 20;
                const px = x + Math.cos(angle) * (this.radius + noise);
                const py = y + Math.sin(angle) * (this.radius + noise);
                
                if (angle === 0) {
                    this.ctx.moveTo(px, py);
                } else {
                    this.ctx.lineTo(px, py);
                }
            }
            
            this.ctx.closePath();
            this.ctx.fill();
            
            // Update position
            point.x += point.vx;
            point.y += point.vy;
            
            // Bounce off edges
            if (point.x < 0 || point.x > this.canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > this.canvas.height) point.vy *= -1;
        });
    }
    
    animate() {
        this.time++;
        this.drawLiquid();
        requestAnimationFrame(() => this.animate());
    }
}

// Blob Morph Animation
class BlobMorph {
    constructor() {
        this.blobs = document.querySelectorAll('.blob-path');
        this.shapes = [];
        this.currentShape = 0;
        
        this.init();
    }
    
    init() {
        // Generate random blob shapes
        for (let i = 0; i < 4; i++) {
            this.shapes.push(this.generateBlobPath());
        }
        
        // Apply initial shapes
        this.blobs.forEach((blob, index) => {
            blob.setAttribute('d', this.shapes[0]);
            this.animateBlob(blob, index);
        });
    }
    
    generateBlobPath() {
        const points = 8;
        const angleStep = (Math.PI * 2) / points;
        const radius = 200;
        let path = 'M';
        
        for (let i = 0; i <= points; i++) {
            const angle = angleStep * i;
            const randomRadius = radius + (Math.random() - 0.5) * 100;
            const x = 250 + Math.cos(angle) * randomRadius;
            const y = 250 + Math.sin(angle) * randomRadius;
            
            if (i === 0) {
                path += ` ${x},${y}`;
            } else {
                const cp1x = 250 + Math.cos(angle - angleStep/2) * (randomRadius * 1.3);
                const cp1y = 250 + Math.sin(angle - angleStep/2) * (randomRadius * 1.3);
                path += ` Q${cp1x},${cp1y} ${x},${y}`;
            }
        }
        
        path += ' Z';
        return path;
    }
    
    animateBlob(blob, index) {
        setInterval(() => {
            const newShape = this.generateBlobPath();
            blob.style.transition = 'all 3s ease-in-out';
            blob.setAttribute('d', newShape);
        }, 3000 + (index * 1000));
    }
}

// Magnetic Cursor
class MagneticCursor {
    constructor() {
        this.inner = document.querySelector('.cursor-inner');
        this.outer = document.querySelector('.cursor-outer');
        this.mouseX = 0;
        this.mouseY = 0;
        this.innerX = 0;
        this.innerY = 0;
        this.outerX = 0;
        this.outerY = 0;
        
        this.init();
    }
    
    init() {
        if (window.innerWidth <= 768) return;
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        this.animate();
        this.setupMagneticEffect();
    }
    
    animate() {
        // Smooth follow animation
        this.innerX += (this.mouseX - this.innerX) * 0.5;
        this.innerY += (this.mouseY - this.innerY) * 0.5;
        
        this.outerX += (this.mouseX - this.outerX) * 0.1;
        this.outerY += (this.mouseY - this.outerY) * 0.1;
        
        if (this.inner) {
            this.inner.style.left = `${this.innerX}px`;
            this.inner.style.top = `${this.innerY}px`;
        }
        
        if (this.outer) {
            this.outer.style.left = `${this.outerX}px`;
            this.outer.style.top = `${this.outerY}px`;
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    setupMagneticEffect() {
        const magneticElements = document.querySelectorAll('button, a, .char');
        
        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                if (this.inner) {
                    this.inner.style.width = '20px';
                    this.inner.style.height = '20px';
                    this.inner.style.background = 'rgba(118, 75, 162, 0.8)';
                }
                
                if (this.outer) {
                    this.outer.style.width = '50px';
                    this.outer.style.height = '50px';
                }
                
                // Magnetic pull effect
                element.style.transform = `translate(${(this.mouseX - centerX) * 0.1}px, ${(this.mouseY - centerY) * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                if (this.inner) {
                    this.inner.style.width = '8px';
                    this.inner.style.height = '8px';
                    this.inner.style.background = '#667eea';
                }
                
                if (this.outer) {
                    this.outer.style.width = '30px';
                    this.outer.style.height = '30px';
                }
                
                element.style.transform = '';
            });
        });
    }
}

// Typography Animation
class TypographyAnimation {
    constructor() {
        this.chars = document.querySelectorAll('.char');
        this.init();
    }
    
    init() {
        // Initial animation
        this.chars.forEach((char, index) => {
            char.style.opacity = '0';
            char.style.transform = 'translateY(50px) rotateX(-90deg)';
            
            setTimeout(() => {
                char.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                char.style.opacity = '1';
                char.style.transform = 'translateY(0) rotateX(0)';
            }, index * 50);
        });
        
        // Hover liquid effect
        this.chars.forEach(char => {
            char.addEventListener('mouseenter', () => {
                char.style.animation = 'none';
                setTimeout(() => {
                    char.style.animation = 'charLiquid 0.6s ease';
                }, 10);
            });
        });
    }
}

// Dynamic Word Rotation
class WordRotator {
    constructor() {
        this.words = document.querySelectorAll('.dynamic-word');
        this.currentIndex = 0;
        this.init();
    }
    
    init() {
        if (this.words.length === 0) return;
        
        setInterval(() => {
            this.rotateWord();
        }, 3000);
    }
    
    rotateWord() {
        // Hide current word
        this.words[this.currentIndex].classList.remove('active');
        
        // Move to next word
        this.currentIndex = (this.currentIndex + 1) % this.words.length;
        
        // Show next word
        this.words[this.currentIndex].classList.add('active');
    }
}

// Menu Controller
class MenuController {
    constructor() {
        this.menuBtn = document.getElementById('menuBtn');
        this.menuOverlay = document.getElementById('menuOverlay');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.menuBtn || !this.menuOverlay) return;
        
        this.menuBtn.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
        
        // Close on link click
        const menuLinks = this.menuOverlay.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }
    
    toggleMenu() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.menuBtn.classList.add('active');
            this.menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            this.closeMenu();
        }
    }
    
    closeMenu() {
        this.menuBtn.classList.remove('active');
        this.menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
    }
}

// Metric Counter Animation
class MetricCounter {
    constructor() {
        this.metrics = document.querySelectorAll('.metric-number');
        this.hasAnimated = false;
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateMetrics();
                    this.hasAnimated = true;
                }
            });
        }, {
            threshold: 0.5
        });
        
        const metricsSection = document.querySelector('.liquid-metrics');
        if (metricsSection) {
            observer.observe(metricsSection);
        }
    }
    
    animateMetrics() {
        this.metrics.forEach(metric => {
            const target = parseInt(metric.getAttribute('data-value'));
            let current = 0;
            const increment = target / 50;
            const duration = 2000;
            const stepTime = duration / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                metric.textContent = Math.floor(current);
            }, stepTime);
        });
    }
}

// Liquid Button Effects
class LiquidButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.liquid-btn');
        this.init();
    }
    
    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.background = 'rgba(255, 255, 255, 0.5)';
                ripple.style.borderRadius = '50%';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.style.transform = 'translate(-50%, -50%)';
                ripple.style.animation = 'liquidRipple 0.6s ease-out';
                
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
}

// Play Button Animation
class PlayButton {
    constructor() {
        this.playBtn = document.getElementById('playBtn');
        this.init();
    }
    
    init() {
        if (!this.playBtn) return;
        
        this.playBtn.addEventListener('click', () => {
            // Add pulse animation
            this.playBtn.style.animation = 'pulse 0.6s ease';
            
            setTimeout(() => {
                this.playBtn.style.animation = '';
            }, 600);
            
            console.log('Play video');
        });
    }
}

// Scroll Effects
class ScrollEffects {
    constructor() {
        this.init();
    }
    
    init() {
        const scrollIndicator = document.querySelector('.liquid-scroll');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            });
        }
        
        // Parallax on scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Parallax for blobs
            const blobs = document.querySelectorAll('.blob');
            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 0.5;
                blob.style.transform = `translateY(${scrollY * speed}px)`;
            });
            
            // Fade scroll indicator
            if (scrollIndicator) {
                const opacity = Math.max(0, 1 - (scrollY / 300));
                scrollIndicator.style.opacity = opacity;
            }
        });
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new LiquidCanvas();
    new BlobMorph();
    new MagneticCursor();
    new TypographyAnimation();
    new WordRotator();
    new MenuController();
    new MetricCounter();
    new LiquidButtons();
    new PlayButton();
    new ScrollEffects();
    
    // Add dynamic styles for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes liquidRipple {
            to {
                width: 400px;
                height: 400px;
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    // Page load complete
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Press 'L' to toggle liquid effect
        if (e.key === 'l' || e.key === 'L') {
            const canvas = document.getElementById('liquidCanvas');
            if (canvas) {
                canvas.style.display = canvas.style.display === 'none' ? 'block' : 'none';
            }
        }
    });
});