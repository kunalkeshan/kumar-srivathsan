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
 * Add new contact methods here — never hardcode them in component files.
 */
import { ReactNode } from "react"
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
