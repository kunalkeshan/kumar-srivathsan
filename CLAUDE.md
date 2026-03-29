# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

Use **pnpm** for all package operations (e.g. `pnpm add`, `pnpm install`).

## Commands

```bash
pnpm dev           # Start dev server with Turbopack
pnpm build         # Production build
pnpm lint          # ESLint
pnpm format        # Prettier (TypeScript files)
pnpm typecheck     # TypeScript type check (no emit)
```

## Stack

- **Next.js 16** with App Router and React Server Components
- **TypeScript** (strict mode, path alias `@/*` → project root)
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **shadcn/ui** with Radix UI primitives and Lucide icons
- **next-themes** for dark mode

## Architecture

**App Router layout**: `app/layout.tsx` wraps all pages with `<Header>` and `<Footer>`. Pages live in `app/`.

**Component organization**:
- `components/ui/` — shadcn/ui primitives (Button, Accordion, etc.)
- `components/layouts/` — structural components (Header, Footer, Logo, Container)
- `components/landing/` — home page sections (Hero, About, etc.)
- `components/*.tsx` at the root of `components/` — app-wide route UI not scoped to a single page (e.g. `not-found-page.tsx` for `app/not-found.tsx`)
- `components/icons/` — custom SVG icon components

**Centralized config**: Navigation links and social media links are defined in `config/` and imported by Header/Footer — add new nav items there, not directly in components.

**New components**: Wrap content with `<Container>` from `@/components/layouts/container.tsx` for consistent max-width and horizontal padding. Follow the same prop pattern as existing components — accept `className?: string` and spread it into `cn()` for extensibility.

**Styling**: Use `cn()` from `@/lib/utils` to merge Tailwind classes. Prettier auto-sorts Tailwind classes on save (configured for `cn()` and `cva()` functions).

**Custom component registry**: `components.json` points to an Efferd registry. Requires `EFFERD_REGISTRY_TOKEN` in `.env` to install new shadcn components.

## Metadata

Base metadata is defined in `config/metadata.ts` and re-exported from `app/layout.tsx` as the site-wide default.

**For new pages**, export a `Metadata` object with at minimum a canonical URL:

```ts
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "/your-path",
  },
}
```

Add `title` and `description` overrides only when the page content differs meaningfully from the site default. The root layout's title template (`%s | Kumar Srivathsan`) will automatically apply to any `title` string you provide.

**For new sections/features** that need their own OG or Twitter overrides, extend the base from `config/metadata.ts` — never duplicate the `metadataBase`, `openGraph.siteName`, or `twitter.card` values inline.

Icons, favicon, and OG images are not yet configured — see TODO comments in `config/metadata.ts`.

## Link Usage

Always set `prefetch={false}` on every Next.js `<Link>` component:

```tsx
<Link href="/some-path" prefetch={false}>Label</Link>
```

**Why**: Next.js prefetches linked pages automatically in production, which causes unnecessary network requests and can degrade performance. Disabling it gives explicit control over when prefetching occurs.

## UI Radius Standard

Two semantic radius tokens control all component shape — defined in `app/globals.css` and mapped via `@theme inline`:

| Token | Value | Tailwind utility | Use for |
|---|---|---|---|
| `--radius-button` | `9999px` | `rounded-button` | All `<Button>` instances (any size/variant) |
| `--radius-surface` | `calc(--radius + 4px)` (~14px) | `rounded-surface` | `<Card>`, `<Accordion>` triggers, container surfaces |

**Squircle**: All rounded elements use `corner-shape: squircle` via the `squircle` CSS utility (defined in `app/globals.css`). This modifies how corners are drawn — producing a smooth superellipse curve — without changing the radius value.

- For `<Button>`, `<Card>`, and `<AccordionTrigger>`, `squircle` is already baked into the primitive base class. Do not add it again at call sites.
- For non-primitive rounded containers (e.g. layout divs, link wrappers like the header logo link), add `squircle` alongside any `rounded-*` class.
- **Any time you write a `rounded-*` class anywhere in the codebase, you must also add `squircle` on the same element.** No exceptions — this applies to cards, images, stat boxes, icon wrappers, layout divs, and any other element with rounded corners.
- Browsers that don't support `corner-shape` render standard rounded corners — no fallback needed.

**Rules:**

- **Buttons** (`components/ui/button.tsx`) default to `rounded-button squircle` (pill + squircle). **Never** add `rounded-*` or `squircle` overrides to a `<Button>` usage in feature components — the primitive handles it.
- **Cards** (`components/ui/card.tsx`) and **Accordions** (`components/ui/accordion.tsx`) use `rounded-surface squircle` for outer containers and trigger focus rings.
- **No hardcoded radius in feature components.** Use tokens only. Do not write `rounded-full`, `rounded-xl`, `rounded-2xl`, etc. directly on `<Button>`, `<Card>`, or `<Accordion>` instances in page/section components.
- **Raw layout divs** (non-primitive containers in `components/landing/`) may use Tailwind radius utilities directly for their own visual design, but should prefer `rounded-surface squircle` when mimicking a card-like shape.

## Typography Guidelines
Use fonts intentionally (semantic mapping):

- Sans (default body): `Space Grotesk` (`font-sans`)
- Serif (headings + emphasis words): `Source Serif 4` (`font-serif`)
- Mono (data/log semantics): `IBM Plex Mono` (`font-mono`)

Rules:
- Headings (`h1`-`h6`) should be serif by default. If a specific word is intended to read like a heading (e.g. “Voyage”, “Experience”, “Logbook”), wrap just that word with `font-serif`.
- Body text remains sans.
- Mono for:
  - Coordinates: `13.0827° N, 80.2707° E` (use `font-mono`)
  - Dates: format in `UTC +05:30` (use `font-mono`)
  - Logs: render like `ENTRY #042` (use `font-mono`)

## Documentation Hygiene

When making a change that introduces, modifies, or removes a pattern, convention, or architectural decision, update the relevant section of CLAUDE.md in the same PR/commit.

Examples of changes that require a CLAUDE.md update:
- Adding a new CSS utility or Tailwind token
- Changing the radius, typography, or squircle rules
- Introducing a new component convention or config pattern
- Modifying the folder structure or import conventions
- Adding or removing a dependency that affects how components are built

CLAUDE.md is the authoritative guide for future Claude sessions. Keeping it in sync prevents stale advice from being applied to new code.
