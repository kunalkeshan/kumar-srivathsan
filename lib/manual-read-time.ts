const WORDS_PER_MINUTE = 200

/**
 * Estimated reading time from plain text (e.g. GROQ `pt::text(body)`).
 * Returns at least 1 minute when there is any content.
 */
export function estimateReadTimeMinutes(
  plainBody: string | null | undefined
): number {
  if (!plainBody?.trim()) return 1
  const words = plainBody.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

export function formatReadTime(minutes: number): string {
  return `${minutes} min read`
}

/** Card + detail: published date in UTC, monospace-friendly segment. */
export function formatManualPublishedDate(iso: string): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(d)
}
