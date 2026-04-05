import { BookOpen } from "lucide-react"

import { Container } from "@/components/layouts/container"
import { ManualCard } from "@/components/manuals/manual-card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { cn } from "@/lib/utils"
import type { MANUALS_LIST_QUERY_RESULT } from "@/types/cms"

export type ManualListItem = MANUALS_LIST_QUERY_RESULT[number]

type ManualsSectionProps = {
  title: string
  description: string
  manuals: ManualListItem[]
  /** Suffix for `aria-labelledby` / heading id (avoid duplicates when multiple sections exist). */
  headingIdSuffix?: string
  emptyTitle?: string
  emptyDescription?: string
  className?: string
}

export function ManualsSection({
  title,
  description,
  manuals,
  headingIdSuffix = "default",
  emptyTitle = "No manuals yet",
  emptyDescription = "Check back soon for new guides and procedures.",
  className,
}: ManualsSectionProps) {
  const hasItems = manuals.length > 0
  const headingId = `manuals-section-heading-${headingIdSuffix}`

  return (
    <section aria-labelledby={headingId} className={cn(className)}>
      <Container className="relative">
        <div className="space-y-1 py-8 md:py-10">
          <h2
            className="font-serif text-2xl font-semibold tracking-wide md:text-4xl"
            id={headingId}
          >
            {title}
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            {description}
          </p>
        </div>
        <div className="relative pb-10 md:pb-12">
          <FullWidthDivider className="top-0" contained />
          {hasItems ? (
            <div className="z-10 grid gap-0 pt-6 md:grid-cols-2 lg:grid-cols-3">
              {manuals.map((m) => (
                <ManualCard key={m._id} manual={m} />
              ))}
            </div>
          ) : (
            <Empty className="mt-6 border border-dashed border-muted">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BookOpen aria-hidden className="size-6" />
                </EmptyMedia>
                <EmptyTitle>{emptyTitle}</EmptyTitle>
                <EmptyDescription>{emptyDescription}</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </div>
      </Container>
    </section>
  )
}
