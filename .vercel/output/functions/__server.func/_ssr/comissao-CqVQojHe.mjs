import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useServerFn } from "./router-D6knOt8k.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as comissaoPorProduto } from "./admin.functions-Cf1LV9rS.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { D as DollarSign, f as Percent, S as ShoppingBag } from "../_libs/lucide-react.mjs";
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
function ComissaoPage() {
  const fn = useServerFn(comissaoPorProduto);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-comissao"],
    queryFn: () => fn()
  });
  if (isLoading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60", children: "Carregando..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold", children: "Minha comissão" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60 text-sm", children: "10% sobre cada produto vendido (pedidos pagos, enviados ou entregues)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: DollarSign, label: "Receita total", value: brl(data.receitaTotal) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: Percent, label: "Comissão total (10%)", value: brl(data.comissaoTotal), accent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: ShoppingBag, label: "Pedidos pagos", value: String(data.pedidosPagos) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-b border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold", children: "Comissão por produto" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Produto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-right", children: "Qtd vendida" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-right", children: "Receita" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-right", children: "Comissão (10%)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          data.linhas.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/5 hover:bg-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: l.nome }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right", children: l.qtd }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right", children: brl(l.receita) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right font-bold text-brand", children: brl(l.comissao) })
          ] }, l.nome)),
          data.linhas.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-12 text-center opacity-60", children: "Nenhuma venda registrada ainda." }) })
        ] })
      ] })
    ] })
  ] });
}
function Card({
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
  ComissaoPage as component
};
