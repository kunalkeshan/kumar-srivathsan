import type { Metadata } from "next"

import { LegalIndex } from "@/components/legal/legal-index"
import { getLegalDocuments } from "@/sanity/queries/legal"

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Policies and legal documents for this website, including terms and privacy.",
  alternates: {
    canonical: "/legal",
  },
}

export default async function LegalIndexPage() {
  const documents = await getLegalDocuments()

  return (
    <main className="pb-16 pt-8">
      <LegalIndex documents={documents} />
    </main>
  )
}
