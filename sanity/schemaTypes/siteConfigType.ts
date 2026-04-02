import { CogIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"

export const siteConfigType = defineType({
  name: "siteConfig",
  title: "Site Configuration",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "basic", title: "Basic", default: true },
    { name: "seo", title: "SEO & OG" },
    { name: "social", title: "Social & Contact" },
    { name: "media", title: "Media" },
  ],
  fields: [
    // Basic
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      group: "basic",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      group: "basic",
      validation: (rule) => rule.required(),
    }),

    // SEO & OG
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "twitterImage",
      title: "Twitter Card Image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // Social & Contact
    defineField({
      name: "socialMedia",
      title: "Social & Contact Links",
      type: "array",
      group: "social",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Instagram", value: "instagram" },
                  { title: "WhatsApp", value: "whatsapp" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Phone", value: "phone" },
                  { title: "Email", value: "email" },
                ],
                layout: "dropdown",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL / href",
              type: "url",
              validation: (rule) =>
                rule.required().uri({
                  scheme: ["http", "https", "mailto", "tel"],
                }),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "contactText",
              title: "Contact Display Text",
              description:
                "Optional text shown in the Contact section grid (e.g. phone number, email address)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "platform" },
          },
        }),
      ],
    }),

    // Media
    defineField({
      name: "heroVideoUrl",
      title: "Hero Video URL",
      type: "url",
      group: "media",
      description: "CDN URL for the hero section background video",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title ?? "Site Configuration" }
    },
  },
})
