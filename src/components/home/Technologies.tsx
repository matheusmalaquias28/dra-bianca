"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import { LineReveal } from "@/components/site/ScrollFx";
import { technologies } from "@/config/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function Technologies() {
  return (
    <section className="w-full bg-cloud py-24 sm:py-32">
      <div className="px-5 sm:px-8 lg:px-14">
        <p className="text-[0.6875rem] font-semibold tracking-[0.35em] text-gold uppercase">Tecnologia</p>
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal
            lines={["Equipamentos de", "última geração."]}
            className="font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-espresso"
          />
          <p className="max-w-sm text-[1.0625rem] leading-relaxed text-espresso/60">
            Os protocolos mais avançados do mercado, para entregar resultado com segurança e conforto.
          </p>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-14">
        {technologies.map((t, i) => (
          <motion.article
            key={t.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease, delay: i * 0.1 }}
            className={`group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[2rem] bg-sand-soft ${i % 2 === 1 ? "lg:mt-16" : ""}`}
          >
            <Image
              src={t.image}
              alt={t.name}
              fill
              sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
            {/* Degradê de baixo para cima na cor original do card (sand-soft) para contraste do texto. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-sand-soft via-sand-soft/70 to-transparent sm:max-[1365px]:h-[80%]"
            />
            <span className="absolute top-6 left-6 font-display text-6xl leading-none font-semibold text-cloud/80 transition-colors duration-500 group-hover:text-gold">
              0{i + 1}
            </span>
            <div className="relative flex flex-col p-6 sm:p-7">
              <h3 className="font-display text-2xl leading-tight font-semibold text-espresso">{t.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-espresso/65">{t.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
