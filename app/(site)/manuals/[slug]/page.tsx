import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ManualArticle } from "@/components/manuals/manual-article"
import { ManualCard } from "@/components/manuals/manual-card"
import { Container } from "@/components/layouts/container"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { getManualBySlug } from "@/sanity/queries/manual"
import { urlFor } from "@/sanity/lib/image"

/** Next.js 15+ passes `params` as a `Promise` for async server pages. */
type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const manual = await getManualBySlug(slug)
  if (!manual?.title) {
    return { title: "Manual" }
  }

  const description = manual.summary?.trim() || undefined
  const ogUrl =
    manual.thumbnail?.asset != null
      ? urlFor(manual.thumbnail).width(1200).height(630).url()
      : undefined
  const ogAlt = manual.thumbnail?.alt ?? undefined

  return {
    title: manual.title,
    description,
    alternates: {
      canonical: `/manuals/${slug}`,
    },
    openGraph: {
      url: `/manuals/${slug}`,
      ...(manual.title && { title: manual.title }),
      ...(description && { description }),
      ...(ogUrl && { images: [{ url: ogUrl, alt: ogAlt }] }),
    },
    twitter: {
      ...(manual.title && { title: manual.title }),
      ...(description && { description }),
      ...(ogUrl && { images: [ogUrl] }),
    },
  }
}

export default async function ManualDetailPage({ params }: PageProps) {
  const { slug } = await params
  const manual = await getManualBySlug(slug)

  if (!manual?.slug?.current) {
    notFound()
  }

  const related =
    manual.relatedManuals?.filter((r) => r.slug?.current) ?? []

  return (
    <>
      <ScrollProgress />
      <main className="pb-24 pt-10">
        <ManualArticle manual={manual} />
        {related.length > 0 ? (
          <Container className="mt-16 max-w-5xl border-t pt-12">
            <h2 className="font-serif text-2xl font-semibold tracking-tight md:text-3xl">
              Related manuals
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              More entries you might find useful.
            </p>
            <div className="mt-8 grid gap-0 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ManualCard key={item._id} manual={item} />
              ))}
            </div>
          </Container>
        ) : null}
      </main>
    </>
  )
}
