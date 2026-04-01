"use client"

import dynamic from "next/dynamic"

function DestinationsSkeleton() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 max-w-2xl space-y-3">
          <div className="h-3 w-24 animate-pulse rounded-surface bg-muted squircle" />
          <div className="h-8 w-56 animate-pulse rounded-surface bg-muted squircle" />
          <div className="h-4 w-full animate-pulse rounded-surface bg-muted squircle" />
        </div>
        <div className="mx-auto aspect-square w-full max-w-2xl animate-pulse rounded-surface bg-muted squircle" />
      </div>
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
