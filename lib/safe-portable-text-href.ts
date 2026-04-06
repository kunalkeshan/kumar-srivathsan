/**
 * Sanitize Portable Text link `href` values from CMS. Blocks dangerous schemes
 * (`javascript:`, `data:`, etc.) and only allows safe patterns used on this site.
 */
export function safePortableTextHref(raw: string | undefined): string {
  const href = (raw ?? "").trim()
  if (!href || href === "#") return "#"

  const lower = href.toLowerCase()
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:")
  ) {
    return "#"
  }

  if (
    href.startsWith("#") ||
    href.startsWith("/") ||
    href.startsWith("?")
  ) {
    return href
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href
  }

  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href
  }

  return "#"
}

export function isExternalPortableTextHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://")
}
