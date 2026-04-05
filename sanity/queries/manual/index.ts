import { cache } from "react"
import { sanityFetch } from "@/sanity/lib/sanity-fetch"
import { createCollectionTag } from "@/sanity/lib/cache-tags"
import type {
  MANUAL_BY_SLUG_QUERY_RESULT,
  MANUALS_LATEST_QUERY_RESULT,
  MANUALS_LIST_QUERY_RESULT,
  MANUALS_SITEMAP_QUERY_RESULT,
} from "@/types/cms"
import {
  MANUAL_BY_SLUG_QUERY,
  MANUALS_LATEST_QUERY,
  MANUALS_LIST_QUERY,
  MANUALS_SITEMAP_QUERY,
} from "./queries"

const manualCollectionTag = createCollectionTag("manual")

/**
 * All published manuals for the /manuals index, newest first.
 */
export const getManuals = cache(async (): Promise<MANUALS_LIST_QUERY_RESULT> => {
  return sanityFetch<MANUALS_LIST_QUERY_RESULT>({
    query: MANUALS_LIST_QUERY,
    tags: [manualCollectionTag],
  })
})

/**
 * Latest five manuals for the homepage teaser.
 */
export const getLatestManuals = cache(
  async (): Promise<MANUALS_LATEST_QUERY_RESULT> => {
    return sanityFetch<MANUALS_LATEST_QUERY_RESULT>({
      query: MANUALS_LATEST_QUERY,
      tags: [manualCollectionTag],
    })
  }
)

/**
 * Single manual by URL slug for /manuals/[slug].
 */
export const getManualBySlug = cache(
  async (slug: string): Promise<MANUAL_BY_SLUG_QUERY_RESULT> => {
    return sanityFetch<MANUAL_BY_SLUG_QUERY_RESULT>({
      query: MANUAL_BY_SLUG_QUERY,
      params: { slug },
      tags: [manualCollectionTag],
    })
  }
)

/**
 * Slugs and timestamps for sitemap generation.
 */
export const getManualsForSitemap = cache(
  async (): Promise<MANUALS_SITEMAP_QUERY_RESULT> => {
    return sanityFetch<MANUALS_SITEMAP_QUERY_RESULT>({
      query: MANUALS_SITEMAP_QUERY,
      tags: [manualCollectionTag],
    })
  }
)
