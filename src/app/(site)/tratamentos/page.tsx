import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { TreatmentCard } from "@/components/site/TreatmentCard";
import { InViewGroup, InViewItem } from "@/components/site/ScrollReveal";
import { treatments, treatmentCategories, technologies } from "@/config/content";

export const metadata: Metadata = {
  title: "Tratamentos",
  description: "Tratamentos dermatológicos e estéticos para rosto, cabelo e pele: botox, preenchimento, skinbooster, ultrassom microfocado, tricologia e mais.",
  alternates: { canonical: "/tratamentos" },
  openGraph: { url: "/tratamentos", title: "Tratamentos — Dra. Bianca De Franco" },
};

export default function TratamentosPage() {
  return (
    <>
      <section className="w-full bg-sand-soft px-5 pt-36 pb-16 sm:px-8 sm:pt-44 sm:pb-20 lg:px-14">
        <div className="w-full">
          <SectionHeading
            eyebrow="Tratamentos"
            title="Um plano para cada objetivo"
            subtitle="Do diagnóstico clínico aos procedimentos estéticos avançados, cada indicação nasce de uma avaliação individual."
          />
        </div>
      </section>

      {treatmentCategories.map((category) => {
        const items = treatments.filter((t) => t.category === category);
        return (
          <section key={category} className="w-full bg-cloud px-5 py-20 sm:px-8 lg:px-14">
            <div className="w-full">
              <InViewItem>
                <h2 className="font-display text-2xl font-semibold text-espresso sm:text-3xl">
                  {category}
                </h2>
              </InViewItem>
              <InViewGroup className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((treatment) => (
                  <TreatmentCard key={treatment.id} treatment={treatment} />
                ))}
              </InViewGroup>
            </div>
          </section>
        );
      })}

      <section className="w-full bg-espresso px-5 py-24 text-cloud sm:px-8 sm:py-32 lg:px-14">
        <div className="w-full">
          <SectionHeading
            eyebrow="Tecnologia"
            title="Equipamentos de última geração"
            subtitle="As tecnologias por trás dos nossos protocolos de rejuvenescimento e rosto."
            className="[&_h2]:text-cloud [&_p]:text-cloud/60"
          />
          <InViewGroup className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map((tech) => (
              <InViewItem key={tech.id}>
                <ImagePlaceholder
                  src={tech.image}
                  alt={tech.name}
                  aspect="aspect-[3/4]"
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                />
                <h3 className="mt-5 font-display text-lg font-medium text-cloud">{tech.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cloud/55">{tech.description}</p>
              </InViewItem>
            ))}
          </InViewGroup>
        </div>
      </section>
    </>
  );
}
