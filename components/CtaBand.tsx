import { ArrowRight } from "lucide-react";
import { ctaBand } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const HEADING_ID = "cta-band-heading";

export function CtaBand() {
  return (
    <section aria-labelledby={HEADING_ID} data-surface="dark" className="bg-ink py-16 lg:py-28">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-raised to-ink px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24">
            {/* Faint grid texture, masked to fade from the centre */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(var(--ink-fg)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--ink-fg)/0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] [-webkit-mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
            />
            {/* Soft accent glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-[min(640px,90%)] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.35),transparent)] blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-48 w-72 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-glow)/0.18),transparent)] blur-3xl"
            />
            {/* Hairline highlight along the top edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />

            <h2
              id={HEADING_ID}
              className="mx-auto max-w-2xl text-balance text-3xl font-semibold text-ink-fg sm:text-4xl lg:text-5xl"
            >
              {ctaBand.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-ink-muted sm:text-lg">
              {ctaBand.subheading}
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink
                href={ctaBand.cta.href}
                size="lg"
                className="focus-visible:ring-offset-ink"
              >
                {ctaBand.cta.label}
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
