"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

  const handleContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative -mt-14 h-svh w-full overflow-hidden md:h-screen">
      {/* Mobile background — canvas.png (9:16) */}
      <div
        ref={mobileBgRef}
        className="absolute inset-x-0 top-0 h-[120%] bg-cover bg-center md:hidden"
        style={{
          backgroundImage: "url('/assets/canvas.png')",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* Desktop background — hero.jpg (16:9) */}
      <div
        ref={desktopBgRef}
        className="absolute inset-x-0 -top-[20%] hidden h-[140%] bg-cover bg-center md:block"
        style={{
          backgroundImage: "url('/assets/hero.jpg')",
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
      <div
        className={cn(
          "relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center",
          "md:justify-start md:pt-28"
        )}
      >
        <h1
          className={cn(
            "font-sans text-4xl font-bold tracking-tight text-white",
            "md:text-6xl lg:text-7xl"
          )}
        >
          Mastering Every Horizon
        </h1>

        <h2
          className={cn(
            "mt-4 max-w-xl font-sans text-base font-normal text-white/80",
            "md:mt-6 md:max-w-2xl md:text-xl"
          )}
        >
          Navigation Officer charting safe passages across the world&apos;s
          oceans — precision, discipline, and seamless coordination at every
          voyage.
        </h2>

        <Button
          size="lg"
          onClick={handleContact}
          className={cn(
            "mt-8 rounded-full border-white/70 bg-transparent text-white hover:bg-white hover:text-black",
            "md:mt-10"
          )}
          variant="outline"
        >
          Get in Touch
        </Button>
      </div>
    </section>
  )
}
