import { cn } from "@/lib/utils"

type FullWidthDividerProps = React.ComponentProps<"div"> & {
  contained?: boolean
  position?: "top" | "bottom"
}

export function FullWidthDivider({
  className,
  contained = false,
  position,
  ...props
}: FullWidthDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-px bg-border",
        // full-bleed (default)
        "data-[contained=false]:left-[calc(50%-50dvw)] data-[contained=false]:right-[calc(50%-50dvw)] data-[contained=false]:w-auto",
        // contained
        "data-[contained=true]:inset-x-0 data-[contained=true]:w-full",
        // position
        position &&
          "data-[position=bottom]:-bottom-px data-[position=top]:-top-px",
        className
      )}
      data-contained={contained}
      data-position={position}
      {...props}
    />
  )
}
