import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import type { AuthUser } from "@/integrations/auth";
import { fetchAuthSession } from "@/lib/auth-session";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    let session = null;
    try {
      session = await fetchAuthSession();
    } catch (error) {
      console.error("[auth] Erro ao verificar sessão:", error);
    }

    if (!session?.user) {
      throw redirect({
        to: "/auth",
        search: { callbackUrl: location.pathname },
      });
    }

    return { user: session.user as AuthUser };
  },
  component: () => <Outlet />,
});
