import { useCallback, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/providers/AuthProvider";

type AuthProvider = "google";

type UseAuthReturn = {
  user: ReturnType<typeof useAuthContext>["user"];
  session: Session | null;
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  signIn: (provider: AuthProvider, callbackUrl?: string) => Promise<void>;
  signOut: (callbackUrl?: string) => Promise<void>;
  getSession: () => Promise<Session | null>;
  refreshSession: () => Promise<void>;
};

/**
 * Login Google via Lovable Cloud Auth + sessão Supabase.
 */
export function useAuth(): UseAuthReturn {
  const { session, user, isReady, refreshSession } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSession = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }, []);

  const signIn = useCallback(async (_provider: AuthProvider, callbackUrl?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const redirectUri =
        typeof window !== "undefined"
          ? window.location.origin
          : undefined;

      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: redirectUri,
        extraParams: callbackUrl?.startsWith("/")
          ? { callbackUrl }
          : undefined,
      });

      if (result.redirected) return;

      if (result.error) {
        setError(result.error.message);
        throw result.error;
      }

      await refreshSession();
      const dest =
        callbackUrl?.startsWith("/") ? callbackUrl : `${window.location.origin}/`;
      window.location.href = dest.startsWith("http") ? dest : `${window.location.origin}${dest}`;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Falha ao iniciar login com Google.";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [refreshSession]);

  const signOut = useCallback(
    async (callbackUrl?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        await supabase.auth.signOut();
        await refreshSession();
        window.location.href = callbackUrl ?? "/";
      } catch (err) {
        const message = err instanceof Error ? err.message : "Falha ao encerrar sessão.";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [refreshSession],
  );

  return {
    user,
    session,
    isLoading,
    isReady,
    error,
    signIn,
    signOut,
    getSession,
    refreshSession,
  };
}
