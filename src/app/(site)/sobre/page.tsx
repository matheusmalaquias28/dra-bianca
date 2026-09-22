import type { Metadata } from "next";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ContactButton } from "@/components/site/ContactButton";
import { InViewGroup, InViewItem } from "@/components/site/ScrollReveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a trajetória e a filosofia de atendimento da Dra. Bianca De Franco, dermatologista membro da SBD.",
  alternates: { canonical: "/sobre" },
  openGraph: { url: "/sobre", title: "Sobre a Dra. Bianca De Franco" },
};

const credentials = [
  { year: "Formação", label: "Graduação em Medicina e Dermatologia pela UERJ" },
  { year: "Residência", label: "Residência médica em Dermatologia Clínica" },
  { year: "Fellow", label: "Fellowship em Tricologia — cabelo e couro cabeludo" },
  { year: "Sociedade", label: "Membro efetivo da Sociedade Brasileira de Dermatologia (SBD)" },
];

export default function SobrePage() {
  return (
    <>
      <section className="w-full bg-sand-soft px-5 pt-36 pb-20 sm:px-8 sm:pt-44 sm:pb-28 lg:px-14">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <InViewItem>
              <span className="text-[0.6875rem] font-semibold tracking-[0.3em] text-gold uppercase">
                Sobre
              </span>
            </InViewItem>
            <InViewItem className="mt-4">
              <h1 className="font-display text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-espresso sm:text-[3.5rem]">
                {site.name}
              </h1>
            </InViewItem>
            <InViewItem className="mt-6">
              <p className="max-w-lg text-[1.0625rem] leading-relaxed text-espresso/65">
                Cuido da saúde e da beleza da pele como quem entende que autoestima não pede pressa.
                Formada em Dermatologia pela UERJ, com residência em Dermatologia Clínica e fellow
                em Tricologia, sou membro efetivo da Sociedade Brasileira de Dermatologia (SBD) —
                sempre em busca de atualização e das técnicas mais seguras para cada paciente.
              </p>
            </InViewItem>
            <InViewItem className="mt-9">
              <ContactButton variant="primary">Agendar consulta</ContactButton>
            </InViewItem>
          </div>
          <ImagePlaceholder src="/dra-bianca-2.jpg" alt={site.name} aspect="aspect-[4/5]" />
        </div>
      </section>

      <section className="w-full bg-cloud px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="w-full">
          <SectionHeading eyebrow="Formação" title="Trajetória e credenciais" />
          <InViewGroup className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((c) => (
              <InViewItem key={c.year} className="border-t border-espresso/12 pt-5">
                <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-gold uppercase">
                  {c.year}
                </p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-espresso/70">{c.label}</p>
              </InViewItem>
            ))}
          </InViewGroup>
        </div>
      </section>

      <section className="w-full bg-espresso px-5 py-24 text-cloud sm:px-8 sm:py-32 lg:px-14">
        <div className="mx-auto max-w-4xl text-center">
          <InViewItem>
            <span className="text-[0.6875rem] font-semibold tracking-[0.3em] text-gold uppercase">
              Filosofia de atendimento
            </span>
          </InViewItem>
          <InViewItem className="mt-6">
            <p className="font-display text-[1.75rem] leading-[1.3] font-medium tracking-tight text-cloud sm:text-[2.25rem]">
              &ldquo;Acredito em um cuidado que une ciência e escuta, cada tratamento parte de um
              diagnóstico real, não de uma tendência. O objetivo nunca é mudar quem você é, e sim
              devolver a versão mais saudável e descansada da sua própria pele.&rdquo;
            </p>
          </InViewItem>
        </div>
      </section>
    </>
  );
}
