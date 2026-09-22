"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { Button } from "@/components/site/Button";
import { testimonials } from "@/config/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);
  const t = testimonials[i];

  return (
    <section className="w-full bg-cloud px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[0.6875rem] font-semibold tracking-[0.35em] text-gold uppercase">Depoimentos</p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-espresso">
            Mais de 2.500 pacientes cuidadas.
          </h2>
          <div className="mt-8">
            <Button href="https://www.instagram.com/biancadefranco" variant="ghost" external>
              Ver mais avaliações
            </Button>
          </div>
        </div>

        <div className="relative min-h-[18rem] lg:col-span-8 lg:pl-12">
          <span aria-hidden className="absolute -top-8 left-0 font-display text-[8rem] leading-none text-gold/25 lg:left-8">
            &ldquo;
          </span>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease }}
              className="relative pt-10"
            >
              <p className="font-display text-[clamp(1.5rem,2.8vw,2.75rem)] leading-[1.25] font-medium tracking-tight text-espresso">
                {t.quote}
              </p>
              <footer className="mt-8 text-[0.75rem] font-semibold tracking-[0.2em] text-espresso/50 uppercase">
                {t.name}
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-10 flex gap-2">
            {testimonials.map((x, n) => (
              <button
                key={x.id}
                type="button"
                aria-label={`Depoimento ${n + 1}`}
                onClick={() => setI(n)}
                className={`h-px transition-all duration-500 ${n === i ? "w-12 bg-gold" : "w-6 bg-espresso/25 hover:bg-espresso/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
