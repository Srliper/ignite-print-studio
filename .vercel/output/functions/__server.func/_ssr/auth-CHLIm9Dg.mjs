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
  const googleClientId = process.env.GOOGLE_CLIENT_ID ?? process.env.AUTH_GOOGLE_ID ?? process.env.AUTH_GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? process.env.AUTH_GOOGLE_SECRET ?? process.env.AUTH_GOOGLE_CLIENT_SECRET;
  const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  const authUrl = normalizeAuthUrl(process.env.AUTH_URL ?? process.env.NEXTAUTH_URL);
  return { googleClientId, googleClientSecret, authSecret, authUrl };
}
function getAuthConfig() {
  const env = getAuthEnv();
  if (!env.googleClientId || !env.googleClientSecret) {
    console.warn("[auth] GOOGLE_CLIENT_ID ou GOOGLE_CLIENT_SECRET ausentes.");
  }
  if (!env.authSecret) {
    console.warn("[auth] AUTH_SECRET / NEXTAUTH_SECRET ausente.");
  }
  return {
    basePath: AUTH_BASE_PATH,
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
            image: token.picture ?? session.user.image
          };
        }
        return session;
      }
    }
  };
}
export {
  AUTH_BASE_PATH as A,
  getAuthConfig as g
};
