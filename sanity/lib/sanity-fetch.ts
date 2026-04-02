import type { QueryParams } from "next-sanity"
import { client } from "./client"
import type { CacheTag } from "./cache-tags"

type SanityFetchOptions = {
  perspective?: "published" | "previewDrafts" | "raw"
  stega?: boolean
  token?: string
}

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
  options = {},
}: {
  query: string
  params?: QueryParams
  tags?: CacheTag[]
  options?: SanityFetchOptions
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    ...options,
    next: { revalidate: false, tags },
  })
}
