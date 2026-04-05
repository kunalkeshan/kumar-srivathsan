import { EarthGlobeIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const destinationType = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "code",
      title: "Port Code",
      type: "string",
      description:
        "3–4 letter shortcode shown on the globe label (e.g. SGP for Singapore). Used as the collapsed label on the interactive globe.",
      validation: (rule) => rule.required().max(4),
    }),
    defineField({
      name: "name",
      title: "Port Name",
      type: "string",
      description:
        "Full port name shown when a globe label is expanded (e.g. Singapore).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
      description: "WGS 84 latitude in decimal degrees (e.g. 1.25937).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      description: "WGS 84 longitude in decimal degrees (e.g. 103.7544).",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "code" },
  },
})
