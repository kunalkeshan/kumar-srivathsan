"use client"

import Image from "next/image"
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextProps,
} from "next-sanity"

import { CmsProse } from "@/components/cms-prose"
import {
  isExternalPortableTextHref,
  safePortableTextHref,
} from "@/lib/safe-portable-text-href"
import { urlFor } from "@/sanity/lib/image"
import { cn } from "@/lib/utils"

const cmsPortableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="font-serif tracking-tight text-pretty">{children}</h2>
    ),
  },
  types: {
    image: ({ value: img }) => {
      if (!img?.asset) return null
      const src = urlFor(img).width(1600).quality(80).url()
      return (
        <span className="my-6 block overflow-hidden rounded-surface squircle">
          <Image
            alt={img.alt ?? ""}
            className="h-auto w-full object-cover"
            height={900}
            sizes="(max-width: 768px) 100vw, 48rem"
            src={src}
            width={1600}
          />
        </span>
      )
    },
  },
  marks: {
    link: ({ children, value: mark }) => {
      const href = safePortableTextHref(mark?.href)
      const external = isExternalPortableTextHref(href)
      return (
        <a
          className="text-primary underline underline-offset-4 hover:text-primary/80"
          href={href}
          {...(external
            ? { rel: "noopener noreferrer", target: "_blank" }
            : {})}
        >
          {children}
        </a>
      )
    },
  },
}

type CmsPortableTextProps = {
  value: PortableTextProps["value"]
  className?: string
}

/**
 * Shared Portable Text renderer for Sanity `blockContent` (manuals, legal, etc.).
 */
export function CmsPortableText({ value, className }: CmsPortableTextProps) {
  if (value == null) return null
  const list = Array.isArray(value) ? value : [value]
  if (list.length === 0) return null

  return (
    <CmsProse className={cn("mt-10", className)}>
      <PortableText components={cmsPortableTextComponents} value={value} />
    </CmsProse>
  )
}
