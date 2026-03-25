import type { Metadata } from "next"
import { siteOrigin } from "@/config/site"

export const siteTitle = "Kumar Srivathsan"
export const siteDescription =
	"Navigation Officer charting safe passages across the world's oceans — precision, discipline, and seamless coordination at every voyage."

export const baseMetadata: Metadata = {
	metadataBase: siteOrigin,
	title: {
		template: `%s | ${siteTitle}`,
		default: siteTitle,
	},
	description: siteDescription,
	// TODO: add icons (icon, apple) once logo/favicon is ready
	openGraph: {
		title: siteTitle,
		description: siteDescription,
		siteName: siteTitle,
		locale: "en_US",
		type: "website",
		url: "/",
		// TODO: add images once OG image is ready
	},
	twitter: {
		card: "summary_large_image",
		title: siteTitle,
		description: siteDescription,
		// TODO: add images once OG/Twitter card image is ready
		// TODO: add creator/site once a Twitter/X handle exists
	},
}
