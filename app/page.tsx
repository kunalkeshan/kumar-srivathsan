import type { Metadata } from "next"
import { About } from "@/components/landing/about"
import { Contact } from "@/components/landing/contact"
import { Destinations } from "@/components/landing/destinations"
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
      <Destinations />
      <Contact />
    </main>
  )
}
