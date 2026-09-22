"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import type { SVGProps } from "react";

type Tone = "sand" | "espresso" | "gold";

type ImagePlaceholderProps = {
  /** Se informado, renderiza a foto real no lugar do placeholder — troca futura sem mexer no layout. */
  src?: string;
  alt?: string;
  /** O que deveria entrar ali — some quando `src` é passado. */
  caption?: string;
  aspect?: string;
  tone?: Tone;
  className?: string;
  priority?: boolean;
  sizes?: string;
  rounded?: boolean;
};

const tones: Record<Tone, string> = {
  sand: "from-sand via-sand-soft to-cloud",
  espresso: "from-espresso via-espresso-soft to-gold-deep",
  gold: "from-gold/50 via-sand to-cloud",
};

export function ImagePlaceholder({
  src,
  alt = "",
  caption,
  aspect = "aspect-[4/5]",
  tone = "sand",
  className = "",
  priority,
  sizes,
  rounded = true,
}: ImagePlaceholderProps) {
  const radius = rounded ? "rounded-[1.25rem]" : "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className={`group relative isolate overflow-hidden bg-sand-soft ${radius} ${aspect} ${className}`}
    >
      {src ? (
        <motion.div
          variants={{ hover: { scale: 1.06 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes ?? "100vw"}
            className="object-cover"
          />
        </motion.div>
      ) : (
        <>
          <motion.div
            aria-hidden
            variants={{ hover: { scale: 1.08 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-0 bg-gradient-to-br ${tones[tone]}`}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <PhotoIcon className="size-7 text-espresso/25" />
            {caption ? (
              <p className="max-w-[16rem] text-[0.6875rem] leading-relaxed font-semibold tracking-[0.1em] text-espresso/40 uppercase">
                {caption}
              </p>
            ) : null}
          </div>
        </>
      )}
      <motion.div
        aria-hidden
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/20 via-transparent to-transparent"
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ring-1 ring-inset ring-espresso/10 ${radius}`}
      />
    </motion.div>
  );
}

function PhotoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5.5" width="18" height="14" rx="2.2" />
      <circle cx="9" cy="11" r="2.2" />
      <path d="m3 17 5-4.2 3.2 2.6L17 10l4 4.6" />
    </svg>
  );
}
