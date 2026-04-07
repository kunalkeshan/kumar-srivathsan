import { BookOpen } from "lucide-react"

import { Container } from "@/components/layouts/container"
import { SubstackCard } from "@/components/substack/substack-card"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { cn } from "@/lib/utils"
import type { SubstackPost } from "@/types/substack"

type SubstackSectionProps = {
  title: string
  description: string
  posts: SubstackPost[]
  substackUrl: string
  headingIdSuffix?: string
  emptyTitle?: string
  emptyDescription?: string
  className?: string
}

export function SubstackSection({
  title,
  description,
  posts,
  substackUrl,
  headingIdSuffix = "default",
  emptyTitle = "Nothing in the logbook yet",
  emptyDescription = "Check back soon for new entries.",
  className,
}: SubstackSectionProps) {
  const hasItems = posts.length > 0
  const headingId = `substack-section-heading-${headingIdSuffix}`

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
            <>
              <div className="z-10 grid gap-0 pt-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <SubstackCard key={post.link} post={post} />
                ))}
              </div>
              {substackUrl ? (
                <div className="pt-6">
                  <Button asChild variant="outline">
                    <a
                      href={substackUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      View all on Substack
                    </a>
                  </Button>
                </div>
              ) : null}
            </>
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
