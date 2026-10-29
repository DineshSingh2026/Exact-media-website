import type { Config } from "tailwindcss";

// Every colour is a CSS variable (RGB channels) defined per theme in
// app/globals.css, so switching `data-theme` on <html> re-skins the whole site.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        // Dark surfaces (Hero, CTA band, Footer)
        ink: {
          DEFAULT: token("ink"),
          raised: token("ink-raised"),
          fg: token("ink-fg"),
          muted: token("ink-muted"),
          line: token("ink-line"),
        },
        // Light surfaces (About, Services, Contact)
        paper: {
          DEFAULT: token("paper"),
          subtle: token("paper-subtle"),
          fg: token("paper-fg"),
          muted: token("paper-muted"),
          line: token("paper-line"),
        },
        accent: {
          DEFAULT: token("accent"),
          hover: token("accent-hover"),
          fg: token("accent-fg"),
          ink: token("accent-ink"),
          glow: token("accent-glow"),
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "ui-sans-serif", "sans-serif"],
      },
      maxWidth: { container: "1200px" },
      boxShadow: {
        soft: "0 1px 2px rgb(16 24 40 / 0.04), 0 1px 3px rgb(16 24 40 / 0.06)",
        lift: "0 12px 32px -12px rgb(16 24 40 / 0.18), 0 4px 8px -4px rgb(16 24 40 / 0.06)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blob: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(8%,-6%,0) scale(1.12)" },
          "66%": { transform: "translate3d(-6%,6%,0) scale(0.92)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        blob: "blob 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
