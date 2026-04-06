import type { StructureResolver } from "sanity/structure"

const SINGLETONS = ["siteConfig", "routesConfig"]
const EXPLICIT_TYPES = ["legal"]

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
      S.documentTypeListItem("legal").title("Legal"),
      ...S.documentTypeListItems().filter(
        (item) =>
          !SINGLETONS.includes(item.getId()!) &&
          !EXPLICIT_TYPES.includes(item.getId()!)
      ),
    ])
