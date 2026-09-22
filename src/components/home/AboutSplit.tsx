"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import { ScaleIn, LineReveal, ParallaxFrame, Counter } from "@/components/site/ScrollFx";
import { Button } from "@/components/site/Button";
import { site } from "@/config/site";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: 2500, prefix: "+", label: "pacientes atendidas" },
  { value: 2, label: "clínicas · Ipanema e Niterói" },
  { value: 4, label: "tecnologias de última geração" },
];

export function AboutSplit() {
  return (
    <section className="flex min-h-[80vh] w-full items-center bg-sand-soft px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
      <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <ScaleIn className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-auto lg:h-[70vh]" from={0.86}>
            <ParallaxFrame className="!absolute inset-0" strength={10}>
              <Image
                src="/dra-bianca-2.jpg"
                alt={site.name}
                fill
                sizes="(min-width:1024px) 42vw, 100vw"
                className="object-cover object-top"
              />
            </ParallaxFrame>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/50 to-transparent" />
            <p className="absolute bottom-6 left-6 text-[0.625rem] font-semibold tracking-[0.3em] text-cloud/80 uppercase sm:bottom-8 sm:left-8">
              {site.crm}
            </p>
          </ScaleIn>
        </div>

        <div className="flex flex-col justify-between lg:col-span-7 lg:pl-8">
          <div className="lg:sticky lg:top-32">
            <p className="text-[0.6875rem] font-semibold tracking-[0.35em] text-gold uppercase">Quem vai cuidar de você</p>
            <LineReveal
              lines={["Dra. Bianca", "de Franco"]}
              className="mt-6 font-display text-[2.75rem] leading-[0.95] font-semibold tracking-[-0.02em] text-espresso sm:text-[clamp(2rem,6vw,5.5rem)]"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="mt-8 max-w-md text-[1.0625rem] leading-relaxed text-espresso/65"
            >
              Dermatologista pela UERJ, com residência em Dermatologia Clínica e fellow em Tricologia.
              Membro efetivo da Sociedade Brasileira de Dermatologia, atende com um olhar que une
              ciência, escuta e bom senso estético.
            </motion.p>
            <div className="mt-8">
              <Button href="/sobre" variant="ghost">
                Conhecer a trajetória
              </Button>
            </div>

            <dl className="mt-16 grid grid-cols-3 gap-6 border-t border-espresso/12 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-[clamp(1.75rem,3vw,3.5rem)] leading-none font-semibold text-espresso">
                    <Counter to={s.value} prefix={s.prefix} />
                  </dt>
                  <dd className="mt-2 text-[0.75rem] tracking-[0.12em] text-espresso/55 uppercase">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
