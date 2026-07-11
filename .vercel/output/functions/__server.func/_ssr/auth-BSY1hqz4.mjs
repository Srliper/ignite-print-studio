import { G as Google } from "../_libs/auth__core.mjs";
const AUTH_BASE_PATH = "/oauth";
function normalizeAuthUrl(url) {
  if (!url) return void 0;
  try {
    const parsed = new URL(url);
    if (parsed.pathname === "/" || !parsed.pathname.endsWith(AUTH_BASE_PATH)) {
      parsed.pathname = AUTH_BASE_PATH;
    }
    return parsed.toString().replace(/\/$/, "");
  } catch {
    console.warn("[auth] AUTH_URL inválida:", url);
    return void 0;
  }
}
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
  const googleClientId = process.env.GOOGLE_CLIENT_ID ?? process.env.AUTH_GOOGLE_ID ?? process.env.AUTH_GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? process.env.AUTH_GOOGLE_SECRET ?? process.env.AUTH_GOOGLE_CLIENT_SECRET;
  const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  const authUrl = normalizeAuthUrl(process.env.AUTH_URL ?? process.env.NEXTAUTH_URL);
  if (!googleClientId || !googleClientSecret) {
    console.warn(
      "[auth] GOOGLE_CLIENT_ID ou GOOGLE_CLIENT_SECRET não configurados. Login com Google indisponível."
    );
  }
  if (!authSecret) {
    console.warn("[auth] AUTH_SECRET não configurado. Sessões não serão assinadas corretamente.");
  }
  return { googleClientId, googleClientSecret, authSecret, authUrl };
}
const env = getAuthEnv();
const authConfig = {
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
          response_type: "code"
        }
      }
    })
  ],
  pages: {
    signIn: "/auth",
    error: "/auth"
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
          image: token.picture ?? session.user.image
        };
      }
      return session;
    }
  }
};
export {
  AUTH_BASE_PATH as A,
  authConfig as a
};
