# Vercel + Lovable Google Auth

Repo: `https://github.com/Srliper/ignite-print-studio.git` (mesmo repo)

## Vercel Environment Variables (Production + Preview)

| Variável | Valor |
|----------|-------|
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_PUBLISHABLE_KEY` | chave anon |
| `VITE_SUPABASE_URL` | mesma URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | mesma chave |

**Não precisa mais:** `AUTH_SECRET`, `NEXTAUTH_*`, `GOOGLE_CLIENT_*` na Vercel.

## Lovable — Google login

1. Lovable → **Cloud → Users → Auth → Google**
2. **Your own credentials** → cole Client ID + Secret do Google Console  
   ou use **Managed by Lovable**
3. Redirect URIs (Google Console / lista do Lovable):
   - `https://ignite-print-studio.vercel.app`
   - `http://localhost:5173`

## Deploy

1. Push em `main` (não redeploy de commit antigo)
2. Aguarde **Ready** (build deve rodar `npm run build`, **sem** prebuilt `.vercel/output`)
3. Teste `/` e `/auth` → Entrar com Google
