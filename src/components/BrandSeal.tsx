import { SealRing } from "@/components/brand/SealRing";
import { Monogram } from "@/components/brand/Monogram";

type BrandSealProps = {
  className?: string;
  /** Duração de uma volta completa do anel. */
  spinClassName?: string;
};

/**
 * Selo da marca: o anel de texto gira infinitamente enquanto o monograma
 * permanece fixo no centro — a leitura do "BF" nunca fica de cabeça para baixo.
 * A rotação é CSS pura (compositor da GPU) e é neutralizada por
 * `prefers-reduced-motion`.
 */
export function BrandSeal({
  className,
  spinClassName = "animate-seal-spin",
}: BrandSealProps) {
  return (
    <div className={`relative isolate ${className ?? ""}`}>
      <SealRing
        className={`absolute inset-0 h-full w-full text-gold ${spinClassName} [transform-origin:50%_50%] motion-reduce:animate-none`}
      />
      <Monogram className="absolute inset-0 h-full w-full text-espresso" />
    </div>
  );
}
