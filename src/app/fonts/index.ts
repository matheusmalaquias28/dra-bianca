import localFont from "next/font/local";

/**
 * Flatline (Up Up Creative) — fonte institucional da marca.
 * Usada em títulos, rótulos de botão e no lockup.
 * Convertida de .otf para .woff2 (≈40% menor) e auto-hospedada.
 */
export const flatline = localFont({
  src: [
    { path: "./Flatline-Regular.woff2", weight: "400", style: "normal" },
    { path: "./Flatline-Italic.woff2", weight: "400", style: "italic" },
    { path: "./Flatline-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./Flatline-SemiBoldItalic.woff2", weight: "600", style: "italic" },
    { path: "./Flatline-Bold.woff2", weight: "700", style: "normal" },
    { path: "./Flatline-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-flatline",
  display: "swap",
  preload: true,
  fallback: ["Optima", "Palatino Linotype", "serif"],
});

/**
 * Manrope Variable (SIL OFL 1.1) — fonte de apoio para textos e interface.
 * Auto-hospedada: um único arquivo cobre os pesos 200–800 e a página não
 * depende de nenhuma requisição ao Google Fonts.
 */
export const manrope = localFont({
  src: [
    {
      path: "./Manrope-Variable.woff2",
      weight: "200 800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "sans-serif",
  ],
});
