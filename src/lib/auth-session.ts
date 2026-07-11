import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getSession, type AuthSession } from "start-authjs";
import { authConfig } from "@/integrations/auth";

/**
 * Busca a sessão Auth.js no servidor (lê cookies da requisição).
 * Usado no __root.tsx e pelo hook useAuth.
 */
export const fetchAuthSession = createServerFn({ method: "GET" }).handler(
  async (): Promise<AuthSession | null> => {
    const request = getRequest();
    return getSession(request, authConfig);
  },
);
