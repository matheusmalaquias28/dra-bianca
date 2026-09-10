"use client";

import * as motion from "motion/react-client";
import { ArrowIcon, iconMap } from "@/components/icons";
import type { SiteLink } from "@/config/site";

type LinkCardProps = { link: SiteLink };

export function LinkCard({ link }: LinkCardProps) {
  const Icon = iconMap[link.icon];

  if (link.comingSoon || !link.href) {
    return <ComingSoonCard link={link} />;
  }

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-espresso/12 bg-white/70 px-5 py-4 text-left shadow-[0_1px_2px_rgba(72,55,42,0.04)] backdrop-blur-sm transition-colors duration-300 hover:border-gold/45 hover:bg-white"
    >
      {/* Preenchimento dourado que cresce da esquerda no hover. */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 w-full origin-left scale-x-0 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />

      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-espresso text-cloud transition-colors duration-300 group-hover:bg-gold">
        <Icon className="size-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-display text-[1.0625rem] leading-tight font-semibold tracking-tight text-espresso">
          {link.label}
        </span>
        {link.hint ? (
          <span className="mt-0.5 block text-xs tracking-wide text-espresso/55">
            {link.hint}
          </span>
        ) : null}
      </span>

      <ArrowIcon className="size-5 shrink-0 text-espresso/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold" />
    </motion.a>
  );
}

/**
 * Cartão "em breve": não navega, mas responde ao toque/hover com um brilho
 * que atravessa o cartão e uma troca suave de rótulo.
 */
function ComingSoonCard({ link }: LinkCardProps) {
  const Icon = iconMap[link.icon];

  return (
    <motion.div
      whileHover="active"
      whileTap="active"
      initial="idle"
      animate="idle"
      className="group relative flex w-full cursor-default items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-gold/40 bg-sand/25 px-5 py-4 select-none"
    >
      {/* Brilho que percorre o cartão continuamente. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent animate-shimmer motion-reduce:hidden" />
      </span>

      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
        <Icon className="size-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-display text-[1.0625rem] leading-tight font-semibold tracking-tight text-espresso/75">
          {link.label}
        </span>

        {/* Rótulo que troca no hover sem alterar a altura do cartão. */}
        <span className="relative mt-0.5 block h-4 overflow-hidden text-xs tracking-wide">
          <motion.span
            variants={{ idle: { y: 0, opacity: 1 }, active: { y: -16, opacity: 0 } }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 block whitespace-nowrap text-espresso/55"
          >
            Site oficial
          </motion.span>
          <motion.span
            variants={{ idle: { y: 16, opacity: 0 }, active: { y: 0, opacity: 1 } }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 block whitespace-nowrap font-medium text-gold"
          >
            Novidade a caminho
          </motion.span>
        </span>
      </span>

      <motion.span
        variants={{ idle: { scale: 1, opacity: 0.9 }, active: { scale: 1.06, opacity: 1 } }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className="shrink-0 rounded-full bg-gold/12 px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.18em] whitespace-nowrap text-gold uppercase"
      >
        Em breve
      </motion.span>
    </motion.div>
  );
}
