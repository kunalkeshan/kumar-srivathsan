/**
 * Centralised navigation link configuration.
 *
 * Three arrays are exported for use across the app:
 * - {@link commonLinks} — the shared set used by both the header and footer
 * - {@link navLinks}    — header navigation (currently identical to commonLinks)
 * - {@link footerLinks} — footer navigation (commonLinks + Contact, Privacy, Terms)
 *
 * Links with `isLive: false` render as disabled UI elements with a "soon" badge.
 * Update `isLive` to `true` and set a real `href` when the page/section is ready.
 *
 * Add new nav items here — never hardcode them directly in Header or Footer.
 */
import { ReactNode } from "react"
import {
  AnchorIcon,
  BookOpenIcon,
  InfoIcon,
  SparklesIcon,
} from "lucide-react"

/** Shape of a single navigation link entry. */
export type NavLink = {
  /** Display text shown in the nav. */
  label: string
  /** Target URL. Use `"#"` as a placeholder for pages not yet live. */
  href: string
  /**
   * When `false`, the link is rendered as a disabled element with a "soon"
   * badge instead of a clickable anchor.
   */
  isLive: boolean
  /** Optional icon rendered to the left of the label in the header menu. */
  icon?: ReactNode
}

/** Links shared by both header and footer navigation. */
export const commonLinks: NavLink[] = [
  { label: "About", href: "/#about", isLive: true, icon: <InfoIcon /> },
  {
    label: "Destinations",
    href: "/#destinations",
    isLive: true,
    icon: <AnchorIcon />,
  },
  { label: "Services", href: "#", isLive: false, icon: <SparklesIcon /> },
  {
    label: "Manuals",
    href: "/manuals",
    isLive: true,
    icon: <BookOpenIcon />,
  },
]

/** Header navigation links — currently identical to {@link commonLinks}. */
export const navLinks: NavLink[] = [...commonLinks]

/** Footer navigation links — {@link commonLinks} plus Contact, Privacy, and Terms. */
export const footerLinks: NavLink[] = [
  ...commonLinks,
  { label: "Contact", href: "/#contact", isLive: true },
  { label: "Privacy", href: "#", isLive: false },
  { label: "Terms", href: "#", isLive: false },
]
