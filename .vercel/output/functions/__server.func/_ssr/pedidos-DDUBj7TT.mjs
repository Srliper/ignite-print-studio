import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useServerFn } from "./router-BlUzkigm.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { e as listarPedidosAdmin, f as atualizarPedido } from "./admin.functions-DL3WUSzr.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
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
const STATUS = ["pendente", "pago", "enviado", "entregue", "cancelado"];
const statusColor = {
  pendente: "bg-amber-500/20 text-amber-300",
  pago: "bg-blue-500/20 text-blue-300",
  enviado: "bg-purple-500/20 text-purple-300",
  entregue: "bg-green-500/20 text-green-300",
  cancelado: "bg-red-500/20 text-red-300"
};
function PedidosAdmin() {
  const qc = useQueryClient();
  const listar = useServerFn(listarPedidosAdmin);
  const atualizar = useServerFn(atualizarPedido);
  const [filtro, setFiltro] = reactExports.useState("todos");
  const [aberto, setAberto] = reactExports.useState(null);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-pedidos"],
    queryFn: () => listar()
  });
  const mut = useMutation({
    mutationFn: (vars) => atualizar({
      data: vars
    }),
    onSuccess: () => {
      toast.success("Pedido atualizado");
      qc.invalidateQueries({
        queryKey: ["admin-pedidos"]
      });
      qc.invalidateQueries({
        queryKey: ["admin-stats"]
      });
    },
    onError: (e) => toast.error(e?.message ?? "Erro")
  });
  if (isLoading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60", children: "Carregando..." });
  const pedidos = data.pedidos.filter((p) => filtro === "todos" || p.status === filtro);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold", children: "Pedidos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "opacity-60 text-sm", children: [
          pedidos.length,
          " pedido(s)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FiltroBtn, { label: "Todos", active: filtro === "todos", onClick: () => setFiltro("todos") }),
        STATUS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(FiltroBtn, { label: s, active: filtro === s, onClick: () => setFiltro(s) }, s))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/5 border border-white/10 rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Pedido" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Rastreio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        pedidos.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/5 hover:bg-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-mono text-xs", children: p.id.slice(0, 8) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: new Date(p.created_at).toLocaleString("pt-BR") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-bold", children: brl(Number(p.total)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: p.status, onChange: (e) => mut.mutate({
              id: p.id,
              status: e.target.value
            }), className: `px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight border-0 ${statusColor[p.status]}`, children: STATUS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, className: "bg-background text-foreground", children: s }, s)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: p.codigo_rastreio ?? "", placeholder: "código...", onBlur: (e) => {
              if (e.target.value !== (p.codigo_rastreio ?? "")) {
                mut.mutate({
                  id: p.id,
                  codigo_rastreio: e.target.value
                });
              }
            }, className: "bg-white/5 border border-white/10 rounded px-2 py-1 text-xs w-32" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setAberto(aberto === p.id ? null : p.id), className: "text-xs uppercase tracking-tight opacity-70 hover:opacity-100", children: aberto === p.id ? "Fechar" : "Detalhes" }) })
          ] }),
          aberto === p.id && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-black/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold mb-2 uppercase tracking-tight", children: "Itens" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "bg-black/30 p-3 rounded overflow-auto max-h-60", children: JSON.stringify(p.produtos, null, 2) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold mb-2 uppercase tracking-tight", children: "Endereço" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "bg-black/30 p-3 rounded overflow-auto max-h-60", children: JSON.stringify(p.endereco_entrega, null, 2) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1 opacity-80", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "Subtotal: ",
                  brl(Number(p.subtotal))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "Frete: ",
                  brl(Number(p.frete))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "Desconto: ",
                  brl(Number(p.desconto))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "Pagamento: ",
                  p.metodo_pagamento ?? "—"
                ] }),
                p.observacoes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "Obs: ",
                  p.observacoes
                ] })
              ] })
            ] })
          ] }) }) })
        ] }, p.id)),
        pedidos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-12 text-center opacity-60", children: "Nenhum pedido encontrado." }) })
      ] })
    ] }) })
  ] });
}
function FiltroBtn({
  label,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick, className: `px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight transition-colors ${active ? "bg-brand text-primary-foreground" : "bg-white/5 hover:bg-white/10"}`, children: label });
}
export {
  PedidosAdmin as component
};
