"use client"

/**
 * Renders the copyright year string for the footer.
 *
 * If the current year is after the site launch year (2026), outputs a range:
 * `"2026-YYYY"`. Otherwise outputs the single year: `"2026"`.
 *
 * Marked as a client component so that the year is always evaluated in the
 * browser, avoiding a hydration mismatch when the build year differs from the
 * visitor's current year.
 */
export function CopyrightYear() {
  const current = new Date().getFullYear()
  const start = 2026

  return <>{current > start ? `${start}-${current}` : `${start}`}</>
}
