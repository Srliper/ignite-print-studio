# Checklist de variáveis — Vercel (Production + Preview)

**Vercel → Project → Settings → Environment Variables**

Marque **Production** e **Preview** em todas as 8 variáveis abaixo.

| Variável | Valor |
|----------|-------|
| `SUPABASE_URL` | `https://hhvzklzxtpaieqdxkymq.supabase.co` |
| `SUPABASE_PUBLISHABLE_KEY` | chave anon do Supabase |
| `VITE_SUPABASE_URL` | `https://hhvzklzxtpaieqdxkymq.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | mesma chave anon |
| `GOOGLE_CLIENT_ID` | Client ID do Google Console |
| `GOOGLE_CLIENT_SECRET` | Client Secret do Google Console |
| `NEXTAUTH_SECRET` | mesmo valor de `AUTH_SECRET` local |
| `NEXTAUTH_URL` | `https://ignite-print-studio.vercel.app` |

> O código também aceita `AUTH_SECRET` e `AUTH_URL` no lugar de `NEXTAUTH_*`.

## Google Cloud Console

**Authorized redirect URIs:**
- `http://localhost:5173/oauth/callback/google`
- `https://ignite-print-studio.vercel.app/oauth/callback/google`

**Authorized JavaScript origins:**
- `http://localhost:5173`
- `https://ignite-print-studio.vercel.app`

## Após salvar as variáveis

1. **Deployments → Redeploy** do commit mais recente (`main`)
2. Não use "Redeploy" de deploy antigo — faça push novo ou redeploy do último commit

## Teste

```bash
npm run check:env:prod   # local, simula produção
```

URLs:
1. `https://ignite-print-studio.vercel.app/` → 200, loja carrega
2. `https://ignite-print-studio.vercel.app/oauth/csrf` → `{"csrfToken":"..."}`
3. `/auth` → "Entrar com Google" redireciona para Google
