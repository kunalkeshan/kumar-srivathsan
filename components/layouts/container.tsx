import { cn } from "@/lib/utils"

/**
 * Layout wrapper that constrains content to the site's max-width and applies
 * consistent horizontal padding.
 *
 * Max-width: `max-w-5xl` (1024px). Padding: `px-4` on mobile, `px-6` on `md+`.
 * Pass `className` to override or extend these defaults (e.g. to add vertical
 * padding for a specific section).
 */
export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("mx-auto max-w-5xl px-4 md:px-6", className)}>
      {children}
    </div>
  )
}
