"use client";

import { useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Arc, COBEOptions } from "cobe";
import { Container } from "@/components/layouts/container";
import { Globe } from "@/components/ui/globe";
import { PORTS, ROUTES, SHIP_ROUTE_IDS } from "@/config/destinations";
import { cn } from "@/lib/utils";

interface DestinationsProps {
  className?: string;
}

function portCoords(id: string): [number, number] {
  const p = PORTS.find((x) => x.id === id)!;
  return [p.latitude, p.longitude];
}

/** Set to true to render shipping route arcs on the globe */
const SHOW_ARCS = false;

const MARKERS: COBEOptions["markers"] = PORTS.map((p) => ({
  location: [p.latitude, p.longitude],
  size: 0.04,
  id: p.id,
}));

const ARCS: Arc[] = ROUTES.map((r) => ({
  from: portCoords(r.from),
  to: portCoords(r.to),
  ...(r.shipIconId
    ? { id: r.shipIconId, color: [0.2, 0.6, 1] as [number, number, number] }
    : {}),
}));

/**
 * Injected CSS that uses CSS Anchor Positioning (Chrome 125+, Firefox 147+).
 * Per-port rules set `position-anchor` and `opacity` via COBE's CSS variables.
 * The shared `.port-label` class places each label above its marker.
 */
const LABEL_CSS = `
.port-label {
  position: absolute;
  z-index: 10;
  bottom: anchor(top);
  left: anchor(center);
  translate: -50% 0;
  margin-bottom: 6px;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--font-ibm-plex-mono, monospace);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.05em;
  white-space: nowrap;
  cursor: pointer;
  transition: opacity 0.2s, background 0.15s, color 0.15s;
  pointer-events: auto;
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

${PORTS.map(
  (p) => `
[data-port="${p.id}"] {
  position-anchor: --cobe-${p.id};
  opacity: var(--cobe-visible-${p.id}, 0);
}`
).join("")}

${SHIP_ROUTE_IDS.map(
  (id) => `
[data-arc="${id}"] {
  position-anchor: --cobe-arc-${id};
  opacity: var(--cobe-visible-arc-${id}, 0);
}`
).join("")}
`;

export function Destinations({ className }: DestinationsProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [activePortId, setActivePortId] = useState<string | null>(null);
  const [labelsHovered, setLabelsHovered] = useState(false);

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
      scale: 0.88,
      markers: MARKERS,
      arcs: SHOW_ARCS ? ARCS : [],
    }),
    [isDark]
  );

  const toggle = (id: string) =>
    setActivePortId((prev) => (prev === id ? null : id));

  return (
    <section id="destinations" className={cn("py-16 md:py-24", className)}>
      {/* CSS Anchor Positioning styles — scoped to this section */}
      <style>{LABEL_CSS}</style>

      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Ports Visited
          </p>
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">
            Destinations &amp; Ports
          </h2>
          <p className="mt-3 text-muted-foreground">
            {PORTS.length} ports across the globe — from Southeast Asia and the
            Pacific to the Middle East, Africa, Europe, and the Americas. Click
            any label to reveal the port name.
          </p>
        </div>

        {/*
          The outer div must be `position: relative` so that:
          - COBE's anchor elements (inside its wrapper) share the same containing block
          - Our label elements (siblings) can reference those anchors via CSS Anchor Positioning
        */}
        <div className="relative mx-auto w-full max-w-2xl">
          {/* Port code labels — always visible on the facing side, expand on click */}
          {PORTS.map((port) => {
            const isActive = activePortId === port.id;
            return (
              <button
                key={port.id}
                data-port={port.id}
                className={cn(
                  "port-label",
                  "bg-blue-500 text-white hover:bg-blue-600",
                  isActive && "bg-blue-600"
                )}
                onClick={() => toggle(port.id)}
                onMouseEnter={() => setLabelsHovered(true)}
                onMouseLeave={() => setLabelsHovered(false)}
                aria-label={port.name}
              >
                {isActive ? port.name : port.code}
              </button>
            );
          })}

          {/* Ship emoji icons at long-haul arc midpoints (only when arcs visible) */}
          {SHOW_ARCS &&
            SHIP_ROUTE_IDS.map((id) => (
              <span key={id} data-arc={id} className="ship-icon" aria-hidden="true">
                ⛴️
              </span>
            ))}

          <Globe config={globeConfig} paused={labelsHovered} />
        </div>

        <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
          Drag to rotate in any direction &middot; click a code to identify &middot;{" "}
          {PORTS.length} ports &middot; {ROUTES.length} routes
        </p>
      </Container>
    </section>
  );
}
