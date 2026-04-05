import Image from "next/image"

import { Container } from "@/components/layouts/container"
import { ManualPortableText } from "@/components/manuals/manual-portable-text"
import {
  formatManualPublishedDate,
  estimateReadTimeMinutes,
  formatReadTime,
} from "@/lib/manual-read-time"
import { urlFor } from "@/sanity/lib/image"
import type { MANUAL_BY_SLUG_QUERY_RESULT } from "@/types/cms"

type ManualArticleProps = {
  manual: NonNullable<MANUAL_BY_SLUG_QUERY_RESULT>
  className?: string
}

export function ManualArticle({ manual, className }: ManualArticleProps) {
  const readMinutes = estimateReadTimeMinutes(manual.plainBody)
  const readLabel = formatReadTime(readMinutes)
  const dateLabel = formatManualPublishedDate(manual._createdAt)

  const thumbUrl =
    manual.thumbnail?.asset != null
      ? urlFor(manual.thumbnail).width(1600).height(900).url()
      : null

  return (
    <div className={className}>
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold text-primary">Manual</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
          {manual.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground sm:text-sm">
          {manual.author ? (
            <span className="font-sans">by {manual.author}</span>
          ) : null}
          {manual.author ? (
            <span
              aria-hidden
              className="size-1 shrink-0 rounded-full bg-muted-foreground"
            />
          ) : null}
          <time
            className="font-mono text-muted-foreground"
            dateTime={manual._createdAt}
          >
            {dateLabel}
          </time>
          <span
            aria-hidden
            className="size-1 shrink-0 rounded-full bg-muted-foreground"
          />
          <span className="font-sans">{readLabel}</span>
        </div>

        {manual.summary ? (
          <p className="mt-6 text-xl/8 text-muted-foreground">
            {manual.summary}
          </p>
        ) : null}

        {thumbUrl && manual.thumbnail ? (
          <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-surface squircle bg-muted">
            <Image
              alt={manual.thumbnail.alt ?? ""}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 48rem"
              src={thumbUrl}
            />
          </div>
        ) : null}

        <ManualPortableText value={manual.body ?? null} />
      </Container>
    </div>
  )
}
