import type { StructureResolver } from "sanity/structure"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Kumar Srivathsan")
    .items([
      S.listItem()
        .title("Site Configuration")
        .child(
          S.document().schemaType("siteConfig").documentId("siteConfig")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !["siteConfig"].includes(item.getId()!)
      ),
    ])
