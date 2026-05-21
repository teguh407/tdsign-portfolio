# tdsign — Premium Mascot Logo Portfolio

[![Live Demo](https://img.shields.io/badge/live%20demo-online-8b7cff?style=flat-square)](https://teguh407.github.io/tdsign-portfolio/)
[![Built with](https://img.shields.io/badge/built%20with-HTML%20%2B%20CSS%20%2B%20JS-5cb8ff?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-c994ff?style=flat-square)](LICENSE)

Premium dark, anime-inspired streamer portfolio for **tdsign** — a freelance mascot logo designer for Twitch streamers and VTubers.

> Modern SaaS minimalism × anime creator aesthetic. Soft blue/purple accents, large portfolio previews, smooth motion, no neon clutter.

## Live demo

→ **https://teguh407.github.io/tdsign-portfolio/**

## Highlights

- Hero with floating mascot showcase + parallax tilt
- 6-card asymmetric portfolio grid (CSS-art mascots, swap with real PNGs anytime)
- Service tiers with pricing & timelines
- 4-step process section
- Testimonial wall
- CTA card with availability indicator
- Animated background blobs + grid mask
- Reveal-on-scroll via IntersectionObserver
- Fully responsive (1200 → 320 px)
- `prefers-reduced-motion` respected

## Stack

```
HTML5  ·  CSS3 (custom properties, grid, container queries-ready)
Vanilla JS (no framework, ~2 KB)
Google Fonts: Inter + Space Grotesk
Zero build step — drop into any static host.
```

## Project structure

```
tdsign-portfolio/
├── index.html            # all sections in one document
├── css/style.css         # design system + components
├── js/main.js            # reveal + parallax
└── assets/
    ├── favicon.svg
    └── og.svg
```

## Run locally

```bash
# any static server works
python3 -m http.server 8080
# → http://localhost:8080
```

## Customize

| What | Where |
|---|---|
| Brand name / nav | `index.html` → `.logo`, `.nav-links` |
| Hero copy | `index.html` → `.hero-title`, `.hero-sub` |
| Portfolio entries | `index.html` → `.portfolio-grid` |
| Mascot art | swap `[data-art="..."]` blocks for `<img>` tags |
| Color palette | `css/style.css` → `:root` `--accent-*` |
| Fonts | `<link>` in `<head>` + `--font-*` in CSS |

## Deploying mascot images (real artwork)

Replace any `<div class="work-art" data-art="...">` with:

```html
<div class="work-art">
  <img src="assets/mascot-kira.png" alt="Kira the Kitsune" loading="lazy" />
  <div class="work-tag">Featured · Mascot Identity</div>
</div>
```

Add a tiny CSS rule:

```css
.work-art img { width: 100%; height: 100%; object-fit: cover; }
```

## License

MIT © 2026 tdsign
