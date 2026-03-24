import { Phone, Mail, Rocket } from "lucide-react"

import { cn } from "@/lib/utils"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { Container } from "@/components/layouts/container"
import { phoneLinks, emailLinks, socialLinks } from "@/config/socials"

const phones = phoneLinks.map((p) => ({
  title: p.label,
  value: p.phone,
  href: p.href,
  icon: <Phone />,
}))

const emails = emailLinks.map((e) => ({
  title: e.label,
  value: e.email,
  href: e.href,
  icon: <Mail />,
}))

const socials = socialLinks
  .filter((s) => s.contactText)
  .map((s) => ({
    title: s.contactText!,
    value: s.label,
    href: s.href,
    icon: s.icon,
  }))

const data = [...phones, ...emails, ...socials]

export function Contact() {
  return (
    <section id="contact" className="py-12">
      <Container>
        <h2 className="mb-6 text-lg font-medium md:text-2xl">
          Have Questions? Get in Touch!
        </h2>
        <div className="relative">
          <FullWidthDivider position="top" />
          <div className="grid gap-px overflow-hidden bg-border px-px md:grid-cols-3">
            {data.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group flex items-center gap-3 bg-background p-2 shadow-xs transition-colors hover:bg-muted/20"
              >
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted/50 transition-colors group-hover:bg-background",
                    "[&_svg]:size-4 [&_svg]:text-muted-foreground [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-in-out group-hover:[&_svg]:scale-110"
                  )}
                >
                  {item.icon}
                </div>
                <div className="flex flex-col gap-y-0.5">
                  <p className="text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.value}</p>
                </div>
              </a>
            ))}
            <a
              href="https://nebulapages.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group col-span-full flex items-center gap-3 bg-background p-2 shadow-xs transition-colors hover:bg-muted/20"
            >
              <div
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted/50 transition-colors group-hover:bg-background",
                  "[&_svg]:size-4 [&_svg]:text-muted-foreground [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-in-out group-hover:[&_svg]:scale-110"
                )}
              >
                <Rocket />
              </div>
              <div className="flex flex-col gap-y-0.5">
                <p className="text-sm">My Associations</p>
                <p className="text-xs text-muted-foreground">
                  Nebula Pages &middot; From launch to orbit, we build for every
                  scale.
                </p>
              </div>
            </a>
          </div>
          <FullWidthDivider position="bottom" />
        </div>
      </Container>
    </section>
  )
}
