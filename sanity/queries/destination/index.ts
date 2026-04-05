import { cache } from "react"
import { sanityFetch } from "@/sanity/lib/sanity-fetch"
import { DESTINATIONS_QUERY } from "./queries"
import { createCollectionTag } from "@/sanity/lib/cache-tags"
import type { DESTINATIONS_QUERY_RESULT } from "@/types/cms"

/**
 * Fetches all destination (port) documents from Sanity, ordered by name.
 *
 * Wrapped with React.cache() for request-level deduplication.
 * Tagged with `collection:destination` for on-demand ISR invalidation
 * when any destination document is created, updated, or deleted.
 */
export const getDestinations = cache(
  async (): Promise<DESTINATIONS_QUERY_RESULT> => {
    return sanityFetch<DESTINATIONS_QUERY_RESULT>({
      query: DESTINATIONS_QUERY,
      tags: [createCollectionTag("destination")],
    })
  }
)
