"use client";

import type { ReactNode } from "react";
import { Button } from "./Button";
import { useContactModal } from "./ContactModal";

type Variant = "primary" | "light" | "ghost" | "link";

/** Botão de contato: abre o modal para o usuário escolher a clínica (Ipanema ou Niterói). */
export function ContactButton({
  children,
  variant = "primary",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const { open } = useContactModal();
  return (
    <Button onClick={open} variant={variant} className={className}>
      {children}
    </Button>
  );
}
