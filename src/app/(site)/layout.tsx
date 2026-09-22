import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ContactModalProvider } from "@/components/site/ContactModal";
import { Preloader } from "@/components/site/Preloader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContactModalProvider>
      <Preloader />
      <SmoothScroll />
      <Header />
      <main className="flex min-h-dvh flex-col overflow-x-clip">{children}</main>
      <Footer />
    </ContactModalProvider>
  );
}
