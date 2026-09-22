import Image from "next/image";
import { Marquee } from "@/components/site/Marquee";
import { InstagramIcon } from "@/components/icons";

const posts = [
  { src: "/Instagram/instagram-post-dra-bianca-1.jpg", href: "https://www.instagram.com/p/DdUaYyxBuxu/" },
  { src: "/Instagram/instagram-post-dra-bianca-2.jpg", href: "https://www.instagram.com/p/DalsB2mhw2U/" },
  { src: "/Instagram/instagram-post-dra-bianca-3.jpg", href: "https://www.instagram.com/p/DdZl1QnB8RC/" },
  { src: "/Instagram/instagram-post-dra-bianca-4.jpg", href: "https://www.instagram.com/p/DdbtQOCowqZ/?img_index=1" },
  { src: "/Instagram/instagram-post-dra-bianca-5.jpg", href: "https://www.instagram.com/p/DdJrvEUlU8z" },
  { src: "/Instagram/instagram-post-dra-bianca-6.jpg", href: "https://www.instagram.com/p/DdHiWsvhOR_/" },
  { src: "/Instagram/instagram-post-dra-bianca-7.jpg", href: "https://www.instagram.com/p/DdCdwPhBevp/" },
];

export function InstagramRail() {
  return (
    <section className="w-full bg-sand-soft py-24 sm:py-32">
      <div className="flex flex-col items-center gap-4 px-5 text-center">
        <p className="text-[0.6875rem] font-semibold tracking-[0.35em] text-gold uppercase">@biancadefranco</p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-espresso uppercase">
          Me siga no Instagram
        </h2>
      </div>

      <div className="mt-14">
        <Marquee duration={55}>
          {posts.map((post, i) => (
            <a
              key={i}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mx-2 block aspect-[4/5] w-[62vw] shrink-0 overflow-hidden rounded-[1.75rem] sm:w-[34vw] lg:w-[22vw]"
            >
              <Image
                src={post.src}
                alt={`Post ${i + 1} no Instagram da Dra. Bianca de Franco`}
                fill
                sizes="(min-width:1024px) 22vw, (min-width:640px) 34vw, 62vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-espresso/0 text-cloud opacity-0 transition-all duration-500 group-hover:bg-espresso/30 group-hover:opacity-100">
                <InstagramIcon className="size-8" />
              </span>
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
