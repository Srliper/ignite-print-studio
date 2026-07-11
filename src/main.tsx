/**
 * Ponto de entrada do cliente (TanStack Start).
 *
 * TanStack Start usa StartClient internamente — não há bootstrap manual aqui.
 * A configuração global de autenticação é feita em:
 *   - src/routes/__root.tsx  → carrega sessão Auth.js no beforeLoad + AuthProvider
 *   - src/start.ts           → middleware de servidor
 *   - src/routes/api/auth/$.ts → endpoints OAuth (/api/auth/*)
 *
 * Este arquivo documenta a arquitetura e exporta o provider para referência.
 */
export { AuthProvider } from "@/providers/AuthProvider";
