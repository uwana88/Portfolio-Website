// Dark Minimal Navbar JavaScript
(function() {
    'use strict';

    // DOM Elements
    const navbar = document.querySelector('.dark-navbar');
    const themeToggle = document.getElementById('themeToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose = document.getElementById('mobileClose');
    const navItems = document.querySelectorAll('.nav-item');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const body = document.body;

    // State management
    let isMobileMenuOpen = false;
    let currentTheme = localStorage.getItem('theme') || 'dark';

    // Theme Functions
    function initTheme() {
        if (currentTheme === 'light') {
            body.classList.add('light');
        } else {
            body.classList.remove('light');
        }
    }

    function toggleTheme() {
        if (currentTheme === 'dark') {
            currentTheme = 'light';
            body.classList.add('light');
        } else {
            currentTheme = 'dark';
            body.classList.remove('light');
        }
        
        localStorage.setItem('theme', currentTheme);
        
        // Add a subtle animation feedback
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    }

    // Mobile Menu Functions
    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
        
        if (isMobileMenuOpen) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    }

    function openMobileMenu() {
        mobileOverlay.classList.add('active');
        mobileMenuBtn.classList.add('active');
        body.style.overflow = 'hidden';
        
        // Reset animations for mobile nav items
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');
        mobileNavLinks.forEach((item, index) => {
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            item.style.animation = `slideInLeft 0.5s ease forwards`;
            item.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        });
    }

    function closeMobileMenu() {
        mobileOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        body.style.overflow = '';
        isMobileMenuOpen = false;
    }

    // Navigation Functions
    function setActiveNavItem(clickedItem) {
        // Remove active from all nav items
        [...navItems, ...mobileNavItems].forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active to clicked item
        clickedItem.classList.add('active');
        
        // Find corresponding item in desktop/mobile and activate it
        const itemText = clickedItem.textContent.trim();
        [...navItems, ...mobileNavItems].forEach(item => {
            if (item.textContent.trim() === itemText && item !== clickedItem) {
                item.classList.add('active');
            }
        });
    }

    // Scroll Effects
    function handleScroll() {
        const scrolled = window.scrollY > 20;
        
        if (scrolled) {
            navbar.style.background = currentTheme === 'light' 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(10, 10, 10, 0.95)';
            navbar.style.borderBottomColor = currentTheme === 'light'
                ? 'rgba(0, 0, 0, 0.15)'
                : 'rgba(255, 255, 255, 0.15)';
        } else {
            navbar.style.background = currentTheme === 'light'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(10, 10, 10, 0.8)';
            navbar.style.borderBottomColor = currentTheme === 'light'
                ? 'rgba(0, 0, 0, 0.1)'
                : 'rgba(255, 255, 255, 0.1)';
        }
    }

    // Outside Click Handler
    function handleDocumentClick(e) {
        // Close mobile menu if clicking on overlay background
        if (e.target === mobileOverlay && isMobileMenuOpen) {
            closeMobileMenu();
        }
    }

    // Keyboard Navigation
    function handleKeyDown(e) {
        switch (e.key) {
            case 'Escape':
                if (isMobileMenuOpen) {
                    closeMobileMenu();
                }
                break;
            case 't':
            case 'T':
                // Toggle theme with 't' key (when not typing in input)
                if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    toggleTheme();
                }
                break;
        }
    }

    // Smooth Scroll to Section
    function smoothScrollToSection(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Window Resize Handler
    function handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && isMobileMenuOpen) {
            closeMobileMenu();
        }
    }

    // Add Loading Animation
    function addEntranceAnimation() {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            navbar.style.transform = 'translateY(0)';
        }, 100);
    }

    // Initialize Event Listeners
    function initializeEventListeners() {
        // Theme toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Mobile menu controls
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMobileMenu();
            });
        }

        if (mobileClose) {
            mobileClose.addEventListener('click', closeMobileMenu);
        }

        // Navigation items
        [...navItems, ...mobileNavItems].forEach(item => {
            item.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Handle demo links
                if (href === '#') {
                    e.preventDefault();
                }
                
                setActiveNavItem(this);
                
                // Close mobile menu after clicking
                if (isMobileMenuOpen) {
                    setTimeout(closeMobileMenu, 300);
                }
                
                // Handle anchor links
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    smoothScrollToSection(href);
                }
            });
        });

        // Contact button click tracking
        document.querySelectorAll('.contact-btn, .mobile-contact-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Close mobile menu if open
                if (isMobileMenuOpen) {
                    closeMobileMenu();
                }
            });
        });

        // Global event listeners
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', debounce(handleScroll, 16));
        window.addEventListener('resize', debounce(handleResize, 250));

        // Handle system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', function(e) {
                if (!localStorage.getItem('theme')) {
                    currentTheme = e.matches ? 'dark' : 'light';
                    initTheme();
                }
            });
        }
    }

    // Utility: Debounce function
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

    // Performance: Intersection Observer for navbar visibility
    function initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navbar.style.transform = 'translateY(0)';
                } else {
                    // Keep navbar visible when scrolling
                    navbar.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe the first section or body
        const firstSection = document.querySelector('main, section, .hero');
        if (firstSection) {
            observer.observe(firstSection);
        }
    }

    // Initialize everything
    function init() {
        initTheme();
        initializeEventListeners();
        addEntranceAnimation();
        initIntersectionObserver();
        
        // Update scroll effect based on initial theme
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
        window.DarkMinimalNavbar = {
            toggleTheme,
            toggleMobileMenu,
            setTheme: function(theme) {
                currentTheme = theme;
                localStorage.setItem('theme', theme);
                initTheme();
            },
            getCurrentTheme: () => currentTheme
        };
    }

})();