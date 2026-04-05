import type { Metadata } from "next"
import { About } from "@/components/landing/about"
import { Contact } from "@/components/landing/contact"
import { DestinationsLoader } from "@/components/landing/destinations-loader"
import { HeroVideo } from "@/components/landing/hero-video"
import { getSiteConfig } from "@/sanity/queries/site-config"
import { getDestinations } from "@/sanity/queries/destination"
import { getRoutesConfig } from "@/sanity/queries/routes-config"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default async function Page() {
  const [siteConfig, destinations, routesConfig] = await Promise.all([
    getSiteConfig(),
    getDestinations(),
    getRoutesConfig(),
  ])

  return (
    <main>
      <HeroVideo heroVideoUrl={siteConfig?.heroVideoUrl ?? undefined} />
      <About portsCount={destinations.length} />
      <DestinationsLoader
        ports={destinations}
        routes={routesConfig?.routes ?? []}
        showArcs={siteConfig?.showRouteArcs ?? false}
      />
      <Contact socialMedia={siteConfig?.socialMedia ?? null} />
    </main>
  )
}
