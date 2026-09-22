"use client";

import { useState } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { LineReveal } from "@/components/site/ScrollFx";
import { ArrowIcon } from "@/components/icons";
import { concerns } from "@/config/content";
import { useContactModal } from "@/components/site/ContactModal";

const ease = [0.22, 1, 0.36, 1] as const;

export function ConcernsList() {
  const [active, setActive] = useState<number | null>(null);
  const { open } = useContactModal();

  return (
    <section className="w-full bg-espresso px-5 py-24 text-cloud sm:px-8 sm:py-32 lg:px-14">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="text-[0.6875rem] font-semibold tracking-[0.35em] text-gold uppercase">Diagnóstico</p>
            <LineReveal
              lines={["O que", "incomoda", "você?"]}
              className="mt-6 font-display text-[3.25rem] leading-[0.92] font-semibold tracking-[-0.03em] text-cloud sm:text-[clamp(2.1rem,4.9vw,5.25rem)]"
            />
            <p className="mt-8 max-w-sm text-[1.0625rem] leading-relaxed text-cloud/55">
              Fale sobre o que te tira a confiança e a gente traduz isso em plano de tratamento.
            </p>

            <div className="relative mt-12 hidden aspect-[4/3] w-full max-w-md overflow-hidden rounded-[2rem] lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active ?? "idle"}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active === null ? "/images/ruga-feminina (1).jpg" : concerns[active].image}
                    alt={active === null ? "Detalhe de pele" : concerns[active].label}
                    fill
                    sizes="28rem"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
              {active !== null ? (
                <p className="absolute bottom-5 left-6 text-[0.625rem] font-semibold tracking-[0.3em] text-cloud/80 uppercase">
                  {concerns[active].label}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <ul className="lg:col-span-7">
          {concerns.map((c, i) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.06 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group border-t border-cloud/12 last:border-b"
            >
              <button
                type="button"
                onClick={open}
                className="flex w-full items-start gap-6 py-7 text-left sm:gap-10 sm:py-9"
              >
                <span className="pt-2 font-display text-sm tracking-[0.2em] text-gold">0{i + 1}</span>
                <span className="flex-1">
                  <span className="block font-display text-[2.25rem] leading-none font-medium tracking-tight text-cloud transition-all duration-500 group-hover:translate-x-3 group-hover:text-gold sm:text-[clamp(1.75rem,3.5vw,3.5rem)]">
                    {c.label}
                  </span>
                  <span className="mt-3 block max-w-md text-sm leading-relaxed text-cloud/50 transition-colors duration-500 group-hover:text-cloud/75">
                    {c.description}
                  </span>
                </span>
                <span className="mt-2 flex size-11 shrink-0 items-center justify-center rounded-full border border-cloud/20 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-espresso">
                  <ArrowIcon className="size-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
