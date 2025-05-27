document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Check if device supports hover
    const supportsHover = window.matchMedia('(hover: hover)').matches;

    // Parallax effect for background (desktop only)
    if (supportsHover) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            document.body.style.backgroundPosition = `${50 + (mouseX * 5)}% ${50 + (mouseY * 5)}%`;
        });
    }

    // Tilt effect for the glass card (desktop only)
    const card = document.querySelector('.glass-card');
    if (card && supportsHover) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    }

    // Glitch effect for the title
    const title = document.querySelector('.glitch');
    if (title) {
        if (supportsHover) {
            // Desktop behavior
            title.addEventListener('mouseover', () => {
                title.style.animation = 'none';
                void title.offsetWidth; // Trigger reflow
                title.style.animation = 'glitch 500ms infinite';
            });

            title.addEventListener('mouseleave', () => {
                title.style.animation = 'none';
            });
        } else {
            // Mobile behavior
            title.addEventListener('touchstart', () => {
                title.style.animation = 'glitch 300ms infinite';
            });

            title.addEventListener('touchend', () => {
                title.style.animation = 'none';
            });
        }
    }

    // Smooth hover effects for social icons
    const socialLinks = document.querySelectorAll('.social-link');
    if (supportsHover) {
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-3px) scale(1.1)';
            });
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.link-button');
    buttons.forEach(button => {
        const addRipple = (e) => {
            const rect = button.getBoundingClientRect();
            const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
            const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        };

        // Add both mouse and touch events for ripple
        button.addEventListener('mousedown', addRipple);
        button.addEventListener('touchstart', addRipple, { passive: true });
    });

    // Prevent default touch behaviors that might interfere with our animations
    document.addEventListener('touchmove', (e) => {
        if (e.scale !== 1) {
            e.preventDefault();
        }
    }, { passive: false });
});
