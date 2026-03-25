import { About } from "@/components/landing/about"
import { Hero } from "@/components/landing/hero"
import { Contact } from "@/components/landing/contact"
import { Destinations } from "@/components/landing/destinations"

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
