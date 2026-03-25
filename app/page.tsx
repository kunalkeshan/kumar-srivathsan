import type { Metadata } from "next"
import { About } from "@/components/landing/about"
import { Hero } from "@/components/landing/hero"
import { Contact } from "@/components/landing/contact"
import { Destinations } from "@/components/landing/destinations"

export const metadata: Metadata = {
	alternates: {
		canonical: "/",
	},
}

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Destinations />
      <Contact />
    </main>
  )
}
