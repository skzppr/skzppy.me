document.addEventListener('DOMContentLoaded', () => {
    // Ensure content is loaded before starting animations
    window.addEventListener('load', () => {
        requestAnimationFrame(() => {
            document.body.style.visibility = 'visible';
            initParticles();
        });
    });

    // Initialize particles
    function initParticles() {
        const particlesContainer = document.querySelector('.particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random starting position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random animation duration and delay
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            particle.style.animation = `particleFloat ${duration}s ${delay}s infinite linear`;

            particlesContainer.appendChild(particle);
        }
    }

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Check if device supports hover
    const supportsHover = window.matchMedia('(hover: hover)').matches;

    // Improved card hover effect
    if (supportsHover) {
        const card = document.querySelector('.glass-card');
        let currentRotateX = 0;
        let currentRotateY = 0;
        let targetRotateX = 0;
        let targetRotateY = 0;
        let isHovering = false;

        function updateCardTransform() {
            if (!isHovering) {
                targetRotateX = 0;
                targetRotateY = 0;
            }

            // Smooth interpolation
            currentRotateX += (targetRotateX - currentRotateX) * 0.1;
            currentRotateY += (targetRotateY - currentRotateY) * 0.1;

            const transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translateZ(10px)`;
            card.style.transform = transform;

            requestAnimationFrame(updateCardTransform);
        }

        card.addEventListener('mousemove', (e) => {
            isHovering = true;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            targetRotateX = ((y - centerY) / centerY) * 10;
            targetRotateY = ((centerX - x) / centerX) * 10;
        });

        card.addEventListener('mouseleave', () => {
            isHovering = false;
        });

        // Start the animation loop
        updateCardTransform();
    }

    // Improved parallax effect for background (desktop only)
    if (supportsHover) {
        let currentX = 50;
        let currentY = 50;
        let targetX = 50;
        let targetY = 50;
        let isMouseOnPage = false;

        // Smooth animation function
        function updateParallax() {
            if (!isMouseOnPage) {
                // Return to center when mouse leaves
                targetX = 50;
                targetY = 50;
            }

            // Smooth interpolation
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;

            // Apply the transform with boundaries
            document.body.style.backgroundPosition = `${Math.min(Math.max(currentX, 45), 55)}% ${Math.min(Math.max(currentY, 45), 55)}%`;

            requestAnimationFrame(updateParallax);
        }

        // Start the animation loop
        updateParallax();

        // Mouse move handler with added particle interaction
        document.addEventListener('mousemove', (e) => {
            isMouseOnPage = true;
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            targetX = 50 + (mouseX - 0.5) * 10;
            targetY = 50 + (mouseY - 0.5) * 10;

            // Add subtle particle movement based on mouse
            const particles = document.querySelectorAll('.particle');
            particles.forEach(particle => {
                const rect = particle.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const angle = Math.atan2(dy, dx);
                    const force = (100 - distance) / 100;
                    particle.style.transform = `translate(${Math.cos(angle) * force * 20}px, ${Math.sin(angle) * force * 20}px)`;
                }
            });
        });

        // Mouse leave handler
        document.addEventListener('mouseleave', () => {
            isMouseOnPage = false;
            // Reset particle positions
            const particles = document.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.transform = '';
            });
        });

        // Mouse enter handler
        document.addEventListener('mouseenter', () => {
            isMouseOnPage = true;
        });
    }

    // Glitch effect for the title
    const title = document.querySelector('.glitch');
    if (title) {
        title.setAttribute('data-text', title.textContent);
        
        if (supportsHover) {
            // Desktop behavior
            title.addEventListener('mouseover', () => {
                title.style.animation = 'glitch-anim 500ms infinite';
            });

            title.addEventListener('mouseleave', () => {
                title.style.animation = 'none';
            });
        } else {
            // Mobile behavior
            title.addEventListener('touchstart', () => {
                title.style.animation = 'glitch-anim 300ms infinite';
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
