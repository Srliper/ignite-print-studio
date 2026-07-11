import { createContext, useContext, type ReactNode } from "react";
import { useRouteContext, useRouter } from "@tanstack/react-router";
import type { AuthSession } from "start-authjs";
import type { AuthUser } from "@/integrations/auth";

type AuthContextValue = {
  session: AuthSession | null;
  user: AuthUser | null;
  /** Invalida o router para recarregar a sessão do servidor */
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

/**
 * Provider de autenticação global.
 * A sessão é carregada no __root.tsx (beforeLoad) e repassada via contexto do router.
 * Este provider expõe sessão/usuário para qualquer componente filho.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const { session } = useRouteContext({ from: "__root__" });
  const user = (session?.user as AuthUser | undefined) ?? null;

  const refreshSession = async () => {
    await router.invalidate();
  };

  return (
    <AuthContext.Provider value={{ session, user, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook interno do provider — prefira useAuth() para login/logout */
export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de <AuthProvider>.");
  }
  return context;
}
