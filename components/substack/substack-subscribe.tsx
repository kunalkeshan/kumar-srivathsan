import { Container } from "@/components/layouts/container"
import { FullWidthDivider } from "@/components/ui/full-width-divider"

type SubstackSubscribeProps = {
  substackUrl: string
}

export function SubstackSubscribe({ substackUrl }: SubstackSubscribeProps) {
  if (!substackUrl) return null

  return (
    <section aria-label="Subscribe to the logbook">
      <Container className="relative">
        <FullWidthDivider contained />
        <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-3 md:items-center md:gap-12 md:py-14">
          <div className="space-y-2 md:col-span-1">
            <h2 className="font-serif text-2xl font-semibold tracking-wide md:text-4xl">
              Stay in the loop
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              Get new logbook entries delivered straight to your inbox.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="overflow-hidden rounded-surface squircle bg-white shadow-md">
              <iframe
                frameBorder="0"
                height="320"
                scrolling="no"
                src={`${substackUrl}/embed`}
                style={{ border: "none" }}
                title="Subscribe to the logbook on Substack"
                width="100%"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
