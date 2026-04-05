import type { MetadataRoute } from "next"
import { siteOrigin } from "@/config/site"
import { getManualsForSitemap } from "@/sanity/queries/manual"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const manuals = await getManualsForSitemap()

  const manualsIndexLastModified =
    manuals.length > 0
      ? new Date(
          Math.max(...manuals.map((m) => new Date(m._updatedAt).getTime()))
        )
      : new Date()

  const manualEntries: MetadataRoute.Sitemap = manuals
    .filter((m) => m.slug != null && m.slug !== "")
    .map((m) => ({
      url: new URL(`/manuals/${m.slug}`, siteOrigin).href,
      lastModified: new Date(m._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

  return [
    {
      url: new URL("/", siteOrigin).href,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/manuals", siteOrigin).href,
      lastModified: manualsIndexLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...manualEntries,
  ]
}
