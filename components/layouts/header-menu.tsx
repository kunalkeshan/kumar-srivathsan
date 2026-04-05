"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ArrowRightIcon } from "lucide-react"
import type { SocialLink } from "@/config/socials"
import { navLinks } from "@/config/navigation"
import { HashLink } from "@/components/ui/hash-link"

type HeaderMenuProps = {
  socialLinks: SocialLink[]
}

/**
 * Navigation popover triggered from the header.
 *
 * Renders a two-dot animated hamburger/close toggle button. When open,
 * displays a {@link Popover} with:
 * - A vertical nav list sourced from `config/navigation.ts`. Live links with
 *   a `#` in the URL use {@link HashLink}; other live links use `next/link`.
 *   `isLive: false` links render as disabled spans with a "soon" badge.
 * - A row of social icon buttons from the `socialLinks` prop (sourced from
 *   Sanity siteConfig). External links open in a new tab unless `external`
 *   is explicitly `false` (e.g. `tel:` / `mailto:` links).
 *
 * On mobile the popover spans 92svw; on desktop it uses a slightly wider min
 * width so labels like “Manuals” wrap cleanly above the social icon row.
 */
export function HeaderMenu({ socialLinks }: HeaderMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label="Toggle menu"
          className="gap-1.5 px-3"
          size="lg"
        >
          <span className="hidden w-10 text-start md:block">
            {open ? "Close" : "Menu"}
          </span>
          <div className="relative size-4 translate-y-px">
            <span
              className={cn(
                "absolute size-1 rounded-full bg-primary-foreground transition-all duration-200",
                open
                  ? "top-1.5 -left-px h-0.5 w-4 -rotate-45"
                  : "top-0.5 left-1.5"
              )}
            />
            <span
              className={cn(
                "absolute size-1 rounded-full bg-primary-foreground transition-all duration-200",
                open ? "top-1.5 -left-px h-0.5 w-4 rotate-45" : "top-2 left-1.5"
              )}
            />
          </div>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="-mr-2 w-[92svw] gap-0 overflow-hidden p-0 md:w-56 md:min-w-56"
        onCloseAutoFocus={(event) => event.preventDefault()}
        sideOffset={12}
      >
        <ul className="grid grid-cols-1 border-b bg-background p-2">
          {navLinks.map((item) => (
            <li className="w-full" key={item.label}>
              {item.isLive ? (
                item.href.includes("#") ? (
                  <HashLink
                    className="group flex w-full items-center justify-between rounded-md px-3 py-2 font-medium hover:bg-muted active:bg-muted dark:hover:bg-muted/50"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <div className="shrink-0 [&>svg]:size-4 [&>svg]:text-primary/80">
                        {item.icon}
                      </div>
                      <p className="text-left wrap-break-word md:text-sm">
                        {item.label}
                      </p>
                    </div>
                    <div className="relative ml-1 flex h-full w-4 shrink-0 items-center">
                      <ArrowRightIcon className="size-4 opacity-50 transition-all group-hover:translate-x-0 group-hover:opacity-50 md:-translate-x-2 md:opacity-0" />
                    </div>
                  </HashLink>
                ) : (
                  <Link
                    className="group flex w-full items-center justify-between rounded-md px-3 py-2 font-medium hover:bg-muted active:bg-muted dark:hover:bg-muted/50"
                    href={item.href}
                    onClick={() => setOpen(false)}
                    prefetch={false}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <div className="shrink-0 [&>svg]:size-4 [&>svg]:text-primary/80">
                        {item.icon}
                      </div>
                      <p className="text-left wrap-break-word md:text-sm">
                        {item.label}
                      </p>
                    </div>
                    <div className="relative ml-1 flex h-full w-4 shrink-0 items-center">
                      <ArrowRightIcon className="size-4 opacity-50 transition-all group-hover:translate-x-0 group-hover:opacity-50 md:-translate-x-2 md:opacity-0" />
                    </div>
                  </Link>
                )
              ) : (
                <span
                  aria-disabled="true"
                  className="flex w-full cursor-not-allowed items-center justify-between rounded-md px-3 py-2 font-medium opacity-50"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <div className="shrink-0 [&>svg]:size-4 [&>svg]:text-primary/80">
                      {item.icon}
                    </div>
                    <p className="text-left wrap-break-word md:text-sm">
                      {item.label}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium"
                  >
                    soon
                  </span>
                  <span className="sr-only">(coming soon)</span>
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 p-2">
          {socialLinks.map((item, index) => (
            <Button
              asChild
              className="[&>svg]:text-primary/80"
              key={`social-${item.label}-${index}`}
              onClick={() => setOpen(false)}
              size="icon-sm"
              variant="outline"
            >
              <a
                aria-label={item.label}
                href={item.href}
                {...(item.external !== false && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {item.icon}
              </a>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
