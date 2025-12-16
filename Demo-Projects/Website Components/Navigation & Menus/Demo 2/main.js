// Centered Logo Navbar JavaScript
(function() {
    'use strict';

    // DOM Elements
    const navbar = document.querySelector('.centered-navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const dropdown = document.getElementById('leftDropdown');
    const dropdownToggle = dropdown?.querySelector('.dropdown-toggle');
    
    // Search elements
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    
    // Mobile dropdown
    const mobileDropdownTrigger = document.getElementById('mobileDropdownTrigger');
    const mobileDropdownContent = document.getElementById('mobileDropdownContent');
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link:not(.dropdown-trigger)');

    // State management
    let isMenuOpen = false;
    let isSearchOpen = false;
    let isDropdownOpen = false;
    let isMobileDropdownOpen = false;

    // Mobile Menu Functions
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    }

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Close other menus
        closeSearch();
        closeDropdown();
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
        isMenuOpen = false;
        
        // Close mobile dropdown
        closeMobileDropdown();
    }

    // Dropdown Functions
    function toggleDropdown(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        isDropdownOpen = !isDropdownOpen;
        
        if (isDropdownOpen) {
            openDropdown();
        } else {
            closeDropdown();
        }
    }

    function openDropdown() {
        dropdown?.classList.add('active');
    }

    function closeDropdown() {
        dropdown?.classList.remove('active');
        isDropdownOpen = false;
    }

    // Mobile Dropdown Functions
    function toggleMobileDropdown() {
        isMobileDropdownOpen = !isMobileDropdownOpen;
        
        if (isMobileDropdownOpen) {
            openMobileDropdown();
        } else {
            closeMobileDropdown();
        }
    }

    function openMobileDropdown() {
        mobileDropdownContent.classList.add('active');
        mobileDropdownTrigger.classList.add('active');
    }

    function closeMobileDropdown() {
        mobileDropdownContent.classList.remove('active');
        mobileDropdownTrigger.classList.remove('active');
        isMobileDropdownOpen = false;
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
        closeDropdown();
    }

    function closeSearch() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        isSearchOpen = false;
    }

    // Navigation Functions
    function setActiveNavLink(clickedLink) {
        // Desktop nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Mobile nav links
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Set active
        clickedLink.classList.add('active');
        
        // Find corresponding link in mobile/desktop and activate
        const linkText = clickedLink.textContent.trim();
        const correspondingLinks = [...navLinks, ...mobileNavLinks].filter(link => 
            link.textContent.trim() === linkText && link !== clickedLink
        );
        
        correspondingLinks.forEach(link => {
            link.classList.add('active');
        });
    }

    // Navbar Scroll Effect
    function handleScroll() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.08)';
        }
    }

    // Outside Click Handler
    function handleDocumentClick(e) {
        // Close dropdown if clicking outside
        if (dropdown && !dropdown.contains(e.target) && isDropdownOpen) {
            closeDropdown();
        }
        
        // Close search if clicking outside
        if (searchOverlay && isSearchOpen && e.target === searchOverlay) {
            closeSearch();
        }
        
        // Close mobile menu if clicking outside
        if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    }

    // Keyboard Navigation
    function handleKeyDown(e) {
        switch (e.key) {
            case 'Escape':
                if (isSearchOpen) {
                    closeSearch();
                } else if (isMenuOpen) {
                    closeMobileMenu();
                } else if (isDropdownOpen) {
                    closeDropdown();
                }
                break;
                
            case 'Enter':
                if (e.target === searchInput && searchInput.value.trim()) {
                    performSearch(searchInput.value.trim());
                }
                break;
                
            case '/':
                if (!isSearchOpen && e.target !== searchInput) {
                    e.preventDefault();
                    openSearch();
                }
                break;
        }
    }

    // Search Functionality
    function performSearch(query) {
        console.log('Performing search for:', query);
        // In a real application, this would trigger an actual search
        closeSearch();
        
        // Show a simple notification (for demo purposes)
        showNotification(`Searching for: "${query}"`);
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Window Resize Handler
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        if (!isMobile) {
            // Close mobile menu when resizing to desktop
            closeMobileMenu();
            
            // Set up desktop hover behavior for dropdown
            if (dropdown) {
                dropdown.addEventListener('mouseenter', openDropdown);
                dropdown.addEventListener('mouseleave', closeDropdown);
            }
        } else {
            // Remove desktop hover behavior on mobile
            if (dropdown) {
                dropdown.removeEventListener('mouseenter', openDropdown);
                dropdown.removeEventListener('mouseleave', closeDropdown);
            }
        }
    }

    // Smooth Scroll to Anchor
    function smoothScrollToAnchor(anchor) {
        const target = document.querySelector(anchor);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Initialize Search Suggestions
    function initializeSearchSuggestions() {
        const suggestionTags = document.querySelectorAll('.suggestion-tag');
        
        suggestionTags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                const query = this.textContent.trim();
                searchInput.value = query;
                performSearch(query);
            });
        });
    }

    // Animation Utility
    function addLoadAnimation() {
        // Add CSS for animations
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

    // Event Listeners Setup
    function initializeEventListeners() {
        // Mobile menu toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', toggleMobileMenu);
        }

        // Desktop dropdown
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', toggleDropdown);
        }

        // Mobile dropdown
        if (mobileDropdownTrigger) {
            mobileDropdownTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                toggleMobileDropdown();
            });
        }

        // Search functionality
        if (searchToggle) {
            searchToggle.addEventListener('click', toggleSearch);
        }

        if (mobileSearchBtn) {
            mobileSearchBtn.addEventListener('click', function() {
                closeMobileMenu();
                setTimeout(openSearch, 300);
            });
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

        // Navigation links
        [...navLinks, ...mobileNavLinks].forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Handle demo links
                if (href === '#') {
                    e.preventDefault();
                }
                
                setActiveNavLink(this);
                
                // Close mobile menu after clicking
                if (isMenuOpen) {
                    setTimeout(closeMobileMenu, 150);
                }
                
                // Handle anchor links
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    smoothScrollToAnchor(href);
                }
            });
        });

        // Dropdown items
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                closeDropdown();
            });
        });

        // Mobile dropdown items
        document.querySelectorAll('.mobile-dropdown-link').forEach(item => {
            item.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
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

    // Initialize everything
    function init() {
        addLoadAnimation();
        initializeEventListeners();
        initializeSearchSuggestions();
        handleResize(); // Initial setup
        
        // Add entrance animation to navbar
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            navbar.style.transform = 'translateY(0)';
        }, 100);
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose some functions globally for debugging (optional)
    if (typeof window !== 'undefined') {
        window.CenteredNavbar = {
            toggleSearch,
            toggleMobileMenu,
            closeAll: function() {
                closeMobileMenu();
                closeSearch();
                closeDropdown();
            }
        };
    }

})();