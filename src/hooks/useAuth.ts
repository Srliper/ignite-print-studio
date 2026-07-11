import { useCallback, useState } from "react";
import { useRouteContext, useRouter } from "@tanstack/react-router";
import type { AuthSession } from "start-authjs";
import type { AuthUser } from "@/integrations/auth";
import { fetchAuthSession } from "@/lib/auth-session";

type AuthProvider = "google";

type UseAuthReturn = {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: string | null;
  signIn: (provider: AuthProvider, callbackUrl?: string) => Promise<void>;
  signOut: (callbackUrl?: string) => Promise<void>;
  getSession: () => Promise<AuthSession | null>;
  refreshSession: () => Promise<void>;
};

async function fetchCsrfToken(): Promise<string> {
  const response = await fetch("/api/auth/csrf", { credentials: "include" });
  if (!response.ok) {
    throw new Error("Não foi possível obter o token CSRF de autenticação.");
  }
  const data = (await response.json()) as { csrfToken?: string };
  if (!data.csrfToken) {
    throw new Error("Resposta CSRF inválida do servidor de autenticação.");
  }
  return data.csrfToken;
}

/**
 * Hook de autenticação Google OAuth via Auth.js.
 * A sessão vem do contexto do router (carregada no __root.tsx).
 */
export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const context = useRouteContext({ from: "__root__" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const session = context.session;
  const user = (session?.user as AuthUser | undefined) ?? null;

  const getSession = useCallback(async () => {
    try {
      return await fetchAuthSession();
    } catch (err) {
      console.error("[useAuth] Erro ao buscar sessão:", err);
      return null;
    }
  }, []);

  const refreshSession = useCallback(async () => {
    await router.invalidate();
  }, [router]);

  const signIn = useCallback(async (provider: AuthProvider, callbackUrl?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const csrfToken = await fetchCsrfToken();
      const destination = callbackUrl ?? `${window.location.origin}/`;
      const body = new URLSearchParams({
        csrfToken,
        callbackUrl: destination,
      });

      const response = await fetch(`/api/auth/signin/${provider}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        credentials: "include",
        redirect: "manual",
      });

      // Auth.js responde com redirect para o Google
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("Location");
        if (location) {
          window.location.href = location;
          return;
        }
      }

      if (response.redirected && response.url) {
        window.location.href = response.url;
        return;
      }

      // Fallback: redirect direto (GET)
      window.location.href = `/api/auth/signin/${provider}?callbackUrl=${encodeURIComponent(destination)}`;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Falha ao iniciar login com Google.";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(
    async (callbackUrl?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const csrfToken = await fetchCsrfToken();
        const destination = callbackUrl ?? `${window.location.origin}/`;

        await fetch("/api/auth/signout", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ csrfToken, callbackUrl: destination }),
          credentials: "include",
        });

        await router.invalidate();
        window.location.href = destination;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Falha ao encerrar sessão.";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  return {
    user,
    session,
    isLoading,
    error,
    signIn,
    signOut,
    getSession,
    refreshSession,
  };
}
