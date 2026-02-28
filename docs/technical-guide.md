# Technical Guide — Tiffin Kart

**Everything you need to clone, run, develop, and deploy this project.**

---

## Prerequisites

- **Node.js** 18+ (check: `node -v`)
- **npm** 9+ (comes with Node.js, check: `npm -v`)
- **Git** (check: `git --version`)
- A code editor (VS Code recommended)

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Darshan-1820/tiffin-cart.git
cd tiffin-cart

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local
# Then edit .env.local with your Google Sheets credentials (see below)

# 4. Start development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Google Sheets API — for live menu updates
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id-from-url
```

**How to get these:** See `docs/google-sheets-integration.md` for step-by-step instructions.

**Note:** The project runs without these variables — the menu section will just show sample data. The Google Sheets integration is only needed for live menu updates.

---

## Available Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start development server on `localhost:3000` with hot reload |
| `npm run build` | Create production build in `.next/` folder |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint to check for code issues |

---

## Development Workflow

### File changes
- Edit any `.tsx` file → browser updates automatically (hot reload)
- Edit `globals.css` or `tailwind.config.ts` → browser updates automatically
- Edit `constants.ts` → restart not needed, hot reload picks it up

### Adding a new section
1. Create `components/sections/NewSection.tsx`
2. Export the component
3. Import it in `app/page.tsx`
4. Place it in the correct position within `<main>`

### Adding a new page
1. Create `app/new-page/page.tsx`
2. Export a default function component
3. The page is automatically available at `/new-page`

### Styling
- Use Tailwind utility classes (e.g., `className="text-lg font-bold text-charcoal"`)
- Custom colors are defined in `tailwind.config.ts` (cream, charcoal, accent, etc.)
- Button styles are in `globals.css` (`.btn-fill`, `.link-arrow`)
- For conditional classes, use `cn()` from `lib/utils.ts`

---

## Project Structure Overview

```
app/          → Pages and API routes (Next.js App Router)
components/   → Reusable UI components
  ├── layout/   → Navbar, Footer, WhatsAppFAB
  ├── sections/ → Page sections (Hero, WhatWeOffer, etc.)
  ├── three/    → Three.js 3D components
  └── ui/       → Small reusable components (Container, Marquee)
lib/          → Utilities, constants, API helpers
docs/         → Project documentation
public/       → Static files (images, etc.)
```

---

## Deployment — Netlify

### Automatic Deployment
The project is connected to GitHub. Every push to `main` triggers a new deploy.

### Manual Deployment
```bash
# Build locally
npm run build

# Deploy via Netlify CLI (if installed)
netlify deploy --prod
```

### Netlify Configuration
The `netlify.toml` file handles:
- Build command: `npm run build`
- Publish directory: `.next`
- Next.js plugin for serverless function support

### Environment Variables on Netlify
1. Go to **Site settings → Environment variables**
2. Add the 3 Google Sheets variables (same as `.env.local`)
3. Trigger a redeploy: **Deploys → Trigger deploy → Deploy site**

---

## Key Dependencies Explained

| Package | What it does | Why we use it |
|---------|-------------|---------------|
| `next` | React framework with SSG, SSR, API routes | Core framework |
| `react` / `react-dom` | UI component library | Required by Next.js |
| `three` | 3D graphics engine | 3D tiffin box animation |
| `@react-three/fiber` | React renderer for Three.js | Write Three.js as React components |
| `@react-three/drei` | Three.js helpers (lights, controls, etc.) | Simplifies 3D setup |
| `framer-motion` | Animation library | Scroll reveals, transitions |
| `gsap` | Animation toolkit | Advanced scroll-driven animations |
| `lenis` | Smooth scroll library | Premium scroll feel |
| `googleapis` | Google APIs client | Read Google Sheets |
| `lucide-react` | Icon library | Arrow icons, UI icons |
| `tailwind-merge` | Merge Tailwind classes safely | Prevent class conflicts |
| `clsx` | Conditional CSS classes | Dynamic class assignment |

---

## Common Issues & Fixes

### "Module not found" after clone
```bash
rm -rf node_modules package-lock.json
npm install
```

### Three.js / WebGL errors in development
- Three.js components are loaded with `next/dynamic` (no SSR)
- If you see hydration errors, make sure the component is client-side only (`"use client"`)

### Google Sheets returns empty data
1. Check `.env.local` has all 3 variables
2. Check the Sheet is shared with the service account email
3. Check the Sheet tab is named "Menu" (case-sensitive)
4. Check the range `A2:D` matches your data

### Tailwind classes not working
- Make sure the file path is covered in `tailwind.config.ts` → `content` array
- Restart the dev server after config changes

### Build fails on Netlify
- Check Node.js version matches (18+)
- Check environment variables are set on Netlify
- Check build logs for the specific error

---

## Updating Content

### Change pricing
Edit `lib/constants.ts` → `PRICING` object.

### Change contact info
Edit `lib/constants.ts` → `CONTACT` object.

### Change site metadata
Edit `lib/constants.ts` → `SITE` object.

### Add/change navigation links
Edit `lib/constants.ts` → `NAV_LINKS` array.

### Update testimonials
Edit `components/sections/Testimonials.tsx` → `testimonials` array.

---

*Last updated: 2026-02-28*
