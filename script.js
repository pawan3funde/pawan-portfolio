/* ================================================================
   PAWAN ASHOK FUNDE — MINIMALIST TECH PORTFOLIO JS
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── 1. THEME TOGGLE ─────────────────────────────────────────── */
  const themeToggle = document.getElementById("themeToggle");
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem("pawan-theme") || "dark";
  htmlEl.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", nextTheme);
      localStorage.setItem("pawan-theme", nextTheme);
    });
  }

  /* ── 2. MOBILE MENU ──────────────────────────────────────────── */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  /* ── 3. COPY EMAIL TO CLIPBOARD ──────────────────────────────── */
  const copyBtn = document.getElementById("copyEmailBtn");
  const toast = document.getElementById("toast");

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const email = copyBtn.getAttribute("data-email") || "pawanfunde96@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast("Copied email to clipboard");
      }).catch(() => {
        showToast(email);
      });
    });
  }

  /* ── 4. CONTACT FORM SUBMISSION ──────────────────────────────── */
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!submitBtn) return;

      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: formData
        });

        if (response.ok) {
          contactForm.reset();
          if (formStatus) {
            formStatus.textContent = "Thank you! Your message has been sent.";
            formStatus.style.display = "block";
            setTimeout(() => {
              formStatus.style.display = "none";
            }, 5000);
          }
          showToast("Message sent successfully");
        } else {
          throw new Error("Form submission error");
        }
      } catch (err) {
        showToast("Reach me directly at pawanfunde96@gmail.com");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  /* ── 5. SCROLL ACTIVE LINK HIGHLIGHT ─────────────────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.scrollY;

    sections.forEach((sec) => {
      const top = sec.offsetTop - 100;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }, { passive: true });

  /* ── 6. DYNAMIC DATA ANALYTICS BACKGROUND ANIMATION ─────────── */
  (function initDataAnalyticsBackground() {
    const canvas = document.getElementById("dataBgCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H;
    let nodes = [];
    let pulses = [];
    const mouse = { x: null, y: null, radius: 160 };

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", () => {
      resize();
      createNodes();
    }, { passive: true });

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    class DataNode {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.6 + 0.8;
        this.alpha = Math.random() * 0.4 + 0.15;
        this.isKeyMetric = Math.random() > 0.88; // occasional key KPI point
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.2;
            this.y -= (dy / dist) * force * 1.2;
          }
        }
      }
      draw(theme) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.isKeyMetric ? this.radius * 1.5 : this.radius, 0, Math.PI * 2);
        
        if (theme === "light") {
          ctx.fillStyle = this.isKeyMetric ? `rgba(2, 132, 199, 0.4)` : `rgba(71, 85, 105, ${this.alpha * 0.5})`;
        } else {
          ctx.fillStyle = this.isKeyMetric ? `rgba(56, 189, 248, 0.55)` : `rgba(148, 163, 184, ${this.alpha * 0.45})`;
        }
        ctx.fill();
      }
    }

    function createNodes() {
      const count = Math.min(Math.floor((W * H) / 18000), 55);
      nodes = Array.from({ length: count }, () => new DataNode());
    }
    createNodes();

    function drawGrid(theme) {
      const gridSpacing = 80;
      const dotAlpha = theme === "light" ? 0.04 : 0.035;
      const dotColor = theme === "light" ? `rgba(15, 23, 42, ${dotAlpha})` : `rgba(255, 255, 255, ${dotAlpha})`;

      ctx.fillStyle = dotColor;
      for (let x = 0; x < W; x += gridSpacing) {
        for (let y = 0; y < H; y += gridSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const theme = isLight ? "light" : "dark";

      // 1. Draw subtle background coordinate grid
      drawGrid(theme);

      // 2. Draw correlation edges between close data points
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 125) {
            const edgeAlpha = (1 - dist / 125) * (isLight ? 0.08 : 0.07);
            ctx.beginPath();
            ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${edgeAlpha})` : `rgba(56, 189, 248, ${edgeAlpha})`;
            ctx.lineWidth = 0.55;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Update & render data nodes
      nodes.forEach((node) => {
        node.update();
        node.draw(theme);
      });

      requestAnimationFrame(animate);
    }
    animate();
  })();

});
