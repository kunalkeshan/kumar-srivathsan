import type { Metadata } from "next"
import { About } from "@/components/landing/about"
import { Contact } from "@/components/landing/contact"
import { DestinationsLoader } from "@/components/landing/destinations-loader"
import { HeroVideo } from "@/components/landing/hero-video"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function Page() {
  return (
    <main>
      <HeroVideo />
      <About />
      <DestinationsLoader />
      <Contact />
    </main>
  )
}
