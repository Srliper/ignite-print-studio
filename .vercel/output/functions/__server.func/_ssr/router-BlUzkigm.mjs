import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouteContext, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as redirect, m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-Gf6avwXa.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { c as create, p as persist } from "../_libs/zustand.mjs";
import { s as supabase } from "./client-CXxm5UrO.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BlhVP4Uq.mjs";
import { a as authConfig } from "./auth-DvLnJq-q.mjs";
import { S as StartAuthJS } from "../_libs/start-authjs.mjs";
import "../_libs/auth__core.mjs";
import { S as ShoppingBag, X, T as Trash2, M as Minus, P as Plus, C as ChevronLeft, a as Check, L as LoaderCircle } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, a as arrayType, n as numberType, r as recordType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
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
  const router2 = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router2.stores.location.get();
        return router2.navigate(router2.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router2, serverFn]);
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
  const router2 = useRouter();
  const { session } = useRouteContext({ from: "__root__" });
  const user = session?.user ?? null;
  const refreshSession = async () => {
    await router2.invalidate();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: { session, user, refreshSession }, children });
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome completo *", value: end.nome, onChange: (v) => setEnd({ ...end, nome: v }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp *", value: end.telefone, onChange: (v) => setEnd({ ...end, telefone: v }), placeholder: "(11) 99999-9999" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Field,
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Rua *", value: end.rua, onChange: (v) => setEnd({ ...end, rua: v }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Número *", value: end.numero, onChange: (v) => setEnd({ ...end, numero: v }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Complemento", value: end.complemento, onChange: (v) => setEnd({ ...end, complemento: v }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bairro *", value: end.bairro, onChange: (v) => setEnd({ ...end, bairro: v }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_5rem] gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cidade *", value: end.cidade, onChange: (v) => setEnd({ ...end, cidade: v }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "UF *", value: end.uf, onChange: (v) => setEnd({ ...end, uf: v.toUpperCase().slice(0, 2) }), maxLength: 2 })
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
function Field({
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
  const router2 = useRouter();
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
            router2.invalidate();
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
  beforeLoad: async () => {
    const session = await fetchAuthSession();
    return { session };
  },
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
const $$splitComponentImporter$c = () => import("./pedido-confirmado-DhwaAQVt.mjs");
const Route$d = createFileRoute("/pedido-confirmado")({
  validateSearch: objectType({
    id: stringType().optional()
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component"),
  head: () => ({
    meta: [{
      title: "Pedido confirmado"
    }, {
      name: "robots",
      content: "noindex"
    }]
  })
});
const $$splitComponentImporter$b = () => import("./auth-BSZLkSf8.mjs");
const authSearchSchema = objectType({
  callbackUrl: stringType().optional(),
  error: stringType().optional()
});
const Route$c = createFileRoute("/auth")({
  validateSearch: authSearchSchema,
  beforeLoad: ({
    context,
    search
  }) => {
    if (context.session?.user) {
      const dest = search.callbackUrl?.startsWith("/") ? search.callbackUrl : "/";
      throw redirect({
        to: dest
      });
    }
  },
  head: () => ({
    meta: [{
      title: "Entrar — Emerson Store"
    }, {
      name: "description",
      content: "Acesse sua conta na Emerson Store."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./route-BFsOu0JM.mjs");
const Route$b = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: ({
    context,
    location
  }) => {
    if (!context.session?.user) {
      throw redirect({
        to: "/auth",
        search: {
          callbackUrl: location.pathname
        }
      });
    }
    return {
      user: context.session.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./index-B1uS8bdv.mjs");
const Route$a = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Emerson Store — Vapes, Camisetas e Perfumes com Delivery"
    }, {
      name: "description",
      content: "Pods Ignite, camisetas anime personalizadas e perfumes contratipos premium com entrega delivery."
    }, {
      property: "og:title",
      content: "Emerson Store — Street Essentials"
    }, {
      property: "og:description",
      content: "Vapes, camisetas personalizadas e perfumes premium com entrega rápida."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./minha-conta-D9xVWosq.mjs");
const Route$9 = createFileRoute("/_authenticated/minha-conta")({
  head: () => ({
    meta: [{
      title: "Minha Conta — Emerson Store"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./meus-pedidos-Be2wAkgF.mjs");
const Route$8 = createFileRoute("/_authenticated/meus-pedidos")({
  head: () => ({
    meta: [{
      title: "Meus Pedidos — Emerson Store"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./route-DxfKnQx9.mjs");
const Route$7 = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [{
      title: "Admin — Emerson Store"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./index-GI1ziPI1.mjs");
const Route$6 = createFileRoute("/_authenticated/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const { GET, POST } = StartAuthJS(authConfig);
const Route$5 = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          return await GET({ request, response: new Response() });
        } catch (error) {
          console.error("[api/auth] Erro no handler GET:", error);
          return new Response(JSON.stringify({ error: "Erro interno de autenticação." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
      },
      POST: async ({ request }) => {
        try {
          return await POST({ request, response: new Response() });
        } catch (error) {
          console.error("[api/auth] Erro no handler POST:", error);
          return new Response(JSON.stringify({ error: "Erro interno de autenticação." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
      }
    }
  }
});
const $$splitComponentImporter$4 = () => import("./produtos-DmwmgXhi.mjs");
const Route$4 = createFileRoute("/_authenticated/admin/produtos")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./pedidos-DDUBj7TT.mjs");
const Route$3 = createFileRoute("/_authenticated/admin/pedidos")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./equipe-BCekytZL.mjs");
const Route$2 = createFileRoute("/_authenticated/admin/equipe")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./comissao-j3LR2EV9.mjs");
const Route$1 = createFileRoute("/_authenticated/admin/comissao")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./clientes-DK4IOiu7.mjs");
const Route = createFileRoute("/_authenticated/admin/clientes")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
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
const AuthenticatedMinhaContaRoute = Route$9.update({
  id: "/minha-conta",
  path: "/minha-conta",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedMeusPedidosRoute = Route$8.update({
  id: "/meus-pedidos",
  path: "/meus-pedidos",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminRouteRoute = Route$7.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminIndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const ApiAuthSplatRoute = Route$5.update({
  id: "/api/auth/$",
  path: "/api/auth/$",
  getParentRoute: () => Route$e
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
  ApiAuthSplatRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient, session: null },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$d as R,
  Route$c as a,
  useServerFn as b,
  createSsrRpc as c,
  fetchAuthSession as f,
  parsePrice as p,
  router as r,
  useCart as u
};
