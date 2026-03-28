# Contributing

Thanks for your interest in this project. This is a personal portfolio website, so the scope of contributions is intentionally narrow. That said, bug fixes, typo corrections, accessibility improvements, and performance enhancements are welcome.

**Before working on a non-trivial change, please open an issue first** so we can discuss whether it's a good fit.

---

## What kinds of contributions are useful

- Bug fixes (broken layout, incorrect data, broken links)
- Typos and copy corrections
- Accessibility improvements
- Performance improvements
- Documentation corrections

## What won't be merged

- Unrelated refactors or style changes
- New dependencies added without prior discussion
- Changes to personal content (Kumar's bio, photos, social links, port data)
- New features that aren't aligned with the site's purpose

---

## Setup

### Prerequisites

- [Node.js](https://nodejs.org) — LTS recommended
- [pnpm](https://pnpm.io) — required (`npm install -g pnpm`)

### Local development

```bash
git clone https://github.com/kunalkeshan/kumar-srivathsan.git
cd kumar-srivathsan
pnpm install
cp .env.example .env.local   # fill in values — only NEXT_PUBLIC_SITE_URL is required
pnpm dev
```

---

## Branch naming

Use a short, descriptive slug:

| Type     | Pattern                  | Example                    |
| -------- | ------------------------ | -------------------------- |
| Bug fix  | `fix/<description>`      | `fix/footer-link-broken`   |
| Feature  | `feat/<description>`     | `feat/og-image`            |
| Docs     | `docs/<description>`     | `docs/update-readme`       |
| Refactor | `refactor/<description>` | `refactor/contact-section` |

---

## Commit convention

This repo uses [Conventional Commits](https://www.conventionalcommits.org):

```
<type>: <short description>

[optional body]
```

Common types:

| Type       | When to use                             |
| ---------- | --------------------------------------- |
| `feat`     | A new feature or visible addition       |
| `fix`      | A bug fix                               |
| `refactor` | Code change with no behaviour change    |
| `docs`     | Documentation only                      |
| `style`    | Formatting, whitespace, no logic change |
| `chore`    | Tooling, config, dependency updates     |
| `perf`     | Performance improvement                 |

**Examples:**

```
fix: correct mobile nav overflow on small screens
feat: add OG image for home page
docs: update CONTRIBUTING setup steps
```

---

## Coding standards

These are the key rules from [`CLAUDE.md`](./CLAUDE.md). Please follow them — PRs that violate these will be asked to revise.

### Package manager

Use **pnpm** only. Do not commit `package-lock.json` or `yarn.lock`.

### Before every commit

```bash
pnpm lint      # must pass with no errors
pnpm format    # auto-sorts Tailwind classes and formats code
pnpm typecheck # must pass with no TypeScript errors
```

### Class merging

Always use `cn()` from `@/lib/utils` to merge Tailwind classes — never string concatenation.

```tsx
// correct
className={cn("base-class", condition && "conditional-class", className)}

// incorrect
className={`base-class ${condition ? "conditional-class" : ""}`}
```

### Rounded corners + squircle

Every `rounded-*` class **must** be paired with `squircle` on the same element. No exceptions.

```tsx
// correct
<div className="rounded-surface squircle">
<img className="rounded-xl squircle" />

// incorrect
<div className="rounded-surface">
<img className="rounded-xl" />
```

Use the semantic radius tokens — don't hardcode values:

| Token              | Utility           | Use for                               |
| ------------------ | ----------------- | ------------------------------------- |
| `--radius-button`  | `rounded-button`  | `<Button>` instances                  |
| `--radius-surface` | `rounded-surface` | Cards, accordions, container surfaces |

`<Button>`, `<Card>`, and `<AccordionTrigger>` already apply `squircle` internally — do not add it again at call sites.

### Typography

Use fonts semantically:

| Font           | Class        | Use for                               |
| -------------- | ------------ | ------------------------------------- |
| Space Grotesk  | `font-sans`  | Default body text                     |
| Source Serif 4 | `font-serif` | Headings (`h1`–`h6`), emphasis words  |
| IBM Plex Mono  | `font-mono`  | Coordinates, dates, log-style entries |

### Link prefetching

All Next.js `<Link>` components must set `prefetch={false}`:

```tsx
<Link href="/some-path" prefetch={false}>Label</Link>
```

### Layout

Wrap new page sections in `<Container>` from `@/components/layouts/container.tsx` for consistent max-width and horizontal padding.

### Config-driven content

Navigation links and social links live in `config/navigation.tsx` and `config/socials.tsx`. Do not hardcode them in component files.

### Documentation hygiene

If your change introduces, modifies, or removes a pattern or architectural decision, update the relevant section of `CLAUDE.md` in the same PR.

---

## Pull request process

1. Fork the repo and create a branch from `main` using the naming convention above.
2. Make your changes following the coding standards.
3. Run `pnpm lint`, `pnpm format`, and `pnpm typecheck` — all must pass.
4. Open a PR against `main` with:
   - A clear title following Conventional Commits format
   - A description of what changed and why
   - A link to the related issue (if applicable)
5. A maintainer will review and may request changes. Once approved, it will be merged.
