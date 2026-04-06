import type { ComponentProps } from "react"
import Link from "next/link"

import { Container } from "@/components/layouts/container"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { cn } from "@/lib/utils"
import type { LEGAL_DOCUMENTS_QUERY_RESULT } from "@/types/cms"

function formatUpdatedAt(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

type LegalIndexProps = {
  documents: LEGAL_DOCUMENTS_QUERY_RESULT
}

export function LegalIndex({ documents }: LegalIndexProps) {
  if (!documents.length) {
    return (
      <Container className="max-w-3xl pb-16 pt-10">
        <p className="text-muted-foreground">
          No legal documents are published yet.
        </p>
      </Container>
    )
  }

  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col justify-start md:border-x">
      <Container className="max-w-none space-y-2 px-4 py-8 md:py-12">
        <h1 className="font-serif text-2xl font-semibold tracking-tight md:text-4xl">
          Legal
        </h1>
        <p className="text-sm text-muted-foreground">
          Policies and terms for this site. Last updated dates are shown for each
          document.
        </p>
      </Container>

      <div className="relative">
        <FullWidthDivider />
        <div className="divide-y">
          {documents.map((doc) => {
            const slug = doc.slug?.current
            if (!slug) return null
            const title = doc.title ?? "Untitled"
            const description = doc.description?.trim() ?? ""
            return (
              <LegalIndexRow
                key={doc._id}
                dateLabel={formatUpdatedAt(doc._updatedAt)}
                description={description}
                documentTitle={title}
                href={`/legal/${slug}`}
              />
            )
          })}
        </div>
        <FullWidthDivider />
      </div>
    </div>
  )
}

function LegalIndexRow({
  documentTitle,
  dateLabel,
  description,
  href,
  className,
}: Omit<ComponentProps<typeof Link>, "children" | "prefetch"> & {
  documentTitle: string
  dateLabel: string
  description: string
}) {
  return (
    <Link
      className={cn(
        "group flex min-h-24 w-full flex-col justify-center gap-y-1 p-4 hover:cursor-pointer hover:bg-accent/30 active:bg-accent dark:active:bg-accent/50",
        className
      )}
      href={href}
      prefetch={false}
    >
      <div className="relative flex items-end justify-center gap-2">
        <h2 className="whitespace-nowrap font-serif text-lg font-medium text-foreground md:text-xl">
          {documentTitle}
        </h2>
        <span className="mb-[6px] w-full border-b-2 border-dashed border-border" />
        <span className="whitespace-nowrap font-mono text-xs uppercase text-muted-foreground group-hover:text-foreground md:text-sm">
          {dateLabel}
        </span>
      </div>
      {description ? (
        <p className="max-w-sm text-sm text-muted-foreground group-hover:text-foreground md:max-w-full md:text-base">
          {description}
        </p>
      ) : null}
    </Link>
  )
}
