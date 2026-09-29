"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import * as motion from "motion/react-client";
import { useScroll, useTransform, useSpring } from "motion/react";

/**
 * Marca `true` uma vez, quando o elemento entra na tela.
 *
 * O timer é rede de segurança, não enfeite: num documento oculto (aba em
 * segundo plano, janela minimizada) o navegador suspende o pipeline de
 * renderização e o IntersectionObserver — junto com o rAF — simplesmente não
 * dispara. Sem essa saída, qualquer conteúdo que nasce escondido esperando o
 * observer ficaria invisível para sempre. Timers continuam rodando.
 */
export function useRevealOnView(ref: RefObject<Element | null>, threshold = 0.12) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { threshold },
    );
    io.observe(el);

    const safety = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) setShown(true);
    }, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [ref, threshold]);

  return shown;
}

/** Desloca o filho verticalmente conforme ele atravessa a viewport. */
export function Parallax({
  children,
  amount = 80,
  className = "",
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Imagem/placeholder que "respira": o conteúdo interno se move mais devagar que a moldura. */
export function ParallaxFrame({
  children,
  className = "",
  strength = 12,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute -inset-y-[15%] inset-x-0">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Revela cada linha de baixo para cima com clip — pra headlines.
 *
 * Usa IntersectionObserver + transição CSS em vez do Motion de propósito: o
 * callback do observer roda na main thread e a transição roda no compositor,
 * então o título aparece mesmo quando o requestAnimationFrame está estrangulado
 * (aba em segundo plano, janela oculta, economia de energia). Com o Motion, um
 * rAF que não dispara deixava o texto preso em translateY(145%) — invisível.
 */
export function LineReveal({
  lines,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const shown = useRevealOnView(ref);

  return (
    <Tag ref={ref} data-reveal className={className}>
      {lines.map((line, i) => (
        // O padding dá folga para acentos e descendentes, que estouram a caixa
        // de linha quando o leading é menor que 1; a margem negativa devolve o espaço.
        <span key={i} className="block overflow-hidden pt-[0.16em] -mt-[0.16em] pb-[0.28em] -mb-[0.28em]">
          <span
            style={{ transitionDelay: `${delay + i * 0.09}s` }}
            className={`block transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:transition-none ${
              shown ? "translate-y-0" : "translate-y-[145%]"
            }`}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Escala o filho de `from` até 1 enquanto ele entra — pra imagem grande que "abre". */
export function ScaleIn({
  children,
  className = "",
  from = 0.82,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const raw = useTransform(scrollYProgress, [0, 1], [from, 1]);
  const scale = useSpring(raw, { stiffness: 80, damping: 24, mass: 0.6 });
  const radius = useTransform(scrollYProgress, [0, 1], ["3rem", "1.5rem"]);
  return (
    <motion.div ref={ref} style={{ scale, borderRadius: radius }} className={`overflow-hidden ${className}`}>
      {children}
    </motion.div>
  );
}

/** Contador que sobe até `to` quando entra na tela. */
export function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      onViewportEnter={() => {
        const el = ref.current;
        if (!el) return;
        const start = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${prefix}${Math.round(to * eased).toLocaleString("pt-BR")}${suffix}`;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
    >
      {prefix}0{suffix}
    </motion.span>
  );
}
