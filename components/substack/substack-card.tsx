import { LazyImage } from "@/components/ui/lazy-image"
import { formatManualPublishedDate } from "@/lib/manual-read-time"
import { cn } from "@/lib/utils"
import type { SubstackPost } from "@/types/substack"

type SubstackCardProps = {
  post: SubstackPost
  className?: string
}

export function SubstackCard({ post, className }: SubstackCardProps) {
  const dateLabel = formatManualPublishedDate(post.pubDate)

  return (
    <a
      className={cn(
        "group flex flex-col gap-2 rounded-surface p-3 squircle hover:bg-muted/50 active:bg-muted",
        className
      )}
      href={post.link}
      rel="noopener noreferrer"
      target="_blank"
    >
      <LazyImage
        alt={post.title}
        className="transition-all duration-500 group-hover:scale-105"
        containerClassName="rounded-surface squircle shadow-md outline outline-offset-3 outline-border/50"
        fallback="/assets/canvas.webp"
        inView={true}
        ratio={16 / 9}
        src={post.imageUrl ?? "/assets/canvas.webp"}
      />
      <div className="space-y-2 px-2 pb-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground group-hover:text-foreground sm:text-xs">
          {post.author ? (
            <>
              <span>by {post.author}</span>
              <span
                aria-hidden
                className="size-1 shrink-0 rounded-full squircle bg-muted-foreground"
              />
            </>
          ) : null}
          <time className="font-mono" dateTime={post.pubDate}>
            {dateLabel}
          </time>
        </div>
        <h3 className="line-clamp-2 font-serif text-lg font-semibold">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="line-clamp-3 text-sm text-muted-foreground group-active:text-foreground">
            {post.excerpt}
          </p>
        ) : null}
      </div>
    </a>
  )
}
