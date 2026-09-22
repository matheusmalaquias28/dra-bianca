"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/icons";

type Variant = "primary" | "light" | "ghost" | "link";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  primary:
    "rounded-full bg-espresso px-7 py-3.5 text-[0.8125rem] uppercase tracking-[0.14em] text-cloud shadow-[0_10px_30px_-12px_rgba(72,55,42,0.55)] hover:bg-gold",
  light:
    "rounded-full bg-cloud px-7 py-3.5 text-[0.8125rem] uppercase tracking-[0.14em] text-espresso shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] hover:bg-gold hover:text-cloud",
  ghost:
    "rounded-full border border-espresso/25 px-7 py-3.5 text-[0.8125rem] uppercase tracking-[0.14em] text-espresso hover:border-espresso hover:bg-espresso hover:text-cloud",
  link: "text-[0.8125rem] uppercase tracking-[0.16em] text-espresso underline-offset-4 hover:text-gold",
};

export function Button({ href, onClick, children, variant = "primary", className = "", external }: ButtonProps) {
  const content = (
    <motion.span
      whileHover={{ y: variant === "link" ? 0 : -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
      {variant === "link" && (
        <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </motion.span>
  );

  if (!href && onClick) {
    return (
      <button type="button" onClick={onClick} className="contents">
        {content}
      </button>
    );
  }

  if (external || href!.startsWith("http") || href!.startsWith("https://wa.me")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href!}>{content}</Link>;
}
