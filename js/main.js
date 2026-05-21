// tdsign portfolio — interactivity
(() => {
  'use strict';

  // Intersection-based reveal for sections / cards
  const revealTargets = document.querySelectorAll(
    '.section-head, .work-card, .service-card, .process-step, .testimonial, .cta-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // light stagger
          entry.target.style.transitionDelay = `${Math.min(i, 4) * 60}ms`;
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('visible'));
  }

  // Subtle parallax on hero showcase cards
  const showcase = document.querySelector('.hero-showcase');
  if (showcase && window.matchMedia('(min-width: 800px)').matches) {
    const cards = showcase.querySelectorAll('.showcase-card');
    showcase.addEventListener('mousemove', (e) => {
      const rect = showcase.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cards.forEach((card, idx) => {
        const depth = (idx + 1) * 6;
        const baseRot = card.classList.contains('card-2') ? -9
          : card.classList.contains('card-3') ? 8 : 0;
        const tx = card.classList.contains('card-1') ? '-50%' : '0';
        card.style.transform =
          `${card.classList.contains('card-1') ? 'translateX(-50%) ' : ''}` +
          `translate(${x * depth}px, ${y * depth}px) rotate(${baseRot + x * 2}deg)`;
      });
    });
    showcase.addEventListener('mouseleave', () => {
      cards.forEach(card => { card.style.transform = ''; });
    });
  }

  // Smooth-scroll polish for anchors (browsers w/o smooth in CSS)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();
