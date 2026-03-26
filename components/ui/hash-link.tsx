"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type HashLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string
}

export function HashLink({ href, onClick, prefetch, ...props }: HashLinkProps) {
  const router = useRouter()

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event)
    if (event.defaultPrevented) return

    const hashIndex = href.indexOf("#")
    if (hashIndex < 0) return

    const hash = href.slice(hashIndex + 1)
    if (!hash) return

    const target = document.getElementById(decodeURIComponent(hash))
    if (target) {
      event.preventDefault()
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.replaceState(null, "", `#${hash}`)
      return
    }

    if (href.startsWith("#")) {
      event.preventDefault()
      router.push(`/${href}`)
    }
  }

  return (
    <Link
      {...props}
      href={href}
      onClick={handleClick}
      prefetch={prefetch ?? false}
    />
  )
}
