# Architecture — Tiffin Kart

**System architecture and technical decisions for the Tiffin Kart website.**

---

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                     │
│                                                          │
│  Next.js App (Static HTML + React hydration)             │
│  ├── Homepage (SSG — pre-built at deploy time)           │
│  │   ├── Hero (Framer Motion animations)                 │
│  │   ├── WhatWeOffer (pricing cards)                     │
│  │   ├── TiffinBox3D (Three.js + scroll-driven)          │
│  │   ├── TodaysMenu (sample data — static)               │
│  │   ├── Ingredients (transparency showcase)             │
│  │   ├── FitBite (premium meal concept)                  │
│  │   ├── HowItWorks (3-step process)                     │
│  │   ├── LaundryService (secondary service)              │
│  │   ├── Testimonials (horizontal scroll)                │
│  │   └── FooterCTA (WhatsApp conversion)                 │
│  │                                                       │
│  └── /menu page (can fetch live data from API)           │
│                                                          │
└─────────────┬───────────────────────────────────────────┘
              │ API call (when needed)
              ▼
┌─────────────────────────────────────────────────────────┐
│                  NEXT.JS API ROUTE                        │
│            /api/menu (serverless function)                │
│                                                          │
│  - Authenticates with Google via Service Account JWT     │
│  - Reads Google Sheet → returns JSON                     │
│  - Cached at CDN level (1 hour)                          │
└─────────────┬───────────────────────────────────────────┘
              │ Google Sheets API v4
              ▼
┌─────────────────────────────────────────────────────────┐
│                    GOOGLE SHEETS                         │
│           (Client updates on his phone)                  │
│                                                          │
│  Tab: "Menu"                                             │
│  Columns: Meal Type | Dish Name | Ingredients | Calories │
└─────────────────────────────────────────────────────────┘

Deployment: Netlify (CDN + Serverless Functions)
```

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 14 (App Router) | SSG for speed, API routes for dynamic data, file-based routing |
| **Language** | TypeScript | Type safety, better developer experience |
| **UI Library** | React 18 | Component-based architecture, ecosystem |
| **Styling** | Tailwind CSS 3.4 | Utility-first, rapid development, no CSS files to manage |
| **3D Graphics** | Three.js + React Three Fiber + Drei | 3D tiffin box with scroll-driven animation |
| **Animations** | Framer Motion | Scroll-triggered reveals, page transitions, micro-interactions |
| **Scroll** | GSAP + Lenis | Smooth scroll behavior, premium feel |
| **Icons** | Lucide React | Lightweight, tree-shakeable icon set |
| **Fonts** | Clash Display + Satoshi (Fontshare) + Fraunces (Google) | Editorial typography — display, body, serif |
| **Data** | Google Sheets API v4 | Zero-cost CMS — client updates sheet, website reflects it |
| **Deployment** | Netlify | Free tier, CDN, serverless functions, auto-deploy from Git |
| **Package Manager** | npm | Standard Node.js package manager |

---

## Folder Structure

```
tiffin-cart/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, LenisProvider
│   ├── page.tsx                # Homepage — assembles all sections
│   ├── globals.css             # Global styles, button components, animations
│   ├── api/
│   │   └── menu/
│   │       └── route.ts        # API route — fetches menu from Google Sheets
│   └── menu/
│       └── page.tsx            # Dedicated full menu page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav, mobile menu (circle clip reveal)
│   │   ├── Footer.tsx          # Minimal footer
│   │   ├── WhatsAppFAB.tsx     # Floating WhatsApp button
│   │   └── LenisProvider.tsx   # Smooth scroll wrapper
│   │
│   ├── sections/
│   │   ├── Hero.tsx            # Character-by-character text reveal + parallax
│   │   ├── WhatWeOffer.tsx     # Pricing cards + marquee divider
│   │   ├── TiffinBox3D.tsx     # Scroll-driven 3D tiffin animation wrapper
│   │   ├── TodaysMenu.tsx      # Menu list (editorial table style)
│   │   ├── Ingredients.tsx     # Nutrition transparency grid
│   │   ├── FitBite.tsx         # Premium health-focused meal concept
│   │   ├── HowItWorks.tsx      # 3-step process cards
│   │   ├── LaundryService.tsx  # Secondary service callout
│   │   ├── Testimonials.tsx    # Horizontal scroll quote cards
│   │   └── FooterCTA.tsx       # Final conversion section
│   │
│   ├── three/
│   │   ├── TiffinScene.tsx     # Three.js canvas + scene setup
│   │   ├── TiffinModel.tsx     # 3D tiffin box geometry + materials
│   │   └── SteamParticles.tsx  # Particle effect above tiffin
│   │
│   ├── ui/
│   │   ├── Container.tsx       # Max-width wrapper
│   │   └── Marquee.tsx         # Infinite scrolling text strip
│   │
│   └── rive/
│       └── RiveIcon.tsx        # Rive animation component
│
├── lib/
│   ├── constants.ts            # Pricing, contact info, nav links, site metadata
│   ├── fonts.ts                # Font configuration (Fraunces via next/font)
│   ├── google-sheets.ts        # Google Sheets API integration
│   └── utils.ts                # Utility functions (cn — class merging)
│
├── docs/
│   ├── architecture.md         # This file
│   ├── technical-guide.md      # Setup & development guide
│   ├── google-sheets-integration.md  # How the Sheets integration works
│   └── price-comparison.md     # Real-world pricing comparison
│
├── public/                     # Static assets (images, 3D models)
├── tailwind.config.ts          # Tailwind configuration (colors, fonts, type scale)
├── next.config.mjs             # Next.js configuration
├── netlify.toml                # Netlify deployment configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

---

## Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | `#FAF8F3` | Background, light text on dark |
| `charcoal` | `#1C1C1C` | Primary text, dark backgrounds |
| `accent` | `#E8702A` | CTAs, highlights, brand accent (warm orange) |
| `accent-light` | `#FFECD2` | Subtle accent backgrounds |
| `surface` | `#F4F0EA` | Alternate light background |
| `muted` | `#9C9889` | Secondary text, captions |
| `emerald-400` | (Tailwind) | Fit Bite brand accent (green) |

### Typography
| Role | Font | Weight | Style |
|------|------|--------|-------|
| Display / Headings | Clash Display | 400–700 | Bold, tight tracking |
| Body text | Satoshi | 400–700 | Clean, readable |
| Serif accents | Fraunces | Italic | Editorial quotes, menu items |

### Type Scale (Fluid)
| Token | Size | Usage |
|-------|------|-------|
| `display` | `clamp(3.5rem, 10vw, 9rem)` | Hero headline |
| `h1` | `clamp(2.5rem, 7vw, 6rem)` | Section headlines |
| `h2` | `clamp(1.75rem, 4.5vw, 3.5rem)` | Sub-headlines |
| `h3` | `clamp(1.25rem, 2vw, 1.75rem)` | Card titles |

### Animation Pattern
All animations use the same easing: `[0.76, 0, 0.24, 1]` (cubic-bezier) — a snappy, editorial ease that feels intentional, not bouncy.

---

## Key Architectural Decisions

### 1. Static Site Generation (SSG) over Server-Side Rendering (SSR)
The homepage is fully static — pre-built at deploy time. This means:
- Instant page loads (served from CDN)
- No server needed for the main page
- The only dynamic part (menu API) is a separate serverless function

### 2. Google Sheets as CMS
Instead of building a database + admin panel (complex, costs money), we use Google Sheets:
- Client already knows how to use Google Sheets on his phone
- Zero hosting cost
- The API route reads the sheet and caches for 1 hour
- Phase 3 will replace this with a proper admin panel

### 3. Three.js for 3D (not a video or image)
The 3D tiffin box is interactive and scroll-driven. Why not just an image?
- Scroll-driven animation creates engagement
- Differentiates from every other tiffin website
- Demonstrates technical capability (portfolio piece)
- Reduced-motion fallback for accessibility

### 4. Netlify over Vercel
Both work with Next.js. Netlify was chosen because:
- Free tier is generous (100GB bandwidth, 300 build minutes)
- Supports Next.js via `@netlify/plugin-nextjs`
- Custom domain setup is straightforward

### 5. No Database
Phase 1 has no database. All data is either:
- Hardcoded in constants (pricing, contact info)
- In Google Sheets (menu)
- Static (testimonials — will become dynamic in Phase 3)

---

## Performance Considerations

| Technique | Implementation |
|-----------|---------------|
| Code splitting | Three.js loaded via `next/dynamic` — not in initial bundle |
| Font loading | Fontshare fonts via preconnect, Fraunces via `next/font` |
| Image optimization | Next.js `<Image>` (when images are added) |
| CSS | Tailwind purges unused styles — final CSS is minimal |
| Caching | API responses cached at CDN level (1 hour) |
| Reduced motion | 3D section has full fallback for `prefers-reduced-motion` |
| Bundle size | Homepage first load JS: ~151kB (includes Three.js for 3D) |

---

## Security

| Risk | Mitigation |
|------|------------|
| API keys exposed | Environment variables only — never in Git |
| XSS | React's default escaping, no `dangerouslySetInnerHTML` |
| Google Sheet access | Service account has read-only scope |
| External links | All use `rel="noopener noreferrer"` |

---

*Last updated: 2026-02-28*
