"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { themeSwitcher } from "@/lib/content";
import { DEFAULT_THEME, THEME_STORAGE_KEY, themes, type ThemeId } from "@/lib/themes";

const TRANSITION_MS = 450;

function isThemeId(value: string | undefined): value is ThemeId {
  return !!value && themes.some((t) => t.id === value);
}

function applyTheme(id: ThemeId) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.dataset.theme = id;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    /* storage unavailable (private mode etc.) */
  }
  const swatch = themes.find((t) => t.id === id)?.swatch;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta && swatch) meta.setAttribute("content", swatch.bg);
  window.setTimeout(() => root.classList.remove("theme-transition"), TRANSITION_MS);
}

/** Mini preview: theme background with an accent bar and dot. */
function Swatch({ bg, accent }: { bg: string; accent: string }) {
  return (
    <span
      aria-hidden
      className="relative block h-9 w-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-inset ring-white/15"
      style={{ backgroundColor: bg }}
    >
      <span
        className="absolute inset-0 opacity-60"
        style={{ background: `radial-gradient(120% 90% at 100% 100%, ${accent}66, transparent 60%)` }}
      />
      <span className="absolute left-1.5 top-1.5 h-1 w-5 rounded-full bg-white/70" />
      <span className="absolute left-1.5 top-3.5 h-1 w-3 rounded-full bg-white/30" />
      <span
        className="absolute bottom-1.5 left-1.5 h-2 w-6 rounded-full"
        style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}99` }}
      />
    </span>
  );
}

export function ThemeSwitcher() {
  const [current, setCurrent] = useState<ThemeId>(DEFAULT_THEME);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const titleId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Sync with the theme the inline init script already applied.
  useEffect(() => {
    const active = document.documentElement.dataset.theme;
    if (isThemeId(active)) setCurrent(active);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Escape + click outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  // Move focus to the active option when the panel opens.
  useEffect(() => {
    if (!open) return;
    const idx = themes.findIndex((t) => t.id === current);
    const raf = requestAnimationFrame(() => optionRefs.current[Math.max(idx, 0)]?.focus());
    return () => cancelAnimationFrame(raf);
    // Only on open; selection changes shouldn't steal focus.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const select = (id: ThemeId) => {
    if (id === current) return;
    setCurrent(id);
    applyTheme(id);
  };

  const onOptionKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = themes.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      optionRefs.current[next]?.focus();
    }
  };

  const active = themes.find((t) => t.id === current) ?? themes[0];

  return (
    <div ref={rootRef} className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="absolute bottom-full right-0 mb-3 w-[280px] max-w-[calc(100vw-2rem)] rounded-2xl bg-neutral-950/80 p-2 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between pb-1 pl-3 pr-0.5 pt-0.5">
              <div>
                <p id={titleId} className="text-sm font-medium text-white">
                  {themeSwitcher.label}
                </p>
                <p className="text-xs text-white/50">{themeSwitcher.hint}</p>
              </div>
              <button
                type="button"
                onClick={() => close()}
                aria-label={themeSwitcher.closeLabel}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div role="radiogroup" aria-labelledby={titleId} className="flex flex-col gap-1">
              {themes.map((theme, i) => {
                const checked = theme.id === current;
                return (
                  <button
                    key={theme.id}
                    ref={(el) => {
                      optionRefs.current[i] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    tabIndex={checked ? 0 : -1}
                    onClick={() => select(theme.id)}
                    onKeyDown={(e) => onOptionKeyDown(e, i)}
                    className={`group flex min-h-[44px] w-full items-center gap-3 rounded-xl p-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                      checked ? "bg-white/[0.08] ring-1 ring-white/20" : "hover:bg-white/[0.05]"
                    }`}
                  >
                    <Swatch bg={theme.swatch.bg} accent={theme.swatch.accent} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-white">{theme.name}</span>
                      <span className="block text-xs leading-snug text-white/60">{theme.description}</span>
                    </span>
                    <span
                      aria-hidden
                      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-opacity ${
                        checked ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ backgroundColor: theme.swatch.accent }}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} style={{ color: theme.swatch.fg }} />
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={themeSwitcher.toggleLabel}
        className="flex h-11 min-w-[44px] items-center gap-2.5 rounded-full bg-neutral-950/80 pl-3 pr-3 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-xl transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:pr-4"
      >
        <Palette className="h-4 w-4 text-white/80" aria-hidden />
        <span aria-hidden className="flex -space-x-1.5">
          {themes.map((t) => (
            <span
              key={t.id}
              className="h-3.5 w-3.5 rounded-full ring-2 ring-neutral-950"
              style={{ backgroundColor: t.swatch.accent }}
            />
          ))}
        </span>
        <span className="hidden text-sm font-medium text-white/90 min-[400px]:inline">{active.name}</span>
      </button>
    </div>
  );
}
