import Image from "next/image"
import Link from "next/link"

import { Logo } from "@/components/layouts/logo"
import { CopyrightYear } from "@/components/layouts/copyright-year"
import { Button } from "@/components/ui/button"
import type { SocialLink } from "@/config/socials"
import { footerLinks } from "@/config/navigation"
import { Container } from "@/components/layouts/container"
import { HashLink } from "@/components/ui/hash-link"
import { APP_VERSION } from "@/config/version"

type FooterProps = {
  siteTitle: string
  socialLinks: SocialLink[]
}

/**
 * Site-wide footer rendered by the root layout.
 *
 * Structure:
 * - Top row: {@link Logo} (links home) + social icon buttons from the
 *   `socialLinks` prop (sourced from Sanity siteConfig, with fallback to
 *   `config/socials.ts`).
 * - Nav row: footer links from `config/navigation.ts`. Links with
 *   `isLive: false` render as disabled `<span>` elements with a "soon" badge.
 *   Hash links use {@link HashLink}; page links use `<Link prefetch={false}>`.
 * - Bottom bar: copyright year range via {@link CopyrightYear}, package
 *   version (from `config/version.ts`) linking to
 *   latest GitHub release, and a
 *   "Built by Kunal" credit with GitHub avatar.
 */
export function Footer({ siteTitle, socialLinks }: FooterProps) {
  return (
    <footer>
      <Container>
        <div className="flex flex-col gap-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <Logo size="sm" text={siteTitle} />
            </Link>
            <div className="flex items-center">
              {socialLinks.map(({ href, label, icon }) => (
                <Button asChild key={label} size="icon-sm" variant="ghost">
                  <a aria-label={label} href={href}>
                    {icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <nav>
            <ul className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground md:gap-6">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  {link.isLive ? (
                    link.href.startsWith("/#") || link.href.startsWith("#") ? (
                      <HashLink
                        className="hover:text-foreground"
                        href={link.href}
                      >
                        {link.label}
                      </HashLink>
                    ) : (
                      <Link
                        className="hover:text-foreground"
                        href={link.href}
                        prefetch={false}
                      >
                        {link.label}
                      </Link>
                    )
                  ) : (
                    <span
                      aria-disabled="true"
                      className="inline-flex cursor-not-allowed items-center gap-1.5 opacity-50"
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium"
                      >
                        soon
                      </span>
                      <span className="sr-only">(coming soon)</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center justify-between gap-4 border-t py-4 text-sm text-muted-foreground">
          <p>
            &copy; <CopyrightYear /> {siteTitle}{" "}
            <span aria-hidden="true">•</span>{" "}
            <Link
              className="text-muted-foreground hover:text-foreground hover:underline"
              href="https://github.com/kunalkeshan/kumar-srivathsan/releases/latest"
              prefetch={false}
              rel="noopener noreferrer"
              target="_blank"
            >
              v{APP_VERSION}
            </Link>
          </p>

          <p className="inline-flex items-center gap-1">
            <span>Built by</span>
            <a
              aria-label="x/twitter"
              className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground hover:underline"
              href={"https://kunalkeshan.dev"}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="kunal"
                className="size-4 rounded-full"
                height={16}
                src="https://github.com/kunalkeshan.png"
                width={16}
              />
              Kunal
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
