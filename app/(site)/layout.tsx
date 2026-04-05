import { GoogleAnalytics } from "@next/third-parties/google"
import { Header } from "@/components/layouts/header"
import { Footer } from "@/components/layouts/footer"
import MicrosoftClarity from "@/components/analytics/microsoft-clarity"
import { Providers } from "@/components/providers"
import { ANALYTICS_IDS } from "@/lib/analytics"
import { getSiteConfig } from "@/sanity/queries/site-config"
import { mapSanityMediaToSocialLinks } from "@/config/socials"

const googleAnalyticsId = ANALYTICS_IDS.GOOGLE_ANALYTICS

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteConfig = await getSiteConfig()

  if (!siteConfig?.title?.trim()) {
    throw new Error(
      "siteConfig is missing or has no title. Publish the siteConfig document in Sanity Studio before deploying."
    )
  }

  const siteTitle = siteConfig.title
  const socialLinks = mapSanityMediaToSocialLinks(siteConfig.socialMedia ?? null)

  return (
    <Providers>
      <Header siteTitle={siteTitle} socialLinks={socialLinks} />
      {children}
      <Footer siteTitle={siteTitle} socialLinks={socialLinks} />
      <MicrosoftClarity />
      {googleAnalyticsId ? (
        <GoogleAnalytics gaId={googleAnalyticsId} />
      ) : null}
    </Providers>
  )
}
