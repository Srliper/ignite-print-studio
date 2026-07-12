import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQuery, a as useQueryClient, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, d as useNavigate, e as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { Q as redirect, l as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-DnBW8DQC.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { c as create, p as persist } from "../_libs/zustand.mjs";
import { s as supabase } from "./client-Bb-1S0Oi.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BTzJPIcM.mjs";
import { A as AUTH_BASE_PATH, g as getAuthConfig } from "./auth-CHLIm9Dg.mjs";
import { S as StartAuthJS } from "../_libs/start-authjs.mjs";
import "../_libs/auth__core.mjs";
import "../_libs/seroval.mjs";
import { S as ShoppingBag, X, T as Trash2, M as Minus, P as Plus, C as CircleCheck, a as ChevronLeft, b as Check, L as LoaderCircle, c as LogOut, d as Shield, U as User, e as LayoutDashboard, f as Percent, g as Package, h as Users, i as UserCog, j as Store, D as DollarSign, k as Clock, l as Pencil, m as Upload } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, e as enumType, a as arrayType, b as booleanType, n as numberType, r as recordType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/preact.mjs";
import "../_libs/panva__hkdf.mjs";
import "../_libs/jose.mjs";
import "../_libs/preact-render-to-string.mjs";
import "../_libs/oauth4webapi.mjs";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
const appCss = "/assets/styles-B3XZFiYW.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const fetchAuthSession = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a5bd66eb4dc18e634193e8cd2782a09e2ce407953c06bc3b2e156f0191a637c9"));
const AuthContext = reactExports.createContext(null);
function AuthProvider({ children }) {
  const router = useRouter();
  const [session, setSession] = reactExports.useState(null);
  const [isReady, setIsReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let active = true;
    fetchAuthSession().then((s) => {
      if (active) setSession(s);
    }).catch(() => {
      if (active) setSession(null);
    }).finally(() => {
      if (active) setIsReady(true);
    });
    return () => {
      active = false;
    };
  }, []);
  const refreshSession = async () => {
    try {
      const s = await fetchAuthSession();
      setSession(s);
    } catch {
      setSession(null);
    }
    await router.invalidate();
  };
  const user = session?.user ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: { session, user, isReady, refreshSession }, children });
}
function useAuthContext() {
  const context = reactExports.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de <AuthProvider>.");
  }
  return context;
}
const sameLine = (a, b) => a.productId === b.productId && JSON.stringify(a.options ?? {}) === JSON.stringify(b.options ?? {});
const useCart = create()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (item) => set((s) => {
        const qty = item.qty ?? 1;
        const existing = s.items.find((it) => sameLine(it, item));
        if (existing) {
          return {
            items: s.items.map(
              (it) => it.id === existing.id ? { ...it, qty: it.qty + qty } : it
            ),
            isOpen: true
          };
        }
        return {
          items: [...s.items, { ...item, qty }],
          isOpen: true
        };
      }),
      remove: (id) => set((s) => ({ items: s.items.filter((it) => it.id !== id) })),
      setQty: (id, qty) => set((s) => ({
        items: s.items.map((it) => it.id === id ? { ...it, qty: Math.max(1, qty) } : it).filter((it) => it.qty > 0)
      })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen }))
    }),
    {
      name: "emerson-cart-v1",
      partialize: (s) => ({ items: s.items })
    }
  )
);
const parsePrice = (s) => {
  const cleaned = s.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
};
const formatBRL = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const SUDESTE = ["RJ", "MG", "ES"];
const SUL = ["PR", "SC", "RS"];
const CENTRO_OESTE = ["DF", "GO", "MT", "MS"];
const NORDESTE = ["BA", "SE", "AL", "PE", "PB", "RN", "CE", "PI", "MA"];
const NORTE = ["TO", "PA", "AP", "RR", "AM", "AC", "RO"];
function calcularFreteFixo(uf, subtotal) {
  const u = uf.toUpperCase();
  let pac = 25;
  let sedex = 40;
  let prazoPac = 5;
  let prazoSedex = 2;
  if (u === "SP") {
    pac = 18;
    sedex = 30;
    prazoPac = 3;
    prazoSedex = 1;
  } else if (SUDESTE.includes(u)) {
    pac = 28;
    sedex = 45;
    prazoPac = 5;
    prazoSedex = 2;
  } else if (SUL.includes(u)) {
    pac = 32;
    sedex = 55;
    prazoPac = 6;
    prazoSedex = 3;
  } else if (CENTRO_OESTE.includes(u)) {
    pac = 38;
    sedex = 65;
    prazoPac = 7;
    prazoSedex = 3;
  } else if (NORDESTE.includes(u)) {
    pac = 45;
    sedex = 75;
    prazoPac = 9;
    prazoSedex = 4;
  } else if (NORTE.includes(u)) {
    pac = 55;
    sedex = 95;
    prazoPac = 12;
    prazoSedex = 5;
  }
  if (subtotal >= 300) pac = 0;
  return [
    { servico: "PAC", prazo: prazoPac, valor: pac },
    { servico: "SEDEX", prazo: prazoSedex, valor: sedex }
  ];
}
const onlyDigits = (s) => s.replace(/\D/g, "");
async function buscarCep(cep) {
  const c = onlyDigits(cep);
  if (c.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${c}/json/`);
    if (!res.ok) return null;
    const d = await res.json();
    if (d.erro) return null;
    return {
      cep: c,
      rua: d.logradouro ?? "",
      bairro: d.bairro ?? "",
      cidade: d.localidade ?? "",
      uf: d.uf ?? ""
    };
  } catch {
    return null;
  }
}
const itemSchema = objectType({
  id: stringType().min(1).max(200),
  productId: stringType().min(1).max(200),
  category: stringType().min(1).max(40),
  name: stringType().min(1).max(200),
  price: numberType().min(0),
  qty: numberType().int().min(1).max(999),
  image: stringType().max(2e3).optional(),
  options: recordType(stringType(), stringType()).optional()
});
const enderecoSchema = objectType({
  nome: stringType().trim().min(2).max(120),
  telefone: stringType().trim().min(8).max(20),
  cep: stringType().regex(/^\d{8}$/),
  rua: stringType().trim().min(2).max(200),
  numero: stringType().trim().min(1).max(20),
  complemento: stringType().trim().max(100).optional().default(""),
  bairro: stringType().trim().min(2).max(120),
  cidade: stringType().trim().min(2).max(120),
  uf: stringType().trim().length(2)
});
const freteSchema = objectType({
  servico: stringType().min(1).max(40),
  prazo: numberType().int().min(0).max(60),
  valor: numberType().min(0).max(1e4)
});
const criarPedido = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  itens: arrayType(itemSchema).min(1).max(50),
  endereco: enderecoSchema,
  frete: freteSchema,
  observacoes: stringType().max(1e3).optional()
}).parse(d)).handler(createSsrRpc("3a033da0b2908233e28b4239931b49889f82a4ac50cd310935a57b5ebc6e1593"));
const enderecoVazio = {
  nome: "",
  telefone: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: ""
};
function CheckoutDrawer({ open, onClose }) {
  const { items, clear } = useCart();
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const [step, setStep] = reactExports.useState(1);
  const [end, setEnd] = reactExports.useState(enderecoVazio);
  const [buscandoCep, setBuscandoCep] = reactExports.useState(false);
  const [opcoes, setOpcoes] = reactExports.useState([]);
  const [freteSel, setFreteSel] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const criar = useServerFn(criarPedido);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!open) {
      setStep(1);
      setFreteSel(null);
      setOpcoes([]);
    }
  }, [open]);
  reactExports.useEffect(() => {
    if (!open) return;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: prof } = await supabase.from("profiles").select("nome,telefone").eq("id", session.user.id).maybeSingle();
      if (prof) {
        setEnd((e) => ({
          ...e,
          nome: e.nome || (prof.nome ?? ""),
          telefone: e.telefone || (prof.telefone ?? "")
        }));
      }
    })();
  }, [open]);
  const onCepBlur = async (cep) => {
    const c = onlyDigits(cep);
    if (c.length !== 8) return;
    setBuscandoCep(true);
    const r = await buscarCep(c);
    setBuscandoCep(false);
    if (!r) {
      toast.error("CEP não encontrado");
      return;
    }
    setEnd((e) => ({ ...e, cep: c, rua: r.rua || e.rua, bairro: r.bairro || e.bairro, cidade: r.cidade, uf: r.uf }));
  };
  const irParaFrete = () => {
    const required = ["nome", "telefone", "cep", "rua", "numero", "bairro", "cidade", "uf"];
    for (const k of required) {
      if (!end[k] || end[k].toString().trim().length < 2) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }
    }
    if (onlyDigits(end.cep).length !== 8) {
      toast.error("CEP inválido");
      return;
    }
    if (end.uf.length !== 2) {
      toast.error("UF inválida");
      return;
    }
    const opts = calcularFreteFixo(end.uf, subtotal);
    setOpcoes(opts);
    setFreteSel(opts[0]);
    setStep(2);
  };
  const finalizar = async () => {
    if (!freteSel) return;
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.info("Entre na sua conta para finalizar");
        onClose();
        navigate({ to: "/auth" });
        return;
      }
      const payload = {
        itens: items.map((it) => ({
          id: it.id,
          productId: it.productId,
          category: it.category,
          name: it.name,
          price: it.price,
          qty: it.qty,
          image: it.image,
          options: it.options
        })),
        endereco: { ...end, cep: onlyDigits(end.cep), uf: end.uf.toUpperCase() },
        frete: freteSel
      };
      const pedido = await criar({ data: payload });
      clear();
      onClose();
      toast.success("Pedido registrado!");
      navigate({ to: "/pedido-confirmado", search: { id: pedido.id } });
    } catch (e) {
      toast.error(e?.message ?? "Erro ao registrar pedido");
    } finally {
      setLoading(false);
    }
  };
  const total = subtotal + (freteSel?.valor ?? 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: onClose, className: "fixed inset-0 bg-black/70 z-[80] backdrop-blur-sm", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `fixed top-0 right-0 z-[90] h-full w-full max-w-md bg-background border-l border-white/10 shadow-2xl transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`,
        "aria-hidden": !open,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5 border-b border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              step > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStep((s) => s - 1), className: "p-1 hover:bg-white/5 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-bold", children: step === 1 ? "Endereço" : step === 2 ? "Entrega" : "Confirmar" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 hover:bg-white/5 rounded-full", "aria-label": "Fechar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 flex gap-1.5", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 flex-1 rounded-full ${n <= step ? "bg-brand" : "bg-white/10"}` }, n)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-5 space-y-4", children: [
            step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Nome completo *", value: end.nome, onChange: (v) => setEnd({ ...end, nome: v }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "WhatsApp *", value: end.telefone, onChange: (v) => setEnd({ ...end, telefone: v }), placeholder: "(11) 99999-9999" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Field$1,
                  {
                    label: "CEP *",
                    value: end.cep,
                    onChange: (v) => setEnd({ ...end, cep: onlyDigits(v) }),
                    onBlur: (v) => onCepBlur(v),
                    placeholder: "00000-000",
                    maxLength: 9
                  }
                ) }),
                buscandoCep && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "self-end pb-3 text-xs opacity-60", children: "Buscando..." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Rua *", value: end.rua, onChange: (v) => setEnd({ ...end, rua: v }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Número *", value: end.numero, onChange: (v) => setEnd({ ...end, numero: v }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Complemento", value: end.complemento, onChange: (v) => setEnd({ ...end, complemento: v }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Bairro *", value: end.bairro, onChange: (v) => setEnd({ ...end, bairro: v }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_5rem] gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Cidade *", value: end.cidade, onChange: (v) => setEnd({ ...end, cidade: v }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "UF *", value: end.uf, onChange: (v) => setEnd({ ...end, uf: v.toUpperCase().slice(0, 2) }), maxLength: 2 })
              ] })
            ] }),
            step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs opacity-60", children: [
                "Entrega em ",
                end.cidade,
                "/",
                end.uf
              ] }),
              opcoes.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setFreteSel(o),
                  className: `w-full text-left p-4 rounded-xl border transition-colors ${freteSel?.servico === o.servico ? "border-brand bg-brand/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: o.servico }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs opacity-70", children: [
                        "Prazo: ",
                        o.prazo,
                        " dia(s) útil(eis)"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-brand", children: o.valor === 0 ? "GRÁTIS" : formatBRL(o.valor) }),
                      freteSel?.servico === o.servico && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4 ml-auto mt-1 text-brand" })
                    ] })
                  ] })
                },
                o.servico
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] opacity-50 text-center pt-2", children: "Frete estimado. Confirmação no envio." })
            ] }),
            step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-4 space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold uppercase tracking-tight text-xs opacity-70", children: "Entrega" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  end.nome,
                  " · ",
                  end.telefone
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "opacity-80", children: [
                  end.rua,
                  ", ",
                  end.numero,
                  end.complemento ? ` - ${end.complemento}` : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "opacity-80", children: [
                  end.bairro,
                  " · ",
                  end.cidade,
                  "/",
                  end.uf,
                  " · CEP ",
                  end.cep
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs opacity-60 pt-1", children: [
                  freteSel?.servico,
                  " — ",
                  freteSel?.prazo,
                  " dia(s)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-4 space-y-1.5 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold uppercase tracking-tight text-xs opacity-70 mb-2", children: [
                  "Itens (",
                  items.length,
                  ")"
                ] }),
                items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-80 truncate", children: [
                    it.qty,
                    "x ",
                    it.name
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatBRL(it.price * it.qty) })
                ] }, it.id))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-4 space-y-1.5 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Subtotal", value: formatBRL(subtotal) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Frete (${freteSel?.servico})`, value: freteSel?.valor === 0 ? "GRÁTIS" : formatBRL(freteSel?.valor ?? 0) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 pt-2 mt-2 flex justify-between text-lg font-bold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: formatBRL(total) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs", children: "Pagamento online em breve. Após confirmar, combinaremos PIX ou outra forma pelo WhatsApp." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 p-5", children: [
            step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: irParaFrete, className: "w-full bg-brand text-primary-foreground rounded-full py-3.5 font-bold uppercase tracking-tight text-sm hover:scale-[1.02] transition-transform", children: "Continuar" }),
            step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStep(3), disabled: !freteSel, className: "w-full bg-brand text-primary-foreground rounded-full py-3.5 font-bold uppercase tracking-tight text-sm hover:scale-[1.02] transition-transform disabled:opacity-60", children: "Revisar pedido" }),
            step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: finalizar, disabled: loading, className: "w-full bg-brand text-primary-foreground rounded-full py-3.5 font-bold uppercase tracking-tight text-sm hover:scale-[1.02] transition-transform disabled:opacity-60 flex items-center justify-center gap-2", children: [
              loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }),
              loading ? "Enviando..." : `Confirmar pedido · ${formatBRL(total)}`
            ] })
          ] })
        ]
      }
    )
  ] });
}
function Field$1({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  maxLength
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-tight opacity-70 mb-1.5 block", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        value,
        onChange: (e) => onChange(e.target.value),
        onBlur: onBlur ? (e) => onBlur(e.target.value) : void 0,
        placeholder,
        maxLength,
        className: "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand transition-colors"
      }
    )
  ] });
}
function Row({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: value })
  ] });
}
function CartDrawer() {
  const { items, isOpen, close, setQty, remove, clear } = useCart();
  const total = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = reactExports.useState(false);
  const irParaCheckout = async () => {
    if (items.length === 0) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.info("Entre na sua conta para finalizar o pedido.");
      close();
      navigate({ to: "/auth" });
      return;
    }
    setCheckoutOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        onClick: close,
        className: "fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm",
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-background border-l border-white/10 shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`,
        "aria-hidden": !isOpen,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5 border-b border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-display font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-5" }),
              " Seu carrinho"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: close,
                className: "p-2 hover:bg-white/5 rounded-full transition-colors",
                "aria-label": "Fechar carrinho",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-5 space-y-4", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 opacity-60 text-sm", children: "Seu carrinho está vazio." }) : items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex gap-4 bg-surface rounded-xl p-3 border border-white/5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: it.image,
                    alt: it.name,
                    className: "size-20 rounded-lg object-cover flex-shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm truncate", children: it.name }),
                      it.options && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-60 mt-0.5 line-clamp-2", children: Object.entries(it.options).map(([k, v]) => `${k}: ${v}`).join(" · ") })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => remove(it.id),
                        className: "opacity-60 hover:opacity-100 hover:text-red-400 transition-colors flex-shrink-0",
                        "aria-label": "Remover",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-white/5 rounded-full", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => setQty(it.id, it.qty - 1),
                          className: "p-1.5 hover:bg-white/10 rounded-full",
                          "aria-label": "Diminuir",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "size-3" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold w-6 text-center", children: it.qty }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => setQty(it.id, it.qty + 1),
                          className: "p-1.5 hover:bg-white/10 rounded-full",
                          "aria-label": "Aumentar",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-3" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand font-bold text-sm", children: formatBRL(it.price * it.qty) })
                  ] })
                ] })
              ]
            },
            it.id
          )) }),
          items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 p-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm opacity-70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatBRL(total) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] opacity-50", children: "Frete calculado na próxima etapa." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: irParaCheckout,
                className: "w-full bg-brand text-primary-foreground rounded-full py-3.5 font-bold uppercase tracking-tight text-sm hover:scale-[1.02] transition-transform",
                children: "Finalizar compra"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: clear,
                className: "w-full text-xs opacity-60 hover:opacity-100 transition-opacity",
                children: "Esvaziar carrinho"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutDrawer, { open: checkoutOpen, onClose: () => setCheckoutOpen(false) })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$e = createRootRouteWithContext()({
  // Sessão carregada no cliente via AuthProvider (evita crash SSR na Vercel)
  beforeLoad: () => ({ session: null }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$e.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartDrawer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const WHATSAPP_NUMBER = "5515981183740";
function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
const Route$d = createFileRoute("/pedido-confirmado")({
  validateSearch: objectType({ id: stringType().optional() }),
  component: PedidoConfirmado,
  head: () => ({
    meta: [
      { title: "Pedido confirmado" },
      { name: "robots", content: "noindex" }
    ]
  })
});
function PedidoConfirmado() {
  const { id } = Route$d.useSearch();
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => openWhatsApp(`Olá! Sobre meu pedido #${codigo}`),
          className: "w-full bg-brand text-primary-foreground rounded-full py-3.5 font-bold uppercase tracking-tight text-sm",
          children: "Falar no WhatsApp"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/",
          className: "w-full border border-white/20 rounded-full py-3.5 font-bold uppercase tracking-tight text-sm hover:bg-white/5",
          children: "Voltar para a loja"
        }
      )
    ] })
  ] }) });
}
async function fetchCsrfToken() {
  const response = await fetch(`${AUTH_BASE_PATH}/csrf`, { credentials: "include" });
  if (!response.ok) {
    throw new Error("Não foi possível obter o token CSRF de autenticação.");
  }
  const data = await response.json();
  if (!data.csrfToken) {
    throw new Error("Resposta CSRF inválida do servidor de autenticação.");
  }
  return data.csrfToken;
}
function useAuth() {
  useRouter();
  const { session, user, isReady, refreshSession } = useAuthContext();
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const getSession = reactExports.useCallback(async () => {
    try {
      return await fetchAuthSession();
    } catch (err) {
      console.error("[useAuth] Erro ao buscar sessão:", err);
      return null;
    }
  }, []);
  const signIn = reactExports.useCallback(async (provider, callbackUrl) => {
    setIsLoading(true);
    setError(null);
    try {
      const csrfToken = await fetchCsrfToken();
      const destination = callbackUrl ?? `${window.location.origin}/`;
      const body = new URLSearchParams({
        csrfToken,
        callbackUrl: destination
      });
      const response = await fetch(`${AUTH_BASE_PATH}/signin/${provider}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        credentials: "include",
        redirect: "manual"
      });
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("Location");
        if (location) {
          window.location.href = location;
          return;
        }
      }
      if (response.redirected && response.url) {
        window.location.href = response.url;
        return;
      }
      window.location.href = `${AUTH_BASE_PATH}/signin/${provider}?callbackUrl=${encodeURIComponent(destination)}`;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao iniciar login com Google.";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const signOut = reactExports.useCallback(
    async (callbackUrl) => {
      setIsLoading(true);
      setError(null);
      try {
        const csrfToken = await fetchCsrfToken();
        const destination = callbackUrl ?? `${window.location.origin}/`;
        await fetch(`${AUTH_BASE_PATH}/signout`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ csrfToken, callbackUrl: destination }),
          credentials: "include"
        });
        await refreshSession();
        window.location.href = destination;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Falha ao encerrar sessão.";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [refreshSession]
  );
  return {
    user,
    session,
    isLoading,
    isReady,
    error,
    signIn,
    signOut,
    getSession,
    refreshSession
  };
}
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
const authSearchSchema = objectType({
  callbackUrl: stringType().optional(),
  error: stringType().optional()
});
const Route$c = createFileRoute("/auth")({
  validateSearch: authSearchSchema,
  beforeLoad: async ({ search }) => {
    try {
      const session = await fetchAuthSession();
      if (session?.user) {
        const dest = search.callbackUrl?.startsWith("/") ? search.callbackUrl : "/";
        throw redirect({ to: dest });
      }
    } catch (error) {
      if (error && typeof error === "object" && "to" in error) throw error;
      console.error("[auth] Erro ao verificar sessão:", error);
    }
  },
  head: () => ({
    meta: [
      { title: "Entrar — Emerson Store" },
      { name: "description", content: "Acesse sua conta na Emerson Store." }
    ]
  }),
  component: AuthPage
});
function AuthPage() {
  const navigate = useNavigate();
  const { callbackUrl, error: authError } = Route$c.useSearch();
  const { user } = useAuth();
  const [mode, setMode] = reactExports.useState("login");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [nome, setNome] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const destination = callbackUrl ?? "/";
  reactExports.useEffect(() => {
    if (user) {
      navigate({ to: destination, replace: true });
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
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { nome }
          }
        });
        if (error) throw error;
        toast.success("Conta criada! Verifique seu email para confirmar.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success("Bem-vindo de volta!");
        navigate({ to: destination, replace: true });
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: nome,
              onChange: (e) => setNome(e.target.value),
              required: true,
              className: "w-full bg-white/5 border-2 border-white/10 focus:border-brand rounded-xl px-4 py-3 outline-none transition-colors"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-tight mb-2 block", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true,
              className: "w-full bg-white/5 border-2 border-white/10 focus:border-brand rounded-xl px-4 py-3 outline-none transition-colors"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-tight mb-2 block", children: "Senha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: true,
              minLength: 6,
              className: "w-full bg-white/5 border-2 border-white/10 focus:border-brand rounded-xl px-4 py-3 outline-none transition-colors"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "w-full bg-brand text-primary-foreground rounded-full py-3.5 font-bold uppercase tracking-tight hover:scale-[1.02] transition-transform disabled:opacity-50",
            children: loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setMode(mode === "login" ? "signup" : "login"),
          className: "w-full mt-6 text-sm opacity-70 hover:opacity-100 transition-opacity",
          children: mode === "login" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"
        }
      )
    ] }) })
  ] });
}
const Route$b = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    let session = null;
    try {
      session = await fetchAuthSession();
    } catch (error) {
      console.error("[auth] Erro ao verificar sessão:", error);
    }
    if (!session?.user) {
      throw redirect({
        to: "/auth",
        search: { callbackUrl: location.pathname }
      });
    }
    return { user: session.user };
  },
  component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
});
function CartButton() {
  const { items, toggle } = useCart();
  const count = items.reduce((a, b) => a + b.qty, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: toggle,
      className: "relative flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tight transition-colors",
      "aria-label": "Abrir carrinho",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Carrinho" }),
        count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 bg-brand text-primary-foreground text-[10px] font-bold size-5 rounded-full flex items-center justify-center", children: count })
      ]
    }
  );
}
const logo = "/assets/logo-B38i25Jl.png";
function StoreNav() {
  const { user } = useAuth();
  const signedIn = !!user;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 h-20 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center", "aria-label": "Emerson Store", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Emerson Store", width: 160, height: 160, className: "h-14 w-auto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#vapes", className: "hover:text-brand transition-colors", children: "Vapes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#shirts", className: "hover:text-brand transition-colors", children: "Estamparia" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#perfumes", className: "hover:text-brand transition-colors", children: "Perfumes" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      signedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin",
          className: "hidden sm:flex items-center gap-2 bg-brand/10 hover:bg-brand/20 border border-brand/40 text-brand px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tight transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-4" }),
            " Admin"
          ]
        }
      ),
      signedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/minha-conta",
          className: "flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tight transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-4" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: user?.name ?? "Minha conta" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/auth",
          className: "flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tight transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-4" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Entrar" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex bg-brand text-primary-foreground px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 bg-primary-foreground rounded-full animate-pulse" }),
        "Delivery On"
      ] })
    ] })
  ] }) });
}
const heroImg = "/assets/hero-street-B6BcjCkl.jpg";
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "top", className: "relative h-[80vh] min-h-[600px] flex items-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: heroImg,
        alt: "Atmosfera urbana neon",
        width: 1920,
        height: 1280,
        className: "absolute inset-0 w-full h-full object-cover opacity-50"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-brand font-bold text-xs uppercase tracking-[0.3em] mb-6 border border-brand/40 px-3 py-1 rounded-full", children: "Drop 2026 — Entrega Delivery" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-6 italic tracking-tighter", children: [
        "STREET",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: "ESSENTIALS." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-muted-foreground mb-8 text-lg", children: "Pods Ignite, perfumes contratipos premium e estamparia personalizada de anime. Tudo entregue na sua porta." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => openWhatsApp("Olá Emerson! Quero fazer um pedido pela loja."),
            className: "bg-brand text-primary-foreground px-8 py-4 font-bold uppercase text-sm hover:scale-105 transition-transform rounded-md",
            children: "Pedir no WhatsApp"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#shirts",
            className: "border border-white/20 text-foreground px-8 py-4 font-bold uppercase text-sm hover:bg-white/5 transition-colors rounded-md",
            children: "Personalizar Camiseta"
          }
        )
      ] })
    ] })
  ] });
}
const v150 = "/assets/vape-v150-DLForF-c.jpg";
const v250 = "/assets/vape-v250-JMs_iG3X.jpg";
const v300 = "/assets/vape-v300-DXUC-JpL.jpg";
const smokingSilverCover = "/assets/smoking-silver-cover-CA-uagAX.jpg";
const VAPES = [
  {
    id: "v155",
    name: "Ignite V155 Ultra Slim",
    image: v150,
    price: "R$ 100,00",
    puffs: "15.5k puffs",
    flavors: [
      "Banana Ice",
      "Uva Ice",
      "Watermelon Ice",
      "Strawberry",
      "Cherry",
      "Miami Mint"
    ]
  },
  {
    id: "v250",
    name: "Ignite V250",
    image: v250,
    price: "R$ 130,00",
    puffs: "25k puffs",
    flavors: [
      "Strawberry Watermelon",
      "Banana Ice",
      "Strawberry Kiwi",
      "Pineapple Ice"
    ]
  },
  {
    id: "v300",
    name: "Ignite V300",
    image: v300,
    price: "R$ 150,00",
    puffs: "30k puffs",
    flavors: [
      "Pineapple Ice",
      "Strawberry",
      "Cherry Ice",
      "Tropical Mix",
      "Mint Power"
    ]
  },
  {
    id: "mix",
    name: "Ignite MIX",
    image: v250,
    price: "R$ 120,00",
    puffs: "Multi-sabor",
    flavors: [
      "Watermelon Ice",
      "Strawberry",
      "Cherry Cool",
      "Miami Mint",
      "Banana Ice",
      "Uva Ice"
    ]
  },
  {
    id: "airmez",
    name: "Airmez 2 in 1",
    image: v300,
    price: "R$ 110,00",
    puffs: "2 sabores no mesmo pod",
    flavors: ["Strawberry + Grape", "Coal Mint", "Watermelon + Ice"]
  },
  {
    id: "eternity",
    name: "Eternity 28.000 puffs",
    image: v150,
    price: "R$ 170,00",
    puffs: "28k puffs",
    flavors: [
      "Strawberry Watermelon",
      "Banana Ice",
      "Uva Ice",
      "Mint Power"
    ]
  }
];
function VapesSection() {
  const [picked, setPicked] = reactExports.useState({});
  const addToCart = useCart((s) => s.add);
  const addCart = (v) => {
    const flavor = picked[v.id] ?? v.flavors[0];
    addToCart({
      id: `${v.id}-${flavor}`,
      productId: v.id,
      category: "vape",
      name: v.name,
      price: parsePrice(v.price),
      image: v.image,
      options: { Sabor: flavor, Capacidade: v.puffs }
    });
    toast.success(`${v.name} adicionado ao carrinho`);
  };
  const orderWhats = (v) => {
    const flavor = picked[v.id] ?? v.flavors[0];
    openWhatsApp(
      `Olá! Quero pedir um pod ${v.name}
• Capacidade: ${v.puffs}
• Sabor: ${flavor}
• Valor: ${v.price}`
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "vapes", className: "py-24 max-w-7xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full rounded-3xl overflow-hidden mb-12 border border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: smokingSilverCover,
          alt: "Smoking Silver — coleção de pods Ignite",
          width: 1536,
          height: 1024,
          loading: "lazy",
          className: "w-full h-[280px] md:h-[420px] object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-6 md:bottom-10 md:left-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand font-bold text-xs uppercase tracking-[0.2em]", children: "New Drop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-6xl font-display font-bold tracking-tighter mt-1", children: "IGNITE PODS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-xl text-sm md:text-base", children: "Escolha o modelo, confira a média de puffs e selecione o sabor." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: VAPES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        className: "bg-surface p-6 rounded-2xl border border-white/5 hover:border-brand/50 transition-colors group flex flex-col",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-square bg-background rounded-xl mb-6 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: v.image,
              alt: v.name,
              loading: "lazy",
              width: 768,
              height: 768,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: v.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold px-2 py-1 rounded-full bg-white/5 text-brand", children: v.puffs })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-4", children: [
            "Sabores disponíveis: ",
            v.flavors.join(", "),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 mb-4", children: v.flavors.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setPicked((p) => ({ ...p, [v.id]: f })),
              className: `px-3 py-2 rounded-lg text-xs font-semibold uppercase transition-colors text-left ${(picked[v.id] ?? v.flavors[0]) === f ? "bg-brand text-primary-foreground" : "bg-white/5 hover:bg-white/10"}`,
              children: f
            },
            f
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-4 border-t border-white/5 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand font-bold text-lg", children: v.price }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => orderWhats(v),
                  className: "text-xs font-semibold uppercase opacity-60 hover:opacity-100 transition-opacity",
                  children: "WhatsApp"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => addCart(v),
                className: "w-full px-4 py-2.5 bg-brand text-primary-foreground rounded-lg text-xs font-bold uppercase hover:scale-[1.02] transition-transform",
                children: "Adicionar ao carrinho"
              }
            )
          ] })
        ]
      },
      v.id
    )) })
  ] });
}
const shirt1 = "/assets/shirt-anime-1-d5dcvE0B.jpg";
const shirt2 = "/assets/shirt-anime-2-CuPHGtUy.jpg";
const shirt3 = "/assets/shirt-anime-3-CoUYIeoJ.jpg";
const SHIRT_PRICE = 79.9;
const PRESETS = [
  { id: "p1", name: "Drop Demon Style", image: shirt1 },
  { id: "p2", name: "Drop Attack Mono", image: shirt2 },
  { id: "p3", name: "Drop Akatsuki Street", image: shirt3 }
];
const SIZES = ["P", "M", "G", "GG"];
const COLORS = ["Preta", "Branca", "Off-White"];
function ShirtsSection() {
  const [size, setSize] = reactExports.useState("M");
  const [color, setColor] = reactExports.useState("Preta");
  const [preset, setPreset] = reactExports.useState("p1");
  const [uploadName, setUploadName] = reactExports.useState(null);
  const [uploadPreview, setUploadPreview] = reactExports.useState(null);
  const fileRef = reactExports.useRef(null);
  const addToCart = useCart((s) => s.add);
  const onUpload = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadName(f.name);
    setPreset(null);
    setUploadPreview(URL.createObjectURL(f));
  };
  const selectedPreset = PRESETS.find((p) => p.id === preset);
  const artLabel = uploadName ? `Arte personalizada (${uploadName})` : selectedPreset?.name ?? "—";
  const previewImage = uploadPreview ?? selectedPreset?.image ?? shirt1;
  const addCart = () => {
    addToCart({
      id: `shirt-${size}-${color}-${uploadName ?? preset}`,
      productId: "shirt",
      category: "shirt",
      name: `Camiseta — ${artLabel}`,
      price: SHIRT_PRICE,
      image: previewImage,
      options: { Tamanho: size, Cor: color, Estampa: artLabel }
    });
    toast.success("Camiseta adicionada ao carrinho");
  };
  const orderWhats = () => {
    openWhatsApp(
      `Olá! Quero personalizar uma camiseta
• Tamanho: ${size}
• Cor base: ${color}
• ${artLabel}
• Valor: R$ ${SHIRT_PRICE.toFixed(2).replace(".", ",")}`
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "shirts", className: "bg-brand py-24 text-primary-foreground overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-5xl md:text-6xl font-display font-bold leading-tight mb-8", children: [
        "CAMISETAS DE ANIME E",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary-foreground text-brand px-3 ml-3 inline-block", children: "ESTAMPA PRÓPRIA" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl mb-10 font-medium opacity-80 max-w-lg", children: "Escolha uma arte no estilo das referências enviadas ou mande sua própria imagem para produzir a camiseta personalizada." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-bold uppercase tracking-tight text-xs mb-2 block", children: "01 — Tamanho" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: SIZES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSize(s),
              className: `size-12 rounded-full font-bold border-2 transition-all ${size === s ? "bg-primary-foreground text-brand border-primary-foreground" : "border-primary-foreground/30 hover:border-primary-foreground"}`,
              children: s
            },
            s
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-bold uppercase tracking-tight text-xs mb-2 block", children: "02 — Cor da camiseta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setColor(c),
              className: `px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all ${color === c ? "bg-primary-foreground text-brand border-primary-foreground" : "border-primary-foreground/30 hover:border-primary-foreground"}`,
              children: c
            },
            c
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-bold uppercase tracking-tight text-xs mb-2 block", children: "03 — Enviar sua imagem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileRef,
              type: "file",
              accept: "image/*",
              onChange: onUpload,
              className: "hidden"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => fileRef.current?.click(),
              className: "w-full border-2 border-dashed border-primary-foreground/40 hover:border-primary-foreground rounded-xl p-5 text-left transition-colors bg-primary-foreground/5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold uppercase text-sm", children: uploadName ?? "Clique para enviar sua arte" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-70 mt-1", children: "PNG ou JPG até 10MB. Também fazemos baseado na imagem que você mandar." })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: addCart,
              className: "flex-1 bg-primary-foreground text-brand px-8 py-4 font-bold uppercase text-sm rounded-full hover:scale-105 transition-transform",
              children: [
                "Adicionar — R$ ",
                SHIRT_PRICE.toFixed(2).replace(".", ",")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: orderWhats,
              className: "px-6 py-4 font-bold uppercase text-sm rounded-full border-2 border-primary-foreground/40 hover:border-primary-foreground transition-colors",
              children: "WhatsApp"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/5] bg-primary-foreground/10 rounded-3xl overflow-hidden relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: uploadPreview ?? PRESETS.find((p) => p.id === preset)?.image ?? shirt1,
            alt: "Preview da estampa",
            loading: "lazy",
            className: "w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 bg-primary-foreground text-brand text-xs font-bold uppercase px-3 py-1.5 rounded-full", children: "Preview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest mb-3 opacity-70", children: "Escolha uma estampa pronta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setPreset(p.id);
              setUploadName(null);
              setUploadPreview(null);
            },
            className: `aspect-square rounded-xl overflow-hidden border-2 transition-all ${preset === p.id && !uploadPreview ? "border-primary-foreground scale-95" : "border-transparent hover:border-primary-foreground/40"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: p.image,
                alt: p.name,
                loading: "lazy",
                className: "w-full h-full object-cover"
              }
            )
          },
          p.id
        )) })
      ] })
    ] })
  ] }) }) });
}
const fortune = "/assets/perfume-fortune-BoLrN7Ca.jpg";
const poloClub = "/assets/perfume-polo-club-CIz1mND_.jpg";
const racingCar = "/assets/perfume-racing-car-BsjmqrD1.jpg";
const vipRose = "/assets/perfume-521-rose-wc1_MbWT.jpg";
const vipBlack = "/assets/perfume-521-black-B9x1k43A.jpg";
const PERFUMES = [
  {
    name: "Perfume Fortune Parfum Bortoletto 100ml",
    ref: "Insp. One Million (Paco Rabanne)",
    family: "Masculino • 100ml",
    description: "O perfume masculino mais fácil de vender, com aroma amadeirado e sedutor.",
    price: "R$ 92,28",
    image: fortune
  },
  {
    name: "Perfume Polo Club Parfum Bortoletto 100ml",
    ref: "Insp. Polo Blue (Ralph Lauren)",
    family: "Masculino • 100ml",
    description: "Opção fresca, aquática e elegante, perfeita para uso diário e climas quentes.",
    price: "R$ 139,98",
    image: poloClub
  },
  {
    name: "Perfume Racing Car 100ml Atlântica Natural - Bortoletto",
    ref: "Insp. Ferrari Black",
    family: "Masculino • 100ml",
    description: "Um dos aromas cítricos/amadeirados mais populares do Brasil, com venda rápida garantida.",
    price: "R$ 205,42",
    image: racingCar
  },
  {
    name: "Perfume Bortoletto 521 Vip Rose Feminino 100ml",
    ref: "Insp. 212 VIP Rosé",
    family: "Feminino • 100ml",
    description: "Fragrância floral amadeirada muito procurada para festas e eventos cotidianos.",
    price: "R$ 180,00",
    image: vipRose
  },
  {
    name: "Perfume 521 Vip Black 100ml Atlântica Natural - Bortoletto",
    ref: "Insp. 212 VIP Black",
    family: "Masculino • 100ml",
    description: "Aroma moderno e marcante muito desejado pelo público jovem para a noite.",
    price: "R$ 187,92",
    image: vipBlack
  }
];
function PerfumesSection() {
  const addToCart = useCart((s) => s.add);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "perfumes", className: "py-24 max-w-7xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand font-bold text-xs uppercase tracking-[0.3em]", children: "Linha Inspirada" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-display font-bold mb-4 italic mt-2", children: "Perfumes estilo Bortoleto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Seleção com fragrâncias femininas e masculinas no estilo das referências que você enviou, pronta para pedir no delivery pelo WhatsApp." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: PERFUMES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "group text-left bg-surface rounded-2xl border border-white/5 overflow-hidden hover:border-brand/50 transition-colors flex flex-col",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-[4/5] overflow-hidden ring-1 ring-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: p.image,
              alt: p.name,
              loading: "lazy",
              width: 640,
              height: 800,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-lg leading-snug", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase mt-1", children: p.ref }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: p.family }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/80 mt-2", children: p.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand font-bold italic", children: p.price }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => openWhatsApp(
                    `Olá! Quero pedir o perfume ${p.name}
• Estilo: ${p.ref}
• Categoria: ${p.family}
• Valor: ${p.price}`
                  ),
                  className: "text-xs uppercase font-semibold opacity-60 hover:opacity-100 transition-opacity",
                  children: "WhatsApp"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => {
                  addToCart({
                    id: p.name,
                    productId: p.name,
                    category: "perfume",
                    name: p.name,
                    price: parsePrice(p.price),
                    image: p.image,
                    options: { Estilo: p.ref, Categoria: p.family }
                  });
                  toast.success(`${p.name} adicionado ao carrinho`);
                },
                className: "mt-4 w-full bg-brand text-primary-foreground py-2.5 rounded-lg text-xs font-bold uppercase hover:scale-[1.02] transition-transform",
                children: "Adicionar ao carrinho"
              }
            )
          ] })
        ]
      },
      p.name
    )) })
  ] });
}
const OWNER_EMAIL = "emerstore385@gmail.com";
function StoreFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-surface border-t border-white/5 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-3 bg-brand/10 text-brand px-6 py-3 rounded-full mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 bg-brand rounded-full animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold uppercase tracking-widest", children: "Entrega rápida na sua região" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "© 2026 Emerson Store — Estilo e Atitude" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-tighter", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://wa.me/${WHATSAPP_NUMBER}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "hover:text-brand",
          children: "WhatsApp (15) 98118-3740"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${OWNER_EMAIL}`, className: "hover:text-brand normal-case tracking-normal", children: OWNER_EMAIL })
    ] })
  ] }) });
}
function WhatsFloat() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: () => openWhatsApp("Olá Emerson! Vim pela loja online."),
      "aria-label": "Falar no WhatsApp",
      className: "fixed bottom-6 right-6 z-50 size-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-black/40 hover:scale-110 transition-transform",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "size-7 text-white fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) })
    }
  );
}
const Route$a = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Emerson Store — Vapes, Camisetas e Perfumes com Delivery" },
      {
        name: "description",
        content: "Pods Ignite, camisetas anime personalizadas e perfumes contratipos premium com entrega delivery."
      },
      { property: "og:title", content: "Emerson Store — Street Essentials" },
      {
        property: "og:description",
        content: "Vapes, camisetas personalizadas e perfumes premium com entrega rápida."
      }
    ]
  }),
  component: Index
});
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;500;600;700&display=swap",
        rel: "stylesheet"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StoreNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(VapesSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShirtsSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PerfumesSection, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StoreFooter, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsFloat, {})
  ] });
}
const { GET, POST } = StartAuthJS(() => getAuthConfig());
const Route$9 = createFileRoute("/oauth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          return await GET({ request, response: new Response() });
        } catch (error) {
          console.error("[oauth] Erro no handler GET:", error);
          return new Response(
            JSON.stringify({
              error: "Autenticação indisponível. Verifique AUTH_SECRET na Vercel."
            }),
            { status: 503, headers: { "Content-Type": "application/json" } }
          );
        }
      },
      POST: async ({ request }) => {
        try {
          return await POST({ request, response: new Response() });
        } catch (error) {
          console.error("[oauth] Erro no handler POST:", error);
          return new Response(
            JSON.stringify({
              error: "Autenticação indisponível. Verifique AUTH_SECRET na Vercel."
            }),
            { status: 503, headers: { "Content-Type": "application/json" } }
          );
        }
      }
    }
  }
});
const Route$8 = createFileRoute("/_authenticated/minha-conta")({
  head: () => ({ meta: [{ title: "Minha Conta — Emerson Store" }] }),
  component: MinhaContaPage
});
function MinhaContaPage() {
  const { user, signOut } = useAuth();
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
      const { data } = await supabase.from("profiles").select("nome,email,telefone,endereco").eq("email", user.email).maybeSingle();
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
    const { error } = await supabase.from("profiles").upsert(
      {
        email: user.email,
        nome: profile.nome,
        telefone: profile.telefone,
        endereco: profile.endereco
      },
      { onConflict: "email" }
    );
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
  const setEnd = (patch) => setProfile({ ...profile, endereco: { ...end, ...patch } });
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: profile.nome,
            onChange: (e) => setProfile({ ...profile, nome: e.target.value }),
            className: "input",
            required: true
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: profile.email ?? "", disabled: true, className: "input opacity-60" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Telefone (WhatsApp)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: profile.telefone ?? "",
            onChange: (e) => setProfile({ ...profile, telefone: e.target.value }),
            placeholder: "(11) 99999-9999",
            className: "input"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold pt-6", children: "Endereço de entrega" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "CEP", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.cep ?? "", onChange: (e) => setEnd({ cep: e.target.value }), className: "input" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Estado", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.estado ?? "", onChange: (e) => setEnd({ estado: e.target.value }), className: "input" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Rua", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.rua ?? "", onChange: (e) => setEnd({ rua: e.target.value }), className: "input" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Número", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.numero ?? "", onChange: (e) => setEnd({ numero: e.target.value }), className: "input" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Complemento", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.complemento ?? "", onChange: (e) => setEnd({ complemento: e.target.value }), className: "input" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bairro", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.bairro ?? "", onChange: (e) => setEnd({ bairro: e.target.value }), className: "input" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cidade", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: end.cidade ?? "", onChange: (e) => setEnd({ cidade: e.target.value }), className: "input" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: saving,
              className: "bg-brand text-primary-foreground px-8 py-3.5 rounded-full font-bold uppercase tracking-tight hover:scale-[1.02] transition-transform disabled:opacity-50",
              children: saving ? "Salvando..." : "Salvar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: logout,
              className: "border-2 border-white/20 hover:border-white/40 px-8 py-3.5 rounded-full font-bold uppercase tracking-tight transition-colors",
              children: "Sair"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-tight mb-2 block opacity-80", children: label }),
    children
  ] });
}
const Route$7 = createFileRoute("/_authenticated/meus-pedidos")({
  head: () => ({ meta: [{ title: "Meus Pedidos — Emerson Store" }] }),
  component: MeusPedidosPage
});
const statusLabel = {
  pendente: "Pendente",
  pago: "Pago",
  enviado: "Enviado",
  entregue: "Entregue",
  cancelado: "Cancelado"
};
function MeusPedidosPage() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    (async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      const { data: profile } = await supabase.from("profiles").select("id").eq("email", user.email).maybeSingle();
      if (!profile?.id) {
        setLoading(false);
        return;
      }
      const { data } = await supabase.from("pedidos").select("id,created_at,status,total,frete,produtos,codigo_rastreio").eq("cliente_id", profile.id).order("created_at", { ascending: false });
      if (data) setPedidos(data);
      setLoading(false);
    })();
  }, [user]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StoreNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-3xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display font-bold", children: "Meus Pedidos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/minha-conta",
            className: "text-sm font-bold uppercase tracking-tight text-brand hover:underline",
            children: "← Minha conta"
          }
        )
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60", children: "Carregando..." }) : pedidos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-white/10 rounded-2xl p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-70 mb-6", children: "Você ainda não fez nenhum pedido." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "inline-block bg-brand text-primary-foreground px-6 py-3 rounded-full font-bold uppercase tracking-tight text-sm",
            children: "Ir às compras"
          }
        )
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
const checkIsAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("d7ab752d5c5280d2ee84a9875749b1cba0d95c7bbe892baa67e4f3368bfac36c"));
const bootstrapAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("8b5e87060261a59e92bcd5e92ce4cf6afa0ee8e3737aa66e7c16f0be951897c6"));
const adminStats = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("fc54988025651b0d207f9ef4346d9f0fe848ff17785294a4a080cffaee281f4f"));
const comissaoPorProduto = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("5d3243139735920ba9b736531e3e44068bbdc2fd46635fabda3436759e69762a"));
const listarPedidosAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("bf04e2dfaaf1f1ed96d2be49bb6b1302ca9ea5c7043f514e747a1626585f75a2"));
const atualizarPedido = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid(),
  status: enumType(["pendente", "pago", "enviado", "entregue", "cancelado"]).optional(),
  codigo_rastreio: stringType().max(120).nullable().optional()
}).parse(d)).handler(createSsrRpc("14267c7d84280e06556c96fbb45db9aa54b3085347638d072219382aec5ea418"));
const listarProdutosAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("e2713f0db4cfb666fbc46230a59ed86f3d8b10b86e778f10e5397ff58389b97c"));
const produtoSchema = objectType({
  id: stringType().uuid().optional(),
  nome: stringType().min(1).max(200),
  descricao: stringType().max(2e3).nullable().optional(),
  categoria: enumType(["vapes", "estamparia", "perfumes"]),
  preco: numberType().min(0),
  preco_promocional: numberType().min(0).nullable().optional(),
  estoque: numberType().int().min(0),
  ativo: booleanType(),
  destaque: booleanType(),
  imagem_url: stringType().url().nullable().optional()
});
const upsertProduto = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => produtoSchema.parse(d)).handler(createSsrRpc("99a1275d61d21abed9d28dffe1aef1efd80a431e751b6f252af0aa95631eaa64"));
const removerProduto = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("b50b7f13a9920e6d5d2635312c54600105d75abeb5112ec011ca5e3088122cc3"));
const uploadImagemProduto = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  fileName: stringType().min(1).max(200),
  contentType: stringType().min(1).max(100),
  base64: stringType().min(1)
}).parse(d)).handler(createSsrRpc("ff7447b6a163fddc24de950e921a8de7fb75fb9dd28c3ceb45c5d7df6f78d41f"));
const listarClientesAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("02724b713dc9c559f2c80c7cf125e42c644f38894fb73bce595b85b119e86b45"));
const listarFuncionarios = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("61b7f93e5d483d64390a0c9f1eb49cbfe7cdefa9a5c55e58fb213096037ffb43"));
const promoverAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  email: stringType().email()
}).parse(d)).handler(createSsrRpc("04c8af07ae44e6dd8d07a8bb2ea023639912763ca141a792ff5a54ec472848f9"));
const revogarAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  user_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("3a042adc765b0956c0d1b4ad8f6bceaa80a60ac9dc357882488a576770794b78"));
const Route$6 = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Emerson Store" }] }),
  component: AdminLayout
});
function AdminLayout() {
  const { signOut } = useAuth();
  const fn = useServerFn(checkIsAdmin);
  const bootstrap = useServerFn(bootstrapAdmin);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data, isLoading, refetch } = useQuery({
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: async () => {
            try {
              await bootstrap();
              toast.success("Você agora é administrador!");
              refetch();
            } catch (e) {
              toast.error(e?.message ?? "Falha ao promover.");
            }
          },
          className: "bg-brand text-primary-foreground px-6 py-3 rounded-full font-bold uppercase tracking-tight text-sm w-full mb-3 hover:scale-[1.02] transition-transform",
          children: "Tornar-me administrador"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/",
          className: "block text-xs uppercase tracking-tight opacity-60 hover:opacity-100",
          children: "← Voltar para a loja"
        }
      )
    ] }) });
  }
  const links = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { to: "/admin/pedidos", icon: ShoppingBag, label: "Pedidos" },
    { to: "/admin/comissao", icon: Percent, label: "Comissão" },
    { to: "/admin/produtos", icon: Package, label: "Produtos" },
    { to: "/admin/clientes", icon: Users, label: "Clientes" },
    { to: "/admin/equipe", icon: UserCog, label: "Equipe" }
  ];
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
      links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: l.to,
          className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(l.to, l.exact) ? "bg-brand text-primary-foreground" : "hover:bg-white/5 opacity-80"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(l.icon, { className: "size-4" }),
            " ",
            l.label
          ]
        },
        l.to
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/5 opacity-70",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "size-4" }),
              " Ver a loja"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: logout,
            className: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/5 opacity-70 text-left",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
              " Sair"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-8 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
const Route$5 = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard
});
const brl$4 = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
function AdminDashboard() {
  const fn = useServerFn(adminStats);
  const { data, isLoading } = useQuery({ queryKey: ["admin-stats"], queryFn: () => fn() });
  if (isLoading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60", children: "Carregando..." });
  const max = Math.max(1, ...data.ultimos7.map((d) => d.total));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60 text-sm", children: "Visão geral da Emerson Store" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: DollarSign, label: "Faturamento", value: brl$4(data.faturamento) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Percent, label: "Minha comissão (10%)", value: brl$4(data.comissao ?? 0), accent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: ShoppingBag, label: "Vendas hoje", value: String(data.vendasHoje) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Clock, label: "Pedidos pendentes", value: String(data.totalPendentes) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Users, label: "Clientes", value: String(data.totalClientes) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Package, label: "Produtos", value: String(data.totalProdutos) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: ShoppingBag, label: "Total de pedidos", value: String(data.totalPedidos) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold mb-6", children: "Faturamento dos últimos 7 dias" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-3 h-48", children: data.ultimos7.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-60", children: brl$4(d.total) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-full bg-brand rounded-t-md transition-all",
            style: { height: `${d.total / max * 100}%`, minHeight: "4px" }
          }
        ),
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-2xl border p-5 ${accent ? "bg-brand/10 border-brand/40" : "bg-white/5 border-white/10"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `size-5 mb-3 ${accent ? "text-brand" : "opacity-60"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-tight opacity-70", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold mt-1", children: value })
      ]
    }
  );
}
const Route$4 = createFileRoute("/_authenticated/admin/produtos")({
  component: ProdutosAdmin
});
const brl$3 = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const emptyForm = {
  nome: "",
  descricao: "",
  categoria: "vapes",
  preco: "0",
  preco_promocional: "",
  estoque: "0",
  ativo: true,
  destaque: false,
  imagem_url: ""
};
function ProdutosAdmin() {
  const qc = useQueryClient();
  const listar = useServerFn(listarProdutosAdmin);
  const upsert = useServerFn(upsertProduto);
  const remover = useServerFn(removerProduto);
  const upload = useServerFn(uploadImagemProduto);
  const [form, setForm] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["admin-produtos"],
    queryFn: () => listar()
  });
  const mut = useMutation({
    mutationFn: (f) => upsert({
      data: {
        id: f.id,
        nome: f.nome,
        descricao: f.descricao || null,
        categoria: f.categoria,
        preco: Number(f.preco),
        preco_promocional: f.preco_promocional ? Number(f.preco_promocional) : null,
        estoque: parseInt(f.estoque, 10) || 0,
        ativo: f.ativo,
        destaque: f.destaque,
        imagem_url: f.imagem_url || null
      }
    }),
    onSuccess: () => {
      toast.success("Produto salvo");
      qc.invalidateQueries({ queryKey: ["admin-produtos"] });
      setForm(null);
    },
    onError: (e) => toast.error(e?.message ?? "Erro")
  });
  const del = useMutation({
    mutationFn: (id) => remover({ data: { id } }),
    onSuccess: () => {
      toast.success("Produto removido");
      qc.invalidateQueries({ queryKey: ["admin-produtos"] });
    },
    onError: (e) => toast.error(e?.message ?? "Erro")
  });
  if (isLoading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-60", children: "Carregando..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold", children: "Produtos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "opacity-60 text-sm", children: [
          data.produtos.length,
          " produto(s)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setForm(emptyForm),
          className: "bg-brand text-primary-foreground px-5 py-2.5 rounded-full font-bold uppercase tracking-tight text-xs flex items-center gap-2 hover:scale-[1.02] transition-transform",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
            " Novo produto"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/5 border border-white/10 rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Nome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Categoria" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Preço" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Estoque" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        data.produtos.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/5 hover:bg-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-medium", children: p.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 capitalize opacity-80", children: p.categoria }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-bold", children: brl$3(Number(p.preco)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: p.estoque }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `px-2 py-1 rounded-full text-xs font-bold uppercase ${p.ativo ? "bg-green-500/20 text-green-300" : "bg-white/10 opacity-60"}`,
              children: p.ativo ? "Ativo" : "Inativo"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 flex gap-2 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setForm({
                  id: p.id,
                  nome: p.nome,
                  descricao: p.descricao ?? "",
                  categoria: p.categoria,
                  preco: String(p.preco),
                  preco_promocional: p.preco_promocional ? String(p.preco_promocional) : "",
                  estoque: String(p.estoque),
                  ativo: p.ativo,
                  destaque: p.destaque,
                  imagem_url: p.imagem_url ?? ""
                }),
                className: "p-2 hover:bg-white/10 rounded",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => {
                  if (confirm(`Excluir "${p.nome}"?`)) del.mutate(p.id);
                },
                className: "p-2 hover:bg-red-500/20 text-red-300 rounded",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
              }
            )
          ] })
        ] }, p.id)),
        data.produtos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-12 text-center opacity-60", children: "Nenhum produto cadastrado." }) })
      ] })
    ] }) }),
    form && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6",
        onClick: () => setForm(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-background border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-auto",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-5", children: form.id ? "Editar produto" : "Novo produto" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: (e) => {
                    e.preventDefault();
                    mut.mutate(form);
                  },
                  className: "space-y-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Nome", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        required: true,
                        value: form.nome,
                        onChange: (e) => setForm({ ...form, nome: e.target.value }),
                        className: "input"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Descrição", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        value: form.descricao,
                        onChange: (e) => setForm({ ...form, descricao: e.target.value }),
                        className: "input h-20"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Categoria", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          value: form.categoria,
                          onChange: (e) => setForm({ ...form, categoria: e.target.value }),
                          className: "input",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "vapes", children: "Vapes" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "estamparia", children: "Estamparia" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "perfumes", children: "Perfumes" })
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Estoque", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "number",
                          min: 0,
                          value: form.estoque,
                          onChange: (e) => setForm({ ...form, estoque: e.target.value }),
                          className: "input"
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Preço (R$)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "number",
                          step: "0.01",
                          min: 0,
                          required: true,
                          value: form.preco,
                          onChange: (e) => setForm({ ...form, preco: e.target.value }),
                          className: "input"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Promocional (R$)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "number",
                          step: "0.01",
                          min: 0,
                          value: form.preco_promocional,
                          onChange: (e) => setForm({ ...form, preco_promocional: e.target.value }),
                          className: "input"
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Imagem do produto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                      form.imagem_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: form.imagem_url,
                          alt: "prévia",
                          className: "w-24 h-24 object-cover rounded-lg border border-white/10"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 border border-dashed border-white/20 rounded-lg px-3 py-2 cursor-pointer hover:bg-white/5 text-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-4" }),
                        uploading ? "Enviando..." : "Selecionar imagem do computador",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "file",
                            accept: "image/*",
                            className: "hidden",
                            disabled: uploading,
                            onChange: async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              if (file.size > 5 * 1024 * 1024) {
                                toast.error("Imagem maior que 5MB.");
                                return;
                              }
                              setUploading(true);
                              try {
                                const buf = await file.arrayBuffer();
                                let bin = "";
                                const bytes = new Uint8Array(buf);
                                for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
                                const base64 = btoa(bin);
                                const res = await upload({
                                  data: { fileName: file.name, contentType: file.type || "image/jpeg", base64 }
                                });
                                setForm((prev) => prev ? { ...prev, imagem_url: res.url } : prev);
                                toast.success("Imagem enviada");
                              } catch (err) {
                                toast.error(err?.message ?? "Falha no upload");
                              } finally {
                                setUploading(false);
                                e.target.value = "";
                              }
                            }
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "url",
                          value: form.imagem_url,
                          onChange: (e) => setForm({ ...form, imagem_url: e.target.value }),
                          placeholder: "ou cole uma URL https://...",
                          className: "input"
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: form.ativo,
                            onChange: (e) => setForm({ ...form, ativo: e.target.checked })
                          }
                        ),
                        "Ativo"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: form.destaque,
                            onChange: (e) => setForm({ ...form, destaque: e.target.checked })
                          }
                        ),
                        "Destaque"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "submit",
                          disabled: mut.isPending,
                          className: "bg-brand text-primary-foreground px-6 py-2.5 rounded-full font-bold uppercase tracking-tight text-xs flex-1",
                          children: mut.isPending ? "Salvando..." : "Salvar"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setForm(null),
                          className: "border border-white/20 px-6 py-2.5 rounded-full font-bold uppercase tracking-tight text-xs",
                          children: "Cancelar"
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          }
        )
      }
    )
  ] });
}
function FormField({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-tight mb-1.5 block opacity-80", children: label }),
    children
  ] });
}
const Route$3 = createFileRoute("/_authenticated/admin/pedidos")({
  component: PedidosAdmin
});
const brl$2 = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
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
  const { data, isLoading } = useQuery({
    queryKey: ["admin-pedidos"],
    queryFn: () => listar()
  });
  const mut = useMutation({
    mutationFn: (vars) => atualizar({ data: vars }),
    onSuccess: () => {
      toast.success("Pedido atualizado");
      qc.invalidateQueries({ queryKey: ["admin-pedidos"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-bold", children: brl$2(Number(p.total)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: p.status,
                onChange: (e) => mut.mutate({ id: p.id, status: e.target.value }),
                className: `px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight border-0 ${statusColor[p.status]}`,
                children: STATUS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, className: "bg-background text-foreground", children: s }, s))
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                defaultValue: p.codigo_rastreio ?? "",
                placeholder: "código...",
                onBlur: (e) => {
                  if (e.target.value !== (p.codigo_rastreio ?? "")) {
                    mut.mutate({ id: p.id, codigo_rastreio: e.target.value });
                  }
                },
                className: "bg-white/5 border border-white/10 rounded px-2 py-1 text-xs w-32"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setAberto(aberto === p.id ? null : p.id),
                className: "text-xs uppercase tracking-tight opacity-70 hover:opacity-100",
                children: aberto === p.id ? "Fechar" : "Detalhes"
              }
            ) })
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
                  brl$2(Number(p.subtotal))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "Frete: ",
                  brl$2(Number(p.frete))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "Desconto: ",
                  brl$2(Number(p.desconto))
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick,
      className: `px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight transition-colors ${active ? "bg-brand text-primary-foreground" : "bg-white/5 hover:bg-white/10"}`,
      children: label
    }
  );
}
const Route$2 = createFileRoute("/_authenticated/admin/equipe")({
  component: EquipeAdmin
});
function EquipeAdmin() {
  const qc = useQueryClient();
  const listar = useServerFn(listarFuncionarios);
  const promover = useServerFn(promoverAdmin);
  const revogar = useServerFn(revogarAdmin);
  const [email, setEmail] = reactExports.useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["admin-equipe"],
    queryFn: () => listar()
  });
  const promMut = useMutation({
    mutationFn: (e) => promover({ data: { email: e } }),
    onSuccess: () => {
      toast.success("Administrador adicionado");
      setEmail("");
      qc.invalidateQueries({ queryKey: ["admin-equipe"] });
    },
    onError: (e) => toast.error(e?.message ?? "Erro")
  });
  const revMut = useMutation({
    mutationFn: (user_id) => revogar({ data: { user_id } }),
    onSuccess: () => {
      toast.success("Acesso revogado");
      qc.invalidateQueries({ queryKey: ["admin-equipe"] });
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            promMut.mutate(email);
          },
          className: "flex gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                required: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "email@exemplo.com",
                className: "input flex-1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: promMut.isPending,
                className: "bg-brand text-primary-foreground px-6 py-2.5 rounded-full font-bold uppercase tracking-tight text-xs",
                children: "Promover"
              }
            )
          ]
        }
      )
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              if (confirm(`Revogar acesso admin de ${a.email}?`))
                revMut.mutate(a.user_id);
            },
            className: "p-2 hover:bg-red-500/20 text-red-300 rounded",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
          }
        ) })
      ] }, a.user_id)) })
    ] }) })
  ] });
}
const Route$1 = createFileRoute("/_authenticated/admin/comissao")({
  component: ComissaoPage
});
const brl$1 = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
function ComissaoPage() {
  const fn = useServerFn(comissaoPorProduto);
  const { data, isLoading } = useQuery({
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: DollarSign, label: "Receita total", value: brl$1(data.receitaTotal) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: Percent, label: "Comissão total (10%)", value: brl$1(data.comissaoTotal), accent: true }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right", children: brl$1(l.receita) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right font-bold text-brand", children: brl$1(l.comissao) })
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-2xl border p-5 ${accent ? "bg-brand/10 border-brand/40" : "bg-white/5 border-white/10"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `size-5 mb-3 ${accent ? "text-brand" : "opacity-60"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-tight opacity-70", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold mt-1", children: value })
      ]
    }
  );
}
const Route = createFileRoute("/_authenticated/admin/clientes")({
  component: ClientesAdmin
});
const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
function ClientesAdmin() {
  const fn = useServerFn(listarClientesAdmin);
  const [busca, setBusca] = reactExports.useState("");
  const { data, isLoading } = useQuery({
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          placeholder: "Buscar por nome, email, telefone...",
          value: busca,
          onChange: (e) => setBusca(e.target.value),
          className: "input w-80"
        }
      )
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
const PedidoConfirmadoRoute = Route$d.update({
  id: "/pedido-confirmado",
  path: "/pedido-confirmado",
  getParentRoute: () => Route$e
});
const AuthRoute = Route$c.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$e
});
const AuthenticatedRouteRoute = Route$b.update({
  id: "/_authenticated",
  getParentRoute: () => Route$e
});
const IndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$e
});
const OauthSplatRoute = Route$9.update({
  id: "/oauth/$",
  path: "/oauth/$",
  getParentRoute: () => Route$e
});
const AuthenticatedMinhaContaRoute = Route$8.update({
  id: "/minha-conta",
  path: "/minha-conta",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedMeusPedidosRoute = Route$7.update({
  id: "/meus-pedidos",
  path: "/meus-pedidos",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminRouteRoute = Route$6.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminIndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminProdutosRoute = Route$4.update({
  id: "/produtos",
  path: "/produtos",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminPedidosRoute = Route$3.update({
  id: "/pedidos",
  path: "/pedidos",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminEquipeRoute = Route$2.update({
  id: "/equipe",
  path: "/equipe",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminComissaoRoute = Route$1.update({
  id: "/comissao",
  path: "/comissao",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminClientesRoute = Route.update({
  id: "/clientes",
  path: "/clientes",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminRouteRouteChildren = {
  AuthenticatedAdminClientesRoute,
  AuthenticatedAdminComissaoRoute,
  AuthenticatedAdminEquipeRoute,
  AuthenticatedAdminPedidosRoute,
  AuthenticatedAdminProdutosRoute,
  AuthenticatedAdminIndexRoute
};
const AuthenticatedAdminRouteRouteWithChildren = AuthenticatedAdminRouteRoute._addFileChildren(
  AuthenticatedAdminRouteRouteChildren
);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAdminRouteRoute: AuthenticatedAdminRouteRouteWithChildren,
  AuthenticatedMeusPedidosRoute,
  AuthenticatedMinhaContaRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute,
  PedidoConfirmadoRoute,
  OauthSplatRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient, session: null },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
