import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getSession, type AuthSession } from "start-authjs";
import { getAuthConfig } from "@/integrations/auth";

/**
 * Busca a sessão Auth.js no servidor (lê cookies da requisição).
 * Nunca derruba a página se auth não estiver configurado.
 */
export const fetchAuthSession = createServerFn({ method: "GET" }).handler(
  async (): Promise<AuthSession | null> => {
    try {
      const request = getRequest();
      return await getSession(request, getAuthConfig());
    } catch (error) {
      console.error("[fetchAuthSession] Erro ao buscar sessão:", error);
      return null;
    }
  },
);
