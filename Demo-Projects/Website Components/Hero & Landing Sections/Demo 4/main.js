// SVG Morph Animation
class MorphAnimation {
    constructor() {
        this.paths = document.querySelectorAll('.morph-path');
        this.shapes = [
            'M0,100 C200,50 400,150 600,100 L600,0 L0,0 Z',
            'M0,150 C150,100 350,200 600,150 L600,0 L0,0 Z',
            'M0,120 C250,80 450,180 600,120 L600,0 L0,0 Z',
            'M0,180 C180,120 380,220 600,180 L600,0 L0,0 Z'
        ];
        this.init();
    }
    
    init() {
        this.paths.forEach((path, index) => {
            this.animatePath(path, index);
        });
    }
    
    animatePath(path, index) {
        let shapeIndex = 0;
        
        const animate = () => {
            path.setAttribute('d', this.shapes[shapeIndex]);
            shapeIndex = (shapeIndex + 1) % this.shapes.length;
        };
        
        // Initial shape
        path.setAttribute('d', this.shapes[0]);
        
        // Animate every 5 seconds with offset
        setInterval(animate, 5000 + (index * 1000));
    }
}

// Custom Cursor
class CustomCursor {
    constructor() {
        this.dot = document.querySelector('.cursor-dot');
        this.outline = document.querySelector('.cursor-outline');
        this.cursorX = 0;
        this.cursorY = 0;
        this.outlineX = 0;
        this.outlineY = 0;
        this.isHovering = false;
        
        this.init();
    }
    
    init() {
        // Check if not mobile
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                this.cursorX = e.clientX;
                this.cursorY = e.clientY;
                
                if (this.dot) {
                    this.dot.style.left = `${this.cursorX}px`;
                    this.dot.style.top = `${this.cursorY}px`;
                }
            });
            
            this.animateOutline();
            this.setupHoverEffects();
        }
    }
    
    animateOutline() {
        const animate = () => {
            this.outlineX += (this.cursorX - this.outlineX) * 0.1;
            this.outlineY += (this.cursorY - this.outlineY) * 0.1;
            
            if (this.outline) {
                this.outline.style.left = `${this.outlineX}px`;
                this.outline.style.top = `${this.outlineY}px`;
            }
            
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    setupHoverEffects() {
        // Interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .info-card, .scroll-indicator, .social-icon'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.isHovering = true;
                if (this.outline) {
                    this.outline.style.width = '50px';
                    this.outline.style.height = '50px';
                    this.outline.style.borderColor = '#667eea';
                    this.outline.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                }
                if (this.dot) {
                    this.dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                this.isHovering = false;
                if (this.outline) {
                    this.outline.style.width = '30px';
                    this.outline.style.height = '30px';
                    this.outline.style.borderColor = '#667eea';
                    this.outline.style.backgroundColor = 'transparent';
                }
                if (this.dot) {
                    this.dot.style.transform = 'translate(-50%, -50%) scale(1)';
                }
            });
        });
    }
}

// Letter Animation on Hover
class LetterAnimation {
    constructor() {
        this.titleWords = document.querySelectorAll('.title-word');
        this.init();
    }
    
    init() {
        this.titleWords.forEach(word => {
            const letters = word.querySelectorAll('.letter');
            
            word.addEventListener('mouseenter', () => {
                letters.forEach((letter, index) => {
                    setTimeout(() => {
                        letter.style.animation = 'letterWave 0.4s ease';
                        
                        setTimeout(() => {
                            letter.style.animation = '';
                        }, 400);
                    }, index * 50);
                });
            });
        });
    }
}

// Mobile Menu Controller
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('menuToggle');
        this.menu = document.getElementById('mobileMenu');
        this.menuLinks = document.querySelectorAll('.mobile-nav-link');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.toggle || !this.menu) return;
        
        this.toggle.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        this.menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.menu.classList.add('active');
            this.toggle.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate menu items
            this.menuLinks.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateX(-30px)';
                
                setTimeout(() => {
                    link.style.transition = 'all 0.4s ease';
                    link.style.opacity = '1';
                    link.style.transform = 'translateX(0)';
                }, 100 + (index * 50));
            });
        } else {
            this.closeMenu();
        }
    }
    
    closeMenu() {
        this.menu.classList.remove('active');
        this.toggle.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
    }
}

// Smooth Scroll
class SmoothScroll {
    constructor() {
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.init();
    }
    
    init() {
        if (this.scrollIndicator) {
            this.scrollIndicator.addEventListener('click', () => {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            });
        }
        
        // Update on scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            if (this.scrollIndicator) {
                const opacity = Math.max(0, 1 - (scrollY / 300));
                this.scrollIndicator.style.opacity = opacity;
            }
        });
    }
}

// Parallax Scroll Effect
class ParallaxScroll {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        // Define parallax elements
        const parallaxConfig = [
            { selector: '.orb-1', speed: 0.5 },
            { selector: '.orb-2', speed: 0.3 },
            { selector: '.orb-3', speed: 0.4 },
            { selector: '.orb-4', speed: 0.2 },
            { selector: '.info-card', speed: 0.1 }
        ];
        
        parallaxConfig.forEach(config => {
            const elements = document.querySelectorAll(config.selector);
            elements.forEach(element => {
                this.elements.push({
                    element: element,
                    speed: config.speed,
                    offset: element.offsetTop
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

// Text Reveal on Scroll
class TextReveal {
    constructor() {
        this.init();
    }
    
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Animate letters if it's a title
                    if (entry.target.classList.contains('hero-title')) {
                        const letters = entry.target.querySelectorAll('.letter');
                        letters.forEach((letter, index) => {
                            setTimeout(() => {
                                letter.style.animation = 'letterFadeIn 0.6s ease-out forwards';
                            }, index * 30);
                        });
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements
        const elementsToReveal = document.querySelectorAll(
            '.hero-title, .hero-subtitle, .minimal-cta-group, .info-card'
        );
        
        elementsToReveal.forEach(element => {
            observer.observe(element);
        });
    }
}

// Interactive Info Cards
class InfoCards {
    constructor() {
        this.cards = document.querySelectorAll('.info-card');
        this.init();
    }
    
    init() {
        this.cards.forEach((card, index) => {
            // Add magnetic effect on hover
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateY(${deltaX * 5}deg)
                    rotateX(${-deltaY * 5}deg)
                    translateZ(10px)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
            
            // Click animation
            card.addEventListener('click', () => {
                card.style.animation = 'cardPulse 0.6s ease';
                setTimeout(() => {
                    card.style.animation = '';
                }, 600);
            });
        });
    }
}

// Dynamic Background Gradient
class DynamicBackground {
    constructor() {
        this.hero = document.querySelector('.minimal-hero');
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }
    
    init() {
        if (!this.hero) return;
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX / window.innerWidth;
            this.mouseY = e.clientY / window.innerHeight;
            
            const gradientX = 50 + (this.mouseX - 0.5) * 20;
            const gradientY = 50 + (this.mouseY - 0.5) * 20;
            
            this.hero.style.background = `
                radial-gradient(
                    circle at ${gradientX}% ${gradientY}%,
                    #ffffff 0%,
                    #f8f8f8 100%
                )
            `;
        });
    }
}

// Type Writer Effect for Status
class TypeWriter {
    constructor() {
        this.statusText = document.querySelector('.status-text');
        this.messages = [
            'Open to opportunities',
            'Available for projects',
            'Let\'s collaborate',
            'Ready to create'
        ];
        this.currentIndex = 0;
        this.init();
    }
    
    init() {
        if (!this.statusText) return;
        
        setInterval(() => {
            this.changeText();
        }, 3000);
    }
    
    changeText() {
        this.statusText.style.opacity = '0';
        
        setTimeout(() => {
            this.currentIndex = (this.currentIndex + 1) % this.messages.length;
            this.statusText.textContent = this.messages[this.currentIndex];
            this.statusText.style.opacity = '1';
        }, 300);
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new MorphAnimation();
    new CustomCursor();
    new LetterAnimation();
    new MobileMenu();
    new SmoothScroll();
    new ParallaxScroll();
    new TextReveal();
    new InfoCards();
    new DynamicBackground();
    new TypeWriter();
    
    // Add dynamic styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes letterWave {
            0%, 100% { 
                transform: translateY(0) rotate(0deg) scale(1);
                color: inherit;
            }
            50% { 
                transform: translateY(-10px) rotate(-5deg) scale(1.1);
                color: #667eea;
            }
        }
        
        @keyframes cardPulse {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(0.98); }
            50% { transform: scale(1.02); }
            75% { transform: scale(0.99); }
        }
        
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Press 'G' to toggle grid overlay (for design)
        if (e.key === 'g' || e.key === 'G') {
            document.body.classList.toggle('show-grid');
        }
    });
    
    // Performance monitoring
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
        }
    });
    
    perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
});

// Utility function for smooth value interpolation
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}