import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-CXxm5UrO.mjs";
import { u as useAuth } from "./useAuth-DfKr0nXu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as StoreNav } from "./StoreNav-DO01_cYz.mjs";
import "../_libs/seroval.mjs";
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
import "./auth-BSY1hqz4.mjs";
import "../_libs/auth__core.mjs";
import "../_libs/panva__hkdf.mjs";
import "../_libs/jose.mjs";
import "../_libs/preact-render-to-string.mjs";
import "../_libs/preact.mjs";
import "../_libs/oauth4webapi.mjs";
import "./router-D6knOt8k.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-Bgc2LWWt.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "./auth-middleware-BUW21sRT.mjs";
import "../_libs/start-authjs.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function MinhaContaPage() {
  const {
    user,
    signOut
  } = useAuth();
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [profile, setProfile] = reactExports.useState({
    nome: user?.name ?? "",
    email: user?.email ?? null,
    telefone: null,
    endereco: null
  });
  reactExports.useEffect(() => {
    (async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      const {
        data
      } = await supabase.from("profiles").select("nome,email,telefone,endereco").eq("email", user.email).maybeSingle();
      if (data) {
        setProfile(data);
      } else {
        setProfile((prev) => ({
          ...prev,
          nome: user.name ?? prev.nome,
          email: user.email ?? prev.email
        }));
      }
      setLoading(false);
    })();
  }, [user]);
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (!user?.email) {
      setSaving(false);
      toast.error("Sessão inválida. Faça login novamente.");
      return;
    }
    const {
      error
    } = await supabase.from("profiles").upsert({
      email: user.email,
      nome: profile.nome,
      telefone: profile.telefone,
      endereco: profile.endereco
    }, {
      onConflict: "email"
    });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Dados atualizados!");
  };
  const logout = async () => {
    try {
      await signOut("/");
    } catch {
      toast.error("Erro ao sair da conta.");
    }
  };
  const end = profile.endereco ?? {};
  const setEnd = (patch) => setProfile({
    ...profile,
    endereco: {
      ...end,
      ...patch
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StoreNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-3xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display font-bold", children: "Minha Conta" }),
          user && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm opacity-70 mt-2", children: [
            "Olá, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand font-semibold", children: user.name ?? user.email }),
            "!"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/meus-pedidos", className: "text-sm font-bold uppercase tracking-tight text-brand hover:underline", children: "Meus pedidos →" })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60", children: "Carregando..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: profile.nome, onChange: (e) => setProfile({
          ...profile,
          nome: e.target.value
        }), className: "input", required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: profile.email ?? "", disabled: true, className: "input opacity-60" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Telefone (WhatsApp)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: profile.telefone ?? "", onChange: (e) => setProfile({
          ...profile,
          telefone: e.target.value
        }), placeholder: "(11) 99999-9999", className: "input" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold pt-6", children: "Endereço de entrega" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "CEP", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.cep ?? "", onChange: (e) => setEnd({
            cep: e.target.value
          }), className: "input" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Estado", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.estado ?? "", onChange: (e) => setEnd({
            estado: e.target.value
          }), className: "input" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Rua", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.rua ?? "", onChange: (e) => setEnd({
          rua: e.target.value
        }), className: "input" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Número", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.numero ?? "", onChange: (e) => setEnd({
            numero: e.target.value
          }), className: "input" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Complemento", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.complemento ?? "", onChange: (e) => setEnd({
            complemento: e.target.value
          }), className: "input" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bairro", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.bairro ?? "", onChange: (e) => setEnd({
            bairro: e.target.value
          }), className: "input" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cidade", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.cidade ?? "", onChange: (e) => setEnd({
            cidade: e.target.value
          }), className: "input" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saving, className: "bg-brand text-primary-foreground px-8 py-3.5 rounded-full font-bold uppercase tracking-tight hover:scale-[1.02] transition-transform disabled:opacity-50", children: saving ? "Salvando..." : "Salvar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: logout, className: "border-2 border-white/20 hover:border-white/40 px-8 py-3.5 rounded-full font-bold uppercase tracking-tight transition-colors", children: "Sair" })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-tight mb-2 block opacity-80", children: label }),
    children
  ] });
}
export {
  MinhaContaPage as component
};
