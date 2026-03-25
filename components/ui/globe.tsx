"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface GlobeProps {
  className?: string
  config: Partial<COBEOptions>
  /** Pause auto-rotation from outside (e.g. when hovering labels) */
  paused?: boolean
}

const THETA_MIN = -Math.PI / 2.2
const THETA_MAX = Math.PI / 2.2

export function Globe({ className, config, paused }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(config.phi ?? 1.0)
  const thetaRef = useRef(config.theta ?? 0.2)
  const isHoveredRef = useRef(false)
  const pausedRef = useRef(paused ?? false)

  useEffect(() => {
    pausedRef.current = paused ?? false
  }, [paused])
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const startPhiRef = useRef(0)
  const startThetaRef = useRef(0)
  const rafRef = useRef<number>(0)
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const c = canvas

    let width = c.offsetWidth
    const handleResize = () => {
      width = c.offsetWidth
    }
    window.addEventListener("resize", handleResize)

    globeRef.current = createGlobe(c, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      mapSamples: 28000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.3, 0.5, 1],
      glowColor: [0.85, 0.85, 0.85],
      arcColor: [0.3, 0.5, 1],
      arcWidth: 0.25,
      arcHeight: 0.4,
      diffuse: 1.2,
      dark: 0,
      scale: 1,
      markers: [],
      arcs: [],
      phi: phiRef.current,
      theta: thetaRef.current,
      ...config,
    })

    function animate() {
      if (!isDraggingRef.current && !isHoveredRef.current && !pausedRef.current)
        phiRef.current += 0.003
      globeRef.current?.update({
        phi: phiRef.current,
        theta: thetaRef.current,
        width: width * 2,
        height: width * 2,
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      globeRef.current?.destroy()
      window.removeEventListener("resize", handleResize)
    }
  }, [config])

  const onDown = (x: number, y: number) => {
    isDraggingRef.current = true
    startXRef.current = x
    startYRef.current = y
    startPhiRef.current = phiRef.current
    startThetaRef.current = thetaRef.current
  }

  const onMove = (x: number, y: number) => {
    if (!isDraggingRef.current) return
    const dx = x - startXRef.current
    const dy = y - startYRef.current
    phiRef.current = startPhiRef.current + dx / 200
    thetaRef.current = Math.max(
      THETA_MIN,
      Math.min(THETA_MAX, startThetaRef.current + dy / 200)
    )
  }

  const onUp = () => {
    isDraggingRef.current = false
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "aspect-square w-full cursor-grab touch-none active:cursor-grabbing",
        className
      )}
      onMouseEnter={() => {
        isHoveredRef.current = true
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false
        onUp()
      }}
      onMouseDown={(e) => onDown(e.clientX, e.clientY)}
      onMouseMove={(e) => onMove(e.clientX, e.clientY)}
      onMouseUp={onUp}
      onTouchStart={(e) => onDown(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => onMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={onUp}
    />
  )
}
