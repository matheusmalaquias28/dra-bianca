"use client";

import * as motion from "motion/react-client";
import { iconMap } from "@/components/icons";
import type { SiteLink } from "@/config/site";

export function SocialTile({ link }: { link: SiteLink }) {
  const Icon = iconMap[link.icon];

  return (
    <motion.a
      href={link.href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className="group flex flex-col items-center gap-2 rounded-2xl border border-espresso/10 bg-white/60 px-2 py-4 backdrop-blur-sm transition-colors duration-300 hover:border-gold/45 hover:bg-white"
      aria-label={`Abrir ${link.label} da Dra. Bianca de Franco`}
    >
      <Icon className="size-6 text-espresso/70 transition-colors duration-300 group-hover:text-gold" />
      <span className="text-center text-[0.6875rem] leading-[1.4] font-medium tracking-[0.08em] text-espresso/60 uppercase transition-colors duration-300 group-hover:text-espresso">
        {link.label}
      </span>
    </motion.a>
  );
}
