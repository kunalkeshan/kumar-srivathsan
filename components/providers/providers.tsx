"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster position="bottom-right" richColors />
    </ThemeProvider>
  )
}
