import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import type { AuthUser } from "@/integrations/auth";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: ({ context, location }) => {
    // Middleware de autenticação: exige sessão Auth.js (Google OAuth)
    if (!context.session?.user) {
      throw redirect({
        to: "/auth",
        search: { callbackUrl: location.pathname },
      });
    }

    return { user: context.session.user as AuthUser };
  },
  component: () => <Outlet />,
});
