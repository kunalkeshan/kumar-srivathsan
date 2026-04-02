import { GoogleAnalytics } from "@next/third-parties/google"
import { Header } from "@/components/layouts/header"
import { Footer } from "@/components/layouts/footer"
import MicrosoftClarity from "@/components/analytics/microsoft-clarity"
import { Providers } from "@/components/providers"
import { ANALYTICS_IDS } from "@/lib/analytics"

const googleAnalyticsId = ANALYTICS_IDS.GOOGLE_ANALYTICS

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <Header />
      {children}
      <Footer />
      <MicrosoftClarity />
      {googleAnalyticsId ? (
        <GoogleAnalytics gaId={googleAnalyticsId} />
      ) : null}
    </Providers>
  )
}
