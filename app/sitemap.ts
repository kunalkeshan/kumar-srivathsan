import type { MetadataRoute } from "next"
import { siteOrigin } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: new URL("/", siteOrigin).href,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
	]
}
