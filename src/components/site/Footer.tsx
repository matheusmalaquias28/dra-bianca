import Link from "next/link";
import Image from "next/image";
import { Wordmark } from "@/components/brand/Wordmark";
import { iconMap } from "@/components/icons";
import { site, nav, clinics, socialLinks } from "@/config/site";

export function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-espresso text-cloud">
      <div className="grid w-full grid-cols-1 gap-12 px-5 pt-20 pb-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8 lg:px-14">
        <div>
          <Wordmark title={site.name} className="mb-6 hidden h-12 w-auto text-cloud/90 lg:block" />
          <p className="max-w-xs font-display text-2xl leading-snug text-cloud">{site.bio}</p>
          <p className="mt-5 text-[0.6875rem] tracking-[0.2em] text-cloud/35 uppercase">{site.crm}</p>
          <div className="mt-8 flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.id}
                  href={link.href ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label.replace(" ", " ")}
                  className="flex size-11 items-center justify-center rounded-full border border-cloud/15 text-cloud/70 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-espresso"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        <FooterColumn title="Navegação">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="group flex items-center gap-2 py-1 transition-colors hover:text-gold">
              <span className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-4" />
              {item.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Endereços">
          {clinics.map((clinic) => (
            <div key={clinic.id} className="pb-4">
              <p className="text-cloud/90">{clinic.name}</p>
              <p className="text-cloud/45">{clinic.address}</p>
            </div>
          ))}
        </FooterColumn>

        <FooterColumn title="Contato">
          {clinics.map((clinic) => (
            <a key={clinic.id} href={clinic.whatsapp} target="_blank" rel="noopener noreferrer" className="block py-1 transition-colors hover:text-gold">
              {clinic.name} · {clinic.phoneLabel}
            </a>
          ))}
          <p className="mt-4 text-cloud/45">{clinics[0].hours}</p>
        </FooterColumn>
      </div>

      <div className="px-5 sm:px-8 lg:hidden lg:px-14">
        <Wordmark title={site.name} className="h-auto w-full max-w-2xl text-cloud/90" />
      </div>

      <div className="mt-10 border-t border-cloud/10">
        <div className="flex w-full flex-col items-center justify-between gap-3 px-5 py-6 text-[0.75rem] text-cloud/40 sm:flex-row sm:px-8 lg:px-14">
          <p>© {new Date().getFullYear()} {site.name} — {site.specialty} · {site.crm}</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.energymidia.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 transition-colors hover:text-gold"
            >
              <span>Desenvolvido por</span>
              <Image
                src="/images/logo-energy (1).svg"
                alt="Energy Mídia"
                width={829}
                height={311}
                unoptimized
                className="h-4 w-auto opacity-70 transition-opacity group-hover:opacity-100"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[0.6875rem] font-semibold tracking-[0.3em] text-gold uppercase">{title}</h3>
      <div className="mt-5 flex flex-col text-[0.9375rem] leading-relaxed text-cloud/70">{children}</div>
    </div>
  );
}
