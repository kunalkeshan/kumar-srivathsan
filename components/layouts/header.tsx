import Link from "next/link"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/layouts/logo"
import { Button } from "@/components/ui/button"
import { HeaderMenu } from "@/components/layouts/header-menu"
import { HashLink } from "@/components/ui/hash-link"

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-4 z-50 mx-auto flex h-14 w-[92svw] items-center justify-between rounded-full squircle border bg-background/95 px-2 shadow-sm backdrop-blur-sm supports-backdrop-filter:bg-background/50",
        "md:max-w-3xl"
      )}
    >
      <Link
        className="flex h-10 cursor-pointer items-center justify-center rounded-full squircle px-3 hover:bg-accent"
        href="/"
        prefetch={false}
      >
        <Logo size="sm" />
        <span className="sr-only">Efferd Logo</span>
      </Link>

      <div className="flex items-center gap-2">
        <Button size="lg" variant="outline" asChild>
          <HashLink href="/#contact">Contact</HashLink>
        </Button>
        <HeaderMenu />
      </div>
    </header>
  )
}
