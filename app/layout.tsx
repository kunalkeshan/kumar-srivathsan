// For adding custom fonts with other frameworks, see:
// https://tailwindcss.com/docs/font-family
import type { Metadata } from "next"
import { Space_Grotesk, Source_Serif_4, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { baseMetadata } from "@/config/metadata"
import { getSiteConfig } from "@/sanity/lib/get-site-config"
import { urlFor } from "@/sanity/lib/image"

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
  weight: ["400", "500"],
})

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig()

  const title = siteConfig?.title ?? undefined
  const description = siteConfig?.description ?? undefined

  const ogImageUrl = siteConfig?.ogImage?.asset
    ? urlFor(siteConfig.ogImage).width(1200).height(630).url()
    : undefined
  const ogImageAlt = siteConfig?.ogImage?.alt ?? undefined

  const twitterImageUrl = siteConfig?.twitterImage?.asset
    ? urlFor(siteConfig.twitterImage).width(1200).height(600).url()
    : undefined

  return {
    metadataBase: baseMetadata.metadataBase,
    ...(title && { title: { template: `%s | ${title}`, default: title } }),
    ...(description && { description }),
    openGraph: {
      locale: "en_US",
      type: "website",
      url: "/",
      ...(title && { title, siteName: title }),
      ...(description && { description }),
      ...(ogImageUrl && { images: [{ url: ogImageUrl, alt: ogImageAlt }] }),
    },
    twitter: {
      card: "summary_large_image",
      ...(title && { title }),
      ...(description && { description }),
      ...(twitterImageUrl && { images: [twitterImageUrl] }),
    },
  }
}

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
        {children}
      </body>
    </html>
  )
}
