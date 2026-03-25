import Link from "next/link"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/layouts/logo"
import { Button } from "@/components/ui/button"
import { HeaderMenu } from "@/components/layouts/header-menu"

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-4 z-50 mx-auto flex h-14 w-[92svw] items-center justify-between rounded-full border bg-background/95 px-2 shadow-sm backdrop-blur-sm supports-backdrop-filter:bg-background/50",
        "md:max-w-3xl"
      )}
      style={{
        // @ts-expect-error cornerShape is a non-standard style prop
        cornerShape: "squircle",
      }}
    >
      <a
        className="flex h-10 cursor-pointer items-center justify-center rounded-full px-3 hover:bg-accent"
        href="#"
        style={{
          // @ts-expect-error cornerShape is a non-standard style prop
          cornerShape: "squircle",
        }}
      >
        <Logo size="sm" />
        <span className="sr-only">Efferd Logo</span>
      </a>

      <div className="flex items-center gap-2">
        <Button
          className="rounded-full"
          size="lg"
          style={{
            // @ts-expect-error cornerShape is a non-standard style prop
            cornerShape: "squircle",
          }}
          variant="outline"
          asChild
        >
          <Link href="/#contact" prefetch={false}>Contact</Link>
        </Button>
        <HeaderMenu />
      </div>
    </header>
  )
}
