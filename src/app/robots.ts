import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Inclui buscadores tradicionais e crawlers de IA (GPTBot, ClaudeBot,
        // PerplexityBot, Google-Extended etc.), que herdam esta regra "*".
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
