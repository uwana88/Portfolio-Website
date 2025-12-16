// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // =====================
    // NAVIGATION FUNCTIONALITY
    // =====================

    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        // Animate hamburger menu
        const spans = mobileMenu.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (mobileMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translateY(6px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    }

    // Smooth scrolling for navigation links
    function handleSmoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        }
    }

    // Event listeners for navigation
    window.addEventListener('scroll', handleNavbarScroll);
    if (mobileMenu) mobileMenu.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // =====================
    // CREATIVE HERO ANIMATIONS
    // =====================

    // Title word interactions
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach(word => {
        word.addEventListener('mouseenter', function () {
            // Create sparkle effect
            createSparkles(this);

            // Add random color shift
            const colors = [
                'var(--electric-purple)',
                'var(--electric-pink)',
                'var(--electric-blue)',
                'var(--electric-orange)',
                'var(--electric-green)'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.textShadow = `0 0 30px ${randomColor}`;
        });

        word.addEventListener('mouseleave', function () {
            this.style.textShadow = '';
        });

        word.addEventListener('click', function () {
            // Trigger word explosion animation
            explodeWord(this);
        });
    });

    function createSparkles(element) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--electric-yellow);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: sparkleFloat 1s ease-out forwards;
            `;

            const rect = element.getBoundingClientRect();
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';

            document.body.appendChild(sparkle);

            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }
    }

    function explodeWord(element) {
        const originalText = element.textContent;
        const letters = originalText.split('');
        element.innerHTML = '';

        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.cssText = `
                display: inline-block;
                animation: letterExplode 0.8s ease-out forwards;
                animation-delay: ${index * 0.05}s;
            `;
            element.appendChild(span);
        });

        setTimeout(() => {
            element.textContent = originalText;
        }, 1200);
    }

    // =====================
    // PORTFOLIO FILTERING
    // =====================

    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    function filterPortfolio(category) {
        portfolioItems.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');

            if (category === 'all' || itemCategory === category) {
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                }, index * 100);
            } else {
                item.classList.add('hidden');
                item.classList.remove('visible');
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio
            const category = this.getAttribute('data-filter');
            filterPortfolio(category);

            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // =====================
    // DYNAMIC FLOATING SHAPES
    // =====================

    function animateFloatingShapes() {
        const shapes = document.querySelectorAll('.floating-shape');

        shapes.forEach((shape, index) => {
            // Add mouse interaction
            shape.addEventListener('mouseenter', function () {
                this.style.transform = 'scale(1.2)';
                this.style.filter = 'blur(0px)';
            });

            shape.addEventListener('mouseleave', function () {
                this.style.transform = 'scale(1)';
                this.style.filter = '';
            });

            // Add click interaction
            shape.addEventListener('click', function () {
                const colors = [
                    'var(--gradient-primary)',
                    'var(--gradient-secondary)',
                    'var(--gradient-accent)',
                    'var(--gradient-rainbow)'
                ];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                this.style.background = randomColor;

                // Create ripple effect
                createRipple(this);
            });
        });
    }

    function createRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        `;

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';

        element.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // =====================
    // CREATIVE FORM INTERACTIONS
    // =====================

    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

    // Enhanced form validation with creative feedback
    function validateForm() {
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        const errors = [];

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                addFieldError(field);
                errors.push(field.previousElementSibling.textContent);
            } else {
                removeFieldError(field);
            }
        });

        // Email validation
        const emailField = contactForm.querySelector('[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                addFieldError(emailField);
                errors.push('Please enter a valid email address');
            }
        }

        return { isValid, errors };
    }

    function addFieldError(field) {
        field.style.borderColor = 'var(--electric-pink)';
        field.style.boxShadow = '0 0 10px rgba(236, 72, 153, 0.3)';

        // Add shake animation
        field.style.animation = 'fieldShake 0.5s ease-in-out';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    function removeFieldError(field) {
        field.style.borderColor = 'rgba(139, 92, 246, 0.3)';
        field.style.boxShadow = '';
    }

    // Real-time form interactions
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = 'var(--electric-purple)';
            this.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.2)';

            // Add glow effect to label
            const label = this.previousElementSibling;
            if (label) {
                label.style.color = 'var(--electric-purple)';
                label.style.textShadow = '0 0 10px rgba(139, 92, 246, 0.5)';
            }
        });

        input.addEventListener('blur', function () {
            this.style.borderColor = 'rgba(139, 92, 246, 0.3)';
            this.style.boxShadow = '';

            const label = this.previousElementSibling;
            if (label) {
                label.style.color = '';
                label.style.textShadow = '';
            }

            // Validate on blur
            if (this.hasAttribute('required') && !this.value.trim()) {
                addFieldError(this);
            } else {
                removeFieldError(this);
            }
        });

        input.addEventListener('input', function () {
            if (this.style.borderColor === 'var(--electric-pink)' && this.value.trim()) {
                removeFieldError(this);
            }
        });
    });

    // Form submission with creative success animation
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const validation = validateForm();

        if (!validation.isValid) {
            showCreativeNotification('Please fill in all required fields correctly', 'error');
            return;
        }

        // Get form data
        const formData = new FormData(contactForm);
        const services = formData.getAll('services');

        if (services.length === 0) {
            showCreativeNotification('Please select at least one service', 'error');
            return;
        }

        // Creative loading animation
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'Creating Magic...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'var(--gradient-rainbow)';

        // Add loading particles
        createLoadingParticles(submitBtn);

        setTimeout(() => {
            // Success state
            submitBtn.querySelector('.btn-text').textContent = 'Project Brief Sent!';
            submitBtn.style.background = 'var(--gradient-accent)';

            showCreativeNotification('Thanks! We\'ll review your brief and get back to you within 24 hours with some bold ideas!', 'success');

            // Create success explosion
            createSuccessExplosion();

            // Reset form after success
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.style.background = 'var(--gradient-primary)';
            }, 3000);
        }, 2000);
    });

    function createLoadingParticles(element) {
        const rect = element.getBoundingClientRect();

        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: var(--electric-yellow);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                animation: particleFloat 2s ease-out infinite;
                animation-delay: ${i * 0.1}s;
            `;

            particle.style.left = (rect.left + rect.width / 2) + 'px';
            particle.style.top = (rect.top + rect.height / 2) + 'px';

            document.body.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }
    }

    function createSuccessExplosion() {
        const colors = [
            'var(--electric-purple)',
            'var(--electric-pink)',
            'var(--electric-blue)',
            'var(--electric-orange)',
            'var(--electric-green)',
            'var(--electric-yellow)'
        ];

        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: 50%;
                left: 50%;
                z-index: 10000;
                pointer-events: none;
                animation: confettiExplosion 3s ease-out forwards;
                animation-delay: ${i * 0.05}s;
            `;

            document.body.appendChild(confetti);

            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }
    }

    // =====================
    // CREATIVE SCROLL ANIMATIONS
    // =====================

    // Enhanced Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Special animations for different elements
                if (entry.target.classList.contains('service-card')) {
                    animateServiceCard(entry.target);
                } else if (entry.target.classList.contains('portfolio-item')) {
                    animatePortfolioItem(entry.target);
                } else if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.service-card').forEach((el, index) => {
        el.classList.add('scale-in');
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.portfolio-item').forEach((el, index) => {
        el.classList.add('slide-in-left');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.achievement-item').forEach((el, index) => {
        el.classList.add('slide-in-right');
        el.style.animationDelay = `${index * 0.3}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });

    function animateServiceCard(card) {
        // Add floating hover effect
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-20px) rotateX(5deg)';
            this.style.boxShadow = 'var(--shadow-neon)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = '';
        });
    }

    function animatePortfolioItem(item) {
        // Add dynamic hover effects
        item.addEventListener('mouseenter', function () {
            const overlay = this.querySelector('.image-overlay');
            if (overlay) {
                overlay.style.background = `
                    linear-gradient(45deg, 
                        rgba(139, 92, 246, 0.5), 
                        rgba(236, 72, 153, 0.5), 
                        rgba(59, 130, 246, 0.5),
                        rgba(249, 115, 22, 0.5))
                `;
                overlay.style.backgroundSize = '400% 400%';
                overlay.style.animation = 'gradientShift 2s ease infinite';
            }
        });
    }

    function animateCounter(element) {
        const finalText = element.textContent;
        const number = parseInt(finalText.replace(/[^\d]/g, ''));
        const suffix = finalText.replace(/[\d]/g, '');

        if (!isNaN(number)) {
            let current = 0;
            const increment = number / 60;
            const duration = 2000;
            const frameTime = duration / 60;

            const timer = setInterval(() => {
                current += increment;

                if (current >= number) {
                    element.textContent = finalText;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + suffix;
                }
            }, frameTime);
        }
    }

    // =====================
    // CREATIVE NOTIFICATION SYSTEM
    // =====================

    function showCreativeNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.creative-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `creative-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${type === 'success' ? '🎉' : type === 'error' ? '⚠️' : 'ℹ️'}</div>
                <div class="notification-text">${message}</div>
            </div>
            <div class="notification-bg"></div>
        `;

        // Dynamic styling based on type
        const colors = {
            success: 'var(--gradient-accent)',
            error: 'var(--gradient-primary)',
            info: 'var(--gradient-secondary)'
        };

        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: colors[type],
            color: 'var(--white)',
            padding: '1.5rem 2rem',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-neon)',
            zIndex: '10000',
            transform: 'translateX(400px) scale(0.8)',
            transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            maxWidth: '400px',
            fontSize: '0.95rem',
            fontWeight: '500',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        });

        document.body.appendChild(notification);

        // Animate in with bounce
        setTimeout(() => {
            notification.style.transform = 'translateX(0) scale(1)';
        }, 100);

        // Auto remove with animation
        setTimeout(() => {
            notification.style.transform = 'translateX(400px) scale(0.8)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 5000);

        // Add click to dismiss
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px) scale(0.8)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        });
    }

    // =====================
    // INTERACTIVE TEAM MOSAIC
    // =====================

    function initializeTeamMosaic() {
        const mosaicItems = document.querySelectorAll('.mosaic-item');

        mosaicItems.forEach((item, index) => {
            item.addEventListener('click', function () {
                // Reset all items
                mosaicItems.forEach(i => {
                    i.style.filter = 'grayscale(0%)';
                    i.style.transform = 'scale(1)';
                });

                // Highlight clicked item
                this.style.filter = 'grayscale(0%) saturate(1.2)';
                this.style.transform = 'scale(1.05)';

                // Show team member info
                const name = this.querySelector('.photo-label').textContent;
                const role = this.querySelector('.photo-role').textContent;

                showCreativeNotification(`Meet ${name}, our ${role}! Click to connect.`, 'info');
            });

            // Add staggered entrance animation
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8) rotate(5deg)';

            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                item.style.opacity = '1';
                item.style.transform = 'scale(1) rotate(0deg)';
            }, index * 200);
        });
    }

    // =====================
    // PERFORMANCE OPTIMIZATIONS
    // =====================

    // Throttle scroll events
    let ticking = false;

    function updateOnScroll() {
        handleNavbarScroll();
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Optimize floating shapes animation
    function optimizeAnimations() {
        const shapes = document.querySelectorAll('.floating-shape');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion) {
            shapes.forEach(shape => {
                shape.style.animation = 'none';
            });
        }
    }

    // =====================
    // ACCESSIBILITY ENHANCEMENTS
    // =====================

    // Keyboard navigation for portfolio filters
    filterBtns.forEach((btn, index) => {
        btn.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const direction = e.key === 'ArrowRight' ? 1 : -1;
                const nextIndex = (index + direction + filterBtns.length) % filterBtns.length;
                filterBtns[nextIndex].focus();
                filterBtns[nextIndex].click();
            }
        });
    });

    // Enhanced focus management for creative elements
    document.querySelectorAll('button, [role="button"]').forEach(element => {
        element.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // =====================
    // INITIALIZATION
    // =====================

    // Initialize all creative components
    animateFloatingShapes();
    initializeTeamMosaic();
    optimizeAnimations();

    // Add creative CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% { transform: translateY(0) scale(0); opacity: 1; }
            100% { transform: translateY(-50px) scale(1); opacity: 0; }
        }
        
        @keyframes letterExplode {
            0% { transform: translateY(0) scale(1) rotate(0deg); }
            50% { transform: translateY(-20px) scale(1.2) rotate(180deg); }
            100% { transform: translateY(0) scale(1) rotate(360deg); }
        }
        
        @keyframes fieldShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes particleFloat {
            0% { transform: translate(0, 0) scale(0); opacity: 1; }
            100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1); opacity: 0; }
        }
        
        @keyframes confettiExplosion {
            0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; }
            100% { transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(1) rotate(720deg); opacity: 0; }
        }
        
        @keyframes rippleEffect {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(4); opacity: 0; }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
            position: relative;
            z-index: 2;
        }
        
        .notification-icon {
            font-size: 1.5rem;
        }
        
        .creative-notification {
            cursor: pointer;
            overflow: hidden;
            position: relative;
        }
        
        .creative-notification::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Catalyst Creative Agency website initialized with bold creative features!');

}); // End DOMContentLoaded

// =====================
// GLOBAL CREATIVE UTILITIES
// =====================

// Creative utility functions
window.CreativeUtils = {
    generateRandomColor: function () {
        const colors = [
            'var(--electric-purple)',
            'var(--electric-pink)',
            'var(--electric-blue)',
            'var(--electric-orange)',
            'var(--electric-green)',
            'var(--electric-yellow)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    addGlowEffect: function (element, color) {
        element.style.boxShadow = `0 0 30px ${color}`;
        element.style.filter = 'brightness(1.1)';

        setTimeout(() => {
            element.style.boxShadow = '';
            element.style.filter = '';
        }, 2000);
    },

    triggerElementPulse: function (element) {
        element.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }
};

// =====================
// CURSOR TRAIL EFFECT
// =====================

function initializeCursorTrail() {
    const trail = [];
    const trailLength = 10;

    document.addEventListener('mousemove', function (e) {
        // Add new trail point
        trail.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });

        // Remove old trail points
        while (trail.length > trailLength) {
            trail.shift();
        }

        // Create trail element
        const trailElement = document.createElement('div');
        trailElement.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--electric-purple);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 3}px;
            top: ${e.clientY - 3}px;
            animation: trailFade 0.5s ease-out forwards;
        `;

        document.body.appendChild(trailElement);

        setTimeout(() => {
            if (trailElement.parentNode) {
                trailElement.parentNode.removeChild(trailElement);
            }
        }, 500);
    });
}

// =====================
// INTERACTIVE BACKGROUND
// =====================

function createInteractiveBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;

    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 60 + 240}, 70%, 60%)`
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) +
                    Math.pow(particle.y - otherParticle.y, 2)
                );

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Initialize creative background effects
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    initializeCursorTrail();
    createInteractiveBackground();
}

// Add final CSS animations
const finalStyles = document.createElement('style');
finalStyles.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes trailFade {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
    
    .sparkle {
        box-shadow: 0 0 10px currentColor;
    }
`;
document.head.appendChild(finalStyles);

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.CreativeUtils;
}