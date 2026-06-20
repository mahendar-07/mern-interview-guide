// ── Cupertino design tokens ────────────────────────────────────────
// Lifted from the "Developer Interview Studio" reference: Apple-style
// editorial light UI. Soft gray canvas, white cards, Apple blue accent,
// burnt-orange eyebrow accent, Playfair Display serif for headlines.

export const levelColors = {
  Basic:        { bg: "#BF480014", text: "#BF4800" },
  Intermediate: { bg: "#0071E314", text: "#0071E3" },
  Advanced:     { bg: "#a855f714", text: "#9333ea" },
  Scenario:     { bg: "#ecfdf5",   text: "#047857" },
};

export const darkTheme = {
  mode: "dark",
  bg: "#09090B",
  headerBg: "#121214cc",
  sidebarBg: "#09090B",
  surface: "#121214",
  surfaceMuted: "#18181b80",
  border: "#27272a",
  borderStrong: "#3f3f46",
  text: "#a1a1a6",
  textDim: "#6e6e73",
  textBright: "#f5f5f7",
  inputBg: "#121214",
  accent: "#0a84ff",
  accentTint: "#0a84ff1f",
  eyebrow: "#ff9f0a",
  eyebrowTint: "#ff9f0a1a",
  success: "#30d158",
};

export const lightTheme = {
  mode: "light",
  bg: "#F5F5F7",
  headerBg: "#ffffffcc",
  sidebarBg: "#F5F5F7",
  surface: "#ffffff",
  surfaceMuted: "#fafafa80",
  border: "#e5e5e7",
  borderStrong: "#d2d2d7",
  text: "#6e6e73",
  textDim: "#86868b",
  textBright: "#1d1d1f",
  inputBg: "#f5f5f7",
  accent: "#0071e3",
  accentTint: "#0071e314",
  eyebrow: "#BF4800",
  eyebrowTint: "#BF480014",
  success: "#198754",
};

export const stackMeta = {
  react:   { mark: "⚛", name: "React" },
  express: { mark: "▹", name: "Express" },
  mongo:   { mark: "◇", name: "MongoDB" },
  node:    { mark: "▸", name: "Node.js" },
};
