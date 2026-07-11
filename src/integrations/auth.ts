import Google from "@auth/core/providers/google";
import type { Profile } from "@auth/core/types";
import type { StartAuthJSConfig } from "start-authjs";

/**
 * Usuário autenticado via Google OAuth (Auth.js).
 * Usado no cliente pelo hook useAuth e nas rotas protegidas.
 */
export type AuthUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

declare module "@auth/core/types" {
  interface Session {
    user: AuthUser & Profile;
  }
}

/** Path base do Auth.js — /oauth evita conflito com /api/* reservado pela Vercel */
export const AUTH_BASE_PATH = "/oauth";

/**
 * Lê variáveis de ambiente com fallback entre nomes comuns.
 */
function normalizeAuthUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (parsed.pathname === "/" || !parsed.pathname.endsWith(AUTH_BASE_PATH)) {
      parsed.pathname = AUTH_BASE_PATH;
    }
    return parsed.toString().replace(/\/$/, "");
  } catch {
    console.warn("[auth] AUTH_URL inválida:", url);
    return undefined;
  }
}

/**
 * Sincroniza variáveis NEXTAUTH_* (Vercel) e detecta URL de preview da Vercel.
 */
export function syncLegacyAuthEnv() {
  if (!process.env.AUTH_SECRET && process.env.NEXTAUTH_SECRET) {
    process.env.AUTH_SECRET = process.env.NEXTAUTH_SECRET;
  }

  if (!process.env.AUTH_URL && process.env.NEXTAUTH_URL) {
    process.env.AUTH_URL = process.env.NEXTAUTH_URL;
  }

  // Preview deployments: VERCEL_URL = ignite-print-studio-xxx.vercel.app
  if (!process.env.AUTH_URL && process.env.VERCEL_URL) {
    process.env.AUTH_URL = `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.AUTH_URL) {
    const normalized = normalizeAuthUrl(process.env.AUTH_URL);
    if (normalized) process.env.AUTH_URL = normalized;
  }
}

function getAuthEnv() {
  syncLegacyAuthEnv();

  const googleClientId =
    process.env.GOOGLE_CLIENT_ID ??
    process.env.AUTH_GOOGLE_ID ??
    process.env.AUTH_GOOGLE_CLIENT_ID;

  const googleClientSecret =
    process.env.GOOGLE_CLIENT_SECRET ??
    process.env.AUTH_GOOGLE_SECRET ??
    process.env.AUTH_GOOGLE_CLIENT_SECRET;

  const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  const authUrl = normalizeAuthUrl(process.env.AUTH_URL ?? process.env.NEXTAUTH_URL);

  return { googleClientId, googleClientSecret, authSecret, authUrl };
}

/**
 * Configuração Auth.js lida em runtime (obrigatório na Vercel serverless).
 * Não use objeto estático — env vars podem não estar disponíveis no import.
 */
export function getAuthConfig(): StartAuthJSConfig {
  const env = getAuthEnv();

  if (!env.googleClientId || !env.googleClientSecret) {
    console.warn("[auth] GOOGLE_CLIENT_ID ou GOOGLE_CLIENT_SECRET ausentes.");
  }

  if (!env.authSecret) {
    console.warn("[auth] AUTH_SECRET / NEXTAUTH_SECRET ausente.");
  }

  return {
    secret: env.authSecret,
    trustHost: true,
    providers: [
      Google({
        clientId: env.googleClientId ?? "",
        clientSecret: env.googleClientSecret ?? "",
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
    ],
    pages: {
      signIn: "/auth",
      error: "/auth",
    },
    callbacks: {
      async jwt({ token, account, profile }) {
        if (account && profile) {
          token.picture = profile.picture ?? token.picture;
        }
        return token;
      },
      async session({ session, token }) {
        if (token.sub) {
          session.user = {
            ...session.user,
            id: token.sub,
            image: (token.picture as string | undefined) ?? session.user.image,
          };
        }
        return session;
      },
    },
  };
}

export { StartAuthJS } from "start-authjs";

/*
 * VERCEL — adicione em Production E Preview:
 *   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
 *   AUTH_SECRET ou NEXTAUTH_SECRET
 *   AUTH_URL=https://ignite-print-studio.vercel.app  (opcional — auto-detecta preview)
 *   SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, VITE_SUPABASE_*
 *
 * GOOGLE redirect URI:
 *   https://ignite-print-studio.vercel.app/oauth/callback/google
 */
