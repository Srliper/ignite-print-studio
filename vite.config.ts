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

// Valida variáveis críticas de auth em build de produção
if (mode === "production") {
  const missing = ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "AUTH_SECRET", "AUTH_URL"].filter(
    (key) => !env[key],
  );
  if (missing.length > 0) {
    console.warn(
      `[@lovable.dev/vite-tanstack-config] Variáveis de auth ausentes no build: ${missing.join(", ")}`,
    );
  }
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
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
