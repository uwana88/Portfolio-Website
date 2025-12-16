// Black Minimal Navbar JavaScript
(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('blackNavbar');
    const navItems = document.querySelectorAll('.nav-item');
    const overlayLinks = document.querySelectorAll('.overlay-link');
    const themeToggle = document.getElementById('themeToggle');
    const themeSelector = document.getElementById('themeSelector');
    const themeOptions = document.querySelectorAll('.theme-option');
    const menuToggle = document.getElementById('menuToggle');
    const overlayMenu = document.getElementById('overlayMenu');
    const overlayClose = document.getElementById('overlayClose');
    const overlayBg = document.getElementById('overlayBg');
    const footerLinks = document.querySelectorAll('.footer-link');
    const socialLinks = document.querySelectorAll('.social-link');

    // State management
    let isOverlayOpen = false;
    let isThemeSelectorOpen = false;
    let currentTheme = localStorage.getItem('theme') || 'dark';

    // Theme Management
    function initTheme() {
        // Check for system preference if theme is 'auto'
        if (currentTheme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        } else {
            applyTheme(currentTheme);
        }
        
        // Update active theme option
        updateActiveThemeOption();
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme icon
        updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
        const themeIcon = themeToggle.querySelector('.theme-icon');
        const circle = themeIcon.querySelector('.icon-circle');
        const rays = themeIcon.querySelectorAll('.ray');
        
        if (theme === 'light') {
            circle.style.background = 'currentColor';
            rays.forEach(ray => {
                ray.style.opacity = '1';
            });
        } else {
            circle.style.background = 'transparent';
            rays.forEach(ray => {
                ray.style.opacity = '0';
            });
        }
    }

    function updateActiveThemeOption() {
        themeOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-theme') === currentTheme) {
                option.classList.add('active');
            }
        });
    }

    function toggleThemeSelector() {
        isThemeSelectorOpen = !isThemeSelectorOpen;
        
        if (isThemeSelectorOpen) {
            openThemeSelector();
        } else {
            closeThemeSelector();
        }
    }

    function openThemeSelector() {
        themeSelector.classList.add('active');
        closeOverlayMenu();
    }

    function closeThemeSelector() {
        themeSelector.classList.remove('active');
        isThemeSelectorOpen = false;
    }

    function setTheme(theme) {
        currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        } else {
            applyTheme(theme);
        }
        
        updateActiveThemeOption();
        closeThemeSelector();
        
        // Show minimal notification
        showMinimalNotification(`Theme: ${theme}`);
    }

    // Navigation Functions
    function setActiveNavItem(clickedItem) {
        // Remove active from all nav items
        [...navItems, ...overlayLinks].forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active to clicked item
        clickedItem.classList.add('active');
        
        // Find corresponding item and activate it
        const itemText = clickedItem.textContent.trim() || 
                        clickedItem.querySelector('.nav-label')?.textContent.trim() ||
                        clickedItem.querySelector('.link-text')?.textContent.trim();
        
        [...navItems, ...overlayLinks].forEach(item => {
            const text = item.textContent.trim() || 
                        item.querySelector('.nav-label')?.textContent.trim() ||
                        item.querySelector('.link-text')?.textContent.trim();
            if (text === itemText && item !== clickedItem) {
                item.classList.add('active');
            }
        });
        
        // Close overlay menu after selection
        if (isOverlayOpen) {
            setTimeout(closeOverlayMenu, 300);
        }
    }

    // Overlay Menu Functions
    function toggleOverlayMenu() {
        isOverlayOpen = !isOverlayOpen;
        
        if (isOverlayOpen) {
            openOverlayMenu();
        } else {
            closeOverlayMenu();
        }
    }

    function openOverlayMenu() {
        overlayMenu.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Close theme selector
        closeThemeSelector();
        
        // Reset overlay link animations
        const links = overlayMenu.querySelectorAll('.overlay-link');
        links.forEach((link, index) => {
            link.style.animation = 'none';
            link.offsetHeight; // Trigger reflow
            link.style.animation = `slideInRight 0.6s ease forwards`;
            link.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        });
    }

    function closeOverlayMenu() {
        overlayMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
        isOverlayOpen = false;
    }

    // Scroll Effects
    function handleScroll() {
        const scrolled = window.pageYOffset > 50;
        
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Minimal Notification System
    function showMinimalNotification(message) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.minimal-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'minimal-notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            color: var(--text-primary);
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 400;
            z-index: 10000;
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        // Animate out
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }

    // Outside Click Handler
    function handleDocumentClick(e) {
        // Close theme selector if clicking outside
        if (themeSelector && !themeSelector.contains(e.target) && 
            !themeToggle.contains(e.target) && isThemeSelectorOpen) {
            closeThemeSelector();
        }
        
        // Close overlay menu if clicking on background
        if (e.target === overlayBg && isOverlayOpen) {
            closeOverlayMenu();
        }
    }

    // Keyboard Navigation
    function handleKeyDown(e) {
        switch (e.key) {
            case 'Escape':
                if (isOverlayOpen) {
                    closeOverlayMenu();
                } else if (isThemeSelectorOpen) {
                    closeThemeSelector();
                }
                break;
                
            case 't':
            case 'T':
                if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    toggleThemeSelector();
                }
                break;
                
            case 'm':
            case 'M':
                if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    toggleOverlayMenu();
                }
                break;
        }
    }

    // Window Resize Handler
    function handleResize() {
        // Close overlay menu on resize to desktop if needed
        if (window.innerWidth > 768 && isOverlayOpen) {
            // Keep overlay menu open on desktop as it's a design feature
        }
        
        // Close theme selector on resize
        if (isThemeSelectorOpen) {
            closeThemeSelector();
        }
    }

    // System Theme Change Handler
    function handleSystemThemeChange(e) {
        if (currentTheme === 'auto') {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    }

    // Smooth Scroll to Section
    function smoothScrollToSection(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Add custom animations
    function addMinimalAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .nav-item:hover .nav-label {
                transform: translateY(-1px);
                transition: transform 0.3s ease;
            }
            
            .overlay-link:hover .link-text {
                letter-spacing: 0.02em;
                transition: letter-spacing 0.3s ease;
            }
            
            .brand-mark:hover {
                transform: scale(1.05);
                transition: transform 0.3s ease;
            }
            
            .action-btn:active {
                transform: translateY(-2px) scale(0.95);
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize Event Listeners
    function initializeEventListeners() {
        // Navigation items
        [...navItems, ...overlayLinks].forEach(item => {
            item.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') {
                    e.preventDefault();
                }
                
                setActiveNavItem(this);
                
                // Handle anchor links
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    smoothScrollToSection(href);
                }
            });
        });

        // Theme toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleThemeSelector();
            });
        }

        // Theme options
        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                setTheme(theme);
            });
        });

        // Menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleOverlayMenu();
            });
        }

        // Overlay close
        if (overlayClose) {
            overlayClose.addEventListener('click', closeOverlayMenu);
        }

        // Overlay background
        if (overlayBg) {
            overlayBg.addEventListener('click', closeOverlayMenu);
        }

        // Footer links
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                const action = this.textContent.trim();
                showMinimalNotification(`Opening ${action}`);
            });
        });

        // Social links
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                const platform = this.getAttribute('aria-label') || this.textContent.trim();
                showMinimalNotification(`Opening ${platform}`);
            });
        });

        // Global event listeners
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', debounce(handleScroll, 16));
        window.addEventListener('resize', debounce(handleResize, 250));

        // System theme change listener
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', handleSystemThemeChange);
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

    // Initialize everything
    function init() {
        addMinimalAnimations();
        initializeEventListeners();
        initTheme();
        
        // Set initial scroll state
        handleScroll();
        
        // Set initial active nav item
        const activeNavItem = document.querySelector('.nav-item.active');
        if (!activeNavItem) {
            const firstNavItem = document.querySelector('.nav-item');
            if (firstNavItem) {
                firstNavItem.classList.add('active');
            }
        }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose functions for debugging
    if (typeof window !== 'undefined') {
        window.BlackMinimalNavbar = {
            toggleOverlayMenu,
            toggleThemeSelector,
            setTheme,
            showNotification: showMinimalNotification,
            closeAll: () => {
                closeOverlayMenu();
                closeThemeSelector();
            }
        };
    }

})();