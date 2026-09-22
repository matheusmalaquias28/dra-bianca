"use client";

import { useRef } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { useScroll, useTransform } from "motion/react";
import { LineReveal } from "@/components/site/ScrollFx";
import { Button } from "@/components/site/Button";
import { clinics } from "@/config/site";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const radius = useTransform(scrollYProgress, [0, 0.6], ["4rem", "0rem"]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.94, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="w-full bg-sand-soft px-0 pt-8">
      <motion.div
        style={{ borderTopLeftRadius: radius, borderTopRightRadius: radius, scale }}
        className="relative min-h-[90svh] w-full origin-bottom overflow-hidden bg-espresso lg:h-[900px] lg:min-h-[900px] lg:bg-[#4F3426]"
      >
        <motion.div aria-hidden style={{ y: bgY }} className="absolute -inset-y-[15%] inset-x-0 hidden lg:block">
          <Image src="/images/bg-gooter.jpg" alt="" fill sizes="100vw" className="object-contain object-right" />
        </motion.div>
        <div className="relative flex min-h-[90svh] flex-col justify-between gap-16 px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[900px] lg:px-14 lg:py-24">
          <p className="text-[0.6875rem] font-semibold tracking-[0.35em] text-gold uppercase">Autocuidado</p>
          <div className="flex flex-col gap-10">
            <Image
              src="/images/img-footer-mobile-dra-bianca.jpg"
              alt="Dra. Bianca de Franco"
              width={783}
              height={1009}
              quality={100}
              sizes="100vw"
              className="w-full rounded-[1.75rem] lg:hidden"
            />
            <LineReveal
              lines={["Dê o próximo", "passo na jornada", "do autocuidado."]}
              className="font-display text-[clamp(3rem,9vw,9rem)] leading-[0.92] font-semibold tracking-[-0.03em] text-cloud lg:text-[clamp(2.55rem,7.65vw,7.65rem)]"
            />
            <div className="flex shrink-0 flex-col gap-6 lg:max-w-sm">
              <p className="text-[1.0625rem] leading-relaxed text-cloud/65">
                Agende uma avaliação e descubra o protocolo pensado especificamente pra sua pele.
              </p>
              <div className="flex flex-wrap gap-3">
                {clinics.map((c) => (
                  <Button key={c.id} href={c.whatsapp} variant="light" className="hover:text-espresso!">
                    {c.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
