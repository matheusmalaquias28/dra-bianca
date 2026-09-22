import { LineReveal } from "@/components/site/ScrollFx";
import { Button } from "@/components/site/Button";
import { InViewGroup } from "@/components/site/ScrollReveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";

export async function BlogTeaser() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <section className="w-full bg-cloud px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <LineReveal
          lines={["Acompanhe as novidades", "em meu Blog."]}
          className="font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-espresso"
        />
        <Button href="/blog" variant="link">
          Ver todos os artigos
        </Button>
      </div>

      <InViewGroup className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </InViewGroup>
    </section>
  );
}
