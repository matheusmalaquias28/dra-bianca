import { site, clinics, clinicSchema, socialLinks } from "@/config/site";

const abs = (path: string) => new URL(path, site.url).toString();

const sameAs = socialLinks
  .map((l) => l.href)
  .filter((h): h is string => typeof h === "string" && h.startsWith("http"));

/**
 * Grafo principal do site: perfil da dermatologista, as duas clínicas
 * (MedicalClinic) e o WebSite. Serve tanto para rich results do Google quanto
 * para dar contexto factual às buscas com IA (AI Overviews, ChatGPT, Perplexity).
 */
export function siteJsonLd() {
  const personId = `${site.url}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "pt-BR",
        publisher: { "@id": personId },
      },
      {
        "@type": ["Person", "Physician"],
        "@id": personId,
        name: site.name,
        jobTitle: "Dermatologista",
        medicalSpecialty: "Dermatologic",
        image: abs(site.ogImage),
        url: site.url,
        description: site.description,
        sameAs,
        memberOf: {
          "@type": "MedicalOrganization",
          name: "Sociedade Brasileira de Dermatologia",
        },
      },
      ...clinics.map((c) => {
        const s = clinicSchema[c.id];
        return {
          "@type": "MedicalClinic",
          "@id": `${site.url}/#clinic-${c.id}`,
          name: `${site.name} — ${c.name}`,
          url: site.url,
          image: abs(site.ogImage),
          telephone: s.telephone,
          medicalSpecialty: "Dermatologic",
          priceRange: "$$",
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "19:00",
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: s.streetAddress,
            addressLocality: s.locality,
            addressRegion: s.region,
            ...(s.postalCode ? { postalCode: s.postalCode } : {}),
            addressCountry: "BR",
          },
          founder: { "@id": personId },
        };
      }),
    ],
  };
}

/** Dados estruturados de um artigo do blog (MedicalWebPage + BlogPosting). */
export function articleJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  category: string;
}) {
  const urlAbs = `${site.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${urlAbs}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "pt-BR",
    articleSection: post.category,
    image: post.image ? abs(post.image) : abs(site.ogImage),
    mainEntityOfPage: { "@type": "WebPage", "@id": urlAbs },
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
  };
}
