"use client"

import * as React from "react"
import { motion, useScroll, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export type ScrollProgressProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  keyof MotionProps
>

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(function ScrollProgress({ className, ...props }, ref) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-linear-to-r from-chart-5 via-chart-3 to-chart-1",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  )
})
ScrollProgress.displayName = "ScrollProgress"
