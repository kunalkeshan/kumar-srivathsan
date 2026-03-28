"use client"

import { useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Button } from "@/components/ui/button"
import { HashLink } from "@/components/ui/hash-link"
import { cn } from "@/lib/utils"
import { heroVideoUrl } from "@/config/media"

// ── Parallax tuning ───────────────────────────────────────────────────────────
/** Set to `false` to disable the scroll-driven parallax on the video background. */
const PARALLAX_ENABLED = true
const PARALLAX_Y_END = "35%" // how far the video shifts down on scroll
const PARALLAX_SCALE_END = 1.2 // zoom-in factor at full scroll
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Full-viewport hero section with an autoplaying background video and
 * scroll-driven parallax effect powered by Motion's `useScroll` and
 * `useTransform`.
 *
 * Behaviour details:
 * - Video is fetched from {@link heroVideoUrl} (external CDN).
 * - If the video fails to load (`onError`), falls back to static WebP images
 *   (mobile: `canvas.webp`, desktop: `hero.webp`).
 * - Parallax and autoplay are disabled when the user prefers reduced motion
 *   (`prefers-reduced-motion: reduce`).
 * - Tuning constants (`PARALLAX_ENABLED`, `PARALLAX_Y_END`, `PARALLAX_SCALE_END`)
 *   are defined at the top of the file.
 */
export function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null)
  const [videoError, setVideoError] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const yMotion = useTransform(scrollYProgress, [0, 1], ["0%", PARALLAX_Y_END])
  const scaleMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [1, PARALLAX_SCALE_END]
  )

  const parallaxActive = PARALLAX_ENABLED && !prefersReducedMotion
  const parallaxStyle = parallaxActive
    ? { y: yMotion, scale: scaleMotion }
    : { y: "0%", scale: 1 }

  return (
    <section
      ref={sectionRef}
      className="relative -mt-14 h-svh w-full overflow-hidden md:h-screen"
    >
      {/* Video background with parallax (falls back to static images on error) */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[120%] w-full"
        style={parallaxStyle}
        aria-hidden="true"
      >
        {videoError ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center md:hidden"
              style={{ backgroundImage: "url('/assets/canvas.webp')" }}
            />
            <div
              className="absolute inset-0 hidden bg-cover bg-center md:block"
              style={{ backgroundImage: "url('/assets/hero.webp')" }}
            />
          </>
        ) : (
          <video
            autoPlay={!prefersReducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
            src={heroVideoUrl}
            className="h-full w-full object-cover"
            onError={() => setVideoError(true)}
          />
        )}
      </motion.div>

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
            "mt-8 border-white/70 bg-white text-black hover:bg-white/15 hover:text-white hover:backdrop-blur-sm",
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
