// tdsign portfolio — interactivity (post-render)
// Waits for `content:rendered` event from render.js before wiring reveal /
// parallax / smooth scroll, since cards & sections are injected dynamically.
(() => {
  'use strict';

  function initReveal() {
    const targets = document.querySelectorAll(
      '.section-head, .mascot-card, .service-card, .process-step, .testimonial, .price-card, .final-cta-card'
    );
    targets.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${Math.min(i, 4) * 60}ms`;
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      targets.forEach(el => io.observe(el));
    } else {
      targets.forEach(el => el.classList.add('visible'));
    }
  }

  function initParallax() {
    const illust = document.querySelector('.hero-illust');
    if (!illust || !window.matchMedia('(min-width: 900px)').matches) return;

    const chibi = illust.querySelector('.chibi-hero');
    const cards = illust.querySelectorAll('.stream-card');

    illust.addEventListener('mousemove', (e) => {
      const r = illust.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      if (chibi) chibi.style.transform = `translate(${x * 12}px, ${y * 8}px)`;
      cards.forEach((card, i) => {
        const depth = (i + 1) * 6;
        const baseRot = parseFloat(card.dataset.rot || (
          card.classList.contains('s2') ? -4 :
          card.classList.contains('s3') ? 8 : 6
        ));
        card.dataset.rot = baseRot;
        card.style.transform = `translate(${x * depth}px, ${y * depth}px) rotate(${baseRot + x * 2}deg)`;
      });
    });
    illust.addEventListener('mouseleave', () => {
      if (chibi) chibi.style.transform = '';
      cards.forEach(card => { card.style.transform = ''; });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
          const t = document.querySelector(id);
          if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        }
      });
    });
  }

  function initActiveNav() {
    const sections = ['#work', '#services', '#pricing', '#testimonials']
      .map(id => document.querySelector(id))
      .filter(Boolean);
    const navLinks = document.querySelectorAll('.nav-links a:not(.admin-link)');
    if (!sections.length) return;

    const setActive = () => {
      let active = null;
      const y = window.scrollY + 120;
      sections.forEach(s => { if (s.offsetTop <= y) active = '#' + s.id; });
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === (active || '#'));
      });
    };
    window.addEventListener('scroll', setActive, { passive: true });
  }

  function init() {
    initReveal();
    initParallax();
    initSmoothScroll();
    initActiveNav();
  }

  // Render is async — wait for it. Fall back to DOM-ready if event already fired.
  if (document.body.classList.contains('content-loaded')) {
    init();
  } else {
    document.addEventListener('content:rendered', init, { once: true });
    // Hard fallback in case render fails — still wire up static parts.
    setTimeout(() => {
      if (!document.body.classList.contains('content-loaded')) {
        initSmoothScroll();
      }
    }, 3000);
  }
})();
