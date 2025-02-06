document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
            menuBtn.classList.add('open');
            mobileMenu.classList.add('active');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            mobileMenu.classList.remove('active');
            menuOpen = false;
        }
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (menuOpen) {
                menuBtn.classList.remove('open');
                mobileMenu.classList.remove('active');
                menuOpen = false;
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for floating elements
    document.addEventListener('mousemove', (e) => {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingIcons.forEach((icon, index) => {
            const speed = (index + 1) * 0.5; // Different speed for each icon
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            
            // Add slight rotation based on mouse movement
            const rotation = (mouseX - 0.5) * 10;
            
            // Combine the existing animation with parallax movement
            const currentTransform = window.getComputedStyle(icon).getPropertyValue('transform');
            icon.style.transform = `${currentTransform} translateX(${x}px) translateY(${y}px) rotate(${rotation}deg)`;
        });
    });

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Add random movement to particles
    function animateParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const randomX = Math.random() * 200 - 100;
            const randomY = Math.random() * 200 - 100;
            const scale = Math.random() * 0.5 + 1;
            const duration = Math.random() * 5000 + 5000;
            
            particle.style.transition = `all ${duration}ms ease-in-out`;
            particle.style.transform = `translate(${randomX}px, ${randomY}px) scale(${scale})`;
            
            setTimeout(() => {
                particle.style.transform = 'translate(0, 0) scale(1)';
            }, duration);
        });
    }

    // Start particle animation
    setInterval(animateParticles, 5000);
});