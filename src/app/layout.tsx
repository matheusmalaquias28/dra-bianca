import type { Metadata, Viewport } from "next";
import { flatline, manrope } from "./fonts";
import { site, keywords } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const ogImage = {
  url: site.ogImage,
  width: site.ogImageWidth,
  height: site.ogImageHeight,
  alt: `${site.name} — ${site.specialty}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Dermatologista em Ipanema e Niterói`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  keywords,
  category: "health",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} — Dermatologista em Ipanema e Niterói`,
    description: site.description,
    url: site.url,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Dermatologista em Ipanema e Niterói`,
    description: site.description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#48372a",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${flatline.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <JsonLd data={siteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
