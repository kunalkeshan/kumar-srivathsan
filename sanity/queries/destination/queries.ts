import { defineQuery } from "next-sanity"

export const DESTINATIONS_QUERY = defineQuery(`
  *[_type == "destination"] | order(name asc) {
    _id,
    code,
    name,
    latitude,
    longitude
  }
`)
