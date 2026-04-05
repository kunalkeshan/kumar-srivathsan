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
      description:
        "The site's display name. Used as the default <title> tag, the title template ('%s | <title>') for all pages, the Logo text in the Header and Footer, and the copyright line in the Footer. Required — the site will not render without it.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      group: "basic",
      description:
        "One or two sentences describing the site. Used as the <meta name=\"description\"> tag and in the OpenGraph / Twitter Card description fields. Keep it under 160 characters for optimal SEO display.",
      validation: (rule) => rule.required(),
    }),

    // SEO & OG
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      group: "seo",
      description:
        "Image shown when the site is shared on Facebook, LinkedIn, WhatsApp, and other platforms that read OpenGraph tags. Recommended size: 1200 × 630 px. The image is served via Sanity CDN and transformed to 1200 × 630 automatically.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description:
            "Describes the image for screen readers and is used as the og:image:alt meta tag. Keep it concise (e.g. 'Kumar Srivathsan — Navigation Officer').",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "twitterImage",
      title: "Twitter / X Card Image",
      type: "image",
      group: "seo",
      description:
        "Image shown when the site is shared on Twitter / X (summary_large_image card). Recommended size: 1200 × 600 px. If omitted, no twitter:image tag is emitted. The image is served via Sanity CDN and transformed to 1200 × 600 automatically.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description:
            "Describes the image for screen readers and the twitter:image:alt meta tag.",
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
      description:
        "All social and contact links for the site. These drive the icon rows in the Header menu and Footer, and the entries in the Contact section grid. Order here controls display order.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              description:
                "Determines which icon is shown next to the link. Choose 'Phone' for phone numbers and 'Email' for email addresses — the site handles these specially (see URL field below).",
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
              description:
                "The link destination. Format by platform: LinkedIn/Instagram/Facebook/WhatsApp → full https:// URL. Phone → tel: URI, e.g. tel:+917358338788 (the site strips 'tel:' to display the number). Email → mailto: URI, e.g. mailto:you@example.com (the site strips 'mailto:' to display the address). tel: and mailto: links do NOT open in a new tab.",
              validation: (rule) =>
                rule.required().uri({
                  scheme: ["http", "https", "mailto", "tel"],
                }),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description:
                "Accessible name for the icon button (used as aria-label). For social platforms use the platform name (e.g. 'LinkedIn'). For phone/email entries this becomes the subtitle in the Contact section grid (e.g. 'Personal', 'Primary').",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "contactText",
              title: "Contact Section Title",
              type: "string",
              description:
                "When set, this entry appears in the Contact section grid with this string as its tile heading (e.g. 'Connect on LinkedIn', 'Message on WhatsApp'). Leave blank to show the link only in the Header and Footer icon rows. Not used for phone or email entries — those always appear in the Contact section.",
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
      description:
        "Full URL of the background video shown in the Hero section (e.g. https://cdn.example.com/hero.mp4). Must be a publicly accessible video file. If left empty, the Hero falls back to static background images (canvas.webp on mobile, hero.webp on desktop).",
    }),
    defineField({
      name: "showRouteArcs",
      title: "Show Shipping Route Arcs on Globe",
      type: "boolean",
      group: "media",
      description:
        "When enabled, shipping route arcs are drawn between ports on the interactive globe in the Destinations section. Off by default to reduce visual clutter. Requires routes to be configured in the Routes Configuration document.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title ?? "Site Configuration" }
    },
  },
})
