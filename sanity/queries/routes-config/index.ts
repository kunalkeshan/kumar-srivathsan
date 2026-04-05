import { cache } from "react"
import { sanityFetch } from "@/sanity/lib/sanity-fetch"
import { ROUTES_CONFIG_QUERY } from "./queries"
import { createCollectionTag } from "@/sanity/lib/cache-tags"
import type { ROUTES_CONFIG_QUERY_RESULT } from "@/types/cms"

/**
 * Fetches the singleton routesConfig document from Sanity.
 *
 * Wrapped with React.cache() for request-level deduplication.
 * Tagged with `collection:routesConfig` for on-demand ISR invalidation
 * when the routesConfig document is updated in Sanity Studio.
 */
export const getRoutesConfig = cache(
  async (): Promise<ROUTES_CONFIG_QUERY_RESULT> => {
    return sanityFetch<ROUTES_CONFIG_QUERY_RESULT>({
      query: ROUTES_CONFIG_QUERY,
      tags: [createCollectionTag("routesConfig")],
    })
  }
)
