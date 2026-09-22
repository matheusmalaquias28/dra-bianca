"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  verifySession,
} from "@/lib/auth";
import {
  BLOG_TAG,
  deletePost,
  getPostBySlug,
  savePost,
  slugify,
} from "@/lib/blog";

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

async function requireSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySession(token))) redirect("/admin/login");
}

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;

  // Pequeno atraso constante para dificultar tentativas em massa.
  await new Promise((r) => setTimeout(r, 400));

  if (!expected) return { error: "Painel não configurado (ADMIN_PASSWORD ausente)." };
  if (!password || !safeEqual(password, expected)) {
    return { error: "Senha incorreta." };
  }

  const token = await createSessionToken();
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  const from = String(formData.get("from") ?? "/admin");
  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logoutAction() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export type PostFormState = { error?: string };

export async function savePostAction(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await requireSession();

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const html = String(formData.get("html") ?? "").trim();
  const readTime = String(formData.get("readTime") ?? "").trim();
  const originalSlug = String(formData.get("originalSlug") ?? "").trim();

  if (!title) return { error: "O título é obrigatório." };
  if (!excerpt) return { error: "O resumo é obrigatório." };
  if (!category) return { error: "A categoria é obrigatória." };
  if (!html || html === "<p></p>") return { error: "O conteúdo está vazio." };

  const slug = originalSlug || slugify(title);
  if (!slug) return { error: "Não foi possível gerar o endereço (slug) do post." };

  // Evita colisão de slug ao criar um post novo.
  if (!originalSlug) {
    const existing = await getPostBySlug(slug);
    if (existing) {
      return { error: `Já existe um post com o endereço "${slug}". Ajuste o título.` };
    }
  }

  await savePost({
    slug,
    title,
    excerpt,
    category,
    date: date || new Date().toISOString().slice(0, 10),
    image,
    html,
    readTime,
  });

  updateTag(BLOG_TAG);
  redirect("/admin");
}

export async function deletePostAction(formData: FormData) {
  await requireSession();
  const slug = String(formData.get("slug") ?? "").trim();
  if (slug) {
    await deletePost(slug);
    updateTag(BLOG_TAG);
  }
  redirect("/admin");
}
