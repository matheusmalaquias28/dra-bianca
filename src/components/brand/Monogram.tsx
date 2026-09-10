import type { SVGProps } from "react";

type BrandMarkProps = SVGProps<SVGSVGElement> & { title?: string };

/**
 * Monograma BF
 * Traçados vetoriais originais da marca. A cor é herdada de `currentColor`,
 * então basta aplicar `text-*` no elemento pai para trocar a cor.
 */
export function Monogram({ title, ...props }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 570.69 570.08"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M362.14,303.83c-6.33-7.99-15.72-13.69-27.91-16.93l-15.62-4.15,15.66-4.02c10.03-2.59,17.72-7.13,22.84-13.52,4.74-5.91,7.32-13.43,7.66-22.36v-49.48h-25.88v44.38c.04.93.06,1.86.06,2.73s0,1.7-.05,2.53c-.44,12.97-4.41,22.76-11.78,29.12-7.67,6.59-19.8,9.93-36.04,9.93h-26.95v3.82h26.36c17.95,0,31.63,4.21,40.65,12.5,9.14,8.36,13.78,21.13,13.78,37.98,0,14.18-4.09,24.83-12.15,31.61-7.84,6.62-20.15,9.97-36.57,9.97l-36.98.04v4.07h46.75c22.71,0,39.61-4.03,50.24-11.98,10.26-7.71,15.47-19.84,15.47-36.05,0-12.09-3.21-22.25-9.54-30.21Z" /> <polygon points="315.87 193.38 217.08 193.38 217.08 382.02 242.09 382.02 242.09 382.07 244.84 382.07 244.84 356.3 244.78 204.36 315.87 204.36 315.87 193.38" /> 
    </svg>
  );
}
