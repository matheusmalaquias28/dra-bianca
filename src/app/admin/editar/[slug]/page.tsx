import { notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/PostEditor";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function EditarPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))].sort();

  return (
    <PostEditor
      categories={categories}
      post={{
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        date: post.date,
        image: post.image,
        readTime: post.readTime,
        html: post.html,
      }}
    />
  );
}
