import Image from "next/image"
import { cn } from "@/lib/utils"

/** Props for {@link Logo} */
export type LogoProps = {
  /** Additional Tailwind classes applied to the wrapper `<div>`. */
  className?: string
  /**
   * Size preset controlling both the image dimensions and the optional text size.
   * @defaultValue `"md"`
   */
  size?: "sm" | "md" | "lg"
  /**
   * When provided, renders the site name beside the logo image using
   * `font-serif`. Omit to show the image only (e.g. in the footer icon buttons).
   */
  text?: string
  /**
   * Forwarded to Next.js `<Image priority>`. Set `true` when the logo is
   * above the fold (e.g. in the header) to hint the browser to preload it.
   * @defaultValue `false`
   */
  priority?: boolean
}

const sizeConfig = {
  sm: { px: 24, imageClass: "size-6", textClass: "text-sm md:text-base" },
  md: { px: 32, imageClass: "size-8", textClass: "text-base md:text-lg" },
  lg: { px: 40, imageClass: "size-10", textClass: "text-lg md:text-xl" },
} as const

/**
 * Site logo — a circular profile image with an optional text label.
 *
 * Renders the logo image from `/assets/logo.jpeg` at one of three
 * fixed size presets (`sm` / `md` / `lg`). When `text` is provided it
 * appears to the right of the image in `font-serif`.
 */
export function Logo({
  size = "md",
  text,
  priority = false,
  className,
}: LogoProps) {
  const { px, imageClass, textClass } = sizeConfig[size]

  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <Image
        src="/assets/logo.jpeg"
        alt={text ? "" : "Kumar Srivathsan logo"}
        width={px}
        height={px}
        className={cn("rounded-surface object-contain squircle", imageClass)}
        priority={priority}
      />
      {text && (
        <span
          className={cn(
            "font-serif leading-none font-medium tracking-tight",
            textClass
          )}
        >
          {text}
        </span>
      )}
    </div>
  )
}
