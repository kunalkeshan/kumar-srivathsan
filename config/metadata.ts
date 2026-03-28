/**
 * Base SEO metadata shared across all pages.
 *
 * `baseMetadata` is exported from `app/layout.tsx` as the site-wide default.
 * Individual pages should extend it by exporting their own `Metadata` object
 * with at minimum a canonical URL — see CLAUDE.md § Metadata for the pattern.
 *
 * Current TODOs (tracked via inline comments below):
 * - Add `icons` (favicon, apple-touch-icon) once the final logo asset is ready.
 * - Add `twitter.creator` / `twitter.site` once a Twitter/X handle exists.
 */
import type { Metadata } from "next"
import { siteOrigin } from "@/config/site"

/** Display name used in the page title template and OG tags. */
export const siteTitle = "Kumar Srivathsan"
/** One-line site description used in `<meta name="description">` and OG/Twitter tags. */
export const siteDescription =
  "Navigation Officer charting safe passages across the world's oceans — precision, discipline, and seamless coordination at every voyage."

export const baseMetadata: Metadata = {
  metadataBase: siteOrigin,
  title: {
    template: `%s | ${siteTitle}`,
    default: siteTitle,
  },
  description: siteDescription,
  // TODO: add icons (icon, apple) once logo/favicon is ready
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    locale: "en_US",
    type: "website",
    url: "/",
    images: [
      {
        url: "/assets/kumar.jpg",
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/assets/kumar.jpg"],
    // TODO: add creator/site once a Twitter/X handle exists
  },
}
