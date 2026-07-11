import { createFileRoute } from "@tanstack/react-router";
import { StartAuthJS, authConfig } from "@/integrations/auth";

/**
 * Rota catch-all do Auth.js em /oauth/* (não /api/auth — Vercel reserva /api/*).
 * Atende: /oauth/csrf, /oauth/signin/google, /oauth/callback/google, etc.
 */
const { GET, POST } = StartAuthJS(authConfig);

export const Route = createFileRoute("/oauth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          return await GET({ request, response: new Response() });
        } catch (error) {
          console.error("[oauth] Erro no handler GET:", error);
          return new Response(JSON.stringify({ error: "Erro interno de autenticação." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
      POST: async ({ request }) => {
        try {
          return await POST({ request, response: new Response() });
        } catch (error) {
          console.error("[oauth] Erro no handler POST:", error);
          return new Response(JSON.stringify({ error: "Erro interno de autenticação." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
