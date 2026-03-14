/* ================================================================
   PAWAN FUNDE PORTFOLIO — script.js
   Features: Typing animation · Scroll reveal · Navbar ·
             Dark mode toggle · Canvas particles · Contact form
   ================================================================ */

/* ── Typing Animation ───────────────────────────────────────────── */
const typingPhrases = [
  "Data Analyst",
  "Power BI Developer",
  "Cyber Security Student",
  "BI & Analytics Enthusiast",
  "Python & SQL Developer",
];

let phraseIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById("typingText");

function typeLoop() {
  if (!typingEl) return;
  const current = typingPhrases[phraseIdx];
  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 68);
  } else {
    typingEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % typingPhrases.length;
      setTimeout(typeLoop, 350);
      return;
    }
    setTimeout(typeLoop, 38);
  }
}
typeLoop();

/* ── Scroll Reveal ──────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 60);
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ── Navbar: scroll state + active link ────────────────────────── */
const navbar   = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  /* Scrolled style */
  navbar.classList.toggle("scrolled", window.scrollY > 40);

  /* Active link highlight */
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}, { passive: true });

/* ── Mobile Hamburger ───────────────────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", open);
  hamburger.querySelectorAll("span").forEach((s, i) => {
    if (open) {
      if (i === 0) s.style.transform = "rotate(45deg) translate(5px,5px)";
      if (i === 1) s.style.opacity = "0";
      if (i === 2) s.style.transform = "rotate(-45deg) translate(5px,-5px)";
    } else {
      s.style.transform = "";
      s.style.opacity = "";
    }
  });
});

/* Close on nav link click */
mobileNav.querySelectorAll(".nav-link").forEach((a) => {
  a.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    hamburger.querySelectorAll("span").forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "";
    });
  });
});

/* ── Dark / Light Mode Toggle ───────────────────────────────────── */
const themeToggle = document.getElementById("themeToggle");
const htmlEl      = document.documentElement;

const savedTheme = localStorage.getItem("pf-theme") || "dark";
htmlEl.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const next = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", next);
  localStorage.setItem("pf-theme", next);
});

/* ── Hero Canvas — Floating Data Dots ───────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", () => { resize(); buildParticles(); }, { passive: true });

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.r  = Math.random() * 1.5 + 0.4;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.alpha = Math.random() * 0.5 + 0.15;
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  };

  function buildParticles() {
    const count = Math.min(Math.floor((W * H) / 10000), 90);
    particles = Array.from({ length: count }, () => new Particle());
  }
  buildParticles();

  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* Draw connection lines */
    const accent = htmlEl.getAttribute("data-theme") === "light" ? "0,144,200" : "0,198,255";
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${accent},${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    /* Draw dots */
    particles.forEach((p) => {
      p.update();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accent},${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Contact Form (Demo) ────────────────────────────────────────── */
const form        = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    btn.textContent = "Sending…";
    btn.disabled = true;
    /* Simulate send delay — replace with Formspree/Web3Forms fetch in production */
    setTimeout(() => {
      form.reset();
      btn.textContent = "Send Message";
      btn.disabled = false;
      formSuccess.classList.add("show");
      setTimeout(() => formSuccess.classList.remove("show"), 5000);
    }, 1200);
  });
}
