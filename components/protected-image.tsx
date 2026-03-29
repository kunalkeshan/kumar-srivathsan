"use client"

import Image, { type ImageProps } from "next/image"

/**
 * Drop-in replacement for `next/image` that suppresses the browser context
 * menu on right-click. Intended for content photos where download-via-context-
 * menu is undesirable (e.g. About section). Not cryptographically secure —
 * DevTools, network tab, and screenshots remain available.
 *
 * Any `onContextMenu` passed by the caller is chained after prevention so
 * callers retain the ability to attach additional handlers.
 */
export function ProtectedImage({ onContextMenu, alt, ...props }: ImageProps) {
  return (
    <Image
      alt={alt}
      {...props}
      onContextMenu={(e) => {
        e.preventDefault()
        onContextMenu?.(e)
      }}
    />
  )
}
