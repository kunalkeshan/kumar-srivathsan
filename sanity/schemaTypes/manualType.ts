import { DocumentTextIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"
import type { Reference } from "sanity"

export const manualType = defineType({
  name: "manual",
  title: "Manual",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "Display title for the manual. Used as the page h1 and as the source for the URL slug.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "URL segment under /manuals/. Generated from the title; override only if needed.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      description:
        "Short teaser for cards and listings on the homepage and /manuals index.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      description:
        "Image for cards and listings. Separate from images embedded in the body.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describes the thumbnail for screen readers.",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Author name shown with the manual.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      description:
        "Full instructional content: headings, lists, inline images, and links.",
    }),
    defineField({
      name: "relatedManuals",
      title: "Related Manuals",
      type: "array",
      description: "Links to other manuals for cross-reference.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "manual" }],
        }),
      ],
      validation: (rule) =>
        rule.custom((refs: unknown, context) => {
          const rawId = context.document?._id
          if (!rawId || !refs || !Array.isArray(refs)) return true
          const id = rawId.replace(/^drafts\./, "")
          const selfRef = refs.some((r) => {
            const ref = r as Reference
            return ref._ref === id || ref._ref === `drafts.${id}`
          })
          return selfRef ? "A manual cannot reference itself." : true
        }),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "author" },
  },
})
