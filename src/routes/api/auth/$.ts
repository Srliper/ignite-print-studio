import { createFileRoute } from "@tanstack/react-router";
import { StartAuthJS, authConfig } from "@/integrations/auth";

/**
 * Rota catch-all do Auth.js.
 * Atende todos os endpoints OAuth: /api/auth/*
 * (signin, callback, signout, session, csrf, etc.)
 * Suporta GET e POST conforme exigido pelo fluxo OAuth.
 */
const { GET, POST } = StartAuthJS(authConfig);

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          return await GET({ request, response: new Response() });
        } catch (error) {
          console.error("[api/auth] Erro no handler GET:", error);
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
          console.error("[api/auth] Erro no handler POST:", error);
          return new Response(JSON.stringify({ error: "Erro interno de autenticação." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
