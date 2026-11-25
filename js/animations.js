/**
 * NEXUS GAMING - ANIMATIONS & INTERACTIONS
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Animations using IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class when element comes into view
                entry.target.classList.add('is-visible');
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements that need to animate on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // 2. Parallax Effect for Hero Background (Optional enhancement)
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });

    // 3. Dynamic Cursor Glow (Interactive effect)
    // Create a glowing cursor element
    const cursorGlow = document.createElement('div');
    cursorGlow.style.position = 'fixed';
    cursorGlow.style.width = '300px';
    cursorGlow.style.height = '300px';
    cursorGlow.style.borderRadius = '50%';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(0,0,0,0) 70%)';
    cursorGlow.style.pointerEvents = 'none';
    cursorGlow.style.transform = 'translate(-50%, -50%)';
    cursorGlow.style.zIndex = '9999';
    cursorGlow.style.mixBlendMode = 'screen';
    cursorGlow.style.transition = 'width 0.3s, height 0.3s';
    
    // Only add custom cursor glow on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        document.body.appendChild(cursorGlow);

        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });

        // Expand glow when hovering over buttons or cards
        const interactables = document.querySelectorAll('a, button, .glass-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.style.width = '400px';
                cursorGlow.style.height = '400px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(112, 0, 255, 0.2) 0%, rgba(0,0,0,0) 70%)';
            });
            el.addEventListener('mouseleave', () => {
                cursorGlow.style.width = '300px';
                cursorGlow.style.height = '300px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(0,0,0,0) 70%)';
            });
        });
    }

});
