import { LinkIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"

export const routesConfigType = defineType({
  name: "routesConfig",
  title: "Routes Configuration",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "routes",
      title: "Shipping Routes",
      type: "array",
      description:
        "All shipping routes drawn as arcs on the interactive globe. Each route connects two ports via Sanity references.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "from",
              title: "From (departure port)",
              type: "reference",
              to: [{ type: "destination" }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "to",
              title: "To (arrival port)",
              type: "reference",
              to: [{ type: "destination" }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "shipIconId",
              title: "Ship Icon ID",
              type: "string",
              description:
                "CSS anchor ID used to position a ⛴️ emoji at this arc's midpoint on the globe. Only set on long-haul cross-ocean routes (e.g. jp-sea, sea-au). Leave blank for short/regional arcs.",
            }),
          ],
          preview: {
            select: {
              title: "from.name",
              subtitle: "to.name",
            },
            prepare({ title, subtitle }) {
              return {
                title: title ? `${title} → ${subtitle ?? "?"}` : "Route",
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Routes Configuration" }
    },
  },
})
