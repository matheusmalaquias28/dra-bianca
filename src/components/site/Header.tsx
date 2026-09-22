"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence, type Variants } from "motion/react";
import { Wordmark } from "@/components/brand/Wordmark";
import { BrandSeal } from "@/components/BrandSeal";
import { iconMap } from "@/components/icons";
import { nav, site, socialLinks } from "@/config/site";
import { ContactButton } from "./ContactButton";

const ease = [0.22, 1, 0.36, 1] as const;

const overlayVariants: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.7, ease, when: "beforeChildren", staggerChildren: 0.08, delayChildren: 0.15 },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.5, ease, when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  exit: { opacity: 0, y: 24, transition: { duration: 0.3, ease } },
};

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`w-full border-b backdrop-blur-md transition-all duration-500 ${
          open
            ? "border-transparent bg-transparent backdrop-blur-none"
            : scrolled
              ? "border-espresso/10 bg-cloud/80 shadow-[0_1px_0_rgba(72,55,42,0.04)] backdrop-blur-xl"
              : "border-transparent bg-cloud/35"
        }`}
      >
        <div
          className={`flex w-full items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-14 ${
            scrolled ? "py-3.5" : "py-6"
          }`}
        >
          <Link href="/" aria-label={site.name} className="shrink-0">
            <Wordmark
              title={site.name}
              className={`h-6 w-auto transition-colors duration-300 sm:h-7 ${open ? "text-cloud" : "text-espresso"}`}
            />
          </Link>

          <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-[0.8125rem] font-medium tracking-[0.06em] text-espresso/70 uppercase transition-colors hover:text-espresso"
                >
                  {item.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-x-4 -bottom-0.5 h-px bg-gold"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <ContactButton variant="primary">Agendar consulta</ContactButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className={`relative size-10 flex-col items-center justify-center gap-1.5 lg:hidden ${open ? "hidden" : "flex"}`}
          >
            <span className="h-px w-5 bg-espresso" />
            <span className="h-px w-5 bg-espresso" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col bg-espresso text-cloud lg:hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px,#F2F2F2 1px,transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />

            <BrandSeal
              className="pointer-events-none absolute -top-12 -left-12 size-48 [&_svg:last-child]:text-cloud"
              spinClassName="[animation:seal-spin_16s_linear_infinite] motion-reduce:[animation:none]"
            />

            <motion.button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.35, duration: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="absolute top-5 right-5 z-10 flex items-center gap-2 rounded-full border border-cloud/25 py-2 pr-4 pl-3 text-[0.6875rem] font-semibold tracking-[0.2em] text-cloud/80 uppercase transition-colors duration-300 hover:border-gold hover:text-gold sm:top-6 sm:right-8"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
              Fechar
            </motion.button>

            <nav
              aria-label="Navegação mobile"
              className="relative flex flex-1 flex-col justify-center gap-1 px-6 pt-24 pb-10 sm:px-10"
            >
              {nav.map((item, i) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <motion.div key={item.href} variants={itemVariants} className="overflow-hidden">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 py-2"
                    >
                      <span className="w-8 shrink-0 text-[0.6875rem] font-semibold tracking-[0.2em] text-gold/80 tabular-nums">
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-[clamp(2.5rem,11vw,4rem)] leading-[1.02] font-medium tracking-[-0.02em] uppercase transition-colors duration-300 ${
                          active ? "text-gold" : "text-cloud group-hover:text-gold"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              variants={itemVariants}
              className="relative flex flex-col gap-6 border-t border-cloud/12 px-6 pt-8 pb-10 sm:px-10"
            >
              <div onClick={() => setOpen(false)}>
                <ContactButton variant="light" className="w-full">
                  Agendar consulta
                </ContactButton>
              </div>
              <div className="flex items-center justify-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.id}
                      href={link.href ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex size-11 items-center justify-center rounded-full border border-cloud/15 text-cloud/70 transition-all duration-500 hover:border-gold hover:bg-gold hover:text-espresso"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
