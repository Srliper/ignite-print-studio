import { c as createServerRpc } from "./createServerRpc-CLRBoVKy.mjs";
import { c as createServerFn } from "./server-Bgc2LWWt.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BUW21sRT.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, r as recordType, s as stringType, n as numberType, a as arrayType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
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
const criarPedido_createServerFn_handler = createServerRpc({
  id: "3a033da0b2908233e28b4239931b49889f82a4ac50cd310935a57b5ebc6e1593",
  name: "criarPedido",
  filename: "src/lib/pedidos.functions.ts"
}, (opts) => criarPedido.__executeServer(opts));
const criarPedido = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  itens: arrayType(itemSchema).min(1).max(50),
  endereco: enderecoSchema,
  frete: freteSchema,
  observacoes: stringType().max(1e3).optional()
}).parse(d)).handler(criarPedido_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    supabase,
    userId
  } = context;
  const subtotal = data.itens.reduce((s, it) => s + it.price * it.qty, 0);
  const total = subtotal + data.frete.valor;
  const {
    data: inserted,
    error
  } = await supabase.from("pedidos").insert({
    cliente_id: userId,
    produtos: data.itens,
    subtotal,
    frete: data.frete.valor,
    desconto: 0,
    total,
    status: "pendente",
    endereco_entrega: {
      ...data.endereco,
      frete_servico: data.frete.servico,
      frete_prazo_dias: data.frete.prazo
    },
    observacoes: data.observacoes ?? null
  }).select("id,created_at").single();
  if (error) throw new Error(error.message);
  return {
    id: inserted.id,
    created_at: inserted.created_at
  };
});
export {
  criarPedido_createServerFn_handler
};
