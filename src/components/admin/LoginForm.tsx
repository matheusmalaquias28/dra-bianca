"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction, type LoginState } from "@/app/admin/actions";

const initial: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initial);
  const from = useSearchParams().get("from") ?? "/admin";

  return (
    <form action={formAction} className="flex flex-col gap-4 rounded-2xl bg-cloud p-6 shadow-[0_20px_60px_-30px_rgba(72,55,42,0.5)]">
      <input type="hidden" name="from" value={from} />
      <label className="flex flex-col gap-2">
        <span className="text-[0.75rem] font-semibold tracking-[0.12em] text-espresso/60 uppercase">
          Senha
        </span>
        <input
          type="password"
          name="password"
          autoFocus
          autoComplete="current-password"
          className="rounded-xl border border-espresso/15 bg-sand-soft/50 px-4 py-3 text-espresso outline-none focus:border-gold"
        />
      </label>

      {state.error ? (
        <p className="text-sm text-red-700">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded-full bg-espresso px-6 py-3 text-[0.8125rem] font-medium tracking-[0.14em] text-cloud uppercase transition-colors hover:bg-gold disabled:opacity-50"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
