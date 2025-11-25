// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // =====================
    // NAVIGATION FUNCTIONALITY
    // =====================

    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        // Animate hamburger menu
        const spans = mobileMenu.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (mobileMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translateY(6px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    }

    // Smooth scrolling for navigation links
    function handleSmoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        }
    }

    // Event listeners for navigation
    window.addEventListener('scroll', handleNavbarScroll);
    if (mobileMenu) mobileMenu.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // =====================
    // DASHBOARD FUNCTIONALITY
    // =====================

    // Dashboard tab switching
    const dashboardTabs = document.querySelectorAll('.dashboard-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(targetTab) {
        // Remove active class from all tabs and content
        dashboardTabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab
        const clickedTab = document.querySelector(`[data-tab="${targetTab}"]`);
        const targetContent = document.getElementById(targetTab);

        if (clickedTab && targetContent) {
            clickedTab.classList.add('active');
            targetContent.classList.add('active');
        }
    }

    dashboardTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    // Dashboard control buttons
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            controlBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Simulate data update
            updateFinancialData();
        });
    });

    // =====================
    // FINANCIAL DATA ANIMATION
    // =====================

    function updateFinancialData() {
        const financialCards = document.querySelectorAll('.financial-card');

        financialCards.forEach(card => {
            const valueElement = card.querySelector('.card-value');
            const trendElement = card.querySelector('.card-trend');

            if (valueElement && trendElement) {
                // Add loading state
                card.classList.add('loading');

                setTimeout(() => {
                    // Generate random variations for demo
                    const currentValue = valueElement.textContent;
                    const baseValue = parseFloat(currentValue.replace(/[^0-9.]/g, ''));
                    const variation = (Math.random() - 0.5) * 0.1; // ±10% variation
                    const newValue = baseValue * (1 + variation);

                    // Update value with animation
                    animateValue(valueElement, baseValue, newValue, currentValue);

                    // Update trend
                    const trendValue = (Math.random() - 0.5) * 20; // ±20% trend
                    const trendDirection = trendValue > 0 ? 'up' : trendValue < 0 ? 'down' : 'neutral';
                    const trendArrow = trendValue > 0 ? '↗' : trendValue < 0 ? '↘' : '→';

                    trendElement.className = `card-trend ${trendDirection}`;
                    trendElement.textContent = `${trendArrow} ${Math.abs(trendValue).toFixed(1)}%`;

                    card.classList.remove('loading');
                }, 1000);
            }
        });
    }

    function animateValue(element, start, end, originalFormat) {
        const duration = 1000;
        const startTime = performance.now();

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current = start + (end - start) * progress;

            // Format the value based on original format
            let formattedValue;
            if (originalFormat.includes('$')) {
                formattedValue = '$' + current.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
            } else if (originalFormat.includes('%')) {
                formattedValue = current.toFixed(1) + '%';
            } else {
                formattedValue = current.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
            }

            element.textContent = formattedValue;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }

    // =====================
    // CHART FUNCTIONALITY
    // =====================

    function initializeCharts() {
        const chartBars = document.querySelectorAll('.bar');

        chartBars.forEach(bar => {
            const value = bar.getAttribute('data-value');
            if (value) {
                // Set CSS custom property for height
                bar.style.setProperty('--value', value);

                // Add hover tooltip
                bar.addEventListener('mouseenter', function () {
                    showTooltip(this, value);
                });

                bar.addEventListener('mouseleave', function () {
                    hideTooltip();
                });
            }
        });

        // Animate bars on load
        setTimeout(() => {
            chartBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.opacity = '1';
                    bar.style.transform = 'scaleY(1)';
                }, index * 100);
            });
        }, 500);
    }

    function showTooltip(element, value) {
        const tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        tooltip.textContent = `${value}%`;

        // Style the tooltip
        Object.assign(tooltip.style, {
            position: 'absolute',
            background: 'var(--neutral-800)',
            color: 'var(--white)',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            pointerEvents: 'none',
            zIndex: '1000',
            transform: 'translateX(-50%)',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.top - 30 + 'px';

        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.chart-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 300);
        }
    }

    // =====================
    // FORM FUNCTIONALITY
    // =====================

    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');

    // Form validation
    function validateForm() {
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        const errors = [];

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--accent-red)';
                errors.push(`${field.previousElementSibling.textContent} is required`);
            } else {
                field.style.borderColor = 'var(--grid-border)';
            }
        });

        // Email validation
        const emailField = contactForm.querySelector('[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = 'var(--accent-red)';
                errors.push('Please enter a valid email address');
            }
        }

        // Phone validation
        const phoneField = contactForm.querySelector('[type="tel"]');
        if (phoneField && phoneField.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
                isValid = false;
                phoneField.style.borderColor = 'var(--accent-red)';
                errors.push('Please enter a valid phone number');
            }
        }

        return { isValid, errors };
    }

    // Real-time form validation
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', function () {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = 'var(--accent-red)';
            } else {
                this.style.borderColor = 'var(--grid-border)';
            }
        });

        field.addEventListener('focus', function () {
            this.style.borderColor = 'var(--primary-blue)';
        });

        field.addEventListener('input', function () {
            if (this.style.borderColor === 'var(--accent-red)' && this.value.trim()) {
                this.style.borderColor = 'var(--grid-border)';
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const validation = validateForm();

        if (!validation.isValid) {
            showNotification('Please correct the errors in the form', 'error');
            return;
        }

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Get selected services
        const services = formData.getAll('services');
        data.services = services;

        // Disable submit button and show loading state
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Scheduling Consultation...';
        submitBtn.style.background = 'var(--neutral-400)';

        // Simulate form submission
        setTimeout(() => {
            // Success state
            submitBtn.textContent = 'Consultation Scheduled!';
            submitBtn.style.background = 'var(--accent-green)';

            showNotification('Thank you! We will contact you within 24 hours to schedule your free consultation.', 'success');

            // Log form data for demo
            console.log('Form submitted with data:', data);

            // Reset form after success
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'var(--primary-blue)';
            }, 3000);
        }, 2000);
    });

    // =====================
    // INTERACTIVE FEATURES
    // =====================

    // Document category filtering
    const docCategories = document.querySelectorAll('.doc-category');
    const documentItems = document.querySelectorAll('.document-item');

    docCategories.forEach(category => {
        category.addEventListener('click', function () {
            docCategories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');

            const filterType = this.textContent.toLowerCase();

            documentItems.forEach(item => {
                if (filterType === 'all documents' ||
                    item.querySelector('.doc-name').textContent.toLowerCase().includes(filterType.split(' ')[0])) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Report generation simulation
    const reportBtns = document.querySelectorAll('.report-btn');
    reportBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const reportType = this.parentElement.querySelector('h4').textContent;
            const originalText = this.textContent;

            this.disabled = true;
            this.textContent = 'Generating...';
            this.style.background = 'var(--neutral-400)';

            setTimeout(() => {
                this.textContent = 'Download PDF';
                this.style.background = 'var(--accent-green)';

                showNotification(`${reportType} generated successfully`, 'success');

                setTimeout(() => {
                    this.disabled = false;
                    this.textContent = originalText;
                    this.style.background = 'var(--primary-blue)';
                }, 2000);
            }, 1500);
        });
    });

    // Tax action buttons
    const taxActions = document.querySelectorAll('.tax-action');
    taxActions.forEach(action => {
        action.addEventListener('click', function () {
            const actionType = this.textContent;
            showNotification(`${actionType} feature coming soon!`, 'info');
        });
    });

    // Document download simulation
    const downloadBtns = document.querySelectorAll('.doc-download');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const docName = this.parentElement.querySelector('.doc-name').textContent;
            const originalText = this.textContent;

            this.disabled = true;
            this.textContent = 'Downloading...';

            setTimeout(() => {
                this.textContent = 'Downloaded';
                this.style.background = 'var(--accent-green)';

                showNotification(`${docName} downloaded successfully`, 'success');

                setTimeout(() => {
                    this.disabled = false;
                    this.textContent = originalText;
                    this.style.background = 'var(--primary-blue)';
                }, 1500);
            }, 1000);
        });
    });

    // =====================
    // SCROLL ANIMATIONS
    // =====================

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Special handling for financial cards
                if (entry.target.classList.contains('financial-card')) {
                    animateFinancialCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.service-category').forEach((el, index) => {
        el.classList.add('slide-up');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.team-member').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.financial-card').forEach(el => {
        observer.observe(el);
    });

    function animateFinancialCard(card) {
        const valueElement = card.querySelector('.card-value');
        if (valueElement) {
            const finalValue = valueElement.textContent;
            const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));

            if (!isNaN(numericValue)) {
                animateValue(valueElement, 0, numericValue, finalValue);
            }
        }
    }

    // =====================
    // NOTIFICATION SYSTEM
    // =====================

    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Styling based on type
        const colors = {
            success: 'var(--accent-green)',
            error: 'var(--accent-red)',
            info: 'var(--primary-blue)',
            warning: 'var(--accent-orange)'
        };

        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: colors[type] || colors.info,
            color: 'var(--white)',
            padding: '1rem 1.5rem',
            borderRadius: '6px',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '9999',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '350px',
            fontSize: '0.9rem',
            lineHeight: '1.4',
            fontWeight: '500'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // =====================
    // CALCULATOR ANIMATION
    // =====================

    function animateCalculator() {
        const calcButtons = document.querySelectorAll('.calc-button');
        let currentActive = 0;

        setInterval(() => {
            calcButtons.forEach(btn => btn.classList.remove('active'));
            calcButtons[currentActive].classList.add('active');
            currentActive = (currentActive + 1) % calcButtons.length;
        }, 1500);
    }

    // =====================
    // DATA TABLE FUNCTIONALITY
    // =====================

    function initializeDataTable() {
        const tableRows = document.querySelectorAll('.table-row');

        tableRows.forEach((row, index) => {
            row.addEventListener('click', function () {
                // Remove active class from all rows
                tableRows.forEach(r => r.classList.remove('active'));

                // Add active class to clicked row
                this.classList.add('active');

                // Show transaction details (simulation)
                const description = this.children[1].textContent;
                showNotification(`Viewing details for: ${description}`, 'info');
            });

            // Add hover effect with delay
            row.style.animationDelay = `${index * 0.05}s`;
        });
    }

    // =====================
    // PERFORMANCE OPTIMIZATIONS
    // =====================

    // Throttle scroll events
    let ticking = false;

    function updateOnScroll() {
        handleNavbarScroll();
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Debounce resize events
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

    const debouncedResize = debounce(() => {
        // Handle resize events
        initializeCharts();
    }, 250);

    window.addEventListener('resize', debouncedResize);

    // =====================
    // ACCESSIBILITY ENHANCEMENTS
    // =====================

    // Keyboard navigation for dashboard tabs
    dashboardTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const direction = e.key === 'ArrowRight' ? 1 : -1;
                const nextIndex = (index + direction + dashboardTabs.length) % dashboardTabs.length;
                dashboardTabs[nextIndex].focus();
                dashboardTabs[nextIndex].click();
            }
        });
    });

    // Form accessibility improvements
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('invalid', function (e) {
            e.preventDefault();
            const label = this.previousElementSibling.textContent;
            showNotification(`Please fill in the ${label} field correctly`, 'error');
            this.focus();
        });
    });

    // =====================
    // INITIALIZATION
    // =====================

    // Initialize all components
    initializeCharts();
    initializeDataTable();
    animateCalculator();

    // Add CSS for additional animations
    const style = document.createElement('style');
    style.textContent = `
        .table-row.active {
            background: var(--primary-blue) !important;
            color: var(--white);
        }
        
        .table-row.active .status {
            background: rgba(255, 255, 255, 0.2) !important;
            color: var(--white) !important;
        }
        
        .chart-bars .bar {
            opacity: 0;
            transform: scaleY(0);
            transform-origin: bottom;
            transition: all 0.6s ease;
        }
        
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Precision Accounting website initialized successfully');

}); // End DOMContentLoaded

// =====================
// GLOBAL UTILITIES
// =====================

// Utility functions for data formatting
window.AccountingUtils = {
    formatCurrency: function (amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },

    formatPercentage: function (value, decimals = 1) {
        return value.toFixed(decimals) + '%';
    },

    formatNumber: function (num) {
        return num.toLocaleString('en-US');
    },

    calculateTrend: function (current, previous) {
        const change = ((current - previous) / previous) * 100;
        return {
            value: change,
            direction: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
            arrow: change > 0 ? '↗' : change < 0 ? '↘' : '→'
        };
    }
};

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.AccountingUtils;
}