// Minimal Clean Navbar JavaScript
(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('minimalNavbar');
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const languageSelector = document.getElementById('languageSelector');
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const mobileBtn = document.getElementById('mobileBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const languageOptions = document.querySelectorAll('.language-option');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    const quickLinks = document.querySelectorAll('.quick-link');

    // State management
    let isSearchOpen = false;
    let isLanguageOpen = false;
    let isMobileMenuOpen = false;

    // Scroll Effect
    function handleScroll() {
        const scrolled = window.pageYOffset > 20;
        
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Search Functions
    function openSearch() {
        searchOverlay.classList.add('active');
        isSearchOpen = true;
        document.body.style.overflow = 'hidden';
        
        // Focus search input after animation
        setTimeout(() => {
            searchInput.focus();
        }, 200);
        
        // Close other menus
        closeMobileMenu();
        closeLanguageDropdown();
    }

    function closeSearch() {
        searchOverlay.classList.remove('active');
        isSearchOpen = false;
        document.body.style.overflow = '';
        searchInput.value = '';
    }

    function toggleSearch() {
        if (isSearchOpen) {
            closeSearch();
        } else {
            openSearch();
        }
    }

    // Language Dropdown Functions
    function toggleLanguageDropdown() {
        if (isLanguageOpen) {
            closeLanguageDropdown();
        } else {
            openLanguageDropdown();
        }
    }

    function openLanguageDropdown() {
        languageSelector.classList.add('active');
        isLanguageOpen = true;
        closeMobileMenu();
    }

    function closeLanguageDropdown() {
        languageSelector.classList.remove('active');
        isLanguageOpen = false;
    }

    // Mobile Menu Functions
    function toggleMobileMenu() {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileBtn.classList.add('active');
        isMobileMenuOpen = true;
        document.body.style.overflow = 'hidden';
        
        // Close other menus
        closeLanguageDropdown();
        closeSearch();
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileBtn.classList.remove('active');
        isMobileMenuOpen = false;
        document.body.style.overflow = '';
    }

    // Navigation Functions
    function setActiveNavLink(clickedLink) {
        // Remove active from all nav links
        [...navLinks, ...mobileLinks].forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active to clicked link
        clickedLink.classList.add('active');
        
        // Find corresponding link and activate it too
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
    }

    // Language Selection
    function selectLanguage(option) {
        // Update button text
        const languageText = option.textContent.substring(0, 2).toUpperCase();
        languageBtn.querySelector('.language-text').textContent = languageText;
        
        // Update active state
        languageOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Close dropdown
        closeLanguageDropdown();
        
        // Show feedback
        showNotification(`Language changed to ${option.textContent}`);
    }

    // Search Functions
    function performSearch(query) {
        if (query.trim()) {
            console.log('Searching for:', query);
            showNotification(`Searching for: "${query}"`);
            closeSearch();
        }
    }

    function handleSearchInput(e) {
        const query = e.target.value;
        
        // Add typing animation or search suggestions here
        if (query.length > 2) {
            // In a real app, you might show search results
            console.log('Live search:', query);
        }
    }

    // Suggestion Tag Clicks
    function handleSuggestionClick(tag) {
        const query = tag.textContent.trim();
        searchInput.value = query;
        performSearch(query);
    }

    // Quick Link Clicks
    function handleQuickLinkClick(link, e) {
        e.preventDefault();
        const destination = link.querySelector('span').textContent;
        showNotification(`Navigating to ${destination}`);
        closeSearch();
    }

    // Notification System
    function showNotification(message) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 32px;
            background: #1a1a1a;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 400;
            z-index: 10000;
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
        }, 3000);
    }

    // Outside Click Handler
    function handleDocumentClick(e) {
        // Close language dropdown if clicking outside
        if (!languageSelector.contains(e.target) && isLanguageOpen) {
            closeLanguageDropdown();
        }
        
        // Close search if clicking on overlay
        if (e.target === searchOverlay && isSearchOpen) {
            closeSearch();
        }
        
        // Close mobile menu if clicking outside
        if (isMobileMenuOpen && 
            !mobileMenu.contains(e.target) && 
            !mobileBtn.contains(e.target)) {
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
                } else if (isLanguageOpen) {
                    closeLanguageDropdown();
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
        
        // Close language dropdown on resize
        if (isLanguageOpen) {
            closeLanguageDropdown();
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
        // Search functionality
        if (searchBtn) {
            searchBtn.addEventListener('click', toggleSearch);
        }
        
        if (searchClose) {
            searchClose.addEventListener('click', closeSearch);
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', handleSearchInput);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch(searchInput.value);
                }
            });
        }

        // Language selector
        if (languageBtn) {
            languageBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleLanguageDropdown();
            });
        }

        // Language options
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                selectLanguage(this);
            });
        });

        // Mobile menu
        if (mobileBtn) {
            mobileBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMobileMenu();
            });
        }

        // Navigation links
        [...navLinks, ...mobileLinks].forEach(link => {
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

        // Contact links
        document.querySelectorAll('.contact-link, .mobile-contact-btn').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                showNotification('Opening contact form...');
                closeMobileMenu();
            });
        });

        // Social links
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.getAttribute('aria-label');
                showNotification(`Opening ${platform}...`);
            });
        });

        // Suggestion tags
        suggestionTags.forEach(tag => {
            tag.addEventListener('click', function() {
                handleSuggestionClick(this);
            });
        });

        // Quick links
        quickLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                handleQuickLinkClick(this, e);
            });
        });

        // Global event listeners
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', debounce(handleScroll, 10));
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
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose functions for debugging
    if (typeof window !== 'undefined') {
        window.MinimalNavbar = {
            toggleSearch,
            toggleMobileMenu,
            toggleLanguageDropdown,
            showNotification,
            closeAll: () => {
                closeSearch();
                closeMobileMenu();
                closeLanguageDropdown();
            }
        };
    }

})();