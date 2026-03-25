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
- `components/landing/` — page-specific sections (Hero)
- `components/icons/` — custom SVG icon components

**Centralized config**: Navigation links and social media links are defined in `config/` and imported by Header/Footer — add new nav items there, not directly in components.

**New components**: Wrap content with `<Container>` from `@/components/layouts/container.tsx` for consistent max-width and horizontal padding. Follow the same prop pattern as existing components — accept `className?: string` and spread it into `cn()` for extensibility.

**Styling**: Use `cn()` from `@/lib/utils` to merge Tailwind classes. Prettier auto-sorts Tailwind classes on save (configured for `cn()` and `cva()` functions).

**Custom component registry**: `components.json` points to an Efferd registry. Requires `EFFERD_REGISTRY_TOKEN` in `.env` to install new shadcn components.

## Link Usage

Always set `prefetch={false}` on every Next.js `<Link>` component:

```tsx
<Link href="/some-path" prefetch={false}>Label</Link>
```

**Why**: Next.js prefetches linked pages automatically in production, which causes unnecessary network requests and can degrade performance. Disabling it gives explicit control over when prefetching occurs.
