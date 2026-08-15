/* ================================================================
   PAWAN ASHOK FUNDE — PORTFOLIO SCRIPT
   Features:
   1. Interactive Data Node Canvas with Mouse Reactivity
   2. Typing Effect for Data Analyst & BI Developer roles
   3. Animated Stat Counters on Scroll
   4. Interactive Skills Matrix Filter
   5. Interactive Projects Filter & Case Study Modal Popup
   6. Live Analytics & KPI Simulator (Interactive Canvas Chart)
   7. Theme Switcher (Dark / Light)
   8. One-Click Copy Email with Toast Feedback
   9. Async Contact Form Submission
   10. Scroll Progress & Back-to-Top
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── 1. TYPING ANIMATION ─────────────────────────────────────── */
  const typingPhrases = [
    "Data Analytics & Insights",
    "Power BI & DAX Dashboards",
    "Business Intelligence Solutions",
    "Python & SQL Data Pipelines",
    "Cyber & Financial Risk Analytics",
    "B.Tech Cyber Security Undergraduate"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typingEl = document.getElementById("typingText");

  function typeTick() {
    if (!typingEl) return;
    const currentPhrase = typingPhrases[phraseIdx];

    if (!isDeleting) {
      typingEl.textContent = currentPhrase.slice(0, ++charIdx);
      if (charIdx === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeTick, 2000);
        return;
      }
      setTimeout(typeTick, 65);
    } else {
      typingEl.textContent = currentPhrase.slice(0, --charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % typingPhrases.length;
        setTimeout(typeTick, 350);
        return;
      }
      setTimeout(typeTick, 35);
    }
  }
  typeTick();

  /* ── 2. HERO DATA MESH CANVAS ───────────────────────────────── */
  (function initDataMesh() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H;
    let particles = [];
    const mouse = { x: null, y: null, radius: 140 };

    function resizeCanvas() {
      W = canvas.width = canvas.parentElement.offsetWidth;
      H = canvas.height = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    }, { passive: true });

    window.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.baseAlpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;

        // Mouse avoidance/attraction
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
      draw(theme) {
        const color = theme === "light" ? "2, 132, 199" : "0, 229, 255";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${this.baseAlpha})`;
        ctx.fill();
      }
    }

    function createParticles() {
      const count = Math.min(Math.floor((W * H) / 9000), 85);
      particles = Array.from({ length: count }, () => new Particle());
    }
    createParticles();

    function animateMesh() {
      ctx.clearRect(0, 0, W, H);
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const themeColor = isLight ? "2, 132, 199" : "0, 229, 255";
      const emeraldColor = isLight ? "5, 150, 105" : "16, 185, 129";

      // Connect particle lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = i % 3 === 0 ? `rgba(${emeraldColor}, ${alpha})` : `rgba(${themeColor}, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Connect to mouse if nearby
      if (mouse.x !== null && mouse.y !== null) {
        particles.forEach((p) => {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${themeColor}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      particles.forEach((p) => {
        p.update();
        p.draw(isLight ? "light" : "dark");
      });

      requestAnimationFrame(animateMesh);
    }
    animateMesh();
  })();

  /* ── 3. SCROLL REVEAL OBSERVER ──────────────────────────────── */
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ── 4. ANIMATED STAT COUNTERS ──────────────────────────────── */
  const counterElements = document.querySelectorAll(".counter");
  let hasAnimatedCounters = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimatedCounters) {
        hasAnimatedCounters = true;
        counterElements.forEach((counter) => {
          const target = parseFloat(counter.getAttribute("data-target"));
          const decimals = parseInt(counter.getAttribute("data-decimals") || "0", 10);
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = (target * easeProgress).toFixed(decimals);
            counter.textContent = currentVal;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toFixed(decimals);
            }
          }
          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.25 });

  const metricsSection = document.querySelector(".metrics-bar-section");
  if (metricsSection) counterObserver.observe(metricsSection);

  /* ── 5. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHT ───────────────── */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Navbar Scrolled Style
    if (navbar) {
      navbar.classList.toggle("scrolled", scrollY > 40);
    }

    // Back to Top Button
    if (backToTopBtn) {
      backToTopBtn.classList.toggle("visible", scrollY > 450);
    }

    // Active Section Link Highlight
    let currentSec = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSec = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentSec}`);
    });
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── 6. MOBILE HAMBURGER MENU ───────────────────────────────── */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      hamburger.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── 7. THEME SWITCHER (DARK / LIGHT) ───────────────────────── */
  const themeToggle = document.getElementById("themeToggle");
  const htmlEl = document.documentElement;

  const currentSavedTheme = localStorage.getItem("pf-theme") || "dark";
  htmlEl.setAttribute("data-theme", currentSavedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", nextTheme);
      localStorage.setItem("pf-theme", nextTheme);
      // Redraw simulator chart on theme switch
      renderSimulatorChart();
    });
  }

  /* ── 8. COPY EMAIL TO CLIPBOARD WITH TOAST ──────────────────── */
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const toast = document.getElementById("toastNotification");
  const toastMsg = document.getElementById("toastMsg");

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const email = copyEmailBtn.getAttribute("data-email") || "pawanfunde96@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
      }).catch(() => {
        showToast("Email: pawanfunde96@gmail.com");
      });
    });
  }

  /* ── 9. SKILLS MATRIX FILTER TABS ───────────────────────────── */
  const skillTabs = document.querySelectorAll(".skill-tab-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  skillTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      skillTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-skill-filter");
      skillCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.style.display = "block";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
        }
      });
    });
  });

  /* ── 10. PROJECTS FILTER TABS ───────────────────────────────── */
  const projectFilters = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  projectFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      projectFilters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      projectCards.forEach((card) => {
        const categories = (card.getAttribute("data-category") || "").split(" ");
        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* ── 11. CASE STUDY MODAL DATA & HANDLER ────────────────────── */
  const caseStudiesData = {
    capstone: {
      tag: "Final Year B.Tech Capstone Project • Cyber & Analytics",
      title: "Cyber Threat Intelligence & Anomaly Analytics Platform",
      problem: "Large organizations generate gigabytes of firewall, auth, and network logs daily. Security operations centers (SOC) struggle with alert fatigue and high Mean Time to Detect (MTTD) without automated, high-visibility anomaly aggregation.",
      architecture: "Engineered a scalable ingestion pipeline using Python and SQL to parse raw syslog/auth data. Applied statistical moving-average and z-score anomaly filters to isolate port scans, brute-force bursts, and credential stuffing vectors.",
      kpi1: { label: "Log Volume", val: "500K+ Events" },
      kpi2: { label: "Detection Speed", val: "< 3s Latency" },
      kpi3: { label: "False Positive Drop", val: "-42% Noise" },
      dax: "DAX Measures created for [Threat Severity Index], [Rolling 7-Day Breach Probability], and [Dynamic IP Blacklist Scorecard].",
      impact: "Delivered an executive Power BI dashboard enabling tier-1 security analysts to immediately isolate compromised endpoints and export actionable forensic reports."
    },
    upi: {
      tag: "FinTech & Financial Risk Analytics",
      title: "UPI Transaction Fraud & Risk Analytics Suite",
      problem: "With India's UPI handling billions of transactions monthly, payment aggregators face rising fraud chargebacks and intermittent failure spikes during peak hours.",
      architecture: "Preprocessed 100,000+ transaction rows using Python (Pandas, NumPy). Formulated exploratory data pipelines in MySQL to calculate merchant failure concentration and velocity abuse.",
      kpi1: { label: "Records Modeled", val: "100,000+ Rows" },
      kpi2: { label: "Peak Risk Window", val: "01:00 - 04:00 AM" },
      kpi3: { label: "Fraud Pattern Capture", val: "94.2% Precision" },
      dax: "Engineered DAX measures: `Fraud_Ratio = DIVIDE(CALCULATE(COUNTROWS(Txn), Txn[Status]='Flagged'), COUNTROWS(Txn))` and `Failure_Velocity_Index`.",
      impact: "Identified that high-value peer-to-merchant (P2M) micro-transactions accounted for 68% of fraudulent attempts during automated batch hours, providing direct recommendations for bank throttling rules."
    },
    retail: {
      tag: "Commercial & Customer Analytics",
      title: "Black Friday Sales Performance & RFM Customer Segmentation",
      problem: "Retail leadership required visibility into product affinity, customer lifetime value, and promotional discount efficacy across a ₹5.1 Billion commercial dataset with 6,000+ customers.",
      architecture: "Built an RFM (Recency, Frequency, Monetary) analytical model in Python and SQL. Extracted customer purchase quintiles to categorize shoppers into Champions, Loyal, At-Risk, and Hibernating.",
      kpi1: { label: "Gross Dataset", val: "₹5.1 Billion+" },
      kpi2: { label: "Customers Segmented", val: "6,000+ Users" },
      kpi3: { label: "Top Product Category", val: "Electronics (44%)" },
      dax: "Created complex DAX time-intelligence measures for `MoM Revenue Growth`, `Customer Lifetime Value (CLV)`, and `Basket Penetration Rate`.",
      impact: "Designed an executive Power BI suite illustrating that targeting the top 15% 'Champion' cohort with personalized bundle offers could yield an estimated 18% lift in repeat purchases."
    },
    shopease: {
      tag: "E-Commerce Business Intelligence",
      title: "ShopEase Multi-Store Business Intelligence Suite",
      problem: "Store managers across regional distribution centers lacked a single pane of glass to track real-time inventory shortages, return rates, and shipping SLA breaches.",
      architecture: "Consolidated multi-sheet operational Excel datasets into a star-schema relational model in Power BI. Automated data refresh and built dynamic slicers for date ranges and warehouse hubs.",
      kpi1: { label: "Average Order Value", val: "₹1,840" },
      kpi2: { label: "Return Rate Drop", val: "-12% Post-Insight" },
      kpi3: { label: "Order Fulfillment", val: "98.1% SLA" },
      dax: "Calculated dynamic delivery SLA compliance and inventory turnover ratios across 12 distinct product categories.",
      impact: "Enabled branch executives to identify bottleneck distribution zones and optimize inventory reallocation 3 days faster than previous manual Excel workflows."
    }
  };

  const modal = document.getElementById("caseStudyModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalDynamicContent = document.getElementById("modalDynamicContent");

  document.querySelectorAll(".view-case-study-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const projId = btn.getAttribute("data-project-id");
      const data = caseStudiesData[projId];
      if (!data || !modalDynamicContent || !modal) return;

      modalDynamicContent.innerHTML = `
        <span class="modal-tag">${data.tag}</span>
        <h2 class="modal-title">${data.title}</h2>
        
        <div class="modal-body">
          <h4 class="modal-section-title">📌 Business Problem Statement</h4>
          <p>${data.problem}</p>

          <h4 class="modal-section-title">⚙️ Data Architecture &amp; Methodology</h4>
          <p>${data.architecture}</p>

          <div class="modal-grid-box">
            <div class="modal-grid-item">
              <span class="modal-kpi-label">${data.kpi1.label}</span>
              <span class="modal-kpi-val">${data.kpi1.val}</span>
            </div>
            <div class="modal-grid-item">
              <span class="modal-kpi-label">${data.kpi2.label}</span>
              <span class="modal-kpi-val">${data.kpi2.val}</span>
            </div>
            <div class="modal-grid-item">
              <span class="modal-kpi-label">${data.kpi3.label}</span>
              <span class="modal-kpi-val">${data.kpi3.val}</span>
            </div>
          </div>

          <h4 class="modal-section-title">📊 Key DAX / SQL Logic</h4>
          <p><code>${data.dax}</code></p>

          <h4 class="modal-section-title">🚀 Business Outcome &amp; Value</h4>
          <p>${data.impact}</p>
        </div>
      `;

      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "auto";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ── 12. LIVE INTERACTIVE BI SIMULATOR ──────────────────────── */
  const simulatorData = {
    upi: {
      title: "Hourly UPI Transaction Volume vs Fraud Spikes",
      kpis: [
        { label: "Total Volume", val: "104,280", trend: "+14.2% vs avg", isUp: true },
        { label: "Failure Rate", val: "2.18%", trend: "-0.45% MoM", isUp: true },
        { label: "Fraud Flagged", val: "342 txns", trend: "0.32% of total", isUp: false },
        { label: "Avg Ticket Size", val: "₹1,420", trend: "+8.1% peer", isUp: true }
      ],
      slices: {
        all: [22, 14, 8, 5, 12, 45, 88, 145, 180, 210, 195, 230, 260, 220, 240, 280, 310, 340, 290, 240, 180, 120, 75, 40],
        p2p: [12, 8, 4, 2, 6, 22, 45, 75, 95, 110, 100, 120, 135, 115, 125, 150, 165, 180, 155, 125, 95, 60, 38, 20],
        p2m: [10, 6, 4, 3, 6, 23, 43, 70, 85, 100, 95, 110, 125, 105, 115, 130, 145, 160, 135, 115, 85, 60, 37, 20]
      },
      insight: "💡 <strong>Key Analytical Takeaway:</strong> Peak fraud attempts concentrate between 01:00 AM – 04:00 AM during automated batch processing, representing 68% of flagged anomalies."
    },
    retail: {
      title: "Retail Department Revenue & Customer Lifetime Contribution",
      kpis: [
        { label: "Gross Revenue", val: "₹5.14 B", trend: "+22.4% YoY", isUp: true },
        { label: "Active Buyers", val: "6,240", trend: "+11.8% cohort", isUp: true },
        { label: "Repeat Purchase", val: "48.6%", trend: "+5.2% RFM", isUp: true },
        { label: "Return Rate", val: "4.1%", trend: "-1.2% healthy", isUp: true }
      ],
      slices: {
        all: [45, 55, 62, 78, 95, 110, 140, 165, 190, 240, 320, 410, 380, 350, 390, 420, 460, 520, 480, 410, 320, 210, 140, 80],
        p2p: [20, 25, 30, 38, 48, 55, 70, 80, 95, 120, 160, 205, 190, 175, 195, 210, 230, 260, 240, 205, 160, 105, 70, 40],
        p2m: [25, 30, 32, 40, 47, 55, 70, 85, 95, 120, 160, 205, 190, 175, 195, 210, 230, 260, 240, 205, 160, 105, 70, 40]
      },
      insight: "💡 <strong>Key Analytical Takeaway:</strong> The top 15% 'Champion' RFM customer cohort drove 62% of total Q4 Black Friday gross margins, highlighting strong ROI for loyalty tiering."
    },
    cyber: {
      title: "Network Threat Ingestion & Unauthorized Auth Anomaly Trend",
      kpis: [
        { label: "Events Ingested", val: "548,900", trend: "Real-time sync", isUp: true },
        { label: "Mean Time to Detect", val: "2.4 min", trend: "-68% MTTD", isUp: true },
        { label: "Flagged Bursts", val: "18 events", trend: "Zero breaches", isUp: true },
        { label: "Auth Success", val: "99.4%", trend: "Stable baseline", isUp: true }
      ],
      slices: {
        all: [8, 12, 18, 42, 65, 25, 14, 16, 22, 19, 15, 18, 20, 16, 19, 24, 30, 85, 120, 45, 22, 14, 10, 6],
        p2p: [4, 6, 9, 21, 32, 12, 7, 8, 11, 9, 7, 9, 10, 8, 9, 12, 15, 42, 60, 22, 11, 7, 5, 3],
        p2m: [4, 6, 9, 21, 33, 13, 7, 8, 11, 10, 8, 9, 10, 8, 10, 12, 15, 43, 60, 23, 11, 7, 5, 3]
      },
      insight: "💡 <strong>Key Analytical Takeaway:</strong> Correlation modeling identified port-scanning reconnaissance preceding brute-force spikes by exactly 18 minutes, enabling pre-emptive firewall rules."
    }
  };

  let currentDs = "upi";
  let currentSlice = "all";

  const simKpisContainer = document.getElementById("simKpis");
  const simChartTitle = document.getElementById("simChartTitle");
  const simInsightText = document.getElementById("simInsightText");
  const biCanvas = document.getElementById("interactiveBiCanvas");

  function renderSimulatorKPIs() {
    if (!simKpisContainer) return;
    const ds = simulatorData[currentDs];
    simKpisContainer.innerHTML = ds.kpis.map((kpi) => `
      <div class="sim-kpi-card">
        <span class="sim-kpi-title">${kpi.label}</span>
        <span class="sim-kpi-val">${kpi.val}</span>
        <span class="sim-kpi-trend ${kpi.isUp ? 'trend-up' : 'trend-down'}">${kpi.trend}</span>
      </div>
    `).join("");

    if (simChartTitle) simChartTitle.textContent = ds.title;
    if (simInsightText) simInsightText.innerHTML = ds.insight;
  }

  function renderSimulatorChart() {
    if (!biCanvas) return;
    const ctx = biCanvas.getContext("2d");
    const W = biCanvas.width = biCanvas.parentElement.offsetWidth;
    const H = biCanvas.height = biCanvas.parentElement.offsetHeight;

    ctx.clearRect(0, 0, W, H);

    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const gridColor = isLight ? "rgba(203, 213, 225, 0.5)" : "rgba(34, 52, 80, 0.4)";
    const textColor = isLight ? "#64748b" : "#94a3b8";
    const cyan = isLight ? "#0284c7" : "#00e5ff";
    const emerald = isLight ? "#059669" : "#10b981";

    const dataPoints = simulatorData[currentDs].slices[currentSlice] || simulatorData[currentDs].slices.all;
    const maxVal = Math.max(...dataPoints) * 1.2;

    const padLeft = 40;
    const padBottom = 30;
    const padTop = 20;
    const padRight = 20;

    const chartW = W - padLeft - padRight;
    const chartH = H - padTop - padBottom;

    // Draw horizontal grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.fillStyle = textColor;

    for (let i = 0; i <= 4; i++) {
      const y = padTop + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(W - padRight, y);
      ctx.stroke();

      const labelVal = Math.round(maxVal - (maxVal / 4) * i);
      ctx.fillText(labelVal, 5, y + 3);
    }

    // Draw area & line
    const stepX = chartW / (dataPoints.length - 1);

    // Gradient Fill
    const grad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
    grad.addColorStop(0, isLight ? "rgba(2, 132, 199, 0.3)" : "rgba(0, 229, 255, 0.35)");
    grad.addColorStop(1, "rgba(0, 229, 255, 0)");

    ctx.beginPath();
    dataPoints.forEach((val, idx) => {
      const x = padLeft + idx * stepX;
      const y = padTop + chartH - (val / maxVal) * chartH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.lineTo(padLeft + (dataPoints.length - 1) * stepX, padTop + chartH);
    ctx.lineTo(padLeft, padTop + chartH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line Path
    ctx.beginPath();
    dataPoints.forEach((val, idx) => {
      const x = padLeft + idx * stepX;
      const y = padTop + chartH - (val / maxVal) * chartH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = cyan;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Data points & X-axis labels
    dataPoints.forEach((val, idx) => {
      const x = padLeft + idx * stepX;
      const y = padTop + chartH - (val / maxVal) * chartH;

      // Draw point
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = emerald;
      ctx.fill();

      // X-Axis labels at intervals
      if (idx % 4 === 0) {
        ctx.fillStyle = textColor;
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillText(`${idx}:00`, x - 12, H - 10);
      }
    });
  }

  // Initial simulator render
  renderSimulatorKPIs();
  renderSimulatorChart();
  window.addEventListener("resize", renderSimulatorChart, { passive: true });

  // Simulator Dataset Switchers
  document.querySelectorAll(".sim-ds-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".sim-ds-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentDs = btn.getAttribute("data-ds");
      renderSimulatorKPIs();
      renderSimulatorChart();
    });
  });

  // Simulator Slice Filter Chips
  document.querySelectorAll(".sim-filter-chips .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".sim-filter-chips .chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      currentSlice = chip.getAttribute("data-slice");
      renderSimulatorChart();
    });
  });

  /* ── 13. CONTACT FORM SUBMISSION ────────────────────────────── */
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const formSuccessAlert = document.getElementById("formSuccessAlert");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!submitBtn) return;

      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <span>Sending Message...</span>
        <svg class="spin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
      `;
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
          if (formSuccessAlert) {
            formSuccessAlert.style.display = "block";
            setTimeout(() => {
              formSuccessAlert.style.display = "none";
            }, 6000);
          }
          showToast("Message sent successfully! I'll reply soon.");
        } else {
          throw new Error("Submission returned non-200");
        }
      } catch (err) {
        console.error("Form error:", err);
        showToast("Thanks! You can also reach me directly at pawanfunde96@gmail.com");
      } finally {
        submitBtn.innerHTML = originalBtnHtml;
        submitBtn.disabled = false;
      }
    });
  }

});
