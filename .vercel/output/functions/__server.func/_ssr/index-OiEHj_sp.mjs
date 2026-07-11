import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useServerFn } from "./router-D6knOt8k.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as adminStats } from "./admin.functions-Cf1LV9rS.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { D as DollarSign, f as Percent, S as ShoppingBag, k as Clock, h as Users, g as Package } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./server-Bgc2LWWt.mjs";
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
import "./auth-middleware-BUW21sRT.mjs";
import "./auth-BSY1hqz4.mjs";
import "../_libs/auth__core.mjs";
import "../_libs/panva__hkdf.mjs";
import "../_libs/jose.mjs";
import "../_libs/preact-render-to-string.mjs";
import "../_libs/preact.mjs";
import "../_libs/oauth4webapi.mjs";
import "../_libs/start-authjs.mjs";
import "../_libs/zod.mjs";
const brl = (n) => n.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
});
function AdminDashboard() {
  const fn = useServerFn(adminStats);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fn()
  });
  if (isLoading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60", children: "Carregando..." });
  const max = Math.max(1, ...data.ultimos7.map((d) => d.total));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60 text-sm", children: "Visão geral da Emerson Store" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: DollarSign, label: "Faturamento", value: brl(data.faturamento) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Percent, label: "Minha comissão (10%)", value: brl(data.comissao ?? 0), accent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: ShoppingBag, label: "Vendas hoje", value: String(data.vendasHoje) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Clock, label: "Pedidos pendentes", value: String(data.totalPendentes) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Users, label: "Clientes", value: String(data.totalClientes) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Package, label: "Produtos", value: String(data.totalProdutos) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: ShoppingBag, label: "Total de pedidos", value: String(data.totalPedidos) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold mb-6", children: "Faturamento dos últimos 7 dias" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-3 h-48", children: data.ultimos7.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-60", children: brl(d.total) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-brand rounded-t-md transition-all", style: {
          height: `${d.total / max * 100}%`,
          minHeight: "4px"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-70", children: d.dia })
      ] }, d.dia)) })
    ] })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border p-5 ${accent ? "bg-brand/10 border-brand/40" : "bg-white/5 border-white/10"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `size-5 mb-3 ${accent ? "text-brand" : "opacity-60"}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-tight opacity-70", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold mt-1", children: value })
  ] });
}
export {
  AdminDashboard as component
};
