"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import { useTransform, type MotionValue } from "motion/react";
import { ScrollWords, LineReveal } from "@/components/site/ScrollFx";
import { BrandSeal } from "@/components/BrandSeal";

const plateTexturaPele = "/images/Frame 3525 (1).jpg";
const plateDetalheClinica = "/images/Frame 3526 (1).jpg";

export function Manifesto() {
  return (
    // isolate: mantém o bloco sticky contido no próprio contexto de empilhamento.
    <section className="isolate w-full bg-cloud px-5 sm:px-8 lg:px-14">
      <ScrollWords
        heightClass="h-[115vh] lg:h-[240vh]"
        text="É encontrada em momentos de cuidado, em cada gesto pensado e no tempo que se dedica a si. Cada protocolo nasce de um diagnóstico real, não de uma tendência e devolve naturalidade, nunca perfeição artificial."
        // O `vh` no meio do clamp segura o texto dentro da caixa sticky de uma
        // viewport baixa; sem ele o conteúdo transborda e invade a seção seguinte.
        className="mx-auto mt-10 max-w-6xl text-center font-display text-[clamp(1.25rem,min(3.4vw,5.2vh),3.25rem)] leading-[1.25] font-medium tracking-tight text-espresso lg:max-w-[56vw]"
        decor={(progress) => <ManifestoDecor progress={progress} />}
      >
        <div className="mx-auto w-full text-center lg:max-w-[56vw]">
          <BrandSeal className="mx-auto mb-6 size-32 lg:hidden" />
          <p className="text-[0.6875rem] font-semibold tracking-[0.35em] text-gold uppercase">Filosofia</p>
          <LineReveal
            as="h2"
            lines={["BELEZA É CONSEQUÊNCIA", "DE PELE SAUDÁVEL."]}
            className="mt-6 text-center font-display text-[clamp(2rem,min(5.4vw,11vh),7rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-gold"
          />
        </div>
      </ScrollWords>
    </section>
  );
}

/** Placeholders decorativos com parallax ligado à travessia da seção. */
function ManifestoDecor({ progress }: { progress: MotionValue<number> }) {
  const riseY = useTransform(progress, [0, 1], [80, -80]);
  const fallY = useTransform(progress, [0, 1], [-80, 80]);
  const breathe = useTransform(progress, [0, 0.5, 1], [1.06, 1, 1.06]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Desktop: colunas laterais */}
      <motion.div
        style={{ y: riseY, scale: breathe }}
        className="absolute top-[10%] left-0 hidden w-[clamp(7rem,12vw,13rem)] lg:block"
      >
        <Plate aspect="aspect-[3/4]" src={plateTexturaPele} alt="Textura de pele" sizes="13vw" />
      </motion.div>
      <motion.div
        style={{ y: fallY, scale: breathe }}
        className="absolute right-0 bottom-[10%] hidden w-[clamp(7rem,12vw,13rem)] lg:block"
      >
        <Plate aspect="aspect-[3/4]" src={plateDetalheClinica} alt="Detalhe da clínica" sizes="13vw" />
      </motion.div>
    </div>
  );
}

function Plate({ aspect, src, alt, sizes }: { aspect: string; src: string; alt: string; sizes: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.5rem] ${aspect}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-espresso/10" />
    </div>
  );
}
