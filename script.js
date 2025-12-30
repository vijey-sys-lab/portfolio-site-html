/* THEME TOGGLE */
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("light");
  toggle.innerHTML = document.body.classList.contains("light")
    ? '<i class="bi bi-sun-fill"></i>'
    : '<i class="bi bi-moon-fill"></i>';
};

/* LOADER */
window.addEventListener("load", () => {
  document.getElementById("loader").classList.add("hidden");
});

/* STAR BACKGROUND */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let stars = Array.from({ length: 140 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 1.5 + 0.3,
  v: Math.random() * 0.4 + 0.1
}));

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.y += s.v;
    if (s.y > canvas.height) s.y = 0;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(180,200,255,.5)";
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}
animateStars();

/* SCROLL REVEAL */
document.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100)
      el.classList.add("active");
  });
});

/* SKILLS PARTICLES */
const skillsCanvas = document.getElementById("skills-bg");
const sctx = skillsCanvas.getContext("2d");

function resizeSkills() {
  skillsCanvas.width = skillsCanvas.offsetWidth;
  skillsCanvas.height = skillsCanvas.offsetHeight;
}
resizeSkills();
window.addEventListener("resize", resizeSkills);

let particles = Array.from({ length: 70 }, () => ({
  x: Math.random() * skillsCanvas.width,
  y: Math.random() * skillsCanvas.height,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
  r: Math.random() * 2 + 1
}));

skillsCanvas.addEventListener("mousemove", e => {
  const rect = skillsCanvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  particles.forEach(p => {
    const dx = p.x - mx;
    const dy = p.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      p.x += dx * 0.05;
      p.y += dy * 0.05;
    }
  });
});

function animateSkills() {
  sctx.clearRect(0, 0, skillsCanvas.width, skillsCanvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > skillsCanvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > skillsCanvas.height) p.vy *= -1;

    sctx.beginPath();
    sctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    sctx.fillStyle = "rgba(120,180,255,0.45)";
    sctx.fill();
  });

  requestAnimationFrame(animateSkills);
}
animateSkills();

/* CERTIFICATE SLIDER CONTROLS */
const certSlider = document.getElementById("certSlider");
const certNext = document.getElementById("certNext");
const certPrev = document.getElementById("certPrev");

if (certSlider && certNext && certPrev) {
  certNext.addEventListener("click", () => {
    certSlider.scrollBy({ left: 300, behavior: "smooth" });
  });

  certPrev.addEventListener("click", () => {
    certSlider.scrollBy({ left: -300, behavior: "smooth" });
  });
}

