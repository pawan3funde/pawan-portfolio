/* ================================================================
   PAWAN ASHOK FUNDE — MINIMALIST TECH PORTFOLIO (PURE DARK)
   Features:
   - Dynamic Data Analytics Background Canvas
   - Smooth Time-Series Trend Curves
   - Ingestion Data Packet Pulse Streams
   - Interactive Node Proximity & Cursor Telemetry
   - Asynchronous Contact Form & Quick Email Copy
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── 1. MOBILE NAVIGATION ─────────────────────────────────────── */
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

  /* ── 2. COPY EMAIL TO CLIPBOARD ──────────────────────────────── */
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

  /* ── 3. ASYNC CONTACT FORM SUBMISSION ────────────────────────── */
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

  /* ── 4. SCROLL ACTIVE LINK TRACKING ──────────────────────────── */
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

  /* ── 5. DYNAMIC DATA ANALYTICS BACKGROUND ENGINE ─────────────── */
  (function initDataAnalyticsEngine() {
    const canvas = document.getElementById("dataBgCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H;
    let nodes = [];
    let packets = [];
    let waveOffset = 0;
    const mouse = { x: null, y: null, radius: 180 };

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", () => {
      resize();
      initGraph();
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
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.8 + 1;
        this.baseAlpha = Math.random() * 0.4 + 0.2;
        this.isMetric = Math.random() > 0.82; // Focal metric node
        this.pulse = Math.random() * Math.PI * 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.03;

        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;

        // Subtle mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }
      draw() {
        ctx.beginPath();
        const pulseSize = this.isMetric ? this.radius + Math.sin(this.pulse) * 0.8 : this.radius;
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);

        if (this.isMetric) {
          ctx.fillStyle = `rgba(56, 189, 248, 0.7)`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(56, 189, 248, 0.5)";
        } else {
          ctx.fillStyle = `rgba(161, 161, 170, ${this.baseAlpha * 0.6})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class DataPacket {
      constructor(source, target) {
        this.source = source;
        this.target = target;
        this.progress = 0;
        this.speed = Math.random() * 0.012 + 0.008;
      }
      update() {
        this.progress += this.speed;
      }
      draw() {
        const px = this.source.x + (this.target.x - this.source.x) * this.progress;
        const py = this.source.y + (this.target.y - this.source.y) * this.progress;

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function initGraph() {
      const count = Math.min(Math.floor((W * H) / 14000), 65);
      nodes = Array.from({ length: count }, () => new DataNode());
      packets = [];
    }
    initGraph();

    // Spawn stream packets occasionally
    setInterval(() => {
      if (nodes.length < 2) return;
      const i = Math.floor(Math.random() * nodes.length);
      let closest = null;
      let minD = 140;

      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minD) {
          minD = dist;
          closest = nodes[j];
        }
      }

      if (closest && packets.length < 16) {
        packets.push(new DataPacket(nodes[i], closest));
      }
    }, 280);

    // Subtle coordinate grid dots
    function drawCoordinateGrid() {
      const spacing = 75;
      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      for (let x = 0; x < W; x += spacing) {
        for (let y = 0; y < H; y += spacing) {
          ctx.fillRect(x - 0.5, y - 0.5, 1.2, 1.2);
        }
      }
    }

    // Dynamic Time-Series Regression Curves (Smooth Waveforms)
    function drawTrendCurves() {
      waveOffset += 0.008;

      // Primary Analytics Trend Wave
      ctx.beginPath();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.045)";
      ctx.lineWidth = 1.4;

      for (let x = 0; x < W; x += 15) {
        const y = H * 0.35 + Math.sin(x * 0.004 + waveOffset) * 45 + Math.cos(x * 0.002 - waveOffset * 0.5) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary Moving Average Distribution Curve
      ctx.beginPath();
      ctx.strokeStyle = "rgba(34, 197, 94, 0.035)";
      ctx.lineWidth = 1.2;

      for (let x = 0; x < W; x += 15) {
        const y = H * 0.65 + Math.cos(x * 0.003 - waveOffset * 0.8) * 55 + Math.sin(x * 0.0015 + waveOffset) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);

      // 1. Grid
      drawCoordinateGrid();

      // 2. Trend Waves
      drawTrendCurves();

      // 3. Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const alpha = (1 - dist / 135) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 4. Mouse Connections
      if (mouse.x !== null && mouse.y !== null) {
        nodes.forEach((n) => {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      // 5. Packets
      for (let k = packets.length - 1; k >= 0; k--) {
        packets[k].update();
        packets[k].draw();
        if (packets[k].progress >= 1) {
          packets.splice(k, 1);
        }
      }

      // 6. Nodes
      nodes.forEach((node) => {
        node.update();
        node.draw();
      });

      requestAnimationFrame(animate);
    }
    animate();
  })();

});
