import { createFileRoute } from "@tanstack/react-router";
import { StartAuthJS, getAuthConfig } from "@/integrations/auth";

/**
 * Rota catch-all do Auth.js em /oauth/* (não /api/auth — Vercel reserva /api/*).
 */
const { GET, POST } = StartAuthJS(() => getAuthConfig());

export const Route = createFileRoute("/oauth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          return await GET({ request, response: new Response() });
        } catch (error) {
          console.error("[oauth] Erro no handler GET:", error);
          return new Response(
            JSON.stringify({
              error: "Autenticação indisponível. Verifique AUTH_SECRET na Vercel.",
            }),
            { status: 503, headers: { "Content-Type": "application/json" } },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          return await POST({ request, response: new Response() });
        } catch (error) {
          console.error("[oauth] Erro no handler POST:", error);
          return new Response(
            JSON.stringify({
              error: "Autenticação indisponível. Verifique AUTH_SECRET na Vercel.",
            }),
            { status: 503, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
