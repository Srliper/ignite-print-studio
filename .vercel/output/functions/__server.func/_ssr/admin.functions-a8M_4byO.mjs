import { d as createSsrRpc } from "./router-BBvkWRQ4.mjs";
import { c as createServerFn } from "./server-CMbdw2-U.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DQvKKjOX.mjs";
import { o as objectType, s as stringType, e as enumType, b as booleanType, n as numberType } from "../_libs/zod.mjs";
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
export {
  adminStats as a,
  bootstrapAdmin as b,
  checkIsAdmin as c,
  uploadImagemProduto as d,
  listarPedidosAdmin as e,
  atualizarPedido as f,
  listarFuncionarios as g,
  revogarAdmin as h,
  comissaoPorProduto as i,
  listarClientesAdmin as j,
  listarProdutosAdmin as l,
  promoverAdmin as p,
  removerProduto as r,
  upsertProduto as u
};
