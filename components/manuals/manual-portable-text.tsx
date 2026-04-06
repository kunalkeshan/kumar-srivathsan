"use client"

import { CmsPortableText } from "@/components/cms/cms-portable-text"
import type { MANUAL_BY_SLUG_QUERY_RESULT } from "@/types/cms"

type ManualBody = NonNullable<NonNullable<MANUAL_BY_SLUG_QUERY_RESULT>["body"]>

export function ManualPortableText({
  value,
  className,
}: {
  value: ManualBody | null | undefined
  className?: string
}) {
  if (!value?.length) return null

  return <CmsPortableText className={className} value={value} />
}
