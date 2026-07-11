import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-Bb-1S0Oi.mjs";
import { u as useAuth } from "./useAuth-Adry0145.mjs";
import { S as StoreNav } from "./StoreNav-BlsI1KNG.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-CHLIm9Dg.mjs";
import "../_libs/auth__core.mjs";
import "../_libs/panva__hkdf.mjs";
import "../_libs/jose.mjs";
import "../_libs/preact-render-to-string.mjs";
import "../_libs/preact.mjs";
import "../_libs/oauth4webapi.mjs";
import "./router-BBvkWRQ4.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-CMbdw2-U.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "./auth-middleware-DQvKKjOX.mjs";
import "../_libs/start-authjs.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
const statusLabel = {
  pendente: "Pendente",
  pago: "Pago",
  enviado: "Enviado",
  entregue: "Entregue",
  cancelado: "Cancelado"
};
function MeusPedidosPage() {
  const {
    user
  } = useAuth();
  const [pedidos, setPedidos] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    (async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      const {
        data: profile
      } = await supabase.from("profiles").select("id").eq("email", user.email).maybeSingle();
      if (!profile?.id) {
        setLoading(false);
        return;
      }
      const {
        data
      } = await supabase.from("pedidos").select("id,created_at,status,total,frete,produtos,codigo_rastreio").eq("cliente_id", profile.id).order("created_at", {
        ascending: false
      });
      if (data) setPedidos(data);
      setLoading(false);
    })();
  }, [user]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StoreNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-3xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display font-bold", children: "Meus Pedidos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/minha-conta", className: "text-sm font-bold uppercase tracking-tight text-brand hover:underline", children: "← Minha conta" })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60", children: "Carregando..." }) : pedidos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-white/10 rounded-2xl p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-70 mb-6", children: "Você ainda não fez nenhum pedido." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-block bg-brand text-primary-foreground px-6 py-3 rounded-full font-bold uppercase tracking-tight text-sm", children: "Ir às compras" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: pedidos.map((p) => {
        const itens = Array.isArray(p.produtos) ? p.produtos : [];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-white/10 rounded-2xl p-5 bg-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs opacity-60 font-mono", children: [
              "#",
              p.id.slice(0, 8).toUpperCase()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-brand/20 text-brand px-3 py-1 rounded-full font-bold uppercase tracking-tight", children: statusLabel[p.status] ?? p.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-60 mb-3", children: new Date(p.created_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-sm space-y-1 mb-3", children: itens.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "opacity-80", children: [
            it.qty,
            "× ",
            it.name
          ] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs opacity-60", children: [
              "Frete: R$ ",
              p.frete.toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-lg", children: [
              "R$ ",
              p.total.toFixed(2)
            ] })
          ] }),
          p.codigo_rastreio && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mt-3 opacity-70", children: [
            "Rastreio: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: p.codigo_rastreio })
          ] })
        ] }, p.id);
      }) })
    ] })
  ] });
}
export {
  MeusPedidosPage as component
};
