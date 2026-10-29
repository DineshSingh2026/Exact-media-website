import { CheckCircle2 } from "lucide-react";
import { about } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const HEADING_ID = "about-heading";

export function About() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <section id={about.id} aria-labelledby={HEADING_ID} className="relative overflow-hidden bg-paper py-16 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image */}
          <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-0 rounded-[48px] bg-[radial-gradient(60%_55%_at_50%_50%,rgb(var(--accent)/0.15)_0%,transparent_70%)] blur-2xl"
            />
            <div className="relative shadow-lift rounded-3xl">
              <SmartImage
                image={about.image}
                wrapperClassName="rounded-3xl"
                sizes="(min-width:1024px) 40vw, 100vw"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-paper-fg/10" />
            </div>
          </Reveal>

          {/* Copy */}
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={about.eyebrow} title={about.heading} tone="light" id={HEADING_ID} />

            <Reveal className="mt-8 max-w-prose space-y-5" delay={0.08}>
              <p className="text-pretty text-lg leading-relaxed text-paper-fg">{lead}</p>
              {rest.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-pretty text-base leading-relaxed text-paper-muted">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <div className="mt-10 border-t border-paper-line pt-8">
              {/* RevealGroup/RevealItem render divs, so list semantics come from ARIA roles */}
              <RevealGroup role="list" className="grid gap-4 xl:grid-cols-3 xl:gap-6">
                {about.bullets.map((bullet) => (
                  <RevealItem key={bullet} role="listitem" className="flex items-start gap-3">
                    <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" strokeWidth={2} />
                    <span className="text-sm font-medium leading-relaxed text-paper-fg sm:text-[15px]">{bullet}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
