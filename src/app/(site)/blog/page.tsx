import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/SectionHeading";
import { InViewGroup } from "@/components/site/ScrollReveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Conteúdo educativo sobre dermatologia, pele e cabelo.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <section className="w-full bg-cloud px-5 pt-36 pb-24 sm:px-8 sm:pt-44 sm:pb-32 lg:px-14">
      <div className="w-full">
        <SectionHeading
          eyebrow="Blog"
          title="Acompanhe as novidades em meu Blog."
          subtitle="Conteúdo educativo sobre pele, cabelo e os tratamentos que oferecemos."
        />

        <InViewGroup className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </InViewGroup>
      </div>
    </section>
  );
}
