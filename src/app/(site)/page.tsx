import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { TreatmentsCarousel } from "@/components/home/TreatmentsCarousel";
import { AboutSplit } from "@/components/home/AboutSplit";
import { ConcernsList } from "@/components/home/ConcernsList";
import { Technologies } from "@/components/home/Technologies";
import { InstagramRail } from "@/components/home/InstagramRail";
import { BlogTeaser } from "@/components/home/BlogTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Início",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <TreatmentsCarousel />
      <AboutSplit />
      <ConcernsList />
      <Technologies />
      <InstagramRail />
      <BlogTeaser />
      <Testimonials />
      <FinalCta />
    </>
  );
}
