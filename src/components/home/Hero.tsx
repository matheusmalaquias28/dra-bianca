"use client";

import { useRef } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { useScroll, useTransform } from "motion/react";
import { BrandSeal } from "@/components/BrandSeal";
import { LineReveal } from "@/components/site/ScrollFx";
import { ContactButton } from "@/components/site/ContactButton";

const ease = [0.22, 1, 0.36, 1] as const;
const lines = ["Rejuvenescimento", "com naturalidade", "e elegância."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const radius = useTransform(scrollYProgress, [0, 0.5], ["0rem", "4rem"]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[40rem] w-full">
      <motion.div style={{ borderBottomLeftRadius: radius, borderBottomRightRadius: radius }} className="sticky top-0 h-[100svh] w-full overflow-hidden bg-espresso">
        <motion.div aria-hidden style={{ scale: bgScale, y: bgY }} className="absolute inset-0 origin-center">
          <Image
            src="/images/bg-mobile-dra-bianca.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover sm:hidden"
          />
          <Image
            src="/images/bg-desktop-dra-bianca-de-franco.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden object-cover sm:block"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.6 }}
          className="absolute top-28 right-5 hidden sm:right-8 sm:block lg:right-14"
        >
          <BrandSeal className="size-28 lg:size-36 [&_svg:last-child]:text-cloud" />
        </motion.div>

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-x-0 bottom-0 flex flex-col gap-8 px-5 pb-12 sm:px-8 sm:pb-16 lg:px-14 lg:pb-20"
        >
          <LineReveal
            as="h1"
            lines={lines}
            delay={0.25}
            className="font-display text-[clamp(3rem,6.6vw,6.3rem)] leading-[0.92] font-semibold tracking-[-0.03em] text-espresso lg:text-[clamp(2.55rem,5.61vw,5.355rem)]"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.9 }}
            className="flex max-w-sm flex-col gap-6"
          >
            <p className="text-[0.6875rem] font-semibold tracking-[0.35em] text-gold uppercase">
              Dermatologia · Ipanema &amp; Niterói
            </p>
            <p className="text-[1.0625rem] leading-relaxed text-espresso-soft">
              Dermatologia clínica e estética conduzida com técnica e sensibilidade — resultados que
              parecem seus, só que descansados.
            </p>
            <div>
              <ContactButton variant="primary">Agendar consulta</ContactButton>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
