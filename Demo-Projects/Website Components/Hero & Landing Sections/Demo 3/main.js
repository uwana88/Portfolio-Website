// Video Controller Class
class VideoController {
    constructor() {
        this.video = document.querySelector('.background-video');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.muteBtn = document.getElementById('muteBtn');
        this.playIcon = document.querySelector('.play-icon');
        this.pauseIcon = document.querySelector('.pause-icon');
        this.volumeIcon = document.querySelector('.volume-icon');
        this.muteIcon = document.querySelector('.mute-icon');
        
        this.init();
    }
    
    init() {
        if (!this.video) return;
        
        // Play/Pause functionality
        this.playPauseBtn?.addEventListener('click', () => {
            if (this.video.paused) {
                this.video.play();
                this.playIcon.style.display = 'none';
                this.pauseIcon.style.display = 'block';
            } else {
                this.video.pause();
                this.playIcon.style.display = 'block';
                this.pauseIcon.style.display = 'none';
            }
        });
        
        // Mute/Unmute functionality
        this.muteBtn?.addEventListener('click', () => {
            if (this.video.muted) {
                this.video.muted = false;
                this.volumeIcon.style.display = 'block';
                this.muteIcon.style.display = 'none';
            } else {
                this.video.muted = true;
                this.volumeIcon.style.display = 'none';
                this.muteIcon.style.display = 'block';
            }
        });
        
        // Auto-play handling
        this.video.play().catch(() => {
            // Auto-play was prevented, update UI
            this.playIcon.style.display = 'block';
            this.pauseIcon.style.display = 'none';
        });
    }
}

// Parallax Mouse Effect
class MouseParallax {
    constructor() {
        this.elements = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        
        this.init();
    }
    
    init() {
        // Define elements with parallax strength
        const parallaxElements = [
            { selector: '.card-project', strength: 20 },
            { selector: '.card-achievement', strength: 30 },
            { selector: '.card-review', strength: 25 },
            { selector: '.corner-decoration.top-left', strength: 10 },
            { selector: '.corner-decoration.bottom-right', strength: 10 },
            { selector: '.pattern-overlay', strength: 5 }
        ];
        
        parallaxElements.forEach(config => {
            const element = document.querySelector(config.selector);
            if (element) {
                this.elements.push({
                    element: element,
                    strength: config.strength
                });
            }
        });
        
        // Mouse move listener
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            this.mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
        });
        
        this.animate();
    }
    
    animate() {
        // Smooth animation
        this.targetX += (this.mouseX - this.targetX) * 0.1;
        this.targetY += (this.mouseY - this.targetY) * 0.1;
        
        this.elements.forEach(item => {
            const x = this.targetX * item.strength;
            const y = this.targetY * item.strength;
            
            item.element.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Text Animation on Scroll
class TextAnimator {
    constructor() {
        this.animatedElements = [];
        this.init();
    }
    
    init() {
        // Elements to animate
        const selectors = [
            '.heading-top',
            '.heading-bottom',
            '.hero-description',
            '.cta-container',
            '.quick-stats'
        ];
        
        selectors.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                this.animatedElements.push(element);
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
            }
        });
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe elements
        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Navigation Dots Controller
class NavigationDots {
    constructor() {
        this.dots = document.querySelectorAll('.nav-dot');
        this.currentIndex = 0;
        this.slides = [
            {
                title: 'Creative Digital Studio',
                description: 'We craft exceptional digital experiences'
            },
            {
                title: 'Innovation First',
                description: 'Pushing boundaries with cutting-edge technology'
            },
            {
                title: 'Design Excellence',
                description: 'Beautiful, functional, and user-centered design'
            },
            {
                title: 'Results Driven',
                description: 'Measurable outcomes for your business'
            }
        ];
        
        this.init();
    }
    
    init() {
        if (this.dots.length === 0) return;
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Auto-advance slides
        this.startAutoAdvance();
    }
    
    goToSlide(index) {
        // Remove active class from all dots
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to selected dot
        this.dots[index].classList.add('active');
        
        // Update content
        this.updateContent(index);
        
        this.currentIndex = index;
    }
    
    updateContent(index) {
        const slide = this.slides[index];
        const headingBottom = document.querySelector('.heading-bottom');
        const description = document.querySelector('.hero-description');
        
        if (headingBottom && description) {
            // Fade out
            headingBottom.style.transition = 'opacity 0.3s ease';
            description.style.transition = 'opacity 0.3s ease';
            headingBottom.style.opacity = '0';
            description.style.opacity = '0';
            
            setTimeout(() => {
                // Update text
                description.textContent = slide.description;
                
                // Fade in
                headingBottom.style.opacity = '1';
                description.style.opacity = '1';
            }, 300);
        }
    }
    
    startAutoAdvance() {
        setInterval(() => {
            const nextIndex = (this.currentIndex + 1) % this.dots.length;
            this.goToSlide(nextIndex);
        }, 5000);
    }
}

// Floating Cards Animation
class FloatingCards {
    constructor() {
        this.cards = document.querySelectorAll('.preview-card');
        this.init();
    }
    
    init() {
        this.cards.forEach((card, index) => {
            // Add hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05) translateY(-5px)';
                card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
            
            // Add click interaction
            card.addEventListener('click', () => {
                this.animateCardClick(card);
            });
        });
    }
    
    animateCardClick(card) {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'cardBounce 0.6s ease';
        }, 10);
    }
}

// Smooth Scroll Controller
class SmoothScroll {
    constructor() {
        this.scrollPrompt = document.querySelector('.scroll-prompt');
        this.init();
    }
    
    init() {
        if (this.scrollPrompt) {
            this.scrollPrompt.addEventListener('click', () => {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            });
            
            // Hide scroll prompt on scroll
            window.addEventListener('scroll', () => {
                const opacity = Math.max(0, 1 - (window.scrollY / 200));
                this.scrollPrompt.style.opacity = opacity;
                
                if (window.scrollY > 100) {
                    this.scrollPrompt.style.pointerEvents = 'none';
                } else {
                    this.scrollPrompt.style.pointerEvents = 'auto';
                }
            });
        }
    }
}

// Stats Counter Animation
class StatsCounter {
    constructor() {
        this.stats = document.querySelectorAll('.stat-value');
        this.hasAnimated = false;
        this.init();
    }
    
    init() {
        if (this.stats.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateStats();
                    this.hasAnimated = true;
                }
            });
        }, {
            threshold: 0.5
        });
        
        const statsContainer = document.querySelector('.quick-stats');
        if (statsContainer) {
            observer.observe(statsContainer);
        }
    }
    
    animateStats() {
        this.stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 30);
        });
    }
}

// Panel Hover Effect
class PanelEffect {
    constructor() {
        this.contentPanel = document.querySelector('.content-panel');
        this.videoPanel = document.querySelector('.video-panel');
        this.init();
    }
    
    init() {
        if (!this.contentPanel || !this.videoPanel) return;
        
        // Content panel hover
        this.contentPanel.addEventListener('mouseenter', () => {
            this.contentPanel.style.flex = '1.1';
            this.videoPanel.style.flex = '0.9';
        });
        
        // Video panel hover
        this.videoPanel.addEventListener('mouseenter', () => {
            this.videoPanel.style.flex = '1.1';
            this.contentPanel.style.flex = '0.9';
        });
        
        // Reset on mouse leave
        document.querySelector('.split-hero').addEventListener('mouseleave', () => {
            this.contentPanel.style.flex = '1';
            this.videoPanel.style.flex = '1';
        });
        
        // Add transition
        this.contentPanel.style.transition = 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        this.videoPanel.style.transition = 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new VideoController();
    new MouseParallax();
    new TextAnimator();
    new NavigationDots();
    new FloatingCards();
    new SmoothScroll();
    new StatsCounter();
    new PanelEffect();
    
    // Add dynamic styles for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cardBounce {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(0.95); }
            50% { transform: scale(1.05); }
            75% { transform: scale(0.98); }
        }
        
        .preview-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .panel-content * {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Add loading animation
    setTimeout(() => {
        document.querySelector('.split-hero').style.opacity = '1';
    }, 100);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        const video = document.querySelector('.background-video');
        if (!video) return;
        
        switch(e.key) {
            case ' ':
                e.preventDefault();
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
                break;
            case 'm':
            case 'M':
                video.muted = !video.muted;
                break;
        }
    });
});

// Performance optimization with RequestAnimationFrame
class AnimationLoop {
    constructor() {
        this.animations = [];
        this.isRunning = false;
    }
    
    add(callback) {
        this.animations.push(callback);
        if (!this.isRunning) {
            this.start();
        }
    }
    
    start() {
        this.isRunning = true;
        const loop = () => {
            this.animations.forEach(callback => callback());
            if (this.isRunning) {
                requestAnimationFrame(loop);
            }
        };
        requestAnimationFrame(loop);
    }
    
    stop() {
        this.isRunning = false;
    }
}

// Global animation loop instance
const animationLoop = new AnimationLoop();