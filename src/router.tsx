import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import type { AuthSession } from "start-authjs";
import { routeTree } from "./routeTree.gen";

export type RouterContext = {
  queryClient: QueryClient;
  session: AuthSession | null;
};

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient, session: null } satisfies RouterContext,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
