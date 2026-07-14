/**
 * Ponto de entrada do cliente (TanStack Start).
 *
 * Autenticação:
 *   - src/integrations/lovable/index.ts → Google OAuth (Lovable Cloud Auth)
 *   - src/providers/AuthProvider.tsx    → sessão Supabase no cliente
 *   - src/hooks/useAuth.ts              → signIn / signOut
 */
export { AuthProvider } from "@/providers/AuthProvider";
