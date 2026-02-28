# Tiffin Kart

**Premium tiffin delivery website for a home-cooked food service in Nagpur, India.**

A modern, animated website built with Next.js 14, Three.js, and Framer Motion — featuring a 3D scroll-driven tiffin box, Google Sheets API integration for live menu updates, and an editorial design system with custom typography.

> Built for a real client. Serving real customers. Delivering real meals.

---

## Live Site

**[tiffincart.in](https://tiffincart.in)** — Deployed on Netlify

---

## Features

**Website**
- Scroll-driven 3D tiffin box animation (Three.js + React Three Fiber)
- Character-by-character text reveal in hero section
- Smooth scroll with Lenis
- Editorial design with fluid typography (Clash Display + Satoshi + Fraunces)
- Mobile-first responsive design
- Accessibility: reduced-motion fallback for all animations
- WhatsApp floating action button for instant customer contact

**Content**
- Dynamic "Today's Menu" — powered by Google Sheets API (client updates on his phone)
- Pricing cards with lunch / dinner / combo plans
- Full ingredient transparency with nutrition breakdown
- Fit Bite — premium health-focused meal concept section
- Laundry service secondary highlight
- Customer testimonials (horizontal scroll cards)
- 3-step "How It Works" process

**Technical**
- Static Site Generation (SSG) for instant page loads
- API route with CDN caching (1-hour TTL + stale-while-revalidate)
- Zero-cost CMS via Google Sheets
- Netlify deployment with auto-deploy on push

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [Next.js 14](https://nextjs.org) (App Router, TypeScript) |
| UI | [React 18](https://react.dev) |
| 3D | [Three.js](https://threejs.org) + [React Three Fiber](https://r3f.docs.pmnd.rs) + [Drei](https://drei.docs.pmnd.rs) |
| Animation | [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com) |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com) |
| Typography | Clash Display + Satoshi ([Fontshare](https://fontshare.com)) + Fraunces ([Google Fonts](https://fonts.google.com/specimen/Fraunces)) |
| Icons | [Lucide React](https://lucide.dev) |
| Data | [Google Sheets API v4](https://developers.google.com/sheets/api) |
| Deployment | [Netlify](https://netlify.com) |

---

## Project Structure

```
tiffin-cart/
├── app/
│   ├── page.tsx                # Homepage
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── globals.css             # Global styles + button components
│   ├── api/menu/route.ts       # Google Sheets API endpoint
│   └── menu/page.tsx           # Full menu page
│
├── components/
│   ├── sections/               # Page sections
│   │   ├── Hero.tsx            # Animated hero with character reveal
│   │   ├── WhatWeOffer.tsx     # Pricing cards + marquee
│   │   ├── TiffinBox3D.tsx     # 3D scroll-driven tiffin animation
│   │   ├── TodaysMenu.tsx      # Menu list (editorial table)
│   │   ├── Ingredients.tsx     # Nutrition transparency grid
│   │   ├── FitBite.tsx         # Premium health meal concept
│   │   ├── HowItWorks.tsx      # 3-step process
│   │   ├── LaundryService.tsx  # Secondary service callout
│   │   ├── Testimonials.tsx    # Horizontal scroll testimonials
│   │   └── FooterCTA.tsx       # Final conversion CTA
│   ├── layout/                 # Navbar, Footer, WhatsAppFAB
│   ├── three/                  # Three.js components (scene, model, particles)
│   └── ui/                     # Container, Marquee
│
├── lib/
│   ├── constants.ts            # Pricing, contact, nav links
│   ├── google-sheets.ts        # Google Sheets API helper
│   ├── fonts.ts                # Font configuration
│   └── utils.ts                # Utility functions
│
├── docs/
│   ├── architecture.md         # System architecture
│   ├── technical-guide.md      # Setup & development guide
│   ├── google-sheets-integration.md  # How Sheets integration works
│   └── price-comparison.md     # Real-world pricing comparison
│
├── tailwind.config.ts          # Design tokens (colors, fonts, type scale)
├── netlify.toml                # Deployment configuration
└── package.json                # Dependencies
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/Darshan-1820/tiffin-cart.git
cd tiffin-cart
npm install
```

### Environment Variables

Create `.env.local`:

```env
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id
```

> The app runs without these — menu section shows sample data. See `docs/google-sheets-integration.md` for full setup.

### Development

```bash
npm run dev        # Start dev server → http://localhost:3000
npm run build      # Production build
npm run start      # Run production build locally
npm run lint       # Check for code issues
```

---

## Design System

### Colors
| Token | Hex | Role |
|-------|-----|------|
| Cream | `#FAF8F3` | Backgrounds |
| Charcoal | `#1C1C1C` | Text, dark sections |
| Accent | `#E8702A` | CTAs, highlights |
| Surface | `#F4F0EA` | Alternate backgrounds |
| Muted | `#9C9889` | Secondary text |

### Typography
- **Clash Display** — Headlines and display text
- **Satoshi** — Body text and UI elements
- **Fraunces** — Serif accents (menu items, quotes)

### Animation
All transitions use `cubic-bezier(0.76, 0, 0.24, 1)` — a snappy, editorial easing curve.

---

## Architecture Overview

```
Browser → Static HTML (CDN)
             ↓ (on-demand)
         API Route (/api/menu)
             ↓
         Google Sheets API
             ↓
         Client's Google Sheet (updated on phone)
```

The homepage is statically generated at build time. The menu API is a serverless function that reads from Google Sheets with 1-hour CDN caching. Full architecture details in `docs/architecture.md`.

---

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](docs/architecture.md) | System design, tech decisions, folder structure |
| [Technical Guide](docs/technical-guide.md) | Setup, development, deployment instructions |
| [Google Sheets Integration](docs/google-sheets-integration.md) | How the live menu system works end-to-end |
| [Price Comparison](docs/price-comparison.md) | Real-world cost analysis of this project |

---

## Deployment

Deployed on **Netlify** with automatic deploys from the `main` branch.

- Build command: `npm run build`
- Publish directory: `.next`
- Plugin: `@netlify/plugin-nextjs` for serverless function support

---

## Performance

| Metric | Value |
|--------|-------|
| Homepage First Load JS | ~151 KB |
| Build time | ~10s |
| Lighthouse Performance | 90+ |
| 3D loaded on demand | `next/dynamic` (not in initial bundle) |
| API caching | 1 hour CDN + 30 min stale-while-revalidate |

---

## License

This project is built for a real business client. The code is open-source for portfolio and educational purposes.

---

**Built by [Darshan](https://github.com/Darshan-1820) | [Shiparaj Solutions](https://shiparaj.com)**
