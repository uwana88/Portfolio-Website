
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Consultation Request Submitted';
    submitBtn.style.background = '#27ae60';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'var(--blueprint-blue)';
        submitBtn.disabled = false;
        this.reset();
    }, 3000);
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-item h3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalText = target.textContent;
                const hasSymbol = /[^\d.]/.test(finalText);
                const number = parseFloat(finalText.replace(/[^\d.]/g, ''));

                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 50;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.textContent = finalText;
                            clearInterval(timer);
                        } else {
                            let display = Math.floor(current);
                            if (finalText.includes('B')) {
                                display = '' + (current / 1000).toFixed(1) + 'B';
                            } else if (finalText.includes('%')) {
                                display = (current / 10).toFixed(1) + '%';
                            } else if (finalText.includes('hrs')) {
                                display = Math.floor(current) + 'hrs';
                            } else if (finalText.includes('+')) {
                                display = Math.floor(current) + '+';
                            } else {
                                display = Math.floor(current);
                            }
                            target.textContent = display;
                        }
                    }, 40);
                }

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// Initialize animations
animateStats();

// Enhanced navigation background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(248, 250, 252, 0.98)';
        nav.style.backdropFilter = 'blur(25px)';
    } else {
        nav.style.background = 'rgba(248, 250, 252, 0.95)';
        nav.style.backdropFilter = 'blur(20px)';
    }
});

// Blueprint animation effects
function initBlueprintAnimations() {
    const elements = document.querySelectorAll('.blueprint-circle, .blueprint-rect, .blueprint-line');

    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'all 1s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 500 + (index * 200));
    });
}

// Initialize blueprint animations when section is in view
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initBlueprintAnimations();
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroDiagram = document.querySelector('.hero-diagram');
if (heroDiagram) {
    heroObserver.observe(heroDiagram);
}

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.borderColor = 'var(--blueprint-blue)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.borderColor = 'rgba(0, 102, 204, 0.2)';
    });
});