import Image from "next/image";
import avatar from "../../public/brand/dra-bianca-avatar.webp";

/**
 * Retrato circular da Dra. Bianca com o anel de gradiente no estilo dos
 * stories do Instagram.
 *
 * O anel é um `conic-gradient` desenhado num elemento próprio, que gira
 * lentamente por trás da foto — assim o degradê se move e o retrato fica
 * imóvel. A rotação é CSS puro (composta na GPU) e é neutralizada por
 * `prefers-reduced-motion`.
 */
export function AvatarRing({ className }: { className?: string }) {
  return (
    <div className={`relative isolate ${className ?? ""}`}>
      {/* Anel colorido giratório. */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full animate-ring-spin motion-reduce:animate-none"
        style={{
          backgroundImage:
            "conic-gradient(from 180deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5, #962fbf, #d62976, #fa7e1e, #feda75)",
        }}
      />

      {/* Respiro entre o anel e a foto, como no Instagram. */}
      <span aria-hidden className="absolute inset-[3px] rounded-full bg-cloud" />

      {/* Retrato. */}
      <span className="absolute inset-[6px] overflow-hidden rounded-full">
        <Image
          src={avatar}
          alt="Dra. Bianca de Franco"
          fill
          sizes="(min-width: 640px) 116px, 100px"
          priority
          placeholder="blur"
          className="object-cover"
        />
      </span>
    </div>
  );
}
