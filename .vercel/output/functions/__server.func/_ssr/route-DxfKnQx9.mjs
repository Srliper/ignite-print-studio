import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { b as useServerFn } from "./router-BlUzkigm.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as checkIsAdmin, b as bootstrapAdmin } from "./admin.functions-DL3WUSzr.mjs";
import { u as useAuth } from "./useAuth-C95FHI1X.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { e as LayoutDashboard, S as ShoppingBag, f as Percent, g as Package, h as Users, i as UserCog, j as Store, c as LogOut } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-Gf6avwXa.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "./client-CXxm5UrO.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-BlhVP4Uq.mjs";
import "./auth-DvLnJq-q.mjs";
import "../_libs/auth__core.mjs";
import "../_libs/panva__hkdf.mjs";
import "../_libs/jose.mjs";
import "../_libs/preact-render-to-string.mjs";
import "../_libs/preact.mjs";
import "../_libs/oauth4webapi.mjs";
import "../_libs/start-authjs.mjs";
import "../_libs/zod.mjs";
function AdminLayout() {
  const {
    signOut
  } = useAuth();
  const fn = useServerFn(checkIsAdmin);
  const bootstrap = useServerFn(bootstrapAdmin);
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  const {
    data,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["is-admin"],
    queryFn: () => fn()
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60", children: "Carregando..." }) });
  }
  if (!data?.isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background text-foreground p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold mb-3", children: "Área Administrativa" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-70 mb-6", children: "Você não é administrador. Se este é o primeiro acesso ao painel, clique abaixo para configurar — funciona apenas enquanto não houver nenhum admin no sistema." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
        try {
          await bootstrap();
          toast.success("Você agora é administrador!");
          refetch();
        } catch (e) {
          toast.error(e?.message ?? "Falha ao promover.");
        }
      }, className: "bg-brand text-primary-foreground px-6 py-3 rounded-full font-bold uppercase tracking-tight text-sm w-full mb-3 hover:scale-[1.02] transition-transform", children: "Tornar-me administrador" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "block text-xs uppercase tracking-tight opacity-60 hover:opacity-100", children: "← Voltar para a loja" })
    ] }) });
  }
  const links = [{
    to: "/admin",
    icon: LayoutDashboard,
    label: "Dashboard",
    exact: true
  }, {
    to: "/admin/pedidos",
    icon: ShoppingBag,
    label: "Pedidos"
  }, {
    to: "/admin/comissao",
    icon: Percent,
    label: "Comissão"
  }, {
    to: "/admin/produtos",
    icon: Package,
    label: "Produtos"
  }, {
    to: "/admin/clientes",
    icon: Users,
    label: "Clientes"
  }, {
    to: "/admin/equipe",
    icon: UserCog,
    label: "Equipe"
  }];
  const isActive = (to, exact) => exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
  const logout = async () => {
    try {
      await signOut("/");
    } catch {
      toast.error("Erro ao sair da conta.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-60 shrink-0 border-r border-white/10 bg-black/40 p-5 flex flex-col gap-1 sticky top-0 h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-xl font-display font-bold text-brand mb-8 block", children: "EMERSON · ADMIN" }),
      links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: l.to, className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(l.to, l.exact) ? "bg-brand text-primary-foreground" : "hover:bg-white/5 opacity-80"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(l.icon, { className: "size-4" }),
        " ",
        l.label
      ] }, l.to)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/5 opacity-70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "size-4" }),
          " Ver a loja"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: logout, className: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/5 opacity-70 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
          " Sair"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-8 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  AdminLayout as component
};
