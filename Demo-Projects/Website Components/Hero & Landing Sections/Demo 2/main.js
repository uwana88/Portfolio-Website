// Particle Animation System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.resize();
        this.init();
        
        // Event listeners
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        // Create particles
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
    }
    
    update() {
        this.particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Mouse interaction - particles move away from cursor
            const dx = particle.x - this.mouseX;
            const dy = particle.y - this.mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.x += dx * force * 0.02;
                particle.y += dy * force * 0.02;
            }
            
            // Wrap particles around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Pulse effect
            particle.pulsePhase += particle.pulseSpeed;
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections between nearby particles
        this.particles.forEach((particle, i) => {
            // Draw particle
            const pulseFactor = Math.sin(particle.pulsePhase) * 0.3 + 0.7;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * pulseFactor})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Connect nearby particles
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.2;
                    this.ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            }
        });
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Number Counter Animation
class NumberCounter {
    constructor(element) {
        this.element = element;
        this.target = parseInt(element.getAttribute('data-count'));
        this.current = 0;
        this.increment = this.target / 100;
        this.isVisible = false;
    }
    
    start() {
        if (this.isVisible) return;
        this.isVisible = true;
        
        const updateCount = () => {
            this.current += this.increment;
            
            if (this.current < this.target) {
                this.element.textContent = Math.floor(this.current);
                requestAnimationFrame(updateCount);
            } else {
                this.element.textContent = this.target;
            }
        };
        
        updateCount();
    }
}

// Intersection Observer for scroll-triggered animations
class ScrollAnimations {
    constructor() {
        this.counters = [];
        this.init();
    }
    
    init() {
        // Initialize number counters
        document.querySelectorAll('.stat-number').forEach(element => {
            this.counters.push(new NumberCounter(element));
        });
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger counter animations
                    if (entry.target.classList.contains('hero-stats')) {
                        this.counters.forEach(counter => counter.start());
                    }
                    
                    // Add visible class for other animations
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe elements
        document.querySelectorAll('.hero-stats, .hero-visual, .floating-card').forEach(element => {
            observer.observe(element);
        });
    }
}

// Smooth Scroll Handler
class SmoothScrollHandler {
    constructor() {
        this.init();
    }
    
    init() {
        // Scroll indicator click
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            });
        }
        
        // Update scroll indicator visibility
        window.addEventListener('scroll', () => {
            if (scrollIndicator) {
                const opacity = Math.max(0, 1 - (window.scrollY / 300));
                scrollIndicator.style.opacity = opacity;
            }
        });
    }
}

// Button Ripple Effect
class RippleEffect {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.position = 'absolute';
                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.style.background = 'rgba(255, 255, 255, 0.4)';
                ripple.style.borderRadius = '50%';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'rippleExpand 0.6s ease-out';
                ripple.style.pointerEvents = 'none';
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
}

// Parallax Effect for Hero Elements
class ParallaxEffect {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        // Define parallax elements with different speeds
        const parallaxConfig = [
            { selector: '.shape-1', speed: 0.5 },
            { selector: '.shape-2', speed: 0.3 },
            { selector: '.shape-3', speed: 0.4 },
            { selector: '.shape-4', speed: 0.6 },
            { selector: '.shape-5', speed: 0.2 },
            { selector: '.hero-visual', speed: 0.1 },
            { selector: '.floating-card', speed: 0.15 }
        ];
        
        parallaxConfig.forEach(config => {
            const element = document.querySelector(config.selector);
            if (element) {
                this.elements.push({
                    element: element,
                    speed: config.speed,
                    offset: element.offsetTop
                });
            }
        });
        
        // Add scroll listener
        window.addEventListener('scroll', () => this.updateParallax());
    }
    
    updateParallax() {
        const scrollY = window.scrollY;
        
        this.elements.forEach(item => {
            const yPos = -(scrollY * item.speed);
            item.element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Text Typing Effect
class TypeWriter {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }
    
    start() {
        this.element.textContent = '';
        this.type();
    }
    
    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const particleSystem = new ParticleSystem(canvas);
        particleSystem.animate();
    }
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize smooth scroll
    new SmoothScrollHandler();
    
    // Initialize ripple effects
    new RippleEffect();
    
    // Initialize parallax
    new ParallaxEffect();
    
    // Add hover effects to floating cards
    document.querySelectorAll('.floating-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Add dynamic gradient animation to CTA button
    const primaryBtn = document.querySelector('.btn-primary');
    if (primaryBtn) {
        let gradientAngle = 0;
        setInterval(() => {
            gradientAngle = (gradientAngle + 1) % 360;
            primaryBtn.style.background = `linear-gradient(${gradientAngle}deg, #667eea 0%, #764ba2 100%)`;
        }, 50);
    }
    
    // Add glow effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const gradientOverlay = document.querySelector('.gradient-overlay');
            if (gradientOverlay) {
                gradientOverlay.style.background = `
                    radial-gradient(
                        circle at ${x * 100}% ${y * 100}%,
                        rgba(102, 126, 234, 0.3) 0%,
                        transparent 50%
                    )
                `;
            }
        }
    });
});

// Add ripple animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleExpand {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Add any additional scroll-based animations here
    const scrollY = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrollY < window.innerHeight) {
        const opacity = 1 - (scrollY / window.innerHeight);
        const scale = 1 - (scrollY / window.innerHeight) * 0.1;
        heroContent.style.opacity = opacity;
        heroContent.style.transform = `scale(${scale})`;
    }
}, 16));