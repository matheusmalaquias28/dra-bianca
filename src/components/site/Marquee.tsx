"use client";

import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Segundos por volta. */
  duration?: number;
  reverse?: boolean;
};

export function Marquee({ children, className = "", duration = 40, reverse = false }: MarqueeProps) {
  return (
    <div className={`group flex w-full overflow-hidden ${className}`}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
