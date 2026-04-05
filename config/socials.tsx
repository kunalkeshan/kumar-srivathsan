/**
 * Centralised contact and social media link configuration.
 *
 * Exports three typed arrays consumed by the Header, Footer, and Contact
 * section components:
 * - {@link phoneLinks}  — phone numbers (rendered in the Contact section)
 * - {@link emailLinks}  — email addresses (rendered in the Contact section)
 * - {@link socialLinks} — social/messaging platforms (rendered in Header menu,
 *   Footer, and Contact section)
 *
 * Social links with a `contactText` field are included in the Contact section
 * grid. Those with `external: false` open in the same tab (used for `tel:` and
 * `mailto:` links embedded in `socialLinks`).
 *
 * Also exports {@link PLATFORM_ICONS} — a centralized platform → icon mapping
 * used by {@link mapSanityMediaToSocialLinks} and
 * {@link mapSanityMediaToContactEntries} to keep icons consistent across
 * Header, Footer, and Contact when rendering Sanity-sourced data.
 *
 * Add new contact methods here — never hardcode them in component files.
 */
import { ReactNode } from "react"
import type { SITE_CONFIG_QUERY_RESULT } from "@/types/cms"
import { LinkedInIcon } from "@/components/icons/linkedin"
import { InstagramIcon } from "@/components/icons/instagram"
import { WhatsAppIcon } from "@/components/icons/whatsapp"
import { FacebookIcon } from "@/components/icons/facebook"
import { MailIcon, PhoneIcon } from "lucide-react"

/** A phone contact entry rendered in the Contact section. */
export type PhoneLink = {
  /** Short label identifying this number (e.g. `"Primary"`). */
  label: string
  /** Formatted phone number string shown in the UI (e.g. `"+91 7358338788"`). */
  phone: string
  /** `tel:` URI used as the anchor `href`. */
  href: string
}

/** An email contact entry rendered in the Contact section. */
export type EmailLink = {
  /** Short label identifying this address (e.g. `"Personal"`). */
  label: string
  /** Email address string shown in the UI. */
  email: string
  /** `mailto:` URI used as the anchor `href`. */
  href: string
}

/** A social / messaging platform link used in the Header menu, Footer, and Contact section. */
export type SocialLink = {
  /** Platform name used as the accessible `aria-label` (e.g. `"LinkedIn"`). */
  label: string
  /** Link destination — external URL, `tel:` URI, or `mailto:` URI. */
  href: string
  /** Platform icon rendered as a React node (SVG component or Lucide icon). */
  icon: ReactNode
  /**
   * When set, the link is included in the Contact section grid and this
   * string is used as the entry's title (e.g. `"Connect on LinkedIn"`).
   */
  contactText?: string
  /**
   * Controls whether the link opens in a new tab.
   * Defaults to `true` for external URLs. Set to `false` for `tel:` / `mailto:`
   * links that should open in the same context.
   */
  external?: boolean
}

export const phoneLinks: PhoneLink[] = [
  { label: "Primary", phone: "+91 7358338788", href: "tel:+917358338788" },
]

export const emailLinks: EmailLink[] = [
  {
    label: "Personal",
    email: "kumarsrivathsan02@gmail.com",
    href: "mailto:kumarsrivathsan02@gmail.com",
  },
]

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kumar-srivathsan-251003377/",
    icon: <LinkedInIcon />,
    contactText: "Connect on LinkedIn",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kumar_srivat",
    icon: <InstagramIcon />,
    contactText: "DM on Instagram",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/917358338799",
    icon: <WhatsAppIcon />,
    contactText: "Message on WhatsApp",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/kumar.srivat",
    icon: <FacebookIcon />,
    contactText: "Follow on Facebook",
  },
  {
    label: "Phone",
    href: phoneLinks[0].href,
    icon: <PhoneIcon />,
    external: false,
  },
  {
    label: "Email",
    href: emailLinks[0].href,
    icon: <MailIcon />,
    external: false,
  },
]

/**
 * Centralised platform → icon mapping.
 *
 * Used by {@link mapSanityMediaToSocialLinks} and
 * {@link mapSanityMediaToContactEntries} so that both Header and Footer always
 * render the same icon for a given platform, regardless of whether the data
 * comes from Sanity or the static fallback arrays.
 */
export const PLATFORM_ICONS: Record<string, ReactNode> = {
  linkedin: <LinkedInIcon />,
  instagram: <InstagramIcon />,
  whatsapp: <WhatsAppIcon />,
  facebook: <FacebookIcon />,
  phone: <PhoneIcon />,
  email: <MailIcon />,
}

type SanityMediaArray = NonNullable<SITE_CONFIG_QUERY_RESULT>["socialMedia"]
type SanityMediaItem = NonNullable<SanityMediaArray>[number]

/**
 * Maps a Sanity `socialMedia` array to the {@link SocialLink} shape used by
 * Header (HeaderMenu) and Footer social icon rows.
 *
 * Falls back to the hardcoded {@link socialLinks} when the Sanity array is
 * null or empty (e.g. siteConfig not yet published).
 */
export function mapSanityMediaToSocialLinks(
  socialMedia: SanityMediaArray
): SocialLink[] {
  if (!socialMedia || !socialMedia.length) return []
  return socialMedia
    .filter(
      (item: SanityMediaItem): item is SanityMediaItem =>
        !!item?.url && !!item?.label
    )
    .map((item: SanityMediaItem) => ({
      label: item.label!,
      href: item.url!,
      icon: item.platform ? (PLATFORM_ICONS[item.platform] ?? null) : null,
      external: true,
      contactText: item.contactText ?? undefined,
    }))
}

/** A single entry in the Contact section grid. */
export type ContactEntry = {
  title: string
  value: string
  href: string
  icon: ReactNode
}

/**
 * Maps a Sanity `socialMedia` array to the contact grid entries rendered by
 * the Contact section.
 *
 * - `phone` and `email` platform entries always appear; their display value is
 *   extracted from the URL by stripping the `tel:` / `mailto:` prefix.
 * - All other entries appear only when `contactText` is set; `contactText`
 *   becomes the grid tile title and `label` becomes the subtitle value.
 *
 * Falls back to the static {@link phoneLinks}, {@link emailLinks}, and
 * {@link socialLinks} data when the Sanity array is null or empty.
 */
export function mapSanityMediaToContactEntries(
  socialMedia: SanityMediaArray
): ContactEntry[] {
  if (!socialMedia || !socialMedia.length) return []

  return socialMedia
    .map((item: SanityMediaItem): ContactEntry | null => {
      if (!item?.url || !item?.label) return null
      if (item.platform === "phone") {
        return {
          title: item.label,
          value: item.url.replace("tel:", ""),
          href: item.url,
          icon: PLATFORM_ICONS.phone,
        }
      }
      if (item.platform === "email") {
        return {
          title: item.label,
          value: item.url.replace("mailto:", ""),
          href: item.url,
          icon: PLATFORM_ICONS.email,
        }
      }
      if (item.contactText) {
        return {
          title: item.contactText,
          value: item.label,
          href: item.url,
          icon: item.platform ? (PLATFORM_ICONS[item.platform] ?? null) : null,
        }
      }
      return null
    })
    .filter((entry: ContactEntry | null): entry is ContactEntry => entry !== null)
}
