import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import { deletePostAction, logoutAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[0.6875rem] font-semibold tracking-[0.35em] text-gold uppercase">
            Painel
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-espresso">
            Postagens do blog
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/novo"
            className="rounded-full bg-espresso px-5 py-2.5 text-[0.8125rem] font-medium tracking-[0.12em] text-cloud uppercase transition-colors hover:bg-gold"
          >
            Novo post
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-espresso/20 px-5 py-2.5 text-[0.8125rem] font-medium tracking-[0.12em] text-espresso/70 uppercase transition-colors hover:border-espresso hover:text-espresso"
            >
              Sair
            </button>
          </form>
        </div>
      </header>

      <div className="mt-10 flex flex-col gap-3">
        {posts.length === 0 ? (
          <p className="rounded-2xl bg-cloud p-8 text-center text-espresso/55">
            Nenhuma postagem ainda. Clique em <strong>Novo post</strong> para começar.
          </p>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-cloud p-5"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
                  <span className="text-gold">{post.category}</span>
                  <span className="text-espresso/30">·</span>
                  <span className="text-espresso/40">{formatDate(post.date)}</span>
                  {post.source === "file" ? (
                    <span className="rounded-full bg-espresso/10 px-2 py-0.5 text-espresso/50">
                      no código
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-1 truncate font-display text-lg font-medium text-espresso">
                  {post.title}
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="rounded-full border border-espresso/15 px-4 py-2 text-[0.75rem] font-medium text-espresso/70 transition-colors hover:border-espresso hover:text-espresso"
                >
                  Ver
                </Link>
                <Link
                  href={`/admin/editar/${post.slug}`}
                  className="rounded-full border border-espresso/15 px-4 py-2 text-[0.75rem] font-medium text-espresso/70 transition-colors hover:border-espresso hover:text-espresso"
                >
                  Editar
                </Link>
                {post.source === "blob" ? (
                  <form action={deletePostAction}>
                    <input type="hidden" name="slug" value={post.slug} />
                    <button
                      type="submit"
                      className="rounded-full border border-red-300 px-4 py-2 text-[0.75rem] font-medium text-red-700 transition-colors hover:bg-red-50"
                    >
                      Excluir
                    </button>
                  </form>
                ) : null}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
