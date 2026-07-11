import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useServerFn } from "./router-BlUzkigm.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { j as listarClientesAdmin } from "./admin.functions-DL3WUSzr.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
const brl = (n) => n.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
});
function ClientesAdmin() {
  const fn = useServerFn(listarClientesAdmin);
  const [busca, setBusca] = reactExports.useState("");
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-clientes"],
    queryFn: () => fn()
  });
  if (isLoading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60", children: "Carregando..." });
  const filtrados = data.clientes.filter((c) => {
    const q = busca.toLowerCase();
    return !q || c.nome?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.telefone?.toLowerCase().includes(q);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold", children: "Clientes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "opacity-60 text-sm", children: [
          filtrados.length,
          " cliente(s)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Buscar por nome, email, telefone...", value: busca, onChange: (e) => setBusca(e.target.value), className: "input w-80" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/5 border border-white/10 rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Nome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Telefone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Pedidos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Gasto total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Cadastro" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        filtrados.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/5 hover:bg-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-medium", children: c.nome || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 opacity-80", children: c.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 opacity-80", children: c.telefone || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: c.pedidos }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-bold", children: brl(c.gasto) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 opacity-70", children: new Date(c.created_at).toLocaleDateString("pt-BR") })
        ] }, c.id)),
        filtrados.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-12 text-center opacity-60", children: "Nenhum cliente encontrado." }) })
      ] })
    ] }) })
  ] });
}
export {
  ClientesAdmin as component
};
