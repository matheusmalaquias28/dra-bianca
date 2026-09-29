"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import { LineReveal, Parallax } from "@/components/site/ScrollFx";
import { Marquee } from "@/components/site/Marquee";
import { Button } from "@/components/site/Button";
import { clinics } from "@/config/site";
import { technologies, xerfCelebrities, xerfHighlights } from "@/config/content";

const ease = [0.22, 1, 0.36, 1] as const;
const xerf = technologies.find((t) => t.id === "xerf")!;

/** Imagem quadrada (2147×2147) — o contêiner acompanha a proporção para a foto
 *  preencher a caixa inteira. O JPG do config segue em uso no grid de tecnologias. */
const xerfProductShot = "/equipamentos/xerf-famosas.png";

export function XerfSpotlight() {
  return (
    <section className="relative w-full overflow-hidden bg-espresso py-24 text-cloud sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px,#F2F2F2 1px,transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative px-5 sm:px-8 lg:px-14">
        <p className="text-[0.6875rem] font-semibold tracking-[0.35em] text-gold uppercase">
          Destaque · Tecnologia exclusiva
        </p>

        <LineReveal
          lines={["A radiofrequência", "queridinha dos famosos"]}
          className="mt-6 font-display text-[clamp(2.25rem,6vw,6rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-cloud"
        />
      </div>

      <div className="relative mt-8 grid grid-cols-1 gap-10 px-5 sm:mt-10 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-14">
        <div className="lg:col-span-6">
          <Parallax amount={36} className="mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease }}
              className="relative aspect-square w-full overflow-hidden rounded-[2rem]"
            >
              <Image
                src={xerfProductShot}
                alt="XERF — radiofrequência"
                fill
                sizes="(min-width:1024px) 45vw, 90vw"
                className="object-cover"
              />
            </motion.div>
          </Parallax>
        </div>

        {xerfCelebrities.length > 0 ? (
          // No mobile a faixa entra logo abaixo da imagem, seguindo a ordem do DOM;
          // no desktop o `order-last` joga ela para a última linha do grid, inteira.
          <div className="-mx-5 border-y border-cloud/12 py-6 sm:-mx-8 lg:order-last lg:col-span-12 lg:-mx-14 lg:mt-6">
            <Marquee duration={38}>
              {xerfCelebrities.map((name) => (
                <span
                  key={name}
                  className="flex items-center font-display text-[clamp(1.75rem,4vw,3.5rem)] leading-none font-medium tracking-tight text-cloud/80 uppercase"
                >
                  <span className="px-8">{name}</span>
                  <span aria-hidden className="size-2 rounded-full bg-gold" />
                </span>
              ))}
            </Marquee>
          </div>
        ) : null}

        <div className="lg:col-span-6 lg:pl-6">
          <p className="max-w-lg text-[1.0625rem] leading-relaxed text-cloud/70">{xerf.description}</p>

          <ul className="mt-10 border-t border-cloud/12">
            {xerfHighlights.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                className="flex items-baseline gap-5 border-b border-cloud/12 py-5"
              >
                <span className="font-display text-[0.8125rem] tracking-[0.2em] text-gold">
                  0{i + 1}
                </span>
                <span className="text-[1.0625rem] leading-relaxed text-cloud/85">{item}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center lg:justify-start">
            <Button href={clinics[0].whatsapp} variant="light" className="hover:text-espresso!">
              Quero saber mais sobre o XERF
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
}
