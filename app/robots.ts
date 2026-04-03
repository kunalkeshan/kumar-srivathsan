import type { MetadataRoute } from "next"
import { siteOrigin } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cms", "/api"],
    },
    sitemap: new URL("/sitemap.xml", siteOrigin).href,
  }
}
