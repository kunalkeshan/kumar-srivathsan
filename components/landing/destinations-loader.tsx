"use client"

import dynamic from "next/dynamic"
import { Container } from "@/components/layouts/container"

function DestinationsSkeleton() {
  return (
    <section id="destinations" className="py-16 md:py-24">
      <Container>
        <div className="mb-10 max-w-2xl space-y-3">
          <div className="h-3 w-24 animate-pulse rounded-surface bg-muted squircle" />
          <div className="h-8 w-56 animate-pulse rounded-surface bg-muted squircle" />
          <div className="h-4 w-full animate-pulse rounded-surface bg-muted squircle" />
        </div>
        <div className="mx-auto aspect-square w-full max-w-2xl animate-pulse rounded-surface bg-muted squircle" />
      </Container>
    </section>
  )
}

const Destinations = dynamic(
  () =>
    import("@/components/landing/destinations").then((m) => ({
      default: m.Destinations,
    })),
  { ssr: false, loading: () => <DestinationsSkeleton /> }
)

export function DestinationsLoader() {
  return <Destinations />
}
