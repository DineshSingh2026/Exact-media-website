import { footer, nav } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SHOW_THEME_SWITCHER } from "@/lib/themes";

export function Footer() {
  return (
    // Extra bottom padding keeps the fixed theme switcher clear of the copyright line.
    <footer
      data-surface="dark"
      className={`border-t border-ink-line bg-ink pt-12 ${SHOW_THEME_SWITCHER ? "pb-24" : "pb-12"}`}
    >
      <Container className="flex flex-col gap-8 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
        <div className="flex flex-col gap-2">
          <Logo tone="dark" className="self-start rounded-sm focus-visible:ring-offset-ink" />
          <p className="text-sm text-ink-muted">{footer.tagline}</p>
        </div>

        <nav aria-label={footer.navLabel}>
          <ul className="-mx-3 flex flex-wrap items-center gap-x-3 md:mx-0 md:justify-center md:gap-x-6">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex h-11 items-center rounded-md px-3 text-sm text-ink-muted transition-colors hover:text-ink-fg focus-visible:ring-offset-ink md:px-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm text-ink-muted md:text-right">{footer.copyright}</p>
      </Container>
    </footer>
  );
}
