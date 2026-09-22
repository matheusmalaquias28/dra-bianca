import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.specialty}`,
    short_name: "Bianca De Franco",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#EFE2DB",
    theme_color: "#48372a",
    lang: "pt-BR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
