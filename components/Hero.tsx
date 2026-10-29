import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { about, hero } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SmartImage } from "@/components/ui/SmartImage";

// Pure-CSS load stagger (80ms steps) so the hero animates before hydration.
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

// Split the headline so the closing words can carry a soft accent gradient.
const words = hero.headline.split(" ");
const accentCount = words.length > 3 ? 2 : 1;
const headlineLead = words.slice(0, -accentCount).join(" ");
const headlineAccent = words.slice(-accentCount).join(" ");

export function Hero() {
  const headingId = `${hero.id}-heading`;

  return (
    <section
      id={hero.id}
      aria-labelledby={headingId}
      data-surface="dark"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink pb-24 pt-[calc(72px+56px)] text-ink-fg sm:pb-32 sm:pt-[calc(72px+80px)]"
    >
      {/* ---------- Background layers (back to front) ---------- */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <SmartImage image={hero.image} fill priority sizes="100vw" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/60" />

      {/* Animated accent blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-[10%] -top-[20%] h-[560px] w-[560px] animate-blob rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--accent)/0.32),transparent_65%)] blur-3xl will-change-transform sm:h-[720px] sm:w-[720px]" />
        <div
          className="absolute -bottom-[25%] -left-[15%] h-[480px] w-[480px] animate-blob rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--accent-glow)/0.26),transparent_65%)] blur-3xl will-change-transform sm:h-[640px] sm:w-[640px]"
          style={{ animationDelay: "-10s" }}
        />
      </div>

      {/* Fine grid, masked to fade out from the upper area */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_35%,black_10%,transparent_75%)]"
      />

      {/* Bottom fade into ink for a clean hand-off to the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-ink" />

      {/* ---------- Content ---------- */}
      <Container className="relative">
        <div className="max-w-3xl">
          <p
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pl-3 pr-4 text-xs font-medium tracking-wide text-ink-fg/90 backdrop-blur-sm sm:text-[13px]"
            style={delay(0)}
          >
            <span aria-hidden className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {hero.eyebrow}
          </p>

          <h1
            id={headingId}
            className="mt-6 animate-fade-up text-balance font-display text-[40px] font-semibold leading-[1.05] tracking-tight sm:text-6xl sm:leading-[1.05] lg:text-[72px]"
            style={delay(80)}
          >
            {headlineLead}{" "}
            <span className="bg-gradient-to-r from-ink-fg via-ink-fg to-accent bg-clip-text text-transparent [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
              {headlineAccent}
            </span>
          </h1>

          <p
            className="mt-6 max-w-2xl animate-fade-up text-pretty text-lg leading-relaxed text-ink-muted sm:text-xl sm:leading-relaxed"
            style={delay(160)}
          >
            {hero.subheadline}
          </p>

          <div className="mt-10 flex animate-fade-up flex-col gap-3 min-[420px]:flex-row" style={delay(240)}>
            <ButtonLink href={hero.primaryCta.href} size="lg" className="focus-visible:ring-offset-ink">
              {hero.primaryCta.label}
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                strokeWidth={2}
              />
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="ghost"
              size="lg"
              className="focus-visible:ring-offset-ink"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <ul
          className="mt-16 grid max-w-3xl animate-fade-up gap-6 border-t border-white/10 pt-8 sm:mt-20 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-white/10"
          style={delay(320)}
        >
          {hero.pillars.map((pillar, i) => (
            <li key={pillar.title} className={`flex items-start gap-4 ${i === 0 ? "sm:pr-8" : "sm:pl-8"}`}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-accent">
                <Icon name={pillar.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-ink-fg">{pillar.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{pillar.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      {/* Scroll hint — hidden on short viewports */}
      <div className="absolute inset-x-0 bottom-8 hidden justify-center md:flex [@media(max-height:760px)]:hidden">
        <a
          href={`#${about.id}`}
          aria-label={hero.scrollLabel}
          className="animate-fade-up rounded-full p-2 text-ink-muted transition-colors hover:text-ink-fg focus-visible:ring-offset-ink"
          style={delay(480)}
        >
          <span aria-hidden className="flex h-9 w-[22px] justify-center rounded-full border border-current pt-2">
            <span className="h-1.5 w-[3px] rounded-full bg-current motion-safe:animate-bounce" />
          </span>
        </a>
      </div>
    </section>
  );
}
