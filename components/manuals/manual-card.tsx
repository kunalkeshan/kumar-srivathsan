import Link from "next/link"

import { LazyImage } from "@/components/ui/lazy-image"
import {
  estimateReadTimeMinutes,
  formatManualPublishedDate,
  formatReadTime,
} from "@/lib/manual-read-time"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/lib/image"
import type { MANUAL_BY_SLUG_QUERY_RESULT, MANUALS_LIST_QUERY_RESULT } from "@/types/cms"

export type ManualCardSource =
  | MANUALS_LIST_QUERY_RESULT[number]
  | NonNullable<
      NonNullable<MANUAL_BY_SLUG_QUERY_RESULT>["relatedManuals"]
    >[number]

type ManualCardProps = {
  manual: ManualCardSource
  className?: string
}

/**
 * Teaser card for a manual — matches blog example layout (LazyImage, meta row, clamps).
 */
export function ManualCard({ manual, className }: ManualCardProps) {
  const slug = manual.slug?.current
  if (!slug) return null

  const title = manual.title ?? "Untitled"
  const readMinutes = estimateReadTimeMinutes(manual.plainBody)
  const readLabel = formatReadTime(readMinutes)
  const dateLabel = formatManualPublishedDate(manual._createdAt)

  const imageUrl =
    manual.thumbnail?.asset != null
      ? urlFor(manual.thumbnail).width(640).height(360).url()
      : "https://placehold.co/640x360?text=Manual"

  return (
    <Link
      className={cn(
        "group flex flex-col gap-2 rounded-surface p-3 squircle hover:bg-muted/50 active:bg-muted",
        className
      )}
      href={`/manuals/${slug}`}
      prefetch={false}
    >
      <LazyImage
        alt={manual.thumbnail?.alt ?? title}
        className="transition-all duration-500 group-hover:scale-105"
        containerClassName="rounded-surface squircle shadow-md outline outline-offset-3 outline-border/50"
        fallback="https://placehold.co/640x360?text=Manual"
        inView={true}
        ratio={16 / 9}
        src={imageUrl}
      />
      <div className="space-y-2 px-2 pb-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground group-hover:text-foreground sm:text-xs">
          {manual.author ? <span>by {manual.author}</span> : null}
          {manual.author ? (
            <span
              aria-hidden
              className="size-1 shrink-0 rounded-full bg-muted-foreground"
            />
          ) : null}
          <time className="font-mono" dateTime={manual._createdAt}>
            {dateLabel}
          </time>
          <span
            aria-hidden
            className="size-1 shrink-0 rounded-full bg-muted-foreground"
          />
          <span>{readLabel}</span>
        </div>
        <h3 className="line-clamp-2 font-serif text-lg font-semibold">
          {title}
        </h3>
        {manual.summary ? (
          <p className="line-clamp-3 text-sm text-muted-foreground group-active:text-foreground">
            {manual.summary}
          </p>
        ) : null}
      </div>
    </Link>
  )
}
