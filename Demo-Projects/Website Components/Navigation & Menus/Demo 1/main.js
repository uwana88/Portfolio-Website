// Modern Responsive Navbar JavaScript
(function() {
    'use strict';

    // DOM Elements
    const mobileToggle = document.getElementById('mobileToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const dropdown = document.getElementById('servicesDropdown');
    const dropdownToggle = dropdown?.querySelector('.dropdown-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    function toggleMobileMenu() {
        const isActive = navbarMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        navbarMenu.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    function closeMobileMenu() {
        navbarMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        dropdown?.classList.remove('active'); // Close dropdown too
        document.body.style.overflow = ''; // Restore scroll
    }

    // Dropdown functionality
    function toggleDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = dropdown.classList.contains('active');
        
        if (isActive) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }

    function openDropdown() {
        dropdown.classList.add('active');
    }

    function closeDropdown() {
        dropdown.classList.remove('active');
    }

    // Close dropdown when clicking outside
    function handleDocumentClick(e) {
        if (dropdown && !dropdown.contains(e.target)) {
            closeDropdown();
        }
        
        // Close mobile menu when clicking outside
        if (window.innerWidth <= 768 && 
            navbarMenu.classList.contains('active') && 
            !navbarMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    }

    // Handle active nav link
    function setActiveNavLink(clickedLink) {
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link (if not dropdown toggle)
        if (!clickedLink.classList.contains('dropdown-toggle')) {
            clickedLink.classList.add('active');
        }
    }

    // Navbar scroll effect
    function handleScroll() {
        const scrolled = window.scrollY > 20;
        
        if (scrolled) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    }

    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 768) {
            // Close mobile menu if open when resizing to desktop
            closeMobileMenu();
            
            // Reset dropdown behavior for desktop
            if (dropdown) {
                dropdown.addEventListener('mouseenter', openDropdown);
                dropdown.addEventListener('mouseleave', closeDropdown);
            }
        } else {
            // Remove mouse events for mobile
            if (dropdown) {
                dropdown.removeEventListener('mouseenter', openDropdown);
                dropdown.removeEventListener('mouseleave', closeDropdown);
            }
        }
    }

    // Initialize event listeners
    function init() {
        // Mobile toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', toggleMobileMenu);
        }

        // Dropdown toggle
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', toggleDropdown);
        }

        // Nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // For demo purposes, prevent default navigation
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                setActiveNavLink(this);
                
                // Close mobile menu after clicking a link
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        closeMobileMenu();
                    }, 150);
                }
            });
        });

        // Document click handler
        document.addEventListener('click', handleDocumentClick);

        // Scroll handler
        window.addEventListener('scroll', handleScroll);

        // Resize handler
        window.addEventListener('resize', handleResize);

        // Initial resize call
        handleResize();

        // Desktop dropdown hover (initial setup)
        if (dropdown && window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', openDropdown);
            dropdown.addEventListener('mouseleave', closeDropdown);
        }

        // Keyboard navigation support
        document.addEventListener('keydown', function(e) {
            // Close menus on Escape
            if (e.key === 'Escape') {
                closeMobileMenu();
                closeDropdown();
            }
        });
    }

    // Smooth scrolling polyfill for older browsers
    function smoothScrollTo(element) {
        if ('scrollBehavior' in document.documentElement.style) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Fallback for older browsers
            const targetPosition = element.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Performance optimization: Debounce scroll handler
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

    // Apply debouncing to scroll handler
    const debouncedScrollHandler = debounce(handleScroll, 16); // ~60fps
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', debouncedScrollHandler);

})();