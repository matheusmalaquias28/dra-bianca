"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { BrandSeal } from "@/components/BrandSeal";

const ease = [0.22, 1, 0.36, 1] as const;
/** Tempo mínimo em tela para o giro do selo ser percebido, mesmo em load instantâneo. */
const MIN_DURATION = 700;

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const finish = () => {
      const wait = Math.max(0, MIN_DURATION - (performance.now() - start));
      window.setTimeout(() => setVisible(false), wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = visible ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cloud"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease }}
          >
            <BrandSeal
              className="size-24 sm:size-28"
              spinClassName="[animation:seal-spin_3s_linear_infinite] motion-reduce:[animation:none]"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
