/* ════════════════════════════════════════════════
   PAUL RITHISH P — PORTFOLIO SCRIPTS
════════════════════════════════════════════════ */

// Formspree handles submission directly, no initialization required

// ── TYPED ANIMATION ───────────────────────────
const roles = [
  "Python Developer",
  "Machine Learning Enthusiast",
  "Computer Vision Developer",
  "AI Systems Builder",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 95;

function typeRole() {
  const el = document.getElementById("typedText");
  if (!el) return;

  const current = roles[roleIndex];

  if (!isDeleting) {
    el.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      typingSpeed = 1800; // pause before deleting
    } else {
      typingSpeed = 95;
    }
  } else {
    el.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 300;
    } else {
      typingSpeed = 50;
    }
  }
  setTimeout(typeRole, typingSpeed);
}

// ── NAVBAR ────────────────────────────────────
const navbar   = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks  = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
  updateBackToTop();
  updateActiveLink();
});

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close menu when a link is clicked
navLinks.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ── ACTIVE NAV LINK ───────────────────────────
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach((sec) => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute("id");
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}

// ── SCROLL REVEAL ─────────────────────────────
const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ── BACK TO TOP ───────────────────────────────
const backBtn = document.getElementById("backToTop");

function updateBackToTop() {
  backBtn.classList.toggle("visible", window.scrollY > 400);
}

backBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ── SMOOTH SCROLL for all anchor links ────────
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"));
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// ── FORMSPREE CONTACT FORM ────────────────────
const contactForm = document.getElementById("contactForm");
const formStatus  = document.getElementById("formStatus");
const submitBtn   = document.getElementById("submitBtn");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btnText    = submitBtn.querySelector(".btn-text");
  const btnLoading = submitBtn.querySelector(".btn-loading");

  // Show loading state
  btnText.style.display    = "none";
  btnLoading.style.display = "inline-flex";
  submitBtn.disabled       = true;
  formStatus.textContent   = "";
  formStatus.className     = "form-status";

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      formStatus.textContent = "✓ Message sent! I'll get back to you soon.";
      formStatus.classList.add("success");
      contactForm.reset();
    } else {
      const data = await response.json();
      if (data && data.errors) {
        formStatus.textContent = "✗ " + data.errors.map(error => error.message).join(", ");
      } else {
        formStatus.textContent = "✗ Oops — something went wrong. Try again or email me directly.";
      }
      formStatus.classList.add("error");
    }
  } catch (err) {
    console.error("Formspree error:", err);
    formStatus.textContent = "✗ Oops — something went wrong. Try again or email me directly.";
    formStatus.classList.add("error");
  } finally {
    btnText.style.display    = "inline-flex";
    btnLoading.style.display = "none";
    submitBtn.disabled       = false;
  }
});

// ── SKILL TAG TOOLTIP (level on hover) ────────
document.querySelectorAll(".skill-tag").forEach((tag) => {
  const level = tag.dataset.level;
  if (!level) return;

  tag.addEventListener("mouseenter", () => {
    const original = tag.textContent;
    tag.dataset.original = original;
    tag.textContent = `${original} · ${level}%`;
  });

  tag.addEventListener("mouseleave", () => {
    tag.textContent = tag.dataset.original;
  });
});

// ── INIT ──────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeRole, 600);
  updateActiveLink();
});