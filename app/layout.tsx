// For adding custom fonts with other frameworks, see:
// https://tailwindcss.com/docs/font-family
import { Space_Grotesk, Source_Serif_4, IBM_Plex_Mono } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"
import { Header } from "@/components/layouts/header"
import { Footer } from "@/components/layouts/footer"
import MicrosoftClarity from "@/components/analytics/microsoft-clarity"
import { Providers } from "@/components/providers"
import { baseMetadata } from "@/config/metadata"
import { ANALYTICS_IDS } from "@/lib/analytics"

const googleAnalyticsId = ANALYTICS_IDS.GOOGLE_ANALYTICS

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
})

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
})

export const metadata = baseMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-pt-12 scroll-smooth motion-reduce:scroll-auto lg:scroll-pt-16"
    >
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <MicrosoftClarity />
        {googleAnalyticsId ? (
          <GoogleAnalytics gaId={googleAnalyticsId} />
        ) : null}
      </body>
    </html>
  )
}
