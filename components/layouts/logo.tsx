import Image from "next/image"
import { cn } from "@/lib/utils"

export type LogoProps = {
  className?: string
  size?: "sm" | "md" | "lg"
  text?: string
  priority?: boolean
}

const sizeConfig = {
  sm: { px: 24, imageClass: "size-6", textClass: "text-base" },
  md: { px: 32, imageClass: "size-8", textClass: "text-lg" },
  lg: { px: 40, imageClass: "size-10", textClass: "text-xl" },
} as const

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
