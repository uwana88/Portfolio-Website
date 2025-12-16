// Sidebar Navigation JavaScript
(function() {
    'use strict';

    // DOM Elements
    const sidebar = document.getElementById('sidebarNav');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const profileMenuBtn = document.getElementById('profileMenuBtn');
    const navLinks = document.querySelectorAll('.nav-link:not(.submenu-trigger)');
    const submenuTriggers = document.querySelectorAll('.submenu-trigger');
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    const upgradeBtn = document.querySelector('.upgrade-btn');

    // Submenu elements
    const analyticsSubmenu = document.getElementById('analyticsSubmenu');
    const settingsSubmenu = document.getElementById('settingsSubmenu');

    // State management
    let isSidebarCollapsed = false;
    let isMobileMenuOpen = false;
    let activeSubmenu = null;

    // Sidebar Toggle Functions
    function toggleSidebar() {
        if (window.innerWidth <= 768) {
            toggleMobileSidebar();
        } else if (window.innerWidth <= 1024) {
            // On tablet, keep collapsed
            return;
        } else {
            toggleDesktopSidebar();
        }
    }

    function toggleDesktopSidebar() {
        isSidebarCollapsed = !isSidebarCollapsed;
        
        if (isSidebarCollapsed) {
            sidebar.classList.add('collapsed');
            closeAllSubmenus();
        } else {
            sidebar.classList.remove('collapsed');
        }
        
        // Store preference
        localStorage.setItem('sidebarCollapsed', isSidebarCollapsed);
    }

    function toggleMobileSidebar() {
        isMobileMenuOpen = !isMobileMenuOpen;
        
        if (isMobileMenuOpen) {
            openMobileSidebar();
        } else {
            closeMobileSidebar();
        }
    }

    function openMobileSidebar() {
        sidebar.classList.add('mobile-open');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileSidebar() {
        sidebar.classList.remove('mobile-open');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        isMobileMenuOpen = false;
    }

    // Submenu Functions
    function toggleSubmenu(submenuElement) {
        const isCurrentlyOpen = submenuElement.classList.contains('open');
        
        // Close all submenus first
        closeAllSubmenus();
        
        // Open the clicked submenu if it wasn't already open
        if (!isCurrentlyOpen && !isSidebarCollapsed) {
            submenuElement.classList.add('open');
            activeSubmenu = submenuElement;
        }
    }

    function closeAllSubmenus() {
        document.querySelectorAll('.has-submenu').forEach(submenu => {
            submenu.classList.remove('open');
        });
        activeSubmenu = null;
    }

    // Navigation Functions
    function setActiveNavLink(clickedLink) {
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        clickedLink.classList.add('active');
        
        // Close mobile sidebar after selection
        if (isMobileMenuOpen) {
            setTimeout(closeMobileSidebar, 200);
        }
    }

    // Quick Action Functions
    function handleQuickAction(btn) {
        const tooltip = btn.getAttribute('data-tooltip');
        
        // Add click animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
        
        // Show feedback (demo purposes)
        showNotification(`${tooltip} clicked`);
        
        // Handle notification badges
        const badge = btn.querySelector('.notification-badge');
        if (badge) {
            const currentCount = parseInt(badge.textContent) || 0;
            if (currentCount > 1) {
                badge.textContent = currentCount - 1;
            } else {
                badge.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    badge.remove();
                }, 300);
            }
        }
    }

    // Profile Menu
    function handleProfileMenu() {
        // Add click animation
        profileMenuBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            profileMenuBtn.style.transform = '';
        }, 150);
        
        showNotification('Profile menu clicked');
    }

    // Upgrade Button
    function handleUpgrade() {
        showNotification('Redirecting to upgrade page...');
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
            top: 20px;
            right: 20px;
            background: #1e293b;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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

    // Storage Animation
    function animateStorageBar() {
        const storageFill = document.querySelector('.storage-fill');
        if (storageFill) {
            const targetWidth = storageFill.style.width;
            storageFill.style.width = '0%';
            
            setTimeout(() => {
                storageFill.style.width = targetWidth;
            }, 500);
        }
    }

    // Window Resize Handler
    function handleResize() {
        const width = window.innerWidth;
        
        if (width <= 768) {
            // Mobile
            sidebar.classList.remove('collapsed');
            if (isMobileMenuOpen) {
                // Keep mobile menu state
            } else {
                closeMobileSidebar();
            }
        } else if (width <= 1024) {
            // Tablet - auto collapse
            sidebar.classList.add('collapsed');
            closeMobileSidebar();
            closeAllSubmenus();
        } else {
            // Desktop - restore saved state
            const savedState = localStorage.getItem('sidebarCollapsed') === 'true';
            if (savedState) {
                sidebar.classList.add('collapsed');
                closeAllSubmenus();
            } else {
                sidebar.classList.remove('collapsed');
            }
            closeMobileSidebar();
        }
    }

    // Outside Click Handler
    function handleDocumentClick(e) {
        // Close mobile sidebar if clicking outside
        if (isMobileMenuOpen && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target)) {
            closeMobileSidebar();
        }
        
        // Close submenus if clicking outside sidebar
        if (!sidebar.contains(e.target) && activeSubmenu) {
            closeAllSubmenus();
        }
    }

    // Keyboard Navigation
    function handleKeyDown(e) {
        switch (e.key) {
            case 'Escape':
                if (isMobileMenuOpen) {
                    closeMobileSidebar();
                } else if (activeSubmenu) {
                    closeAllSubmenus();
                }
                break;
                
            case '[':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    toggleSidebar();
                }
                break;
        }
    }

    // Add CSS animations
    function addCustomAnimations() {
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
                    transform: scale(0.8);
                }
            }
            
            .nav-link {
                position: relative;
                overflow: hidden;
            }
            
            .nav-link::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 0;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
                transition: width 0.5s ease;
            }
            
            .nav-link:hover::before {
                width: 100%;
            }
            
            .notification-badge {
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize Event Listeners
    function initializeEventListeners() {
        // Sidebar toggle
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', toggleSidebar);
        }

        // Mobile overlay
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', closeMobileSidebar);
        }

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') {
                    e.preventDefault();
                }
                
                setActiveNavLink(this);
            });
        });

        // Submenu triggers
        submenuTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const submenuElement = this.closest('.has-submenu');
                toggleSubmenu(submenuElement);
            });
        });

        // Submenu links
        document.querySelectorAll('.submenu-link').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') {
                    e.preventDefault();
                }
                
                // Close mobile sidebar after submenu selection
                if (isMobileMenuOpen) {
                    setTimeout(closeMobileSidebar, 200);
                }
                
                showNotification(`Navigated to ${this.textContent}`);
            });
        });

        // Quick action buttons
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                handleQuickAction(this);
            });
        });

        // Profile menu button
        if (profileMenuBtn) {
            profileMenuBtn.addEventListener('click', handleProfileMenu);
        }

        // Upgrade button
        if (upgradeBtn) {
            upgradeBtn.addEventListener('click', handleUpgrade);
        }

        // Global event listeners
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('keydown', handleKeyDown);
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
        addCustomAnimations();
        initializeEventListeners();
        
        // Set initial state based on screen size and saved preference
        handleResize();
        
        // Animate storage bar on load
        setTimeout(animateStorageBar, 1000);
        
        // Set initial active nav link
        const firstNavLink = document.querySelector('.nav-link.active');
        if (!firstNavLink) {
            const dashboardLink = document.querySelector('.nav-link');
            if (dashboardLink) {
                dashboardLink.classList.add('active');
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
        window.SidebarNavigation = {
            toggleSidebar,
            toggleSubmenu: (id) => {
                const submenu = document.getElementById(id);
                if (submenu) toggleSubmenu(submenu);
            },
            showNotification,
            closeAll: () => {
                closeMobileSidebar();
                closeAllSubmenus();
            }
        };
    }

})();