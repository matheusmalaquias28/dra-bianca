"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import { savePostAction, type PostFormState } from "@/app/admin/actions";

export type EditorPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  readTime?: string;
  html: string;
};

const initial: PostFormState = {};

async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("Falha no upload da imagem.");
  const data = (await res.json()) as { url: string };
  return data.url;
}

function ToolbarButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
        active ? "bg-espresso text-cloud" : "text-espresso/70 hover:bg-espresso/10"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const [busy, setBusy] = useState(false);

  const insertImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setBusy(true);
      try {
        const url = await uploadImage(file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch {
        alert("Não foi possível enviar a imagem.");
      } finally {
        setBusy(false);
      }
    };
    input.click();
  };

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Endereço do link:", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-espresso/10 p-2">
      <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <em>I</em>
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-espresso/10" />
      <ToolbarButton
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        Título
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        Subtítulo
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-espresso/10" />
      <ToolbarButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        Lista
      </ToolbarButton>
      <ToolbarButton active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        Citação
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-espresso/10" />
      <ToolbarButton active={editor.isActive("link")} onClick={setLink}>
        Link
      </ToolbarButton>
      <ToolbarButton onClick={insertImage}>{busy ? "Enviando…" : "Imagem"}</ToolbarButton>
    </div>
  );
}

export function PostEditor({
  post,
  categories,
}: {
  post?: EditorPost;
  categories: string[];
}) {
  const [state, formAction, pending] = useActionState(savePostAction, initial);
  const [html, setHtml] = useState(post?.html ?? "");
  const [cover, setCover] = useState(post?.image ?? "");
  const [coverBusy, setCoverBusy] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
    ],
    content: post?.html ?? "",
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "blog-content min-h-[320px] px-4 py-4 outline-none",
      },
    },
  });

  const onCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverBusy(true);
    try {
      setCover(await uploadImage(file));
    } catch {
      alert("Não foi possível enviar a imagem de capa.");
    } finally {
      setCoverBusy(false);
    }
  };

  return (
    <form action={formAction} className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link href="/admin" className="text-sm text-espresso/60 hover:text-gold">
          ← Voltar
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-espresso px-6 py-2.5 text-[0.8125rem] font-medium tracking-[0.14em] text-cloud uppercase transition-colors hover:bg-gold disabled:opacity-50"
        >
          {pending ? "Salvando…" : "Publicar"}
        </button>
      </div>

      {post ? <input type="hidden" name="originalSlug" value={post.slug} /> : null}
      <input type="hidden" name="html" value={html} />
      <input type="hidden" name="image" value={cover} />

      <div className="mt-8 flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-[0.75rem] font-semibold tracking-[0.12em] text-espresso/60 uppercase">Título</span>
          <input
            name="title"
            defaultValue={post?.title}
            required
            className="rounded-xl border border-espresso/15 bg-cloud px-4 py-3 font-display text-xl text-espresso outline-none focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.75rem] font-semibold tracking-[0.12em] text-espresso/60 uppercase">Resumo</span>
          <textarea
            name="excerpt"
            defaultValue={post?.excerpt}
            required
            rows={2}
            className="resize-none rounded-xl border border-espresso/15 bg-cloud px-4 py-3 text-espresso outline-none focus:border-gold"
          />
        </label>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <label className="flex flex-col gap-2">
            <span className="text-[0.75rem] font-semibold tracking-[0.12em] text-espresso/60 uppercase">Categoria</span>
            <input
              name="category"
              defaultValue={post?.category}
              list="categorias"
              required
              className="rounded-xl border border-espresso/15 bg-cloud px-4 py-3 text-espresso outline-none focus:border-gold"
            />
            <datalist id="categorias">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[0.75rem] font-semibold tracking-[0.12em] text-espresso/60 uppercase">Data</span>
            <input
              type="date"
              name="date"
              defaultValue={post?.date ?? new Date().toISOString().slice(0, 10)}
              className="rounded-xl border border-espresso/15 bg-cloud px-4 py-3 text-espresso outline-none focus:border-gold"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[0.75rem] font-semibold tracking-[0.12em] text-espresso/60 uppercase">
              Tempo de leitura
            </span>
            <input
              name="readTime"
              defaultValue={post?.readTime}
              placeholder="automático"
              className="rounded-xl border border-espresso/15 bg-cloud px-4 py-3 text-espresso outline-none focus:border-gold"
            />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[0.75rem] font-semibold tracking-[0.12em] text-espresso/60 uppercase">Imagem de capa</span>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-espresso/10">
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cover} alt="" className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="w-fit rounded-full border border-espresso/20 px-4 py-2 text-[0.75rem] font-medium text-espresso/70 hover:border-espresso hover:text-espresso"
              >
                {coverBusy ? "Enviando…" : cover ? "Trocar capa" : "Enviar capa"}
              </button>
              {cover ? (
                <button
                  type="button"
                  onClick={() => setCover("")}
                  className="w-fit text-[0.75rem] text-espresso/50 hover:text-red-700"
                >
                  Remover
                </button>
              ) : null}
            </div>
            <input ref={coverInputRef} type="file" accept="image/*" hidden onChange={onCoverChange} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[0.75rem] font-semibold tracking-[0.12em] text-espresso/60 uppercase">Conteúdo</span>
          <div className="overflow-hidden rounded-xl border border-espresso/15 bg-cloud">
            {editor ? <Toolbar editor={editor} /> : null}
            <EditorContent editor={editor} />
          </div>
        </div>

        {state.error ? <p className="text-sm text-red-700">{state.error}</p> : null}
      </div>
    </form>
  );
}
