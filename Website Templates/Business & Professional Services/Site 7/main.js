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
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
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
    // PROPERTY GALLERY FUNCTIONALITY
    // =====================

    const propertyCards = document.querySelectorAll('.property-card');

    // Mock property images for demonstration
    const propertyImages = {
        0: [ // Featured large property
            'url(img/a1.jpg) bottom / cover no-repeat',
            'url(img/a2.jpg) bottom / cover no-repeat',
            'url(img/a3.jpg) bottom / cover no-repeat'
        ],
        1: [ // Manhattan Penthouse
            'url(img/2.jpg) bottom / cover no-repeat'
        ],
        2: [ // Malibu Villa
            'url(img/3.jpg) bottom / cover no-repeat'
        ],
        3: [ // Aspen Retreat
            'url(img/4.jpg) bottom / cover no-repeat'
        ],
        4: [ // Aspen Retreat
            'url(img/5.jpg) bottom / cover no-repeat'
        ]
    };

    // Initialize property gallery navigation
    propertyCards.forEach((card, index) => {
        const propertyImage = card.querySelector('.property-image');
        const prevBtn = card.querySelector('.gallery-prev');
        const nextBtn = card.querySelector('.gallery-next');

        if (propertyImage && propertyImages[index]) {
            let currentImageIndex = 0;
            const images = propertyImages[index];

            // Set initial background
            propertyImage.style.background = images[currentImageIndex];

            // Previous image
            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                    propertyImage.style.background = images[currentImageIndex];

                    // Add transition effect
                    propertyImage.style.opacity = '0.7';
                    setTimeout(() => {
                        propertyImage.style.opacity = '1';
                    }, 150);
                });
            }

            // Next image
            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    propertyImage.style.background = images[currentImageIndex];

                    // Add transition effect
                    propertyImage.style.opacity = '0.7';
                    setTimeout(() => {
                        propertyImage.style.opacity = '1';
                    }, 150);
                });
            }
        }
    });

    // Property favorite toggle
    document.querySelectorAll('.btn-icon').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const isLiked = this.classList.contains('liked');
            if (isLiked) {
                this.innerHTML = '♡';
                this.classList.remove('liked');
                this.style.background = '#f8f9fa';
                this.style.color = '#6c757d';
            } else {
                this.innerHTML = '❤️';
                this.classList.add('liked');
                this.style.background = '#d4af37';
                this.style.color = '#ffffff';
            }

            // Add animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // =====================
    // FORM FUNCTIONALITY
    // =====================

    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');

    // Form validation
    function validateForm() {
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
            } else {
                field.style.borderColor = 'rgba(108, 117, 125, 0.2)';
            }
        });

        // Email validation
        const emailField = contactForm.querySelector('[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = '#e74c3c';
            }
        }

        // Phone validation
        const phoneField = contactForm.querySelector('[type="tel"]');
        if (phoneField && phoneField.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
                isValid = false;
                phoneField.style.borderColor = '#e74c3c';
            }
        }

        return isValid;
    }

    // Real-time form validation
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', function () {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = 'rgba(108, 117, 125, 0.2)';
            }
        });

        field.addEventListener('focus', function () {
            this.style.borderColor = '#d4af37';
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            // Shake form on validation error
            contactForm.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                contactForm.style.animation = '';
            }, 500);
            return;
        }

        // Disable submit button and show loading state
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Scheduling...';
        submitBtn.style.background = 'linear-gradient(135deg, #95a5a6, #7f8c8d)';

        // Simulate form submission
        setTimeout(() => {
            // Success state
            submitBtn.textContent = 'Consultation Scheduled!';
            submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';

            // Reset form after success
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #d4af37, #e6c965)';

                // Show success message
                showNotification('Thank you! We\'ll contact you within 2 hours to schedule your consultation.', 'success');
            }, 2000);
        }, 1500);
    });

    // =====================
    // SCROLL ANIMATIONS
    // =====================

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Special animation for stats
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.property-card').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.service-card').forEach((el, index) => {
        el.classList.add('scale-in');
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.about-text').forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });

    document.querySelectorAll('.about-stats').forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });

    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });

    // =====================
    // COUNTER ANIMATION
    // =====================

    function animateCounter(element) {
        const target = element.textContent;
        const hasSymbol = /[^\d.]/g.test(target);
        const numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
        const suffix = target.replace(/[\d.]/g, '');

        if (isNaN(numericValue)) return;

        let current = 0;
        const increment = numericValue / 60; // 60 frames for smooth animation
        const duration = 2000; // 2 seconds
        const frameTime = duration / 60;

        const timer = setInterval(() => {
            current += increment;

            if (current >= numericValue) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                let displayValue;
                if (suffix.includes('B')) {
                    displayValue = (current).toFixed(1) + 'B+';
                } else if (suffix.includes('%')) {
                    displayValue = Math.floor(current) + '%';
                } else if (suffix.includes('+')) {
                    displayValue = Math.floor(current) + '+';
                } else {
                    displayValue = Math.floor(current) + suffix;
                }
                element.textContent = displayValue;
            }
        }, frameTime);
    }

    // =====================
    // NOTIFICATION SYSTEM
    // =====================

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Styling
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? 'linear-gradient(135deg, #27ae60, #2ecc71)' :
                type === 'error' ? 'linear-gradient(135deg, #e74c3c, #c0392b)' :
                    'linear-gradient(135deg, #3498db, #2980b9)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            zIndex: '9999',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            fontSize: '0.95rem',
            lineHeight: '1.4'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // =====================
    // HERO SCROLL INDICATOR
    // =====================

    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const propertiesSection = document.querySelector('#properties');
            if (propertiesSection) {
                propertiesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Hide scroll indicator when scrolling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // =====================
    // PROPERTY MODAL/DETAILS
    // =====================

    document.querySelectorAll('.btn-outline').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const propertyCard = this.closest('.property-card');
            const propertyTitle = propertyCard.querySelector('.property-title').textContent;
            const propertyPrice = propertyCard.querySelector('.property-price').textContent;
            const propertyLocation = propertyCard.querySelector('.property-location').textContent;

            showNotification(`Viewing details for ${propertyTitle} in ${propertyLocation} (${propertyPrice})`, 'info');

            // In a real implementation, this would open a modal or navigate to a details page
            console.log('Property details requested:', {
                title: propertyTitle,
                price: propertyPrice,
                location: propertyLocation
            });
        });
    });

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

    // Lazy load property images (simulation)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const propertyImage = entry.target;
                    // In a real implementation, you would load actual images here
                    propertyImage.style.opacity = '1';
                    imageObserver.unobserve(propertyImage);
                }
            });
        });

        document.querySelectorAll('.property-image').forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            imageObserver.observe(img);
        });
    }

    // =====================
    // ACCESSIBILITY ENHANCEMENTS
    // =====================

    // Focus management for mobile menu
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        document.addEventListener('keydown', function (e) {
            const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

            if (!isTabPressed) return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });
    }

    // Keyboard navigation for property cards
    document.querySelectorAll('.property-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const viewDetailsBtn = this.querySelector('.btn-outline');
                if (viewDetailsBtn) {
                    viewDetailsBtn.click();
                }
            }
        });
    });

    // =====================
    // INITIALIZATION
    // =====================

    console.log('Prestige Properties website initialized successfully');

    // Add CSS for shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

}); // End DOMContentLoaded

// =====================
// GLOBAL UTILITIES
// =====================

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Utility function to format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}