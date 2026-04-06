import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type CmsProseProps = ComponentProps<"div">

/**
 * Wrapper for rich text from Sanity (Portable Text). Uses the literal `prose` class so
 * `@tailwindcss/typography` descendant rules (e.g. `h2` / `p` spacing and sizes) apply;
 * `.prose-cms` in `app/globals.css` adds site tokens (serif headings, squircle images).
 * Nest `PortableText` from `next-sanity` inside this element.
 */
export function CmsProse({ className, ...props }: CmsProseProps) {
  return (
    <div
      className={cn(
        "prose-cms prose prose-sm max-w-none prose-neutral dark:prose-invert",
        className
      )}
      {...props}
    />
  )
}
