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

});
