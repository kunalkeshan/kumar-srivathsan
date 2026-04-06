"use client"

import { CmsPortableText } from "@/components/cms/cms-portable-text"
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

  return <CmsPortableText className={className} value={value} />
}
