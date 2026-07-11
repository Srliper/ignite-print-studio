import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-CXxm5UrO.mjs";
import { u as useAuth } from "./useAuth-C95FHI1X.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as Route$c } from "./router-BlUzkigm.mjs";
import "../_libs/seroval.mjs";
import { L as LoaderCircle, c as LogOut } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-Gf6avwXa.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
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
function GoogleIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "#4285F4",
        d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "#34A853",
        d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "#FBBC05",
        d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fill: "#EA4335",
        d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      }
    )
  ] });
}
function LoginButton({
  callbackUrl,
  className = "",
  label = "Entrar com Google",
  showLoggedInState = true
}) {
  const { user, signIn, signOut, isLoading, error } = useAuth();
  const [localLoading, setLocalLoading] = reactExports.useState(false);
  const loading = isLoading || localLoading;
  const handleSignIn = async () => {
    setLocalLoading(true);
    try {
      await signIn("google", callbackUrl);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Não foi possível iniciar o login com Google."
      );
    } finally {
      setLocalLoading(false);
    }
  };
  const handleSignOut = async () => {
    setLocalLoading(true);
    try {
      await signOut(callbackUrl ?? "/");
      toast.success("Sessão encerrada com sucesso.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao sair da conta.");
    } finally {
      setLocalLoading(false);
    }
  };
  if (showLoggedInState && user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `w-full ${className}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10", children: [
        user.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: user.image,
            alt: user.name ?? "Usuário",
            className: "size-10 rounded-full border-2 border-brand/40"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold", children: (user.name ?? user.email ?? "?").charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold truncate", children: user.name ?? "Usuário" }),
          user.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-60 truncate", children: user.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleSignOut,
          disabled: loading,
          className: "mt-3 w-full border-2 border-white/20 hover:border-red-400/50 hover:bg-red-500/10 rounded-full py-3 font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
          children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }),
            "Saindo..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
            "Sair"
          ] })
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleSignIn,
        disabled: loading,
        className: `w-full border-2 border-white/20 hover:border-white/40 hover:bg-white/5 rounded-full py-3.5 font-semibold flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`,
        children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-5 animate-spin" }),
          "Conectando..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleIcon, {}),
          label
        ] })
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-red-400 text-center", role: "alert", children: error })
  ] });
}
function AuthPage() {
  const navigate = useNavigate();
  const {
    callbackUrl,
    error: authError
  } = Route$c.useSearch();
  const {
    user
  } = useAuth();
  const [mode, setMode] = reactExports.useState("login");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [nome, setNome] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const destination = callbackUrl ?? "/";
  reactExports.useEffect(() => {
    if (user) {
      navigate({
        to: destination,
        replace: true
      });
    }
  }, [user, navigate, destination]);
  reactExports.useEffect(() => {
    if (authError) {
      const messages = {
        OAuthSignin: "Erro ao iniciar login com Google. Verifique as credenciais OAuth.",
        OAuthCallback: "Erro no retorno do Google. Verifique o Redirect URI no Google Console.",
        OAuthCreateAccount: "Não foi possível criar a conta.",
        Callback: "Erro no callback de autenticação.",
        AccessDenied: "Acesso negado. Você cancelou o login ou não tem permissão.",
        Configuration: "Erro de configuração do servidor (AUTH_SECRET ou credenciais Google).",
        Default: "Erro na autenticação Google. Tente novamente."
      };
      toast.error(messages[authError] ?? messages.Default);
    }
  }, [authError]);
  const handleEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              nome
            }
          }
        });
        if (error) throw error;
        toast.success("Conta criada! Verifique seu email para confirmar.");
      } else {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success("Bem-vindo de volta!");
        navigate({
          to: destination,
          replace: true
        });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6 h-20 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-2xl font-display font-bold tracking-tighter text-brand", children: "EMERSON STORE" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 flex items-center justify-center px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display font-bold mb-2", children: mode === "login" ? "Entrar" : "Criar conta" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-70 mb-8", children: mode === "login" ? "Acesse sua conta para finalizar pedidos." : "Cadastre-se para comprar e acompanhar pedidos." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoginButton, { callbackUrl: destination }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 my-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-white/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-50 uppercase tracking-wider", children: "ou email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-white/10" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleEmail, className: "space-y-4", children: [
        mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-tight mb-2 block", children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: nome, onChange: (e) => setNome(e.target.value), required: true, className: "w-full bg-white/5 border-2 border-white/10 focus:border-brand rounded-xl px-4 py-3 outline-none transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-tight mb-2 block", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full bg-white/5 border-2 border-white/10 focus:border-brand rounded-xl px-4 py-3 outline-none transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-tight mb-2 block", children: "Senha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6, className: "w-full bg-white/5 border-2 border-white/10 focus:border-brand rounded-xl px-4 py-3 outline-none transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full bg-brand text-primary-foreground rounded-full py-3.5 font-bold uppercase tracking-tight hover:scale-[1.02] transition-transform disabled:opacity-50", children: loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode(mode === "login" ? "signup" : "login"), className: "w-full mt-6 text-sm opacity-70 hover:opacity-100 transition-opacity", children: mode === "login" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar" })
    ] }) })
  ] });
}
export {
  AuthPage as component
};
