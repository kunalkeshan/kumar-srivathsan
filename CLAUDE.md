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

**IBM Plex Mono font weights**: Weights `400` and `500` are loaded (configured in `app/layout.tsx`). Weight 500 is used by the Destinations port labels via injected CSS. If you add mono text that uses a different weight (e.g. `font-semibold`, `font-bold`), you must add that weight to the `weight` array in `app/layout.tsx` — otherwise the browser will synthesize the weight, producing blurry or distorted text.

## Content Image Protection

`components/protected-image.tsx` exports `ProtectedImage`, a client-side drop-in for `next/image` that suppresses the browser context menu on right-click by calling `e.preventDefault()` in an `onContextMenu` handler. Any `onContextMenu` prop passed by the caller is chained after prevention.

**Scope**: Use `ProtectedImage` only for editorial/content photos where discouraging casual download is desired (e.g. the About section's `/assets/family.jpeg` and `/assets/kumar-2.jpeg`). Do **not** apply it to the site logo, footer GitHub avatar, or any UI icons.

**Trade-offs and limits**:
- Removes the browser context-menu on those images (users lose "Open image in new tab", "Copy image", etc.).
- Keyboard navigation and screen readers are unaffected.
- This is deterrence, not cryptographic protection. DevTools, the network tab, screenshots, and browser caching all still expose the assets.
- Mobile long-press image preview is a separate browser mechanism and is not blocked.

## Sanity CMS

Sanity is integrated for content management. The infrastructure lives in `sanity/` and the studio is embedded at `/cms`.

**Skill to use:** When working on any Sanity-related task (schema design, GROQ queries, Visual Editing, images, TypeGen, Studio structure, revalidation), invoke the `/sanity-best-practices` skill first and load the relevant reference file(s) before writing or modifying any code.

**Directory layout:**
- `sanity/env.ts` — env var validation using `assertValue` from `lib/utils.ts`
- `sanity/schemaTypes/` — schema type definitions (`index.ts` exports the schema object)
- `sanity/studio-structure.ts` — Studio sidebar structure (singletons, dividers)
- `sanity/lib/client.ts` — `createClient` instance
- `sanity/lib/image.ts` — `urlFor()` URL builder for Sanity image assets
- `sanity/lib/sanity-fetch.ts` — `sanityFetch<T>()` server-side fetch with on-demand ISR tags
- `sanity/lib/cache-tags.ts` — typed `CollectionTag` / `DocumentTag` helpers
- `sanity/queries/` — GROQ queries wrapped in `defineQuery` for TypeGen support
- `sanity.config.ts` — embedded Studio config (`basePath: "/cms"`)
- `sanity.cli.ts` — CLI + TypeGen config (outputs to `types/cms.d.ts`)

**Naming note:** The Studio structure file is `sanity/studio-structure.ts` (NOT `sanity/structure.ts`). The name `sanity/structure.ts` conflicts with the `sanity/structure` npm subpath and causes TypeScript to resolve imports to the local file instead of the package.

**assertValue:** Lives in `lib/utils.ts` alongside `cn()`. Used in `sanity/env.ts` to validate required env vars at startup.

**TypeGen — mandatory workflow:**

> Run `pnpm generate:types` after **every** schema change or new/modified GROQ query without exception.

1. Change schema (`sanity/schemaTypes/`) or add/edit a query (`sanity/queries/`)
2. Run `pnpm generate:types` → regenerates `types/cms.d.ts`
3. Use the generated types as the **source of truth** for all TypeScript — never hand-write types for Sanity data shapes
4. Import query result types as `import type { SITE_CONFIG_QUERYResult } from "@/types/cms"`
5. Pass generated types to `sanityFetch<T>()` — do not use `any` or manually-typed interfaces

TypeGen auto-runs during `sanity dev` via `sanity.cli.ts`, but always run it manually before implementing a fetch against a new or changed query.

**Schema conventions:**
- Always use `defineType` / `defineField` / `defineArrayMember` — never plain objects
- Model what content *is*, not how it looks (no `bigHeroText`, `threeColumnRow`, etc.)
- Singletons (like `siteConfig`) must be pinned with a fixed `documentId` in `sanity/studio-structure.ts` and filtered out of the default document list

**Query conventions:**
- Wrap every GROQ query in `defineQuery` from `next-sanity`
- Always project `_key` in array items for React reconciliation
- Place queries in `sanity/queries/` — one file per document type

**Revalidation:** Webhook-based on-demand ISR via `app/api/revalidate/route.ts`. Configure a Sanity webhook pointing to `{SITE_URL}/api/revalidate` with `SANITY_WEBHOOK_SECRET`. Use `revalidateTag(tag, "max")` — Next.js 16 requires the second `profile` argument. Add a `case` for each new document type added to the schema.

**Required env vars** (see `.env.example`):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION` (optional, defaults to `2025-04-03`)
- `SANITY_API_READ_TOKEN`
- `SANITY_WEBHOOK_SECRET`

## Documentation Hygiene

When making a change that introduces, modifies, or removes a pattern, convention, or architectural decision, update the relevant section of CLAUDE.md in the same PR/commit.

Examples of changes that require a CLAUDE.md update:
- Adding a new CSS utility or Tailwind token
- Changing the radius, typography, or squircle rules
- Introducing a new component convention or config pattern
- Modifying the folder structure or import conventions
- Adding or removing a dependency that affects how components are built

CLAUDE.md is the authoritative guide for future Claude sessions. Keeping it in sync prevents stale advice from being applied to new code.
