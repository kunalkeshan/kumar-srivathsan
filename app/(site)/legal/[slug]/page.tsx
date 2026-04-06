import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CalendarDays } from "lucide-react"

import { LegalPortableText } from "@/components/legal/legal-portable-text"
import { Container } from "@/components/layouts/container"
import {
  getLegalBySlug,
  getLegalDocuments,
} from "@/sanity/queries/legal"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const docs = await getLegalDocuments()
  return docs
    .filter((d) => d.slug?.current)
    .map((d) => ({ slug: d.slug!.current! }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = await getLegalBySlug(slug)
  if (!doc?.title) {
    return { title: "Legal" }
  }

  const description = doc.description?.trim() || undefined

  return {
    title: doc.title,
    description,
    alternates: {
      canonical: `/legal/${slug}`,
    },
    openGraph: {
      url: `/legal/${slug}`,
      ...(doc.title && { title: doc.title }),
      ...(description && { description }),
    },
    twitter: {
      ...(doc.title && { title: doc.title }),
      ...(description && { description }),
    },
  }
}

export default async function LegalDocumentPage({ params }: PageProps) {
  const { slug } = await params
  const doc = await getLegalBySlug(slug)

  if (!doc?.slug?.current) {
    notFound()
  }

  const formattedDate = doc._updatedAt
    ? new Date(doc._updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <main className="pb-24 pt-10">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold text-primary">Legal</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
          {doc.title}
        </h1>

        {doc.description ? (
          <p className="mt-4 text-lg text-muted-foreground">{doc.description}</p>
        ) : null}

        {formattedDate ? (
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays aria-hidden className="size-4" />
            <span className="font-mono">Last updated: {formattedDate}</span>
          </div>
        ) : null}

        <LegalPortableText value={doc.content} />
      </Container>
    </main>
  )
}
