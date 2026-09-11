export const site = {
  name: "Dra. Bianca de Franco",
  specialty: "Dermatologia",
  bio: "Dermatologista pela SBD. Especialista em cabelos, beleza natural e autoestima.",
  /** Registro profissional. Se quiser exibir a UF, use o formato "CRM-RJ 52102361-6". */
  crm: "CRM 52102361-6",
  locations: "Ipanema · Niterói",
  /** Trocar pelo domínio final antes do deploy de produção. */
  url: "https://biancadefranco.com.br",
  description:
    "Dra. Bianca De Franco — dermatologista pela SBD, especialista em cabelos, beleza natural e autoestima. Agendamentos nas clínicas do Ipanema e de Niterói.",
} as const;

export type LinkKind = "booking" | "featured" | "social";

export type SiteLink = {
  id: string;
  label: string;
  /** Linha auxiliar exibida abaixo do rótulo. */
  hint?: string;
  href: string | null;
  kind: LinkKind;
  icon: "whatsapp" | "instagram" | "tiktok" | "youtube" | "globe";
  /** Sem href: renderiza o estado "em breve" com micro-interação. */
  comingSoon?: boolean;
};

export const links: SiteLink[] = [
  {
    id: "ipanema",
    label: "Clínica Ipanema",
    hint: "Agendar pelo WhatsApp",
    href: "https://wa.me/5521977659559?text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20link%20da%20bio%20e%20gostaria%20de%20agendar%20uma%20consulta%20em%20Ipanema!",
    kind: "booking",
    icon: "whatsapp",
  },
  {
    id: "niteroi",
    label: "Clínica Niterói",
    hint: "Agendar pelo WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=5521995718080&text=Ol%C3%A1%2C+vim+atrav%C3%A9s+do+link+da+bio+e+gostaria+de+agendar+uma+consulta+em+Niter%C3%B3i%21&type=phone_number&app_absent=0",
    kind: "booking",
    icon: "whatsapp",
  },
  {
    id: "site",
    label: "Meu site",
    hint: "Site oficial",
    href: null,
    kind: "featured",
    icon: "globe",
    comingSoon: true,
  },
  {
    id: "instagram",
    // espaço não-separável: garante a quebra "INSTAGRAM / DA CLÍNICA" em qualquer largura
    label: "Instagram da\u00A0clínica",
    href: "https://www.instagram.com/dermatobf",
    kind: "social",
    icon: "instagram",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@biancadermato",
    kind: "social",
    icon: "tiktok",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC0vRxAqrdh1BDETIqyKg2Wg",
    kind: "social",
    icon: "youtube",
  },
];

export const bookingLinks = links.filter((l) => l.kind === "booking");
export const featuredLinks = links.filter((l) => l.kind === "featured");
export const socialLinks = links.filter((l) => l.kind === "social");
