import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
} from "@/components/ui/empty"
import { Container } from "@/components/layouts/container"
import { cn } from "@/lib/utils"
import { CompassIcon, HomeIcon } from "lucide-react"

/**
 * App-wide 404 UI (used by `app/not-found.tsx`), not tied to the home landing
 * page. Inspired by Efferd “not-found-2”: large masked display type, concise
 * supporting copy, and primary + outline actions.
 *
 * @see https://efferd.com/blocks/not-found#not-found-2
 */
export function NotFoundPage() {
  return (
    <div className="flex min-h-[min(40dvh,920px)] w-full items-center justify-center py-16 md:py-24">
      <Container>
        <Empty className="mx-auto max-w-xl border-none bg-transparent p-6 sm:p-10 md:p-12">
          <EmptyHeader className="max-w-none gap-4">
            <h1
              className={cn(
                "font-serif text-7xl font-extrabold tracking-tight sm:text-8xl md:text-9xl",
                /* Bottom fade on the oversized numerals (Efferd-style mask) */
                "mask-b-from-20% mask-b-to-80%"
              )}
            >
              404
            </h1>
            <EmptyDescription className="max-w-md text-base text-pretty text-foreground/80 sm:text-lg">
              The page you&apos;re looking for might have been moved or
              doesn&apos;t exist.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="max-w-none">
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href="/" prefetch={false}>
                  <HomeIcon data-icon="inline-start" />
                  Go Home
                </Link>
              </Button>

              {/* <Button asChild variant="outline">
                <Link href="/#destinations" prefetch={false}>
                  <CompassIcon data-icon="inline-start" />
                  Explore
                </Link>
              </Button> */}
            </div>
          </EmptyContent>
        </Empty>
      </Container>
    </div>
  )
}
