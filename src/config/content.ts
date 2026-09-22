import { clinics } from "./site";

/** Monta um link de WhatsApp da clínica Ipanema com mensagem pré-preenchida por tratamento. */
function waFor(treatmentLabel: string) {
  const clinic = clinics[0];
  const base = clinic.whatsapp.split("?")[0];
  const text = encodeURIComponent(
    `Olá, vim através do site e gostaria de agendar uma avaliação de ${treatmentLabel}.`,
  );
  return `${base}?text=${text}`;
}

export type TreatmentCategory = "Rosto" | "Cabelo" | "Pele";

export type Treatment = {
  id: string;
  label: string;
  category: TreatmentCategory;
  description: string;
  href: string;
  image: string;
};

export const treatments: Treatment[] = [
  {
    id: "botox",
    label: "Botox",
    category: "Rosto",
    description: "Suaviza linhas de expressão e previne rugas com resultado natural.",
    href: waFor("Botox"),
    image: "/procedimentos/botox2-dra-bianca-de-franco.jpg",
  },
  {
    id: "tricologia",
    label: "Cabelos · Tricologia",
    category: "Cabelo",
    description: "Diagnóstico e tratamento da queda de cabelo, calvície e saúde do couro cabeludo.",
    href: waFor("Tricologia"),
    image: "/procedimentos/tricologia-dra-bianca-de-franco.jpg",
  },
  {
    id: "linear-z",
    label: "Ultrassom Microfocado · Linear Z",
    category: "Rosto",
    description: "Lifting não cirúrgico que estimula colágeno e redefine o contorno facial.",
    href: waFor("Ultrassom Microfocado Linear Z"),
    image: "/procedimentos/ultrassom-microfocado-linear-z-dra-bianca-de-franco.jpg",
  },
  {
    id: "preenchimento",
    label: "Preenchimento Facial",
    category: "Rosto",
    description: "Restaura volume e harmoniza os contornos do rosto com técnica natural.",
    href: waFor("Preenchimento Facial"),
    image: "/procedimentos/preenchimento-labial-dra-bianca-de-franco.jpg",
  },
  {
    id: "contorno",
    label: "Contorno Facial",
    category: "Rosto",
    description: "Procedimentos combinados para definir e equilibrar as proporções do rosto.",
    href: waFor("Contorno Facial"),
    image: "/procedimentos/contorno-facial-dra-bianca-de-franco.jpg",
  },
  {
    id: "bioestimulador",
    label: "Bioestimulador de Colágeno",
    category: "Rosto",
    description: "Estimula a produção natural de colágeno para firmeza e viço da pele.",
    href: waFor("Bioestimulador de Colágeno"),
    image: "/procedimentos/bioestimulador-de-colageno-dra-bianca-de-franco.jpg",
  },
  {
    id: "laser-manchas",
    label: "Laser para Manchas e Rugas",
    category: "Pele",
    description: "Trata manchas, rugas finas e sinais do fotoenvelhecimento.",
    href: waFor("Laser para Manchas e Rugas"),
    image: "/procedimentos/laser-para-manchar-e-rugas-dra-bianca-de-franco.jpg",
  },
  {
    id: "cicatrizes",
    label: "Cicatrizes de Acne e Pós-Cirurgia",
    category: "Pele",
    description: "Protocolos para suavizar cicatrizes e uniformizar a textura da pele.",
    href: waFor("Tratamento de Cicatrizes"),
    image: "/procedimentos/cicatrizes-de-acne-e-pos-cirgurgia-dra-bianca-de-franco.jpg",
  },
  {
    id: "skinbooster",
    label: "Skinbooster",
    category: "Pele",
    description: "Hidratação profunda que devolve viço, luz e elasticidade à pele.",
    href: waFor("Skinbooster"),
    image: "/procedimentos/skinbooster-facial-dra-bianca-de-franco.jpg",
  },
];

export const treatmentCategories: TreatmentCategory[] = ["Rosto", "Cabelo", "Pele"];

export type Technology = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export const technologies: Technology[] = [
  {
    id: "laser-zye",
    name: "Laser ZYE",
    description:
      "Tecnologia a laser de alta precisão para tratamento de manchas, vasos e rejuvenescimento da pele.",
    image: "/equipamentos/laser-zye-dra-bianca-de-franco.jpg",
  },
  {
    id: "xerf",
    name: "XERF Radiofrequência",
    description:
      "Radiofrequência que estimula colágeno e promove firmeza, com conforto e sem tempo de recuperação.",
    image: "/equipamentos/xerf-radiofrequencia-dra-bianca-de-franco.jpg",
  },
  {
    id: "linear-z-tech",
    name: "Linear Z — Ultrassom Microfocado",
    description:
      "Lifting não cirúrgico com ultrassom microfocado linear, redefinindo o contorno do rosto.",
    image: "/equipamentos/linear-z-dra-bianca-de-franco.jpg",
  },
  {
    id: "pico-segundos",
    name: "Laser de Pico Segundos",
    description:
      "Pulsos ultrarrápidos que tratam manchas e sinais de envelhecimento com máxima precisão.",
    image: "/equipamentos/laser-de-pico-segundos-dra-bianca-de-franco.jpg",
  },
];

export type Concern = {
  id: string;
  label: string;
  description: string;
  image: string;
};

export const concerns: Concern[] = [
  {
    id: "queda-cabelo",
    label: "Queda de Cabelo",
    description: "Avaliação tricológica completa para entender a causa e desenhar o tratamento certo.",
    image: "/queda-de-cabelo.jpg",
  },
  {
    id: "acne",
    label: "Acne",
    description: "Protocolos que combinam cuidado clínico e estético para controlar as crises.",
    image: "/acne.jpg",
  },
  {
    id: "manchas",
    label: "Manchas na Pele",
    description: "Diagnóstico preciso e tratamentos a laser para uniformizar o tom da pele.",
    image: "/manchas-na-pele.jpg",
  },
  {
    id: "melasma",
    label: "Melasma",
    description: "Abordagem individualizada, já que o melasma pede acompanhamento contínuo.",
    image: "/melasma.jpg",
  },
  {
    id: "rugas-sinais",
    label: "Rugas e Sinais",
    description: "Procedimentos que suavizam sinais do tempo com resultado natural e gradual.",
    image: "/images/ruga-feminina (1).jpg",
  },
  {
    id: "papada",
    label: "Papada",
    description: "Técnicas de contorno facial para redefinir o ângulo do queixo e do pescoço.",
    image: "/papada.jpg",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "bruna-gomes",
    name: "Bruna Gomes",
    quote:
      "A Bianca faz um atendimento cuidadoso e me sinto muito bem cuidada. Fico feliz com os resultados naturais e pela atenção que ela dá a cada detalhe.",
  },
  {
    id: "patricia-lage",
    name: "Patricia Lage",
    quote:
      "Sou paciente há anos e a evolução do meu tratamento sempre foi acompanhada de perto. Uma profissional extremamente cuidadosa e competente.",
  },
  {
    id: "bruno-da-silva",
    name: "Bruno Da Silva",
    quote:
      "Dra. Bianca sempre muito atenciosa e atualizada. Recomendo o atendimento pra quem procura um cuidado real com a pele.",
  },
];
