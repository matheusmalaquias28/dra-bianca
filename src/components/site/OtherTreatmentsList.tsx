import { InViewGroup, InViewItem } from "@/components/site/ScrollReveal";
import { ArrowIcon } from "@/components/icons";
import { otherTreatments } from "@/config/content";

/** Lista simplificada dos demais procedimentos — sem foto, cada item abre o
 *  WhatsApp com a mensagem pré-preenchida. Usada na página de tratamentos e na
 *  rota dedicada. */
export function OtherTreatmentsList() {
  return (
    <>
      {otherTreatments.map((group) => (
        <div key={group.title} className="mt-12 first:mt-0">
          <InViewItem>
            <h3 className="font-display text-xl font-semibold text-espresso sm:text-2xl">
              {group.title}
            </h3>
          </InViewItem>

          <InViewGroup className="mt-6 border-t border-espresso/12">
            {group.items.map((item) => (
              <InViewItem key={item.name} className="group border-b border-espresso/12">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-6 py-6"
                >
                  <span className="min-w-0">
                    <span className="block font-display text-xl leading-tight font-medium text-espresso transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold sm:text-2xl">
                      {item.name}
                    </span>
                    {item.detail ? (
                      <span className="mt-1.5 block text-sm leading-relaxed text-espresso/55">
                        {item.detail}
                      </span>
                    ) : null}
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-espresso/20 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-cloud">
                    <ArrowIcon className="size-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                  </span>
                </a>
              </InViewItem>
            ))}
          </InViewGroup>
        </div>
      ))}
    </>
  );
}
