import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useServerFn } from "./router-BlUzkigm.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { g as listarFuncionarios, p as promoverAdmin, h as revogarAdmin } from "./admin.functions-DL3WUSzr.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { d as Shield, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/zod.mjs";
function EquipeAdmin() {
  const qc = useQueryClient();
  const listar = useServerFn(listarFuncionarios);
  const promover = useServerFn(promoverAdmin);
  const revogar = useServerFn(revogarAdmin);
  const [email, setEmail] = reactExports.useState("");
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-equipe"],
    queryFn: () => listar()
  });
  const promMut = useMutation({
    mutationFn: (e) => promover({
      data: {
        email: e
      }
    }),
    onSuccess: () => {
      toast.success("Administrador adicionado");
      setEmail("");
      qc.invalidateQueries({
        queryKey: ["admin-equipe"]
      });
    },
    onError: (e) => toast.error(e?.message ?? "Erro")
  });
  const revMut = useMutation({
    mutationFn: (user_id) => revogar({
      data: {
        user_id
      }
    }),
    onSuccess: () => {
      toast.success("Acesso revogado");
      qc.invalidateQueries({
        queryKey: ["admin-equipe"]
      });
    },
    onError: (e) => toast.error(e?.message ?? "Erro")
  });
  if (isLoading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60", children: "Carregando..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold", children: "Equipe" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60 text-sm", children: "Gerencie quem tem acesso ao painel administrativo" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-4 text-brand" }),
        " Adicionar administrador"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-70 mb-4", children: "A pessoa precisa estar cadastrada na loja antes de ser promovida." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        promMut.mutate(email);
      }, className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "email@exemplo.com", className: "input flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: promMut.isPending, className: "bg-brand text-primary-foreground px-6 py-2.5 rounded-full font-bold uppercase tracking-tight text-xs", children: "Promover" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/5 border border-white/10 rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Nome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Desde" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data.admins.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-medium", children: a.nome || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 opacity-80", children: a.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 opacity-70", children: new Date(a.created_at).toLocaleDateString("pt-BR") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          if (confirm(`Revogar acesso admin de ${a.email}?`)) revMut.mutate(a.user_id);
        }, className: "p-2 hover:bg-red-500/20 text-red-300 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) }) })
      ] }, a.user_id)) })
    ] }) })
  ] });
}
export {
  EquipeAdmin as component
};
