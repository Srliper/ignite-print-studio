import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useServerFn } from "./router-BBvkWRQ4.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { l as listarProdutosAdmin, u as upsertProduto, r as removerProduto, d as uploadImagemProduto } from "./admin.functions-a8M_4byO.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { P as Plus, l as Pencil, T as Trash2, m as Upload } from "../_libs/lucide-react.mjs";
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
import "./server-CMbdw2-U.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "./client-Bb-1S0Oi.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-DQvKKjOX.mjs";
import "./auth-CHLIm9Dg.mjs";
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
  const {
    data,
    isLoading
  } = useQuery({
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
      qc.invalidateQueries({
        queryKey: ["admin-produtos"]
      });
      setForm(null);
    },
    onError: (e) => toast.error(e?.message ?? "Erro")
  });
  const del = useMutation({
    mutationFn: (id) => remover({
      data: {
        id
      }
    }),
    onSuccess: () => {
      toast.success("Produto removido");
      qc.invalidateQueries({
        queryKey: ["admin-produtos"]
      });
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setForm(emptyForm), className: "bg-brand text-primary-foreground px-5 py-2.5 rounded-full font-bold uppercase tracking-tight text-xs flex items-center gap-2 hover:scale-[1.02] transition-transform", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
        " Novo produto"
      ] })
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-bold", children: brl(Number(p.preco)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: p.estoque }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 rounded-full text-xs font-bold uppercase ${p.ativo ? "bg-green-500/20 text-green-300" : "bg-white/10 opacity-60"}`, children: p.ativo ? "Ativo" : "Inativo" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 flex gap-2 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setForm({
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
            }), className: "p-2 hover:bg-white/10 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              if (confirm(`Excluir "${p.nome}"?`)) del.mutate(p.id);
            }, className: "p-2 hover:bg-red-500/20 text-red-300 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
          ] })
        ] }, p.id)),
        data.produtos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-12 text-center opacity-60", children: "Nenhum produto cadastrado." }) })
      ] })
    ] }) }),
    form && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6", onClick: () => setForm(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-auto", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-5", children: form.id ? "Editar produto" : "Novo produto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        mut.mutate(form);
      }, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Nome", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.nome, onChange: (e) => setForm({
          ...form,
          nome: e.target.value
        }), className: "input" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Descrição", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.descricao, onChange: (e) => setForm({
          ...form,
          descricao: e.target.value
        }), className: "input h-20" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Categoria", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.categoria, onChange: (e) => setForm({
            ...form,
            categoria: e.target.value
          }), className: "input", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "vapes", children: "Vapes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "estamparia", children: "Estamparia" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "perfumes", children: "Perfumes" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Estoque", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: form.estoque, onChange: (e) => setForm({
            ...form,
            estoque: e.target.value
          }), className: "input" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Preço (R$)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.01", min: 0, required: true, value: form.preco, onChange: (e) => setForm({
            ...form,
            preco: e.target.value
          }), className: "input" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Promocional (R$)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.01", min: 0, value: form.preco_promocional, onChange: (e) => setForm({
            ...form,
            preco_promocional: e.target.value
          }), className: "input" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Imagem do produto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          form.imagem_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: form.imagem_url, alt: "prévia", className: "w-24 h-24 object-cover rounded-lg border border-white/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 border border-dashed border-white/20 rounded-lg px-3 py-2 cursor-pointer hover:bg-white/5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-4" }),
            uploading ? "Enviando..." : "Selecionar imagem do computador",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", disabled: uploading, onChange: async (e) => {
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
                  data: {
                    fileName: file.name,
                    contentType: file.type || "image/jpeg",
                    base64
                  }
                });
                setForm((prev) => prev ? {
                  ...prev,
                  imagem_url: res.url
                } : prev);
                toast.success("Imagem enviada");
              } catch (err) {
                toast.error(err?.message ?? "Falha no upload");
              } finally {
                setUploading(false);
                e.target.value = "";
              }
            } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "url", value: form.imagem_url, onChange: (e) => setForm({
            ...form,
            imagem_url: e.target.value
          }), placeholder: "ou cole uma URL https://...", className: "input" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.ativo, onChange: (e) => setForm({
              ...form,
              ativo: e.target.checked
            }) }),
            "Ativo"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.destaque, onChange: (e) => setForm({
              ...form,
              destaque: e.target.checked
            }) }),
            "Destaque"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: mut.isPending, className: "bg-brand text-primary-foreground px-6 py-2.5 rounded-full font-bold uppercase tracking-tight text-xs flex-1", children: mut.isPending ? "Salvando..." : "Salvar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setForm(null), className: "border border-white/20 px-6 py-2.5 rounded-full font-bold uppercase tracking-tight text-xs", children: "Cancelar" })
        ] })
      ] })
    ] }) })
  ] });
}
function FormField({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-tight mb-1.5 block opacity-80", children: label }),
    children
  ] });
}
export {
  ProdutosAdmin as component
};
