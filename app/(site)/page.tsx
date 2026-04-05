import type { Metadata } from "next"
import { About } from "@/components/landing/about"
import { Contact } from "@/components/landing/contact"
import { DestinationsLoader } from "@/components/landing/destinations-loader"
import { HeroVideo } from "@/components/landing/hero-video"
import { getSiteConfig } from "@/sanity/lib/get-site-config"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default async function Page() {
  const siteConfig = await getSiteConfig()

  return (
    <main>
      <HeroVideo heroVideoUrl={siteConfig?.heroVideoUrl ?? undefined} />
      <About />
      <DestinationsLoader />
      <Contact socialMedia={siteConfig?.socialMedia ?? null} />
    </main>
  )
}
