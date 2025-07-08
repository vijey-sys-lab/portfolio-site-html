// Particle Animation for Hero Section
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const numParticles = 80; // Fewer particles for a cleaner look
const maxLineDistance = 120; // Shorter max distance for lines
const particleSize = 1.5; // Smaller dots
const particleSpeed = 0.3; // Slower speed for subtlety

// Set canvas dimensions
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
        // Fainter, slightly blue-ish white color for dots
        this.color = `rgba(220, 230, 255, ${0.3 + Math.random() * 0.3})`; // Adjusted opacity and slight blue tint
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
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear with transparency

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
                // Fainter lines, fading with distance
                ctx.strokeStyle = `rgba(220, 230, 255, ${0.1 - (distance / maxLineDistance) * 0.08})`; // Much lower opacity
                ctx.lineWidth = 0.3; // Thinner lines
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

// Increased threshold for scroll animations to trigger a bit earlier
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
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
        resizeTimer = setTimeout(resizeCanvas, 200);
    });

    // Logo carousel duplication for seamless loop
    const logoTrack = document.querySelector('.logo-track');
    if (logoTrack) {
        const originalContent = logoTrack.innerHTML;
        // Duplicate multiple times for longer seamless animation if needed, or just once
        logoTrack.innerHTML += originalContent;
        // You could also duplicate it like this if your carousel track is very short:
        // logoTrack.innerHTML += originalContent + originalContent;
    }

    // Apply scroll animations
    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    // Observe elements for "About Me" section
    observer.observe(document.querySelector('#about h2'));
    // Select the specific paragraph with class 'about-text'
    document.querySelectorAll('#about p.about-text').forEach(p => observer.observe(p));


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