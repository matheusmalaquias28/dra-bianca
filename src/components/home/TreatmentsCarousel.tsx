"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { LineReveal } from "@/components/site/ScrollFx";
import { Button } from "@/components/site/Button";
import { ArrowIcon } from "@/components/icons";
import { treatments } from "@/config/content";

const ease = [0.22, 1, 0.36, 1] as const;

const trackVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
};


export function TreatmentsCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const id = requestAnimationFrame(sync);
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(id);
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const amount = card ? card.clientWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    // relative/z-10: a seção anterior é sticky (elemento posicionado) e pintaria
    // por cima desta, que é estática, se as duas se encostarem na rolagem.
    <section className="relative z-10 w-full bg-cloud py-24 sm:py-32">
      <div className="px-5 text-center sm:px-8 sm:text-left lg:px-14">
        <LineReveal
          lines={["Uma experiência sensorial,", "pensada em cada detalhe"]}
          className="font-display text-[clamp(2rem,5.5vw,5.5rem)] leading-[1] font-semibold tracking-[-0.01em] text-gold uppercase"
        />
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
          className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-relaxed text-espresso/55 sm:mx-0"
        >
          Do rosto ao couro cabeludo, com plano individual.
        </motion.p>
      </div>

      <motion.ul
        ref={trackRef}
        variants={trackVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-5 py-4 pl-5 sm:scroll-pl-8 sm:pl-8 lg:scroll-pl-14 lg:pl-14"
      >
        {treatments.map((t, i) => (
          <motion.li
            key={t.id}
            variants={cardVariants}
            className="w-[76vw] shrink-0 snap-start sm:w-[44vw] lg:w-[26vw] xl:w-[21vw] last:mr-5 sm:last:mr-8 lg:last:mr-14"
          >
            <a
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[3/4] overflow-hidden rounded-[1.75rem]"
            >
              <Image
                src={t.image}
                alt={t.label}
                fill
                sizes="(min-width:1280px) 21vw, (min-width:1024px) 26vw, (min-width:640px) 44vw, 76vw"
                className="object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/10 to-transparent opacity-85 transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6">
                <span className="text-[0.625rem] font-semibold tracking-[0.28em] text-cloud/70 uppercase">
                  {t.category}
                </span>
                <span className="flex size-10 items-center justify-center rounded-full border border-cloud/30 text-cloud transition-all duration-500 group-hover:border-cloud group-hover:bg-cloud group-hover:text-espresso">
                  <ArrowIcon className="size-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-[clamp(1.5rem,2.1vw,2.25rem)] leading-[1.05] font-medium tracking-tight text-cloud uppercase">
                  {t.label}
                </h3>
                <p className="mt-3 max-h-0 translate-y-2 overflow-hidden text-sm leading-relaxed text-cloud/75 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-h-28 group-hover:translate-y-0 group-hover:opacity-100">
                  {t.description}
                </p>
              </div>
            </a>
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-10 flex items-center justify-between gap-6 px-5 sm:px-8 lg:px-14">
        <Button href="/tratamentos" variant="ghost">
          Explorar tratamentos
        </Button>

        <div className="flex items-center gap-3">
          <CarouselArrow direction="prev" disabled={atStart} onClick={() => step(-1)} />
          <CarouselArrow direction="next" disabled={atEnd} onClick={() => step(1)} />
        </div>
      </div>
    </section>
  );
}

function CarouselArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Tratamento anterior" : "Próximo tratamento"}
      className="flex size-12 items-center justify-center rounded-full border border-espresso/25 text-espresso transition-all duration-500 hover:border-gold hover:bg-gold hover:text-cloud disabled:pointer-events-none disabled:opacity-30"
    >
      <ArrowIcon className={`size-4 ${direction === "prev" ? "rotate-180" : ""}`} />
    </button>
  );
}
