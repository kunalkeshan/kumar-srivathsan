import { defineQuery } from "next-sanity"

export const LEGAL_DOCUMENTS_QUERY = defineQuery(`
  *[_type == "legal" && defined(slug.current)] | order(_updatedAt desc) {
    _id,
    title,
    slug,
    description,
    _createdAt,
    _updatedAt
  }
`)

export const LEGAL_DOCUMENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "legal" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    _createdAt,
    _updatedAt,
    content[]{
      ...,
      markDefs[]{
        ...,
      },
      _type == "image" => {
        _key,
        _type,
        alt,
        asset->,
        hotspot,
        crop
      }
    }
  }
`)

export const LEGAL_DOCUMENTS_SITEMAP_QUERY = defineQuery(`
  *[_type == "legal" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`)
