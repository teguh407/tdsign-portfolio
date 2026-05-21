// tdsign — content renderer
// Loads _data/site.json then hydrates the DOM. This makes every text/image
// editable via the /admin Sveltia CMS panel.
(() => {
  'use strict';

  // SVG icons used by service cards
  const ICONS = {
    user: '<circle cx="12" cy="10" r="6"/><path d="M8 16l-2 6 6-3 6 3-2-6"/>',
    monitor: '<rect x="2" y="6" width="20" height="13" rx="2"/><path d="M8 22h8M12 19v3"/>',
    sparkle: '<path d="M12 2v4M12 18v4M5 12H1M23 12h-4M19 5l-3 3M8 16l-3 3M19 19l-3-3M8 8L5 5"/><circle cx="12" cy="12" r="4"/>',
    banner: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 12h18M9 5v14"/>',
    art: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M9 13l2 2 4-4"/>',
  };

  const esc = (s = '') => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const heading = (lead, accent) =>
    `${esc(lead)} <span class="gradient-text">${esc(accent)}</span>`;

  function renderHero(d) {
    document.querySelector('[data-bind="hero.badge"]').innerHTML =
      `<span class="sparkle-icon" style="color:var(--c-purple-2);width:10px;height:10px"></span>${esc(d.hero.badge)}`;
    document.querySelector('[data-bind="hero.title"]').innerHTML =
      `${esc(d.hero.title_line1)}<br /><span class="gradient-text">${esc(d.hero.title_line2)}</span>`;
    document.querySelector('[data-bind="hero.subtitle"]').textContent = d.hero.subtitle;
    document.querySelector('[data-bind="hero.cta_primary"]').innerHTML =
      `<span class="sparkle-icon"></span>${esc(d.hero.cta_primary)}`;
    document.querySelector('[data-bind="hero.cta_secondary"]').textContent = d.hero.cta_secondary;
    const heroImg = document.querySelector('[data-bind="hero.image"]');
    if (heroImg) heroImg.src = d.hero.hero_image;
  }

  function renderStats(stats) {
    const icons = [
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3 7-7"/><path d="M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h11"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><circle cx="17" cy="7" r="3"/></svg>',
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L4 7v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-5z"/></svg>',
    ];
    const wrap = document.querySelector('[data-bind="stats"]');
    wrap.innerHTML = stats.map((s, i) => `
      <div class="stat">
        <div class="stat-icon">${icons[i % 4]}</div>
        <div class="stat-num">${esc(s.value)}</div>
        <div class="stat-label">${esc(s.label)}</div>
      </div>`).join('');
  }

  function renderMascots(items) {
    document.querySelector('[data-bind="work.label"]').textContent = items.label;
    document.querySelector('[data-bind="work.title"]').innerHTML = heading(items.title_lead, items.title_accent);
    document.querySelector('[data-bind="work.sub"]').textContent = items.sub;

    document.querySelector('[data-bind="mascots"]').innerHTML = items.list.map(m => `
      <article class="mascot-card" data-color="${esc(m.color)}">
        <div class="mascot-art">
          <img src="${esc(m.image)}" alt="${esc(m.name)}" loading="lazy" />
        </div>
        <div class="mascot-info">
          <h3>${esc(m.name)}</h3>
          <p>${esc(m.role)}</p>
        </div>
      </article>`).join('');
  }

  function renderServices(items) {
    document.querySelector('[data-bind="services.label"]').textContent = items.label;
    document.querySelector('[data-bind="services.title"]').innerHTML = heading(items.title_lead, items.title_accent);
    document.querySelector('[data-bind="services.sub"]').textContent = items.sub;

    document.querySelector('[data-bind="services"]').innerHTML = items.list.map(s => `
      <div class="service-card">
        <div class="service-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ICONS[s.icon] || ICONS.user}</svg>
        </div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.desc)}</p>
        <a href="#contact" class="learn-more">Learn More →</a>
      </div>`).join('');
  }

  function renderProcess(items) {
    document.querySelector('[data-bind="process.label"]').textContent = items.label;
    document.querySelector('[data-bind="process.title"]').innerHTML = heading(items.title_lead, items.title_accent);
    document.querySelector('[data-bind="process.sub"]').textContent = items.sub;

    document.querySelector('[data-bind="process"]').innerHTML = items.list.map(p => `
      <div class="process-step">
        <div class="process-num">${esc(p.num)}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.desc)}</p>
      </div>`).join('');
  }

  function renderTestimonials(items) {
    document.querySelector('[data-bind="testimonials.label"]').textContent = items.label;
    document.querySelector('[data-bind="testimonials.title"]').innerHTML = heading(items.title_lead, items.title_accent);
    document.querySelector('[data-bind="testimonials.sub"]').textContent = items.sub;

    document.querySelector('[data-bind="testimonials"]').innerHTML = items.list.map(t => `
      <blockquote class="testimonial">
        <div class="t-quote">"</div>
        <div class="t-stars">★★★★★</div>
        <p>${esc(t.quote)}</p>
        <footer class="t-foot">
          <div class="t-avatar">${esc(t.initials)}</div>
          <div>
            <div class="t-name">${esc(t.name)} <span class="t-flag">${esc(t.flag)}</span></div>
            <div class="t-role">${esc(t.role)}</div>
          </div>
        </footer>
      </blockquote>`).join('');
  }

  function renderPricing(items, mascotImage) {
    document.querySelector('[data-bind="pricing.label"]').textContent = items.label;
    document.querySelector('[data-bind="pricing.title"]').innerHTML = heading(items.title_lead, items.title_accent);
    document.querySelector('[data-bind="pricing.sub"]').textContent = items.sub;

    document.querySelector('[data-bind="pricing"]').innerHTML = items.list.map(p => `
      <div class="price-card${p.popular ? ' popular' : ''}">
        ${p.popular ? '<div class="popular-badge">Most Popular</div>' : ''}
        <div class="price-tier">${esc(p.tier)}</div>
        <div class="price-name">${esc(p.name)}</div>
        <div class="price-amount"><span class="currency">$</span>${esc(p.amount)}</div>
        <div class="price-period">${esc(p.period)}</div>
        <ul class="price-features">
          ${p.features.map(f => `<li><span class="price-check"></span>${esc(f)}</li>`).join('')}
        </ul>
        <a href="#contact" class="btn ${p.popular ? 'btn-primary' : 'btn-ghost'}">${esc(p.cta_label)}</a>
      </div>`).join('');

    const wizardImg = document.querySelector('[data-bind="pricing_mascot_image"]');
    if (wizardImg) wizardImg.src = mascotImage;
  }

  function renderFinalCta(d) {
    document.querySelector('[data-bind="cta.label"]').textContent = d.label;
    document.querySelector('[data-bind="cta.title"]').innerHTML = heading(d.title_lead, d.title_accent);
    document.querySelector('[data-bind="cta.subtitle"]').textContent = d.subtitle;
    const fiverr = document.querySelector('[data-bind="cta.fiverr"]');
    fiverr.href = d.fiverr_url;
    fiverr.querySelector('span').textContent = d.fiverr_label;
    const contact = document.querySelector('[data-bind="cta.contact"]');
    contact.href = d.contact_url;
    contact.querySelector('span').textContent = d.contact_label;
  }

  function renderFooter(d, contact) {
    document.querySelector('[data-bind="footer.tagline"]').textContent = d.tagline;
    const links = [
      ['discord',   contact.discord],
      ['twitter',   contact.twitter],
      ['instagram', contact.instagram],
      ['youtube',   contact.youtube],
      ['email',     contact.email],
    ];
    links.forEach(([k, v]) => {
      const a = document.querySelector(`[data-bind="footer.${k}"]`);
      if (a && v) a.href = v;
    });
  }

  async function loadAndRender() {
    let data;
    try {
      const res = await fetch('_data/site.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error('http ' + res.status);
      data = await res.json();
    } catch (e) {
      console.error('[tdsign] failed to load _data/site.json:', e);
      document.body.classList.add('content-load-error');
      return;
    }

    try {
      renderHero(data);
      renderStats(data.stats);
      renderMascots({
        label: data.section_titles.work_label,
        title_lead: data.section_titles.work_title_lead,
        title_accent: data.section_titles.work_title_accent,
        sub: data.section_titles.work_sub,
        list: data.mascots,
      });
      renderServices({
        label: data.section_titles.services_label,
        title_lead: data.section_titles.services_title_lead,
        title_accent: data.section_titles.services_title_accent,
        sub: data.section_titles.services_sub,
        list: data.services,
      });
      renderProcess({
        label: data.section_titles.process_label,
        title_lead: data.section_titles.process_title_lead,
        title_accent: data.section_titles.process_title_accent,
        sub: data.section_titles.process_sub,
        list: data.process,
      });
      renderTestimonials({
        label: data.section_titles.testimonials_label,
        title_lead: data.section_titles.testimonials_title_lead,
        title_accent: data.section_titles.testimonials_title_accent,
        sub: data.section_titles.testimonials_sub,
        list: data.testimonials,
      });
      renderPricing({
        label: data.section_titles.pricing_label,
        title_lead: data.section_titles.pricing_title_lead,
        title_accent: data.section_titles.pricing_title_accent,
        sub: data.section_titles.pricing_sub,
        list: data.pricing,
      }, data.pricing_mascot_image);
      renderFinalCta(data.final_cta);
      renderFooter(data.footer, data.contact);

      document.body.classList.add('content-loaded');
      document.dispatchEvent(new CustomEvent('content:rendered'));
    } catch (e) {
      console.error('[tdsign] render failed:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAndRender);
  } else {
    loadAndRender();
  }
})();
