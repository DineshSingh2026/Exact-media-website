import { services } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

export function Services() {
  const headingId = `${services.id}-heading`;

  return (
    <section id={services.id} aria-labelledby={headingId} className="bg-paper-subtle py-16 lg:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <SectionHeading
            id={headingId}
            eyebrow={services.eyebrow}
            title={services.heading}
            className="lg:col-span-7"
          />
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-pretty text-base leading-relaxed text-paper-muted sm:text-lg">{services.intro}</p>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
          {services.items.map((item, index) => (
            <RevealItem key={item.id} className="h-full">
              <Card interactive className="relative flex h-full flex-col p-3 sm:p-4">
                <article aria-labelledby={`service-${item.id}`} className="flex h-full flex-col">
                  <SmartImage
                    image={item.image}
                    wrapperClassName="rounded-xl"
                    className="transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    sizes="(min-width:768px) 50vw, 100vw"
                  />
                  <div className="flex flex-1 flex-col px-2 pb-3 pt-6 sm:px-3 sm:pb-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-paper-line bg-paper text-accent-ink transition-colors duration-300 group-hover:border-accent">
                        <Icon name={item.icon} className="h-5 w-5" />
                      </span>
                      <h3
                        id={`service-${item.id}`}
                        className="font-display text-xl font-semibold leading-snug text-paper-fg"
                      >
                        {item.title}
                      </h3>
                      <span
                        aria-hidden
                        className="ml-auto self-start pt-1 font-display text-xs font-medium tabular-nums tracking-wider text-paper-muted/60"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-paper-muted">{item.description}</p>
                  </div>
                </article>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
