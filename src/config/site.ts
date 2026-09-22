export const site = {
  name: "Dra. Bianca De Franco",
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

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Tratamentos", href: "/tratamentos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export type Clinic = {
  id: "ipanema" | "niteroi";
  name: string;
  /** Se `addressConfirmed` for false, o endereço é um placeholder a validar com a clínica. */
  address: string;
  addressConfirmed: boolean;
  hours: string;
  whatsapp: string;
  phoneLabel: string;
};

export const clinics: Clinic[] = [
  {
    id: "ipanema",
    name: "Clínica Ipanema",
    address: "Rua Visconde de Pirajá, nº 608 — salas 604/605, Ipanema, Rio de Janeiro – RJ",
    addressConfirmed: true,
    hours: "Segunda a sexta, 9h às 19h",
    whatsapp:
      "https://wa.me/5521977659559?text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20agendar%20uma%20consulta%20em%20Ipanema!",
    phoneLabel: "(21) 97765-9559",
  },
  {
    id: "niteroi",
    name: "Clínica Niterói",
    address: "R. Dr. Celestino, nº 122 — Ioffices, Niterói – RJ, 24020-091",
    addressConfirmed: true,
    hours: "Segunda a sexta, 9h às 19h",
    whatsapp:
      "https://api.whatsapp.com/send/?phone=5521995718080&text=Ol%C3%A1%2C+vim+atrav%C3%A9s+do+site+e+gostaria+de+agendar+uma+consulta+em+Niter%C3%B3i%21&type=phone_number&app_absent=0",
    phoneLabel: "(21) 99571-8080",
  },
];

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
    href: "/",
    kind: "featured",
    icon: "globe",
  },
  {
    id: "instagram",
    // espaço não-separável: garante a quebra "INSTAGRAM / DA CLÍNICA" em qualquer largura
    label: "Instagram da\u00A0clínica",
    href: "https://www.instagram.com/biancadefranco",
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
