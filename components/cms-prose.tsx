import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type CmsProseProps = ComponentProps<"div">

/**
 * Wrapper for rich text from Sanity (Portable Text). Applies the Tailwind Typography
 * `prose` stack via the `.prose-cms` preset in `app/globals.css` (theme colors, serif
 * headings, squircle images). Nest `PortableText` from `next-sanity` inside this element.
 */
export function CmsProse({ className, ...props }: CmsProseProps) {
  return <div className={cn("prose-cms", className)} {...props} />
}
