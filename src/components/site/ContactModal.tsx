"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { clinics } from "@/config/site";
import { ArrowIcon } from "@/components/icons";

const ease = [0.22, 1, 0.36, 1] as const;

const ContactModalContext = createContext<{ open: () => void } | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal precisa estar dentro de <ContactModalProvider>.");
  return ctx;
}

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <ContactModalContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="contact-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            onClick={close}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-espresso/60 px-5 backdrop-blur-sm"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Escolha a clínica"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.45, ease }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-[1.75rem] bg-cloud p-6 shadow-[0_40px_100px_-30px_rgba(72,55,42,0.6)] sm:p-8"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Fechar"
                className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full border border-espresso/20 text-espresso/70 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <p className="text-[0.6875rem] font-semibold tracking-[0.35em] text-gold uppercase">Agendar consulta</p>
              <h2 className="mt-3 font-display text-2xl leading-tight font-semibold text-espresso sm:text-3xl">
                Em qual clínica você prefere?
              </h2>

              <div className="mt-6 flex flex-col gap-3">
                {clinics.map((clinic) => (
                  <a
                    key={clinic.id}
                    href={clinic.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-espresso/12 bg-sand-soft/40 p-5 transition-all duration-300 hover:border-gold hover:bg-sand-soft"
                  >
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-medium text-espresso">{clinic.name}</span>
                      <span className="mt-0.5 block text-xs leading-snug text-espresso/45">{clinic.address}</span>
                      <span className="mt-1 block text-sm text-espresso/55">{clinic.phoneLabel}</span>
                    </span>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-espresso/20 text-espresso transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-cloud">
                      <ArrowIcon className="size-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ContactModalContext.Provider>
  );
}
