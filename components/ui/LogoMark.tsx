interface LogoMarkProps {
  className?: string;
}

/**
 * Exact Media mark: an "E" built from three channel bars (multi-source ad
 * channels, one interface). The middle bar stops short at an accent dot — the
 * exact point everything converges on. Bars use currentColor; the dot follows
 * the active theme's accent.
 */
export function LogoMark({ className = "" }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <path
        d="M9 7.5H25M9 16H18.5M9 24.5H25M9 7.5V24.5"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={24.5} cy={16} r={3} className="fill-accent" />
    </svg>
  );
}
