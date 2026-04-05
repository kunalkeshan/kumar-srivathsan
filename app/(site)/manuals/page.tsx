import type { Metadata } from "next"

import { ManualsSection } from "@/components/manuals/manuals-section"
import { getManuals } from "@/sanity/queries/manual"

export const metadata: Metadata = {
  title: "Manuals",
  description:
    "Step-by-step guides, procedures, and notes from life on board and ashore.",
  alternates: {
    canonical: "/manuals",
  },
}

export default async function ManualsIndexPage() {
  const manuals = await getManuals()

  return (
    <main className="pb-16 pt-8">
      <ManualsSection
        description="Practical references, checklists, and experiences — newest first."
        headingIdSuffix="index-all"
        manuals={manuals}
        title="Manuals"
      />
    </main>
  )
}
