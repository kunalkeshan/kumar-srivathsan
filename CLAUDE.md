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
- **@tailwindcss/typography** — registered in `app/globals.css` with `@plugin "@tailwindcss/typography"` (v4 CSS-first plugin API; see [Typography plugin](https://github.com/tailwindlabs/tailwindcss-typography))
- **shadcn/ui** with Radix UI primitives and Lucide icons
- **next-themes** for dark mode

## Architecture

**App Router layout**: `app/layout.tsx` wraps all pages with `<Header>` and `<Footer>`. Pages live in `app/`.

**Component organization**:
- `components/ui/` — shadcn/ui primitives (Button, Accordion, etc.)
- `components/layouts/` — structural components (Header, Footer, Logo, Container)
- `components/landing/` — home page sections (Hero, About, etc.)
- `components/manuals/` — manuals UI: `ManualCard`, `ManualsSection`, `ManualArticle`, `ManualPortableText`
- `components/*.tsx` at the root of `components/` — app-wide route UI not scoped to a single page (e.g. `not-found-page.tsx` for `app/not-found.tsx`)
- `components/icons/` — custom SVG icon components

**Centralized config**: Navigation links are defined in `config/navigation.tsx`. Social media links are sourced exclusively from Sanity siteConfig at runtime via the mapping utilities in `config/socials.tsx` — see the Sanity CMS section for the data flow. Add new nav items in `config/`, never directly in components.

**New components**: Wrap content with `<Container>` from `@/components/layouts/container.tsx` for consistent max-width and horizontal padding. Follow the same prop pattern as existing components — accept `className?: string` and spread it into `cn()` for extensibility.

**Styling**: Use `cn()` from `@/lib/utils` to merge Tailwind classes. Prettier auto-sorts Tailwind classes on save (configured for `cn()` and `cva()` functions).

**Custom component registry**: `components.json` points to an Efferd registry. Requires `EFFERD_REGISTRY_TOKEN` in `.env` to install new shadcn components.

## Metadata

`config/metadata.ts` provides `baseMetadata` (used only for its `metadataBase` / site origin). The root layout (`app/layout.tsx`) exports an async `generateMetadata()` function that fetches Sanity siteConfig and uses `title`, `description`, `ogImage`, and `twitterImage` exclusively from the CMS — no hardcoded content strings substitute for missing values. Fields absent from siteConfig are simply omitted from the returned metadata object.

**For new pages**, export a `Metadata` object with at minimum a canonical URL:

```ts
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "/your-path",
  },
}
```

Add `title` and `description` overrides only when the page content differs meaningfully from the site default. The root layout's title template (sourced from `siteConfig.title`) will automatically apply to any `title` string you provide.

**For new sections/features** that need their own OG or Twitter overrides, never duplicate `metadataBase` or `twitter.card` inline — extend from `config/metadata.ts` for the structural parts only.

OG and Twitter images are served from Sanity CDN via `urlFor()`. If siteConfig has no image set, no image tag is emitted.

## Link Usage

Always set `prefetch={false}` on every Next.js `<Link>` component:

```tsx
<Link href="/some-path" prefetch={false}>Label</Link>
```

**Why**: Next.js prefetches linked pages automatically in production, which causes unnecessary network requests and can degrade performance. Disabling it gives explicit control over when prefetching occurs.

## Tailwind Typography (CMS / Portable Text)

Rich HTML from Sanity (Portable Text) should be wrapped with the shared **`.prose-cms`** preset or the **`CmsProse`** component from `components/cms-prose.tsx`. The preset extends `prose prose-neutral max-w-none dark:prose-invert` and maps colors to theme tokens (`foreground`, `primary`, `muted`, `border`), **serif headings** and **sans body** per typography guidelines, **`font-mono`** for `code` / `pre`, and **`rounded-surface squircle`** on content images.

- Do not add a second `prose` class when using `CmsProse` / `.prose-cms` (the preset already includes `prose`).
- For manual pages, combine `CmsProse` with `<PortableText />` and custom `block` components (e.g. map PT `h1` → `<h2>` so the document title remains the only page-level `h1`). The `/manuals/[slug]` page also mounts **`ScrollProgress`** (`components/ui/scroll-progress.tsx`) — a fixed top progress bar using the site **chart** color gradient (`chart-5` → `chart-3` → `chart-1`) at `z-[60]` so it sits above the sticky header (`z-50`).

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
- `sanity/queries/` — per-domain subdirectories, each with `queries.ts` (GROQ) + `index.ts` (fetch function)
- `sanity.config.ts` — embedded Studio config (`basePath: "/cms"`)
- `sanity.cli.ts` — CLI + TypeGen config (outputs to `types/cms.d.ts`)

**Query/fetch co-location pattern:** Each Sanity domain gets its own subdirectory under `sanity/queries/`:
- `sanity/queries/site-config/queries.ts` — `SITE_CONFIG_QUERY`
- `sanity/queries/site-config/index.ts` — `getSiteConfig()` fetch function
- `sanity/queries/destination/queries.ts` — `DESTINATIONS_QUERY`
- `sanity/queries/destination/index.ts` — `getDestinations()` fetch function
- `sanity/queries/routes-config/queries.ts` — `ROUTES_CONFIG_QUERY`
- `sanity/queries/routes-config/index.ts` — `getRoutesConfig()` fetch function
- `sanity/queries/manual/queries.ts` — `MANUALS_LIST_QUERY`, `MANUALS_LATEST_QUERY`, `MANUAL_BY_SLUG_QUERY`, `MANUALS_SITEMAP_QUERY`
- `sanity/queries/manual/index.ts` — `getManuals()`, `getLatestManuals()`, `getManualBySlug()`, `getManualsForSitemap()`

Import fetch functions from the subdirectory (e.g. `@/sanity/queries/site-config`), never from `sanity/lib/`.

**Naming note:** The Studio structure file is `sanity/studio-structure.ts` (NOT `sanity/structure.ts`). The name `sanity/structure.ts` conflicts with the `sanity/structure` npm subpath and causes TypeScript to resolve imports to the local file instead of the package.

**assertValue:** Lives in `lib/utils.ts` alongside `cn()`. Used in `sanity/env.ts` to validate required env vars at startup.

**TypeGen — mandatory workflow:**

> Run `pnpm generate:types` after **every** schema change or new/modified GROQ query without exception.

1. Change schema (`sanity/schemaTypes/`) or add/edit a query (`sanity/queries/`)
2. Run `pnpm generate:types` → regenerates `types/cms.d.ts`
3. Use the generated types as the **source of truth** for all TypeScript — never hand-write types for Sanity data shapes
4. Import query result types as `import type { SITE_CONFIG_QUERY_RESULT } from "@/types/cms"`
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

**siteConfig data-flow pattern:**

`siteConfig` is the singleton Sanity document that drives site-wide runtime data (title, description, OG images, social links, hero video URL, route arc toggle). The established prop-passing pattern is:

1. `app/(site)/layout.tsx` calls `getSiteConfig()` once and passes derived values as props to `<Header>` and `<Footer>`.
2. `app/(site)/page.tsx` calls `getSiteConfig()`, `getDestinations()`, and `getRoutesConfig()` in `Promise.all()`, then passes:
   - `heroVideoUrl` → `<HeroVideo>`
   - `socialMedia` → `<Contact>`
   - `destinations.length` → `<About portsCount>` (drives the "Ports Visited" stat as `{n}+`)
   - `destinations`, `routesConfig.routes`, `siteConfig.showRouteArcs` → `<DestinationsLoader>`
   - `getLatestManuals()` → `<ManualsSection>` (after About, before Destinations)
3. `app/layout.tsx` `generateMetadata()` calls `getSiteConfig()` for SEO metadata.
4. `React.cache()` in each fetch function deduplicates all calls within the same HTTP request.

**Destinations data-flow:**
- `destination` — one Sanity document per port (code, name, latitude, longitude)
- `manual` — instructional entries (title, slug, summary, thumbnail, author, `body` Portable Text via shared `blockContent`, optional `relatedManuals` references). List at `/manuals`, detail at `/manuals/[slug]`; sitemap includes these URLs via `getManualsForSitemap()`.
- `routesConfig` — singleton document with a `routes[]` array of Sanity references between destination docs
- Globe component (`destinations.tsx`) receives `ports` and `routes` as props; builds PORT_MAP, MARKERS, ARCS, LABEL_CSS, and SHIP_ROUTE_IDS internally via `useMemo`
- `siteConfig.showRouteArcs` (boolean, default false) controls whether arc lines are drawn on the globe — toggle in Sanity Studio without a deploy

For social links: `mapSanityMediaToSocialLinks()` in `config/socials.tsx` maps the Sanity `socialMedia[]` array to `SocialLink[]`. Returns `[]` when `socialMedia` is null or empty — **no static fallback**. `tel:` / `mailto:` entries automatically get `external: false` (no `target="_blank"`). `PLATFORM_ICONS` in the same file is the centralized `platform → ReactNode` mapping — do not define icons anywhere else.

For contact entries: `mapSanityMediaToContactEntries()` in `config/socials.tsx` maps `socialMedia[]` to the contact grid format. Returns `[]` when null or empty — **no static fallback**. Each `ContactEntry` carries `_key` from the Sanity item — always use `_key` as the React `key` prop, never `title` or `href`. Phone/email display values are extracted by stripping `tel:`/`mailto:` from the URL field.

**Fail-loud guard**: `app/(site)/layout.tsx` throws an `Error` if `siteConfig.title` is missing or empty. The site cannot render without a published siteConfig title — ensure the document is published in Sanity Studio before deploying.

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
