/**
 * Contact section listing all ways to reach Kumar Srivathsan.
 *
 * Accepts a `socialMedia` prop (from Sanity siteConfig) and uses
 * {@link mapSanityMediaToContactEntries} to derive the contact grid entries.
 * Falls back to the static config arrays in `config/socials.ts` when the
 * prop is null or empty (e.g. siteConfig not yet published in Sanity).
 *
 * All entries are merged into a single array and rendered as a responsive
 * 3-column grid of anchor links. A fixed footer row links to Nebula Pages.
 */
import { Rocket } from "lucide-react"

import { cn } from "@/lib/utils"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { Container } from "@/components/layouts/container"
import { mapSanityMediaToContactEntries } from "@/config/socials"
import type { SITE_CONFIG_QUERY_RESULT } from "@/types/cms"

type ContactProps = {
  socialMedia: NonNullable<SITE_CONFIG_QUERY_RESULT>["socialMedia"]
}

export function Contact({ socialMedia }: ContactProps) {
  const data = mapSanityMediaToContactEntries(socialMedia)
  return (
    <section id="contact" className="py-12">
      <Container>
        <h2 className="mb-6 text-lg font-medium md:text-2xl">
          Have Questions? Get in Touch!
        </h2>
        <div className="relative">
          <FullWidthDivider position="top" />
          <div className="grid gap-px overflow-hidden bg-border px-px md:grid-cols-3">
            {data.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group flex items-center gap-3 bg-background p-2 shadow-xs transition-colors hover:bg-muted/20"
              >
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted/50 transition-colors squircle group-hover:bg-background",
                    "[&_svg]:size-4 [&_svg]:text-muted-foreground [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-in-out group-hover:[&_svg]:scale-110"
                  )}
                >
                  {item.icon}
                </div>
                <div className="flex flex-col gap-y-0.5">
                  <p className="text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.value}</p>
                </div>
              </a>
            ))}
            <a
              href="https://nebulapages.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group col-span-full flex items-center gap-3 bg-background p-2 shadow-xs transition-colors hover:bg-muted/20"
            >
              <div
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted/50 transition-colors squircle group-hover:bg-background",
                  "[&_svg]:size-4 [&_svg]:text-muted-foreground [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-in-out group-hover:[&_svg]:scale-110"
                )}
              >
                <Rocket />
              </div>
              <div className="flex flex-col gap-y-0.5">
                <p className="text-sm">My Associations</p>
                <p className="text-xs text-muted-foreground">
                  Nebula Pages &middot; From launch to orbit, we build for every
                  scale.
                </p>
              </div>
            </a>
          </div>
          <FullWidthDivider position="bottom" />
        </div>
      </Container>
    </section>
  )
}
