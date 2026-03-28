"use client"

import { useEffect } from "react"
import clarity from "@microsoft/clarity"
import { ANALYTICS_IDS } from "@/lib/analytics"

export default function MicrosoftClarity() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return
    if (!ANALYTICS_IDS.CLARITY_PROJECT) return

    try {
      clarity.init(ANALYTICS_IDS.CLARITY_PROJECT)
    } catch {
      // Ignore analytics bootstrap failures so the UI keeps working.
    }
  }, [])

  return null
}
