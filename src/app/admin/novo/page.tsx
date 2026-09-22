import { PostEditor } from "@/components/admin/PostEditor";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function NovoPostPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))].sort();
  return <PostEditor categories={categories} />;
}
