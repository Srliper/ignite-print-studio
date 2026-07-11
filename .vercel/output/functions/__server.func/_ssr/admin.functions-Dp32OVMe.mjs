import { c as createServerRpc } from "./createServerRpc-CLRBoVKy.mjs";
import { c as createServerFn } from "./server-Bgc2LWWt.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BUW21sRT.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, e as enumType, b as booleanType, n as numberType } from "../_libs/zod.mjs";
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
async function assertAdmin(supabase, userId) {
  const {
    data,
    error
  } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin"
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Acesso negado: somente administradores.");
}
const checkIsAdmin_createServerFn_handler = createServerRpc({
  id: "d7ab752d5c5280d2ee84a9875749b1cba0d95c7bbe892baa67e4f3368bfac36c",
  name: "checkIsAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => checkIsAdmin.__executeServer(opts));
const checkIsAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(checkIsAdmin_createServerFn_handler, async ({
  context
}) => {
  const {
    data
  } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin"
  });
  return {
    isAdmin: !!data
  };
});
const bootstrapAdmin_createServerFn_handler = createServerRpc({
  id: "8b5e87060261a59e92bcd5e92ce4cf6afa0ee8e3737aa66e7c16f0be951897c6",
  name: "bootstrapAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => bootstrapAdmin.__executeServer(opts));
const bootstrapAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(bootstrapAdmin_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  const {
    supabaseAdmin
  } = await import("./client.server-DkcdKqL3.mjs");
  const {
    count,
    error: cErr
  } = await supabaseAdmin.from("user_roles").select("*", {
    count: "exact",
    head: true
  }).eq("role", "admin");
  if (cErr) throw new Error(cErr.message);
  if ((count ?? 0) > 0) {
    throw new Error("Já existe um administrador. Peça para ele te promover.");
  }
  const {
    error
  } = await supabaseAdmin.from("user_roles").insert({
    user_id: userId,
    role: "admin"
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const adminStats_createServerFn_handler = createServerRpc({
  id: "fc54988025651b0d207f9ef4346d9f0fe848ff17785294a4a080cffaee281f4f",
  name: "adminStats",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminStats.__executeServer(opts));
const adminStats = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(adminStats_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  await assertAdmin(supabase, userId);
  const [pedidosRes, clientesRes, produtosRes] = await Promise.all([supabase.from("pedidos").select("total,status,created_at"), supabase.from("profiles").select("id", {
    count: "exact",
    head: true
  }), supabase.from("produtos").select("id", {
    count: "exact",
    head: true
  })]);
  const pedidos = pedidosRes.data ?? [];
  const pagos = pedidos.filter((p) => p.status === "pago" || p.status === "enviado" || p.status === "entregue");
  const faturamento = pagos.reduce((s, p) => s + Number(p.total ?? 0), 0);
  const hoje = /* @__PURE__ */ new Date();
  hoje.setHours(0, 0, 0, 0);
  const vendasHoje = pagos.filter((p) => new Date(p.created_at) >= hoje).length;
  const dias = [];
  for (let i = 6; i >= 0; i--) {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const next = new Date(d);
    next.setDate(d.getDate() + 1);
    const total = pagos.filter((p) => {
      const t = new Date(p.created_at);
      return t >= d && t < next;
    }).reduce((s, p) => s + Number(p.total ?? 0), 0);
    dias.push({
      dia: d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit"
      }),
      total
    });
  }
  return {
    totalPedidos: pedidos.length,
    totalPendentes: pedidos.filter((p) => p.status === "pendente").length,
    faturamento,
    comissao: faturamento * 0.1,
    vendasHoje,
    totalClientes: clientesRes.count ?? 0,
    totalProdutos: produtosRes.count ?? 0,
    ultimos7: dias
  };
});
const comissaoPorProduto_createServerFn_handler = createServerRpc({
  id: "5d3243139735920ba9b736531e3e44068bbdc2fd46635fabda3436759e69762a",
  name: "comissaoPorProduto",
  filename: "src/lib/admin.functions.ts"
}, (opts) => comissaoPorProduto.__executeServer(opts));
const comissaoPorProduto = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(comissaoPorProduto_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  await assertAdmin(supabase, userId);
  const {
    data: pedidos,
    error
  } = await supabase.from("pedidos").select("produtos,status,total,created_at").in("status", ["pago", "enviado", "entregue"]);
  if (error) throw new Error(error.message);
  const agg = /* @__PURE__ */ new Map();
  let receitaTotal = 0;
  for (const p of pedidos ?? []) {
    const itens = Array.isArray(p.produtos) ? p.produtos : [];
    for (const it of itens) {
      const key = String(it.productId ?? it.id ?? it.name ?? "?");
      const nome = String(it.name ?? key);
      const qty = Number(it.qty ?? 1);
      const price = Number(it.price ?? 0);
      const rec = qty * price;
      receitaTotal += rec;
      const cur = agg.get(key) ?? {
        nome,
        qtd: 0,
        receita: 0,
        comissao: 0
      };
      cur.qtd += qty;
      cur.receita += rec;
      cur.comissao += rec * 0.1;
      agg.set(key, cur);
    }
  }
  const linhas = Array.from(agg.values()).sort((a, b) => b.receita - a.receita);
  return {
    linhas,
    receitaTotal,
    comissaoTotal: receitaTotal * 0.1,
    pedidosPagos: (pedidos ?? []).length
  };
});
const listarPedidosAdmin_createServerFn_handler = createServerRpc({
  id: "bf04e2dfaaf1f1ed96d2be49bb6b1302ca9ea5c7043f514e747a1626585f75a2",
  name: "listarPedidosAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listarPedidosAdmin.__executeServer(opts));
const listarPedidosAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listarPedidosAdmin_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  await assertAdmin(supabase, userId);
  const {
    data,
    error
  } = await supabase.from("pedidos").select("*").order("created_at", {
    ascending: false
  }).limit(200);
  if (error) throw new Error(error.message);
  return {
    pedidos: data ?? []
  };
});
const atualizarPedido_createServerFn_handler = createServerRpc({
  id: "14267c7d84280e06556c96fbb45db9aa54b3085347638d072219382aec5ea418",
  name: "atualizarPedido",
  filename: "src/lib/admin.functions.ts"
}, (opts) => atualizarPedido.__executeServer(opts));
const atualizarPedido = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid(),
  status: enumType(["pendente", "pago", "enviado", "entregue", "cancelado"]).optional(),
  codigo_rastreio: stringType().max(120).nullable().optional()
}).parse(d)).handler(atualizarPedido_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    supabase,
    userId
  } = context;
  await assertAdmin(supabase, userId);
  const patch = {};
  if (data.status) patch.status = data.status;
  if (data.codigo_rastreio !== void 0) patch.codigo_rastreio = data.codigo_rastreio || null;
  const {
    error
  } = await supabase.from("pedidos").update(patch).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const listarProdutosAdmin_createServerFn_handler = createServerRpc({
  id: "e2713f0db4cfb666fbc46230a59ed86f3d8b10b86e778f10e5397ff58389b97c",
  name: "listarProdutosAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listarProdutosAdmin.__executeServer(opts));
const listarProdutosAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listarProdutosAdmin_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  await assertAdmin(supabase, userId);
  const {
    data,
    error
  } = await supabase.from("produtos").select("*").order("categoria", {
    ascending: true
  }).order("ordem", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return {
    produtos: data ?? []
  };
});
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
const upsertProduto_createServerFn_handler = createServerRpc({
  id: "99a1275d61d21abed9d28dffe1aef1efd80a431e751b6f252af0aa95631eaa64",
  name: "upsertProduto",
  filename: "src/lib/admin.functions.ts"
}, (opts) => upsertProduto.__executeServer(opts));
const upsertProduto = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => produtoSchema.parse(d)).handler(upsertProduto_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    supabase,
    userId
  } = context;
  await assertAdmin(supabase, userId);
  if (data.id) {
    const {
      id,
      ...patch
    } = data;
    const {
      error: error2
    } = await supabase.from("produtos").update(patch).eq("id", id);
    if (error2) throw new Error(error2.message);
    return {
      ok: true,
      id
    };
  }
  const {
    data: inserted,
    error
  } = await supabase.from("produtos").insert(data).select("id").single();
  if (error) throw new Error(error.message);
  return {
    ok: true,
    id: inserted.id
  };
});
const removerProduto_createServerFn_handler = createServerRpc({
  id: "b50b7f13a9920e6d5d2635312c54600105d75abeb5112ec011ca5e3088122cc3",
  name: "removerProduto",
  filename: "src/lib/admin.functions.ts"
}, (opts) => removerProduto.__executeServer(opts));
const removerProduto = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(removerProduto_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    supabase,
    userId
  } = context;
  await assertAdmin(supabase, userId);
  const {
    error
  } = await supabase.from("produtos").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const uploadImagemProduto_createServerFn_handler = createServerRpc({
  id: "ff7447b6a163fddc24de950e921a8de7fb75fb9dd28c3ceb45c5d7df6f78d41f",
  name: "uploadImagemProduto",
  filename: "src/lib/admin.functions.ts"
}, (opts) => uploadImagemProduto.__executeServer(opts));
const uploadImagemProduto = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  fileName: stringType().min(1).max(200),
  contentType: stringType().min(1).max(100),
  base64: stringType().min(1)
}).parse(d)).handler(uploadImagemProduto_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    supabase,
    userId
  } = context;
  await assertAdmin(supabase, userId);
  const cleanName = data.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${userId}/${Date.now()}-${cleanName}`;
  const bytes = Uint8Array.from(atob(data.base64), (c) => c.charCodeAt(0));
  const {
    error
  } = await supabase.storage.from("produtos").upload(path, bytes, {
    contentType: data.contentType,
    upsert: false
  });
  if (error) throw new Error(error.message);
  const {
    data: signed,
    error: sErr
  } = await supabase.storage.from("produtos").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (sErr) throw new Error(sErr.message);
  return {
    url: signed.signedUrl
  };
});
const listarClientesAdmin_createServerFn_handler = createServerRpc({
  id: "02724b713dc9c559f2c80c7cf125e42c644f38894fb73bce595b85b119e86b45",
  name: "listarClientesAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listarClientesAdmin.__executeServer(opts));
const listarClientesAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listarClientesAdmin_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  await assertAdmin(supabase, userId);
  const {
    data: profiles,
    error
  } = await supabase.from("profiles").select("id,nome,email,telefone,created_at").order("created_at", {
    ascending: false
  }).limit(500);
  if (error) throw new Error(error.message);
  const ids = (profiles ?? []).map((p) => p.id);
  let pedidosPorCliente = {};
  if (ids.length) {
    const {
      data: peds
    } = await supabase.from("pedidos").select("cliente_id,total,status").in("cliente_id", ids);
    (peds ?? []).forEach((p) => {
      const r = pedidosPorCliente[p.cliente_id] ||= {
        qtd: 0,
        total: 0
      };
      r.qtd += 1;
      if (["pago", "enviado", "entregue"].includes(p.status)) r.total += Number(p.total ?? 0);
    });
  }
  return {
    clientes: (profiles ?? []).map((p) => ({
      ...p,
      pedidos: pedidosPorCliente[p.id]?.qtd ?? 0,
      gasto: pedidosPorCliente[p.id]?.total ?? 0
    }))
  };
});
const listarFuncionarios_createServerFn_handler = createServerRpc({
  id: "61b7f93e5d483d64390a0c9f1eb49cbfe7cdefa9a5c55e58fb213096037ffb43",
  name: "listarFuncionarios",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listarFuncionarios.__executeServer(opts));
const listarFuncionarios = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listarFuncionarios_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  await assertAdmin(supabase, userId);
  const {
    data: roles,
    error
  } = await supabase.from("user_roles").select("user_id,role,created_at").eq("role", "admin");
  if (error) throw new Error(error.message);
  const ids = (roles ?? []).map((r) => r.user_id);
  let profilesMap = {};
  if (ids.length) {
    const {
      data: profs
    } = await supabase.from("profiles").select("id,nome,email").in("id", ids);
    (profs ?? []).forEach((p) => profilesMap[p.id] = p);
  }
  return {
    admins: (roles ?? []).map((r) => ({
      user_id: r.user_id,
      created_at: r.created_at,
      nome: profilesMap[r.user_id]?.nome ?? "",
      email: profilesMap[r.user_id]?.email ?? ""
    }))
  };
});
const promoverAdmin_createServerFn_handler = createServerRpc({
  id: "04c8af07ae44e6dd8d07a8bb2ea023639912763ca141a792ff5a54ec472848f9",
  name: "promoverAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => promoverAdmin.__executeServer(opts));
const promoverAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  email: stringType().email()
}).parse(d)).handler(promoverAdmin_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    supabase,
    userId
  } = context;
  await assertAdmin(supabase, userId);
  const {
    data: profile,
    error
  } = await supabase.from("profiles").select("id").eq("email", data.email).maybeSingle();
  if (error) throw new Error(error.message);
  if (!profile) throw new Error("Nenhum usuário cadastrado com esse email.");
  const {
    error: insErr
  } = await supabase.from("user_roles").insert({
    user_id: profile.id,
    role: "admin"
  });
  if (insErr && !insErr.message.includes("duplicate")) throw new Error(insErr.message);
  return {
    ok: true
  };
});
const revogarAdmin_createServerFn_handler = createServerRpc({
  id: "3a042adc765b0956c0d1b4ad8f6bceaa80a60ac9dc357882488a576770794b78",
  name: "revogarAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => revogarAdmin.__executeServer(opts));
const revogarAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  user_id: stringType().uuid()
}).parse(d)).handler(revogarAdmin_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    supabase,
    userId
  } = context;
  await assertAdmin(supabase, userId);
  if (data.user_id === userId) {
    throw new Error("Você não pode revogar seu próprio acesso admin.");
  }
  const {
    error
  } = await supabase.from("user_roles").delete().eq("user_id", data.user_id).eq("role", "admin");
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  adminStats_createServerFn_handler,
  atualizarPedido_createServerFn_handler,
  bootstrapAdmin_createServerFn_handler,
  checkIsAdmin_createServerFn_handler,
  comissaoPorProduto_createServerFn_handler,
  listarClientesAdmin_createServerFn_handler,
  listarFuncionarios_createServerFn_handler,
  listarPedidosAdmin_createServerFn_handler,
  listarProdutosAdmin_createServerFn_handler,
  promoverAdmin_createServerFn_handler,
  removerProduto_createServerFn_handler,
  revogarAdmin_createServerFn_handler,
  uploadImagemProduto_createServerFn_handler,
  upsertProduto_createServerFn_handler
};
