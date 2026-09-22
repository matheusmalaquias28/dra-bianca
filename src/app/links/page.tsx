import { Wordmark } from "@/components/brand/Wordmark";
import { AvatarRing } from "@/components/AvatarRing";
import { LinkCard } from "@/components/LinkCard";
import { SocialTile } from "@/components/SocialTile";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { bookingLinks, featuredLinks, socialLinks, site } from "@/config/site";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center overflow-hidden px-5 py-14 sm:py-20">
      <Backdrop />

      <RevealGroup className="flex w-full max-w-md flex-col items-center">
        <RevealItem>
          <AvatarRing className="size-25 sm:size-29" />
        </RevealItem>

        <RevealItem className="mt-6 w-full">
          <h1 className="text-center font-display text-[1.75rem] leading-tight font-semibold tracking-tight text-espresso sm:text-[2rem]">
            {site.name}
          </h1>
        </RevealItem>

        <RevealItem className="mt-2.5 w-full">
          <p className="mx-auto max-w-[19rem] text-center text-sm leading-relaxed text-espresso/65">
            {site.bio}
          </p>
        </RevealItem>

        <RevealItem className="mt-3">
          <p className="text-[0.625rem] tracking-[0.16em] text-espresso/35 uppercase">
            {site.crm}
          </p>
        </RevealItem>

        <RevealItem className="mt-7 flex items-center gap-3">
          <Rule />
          <p className="text-[0.6875rem] font-medium tracking-[0.22em] text-espresso/55 uppercase">
            {site.locations}
          </p>
          <Rule />
        </RevealItem>

        <RevealItem className="mt-10 w-full">
          <SectionLabel>Agendamentos</SectionLabel>
          <nav aria-label="Agendamentos" className="flex flex-col gap-3">
            {bookingLinks.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </nav>
        </RevealItem>

        <RevealItem className="mt-3 w-full">
          {featuredLinks.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </RevealItem>

        <RevealItem className="mt-9 w-full">
          <SectionLabel>Redes sociais</SectionLabel>
          <nav aria-label="Redes sociais" className="grid grid-cols-3 gap-2 sm:gap-3">
            {socialLinks.map((link) => (
              <SocialTile key={link.id} link={link} />
            ))}
          </nav>
        </RevealItem>

        <RevealItem className="mt-14 flex flex-col items-center gap-4">
          <Wordmark
            title={`${site.name} — ${site.specialty}`}
            className="w-full max-w-[13rem] text-espresso/45"
          />
          <p className="text-center text-[0.6875rem] tracking-wide text-espresso/40">
            © {new Date().getFullYear()} {site.name}
          </p>
        </RevealItem>
      </RevealGroup>
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-center text-[0.625rem] font-semibold tracking-[0.24em] text-espresso/40 uppercase">
      {children}
    </h2>
  );
}

function Rule() {
  return <span aria-hidden className="h-px w-8 bg-espresso/20 sm:w-12" />;
}

/** Camadas decorativas de fundo — puramente visuais. */
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-cloud" />
      <div className="absolute -top-1/4 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(208,202,194,0.55),transparent_65%)]" />
      <div className="absolute bottom-[-18rem] left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(177,134,73,0.10),transparent_68%)]" />
    </div>
  );
}
