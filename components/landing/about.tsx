import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layouts/container"
import { cn } from "@/lib/utils"

const stats = [
  { value: "8+", label: "Years at Sea" },
  { value: "10+", label: "Vessels Served" },
  { value: "30+", label: "Ports Visited" },
  { value: "5+", label: "Certifications" },
]

export function About() {
  return (
    <section id="about" className="py-24">
      <Container className="flex w-full flex-col items-start justify-start gap-10 lg:gap-12">
        {/* Header row */}
        <div className="mx-auto flex w-full flex-col items-center justify-start gap-4 sm:max-w-lg lg:max-w-full lg:flex-row lg:items-center lg:gap-7">
          <div className="inline-flex w-full flex-col items-center justify-start gap-3 lg:items-start">
            <h2 className="text-center font-sans text-4xl leading-normal font-bold text-foreground lg:text-start">
              About
            </h2>
            <p className="w-full text-center text-lg leading-relaxed font-normal text-muted-foreground lg:max-w-3xl lg:text-start">
              Kumar Srivathsan is a dedicated navigation officer committed to
              maritime excellence — charting safe passages, upholding
              international standards, and carrying a proud seafaring legacy
              across every ocean.
            </p>
          </div>

          <Button
            asChild
            className="w-full whitespace-nowrap sm:w-fit"
            size="default"
            variant="default"
          >
            <a href="#">
              <span className="px-2 py-px">Let&apos;s Talk</span>
              <ArrowRight className="size-5" />
            </a>
          </Button>
        </div>

        {/* Cards grid */}
        <div className="mx-auto grid w-full grid-cols-1 gap-y-6 sm:max-w-lg lg:max-w-full lg:grid-cols-12 lg:gap-x-4 lg:gap-y-0 xl:gap-8">
          {/* Left card — Family Legacy */}
          <div
            className={cn(
              "col-span-12 inline-flex w-full flex-col items-start justify-start gap-5 rounded-2xl border border-border p-5",
              "shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]",
              "transition-all duration-700 ease-in-out hover:border-foreground/40",
              "lg:col-span-3 lg:p-3 xl:col-span-4 xl:p-5"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://pagedone.io/asset/uploads/1724131218.png"
              alt="Maritime family legacy"
              className="h-auto w-full rounded-xl object-cover"
            />
            <div className="flex w-full flex-col items-start justify-start gap-8">
              <div className="flex w-full flex-col items-start justify-start gap-1.5">
                <h3 className="font-sans text-2xl leading-9 font-semibold text-foreground">
                  A Family Rooted in the Sea
                </h3>
                <p className="font-sans text-base leading-relaxed font-normal text-muted-foreground">
                  Maritime service runs deep in the Srivathsan family.
                  Kumar&apos;s father and brother are both merchant navy
                  officers — a lineage of seafarers who have collectively
                  crossed the world&apos;s great oceans and dedicated their
                  lives to the maritime profession.
                </p>
              </div>
              <p className="font-sans text-base leading-relaxed font-normal text-muted-foreground">
                Growing up surrounded by the discipline and pride of a naval
                household, Kumar was drawn to the sea early. The values
                instilled at home — precision, responsibility, and a respect for
                the ocean&apos;s power — continue to shape how he approaches
                every voyage.
              </p>
            </div>
          </div>

          {/* Right card — Kumar's Story
               Mobile:  flex-col (image → title/para → stats → safety)
               Desktop: 2-col grid
                 row 1: [image] [title + para]
                 row 2: [stats — col-span-2]
                 row 3: [safety para — col-span-2]
          */}
          <div
            className={cn(
              "col-span-12 flex w-full flex-col gap-6 rounded-2xl border border-border p-5",
              "shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]",
              "transition-all duration-700 ease-in-out hover:border-foreground/40",
              "lg:col-span-9 lg:grid lg:grid-cols-[auto_1fr] lg:gap-x-6 lg:gap-y-5 lg:p-3 xl:col-span-8 xl:p-5"
            )}
          >
            {/* Image — row 1 col 1 on desktop */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://pagedone.io/asset/uploads/1724131231.png"
              alt="Kumar Srivathsan, Navigation Officer"
              className="h-60 w-full rounded-xl object-cover lg:h-auto lg:w-72 lg:self-start"
            />

            {/* Title + first para — row 1 col 2 on desktop */}
            <div className="flex flex-col gap-2">
              <h3 className="font-sans text-2xl leading-9 font-semibold text-foreground">
                Charting His Own Course
              </h3>
              <p className="font-sans text-base leading-relaxed font-normal text-muted-foreground">
                With years of hands-on experience navigating commercial vessels
                across international waters, Kumar Srivathsan has built a
                reputation for meticulous route planning, bridge resource
                management, and unwavering adherence to STCW and SOLAS
                standards.
              </p>
            </div>

            {/* Stats — row 2, spans both columns on desktop */}
            <div className="grid grid-cols-2 gap-5 lg:col-span-2">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="inline-flex flex-col items-start justify-start gap-0.5 rounded-lg border border-border bg-background p-2.5"
                >
                  <span className="font-sans text-2xl leading-9 font-bold text-foreground">
                    {value}
                  </span>
                  <span className="font-sans text-base leading-relaxed font-normal text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Safety para — row 3, spans both columns on desktop */}
            <p className="font-sans text-base leading-relaxed font-normal text-muted-foreground lg:col-span-2">
              Safety is never an afterthought for Kumar — it is the foundation
              of every decision made on the bridge. From pre-departure planning
              to post-arrival reviews, his approach is systematic, collaborative,
              and always guided by international best practices.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
