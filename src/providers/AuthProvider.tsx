import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import type { AuthSession } from "start-authjs";
import type { AuthUser } from "@/integrations/auth";
import { fetchAuthSession } from "@/lib/auth-session";

type AuthContextValue = {
  session: AuthSession | null;
  user: AuthUser | null;
  isReady: boolean;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

/**
 * Provider de autenticação global.
 * Carrega sessão no cliente para não derrubar o SSR na Vercel.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;
    fetchAuthSession()
      .then((s) => {
        if (active) setSession(s);
      })
      .catch(() => {
        if (active) setSession(null);
      })
      .finally(() => {
        if (active) setIsReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const refreshSession = async () => {
    try {
      const s = await fetchAuthSession();
      setSession(s);
    } catch {
      setSession(null);
    }
    await router.invalidate();
  };

  const user = (session?.user as AuthUser | undefined) ?? null;

  return (
    <AuthContext.Provider value={{ session, user, isReady, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de <AuthProvider>.");
  }
  return context;
}
