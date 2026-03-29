import type { Metadata } from "next"
import { NotFoundPage } from "@/components/not-found-page"

/**
 * App Router global not-found UI.
 *
 * Next.js renders this file when no route matches, or when `notFound()` is
 * called from a Server Component / Route Handler. It is wrapped by the root
 * `app/layout.tsx` like any other segment.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you're looking for might have been moved or doesn't exist.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main>
      <NotFoundPage />
    </main>
  )
}
