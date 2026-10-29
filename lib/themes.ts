// Colour variants shown in the on-page theme switcher.
// Keys must match the [data-theme="..."] blocks in app/globals.css.

export const themes = [
  {
    id: "electric",
    name: "Electric",
    description: "Near-black with electric blue",
    swatch: { bg: "#0A0A0B", accent: "#2F6BFF", fg: "#FFFFFF" },
  },
  {
    id: "gold",
    name: "Noir & Gold",
    description: "Warm black, ivory and champagne gold",
    swatch: { bg: "#0C0C0E", accent: "#CFA860", fg: "#141311" },
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "Indigo-black with violet and cyan glow",
    swatch: { bg: "#0B0A14", accent: "#7C5CFF", fg: "#FFFFFF" },
  },
] as const;

export type ThemeId = (typeof themes)[number]["id"];

export const DEFAULT_THEME: ThemeId = "electric";
export const THEME_STORAGE_KEY = "exact-media-theme";

// Set to false to hide the switcher once a variant has been chosen.
export const SHOW_THEME_SWITCHER = true;

// Runs inline in <head> before paint so the saved theme never flashes.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t&&${JSON.stringify(
  themes.map((t) => t.id),
)}.indexOf(t)>-1){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;
