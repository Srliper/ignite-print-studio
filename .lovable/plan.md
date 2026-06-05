Vou usar a stack que **já está rodando** (TanStack Start + Lovable Cloud / Supabase). Next.js não roda na Lovable, e o front atual (Hero, Vapes, Camisetas, Perfumes) já está bonito e funcional — vou construir o backend e o fluxo de compra **por cima** disso, sem jogar trabalho fora.

## O que vai ser entregue

### 1. Lovable Cloud + Schema do banco
- Ativar Lovable Cloud (Supabase gerenciado).
- Criar tabelas via migration, adaptadas para **Supabase Auth nativo**:
  - `profiles` (FK → `auth.users`, com nome, telefone, endereço jsonb) — substitui `clientes` + `senha_hash`.
  - `produtos` (categoria: vapes/estamparia/perfumes, preços, estoque, sabores, tamanhos, cores, imagens, destaque, ativo).
  - `pedidos` (cliente_id, produtos jsonb, totais, status, pagamento_id, método, endereço, rastreio).
  - `uploads_estampa` (cliente_id, arquivo_url, status).
  - `avaliacoes` (produto_id, cliente_id, nota, comentário).
  - `user_roles` + enum `app_role` (`admin`, `cliente`) + função `has_role()` security definer — para o painel admin.
- **GRANTs corretos** + **RLS** em todas as tabelas:
  - Produtos ativos: leitura pública (anon).
  - Profiles/pedidos/uploads/avaliações: usuário só vê o que é dele.
  - Admin: acesso total via `has_role(auth.uid(), 'admin')`.
- Bucket de Storage `produtos` (público) e `estampas` (privado, leitura via assinatura).
- Trigger `on_auth_user_created` que cria automaticamente um `profile` ao cadastrar.

### 2. Autenticação
- Página `/auth` com login e cadastro (email/senha + Google opcional).
- Layout `_authenticated/` gerenciado pela integração Supabase.
- Páginas protegidas: `/minha-conta`, `/meus-pedidos`, `/checkout`.
- Sign-out no menu da nav.

### 3. Catálogo (reusa o front atual)
- Os componentes `VapesSection`, `ShirtsSection`, `PerfumesSection` passam a **buscar do banco** via `createServerFn`, mantendo o visual atual.
- Seed inicial com os produtos que já estão hardcoded hoje (Ignite V155/V250/V300, perfumes Bortoletto 521 VIP/La Bella/Indomável/Fantastic, estampas anime).

### 4. Carrinho + Checkout
- Estado global do carrinho com **Zustand** + persistência em `localStorage`.
- Ícone do carrinho na nav (badge com contador) + drawer lateral.
- Página `/checkout`:
  - Form de endereço (React Hook Form + Zod).
  - Resumo do pedido, frete fixo configurável, total.
  - Botão "Pagar com Mercado Pago".

### 5. Mercado Pago Checkout Pro
- Secret `MERCADO_PAGO_ACCESS_TOKEN` (peço via tool segura).
- Server function `criarPreferenciaMP`: cria pedido `status=pendente` no banco + cria preferência na MP API + retorna `init_point`.
- Redireciona o cliente para o Checkout Pro do MP (Pix / cartão / boleto).
- Rota pública `/api/public/webhooks/mercadopago` (server route):
  - Recebe notificação, busca o pagamento na API do MP, atualiza pedido para `pago`/`cancelado`.
- Páginas de retorno: `/checkout/sucesso`, `/checkout/falha`, `/checkout/pendente`.

### 6. Área do cliente
- `/meus-pedidos`: lista os pedidos com status, total, código de rastreio.
- `/minha-conta`: editar nome, telefone, endereço.

### 7. Upload de estampa (camisetas)
- Já existe o input no `ShirtsSection`. Vou ligá-lo ao bucket `estampas` quando o cliente estiver logado, salvando em `uploads_estampa`.

## Detalhes técnicos

- **Stack final**: TanStack Start v1 + React 19 + Tailwind v4 + Supabase (Lovable Cloud) + Mercado Pago SDK via fetch (não tem SDK oficial node-compatible com Workers, então uso `fetch` direto na API REST do MP).
- **Validação**: Zod nos `inputValidator` de cada `createServerFn` e nos forms (React Hook Form + zodResolver).
- **Estado**: Zustand para carrinho; TanStack Query para dados do servidor (já configurado).
- **Animações**: Framer Motion (instalar `motion`).
- **Roles**: tabela `user_roles` separada (regra de segurança crítica).
- **Webhook MP**: valida via `x-signature` header do MP antes de processar.

## Sugestão de fasear

Como é muita coisa, sugiro entregar em **3 etapas** para você validar entre uma e outra:

1. **Fase 1 (esta resposta se aprovar)** — Lovable Cloud + schema + RLS + seed + auth (login/cadastro) + ligar catálogo ao banco.
2. **Fase 2** — Carrinho (Zustand) + checkout + integração Mercado Pago + webhook + páginas de retorno.
3. **Fase 3** — Área do cliente (pedidos/conta) + upload de estampa no Storage + avaliações + painel admin básico.

Aprovando, começo já pela Fase 1.