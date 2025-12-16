// Mega Menu Navbar JavaScript
(function() {
    'use strict';

    // DOM Elements
    const navbar = document.querySelector('.mega-navbar');
    const navItems = document.querySelectorAll('.nav-item');
    const megaMenuItems = document.querySelectorAll('.has-mega-menu');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    
    // Mobile dropdown elements
    const mobileProductsDropdown = document.getElementById('mobileProductsDropdown');
    const mobileProductsTrigger = document.getElementById('mobileProductsTrigger');
    const mobileProductsContent = document.getElementById('mobileProductsContent');
    const mobileServicesDropdown = document.getElementById('mobileServicesDropdown');
    const mobileServicesTrigger = document.getElementById('mobileServicesTrigger');
    const mobileServicesContent = document.getElementById('mobileServicesContent');
    
    // All navigation links
    const navLinks = document.querySelectorAll('.nav-link:not(.has-mega-menu .nav-link)');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // State management
    let isMobileMenuOpen = false;
    let isSearchOpen = false;
    let activeMegaMenu = null;
    let isMobileProductsOpen = false;
    let isMobileServicesOpen = false;
    let megaMenuTimeout = null;

    // Mega Menu Functions
    function showMegaMenu(menuItem) {
        // Clear any existing timeout
        if (megaMenuTimeout) {
            clearTimeout(megaMenuTimeout);
        }
        
        // Hide all other mega menus
        megaMenuItems.forEach(item => {
            if (item !== menuItem) {
                item.classList.remove('active');
            }
        });
        
        // Show current mega menu
        menuItem.classList.add('active');
        activeMegaMenu = menuItem;
    }

    function hideMegaMenu(menuItem) {
        megaMenuTimeout = setTimeout(() => {
            menuItem.classList.remove('active');
            if (activeMegaMenu === menuItem) {
                activeMegaMenu = null;
            }
        }, 100);
    }

    function hideAllMegaMenus() {
        megaMenuItems.forEach(item => {
            item.classList.remove('active');
        });
        activeMegaMenu = null;
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
        
        // Close search if open
        closeSearch();
        hideAllMegaMenus();
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
        isMobileMenuOpen = false;
        
        // Close mobile dropdowns
        closeMobileDropdowns();
    }

    // Mobile Dropdown Functions
    function toggleMobileProductsDropdown() {
        isMobileProductsOpen = !isMobileProductsOpen;
        
        if (isMobileProductsOpen) {
            mobileProductsDropdown.classList.add('active');
            // Close services dropdown
            mobileServicesDropdown.classList.remove('active');
            isMobileServicesOpen = false;
        } else {
            mobileProductsDropdown.classList.remove('active');
        }
    }

    function toggleMobileServicesDropdown() {
        isMobileServicesOpen = !isMobileServicesOpen;
        
        if (isMobileServicesOpen) {
            mobileServicesDropdown.classList.add('active');
            // Close products dropdown
            mobileProductsDropdown.classList.remove('active');
            isMobileProductsOpen = false;
        } else {
            mobileServicesDropdown.classList.remove('active');
        }
    }

    function closeMobileDropdowns() {
        mobileProductsDropdown.classList.remove('active');
        mobileServicesDropdown.classList.remove('active');
        isMobileProductsOpen = false;
        isMobileServicesOpen = false;
    }

    // Search Functions
    function toggleSearch() {
        isSearchOpen = !isSearchOpen;
        
        if (isSearchOpen) {
            openSearch();
        } else {
            closeSearch();
        }
    }

    function openSearch() {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus search input after animation
        setTimeout(() => {
            searchInput.focus();
        }, 200);
        
        // Close other menus
        closeMobileMenu();
        hideAllMegaMenus();
    }

    function closeSearch() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        isSearchOpen = false;
    }

    // Navigation Functions
    function setActiveNavLink(clickedLink) {
        // Remove active from all nav links
        [...navLinks, ...mobileNavLinks].forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active to clicked link
        clickedLink.classList.add('active');
        
        // Find corresponding link and activate it
        const linkText = clickedLink.textContent.trim();
        [...navLinks, ...mobileNavLinks].forEach(link => {
            if (link.textContent.trim() === linkText && link !== clickedLink) {
                link.classList.add('active');
            }
        });
    }

    // Outside Click Handler
    function handleDocumentClick(e) {
        // Close mega menus if clicking outside
        if (!e.target.closest('.has-mega-menu') && activeMegaMenu) {
            hideAllMegaMenus();
        }
        
        // Close search if clicking on overlay
        if (e.target === searchOverlay && isSearchOpen) {
            closeSearch();
        }
        
        // Close mobile menu if clicking outside
        if (isMobileMenuOpen && 
            !mobileNav.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    }

    // Keyboard Navigation
    function handleKeyDown(e) {
        switch (e.key) {
            case 'Escape':
                if (isSearchOpen) {
                    closeSearch();
                } else if (isMobileMenuOpen) {
                    closeMobileMenu();
                } else if (activeMegaMenu) {
                    hideAllMegaMenus();
                }
                break;
                
            case 'Enter':
                if (e.target === searchInput && searchInput.value.trim()) {
                    performSearch(searchInput.value.trim());
                }
                break;
        }
    }

    // Search Functionality
    function performSearch(query) {
        console.log('Searching for:', query);
        // In a real application, this would trigger an actual search
        closeSearch();
        
        // Show search feedback (demo)
        showSearchFeedback(`Searching for: "${query}"`);
    }

    function showSearchFeedback(message) {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: #2563eb;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        `;
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 3000);
    }

    // Scroll Effects
    function handleScroll() {
        const scrolled = window.scrollY > 20;
        
        if (scrolled) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            navbar.style.borderBottomColor = '#d1d5db';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            navbar.style.borderBottomColor = '#e5e7eb';
        }
    }

    // Window Resize Handler
    function handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && isMobileMenuOpen) {
            closeMobileMenu();
        }
        
        // Close search on mobile
        if (window.innerWidth <= 768 && isSearchOpen) {
            closeSearch();
        }
    }

    // Smooth Scrolling
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

    // Add CSS for animations
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize Event Listeners
    function initializeEventListeners() {
        // Mega menu hover events
        megaMenuItems.forEach(menuItem => {
            const megaMenu = menuItem.querySelector('.mega-menu');
            
            menuItem.addEventListener('mouseenter', () => {
                showMegaMenu(menuItem);
            });
            
            menuItem.addEventListener('mouseleave', () => {
                hideMegaMenu(menuItem);
            });
            
            // Prevent menu from hiding when hovering over mega menu content
            if (megaMenu) {
                megaMenu.addEventListener('mouseenter', () => {
                    if (megaMenuTimeout) {
                        clearTimeout(megaMenuTimeout);
                    }
                });
                
                megaMenu.addEventListener('mouseleave', () => {
                    hideMegaMenu(menuItem);
                });
            }
        });

        // Regular navigation links
        [...navLinks, ...mobileNavLinks].forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') {
                    e.preventDefault();
                }
                
                setActiveNavLink(this);
                
                // Close mobile menu after clicking
                if (isMobileMenuOpen) {
                    setTimeout(closeMobileMenu, 200);
                }
                
                // Handle anchor links
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    smoothScrollToSection(href);
                }
            });
        });

        // Mega menu links
        document.querySelectorAll('.mega-link, .mega-link-simple').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                // Add click animation
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                hideAllMegaMenus();
            });
        });

        // Mobile menu toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMobileMenu();
            });
        }

        // Mobile dropdown triggers
        if (mobileProductsTrigger) {
            mobileProductsTrigger.addEventListener('click', toggleMobileProductsDropdown);
        }
        
        if (mobileServicesTrigger) {
            mobileServicesTrigger.addEventListener('click', toggleMobileServicesDropdown);
        }

        // Mobile dropdown links
        document.querySelectorAll('.mobile-dropdown-link').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                closeMobileMenu();
            });
        });

        // Search functionality
        if (searchToggle) {
            searchToggle.addEventListener('click', toggleSearch);
        }
        
        if (searchClose) {
            searchClose.addEventListener('click', closeSearch);
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && this.value.trim()) {
                    performSearch(this.value.trim());
                }
            });
        }

        // CTA buttons
        document.querySelectorAll('.cta-btn, .demo-btn, .mobile-cta-btn, .mobile-demo-btn, .featured-cta').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

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
        addAnimationStyles();
        initializeEventListeners();
        
        // Set initial scroll effect
        handleScroll();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose functions for debugging
    if (typeof window !== 'undefined') {
        window.MegaMenuNavbar = {
            toggleMobileMenu,
            toggleSearch,
            showMegaMenu: (index) => {
                if (megaMenuItems[index]) {
                    showMegaMenu(megaMenuItems[index]);
                }
            },
            closeAll: () => {
                closeMobileMenu();
                closeSearch();
                hideAllMegaMenus();
            }
        };
    }

})();