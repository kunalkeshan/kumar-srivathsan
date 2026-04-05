// Expand this union as more Sanity schema types are added.
// After running TypeGen, this can be derived from the generated AllSanitySchemaTypes.
export type SanityDocumentType = "siteConfig" | "destination" | "routesConfig"

export type CollectionTag = `collection:${SanityDocumentType}`
export type DocumentTag = `${SanityDocumentType}:${string}`
export type CacheTag = CollectionTag | DocumentTag

export function createCollectionTag(type: SanityDocumentType): CollectionTag {
  return `collection:${type}`
}

export function createDocumentTag(
  type: SanityDocumentType,
  id: string
): DocumentTag {
  return `${type}:${id}`
}
