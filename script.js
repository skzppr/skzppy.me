document.addEventListener("DOMContentLoaded", function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.classList.add('visible');
    });

    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const parallax = scrolled * 0.5;
        
        document.body.style.backgroundPosition = `50% ${50 + parallax}px`;
    });
});
