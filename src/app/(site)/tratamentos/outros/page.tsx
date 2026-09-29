import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/site/SectionHeading";
import { OtherTreatmentsList } from "@/components/site/OtherTreatmentsList";
import { InViewItem } from "@/components/site/ScrollReveal";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Demais tratamentos",
  description:
    "Lista completa dos procedimentos oferecidos: skinbooster, microagulhamento, MMP e laser capilar, lasers para manchas, rugas, tatuagem e cicatrizes, biópsia de lesões de pele e aplicações corporais.",
  alternates: { canonical: "/tratamentos/outros" },
  openGraph: { url: "/tratamentos/outros", title: "Demais tratamentos — Dra. Bianca De Franco" },
};

export default function OutrosTratamentosPage() {
  return (
    <>
      <section className="w-full bg-sand-soft px-5 pt-36 pb-16 sm:px-8 sm:pt-44 sm:pb-20 lg:px-14">
        <InViewItem>
          <Link
            href="/tratamentos"
            className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium tracking-[0.12em] text-espresso/50 uppercase transition-colors hover:text-gold"
          >
            <ArrowIcon className="size-3.5 rotate-180" />
            Voltar para tratamentos
          </Link>
        </InViewItem>
        <div className="mt-6 w-full">
          <SectionHeading
            eyebrow="Lista completa"
            title="Demais tratamentos oferecidos"
            subtitle="Procedimentos disponíveis na clínica além dos destaques. A indicação e o número de sessões são definidos na consulta."
          />
        </div>
      </section>

      <section className="w-full bg-cloud px-5 py-16 sm:px-8 lg:px-14">
        <OtherTreatmentsList />
      </section>
    </>
  );
}
