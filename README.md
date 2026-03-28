# Kumar Srivathsan — Portfolio

Personal portfolio website for Kumar Srivathsan, a Navigation Officer charting safe passages across the world's oceans.

**Live site →** [kumarsrivathsan.com](https://kumarsrivathsan.com)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000)
![pnpm](https://img.shields.io/badge/pnpm-package_manager-F69220?logo=pnpm&logoColor=white)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel)](https://vercel.com)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Overview

This is the source code for Kumar Srivathsan's personal portfolio — a professional showcase for a Navigation Officer with experience across container ships, Ro-Ro vessels, and international maritime routes. The site highlights his background, port destinations, certifications, and contact information.

---

## Tech Stack

| Technology                                                | Version | Purpose                     |
| --------------------------------------------------------- | ------- | --------------------------- |
| [Next.js](https://nextjs.org)                             | 16      | Framework (App Router, RSC) |
| [React](https://react.dev)                                | 19      | UI library                  |
| [TypeScript](https://www.typescriptlang.org)              | 5       | Type safety                 |
| [Tailwind CSS](https://tailwindcss.com)                   | v4      | Utility-first styling       |
| [shadcn/ui](https://ui.shadcn.com)                        | latest  | Component primitives        |
| [Radix UI](https://www.radix-ui.com)                      | latest  | Accessible UI primitives    |
| [Lucide React](https://lucide.dev)                        | latest  | Icons                       |
| [next-themes](https://github.com/pacocoursey/next-themes) | latest  | Dark mode                   |
| [Motion](https://motion.dev)                              | 12      | Animations                  |
| [Cobe](https://github.com/shuding/cobe)                   | 2       | Interactive 3D globe        |
| [Sonner](https://sonner.emilkowal.ski)                    | latest  | Toast notifications         |

---

## Architecture

```
app/                     # Next.js App Router pages and root layout
components/
  ui/                    # shadcn/ui primitives (Button, Card, Accordion, etc.)
  layouts/               # Structural components (Header, Footer, Container, Logo)
  landing/               # Page sections (Hero, About, Destinations, Contact)
  icons/                 # Custom SVG icon components
  analytics/             # Analytics integrations (Microsoft Clarity)
  providers/             # React context providers (Theme, etc.)
config/                  # Centralized site configuration
  metadata.ts            # Base SEO metadata
  navigation.tsx         # Nav and footer links
  socials.tsx            # Phone, email, and social media links
  site.ts                # Site URL resolution
  destinations.ts        # Port coordinates and shipping routes for the globe
  media.ts               # External media URLs (hero video, etc.)
lib/
  utils.ts               # cn() class merging utility
  analytics.ts           # Analytics ID constants
public/assets/           # Static images (hero, logo, profile photos)
scripts/                 # Build-time utilities (image conversion)
```

**Key design decisions:**

- **Config-driven navigation and socials** — all nav links and social links live in `config/`. Never hardcode them in components.
- **Semantic radius tokens** — two CSS custom properties (`--radius-button`, `--radius-surface`) control all rounding. Any `rounded-*` class must be paired with `squircle`.
- **Three-font typography system** — `font-sans` (Space Grotesk) for body, `font-serif` (Source Serif 4) for headings, `font-mono` (IBM Plex Mono) for coordinates/dates/log entries.
- **Explicit link prefetching** — all `<Link>` components set `prefetch={false}` to avoid unnecessary network requests.
- **New sections** must be wrapped in `<Container>` for consistent max-width and horizontal padding.

For full coding standards and conventions, see [`CLAUDE.md`](./CLAUDE.md).

---

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org) — LTS recommended
- [pnpm](https://pnpm.io) — required package manager (`npm install -g pnpm`)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/kunalkeshan/kumar-srivathsan.git
cd kumar-srivathsan

# 2. Install dependencies
pnpm install

# 3. Copy the environment template and fill in your values
cp .env.example .env.local

# 4. Start the development server
pnpm dev
```

The dev server starts at [http://localhost:3000](http://localhost:3000) with Turbopack.

---

## Environment Variables

Copy `.env.example` to `.env` and set the following:

| Variable                          | Required | Description                                             |
| --------------------------------- | -------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | Yes      | Canonical site URL (e.g. `https://kumarsrivathsan.com`) |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | No       | Google Analytics measurement ID (`G-XXXXXXXXXX`)        |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID`  | No       | Microsoft Clarity project ID                            |

> **Note:** An `EFFERD_REGISTRY_TOKEN` is also needed if you want to install new shadcn components from the custom Efferd registry (see `components.json`). This is only required for adding components — normal development and builds work without it.

---

## Available Scripts

| Script                | Description                                 |
| --------------------- | ------------------------------------------- |
| `pnpm dev`            | Start dev server with Turbopack             |
| `pnpm build`          | Production build                            |
| `pnpm start`          | Start production server                     |
| `pnpm lint`           | Run ESLint                                  |
| `pnpm format`         | Run Prettier on all TypeScript files        |
| `pnpm typecheck`      | TypeScript type check (no emit)             |
| `pnpm convert-images` | Convert images to WebP via the build script |

---

## Deployment

This site is deployed on [Vercel](https://vercel.com). The easiest way to deploy your own fork:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkunalkeshan%2Fkumar-srivathsan)

### Manual Vercel setup

1. Push your fork to GitHub.
2. Import the repository in the [Vercel dashboard](https://vercel.com/new).
3. Set the **Framework Preset** to `Next.js` (detected automatically).
4. Add the required environment variables under **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` → your production URL (Vercel also sets `VERCEL_PROJECT_PRODUCTION_URL` automatically; `config/site.ts` falls back to it if this var is absent)
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` _(optional)_
   - `NEXT_PUBLIC_CLARITY_PROJECT_ID` _(optional)_
5. Click **Deploy**.

---

## Contributing

This is a personal portfolio and is primarily a **reference repository**. The codebase is open for anyone to explore, learn from, or fork for their own portfolio. Issues and pull requests are reviewed but not actively solicited.

If you spot a bug, typo, or accessibility issue, feel free to open an issue or submit a PR. For anything more significant, please open an issue first to discuss the change.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for coding standards and the pull request process.

---

## License

[MIT](./LICENSE) © Kunal Keshan
