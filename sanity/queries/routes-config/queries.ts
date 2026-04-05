import { defineQuery } from "next-sanity"

export const ROUTES_CONFIG_QUERY = defineQuery(`
  *[_type == "routesConfig"][0] {
    _id,
    routes[] {
      _key,
      from->{ _id },
      to->{ _id },
      shipIconId
    }
  }
`)
