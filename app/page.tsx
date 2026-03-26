import type { Metadata } from "next"
import { preload } from "react-dom"
import { About } from "@/components/landing/about"
// import { Hero } from "@/components/landing/hero"
import { Contact } from "@/components/landing/contact"
import { Destinations } from "@/components/landing/destinations"
import { HeroVideo } from "@/components/landing/hero-video"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function Page() {
  preload("/assets/canvas.webp", {
    as: "image",
    fetchPriority: "high",
    media: "(max-width: 767px)",
  })
  preload("/assets/hero.webp", {
    as: "image",
    fetchPriority: "high",
    media: "(min-width: 768px)",
  })

  return (
    <main>
      {/* <Hero /> */}
      <HeroVideo />
      <About />
      <Destinations />
      <Contact />
    </main>
  )
}
