
// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Animated counter for hero stats
function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        let currentValue;
        if (end >= 1000) {
            currentValue = Math.floor(progress * (end / 1000));
            element.textContent = '' + currentValue.toFixed(1) + 'B' + suffix;
        } else {
            currentValue = Math.floor(progress * end);
            element.textContent = currentValue + '+' + suffix;
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger hero stats animation on load
window.addEventListener('load', () => {
    setTimeout(() => {
        const stats = document.querySelectorAll('.hero-stat-number');
        animateValue(stats[0], 0, 2500, 2000); // $2.5B+
        animateValue(stats[1], 0, 2000, 2000); // 2,000+
        animateValue(stats[2], 0, 15, 1500);   // 15+
    }, 500);
});

// Dashboard chart animation
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger chart animations
            const chartLine = entry.target.querySelector('.chart-line');
            const chartPoints = entry.target.querySelectorAll('.chart-point');

            if (chartLine) {
                chartLine.style.animation = 'chartGrow 2s ease-out 0.5s both';
            }

            chartPoints.forEach((point, index) => {
                point.style.animation = `pointPop 0.6s ease-out ${1 + index * 0.2}s both`;
            });
        }
    });
}, { threshold: 0.5 });

const dashboardMockup = document.querySelector('.dashboard-mockup');
if (dashboardMockup) {
    chartObserver.observe(dashboardMockup);
}

// Service cards stagger animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTA buttons click handlers
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (this.textContent.includes('Schedule') || this.textContent.includes('Get Started')) {
            e.preventDefault();
            alert('Thank you for your interest! Our team will contact you within 24 hours to schedule your complimentary consultation. In the meantime, we\'ll send you our comprehensive financial planning guide.');
        }
    });
});

// Parallax effect for dashboard mockup
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const dashboard = document.querySelector('.dashboard-mockup');

    if (dashboard) {
        dashboard.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});

// Add subtle floating animation to service icons
const serviceIcons = document.querySelectorAll('.service-icon');
serviceIcons.forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
});

// Add float keyframe animation
const style = document.createElement('style');
style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
            }
        `;
document.head.appendChild(style);