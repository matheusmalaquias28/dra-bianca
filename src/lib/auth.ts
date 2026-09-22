import { SignJWT, jwtVerify } from "jose";

/** Nome do cookie de sessão do painel. */
export const SESSION_COOKIE = "bdf_admin";

/** Duração da sessão (mantém a cliente logada por 7 dias). */
const MAX_AGE = 60 * 60 * 24 * 7;

function secretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET não está definido.");
  return new TextEncoder().encode(secret);
}

/** Cria o token de sessão assinado (HS256). */
export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secretKey());
}

/** Verifica um token de sessão. Edge-safe (usa apenas `jose`). */
export async function verifySession(token?: string): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, secretKey());
    return true;
  } catch {
    return false;
  }
}

export const SESSION_MAX_AGE = MAX_AGE;
