
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

// Observe stat items for counter animation
document.querySelectorAll('.stat-item').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let startTime = null;
    const startValue = 0;

    function updateCounter(currentTime) {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        const currentValue = Math.floor(progress * target);
        element.textContent = currentValue + '+';

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('.stat-number');
            const target = parseInt(numberElement.getAttribute('data-target'));
            animateCounter(numberElement, target);
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(el => {
    statsObserver.observe(el);
});

// Form submission
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! Our team will review your project details and contact you within 48 hours to schedule a consultation.');
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

// Parallax effect for hero cards
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroCards = document.querySelectorAll('.hero-card');

    heroCards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        card.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});

// Staggered animation for service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Portfolio item hover effects
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        portfolioItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.style.opacity = '0.7';
            }
        });
    });

    item.addEventListener('mouseleave', () => {
        portfolioItems.forEach(otherItem => {
            otherItem.style.opacity = '1';
        });
    });
});

// Enhanced grid overlay animation
const gridOverlay = document.querySelector('.grid-overlay');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    gridOverlay.style.transform = `translateY(${scrolled * 0.05}px)`;
});