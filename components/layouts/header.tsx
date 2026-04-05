import Link from "next/link"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/layouts/logo"
import { Button } from "@/components/ui/button"
import { HeaderMenu } from "@/components/layouts/header-menu"
import { HashLink } from "@/components/ui/hash-link"
import type { SocialLink } from "@/config/socials"

type HeaderProps = {
  siteTitle: string
  socialLinks: SocialLink[]
}

/**
 * Site-wide sticky header rendered by the root layout.
 *
 * Floats 16px from the top of the viewport (`top-4`) with a blurred
 * background and pill shape. Contains the {@link Logo}, a "Contact" CTA
 * button that scrolls to the `#contact` section, and the {@link HeaderMenu}
 * popover for navigation and social links.
 *
 * `siteTitle` and `socialLinks` are fetched server-side in the site layout
 * and passed as props so that this component has no direct Sanity dependency.
 */
export function Header({ siteTitle, socialLinks }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-4 z-50 mx-auto flex h-14 w-[92svw] items-center justify-between rounded-full border bg-background/95 px-2 shadow-sm backdrop-blur-sm squircle supports-backdrop-filter:bg-background/50",
        "md:max-w-3xl"
      )}
    >
      <Link
        className="flex h-10 cursor-pointer items-center justify-center rounded-full px-3 squircle hover:bg-accent"
        href="/"
        prefetch={false}
      >
        <Logo size="sm" text={siteTitle} priority />
      </Link>

      <div className="flex items-center gap-2">
        <Button size="lg" variant="outline" asChild>
          <HashLink href="/#contact">Contact</HashLink>
        </Button>
        <HeaderMenu socialLinks={socialLinks} />
      </div>
    </header>
  )
}
