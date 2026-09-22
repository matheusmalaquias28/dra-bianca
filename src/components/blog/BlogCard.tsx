import Link from "next/link";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { InViewItem } from "@/components/site/ScrollReveal";
import { ArrowIcon } from "@/components/icons";
import { formatDate, type PostSummary } from "@/lib/blog";

export function BlogCard({ post }: { post: PostSummary }) {
  return (
    <InViewItem className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <ImagePlaceholder
          src={post.image}
          alt={post.title}
          caption={post.category}
          aspect="aspect-[16/11]"
          tone="sand"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
        <div className="mt-4">
          <div className="flex items-center gap-3 text-[0.6875rem] font-semibold tracking-[0.16em] text-espresso/40 uppercase">
            <span>{post.category}</span>
            <span aria-hidden>·</span>
            <span>{formatDate(post.date)}</span>
          </div>
          <h3 className="mt-2 font-display text-xl leading-snug font-medium text-espresso transition-colors group-hover:text-gold">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-espresso/55">{post.excerpt}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[0.75rem] font-medium tracking-wide text-espresso">
            Ler artigo
            <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </InViewItem>
  );
}
