// ===== Intro splash animation =====
const introOverlay = document.getElementById('intro-overlay');
const introDigital = document.getElementById('intro-digital');
const introTk = document.getElementById('intro-tk');

// Typewriter for "Digital" after the 3D spin finishes
const typeText = 'Digital';
let charIndex = 0;

setTimeout(() => {
  const typeInterval = setInterval(() => {
    introDigital.textContent += typeText[charIndex];
    charIndex++;
    if (charIndex === typeText.length) {
      clearInterval(typeInterval);
      introDigital.classList.add('done');
      // Fade out the overlay
      setTimeout(() => {
        introOverlay.classList.add('fade-out');
        setTimeout(() => {
          introOverlay.style.display = 'none';
        }, 600);
      }, 400);
    }
  }, 150);
}, 1300); // Start typing after spin completes

// ===== Hero particles =====
const canvas = document.getElementById('hero-particles');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const particleCount = 60;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.4 + 0.1
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    // Move
    p.x += p.speedX;
    p.y += p.speedY;

    // Wrap
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    // Draw dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(201, 169, 110, ${p.opacity})`;
    ctx.fill();

    // Draw connections
    for (let j = i + 1; j < particles.length; j++) {
      const dx = p.x - particles[j].x;
      const dy = p.y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(201, 169, 110, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

// ===== Ambient full-page particles =====
const ambientCanvas = document.getElementById('ambient-particles');
const ambientCtx = ambientCanvas.getContext('2d');

function resizeAmbientCanvas() {
  ambientCanvas.width = window.innerWidth;
  ambientCanvas.height = window.innerHeight;
}
resizeAmbientCanvas();
window.addEventListener('resize', resizeAmbientCanvas);

const ambientParticles = [];
const ambientCount = 85;

for (let i = 0; i < ambientCount; i++) {
  ambientParticles.push({
    x: Math.random() * ambientCanvas.width,
    y: Math.random() * ambientCanvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.4 + 0.1
  });
}

function drawAmbientParticles() {
  ambientCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);

  ambientParticles.forEach((p, i) => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = ambientCanvas.width;
    if (p.x > ambientCanvas.width) p.x = 0;
    if (p.y < 0) p.y = ambientCanvas.height;
    if (p.y > ambientCanvas.height) p.y = 0;

    ambientCtx.beginPath();
    ambientCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ambientCtx.fillStyle = `rgba(201, 169, 110, ${p.opacity})`;
    ambientCtx.fill();

    for (let j = i + 1; j < ambientParticles.length; j++) {
      const dx = p.x - ambientParticles[j].x;
      const dy = p.y - ambientParticles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ambientCtx.beginPath();
        ambientCtx.moveTo(p.x, p.y);
        ambientCtx.lineTo(ambientParticles[j].x, ambientParticles[j].y);
        ambientCtx.strokeStyle = `rgba(201, 169, 110, ${0.08 * (1 - dist / 120)})`;
        ambientCtx.lineWidth = 0.5;
        ambientCtx.stroke();
      }
    }
  });

  requestAnimationFrame(drawAmbientParticles);
}
drawAmbientParticles();

// ===== Scroll progress bar =====
const scrollProgress = document.getElementById('scroll-progress');

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Progress bar
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';

  // Navbar
  if (scrollTop > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (scrollTop >= top) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ===== Mobile menu toggle =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// ===== Scroll fade-in animations =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to animatable elements
document.querySelectorAll(
  '.service-card, .about-text, .about-stats, .carousel, .cal-embed, .contact-form, .contact-divider, .section-title, .section-sub, .process-step, .cta-content'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== Stat counter animation =====
const statNumbers = document.querySelectorAll('.stat-number');
let statsCounted = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsCounted) {
      statsCounted = true;
      statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            num.textContent = target;
            clearInterval(timer);
          } else {
            num.textContent = Math.floor(current);
          }
        }, 30);
      });
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Portfolio carousel (ported from aloveforjesus) =====
// Native scroll-snap track with prev/next arrows that scroll one "page"
// (the number of fully visible cards) at a time and disable at the ends.
(function () {
  const carousel = document.getElementById('portfolio-carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.car-track');
  const prevBtn = carousel.querySelector('.car-prev');
  const nextBtn = carousel.querySelector('.car-next');
  if (!track || !prevBtn || !nextBtn) return;

  function checkArrows() {
    prevBtn.disabled = track.scrollLeft <= 0;
    nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }

  function scroll(dir) {
    const item = track.querySelector('.car-item');
    if (!item) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const pageWidth = item.offsetWidth + gap;
    const visibleCount = Math.round(track.clientWidth / pageWidth);
    track.scrollBy({ left: dir * pageWidth * Math.max(visibleCount, 1), behavior: 'smooth' });
  }

  prevBtn.addEventListener('click', () => scroll(-1));
  nextBtn.addEventListener('click', () => scroll(1));
  track.addEventListener('scroll', checkArrows, { passive: true });
  window.addEventListener('resize', checkArrows);
  checkArrows();
})();

// ===== Contact form submission (EmailJS) =====
// Setup instructions:
// 1. Create a free account at https://www.emailjs.com
// 2. Add an email service (connect your email provider)
// 3. Create two email templates:
//    - "contact_notification": sends form data to thomas@tkdigital.media
//      Subject: "New enquiry from {{from_name}}"
//      Body: includes {{from_name}}, {{from_email}}, {{message}}
//    - "contact_confirmation": auto-reply to {{from_email}}
//      Subject: "Thanks for reaching out to TKDigital!"
//      Body: confirmation message with {{from_name}}
// 4. Replace the placeholder values below with your actual IDs:
const EMAILJS_PUBLIC_KEY = 'HXx4oph6308vM8t__';
const EMAILJS_SERVICE_ID = 'service_vltp3uj';
const EMAILJS_NOTIFICATION_TEMPLATE_ID = 'template_z8bqqy7';
const EMAILJS_CONFIRMATION_TEMPLATE_ID = 'template_c9frufn';

emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-loading');
    submitBtn.textContent = 'Sending...';

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message
    };

    // Send notification email to thomas@tkdigital.media, then confirmation to sender
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_NOTIFICATION_TEMPLATE_ID, templateParams)
      .then(() => {
        return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONFIRMATION_TEMPLATE_ID, templateParams);
      })
      .then(() => {
        // Success
        submitBtn.classList.remove('btn-loading');
        submitBtn.classList.add('btn-success');
        submitBtn.textContent = 'Message Sent!';
        contactForm.reset();

        setTimeout(() => {
          submitBtn.classList.remove('btn-success');
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }, 3000);
      })
      .catch((error) => {
        // Error
        console.error('EmailJS error:', error);
        submitBtn.classList.remove('btn-loading');
        submitBtn.classList.add('btn-error');
        submitBtn.textContent = 'Failed to send — please try again';

        setTimeout(() => {
          submitBtn.classList.remove('btn-error');
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }, 4000);
      });
  });
}
