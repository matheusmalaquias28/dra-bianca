import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/site/Button";
import { InViewGroup, InViewItem } from "@/components/site/ScrollReveal";
import { iconMap } from "@/components/icons";
import { clinics, socialLinks, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Endereços, horários e WhatsApp das clínicas da Dra. Bianca De Franco em Ipanema (Rio de Janeiro) e Niterói.",
  alternates: { canonical: "/contato" },
  openGraph: { url: "/contato", title: "Contato — Dra. Bianca De Franco" },
};

export default function ContatoPage() {
  return (
    <section className="w-full bg-cloud px-5 pt-36 pb-24 sm:px-8 sm:pt-44 sm:pb-32 lg:px-14">
      <div className="w-full">
        <SectionHeading
          eyebrow="Contato"
          title="Vamos agendar sua avaliação"
          subtitle="Escolha a clínica mais perto de você e fale diretamente pelo WhatsApp — resposta rápida, sem intermediários."
        />

        <InViewGroup className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {clinics.map((clinic) => (
            <InViewItem key={clinic.id}>
              <div className="flex h-full flex-col rounded-[1.5rem] border border-espresso/10 bg-sand-soft/50 p-8 sm:p-10">
                <h2 className="font-display text-2xl font-semibold text-espresso">{clinic.name}</h2>

                <div className="mt-6 flex flex-col gap-5">
                  <Field label="Endereço">
                    {clinic.address}
                    {!clinic.addressConfirmed && (
                      <span className="ml-2 text-[0.6875rem] font-semibold tracking-wide text-gold uppercase">
                        A confirmar
                      </span>
                    )}
                  </Field>
                  <Field label="Horário">{clinic.hours}</Field>
                  <Field label="Telefone / WhatsApp">{clinic.phoneLabel}</Field>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={clinic.whatsapp} variant="primary">
                    Agendar no WhatsApp
                  </Button>
                  <Button
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`}
                    variant="ghost"
                    external
                  >
                    Ver no mapa
                  </Button>
                </div>
              </div>
            </InViewItem>
          ))}
        </InViewGroup>

        <InViewItem className="mt-16 flex flex-col items-center gap-5 text-center">
          <p className="text-[0.6875rem] font-semibold tracking-[0.24em] text-espresso/40 uppercase">
            Ou nos encontre nas redes
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.id}
                  href={link.href ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label.replace(" ", " ")}
                  className="flex size-11 items-center justify-center rounded-full border border-espresso/15 text-espresso/70 transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                >
                  <Icon className="size-4.5" />
                </a>
              );
            })}
          </div>
          <p className="text-[0.6875rem] tracking-[0.16em] text-espresso/35 uppercase">{site.crm}</p>
        </InViewItem>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-gold uppercase">{label}</p>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-espresso/70">{children}</p>
    </div>
  );
}
