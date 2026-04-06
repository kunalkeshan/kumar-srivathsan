"use client"

import Image from "next/image"
import { PortableText, type PortableTextComponents } from "next-sanity"

import { CmsProse } from "@/components/cms-prose"
import { urlFor } from "@/sanity/lib/image"
import { cn } from "@/lib/utils"
import type { LEGAL_DOCUMENT_BY_SLUG_QUERY_RESULT } from "@/types/cms"

type LegalContent = NonNullable<
  NonNullable<LEGAL_DOCUMENT_BY_SLUG_QUERY_RESULT>["content"]
>

export function LegalPortableText({
  value,
  className,
}: {
  value: LegalContent | null | undefined
  className?: string
}) {
  if (!value?.length) return null

  const components: PortableTextComponents = {
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
        const href = mark?.href ?? "#"
        const external = href.startsWith("http")
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

  return (
    <CmsProse className={cn("mt-10", className)}>
      <PortableText components={components} value={value} />
    </CmsProse>
  )
}
