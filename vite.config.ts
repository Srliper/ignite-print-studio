// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv } from "vite";

// Carrega variáveis de ambiente da raiz do projeto (dev e build)
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const env = loadEnv(mode, process.cwd(), "");

function hasEnv(...keys: string[]) {
  return keys.some((key) => Boolean(env[key]?.trim()));
}

// Valida variáveis críticas em build de produção (Vercel injeta no build)
if (mode === "production") {
  const missing: string[] = [];
  if (!hasEnv("GOOGLE_CLIENT_ID", "AUTH_GOOGLE_ID")) missing.push("GOOGLE_CLIENT_ID");
  if (!hasEnv("GOOGLE_CLIENT_SECRET", "AUTH_GOOGLE_SECRET")) missing.push("GOOGLE_CLIENT_SECRET");
  if (!hasEnv("AUTH_SECRET", "NEXTAUTH_SECRET")) missing.push("AUTH_SECRET ou NEXTAUTH_SECRET");
  if (!hasEnv("AUTH_URL", "NEXTAUTH_URL", "VERCEL_URL")) missing.push("AUTH_URL / NEXTAUTH_URL");
  if (!hasEnv("VITE_SUPABASE_URL", "SUPABASE_URL")) missing.push("VITE_SUPABASE_URL / SUPABASE_URL");
  if (!hasEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "SUPABASE_PUBLISHABLE_KEY")) {
    missing.push("VITE_SUPABASE_PUBLISHABLE_KEY / SUPABASE_PUBLISHABLE_KEY");
  }
  if (missing.length > 0) {
    console.warn(
      `[@lovable.dev/vite-tanstack-config] Variáveis ausentes no build: ${missing.join(", ")}`,
    );
  }
}

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // Aviso CSRF é informativo — auth usa /oauth com CSRF próprio do Auth.js
    serverFns: { disableCsrfMiddlewareWarning: true },
  },
  // Preset Vercel para deploy — Auth.js /api/auth/* roda como serverless function
  nitro: {
    preset: "vercel",
  },
  vite: {
    // TanStack Start atende /api/auth/* via server handlers (src/routes/api/auth/$.ts).
    // Não é necessário proxy em dev — as rotas Auth.js rodam no mesmo servidor Vite.
    envPrefix: ["VITE_", "AUTH_", "GOOGLE_"],
    base: "/",
    build: {
      outDir: "dist",
      sourcemap: mode !== "production",
    },
    server: {
      port: 5173,
      strictPort: false,
    },
  },
});
