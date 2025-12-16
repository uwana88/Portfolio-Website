// Gradient Colorful Navbar JavaScript
(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('gradientNavbar');
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-trigger)');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const servicesDropdown = document.getElementById('servicesDropdown');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const notificationsBtn = document.getElementById('notificationsBtn');
    const themeBtn = document.getElementById('themeBtn');
    const colorIndicator = document.getElementById('colorIndicator');
    const gradientOrbs = document.querySelectorAll('.gradient-orb');

    // State management
    let isMobileMenuOpen = false;
    let isDropdownOpen = false;
    let currentTheme = 'colorful';
    let activeNavColor = '#FF6B6B';

    // Color Animation System
    function updateColorIndicator(color) {
        if (colorIndicator) {
            colorIndicator.style.background = `linear-gradient(90deg, ${color}, ${color}aa)`;
            colorIndicator.style.width = '100px';
            
            setTimeout(() => {
                colorIndicator.style.width = '0';
            }, 2000);
        }
    }

    function animateNavbarColors(color) {
        // Update CSS custom property for dynamic theming
        document.documentElement.style.setProperty('--active-nav-color', color);
        
        // Animate orbs based on active color
        const colorMap = {
            '#FF6B6B': ['#FF6B6B', '#FF8E8E', '#FFA8A8'],
            '#4ECDC4': ['#4ECDC4', '#44A08D', '#6DD5DB'],
            '#45B7D1': ['#45B7D1', '#96C93D', '#A8E6CF'],
            '#96C93D': ['#96C93D', '#8BC34A', '#CDDC39'],
            '#F093FB': ['#F093FB', '#F5576C', '#FFB74D']
        };
        
        const colors = colorMap[color] || colorMap['#FF6B6B'];
        
        gradientOrbs.forEach((orb, index) => {
            if (colors[index]) {
                orb.style.background = `radial-gradient(circle, ${colors[index]}, ${colors[index]}aa)`;
            }
        });
    }

    // Navigation Functions
    function setActiveNavLink(clickedLink) {
        // Remove active from all links
        [...navLinks, ...mobileLinks].forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active to clicked link
        clickedLink.classList.add('active');
        
        // Get color and update animations
        const color = clickedLink.getAttribute('data-color') || 
                     clickedLink.getAttribute('data-mobile-color') || '#FF6B6B';
        
        activeNavColor = color;
        updateColorIndicator(color);
        animateNavbarColors(color);
        
        // Find corresponding link and activate it
        const linkText = clickedLink.textContent.trim();
        [...navLinks, ...mobileLinks].forEach(link => {
            if (link.textContent.trim() === linkText && link !== clickedLink) {
                link.classList.add('active');
            }
        });
        
        // Close mobile menu after selection
        if (isMobileMenuOpen) {
            setTimeout(closeMobileMenu, 300);
        }
        
        // Show color feedback
        showColorNotification(`Switched to ${linkText}`, color);
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
        mobileMenu.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeDropdown();
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
        isMobileMenuOpen = false;
    }

    // Dropdown Functions
    function toggleDropdown() {
        isDropdownOpen = !isDropdownOpen;
        
        if (isDropdownOpen) {
            openDropdown();
        } else {
            closeDropdown();
        }
    }

    function openDropdown() {
        if (servicesDropdown) {
            servicesDropdown.classList.add('active');
        }
    }

    function closeDropdown() {
        if (servicesDropdown) {
            servicesDropdown.classList.remove('active');
            isDropdownOpen = false;
        }
    }

    // Theme Functions
    function cycleTheme() {
        const themes = ['colorful', 'sunset', 'ocean', 'forest'];
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        currentTheme = themes[nextIndex];
        
        applyTheme(currentTheme);
        showColorNotification(`Theme: ${currentTheme}`, getThemeColor(currentTheme));
    }

    function applyTheme(theme) {
        const themeColors = {
            colorful: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
            sunset: ['#FF6B35', '#F7931E', '#FFD23F'],
            ocean: ['#006BA6', '#0496FF', '#FFBC42'],
            forest: ['#2D5016', '#61892F', '#86C232']
        };
        
        const colors = themeColors[theme];
        
        // Update orbs
        gradientOrbs.forEach((orb, index) => {
            if (colors[index]) {
                orb.style.background = `radial-gradient(circle, ${colors[index]}, ${colors[index]}aa)`;
            }
        });
        
        // Update navbar background
        navbar.style.background = `rgba(${theme === 'colorful' ? '255, 255, 255' : '0, 0, 0'}, 0.1)`;
    }

    function getThemeColor(theme) {
        const themeColors = {
            colorful: '#FF6B6B',
            sunset: '#FF6B35', 
            ocean: '#0496FF',
            forest: '#86C232'
        };
        return themeColors[theme] || '#FF6B6B';
    }

    // Notification Functions
    function handleNotifications() {
        const notificationDot = notificationsBtn.querySelector('.notification-dot');
        
        // Remove notification dot with animation
        if (notificationDot) {
            notificationDot.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                notificationDot.remove();
            }, 500);
        }
        
        showColorNotification('Notifications cleared', '#4ECDC4');
    }

    function showColorNotification(message, color) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.color-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'color-notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: ${color};
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 4px 20px ${color}40;
            opacity: 0;
            transform: translateX(100%) scale(0.8);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0) scale(1)';
        }, 10);
        
        // Animate out
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%) scale(0.8)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Scroll Effects
    function handleScroll() {
        const scrolled = window.pageYOffset > 30;
        
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Parallax effect on orbs
        const scrollRatio = Math.min(window.pageYOffset / window.innerHeight, 1);
        gradientOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.3;
            const translateY = scrollRatio * speed * 50;
            orb.style.transform = `translateY(${translateY}px)`;
        });
    }

    // Mouse Movement Effects
    function handleMouseMove(e) {
        if (window.innerWidth <= 768) return; // Disable on mobile
        
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / centerX;
        const moveY = (clientY - centerY) / centerY;
        
        // Apply parallax to orbs
        gradientOrbs.forEach((orb, index) => {
            const multiplier = (index + 1) * 15;
            const translateX = moveX * multiplier;
            const translateY = moveY * multiplier;
            
            orb.style.transform += ` translate(${translateX}px, ${translateY}px)`;
        });
    }

    // Outside Click Handler
    function handleDocumentClick(e) {
        // Close dropdown if clicking outside
        if (servicesDropdown && !servicesDropdown.contains(e.target) && isDropdownOpen) {
            closeDropdown();
        }
        
        // Close mobile menu if clicking outside
        if (isMobileMenuOpen && 
            !mobileMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    }

    // Keyboard Navigation
    function handleKeyDown(e) {
        switch (e.key) {
            case 'Escape':
                if (isMobileMenuOpen) {
                    closeMobileMenu();
                } else if (isDropdownOpen) {
                    closeDropdown();
                }
                break;
                
            case 't':
            case 'T':
                if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    cycleTheme();
                }
                break;
                
            case 'ArrowLeft':
            case 'ArrowRight':
                if (e.altKey && !isMobileMenuOpen) {
                    e.preventDefault();
                    cycleNavigation(e.key === 'ArrowRight');
                }
                break;
        }
    }

    function cycleNavigation(forward) {
        const links = Array.from(navLinks);
        const currentIndex = links.findIndex(link => link.classList.contains('active'));
        const nextIndex = forward 
            ? (currentIndex + 1) % links.length
            : (currentIndex - 1 + links.length) % links.length;
        
        if (links[nextIndex]) {
            setActiveNavLink(links[nextIndex]);
        }
    }

    // Window Resize Handler
    function handleResize() {
        if (window.innerWidth > 768 && isMobileMenuOpen) {
            closeMobileMenu();
        }
        
        // Recalculate orb positions
        setTimeout(() => {
            gradientOrbs.forEach(orb => {
                orb.style.transform = '';
            });
        }, 100);
    }

    // Initialize Animations
    function initializeAnimations() {
        // Add dynamic CSS for advanced animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes colorPulse {
                0% { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); }
                50% { box-shadow: 0 4px 30px ${activeNavColor}60; }
                100% { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; transform: scale(1); }
                to { opacity: 0; transform: scale(0.5); }
            }
            
            .nav-link.active {
                animation: colorPulse 2s infinite;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize Event Listeners
    function initializeEventListeners() {
        // Navigation links
        [...navLinks, ...mobileLinks].forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') {
                    e.preventDefault();
                }
                
                setActiveNavLink(this);
            });
        });

        // Dropdown functionality
        if (dropdownTrigger) {
            dropdownTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                toggleDropdown();
            });
        }

        // Mobile menu
        if (mobileToggle) {
            mobileToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMobileMenu();
            });
        }

        // Action buttons
        if (notificationsBtn) {
            notificationsBtn.addEventListener('click', handleNotifications);
        }

        if (themeBtn) {
            themeBtn.addEventListener('click', cycleTheme);
        }

        // Dropdown links
        document.querySelectorAll('.dropdown-link').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                const service = this.querySelector('strong').textContent;
                showColorNotification(`Selected: ${service}`, activeNavColor);
                closeDropdown();
            });
        });

        // CTA buttons
        document.querySelectorAll('.cta-button, .mobile-cta').forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                showColorNotification('Starting your project!', '#4ECDC4');
                closeMobileMenu();
            });
        });

        // Global event listeners
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', debounce(handleScroll, 16));
        window.addEventListener('resize', debounce(handleResize, 250));
        window.addEventListener('mousemove', debounce(handleMouseMove, 16));
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
        initializeAnimations();
        initializeEventListeners();
        
        // Set initial state
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            const color = activeLink.getAttribute('data-color') || '#FF6B6B';
            activeNavColor = color;
            animateNavbarColors(color);
        }
        
        // Initial scroll state
        handleScroll();
        
        // Welcome animation
        setTimeout(() => {
            showColorNotification('Welcome to Colorful!', activeNavColor);
        }, 1000);
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose functions for debugging
    if (typeof window !== 'undefined') {
        window.GradientNavbar = {
            cycleTheme,
            setActiveNavLink: (index) => {
                const links = Array.from(navLinks);
                if (links[index]) setActiveNavLink(links[index]);
            },
            showNotification: showColorNotification,
            closeAll: () => {
                closeMobileMenu();
                closeDropdown();
            }
        };
    }

})();