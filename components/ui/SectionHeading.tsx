import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** Optional lead paragraph under the title */
  intro?: string;
  align?: "left" | "center";
  /** "light" for white/grey sections, "dark" for ink sections */
  tone?: "light" | "dark";
  /** id for aria-labelledby on the parent section */
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  id,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p
        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${
          dark ? "text-accent" : "text-accent-ink"
        }`}
      >
        <span aria-hidden className="h-px w-6 bg-current opacity-60" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 text-balance text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-[44px] ${
          dark ? "text-ink-fg" : "text-paper-fg"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${dark ? "text-ink-muted" : "text-paper-muted"}`}>
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
