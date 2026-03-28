import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layouts/container"
import { HashLink } from "@/components/ui/hash-link"
import { cn } from "@/lib/utils"

const stats = [
  { value: "1+", label: "Years at Sea" },
  { value: "2+", label: "Vessel Categories" },
  { value: "30+", label: "Ports Visited" },
  { value: "12+", label: "Certifications" },
]

export function About() {
  return (
    <section id="about" className="py-12">
      <Container className="flex w-full flex-col items-start justify-start gap-10 lg:gap-12">
        {/* Header row */}
        <div className="mx-auto flex w-full flex-col items-center justify-start gap-4 sm:max-w-lg lg:max-w-full lg:flex-row lg:items-center lg:gap-7">
          <div className="inline-flex w-full flex-col items-start justify-start gap-3">
            <h2 className="w-full text-start font-serif text-4xl leading-normal font-bold text-foreground">
              About
            </h2>
            <p className="w-full text-start text-lg leading-relaxed font-normal text-muted-foreground lg:max-w-3xl">
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
            <HashLink href="/#contact">
              <span className="px-2 py-px">Let&apos;s Talk</span>
              <ArrowRight className="size-5" />
            </HashLink>
          </Button>
        </div>

        {/* Cards grid */}
        <div className="mx-auto grid w-full grid-cols-1 gap-y-6 sm:max-w-lg lg:max-w-full lg:grid-cols-12 lg:gap-x-4 lg:gap-y-0 xl:gap-8">
          {/* Left card — Family Legacy */}
          <div
            className={cn(
              "col-span-12 inline-flex w-full flex-col items-start justify-start gap-5 rounded-2xl squircle border border-border p-5",
              "shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]",
              "transition-all duration-700 ease-in-out hover:border-foreground/40",
              "lg:col-span-3 lg:p-3 xl:col-span-4 xl:p-5"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://pagedone.io/asset/uploads/1724131218.png"
              alt="Maritime family legacy"
              className="h-auto w-full rounded-xl squircle object-cover"
              width={600}
              height={400}
              loading="lazy"
              decoding="async"
            />
            <div className="flex w-full flex-col items-start justify-start gap-8">
              <div className="flex w-full flex-col items-start justify-start gap-1.5">
                <h3 className="font-serif text-2xl leading-9 font-semibold text-foreground">
                  Family Maritime Legacy
                </h3>
                <p className="font-sans text-base leading-relaxed font-normal text-muted-foreground">
                  For three generations, Kumar&apos;s family has shared a
                  deep-rooted connection with the maritime industry. Their
                  journey began with his grandfather, an instructor at
                  India&apos;s first marine engineering college, who helped
                  shape generations of marine engineering talent through
                  dedicated teaching and mentorship.
                </p>
              </div>
              <p className="font-sans text-base leading-relaxed font-normal text-muted-foreground">
                His father then took to sea and rose to a senior
                management-level position, gaining extensive experience across
                oil tankers, container ships, roll-on/roll-off vessels, and
                bulk carriers. Kumar&apos;s brother continues the family
                tradition as a junior management-level officer with significant
                dry bulk expertise.
              </p>
              <p className="font-sans text-base leading-relaxed font-normal text-muted-foreground">
                Kumar serves as a junior operational officer with hands-on
                experience in container and Ro-Ro vessels. Together, their
                family&apos;s legacy reflects a lasting commitment to maritime
                education, leadership, and operational excellence at sea.
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
              "col-span-12 flex w-full flex-col gap-6 rounded-2xl squircle border border-border p-5",
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
              className="h-60 w-full rounded-xl squircle object-cover lg:h-auto lg:w-72 lg:self-start"
              width={288}
              height={216}
              loading="lazy"
              decoding="async"
            />

            {/* Title + first para — row 1 col 2 on desktop */}
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-2xl leading-9 font-semibold text-foreground">
                About Kumar
              </h3>
              <p className="font-sans text-base leading-relaxed font-normal text-muted-foreground">
                With years of hands-on experience navigating commercial vessels
                across international waters, Kumar Srivathsan has developed a
                strong reputation for precision in route planning, effective
                bridge resource management, and strict adherence to STCW and
                SOLAS regulations. His operational expertise extends beyond
                navigation into comprehensive cargo management across container
                and Ro-Ro vessels while maintaining vessel stability and cargo
                integrity.
              </p>
            </div>

            {/* Stats — row 2, spans both columns on desktop */}
            <div className="grid grid-cols-2 gap-5 lg:col-span-2">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="inline-flex flex-col items-start justify-start gap-0.5 rounded-lg squircle border border-border bg-background p-2.5"
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
              He possesses in-depth experience in the maintenance, testing,
              and operational readiness of critical bridge and safety
              equipment, ensuring compliance with statutory and class
              requirements. His proactive approach to planned maintenance
              systems and safety protocols helps minimize operational risks and
              strengthen onboard safety culture.
            </p>
            <p className="font-sans text-base leading-relaxed font-normal text-muted-foreground lg:col-span-2">
              Kumar has also played a key role in preparing vessels for and
              clearing regulatory inspections and audits, including Flag State
              and Port State Control inspections. Through thorough
              documentation, adherence to international conventions, and close
              attention to detail, he consistently supports positive inspection
              outcomes.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
