/**
 * Resolved canonical site URL string.
 *
 * Resolution priority (first defined wins):
 * 1. `NEXT_PUBLIC_SITE_URL` — explicitly set in `.env` (recommended for production)
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — auto-set by Vercel for the production deployment
 * 3. `VERCEL_URL` — auto-set by Vercel for preview deployments
 * 4. `"http://localhost:3000"` — local development fallback
 */
export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")

/**
 * Parsed `URL` object derived from {@link siteUrl}.
 * Used as `metadataBase` in Next.js metadata config to resolve relative
 * Open Graph and Twitter image paths to absolute URLs.
 */
export const siteOrigin: URL = new URL(siteUrl)
