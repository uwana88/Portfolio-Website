// Fullscreen Slider Controller
class FullscreenSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.progressBar = document.querySelector('.progress-bar');
        this.currentSlideEl = document.querySelector('.current-slide');
        this.prevBtn = document.getElementById('prevSlide');
        this.nextBtn = document.getElementById('nextSlide');
        
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        this.progressInterval = null;
        this.slideDuration = 8000; // 8 seconds per slide
        this.isPlaying = true;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Set up event listeners
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === ' ') {
                e.preventDefault();
                this.toggleAutoPlay();
            }
        });
        
        // Touch/Swipe support
        this.initTouchSupport();
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause on hover
        const sliderHero = document.querySelector('.slider-hero');
        sliderHero?.addEventListener('mouseenter', () => this.pauseAutoPlay());
        sliderHero?.addEventListener('mouseleave', () => {
            if (this.isPlaying) this.startAutoPlay();
        });
    }
    
    goToSlide(index) {
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        // Update slide number
        this.updateSlideNumber();
        
        // Reset progress bar
        this.resetProgress();
        
        // Restart autoplay if active
        if (this.isPlaying) {
            this.startAutoPlay();
        }
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slideCount;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.goToSlide(prevIndex);
    }
    
    updateSlideNumber() {
        if (this.currentSlideEl) {
            const slideNum = (this.currentSlide + 1).toString().padStart(2, '0');
            this.currentSlideEl.textContent = slideNum;
        }
    }
    
    startAutoPlay() {
        this.clearIntervals();
        
        // Start progress animation
        this.animateProgress();
        
        // Auto advance slide
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideDuration);
    }
    
    pauseAutoPlay() {
        this.clearIntervals();
        if (this.progressBar) {
            this.progressBar.style.animationPlayState = 'paused';
        }
    }
    
    toggleAutoPlay() {
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
            this.startAutoPlay();
        } else {
            this.pauseAutoPlay();
        }
    }
    
    clearIntervals() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
    
    animateProgress() {
        if (!this.progressBar) return;
        
        // Reset and restart animation
        this.progressBar.style.animation = 'none';
        this.progressBar.offsetHeight; // Trigger reflow
        this.progressBar.style.animation = `progressFill ${this.slideDuration}ms linear`;
    }
    
    resetProgress() {
        if (this.progressBar) {
            this.progressBar.style.animation = 'none';
            this.progressBar.style.width = '0';
        }
    }
    
    initTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const sliderHero = document.querySelector('.slider-hero');
        
        sliderHero?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        sliderHero?.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                this.nextSlide();
            } else {
                // Swipe right - previous slide
                this.prevSlide();
            }
        }
    }
}

// Sound Toggle Controller
class SoundController {
    constructor() {
        this.soundToggle = document.getElementById('soundToggle');
        this.soundOn = document.querySelector('.sound-on');
        this.soundOff = document.querySelector('.sound-off');
        this.isMuted = true;
        
        this.init();
    }
    
    init() {
        if (!this.soundToggle) return;
        
        this.soundToggle.addEventListener('click', () => {
            this.toggleSound();
        });
    }
    
    toggleSound() {
        this.isMuted = !this.isMuted;
        
        if (this.isMuted) {
            this.soundOn.style.display = 'block';
            this.soundOff.style.display = 'none';
        } else {
            this.soundOn.style.display = 'none';
            this.soundOff.style.display = 'block';
        }
        
        // Add sound functionality here if needed
        this.updateAmbientSound();
    }
    
    updateAmbientSound() {
        // Placeholder for ambient sound control
        console.log('Sound:', this.isMuted ? 'Muted' : 'Unmuted');
    }
}

// Side Panel Controller
class SidePanel {
    constructor() {
        this.panel = document.querySelector('.side-panel');
        this.toggle = document.getElementById('panelToggle');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.toggle || !this.panel) return;
        
        this.toggle.addEventListener('click', () => {
            this.togglePanel();
        });
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closePanel();
            }
        });
    }
    
    togglePanel() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.panel.classList.add('open');
        } else {
            this.panel.classList.remove('open');
        }
    }
    
    closePanel() {
        this.isOpen = false;
        this.panel.classList.remove('open');
    }
}

// Parallax Mouse Effect
class ParallaxMouse {
    constructor() {
        this.elements = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }
    
    init() {
        // Define parallax elements
        const parallaxConfig = [
            { selector: '.slide-content', strength: 30 },
            { selector: '.hero-content-wrapper', strength: 20 },
            { selector: '.particles-container', strength: 50 }
        ];
        
        parallaxConfig.forEach(config => {
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
            
            this.updateParallax();
        });
    }
    
    updateParallax() {
        this.elements.forEach(item => {
            const x = this.mouseX * item.strength;
            const y = this.mouseY * item.strength;
            
            item.element.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
}

// Stats Counter Animation
class StatsAnimation {
    constructor() {
        this.stats = document.querySelectorAll('.stat-value');
        this.hasAnimated = false;
        
        this.init();
    }
    
    init() {
        // Animate when panel opens
        const panelToggle = document.getElementById('panelToggle');
        
        panelToggle?.addEventListener('click', () => {
            if (!this.hasAnimated) {
                setTimeout(() => {
                    this.animateStats();
                    this.hasAnimated = true;
                }, 300);
            }
        });
    }
    
    animateStats() {
        this.stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const suffix = stat.textContent.replace(/[0-9]/g, '');
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
                stat.textContent = Math.floor(current) + suffix;
            }, stepTime);
        });
    }
}

// Smooth Scroll
class SmoothScroll {
    constructor() {
        this.scrollIndicator = document.querySelector('.scroll-down');
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
            
            // Hide on scroll
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                const opacity = Math.max(0, 1 - (scrollY / 200));
                this.scrollIndicator.style.opacity = opacity;
            });
        }
    }
}

// Ambient Particles
class AmbientParticles {
    constructor() {
        this.container = document.querySelector('.particles-container');
        this.particleCount = 20;
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        // Create additional particles dynamically
        for (let i = 8; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            this.container.appendChild(particle);
        }
    }
}

// Page Visibility Handler
class VisibilityHandler {
    constructor(slider) {
        this.slider = slider;
        this.init();
    }
    
    init() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.slider.pauseAutoPlay();
            } else {
                if (this.slider.isPlaying) {
                    this.slider.startAutoPlay();
                }
            }
        });
    }
}

// Preloader for smooth transitions
class Preloader {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('load', () => {
            // Add loaded class for animations
            document.body.classList.add('loaded');
            
            // Animate initial elements
            this.animateHeroElements();
        });
    }
    
    animateHeroElements() {
        const elements = [
            '.slider-header',
            '.slide-number',
            '.hero-cta-section',
            '.slide-controls',
            '.scroll-down'
        ];
        
        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.8s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main slider
    const slider = new FullscreenSlider();
    
    // Initialize other modules
    new SoundController();
    new SidePanel();
    new ParallaxMouse();
    new StatsAnimation();
    new SmoothScroll();
    new AmbientParticles();
    new VisibilityHandler(slider);
    new Preloader();
    
    // Performance optimization
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    function updateAnimations() {
        // Update animations here
        ticking = false;
    }
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            requestTick();
        }, 100);
    }, { passive: true });
});