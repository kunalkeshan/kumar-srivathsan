import type { Metadata } from "next"
import { About } from "@/components/landing/about"
import { Contact } from "@/components/landing/contact"
import { DestinationsLoader } from "@/components/landing/destinations-loader"
import { HeroVideo } from "@/components/landing/hero-video"
import { ManualsSection } from "@/components/manuals/manuals-section"
import { SubstackSection } from "@/components/substack/substack-section"
import { SubstackSubscribe } from "@/components/substack/substack-subscribe"
import { getSubstackPosts } from "@/lib/substack"
import { getDestinations } from "@/sanity/queries/destination"
import { getLatestManuals } from "@/sanity/queries/manual"
import { getRoutesConfig } from "@/sanity/queries/routes-config"
import { getSiteConfig } from "@/sanity/queries/site-config"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default async function Page() {
  const [siteConfig, destinations, routesConfig, latestManuals, substackPosts] =
    await Promise.all([
      getSiteConfig(),
      getDestinations(),
      getRoutesConfig(),
      getLatestManuals(),
      getSubstackPosts(6),
    ])

  const substackUrl = process.env.SUBSTACK_URL ?? ""

  return (
    <main>
      <HeroVideo heroVideoUrl={siteConfig?.heroVideoUrl ?? undefined} />
      <About portsCount={destinations.length} />
      <ManualsSection
        description="Recent procedures, notes, and how-tos from the voyage."
        headingIdSuffix="home-latest"
        manuals={latestManuals}
        title="Latest manuals"
      />
      <SubstackSection
        description="Dispatches, reflections, and notes from along the way."
        headingIdSuffix="home-logbook"
        posts={substackPosts}
        substackUrl={substackUrl}
        title="From the logbook"
      />
      <DestinationsLoader
        ports={destinations}
        routes={routesConfig?.routes ?? []}
        showArcs={siteConfig?.showRouteArcs ?? false}
      />
      <Contact socialMedia={siteConfig?.socialMedia ?? null} />
      <SubstackSubscribe substackUrl={substackUrl} />
    </main>
  )
}
