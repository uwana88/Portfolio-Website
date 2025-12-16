// Modern Hero Section JavaScript
(function() {
    'use strict';

    // DOM Elements
    const heroSection = document.getElementById('modernHero');
    const heroBadge = document.getElementById('heroBadge');
    const heroStats = document.getElementById('heroStats');
    const playBtn = document.getElementById('playBtn');
    const videoModal = document.getElementById('videoModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const visualContainer = document.getElementById('visualContainer');
    const floatingCards = document.querySelectorAll('.floating-card');
    const mainVisual = document.getElementById('mainVisual');
    const gridItems = document.querySelectorAll('.grid-item');

    // State management
    let isVideoModalOpen = false;
    let hasAnimated = false;
    let currentGridItem = 0;
    let gridRotationInterval = null;

    // Counter Animation for Stats
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number with commas for large numbers
            const formattedNumber = target >= 1000 ? 
                Math.floor(current).toLocaleString() : 
                Math.floor(current).toString();
            
            element.textContent = formattedNumber;
        }, 16);
    }

    // Initialize Stats Animation
    function initStatsAnimation() {
        const statNumbers = heroStats.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            animateCounter(stat, target);
        });
    }

    // Video Modal Functions
    function openVideoModal() {
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        isVideoModalOpen = true;
    }

    function closeVideoModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        isVideoModalOpen = false;
    }

    // Floating Cards Animation
    function initFloatingAnimation() {
        floatingCards.forEach((card, index) => {
            // Add continuous floating animation
            card.style.animation += `, floatContinuous 4s ease-in-out infinite`;
            card.style.animationDelay = `${1.6 + (index * 0.2)}s, ${index * 0.5}s`;
        });
    }

    // Interactive Grid Items
    function initGridInteraction() {
        gridItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                setActiveGridItem(index);
            });
        });
        
        // Auto-rotate grid items
        startGridRotation();
    }

    function setActiveGridItem(index) {
        gridItems.forEach(item => item.classList.remove('active'));
        gridItems[index].classList.add('active');
        currentGridItem = index;
        
        // Add click animation
        const clickedItem = gridItems[index];
        clickedItem.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickedItem.style.transform = '';
        }, 150);
    }

    function startGridRotation() {
        gridRotationInterval = setInterval(() => {
            currentGridItem = (currentGridItem + 1) % gridItems.length;
            setActiveGridItem(currentGridItem);
        }, 3000);
    }

    function stopGridRotation() {
        if (gridRotationInterval) {
            clearInterval(gridRotationInterval);
            gridRotationInterval = null;
        }
    }

    // Parallax Effect
    function initParallaxEffect() {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) / centerX;
            const moveY = (clientY - centerY) / centerY;
            
            // Apply parallax to floating cards
            floatingCards.forEach((card, index) => {
                const multiplier = (index + 1) * 10;
                const translateX = moveX * multiplier;
                const translateY = moveY * multiplier;
                
                card.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
            
            // Apply subtle parallax to main visual
            if (mainVisual) {
                const mainTranslateX = moveX * 5;
                const mainTranslateY = moveY * 5;
                mainVisual.style.transform = `translate(-50%, -50%) translate(${mainTranslateX}px, ${mainTranslateY}px)`;
            }
        });
    }

    // Scroll Effects
    function handleScroll() {
        const scrolled = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        const scrollProgress = Math.min(scrolled / heroHeight, 1);
        
        // Parallax background orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.5;
            const translateY = scrolled * speed;
            orb.style.transform = `translateY(${translateY}px)`;
        });
        
        // Fade out scroll indicator
        if (scrollIndicator) {
            const opacity = Math.max(1 - (scrollProgress * 2), 0);
            scrollIndicator.style.opacity = opacity;
        }
        
        // Scale visual container slightly on scroll
        if (visualContainer) {
            const scale = 1 - (scrollProgress * 0.1);
            visualContainer.style.transform = `scale(${Math.max(scale, 0.9)})`;
        }
    }

    // Badge Click Animation
    function initBadgeAnimation() {
        if (heroBadge) {
            heroBadge.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    pointer-events: none;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: 100px;
                    height: 100px;
                    left: ${e.offsetX - 50}px;
                    top: ${e.offsetY - 50}px;
                `;
                
                heroBadge.style.position = 'relative';
                heroBadge.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        }
    }

    // Intersection Observer for animations
    function initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    // Trigger stats animation
                    setTimeout(() => {
                        initStatsAnimation();
                    }, 1500);
                    
                    hasAnimated = true;
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(heroSection);
    }

    // Keyboard Navigation
    function handleKeyDown(e) {
        switch (e.key) {
            case 'Escape':
                if (isVideoModalOpen) {
                    closeVideoModal();
                }
                break;
            case 'Enter':
            case ' ':
                if (e.target === playBtn) {
                    e.preventDefault();
                    openVideoModal();
                }
                break;
            case 'ArrowLeft':
                if (mainVisual && mainVisual.contains(document.activeElement)) {
                    e.preventDefault();
                    const prevIndex = (currentGridItem - 1 + gridItems.length) % gridItems.length;
                    setActiveGridItem(prevIndex);
                    stopGridRotation();
                }
                break;
            case 'ArrowRight':
                if (mainVisual && mainVisual.contains(document.activeElement)) {
                    e.preventDefault();
                    const nextIndex = (currentGridItem + 1) % gridItems.length;
                    setActiveGridItem(nextIndex);
                    stopGridRotation();
                }
                break;
        }
    }

    // Add custom CSS animations
    function addCustomAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatContinuous {
                0%, 100% { 
                    transform: translateY(0px) rotate(0deg);
                }
                50% { 
                    transform: translateY(-15px) rotate(2deg);
                }
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .floating-card:hover {
                transform: translateY(-8px) !important;
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
                transition: all 0.3s ease !important;
            }
            
            .chart-bar:nth-child(1) { --delay: 0; }
            .chart-bar:nth-child(2) { --delay: 1; }
            .chart-bar:nth-child(3) { --delay: 2; }
            .chart-bar:nth-child(4) { --delay: 3; }
            .chart-bar:nth-child(5) { --delay: 4; }
        `;
        document.head.appendChild(style);
    }

    // Performance optimization: throttle scroll events
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
        }
    }

    // Initialize Event Listeners
    function initializeEventListeners() {
        // Video modal controls
        if (playBtn) {
            playBtn.addEventListener('click', openVideoModal);
        }
        
        if (modalClose) {
            modalClose.addEventListener('click', closeVideoModal);
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeVideoModal);
        }

        // Scroll effects
        window.addEventListener('scroll', throttle(handleScroll, 16));
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyDown);
        
        // Grid item interactions
        gridItems.forEach(item => {
            item.addEventListener('mouseenter', stopGridRotation);
            item.addEventListener('mouseleave', startGridRotation);
        });
        
        // Primary button click animation
        const primaryBtn = document.querySelector('.primary-btn');
        if (primaryBtn) {
            primaryBtn.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        }
        
        // Window resize handler
        window.addEventListener('resize', throttle(() => {
            // Recalculate parallax on resize
            if (window.innerWidth <= 768) {
                // Disable parallax on mobile
                floatingCards.forEach(card => {
                    card.style.transform = '';
                });
                if (mainVisual) {
                    mainVisual.style.transform = 'translate(-50%, -50%)';
                }
            }
        }, 250));
    }

    // Initialize everything
    function init() {
        addCustomAnimations();
        initializeEventListeners();
        initIntersectionObserver();
        initFloatingAnimation();
        initGridInteraction();
        initBadgeAnimation();
        
        // Only enable parallax on desktop
        if (window.innerWidth > 768) {
            initParallaxEffect();
        }
        
        // Set initial scroll effects
        handleScroll();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose some functions globally for debugging
    if (typeof window !== 'undefined') {
        window.ModernHero = {
            openVideoModal,
            closeVideoModal,
            setActiveGridItem,
            animateStats: initStatsAnimation
        };
    }

})();