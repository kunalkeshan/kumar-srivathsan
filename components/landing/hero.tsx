"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { HashLink } from "@/components/ui/hash-link"
import { cn } from "@/lib/utils"

/**
 * Full-viewport hero section with a parallax background image.
 *
 * Renders separate mobile (9:16) and desktop (16:9) background images that
 * shift downward as the user scrolls via a passive `scroll`/`touchmove`
 * listener. This component is the static-image fallback used when
 * {@link HeroVideo} is not rendered.
 */
export function Hero() {
  const mobileBgRef = useRef<HTMLDivElement>(null)
  const desktopBgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const applyParallax = () => {
      const translateY = window.scrollY * 0.35
      if (mobileBgRef.current) {
        mobileBgRef.current.style.transform = `translateY(${translateY}px)`
      }
      if (desktopBgRef.current) {
        desktopBgRef.current.style.transform = `translateY(${translateY}px)`
      }
    }
    window.addEventListener("scroll", applyParallax, { passive: true })
    window.addEventListener("touchmove", applyParallax, { passive: true })
    return () => {
      window.removeEventListener("scroll", applyParallax)
      window.removeEventListener("touchmove", applyParallax)
    }
  }, [])

  return (
    <section className="relative -mt-14 h-svh w-full overflow-hidden md:h-screen">
      {/* Mobile background — canvas.png (9:16) */}
      <div
        ref={mobileBgRef}
        className="absolute inset-x-0 top-0 h-[120%] bg-cover bg-center md:hidden"
        style={{
          backgroundImage: "url('/assets/canvas.webp')",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* Desktop background — hero.jpg (16:9) */}
      <div
        ref={desktopBgRef}
        className="absolute inset-x-0 -top-[20%] hidden h-[140%] bg-cover bg-center md:block"
        style={{
          backgroundImage: "url('/assets/hero.webp')",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 bg-linear-to-b from-black/65 via-black/35 to-black/10"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <h1
          className={cn(
            "font-serif text-4xl font-bold tracking-tight text-white",
            "md:text-6xl lg:text-7xl"
          )}
        >
          Mastering Every Horizon
        </h1>

        <h2
          className={cn(
            "mt-4 max-w-xl font-serif text-base font-normal text-white/80",
            "md:mt-6 md:max-w-2xl md:text-xl"
          )}
        >
          Navigation Officer charting safe passages across the world&apos;s
          oceans — precision, discipline, and seamless coordination at every
          voyage.
        </h2>

        <Button
          size="lg"
          variant="outline"
          className={cn(
            "mt-8 bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
            "md:mt-10"
          )}
          asChild
        >
          <HashLink href="/#contact">Get in Touch</HashLink>
        </Button>
      </div>
    </section>
  )
}
