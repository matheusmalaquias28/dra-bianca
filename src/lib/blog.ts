import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { list, put, del } from "@vercel/blob";
import { unstable_cache } from "next/cache";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const BLOB_PREFIX = "posts/";

/** Tag de cache: revalidada sempre que um post é criado/editado/excluído. */
export const BLOG_TAG = "blog";

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
};

/** Origem do post: `file` = arquivo .mdx no repositório; `blob` = criado pelo painel. */
export type PostSource = "file" | "blob";
export type PostSummary = PostFrontmatter & { slug: string; source: PostSource };
export type PostFull = PostSummary & { html: string };

/** Registro salvo no Blob (JSON) para cada post criado no painel. */
type StoredPost = PostFrontmatter & { slug: string; html: string; updatedAt: string };

function toHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}

/** Posts-semente versionados no git (src/content/blog/*.mdx). */
function readFilePosts(): PostFull[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        ...(data as PostFrontmatter),
        slug: file.replace(/\.mdx$/, ""),
        source: "file" as const,
        html: toHtml(content),
      };
    });
}

/** Posts criados pela cliente no painel (Vercel Blob). */
async function readBlobPosts(): Promise<PostFull[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  const { blobs } = await list({ prefix: BLOB_PREFIX });
  const jsons = blobs.filter((b) => b.pathname.endsWith(".json"));
  const posts = await Promise.all(
    jsons.map(async (b): Promise<PostFull | null> => {
      const res = await fetch(b.url, { cache: "no-store" });
      if (!res.ok) return null;
      const data = (await res.json()) as StoredPost;
      return {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        category: data.category,
        readTime: data.readTime,
        image: data.image,
        html: data.html,
        source: "blob",
      };
    }),
  );
  return posts.filter((p): p is PostFull => p !== null);
}

// Só a leitura remota (Blob) é cacheada — invalidada por `updateTag(BLOG_TAG)`
// ao criar/editar/excluir no painel. Os posts de arquivo (.mdx) são lidos
// sempre frescos, então editar o frontmatter reflete de imediato.
const cachedBlobPosts = unstable_cache(readBlobPosts, ["blog-blob"], { tags: [BLOG_TAG] });

async function cachedLoadAll(): Promise<PostFull[]> {
  const [filePosts, blobPosts] = await Promise.all([
    Promise.resolve(readFilePosts()),
    cachedBlobPosts(),
  ]);
  // Um post do Blob com o mesmo slug sobrescreve o arquivo (permite editar seed).
  const bySlug = new Map<string, PostFull>();
  for (const p of filePosts) bySlug.set(p.slug, p);
  for (const p of blobPosts) bySlug.set(p.slug, p);
  return [...bySlug.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const all = await cachedLoadAll();
  return all.map(({ html: _html, ...summary }) => summary);
}

export async function getAllSlugs(): Promise<string[]> {
  return (await cachedLoadAll()).map((p) => p.slug);
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  return (await cachedLoadAll()).find((p) => p.slug === slug) ?? null;
}

// ── Escrita (usada pelo painel) ────────────────────────────────────────────

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** ~200 palavras/min, sempre pelo menos "1 min". */
export function estimateReadTime(html: string): string {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

export type SavePostInput = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  html: string;
  readTime?: string;
};

export async function savePost(input: SavePostInput): Promise<StoredPost> {
  const record: StoredPost = {
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    category: input.category,
    date: input.date,
    image: input.image || undefined,
    readTime: input.readTime?.trim() || estimateReadTime(input.html),
    html: input.html,
    updatedAt: new Date().toISOString(),
  };
  await put(`${BLOB_PREFIX}${input.slug}.json`, JSON.stringify(record), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return record;
}

export async function deletePost(slug: string): Promise<void> {
  const { blobs } = await list({ prefix: `${BLOB_PREFIX}${slug}.json` });
  await Promise.all(blobs.map((b) => del(b.url)));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
