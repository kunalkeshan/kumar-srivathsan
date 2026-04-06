import { cache } from "react"

import { sanityFetch } from "@/sanity/lib/sanity-fetch"
import {
  createCollectionTag,
  createDocumentTag,
} from "@/sanity/lib/cache-tags"
import type {
  LEGAL_DOCUMENT_BY_SLUG_QUERY_RESULT,
  LEGAL_DOCUMENTS_QUERY_RESULT,
  LEGAL_DOCUMENTS_SITEMAP_QUERY_RESULT,
} from "@/types/cms"

import {
  LEGAL_DOCUMENT_BY_SLUG_QUERY,
  LEGAL_DOCUMENTS_QUERY,
  LEGAL_DOCUMENTS_SITEMAP_QUERY,
} from "./queries"

const legalCollectionTag = createCollectionTag("legal")

/**
 * All legal documents for the /legal index, most recently updated first.
 */
export const getLegalDocuments = cache(
  async (): Promise<LEGAL_DOCUMENTS_QUERY_RESULT> => {
    return sanityFetch<LEGAL_DOCUMENTS_QUERY_RESULT>({
      query: LEGAL_DOCUMENTS_QUERY,
      tags: [legalCollectionTag],
    })
  }
)

/**
 * Single legal document by URL slug for /legal/[slug].
 */
export const getLegalBySlug = cache(
  async (slug: string): Promise<LEGAL_DOCUMENT_BY_SLUG_QUERY_RESULT> => {
    return sanityFetch<LEGAL_DOCUMENT_BY_SLUG_QUERY_RESULT>({
      query: LEGAL_DOCUMENT_BY_SLUG_QUERY,
      params: { slug },
      tags: [legalCollectionTag, createDocumentTag("legal", slug)],
    })
  }
)

/**
 * Slugs and timestamps for sitemap generation.
 */
export const getLegalDocumentsForSitemap = cache(
  async (): Promise<LEGAL_DOCUMENTS_SITEMAP_QUERY_RESULT> => {
    return sanityFetch<LEGAL_DOCUMENTS_SITEMAP_QUERY_RESULT>({
      query: LEGAL_DOCUMENTS_SITEMAP_QUERY,
      tags: [legalCollectionTag],
    })
  }
)
