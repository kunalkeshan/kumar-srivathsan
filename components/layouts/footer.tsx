import { Logo } from "@/components/layouts/logo"
import { CopyrightYear } from "@/components/layouts/copyright-year"
import { Button } from "@/components/ui/button"
import { socialLinks } from "@/config/socials"
import { footerLinks } from "@/config/navigation"

export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl *:px-4 *:md:px-6">
      <div className="flex flex-col gap-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
          </div>
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
                <a className="hover:text-foreground" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-between gap-4 border-t py-4 text-sm text-muted-foreground">
        <p>
          &copy; <CopyrightYear /> Kumar Srivathsan
        </p>

        <p className="inline-flex items-center gap-1">
          <span>Built by</span>
          <a
            aria-label="x/twitter"
            className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground hover:underline"
            href={"https://x.com/_kunalkeshan_"}
            rel="noreferrer"
            target="_blank"
          >
            <img
              alt="kunal"
              className="size-4 rounded-full"
              height="auto"
              src="https://github.com/kunalkeshan.png"
              width="auto"
            />
            Kunal
          </a>
        </p>
      </div>
    </footer>
  )
}
