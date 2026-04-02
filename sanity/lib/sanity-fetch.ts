import type { QueryParams } from "next-sanity"
import { client } from "./client"
import type { CacheTag } from "./cache-tags"

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: QueryParams
  tags?: CacheTag[]
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    next: { revalidate: false, tags },
  })
}
