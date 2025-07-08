// Particle Animation for Hero Section
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const numParticles = 100; // Number of particles
const maxLineDistance = 150; // Max distance for dots to connect with lines
const particleSize = 2; // Size of each dot
const particleSpeed = 0.5; // Base speed of dots

// Set canvas dimensions
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Re-initialize particles on resize to avoid them going off-screen
    initParticles();
}

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * particleSpeed * 2;
        this.vy = (Math.random() - 0.5) * particleSpeed * 2;
        this.radius = particleSize;
        this.color = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) {
            this.vx *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.vy *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Initialize (or re-initialize) particles
function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

// Main animation loop for particles
function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxLineDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - (distance / maxLineDistance) * 0.7})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}


// Intersection Observer for scroll animations
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
};

const observerOptions = {
    root: null, // viewport as the root
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the element is visible
};

document.addEventListener('DOMContentLoaded', () => {
    // Particle animation initialization
    resizeCanvas();
    initParticles();
    animateParticles();

    // Resize listener for canvas (debounce for performance)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCanvas, 200); // Debounce resize for 200ms
    });

    // Logo carousel duplication for seamless loop
    const logoTrack = document.querySelector('.logo-track');
    if (logoTrack) {
        const originalContent = logoTrack.innerHTML;
        logoTrack.innerHTML += originalContent;
    }

    // Apply scroll animations
    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    // Observe elements for "About Me" section
    observer.observe(document.querySelector('#about h2'));
    document.querySelectorAll('#about p.lead').forEach(p => observer.observe(p));

    // Observe elements for "Skills" section
    observer.observe(document.querySelector('#skills h2'));
    document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));

    // Observe elements for "Brands" section
    observer.observe(document.querySelector('#brands h2'));
    document.querySelectorAll('.brand-item').forEach(item => observer.observe(item));

    // Observe elements for "Contact" section
    observer.observe(document.querySelector('#contact h2'));
    document.querySelectorAll('.contact-info p').forEach(p => observer.observe(p));

});