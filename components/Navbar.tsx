"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { nav } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const SCROLL_THRESHOLD = 40;
const MENU_ID = "mobile-menu";
const SECTION_IDS = nav.links.map((link) => link.href.slice(1));

const focusRing = "focus-visible:ring-offset-ink";

const overlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: EASE_OUT } },
};

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

const ctaItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT, delay: 0.08 * (nav.links.length + 1) },
  },
};

/** Scroll to a section after the menu has closed (body scroll lock released). */
function scrollToHash(href: string) {
  const el = document.getElementById(href.slice(1));
  if (!el) return;
  el.scrollIntoView({ block: "start" }); // honours CSS scroll-behavior (and reduced motion)
  history.replaceState(null, "", href);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(SECTION_IDS[0] ?? "home");
  const [open, setOpen] = useState(false);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pendingHash = useRef<string | null>(null);

  // Frosted state + "reached the bottom" fallback for the last section.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > SCROLL_THRESHOLD);
      const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 2;
      if (atBottom && SECTION_IDS.length) setActive(SECTION_IDS[SECTION_IDS.length - 1]);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Active section tracking: a thin band near the viewport middle, so one section wins.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Body scroll lock, Escape to close, focus management while the menu is open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusables = menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      const hash = pendingHash.current;
      pendingHash.current = null;
      if (hash) {
        requestAnimationFrame(() => scrollToHash(hash));
      } else {
        toggle?.focus();
      }
    };
  }, [open]);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const onMenuLink = useCallback((e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    pendingHash.current = href;
    setOpen(false);
  }, []);

  const frosted = scrolled && !open;

  return (
    <>
      <a
        href="#main"
        className={`sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-accent-fg ${focusRing}`}
      >
        {nav.skipLabel}
      </a>

      <header
        data-surface="dark"
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
          frosted
            ? "border-white/10 bg-ink/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        }`}
      >
        <Container className="flex h-16 items-center justify-between gap-6 lg:h-[72px]">
          <Logo tone="dark" className={`-mx-1 rounded-md px-1 py-2 ${focusRing}`} />

          <nav aria-label={nav.primaryLabel} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.links.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors duration-200 ${focusRing} ${
                        isActive ? "text-ink-fg" : "text-ink-muted hover:text-ink-fg"
                      }`}
                    >
                      {link.label}
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active-dot"
                          aria-hidden
                          className="absolute bottom-0.5 left-1/2 -ml-0.5 h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent)/0.8)]"
                          transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href={nav.cta.href} variant="primary" size="md" className={`hidden md:inline-flex ${focusRing}`}>
              {nav.cta.label}
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls={MENU_ID}
              aria-label={nav.menuOpenLabel}
              className={`-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-fg transition-colors hover:bg-white/10 md:hidden ${focusRing}`}
            >
              <Menu className="h-6 w-6" aria-hidden strokeWidth={1.75} />
            </button>
          </div>
        </Container>
      </header>

      {/* Kept outside <header>: backdrop-filter would otherwise trap position:fixed. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            id={MENU_ID}
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={nav.primaryLabel}
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-surface="dark"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overflow-x-hidden bg-ink md:hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 right-[-20%] h-80 w-80 rounded-full bg-accent/25 blur-3xl"
            />
            <Container className="relative flex h-16 shrink-0 items-center justify-between">
              <Logo tone="dark" className={`-mx-1 rounded-md px-1 py-2 ${focusRing}`} />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={nav.menuCloseLabel}
                className={`-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-fg transition-colors hover:bg-white/10 ${focusRing}`}
              >
                <X className="h-6 w-6" aria-hidden strokeWidth={1.75} />
              </button>
            </Container>

            <Container className="relative flex flex-1 flex-col justify-between gap-12 pb-10 pt-8">
              <nav aria-label={nav.primaryLabel}>
                <motion.ul variants={list} initial="hidden" animate="visible" className="flex flex-col gap-2">
                  {nav.links.map((link) => {
                    const isActive = active === link.href.slice(1);
                    return (
                      <motion.li key={link.href} variants={item}>
                        <a
                          href={link.href}
                          onClick={(e) => onMenuLink(e, link.href)}
                          aria-current={isActive ? "true" : undefined}
                          className={`group flex min-h-14 items-center gap-4 rounded-xl py-2 font-display text-4xl font-semibold tracking-tight transition-colors sm:text-5xl ${focusRing} ${
                            isActive ? "text-ink-fg" : "text-ink-muted hover:text-ink-fg"
                          }`}
                        >
                          {link.label}
                          {isActive ? <span aria-hidden className="h-2 w-2 rounded-full bg-accent" /> : null}
                        </a>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              <motion.div variants={ctaItem} initial="hidden" animate="visible">
                <ButtonLink
                  href={nav.cta.href}
                  variant="primary"
                  size="lg"
                  onClick={(e) => onMenuLink(e, nav.cta.href)}
                  className={`w-full ${focusRing}`}
                >
                  {nav.cta.label}
                </ButtonLink>
              </motion.div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
