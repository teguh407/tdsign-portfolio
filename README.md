# tdsign — Custom Anime Logos & Streamer Branding

[![Live Demo](https://img.shields.io/badge/live%20demo-online-8b5cf6?style=flat-square)](https://teguh407.github.io/tdsign-portfolio/)
[![Built with](https://img.shields.io/badge/built%20with-HTML%20%2B%20CSS%20%2B%20JS-3b82f6?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-ec4899?style=flat-square)](LICENSE)

Premium dark, anime-inspired streamer portfolio for **tdsign** — a freelance mascot logo designer for Twitch streamers, VTubers, and content creators.

> Vibrant blue → purple → pink gradients, chibi mascot showcase, sparkle particles, full pricing & process flow.

## Live demo

→ **https://teguh407.github.io/tdsign-portfolio/**

## Sections

- **Nav** — Home · Work · Services · Pricing · Testimonials · About · FAQ + Order Now CTA
- **Hero** — chibi mascot + TD SIGN esports logo + 3 floating stream-overlay cards + 4-stat row
- **Selected Projects** — 5 mascot cards (Rayzen, Lunaria, Itsuki, Kuma, Yami)
- **Services** — Chibi Logo · Stream Package · VTuber Branding · Social Banner · Custom Illustration
- **Process** — 4-step (Brief → Sketch → Color → Delivery) with dotted line
- **Testimonials** — 3 quote cards w/ flags + nav arrows
- **Pricing** — Basic $25 · Streamer $75 (Most Popular) · Premium $150
- **CTA strip** — Order via Fiverr / Contact Me
- **Footer** — Discord, Twitter, Instagram, YouTube, Email socials

## Stack

```
HTML5  ·  CSS3 (custom props, grid, container)
Vanilla JS — reveal-on-scroll, hero parallax, active nav
Google Fonts: Inter + Space Grotesk
Zero build step. Static. Drop into any host.
```

## Project structure

```
tdsign-portfolio/
├── index.html            # all sections in one document
├── css/style.css         # design system + components
├── js/main.js            # reveal + parallax + nav
└── assets/
    ├── favicon.svg
    └── og.svg
```

## Run locally

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Customize

| What | Where |
|---|---|
| Brand name / nav | `index.html` → `.logo`, `.nav-links` |
| Hero copy | `index.html` → `.hero-title`, `.hero-sub` |
| Stats | `index.html` → `.hero-stats` |
| Portfolio mascots | `index.html` → `.portfolio-row` |
| Services | `index.html` → `.services-grid` |
| Pricing tiers | `index.html` → `.pricing-grid` |
| Color palette | `css/style.css` → `:root` `--c-*` |
| Fonts | `<link>` in `<head>` + `--font-*` in CSS |

## Swap chibi placeholders for real artwork

Mascot cards currently use emoji-on-glow placeholders so the layout works out of the box. Replace any `.mascot-art` with:

```html
<div class="mascot-art">
  <img src="assets/rayzen.png" alt="Rayzen" loading="lazy" style="width:100%;height:100%;object-fit:cover" />
</div>
```

Same swap works for the hero `.chibi-hero` block — replace the `.chibi` inner markup with a single transparent PNG.

## License

MIT © 2026 tdsign
