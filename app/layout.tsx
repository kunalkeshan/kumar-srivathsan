// For adding custom fonts with other frameworks, see:
// https://tailwindcss.com/docs/font-family
import { Space_Grotesk, DM_Serif_Text, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layouts/header"
import { Footer } from "@/components/layouts/footer"
import { baseMetadata } from "@/config/metadata"

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontSerif = DM_Serif_Text({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
})

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

export const metadata = baseMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-pt-12 scroll-smooth motion-reduce:scroll-auto lg:scroll-pt-16">
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
