import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { InViewItem } from "@/components/site/ScrollReveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { PostBody } from "@/components/blog/PostBody";
import { ArrowIcon } from "@/components/icons";
import { getAllPosts, getAllSlugs, getPostBySlug, formatDate } from "@/lib/blog";

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = (await getAllPosts()).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <article className="w-full bg-cloud px-5 pt-36 pb-20 sm:px-8 sm:pt-44 sm:pb-28 lg:px-14">
        <div className="mx-auto max-w-3xl">
          <InViewItem>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium tracking-[0.12em] text-espresso/50 uppercase transition-colors hover:text-gold"
            >
              <ArrowIcon className="size-3.5 rotate-180" />
              Voltar para o blog
            </Link>
          </InViewItem>

          <InViewItem className="mt-6 flex items-center gap-3 text-[0.6875rem] font-semibold tracking-[0.16em] text-gold uppercase">
            <span>{post.category}</span>
            <span aria-hidden className="text-espresso/30">
              ·
            </span>
            <span className="text-espresso/40">{formatDate(post.date)}</span>
            <span aria-hidden className="text-espresso/30">
              ·
            </span>
            <span className="text-espresso/40">{post.readTime} de leitura</span>
          </InViewItem>

          <InViewItem className="mt-4">
            <h1 className="font-display text-[2rem] leading-[1.1] font-semibold tracking-tight text-espresso sm:text-[2.75rem]">
              {post.title}
            </h1>
          </InViewItem>

          <InViewItem className="mt-10">
            <ImagePlaceholder
              src={post.image}
              alt={post.title}
              caption={post.category}
              aspect="aspect-[16/9]"
              tone="sand"
              priority
            />
          </InViewItem>

          <InViewItem className="mt-12">
            <PostBody html={post.html} />
          </InViewItem>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="w-full bg-sand-soft px-5 py-24 sm:px-8 sm:py-28 lg:px-14">
          <div className="w-full">
            <h2 className="font-display text-2xl font-semibold text-espresso sm:text-3xl">
              Outros artigos
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
