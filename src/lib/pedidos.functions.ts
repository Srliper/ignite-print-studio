import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const itemSchema = z.object({
  id: z.string().min(1).max(200),
  productId: z.string().min(1).max(200),
  category: z.string().min(1).max(40),
  name: z.string().min(1).max(200),
  price: z.number().min(0),
  qty: z.number().int().min(1).max(999),
  image: z.string().max(2000).optional(),
  options: z.record(z.string(), z.string()).optional(),
});

export const criarPedido = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        itens: z.array(itemSchema).min(1).max(50),
        observacoes: z.string().max(1000).optional(),
      })
      .parse(d),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const subtotal = data.itens.reduce((s, it) => s + it.price * it.qty, 0);

    const { data: profile } = await supabase
      .from("profiles")
      .select("nome,email,telefone")
      .eq("id", userId)
      .maybeSingle();

    const { data: inserted, error } = await supabase
      .from("pedidos")
      .insert({
        cliente_id: userId,
        produtos: data.itens,
        subtotal,
        frete: 0,
        desconto: 0,
        total: subtotal,
        status: "pendente",
        endereco_entrega: {},
        observacoes: data.observacoes ?? `Pedido via WhatsApp — ${profile?.nome ?? ""}`.trim(),
      })
      .select("id,created_at")
      .single();

    if (error) throw new Error(error.message);
    return { id: inserted.id, created_at: inserted.created_at };
  });
