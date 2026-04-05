import type { StructureResolver } from "sanity/structure"

const SINGLETONS = ["siteConfig", "routesConfig"]

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Kumar Srivathsan")
    .items([
      S.listItem()
        .title("Site Configuration")
        .child(
          S.document().schemaType("siteConfig").documentId("siteConfig")
        ),
      S.listItem()
        .title("Routes Configuration")
        .child(S.documentTypeList("routesConfig").title("Routes Configuration")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId()!)
      ),
    ])
