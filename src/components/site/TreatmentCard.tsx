import { ImagePlaceholder } from "./ImagePlaceholder";
import { InViewItem } from "./ScrollReveal";
import { ArrowIcon } from "@/components/icons";
import type { Treatment } from "@/config/content";

export function TreatmentCard({ treatment, tall = false }: { treatment: Treatment; tall?: boolean }) {
  return (
    <InViewItem className="group">
      <a href={treatment.href} target="_blank" rel="noopener noreferrer" className="block">
        <ImagePlaceholder
          src={treatment.image}
          alt={treatment.label}
          tone={tall ? "espresso" : "sand"}
          aspect="aspect-[3/4]"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.625rem] font-semibold tracking-[0.2em] text-gold uppercase">
              {treatment.category}
            </p>
            <h3 className="mt-1.5 font-display text-lg font-medium text-espresso">{treatment.label}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-espresso/55">{treatment.description}</p>
          </div>
          <ArrowIcon className="mt-1.5 size-4 shrink-0 text-espresso/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold" />
        </div>
      </a>
    </InViewItem>
  );
}
