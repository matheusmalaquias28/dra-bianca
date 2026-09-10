import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  focusable: "false",
} as const;

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24Zm-4.5 4.42c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26 0 1.33.97 2.62 1.11 2.8.14.18 1.9 2.9 4.62 3.96 2.26.88 2.72.7 3.21.66.49-.05 1.58-.64 1.8-1.27.22-.62.22-1.16.16-1.27-.07-.11-.25-.18-.52-.31-.27-.14-1.58-.78-1.83-.87-.24-.09-.42-.13-.6.14-.18.27-.69.86-.84 1.04-.16.18-.31.2-.58.07-.27-.14-1.13-.42-2.16-1.33-.8-.71-1.34-1.59-1.49-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.46-.83-1.99-.21-.51-.43-.44-.6-.45h-.55Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* Glifo sólido, com a lente e o ponto vazados — mesmo peso visual do
          TikTok e do YouTube. */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.3 2.8h7.4a5.5 5.5 0 0 1 5.5 5.5v7.4a5.5 5.5 0 0 1-5.5 5.5H8.3a5.5 5.5 0 0 1-5.5-5.5V8.3a5.5 5.5 0 0 1 5.5-5.5Zm3.7 4.97a4.23 4.23 0 1 0 0 8.46 4.23 4.23 0 0 0 0-8.46Zm0 1.47a2.76 2.76 0 1 1 0 5.52 2.76 2.76 0 0 1 0-5.52Zm4.97-3.21a1.06 1.06 0 1 0 0 2.12 1.06 1.06 0 0 0 0-2.12Z"
      />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.03-2.82h-3.1v11.9a2.44 2.44 0 0 1-2.44 2.4 2.44 2.44 0 1 1 .7-4.78V9.35a5.55 5.55 0 0 0-.7-.05A5.56 5.56 0 1 0 15.6 14.9V8.7a7.34 7.34 0 0 0 4.29 1.37V6.98a4.28 4.28 0 0 1-3.28-1.16Z" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26.1 26.1 0 0 0 2 12a26.1 26.1 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.1 26.1 0 0 0 22 12a26.1 26.1 0 0 0-.42-4.81ZM10.05 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h13m0 0-5.5-5.5M18 12l-5.5 5.5" />
    </svg>
  );
}

export const iconMap = {
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
  globe: GlobeIcon,
} as const;
