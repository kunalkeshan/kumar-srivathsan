"use client"

import { useMemo, useState } from "react"
import { useTheme } from "next-themes"
import { type Arc, type COBEOptions } from "cobe"
import { Container } from "@/components/layouts/container"
import { Globe } from "@/components/ui/globe"
import { cn } from "@/lib/utils"
import type {
  DESTINATIONS_QUERY_RESULT,
  ROUTES_CONFIG_QUERY_RESULT,
} from "@/types/cms"

/** Routes array extracted from the routesConfig query result. */
type Routes = NonNullable<NonNullable<ROUTES_CONFIG_QUERY_RESULT>["routes"]>

/** Props for {@link Destinations} */
interface DestinationsProps {
  /** Additional Tailwind classes applied to the outer `<section>` element. */
  className?: string
  /** All destination ports fetched from Sanity, used to render globe markers and labels. */
  ports: DESTINATIONS_QUERY_RESULT
  /** Shipping routes from Sanity, used to draw arcs between ports. */
  routes: Routes
  /**
   * When true, shipping route arcs are drawn between ports on the globe.
   * Controlled via the `showRouteArcs` field in the Sanity siteConfig document.
   * Defaults to false.
   */
  showArcs: boolean
}

/**
 * Interactive globe section displaying all ports visited by Kumar Srivathsan.
 *
 * Renders a COBE WebGL globe with port markers sourced from Sanity destination
 * documents. Each visible port on the facing hemisphere shows a clickable code
 * label (e.g. `SGP`); clicking expands it to the full port name.
 *
 * Shipping route arcs are defined in the Sanity routesConfig document and
 * toggled via `showArcs` (driven by `siteConfig.showRouteArcs`). When enabled,
 * ship emoji icons are shown at long-haul arc midpoints.
 *
 * Port label positioning uses the CSS Anchor Positioning API (Chrome 125+,
 * Firefox 147+) injected via a `<style>` tag scoped to this section. The
 * globe adapts its colour palette to the active theme (light/dark) via
 * `next-themes`.
 */
export function Destinations({ className, ports, routes, showArcs }: DestinationsProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [activePortId, setActivePortId] = useState<string | null>(null)
  const [labelsHovered, setLabelsHovered] = useState(false)

  /** O(1) lookup map from destination _id → port data. */
  const portMap = useMemo(
    () => new Map(ports.map((p) => [p._id, p])),
    [ports]
  )

  const markers = useMemo<COBEOptions["markers"]>(
    () =>
      ports.map((p) => ({
        location: [p.latitude ?? 0, p.longitude ?? 0] as [number, number],
        size: 0.04,
        id: p._id,
      })),
    [ports]
  )

  const arcs = useMemo<Arc[]>(
    () =>
      routes
        .map((r) => {
          const fromPort = r.from ? portMap.get(r.from._id) : null
          const toPort = r.to ? portMap.get(r.to._id) : null
          if (
            !fromPort ||
            !toPort ||
            fromPort.latitude == null ||
            fromPort.longitude == null ||
            toPort.latitude == null ||
            toPort.longitude == null
          ) {
            return null
          }
          return {
            from: [fromPort.latitude, fromPort.longitude] as [number, number],
            to: [toPort.latitude, toPort.longitude] as [number, number],
            ...(r.shipIconId
              ? {
                  id: r.shipIconId,
                  color: [0.2, 0.6, 1] as [number, number, number],
                }
              : {}),
          }
        })
        .filter((a): a is Arc => a !== null),
    [routes, portMap]
  )

  const shipRouteIds = useMemo(
    () =>
      routes.filter((r) => r.shipIconId).map((r) => r.shipIconId as string),
    [routes]
  )

  /**
   * Injected CSS that uses CSS Anchor Positioning (Chrome 125+, Firefox 147+).
   * Per-port rules set `position-anchor` and `opacity` via COBE's CSS variables.
   * The shared `.port-label` class places each label above its marker.
   */
  const labelCss = useMemo(
    () => `
.port-label {
  position: absolute;
  z-index: 10;
  bottom: anchor(top);
  left: anchor(center);
  translate: -50% 0;
  margin-bottom: 6px;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.05em;
  white-space: nowrap;
  cursor: pointer;
  transition: opacity 0.2s, background 0.15s, color 0.15s;
  pointer-events: auto;
}
.port-label:hover {
  z-index: 20;
}
.port-label[data-active="true"] {
  z-index: 30;
}

.ship-icon {
  position: absolute;
  z-index: 10;
  bottom: anchor(top);
  left: anchor(center);
  translate: -50% 0;
  font-size: 1.1rem;
  line-height: 1;
  pointer-events: none;
  transition: opacity 0.2s;
}

${ports
  .map(
    (p) => `
[data-port="${p._id}"] {
  position-anchor: --cobe-${p._id};
  opacity: var(--cobe-visible-${p._id}, 0);
}`
  )
  .join("")}

${shipRouteIds
  .map(
    (id) => `
[data-arc="${id}"] {
  position-anchor: --cobe-arc-${id};
  opacity: var(--cobe-visible-arc-${id}, 0);
}`
  )
  .join("")}
`,
    [ports, shipRouteIds]
  )

  const globeConfig = useMemo<Partial<COBEOptions>>(
    () => ({
      phi: 1.0,
      theta: 0.2,
      dark: isDark ? 1 : 0,
      baseColor: isDark ? [0.08, 0.08, 0.18] : [1, 1, 1],
      glowColor: isDark ? [0.1, 0.1, 0.3] : [0.85, 0.85, 0.85],
      mapBrightness: isDark ? 3 : 6,
      markerColor: [0.3, 0.5, 1],
      arcColor: [0.3, 0.5, 1],
      arcWidth: 0.25,
      arcHeight: 0.4,
      scale: 1,
      markers,
      arcs: showArcs ? arcs : [],
    }),
    [isDark, markers, arcs, showArcs]
  )

  const toggle = (id: string) =>
    setActivePortId((prev) => (prev === id ? null : id))

  return (
    <section id="destinations" className={cn("py-16 md:py-24", className)}>
      {/* CSS Anchor Positioning styles — scoped to this section */}
      <style>{labelCss}</style>

      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Ports Visited
          </p>
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">
            Destinations &amp; Ports
          </h2>
          <p className="mt-3 text-muted-foreground">
            {ports.length} ports across the globe — from Southeast Asia and the
            Pacific to the Middle East, Africa, Europe, and the Americas. Click
            any label to reveal the port name.
          </p>
        </div>

        {/*
          The outer div must be `position: relative` so that:
          - COBE's anchor elements (inside its wrapper) share the same containing block
          - Our label elements (siblings) can reference those anchors via CSS Anchor Positioning
        */}
        <div className="relative mx-auto w-full max-w-2xl overflow-hidden">
          {/* Port code labels — always visible on the facing side, expand on click */}
          {ports.map((port) => {
            const isActive = activePortId === port._id
            return (
              <button
                key={port._id}
                data-port={port._id}
                data-active={isActive}
                className={cn(
                  "port-label",
                  "bg-blue-500 text-white hover:bg-blue-600",
                  isActive && "bg-blue-600"
                )}
                onClick={() => toggle(port._id)}
                onMouseEnter={() => setLabelsHovered(true)}
                onMouseLeave={() => setLabelsHovered(false)}
                aria-label={port.name ?? port.code ?? port._id}
              >
                {isActive ? (port.name ?? port.code) : port.code}
              </button>
            )
          })}

          {/* Ship emoji icons at long-haul arc midpoints (only when arcs visible) */}
          {showArcs &&
            shipRouteIds.map((id) => (
              <span
                key={id}
                data-arc={id}
                className="ship-icon"
                aria-hidden="true"
              >
                ⛴️
              </span>
            ))}

          <Globe config={globeConfig} paused={labelsHovered} />
        </div>

        <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
          Drag to rotate in any direction &middot; click a code to identify
          &middot; {ports.length} ports
          {/* &middot; {routes.length} routes */}
        </p>
      </Container>
    </section>
  )
}
