// 3D Tilt Effect Controller
class TiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('[data-tilt]');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            this.initCard(card);
        });
    }
    
    initCard(card) {
        let bounds;
        
        // Mouse enter - get card bounds
        card.addEventListener('mouseenter', () => {
            bounds = card.getBoundingClientRect();
            card.style.transition = 'none';
        });
        
        // Mouse move - apply tilt
        card.addEventListener('mousemove', (e) => {
            if (!bounds) return;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.x;
            const topY = mouseY - bounds.y;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2
            };
            
            // Calculate rotation
            const rotateX = (center.y / (bounds.height / 2)) * -10; // Vertical tilt
            const rotateY = (center.x / (bounds.width / 2)) * 10; // Horizontal tilt
            
            // Apply transform
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(10px)
                scale(1.02)
            `;
            
            // Move glow effect
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `
                    radial-gradient(
                        circle at ${leftX}px ${topY}px,
                        rgba(99, 102, 241, 0.3),
                        transparent 50%
                    )
                `;
            }
        });
        
        // Mouse leave - reset
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
            
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = '';
            }
        });
    }
}

// Custom 3D Cursor
class Cursor3D {
    constructor() {
        this.cursor = document.querySelector('.cursor-3d');
        this.ball = document.querySelector('.cursor-ball');
        this.trail = document.querySelector('.cursor-trail');
        this.mouseX = 0;
        this.mouseY = 0;
        this.ballX = 0;
        this.ballY = 0;
        this.trailX = 0;
        this.trailY = 0;
        
        this.init();
    }
    
    init() {
        // Check if not mobile
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            });
            
            this.animate();
            this.setupHoverEffects();
        }
    }
    
    animate() {
        // Smooth follow animation
        const ease = 0.15;
        
        // Ball follows immediately
        this.ballX += (this.mouseX - this.ballX) * ease * 2;
        this.ballY += (this.mouseY - this.ballY) * ease * 2;
        
        // Trail follows slowly
        this.trailX += (this.mouseX - this.trailX) * ease;
        this.trailY += (this.mouseY - this.trailY) * ease;
        
        if (this.ball) {
            this.ball.style.left = `${this.ballX}px`;
            this.ball.style.top = `${this.ballY}px`;
        }
        
        if (this.trail) {
            this.trail.style.left = `${this.trailX}px`;
            this.trail.style.top = `${this.trailY}px`;
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    setupHoverEffects() {
        // Interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .card-3d, .nav-link, .btn-3d'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (this.ball) {
                    this.ball.style.transform = 'translate(-50%, -50%) scale(2)';
                    this.ball.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.5), rgba(139, 92, 246, 0.5))';
                }
                if (this.trail) {
                    this.trail.style.width = '60px';
                    this.trail.style.height = '60px';
                    this.trail.style.borderColor = 'rgba(99, 102, 241, 0.8)';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                if (this.ball) {
                    this.ball.style.transform = 'translate(-50%, -50%) scale(1)';
                    this.ball.style.background = '';
                }
                if (this.trail) {
                    this.trail.style.width = '40px';
                    this.trail.style.height = '40px';
                    this.trail.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                }
            });
        });
    }
}

// Theme Toggle Controller
class ThemeToggle {
    constructor() {
        this.toggle = document.getElementById('themeToggle');
        this.isDark = true;
        
        this.init();
    }
    
    init() {
        if (!this.toggle) return;
        
        this.toggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Check for saved preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.isDark = savedTheme === 'dark';
            this.applyTheme();
        }
    }
    
    toggleTheme() {
        this.isDark = !this.isDark;
        this.applyTheme();
        
        // Save preference
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    }
    
    applyTheme() {
        if (this.isDark) {
            document.body.classList.remove('light-theme');
            this.toggle.classList.remove('light');
        } else {
            document.body.classList.add('light-theme');
            this.toggle.classList.add('light');
        }
        
        // Animate toggle thumb
        this.toggle.classList.toggle('dark', this.isDark);
    }
}

// Parallax Scroll Effect
class ParallaxEffect {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        // Define parallax elements
        const parallaxConfig = [
            { selector: '.float-element', speed: 0.5 },
            { selector: '.grid-lines', speed: 0.2 },
            { selector: '.hero-title-3d', speed: 0.1 },
            { selector: '.card-3d', speed: 0.15 }
        ];
        
        parallaxConfig.forEach(config => {
            const elements = document.querySelectorAll(config.selector);
            elements.forEach(element => {
                this.elements.push({
                    element: element,
                    speed: config.speed,
                    offset: element.getBoundingClientRect().top + window.scrollY
                });
            });
        });
        
        // Throttled scroll event
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    updateParallax() {
        const scrollY = window.scrollY;
        
        this.elements.forEach(item => {
            const yPos = -(scrollY * item.speed);
            item.element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Card Interaction Effects
class CardInteractions {
    constructor() {
        this.cards = document.querySelectorAll('.card-3d');
        this.init();
    }
    
    init() {
        this.cards.forEach((card, index) => {
            // Add staggered entrance animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
            
            // Click to flip
            card.addEventListener('click', (e) => {
                // Don't flip if clicking a link or button
                if (e.target.closest('a, button')) return;
                
                const inner = card.querySelector('.card-inner');
                if (inner) {
                    const isFlipped = inner.style.transform === 'rotateY(180deg)';
                    inner.style.transform = isFlipped ? 'rotateY(0)' : 'rotateY(180deg)';
                }
            });
            
            // Magnetic effect on hover
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                // Subtle magnetic pull
                const translateX = deltaX * 5;
                const translateY = deltaY * 5;
                
                card.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}

// Animated Counter
class AnimatedCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-value, .price-amount');
        this.hasAnimated = false;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                }
            });
        }, {
            threshold: 0.5
        });
        
        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const suffix = counter.textContent.replace(/[0-9]/g, '');
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
                counter.textContent = Math.floor(current) + suffix;
            }, stepTime);
        });
    }
}

// Testimonial Rotator
class TestimonialRotator {
    constructor() {
        this.testimonial = document.querySelector('.testimonial-3d');
        this.testimonials = [
            {
                text: "The 3D interactions completely transformed our user experience",
                name: "Alex Chen",
                role: "CEO, TechCorp"
            },
            {
                text: "Incredible attention to detail and smooth animations throughout",
                name: "Sarah Johnson",
                role: "Designer, Creative Studio"
            },
            {
                text: "Performance and aesthetics perfectly balanced",
                name: "Mike Williams",
                role: "Developer, StartupXYZ"
            }
        ];
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        if (!this.testimonial) return;
        
        // Auto-rotate testimonials
        setInterval(() => {
            this.nextTestimonial();
        }, 5000);
    }
    
    nextTestimonial() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        const current = this.testimonials[this.currentIndex];
        
        const textEl = this.testimonial.querySelector('.testimonial-text');
        const nameEl = this.testimonial.querySelector('.author-name');
        const roleEl = this.testimonial.querySelector('.author-role');
        
        // Fade out
        this.testimonial.style.opacity = '0';
        
        setTimeout(() => {
            // Update content
            if (textEl) textEl.textContent = `"${current.text}"`;
            if (nameEl) nameEl.textContent = current.name;
            if (roleEl) roleEl.textContent = current.role;
            
            // Fade in
            this.testimonial.style.opacity = '1';
        }, 300);
    }
}

// Smooth Scroll
class SmoothScroll {
    constructor() {
        this.mouseIndicator = document.querySelector('.mouse-3d');
        this.init();
    }
    
    init() {
        if (this.mouseIndicator) {
            this.mouseIndicator.addEventListener('click', () => {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            });
        }
        
        // Update on scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            if (this.mouseIndicator) {
                const opacity = Math.max(0, 1 - (scrollY / 300));
                this.mouseIndicator.style.opacity = opacity;
            }
        });
    }
}

// Floating Elements Animation
class FloatingElements {
    constructor() {
        this.elements = document.querySelectorAll('.float-element');
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }
    
    init() {
        // Mouse tracking
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            this.updateElements();
        });
    }
    
    updateElements() {
        this.elements.forEach((element, index) => {
            const speed = (index + 1) * 10;
            const x = this.mouseX * speed;
            const y = this.mouseY * speed;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Monitor FPS
        let lastTime = performance.now();
        let frames = 0;
        
        const measureFPS = () => {
            frames++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                
                // Log performance issues
                if (fps < 30) {
                    console.warn('Low FPS detected:', fps);
                }
                
                frames = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        // Start monitoring
        requestAnimationFrame(measureFPS);
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new TiltEffect();
    new Cursor3D();
    new ThemeToggle();
    new ParallaxEffect();
    new CardInteractions();
    new AnimatedCounter();
    new TestimonialRotator();
    new SmoothScroll();
    new FloatingElements();
    new PerformanceMonitor();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Press 'D' to toggle debug mode
        if (e.key === 'd' || e.key === 'D') {
            document.body.classList.toggle('debug-mode');
        }
        
        // Press 'T' to toggle theme
        if (e.key === 't' || e.key === 'T') {
            document.getElementById('themeToggle')?.click();
        }
    });
    
    // Prevent context menu on cards
    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    });
});