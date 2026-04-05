import { cache } from "react"
import { sanityFetch } from "@/sanity/lib/sanity-fetch"
import { SITE_CONFIG_QUERY } from "./queries"
import { createCollectionTag } from "@/sanity/lib/cache-tags"
import type { SITE_CONFIG_QUERY_RESULT } from "@/types/cms"

/**
 * Fetches the singleton siteConfig document from Sanity.
 *
 * Wrapped with React.cache() for request-level deduplication — multiple
 * callers within the same render pass (generateMetadata, layout, page) share
 * one resolved result without extra network round-trips.
 *
 * Tagged with `collection:siteConfig` so that the on-demand ISR webhook at
 * `/api/revalidate` (which calls `revalidateTag("collection:siteConfig", "max")`)
 * invalidates this cache when the document is updated in Sanity Studio.
 */
export const getSiteConfig = cache(
  async (): Promise<SITE_CONFIG_QUERY_RESULT> => {
    return sanityFetch<SITE_CONFIG_QUERY_RESULT>({
      query: SITE_CONFIG_QUERY,
      tags: [createCollectionTag("siteConfig")],
    })
  }
)
