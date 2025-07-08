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
        // Initialize particles randomly within the current canvas bounds
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Random velocity for movement
        this.vx = (Math.random() - 0.5) * particleSpeed * 2;
        this.vy = (Math.random() - 0.5) * particleSpeed * 2;
        this.radius = particleSize;
        // Semi-transparent white color for dots
        this.color = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;
    }

    // Update particle position and handle bouncing off edges
    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off horizontal edges
        if (this.x < 0 || this.x > canvas.width) {
            this.vx *= -1;
        }
        // Bounce off vertical edges
        if (this.y < 0 || this.y > canvas.height) {
            this.vy *= -1;
        }
    }

    // Draw the particle as a circle
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
    particles = []; // Clear existing particles
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

// Main animation loop for particles
function animateParticles() {
    requestAnimationFrame(animateParticles); // Continuously loop
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas for redrawing

    for (let i = 0; i < particles.length; i++) {
        particles[i].update(); // Update position of current particle
        particles[i].draw();   // Draw current particle

        // Loop through other particles to draw connecting lines
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy); // Calculate distance between particles

            // If particles are within connection distance, draw a line
            if (distance < maxLineDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                // Set line color (white) and opacity (fades with distance)
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - (distance / maxLineDistance) * 0.7})`;
                ctx.lineWidth = 0.5; // Thin lines
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// Brand Logo Carousel Script
document.addEventListener('DOMContentLoaded', () => {
    // Particle animation initialization
    resizeCanvas();     // Set initial canvas size
    initParticles();    // Initialize particles
    animateParticles(); // Start the animation

    // Logo carousel duplication for seamless loop
    const logoTrack = document.querySelector('.logo-track');
    if (logoTrack) {
        // Clone the content of the track and append it to itself
        // This makes the animation seamless as the first half scrolls out, the duplicated half scrolls in
        const originalContent = logoTrack.innerHTML;
        logoTrack.innerHTML += originalContent; // Duplicate once for a smooth loop
    }
});

// Optional: Smooth scrolling for navigation links (if you add a nav)
// This part is commented out as your HTML doesn't currently have a fixed nav bar for internal links
// If you add one, uncomment this and update the selector if needed.
/*
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
*/