import { InViewGroup, InViewItem } from "./ScrollReveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <InViewGroup className={`flex flex-col ${isCenter ? "items-center text-center" : "items-start text-left"} ${className}`}>
      {eyebrow ? (
        <InViewItem>
          <span className="text-[0.6875rem] font-semibold tracking-[0.3em] text-gold uppercase">
            {eyebrow}
          </span>
        </InViewItem>
      ) : null}
      <InViewItem className={eyebrow ? "mt-3" : ""}>
        <h2 className="font-display text-[2.25rem] leading-[1.08] font-semibold tracking-tight text-espresso sm:text-[2.75rem] lg:text-[3.25rem]">
          {title}
        </h2>
      </InViewItem>
      {subtitle ? (
        <InViewItem className="mt-4">
          <p className={`text-[1rem] leading-relaxed text-espresso/60 ${isCenter ? "mx-auto max-w-xl" : "max-w-lg"}`}>
            {subtitle}
          </p>
        </InViewItem>
      ) : null}
    </InViewGroup>
  );
}
