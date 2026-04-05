import { defineQuery } from "next-sanity"

const manualCardFields = `
  _id,
  title,
  slug,
  summary,
  author,
  thumbnail { asset->, alt, hotspot, crop },
  _createdAt,
  _updatedAt,
  "plainBody": pt::text(body)
`

export const MANUALS_LIST_QUERY = defineQuery(`
  *[_type == "manual" && defined(slug.current)] | order(_createdAt desc) {
    ${manualCardFields}
  }
`)

export const MANUALS_LATEST_QUERY = defineQuery(`
  *[_type == "manual" && defined(slug.current)] | order(_createdAt desc) [0...5] {
    ${manualCardFields}
  }
`)

export const MANUAL_BY_SLUG_QUERY = defineQuery(`
  *[_type == "manual" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    summary,
    author,
    thumbnail { asset->, alt, hotspot, crop },
    _createdAt,
    _updatedAt,
    "plainBody": pt::text(body),
    body[]{
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
    },
    relatedManuals[]->{
      _id,
      title,
      slug,
      summary,
      author,
      thumbnail { asset->, alt, hotspot, crop },
      _createdAt,
      "plainBody": pt::text(body)
    }
  }
`)

export const MANUALS_SITEMAP_QUERY = defineQuery(`
  *[_type == "manual" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`)
