import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { o as openWhatsApp } from "./whatsapp-Bk-mZZnG.mjs";
import { R as Route$d } from "./router-BlUzkigm.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { b as CircleCheck } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
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
function PedidoConfirmado() {
  const {
    id
  } = Route$d.useSearch();
  const codigo = id ? id.slice(0, 8).toUpperCase() : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full text-center space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex p-4 rounded-full bg-green-500/20 text-green-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-12" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold", children: "Pedido confirmado!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "opacity-70", children: [
      "Seu pedido ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold", children: [
        "#",
        codigo
      ] }),
      " foi registrado. Em breve entraremos em contato para combinar o pagamento."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openWhatsApp(`Olá! Sobre meu pedido #${codigo}`), className: "w-full bg-brand text-primary-foreground rounded-full py-3.5 font-bold uppercase tracking-tight text-sm", children: "Falar no WhatsApp" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "w-full border border-white/20 rounded-full py-3.5 font-bold uppercase tracking-tight text-sm hover:bg-white/5", children: "Voltar para a loja" })
    ] })
  ] }) });
}
export {
  PedidoConfirmado as component
};
