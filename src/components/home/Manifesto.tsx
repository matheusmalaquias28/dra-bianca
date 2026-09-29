"use client";

import { useRef } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { useScroll, useTransform } from "motion/react";
import { LineReveal, useRevealOnView } from "@/components/site/ScrollFx";
import { BrandSeal } from "@/components/BrandSeal";

const plateTexturaPele = "/images/Frame 3525 (1).jpg";
const plateDetalheClinica = "/images/Frame 3526 (1).jpg";

const MANIFESTO =
  "É encontrada em momentos de cuidado, em cada gesto pensado e no tempo que se dedica a si. Cada protocolo nasce de um diagnóstico real, não de uma tendência e devolve naturalidade, nunca perfeição artificial.";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  // A cascata das palavras acende sozinha ao entrar na tela — transição CSS, não
  // progresso de scroll, então não depende do rAF nem prende a rolagem.
  const lit = useRevealOnView(paraRef, 0.35);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const riseY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const fallY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const breathe = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-cloud px-5 py-24 sm:px-8 sm:py-32 lg:px-14 lg:py-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <motion.div
          style={{ y: riseY, scale: breathe }}
          className="absolute top-[12%] left-0 w-[clamp(7rem,12vw,13rem)]"
        >
          <Plate src={plateTexturaPele} alt="Textura de pele" />
        </motion.div>
        <motion.div
          style={{ y: fallY, scale: breathe }}
          className="absolute right-0 bottom-[12%] w-[clamp(7rem,12vw,13rem)]"
        >
          <Plate src={plateDetalheClinica} alt="Detalhe da clínica" />
        </motion.div>
      </div>

      <div className="relative mx-auto w-full text-center lg:max-w-[56vw]">
        <BrandSeal className="mx-auto mb-6 size-32 lg:hidden" />
        <p className="text-[0.6875rem] font-semibold tracking-[0.35em] text-gold uppercase">Filosofia</p>
        <LineReveal
          as="h2"
          lines={["BELEZA É CONSEQUÊNCIA", "DE PELE SAUDÁVEL."]}
          className="mt-6 text-center font-display text-[clamp(2rem,5.4vw,7rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-gold"
        />
        <p
          ref={paraRef}
          data-reveal
          className="mt-10 text-center font-display text-[clamp(1.25rem,3.4vw,3.25rem)] leading-[1.25] font-medium tracking-tight text-espresso"
        >
          {MANIFESTO.split(" ").map((word, i) => (
            <span
              key={i}
              style={{ transitionDelay: `${i * 0.028}s` }}
              className={`mr-[0.28em] inline-block transition-opacity duration-500 motion-reduce:opacity-100 motion-reduce:transition-none ${
                lit ? "opacity-100" : "opacity-15"
              }`}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

function Plate({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem]">
      <Image src={src} alt={alt} fill sizes="13vw" className="object-cover" />
      <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-espresso/10" />
    </div>
  );
}
