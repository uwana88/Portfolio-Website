// Dark Corporate Navbar JavaScript
(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('corporateNavbar');
    const navLinks = document.querySelectorAll('.nav-link:not(.mega-trigger)');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const solutionsMega = document.getElementById('solutionsMega');
    const megaTrigger = solutionsMega?.querySelector('.mega-trigger');
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const accountDropdown = document.getElementById('accountDropdown');
    const accountBtn = document.getElementById('accountBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const mobileSolutionsMega = document.getElementById('mobileSolutionsMega');
    const mobileSolutionsTrigger = document.getElementById('mobileSolutionsTrigger');
    const mobileSolutionsContent = document.getElementById('mobileSolutionsContent');

    // State management
    let isMegaMenuOpen = false;
    let isSearchOpen = false;
    let isAccountOpen = false;
    let isMobileMenuOpen = false;
    let isMobileMegaOpen = false;

    // Scroll Effect
    function handleScroll() {
        const scrolled = window.pageYOffset > 30;
        
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Navigation Functions
    function setActiveNavLink(clickedLink) {
        // Remove active from all links
        [...navLinks, ...mobileNavItems].forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active to clicked link
        clickedLink.classList.add('active');
        
        // Find corresponding link and activate it
        const linkText = clickedLink.textContent.trim();
        [...navLinks, ...mobileNavItems].forEach(link => {
            if (link.textContent.trim() === linkText && link !== clickedLink) {
                link.classList.add('active');
            }
        });
        
        // Close mobile menu after selection
        if (isMobileMenuOpen) {
            setTimeout(closeMobileMenu, 300);
        }
        
        // Show enterprise notification
        showEnterpriseNotification(`Navigated to ${linkText}`);
    }

    // Mega Menu Functions
    function toggleMegaMenu() {
        isMegaMenuOpen = !isMegaMenuOpen;
        
        if (isMegaMenuOpen) {
            openMegaMenu();
        } else {
            closeMegaMenu();
        }
    }

    function openMegaMenu() {
        if (solutionsMega) {
            solutionsMega.classList.add('active');
        }
        closeAccountDropdown();
        closeSearch();
    }

    function closeMegaMenu() {
        if (solutionsMega) {
            solutionsMega.classList.remove('active');
            isMegaMenuOpen = false;
        }
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
        closeMegaMenu();
        closeAccountDropdown();
        closeMobileMenu();
    }

    function closeSearch() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        isSearchOpen = false;
    }

    function performSearch(query) {
        if (query.trim()) {
            console.log('Enterprise search for:', query);
            showEnterpriseNotification(`Searching: "${query}"`);
            closeSearch();
        }
    }

    // Account Dropdown Functions
    function toggleAccountDropdown() {
        isAccountOpen = !isAccountOpen;
        
        if (isAccountOpen) {
            openAccountDropdown();
        } else {
            closeAccountDropdown();
        }
    }

    function openAccountDropdown() {
        accountDropdown.classList.add('active');
        closeMegaMenu();
        closeSearch();
    }

    function closeAccountDropdown() {
        accountDropdown.classList.remove('active');
        isAccountOpen = false;
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
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Close other menus
        closeMegaMenu();
        closeAccountDropdown();
        closeSearch();
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
        isMobileMenuOpen = false;
        
        // Close mobile mega menu
        closeMobileMegaMenu();
    }

    // Mobile Mega Menu Functions
    function toggleMobileMegaMenu() {
        isMobileMegaOpen = !isMobileMegaOpen;
        
        if (isMobileMegaOpen) {
            openMobileMegaMenu();
        } else {
            closeMobileMegaMenu();
        }
    }

    function openMobileMegaMenu() {
        if (mobileSolutionsMega) {
            mobileSolutionsMega.classList.add('active');
        }
    }

    function closeMobileMegaMenu() {
        if (mobileSolutionsMega) {
            mobileSolutionsMega.classList.remove('active');
            isMobileMegaOpen = false;
        }
    }

    // Enterprise Notification System
    function showEnterpriseNotification(message) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.enterprise-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'enterprise-notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(14, 165, 233, 0.4);
            color: #e2e8f0;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Animate out
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3500);
    }

    // Outside Click Handler
    function handleDocumentClick(e) {
        // Close mega menu if clicking outside
        if (solutionsMega && !solutionsMega.contains(e.target) && isMegaMenuOpen) {
            closeMegaMenu();
        }
        
        // Close account dropdown if clicking outside
        if (accountDropdown && !accountDropdown.contains(e.target) && isAccountOpen) {
            closeAccountDropdown();
        }
        
        // Close search if clicking on overlay
        if (e.target === searchOverlay && isSearchOpen) {
            closeSearch();
        }
        
        // Close mobile menu if clicking outside
        if (isMobileMenuOpen && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
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
                } else if (isAccountOpen) {
                    closeAccountDropdown();
                } else if (isMegaMenuOpen) {
                    closeMegaMenu();
                }
                break;
                
            case 'Enter':
                if (e.target === searchInput) {
                    performSearch(searchInput.value);
                }
                break;
                
            case '/':
                if (!isSearchOpen && e.target.tagName !== 'INPUT') {
                    e.preventDefault();
                    openSearch();
                }
                break;
                
            case 'k':
                if ((e.metaKey || e.ctrlKey) && !isSearchOpen) {
                    e.preventDefault();
                    openSearch();
                }
                break;
        }
    }

    // Window Resize Handler
    function handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && isMobileMenuOpen) {
            closeMobileMenu();
        }
        
        // Close other menus on resize
        if (isAccountOpen) {
            closeAccountDropdown();
        }
        
        if (isMegaMenuOpen && window.innerWidth <= 768) {
            closeMegaMenu();
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

    // Initialize Event Listeners
    function initializeEventListeners() {
        // Navigation links
        [...navLinks, ...mobileNavItems].forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') {
                    e.preventDefault();
                }
                
                setActiveNavLink(this);
                
                // Handle anchor links
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    smoothScrollToSection(href);
                }
            });
        });

        // Mega menu trigger
        if (megaTrigger) {
            megaTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                toggleMegaMenu();
            });
        }

        // Mega menu links
        document.querySelectorAll('.mega-link').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                const service = this.querySelector('strong').textContent;
                showEnterpriseNotification(`Selected: ${service}`);
                closeMegaMenu();
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
                if (e.key === 'Enter') {
                    performSearch(this.value);
                }
            });
        }

        // Search categories
        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', function() {
                const category = this.textContent.trim();
                searchInput.value = category;
                performSearch(category);
            });
        });

        // Account dropdown
        if (accountBtn) {
            accountBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleAccountDropdown();
            });
        }

        // Account menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                const action = this.textContent.trim();
                if (action === 'Sign Out') {
                    showEnterpriseNotification('Signing out...');
                } else {
                    showEnterpriseNotification(`Opening ${action}...`);
                }
                closeAccountDropdown();
            });
        });

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

        // Mobile mega menu
        if (mobileSolutionsTrigger) {
            mobileSolutionsTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                toggleMobileMegaMenu();
            });
        }

        // Mobile mega links
        document.querySelectorAll('.mobile-mega-link').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                const service = this.textContent.trim();
                showEnterpriseNotification(`Selected: ${service}`);
                closeMobileMenu();
            });
        });

        // CTA buttons
        document.querySelectorAll('.contact-btn, .demo-btn, .mobile-contact-btn, .mobile-demo-btn, .highlight-cta').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                const action = this.textContent.trim();
                showEnterpriseNotification(`${action} - Enterprise team will contact you`);
                closeMobileMenu();
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

    // Add enterprise-specific CSS animations
    function addEnterpriseAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .nav-link.active {
                position: relative;
            }
            
            .nav-link.active::before {
                content: '';
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(59, 130, 246, 0.1));
                border-radius: 8px;
                z-index: -1;
            }
            
            .mega-link:hover .link-icon {
                transform: scale(1.1);
                transition: transform 0.3s ease;
            }
            
            .account-btn:hover .account-avatar {
                transform: scale(1.05);
                transition: transform 0.3s ease;
            }
            
            .category-item:hover .category-icon {
                transform: scale(1.1);
                color: #38bdf8;
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize everything
    function init() {
        addEnterpriseAnimations();
        initializeEventListeners();
        
        // Set initial scroll state
        handleScroll();
        
        // Set initial active nav link
        const activeNavLink = document.querySelector('.nav-link.active');
        if (!activeNavLink) {
            const firstNavLink = document.querySelector('.nav-link');
            if (firstNavLink) {
                firstNavLink.classList.add('active');
            }
        }
        
        // Welcome message for enterprise users
        setTimeout(() => {
            showEnterpriseNotification('Welcome to CorpTech Enterprise Portal');
        }, 1500);
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose functions for debugging
    if (typeof window !== 'undefined') {
        window.CorporateNavbar = {
            toggleSearch,
            toggleMobileMenu,
            toggleAccountDropdown,
            toggleMegaMenu,
            showNotification: showEnterpriseNotification,
            closeAll: () => {
                closeMobileMenu();
                closeSearch();
                closeAccountDropdown();
                closeMegaMenu();
            }
        };
    }

})();