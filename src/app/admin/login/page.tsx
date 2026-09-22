import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-[0.6875rem] font-semibold tracking-[0.35em] text-gold uppercase">
            Painel
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-espresso">
            Área da Dra. Bianca
          </h1>
          <p className="mt-2 text-sm text-espresso/55">
            Entre para gerenciar as postagens do blog.
          </p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
