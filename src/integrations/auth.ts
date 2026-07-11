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

/**
 * Lê variáveis de ambiente com fallback entre nomes comuns.
 * Suporta GOOGLE_CLIENT_ID/SECRET (solicitado) e AUTH_GOOGLE_ID/SECRET (Auth.js).
 */
function normalizeAuthUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    // Auth.js exige AUTH_URL com o path completo: .../api/auth
    if (parsed.pathname === "/" || !parsed.pathname.endsWith("/api/auth")) {
      parsed.pathname = "/api/auth";
    }
    return parsed.toString().replace(/\/$/, "");
  } catch {
    console.warn("[auth] AUTH_URL inválida:", url);
    return undefined;
  }
}

/**
 * Sincroniza variáveis NEXTAUTH_* (Vercel/Next.js) para AUTH_* (Auth.js).
 * Muitos projetos na Vercel usam NEXTAUTH_SECRET e NEXTAUTH_URL por hábito.
 */
function syncLegacyAuthEnv() {
  if (!process.env.AUTH_SECRET && process.env.NEXTAUTH_SECRET) {
    process.env.AUTH_SECRET = process.env.NEXTAUTH_SECRET;
  }

  if (!process.env.AUTH_URL && process.env.NEXTAUTH_URL) {
    process.env.AUTH_URL = process.env.NEXTAUTH_URL;
  }

  if (process.env.AUTH_URL) {
    const normalized = normalizeAuthUrl(process.env.AUTH_URL);
    if (normalized) process.env.AUTH_URL = normalized;
  }
}

syncLegacyAuthEnv();

function getAuthEnv() {
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

  if (!googleClientId || !googleClientSecret) {
    console.warn(
      "[auth] GOOGLE_CLIENT_ID ou GOOGLE_CLIENT_SECRET não configurados. Login com Google indisponível.",
    );
  }

  if (!authSecret) {
    console.warn("[auth] AUTH_SECRET não configurado. Sessões não serão assinadas corretamente.");
  }

  return { googleClientId, googleClientSecret, authSecret, authUrl };
}

const env = getAuthEnv();

/**
 * Configuração central do Auth.js com Google Provider.
 * Variáveis lidas em runtime no servidor (compatível com Vercel).
 */
export const authConfig: StartAuthJSConfig = {
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
    /** Enriquece o JWT com dados do perfil Google após login */
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.picture = profile.picture ?? token.picture;
      }
      return token;
    },
    /** Expõe id e foto do usuário na sessão consumida pelo cliente */
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

/**
 * Handler de autenticação Auth.js — usado em src/routes/api/auth/$.ts
 */
export { StartAuthJS } from "start-authjs";

/*
 * =============================================================================
 * README — CONFIGURAÇÃO DO GOOGLE OAUTH E DEPLOY NA VERCEL
 * =============================================================================
 *
 * CONFIGURAÇÃO NO GOOGLE CLOUD CONSOLE:
 * - Acesse https://console.cloud.google.com
 * - Crie um projeto (ou selecione um existente)
 * - Ative a API "Google Identity" / OAuth 2.0
 * - Vá em Credenciais → Criar credenciais → OAuth Client ID (Web Application)
 * - Origens JavaScript autorizadas:
 *     http://localhost:5173
 *     https://ignite-print-studio.vercel.app
 * - URIs de redirecionamento autorizados:
 *     http://localhost:5173/api/auth/callback/google
 *     https://ignite-print-studio.vercel.app/api/auth/callback/google
 *
 * CONFIGURAÇÃO NA VERCEL:
 * - Conecte o repositório GitHub na Vercel
 * - Adicione as Environment Variables (aceita AUTH_* ou NEXTAUTH_*):
 *     GOOGLE_CLIENT_ID
 *     GOOGLE_CLIENT_SECRET
 *     AUTH_SECRET  ou  NEXTAUTH_SECRET
 *     AUTH_URL     ou  NEXTAUTH_URL
 *       (produção: https://ignite-print-studio.vercel.app/api/auth)
 * - Faça deploy (build: npm run build)
 *
 * ROTAS:
 * - Pública:  /           (loja, sem login obrigatório)
 * - Login:    /auth       (página de autenticação)
 * - Protegida: /minha-conta, /admin/* (exige sessão Google OAuth)
 * =============================================================================
 */
