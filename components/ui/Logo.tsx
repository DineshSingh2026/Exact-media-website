import Link from "next/link";
import { site } from "@/lib/content";
import { LogoMark } from "./LogoMark";

interface LogoProps {
  tone?: "light" | "dark";
  className?: string;
}

/** Mark + "Exact Media" wordmark. `tone="dark"` = for dark backgrounds. */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  return (
    <Link
      href="#home"
      aria-label={`${site.name} — back to top`}
      className={`group inline-flex items-center gap-2 font-display text-lg font-bold tracking-[-0.02em] ${
        tone === "dark" ? "text-ink-fg" : "text-paper-fg"
      } ${className}`}
    >
      <LogoMark className="h-7 w-7 shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none" />
      <span>{site.name}</span>
    </Link>
  );
}
