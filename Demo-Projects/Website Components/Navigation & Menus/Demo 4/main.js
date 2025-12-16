// Glassmorphism Navbar JavaScript
(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('glassNavbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.getElementById('navIndicator');
    const profileDropdown = document.getElementById('profileDropdown');
    const profileBtn = document.getElementById('profileBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const notificationBtn = document.getElementById('notificationBtn');

    // State management
    let isProfileDropdownOpen = false;
    let isMobileMenuOpen = false;
    let activeNavIndex = 0;

    // Initialize navigation indicator
    function initNavIndicator() {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink && navIndicator) {
            updateIndicatorPosition(activeLink);
        }
    }

    // Update navigation indicator position
    function updateIndicatorPosition(activeLink) {
        if (!navIndicator || !activeLink) return;
        
        const linkRect = activeLink.getBoundingClientRect();
        const navPillRect = activeLink.closest('.nav-pill').getBoundingClientRect();
        
        const left = linkRect.left - navPillRect.left;
        const width = linkRect.width;
        
        navIndicator.style.left = `${left}px`;
        navIndicator.style.width = `${width}px`;
        navIndicator.style.height = `${linkRect.height}px`;
        navIndicator.style.top = `${linkRect.top - navPillRect.top}px`;
    }

    // Navigation Functions
    function setActiveNav(clickedLink, index) {
        // Remove active from all nav links
        [...navLinks, ...mobileNavLinks].forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active to clicked link
        clickedLink.classList.add('active');
        
        // Find corresponding link and activate it
        const linkText = clickedLink.textContent.trim() || 
                         clickedLink.querySelector('span:last-child')?.textContent.trim();
        
        [...navLinks, ...mobileNavLinks].forEach(link => {
            const text = link.textContent.trim() || 
                        link.querySelector('span:last-child')?.textContent.trim();
            if (text === linkText && link !== clickedLink) {
                link.classList.add('active');
            }
        });
        
        // Update indicator for desktop nav
        if (Array.from(navLinks).includes(clickedLink)) {
            activeNavIndex = index;
            updateIndicatorPosition(clickedLink);
        }
    }

    // Profile Dropdown Functions
    function toggleProfileDropdown() {
        isProfileDropdownOpen = !isProfileDropdownOpen;
        
        if (isProfileDropdownOpen) {
            openProfileDropdown();
        } else {
            closeProfileDropdown();
        }
    }

    function openProfileDropdown() {
        profileDropdown.classList.add('active');
        
        // Add click animation to profile button
        profileBtn.style.transform = 'translateY(-1px) scale(0.98)';
        setTimeout(() => {
            profileBtn.style.transform = '';
        }, 150);
    }

    function closeProfileDropdown() {
        profileDropdown.classList.remove('active');
        isProfileDropdownOpen = false;
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
        mobileNav.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Close profile dropdown
        closeProfileDropdown();
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
        isMobileMenuOpen = false;
    }

    // Notification Functions
    function handleNotificationClick() {
        // Add click animation
        notificationBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            notificationBtn.style.transform = '';
        }, 150);
        
        // Hide notification dot (demo)
        const notificationDot = notificationBtn.querySelector('.notification-dot');
        if (notificationDot) {
            notificationDot.style.opacity = '0';
            setTimeout(() => {
                notificationDot.style.display = 'none';
            }, 300);
        }
    }

    // Outside Click Handler
    function handleDocumentClick(e) {
        // Close profile dropdown if clicking outside
        if (profileDropdown && !profileDropdown.contains(e.target) && isProfileDropdownOpen) {
            closeProfileDropdown();
        }
        
        // Close mobile menu if clicking outside
        if (mobileNav && !mobileNav.contains(e.target) && 
            !mobileToggle.contains(e.target) && isMobileMenuOpen) {
            closeMobileMenu();
        }
    }

    // Keyboard Navigation
    function handleKeyDown(e) {
        switch (e.key) {
            case 'Escape':
                if (isProfileDropdownOpen) {
                    closeProfileDropdown();
                } else if (isMobileMenuOpen) {
                    closeMobileMenu();
                }
                break;
                
            case 'ArrowLeft':
            case 'ArrowRight':
                if (window.innerWidth > 768 && !isProfileDropdownOpen && !isMobileMenuOpen) {
                    e.preventDefault();
                    navigateWithArrows(e.key === 'ArrowRight');
                }
                break;
        }
    }

    // Arrow key navigation
    function navigateWithArrows(isRight) {
        const direction = isRight ? 1 : -1;
        const newIndex = (activeNavIndex + direction + navLinks.length) % navLinks.length;
        
        if (navLinks[newIndex]) {
            setActiveNav(navLinks[newIndex], newIndex);
        }
    }

    // Scroll Effects
    function handleScroll() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            navbar.style.background = 'rgba(255, 255, 255, 0.15)';
            navbar.style.borderColor = 'rgba(255, 255, 255, 0.25)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.25)';
            navbar.style.borderColor = 'rgba(255, 255, 255, 0.18)';
        }
    }

    // Window Resize Handler
    function handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && isMobileMenuOpen) {
            closeMobileMenu();
        }
        
        // Update indicator position on resize
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink && window.innerWidth > 768) {
            setTimeout(() => {
                updateIndicatorPosition(activeLink);
            }, 100);
        }
    }

    // Add entrance animation
    function addEntranceAnimation() {
        navbar.style.transform = 'translateX(-50%) translateY(-100px)';
        navbar.style.opacity = '0';
        navbar.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            navbar.style.transform = 'translateX(-50%) translateY(0)';
            navbar.style.opacity = '1';
        }, 200);
    }

    // Smooth scrolling for anchor links
    function smoothScrollToSection(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 120;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Initialize Event Listeners
    function initializeEventListeners() {
        // Desktop navigation links
        navLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') {
                    e.preventDefault();
                }
                
                setActiveNav(this, index);
                
                // Handle anchor links
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    smoothScrollToSection(href);
                }
            });
        });

        // Mobile navigation links
        mobileNavLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') {
                    e.preventDefault();
                }
                
                setActiveNav(this, index);
                
                // Close mobile menu
                setTimeout(closeMobileMenu, 200);
                
                // Handle anchor links
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    setTimeout(() => {
                        smoothScrollToSection(href);
                    }, 300);
                }
            });
        });

        // Profile dropdown
        if (profileBtn) {
            profileBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleProfileDropdown();
            });
        }

        // Dropdown items
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                // Add click animation
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                closeProfileDropdown();
            });
        });

        // Mobile toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMobileMenu();
            });
        }

        // Notification button
        if (notificationBtn) {
            notificationBtn.addEventListener('click', handleNotificationClick);
        }

        // Global event listeners
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', debounce(handleScroll, 16));
        window.addEventListener('resize', debounce(handleResize, 250));
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
        initializeEventListeners();
        initNavIndicator();
        addEntranceAnimation();
        
        // Set initial active nav index
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            activeNavIndex = Array.from(navLinks).indexOf(activeLink);
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
        window.GlassmorphismNavbar = {
            toggleProfileDropdown,
            toggleMobileMenu,
            setActiveNav: (index) => {
                if (navLinks[index]) {
                    setActiveNav(navLinks[index], index);
                }
            },
            closeAll: () => {
                closeProfileDropdown();
                closeMobileMenu();
            }
        };
    }

})();