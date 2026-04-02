import { defineQuery } from "next-sanity"

export const SITE_CONFIG_QUERY = defineQuery(`
  *[_type == "siteConfig"][0] {
    _id,
    title,
    description,
    ogImage { asset->, alt, hotspot, crop },
    twitterImage { asset->, alt, hotspot, crop },
    socialMedia[] { _key, platform, url, label, contactText },
    heroVideoUrl
  }
`)
