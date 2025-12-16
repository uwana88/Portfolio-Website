
// Smooth scrolling for navigation links
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

// Form submission handler
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    // Show success state
    submitBtn.textContent = 'Thank You! We\'ll Contact You Soon';
    submitBtn.style.background = '#27ae60';
    submitBtn.disabled = true;

    // Reset after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '#3498db';
        submitBtn.disabled = false;
        this.reset();
    }, 3000);
});

// Animate stats on scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalText = target.textContent;
                const hasSymbol = finalText.match(/[^\d.]/);
                const number = parseFloat(finalText.replace(/[^\d.]/g, ''));

                let current = 0;
                const increment = number / 50;
                const duration = 1500;
                const stepTime = duration / 50;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = finalText;
                        clearInterval(timer);
                    } else {
                        let display = Math.floor(current * 10) / 10;
                        if (finalText.includes('B')) {
                            display = '' + display + (finalText.includes('B') ? 'B' : 'M');
                        } else if (finalText.includes('%')) {
                            display = display + '%';
                        } else {
                            display = Math.floor(current) + (finalText.includes('+') ? '+' : '');
                        }
                        target.textContent = display;
                    }
                }, stepTime);

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// Initialize animations
animateStats();

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.borderColor = 'rgba(52, 152, 219, 0.3)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.borderColor = 'rgba(52, 152, 219, 0.1)';
    });
});